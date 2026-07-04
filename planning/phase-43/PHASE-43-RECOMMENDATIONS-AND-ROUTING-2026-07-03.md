# Phase 43 Recommendations And Routing

**Status**: Recommendation and routing document - awaiting user review before official Phase 43 planning brief.
**Date**: 2026-07-03
**Repository**: `brrrdle-dev`
**Basis**: `planning/phase-43/PHASE-43-UI-UX-GAMEPLAY-INTAKE-2026-07-03.md`, Phase 42 manual-review follow-up notes, Phase Scope Sizing Guide, roadmap, testing strategy, and current source-surface scan.

## Purpose

This document converts the Phase 43 intake into Codex's recommended routing plan. It decides what should move into the next official planning brief, what should be deferred, and which topics need extra gates before implementation.

This document is not implementation authorization. It does not authorize source/runtime edits, test edits, migrations, deployment/configuration, Git/GitHub operations, or work in the original stable `brrrdle` repository.

## Executive Recommendation

Reroute Phase 43 from the old "Progression HUD, Focus Mode, and mobile UX shell polish" roadmap slot into:

**Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort**

This is the best next phase because the Phase 42 manual review surfaced a coherent usability payload across the current app:

- the ranked Practice queue still has user-visible search-again/matching/status issues;
- several recently added pages need information-architecture cleanup before further features are stacked on top;
- Home, Solo, Practice Multiplayer, Stats, Help, Settings, and the global shell all need simplification;
- gameplay and spectator surfaces need viewport/keyboard comfort work that should become durable regression coverage;
- the work shares app-shell, routing, current route UI, visual review, mobile overflow, and E2E harness concerns.

The old Phase 43 work remains valuable, but should move later. Focus Mode, compact navigation, progression counters, and broader mobile shell overhaul would churn the same UI surfaces that now need simpler current-state cleanup first.

## Phase Scope Sizing Decision

The Phase Scope Sizing Guide supports making Phase 43 a cohesive macro-phase if implementation stages stay narrow.

Recommended Phase 43 shape:

- one macro-phase for current-surface human usability;
- separate stages for ranked queue reproduction/repair, app-shell cleanup, route information architecture, dense list cleanup, gameplay viewport comfort, and final hardening;
- focused tests during each source stage;
- final broad verification, visual handoff review, and manual review checklist at the end.

Do not make any single implementation stage absorb the entire intake. The phase is allowed to be broad; each stage should remain small enough to debug and review independently.

## Recommended Phase 43 In Scope

### 1. Ranked Practice queue follow-up

Treat the ranked Practice Multiplayer issues as the highest-priority bugfix area in Phase 43.

Recommended in-scope work:

- reproduce the three-player matching issue where Player 3 waits in the same exact ranked queue but Players 1 and 2 cannot match with Player 3 after their completed game;
- investigate whether recent-opponent avoidance, stale queue rows, idempotency keys, status polling, or finalization state causes Player 1 and Player 2 to match each other again instead of Player 3;
- repair search-again requester routing so the player who clicked search again auto-routes only if they are still in that waiting/postgame context;
- clear the stale "Still waiting for a compatible signed-in rival" box after match/open/finalization;
- either justify, remove, or redesign the "Check ranked queue" action if it does not provide useful player-visible value;
- add real two/three-client E2E coverage if a source fix lands.

Risk classification:

- likely source/test-first;
- stop and route to migration/RLS addendum planning if reproduction proves a trusted queue RPC or database-contract gap.

### 2. Stats tab information architecture

Move public site stats out of the local-stats section.

Recommended in-scope work:

- keep local/personal stats first;
- place public live-site stats at the bottom;
- label public stats as aggregate-only and separate from private local gameplay history;
- preserve Phase 42 parser/privacy boundaries.

Risk classification:

- source/test-only if no RPC contract change is needed.

### 3. Help, About, and Settings cleanup

The current Help content should not be treated as final.

