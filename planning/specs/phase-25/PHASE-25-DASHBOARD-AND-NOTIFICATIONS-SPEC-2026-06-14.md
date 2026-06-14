# Phase 25 Dashboard And Notifications Specification

**Status**: Unified Phase 25 specification for review
**Repository**: `brrrdle-dev`
**Created**: 2026-06-14
**Authority**: This is a planning/specification document only. It does not authorize implementation, test implementation, database migrations, Vercel or Supabase configuration, deployment, commits, pushes, PR creation, merge, release, branch deletion, new custom skills, or work against the original stable `brrrdle` repository.

## 1. Status And Authority

Phase 25 targets the independent `brrrdle-dev` repository:

`/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`

All Phase 25 execution must follow current user instructions, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, this specification, the future Phase 25 implementation plan, `planning/testing/TESTING-SUITE.md`, and the progress ledger.

This specification is review material. A future prompt must explicitly authorize implementation planning, baseline verification, source changes, Git handoff, deployment, or any protected action.

## 2. Source Inputs

This spec reconciles:

- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `planning/phase-25/PLANNING-BRIEF.md`
- Phase 24 completion evidence in `planning/phase-24/CHANGELOG.md`, `planning/phase-24/IMPLEMENTATION-PLAN.md`, and `progress/PROGRESS-STEP-155.md`
- the pre-Phase-25 Multiplayer OG solved-row hold bugfix spec and evidence in `planning/specs/pre-phase-25/MULTIPLAYER-OG-SOLVED-ROW-HOLD-FIX-SPEC-2026-06-14.md` and `progress/PROGRESS-STEP-157.md`
- current app surfaces around navigation, workspaces, view models, local settings, and multiplayer state.

Current Phase 24 foundations available to Phase 25:

- first-class Solo, Multiplayer, Calendar, and History routes;
- Solo workspace subtabs and active/recent result selectors;
- Multiplayer workspace subtabs, Active Games, Lobby, participant-safe Live v0, and recent result selectors;
- History v1 filters and rows;
- route/subtab/selected-game persistence in `src/app/navigationState.ts`;
- Daily Solo and Daily Multiplayer countdown/reset hooks in `src/app/App.tsx`;
- guest settings for Daily countdown toggles in `src/account/storageSchema.ts`.

## 3. Product Outcome

Phase 25 should make the app feel more aware and useful when a player returns.

The player should be able to open Home and immediately understand:

- which Solo and Multiplayer games are active;
- which Multiplayer games are waiting on them;
- whether Daily Solo or Daily Multiplayer is ready;
- whether there are open lobbies;
- whether Live v0 has participant-owned games to resume;
- which results recently completed;
- where to click next.

Phase 25 should improve engagement through clear, restrained in-app attention cues. It should not become a public social system, notification infrastructure project, or gameplay rewrite.

## 4. Goals

1. Build a Home dashboard v1 that summarizes the player-relevant state already exposed by Phase 24 workspaces.
2. Add in-app notification/attention foundations for Daily resets, Multiplayer turns, game completion, and joinable/resumable multiplayer state.
3. Add restrained navigation badges and workspace cues where they make actionable state easier to scan.
4. Improve Lobby and Live v0 freshness only through existing safe state projections.
5. Keep route/UI notification state separate from gameplay state.
6. Preserve all gameplay rules, multiplayer invariants, persistence guarantees, and the existing testing suite.

## 5. Final Scope

### 5.1 In Scope

Phase 25 includes:

- Home dashboard v1:
  - active Solo games;
  - active Multiplayer games;
  - "your turn" Multiplayer summaries where existing state supports it;
  - Daily Solo availability/reset state;
  - Daily Multiplayer availability/reset state;
  - open Lobby summary;
  - participant-safe Live v0 summary;
  - recent Solo and Multiplayer results with links to History.
