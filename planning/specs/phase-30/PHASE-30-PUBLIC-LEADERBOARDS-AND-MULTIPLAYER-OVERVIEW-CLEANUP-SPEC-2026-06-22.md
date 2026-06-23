# Phase 30 Public Leaderboards And Multiplayer Overview Cleanup Specification

**Status**: Unified Phase 30 specification for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-22.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, completed Phase 29 public profile foundations, completed Phase 28 Live spectator stabilization, completed Phase 27 ranked Practice foundations, `planning/phase-30/PLANNING-BRIEF.md`, current roadmap surfaces, and the current progress ledger.

This file does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, Phase 30 implementation, Phase 31 implementation, public/guest spectation, service workers, push infrastructure, new custom skills, force-push, secret printing, or work in the original stable `brrrdle` repository.

## 1. Purpose

Phase 30 should introduce privacy-safe public leaderboards after the Phase 27 ranked Practice model, Phase 28 Live spectator stabilization, and Phase 29 public profile foundations are in place.

Phase 30 should also include two narrow Multiplayer Overview cleanup items identified from the user-provided screenshots:

- `/Users/noir/Desktop/overview_screenshot_raw.png`
- `/Users/noir/Desktop/overview_screnshot_edited.png`

Those screenshots show that the top Multiplayer subtab navigation row is the desired navigation surface because it carries the active state and badge/count behavior. A second lower shortcut row appears inside the Overview subtab, duplicates navigation, and does not carry the same badge behavior. Phase 30 should remove that lower shortcut row if Stage 30.1 confirms it has no separate workflow authority.

The screenshots also show a `Selected` state next to `Resume` on an active game card. Source review confirms the related `Select`/`Selected` affordance currently lives in `src/multiplayer/MultiplayerActiveGames.tsx` and mutates selected-game state separately from `Resume`. Phase 30 should audit whether that separate button is useful; if not, remove it or replace it with clearer behavior while preserving selected-game state needed by routing and resume flows.

## 2. Current State

Phase 29 is complete and merged. The expected local and remote `main` baseline is:

- `HEAD`: `ec5d7824104d9d41e79b2b49e475c68006cf40da`
- `origin/main`: `ec5d7824104d9d41e79b2b49e475c68006cf40da`

Relevant completed foundations:

- Phase 27 created trusted ranked Practice settlement, durable ranked Practice queue behavior, ranked UI/stats copy, and private leaderboard-ready projections.
- Phase 28 stabilized authenticated Live v1 spectator behavior, current Daily Multiplayer spectation integrity, browser/foreground notification delivery, and Elo transparency.
- Phase 29 created default-private public profile foundations with opaque `public_profile_id`, allow-listed public profile fields, owner editing, public-safe read RPC seams, notification action cleanup, and About-tab Elo transparency relocation.

Relevant source observations:

- `src/multiplayer/rankedLeaderboardProjections.ts` currently provides private/internal ranked leaderboard-ready rows from trusted local competitive cache state. It requires a viewer user id and emits placeholder identity, not public profile identity.
- `src/account/publicProfile.ts` provides public profile DTO, validation, and repository seams for the Phase 29 RPC contract.
- `docs/supabase.md` documents the Phase 29 public profile RPC allow-list and states that public profile reads may not expose raw auth emails, raw auth ids, auth metadata, private account metadata, progress, settings, history, ranked private projections, raw rating transactions, game/session projections, answers, seeds, tokens, or local/session artifacts.
- `src/multiplayer/MultiplayerWorkspace.tsx` renders `MultiplayerOverview(...)`, including the redundant lower shortcut row and the active/lobby/live overview panels.
- `src/multiplayer/MultiplayerActiveGames.tsx` renders active-game cards with `Resume` plus a separate `Select`/`Selected` control.
- `src/app/App.tsx` owns top-level route/subtab/selected multiplayer game state and focused spectator state.

## 3. Goals

