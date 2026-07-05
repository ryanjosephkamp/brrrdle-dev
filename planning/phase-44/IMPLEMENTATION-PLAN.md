# Phase 44 Implementation Plan

**Status**: Draft implementation plan for review only.
**Phase**: Phase 44 - Account-Scoped Local State Isolation And Phase 43 Manual Review Follow-Up.
**Date**: 2026-07-04.
**Repository**: `brrrdle-dev`.

## Authority

This implementation plan is governed by:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `planning/phase-44/PHASE-44-MANUAL-REVIEW-INTAKE-AND-ROUTING-2026-07-04.md`.
7. `planning/phase-44/PLANNING-BRIEF.md`.
8. `planning/specs/phase-44/PHASE-44-ACCOUNT-SCOPED-LOCAL-STATE-AND-MANUAL-REVIEW-FOLLOW-UP-SPEC-2026-07-04.md`.
9. Current roadmap, testing, progress, and workflow documents.

This plan does not authorize implementation. It does not authorize source/runtime edits, test edits, migrations, Supabase or Vercel configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, Elo changes, local Codex skill changes, secret printing, private data exposure, local artifact exposure, running the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

## Current Baseline

- Phase 43 is complete, backed up, merged, branch-cleaned, and manually reviewed with follow-up issues.
- Expected local and remote `main`: `173a82951927d134ae4f60e0250444a41916cab5`.
- The user-updated Phase 43 manual review checklist at `planning/phase-43/REVIEW-CHECKLIST.md` must be preserved.
- Phase 44 planning brief exists at `planning/phase-44/PLANNING-BRIEF.md`.
- Unified Phase 44 specification exists at `planning/specs/phase-44/PHASE-44-ACCOUNT-SCOPED-LOCAL-STATE-AND-MANUAL-REVIEW-FOLLOW-UP-SPEC-2026-07-04.md`.
- Progress exists through `progress/PROGRESS-STEP-392.md`.

## Implementation Principles

- Account and guest boundaries come first. UI polish must not hide or complicate state-boundary evidence.
- Reproduce before repair. Every reported bleed path should be classified before Stage 44.2 changes behavior.
- Keep each stage narrow and reviewable. If a stage proves it needs broader storage, migration, or RLS work, stop and route to an addendum gate.
- Preserve valid guest play, valid signed-in account play, and explicitly authorized guest-to-account transfer behavior.
- Preserve Phase 43 ranked queue fairness, Phase 42 stats/dashboard/help contracts, Phase 41 multiplayer reliability, Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, Phase 38 spectator boundaries, Daily claim safety, gameplay rules, and Elo math.
- Use focused tests at each implementation stage, then run full gates at final hardening.

## Stage 44.0 - Protected Baseline And Intake Confirmation

**Purpose**: Establish a clean protected baseline before audit or implementation begins.

**Authorized work**:

- Read governance, Phase 44 planning/spec/implementation materials, completed Phase 43 evidence, current progress records, testing docs, `agents.md`, `memory.md`, and `package.json`.
- Confirm repository path, branch, status, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Preserve `planning/phase-43/REVIEW-CHECKLIST.md`.
- Record current uncommitted Phase 44 planning/spec/progress artifacts.
- Create `progress/PROGRESS-STEP-394.md` and append the matching 12-column `progress/PROGRESS.csv` row.
- Run watched-port/process/resource checks before and after the baseline verification gate.

**Verification**:

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

**Stop conditions**:

- Any verification failure.
- Repo path or remote mismatch.
- Any indication the stable `brrrdle` repository would be touched.
- Any forbidden artifact or credential-shaped hit.

## Stage 44.1 - Account And Guest State Boundary Audit

**Purpose**: Reproduce and classify the account/guest bleed issues before source repair.

**Authorized work**:

- Audit `guestStorage`, storage schema, sync, guest transfer, sign-in/sign-out handling, route hydration, local view state, and persistence tests.
- Reproduce or classify:
  - signed-in Practice Solo OG/GO state remaining visible after sign-out;
  - guest Practice Solo OG/GO overwriting signed-in progress after sign-in;
  - guest Daily Solo OG/GO carrying into signed-in Daily state;
  - History, leaderboard/rating summaries, Active Multiplayer, Settings, and Stats sign-out behavior;
  - account sync and guest-to-account transfer behavior.
- Use one local dev server only if browser reproduction needs it, then stop it.
- Decide whether Stage 44.2 can remain source/test-only or needs storage-contract addendum planning.
- Create `progress/PROGRESS-STEP-395.md` and matching CSV row.

**Not authorized**:

- Source/runtime fixes.
- Test implementation.
- Storage schema changes.
- Supabase migration or RLS changes.

