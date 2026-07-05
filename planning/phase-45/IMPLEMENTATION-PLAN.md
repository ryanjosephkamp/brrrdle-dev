# Phase 45 Implementation Plan

**Status**: Draft implementation plan for review only.
**Phase**: Phase 45 - Solo Cloud Progress Boundaries And Mobile Follow-Up.
**Date**: 2026-07-04.
**Repository**: `brrrdle-dev`.

## Authority

This implementation plan is governed by:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `planning/phase-44/REVIEW-CHECKLIST.md`.
7. `planning/phase-45/PLANNING-BRIEF.md`.
8. `planning/specs/phase-45/PHASE-45-SOLO-CLOUD-PROGRESS-BOUNDARIES-AND-MOBILE-FOLLOW-UP-SPEC-2026-07-04.md`.
9. Current roadmap, testing, Supabase, ranked multiplayer, progress, and workflow documents.

This plan does not authorize implementation. It does not authorize source/runtime edits, test edits, Supabase migration creation or execution, Supabase or Vercel configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, Elo changes, local Codex skill changes, secret printing, private data exposure, local artifact exposure, running the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

## Current Baseline

- Phase 44 is complete, backed up, merged, branch-cleaned, and manually reviewed with one failed Daily Solo account-boundary item plus two smaller passed-with-follow-up observations.
- Expected local and remote `main`: `ff27dd81ecb6b91868fd024247f03950aa04a898`.
- The user-updated Phase 44 manual review checklist at `planning/phase-44/REVIEW-CHECKLIST.md` must be preserved.
- Phase 45 planning brief exists at `planning/phase-45/PLANNING-BRIEF.md`.
- Unified Phase 45 specification exists at `planning/specs/phase-45/PHASE-45-SOLO-CLOUD-PROGRESS-BOUNDARIES-AND-MOBILE-FOLLOW-UP-SPEC-2026-07-04.md`.
- Progress exists through `progress/PROGRESS-STEP-402.md`.

## Implementation Principles

- Solve the account boundary before polish. Daily Solo guest/auth separation is the phase anchor.
- Reproduce before repair. The reported two-browser Daily Solo issue should be characterized before source behavior changes.
- Treat the current working hypothesis as unproven. The root cause may be sign-in hydration, sign-out rehydration, guest storage, `progress_snapshots`, `syncGuestProgress`, resume-slot merging, route cache, or a combination.
- Keep source-only work separate from storage-contract work. If a changed persistence contract is needed, stop at an addendum gate before migrations or source integration.
- Keep guest local play and authenticated cloud play both first-class.
- Prevent implicit guest-to-account transfer unless a future explicitly reviewed transfer path authorizes it.
- Preserve Phase 44 account-state repairs that passed manual review, Phase 44 private request eligibility, sign-in modal order, header chip removal, Stats placement, Help placeholder, and keyboard centering.
- Preserve Phase 43 ranked queue fairness/current-surface cleanup, Phase 42 stats/dashboard/help contracts, Phase 41 multiplayer reliability, Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, Phase 38 public/guest spectator boundaries, Daily claim safety, gameplay rules, and Elo math.
- Use focused tests at each implementation stage and reserve the broadest gate for final hardening.

## Stage 45.0 - Protected Baseline And Manual-Review Intake

**Purpose**: Establish a protected baseline before any audit or implementation work begins.

**Authorized work**:

- Read governance, Phase 45 planning/spec/implementation materials, completed Phase 44 evidence, current progress records, testing docs, `docs/supabase.md`, `docs/ranked-multiplayer.md`, `agents.md`, `memory.md`, and `package.json`.
- Confirm repository path, branch, status, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Preserve `planning/phase-44/REVIEW-CHECKLIST.md`.
- Record current uncommitted Phase 45 planning/spec/progress artifacts and the user-updated Phase 44 checklist state.
- Create `progress/PROGRESS-STEP-404.md` and append the matching 12-column `progress/PROGRESS.csv` row.
- Run watched-port/process/resource checks before and after the baseline verification gate for `5173`, `5174`, `3000`, and `4173`.

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
- Any evidence that the Phase 44 checklist would be overwritten or normalized.

## Stage 45.1 - Solo Account/Cloud Persistence Audit And Reproduction

**Purpose**: Prove the shape of the Daily Solo guest/auth boundary failure before fixing it.

**Authorized work**:

- Audit `src/account/accountScopedProgress.ts`, `src/account/sync.ts`, `src/account/guestTransfer.ts`, `src/account/guestStorage.ts`, `src/account/storageSchema.ts`, `src/account/resumeSlot.ts`, `src/app/App.tsx`, `src/app/games/OgGame.tsx`, `src/app/games/GoGame.tsx`, `src/solo/SoloWorkspace.tsx`, relevant tests, and E2E fixtures.
- Map how Daily Solo OG/GO progress enters `resumeSlots`, local guest storage, authenticated hydration, cloud sync, manual sync, route cache, and visible game state.
- Reproduce or classify:
  - guest Daily Solo OG/GO progress carrying into authenticated state on sign-in;
  - signed-in Daily Solo OG/GO progress remaining visible after sign-out;
  - cross-browser authenticated Daily Solo persistence from cloud state;
  - whether Practice Solo OG/GO shares the same risk;
  - whether `syncGuestProgress` or `mergeGuestProgressIntoCloud` can still merge browser-local guest progress into account cloud progress through an implicit path;
  - whether route/cache or mounted component state can keep stale progress visible after auth scope changes.
- Use one local dev server only if browser reproduction requires it, then stop it.
- Decide whether Stage 45.2 can remain source-only or requires a storage-contract/Supabase addendum.
- Create `progress/PROGRESS-STEP-405.md` and matching CSV row.

**Not authorized**:

- Source/runtime fixes.
- Test implementation.
- Storage schema changes.
- Supabase migration or RLS changes.
- Destructive local cleanup.

**Outputs**:

- Reproduction/classification matrix.
- Root-cause hypothesis by data path.
- Source-only versus addendum-gated decision for Stage 45.2.
- Real browser/E2E feasibility notes for the two-browser Daily Solo scenario.

## Stage 45.2 - Storage-Contract Or Source-Only Decision

**Purpose**: Decide and document whether persistence repair can happen without changing cloud/storage contracts.

**Source-only path**:

If Stage 45.1 proves the repair can be made with existing contracts, create `progress/PROGRESS-STEP-406.md` and record:

- the exact source-only repair boundary;
- why no storage-key migration, destructive cleanup, Supabase table/RPC/RLS change, or `progress_snapshots` contract change is needed;
- how guest local state, authenticated cloud state, and optional manual sync should behave.

**Addendum path**:

If Stage 45.1 proves a contract change is required, create a documentation-only addendum under `planning/specs/phase-45/`, likely:

- `PHASE-45-SOLO-PROGRESS-STORAGE-CONTRACT-ADDENDUM-2026-07-04.md`

The addendum must define:

- exact schema/RPC/storage contract;
- allowed fields and forbidden fields;
- RLS policies and grants;
- anon/authenticated behavior;
- migration order and rollback limits;
- non-printing probes;
- cleanup expectations;
- source integration stop conditions.

**Stop conditions**:

- Any required database, RLS, RPC, default-privilege, local-storage schema, destructive cleanup, or transfer-semantic change without an addendum.
- Any uncertainty about whether guest progress may be silently transferred into an account.

## Stage 45.3 - Daily Solo Account-Boundary Repair

**Purpose**: Repair Daily Solo OG/GO account boundaries after the audit and decision gate.

**Authorized work if prior stages allow source/test repair**:

- Ensure sign-in hydrates Daily Solo OG/GO from authenticated account-owned cloud progress or a fresh account-safe default, not from browser guest Daily progress.
- Ensure sign-out rehydrates guest-safe local state and does not leave authenticated Daily guesses visible in the guest surface.
- Ensure cross-browser signed-in Daily Solo state converges through cloud persistence where available.
- Prevent implicit guest-to-account Daily progress upload/merge during sign-in and normal hydration.
- Make any manual sync behavior explicit and safe for the active authenticated scope.
- Add focused unit/component tests around auth scope, resume slots, cloud download, no upload on hydration, and no guest persistence for authenticated scope.
- Add focused browser/E2E coverage for two isolated contexts where feasible.
- Create `progress/PROGRESS-STEP-407.md` and matching CSV row.

**Likely files**:

- `src/account/accountScopedProgress.ts`
- `src/account/sync.ts`
- `src/account/guestTransfer.ts`
- `src/account/guestStorage.ts`
- `src/account/resumeSlot.ts`
- `src/app/App.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `e2e/fixtures/`
- `e2e/gameplay/solo-daily-go.spec.ts`
- new focused tests only where needed.

**Verification**:

- focused tests first;
- focused relevant E2E if browser reproduction is available;
- then the standard implementation-stage gate.

**Stop conditions**:

- New storage contract needed.
- Destructive local cleanup needed.
- Guest-to-account transfer semantics need product approval.
- Daily claim safety, answer selection, gameplay rules, reveal/coin behavior, or history semantics would change.

## Stage 45.4 - Practice Solo And General Solo Persistence Follow-Up

**Purpose**: Apply or route the same boundary model for Practice Solo and shared Solo persistence surfaces.

**Authorized work**:

- Audit whether Practice Solo OG/GO uses the same risky path as Daily Solo.
- If the same bounded source-only repair applies, repair Practice Solo under the same account/guest boundary model.
- Preserve account-specific Practice seed behavior.
- Preserve guest Practice local play.
- Preserve Practice word lengths 2-35, Hard Mode, GO chain defaults, difficulty defaults, reveal/coin behavior, history, stats, and gameplay rules.
- Add focused tests for Practice Solo sign-in/sign-out boundary behavior if repaired.
- Create `progress/PROGRESS-STEP-408.md` and matching CSV row.

**Route instead of repair if**:

- Practice Solo requires a separate storage contract.
- The repair would expand into broad cloud-progress redesign.
- The repair would require destructive cleanup or migration.
- The evidence does not prove shared root cause.

## Stage 45.5 - Profile Embedded Sign-In Order Follow-Up

**Purpose**: Complete the smaller Phase 44 manual-review follow-up for the Profile embedded sign-in surface.

**Authorized work**:

- Update the embedded `AuthPanel`/Profile sign-in surface so Email + password is first and active by default, and Magic link is second.
- Preserve Magic link availability.
- Preserve password reset, sign-in, sign-up, validation, Supabase auth, redirect, and modal behavior.
- Add focused component tests for the embedded panel and confirm the modal remains covered.
- Create `progress/PROGRESS-STEP-409.md` and matching CSV row.

**Likely files**:

- `src/account/AuthPanel.tsx`
- `src/account/AuthModal.tsx`
- `src/account/AuthModal.test.tsx`
- relevant Profile/Settings auth tests if they exist or are needed.

**Stop conditions**:

- Supabase auth configuration would need to change.
- Profile/data-contract simplification becomes necessary.
- Any account-boundary repair from Stages 45.3/45.4 regresses.

## Stage 45.6 - Mobile Solo Responsive-Scaling Follow-Up

**Purpose**: Make mobile Solo gameplay more comfortably scaled after the Stage 44 keyboard-centering repair, without broad shell redesign.

**Authorized work**:

- Audit Solo OG/GO gameplay on narrow real-phone-sized viewports after a first valid guess.
- Keep the submitted guess context, reveal panel, board, and keyboard usable.
- Apply only narrow gameplay-surface responsive sizing, containment, viewport anchoring, or auto-centering adjustments.
- Preserve Stage 44 keyboard-centering intent.
- Preserve Phase 39 mobile scroll smoothness and Phase 43 back-to-top behavior.
- Add focused tests or E2E checks where practical, including at least one narrow mobile viewport.
- Create `progress/PROGRESS-STEP-410.md` and matching CSV row.

**Likely files**:

- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/app/gameplayAutoCenter.ts`
- `src/app/games/soloGameplayAutoCenter.ts`
- `src/index.css`
- `e2e/layout/mobile-scroll.spec.ts`
- focused gameplay layout tests if needed.

**Stop conditions**:

- Broad mobile shell, tab, or navigation overhaul becomes necessary.
- Gameplay keyboard semantics, valid-guess rules, reveal behavior, scoring, Daily claim behavior, or Elo would change.

## Stage 45.7 - Final Hardening, Visual Review, Changelog, And Manual Checklist

**Purpose**: Close Phase 45 with regression review, visual evidence, completion docs, and manual review handoff.

**Authorized work**:

- Review all Phase 45 stages for regressions, stale docs, privacy gaps, route gaps, visual issues, and cleanup needs.
- Add only narrow final-hardening fixes if required.
- Run focused regression coverage for Daily Solo account boundaries, Practice Solo boundary if included, Profile embedded sign-in order, mobile Solo scaling, public/guest spectator non-regression, Daily/ranked/gameplay/Elo non-regression, Phase 44 account-state repairs and UI follow-ups, Phase 43 ranked fairness/current-surface cleanup, Phase 42 stats/dashboard/help contracts, Phase 41 multiplayer reliability, and Phase 39 mobile scroll preservation.
- Run the local visual handoff review gate, saving artifacts only under ignored `test-results/visual-review/phase-45-stage-45-7/`.
- Create `planning/phase-45/CHANGELOG.md`.
- Create `planning/phase-45/REVIEW-CHECKLIST.md` using the local Phase 37-style checklist structure.
- Create final progress record and matching CSV row.

**Final verification**:

- focused tests
- `npm run lint`
- `npm run test`
- focused relevant Playwright/E2E
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

- Daily Solo OG/GO guest progress does not become authenticated account progress on sign-in.
- Daily Solo OG/GO authenticated progress follows the signed-in account across isolated browser contexts when cloud persistence is available.
- Daily Solo OG/GO signed-in guesses do not remain visible as guest progress after sign-out.
- Guest Daily Solo OG/GO remains locally playable while signed out.
- Authenticated Daily Solo OG/GO remains cloud-syncable while signed in.
- Manual sync and automatic hydration do not silently transfer guest Daily progress into an account.
- Practice Solo OG/GO is either repaired under the same model or explicitly routed with evidence.
- Profile embedded sign-in order matches the Phase 44 modal order.
- Mobile Solo gameplay is playable on narrow phone-sized viewports without broad shell redesign.
- No storage/Supabase change occurs without a reviewed addendum.
- Prior protected phase invariants remain intact.

## Verification Cadence

- Stage 45.0 uses the protected baseline gate.
- Stage 45.1 uses read-only checks plus optional browser/resource checks.
- Stage 45.2 uses lightweight documentation verification unless a later authorized addendum changes the gate.
- Stages 45.3 through 45.6 run focused tests first, then the standard stage gate.
- Stage 45.7 runs the broad final gate.
- Any migration/RLS execution, if needed, must be split into a separate explicitly authorized addendum execution stage before source integration.

## Storage-Contract Gates

Stop before implementation and create or use a reviewed addendum if any stage requires:

- new Supabase tables, columns, functions, triggers, or RLS policies;
- changed `progress_snapshots` browser/cloud merge semantics;
- new authenticated Solo progress RPCs;
- local storage key migration;
- destructive local cleanup;
- implicit or explicit guest-to-account transfer redesign;
- direct browser access to private progress tables;
- privileged service-role behavior in browser code.

## Privacy And Supabase Constraints

- Do not print secrets, Supabase keys, service-role keys, auth tokens, private row data, raw user IDs, private emails, or local session artifacts.
- Keep browser payloads sanitized.
- Preserve existing RLS and direct-grant boundaries unless a reviewed addendum explicitly changes them.
- Preserve public/guest spectator boundaries, Daily claim safety, ranked queue RLS boundaries, public profile/private matchmaking privacy, public stats/admin dashboard contracts, gameplay rules, and Elo math.

## Risk Register

- The failure may be rooted in the whole-progress cloud sync model rather than a small sign-in/sign-out state bug.
- `syncGuestProgress` currently merges a supplied local progress payload into cloud state; if the supplied payload can still be browser guest progress, the implicit transfer risk remains.
- `mergeGuestProgressIntoCloud` merges resume slots by timestamp, which may be wrong for guest/auth separation even when it is valid for explicit transfer.
- Repairing Daily only may leave Practice vulnerable if both use shared resume-slot persistence.
- Real two-browser E2E may need careful temporary account handling and cleanup.
- Mobile scaling can sprawl into shell redesign if the stage is not tightly bounded.

## Open Decisions

- Can Phase 45 remain source/test-only after Stage 45.1?
- Should the current `progress_snapshots` whole-progress snapshot remain the authenticated Solo persistence contract?
- Should explicit guest-to-account transfer be disabled, preserved as manual-only, or deferred for redesign?
- Should Practice Solo be repaired in Phase 45 or routed after Daily is proven?
- Which real browser/E2E shape gives enough confidence without leaking secrets or creating durable test artifacts?
- What minimum mobile viewport should Phase 45 target for Solo scaling?

## Next Gated Prompt

The next safe gate is Stage 45.0 protected baseline and manual-review intake only.
