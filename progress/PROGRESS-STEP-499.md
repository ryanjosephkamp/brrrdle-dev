# Progress Step 499 - Phase 50 Ranked Practice FIFO Matchmaking Follow-Up

**Status**: Completed - Ranked Practice FIFO Implemented Locally, Applied Remotely, And Backup Pending.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Started**: 2026-07-08T20:06:16Z.
**Completed**: 2026-07-08T21:05:00Z.

## Summary

Implemented the bounded Phase 50 ranked Practice FIFO matchmaking follow-up locally, then applied the one separately authorized FIFO RPC migration to the intended remote `brrrdle-dev` Supabase project.

The local recovery changes the intended ranked Practice queue contract from recent-opponent/rating-distance preference to first-come, first-served matching among compatible queued requests. This was implemented as a local source-controlled Supabase RPC migration artifact and guarded with focused contract, component, repository, and real browser E2E coverage.

Phase 50 remains open.

## Changed

- Added `supabase/migrations/20260708202000_phase50_ranked_practice_fifo_matchmaking.sql`.
- Replaced the current intended `claim_ranked_async_matchmaking_pair(text, text)` contract with compatible FIFO pairing:
  - authenticated caller and owner checks remain required;
  - no-self-match remains required;
  - only queued ranked Practice async requests can match;
  - mode, rating bucket, hard mode, word length, and ranked time control must match;
  - unsupported time controls and invalid word lengths remain rejected;
  - expired queued rows are marked expired before matching;
  - candidate selection uses `queued_at, id` with `for update skip locked`;
  - the browser-facing return shape remains unchanged.
- Removed the Phase 43 recent-opponent preference and rating-distance ordering from the current intended ranked Practice claim RPC.
- Updated `src/multiplayer/rankedQueueFairnessContract.test.ts` to lock the FIFO SQL contract and guard against reintroducing recent-opponent or rating-distance preference.
- Updated ranked Practice UI copy and component assertions so the details panel says the oldest compatible queued rival is paired first.
- Added a real two-client ranked Practice GO queue smoke test to preserve the user-reported working GO path while the queue contract changes.
- Updated the Phase 50 changelog and manual review checklist with local recovery evidence and the remaining remote migration/hosted review boundary.
- Created an ignored local next-step prompt package for separately authorized remote Supabase migration execution and Review Candidate backup.
- After that prompt was authorized, applied remote migration `phase50_ranked_practice_fifo_matchmaking` for the one named FIFO RPC migration only.

## Remote Migration

Applied to the intended remote `brrrdle-dev` Supabase project:

- `phase50_ranked_practice_fifo_matchmaking`

Remote verification confirmed:

- the migration ledger includes `phase50_ranked_practice_fifo_matchmaking`;
- the remote `claim_ranked_async_matchmaking_pair(text, text)` function has the Phase 50 FIFO comment;
- the remote function orders by `candidate.queued_at` and `candidate.id`;
- the remote function keeps `for update skip locked`;
- the remote function no longer references `phase43_is_recent_ranked_practice_opponent`;
- the remote function no longer orders by `abs(candidate.rating_snapshot - v_request.rating_snapshot)`;
- `authenticated` can execute the RPC;
- `anon` cannot execute the RPC.

## Verification

Passed:

- `npm run test -- src/multiplayer/rankedQueueFairnessContract.test.ts`: 1 file, 3 tests.
- `npm run test -- src/multiplayer/rankedQueueFairnessContract.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/multiplayerRepository.test.ts src/multiplayer/privateMatchmaking.test.ts src/app/scopedProgressMultiplayerState.test.ts`: 5 files, 87 tests.
- `npx playwright test e2e/gameplay/practice-multiplayer-go.spec.ts`: 2 tests.
- `npx playwright test e2e/gameplay/practice-multiplayer-og.spec.ts e2e/gameplay/practice-multiplayer-go.spec.ts e2e/gameplay/private-matchmaking.spec.ts`: 11 tests.
- `npx playwright test e2e/gameplay/multiplayer-reliability.spec.ts e2e/gameplay/multiplayer-focus-refocus.spec.ts`: 6 tests.
- `npx playwright test e2e/navigation/refresh-route-persistence.spec.ts e2e/gameplay/solo-completion-reentry.spec.ts`: 17 tests.
- `npm run lint`.
- `npm run test`: 129 files, 900 tests.
- `npm run test:e2e`: 56 tests.
- `npm run build`, with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.

Final lightweight repository hygiene checks are recorded in the Codex closeout and are rerun by the Review Candidate Backup workflow before staging.

## Prompt Package

Created an ignored local prompt package:

- `prompt-packages/phase-50/PHASE-50-RANKED-PRACTICE-FIFO-REMOTE-MIGRATION-AND-REVIEW-CANDIDATE-BACKUP-PROMPT-2026-07-08.md`

This prompt was used to authorize applying the local FIFO RPC migration to the intended remote Supabase project and then performing the governed Review Candidate GitHub backup for hosted/live manual review.

## Boundaries

This step performed only the one named remote Supabase RPC migration. It did not perform any other remote Supabase SQL/RLS/schema/table/bucket change, destructive cloud cleanup, Git/GitHub backup, branch creation, staging, commit, push, PR, merge, branch cleanup, final Phase 50 acceptance/closure, Final Acceptance Backup, deployment configuration changes, release, profile-name policy implementation, admin queue visualization, public tunneling, next-phase work, unsafe credential/private-data handling, or stable `brrrdle` repository work.

The hosted/live database now has the Phase 50 FIFO claim RPC applied, but hosted/live manual acceptance remains pending until the Review Candidate Backup is completed and the user manually reviews the live candidate.

## Next Step

Complete the governed Review Candidate GitHub Backup from `prompt-packages/phase-50/PHASE-50-RANKED-PRACTICE-FIFO-REMOTE-MIGRATION-AND-REVIEW-CANDIDATE-BACKUP-PROMPT-2026-07-08.md` while keeping Phase 50 open for hosted/live manual review.
