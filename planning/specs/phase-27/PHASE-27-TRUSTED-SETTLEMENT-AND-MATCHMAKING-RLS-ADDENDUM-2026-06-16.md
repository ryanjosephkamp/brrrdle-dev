# Phase 27 Trusted Settlement And Matchmaking RLS Addendum

**Status**: Stage 27.2 planning addendum. Awaiting explicit migration execution authorization.
**Date**: 2026-06-16
**Repository**: `brrrdle-dev`
**Authority**: This addendum refines the Phase 27 planning brief, unified Phase 27 specification, and Phase 27 implementation plan for the migration/RLS work needed before trusted ranked settlement and durable ranked matchmaking are wired into the app.

## Scope

This addendum is documentation-only. It defines the recommended Supabase migration, RPC, RLS, grant, rollback, and verification shape for Phase 27 ranked multiplayer authority.

It does not create or run migrations, implement app source code, implement tests, deploy, commit, push, create a PR, merge, release, or touch the original stable `brrrdle` repository.

## Stage 27.2 Decision

Phase 27 ranked settlement and ranked matchmaking should use server-authoritative Supabase RPCs rather than browser-side table writes.

The existing competitive tables already point in this direction:

- `multiplayer_rating_profiles`, `multiplayer_match_results`, `multiplayer_player_results`, and `multiplayer_rating_transactions` have RLS enabled and intentionally lack direct client insert/update policies.
- `multiplayer_matchmaking_queue` currently allows authenticated users to create, read compatible queued requests, and update their own queue rows, but it does not yet encode all Stage 27.1 compatibility dimensions such as Practice Hard Mode matching and timed-ranked deferral.
- `async_multiplayer_games` remains the durable participant-owned game projection table. It contains raw projection data and must not be broadened for ranked settlement, leaderboard, or spectator discovery.
- The Phase 26 Live v1 spectator RPC is a good precedent: authenticated-only, `security definer`, bounded output, sanitized fields, and no broad raw `async_multiplayer_games` select.

## Read-Only Audit Summary

### Competitive Tables

The Phase 23 competitive migration created these ranked-ready tables:

- `multiplayer_rating_profiles`
- `multiplayer_match_results`
- `multiplayer_player_results`
- `multiplayer_rating_transactions`
- `multiplayer_matchmaking_queue`
- `custom_game_lobbies`

The rating tables include idempotency-friendly uniqueness:

- `multiplayer_match_results.idempotency_key` is unique.
- `multiplayer_rating_transactions.idempotency_key` is unique.
- `multiplayer_rating_transactions` is unique by `(match_result_id, bucket, user_id)`.

Current RLS allows authenticated users to read rating profiles broadly, read participant-owned match results, read own/opponent rating transactions, and create/update their own queue requests. It does not allow browser clients to directly settle matches or write rating movement.

### Async Multiplayer Game Rows

`async_multiplayer_games` is still the active durable multiplayer game table. It stores participant identities, status, mode, scope, rating bucket, and the full JSON `projection`.

Current RLS allows authenticated users to read waiting games or games where they are host/player one/player two. Updates are participant-oriented. A ranked settlement migration must not broaden raw row visibility and must not expose `projection` or answer-bearing nested fields to nonparticipants.

### Daily Claims

Daily Multiplayer claims are enforced through `multiplayer_daily_claims` and trigger-backed claim/release functions. Phase 27 v1 ranked behavior keeps Daily ranked deferred, so the ranked settlement and queue RPCs must reject Daily ranked requests and avoid changing Daily claim behavior.

### Live v1 Spectator Projection

`get_authenticated_live_v1_spectator_games` returns sanitized authenticated spectator projections from active `async_multiplayer_games` rows. It excludes raw projections, `serializedSession`, `playerSessions`, answers, seeds, raw auth ids, emails, and private profile data.

Phase 27 ranked work must preserve this separation. Spectators may view sanitized Live v1 rows, but spectator access must not provide settlement authority, queue mutation authority, raw projection access, or rating side effects.

### Stage 27.1 Domain Decisions To Preserve

The migration/RLS work must preserve the Stage 27.1 pure-domain decisions:

- Practice ranked first.
- Daily ranked deferred.
- Timed Practice ranked deferred.
- Hard Mode ranked only with matching queue settings.
- Match points remain separate from Elo/rank movement.
- Rating buckets normalize app-level `multiplayer:og` and `multiplayer:go` while existing storage tables still use `async:og` and `async:go`.
- Duplicate settlement must be idempotent.
- Timeout and forfeit precedence remain controlled by existing gameplay/result projection rules.

