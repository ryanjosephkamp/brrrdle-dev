# brrrdle Optimized Development Roadmap

**Status**: Active optimized roadmap for staged execution
**Last Updated**: 2026-06-24
**Repository Target**: `brrrdle-dev`
**Source Roadmap**: `planning/ROADMAP.md`
**Purpose**: Refine the long-term roadmap into lower-risk gated phases with clear deferrals, verification expectations, and protected-action boundaries.

---

## Authority And Scope Notes

This document is a planning artifact. It does not authorize implementation by itself. Future execution should still follow:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/README.md`.
5. Active phase plans and specs.
6. `planning/testing/TESTING-SUITE.md`.
7. `progress/PROGRESS.csv` and the latest progress report.

All Phase 24+ development targets `brrrdle-dev`. The original stable `brrrdle` repository remains untouched unless explicitly authorized.

---

## Optimized Phase Map

| Phase | Optimized Focus | Primary Outcome | Recommendation |
| --- | --- | --- | --- |
| Phase 24 | Navigation and playable workspaces | Solo, Multiplayer, History, Lobby, and Live v0 become first-class app areas | Complete |
| Phase 25 | Dashboard and in-app engagement | Home Dashboard v1, Notification Center v0, badges, attention cues, and freshness labels | Complete |
| Phase 26 | Current polish, notification controls, and Live v1 | Chrome zoom/narrow-width hardening, cloud-synced notification preferences, important-only sounds, authenticated spectation | Complete |
| Phase 27 | Competitive ranking and ranked matchmaking | Elo/rank model, ranked/unranked boundaries, matchmaking strategy, competitive data foundations | Complete |
| Phase 28 | Live v1 spectator and notification stabilization | Faster authenticated spectator freshness, focused spectator view, Daily spectation integrity, terminal spectator hold, notification delivery, Elo transparency | Complete |
| Phase 29 | Public player profiles | Privacy-safe public identity foundations for future social and leaderboard surfaces | Complete |
| Phase 30 | Leaderboards | Elo/rank, streak, games-played, and approved metric leaderboards | Complete |
| Phase 31 | Multiplayer postgame actions | Practice rematch and same-settings play-again/search-again flows plus current-surface cleanup | Complete |
| Phase 32 | Multiplayer stabilization and identity routing | Repair rematch lifecycle, queue/lobby auto-routing, rival labels, avatar accent propagation, and no-comma rating display | Execute next in planning/spec gates |
| Phase 33 | Ranked mode expansion / competitive ladder v2 | Timed Practice ranked first, Daily ranked only after claim-safety proof, optional display-only rank labels | Dedicated competitive expansion phase |
| Phase 34 | Public/guest spectation | Sanitized public projection for public or guest Live discovery/spectation | Keep separately gated |
| Phase 35 | Theme proposal/template modernization | Update theme templates and planning artifacts after major feature surfaces stabilize | Defer theme-specific work until later |
| Phase 36 or later | Full concrete theme implementation | Implement concrete themes, assets, sounds, and QA after template modernization | Dedicated cosmetic phase |
| Later phases | Expansion | Social/community systems, marketplace, additional modes, and other growth work | Keep separately gated |

The key optimization after Phase 31 is to stabilize current multiplayer postgame, queue/lobby routing, identity labels, and rating display behavior before new ranked-mode expansion. Themes remain valuable but mostly cosmetic; implementing them before profile, leaderboard, ranked expansion, public spectator, and multiplayer postgame surfaces settle would create avoidable compatibility churn after each major feature phase.

---

## Phase 26 North Star

Phase 26 should make the current app feel sturdy under real use:

- no clipped dashboard or multiplayer content at Chrome zoom or narrow desktop widths;
- responsive cards and control groups that wrap before they collide with the right rail or each other;
- Settings that clearly manage notification preferences and sound behavior;
- important-only notification sounds that respect user preferences and browser audio constraints;
- authenticated nonparticipant Live v1 spectation with read-only guarantees;
- no public/guest spectation unless a sanitized public projection is separately specified and authorized.

Phase 26 did not revise individual theme template proposal docs or create full themes. After the Phase 32 stabilization reroute, that work moves to Phase 35 and Phase 36 or later.

---

## Recommended Phase 26 Stage Shape

### Stage 26.0 - Spec, Implementation Plan, And Baseline

Create the unified Phase 26 spec, detailed implementation plan, and protected baseline. No source/runtime changes.

### Stage 26.1 - Responsive Layout And State-Model Audit

Audit the user-provided Chrome screenshots, current CSS/layout constraints, notification preference persistence, sound trigger needs, and Live v1 data/RLS feasibility.

### Stage 26.2 - Responsive Shell And Workspace Hardening

Fix current UI overflow and clipping in the three-column shell, dashboard cards, Daily status panels, multiplayer setup controls, result cards, and rail-adjacent content.

### Stage 26.3 - Notification Settings And Cloud-Synced Preferences

Add notification Settings controls and persist preferences through guest/cloud progress, while keeping notification read/dismiss metadata local unless later approved.

### Stage 26.4 - Important-Only Notification Sounds And Browser Controls

Add conservative notification sound behavior and safe browser notification controls if the spec approves them. No service workers or push infrastructure.

### Stage 26.5 - Live v1 Authenticated Spectation

Add authenticated nonparticipant Live discovery and read-only spectation. If migration/RLS changes are needed, they must be separately planned and explicitly authorized before execution.

### Stage 26.6 - Current Visual Polish And Accessibility Cleanup

Polish the existing visual system, focus states, spacing, empty states, and readability without entering later theme-template modernization.

### Stage 26.7 - Cleanup And Final Hardening

Run focused tests, full final gate, browser smoke, resource checks, progress updates, and Git handoff readiness review.

---

## Phase 27 Competitive Ranking Strategy

Phase 27 completed the competitive foundation before broader public social surfaces.

Durable requirements:

- choose and justify an Elo/rank model for brrrdle multiplayer;
- keep match points independent from Elo/rank movement;
- define ranked versus unranked multiplayer behavior;
- define ranked matchmaking compatibility windows, queue widening, and fallback behavior;
- make rating transactions auditable and idempotent;
- plan schema/RLS changes separately before execution;
- create leaderboard-ready projections where useful without building full leaderboards in Phase 27.

---

## Phase 28 Live And Notification Stabilization Strategy

Phase 28 should harden current Live v1 spectator and notification behavior before public profile work.

Core requirements:

- integrate `planning/phase-28/LIVE-V1-SPECTATOR-REFRESH-DIAGNOSIS.md`;
- use immediate Live-entry refresh plus 3-5 second foreground polling only while the Live subtab is active and the document is visible;
- preserve sanitized authenticated spectator RPC boundaries and read-only spectator behavior;
- make `Spectate live game` open a focused read-only spectator experience;
- retain sanitized terminal board/outcome state briefly before completed games leave Live;
- exclude current Daily Multiplayer games from spectator discovery to prevent answer leakage;
- investigate and fix local foreground browser notification delivery within the existing no-service-worker/no-push architecture;
- add player-facing Elo transparency without changing the Phase 27 Elo model.

---

## Phase 29 Profile Strategy

Phase 29 should define privacy-safe public player profile foundations.

Core requirements:

- no raw auth emails or private account metadata;
- explicit public identity projection;
- optional player-provided profile fields with safe defaults;
- future compatibility with leaderboards and profile links.

---

## Phase 30 Leaderboard Strategy

Phase 30 should add leaderboards after ranking and profile identity are stable.

Candidate leaderboard classes:

- Elo/rank;
- streaks;
- total games played;
- approved achievements or performance metrics.

Leaderboard work should include abuse resistance, privacy review, RLS/schema planning, and real data verification.

---

## Phase 31 Multiplayer Postgame Action Strategy

Phase 31 should add postgame convenience flows after ranked queue and current Live/notification behavior are stable.

Core requirements:

- Practice-only rematch request/accept with the same opponent and same settings;
- same-settings play-again or search-again actions;
- no Daily rematches or Daily replay/search-again shortcuts that bypass claim rules;
- preserve ranked/unranked boundaries, trusted queue behavior, and all gameplay invariants;
- define durable mutual-intent, cancellation, timeout, and verification behavior before implementation.

---

## Phase 32 Multiplayer Stabilization Strategy

Phase 32 should repair user-reported post-Phase-31 multiplayer and identity issues before adding new ranked modes.

Core requirements:

- keep Phase 30 public leaderboards scoped to current trusted ranked Practice v1 data;
- fix the global account avatar chip so saved private accent changes propagate to the signed-in avatar;
- make one-player rematch requests visible to the opponent with accept/decline, and make decline/cancel/created states visible to both participants;
- fix safe rematch creation for eligible completed unranked non-custom Practice games;
- auto-route ranked queue creators and unranked lobby creators when a rival matches or joins;
- fix opponent identity labels so safe profile names appear instead of the opponent being shown as `You` or generic `Rival` when a safe label exists;
- apply no-comma Elo/rating formatting across player-facing surfaces;
- add focused tests and real two-client E2E only after the fixes are implemented and stable;
- preserve match points versus Elo separation, trusted settlement authority, Daily claim safety, and all gameplay rules.

---

## Phase 33 Ranked Mode Expansion Strategy

Phase 33 should revisit ranked options that were intentionally deferred from Phase 27 and kept out of Phase 30.

Core requirements:

- keep Phase 30 public leaderboards scoped to current trusted ranked Practice v1 data unless a Phase 33 spec explicitly adds new safe buckets;
- implement timed Practice ranked first only after clock fairness, trusted timeout settlement, queue compatibility, RLS, and two-client verification are planned;
- consider Daily ranked only after Daily claim safety, UTC-day uniqueness, answer separation, no-clock behavior, and anti-cheat implications are proven;
- keep ranked custom/private-code games deferred unless a later approved spec authorizes ladder-integrity and anti-abuse controls;
- consider rank labels/bands only as rating-derived display labels, never rating authority;
- preserve match points versus Elo separation and trusted settlement authority.

---

## Phase 34 Public/Guest Spectation Strategy

Phase 34 may add public or guest Live spectation if a sanitized public projection remains product-desirable.

Core requirements:

- do not expose raw answers, seeds, serialized sessions, raw auth ids, emails, private profile data, or participant-only mutable state;
- separate public/guest spectation from authenticated participant and authenticated spectator flows;
- keep spectation read-only and unable to affect ratings, claims, timers, results, or game state;
- require explicit Supabase schema/RLS planning and authorization before implementation.

---

## Phase 35 Theme Strategy

Phase 35 should modernize theme proposal artifacts before broad theme implementation.

Required review surfaces:

- `themes/proposals/template_proposals/`
- `themes/proposals/theme_proposals.csv`
- `themes/proposals/README.md`
- current app UI surfaces after ranking, Live/notification stabilization, profile, leaderboard, multiplayer postgame, Phase 32 stabilization, ranked expansion, and public spectator planning

Goal:

- preserve the original theme template concepts;
- remove antiquated assumptions from the pre-Phase-24/25 UI;
- account for Home Dashboard, Notification Center, badges, Live, Lobby, History, Settings, responsive shell behavior, sound preferences, ranked multiplayer, profiles, leaderboards, multiplayer postgame actions, and any approved public spectator surfaces;
- decide which concrete full themes should be created and implemented first.

---

## Phase 36+ Full Theme Implementation Strategy

Phase 36 or later should implement concrete themes only after the templates are modernized.

Candidate work:

- concrete theme specs derived from modernized templates;
- palettes, surfaces, effects, sounds, and assets;
- theme-specific accessibility and responsive QA across all current app surfaces;
- strict preservation of tile-state semantics and gameplay legibility.

---

## Mandatory Invariants For All Future Phases

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Current Daily Multiplayer answer leakage through spectator views must be prevented.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged unless a later approved spec explicitly changes them.
- Ranked Practice v1 remains the only ranked match type from Phase 27 unless Phase 33 or a later approved spec changes it; Daily ranked and timed Practice ranked remain deferred until that competitive expansion gate.
- Match points and Elo/rank movement remain separate.
- Live v1 spectator behavior remains read-only; public/guest spectation remains unavailable unless a later approved phase explicitly implements sanitized public projections.
- Existing scoring, timeout, forfeit, rating/ELO, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged unless specifically approved.
- Dashboard, notification, sound, theme, profile, ranking, leaderboard, and spectator state must not become gameplay authority.
- No migrations, deployments, releases, merges, branch deletion, or original stable `brrrdle` repository work occur without explicit authorization.

---

## Verification Expectations

Every future implementation phase should define focused tests and a final gate before source changes begin.

Baseline local gate remains:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check

Feature-specific gates:

- Live/spectator changes require real Supabase-backed multi-client E2E.
- Ranking/leaderboard/profile changes require schema/RLS review and non-printing secret/artifact scans.
- UI polish and theme work require desktop/tablet/mobile browser smoke and overflow checks.
- Notification sound/browser notification work requires preference, dedupe, hydration, and permission-state tests.

---

**End of Optimized Roadmap**
