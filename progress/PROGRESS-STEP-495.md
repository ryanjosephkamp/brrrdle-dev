# Progress Step 495 - Phase 50 Multiplayer Matchmaking And First-Turn Persistence Recovery

**Status**: Completed - Multiplayer Matchmaking Recovered Locally And Backup Prompt Prepared.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Started**: 2026-07-08T15:46:02Z.
**Completed**: 2026-07-08T16:26:24Z.

## Summary

Implemented the bounded same-phase multiplayer recovery follow-up authorized by the Phase 50 prompt package.

The local recovery preserved accepted Solo persistence and Home-on-refresh behavior while hardening multiplayer coverage around the hosted/manual findings:

- private Practice request first-turn submission persistence;
- private Practice request forfeit persistence;
- public Practice and Daily open-match waiting-row stability;
- ranked Practice queue finalization avoiding stale/immortal queue-row collisions.

Phase 50 remains open. The recovered state is ready for a separately authorized Review Candidate Backup and hosted/live manual review, but this step did not run any Git/GitHub backup workflow.

## Changed

- Added a finite expiry helper for ranked Practice queue requests and applied it before creating remote ranked queue requests.
- Added unit coverage for ranked queue expiry payload construction.
- Extended private matchmaking E2E coverage to submit the requester first guess, verify remote move persistence, verify rival visibility, reload/re-enter the requester view, and verify private forfeit persistence.
- Added a Playwright helper for Practice Multiplayer word-length selection and used a non-default ranked E2E word length for untimed ranked queue matching.
- Added a Playwright admin helper to wait for a specific multiplayer row by id.
- Hardened Practice OG, Practice GO, Daily OG, and Daily GO open-match E2E coverage by waiting briefly and rechecking that the exact waiting row remains open before the rival joins.
- Updated the Phase 50 changelog and manual review checklist.
- Added this progress report and updated `progress/PROGRESS.csv`.
- Created an ignored local recovered Review Candidate Backup prompt package:
  - `prompt-packages/phase-50/PHASE-50-MULTIPLAYER-MATCHMAKING-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-08.md`

## Reproduction And Root Cause Notes

Private first-turn and private forfeit behavior did not reproduce as broken in the current local source after focused E2E coverage was added; the new E2E now protects those exact paths.

Practice and Daily public open-match flash/revert behavior did not reproduce locally after adding waiting-row stability checks; the strengthened tests now verify that the exact waiting row survives a short settle before join.

The ranked Practice path did reveal a credible source risk: ranked queue requests could be created with no expiry, allowing old queue rows to remain matchable indefinitely. The local fix gives newly created ranked queue requests a finite five-minute expiry before the trusted queue RPC call. The ranked E2E also now avoids default-length collisions while preserving real queue creation, matching, finalization, search-again, and opponent-label verification.

No Supabase schema, RLS, RPC, table, migration, or deployment change was required.

## Verification

Passed:

- `npm run test -- src/multiplayer/multiplayerRepository.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/privateMatchmaking.test.ts src/app/scopedProgressMultiplayerState.test.ts`: 4 files, 83 tests.
- `npx playwright test e2e/gameplay/private-matchmaking.spec.ts e2e/gameplay/practice-multiplayer-og.spec.ts`: 9 tests.
- `npx playwright test e2e/gameplay/practice-multiplayer-go.spec.ts e2e/gameplay/daily-multiplayer-og.spec.ts e2e/gameplay/daily-multiplayer-go.spec.ts`: 3 tests.
- `npx playwright test e2e/gameplay/multiplayer-reliability.spec.ts e2e/gameplay/multiplayer-focus-refocus.spec.ts e2e/navigation/refresh-route-persistence.spec.ts e2e/gameplay/solo-completion-reentry.spec.ts`: 23 tests.
- `npm run lint`.
- `npm run test`: 129 files, 899 tests.
- `npm run test:e2e`: 55 tests.
- `npm run build` with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.

Final lightweight hygiene checks are reported in the Codex closeout and should be rerun by the backup prompt before staging.

## Boundaries

No Git/GitHub branch creation, staging, commit, push, PR, merge, backup workflow execution, final Phase 50 acceptance/closure, Final Acceptance Backup, deployment configuration change, release, migration, Supabase/RLS/RPC/table/bucket execution, destructive cloud progress change, gameplay/reward/scoring/Elo change, Daily claim change, Practice GO answer-selection/randomness algorithm change, next-phase work, public tunneling, or stable `brrrdle` repository work was performed.

No credentials, auth tokens, secrets, raw emails, raw Daily answers, screenshots, videos, traces, HAR files, local storage dumps, local session artifacts, Supabase keys, Vercel tokens, or environment values were written to tracked files, progress reports, prompt packages, logs, or final reports.

## Next Step

Use `prompt-packages/phase-50/PHASE-50-MULTIPLAYER-MATCHMAKING-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-08.md` to authorize a recovered Review Candidate Backup for hosted/live manual review while keeping Phase 50 open.
