# Phase 47 Implementation Plan

**Status:** Drafted for review. Do not execute until the next stage is explicitly authorized.
**Phase:** Phase 47 - Mobile Solo GO Visibility and Account Display Boundaries
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Stable repository boundary:** Do not touch the original stable `brrrdle` repository.
**Date:** 2026-07-05

## 1. Authority

This plan implements the staged execution path for:

- `planning/phase-47/PLANNING-BRIEF.md`
- `planning/specs/phase-47/PHASE-47-MOBILE-SOLO-GO-VISIBILITY-AND-ACCOUNT-DISPLAY-BOUNDARY-SPEC-2026-07-05.md`

Higher-authority sources remain, in order:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. Phase 47 planning brief and unified specification.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `planning/testing/TESTING-SUITE.md`.
7. Supporting repo docs, `agents.md`, and `memory.md`.

This document is planning only. It does not authorize implementation, test implementation, migrations, deployment, Git/GitHub operations, backup workflow execution, gameplay-rule changes, Elo changes, or stable-repository work.

## 2. Current Baseline

- Expected local `main` and `origin/main`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- Phase 46 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Phase 46 manual review passed overall but produced two failed mobile GO checks:
  - `Mobile Daily Solo GO keyboard is visible before the first valid guess`.
  - `Mobile Practice Solo GO remains playable after the first valid guess`.
- Preserve the user-updated checklist at `planning/phase-46/REVIEW-CHECKLIST.md`.
- Phase 47 planning brief and unified spec are already created and tracked under progress steps 422 and 423.

## 3. Implementation Principles

- Treat full mobile keyboard visibility as the hard success criterion. Context above the keyboard matters, but not as much as having the whole keyboard usable.
- Reproduce or characterize the GO-specific failures before source edits.
- Keep mobile work source-only unless the audit proves a broader mobile layout or shell decision is required.
- Do not use Phase 47 to implement the later compact side dock or broad mobile top-tab/navigation overhaul.
- Treat signed-out account-data carryover as a display-boundary bug until evidence proves it needs storage, Supabase, or session-contract work.
- Preserve legitimate guest-local data while preventing the just-signed-out account's private data from rendering on guest surfaces.
- Keep same-account multi-tab/browser behavior as classification and routing work unless evidence proves a session-lease gate is required.
- Preserve Phase 46 automatic signed-in Solo sync/freshness, no implicit guest-to-account Solo transfer, no authenticated progress writes to guest storage, and Solo Overview Resume-only behavior.
- Preserve Phase 45 Solo account boundaries, Phase 44 account-scoped repairs, Phase 43 ranked fairness, Phase 42 stats/dashboard/help contracts, Phase 41 multiplayer reliability, Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, Phase 38 public/guest spectator boundaries, Daily claim safety, gameplay rules, and Elo math.
- Use real mobile/browser evidence where practical because desktop mobile emulation already proved insufficient for this issue.

## 4. Stage Breakdown

### Stage 47.0 - Protected Baseline and Manual Review Intake

**Authorization:** Baseline only.

**Goals:**

- Confirm repo state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the stable `brrrdle` repository is not in use.
- Read required governance, Phase 47 planning/spec/implementation materials, Phase 46 completion evidence, package/test surfaces, and current progress.
- Preserve `planning/phase-46/REVIEW-CHECKLIST.md`.
- Record existing uncommitted Phase 47 planning/spec/progress artifacts.
- Create the Stage 47.0 progress report and matching 12-column CSV row, likely progress ID `425`.
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

### Stage 47.1 - Mobile Solo GO Keyboard/Viewport Audit and Reproduction

**Authorization:** Read-only audit and reproduction only.

**Goals:**

- Reproduce or characterize mobile Daily Solo GO keyboard clipping before the first valid guess.
- Reproduce or characterize Practice Solo GO `New go chain` entry behavior.
- Reproduce or characterize Daily/Practice Solo GO re-entry after at least one submitted guess.
- Check whether Daily/Practice Solo OG re-entry shares the same root cause, without widening the stage into a broad OG rewrite.
- Audit current target selection, scroll timing, CSS margins, viewport sizing, safe-area behavior, browser chrome effects, GO layout density, and back-to-top overlap.
- Compare Playwright mobile assertions against the real manual-review failures to decide whether current automated thresholds are too weak.

**Likely read-only files/modules:**

