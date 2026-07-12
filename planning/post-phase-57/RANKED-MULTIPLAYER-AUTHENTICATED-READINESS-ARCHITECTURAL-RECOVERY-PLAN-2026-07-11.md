# Ranked Multiplayer Authenticated Readiness Architectural Recovery Plan

**Status:** Implemented and fully verified; Review Candidate backup remains separately gated.
**Date:** 2026-07-11.
**Baseline:** `ad8f65aebf12b56bda372777b015dbe8d773a4b5` from merged PR #67.

## Authorization

The user explicitly authorized the broader authenticated hydration and Multiplayer repository-readiness work that the prior three-cycle prompt prohibited. Work remains confined to `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`; the stable `brrrdle` repository remains untouched. Git/GitHub backup still requires the normal separate review gate.

## Proven Failure

A fresh authenticated page can receive the expected ranked Practice or Daily game from participant-scoped Supabase reads while the UI remains empty until a later focus-triggered refresh. This rules out queue finalization, durable-row loss, participant authorization, service workers, and spectator discovery.

The ordering problem spans two independent startup streams:

1. account progress hydration loads a cached `GuestProgressState`, including its embedded Multiplayer projection;
2. the authenticated Multiplayer repository loads the current participant-visible server projection.

These streams have no shared authority marker. `selectScopedProgressMultiplayerState` infers whether current rows belong to the new account from row contents, while repository replacement and account hydration commit independently. A stale progress projection can therefore become the effective state after a correct server read, or the UI can remain on the cache while waiting for a later route/focus refresh.

## Architecture Decision

Introduce an explicit in-memory authority owner for the currently rendered Multiplayer snapshot.

- Guest progress may continue to own guest/local Multiplayer state.
- Authenticated account progress must never be treated as authoritative for Multiplayer.
- A Supabase Multiplayer snapshot becomes authoritative only when it is applied for the currently authenticated user.
- Authenticated progress hydration preserves current Multiplayer state only when that state is explicitly owned by the same authenticated user.
- Until the matching repository snapshot arrives, authenticated hydration uses an empty Multiplayer state rather than a stale account-progress cache or another account's rows.
- Repository effects retain their existing cleanup/generation guards, realtime subscriptions, and route/focus refresh behavior.

This separates account progress authority from Multiplayer authority without changing persistence schemas, Supabase contracts, queue logic, gameplay, Elo, claims, polling intervals, or refresh-to-Home.

## Test-First Sequence

1. Extend `scopedProgressMultiplayerState` tests to require explicit same-user authority before preserving current rows and to reject stale progress caches for authenticated scopes.
2. Add a true-cold fresh-page ranked Practice GO E2E and tighten ranked Daily OG so neither warms the participant Multiplayer route before cold bootstrap.
3. Confirm both fail against the accepted baseline with an unchanged five-second visibility budget.
4. Add the smallest App authority-owner wiring and pure selection contract.
5. Run focused unit and real temporary-account E2E in standard Chromium plus production-bundle Firefox/Chromium where available.
6. Expand to ranked Practice/Daily and OG/GO shared-path coverage, then run the complete sequential project gate.

## Preserved Invariants

- Ranked Practice and ranked Daily remain separate FIFO queues.
- Daily eligibility, four-game daily allocation, answer separation, canonical difficulty, and claim authority remain unchanged.
- Existing ranked settlement and Elo formulas remain unchanged.
- Private/unranked Multiplayer, Solo persistence, spectator privacy, Marketplace/consumables, and refresh-to-Home remain unchanged.
- No migration, remote mutation, dependency, framework, deployment, or stable-repository work is expected.

## Exit Gate

Prepare a Review Candidate backup prompt only after focused and complete verification are clean, temporary-account residue is zero, migration/catalog fingerprints are unchanged, generated artifacts are removed, and the manual checklist remains open for hosted review.

## Implementation Result

- `scopedProgressMultiplayerState` now requires an explicit authenticated authority owner before preserving current Multiplayer state during account-progress hydration.
- Authenticated progress caches can no longer authorize Multiplayer projections. Before repository readiness they yield an empty Multiplayer state; the authenticated repository snapshot then becomes authoritative for that user.
- App repository and route-refresh snapshot application records the authenticated owner. Same-account progress hydration preserves that full authoritative snapshot without relying on participant IDs embedded in individual rows.
- Guest/local progress behavior is unchanged and clears authenticated authority ownership on scope exit.
- Ranked Practice GO and ranked Daily OG now use true-cold fresh authenticated page E2E without warming the participant Multiplayer route. Both require the game in the matching mode tab, Active Games, and Live within five seconds.

## Verification Result

- TDD red: two authority-contract tests failed against the accepted implementation for unauthoritative cache use and row-identity-dependent preservation.
- Focused authority/auth tests: 73/73 passed.
- Ranked browser regressions: Practice GO repeated 5/5; combined ranked reliability/Daily set 11/11.
- Production preview cross-browser: ranked Practice GO and ranked Daily OG passed in Chromium and Firefox, 4/4.
- Lint, app build/typecheck, API typecheck, and 144 files / 1,018 unit tests passed.
- First complete authority run passed 79/80; the lone unranked Daily OG lobby-discovery failure passed its exact retry. The required fresh complete run then passed 80/80 with one worker in 10.9 minutes.
- Remote/local migrations remain 39/39, accepted spectator fingerprints are unchanged, temporary users/profiles are zero, and no migration or remote mutation was performed.
