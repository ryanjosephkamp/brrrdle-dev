# brrrdle Optimized Development Roadmap

**Status**: Active optimized roadmap for staged execution
**Last Updated**: 2026-07-02
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

Future planning should also use `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`: phases may become larger cohesive macro-phases when that improves verification economy, but implementation stages should remain narrow, single-purpose, and explicitly gated.

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
| Phase 32 | Multiplayer stabilization and identity routing | Repair rematch lifecycle, queue/lobby auto-routing, rival labels, avatar accent propagation, and no-comma rating display | Complete |
| Phase 33 | Competitive ladder v2 readiness | Canonical five-minute timed ranked Practice, display-only rank bands, public leaderboard cleanup, and timed ranked E2E | Complete |
| Phase 34 | Live/Lobby/notification current-surface stabilization | Repair Live identity labels/readability, add Live ranked labels, streamline Lobby join, improve notification direct-resume, and strengthen turn cues | Complete |
| Phase 35 | Live identity, auth, deployment, and account-management readiness | Repair persistent ranked Live safe-name fallback, diagnose Vercel magic-link access and Supabase redirects, improve auth copy, password/email management, Settings/Danger Zone responsibilities, and Profile tab readiness | Complete |
| Phase 36 | Leaderboard and Stats navigation split | Add a main Leaderboard tab, move public leaderboard and Multiplayer Ratings there, and keep local stats in Stats | Complete |
| Phase 37 | Navigation and gameplay ergonomics | Auto-center gameplay on enter/join/resume, add browser back/forward history integration, and repair solo invalid-guess sound consistency | Complete |
| Phase 38 | Public/spectator readiness | Sanitized public/guest Practice Live spectation with spectator presence/count/list deferred | Complete |
| Phase 39 | Mobile performance and scroll smoothness | Audit mobile scroll latency, add feasible measurement guards, and tune complex current surfaces without broad redesign | Complete |
| Phase 40 | Public profiles and private matchmaking | Clickable public profile surfaces, private Practice match requests, safe accepted-game routing, and two-client E2E hardening | Complete |
| Phase 41 | Multiplayer reliability and real E2E hardening | Ranked queue/search-again reliability, leaderboard freshness, private request stale-state cleanup, mobile multiplayer freshness, and two/three-client E2E expansion | Complete |
| Phase 42 | Site stats, developer dashboard, onboarding, and help | Public live-site stats, private admin/developer observability, beginner-friendly help/tutorial UX, and the remaining ranked queue button/status flashing follow-up | Next planning target |
| Phase 43 | Progression HUD, Focus Mode, and mobile UX shell polish | Header/top-site resource counters after earnables have clear function, plus late Focus Mode, compact navigation, and broader mobile UX improvements | Keep late and separately gated |
| Phase 44 | Theme proposal/template modernization | Update theme templates and planning artifacts after major feature surfaces stabilize | Defer theme-specific work until later |
| Phase 45 or later | Full concrete theme implementation | Implement concrete themes, assets, sounds, and QA after template modernization | Dedicated cosmetic phase |
| Later phases | Expansion | Social/community systems, marketplace, additional modes, and other growth work | Keep separately gated |

After Phase 41, multiplayer reliability and real E2E hardening are complete and manually reviewed with one remaining minor/cosmetic follow-up: ranked Practice queue buttons can still flash roughly every five seconds after queue entry. Phase 42 should proceed as the observability and beginner UX macro-phase while absorbing that issue as a narrow early source/test-only follow-up if audit confirms it is bounded. Progression HUD/Focus Mode/mobile UX overhaul and theme work remain separately gated.

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

Phase 33 is complete. It revisited ranked options that were intentionally deferred from Phase 27 and kept out of Phase 30, then implemented the safest narrow expansion.

Delivered and preserved:

- canonical five-minute timed ranked Practice with separate timed buckets;
- display-only rank bands, never rating authority;
- public leaderboard `All buckets` removal with OG/GO only;
- Daily ranked and ranked custom/private-code games remain deferred;
- preserve match points versus Elo separation and trusted settlement authority.

---

## Phase 34 Live/Lobby/Notification Strategy

Phase 34 is complete. It stabilized current authenticated Multiplayer Live, Lobby, Active Games, and local foreground notification behavior.

Core requirements:

- fix selected Live subtab count badge contrast without using urgent red semantics;
- make Live participant and authenticated spectator rows consistently prefer safe public/profile names;
- make `You` describe only the viewer, never the opponent;
- show ranked/unranked status on Live cards using safe existing metadata;
- replace joinable Lobby `Open to join` with a direct guarded `Join` action;
- route multiplayer-turn foreground notifications to the exact game when safe, with a fallback to Active Games;
- make Active Games `Your turn` items visually distinct;
- require a migration/RLS addendum only if existing safe projections cannot support the Live identity/ranked-label fixes.

