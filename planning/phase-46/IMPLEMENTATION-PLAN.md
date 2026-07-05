# Phase 46 Implementation Plan

**Status:** Drafted for review. Do not execute until the next stage is explicitly authorized.
**Phase:** Phase 46 - Solo Sync Integrity and Manual Review Follow-Up
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Stable repository boundary:** Do not touch the original stable `brrrdle` repository.
**Date:** 2026-07-05

## 1. Authority

This plan implements the staged execution path for:

- `planning/phase-46/PLANNING-BRIEF.md`
- `planning/specs/phase-46/PHASE-46-SOLO-SYNC-INTEGRITY-AND-MANUAL-REVIEW-FOLLOW-UP-SPEC-2026-07-05.md`

Higher-authority sources remain, in order:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. Phase 46 planning brief and unified specification.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `planning/testing/TESTING-SUITE.md`.
7. Supporting repo docs, `agents.md`, and `memory.md`.

This document is planning only. It does not authorize implementation, tests, migrations, deployment, Git/GitHub operations, backup workflow execution, gameplay-rule changes, Elo changes, or stable-repository work.

## 2. Current Baseline

- Expected local `main` and `origin/main`: `aef8dba063e57cd5381852a66b9a0006fe52bf39`.
- Phase 45 completed, backed up, merged, branch-cleaned, and manually reviewed.
- Phase 45 manual review passed with follow-up notes around:
  - signed-in Solo Daily/Practice automatic sync and anti-cheat risk;
  - Solo Overview active-game `Select` button purpose;
  - mobile Solo pre-guess keyboard visibility.
- Preserve the user-updated checklist at `planning/phase-45/REVIEW-CHECKLIST.md`.
- Phase 46 planning brief and unified spec are already created and tracked under progress steps 412 and 413.

## 3. Implementation Principles

- Keep Phase 46 narrow: solve freshness and follow-up UX friction without opening broad redesign work.
- Prefer source-only sync/freshness repairs if existing `progress_snapshots` can safely support them.
- Treat any required new table, RPC, RLS policy, storage schema migration, destructive local cleanup, or changed cloud contract as an addendum gate.
- Do not assume one-active-session enforcement. Evaluate it as a possible later session-lease/security feature only if evidence proves automatic signed-in Solo freshness is insufficient.
- Preserve Phase 45 guest/account isolation: no implicit guest-to-account Solo progress transfer and no signed-in progress leaking to guest state after sign-out.
- Preserve Daily claim safety, gameplay rules, Elo math, ranked queue behavior, multiplayer contracts, public/guest spectator boundaries, and prior phase wins.
- Use real browser or E2E reproduction only when it materially improves confidence and can be done without exposing secrets or local session artifacts.

## 4. Stage Breakdown

### Stage 46.0 - Protected Baseline and Manual-Review Intake Confirmation

**Authorization:** Baseline only.

**Goals:**

- Confirm repo state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the stable `brrrdle` repository is not in use.
- Read required governance, Phase 46 planning/spec/implementation materials, Phase 45 completion evidence, package/test surfaces, and current progress.
- Preserve `planning/phase-45/REVIEW-CHECKLIST.md`.
- Record existing uncommitted Phase 46 planning/spec/progress artifacts.
- Create the Stage 46.0 progress report and matching 12-column CSV row, likely progress ID `415`.
- Run watched-port/process/resource checks before and after baseline verification for ports `5173`, `5174`, `3000`, and `4173`.

