# Progress Step 255: Phase 32 Stage 32.6 Account Avatar/Rating Display Consistency

**Date:** 2026-06-24
**Phase:** Phase 32 Stage 32.6 - Account avatar/rating display consistency
**Status:** Completed - Awaiting User Review Before Stage 32.7 Real Two-Client E2E/Regression Hardening

## Authority

User authorized Phase 32 Stage 32.6 account avatar accent propagation and no-comma rating display consistency only, using the completed Stage 32.5 queue/lobby/identity routing baseline.

This pass may read governance, Phase 32 planning/spec/addendum/implementation materials, progress records, ranked and Supabase docs, account/profile, public leaderboard, rating display, and relevant test surfaces; create this progress report and matching CSV row; implement account badge accent propagation and no-comma rating display consistency; add focused tests; and run the requested verification gate.

## Boundaries

This pass does not authorize migrations, Phase 33 ranked expansion, public/guest spectation, service workers, push infrastructure, deployments, commits, pushes, PR creation, merge, release, branch deletion, Elo/gameplay rule changes, new custom skills, force-push, secret printing, private data exposure, local session artifact exposure, or original stable repository work.

## Initial State

- Repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- `origin/main`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- Original stable repository: not used.
- Existing uncommitted work preserved: Phase 32 planning/spec/progress artifacts, the Stage 32.0 baseline test-fixture repair, Stage 32.1 audit report, Stage 32.2 addendum/progress report, Stage 32.3 participant identity migration/progress report, Stage 32.4 rematch source/test/progress changes, and Stage 32.5 queue/lobby/identity source/test/progress changes.

## Work Plan

- Add failing focused tests for the global account badge using the saved private profile accent rather than a stale deterministic gradient.
- Add focused public leaderboard tests proving Elo/rating values and rating-tied ranks render without comma separators.
- Share the private/public profile accent avatar background helper across the profile editor and global account badge.
- Keep ordinary count/date formatting behavior unchanged where it is not an Elo/rating display.
- Run focused account/rating display tests, then the full Stage 32.6 verification gate.

## Work Completed

- Added `PROFILE_ACCENT_AVATAR_BACKGROUNDS` and `getProfileAccentAvatarBackground` as shared profile helpers.
- Updated the global account badge to render the signed-in avatar circle from the saved private `accentColor`, so the top-of-page account avatar follows saved private profile accent changes.
- Updated the profile editor previews to use the same shared accent avatar helper, preventing future drift between the profile editor and the global account badge.
- Updated public ranked leaderboard view models so Elo/rating values, peak ratings, and rating-tied rank labels render without thousands separators.
- Preserved normal count formatting for game counts and record counts, and preserved date/time formatting.
- Preserved Stage 32.5 queue/lobby/identity routing behavior, Stage 32.4 rematch behavior, Phase 31 postgame behavior, Phase 30 leaderboards, Phase 29 profiles, Phase 28 Live behavior, Phase 27 ranked Practice behavior, Daily Multiplayer integrity, and gameplay rules.

## Verification Results

- Reproduced expected focused failures before implementation: the global account badge kept the old gradient and public leaderboard rating-like labels rendered with comma separators.
- Passed: focused account/rating display tests with `npm run test -- src/account/AccountBadge.test.tsx src/account/ProfilePanel.test.tsx src/account/profile.test.ts src/leaderboards/publicRankedLeaderboardViewModels.test.ts src/leaderboards/PublicRankedLeaderboardPanel.test.tsx src/multiplayer/MultiplayerStatsPanel.test.tsx` reported 6 files and 46 tests passing.
- Passed: `npm run lint`.
- Passed: `npm run test` reported 104 files and 689 tests passing.
- Passed: `npm run build` with the existing Vite large-chunk advisory.
- Passed: `npx tsc -p tsconfig.api.json --noEmit`.
- Passed: `git diff --check`.
- Passed: Python CSV shape check using `python3 -S` reported `rows=257 columns=[12] last_id=255`.
- Passed: `git status --short --branch` showed expected existing Phase 32 planning/progress/migration changes plus the Stage 32.6 account/profile/leaderboard source/test/progress changes.

## Blockers

- None at this stage.

## Next Gate

Review this Stage 32.6 report and authorize Stage 32.7 real two-client E2E/regression hardening before any E2E expansion, final hardening, Phase 33 ranked expansion, public/guest spectation, or PR/deployment work.
