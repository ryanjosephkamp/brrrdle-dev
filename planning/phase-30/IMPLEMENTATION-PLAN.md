# Phase 30 Implementation Plan

**Status**: Detailed execution plan for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-22.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-30/PLANNING-BRIEF.md`, `planning/specs/phase-30/PHASE-30-PUBLIC-LEADERBOARDS-AND-MULTIPLAYER-OVERVIEW-CLEANUP-SPEC-2026-06-22.md`, completed Phase 29 public profile foundations, completed Phase 28 Live spectator stabilization, completed Phase 27 ranked Practice foundations, current roadmap surfaces, and the current progress ledger.

This implementation plan does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, Phase 30 implementation, Phase 31 implementation, public/guest spectation, service workers, push infrastructure, new custom skills, force-push, secret printing, or work in the original stable `brrrdle` repository.

## 1. Purpose

Phase 30 should add privacy-safe public leaderboard foundations after Phase 29 public profiles and Phase 27 ranked Practice data foundations, while preserving all established gameplay and privacy boundaries.

Phase 30 should also handle two small Multiplayer Overview cleanup items:

- remove the redundant secondary shortcut row inside the Overview subtab if Stage 30.1 confirms it has no distinct workflow authority;
- audit and remove, rename, or clarify the confusing `Select`/`Selected` active-game affordance while preserving selected-game state and `Resume` behavior.

## 2. Execution Principles

- Work only in `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`; do not touch the original stable `brrrdle` repository.
- Treat Phase 30 as public-data work first. Every leaderboard row must be designed as a privacy boundary, not just a UI table.
- Keep public profile identity separate from rating, gameplay, account, notification, and spectator authority.
- Keep leaderboard projections display-only. They must not settle ratings, mutate profiles, claim Daily games, change notification state, or drive gameplay authority.
- Start with a narrow Phase 30 v1 metric set unless Stage 30.1 proves broader metrics are safe.
- Require a migration/RLS addendum before any public leaderboard SQL/RPC/table/view/materialized-view contract is created or changed.
- Keep source implementation stages separate from migration stages.
- Keep Multiplayer Overview cleanup isolated from leaderboard work and avoid turning it into a broad redesign.
- Preserve existing uncommitted Phase 30 planning/spec/progress artifacts until the later Git handoff gate.
- Stop and report if a stage discovers that the approved scope would require public/guest spectation, ranked mode expansion, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, or Phase 31 work.

## 3. Success Criteria

Phase 30 is complete when all separately authorized stages have produced:

- a public leaderboard contract that exposes only approved aggregate metrics and public-safe identity fields;
- no leakage of raw auth emails, raw auth ids, private profile metadata, private account metadata, private progress, answers, seeds, sessions, raw game projections, local artifacts, private ranked projections, queue ids, settlement ids, or unapproved rating transaction internals;
- deterministic leaderboard ranking, row limits, tie-breaks, loading states, empty states, error states, and refresh/freshness copy;
- identity display through Phase 29 public profiles only, with documented and tested behavior for private/non-active profiles;
- documented public read posture: anonymous-public, authenticated-public, or authenticated-only first;
- non-printing privacy probes for any public SQL/RPC contract;
- focused tests for leaderboard DTO parsing, repository behavior, identity hydration, privacy exclusions, UI states, and filters;
- a visible leaderboard UI that clearly communicates ranked Practice v1 scope and does not imply Daily ranked, timed ranked Practice, or broader ranking modes exist;
- removal or clarification of the redundant Multiplayer Overview shortcut row and the `Select`/`Selected` affordance without breaking main subtab badges, `Resume`, selected-game state, active-game routing, lobby routing, Live routing, or focused spectator routing;
- final verification evidence recorded in progress and a Phase 30 changelog.

## 4. Stage Breakdown

### Stage 30.0 - Implementation Plan Approval And Protected Baseline

**Purpose**: Approve this plan as the execution guide and establish a clean protected baseline before Phase 30 implementation begins.

Allowed work:

- read required governance, planning, progress, package, and testing surfaces;
- confirm repository state, branch, remotes, `HEAD`, and `origin/main`;
- confirm the original stable `brrrdle` repository is not being used;
- record existing uncommitted Phase 30 planning/spec/progress artifacts and preserve them;
- create the Stage 30.0 progress report and matching 12-column CSV row;
- run watched-port/process/resource checks before and after verification;
- run the baseline verification gate.

Baseline verification:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`

Exit gate:

- all baseline checks pass;
- Stage 30.0 progress records are complete;
- no source/runtime implementation, tests, migrations, commits, pushes, PRs, merges, deployments, or Phase 30 feature work occurred;
- halt for explicit Stage 30.1 authorization.

Stop conditions:

- any baseline command fails;
- repo target is ambiguous;
- original stable repo is detected as the active workspace;
- unexpected staged files, generated artifacts, secrets, or unrelated work appear.

