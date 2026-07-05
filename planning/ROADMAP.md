# brrrdle Development Roadmap

**Status**: Active long-term roadmap for `brrrdle-dev`
**Last Updated**: 2026-07-05
**Purpose**: This document records the long-term product direction for `brrrdle-dev` while keeping implementation gated by the constitution, phase specs, progress records, and explicit user authorization.

---

## Overview

The goal of `brrrdle-dev` is to evolve `brrrdle` into a more organized, social, scalable, and polished word-game experience while protecting the stability of the playable game.

All new development targets the independent local repository:

`/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`

The original stable `brrrdle` repository remains a reference archive unless the user explicitly authorizes work against it.

This roadmap is planning guidance only. It does not authorize implementation, migrations, deployments, commits, PRs, merges, releases, branch deletion, or work against the original stable repository.

---

## Current State After Phase 45

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
- Phase 34 stabilized current Multiplayer Live/Lobby/notification surfaces with Live badge readability, Live safe-name labels, Live ranked/unranked labels, guarded one-click Lobby join, notification direct-resume routing, Active Games `Your turn` cues, visual handoff review, and a manual review checklist.
- Phase 35 repaired persistent ranked Live safe-name fallbacks, added ranked Live spectator identity support, improved auth redirects/copy, added signed-in password-change access, documented email-change configuration gates, added a first-class Profile tab, and cleaned up Settings/Danger Zone responsibilities.
- Phase 36 added a first-class Leaderboard tab, moved public ranked Practice leaderboard and competitive multiplayer ratings out of Stats, kept Stats focused on local/personal gameplay statistics, repaired Active Games safe names, and cleaned up Settings/password-copy behavior.
- Phase 37 improved gameplay entry/resume ergonomics, added browser back/forward view-state integration, preserved stale selected-game fallbacks without mutation, hardened one-click Lobby E2E helpers, and made solo invalid-guess sounds consistent with multiplayer.
- Phase 38 added privacy-safe public/guest Practice Live discovery and read-only spectation, created the public spectator projection migration, hardened a pre-existing Daily claim RPC anonymous grant, preserved authenticated spectator/participant paths, and deferred spectator presence/count/list work.
- Phase 39 repaired mobile scroll smoothness with deterministic mobile scroll/layout E2E coverage, shell/shared UI visual-effect reductions, and Word Explorer mobile row tuning.
- Phase 40 added public profile routes/cards, clickable safe leaderboard identity, authenticated-only unranked Practice private match requests, private request lifecycle UI, and two-client private matchmaking E2E hardening.
- Phase 40 manual review completed with follow-up multiplayer reliability issues around ranked queue/search-again behavior, private request stale states, requester-side accepted-game routing, leaderboard freshness, mobile Practice Multiplayer freshness, and real E2E coverage gaps. Phase 41 was formally rerouted to multiplayer reliability and real E2E hardening before continuing into stats/dashboard/onboarding work.
- Phase 41 expanded real Supabase-backed multiplayer reliability E2E coverage, added reusable three-client harness support, repaired ranked queue/search-again reliability, public ranked leaderboard freshness, private request lifecycle/routing, mobile Practice Multiplayer freshness, and added Codex-assisted manual-review preflight.
- Phase 42 added public live-site stats, private developer/admin dashboard surfaces, onboarding/help/tutorial UX, ranked Practice queue button/status flashing repair, Supabase stats/dashboard RPCs, browser grant/RLS hardening, visual handoff review, and a manual review checklist.
- Phase 43 completed current-surface UX cleanup, ranked queue matching fairness repair, Stats/Help/About/Settings information architecture cleanup, app shell/Home simplification, Solo and Practice Multiplayer density cleanup, gameplay viewport/notification/back-to-top/spectator comfort work, visual handoff review, and a manual review checklist.
- Phase 43 manual review surfaced one urgent account/guest state boundary issue plus smaller follow-up issues around private Practice request eligibility, ranked queue fairness verification, sign-in ordering, global header chips, Stats public-site placement, Help placeholder copy, and Solo gameplay keyboard centering. Phase 44 was formally rerouted to account-scoped local state isolation and bounded manual-review follow-up before profile/data-contract simplification or larger social/widget work.
- Phase 44 repaired several account-scoped local-state and manual-review follow-up items, but manual review found that Daily Solo OG/GO account boundaries still fail across guest/auth transitions and separate browser profiles. Phase 45 is formally rerouted to urgent Solo Daily account/cloud persistence boundaries, storage-contract decisioning, real browser/E2E coverage, and only small follow-ups for Profile embedded sign-in order and mobile Solo scaling.
- Phase 45 repaired Daily Solo and Practice Solo guest/auth boundaries, preserved cross-browser authenticated loading through existing `progress_snapshots`, aligned the Profile embedded sign-in order, and improved mobile Solo post-guess playability. Phase 45 manual review passed with follow-up observations around automatic signed-in Solo sync freshness, same-account multi-tab/browser anti-cheat risk, the low-value Solo Overview active-game `Select` control, and pre-guess mobile keyboard clipping. Phase 46 is rerouted to Solo sync integrity and these small current-surface follow-ups before preview/social/profile expansion resumes.

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
| Phase 34 | Live/Lobby/notification current-surface stabilization | Live badge readability, Live safe identity labels, ranked/unranked Live cards, direct Lobby join, notification direct-resume routing, and active-game turn cues | Complete |
| Phase 35 | Live identity, auth, deployment, and account-management readiness | Persistent ranked Live safe-name repair, Vercel protection/magic-link redirect diagnosis, Supabase auth URL audit, auth copy, password/email management, Settings/Danger Zone cleanup, and Profile tab readiness | Complete |
| Phase 36 | Leaderboard and Stats navigation split | New main Leaderboard tab between Stats and Words; move public ranked leaderboard and Multiplayer Ratings out of Stats while preserving local Stats content | Complete |
| Phase 37 | Navigation and gameplay ergonomics | Gameplay-area auto-centering on enter/join/resume, browser back/forward route/subtab history integration, and solo invalid-guess sound consistency | Complete |
| Phase 38 | Public/spectator readiness | Public/guest Practice Live discovery and read-only spectation after sanitized projections; spectator presence/count/list deferred | Complete |
| Phase 39 | Mobile performance and scroll smoothness | Audit and improve mobile page scroll smoothness, create feasible measurement guards, and tune complex current surfaces without broad redesign | Complete |
| Phase 40 | Public profiles and private matchmaking | Clickable public profiles, safe public profile route/cards, authenticated-only unranked Practice private match requests, private request lifecycle UI, and two-client E2E hardening | Complete |
| Phase 41 | Multiplayer reliability and real E2E hardening | Ranked Practice search-again/queue cancellation/status reliability, leaderboard freshness, private request lifecycle cleanup, mobile multiplayer freshness, and expanded real E2E harnesses | Complete |
| Phase 42 | Site stats, developer dashboard, onboarding, and help | Public live-site stats, private developer dashboard, beginner onboarding/help/tutorial UX, ranked queue flashing repair, and Supabase stats/dashboard hardening | Complete |
| Phase 43 | Current-surface UX cleanup, ranked queue follow-up, and gameplay comfort | Home/shell simplification, Stats/Help/About/Settings cleanup, Solo and Practice Multiplayer density cleanup, ranked queue follow-up, gameplay viewport comfort, and testing-protocol updates | Complete |
| Phase 44 | Account-scoped local state isolation and Phase 43 manual-review follow-up | Guest/account state boundary audit and repair, Daily/Practice Solo isolation, sign-out visibility cleanup, private Practice request eligibility follow-up, ranked queue review, and small UI follow-ups | Complete |
| Phase 45 | Solo cloud progress boundaries and mobile follow-up | Daily/Practice Solo guest/auth boundary repair, cross-browser authenticated cloud persistence through existing snapshots, Profile embedded sign-in order, and narrow mobile Solo scaling | Complete |
| Phase 46 | Solo sync integrity and manual-review follow-up | Signed-in Solo Daily/Practice automatic sync and anti-cheat audit, source-only versus storage-contract decisioning, Solo Overview `Select` cleanup, and mobile pre-guess keyboard visibility | Next planning target |
| Phase 47 | Profile and multiplayer contract simplification | Profile field/model simplification, custom-code/private Daily/ranked Daily routing, and migration/RLS or gameplay-rule gates if needed | Future |
| Phase 48 | Progression HUD, Focus Mode, and mobile UX shell polish | Header/top-site EXP, coin, and collectible counters after earnable systems have clear gameplay functions; late Focus Mode, compact navigation, and broader mobile UX improvements | Future |
| Phase 49 | Theme proposal/template modernization | Revise template proposals and `theme_proposals.csv` after major feature surfaces stabilize | Deferred |
| Phase 50 or later | Full concrete themes | Concrete theme creation, implementation, asset/sound work, and theme QA | Deferred |
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