- `src/app/gameplayAutoCenter.ts`
- `src/app/gameplayAutoCenter.test.ts`
- `src/app/games/soloGameplayAutoCenter.ts`
- `src/app/games/soloGameplayAutoCenter.test.ts`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/solo/SoloWorkspace.tsx`
- `src/index.css`
- `e2e/layout/mobile-scroll.spec.ts`

**Decision output:**

- Whether the failure is likely target selection, target timing, safe-area/browser chrome, scroll margin, GO layout density, re-entry state, or broader mobile scaling.
- Whether Stage 47.2 can choose a source-only repair path.
- Whether the immediate repair should strengthen the mobile keyboard visibility assertion.

**Verification:**

- Focused read-only checks as needed.
- One local dev server only if browser reproduction requires it, then stop it.
- Lightweight documentation verification after the progress report is created.

### Stage 47.2 - Source-Only vs Broader Mobile Layout Decision

**Authorization:** Documentation/planning decision only.

**Goals:**

- Use Stage 47.1 evidence to choose the safest mobile repair path.
- If source-only is safe, define exact boundaries for Stage 47.3:
  - mobile-only scroll target or timing changes;
  - safe-area or bottom-margin corrections;
  - GO-specific target placement or re-entry scheduling;
  - assertion strengthening for real mobile keyboard visibility;
  - no gameplay semantics, storage, Supabase, or broad shell changes.
- If source-only is not safe, create a narrow mobile layout/scaling addendum under `planning/specs/phase-47/` and stop before implementation.
- Keep compact side dock, top-tab overhaul, and broad mobile shell redesign deferred unless separately approved.

**Potential addendum path if required:**

- `planning/specs/phase-47/PHASE-47-MOBILE-SOLO-LAYOUT-SCALING-ADDENDUM-2026-07-05.md`

**Stop conditions:**

- Evidence proves the fix requires broad shell navigation work, a compact side dock, route layout redesign, gameplay-rule changes, storage-contract work, Supabase/RLS changes, or deployment/configuration.

### Stage 47.3 - Mobile Solo GO Keyboard Visibility and Re-Entry Repair

**Authorization:** Source/test-only if Stage 47.2 chooses source-only.

**Goals:**

- Repair the smallest mobile Solo GO keyboard visibility path.
- Cover these exact flows:
  - Daily Solo GO before the first valid guess;
  - Practice Solo GO `New go chain` before the first valid guess;
  - Daily Solo GO re-entry after at least one submitted guess;
  - Practice Solo GO re-entry after at least one submitted guess.
- Preserve OG behavior that already passes.
- Repair OG re-entry only if Stage 47.1 proves the same bounded root cause applies.
- Prioritize full keyboard visibility and usable input over keeping all content above the keyboard visible.
- Preserve desktop/tablet layout and avoid horizontal overflow.
- Preserve Phase 46 automatic signed-in Solo sync/freshness.

**Likely files/modules:**

- `src/app/gameplayAutoCenter.ts`
- `src/app/gameplayAutoCenter.test.ts`
- `src/app/games/soloGameplayAutoCenter.ts`
- `src/app/games/soloGameplayAutoCenter.test.ts`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/solo/SoloWorkspace.tsx`
- `src/index.css`
- `e2e/layout/mobile-scroll.spec.ts`

**Verification focus:**

- Focused Vitest coverage for auto-center target/block/timing decisions.
- Focused Playwright mobile checks for Daily GO pre-guess, Practice GO new-chain, and GO re-entry after submitted guesses.
- Browser/resource cleanup if a dev server is used.

**Stop conditions:**

- The repair requires broad mobile shell changes, gameplay input semantics changes, storage/Supabase changes, session leases, gameplay-rule changes, or Elo changes.

### Stage 47.4 - Guest/Account Display-Boundary Audit

**Authorization:** Read-only audit.

**Goals:**

- Audit guest-visible History immediately after sign-out.
- Audit guest-visible leaderboard/rating summaries immediately after sign-out.
- Audit guest-visible Stats immediately after sign-out.
- Audit related account-specific surfaces where stale account data may remain visible, including Active/Multiplayer projections, Settings/Profile summaries, and cached route view models if evidence points there.
- Identify whether display carryover comes from:
  - active progress scope selection;
  - stale `guestProgress` props;
  - cached view models;
  - route/navigation state;
  - sign-out rehydration timing;
  - local storage ownership;
  - another bounded source-only cause.
- Classify same-account multi-tab/browser session freshness as source freshness, UX messaging, storage contract, or later session-lease work.

**Likely read-only files/modules:**

