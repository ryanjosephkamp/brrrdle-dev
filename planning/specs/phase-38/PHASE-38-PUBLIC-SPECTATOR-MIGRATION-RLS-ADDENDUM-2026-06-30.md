# Phase 38 Public Spectator Migration/RLS Addendum

**Status**: Draft addendum for review before Stage 38.3 migration/RLS execution.
**Phase**: 38, Public/Spectator Readiness.
**Stage**: 38.2, public spectator migration/RLS addendum planning.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-30.
**Authority**: Supplements `planning/specs/phase-38/PHASE-38-PUBLIC-SPECTATOR-READINESS-SPEC-2026-06-30.md` and `planning/phase-38/IMPLEMENTATION-PLAN.md`. Current user instructions, `CONSTITUTION.md`, and the approved Phase 38 specification remain higher authority.

## Purpose

Stage 38.1 concluded that public/guest Live discovery and read-only spectation are not safe as a source-only change. The existing authenticated spectator RPC is intentionally authenticated-only, participant identity summaries are participant-scoped, and public profile RPCs are allowlisted but do not expose game-state projections. Phase 38 therefore needs a dedicated additive SQL/RLS contract before any public/guest spectator source integration.

This addendum defines that contract for review. It does not create or run a Supabase migration, implement source/runtime code, add tests, configure Supabase or Vercel, deploy, stage, commit, push, create a PR, merge, or touch the original stable `brrrdle` repository.

## Stage 38.1 Findings Carried Forward

- Signed-out and guest Live views currently have no public discovery source and must not reuse authenticated-only RPCs by bypassing their auth gates.
- `get_authenticated_live_v1_spectator_games_v2(integer, integer)` must remain authenticated-only and must not be broadened for `anon`.
- Participant identity RPCs must remain authenticated participant-scoped and must not become public/guest identity sources.
- Public profile access is already mediated by safe RPC/RLS patterns; public spectator projection may reuse active public profile summaries server-side, but must not expose raw auth identity or private profile fields.
- Current Daily Multiplayer must remain excluded from public/guest spectation until a later phase explicitly designs Daily-safe public spectation.
- Public/guest spectation must be read-only and must not mutate ratings, claims, timers, results, game state, queues, notifications, account state, profile state, or local persistence authority.

## Additive Migration Contract

Stage 38.3 should create exactly one additive migration after user review. The migration should add a dedicated public spectator projection RPC rather than expanding existing authenticated spectator or participant identity RPCs.

Recommended function:

```sql
public.get_public_live_v1_spectator_games_v1(
  p_limit integer default 25,
  p_terminal_window_seconds integer default 15,
  p_game_id text default null
)
```

Recommended return shape:

```sql
returns table (
  id text,
  scope text,
  mode text,
  status text,
  word_length integer,
  go_puzzle_count integer,
  hard_mode boolean,
  ranked boolean,
  current_turn_seat text,
  created_at timestamptz,
  updated_at timestamptz,
  terminal_at timestamptz,
  players jsonb,
  moves jsonb,
  progress jsonb,
  outcome jsonb,
  spectator_capabilities jsonb
)
```

The exact SQL implementation may adjust names only if the source integration and probes preserve the same safety contract. It must remain a dedicated public/guest spectator projection and must not alter the authenticated spectator RPC signature, grants, or semantics.

## Eligibility Rules

The RPC must only return eligible Practice Multiplayer rows.

- Include `async_multiplayer_games.scope = 'practice'`.
- Include only rows with both participant seats present.
- Include active rows with safe in-progress status.
- Include terminal rows only within the bounded terminal hold window.
- Exclude all Daily Multiplayer rows, including current Daily, historical Daily, Daily claims, Daily answers, and Daily date-keyed records.
- Exclude cancelled, incomplete, malformed, hidden, or otherwise unavailable rows.
- Preserve existing status semantics for authenticated participants and authenticated spectators.
- Use deterministic ordering, preferably newest visible `updated_at` first.

## Input Bounds

Inputs must be bounded server-side.

- `p_limit` default: `25`.
- `p_limit` maximum: `50`.
- `p_limit` minimum: `0`.
- `p_terminal_window_seconds` default: `15`.
- `p_terminal_window_seconds` maximum: `30`.
- `p_terminal_window_seconds` minimum: `0`.
- `p_game_id` may target one eligible game for detail/resume-style public viewing, but must be trimmed and bounded. Null or blank means list mode.
- If `p_game_id` is present, the same eligibility and forbidden-field rules apply; targeted lookup must not become a row-enumeration or private-state bypass.

