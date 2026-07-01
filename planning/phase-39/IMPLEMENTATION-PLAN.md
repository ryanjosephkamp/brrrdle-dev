# Phase 39 Implementation Plan: Mobile Performance And Scroll Smoothness

**Status**: Draft implementation plan for review.
**Phase**: Phase 39.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-01.

## Status And Authority

This implementation plan turns `planning/phase-39/PLANNING-BRIEF.md` and `planning/specs/phase-39/PHASE-39-MOBILE-PERFORMANCE-AND-SCROLL-SMOOTHNESS-SPEC-2026-07-01.md` into a staged execution plan. It follows the current user authorization, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`, `BRRRDLE-SPEC.md`, completed Phase 38 evidence, roadmap routing, testing workflow guidance, and the progress ledger.

This plan is review-only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, public profile/private matchmaking implementation, service workers, push infrastructure, gameplay-rule changes, Elo changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

## Current Baseline

- Phase 38 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `937208ac519860cfa433fa39411c1b077508f26b`.
- The user-edited Phase 38 manual review checklist at `planning/phase-38/REVIEW-CHECKLIST.md` must be preserved.
- Phase scope sizing guidance exists at `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
- Phase 39 planning artifacts exist:
  - `planning/phase-39/PLANNING-BRIEF.md`
  - `planning/specs/phase-39/PHASE-39-MOBILE-PERFORMANCE-AND-SCROLL-SMOOTHNESS-SPEC-2026-07-01.md`
- Progress through the Phase 39 specification is recorded in `progress/PROGRESS-STEP-323.md`.

## Phase Objective

Phase 39 should improve current mobile page scroll smoothness and create practical regression visibility without turning the phase into a broad mobile redesign. The phase should first audit and characterize the problem, then add useful measurement or layout guards, then make targeted shell/CSS/shared-UI and complex-workspace fixes supported by the audit.

The user reported that gameplay input and Live spectation feel fast. Phase 39 should preserve those strengths and focus on page-level scrolling within complex tabs, subtabs, lists, cards, and workspaces.

## Non-Negotiable Invariants

- Preserve Phase 38 public/guest Practice Live discovery and read-only spectation.
- Preserve current Daily Multiplayer public/guest spectator exclusion.
- Do not add spectator presence, aggregate spectator counts, or identity-bearing spectator lists.
- Preserve Phase 37 browser Back/Forward integration and gameplay auto-centering.
- Preserve Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior.
- Preserve Phase 35 Profile/auth and Live identity behavior.
- Preserve Phase 34 Live/Lobby/notification behavior.
- Preserve Phase 33 timed ranked Practice behavior and public leaderboard display-only boundaries.
- Preserve Daily integrity, gameplay rules, word validation, Hard Mode validation, scoring, timeout/forfeit behavior, GO transition behavior, keyboard color precedence, and Elo/rating math.
- Do not broaden public profile, participant identity, authenticated spectator, or public spectator payloads.
- Do not expose raw auth IDs, emails, private profile fields, answers, seeds, sessions, queue internals, rating internals, tokens, screenshots, videos, traces, auth state, or local artifacts.
- Keep broad mobile UX overhaul, compact navigation, Focus Mode, progression HUD, themes, service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes deferred.

## Stage 39.0 - Protected Baseline

**Purpose**: Confirm the Phase 39 implementation plan is approved and capture a clean protected baseline before audit or source/test changes.

### Scope

- Read required governance, Phase 39 planning/spec/implementation materials, completed Phase 38 evidence, current progress records, testing workflow docs, `agents.md`, `memory.md`, and `package.json`.
- Confirm repository state:
  - `pwd`
  - current branch
  - `git status --short --branch`
  - remotes
  - `HEAD`
  - `origin/main`
