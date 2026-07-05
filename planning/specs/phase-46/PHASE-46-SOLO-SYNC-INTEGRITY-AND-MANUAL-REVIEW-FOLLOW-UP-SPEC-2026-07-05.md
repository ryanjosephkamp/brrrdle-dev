# Phase 46 Solo Sync Integrity And Manual Review Follow-Up Spec

**Status:** Draft unified specification for review only.
**Date:** 2026-07-05.
**Repository:** `brrrdle-dev`.
**Phase:** Phase 46 - Solo Sync Integrity And Manual Review Follow-Up.

## Authority

This specification is governed by:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. The user-updated Phase 45 review checklist at `planning/phase-45/REVIEW-CHECKLIST.md`.
7. The Phase 46 planning brief at `planning/phase-46/PLANNING-BRIEF.md`.
8. Current roadmap, testing, Supabase, local workflow, and progress documents.

This specification does not authorize implementation. It does not authorize source/runtime edits, test edits, Supabase migration creation or execution, Supabase or Vercel configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, Elo changes, local Codex skill changes, secret printing, private data exposure, local artifact exposure, the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

## Current Baseline

- Phase 45 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `aef8dba063e57cd5381852a66b9a0006fe52bf39`.
- The user-updated Phase 45 checklist at `planning/phase-45/REVIEW-CHECKLIST.md` must be preserved.
- Phase 45 final evidence exists at `progress/PROGRESS-STEP-411.md`, `planning/phase-45/CHANGELOG.md`, and `planning/phase-45/REVIEW-CHECKLIST.md`.
- Phase 46 planning brief exists at `planning/phase-46/PLANNING-BRIEF.md`.
- Phase 46 planning progress exists at `progress/PROGRESS-STEP-412.md`.

## Manual Review Result Being Addressed

Phase 45 manual review passed. The user reported three follow-up observations:

- Cross-browser signed-in Daily Solo persistence works as intended only after the account progress is manually synced.
- Same-account multi-tab or multi-browser Solo Daily/Practice play can create stale local account state and may allow Daily Solo cheating if users explore answers in one tab before syncing another.
- The Solo Overview active-game `Select` button appears to only highlight or persist a selected active Solo card without a meaningful game action.
- Mobile Solo Daily/Practice pre-guess auto-scroll can leave the on-screen keyboard cut off at the bottom, while post-guess playability passes.

Phase 46 treats the sync/freshness problem as the lead risk. The UI follow-ups are included only because they are small, current Solo-surface issues and can be staged behind the sync decision.

## Phase Definition

Phase 46 is a signed-in Solo progress freshness and manual-review follow-up phase.

Its anchor is making authenticated Solo Daily and Practice progress behave more like account-owned cloud progress during ordinary play, without weakening Phase 45's guest/account separation. The phase must determine whether automatic signed-in Solo sync can be implemented safely with the existing `progress_snapshots` contract or whether a reviewed storage-contract/Supabase addendum is required first.

The phase must explicitly evaluate one-active-session enforcement but must not assume it is the first or best solution. Strict one-active-session behavior is a session-lease/security feature with stale-lock, mobile-backgrounding, network-loss, and unsynced-progress recovery risks. It remains later optional work unless audit evidence proves it is needed now.

## Goals

- Audit signed-in Solo Daily/Practice sync, hydration, focus/visibility refresh, same-account tab/browser behavior, and manual `Sync now` behavior.
- Decide whether automatic signed-in Solo sync can remain source/test-only.
- Reduce stale cross-browser and cross-tab signed-in Solo progress.
- Preserve Phase 45's prevention of implicit guest-to-account Solo progress transfer.
- Preserve Phase 45's prevention of account-owned Solo progress appearing as guest progress after sign-out.
- Preserve existing authenticated cross-browser loading through `progress_snapshots`.
- Define the safest anti-cheat path for Daily Solo without changing gameplay rules.
- Remove the Solo Overview `Select` button if it has no meaningful function, or define a narrow tested function if it should remain.
- Repair mobile Solo pre-guess keyboard visibility without broad mobile shell or top-tab navigation overhaul.
- Add focused automated and manual review coverage for the selected behavior.

## In Scope

### Signed-In Solo Sync And Freshness

