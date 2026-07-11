# Phase 57 Solo Practice Marketplace And Consumables Implementation Plan

> **For agentic workers:** Use `superpowers:executing-plans`, `superpowers:test-driven-development`, the Supabase skill, and the existing brrrdle E2E fixtures. Keep source and migration work test-first. The initial implementation stops before remote migration application.

**Goal:** Add a lightweight coin marketplace and durable consumable inventory, with consumables usable only in Solo Practice OG/GO and never in Daily or Multiplayer.

**Architecture:** Replace scattered scalar coin mutation with one economy command boundary. Guests continue using normalized local progress; signed-in players use one additive private economy ledger and narrow idempotent RPCs so purchases, inventory use, rewards, Pay-to-Continue, reveals, and past-Daily unlocks cannot race or resurrect spent balances across browsers. Persist Solo-Practice hint effects in private resume/Solo-cloud state, not public history, profile, leaderboard, spectator, or multiplayer projections.

**Tech stack:** React 19, TypeScript, Vitest, Playwright, Vite, existing Supabase client/RPC patterns, PostgreSQL/RLS. No new dependency or framework migration.

## Global Constraints

- Work only in `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`; never touch stable `brrrdle`.
- Retain the existing prices: Reveal One Letter costs 25 coins; Remove Incorrect Letters costs 40 coins.
- Consumables may be purchased from the marketplace but used only in Solo Practice OG/GO.
- Daily Solo, past Daily, ranked/unranked/private Multiplayer, Live/Lobby, and spectator surfaces must never expose or honor consumable-use controls or effects.
- Preserve every existing coin award formula, XP formula, level calculation, Pay-to-Continue price, reveal-answer price, past-Daily unlock price, reward idempotency rule, Hard Mode rule, and Elo/scoring rule.
- Do not add reward drops, probability systems, Hard Mode multipliers, additional hint types, real-money purchases, Stripe, subscriptions, gifting, trading, refunds, social inventory, or a design-system overhaul.
- Do not reveal answers or private hint state through public profiles, history summaries, notifications, logs, URLs, multiplayer projections, or browser-readable public tables.
- Keep the functional shell lightweight and usable at 320/390px with no horizontal overflow.
- Prepare at most one additive Phase 57 migration. Stop if a secure cohesive contract needs multiple migrations or broader economy architecture.

## Current Implementation Audit

### Economy and persistence

1. `src/account/storageSchema.ts` already defines `GuestProgressionState.coins` and inventory counters for `revealOneLetter` and `removeIncorrectLetters`; both counters default to zero. Schema version 10 normalizes settings but does not normalize untrusted inventory values independently.
2. `src/account/guestStorage.ts` awards coins through `recordCompletedGame`, guarded by `completedGameIds`. `src/progression/coins.ts` owns the existing reward formula.
3. `src/app/App.tsx::handleSpendCoins` mutates the scalar balance directly. Solo Pay-to-Continue/reveal and Calendar past-Daily unlocks share this callback, but it is synchronous and has no operation id.
4. `src/account/guestTransfer.ts` merges coins and inventory with `Math.max`. That was acceptable for monotonic rewards, but it would resurrect spent coins or consumed inventory across cross-browser merges. Phase 57 must not build purchases on this rule.
5. `src/account/sync.ts` stores the aggregate progress payload in owner-private `progress_snapshots`. Signed-in sync is read/merge/upsert rather than transactional economy authority.
6. `src/account/soloCloudProgress.ts` already saves idempotent private Solo events for valid guesses, Pay-to-Continue, and reveal actions in `game_history`. It does not yet recognize consumable use or private hint effects.

### Existing consumable helpers and gameplay

1. `src/progression/consumables.ts` defines the two accepted types and prices. `revealOneLetter` deterministically chooses the lowest unrevealed answer position; `removeIncorrectLetters` deterministically returns keyboard letters absent from the answer.
2. Neither helper is mounted in gameplay. Inventory is displayed only indirectly in stored state and has no marketplace.
3. `OgGame.tsx` and `GoGame.tsx` already distinguish `scope === 'practice'`, persist resume captures, and emit private Solo cloud events. These are the correct gates for consumable-use controls.
4. Hint effects need durable private state. They must survive route re-entry, refresh, sign-out/sign-in, and same-account cross-browser hydration without changing canonical answer selection, guesses, tile evaluation, Hard Mode evidence, or completion rewards.

### Route and shell

1. `src/app/routes.ts` has no marketplace route. The shell already supports compact primary/support destinations and Home-on-refresh.
2. Phase 57 should add one compact `Marketplace` support destination, route tests, and a Home/Progression-HUD entry only when it reuses existing shell patterns without adding decorative weight.
3. The marketplace should show current coins, owned counts, fixed prices, plain descriptions, and purchase buttons with stable pending/success/error states.

## Accepted Product Contract

### Marketplace