- Confirm the original stable `brrrdle` repository is not being used.
- Preserve the user-edited `planning/phase-38/REVIEW-CHECKLIST.md`.
- Record current uncommitted Phase 39 planning/spec/progress artifacts and Phase 38 checklist state.
- Create the Stage 39.0 progress report and matching 12-column CSV row, likely progress ID `325`.
- Run watched-port/process/resource checks before and after verification for `5173`, `5174`, `3000`, and `4173`.

### Verification

Run sequentially:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

### Stop Conditions

Stop and record the exact non-secret failure if the repo is not `brrrdle-dev`, local or remote `main` is unexpected, verification fails, a forbidden artifact or real credential-like secret is found, ports remain occupied by Stage-owned processes, or the stable `brrrdle` repository would be touched.

### Output

If the baseline passes, produce a copy-safe prompt for Stage 39.1 audit only.

## Stage 39.1 - Mobile Scroll And Performance Audit

**Purpose**: Diagnose the reported mobile scroll-smoothness issue before source/test implementation.

### Scope

- Read app shell, global CSS, shared UI primitives, complex workspaces, and existing browser/E2E harnesses.
- Audit likely scroll-jank contributors:
  - heavy `backdrop-filter`, blur, shadow, fixed, sticky, animation, and large repaint surfaces;
  - mobile sticky keyboard behavior;
  - tooltip scroll/resize listeners and overlay positioning;
  - complex cards, tables, subtabs, and route chrome;
  - avoidable re-rendering or layout work during scroll;
  - horizontal overflow and wide table wrappers.
- Use one local dev server only if browser reproduction requires it, then stop it.
- Reproduce or characterize the issue on mobile viewports where feasible.
- Compare desktop/tablet only as needed to avoid misrouting a mobile-specific problem.
- Decide:
  - the Stage 39.2 measurement/regression harness shape;
  - whether Stage 39.3 should begin with CSS/shell/shared primitives or a specific shared component;
  - which complex workspaces belong in Stage 39.4;
  - which broad mobile UX items stay deferred.

### Likely Read-Only Surfaces