---

## Phase 35 Live Identity/Auth/Deployment/Account Strategy

Phase 35 should first repair the persistent ranked Live safe-name fallback found during Phase 34 manual review, then diagnose and improve account, Profile, and deployment readiness.

Core requirements:

- reproduce or inspect the ranked Live creator/joiner/spectator identity examples and determine whether the fix is source-only or requires a migration/RLS addendum;
- ensure ranked Live participant and signed-in spectator cards prefer safe public/profile names before generic `Rival`, `Player one`, or `Player two` fallbacks;
- determine whether Vercel deployment protection or preview access causes the magic-link `Log in to Vercel` screen;
- audit Supabase Site URL and redirect URL assumptions;
- improve account creation and confirmation copy;
- add safe signed-in password change and email change flows if approved;
- clarify Settings account management versus Danger Zone responsibilities;
- add a first-class current-player Profile tab if the unified spec confirms this can stay source-only and privacy-safe;
- stop before Vercel/Supabase configuration changes unless explicitly authorized.

---

## Phase 36 Leaderboard/Stats Strategy

Phase 36 should isolate competitive and public rating content from local stats after account/profile navigation is clearer.

Core requirements:

- add a main `Leaderboard` tab between `Stats` and `Words`;
- move the public ranked leaderboard and Multiplayer Ratings/competitive multiplayer surfaces from `Stats` into `Leaderboard`;
- leave local stats in `Stats`;
- keep public leaderboards display-only, authenticated-only, non-authoritative, and limited to approved buckets unless a later spec changes that;
- verify navigation, responsiveness, focus behavior, and Stats/leaderboard regressions.

---

## Phase 37 Navigation/Game Ergonomics Strategy

Phase 37 is complete. It improved route ergonomics and gameplay-entry comfort without changing gameplay rules.

Core requirements:

- auto-center or focus the gameplay area when a player enters, joins, resumes, or notification-routes into a game;
- design browser back/forward integration for route, main tab, subtab, and selected-game history;
- fall back safely when a selected game is hidden, stale, completed, deleted, or unavailable;
- make solo invalid guesses in OG and GO use the same invalid-guess sound cue as multiplayer invalid guesses;
- preserve Daily claim safety, ranked queue routing, notification direct-resume behavior, and all gameplay/Elo rules.

---

## Phase 38 Public/Spectator Strategy

Phase 38 is complete. It added public/guest Practice Live discovery and read-only spectation after a sanitized public projection was approved and verified. Spectator presence/count/list work remains deferred.

Core requirements:

- do not expose raw answers, seeds, serialized sessions, raw auth ids, emails, private profile data, or participant-only mutable state;
- separate public/guest spectation from authenticated participant and authenticated spectator flows;
- keep spectation read-only and unable to affect ratings, claims, timers, results, or game state;
- require explicit Supabase schema/RLS planning and authorization before implementation;
- define spectator counts and lists as presence/display surfaces, not gameplay authority.

---

## Phase 39 Mobile Performance And Scroll Smoothness Strategy

Phase 39 is complete and manually reviewed. It addressed user-reported mobile page-scroll latency before adding more public/social UI surface area.

Core requirements:

- audit global CSS, app shell, shared UI primitives, and complex current workspaces for likely scroll-jank causes;
- reproduce or characterize the issue without assuming the root cause;
- add feasible scroll/layout/performance guards without brittle absolute frame-rate thresholds;
- make targeted source/CSS improvements only when supported by audit evidence;
- preserve fast gameplay input, Phase 38 public/guest spectator behavior, Phase 37 browser history/gameplay auto-centering, and all gameplay/Elo rules;
- keep broad mobile navigation redesign, Focus Mode, and compact shell overhaul deferred to Phase 43 or later.

---

## Phase 40 Public Profile And Private Matchmaking Strategy

Phase 40 is complete. It handled public profile browsing and authenticated-only unranked Practice private match invitations after mobile performance readiness, with privacy/RLS and anti-abuse audit gates.

Core requirements:

- clickable player names and avatars must use safe public profile fields only;
- rival avatar accent/custom-image projections require public-profile privacy review;
- custom-code private games should not appear in inappropriate public surfaces;
- direct player match requests should default to unranked/custom games;
- ranked and Daily invitations stay deferred unless a later competitive-integrity spec approves them.

---

## Phase 41 Multiplayer Reliability And Real E2E Strategy