- Sell exactly two inventory items: Reveal One Letter for 25 coins and Remove Incorrect Letters for 40 coins.
- Purchases add inventory; they do not immediately affect a game.
- Reject insufficient balance, malformed type, duplicate operation id, and non-positive quantity. First version purchases one item per action.
- A retry with the same action id returns the original result without spending or granting twice.

### Solo-Practice effects

- Reveal One Letter consumes one item and permanently reveals the lowest-index answer position not already revealed for the active puzzle. It displays a private position/letter hint and does not auto-submit, mutate prior guesses, award progress, or bypass word validation. It may be used repeatedly until every position is revealed; a fully revealed puzzle must not consume inventory.
- Remove Incorrect Letters consumes one item at most once per puzzle and disables every answer-absent letter on both on-screen and physical-keyboard paths. Attempts to enter a removed letter are ignored with an accessible status message. It never disables a correct answer letter.
- GO effects are puzzle-scoped; moving to the next puzzle starts with no effect unless the player consumes another item. Starting a new Practice puzzle/chain never carries old hint effects forward.
- Effects remain through refresh/re-entry and signed-in hydration for that exact Practice session/puzzle.

### Economy authority

- Add one owner-private economy account row and one append-only idempotency/transaction ledger for signed-in users.
- Bootstrap once from the authenticated user's existing private progress snapshot; do not accept a caller-supplied opening balance when the server can read the owner row directly.
- Expose narrow authenticated RPCs for economy load, coin credit/spend, marketplace purchase, and consumable use. All use `auth.uid()`, empty search paths, strict enums/ranges, explicit grants, and no direct browser table writes.
- Route completion rewards, Pay-to-Continue, reveal-answer spending, past-Daily unlocks, marketplace purchases, and consumable use through the shared command interface. Preserve their current formulas and deterministic operation ids.
- Guest commands use the same pure validation/reducer locally. Signed-in commands wait for the authoritative RPC result before applying the returned balance/inventory to progress cache.
- `progress_snapshots` retains compatibility/display cache, but max-merge must not override an authoritative economy snapshot. Economy merge/hydration chooses the server result for signed-in users and the normalized local result for guests.

## File And Interface Map

### Create

- `src/progression/economy.ts`: catalog, command/result types, normalization, guest reducer, effect selectors, deterministic operation-id builders.
- `src/progression/economy.test.ts`: catalog, affordability, duplicate, underflow, scope, puzzle, and effect tests.
- `src/account/economyRepository.ts`: strict RPC parser and guest/signed-in repository interface.
- `src/account/economyRepository.test.ts`: payload allowlists, error normalization, idempotent responses, and forbidden-field rejection.
- `src/marketplace/MarketplacePanel.tsx` and `.test.tsx`: compact marketplace route.
- `e2e/gameplay/solo-practice-consumables.spec.ts`: guest and disposable-account purchase/use/persistence/browser-boundary coverage.
- One `supabase/migrations/*_phase57_solo_practice_marketplace_and_consumables.sql` plus a migration-contract test.

### Modify

- `src/account/storageSchema.ts`, `guestStorage.ts`, `guestTransfer.ts`, `sync.ts`, and tests: schema normalization and authoritative economy cache semantics.
- `src/account/resumeSlot.ts`, `soloCloudProgress.ts`, and tests: private Practice hint-effect persistence and `consumable_use` events.
- `src/app/App.tsx`, `routes.ts`, navigation tests, and Dashboard/Home action wiring: marketplace route and shared economy commands.
- `src/app/games/OgGame.tsx`, `GoGame.tsx`, and focused tests: Practice-only controls/effects and physical/on-screen keyboard enforcement.
- `src/calendar/CalendarPanel.tsx` and completion/reward tests: route existing coin mutations through the command boundary without changing prices/formulas.
- `planning/testing/TESTING-SUITE.md`, `docs/supabase.md`, Phase 57 changelog/checklist/progress: evidence and continuity.

## Ordered Test-First Tasks

### Task 1 - Freeze existing economy behavior

- [ ] Add characterization tests for current reward amounts, completion idempotency, Pay-to-Continue/reveal prices, past-Daily unlock price, default inventory, and legacy progress migration.
- [ ] Add red tests proving `Math.max` merge would resurrect a spend and that Daily/Multiplayer routes have no consumable controls.
- [ ] Run only the affected progression/account/game/calendar suites and record expected red failures for new contracts.

### Task 2 - Build the pure economy and effect domain

- [ ] Define exact catalog/types and a pure guest command reducer with operation-id deduplication, non-negative balance/inventory, fixed prices, and Practice-only use validation.
- [ ] Define puzzle-scoped effect state and deterministic Reveal/Remove behavior, including fully-revealed and already-removed no-spend failures.
- [ ] Add normalization for malformed/legacy state and prove old saves retain their exact coin balance and inventory.
- [ ] Run `npx vitest run src/progression/economy.test.ts src/progression/progression.test.ts src/account/guestStorage.test.ts src/account/guestTransfer.test.ts` to green.