### Stage 30.1 - Leaderboard And Multiplayer Overview Audit

**Purpose**: Decide the Phase 30 v1 public leaderboard contract, migration need, UI placement, and exact Multiplayer Overview cleanup before writing implementation code.

Audit targets:

- Phase 29 public profile RPC/app surfaces and default-private visibility behavior;
- `src/account/publicProfile.ts` and profile UI foundations;
- private ranked leaderboard-ready projections in `src/multiplayer/rankedLeaderboardProjections.ts`;
- rating profiles, rating transactions, ranked settlement, and ranked bucket behavior;
- stats/history sources that might support total-games or streak metrics;
- Supabase/RLS docs and migrations touching public profiles, ratings, transactions, ranked queues, async games, and spectator projections;
- current Multiplayer Overview source, especially `src/multiplayer/MultiplayerWorkspace.tsx` and `src/multiplayer/MultiplayerActiveGames.tsx`;
- relevant tests and user-provided screenshots.

Required decisions:

- Phase 30 v1 metrics: ranked Elo/rank only, ranked games played, wins/losses/draws, latest movement, peak rating, streaks, total games played, or a narrower subset;
- public read posture: anonymous-public, authenticated-public, or authenticated-only first;
- private/non-active profile handling: omit rows or show approved anonymous fallback;
- whether provisional status is visible;
- deterministic tie-breaker order;
- leaderboard data shape: live RPC, view, materialized projection, or dedicated table;
- leaderboard UI placement: Stats, Multiplayer, Profile, new route/subtab, or dashboard card;
- whether Stage 30.2 migration/RLS addendum planning is required;
- whether the redundant Overview shortcut row has any workflow authority;
- whether `Select`/`Selected` should be removed, renamed, or retained for a proven distinct detail/preview workflow.

Verification:

- focused read-only or browser checks as needed;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- `git status --short --branch`.

Exit gate:

- decisions are recorded in progress;
- if SQL/RLS work is required, halt with a Stage 30.2 prompt;
- if no SQL/RLS work is required, halt with the next safe app implementation prompt;
- no source/runtime implementation or migrations occurred.

### Stage 30.2 - Leaderboard Migration/RLS Addendum Planning

**Purpose**: Create a precise public leaderboard migration/RLS addendum if Stage 30.1 confirms durable SQL/RPC work is needed.

Deliverables:

- one addendum under `planning/specs/phase-30/`;
- exact table/view/materialized-view/RPC names;
- exact public row allow-list;
- exact identity hydration and private-profile fallback behavior;
- exact read posture and grants;
- row limits, pagination, filters, ranking, and tie-breaks;
- refresh/caching model and ownership;
- rollback plan;
- non-printing privacy probes;
- verification strategy;
- app integration constraints.

Likely protected requirements:

- browser clients must not directly select raw rating/profile/game/session tables for public leaderboard rows;
- trusted SQL/RPC may join private `user_id` internally only to return allow-listed public identity or approved anonymous fallback;
- no raw auth ids, emails, private profile metadata, raw transactions, match ids, queue ids, settlement ids, sessions, answers, seeds, or local artifacts may be returned.

Verification:

- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- `git status --short --branch`.

Exit gate:

- addendum is complete for review;
- halt for explicit Stage 30.3 migration execution authorization.

### Stage 30.3 - Leaderboard Migration/RLS Execution

**Purpose**: Implement the approved public leaderboard SQL/RPC contract only after explicit migration authorization.

Allowed only with separate authorization:

- create one additive Supabase migration under `supabase/migrations/`;
- apply only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous;
- run non-printing privacy probes from the addendum;
- update `docs/supabase.md` and progress records.

Recommended SQL posture:

- prefer allow-listed `security definer` RPCs or views over broad direct grants;
- use trusted rating/profile data internally;
- return only approved aggregate metrics and public-safe identity fields;
- ensure visibility/moderation changes are respected;
- keep trusted ranked settlement as the only rating authority.

Verification:

- migration apply result, without secrets;
- non-printing privacy probes;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- `git status --short --branch`.

Exit gate:

- migration and privacy probes pass;
- halt for Stage 30.4 app integration authorization.

Stop conditions:

- Supabase target or credentials are ambiguous;
- SQL would expose private identity or raw authority data;
- probes fail;
- migration requires destructive or non-additive work not explicitly approved.

### Stage 30.4 - Leaderboard Domain And Repository Foundations

**Purpose**: Add app-side public leaderboard DTO parsing, repository seams, and pure/domain tests against the approved contract.

Likely files/modules:

- future `src/leaderboards/` domain/repository files if a new module is justified;
- `src/multiplayer/rankedLeaderboardProjections.ts` only for reuse or explicit separation from private projections;
- `src/account/publicProfile.ts` only for shared public identity types or helpers;
- `src/multiplayer/rating.ts` and `src/multiplayer/competitiveMultiplayer.ts` only read-only unless tests require type imports;
- focused leaderboard tests.

