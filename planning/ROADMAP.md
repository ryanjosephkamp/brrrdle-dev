# brrrdle Development Roadmap

**Status**: Active long-term roadmap for `brrrdle-dev`
**Last Updated**: 2026-06-17
**Purpose**: This document records the long-term product direction for `brrrdle-dev` while keeping implementation gated by the constitution, phase specs, progress records, and explicit user authorization.

---

## Overview

The goal of `brrrdle-dev` is to evolve `brrrdle` into a more organized, social, scalable, and polished word-game experience while protecting the stability of the playable game.

All new development targets the independent local repository:

`/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`

The original stable `brrrdle` repository remains a reference archive unless the user explicitly authorizes work against it.

This roadmap is planning guidance only. It does not authorize implementation, migrations, deployments, commits, PRs, merges, releases, branch deletion, or work against the original stable repository.

---

## Current State After Phase 27

- Phase 23 stabilized the core Solo and Multiplayer gameplay model and added broad local plus real Supabase-backed E2E coverage.
- Phase 24 made Solo, Multiplayer, History, Lobby, and Live v0 first-class app areas.
- A pre-Phase-25 bugfix added the missing Multiplayer OG solved-row hold before final results.
- Phase 25 added Home Dashboard v1, in-app Notifications v0, navigation badges, workspace attention cues, and Lobby/Live freshness while deferring browser notifications.
- Phase 26 completed current UI polish/hardening, Chrome zoom and narrow-width overflow fixes, cloud-synced notification preferences, important-only notification sounds, safe local browser-notification controls, and authenticated Live v1 spectation.
- Phase 27 completed competitive ranking and ranked matchmaking foundations, including Elo/rank hardening, trusted ranked Practice settlement, durable ranked Practice queue behavior, ranked UI/stats/copy, and private leaderboard-ready projections.
- After Phase 27, Phase 28 is routed to current Live v1 spectator and notification stabilization before public profile and leaderboard work. Theme-specific work remains intentionally deferred until later in the workflow so core social, leaderboard, spectator, and multiplayer UX surfaces can stabilize first.

---

## Phase Summary Table

| Phase | Main Focus | Key Features | Status |
| --- | --- | --- | --- |
| Phase 23 | Multiplayer stabilization and testing suite | Multiplayer unification, bug fixes, two-client E2E coverage | Complete |
| Phase 24 | Navigation and workspaces | Solo, Multiplayer, History, Lobby, Live v0, route/subtab model | Complete |
| Pre-Phase-25 | Multiplayer OG solved-row hold | Cosmetic terminal all-green hold for Practice/Daily Multiplayer OG | Complete |
| Phase 25 | Dashboard and notifications | Home dashboard, in-app notifications, badges, attention cues | Complete |
| Phase 26 | Polish, notification controls, and Live v1 | Chrome zoom/narrow-width layout fixes, notification Settings/sounds, authenticated spectation | Complete |
| Phase 27 | Competitive ranking and ranked matchmaking | Elo/rank model, ranked/unranked boundaries, matchmaking strategy, leaderboard-ready data foundations | Complete |
| Phase 28 | Live v1 spectator and notification stabilization | Faster foreground authenticated spectator refresh, focused spectator view, Daily spectation integrity, terminal spectator hold, notification delivery, Elo transparency | Next planning target |
| Phase 29 | Public player profiles | Privacy-safe public identity, bios/flair/featured games foundations | Future |
| Phase 30 | Leaderboards | Elo/rank, streaks, total games played, and approved performance metrics | Future |
| Phase 31 | Multiplayer postgame actions | Practice rematch request/accept and same-settings play-again/search-again flows | Future |
| Phase 32 | Ranked mode expansion / competitive ladder v2 | Timed Practice ranked first, Daily ranked only after claim-safety proof, optional display-only rank labels | Future |
| Phase 33 | Public/guest spectation | Sanitized public projections for public or guest Live discovery/spectation, if still desired | Future |
| Phase 34 | Theme proposal/template modernization | Revise template proposals and `theme_proposals.csv` after major feature surfaces stabilize | Deferred |
| Phase 35 or later | Full concrete themes | Concrete theme creation, implementation, asset/sound work, and theme QA | Deferred |
| Later phases | Expansion | Deeper social/community systems, marketplace, additional modes, and other expansion work | Future |

