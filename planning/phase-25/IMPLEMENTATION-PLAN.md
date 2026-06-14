# Phase 25 Dashboard And Notifications Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` or `superpowers:subagent-driven-development` to implement this plan task-by-task after the user explicitly authorizes execution. Repository governance overrides generic commit-per-task advice: do not commit, push, create PRs, merge, deploy, migrate, release, or delete branches unless a later prompt explicitly authorizes that protected action.

**Goal:** Implement Phase 25 as a low-risk engagement layer: Home dashboard v1, in-app notifications v0, navigation/workspace attention cues, and conservative Lobby/Live freshness without changing gameplay rules.

**Architecture:** Build projection/view-model surfaces first, then wire UI components into existing Phase 24 workspaces. Keep dashboard and notification state separate from gameplay state, keep `App.tsx` focused on orchestration, and preserve existing Solo, Multiplayer, History, route, and persistence seams.

**Tech Stack:** Vite, React, TypeScript, Vitest, Playwright, Supabase-backed multiplayer E2E when multiplayer behavior changes.

---

## 1. Status And Authority

This is the detailed Phase 25 implementation plan for `brrrdle-dev`.

Target repository:

`/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`

This plan is documentation only. It does not authorize source/runtime implementation, test implementation, database migrations, Vercel or Supabase configuration, deployment, commits, pushes, PR creation, merge, release, branch deletion, new custom skills, or work against the original stable `brrrdle` repository.

Phase 25 execution requires a later explicit user prompt. Each implementation stage must halt at its exit gate unless the user prompt for that stage explicitly authorizes continuation.

## 2. Source Of Truth