Expected behavior:

- strict DTO parsing rejects overbroad payloads and forbidden fields;
- row limits and filters are normalized defensively;
- identity hydration consumes only allow-listed public profile fields or approved anonymous fallback;
- corrupt, private, suspended, hidden, or missing profile rows behave as specified;
- ordering/tie-breaks match Stage 30.1/30.2 decisions;
- no local-only leaderboard injection becomes public authority.

Verification:

- focused leaderboard DTO/repository tests first;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`.

Exit gate:

- repository/domain seams are verified;
- no leaderboard UI is required unless explicitly included in the stage prompt;
- halt for Stage 30.5 UI authorization.

### Stage 30.5 - Leaderboard UI And Public Profile Integration

**Purpose**: Add the approved public leaderboard UI surface and integrate public-safe profile identity.

Likely files/modules:

- chosen leaderboard UI route/section after Stage 30.1;
- `src/stats/StatsDashboard.tsx` if leaderboards live in Stats;
- `src/multiplayer/MultiplayerStatsPanel.tsx` or Multiplayer workspace only if placement is approved there;
- `src/app/App.tsx` for route wiring only if needed;
- future `src/leaderboards/` components and tests;
- `src/account/ProfilePanel.tsx` only for opt-in copy or links if approved.

UI requirements:

- clear ranked Practice v1 scope;
- approved filters for bucket/mode/metric;
- public-safe identity display or approved private fallback;
- empty/loading/error/signed-out states;
- opt-in public profile explanation;
- accessible table/list semantics;
- responsive desktop, tablet, and narrow mobile behavior;
- no cards inside cards unless matching existing repeated-item patterns;
- no public/guest spectation routes or private gameplay links.

Verification:

- focused leaderboard component/view-model tests;
- browser smoke if visible routing/layout changes warrant it;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`.

Exit gate:

- leaderboard UI is functional, privacy-safe, and responsive;
- halt for Stage 30.6 Multiplayer Overview cleanup authorization.

### Stage 30.6 - Multiplayer Overview Cleanup

**Purpose**: Implement the small user-requested Multiplayer Overview cleanup after the audit decision.

Likely files/modules:

- `src/multiplayer/MultiplayerWorkspace.tsx`;
- `src/multiplayer/MultiplayerActiveGames.tsx`;
- `src/multiplayer/MultiplayerPanel.tsx` and tests only if selected-game state wiring needs adjustment;
- `src/app/App.tsx` only if route/selection state changes are necessary;
- focused component tests and possibly one browser smoke.

Expected behavior:

- remove the lower Overview shortcut row if confirmed redundant;
- preserve the main `SubtabBar` and badge/count behavior;
- preserve `View Active`, `Open Lobby`, and `Open Live` contextual section actions;
- preserve Daily and Practice access through the main top row;
- remove or clarify visible `Select`/`Selected` if it lacks a distinct workflow;
- preserve selected-game state internally where needed for route handoff, active-game persistence, `Resume`, lobby opening, Live opening, and focused spectator routing;
- keep keyboard/accessibility behavior coherent after removing confusing controls.

Verification:

- focused Multiplayer Overview/component tests;
- focused route/selected-game tests if touched;
- browser smoke for the Overview screenshot path if warranted;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`.

Exit gate:

- user-visible Overview clutter is removed or clarified;
- no leaderboard, gameplay, ranked, Daily, Live, notification, or profile regressions are introduced;
- halt for Stage 30.7 final hardening authorization.

### Stage 30.7 - Final Hardening And Handoff

**Purpose**: Complete Phase 30 verification, cleanup, documentation, and handoff readiness.

Review targets:

- leaderboard privacy and identity boundaries;
- public read posture and RLS/probe evidence;
- leaderboard copy, filters, responsive behavior, and empty/error states;
- profile opt-in/fallback behavior;
- Overview cleanup and selected-game behavior;
- docs, changelog, progress records, and memory handoff notes;
- generated artifacts, secrets, and watched processes.

Verification:

- focused tests for touched leaderboard/profile/Overview files;
- relevant E2E/browser smoke for visible leaderboard and Overview behavior;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e` if visible route/workspace behavior warrants it;
- `npm run test:full` if Phase 30 touched broad route/UI or leaderboard flows;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan;
- watched-port/process cleanup checks.

Exit gate:

- Phase 30 appears complete;
- `planning/phase-30/CHANGELOG.md` exists;
- final progress evidence is complete;
- halt for a separate Git handoff preparation prompt.

## 5. Dependencies And Sequencing

