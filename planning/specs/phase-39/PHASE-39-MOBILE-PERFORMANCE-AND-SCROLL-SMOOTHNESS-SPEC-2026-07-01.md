# Phase 39 Specification: Mobile Performance And Scroll Smoothness

**Status**: Draft unified specification for review.
**Phase**: Phase 39.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-01.

## Status And Authority

This specification turns the Phase 39 planning brief into an implementation-oriented review artifact. It follows the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`, `BRRRDLE-SPEC.md`, completed Phase 38 evidence, `planning/phase-39/PLANNING-BRIEF.md`, current roadmap routing, `planning/testing/TESTING-SUITE.md`, and the progress ledger.

This specification does not authorize implementation. Source/runtime changes, test changes, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, public profile/private matchmaking implementation, service workers, push infrastructure, gameplay-rule changes, Elo changes, the brrrdle GitHub backup workflow, force-push, secret printing, private data exposure, local session artifact exposure, and original stable `brrrdle` repository work remain gated.

## Current Baseline

- Phase 38 is complete, backed up to GitHub, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `937208ac519860cfa433fa39411c1b077508f26b`.
- The checked Phase 38 manual review checklist at `planning/phase-38/REVIEW-CHECKLIST.md` must be preserved.
- Phase scope sizing guidance exists at `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md` and allows cohesive macro-phases while keeping implementation stages narrow.
- Phase 39 planning brief exists at `planning/phase-39/PLANNING-BRIEF.md`.
- Progress through Phase 39 planning is recorded in `progress/PROGRESS-STEP-322.md`.
- Phase 38 added privacy-safe public/guest Practice Live discovery and read-only spectation, preserved authenticated spectator/participant paths, excluded current Daily Multiplayer from public/guest spectator discovery, and deferred spectator presence/count/list work.
- The user reported mobile page-scroll smoothness/latency issues on complex pages and subtabs. The user also reported that gameplay input and Live spectation feel fast.

## Problem Statement

The user-visible issue is page-level scroll jank, especially on mobile and especially on complex tabs/subtabs with substantial content. This is not currently reported as gameplay input lag, Live update lag, tab-switching lag, or browser Back/Forward lag.

Phase 39 should not guess at a single cause. It should first audit and characterize likely contributors, then add a practical measurement/regression harness where feasible, then make narrow source/CSS/shared-UI fixes backed by that audit.

Likely audit candidates include:

- heavy app-shell or card visual effects such as blur, shadow, fixed overlays, and large repaint surfaces;
- mobile sticky keyboard behavior and fixed/floating elements;
- scroll listeners or resize work that can run during page scroll;
- complex lists, tables, cards, and subtabs in current workspaces;
- avoidable horizontal overflow wrappers or wide tables;
- expensive route chrome above gameplay;
- unnecessary re-rendering or layout work in scroll-heavy views.

These candidates are not accepted root causes until Stage 39.1 verifies or narrows them.

## Goals

- Reproduce, characterize, or at least systematically bound the mobile scroll-smoothness issue.
- Add useful automated or semi-automated layout/scroll/performance guards where feasible.
- Avoid brittle absolute frame-rate thresholds unless the audit proves they are stable in local/browser verification.
- Make targeted source/CSS/shared-UI improvements for current scroll smoothness.
- Tune complex current workspaces without broad redesign.
- Preserve fast gameplay input and all current multiplayer, spectator, navigation, auth, stats, leaderboard, Daily, and ranked behavior.
- Keep broad mobile UX overhaul, compact navigation, and Focus Mode routed to a later phase.

## In Scope

- Read-only audit of scroll/performance-sensitive source and CSS surfaces.
- Browser-based diagnosis using mobile and desktop/tablet viewports where practical.
- Adding or extending Playwright/helpers for deterministic layout and scroll safety checks, such as:
  - no horizontal overflow;
  - page remains scrollable where expected;
  - no console/page errors during route navigation and scroll;
  - safe scroll restoration and gameplay auto-centering preservation;
  - bounded long-task or timing observations only if stable enough.
- Source-only CSS/app-shell/shared-UI optimizations after audit.
- Targeted tuning of current complex surfaces, especially Dashboard, Multiplayer, Leaderboard, Stats, History, Settings, and Profile where evidence points.
- Focused tests for any new scroll/performance helper, layout guard, or component behavior.
- Final hardening, E2E/browser checks, visual handoff review, changelog, manual review checklist, and Git handoff preparation in later authorized stages.

## Out Of Scope

- Implementation during this specification pass.
- Test implementation during this specification pass.
- Supabase migration creation or execution.
- Vercel/Supabase configuration, deployment, release, staging, commits, pushes, PR creation, merges, or branch deletion.
- Broad mobile navigation redesign, compact navigation, Focus Mode, or full mobile shell overhaul.
- Public/social profile browsing, clickable rival profiles, direct player match requests, private matchmaking, custom-code invitation expansion, and request/mailbox flows.
- Public site stats, private developer dashboard, onboarding/help/tutorial UX.
- EXP, coin, collectible, or progression HUD counters.
- Spectator presence/count/list implementation.
- Theme modernization or full concrete theme implementation.
- Service workers, push subscriptions, background push, gameplay-rule changes, scoring changes, timeout/forfeit changes, Daily claim changes, and Elo algorithm changes.

## Phase 39 V1 Scope Decision

Phase 39 v1 is a cohesive mobile performance and scroll smoothness macro-phase. The macro-phase may include audit, measurement harness, source/CSS/shared-UI fixes, complex-surface tuning, and final hardening, but each implementation stage must remain narrow.

Phase 39 should not become a mobile redesign phase. The deliverable is smoother current-page scrolling and better regression visibility, not a new navigation model.

## Measurement And Regression Contract

Phase 39 should add the best practical measurement/guarding layer available in the current app and test stack.

Preferred guard types:

- deterministic layout guards:
  - no horizontal overflow at mobile, tablet, and desktop widths;
  - expected scroll containers remain usable;
  - sticky/fixed controls do not cover required content;
  - focused gameplay and spectator surfaces remain reachable;
- browser route smoke:
  - navigate to scroll-heavy current routes;
  - scroll down/up;
  - assert no console/page errors;
  - assert key content remains visible and clickable after scroll;
- bounded performance observations only if reliable:
  - long-task counts where browser support is stable;
  - coarse timing diagnostics reported as evidence, not fragile pass/fail thresholds;
  - optional local diagnostic output that does not include secrets or private data.

Avoid:

- brittle absolute FPS/frame-time gates that fail on normal machine variance;
- large trace artifacts committed to the repository;
- screenshots, videos, traces, auth state, tokens, or local session artifacts in tracked files;
- claiming a performance fix without either measured evidence, before/after browser observation, or a clear code-path rationale.

## Candidate Audit Surfaces

### App Shell And Global CSS

- `src/index.css`
- `src/app/LunarSignalStage.tsx`
- `src/app/App.tsx`
- primary navigation route chrome and tab/subtab containers
- global `backdrop-filter`, heavy `box-shadow`, fixed/floating, sticky, animation, and overflow rules

### Shared UI Primitives

- `src/ui/Panel.tsx`
- `src/ui/Button.tsx`
- `src/ui/Keyboard.tsx`
- `src/ui/Tooltip.tsx`
- `src/ui/SubtabBar.tsx`

Special attention:

- mobile sticky keyboard behavior;
- tooltip scroll/resize listeners and fixed portal positioning;
- panel blur/shadow cost;
- button hover/transform behavior on touch devices;
- wide table overflow wrappers.

### Complex Workspaces

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

### Existing Test Harness

- `e2e/fixtures/assertions.ts`
- existing Playwright route/spectator/gameplay specs
- visual handoff review flow under the local `brrrdle-visual-review-gate` skill when later authorized

## Success Criteria

- Stage 39.1 documents the likely cause classes and highest-priority surfaces before source changes.
- Stage 39.2 adds useful layout/scroll/performance guard coverage, or documents why reliable automated performance checks are not feasible and routes the rest to visual/manual review.
- Stage 39.3 and Stage 39.4 make only targeted source/CSS/shared-UI changes backed by the audit.
- Mobile scroll-heavy pages feel smoother or at least no worse under local visual/browser review.
- Desktop and tablet behavior remain acceptable.
- Gameplay input remains fast and unchanged.
- Phase 38 public/guest spectator behavior remains intact.
- Phase 37 browser history and gameplay auto-centering remain intact.
- Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior remain intact.
- Phase 35 Profile/auth and Live identity behavior remains intact.
- Phase 34 Live/Lobby/notification behavior remains intact.
- Phase 33 timed ranked Practice behavior and public leaderboard display-only boundaries remain intact.
- Daily integrity, gameplay rules, scoring, timeout/forfeit behavior, Elo math, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged.
- Broad mobile UX overhaul, compact navigation, Focus Mode, progression HUD, public/private matchmaking, site stats, onboarding/help, themes, service workers, deployment/release, gameplay-rule changes, and Elo changes remain deferred.

## Stage Breakdown

### Stage 39.0 - Protected Baseline

- Read governance, Phase 39 planning/spec materials, completed Phase 38 evidence, progress records, testing docs, `agents.md`, `memory.md`, and `package.json`.
- Confirm repo state, branch, remotes, `HEAD`, and `origin/main`.
- Preserve the user-edited `planning/phase-38/REVIEW-CHECKLIST.md`.
- Record existing uncommitted Phase 39 planning/spec/progress artifacts and Phase 38 checklist state.
- Create the Stage 39.0 progress report and matching 12-column CSV row.
- Run watched-port/process checks before and after verification for `5173`, `5174`, `3000`, and `4173`.
- Run the approved baseline verification gate.
- Do not begin Stage 39.1.

### Stage 39.1 - Mobile Scroll And Performance Audit

- Read app shell, global CSS, shared UI primitives, complex workspaces, and current E2E/browser harnesses.
- Reproduce or characterize the user-reported mobile scroll issue where feasible.
- Use one local dev server only if browser reproduction requires it, then stop it.
- Identify likely scroll-jank causes and classify them by risk:
  - source/CSS-only;
  - component rendering/memoization;
  - test harness/measurement only;
  - broad redesign, which should remain deferred.
- Decide the exact Stage 39.2 measurement plan and Stage 39.3/39.4 source-work order.
- Do not implement source/runtime fixes or tests in this audit stage.

### Stage 39.2 - Scroll Measurement And Regression Harness

- Add the smallest reliable test/helper coverage for scroll-heavy mobile scenarios.
- Extend `e2e/fixtures/assertions.ts` or create nearby helpers only if useful and low-risk.
- Prefer stable assertions:
  - no horizontal overflow across target viewports;
  - route content remains reachable after scroll;
  - sticky/fixed controls do not cover required actions;
  - no console/page errors during scroll;
  - scroll helper no-ops safely where APIs are absent.
- Add optional coarse performance observations only if stable enough to be meaningful.
- Avoid brittle FPS thresholds.
- Preserve all source behavior outside test/helper coverage unless explicitly required by the measurement harness.

### Stage 39.3 - Shell, CSS, And Shared UI Scroll Smoothness Fixes

- Implement targeted source/CSS fixes for the highest-confidence shell/shared-UI causes from Stage 39.1.
- Candidate work may include:
  - reducing expensive blur/shadow effects on mobile where they are demonstrably costly;
  - making sticky/fixed gameplay controls less disruptive to normal scroll;
  - reducing scroll-time listener work for tooltips or other overlays;
  - applying containment/content-visibility cautiously where it preserves accessibility and layout;
  - refining overflow behavior without hiding content.
- Preserve visual identity where possible.
- Add focused tests for changed behavior where practical.
- Do not tune complex workspaces unless the change belongs naturally to shell/shared primitives; leave workspace-specific work to Stage 39.4.

### Stage 39.4 - Complex Workspace Scroll Tuning

- Tune specific heavy routes/subtabs identified by Stage 39.1 and protected by Stage 39.2.
- Candidate workspaces:
  - Dashboard;
  - Multiplayer Overview/Active Games/Lobby/Live;
  - Leaderboard;
  - Stats;
  - History;
  - Settings/Profile if evidence points there.
- Prefer small changes such as layout containment, list/card rendering cleanup, table overflow hardening, reduced effect density on mobile, and low-risk memoization.
- Do not redesign route hierarchy, primary navigation, subtabs, or gameplay layout.
- Preserve public/guest spectator and authenticated participant/spectator behavior.

### Stage 39.5 - Final Hardening, E2E, Visual Review, Changelog, Manual Checklist

- Review Stages 39.1 through 39.4 for regressions, stale copy, docs gaps, visual gaps, and performance-test brittleness.
- Add only narrow final-hardening fixes if required.
- Run focused regression/browser coverage for scroll measurement helpers, mobile scroll-heavy surfaces, public/guest Live non-regression, browser history/gameplay auto-centering preservation, and touched workspaces.
- Run the local visual handoff review gate for Phase 39 user-visible surfaces, saving artifacts only under ignored `test-results/visual-review/phase-39-stage-39-5/`.
- Create `planning/phase-39/CHANGELOG.md`.
- Create `planning/phase-39/REVIEW-CHECKLIST.md` using the local `brrrdle-phase-review-checklist` skill and Phase 37-style checklist structure.
- Run final verification before Git handoff preparation.

## Migration/RLS Constraints

Phase 39 is expected to be source-only. No migration/RLS work is planned.

Stop and ask for review if any proposed performance improvement requires:

- schema changes;
- new SQL/RLS policies;
- public projections;
- direct table grants;
- Supabase configuration;
- Vercel configuration;
- service worker/push infrastructure;
- deployment behavior.

## Privacy, Supabase, Public-Profile, And Spectator Constraints

- Do not alter Phase 38 public/guest spectator projection, grants, or Daily exclusion.
- Do not broaden public profile, participant identity, authenticated spectator, or public spectator payloads.
- Do not add spectator presence/count/list behavior.
- Do not expose raw auth IDs, emails, private profile fields, answers, seeds, sessions, queue internals, rating internals, tokens, screenshots, videos, traces, auth state, or local artifacts.
- Keep public/guest spectator surfaces read-only.
- Keep authenticated participant and authenticated spectator paths intact.

## Vercel And Deployment Constraints

Phase 39 does not configure Vercel or deploy.

If later mobile-device verification needs a preview deployment, that must be routed to a separate explicitly authorized deployment/preview gate. Production deployment and release remain out of scope.

## Gameplay And Elo Constraints

Phase 39 must not change:

- word-list validation;
- Hard Mode validation;
- tile coloring;
- keyboard color precedence;
- Daily claim rules;
- multiplayer settlement;
- scoring;
- timeout/forfeit rules;
- Elo/rating algorithm;
- ranked queue logic;
- GO transition rules;
- Practice word-length bounds;
- Solo Daily fixed-five behavior.

## Verification Strategy

Planning/spec stages use lightweight documentation verification only:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Protected baseline uses the approved baseline gate:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port/process cleanup checks
- `git status --short --branch`

Implementation stages should run focused tests first, then:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port/process cleanup checks when browser work runs
- `git status --short --branch`

Final hardening should run:

- focused Phase 39 regression/browser/performance checks;
- feasible targeted E2E or browser smoke for mobile scroll-heavy surfaces;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run test:full`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- diff, CSV, secret/artifact, ignored-artifact, watched-port, and status checks;
- visual handoff review and manual checklist when authorized.

