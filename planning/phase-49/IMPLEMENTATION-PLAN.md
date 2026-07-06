# Phase 49 Implementation Plan

**Status:** Drafted for review. Do not execute until the next stage is explicitly authorized.
**Phase:** Phase 49 - Progression HUD, Focus Mode, And Mobile UX Shell Polish.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Stable repository boundary:** Do not touch the original stable `brrrdle` repository.
**Date:** 2026-07-06

## 1. Authority

This plan implements the staged execution path for:

- `planning/phase-49/PLANNING-BRIEF.md`
- `planning/specs/phase-49/PHASE-49-PROGRESSION-HUD-FOCUS-MODE-AND-MOBILE-UX-SHELL-POLISH-SPEC-2026-07-06.md`

Higher-authority sources remain, in order:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. Phase 49 planning brief and unified specification.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `planning/testing/TESTING-SUITE.md`.
7. Supporting repo docs, `agents.md`, and `memory.md`.

This document is planning only. It does not authorize implementation, test implementation, migrations, storage changes, Supabase or Vercel configuration, deployment, Git/GitHub operations, backup workflow execution, private Daily implementation, ranked Daily implementation, spectator presence/count/list, service workers, push infrastructure, strict one-active-session/session leases, server-authoritative Daily submissions, broad mobile shell/top-tab/navigation overhaul, compact side-dock implementation, broad theme modernization, gameplay-rule changes, Elo changes, local Codex skill changes, secret exposure, private-data exposure, local-artifact exposure, or stable-repository work.

## 2. Current Baseline

- Expected local `main` and `origin/main`: `07fd0e0d8acb8244b7779fc7f0cce46bf0424db4`.
- Phase 48 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Phase 48 manual review passed with no failed checklist item reported.
- Preserve the user-updated checklist at `planning/phase-48/REVIEW-CHECKLIST.md`.
- Phase 49 planning brief and unified specification are already created and tracked under progress steps 443 and 444.
- Phase 49 should not start implementation until Stage 49.0 baseline verification passes and the user explicitly authorizes the next stage.

## 3. Implementation Principles

- Treat Phase 49 as a shell and progression-polish phase, not an economy, gameplay, deployment, or theme phase.
- Audit before implementation. The first implementation decision must be source-only versus addendum.
- Keep any progression/resource HUD display-only unless a later protected addendum explicitly authorizes deeper economy or storage work.
- Read existing progression state; do not change reward amounts, XP formulas, coin costs, consumable behavior, Pay-to-Continue costs, reveal-answer costs, Daily claim behavior, scoring, gameplay rules, or Elo math.
- Treat Focus Mode as UI-shell behavior, not gameplay behavior.
- Keep Focus Mode session-local unless Stage 49.3 proves an existing settings path is safe and backward-compatible. Any uncertain persistence path requires addendum planning.
- Treat compact/mobile navigation as bounded shell polish. Broad mobile shell/top-tab/navigation redesign and compact side-dock implementation remain deferred.
- Preserve all account/guest progression boundaries, signed-in sync/freshness protections, guest display-boundary repairs, public/private profile privacy boundaries, public/guest spectator boundaries, and multiplayer reliability decisions from prior phases.
- Prefer narrow, reversible UI changes with focused tests and visual review.

## 4. Stage Breakdown

### Stage 49.0 - Protected Baseline And Phase 48 Review Intake

**Authorization:** Baseline, intake, and verification only.

**Goals:**

- Confirm repo state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not in use.
- Read required governance, Phase 49 planning/spec/implementation materials, Phase 48 completion evidence, package/test surfaces, current progress records, and relevant roadmap context.
- Preserve `planning/phase-48/REVIEW-CHECKLIST.md`.
- Record existing uncommitted Phase 49 planning/spec/progress artifacts.
- Create the Stage 49.0 progress report and matching 12-column CSV row, likely progress ID `446`.
- Run watched-port/process/resource checks before and after baseline verification for ports `5173`, `5174`, `3000`, and `4173`.
- Do not begin Stage 49.1 audit work or any source/test implementation.

