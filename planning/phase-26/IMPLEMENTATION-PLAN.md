# Phase 26 Polish, Notifications, And Live v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` or `superpowers:subagent-driven-development` to implement this plan task-by-task after the user explicitly authorizes a specific Stage 26 execution prompt. This plan is not implementation authorization.

**Status**: Stage 26.7 cleanup and final hardening is complete; Phase 26 is ready for Git handoff preparation review.
**Repository**: `brrrdle-dev`.
**Created**: 2026-06-15.
**Authority**: Planning artifact under `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-26/PLANNING-BRIEF.md`, and `planning/specs/phase-26/PHASE-26-POLISH-NOTIFICATIONS-AND-LIVE-V1-SPEC-2026-06-15.md`.
**Goal**: Execute Phase 26 in gated stages: responsive polish, notification settings/preferences, important-only notification sounds, guarded browser notification controls, and authenticated Live v1 spectation.
**Architecture**: Keep gameplay canonical state untouched. Add or refine projection, preference, sound-trigger, and spectator view-model layers, with `App.tsx` used only for orchestration. Treat any Supabase schema/RLS change as a separately authorized migration stage.
**Tech Stack**: React, TypeScript, Vite, Vitest, Playwright, Supabase, local guest progress storage, existing Web Audio sound engine.

---

## 1. Execution Principles

- Phase 26 is current-surface hardening plus notification/Live expansion, not a gameplay rewrite.
- Every implementation stage requires a separate explicit user prompt.
- Work proceeds in order from Stage 26.0 through Stage 26.7 unless the user explicitly changes the sequence.
- Keep stage scopes small enough to verify and review independently.
- Prefer projection/view-model additions over direct gameplay-domain changes.
- Keep `App.tsx` thin by extracting helpers before adding complex state logic.
- Treat `src/app/`, `src/account/`, `src/multiplayer/`, `src/notifications/`, `src/sound/`, `src/index.css`, `supabase/`, and progress docs as high-conflict single-writer surfaces unless a later coordination plan explicitly sequences them.
- Use real Supabase-backed E2E when Live v1 changes repository/RLS/realtime visibility.
- Do not revise individual theme proposal/template docs in Phase 26.
- Do not implement public/guest spectation in Phase 26.

## 2. Required Invariants

All stages must preserve:

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged.
- Existing scoring, timeout, forfeit, rating/ELO, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged.
- Phase 24 route/subtab behavior remains intact.
- Phase 25 Home Dashboard, Notification Center, local read/dismiss metadata, route badges, and workspace attention cues remain intact.
- Notification, sound, dashboard, theme, and spectator state must not become gameplay authority.
- Public/guest spectation remains deferred unless a later sanitized public projection is explicitly approved.
- Theme proposal/template modernization remains deferred to Phase 27.
- Elo/ranking and ranked matchmaking remain routed to Phase 28.
- Public player profiles remain routed to Phase 29.
- Leaderboards remain routed to Phase 30.

## 3. Success Criteria

Phase 26 is complete when:

- the user-provided Chrome zoom/narrow-width screenshots are addressed by layout fixes or a documented non-app environmental limitation;
- Home Dashboard, Daily Status, Multiplayer Daily/Practice setup controls, selected-game result cards, and the three-column shell do not overlap, clip, or hide required text at the agreed smoke sizes;
- notification Settings exist, are understandable, and persist through guest/cloud progress with safe default normalization;
- notification sounds default to important-only and respect the master sound setting plus notification preferences;
- browser notification controls, if shipped, are explicit, local, permission-gated, and do not use service workers or push infrastructure;
- authenticated Live v1 spectation supports read-only nonparticipant viewing without mutation authority;
- any required Supabase schema/RLS migration was separately planned, separately authorized, executed, and verified before Live v1 source work relies on it;
- final focused and full gates pass;
- progress records document every stage and protected-action boundary.

## 4. File And Module Strategy

### 4.1 Existing Files To Modify Carefully

- `src/index.css`
  - Responsive shell, playfield, rail, card, notification, and control wrapping rules.
- `src/app/LunarSignalStage.tsx`
  - Shell composition, rail/side/playfield structure, route attention rendering.
- `src/app/LunarSignalStage.test.tsx`
  - Shell rendering and accessible label regressions.
