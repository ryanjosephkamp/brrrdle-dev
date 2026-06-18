# Phase 28 Live Spectator Migration/RLS Addendum

**Status**: Stage 28.2 migration/RLS addendum for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-18.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, the Phase 28 implementation plan, the unified Phase 28 specification, `progress/PROGRESS-STEP-205.md`, `docs/supabase.md`, and the Phase 26 authenticated Live v1 spectator migration.

This addendum does not authorize migration creation, migration execution, app source changes, test changes, deployment, commits, pushes, PRs, merges, releases, branch deletion, Phase 29 work, public/guest spectation, public profiles, public leaderboards, service workers, push infrastructure, secret printing, or original stable `brrrdle` repository work.

## 1. Purpose

Stage 28.1 confirmed that the current authenticated Live v1 spectator RPC:

- returns only `playing` rows;
- does not support a sanitized terminal spectator hold;
- does not exclude current Daily Multiplayer games from nonparticipant spectator discovery.

This addendum defines the safest migration/RLS route for Stage 28.3 before app implementation begins.

## 2. Recommended Migration Shape

Create one additive migration that adds a companion RPC instead of replacing the Phase 26 RPC in place:

- Keep existing `public.get_authenticated_live_v1_spectator_games(integer)` intact for compatibility.
- Add `public.get_authenticated_live_v1_spectator_games_v2(p_limit integer default 50, p_terminal_window_seconds integer default 15)`.
- Add a partial index for the v2 discovery predicate if needed.
- Grant only `authenticated` execute access to the v2 RPC.
- Do not add or broaden raw `async_multiplayer_games` table policies.

This shape avoids changing the return type of the existing Phase 26 function and lets Stage 28.4 update the app repository seam intentionally.

## 3. RPC Contract

The v2 RPC should return the existing sanitized columns plus terminal-hold metadata:

- `id text`
- `scope text`
- `mode text`
- `status text`
- `daily_date_key text`
- `word_length integer`
- `difficulty text`
- `go_puzzle_count integer`
- `hard_mode boolean`
- `ranked boolean`
- `rating_bucket text`
- `current_turn_seat text`
- `created_at timestamptz`
- `updated_at timestamptz`
- `deadline_at timestamptz`
- `ended_at timestamptz`
- `terminal_at timestamptz`
- `terminal_hold_until timestamptz`
- `time_limit_ms integer`
- `players jsonb`
- `moves jsonb`
- `progress jsonb`
- `outcome jsonb`
- `spectator_capabilities jsonb`

`status` may be:

- `playing` for active spectator rows;
- `won`, `lost`, or `expired` for terminal hold rows.

Do not return `waiting` rows. Do not return `cancelled` rows in v2 unless a later spec explicitly defines spectator value for cancelled/pre-result games.

## 4. Eligibility Rules

The v2 RPC must keep all Phase 26 authenticated nonparticipant checks:

- caller role is `authenticated`;
- `auth.uid()` is not null;
- row has both `player_one_user_id` and `player_two_user_id`;
- caller is not `host_user_id`, `player_one_user_id`, or `player_two_user_id`.

Eligible statuses:

- active rows: `game.status = 'playing'`;
- terminal hold rows: `game.status in ('won', 'lost', 'expired')` and `coalesce(game.ended_at, game.updated_at) >= now() - make_interval(secs => bounded_terminal_window_seconds)`.

`p_terminal_window_seconds` must be bounded server-side. Recommended bound:

- minimum `0`;
- maximum `60`;
- default `15`.

The app should still enforce the product target of roughly 15 seconds in Stage 28.4. The server bound prevents accidental long-lived terminal exposure.

## 5. Daily Spectation Exclusion

The v2 RPC must exclude current UTC-day Daily Multiplayer games from spectator discovery.

Recommended predicate:

- include Practice rows;
- include Daily rows only when `daily_date_key` is absent or not equal to the current UTC date key;
- current UTC date key should be computed server-side with UTC semantics, for example `to_char(timezone('UTC', now()), 'YYYY-MM-DD')`.

This preserves the minimum product requirement: current Daily Multiplayer answers cannot be discovered through Live spectation. Historical Daily rows may remain eligible only if they satisfy the terminal/active status rules and are not the current UTC date. If Stage 28.3 implementation finds this creates avoidable risk or complexity, excluding all Daily rows from v2 spectator discovery is acceptable and should be reported before app implementation.

Stage 28.4 must still add an app-side defense-in-depth filter for current Daily spectator rows.

## 6. Sanitized Terminal Projection

Terminal rows may expose only the same sanitized move evidence already approved for spectator rows, plus bounded outcome metadata.

Allowed terminal data:

- submitted move guesses;
- tile states from stored move evidence: `correct`, `present`, `absent`;
- puzzle index;
- submitted move timestamp;
- participant display labels and already-approved safe profile summary fields;
- current or final progress summary;
- winner seat if available from `winner_player_id`;
- terminal status;
- terminal timestamp and hold-until timestamp.

Recommended `outcome` JSON shape:

- `terminal`: boolean;
- `status`: `playing`, `won`, `lost`, or `expired`;
- `winnerSeat`: `player-one`, `player-two`, or null;
- `label`: a short generic label such as `In progress`, `Player one won`, `Player two won`, or `Expired`;
- `terminalAt`: ISO timestamp string when terminal, otherwise null.

Do not include hidden answer fields to explain the outcome. If a submitted final guess solved a puzzle, that submitted guess and its tile states may appear because it is player-submitted visible move evidence. Current Daily rows remain excluded, so this does not expose the current Daily answer through spectator discovery.

## 7. Forbidden Fields And Capabilities

The v2 RPC must not return, directly or nested:

