# Phase 25 Planning Brief - Engagement, Notifications, And Dashboard Improvements

**Status**: Planning brief for review
**Repository**: `brrrdle-dev`
**Created**: 2026-06-14
**Authority**: This document is a planning artifact only. It does not authorize implementation, source changes, migrations, deployment, PR work, release work, or work against the original stable `brrrdle` repository.

## 1. Context

Phase 24 completed the navigation and workspace restructuring for Solo, Multiplayer, History, Lobby, and Live v0. The pre-Phase-25 Multiplayer OG solved-row hold bugfix then closed a small terminal-transition gap without changing gameplay mechanics.

Phase 25 should build on those foundations rather than broadening the game model. The recommended focus is a sharper "what needs my attention?" layer: a useful Home dashboard, in-app notifications, turn attention cues, and conservative freshness improvements for existing Multiplayer surfaces.

## 2. Recommended Product Outcome

Players should be able to open the app and quickly understand:

- which games are active;
- which Multiplayer games are waiting on them;
- whether Daily Solo or Daily Multiplayer needs attention;
- whether there are joinable lobbies;
- what recently finished;
- where to resume or review without hunting through tabs.

This should feel like an operational command center for the existing game, not a new social platform or a rewrite of gameplay.

## 3. Goals

1. Add a Home dashboard v1 that summarizes active Solo games, active Multiplayer games, turn attention, Daily availability, open lobbies, Live v0 availability, and recent results.
2. Add an in-app notification/attention model for multiplayer turns, completed games, Daily reset nudges, and relevant lobby/game state changes.
3. Keep notification state local-first and consent-aware.
4. Improve Multiplayer workspace attention cues without changing Multiplayer rules.
5. Preserve Phase 23 and Phase 24 gameplay guarantees, route compatibility, and test coverage.

## 4. Recommended In-Scope Work

### 4.1 Home Dashboard V1

- Replace the current Home mode-card-only surface with a compact dashboard plus quick actions.
- Reuse existing selectors/view models from Solo, Multiplayer, History, Lobby, and Live v0.
- Show active game summaries with direct resume links.
- Surface "your turn" Multiplayer games where existing canonical state supports it.
- Show Daily Solo and Daily Multiplayer availability/reset state using existing Daily timing behavior.
- Show a small open-lobby summary and link to Multiplayer Lobby.
- Show recent results with links into History.

### 4.2 In-App Notifications V0

- Create a notification/attention view model derived from existing game state.
- Support local read/dismiss state for in-app notification items.
- Candidate notification types:
  - Multiplayer game became your turn.
  - Multiplayer game completed.
  - Daily Solo reset is available.
  - Daily Multiplayer reset is available.
  - A lobby or active game state needs attention.
- Keep delivery in-app first. Do not introduce push infrastructure in the first Phase 25 pass.

### 4.3 Navigation Badges And Workspace Cues

- Add restrained badges/counts to Home, Multiplayer, and possibly Solo navigation when there is actionable state.
- Add "your turn" and "completed" cues inside Multiplayer Overview and Active Games.
- Preserve the existing subtab persistence model.

### 4.4 Conservative Lobby/Live Freshness

- Add low-risk freshness indicators such as updated labels, participant-owned active counts, and restricted-game messaging where existing data already supports it.
- Do not expand public spectator behavior or RLS exposure as part of Phase 25 unless a later spec explicitly approves it.

### 4.5 Settings/Preferences V0

- Define settings for in-app notifications and dashboard attention behavior.
- Prefer local UI state or existing settings patterns.
- Avoid guest/cloud schema version changes unless a later spec proves they are necessary and narrowly scoped.

## 5. Explicitly Out Of Scope