- `src/app/App.tsx`
  - Orchestration for settings, notification preferences, sound triggers, Live v1 selection, and routing.
- `src/dashboard/DashboardHome.tsx`
  - Home dashboard cards, Daily Status, Lobby/Live previews, recent results wrapping.
- `src/dashboard/DashboardHome.test.tsx`
  - Dashboard rendering and action tests.
- `src/account/Settings.tsx`
  - Notification preference controls and browser-notification controls.
- `src/account/storageSchema.ts`
  - Guest/cloud preference shape, defaults, normalization, schema version bump if needed.
- `src/account/guestStorage.test.ts`
  - Guest progress migration and corrupt payload tests.
- `src/sound/soundEngine.ts`
  - Add notification sound events or category support if needed.
- `src/sound/soundEngine.test.ts`
  - Sound event/category/default tests.
- `src/notifications/notificationViewModels.ts`
  - Preference-aware notification candidates if needed.
- `src/notifications/notificationStorage.ts`
  - Keep read/dismiss local; add helpers only if needed for sound dedupe.
- `src/notifications/NotificationCenter.tsx`
  - Preference-aware rendering only if Settings controls require it.
- `src/notifications/*.test.ts`
  - Preference, metadata, dedupe, action, and UI regressions.
- `src/multiplayer/MultiplayerPanel.tsx`
  - Daily/Practice setup control layout and read-only spectator constraints if reused.
- `src/multiplayer/MultiplayerWorkspace.tsx`
  - Live v1 tab summary, participant versus spectator state.
- `src/multiplayer/MultiplayerLive.tsx`
  - Live v1 authenticated spectator surface.
- `src/multiplayer/multiplayerViewModels.ts`
  - Live spectator eligibility and projection models.
- `src/multiplayer/multiplayerRepository.ts`
  - Repository seam for spectator-safe projections only if existing RLS supports or a migration is separately authorized.
- `src/multiplayer/*test.tsx` and `src/multiplayer/*test.ts`
  - Live v1, workspace, panel layout, repository/projection tests.
- `supabase/migrations/`
  - Only in a separately authorized Stage 26.5 migration prompt if required.
- `e2e/fixtures/`
  - Three-client setup helpers only when Live v1 source changes need real E2E.
- `e2e/gameplay/`
  - Live v1 spectator E2E only after the relevant stage is authorized.

### 4.2 Likely New Files

- `src/notifications/notificationPreferences.ts`
  - Preference defaults, normalization, category gates, and storage-shape helpers.
- `src/notifications/notificationPreferences.test.ts`
  - Defaults, corrupt payloads, category gates, and partial cloud payload tests.
- `src/notifications/notificationSounds.ts`
  - Pure sound-trigger decisions from notification items, preferences, and prior fingerprints.
- `src/notifications/notificationSounds.test.ts`
  - Important-only behavior, dedupe, hydration suppression, master-sound gating.
- `src/notifications/browserNotifications.ts`
  - Pure Browser Notification API support/permission helpers, if Stage 26.4 implements controls.
- `src/notifications/browserNotifications.test.ts`
  - Permission-state, unsupported-browser, explicit-test-notification behavior.
- `src/multiplayer/multiplayerSpectatorViewModels.ts`
  - Optional split if Live v1 spectator models would make `multiplayerViewModels.ts` too broad.
- `src/multiplayer/multiplayerSpectatorViewModels.test.ts`
  - Participant, authenticated spectator, restricted, and signed-out cases.
- `e2e/gameplay/live-v1-spectator.spec.ts`
  - Three-client Live v1 verification if Stage 26.5 changes Supabase-backed visibility.
- `planning/phase-26/CHANGELOG.md`
  - Optional Phase 26 changelog/handoff note if implementation stages need a compact summary.

## 5. Screenshot-Driven Responsive Hardening Strategy

Observed issues:

- Home Dashboard Daily Status can be clipped near the right rail under Chrome zoom/narrow desktop conditions.
- Multiplayer Daily/Practice setup controls overlap or compress labels, dropdowns, and action buttons.
- Selected multiplayer result cards, deadline values, and turn history can become too dense without intentional wrapping.

Implementation strategy:

- Audit the three-column `.brrrdle-lunar-grid` breakpoint and side rail widths.
- Review `.brrrdle-lunar-playfield { overflow: hidden; }` and only keep hidden overflow where it cannot clip required content.
- Add `min-width: 0`, `overflow-wrap: anywhere`, and earlier grid fallback rules to content containers that hold long values.
- Make Multiplayer setup controls stack earlier than the current dense `sm:grid-cols-4`/button layout when center width is constrained.
- Keep cards at stable dimensions without using viewport-based font scaling.
- Prefer scoped classes for recurring card/control wrapping over ad hoc one-off utility piles.
- Add browser smoke against the user-provided problem surfaces after any visible layout change.

Suggested smoke matrix:

- Desktop wide: 1440x900 at 100 percent zoom.
- Desktop narrow: 1024x900 at 100 percent zoom.
- Chrome zoom: 1280x900 at 125 percent zoom.
- Chrome zoom: 1280x900 at 150 percent zoom where practical.
- Tablet: 820x1180.
- Mobile: 390x844.

Acceptance:

- no right-rail clipping of center cards;
- no horizontal document overflow caused by app shell or primary cards;
- no overlapping labels/controls in Multiplayer Daily or Practice setup;
- no unreadable/truncated essential action labels;
- no regression in mobile navigation, Notification Center, or Settings.

## 6. Notification Settings And Preference Strategy

Recommended preference model:

- `inAppNotificationsEnabled`: default `true`;
- `notificationSoundMode`: default `'important-only'`, allowed values `'off'`, `'important-only'`, `'all'`;
- `browserNotificationsEnabled`: default `false`;
- `browserNotificationPermission`: derived at runtime, not trusted from storage as authority;
- optional category booleans:
  - `dailyReady`;
  - `multiplayerTurn`;
  - `multiplayerCompleted`;
  - `lobbyFreshness`;
  - `liveFreshness`.

Storage approach:

- Add preferences under `GuestSettingsState` in `src/account/storageSchema.ts`.
- Bump `GUEST_PROGRESS_SCHEMA_VERSION` if the existing migration convention requires it for new settings.
- Add defaults in `createDefaultGuestSettings`.
- Normalize old, partial, corrupt, and unknown preference payloads in `normalizeGuestSettings`.
- Persist through the existing guest progress sync path rather than adding a new Supabase table.
- Keep notification read/dismiss metadata local under `brrrdle:notifications:v1`.

Settings UI approach:

- Add a `Notifications` panel in `Settings.tsx`.
- Keep controls compact and plain.
- Separate in-app notification visibility from notification sounds and browser notification permission.
- Make browser permission controls explicit and never automatic.
- Display unsupported, granted, denied, and prompt states honestly.

Stop conditions:

- Preference sync requires a Supabase schema/RLS change not already authorized.
- Notification settings begin to alter gameplay state or Daily claim behavior.
- Browser notification controls create permission prompts outside explicit user action.

## 7. Important-Only Notification Sound Strategy

Recommended sound decisions:

- Important-only default should include `multiplayer-your-turn` and `multiplayer-completed`.
- Daily readiness sounds can map to existing reset cues only when they represent a new readiness transition, not initial app hydration.
- Lobby and Live freshness remain silent by default.
- Master sound off disables all notification sounds.
- Notification sound mode `off` disables notification sounds even if master sound is on.
- Notification sound mode `all` can include lower-priority categories only after tests prove dedupe and user controls work.

Implementation approach:

- Add pure helper logic that receives:
  - current notification items;
  - previous notification fingerprints;
  - notification preferences;
  - master sound enabled state;
  - hydration/first-render flag;
  - active route or gameplay context if needed for suppression.
- Return sound events to play, not side effects.
- Trigger `sound.play(...)` from `App.tsx` orchestration after helper decisions.
- Extend `SoundEvent` only if existing daily reset/game events are not semantically adequate.
- Store last-played notification fingerprints locally or in component state, not in gameplay state.

Stop conditions:

- Sounds fire repeatedly from unchanged notifications.
- Sounds fire on initial hydration for existing unread items.
- Sound logic requires mutating notification metadata or gameplay state.

## 8. Browser Notification Control Strategy

Default recommendation:

- Implement local Browser Notification API controls only if they stay small, explicit, and fully preference-gated.
- Do not implement service workers, push infrastructure, background delivery, or server-side scheduling.

