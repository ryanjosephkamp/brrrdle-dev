# brrrdle Development Roadmap

**Status**: Active long-term roadmap for `brrrdle-dev`
**Last Updated**: 2026-06-16
**Purpose**: This document records the long-term product direction for `brrrdle-dev` while keeping implementation gated by the constitution, phase specs, progress records, and explicit user authorization.

---

## Overview

The goal of `brrrdle-dev` is to evolve `brrrdle` into a more organized, social, scalable, and polished word-game experience while protecting the stability of the playable game.

All new development targets the independent local repository:

`/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`

The original stable `brrrdle` repository remains a reference archive unless the user explicitly authorizes work against it.

This roadmap is planning guidance only. It does not authorize implementation, migrations, deployments, commits, PRs, merges, releases, branch deletion, or work against the original stable repository.

---

## Current State After Phase 26

- Phase 23 stabilized the core Solo and Multiplayer gameplay model and added broad local plus real Supabase-backed E2E coverage.
- Phase 24 made Solo, Multiplayer, History, Lobby, and Live v0 first-class app areas.
- A pre-Phase-25 bugfix added the missing Multiplayer OG solved-row hold before final results.
- Phase 25 added Home Dashboard v1, in-app Notifications v0, navigation badges, workspace attention cues, and Lobby/Live freshness while deferring browser notifications.
- Phase 26 completed current UI polish/hardening, Chrome zoom and narrow-width overflow fixes, cloud-synced notification preferences, important-only notification sounds, safe local browser-notification controls, and authenticated Live v1 spectation.
- After Phase 26, theme-specific work is intentionally deferred until later in the workflow so core competitive, profile, leaderboard, and spectator systems can stabilize first.

---

## Phase Summary Table

| Phase | Main Focus | Key Features | Status |
| --- | --- | --- | --- |
| Phase 23 | Multiplayer stabilization and testing suite | Multiplayer unification, bug fixes, two-client E2E coverage | Complete |
| Phase 24 | Navigation and workspaces | Solo, Multiplayer, History, Lobby, Live v0, route/subtab model | Complete |
| Pre-Phase-25 | Multiplayer OG solved-row hold | Cosmetic terminal all-green hold for Practice/Daily Multiplayer OG | Complete |
| Phase 25 | Dashboard and notifications | Home dashboard, in-app notifications, badges, attention cues | Complete |
| Phase 26 | Polish, notification controls, and Live v1 | Chrome zoom/narrow-width layout fixes, notification Settings/sounds, authenticated spectation | Complete |
| Phase 27 | Competitive ranking and ranked matchmaking | Elo/rank model, ranked/unranked boundaries, matchmaking strategy, leaderboard-ready data foundations | Future / next planning target |
| Phase 28 | Public player profiles | Privacy-safe public identity, bios/flair/featured games foundations | Future |
| Phase 29 | Leaderboards | Elo/rank, streaks, total games played, and approved performance metrics | Future |
| Phase 30 | Public/guest spectation | Sanitized public projections for public or guest Live discovery/spectation, if still desired | Future |
| Phase 31 | Theme proposal/template modernization | Revise template proposals and `theme_proposals.csv` after major feature surfaces stabilize | Deferred |
| Phase 32 or later | Full concrete themes | Concrete theme creation, implementation, asset/sound work, and theme QA | Deferred |
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
- theme-template modernization and full theme implementation move to Phase 31 and Phase 32 or later;
- broader social/community, marketplace, additional modes, and deeper expansion work remain separately gated.

---

## Phase 27 - Competitive Ranking And Ranked Matchmaking

Phase 27 should define and implement the competitive foundation for ranked multiplayer. It should include a comprehensive Elo/ranking model inspired by mature chess platforms such as chess.com and lichess, adapted carefully for brrrdle.

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

## Phase 28 - Public Player Profiles

Phase 28 should introduce privacy-safe public player profile foundations.

Candidate features:

- public display name and avatar/flair surfaces;
- optional bio;
- featured games or achievements if supported safely;
- privacy controls and abuse-resistant defaults;
- public identity links from future leaderboards.

Profile work should not expose private auth emails, internal ids, raw account metadata, tokens, or private progress details.

---

## Phase 29 - Leaderboards

Phase 29 should add leaderboards after profiles and ranking foundations exist.

Candidate leaderboard categories:

- Elo/rank;
- streaks;
- total games played;
- approved achievement or performance metrics.

Leaderboards should be privacy-safe, resistant to obvious abuse, and backed by a clear data model and verification strategy before implementation.

---

## Phase 30 - Public/Guest Spectation

Phase 30 may add public or guest Live spectation if the product still wants it and a sanitized public projection can be approved.

Requirements to preserve:

- never expose raw answers, seeds, serialized sessions, raw auth ids, emails, private profile data, or participant-only mutable state;
- keep public/guest access separate from authenticated participant and authenticated spectator flows;
- use explicit Supabase schema/RLS planning and authorization before implementation;
- keep public spectation read-only and unable to affect ratings, claims, timers, results, or game state.

---

## Phase 31 - Theme Proposal And Template Modernization

Phase 31 should review and modernize the theme proposal system under:

- `themes/proposals/template_proposals/`
- `themes/proposals/theme_proposals.csv`
- `themes/proposals/README.md`

The goal is to preserve the original template ideas while updating them for the post-Phase-30 app surface. This late routing avoids repeated compatibility churn while competitive, profile, leaderboard, and spectator systems are still changing.

Phase 31 should decide which templates become full concrete theme proposals and which specific themes should be implemented first. It should not be treated as full theme implementation unless a later approved spec explicitly includes that work.

---

## Phase 32 Or Later - Full Concrete Themes

Phase 32 or a later dedicated phase should create and implement concrete themes after the template system has been modernized.

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

These remain separately gated and should not be pulled into Phase 26 unless a later prompt explicitly changes the scope.

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
