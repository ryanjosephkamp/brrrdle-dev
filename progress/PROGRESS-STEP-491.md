# Progress Step 491 - Phase 50 Refresh Home Reset Follow-Up

**Status**: Completed - Refresh Home Reset Recovered Locally And Backup Prompt Prepared.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Started**: 2026-07-08T02:51:43Z.
**Completed**: 2026-07-08T03:30:11Z.

## Summary

Implemented the revised Phase 50 refresh policy requested after hosted/live review: manual hard/browser refresh now starts the app at Home by default instead of attempting to preserve the exact current route, tab, subtab, or gameplay surface.

The implementation preserves ordinary in-app navigation and browser Back/Forward behavior through the existing browser-history popstate path. It also preserves the protected public-profile route handoff used by private Practice request/public profile flows, because that path intentionally loads the app with a target public profile and is not ordinary refresh persistence.

Accepted Solo persistence remains covered: after a refresh lands on Home, re-entering the relevant Solo surface restores the saved completed or in-progress state.

## Changed

- Updated app startup route selection so the initial full page load defaults to Home.
- Added a narrow startup exception for intentional public-profile handoff state.
- Updated refresh-routing E2E coverage to assert Home after hard refresh from saved/stale navigation, Solo Practice GO, Multiplayer Lobby, and Settings.
- Updated Solo re-entry E2E coverage so reload assertions first expect Home, then re-enter the Solo surface and verify saved state.
- Updated multiplayer E2E helper flows that intentionally reload during gameplay so they re-enter Multiplayer before resuming selected matches.
- Updated the Phase 50 changelog and manual review checklist with the Home-reset local recovery.
- Prepared an ignored Review Candidate Backup prompt artifact:
  - `prompt-packages/phase-50/PHASE-50-REFRESH-HOME-RESET-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-08.md`

## Verification

Passed:

- Pre-fix focused navigation E2E failed for the expected old behavior: refresh still restored non-Home surfaces.
- `npm run test -- src/app/navigationState.test.ts` - 1 file, 9 tests passed.
- `npx playwright test e2e/navigation/refresh-route-persistence.spec.ts` - 5 tests passed.
- `npx playwright test e2e/gameplay/solo-completion-reentry.spec.ts` - 12 tests passed.
- Focused private-profile/private-request recovery reruns passed:
  - reliability subset, 2 tests passed;
  - dedicated private matchmaking spec, 1 test passed.
- Focused multiplayer reload/re-entry reruns passed:
  - Practice Multiplayer GO transition;
  - timed Practice OG timeout precedence.
- `npm run lint` passed.
- `npm run test` - 129 files, 898 tests passed.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.
- `npm run test:e2e` - 55 tests passed.

Final lightweight hygiene checks are reported in the Codex closeout and should be rerun by the backup prompt before staging.

## Boundaries

No Git/GitHub action, branch creation, staging, commit, push, PR, merge, backup workflow execution, deployment configuration change, release, migration, Supabase/RLS/RPC/table/bucket change, cloud progress schema change, gameplay/reward/scoring/Elo change, Daily claim change, multiplayer settlement rule change, Practice GO answer-selection/randomness algorithm change, next-phase work, public tunneling, final Phase 50 acceptance/closure, Final Acceptance Backup, or stable `brrrdle` repository work was performed.

No raw Daily answers, credentials, auth tokens, secrets, screenshots, videos, traces, HAR files, local storage dumps, local session artifacts, private account data, Supabase keys, Vercel tokens, or environment values were written to tracked files, progress reports, prompt packages, logs, or final reports.

## Next Step

Use `prompt-packages/phase-50/PHASE-50-REFRESH-HOME-RESET-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-08.md` to authorize a Refresh-Home-reset recovered Review Candidate Backup for hosted/live manual review while keeping Phase 50 open.
