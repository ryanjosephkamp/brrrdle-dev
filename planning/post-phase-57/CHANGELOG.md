# Post-Phase-57 Deeper Functional-Shell Optimization Changelog

**Status:** Review Candidate prepared; hosted/manual review remains required.
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

## Verification

- 141 unit-test files / 1,001 tests passed.
- Lint, production build, and API typecheck passed.
- Focused recovery passed 51/51; mobile physical-keyboard readiness passed 3/3 repeated runs.
- Complete authority-enabled Playwright passed 76/76 with one worker after the established focused-retry/fresh-complete protocol.
- Remote migration history remains exactly 38/38, temporary E2E user count is zero, local migrations are unchanged, and bounded Phase 57 catalog object counts/fingerprints remain stable for this no-DDL pass.

## Boundaries Preserved

No dependency, lockfile, framework, gameplay, economy, rating, queue, request, privacy, persistence, Supabase schema/data, migration, deployment, design-system, release, Git/GitHub, or stable-repository change was made.
