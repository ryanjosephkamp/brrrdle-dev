# Progress Step 487 - Phase 50 Practice Solo Persistence And Refresh Follow-Up

**Status**: Completed - Practice Solo Persistence Recovered Locally And Backup Prompt Prepared.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Started**: 2026-07-07T23:42:00Z.
**Completed**: 2026-07-08T00:09:12Z.

## Summary

The user authorized the bounded Phase 50 Practice Solo persistence and refresh follow-up from `prompt-packages/phase-50/PHASE-50-PRACTICE-SOLO-PERSISTENCE-AND-REFRESH-FOLLOW-UP-PROMPT-2026-07-07.md`.

Daily Solo OG/GO was treated as accepted/protected behavior. This step focused on Practice Solo OG/GO after an explicit `New practice puzzle` or `New go chain` action.

## Root Cause

The user-reported Practice Solo GO stale restore was reproduced in authenticated E2E before source repair. After a completed Practice GO chain was superseded and a valid guess was submitted in the new chain, fresh browser/account hydration still rendered the older completed terminal chain.

Source inspection found two related causes:

- Practice resume selection could still prefer a completed display slot over a newer in-progress Practice resume slot.
- Authenticated cloud hydration could rehydrate an older completed Practice cloud session into the current display surface after the user had advanced to a newer Practice seed.

## Implemented

- Added a Practice-only resume selector that compares completed display slots and in-progress resume slots by timestamp so newer in-progress Practice progress can supersede an older terminal display.
- Kept Daily Solo's completed-display precedence intact.
- Made `New practice puzzle` and `New go chain` clear the matching Practice completed display slot and resume slot, persist the selected Solo Practice route, and advance the Practice seed.
- Filtered authenticated Solo cloud hydration so superseded Practice cloud sessions do not restore as the current playable Practice surface when the account's current Practice seed has advanced.
- Made sign-out flush and wait for pending authenticated aggregate progress sync as well as pending Solo cloud writes, so a signed-in Practice new-puzzle/new-chain choice can survive sign-out even before the next valid guess creates a Solo cloud event.
- Added unit coverage for superseded Practice cloud-session filtering.
- Added Playwright coverage for:
  - fresh Practice GO remaining selected/blank after a completed chain is superseded and the page refreshes;
  - a valid first guess in a superseding Practice GO chain surviving refresh;
  - a valid first guess in a superseding Practice OG puzzle surviving refresh;
  - authenticated Practice GO superseding-chain progress restoring in a fresh browser instead of the older completed chain.

## Changed Files

- `e2e/gameplay/solo-completion-reentry.spec.ts`
- `planning/phase-50/CHANGELOG.md`
- `planning/phase-50/REVIEW-CHECKLIST.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-487.md`
- `src/account/soloCloudProgress.ts`
- `src/account/soloCloudProgress.test.ts`
- `src/app/App.tsx`

Ignored local artifact prepared:

- `prompt-packages/phase-50/PHASE-50-PRACTICE-SOLO-PERSISTENCE-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-07.md`

## Verification

Passed:

- Pre-fix focused E2E reproduced the authenticated Practice GO stale-terminal restore.
- `npm run test:unit -- src/account/soloCloudProgress.test.ts`: 1 file, 5 tests.
- `npm run test:e2e -- e2e/gameplay/solo-completion-reentry.spec.ts --grep "superseding|fresh Practice GO"`: 4 tests.
- `npx playwright test e2e/gameplay/solo-completion-reentry.spec.ts`: 12 tests.
- `npm run lint`.
- `npm run test`: 129 files, 896 tests.
- `npm run test:e2e`: 50 tests.
- `npm run build` with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.

Final lightweight hygiene checks are reported in the Codex closeout and should be rerun by the backup prompt before staging.

## Boundaries

No Git/GitHub actions, branch creation, staging, commit, push, PR, merge, Final Acceptance Backup, final Phase 50 acceptance/closure, deployment configuration change, release, migration, new Supabase/RLS/RPC/table/bucket change, Supabase remote operation, gameplay-rule change, reward-formula change, scoring change, Elo/rating change, next-phase work, public tunneling, or stable `brrrdle` repository work was performed.

No raw Daily answers, credentials, auth tokens, secrets, screenshots, videos, traces, HAR files, local storage dumps, or private account data were written to tracked files, progress reports, prompt packages, logs, or final reports.

The observed Practice GO answer-similarity concern was not changed in this follow-up; it remains suitable for a separate audit if still concerning.

## Next Step

Use `prompt-packages/phase-50/PHASE-50-PRACTICE-SOLO-PERSISTENCE-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-07.md` to authorize a Practice-Solo-persistence recovered Review Candidate Backup for hosted/live manual review while keeping Phase 50 open.