Phase 34 is complete. It stabilized current authenticated Multiplayer Live, Lobby, Active Games, and notification routing surfaces before new public/social/deployment work.

Requirements to preserve:

- Live subtab count badges must stay readable in active and inactive states;
- Live participant and authenticated spectator cards should use safe public/profile labels consistently;
- Live cards may show simple ranked/unranked status without exposing private rating data;
- Lobby joinable rows should offer a direct guarded join action instead of routing the user to scroll and click again;
- foreground browser and in-app `Your turn` notification actions should open the specific game when safe;
- Active Games should make `Your turn` items visually obvious;
- public/guest spectation, service workers, push, gameplay changes, Elo changes, auth/deployment configuration, and broad social features remain out of scope.

---

## Phase 35 - Live Identity, Auth, Deployment, And Account-Management Readiness

Phase 35 is complete. It addressed the persistent ranked Live safe-name regression found during Phase 34 manual review before moving into user-observed auth/deployment and account-management readiness issues.

Candidate work:

- reproduce and repair ranked Live participant and signed-in spectator cards that fall back to `Rival` or `Player one` even when safe public names should be available;
- decide whether the ranked Live identity fix is source-only or requires a narrow migration/RLS addendum;
- diagnose whether magic-link sign-in reaches a Vercel login page because of preview deployment protection or access configuration;
- audit Supabase Site URL and redirect URL assumptions;
- clarify account creation and email confirmation copy;
- review magic-link landing behavior and password creation expectations;
- add normal signed-in password change and email change flows where safe;
- clean up Settings account-management and Danger Zone responsibilities;
- if the unified spec confirms source-only scope, add a first-class Profile tab for the current player's private/public profile and account-management surfaces while keeping public profile browsing deferred.