- Add public leaderboard foundations for approved metrics without exposing private account, profile, progress, ranked, game, session, answer, seed, token, or local artifact data.
- Use Phase 29 public profiles as the only public identity layer for named players.
- Convert Phase 27/28 private leaderboard-ready concepts into an explicit public-safe leaderboard contract.
- Decide the Phase 30 v1 metric set before implementation.
- Decide whether public leaderboard reads are anonymous-public, authenticated-public, or authenticated-only first.
- Require a migration/RLS addendum before any public leaderboard database contract is created or changed.
- Keep leaderboard UI and projections non-authoritative for gameplay, rating settlement, profile ownership, Daily claims, spectator state, notifications, or account authority.
- Remove redundant Multiplayer Overview navigation clutter while preserving the useful top subtab row and all route/subtab behavior.
- Remove, rename, or clarify the confusing `Select`/`Selected` active-game affordance while preserving selected-game state and resume behavior.

## 4. In Scope

Phase 30 may include:

- public leaderboard planning and implementation for the approved Phase 30 v1 metric set;
- leaderboard identity hydration through Phase 29 public profile fields;
- anonymous or private-profile fallback rows if approved;
- leaderboard ranking, tie-breaks, row limits, pagination or bounded row counts, loading states, empty states, error states, and opt-in copy;
- leaderboard filters by approved metric, mode, and ranked bucket;
- migration/RLS addendum planning if public leaderboard views, tables, RPCs, materialized projections, refresh functions, policies, grants, indexes, or public read rules are required;
- one separately authorized additive migration if the addendum is approved;
- non-printing privacy probes for public rows and denied private data;
- repository/domain DTO parsing for public leaderboard rows;
- focused UI tests and browser smoke for public leaderboard surfaces;
- removing the redundant lower shortcut row from Multiplayer Overview after audit;
- auditing and removing or clarifying the active-game `Select`/`Selected` affordance after audit;
- preserving the main Multiplayer subtab row, badge/count behavior, `Resume`, `View Active`, `Open Lobby`, `Open Live`, focused spectator routing, selected-game persistence, active-game routing, lobby routing, and Live routing.

## 5. Out Of Scope

Phase 30 must not include:

- implementation before separate stage authorization;
- public/guest spectation or new spectator projection access;
- multiplayer rematch, same-settings play-again, or same-settings search-again flows;
- new ranked match types, Daily ranked, timed Practice ranked, ranked custom/private-code games, or ranked Daily leaderboards; these are routed to Phase 32 ranked mode expansion / competitive ladder v2 unless a later approved plan changes that sequence;
- Elo algorithm changes, K-factor changes, expected-score formula changes, rating bucket changes, trusted settlement changes, or rating transaction authority changes;
- gameplay-rule changes, scoring formula changes, timeout/forfeit precedence changes, GO transition changes, keyboard-state changes, Daily claim changes, or Practice word-length changes;
- service workers, push subscriptions, background push, or deployment configuration;
- theme proposal modernization or concrete theme implementation;
- broad redesign of Multiplayer, Stats, Profiles, or Dashboard;
- Supabase migration creation or execution before a separately approved migration/RLS stage;
- Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, or original stable `brrrdle` repository work.

## 6. Required Invariants

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Current Daily Multiplayer answer leakage through spectator views remains prevented.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged unless later explicitly approved.
- Ranked Practice v1 remains the only ranked match type unless Phase 32 or a later approved spec changes it.
- Daily ranked and timed Practice ranked remain deferred until Phase 32 ranked mode expansion planning and authorization.
- Match points and Elo/rank movement remain separate.
- Live v1 spectator behavior remains read-only.
- Public/guest spectation remains unavailable unless a later approved phase explicitly implements sanitized public projections.
- Public profiles remain opt-in/default-private public identity projections and must not become gameplay, rating, notification, spectator, or account authority.
- Leaderboard UI and leaderboard projections must not become gameplay, rating settlement, profile ownership, Daily claim, spectator, notification, or account authority.
- Existing scoring, timeout, forfeit, rating/Elo, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged unless explicitly approved.
- The original stable `brrrdle` repository remains untouched.