- Dashboard and notification view models/selectors derived from existing canonical state.
- In-app notifications v0:
  - local notification/attention items;
  - read/dismiss state;
  - action links into existing routes/subtabs;
  - Daily reset, Multiplayer turn, game completion, and relevant lobby/active-game attention types.
- Navigation/workspace cues:
  - small badges or counts for actionable state;
  - "your turn" and completion cues in Multiplayer Overview and Active Games;
  - conservative freshness labels in Lobby and Live v0.
- Settings or preferences for in-app attention behavior if they can be added without unsafe schema churn.
- Focused tests and final full verification.

### 5.2 Explicitly Out Of Scope

Phase 25 does not include:

- source/runtime implementation until the user separately authorizes execution;
- push-notification infrastructure;
- service-worker push delivery;
- email, SMS, or external notification channels;
- cross-device notification sync;
- public Live gallery expansion;
- expanded spectator presence or visibility rules;
- chat, friends, social graph, profiles, leaderboards, marketplace, rewards, or new matchmaking systems;
- scoring, rating/ELO, timeout, forfeit, GO transition, Hard Mode, Daily claim, keyboard-state, or core gameplay changes;
- Supabase schema/RLS changes unless a later prompt approves a narrow migration plan;
- Vercel/Supabase configuration, production deployment, release work, or PR/merge work.

### 5.3 Deferred Or Separately Gated

The following may be revisited only with explicit future approval:

- Browser Notification API support.
- Server-side scheduled or push notifications.
- Cross-device notification read/dismiss sync.
- Public spectator gallery and spectator presence.
- Rich Live sorting/filtering beyond simple existing-state freshness.
- Dashboard widgets that require new realtime aggregation, background polling, or schema changes.

## 6. Success Criteria

Phase 25 is successful only if all criteria below are met.

### 6.1 Gameplay And Multiplayer Preservation

- The full existing gameplay testing suite continues to pass.
- Core OG and GO rules remain unchanged.
- Solo Daily remains fixed-five.
- Solo Practice remains 2-35 letters.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged.
- Existing scoring, timeout, forfeit, rating/ELO, GO transition, solved-row hold, and keyboard-state behavior remain unchanged.
- Daily Multiplayer remains:
  - strictly asynchronous;
  - five-letter;
  - UTC-day keyed;
  - no-clock;
  - without Daily Hard Mode lobby control;
  - answer-separated;
  - claim-safe.

### 6.2 Dashboard

- Home shows a useful dashboard instead of only mode cards.
- Dashboard content is derived from existing selectors or new view models that wrap existing selectors.
- Dashboard quick actions route into existing Solo, Multiplayer, Calendar, History, Lobby, Active Games, and Live v0 surfaces.
- Dashboard does not mutate gameplay state except through existing explicit user actions.
- Empty states are useful and not noisy.

### 6.3 Notifications And Attention

- In-app notification items are accurate, local-first, and dismissible/readable where appropriate.
- Notifications have clear action targets or clear non-actionable informational states.
- Notification state does not become the source of truth for gameplay, turn ownership, completion, or claims.
- Notification generation is deterministic from existing state plus local read/dismiss metadata.
- Notification copy is short and does not obscure gameplay.

### 6.4 Navigation And Persistence

- Phase 24 route/subtab persistence remains intact.
- Existing hidden/deep-link compatibility for Practice, Daily OG, and Daily GO remains intact.
- Dashboard and notification routes/actions restore predictable subtabs and selected games.
- Corrupt or stale local UI-state payloads fall back safely.

### 6.5 Accessibility, Privacy, And Security

- Dashboard cards, badges, notification controls, and action links are keyboard accessible.
- Badges are not the only accessible indicator of important state; labels or screen-reader text exist where needed.
- No nonparticipant multiplayer data is exposed beyond existing safe Live v0 restrictions.
- No secrets, `.env.local`, tokens, Supabase keys, Vercel tokens, auth state, screenshots, videos, traces, or local session artifacts are committed or printed.

### 6.6 Verification

