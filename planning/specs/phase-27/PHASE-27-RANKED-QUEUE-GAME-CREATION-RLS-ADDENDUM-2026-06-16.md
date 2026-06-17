# Phase 27 Ranked Queue Game Creation RLS Addendum

**Status**: Stage 27.5A planning addendum. Awaiting explicit migration execution authorization.
**Date**: 2026-06-16
**Repository**: `brrrdle-dev`
**Authority**: This addendum refines the Phase 27 planning brief, unified Phase 27 specification, Phase 27 implementation plan, and Stage 27.2 trusted settlement/matchmaking RLS addendum for the ranked Practice queue game-creation blocker found during Stage 27.5.

## Scope

This addendum is documentation-only. It defines the recommended migration, RPC, RLS, grant, rollback, and verification shape needed before ranked Practice queue app implementation can safely continue.

It does not create or run migrations, implement app source code, implement tests, deploy, commit, push, create a PR, merge, release, begin Phase 28, or touch the original stable `brrrdle` repository.

## Stage 27.5 Blocker

Stage 27.5 found that the currently applied Stage 27.3 queue RPCs can safely create, cancel, and reserve ranked Practice queue rows, but they cannot yet safely create a durable ranked Practice game.

Current behavior:

- `public.create_ranked_async_matchmaking_request` creates an authenticated ranked Practice queue row for the caller.
- `public.cancel_ranked_async_matchmaking_request` cancels only the caller's own queued request.
- `public.claim_ranked_async_matchmaking_pair` atomically reserves a compatible pair and writes a shared `matched_game_id`.
- The pairing RPC returns `request_id`, `opponent_request_id`, `matched_game_id`, and `request_status`.

Missing authority:

- The pairing RPC does not create the corresponding `async_multiplayer_games` row.
- The pairing RPC does not return enough participant identity or seat assignment for app code to create a participant-complete ranked game row safely.
- Existing `async_multiplayer_games` RLS permits authenticated users to read `waiting` games and update `waiting` games as joiners. A ranked reserved game created through the old waiting/join path could be joined by the wrong signed-in account.
- Trusted settlement later requires a terminal ranked game with exactly two distinct participant user ids and exactly two matched queue reservation rows for the same game id.

Conclusion:

Stage 27.5 should not continue through local app-side workarounds. Ranked Practice queue game creation needs trusted server authority before app implementation resumes.

## Recommended Migration Strategy

Prefer a second trusted finalization RPC instead of replacing the already verified pair-claim RPC.

Recommended additive RPC:

- `public.finalize_ranked_async_matchmaking_game`

Recommended companion status RPC:

- `public.get_ranked_async_matchmaking_status`

Rationale:

- Keeps the Stage 27.3 create, cancel, and claim RPC behavior intact.
- Preserves the already verified reservation semantics.
- Adds the missing authority exactly where needed: converting one matched queue reservation into one participant-complete ranked Practice `async_multiplayer_games` row.
- Avoids broadening direct browser insert/update authority on ranked game rows.
- Gives app code a participant-safe way to learn matched status and seat assignment before constructing the initial game projection.

The migration should be additive. It should not drop or rewrite the Stage 27.3 RPCs.

## Recommended Flow After Migration

1. Player A creates a ranked Practice queue request.
2. Player B creates a compatible ranked Practice queue request.
3. Either player calls `public.claim_ranked_async_matchmaking_pair`.
4. The claim RPC marks exactly two compatible rows as `matched` and writes one shared `matched_game_id`.
5. A matched participant calls `public.get_ranked_async_matchmaking_status` for their request.
6. The status RPC returns only participant-safe matched status, game id, queue ids, approved settings, and seat assignment for the two matched participants.
7. App code builds the initial ranked Practice game projection using the returned seat assignment.
8. A matched participant calls `public.finalize_ranked_async_matchmaking_game` with the matched request id, matched game id, and initial projection.
9. The finalization RPC validates the reservation, settings, participants, projection shape, and idempotency, then inserts exactly one `async_multiplayer_games` row.
10. Both participants load the created game through existing participant RLS and continue through the normal multiplayer repository flow.
11. Later terminal settlement continues through `public.settle_ranked_async_multiplayer_match`.

