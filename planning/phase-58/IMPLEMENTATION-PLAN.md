# Phase 58 GO Solution Diversity And Multiplayer Refresh Readiness Implementation Plan

**Status:** Review Candidate prepared; hosted/manual review and governed GitHub backup remain.
**Date:** 2026-07-12.
**Baseline:** Clean `main`/`origin/main` at Golden Checkpoint `post-phase-57-optimized-shell-golden-2026-07-12` (`046c681dd99e66b21b9fdbeca97b60b2e0ada99c`).

## 1. Goal And Acceptance Contract

Phase 58 must deliver both outcomes without redesigning or broadly refactoring the application:

1. Newly created GO chains use deterministic, unique, non-contiguous answer selection from the correct pool. A chain is reproducible from the same game identity, but its later answers are not selected because they are lexically adjacent to earlier answers. Consecutive Solo Practice chains must no longer be shifted copies of one another.
2. After an authenticated participant hard-refreshes the actual Multiplayer page and lands on Home, the exact durable game must become visible within one shared `<= 5,000 ms` deadline on every surface where it belongs. This applies to ranked/unranked Practice and Daily, private Practice, OG, and GO.

Games must not be lost, answers must not leak, server authority must not weaken, and unrelated Solo, account, economy, rating, spectator, notification, or shell behavior must remain intact.

## 2. Current Implementation Audit

### 2.1 GO Answer Selection

#### Shared Solo and Practice path

- `src/game/go/session.ts` selects answer `offset` as `(seedIndex + offset) % answers.length`.
- `createDailyGoSetup` and `createPracticeGoSetup` both use that contiguous selector.
- Difficulty filtering in `src/data/difficulty/subset.ts` retains source ordering, so filtered pools remain lexically clustered.
- `src/account/practiceSeeds.ts` advances each Practice counter by exactly one. Consecutive same-configuration chains therefore shift the contiguous answer window by one.
- `src/app/games/GoGame.tsx` persists complete serialized sessions, including every selected answer, guesses, draft, prior answers, and prefill metadata.

#### Multiplayer path

- `src/multiplayer/multiplayer.ts` routes Practice Multiplayer GO, including ranked, unranked, private, and rematch projections, through the same Practice setup.
- `src/multiplayer/dailyMultiplayer.ts` contains another contiguous `answerSequence` implementation for Daily Multiplayer.
- Ranked and unranked Daily currently avoid equal answers at corresponding positions, but do not guarantee whole-chain set separation.
- `supabase/migrations/20260710061039_phase55_ranked_daily_multiplayer.sql` independently implements the ranked Daily contiguous selector and position-only collision rule. The server-private answer array is authoritative while the public projection remains answerless.

#### Why the reported behavior is expected

- Adjacent five-letter answer rows share the first letter about 98.8 percent of the time and the first two letters about 90.0 percent of the time.
- Consecutive Practice chains overlap by exactly `K - 1` answers for a chain of size `K`: 4/5, 6/7, or 9/10.
- Later GO solutions are selected up front; prior answers are only evaluated as prefilled guesses. The carry-over mechanic is not the cause and must not change.

### 2.2 Multiplayer Reload Readiness

#### Critical read path

- `createSupabaseMultiplayerRepository` in `src/multiplayer/multiplayerRepository.ts` loads every RLS-visible `async_multiplayer_games` row, orders the full result by `updated_at`, normalizes it, merges it, then publishes one snapshot.
- RLS exposes participant-owned rows and global waiting rows. Established accounts and active public lobbies therefore have a larger critical read than fresh E2E accounts.
- Existing participant indexes cover `player_one_user_id` and `player_two_user_id`, but the current query does not supply those predicates. A global `updated_at` sort is not the fastest path to the participant's active games.

#### Startup coordination

- Auth restoration, progress hydration, Solo cloud-history hydration, route loading, repository creation, and repository refresh can overlap.
- Same-account progress may display Multiplayer state provisionally, but automatic progress sync is debounced by 750 ms. A hard refresh immediately after match creation can occur before the new game reaches `progress_snapshots`.
- Multiple initial/route/realtime refresh triggers lack a single observable generation, in-flight deduplication contract, and publication deadline.

#### Checkpoint comparison