Phase 35 did not deploy, configure Vercel/Supabase, or change production access.

---

## Phase 36 - Leaderboard And Stats Navigation Split

Phase 36 is complete. It added the requested main `Leaderboard` tab after Phase 35 account/profile routing stabilized.

Candidate work:

- add `Leaderboard` as a main navigation tab between `Stats` and `Words`;
- move the public ranked leaderboard and Multiplayer Ratings/competitive multiplayer content from `Stats` into `Leaderboard`;
- keep local play statistics in `Stats`;
- preserve Phase 33 public leaderboard boundaries: public ranked leaderboards remain display-only, authenticated-only, non-authoritative, and limited to approved untimed ranked Practice buckets until a later spec changes that;
- verify responsive navigation, tab colors, keyboard/focus behavior, and no regressions in Stats or ranked leaderboard tests.

---

## Phase 37 - Navigation And Gameplay Ergonomics

Phase 37 is complete. It handled focused navigation and gameplay-entry ergonomics after the Profile and Leaderboard navigation work stabilized. It also repaired the solo invalid-guess sound inconsistency while preserving multiplayer's existing invalid-guess behavior.

Candidate work:

- automatically scroll or focus the gameplay area when a player enters, joins, resumes, or is routed directly into a game;
- consider whether upper multiplayer/game metadata should be collapsible without hiding critical state;
- design browser back/forward integration for route, tab, subtab, selected game, and stale-game fallback behavior;
- make solo invalid guesses in OG and GO use the same invalid-guess sound cue as multiplayer invalid guesses, without changing validation rules or valid-submit sounds;
- preserve gameplay state, Daily claim rules, ranked queue safety, notification direct-routing, and browser history expectations.