**Likely read-only files/modules:**

- `CONSTITUTION.md`
- `BRRRDLE-SPEC.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`
- `planning/phase-49/PLANNING-BRIEF.md`
- `planning/specs/phase-49/PHASE-49-PROGRESSION-HUD-FOCUS-MODE-AND-MOBILE-UX-SHELL-POLISH-SPEC-2026-07-06.md`
- `planning/phase-49/IMPLEMENTATION-PLAN.md`
- `planning/phase-48/CHANGELOG.md`
- `planning/phase-48/REVIEW-CHECKLIST.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-443.md` through `progress/PROGRESS-STEP-445.md`
- `package.json`

**Verification:**

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

**Stop conditions:**

- Repo path is not exactly `brrrdle-dev`.
- Local or remote `main` does not match the expected baseline without a reviewed reason.
- The stable `brrrdle` repository would be touched.
- Any baseline verification command fails.
- Any forbidden artifact or credential-like value is found.

### Stage 49.1 - Progression HUD And Resource-Surface Audit

**Authorization:** Read-only audit only.

**Goals:**

- Audit existing progression, reward, coin, XP, consumable, Pay-to-Continue, reveal-answer, Stats, Settings, History, account sync, guest/cloud progress, and visible resource surfaces.
- Map current product meaning and ownership for level, XP progress, coins, consumables, reveal costs, continue costs, streak-related display, and resource-derived summaries.
- Identify stale-state, guest/account, privacy, sync, and UI-density risks for top-level resource display.
- Decide which values are meaningful and safe enough to consider for a first resource HUD slice.
- Classify whether Stage 49.3 can likely remain source-only or will require storage/Supabase/addendum planning.

**Likely read-only files/modules:**

- `src/progression/coins.ts`
- `src/progression/experience.ts`
- `src/progression/consumables.ts`
- `src/progression/payToContinue.ts`
- `src/progression/progression.test.ts`
- `src/account/storageSchema.ts`
- `src/account/guestStorage.ts`
- `src/account/accountScopedProgress.ts`
- `src/account/sync.ts`
- `src/account/autoProgressSync.ts`
- `src/account/Settings.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/stats/statsSelectors.ts`
- `src/history/historyViewModels.ts`
- `src/app/App.tsx`
- related progression, stats, account, and settings tests.

**Decision output:**

- Resource ownership map.
- Recommended first HUD subset or explicit deferral.
- Source-only versus addendum recommendation for Stage 49.3.
- Test and visual-review risks for any future HUD slice.

**Verification:**

- Focused read-only checks as needed.
- Lightweight documentation verification after the progress report is created.

### Stage 49.2 - Focus Mode And Compact/Mobile Shell Audit

**Authorization:** Read-only audit only.

**Goals:**

- Audit current app shell, lunar signal/route rail, primary navigation, topbar/header content, route attention, Back-to-top behavior, mobile route access, gameplay entry, keyboard visibility, safe-area behavior, reduced-motion handling, and visual density.
- Decide whether Focus Mode can be a small source-only UI-shell behavior.
- Decide whether the first compact/mobile shell slice should be Focus Mode, compact navigation, or no source work until a later addendum.
- Identify route recovery, Settings/account access, Help access, focus order, keyboard accessibility, and screen-reader constraints.
- Keep compact side-dock and broad shell redesign explicitly deferred unless evidence shows a separate addendum is needed.

**Likely read-only files/modules:**

- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/app/browserNavigationHistory.ts`
- `src/app/BackToTopButton.tsx`
- `src/ui/Navigation.tsx`
- `src/index.css`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/solo/SoloWorkspace.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `e2e/layout/mobile-scroll.spec.ts`

**Decision output:**

- Focus Mode feasibility classification.
- Compact navigation feasibility classification.
- Source-only versus mobile-shell addendum recommendation for Stage 49.3.
- Accessibility and visual-review checklist candidates.

**Verification:**

- Focused read-only checks as needed.
- Lightweight documentation verification after the progress report is created.

### Stage 49.3 - Source-Only Versus Storage/Mobile-Shell Addendum Decision

**Authorization:** Documentation/planning decision only.

**Goals:**

- Use Stages 49.1 and 49.2 to decide whether Phase 49 implementation can remain source/test-only.
- If source-only is safe, record exact implementation boundaries for:
  - display-only resource counters;
  - active guest/authenticated progress scope;
  - Focus Mode behavior and persistence;
  - compact navigation or route chrome reduction;
  - route recovery and Settings/Help/account access;
  - accessibility, safe-area, keyboard visibility, and reduced-motion behavior;
  - focused tests and visual handoff expectations.
- If a protected contract is required, create a narrow addendum under `planning/specs/phase-49/` and stop before implementation.

**Source-only allowed if limited to:**

- reading existing progression/resource state and displaying it;
- local display labels and view models derived from existing state;
- copy/layout/grouping changes around the shell/topbar/route rail;
- session-local Focus Mode behavior, or an existing settings path proven safe by audit;
- compact navigation behavior that preserves all routes, accessible labels, route attention, and gameplay visibility;
- focused tests and visual review.

**Addendum required for:**

- new or modified Supabase tables, columns, RPCs, triggers, policies, grants, or views;
- guest/cloud progress storage schema changes that are not clearly backward-compatible;
- persisted Focus Mode or shell preference that cannot safely fit the existing settings contract;
- new economy mechanics, collectibles, resource earning/spending, marketplace, monetization, or changed costs/reward formulas;
- session leases, forced sign-out, heartbeats, or remote invalidation;
- server-authoritative Daily submissions;
- private Daily or ranked Daily implementation;
- broad mobile shell/top-tab/navigation redesign;
- compact/collapsible side-dock implementation;
- service workers or push infrastructure;
- gameplay-rule, scoring, Daily answer, timeout, forfeit, or Elo changes.

**Potential addendum paths if required:**

- `planning/specs/phase-49/PHASE-49-PROGRESSION-RESOURCE-STORAGE-ADDENDUM-2026-07-06.md`
- `planning/specs/phase-49/PHASE-49-FOCUS-MODE-SETTINGS-ADDENDUM-2026-07-06.md`
- `planning/specs/phase-49/PHASE-49-MOBILE-SHELL-ADDENDUM-2026-07-06.md`

**Verification:**

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

### Stage 49.4 - Progression HUD First Slice

**Authorization:** Source/test-only only if Stage 49.3 approves a source-only HUD slice.

**Goals:**

- Implement the smallest resource visibility improvement selected by Stage 49.3.
- Keep all HUD behavior display-only and derived from existing progression state.
- Reflect the current active guest or authenticated progress scope.
- Avoid stale account data after sign-out or account switch.
- Preserve account/guest sync boundaries and signed-in Solo sync/freshness behavior.
- Add focused tests for view-model derivation, account/guest scope, no storage mutation, and UI rendering.
- Preserve gameplay keyboard visibility, route discoverability, public/private profile boundaries, Daily claim safety, gameplay rules, scoring, and Elo math.

**Likely files/modules if authorized:**

- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/ui/Navigation.tsx`
- `src/account/accountScopedProgress.ts`
- `src/account/Settings.tsx`
- `src/progression/coins.ts`
- `src/progression/experience.ts`
- `src/progression/consumables.ts`
- `src/stats/statsSelectors.ts`
- focused component/model tests.

**Verification focus:**

