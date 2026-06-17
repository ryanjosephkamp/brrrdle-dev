# Phase 26 Planning Brief - Polish, Notification Controls, And Live v1

**Status**: Revised planning brief for review
**Repository**: `brrrdle-dev`
**Created**: 2026-06-15
**Revised**: 2026-06-16
**Authority**: This document is a planning artifact only. It does not authorize implementation, source changes, test changes, Supabase migrations, deployment, PR work, release work, or work against the original stable `brrrdle` repository.

## 1. Context After Phase 24 And Phase 25

Phase 24 made Solo, Multiplayer, History, Lobby, and Live v0 first-class app areas. Live v0 is intentionally participant-safe: it shows active multiplayer games belonging to the signed-in viewer and keeps nonparticipant/public spectator expansion deferred.

The pre-Phase-25 Multiplayer OG solved-row hold bugfix closed a cosmetic terminal-transition gap without changing gameplay mechanics.

Phase 25 added Home Dashboard v1, in-app Notifications v0, local notification read/dismiss metadata, navigation badges, workspace attention cues, Lobby/Live freshness labels, and an explicit browser-notification deferral. It preserved the Phase 24 route model and all gameplay invariants.

The original optimized roadmap positioned Phase 26 primarily as theming and visual polish. The user has now revised Phase 26 to keep theme-template modernization out of this phase and instead focus on current UI hardening, notification preferences and sounds, and authenticated Live v1 spectation.

## 2. User Decisions Applied

These decisions are resolved for Phase 26 planning:

- Notification sounds default to **important-only**.
- Notification preferences should be **cloud-synced through guest progress** when implemented.
- Phase 26 should implement **authenticated nonparticipant spectation** even if a separately authorized Supabase schema/RLS stage is required.
- Public/guest spectation is **deferred beyond Phase 26** unless a sanitized public projection is built and explicitly authorized.
- Theme-specific work is **deferred until Phase 31 and Phase 32 or later**, including modernization of `themes/proposals/template_proposals/`, `themes/proposals/theme_proposals.csv`, and later concrete theme implementation.

## 3. Recommended Product Outcome

Phase 26 should make the current app sturdier, more polished, and more configurable while adding the next safe spectator milestone.

By the end of Phase 26, the app should ideally have:

- Chrome zoom and narrow-width layout hardening for the current three-column shell and dense workspace controls;
- responsive container and text wrapping safeguards for dashboard tiles, multiplayer setup controls, result cards, Daily status panels, and rail-adjacent content;
- notification Settings backed by guest/cloud progress preferences;
- important-only notification sounds gated by the master sound setting and notification preferences;
- optional browser notification controls where safe, with no service workers or push infrastructure unless separately approved;
- authenticated nonparticipant Live v1 spectation with read-only guarantees and appropriate Supabase/RLS support if needed;
- preserved Phase 24 navigation/workspace behavior and Phase 25 dashboard/notification behavior.

## 4. Recommended Phase Shape

Phase 26 should become a polish/hardening plus notification/Live expansion phase.

This is safer than trying to modernize all theme templates in the same pass. Theme templates need a full review against a more stable future app surface and now belong near the end of the planned workflow. Phase 26 should instead fix visible current UI issues, harden responsive behavior, complete notification preference/sound foundations, and expand Live only as far as authenticated privacy-safe spectation.

## 5. Proposed In-Scope Work

### 5.1 Current UI Polish And Responsive Hardening

Phase 26 should address the user-provided Chrome screenshots as a first-class scope item.

Observed screenshot issues:

- Home Dashboard Daily Status content can be clipped by the right rail boundary at increased Chrome zoom or narrower widths.
- Multiplayer setup controls can overlap or compress labels, select controls, and action cards in Daily/Practice Multiplayer subtabs.
- Dense result and status cards need stronger wrapping and grid fallback rules.

Likely causes to investigate during implementation:

- fixed three-column shell constraints interacting with Chrome zoom;
- center playfield `overflow` behavior hiding content that should wrap or stack;
- inner card grids with minimum widths that exceed the available center column;
- dense multiplayer form rows that should collapse earlier under container pressure.

Expected work:

- audit `src/index.css`, the Lunar Signal shell, Home Dashboard, Multiplayer setup/result surfaces, and shared cards for overflow and clipping;
- add responsive grid/container rules that wrap before content reaches the right rail;
- ensure long labels and status text wrap inside their containers;
- avoid viewport-width font scaling and preserve readable button/control dimensions;
- verify desktop, tablet, mobile, and Chrome zoom/narrow-width scenarios.

### 5.2 Notification Settings

Phase 26 should add a dedicated notification Settings surface.

Expected controls:

- all in-app notifications enabled/disabled;
- notification categories for Daily readiness, multiplayer turn attention, game completion, Lobby freshness, and Live freshness where supported;
- notification sounds mode, defaulting to important-only;
- browser notification preference/permission controls if a safe local-only model is approved;
- clear disabled/restricted states when browser permissions or user settings prevent delivery.

Persistence strategy:

- extend guest progress settings in a backward-compatible way;
- cloud-sync notification preferences through existing guest progress snapshots;
- normalize corrupt or stale payloads safely;
- keep notification read/dismiss metadata local unless a later spec explicitly approves cloud sync for that metadata.

### 5.3 Important-Only Notification Sounds

Phase 26 should add notification sound behavior conservatively.

Default:

- important-only.

Expected safeguards:

- respect the existing master sound setting;
- respect notification category preferences;
- suppress sounds during initial app hydration;
- dedupe repeated unchanged notifications;
- avoid firing during inappropriate active gameplay states;
- respect browser autoplay/user-gesture constraints;
- keep sounds foreground/local only.

Important candidate events:

- multiplayer turn attention;
- multiplayer game completion;
- Daily Solo or Daily Multiplayer readiness;
- high-value Live/Lobby freshness only if it is not noisy and is explicitly categorized.

### 5.4 Browser Notification Controls

Phase 25 deferred browser notifications. Phase 26 may add controls only if the full spec confirms a safe local-only path.

Allowed direction:

- optional and permission-gated;
- off unless the user opts in;
- independent of service workers, push infrastructure, server scheduling, and cross-device delivery;
- honest about actual browser permission state.

Not allowed without a later explicit addendum:

- service workers;
- push infrastructure;
- background notification delivery;
- server-side scheduled notification sends.

### 5.5 Live v1 Authenticated Spectation

Phase 26 should implement authenticated nonparticipant Live v1 spectation if it can be done safely, including a separately authorized migration/RLS stage if required.

Visibility levels:

- participant resume: existing safe behavior;
- authenticated nonparticipant spectation: Phase 26 target;
- public/guest spectation: deferred unless a sanitized public projection is separately approved.

Planning assumptions:

- current Live v0 selectors are participant-centric;
- existing `async_multiplayer_games` RLS appears to allow authenticated reads for waiting games and participant-owned games, not all active games;
- authenticated spectation likely needs a dedicated projection, RPC, view, policy, or repository seam;
- older live-match spectator tables exist but do not automatically make the current unified async Live surface safe for broad spectation.

Required safeguards:

- spectators are read-only and cannot mutate moves, timers, results, ratings, claims, or participant state;
- private profile data, auth emails, service ids, tokens, and raw internal ids are never exposed;
- Daily Multiplayer remains strictly asynchronous and claim-safe;
- real Supabase-backed multi-client E2E verifies participant plus spectator behavior if Live visibility changes.

## 6. Explicitly Out Of Scope

Phase 26 does not include:

- theme-template modernization or full theme creation/implementation;
- public/guest Live spectation unless a sanitized public projection is separately approved;
- comprehensive Elo/ranking or ranked matchmaking redesign;
- leaderboards;
- public profile pages;
- marketplace, social graph, chat, reactions, or community systems;
- service-worker push infrastructure;
- server-side notification scheduling;
- cross-device notification read/dismiss sync;
- production deployment or release work;
- Git commits, pushes, PR creation, merges, or branch deletion unless separately authorized;
- Supabase migrations or RLS changes unless a Phase 26 spec/plan identifies the need and the user explicitly authorizes that migration stage;
- gameplay rule changes, scoring/rating/ELO changes, timeout/forfeit changes, Daily claim behavior changes, Hard Mode changes, GO transition changes, solved-row hold changes, keyboard-state changes, or core game-domain rewrites.

## 7. Future Phase Routing

Recommended future sequence:

- **Phase 26**: current UI polish/hardening, Chrome zoom/narrow-width overflow fixes, notification preferences/sounds, local browser-notification controls where safe, authenticated Live v1 spectation.
- **Phase 27**: competitive ranking foundations, Elo/rank model, ranked multiplayer, ranked matchmaking, competitive scoring boundaries, and leaderboard-ready data foundations.
- **Phase 28**: public player profile foundations and privacy-safe public identity.
- **Phase 29**: leaderboards for Elo/rank, streaks, total games played, and other approved metrics.
- **Phase 30**: public/guest spectation through sanitized public projections, if still desired and separately authorized.
- **Phase 31**: theme proposal/template modernization using `themes/proposals/template_proposals/` and `themes/proposals/theme_proposals.csv`.
- **Phase 32 or later**: full concrete theme creation, implementation, asset/sound work, and theme QA.
- **Later phases**: deeper social/community systems, marketplace, additional modes, and other expansion work.

## 8. Recommended Stage Breakdown

### Stage 26.0 - Specification, Implementation Plan, And Protected Baseline

Purpose:

- Turn this revised brief into a unified Phase 26 spec and detailed implementation plan.
- Establish a protected baseline before source changes.