- answers or answer arrays;
- seeds;
- raw `projection`;
- `serializedSession`;
- `playerSessions`;
- raw auth ids beyond approved seat labels;
- auth emails;
- private account/profile metadata;
- tokens or session data;
- service-role-only data;
- rating transaction ids;
- settlement ids;
- Daily claim internals;
- queue mutation ids not already surfaced safely to participants;
- raw `playerUserIds`;
- `host_user_id`, `player_one_user_id`, `player_two_user_id`, or any equivalent user id field.

All spectator capabilities must remain false:

- `canSubmitGuess: false`
- `canForfeit: false`
- `canCancel: false`
- `canJoin: false`
- `canMutate: false`

Do not add join, cancel, forfeit, timer, claim, rating, queue, settlement, or profile mutation authority.

## 8. Indexing

If query planning needs a new partial index, add one in Stage 28.3 with a distinct name such as:

- `async_multiplayer_games_live_v2_spectator_idx`

Recommended index basis:

- `updated_at desc`;
- optionally `ended_at desc`;
- partial predicate limited to statuses `playing`, `won`, `lost`, `expired` and rows with both participants.

Do not remove the Phase 26 index. Do not alter table structure unless Stage 28.3 proves a non-structural RPC cannot satisfy the addendum.

## 9. Grants And RLS

The Stage 28.3 migration should:

- create the v2 RPC as `security definer`;
- set explicit `search_path = public, pg_temp`;
- revoke all on the v2 RPC from `public`;
- revoke all on the v2 RPC from `anon`;
- grant execute on the v2 RPC only to `authenticated`;
- leave raw `async_multiplayer_games` RLS policies unchanged unless a separately documented blocker proves a narrow policy correction is required.

The v2 RPC is the nonparticipant read boundary. Do not grant broad raw SELECT access for nonparticipants.

## 10. Rollback Plan

Rollback should be simple because the migration is additive:

1. Stop app usage of the v2 RPC by reverting the Stage 28.4 app seam, if it has been implemented.
2. Revoke execute on `public.get_authenticated_live_v1_spectator_games_v2(integer, integer)` from `authenticated`.
3. Drop `public.get_authenticated_live_v1_spectator_games_v2(integer, integer)`.
4. Drop the v2 spectator index if it was created.
5. Leave the Phase 26 v1 RPC intact.

If Stage 28.3 chooses to replace the v1 RPC instead of adding v2, it must include an explicit rollback section recreating the Phase 26 RPC contract verbatim. That is not the recommended route.

## 11. Stage 28.3 Non-Printing Privacy Probes

Stage 28.3 should run a non-printing probe harness that verifies:

- anon execution of the v2 RPC is denied;
- authenticated nonparticipant execution is allowed only through sanitized v2 RPC rows;
- nonparticipant raw `async_multiplayer_games` SELECT remains denied for participant-complete `playing` rows;
- a spectator who is also host, player one, or player two does not receive their own game through v2;
- a Practice `playing` game with two non-viewer participants is returned;
- a current UTC-day Daily `playing` game with two non-viewer participants is not returned;
- a current UTC-day Daily terminal game is not returned;
- a non-current Daily row is returned only if the final implementation intentionally allows non-current Daily spectation and the row satisfies all other status/window rules;
- a Practice terminal row within the hold window is returned;
- a Practice terminal row older than the hold window is not returned;
- waiting rows are not returned;
- cancelled rows are not returned unless Stage 28.3 deliberately documents an approved reason;
- returned rows contain no forbidden keys at any nesting level;
- returned capabilities are all false;
- participant read/update behavior through existing app paths remains unaffected;
- ranked Practice queue and trusted settlement RPCs remain unaffected;
- Daily claim enforcement remains unaffected.

Probe output must not print secrets, Supabase keys, auth tokens, raw auth state, raw projections, answer fields, screenshots, videos, traces, or private user data.

## 12. App Integration Expectations For Later Stages

Stage 28.4 should:

- add a repository seam for the v2 RPC;
- update DTO parsing to accept terminal statuses and the new terminal/outcome fields;
- keep forbidden-key rejection strict;
- add app-side current Daily spectator exclusion as defense in depth;
- implement the roughly 15-second terminal hold behavior using the server-provided terminal metadata;
- keep spectator views read-only;
- preserve participant Live rows on the existing repository/realtime path.

Stage 28.4 should not call v2 until Stage 28.3 migration execution and privacy probes pass.

## 13. Verification Expectations

Stage 28.3 should verify:

- the migration file passes SQL review and applies only to confirmed `brrrdle-dev`;
- remote migration list includes the new migration after application;
- the non-printing privacy probe harness passes;
- `git diff --check`;
- Python CSV shape check;
- `git status --short --branch`.

Stage 28.4 should add source/tests for repository parsing, view-model behavior, component behavior, focused spectator view behavior, active-visible polling, app-side Daily guard, and terminal hold consumption.

## 14. Stop Conditions

Stop before applying any migration if:

- the Supabase target project is ambiguous;
- credentials are missing or require printing secrets;
- the proposed SQL would broaden raw nonparticipant table access;
- the proposed SQL would expose hidden answers, seeds, raw projections, sessions, auth emails, tokens, or private identity data;
- current Daily exclusion cannot be expressed safely;
- terminal projection cannot be kept sanitized;
- participant gameplay, Daily claims, ranked queue, trusted settlement, or rating behavior would need unrelated changes.

## 15. Next Gated Action

If this addendum is accepted, the next safe action is Stage 28.3 migration/RLS execution with explicit authorization.

Stage 28.3 should create one additive migration implementing the v2 RPC, apply it only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous, run non-printing RLS/privacy probes, update progress, and then halt before app source implementation.