- The broad repository query predates the current shell and exists at the pre-Phase-55 and Phase 57 Golden Checkpoints.
- PR #66 introduced route and word-bank lazy loading, which can alter timing but did not create the broad query.
- PRs #67-#69 tightened empty-state authority and added provisional same-account recovery. They improved fresh-account automated evidence but did not bound the server participant query for established accounts.
- A direct revert is therefore not recommended. The older checkpoints provide timing and ownership comparisons, not a safe implementation to copy wholesale.

#### Why existing E2E can pass while hosted review fails

- Disposable accounts have little or no multiplayer history.
- Ranked recovery scenarios wait for a progress-snapshot upload before reload.
- Private reload coverage allows a much larger timeout and may use helper recovery.
- Prior tests used separate per-surface waits rather than one global five-second deadline.
- The suite does not stress global waiting-row volume or stale/absent provisional progress.

## 3. Technical Decisions

### 3.1 GO chain algorithm v2

Implement one shared pure selector, tentatively `src/game/go/chainSelector.ts`:

1. Canonicalize the eligible answer pool by normalized word.
2. Build a stable versioned stream key from `go-chain-v2`, game scope/lane, game seed or UTC date, word length, difficulty, puzzle count, and any existing ranked/unranked namespace.
3. Derive a stable pseudo-random rank for each candidate from the stream key and candidate word, then select the lowest-ranked `K` candidates with lexical tie-breaking only for impossible hash ties.
4. Select without replacement inside one chain.
5. Do not use prior-chain answers as inputs for a new Practice chain. The persisted Practice counter already gives each chain a new deterministic game seed.
6. Do not impose semantic or letter-distance rules. The requested behavior is deterministic random independence, not artificial dissimilarity.
7. For Daily ranked/unranked pairs, preserve anti-cheat separation by deriving distinct lanes and excluding the unranked selected set from ranked selection when pool capacity permits.

This hash-ranked design removes dependence on alphabetical adjacency and preserves deterministic reproducibility without mutable random state.

### 3.2 Versioning and rollout

- Add optional `answerGenerationVersion`, with absence interpreted as `v1`.
- Restore stored serialized answers exactly; never regenerate an in-progress legacy game.
- Include the version in new Solo resume/cloud identity where required to prevent v1/v2 collision.
- Activate Daily v2 on a future UTC cutoff encoded identically in TypeScript and SQL. Dates before the cutoff remain v1.
- Update ranked Daily server authority through one additive migration. Do not edit or rerun an applied migration.
- Preserve existing ranked Daily rows as v1. Do not rewrite active rows or live user data.
- If optional JSON fields and existing tables are sufficient, no broad relational migration is allowed.

### 3.3 Multiplayer critical-read architecture

Measure before selecting the repair. The preferred architecture, if measurements confirm it, is:

1. Split the critical participant lane from noncritical lobby/live discovery.
2. Query participant rows using explicit current-user predicates (`host_user_id`, `player_one_user_id`, `player_two_user_id`) and publish that authoritative snapshot first.
3. Load global waiting/lobby/live projections separately and merge them without delaying participant readiness.
4. Give repository loads one monotonic generation, in-flight deduplication, and stale-response rejection so older refreshes cannot overwrite newer authority.
5. Publish same-account provisional progress only as a bounded bridge; participant repository authority always supersedes it.
6. Avoid coupling participant readiness to Solo history hydration or a future progress-snapshot debounce.

If the participant-filtered read itself misses five seconds under established-account load, prepare the smallest additive index or participant-focused RPC/RLS contract in the same single local Phase 58 migration as the GO ranked-Daily contract. If that cannot be represented securely in one additive migration, stop and report the broader architecture instead of layering speculative retries or longer polling.

## 4. Implementation Stages

### Stage 58.0 - Protected baseline and characterization

- Reverify the Golden Checkpoint, clean branch, migration ledger, catalog fingerprint, test inventory, ports, and temporary-residue baseline.
- Preserve the user's accepted current behavior as the before-state.
- Add failing characterization tests for contiguous GO chains and same-tab reload latency before source fixes.
- Add non-secret timing hooks for auth-ready, progress-ready, participant-query start/end, repository publication, route entry, and first exact-game visibility. Record only duration, trigger, generation, category, count, and approximate payload size.

### Stage 58.1 - GO selector v2, test first

