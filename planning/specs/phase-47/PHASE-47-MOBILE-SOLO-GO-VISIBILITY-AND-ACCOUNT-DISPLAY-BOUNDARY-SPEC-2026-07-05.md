# Phase 47 Mobile Solo GO Visibility And Account Display Boundary Spec

**Status:** Draft unified specification for review only.
**Date:** 2026-07-05.
**Repository:** `brrrdle-dev`.
**Phase:** Phase 47 - Mobile Solo GO Visibility And Account Display Boundaries.

## Authority

This specification is governed by:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. The user-updated Phase 46 review checklist at `planning/phase-46/REVIEW-CHECKLIST.md`.
7. The Phase 47 planning brief at `planning/phase-47/PLANNING-BRIEF.md`.
8. Current roadmap, testing, Supabase, local workflow, and progress documents.

This specification does not authorize implementation. It does not authorize source/runtime edits, test edits, Supabase migration creation or execution, Supabase or Vercel configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, Elo changes, local Codex skill changes, secret printing, private data exposure, local artifact exposure, the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

## Current Baseline

- Phase 46 is complete, backed up, merged, branch-cleaned, and manually reviewed with two failed mobile GO follow-up checks.
- Expected local and remote `main`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- The user-updated Phase 46 checklist at `planning/phase-46/REVIEW-CHECKLIST.md` must be preserved.
- Phase 46 final evidence exists at `progress/PROGRESS-STEP-421.md`, `planning/phase-46/CHANGELOG.md`, and `planning/phase-46/REVIEW-CHECKLIST.md`.
- Phase 47 planning brief exists at `planning/phase-47/PLANNING-BRIEF.md`.
- Phase 47 planning progress exists at `progress/PROGRESS-STEP-422.md`.

## Manual Review Result Being Addressed

Phase 46 manual review passed overall, but two mobile GO checks failed:

- `Mobile Daily Solo GO keyboard is visible before the first valid guess`.
- `Mobile Practice Solo GO remains playable after the first valid guess`.

The user reported that mobile Daily Solo GO still auto-scrolls too high before the first guess, leaving the bottom of the on-screen keyboard clipped. The user also reported that Practice Solo GO re-entry after a submitted guess scrolls down but not far enough, and that Practice Solo GO `New go chain` may not auto-scroll enough or may not auto-scroll at all. The practical requirement is clear: mobile Solo gameplay entry and re-entry should leave the full on-screen keyboard visible and usable without requiring an extra manual scroll.

The manual review also surfaced two routing concerns:

- after sign-out, guest-visible History, leaderboard/rating summaries, Stats, and related account-specific surfaces may still display data from the just-signed-out account;
- same-account multi-tab or multi-browser sessions remain confusing, but strict one-active-session enforcement should not be assumed without stronger evidence.

## Phase Definition

Phase 47 is a focused manual-review follow-up phase for mobile Solo GO keyboard visibility and guest/account display boundaries.

Its lead problem is mobile Solo GO gameplay visibility. Phase 47 must determine whether the failed GO keyboard cases are caused by target selection, scroll timing, safe-area/browser chrome, scroll margin, GO layout density, re-entry state, or a deeper mobile gameplay scaling issue. If the repair can stay source/test-only and narrow, Phase 47 may implement it in a later authorized stage. If the evidence points to broad mobile shell navigation, a compact side dock, or a major gameplay layout overhaul, Phase 47 must stop and route that work to a separate addendum or later phase.

Its second problem is display-boundary clarity after sign-out. Phase 47 may audit and, if source-only safe, repair guest-visible account-specific surfaces that retain the just-signed-out account's History, leaderboard/rating summaries, Stats, or similar projections. It must preserve the Phase 46 signed-in Solo sync/freshness work and the Phase 45 guest/account Solo persistence boundary.

Same-account multi-tab/browser behavior should be classified and routed. Strict one-active-session enforcement, session leases, forced sign-out, heartbeats, and server-side session invalidation remain optional later security/session work unless Phase 47 evidence proves they are required now.

## Goals