- Focused tests pass after each implementation stage.
- Final Phase 25 hardening passes the full gate listed in Section 14.
- Real two-client Supabase-backed Playwright E2E runs when any implementation changes multiplayer create/join/resume/visibility/turn behavior.
- Desktop, tablet, and mobile browser smoke verifies dashboard, navigation, notification, and workspace basics.

## 7. Recommended Stage Breakdown

### Stage 25.0 - Specification, Implementation Plan, And Baseline

Purpose:

- Turn this spec into a detailed implementation plan.
- Establish a protected baseline before source changes.

Deliverables:

- `planning/phase-25/IMPLEMENTATION-PLAN.md`
- progress baseline report
- baseline branch/worktree/remote/resource state
- lightweight baseline verification

Likely files/modules:

- `planning/phase-25/IMPLEMENTATION-PLAN.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

Verification:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`

Exit gate:

- User reviews and explicitly authorizes Stage 25.1 before source changes begin.

### Stage 25.1 - Dashboard And Notification View Models

Purpose:

- Build the projection layer before visible UI work.

Deliverables:

- Dashboard view models for active games, Daily availability, Lobby, Live v0, recent results, and turn attention.
- Notification/attention view models derived from existing state.
- Focused selector tests.

Likely files/modules:

- new `src/dashboard/dashboardViewModels.ts`
- new `src/dashboard/dashboardViewModels.test.ts`
- new `src/notifications/notificationViewModels.ts`
- new `src/notifications/notificationViewModels.test.ts`
- `src/solo/soloViewModels.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/history/historyViewModels.ts`

Verification:

- focused view-model tests
- relevant existing Solo/Multiplayer/History view-model tests
- `npm run test`
- `git diff --check`

Exit gate:

- View models are deterministic, tested, and projection-only.

Stop conditions:

- Turn attention cannot be derived safely from existing state.
- A schema/RLS change appears necessary.
- A selector would duplicate gameplay logic instead of wrapping canonical state.

### Stage 25.2 - Home Dashboard V1

Purpose:

- Replace the lightweight Home surface with a useful return-to-game dashboard.

Deliverables:

- Home dashboard component.
- Dashboard quick actions and summary cards.
- Responsive layout for desktop/tablet/mobile.
- Component tests and browser smoke.

Likely files/modules:

- new `src/dashboard/DashboardHome.tsx`
- possible new `src/dashboard/DashboardHome.test.tsx`
- `src/app/App.tsx`
- `src/app/routes.ts` only if labels/descriptions need small updates
- `src/index.css`
- `src/ui/` components only if a small reusable card/badge/control is needed

Verification:

- focused dashboard/component tests
- existing route/navigation tests
- `npm run lint`
- `npm run test`
- browser smoke for Home dashboard and existing route entry points

Exit gate:

- Dashboard works without disrupting Solo, Multiplayer, Calendar, History, or support routes.

Stop conditions:

- `App.tsx` begins accumulating broad dashboard rendering logic.
- Dashboard navigation breaks hidden Practice or Daily compatibility.

### Stage 25.3 - In-App Notifications V0

Purpose:

- Add local in-app notification and read/dismiss foundations.

Deliverables:

- notification item model/view model;
- notification center, tray, or compact dashboard panel;
- read/dismiss behavior;
- action routing into existing routes/subtabs;
- tests for notification generation and persistence.

Likely files/modules:

- new `src/notifications/NotificationCenter.tsx`
- new `src/notifications/NotificationCenter.test.tsx`
- new or existing `src/notifications/notificationViewModels.ts`
- `src/app/navigationState.ts` or a new local UI-state helper
- `src/account/storageSchema.ts` only if an implementation plan explicitly justifies a settings addition
- `src/ui/`

Verification:

- focused notification tests;
- route/subtab persistence tests if new navigation-state fields are added;
- `npm run test`;
- browser smoke for read/dismiss/action routing.

Exit gate:

- Notifications are visible, useful, local-first, and not gameplay-authoritative.

Stop conditions:

- Browser push, service workers, server scheduling, or cross-device sync becomes necessary.
- Notification state requires a guest/cloud schema version bump without explicit approval.

### Stage 25.4 - Navigation Badges, Workspace Attention, And Freshness

Purpose:

- Add small attention cues to navigation and existing workspaces.

Deliverables:

- nav badge/count strategy;
- Multiplayer "your turn" cues;
- active/completed/freshness labels in Multiplayer Overview, Active Games, Lobby, and Live v0;
- tests for accessible badge labeling and route behavior.

Likely files/modules:

- `src/ui/Navigation.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerLobby.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- dashboard/notification view-model files from Stage 25.1

Verification:

- focused component/view-model tests;
- route/navigation tests;
- real two-client Supabase-backed E2E if create/join/resume/visibility/turn behavior changes;
- browser smoke for desktop/tablet/mobile navigation and workspace cues.

Exit gate:

- Attention cues are accurate, accessible, and do not change multiplayer semantics.

Stop conditions:

- Cues require repository write changes, new realtime polling, schema/RLS changes, or public spectator expansion.

### Stage 25.5 - Optional Browser Notification Decision

Purpose:

- Decide whether browser notifications belong in Phase 25.

Default recommendation:

- Defer browser notifications unless the user explicitly approves a narrow addendum after reviewing in-app notification behavior.

Possible outcomes:

- no-op deferral documented in progress;
- narrow foreground-only Browser Notification API addendum;
- later-phase migration plan if real push infrastructure is desired.

Exit gate:

- User explicitly approves the decision before any browser notification work.

Stop conditions:

- Any path requires service-worker push, server scheduling, new Supabase tables, RLS changes, production configuration, or cross-device sync.

### Stage 25.6 - Cleanup And Final Hardening

Purpose:

- Complete cleanup, documentation, and full verification.

Deliverables:

- final progress report;
- implementation-plan status updates;
- explicit deferred-item list;
- full verification results;
- browser/resource cleanup notes;
- recommended Git handoff prompt.

Verification:

- final full gate in Section 14;
- desktop/tablet/mobile browser smoke;
- secrets/artifact scan;
- resource/process checks.

Exit gate:

- Phase 25 is ready for user review and later explicit Git handoff authorization.

## 8. Home Dashboard V1 Requirements

Home should become the player's return hub.

Required sections:

- **Quick Actions**: direct actions for Solo Daily, Solo Practice, Daily Multiplayer, Practice Multiplayer, Lobby, and History.
- **Active Solo**: top active Solo games from existing resume slots.
- **Active Multiplayer**: top active Multiplayer games, prioritizing "your turn" where safely derivable.
- **Daily Status**: Daily Solo and Daily Multiplayer readiness/reset state using existing countdown/daily cycle data.
- **Lobby Snapshot**: count and preview of joinable/open lobbies.
- **Live v0 Snapshot**: participant-safe active Live games and restricted-count messaging where already supported.
- **Recent Results**: compact recent Solo and Multiplayer rows linking to History filters.

Design constraints:

- Keep the dashboard dense, scannable, and work-focused.
- Do not create a marketing landing page.
- Do not nest cards inside cards.
- Use existing UI primitives where practical.
- Preserve mobile readability and avoid horizontal overflow.

## 9. In-App Notifications V0 Requirements

Notifications are in-app attention items, not external push delivery.

Required notification properties:

- stable id;
- type/kind;
- title;
- concise body/detail;
- source area (`solo`, `multiplayer`, `daily`, `lobby`, `live`, or `history`);
- action target route/subtab where applicable;
- created/updated timestamp derived from source state when possible;
- read or dismissed local state.

Initial notification types:

- Daily Solo ready/reset.
- Daily Multiplayer ready/reset.
- Multiplayer game became "your turn".
- Multiplayer game completed.
- Joinable lobby or selected active-game attention where existing state safely supports it.

Rules:

- Notifications must be deduplicated.
- Dismissed/read notifications must not reappear unless source state materially changes.
- Notification actions must use existing route/subtab handlers.
- Notifications must not write to multiplayer game state.
- Notifications must not infer private nonparticipant details.

## 10. Navigation Badges And Workspace Cues

Badges should be restrained. They should point to action, not decorate every route.

Allowed cues:

- count of active games;
- count of "your turn" multiplayer games;
- Daily ready indicator;
- lobby open count;
- unread in-app notification count.

Accessibility requirements:

- badges must have accessible labels or be paired with text;
- color must not be the only signal;
- active route and focus states must remain clear.

Implementation guidance:

- Extend `Navigation` props only after the badge model exists.
- Keep badge derivation outside `Navigation.tsx`.
- Use dashboard/notification view models as the source for counts.

## 11. Multiplayer Turn-Attention Safeguards

Multiplayer attention must be projection-only unless a later approved implementation plan identifies a narrow reason otherwise.

Preserve:

- `playerSessions` as canonical per-player state;
- shared submitted moves as display/compatibility evidence only;
- existing repository subscription semantics;
- existing stale-save protections;
- existing Daily claim guards;
- existing settlement and competitive result projection rules.

"Your turn" may be shown only when it is derivable from the existing `currentTurn`, viewer identity, and game status rules.

Do not use Phase 25 to change:

- create/join/cancel semantics;
- submit semantics;
- forfeit/timeout settlement;
- Daily Multiplayer participation or claim behavior;
- Practice Hard Mode/time-limit behavior;
- Live v0 nonparticipant visibility.

## 12. State Persistence And Preference Strategy

### 12.1 Route And UI Persistence

Preserve current `src/app/navigationState.ts` behavior:

- active route;
- Solo subtab;
- Multiplayer subtab;
- selected Solo game;
- selected Multiplayer game;
- History filters;
- hidden Practice compatibility mapping to Solo Practice.

Notification read/dismiss state should start as local UI state or a small dedicated localStorage record, not gameplay state.

### 12.2 Settings

Existing settings include:

- Daily Solo countdown/reset toggle;
- Daily Multiplayer countdown/reset toggle;
- sound, theme, reduced motion, Hard Mode default, difficulty, and GO puzzle count.

Phase 25 may propose in-app notification settings, but the implementation plan must decide whether they require:

- only local UI storage;
- a safe additive settings field;
- a guest/cloud schema version bump.

Default recommendation:

- Avoid guest/cloud schema changes in early Phase 25.
- If a schema bump is required, stop for a narrow migration/backward-compatibility plan.

### 12.3 Browser Notifications

Browser notifications are not in the default Phase 25 execution path.

If later approved, the browser-notification addendum must address:

- permission UX;
- foreground vs background behavior;
- reduced-motion/sound expectations;
- secrets-free implementation;
- no service-worker push unless separately approved.

## 13. Architecture And Component Strategy

Recommended boundaries:

- `src/dashboard/` for dashboard view models and Home dashboard components.
- `src/notifications/` for notification view models and in-app notification components.
- `src/solo/soloViewModels.ts` remains the Solo active/recent selector source.
- `src/multiplayer/multiplayerViewModels.ts` remains the Multiplayer active/lobby/live/recent selector source.
- `src/history/historyViewModels.ts` remains the History result/filter selector source.
- `src/app/App.tsx` owns orchestration and callbacks, but should not absorb dashboard or notification rendering complexity.
- `src/ui/Navigation.tsx` may accept already-derived badge metadata, but should not calculate attention state.

High-conflict files:

- `src/app/App.tsx`
- `src/app/navigationState.ts`
- `src/account/storageSchema.ts`
- `src/ui/Navigation.tsx`
- `src/multiplayer/`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`
- `planning/phase-25/`
- `planning/specs/phase-25/`

