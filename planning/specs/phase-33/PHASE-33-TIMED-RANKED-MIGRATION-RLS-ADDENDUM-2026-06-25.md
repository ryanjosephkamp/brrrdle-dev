# Phase 33 Timed Ranked Migration/RLS Addendum

**Status**: Stage 33.2 addendum for review.
**Repository**: `brrrdle-dev` only. Do not touch the original stable `brrrdle` repository.
**Date**: 2026-06-25.
**Authority**: Supplements the Phase 33 planning brief, unified specification, and implementation plan. It does not authorize SQL migration execution, source/runtime implementation, test implementation, deployment, Git/GitHub operations, or release work.

## Purpose

Phase 33.1 confirmed that timed Practice ranked cannot proceed as a source-only change. The current app guards, SQL helpers, ranked queue RPCs, ranked game finalization RPC, trusted settlement RPC, rating bucket constraints, and participant identity RPC all assume untimed ranked Practice.

This addendum defines the additive SQL/RLS contract required before Phase 33 can safely implement timed Practice ranked v1.

## Locked Decisions

- Timed Practice ranked v1 may support only one clock: `300000` milliseconds per side.
- Untimed ranked Practice remains unchanged and continues to use the existing storage buckets:
  - `async:og`
  - `async:go`
- Timed ranked Practice must use separate storage buckets:
  - `async:og:timed:v1`
  - `async:go:timed:v1`
- Timed ranked Practice must use separate app buckets:
  - `multiplayer:og:timed:v1`
  - `multiplayer:go:timed:v1`
- Elo math, provisional rules, K factors, outcome scoring, and gameplay rules remain unchanged.
- Timed ranked bucket separation means timed and untimed results never share the same rating profile or transaction bucket.
- Timed buckets must not be exposed through the public ranked leaderboard in Phase 33 unless a later approved addendum explicitly changes that.
- Daily ranked and ranked custom/private-code games remain deferred.

## Current SQL/RLS Blockers

Stage 33.1 found these current blockers:

- `multiplayer_rating_profiles.bucket`, `multiplayer_rating_transactions.bucket`, `multiplayer_match_results.rating_bucket`, and `multiplayer_matchmaking_queue.rating_bucket` only allow the existing untimed/live storage buckets.
- `phase27_rating_bucket_for_mode(p_mode)` maps only to `async:og` and `async:go`.
- `create_ranked_async_matchmaking_request` rejects positive `p_time_limit_ms`.
- `claim_ranked_async_matchmaking_pair` only matches requests with `time_limit_ms is null`.
- `get_ranked_async_matchmaking_status` rejects matched ranked queue contexts with `time_limit_ms is not null`.
- `finalize_ranked_async_matchmaking_game` rejects ranked queue pairs and projections with positive time limits.
- `settle_ranked_async_multiplayer_match` rejects timed ranked game projections and requires untimed queue reservations.
- `get_multiplayer_participant_identity_summaries` rejects ranked queue identity contexts with `time_limit_ms is not null`.
- The public ranked leaderboard RPC is intentionally limited to untimed `multiplayer:og` and `multiplayer:go` buckets.

## Required Migration Shape

Stage 33.3 should create exactly one additive migration under `supabase/migrations/`. It may replace existing security-definer RPC definitions in place with stricter compatible definitions, but it must not create a destructive data migration or delete existing rating data.

The migration must be applied only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous.

## Required SQL Helpers

The migration should add or replace internal helper functions for ranked Practice bucket and clock validation:

- `phase33_ranked_timed_practice_time_limit_ms()` returns `300000`.
- `phase33_is_ranked_practice_time_limit_supported(p_time_limit_ms integer)` returns true only for `null` or `300000`.
- `phase33_ranked_practice_storage_bucket_for_mode_and_time_limit(p_mode text, p_time_limit_ms integer)` maps:
  - `og`, `null` -> `async:og`
  - `go`, `null` -> `async:go`
  - `og`, `300000` -> `async:og:timed:v1`
  - `go`, `300000` -> `async:go:timed:v1`
