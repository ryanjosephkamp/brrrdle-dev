# Phase 45 Planning Brief

**Status**: Draft planning brief for review only.
**Phase**: Phase 45 - Solo Cloud Progress Boundaries And Mobile Follow-Up.
**Repository**: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Created**: 2026-07-04.
**Baseline**: Phase 44 complete, backed up, merged, branch-cleaned, and manually reviewed at `ff27dd81ecb6b91868fd024247f03950aa04a898`.

## Authority

This planning brief is governed by:

1. Current user authorization for Phase 44 manual-review processing and Phase 45 planning only.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. Phase 44 planning, specification, implementation, changelog, review checklist, and progress records.
7. Current roadmap and testing strategy documents.

This brief does not authorize implementation, tests, migrations, deployment, Git operations, backup workflow execution, release work, or stable `brrrdle` repository work.

## Current Baseline

- Local and remote `main` are expected to point to `ff27dd81ecb6b91868fd024247f03950aa04a898`.
- Phase 44 final evidence is recorded through `progress/PROGRESS-STEP-400.md`.
- The user-updated Phase 44 manual review checklist is preserved at `planning/phase-44/REVIEW-CHECKLIST.md`.
- Phase 44 manual review passed overall with one failed item and two passed-with-follow-up observations.

## Phase 44 Manual Review Summary

Manual review confirmed that Phase 44 improved the intended account-scoped local-state, private request eligibility, sign-in modal ordering, header chip removal, Stats placement, Help placeholder, and Solo keyboard-centering behavior. Phase 44 should be treated as successful overall, but the remaining Daily Solo account-boundary failure is too important to defer behind unrelated feature work.

## Failed Daily Solo Account-Boundary Summary

The failed manual item is:

- `Daily Solo OG/GO account boundaries are protected`.

Observed behavior:

- In two separate browser profiles, guest Daily Solo OG and GO guesses carried into the same signed-in account after sign-in.
- In the reverse direction, signed-in Daily guesses remained visible as guest progress after sign-out.
- The behavior suggests browser-local Daily progress is still being treated as the active signed-in or signed-out state instead of a clearly account-owned cloud state for authenticated users and a separate guest-safe local state for guests.

Phase 45 must investigate this deeply before any larger UI, social, preview, or profile-contract work proceeds.

## Passed-With-Follow-Up Observations

- Solo keyboard centering after a valid guess works, but mobile Solo gameplay appears too large or zoomed in on real mobile screens and can leave the first submitted guess offscreen while the keyboard is visible.
- The top-right sign-in modal now defaults to Email + password first, but the Profile page embedded guest sign-in panel still uses Magic link first.
- Broader mobile shell, top-tab, and navigation changes should be deferred. Phase 45 may only take narrow mobile gameplay scaling/playability work if it stays bounded.

## Phase-Sizing Decision

Phase 45 should remain a cohesive macro-phase centered on Solo account/cloud persistence correctness, with only two small follow-up UI/playability items included because they came directly from Phase 44 manual review.

Implementation stages must remain narrow and independently reviewable. If authenticated Solo progress requires a new database table, RPC, RLS policy, or cloud-progress contract change, Phase 45 must stop at a storage-contract or migration/RLS addendum gate before execution.

## Goals

- Reproduce and classify the Daily Solo OG/GO account-boundary failure with two real browser contexts and one safe authenticated account.
- Decide whether the repair can remain source/test-only or requires a storage-contract and Supabase/RLS addendum.
- Ensure sign-in hydrates authenticated users from account-owned cloud progress rather than implicitly adopting local guest Daily guesses.
- Ensure sign-out rehydrates a guest-safe local state and does not leave signed-in Daily guesses visible as guest progress.
- Prevent guest progress from silently uploading or merging into an authenticated account without an explicit reviewed transfer path.
- Evaluate whether authenticated Solo Daily and Practice progress needs a clearer cloud-backed persistence contract than the current whole-progress snapshot behavior.
- Apply the Profile embedded sign-in ordering follow-up if safe.
- Apply a narrow mobile Solo gameplay responsive-scaling follow-up if safe.

## In Scope

- Daily Solo OG and GO account-boundary audit, reproduction, and repair planning.
- Cross-browser authenticated Solo cloud persistence expectations for Daily Solo and, if the evidence shows the same root cause, Practice Solo.
- Sign-in hydration and sign-out rehydration boundaries.
- Guest-to-account transfer prevention unless an explicit reviewed transfer path is separately approved.
- Real browser/E2E strategy for two-browser guest/auth Daily Solo boundary verification.
- Storage-contract and Supabase/RLS addendum planning if cloud-backed Solo progress requires data-contract changes.
- Profile page embedded guest sign-in panel ordering.
- Narrow mobile Solo gameplay scaling/playability work around keeping the board, reveal panel, and keyboard usable on smaller screens.

## Out Of Scope

