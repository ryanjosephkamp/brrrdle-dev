# Phase 49 Progression HUD, Focus Mode, And Mobile UX Shell Polish Spec

**Status:** Draft unified specification for review only.
**Date:** 2026-07-06.
**Repository:** `brrrdle-dev`.
**Phase:** Phase 49 - Progression HUD, Focus Mode, And Mobile UX Shell Polish.

## Authority

This specification is governed by:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. The user-updated Phase 48 review checklist at `planning/phase-48/REVIEW-CHECKLIST.md`.
7. The Phase 49 planning brief at `planning/phase-49/PLANNING-BRIEF.md`.
8. Current roadmap, testing, Supabase, local workflow, and progress documents.

This specification does not authorize implementation. It does not authorize source/runtime edits, test edits, Supabase migration creation or execution, storage schema changes, Supabase or Vercel configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, private Daily implementation, ranked Daily implementation, spectator presence/count/list, service workers, push infrastructure, strict one-active-session/session-lease implementation, server-authoritative Daily implementation, gameplay-rule changes, Elo changes, broad mobile shell/top-tab/navigation overhaul, compact side-dock implementation, broad theme modernization, concrete theme implementation, local Codex skill changes, secret printing, private data exposure, local artifact exposure, the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

## Current Baseline

- Phase 48 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `07fd0e0d8acb8244b7779fc7f0cce46bf0424db4`.
- The user-updated Phase 48 checklist at `planning/phase-48/REVIEW-CHECKLIST.md` must be preserved.
- Phase 48 final evidence exists at `progress/PROGRESS-STEP-442.md`, `planning/phase-48/CHANGELOG.md`, `planning/phase-48/REVIEW-CHECKLIST.md`, and the private Daily/ranked Daily addendum under `planning/specs/phase-48/`.
- Phase 49 planning brief exists at `planning/phase-49/PLANNING-BRIEF.md`.
- Phase 49 planning progress exists at `progress/PROGRESS-STEP-443.md`.

## Phase 48 Manual Review Result

Phase 48 passed manual review. All required, optional, preserved-invariant, and review-result checklist boxes were reported checked. No failed Phase 48 manual-review item is currently reported.

Phase 49 can begin as the next planning lane because Phase 48 resolved the profile/account-management and multiplayer contract cleanup that would otherwise have made shell/progression work harder to reason about.

## Phase Definition

Phase 49 is a planning and future implementation lane for late shell polish around existing progression visibility, Focus Mode feasibility, and compact/mobile UX shell decisioning.

The central product problem is that brrrdle now has mature enough account, profile, Solo, Multiplayer, Stats, and mobile display boundaries that it can start deciding how much progression and resource information belongs in the top-level shell, and whether gameplay should have a calmer Focus Mode. The phase must remain careful because progression resources are real player-state data and shell changes affect every route.

Phase 49 must not invent new economy mechanics. It may plan display of existing XP, level, coins, consumables, and related resource state only after auditing the current product meaning and account/guest ownership boundaries. Focus Mode must be treated as UI-shell behavior, not gameplay. Compact navigation must be treated as a bounded polish path, not a broad mobile redesign or side-dock implementation unless a later addendum explicitly authorizes that direction.

## Goals

- Audit existing progression, economy, consumable, Pay-to-Continue, reveal-answer, Stats, and Settings resource surfaces.
- Decide whether a top-level progression/resource HUD is useful now, and which existing values are safe and meaningful to display.
- Keep any resource HUD display-only unless a later addendum explicitly approves deeper economy or storage changes.
- Audit Focus Mode feasibility as a player-toggleable way to reduce nonessential shell chrome during gameplay.
- Decide whether Focus Mode can remain source-only and session-local, or whether persistence requires a storage-contract addendum.
- Audit compact/mobile shell navigation options while preserving route discoverability, accessibility, safe-area behavior, keyboard visibility, and gameplay readability.
- Decide source-only versus storage/mobile-shell addendum gates before implementation.
- Preserve Phase 48 Profile/Settings clarity, custom-code hiding/legacy handling, private Daily/ranked Daily addendum routing, Phase 47 mobile/display-boundary repairs, Phase 46 Solo sync/freshness protections, Phase 45 Solo account boundaries, Phase 44 account-scoped repairs, Phase 43 ranked fairness, Daily claim safety, gameplay rules, and Elo math.

