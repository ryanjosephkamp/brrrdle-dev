# Phase 49 Planning Brief - Progression HUD, Focus Mode, And Mobile UX Shell Polish

**Status:** Draft for review only.
**Created:** 2026-07-06.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Baseline:** local and remote `main` expected at `07fd0e0d8acb8244b7779fc7f0cce46bf0424db4`.

## Authority

This planning brief is authorized only as a documentation and routing artifact. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, storage schema changes, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, private Daily implementation, ranked Daily implementation, spectator presence/count/list implementation, service workers, push infrastructure, strict one-active-session/session-lease implementation, server-authoritative Daily implementation, gameplay-rule changes, Elo algorithm changes, secret exposure, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, local Codex skill changes, or work against the original stable `brrrdle` repository.

Highest applicable authorities:

- current user instructions;
- `CONSTITUTION.md`;
- `BRRRDLE-SPEC.md`;
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`;
- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`;
- completed Phase 48 evidence and the user-updated `planning/phase-48/REVIEW-CHECKLIST.md`;
- current roadmap and testing guidance.

## Current Baseline

Phase 48 is complete, backed up, merged, branch-cleaned, and manually reviewed.

Preserved manual review artifact:

- `planning/phase-48/REVIEW-CHECKLIST.md`

Phase 48 completed and manual review passed for:

- narrow mobile Solo auto-scroll lag repair while preserving Phase 47 keyboard bottom-clearance behavior;
- Profile and Settings account-management clarity;
- public/private/current-player profile copy and grouping without stored contract changes;
- custom-code multiplayer creation hidden while legacy custom-code rows remain readable and unrated;
- private Practice request behavior preservation;
- private Daily and ranked Daily deferral behind a protected contract addendum;
- preservation of Phase 47 mobile/display-boundary repairs, Phase 46 Solo sync/freshness protections, Phase 45 Solo account boundaries, Phase 44 account-scoped repairs, Phase 43 ranked fairness, Daily claim safety, gameplay rules, and Elo math.

No failed Phase 48 manual-review item is currently reported.

## Phase 48 Manual Review Result Summary

Phase 48 manual review was clean. The user reported that everything passed, and `planning/phase-48/REVIEW-CHECKLIST.md` now records all required, optional, preserved-invariant, and review-result checklist boxes as checked.

Phase 49 planning can safely begin because there is no unresolved Phase 48 manual-review blocker. The next roadmap lane is late shell and progression polish, which became safer after Phase 48 clarified profile/account-management and multiplayer contract boundaries.

## Phase-Sizing Decision

Phase 49 should be a cohesive planning phase for shell-level progression visibility and mobile/Focus Mode decisioning. The work shares one product area: the top-level app shell, resource visibility, navigation comfort, and player focus during gameplay.

The phase may be a macro-phase because the likely implementation surfaces overlap:

- `src/app/App.tsx`;
- `src/app/LunarSignalStage.tsx`;
- `src/app/routes.ts`;
- `src/app/navigationState.ts`;
- `src/ui/Navigation.tsx`;
- `src/account/storageSchema.ts`;
- `src/account/Settings.tsx`;
- `src/stats/statsSelectors.ts`;
- `src/progression/`;
- `src/index.css`;
- `e2e/layout/mobile-scroll.spec.ts`.

Implementation stages must remain narrow. Phase 49 should first audit resource semantics, shell behavior, mobile constraints, and storage implications before deciding whether any source work can proceed without storage-contract or broader mobile-shell addendum planning.

This should not become a broad redesign, theme phase, economy expansion, collectible system, service-worker phase, deployment phase, gameplay-rule phase, or Elo phase.

## Goals

Phase 49 should:

- determine the safest player-facing role for top-level EXP, level, coin, and any existing consumable/resource counters;
- decide whether header/top-site progression counters are useful now or should remain deferred until additional earnable/collectible systems have a clearer function;
- avoid inventing new economy mechanics or collectible systems while improving visibility for resources that already exist;
- audit Focus Mode feasibility as a player-toggleable way to reduce nonessential shell chrome during gameplay;
- decide whether Focus Mode can remain source-only through existing guest/cloud settings or requires a storage-contract addendum;
- audit compact/mobile navigation options without committing to a broad mobile shell overhaul;
- consider but not implement compact/collapsible side-dock ideas unless a later spec authorizes them;
- define accessibility, route discoverability, responsive layout, safe-area, reduced-motion, and keyboard/gameplay legibility constraints for any shell polish;
- preserve Phase 48 profile/multiplayer contract decisions, Phase 47 mobile/display-boundary repairs, Phase 46 Solo sync/freshness protections, Daily claim safety, gameplay rules, and Elo math.