## 7. Public Leaderboard Metric Decisions

Phase 30 v1 should prefer a small, defensible metric set over broad public stats.

Approved-by-default candidate metrics:

- current ranked Elo/rating by ranked bucket;
- rank within ranked bucket;
- ranked games played;
- ranked wins, losses, and draws;
- latest rating movement when represented only as an aggregate display field such as delta and timestamp;
- peak rating if it can be derived from trusted rating transactions without exposing transaction internals.

Conditional metrics that require Stage 30.1 approval:

- total games played across broader game history, because the source may cross private progress/history boundaries;
- streaks, because the source may imply private play history and needs anti-abuse semantics;
- achievement/performance metrics, because each needs a precise source, privacy review, and abuse review.

Deferred or disallowed for Phase 30 v1:

- raw rating transactions;
- raw match/result ids;
- queue ids;
- settlement ids;
- Daily ranked metrics;
- timed ranked Practice metrics;
- spectator metrics;
- answer-bearing or seed-derived metrics;
- private solo progress/history details unless transformed through an explicitly approved public-safe aggregate.

Recommended Phase 30 v1 default:

- ship ranked bucket leaderboards first, using current rating, rank, ranked games played, wins/losses/draws, provisional/established status if approved, recent movement, and optional peak rating;
- defer broader streak and total-games leaderboards until Stage 30.1 proves the source and privacy model are safe.

## 8. Public Profile Identity Integration

Leaderboard rows must use Phase 29 public profile foundations for player identity.

Allowed public identity fields:

- `public_profile_id`;
- display name;
- accent color;
- flair key;
- avatar URL only if the Phase 29 public profile contract accepts it;
- created/updated public profile timestamps only when needed for profile display, not ranking authority.

Forbidden identity fields:

- raw auth email;
- raw Supabase auth id;
- private `profiles` row data;
- Supabase auth metadata or app metadata;
- private account settings;
- tokens, service ids, sessions, or local artifacts.

Private or non-public users:

- must not leak raw identity;
- may be omitted entirely, or may appear as an approved anonymous fallback such as `Private player`;
- must not receive a public profile link unless `visibility='public'` and `moderation_status='active'`;
- must not be distinguishable through hidden private fields.

Phase 30 must decide whether an opted-in public profile is required to appear on a public leaderboard. The conservative default is:

- public/active profiles can show named leaderboard rows;
- private/non-active profiles are omitted or shown as anonymous fallback rows without profile links;
- the chosen fallback must be documented and tested.

## 9. Public Read Scope

Phase 30 must explicitly choose one public read posture before implementation:

1. **Anonymous-public**: anyone can read approved public leaderboard rows through allow-listed RPCs.
2. **Authenticated-public**: signed-in users can read approved leaderboard rows, with possible later anonymous broadening.
3. **Authenticated-only first**: leaderboards are visible only to signed-in users for the first implementation.

Recommended default:

- use anonymous-public only if Stage 30.2 can define a narrow, allow-listed RPC contract with strong privacy probes;
- otherwise start authenticated-public and document the exact conditions required for later anonymous-public access.

Regardless of read posture, browser clients must not directly select raw rating/profile/game tables for public leaderboard data.

## 10. Leaderboard Data Contract Requirements

A public leaderboard row should include only approved aggregate fields, such as:

- leaderboard id or category id;
- rank;
- bucket or category;
- rating or metric value;
- games played, wins, losses, draws where approved;
- latest rating delta and timestamp where approved;
- peak rating where approved;
- public profile identity fields or anonymous fallback identity;
- row updated timestamp or projection freshness timestamp.

A public leaderboard row must not include:

- `user_id`;
- raw auth email;
- private profile metadata;
- raw rating transaction id;
- raw match id;
- raw opponent id;
- settlement id;
- queue id;
- Daily claim id;
- raw game/session projection;
- serialized session;
- player session;
- answer;
- seed;
- token or service credential;
- local/session artifact identifiers.

Ranking and ordering must be deterministic. Recommended tie-breakers:

1. metric value, descending;
2. ranked games played, descending when applicable;
3. peak rating, descending when applicable;
4. latest trusted movement or profile update timestamp, descending when applicable;
5. stable non-sensitive projection id, ascending.

If the stable projection id could leak raw auth identity, use an opaque projection id generated by trusted SQL/RPC logic instead.

## 11. Migration And RLS Constraints

This specification does not authorize migration creation or execution.

Stage 30.2 is expected if Stage 30.1 confirms public leaderboard data needs a durable SQL/RPC contract. The addendum must define:

- exact table, view, materialized view, function, and RPC names;
- exact public row allow-list;
- exact identity hydration behavior;
- exact private-profile fallback behavior;
- public read posture;
- row limits and pagination;
- ranking and tie-break behavior;
- refresh or caching model;
- indexes;
- grants;
- RLS policies;
- rollback plan;
- non-printing privacy probes;
- how public profile visibility/moderation changes affect leaderboard rows;
- how trusted rating settlement remains the only rating authority.

Recommended migration shape:

- prefer allow-listed `security definer` RPCs or views over broad direct table grants;
- compute rows from trusted rating/profile data in SQL/RPC where possible;
- join to `public_player_profiles` internally by private `user_id` only inside trusted SQL/RPC code;
- return only public `public_profile_id` plus allow-listed identity fields or an anonymous fallback;
- never return raw private ids or raw transaction internals.

If materialized or cached rows are used:

- define refresh ownership and frequency;
- prevent browser clients from refreshing or mutating trusted leaderboard state unless explicitly intended and safe;
- include freshness copy in the UI.

## 12. Abuse, Moderation, And Display Safety

Phase 30 must respect the Phase 29 moderation and visibility model:

- only public/active profiles can show public display names and profile links;
- hidden/suspended/private profiles must not expose allow-listed public fields through leaderboard rows;
- display names, bios, flair keys, accent colors, and avatar URLs must be treated as untrusted user content;
- render user-provided text as text only, not HTML;
- avoid leaderboard copy that implies public identity is mandatory if the product keeps private fallback rows;
- plan future moderation hooks without making Phase 30 an admin/moderation phase.

Abuse-resistant leaderboard behavior should include:

- bounded row counts;
- deterministic sorting;
- no client authority over ranking values;
- no local-only leaderboard injection;
- no exposure of hidden rows through counts, pagination, or error states.

## 13. Leaderboard UI Requirements

Phase 30 leaderboard UI should:

- live in a location chosen by Stage 30.1 and confirmed by the implementation plan;
- clearly distinguish ranked Practice v1 leaderboards from future Daily or timed ranked modes;
- support approved filters such as bucket/mode and metric;
- show public-safe profile identity or approved private fallback;
- provide loading, empty, error, and signed-out states;
- explain opt-in public profile visibility when a player expects to appear but does not;
- provide accessible table/list semantics and keyboard navigation;
- work on desktop, tablet-like, and narrow mobile widths;
- avoid cards inside cards and preserve existing app visual conventions.

Potential placement options:

- Stats route section;
- Multiplayer route section;
- profile/public identity route section;
- a new Leaderboards route or subtab if the implementation plan justifies it.

The implementation plan should make the placement decision before Stage 30.4 source work starts.

## 14. Multiplayer Overview Cleanup Requirements

### 14.1 Redundant Secondary Shortcut Row

Source review found the lower shortcut row in `MultiplayerOverview(...)`:

- `Daily Multiplayer`
- `Practice Multiplayer`
- `Lobby`
- `Active Games`
- `Live`

