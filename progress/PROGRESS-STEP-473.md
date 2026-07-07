# Progress Step 473: Phase 50 Same-Phase Recovery Overhaul

**Date**: 2026-07-06
**Status**: Completed - Recovered Review Candidate Ready For Backup Authorization
**Stable repository boundary**: The original stable `brrrdle` repository was not touched.

## Authorization

The user authorized the Phase 50 same-phase recovery and reliability overhaul from:

- `prompt-packages/phase-50/PHASE-50-SAME-PHASE-RECOVERY-OVERHAUL-PROMPT-2026-07-06.md`

Authorized:

- source/runtime and test fixes for the failed hosted manual-review Solo completion items;
- mobile/general scroll quality repair;
- removal of broad automatic page scrolling for ordinary Solo/Practice/Daily navigation;
- preservation of auto-scroll only for explicit routed-game targets;
- stronger automated coverage reproducing the failed hosted/manual path;
- Phase 50 planning, checklist, changelog, and progress updates;
- a next prompt package for recovered Review Candidate Backup.

Not authorized:

- Git/GitHub actions, staging, commit, push, PR, merge, branch deletion, or backup workflow execution;
- final Phase 50 acceptance or closure;
- Phase 51 or unrelated roadmap implementation;
- migrations, Supabase/RLS/RPC/table/bucket changes, storage schema or cloud progress contract changes, deployment configuration, release, or public tunneling;
- gameplay-rule, reward-formula, scoring, Elo/rating, Daily claim, multiplayer settlement, or broad redesign changes;
- work in the original stable `brrrdle` repository.

## Reproduction

The recovery first added reload coverage to `e2e/gameplay/solo-completion-reentry.spec.ts`.

Before the source fix, the new reload assertion failed for completed Practice OG:

- The completed game had been recorded.
- The matching resume slot had been cleared as intended.
- Full app reload on the solved Solo surface lost the terminal UI because completed display evidence was React state only.

This reproduced the hosted/manual failure pattern that the earlier Review Candidate gate missed.

## Implementation

Completed Solo recovery:

- Added completed Solo display-slot normalization separate from ordinary resumable slots.
- Added local display-only completed Solo storage scoped by progress owner.
- The display cache stores terminal serialized OG/GO session evidence only; in-progress slots are rejected.
- Account owner cache keys are hashed so raw account IDs are not written into the display-cache payload.
- `resumeSlots` remain in-progress-only.
- `completedGameIds` remains authoritative for duplicate reward protection.
- `App.tsx` loads, updates, and clears completed display slots by active progress scope.
- Daily completed display slots are considered only for the current Daily cycle.
- Daily/Practice OG/GO mode selection now persists `selectedSoloGameKey`, preventing reload from falling back to Daily OG after a completed Daily GO session.

Auto-scroll and scroll recovery:

- Removed ordinary Solo route/subtab/mode auto-scroll.
- Removed Solo keyboard auto-centering from normal gameplay entry and submitted-guess paths.
- Preserved explicit routed-game auto-centering for notification/direct-game handoffs and direct resume-style routing.
- Updated mobile layout E2E to assert ordinary Solo navigation and physical-keyboard submission do not call app-level `scrollIntoView`.

Definition console cleanup:

- Definition lookup now prefers bundled definitions, then Wiktionary, then Dictionary API.
- This avoids browser console CORS noise from Dictionary API during restored GO terminal definition panels when Wiktionary can satisfy the request.

## Verification

Passed:

- Focused unit tests:
  - `src/account/resumeSlot.test.ts`
  - `src/account/soloCompletionDisplayStorage.test.ts`
  - `src/dashboard/dashboardActions.test.ts`
  - `src/notifications/notificationActions.test.ts`
  - `src/definitions/definitionService.test.ts`
- Focused Playwright Solo completion re-entry: 4 tests passed across Practice OG, Practice GO, Daily OG, and Daily GO with browser Back, route re-entry, and full app reload coverage.
- Focused Playwright mobile scroll/layout: 15 tests passed.
- `npm run lint`
- `npm run test`: 127 files, 881 tests passed.
- Initial `npm run test:e2e`: 40 passed, 1 ranked search-again test failed once outside the touched Solo/Profile/HUD/scroll surfaces.
- Targeted rerun of the failed ranked search-again test: 1 passed.
- Clean `npm run test:e2e` rerun: 41 tests passed.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`

Final repository hygiene checks are recorded in the closeout for this step and should be rerun by any later Review Candidate Backup prompt before staging.

## Files Updated

Source and tests:

- `e2e/gameplay/solo-completion-reentry.spec.ts`
- `e2e/layout/mobile-scroll.spec.ts`
- `src/account/index.ts`
- `src/account/resumeSlot.ts`
- `src/account/resumeSlot.test.ts`
- `src/account/soloCompletionDisplayStorage.ts`
- `src/account/soloCompletionDisplayStorage.test.ts`
- `src/app/App.tsx`
- `src/app/games/GoGame.tsx`
- `src/app/games/OgGame.tsx`
- `src/dashboard/dashboardActions.ts`
- `src/dashboard/dashboardActions.test.ts`
- `src/definitions/definitionService.ts`
- `src/definitions/definitionService.test.ts`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationActions.test.ts`

Planning and progress:

- `planning/phase-50/PLANNING-BRIEF.md`
- `planning/phase-50/IMPLEMENTATION-PLAN.md`
- `planning/phase-50/CHANGELOG.md`
- `planning/phase-50/REVIEW-CHECKLIST.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-473.md`

Ignored local prompt artifact:

- `prompt-packages/phase-50/PHASE-50-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-06.md`

## Next Action

Use the recovered Review Candidate Backup prompt to publish the repaired candidate for hosted/live manual review without closing Phase 50:

- `prompt-packages/phase-50/PHASE-50-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-06.md`

After the recovered backup is live, manually review `planning/phase-50/REVIEW-CHECKLIST.md`. Report directly Phase 50-related findings for same-phase Review Follow-up, or explicitly accept manual review so final closure can be separately authorized.

## Stop Gate

Stop before Git/GitHub backup. Phase 50 remains open. Manual review acceptance, final Phase 50 closure, Final Acceptance Backup, release, deployment configuration, next-phase work, and stable `brrrdle` repository work remain unexecuted.