Deliverables:

- Phase 26 unified spec.
- Phase 26 implementation plan.
- Baseline progress report and verification gate.

Exit gate:

- User approves the Phase 26 spec/plan and explicitly authorizes Stage 26.1.

### Stage 26.1 - Responsive Layout And State-Model Audit

Purpose:

- Audit the Chrome zoom/narrow-width layout issues and define the notification/Live state model before implementation.

Deliverables:

- Layout overflow inventory tied to the user screenshots.
- Notification preference schema design.
- Live v1 visibility/RLS feasibility notes.
- Test plan for layout, settings, sounds, and spectator behavior.

Exit gate:

- Exact implementation surfaces are known, and any migration need is identified before execution.

### Stage 26.2 - Responsive Shell And Workspace Hardening

Purpose:

- Fix current UI overflow/clipping and polish the existing app shell without changing gameplay behavior.

Deliverables:

- Three-column shell overflow safeguards.
- Dashboard tile/card wrapping fixes.
- Multiplayer setup/result card responsive fixes.
- Focused component tests and browser smoke for Chrome zoom/narrow-width behavior.

Exit gate:

- No visible clipping, unintended horizontal overflow, or control overlap in the approved smoke matrix.

### Stage 26.3 - Notification Settings And Cloud-Synced Preferences

Purpose:

- Add notification preferences to Settings and persist them through guest progress.

Deliverables:

- Notification settings model and normalization.
- Guest progress schema/version handling if needed.
- Settings UI controls.
- Tests for defaults, corrupt data, preference toggles, and cloud-sync-safe serialization.

Exit gate:

- Preferences are stable for guests and signed-in/cloud-synced progress without affecting read/dismiss metadata.

### Stage 26.4 - Important-Only Notification Sounds And Browser Controls

Purpose:

- Add preference-gated notification sounds and resolve the safe browser notification control scope.

Deliverables:

- Important-only sound trigger model.
- Foreground/local sound integration.
- Browser notification controls if approved by the spec.
- Dedupe, hydration, active-gameplay, and preference-gating tests.

Exit gate:

- No noisy/repeated sounds, no surprise permission prompts, no service-worker or push work.

### Stage 26.5 - Live v1 Authenticated Spectation

Purpose:

- Add authenticated nonparticipant Live v1 discovery and read-only spectation.

Deliverables:

- Spectator-safe Live v1 view models.
- Read-only spectator UI path.
- Repository/RLS changes only if separately authorized.
- Three-client Supabase-backed E2E if multiplayer visibility changes.

Exit gate:

- Spectators can only observe approved data and cannot mutate game state.

### Stage 26.6 - Visual Polish And Accessibility Cleanup

Purpose:

- Apply final current-theme polish across the post-Phase-25 app without entering later theme-template modernization.

Deliverables:

- Spacing, hierarchy, empty-state, focus-state, and accessibility cleanup.
- No theme-template markdown or CSV modernization.
- Browser smoke across Home, Solo, Multiplayer, History, Settings, Notification Center, Lobby, and Live.

Exit gate:

- Current UI feels cohesive, readable, and stable across desktop/tablet/mobile.

### Stage 26.7 - Cleanup And Final Hardening

Purpose:

- Verify, document, and prepare Phase 26 for Git handoff.

Deliverables:

- Final progress updates.
- Focused tests and full final gate.
- Browser smoke and resource checks.
- Handoff readiness recommendation.

Exit gate:

- Phase 26 is complete or remaining blockers are documented.

## 9. Success Criteria

Phase 26 is successful only if:

- screenshot-driven Chrome zoom/narrow-width overflow issues are fixed or explicitly documented with a reproducible environmental limitation;
- dashboard tiles, multiplayer setup controls, result cards, and right-rail-adjacent content wrap safely;
- notification preferences are visible in Settings, normalized safely, and cloud-synced through guest progress;
- notification sounds default to important-only, respect preferences and master sound, and do not repeat noisily;
- browser notification controls, if shipped, are optional, permission-gated, and do not use service workers or push infrastructure;
- authenticated Live v1 spectation is either safely implemented with appropriate migration/RLS authorization or explicitly blocked with exact requirements;
- public/guest spectation remains deferred unless separately approved through sanitized public projections;
- Phase 24 route/subtab behavior remains intact;
- Phase 25 dashboard, Notification Center, badges, and workspace cues remain intact;
- all gameplay invariants listed below remain unchanged;
- final verification passes the approved Phase 26 gate.

## 10. Gameplay And Multiplayer Invariants

Phase 26 must preserve:

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged.
- Existing scoring, timeout, forfeit, rating/ELO, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged.
- Consumables, Pay-to-Continue, and reveal-answer affordances remain disabled in multiplayer.
- Dashboard, notification, sound, theme, and Live spectator state must not become gameplay authority.