Allowed controls:

- support status: supported or unavailable;
- permission status: granted, denied, prompt, unavailable;
- explicit `Enable browser notifications` button that requests permission;
- explicit `Disable browser notifications` setting;
- optional `Send test notification` button after permission is granted.

Do not:

- request permission on app load;
- request permission when a game state changes;
- imply notifications work after the browser/app closes;
- route browser notification clicks unless a simple safe foreground route action is already available and tested.

Stop conditions:

- Browser Notification API behavior differs enough across browsers that controls become misleading.
- A safe implementation requires service workers or push.
- User permission can be requested from an accidental or hidden action.

## 9. Authenticated Live v1 Spectator Architecture

Current state:

- `selectLiveMultiplayerRows` only returns playing games where the signed-in viewer is a participant.
- `selectRestrictedLiveMultiplayerCount` counts nonparticipant playing games already in local state.
- Supabase `async_multiplayer_games` select policy currently allows authenticated reads for waiting games and participant-owned games, not all active games.
- Older `live_match_spectators` tables/policies exist for historical Live match infrastructure, but current user-facing Multiplayer is built on unified async game rows.

Desired Live v1 shape:

- participant rows: action is resume;
- authenticated spectator rows: action is spectate/read-only;
- restricted rows: counted or messaged only when safe;
- signed-out users: sign-in required;
- public/guest users: no public spectation in Phase 26.

Preferred data strategy:

- First prove whether existing `async_multiplayer_games` snapshots can contain nonparticipant rows under current RLS. If not, stop before source implementation and create a migration/RLS prompt.
- Prefer sanitized SQL view or RPC returning read-only spectator projections over broad raw table access.
- Include only safe fields for active gameplay display.
- Do not expose raw auth emails, private profile data, service ids, tokens, or unrelated settings.
- Keep repository save paths participant-only.

UI strategy:

- `MultiplayerLive` distinguishes Participant, Spectator, Restricted, and Sign-in states.
- Spectator cards use `Watch live game` or equivalent read-only language.
- Spectator game surface disables submit, forfeit, join, cancel, timer mutation, and lobby management controls.
- Participant and spectator states should be visually distinct but not noisy.

Verification strategy:

- Unit tests for view-model classification.
- Component tests proving spectator rows do not expose mutation controls.
- Repository/RLS tests or mocks for sanitized projection parsing.
- Real Supabase-backed E2E after any migration/repository visibility change:
  - player one creates or resumes;
  - player two joins/plays;
  - player three signed-in nonparticipant sees eligible Live row;
  - player three opens read-only view;
  - player three cannot submit/forfeit/cancel/join;
  - participants continue normally.

Stop conditions:

- Existing RLS prevents safe nonparticipant discovery and no migration has been authorized.
- Spectator projection would expose answers or private data unsafely.
- Spectator view requires gameplay mutation authority.
- Three-client E2E cannot be completed for a Live v1 behavior claim.

## 10. Stage 26.0 - Implementation Plan Approval And Protected Baseline

### Purpose

Record the protected starting state after this plan is reviewed, make no source/runtime/test changes, and prove the local baseline still passes before implementation begins.

### Deliverables

- Stage 26.0 progress report.
- Matching progress CSV row.
- Baseline repository, branch, remote, and dirty-worktree evidence.
- Resource/process baseline.
- Lightweight verification evidence.

### Likely Files/Modules

- `planning/phase-26/IMPLEMENTATION-PLAN.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-172.md` or next available ID

### Verification

Run sequentially:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using Python `csv` parsing

Also run:

- watched port check for `5173`, `5174`, `3000`, and `4173`;
- resource/process snapshot before and after verification.

### Exit Gate

- Baseline passes or blocker is documented.
- Halt for explicit Stage 26.1 authorization.

### Stop Conditions

- Any baseline command fails.
- Dependencies are missing and bootstrap is not explicitly authorized.
- Dirty worktree contains unknown source/runtime changes not already recorded.
- Resource pressure makes the baseline unsafe.

### Stage 26.0 Status

Completed under `progress/PROGRESS-STEP-172.md` on 2026-06-15. Baseline verification passed: `npm run lint`, `npm run test` (91 files, 561 tests), `npm run build` with the existing large-chunk advisory, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, and progress CSV shape check. Stage 26.1 remains gated and requires explicit user authorization before any responsive layout audit or test-harness work begins.