Use this order during Phase 25:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/specs/phase-25/PHASE-25-DASHBOARD-AND-NOTIFICATIONS-SPEC-2026-06-14.md`.
5. This implementation plan.
6. `planning/testing/TESTING-SUITE.md`.
7. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
8. `progress/PROGRESS.csv` and the relevant progress report.
9. `agents.md` and `memory.md`.

If any lower source conflicts with a higher source, follow the higher source and report the conflict.

## 3. Execution Principles

- Stability first: preserve Phase 23 and Phase 24 behavior unless a later authorized prompt narrowly changes it.
- Projection first: dashboard, notifications, badges, Lobby freshness, and Live freshness must derive from existing canonical data and selectors.
- No gameplay authority: notification/dashboard state must never become the source of truth for moves, turns, completion, claims, scoring, timeout, forfeit, rating/ELO, GO transitions, or keyboard state.
- In-app first: Phase 25 starts with local in-app attention. Browser notifications are a decision/deferral stage, not default implementation.
- Local-first notification state: read/dismiss metadata starts outside guest/cloud gameplay state unless a later stage proves a narrow schema need.
- Keep `App.tsx` thin: use it for state ownership and callback wiring; put dashboard and notification rendering in dedicated modules.
- Avoid schema changes: stop for user approval if implementation needs a guest/cloud schema bump, Supabase migration, RLS change, or new realtime aggregation.
- Preserve compatibility: hidden Practice, Daily OG, and Daily GO compatibility routes must continue to work or redirect predictably.
- Verify in layers: focused tests first, full gates at hardening, and real Supabase-backed two-client E2E when multiplayer behavior semantics change.
- Gated Git: no commits, pushes, PRs, merges, releases, deployments, migrations, or branch deletion during implementation stages unless separately authorized.

## 4. Success Criteria

Phase 25 is complete only when:

- Home dashboard v1 replaces the mode-card-only Home surface with active Solo, active Multiplayer, turn attention, Daily readiness, Lobby, Live v0, and recent-result summaries.
- Dashboard actions route into existing Solo, Multiplayer, Calendar, History, Lobby, Active Games, and Live v0 surfaces.
- In-app notifications v0 exist with deterministic notification items, local read/dismiss state, and action routing.
- Navigation/workspace attention cues are accessible and restrained.
- Lobby and Live freshness improvements use existing safe state only.
- Route/subtab/selected-game persistence from Phase 24 remains intact.
- Hidden Practice and Daily compatibility routes remain safe.
- Notification/dashboard state stays separate from gameplay state.
- No nonparticipant multiplayer data is exposed beyond existing participant-safe Live v0 behavior.
- The full existing gameplay testing suite continues to pass.
- Daily Multiplayer remains:
  - strictly asynchronous;
  - five-letter;
  - UTC-day keyed;
  - no-clock;
  - without Daily Hard Mode lobby control;
  - answer-separated;
  - claim-safe.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged.
- Existing scoring, timeout, forfeit, rating/ELO, GO transition, solved-row hold, and keyboard-state rules remain unchanged.
- Solo Daily remains fixed-five, and Solo Practice remains 2-35 letters.
- No secrets, `.env.local`, tokens, Supabase keys, Vercel tokens, auth state, screenshots, videos, traces, or local session artifacts are committed or printed.

## 5. File And Module Strategy

### 5.1 New Modules

- `src/dashboard/dashboardViewModels.ts`
  - Owns Home dashboard projection types and selectors.
  - Composes existing Solo, Multiplayer, History, Lobby, and Live selectors.
  - Does not import React.
- `src/dashboard/dashboardViewModels.test.ts`
  - Covers active counts, turn prioritization, Daily status inputs, empty states, recent results, Lobby/Live summaries, and nonparticipant restrictions.
- `src/dashboard/DashboardHome.tsx`
  - Renders Home dashboard v1.
  - Receives a dashboard view model and callbacks from `App.tsx`.
  - Does not load or mutate gameplay state.
- `src/dashboard/DashboardHome.test.tsx`
  - Covers rendering, accessible names, empty states, action callbacks, and responsive-safe structure at the component level.
- `src/dashboard/index.ts`
  - Exports dashboard components and view models.
- `src/notifications/notificationViewModels.ts`
  - Owns notification item types, notification selection, deduplication, action targets, and read/dismiss filtering.
  - Does not import React.
- `src/notifications/notificationViewModels.test.ts`
  - Covers Daily ready, Daily Multiplayer ready, Multiplayer your-turn, Multiplayer completed, lobby/active attention, signed-out behavior, read/dismiss filtering, deduplication, and material state changes.
- `src/notifications/notificationStorage.ts`
  - Owns local-only read/dismiss metadata storage.
  - Uses a dedicated key such as `brrrdle:notifications:v1`.
  - Validates corrupt or stale records defensively.
- `src/notifications/notificationStorage.test.ts`
  - Covers empty, corrupt, read, dismiss, and material-state-change behavior.
- `src/notifications/NotificationCenter.tsx`
  - Renders notification items, read/dismiss controls, and action links.
- `src/notifications/NotificationCenter.test.tsx`
  - Covers accessible rendering, read/dismiss callbacks, empty state, and action callback behavior.
- `src/notifications/index.ts`
  - Exports notification components and helpers.

### 5.2 Existing Modules To Modify Carefully

- `src/app/App.tsx`
  - Compose dashboard and notification view models.
  - Own notification read/dismiss state loading/saving.
  - Pass callbacks into `DashboardHome`, `NotificationCenter`, and existing workspaces.
  - Replace current Home `ModeCard` grid with `DashboardHome`.
- `src/app/routes.ts`
  - Update Home description only if helpful.
  - Do not add broad new route IDs unless a stage proves a route is necessary.
- `src/app/navigationState.ts`
  - Preserve current route/subtab/selected-game persistence.
  - Avoid adding notification read/dismiss here unless a stage proves it belongs with navigation state.
- `src/ui/Navigation.tsx`
  - Add optional badge metadata only after the badge view model exists.
  - Do not compute dashboard or notification state inside `Navigation`.
- `src/multiplayer/multiplayerViewModels.ts`
  - Add fields such as `isViewerTurn`, `freshnessLabel`, or `attentionRank` only if they simplify dashboard/cue rendering.
  - Preserve existing output fields and behavior unless tests are updated intentionally.
- `src/multiplayer/MultiplayerWorkspace.tsx`
  - Render "your turn" and freshness cues using view-model fields.
- `src/multiplayer/MultiplayerActiveGames.tsx`
  - Render accessible turn/attention labels.
- `src/multiplayer/MultiplayerLobby.tsx`
  - Render conservative freshness labels, not new visibility.
- `src/multiplayer/MultiplayerLive.tsx`
  - Preserve participant-safe Live v0; only improve messaging/freshness.
- `src/account/storageSchema.ts`
  - Avoid changes by default. If notification settings must be synced, stop and write a narrow schema/backward-compatibility plan first.
- `src/index.css`
  - Add small dashboard/notification/badge styles only if Tailwind utility composition is insufficient.

### 5.3 Tests To Extend

- `src/app/routes.test.ts`
- `src/app/navigationState.test.ts`
- `src/ui/Navigation.test.tsx`
- `src/solo/soloViewModels.test.ts`
- `src/multiplayer/multiplayerViewModels.test.ts`
- `src/multiplayer/MultiplayerWorkspace.test.tsx`
- `src/multiplayer/MultiplayerLive.test.tsx`
- `src/history/historyViewModels.test.ts`
- new dashboard and notification tests listed above

## 6. Stage 25.0 - Implementation Plan Approval And Protected Baseline

### Purpose

Record the protected starting state after this plan is reviewed, install no new dependencies, make no source changes, and prove the local baseline still passes the lightweight gate.

### Goals

- Confirm the target repo is `brrrdle-dev`.
- Preserve uncommitted planning/spec/progress artifacts as user-provided work.
- Record branch, status, remotes, current commit, resource state, and next progress ID.
- Run baseline verification before implementation begins.

### Deliverables

- New progress report, likely `progress/PROGRESS-STEP-161.md` if Step 160 records this plan.
- Matching `progress/PROGRESS.csv` row.
- Optional minimal status update in this plan if needed.
- Baseline verification evidence.

### Likely Files/Modules

- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`
- `planning/phase-25/IMPLEMENTATION-PLAN.md` only for a minimal status note if useful