- Implement the shared pure selector and golden vectors.
- Route new Solo Practice, Solo Daily, Practice Multiplayer, Daily Multiplayer, private/rematch, ranked Practice, and ranked Daily creation through the shared versioned contract.
- Keep carry-over rows, valid-guess dictionaries, keyboard colors, Hard Mode, solved-row hold, turn rules, counts, lengths, and difficulty pools unchanged.
- Add one additive local migration for ranked Daily TypeScript/SQL parity and any separately proven participant-read index/RPC need.
- Stop before remote migration application.

### Stage 58.2 - Real reload reproduction and root-cause decision

- Begin with Practice Multiplayer because it has no Daily claim limit.
- Use actual matched participant pages, perform a same-tab reload, accept Home routing, enter Multiplayer once, and start one shared timer at reload.
- Do not use a second page, focus recovery, back/forward, helper reload, repeated navigation, polling extension, or progress-snapshot pre-wait to manufacture success.
- Exercise fresh and established-shape accounts with current, stale, and absent provisional progress.
- Measure the participant query separately from UI publication.
- Choose source-only coordination repair when the query is fast but publication is slow; choose the bounded backend contract only when the query itself is the measured bottleneck.

### Stage 58.3 - Smallest evidence-backed repair

- Implement participant-first reads, load deduplication/order protection, early authority publication, and cache ownership only as measured.
- Preserve global Lobby and Live behavior by merging their later discovery lane.
- Do not change scoring, Elo, queue matching, claims, settlement, private-request authority, spectator privacy, or game mutation contracts.
- Do not solve latency by increasing timeouts, weakening assertions, adding blind polling, publishing cross-account data, or depending on stale progress forever.

### Stage 58.4 - Protected remote gate

- Review the exact sole pending Phase 58 migration and its checksum.
- Create a separate ignored continuation prompt for exact migration application, catalog/authority/privacy probes, ledger reconciliation if the CLI assigns a generated version, and post-apply E2E.
- Do not apply the migration in the initial implementation pass.

### Stage 58.5 - Full verification and Review Candidate

- Run focused unit, contract, component, integration, and browser tests.
- Run all ten Multiplayer reload lanes: ranked/unranked Practice OG/GO, ranked/unranked Daily OG/GO, and private Practice OG/GO.
- Use one global `<= 5,000 ms` exact-game visibility deadline across Overview, mode tab, Active, and Live expectations; also require the authoritative participant read itself to complete within five seconds.
- Run real two-account GO chain parity for Practice ranked/unranked/private and Daily ranked/unranked.
- Run the complete authority-enabled E2E suite, lint, unit suite, build, app/API typechecks, migration equality, catalog fingerprints, secret/artifact scans, and cleanup.
- Generate a comprehensive Phase 58 manual review checklist and stop at Review Candidate. Do not perform Git/GitHub backup automatically.

## 5. Required Automated Coverage

### GO unit and property tests

- Same inputs produce the same sequence across thousands of fixed seeds/dates.
- Each chain contains exactly `K` unique answers from the requested pool.
- Output is invariant to original candidate ordering.
- Representative consecutive Practice seeds do not form shifted windows; average overlap remains near deterministic random-sampling expectation rather than `K - 1`.
- Counts 5/7/10, lengths 2-35, and all supported difficulty tiers remain valid.
- Puzzle `i` still receives exactly answers `0..i-1` as carry-over evidence.
- Legacy missing-version sessions round-trip and restore unchanged.
- Daily cutoff vectors are stable.
- Ranked/unranked Daily sets are separated when capacity permits.
- TypeScript and SQL ranked-Daily vectors match exactly.
- Public ranked rows remain answerless.

### Multiplayer reload tests

- Repository query tests prove participant predicates and participant-first publication.
- Concurrent load tests prove deduplication, monotonic generation, and stale-response rejection.
- Auth/progress tests prove no cross-account provisional display and permanent repository precedence.
- Same-tab browser tests use the actual matched page and one global deadline.
- Established-shape tests cover representative retained history and global waiting-row pressure without committing private fixtures.
- Each lane proves the exact game on Overview, its Daily/Practice tab, Active, and Live within the same deadline.

### Non-regression

- Solo OG/GO Practice/Daily resume and completion.
- GO keyboard, tile, carry-over, Hard Mode, transition, definition, and consumable behavior.
- Ranked Practice and Daily queue/claim/settlement/Elo.
- Unranked and private Practice first-turn persistence, forfeit/cancel, requests, Lobby, Live, and spectator privacy.
- Account sync, guest isolation, Marketplace/economy authority, notifications, public profiles, and optimized loading boundaries.

## 6. Manual Review Matrix