- Focused progression/resource HUD tests first.
- Then `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, repository hygiene checks, and watched-port cleanup.

**Stop conditions:**

- Requires new resource semantics, storage changes, Supabase/RLS changes, reward/cost changes, public exposure changes, gameplay-rule changes, or Elo changes.

### Stage 49.5 - Focus Mode Or Compact Navigation First Slice

**Authorization:** Source/test-only only if Stage 49.3 approves a source-only Focus Mode or compact navigation slice.

**Goals:**

- Implement the smallest Focus Mode or compact navigation improvement selected by Stage 49.3.
- Preserve all primary routes and route recovery.
- Preserve Settings, account controls, Help, gameplay keyboard, visible board state, route attention, notification safety, and Back-to-top safety.
- Preserve accessible names, focus order, hit targets, reduced-motion behavior, and safe-area compatibility.
- Avoid broad mobile shell redesign and avoid compact side-dock implementation unless a later addendum explicitly authorizes it.
- Add focused component and mobile browser checks where practical.

**Likely files/modules if authorized:**

- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/app/BackToTopButton.tsx`
- `src/ui/Navigation.tsx`
- `src/index.css`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/solo/SoloWorkspace.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `e2e/layout/mobile-scroll.spec.ts`
- focused shell/navigation tests.

**Verification focus:**

- Focused shell/navigation/mobile tests first.
- Focused Playwright mobile layout checks if mobile shell or route layout changes.
- Then the standard implementation-stage gate.

**Stop conditions:**

- Requires broad mobile shell/top-tab/navigation overhaul, compact side-dock implementation, persisted settings contract changes not approved in Stage 49.3, service workers/push, session leases, gameplay-rule changes, or Elo changes.

### Stage 49.6 - Final Hardening, Visual Review, Changelog, And Manual Checklist

**Authorization:** Final hardening and completion documentation only after authorized Stage 49.4/49.5 work is complete.

**Goals:**

- Review Phase 49 stages for regressions, stale docs, privacy gaps, route gaps, visual issues, and cleanup needs.
- Add only narrow final-hardening fixes if required and already within authorized source/test boundaries.
- Run focused regression coverage for:
  - progression/resource HUD display and account scope;
  - Focus Mode or compact navigation behavior if implemented;
  - mobile shell and keyboard visibility;
  - Settings/Profile/account boundaries;
  - public/guest spectator non-regression;
  - Daily/ranked/gameplay/Elo non-regression;
  - Phase 48 profile/multiplayer contracts;
  - Phase 47 mobile/display-boundary repairs;
  - Phase 46 signed-in Solo sync/freshness;
  - prior phase invariants.
- Run local visual handoff review for changed user-visible surfaces and save artifacts only under ignored `test-results/visual-review/phase-49-stage-49-6/`.
- Create `planning/phase-49/CHANGELOG.md`.
- Create `planning/phase-49/REVIEW-CHECKLIST.md` using the local Phase 37-style checklist structure.

**Verification:**

- Focused tests for touched areas.
- `npm run lint`
- `npm run test`
- `npm run test:e2e` if browser shell/navigation behavior changed.
- `npm run test:full` if browser shell/navigation behavior changed or broad confidence is needed.
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

**Stop conditions:**

- Any verification command fails.
- Visual artifacts are staged or tracked.
- Work expands into migrations, deployment/configuration, private Daily, ranked Daily, spectator presence/count/list, service workers/push, session leases, server-authoritative Daily, gameplay-rule changes, Elo changes, broad mobile shell redesign, compact side-dock implementation, theme modernization, Git/GitHub operations, backup workflow execution, secret/private-data exposure, or stable-repository work.

## 5. Cross-Stage Success Criteria

- Phase 48 manual review remains preserved and clean.
- Progression/resource displays are mapped to existing product meaning before implementation.
- Any resource HUD first slice is display-only and account/guest scoped.
- Focus Mode remains UI-shell behavior, not gameplay behavior.
- Focus Mode persistence is source-only only if an existing settings path is proven safe; otherwise it is deferred behind addendum planning.
- Compact navigation remains bounded and accessible.
- Broad mobile shell redesign and compact side-dock implementation remain deferred.
- Theme modernization remains deferred to Phase 50 or later.
- Prior phase invariants remain preserved, especially Daily claim safety, gameplay rules, scoring, and Elo math.
- Final hardening produces a changelog, manual checklist, progress record, visual handoff evidence when applicable, and a later separate Git handoff path.

