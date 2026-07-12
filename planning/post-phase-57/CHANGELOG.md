# Post-Phase-57 Deeper Functional-Shell Optimization Changelog

**Status:** Final Acceptance complete; Golden Checkpoint `post-phase-57-optimized-shell-golden-2026-07-12` approved.
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

## Final Hosted Ranked-Discovery Follow-Up

Hosted review accepted Daily Solo persistence and spectator cancellation/forfeit transparency. One issue remains: ranked Practice and ranked Daily participant games, in OG and GO, can be absent from Overview, the corresponding mode tab, Active Games, and Live for approximately 15-30 seconds after a hard refresh-to-Home.

Repository review found that authentication replaces an initial local multiplayer repository with an empty Supabase repository, successful-empty reads are not retried, and the existing ranked Daily refresh E2E warms Multiplayer before reload. `RANKED-MULTIPLAYER-HARD-REFRESH-DISCOVERY-FINAL-FOLLOW-UP-PLAN-2026-07-11.md` records a reproduce-first final attempt with a five-second target, a three-cycle evidence boundary, and explicit deferral rather than speculative architecture if the narrow repair does not hold.

The final attempt reproduced the cold-start ordering issue and proved that participant reads already contained the durable game while stale authenticated progress hydration could leave the UI empty until a focus-triggered refresh. A narrow one-time reconciliation passed production Firefox and Chromium but did not reliably meet the unchanged five-second ranked Practice gate under the standard runner. The three-cycle limit was reached, so all speculative runtime/test changes and diagnostics were removed. The accepted Review Candidate remains intact, and the ranked post-refresh delay is recorded as deferred pending a separately governed authenticated hydration/repository-readiness design.

## Authenticated Multiplayer Readiness Recovery

The user subsequently authorized the separately governed architecture decision. Authenticated account progress no longer owns or restores Multiplayer projections. App now tracks which authenticated user owns the current repository snapshot; progress hydration preserves Multiplayer only when that explicit owner matches, otherwise it waits with an empty state for the authenticated repository. This removes the timing-dependent cache/repository overwrite without polling, retries, timeouts, schema changes, or row-identity inference.

True-cold fresh-page E2E now covers ranked Practice GO and ranked Daily OG without warming Multiplayer first. Both require the game in the corresponding mode tab, Active Games, and Live within five seconds. The change passed focused repeated Chromium, production Chromium/Firefox, the full ranked reliability set, all 1,018 unit tests, and a fresh 80/80 authority-enabled E2E run after the established exact-retry protocol for one unrelated Daily OG lobby timing transient.

## Hosted Failure After PR #68

Hosted manual review rejected the readiness recovery. Ranked Practice and ranked Daily games still disappear from all expected participant surfaces after a manual same-tab refresh-to-Home, and the reported recovery delay increased to approximately 30-60 seconds.

The prior automated evidence used a second page while the original matched page remained alive in the same browser context. It therefore did not model the actual participant tab being destroyed and reconstructed by a manual reload. `RANKED-MULTIPLAYER-SAME-TAB-HARD-REFRESH-RECOVERY-PLAN-2026-07-11.md` replaces that false-positive topology with a Practice-first, same-tab, real-account reproduction and temporary hosted-preview acceptance gate. No source reversion or new implementation is authorized by this planning update.

## Same-Tab Hard-Refresh Recovery

The corrected two-context harness now reloads the actual matched participant page. With the account projection synced and the participant repository read held beyond five seconds, the PR #68 selector reproduced the hosted empty interval by discarding the current account's safe provisional Multiplayer projection until repository authority arrived.

Authenticated progress may now supply that account-scoped Multiplayer projection only while its repository is pending. The existing explicit same-user repository authority still wins permanently once published, so later progress hydration cannot replace current repository state. This is a display/readiness bridge only; canonical game writes, queues, claims, settlements, realtime, and server contracts are unchanged.

Ranked Practice and Daily OG/GO now have real UI same-tab reload coverage across Overview, the matching mode tab, Active Games, and Live under an eight-second delayed repository read and an unchanged five-second visibility budget. Practice passed five consecutive Chromium cycles per mode plus Firefox and WebKit. All four scenarios passed local production mode and one protected non-production Vercel preview.

Complete regression exposed two existing harness weaknesses rather than product regressions. The selected unranked Daily join helper now reopens the exact lobby after the accepted refresh-to-Home fallback, and temporary Auth-user deletion retries at most three times with bounded backoff. The final fresh authority-enabled browser run passed 83/83, with exact 39/39 migration equality, unchanged spectator fingerprints, and zero temporary Auth/profile residue.

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
- Same-tab recovery verification passed three red selector expectations before source correction, six selector tests after correction, ten consecutive Chromium Practice reloads, two Firefox Practice reloads, two WebKit Practice reloads, four Firefox/WebKit Daily reloads, four local-production reloads, four protected-preview reloads, lint, 144 files / 1,018 unit tests, build, API typecheck, and a final fresh 83/83 authority-enabled E2E run.
- Preview `https://brrrdle-a4rdkoy7k-ryanjosephkamps-projects.vercel.app` is `READY` and non-production. It was not promoted and no production configuration changed.
- Final cleanup proof: exact 39/39 local/remote migrations, spectator hashes `546ad763742d56de9dfea2dcf63e436d` and `79330949c8ef878ed78e439954d23661`, zero temporary Auth users, and zero temporary public profiles.

## Boundaries Preserved

No dependency, lockfile, framework, gameplay, economy, rating, queue, request, deployment, design-system, release, Git/GitHub, or stable-repository change was made. The only remote application change is the exact one-time spectator projection migration plus its proven ledger-only version reconciliation.

## Final Acceptance

The user completed hosted manual review after PR #69 and accepted the post-Phase-57 optimized functional shell for closure and checkpointing. Daily Solo persistence, spectator cancellation/forfeit transparency, Marketplace and consumables, route/data loading, navigation, account surfaces, multiplayer flows, responsive behavior, and the broader preservation checklist are accepted.

Ranked Practice and Daily games may still take a short interval to reappear after a manual hard refresh. The user confirmed that the remaining delay is acceptable, is not associated with game loss, and may be revisited later if it persists or worsens. It is recorded as a deferred minor limitation rather than silently represented as eliminated.

Final Acceptance closes the post-Phase-57 optimization/recovery program. The next governed stage is Phase 58 planning for design direction, concepts, `design.md`, frontend-stack evaluation, performance/accessibility budgets, and the GPT-5.6 SOL handoff. Production source redesign remains separately gated to Phase 59.
