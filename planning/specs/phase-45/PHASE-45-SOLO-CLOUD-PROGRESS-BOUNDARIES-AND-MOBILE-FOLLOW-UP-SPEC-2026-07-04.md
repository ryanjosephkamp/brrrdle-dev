# Phase 45 Solo Cloud Progress Boundaries And Mobile Follow-Up Spec

**Status**: Draft unified specification for review only.
**Date**: 2026-07-04.
**Repository**: `brrrdle-dev`.
**Phase**: Phase 45 - Solo Cloud Progress Boundaries And Mobile Follow-Up.

## Authority

This specification is governed by:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `planning/phase-44/REVIEW-CHECKLIST.md`.
7. `planning/phase-45/PLANNING-BRIEF.md`.
8. Current roadmap, testing, Supabase, ranked multiplayer, and progress documents.

This specification does not authorize implementation. It does not authorize source/runtime edits, test edits, Supabase migration creation or execution, Supabase or Vercel configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, Elo changes, local Codex skill changes, secret printing, private data exposure, local artifact exposure, or work in the original stable `brrrdle` repository.

## Current Baseline

- Phase 44 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `ff27dd81ecb6b91868fd024247f03950aa04a898`.
- The user-updated Phase 44 checklist at `planning/phase-44/REVIEW-CHECKLIST.md` must be preserved.
- Phase 44 final evidence exists at `progress/PROGRESS-STEP-400.md`, `planning/phase-44/CHANGELOG.md`, and `planning/phase-44/REVIEW-CHECKLIST.md`.
- Phase 45 planning brief exists at `planning/phase-45/PLANNING-BRIEF.md`.
- Phase 45 planning progress exists at `progress/PROGRESS-STEP-401.md`.

## Manual Review Result Being Addressed

Phase 44 manual review passed overall, but one important item failed:

- `Daily Solo OG/GO account boundaries are protected`.

The reported failure has two directions:

- Guest Daily Solo OG/GO guesses made in separate browser profiles carried into the same signed-in account after sign-in.
- Signed-in Daily Solo OG/GO guesses remained visible as guest progress after sign-out.

The working hypothesis is not yet a conclusion. Phase 45 must treat the issue as an account, guest, local persistence, cloud sync, and hydration boundary problem until audit evidence proves the exact root cause.

## Phase Definition

Phase 45 is a reliability and persistence-boundary phase. Its anchor is a clear separation between guest-local Solo progress and authenticated account-owned Solo progress, especially for Daily Solo OG/GO. The phase must determine whether the current whole-progress cloud snapshot model can safely support that boundary or whether Solo progress needs a reviewed storage-contract and Supabase/RLS addendum before source implementation proceeds.

The phase may also include two small manual-review follow-ups:

- Profile embedded sign-in order should match the Phase 44 modal order.
- Mobile Solo gameplay should scale more comfortably on real phone-sized screens after the Stage 44 keyboard-centering work.

Those follow-ups are subordinate to the Solo persistence boundary work and must remain source/test-only unless a later gate explicitly expands them.

## Goals

- Reproduce and classify the Daily Solo OG/GO guest/auth account-boundary failure.
- Prevent browser-local guest Daily guesses from implicitly becoming authenticated account progress on sign-in.
- Prevent signed-in account Daily guesses from remaining visible as guest progress after sign-out.
- Define cross-browser authenticated Solo cloud persistence expectations.
- Decide whether authenticated Solo Daily and Practice progress can rely on the existing `progress_snapshots` model or needs a new reviewed storage contract.
- Preserve ordinary guest local Solo play.
- Preserve ordinary authenticated cloud sync.
- Add or plan real browser/E2E coverage for the two-browser guest/auth Daily Solo boundary.
- Align the Profile embedded sign-in panel with the modal order: Email + password first/default, Magic link second.
- Improve mobile Solo gameplay scaling enough that the submitted guess context and keyboard remain usable on narrow real-phone-sized viewports.