## In Scope

### Progression HUD And Resource Visibility

- Existing XP, level, coins, consumables, and resource-derived display state.
- Existing progression math in `src/progression/`.
- Existing account/guest progress state and sync boundaries.
- Existing Stats selectors such as XP progress and coin trends.
- Existing Pay-to-Continue and reveal-answer costs, only as protected inputs to display decisions.
- Header/topbar/shell placement decisions for display-only counters.

### Focus Mode Feasibility

- Whether Focus Mode should be session-only at first or persisted.
- What nonessential shell chrome can be reduced during gameplay without hiding required controls.
- Recovery paths for navigation, account controls, Settings, Help, and route switching.
- Reduced-motion, focus-visible, and keyboard accessibility behavior.
- Source-only versus storage-contract decisioning for any future preference.

### Compact/Mobile UX Shell Polish

- Current top-level shell, route rail/dock, primary navigation, Back-to-top behavior, mobile scroll harness, and gameplay route entry.
- Compact navigation as a bounded mobile/shell polish idea.
- Whether the compact/collapsible side-dock concept belongs to a later broad mobile shell phase.
- Visual review and manual checklist expectations for shell/navigation surfaces.

## Out Of Scope

- Source/runtime implementation during this specification gate.
- Test implementation during this specification gate.
- New economy mechanics, new earnable resources, collectibles, marketplace behavior, or monetization changes.
- Changes to reward amounts, coin costs, XP formulas, Pay-to-Continue costs, reveal-answer costs, level math, Daily claim behavior, gameplay rules, scoring, or Elo.
- Supabase migration creation or execution.
- Storage schema changes without a later addendum.
- Supabase or Vercel configuration.
- Deployment, release, staging, commits, pushes, PRs, merges, branch deletion, or backup workflow execution.
- Private Daily implementation or ranked Daily implementation.
- Strict one-active-session/session leases.
- Server-authoritative Daily submissions.
- Service workers or push infrastructure.
- Spectator presence/count/list.
- Public/guest spectation contract changes.
- Social inbox/mailbox.
- Configurable Home widgets or private request inbox widgets.
- Notification redesign.
- Broad mobile shell/top-tab/navigation overhaul.
- Compact/collapsible side-dock implementation beyond later explicit approval.
- Broad theme proposal modernization or concrete theme implementation.
- Any work against the original stable `brrrdle` repository.

## Success Criteria

- Phase 48 manual review and checklist state remain preserved.
- Existing progression resources are mapped to their current product meaning and ownership boundaries.
- The spec and future implementation plan make clear which counters, if any, belong in a top-level resource HUD.
- Resource HUD proposals remain display-only and cannot alter economy, reward, or gameplay math.
- Focus Mode is defined as UI-shell behavior, not gameplay behavior.
- Focus Mode persistence is gated behind source-only versus storage-contract decisioning.
- Compact navigation is bounded to mobile/shell polish and accessibility, not broad redesign.
- The compact side-dock idea is deferred unless a later stage proves it should receive a protected addendum.
- The phase has explicit storage, Supabase/RLS, session, mobile-shell, service-worker, gameplay-rule, and Elo stop gates.
- Phase 48 through Phase 43 protected behavior and Daily claim safety remain unchanged.
- Theme modernization is routed to Phase 50 or later.

## Recommended Stage Breakdown

### Stage 49.0 - Protected Baseline And Phase 48 Review Intake

Confirm repository state, stable-repo boundary, Phase 48 checklist preservation, current Phase 49 planning/spec/progress artifacts, and baseline verification. Record the existing uncommitted planning/spec/progress worktree state. Do not begin audits or source implementation before this gate passes.

