# Progress Step 210: Phase 28 Stage 28.6 Elo Transparency Copy And Documentation

**Status**: Completed - Awaiting User Review Before Stage 28.7.
**Date**: 2026-06-18.
**Repository**: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Branch**: `main`.

## Authorization

The user authorized Phase 28 Stage 28.6 only: low-risk Elo transparency documentation and in-app copy.

Authorized work:

- read governance, Phase 28 planning/spec/progress materials, `agents.md`, `memory.md`, package/test surfaces, ranked/Elo source surfaces, ranked UI/stats surfaces, README/planning docs, and relevant tests;
- create this progress report and append the matching `progress/PROGRESS.csv` row;
- add clear Elo/rank transparency documentation and/or in-app copy without changing the Phase 27 Elo model;
- explain initial rating, provisional window, K-factors, expected-score formula, ranked Practice v1 boundaries, and the separation between match points and Elo/rank movement;
- preserve Stage 28.5 notification delivery, Stage 28.4 Live spectator behavior, Phase 27 ranked Practice behavior, Daily Multiplayer invariants, and gameplay rules;
- add focused tests for touched UI/view-model copy where applicable;
- run focused tests first, then the Stage 28.6 verification gate.

Not authorized:

- Supabase migration creation or execution;
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

Existing uncommitted Phase 28 planning/spec/progress, Stage 28.3 migration, Stage 28.4 source/test, and Stage 28.5 notification artifacts were present and preserved.

## Work Completed

Created:

- `docs/ranked-multiplayer.md`
- `progress/PROGRESS-STEP-210.md`

Updated:

- `README.md`
- `docs/index.md`
- `progress/PROGRESS.csv`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerStatsPanel.test.tsx`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/rating.test.ts`
- `src/multiplayer/rating.ts`

## Implementation

- Added player-facing ranked Elo transparency to the ranked Practice setup copy and multiplayer stats panel.
- Added `docs/ranked-multiplayer.md` with current ranked Practice v1 boundaries, initial rating, provisional window, K factors, expected-score formula, match outcome mapping, and trusted-settlement authority.
- Linked the ranked Elo documentation from `README.md` and `docs/index.md`.
- Exported the existing 400-point Elo expected-score scale as a named constant and updated the existing expected-score calculation to use that constant without changing behavior.
- Added focused rendered-copy assertions for touched UI surfaces and a focused rating constant assertion.

## Verification

Passed:

- focused ranked/Elo copy tests: `npm run test -- src/multiplayer/rating.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/MultiplayerStatsPanel.test.tsx` (3 files, 23 tests);
- `npm run lint`;
- `npm run test` (96 files, 621 tests);
- `npm run build` (passed with existing Vite large-chunk advisory);
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- Python CSV shape check using `python3 -S` (212 rows including header, 12 columns each, last_id=210);
- `git status --short --branch`.

## Blockers

No blockers.

## Boundary Confirmation

No Supabase migrations, public/guest spectation, public profiles, public leaderboards, service workers or push infrastructure, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 29 work, gameplay-rule changes, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