- `progress_snapshots` download/upload behavior.
- Manual `Sync now` flow.
- Authenticated load/hydration through `loadAuthenticatedProgressForScope`.
- Signed-in Solo Daily and Practice resume slot capture behavior.
- Signed-in Solo Daily and Practice valid-guess progress capture and persistence.
- Focus, visibility, route-entry, tab, or browser-context refresh strategy if source-only.
- Same-browser cross-tab coordination through browser-local mechanisms if safe.
- Safe conflict/merge behavior for signed-in Solo progress.

### Source-Only Versus Storage-Contract Decision

- Decide whether existing `progress_snapshots` can support automatic signed-in Solo sync safely.
- Stop for addendum planning if new schema, RPCs, RLS policies, server-side conflict handling, or session leases are needed.
- Document residual risk if a source-only repair improves freshness but does not provide server-authoritative Daily anti-cheat.

### Guest/Account Boundary Preservation

- Guest state remains local and guest-owned.
- Authenticated state remains account-owned.
- Sign-in must not implicitly upload guest Solo progress to the account.
- Sign-out must not leave account-owned Solo progress visible in guest surfaces.
- Manual or automatic sync must not reintroduce Phase 44 or Phase 45 boundary failures.

### Solo Overview Select Button Decision

- Audit whether the active-game `Select` button has any hidden routing, accessibility, or selection use beyond card highlighting and auto-centering.
- Remove the button and selected-card affordance if it has no meaningful game function.
- If retained, give it a clear function and test it.
- Preserve the Resume/Open action as the primary game entry path.

### Mobile Solo Pre-Guess Keyboard Visibility

- Audit Daily Solo and Practice Solo on narrow mobile viewports before the first valid guess.
- Repair only the pre-guess keyboard visibility/scroll issue if safe.
- Preserve Phase 45.6 post-guess keyboard/context playability.
- Preserve desktop and tablet layout.

## Out Of Scope

- Source/runtime implementation during this specification gate.
- Test implementation during this specification gate.
- Supabase migration creation or execution during this specification gate.
- Direct production or preview deployment.
- Vercel or Supabase configuration changes.
- Git staging, commit, push, PR, merge, release, branch deletion, or backup workflow execution.
- Broad mobile shell, top-tab, route navigation, or app-layout overhaul.
- Configurable Home widgets.
- Private request inbox widgets.
- Live, Active, or Home spectator preview cards.
- UTC/local timestamp policy changes.
- Notification redesign, notification rival-name, or ranked-context work.
- Profile/data-contract simplification.
- Admin queue/lobby observability dashboard.
- Social inbox/mailbox.
- Spectator presence/count/list.
- Public/guest spectation contract changes.
- Service workers or push infrastructure.
- Gameplay-rule changes.
- Elo changes.
- Theme proposal modernization or concrete theme work.

## Success Criteria

- Signed-in Solo Daily progress does not depend on the user remembering manual sync for ordinary cross-browser freshness within the selected contract.
- Signed-in Practice Solo progress is either automatically synced through a safe path or explicitly documented as lower-risk and deferred with evidence.
- Same-account multi-tab/browser behavior is reproduced or characterized and either repaired source-only or routed to a storage/session addendum.
- Automatic sync does not silently merge guest-origin Solo progress into authenticated account progress.
- Automatic sync does not leave authenticated account progress visible as guest progress after sign-out.
- Existing `progress_snapshots` cross-browser authenticated loading remains preserved.
- Daily Solo fixed-five behavior, Daily answer selection, Daily claim safety, gameplay rules, scoring, and Elo math remain unchanged.
- The Solo Overview `Select` button is either removed or has a meaningful, tested function.
- Mobile Solo pre-guess keyboard visibility is improved without broad mobile navigation redesign.
- Phase 45 Daily/Practice Solo account-boundary repairs remain preserved.
- Phase 44 account-scoped local-state repairs remain preserved.
- Phase 43 ranked fairness and current-surface cleanup remain preserved.
- Phase 42 stats/dashboard/help contracts remain preserved.
- Phase 41 multiplayer reliability remains preserved.
- Phase 40 public profile/private matchmaking boundaries remain preserved.
- Phase 39 mobile scroll smoothness remains preserved.
- Phase 38 public/guest spectator boundaries remain preserved.