- `src/app/App.tsx`
- `src/account/accountScopedProgress.ts`
- `src/account/autoProgressSync.ts`
- `src/account/sync.ts`
- `src/account/syncStatus.ts`
- `src/account/guestStorage.ts`
- `src/account/storageSchema.ts`
- `src/history/HistoryWorkspace.tsx`
- `src/history/historyViewModels.ts`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/leaderboards/PublicRankedLeaderboardPanel.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/account/Settings.tsx`
- relevant account, history, leaderboard, stats, route/cache, and auth tests.

**Decision output:**

- Whether Stage 47.5 can remain source/test-only.
- Whether storage-contract, Supabase/RLS, destructive cleanup, or session-lease addendum planning is required.
- Whether strict one-active-session enforcement remains deferred.

### Stage 47.5 - Guest/Account Display-Boundary Repair or Addendum Routing

**Authorization:** Source/test-only if Stage 47.4 chooses source-only; otherwise documentation addendum only.

**Goals for a source-only path:**

- Ensure signed-out guest History does not show the just-signed-out account's private history.
- Ensure signed-out guest leaderboard/rating summaries do not show the just-signed-out account's rating details.
- Ensure signed-out guest Stats do not show the just-signed-out account's private stats.
- Preserve legitimate guest-local history and stats where present.
- Preserve public aggregate stats and safe public leaderboard data where intentionally public.
- Clear or rehydrate account-derived view state before guest surfaces render.
- Preserve Phase 46 automatic signed-in Solo sync/freshness and Phase 45 Solo account boundaries.
- Keep same-account session enforcement deferred unless evidence proves it is required.

**Likely files/modules:**

- `src/app/App.tsx`
- `src/account/accountScopedProgress.ts`
- `src/account/guestStorage.ts`
- `src/history/HistoryWorkspace.tsx`
- `src/history/historyViewModels.ts`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/account/Settings.tsx`
- focused tests for sign-out display boundaries.

**Potential addendum path if required:**

- `planning/specs/phase-47/PHASE-47-GUEST-ACCOUNT-DISPLAY-BOUNDARY-ADDENDUM-2026-07-05.md`

**Stop conditions:**

- The repair requires storage schema migration, destructive local cleanup, new Supabase table/RPC/RLS policy, changed `progress_snapshots` contract, strict session leases, remote session invalidation, gameplay-rule changes, or Elo changes.

### Stage 47.6 - Final Hardening, Visual Review, Changelog, and Manual Checklist

**Authorization:** Final hardening and documentation only, with narrow fixes if required.

**Goals:**

- Review all Phase 47 stages for regressions, stale docs, privacy gaps, route gaps, visual issues, and cleanup needs.
- Add only narrow final-hardening fixes if required.
- Run focused regression coverage for:
  - mobile Daily Solo GO pre-guess keyboard visibility;
  - mobile Practice Solo GO new-chain keyboard visibility;
  - mobile Daily/Practice Solo GO re-entry keyboard visibility;
  - representative mobile OG entry/re-entry non-regression;
  - guest/account display-boundary behavior if Stage 47.5 changes source;
  - Phase 46 automatic signed-in Solo sync/freshness;
  - Phase 45 Solo account boundaries;
  - public/guest spectator non-regression where affected;
  - Daily/ranked/gameplay/Elo non-regression;
  - Phase 44 account-scoped repairs;
  - Phase 43 ranked fairness;
  - Phase 42 stats/dashboard/help contracts;
  - Phase 39 mobile scroll preservation.
- Run the local visual handoff review gate and save artifacts only under:
  - `test-results/visual-review/phase-47-stage-47-6/`
- Create:
  - `planning/phase-47/CHANGELOG.md`
  - `planning/phase-47/REVIEW-CHECKLIST.md`
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

Phase 47 is complete when:

- mobile Daily Solo GO before the first valid guess leaves the full keyboard visible and usable;
- mobile Practice Solo GO `New go chain` leaves the full keyboard visible and usable;
- mobile Daily/Practice Solo GO re-entry after at least one submitted guess leaves the full keyboard visible and usable;
- representative mobile OG behavior remains intact or is repaired only for a shared bounded root cause;
- desktop/tablet layout, horizontal overflow, and back-to-top behavior do not regress;
- signed-out guest History, leaderboard/rating summaries, Stats, and related account-specific surfaces are audited and repaired source-only or routed to addendum planning;
- legitimate guest-local data remains available where applicable;
- same-account multi-tab/browser behavior is classified without premature session-lease implementation;
- Phase 46 automatic signed-in Solo sync/freshness remains preserved;
- no implicit guest-to-account Solo transfer and no authenticated progress writes to guest storage remain preserved;
- Daily claim safety, gameplay rules, and Elo math remain unchanged;
- all focused and final verification gates pass;
- visual handoff artifacts are local-only and ignored;
- Phase 47 changelog, review checklist, progress report, and CSV row are created.

