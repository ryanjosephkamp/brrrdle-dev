# Phase 39 Planning Brief: Mobile Performance And Scroll Smoothness

**Status**: Draft planning brief for review.
**Phase**: Phase 39.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-01.

## Status And Authority

This planning brief follows the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`, `BRRRDLE-SPEC.md`, completed Phase 38 evidence, `planning/ROADMAP.md`, `planning/ROADMAP-OPTIMIZED.md`, `planning/testing/TESTING-SUITE.md`, Supabase/ranked multiplayer documentation, and the progress ledger.

It is planning-only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, public profile/private matchmaking implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, brrrdle GitHub backup workflow execution, force-push, secret printing, private data exposure, local session artifact exposure, or original stable `brrrdle` repository work.

## Current Baseline

- Phase 38 is complete, backed up to GitHub, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `937208ac519860cfa433fa39411c1b077508f26b`.
- User-reported Phase 38 manual review result: checklist items passed, and `planning/phase-38/REVIEW-CHECKLIST.md` has been checked off.
- Phase scope sizing guidance exists at `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md` and recommends larger cohesive macro-phases only when individual implementation stages remain narrow and gated.
- Phase 38 completed privacy-safe public/guest Practice Live discovery, read-only public/guest spectation, public spectator projection migration/RLS work, Daily claim RPC anonymous-grant hardening, authenticated spectator/participant non-regression, visual handoff review, and a manual review checklist.

## Manual Review Result Summary

The Phase 38 manual review is clean based on the user's current report and the checked review checklist. Phase 39 planning can proceed.

No Phase 38 public/guest spectator blockers were reported.

## New Observations Summary

The user reported a mobile page-scrolling smoothness issue:

- Actual gameplay and Live spectation feel fast.
- The issue appears primarily while scrolling within complex pages/tabs/subtabs, especially on mobile.
- The observed environment may have contributed to the issue because the user tested on an Android phone with multiple apps/windows open and split-view behavior.
- The user has not recently verified whether the same scroll lag appears on desktop.
- The user wants a systematic, low-risk approach that measures the issue where possible, fixes the cause where practical, and adds durable test or performance coverage if feasible.

The user also requested future planning for a much better mobile experience:

- The current mobile shell has substantial header/navigation/page chrome above gameplay.
- Phase 37 auto-centering helps, but mobile gameplay still feels overly busy and scroll-heavy.
- A broader mobile UX overhaul, compact navigation, and Focus Mode-style reduction should be planned for a later phase rather than rushed into Phase 39.

## Phase-Sizing And Reroute Decision

Phase 39 should be rerouted from the prior public profiles/private matchmaking roadmap slot to a cohesive mobile performance and scroll smoothness macro-phase.

Reasoning:

- The scroll-smoothness issue affects the user's ability to test and enjoy the app on mobile.
- Public profile/private matchmaking work would likely add more public/social UI surfaces and scrolling content. Fixing scroll performance first reduces the risk of building new complexity on top of known page-jank.
- The work is cohesive: it shares app shell, global CSS, panel/card, complex workspace, Playwright/browser, visual review, and performance-measurement concerns.
- The work can still be broken into narrow stages: audit, measurement harness, targeted shell/CSS/source fixes, complex-page tuning, final hardening.

The prior roadmap item, public profiles/private matchmaking, should move to Phase 40. Public site stats/developer dashboard/onboarding/help should move to Phase 41. Progression HUD, Focus Mode, and the broader mobile UX overhaul should move to Phase 42 or later. Theme work should move to Phase 43 or later, with full concrete themes after that.

## Goals

- Reproduce or characterize the mobile scroll-smoothness issue without guessing at the root cause.
- Add safe measurement or diagnostic coverage for scroll behavior where feasible and not brittle.
- Identify expensive app-shell, global CSS, panel, animation, fixed/sticky, backdrop/filter, shadow, overflow, tooltip, or complex-list patterns that can cause scroll jank.
- Make narrow source/CSS/UI improvements that improve scroll smoothness on mobile and do not degrade desktop/tablet behavior.
- Keep gameplay interaction fast and avoid changing gameplay rules.
- Preserve Phase 38 public/guest read-only spectator behavior and all previous protected multiplayer/auth/navigation behavior.
- Route the broader mobile UX redesign, compact navigation, and Focus Mode work to a later shell-polish phase.

## In Scope

- Read-only audit of current scroll/performance-sensitive surfaces:
  - global CSS and shell layout;
  - `LunarSignalStage`;
  - shared panel, button, tooltip, keyboard, subtab, card, and dialog primitives;
  - complex route surfaces such as Dashboard, Multiplayer Overview/Active Games/Lobby/Live, Leaderboard, Stats, History, Settings, and Profile.
- Browser-based diagnosis where feasible:
  - mobile viewport scroll checks;
  - complex page smoke scenarios;
  - horizontal overflow checks;
  - console/page-error guards;
  - bounded performance measurements or trace observations if stable enough.
- Source-only performance and scroll smoothness fixes after audit:
  - reducing avoidable expensive effects on mobile;
  - limiting heavy visual treatments where they do not materially improve gameplay;
  - avoiding scroll-linked layout work where practical;
  - applying containment, content visibility, virtualization-like chunking, or memoization only when supported by evidence and compatible with accessibility;
  - ensuring fixed/sticky gameplay controls do not fight normal page scrolling.
- Focused tests for any durable performance/scroll helper, layout guard, or complex page regression that can be expressed reliably.
- Final visual handoff review emphasizing mobile scroll-heavy surfaces.
- Progress records, changelog, manual review checklist, and Git handoff preparation after implementation is explicitly authorized and completed.

## Out Of Scope

- Source/runtime implementation during this planning brief.
- Test implementation during this planning brief.
- Supabase migration creation or execution.
- Vercel/Supabase configuration changes, deployment, release, staging, commits, pushes, PR creation, merge, or branch deletion.
- Public/social profile browsing, clickable rival profiles, public profile pages for other players, direct player match requests, request/mailbox flows, and private matchmaking expansion.
- Spectator presence/count/list implementation.
- Full mobile navigation redesign, Focus Mode, compact side navigation, or broad app-shell restructuring.
- EXP, coin, collectible, or progression HUD counters.
- Public site stats, private developer dashboard, onboarding/help/tutorial UX.
- Theme modernization or full concrete theme work.
- Service workers, push subscriptions, background push, gameplay-rule changes, scoring changes, timeout/forfeit changes, Daily claim changes, and Elo algorithm changes.

## Recommended Phase 39 V1 Scope

Phase 39 v1 should focus on mobile scroll performance and complex-surface smoothness:

1. Audit current scroll/performance-sensitive code and CSS.
2. Create a measurement/diagnostic strategy that is useful but not brittle.
3. Implement small source/CSS fixes for the highest-confidence causes.
4. Tune complex scroll-heavy surfaces without redesigning the app.
5. Verify with focused tests, feasible browser/performance checks, visual handoff review, full final verification, and manual review checklist.

Phase 39 should not try to solve every mobile UX problem. Its purpose is to make current pages scroll more smoothly and make future regressions more visible.

## Recommended Stage Breakdown

### Stage 39.0 - Protected Baseline

- Confirm repository state, branch, remotes, `HEAD`, and `origin/main`.
- Preserve the user-edited Phase 38 manual checklist and Phase 39 planning artifacts.
- Record the current uncommitted planning/progress baseline.
- Run the protected baseline gate before audit or source changes.

### Stage 39.1 - Mobile Scroll And Performance Audit

- Read current app shell, CSS, shared UI primitives, complex workspaces, and E2E/browser harnesses.
- Audit likely scroll-jank causes without making source changes.
- Decide the safest measurement approach and the exact implementation-stage order.
- Decide which broad mobile UX items remain deferred.

### Stage 39.2 - Scroll Measurement And Regression Harness

- Add the smallest reliable browser/test helper coverage for scroll-heavy mobile scenarios.
- Prefer deterministic assertions such as no horizontal overflow, safe scroll restoration, scrollability, no console/page errors, and bounded lightweight timing/long-task observations where stable.
- Avoid brittle absolute frame-rate thresholds unless the audit proves they are reliable in local CI/dev conditions.
- Document any performance checks that remain manual or visual-review-only.

### Stage 39.3 - Shell, CSS, And Shared UI Scroll Smoothness Fixes

- Make targeted global CSS/app-shell/shared-primitive improvements based on the audit.
- Candidate areas may include expensive mobile backdrop filters/shadows, fixed/sticky controls, scroll-linked tooltip positioning, heavy route chrome, and unnecessary repaint surfaces.
- Preserve current visual identity unless a measured mobile performance issue justifies a narrow reduction.

### Stage 39.4 - Complex Workspace Scroll Tuning

- Tune the most scroll-heavy current pages/subtabs where evidence points to avoidable work:
  - Multiplayer Overview/Active Games/Lobby/Live;
  - Dashboard;
  - Leaderboard;
  - Stats;
  - History;
  - Settings/Profile if needed.
- Keep tuning narrow and compatible with existing tests and accessibility.
- Do not use this stage for a full redesign.

### Stage 39.5 - Final Hardening, E2E, Visual Review, Changelog, Manual Checklist

- Run focused performance/scroll regression checks and relevant E2E/browser smoke.
- Run full final verification.
- Run visual handoff review under ignored `test-results/visual-review/phase-39-stage-39-5/`.
- Create `planning/phase-39/CHANGELOG.md`.
- Create `planning/phase-39/REVIEW-CHECKLIST.md` using the local phase review checklist skill and Phase 37-style checklist structure.
- Prepare for Git handoff only after explicit authorization.

## Success Criteria

- The root cause or likely cause classes for mobile scroll jank are documented before source changes.
- Phase 39 adds at least one useful automated or semi-automated guard for mobile scroll/layout/performance if feasible.
- Targeted source/CSS changes improve or preserve mobile scroll smoothness on complex pages.
- Current gameplay input responsiveness remains fast.
- Phase 38 public/guest spectator behavior and privacy boundaries remain intact.
- Phase 37 browser history and gameplay auto-centering remain intact.
- Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior remain intact.
- Phase 35 Profile/auth and Live identity behavior remain intact.
- Phase 34 Live/Lobby/notification behavior remains intact.
- Phase 33 timed ranked Practice behavior and public leaderboard boundaries remain intact.
- Daily integrity, gameplay rules, scoring, timeout/forfeit behavior, Elo math, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged.
- Broader mobile UX redesign, Focus Mode, and compact navigation remain clearly deferred.

## Likely Files And Modules

- `src/index.css`
- `src/app/LunarSignalStage.tsx`
- `src/app/App.tsx`
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
- Relevant app shell, layout, UI primitive, workspace, visual review, and Playwright/E2E tests.

## Migration/RLS Constraints And Addendum Gates

Phase 39 is expected to be source-only. No migration/RLS work is planned.

Stop and ask for review if a proposed performance fix unexpectedly requires database schema/RLS changes, new public projections, Supabase configuration, Vercel configuration, service worker infrastructure, or deployment behavior.

## Privacy, Supabase, Public-Profile, And Spectator Constraints

- Do not alter Phase 38 public/guest spectator projection or grants.
- Do not broaden public profile, participant identity, authenticated spectator, or public spectator payloads.
- Do not add spectator presence/count/list behavior.
- Do not expose raw auth IDs, emails, private profile fields, answers, seeds, sessions, queue internals, rating internals, tokens, screenshots, videos, traces, auth state, or local artifacts.
- Keep public/guest spectator surfaces read-only.
- Keep authenticated participant and authenticated spectator paths intact.

## Vercel And Deployment Constraints

Phase 39 does not configure Vercel or deploy.

If mobile performance needs preview-device verification later, that should remain a separately authorized preview/deployment gate. Production deployment and release remain out of scope.

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

Planning/spec stages should use lightweight documentation verification only:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Implementation stages should run focused tests first, then the standard stage gate:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port/process cleanup checks when browser/E2E work runs
- `git status --short --branch`

Final hardening should run:

- focused Phase 39 regression/performance/browser checks;
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

- mobile Dashboard/Home scroll;
- mobile Multiplayer Overview and Active Games with multiple rows;
- mobile Multiplayer Live with public/guest and authenticated states where safe;
- mobile Leaderboard;
- mobile Stats;
- mobile Settings/Profile if touched;
- desktop/tablet smoke comparison for any shell/CSS changes.

Screenshots, videos, traces, auth state, tokens, and local artifacts must remain ignored/local-only and unstaged.

## Manual Review Checklist Expectations

The Phase 39 manual checklist should ask the user to verify:

- mobile scrolling feels smoother on complex pages;
- gameplay input remains fast;
- no page content overlaps or becomes inaccessible on mobile;
- navigation, subtabs, Back/Forward, and gameplay auto-centering still behave safely;
- public/guest and authenticated Live spectator behavior from Phase 38 remains intact;
- broader mobile UX redesign and Focus Mode remain deferred;
- visual artifacts remain local-only and ignored.

## GitHub Backup Workflow Expectations

After Phase 39 final hardening, manual review checklist creation, and Git handoff preparation pass, the recommended backup prompt should invoke the local `brrrdle-github-backup` skill only if the user explicitly authorizes it and the file allowlist is clean.

No GitHub backup work is authorized by this planning brief.

## Risks

- Mobile scroll jank may be environment-dependent and hard to reproduce reliably in automated tests.
- Browser performance metrics can be noisy, so brittle thresholds could create false failures.
- Heavy visual effects may contribute to jank, but removing too much visual polish without evidence could degrade the app unnecessarily.
- Fixed/sticky keyboard or route chrome changes can improve scrolling while accidentally changing gameplay comfort.
- Complex workspaces may need component-level memoization or rendering changes that should remain narrow and test-backed.
- Broader mobile UX desires could tempt a full redesign; keep that out of Phase 39 unless a later approved prompt changes scope.

## Open Decisions

- Which mobile scenario best reproduces the reported scroll jank: Multiplayer Active Games, Live, Leaderboard, Stats, Dashboard, Settings/Profile, or another route?
- Can Playwright or browser APIs provide a stable enough scroll performance guard, or should Phase 39 rely on layout/overflow assertions plus visual/manual review?
- Which visual effects are safe to reduce on mobile without weakening the intended design?
- Should Phase 39 include a temporary diagnostic note or helper for manual device testing, or keep all measurement inside automated tooling?
- Should the later broad mobile UX overhaul be folded into the existing Focus Mode/progression HUD phase, or become its own future shell/mobile phase after social/stats/help work?

## Deferred Routing

- Public/social profile browsing, clickable rival profiles, direct player match requests, private matchmaking, custom-code invitation expansion, and request/mailbox flows: Phase 40.
- Public site stats, private developer dashboard, onboarding/help/tutorial UX: Phase 41.
- EXP/coin/collectible header counters, Focus Mode, compact navigation, and broader mobile UX overhaul: Phase 42 or later.
- Theme work: Phase 43 or later.
- Full concrete themes: Phase 44 or later.
- Service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes: later gated phases only.

## Next Gated Action

The next safe action after review is creation of the unified Phase 39 specification. That spec should turn this planning brief into implementation-oriented requirements for mobile scroll/performance audit, measurement harness design, targeted source/CSS fixes, complex-workspace tuning, verification, visual review, and manual checklist gates. It must halt before implementation.
