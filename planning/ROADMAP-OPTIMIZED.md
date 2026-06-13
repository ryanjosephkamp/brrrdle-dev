# brrrdle Optimized Development Roadmap

**Status**: Proposed optimized roadmap for review  
**Last Updated**: 2026-06-12  
**Repository Target**: `brrrdle-dev`  
**Source Roadmap**: `planning/ROADMAP.md`  
**Purpose**: Refine the long-term roadmap into a lower-risk execution strategy, with Phase 24 broken into concrete stages and explicit success criteria.

---

## Authority And Scope Notes

This document is a planning artifact. It does not authorize implementation by itself. Future execution should still follow:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/README.md`.
5. `planning/IMPLEMENTATION-PLAN.md`.
6. `planning/phase-24/IMPLEMENTATION-PLAN.md`.
7. `planning/testing/TESTING-SUITE.md`.
8. `progress/PROGRESS.csv` and the latest progress report.

All Phase 24+ development should happen in `brrrdle-dev`. The original `brrrdle` repository remains the stable reference repository unless the user explicitly authorizes work against it.

---

## Optimized Phase Map

| Phase | Optimized Focus | Primary Outcome | Recommendation |
| --- | --- | --- | --- |
| Phase 24 | Navigation and playable workspaces | Solo and Multiplayer become first-class, stable app areas with subtabs, active-game galleries, lobby access, and a scoped History/Live foundation | Execute in staged PR-sized increments |
| Phase 25 | Real-time engagement and dashboard depth | Turn notifications, richer active-game dashboard, stronger lobby/live updates, spectator presence hardening | Defer volatile real-time/social depth from Phase 24 |
| Phase 26 | History, review, and visual polish | Rich global History, review screens, filtering, theme/skin depth, visual consistency | Build after Phase 24 navigation and Phase 25 engagement data stabilize |
| Phase 27+ | Expansion | New modes, deeper social/community systems, marketplace/consumables expansion, advanced live/spectator experiences | Keep future-facing and separately scoped |

The key optimization is to make Phase 24 a navigation and workspace migration, not a full social/live-platform phase. Phase 24 should create the durable places where later features live, while only shipping the live/spectator behavior that can be delivered safely on top of the existing multiplayer model.

---

## Phase 24 North Star

Phase 24 should make the app easier to understand and return to:

- Solo play has a dedicated workspace instead of being split between Calendar and Practice.
- Multiplayer has a dedicated workspace instead of being embedded in Calendar and Practice.
- Practice is no longer a main tab; Practice becomes a sub-area under Solo and Multiplayer.
- Daily remains available as a calendar/routing hub, while Daily gameplay is also reachable from Solo and Multiplayer.
- Active games are visible and resumable without hunting through mode-specific screens.
- Lobby discovery is centralized under Multiplayer.
- History begins as a dedicated main tab with a useful v1 surface, without requiring a complete replay/archive product in the first pass.

Phase 24 must not change core gameplay rules, scoring, rating/ELO rules, Daily Multiplayer invariants, Supabase security posture, or production deployment configuration unless a later approved spec explicitly authorizes that specific change.

---

## Phase 24 Stage Plan

### Stage 24.0 - Phase 24 Definition And Baseline

**Goal**: Convert the roadmap into an approved Phase 24 execution spec before touching implementation code.

**Deliverables**:

- Update `planning/phase-24/IMPLEMENTATION-PLAN.md` with the approved Phase 24 scope.
- Add a Phase 24 source spec under `planning/specs/phase-24/`.
- Add the next progress ledger entry in `progress/PROGRESS.csv`.
- Record baseline route map, active files, and verification commands.
- Confirm whether Phase 24 is one PR or multiple staged PRs.

**Recommended verification**:

- `git status --short --branch`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`

**Exit gate**:

- Halt for user review before implementation.

### Stage 24.1 - Navigation Shell And Route Model

**Goal**: Add the future navigation shape without moving gameplay yet.

**Recommended implementation scope**:

- Introduce main route IDs for `solo`, `multiplayer`, and `history`.
- Keep `calendar`, `settings`, `word-explorer`, `feedback`, `about`, and admin access intact.
- Keep legacy/deep-link route IDs for `practice`, `og-daily`, and `go-daily` as compatibility redirects or hidden routes.
- Add a reusable subtab control pattern that supports route-local state.
- Persist selected main route and selected subtab independently.

**Likely files**:

- `src/app/routes.ts`
- `src/app/App.tsx`
- `src/ui/Navigation.tsx`
- New focused route/subtab helpers under `src/app/` or `src/ui/`
- Existing route tests and new navigation tests

**Risk controls**:

- Do not move gameplay components in this stage.
- Preserve current Calendar and Practice behavior during the shell change.
- Verify mobile navigation wrapping and keyboard focus order.

**Exit gate**:

- User can see the new top-level navigation structure, but existing play flows still work through old surfaces.

### Stage 24.2 - Solo Workspace

**Goal**: Make Solo the primary home for Daily Solo and Practice Solo without changing gameplay rules.

**Required subtabs**:

- `Overview`: quick actions, active solo games, recent solo completions.
- `Daily`: Daily OG and Daily GO entry points.
- `Practice`: Practice OG and Practice GO entry points.
- `Active`: active solo game gallery.

**Recommended implementation scope**:

- Extract solo-specific orchestration out of the old Practice/Calendar surfaces only as much as needed.
- Keep existing `OgGame` and `GoGame` components as the gameplay engines.
- Use existing `resumeSlots` and `guestProgress.history` as the first data source for active/recent solo cards.
- Preserve Daily Solo fixed five-letter behavior and Practice Solo word lengths 2 through 35.
- Preserve coin, XP, consumable, Pay-to-Continue, definitions, sharing, Hard Mode, and settings behavior.

**Likely files**:

- New `src/solo/` or focused `src/app/solo/` components
- `src/app/App.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/account/storageSchema.ts` only if a carefully justified data-shape addition is required
- Existing solo/unit/component tests plus new route/subtab tests

**Risk controls**:

- Avoid changing canonical session logic in `src/game/`.
- If gallery cards need board previews, derive them from serialized sessions through existing domain helpers instead of duplicating tile-color logic.
- Do not remove Calendar daily access yet; keep it as a routing/calendar hub while Solo stabilizes.

**Exit gate**:

- Solo Daily and Solo Practice are playable from Solo subtabs.
- Existing Daily/Practice compatibility paths still work or redirect cleanly.

### Stage 24.3 - Multiplayer Workspace And Lobby

**Goal**: Make Multiplayer the primary home for Daily Multiplayer, Practice Multiplayer, active multiplayer games, and open lobbies.

**Required subtabs**:

- `Overview`: quick actions, active multiplayer games, recent multiplayer results, lobby snapshot.
- `Daily`: Daily Multiplayer OG and GO.
- `Practice`: Practice Multiplayer OG and GO with time-limit options.
- `Active`: active multiplayer game gallery.
- `Lobby`: open lobby table.
- `Live`: scoped foundation only; see Stage 24.5.

**Recommended implementation scope**:

- Reuse the existing `MultiplayerPanel` behavior before replacing it.
- Split panel responsibilities only where it reduces risk: setup controls, game list/active selection, lobby list, game surface.
- Expose open lobbies from existing multiplayer state and repository seams where possible.
- Keep Daily Multiplayer strictly asynchronous, five-letter, UTC-day keyed, no-clock, no-Hard-Mode-lobby-control, answer-separated, and claim-safe.
- Preserve Practice Multiplayer time-limit and Hard Mode behavior.