**Verification:**

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check with `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

**Stop conditions:**

- Any baseline verification failure.
- Repo path is not exactly `brrrdle-dev`.
- Local or remote `main` does not match the expected baseline without a clear reviewed reason.
- Stable repository would be touched.

### Stage 46.1 - Solo Sync/Session Freshness Audit and Reproduction

**Authorization:** Read-only audit.

**Goals:**

- Audit signed-in Solo Daily/Practice sync behavior across:
  - local active progress;
  - `progress_snapshots`;
  - manual sync;
  - sign-in hydration;
  - sign-out rehydration;
  - route/cache state;
  - resume-slot capture and merge behavior.
- Reproduce or characterize stale cross-browser and same-browser multi-tab signed-in Solo Daily/Practice states where feasible.
- Verify that multiplayer cloud turns remain outside this problem area.
- Confirm guest/account transfer regressions remain closed after Phase 45.
- Determine whether Practice Solo shares the same automatic sync risk as Daily Solo.
- Classify likely root cause categories:
  - missing automatic authenticated upload;
  - stale focus/visibility refresh;
  - route cache or selected-game cache;
  - resume-slot merge conflict;
  - `progress_snapshots` conflict/revision limitation;
  - another bounded cause.

**Likely read-only files/modules:**

- `src/account/accountScopedProgress.ts`
- `src/account/sync.ts`
- `src/account/syncStatus.ts`
- `src/account/guestTransfer.ts`
- `src/account/guestStorage.ts`
- `src/account/resumeSlot.ts`
- `src/account/storageSchema.ts`
- `src/app/App.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/solo/SoloWorkspace.tsx`
- relevant `e2e/fixtures/`
- Daily/Practice Solo boundary tests and sync tests

**Decision output:**

- Whether Stage 46.2 can choose a source-only repair path.
- Whether a storage-contract/Supabase addendum is needed.
- Whether one-active-session enforcement should remain deferred or be promoted to a later reviewed gate.

### Stage 46.2 - Source-Only vs Storage-Contract/Supabase/Session-Lease Decision

**Authorization:** Documentation/planning decision only.

**Goals:**

- Use Stage 46.1 evidence to choose the safest repair path.
- If source-only is safe, define exact repair boundaries for Stage 46.3:
  - authenticated Solo Daily/Practice progress uploads automatically at reviewed moments;
  - fresh authenticated progress is loaded on sign-in and safe refresh points;
  - guest progress is not implicitly transferred into accounts;
  - signed-in progress does not leak to guest state;
  - existing `progress_snapshots` stays the cloud persistence contract;
  - manual sync remains available and does not become a hidden guest-transfer path.
- If source-only is not safe, create a narrow addendum under `planning/specs/phase-46/` and stop before implementation.
- If session enforcement seems useful but not required, defer it as a later optional session-lease/security feature.

**Potential addendum path if required:**

- `planning/specs/phase-46/PHASE-46-SOLO-SYNC-STORAGE-CONTRACT-ADDENDUM-2026-07-05.md`

**Stop conditions:**

- Evidence proves a new database object, RLS policy, RPC, conflict-versioning contract, storage schema migration, destructive cleanup, or account-transfer semantics change is required.
- Evidence proves one-active-session enforcement is necessary before freshness can be safe.

### Stage 46.3 - Automatic Signed-In Solo Sync/Freshness Repair or Addendum Routing

**Authorization:** Source/test-only if Stage 46.2 chooses source-only. Otherwise follow the addendum path and do not implement runtime code.

**Goals for a source-only path:**

- Add the smallest safe automatic signed-in Solo persistence path using existing `progress_snapshots`.
- Improve cross-tab/cross-browser freshness for authenticated Solo Daily and Practice states.
- Prefer explicit, narrow sync triggers:
  - after a valid signed-in Solo Daily guess is captured;
  - after meaningful signed-in Practice Solo progress is captured, likely with bounded debounce or safe route/focus timing;
  - on completion or durable resume-slot update;
  - on safe app visibility/focus refresh if it does not overwrite newer local work.
- Prevent stale account data from overwriting newer local signed-in progress.
- Preserve guest-safe local play and Phase 45 account boundary protections.
- Keep automatic uploads non-printing, authenticated-only, and resilient to offline errors.

**Likely files/modules:**

- `src/account/sync.ts`
- `src/account/accountScopedProgress.ts`
- `src/account/syncStatus.ts`
- `src/app/App.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/game/storage/dailyOgStorage.ts`
- `src/game/storage/dailyGoStorage.ts`
- Daily/Practice account-boundary tests
- sync tests
- focused E2E/mobile/browser checks if feasible

**Verification focus:**

- Signed-in Daily Solo progress automatically becomes available in a second authenticated browser after a safe refresh path.
- Practice Solo uses the same reviewed persistence boundary where appropriate.
- Guest guesses still do not upload or merge into an account without explicit reviewed transfer semantics.
- Sign-out still rehydrates guest-safe state.
- Offline or failed sync does not destroy local progress.

**Stop conditions:**

- Source-only implementation requires cloud contract changes, destructive local cleanup, broad sync architecture replacement, session lease, gameplay-rule changes, or Elo changes.

### Stage 46.4 - Solo Overview Select Button Cleanup

**Authorization:** Source/test-only.

**Goals:**

- Audit the Solo Overview active-game `Select` button behavior.
- If it only highlights/saves selected state without a meaningful gameplay function, remove it and simplify the active-game cards.
- If a meaningful existing function is found, document it and either preserve it or make the affordance clear.
- Preserve the primary `Resume` button as the actual game-opening action.
- Preserve Stage 46.3 sync/freshness repairs and Phase 45 persistence boundaries.

**Likely files/modules:**

- `src/solo/SoloWorkspace.tsx`
- `src/solo/SoloWorkspace.test.tsx`
- `src/app/App.tsx` if selected-game state can be safely simplified
- route/navigation state tests if affected

**Success criteria:**

- No misleading `Select` control remains unless it performs a clear, useful function.
- Active Solo cards remain accessible and mobile-friendly.
- Existing resume routing and active-game counts still work.

### Stage 46.5 - Mobile Solo Pre-Guess Keyboard Visibility Follow-Up

**Authorization:** Source/test-only visual/layout follow-up.

**Goals:**

- Reproduce or characterize the mobile pre-guess issue where Solo Daily/Practice auto-scroll leaves the keyboard cut off at the bottom.
- Apply the smallest layout or scroll repair needed to keep the pre-guess keyboard usable on mobile.
- Preserve Phase 45 post-guess keyboard/context visibility behavior.
- Keep the repair scoped to Solo gameplay viewport and auto-center behavior, not broad mobile navigation or shell redesign.

**Likely files/modules:**

- `src/app/gameplayAutoCenter.ts`
- `src/app/games/soloGameplayAutoCenter.ts`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/index.css`
- `e2e/layout/mobile-scroll.spec.ts`
- focused auto-center tests