## RPC: Ranked Matchmaking Status

Recommended name:

- `public.get_ranked_async_matchmaking_status`

Recommended inputs:

- `p_request_id text`

Recommended authority:

- `security definer`
- `set search_path = public, pg_temp`
- granted only to `authenticated`
- revoked from `public` and `anon`

Required validation:

- Caller is authenticated.
- `p_request_id` belongs to `auth.uid()`.
- The request is a ranked Practice async request.
- Daily ranked, timed Practice ranked, non-Practice ranked, public/guest access, and non-owner reads are rejected.

Recommended return fields:

- `request_id`
- `request_status`
- `matched_game_id`
- `opponent_request_id`
- `viewer_seat` as `player-one` or `player-two` when matched
- `player_one_user_id`
- `player_two_user_id`
- `mode`
- `scope`
- `rating_bucket`
- `word_length`
- `hard_mode`
- `time_limit_ms`
- `queued_at`
- `matched_at` if available or null

Privacy rule:

Returning the two participant auth ids is acceptable only because the function is owner-gated to one of the two matched participants and the game row itself must store those participant ids. Do not return raw emails, profile metadata, raw projections, answer fields, seeds, spectator-only data, service-role details, or unrelated queued users.

Seat assignment should be deterministic. Recommended ordering:

- `player-one`: earlier `queued_at`; tie-break by queue `id`.
- `player-two`: the other matched request.

This avoids caller-dependent seat order and prevents two clients from building incompatible projections.

## RPC: Ranked Game Finalization

Recommended name:

- `public.finalize_ranked_async_matchmaking_game`

Recommended inputs:

- `p_request_id text`
- `p_matched_game_id text`
- `p_game_projection jsonb`
- `p_idempotency_key text default null`

Recommended return fields:

- `game_id`
- `request_id`
- `opponent_request_id`
- `request_status`
- `created boolean`
- `idempotent boolean`

The RPC should not return raw `projection`.

Recommended authority:

- `security definer`
- `set search_path = public, pg_temp`
- granted only to `authenticated`
- revoked from `public` and `anon`

## Finalization Validation Requirements

The finalization RPC must validate all of the following before insert:

- Caller is authenticated.
- Caller owns one matched queue row for `p_request_id`.
- Exactly two distinct queue rows share `p_matched_game_id`.
- Both queue rows are `status = 'matched'`.
- Both queue rows are `transport = 'async'`.
- Both queue rows are `scope = 'practice'`.
- Both queue rows are `ranked = true`.
- Both queue rows have the same `mode`.
- Both queue rows have the same normalized `rating_bucket`.
- Both queue rows have the same `word_length`.
- Both queue rows have the same `hard_mode`.
- Both queue rows have `time_limit_ms is null`.
- Both queue rows have distinct `user_id` values.
- `p_matched_game_id` matches both rows through `matched_game_id` or `matched_match_id`.
- `p_game_projection` is a JSON object.
- `p_game_projection ->> 'id'` equals `p_matched_game_id`.
- Projection `ranked` is true.
- Projection `scope` is `practice`.
- Projection `mode` matches the queue rows.
- Projection `wordLength` matches the queue rows.
- Projection `hardMode` matches the queue rows.
- Projection `timeLimitMs` is absent, null, zero, or otherwise normalized as untimed.
- Projection `dailyDateKey` is absent or null.
- Projection `customGameCode` is absent or null.
- Projection `matchmakingRequestId` refers to one of the two matched queue ids, or the finalization RPC writes/normalizes it before storage.
- Projection `ratingBucket` matches the app-level bucket corresponding to the storage bucket, such as `multiplayer:og` for `async:og`.
- Projection player user ids match the deterministic seat assignment exactly.
- Projection status is `playing`, not `waiting`, so the old public waiting-game join path is bypassed.
- Projection current turn is a valid participant turn.
- The row being inserted uses `host_user_id`, `player_one_user_id`, and `player_two_user_id` derived from the matched queue rows, not from untrusted client fields.
- No existing `async_multiplayer_games` row with the same id may belong to a different queue pair, different participants, different settings, or a non-ranked/untrusted source.

If projection validation cannot safely prove participant identity and settings, the RPC must reject the request rather than creating a partial ranked game.