## 11. Architecture And State Considerations

- Keep projection/view-model logic pure where possible.
- Keep `App.tsx` as orchestration and avoid turning it into the owner of complex Live or notification rules.
- Prefer dedicated modules for notification preferences, notification sound trigger decisions, Live v1 spectation projections, and responsive layout helpers where useful.
- Treat `GuestSettingsState` changes as schema/versioned compatibility work.
- Cloud-sync notification preferences through guest progress, but keep read/dismiss metadata local unless a later spec approves otherwise.
- If Live v1 needs broader multiplayer projections, prefer sanitized database views/RPCs over exposing raw game rows.
- Do not expose private profile fields, auth emails, service ids, tokens, or raw internal ids.

## 12. Backward Compatibility And Migration Constraints

- Existing local guest progress must load without data loss.
- Existing cloud progress snapshots must normalize new settings safely.
- Existing sound preference storage must continue to work.
- Existing notification read/dismiss metadata must remain valid.
- Any Supabase migration must be separately planned, reviewed, authorized, and verified before execution.
- If Live v1 requires RLS changes, the spec must define exact readable fields, eligible statuses, participant/spectator permissions, and cleanup behavior.

## 13. Verification Strategy

Each implementation stage should run focused tests first, then the stage-specific gate.

Likely final Phase 26 gate:

- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run test:full`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check
- non-printing secrets/artifact sanity check
- desktop/tablet/mobile browser smoke
- Chrome zoom/narrow-width layout smoke based on the user screenshots

Additional verification expected if Live v1 spectation changes multiplayer visibility:

- real Supabase-backed multi-client E2E, likely three-client coverage for player one, player two, and authenticated spectator;
- signed-out/guest denial or restricted-state tests unless public/guest access is separately approved;
- read-only mutation-guard tests for spectator state;
- remote row cleanup/probe checks without printing secrets.

Additional verification expected if notification sounds are implemented:

- sound trigger decision unit tests;
- preference gating tests;
- hydration/dedupe suppression tests;
- browser smoke after user interaction to ensure no repeated or surprise audio.

## 14. Risks And Mitigations

### 14.1 Responsive Layout Regression

Risk: Fixing Chrome zoom overflow could unintentionally destabilize the Lunar Signal shell or mobile layout.

Mitigation: Treat layout work as a focused stage, add component/browser smoke for desktop, tablet, mobile, and zoom/narrow-width cases, and prefer wrapping/constraint fixes over broad redesign.

### 14.2 Public Spectation Privacy Risk

Risk: Public or guest Live discovery could expose private game state, profile data, or implementation ids.

Mitigation: Keep Phase 26 to authenticated spectators, require sanitized projections, and defer public/guest access unless schema/RLS work is explicitly approved.

### 14.3 RLS And Repository Complexity

Risk: Current `async_multiplayer_games` visibility may not support third-party spectator discovery.

Mitigation: Treat Live v1 as a separately gated migration/RLS stage if needed. Stop before migration execution unless explicit authorization exists.

### 14.4 Notification Noise

Risk: Sounds and broader notification settings could become annoying or repetitive.

Mitigation: Default to important-only, preference-gate sounds, suppress initial hydration sounds, dedupe by fingerprint, and respect active-gameplay states.

### 14.5 Browser Permission Confusion

Risk: Browser notification prompts could feel intrusive or imply push support that does not exist.

Mitigation: Keep browser notifications optional and separate from in-app notifications. Do not request permission during normal gameplay.

### 14.6 Theme Scope Creep

Risk: Theme-template modernization could balloon Phase 26 and obscure urgent polish and Live work.

Mitigation: Route theme-template modernization to Phase 31 and full concrete theme implementation to Phase 32 or later.

## 15. Open Decisions For The Full Spec

The major user decisions are resolved. The unified Phase 26 spec should still define:

- the exact Chrome zoom and narrow-width smoke matrix;
- the exact notification preference fields and defaults;
- whether browser notification controls request permission in Phase 26 or only expose a deferral/preference placeholder;
- the exact Live v1 data access path and whether a migration/RLS stage is required;
- the boundaries between Phase 26 current-theme polish and later Phase 31/32 theme modernization and implementation.

## 16. Recommended Next Gated Action

Create a unified Phase 26 specification that turns this revised brief into an implementation-oriented spec. The spec should make explicit decisions about:

- the responsive layout hardening scope and screenshot-driven acceptance criteria;
- notification Settings, cloud-synced preference persistence, and important-only sound behavior;
- browser notification control boundaries;
- authenticated Live v1 spectation and any separately gated migration/RLS requirements;
- later theme-template modernization deferral and future phase routing.

After the spec is reviewed, create a detailed Phase 26 implementation plan, then run a Stage 26.0 protected baseline before any source/runtime implementation begins.