- Stage 30.0 must pass before any implementation audit or source work.
- Stage 30.1 must decide metrics, read posture, private fallback, UI placement, and migration need before Stage 30.2 or Stage 30.4.
- Stage 30.2 and Stage 30.3 are required if public leaderboard SQL/RPC/table/view/materialized-view work is needed.
- Stage 30.4 should not assume a remote contract exists unless Stage 30.3 has applied and verified it, or Stage 30.1 explicitly chose a no-migration path.
- Stage 30.5 should not build UI against unstable DTO shapes.
- Stage 30.6 should be sequenced after leaderboard UI unless Stage 30.1 decides early cleanup reduces risk without interfering with leaderboard placement.
- Stage 30.7 should not run until all authorized implementation stages are complete.

High-conflict surfaces should remain single-writer or explicitly sequenced:

- `src/app/App.tsx`;
- `src/account/`;
- `src/multiplayer/`;
- `src/stats/`;
- `supabase/migrations/`;
- `docs/supabase.md`;
- `planning/README.md`;
- `planning/phase-30/`;
- `planning/specs/phase-30/`;
- `progress/PROGRESS.csv`;
- `progress/PROGRESS-STEP-*.md`;
- `memory.md`.

## 6. Migration/RLS Addendum Gates

Stage 30.2 is required unless Stage 30.1 proves that public leaderboard work can be completed safely without new or changed Supabase SQL/RLS.

The addendum must define:

- exact public leaderboard RPC/view/table names;
- exact public row allow-list;
- exact forbidden fields and privacy probes;
- exact joins to Phase 29 public profiles;
- exact private/non-active profile fallback behavior;
- public read posture;
- row limits, pagination, freshness, ranking, and tie-breaks;
- grant and RLS strategy;
- refresh ownership if materialized projections are used;
- rollback plan;
- non-printing Supabase-backed verification.

Stage 30.3 may proceed only after explicit authorization and only against the confirmed `brrrdle-dev` Supabase project.

## 7. Risk Management

- **Public identity leakage**: rely on Phase 29 public profile allow-lists, never raw auth fields.
- **Rating audit leakage**: expose aggregate metrics only; keep raw transactions and settlement ids private.
- **Private-profile leakage**: choose and test omission or anonymous fallback.
- **Metric overreach**: default to ranked bucket metrics first; defer streaks/total games if source privacy is unclear.
- **Public read overexposure**: start authenticated-public unless anonymous-public is backed by strong addendum probes.
- **Authority confusion**: copy must state leaderboards are display-only and do not change Elo or match results.
- **Stale data confusion**: define refresh/caching and show freshness where appropriate.
- **Overview regression**: preserve main subtab row and section actions; add regression tests for the removed duplicate row.
- **Selected-state regression**: keep selected-game state internal or route-driven even if the visible button is removed.
- **Scope creep**: keep ranked mode expansion, public/guest spectation, rematches, themes, service workers, push infrastructure, Elo changes, and gameplay changes out of Phase 30.

## 8. Open Decisions

- Should Phase 30 public leaderboard reads be anonymous-public, authenticated-public, or authenticated-only first?
- Should Phase 30 v1 ship only ranked bucket leaderboards, or also include streaks and total games played?
- Should private/non-active profiles be omitted or shown as `Private player` rows?
- Should provisional status appear publicly?
- What is the final deterministic tie-breaker after rating, games played, peak rating, and freshness?
- Should leaderboard rows be live RPC rows, views, materialized projections, or dedicated public tables?
- Where should leaderboard UI live?
- Should Stage 30.6 Overview cleanup run before or after leaderboard UI?
- Should `Select`/`Selected` be removed entirely, renamed to a real distinct action, or retained only if Stage 30.1 proves a useful workflow?

## 9. Explicit Deferrals

- Multiplayer postgame rematch and same-settings play-again/search-again remain Phase 31.
- Ranked mode expansion / competitive ladder v2 remains Phase 32, including timed Practice ranked first and Daily ranked only after claim-safety proof.
- Public/guest spectation remains Phase 33 and requires separately approved sanitized public projections.
- Theme proposal/template modernization remains Phase 34.
- Full concrete theme implementation remains Phase 35 or later.
- Service workers, push subscriptions, background push, and deployment configuration remain out of Phase 30 unless separately planned and authorized.
- Elo algorithm changes, rating authority changes, and gameplay-rule changes remain out of Phase 30.

## 10. Next Gated Action

The next safe action is Stage 30.0: Implementation Plan Approval And Protected Baseline.

Stage 30.0 should read required governance/planning/testing surfaces, confirm repository state, preserve current uncommitted Phase 30 planning/spec/progress artifacts, create the Stage 30.0 progress report and CSV row, run resource/process checks, and run the baseline verification gate.

Do not begin Stage 30.1 audit, source implementation, test implementation, migration planning, migration execution, or public leaderboard work until Stage 30.0 is explicitly authorized and completed.