## Recommended Migration Shape

Create one additive migration for Stage 27.3 after explicit authorization. The migration should do four things:

1. Add missing queue and audit columns needed by the Phase 27.1 model.
2. Add server-authoritative RPCs for ranked queue creation, cancellation, and pairing.
3. Add a server-authoritative RPC for trusted ranked result settlement.
4. Tighten grants and RLS so browser clients cannot directly write rating movement or create inconsistent ranked games.

The migration should be additive and reversible. It should not drop existing tables or rewrite historical rows.

## Schema Additions

### `multiplayer_matchmaking_queue`

Add columns needed for Stage 27.1 compatibility:

- `hard_mode boolean not null default false`
- `time_limit_ms integer null`
- `word_length integer null` should remain, but the RPC should require a valid Practice ranked word length.
- `matchmaking_version text not null default 'phase27-ranked-v1'`
- `matched_game_id text null` if the team wants a distinct pointer to the created `async_multiplayer_games` row instead of reusing `matched_match_id`.

Recommended checks:

- `time_limit_ms is null or time_limit_ms > 0`
- ranked v1 queue RPC rejects non-null `time_limit_ms`
- ranked v1 queue RPC rejects `scope <> 'practice'`
- ranked v1 queue RPC rejects `transport <> 'async'`

Recommended indexes:

- Queued lookup index over `(transport, mode, scope, rating_bucket, ranked, status, hard_mode, word_length, queued_at)`
- Optional partial index for active ranked Practice queues where `status = 'queued' and ranked = true and scope = 'practice'`

### `multiplayer_match_results`

The existing table is usable for trusted settlement. Add audit metadata only if needed:

- `settlement_version text not null default 'phase27-ranked-v1'`
- `settlement_source text not null default 'trusted_rpc'`

### `multiplayer_rating_transactions`

Add audit columns so transactions can be reviewed and replayed without depending on client memory:

- `old_games_played integer`
- `new_games_played integer`
- `old_provisional boolean`
- `new_provisional boolean`
- `k_factor integer`
- `settlement_version text not null default 'phase27-ranked-v1'`

These columns are not required for the rating calculation itself, but they improve explainability, auditability, and future leaderboard/rank diagnostics.

## Trusted Ranked Settlement RPC

Recommended RPC name:

- `public.settle_ranked_async_multiplayer_match`

Recommended authority:

- `security definer`
- `set search_path = public, pg_temp`
- granted only to `authenticated`
- revoked from `public` and `anon`

Recommended inputs:

- `p_game_id text`
- `p_idempotency_key text default null`

The RPC should derive all rating evidence from the durable `async_multiplayer_games` row. It must not trust browser-supplied winner, score, rating delta, old rating, new rating, player ids, or profile data.

Required eligibility checks:

- Caller must be authenticated.
- The target game must exist.
- The target game must be participant-readable to the caller, or the caller must be one of `player_one_user_id`, `player_two_user_id`, or `host_user_id`.
- `ranked = true`.
- `scope = 'practice'`.
- `custom_game_code is null`.
- `player_one_user_id` and `player_two_user_id` are both present and distinct.
- `host_user_id`, `player_one_user_id`, and `player_two_user_id` must not be treated as public profile data in returned payloads.
- `rating_bucket in ('async:og', 'async:go')`.
- `mode` and `rating_bucket` agree.
- Timed Practice ranked is rejected. If no top-level `time_limit_ms` column exists, the RPC may inspect only the minimal `projection ->> 'timeLimitMs'` value needed for rejection.
- Daily ranked is rejected.
- Terminal status must be eligible for rating, normally completed win/loss or draw evidence derived from the durable projection/status rules.
- Expired, cancelled, corrupt, waiting, and playing rows are not rateable.
- Result projection must contain exactly two participant user ids and two distinct seats.
- The settlement evidence must be consistent with existing scoring and Stage 27.1 precedence rules.

Idempotency:

- Default idempotency key should be deterministic if `p_idempotency_key` is null, for example `phase27-ranked-v1:async:<game_id>:<rating_bucket>`.
- Repeated calls for the same settled game and bucket should return the already-created match result and transactions without changing ratings again.
- The RPC must use existing unique constraints and transactional locking, not client-side duplicate checks.

