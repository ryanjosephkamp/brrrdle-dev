# Phase 24 Navigation And Workspaces Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` for inline execution or `superpowers:subagent-driven-development` if the user explicitly authorizes parallel implementation workers. Track execution with checkbox steps. Do not commit, push, create a PR, merge, deploy, run migrations, or touch the original `brrrdle` repository unless a future user prompt explicitly authorizes that operation.

**Goal:** Implement the Phase 24 navigation and workspace migration in `brrrdle-dev` without weakening the stable Phase 23 gameplay foundation.

**Architecture:** Build additive route, workspace, selector, and view-model layers first. Move Solo and Multiplayer entry points into first-class workspaces through staged integration, keeping route/UI state separate from gameplay state and treating galleries, Lobby, Live v0, and History as projections of existing canonical data.

**Tech Stack:** Vite, React, TypeScript, Supabase, Vitest, Playwright, Tailwind CSS.

---

## 1. Status And Authority

**Status**: Stage 24.6 cleanup and final hardening complete and verified; Phase 24 is ready for user review. Commits, pushes, PRs, merges, releases, deployments, migrations, and post-Phase-24 work remain gated.
**Created**: 2026-06-10
**Updated**: 2026-06-13
**Target repository**: `https://github.com/ryanjosephkamp/brrrdle-dev`

This is the canonical Phase 24 implementation plan for `brrrdle-dev`.

This plan is a planning artifact only. It does not authorize implementation, source/runtime edits, Supabase migrations, Vercel configuration, production deployment, pull request creation, commits, pushes, merges, releases, or work against the original stable `brrrdle` repository. Execution begins only after the user gives explicit Phase 24 implementation authorization.

Primary Phase 24 source spec:

- `planning/specs/phase-24/PHASE-24-NAVIGATION-AND-WORKSPACES-SPEC-2026-06-12.md`

Supporting planning inputs:

- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `planning/testing/TESTING-SUITE.md`
- `planning/phase-24/BRRRDLE-DEV-HANDOFF.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-146.md`
- `agents.md`
- `memory.md`

Latest known progress ledger entry is `phase_id = 155`, covering Stage 24.6 cleanup and final hardening.

---

## 2. Execution Principles

Phase 24 should follow these principles:

- Stability first: preserve current playable behavior before adding new UI affordances.
- Navigation before migration: create the route/subtab shell before moving gameplay surfaces.
- Additive extraction: introduce small workspace and selector modules rather than rewriting `App.tsx` wholesale.
- Canonical gameplay stays canonical: do not duplicate OG/GO rules, tile coloring, Hard Mode, GO advancement, scoring, or multiplayer settlement in UI code.
- Projections over copies: active-game cards, Lobby rows, Live rows, History rows, and recent-result summaries should derive view models from existing state.
- Route state is not gameplay state: route, subtab, selected-game, and filter persistence must not mutate gameplay sessions.
- Schema changes are exceptional: avoid Supabase or guest/cloud schema changes unless a narrow need is proven and separately approved.
- Multiplayer claims require real multiplayer evidence: any changed multiplayer behavior must be verified with real two-client Supabase-backed Playwright E2E when credentials are available.
- One high-conflict owner at a time: `src/app/App.tsx`, route wiring, multiplayer reducers/repository seams, progress ledgers, and governance docs should be sequenced.
- Halt at gates: stop for user review when a stage exit gate requires approval, a required verification cannot run, or scope would need to expand.

---

## 3. Success Criteria

Phase 24 is complete only when all criteria below are met.

### 3.1 Non-Negotiable Final Verification

The full existing gameplay testing suite must continue to pass after all Phase 24 changes:

```sh
npm run lint
npm run test
npm run test:e2e
npm run test:full
npm run build
npx tsc -p tsconfig.api.json --noEmit
git diff --check
```

If any command fails, Phase 24 is not complete until the failure is fixed or explicitly accepted by the user after a full error report.

### 3.2 Gameplay Criteria

- Solo Daily OG and Solo Daily GO remain playable and fixed at five letters.
- Solo Practice OG and Solo Practice GO remain playable with word lengths 2 through 35 where currently supported.
- Multiplayer Daily OG/GO and Practice OG/GO remain playable.
- Daily rotation, Daily calendar launches, countdown behavior, unlocked past dailies, definitions, sharing, stats, economy, resume slots, and settings remain intact.
- Hard Mode behavior remains intact for Solo Daily, Solo Practice, and Practice Multiplayer.
- Existing GO solved-row holds, carry-over evidence, keyboard coloring, final-puzzle behavior, and transition synchronization remain intact.
- Existing scoring, rating/ELO, timeout, forfeit, and result-settlement rules remain unchanged.

### 3.3 Navigation Criteria

- Primary navigation includes first-class Solo, Multiplayer, Daily/Calendar, History, and existing support/admin routes.
- Practice is removed from primary navigation only after Solo Practice and Multiplayer Practice replacement entry points are working and verified.
- Existing hidden/deep-link routes for `practice`, `og-daily`, and `go-daily` work or redirect predictably.
- Daily/Calendar remains the date hub and can still route to daily play.
- Home remains lightweight and does not block Phase 24 if richer dashboard widgets are deferred.

### 3.4 Workspace Criteria