## Grant And RLS Behavior

The RPC should be `security definer`, stable/read-only, and search-path constrained.

Required grant behavior:

- Revoke all existing function privileges from `public`, `anon`, and `authenticated` before applying the final grants.
- Grant execute to `anon`.
- Grant execute to `authenticated`.
- Do not grant direct table access to `async_multiplayer_games`, public profile tables, queue tables, rating tables, auth tables, session tables, or any storage table.
- Do not alter existing authenticated spectator RPC grants.
- Do not alter participant identity RPC grants.
- Do not weaken public profile table RLS or direct table revokes.

The function may join active public profile records server-side, but only inside the dedicated sanitized projection.

## Allowed Output Fields

The public/guest spectator payload may expose only display, progress, and read-only capability data needed for public Live discovery and read-only spectation.

Allowed game fields:

- Game id.
- Scope, restricted to `practice`.
- Mode, such as `og` or `go`.
- Safe status label or status enum.
- Word length.
- GO puzzle count where applicable.
- Hard Mode flag where applicable.
- Ranked/unranked boolean where applicable, without rating internals.
- Current turn seat as `playerOne`, `playerTwo`, or null.
- Created, updated, and terminal timestamps.

Allowed player summary fields:

- Seat: `playerOne` or `playerTwo`.
- Safe display label.
- Active public profile `displayName` when available and safe.
- Active public profile `avatarUrl`, only if it is already public-profile-safe.
- Active public profile `accentColor`, only if it is already public-profile-safe.
- Optional safe initials derived from the display name.
- Generic fallback labels, such as `Player one` and `Player two`, when safe profile data is unavailable.

Allowed move/progress fields:

- Seat.
- Puzzle index.
- Submitted guess text only for already-submitted visible moves.
- Tile states already visible to spectators.
- Submitted-at timestamp when safe.
- Current puzzle index, solved puzzle count, visible turn count, and other display-only progress counts.
- Terminal outcome labels that do not expose private identifiers, rating internals, or settlement internals.

Allowed capability fields:

- Explicit read-only flags only.
- All mutation-related capability flags must be false.

Recommended capability JSON:

```json
{
  "canCancel": false,
  "canForfeit": false,
  "canJoin": false,
  "canMutate": false,
  "canSubmitGuess": false,
  "canClaimDaily": false,
  "canQueue": false,
  "canSettleRating": false,
  "canNotify": false
}
```

## Forbidden Output Fields

The RPC must not expose, directly or nested inside JSON:

- Raw auth IDs.
- Raw user IDs.
- Emails.
- Private profile fields.
- Auth metadata.
- Account state.
- Private profile state.
- Answers.
- Seeds.
- Serialized sessions.
- Player sessions.
- Raw projections.
- Raw move IDs.
- Queue internals.
- Matchmaking internals.
- Rating internals.
- Rating transactions.
- Settlement IDs.
- Service IDs.
- Tokens.
- Session data.
- Supabase keys.
- Vercel tokens.
- Screenshots.
- Videos.
- Traces.
- Auth state.
- Local session artifacts.

The public/guest spectator projection must also omit public profile IDs in Phase 38 v1. Clickable player profiles and public/social profile browsing remain routed to Phase 39.

## Public Profile Handling

The migration may resolve active public profile summaries server-side from each participant seat.

Rules:

- Use only active public profiles whose visibility is public under existing public profile semantics.
- Treat private, hidden, suspended, missing, malformed, or unsafe profile records as unavailable.
- Fall back to generic seat labels when safe public profile data is unavailable.
- Do not expose profile ownership IDs, raw auth IDs, raw user IDs, emails, private profile fields, moderation internals, or public profile IDs.
- Do not introduce clickable profile routes or profile browsing in Stage 38.3.

## Read-Only Mutation Boundary

The RPC must be display-only. It must not write to any table, call mutation helpers, or grant any mutation capability.

Public/guest spectators must not be able to:

- Submit guesses.
- Join games.
- Cancel games.
- Forfeit games.
- Start timers.
- Stop timers.
- Change results.
- Claim Daily games.
- Enter queues.
- Mutate ratings.
- Mutate rating transactions.
- Create notifications.
- Change account state.
- Change profile state.
- Change local persistence authority.

Source integration in later stages must continue to route participants through participant-owned paths and authenticated spectators through authenticated spectator paths.

## Abuse Boundaries

The public projection is intentionally bounded.