### Stage 49.1 - Progression HUD And Resource-Surface Audit

Audit current progression, economy, consumable, Stats, Settings, History, and account/cloud progress surfaces. Map the existing meanings of level, XP, coins, consumables, Pay-to-Continue, reveal-answer, and resource-derived summaries. Classify which values are safe to show in the top-level shell and which should remain in Stats or Settings.

### Stage 49.2 - Focus Mode And Compact/Mobile Shell Audit

Audit current shell, route rail/dock, primary navigation, mobile route access, Back-to-top behavior, visual density, gameplay entry, mobile safe-area behavior, and reduced-motion behavior. Decide whether Focus Mode and compact navigation can be split into a narrow source-only first slice.

### Stage 49.3 - Source-Only Versus Storage/Mobile-Shell Addendum Decision

Decide whether Phase 49 implementation can remain source/test-only. If source-only is safe, record exact boundaries for display-only counters, Focus Mode behavior, session-local or existing-settings persistence, compact navigation, route recovery, accessibility, and tests. If a storage schema, Supabase/RLS, broad mobile shell, compact side-dock, service worker, gameplay-rule, or Elo change is required, create a narrow addendum and stop before implementation.

### Stage 49.4 - Progression HUD First Slice

If authorized by a later implementation prompt and Stage 49.3 decision, implement the smallest display-only resource visibility improvement. Preserve account/guest boundaries, sync behavior, history/stat projections, economy math, and all gameplay rules.

### Stage 49.5 - Focus Mode Or Compact Navigation First Slice

If authorized by a later implementation prompt and Stage 49.3 decision, implement the smallest Focus Mode or compact navigation improvement. Preserve all primary routes, account recovery, Settings access, keyboard/gameplay visibility, route attention behavior, accessible labels, focus order, and reduced-motion behavior. Stop if the work expands into broad mobile shell redesign or side-dock implementation.

### Stage 49.6 - Final Hardening, Visual Review, Changelog, And Checklist

Run focused regressions and final verification after any later authorized implementation. Run local visual handoff review for changed topbar/resource, Focus Mode, compact navigation, Settings, Stats, Solo, and Multiplayer shell surfaces. Create `planning/phase-49/CHANGELOG.md` and `planning/phase-49/REVIEW-CHECKLIST.md`. Do not run Git handoff or backup workflow without a later prompt.

## Likely Files And Modules

Likely shell and navigation surfaces:

- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/app/browserNavigationHistory.ts`
- `src/app/BackToTopButton.tsx`
- `src/ui/Navigation.tsx`
- `src/index.css`
- `e2e/layout/mobile-scroll.spec.ts`

Likely progression, settings, and resource surfaces:

- `src/account/storageSchema.ts`
- `src/account/guestStorage.ts`
- `src/account/accountScopedProgress.ts`
- `src/account/sync.ts`
- `src/account/autoProgressSync.ts`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`
- `src/progression/coins.ts`
- `src/progression/experience.ts`
- `src/progression/consumables.ts`
- `src/progression/payToContinue.ts`
- `src/progression/progression.test.ts`
- `src/stats/StatsDashboard.tsx`
- `src/stats/statsSelectors.ts`
- `src/stats/statsSelectors.test.ts`
- `src/history/historyViewModels.ts`

Likely gameplay and visual-review surfaces:

- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/app/gameplayAutoCenter.ts`
- `src/app/games/soloGameplayAutoCenter.ts`
- `src/solo/SoloWorkspace.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- focused component tests and mobile Playwright checks.

## Source-Only, Storage, Supabase, Session, Mobile-Shell, And Gameplay Gates

### Source-Only Allowed

Phase 49 implementation may remain source/test-only only if it is limited to:

- reading existing progression/resource state and displaying it;
- deriving local display labels or view models from existing state;
- copy/layout/grouping changes around the shell, topbar, route rail, or Settings;
- session-local Focus Mode UI behavior, or a compatible existing settings path proven safe by audit;
- compact navigation behavior that preserves all routes, accessibility, route attention, and gameplay visibility;
- focused tests and visual review for changed shell behavior.

