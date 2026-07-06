# Phase 48 Profile And Multiplayer Contract Simplification Spec

**Status:** Draft unified specification for review only.
**Date:** 2026-07-06.
**Repository:** `brrrdle-dev`.
**Phase:** Phase 48 - Profile And Multiplayer Contract Simplification.

## Authority

This specification is governed by:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. The user-updated Phase 47 review checklist at `planning/phase-47/REVIEW-CHECKLIST.md`.
7. The Phase 48 planning brief at `planning/phase-48/PLANNING-BRIEF.md`.
8. Current roadmap, testing, Supabase, local workflow, and progress documents.

This specification does not authorize implementation. It does not authorize source/runtime edits, test edits, Supabase migration creation or execution, Supabase or Vercel configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, Elo changes, strict one-active-session/session-lease implementation, server-authoritative Daily implementation, broad mobile shell/top-tab/navigation overhaul, compact side-dock implementation, broad mobile performance overhaul, local Codex skill changes, secret printing, private data exposure, local artifact exposure, the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

## Current Baseline

- Phase 47 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `f3dab778906edc4dad6c8c34365c8354c1affb1f`.
- The user-updated Phase 47 checklist at `planning/phase-47/REVIEW-CHECKLIST.md` must be preserved.
- Phase 47 final evidence exists at `progress/PROGRESS-STEP-431.md`, `planning/phase-47/CHANGELOG.md`, and `planning/phase-47/REVIEW-CHECKLIST.md`.
- Phase 48 planning brief exists at `planning/phase-48/PLANNING-BRIEF.md`.
- Phase 48 planning progress exists at `progress/PROGRESS-STEP-432.md`.

## Phase 47 Manual Review Result

Phase 47 passed manual review. All required, optional, preserved-invariant, and review-result checklist boxes are checked. No failed Phase 47 required behavior is currently reported.

The user later reported one non-blocking real-mobile observation: page scrolling feels slightly laggy after Phase 47. The lag is noticeable but not severe, and it is not currently reported as a failed keyboard-visibility or display-boundary checklist item.

Phase 48 must classify this observation early:

- if the lag is a narrow source-only auto-scroll regression from recent mobile gameplay scrolling work, route a tiny repair before deeper Phase 48 implementation;
- if the lag is broader mobile performance, shell, tab navigation, or layout work, defer it to a later mobile polish phase or reviewed addendum.

This scroll-lag classification must not turn Phase 48 into a broad mobile shell, side-dock, or performance-overhaul phase.

## Phase Definition

Phase 48 is a planning and future implementation lane for profile/public-profile/private-profile simplification and multiplayer contract decisioning.

The central product problem is that brrrdle now has enough account, profile, public identity, private request, custom game, Daily, and ranked multiplayer surfaces that the contracts need to be simplified before more features are layered on top. Phase 48 should clarify what belongs to the current player's private account-management profile, what belongs to opt-in public profile display, what fields or UI affordances are redundant, and how private/custom/Daily/ranked multiplayer invitation paths should be routed.

Phase 48 may include small source/test implementation in later authorized stages only if it remains within those contracts. Protected changes require addendum planning first. Any migration/RLS, storage-contract, Supabase, session, server-authoritative Daily, gameplay-rule, or Elo need must stop the implementation path until a reviewed addendum is created and explicitly approved.

## Goals

- Classify the late Phase 47 mobile scroll-lag observation without broadening Phase 48 into mobile performance work.
- Audit profile, public profile, private profile, Settings, and account-management surfaces for redundant fields, confusing placement, and unclear copy.
- Decide a simpler private-current-player versus opt-in public-profile field model.
- Preserve public/private profile privacy and raw-auth/private-data boundaries.
- Clarify Profile and Settings account-management responsibilities, including Save and Sign out placement.
- Audit custom-code/custom-private game surfaces and decide whether the custom-code match type should be removed, hidden, renamed, or redesigned.
- Evaluate private Daily request feasibility without weakening Daily claim safety, answer secrecy, or UTC-day boundaries.
- Decide ranked Daily versus unranked Daily contract requirements before any ranked Daily implementation.
- Identify migration/RLS, storage-contract, Supabase, session, mobile-shell, and gameplay-rule gates early.
- Preserve all Phase 47, Phase 46, Phase 45, Phase 44, Phase 43, Phase 42, Phase 41, Phase 40, Phase 39, and Phase 38 invariants.