- `phase33_ranked_practice_app_bucket_for_storage_bucket(p_bucket text)` maps the four storage buckets to the four app buckets.
- `phase33_is_timed_ranked_practice_storage_bucket(p_bucket text)` returns true only for the two timed storage buckets.

Helper functions should be revoked from `public`, `anon`, and `authenticated` unless a specific externally callable helper is later approved. Security-definer RPCs may call them internally.

The existing `phase27_rating_bucket_for_mode(p_mode)` may remain for backward compatibility. New or replaced Phase 33 RPC definitions should use the Phase 33 helpers.

## Required Constraint Changes

The migration must expand only the constraints needed for async ranked Practice timed buckets:

- `public.multiplayer_rating_profiles.bucket`
- `public.multiplayer_rating_transactions.bucket`
- `public.multiplayer_match_results.rating_bucket`
- `public.multiplayer_matchmaking_queue.rating_bucket`
- `public.async_multiplayer_games.rating_bucket`, if the current constraint is present in the target project

Allowed values should include the existing values plus:

- `async:og:timed:v1`
- `async:go:timed:v1`

Do not expand `live_lobbies.rating_bucket` or `live_matches.rating_bucket` unless a target-project inspection proves those constraints block Phase 33. Timed Practice ranked v1 is async Practice only, not Live.

Do not add a table-level constraint that forces all ranked time limits to `300000`, because unranked Practice may continue to use other time limits. Enforce ranked clock eligibility inside the ranked queue/finalization/settlement RPCs.

## Required Indexing

The existing ranked queue lookup index may remain. Add a focused compatible lookup index if needed so timed and untimed queue matching cannot degrade or accidentally mix time controls.

Recommended index:

- `multiplayer_matchmaking_queue_ranked_practice_time_lookup_idx` on the ranked queue columns needed for claim lookup, including `transport`, `mode`, `scope`, `ranked`, `status`, `rating_bucket`, `hard_mode`, `word_length`, `time_limit_ms`, and `queued_at`.

The index should be partial for ranked async Practice queued rows if possible.

## Ranked Queue Creation Contract

`create_ranked_async_matchmaking_request` must continue to be authenticated-only and must:

- Require `p_scope = 'practice'`.
- Reject Daily ranked.
- Reject unsupported `p_time_limit_ms` values. Only `null` and `300000` are valid.
- Treat `null` as untimed ranked Practice.
- Treat `300000` as timed ranked Practice v1.
- Use the Phase 33 bucket helper for `rating_bucket`.
- Read the rating snapshot from the matching storage bucket.
- Preserve hard mode and word length validation.
- Preserve no direct table insert privileges for browser clients.
- Preserve idempotent user/request behavior.
- Include time control in idempotency semantics so a user can never collide an untimed queue request with a timed queue request.
- Store `time_limit_ms = null` for untimed and `time_limit_ms = 300000` for timed.
- Use `matchmaking_version = 'phase27-ranked-v1'` for untimed requests and `matchmaking_version = 'phase33-ranked-timed-v1'` for timed requests.

To reduce app and SQL churn, Stage 33.3 should not change the create RPC return table unless implementation later proves it is necessary. The status RPC already returns `time_limit_ms`, and the app can preserve selected time control locally during queue creation.

## Ranked Queue Claim Contract

`claim_ranked_async_matchmaking_pair` must:

- Continue to require authenticated users.
- Preserve no-self-match behavior.
- Require both requests to be ranked async Practice.
- Require matching mode, rating bucket, hard mode, word length, and search band compatibility.
- Require `candidate.time_limit_ms is not distinct from request.time_limit_ms`.
- Require both time controls to be either `null` or exactly `300000`.
- Require the storage bucket to match the Phase 33 helper for mode and time control.
- Preserve existing matched row reservation/idempotency semantics.
- Never match timed and untimed requests together.
- Never match different timed controls if later unsupported values somehow exist.

## Ranked Queue Status Contract

`get_ranked_async_matchmaking_status` must:

- Continue to be authenticated-only.
- Allow matched ranked queue contexts where both rows are untimed or both rows are canonical timed `300000`.
- Reject corrupt or unsupported timed values.
- Require the storage bucket to match the Phase 33 helper.
- Continue returning `time_limit_ms`.
- Avoid exposing queue internals beyond the existing safe status fields needed by the app.