## In Scope

### Daily Solo Account-Boundary Audit And Repair Planning

- Daily Solo OG and GO sign-in hydration.
- Daily Solo OG and GO sign-out rehydration.
- Guest Daily Solo OG and GO local persistence.
- Authenticated Daily Solo OG and GO cloud persistence.
- Cross-browser signed-in Daily Solo continuity.
- Prevention of implicit guest-to-account Daily progress transfer.
- Prevention of account-to-guest Daily progress bleed after sign-out.

### Practice Solo Contract Evaluation

- Audit whether Practice Solo OG and GO share the same persistence boundary risk.
- Repair Practice Solo in Phase 45 only if evidence shows the same bounded root cause and the fix remains aligned with the Daily Solo boundary model.
- Route Practice Solo to a later phase if fixing it expands the phase beyond a narrow persistence-boundary repair.

### Account, Sync, And Storage Boundary Work

- Account-scoped progress helpers.
- Guest storage loading and saving.
- Authenticated progress hydration.
- Cloud sync and whole-progress snapshot behavior.
- Guest transfer or merge behavior.
- Route/cache hydration that can leave stale account-owned state mounted.
- History, Settings, Stats, active games, and rating-summary effects only as needed to preserve the Phase 44 boundary wins.

### Storage-Contract Or Supabase Addendum Decision

- Decide whether the repair can remain source/test-only.
- Stop for a reviewed addendum if the evidence requires a changed cloud contract, new table, new RPC, RLS change, storage-key migration, destructive cleanup, or changed transfer semantics.

### Profile Embedded Sign-In Order

- Update the embedded Profile/Auth sign-in surface, if safe, so it defaults to Email + password first and Magic link second.
- Preserve Magic link availability and all existing auth behaviors.

### Mobile Solo Gameplay Scaling

- Audit mobile Solo OG/GO layout on narrow real-phone-sized viewports.
- Keep work constrained to the gameplay surface and responsive sizing.
- Preserve Stage 44 keyboard-centering behavior unless evidence proves a small adjustment is needed.

## Out Of Scope

- Source/runtime implementation during this specification gate.
- Test implementation during this specification gate.
- Supabase migration creation or execution during this specification gate.
- Destructive local storage cleanup or storage-key migration without a later addendum.
- Deployment, Vercel or Supabase configuration, staging, commits, pushes, PR creation, merges, releases, branch deletion, or backup workflow execution.
- Broad mobile shell, top-tab, navigation, or app-layout overhaul.
- Configurable Home widgets.
- Private request inbox widgets.
- Live, Active, or Home spectator previews.
- UTC/local timestamp policy changes.
- Notification rival-name or ranked-context work.
- Profile/data-contract simplification.
- Admin queue/lobby observability dashboard.
- Social inbox/mailbox.
- Spectator presence/count/list.
- Service workers or push infrastructure.
- Gameplay-rule changes.
- Elo changes.
- Theme proposal modernization or concrete theme work.

## Success Criteria

- Daily Solo OG/GO guest progress does not become authenticated account progress on sign-in.
- Daily Solo OG/GO authenticated progress follows the signed-in account across isolated browser contexts when cloud persistence is available.
- Daily Solo OG/GO signed-in guesses do not remain visible as guest progress after sign-out.
- Guest Daily Solo OG/GO play remains locally usable when signed out.
- Authenticated Daily Solo OG/GO play remains cloud-syncable when signed in.
- Any guest-to-account transfer remains blocked unless a separately reviewed explicit transfer path is authorized.
- If Practice Solo shares the same root cause, it is either repaired under the same boundary model or explicitly routed with evidence.
- Profile embedded sign-in order matches the Phase 44 modal order.
- Mobile Solo gameplay is usable on real-phone-sized viewports without broad shell redesign.
- Phase 44 account-scoped local-state repairs that passed manual review remain preserved.
- Phase 44 private Practice request eligibility, sign-in modal order, header chip removal, Stats placement, Help placeholder, and keyboard-centering behavior remain preserved.
- Phase 43 ranked queue fairness/current-surface cleanup remains preserved.
- Phase 42 stats/dashboard/help contracts remain preserved.
- Phase 41 multiplayer reliability remains preserved.
- Phase 40 public profile/private matchmaking boundaries remain preserved.
- Phase 39 mobile scroll smoothness remains preserved.
- Phase 38 public/guest spectator boundaries remain preserved.
- Daily claim safety, gameplay rules, and Elo math remain unchanged.