## 11. Stage 26.1 - Responsive Layout Audit And Test Harness

### Purpose

Reproduce and inventory the screenshot-driven layout problems, define the exact responsive smoke matrix, and add any low-risk test harness scaffolding needed before CSS/layout fixes.

### Deliverables

- Layout risk inventory in the Stage 26.1 progress report.
- Exact viewport/zoom smoke matrix.
- Focused failing or characterization tests where practical.
- No broad visual redesign.

### Likely Files/Modules

- `src/index.css`
- `src/app/LunarSignalStage.tsx`
- `src/app/LunarSignalStage.test.tsx`
- `src/dashboard/DashboardHome.tsx`
- `src/dashboard/DashboardHome.test.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/MultiplayerWorkspace.test.tsx`
- browser smoke notes in progress

### Verification

Run focused tests for touched files, likely:

- `npm run test -- src/app/LunarSignalStage.test.tsx src/dashboard/DashboardHome.test.tsx src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/MultiplayerWorkspace.test.tsx`
- `git diff --check`
- progress CSV shape check

If any visible harness or layout change is made, run one dev server and smoke the screenshot routes at the agreed viewport matrix.

### Exit Gate

- Screenshot issues are reproduced or precisely characterized.
- The Stage 26.2 fix surfaces are known.
- No gameplay behavior changes.

### Stop Conditions

- Reproduction requires editing source beyond audit/test harness scope.
- Fix requires broad route/shell rewrite.
- Browser smoke cannot be run or screenshots cannot be interpreted reliably.

## 12. Stage 26.2 - Responsive Shell And Workspace Hardening

### Purpose

Fix the current Chrome zoom/narrow-width clipping and overlap problems while preserving the current visual language.

### Deliverables

- Three-column shell overflow and right-rail clipping safeguards.
- Dashboard Daily Status and card wrapping fixes.
- Multiplayer Daily/Practice setup control stacking and button wrapping fixes.
- Multiplayer selected-game/result/turn-history wrapping fixes.
- Focused tests and browser smoke.

### Likely Files/Modules

- `src/index.css`
- `src/app/LunarSignalStage.tsx`
- `src/app/LunarSignalStage.test.tsx`
- `src/dashboard/DashboardHome.tsx`
- `src/dashboard/DashboardHome.test.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerWorkspace.test.tsx`
- `src/ui/SubtabBar.tsx`
- `src/ui/SubtabBar.test.tsx`

### Verification

Run focused tests first:

- `npm run test -- src/app/LunarSignalStage.test.tsx src/dashboard/DashboardHome.test.tsx src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/MultiplayerWorkspace.test.tsx src/ui/SubtabBar.test.tsx`

Then run:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check

Browser smoke with one dev server:

- Home Dashboard at wide desktop, narrow desktop, Chrome 125 percent, Chrome 150 percent if practical, tablet, and mobile.
- Multiplayer Daily and Practice setup controls at the same matrix.
- Selected finished/active multiplayer result cards and turn history.
- Notification Center and Settings non-regression.

### Exit Gate

- No screenshot-equivalent clipping or control overlap remains.
- No unintended horizontal page overflow from primary app surfaces.
- Mobile and tablet behavior remain coherent.

### Stop Conditions

- Layout fix requires deleting current shell structure or broad redesign.
- CSS changes destabilize gameplay board sizing or tile readability.
- Browser smoke reveals unresolved clipping that cannot be fixed narrowly.

## 13. Stage 26.3 - Notification Settings And Cloud-Synced Preferences

### Purpose

Add notification preference controls and persist them through guest/cloud progress without changing notification read/dismiss metadata or gameplay state.

### Deliverables

- Notification preference model and defaults.
- Guest settings schema/version update if needed.
- Settings UI controls.
- Preference-aware notification generation where appropriate.
- Tests for defaults, corrupt payloads, partial payloads, toggles, and action behavior.

### Likely Files/Modules