---

## Phase 38 - Public/Spectator Readiness

Phase 38 is complete. It added public/guest Practice Live discovery and read-only spectation only after sanitized projections and privacy rules were explicitly approved.

Delivered:

- sanitized public or guest Live discovery and read-only spectation;
- dedicated public spectator projection migration/RLS execution;
- Daily claim RPC anonymous grant hardening;
- authenticated participant and authenticated spectator non-regression preservation;
- current Daily Multiplayer exclusion from public/guest spectator discovery;
- spectator presence, aggregate counts, identity-bearing lists, and Live sorting by spectator count deferred;
- strict exclusion of raw answers, seeds, serialized sessions, raw auth ids, emails, private profile data, and mutable participant state.

---

## Phase 39 - Mobile Performance And Scroll Smoothness

Phase 39 is complete. It addressed the user-reported mobile page-scrolling latency before adding more public/social UI surface area.

Candidate work:

- audit complex current routes, global CSS, shell chrome, shared UI primitives, and scroll-heavy workspaces for likely scroll-jank causes;
- reproduce or characterize the mobile scroll issue without assuming the root cause;
- add feasible automated or semi-automated scroll/layout/performance guards without brittle absolute frame-rate thresholds;
- make targeted source/CSS improvements for mobile scroll smoothness, especially on complex current tabs/subtabs;
- preserve fast gameplay input, Phase 38 public/guest spectator behavior, Phase 37 browser history/gameplay auto-centering, and all gameplay/Elo rules;
- explicitly defer broad mobile navigation redesign, Focus Mode, and compact shell overhaul to a later dedicated shell/mobile phase.

---

## Phase 40 - Public Profiles And Private Matchmaking

Phase 40 is complete. It expanded public profile routing and authenticated-only unranked Practice private match invitations after mobile performance readiness, using audit-first planning, migration/RLS addendum gates, and final E2E hardening.

Candidate work:

- clickable public profile names and avatars from multiplayer surfaces;
- public profile pages/cards with safe public fields only;
- rival avatar accent or custom image projection where privacy-safe;
- custom-code private games that do not appear in inappropriate public surfaces;
- direct player-to-player match requests for unranked/custom games, with anti-abuse and anti-collusion rules.

Ranked and Daily match requests should remain unavailable by default unless a later competitive-integrity spec approves them.

---

## Phase 41 - Multiplayer Reliability And Real E2E Hardening

Phase 41 is rerouted to address Phase 40 manual-review follow-up issues before continuing into broader stats/dashboard/onboarding work. It should remain a cohesive reliability macro-phase with narrow implementation stages and explicit migration/RLS addendum gates if any database-contract repair is needed.

Candidate work:

- audit and reproduce ranked Practice search-again, queue cancellation, stale queue participation, and visible queue status stability issues;
- expand real two-client and three-client Supabase-backed E2E harnesses for queue, leaderboard, private request, and mobile freshness flows;
- repair public ranked leaderboard freshness or eligibility for newly established rated players if reproduced;
- repair private Practice request cancel, decline, expire, accept, stale-list cleanup, requester feedback, and accepted-game open/resume routing;
- repair mobile Practice Multiplayer lobby/request/list freshness and queue-button flicker if reproduced;
- add a Codex-assisted manual-review preflight before future checklist handoff, clearly separating automated evidence, Codex-attempted browser/manual checks, and user-only manual review.