---

## Phase 26 - Polish, Notification Controls, And Live v1

Completed Phase 26 scope:

- current UI visual polish and hardening;
- Chrome zoom and narrow-width text/container overflow fixes based on user screenshots;
- responsive safeguards for the three-column shell, dashboard tiles, multiplayer setup controls, result cards, and rail-adjacent content;
- notification Settings with preferences cloud-synced through guest progress;
- important-only notification sounds gated by the master sound setting and notification preferences;
- local/permission-gated browser notification controls where safe, with no service workers or push infrastructure unless separately approved;
- authenticated nonparticipant Live v1 spectation, with a separately authorized Supabase schema/RLS stage if required;
- preservation of Phase 24 navigation/workspace behavior, Phase 25 dashboard/notification behavior, and all gameplay invariants.

Explicit post-Phase-26 deferrals:

- public/guest spectation is deferred unless a sanitized public projection is built and explicitly authorized;
- theme-template modernization and full theme implementation remain late; after the Phase 30 deferred ranked-mode routing pass they are routed to Phase 34 and Phase 35 or later;
- broader social/community, marketplace, additional modes, and deeper expansion work remain separately gated.

---

## Phase 27 - Competitive Ranking And Ranked Matchmaking

Completed Phase 27 scope:

- hardened the Elo/rank, scoring-evidence, and matchmaking domain helpers;
- kept match points separate from Elo/rank movement;
- created and applied the trusted ranked Practice settlement and ranked Practice queue/finalization migration sequence;
- integrated ranked settlement and durable ranked Practice queue app behavior through trusted RPCs;
- clarified ranked UI/stats/copy and provisional rating behavior;
- added private/internal leaderboard-ready projections without public leaderboard UI, routes, APIs, or public identity surfaces.

Requirements to preserve:

- multiplayer game points and Elo/rank are independent quantities;
- a player may earn game points but lose Elo if their relative performance warrants it;
- ranked matchmaking should depend on the ranking model, not the existing point score alone;
- ranked and unranked multiplayer boundaries should be explicit;
- rating transactions should be auditable and idempotent;
- any schema/RLS migration must be separately planned and explicitly authorized;
- leaderboard-ready projections may be prepared without building full public leaderboards yet;
- existing scoring, timeout, forfeit, Daily claim, GO transition, and keyboard-state rules should not be changed accidentally.

---

## Phase 28 - Live v1 Spectator And Notification Stabilization

Phase 28 should stabilize current authenticated Live v1 spectator and notification behavior before adding new public identity surfaces.

Candidate features:

- use `planning/phase-28/LIVE-V1-SPECTATOR-REFRESH-DIAGNOSIS.md` and `planning/phase-28/PHASE-28-SCOPE-INTAKE-AND-ROUTING.md` as planning inputs;
- refresh authenticated spectator rows immediately on Live entry;
- use faster 3-5 second polling only while the Live subtab is active and the document is visible;
- preserve slower or paused behavior when Live is not active or the page is hidden;
- make `Spectate live game` open a focused read-only spectator view;
- briefly hold sanitized terminal board/outcome state for spectators before terminal games leave Live;
- exclude current Daily Multiplayer games from spectator discovery to prevent active Daily answer leakage;
- investigate and fix foreground/browser notification delivery within the existing local/no-push notification architecture;
- add low-risk Elo transparency copy in docs and in-app ranked guidance without changing the Elo model.

Phase 28 must keep Live v1 spectators read-only, keep public/guest spectation unavailable, and preserve all Daily Multiplayer, ranked Practice, scoring, timeout, forfeit, rating/Elo, GO transition, keyboard-state, Solo Daily, and Practice word-length invariants.

---

## Phase 29 - Public Player Profiles

Phase 29 should introduce privacy-safe public player profile foundations.

Candidate features:

- public display name and avatar/flair surfaces;
- optional bio;
- featured games or achievements if supported safely;
- privacy controls and abuse-resistant defaults;
- public identity links from future leaderboards.

Profile work should not expose private auth emails, internal ids, raw account metadata, tokens, or private progress details.

---

## Phase 30 - Leaderboards

Phase 30 should add leaderboards after profiles and ranking foundations exist.