Recommended in-scope work:

- remove the current Help route content from Help and replace it with a small placeholder or "coming later" surface;
- move any still-useful current rules/context copy into About if it is not already represented there;
- move Help navigation between Settings and Feedback;
- remove the Help/tutorial card from the top of Settings;
- preserve the Help route as a future location for richer visual/interactive tutorials.

Risk classification:

- source/test-only;
- keep rich GIF/interactive tutorial work deferred until later.

### 4. Global shell and Home cleanup

The current three-column/global shell and Home dashboard should become less intimidating before adding more visible features.

Recommended in-scope work:

- remove the right-side mode/account/sync/sound/theme panel from ordinary route pages;
- move sync access into Profile or Settings after a small source audit;
- avoid duplicating sound/theme controls globally when Settings/Profile already own them;
- simplify Home's default information density;
- preserve the idea of future Home widgets, but do not build a full user-configurable widget system yet;
- repair Recent Results so it does not require horizontal scrolling at normal zoom.

Risk classification:

- source/test and visual-review heavy;
- no persistence/widget-customization system in Phase 43 unless separately authorized.

### 5. Practice Multiplayer layout cleanup

Practice Multiplayer is functional but visually dense.

Recommended in-scope work:

- collapse or demote the Ranked Practice V1 explanatory block;
- reconsider the placement of the Private Practice requests area without building a full social inbox yet;
- replace or reduce the large dense grid of completed/canceled/won/lost game buttons;
- make completed-game review primarily belong to History if History can safely route to completed games;
- allow current/active multiplayer items to remain easy to find.

Risk classification:

- source/test-only if it reuses existing participant-owned reads;
- route to a later inbox/social phase for full inbound/outbound request center, following, messaging, or mailbox redesign.

### 6. Solo mode layout cleanup

The Solo subtabs should remove redundant setup/status rows and improve mode-toggle presentation.

Recommended in-scope work:

- apply cleanup to all relevant Solo subtabs, not only Practice Solo;
- make OG/GO mode choice compact and polished;
- remove redundant Word length / Current puzzle / Chain status / Seed lists rows where the same information is obvious from the active game/configuration surface;
- keep the lower Practice length/customize/gameplay-adjacent content that the user marked as good.

Risk classification:

- source/test-only;
- preserve gameplay rules, setup locks, Hard Mode defaults, and Practice GO chain behavior.

### 7. Top account menu, notifications click-away, and back-to-top

These are small global interaction fixes that fit Phase 43 because they reduce shell friction.

Recommended in-scope work:

- change the signed-in avatar/name chip from immediate Profile navigation to a dropdown with "View profile" and "Sign out";
- close the account dropdown on outside click or repeated avatar click;
- condense top Daily and Daily Multiplayer clock controls without removing their functions;
- close expanded notifications on outside click/background click;
- add a non-overlapping back-to-top icon after meaningful page scroll.

Risk classification:

- source/test-only;
- no full notification mailbox redesign.

### 8. Gameplay viewport and keyboard comfort

Phase 43 should address player comfort around keyboard movement and viewport stability, but carefully.

Recommended in-scope work:

- display transient invalid-guess messages without shifting the on-screen keyboard vertically;
- preserve the content of invalid-guess and Hard Mode messages;
- keep persistent gameplay messages such as Give Up / Reveal Answer intact;
- when persistent content or board growth legitimately changes layout, explore auto-scroll behavior that keeps the keyboard visible only when the player is actively centered in the gameplay area;
- apply the chosen approach across Solo and Multiplayer variants where practical;
- add regression coverage after the behavior is confirmed.

Risk classification:

- source/test and browser-behavior heavy;
- likely needs careful visual/browser review.

### 9. Spectator latest-turn comfort

Spectator auto-scroll is related to gameplay viewport comfort but should be kept as a bounded subtask.

Recommended in-scope work:

- if feasible, keep the latest turn/guess visible only when the spectator is already centered on the spectated game area;
- stop auto-scroll when the user scrolls away;
- preserve Phase 38 public/guest read-only spectator boundaries and Daily spectator exclusion.

Risk classification:

- source/test-only if it changes only client viewport behavior;
- no spectator presence/count/list or contract changes.

## Recommended Later Work

### Profile simplification

Defer to a separate profile/account phase or a dedicated addendum-backed stage after Phase 43.

Reason:

- Simplifying public/private display names, accent colors, bios, avatar fields, and profile discoverability affects Phase 29/40 privacy assumptions.
- It may require schema/RLS or parser-contract review before source integration.

Recommended later scope:

- one unified profile display model if safe;
- one public/private field mapping strategy;
- clear discoverability rules for multiplayer/leaderboard participants;
- Save and Sign out placement cleanup.

### Custom-code removal, private Daily requests, and ranked Daily separation

Defer to a multiplayer/Daily contract phase or an explicit migration/RLS addendum path.

Reason:

- Removing or rerouting custom-code match type touches Daily and Practice multiplayer setup contracts.
- Private Daily requests touch Daily claim safety and may need new request/claim semantics.
- Ranked Daily separation requires competitive-integrity planning so ranked and unranked answers/chains cannot leak into each other.

Recommended later scope:

- remove or hide custom-code match type where it is nonfunctional or misleading;
- decide whether private Daily unranked requests are allowed;
- define whether private Daily consumes the same unranked Daily availability/streak/performance slot;
- keep ranked Daily separate from unranked Daily before any ranked Daily implementation.

### Full request inbox, mailbox, social, following, and messaging

Defer.

Reason:

- The user raised this as a possible future solution to private request scale, not as an immediate current-surface requirement.
- It likely overlaps notification architecture, social graph, privacy, and anti-abuse design.

### Rich Help/tutorial media

Defer until the current app shape is more stable.

Reason:

- The user explicitly wants the current Help tab to become a richer visual/interactive tutorial later, once the product is closer to final shape.
- Building detailed media now risks becoming stale immediately after Phase 43/44 UI changes.

### User-configurable Home widgets

Defer.

Reason:

- The user likes the eventual widget idea, but Phase 43 should first reduce default clutter and preserve a simple Home baseline.
- Widget customization implies persistence, settings, and layout-management scope.

### Progression HUD, Focus Mode, compact navigation, and broader mobile shell overhaul

Defer the old Phase 43 scope to a later phase.

Reason:

- Current app-shell cleanup should happen before adding a new Focus Mode or persistent compact-navigation model.
- Progression counters should wait until each displayed resource has clear gameplay function and placement.

### Draw by repetition

Defer to a dedicated gameplay-rule gate.

Reason:

- Automatic draw-by-repetition changes multiplayer game rules and terminal result logic.
- It must not be bundled with ordinary UI cleanup.
- It should get its own rule specification, focused reducer/domain tests, multiplayer E2E, and manual review.

## Migration/RLS Gate Recommendations

Phase 43 should start source/test-first and migration-free, except that the ranked queue audit must stop if it proves a trusted queue RPC/database contract gap.

Migration/RLS addendum gates are recommended for later work involving:

- profile simplification if existing public/private profile RPCs cannot support the desired unified model safely;
- private Daily requests or Daily claim-slot changes;
- ranked Daily answer/claim separation;
- any new social inbox, mailbox, following, or request notification persistence;
- any custom-code contract redesign that adds or changes persisted invite semantics.

## Gameplay Rule Gate Recommendations

The draw-by-repetition idea should be treated as a gameplay-rule proposal, not a UI cleanup item.

The future rule gate should answer:

- whether the existing 12-incorrect-guess draw in unranked Practice GO Multiplayer is intended;
- whether draw-by-repetition applies to OG, GO, Practice only, Daily, ranked, unranked, timed, or all multiplayer variants;
- whether warnings are shown after the first repeated pair and second repeated pair;
- how the draw reason is represented in result history, scoring, and rated/unrated settlement;
- whether ranked games may ever use this rule without Elo abuse concerns.

