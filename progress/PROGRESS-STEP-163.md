# Progress Step 163 - Phase 25 Stage 25.2 Home Dashboard v1

**Date**: 2026-06-14
**Phase**: Phase 25 Stage 25.2
**Status**: Completed - Awaiting User Review Before Stage 25.3
**Repository**: `https://github.com/ryanjosephkamp/brrrdle-dev`
**Branch**: `main`
**HEAD / origin/main at start**: `6bedaa7a7aa2c12c3e5097400c82c0e60ff338fe`

## Authorization

The user authorized Phase 25 Stage 25.2 only: Home Dashboard v1.

This includes source/test/documentation changes needed for Stage 25.2, focused verification, browser smoke when warranted, and progress updates.

This does not authorize Stage 25.3 notification center UI work, navigation badges, browser notifications, Supabase migrations, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, new custom skills, or original stable `brrrdle` repository work.

## Starting State

- Working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- Remote: `origin` points to `https://github.com/ryanjosephkamp/brrrdle-dev.git`
- Local `HEAD`: `6bedaa7a7aa2c12c3e5097400c82c0e60ff338fe`
- `origin/main`: `6bedaa7a7aa2c12c3e5097400c82c0e60ff338fe`
- Original stable `brrrdle` checkout was not used for this work.

## Planned Work

- Add the `DashboardHome` component under `src/dashboard/`.
- Add dashboard action dispatch coverage without adding new navigation persistence state.
- Replace the Home route's lightweight mode-card grid with the dashboard model from Stage 25.1.
- Keep notification center UI, navigation badges, and browser notifications out of scope.

## Verification

- Focused dashboard/shell/navigation tests:
  - `npm run test -- src/app/LunarSignalStage.test.tsx src/dashboard/DashboardHome.test.tsx src/dashboard/dashboardActions.test.ts src/dashboard/dashboardViewModels.test.ts src/app/routes.test.ts src/app/navigationState.test.ts`
  - Result: passed, 6 files, 23 tests.
- Adjacent selector/storage tests:
  - `npm run test -- src/dashboard/dashboardViewModels.test.ts src/notifications/notificationViewModels.test.ts src/notifications/notificationStorage.test.ts src/solo/soloViewModels.test.ts src/multiplayer/multiplayerViewModels.test.ts src/history/historyViewModels.test.ts`
  - Result: passed, 6 files, 26 tests.
- `npm run lint`
  - Result: passed.
- `npm run test`
  - Result: passed, 86 files, 549 tests.
- `npm run build`
  - Result: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
  - Result: passed.
- `git diff --check`
  - Result: passed.
- Progress CSV shape check using Python `csv`
  - Result: passed, 165 rows, 12 columns each.
- Browser smoke with one local Vite dev server:
  - Result: passed.
  - Covered desktop `1280x900`, tablet `820x1180`, and mobile `390x844` Home dashboard rendering.
  - Covered Home dashboard action routing into Solo, Multiplayer, History, and Calendar.

## Scope Confirmation

- Implemented Home Dashboard v1 using the Stage 25.1 dashboard view model.
- Added dashboard action dispatch through existing route/subtab handlers without adding gameplay state or changing gameplay semantics.
- Made the Home route mount route children instead of remaining a dormant selector-only shell.
- Preserved notification center UI, navigation badges, browser notifications, schema changes, migrations, deployment, commits, pushes, PRs, merges, releases, branch deletion, new custom skills, and original stable `brrrdle` repository work as out of scope.
- Final resource checks found no listeners on watched ports `5173`, `5174`, `3000`, or `4173` after the browser smoke. Remaining matching process-list entries were unrelated Codex, VS Code, MCP, or app helper processes, not Stage 25.2-owned Vite or Playwright runaways.