## Game Row Creation Requirements

The finalization RPC should create exactly one `async_multiplayer_games` row for a matched ranked Practice pair.

Required row fields:

- `id = p_matched_game_id`
- `scope = 'practice'`
- `mode` from matched queue rows
- `daily_date_key = null`
- `status = 'playing'`
- `word_length` from matched queue rows
- `difficulty` from validated projection
- `go_puzzle_count` from validated projection when mode is GO
- `host_user_id = player_one_user_id`
- `player_one_user_id` from deterministic seat assignment
- `player_two_user_id` from deterministic seat assignment
- `ranked = true`
- `rating_bucket` from matched queue rows
- `matchmaking_request_id` set to a deterministic pair marker or caller request id
- `custom_game_code = null`
- `deadline_at = null`
- `projection = p_game_projection` after validation
- `created_at` and `updated_at` from server time or validated projection values bounded to reasonable server time

The created row should be participant-complete immediately. It should not enter an open `waiting` state.

## Idempotency And Race Safety

The migration must prevent duplicate ranked games for the same queue reservation.

Recommended idempotency key:

- `phase27-ranked-v1:finalize:<matched_game_id>`

Required behavior:

- Repeating finalization with the same matched pair and compatible projection returns the existing game summary without inserting another row.
- Repeating finalization with a different projection, different participants, different settings, or different queue rows rejects.
- Concurrent finalization attempts lock the two matched queue rows and the target game id before deciding whether to insert or return the existing row.
- `async_multiplayer_games.id = matched_game_id` remains the primary duplicate guard.
- The finalization RPC must use transactional locking and server-side validation, not client-side duplicate checks.

## RLS And Grant Requirements

Preserve the Stage 27.3 grant model:

- No direct browser writes to rating profiles, match results, player results, or rating transactions.
- No direct browser insert/update authority becomes the ranked queue game-creation authority.
- Queue direct insert/update remains revoked if Stage 27.3 already revoked it.
- New RPCs are executable only by `authenticated`.
- New RPCs are not executable by `public` or `anon`.
- Existing participant create/join/save flows for unranked Practice and Daily Multiplayer remain intact.
- Phase 26 Live v1 spectator RPC grants remain unchanged.

Recommended defensive RLS hardening:

- Do not create ranked queue-backed games in `waiting` status.
- If any ranked queue-backed waiting row could exist, update `async_multiplayer_games` read/update policies so broad `status = 'waiting'` access cannot expose or join `ranked = true` queue-backed rows.
- Preserve current unranked waiting lobby behavior for normal Lobby/custom flows.

## Forbidden Exposures

The new RPCs must not expose:

- raw `projection`
- `serializedSession`
- `playerSessions`
- answer words
- seeds
- raw auth emails
- private profile data
- unrelated queued user ids
- arbitrary auth ids outside the matched pair
- mutable participant-only state
- service-role details or secrets

The finalization RPC may read and store the raw projection only as the participant game row for the matched participants. It must not return it to arbitrary callers or spectators.

## Settlement Compatibility

The finalization RPC must produce rows that remain compatible with `public.settle_ranked_async_multiplayer_match`.

Required compatibility:

- `ranked = true`
- `scope = 'practice'`
- `rating_bucket in ('async:og', 'async:go')`
- `player_one_user_id` and `player_two_user_id` are both present and distinct
- no `custom_game_code`
- no Daily ranked state
- no timed Practice ranked state
- exactly two matched queue rows for the same game id and participants
- projection contains the existing terminal evidence shape once gameplay completes

Do not change the Stage 27.4 settlement repository seam or settlement RPC contract during this migration unless a probe proves a direct compatibility bug.

## Rollback Plan

If Stage 27.5B is later authorized and the migration must be rolled back, prefer a forward corrective migration.

Rollback migration should:

- revoke execute grants for `public.get_ranked_async_matchmaking_status`;
- revoke execute grants for `public.finalize_ranked_async_matchmaking_game`;
- drop the new functions;
- restore any defensive `async_multiplayer_games` policy text if it was changed;
- leave existing Stage 27.3/27.3B settlement and queue RPCs intact unless the corrective issue directly involves those functions;
- leave existing data rows intact unless a separate cleanup plan is approved.