## In Scope

- Read-only review of Phase 48 manual review results and completion evidence.
- Planning for a top-level progression/resource HUD using existing progression fields only.
- Audit of current EXP, level, coin, consumable, Pay-to-Continue, reveal-answer, Stats, and Settings resource surfaces.
- Focus Mode feasibility planning for hiding/reducing nonessential shell chrome during gameplay.
- Source-only versus storage-contract decisioning for Focus Mode and any display preference.
- Mobile UX shell audit and compact navigation planning.
- Accessibility and route-discoverability constraints for compact navigation.
- Testing, visual review, manual checklist, progress, and Git handoff expectations for a future implementation phase.

## Out Of Scope

- Source/runtime implementation during this planning gate.
- Test implementation during this planning gate.
- New economy mechanics, new earnable types, collectible systems, marketplace work, or monetization changes.
- Supabase migration creation or execution.
- Storage schema changes without a later addendum.
- Vercel or Supabase configuration.
- Deployment, release, staging, commits, pushes, PRs, merges, branch deletion, or backup workflow execution.
- Private Daily implementation or ranked Daily implementation.
- Strict one-active-session/session leases.
- Server-authoritative Daily submissions.
- Service workers or push infrastructure.
- Spectator presence/count/list.
- Social inbox/mailbox.
- Configurable Home widgets or private request inbox widgets.
- Notification redesign.
- Broad theme proposal modernization or full concrete theme implementation.
- Gameplay-rule changes, Daily claim-rule changes, scoring changes, or Elo changes.
- Any work against the original stable `brrrdle` repository.

## Recommended Phase 49 v1 Scope

Phase 49 v1 should complete the safest path through:

1. protected baseline and Phase 48 manual-review intake;
2. progression/resource HUD audit and product-role decision;
3. Focus Mode and compact navigation feasibility audit;
4. source-only versus storage/mobile-shell addendum decision;
5. a narrow source/test implementation path only if the spec later proves the first slice is safe;
6. final hardening, visual review, changelog, and manual checklist.

Recommended initial bias:

- Treat resource counters as display-only summaries of existing progression state.
- Do not create new coin/XP/collectible earning or spending rules.
- Treat Focus Mode as a preference/UI-shell behavior, not a gameplay mechanic.
- Use existing guest/cloud settings only if the source audit proves the setting can be added safely and compatibly; otherwise create a storage-contract addendum.
- Keep compact navigation bounded to mobile/shell playability and accessibility, not a full app redesign.
- Move theme modernization to Phase 50 or later to avoid mixing cosmetic theme planning with shell/progression behavior.

## Recommended Narrow Stage Breakdown

### Stage 49.0 - Protected Baseline And Phase 48 Review Intake

- Confirm repo state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the stable `brrrdle` repository is not in use.
- Preserve `planning/phase-48/REVIEW-CHECKLIST.md`.
- Record current Phase 49 planning/spec/progress artifacts.
- Run the baseline verification gate before audit or implementation.

### Stage 49.1 - Progression HUD And Resource-Surface Audit

- Audit existing progression fields, rewards, consumables, Pay-to-Continue, reveal-answer, Stats, Settings, account sync, guest/cloud progress, and visible resource surfaces.
- Decide which values are meaningful enough for top-level display.
- Identify privacy/account-boundary and guest/signed-in transfer constraints.
- Classify whether the resource HUD can stay source-only.

### Stage 49.2 - Focus Mode And Mobile Shell Audit

- Audit current shell, lunar route rail/dock, topbar, Back-to-top, mobile route navigation, mobile scroll harness, gameplay entry, and reduced-motion behavior.
- Decide whether Focus Mode and compact navigation can be split into a narrow source-only first slice.
- Identify when broader mobile shell/top-tab/navigation overhaul or side-dock work should be deferred.

### Stage 49.3 - Source-Only Versus Storage/Mobile-Shell Addendum Decision

