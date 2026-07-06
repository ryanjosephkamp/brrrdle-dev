# Phase 50 Detailed Implementation Plan

**Status**: Detailed implementation plan for review only.
**Date**: 2026-07-06.
**Repository**: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Stable repository boundary**: Do not touch the original stable `brrrdle` repository.
**Baseline**: local `main` and `origin/main` observed at `cc878c6a109406b56f2a9195be6114c1ccf02259`.
**Progress id**: `458`.

This plan does not authorize source/runtime implementation. It prepares the next gated execution prompt for Phase 50 Stage 50.0 through Stage 50.2 only.

## 1. Authorization

Authorized by the current prompt:

- Read the Phase 50 handoff and prompt artifacts.
- Read current repo governance, planning, testing, and progress records.
- Inspect current source and tests as needed for plan realism.
- Create this detailed implementation plan under `planning/phase-50/`.
- Update `progress/PROGRESS.csv`.
- Create `progress/PROGRESS-STEP-458.md`.
- Create one ignored local prompt artifact for the next gated execution pass.

Not authorized:

- Source/runtime implementation.
- Test implementation.
- App behavior changes.
- Migrations, RLS changes, Supabase schema changes, or storage schema changes.
- Vercel/Supabase configuration changes.
- Dev server/browser E2E execution.
- Git staging, commits, branches, pushes, PRs, merges, releases, deployments, or backup workflow execution.
- Stable `brrrdle` repository work.

## 2. Current Baseline And Dirty Tree

Confirmed before plan creation:

- Working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Local `main`: `cc878c6a109406b56f2a9195be6114c1ccf02259`.
- `origin/main`: `cc878c6a109406b56f2a9195be6114c1ccf02259`.
- Current branch status: `main...origin/main`.

Expected planning/progress dirty tree to preserve:

- `.gitignore`
- `planning/README.md`
- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `planning/phase-49/REVIEW-CHECKLIST.md`
- `planning/FUTURE-WORKFLOW-TIMELINE.md`
- `planning/phase-50/PLANNING-BRIEF.md`
- `planning/specs/phase-50/PHASE-50-SOLO-COMPLETION-PERSISTENCE-AND-CURRENT-SURFACE-CONVENIENCE-SPEC-2026-07-06.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-453.md` through `progress/PROGRESS-STEP-457.md`
- ignored local prompt artifacts under `prompt-packages/`

Do not revert or overwrite these without explicit user approval.

## 3. Authority Stack

Use this authority order during Phase 50:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `BRRRDLE-OVERVIEW.md`.
5. `AGENT-IMPLEMENTATION-PLAN.md`.
6. `planning/IMPLEMENTATION-PLAN.md`.
7. `planning/phase-50/PLANNING-BRIEF.md`.
8. `planning/specs/phase-50/PHASE-50-SOLO-COMPLETION-PERSISTENCE-AND-CURRENT-SURFACE-CONVENIENCE-SPEC-2026-07-06.md`.
9. `planning/testing/TESTING-SUITE.md`.
10. `agents.md` and `memory.md` as supporting coordination notes only.
11. Existing code, only when it does not conflict with higher-authority sources.

`agents.md` and repo `memory.md` contain older Phase 23-era current-phase notes. Treat them as stale where they conflict with current Phase 50 progress records.

## 4. Source Audit Summary

This planning pass inspected current source and tests without editing them.

### Core Solo Completion Surfaces

Likely primary files:

- `src/app/App.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/account/resumeSlot.ts`
- `src/account/guestStorage.ts`
- `src/app/browserNavigationHistory.ts`

Observed current behavior:

- `OgGame` and `GoGame` call `onResumeCapture` with serialized session state on session changes.
- `App.tsx` `handleResumeCapture` persists a resume slot only while `isCaptureInProgress(capture)` is true.
- When a captured session is no longer in progress, `handleResumeCapture` deletes the matching resume slot.
- `resumeSlot.ts` intentionally defines resume slots as in-progress only. It rejects solved OG sessions, lost OG sessions, fully won GO chains, and lost GO chains during normalization.
- `recordCompletedGame` in `guestStorage.ts` is idempotent through `completedGameIds`. A repeated `gameId` returns the current progress object unchanged.
- `recordCompletedGame` also deletes the matching resume slot for the completed game.
- `browserNavigationHistory.ts` only keeps a selected Solo game key if a matching resume slot exists; stale Solo selections resolve to the active Solo list.

