# Progress Step 524 - Phase 55 Recovered Review Candidate

**Status:** Completed - Phase 55 Review Candidate prepared.
**Phase:** Phase 55 ranked Daily Multiplayer and narrow private Practice request routing.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev` only.
**Date:** 2026-07-10.

## Summary

Phase 55 recovered from the migration-ledger and post-apply contract blockers. Ranked Daily OG/GO now uses server-selected answers, strict FIFO queueing, four independent Daily claim lanes, participant-scoped queue visibility, reservation-owned finalization, answerless allowlisted public projections, server-authorized actions, private settlement evidence, separate Elo buckets, and public leaderboard/Profile metadata. Narrow private Practice request status and direct routing remain in place.

The already-applied base migration was not edited or rerun. Four additive migrations repaired the runtime contracts discovered during post-apply probes: cancellation-safe requeueing and GO final-puzzle continuation, the missing queue `matched_at` column, orphan-safe cleanup, and reservation-owned finalization evidence.

## Root Causes And Repairs

1. Daily queue expiry reused the ranked Practice five-minute expiry. Daily now uses the canonical next UTC midnight while Practice remains unchanged.
2. Terminal queue requests reused permanently reserved request ids. Daily terminal attempts now create fresh ids while active retries stay idempotent.
3. GO puzzle five could terminate unsolved. The server action authority now keeps it active until solved.
4. Caller projections were denylist-filtered. Finalization now constructs public state from an explicit allowlist and locked server reservation.
5. Trusted functions referenced a missing `matched_at` queue column. One additive migration supplies it.
6. Cleanup could miss reservations when finalization failed before authority creation. Service-role cleanup now discovers and removes that dependency path safely.
7. Account progress hydration could replace a newly loaded durable multiplayer snapshot with stale cached state during guest-to-account transition. The selector now preserves only a target account's already-loaded participant rows.
8. Live spectator E2E expected a Practice-only metadata label. The assertion now follows the approved Practice-and-Daily public metadata contract.

## Remote Evidence

- exactly one active project named `brrrdle-dev` was verified without printing its identifier or credentials;
- local and remote migration histories match exactly at 36 migrations;
- the ranked Daily catalog remains 2,175 answers and 9,776 valid guesses;
- all six relevant authority functions are security-definer with empty search paths;
- anonymous execute access is absent; authenticated execute is limited to the five participant-facing authority RPCs, while cleanup remains service-role-only;
- five expected Supabase security-advisor warnings identify those guarded authenticated security-definer RPCs; no Phase 55 performance finding is present;
- temporary Auth users, ranked Daily queue rows, public games, claims, pair reservations, authority rows, and action rows are all zero after cleanup.

## Verification

- test-first red gate reproduced queue expiry, FIFO/requeue, final GO continuation, projection allowlisting, cleanup, and reload hydration gaps;
- focused ranked Daily Playwright: 4/4 passed;
- focused private Practice Playwright: 2/2 passed;
- focused shell/mobile/refresh/Solo Playwright: 27/27 passed;
- focused Live spectator Playwright: 1/1 passed after stale assertion repair;
- fresh full `npm run test:e2e`: 67/67 passed in 9.7 minutes;
- fresh full `npm test`: 134 files and 963 tests passed;
- `npm run lint` passed;
- `npm run build` passed with the existing large-chunk advisory;
- `npx tsc -p tsconfig.api.json --noEmit` passed;
- migration-contract, ledger, catalog, grant, authority, concurrency, cleanup, and zero-residue probes passed;
- final repository hygiene checks are recorded in the closeout and must be rerun by the backup workflow before staging.

## Boundaries

No Git/GitHub action, deployment configuration change, release, Phase 55 final acceptance/closure, Phase 56 implementation, public tunnel, unsafe credential/private-data handling, or stable `brrrdle` work was performed. Phase 55 remains open for hosted/manual review.

## Next Step

Run the governed Phase 55 recovered Review Candidate GitHub Backup prompt, then use `planning/phase-55/REVIEW-CHECKLIST.md` on the hosted development site. Do not close Phase 55 until required manual checks pass.