## Recommended Stage Breakdown

### Stage 45.0 - Protected Baseline And Manual-Review Intake

Confirm repository state, preserve the Phase 44 checklist, record uncommitted Phase 45 planning/spec/progress artifacts, run the full baseline verification gate, and halt before audit work.

### Stage 45.1 - Solo Account/Cloud Persistence Audit And Reproduction

Read account, auth, sync, storage, Daily Solo, Practice Solo, route/cache, E2E, and Supabase context. Reproduce or characterize the two-browser Daily Solo OG/GO guest/auth failure where feasible. Decide whether Stage 45.2 can remain source/test-only or requires storage-contract addendum planning.

### Stage 45.2 - Storage-Contract Or Source-Only Decision

If the audit proves a source-only repair is safe, record that decision and proceed to the repair stage. If any cloud schema, RLS, RPC, merge semantics, storage-key migration, destructive cleanup, or data-contract change is needed, create a reviewed storage-contract/Supabase addendum and halt before execution.

### Stage 45.3 - Daily Solo Account-Boundary Repair

Implement the smallest authorized Daily Solo OG/GO repair for sign-in hydration, sign-out rehydration, cross-browser account continuity, and no implicit guest-to-account transfer. Add focused unit/component and real browser/E2E coverage.

### Stage 45.4 - Practice Solo And General Solo Persistence Follow-Up

Audit and repair Practice Solo OG/GO only if it shares the same bounded root cause and can use the same reviewed boundary model. Otherwise record the evidence and route Practice Solo to a later gate.

### Stage 45.5 - Profile Embedded Sign-In Order Follow-Up

Update the embedded Profile/Auth sign-in panel so Email + password is first and active by default, with Magic link second, matching the modal.

### Stage 45.6 - Mobile Solo Responsive-Scaling Follow-Up

Audit mobile Solo OG/GO gameplay after valid guesses and apply the smallest responsive scaling or viewport-positioning repair needed to keep the submitted guess context and keyboard usable.

### Stage 45.7 - Final Hardening, Visual Review, Changelog, And Checklist

Run focused and full verification, perform the local visual handoff review, create `planning/phase-45/CHANGELOG.md`, create `planning/phase-45/REVIEW-CHECKLIST.md`, record final progress, and prepare for a separate Git handoff preparation gate.

## Likely Files And Modules

Likely source surfaces for later authorized implementation:

- `src/account/accountScopedProgress.ts`
- `src/account/accountScopedProgress.test.ts`
- `src/account/sync.ts`
- `src/account/syncStatus.ts`
- `src/account/guestTransfer.ts`
- `src/account/guestStorage.ts`
- `src/account/storageSchema.ts`
- `src/account/resumeSlot.ts`
- `src/account/AuthPanel.tsx`
- `src/account/AuthModal.tsx`
- `src/account/ProfilePanel.tsx`
- `src/account/Settings.tsx`
- `src/app/App.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/app/gameplayAutoCenter.ts`
- `src/app/games/soloGameplayAutoCenter.ts`
- `src/solo/SoloWorkspace.tsx`
- `src/stats/StatsDashboard.tsx`
- `e2e/fixtures/`
- `e2e/gameplay/solo-daily-go.spec.ts`
- `e2e/gameplay/solo-practice-go.spec.ts`
- relevant Daily Solo, Practice Solo, History, Settings, Stats, auth, sync, route/cache, mobile layout, and cleanup tests.