Planning implication:

- The missing terminal UI is likely related to completion deleting the in-progress resume-slot evidence while browser navigation restoration still treats selected Solo state as resume-slot-dependent.
- The implementation must not simply force terminal sessions into existing resume slots without a deliberate contract decision.

### Existing Reward Idempotence Coverage

Useful existing tests:

- `src/account/guestStorage.test.ts` verifies completed games are recorded once and duplicate `gameId` calls return the same progress object.
- `src/account/guestStorage.test.ts` verifies completed games clear only the matching resume slot.
- `src/account/resumeSlot.test.ts` verifies finished sessions are not resumable.
- `src/account/accountScopedProgress.test.ts` and `src/account/autoProgressSync.test.ts` cover account-scoped progress and authenticated sync guards.

Planning implication:

- Stage 50.4 should add tests around the chosen completion-restoration contract without weakening the existing duplicate reward guard.

### Existing Solo Browser Coverage

Useful E2E files:

- `e2e/gameplay/solo-practice-go.spec.ts`
- `e2e/gameplay/solo-daily-go.spec.ts`
- `e2e/fixtures/gameActions.ts`
- `e2e/layout/mobile-scroll.spec.ts`

Observed gap:

- Current Solo GO E2E solves puzzle 1 and verifies carry-over into puzzle 2.
- There is no obvious dedicated Solo OG browser solve spec.
- There is no obvious dedicated completed Solo Back/Forward terminal-state E2E.

Planning implication:

- Add or extend a focused Solo completion re-entry E2E during Stage 50.3 or 50.4 after reproduction.

### Profile/Settings Convenience Surfaces

Likely primary files:

- `src/account/ProfilePanel.tsx`
- `src/account/ProfilePanel.test.tsx`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`
- `src/app/App.tsx`

Observed current behavior:

- `App.tsx` already passes `handleSignOut` into `ProfilePanel`.
- `ProfilePanel` passes `onSignOut` into `ProfileEditor`.
- `ProfileEditor` currently does not destructure or render `onSignOut`.
- `ProfilePanel.test.tsx` explicitly expects no `Sign out` button.
- Settings remains the account-management home and already renders Sign out plus an `Open Profile tab` action.

Planning implication:

- Stage 50.6 is plausibly small and source-only if it only renders an account action in Profile using the existing handler and keeps it visually separate from Save/Cancel.
- Tests must be updated intentionally, not weakened.

### Progression HUD And Stats Navigation Surfaces

Likely primary files:

- `src/app/ProgressionHud.tsx`
- `src/app/ProgressionHud.test.tsx`
- `src/app/progressionHudViewModel.ts`
- `src/app/LunarSignalStage.tsx`
- `src/app/App.tsx`
- `src/stats/StatsDashboard.tsx`

Observed current behavior:

- `ProgressionHud` is display-only and takes only `progression`.
- `LunarSignalStage` receives `progressionHud` as a rendered node and has `onNavigate`.
- App renders Stats when route id is `stats`.

Planning implication:

- Stage 50.7 is plausibly small if App passes an `onOpenStats` callback or wraps the HUD in an accessible control without changing HUD data ownership.
- Do not make HUD stateful or public-facing.

## 5. Reproduction Matrix

Stage 50.1 should reproduce or characterize all four user-reported paths.

| Case | Setup | Completion | Re-entry Action | Expected Failure Before Fix | Expected After Fix |
| --- | --- | --- | --- | --- | --- |
| Daily OG | Deterministic current Daily OG | Submit final winning answer | Route away/back and browser Back/Forward | Final winning row or completed screen may disappear | Final winning row and completed screen remain visible |
| Daily GO | Deterministic current Daily GO | Complete final GO puzzle | Route away/back and browser Back/Forward | Final solved-chain terminal state may disappear | Final solved-chain terminal state remains visible |
| Practice OG | Practice Solo OG | Submit final winning answer | Route away/back and browser Back/Forward | Final winning row or completed screen may disappear | Final winning row and completed screen remain visible |
| Practice GO | Practice Solo GO | Complete final GO chain | Route away/back and browser Back/Forward | Final solved-chain terminal state may disappear | Final solved-chain terminal state remains visible |

Additional characterization:

- Confirm incorrect valid guesses still persist.
- Confirm intermediate GO solved puzzles still persist.
- Confirm XP, coins, levels, history, stats, and completed ids do not double-award during repeated terminal render or re-entry.
- Check guest scope first.
- Check authenticated scope only if source audit suggests account sync participates in the bug.

Recommended reproduction order:

1. Practice OG, because it avoids fixed Daily date and GO chain length complexity.
2. Practice GO, because it tests final-chain terminal evidence.
3. Daily OG under deterministic browser date.
4. Daily GO under deterministic browser date.

## 6. Stage Sequence

### Stage 50.0 - Protected Baseline And Execution Setup

Purpose:

- Confirm target repo, branch, baseline, dirty tree, ports, and prompt boundaries before any browser work.

Owned files/modules:

- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-459.md` or next available id
- read-only repo docs and source