**Success criteria:**

- Mobile Solo Daily and Practice pre-guess keyboard is not clipped at default mobile viewport sizes.
- Post-guess keyboard/context visibility remains intact.
- Desktop gameplay sizing remains stable.
- No broad mobile shell/top-tab/navigation overhaul is introduced.

### Stage 46.6 - Final Hardening, Visual Review, Changelog, and Manual Checklist

**Authorization:** Final hardening and documentation only, with narrow fixes if required.

**Goals:**

- Review all Phase 46 stages for regressions, stale docs, privacy gaps, route gaps, visual issues, and cleanup needs.
- Add only narrow final-hardening fixes if required.
- Run focused regression coverage for:
  - signed-in Solo Daily/Practice automatic sync and freshness;
  - guest/account transfer non-regression;
  - Solo Overview active-game card behavior;
  - mobile Solo pre-guess keyboard visibility;
  - Phase 45 Daily/Practice boundaries;
  - public/guest spectator non-regression;
  - Daily/ranked/gameplay/Elo non-regression;
  - Phase 44 account-scoped repairs;
  - Phase 43 ranked fairness;
  - Phase 42 stats/dashboard/help contracts;
  - Phase 41 multiplayer reliability;
  - Phase 39 mobile scroll preservation.
- Run the local visual handoff review gate and save artifacts only under:
  - `test-results/visual-review/phase-46-stage-46-6/`
