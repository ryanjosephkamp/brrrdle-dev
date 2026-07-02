# Phase 40 Private Matchmaking Accept Contract Repair Addendum

**Status**: Draft addendum for review.
**Phase**: Phase 40 - Public Profiles And Private Matchmaking.
**Stage**: 40.5A - Accepted-game contract repair addendum planning.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-01.
**Evidence**: `progress/PROGRESS-STEP-342.md`.

## Status And Authority

This addendum defines the smallest safe migration/RLS repair path for the Stage 40.5 private matchmaking accepted-game blocker. It follows the current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`, `planning/phase-40/PLANNING-BRIEF.md`, `planning/specs/phase-40/PHASE-40-PUBLIC-PROFILES-AND-PRIVATE-MATCHMAKING-SPEC-2026-07-01.md`, `planning/specs/phase-40/PHASE-40-PRIVATE-MATCHMAKING-MIGRATION-RLS-ADDENDUM-2026-07-01.md`, `planning/phase-40/IMPLEMENTATION-PLAN.md`, Stage 40.3 migration/probe evidence, Stage 40.4C verification, and Stage 40.5 blocked progress.

This addendum does not authorize source/runtime implementation, test implementation, SQL migration creation or execution, Supabase/Vercel configuration changes, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

## Blocker Being Repaired

Stage 40.5 stopped before source integration because the Stage 40.3 accept RPC requires raw participant user IDs inside the browser-submitted `p_game_projection`.

The existing Stage 40.3 response helper correctly returns only sanitized private request lifecycle fields and safe public profile summaries. It does not expose raw auth IDs.

However, `public.accept_private_multiplayer_match_request(text, jsonb, text)` validates:

- `p_game_projection.playerUserIds.player-one = requester_user_id`;
- `p_game_projection.playerUserIds.player-two = opponent_user_id`.

The accepting browser knows the current viewer's auth user ID but cannot know the requester raw auth user ID from the sanitized private request payload without violating Phase 40 privacy rules. A source-only workaround would either leak forbidden identity data or require the browser to invent server-owned participant identity. Both options are unsafe.

## Repair Decision

Stage 40.5B, if authorized after review, should create exactly one additive migration that adds a versioned accept RPC:

`public.accept_private_multiplayer_match_request_v2(p_request_id text, p_game_projection jsonb, p_idempotency_key text default null)`

The v2 function should:

- remain authenticated-only;
- preserve the existing request table and existing sanitized response helper;
- keep the same sanitized returned table shape used by Stage 40.3 private request RPCs;
- accept a browser-created game projection that intentionally omits `playerUserIds`;
- reject any browser-supplied `playerUserIds` object in `p_game_projection`;
- derive requester/opponent raw auth IDs server-side from `public.multiplayer_private_match_requests`;
- inject canonical `playerUserIds` into the stored `async_multiplayer_games.projection` server-side;
- set `host_user_id`, `player_one_user_id`, and `player_two_user_id` from the locked request row server-side;
- create exactly one fresh unranked Practice game for an eligible pending request;
- return only the existing sanitized private request response, including `created_game_id`.

This is preferred over broadening request response payloads with raw auth IDs. It also avoids asking browser source to become authority for canonical participant identity.

## Function And Grant Contract

The Stage 40.5B migration should:

1. `create or replace function public.accept_private_multiplayer_match_request_v2(text, jsonb, text default null)` with the same returned table columns as Stage 40.3 private match request RPCs.
2. Revoke all execution on the new v2 function from `PUBLIC`, `public`, `anon`, and `authenticated`.
3. Grant execute on the v2 function only to `authenticated`.
4. Revoke browser execution from the original v1 accept RPC `public.accept_private_multiplayer_match_request(text, jsonb, text)` so source integration cannot accidentally target the unsafe browser contract.
5. Preserve the original v1 function definition for migration compatibility unless the execution stage proves replacing it is safer and still additive.
6. Keep helper functions unavailable to browser roles.
7. Keep direct table access to `public.multiplayer_private_match_requests` denied for browser roles.

No direct table grants should be added. No `anon` mutation authority should be added.

## V2 Acceptance Rules

The v2 accept RPC must:

- require `auth.role() = 'authenticated'` and non-null `auth.uid()`;
- lock the request row with `for update`;
- expire stale pending requests before acceptance;
- deny missing requests, nonparticipant requests, requester acceptance, and third-party acceptance;
- allow only the opponent to accept a pending, unexpired request;
- return idempotently for repeated matching accepts against the same created game/idempotency key;
- reject attempts to create a different game after a request has already created one;
- recheck that requester and opponent public profiles are still active public profiles;
- require `p_game_projection` to be a JSON object;
- require a fresh `p_game_projection.id` different from the private request ID;
- require `scope = 'practice'`;
- require `ranked = false`;
- require `status = 'playing'`;
- require no `dailyDateKey`;
- require no `ratingBucket`;
- require no `matchmakingRequestId`;
- require no `customGameCode`;
- require no browser-supplied `playerUserIds`;
- require `mode`, `wordLength`, `hardMode`, `timeLimitMs`, and `goPuzzleCount` to match the request;
- require `currentTurn` to be `player-one` or `player-two`;
- reject existing `async_multiplayer_games.id` collisions;
- insert exactly one fresh row into `public.async_multiplayer_games`;
- set the request status to `created`;
- set `created_game_id`, `accept_idempotency_key`, `responded_at`, and `updated_at`;
- return the existing sanitized request response for the current viewer.

The v2 accept RPC must not create ranked games, Daily games, custom-code games, rating transactions, ranked queue rows, Daily claims, notifications, public profile changes, account changes, spectator rows, or any nonparticipant-visible request rows.

## Server-Side Projection Injection

The accepted game stored in `public.async_multiplayer_games.projection` should be based on the client-supplied `p_game_projection` plus server-injected canonical participant identity:

- `playerUserIds.player-one` must be set to `requester_user_id`;
- `playerUserIds.player-two` must be set to `opponent_user_id`.

The source/browser input must not include raw `playerUserIds`. The server should reject a projection that already contains `playerUserIds` rather than silently trusting or merging it.

The inserted row columns should remain canonical:

- `host_user_id = requester_user_id`;
- `player_one_user_id = requester_user_id`;
- `player_two_user_id = opponent_user_id`;
- `scope = 'practice'`;
- `mode = request.mode`;
- `daily_date_key = null`;
- `ranked = false`;
- `rating_bucket = null`;
- `matchmaking_request_id = null`;
- `custom_game_code = null`;

Stage 40.5 source integration should route to `created_game_id` and reload participant-owned multiplayer game rows from the repository instead of constructing a locally authoritative accepted game with unknown raw user IDs.

## Returned Fields

The v2 accept RPC should return the same allow-listed fields as the existing Stage 40.3 private match request response helper:

- request lifecycle fields;
- viewer role and viewer capability flags;
- same-settings Practice fields;
- `created_game_id`;
- timestamps;
- created/idempotent booleans;
- requester and opponent active public profile summary fields.

It must not return:

- raw auth IDs;
- emails;
- auth metadata;
- private profile fields;
- public profile drafts;
- progress, settings, history, stats, or local persistence state;
- answers, seeds, serialized sessions, player sessions, projections, moves, or guesses;
- queue internals, ranked request IDs, rating internals, rating transaction IDs, settlement IDs, or Elo calculation data;
- Daily claim IDs;
- service IDs, tokens, Supabase keys, Vercel tokens, screenshots, videos, traces, auth state, or local/session artifacts.

## Source Integration Implications

After Stage 40.5B migration/RLS repair succeeds, Stage 40.5 source integration may resume with these constraints:

- source should call `accept_private_multiplayer_match_request_v2`, not the v1 accept RPC;
- source should omit `playerUserIds` from the v2 accept projection payload;
- source should use sanitized request fields and safe public profile summaries for UI display only;
- after accept, source should refresh participant-owned multiplayer rows and select/open the returned `created_game_id`;
- source should not infer, cache, print, render, store in route state, or include raw auth IDs in local private request UI code;
- browser history, notification actions, and dashboard routing must not accept a request or create a game without explicit user action.

## Non-Printing Probe Expectations

Stage 40.5B migration/RLS repair must run non-printing probes that prove:

- `anon` cannot execute v1 or v2 accept RPCs;
- `authenticated` can execute the v2 accept RPC;
- browser execution is revoked from the v1 accept RPC after repair;
- helper functions remain unavailable to browser roles;
- direct table access remains denied to browser roles;
- requester acceptance is denied;
- nonparticipant acceptance is denied;
- opponent acceptance succeeds with a `p_game_projection` that omits `playerUserIds`;
- opponent acceptance rejects a `p_game_projection` that includes any browser-supplied `playerUserIds`;
- accepted-game creation stores canonical requester/opponent user IDs in `async_multiplayer_games` row columns;
- accepted-game creation injects canonical `playerUserIds` into the stored projection server-side;
- accepted-game creation remains Practice-only and unranked-only;
- accepted-game creation has no Daily date key, ranked flag, rating bucket, ranked matchmaking request ID, or custom game code;
- duplicate/repeated accept calls are idempotent for the same idempotency key or created game;
- attempts to accept the same request into a different game are denied;
- stale or expired requests cannot be accepted;
- inactive, private, hidden, suspended, missing, or malformed public profile states deny acceptance;
- RPC output contains no raw auth IDs, emails, private profile fields, answers, seeds, serialized sessions, player sessions, raw projections, moves, guesses, queue internals, rating internals, tokens, screenshots, videos, traces, auth state, or local/session artifacts;
- public profile RPC behavior remains unchanged;
- public ranked leaderboard behavior remains unchanged;
- participant identity RPC behavior remains unchanged;
- public/guest spectator RPC behavior remains unchanged;
- Daily claim anonymous grant hardening remains intact;
- ranked queue and trusted settlement authority remain unchanged.

Probes should print only pass/fail labels, safe counts, and non-secret field-name summaries. They must not print project refs, Supabase keys, database URLs, JWTs, emails, raw auth IDs, full game projections, answer/seed/session payloads, screenshots, videos, traces, auth state, local artifact paths beyond requested documentation paths, or local session data.

## Rollback And Idempotency Notes

The Stage 40.5B migration should be additive and rerunnable through Supabase migration tooling. It may include:

- `create or replace function` for the new v2 accept RPC;
- explicit revoke/grant statements for v1 and v2 accept RPCs;
- comments documenting the repaired browser contract.

It should not destructively reset request rows or game rows. Probe-created users, public profiles, request rows, and accepted games must be cleaned up by the probe workflow.

## Stop Conditions For Stage 40.5B

Stop before migration execution or source integration if:

- the working repository is not exactly `brrrdle-dev`;
- the original stable `brrrdle` repository would be touched;
- the Supabase target or credentials are ambiguous;
- the repair cannot stay additive;
- the repair requires returning raw auth IDs to browser source;
- browser source would need direct table access;
- `anon` would gain mutation authority;
- v2 cannot inject participant IDs server-side without trusting browser-supplied identity;
- accepted-game creation would broaden ranked, Daily, custom-code, spectator, public social graph, profile, notification, rating, or queue authority;
- non-printing probes cannot be run without printing secrets/private data;
- verification fails.

## Next Gated Action

After review, the next safe gate is Phase 40 Stage 40.5B private matchmaking accept-contract migration/RLS repair execution. That stage should create exactly one additive migration implementing this addendum, apply it only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous, run the non-printing probes, update docs only where needed, record progress, and halt for review before private matchmaking source integration resumes.