- Solo has Overview, Daily Solo, Practice Solo, and Active Solo Games subtabs.
- Multiplayer has Overview, Daily Multiplayer, Practice Multiplayer, Active Multiplayer Games, Lobby, and Live subtabs.
- Active-game surfaces show enough information to identify and resume games without duplicating gameplay state.
- Recent result summaries link to the global History route or to a safe existing detail/review surface.
- Lobby shows joinable/open multiplayer opportunities through existing safe state and preserves claim/cancel/join guards.
- Live v0 exists as a conservative participant-centric surface, with richer public/spectator behavior deferred unless safe without schema or RLS changes.

### 3.5 Persistence And Compatibility Criteria

- Route/subtab persistence survives reload with validation and fallback.
- Selected active game and History filters persist only as UI state.
- Existing `GuestProgressState` loads without data loss.
- Existing `resumeSlots` continue to preserve `daily-og`, `daily-go`, `practice-og`, and `practice-go` lanes.
- Existing typed draft behavior is preserved where currently supported.
- No `GUEST_PROGRESS_SCHEMA_VERSION` bump occurs unless a real guest/cloud stored shape change is approved.

### 3.6 Accessibility, Security, And Privacy Criteria

- New primary tabs, subtabs, tables, filters, and gallery cards are keyboard-operable.
- Active route/subtab state uses clear semantics such as `aria-current`, `role="tablist"`/`role="tab"` where appropriate, or equivalent accessible button semantics.
- Desktop, tablet, and approximately 390px mobile layouts do not overlap or overflow incoherently.
- Lobby and Live respect existing auth, participant, repository, and RLS boundaries.
- No secrets, `.env.local`, Supabase keys, Vercel tokens, test auth state, screenshots, videos, traces, or local session artifacts are committed or printed.

---

## 4. Current Architecture Map

### 4.1 Current Route And Navigation State

Current route files:

- `src/app/routes.ts` defines `AppRouteId` and `APP_ROUTES`.
- `src/ui/Navigation.tsx` renders the primary route buttons.
- `src/app/App.tsx` owns route state, persisted navigation, route rendering, Daily launch redirects, auth/sync, resume behavior, and multiplayer repository wiring.

Current important details:

- `multiplayer` exists but is hidden and renders `MultiplayerFoundationPanel`.
- `practice` is currently a primary route.
- `og-daily` and `go-daily` are hidden routes that redirect through Calendar launch state.
- `NAVIGATION_STORAGE_KEY` is currently `brrrdle:navigation:v1`.
- `PersistedNavigation` currently stores `activeRouteId` and `practiceMode`.

### 4.2 Current Solo Surfaces

Solo gameplay currently flows through:

- `src/app/App.tsx` `PracticeGameSwitcher` for Practice OG/GO.
- `src/calendar/CalendarPanel.tsx` for Daily OG/GO and Daily Multiplayer date surfaces.
- Hidden direct daily route branches in `RoutePanel`.
- `src/app/games/OgGame.tsx` and `src/app/games/GoGame.tsx`.
- `src/account/resumeSlot.ts` for `daily-og`, `daily-go`, `practice-og`, and `practice-go`.
- `src/account/storageSchema.ts` for history, settings, stats, progression, resume slots, multiplayer, competitive multiplayer, and practice seeds.

### 4.3 Current Multiplayer Surfaces

Multiplayer currently flows through:

- `src/multiplayer/MultiplayerPanel.tsx`, which combines setup controls, visible game tabs, join/cancel actions, selected-game rendering, status text, clocks, forfeit, definitions, and history.
- `src/multiplayer/MultiplayerGameSurface.tsx`, which renders canonical/player-specific game state and display-only shared move projections.
- `src/multiplayer/multiplayer.ts`, which owns create/join/cancel/submit/forfeit/timeout, active-game selection helpers, Daily claim checks, canonical `playerSessions`, and terminal settlement.
- `src/multiplayer/multiplayerRepository.ts`, which owns localStorage and Supabase-backed persistence/subscriptions.
- `src/calendar/CalendarPanel.tsx` for Daily Multiplayer date launch.
- `src/app/App.tsx` for repository subscription, local save fallback, result settlement, and timed Practice expiration.

Current multiplayer invariants to preserve:

- `playerSessions` are canonical per viewer/player.
- `serializedSession` remains compatibility/answer plumbing.
- Shared moves may be used for display projections but must not overwrite another player's canonical session except where existing GO solved-move synchronization already allows a focused recovery.
- Daily Multiplayer is strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Practice Multiplayer owns Hard Mode and time-limit behavior.

### 4.4 Current Test Surfaces

Relevant current tests:

- `src/app/routes.test.ts`
- `src/calendar/CalendarPanel.test.tsx`
- `src/account/resumeSlot.test.ts`
- `src/account/guestStorage.test.ts`
- `src/account/guestTransfer.test.ts`
- `src/stats/statsSelectors.test.ts`
- `src/multiplayer/multiplayer.test.ts`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/MultiplayerGameSurface.test.tsx`
- `src/multiplayer/multiplayerRepository.test.ts`
- `e2e/gameplay/*.spec.ts`

Future Phase 24 tests should extend these instead of replacing them.

---

## 5. Proposed File And Module Structure

Exact filenames can be adjusted during execution to match local style, but the preferred structure is:

### 5.1 Route And Navigation Modules

- Modify `src/app/routes.ts`: add `solo` and `history`; make `multiplayer` first-class when ready; keep compatibility routes.
- Create `src/app/navigationState.ts`: normalize/load/save route, subtab, selected game, and History filter UI state.
- Test `src/app/navigationState.test.ts`: corrupted JSON fallback, v1 compatibility, obsolete route fallback, subtab defaults.
- Modify `src/ui/Navigation.tsx`: keep primary nav accessible and responsive.
- Create `src/ui/SubtabBar.tsx` or equivalent: shared subtab control.
- Test `src/ui/SubtabBar.test.tsx` if the final component has non-trivial behavior.

### 5.2 Solo Workspace Modules

- Create `src/solo/SoloWorkspace.tsx`: Solo route composition and subtab switching.
- Create `src/solo/soloViewModels.ts`: active solo games and recent solo results from `ResumeSlotCollection` and history.
- Test `src/solo/soloViewModels.test.ts`.
- Optional focused components:
  - `src/solo/SoloOverview.tsx`
  - `src/solo/SoloDailyPanel.tsx`
  - `src/solo/SoloPracticePanel.tsx`
  - `src/solo/SoloActiveGames.tsx`

### 5.3 Multiplayer Workspace Modules

- Create `src/multiplayer/MultiplayerWorkspace.tsx`: Multiplayer route composition and subtab switching.
- Create `src/multiplayer/multiplayerViewModels.ts`: active games, lobby rows, recent result rows, and Live v0 rows from `MultiplayerState`.
- Test `src/multiplayer/multiplayerViewModels.test.ts`.
- Extract or create focused components:
  - `src/multiplayer/MultiplayerOverview.tsx`
  - `src/multiplayer/MultiplayerLobby.tsx`
  - `src/multiplayer/MultiplayerActiveGames.tsx`
  - `src/multiplayer/MultiplayerLive.tsx`
- Keep `MultiplayerPanel` behavior reusable while extracting; avoid a large single rewrite.

### 5.4 History Modules

- Create `src/history/HistoryWorkspace.tsx`: global History route and filters.
- Create `src/history/historyViewModels.ts`: History rows from `GameHistoryEntry` plus safe multiplayer summaries.
- Test `src/history/historyViewModels.test.ts`.
- Optional focused components:
  - `src/history/HistoryFilters.tsx`
  - `src/history/HistoryTable.tsx`
  - `src/history/HistoryEmptyState.tsx`

### 5.5 High-Conflict Files

Sequence edits carefully in:

- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/ui/Navigation.tsx`
- `src/calendar/CalendarPanel.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/account/storageSchema.ts`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`
- `CHANGELOG.md`
- `agents.md`
- `memory.md`

Coordinator should own final `App.tsx` integration and progress/governance updates.

---

## 6. State Persistence And Compatibility Strategy

### 6.1 Navigation State Shape

Prefer a new validated UI-only navigation state, likely using `brrrdle:navigation:v2`.

Recommended fields:

- `activeRouteId`
- `legacyPracticeMode`
- `soloSubtab`
- `multiplayerSubtab`
- `selectedSoloGameKey`
- `selectedMultiplayerGameId`
- `historyFilters`

Allowed Solo subtabs:

- `overview`
- `daily`
- `practice`
- `active`

Allowed Multiplayer subtabs:

- `overview`
- `daily`
- `practice`
- `active`
- `lobby`
- `live`

History filter state should be small, serializable, and safe to discard. A corrupted or obsolete value should fall back to defaults.

### 6.2 Compatibility Rules

- Existing `brrrdle:navigation:v1` values should migrate or be read once as fallback.
- Existing `practiceMode` should map to the Solo Practice subtab and the selected Solo practice mode where needed.
- Existing `practice` route should remain valid during migration and eventually redirect to Solo Practice or Multiplayer Practice based on the last compatible state.
- Existing `og-daily` and `go-daily` route attempts should keep launching through Daily/Calendar or Solo Daily.
- Existing `brrrdle:calendar-surface:v1` behavior should not be broken until Daily/Calendar compatibility is explicitly replaced and verified.

### 6.3 Gameplay Persistence Rules

Do not store gameplay sessions in navigation state.

Continue to use:

- `resumeSlots` for solo active games.
- `guestProgress.history` for solo recent results and History v1.
- `guestProgress.multiplayer` and the multiplayer repository snapshot for multiplayer active games and lobbies.
- `guestProgress.competitiveMultiplayer` for existing competitive/result summaries where useful.

Do not bump `GUEST_PROGRESS_SCHEMA_VERSION` unless a later approved implementation step introduces a real guest/cloud stored data-shape change.

---

## 7. Stage Breakdown

### 7.1 Stage 24.0 - Definition And Baseline

**Purpose:** Convert the reviewed spec and this plan into an authorized execution baseline before runtime edits.

**Goals:**

- Confirm exact execution authorization.
- Protect existing local user/planning work.
- Record branch, remotes, worktree state, current verification baseline, resource state, and next progress id.
- Decide whether execution will use one branch/PR or staged checkpoints.

**Deliverables:**

- `progress/PROGRESS.csv` row for the Phase 24 kickoff.
- `progress/PROGRESS-STEP-147.md` if `147` is still the next available id.
- Updated `planning/phase-24/IMPLEMENTATION-PLAN.md` only if the user changes scope during authorization.
- Baseline command/output summary in the progress report.

**Likely files/modules:**

- `planning/phase-24/IMPLEMENTATION-PLAN.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`
- `agents.md` and `memory.md` only if durable coordination state changes.

**Dependencies:**

- Explicit user authorization to begin execution.
- Clean or intentionally dirty worktree assessment.
- Supabase E2E credentials available or documented as unavailable.

**Execution checklist:**

- [ ] Run `pwd`, `git branch --show-current`, `git status --short --branch`, and `git remote -v`.
- [ ] Confirm the checkout is `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- [ ] Confirm the original stable repository is not the working directory.
- [ ] Inspect untracked planning files and preserve them.
- [ ] Identify the next progress id from `progress/PROGRESS.csv`.
- [ ] Record resource baseline before any browser work if implementation will run E2E.
- [ ] Run an agreed lightweight baseline gate, usually `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, and `git diff --check`.
- [ ] Halt if baseline verification fails in a way unrelated to Phase 24 scope.

**Verification expectations:**

- Planning/progress diff check.
- Baseline test/build/typecheck only after execution is authorized.

**Exit gate:**

- User has authorized the first implementation stage.
- Progress report records the protected starting state.

**Stop conditions:**

- Worktree contains unexplained source/runtime changes.
- Current branch or remote indicates the original stable `brrrdle` repository.
- Baseline verification reveals a critical pre-existing failure that must be triaged before Phase 24 work.

### 7.2 Stage 24.1 - Navigation Shell And Route Model

**Purpose:** Add the route and subtab foundation without moving gameplay behavior all at once.

**Goals:**

- Add first-class route ids for Solo and History.
- Convert Multiplayer from hidden foundation route to a real workspace route at the correct point in the stage.
- Add validated navigation/subtab persistence.
- Add a reusable accessible subtab control.
- Preserve Practice and Daily compatibility while the shell lands.

**Deliverables:**

- Updated `AppRouteId` and route metadata.
- Updated primary navigation route list.
- Route compatibility helpers for `practice`, `og-daily`, and `go-daily`.
- `navigationState` helper with v1 fallback and v2 validation.
- Shared subtab UI primitive.
- Shell components for Solo, Multiplayer, and History.
- Route/navigation tests.

**Likely files/modules:**

- Modify `src/app/routes.ts`.
- Modify `src/ui/Navigation.tsx`.
- Modify `src/app/App.tsx`.
- Create `src/app/navigationState.ts`.
- Create `src/app/navigationState.test.ts`.
- Create `src/ui/SubtabBar.tsx`.
- Create `src/ui/SubtabBar.test.tsx` if warranted.
- Modify `src/app/routes.test.ts`.

**Dependencies:**

- Stage 24.0 complete.
- User-facing decision on the Daily label can remain recommended as `Daily`, with `calendar` route id compatibility.

**Execution checklist:**

- [x] Write failing route tests for `solo`, `multiplayer`, `history`, hidden compatibility routes, and primary navigation order.
- [x] Extract navigation persistence helpers from `App.tsx` into a testable module.
- [x] Add v2 navigation-state tests for valid state, corrupted JSON, old route ids, and v1 fallback.
- [x] Add the shared subtab primitive with keyboard and active-state semantics.
- [x] Add shell route panels for Solo, Multiplayer, and History that do not move gameplay yet.
- [x] Integrate route shell in `App.tsx` with minimal changes.
- [x] Keep Practice available until Solo and Multiplayer replacement entry points pass later stages.
- [x] Run focused route/navigation tests after each logical change.

**Verification expectations:**

- `npm run test -- src/app/routes.test.ts src/app/navigationState.test.ts`
- Focused component test for subtab rendering if created.
- Browser smoke after execution authorization if visible nav changes are implemented.
- `git diff --check`

**Exit gate:**

- Primary navigation can reach Solo, Multiplayer, Daily/Calendar, History, and support routes.
- Hidden daily route compatibility is preserved.
- Practice remains available until replacement work is verified.

**Stop conditions:**

- Route changes require deleting compatibility paths.
- Navigation persistence would require guest/cloud schema migration.
- `App.tsx` changes start moving gameplay surfaces before shell tests pass.

### 7.3 Stage 24.2 - Solo Workspace

**Purpose:** Make Solo the primary home for Daily Solo and Practice Solo without changing solo gameplay rules.

**Goals:**

- Add Solo Overview, Daily Solo, Practice Solo, and Active Solo Games subtabs.
- Use existing `OgGame` and `GoGame` components.
- Project active solo games from `resumeSlots`.
- Project recent solo results from `guestProgress.history`.
- Keep Daily/Calendar daily access intact.

**Deliverables:**

- `SoloWorkspace` route component.
- Solo active-game and recent-result view models.
- Solo Overview with quick actions, active games, and recent results.
- Daily Solo subtab for current Daily OG/GO entry/resume.
- Practice Solo subtab for Practice OG/GO entry/resume.
- Active Solo Games subtab.
- Solo workspace tests.

**Likely files/modules:**

- Create `src/solo/SoloWorkspace.tsx`.
- Create `src/solo/soloViewModels.ts`.
- Create `src/solo/soloViewModels.test.ts`.
- Optional `src/solo/SoloOverview.tsx`, `src/solo/SoloDailyPanel.tsx`, `src/solo/SoloPracticePanel.tsx`, `src/solo/SoloActiveGames.tsx`.
- Modify `src/app/App.tsx`.
- Keep `src/app/games/OgGame.tsx` and `src/app/games/GoGame.tsx` behavior stable.
- Read from `src/account/resumeSlot.ts` and `src/account/storageSchema.ts`.

**Dependencies:**

- Stage 24.1 shell and subtab persistence.
- Existing `resumeSlots` normalization and guest history.

**Execution checklist:**

- [x] Write selector tests for active solo games from `daily-og`, `daily-go`, `practice-og`, and `practice-go`.
- [x] Write selector tests for recent solo history, newest-first sorting, and 3-5 item overview limit.
- [x] Build Solo Overview using selector outputs.
- [x] Wire Daily Solo to current Daily OG/GO launch/resume behavior without changing Daily answer rules.
- [x] Wire Practice Solo to existing Practice OG/GO behavior and practice seed handling.
- [x] Add Active Solo Games with metadata-first cards; add board previews only if derived safely from serialized sessions.
- [x] Update `navigateToResumeSlot` so solo resume can land on the correct Solo subtab once replacement is stable.
- [x] Keep Calendar daily launches working.
- [x] Run focused solo and navigation tests.

**Verification expectations:**

- `npm run test -- src/solo/soloViewModels.test.ts src/account/resumeSlot.test.ts src/app/routes.test.ts`
- Relevant `OgGame`/`GoGame` focused tests if integration touches their props.
- `npm run test:e2e:solo` after visible Solo workspace integration when credentials/environment are available.
- Browser smoke for Solo Overview, Daily Solo OG/GO, Practice Solo OG/GO, active-game resume, and recent-result History links.

**Exit gate:**

- Solo Daily and Solo Practice are playable from Solo.
- Solo active-game and recent-result surfaces work without corrupting resume slots or history.
- Daily fixed-five and Practice 2-35 behavior are preserved.

**Stop conditions:**

- Solo workspace requires changing `src/game/` canonical rules.
- Active-game cards require unsafe mutation or duplicate game-state storage.
- Daily Solo current-day behavior conflicts with Calendar/unlock behavior.

### 7.4 Stage 24.3 - Multiplayer Workspace And Lobby

**Purpose:** Make Multiplayer the primary home for Daily Multiplayer, Practice Multiplayer, active multiplayer games, and Lobby discovery.

**Goals:**

- Add Multiplayer Overview, Daily, Practice, Active, and Lobby subtabs.
- Extract `MultiplayerPanel` responsibilities gradually.
- Project active games and Lobby rows from existing `MultiplayerState`.
- Preserve Daily and Practice Multiplayer invariants.
- Keep selected-game behavior stable across route/subtab changes.

**Deliverables:**

- `MultiplayerWorkspace` route component.
- Multiplayer active-game, lobby-row, and recent-result view models.
- Daily Multiplayer subtab using existing Daily Multiplayer behavior.
- Practice Multiplayer subtab using existing Practice controls.
- Active Multiplayer Games subtab.
- Lobby subtab with join/cancel actions where eligible.
- Focused tests and real two-client E2E for changed multiplayer behavior.

**Likely files/modules:**

- Create `src/multiplayer/MultiplayerWorkspace.tsx`.
- Create `src/multiplayer/multiplayerViewModels.ts`.
- Create `src/multiplayer/multiplayerViewModels.test.ts`.
- Create `src/multiplayer/MultiplayerLobby.tsx`.
- Create `src/multiplayer/MultiplayerActiveGames.tsx`.
- Modify `src/multiplayer/MultiplayerPanel.tsx`.
- Modify `src/app/App.tsx`.
- Avoid changes to `src/multiplayer/multiplayer.ts` and `src/multiplayer/multiplayerRepository.ts` unless required and covered by tests.

**Dependencies:**

- Stage 24.1 shell.
- Existing multiplayer repository and domain helpers.
- Stage 24.2 may be complete first to lower integration risk.

**Execution checklist:**

- [x] Write view-model tests for current-player active games using `getActiveMultiplayerGames`.
- [x] Write lobby-row tests for waiting Practice games, own cancelable lobbies, rival-joinable lobbies, and Daily claim guard display.
- [x] Write tests proving Daily rows do not expose Practice-only time-limit or Hard Mode controls.
- [x] Add Multiplayer Overview with active games, Lobby snapshot, recent results, and subtab links.
- [x] Add Practice Multiplayer subtab around existing `MultiplayerPanel` behavior.
- [x] Add Daily Multiplayer subtab around existing Daily mode behavior using `dailyDateKey`.
- [x] Add Active Multiplayer Games and Lobby as projections over existing state.
- [x] Preserve selected game id in navigation state if safe.
- [x] Run focused multiplayer tests after each extraction.
- [x] Run real two-client E2E for any create/join/submit/cancel/forfeit/timeout behavior touched. Stage 24.3 did not change those mutation paths; Supabase E2E credentials were not present for optional broader multiplayer E2E.

**Verification expectations:**

- `npm run test -- src/multiplayer/multiplayerViewModels.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/multiplayer.test.ts`
- `npm run test:e2e:practice` when Practice Multiplayer behavior changes.
- `npm run test:e2e:daily` when Daily Multiplayer behavior changes.
- `npm run test:e2e:multiplayer` before claiming multiplayer stage completion.
- Remote Supabase probe/cleanup when E2E touches remote rows/users.

**Exit gate:**

- Multiplayer Daily and Practice play from Multiplayer subtabs.
- Lobby shows safe joinable rows and preserves join/cancel guards.
- Active multiplayer games are resumable.
- Daily Multiplayer invariants remain covered by tests.

**Stop conditions:**

- Lobby requires a new Supabase schema or RLS policy.
- Extracting `MultiplayerPanel` would require rewriting settlement, scoring, rating/ELO, timeout, forfeit, GO transition, keyboard, or repository rules.
- Real two-client E2E cannot run for changed multiplayer behavior and no acceptable alternative is approved.

### 7.5 Stage 24.4 - History v1

**Purpose:** Add a minimum useful global History route and connect recent-result links.

**Goals:**

- Add History route with combined Solo and Multiplayer summaries.
- Provide practical filters.
- Link Solo and Multiplayer recent-result sections into History.
- Avoid rich replay or new schema work.

**Deliverables:**

- `HistoryWorkspace` route component.
- History row/filter view models.
- Filters for Solo/Multiplayer, Daily/Practice, and OG/GO.
- Empty states.
- Recent-result links from Solo and Multiplayer.
- Richer status/date/recent filters remain deferred unless later implementation proves they are worth the added route-state complexity.

**Likely files/modules:**

- Create `src/history/HistoryWorkspace.tsx`.
- Create `src/history/historyViewModels.ts`.
- Create `src/history/historyViewModels.test.ts`.
- Modify `src/solo/SoloWorkspace.tsx`.
- Modify `src/multiplayer/MultiplayerWorkspace.tsx`.
- Modify `src/app/App.tsx` only for route wiring/filter state.
- Read from `src/account/storageSchema.ts` and existing multiplayer result/competitive summaries.

**Dependencies:**

- Stage 24.1 History route shell.
- Stage 24.2 recent solo selectors.
- Stage 24.3 recent multiplayer selectors if multiplayer summaries are included.

**Execution checklist:**

- [x] Write History view-model tests for solo rows from `GameHistoryEntry`.
- [x] Write tests for multiplayer summary rows using existing safe multiplayer/competitive state.
- [x] Write filter tests for player area, scope, and mode selections.
- [x] Build History route with filters and table output.
- [x] Link Solo recent results to History with filters.
- [x] Link Multiplayer recent results to History with Multiplayer filters.
- [x] Keep rich replay/review disabled unless existing data supports it safely.

**Verification expectations:**

- `npm run test -- src/history/historyViewModels.test.ts src/history/HistoryWorkspace.test.tsx src/app/navigationState.test.ts src/solo/soloViewModels.test.ts src/multiplayer/multiplayerViewModels.test.ts`
- Browser smoke for History route, filters, empty states, and links from Solo/Multiplayer overviews.
- No Supabase migration.

**Exit gate:**

- History v1 is a usable global route.
- Recent-result links land predictably.
- Replay/review deferrals are documented if not implemented.

**Stop conditions:**

- History requires changing how game completion records are written.
- History requires new cloud schema or public match pages.
- History display would expose answers or private multiplayer details earlier than existing flows allow.

### 7.6 Stage 24.5 - Live v0

**Purpose:** Add a conservative Live subtab without building the full public spectator platform.

**Goals:**

- Create Live v0 as a participant-centric active-game visibility/resume surface.
- Include non-participant read-only access only if existing rules already make it safe.
- Avoid schema/RLS changes and broad realtime/social expansion.

**Deliverables:**

- Live subtab in Multiplayer.
- Live v0 view model.
- Compact list/gallery of eligible active games.
- Participant resume click behavior.
- Limited unavailable/restricted state for nonparticipant access if spectator safety is not proven.
- Tests for eligibility and click behavior.

**Likely files/modules:**

- Create `src/multiplayer/MultiplayerLive.tsx`.
- Extend `src/multiplayer/multiplayerViewModels.ts`.
- Extend `src/multiplayer/multiplayerViewModels.test.ts`.
- Modify `src/multiplayer/MultiplayerWorkspace.tsx`.
- Modify `src/app/App.tsx` only for selected game/subtab state if needed.
- Avoid `src/multiplayer/multiplayerRepository.ts` unless a safe existing data projection is insufficient and user approves the expanded work.

**Dependencies:**

- Stage 24.3 Multiplayer Workspace.
- RLS/privacy review of current repository visibility.

**Execution checklist:**

- [x] Write eligibility tests for participant active games.
- [x] Write tests proving waiting/completed/cancelled/expired games are excluded or shown only by explicit safe rules.
- [x] Write tests for participant resume projection.
- [x] Add Live v0 UI with empty, auth-required, and restricted states.
- [x] Keep nonparticipant spectator behavior disabled unless current authorization is clearly safe.
- [x] Document deferred spectator/public gallery behavior.

**Verification expectations:**

- `npm run test -- src/multiplayer/multiplayerViewModels.test.ts src/multiplayer/MultiplayerPanel.test.tsx`
- Browser smoke for participant resume.
- `npm run test:e2e:multiplayer` if realtime visibility or participant resume behavior changes.
- Remote cleanup for any touched multiplayer rows/users.

**Exit gate:**

- Live v0 exists and improves participant game visibility.
- No private data is exposed.
- Full public Live gallery, spectator presence, rich filtering/sorting, and social behavior remain deferred.

**Stop conditions:**

- Live v0 requires schema/RLS changes.
- Live v0 requires exposing nonparticipant game data beyond current safe surfaces.
- Live v0 starts changing repository subscription semantics or realtime load beyond projection-only behavior.

### 7.7 Stage 24.6 - Cleanup And Final Hardening

**Purpose:** Complete the migration, remove obsolete primary navigation affordances, and prove Phase 24 did not regress gameplay.

**Goals:**

- Remove Practice from primary navigation after replacements are verified.
- Keep compatibility redirects and hidden routes.
- Reduce duplicate UI only where safe.
- Update planning/progress/changelog.
- Run full verification.

**Deliverables:**

- Primary navigation without Practice as a top-level tab.
- Predictable `practice`, `og-daily`, and `go-daily` compatibility.
- Final docs/progress/changelog updates.
- Full verification evidence.
- Explicit deferred-item list for Phase 25+.

**Likely files/modules:**

- Modify `src/app/routes.ts`.
- Modify `src/app/App.tsx`.
- Modify `src/ui/Navigation.tsx`.
- Modify workspace modules created in earlier stages.
- Update `planning/phase-24/CHANGELOG.md` if used for phase changes.
- Update `CHANGELOG.md` if root shim/convention requires it.
- Update `progress/PROGRESS.csv`.
- Create/update `progress/PROGRESS-STEP-*.md`.
- Update `agents.md` and `memory.md` only for durable coordination state.

**Dependencies:**

- Stages 24.1 through 24.5 complete or explicitly scoped down by user-approved amendment.

**Execution checklist:**

- [x] Remove Practice from primary navigation only after Solo/Multiplayer Practice replacement paths pass smoke.
- [x] Keep `practice` route as hidden compatibility or redirect.
- [x] Verify Daily/Calendar still works as a date hub.
- [x] Verify Home remains lightweight and useful.
- [x] Run focused tests for route list, navigation persistence, Solo, Multiplayer, History, and Live.
- [x] Run full final gate.
- [x] Run responsive browser smoke at desktop, tablet, and about 390px mobile.
- [x] Run secret/artifact scan before any future commit.
- [x] Update progress/changelog/governance docs required by the execution prompt.

**Completion notes:**

- Practice is no longer a primary navigation destination.
- Legacy/saved `practice` navigation now lands in Solo with the Practice Solo subtab selected.
- The E2E navigation helpers now use Solo/Multiplayer workspace Practice entry points.
- The final Phase 24 gate passed on 2026-06-13: lint, unit tests, Playwright E2E, full test suite, build, API typecheck, diff check, CSV shape check, responsive browser smoke, and resource/artifact checks.
- [x] Halt for user review.

**Verification expectations:**

- Full gate from Section 3.1.
- `npm run test:e2e:multiplayer` plus remote cleanup if multiplayer behavior changed.
- Browser smoke for main navigation, Solo, Multiplayer, Daily/Calendar, History, settings/support routes, and compatibility routes.

**Exit gate:**

- Phase 24 is complete and verified.
- User receives a final handoff with changed files, verification results, known limitations, deferrals, and exact next approval options.

**Stop conditions:**

- Practice removal breaks compatibility or resume.
- Final full gate cannot run or fails.
- Generated artifacts or secrets appear in the worktree.

---

## 8. Multiplayer Safeguards

Daily Multiplayer must remain:

- strictly asynchronous
- five-letter
- UTC-day keyed
- no-clock
- without Daily Hard Mode lobby control
- answer-separated
- claim-safe

Practice Multiplayer must preserve:

- optional creator-selected Hard Mode
- optional time limits
- existing join/cancel/submit/forfeit/timeout behavior
- existing status text behavior
- existing result settlement
- existing rating/ELO projection rules
- existing GO transition, prior-row, keyboard evidence, and solved-row hold behavior

Real two-client Supabase-backed Playwright E2E is required when Phase 24 changes:

- multiplayer create/join/cancel flow
- selected-game resume behavior
- Daily Multiplayer claim behavior
- Practice time-limit behavior
- Hard Mode enforcement behavior
- submit/forfeit/timeout/result behavior
- GO transition or keyboard projection behavior
- repository subscription or visibility behavior
- Live v0 participant/nonparticipant behavior

If credentials are unavailable, report the missing credential class and do not claim full multiplayer verification.

---

## 9. Verification Strategy

### 9.1 Focused Tests By Stage

- **24.1 Navigation**: `src/app/routes.test.ts`, `src/app/navigationState.test.ts`, subtab component tests.
- **24.2 Solo**: `src/solo/soloViewModels.test.ts`, resume-slot tests, solo-focused component tests, `npm run test:e2e:solo`.
- **24.3 Multiplayer**: multiplayer view-model tests, `MultiplayerPanel` tests, multiplayer domain tests, `npm run test:e2e:practice`, `npm run test:e2e:daily`, `npm run test:e2e:multiplayer`.
- **24.4 History**: `src/history/historyViewModels.test.ts`, stats/history selector tests, browser smoke for filters/links.
- **24.5 Live v0**: multiplayer view-model tests, participant resume smoke, E2E if visibility/realtime behavior changes.
- **24.6 Final**: full gate, responsive smoke, secrets/artifacts scan.

### 9.2 Final Gate

Run the final gate in this order unless a future execution prompt specifies otherwise:

```sh
npm run lint
npm run test
npm run test:e2e
npm run test:full
npm run build
npx tsc -p tsconfig.api.json --noEmit
git diff --check
```

`npm run test:full` repeats the fast and E2E layers after earlier focused work. Keep it in the final gate because Phase 24 heavily changes navigation and visible surfaces.

### 9.3 Responsive And Browser Smoke

For visible UI stages, verify:

- desktop viewport
- tablet-like viewport
- narrow mobile viewport around 390px
- no document-level horizontal overflow
- no obvious overlapping controls/text
- primary navigation focus/active states
- subtab focus/active states
- modal/dialog behavior if touched
- no critical console errors

### 9.4 Resource Safety

Use:

- one Vite dev server
- one Playwright worker by default
- minimal browser contexts
- sequential heavy gates
- remote cleanup in `finally` paths
- final port/process checks after browser work

Do not commit `test-results/`, `playwright-report/`, screenshots, videos, traces, `.env*`, local auth state, or session artifacts.

---

## 10. Risk Management

### 10.1 Navigation Regression Risk

**Risk:** Moving Practice/Daily entry points breaks launch or resume flows.

**Mitigation:** Add route shell first, keep compatibility routes, preserve Calendar launch requests, and remove Practice from primary nav only in Stage 24.6.

### 10.2 `App.tsx` Integration Risk

**Risk:** `App.tsx` already owns route state, auth, sync, Daily launch, resume capture, multiplayer repository, and expiration timers.

**Mitigation:** Extract `navigationState`, workspace components, and view-model selectors before large route wiring. Keep final `App.tsx` integration coordinator-owned and sequenced.

### 10.3 Multiplayer Repository Risk

**Risk:** Lobby/Live/Active surfaces accidentally change repository writes, realtime subscription behavior, or stale-save protections.

**Mitigation:** Treat these surfaces as projections first. Do not modify repository writes unless required and separately justified. Use real two-client E2E for changed behavior.

### 10.4 Supabase/RLS/Privacy Risk

**Risk:** Live or spectator-like visibility could expose nonparticipant data.

**Mitigation:** Keep Live v0 participant-centric. Pause for explicit schema/RLS review if nonparticipant access needs anything beyond existing safe visibility.

### 10.5 State Persistence Risk

**Risk:** Route/subtab persistence corrupts gameplay state or breaks old localStorage values.

**Mitigation:** Keep navigation persistence UI-only, validated, and disposable. Add corrupted JSON and v1 fallback tests. Do not bump guest/cloud schema for route state.

### 10.6 Test Runtime And Resource Risk

**Risk:** Full E2E plus remote two-client tests are expensive on a memory-pressured Mac.

**Mitigation:** Run focused tests during stages, use one dev server and one Playwright worker, close contexts, perform remote cleanup, and defer full gate until final hardening.

### 10.7 Scope-Creep Risk

**Risk:** Phase 24 expands into notifications, public Live platform, rich replay, social systems, themes, or scoring changes.

**Mitigation:** Use the spec out-of-scope list as a stop condition. Document deferrals to Phase 25+ and halt if a requested behavior needs broader approval.

---

## 11. Documentation And Governance Updates During Execution

When implementation is later authorized, update governance artifacts at the right gate:

- `progress/PROGRESS.csv`: add a row for each major authorized stage/checkpoint.
- `progress/PROGRESS-STEP-*.md`: create or update progress reports with scope, files, verification, known risks, cleanup, and next approval.
- `planning/phase-24/CHANGELOG.md`: update if it is the active phase changelog for user-facing changes.
- `CHANGELOG.md`: update only if the root shim/project convention requires it.
- `agents.md`: update only for durable coordination decisions or phase-gate changes.
- `memory.md`: update only for durable state that future agents need, and never with secrets.
- Phase 24 spec: amend only if the user approves scope changes or implementation discovers a material decision.

This planning step does not require a progress-row update because no implementation, phase execution, or durable code change is being performed.

---

## 12. Parallelization Guidance

Parallel work is optional and should be conservative.

Safe read-only lanes before implementation:

- Requirements extraction.
- Architecture mapping.
- Test/risk mapping.

Potential implementation lanes after Stage 24.1:

- **Solo lane**: `src/solo/` modules and solo view models.
- **Multiplayer view-model lane**: lobby/active/recent/Live selectors with no repository writes.
- **History lane**: `src/history/` view models and route components.
- **Verification/docs lane**: focused tests, browser smoke checklist, progress drafts.

Coordinator-owned surfaces:

- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/ui/Navigation.tsx`
- final route wiring
- progress/changelog/governance files

Do not assign two writers to the same high-conflict surface at the same time.

---

## 13. Open Decisions Before Implementation

These decisions should be resolved before or during Stage 24.0.

1. **Daily label**: Recommended decision is user-facing `Daily`, while preserving `calendar` route id compatibility.
2. **Home dashboard depth**: Recommended decision is to keep Home lightweight in Phase 24 and defer richer dashboard widgets to Phase 25.
3. **Live v0 nonparticipant behavior**: Recommended decision is participant-centric Live v0 unless existing authorization clearly supports read-only spectator access without schema/RLS changes.
4. **History detail depth**: Recommended decision is filterable summary rows only; rich replay/review is deferred.
5. **Execution packaging**: Recommended decision is staged checkpoints or staged PRs rather than one large all-or-nothing change. Commits, PRs, and pushes still require explicit user authorization.

No open decision blocks review of this implementation plan. Implementation should not begin until the user explicitly authorizes execution.

---

## 14. Final Handoff Requirements For Phase 24 Execution

When Phase 24 is eventually implemented, the final report should include:

- Final branch and worktree status.
- Files changed, grouped by stage.
- Behavior implemented.
- Scope explicitly deferred.
- Verification commands and results.
- Real two-client Supabase E2E evidence and cleanup status for changed multiplayer behavior.
- Responsive/browser smoke results.
- Secrets/artifact scan result.
- Progress/changelog/governance files updated.
- Confirmation that the original stable `brrrdle` repository was not changed.
- Exact user approval needed for any next step.

Then halt for user review.