### Dependencies

- User approval of this implementation plan.
- Existing local dependencies present.

### Verification

Run sequentially:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check
- watched-port/resource checks for `5173`, `5174`, `3000`, and `4173`

### Exit Gate

- Baseline passes or a blocker is clearly documented.
- Halt for explicit Stage 25.1 authorization.

### Stop Conditions

- Wrong repository or remote.
- Unexpected dirty source/runtime files unrelated to planning.
- Baseline verification fails.
- Disk/resource pressure makes verification unsafe.

## 7. Stage 25.1 - Dashboard And Notification View Models

### Purpose

Build the pure data/projection layer so later UI stages are simple and testable.

### Goals

- Define dashboard view-model types and selectors.
- Define notification view-model types and selectors.
- Define local read/dismiss metadata behavior without React.
- Compose existing Phase 24 selectors instead of duplicating gameplay logic.

### Deliverables

- `src/dashboard/dashboardViewModels.ts`
- `src/dashboard/dashboardViewModels.test.ts`
- `src/dashboard/index.ts`
- `src/notifications/notificationViewModels.ts`
- `src/notifications/notificationViewModels.test.ts`
- `src/notifications/notificationStorage.ts`
- `src/notifications/notificationStorage.test.ts`
- `src/notifications/index.ts`
- Focused tests for dashboard and notification projections.

### Implementation Notes

Dashboard selector should accept explicit inputs, including:

- `resumeSlots`
- `history`
- `multiplayerState`
- `competitiveMultiplayerState`
- `viewerUserId`
- Daily Solo status input from existing `useDailyCycle`
- Daily Multiplayer status input from existing `useDailyCycle`
- `dailyDateKey`
- limits for previews

Notification selector should produce stable items with:

- id
- kind
- source
- title
- detail
- priority
- updatedAt
- action target
- read/dismissed derived from local metadata

The first notification kinds should be:

- Daily Solo ready/reset
- Daily Multiplayer ready/reset
- Multiplayer your turn
- Multiplayer completed
- Lobby/active-game attention when existing state safely supports it

### Likely Files/Modules

- New dashboard and notification files above.
- `src/solo/soloViewModels.ts` only if a tiny exported helper is useful.
- `src/multiplayer/multiplayerViewModels.ts` only for projection fields that avoid duplication.
- `src/history/historyViewModels.ts` only if dashboard composition needs a stable helper.

### Dependencies

- Phase 24 selectors and route persistence already exist.

