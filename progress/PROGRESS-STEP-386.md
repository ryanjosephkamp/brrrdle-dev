# Progress Step 386 - Phase 43 Stage 43.4 App Shell, Header, Home, And Horizontal Overflow Cleanup

**Status**: Completed - Awaiting User Review Before Stage 43.5
**Phase**: Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort
**Stage**: 43.4 - App shell, header, Home, and horizontal overflow cleanup
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-04T00:32:05Z
**Completed**: 2026-07-04T00:34:44Z

## Authorization

The user authorized Phase 43 Stage 43.4 only: source/test-only app shell, header, Home, and horizontal overflow cleanup using the completed Stage 43.3 Stats/Help/About/Settings information-architecture baseline.

Authorized work included confirming repo state and stable-repo boundary, preserving the user-updated Phase 42 review checklist, reading Phase 43 planning/spec/implementation materials and Stage 43.1 through Stage 43.3 progress, making narrow source/test-only shell/Home/current-layout density and horizontal-overflow cleanup, adding focused tests where practical, creating this progress report and the matching 12-column CSV row, and running the requested verification gate.

This pass did not authorize public stats or developer dashboard implementation, onboarding/help/tutorial implementation, Supabase migration creation or execution, Supabase/Vercel configuration, deployment, Git/GitHub operations, backup workflow execution, public/guest spectation contract changes, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, Elo changes, secret printing, private data exposure, local session artifact exposure, local Codex skill changes, or original stable `brrrdle` repository work.

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

Implemented narrow shell/Home/current-layout cleanup:

- Removed the ordinary-page right deck readout from the app shell and converted the remaining route metrics into compact header chips.
- Moved manual cloud sync access into Settings, next to the existing account and persistence controls.
- Removed duplicate shell-level Sound and Theme controls now owned by Settings/Profile-era configuration surfaces.
- Reduced Home dashboard density by compacting summary metrics and quick-action cards.
- Replaced the Home Recent Results wide table with responsive result cards so default zoom does not require horizontal scrolling for that section.
- Removed obsolete CSS for the deleted right-rail readout and shell-level controls.
- Added focused tests for the removed right rail, compact header metrics, Settings sync access, and Home Recent Results no-table/no-horizontal-overflow rendering.

Preserved the Phase 43 ranked queue fairness migration behavior, Stage 43.3 information-architecture cleanup, Phase 42 stats/dashboard/help contracts, Phase 41 multiplayer reliability repairs, Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, Phase 38 spectator boundaries, Daily claim safety, gameplay rules, and Elo math.

## Focused Verification

Initial focused tests passed before the full verification gate:

- `npm run test -- src/app/LunarSignalStage.test.tsx src/dashboard/DashboardHome.test.tsx src/account/Settings.test.tsx`: passed, 3 files and 12 tests.

## Final Verification

Final verification passed:

- Focused tests: `npm run test -- src/app/LunarSignalStage.test.tsx src/dashboard/DashboardHome.test.tsx src/account/Settings.test.tsx` passed, 3 files and 12 tests.
- `npm run lint`: passed.
- `npm run test`: passed, 116 files and 803 tests.
- Focused E2E: not run because the Stage 43.4 changes are shell/Home static rendering, Settings route wiring, and CSS/layout cleanup covered by focused component rendering tests and the full unit/component suite.
- `npm run build`: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`: passed.
- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: passed, `rows=388 columns=[12] last_id=386`.
- Non-printing changed/untracked file credential scan: passed, `scanned_files=42 credential_pattern_hits=0`.
- Ignored-artifact check: passed, `forbidden_artifact_hits=0`.
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear.
- `git status --short --branch`: completed and showed expected uncommitted Phase 42 manual-review, Phase 43 planning/spec/progress/docs/migration artifacts plus the Stage 43.4 source/test changes.

## Blockers

No Stage 43.4 blocker remains.

## Boundary Confirmation

No migration, deployment/configuration, Git/GitHub operation, backup workflow execution, public/guest spectation contract change, spectator presence/count/list implementation, service worker or push infrastructure work, gameplay-rule change, Elo change, secret/private-data/local-artifact exposure, local Codex skill change, or original stable repository work was performed.

## Next Gate

Authorize Phase 43 Stage 43.5 Solo and Practice Multiplayer density cleanup only.
