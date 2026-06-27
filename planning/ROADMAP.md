# brrrdle Development Roadmap

**Status**: Active long-term roadmap for `brrrdle-dev`
**Last Updated**: 2026-06-26
**Purpose**: This document records the long-term product direction for `brrrdle-dev` while keeping implementation gated by the constitution, phase specs, progress records, and explicit user authorization.

---

## Overview

The goal of `brrrdle-dev` is to evolve `brrrdle` into a more organized, social, scalable, and polished word-game experience while protecting the stability of the playable game.

All new development targets the independent local repository:

`/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`

The original stable `brrrdle` repository remains a reference archive unless the user explicitly authorizes work against it.

This roadmap is planning guidance only. It does not authorize implementation, migrations, deployments, commits, PRs, merges, releases, branch deletion, or work against the original stable repository.

---

## Current State After Phase 33

- Phase 23 stabilized the core Solo and Multiplayer gameplay model and added broad local plus real Supabase-backed E2E coverage.
- Phase 24 made Solo, Multiplayer, History, Lobby, and Live v0 first-class app areas.
- A pre-Phase-25 bugfix added the missing Multiplayer OG solved-row hold before final results.
- Phase 25 added Home Dashboard v1, in-app Notifications v0, navigation badges, workspace attention cues, and Lobby/Live freshness while deferring browser notifications.
- Phase 26 completed current UI polish/hardening, Chrome zoom and narrow-width overflow fixes, cloud-synced notification preferences, important-only notification sounds, safe local browser-notification controls, and authenticated Live v1 spectation.
- Phase 27 completed competitive ranking and ranked matchmaking foundations, including Elo/rank hardening, trusted ranked Practice settlement, durable ranked Practice queue behavior, ranked UI/stats/copy, and private leaderboard-ready projections.
- Phase 28 stabilized authenticated Live v1 spectation and notifications.
- Phase 29 added privacy-safe public profile foundations and notification/Elo surface cleanup.
- Phase 30 added authenticated-only public ranked Practice leaderboards and Multiplayer Overview cleanup.
- Phase 31 added Practice-only postgame actions and current-surface cleanup.
- Phase 32 stabilized rematch lifecycle, ranked/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and real two-client E2E coverage.
- Phase 33 added canonical five-minute timed ranked Practice, display-only rank bands, public ranked leaderboard `All buckets` removal, timed ranked two-client E2E coverage, visual handoff review, and a manual review checklist.
- After Phase 33, user testing found current Multiplayer Live/Lobby/notification usability issues. Phase 34 is now routed to stabilize those existing surfaces before auth/deployment readiness, public/guest spectation, spectator presence, public profile browsing, custom invitations, site stats, onboarding/help, and theme work.

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
| Phase 28 | Live v1 spectator and notification stabilization | Faster foreground authenticated spectator refresh, focused spectator view, Daily spectation integrity, terminal spectator hold, notification delivery, Elo transparency | Complete |
| Phase 29 | Public player profiles | Privacy-safe public identity, bios/flair/featured games foundations | Complete |
| Phase 30 | Leaderboards | Elo/rank, streaks, total games played, and approved performance metrics | Complete |
| Phase 31 | Multiplayer postgame actions | Practice rematch request/accept and same-settings play-again/search-again flows plus current-surface cleanup | Complete |
| Phase 32 | Multiplayer stabilization, identity routing, and rating display consistency | Rematch lifecycle repair, ranked/lobby auto-routing, rival labels, account avatar accent propagation, no-comma Elo/rating displays, and regression coverage | Complete |
| Phase 33 | Competitive ladder v2 readiness | Canonical five-minute timed ranked Practice, display-only rank bands, public leaderboard cleanup, and timed ranked E2E | Complete |
| Phase 34 | Live/Lobby/notification current-surface stabilization | Live badge readability, Live safe identity labels, ranked/unranked Live cards, direct Lobby join, notification direct-resume routing, and active-game turn cues | Next planning target |
| Phase 35 | Auth, deployment, and account-management readiness | Vercel protection/magic-link redirect diagnosis, Supabase auth URL audit, auth copy, password/email management, and Settings/Danger Zone cleanup | Future |
| Phase 36 | Public/spectator readiness | Public/guest spectation only after sanitized projections; spectator count/list presence if privacy-safe | Future |
| Phase 37 | Public profiles and private matchmaking | Clickable public profiles, richer profile identity in matches, custom-code private games, and direct player match requests if anti-abuse rules are approved | Future |
| Phase 38 | Site stats, developer dashboard, onboarding, and help | Public live-site stats, private developer dashboard, beginner onboarding, help, and tutorial UX | Future |
| Phase 39 | Theme proposal/template modernization | Revise template proposals and `theme_proposals.csv` after major feature surfaces stabilize | Deferred |
| Phase 40 or later | Full concrete themes | Concrete theme creation, implementation, asset/sound work, and theme QA | Deferred |
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
- theme-template modernization and full theme implementation remain late; after the Phase 32 stabilization reroute they are routed to Phase 35 and Phase 36 or later;
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

## Phase 32 - Multiplayer Stabilization, Identity Routing, And Rating Display Consistency

Phase 32 should stabilize current Phase 31 multiplayer follow-up behavior before expanding ranked modes.

Candidate fixes:

- global account avatar chip should follow the saved private profile accent color;
- one-player rematch requests should appear for the opponent without requiring both players to request;
- rematch accept/decline/cancel/created states should update both participants;
- eligible unranked non-custom Practice rematches should create fresh safe games with the same settings and same seats;
- ranked Practice search-again should route both matched players into the finalized ranked game through the trusted queue path;
- lobby and queue creators should auto-route when a rival joins or matches;
- opponent labels should prefer safe profile names and should not show the opponent as `You`;
- Elo/rating displays should use no thousands separators anywhere in player-facing UI;
- after fixes, real two-client Supabase-backed E2E should cover rematch, queue, lobby, and rival identity flows.

