# Progress Step 484 - Phase 50 Multiplayer Focus Flash And Solo Persistence Hardening

**Status**: Completed - Multiplayer Focus Follow-Up Recovered Locally And Backup Prompt Prepared.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Started**: 2026-07-07T18:12:15Z.
**Completed**: 2026-07-07T18:35:18Z.

## Summary

The user authorized the bounded Phase 50 multiplayer focus/refocus flash and Solo persistence hardening follow-up from `prompt-packages/phase-50/PHASE-50-MULTIPLAYER-FOCUS-FLASH-AND-SOLO-PERSISTENCE-HARDENING-PROMPT-2026-07-07.md`.

This follow-up preserved the now-good Solo persistence behavior, isolated and fixed the multiplayer focus/refocus flash cause, added automated coverage for the focus/refocus path, and hardened temporary E2E multiplayer row cleanup. Phase 50 remains open for hosted/live manual review and final acceptance.

## Root Cause

Signed-in focus and visibility refresh hydrates the account progress blob. That progress blob can contain stale or empty cached multiplayer state, while signed-in async multiplayer games are owned by the Supabase multiplayer repository.

Before this follow-up, same-account progress hydration could temporarily replace the visible async multiplayer state with the progress-cache multiplayer state. The repository would then reload and restore the real multiplayer rows, creating the user-visible flash when switching focus between signed-in browser windows.

## Changed Files

- `src/app/App.tsx`
- `src/app/scopedProgressMultiplayerState.ts`
- `src/app/scopedProgressMultiplayerState.test.ts`
- `e2e/gameplay/multiplayer-focus-refocus.spec.ts`
- `e2e/fixtures/cleanup.ts`
- `planning/phase-50/CHANGELOG.md`
- `planning/phase-50/REVIEW-CHECKLIST.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-484.md`

Ignored local artifact prepared:

- `prompt-packages/phase-50/PHASE-50-MULTIPLAYER-FOCUS-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-07.md`

## Implementation

- Added a scoped progress/multiplayer state helper that preserves visible async multiplayer rows during same signed-in-account progress hydration.
- Preserved guest/account isolation by still using the next scoped progress state when the identity changes or the app returns to guest scope.
- Wired `App` progress hydration through the helper.
- Reduced avoidable multiplayer subscription and focus-refresh churn by removing unused broad dependencies.
- Kept existing Live spectator rows visible if a transient Live spectator refresh fails, instead of clearing rows and flashing counts.
- Added a focused unit regression that failed before the helper fix and passed after it.
- Added a two-client Playwright regression that signs in two temporary accounts, opens and joins a Practice Multiplayer OG match, switches focus between pages, and records whether active-game empty states/counts flash.
- Hardened E2E cleanup so temporary multiplayer rows involving temporary E2E users are checked after deletion.

## Solo Persistence Hardening

The existing `e2e/gameplay/solo-completion-reentry.spec.ts` now remains part of the active guard for the Phase 50 Solo behavior the user manually accepted:

- Daily OG deleted draft letters stay deleted after scroll and route re-entry.
- Daily GO settled rows remain stable during ordinary keyboard input.
- Completed Practice OG/GO and Daily OG/GO remain visible across route re-entry and browser Back without duplicate rewards.
- Completed authenticated Daily OG/GO remain visible after reload and account hydration.

## Verification

Implementation verification completed:

- Pre-fix focused regression failed for same-account progress hydration selecting stale cached multiplayer state.
- Post-fix focused regression passed.
- Focused tests: `npm run test -- src/app/scopedProgressMultiplayerState.test.ts src/app/AboutBrrrdlePanel.test.tsx`
- Focused new E2E: `npx playwright test e2e/gameplay/multiplayer-focus-refocus.spec.ts`
- Cleanup-hardened focused new E2E rerun: `npx playwright test e2e/gameplay/multiplayer-focus-refocus.spec.ts`
- Focused Solo persistence E2E: `npx playwright test e2e/gameplay/solo-completion-reentry.spec.ts`
- `npx tsc -p tsconfig.app.json --noEmit`
- `npm run lint`
- `npm run test`: 128 files, 891 tests passed.
- `npm run test:e2e`: 45 tests passed.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`

Final lightweight repository hygiene checks are run after this progress row is written and reported in the Codex closeout.

## Boundaries

No Git/GitHub backup workflow, branch creation, staging, commit, push, PR, merge, branch deletion, final Phase 50 acceptance/closure, deployment, release, migration/RLS, storage schema, cloud progress contract, gameplay/reward/scoring/Elo change, next-phase work, public tunneling, or stable `brrrdle` repository work was performed in this step.

No raw Daily answers, credentials, auth tokens, secrets, screenshots, videos, traces, or private account data were written to tracked files, progress reports, logs, or final reports.

## Next Step

Use `prompt-packages/phase-50/PHASE-50-MULTIPLAYER-FOCUS-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-07.md` to authorize a recovered Review Candidate Backup for hosted/live manual review while keeping Phase 50 open.
