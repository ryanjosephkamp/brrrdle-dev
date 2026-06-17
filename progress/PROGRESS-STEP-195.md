# Progress Step 195 - Phase 27 Stage 27.5B Ranked Queue Game Creation Migration/RLS

**Phase**: Phase 27
**Stage**: Stage 27.5B - Ranked Queue Game Creation Migration/RLS
**Status**: Completed - Awaiting User Review Before Stage 27.5C
**Started**: 2026-06-16T16:54:34Z
**Completed**: 2026-06-16T17:30:22Z

## Authorization

The user authorized Phase 27 Stage 27.5B only: ranked Practice queue game creation/finalization migration/RLS execution.

Authorized work includes reading governance and Phase 27 migration materials, creating one additive Supabase migration under `supabase/migrations/`, adding authenticated-only RPC support for ranked queue status/seat assignment and trusted ranked Practice game finalization, applying the migration only to the confirmed `brrrdle-dev` Supabase project `fdwmvgervclziuoxbmeg` if target and credentials are unambiguous, running non-printing RLS/privacy probes, and updating progress records.

The authorization does not include app source/runtime implementation, tests beyond migration/probe support, public leaderboards, public profiles, public/guest spectation, deployments, commits, pushes, PRs, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, gameplay-rule changes, or original stable `brrrdle` repository work.

## Repository State

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Confirmed target is `brrrdle-dev`, not the original stable `brrrdle` repository.
- Current branch at kickoff: `main`
- Local `HEAD` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- `origin/main` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- Local `main` matched `origin/main` at kickoff.
- Existing uncommitted Phase 26/27 planning, source, migration, and progress artifacts were present before Stage 27.5B and must be preserved.

## Work Planned

- Create one additive migration for `public.get_ranked_async_matchmaking_status`.
- Create one additive migration function for `public.finalize_ranked_async_matchmaking_game`.
- Keep Stage 27.3 create/cancel/claim queue RPCs intact.
- Keep Stage 27.3B trusted settlement RPC intact.
- Ensure finalization creates exactly one participant-complete `playing` ranked Practice `async_multiplayer_games` row.
- Ensure finalization derives participant ids and settings from matched queue rows.
- Ensure finalization rejects Daily ranked, timed Practice ranked, mismatched Hard Mode, mismatched projection ids/settings, unrelated users, and duplicate mismatched rows.
- Run non-printing RLS/privacy probes.

## Results

Created one additive migration:

- `supabase/migrations/20260616165434_phase27_ranked_queue_game_finalization.sql`

The migration adds:

- `public.get_ranked_async_matchmaking_status(p_request_id text)`
  - authenticated-only;
  - owner-gated to the caller's queue request;
  - returns matched status and deterministic player-one/player-two seat assignment for matched ranked Practice reservations;
  - does not return raw projection, answer-bearing session data, emails, seeds, service-role details, or unrelated queued users.
- `public.finalize_ranked_async_matchmaking_game(p_request_id text, p_matched_game_id text, p_game_projection jsonb, p_idempotency_key text default null)`
  - authenticated-only;
  - validates exactly two matched ranked Practice queue rows;
  - derives participant ids and settings from the matched queue reservation;
  - validates the app-supplied initial projection against the reservation and deterministic seat assignment;
  - creates exactly one participant-complete `playing` `async_multiplayer_games` row;
  - returns only a compact creation/idempotency summary, not raw projection.

Remote migration execution did not run.

The Supabase linked project ref was confirmed locally as `fdwmvgervclziuoxbmeg`, matching the authorized `brrrdle-dev` project. However, the Supabase CLI reported:

- `Access token not provided. Supply an access token by running supabase login or setting the SUPABASE_ACCESS_TOKEN environment variable.`

Non-printing credential checks found:

- `SUPABASE_ACCESS_TOKEN` missing from the shell.
- `.env.local` contains only public browser Supabase values needed by the app (`VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`); no access token, service-role key, database URL, or other privileged migration credential was available.
- `~/.supabase` contained telemetry state only, not a stored access token.

Per the Stage 27.5B stop condition, work stopped before remote migration execution and before RLS/privacy probes.

## Retry Result

The user authorized a narrow Stage 27.5B retry to apply the already-created migration and run the non-printing RLS/privacy probes.

Retry checks confirmed:

- Working repository remains `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Current branch remains `main`.
- Local `HEAD` and `origin/main` both remain `747805e61f5014acd82a3487440543ab9ae385b6`.
- Linked Supabase project ref remains `fdwmvgervclziuoxbmeg`, matching the authorized `brrrdle-dev` project.
- Supabase CLI authentication is now available without printing secrets.
- The remote migration list showed local migration `20260616165434` pending before execution.

The retry applied the already-created migration:

- `supabase/migrations/20260616165434_phase27_ranked_queue_game_finalization.sql`

The migration was applied only to the confirmed `brrrdle-dev` Supabase project `fdwmvgervclziuoxbmeg`. A post-apply migration list confirmed:

- local `20260616165434`;
- remote `20260616165434`.

The non-printing RLS/privacy probe harness passed 25 checks and removed temporary probe rows/users. Covered checks included:

- anonymous callers cannot execute ranked status or finalization RPCs;
- unmatched authenticated callers cannot finalize ranked games;
- matched participants can read own status and deterministic seat assignment;
- unrelated authenticated callers cannot read another user's queue status;
- matched participants can finalize exactly one ranked Practice game;
- duplicate finalization is idempotent and creates no duplicate game row;
- finalized game rows are `playing`, participant-complete, ranked Practice, queue-compatible, untimed, and not Daily/custom;
- authenticated nonparticipants cannot read raw active ranked rows;
- wrong accounts cannot mutate finalized ranked games through raw updates;
- Live v1 spectator projection remains sanitized and read-only;
- trusted settlement succeeds and remains idempotent after a finalized ranked game reaches terminal;
- mismatched projection game id, participant ids, mode, word length, Hard Mode, scope, rating bucket, Daily key, custom game code, and time limit are rejected;
- existing unranked/custom Practice create/join behavior remains intact;
- existing Daily Multiplayer claim guard remains intact and unrated.

## Verification

Verification after the successful retry:

- `git diff --check` passed.
- Python CSV shape check passed for `progress/PROGRESS.csv`.
- `git status --short --branch` completed.

Remote migration/RLS verification passed as described above.

## Next Step

Review Stage 27.5B results, then explicitly authorize Stage 27.5C before ranked queue app implementation continues.

## Boundary Confirmation

No app source/runtime implementation, test implementation, additional migration creation, public leaderboards, public profiles, public/guest spectation, deployments, commits, pushes, PRs, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, gameplay-rule changes, or original stable `brrrdle` repository work was performed during Stage 27.5B.