Do not use this phase to add a full mailbox redesign, spectator presence/count/list, service workers/push, gameplay-rule changes, or Elo changes.

---

## Phase 42 - Site Stats, Developer Dashboard, Onboarding, And Help

Phase 42 is complete. It delivered public aggregate site stats, an authenticated private developer/admin dashboard, durable Help/onboarding UX, ranked Practice queue button/status flashing repair, stats/dashboard Supabase RPCs, browser grant/RLS hardening, visual handoff review, and a manual review checklist.

Candidate work:

- public live site stats such as active players, active games, open lobbies, and visible spectator counts;
- private developer dashboard with stronger authorization and privacy rules;
- first-time-player onboarding, help, walkthrough, and tutorial surfaces;
- durable Help access from Settings or a dedicated route.
- narrow ranked Practice queue button/status flashing audit and source/test-only repair if the issue remains cosmetic and bounded.

This phase may need schema/RLS/admin planning before implementation.

---

## Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort

Phase 43 is complete. It cleaned up Home/shell density, Stats/Help/About/Settings information architecture, Solo and Practice Multiplayer density, gameplay viewport comfort, notification/back-to-top behavior, spectator comfort, and ranked queue fairness routing while preserving Phase 42 through Phase 38 boundaries.

## Phase 44 - Account-Scoped Local State And Manual-Review Follow-Up

Phase 44 is complete and manually reviewed. It repaired several account-scoped local-state boundaries and small Phase 43 manual-review follow-ups, but manual review found a remaining Daily Solo OG/GO account-boundary failure that must lead Phase 45.

Preserved Phase 44 work:

- account-scoped progress helpers and sign-out rehydration improvements;
- private Practice request active-public-profile eligibility messaging;
- sign-in modal Email + password ordering;
- global header chip removal;
- Stats public-site placement and Help placeholder cleanup;
- Solo keyboard auto-centering after valid guesses.

## Phase 45 - Solo Cloud Progress Boundaries And Mobile Follow-Up

Phase 45 is complete and manually reviewed. It handled the urgent Daily Solo OG/GO account-boundary failure before the roadmap continued into preview/social/profile expansion.

Completed work:

- reproduce the two-browser guest/auth Daily Solo OG/GO boundary failure;
- decide whether the repair can remain source/test-only or requires a storage-contract or Supabase/RLS addendum;
- prevent implicit guest-to-account Daily progress transfer during sign-in;
- prevent signed-in Daily progress from appearing as guest progress after sign-out;
- evaluate whether Solo Daily and Practice progress need a clearer authenticated cloud persistence contract;
- add real browser/E2E coverage for two-browser guest/auth Daily Solo boundaries where feasible;
- apply the Profile embedded sign-in order follow-up if safe;
- apply narrow mobile Solo gameplay scaling/playability work if safe.

Phase 45 did not become a broad mobile shell, profile simplification, Home widget, social inbox, spectator presence, gameplay-rule, Elo, deployment, or release phase.

## Phase 46 - Solo Sync Integrity And Manual Review Follow-Up

Phase 46 should handle the Phase 45 manual-review follow-up around signed-in Solo automatic sync and related current Solo cleanup before preview/social/profile expansion resumes.

Candidate work:

- audit current signed-in Solo Daily/Practice sync, `progress_snapshots`, sign-in hydration, sign-out rehydration, same-account multi-tab/browser freshness, and manual `Sync now` behavior;
- decide whether automatic Solo sync can remain source-only or requires a storage-contract/Supabase/RLS addendum;
- improve signed-in Solo Daily/Practice progress freshness without reintroducing implicit guest-to-account transfer or account-to-guest leakage;
- explicitly evaluate one-active-session enforcement but treat it as later optional session-lease/security work unless evidence proves it is necessary now;
- remove the Solo Overview active-game `Select` button if it has no meaningful function, or define a tested function if it must remain;
- fix narrow mobile Solo pre-guess keyboard visibility/scroll behavior without broad mobile navigation overhaul.