- Decide whether Phase 49 implementation can remain source/test-only.
- If source-only is safe, record exact boundaries for display-only resource counters, Focus Mode behavior, navigation reduction, persistence, and tests.
- If a new settings field, storage migration, Supabase/RLS change, broad mobile shell overhaul, or compact side-dock design is required, create a narrow addendum under `planning/specs/phase-49/` and stop before implementation.

### Stage 49.4 - Progression HUD First Slice

- If authorized by the future spec and Stage 49.3 decision, implement the smallest resource visibility improvement.
- Keep it display-only and driven by existing progression state.
- Preserve account/guest boundaries and avoid changing economy math, rewards, spending, or stats.

### Stage 49.5 - Focus Mode Or Compact Navigation First Slice

- If authorized by the future spec and Stage 49.3 decision, implement the smallest Focus Mode or compact navigation improvement.
- Keep route discoverability, keyboard/gameplay visibility, accessibility, and reduced-motion behavior intact.
- Stop if the work expands into broad mobile shell redesign or side-dock implementation beyond the approved slice.

### Stage 49.6 - Final Hardening, Visual Review, Changelog, And Manual Checklist

- Run focused regressions and final verification after any later authorized implementation.
- Run local visual handoff review for changed topbar/resource, Focus Mode, compact navigation, Settings, Stats, Solo, and Multiplayer shell surfaces.
- Create `planning/phase-49/CHANGELOG.md` and `planning/phase-49/REVIEW-CHECKLIST.md`.
- Do not run Git handoff or backup workflow without a later prompt.

## Success Criteria

- Phase 48 manual review is preserved as clean.
- Existing progression resources are mapped to their current product meaning.
- Any top-level resource/HUD proposal is display-only unless a later spec explicitly approves deeper economy work.
- Focus Mode is defined as UI-shell behavior, not gameplay.
- Compact navigation and mobile shell polish are bounded to accessibility, discoverability, and playability.
- Source-only versus storage-contract/mobile-shell addendum gates are explicit.
- Broad mobile redesign and side-dock implementation are deferred unless a later spec authorizes them.
- Theme modernization is rerouted to Phase 50 or later.
- Daily claim safety, gameplay rules, scoring, and Elo math remain unchanged.

## Likely Files And Modules

Likely shell and navigation surfaces:

- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/app/BackToTopButton.tsx`
- `src/ui/Navigation.tsx`
- `src/index.css`
- `e2e/layout/mobile-scroll.spec.ts`

Likely progression and settings surfaces:

- `src/account/storageSchema.ts`
- `src/account/guestStorage.ts`
- `src/account/sync.ts`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`
- `src/progression/`
- `src/stats/StatsDashboard.tsx`
- `src/stats/statsSelectors.ts`
- `src/stats/statsSelectors.test.ts`

Likely gameplay and visual review surfaces:

- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/solo/SoloWorkspace.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- focused component tests and mobile Playwright checks.

## Source-Only, Storage, Supabase, Session, Mobile-Shell, And Gameplay Gates

### Source-Only Allowed

Phase 49 work may remain source/test-only only if it is limited to:

- reading existing progression state and displaying it;
- copy/layout/grouping changes around the shell/topbar/route rail;
- local view-model helpers for existing counters;
- Focus Mode UI state that does not require persisted storage, or a compatible existing settings path proven safe by audit;
- compact navigation behavior that preserves all routes, accessibility, and gameplay visibility;
- tests and visual review for changed shell behavior.

### Addendum Required

Stop and create a reviewed addendum before implementation if any Phase 49 item requires:

- a new or modified Supabase table, column, RPC, trigger, policy, grant, or view;
- a guest/cloud progress storage schema change that cannot remain backward-compatible without a migration decision;
- new economy mechanics, collectibles, resource spending, marketplace, or monetization rules;
- one-active-session/session leases, forced sign-out, heartbeats, or remote invalidation;
- server-authoritative Daily behavior;
- broad mobile shell/top-tab/navigation redesign;
- compact/collapsible side-dock implementation beyond a narrow approved prototype;
- service workers or push infrastructure;
- gameplay-rule, scoring, Daily answer, timeout, forfeit, or Elo changes.

## Progression And Resource Constraints

- Existing coins, XP, level, consumables, and rewards must remain governed by current progression logic.
- Top-level resource display must not change reward amounts, spending costs, Pay-to-Continue costs, reveal-answer costs, or level math.
- Guest and signed-in displays must reflect the current active progress scope.
- Account-scoped sync and guest/account transfer protections from Phases 44 through 47 must remain intact.
- Any new persisted preference for Focus Mode or shell layout must be reviewed against guest/cloud progress schema and sync behavior.