- Start two consecutive Solo Practice GO chains at representative lengths and verify diverse, non-shifted answer sets while all carry-over mechanics remain familiar.
- Reload a partially completed Solo Practice/Daily GO chain and verify its already-selected answers do not change.
- Play two-client Practice GO in ranked, unranked, and private lanes; verify both clients share the same chain and survive reload.
- Verify Daily Solo and Multiplayer chains are reproducible for the date; ranked/unranked Daily solutions remain separate.
- For each of the ten Multiplayer lanes, reload the actual participant tab, land on Home, enter Multiplayer once, and verify the game appears everywhere appropriate within five seconds.
- Repeat at least one Practice and one Daily lane with an established real review account, because disposable accounts alone are insufficient evidence.

## 7. Stop Conditions

Stop and report before proceeding if:

- stored legacy answers would need rewriting;
- the ranked Daily client/server selector cannot remain identical;
- raw answers or private projections would enter logs, screenshots, public rows, or test artifacts;
- secure refresh readiness requires more than one additive migration or a broad auth/session/repository rewrite;
- the intended Supabase project, sole pending migration, ledger, or catalog cannot be proven;
- any temporary account, row, artifact, or browser process cannot be cleaned up;
- the five-second requirement remains failing after the measured bounded repair;
- runtime work would enter Phase 59 design or Phase 60 rebuild scope;
- work would touch the stable `brrrdle` repository.

## 8. Protected Boundaries

No dependency/framework change, visual redesign, gameplay-mechanics change, scoring/Elo formula change, production deployment, Git/GitHub action, release, stable-repository edit, applied-migration rewrite, or remote migration application is authorized by the initial Phase 58 implementation prompt.

## 9. Handoff Sequence

1. User authorizes the ignored Phase 58 implementation prompt.
2. Agent completes test-first source work and prepares at most one additive local migration.
3. Agent stops at the exact remote-migration gate and creates a continuation package.
4. User separately authorizes exact application and post-apply real E2E.
5. Agent prepares Review Candidate, checklist, and governed backup package.
6. Hosted/manual review and follow-up complete before Phase 58 Final Acceptance.
7. Phase 59 design direction begins only after Phase 58 closure/checkpoint approval.

## 10. Local Implementation Outcome - 2026-07-12

The bounded implementation pass completed Stages 58.0 through 58.3 and the pre-application portion of Stage 58.4:

- Added a shared `go-chain-v2` hash-ranked selector with deterministic 32-bit avalanche mixing, input-order independence, selection without replacement, explicit exclusions, and a `2026-07-14` UTC Daily cutoff.
- New Practice chains use v2 immediately. Daily sessions before the cutoff remain v1, while new Daily sessions on or after the cutoff use v2. Legacy serialized sessions without a version restore as v1 and retain their stored answers exactly.
- Daily ranked and unranked GO use distinct streams. Ranked selection excludes the complete unranked set when capacity permits.
- Added the sole local migration `20260712175405_phase58_go_chain_selector_v2.sql`. It versions the private ranked-Daily answer authority, preserves all existing authority rows as v1, keeps public projections answerless, and reproduces the TypeScript selector contract in private SQL. It has not been applied remotely.
- Replaced the broad critical Multiplayer load with an explicit participant-filtered lane plus a separate waiting-game lane. Participant authority publishes first; concurrent refreshes use single-flight coordination, realtime bursts coalesce, and stale generations cannot replace newer state.
- Characterization showed that cold answerless ranked-Daily rows could be rejected before the optimized lazy five-letter bank was ready. The repository now conditionally prepares that bank only when such a row is present, then hydrates it without delaying unrelated routes.
- Added non-secret readiness events containing only timing, generation, trigger, category, and row-count metadata.

Verification completed before the remote gate:

- GO selector unit/property coverage, migration-contract coverage, repository concurrency/readiness coverage, and affected GO regression suites passed.
- Full local verification passed: lint, 146 unit files and 1,039 tests, app build, and API TypeScript checking.
- Real temporary-account Chromium E2E passed the four ranked same-tab reload scenarios locally and on the one authorized non-production preview: Practice OG, Practice GO, Daily OG, and Daily GO.
- Affected Practice and Daily GO browser suites passed after updating one stale assertion that had incorrectly depended on lexically adjacent answers.
- The complete authority-enabled Chromium regression suite passed 83/83 with one worker.
- The intended remote project remains `brrrdle-dev`; remote history remains the accepted 39 migrations, local history contains exactly one additional Phase 58 migration, catalog counts and digests are unchanged, spectator function digests are unchanged, and temporary E2E Auth residue is zero.