## RLS And Privacy Probe Plan

After explicit Stage 27.5B migration authorization, run non-printing probes against only the intended `brrrdle-dev` Supabase project.

Required probes:

- `anon` cannot execute `get_ranked_async_matchmaking_status`.
- `anon` cannot execute `finalize_ranked_async_matchmaking_game`.
- Unrelated authenticated users cannot read another user's queue status.
- Unmatched authenticated users cannot finalize a game.
- A matched participant can read their own matched status and deterministic seat assignment.
- A matched participant can finalize exactly one ranked Practice game.
- The created game is `playing`, not open `waiting`.
- The created game has exactly two distinct participant user ids from the matched queue rows.
- The created game mode, scope, bucket, word length, Hard Mode, ranked flag, and time-limit values match the queue reservation.
- Duplicate finalize calls return idempotently without duplicate game rows.
- Mismatched projection game id is rejected.
- Mismatched projection player ids are rejected.
- Mismatched mode, word length, Hard Mode, scope, rating bucket, Daily key, custom game code, or time limit is rejected.
- A wrong signed-in account cannot join or mutate the ranked matched game through the old waiting-game path.
- Existing unranked/custom Practice create/join flows still work.
- Existing Daily Multiplayer claim behavior still works and remains unrated.
- Trusted settlement still succeeds after a finalized ranked Practice game reaches terminal state.
- Phase 26 Live v1 spectator projection still excludes forbidden fields.

## Real Supabase-Backed Verification Plan

After Stage 27.5B migration execution and Stage 27.5C app implementation are separately authorized, run real two-client queue verification:

- Player one enters ranked untimed Practice queue.
- Player two enters a compatible ranked untimed Practice queue.
- The pair is reserved once.
- One participant finalizes the ranked Practice game.
- Both participants discover the same participant-complete game.
- Neither participant can create a duplicate matched game for the same reservation.
- A third authenticated user cannot join or mutate the matched ranked game.
- Both participants can play to completion.
- Trusted settlement creates one match result, two player results, two rating transactions, and idempotently updates two rating profiles.
- Unranked Practice creation/join remains unaffected.
- Daily Multiplayer remains claim-safe and unrated.

## Stop Conditions For Stage 27.5B Migration Execution

Stop before creating or applying migration SQL if any of these are true:

- Supabase project target is ambiguous.
- Required credentials or CLI tooling are unavailable.
- The migration would expose raw `async_multiplayer_games.projection` to nonparticipants.
- The migration would grant public or anonymous ranked matchmaking.
- The migration would use the old waiting-game join path for ranked queue-created games.
- The migration would activate Daily ranked matchmaking.
- The migration would activate timed Practice ranked matchmaking.
- The migration would permit mismatched Hard Mode ranked pairing.
- The migration would weaken the Stage 27.4 trusted settlement behavior.
- The migration would weaken Phase 26 Live v1 spectator sanitization.
- The migration would require direct browser writes to rating/result tables.
- RLS probes cannot run without printing secrets.

## Open Decisions For Stage 27.5B

- Whether `get_ranked_async_matchmaking_status` should return both participant user ids directly, or return a narrower seat assignment token that the finalization RPC can validate without exposing opponent ids beyond the final participant row.
- Whether `matched_at` should be added to `multiplayer_matchmaking_queue` for clearer audit trails, or inferred from existing timestamps.
- Whether finalization should store `matchmaking_request_id` as the caller's queue request id or a deterministic pair-level id.
- Whether defensive `async_multiplayer_games` policy hardening is necessary if the finalization RPC never creates ranked waiting rows.

## Recommended Next Gated Action

Explicitly authorize Stage 27.5B migration execution to create and apply one additive migration for ranked Practice queue status/finalization RPCs.

That prompt should require:

- confirmed `brrrdle-dev` Supabase project target;
- one additive migration under `supabase/migrations/`;
- no app source/runtime implementation;
- no public/guest spectation;
- no public leaderboards or public profiles;
- non-printing RLS/privacy probes;
- focused SQL/RLS verification;
- documentation/progress updates;
- stop conditions for ambiguous target, missing credentials, or privacy/RLS failures.