- Production deployment, release work, PR merge work, or Vercel/Supabase configuration unless separately authorized.
- Supabase migrations or RLS changes unless a later Phase 25 spec identifies a narrow need and the user explicitly approves it.
- Push notification infrastructure, service-worker push delivery, email, SMS, or cross-device notification sync.
- Expanded public Live gallery, public spectator presence, chat, social graph, friends, profiles, leaderboards, marketplace, rewards, or matchmaking redesign.
- Gameplay rule changes, scoring/rating/ELO changes, timeout/forfeit changes, Daily claim behavior changes, Hard Mode changes, GO transition changes, keyboard-state changes, or core game-domain rewrites.
- Broad redesign of Solo, Multiplayer, History, Lobby, or Live v0 beyond attention/dashboard refinements.

## 6. Recommended Stage Breakdown

### Stage 25.0 - Spec, Implementation Plan, And Baseline

Purpose: Turn this brief into a full Phase 25 spec and implementation plan, then establish a clean baseline.

Deliverables:

- Unified Phase 25 spec.
- Detailed Phase 25 implementation plan.
- Baseline progress report.
- Baseline verification using the repo-standard lightweight gate.

Exit gate:

- User approves the spec and implementation plan before source changes begin.

### Stage 25.1 - Dashboard And Notification View Models

Purpose: Build the data layer before UI changes.

Likely deliverables:

- Dashboard view models for active Solo, active Multiplayer, turn attention, Daily availability, lobbies, Live v0, and recent results.
- Notification/attention selectors derived from existing state.
- Focused unit tests for selector behavior.

Likely files/modules:

- `src/solo/soloViewModels.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/history/historyViewModels.ts`
- possible new `src/dashboard/dashboardViewModels.ts`
- possible new `src/notifications/notificationViewModels.ts`

Exit gate:

- Selector tests pass and no gameplay/domain behavior has changed.

### Stage 25.2 - Home Dashboard V1

Purpose: Replace the lightweight Home surface with a useful dashboard.

Likely deliverables:

- Dashboard component and layout.
- Quick resume/review links into existing routes/subtabs.
- Responsive desktop/tablet/mobile layout.
- Accessibility-focused heading/link/button semantics.

Likely files/modules:

- `src/app/App.tsx`
- possible new `src/dashboard/DashboardHome.tsx`
- `src/app/navigationState.ts`
- `src/index.css`
- focused dashboard/component tests

Exit gate:

- Home dashboard works without disrupting Solo, Multiplayer, Daily/Calendar, History, or support routes.

### Stage 25.3 - In-App Notifications V0

Purpose: Add local, visible attention items without browser push complexity.

Likely deliverables:

- Notification center or compact attention panel.
- Read/dismiss behavior.
- Settings for in-app notification visibility where appropriate.
- Tests for notification derivation and dismiss/read persistence.

Likely files/modules:

- possible new `src/notifications/`
- `src/account/storageSchema.ts` only if a narrow settings addition is approved
- `src/app/navigationState.ts` or another local UI-state surface
- `src/ui/`

Exit gate:

- In-app notifications are derived from existing state, do not mutate gameplay state, and remain local-first.

### Stage 25.4 - Multiplayer Turn Attention And Freshness Cues

Purpose: Make Multiplayer activity easier to scan while preserving Multiplayer semantics.

Likely deliverables:

- "Your turn" cues in Multiplayer Overview and Active Games.
- Completion cues and recent result links where existing data supports them.
- Lobby and Live v0 freshness labels.
- Focused tests plus real two-client Supabase-backed E2E if create/join/resume/visibility behavior changes.

Likely files/modules:

- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerLobby.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/multiplayerViewModels.ts`

Exit gate:

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.

### Stage 25.5 - Optional Browser Notification Feasibility Decision

Purpose: Decide whether browser notifications are safe enough for Phase 25.

Recommendation:

- Treat browser Notification API work as optional and separately gated.
- If implementation requires service-worker push, server-side scheduling, new Supabase tables, or cross-device sync, defer it beyond Phase 25.
- If it can remain a simple foreground/local permission experiment, write a narrow addendum before implementation.

Exit gate:

- User explicitly approves or defers browser notifications.

### Stage 25.6 - Final Hardening

Purpose: Clean up, verify, document, and prepare a reviewable handoff.

Deliverables:

- Final documentation/progress updates.
- Responsive browser smoke for Home, Solo, Multiplayer, Daily/Calendar, History, Lobby, and Live v0.
- Full final verification gate.

Exit gate:

- Phase 25 is ready for Git handoff only after explicit user authorization.

## 7. Success Criteria

Phase 25 should be considered successful only if:

- The full existing gameplay testing suite continues to pass.
- The dashboard helps players resume or review active/recent games without changing gameplay state.
- In-app notifications and badges are accurate, dismissible where appropriate, and not noisy.
- Daily Multiplayer invariants are preserved:
  - strictly asynchronous;
  - five-letter;
  - UTC-day keyed;
  - no clocks;
  - no Daily Hard Mode lobby control;
  - answer-separated;
  - claim-safe.
- Practice Multiplayer Hard Mode, time limits, scoring, timeout, forfeit, rating/ELO, GO transitions, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain intact.
- Route/subtab persistence from Phase 24 remains intact.
- Notification/dashboard state stays separate from gameplay state.
- Accessibility and responsive behavior are verified on desktop, tablet, and mobile.
- No secrets, `.env.local`, tokens, Supabase keys, Vercel tokens, screenshots, videos, traces, auth state, or local session artifacts are committed.

## 8. Verification Strategy

Each implementation stage should run focused tests for the touched selectors/components first. Final Phase 25 hardening should run the full gate:

- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run test:full`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check
- secrets/artifact sanity check
- desktop/tablet/mobile browser smoke

If Phase 25 changes Multiplayer create/join/resume/visibility/turn behavior, run real two-client Supabase-backed Playwright E2E with cleanup when credentials are available.

## 9. Architecture Notes

- Keep `App.tsx` as orchestration, not the dashboard implementation.
- Prefer new dashboard/notification components and selectors over embedding broad dashboard logic in `App.tsx`.
- Reuse existing Phase 24 selectors before adding new state:
  - `src/solo/soloViewModels.ts`
  - `src/multiplayer/multiplayerViewModels.ts`
  - `src/history/historyViewModels.ts`
- Keep route/UI state separate from gameplay state.
- Do not duplicate game logic to infer results, turns, or completion states.
- Preserve `OgGame`, `GoGame`, `src/game/`, multiplayer reducers, and repository seams unless a later approved spec identifies a narrow need.

## 10. Risks And Mitigations

- **Scope creep into push/social systems**: Keep Phase 25 in-app and local-first unless separately approved.
- **Notification accuracy risk**: Derive notifications from canonical selectors and add unit tests for edge cases.
- **App.tsx complexity risk**: Extract dashboard and notification components early.
- **State persistence risk**: Avoid schema version bumps unless justified. Prefer local route/UI state for dismissals and filters.
- **Realtime/performance risk**: Avoid background polling loops. Reuse existing repository/subscription state.
- **Privacy/RLS risk**: Do not expand public Live or spectator behavior without a dedicated schema/RLS review.
- **Test-runtime risk**: Run focused tests during stages and reserve full gates for hardening or meaningful checkpoints.

## 11. Open Decisions

These decisions should be resolved in the full Phase 25 spec before implementation:

1. Should Phase 25 stay strictly in-app for notifications, or should a separately gated browser Notification API experiment be included?
   - Recommendation: in-app first; browser notifications optional and later-gated.
2. Should dashboard widgets live only on Home, or should persistent compact widgets appear on other tabs?
   - Recommendation: Home dashboard first, with small nav badges only where low-risk.
3. Should notification read/dismiss state be local-only or synced across devices?
   - Recommendation: local-only first; sync deferred.
4. Should Phase 25 include any expansion of public Live/spectator behavior?
   - Recommendation: no; keep Live v0 participant-safe and defer public expansion.

No decision above blocks creating a full Phase 25 spec for review.

## 12. Recommended Next Gated Action

Create a unified Phase 25 specification from this planning brief, the roadmap, Phase 24 completion materials, and the pre-Phase-25 bugfix records.

The spec should define final scope, success criteria, stage gates, verification requirements, open decisions, and exact boundaries before any Phase 25 implementation begins.