## 6. Source, Storage, Supabase, and Session Gates

Stop and create or use a reviewed addendum if any stage needs:

- a new Supabase table, RPC, trigger, index, policy, realtime channel, or migration;
- a changed `progress_snapshots` contract;
- direct table grants or RLS changes;
- storage schema migration or destructive local cleanup;
- new guest-to-account transfer semantics;
- server-authoritative Daily submissions;
- one-active-session leases, forced sign-out, heartbeat leases, or remote session invalidation;
- broad mobile shell, top-tab, route-navigation, side-dock, or gameplay layout redesign;
- gameplay-rule changes;
- Elo changes;
- deployment or configuration changes.

## 7. Mobile Viewport and Keyboard Constraints

- Full keyboard visibility is the first mobile success criterion.
- The immediate repair may allow content above the keyboard to be partly offscreen if the keyboard is fully usable.
- The repair must consider real mobile browser chrome and safe-area behavior, not only desktop emulation.
- GO puzzle-progress content must not push the keyboard target too low for reliable scroll alignment.
- Re-entry into an active GO game after submitted guesses must choose a target that reflects the current playable surface.
- Back-to-top controls must not cover the keyboard.
- The phase may document longer-term gameplay scaling needs, but must not implement broad mobile navigation or side-dock work.

## 8. Account/Guest Display-Boundary Constraints

- Guest surfaces may show guest-local data, public aggregate data, or safe empty states.
- Guest surfaces must not show private account-owned History, rating summaries, Stats, active projections, or settings from the just-signed-out account.
- Sign-out should clear, replace, or rehydrate account-derived view state before guest surfaces render private account data.
- Display-boundary work must not weaken authenticated sync, manual Sync now, or guest-local play.
- No authenticated account progress may be written to guest storage.
- No guest progress may be implicitly uploaded into an authenticated account.

## 9. Sync and Session Recommendation

The recommended Phase 47 stance is:

- keep Phase 46 automatic signed-in Solo sync/freshness intact;
- classify same-account multi-tab/browser behavior in Stage 47.4;
- do not implement strict one-active-session enforcement in Phase 47 unless the audit proves the display-boundary or mobile work cannot be made safe without it;
- route session leases, forced sign-out, remote invalidation, and stale-lock recovery UX to a later addendum if needed.

## 10. Verification Cadence

- Documentation-only stages use lightweight checks: `git diff --check`, CSV shape, non-printing secret/artifact scan, ignored-artifact check, and status.
- Baseline Stage 47.0 uses the protected baseline gate with lint, tests, build, API typecheck, diff, CSV, scans, watched-port checks, and status.
- Audit stages use only focused read-only/browser/resource checks needed for classification.
- Source stages run focused tests first, then the standard implementation-stage gate.
- Final hardening runs the broad verification gate, E2E, full suite, and visual handoff review.

## 11. Risks

- Desktop mobile emulation may pass while real mobile browser chrome still clips the keyboard.
- GO layout density can make a simple scroll-target fix brittle.
- Fixing fresh entry can still miss re-entry after submitted guesses.
- Extra bottom spacing can solve keyboard visibility but hide too much context or create awkward scroll depth.
- Display-boundary repair can accidentally hide legitimate guest-local history/stats.
- Clearing account-derived view state too aggressively can weaken Phase 46 sync/freshness.
- Session concerns can expand rapidly into a security/session-leasing project if not kept at classification level.

## 12. Open Decisions

- Is the mobile GO failure primarily target timing, target choice, safe-area/browser chrome, scroll margin, GO layout density, re-entry state, or broader mobile scaling?
- Should mobile keyboard visibility checks require a stricter assertion than the current Playwright threshold?
- Should the immediate repair always target the keyboard container for playable Solo entry/re-entry?
- Which signed-out guest surfaces leak account-owned data?
- Can signed-out display-boundary repair stay source-only?
- Does same-account multi-tab/browser behavior need only freshness classification, or a later session-lease/security phase?

## 13. Next Gated Prompt

The next safe prompt should authorize Phase 47 Stage 47.0 only: protected baseline and manual review intake. It should not authorize Stage 47.1 audit work or implementation.
