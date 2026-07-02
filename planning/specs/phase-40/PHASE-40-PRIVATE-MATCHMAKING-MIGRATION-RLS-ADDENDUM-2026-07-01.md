# Phase 40 Private Matchmaking Migration/RLS Addendum

**Status**: Draft addendum for review.
**Phase**: Phase 40 - Public Profiles And Private Matchmaking.
**Stage**: 40.2 - Migration/RLS addendum planning.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-01.
**Evidence**: `progress/PROGRESS-STEP-336.md`.

## Status And Authority

This addendum defines the database/RLS contract that should be executed only if the user later authorizes Phase 40 Stage 40.3 migration/RLS execution. It follows the current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`, `planning/phase-40/PLANNING-BRIEF.md`, `planning/specs/phase-40/PHASE-40-PUBLIC-PROFILES-AND-PRIVATE-MATCHMAKING-SPEC-2026-07-01.md`, `planning/phase-40/IMPLEMENTATION-PLAN.md`, and the Stage 40.1 audit.

This addendum does not authorize source/runtime implementation, test implementation, SQL migration creation or execution, Supabase/Vercel configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo changes, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

## Stage 40.1 Findings

Stage 40.1 found:

- public profile pages/cards and clickable identity can likely remain source-only if they use existing safe public profile RPCs and already-approved `public_profile_id` surfaces;
- existing public profile RPCs already provide active public profile lookup by opaque `public_profile_id`, with table access revoked from browser roles;
- existing participant identity summaries are authenticated and participant-scoped;
- existing public ranked leaderboard and public/guest spectator projections already expose only approved safe display fields;
- existing Practice rematch RPCs are a good lifecycle pattern but are limited to completed unranked non-custom Practice source games;
- existing `custom_game_lobbies` RLS allows authenticated users to read active waiting lobbies, so that table is not a private direct-request contract;
- direct player-to-player private requests need a new bounded, authenticated-only, participant-scoped contract before migration or source integration.

## Source-Only Public Profile Decision

No new migration is required for Phase 40 public profile pages, public profile cards, or clickable profile identity if source integration stays within these constraints:

- profile lookup uses only `get_public_player_profile(uuid)` and `get_public_player_profiles(uuid[])`;
- links are generated only from safe `publicProfileId` values returned by approved public profile, public ranked leaderboard, participant identity, public/guest spectator, or authenticated spectator surfaces;
- private, hidden, suspended, missing, malformed, stale, or unavailable profiles all render safe unavailable fallbacks;
- profile pages/cards stay display-only;
- source code and tests do not expose raw auth IDs, emails, private profile fields, progress, settings, history, answers, seeds, sessions, queue internals, rating internals, tokens, local artifacts, screenshots, videos, traces, or auth state.

If Stage 40.4 later discovers that the existing public profile RPCs cannot support the approved source behavior, the work must stop and return to a new addendum rather than broadening source assumptions.

## Migration Scope

Stage 40.3, if authorized, should create exactly one additive migration under `supabase/migrations/` for direct unranked Practice private match requests.

The migration should not change:

- `public_player_profiles` table grants or owner/public profile RPC grants;
- public ranked leaderboard grants;
- participant identity RPC grants;
- public/guest spectator RPC grants;
- ranked queue, trusted finalization, trusted settlement, Elo math, rank bands, or rating transaction authority;
- Daily Multiplayer claim rules, Daily spectator exclusion, Daily five-letter/no-clock/no-Hard-Mode behavior, or Daily answer separation;
- existing `custom_game_lobbies` RLS or behavior.

Custom-code/private invitation cleanup remains a later source-only cleanup only when it does not require RLS changes. If Phase 40 later needs truly private custom-code lobby visibility, that requires a separate addendum.

## Proposed SQL Contract

### Table

Create a dedicated table:

- `public.multiplayer_private_match_requests`

Recommended columns:

- `id text primary key default ('phase40-private-request-' || gen_random_uuid()::text)`
- `requester_user_id uuid not null references auth.users(id) on delete cascade`
- `opponent_user_id uuid not null references auth.users(id) on delete cascade`
- `requester_public_profile_id uuid not null`
- `opponent_public_profile_id uuid not null`
- `mode text not null check (mode in ('og', 'go'))`
- `word_length integer not null check (word_length between 2 and 35)`
- `hard_mode boolean not null default false`
- `time_limit_ms integer check (time_limit_ms is null or time_limit_ms > 0)`
- `go_puzzle_count integer check (go_puzzle_count is null or go_puzzle_count > 0)`
- `status text not null default 'requested' check (status in ('requested', 'created', 'declined', 'cancelled', 'expired'))`
- `created_game_id text unique references public.async_multiplayer_games(id) on delete set null`
- `request_idempotency_key text not null unique`
- `accept_idempotency_key text unique`
- `created_at timestamptz not null default now()`
- `expires_at timestamptz not null default (now() + interval '10 minutes')`
- `responded_at timestamptz`
- `updated_at timestamptz not null default now()`

Recommended checks:

- `requester_user_id <> opponent_user_id`
- `requester_public_profile_id <> opponent_public_profile_id`
- `mode = 'go'` requires `go_puzzle_count is not null`
- `mode = 'og'` requires `go_puzzle_count is null`

Recommended indexes:

- requester/status/updated index;
- opponent/status/updated index;
- created game index;
- active unordered pair uniqueness to prevent concurrent duplicate pending requests between the same two users;
- optional requester recent-request index for rate-limit probes and cleanup.

### RLS And Grants

Enable RLS on `public.multiplayer_private_match_requests`.

Revoke all table access from:

- `PUBLIC`
- `public`
- `anon`
- `authenticated`

Add a participant read policy for defense-in-depth, even though browser roles should not receive direct table grants:

- authenticated users can select rows where `auth.uid()` is `requester_user_id` or `opponent_user_id`.

Do not add direct browser insert, update, or delete table grants. All mutation must go through security-definer RPCs.

### Helper Functions

Create helper functions with no browser grants:

- `public.phase40_expire_private_match_requests()`
- `public.phase40_private_match_request_response(p_request_id text, p_viewer_user_id uuid, p_created boolean default false, p_idempotent boolean default false)`

The response helper should return only allow-listed request lifecycle fields and safe public profile summaries. It must never return raw auth IDs.

### Browser RPCs

Create authenticated-only RPCs:

- `public.create_private_multiplayer_match_request(p_target_public_profile_id uuid, p_mode text, p_word_length integer, p_hard_mode boolean default false, p_time_limit_ms integer default null, p_go_puzzle_count integer default null, p_idempotency_key text default null, p_expires_at timestamptz default null)`
- `public.get_private_multiplayer_match_requests(p_status text default null, p_limit integer default 50)`
- `public.cancel_private_multiplayer_match_request(p_request_id text)`
- `public.decline_private_multiplayer_match_request(p_request_id text)`
- `public.accept_private_multiplayer_match_request(p_request_id text, p_game_projection jsonb, p_idempotency_key text default null)`

Revoke all on these functions from `PUBLIC`, `public`, `anon`, and `authenticated`, then grant execute only to `authenticated` for the five browser RPCs. Do not grant helper functions to browser roles.

## Eligibility Rules

### Request Creation

`create_private_multiplayer_match_request` must:

- require `auth.role() = 'authenticated'` and non-null `auth.uid()`;
- require the requester to have an active public profile;
- require `p_target_public_profile_id` to resolve to an active public profile;
- deny self-requests;
- deny requests when either profile is private, hidden, suspended, missing, malformed, or stale;
- allow only Practice Multiplayer settings;
- allow only `og` or `go`;
- allow word lengths `2` through `35`;
- require `go_puzzle_count` for GO and forbid it for OG;
- treat all requests as unranked;
- reject Daily requests, ranked requests, rating buckets, matchmaking request IDs, custom game codes, and Daily date keys;
- require expiry to be in the future and no later than 10 minutes after creation;
- cap active outgoing pending requests per requester;
- reject or idempotently return an existing pending pair request instead of creating duplicates;
- generate an idempotency key if one is not supplied.

### Listing

`get_private_multiplayer_match_requests` must:

- require authentication;
- expire stale pending requests before listing;
- return only rows where the current user is requester or opponent;
- support optional status filtering over `requested`, `created`, `declined`, `cancelled`, and `expired`;
- cap `p_limit` to `1` through `100`;
- order by `updated_at desc, created_at desc`;
- return safe public profile summaries only for active public profiles;
- return unavailable profile flags/fallback fields when either profile is no longer active public.

### Cancellation And Decline

`cancel_private_multiplayer_match_request` must:

- require authentication;
- allow only the requester to cancel a pending, unexpired request;
- be safe on repeated calls by either returning the already-terminal row for the requester or rejecting with a non-secret authorization/status error.

`decline_private_multiplayer_match_request` must:

- require authentication;
- allow only the opponent to decline a pending, unexpired request;
- be safe on repeated calls by either returning the already-terminal row for the opponent or rejecting with a non-secret authorization/status error.

### Acceptance

`accept_private_multiplayer_match_request` must:

- require authentication;
- allow only the opponent to accept;
- expire stale pending requests before accepting;
- require request status `requested` and unexpired;
- require both requester and opponent profiles to still be active public;
- require a fresh `p_game_projection` object;
- require `p_game_projection.id` to be new and different from the request id;
- require `scope = 'practice'`;
- require `ranked = false`;
- require `status = 'playing'`;
- require no `dailyDateKey`, no `ratingBucket`, no `matchmakingRequestId`, and no `customGameCode`;
- require `mode`, `wordLength`, `hardMode`, `timeLimitMs`, and `goPuzzleCount` to match the request;
- require `playerUserIds.player-one` and `playerUserIds.player-two` to match the requester/opponent users in a deterministic seat order;
- require `currentTurn` to be `player-one` or `player-two`;
- insert exactly one fresh `async_multiplayer_games` row;
- set the request to `created` with `created_game_id`, `accept_idempotency_key`, `responded_at`, and `updated_at`;
- make repeated matching accept calls idempotent;
- reject attempts to create a different game after a request has already been created.

The accept RPC must not create ranked games, Daily games, custom-code games, rating transactions, queue rows, Daily claims, notifications, public profile changes, account changes, or spectator rows.

## Returned Fields

The private match request response should return only:

- `request_id`
- `request_status`
- `viewer_role`
- `viewer_can_accept`
- `viewer_can_cancel`
- `viewer_can_decline`
- `mode`
- `word_length`
- `hard_mode`
- `time_limit_ms`
- `go_puzzle_count`
- `created_game_id`
- `created_at`
- `expires_at`
- `responded_at`
- `updated_at`
- `created`
- `idempotent`
- requester safe public profile availability and fields:
  - `requester_identity_available`
  - `requester_public_profile_id`
  - `requester_display_name`
  - `requester_accent_color`
  - `requester_flair_key`
  - `requester_avatar_url`
  - `requester_profile_updated_at`
- opponent safe public profile availability and fields:
  - `opponent_identity_available`
  - `opponent_public_profile_id`
  - `opponent_display_name`
  - `opponent_accent_color`
  - `opponent_flair_key`
  - `opponent_avatar_url`
  - `opponent_profile_updated_at`

Do not return:

- raw auth IDs;
- emails;
- auth metadata;
- private profile fields;
- public profile drafts or owner-only fields;
- progress, settings, history, stats, or local persistence state;
- answers, seeds, serialized sessions, player sessions, projections, moves, or guesses;
- queue internals, ranked request IDs, rating internals, rating transaction IDs, settlement IDs, or Elo calculation data;
- Daily claim IDs;
- service IDs, tokens, Supabase keys, Vercel tokens, screenshots, videos, traces, auth state, or local/session artifacts.

## Notification And Routing Contract

The migration should not create notifications by itself.

Source integration may later derive in-app notification candidates from the participant-scoped request list. Notification payloads must use only returned safe request fields and profile summaries. Browser history, dashboard actions, and notification activation may route users to request views, but they must not accept, decline, cancel, create games, mutate profiles, mutate Daily claims, mutate ratings, or submit gameplay actions without explicit user action through trusted repository calls.

## Custom-Code And Private Invitation Routing

Existing custom-code lobby behavior remains unchanged by this addendum. Stage 40.3 should not alter `custom_game_lobbies` policies or grants.

Phase 40 may later improve custom-code/private invitation UI copy, copy buttons, routing, and stale fallbacks source-only if those changes do not require RLS changes. If future work requires hiding custom lobbies from authenticated users except by participant/private-code lookup, that work requires a separate addendum and migration execution gate.

## Non-Printing Probe Expectations

Stage 40.3 must run non-printing probes that prove:

- `anon` cannot execute any private match request RPC;
- `authenticated` can execute only the five approved browser RPCs;
- no direct browser table grants exist for `multiplayer_private_match_requests`;
- helper functions are not executable by browser roles;
- an unauthenticated user cannot create, list, cancel, decline, or accept requests;
- an authenticated requester without an active public profile cannot create a request;
- an authenticated requester cannot target private, hidden, suspended, missing, malformed, or self profiles;
- an authenticated requester can create one valid unranked Practice request against an active public profile;
- duplicate pending pair requests are denied or return idempotently without creating extra rows;
- active outgoing request caps are enforced;
- a nonparticipant cannot list, cancel, decline, accept, or infer request details;
- only the requester can cancel;
- only the opponent can decline or accept;
- expired requests cannot be accepted;
- cancelling, declining, and accepting update status as expected;
- accepted requests create exactly one unranked Practice `async_multiplayer_games` row with no Daily date key, no ranked flag, no rating bucket, no matchmaking request ID, and no custom game code;
- accepted-game creation is idempotent for a repeated matching accept call;
- forbidden-field scans over RPC output find no raw auth IDs, emails, private profile fields, answers, seeds, sessions, projections, queue internals, rating internals, tokens, screenshots, videos, traces, auth state, or local/session artifacts;
- public profile RPC behavior remains unchanged;
- public ranked leaderboard behavior remains unchanged;
- participant identity RPC behavior remains unchanged;
- public/guest spectator RPC behavior remains unchanged;
- Daily claim anonymous grant hardening remains intact.

Probes must report only pass/fail counts, safe row counts, and non-secret field-name summaries. Do not print auth tokens, service-role keys, emails, raw user IDs, request private payloads, projections, sessions, answers, seeds, or local artifact paths beyond requested documentation paths.

## Rollback And Idempotency Notes

The Stage 40.3 migration should be additive. It may include:

- `create table if not exists`;
- `create index if not exists`;
- `alter table ... enable row level security`;
- `drop policy if exists` / `create policy`;
- `create or replace function`;
- explicit revoke/grant statements.

The migration should be safe to rerun through Supabase migration tooling. It should not depend on destructive data resets. Any probe-created test rows, temporary users, request rows, and accepted games must be cleaned up by the probe workflow.

## Stage 40.3 Stop Conditions

Stop before staging, migration execution, or source integration if:

- the working repo is not exactly `brrrdle-dev`;
- the original stable `brrrdle` repository would be touched;
- the Supabase target or credentials are ambiguous;
- the migration cannot stay additive;
- the contract would require ranked private invitations, Daily match requests, spectator presence/count/list, public social graph behavior, push subscriptions, deployment/configuration, gameplay-rule changes, or Elo changes;
- any planned output field would expose forbidden data;
- `anon` would receive mutation authority;
- direct table grants would be required for browser clients;
- custom lobby RLS changes are required but not separately authorized;
- accepted-game creation cannot preserve unranked Practice-only boundaries;
- non-printing probes cannot be defined or run without exposing secrets/private data;
- verification fails.

## Next Gated Action

After review, the next safe gate is Phase 40 Stage 40.3 migration/RLS execution. That stage should create exactly one additive migration implementing this addendum, apply it only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous, run the non-printing probes, update Supabase/ranked docs only if needed, record progress, and halt for review before any source/runtime implementation.