- `src/index.css`
- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/ui/Panel.tsx`
- `src/ui/Button.tsx`
- `src/ui/Keyboard.tsx`
- `src/ui/Tooltip.tsx`
- `src/ui/SubtabBar.tsx`
- `src/dashboard/DashboardHome.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerLobby.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/history/HistoryWorkspace.tsx`
- `src/account/Settings.tsx`
- `src/account/ProfilePanel.tsx`
- `e2e/fixtures/assertions.ts`
- relevant route, layout, UI primitive, visual review, and browser smoke tests

### Verification

Run focused read-only checks as needed, then:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

### Stop Conditions

Stop if the issue appears to require broad mobile navigation redesign, Focus Mode, service workers, deployment/configuration changes, migrations/RLS work, gameplay-rule changes, Elo changes, or source implementation beyond Phase 39 scope.

### Output

Recommend the precise Stage 39.2 path and whether subsequent implementation should proceed as source-only. Expected outcome: source-only measurement/harness stage, followed by source/CSS fixes.

## Stage 39.2 - Scroll Measurement And Regression Harness

**Purpose**: Add the smallest reliable guardrail for mobile scroll/layout/performance regressions before source tuning.

### Scope

- Implement only test/helper or diagnostic code needed for scroll-heavy mobile scenarios.
- Prefer stable assertions:
  - no horizontal overflow across mobile, tablet, and desktop target widths;
  - expected pages remain scrollable;
  - important controls and gameplay/spectator surfaces remain reachable after scroll;
  - sticky/fixed controls do not cover required actions;
  - no console/page errors during route navigation and scroll;
  - scroll helpers no-op safely when APIs are unavailable.
- Add coarse performance observations only if stable and not overly environment-sensitive.
- Do not rely on brittle absolute FPS or frame-time pass/fail thresholds unless Stage 39.1 proves they are reliable.
- Do not create or commit screenshots, videos, traces, auth state, tokens, or local session artifacts.

### Likely Files

- `e2e/fixtures/assertions.ts`
- focused E2E/browser smoke specs if existing surfaces support the guard cleanly
- optional small app/test utility only if required by the harness

### Verification

Run focused harness tests first, then:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

### Stop Conditions

Stop and report if reliable automated performance coverage is not feasible without brittle machine-dependent thresholds. In that case, document the manual/visual/browser review fallback and do not force a weak test.

## Stage 39.3 - Shell, CSS, And Shared UI Scroll Smoothness Fixes

**Purpose**: Apply targeted source/CSS/shared-primitive fixes for the highest-confidence shell-level scroll contributors.

### Scope

- Implement source-only and CSS-only fixes supported by Stage 39.1 and protected by Stage 39.2.
- Candidate work may include:
  - reducing expensive blur/shadow effects on mobile when they are demonstrably costly;
  - making fixed/sticky controls less disruptive to normal page scroll;
  - reducing scroll-time listener work for overlays or tooltips;
  - applying containment or `content-visibility` only where it preserves accessibility and layout correctness;
  - tightening overflow behavior without hiding content;
  - avoiding hover/transform work on touch contexts where unnecessary.
- Preserve the current visual identity unless a narrow mobile performance tradeoff is justified.
- Leave workspace-specific list/card/table tuning to Stage 39.4 unless the fix is truly shared.

### Likely Files

- `src/index.css`
- `src/app/LunarSignalStage.tsx`
- `src/app/App.tsx`
- `src/ui/Panel.tsx`
- `src/ui/Button.tsx`
- `src/ui/Keyboard.tsx`
- `src/ui/Tooltip.tsx`
- `src/ui/SubtabBar.tsx`
- focused UI/layout/browser tests

### Verification

Run focused tests first, then:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

### Stop Conditions

Stop if a proposed fix requires broad redesign, route hierarchy changes, gameplay layout rewrites, public/spectator payload changes, migrations, deployment/configuration work, or creates visual overlap/accessibility regressions.

## Stage 39.4 - Complex Workspace Scroll Tuning

**Purpose**: Tune current heavy route/workspace surfaces after shared shell fixes are in place.

### Scope

- Tune only surfaces identified by Stage 39.1 and covered by Stage 39.2/39.3 checks.
- Prefer small, local improvements:
  - reducing unnecessary visual effect density on mobile;
  - tightening responsive layout and overflow behavior;
  - applying safe containment to repeated lists/cards;
  - reducing avoidable rendering churn;
  - improving table/list wrappers without hiding data;
  - keeping scroll-heavy subtabs usable on mobile.
- Do not implement compact navigation, Focus Mode, broad mobile UX overhaul, public profile/private matchmaking, spectator presence/count/list, or new product surfaces.

### Likely Files

- `src/dashboard/DashboardHome.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerLobby.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/history/HistoryWorkspace.tsx`
- `src/account/Settings.tsx`
- `src/account/ProfilePanel.tsx`
- focused workspace/component/browser tests

### Verification

Run focused tests first, then:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

### Stop Conditions

Stop if tuning starts to become a redesign, changes data behavior, weakens privacy boundaries, modifies gameplay/rating behavior, or makes automated/manual review scope too large for Phase 39.

## Stage 39.5 - Final Hardening, E2E, Visual Review, Changelog, Manual Checklist

**Purpose**: Complete Phase 39 with broad verification, visual review, documentation, and manual review artifacts.

### Scope

- Review Stages 39.1 through 39.4 for regressions, stale copy, docs gaps, visual issues, layout overlap, accessibility concerns, and brittle tests.
- Add only narrow final-hardening fixes if required.
- Run feasible focused regression/browser coverage for:
  - scroll measurement/helpers;
  - mobile scroll-heavy surfaces;
  - shell/shared UI behavior touched by Stage 39.3;
  - complex workspaces touched by Stage 39.4;
  - Phase 38 public/guest Live non-regression;
  - Phase 37 browser history and gameplay auto-centering preservation;
  - no horizontal overflow and no console/page errors where appropriate.
- Run the local visual handoff review gate for Phase 39 user-visible surfaces, saving artifacts only under ignored `test-results/visual-review/phase-39-stage-39-5/`.
- Create `planning/phase-39/CHANGELOG.md`.
- Create `planning/phase-39/REVIEW-CHECKLIST.md` using the local `brrrdle-phase-review-checklist` skill and Phase 37-style checklist structure.

### Final Verification

Run:

- focused tests
- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run test:full`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port/process cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