**Outputs**:

- Reproduction/classification matrix.
- Root-cause hypothesis by surface.
- Stage 44.2 source-only versus addendum-gated decision.

## Stage 44.2 - Account-Scoped Local State Repair

**Purpose**: Implement the smallest safe source/test repair for account-scoped and guest-scoped local state isolation.

**Authorized work if Stage 44.1 permits source-only repair**:

- Separate signed-in account hydration from signed-out guest hydration where current behavior permits state bleed.
- Prevent silent guest progress overwrite of signed-in account progress unless an explicit reviewed transfer path authorizes the merge.
- Ensure sign-out clears or rehydrates account-owned visible surfaces into guest-safe state.
- Preserve local guest progress as a first-class play mode.
- Preserve account sync, Daily determinism, Daily claim safety, Practice resume behavior, history integrity, settings expectations, stats integrity, multiplayer resume safety, and public/private profile boundaries.
- Add focused unit/component tests and, where practical, browser/E2E checks for sign-in/sign-out transitions.
- Create `progress/PROGRESS-STEP-396.md` and matching CSV row.

**Storage-contract addendum gate**:

Stop and create a later documentation-only addendum prompt if the repair requires:

- destructive local cleanup;
- guest-progress schema version changes;
- account-specific local storage key migration;
- changed guest-to-account transfer semantics;
- cloud progress contract changes;
- any Supabase migration or RLS change.

**Likely files**:

- `src/account/guestStorage.ts`
- `src/account/storageSchema.ts`
- `src/account/sync.ts`
- `src/account/guestTransfer.ts`
- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/solo/SoloWorkspace.tsx`
- `src/history/HistoryWorkspace.tsx`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/stats/StatsDashboard.tsx`
- related focused tests and E2E fixtures

## Stage 44.3 - Boundary Regression, Private Request Eligibility, And Ranked Queue Classification

**Purpose**: Broaden regression coverage after account isolation, then handle the two reported multiplayer follow-ups without mixing them into the storage repair.

**Authorized work**:

- Add focused account-boundary regression tests for Daily, Practice, History, leaderboard, Active Multiplayer, Settings, Stats, sync, and route state.
- Audit and repair the private Practice request eligibility flow if the issue is source-only, stale profile state, wrong current account, misleading error handling, or UI routing.
- Confirm unranked private Practice requests do not require established ranked Elo.
- Reproduce or classify the ranked Practice third-player fairness concern with same-settings compatibility evidence.
- Create `progress/PROGRESS-STEP-397.md` and matching CSV row.

**Migration/RLS addendum gates**:

Stop and route to addendum planning if:

- the private Practice request RPC incorrectly requires ranked eligibility or misclassifies active public profiles;
- ranked queue fairness fails inside the trusted RPC contract;
- direct grants, RLS policy behavior, or database projection fields need repair.

**Constraints**:

- No Elo changes.
- No gameplay-rule changes.
- No public/guest spectator contract changes.
- No private matchmaking privacy weakening.

## Stage 44.4 - Small Manual Review UI Follow-Ups

**Purpose**: Apply bounded source-only UI follow-ups after reliability work is stable.

**Authorized work**:

- Make Email + password the first/default sign-in method and Magic link the second option.
- Remove global header chips for `READY`, `DAILY`, `PRACTICE`, `GO CHAIN`, and `BANKS` where safe.
- Move Public Site Stats lower on Stats and place its header/description outside the public stats card, matching Local Stats treatment.
- Reduce Help to a simple transitional or under-construction placeholder if still appropriate.
- Add focused route/component tests.
- Create `progress/PROGRESS-STEP-398.md` and matching CSV row.

**Constraints**:

- Source/test-only.
- Preserve Phase 43 shell/Home cleanup.
- Preserve Phase 42 stats/dashboard/help contracts.
- Do not implement configurable widgets, profile simplification, notification redesign, spectator previews, or broad mobile shell work.

## Stage 44.5 - Gameplay Keyboard Centering Follow-Up

**Purpose**: Repair Solo gameplay keyboard centering after the first valid guess if bounded and source-only.

**Authorized work**:

- Audit current auto-centering, mobile scroll, back-to-top, and gameplay viewport behavior.
- Implement the smallest safe centering/spacing adjustment.
- Add focused tests or browser checks that protect Phase 39 mobile scroll smoothness and Phase 43 back-to-top behavior.
- Create `progress/PROGRESS-STEP-399.md` and matching CSV row.

**Constraints**:

- No gameplay-rule changes.
- No scoring, Hard Mode, validation, answer, seed, Daily claim, or Elo changes.
- Preserve spectator read-only boundaries.

