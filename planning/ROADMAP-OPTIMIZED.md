# brrrdle Optimized Development Roadmap

**Status**: Active optimized roadmap for staged execution
**Last Updated**: 2026-06-15
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
| Phase 26 | Current polish, notification controls, and Live v1 | Chrome zoom/narrow-width hardening, cloud-synced notification preferences, important-only sounds, authenticated spectation | Execute next in gated stages |
| Phase 27 | Theme proposal/template modernization | Update theme templates and planning artifacts for the current app before full theme implementation | Defer theme-specific work from Phase 26 |
| Phase 28 | Elo/ranking and ranked matchmaking | Careful competitive rating model with Elo/rank independent from game points | Dedicated modeling and migration-aware phase |
| Phase 29 | Public player profiles | Privacy-safe public identity foundations for future social and leaderboard surfaces | Build after ranking direction is clear |
| Phase 30 | Leaderboards | Elo/rank, streak, games-played, and approved metric leaderboards | Build after profiles and ranking foundations |
| Later phases | Public spectation and expansion | Sanitized public/guest spectation, social/community systems, marketplace, additional modes | Keep separately gated |

The key optimization after Phase 25 is to keep Phase 26 practical and current-surface-focused. Theme templates, Elo/ranking, profiles, and leaderboards are important but large enough to deserve dedicated phases instead of being folded into the immediate polish and Live/notification work.

---

## Phase 26 North Star

Phase 26 should make the current app feel sturdy under real use:

- no clipped dashboard or multiplayer content at Chrome zoom or narrow desktop widths;
- responsive cards and control groups that wrap before they collide with the right rail or each other;
- Settings that clearly manage notification preferences and sound behavior;
- important-only notification sounds that respect user preferences and browser audio constraints;
- authenticated nonparticipant Live v1 spectation with read-only guarantees;
- no public/guest spectation unless a sanitized public projection is separately specified and authorized.

Phase 26 should not revise individual theme template proposal docs or create full themes. That work moves to Phase 27.

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

Polish the existing visual system, focus states, spacing, empty states, and readability without entering Phase 27 theme-template modernization.

### Stage 26.7 - Cleanup And Final Hardening

Run focused tests, full final gate, browser smoke, resource checks, progress updates, and Git handoff readiness review.

---

## Phase 27 Theme Strategy

Phase 27 should modernize theme proposal artifacts before broad theme implementation.

Required review surfaces:

- `themes/proposals/template_proposals/`
- `themes/proposals/theme_proposals.csv`
- `themes/proposals/README.md`
- current app UI surfaces after Phase 26

Goal:

- preserve the original theme template concepts;
- remove antiquated assumptions from the pre-Phase-24/25 UI;
- account for Home Dashboard, Notification Center, badges, Live, Lobby, History, Settings, responsive shell behavior, and sound preferences;
- decide which concrete full themes should be created and implemented first.

---

## Phase 28 Ranking Strategy

Phase 28 should model competitive ranking carefully before implementation.

Core requirements:

- game points and Elo/rank are independent;
- ranked matchmaking uses rank/Elo rather than raw game points;
- rating changes should account for opponent strength and game outcome quality;
- existing gameplay result rules remain stable unless a later spec explicitly changes them;
- Supabase schema/RLS implications must be separately planned and gated.

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

## Mandatory Invariants For All Future Phases

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged unless a later approved spec explicitly changes them.
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
