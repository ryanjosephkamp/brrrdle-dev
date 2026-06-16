# Phase 26 Polish, Notifications, And Live v1 Specification

**Status**: Approved scope reference; implemented through Stage 26.7 cleanup and final hardening.
**Date**: 2026-06-15.
**Repository**: `brrrdle-dev`.
**Authority**: This specification implements the revised Phase 26 planning brief after Phase 24 navigation/workspaces, Phase 25 dashboard/notifications, and the user-approved Phase 26 scope revision. It remains subordinate to `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, and direct user instructions.

## 1. Purpose

Phase 26 should make the current app more resilient, more comfortable to use, and more multiplayer-aware without changing gameplay rules.

The phase combines four related outcomes:

- responsive visual hardening for the Phase 24/25 shell and workspace surfaces;
- notification settings with guest/cloud preference persistence;
- important-only notification sounds and local browser-notification controls where safe;
- authenticated Live v1 spectation, with any required Supabase schema/RLS work handled through separately authorized gates.

Theme proposal/template modernization is explicitly deferred to Phase 27. Elo/ranking, public player profiles, and leaderboards are routed to later phases.

## 2. Source Inputs

Phase 26 planning is grounded in:

- `planning/phase-26/PLANNING-BRIEF.md`;
- `planning/ROADMAP.md`;
- `planning/ROADMAP-OPTIMIZED.md`;
- Phase 24 route/workspace completion materials;
- Phase 25 dashboard, notification, badge, and attention-cue materials;
- the user screenshots from 2026-06-15 showing Chrome zoom/narrow-width overflow and clipping;
- current shell, dashboard, multiplayer, notification, settings, sound, storage, and Supabase surfaces.

The screenshots show three key layout hazards:

- Home Dashboard content can be clipped on the right side near the fixed side rail, especially around Daily Status cards.
- Multiplayer setup controls can overlap or compress unreadably under Chrome zoom or narrower desktop widths.
- Multiplayer Daily/Practice result and setup containers need stronger wrapping and stacking behavior so long labels, dates, and buttons stay inside their containers.

## 3. Goals

Phase 26 must:

- keep the Lunar Signal shell polished and responsive across desktop, tablet, mobile, and Chrome zoom scenarios;
- eliminate known text overflow, control overlap, and right-rail clipping in dashboard and multiplayer surfaces;
- add Settings-level notification preferences that can sync through guest/cloud progress where the existing settings model safely supports that;
- add important-only notification sounds by default, controlled by notification preferences and the existing master sound setting;
- expose browser-notification controls only through explicit, permission-gated user actions, with no service workers or push infrastructure in Phase 26;
- expand Live from participant-only Live v0 to authenticated nonparticipant Live v1 spectation if a safe data/RLS path is approved;
- preserve all Phase 24 navigation/workspace behavior and Phase 25 dashboard/notification behavior.

## 4. Non-Goals

Phase 26 must not include:

- Phase 27 theme proposal/template modernization or full theme implementation;
- public/guest spectation unless a sanitized public projection is separately specified and authorized in a later phase;
- comprehensive Elo/ranking or ranked matchmaking;
- public player profile pages;
- leaderboards;
- social graph, marketplace, economy, chat, or community systems;
- service workers, push infrastructure, or background cross-device notification delivery;
- production deployment, release, or migration execution without explicit later authorization;
- gameplay rule changes.

## 5. Gameplay Invariants

Phase 26 must preserve these invariants exactly:

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged.
- Existing scoring, timeout, forfeit, rating/ELO, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged.
- `playerSessions` remain canonical for per-player gameplay mutation.
- Shared projections and spectator projections must not become a mutation source for gameplay.
- Phase 24 route/subtab persistence and Phase 25 dashboard/notification read/dismiss behavior remain intact unless a later approved implementation plan narrowly changes presentation details.

## 6. In-Scope Work

### 6.1 Responsive Polish And Layout Hardening

Phase 26 must harden the shell and affected content areas against Chrome zoom and narrow desktop widths.

Required layout outcomes:

- The three-column Lunar Signal shell must prevent center content from sliding under or being clipped by the right rail.
- The center playfield must not hide required card content through inappropriate `overflow: hidden` behavior.
- Dashboard tiles, Daily Status cards, Active Solo/Multiplayer sections, Lobby/Live previews, and result cards must wrap instead of overflowing.
- Multiplayer setup controls must stack or reflow before labels, dropdowns, checkboxes, or action buttons overlap.
- Long values such as timestamps, UTC dates, usernames, match names, button labels, and result summaries must wrap or truncate intentionally.
- Fixed-format controls must use stable dimensions and `min-width: 0`/wrapping safeguards where needed.
- Mobile and tablet behavior must remain at least as good as the current Phase 25 behavior.

Primary affected surfaces:

- `src/index.css`;
- `src/app/LunarSignalStage.tsx`;
- `src/dashboard/DashboardHome.tsx`;
- `src/multiplayer/MultiplayerPanel.tsx`;
- `src/multiplayer/MultiplayerWorkspace.tsx`;
- `src/multiplayer/MultiplayerLive.tsx`;
- shared UI controls where card/button wrapping behavior is centralized.

Browser smoke expectations:

- desktop wide;
- desktop narrow around the current three-column breakpoint;
- Chrome zoom at 125 percent and 150 percent where practical;
- tablet width;
- mobile width.

The acceptance standard is no incoherent overlap, no right-rail content clipping, no horizontal page overflow caused by core app surfaces, and no unreadable button/control labels.

### 6.2 Notification Settings

Phase 26 should add Settings controls for notification behavior.

Required preference areas:

- all in-app notifications enabled/disabled;
- notification sound mode, defaulting to important-only;
- category-level controls where the implementation plan determines they can stay understandable and low-risk;
- browser notification permission/status controls where safe;
- a reset-to-defaults affordance if local/cloud preference normalization needs it.

The controls must be conservative and plain:

- In-app notifications remain available by default.
- Important-only notification sounds are the default.
- Browser notifications are never enabled by default and must require explicit user action.
- Denied or unavailable browser permission states must be shown without nagging.
- Preferences must tolerate missing, stale, or corrupt stored values.

### 6.3 Guest/Cloud Preference Persistence

Notification preferences should be synced through guest progress/profile settings if the existing settings model supports it safely.

Likely persistence work:

- extend the guest settings shape in `src/account/storageSchema.ts`;
- bump the guest progress schema version if needed;
- normalize old settings payloads to safe defaults;
- keep notification read/dismiss metadata local through the existing `brrrdle:notifications:v1` storage model unless a later spec authorizes sync;
- add storage tests for defaults, migration, corrupt payloads, and partial cloud payloads.

If profile/cloud sync requires a Supabase schema/RLS change, that work must be split into a separately authorized migration stage before execution.

### 6.4 Important-Only Notification Sounds

Phase 26 should add notification sounds without making the app noisy.

Default behavior:

- notification sound mode defaults to important-only;
- important-only sounds should include high-attention events such as multiplayer turn attention and completed multiplayer games;
- Daily readiness sounds may be included only if they do not duplicate existing reset cues in a confusing way;
- low-priority events such as lobby freshness or Live freshness should not produce sounds by default.

Safeguards:

- master sound off disables notification sounds;
- notification sound preferences can disable notification sounds independently;
- sounds must not fire during initial hydration for already-existing notifications;
- sounds must dedupe repeated projections of the same event;
- sounds must avoid interrupting active gameplay in inappropriate states;
- browser autoplay/user-gesture constraints must be respected through the existing sound engine patterns.

Likely affected surfaces:

- `src/sound/soundEngine.ts`;
- `src/notifications/notificationViewModels.ts`;
- `src/notifications/notificationStorage.ts`;
- `src/app/App.tsx` or a small notification action/sound helper;
- Settings UI and tests.

### 6.5 Browser Notification Controls

Phase 26 may include local Browser Notification API controls, but only as a settings/permission surface.

Allowed:

- show browser notification support status;
- let the user explicitly request permission from Settings;
- let the user disable browser notification attempts;
- optionally show a local test notification after explicit user action, if useful and tested.

Not allowed in Phase 26:

- service workers;
- push infrastructure;
- background delivery after the app is closed;
- cross-device notification sync;
- automatic permission prompts during gameplay or app load;
- browser notifications for guests without a clear local-only fallback and explicit user action.

If browser controls increase implementation risk, the implementation plan may document them as deferred while still completing notification settings and sounds.

### 6.6 Authenticated Live v1 Spectation

Live v1 should expand the Multiplayer Live subtab beyond participant-only visibility for signed-in users.

Required product behavior:

- authenticated nonparticipants can discover eligible currently live games;
- authenticated spectators can open a read-only view of a live game;
- spectator views cannot submit guesses, forfeit, cancel, join, mutate player sessions, or change match state;
- participant resume behavior remains the primary action for games involving the current user;
- spectator status and participant status must be visually distinct;
- user-facing identity must be sanitized and must not expose raw auth emails, private internal identifiers, secrets, or private profile data.

Live v1 must distinguish:

- participant-owned live games;
- authenticated nonparticipant spectatable games;
- restricted games that cannot be shown because data/RLS does not permit safe viewing;
- public/guest spectation, which remains deferred.

Data/RLS requirements:

- Current `async_multiplayer_games` RLS appears participant/waiting-oriented and should not be assumed to allow nonparticipant active-game discovery.
- If Live v1 needs broader read access, Phase 26 must include a separately authorized Supabase schema/RLS migration stage.
- Prefer a sanitized view/RPC/projection over broad raw row exposure.
- The spectator projection should expose only the fields needed for a read-only live view.
- Any migration must preserve existing participant create/join/resume/save behavior and Daily claim safety.

Verification expectations:

- unit tests for Live v1 view models and spectator eligibility;
- repository tests or mocks for sanitized projection handling;
- component tests for participant versus spectator actions;
- real Supabase-backed multi-client E2E if RLS/realtime behavior changes;
- at least one three-client scenario where two participants play and a third authenticated user can spectate without mutation authority.

### 6.7 Public/Guest Spectation Deferral

Public/guest spectation is deferred beyond Phase 26 unless a later phase builds and explicitly authorizes a sanitized public projection.

The later public projection must address:

- privacy-safe player identity;
- answer exposure timing;
- Daily puzzle answer safety;
- realtime load and abuse controls;
- guest access rules;
- RLS and API rate limits;
- no leakage of auth ids, emails, tokens, or private settings.

## 7. Success Criteria

Phase 26 is successful when:

- the screenshot-reproduced Chrome zoom/narrow-width overflow and clipping issues are fixed;
- dashboard, multiplayer setup, result, and shell surfaces stay legible across the agreed smoke matrix;
- notification settings are visible, understandable, and persisted safely through guest/cloud settings where approved;
- notification sounds default to important-only and respect master sound plus notification preferences;
- browser notification controls, if implemented, are explicit and permission-gated;
- authenticated Live v1 spectators can discover and read allowed live games without mutation authority;
- public/guest spectation remains clearly deferred;
- all gameplay invariants remain protected by focused and full verification gates;
- no secrets, local artifacts, or unapproved migrations/deployments enter the repository.

## 8. Recommended Stage Breakdown

### Stage 26.0 - Spec, Implementation Plan, And Protected Baseline

- Approve this unified spec.
- Create the detailed Phase 26 implementation plan.
- Run a protected baseline gate before source edits.
- Record current uncommitted planning artifacts and preserve them.

### Stage 26.1 - Responsive Layout Audit And Test Harness

- Audit shell/dashboard/multiplayer layout risks.
- Add focused responsive test fixtures or component assertions where practical.
- Define exact viewport/zoom smoke matrix.
- Do not make broad visual redesigns.

### Stage 26.2 - Responsive Shell And Workspace Hardening

- Fix right-rail clipping and center playfield overflow.
- Fix multiplayer setup-control overlap.
- Harden dashboard tiles, result cards, and dense metadata wrapping.
- Run desktop/tablet/mobile and Chrome zoom smoke.

### Stage 26.3 - Notification Settings And Cloud-Synced Preferences

- Add notification preference types, defaults, normalization, and storage tests.
- Add Settings controls.
- Sync through guest/cloud progress if no migration is required; otherwise split required migration work into a separate authorization gate.
- Preserve local read/dismiss metadata.

### Stage 26.4 - Important-Only Notification Sounds And Browser Controls

- Add notification sound routing and deduplication.
- Default sounds to important-only.
- Respect master sound and notification preferences.
- Add browser notification status/permission controls only if safe.
- Do not add service workers or push infrastructure.

### Stage 26.5 - Authenticated Live v1 Spectation

- Finalize spectator projection and eligibility rules.
- If required, prepare and execute a separately authorized Supabase schema/RLS migration stage.
- Add read-only spectator UI and route/action behavior.
- Verify with participant and nonparticipant tests, including real Supabase-backed E2E when RLS/realtime changes.

### Stage 26.6 - Visual Polish, Accessibility, And Copy Cleanup

- Tighten labels, empty states, status copy, focus behavior, and accessible names.
- Keep polish scoped to existing current themes.
- Do not begin Phase 27 theme-template modernization.

### Stage 26.7 - Cleanup And Final Hardening

- Remove temporary scaffolding.
- Run final full gate.
- Run browser smoke matrix.
- Prepare Git handoff recommendation.

## 9. Architecture Strategy

Phase 26 should keep existing boundaries intact:

- `App.tsx` remains orchestration; new logic belongs in focused helpers or feature modules.
- Layout fixes should prefer CSS/container rules and component-local layout changes over broad route rewrites.
- Notification preferences should be modeled independently from read/dismiss metadata.
- Notification sound decisions should be projection-driven and deduplicated.
- Live v1 should use explicit spectator view models rather than overloading participant resume models.
- Any Supabase exposure should prefer sanitized projections or RPCs to widening raw table reads.

Avoid:

- duplicating gameplay logic in dashboard, notification, or Live spectator code;
- making route/subtab state part of gameplay state;
- giving spectator code write paths;
- broad theme/token rewrites before Phase 27.

## 10. State And Persistence Strategy

Recommended preference shape, to be finalized in the implementation plan:

- in-app notifications enabled;
- notification sound mode: off, important-only, or all, default important-only;
- browser notifications enabled/requested status;
- optional category preferences for multiplayer turn, multiplayer completion, daily readiness, lobby, and live updates;
- last-normalized version metadata if needed for guest/cloud settings.

Persistence rules:

- notification preferences should sync through guest/cloud progress if the existing schema can be safely extended;
- notification read/dismiss metadata remains local-only in Phase 26;
- stale/corrupt values normalize to safe defaults;
- signed-out or guest-only users receive local fallback behavior;
- cloud sync failures must not block gameplay.

## 11. Migration And Authorization Constraints

No Supabase migration is authorized by this specification itself.

If Stage 26.3 or Stage 26.5 needs schema/RLS changes:

- write a migration plan/spec first;
- identify exact tables, policies, views, and RPCs;
- include rollback and privacy review notes;
- require explicit user authorization before running any migration;
- run real Supabase-backed verification after migration execution.

Live v1 migration work must preserve existing policies for waiting games, participants, Daily claims, and saved multiplayer projections.

## 12. Verification Strategy

Use focused verification first, then broader gates.

Expected focused coverage:

- layout/component tests for dashboard and multiplayer wrapping where jsdom can catch structure and accessible labels;
- notification preference normalization/storage tests;
- notification Settings UI tests;
- notification sound routing/deduplication tests;
- browser notification control tests with mocked `Notification` API;
- Live spectator view-model tests;
- Live spectator UI tests;
- repository/RLS-adjacent tests or mocks for sanitized spectator projections.

Expected browser smoke:

- Home dashboard, Daily Status, Active sections, Lobby/Live previews;
- Multiplayer Daily and Practice setup controls;
- multiplayer result/status cards and turn history;
- Settings notification controls;
- notification sound/browser controls if visible;
- Live participant and authenticated spectator flows;
- History, Calendar, and Practice compatibility.

Suggested viewport matrix:

- wide desktop;
- narrower desktop near the three-column breakpoint;
- Chrome zoom 125 percent and 150 percent where practical;
- tablet width;
- mobile width.

Expected final gate:

- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run test:full`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- browser smoke matrix;
- resource/process cleanup check.