Until that gate is approved, Phase 43 should preserve existing gameplay rules.

## Testing Protocol Recommendations

The user's testing-method request is sound: after a Phase 43 behavior is implemented and manually confirmed, promote the durable expectation into automated or manual regression coverage where practical.

Recommended testing upgrades for Phase 43:

- add three-client ranked queue E2E coverage for the Player 1 / Player 2 / Player 3 scenario if reproduced;
- expand search-again routing tests to assert contextual auto-route only when the requester is waiting for that game;
- assert stale ranked queue waiting panels disappear after match/open/finalization;
- extend mobile-scroll/layout checks to catch normal-zoom horizontal overflow on Home Recent Results or equivalent row layouts;
- add component/browser tests for Help placeholder/About copy routing, Settings Help-card removal, and Stats local/public ordering;
- add component or browser tests for account dropdown outside-click and notification outside-click dismissal;
- add browser-level gameplay viewport checks for invalid-guess message keyboard stability after the implementation is validated;
- add visual handoff captures for Home, Stats, Settings, Help, Solo, Practice Multiplayer, and representative gameplay keyboard states.

Do not over-promote everything into brittle tests at once. Prefer durable selectors and behavior assertions over pixel-perfect screenshots.

## Repository Documentation Updates Made By This Pass

This recommendation pass should update:

- `planning/README.md` for Phase 43 discoverability;
- `planning/ROADMAP.md` and `planning/ROADMAP-OPTIMIZED.md` so Phase 43 is rerouted and old Phase 43 work moves later;
- `planning/testing/TESTING-SUITE.md` with the testing-protocol lesson from this intake.

## Recommended Official Phase 43 Stage Breakdown

Use this only as input to the official Phase 43 planning brief.

1. **Stage 43.0 - Protected Baseline And Intake Confirmation**
   - Confirm repo state, preserve Phase 42 manual-review checklist, record Phase 43 intake/recommendation artifacts, and run baseline verification.

2. **Stage 43.1 - Current UX And Ranked Queue Audit**
   - Reproduce ranked Practice queue issues and map app-shell, Home, Stats, Help, Settings, Solo, Practice Multiplayer, notification, and gameplay viewport surfaces.

3. **Stage 43.2 - Ranked Practice Queue Follow-Up**
   - Repair three-player matching/search-again/stale-status behavior if source/test-only, or stop for migration/RLS addendum planning if needed.

4. **Stage 43.3 - Stats, Help, About, And Settings Information Architecture**
   - Move public stats, simplify Help, move surviving copy to About, remove the Settings Help card, and adjust Help navigation.

5. **Stage 43.4 - App Shell, Header, Home, And Horizontal Overflow Cleanup**
   - Remove/demote the right rail, add account dropdown behavior, condense top clocks, simplify Home defaults, and remove Recent Results horizontal scroll.

6. **Stage 43.5 - Solo And Practice Multiplayer Density Cleanup**
   - Improve Solo mode toggles/status rows, collapse ranked info, and replace dense Practice Multiplayer completed-game button grids with a cleaner current/history split.

7. **Stage 43.6 - Gameplay Viewport, Notifications, Back-To-Top, And Spectator Comfort**
   - Stabilize invalid-guess keyboard movement, explore persistent-message auto-scroll, add notifications click-away, add back-to-top, and handle spectator latest-turn comfort where feasible.

8. **Stage 43.7 - Final Hardening, Visual Review, Changelog, Manual Checklist**
   - Run focused and full verification, visual handoff review, changelog, review checklist, and final progress evidence.

## Recommended Next Gate

The next safe gate is the official Phase 43 planning brief.

The planning brief should use this recommendation document as authority for routing, but it should still require a later unified spec and implementation plan before any source implementation begins.

Do not begin implementation from this document alone.
