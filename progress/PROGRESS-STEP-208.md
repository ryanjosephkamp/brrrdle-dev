# Progress Step 208: Phase 28 Stage 28.4 Live Spectator App Implementation

**Status**: Completed - Awaiting User Review Before Stage 28.5.
**Date**: 2026-06-18.
**Repository**: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Branch**: `main`.

## Authorization

The user authorized Phase 28 Stage 28.4 only: Live spectator app implementation using the already-applied and verified Stage 28.3 v2 spectator RPC.

Authorized work:

- read governance, Phase 28 planning/spec/addendum materials, Stage 28.3 progress, `docs/supabase.md`, and relevant Live spectator source/tests;
- create this progress report and append the matching `progress/PROGRESS.csv` row;
- add app support for `public.get_authenticated_live_v1_spectator_games_v2`;
- implement immediate Live entry refresh and active visible Live polling at the approved 3-5 second cadence, defaulting to 5 seconds;
- keep slower or paused behavior when Live is inactive or the document is hidden;
- implement a focused read-only spectator view for `Spectate live game`;
- consume sanitized terminal metadata so spectators see a brief terminal board/outcome hold before removal;
- add app-side current Daily spectator exclusion as defense in depth;
- preserve participant Live rows, ranked Practice queue/settlement, unranked/custom flows, Daily Multiplayer invariants, Live v1 privacy, and gameplay rules;
- add focused repository/parser, view-model, component, and E2E coverage for touched Live spectator behavior.

Not authorized:

- Supabase migration creation or execution;
- notification delivery implementation;
- Elo transparency implementation;
- public/guest spectation;
- public profiles;
- public leaderboards;
- service workers or push infrastructure;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 29 work;
- gameplay-rule changes;
- new custom skills;
- force-push;
- secret printing;
- original stable `brrrdle` repository work.

## Starting Repository State

Confirmed before editing:

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- branch: `main`
- `HEAD`: `a051931dad51e554be151bc45e811efc18f4f04d`
- `origin/main`: `a051931dad51e554be151bc45e811efc18f4f04d`
- remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`
- original stable repo: not used; this pass stayed inside `brrrdle-dev`

Existing uncommitted Phase 28 planning/spec/progress artifacts were present and preserved.

## Work Completed

Created:

- `progress/PROGRESS-STEP-208.md`

Updated:

- `e2e/gameplay/live-v1-spectator.spec.ts`
- `progress/PROGRESS.csv`
- `src/app/App.tsx`
- `src/multiplayer/MultiplayerLive.test.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.test.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/multiplayerRepository.test.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerViewModels.test.ts`
- `src/multiplayer/multiplayerViewModels.ts`

Implementation summary:

- Added strict app-side parsing for the v2 sanitized spectator RPC, including terminal statuses, terminal timestamps, terminal hold timestamps, and sanitized outcome metadata.
- Switched authenticated spectator discovery to `get_authenticated_live_v1_spectator_games_v2`.
- Added app-side current UTC-day Daily spectator exclusion as defense in depth.
- Added immediate refresh on authenticated spectator load/Live entry and five-second active-visible Live polling, while keeping idle visible polling at 30 seconds and pausing while the document is hidden.
- Added a focused read-only spectator panel for `Spectate live game` without creating a public route or mutation controls.
- Preserved participant Live resume rows, ranked Practice queue/settlement behavior, unranked/custom flows, Daily Multiplayer invariants, Live v1 privacy, and gameplay rules.
- Added focused repository/parser, view-model, component, and real Supabase-backed Live spectator E2E coverage.

## Verification

Passed:

- Focused Live/unit tests: `npm run test -- src/multiplayer/multiplayerRepository.test.ts src/multiplayer/multiplayerViewModels.test.ts src/multiplayer/MultiplayerLive.test.tsx src/multiplayer/MultiplayerWorkspace.test.tsx` (4 files, 38 tests).
- `npm run lint`.
- `npm run test` (96 files, 615 tests).
- `npm run build` (passed with the existing Vite large-chunk advisory).
- `npx tsc -p tsconfig.api.json --noEmit`.
- Focused real Supabase-backed Live spectator E2E: `npm run test:e2e -- e2e/gameplay/live-v1-spectator.spec.ts` (1/1 passed after tightening the focused-view locator/reset helper; one prior setup retry failed before spectator assertions in the existing create/join path and passed on rerun).
- `git diff --check`.
- Python CSV shape check using `PYTHONDONTWRITEBYTECODE=1 PYTHONNOUSERSITE=1 python3 -S` (210 rows including header, 12 columns each, last_id=208).
- `git status --short --branch`.
- Watched-port cleanup check found no listeners on `5173`, `5174`, `3000`, or `4173` after Playwright exited.

## Blockers

No blockers.

## Boundary Confirmation

No Supabase migrations, notification delivery implementation, Elo transparency implementation, public/guest spectation, public profiles, public leaderboards, service workers or push infrastructure, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 29 work, gameplay-rule changes, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