Phase 32 must preserve ranked Practice v1 behavior, Daily Multiplayer integrity, match-points-versus-Elo separation, trusted settlement authority, public leaderboard display-only behavior, and all gameplay rules. It should not implement timed Practice ranked, Daily ranked, ranked custom/private-code games, rank labels/bands, public/guest spectation, service workers, push infrastructure, or public profile route expansion unless a later approved spec explicitly changes scope.

---

## Phase 33 - Ranked Mode Expansion / Competitive Ladder v2

Phase 33 is complete. It implemented the safest competitive ladder v2 slice after Phase 32 stabilization.

Delivered:

- canonical five-minute timed ranked Practice for OG and GO through trusted queue/finalization/settlement paths;
- separate timed ranked buckets for canonical timed ranked Practice;
- display-only rank bands derived from current rating;
- public ranked leaderboard cleanup that removed the player-facing `All buckets` view;
- real two-client timed ranked E2E and manual/visual review artifacts.

Phase 33 must preserve ranked Practice v1 behavior, Daily Multiplayer integrity, match-points-versus-Elo separation, trusted settlement authority, and all gameplay rules unless a later approved spec explicitly changes them.

---

## Phase 34 - Live/Lobby/Notification Current-Surface Stabilization

Phase 34 should stabilize current authenticated Multiplayer Live, Lobby, Active Games, and notification routing surfaces before new public/social/deployment work.

Requirements to preserve:

- Live subtab count badges must stay readable in active and inactive states;
- Live participant and authenticated spectator cards should use safe public/profile labels consistently;
- Live cards may show simple ranked/unranked status without exposing private rating data;
- Lobby joinable rows should offer a direct guarded join action instead of routing the user to scroll and click again;
- foreground browser and in-app `Your turn` notification actions should open the specific game when safe;
- Active Games should make `Your turn` items visually obvious;
- public/guest spectation, service workers, push, gameplay changes, Elo changes, auth/deployment configuration, and broad social features remain out of scope.

---

## Phase 35 - Auth, Deployment, And Account-Management Readiness

Phase 35 should address the user-observed auth/deployment and account-management readiness issues before broader public launch preparation.

Candidate work:

- diagnose whether magic-link sign-in reaches a Vercel login page because of preview deployment protection or access configuration;
- audit Supabase Site URL and redirect URL assumptions;
- clarify account creation and email confirmation copy;
- review magic-link landing behavior and password creation expectations;
- add normal signed-in password change and email change flows where safe;
- clean up Settings account-management and Danger Zone responsibilities.

Phase 35 should not deploy, configure Vercel/Supabase, or change production access without separate explicit authorization.

---

## Phase 36 - Public/Spectator Readiness

Phase 36 or a later gated phase may add public/guest spectation and spectator presence only after sanitized projections and privacy rules are explicitly approved.

Candidate work:

- sanitized public or guest Live discovery and read-only spectation;
- spectator count and spectator list visible to players and spectators;
- optional Live sorting by spectator count;
- strict exclusion of raw answers, seeds, serialized sessions, raw auth ids, emails, private profile data, and mutable participant state.

---

## Phase 37 - Public Profiles And Private Matchmaking

Phase 37 or a later gated phase may expand social/profile routing and private game invitations.

Candidate work:

- clickable public profile names and avatars from multiplayer surfaces;
- public profile pages/cards with safe public fields only;
- rival avatar accent or custom image projection where privacy-safe;
- custom-code private games that do not appear in inappropriate public surfaces;
- direct player-to-player match requests for unranked/custom games, with anti-abuse and anti-collusion rules.

Ranked and Daily match requests should remain unavailable by default unless a later competitive-integrity spec approves them.

---

## Phase 38 - Site Stats, Developer Dashboard, Onboarding, And Help

Phase 38 or later should handle public site statistics, private developer/admin observability, and beginner-friendly onboarding/help.

Candidate work:

- public live site stats such as active players, active games, open lobbies, and visible spectator counts;
- private developer dashboard with stronger authorization and privacy rules;
- first-time-player onboarding, help, walkthrough, and tutorial surfaces;
- durable Help access from Settings or a dedicated route.

This phase may need schema/RLS/admin planning before implementation.

---

## Phase 39 - Theme Proposal And Template Modernization

Phase 39 should review and modernize the theme proposal system under:

- `themes/proposals/template_proposals/`
- `themes/proposals/theme_proposals.csv`
- `themes/proposals/README.md`

The goal is to preserve the original template ideas while updating them for the post-Phase-38 app surface. This late routing avoids repeated compatibility churn while profile, leaderboard, ranked expansion, public spectator, private matchmaking, site stats, onboarding, and multiplayer surfaces are still changing.

Phase 39 should decide which templates become full concrete theme proposals and which specific themes should be implemented first. It should not be treated as full theme implementation unless a later approved spec explicitly includes that work.

---

## Phase 40 Or Later - Full Concrete Themes

Phase 40 or a later dedicated phase should create and implement concrete themes after the template system has been modernized.

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
- clickable public profile links from multiplayer names, avatars, and leaderboard rows;
- in-game public identity cards with safe names, avatars, accents, and current relevant Elo where appropriate;
- Settings Danger Zone completion through a dedicated account/settings safety review;
- broader account/profile customization.

These remain separately gated and should not be pulled into Phase 34 unless a later prompt explicitly changes the scope.

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