### Verification

Focused:

- `npm run test -- src/dashboard/dashboardViewModels.test.ts src/notifications/notificationViewModels.test.ts src/notifications/notificationStorage.test.ts`
- `npm run test -- src/solo/soloViewModels.test.ts src/multiplayer/multiplayerViewModels.test.ts src/history/historyViewModels.test.ts`

Then:

- `npm run lint`
- `npm run test`
- `git diff --check`
- progress CSV shape check

### Exit Gate

- Pure view-model tests pass.
- No React/UI changes are required to prove selector behavior.
- No gameplay logic or repository semantics changed.

### Stop Conditions

- Dashboard or notification selection requires schema/RLS changes.
- "Your turn" cannot be derived from existing `currentTurn`, status, and viewer identity.
- Notification metadata starts leaking into gameplay state.

## 8. Stage 25.2 - Home Dashboard V1

### Purpose

Replace the current Home mode-card grid with a useful return hub.

### Goals

- Render quick actions.
- Render active Solo and Multiplayer summaries.
- Render Daily readiness.
- Render Lobby and Live v0 snapshots.
- Render recent results.
- Keep responsive and accessible behavior strong.

### Deliverables

- `src/dashboard/DashboardHome.tsx`
- `src/dashboard/DashboardHome.test.tsx`
- `src/app/App.tsx` wiring from existing app state to dashboard view model and action callbacks
- optional `src/app/routes.ts` Home description update
- optional small CSS additions in `src/index.css`
- progress documentation update

### Implementation Notes

Dashboard actions should use existing route/subtab callbacks:

- Solo Daily: `activeRouteId = 'solo'`, `soloSubtab = 'daily'`
- Solo Practice: `activeRouteId = 'solo'`, `soloSubtab = 'practice'`
- Active Solo: `activeRouteId = 'solo'`, `soloSubtab = 'active'`, selected solo game if applicable
- Daily Multiplayer: `activeRouteId = 'multiplayer'`, `multiplayerSubtab = 'daily'`
- Practice Multiplayer: `activeRouteId = 'multiplayer'`, `multiplayerSubtab = 'practice'`
- Active Multiplayer: `activeRouteId = 'multiplayer'`, `multiplayerSubtab = 'active'`, selected multiplayer game if applicable
- Lobby: `activeRouteId = 'multiplayer'`, `multiplayerSubtab = 'lobby'`
- Live v0: `activeRouteId = 'multiplayer'`, `multiplayerSubtab = 'live'`
- History: `activeRouteId = 'history'`, with relevant filters where available

### Likely Files/Modules

- `src/dashboard/DashboardHome.tsx`
- `src/dashboard/DashboardHome.test.tsx`
- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/index.css`

### Dependencies

- Stage 25.1 dashboard view model.

### Verification

Focused:

- `npm run test -- src/dashboard/DashboardHome.test.tsx src/dashboard/dashboardViewModels.test.ts src/app/routes.test.ts src/app/navigationState.test.ts`

Then:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`

Browser smoke if visible behavior changes:

- desktop Home dashboard
- tablet Home dashboard
- mobile Home dashboard around 390px
- quick actions to Solo, Multiplayer, Calendar, History, Lobby, Live v0
- no horizontal overflow

### Exit Gate

- Home dashboard is useful and responsive.
- Existing route entry points still work.
- No notification center or nav badge work is mixed into this stage unless needed as a tiny dashboard preview.

### Stop Conditions

- Dashboard requires broad `App.tsx` rendering logic.
- Dashboard breaks Practice/Daily compatibility.
- Dashboard needs schema changes or realtime polling.

## 9. Stage 25.3 - In-App Notifications V0

### Purpose

Add in-app notification UI and local read/dismiss behavior.

### Goals

- Show notification/attention items.
- Support read/dismiss actions.
- Route notification actions into existing surfaces.
- Keep notification persistence local and defensive.

### Deliverables

- `src/notifications/NotificationCenter.tsx`
- `src/notifications/NotificationCenter.test.tsx`
- `src/notifications/notificationStorage.ts` integration with `App.tsx`
- `src/app/App.tsx` state/callback wiring
- optional dashboard notification panel integration
- progress documentation update