## Ranked Game Finalization Contract

`finalize_ranked_async_matchmaking_game` must:

- Continue to be authenticated-only.
- Require exactly two matched queue reservations for two distinct users.
- Require ranked async Practice.
- Require matching mode, hard mode, word length, rating bucket, and time control.
- Reject Daily, custom/private-code, and unsupported timed contexts.
- Map storage bucket to app bucket through the Phase 33 helper.
- Require `p_game_projection.ratingBucket` to match the expected app bucket.
- For untimed ranked Practice:
  - require `timeLimitMs` to be absent, null, empty, or `0`;
  - preserve current behavior.
- For timed ranked Practice:
  - require `timeLimitMs = 300000`;
  - require `timeRemainingMs` to be present for both `player-one` and `player-two`;
  - require both initial remaining values to equal `300000`;
  - require `turnStartedAt` to be present and parseable when the created game starts in `playing` status.
- Preserve idempotent existing-game behavior, but include rating bucket and time-control checks in existing-game validation.
- Insert the async game with the timed storage bucket for timed ranked.
- Keep `deadline_at` unchanged unless a later explicit spec defines a global deadline model. Timed Practice ranked uses per-side clock state, not a global deadline.

## Trusted Settlement Contract

`settle_ranked_async_multiplayer_match` must:

- Continue to be authenticated-only.
- Continue to require participant-only settlement.
- Continue to require ranked async Practice, non-custom, terminal game status, and trusted durable game evidence.
- Use the Phase 33 helper to derive the storage bucket from game mode and projection time control.
- Preserve existing untimed settlement behavior.
- For timed ranked Practice, accept only `timeLimitMs = 300000`.
- Reject unsupported or corrupt timed values.
- Require queue reservations for both participants with matching:
  - mode;
  - hard mode;
  - word length;
  - rating bucket;
  - `time_limit_ms`;
  - matched game id;
  - users.
- Require timed projection clock evidence:
  - `timeRemainingMs.player-one` and `timeRemainingMs.player-two` must be numeric;
  - remaining values must be nonnegative and not greater than `300000`;
  - if a timeout is the terminal cause, `timedOutPlayerId` must be either `player-one` or `player-two`;
  - if `timedOutPlayerId` is present, the timed-out player's remaining time must be `0`;
  - timeout-loser precedence remains unchanged.
- Preserve normal non-timeout ranked result projection for completed timed games.
- Use timed bucket rating profiles and rating transactions for timed games.
- Use settlement version `phase33-ranked-timed-v1` for timed ranked settlement.
- Preserve `phase27-ranked-v1` semantics for untimed ranked settlement.
- Use timed idempotency keys for timed ranked settlement so repeated settlement cannot duplicate transactions.
- Preserve Elo algorithm, provisional counts, K factors, outcome scores, and match-points/Elo separation.

## Participant Identity RPC Contract

`get_multiplayer_participant_identity_summaries` must remain participant-scoped and public-safe. For ranked queue contexts it must:

- Allow matched queue pairs that are either untimed or canonical timed `300000`.
- Require both rows to have matching time control.
- Require the storage bucket to match the Phase 33 helper.
- Preserve all Phase 32 privacy boundaries.
- Return only the current allow-listed public profile fields.
- Never expose raw auth emails, raw auth ids beyond existing internal participant context, private profile metadata, queue internals, game projections, answers, seeds, sessions, rating transaction ids, settlement ids, tokens, or spectator data.

## Public Leaderboard Contract

Phase 33 must not expose timed ranked buckets publicly.

`get_public_ranked_leaderboard` should remain limited to:

- `multiplayer:og`
- `multiplayer:go`

and storage buckets:

- `async:og`
- `async:go`

If a timed app bucket is passed to the public leaderboard RPC, it should remain unsupported. Public leaderboard timed exposure requires a later explicit spec/addendum.

The source-only Phase 33 public leaderboard UI cleanup may remove the player-facing `All buckets` view and default to OG, but that does not require SQL changes.