- `src/account/storageSchema.ts`
- `src/account/guestStorage.test.ts`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx` if created, or an existing Settings-adjacent test file
- `src/app/App.tsx`
- `src/notifications/notificationPreferences.ts`
- `src/notifications/notificationPreferences.test.ts`
- `src/notifications/notificationViewModels.ts`
- `src/notifications/notificationViewModels.test.ts`
- `src/notifications/NotificationCenter.tsx`
- `src/notifications/NotificationCenter.test.tsx`
- `src/notifications/index.ts`

### Dependencies

- Stage 26.2 should be complete so Settings and Notification Center layout starts from stable responsive rules.

### Verification

Run focused tests first:

- `npm run test -- src/account/guestStorage.test.ts src/notifications/notificationPreferences.test.ts src/notifications/notificationViewModels.test.ts src/notifications/NotificationCenter.test.tsx`

If Settings tests are added:

- include `src/account/Settings.test.tsx`

Then run:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check

Browser smoke if Settings UI changes:

- desktop/tablet/mobile Settings notification controls;
- signed-out and signed-in Settings states;
- Notification Center after disabling/enabling categories.

### Exit Gate

- Preferences normalize safely and sync through existing guest progress behavior.
- Notification read/dismiss metadata remains local.
- No Supabase migration required, or the stage stops with a migration plan.

### Stop Conditions

- Preference persistence requires Supabase schema/RLS work.
- Preference controls obscure or break existing gameplay settings.
- Notification read/dismiss metadata becomes cloud-synced without explicit approval.

## 14. Stage 26.4 - Important-Only Notification Sounds And Browser Controls

### Purpose

Add conservative notification sounds and browser notification controls if safe, with no service workers or push infrastructure.

### Deliverables

- Pure notification sound trigger helper.
- Important-only default behavior.
- Dedupe and hydration suppression.
- Master sound and notification preference gates.
- Browser notification support/permission controls if they remain small and explicit.
- Tests for sound and browser control decisions.

### Likely Files/Modules

- `src/sound/soundEngine.ts`
- `src/sound/soundEngine.test.ts`
- `src/notifications/notificationSounds.ts`
- `src/notifications/notificationSounds.test.ts`
- `src/notifications/browserNotifications.ts`
- `src/notifications/browserNotifications.test.ts`
- `src/notifications/notificationPreferences.ts`
- `src/account/Settings.tsx`
- `src/app/App.tsx`
- `src/notifications/index.ts`

### Dependencies

- Stage 26.3 preference model must exist.

### Verification

Run focused tests first:

- `npm run test -- src/sound/soundEngine.test.ts src/notifications/notificationSounds.test.ts src/notifications/browserNotifications.test.ts src/notifications/notificationPreferences.test.ts`

Then run:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check

Browser smoke if visible controls or sound triggers change:

- Settings browser notification controls without automatic permission prompt;
- master sound off suppresses notification sounds;
- important-only mode sounds only for high/medium configured events after user interaction;
- Notification Center and dashboard non-regression.

### Exit Gate

- No surprise permission prompts.
- No repeated unchanged notification sounds.
- No service worker, push, or background delivery work.

### Stop Conditions

- Browser controls require service worker/push infrastructure.
- Permission prompt cannot be tied to explicit user action.
- Sound trigger needs to mutate gameplay or notification read/dismiss state.

## 15. Stage 26.5 - Authenticated Live v1 Spectation

### Purpose

Add authenticated nonparticipant Live v1 spectation with read-only guarantees, while separately gating any required Supabase schema/RLS migration.

### Stage Split

Stage 26.5 should be split if existing RLS does not support safe nonparticipant active-game discovery:

- Stage 26.5A: Live v1 migration/RLS plan and authorization request.
- Stage 26.5B: authorized migration execution and verification.
- Stage 26.5C: Live v1 app implementation and E2E.

Do not collapse these into one prompt if migration/RLS work is needed.

### Deliverables

- Live v1 spectator eligibility model.
- Participant versus spectator versus restricted Live rows.
- Read-only Live spectator UI.
- Repository seam for sanitized spectator projection.
- Separately authorized migration/RLS if required.
- Three-client real Supabase-backed E2E if visibility changes.

### Likely Files/Modules

- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerViewModels.test.ts`
- `src/multiplayer/multiplayerSpectatorViewModels.ts` if split
- `src/multiplayer/multiplayerSpectatorViewModels.test.ts` if split
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerLive.test.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerWorkspace.test.tsx`
- `src/multiplayer/MultiplayerPanel.tsx` if read-only game surface is reused
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerRepository.test.ts`
- `supabase/migrations/*.sql` only in separately authorized migration stage
- `e2e/fixtures/testUsers.ts`
- `e2e/fixtures/twoClientGame.ts` or new three-client helper
- `e2e/gameplay/live-v1-spectator.spec.ts`