### Stop Conditions

Stop if final verification fails, visual review reveals unresolved critical overlap/usability regressions, forbidden artifacts appear, or Phase 39 changes cannot be clearly bounded to performance/scroll smoothness.

### Output

Report whether Phase 39 appears complete and provide a copy-safe prompt for Phase 39 Git handoff preparation only if verification succeeds.

## Migration/RLS Gates

Phase 39 is expected to be source-only. No Supabase migration or RLS work is planned.

If any stage finds that a proposed performance fix requires schema changes, SQL/RLS policy changes, public projections, new grants, Supabase configuration, Vercel configuration, service workers, or deployment behavior, stop and route that work to a separately authorized addendum or later phase.

## Privacy, Supabase, And Public-Profile Constraints

- Do not alter Phase 38 public/guest spectator projection, grants, or Daily exclusion.
- Do not broaden public profile, participant identity, authenticated spectator, or public spectator payloads.
- Do not add spectator presence/count/list behavior.
- Keep public/guest spectator surfaces read-only.
- Keep authenticated participant and authenticated spectator paths intact.
- Do not print or commit secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile fields, screenshots, videos, traces, auth state, tokens, local session artifacts, or private data.

## Vercel And Deployment Constraints

Phase 39 does not authorize Vercel configuration changes, Supabase configuration changes, preview deployment, production deployment, release, or staging. Any future preview-device performance verification must be separately authorized.

## Gameplay And Elo Constraints

Phase 39 must not change gameplay rules, Daily rules, word validation, Hard Mode validation, tile coloring, keyboard color precedence, GO transition rules, solved-row hold behavior, scoring, timeout/forfeit logic, ranked queue behavior, public leaderboard authority, or Elo/rating math.

## Documentation Expectations

- Each stage must create a progress report and matching 12-column CSV row.
- Stage reports should record exact non-secret verification outcomes.
- Final hardening should create:
  - `planning/phase-39/CHANGELOG.md`
  - `planning/phase-39/REVIEW-CHECKLIST.md`
- Visual handoff artifacts must remain ignored/local-only.

## Risks

- Mobile scroll jank may be environment-dependent and hard to reproduce deterministically.
- Browser performance measurements can be brittle across hardware, browser versions, and local resource pressure.
- CSS changes that reduce expensive effects could unintentionally flatten the visual design.
- Sticky/fixed control changes could affect gameplay ergonomics if not tested carefully.
- Complex workspace tuning could expand into redesign if not kept disciplined.
- Adding weak performance tests could create noise without real protection.

## Open Decisions

- Which mobile route or workspace best reproduces the user-reported issue.
- Whether Stage 39.2 should include coarse performance observations or deterministic layout/scroll checks only.
- Which source area should be fixed first after the audit.
- Whether any workspace needs Stage 39.4 tuning after shared fixes.
- Whether broader mobile UX overhaul should remain with Focus Mode in Phase 42 or become its own later shell-polish phase.

## Next Gated Action

After this implementation plan is reviewed, the next safe action is Phase 39 Stage 39.0 protected baseline only. Stage 39.0 should not audit, implement, or test new behavior; it should confirm state, preserve current planning artifacts, create progress ID `325`, and run the protected baseline verification gate.
