# Phase 58 Changelog

**Status:** Review Candidate prepared; hosted/manual review remains.
**Date:** 2026-07-12.
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

## Gate

The governed Review Candidate GitHub Backup, hosted/manual review, final acceptance, phase closure/checkpointing, Phase 59, and Phase 60 remain separately gated.

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