If Live v1 changes Supabase RLS/realtime behavior, run real multi-client Supabase-backed E2E before final completion.

## 13. Risks And Mitigations

- Risk: fixing desktop clipping with broad CSS changes could regress mobile layout.
  - Mitigation: use scoped container rules and smoke desktop, tablet, and mobile after each layout stage.
- Risk: Chrome zoom issues are browser/rendering-specific.
  - Mitigation: include Chrome zoom smoke and prefer robust CSS wrapping over pixel-perfect assumptions.
- Risk: notification sounds become noisy.
  - Mitigation: default important-only, dedupe, respect master sound, and avoid low-priority sounds by default.
- Risk: cloud-synced preferences create schema or migration risk.
  - Mitigation: use existing guest settings normalization where possible; split migrations into separately authorized stages.
- Risk: Live v1 exposes private data.
  - Mitigation: use sanitized projections, explicit spectator models, and non-printing secret/privacy review.
- Risk: spectator UI accidentally mutates games.
  - Mitigation: isolate read-only actions and add tests proving spectator surfaces do not expose submit/forfeit/cancel/join controls.
- Risk: public/guest spectation scope grows too large.
  - Mitigation: keep it deferred until a public projection spec is approved.

## 14. Future Phase Routing

- Phase 27: theme proposal/template modernization and full theme implementation planning, using `themes/proposals/template_proposals/` and `themes/proposals/theme_proposals.csv`.
- Phase 28: comprehensive Elo/ranking and ranked matchmaking model, keeping game points independent from Elo/rank.
- Phase 29: public player profile foundations and privacy-safe public identity.
- Phase 30: leaderboards for Elo/rank, streaks, total games played, and approved achievements/metrics.
- Later phases: public/guest spectation through sanitized public projections, deeper social/community systems, marketplace, additional modes, and other expansions.

## 15. Open Decisions

Major user decisions are resolved:

- notification sounds default to important-only;
- notification preferences should sync through guest/cloud progress if safe;
- authenticated nonparticipant spectation belongs in Phase 26 even if it requires a separately authorized migration/RLS stage;
- public/guest spectation is deferred unless a sanitized public projection is separately approved;
- theme-specific work is deferred to Phase 27.

Remaining implementation-plan decisions:

- exact notification preference field names and category granularity;
- whether Stage 26.3 preference sync can avoid Supabase migration work;
- exact browser notification control UX and whether to implement or defer it after inspection;
- exact Live v1 spectator projection shape;
- exact Supabase migration/RLS strategy for authenticated nonparticipant discovery;
- exact viewport and Chrome zoom smoke matrix for final verification.

## 16. Recommended Next Gated Action

Next, create a detailed Phase 26 implementation plan that turns this specification into stage-by-stage execution packets. The first execution stage after that plan should be Stage 26.0, a protected baseline only.

Do not begin Phase 26 implementation until the user explicitly authorizes the relevant implementation stage.