Rating profile updates:

- Initialize missing profiles at the Phase 27 initial rating.
- Lock both profile rows before computing changes.
- Use the Phase 27 K-factor/provisional policy.
- Insert one `multiplayer_match_results` row.
- Insert two `multiplayer_player_results` rows.
- Insert two `multiplayer_rating_transactions` rows.
- Update both `multiplayer_rating_profiles` rows.
- Keep match points separate from rating movement. Points may be recorded in summary/audit JSON, but they must not be Elo.

Return shape:

- Return a compact, participant-safe settlement summary.
- Do not return raw projection, answer fields, seeds, auth emails, raw private profile data, or mutable participant-only state.
- Include only settlement ids, bucket, old/new ratings, deltas, outcomes, and idempotency status needed by the app.

## Ranked Queue Authority RPCs

Recommended RPCs:

- `public.create_ranked_async_matchmaking_request`
- `public.cancel_ranked_async_matchmaking_request`
- `public.claim_ranked_async_matchmaking_pair`

All should be `security definer`, use `set search_path = public, pg_temp`, and be granted only to `authenticated`.

### Create Queue Request

The create RPC should:

- Require authenticated user identity from `auth.uid()`.
- Create only the caller's own queue row.
- Require `transport = 'async'`.
- Require `scope = 'practice'`.
- Require `ranked = true`.
- Require `mode in ('og', 'go')`.
- Require a valid `word_length` for Practice.
- Require `time_limit_ms is null` for ranked v1.
- Store `hard_mode` explicitly.
- Store a normalized `rating_bucket` of `async:og` or `async:go`.
- Store a server-read rating snapshot from `multiplayer_rating_profiles`, defaulting to the initial rating when absent.
- Use an idempotency key for retry-safe queue entry creation.
- Cancel or expire stale own queued rows only through explicit, auditable logic.

### Claim Pair

The pair-claim RPC should:

- Atomically select the best compatible queued opponent.
- Forbid self-match.
- Require both requests to be active, ranked, Practice, untimed, same mode, same word length, same Hard Mode value, same rating bucket, and unexpired.
- Apply the Phase 27 rating-gap/search-band policy.
- Lock queue rows before updating.
- Mark both rows as `matched`.
- Create exactly one `async_multiplayer_games` row with `ranked = true`, compatible mode/scope/settings, participant user ids, and a safe initial projection shape supplied by app code only if it can be validated.
- Prefer server-generated match/game ids or validate client-provided ids with the idempotency key.
- Return the game id and matched queue ids, not raw opponent private data.

If initial game projection validation cannot be done safely inside SQL, split this into two explicit stages:

1. RPC reserves/claims a compatible pair.
2. App creates the participant game row through a second trusted RPC that validates the pair reservation.

Do not allow arbitrary browser `insert` or `update` into `async_multiplayer_games` to become the trusted ranked queue authority.

### Cancel Queue Request

The cancel RPC should:

- Let the caller cancel only their own active queued request.
- Refuse cancellation after matched state unless a later abandoned-match policy explicitly authorizes it.
- Keep matched rows auditable.

## RLS And Grant Plan

Preserve these principles:

- No direct client insert/update/delete on rating profiles, match results, player results, or rating transactions.
- No broad raw `async_multiplayer_games` select for nonparticipants.
- No anonymous access to ranked queue RPCs or settlement RPCs.
- No public/guest ranked matchmaking.
- No public/guest leaderboard projection in Phase 27.

Recommended changes:

- Revoke broad direct queue table mutation grants if the new RPCs fully replace browser direct queue writes.
- Keep read access to a user's own queue status, or replace it with a private queue-status RPC.
- Keep rating profile reads authenticated-only until a later public leaderboard/profile phase decides otherwise.
- Keep Live v1 spectator RPC grants unchanged.
- Do not grant settlement RPC execution to `anon`.

## Privacy And Forbidden Fields

The migration and RPCs must not expose:

- raw `projection`
- `serializedSession`
- `playerSessions`
- answers or answer words
- seeds
- raw auth emails
- private profile data
- arbitrary auth ids beyond participant-safe current-user/opponent identifiers already allowed by existing participant result policies
- mutable participant-only state
- service-role details or secrets

The settlement RPC may read raw projection internally only to derive trusted result evidence. It must not return it.

## Bucket Compatibility