## RLS And Grants

Stage 33.3 must preserve the existing security posture:

- Browser clients must not receive direct insert/update access to ranked queue rows, rating profiles, rating transactions, or match results.
- Ranked queue, finalization, settlement, and identity access must remain through authenticated security-definer RPCs.
- No `anon` execute grants should be added.
- Internal helper functions should be revoked from `public`, `anon`, and `authenticated`.
- RPC outputs must remain minimal and app-required.
- Existing RLS policies must not be weakened.

## Abuse And Idempotency Requirements

Stage 33.3 must preserve or improve:

- no self-match;
- no timed/untimed cross-match;
- no unsupported time control matching;
- no Daily ranked creation;
- no ranked custom/private-code games;
- no direct table writes from browser clients;
- idempotent queue creation;
- idempotent pair claiming;
- idempotent game finalization;
- idempotent settlement with no duplicate rating transactions;
- stale/corrupt queue rejection;
- stale/corrupt projection rejection;
- nonparticipant rejection.

## Required Non-Printing Probes

Stage 33.3 migration execution must include non-printing probes that do not expose secrets, tokens, auth state, private data, game answers, seeds, screenshots, videos, traces, or local session artifacts.

Minimum probes:

- Unauthenticated calls to ranked queue creation, queue status, pair claim, finalization, settlement, and participant identity RPCs are denied.
- Authenticated untimed ranked queue creation still works.
- Authenticated timed ranked queue creation accepts `300000`.
- Timed ranked queue creation rejects unsupported time controls such as `60000`, `120000`, and arbitrary positive values.
- Daily ranked remains rejected.
- Ranked custom/private-code games remain rejected.
- Compatible timed users can match.
- Timed and untimed users cannot match.
- Different hard mode, word length, mode, bucket, or unsupported time controls cannot match.
- Timed matched queue status returns `time_limit_ms = 300000`.
- Timed finalization accepts a valid canonical projection.
- Timed finalization rejects mismatched rating buckets, missing clock evidence, wrong starting remaining time, Daily projections, custom projections, and unsupported timers.
- Timed settlement accepts a valid terminal timed ranked game and writes rating profile/transaction data only to the timed bucket.
- Timed timeout settlement requires durable timeout evidence and preserves timeout-loser precedence.
- Repeated timed settlement is idempotent and does not duplicate rating transactions.
- Public leaderboard RPC remains limited to untimed ranked Practice buckets.
- Participant identity RPC works for matched timed ranked participants and exposes only allow-listed public-safe fields.
- Existing untimed ranked probes still pass.

## Rollback Strategy

Stage 33.3 should be additive and reversible by a later explicit rollback migration if needed.

Rollback notes must identify:

- helper functions added in Phase 33;
- RPC definitions replaced in Phase 33;
- constraints expanded for timed buckets;
- indexes added for timed lookup;
- grants/revokes added or preserved.

Do not run rollback automatically in Stage 33.3. If migration execution fails or probes fail, stop, record the non-secret failure, and do not proceed to source implementation.

## Documentation Updates Expected After Execution

If Stage 33.3 executes successfully, update:

- `docs/supabase.md` with the timed ranked bucket/RPC/RLS contract;
- `docs/ranked-multiplayer.md` only when source behavior is implemented or when the doc clearly marks timed ranked as migration-ready but not yet app-enabled;
- progress records with target confirmation, migration path, probe results, and verification.

## Preserved Deferrals

This addendum preserves:

- Daily ranked deferral;
- ranked custom/private-code deferral;
- public/guest spectation deferral;
- service workers and push infrastructure deferral;
- Vercel/auth/account-management readiness deferral;
- onboarding/help UX deferral;
- public timed leaderboard exposure deferral;
- Elo algorithm changes deferral;
- gameplay-rule changes deferral.

## Stage 33.3 Go/No-Go

Timed ranked can proceed to Stage 33.3 migration/RLS execution after this addendum is reviewed and explicitly authorized.

Stage 33.3 must stop before app source implementation unless the migration executes cleanly, non-printing probes pass, and lightweight verification is clean.