## In Scope

### Late Phase 47 Mobile Scroll-Lag Classification

- Read-only or narrow source/test classification of whether the slight mobile scroll lag is a recent auto-scroll regression.
- Review of `gameplayAutoCenter`, `soloGameplayAutoCenter`, mobile scroll CSS, and mobile Playwright expectations only as needed to route the issue.
- A tiny source-only preflight repair in a later implementation plan only if the root cause is clearly narrow and recent.
- Deferral if the issue is broad mobile performance, shell, tab navigation, side-dock, or layout work.

### Profile And Account-Management Simplification

- Current-player private Profile surface.
- Public profile display and opt-in public fields.
- Settings account-management controls.
- Save, Sign out, public visibility, display name, bio, flair, avatar/color, and profile preview responsibilities.
- Profile/account copy and placement decisions.
- Privacy-safe public/private field boundaries.

### Custom-Code And Private Game Contract Decisioning

- Custom-code/custom-private game entry points and match types.
- Private Practice request behavior and boundaries.
- Whether custom-code should be removed, hidden, renamed, or redesigned.
- Existing private matchmaking tests and source contracts needed for decisioning.

### Private Daily And Ranked Daily Contract Decisioning

- Private Daily request feasibility.
- Daily claim-safety routing.
- Ranked Daily versus unranked Daily separation.
- Ranked Practice preservation and competitive-integrity implications.
- Addendum gates for any protected Daily, ranked, claim, or rating contract change.

## Out Of Scope

- Source/runtime implementation during this specification gate.
- Test implementation during this specification gate.
- Supabase migration creation or execution during this specification gate.
- Vercel or Supabase configuration.
- Deployment, release, staging, commits, pushes, PRs, merges, branch deletion, or backup workflow execution.
- Broad mobile shell/top-tab/navigation overhaul.
- Compact/collapsible side dock implementation.
- Broad mobile performance overhaul.
- Configurable Home widgets or private request inbox widgets.
- Live, Active, or Home spectator preview cards.
- Notification redesign.
- Social inbox/mailbox.
- Spectator presence/count/list.
- Public/guest spectation contract changes.
- Service workers or push infrastructure.
- Strict one-active-session enforcement, session leases, forced sign-out, heartbeats, or remote session invalidation.
- Server-authoritative Daily submissions.
- Gameplay-rule changes, Daily answer-rule changes, scoring changes, or Elo changes.
- Theme proposal modernization or concrete theme work.
- Any work against the original stable `brrrdle` repository.

## Success Criteria

- The late Phase 47 mobile scroll-lag note is classified as either a narrow source-only preflight repair or later mobile performance/shell work.
- Profile/public-profile/private-profile responsibilities are explicitly separated.
- Public profile fields remain opt-in and privacy-safe.
- Private account-management controls are clearer to the current signed-in player.
- Save and Sign out placement is routed to a concrete later implementation decision.
- Custom-code/custom-private game behavior is routed to removal, hiding, renaming, redesign, or addendum planning.
- Private Daily request feasibility is evaluated without weakening Daily claim safety.
- Ranked Daily is not treated as a UI-only extension of ranked Practice.
- Ranked/unranked Daily boundaries are documented before implementation.
- Migration/RLS, storage-contract, Supabase, session, mobile-shell, and gameplay-rule gates are explicit.
- Existing private Practice request behavior remains protected.
- Phase 47 mobile Solo GO and guest/account display-boundary repairs remain protected.
- Phase 46 automatic signed-in Solo sync/freshness, no implicit guest-to-account transfer, no authenticated progress writes to guest storage, and Solo Overview Resume-only behavior remain protected.
- Daily claim safety, gameplay rules, scoring, and Elo math remain unchanged.
- Focused tests, visual review, changelog, manual checklist, and Git handoff expectations are clear for later authorized stages.

## Recommended Stage Breakdown

### Stage 48.0 - Protected Baseline, Phase 47 Intake, And Scroll-Lag Classification

Confirm repository state, stable-repo boundary, Phase 47 checklist preservation, Phase 48 planning/spec/progress artifacts, resource/process state, and baseline verification. Classify the late Phase 47 mobile scroll-lag observation before deeper profile or multiplayer contract work. If it is a narrow recent auto-scroll regression, route a tiny source/test repair early in the implementation plan. If it is broader mobile shell/performance/layout work, defer it.

