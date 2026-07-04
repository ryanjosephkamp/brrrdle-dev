# Progress Step 388 - Phase 43 Stage 43.6 Gameplay Viewport Notifications Back-To-Top And Spectator Comfort

**Status**: Blocked - Lint Failed Before Full Verification
**Phase**: Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort
**Stage**: 43.6 - Gameplay viewport, notifications, back-to-top, and spectator comfort
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-04T01:27:11Z
**Completed**: 2026-07-04T01:28:08Z

## Authorization

The user authorized Phase 43 Stage 43.6 only: source/test-only gameplay viewport, notifications, back-to-top behavior, and spectator comfort cleanup using the completed Stage 43.5 Solo and Practice Multiplayer density cleanup baseline.

Authorized work included confirming repo state and stable-repo boundary, preserving the user-updated Phase 42 review checklist, reading Phase 43 planning/spec/implementation materials and Stage 43.1 through Stage 43.5 progress, making narrow source/test-only gameplay comfort cleanup, adding focused tests where practical, creating this progress report and the matching 12-column CSV row, and running the requested verification gate.

This pass did not authorize Supabase migration creation or execution, Supabase/Vercel configuration, deployment, Git/GitHub operations, backup workflow execution, public/guest spectation contract changes, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, Elo changes, secret printing, private data exposure, local session artifact exposure, local Codex skill changes, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `a81e636cd26eb178e1d0bcc75554a1edffe7639d`.
- `origin/main`: `a81e636cd26eb178e1d0bcc75554a1edffe7639d`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-42/REVIEW-CHECKLIST.md` was preserved.
- No files were staged, committed, pushed, merged, deployed, or released.

## Source/Test Changes

Implemented narrow gameplay, notification, back-to-top, and spectator comfort cleanup:

- Reserved validation-message space in Solo OG, Solo GO, and Multiplayer gameplay status panels so invalid-guess and Hard Mode validation text no longer changes the keyboard's vertical position.
- Added normal popover dismissal behavior for the in-app notification center with outside-click and Escape handling, without changing notification metadata or routing.
- Added a page-level back-to-top control that appears only after meaningful scroll, respects reduced-motion preferences, and lifts away from gameplay targets occupying the bottom-right viewport zone.
- Added explicit gameplay auto-center anchoring for focused read-only spectator views and reused the existing user-action auto-center path when opening a focused spectator game.

Preserved Stage 43 ranked queue fairness behavior, Stage 43.3 information-architecture cleanup, Stage 43.4 shell/Home cleanup, Stage 43.5 Solo/Practice Multiplayer density cleanup, Phase 42 stats/dashboard/help contracts, Phase 41 multiplayer reliability repairs, Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, Phase 38 spectator boundaries, Daily claim safety, gameplay rules, and Elo math.

## Focused Verification

Initial focused tests passed before the full verification gate:

- `npm run test -- src/app/BackToTopButton.test.tsx src/notifications/NotificationCenter.test.tsx src/multiplayer/MultiplayerWorkspace.test.tsx src/multiplayer/MultiplayerGameSurface.test.tsx src/app/games/soloHardModeDefaults.test.tsx`: passed, 5 files and 29 tests.

## Final Verification

Final verification stopped at the first failing command, as required:

- Focused tests: `npm run test -- src/app/BackToTopButton.test.tsx src/notifications/NotificationCenter.test.tsx src/multiplayer/MultiplayerWorkspace.test.tsx src/multiplayer/MultiplayerGameSurface.test.tsx src/app/games/soloHardModeDefaults.test.tsx` passed, 5 files and 29 tests.
- `npm run lint`: failed.

Exact non-secret lint failure:

```text
/Users/noir/visual_studio/Codex_Projects/brrrdle-dev/src/app/BackToTopButton.tsx
  26:17  error  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  31:17  error  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
  45:17  error  Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components  react-refresh/only-export-components
```

The remaining requested verification commands were not run because the lint gate failed first.

## Blockers

Stage 43.6 is blocked by the `react-refresh/only-export-components` lint rule in `src/app/BackToTopButton.tsx`. The fix should move exported helper functions/constants into a non-component module or otherwise keep the component file component-only.

## Boundary Confirmation

No migration, deployment/configuration, Git/GitHub operation, backup workflow execution, public/guest spectation contract change, spectator presence/count/list implementation, service worker or push infrastructure work, gameplay-rule change, Elo change, secret/private-data/local-artifact exposure, local Codex skill change, or original stable repository work was performed.

## Next Gate

Authorize a narrow Phase 43 Stage 43.6A lint repair for the back-to-top helper export issue only. Do not proceed to Stage 43.7 until Stage 43.6A verification passes.