Forbidden:

- Source/runtime changes.
- Test implementation.
- Migrations.
- Git/GitHub actions.
- Stable `brrrdle` repository.

Verification:

- `git status --short --branch`
- local/remote `main` hash check
- watched-port check for `5173`, `5174`, `3000`, and `4173`
- lightweight diff/CSV/scan checks if docs are updated

Exit:

- Baseline recorded.
- Reproduction plan confirmed.
- Stop if repo state conflicts with handoff/spec.

### Stage 50.1 - Solo Completion-State Audit And Reproduction

Purpose:

- Prove or characterize the user-reported completion-state loss before source edits.

Owned files/modules:

- read-only source/test inspection
- optional ignored local evidence under `test-results/phase-50/reproduction/` if browser screenshots or notes are generated
- `progress/PROGRESS.csv`
- matching progress report

Forbidden:

- Source fixes.
- Test file changes.
- Migration/storage contract changes.
- App behavior changes.

Actions:

- Start one Vite dev server only if browser reproduction is needed.
- Use one browser context for guest reproduction unless authenticated behavior is necessary.
- Reproduce Practice OG and Practice GO first.
- Reproduce Daily OG and Daily GO with deterministic time if feasible.
- Record exact selectors, visible text, final row evidence, and progression totals.

Verification:

- Focused reproduction evidence.
- Resource/port cleanup if a dev server/browser was started.
- `git diff --check`
- CSV shape
- non-printing/credential scan
- ignored-artifact check
- `git status --short --branch`

Exit:

- Bug reproduced or clearly characterized.
- Root-cause hypothesis recorded.
- Stop if the observed bug differs materially from the user report.

### Stage 50.2 - Completed-State Contract Decision

Purpose:

- Decide the smallest safe contract for preserving terminal Solo UI evidence.

Candidate paths:

1. Route/view-state restoration fix.
2. Game-component terminal-state hydration fix.
3. Separate completed-session evidence cache.
4. Small extension to progress storage.

Preferred constraints:

- Keep existing resume slots as in-progress only unless evidence proves otherwise.
- Avoid migrations and Supabase/RLS changes.
- Avoid broad browser route rewrite.
- Keep `completedGameIds` authoritative for reward idempotence.
- Do not replay `recordCompletedGame` as a terminal-state restore mechanism.

Owned files/modules:

- Planning/report artifacts only.
- Read-only source inspection.

Forbidden:

- Source/runtime implementation.
- Storage shape changes.
- Test implementation.

Exit:

- Contract decision recorded.
- If source-only path is safe, prepare Stage 50.3 implementation prompt.
- If not source-only, create a narrow addendum prompt and stop.

### Stage 50.3 - Core Solo Completion Persistence Repair

Purpose:

- Implement the smallest source/test fix after Stage 50.2 approval.

Likely owned files:

- `src/app/App.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/app/browserNavigationHistory.ts`
- possibly `src/account/resumeSlot.ts` only if the contract explicitly allows it
- focused tests and E2E files

Forbidden:

- Profile/HUD convenience changes.
- Reward formula changes.
- Supabase migrations.
- Daily Multiplayer changes.
- Broad route rewrite.

