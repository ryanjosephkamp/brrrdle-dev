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
