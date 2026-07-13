# Phase 58 Changelog

**Status:** Final Acceptance complete; Phase 58 closed and the functional shell locked.
**Date:** 2026-07-13.
**Baseline:** `post-phase-57-optimized-shell-golden-2026-07-12` at `046c681dd99e66b21b9fdbeca97b60b2e0ada99c`.

## GO Solution Diversity

- Added one shared versioned GO chain selector that hash-ranks canonical candidates, applies a stable avalanche mix, breaks ties lexically, and selects without replacement.
- Practice uses v2 for new chains. Daily uses v1 before the `2026-07-14` UTC cutoff and v2 on or after it.
- Preserved stored legacy answers and missing-version restoration as v1.
- Added distinct ranked/unranked Daily streams and complete-set exclusion for ranked GO when capacity permits.
- Preserved carry-over rows, keyboard state, Hard Mode, puzzle counts, word lengths, difficulty pools, transition behavior, and answer privacy.

## Multiplayer Refresh Readiness

- Replaced the broad critical authenticated read with an explicit participant-filtered query and a separate waiting-game query.
- Participant authority now publishes first. Concurrent loads share one in-flight request, stale generations cannot replace current state, and realtime bursts coalesce into one trailing refresh.
- Added answer-free readiness timing events.
- Reproduced the remaining ranked Daily cold-start failure and traced it to lazy word-bank readiness: the server-authoritative row arrived promptly but could not hydrate before the canonical length-five bank was available.
- Added conditional preparation only when an answerless ranked-Daily row requires it, preserving the optimized cold-Home loading boundary.

## Migration

- Added the source-controlled selector migration `20260712175405_phase58_go_chain_selector_v2.sql`.
- The migration versions private ranked-Daily answer authority, keeps existing rows at v1, adds the private v2 selector/dispatcher and answerless public version metadata, and preserves existing queue, claim, rating, settlement, and spectator contracts.
- Applied that exact migration once and reconciled only its byte-identical generated ledger version.
- Added and applied `20260712190338_phase58_go_chain_selector_v2_bigint_overflow_repair.sql`, replacing only the private mixer with overflow-safe exact modulo-`2^32` arithmetic.
- Reconciled only the repair's byte-identical generated ledger version. Local and remote histories match exactly at 41/41.

## Verification

- Passed focused GO selector/property, legacy/cutoff, Daily separation, repository readiness/concurrency, and migration-contract suites.
- Passed scalar boundary parity and post-cutoff TypeScript/SQL chain parity for three dates. Every five-answer chain is unique and each ranked/unranked pair is disjoint.
- Passed lint, 147 unit files and 1,041 tests, build, and app/API TypeScript checking.
- Passed affected Solo/Practice/Daily GO browser regressions.
- Passed all ten actual-participant same-tab reload lanes under one shared five-second deadline: ranked/unranked Practice OG/GO, ranked/unranked Daily OG/GO, and private Practice OG/GO.
- Passed representative Firefox and WebKit Practice/Daily/private OG/GO coverage, 8/8 per browser.
- Passed the complete authority-enabled Chromium Playwright suite on a fresh rerun: 89/89 with one worker. Two known transient identity-summary `403` responses in the preceding run passed exact retry before the complete clean rerun.
- Reverified the intended `brrrdle-dev` Supabase project, exact 41/41 history, unchanged protected catalog/authority/spectator evidence, answerless public ranked-Daily rows, no mixer browser grants, no Phase 58 advisor finding, and zero temporary Auth/profile/projection residue.
- Recorded an approximately 17.7-second paired post-cutoff SQL parity probe for hosted/post-cutoff observation; no verification timeout was increased.

## Original Review Candidate Gate - Satisfied

The governed Review Candidate backup and hosted/manual review completed. Final acceptance and the separate final-shell Golden Checkpoint are authorized by the user; Phase 59/60 execution is superseded in this repository by the Awordle successor route.

## Remote Application Blocker

