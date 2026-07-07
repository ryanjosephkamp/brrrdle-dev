# Progress Step 479: Phase 50 Daily Solo Polish Follow-Up

**Date**: 2026-07-07
**Status**: Completed - Daily Solo Polish Recovered Locally And Backup Prompt Prepared
**Stable repository boundary**: The original stable `brrrdle` repository was not touched.

## Authorization

The user authorized execution of `prompt-packages/phase-50/PHASE-50-DAILY-SOLO-MANUAL-REVIEW-POLISH-FOLLOW-UP-PROMPT-2026-07-07.md`.

Authorized in this step:

- bounded Phase 50 same-phase Review Follow-up for two Daily Solo manual-review regressions;
- source/test fixes for Daily Solo OG deleted draft persistence and Daily Solo GO settled-row animation replay;
- preservation of completed Solo terminal persistence, Practice Solo behavior, explicit Practice new puzzle/new chain behavior, simplified ordinary Solo auto-scroll, and duplicate reward protection;
- updates to Phase 50 checklist/changelog/progress;
- creation of an ignored local prompt artifact for the next Daily-polish recovered Review Candidate Backup.

Not authorized in this step:

- final Phase 50 acceptance or closure;
- Git/GitHub actions, staging, commit, push, PR, merge, branch deletion, or backup workflow execution;
- deployment configuration changes, release actions, public tunneling, or production-configuration commands;
- migrations, Supabase/RLS/RPC/table/bucket changes, storage schema changes, or cloud progress contract changes;
- gameplay-rule, reward-formula, scoring, Elo/rating, Daily-claim-contract, multiplayer-settlement, or broad redesign changes;
- broad Practice Solo rewrites or unrelated shared-component refactors;
- work in the original stable `brrrdle` repository.

## Result

Recovered locally:

- Daily Solo OG deleted draft letters now stay deleted after scroll and normal route re-entry.
- Daily Solo GO settled rows no longer replay reveal animations when the user types into the active draft row after earlier GO-chain rows already exist.

Root cause:

- Daily OG and Daily GO were including every live in-progress resume-slot `updatedAt` timestamp in the React session key.
- Account/live resume captures changed that timestamp during ordinary draft edits, deletions, and keyboard input, which remounted the Daily game surface.
- Practice Solo did not show the same hosted/manual behavior because its resume is treated as one-shot initial evidence, while Daily can continue receiving live in-progress resume-slot updates from the parent/account boundary.

Fix:

- Daily in-progress session keys are now stable across resume-slot timestamp updates.
- Completed Daily evidence still includes a completed timestamp segment so completed display evidence arriving after hydration remounts into the terminal screen.
- The session-key helpers were moved into `src/app/games/soloSessionKeys.ts` so `OgGame.tsx` and `GoGame.tsx` keep the project's React fast-refresh export contract.

## Changed Files

- `e2e/gameplay/solo-completion-reentry.spec.ts`
- `planning/phase-50/CHANGELOG.md`
- `planning/phase-50/REVIEW-CHECKLIST.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-479.md`
- `src/app/games/GoGame.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/dailyAccountBoundary.test.tsx`
- `src/app/games/soloSessionKeys.ts`

Existing uncommitted prior-step documentation remains part of the same eventual Review Candidate Backup set:

- `progress/PROGRESS-STEP-478.md`

## Verification

Passed:

- `npx tsc -p tsconfig.app.json --noEmit`
- Focused unit slice: `npm run test -- src/app/games/dailyAccountBoundary.test.tsx src/app/games/practiceAccountBoundary.test.tsx src/account/resumeSlot.test.ts` (3 files, 27 tests).
- Focused Daily polish Playwright: `npm run test:e2e -- e2e/gameplay/solo-completion-reentry.spec.ts --grep "deleted draft|settled rows"` (2 tests).
- Focused Solo completion Playwright: `npm run test:e2e -- e2e/gameplay/solo-completion-reentry.spec.ts` (7 tests).
- Focused mobile scroll/layout Playwright: `npm run test:e2e -- e2e/layout/mobile-scroll.spec.ts` (15 tests).
- `npm run lint`
- `npm run test` (127 files, 885 tests).
- `npm run test:e2e` (44 tests).
- `npm run build` passed with the existing large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`

Additional lightweight hygiene checks are recorded in the Codex closeout and should be rerun by the backup prompt before staging.

## Notes

- The focused Playwright probe for the two Daily-only bugs did not reproduce the manual failure before the source fix, but source inspection identified a Daily-only remount path matching the reported behavior. The new unit contract and browser checks cover the repaired behavior.
- Practice Solo OG/GO behavior remained protected by focused and full Solo completion re-entry coverage.
- No raw Daily answers, credentials, tokens, auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, local session artifacts, hidden environment values, or raw Supabase project URLs were written to tracked files.

## Next Step

Use `prompt-packages/phase-50/PHASE-50-DAILY-SOLO-POLISH-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-07.md` to authorize a Daily-polish recovered Review Candidate Backup for hosted/live manual review while keeping Phase 50 open.

Final Phase 50 acceptance, final closure, Final Acceptance Backup, deployment configuration, release, migrations, next-phase work, and stable `brrrdle` repository work remain separately gated and unexecuted.
