# Phase 31 Rematch Migration/RLS Addendum

**Status**: Migration/RLS addendum for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-23.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-31/PLANNING-BRIEF.md`, `planning/specs/phase-31/PHASE-31-MULTIPLAYER-POSTGAME-ACTIONS-AND-CURRENT-SURFACE-CLEANUP-SPEC-2026-06-23.md`, `planning/phase-31/IMPLEMENTATION-PLAN.md`, and `progress/PROGRESS-STEP-239.md`.

This addendum does not authorize Supabase migration creation or execution, source/runtime implementation, test implementation, deployment, commits, pushes, pull requests, merges, releases, branch deletion, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, or work in the original stable `brrrdle` repository.

## 1. Purpose

Stage 31.1 confirmed that true same-opponent rematch request/accept is durable cross-client mutual intent. Existing local selected-game state, active-game cards, ranked queue state, and custom lobby state do not provide participant-only request, accept, decline, expiry, cancellation, duplicate-creation prevention, and wrong-account protection.

Stage 31.3 should therefore add one narrow Supabase migration for durable Practice-only rematch intent before Stage 31.4 app implementation.

## 2. Scope Decision

Phase 31 rematch persistence should support this v1 path:

- direct same-opponent rematch for completed, unranked, non-custom Practice Multiplayer games;
- same mode, word length, Hard Mode, time-limit, GO puzzle count, participants, and seats as the source game;
- fresh game state created only after the opponent accepts;
- participant-only visibility and actions.

Phase 31 should not add direct ranked rematch persistence in this migration.

Ranked Practice should use same-settings `Search again` through the existing Phase 27 ranked queue RPCs:

- `create_ranked_async_matchmaking_request`;
- `claim_ranked_async_matchmaking_pair`;
- `get_ranked_async_matchmaking_status`;
- `finalize_ranked_async_matchmaking_game`;
- `settle_ranked_async_multiplayer_match`.

This keeps ranked Practice compatible with rating buckets, rating-band matching, trusted game finalization, and trusted settlement. A direct same-opponent ranked rematch would need a separate later ranked-specific anti-abuse design.

Custom/private-code games should use same-settings lobby or setup-prefill flows in app code rather than this direct rematch RPC. Daily games remain fully excluded.

## 3. Proposed Migration

Recommended migration path for Stage 31.3:

`supabase/migrations/<timestamp>_phase31_practice_rematch_requests.sql`

The migration should be additive and preserve all existing tables, policies, functions, and grants unless explicitly named here.

## 4. Proposed Table

Create:

`public.multiplayer_practice_rematch_requests`

Recommended columns:

- `id text primary key default ('phase31-rematch-' || gen_random_uuid()::text)`;
- `source_game_id text not null references public.async_multiplayer_games(id) on delete cascade`;
- `requester_user_id uuid not null references auth.users(id) on delete cascade`;
- `opponent_user_id uuid not null references auth.users(id) on delete cascade`;
- `player_one_user_id uuid not null references auth.users(id) on delete cascade`;
- `player_two_user_id uuid not null references auth.users(id) on delete cascade`;
- `requester_seat text not null check (requester_seat in ('player-one', 'player-two'))`;
- `opponent_seat text not null check (opponent_seat in ('player-one', 'player-two'))`;
- `mode text not null check (mode in ('og', 'go'))`;
- `word_length integer not null check (word_length between 2 and 35)`;
- `hard_mode boolean not null default false`;
- `time_limit_ms integer check (time_limit_ms is null or time_limit_ms > 0)`;
- `go_puzzle_count integer check (go_puzzle_count is null or go_puzzle_count > 0)`;
- `status text not null default 'requested' check (status in ('requested', 'accepted', 'declined', 'cancelled', 'expired', 'created'))`;
- `created_game_id text unique`;
- `idempotency_key text not null unique`;
- `created_at timestamptz not null default now()`;
- `expires_at timestamptz not null default (now() + interval '10 minutes')`;
- `responded_at timestamptz`;
- `updated_at timestamptz not null default now()`;
- checks:
  - `requester_user_id <> opponent_user_id`;
  - `player_one_user_id <> player_two_user_id`;
  - `requester_seat <> opponent_seat`;
  - requester/opponent must match the stored participant seats. This is easiest to enforce inside RPCs because cross-column conditional checks are awkward but possible.

Recommended indexes:

- `multiplayer_practice_rematch_requests_source_status_idx` on `(source_game_id, status, updated_at desc)`;
- `multiplayer_practice_rematch_requests_requester_idx` on `(requester_user_id, updated_at desc)`;
- `multiplayer_practice_rematch_requests_opponent_idx` on `(opponent_user_id, updated_at desc)`;
- partial unique index on `(source_game_id, requester_user_id, opponent_user_id)` where `status in ('requested', 'accepted', 'created')`;
- partial unique index on `created_game_id` where `created_game_id is not null`.

The table must not store answers, seeds, serialized sessions, player sessions, moves, rating transactions, queue ids, public profile drafts, private profile metadata, tokens, emails, or local artifacts.

## 5. RLS And Grants

Enable RLS on `public.multiplayer_practice_rematch_requests`.

Recommended table policy:

- authenticated participants may `select` rows where `auth.uid()` is one of:
  - `requester_user_id`;
  - `opponent_user_id`;
  - `player_one_user_id`;
  - `player_two_user_id`.

Do not grant direct browser `insert`, `update`, or `delete` on the table.

Recommended grants:

- `grant select on table public.multiplayer_practice_rematch_requests to authenticated`;
- no table grants to `anon`;
- no direct write grants to `authenticated`;
- all writes happen through authenticated-only `security definer` RPCs with explicit `search_path = public, pg_temp`.

Every new RPC should:

- revoke all from `public`, `anon`, and `authenticated`;
- grant execute only to `authenticated`;
- check `auth.role() = 'authenticated'` and `auth.uid() is not null`;
- reject nonparticipants and wrong-account callers with non-secret errors;
- return allow-listed fields only.

## 6. RPC Contract

### 6.1 `request_practice_multiplayer_rematch`

Proposed signature:

`public.request_practice_multiplayer_rematch(p_source_game_id text, p_idempotency_key text default null, p_expires_at timestamptz default null)`

Returns one allow-listed rematch row.

Required behavior:

- require authenticated caller;
- load `async_multiplayer_games` source row;
- require source row:
  - `scope = 'practice'`;
  - `status in ('won', 'lost', 'expired')`;
  - `ranked is distinct from true`;
  - `custom_game_code is null`;
  - `daily_date_key is null`;
  - `player_one_user_id` and `player_two_user_id` both present and distinct;
  - caller is either `player_one_user_id` or `player_two_user_id`;
  - `word_length between 2 and 35`;
  - `mode in ('og', 'go')`;
  - source projection does not contradict the same-settings fields being copied.
- reject Daily games, ranked games, custom/private-code games, waiting games, playing games, cancelled games, malformed participant rows, and nonparticipant callers;
- expire prior active requests whose `expires_at <= now()`;
- prevent self-match and duplicate active request rows;
- if caller already has an active request for the same source/opponent, return that request idempotently;
- if the opponent already requested the same source rematch, do not create a reciprocal duplicate. Return or raise a clear response telling the app to accept the existing request;
- set default expiry to 10 minutes unless `p_expires_at` is a stricter approved future time;
- store only same-settings metadata and participant ids, never source answers or sessions.

### 6.2 `get_practice_multiplayer_rematch_requests`

Proposed signature:

`public.get_practice_multiplayer_rematch_requests(p_source_game_id text default null)`

Returns active and recently resolved allow-listed request rows visible to the caller.

Recommended behavior:

- require authenticated caller;
- expire stale rows before selecting;
- optionally filter to `p_source_game_id`;
- return only rows where caller is a participant;
- default order: newest `updated_at` first;
- optionally bound results with a small hard limit such as 50.

### 6.3 `cancel_practice_multiplayer_rematch`

Proposed signature:

`public.cancel_practice_multiplayer_rematch(p_request_id text)`

Returns the updated allow-listed request row.

Required behavior:

- requester only;
- allowed only while status is `requested`;
- set status `cancelled`, `responded_at = now()`, `updated_at = now()`;
- reject opponent, nonparticipant, stale, already accepted, already created, and expired requests.

### 6.4 `decline_practice_multiplayer_rematch`

Proposed signature:

`public.decline_practice_multiplayer_rematch(p_request_id text)`

Returns the updated allow-listed request row.

Required behavior:

- opponent only;
- allowed only while status is `requested`;
- set status `declined`, `responded_at = now()`, `updated_at = now()`;
- reject requester, nonparticipant, stale, already accepted, already created, and expired requests.

### 6.5 `accept_practice_multiplayer_rematch`

Proposed signature:

`public.accept_practice_multiplayer_rematch(p_request_id text, p_game_projection jsonb, p_idempotency_key text default null)`

Returns an allow-listed request row plus `created_game_id`, `created boolean`, and `idempotent boolean`.

Required behavior:

- opponent only;
- allowed only while status is `requested` and `expires_at > now()`;
- idempotently return existing `created_game_id` if the request already created a game for the same idempotency key;
- validate `p_game_projection` before inserting:
  - JSON object;
  - `id` present and not equal to `source_game_id`;
  - `scope = 'practice'`;
  - `mode`, `wordLength`, `hardMode`, `goPuzzleCount`, and `timeLimitMs` match the request/source metadata;
  - `ranked` is absent or false;
  - `ratingBucket` is absent or null;
  - `dailyDateKey` is absent or null;
  - `customGameCode` is absent or null for this direct rematch v1 contract;
  - `status = 'playing'`;
  - `currentTurn in ('player-one', 'player-two')`;
  - `playerUserIds.player-one = player_one_user_id`;
  - `playerUserIds.player-two = player_two_user_id`;
  - no participant user id equals the caller twice;
  - no source-game id is reused.
- insert one fresh `async_multiplayer_games` row:
  - `scope = 'practice'`;
  - `mode` from request;
  - `daily_date_key = null`;
  - `status = 'playing'`;
  - `word_length`, `difficulty`, `go_puzzle_count`, `hard_mode`, and time-limit projection from the approved same settings;
  - `host_user_id = requester_user_id`;
  - `player_one_user_id` and `player_two_user_id` preserved from source seats;
  - `ranked = false`;
  - `rating_bucket = null`;
  - `matchmaking_request_id = null`;
  - `custom_game_code = null`;
  - `projection = p_game_projection`.
- update rematch request:
  - status `created`;
  - `created_game_id = p_game_projection->>'id'`;
  - `responded_at = now()`;
  - `updated_at = now()`.

The accept RPC may receive a full fresh game projection because existing multiplayer rows already store canonical gameplay projections. It must not copy the source game projection, source answers, source seeds, source serialized session, source player sessions, or source move history into the rematch request table, and it must not return the fresh projection in the RPC payload.

## 7. Allow-Listed Return Fields

Rematch RPCs should return only:

- `request_id`;
- `source_game_id`;
- `request_status`;
- `requester_seat`;
- `opponent_seat`;
- `viewer_role` or booleans such as `viewer_can_accept` and `viewer_can_cancel`;
- `mode`;
- `word_length`;
- `hard_mode`;
- `time_limit_ms`;
- `go_puzzle_count`;
- `created_game_id`;
- `created_at`;
- `expires_at`;
- `responded_at`;
- `updated_at`;
- `created`;
- `idempotent`.

Do not return raw auth ids, emails, private profile metadata, private account metadata, public-profile drafts, answers, seeds, serialized sessions, player sessions, projections, move history, rating transaction ids, queue ids, settlement ids, tokens, local artifacts, or spectator-only data.

## 8. Forbidden Inputs And Fields

The rematch table and rematch request/list/cancel/decline RPCs must reject or ignore:

- answers;
- answer words;
- seeds;
- serialized sessions;
- player sessions;
- move history;
- raw game projections;
- rating transaction ids;
- settlement ids;
- ranked queue ids;
- raw emails;
- private profile metadata;
- public profile drafts;
- private progress;
- tokens;
- local/session artifacts.

Only `accept_practice_multiplayer_rematch` may accept a fresh `p_game_projection`, and only to create the new `async_multiplayer_games` row after strict validation. That projection must not be returned by rematch RPCs.

## 9. Ranked, Daily, Custom, And Timed Boundaries

Daily Multiplayer:

- no rematch request;
- no accept;
- no replay;
- no search-again shortcut that bypasses Daily claims;
- reject any source row with `scope = 'daily'` or non-null `daily_date_key`.

Ranked Practice:

- no direct same-opponent ranked rematch in this Stage 31.3 migration;
- same-settings ranked continuation uses existing trusted queue path;
- no direct rating profile writes;
- no direct rating transaction writes;
- no queue/finalization/settlement bypass;
- no Daily ranked;
- no timed Practice ranked.

Custom/private-code Practice:

- no direct same-opponent rematch in this Stage 31.3 migration;
- use app-level same-settings lobby or setup-prefill routes;
- preserve existing invite/private-code semantics.

Timed unranked Practice:

- direct rematch may preserve `time_limit_ms` from source game when source is otherwise eligible;
- this does not authorize timed Practice ranked.

## 10. Rollback Plan

If Stage 31.3 migration execution fails or probes identify unsafe access:

1. Stop before app implementation.
2. Revoke execute on new RPCs from `authenticated`.
3. Drop new policies on `public.multiplayer_practice_rematch_requests`.
4. Drop new RPCs.
5. Drop `public.multiplayer_practice_rematch_requests`.
6. Leave existing Phase 27 ranked queue, Phase 28 Live, Phase 29 public profiles, Phase 30 leaderboards, and `async_multiplayer_games` unchanged.

The rollback must not touch rating, public profile, leaderboard, Daily claim, or spectator tables except for read-only verification.

## 11. Non-Printing Privacy And Abuse Probes

Stage 31.3 should run non-printing probes that confirm:

- unauthenticated/anon cannot execute any rematch RPC;
- authenticated nonparticipants cannot request, read, cancel, decline, or accept a source game's rematch request;
- source Daily games are rejected;
- source ranked games are rejected for direct rematch;
- source custom/private-code games are rejected for direct rematch;
- source waiting/playing/cancelled games are rejected;
- requester can create a request for an eligible source game;
- requester cannot accept their own request;
- opponent can see and accept the request;
- opponent acceptance creates exactly one fresh Practice `async_multiplayer_games` row;
- duplicate accept with the same idempotency key returns the same `created_game_id`;
- stale/expired requests cannot be accepted;
- cancellation and decline work only for the correct participant and only while requested;
- returned payloads do not include raw auth ids, emails, answers, seeds, serialized sessions, player sessions, projections, raw moves, rating transaction ids, match result ids, queue ids, settlement ids, tokens, or local artifacts;
- existing ranked queue and settlement RPCs still reject Daily ranked, timed Practice ranked, ranked custom games, wrong accounts, and incompatible reservations;
- existing Daily Multiplayer claim behavior remains unchanged.

Probe output should report counts, booleans, and pass/fail summaries only. Do not print secrets, auth state, private user data, raw projections, answers, seeds, screenshots, videos, traces, or local session artifacts.

## 12. Verification Strategy

Stage 31.3 migration execution should verify:

- SQL applies cleanly only to the confirmed `brrrdle-dev` Supabase target;
- RLS is enabled on the new table;
- direct write grants are absent for `authenticated`;
- execute grants exist only for authenticated RPC use;
- `git diff --check` passes;
- Python CSV shape check using `python3 -S` passes;
- `git status --short --branch` shows expected migration/progress/doc changes.

Stage 31.4 and Stage 31.5 implementation should then add strict repository/domain/component/E2E coverage before UI claims are considered complete.

## 13. Next Gated Action

The next safe action after this addendum is explicit Stage 31.3 migration/RLS execution authorization.

Stage 31.3 should create exactly one additive Supabase migration implementing this addendum, apply it only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous, run non-printing privacy/abuse probes, update progress, and halt before app source/runtime implementation.