### Implementation Notes

Preferred local storage key:

- `brrrdle:notifications:v1`

Stored metadata should be small:

- notification id
- source fingerprint or updatedAt marker
- readAt timestamp if read
- dismissedAt timestamp if dismissed

Dismissed/read items should reappear only when the source fingerprint materially changes.

### Likely Files/Modules

- `src/notifications/NotificationCenter.tsx`
- `src/notifications/NotificationCenter.test.tsx`
- `src/notifications/notificationStorage.ts`
- `src/notifications/notificationStorage.test.ts`
- `src/notifications/notificationViewModels.ts`
- `src/app/App.tsx`
- `src/dashboard/DashboardHome.tsx`

### Dependencies

- Stage 25.1 notification view models.
- Stage 25.2 dashboard shell if notification summary appears on Home.

### Verification

Focused:

- `npm run test -- src/notifications/notificationViewModels.test.ts src/notifications/notificationStorage.test.ts src/notifications/NotificationCenter.test.tsx src/dashboard/DashboardHome.test.tsx`

Then:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`

Browser smoke:

- notification list
- empty state
- read action
- dismiss action
- action routing
- reload persistence for local read/dismiss state

### Exit Gate

- In-app notifications work without browser permissions or push infrastructure.
- Notification state is local-first and separate from gameplay.

### Stop Conditions

- Browser push or service-worker behavior becomes necessary.
- Notification settings require guest/cloud schema changes.
- Notification actions mutate gameplay state directly.

## 10. Stage 25.4 - Navigation Badges, Workspace Attention, And Freshness

### Purpose

Expose actionable state in the primary navigation and existing workspaces without changing multiplayer semantics.

### Goals

- Add badge metadata to navigation.
- Add "your turn" cues to Multiplayer workspace surfaces.
- Add conservative freshness labels to Lobby and Live v0.
- Keep cues accessible and not noisy.

### Deliverables

- `src/ui/Navigation.tsx` optional badge rendering
- `src/ui/Navigation.test.tsx`
- `src/multiplayer/multiplayerViewModels.ts` attention/freshness fields if needed
- `src/multiplayer/multiplayerViewModels.test.ts`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerLobby.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- relevant component tests
- progress documentation update

### Implementation Notes

Navigation should receive already-derived badge data. It should not import dashboard, notification, multiplayer, or history selectors.

Allowed badge categories:

- active count
- your-turn count
- Daily ready
- lobby count
- unread notification count

Badges must include accessible text, for example by using `aria-label`, `sr-only`, or visible text paired with the badge.

### Dependencies

- Stage 25.1 dashboard/notification counts.
- Stage 25.3 notification read/dismiss state if unread count is shown.

### Verification

Focused:

- `npm run test -- src/ui/Navigation.test.tsx src/multiplayer/multiplayerViewModels.test.ts src/multiplayer/MultiplayerWorkspace.test.tsx src/multiplayer/MultiplayerLive.test.tsx`

Then:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`

Run real multiplayer E2E only if this stage changes create/join/resume/visibility/turn semantics. Projection-only label changes do not require E2E by themselves, but browser smoke should still verify visible routing and labels.

### Exit Gate

- Cues are accurate, accessible, and derived from existing state.
- No repository writes, schema changes, or spectator expansion were introduced.

### Stop Conditions

- Cues require new polling or realtime load.
- Cues expose nonparticipant details.
- Cues require changing multiplayer reducer or repository semantics.

## 11. Stage 25.5 - Optional Browser Notification Decision Or Deferral

### Purpose

Make a deliberate decision after in-app notification behavior is visible.

### Default Decision

Defer browser notifications from Phase 25 unless the user explicitly approves a narrow addendum.

### Decision

Stage 25.5 defers browser notifications from Phase 25. The completed Stage 25.1 through Stage 25.4 work provides local in-app notifications, dashboard summaries, navigation badges, workspace attention cues, and freshness labels without browser permission prompts. Browser Notification API work should be revisited only through a later explicit addendum after the in-app attention model is reviewed.

### Allowed Outcomes

- Document deferral in progress and implementation plan.
- Create a narrow browser-notification addendum for user review.
- Stop and propose a later-phase migration plan if true push infrastructure is desired.