## Recommended Stage Breakdown

### Stage 46.0 - Protected Baseline And Manual Review Intake

Confirm repository state, stable-repo boundary, dirty-worktree context, Phase 45 checklist preservation, Phase 46 planning/spec/progress artifacts, resource/process state, and baseline verification. Do not audit or implement source behavior in this stage.

### Stage 46.1 - Solo Sync And Session Freshness Audit

Read account sync, `progress_snapshots`, authenticated hydration, guest storage, resume-slot, Daily/Practice Solo, same-tab/browser, mobile auto-center, and relevant tests. Reproduce or characterize stale signed-in Solo cross-tab/cross-browser behavior where feasible. Decide whether automatic sync appears source-only or needs addendum planning.

### Stage 46.2 - Source-Only Versus Storage-Contract/Session-Lease Decision

Record the safest repair path. If source-only is safe, define exact sync triggers, conflict handling, account/guest boundaries, and verification. If not, create a storage-contract/Supabase/session-lease addendum and stop before implementation.

### Stage 46.3 - Automatic Signed-In Solo Sync And Freshness Repair

If authorized and source-only, implement the smallest sync/freshness repair. Likely candidates include Daily Solo sync after valid signed-in progress capture, debounced Practice Solo sync if safe, focus/visibility route refresh, and same-browser tab freshness signaling. Preserve guest/account boundaries.

If Stage 46.2 proves a storage/RLS/session gap, Stage 46.3 must instead execute only the separately approved addendum path and must not mix SQL/RLS work with source/UI integration.

### Stage 46.4 - Solo Overview Select Button Cleanup

Audit final selected-state usage. Remove the low-value `Select` button if it has no meaningful function, or implement a narrow tested function if the spec decision says to keep it. Preserve direct resume/open behavior.

### Stage 46.5 - Mobile Solo Pre-Guess Keyboard Visibility

Repair the narrow pre-guess mobile keyboard clipping issue for Daily and Practice Solo. Preserve post-guess playability, desktop layout, and existing mobile scroll performance work.

### Stage 46.6 - Final Hardening, Visual Review, Changelog, And Checklist

Run focused regressions, feasible E2E/browser checks, final verification, visual handoff review, changelog, manual review checklist, progress update, and final report. Do not run Git handoff or backup workflow without a later prompt.

## Likely Files And Modules

Likely source surfaces for later authorized implementation:

- `src/account/sync.ts`
- `src/account/sync.test.ts`
- `src/account/syncStatus.ts`
- `src/account/accountScopedProgress.ts`
- `src/account/accountScopedProgress.test.ts`
- `src/account/guestStorage.ts`
- `src/account/guestTransfer.ts`
- `src/account/resumeSlot.ts`
- `src/account/storageSchema.ts`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`
- `src/app/App.tsx`
- `src/app/navigationState.ts`
- `src/app/gameplayAutoCenter.ts`
- `src/app/gameplayAutoCenter.test.ts`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/app/games/dailyAccountBoundary.test.tsx`
- `src/app/games/practiceAccountBoundary.test.tsx`
- `src/solo/SoloWorkspace.tsx`
- `src/solo/SoloWorkspace.test.tsx`
- `src/game/storage/dailyOgStorage.ts`
- `src/game/storage/dailyGoStorage.ts`
- `src/index.css`
- `e2e/fixtures/`
- `e2e/layout/mobile-scroll.spec.ts`

Likely docs/progress surfaces:

- `planning/phase-46/`
- `planning/specs/phase-46/`
- `planning/testing/TESTING-SUITE.md` if new durable sync/E2E coverage is added.
- `docs/supabase.md` only if a reviewed storage-contract/Supabase addendum changes the cloud contract.
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

Likely Supabase surfaces only if separately authorized:

- `supabase/migrations/`
- existing `progress_snapshots` policies and grants;
- a new reviewed authenticated Solo progress RPC or table if source-only sync is insufficient.

## Storage-Contract, Migration/RLS, And Supabase Gates

Phase 46 may remain source-only only if:

- existing `progress_snapshots` can safely support automatic signed-in Solo upload/download behavior;
- automatic sync can preserve account ownership without new RLS policies, tables, columns, or RPCs;
- merge/conflict behavior can prevent stale local progress from overwriting newer cloud progress;
- guest-origin progress remains excluded from authenticated upload unless a separately reviewed explicit transfer path is authorized;
- Daily Solo anti-cheat can be improved enough without server-authoritative move submission.

A storage-contract/Supabase addendum is required if:

- Daily Solo needs server-authoritative move submission or atomic conflict prevention;
- `progress_snapshots` needs new revision fields, row locks, server-side merge helpers, or policy changes;
- a new authenticated Solo progress table or RPC is needed;
- browser clients would need direct access to private progress tables;
- strict one-active-session enforcement requires server-side leases, heartbeats, invalidation, or forced sign-out;
- any repair needs a storage-key migration, destructive cleanup, or changed guest-to-account transfer semantics.

No migration should be created or applied without a separate explicit prompt.

## Sync And Session Recommendation

Phase 46 should not begin by enforcing one active signed-in session.

Recommended sequence:

1. Audit and characterize the cheating/staleness risk.
2. Try source-only automatic signed-in Solo freshness through existing cloud progress paths if safe.
3. Add focus/visibility/route-entry refresh and same-browser tab signaling if it improves stale state without a database contract change.
4. Stop for storage/Supabase addendum planning if strong anti-cheat requires server authority.
5. Route one-active-session enforcement to a later session-lease/security feature unless the audit proves it is required for the Phase 46 goal.

Reasons to defer one-active-session enforcement by default:

- stale session locks can trap users after closing a tab or losing network;
- mobile browsers background and suspend pages unpredictably;
- forced sign-out can lose unsynced local state unless the sync contract is already reliable;
- multiplayer already uses cloud-submitted turns and does not share the same stale-local Solo risk;
- Daily anti-cheat may be better solved with server-authoritative Daily Solo move acceptance than with fragile client session locks.

## Account, Guest, And Cloud Persistence Constraints

- Guest state remains local to the browser unless an explicit transfer path is reviewed and approved.
- Authenticated state must be scoped to the signed-in user.
- Sign-in must not upload guest Solo guesses to the account by default.
- Sign-out must rehydrate guest-safe state.
- Automatic sync must not overwrite newer cloud progress with stale local progress.
- Cloud load failure must fail safely and visibly rather than adopting guest guesses as account progress.
- Manual sync must remain available as a recovery path.
- Any sync status messaging must avoid private account data.

## Daily Solo And Practice Solo Constraints

- Daily Solo remains fixed-five and date-keyed.
- Daily answer selection, validation, streak, stats, and completion rules must not change.
- Practice Solo remains 2-35 letters with existing OG/GO and Hard Mode behavior.
- Practice Solo authenticated seed behavior must remain account-specific.
- Economy, reveal/continue behavior, XP, coins, history, and stats must remain compatible with prior phases.

## Solo Overview Select Button Constraints

Current evidence indicates the Solo Overview active-game `Select` button:

- changes the card selected state and label to `Selected`;
- stores `selectedSoloGameKey`;
- saves navigation state;
- requests Solo gameplay auto-centering;
- does not open or resume the game.

Phase 46 should remove it unless audit evidence shows a meaningful hidden function. If retained, the function must be obvious to users, tested, and not duplicate the Resume/Open action.

## Mobile Solo Keyboard Visibility Constraints

The mobile follow-up is narrow:

- pre-guess Daily Solo and Practice Solo keyboard visibility;
- route/subtab auto-scroll and initial viewport positioning;
- real mobile or mobile viewport checks where feasible.

It must preserve:

- Phase 45.6 post-guess keyboard/context visibility;
- Phase 39 mobile scroll smoothness;
- desktop layout;
- gameplay input semantics.

It must defer:

- broad mobile shell/top-tab/navigation overhaul;
- Focus Mode;
- compact navigation;
- major app-shell restructuring.

## Privacy And Security Constraints