Phase 46 must not become a broad mobile shell, configurable Home widget, spectator preview, notification redesign, social inbox, spectator presence, service worker, push, deployment, gameplay-rule, or Elo phase.

## Later Phase - Live/Home Preview Consistency, Timestamp Policy, And Notification Clarity

A later gated phase should handle participant-owned Live/Active/Home preview improvements, public participant names where safe, UTC/local timestamp display policy, and privacy-safe notification rival/ranked context after Solo sync integrity is reliable.

## Phase 47 - Profile And Multiplayer Contract Simplification

Phase 47 or another later gated phase should handle profile simplification, custom-code removal/rerouting, private Daily requests, ranked Daily separation, and related contract work only after a dedicated planning/spec/addendum path.

Candidate later work:

- simplify public/private profile fields and Save/Sign out placement after privacy/RLS review;
- decide whether custom-code match type should be removed, hidden, or redesigned;
- decide whether private Daily requests are allowed and how they interact with Daily claim safety;
- separate ranked and unranked Daily paths before any ranked Daily implementation;
- route draw-by-repetition to a gameplay-rule gate rather than UI cleanup.

## Phase 48 - Progression HUD, Focus Mode, And Mobile UX Shell Polish

Phase 48 or a later gated phase should add late-stage shell polish only after current-surface UX cleanup, Solo account/cloud persistence, and profile/multiplayer contract decisions are stable.

Candidate work:

- show EXP, coins, and any other real earnable/collectible counters near the top/header area for both guest and signed-in players;
- keep any explicit guest-to-account transfer compatibility reviewed before displayed progression resources depend on it;
- add a player-toggleable Focus Mode that can collapse the side navigation into a compact but functional form and reduce nonessential page chrome during play;
- consider a broader mobile UX overhaul for compact navigation, reduced top-of-page chrome, and easier mobile gameplay access;
- persist Focus Mode preferences safely per player/device/account as approved by the future spec;
- preserve accessibility, route discoverability, responsive navigation, gameplay readability, and tile-state semantics.

This phase should not invent new economy functions by itself. Header counters should display resources only after those resources have clear gameplay meaning.

---

## Phase 49 - Theme Proposal And Template Modernization

Phase 49 should review and modernize the theme proposal system under:

- `themes/proposals/template_proposals/`
- `themes/proposals/theme_proposals.csv`
- `themes/proposals/README.md`

The goal is to preserve the original template ideas while updating them for the post-current-surface-cleanup app surface. This late routing avoids repeated compatibility churn while profile, leaderboard, ranked expansion, public spectator, private matchmaking, site stats, onboarding, Focus Mode, progression HUD, mobile shell, and multiplayer surfaces are still changing.

Phase 49 should decide which templates become full concrete theme proposals and which specific themes should be implemented first. It should not be treated as full theme implementation unless a later approved spec explicitly includes that work.

---

## Phase 50 Or Later - Full Concrete Themes

Phase 50 or a later dedicated phase should create and implement concrete themes after the template system has been modernized.

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

These remain separately gated and should not be pulled into an earlier phase unless a later prompt explicitly changes the scope.

---

## Guiding Principles

- Keep the original stable `brrrdle` repository untouched unless explicitly authorized.
- Keep all new development in `brrrdle-dev`.
- Use staged specs, implementation plans, progress records, and explicit gates.
- Define success criteria before implementation.
- Future phases may batch more cohesive work when the phase shares a product area, data/privacy contract, UI ownership, or verification harness, but implementation stages should remain narrow and single-purpose.
- Preserve core gameplay invariants unless a higher-authority approved spec explicitly changes them.
- Treat Supabase migrations, RLS changes, production deployments, releases, merges, and branch deletion as separately authorized protected actions.

---

**End of Roadmap**