This row duplicates the main `SubtabBar` row rendered immediately above the Overview body. The main row is preferred because it carries active state and badge/count behavior from `attention`.

Phase 30 cleanup should:

- remove the lower shortcut row if Stage 30.1 confirms it is redundant;
- preserve the top `SubtabBar`;
- preserve badge/count behavior on the top row;
- preserve `View Active`, `Open Lobby`, and `Open Live` buttons inside overview sections because those are contextual section actions, not duplicate navigation clutter;
- preserve Daily and Practice entry access through the main top row;
- add or update tests so the lower row does not return accidentally.

### 14.2 `Select` / `Selected` Affordance

Source review found `Select`/`Selected` in `src/multiplayer/MultiplayerActiveGames.tsx`.

The control currently:

- appears next to `Resume`;
- calls `onSelectGame(game.id)`;
- marks the card as selected through `aria-pressed`;
- updates selected multiplayer game state used elsewhere by the workspace/app.

Phase 30 cleanup should audit whether players need a separate selected-state button. If `Resume`, contextual section actions, or direct subtab/game routing already provide the useful action, the visible `Select`/`Selected` button should be removed or replaced with clearer copy.

Implementation must preserve:

- selected multiplayer game state where still needed for route handoff and active-game persistence;
- `Resume` behavior;
- `View Active` routing;
- lobby row opening;
- Live row opening and focused spectator routing;
- accessibility for the selected/focused active game;
- component tests that currently rely on selected state, updated to reflect the new intended UX.

Recommended default:

- keep selected-game state internal or route-driven;
- remove the visible `Select`/`Selected` button from player-facing cards unless Stage 30.1 finds a distinct useful workflow;
- if a visible action remains, rename it to a clear verb such as `Preview` or `Open details`, but only if the UI actually shows a distinct details state.

## 15. Likely Files And Modules

Planning and docs:

- `planning/phase-30/PLANNING-BRIEF.md`
- `planning/specs/phase-30/PHASE-30-PUBLIC-LEADERBOARDS-AND-MULTIPLAYER-OVERVIEW-CLEANUP-SPEC-2026-06-22.md`
- `planning/phase-30/IMPLEMENTATION-PLAN.md`
- `planning/phase-30/CHANGELOG.md`
- `planning/README.md`
- `docs/ranked-multiplayer.md`
- `docs/supabase.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

Leaderboard/profile/ranked surfaces:

- `src/multiplayer/rankedLeaderboardProjections.ts`
- `src/multiplayer/rankedLeaderboardProjections.test.ts`
- `src/multiplayer/rating.ts`
- `src/multiplayer/competitiveMultiplayer.ts`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/account/publicProfile.ts`
- `src/account/publicProfile.test.ts`
- `src/account/ProfilePanel.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/app/App.tsx`
- future leaderboard view-model, repository, and component files if approved

Multiplayer Overview cleanup surfaces:

- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerWorkspace.test.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/app/App.tsx`
- relevant E2E specs if browser coverage is warranted

Supabase/RLS surfaces:

- `docs/supabase.md`
- `supabase/migrations/20260621003033_phase29_public_profile_rls.sql`
- Phase 27 rating/ranked settlement migrations
- Phase 28 spectator v2 migration
- any future Phase 30 leaderboard migration, only after separate authorization

## 16. Recommended Stage Breakdown

### Stage 30.0 - Implementation Plan Approval And Protected Baseline

- Confirm repository state.
- Preserve existing uncommitted Phase 30 planning/spec/progress artifacts.
- Create Stage 30.0 progress records.
- Run baseline verification before implementation begins.
- Do not modify source/runtime code.

### Stage 30.1 - Leaderboard And Multiplayer Overview Audit

- Audit public profile RPCs, private ranked leaderboard-ready projections, rating profiles, rating transactions, settlement boundaries, stats/history sources, and Supabase/RLS surfaces.
- Decide Phase 30 v1 leaderboard metric set.
- Decide public read posture and private-profile fallback behavior.
- Decide leaderboard UI placement.
- Audit the Multiplayer Overview lower shortcut row and the `Select`/`Selected` affordance.
- Decide whether Stage 30.2 migration/RLS addendum planning is required.
- Do not implement source/runtime fixes.

### Stage 30.2 - Leaderboard Migration/RLS Addendum Planning

- Create a precise addendum under `planning/specs/phase-30/` if Stage 30.1 confirms public leaderboard SQL/RLS work is needed.
- Define the public leaderboard row contract, identity hydration, grants, policies, rollback plan, refresh/caching behavior, and privacy probes.
- Do not create or run SQL.

### Stage 30.3 - Leaderboard Migration/RLS Execution

- Execute only after explicit migration authorization.
- Create one additive migration if the addendum requires it.
- Apply only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous.
- Run non-printing privacy probes.
- Stop before app implementation if migration verification fails.

### Stage 30.4 - Leaderboard Domain And Repository Foundations

- Add strict DTO parsing and repository seams for approved leaderboard RPCs or projection sources.
- Hydrate public identity only through allow-listed public profile fields.
- Reject corrupt or overbroad payloads.
- Add tests for metric ordering, tie-breaks, row limits, missing/private profile fallback, and privacy exclusions.

### Stage 30.5 - Leaderboard UI And Profile Integration

- Add the approved leaderboard UI surface.
- Provide approved filters and row displays.
- Show public profile identity or approved private fallback.
- Add empty/loading/error/signed-out states.
- Add copy explaining opt-in profile visibility and ranked Practice v1 scope.
- Avoid public/guest spectation or private gameplay routing.

### Stage 30.6 - Multiplayer Overview Cleanup

- Remove the redundant lower shortcut row from Overview if audit confirms redundancy.
- Remove, rename, or replace `Select`/`Selected` after audit confirms the safest player-facing behavior.
- Preserve selected-game state, resume/open behavior, active/lobby/live routing, focused spectator routing, and main subtab badge/count behavior.
- Add focused tests and browser smoke if warranted.

### Stage 30.7 - Final Hardening And Handoff

- Review leaderboard privacy, identity display, responsive behavior, empty states, docs/progress, and Overview cleanup.
- Run focused tests, relevant E2E/browser smoke, full local verification, non-printing secret/artifact checks, and resource/process cleanup checks.
- Prepare Phase 30 changelog and Git handoff evidence.

## 17. Success Criteria

Phase 30 is successful when:

- public leaderboard rows expose only approved aggregate metrics and public-safe identity fields;
- leaderboards never expose raw auth emails, raw auth ids, private account metadata, private progress, answer-bearing fields, seeds, sessions, raw game projections, local artifacts, private ranked projections, or unapproved rating transaction internals;
- private-profile users are omitted or displayed through an approved anonymous fallback without revealing identity;
- public profile opt-in/default-private behavior remains intact;
- leaderboard ordering, tie-breaks, row limits, filters, and refresh/caching behavior are deterministic and tested;
- any migration/RLS work passes non-printing privacy probes;
- leaderboard UI clearly communicates ranked Practice v1 boundaries and does not imply Daily ranked, timed ranked Practice, or broader public ranking modes exist;
- Multiplayer Overview no longer shows the redundant lower shortcut row;
- the main Multiplayer subtab navigation row, badge/count behavior, active-game routing, lobby routing, Live routing, and selected-game resume behavior continue to work;
- the `Select`/`Selected` affordance is removed or clarified so players see only useful distinct actions;
- Phase 27 ranked behavior, Phase 28 Live behavior, Phase 29 public profile behavior, Daily Multiplayer integrity, and all gameplay rules remain unchanged.

## 18. Verification Strategy

Planning-only stages:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- `git status --short --branch`

Implementation stages, once separately authorized, should include:

- focused leaderboard DTO/repository tests;
- focused public profile hydration/privacy tests;
- focused leaderboard UI tests;
- focused Multiplayer Overview component tests;
- relevant route/browser smoke for leaderboard and Overview behavior;
- Supabase-backed non-printing privacy probes if migrations/RPCs are involved;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan;
- watched-port/process cleanup checks.

Run full E2E when implementation changes visible routes, public profile/leaderboard flows, or Multiplayer Overview navigation enough to warrant browser coverage.

## 19. Risks And Mitigations

- **Identity leakage**: use Phase 29 public profile RPCs and never expose raw auth ids or auth emails.
- **Rating audit leakage**: expose aggregate rating fields only; keep raw transactions private.
- **Private-profile leakage**: omit or anonymize private/non-active profiles and test both paths.
- **Overbroad metrics**: start with ranked bucket metrics; defer streak/total games until safe sources are proven.
- **Public read overexposure**: choose anonymous-public only with a narrow allow-listed RPC and strong probes.
- **Stale leaderboard data**: define live versus materialized refresh semantics and display freshness.
- **Leaderboard-as-authority confusion**: copy and code must treat leaderboards as display only.
- **Overview navigation regression**: preserve the top subtab row and section actions; add tests for active/lobby/live routing.
- **Hidden selected-state dependency**: audit `Select` before removing; keep state internal if other route handoffs need it.
- **Scope creep**: keep ranked mode expansion, rematches, public/guest spectation, themes, service workers, push infrastructure, Elo changes, and gameplay changes out of Phase 30.

## 20. Open Decisions

- Should Phase 30 public leaderboard reads be anonymous-public, authenticated-public, or authenticated-only first?
- Which Phase 30 v1 metrics should ship: Elo/rank only, ranked games played, win/loss/draw counts, latest movement, peak rating, streaks, total games played, or a smaller subset?
- Should private-profile users be omitted entirely or shown as `Private player` rows without profile links?
- Should provisional rating status be visible on public leaderboards?
- What tie-breaker should be final after rating/games/peak/freshness: opaque projection id, public profile id, or another stable non-sensitive key?
- Should leaderboard rows be computed live from trusted tables, materialized through a refreshable projection, or stored in a dedicated public leaderboard table?
- Where should leaderboard UI live: Stats, Multiplayer, Profile, a new route/subtab, or a dashboard card linking to a dedicated surface?
- Should Stage 30.6 cleanup happen before leaderboard UI to reduce clutter early, or after leaderboard UI so one browser pass covers all Phase 30 visible changes?
- Should the `Select` affordance be removed entirely, replaced with `Open details`, or kept only for keyboard/accessibility state if a distinct details state is proven?

## 21. Explicit Deferrals

- Multiplayer postgame rematch and same-settings play-again/search-again remain Phase 31.
- Ranked mode expansion / competitive ladder v2 remains Phase 32, including timed Practice ranked first and Daily ranked only after claim-safety proof.
- Public/guest spectation remains Phase 33 and requires separately approved sanitized public projections.
- Theme proposal/template modernization remains Phase 34.
- Full concrete theme implementation remains Phase 35 or later.
- Service workers, push subscriptions, background push, and deployment configuration remain out of Phase 30 unless separately planned and authorized.
- Elo algorithm changes, rating authority changes, and gameplay-rule changes remain out of Phase 30.

## 22. Next Gated Action

The next safe action is a detailed Phase 30 implementation plan.

That plan should:

- turn this spec into stage-by-stage deliverables;
- define the Stage 30.0 baseline gate;
- decide high-conflict file sequencing;
- make Stage 30.1 audit outputs explicit;
- treat Stage 30.2 migration/RLS addendum planning as expected unless Stage 30.1 proves no public leaderboard SQL/RLS changes are needed;
- define focused tests and final verification gates for each stage;
- generate the next prompt package for Stage 30.0 baseline only.

Do not begin Phase 30 implementation from this specification alone.