- Applied the exact reviewed Phase 58 migration once to the verified `brrrdle-dev` project.
- Proved the generated remote ledger statement was byte-identical to the local 7,312-byte migration, then reconciled only generated version `20260712185454` to source version `20260712175405`. Local and remote histories match at 40 migrations.
- Proved the column/default/check/comment, seven functions, two triggers, empty search paths, security modes, and browser-role revocations match the reviewed migration. Existing authority answers and every unrelated protected fingerprint stayed unchanged.
- The first server v2 vector probe failed with PostgreSQL `22003: bigint out of range` in `phase58_mix_u32`. Its second avalanche multiplication can overflow signed bigint before modulo reduction.
- Existing v1 games remain unaffected: eight authority rows are still v1, no post-cutoff row exists, v1 dispatch matches the preserved selector, public projections remain answerless, and temporary Auth residue is zero.
- Stopped before corrective SQL, a second migration, temporary-account post-apply E2E, full regression, or Review Candidate preparation. One additive overflow-safe function-replacement migration is required and separately gated.

## Overflow Recovery Outcome

- Created exactly one additive function-only corrective migration and changed no database object beyond `brrrdle_private.phase58_mix_u32(bigint)`.
- The repaired mixer matches TypeScript unsigned-32 behavior across boundary vectors and no longer overflows.
- The exact migration was applied once and its generated ledger version was reconciled only after byte and object equivalence proof.
- Post-apply parity, privacy, catalog, authority, advisor, temporary-account, cross-browser, full-regression, and cleanup gates are clean.

## Post-Review Follow-Up

- Hardened ordinary Multiplayer updates with exact affected-row acknowledgment. A participant-owned forfeit that loses its compare-and-swap now re-reads canonical state, reapplies the existing cancellation/forfeit rule, and retries exactly once.
- Preserved generic turn, join, timeout, and cancellation conflict behavior; the bounded retry is for the initiating participant's forfeit only.
- Merged acknowledged canonical rows back into the local snapshot. If both attempts conflict, the app reloads the durable game and shows a stable non-secret retry message instead of presenting an optimistic terminal state as saved.
- Added real temporary-account OG and GO post-turn forfeit coverage, an older-compatible projection conflict recovery, and a double-conflict failure case.
- Added one generic dark, opaque selected-badge treatment for numeric and `Ready` attention badges while preserving unselected tone colors.
- Notification `Open` now closes the center before preserving its existing route action. Mark read, Mark all read, and Hide continue to leave the center expanded.
- No migration, Supabase schema change, dependency, framework, deployment, Git, GitHub, phase closure, checkpoint, or redesign-repository action was required or performed.

## Post-Review Verification

- Lint passed; 147 unit files and 1,044 tests passed; production build and app/API typechecks passed.
- The final fresh authority-enabled Chromium run passed 95/95 with one worker, including all fresh/conflict forfeit cases, ranked/private/Daily regressions, refresh-readiness lanes, notification behavior, and mobile layout.
- Exact local/remote migration equality remains 41/41. Protected mixer and spectator digests are unchanged, private mixer browser grants remain zero, public ranked-Daily answer leaks remain zero, and no Phase 58 security/performance advisor finding appeared.
- Temporary E2E Auth users, profiles, and game projections are zero after cleanup. Local-only desktop/mobile badge and mobile notification evidence is recorded under `test-results/visual-review/phase-58-post-review-follow-up/`.

## Final Acceptance And Shell Lock

- On 2026-07-13, the user completed hosted/manual review and reported that every required calendar-available item passes with no known gameplay, persistence, privacy, or presentation regression.
- The two post-`2026-07-14` observations remain optional calendar-gated monitoring. Their underlying selector/parity contracts passed automated verification and they do not block acceptance.
- Phase 58 is closed. The accepted `brrrdle-dev` runtime, tests, migrations, dependencies, Supabase project, and Vercel project are locked as the final functional shell.
- Future redesign work is rerouted to the separate Awordle repository and independent service stack described by `SHELL-LOCK.md` and `planning/handoffs/AWORDLE-SUCCESSOR-ROADMAP-AND-HANDOFF-2026-07-13.md`.
- This closeout changes documentation and governance only. It does not change runtime source, tests, migrations, dependencies, deployment configuration, Supabase state, Vercel state, or the new Awordle repository.