Sequencing rules:

- Build selectors before components.
- Add Home dashboard before broader notification UI.
- Add in-app notification state before nav badges.
- Add browser-notification decisions only after in-app behavior is proven.
- Keep multiplayer repository changes out of scope unless separately approved.

## 14. Verification Strategy

Focused tests should run at each stage before broader gates.

Final Phase 25 gate:

- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run test:full`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using Python `csv` parsing
- secrets/artifact sanity check
- desktop/tablet/mobile browser smoke

Real Supabase-backed two-client E2E is required when Phase 25 changes:

- Multiplayer create/join/resume behavior;
- selected-game behavior;
- turn visibility;
- Lobby actions;
- Live v0 participant visibility;
- repository subscription/write behavior;
- Daily Multiplayer claim behavior.

If credentials are unavailable, report the missing class of credential and do not claim full multiplayer verification.

## 15. Backward Compatibility And Migration Constraints

- Existing local guest progress must load safely.
- Existing cloud progress must load safely.
- Existing hidden route compatibility for Practice, Daily OG, and Daily GO must remain predictable.
- Existing History filters must remain valid.
- Existing selected Solo and Multiplayer game persistence must remain valid.
- Existing countdown settings must continue to behave as they do now.
- No Supabase migrations are expected for default Phase 25.
- No guest/cloud schema bump is expected unless notification preference storage is explicitly approved and cannot be local-only.

## 16. Risks And Mitigations

### 16.1 Scope Creep Into Push Or Social Systems

Risk: Notifications expand into push infrastructure, social graph, or public Live expansion.

Mitigation: Keep Phase 25 in-app, local-first, and dashboard-centered. Treat browser/push/social work as separately gated.

### 16.2 Notification Accuracy

Risk: A notification says "your turn" or "completed" when canonical state disagrees.

Mitigation: Derive from existing selectors and canonical state. Add edge-case tests for waiting, playing, terminal, nonparticipant, signed-out, Daily, and Practice cases.

### 16.3 `App.tsx` Complexity

Risk: Home dashboard and notifications make `App.tsx` difficult to maintain.

Mitigation: Extract view models and components. Keep `App.tsx` to state ownership and callback wiring.

### 16.4 Persistence Drift

Risk: Notification read/dismiss state corrupts navigation or gameplay persistence.

Mitigation: Keep notification UI state separate from gameplay and validate stored records defensively.

### 16.5 Realtime Load

Risk: Freshness cues encourage polling or extra Supabase load.

Mitigation: Use existing in-memory state and subscriptions. Do not add background polling without explicit approval.

### 16.6 Privacy/RLS

Risk: Live or Lobby freshness reveals nonparticipant data.

Mitigation: Preserve participant-safe Live v0 and existing Lobby visibility. Stop if broader visibility needs schema/RLS review.

### 16.7 Notification Fatigue

Risk: Too many badges/toasts make the app noisy.

Mitigation: Prefer a notification center/dashboard panel over aggressive toasts. Use restrained badges and dismiss/read controls.

## 17. Open Decisions

These should be resolved in the Phase 25 implementation plan or before the specific stage that needs them:

1. Should browser Notification API support be deferred entirely from Phase 25?
   - Recommendation: defer by default; revisit only after in-app notifications are working.
2. Should notification read/dismiss state be local-only or synced?
   - Recommendation: local-only for Phase 25.
3. Should the Home dashboard be the only dashboard surface, or should compact dashboard widgets appear elsewhere?
   - Recommendation: Home dashboard plus small navigation badges only.
4. Should Live v0 become more public in Phase 25?
   - Recommendation: no; keep participant-safe and defer public spectator expansion.
5. Should notification preferences be added to synced guest/cloud settings?
   - Recommendation: avoid unless the implementation plan proves local-only storage is insufficient.

No open decision blocks creation of a Phase 25 implementation plan.

## 18. Recommended Next Gated Action

Create a detailed Phase 25 implementation plan under `planning/phase-25/`.

The plan should convert this spec into stage-by-stage execution instructions, define exact progress gates, identify focused tests, and preserve all source/runtime boundaries until the user explicitly authorizes Stage 25.0 baseline work.