Candidate leaderboard categories:

- Elo/rank;
- streaks;
- total games played;
- approved achievement or performance metrics.

Leaderboards should be privacy-safe, resistant to obvious abuse, and backed by a clear data model and verification strategy before implementation.

---

## Phase 31 - Multiplayer Postgame Actions

Phase 31 should add multiplayer postgame action flows after ranked queue behavior and spectator/notification stabilization are proven.

Candidate features:

- Practice-only rematch request/accept with the same opponent and same settings;
- same-settings play-again or search-again action for players who want another match without manually rebuilding the lobby/search;
- no Daily rematches or Daily same-settings replay, because Daily claims and Daily uniqueness must stay intact;
- preserve ranked/unranked boundaries, trusted ranked queue behavior, and all gameplay invariants.

This phase may require durable mutual-intent state, timeout/cancel rules, queue/RLS review, and focused two-client verification.

---

## Phase 32 - Ranked Mode Expansion / Competitive Ladder v2

Phase 32 should revisit deferred ranked multiplayer options after Phase 30 public leaderboards and Phase 31 postgame actions are stable.

Candidate features:

- timed Practice ranked first, only after clock fairness, trusted timeout settlement, queue compatibility, RLS, and two-client verification are planned;
- Daily ranked only after Daily claim safety, UTC-day uniqueness, answer separation, no-clock behavior, and anti-cheat implications are proven;
- optional rank labels or bands as rating-derived display labels only, never rating authority;
- ranked custom/private-code games remain deferred unless a later approved spec proves ladder-integrity and anti-abuse rules.

Phase 32 must preserve ranked Practice v1 behavior, Daily Multiplayer integrity, match-points-versus-Elo separation, trusted settlement authority, and all gameplay rules unless a later approved spec explicitly changes them.

---

## Phase 33 - Public/Guest Spectation

Phase 33 may add public or guest Live spectation if the product still wants it and a sanitized public projection can be approved.

Requirements to preserve:

- never expose raw answers, seeds, serialized sessions, raw auth ids, emails, private profile data, or participant-only mutable state;
- keep public/guest access separate from authenticated participant and authenticated spectator flows;
- use explicit Supabase schema/RLS planning and authorization before implementation;
- keep public spectation read-only and unable to affect ratings, claims, timers, results, or game state.

---

## Phase 34 - Theme Proposal And Template Modernization

Phase 34 should review and modernize the theme proposal system under:

- `themes/proposals/template_proposals/`
- `themes/proposals/theme_proposals.csv`
- `themes/proposals/README.md`

The goal is to preserve the original template ideas while updating them for the post-Phase-33 app surface. This late routing avoids repeated compatibility churn while profile, leaderboard, ranked expansion, public spectator, and multiplayer postgame systems are still changing.

Phase 34 should decide which templates become full concrete theme proposals and which specific themes should be implemented first. It should not be treated as full theme implementation unless a later approved spec explicitly includes that work.

---

## Phase 35 Or Later - Full Concrete Themes

Phase 35 or a later dedicated phase should create and implement concrete themes after the template system has been modernized.

Candidate work:

- copy and specialize approved templates into full concrete theme specs;
- implement palettes, surfaces, effects, sounds, and assets;
- verify every implemented theme against Dashboard, Notifications, Live, Lobby, Profiles, Leaderboards, Settings, History, Calendar, Solo, and Multiplayer surfaces;
- preserve tile-state color semantics and gameplay legibility.

---

## Later Expansion

Later phases may include:

- deeper social and community systems;
- marketplace or cosmetic unlocks;
- additional game modes and variants;
- richer replay/history features;
- broader account/profile customization.

These remain separately gated and should not be pulled into Phase 28 unless a later prompt explicitly changes the scope.

---

## Guiding Principles

- Keep the original stable `brrrdle` repository untouched unless explicitly authorized.
- Keep all new development in `brrrdle-dev`.
- Use staged specs, implementation plans, progress records, and explicit gates.
- Define success criteria before implementation.
- Preserve core gameplay invariants unless a higher-authority approved spec explicitly changes them.
- Treat Supabase migrations, RLS changes, production deployments, releases, merges, and branch deletion as separately authorized protected actions.

---

**End of Roadmap**