- Do not print or commit Supabase keys, Vercel tokens, auth tokens, raw account emails, raw auth ids, service-role secrets, private row data, screenshots with private data, videos, traces, auth state, local session artifacts, or hidden environment values.
- Browser/E2E work should use safe test accounts and non-secret logs.
- Any Supabase probe must be non-printing and field-allowlisted.
- Public profile privacy, private matchmaking boundaries, public/guest spectator boundaries, Daily claim safety, ranked queue fairness, and admin/dashboard contracts must remain unchanged.

## Verification Expectations

Planning/spec stages:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Protected baseline stage:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- repository hygiene checks
- watched-port/process cleanup checks for `5173`, `5174`, `3000`, and `4173`

Implementation stages:

- focused tests first;
- focused account sync and Daily/Practice Solo persistence tests;
- focused same-account tab/browser tests where feasible;
- focused mobile Playwright check for pre-guess keyboard visibility where feasible;
- `npm run lint`;
- `npm run test`;
- focused relevant Playwright/E2E if needed;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- repository hygiene checks.

Final stage:

- focused regression set;
- feasible targeted E2E;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run test:full` for the complete phase if source behavior changed;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- diff, CSV, secret/artifact, ignored-artifact, watched-port, and status checks;
- visual handoff review and manual checklist when authorized.

## Visual Review Expectations

If Phase 46 changes visible Solo surfaces, final visual review should include:

- Solo Overview active games after the `Select` button decision;
- mobile Daily Solo pre-guess keyboard visibility;
- mobile Practice Solo pre-guess keyboard visibility;
- mobile post-guess Solo smoke to protect Phase 45.6;
- desktop Solo smoke to protect layout density.

Artifacts must remain local-only and ignored under `test-results/visual-review/`.

## Manual Checklist Expectations

Phase 46 final checklist should include:

- signed-in Daily Solo progress freshness across two browser profiles after normal play;
- signed-in Practice Solo progress freshness if implemented;
- same-account two-tab behavior;
- guest-to-account transfer remains blocked;
- account-to-guest leakage remains blocked after sign-out;
- manual `Sync now` remains available and understandable;
- Solo Overview active-game controls are simpler or demonstrably meaningful;
- mobile pre-guess keyboard is reachable on a real mobile device or narrow viewport;
- Phase 45 account-boundary repairs remain intact;
- Daily claim safety, gameplay rules, and Elo math remain unchanged.

## Risks

- Automatic sync can overwrite newer cloud progress if conflict/revision behavior is weak.
- Per-guess sync can increase network load if not scoped and debounced.
- Same-account two-tab divergence may require a stronger contract than source-only sync can safely provide.
- Client-side sync alone may reduce but not eliminate Daily Solo cheating.
- Server-authoritative Daily Solo submissions would be a larger storage/RLS contract and must be separately reviewed.
- One-active-session enforcement can create stale locks or lost-progress failure modes.
- Mobile browser viewport and keyboard behavior varies by browser chrome, device, and address-bar state.

## Open Decisions

- Should Daily Solo sync after each valid signed-in guess, after every resume capture, on debounce, on route exit, on visibility change, or through a hybrid strategy?
- Should Practice Solo use the same automatic sync cadence as Daily Solo, a lower-frequency cadence, or remain manual after explicit documentation?
- What conflict rule should apply when two same-account tabs produce divergent signed-in Solo progress before syncing?
- Can existing `progress_snapshots` safely support automatic sync without schema/RLS changes?
- Is server-authoritative Daily Solo move acceptance required for meaningful anti-cheat?
- Should one-active-session enforcement remain deferred, or does audit evidence require a session-lease addendum?
- Should `selectedSoloGameKey` persist after removing the `Select` button, or should active Solo selection become purely derived from resume/open/navigation?
- What mobile scroll target best prevents pre-guess keyboard clipping without harming post-guess or desktop behavior?

## Next Gated Action

The next safe gate is a detailed Phase 46 implementation plan for review only. The plan should translate this specification into narrow staged execution, including Stage 46.0 protected baseline, Stage 46.1 sync/session audit, Stage 46.2 source-only versus storage/Supabase/session decision, Stage 46.3 automatic sync repair or addendum routing, Stage 46.4 Solo Overview `Select` cleanup, Stage 46.5 mobile pre-guess keyboard visibility, and Stage 46.6 final hardening, visual review, changelog, and manual checklist.
