# Progress Step 165 - Phase 25 Stage 25.4 Navigation Badges, Workspace Attention, And Freshness Cues

**Date**: 2026-06-14
**Phase**: Phase 25 Stage 25.4
**Status**: Completed - Awaiting User Review Before Stage 25.5
**Repository**: `https://github.com/ryanjosephkamp/brrrdle-dev`
**Branch**: `main`
**HEAD / origin/main at start**: `6bedaa7a7aa2c12c3e5097400c82c0e60ff338fe`

## Authorization

The user authorized Phase 25 Stage 25.4 only: Navigation Badges, Workspace Attention, And Freshness Cues.

This includes source/test/documentation changes needed for Stage 25.4, focused verification, browser smoke when warranted, and progress updates.

This does not authorize Stage 25.5 browser-notification work, service workers, push infrastructure, Supabase migrations, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, new custom skills, or original stable `brrrdle` repository work.

## Starting State

- Working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- Remote: `origin` points to `https://github.com/ryanjosephkamp/brrrdle-dev.git`
- Local `HEAD`: `6bedaa7a7aa2c12c3e5097400c82c0e60ff338fe`
- `origin/main`: `6bedaa7a7aa2c12c3e5097400c82c0e60ff338fe`
- Original stable `brrrdle` checkout was not used for this work.
- Worktree already contained expected uncommitted Phase 25 planning and Stage 25.1 through Stage 25.3 artifacts.

## Planned Work

- Add projection-derived route/workspace attention helpers.
- Render conservative primary navigation badges and workspace subtab cues.
- Preserve in-app notification center behavior from Stage 25.3.
- Keep attention indicators derived from existing dashboard and notification projections.
- Avoid gameplay logic, notification delivery, browser notifications, service workers, schema changes, and multiplayer semantics changes.

## Verification

- Focused attention/dashboard/notification/workspace tests:
  - `npm run test -- src/app/attentionViewModels.test.ts src/app/LunarSignalStage.test.tsx src/ui/SubtabBar.test.tsx src/solo/SoloWorkspace.test.tsx src/multiplayer/MultiplayerWorkspace.test.tsx src/dashboard/dashboardViewModels.test.ts src/notifications/notificationViewModels.test.ts src/notifications/NotificationCenter.test.tsx`
  - Initial result: failed while the new attention view-model test file had a malformed closing brace and while the default pluralizer produced `lobbys`.
  - Resolution: corrected the test fixture closure and added explicit `lobbies` pluralization in the attention helper.
  - Final result: passed, 8 files, 18 tests.
- `npm run lint`
  - Result: passed.
- `npm run test`
  - Result: passed, 91 files, 561 tests.
- `npm run build`
  - Result: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
  - Result: passed.
- `git diff --check`
  - Result: passed.
- Progress CSV shape check using Python `csv`
  - Result: passed, 167 rows, 12 columns each.
- Browser smoke with one local Vite dev server and the Codex in-app Browser:
  - Result: passed.
  - Covered desktop `1440x950`, tablet `820x1180`, and mobile `390x844`.
  - Verified Home dashboard, notification summary presence, primary route rail navigation, Solo workspace subtabs, Multiplayer workspace subtabs, Lobby/Live v0 visibility, History, and Calendar.

## Scope Confirmation

- Added pure route/workspace attention projection helpers in `src/app/attentionViewModels.ts`.
- Rendered conservative, accessible attention badges in the active Lunar Signal route rail and shared `SubtabBar`.
- Passed attention maps from `App.tsx` into `LunarSignalStage`, `SoloWorkspace`, and `MultiplayerWorkspace`.
- Added small Multiplayer workspace freshness summaries for Active Games turn attention, Lobby freshest row, and Live v0 visible/restricted/freshest state.
- Preserved Stage 25.3 in-app notification center behavior.
- Preserved Phase 24 route/workspace behavior and all gameplay invariants.
- Did not implement Stage 25.5, browser notifications, service workers, push infrastructure, schema changes, migrations, deployments, commits, pushes, PRs, merges, releases, branch deletion, new custom skills, or original stable `brrrdle` repository work.
- Final resource checks found no listeners on watched ports `5173`, `5174`, `3000`, or `4173` after browser smoke. The Stage-owned dev server was stopped. Browser tab and temporary viewport override were closed/reset.
