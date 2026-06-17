# Progress Step 196 - Phase 27 Stage 27.5C Ranked Queue App Implementation

**Phase**: Phase 27
**Stage**: Stage 27.5C - Ranked Queue App Implementation
**Status**: Completed - Awaiting User Review Before Next Stage 27 Action
**Started**: 2026-06-16T17:36:35Z
**Completed**: 2026-06-16T17:55:32Z

## Authorization

The user authorized Phase 27 Stage 27.5C only: app implementation for durable ranked Practice matchmaking queue using the already-applied and verified Stage 27.5B status/finalization RPCs.

Authorized work includes source/test/progress changes needed to wire ranked Practice queue creation, cancellation, pair claiming, matched status/seat assignment, and trusted game finalization through the existing Supabase RPCs.

The authorization does not include creating or running migrations, implementing public leaderboards, public profiles, public/guest spectation, deployments, commits, pushes, PRs, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, gameplay-rule changes, or original stable `brrrdle` repository work.

## Repository State

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Confirmed target is `brrrdle-dev`, not the original stable `brrrdle` repository.
- Current branch at kickoff: `main`
- Local `HEAD` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- `origin/main` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- Local `main` matched `origin/main` at kickoff.
- Existing uncommitted Phase 26/27 planning, source, migration, and progress artifacts were present before Stage 27.5C and must be preserved.

## Planned Work

- Add or complete repository seams for ranked queue create, cancel, claim, status, and finalization RPCs.
- Add strict DTO parsing for ranked queue status and finalization responses.
- Finalize ranked Practice games through `public.finalize_ranked_async_matchmaking_game`, not through the old waiting-game join path.
- Preserve unranked/custom Practice create/join flows.
- Preserve Stage 27.4 trusted settlement behavior, Live v1 spectator privacy, Daily ranked deferral, timed Practice ranked deferral, Hard Mode matching requirements, and all gameplay invariants.
- Add focused tests for repository/domain/component routing and wrong-account/idempotency protections where applicable.

## Results

- Added an explicit server-id path to `createMultiplayerGame` so ranked queue finalization can use the trusted matched game id instead of creating a local waiting-game id.
- Added ranked Practice queue repository actions for:
  - queue request creation;
  - queue cancellation;
  - compatible pair claiming;
  - matched status and deterministic seat assignment reads;
  - trusted game finalization through `finalize_ranked_async_matchmaking_game`.
- Added strict DTO parsing for ranked queue RPC responses. Queue DTO parsing rejects raw projections, serialized sessions, answers, seeds, raw moves, and email-style identity fields. Participant ids are accepted only from the status RPC where Stage 27.5B explicitly exposes them for deterministic participant-complete finalization.
- Replaced the previous ranked preview-rival app path with durable queue behavior in `MultiplayerPanel`.
- Added queued/check/cancel UI state for authenticated ranked Practice queue requests.
- Ensured finalized ranked Practice games are inserted into app state only after trusted finalization succeeds.
- Preserved unranked/custom game creation and join flows.
- Preserved Stage 27.4 trusted settlement behavior, Live v1 spectator privacy, Daily ranked deferral, timed Practice ranked deferral, Hard Mode matching requirements, and all gameplay invariants.

## Verification

- Focused queue-adjacent tests passed: `npm run test -- src/multiplayer/multiplayerRepository.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/matchmaking.test.ts src/multiplayer/competitiveMultiplayer.test.ts` (4 files, 44 tests).
- `npm run lint` passed.
- `npm run test` passed (95 files, 605 tests).
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.
- `git diff --check` passed.
- Python CSV shape check passed for `progress/PROGRESS.csv` (198 rows including header, 12 columns each).
- Real Supabase-backed multiplayer E2E regression gate passed: `npm run test:e2e:multiplayer` (8/8).
- Resource cleanup check found no listeners on watched ports `5173`, `5174`, `3000`, or `4173`, and no Stage-owned Vite/Playwright/browser process left running.

## Boundary Confirmation

No migrations were created or run during Stage 27.5C. No public leaderboards, public profiles, public/guest spectation, deployments, commits, pushes, PRs, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, gameplay-rule changes, or original stable `brrrdle` repository work were performed.