## Stage 44.6 - Final Hardening, Visual Review, Changelog, And Manual Checklist

**Purpose**: Close Phase 44 with regression review, visual evidence, completion docs, and a manual checklist.

**Authorized work**:

- Review all Phase 44 stages for regressions, stale docs, privacy gaps, route gaps, visual issues, and cleanup needs.
- Add only narrow final-hardening fixes if required.
- Run focused regression coverage for account/guest boundaries, private request eligibility, ranked queue classification, sign-in order, header chip removal, Stats placement, Help placeholder, keyboard centering, public/guest spectator non-regression, Daily/ranked/gameplay/Elo non-regression, Phase 42 stats/dashboard/help contracts, Phase 41 multiplayer reliability, and Phase 39 mobile scroll preservation.
- Run the local visual handoff review gate, saving artifacts only under ignored `test-results/visual-review/phase-44-stage-44-6/`.
- Create `planning/phase-44/CHANGELOG.md`.
- Create `planning/phase-44/REVIEW-CHECKLIST.md` using the local Phase 37-style checklist structure.
- Create `progress/PROGRESS-STEP-400.md` and matching CSV row.

**Final verification**:

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
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

**Stop**:

- Halt before Git handoff preparation. Git handoff preparation and backup workflow require later explicit authorization.

## Success Criteria

- Signed-in progress, History, leaderboard summaries, Active Multiplayer projections, Settings, and Stats do not remain visible to signed-out guests unless explicitly guest-owned.
- Guest progress does not silently overwrite signed-in account progress.
- Daily Solo OG/GO and Practice Solo OG/GO account boundaries are verified.
- Account sync and guest-to-account transfer behavior remain intentional, reviewable, and safe.
- Private Practice request eligibility is source-fixed or routed to a migration/RLS addendum.
- Ranked Practice third-player fairness is classified or routed to a migration/RLS addendum.
- Small UI follow-ups are completed only after the account-boundary repair is stable.
- Final hardening produces changelog, manual checklist, visual evidence, and passing verification.

## Verification Cadence

- Stage 44.0 uses the protected baseline gate before any audit begins.
- Stage 44.1 uses read-only checks and browser/resource cleanup only.
- Stages 44.2 through 44.5 run focused tests first, then lint, full unit/component tests, build, API typecheck, diff/CSV/secret/artifact/resource checks, and focused E2E where practical or where browser evidence is required.
- Stage 44.6 runs the final full gate including `npm run test:e2e` and `npm run test:full`.

## Stop Conditions

Stop and record the exact non-secret failure in progress if:

- the repo is not exactly `brrrdle-dev`;
- local or remote baseline is unexpected;
- the stable `brrrdle` repository would be touched;
- verification fails;
- a real credential-like value or forbidden artifact is found;
- a source-only stage proves it needs storage-contract, migration, or RLS repair;
- account-boundary repair risks destructive local state loss without a reviewed addendum;
- ranked queue repair would change Elo, trusted settlement, or gameplay rules;
- private matchmaking repair would expose raw auth ids, emails, profile-private fields, answers, seeds, tokens, sessions, queue internals, rating internals, or local artifacts.

## Risks

- The current guest progress payload spans many domains, so a naive sign-out cleanup could erase valid guest state or hide valid account data.
- Sync conflict resolution currently merges broad local and cloud payloads, so overwrite prevention may need careful source design or a storage-contract addendum.
- Daily Solo account boundaries are more sensitive than Practice because Daily claim integrity and deterministic date keys must remain intact.
- Private Practice request eligibility may be source-side account/profile staleness, but it may also expose a server predicate issue that requires migration/RLS review.
- Ranked queue third-player fairness can be misdiagnosed unless compatibility filters and expiration/cancellation states are captured.
- UI follow-ups are small, but they touch common shell/auth/stats/help surfaces and should not run before account-boundary evidence is stable.

## Open Decisions

- Whether account isolation can be repaired source-only or needs a storage-contract addendum.
- Whether guest-to-account transfer should remain automatic, become explicit, or be preserved with stricter overwrite guards.
- Whether sign-out should immediately rehydrate a separate guest snapshot or reset specific account-owned surfaces into empty guest defaults.
- Whether private Practice request eligibility is a source/UI freshness issue or a database predicate issue.
- Whether the ranked queue third-player fairness issue reproduces with fully compatible waiting players after the Phase 43 migration.
- Whether Help should become a minimal placeholder in Stage 44.4 or retain a reduced route guide until richer tutorial work is scheduled later.

## Next Gated Action

The next safe action is Phase 44 Stage 44.0 protected baseline and intake confirmation only. Stage 44.0 must not begin the account-boundary audit or any implementation.