## Visual Handoff Review Expectations

Final Phase 39 visual artifacts should remain ignored/local-only under:

`test-results/visual-review/phase-39-stage-39-5/`

Suggested scenarios:

- mobile Dashboard scroll;
- mobile Multiplayer Overview and Active Games with multiple cards;
- mobile Multiplayer Lobby and Live;
- mobile public/guest focused Live spectator detail;
- mobile Leaderboard;
- mobile Stats;
- mobile History;
- mobile Settings/Profile if touched;
- desktop/tablet comparison for shell or CSS changes.

Screenshots, videos, traces, auth state, tokens, and local artifacts must remain ignored/local-only and unstaged.

## Manual Review Checklist Expectations

The Phase 39 manual checklist should ask the user to verify:

- mobile scrolling feels smoother on the previously laggy complex pages;
- gameplay input remains fast;
- Live spectation remains fast and read-only where appropriate;
- no required mobile content is hidden behind sticky/fixed UI;
- route navigation, subtabs, browser Back/Forward, and gameplay auto-centering still behave safely;
- public/guest and authenticated Live spectator behavior from Phase 38 remains intact;
- broader mobile UX redesign, compact navigation, and Focus Mode remain deferred.

## GitHub Backup Workflow Expectations

After Phase 39 final hardening, manual review checklist creation, and Git handoff preparation, the recommended backup prompt should invoke the local `brrrdle-github-backup` skill only if the user explicitly authorizes it and the file allowlist is clean.