- Default row limit should be small.
- Maximum row limit must be enforced server-side.
- Terminal visibility window must be short and bounded.
- No offset or cursor pagination should be introduced in Stage 38.3.
- No identity-bearing spectator list should be introduced in Stage 38.3.
- Public callers should not receive fields that support scraping private identity, ratings, queues, or account state.
- Later source integration should poll conservatively and should not create writes or presence records for anonymous viewers without a later approved design.

## Spectator Presence, Count, And List Routing

Identity-bearing spectator lists are deferred.

Stage 38.3 should not create a spectator presence table, viewer write path, or identity-bearing spectator list. Stage 38.5 may evaluate a bounded aggregate count only after the dedicated projection is verified.

If Stage 38.5 proposes a count, it must be display-only, privacy-safe, abuse-resistant, and must not expose raw viewer identifiers, auth state, IP addresses, session IDs, local storage IDs, profile IDs, or cross-session tracking data. If those constraints cannot be met cleanly, spectator presence remains deferred.

## Non-Printing Probe Expectations

Stage 38.3 must run non-printing probes that report only counts, boolean pass/fail summaries, and safe field names. Probes must not print secrets, raw auth IDs, emails, private profile data, answers, seeds, sessions, tokens, or local artifacts.

Required probes:

- Confirm the dedicated public spectator RPC exists.
- Confirm `anon` can execute the RPC.
- Confirm `authenticated` can execute the RPC.
- Confirm direct `anon` table reads remain denied.
- Confirm eligible Practice Multiplayer rows can appear.
- Confirm Daily Multiplayer rows do not appear.
- Confirm terminal rows disappear outside the terminal hold window.
- Confirm returned rows contain only allowlisted top-level fields.
- Confirm nested player summaries contain only allowlisted fields.
- Confirm nested move/progress payloads contain no forbidden keys.
- Confirm mutation capability flags are present and false.
- Confirm private/hidden/missing public profiles fall back to generic safe labels.
- Confirm the authenticated spectator RPC remains authenticated-only.
- Confirm participant identity RPCs remain authenticated participant-scoped.
- Confirm anonymous callers cannot call or reach mutation paths for joins, guesses, forfeits, cancellations, queues, ratings, claims, notifications, account state, or profile state.

Forbidden-field probe terms should include at minimum:

- `auth_id`
- `authId`
- `user_id`
- `userId`
- `email`
- `answer`
- `answers`
- `seed`
- `seeds`
- `serializedSession`
- `playerSessions`
- `projection`
- `rawMoveId`
- `queue`
- `ratingTransaction`
- `settlement`
- `service_id`
- `token`
- `session`
- `publicProfileId`
- `public_profile_id`

## Idempotency And Rollback

The Stage 38.3 migration should be additive and repeat-safe.

Recommended implementation properties:

- Use `create or replace function` for the dedicated RPC.
- Keep function comments explicit about public/guest read-only spectation.
- Apply explicit revokes and grants after function creation.
- Add no data writes.
- Add no broad table grants.
- Add indexes only if a bounded, clearly justified read path needs them.
- Preserve all existing authenticated spectator, participant identity, public profile, public leaderboard, and game mutation functions.

Rollback should be straightforward:

- Drop the dedicated public spectator RPC.
- Drop any optional additive index created exclusively for this RPC if necessary.
- No data repair should be required because the migration must not write game, account, profile, queue, claim, rating, or notification data.

## Stage 38.3 Stop Conditions

Stop before migration execution if any of these are true:

- The Supabase target cannot be confirmed as the intended `brrrdle-dev` project without printing secrets.
- The implementation would require broadening the existing authenticated spectator RPC.
- The implementation would require broadening participant identity RPCs.
- The implementation would require granting direct public table access.
- Practice-only eligibility cannot be preserved.
- Daily exclusion cannot be proven.
- Forbidden fields cannot be excluded from every returned path.
- Mutation capabilities cannot be represented as false/read-only.
- Anonymous callers can reach mutation paths.
- Identity-bearing spectator lists become necessary.
- Public profile fallbacks cannot avoid private or raw identity exposure.
- Non-printing probes cannot be run safely.

## Stage 38.3 Recommendation

After this addendum is reviewed, Stage 38.3 should proceed as migration/RLS execution only. It should create exactly one additive migration, apply it only to the confirmed `brrrdle-dev` Supabase project if credentials and target are unambiguous, run the non-printing probes above, and stop before source/runtime public/guest spectator integration.

Source/runtime integration belongs to Stage 38.4 after the public projection is verified.
