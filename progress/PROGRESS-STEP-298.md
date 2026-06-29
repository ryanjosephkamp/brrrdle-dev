# Progress Step 298: Phase 36 Stage 36.3 Leaderboard Route And Stats Split

**Date:** 2026-06-28
**Phase:** Phase 36 - Leaderboard And Stats Navigation Split
**Stage:** Stage 36.3 - Leaderboard Route And Stats Split
**Status:** Completed - Awaiting User Review Before Stage 36.4

## Authorization

The user authorized Phase 36 Stage 36.3 only: Leaderboard main route/tab and Stats content split using the completed Stage 36.2 Active Games safe-name baseline.

The prompt did not authorize Settings cleanup, password-copy cleanup, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- `origin/main`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- Existing user edit to `planning/phase-35/REVIEW-CHECKLIST.md`: preserved and not edited in this stage.
- Existing uncommitted Phase 36 planning/spec/progress artifacts and Stage 36.2 source/test changes: preserved.

## Implementation

- Updated `src/app/routes.ts` so `leaderboard` is a first-class route and primary navigation places it between `stats` and `word-explorer`.
- Updated `src/app/App.tsx` so Stats renders only local/personal statistics and the new Leaderboard route receives the existing public leaderboard repository, auth status, competitive multiplayer state, Elo-about action, and viewer id.
- Added `src/leaderboards/LeaderboardPanel.tsx` as the route-level owner for the public ranked Practice leaderboard and competitive multiplayer rating content.
- Updated `src/stats/StatsDashboard.tsx` so Stats no longer imports or renders public ranked leaderboard or competitive multiplayer rating panels.
- Updated `src/app/LunarSignalStage.tsx` to give the Leaderboard route a `Ranked` navigation eyebrow.
- Added focused tests for route ordering, Stats local-only content, and Leaderboard public/rating content placement.

## Focused Verification

- `npm run test -- src/app/routes.test.ts src/app/LunarSignalStage.test.tsx src/stats/StatsDashboard.test.tsx src/leaderboards/LeaderboardPanel.test.tsx src/leaderboards/PublicRankedLeaderboardPanel.test.tsx src/leaderboards/publicRankedLeaderboard.test.ts src/leaderboards/publicRankedLeaderboardViewModels.test.ts src/multiplayer/MultiplayerStatsPanel.test.tsx`
  - Result: passed, `8` files and `42` tests.

## Full Verification

- `npm run lint`
  - Result: passed.
- `npm run test`
  - Result: passed, `106` files and `728` tests.
- `npm run build`
  - Result: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
  - Result: passed.
- `git diff --check`
  - Result: passed.
- Progress CSV shape check using `python3 -S`
  - Result: passed, `rows=300 columns=[12] last_id=298`.
- Non-printing credential-shaped secret/artifact scan over changed files
  - Result: passed, `scanned_files=25 credential_pattern_hits=0`.
- Ignored-artifact check
  - Result: passed, `tracked_files_checked=870 staged_files_checked=0 forbidden_hits=0`.
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
  - Result: passed, no listeners found.
- `git status --short --branch --untracked-files=all`
  - Result: completed; expected uncommitted Phase 36 planning/progress files, the user-edited Phase 35 review checklist, Stage 36.2 source/test changes, and Stage 36.3 source/test/progress changes remain in the worktree.

## Boundaries Preserved

No Settings cleanup, password-copy cleanup, Supabase migrations, Vercel or Supabase configuration, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review Stage 36.3 evidence. If approved, explicitly authorize Stage 36.4 Settings/password-copy cleanup before account copy/settings work, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