### Stage 48.1 - Profile, Public Profile, And Account-Management Audit

Audit Profile, public profile, Settings, auth/account-management, public visibility, profile preview, Save, Sign out, and related tests. Identify redundant fields, confusing placement, copy issues, public/private field leakage risk, and hidden dependencies.

### Stage 48.2 - Profile Privacy And Model Simplification Decision

Decide the target model for public fields, private-current-player fields, internal-only fields, and redundant fields. Decide whether simplification can remain source/test-only or requires migration/RLS/storage-contract addendum planning.

### Stage 48.3 - Profile/Settings Account-Management Clarity Plan

Decide where Save, Sign out, password, email, public visibility, profile editing, and account safety controls should live. Preserve current auth, password reset, sign-in, sign-up, redirect, and Settings behavior unless a later implementation prompt explicitly authorizes changes.

### Stage 48.4 - Custom-Code And Private Game Contract Decision

Audit custom-code/custom-private game entry points, copy, tests, and product role. Decide whether the custom-code match type should be removed, hidden, renamed, or redesigned. Preserve private Practice request behavior and Phase 40 public profile/private matchmaking boundaries. Stop for addendum planning if the chosen direction requires invitations, inboxes, social systems, new multiplayer tables, or RLS changes.

### Stage 48.5 - Private Daily And Ranked Daily Contract Decision

Evaluate private Daily request feasibility and ranked Daily separation against Daily claim safety, answer secrecy, UTC-day boundaries, ranked/unranked labels, rating authority, spectator/public discovery boundaries, and existing Daily Multiplayer invariants. Stop for addendum planning if any protected Daily, ranked, claim, gameplay, or Elo contract must change.

### Stage 48.6 - Final Hardening, Visual Review, Changelog, And Checklist

Run focused regressions and final verification after any later authorized implementation. Run local visual handoff review for changed Profile/Settings/public-profile/custom/private/Daily/ranked surfaces. Create Phase 48 changelog and manual review checklist. Do not run Git handoff or backup workflow without a later prompt.

## Likely Files And Modules

Likely profile, public-profile, and account-management surfaces:

- `src/account/ProfilePanel.tsx`
- `src/account/ProfilePanel.test.tsx`
- `src/account/PublicProfilePage.tsx`
- `src/account/PublicProfilePage.test.tsx`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`
- `src/account/profile.ts`
- `src/account/profile.test.ts`
- `src/account/publicProfile.ts`
- `src/account/publicProfile.test.ts`
- `src/account/publicProfilePrivateMatch.ts`
- `src/account/publicProfilePrivateMatch.test.ts`
- `src/account/AuthPanel.tsx`
- `src/account/AuthModal.tsx`
- `src/account/index.ts`

Likely multiplayer contract surfaces:

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/privateMatchmaking.ts`
- `src/multiplayer/privateMatchmaking.test.ts`
- `src/multiplayer/customGames.ts`
- `src/multiplayer/customGames.test.ts`
- `src/multiplayer/dailyMultiplayer.ts`
- `src/multiplayer/matchmaking.ts`
- `src/multiplayer/rating.ts`
- `src/multiplayer/rankedQueueFairnessContract.test.ts`
- relevant private matchmaking, Daily multiplayer, ranked queue, lobby, and public leaderboard E2E tests.

Likely Supabase and documentation surfaces:

- `supabase/migrations/`
- `docs/supabase.md`
- `docs/ranked-multiplayer.md`
- `planning/phase-48/`
- `planning/specs/phase-48/`
- `planning/testing/TESTING-SUITE.md` only if durable testing expectations change.
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

Likely late mobile scroll-lag triage surfaces:

- `src/app/gameplayAutoCenter.ts`
- `src/app/games/soloGameplayAutoCenter.ts`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/index.css`
- `e2e/layout/mobile-scroll.spec.ts`

## Source-Only, Migration/RLS, Supabase, Storage, Session, Mobile, And Gameplay Gates

### Source-Only Allowed

Phase 48 work may remain source/test-only only if it is limited to:

- copy, layout, grouping, or local view-model changes;
- public/private profile display reshaping without stored-field changes;
- hiding or removing confusing UI affordances with no backend contract change;
- safe account-management placement changes that preserve auth behavior;
- custom-code/custom-private UI routing with no stored game row, queue, RLS, RPC, invitation, or rating authority change;
- narrow mobile auto-scroll regression repair if the late scroll-lag issue proves recent and bounded.

### Addendum Required

Stop and create a reviewed addendum before implementation if any Phase 48 item requires:

- a new or modified Supabase table, column, RPC, trigger, policy, grant, or view;
- changes to public/private profile data contracts;
- changed private request lifecycle contracts;
- new invitation, inbox, social, or notification delivery contracts;
- private Daily implementation or new Daily claim semantics;
- ranked Daily implementation or ranked/unranked Daily contract changes;
- server-authoritative Daily submissions;
- storage-key migration or destructive local cleanup;
- strict one-active-session/session leases, forced sign-out, heartbeats, or invalidation;
- broad mobile shell/top-tab/navigation redesign;
- compact/collapsible side dock implementation;
- broad mobile performance overhaul;
- gameplay-rule, scoring, Daily answer, timeout, forfeit, or Elo changes.

## Profile, Privacy, And Public-Profile Constraints

- Public profiles must remain opt-in and privacy-safe.
- Public display must not include auth email, raw auth IDs, account tokens, private progress, private match metadata, private settings, or local session artifacts.
- Private account-management controls may be visible to the signed-in player only.
- Current-player Profile and Settings must avoid duplicated or conflicting Save/Sign out responsibilities.
- Public profile display should expose only fields deliberately approved for public identity.
- Any profile model change must preserve Phase 40 public profile/private matchmaking boundaries.
- Raw auth identity remains a backend/auth concern, not a public or route-level display primitive.

## Private, Custom, Daily, And Ranked Multiplayer Contract Constraints

- Private Practice requests remain authenticated-only and unranked unless a later contract explicitly changes that.
- Custom-code/custom-private games should not remain visible as a confusing dead-end if they have no clear product role.
- Removing or hiding custom-code must not break existing private Practice request behavior.
- Private Daily requests must not bypass UTC-day claim safety, answer secrecy, or Daily availability rules.
- Ranked Daily must be separated from unranked Daily before any UI or backend implementation.
- Ranked Daily cannot reuse ranked Practice assumptions without a dedicated competitive-integrity review.
- Ranked/unranked labels, queue behavior, settlement, and rating behavior must stay explicit.

## Daily Claim-Safety Constraints

- Daily Multiplayer remains UTC-day keyed, answer-separated, asynchronous, and claim-safe.
- Daily Solo progress and sync boundaries from Phases 45 and 46 remain preserved.
- No private Daily or ranked Daily decision may leak current Daily answers through invitations, previews, spectator surfaces, public discovery, route state, or logs.
- Daily replay, rematch, and repeat-attempt behavior remains out of scope unless a gameplay-rule gate explicitly authorizes it.
- Server-authoritative Daily is deferred unless a later spec and addendum explicitly approve it.

## Ranked/Unranked And Elo Constraints

- Match points and Elo/rank movement remain separate.
- Phase 27 and Phase 33 ranked Practice behavior must remain intact.
- Phase 43 ranked queue fairness behavior must remain intact.
- Phase 46 automatic Solo sync must not affect rating authority.
- No Elo algorithm change is allowed in Phase 48.
- Any ranked Daily concept requires a later competitive-integrity spec before implementation.

## Late Mobile Scroll-Lag Constraints

- The scroll-lag observation is non-blocking and not a failed Phase 47 manual-review item.
- Classify before implementation builds on recent auto-scroll work.
- If narrow, repair only the auto-scroll regression source/test path and preserve existing keyboard-visibility wins.
- If broad, defer to a later mobile performance/shell phase.
- Do not implement broad mobile shell/top-tab/navigation overhaul or compact side dock in Phase 48.
- Do not degrade Phase 39 mobile scroll smoothness or Phase 47 keyboard bottom-clearance behavior.

## Preservation Requirements

Phase 48 must preserve:

- Phase 47 mobile Solo GO keyboard visibility and guest/account display-boundary repairs;
- Phase 46 automatic signed-in Solo sync/freshness, no implicit guest-to-account transfer, no authenticated progress writes to guest storage, and Solo Overview Resume-only behavior;
- Phase 45 Solo account boundaries;
- Phase 44 account-scoped repairs;
- Phase 43 ranked fairness/current-surface cleanup;
- Phase 42 stats/dashboard/help contracts;
- Phase 41 multiplayer reliability;
- Phase 40 public profile/private matchmaking boundaries;
- Phase 39 mobile scroll smoothness;
- Phase 38 public/guest spectator boundaries;
- Daily claim safety, gameplay rules, scoring rules, and Elo math.

## Verification Strategy

Planning/spec stages:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- `git status --short --branch`

Implementation stages, if later authorized:

- focused profile/privacy tests before broad suites;
- focused Profile/Settings account-management tests before broad suites;
- focused custom-code/private/Daily/ranked contract tests before broad suites;
- focused mobile scroll-lag tests only if the issue is accepted as a narrow source-only repair;
- real Supabase-backed E2E only when a multiplayer, private request, Daily, or ranked claim requires it;
- `npm run lint`;
- `npm run test`;
- focused relevant E2E/browser checks;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

Final hardening should include `npm run test:e2e` and `npm run test:full` if Phase 48 source/test work proceeds.

## Visual Handoff Review Expectations

If Phase 48 implementation changes user-visible surfaces, final visual review should capture local-only ignored artifacts under `test-results/visual-review/phase-48-stage-48-6/` or another final stage-specific ignored directory for:

- current-player Profile/Settings account-management surfaces if changed;
- public profile display if changed;
- custom/private multiplayer entry surfaces if changed;
- Daily/ranked multiplayer entry surfaces if changed;
- mobile auto-scroll surfaces only if a narrow scroll-lag repair is implemented.

These artifacts must remain ignored and must not be staged or committed.

## Manual Review Checklist Expectations

If Phase 48 implementation later completes, create `planning/phase-48/REVIEW-CHECKLIST.md` with checks for:

- public profile display remains privacy-safe;
- private/current-player profile controls are clear;
- Profile and Settings account-management responsibilities are not duplicated confusingly;
- Save and Sign out placement is understandable;
- custom-code/custom-private game behavior is removed, hidden, renamed, or given a meaningful role;
- private Practice request behavior still works;
- private Daily remains deferred or is routed through approved contract gates;
- ranked Daily remains deferred or is routed through approved competitive-integrity gates;
- Daily claim safety remains unchanged;
- ranked Practice behavior remains unchanged;
- gameplay rules and Elo math remain unchanged;
- the late scroll-lag note is either resolved narrowly or explicitly deferred.

## Risks

- Profile simplification can accidentally mix public display and private account-management concerns.
- Removing or hiding custom-code options can break tests or hidden user paths if they still have dependencies.
- Private Daily and ranked Daily concepts can weaken Daily claim safety if treated as UI-only work.
- Ranked Daily may need a different competitive-integrity model than ranked Practice.
- Migration/RLS changes may be unavoidable for clean profile or invitation contracts, requiring an addendum.
- Session leases and server-authoritative Daily are tempting anti-cheat tools but should remain deferred unless a dedicated design proves they are necessary.
- The late mobile scroll-lag note could be a real auto-scroll regression, but it could also be broader mobile browser performance. Broadening Phase 48 into mobile performance work would blur the contract-simplification scope.

## Open Decisions

- Which current profile fields are public, private-current-player, internal-only, or redundant?
- Should Save and Sign out live in Profile, Settings, or a clearer split between identity and account safety?
- Does custom-code currently have a meaningful product role, or should it be removed/hidden until redesigned?
- Are private Daily requests compatible with Daily claim safety, or should they stay deferred?
- What would ranked Daily mean relative to ranked Practice queues, Daily claims, and Elo authority?
- Can Phase 48 implementation remain source-only, or does profile/multiplayer contract simplification require a Supabase/RLS addendum?
- Is the late real-mobile scroll lag caused by recent automatic gameplay scrolling, or should it be deferred to a later mobile performance/shell polish phase?

## GitHub Backup Workflow Expectations

After Phase 48 implementation and manual checklist creation, run a separate Git handoff preparation pass before any backup workflow. A future backup prompt must:

- use an explicit allowlist of changed files;
- exclude `.env*`, `.DS_Store`, `dist/`, `node_modules/`, `supabase/.temp/`, `test-results/`, `playwright-report/`, screenshots, videos, traces, auth state, tokens, Supabase keys, Vercel tokens, local session artifacts, and local Codex skills;
- invoke `brrrdle-github-backup` only when explicitly authorized;
- preserve the stable `brrrdle` repository boundary.

## Next Gated Action

The next safe action is a detailed Phase 48 implementation plan for review only. Do not begin implementation until that plan is created and reviewed.