### Dependencies

- Stage 26.2 layout hardening should be complete.
- Stage 26.5 must not depend on browser notification work.
- Supabase E2E credentials must be available for real verification if RLS/realtime changes.

### Verification

Focused local tests:

- `npm run test -- src/multiplayer/multiplayerViewModels.test.ts src/multiplayer/MultiplayerLive.test.tsx src/multiplayer/MultiplayerWorkspace.test.tsx src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/multiplayerRepository.test.ts`

If a migration/RLS stage is executed:

- run migration-specific SQL/repository checks authorized in that prompt;
- run `npm run test:e2e:multiplayer`;
- run the three-client Live v1 spectator E2E.

Then run:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check

Browser smoke:

- participant Live resume;
- authenticated spectator Live discovery;
- read-only spectator view;
- signed-out restricted state;
- existing Daily/Practice Multiplayer non-regression.

### Exit Gate

- Authenticated spectators can watch allowed live games.
- Spectators cannot mutate game state.
- Public/guest spectation remains unavailable.
- Daily Multiplayer and Practice Multiplayer invariants remain intact.

### Stop Conditions

- RLS blocks required discovery and migration is not authorized.
- Spectator projection exposes private data or answers unsafely.
- Spectator UI requires submit/forfeit/cancel/join controls.
- Real Supabase-backed E2E cannot validate a multiplayer visibility claim.

## 16. Stage 26.6 - Visual Polish, Accessibility, And Copy Cleanup

### Purpose

Clean up current Phase 26 surfaces for readability, accessibility, and polish without entering Phase 27 theme work.

### Deliverables

- Current-theme spacing and hierarchy cleanup.
- Accessible names and focus-state verification for Settings, Notification Center, Live v1, and responsive shell controls.
- Clear empty/restricted states.
- Copy cleanup for browser notification status and spectator restrictions.
- No theme proposal/template changes.

### Likely Files/Modules

- `src/index.css`
- `src/app/LunarSignalStage.tsx`
- `src/dashboard/DashboardHome.tsx`
- `src/account/Settings.tsx`
- `src/notifications/NotificationCenter.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- relevant component tests

### Verification

Run focused tests for touched files.

Then run:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check

Browser smoke:

- Home;
- Settings notification controls;
- Notification Center;
- Multiplayer Live v1;
- dashboard/rail badges;
- History and Calendar non-regression;
- desktop/tablet/mobile plus Chrome zoom checks if layout is touched.

### Exit Gate

- Current UI is coherent and accessible.
- No Phase 27 theme-template modernization has started.

### Stop Conditions

- Polish requires broad design-system rewrite.
- Theme template content would need revision.
- Accessibility fix requires changing route or gameplay semantics.

## 17. Stage 26.7 - Cleanup And Final Hardening

### Purpose

Complete Phase 26 cleanup, final verification, browser smoke, resource checks, progress docs, and Git handoff readiness recommendation.

### Deliverables

- Final progress report.
- Updated implementation plan status notes.
- Optional Phase 26 changelog/handoff note if useful.
- Final verification evidence.
- Git handoff preparation prompt package.

### Likely Files/Modules

- `planning/phase-26/IMPLEMENTATION-PLAN.md`
- `planning/phase-26/CHANGELOG.md` if created during Phase 26
- `progress/PROGRESS.csv`
- final `progress/PROGRESS-STEP-*.md`
- any source/test files touched during cleanup only if necessary

### Verification

Run focused tests for touched files first.

Then run final gate sequentially:

- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run test:full`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using Python `csv` parsing
- non-printing secrets/artifact scan over changed tracked and untracked files
- ignored-artifact check for `.env.local`, `dist/`, `node_modules/`, `test-results/`, and `playwright-report/`
- watched port check for `5173`, `5174`, `3000`, and `4173`

Browser smoke with one dev server:

- Home Dashboard and Daily Status;
- Settings notification preferences and sound/browser controls;
- Notification Center;
- primary navigation badges;
- Solo workspace cues;
- Multiplayer Daily/Practice setup;
- Multiplayer Active, Lobby, and Live v1;
- authenticated spectator state if implemented;
- signed-out Live restricted state;
- History;
- Calendar;
- Practice compatibility;
- Chrome zoom/narrow-width scenarios from Stage 26.2.

Run `npm run test:e2e:multiplayer` or the Live v1 spectator E2E again if final cleanup touches multiplayer visibility, create/join/resume, or spectator behavior.

### Exit Gate

- Full final gate passes.
- Browser smoke passes or blocker is documented.
- No runaway Vite, Playwright, browser, or Stage-owned local process remains.
- Phase 26 is ready for Git handoff preparation only after separate explicit authorization.

### Stop Conditions

- Any final-gate command fails.
- Browser smoke reveals unresolved user-visible clipping or spectator mutation risk.
- Secrets/artifacts appear in tracked or staged files.
- Cleanup drifts into Phase 27 or later-phase work.

## 18. Migration/RLS Gate Rules

No migration is authorized by this plan.

If Stage 26.3 or Stage 26.5 discovers migration/RLS work is required:

- stop the current implementation stage before migration execution;
- create a migration/RLS plan or addendum;
- define exact tables, views, RPCs, policies, grants, rollback notes, and privacy risks;
- ask the user for explicit migration authorization;
- never print service-role keys or secrets;
- verify with real Supabase-backed tests after authorized execution;
- document the migration result in progress.

Likely Live v1 migration direction, if needed:

- create a sanitized spectator projection view or RPC for `async_multiplayer_games`;
- expose only fields needed for read-only Live display;
- keep participant save/update policies unchanged;
- preserve waiting lobby visibility and Daily claim safety;
- do not widen raw table reads to public/anon.

## 19. Resource And Secret Safety

Every Stage 26 execution prompt should include:

- one dev server at most;
- one Playwright run at a time;
- no unnecessary browser contexts;
- no committed screenshots, videos, traces, auth state, or generated local artifacts;
- no `.env.local`, tokens, Supabase keys, Vercel tokens, or service-role keys printed or committed;
- watched-port checks when browser/Playwright work runs;
- final resource/process cleanup observations.

## 20. Documentation And Progress Expectations

For every authorized Stage 26 execution:

- create or update the next progress report before or during the work;
- append or update the matching `progress/PROGRESS.csv` row;
- update `planning/phase-26/IMPLEMENTATION-PLAN.md` with minimal status notes only when useful;
- update a Phase 26 changelog/handoff note only if the implementation stages become hard to summarize from progress alone;
- do not update unrelated planning/governance files;
- include a copy-safe next prompt package at meaningful review gates.

## 21. Stage Decision Resolution

These Stage 26 implementation decisions have been resolved by the completed Stage 26.1 through Stage 26.6 work:

- notification preferences shipped as guest/cloud-synced settings with in-app notification enablement, in-app level, notification sound mode, and local browser-notification enablement;
- browser notification controls shipped as local, optional, foreground-only, permission-gated controls with no service workers, push infrastructure, or background delivery;
- Live v1 authenticated spectation uses a sanitized authenticated Supabase RPC plus strict app-side DTO parsing and read-only spectator UI;
- the Stage 26.5 migration/RLS work was separately planned, separately authorized, applied to the intended `brrrdle-dev` Supabase project, and verified before app implementation;
- responsive smoke and source hardening covered the screenshot-driven Chrome zoom/narrow-width shell, dashboard, and multiplayer surfaces.

Remaining post-Phase-26 decisions are intentionally deferred: Phase 27 theme modernization, Phase 28 Elo/ranking and ranked matchmaking, Phase 29 public player profiles, Phase 30 leaderboards, and later public/guest spectation through a separately approved sanitized public projection.

## 22. Recommended Next Gated Action

After Stage 26.7 final verification, the next safe gated action is Phase 26 Git handoff preparation.

That handoff preparation should remain review-only: inspect the completed Phase 26 worktree, confirm changed files, run lightweight pre-handoff checks, and prepare a recommended branch, commit, and draft PR plan without staging, committing, pushing, creating a PR, merging, deploying, running migrations, or beginning Phase 27.
