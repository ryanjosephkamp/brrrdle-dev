# Progress Step 489 - Phase 50 Refresh Routing Persistence Follow-Up

**Status**: Completed - Refresh Routing Recovered Locally And Backup Prompt Prepared.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Started**: 2026-07-08T01:49:20Z.
**Completed**: 2026-07-08T02:16:15Z.

## Summary

The user authorized the bounded Phase 50 refresh-routing persistence follow-up from `prompt-packages/phase-50/PHASE-50-REFRESH-ROUTING-PERSISTENCE-FOLLOW-UP-PROMPT-2026-07-08.md`.

This step reproduced and fixed a refresh-routing startup edge where stale browser history state could override newer saved navigation state, causing refresh to restore the wrong app surface. Phase 50 remains open for a recovered Review Candidate Backup and hosted/live manual review.

## Root Cause

- The app stored route/tab/subtab/mode navigation state in browser storage and browser history.
- On startup, browser history state was previously trusted before saved navigation state.
- If saved current-tab navigation was newer than the current history payload, browser refresh could restore the stale history payload and reroute the player to another surface.
- A direct same-tab session-storage preference also needed a guard so public-profile and private-request route handoffs that intentionally write local storage plus history would not be overridden by older session state.

## Implemented

- Saved navigation now writes to both local storage and same-tab session storage.
- App startup now uses a dedicated selector:
  - same-tab session navigation is the normal durable refresh source;
  - matching local-storage and browser-history navigation beats stale session navigation for public-profile/private-request handoff;
  - browser history focused Live spectator state is retained only when it matches the selected saved navigation state.
- Browser back/forward popstate handling remains active and saves the resolved navigation state for later refreshes.
- Added focused refresh-routing E2E coverage in `e2e/navigation/refresh-route-persistence.spec.ts`.
- Updated Phase 50 checklist/changelog/progress and prepared an ignored recovered Review Candidate Backup prompt artifact.

## Changed Files

- `e2e/navigation/refresh-route-persistence.spec.ts`
- `planning/phase-50/CHANGELOG.md`
- `planning/phase-50/REVIEW-CHECKLIST.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-488.md`
- `progress/PROGRESS-STEP-489.md`
- `src/app/App.tsx`
- `src/app/navigationState.test.ts`
- `src/app/navigationState.ts`

Ignored local artifact prepared:

- `prompt-packages/phase-50/PHASE-50-REFRESH-ROUTING-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-08.md`

## Verification

Passed:

- Pre-fix focused stale-history refresh-routing Playwright regression failed for the expected reason.
- `npm run test -- src/app/navigationState.test.ts`: 9 tests passed.
- `npx playwright test e2e/navigation/refresh-route-persistence.spec.ts`: 3 tests passed.
- Focused private-match recovery subset passed: 3 tests.
- `npx playwright test e2e/gameplay/solo-completion-reentry.spec.ts`: 12 tests passed.
- `npm run lint`
- `npm run test`: 129 files, 898 tests passed.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `npm run test:e2e`: 53 tests passed.

Final lightweight hygiene checks are reported in the Codex closeout and should be rerun by the backup prompt before staging.

## Preserved

- Accepted Practice Solo OG/GO persistence and supersession behavior remained covered and passing.
- Accepted Daily Solo OG/GO terminal restore, signed-in hydration, and GO terminal definition behavior remained covered and passing.
- Multiplayer focus/refocus, private Practice request routing, public-profile handoff, Live spectator read-only behavior, mobile scroll/layout, and route navigation smoke coverage remained passing.
- Practice GO answer-selection/randomness remains deferred to a later phase or separate audit.

## Boundaries

No Git/GitHub actions, branch creation, staging, commit, push, PR, merge, branch cleanup, backup workflow execution, final Phase 50 acceptance/closure, Final Acceptance Backup, deployment configuration changes, release, migrations, new Supabase/RLS/RPC/table/bucket changes, destructive cloud progress changes, gameplay/reward/scoring/Elo changes, Daily claim changes, multiplayer settlement changes, Practice GO answer-selection/randomness algorithm changes, next-phase work, public tunneling, or stable `brrrdle` repository work was performed.

No secrets, credentials, auth tokens, raw Daily answers, screenshots, videos, traces, HAR files, local storage dumps, local session artifacts, private account data, Supabase keys, Vercel tokens, or environment values were written to tracked files, prompt packages, progress reports, logs, or final reports.

## Next Step

Use `prompt-packages/phase-50/PHASE-50-REFRESH-ROUTING-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-08.md` to authorize a refresh-routing recovered Review Candidate Backup for hosted/live manual review while keeping Phase 50 open.