### Addendum Required

Stop and create a reviewed addendum before implementation if any Phase 49 item requires:

- a new or modified Supabase table, column, RPC, trigger, policy, grant, or view;
- a guest/cloud progress storage schema change that cannot remain backward-compatible without a migration decision;
- a new persisted setting that cannot safely fit the existing guest/cloud settings contract;
- new economy mechanics, collectibles, resource earning, resource spending, marketplace, or monetization rules;
- one-active-session/session leases, forced sign-out, heartbeats, or remote invalidation;
- server-authoritative Daily behavior;
- private Daily or ranked Daily implementation;
- broad mobile shell/top-tab/navigation redesign;
- compact/collapsible side-dock implementation beyond a narrow reviewed prototype;
- service workers or push infrastructure;
- gameplay-rule, scoring, Daily answer, timeout, forfeit, or Elo changes.

## Progression And Resource Constraints

- Existing coins, XP, level, consumables, and rewards must remain governed by current progression logic.
- Top-level resource display must not change reward amounts, spending costs, Pay-to-Continue costs, reveal-answer costs, level math, or stats calculations.
- Resource display must reflect the current active guest or authenticated progress scope.
- Resource display must not implicitly transfer guest progress into authenticated account state.
- Resource display must not write authenticated progress into guest storage.
- Existing manual and automatic signed-in Solo sync behavior must remain intact.
- Existing guest/account display-boundary repairs must remain intact.
- Multiplayer remains authenticated and must not gain consumables, Pay-to-Continue, or economy mechanics.

## Focus Mode Constraints

- Focus Mode must not hide essential gameplay controls.
- Focus Mode must not hide all route recovery paths.
- Focus Mode must preserve access to account controls, Settings, Help, and route switching.
- Focus Mode must preserve physical keyboard and on-screen keyboard playability.
- Focus Mode must preserve route attention and notification safety unless a later spec explicitly changes those contracts.
- Focus Mode must respect reduced-motion behavior.
- Focus Mode must be reversible by the player.
- If persisted, Focus Mode must use a reviewed guest/account settings path and must not require destructive cleanup or unaudited storage migration.

## Compact Navigation And Mobile Shell Constraints

- Compact navigation must preserve all primary routes.
- Compact navigation must provide accessible labels, adequate hit targets, keyboard focus, and screen-reader-safe names.
- Mobile shell changes must not reintroduce keyboard clipping, horizontal overflow, blocked controls, or excessive scroll lag.
- Back-to-top behavior must not overlap primary gameplay controls or compact navigation controls.
- Safe-area handling must remain compatible with mobile browser chrome.
- Broad mobile shell/top-tab/navigation overhaul and compact side-dock implementation remain deferred unless a later addendum explicitly approves them.

## Privacy And Supabase Constraints

- Resource counters must not expose raw auth IDs, auth email addresses, account tokens, Supabase keys, private progress payloads, private profile data, private multiplayer rows, private request metadata, or local session artifacts.
- Public profile privacy and public leaderboard parser guards from prior phases remain protected.
- Public/guest spectator boundaries remain unchanged.
- Private Daily and ranked Daily remain deferred behind the Phase 48 addendum.
- No direct browser authority over ranked settlement, rating profiles, Daily claims, or trusted multiplayer state should change.

## Preservation Requirements

Phase 49 must preserve:

- Phase 48 Profile/Settings clarity;
- Phase 48 custom-code hiding and legacy custom-code handling;
- Phase 48 private Daily/ranked Daily addendum routing;
- Phase 47 mobile Solo GO keyboard visibility and guest/account display-boundary repairs;
- Phase 46 signed-in Solo sync/freshness protections;
- Phase 46 no implicit guest-to-account transfer and no authenticated progress writes to guest storage;
- Phase 46 Solo Overview Resume-only behavior;
- Phase 45 Solo account boundaries;
- Phase 44 account-scoped repairs;
- Phase 43 ranked fairness/current-surface cleanup;
- Phase 42 stats/dashboard/help contracts;
- Phase 41 multiplayer reliability;
- Phase 40 public profile/private matchmaking boundaries;
- Phase 39 mobile scroll smoothness;
- Phase 38 public/guest spectator boundaries;
- Daily claim safety, gameplay rules, scoring, and Elo math.