## 6. Likely File And Module Ownership

High-conflict files should remain single-writer or explicitly sequenced:

- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/app/BackToTopButton.tsx`
- `src/ui/Navigation.tsx`
- `src/index.css`
- `src/account/storageSchema.ts`
- `src/account/accountScopedProgress.ts`
- `src/account/sync.ts`
- `src/account/autoProgressSync.ts`
- `src/account/Settings.tsx`
- `src/progression/`
- `src/stats/`
- `src/history/`
- `src/solo/SoloWorkspace.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `e2e/layout/mobile-scroll.spec.ts`
- progress, changelog, checklist, and roadmap docs.

Recommended sequencing:

1. Coordinator owns Stage 49.0 baseline and all progress/doc updates.
2. Audit stages may be read-only and parallelized only if file ownership is clear.
3. Stage 49.3 decision stays coordinator-owned.
4. Stage 49.4 and 49.5 should be sequenced if they both need `App.tsx`, `LunarSignalStage.tsx`, `Navigation`, or `index.css`.
5. Stage 49.6 final integration and verification stays coordinator-owned.

## 7. Verification Expectations

Planning and decision stages:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- watched-port cleanup when the stage uses browser/resource checks
- `git status --short --branch`

Implementation stages:

- focused tests first for the touched surface;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- focused Playwright/mobile checks when route shell or mobile layout changes;
- repository hygiene checks;
- watched-port cleanup.

Final hardening:

- focused regressions for all Phase 49 changed surfaces;
- `npm run test:e2e` and `npm run test:full` if browser shell/navigation behavior changed;
- visual handoff capture under ignored `test-results/visual-review/phase-49-stage-49-6/`;
- changelog and manual review checklist;
- no Git handoff or backup workflow unless separately authorized.

## 8. Risks

- A resource HUD can imply new economy mechanics if copy and placement are vague.
- Resource counters can leak stale account state if guest/account scope is not guarded.
- Focus Mode can hide route recovery, Settings, Help, or account controls if it removes too much shell chrome.
- Persisting Focus Mode may require a settings/storage contract decision.
- Compact navigation can harm accessibility if labels, focus order, hit targets, or safe-area handling are weak.
- Broad mobile shell redesign and compact side-dock work can overtake the phase unless explicitly deferred.
- Theme modernization can collide with Focus Mode and shell styling if it starts too early.
- Shared shell files are high-conflict and need tight sequencing.

## 9. Open Decisions

- Which existing resources belong in a top-level HUD, if any: level, XP progress, coins, consumables, or a smaller subset?
- Should the first resource HUD be always visible, route-limited, or hidden in Focus Mode?
- Should Focus Mode be session-only at first?
- If Focus Mode is persisted, can it safely use the existing settings schema?
- Should Stage 49.5 implement Focus Mode first, compact navigation first, or defer both after audit?
- Should compact/collapsible side-dock work be explicitly reserved for a later broad mobile shell phase?
- Should theme proposal modernization become Phase 50 only after Phase 49 manual review passes?

## 10. Next Gated Prompt

Use the next prompt to authorize Phase 49 Stage 49.0 only: protected baseline and Phase 48 review intake. Do not authorize progression HUD audit, Focus Mode audit, compact/mobile shell audit, source/runtime implementation, test implementation, migrations, storage changes, deployment/configuration, Git/GitHub operations, backup workflow execution, private Daily/ranked Daily implementation, spectator presence/count/list, service workers/push, strict session leases, server-authoritative Daily, broad mobile shell redesign, compact side-dock implementation, theme modernization, gameplay-rule changes, Elo changes, or stable-repository work.