### Task 3 - Prepare one additive signed-in authority migration

- [ ] Create the migration with owner-keyed economy state, append-only operations, uniqueness/indexes, owner-private RLS, and no browser table grants.
- [ ] Add narrow load/credit/spend/purchase/use RPCs with authenticated ownership, empty search paths, enum/range checks, deterministic ids, transaction locking, and idempotent replay.
- [ ] Bootstrap from the caller's private `progress_snapshots` row once and return only balance, inventory counts, operation id/status, and revision/timestamp.
- [ ] Add catalog tests for columns, constraints, indexes, policies, grants, search paths, bootstrap behavior, concurrent underflow prevention, and absence of answers/private session payloads.
- [ ] Stop before applying the migration remotely. Stop entirely if more than one migration or a broader architecture is needed.

### Task 4 - Integrate guest and signed-in economy repositories

- [ ] Add strict repository parsers and one App-level command dispatcher.
- [ ] Route completion rewards and all existing spends through deterministic command ids while preserving existing formulas and user-visible copy.
- [ ] For signed-in users, use returned server state as authoritative and update the progress cache immediately; for guests, persist the pure reducer result locally.
- [ ] Replace unsafe coin/inventory max-merge behavior without changing unrelated XP, history, stats, resume, settings, or multiplayer merges.
- [ ] Add offline/error behavior that does not falsely grant inventory or consume coins twice.

### Task 5 - Add the lightweight marketplace

- [ ] Add the Marketplace support route and compact panel with fixed item rows, current balance, owned count, purchase command, and accessible status.
- [ ] Keep the route mobile-safe at 320/390px, keyboard reachable, reduced-motion neutral, and free of nested decorative cards.
- [ ] Add route/component tests for insufficient funds, pending/duplicate clicks, successful purchase, error recovery, guest persistence, and signed-in returned state.

### Task 6 - Integrate Practice OG and GO use

- [ ] Add inventory controls only when `scope === 'practice'`; assert their absence in every Daily render and every Multiplayer surface.
- [ ] Persist private puzzle-scoped effects through resume captures and Solo cloud mutation events without exposing them in public history or projections.
- [ ] Apply Reveal One Letter as a private hint and Remove Incorrect Letters to on-screen and physical keyboard entry without changing guesses, tiles, Hard Mode evidence, completion, definitions, or rewards.
- [ ] Prove GO effects reset per puzzle and all effects reset for a new puzzle/chain.
- [ ] Add refresh, route re-entry, sign-out/sign-in, and fresh-browser restoration tests.

### Task 7 - Local gate and remote continuation handoff

- [ ] Run focused domain/account/marketplace/OG/GO/calendar/route tests, then lint, all unit tests, build, API typecheck, and the full existing E2E suite.
- [ ] Run new guest E2E locally. Keep real signed-in economy E2E gated until exact migration application.
- [ ] Update Phase 57 documentation and create an ignored continuation prompt authorizing only exact sole-pending-migration application, authority/concurrency probes, disposable-account E2E, cleanup, full regression, and Review Candidate preparation.
- [ ] Run diff, CSV, credential/private-data, ignored-artifact, checksum, process, and watched-port checks; stop before Git/GitHub actions.

## Required Real E2E Matrix After Remote Authorization

- Purchase each item, refresh, sign out/in, and restore the same balance/inventory in a fresh browser.
- Concurrent same-id purchase grants/spends once; distinct concurrent purchases cannot overdraw.
- Practice OG and each GO puzzle consume inventory once and persist the exact private effect.
- Fully revealed/already-removed/insufficient-inventory attempts do not spend.
- Daily OG/GO, past Daily, ranked/unranked/private Multiplayer, Live/Lobby, and spectators expose no controls and receive no effects.
- Existing reward, Pay-to-Continue, reveal-answer, past-Daily unlock, Solo persistence, Home-on-refresh, Phase 56 request center, ranked matchmaking, and spectator tests remain green.
- Cleanup removes temporary economy rows/operations, Solo history, progress snapshots, game rows, and Auth users.

## Stop Conditions

Stop and report if implementation requires changing reward/XP/Elo formulas, exposing answers or private hint state, permitting consumables outside Solo Practice, direct browser writes to private economy tables, more than one migration, editing an applied migration, installing dependencies, a service-worker/payment system, broad UI redesign, remote migration application, Git/GitHub work, Phase 58+, or stable-repository work.

## Plan Self-Review

- Every accepted Phase 57 requirement maps to domain, persistence, UI, authority, and test work.
- The plan fixes the existing max-merge incompatibility instead of layering inventory spending on top of it.
- Existing formulas and all non-Practice fairness boundaries remain protected.
- Signed-in authority and remote E2E are explicitly separated from local implementation.
- No product requirement was invented for drops, probabilities, extra hints, real money, or redesign.