## Mobile, Focus Mode, And Accessibility Constraints

- Focus Mode must not hide essential gameplay controls, keyboard input, route recovery, account access, or settings access.
- Compact navigation must preserve all primary routes and accessible labels.
- Mobile shell changes must not reintroduce keyboard clipping, horizontal overflow, blocked controls, or excessive scroll lag.
- Reduced-motion behavior must remain respected.
- Back-to-top behavior must not overlap primary gameplay controls.
- The mobile scroll harness should be extended only when the future implementation touches mobile route layout or navigation.

## Privacy And Supabase Constraints

- Resource counters must not expose private account identifiers, private profile data, raw auth IDs, raw emails, tokens, keys, local session artifacts, or private multiplayer projections.
- Public/guest spectator boundaries remain unchanged.
- Private Daily and ranked Daily remain deferred behind the Phase 48 addendum.
- No direct browser authority over ranked settlement, rating profiles, Daily claims, or trusted multiplayer state should change.

## Verification Strategy

Planning/specification stages should run lightweight documentation verification:

- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan over changed tracked and untracked repository files;
- ignored-artifact check;
- `git status --short --branch`.

Implementation stages should run focused tests first, then the stage gate named by the future prompt:

- focused Vitest for progression/resource view models and Settings/storage behavior;
- focused component tests for shell/navigation/Focus Mode behavior;
- focused Playwright mobile layout checks when mobile shell or route navigation changes;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- repository hygiene checks.

Final hardening should run the broad gate for the authorized implementation scope, including `npm run test:e2e` and `npm run test:full` if browser shell/navigation behavior changed.

## Visual Handoff Review Expectations

If Phase 49 changes visible shell/resource/mobile navigation surfaces, final hardening should capture local-only visual evidence under:

- `test-results/visual-review/phase-49-stage-49-6/`

Expected scenarios may include:

- desktop topbar/resource display;
- mobile topbar/resource display;
- Focus Mode off and on;
- mobile compact navigation route access;
- Solo gameplay with Focus Mode/compact navigation active;
- Settings account/progression context if a preference is introduced.

Screenshots, videos, traces, auth state, tokens, and local session artifacts must remain ignored and unstaged.

## Manual Review Checklist Expectations

If Phase 49 completes implementation, create:

- `planning/phase-49/REVIEW-CHECKLIST.md`

The checklist should include:

- resource counter visibility and accuracy;
- Focus Mode toggle and recovery behavior;
- mobile compact navigation usability;
- gameplay keyboard and tile visibility;
- route discoverability;
- account/guest progression boundary preservation;
- preserved Daily/gameplay/Elo invariants;
- known deferrals.

## GitHub Backup Workflow Expectations

Phase 49 backup remains a later explicit gate. A completed Phase 49 implementation should first complete final hardening, visual review, changelog, manual checklist, and Git handoff preparation. Only a later explicit prompt may invoke `brrrdle-github-backup`.

## Risks

- Top-level resource counters can look like new economy features if copy and placement are unclear.
- Focus Mode can make routes or settings harder to recover if it hides too much chrome.
- Compact navigation can improve mobile playability but harm accessibility if labels, focus order, and hit targets are weak.
- Persisting Focus Mode preferences may require storage schema review.
- Broad mobile shell redesign could swamp the phase if not explicitly bounded.
- Theme work could prematurely collide with shell/Focus Mode styling decisions if not deferred.

## Open Decisions

- Should Phase 49 implement resource counters, Focus Mode, compact navigation, or split these into separate phases after audit?
- Which existing resources belong in the top-level shell: level, XP, coins, consumables, or a smaller subset?
- Should Focus Mode be session-only at first or persisted?
- If persisted, can Focus Mode use the existing settings schema safely, or does it require a storage-contract addendum?
- Is the compact side-dock idea a later broad mobile shell phase rather than a Phase 49 v1 slice?
- Should theme modernization wait until after Phase 49 manual review, or should it become Phase 50 planning if Phase 49 passes?

## Next Gated Prompt

Create the unified Phase 49 specification for review only. Do not begin implementation until the unified specification and detailed implementation plan have been created and reviewed.
