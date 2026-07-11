# Phase 57 Changelog

## Local implementation gate - 2026-07-11

Phase 57 is implemented locally through the explicit remote-migration stop gate.

### Economy and marketplace

- Added one shared idempotent economy command model for rewards, existing spends, purchases, and consumable use.
- Replaced max-based coin/inventory merge behavior with revision-aware economy snapshot selection so stale browser state cannot resurrect spent resources.
- Added a lightweight Marketplace route selling Reveal One Letter for 25 coins and Remove Incorrect Letters for 40 coins.
- Added fixed pending/success/error purchase feedback and current balance/inventory counts.
- Prepared one additive, unapplied migration with owner-private economy state, an append-only operation ledger, row locking, strict RPC validation, explicit RLS/grants, and progress-snapshot bootstrap.

### Solo Practice consumables

- Reveal One Letter deterministically reveals the lowest unrevealed answer position without entering or submitting a guess.
- Remove Incorrect Letters disables answer-absent on-screen keys and rejects matching physical-keyboard input without changing guesses, tiles, Hard Mode, answers, rewards, or definitions.
- Effects persist inside private serialized Solo Practice OG/GO session state, including use before the first guess, refresh, route re-entry, and account Solo-cloud hydration.
- GO effects remain puzzle-scoped. Daily and every Multiplayer surface have no consumable controls or use path.

### Existing economy paths

- Completion rewards retain the existing coin formula and deterministic `reward:<game-id>` idempotency key.
- Pay-to-Continue, reveal-answer, and past-Daily unlock spending retain existing prices and now use deterministic operation IDs.
- Signed-in commands are prepared to wait for authoritative RPC results; pre-migration Playwright keeps the unavailable Phase 57 RPC capability disabled until the exact remote continuation.

### Verification

- Focused Phase 57 domain, repository, schema, migration, route, keyboard, resume, cloud, OG/GO, Daily-boundary, and Marketplace tests pass.
- Full unit suite passes at 141 files and 993 tests.
- Build and lint pass; the existing large-chunk advisory remains informational.
- New real guest Playwright coverage passes for purchase, OG/GO use, persistence, physical/on-screen keyboard effects, and Daily/Multiplayer scope exclusion.
- The first full Playwright run passed 69/70 with the established transient Supabase participant-identity `403`; its exact focused retry passed, and the required final full rerun passed 70/70.

The Phase 57 migration remains local and unapplied. Signed-in authority/catalog/concurrency probes and disposable-account E2E remain required before Review Candidate backup.

## Recovered Review Candidate gate - 2026-07-11

- Applied the exact reviewed migration once to the verified active `brrrdle-dev` project. The migration tool recorded generated version `20260711064651`; after exact schema-equivalence proof, the ledger-only version was transactionally reconciled to source-controlled version `20260711051818` without rerunning migration SQL or changing the application catalog.
- Proved complete 38/38 local/remote migration-history equality. The Phase 57 application fingerprint remained `8d7c4d8526c73820d2b77eef6845ba01` across reconciliation.
- Verified two RLS-enabled owner-private economy tables, expected constraints/indexes/policies, seven empty-search-path security-definer functions, no anonymous RPC access, no direct browser table access, internal-helper revocation, and five authenticated public RPCs.
- Added real disposable-account authority coverage for progress-snapshot bootstrap, fixed 25/40 prices, range and underflow rejection, duplicate replay, concurrent duplicate/distinct serialization, cross-user isolation, and strict response fields.
- Added signed-in 390px browser coverage for Marketplace purchases, fresh-browser inventory hydration, durable Solo Practice OG/GO effects, and Daily/Multiplayer control exclusion.
- Proved cleanup removed temporary Auth users and left zero economy, progress, Solo-history, multiplayer, or browser-artifact residue.
- Focused verification passed 74 tests. The full unit suite remained 141 files and 993 tests; lint, build, and API typecheck passed.
- The first authority-enabled full browser run passed 71/72 with the established transient participant-identity `403`; the exact failed GO scenario passed on retry, and the required final authority-enabled rerun passed 72/72.

Phase 57 is now a Review Candidate. It remains open for hosted/manual review and requires a separately authorized Review Candidate GitHub Backup before that review window.

## Hosted manual-review refinement planned - 2026-07-11

The hosted Marketplace, account authority, persistence, mobile fit, and Daily/Multiplayer exclusion checks passed. Manual review clarified two intended Solo Practice tool behaviors before final acceptance:

- Reveal One Letter must select an unresolved position, render the answer letter as a locked green active-row tile, update keyboard evidence, and complete OG or advance GO through the canonical path when the final unresolved position is revealed.
- Remove Incorrect Letters must remove a pseudo-random batch of at most five eligible wrong keys per successful use, support repeated uses, remove all only when five or fewer eligible keys remain, and avoid spending when no eligible key remains.

This is a bounded source/test follow-up. It does not change Marketplace pricing, economy RPCs, the applied migration, reward/XP/Elo formulas, Daily/Multiplayer availability, or the functional-shell design.

## Consumable behavior refinement Review Candidate - 2026-07-11

- Reveal now selects a retry-stable unresolved answer position, displays it as a locked green tile in the active row, preserves it during typing/deletion, merges it into submissions, and marks the corresponding keyboard letter correct.
- A Reveal that resolves the final position creates one canonical all-green row. OG follows normal completion; GO follows the existing solved-row hold, next-puzzle transition, and final-chain results.
- Remove now chooses a retry-stable batch of at most five eligible answer-absent letters. Submitted absent evidence, prior removals, answer letters, and letters in the unsent draft are excluded.
- Remove may be used repeatedly until no eligible letters remain; a no-candidate use does not consume inventory or mutate the puzzle.
- Existing private puzzle-scoped persistence fields remain unchanged. No migration, RPC, schema, price, reward, XP, Elo, Daily, Multiplayer, or shell-design contract changed.
- Verification passed 16 focused domain/component tests, 4 guest browser scenarios, 2 authenticated authority/browser scenarios, lint, build, API typecheck, all 998 unit tests, and all 74 authority-enabled E2E scenarios. Temporary authenticated E2E users/data were cleaned by the existing fixture.

Phase 57 remains open for a separately authorized Review Candidate backup and hosted/manual review.

## Final acceptance - 2026-07-11

The user completed the hosted manual-review checklist after refined Review Candidate PR #64 and reported that every item passes with no known bug or regression. Phase 57 is accepted and closed. The retained final evidence is 998 unit tests, lint, build, API typecheck, 16 focused domain/component tests, four guest browser scenarios, two disposable-account authority/browser scenarios with cleanup, a clean 74/74 authority-enabled Playwright run, exact 38/38 migration-history equality, unchanged catalog fingerprints, and the previously verified authority/privacy/concurrency probes.

The next protected sequence is a Phase 57 Final Acceptance documentation backup followed by a Golden Checkpoint for that exact accepted commit. A separate planning-only optimization audit may then refresh the functionality-preservation inventory and evaluate whether the accepted shell can become lighter without changing any product, gameplay, backend, persistence, privacy, economy, rating, or Supabase contract.
