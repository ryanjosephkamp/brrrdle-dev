# Progress Step 493 - Phase 50 Refresh Home Reset Second-Pass Follow-Up

**Status**: Completed - Refresh Home Reset Second-Pass Recovered Locally And Backup Prompt Prepared.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Started**: 2026-07-08T04:25:51Z.
**Completed**: 2026-07-08T04:47:31Z.

## Summary

Implemented the bounded Phase 50 Refresh Home Reset second-pass follow-up.

Hosted/live manual review found that the previous Home-reset candidate improved refresh behavior but still routed the game back to the Solo tab after refresh. The local follow-up reproduced that remaining symptom through an authenticated Daily GO progress-hydration path: the app initially rendered Home after reload, then delayed auth/progress hydration invoked Solo auto-resume and routed away from Home without user action.

The local recovery keeps the user-approved Home-on-refresh rule: manual hard/browser refresh should land on Home and remain there after startup/auth hydration settles. Saved Solo state remains intact and available when the user manually navigates back to Solo after refresh.

## Changed

- Updated `src/app/App.tsx` so startup/auth progress hydration loads signed-in progress with `autoResume: false`.
- Strengthened `e2e/navigation/refresh-route-persistence.spec.ts` so focused refresh tests wait briefly after Home appears and assert Solo, Multiplayer, and Settings surfaces remain hidden.
- Strengthened `e2e/gameplay/solo-completion-reentry.spec.ts` with an authenticated Daily GO regression that reloads after first-puzzle progress, waits for Home to remain selected after hydration, then re-enters Daily GO and verifies saved puzzle-two progress.
- Updated authenticated Daily OG/GO terminal reload coverage to assert Home remains selected after startup settles before re-entering Solo and verifying terminal state.
- Updated the Phase 50 changelog and manual review checklist.
- Added this progress report.
- Updated `progress/PROGRESS.csv`.
- Created an ignored local backup prompt artifact:
  - `prompt-packages/phase-50/PHASE-50-REFRESH-HOME-RESET-SECOND-PASS-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-08.md`

## Verification

Passed:

- Pre-fix focused authenticated Daily GO refresh regression failed for the expected reason: startup initially showed Home, then auth/progress hydration routed to Solo.
- `npm run test -- src/app/navigationState.test.ts`: 1 file, 9 tests.
- `npx playwright test e2e/navigation/refresh-route-persistence.spec.ts`: 5 tests.
- Focused authenticated Daily GO regression rerun after the fix.
- `npx playwright test e2e/gameplay/solo-completion-reentry.spec.ts`: 12 tests.
- `npm run lint`.
- `npm run test`: 129 files, 898 tests.
- `npm run test:e2e`: 55 tests.
- `npm run build`: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.

Final lightweight hygiene checks are reported in the Codex closeout.

## Browser Tool Note

The in-app Browser Plugin was initialized for a local manual check, but its Playwright DOM snapshot path failed with `TypeError: o.incrementalAriaSnapshot is not a function`. The follow-up therefore used the repository Playwright E2E harness as the reliable browser verification path, including focused refresh, authenticated Solo persistence, and full E2E coverage.

## Boundaries

No Git/GitHub action, branch creation, staging, commit, push, PR, merge, backup workflow execution, final Phase 50 acceptance/closure, Final Acceptance Backup, deployment configuration change, release, migration, Supabase/RLS/RPC/table/bucket change, cloud progress schema change, gameplay/reward/scoring/Elo change, Daily claim change, multiplayer settlement rule change, Practice GO answer-selection/randomness algorithm change, next-phase work, public tunneling, or stable `brrrdle` repository work was performed.

No raw Daily answers, credentials, auth tokens, secrets, screenshots, videos, traces, HAR files, local storage dumps, local session artifacts, private account data, Supabase keys, Vercel tokens, or environment values were written to tracked files, progress reports, prompt packages, logs, or final reports.

## Next Step

Use `prompt-packages/phase-50/PHASE-50-REFRESH-HOME-RESET-SECOND-PASS-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-08.md` to authorize the Refresh-Home-reset second-pass recovered Review Candidate Backup for hosted/live manual review while keeping Phase 50 open.