- Source/runtime implementation during this planning gate.
- Test implementation during this planning gate.
- Supabase migration creation or execution during this planning gate.
- Destructive local storage cleanup or unreviewed storage key migration.
- Deployment, Vercel or Supabase configuration, staging, commits, pushes, PRs, merges, releases, branch deletion, or backup workflow execution.
- Public/guest spectator contract changes, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, and Elo changes.
- Broad mobile shell, top-tab, or navigation overhaul.
- Configurable Home widgets or private request inbox widgets.
- Live, Active, or Home spectator previews.
- UTC/local timestamp policy changes.
- Notification rival-name, ranked-context, or mailbox redesign work.
- Profile/data-contract simplification.
- Admin queue/lobby observability dashboard.

## Recommended Phase 45 v1 Scope

Phase 45 v1 should prioritize the Daily Solo OG/GO account-boundary failure. The smallest acceptable outcome is a proven boundary repair for Daily Solo with regression coverage and a clear decision about whether Practice Solo shares the same cloud/local contract risk.

If the audit proves that the existing `progress_snapshots` whole-progress model can support the repair safely, Phase 45 can remain source/test-only after the audit stage. If the audit proves that authenticated Solo progress needs a new persistence shape, an addendum must define the data contract before any migration or source integration proceeds.

The Profile embedded sign-in order and mobile Solo scaling work may proceed only after the account-boundary path is clear and only if they remain small, source/test-only follow-ups.

## Recommended Stage Breakdown

### Stage 45.0 - Protected Baseline And Manual-Review Intake

Confirm repository state, preserve the Phase 44 checklist, record uncommitted Phase 45 planning artifacts, run the full baseline gate, and halt before audit work.

### Stage 45.1 - Solo Account/Cloud Persistence Audit And Reproduction

Read the account, sync, guest transfer, Daily Solo, Practice Solo, storage, route, and E2E surfaces. Reproduce or characterize the two-browser guest/auth Daily Solo OG/GO failure where feasible. Decide whether Stage 45.2 can remain source/test-only or needs a storage-contract addendum.

### Stage 45.2 - Storage-Contract Or Source-Only Decision

If the audit proves source-only repair is safe, record the source-only decision and proceed to Stage 45.3. If any cloud schema, RLS, RPC, merge semantics, or storage migration is needed, create a reviewed storage-contract/Supabase addendum and halt before execution.

### Stage 45.3 - Daily Solo Account-Boundary Repair

Implement the smallest authorized repair for Daily Solo OG/GO sign-in hydration, sign-out rehydration, and no implicit guest-to-account transfer. Add focused unit/component and real browser/E2E coverage.

### Stage 45.4 - Practice Solo And General Solo Persistence Follow-Up

Apply the same boundary model to Practice Solo if the Stage 45.1/45.3 evidence proves shared risk. Preserve ordinary guest local play and authenticated cloud sync.

### Stage 45.5 - Profile Embedded Sign-In Order Follow-Up

Update the embedded Profile/Auth panel so Email + password is first and active by default, with Magic link second, matching the modal.

### Stage 45.6 - Mobile Solo Responsive-Scaling Follow-Up

Audit real mobile Solo OG/GO layout after a valid guess and apply the smallest responsive scaling or viewport-positioning repair needed to keep the submitted guess context and keyboard usable.

### Stage 45.7 - Final Hardening, Visual Review, Changelog, And Checklist

Run focused and full verification, perform a local visual handoff review, create `planning/phase-45/CHANGELOG.md`, create `planning/phase-45/REVIEW-CHECKLIST.md`, and prepare for Git handoff review.

## Success Criteria

- Daily Solo OG/GO guest progress does not become authenticated account progress on sign-in.
- Authenticated Daily Solo OG/GO progress follows the signed-in account across browser contexts when cloud persistence is available.
- Signed-in Daily Solo OG/GO guesses do not remain visible as guest progress after sign-out.
- Guest Daily Solo OG/GO play still works locally when signed out.
- Any guest-to-account progress transfer remains blocked unless a separately reviewed explicit transfer path is authorized.
- Any storage/Supabase change is preceded by an addendum and verified with non-printing probes.
- Profile embedded sign-in order matches the modal.
- Mobile Solo gameplay is playable on narrow real-phone-sized viewports without broad shell redesign.
- Phase 44, Phase 43, Phase 42, Phase 41, Phase 40, Phase 39, and Phase 38 invariants remain intact.

## Likely Files And Modules

Likely source surfaces for later authorized implementation:

- `src/account/accountScopedProgress.ts`
- `src/account/sync.ts`
- `src/account/syncStatus.ts`
- `src/account/guestTransfer.ts`
- `src/account/guestStorage.ts`
- `src/account/storageSchema.ts`
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
- relevant Daily Solo, Practice Solo, History, Settings, Stats, auth, sync, route/cache, mobile layout, and cleanup tests.

Likely Supabase surfaces only if separately authorized by addendum:

- `supabase/migrations/`
- `docs/supabase.md`
- `progress_snapshots` contract or a new reviewed Solo-progress persistence contract.

## Storage-Contract, Migration/RLS, And Supabase Gates

Stop for addendum planning before implementation if Phase 45 requires:

- new Supabase tables, columns, functions, triggers, or RLS policies;
- a changed `progress_snapshots` browser/cloud merge contract;
- a storage key migration;
- destructive local cleanup;
- new guest-to-account transfer semantics;
- new admin, service-role, or privileged write path;
- direct browser access to private progress tables.

Any Supabase addendum must define allowlisted fields, RLS behavior, grants, rollback limits, non-printing probes, and exact stop conditions.

## Account, Guest, And Cloud Persistence Constraints

- Guest state remains local to the browser unless an explicit transfer path is reviewed and approved.
- Authenticated state must be scoped to the signed-in user and should not persist into guest local storage.
- Sign-in must prefer account-owned cloud progress over existing browser guest guesses.
- Sign-out must rehydrate guest-safe local progress, not account-owned progress.
- Existing legitimate guest local play must remain usable.
- Existing authenticated sync must remain usable.
- Account-owned progress must not expose raw auth IDs, emails, tokens, private metadata, or private row data in browser-visible surfaces.

## Daily Solo And Practice Solo Constraints

- Daily Solo remains five letters, date-keyed, and claim-safe.
- Practice Solo remains 2-35 letters and locally playable as guest.
- Gameplay rules, Hard Mode behavior, GO transition behavior, reveal/coin behavior, scoring, stats, and history semantics must not be changed accidentally.
- Daily Solo and Practice Solo persistence decisions should be explicit. If Practice Solo is not repaired in the same stage, the rationale must be recorded.

## Real Browser/E2E Strategy

Phase 45 should add or expand real browser coverage where feasible:

- Use two isolated browser contexts/profiles.
- Seed a safe authenticated test account without printing secrets.
- In browser A and browser B, create distinct guest Daily Solo OG/GO partial progress.
- Sign in to the same account in each browser and verify account-owned Daily state, not browser-local guest state.
- Create signed-in Daily Solo progress, sign out, and verify the guest state does not show signed-in guesses.
- Verify cross-browser authenticated persistence after cloud sync.
- Clean up any created remote rows and auth/session artifacts without printing secrets.

If this cannot be fully automated, Stage 45 must record the limitation and provide a manual checklist that directly matches the user's repro.

## Profile Embedded Sign-In Order Constraints

- Match the Phase 44 modal order: Email + password first and active by default; Magic link second.
- Keep Magic link available.
- Preserve password reset, sign-up, and sign-in behavior.
- Do not alter Supabase auth provider configuration or redirect settings.

## Mobile Solo Responsive-Scaling Constraints

- Keep the repair narrow and gameplay-surface-specific.
- Prefer responsive sizing, containment, or viewport anchoring over broad shell/navigation redesign.
- Preserve the Stage 44 keyboard-centering behavior unless the audit proves it needs a small adjustment.
- Do not change keyboard semantics, valid-guess rules, reveal behavior, or game rules.

## Privacy And Supabase Constraints

- Do not print secrets, Supabase keys, auth tokens, private row data, raw user ids, private emails, or local session artifacts.
- Keep public/guest spectator boundaries unchanged.
- Keep Daily claim and ranked queue RLS boundaries unchanged unless a separately reviewed addendum explicitly approves a change.
- Keep browser payloads sanitized.

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

After manual review and a separate Git handoff preparation pass, the governed `brrrdle-github-backup` workflow may be invoked only if explicitly authorized. Phase 45 planning does not authorize staging, committing, pushing, PR creation, merging, branch deletion, deployment, or release.

## Risks

- The Daily Solo failure may reflect a deeper whole-progress cloud sync contract issue, not a small sign-in/sign-out bug.
- The current `progress_snapshots` whole-state merge may be too coarse for signed-in Solo progress if browser-local guest state is passed into authenticated sync.
- Repairing Daily Solo only could leave Practice Solo with the same class of bug if the root cause is shared.
- Real browser/E2E reproduction may require careful temporary-account and storage isolation.
- Mobile gameplay scaling can easily become a broad shell redesign if not kept tightly scoped.

## Open Decisions

- Can Phase 45 remain source/test-only, or does authenticated Solo progress require a storage-contract/Supabase addendum?
- Should Practice Solo cloud persistence be repaired in Phase 45 v1 or only audited and routed?
- Should any explicit guest-to-account transfer path remain, be disabled, or be redesigned later?
- What is the safest automated E2E shape for the two-browser Daily Solo boundary without exposing secrets?
- What minimum mobile viewport sizes should Phase 45 target for Solo gameplay scaling?

## Next Gated Prompt

The next safe action is to create a unified Phase 45 specification for review only. Do not begin implementation.