**Likely files**:

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayerRepository.ts`
- New `src/multiplayer/*Lobby*` and `src/multiplayer/*Gallery*` components as needed
- Multiplayer component/domain tests and Playwright multiplayer specs

**Risk controls**:

- Do not change scoring, rating/ELO, settlement rules, timeout precedence, or forfeit precedence.
- Keep `playerSessions` canonical per viewer; shared projections remain display/compatibility plumbing.
- Pair multiplayer browser claims with real two-client Supabase-backed E2E and remote row cleanup.
- Avoid schema migrations unless the existing repository model cannot support the approved UI; any migration needs explicit review.

**Exit gate**:

- Daily and Practice Multiplayer are playable from Multiplayer subtabs.
- Lobby discovery works for open joinable games.
- Active multiplayer games are visible and resumable.

### Stage 24.4 - History Tab V1 And Recent Result Links

**Goal**: Add a global History main tab that is useful immediately, while deferring rich replay/review depth.

**Recommended Phase 24 scope**:

- Add a `History` main tab.
- Show solo history from existing `guestProgress.history`.
- Show available multiplayer result summaries from existing multiplayer/competitive state.
- Add filters for at least Solo vs Multiplayer and OG vs GO.
- Link recent completed-game cards from Solo and Multiplayer overview subtabs to the History tab.
- For individual game links, provide the best available detail view from existing data. If full board replay is not reliably available for every source, show a stable summary rather than inventing incomplete replay behavior.

**Deferred from Phase 24**:

- Full historical board replay for every game type.
- Advanced search, export, and share-from-history flows.
- Long-term cloud history normalization if it requires schema changes.

**Likely files**:

- New `src/history/` or `src/app/history/` components
- `src/account/storageSchema.ts` only if a narrow, backward-compatible addition is approved
- `src/stats/` selectors if reusable history derivation already exists there
- Route tests and component tests

**Risk controls**:

- Treat history records as display data; do not mutate stats/economy from the History tab.
- Avoid changing completion recording semantics during the first History pass.

**Exit gate**:

- History is a real route with useful filters and recent-result navigation, but rich replay remains optional later work.

### Stage 24.5 - Live Subtab V0

**Goal**: Ship a safe Live foundation without trying to complete the full real-time spectator product in Phase 24.

**Recommended Phase 24 scope**:

- Add the Live subtab under Multiplayer.
- Show a scoped list/gallery of currently active multiplayer games already visible to the current user.
- Let participants click their own active games to resume play.
- If existing spectator infrastructure can support it without schema/RLS changes, allow nonparticipants to open a read-only spectator view for eligible games.
- Show clear empty, loading, unavailable, and auth-required states.

**Explicitly defer from Phase 24 unless separately approved**:

- Public global live game discovery.
- Full real-time board and keyboard snapshot gallery for all users.
- Spectator presence counts visible to all players and spectators.
- Sorting/filtering beyond a small safe default.
- Completed-game result hold/removal timing for public gallery behavior.
- Any new social graph, notification, leaderboard, or public profile dependency.

**Reason for deferral**:

Live gallery and spectator presence are real-time/social surfaces. They touch visibility rules, RLS expectations, realtime subscriptions, privacy, and resource use. These should follow after the Multiplayer workspace and lobby routing are stable.

**Exit gate**:

- Live has a stable product location and participant-resume/read-only foundation, with richer public spectator behavior moved to Phase 25.

### Stage 24.6 - Cleanup, Compatibility, And Final Hardening

**Goal**: Remove or redirect the old Practice main tab only after Solo and Multiplayer replacements are verified.

**Recommended implementation scope**:

- Remove Practice from primary navigation.
- Keep old `practice` route compatibility as a redirect to Solo Practice or a hidden route with clear fallback behavior.
- Ensure Daily remains a calendar/routing hub and does not become the only daily play path.
- Update docs, progress records, changelog, and any route/help copy.
- Run full verification and responsive smoke.

**Required final gate**:

- Halt for user review with verification results, known limitations, and explicit next-step approval request.

---

## Phase 24 Success Criteria

Phase 24 is complete only when all of the following are true:

1. **Navigation structure**: Primary navigation includes Solo, Multiplayer, Daily/Calendar, History, and existing support/admin routes as appropriate. Practice is no longer a primary tab after compatibility is in place.
2. **Solo workspace**: Solo Overview, Daily, Practice, and Active subtabs exist; Solo Daily OG/GO and Solo Practice OG/GO are playable from the Solo workspace.
3. **Multiplayer workspace**: Multiplayer Overview, Daily, Practice, Active, Lobby, and Live subtabs exist; Daily Multiplayer OG/GO and Practice Multiplayer OG/GO are playable from the Multiplayer workspace.
4. **Lobby v1**: Joinable lobbies are visible in a dedicated Multiplayer Lobby subtab with enough metadata for a player to choose and join safely.
5. **Active-game galleries**: Active Solo and Active Multiplayer surfaces show resumable games without corrupting in-progress state.
6. **History v1**: A global History route exists with useful solo/multiplayer result lists and links from recent-result sections.
7. **Live v0**: Live has a stable subtab and at least participant-resume behavior; any richer spectator/public-gallery work not completed is explicitly documented as deferred.
8. **State persistence**: Switching main tabs and subtabs preserves in-progress gameplay state, selected subtabs, typed drafts where existing behavior supports it, and active game selections.
9. **Backward compatibility**: Existing deep links and hidden routes either continue to work or redirect predictably. Existing saved guest/cloud progress loads without data loss.
10. **Gameplay invariants**: Core OG/GO rules, Daily fixed-five behavior, Practice 2-35 lengths, Hard Mode, definitions, sharing, stats/economy, Daily Multiplayer claims, timeout/forfeit precedence, GO transitions, and keyboard color precedence remain intact.
11. **Security and privacy**: No secrets are committed. Any new Supabase access pattern preserves RLS and does not expose service-role or private user data to clients.
12. **Accessibility and responsiveness**: Primary navigation, subtabs, galleries, lobby, and history are keyboard-accessible, screen-reader understandable, and usable on narrow mobile, tablet-like, and desktop viewports.
13. **Verification**: The full existing gameplay testing suite passes after Phase 24 changes:
    - `npm run lint`
    - `npm run test`
    - `npm run test:e2e`
    - `npm run test:full`
    - `npm run build`
    - `npx tsc -p tsconfig.api.json --noEmit`
    - `git diff --check`
14. **Real multiplayer evidence**: Any changed multiplayer behavior is verified with real two-client Supabase-backed Playwright E2E plus remote row/user cleanup when credentials are available.
15. **Review handoff**: Progress records and docs identify what shipped, what was deferred, verification results, and the exact approval needed for the next phase.

---

## Recommended Deferrals

### Defer To Phase 25

- Full notification system, especially multiplayer turn notifications.
- Public Live gallery with broad game discovery.
- Spectator presence counts visible to participants and other spectators.
- Rich sorting/filtering for Live and Lobby beyond the simplest useful filters.
- Dashboard widgets that require new realtime aggregation or background polling.

**Why**: These features are event-driven and visibility-sensitive. They should build on the stable Multiplayer workspace and route model from Phase 24.

### Defer To Phase 26

- Full game replay/review for all historical solo and multiplayer games.
- Advanced History search, export, and analytics.
- Comprehensive theme/skin system beyond existing theme foundations.
- Larger visual-system cleanup across every route.

**Why**: These depend on stable navigation, stable history data shape, and a clear destination for review screens.

### Defer To Phase 27+

- Additional game modes or variants.
- Marketplace and expanded consumables.
- Social graph, community systems, bots, leaderboards, public profiles, or large competitive-system expansion.
- New scoring/rating/ELO rules.

**Why**: These are product expansions, not prerequisites for the Phase 24 navigation/workspace migration.

---

## Architecture Strategy

### Preserve Core Gameplay Boundaries

Do not rewrite the game engines for navigation work. `OgGame`, `GoGame`, `src/game/`, and multiplayer reducers should remain stable unless a focused bug fix is necessary and explicitly in scope.

### Use Derived View Models For Galleries

Active-game galleries and history lists should use pure selectors/view-model functions. Board preview cards should consume canonical serialized session data and existing tile-state helpers rather than recomputing Wordle coloring in UI components.

### Keep Route State Separate From Game State

Main route, subtab, selected active game, and selected history filters should be local UI/navigation state. They should not alter persisted gameplay state except where existing resume/completion flows already do.

### Extract Panels Gradually

`App.tsx`, `CalendarPanel`, and `MultiplayerPanel` are high-conflict surfaces. Phase 24 should extract focused components gradually:

- Solo workspace components.
- Multiplayer subtab shell components.
- Lobby table component.
- Active-game gallery components.
- History v1 components.

Avoid a single large rewrite that moves all routing, state, and game rendering at once.

### Treat Supabase Schema Changes As Exceptional

The existing migrations already provide async multiplayer, live multiplayer, claims, and spectator foundations. Phase 24 should first attempt to deliver Lobby and Live v0 with existing tables and repository seams. If a schema change becomes necessary, pause for a narrow migration plan with RLS review and real remote verification.

---

## High-Level Execution Strategy

1. **Create the executable Phase 24 spec** from this optimized roadmap and the original roadmap.
2. **Add tests before source movement** for route visibility, subtab persistence, and compatibility redirects.
3. **Ship navigation shell first** while keeping old Calendar/Practice behavior intact.
4. **Move Solo surfaces next** because they are mostly local/guest-progress driven and carry lower realtime risk.
5. **Move Multiplayer surfaces after Solo** because they require auth, repository sync, realtime behavior, and two-client E2E.
6. **Add History v1 after active/recent selectors exist** so history links can reuse those view models.
7. **Add Live v0 last** and keep it small; do not let public spectator depth block Phase 24 completion.
8. **Only remove Practice from primary nav at the end** after replacement paths are verified.
9. **Run focused verification after each stage** and the full gate at the end.
10. **Halt at every required review gate** with explicit deferrals and known limitations.

---

## Suggested Future Phase Definitions

### Phase 25 - Engagement, Notifications, And Live Depth

Focus:

- Multiplayer turn notifications.
- Refined landing dashboard widgets.
- Public Live gallery if approved.
- Spectator presence and visibility rules.
- Better lobby/live filtering.

Primary risk:

- Realtime load, privacy, and notification lifecycle.

Primary verification:

- Two-client and spectator-context Playwright E2E with remote Supabase probes and cleanup.

### Phase 26 - History, Review, And Visual Polish

Focus:

- Rich global History.
- Per-game review/replay surfaces.
- Better filtering/search.
- Visual consistency and theme/skin expansion.

Primary risk:

- Data-shape drift and brittle visual/UI changes.

Primary verification:

- History selector tests, route/component tests, responsive smoke, and full gameplay suite.

### Phase 27+ - Expansion

Focus:

- New modes.
- Marketplace or expanded consumables.
- Social/community systems.
- Advanced competitive or spectator experiences.

Primary risk:

- Scope creep and rule-system coupling.

Primary verification:

- New phase-specific specs, domain tests first, real multiplayer E2E where relevant, and explicit approval before any scoring/rating/economy changes.

---

## Phase 24 Non-Goals

Do not include these in Phase 24 unless the user explicitly changes scope:

- New game modes.
- Variable Daily word lengths.
- New scoring, rating, or ELO rules.
- Full public social graph or profiles.
- Bots or matchmaking overhaul.
- Production deployment or release.
- Broad visual redesign unrelated to navigation usability.
- Database migrations without a narrow approved need.
- Any work against the original stable `brrrdle` repository.

---

## Final Recommendation

Approve Phase 24 as a staged navigation/workspace migration with a small Live foundation, not a full realtime social release. This gives the project the structural tabs and subtabs the roadmap wants while protecting the stable gameplay base and keeping the most failure-prone real-time/spectator work behind later, better-informed gates.

**End of Optimized Roadmap**