Likely Supabase surfaces only if separately authorized by addendum:

- `supabase/migrations/`
- `docs/supabase.md`
- existing `progress_snapshots` contract or a new reviewed Solo-progress persistence contract.

## Storage-Contract, Migration/RLS, And Supabase Gates

Stop for addendum planning before implementation if Phase 45 requires:

- new Supabase tables, columns, functions, triggers, or RLS policies;
- a changed `progress_snapshots` browser/cloud merge contract;
- a new authenticated Solo progress RPC;
- a storage key migration;
- destructive local cleanup;
- new guest-to-account transfer semantics;
- new admin, service-role, or privileged write path;
- direct browser access to private progress tables;
- any behavior that depends on printing secrets, raw auth IDs, emails, tokens, private row data, or local session artifacts.

Any Supabase addendum must define:

- exact schema/RPC changes;
- allowlisted fields;
- RLS policies and grants;
- anon/authenticated/admin behavior;
- backward compatibility;
- non-printing probes;
- rollback limits;
- stop conditions.

## Account, Guest, And Cloud Persistence Constraints

- Guest state remains local to the browser unless an explicit transfer path is reviewed and approved.
- Authenticated state must be scoped to the signed-in user.
- Authenticated state must not persist into guest local storage.
- Sign-in must prefer account-owned cloud progress over existing browser guest guesses.
- Sign-out must rehydrate guest-safe local progress, not account-owned progress.
- Existing legitimate guest local play must remain usable.
- Existing authenticated sync must remain usable.
- Cross-browser signed-in continuity must be treated as an account-owned cloud expectation.
- If cloud load fails, the app must fail visibly or safely rather than silently adopting guest guesses as authenticated account state.
- Account-owned progress must not expose raw auth IDs, emails, tokens, private metadata, or private row data in browser-visible surfaces.

## Daily Solo And Practice Solo Constraints

- Daily Solo remains five letters, date-keyed, and claim-safe.
- Daily Solo OG and GO must not change answer selection, validation, completion, reveal, coin, or history rules.
- Practice Solo remains 2-35 letters and locally playable as guest.
- Practice Solo OG and GO must not change Hard Mode, difficulty defaults, GO chain defaults, seed behavior, validation, scoring, or gameplay rules.
- Daily Solo and Practice Solo persistence decisions must be explicit. If Practice Solo is not repaired in Phase 45, the rationale must be recorded.

## Real Browser/E2E Strategy

Phase 45 should add or expand real browser coverage where feasible:

- Use two isolated browser contexts/profiles.
- Use one safe authenticated test account or temporary account path without printing secrets.
- In browser A and browser B, create distinct guest Daily Solo OG and GO partial progress.
- Sign in to the same account in each browser and verify account-owned Daily state, not browser-local guest state.
- Create signed-in Daily Solo progress, sign out, and verify guest state does not show signed-in guesses.
- Verify cross-browser authenticated persistence after cloud sync.
- Verify no implicit guest-to-account upload occurs during sign-in or manual sync.
- Clean up created remote rows and auth/session artifacts without printing secrets.

If full automation is not possible, Stage 45 must record the limitation and provide a manual checklist that directly matches the user's reproduction.

## Profile Embedded Sign-In Order Constraints

- Match the Phase 44 modal order: Email + password first and active by default; Magic link second.
- Keep Magic link available.
- Preserve password reset, sign-up, and sign-in behavior.
- Do not alter Supabase auth provider configuration or redirect settings.
- Add focused component coverage for both the modal and embedded Profile/Auth surface if practical.

## Mobile Solo Responsive-Scaling Constraints