### Disallowed By Default

- service-worker push delivery
- server-side scheduling
- Supabase notification tables
- RLS changes
- cross-device sync
- deployment or Vercel configuration

### Deliverables

- progress note documenting the decision
- optional spec addendum only if the user asks for it

### Verification

- `git diff --check`
- progress CSV shape check
- `git status --short --branch`

### Exit Gate

- Browser notification decision is explicit and documented.

### Stop Conditions

- The decision would require migration, deployment, production configuration, or secrets.

## 12. Stage 25.6 - Cleanup And Final Hardening

### Purpose

Complete Phase 25 cleanup, documentation, and final verification.

### Goals

- Remove stale copy and rough placeholder states.
- Ensure dashboard/notification behavior is coherent across all viewports.
- Confirm no Phase 25 work changed gameplay rules.
- Prepare for later Git handoff.

### Deliverables

- final progress report
- updated implementation-plan status
- explicit deferred-item list
- final verification evidence
- recommended Git handoff prompt

### Likely Files/Modules

- `planning/phase-25/IMPLEMENTATION-PLAN.md`
- `progress/PROGRESS.csv`
- final `progress/PROGRESS-STEP-*.md`
- touched dashboard/notification/navigation/workspace tests

### Verification

Focused changed-area tests first.

Then run the full gate sequentially:

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

Run `npm run test:e2e:multiplayer` if any Stage 25 changes altered multiplayer create/join/resume/visibility/turn behavior. Credentials should be checked by presence only, never printed.

### Browser Smoke Coverage

- Home dashboard
- notification center/read/dismiss/action routing
- primary navigation badges
- Solo overview/Daily/Practice/Active
- Multiplayer overview/Daily/Practice/Active/Lobby/Live
- History filters and recent-result links
- Daily/Calendar compatibility
- hidden Practice compatibility
- no horizontal overflow at mobile width

### Exit Gate

- Full final gate passes.
- Phase 25 is ready for user review.
- Git handoff remains separately gated.

### Stop Conditions

- Any full-gate command fails.
- Browser smoke reveals route, overflow, or accessibility regressions.
- Secrets or generated artifacts appear in the tracked diff.
- Any implementation drifted into deferred Phase 25+ scope.

### Completion Status

Stage 25.6 is complete as of progress step 167. Final hardening preserved the Stage 25.5 browser-notification deferral, corrected attention-badge accessibility so route and tab accessible names remain stable, refreshed the active planning index pointer, and completed the final Phase 25 verification gate.

Phase 25 is ready for Git handoff preparation only after a separate explicit user authorization. Browser notifications, service workers, push infrastructure, cross-device sync, schema changes, deployment, release, and Phase 26 work remain deferred and unauthorized.

## 13. State Persistence And Preference Strategy

Phase 25 should use three layers deliberately:

1. Existing gameplay persistence:
   - guest progress;
   - cloud progress;
   - resume slots;
   - multiplayer state;
   - competitive multiplayer results.
2. Existing route/UI persistence:
   - `src/app/navigationState.ts`;
   - active route;
   - subtabs;
   - selected active games;
   - History filters.
3. New local notification metadata:
   - read/dismiss state;
   - source fingerprints;
   - localStorage-only by default.

Do not store notification read/dismiss state in guest/cloud gameplay state unless a later implementation stage proves a synced preference is necessary and the user approves the schema impact.

If new settings are added:

- prefer local UI storage first;
- if guest settings are touched, add normalization tests;
- if schema version changes are required, stop for a migration/backward-compatibility addendum before implementation.

## 14. Multiplayer Safeguards

Daily Multiplayer must remain:

- strictly asynchronous;
- five-letter;
- UTC-day keyed;
- no-clock;
- without Daily Hard Mode lobby control;
- answer-separated;
- claim-safe.

Practice Multiplayer must preserve:

- creator-selected Hard Mode;
- time-limit behavior;
- join/cancel/submit/forfeit/timeout behavior;
- scoring and settlement;
- rating/ELO projection;
- GO transitions;
- keyboard-state rules;
- solved-row hold behavior.

Phase 25 must not change:

