# Progress Step 194 - Phase 27 Stage 27.5A Ranked Queue Game Creation Migration/RLS Addendum

**Phase**: Phase 27
**Stage**: Stage 27.5A - Ranked Queue Game Creation Migration/RLS Addendum
**Status**: Completed - Awaiting Explicit Stage 27.5B Migration Execution Authorization
**Started**: 2026-06-16T06:41:05Z
**Completed**: 2026-06-16T06:42:32Z

## Authorization

The user authorized Phase 27 Stage 27.5A planning/documentation only: ranked Practice queue game creation/finalization migration/RLS addendum.

Authorized work included reading governance, Phase 27 implementation and migration/RLS materials, progress records, Supabase documentation, relevant multiplayer repository/domain/UI surfaces, Supabase migrations, creating a precise migration/RLS addendum under `planning/specs/phase-27/`, recording the next progress step, and running lightweight documentation verification.

The authorization did not include source/runtime implementation, test implementation, creating or running migrations, Supabase execution, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work.

## Repository State

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Confirmed target is `brrrdle-dev`, not the original stable `brrrdle` repository.
- Current branch at kickoff: `main`
- Local `HEAD` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- `origin/main` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- Local `main` matched `origin/main` at kickoff.
- Existing uncommitted Phase 26/27 planning, source, migration, and progress artifacts were present before Stage 27.5A and were preserved.

## Work Completed

Created:

- `planning/specs/phase-27/PHASE-27-RANKED-QUEUE-GAME-CREATION-RLS-ADDENDUM-2026-06-16.md`

The addendum documents the Stage 27.5 blocker and recommends an additive server-authoritative path:

- keep the already verified Stage 27.3 create/cancel/claim queue RPCs intact;
- add a participant-safe matched-status/seat-assignment RPC;
- add a trusted ranked Practice game finalization RPC;
- create exactly one `async_multiplayer_games` row for a matched ranked Practice reservation;
- make the created game participant-complete and `playing`, not open `waiting`;
- derive participant ids and settings from the matched queue rows, not from untrusted app fields;
- validate the app-supplied initial projection against queue settings and deterministic seat assignment;
- keep Daily ranked, timed Practice ranked, public/guest spectation, public leaderboards, public profiles, and direct browser rating writes deferred.

## Blocker Resolution Strategy

Recommended Stage 27.5B migration shape:

- Add `public.get_ranked_async_matchmaking_status(p_request_id text)` for authenticated request owners to read their own queue status, matched game id, and deterministic seat assignment.
- Add `public.finalize_ranked_async_matchmaking_game(p_request_id text, p_matched_game_id text, p_game_projection jsonb, p_idempotency_key text default null)` for matched participants to atomically validate the pair reservation and create one participant-complete ranked Practice game row.
- Revoke both functions from `public` and `anon`; grant only to `authenticated`.
- Do not broaden raw `async_multiplayer_games` visibility.
- Do not create ranked queue-backed games in open `waiting` status.
- Preserve Stage 27.4 trusted settlement compatibility and Phase 26 Live v1 spectator privacy.

## Verification

Lightweight documentation verification was run after edits:

- `git diff --check`
- Python CSV shape check for `progress/PROGRESS.csv`
- `git status --short --branch`

## Next Step

Review this Stage 27.5A addendum. If acceptable, explicitly authorize Stage 27.5B migration execution before creating or applying the ranked queue game creation/finalization migration.

## Boundary Confirmation

No source/runtime implementation, test implementation, migrations, Supabase execution, Vercel configuration, deployments, commits, pushes, PRs, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, public leaderboards, public profiles, public/guest spectation, gameplay-rule changes, or original stable `brrrdle` repository work was performed during Stage 27.5A.