Expected behavior:

- Completed Daily OG/GO and Practice OG/GO terminal UI survives route re-entry and browser Back/Forward.
- Practice new puzzle/new chain remains explicit.
- Daily next-cycle behavior remains unchanged.
- Incorrect guesses and intermediate GO solved puzzles remain preserved.

Focused verification:

- Focused Vitest files for touched source.
- Focused Solo browser E2E for completion re-entry.

### Stage 50.4 - Reward Idempotence Regression Hardening

Purpose:

- Prove the Stage 50.3 fix does not double-award.

Likely owned files:

- `src/account/guestStorage.test.ts`
- `src/account/resumeSlot.test.ts`
- `src/app/browserNavigationHistory.test.ts`
- app/game tests or E2E touched in Stage 50.3

Assertions:

- Re-rendering completed terminal state does not add a second history row.
- Re-entry does not increase XP/coins twice.
- Duplicate `gameId` behavior remains unchanged.
- Authenticated sync path is not used to duplicate guest progress.

Exit:

- Idempotence tests pass.
- Stop if reward formula or storage-contract changes seem required.

### Stage 50.5 - Optional Profile/HUD Audit Gate

Purpose:

- Decide whether optional convenience stages stay in Phase 50.

Audit questions:

- Can Profile Sign out use the existing `handleSignOut` safely?
- Can Profile-to-Settings navigation use existing route handlers without scroll/route rewrite?
- Can HUD-to-Stats navigation use existing `stats` route without changing HUD display values?

Exit:

- Include Stage 50.6 and/or Stage 50.7 only if source-only and low-risk.
- Defer either stage if it touches account contracts, public profile privacy, storage, or shell redesign.

### Stage 50.6 - Optional Profile Sign Out And Profile-To-Settings Convenience

Allowed only after Stage 50.5.

Likely owned files:

- `src/account/ProfilePanel.tsx`
- `src/account/ProfilePanel.test.tsx`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`
- `src/app/App.tsx` only for route handoff if needed

Expected behavior:

- Profile exposes a clearly separated Sign out action for signed-in users.
- Profile points to Settings account management when applicable.
- Save/Cancel remains profile-editing-only.
- Existing sign-out busy/error behavior is reused.

Forbidden:

- Account deletion.
- Profile privacy controls.
- Supabase schema/storage changes.
- Public profile redesign.

### Stage 50.7 - Optional Progression HUD To Stats Navigation

Allowed only after Stage 50.5.

Likely owned files:

- `src/app/ProgressionHud.tsx`
- `src/app/ProgressionHud.test.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/app/LunarSignalStage.test.tsx`
- `src/app/App.tsx`

Expected behavior:

- HUD stays display-only.
- Clicking or activating the HUD routes to `stats`.
- Keyboard and screen-reader access are preserved.
- HUD values remain active-scope private values.

Forbidden:

- Stats redesign.
- Public exposure of resource values.
- Progression/reward formula changes.
- Broad shell redesign.

### Stage 50.8 - Future Routing Documentation

Purpose:

- Keep larger user ideas visible without implementing them.

Likely owned files:

- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `planning/FUTURE-WORKFLOW-TIMELINE.md`
- possibly `planning/phase-50/CHANGELOG.md`

Route only:

- deeper Focus Mode
- persistent Focus settings
- player-chip popover
- broader profile simplification
- private Practice expansion
- cloud/multiplayer stats
- Live/profile/Elo metadata
- broad shell redesign
- side-dock
- Daily button consolidation
- UI/theme intake and theme work

### Stage 50.9 - Final Hardening, Visual Review, Changelog, Checklist, Handoff

Purpose:

- Close Phase 50 implementation for manual review.

Likely owned files:

- `planning/phase-50/CHANGELOG.md`
- `planning/phase-50/REVIEW-CHECKLIST.md`
- `progress/PROGRESS.csv`
- matching final progress report
- ignored visual artifacts under `test-results/visual-review/phase-50-stage-50-9/` if authorized/needed

Expected final gate:

- Focused changed-area tests.
- `npm run lint`
- `npm run test`
- targeted `npm run test:e2e:solo` or focused Playwright files when browser flows changed.
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- CSV shape
- non-printing/credential scan
- ignored-artifact check
- watched-port/process cleanup check if browser/dev server used
- `git status --short --branch`

No Git/GitHub backup happens unless a later prompt explicitly authorizes it.

## 7. File Ownership And Conflict Plan

Single-writer surfaces during implementation:

- `src/app/App.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/account/`
- `src/app/browserNavigationHistory.ts`
- `src/app/LunarSignalStage.tsx`
- progress and planning files

Recommended sequencing:

1. Solo completion core lane first.
2. Reward idempotence hardening immediately after core fix.
3. Optional Profile/HUD audit.
4. Optional convenience stages, one at a time.
5. Routing docs and final hardening.

Do not parallelize two writers across `src/app/` and `src/account/` without a new integration plan.

## 8. Browser Verification Plan

Use browser checks only in the future execution prompt, not this planning pass.

Recommended checks:

- Practice OG win, route away/back, browser Back/Forward, terminal state visible.
- Practice GO final win, route away/back, browser Back/Forward, terminal state visible.
- Daily OG win under deterministic date, route away/back, browser Back/Forward, terminal state visible.
- Daily GO final win under deterministic date, route away/back, browser Back/Forward, terminal state visible.
- After re-entry, progression totals are unchanged.
- Optional Profile Sign out action visible and separated, if implemented.
- Optional HUD-to-Stats navigation works, if implemented.

Resource rules:

- One Vite dev server.
- Minimal browser contexts.
- Close contexts and stop owned server before final report.
- Do not commit screenshots, traces, videos, auth state, or `test-results/`.

## 9. Reward Idempotence Proof Plan

Stage 50.4 should prove:

- Duplicate `recordCompletedGame` for the same `gameId` remains a no-op.
- Completion-state restoration does not call `recordCompletedGame` as a side effect unless the idempotent guard is already sufficient and tested.
- A restored completed UI does not add history rows.
- A restored completed UI does not add XP/coins.
- Practice seed advancement only happens on explicit new-game/new-chain action.
- Daily completion remains date-scoped.
- Authenticated progress sync does not transfer guest terminal state into the wrong active scope.

## 10. Stop Conditions

Stop and report if:

- The working directory is not `brrrdle-dev`.
- The stable `brrrdle` repository would be touched.
- `main` or `origin/main` differs unexpectedly and the prompt depends on the baseline.
- Any source-only stage appears to require a persisted schema, migration, RLS, or Supabase contract change.
- The bug cannot be reproduced or differs materially from the user report.
- A fix appears to require reward formula, Daily claim, gameplay rule, Elo, or broad route/shell changes.
- Optional Profile/HUD work expands beyond local source-only UI.
- Verification cannot run or browser resources cannot be cleaned up.

## 11. Expected Artifacts By Phase End

Implementation artifacts, after future authorization:

- `planning/phase-50/CHANGELOG.md`
- `planning/phase-50/REVIEW-CHECKLIST.md`
- one or more `progress/PROGRESS-STEP-*.md`
- updated `progress/PROGRESS.csv`
- optional ignored visual review artifacts under `test-results/visual-review/phase-50-stage-50-9/`
- a next prompt package for Git handoff preparation only after user review and explicit authorization

Do not create commits, PRs, merges, releases, or deployments as part of Phase 50 implementation unless separately authorized.

## 12. Next Gated Prompt Recommendation

Next safe prompt artifact:

`prompt-packages/phase-50/PHASE-50-STAGE-50-0-50-2-BASELINE-REPRODUCTION-CONTRACT-PROMPT-2026-07-06.md`

This prompt should authorize only:

- Stage 50.0 protected baseline,
- Stage 50.1 read-only reproduction/audit,
- Stage 50.2 completed-state contract decision,
- progress updates,
- lightweight planning/reproduction verification.

It should not authorize:

- source/runtime fixes,
- test implementation,
- migrations,
- storage schema changes,
- optional Profile/HUD implementation,
- Git/GitHub actions,
- stable `brrrdle` work.

After Stage 50.2, the next prompt should be chosen based on evidence:

- If source-only core repair is safe, create a Stage 50.3-50.4 implementation prompt.
- If a storage/reward/Supabase contract is needed, create an addendum prompt and stop.