The next action is the separately authorized exact-migration continuation. It must apply only the sole pending Phase 58 migration, prove TypeScript/SQL parity and answer privacy, reconcile only a generated migration-ledger version if exact equivalence is proven, then run the complete post-apply authority and real-E2E matrix before Review Candidate preparation.

## 11. Post-Apply Blocker - 2026-07-12

The exact migration was applied once to the verified `brrrdle-dev` project. Supabase recorded generated version `20260712185454`; byte-for-byte statement equivalence and complete target-object equivalence were proven before a transactional ledger-only reconciliation to source version `20260712175405`. Local and remote histories then matched exactly at 40 migrations, and all protected fingerprints remained unchanged.

The first v2 parity probe deterministically failed inside `brrrdle_private.phase58_mix_u32(bigint)` with PostgreSQL error `22003: bigint out of range`. The second avalanche multiplication can exceed signed 64-bit range before `phase55_u32` reduces it modulo `2^32`. TypeScript `Math.imul` performs 32-bit modular multiplication, so the SQL implementation must reduce each multiplication in a non-overflowing numeric domain before converting back to bigint.

Impact is bounded and confirmed read-only:

- all eight existing ranked-Daily authority rows remain v1 with the exact pre-apply answer digest;
- there are no authority rows dated on or after the `2026-07-14` cutoff;
- pre-cutoff v1 dispatch remains callable and exact;
- public ranked-Daily projections remain answerless;
- temporary E2E Auth residue remains zero;
- catalogs, spectator functions, and unrelated protected schemas/functions remain unchanged.

Per the continuation prompt's stop condition, no corrective SQL, second migration, E2E, or Review Candidate preparation followed the failure. The smallest safe recovery is exactly one additive migration that replaces only `phase58_mix_u32(bigint)` with overflow-safe modulo-`2^32` multiplication while preserving its signature, volatility, empty search path, ownership, and browser-role revocations. That migration and its remote application require a new explicit user authorization.

## 12. Corrective Migration And Review Candidate Outcome - 2026-07-12

The separately authorized recovery completed without broadening the database contract:

- Generated `20260712190338_phase58_go_chain_selector_v2_bigint_overflow_repair.sql` with the Supabase CLI.
- Replaced only `brrrdle_private.phase58_mix_u32(bigint)`, moving both avalanche multiplications into exact `numeric` arithmetic before modulo-`2^32` reduction. The xor/shift sequence, constants, signature, invoker security, immutability, empty search path, ownership, and browser-role revocations remain unchanged.
- Applied the exact 846-byte migration once. Supabase recorded generated version `20260712190436`; byte-identical stored SQL and exact deployed-object equivalence were proven before reconciling only that ledger version to `20260712190338`. Local and remote histories now match exactly at 41/41.
- Scalar boundary vectors and three post-cutoff ranked/unranked Daily GO date vectors match TypeScript exactly. Every chain contains five unique answers, and each ranked/unranked pair is disjoint. Existing authority rows remain v1 and pre-cutoff dispatch still matches v1.
- The paired post-cutoff server parity probe completed in approximately 17.7 seconds. This is recorded for hosted/post-cutoff observation; it did not fail any queue, authority, parity, privacy, or browser gate and is not hidden by a timeout increase.
- Expanded actual-participant same-tab reload coverage to all ten required lanes. Chromium passed 10/10 under one shared five-second deadline. Representative Firefox and WebKit Practice/Daily/private OG/GO coverage passed 8/8 per browser.
- Final verification passed 89 focused tests, lint, 147 unit files and 1,041 tests, production build, app/API typechecks, affected GO/private E2E, and a fresh complete authority-enabled Chromium rerun of 89/89. The first full run encountered two known transient participant-identity `403` responses; both exact retries passed, then the complete rerun passed.
- Final remote probes show exact 41/41 history, zero temporary Auth/profile/projection residue, zero ranked-Daily public answer leaks, zero mixer browser grants, unchanged authenticated/public spectator digests, and no Phase 58 security or performance advisor finding.

Phase 58 remains open for hosted/manual review. Git/GitHub backup, phase closure, checkpointing, deployment promotion, Phase 59, and Phase 60 remain separately gated.