- `src/game/` core rules;
- `OgGame`;
- `GoGame`;
- multiplayer reducer semantics;
- repository write semantics;
- Supabase schema or RLS;
- stale-save protections;
- public spectator visibility.

Real two-client Supabase-backed Playwright E2E is required if a stage changes multiplayer create/join/resume/visibility/turn behavior. If a change is projection-only, document why E2E was not required and run component/browser smoke instead.

## 15. Verification Strategy

### Stage-Level Focused Tests

- Stage 25.1: view-model and storage tests.
- Stage 25.2: dashboard, route, and navigation-state tests.
- Stage 25.3: notification view-model, storage, center, and routing tests.
- Stage 25.4: navigation, multiplayer view-model, and workspace cue tests.
- Stage 25.5: docs/progress checks only unless a separately approved addendum exists.
- Stage 25.6: full final gate.

### Final Required Gate

Run sequentially:

- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run test:full`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`

Also run:

- progress CSV shape check using Python `csv` parsing;
- non-printing secrets/artifact sanity check;
- desktop/tablet/mobile browser smoke;
- resource/process cleanup checks.

### Failure Rules

If any required command fails:

- stop the sequence;
- record the exact command and relevant non-secret error;
- update the progress report;
- do not proceed to the next stage.

## 16. Risk Management

### Scope Creep

Risk: Phase 25 expands into push infrastructure, public Live, social features, or deployment.

Mitigation: Treat browser notifications, public spectator expansion, schema changes, deployment, and social systems as explicit stop conditions unless separately approved.

### Notification Accuracy

Risk: Notification state diverges from canonical game state.

Mitigation: Generate notifications from canonical selectors and source fingerprints. Add edge-case tests for waiting, playing, terminal, signed-out, nonparticipant, Daily, and Practice states.

### `App.tsx` Complexity

Risk: Dashboard and notifications make `App.tsx` too broad.

Mitigation: Build dedicated `src/dashboard/` and `src/notifications/` modules. Keep `App.tsx` wiring-only.

### State Persistence

Risk: Local notification metadata corrupts route or gameplay persistence.

Mitigation: Use a dedicated storage key, defensive normalization, and tests for corrupt payloads.

### Realtime Load

Risk: Freshness cues cause polling or extra Supabase work.

Mitigation: Use existing in-memory state and existing subscriptions. Stop if new background polling is needed.

### Privacy/RLS

Risk: Live or Lobby cues reveal nonparticipant data.

Mitigation: Preserve participant-safe Live v0 and existing Lobby visibility. Stop for explicit schema/RLS review if broader visibility is requested.

### Resource And Test Runtime

Risk: Full E2E and browser smoke strain the local machine.

Mitigation: Run focused tests during stages, heavy gates sequentially, one dev server at most, one Playwright run at a time, and final process checks.

## 17. Documentation And Progress Updates

For each authorized Stage 25 execution prompt:

- create or update a matching `progress/PROGRESS-STEP-*.md`;
- append or update the matching row in `progress/PROGRESS.csv`;
- update this implementation plan with stage status only when useful;
- update a Phase 25 changelog only if the implementation prompt authorizes or requests it;
- preserve prompt-package boundaries in final reports;
- include a copy-safe next prompt package at meaningful review gates.

Do not update `agents.md` or `memory.md` unless the stage creates durable coordination rules or the user explicitly asks.

## 18. Open Decisions

These are not blockers for Stage 25.0 or Stage 25.1:

1. Browser notifications:
   - default: defer until after in-app notifications are reviewed.
2. Notification read/dismiss sync:
   - default: local-only for Phase 25.
3. Dashboard scope:
   - default: Home dashboard plus restrained nav badges.
4. Live v0 visibility:
   - default: participant-safe only.
5. Synced notification preferences:
   - default: avoid unless local-only proves insufficient.

If an implementation step needs to change a default above, stop and ask for explicit approval before editing.

## 19. Recommended Next Gated Action

Authorize Stage 25.0 only: implementation-plan approval and protected baseline.

Stage 25.0 should confirm repo state, record current dirty planning artifacts, create the next progress report, run the lightweight baseline gate, check resources/processes, and halt before any source/runtime implementation.
