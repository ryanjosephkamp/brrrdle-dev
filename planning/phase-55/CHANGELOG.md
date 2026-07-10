# Phase 55 Changelog

## Local implementation gate - 2026-07-10

Prepared, but did not remotely activate, the Phase 55 ranked Daily and private-request-routing implementation.

### Ranked Daily

- Added separate ranked Daily OG/GO rating and storage buckets.
- Added current-UTC-day, fixed-five, no-clock, Hard-Mode-compatible queue contracts.
- Preserved strict FIFO and repeat-opponent matching.
- Added independent ranked/unranked Daily claim lanes for OG and GO.
- Preserved all existing unranked Daily answer outputs while adding deterministic, guaranteed-distinct ranked answers for OG and every GO puzzle.
- Added trusted ranked Daily finalization, settlement, and public leaderboard source contracts without changing Elo math, K factors, scoring, rewards, or progression.
- Added lightweight shell controls and distinct ranked/unranked game labels.

### Server-authority recovery

- Replaced full participant-projection saves with one narrow, idempotent guess/owned-forfeit action RPC.
- Added the dedicated unexposed `brrrdle_private` schema with an ordered source-controlled answer/valid-guess catalog, immutable pair reservations, canonical game authority, and an append-only action ledger.
- Made the server select ranked Daily answers, compute tiles, enforce dictionary/turn/GO-attempt/Hard-Mode rules, derive terminal state and winner, and supply all settlement evidence.
- Made ranked Daily public game projections answerless and added deterministic client hydration from canonical date/mode settings.
- Denied direct ranked Daily game inserts/updates, restricted queue reads to each owner, generated Daily pair ids on the server, and aligned Daily lane/row lock ordering.
- Added optimistic authority-version/move-count checks and idempotent action retries while preserving ranked Practice delegation, unranked Daily behavior, private Practice, Solo, spectator/privacy, functional-shell behavior, and the existing Elo formulas.

### Private Practice routing

- Retained the requester-owned request result on the public profile page.
- Added participant-scoped restrained polling with stale-response and terminal-state guards.
- Added pending, created, declined, cancelled, and expired status display.
- Added direct `Go to Practice Multiplayer` and `Enter private match` actions without creating a request center, blocking, opt-out settings, push notifications, or new notification storage.

### Migration gate

- Created `supabase/migrations/20260710061039_phase55_ranked_daily_multiplayer.sql` with rollback notes and authority/catalog/security/concurrency remote probes.
- The exact source SQL was applied to the verified `brrrdle-dev` project, but the Supabase migration tool recorded it under generated remote version `20260710170918` instead of source-controlled version `20260710061039`.
- Execution stopped immediately at that ledger mismatch before authority/security/concurrency probes, temporary-account E2E, cleanup work, or full regression. A bounded read-only impact check confirmed the private schema, ranked claim column, and expected catalog counts now exist.
- Phase 55 is not a Review Candidate. The next protected action is a ledger-only reconciliation after renewed exact-equivalence proof, followed by resumption at the post-apply probe gate without re-running migration SQL.

### Post-reconciliation contract gate

- Proved that generated remote migration version `20260710170918` stored the exact statement from source-controlled migration `20260710061039_phase55_ranked_daily_multiplayer.sql`, then transactionally changed only that ledger version to `20260710061039`.
- Proved that local and remote migration histories are now exactly equal and that the application functions, constraints, indexes, triggers, policies, ACLs, claim schema, private catalogs, and row counts remained byte-for-byte unchanged by the ledger-only operation.
- Passed the focused eight-file, 100-test contract gate, `git diff --check`, Supabase security/performance advisors, deterministic answer-sequence probes, function/grant checks, private-schema denial checks, queue visibility checks, claim-shape checks, and public leaderboard shape checks.
- Stopped before temporary-account E2E after post-apply review found contract conflicts that require source changes and one new additive corrective migration:
  - the client supplies a five-minute expiry for ranked Daily queue requests while the deployed Daily RPC permits only `NULL` or the next UTC midnight;
  - the deployed GO authority limits the fifth puzzle to two attempts per participant and may terminate it unsolved, conflicting with the protected final-puzzle behavior that continues until solved;
  - cancelled or expired deterministic queue requests are reactivated with the same request id even though pair-reservation request ids are permanently unique, preventing a safe repeat match after cancellation;
  - ranked Daily finalization removes a denylist of projection keys from a caller-supplied object instead of constructing a strict allowlisted public projection;
  - the existing real-E2E cleanup path does not account for the new private action/authority/reservation dependency order.
- No temporary user or ranked Daily test row was created after these findings. No migration SQL was re-run, and no corrective remote migration, Git/GitHub action, deployment, release, phase closure, or later-phase work was performed.
- Phase 55 remains blocked before Review Candidate status. The next protected action is a test-first local contract repair with a new additive migration artifact, followed by a separately authorized exact-migration application and real temporary-account E2E.

## Recovered Review Candidate - 2026-07-10

Phase 55 is no longer blocked. The immutable base migration remains unchanged, and four narrowly additive source-controlled repairs now align the deployed contract with protected runtime behavior:

- canonical next-UTC-midnight ranked Daily queue expiry while ranked Practice keeps its five-minute queue window;
- fresh request ids after terminal Daily queue attempts, strict FIFO selection, deterministic locking, repeat-opponent support, and owner-scoped status visibility;
- server-owned finalization evidence from locked pair reservations and explicit allowlist construction for answerless public projections;
- ranked Daily GO puzzle five continuing until solved;
- the required queue `matched_at` field plus dependency-safe, orphan-safe, service-role-only E2E cleanup.

The client now routes ranked Daily actions through the trusted action RPC, hydrates answerless projections from canonical Daily settings, exposes separate ranked Daily OG/GO public metadata, preserves unranked Daily GO configuration, and retains narrow private-request status/direct routing. A scope-hydration race found by the full E2E gate was repaired so a freshly loaded participant-owned multiplayer snapshot cannot be replaced by a stale account-progress cache during guest-to-account hydration. The Live spectator E2E assertion was updated from the obsolete Practice-only public metadata label to the current Practice-and-Daily label.

Remote verification proved exact 36/36 local/remote migration-ledger equality, unchanged ranked Daily catalog counts of 2,175 answers and 9,776 valid guesses, six security-definer authority functions with empty search paths, no anonymous execute grant, and authenticated execute only for the five intended participant RPCs. Supabase advisors report five expected warnings for those guarded authenticated security-definer RPCs and no Phase 55 performance finding. All temporary Auth users, queues, public ranked Daily games, claims, pair reservations, authority rows, and action rows were removed.

Final verification passed 134 Vitest files and 963 tests, 67 Playwright E2E tests, lint, production build, API typecheck, migration-contract checks, mobile shell/scroll/accessibility checks, refresh-to-Home checks, real ranked Daily OG/GO settlement and concurrency checks, private Practice reload persistence, ranked Practice, unranked Daily, spectator/privacy, and Solo persistence regressions. The only build note is the existing large-chunk advisory.

Phase 55 is ready for a governed Review Candidate GitHub Backup and hosted manual review. Phase 55 remains open; final acceptance/closure, deployment configuration changes, release, Phase 56 work, and stable `brrrdle` work remain unexecuted.