- Reproduce or characterize the mobile Daily Solo GO pre-guess keyboard clipping failure.
- Reproduce or characterize the mobile Practice Solo GO new-chain and post-guess/re-entry keyboard clipping failure.
- Audit whether Daily/Practice Solo OG re-entry shares the same target or scroll-timing issue, without regressing OG behavior that already passes.
- Decide whether the mobile repair can remain source-only scroll, target, timing, safe-area, or viewport work.
- Repair mobile Solo GO keyboard visibility in a later authorized implementation stage only if the repair stays narrow.
- Preserve Phase 46 automatic signed-in Solo sync/freshness behavior.
- Preserve no implicit guest-to-account Solo transfer and no authenticated progress writes to guest storage.
- Audit signed-out guest display boundaries for History, leaderboard/rating summaries, Stats, and other account-specific surfaces.
- Decide whether signed-out display-boundary repair can remain source-only.
- Classify same-account multi-tab/browser session freshness risk without assuming one-active-session enforcement.
- Prepare verification and manual checklist expectations that directly cover the two failed real mobile GO cases.

## In Scope

### Mobile Solo GO Keyboard Visibility

- Mobile Daily Solo GO pre-guess keyboard visibility.
- Mobile Practice Solo GO `New go chain` entry behavior.
- Mobile Daily/Practice Solo GO re-entry after at least one submitted guess.
- Daily/Practice Solo OG re-entry audit only as needed to identify a common root cause.
- `gameplayAutoCenter` and `soloGameplayAutoCenter` target timing and mobile-only behavior.
- GO gameplay markup, post-guess controls, puzzle-progress content, keyboard target placement, and scroll target choice.
- CSS scroll margins, viewport sizing, mobile safe-area behavior, and back-to-top overlap.
- Playwright mobile checks and real-mobile manual review expectations.

### Source-Only Versus Broader Mobile Layout Decision

- Decide whether a small source/test repair is enough.
- Stop for addendum planning if the issue requires broad shell, top-tab navigation, compact side dock, route layout redesign, or major gameplay surface re-scaling.
- Document residual risk if the immediate repair makes the keyboard usable but does not fully solve longer-term mobile gameplay scaling.

### Guest/Account Display Boundaries

- Signed-out guest History behavior.
- Signed-out guest leaderboard and rating summary behavior.
- Signed-out guest Stats behavior.
- Other visible account-specific surfaces that may retain the just-signed-out account's projections.
- Route/cache/view-model state that can survive sign-out.
- Legitimate guest-local data preservation where applicable.

### Sync And Session Classification

- Same-account multi-tab/browser stale-session observations.
- Interaction with Phase 46 automatic signed-in Solo sync/freshness.
- Classification of whether remaining session concerns are source-only freshness issues, UX messaging issues, or later session-lease/security work.
- Preservation of manual `Sync now` as a recovery/control path.

## Out Of Scope

- Source/runtime implementation during this specification gate.
- Test implementation during this specification gate.
- Supabase migration creation or execution during this specification gate.
- Direct production or preview deployment.
- Vercel or Supabase configuration changes.
- Git staging, commit, push, PR, merge, release, branch deletion, or backup workflow execution.
- Broad mobile shell, top-tab, route navigation, or app-layout overhaul.
- Compact/collapsible side dock implementation.
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
- One-active-session enforcement unless a later reviewed addendum authorizes it.
- Server-authoritative Daily submissions.
- Gameplay-rule changes.
- Elo changes.
- Theme proposal modernization or concrete theme work.

## Success Criteria

- Mobile Daily Solo GO before the first valid guess leaves the full keyboard visible and usable without an extra manual scroll.
- Mobile Practice Solo GO `New go chain` entry leaves the full keyboard visible and usable.
- Mobile Daily/Practice Solo GO re-entry after one or more submitted guesses leaves the full keyboard visible and usable.
- The repair prioritizes full keyboard visibility over keeping all content above the keyboard visible.
- OG mobile entry/re-entry behavior is either confirmed safe or repaired if the same root cause applies.
- Desktop and tablet layouts do not regress.
- The repair does not introduce horizontal overflow, back-to-top occlusion, or input focus regressions.
- Phase 46 automatic signed-in Solo sync/freshness remains preserved.
- No implicit guest-to-account Solo transfer remains preserved.
- No authenticated progress writes to guest storage remains preserved.
- Signed-out guest display-boundary behavior is audited and either repaired source-only or routed to a reviewed addendum.
- Guests do not see the just-signed-out account's History, leaderboard/rating summaries, Stats, or account-specific projections after sign-out, except where a surface intentionally shows public aggregate data or legitimate guest-local data.
- Same-account multi-tab/browser behavior is classified without prematurely adding session leases.
- Daily claim safety, gameplay rules, scoring, and Elo math remain unchanged.
- Focused tests, relevant mobile/browser checks, final verification, visual review, changelog, and manual checklist pass before Git handoff.