- Keep the repair narrow and gameplay-surface-specific.
- Prefer responsive sizing, containment, stable board/keyboard dimensions, or viewport anchoring over broad shell/navigation redesign.
- Preserve Stage 44 keyboard centering unless audit evidence proves a small adjustment is needed.
- Do not change keyboard semantics, valid-guess rules, reveal behavior, answer rules, scoring, or game rules.
- Include at least one narrow mobile viewport verification path in final hardening.

## Privacy And Supabase Constraints

- Do not print secrets, Supabase keys, auth tokens, private row data, raw user IDs, private emails, or local session artifacts.
- Keep public/guest spectator boundaries unchanged.
- Keep Daily claim and ranked queue RLS boundaries unchanged unless a separately reviewed addendum explicitly approves a change.
- Keep browser payloads sanitized.
- Do not add direct browser table grants.
- Preserve the Phase 42 public stats and private dashboard contracts.

## Verification Strategy

Baseline and final gates should include:

- focused unit/component tests for account progress scope, guest transfer/sync, Daily Solo persistence, Profile sign-in order, and mobile scaling helpers;
- focused real browser/E2E coverage for the two-browser Daily Solo guest/auth boundary where feasible;
- `npm run lint`;
- `npm run test`;
- relevant focused Playwright/E2E;
- `npm run test:e2e` and `npm run test:full` at final hardening;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

## Visual Handoff Review Expectations

Phase 45 final hardening should capture local-only visual review artifacts under:

- `test-results/visual-review/phase-45-stage-45-7/`

Artifacts must remain ignored/local-only and must not include tokens, auth state, private row data, or screenshots exposing private credentials.

## Manual Review Checklist Expectations

Phase 45 should create `planning/phase-45/REVIEW-CHECKLIST.md` with explicit manual checks for:

- Daily Solo OG/GO guest-to-account boundary;
- Daily Solo OG/GO account-to-guest sign-out boundary;
- cross-browser authenticated Daily Solo persistence;
- Practice Solo boundary if included;
- Profile embedded sign-in order;
- mobile Solo scaling and keyboard visibility;
- preservation of private request eligibility, ranked queue fairness, spectator boundaries, Daily claim safety, gameplay rules, and Elo math.

## GitHub Backup Workflow Expectations

After manual review and a separate Git handoff preparation pass, the governed `brrrdle-github-backup` workflow may be invoked only if explicitly authorized. Phase 45 planning/specification does not authorize staging, committing, pushing, PR creation, merging, branch deletion, deployment, or release.

## Risks

- The Daily Solo failure may reflect a deeper whole-progress cloud sync contract issue, not a small sign-in/sign-out bug.
- The current `progress_snapshots` whole-state merge may be too coarse for signed-in Solo progress if browser-local guest state is passed into authenticated sync.
- Repairing Daily Solo only could leave Practice Solo with the same class of bug if the root cause is shared.
- Real browser/E2E reproduction may require careful temporary-account and storage isolation.
- Mobile gameplay scaling can easily become a broad shell redesign if not kept tightly scoped.
- Preventing implicit guest-to-account transfer could reveal product questions about whether an explicit transfer path should exist later.

## Open Decisions

- Can Phase 45 remain source/test-only, or does authenticated Solo progress require a storage-contract/Supabase addendum?
- Should the existing whole-progress `progress_snapshots` contract be retained, constrained, or replaced for Solo progress?
- Should Practice Solo cloud persistence be repaired in Phase 45 v1 or only audited and routed?
- Should any explicit guest-to-account transfer path remain, be disabled, or be redesigned later?
- What is the safest automated E2E shape for the two-browser Daily Solo boundary without exposing secrets?
- What minimum mobile viewport sizes should Phase 45 target for Solo gameplay scaling?

## Next Gated Action

Create the detailed Phase 45 implementation plan for review only. Do not begin implementation, test implementation, migration work, deployment/configuration, Git/GitHub operations, backup workflow execution, or stable repository work.