No GitHub backup work is authorized by this specification.

## Risks

- Mobile scroll jank may be environment-dependent and hard to reproduce in local desktop browser conditions.
- Performance metrics can be noisy, so overly strict thresholds may create false failures.
- Reducing heavy visual effects may improve performance but could weaken the intended visual identity if done too broadly.
- Sticky keyboard or shell changes can accidentally affect gameplay comfort.
- Complex workspaces may need small rendering changes that are easy to over-expand into redesign.
- Performance test artifacts such as traces and screenshots can become large or sensitive if not kept ignored/local-only.

## Open Decisions

- Which route best reproduces the reported mobile scroll issue.
- Whether the best Stage 39.2 guard is a deterministic layout/scroll helper, a coarse performance observation, or both.
- Whether tooltip scroll listeners, mobile sticky keyboard behavior, shell effects, or complex workspace rendering are the first high-confidence source target.
- Whether broad mobile UX overhaul remains part of Phase 42 with Focus Mode/progression HUD, or should become a separate later mobile-shell phase after Phase 39 results.

## Deferred Routing

- Public/social profile browsing, clickable rival profiles, direct player match requests, private matchmaking, custom-code invitation expansion, and request/mailbox flows: Phase 40.
- Public site stats, private developer dashboard, onboarding/help/tutorial UX: Phase 41.
- EXP/coin/collectible header counters, Focus Mode, compact navigation, and broader mobile UX overhaul: Phase 42 or later.
- Theme work: Phase 43 or later.
- Full concrete themes: Phase 44 or later.
- Service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes: later gated phases only.

## Next Gated Action

The next safe action after review is creation of the detailed Phase 39 implementation plan. That plan should turn this specification into a staged execution plan with Stage 39.0 protected baseline, Stage 39.1 audit, Stage 39.2 measurement harness, Stage 39.3 shell/CSS/shared-UI fixes, Stage 39.4 complex workspace tuning, and Stage 39.5 final hardening, visual review, changelog, and manual checklist. It must halt before implementation.