## Recommended Stage Breakdown

### Stage 47.0 - Protected Baseline And Manual Review Intake

Confirm repository state, stable-repo boundary, dirty-worktree context, Phase 46 checklist preservation, Phase 47 planning/spec/progress artifacts, resource/process state, and baseline verification. Do not audit or implement source behavior in this stage.

### Stage 47.1 - Mobile Solo GO Keyboard/Viewport Audit And Reproduction

Reproduce or characterize mobile Daily Solo GO pre-guess keyboard clipping, Practice Solo GO new-chain entry behavior, and Practice/Daily Solo GO re-entry after submitted guesses. Audit OG re-entry only as needed to identify a shared target or timing problem. Inspect current auto-center helpers, OG/GO markup, CSS scroll margins, browser chrome/safe-area behavior, and mobile E2E assertions.

### Stage 47.2 - Source-Only Versus Broader Mobile Layout Decision

Record whether Stage 47.3 can remain source/test-only. If source-only is safe, define exact boundaries for target selection, scroll timing, CSS margins, safe-area handling, viewport sizing, and mobile-only behavior. If broader mobile shell or gameplay layout redesign is required, create a narrow mobile layout addendum and stop before implementation.

### Stage 47.3 - Mobile Solo GO Keyboard Visibility And Re-Entry Repair

If authorized and source-only, implement the smallest mobile Solo GO keyboard visibility repair. Cover Daily GO pre-guess, Practice GO new-chain entry, and Daily/Practice GO re-entry after submitted guesses. Preserve OG behavior that already passes, while repairing common re-entry behavior if the same root cause applies. Preserve desktop/tablet layout, Phase 46 sync/freshness behavior, and gameplay rules.

### Stage 47.4 - Guest/Account Display-Boundary Audit

Audit guest-visible History, leaderboard/rating summaries, Stats, Active/Multiplayer projections, Settings/Profile surfaces, and cached view models immediately after sign-out. Classify whether account-specific signed-out leakage is a source-only cache/view-model reset issue or requires storage/session addendum planning. Include same-account multi-tab/browser session freshness classification, while keeping strict one-active-session enforcement deferred unless evidence proves it is required.

### Stage 47.5 - Guest/Account Display-Boundary Repair Or Addendum Routing

If source-only is safe, repair the narrow signed-out display-boundary issue. Ensure guests do not see the just-signed-out account's History, leaderboard/rating summaries, Stats, or account-specific projections. Preserve legitimate guest-local history/stats where present. Stop and route to addendum planning if storage contracts, Supabase/RLS changes, destructive cleanup, or session leases are required.

### Stage 47.6 - Final Hardening, Visual Review, Changelog, And Checklist

Run focused regressions and final verification. Run real mobile/browser or Playwright mobile visual review for the failed GO cases. Create Phase 47 changelog and manual review checklist. Preserve local-only visual artifacts under ignored `test-results/visual-review/phase-47-stage-47-6/`. Do not run Git handoff or backup workflow without a later prompt.

## Likely Files And Modules

Likely mobile Solo gameplay and scroll surfaces for later authorized implementation:

- `src/app/gameplayAutoCenter.ts`
- `src/app/gameplayAutoCenter.test.ts`
- `src/app/games/soloGameplayAutoCenter.ts`
- `src/app/games/soloGameplayAutoCenter.test.ts`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/solo/SoloWorkspace.tsx`
- `src/solo/SoloWorkspace.test.tsx`
- `src/app/App.tsx`
- `src/index.css`
- `e2e/layout/mobile-scroll.spec.ts`

Likely guest/account display-boundary surfaces:

- `src/account/accountScopedProgress.ts`
- `src/account/autoProgressSync.ts`
- `src/account/sync.ts`
- `src/account/syncStatus.ts`
- `src/account/guestStorage.ts`
- `src/account/storageSchema.ts`
- `src/account/Settings.tsx`
- `src/account/PublicProfilePage.tsx`
- `src/app/App.tsx`
- `src/history/HistoryWorkspace.tsx`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/stats/StatsDashboard.tsx`
- relevant account-boundary, history, leaderboard, stats, sign-out, route/cache, and E2E fixture tests.

