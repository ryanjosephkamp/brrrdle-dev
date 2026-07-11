# Post-Phase-57 Daily Persistence, Multiplayer Refresh, And Spectator Termination Follow-Up Plan

**Status:** Local source/test implementation complete; exact remote migration continuation remains separately gated.
**Current Review Candidate:** `52d0e56b0dcfed19bcb5e4f6f7fa8a6dacfccc20` from PR #66.
**Protected baseline:** `7df20365d9f0dc29bd609a22118403fce6662abd`, tag/Release `phase-57-golden-2026-07-11`.
**Goal:** Repair the three user-observed review issues without undoing the accepted deeper-shell loading improvements or changing gameplay, economy, rating, queue, privacy, or refresh-to-Home rules.

## User-Observed Review Result

The optimized shell is broadly accepted, but final acceptance remains open because:

1. Signed-in Daily Solo OG and GO in-progress guesses can disappear after focus/refocus or manual refresh. Navigating away and back can briefly show the correct rows before they disappear.
2. A participant's ranked Daily Multiplayer game can be absent from Daily, Active, and Live immediately after refresh and re-entry, then appear 30-60 seconds later.
3. Spectators see terminal winner/loss state but cannot distinguish a pre-turn cancellation from a post-turn forfeit.

Browser Back/Forward works in the reported Solo and Multiplayer cases. Manual refresh must continue to return Home.

## Current Implementation Review

### Daily Solo

- `OgGame` and `GoGame` emit local resume captures and schedule a cloud mutation after each valid submitted guess.
- `App` updates its account-scoped progress state immediately, then calls `soloCloudProgressRepository.saveMutation`.
- The current promise tracking starts each save before chaining it. Multiple read-modify-upsert mutations can therefore overlap and later stale writes can replace a newer serialized session.
- Account refreshes run on authentication, focus, visibility, and route changes. Their guard covers the general progress snapshot upload, but not pending Solo cloud mutations.
- `mergeSoloCloudSessionsIntoProgress` primarily compares `updatedAt`. A later-timestamped but less advanced cloud projection can replace a locally newer in-progress board.
- Authenticated progress intentionally does not fall back to guest local storage. Manual refresh therefore depends on authoritative account hydration.

**Primary hypotheses:** overlapping Solo writes, hydration while those writes are pending, and timestamp-only merge precedence can independently or jointly roll an in-progress Daily board backward. Lazy route unmount/re-entry reveals the stale state but is not itself the authority defect.

### Daily Multiplayer

- The authenticated Supabase repository begins with an empty local snapshot and publishes it immediately to subscribers before its first authoritative load completes.
- `refresh()` performs a broad visible-games query. A read failure returns the current snapshot, often empty, without exposing the failure or scheduling an immediate retry.
- App initialization, auth events, route entry, focus, visibility, and realtime events can overlap. Existing stale-generation guards prevent some cross-account writes, but an empty authenticated bootstrap can still be rendered as authoritative.
- Participant game projections already carry participant IDs. The reported later appearance is therefore more consistent with bootstrap/read timing than missing durable game data.

**Primary hypotheses:** an empty bootstrap publication, a swallowed first-read failure or auth-session race, or the broad visible-games query delaying participant-owned rows. Reproduction must distinguish these before source changes.

### Spectator Termination

- Domain forfeiture already distinguishes pre-guess cancellation from post-guess forfeit: cancellation has no winner; post-guess forfeit records a winner and `forfeitedPlayerId`.
- Authenticated and public spectator RPC projections omit cancelled games and expose terminal outcome without a termination reason or forfeited seat.
- Client parsers and view models can therefore display only generic winner/loss text.

**Confirmed contract gap:** a privacy-safe termination reason must be projected by the spectator RPCs. The client cannot reliably infer it from the current public payload.

## Architecture Decision

Use targeted concurrency and readiness hardening plus one additive spectator-projection migration.

Do not introduce account-local shadow persistence unless reproduction proves the authoritative queue and merge repair cannot satisfy immediate reload. A shadow store would complicate guest/account isolation and conflict resolution. Do not replace the repository with polling or a new data architecture; first repair bootstrap semantics, error visibility, and participant-first readiness.

## Stage 0 - Reproduce And Characterize

Add failing tests before source changes:

- signed-in Daily Solo OG and GO with multiple incorrect valid guesses across focus/refocus, route re-entry, and manual reload-to-Home followed by explicit re-entry;
- overlapping Solo mutation calls resolved out of order;
- hydration arriving while a Solo write is pending;
- local/cloud merge cases where timestamps and canonical submitted progress disagree;
- ranked Daily OG and GO participant reload-to-Home, then immediate discovery in Daily, Active, and Live within a bounded five-second budget;
- repository bootstrap success, empty success, read failure, auth-generation change, and delayed broad-query cases;
- authenticated and public spectator projection/parser cases for cancellation, forfeit, ordinary completion, and expiration.

Use temporary accounts and non-secret guesses. Never print credentials, raw answers, user IDs, private projections, or auth state. Clean all temporary users and rows.

## Stage 1 - Serialize Solo Cloud Authority

1. Add a small tested per-user Solo write queue that invokes each repository mutation only after the prior mutation settles.
2. Track pending write count/generation and authenticated user ownership. Ignore stale completion callbacks after auth-generation changes.
3. Include pending Solo writes in authenticated refresh eligibility. A focus, visibility, or route refresh must wait for the relevant queue to drain or be superseded safely.
4. Add a canonical progression comparator for a matching Solo slot:
   - terminal evidence outranks in-progress evidence;
   - more submitted guesses or a later GO puzzle outranks fewer;
   - equal canonical progress preserves the current local draft/deletion state;
   - initial hydration with no local slot accepts cloud state;
   - genuinely more advanced cloud state from another browser wins.
5. Preserve guest/account isolation, explicit transfer rules, completion/reward idempotency, Practice behavior, Daily determinism, and refresh-to-Home.

Likely surfaces: `src/app/App.tsx`, `src/account/soloCloudProgress.ts`, a narrowly scoped queue helper, and focused account/game tests.

## Stage 2 - Make Multiplayer Bootstrap Authoritative And Prompt

1. Use the Stage 0 evidence to identify the first failed or delayed boundary.
2. Do not publish an empty authenticated bootstrap snapshot as an authoritative loaded result before the first participant read settles.
3. Make first-read failure observable to the caller while preserving the last confirmed snapshot.
4. Add a bounded immediate retry after the authenticated repository becomes ready and on Multiplayer entry. Do not create an unbounded timer or raise background polling frequency.
5. If the broad visible-games query is proven to be the delay, split loading into:
   - participant-owned active games first, published immediately;
   - waiting/lobby and spectator supplements second.
6. Preserve realtime reconciliation, ranked Practice, unranked Daily, private requests, Live visibility/privacy, claim limits, answer separation, Elo, and cross-account generation guards.

Likely surfaces: `src/multiplayer/multiplayerRepository.ts`, `src/app/App.tsx`, repository tests, route/view-model tests, and ranked Daily real E2E.

## Stage 3 - Project Spectator Termination Safely

Create at most one additive source-controlled migration. It may replace only the existing authenticated and public Live spectator function bodies while retaining their signatures and grants.

- Include a cancelled game only when both participant seats exist; never expose abandoned one-player lobbies.
- Add safe outcome fields such as `terminationReason` with `cancelled`, `forfeit`, `completed`, or `expired`, plus an optional seat label for the forfeiting participant.
- Do not expose user IDs, emails, answers, private projections, or participant-only controls.
- Preserve the current Daily spectator privacy exclusion and terminal hold policy.
- Update strict parsers and view models to render clear labels, including “Match cancelled before the first turn.” and a public-name-based forfeit summary.

The implementation pass must not apply the migration remotely. It must verify the local SQL contract and prepare a separate exact-migration continuation prompt for remote application, catalog/privacy probes, temporary-account real E2E, and cleanup.

## Stage 4 - Verification

Run sequentially:

1. focused queue, merge, hydration, repository-bootstrap, spectator parser/view-model, and migration-contract tests;
2. focused Daily Solo OG/GO browser scenarios;
3. focused ranked Daily OG/GO two-participant browser scenarios;
4. spectator cancellation/forfeit component and current-remote compatibility checks;
5. `npm run lint`;
6. `npm run test`;
7. `npm run build`;
8. `npx tsc -p tsconfig.api.json --noEmit`;
9. complete authority-enabled `npm run test:e2e` with one worker, using the established exact-retry then fresh-full-rerun shield for known transient failures;
10. migration history, catalog non-drift, temporary residue, secret/artifact, process, port, CSV, and diff checks.

