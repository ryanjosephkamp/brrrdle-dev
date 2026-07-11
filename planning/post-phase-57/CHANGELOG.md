# Post-Phase-57 Deeper Functional-Shell Optimization Changelog

**Status:** Review Candidate prepared; hosted/manual review and governed backup remain gated.
**Protected baseline:** `7df20365d9f0dc29bd609a22118403fce6662abd` / `phase-57-golden-2026-07-11`.
**Date:** 2026-07-11.

## Implemented

- Replaced 34 eager word-bank imports with a typed per-length dynamic registry while retaining one answer-free eager manifest.
- Added deterministic per-length preparation, canonical validation, completed-result caching, same-length in-flight deduplication, retryable answer-free failures, and lazy historical definition supplements.
- Added compact loading/error states for Solo OG/GO, Multiplayer, Calendar entry, and Word Explorer. Incoming private requests now prepare their requested length before game projection.
- Added route-level lazy boundaries for Solo, Calendar, Multiplayer, Marketplace, History, Words, Stats, Leaderboard, Public Profile, Settings, and Admin while retaining canonical App state and repositories.
- Added contained route loading/failure UI. Retry reloads to Home under the accepted refresh contract so a failed browser module-cache entry cannot strand the app.
- Removed route-component barrel exports that kept deferred presentation modules in the eager graph.
- Updated the E2E worker fixture for synchronous canonical answer helpers and added cold-load/selected-length/route-failure browser coverage.

## Measured Result

- Main JavaScript: 1,008.86 kB / 272.81 kB gzip to 647.94 kB / 175.79 kB gzip.
- Cold Home word requests: 34 to 0.
- HTML module preloads: 35 to 7.
- Product route chunks: 0 to 14.
- Production CSS remained effectively unchanged at 83.79 kB / 14.03 kB gzip.

## Conditional Work Skipped

- Polling and countdown ownership were not changed. Direct signed-in tracing confirmed overlap, but the private-request consumers have different 100-row notification and 20-row request-center contracts. Existing focus/refocus, request lifecycle, ranked queue, rematch, Live freshness, and mobile timing tests pass; consolidation would require a separate shared-data decision.

## Hosted Review Follow-Up

The user accepted the broader optimized shell but reported three bounded issues: signed-in Daily Solo in-progress rollback after focus/refocus or refresh, delayed ranked Daily participant-game discovery after refresh, and missing spectator cancellation/forfeit reason text. Investigation and the test-first recovery are recorded in `REVIEW-FOLLOW-UP-IMPLEMENTATION-PLAN-2026-07-11.md`.

## Follow-Up Implementation

- Added per-account Solo mutation serialization, pending-write hydration guards, and canonical progression-aware cloud merge precedence.
- Removed the unverified empty authenticated Multiplayer bootstrap publication, surfaced load failures, contained realtime failures, and added one bounded immediate load retry at repository initialization and Multiplayer entry.
- Added strict backward-compatible spectator termination parsing and clear public-name-based cancellation/forfeit copy.
- Added `20260711212934_post_phase57_spectator_termination_transparency.sql`, replacing only the two established spectator RPC bodies while preserving signatures, grants, current-Daily exclusion, read-only capabilities, and private-data boundaries.
- Added focused unit/contract tests and real disposable-account E2E for signed-in Daily Solo focus/route/reload persistence and immediate ranked Daily discovery in Daily, Active, and Live.

The exact migration applied successfully once. Supabase recorded generated remote version `20260711215831` instead of source-controlled version `20260711212934` under the same migration name. Post-apply catalog proof showed that only the two intended spectator function bodies changed; signatures, returned table shapes, search paths, security-definer attributes, grants, and unrelated catalog fingerprints remained unchanged. The migration SQL was not rerun, and hosted review paused until separately authorized ledger reconciliation and post-apply verification completed.

Ledger reconciliation changed only the generated migration-history version to the source-controlled version in one transaction. Histories now match at 39/39, catalog fingerprints stayed unchanged, and post-apply verification is complete. The recovery is ready for governed Review Candidate backup and hosted/manual review.

## Verification

- 141 unit-test files / 1,001 tests passed.
- Lint, production build, and API typecheck passed.
- Focused recovery passed 51/51; mobile physical-keyboard readiness passed 3/3 repeated runs.
- Complete authority-enabled Playwright passed 76/76 with one worker after the established focused-retry/fresh-complete protocol.
- The optimization Review Candidate baseline retained exact 38/38 remote/local history, zero temporary E2E users, and stable bounded Phase 57 catalog fingerprints before this follow-up introduced its one gated local migration.
- Follow-up verification passed 97 focused tests, 220 account tests, lint, 144 files / 1,016 unit tests, build, app/API typechecks, both new authority-backed browser regressions, and a fresh 78/78 authority-enabled E2E run with one worker.
- Before application, the remote ledger contained the accepted 38 migrations and local contained exactly 39 with the spectator migration as the sole pending artifact.
- After exact one-time application, remote contains 39 migrations but differs from local only by generated version `20260711215831` versus source-controlled version `20260711212934`, with the same migration name.
- The two post-apply spectator function hashes are `546ad763742d56de9dfea2dcf63e436d` and `79330949c8ef878ed78e439954d23661`. Unrelated function, table, index, policy, and trigger fingerprints are unchanged from pre-apply evidence. Temporary E2E users remain zero.
- Ledger-only reconciliation produced exact 39/39 local/remote history equality without rerunning migration SQL or changing any application catalog fingerprint.
- Real authenticated/public terminal spectator E2E passed for two-participant pre-turn cancellation and post-turn forfeit labels; focused Daily Solo and ranked Daily refresh regressions also passed.
- Final verification passed 86 focused spectator tests, lint, 144 unit files / 1,016 tests, build, app/API typechecks, and a fresh authority-enabled 79/79 Playwright run with one worker in 10.6 minutes.
- Supabase advisors reported existing project-wide warnings, including the intentionally public read-only spectator security-definer RPC; no new table, policy, index, trigger, role broadening, or unreviewed function was introduced.

## Boundaries Preserved

No dependency, lockfile, framework, gameplay, economy, rating, queue, request, deployment, design-system, release, Git/GitHub, or stable-repository change was made. The only remote application change is the exact one-time spectator projection migration plus its proven ledger-only version reconciliation.
