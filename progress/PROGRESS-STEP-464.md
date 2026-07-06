# Progress Step 464: Phase 50 Stage 50.6-50.7 Optional Convenience Implementation

**Date**: 2026-07-06
**Status**: Completed - Awaiting User Review Before Phase 50 Review Candidate Final Hardening
**Stable repository boundary**: The original stable `brrrdle` repository was not touched.

## Authorization

The current prompt authorized only:

- Stage 50.6 Profile Sign out convenience using the existing auth handler;
- Stage 50.6 Profile-to-Settings Account management navigation using existing route handling;
- Stage 50.7 Progression HUD navigation to the existing Stats route while preserving display-only HUD semantics;
- focused tests for only those changes;
- progress reporting;
- one ignored local next prompt artifact, if useful.

The prompt did not authorize:

- storage schema, cloud progress contract, migration, Supabase/RLS/RPC/table/bucket, deployment/configuration, route architecture, shell redesign, Stats redesign, public profile redesign, Settings redesign, account deletion, privacy controls, reward/progression formula, gameplay-rule, scoring, Elo/rating, or multiplayer changes;
- Git branch creation, staging, commits, pushes, PRs, merges, releases, deployments, or backup workflow execution;
- original stable `brrrdle` repository work;
- work beyond Stage 50.6-50.7.

## Implementation

Stage 50.6 Profile/Settings convenience:

- Added an optional `onOpenSettings` seam to `ProfileEditor`/`ProfilePanel`.
- Rendered a separated Profile `Account management` section only when `onOpenSettings` or `onSignOut` is available.
- Kept private/public Profile Save and Cancel controls separate from Sign out.
- Reused the existing App sign-out path through the existing `onSignOut` prop.
- Added `handleOpenSettings` in `src/app/App.tsx` to route Profile users to the existing Settings route and close the legacy Profile dialog if needed.
- Kept Settings as the canonical home for password changes, sync, export, reset, and broader account controls.

Stage 50.7 Progression HUD/Stats convenience:

- Added optional `onOpenStats` support to `ProgressionHud`.
- Rendered a focused `Open Stats` button with an explicit screen-reader label only when the handler is supplied.
- Passed `handleOpenStats` from `src/app/App.tsx`, using the existing `handleNavigate('stats')` route path.
- Preserved `createProgressionHudViewModel` as the source for Level, Coins, and XP display values.
- Added minimal scoped HUD button focus/hover styling in `src/index.css`.

## Tests Added Or Updated

- Updated `src/account/ProfilePanel.test.tsx` to cover separated account actions, route-editor account actions, and handler-absent omission.
- Updated `src/app/ProgressionHud.test.tsx` to keep the default display-only markup protected and cover the optional Stats action.
- Added a focused Playwright layout test in `e2e/layout/mobile-scroll.spec.ts` proving the HUD action opens the existing Stats route through the real shell.

## Changed Files

Stage 50.6-50.7 files changed in this pass:

- `src/account/ProfilePanel.tsx`
- `src/account/ProfilePanel.test.tsx`
- `src/app/App.tsx`
- `src/app/ProgressionHud.tsx`
- `src/app/ProgressionHud.test.tsx`
- `src/index.css`
- `e2e/layout/mobile-scroll.spec.ts`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-464.md`
- `prompt-packages/phase-50/PHASE-50-REVIEW-CANDIDATE-FINAL-HARDENING-PROMPT-2026-07-06.md` (ignored local prompt artifact)

Note: the working tree already contained earlier Phase 49/50 tracked and untracked changes before this pass. This stage did not revert those changes.

## Next Prompt Artifact

Created ignored local prompt artifact:

- `prompt-packages/phase-50/PHASE-50-REVIEW-CANDIDATE-FINAL-HARDENING-PROMPT-2026-07-06.md`

This next prompt authorizes only Phase 50 Review Candidate/final hardening and manual-review preparation if the user approves it. It does not authorize Git/GitHub handoff, backup, deployment, release, merge, or stable repository work.

## Verification

Passed:

- `npm test -- --run src/account/ProfilePanel.test.tsx src/app/ProgressionHud.test.tsx`: 2 files, 13 tests.
- `npm run test -- src/account/ProfilePanel.test.tsx src/account/Settings.test.tsx src/app/ProgressionHud.test.tsx src/app/LunarSignalStage.test.tsx src/stats/StatsDashboard.test.tsx`: 5 files, 29 tests.
- `npx playwright test e2e/layout/mobile-scroll.spec.ts -g "progression HUD opens"`: 1 test passed.
- `npm run lint`
- `npm run test`: 126 files, 875 tests.
- `npm run build`: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- CSV shape check: `rows=466`, `data_rows=465`, `columns=12`, `widths=[12]`, `last_id=464`.
- Non-printing/credential-value scan over changed tracked/untracked files plus ignored prompt artifacts: `scanned_files=39`, `credential_value_hits=0`, `nonprinting_hits=0`, `binary_skipped=0`.
- Ignored-artifact check: `tracked_files=1167`, `staged_files=0`, `changed_files=38`, `forbidden_tracked=0`, `forbidden_staged=0`, `forbidden_changed=0`, `prompt_ignored=True`, `prompt_tracked=False`, `prompt_staged=False`, `ignored_prompt_files=8/8`.
- Watched ports `5173`, `5174`, `3000`, and `4173` clear; no Vite/Playwright/node dev-server leftovers detected.
- `git status --short --branch`

## Stop Gate

Stop here for user review. Stage 50.6-50.7 implementation is complete. Stage 50.8, Phase 50 Review Candidate execution, Manual Review Window acceptance, Git/GitHub handoff or backup, deployment, release, merge, and stable-repository work remain unexecuted and require separate explicit authorization.