After separately authorized remote migration application, rerun real authenticated/public spectator E2E and the complete gate before preparing a Review Candidate.

## Acceptance Criteria

- Daily Solo OG and GO retain every valid submitted guess across focus/refocus, route re-entry, and refresh-to-Home followed by re-entry.
- A more advanced cross-browser cloud state still hydrates correctly without a local rollback.
- A ranked Daily participant game is visible promptly after refresh and explicit Multiplayer re-entry in Daily, Active, and Live.
- Spectators clearly distinguish pre-turn cancellation, post-turn forfeit, ordinary completion, and expiration without receiving private data.
- The accepted 35.6% main-gzip reduction, zero Home word requests, route loading boundaries, mobile shell, and every Phase 57 gameplay/economy contract remain intact.

## Hard Stops

Stop if the work requires:

- more than one additive migration or a broader spectator/social architecture;
- editing or rerunning an applied migration;
- a new dependency, framework change, deployment/configuration change, or remote migration application;
- gameplay, answer selection, reward, consumable, Elo, queue eligibility, claim, private-request, or refresh-to-Home rule changes;
- an account-local persistence redesign rather than the bounded queue/merge repair;
- weakening privacy, authority, cleanup, accessibility, or complete E2E coverage;
- Git/GitHub actions, Phase 58 design work, or stable `brrrdle` access.

At a hard stop, preserve the current Review Candidate and Golden Checkpoint, report exact non-secret evidence, and prepare the smallest decision or recovery prompt.

## Local Implementation Evidence

- Same-account Solo cloud mutations now invoke serially through a per-owner queue; focus/route hydration is blocked while that owner's mutation is pending.
- Same-slot Solo hydration compares canonical puzzle/guess/continuation/consumable progress before timestamps, preserving local drafts on ties while accepting genuinely more advanced cloud state.
- Authenticated Multiplayer subscriptions no longer publish an unverified empty bootstrap; read failures are observable and App initialization/Multiplayer entry perform one bounded immediate retry.
- Spectator parsers and view models accept privacy-safe cancellation/forfeit metadata while remaining backward compatible with the currently deployed legacy payload.
- Sole pending migration: `20260711212934_post_phase57_spectator_termination_transparency.sql`, SHA-256 `d079f996ea2ccfa588332a8db19d7a637ac0be30713b45f951d3b222cf1c98c8`.
- Verification passed: 97 focused tests; 220 account tests; lint; 144 files and 1,016 unit tests; build; app/API typechecks; focused disposable-account browser regressions; and a fresh 78/78 authority-enabled E2E run with one worker.
- The exact migration SQL applied once with the reviewed checksum, but Supabase recorded generated remote version `20260711215831` instead of source-controlled version `20260711212934` under the same migration name. The application changed only the two intended spectator function definitions; signatures, return shapes, search paths, security attributes, grants, and all unrelated catalog fingerprints remained unchanged. Temporary E2E users are zero.
- Post-apply real E2E and full regression are paused at the required ledger-only reconciliation gate. The migration SQL must not be rerun.

## Final Post-Apply Evidence

- Reconciled only generated remote ledger version `20260711215831` to source-controlled version `20260711212934` in one transaction after proving exact schema equivalence. The migration SQL was not rerun.
- Complete local and remote histories now match at 39 migrations. Both spectator function hashes and every unrelated function/table/index/policy/trigger fingerprint remained unchanged across ledger repair and final verification.
- Authenticated execution remains authenticated-only; public execution remains anon/authenticated only. Non-printing probes found zero current-Daily authenticated rows, zero non-Practice public rows, zero invalid capabilities, and zero forbidden player/move/outcome keys.
- Real authenticated and public browser E2E verified `Match cancelled before the first turn`, public-name-based forfeit/winner copy, read-only cards, and absent mutation/private-email content.
- Focused recovery scenarios passed for signed-in Daily Solo OG/GO focus/route/reload persistence and ranked Daily Daily/Active/Live discovery within five seconds.
- Final gates passed: 86 focused spectator tests; lint; 144 unit files / 1,016 tests; build; app/API typechecks; and fresh complete authority-enabled Playwright 79/79 with one worker in 10.6 minutes.
- Temporary E2E users and public profiles are zero; generated ledger rows are zero; source-controlled ledger rows are exactly one. Browser artifacts and owned processes are removed during final hygiene.