Likely docs/progress surfaces:

- `planning/phase-47/`
- `planning/specs/phase-47/`
- `planning/testing/TESTING-SUITE.md` only if new durable mobile or account-boundary E2E expectations are added.
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

## Source-Only, Storage-Contract, Supabase/RLS, And Session-Lease Gates

Phase 47 mobile work may remain source-only only if:

- changes are limited to scroll targets, scroll timing, focus behavior, CSS margins, safe-area handling, viewport sizing, or mobile-only layout constraints;
- no storage schema, Supabase, RLS, or deployment/configuration change is required;
- no gameplay input semantics or answer/guess rules change;
- no broad shell/top-tab/navigation or side-dock implementation is needed.

Phase 47 display-boundary work may remain source-only only if:

- the issue is caused by component props, local view models, cache invalidation, account-scope checks, sign-out rehydration, or route state;
- legitimate guest-local data can remain visible while account-owned data is hidden or cleared from guest surfaces;
- no destructive local cleanup, cloud data mutation, RLS policy change, new table, new RPC, or session lease is required.

Stop and create a reviewed addendum if evidence requires:

- a new Supabase table, RPC, or RLS policy;
- a changed `progress_snapshots` contract;
- storage-key migration or destructive local cleanup;
- server-authoritative Daily submissions;
- strict one-active-session enforcement, session leases, forced sign-out, or remote session invalidation;
- broad mobile shell or gameplay layout redesign;
- gameplay-rule or Elo changes.

## Mobile Viewport, Scroll, And Keyboard Constraints

- On mobile, full keyboard visibility is the non-negotiable success criterion.
- It is acceptable for some content above the keyboard to be offscreen if that is necessary to keep the keyboard fully usable.
- The scroll repair must account for real mobile browser chrome and safe-area behavior, not only desktop emulation.
- GO-specific puzzle-progress content must not shift the target so high that the keyboard clips.
- Re-entry into an active GO chain after submitted guesses must use a target that reflects the current playable surface.
- Back-to-top controls must not occlude the keyboard or primary input path.
- Desktop and tablet should remain visually stable.
- The phase may document longer-term mobile gameplay scaling needs, but must not implement a broad shell or navigation redesign.

## Account/Guest Display-Boundary Constraints

- Guest-visible surfaces should show guest-local data, public aggregate data, or safe empty states.
- Guest-visible surfaces must not show private account-owned History, leaderboard/rating summaries, Stats, active projections, or settings from the just-signed-out account.
- Sign-out should clear or rehydrate account-derived view state before guest surfaces render account-specific data.
- Phase 46 automatic signed-in Solo sync must not be weakened.
- Phase 45 Solo account-boundary repairs must not be weakened.
- No implicit guest-to-account transfer may be reintroduced.
- No authenticated progress may be written to guest storage.

## Sync And Session Freshness Constraints

- Same-account multi-tab/browser behavior should be classified as freshness, UX, security, or storage-contract risk.
- Manual `Sync now` remains available as a recovery/control path.
- Strict one-active-session enforcement remains deferred unless evidence proves it is required now.
- Any later session-lease design must consider stale locks, mobile backgrounding, network loss, unsynced local work, and recovery UX.
- Phase 47 should avoid mixing session-lease design into mobile keyboard or display-boundary repairs.

## Privacy And Supabase Constraints

- Do not print Supabase keys, access tokens, auth state, cookies, private row payloads, local session artifacts, screenshots containing private data, or credential-shaped values.
- Browser checks must use sanitized/non-printing evidence.
- No migration or RLS change is authorized by this specification.
- Direct table grants, browser-visible payload boundaries, and public/guest spectator boundaries must remain protected.
- Public aggregate site stats may remain public; private account-owned data must not leak to signed-out guest surfaces.

## Verification Expectations

Each implementation stage should run focused checks first, then the broader gate required by that stage. Expected final Phase 47 verification includes:

- focused mobile Solo GO keyboard/scroll tests;
- focused account display-boundary/sign-out tests if Stage 47.5 performs source changes;
- relevant Playwright mobile checks for Daily GO pre-guess, Practice GO new-chain, and GO re-entry after submitted guesses;
- public/guest spectator non-regression where affected routes or account state are touched;
- Daily/ranked/gameplay/Elo non-regression where affected helpers are touched;
- Phase 46 automatic Solo sync/freshness non-regression;
- Phase 45 Solo account-boundary non-regression;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e` during final hardening;
- `npm run test:full` during final hardening;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

## Visual Review Expectations

The final visual handoff review should include local-only ignored artifacts under `test-results/visual-review/phase-47-stage-47-6/`.

At minimum, visual or browser review should cover:

- mobile Daily Solo GO before first guess with the full keyboard visible;
- mobile Practice Solo GO new-chain entry with the full keyboard visible;
- mobile Practice Solo GO re-entry after at least one submitted guess with the full keyboard visible;
- mobile Daily Solo GO re-entry after at least one submitted guess with the full keyboard visible;
- representative mobile OG behavior to prove no regression;
- signed-out guest History/Leaderboard/Stats display-boundary state if Stage 47.5 changes visible behavior.

## Manual Review Checklist Expectations

The Phase 47 manual checklist should include explicit checks for:

- Mobile Daily Solo GO keyboard is fully visible before the first valid guess.
- Mobile Practice Solo GO `New go chain` auto-scrolls to a fully usable keyboard.
- Mobile Daily Solo GO remains usable after re-entry with at least one submitted guess.
- Mobile Practice Solo GO remains usable after re-entry with at least one submitted guess.
- Mobile OG entry/re-entry remains usable.
- Back-to-top does not cover the keyboard.
- No horizontal overflow appears on the tested mobile viewport.
- Signed-out guest History does not show the just-signed-out account's private history.
- Signed-out guest leaderboard/rating summaries do not show the just-signed-out account's rating details.
- Signed-out guest Stats do not show the just-signed-out account's private stats.
- Phase 46 automatic signed-in Solo sync still works.
- No guest-to-account Solo transfer regression appears.
- Daily claim safety, gameplay rules, and Elo math are unchanged.

## Risks

- Desktop browser mobile emulation may pass while real mobile browser chrome still clips the keyboard.
- GO puzzle-progress content may make target positioning more fragile than OG.
- A one-offset fix may pass fresh entry but fail re-entry after submitted guesses.
- Extra bottom spacing may solve keyboard clipping but worsen excessive scrolling or hide too much context.
- Guest/account display-boundary repair could accidentally hide legitimate guest-local data.
- Sign-out display repair could weaken Phase 46 sync/freshness if account state is cleared too aggressively.
- Same-account session concerns could expand into a session-lease feature if not kept classified and deferred.

## Open Decisions

- Is the GO keyboard failure primarily target timing, scroll target choice, scroll margin, safe-area/browser chrome, GO layout density, or broader mobile scaling?
- Should mobile auto-scroll always target the keyboard container rather than the broader gameplay surface for playable Solo entry/re-entry?
- Should final mobile checks require a stronger keyboard visibility threshold than the current Playwright assertions?
- Which signed-out surfaces currently show account-owned data, and are they driven by props, local caches, route state, or persisted storage?
- Can signed-out display-boundary repair remain source-only?
- Should same-account multi-tab/browser behavior remain a Phase 46 freshness follow-up, or does it need a later session-lease addendum?

## Next Gated Action

The next safe action is a detailed Phase 47 implementation plan for review only.

The implementation plan should preserve this staged order:

1. Stage 47.0 protected baseline and manual-review intake.
2. Stage 47.1 mobile Solo GO keyboard/viewport audit and reproduction.
3. Stage 47.2 source-only versus broader mobile layout decision.
4. Stage 47.3 mobile Solo GO keyboard visibility and re-entry repair, only if source-only is safe.
5. Stage 47.4 guest/account display-boundary audit.
6. Stage 47.5 guest/account display-boundary repair or addendum routing.
7. Stage 47.6 final hardening, visual review, changelog, and manual checklist.

No implementation should begin until that detailed implementation plan is reviewed and a later execution prompt authorizes a specific stage.