Phase 41 should address Phase 40 manual-review follow-up issues before the roadmap continues into observability and beginner UX. It should focus on reliability, reproduction, and durable real E2E coverage for current multiplayer surfaces.

Core requirements:

- ranked Practice search-again, queue cancellation, stale queue participation, and queue-button status stability must be audited and repaired only within trusted ranked queue boundaries;
- public ranked leaderboard freshness or eligibility issues must be fixed without making the public leaderboard authoritative or exposing private fields;
- private Practice request cancel, decline, expire, accept, requester feedback, and accepted-game routing must remain authenticated-only, Practice-only, unranked-only, and public-profile-targeted;
- real two-client and three-client Supabase-backed E2E harnesses should be expanded with deterministic cleanup and bounded waits;
- mobile Practice Multiplayer request/lobby/list freshness should be covered where feasible;
- final hardening should include a Codex-assisted manual-review preflight that documents automated evidence, Codex-attempted browser/manual checks, and remaining user-only review items.

---

## Phase 42 Stats, Dashboard, Onboarding, And Help Strategy

Phase 42 should handle observability and beginner UX after multiplayer reliability and real E2E hardening are complete, while carrying the remaining ranked Practice queue button/status flashing issue as a narrow early follow-up.

Core requirements:

- public site stats must avoid leaking private user, session, or game data;
- private developer dashboards need admin authorization and privacy review;
- onboarding/help/tutorial surfaces should teach without changing gameplay rules;
- ranked Practice queue button/status flashing should be reproduced or characterized before any source/test-only repair;
- any telemetry/presence model should be planned before implementation.

---

## Phase 43 Progression HUD, Focus Mode, And Mobile UX Strategy

Phase 43 or later should handle late-stage shell polish after the major route, multiplayer, public/spectator, profile/social, private matchmaking, stats/dashboard, onboarding/help, and account surfaces are clearer.

Core requirements:

- show EXP, coins, and any other real earnable/collectible counters near the top/header area only after those resources have clear gameplay function;
- support both guest players and signed-in players, preserving guest-to-account transfer expectations;
- add a player-toggleable Focus Mode only after the main shell is stable enough to avoid repeated compatibility churn;
- consider broader mobile UX improvements such as compact navigation and reduced top-of-page chrome after the current performance-focused Phase 39 is complete;
- keep the compact navigation fully functional and accessible;
- persist any Focus Mode default only through approved guest/account settings paths;
- preserve gameplay legibility, route discoverability, responsive behavior, and all tile-state/gameplay semantics.

---

## Phase 44 Theme Strategy

Phase 44 should modernize theme proposal artifacts before broad theme implementation.

Required review surfaces:

- `themes/proposals/template_proposals/`
- `themes/proposals/theme_proposals.csv`
- `themes/proposals/README.md`
- current app UI surfaces after ranking, Live/notification stabilization, auth/deployment readiness, profile/social surfaces, spectator planning, mobile performance tuning, site stats, onboarding, progression HUD, Focus Mode, and multiplayer postgame systems

Goal:

- preserve the original theme template concepts;
- remove antiquated assumptions from the pre-Phase-24/25 UI;
- account for Home Dashboard, Notification Center, badges, Live, Lobby, History, Settings, responsive shell behavior, sound preferences, ranked multiplayer, profiles, leaderboards, spectator surfaces, onboarding, multiplayer postgame actions, and any approved public stats surfaces;
- decide which concrete full themes should be created and implemented first.

---

## Phase 45+ Full Theme Implementation Strategy

Phase 45 or later should implement concrete themes only after the templates are modernized.

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
- Ranked Practice includes Phase 27 untimed ranked Practice plus Phase 33 canonical five-minute timed ranked Practice; Daily ranked and ranked custom/private-code games remain deferred until a later approved competitive-integrity gate.
- Match points and Elo/rank movement remain separate.
- Live v1 spectator behavior remains read-only; public/guest spectation remains Practice-only, read-only, and limited to the sanitized Phase 38 public projection unless a later approved phase explicitly changes that boundary.
- Existing scoring, timeout, forfeit, rating/ELO, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged unless specifically approved.
- Dashboard, notification, sound, theme, profile, ranking, leaderboard, and spectator state must not become gameplay authority.
- No migrations, deployments, releases, merges, branch deletion, or original stable `brrrdle` repository work occur without explicit authorization.

---

## Verification Expectations

Every future implementation phase should define focused tests and a final gate before source changes begin.

The preferred cadence is larger cohesive phase scope when justified, focused stage-level verification during implementation, and broad final verification before Git handoff. Do not broaden a stage simply because the phase is larger.

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