The app's current pure TypeScript domain uses `multiplayer:og` and `multiplayer:go`.

The existing Supabase competitive schema uses storage buckets:

- `async:og`
- `async:go`
- legacy `live:og`
- legacy `live:go`

Phase 27 ranked v1 should store active ranked Practice Multiplayer rows as `async:og` and `async:go`, while app DTOs normalize them back to `multiplayer:og` and `multiplayer:go`.

## Rollback Plan

The migration should be reversible with a follow-up rollback migration that:

- Revokes execute grants on new RPCs.
- Drops new RPCs.
- Drops new queue indexes added for Phase 27 if they are unused.
- Drops added queue/audit columns only if no production data depends on them.
- Leaves existing Phase 23 competitive tables, Daily claim tables, async game tables, and Phase 26 spectator RPC intact.

If any migration step partially succeeds, prefer a corrective forward migration over destructive rollback unless the failure occurs before data writes.

## Verification And RLS Probe Plan

Run non-printing probes against the intended `brrrdle-dev` Supabase project only after explicit migration authorization and target confirmation.

Required probes:

- `anon` cannot execute ranked queue RPCs.
- `anon` cannot execute trusted settlement RPC.
- Authenticated user can create a ranked Practice untimed queue request for self.
- Authenticated user cannot create a ranked Daily queue request.
- Authenticated user cannot create a ranked timed Practice request.
- Authenticated user cannot create a queue request for another user.
- Authenticated users with different Hard Mode settings do not match.
- Authenticated users with same Hard Mode, mode, word length, rating bucket, and compatible rating window can be paired exactly once.
- Concurrent pair claims do not create duplicate games.
- Participant can settle an eligible completed ranked Practice game.
- Repeated settlement returns idempotent existing result/transactions and does not move ratings twice.
- Nonparticipant authenticated spectator cannot settle a match.
- Direct browser insert/update into rating profiles, match results, player results, and rating transactions remains denied.
- Direct raw active-game select for nonparticipants remains denied.
- Phase 26 Live v1 spectator RPC still excludes forbidden fields.
- Daily claim create/release behavior remains unchanged.
- Existing participant create/join/resume/save behavior remains intact for unranked Practice and Daily Multiplayer.

## Real E2E Plan

After migration and app implementation are separately authorized, run real Supabase-backed multiplayer coverage:

- Player one enters ranked Practice queue.
- Player two enters compatible ranked Practice queue.
- RPC pairs them once and creates or reserves exactly one ranked Practice game.
- Both players complete a ranked Practice match.
- Trusted settlement creates one match result, two player results, two rating transactions, and updates two rating profiles.
- Re-running settlement is idempotent.
- A third authenticated Live v1 spectator can view the active row when appropriate but cannot settle or mutate it.
- Daily Multiplayer remains claim-safe and unrated.
- Unranked Practice continues to work without rating movement.

## Stop Conditions For Migration Execution

Stop before migration creation or execution if any of these are true:

- Supabase project target is ambiguous.
- Credentials or CLI tooling are unavailable.
- The intended migration would require exposing raw `async_multiplayer_games.projection` to nonparticipants.
- The intended migration would authorize public/guest ranked matchmaking.
- The intended migration would make Daily ranked active.
- The intended migration would make timed Practice ranked active.
- The queue RPC cannot enforce Hard Mode compatibility.
- The settlement RPC cannot derive result evidence server-side without trusting client-supplied rating movement.
- RLS probes cannot be run without printing secrets.
- Existing Daily claims, participant update policies, or Phase 26 spectator projection would be weakened.

## Open Decisions

- Whether `matched_game_id` should be added to `multiplayer_matchmaking_queue` or whether existing `matched_match_id` should be reused for the created `async_multiplayer_games.id`.
- Whether the pair-claim RPC should create the initial `async_multiplayer_games` row itself or reserve a pair for a second trusted game-creation RPC.
- Whether Phase 27 should add private rating-summary RPCs in the same migration or defer them to the private leaderboard-ready projection stage.

## Recommended Next Gated Action

Explicitly authorize Stage 27.3 or a Stage 27.2B migration execution pass to create and apply the additive Supabase migration for trusted ranked settlement and ranked queue authority.

The next prompt should require target confirmation, one additive migration, non-printing RLS/privacy probes, focused multiplayer verification, and no app UI/ranked implementation beyond migration/probe support unless separately authorized.