- Create:
  - `planning/phase-46/CHANGELOG.md`
  - `planning/phase-46/REVIEW-CHECKLIST.md`
- Create final progress report and CSV row.

**Final verification:**

- focused tests first
- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run test:full`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check with `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

## 5. Success Criteria

Phase 46 is complete when:

- signed-in Solo Daily/Practice freshness risk is audited and repaired or routed to a reviewed addendum;
- automatic signed-in Solo sync, if source-only, preserves guest/account boundaries and existing cloud persistence contracts;
- one-active-session enforcement is either explicitly deferred or routed to a later reviewed session-lease/security gate;
- Solo Overview active-game `Select` behavior is removed or made meaningful;
- mobile Solo pre-guess keyboard visibility is improved without broad mobile shell changes;
- all focused and full verification gates pass;
- visual handoff artifacts are local-only and ignored;
- Phase 46 changelog, review checklist, progress report, and CSV row are created.

## 6. Storage, Supabase, and Session Gates

Stop and create or use a reviewed addendum if any stage needs:

- a new Supabase table, RPC, trigger, index, policy, realtime channel, or migration;
- a changed `progress_snapshots` contract;
- direct table grants or RLS changes;
- storage schema migration or destructive local cleanup;
- new guest-to-account transfer semantics;
- active-session enforcement or remote session lease;
- broad sync architecture replacement.

## 7. Privacy and Boundary Constraints

- Do not print secrets, Supabase keys, Vercel tokens, auth states, local session artifacts, or private row data.
- Keep browser payloads sanitized.
- Keep public/guest spectator contracts unchanged.
- Keep Daily claim safety unchanged.
- Keep Elo math and gameplay rules unchanged.
- Keep multiplayer cloud turns and trusted settlement behavior unchanged.
- Keep the original stable `brrrdle` repository untouched.

## 8. Testing Strategy

Use the smallest useful verification set at each implementation stage, then broaden only at final hardening.

Expected focused coverage includes:

- sync unit tests for authenticated Solo upload/download/merge behavior;
- Daily Solo account-boundary tests;
- Practice Solo persistence tests;
- App hydration/sign-out/sign-in boundary tests where practical;
- Solo Overview card component tests;
- mobile Playwright checks for pre-guess and post-guess Solo keyboard visibility;
- regression tests preserving Phase 45 and earlier boundaries.

Real browser/E2E tests should use temporary, non-secret test accounts or existing safe fixtures only when needed. Do not expose local auth artifacts.

## 9. Risks

- Automatic sync can overwrite newer local signed-in progress if conflict handling is too naive.
- Syncing every guess may increase Supabase write volume; Stage 46 should prefer bounded triggers and measured behavior.
- Session-lease enforcement is a larger product/security feature and can create account lockout or stale-session problems if rushed.
- Removing `Select` could affect a hidden route/cache flow if the audit misses a dependency.
- Mobile keyboard scroll repairs can regress the Phase 45 post-guess centering behavior.

## 10. Open Decisions

- Whether existing `progress_snapshots` can safely support automatic signed-in Solo sync without schema/RLS changes.
- Whether signed-in Practice Solo should sync after every valid guess, on debounce, on focus/visibility change, or only on durable resume-slot checkpoints.
- Whether same-tab/same-browser freshness needs a local `BroadcastChannel` or storage-event path.
- Whether one-active-session enforcement should remain deferred after automatic freshness improves.
- Whether the Solo Overview `Select` button has any meaningful hidden function that justifies keeping it.
- Which mobile viewport sizes should become the minimum supported pre-guess keyboard visibility gate.

## 11. Next Gated Action

The next safe action is Stage 46.0 protected baseline and manual-review intake confirmation only. Do not proceed to Stage 46.1 audit, implementation, tests, migrations, or Git/GitHub actions until Stage 46.0 is explicitly authorized and passes.