## Verification Strategy

Planning/specification stages should run lightweight documentation verification:

- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan over changed tracked and untracked repository files;
- ignored-artifact check;
- `git status --short --branch`.

Implementation stages should run focused tests first, then the stage gate named by the future prompt:

- focused Vitest for progression/resource selectors and view models;
- focused Settings/storage tests if any preference or settings route is touched;
- focused shell/navigation component tests for resource HUD, Focus Mode, or compact navigation;
- focused mobile Playwright checks when mobile shell or route navigation changes;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- repository hygiene checks.

Final hardening should run the broad gate for the authorized implementation scope, including `npm run test:e2e` and `npm run test:full` if browser shell/navigation behavior changed.

## Visual Handoff Review Expectations

If Phase 49 changes visible shell, resource, Focus Mode, or mobile navigation surfaces, final hardening should capture local-only visual evidence under:

- `test-results/visual-review/phase-49-stage-49-6/`

Expected scenarios may include:

- desktop topbar/resource display;
- mobile topbar/resource display;
- Focus Mode off and on;
- mobile compact navigation route access;
- Solo gameplay with Focus Mode or compact navigation active;
- Multiplayer route shell with Focus Mode or compact navigation active;
- Settings account/progression context if a preference is introduced.

Screenshots, videos, traces, auth state, tokens, and local session artifacts must remain ignored and unstaged.

## Manual Review Checklist Expectations

If Phase 49 completes implementation, create:

- `planning/phase-49/REVIEW-CHECKLIST.md`

The checklist should include:

- resource counter visibility, ownership, and accuracy;
- Focus Mode toggle and recovery behavior;
- mobile compact navigation usability if implemented;
- gameplay keyboard and tile visibility;
- route discoverability and accessibility;
- account/guest progression boundary preservation;
- preserved Daily/gameplay/Elo invariants;
- known deferrals.

## GitHub Backup Workflow Expectations

Phase 49 backup remains a later explicit gate. A completed Phase 49 implementation should first complete final hardening, visual review, changelog, manual checklist, and Git handoff preparation. Only a later explicit prompt may invoke `brrrdle-github-backup`.

## Risks

- Top-level resource counters can look like new economy features if labels, placement, or scope are unclear.
- Displaying resource state can accidentally expose stale account data if guest/account scope is not guarded.
- Focus Mode can make route recovery or Settings access hard if it hides too much shell chrome.
- Persisting Focus Mode may require a storage-contract decision.
- Compact navigation can improve mobile playability but harm accessibility if labels, focus order, and hit targets are weak.
- Broad mobile shell redesign can swallow the phase if side-dock or navigation overhaul work is not gated.
- Theme modernization can collide with shell/Focus Mode styling if done too early.

## Open Decisions

- Which existing resources belong in the top-level shell: level, XP progress, coins, consumables, or a smaller subset?
- Should the first resource HUD be always visible, route-limited, or hidden in Focus Mode?
- Should Focus Mode be session-only at first?
- If Focus Mode is persisted, can it use the existing settings schema safely, or does it need a storage-contract addendum?
- Should compact navigation be a small source-only polish slice, or should it wait for a broad mobile shell phase?
- Should compact/collapsible side-dock work be explicitly excluded from Phase 49 implementation and routed to a later dedicated phase?
- Should theme proposal modernization become Phase 50 only after Phase 49 manual review passes?

## Next Gated Prompt

Create the detailed Phase 49 implementation plan for review only. Do not begin implementation until the detailed implementation plan has been created and reviewed.
