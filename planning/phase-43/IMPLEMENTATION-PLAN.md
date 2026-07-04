# Phase 43 Implementation Plan

**Status**: Detailed implementation plan for review only.
**Phase**: Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort.
**Date**: 2026-07-03.
**Repository**: `brrrdle-dev`.

## Authority

This implementation plan is governed by:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `planning/phase-43/PHASE-43-UI-UX-GAMEPLAY-INTAKE-2026-07-03.md`.
7. `planning/phase-43/PHASE-43-RECOMMENDATIONS-AND-ROUTING-2026-07-03.md`.
8. `planning/phase-43/PLANNING-BRIEF.md`.
9. `planning/specs/phase-43/PHASE-43-CURRENT-SURFACE-UX-CLEANUP-RANKED-QUEUE-GAMEPLAY-COMFORT-SPEC-2026-07-03.md`.
10. Current progress, testing, roadmap, and workflow documents.

This plan does not authorize implementation. It does not authorize source/runtime edits, test edits, migrations, Supabase or Vercel configuration, deployment, Git/GitHub operations, public/guest spectator contract changes, spectator presence/count/list behavior, service workers, push infrastructure, gameplay-rule changes, Elo changes, local Codex skill changes, secret printing, private data exposure, local artifact exposure, or original stable `brrrdle` repository work.

## Current Baseline

- Phase 42 is complete, backed up, merged, and manually reviewed.
- Expected local and remote `main`: `a81e636cd26eb178e1d0bcc75554a1edffe7639d`.
- The user-updated Phase 42 manual review checklist at `planning/phase-42/REVIEW-CHECKLIST.md` must be preserved.
- Phase 43 intake, recommendations/routing, planning brief, and unified specification exist.
- Progress evidence exists through `progress/PROGRESS-STEP-378.md`.

## Phase Strategy

Phase 43 should execute as one cohesive macro-phase, but every stage must remain narrow, single-purpose, and independently reviewable.

The safest ordering is:

1. Establish a clean protected baseline.
2. Audit and reproduce before changing anything.
3. Resolve or route ranked queue behavior before broad UI cleanup.
4. Clean information architecture before shell and density cleanup.
5. Keep app-shell/Home work separate from Solo/Practice Multiplayer density work.
6. Handle gameplay viewport, notifications, back-to-top, and spectator comfort after core route cleanup.
7. Finish with broad verification, visual review, changelog, and manual checklist.

## Global Boundaries

All Phase 43 stages must preserve:

- Phase 42 public stats, private developer/admin dashboard, Help route, onboarding, and Supabase grant/RLS hardening.
- Phase 41 multiplayer reliability repairs and real two-client/three-client E2E harnesses.
- Phase 40 public profile/private matchmaking privacy and source boundaries.
- Phase 39 mobile scroll smoothness.
- Phase 38 public/guest spectator read-only boundaries and Daily spectator exclusion.
- Daily claim safety, ranked settlement authority, gameplay rules, and Elo math.

All Phase 43 stages must avoid:

- profile/data-contract simplification;
- custom-code removal/rerouting, private Daily, ranked Daily, or Daily claim contract changes;
- full social inbox, mailbox, following, messaging, or notification redesign;
- rich tutorial media;
- configurable Home widgets;
- progression HUD, Focus Mode, compact navigation, or broad mobile shell overhaul;
- theme proposal modernization or concrete theme work;
- spectator presence/count/list;
- service workers or push subscriptions;
- deployment/release;
- gameplay-rule changes, including draw-by-repetition;
- Elo changes.

## Stage 43.0 - Protected Baseline And Intake Confirmation

### Purpose

Confirm the repository, record all current Phase 43 planning/spec/progress artifacts, preserve the Phase 42 review checklist, and prove the pre-implementation baseline.

### Authorized Work

- Read governance, Phase 43 planning/spec artifacts, completed Phase 42 evidence, current progress records, testing docs, `agents.md`, `memory.md`, and `package.json`.
- Confirm repo path, branch, status, remotes, `HEAD`, and `origin/main`.
- Confirm original stable `brrrdle` is not used.
- Create the next progress report and 12-column CSV row.
- Run watched-port/process checks before and after verification for `5173`, `5174`, `3000`, and `4173`.
- Run the baseline verification gate.

### Not Authorized

- Stage 43.1 audit.
- Source/runtime edits.
- Test edits.
- Migrations.
- Supabase/Vercel configuration.
- Git/GitHub operations.

### Verification

Run sequentially:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

### Exit Criteria

- Baseline passes.
- Progress report and CSV row are recorded.
- Worktree contains only expected planning/progress/manual-review artifacts.
- Stage 43.1 prompt is ready.

### Stop Conditions

- Repo is not `brrrdle-dev`.
- `HEAD` or `origin/main` does not match the expected baseline and cannot be safely explained.
- Phase 42 checklist preservation is at risk.
- Any baseline verification command fails.
- A real credential-like value or forbidden artifact is found.

## Stage 43.1 - Current UX And Ranked Queue Audit

### Purpose

Reproduce or characterize the ranked Practice queue issue and map the current UX cleanup surfaces before implementation.

### Authorized Work

- Read Phase 43 planning/spec materials and Stage 43.0 progress.
- Inspect ranked queue, Home, shell/right rail, header, Stats, Help, About, Settings, Solo, Practice Multiplayer, notifications, clocks, back-to-top, gameplay viewport, and spectator viewport surfaces.
- Use one local dev server only if browser reproduction requires it, then stop it.
- Use existing two-client/three-client E2E harnesses read-only or diagnostic-only if needed.
- Decide whether Stage 43.2 can remain source/test-only.
- Decide whether any Phase 43 item requires migration/RLS addendum planning.
- Create progress report and CSV row.

### Not Authorized

- Source/runtime fixes.
- Test implementation.
- Migrations.
- Configuration changes.

### Audit Focus

- Three-player ranked Practice queue/search-again behavior.
- Stale waiting panels after match/open/finalization.
- "Check ranked queue" action value.
- Home/right rail information density.
- Recent Results horizontal overflow.
- Stats local/public ordering.
- Help/About/Settings route placement and content ownership.
- Solo redundant status rows and OG/GO toggle treatment.
- Practice Multiplayer ranked explanation, private requests, and dense completed-game grid.
- Account dropdown, notification click-away, clocks, and back-to-top gaps.
- Invalid-guess keyboard shift.
- Spectator latest-turn viewport comfort.

### Verification

Run lightweight checks:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

### Exit Criteria

- Reproduction/classification evidence is recorded.
- Stage 43.2 path is chosen.
- Migration/RLS addendum need is explicitly accepted or rejected.
- No implementation has started.

## Stage 43.2 - Ranked Practice Queue Follow-Up

### Purpose

Repair the ranked Practice queue/search-again/stale-status behavior if Stage 43.1 proves a source/test-only path.

### Authorized Work

- Implement the smallest safe source/test fix in ranked queue, routing, polling, or visible status surfaces.
- Preserve ranked queue cancellation, matching, search-again, trusted settlement, Daily exclusion, gameplay rules, and Elo math.
- Keep primary queued state visually stable during background refresh.
- Clear stale waiting panels after match/open/finalization.
- Add focused Vitest and, where needed, real two-client or three-client Playwright E2E coverage.
- Create progress report and CSV row.

### Likely Files

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerPanelRankedQueue.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/multiplayerRepository.test.ts`
- `e2e/gameplay/multiplayer-reliability.spec.ts`
- `e2e/fixtures/twoClientGame.ts`
- `e2e/fixtures/threeClientGame.ts`
- `e2e/fixtures/supabaseAdmin.ts`

### Verification

Run focused tests first, then:

- `npm run lint`
- `npm run test`
- focused relevant Playwright/E2E commands if multiplayer behavior changed
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

### Stop Conditions

- Evidence proves a database/RPC/RLS contract gap.
- Queue repair would require Elo, settlement, Daily, or gameplay-rule changes.
- E2E cleanup cannot be confirmed.

## Stage 43.3 - Stats, Help, About, And Settings Information Architecture

### Purpose

Reduce route-level information clutter without changing public stats, admin dashboard, profile, gameplay, or persistence contracts.

### Authorized Work

- Reorder Stats so personal/local content is primary and public aggregate stats are lower.
- Keep public stats aggregate-only and clearly labeled.
- Replace or shrink Help content into a transitional surface.
- Move useful Help copy to About only where appropriate.
- Move Help navigation between Settings and Feedback.
- Remove the large Help/tutorial card from Settings.
- Add focused route/copy/component tests.
- Create progress report and CSV row.

### Likely Files

- `src/stats/StatsDashboard.tsx`
- `src/stats/PublicSiteStatsPanel.tsx`
- `src/help/HelpPanel.tsx`
- `src/account/Settings.tsx`
- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/app/AboutBrrrdlePanel.test.tsx`
- `src/stats/StatsDashboard.test.tsx`
- `src/stats/PublicSiteStatsPanel.test.tsx`
- `src/help/HelpPanel.test.tsx`
- `src/account/Settings.test.tsx`

### Verification

Run focused tests first, then the standard source-stage gate:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

### Stop Conditions

- Any change would require a new stats/admin RPC or RLS contract.
- Help/About/Settings cleanup starts to become rich tutorial media work.
- Profile/privacy or admin dashboard access boundaries would change.

## Stage 43.4 - App Shell, Header, Home, And Horizontal Overflow Cleanup

### Purpose

Reduce global shell and Home clutter, remove ordinary-route horizontal overflow, and improve account/clock interactions without implementing compact navigation, Focus Mode, or configurable widgets.

### Authorized Work

- Remove or demote the ordinary-route right rail.
- Move sync access into Profile or Settings after focused source inspection.
- Avoid duplicate global sound/theme controls.
- Add account dropdown behavior with View profile and Sign out.
- Close account dropdown on outside click and repeated avatar click.
- Condense clocks without removing their functions.
- Simplify Home default density while preserving active-game access.
- Fix Home Recent Results or equivalent horizontal overflow.
- Add focused component, route, and mobile/desktop layout coverage.
- Create progress report and CSV row.

### Likely Files

- `src/app/App.tsx`
- `src/dashboard/DashboardHome.tsx`
- `src/account/AccountBadge.tsx`
- `src/account/ProfilePanel.tsx`
- `src/account/Settings.tsx`
- `src/ui/Navigation.tsx`
- `src/ui/Panel.tsx`
- `src/ui/Button.tsx`
- `src/dashboard/DashboardHome.test.tsx`
- `src/account/AccountBadge.test.tsx`
- `src/app/navigationState.test.ts`
- `e2e/layout/mobile-scroll.spec.ts`

### Verification

Run focused tests and focused mobile/layout browser coverage first, then:

- `npm run lint`
- `npm run test`
- focused Playwright layout command if layout changed
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

### Stop Conditions

- Work becomes broad compact navigation or Focus Mode.
- Work requires persistent Home widget configuration.
- Fixed/sticky controls overlap gameplay, notifications, or route navigation.

## Stage 43.5 - Solo And Practice Multiplayer Density Cleanup

### Purpose

Clean up dense Solo and Practice Multiplayer route surfaces while preserving active-game discoverability and all gameplay/multiplayer contracts.

### Authorized Work

- Improve Solo OG/GO mode toggles.
- Remove redundant Solo status rows where facts are already obvious.
- Preserve Practice GO chain behavior, setup locks, Hard Mode behavior, and useful lower configuration/gameplay content.
- Collapse, demote, or make tooltip-like the Ranked Practice explanation.
- Reposition Private Practice requests without creating a full inbox.
- Replace or reduce dense completed-game buttons with a cleaner current/history split if safe.
- Use History for completed-game review only if existing participant-owned reads and routing support it safely.
- Add focused tests.
- Create progress report and CSV row.

### Likely Files

- `src/solo/SoloWorkspace.tsx`
- `src/solo/SoloWorkspace.test.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/MultiplayerActiveGames.test.tsx`
- `e2e/gameplay/practice-multiplayer-og.spec.ts`
- `e2e/gameplay/private-matchmaking.spec.ts`

### Verification

Run focused Solo/Multiplayer tests first, then:

- `npm run lint`
- `npm run test`
- focused relevant Playwright/E2E command if route behavior changed
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

### Stop Conditions

- Work requires new completed-game projection, profile contract, private request contract, or social inbox.
- Work risks hiding current active games.
- Work changes gameplay setup rules, Hard Mode, Practice GO chains, Daily claims, or Elo.

## Stage 43.6 - Gameplay Viewport, Notifications, Back-To-Top, And Spectator Comfort

### Purpose

Improve gameplay and spectator comfort after route density cleanup, keeping all behavior client-side and contract-preserving.

### Authorized Work

- Stabilize transient invalid-guess and Hard Mode message layout so the keyboard does not jump.
- Preserve message copy/content and existing validation behavior.
- Add notification click-away behavior without mutating notification data.
- Add a non-overlapping back-to-top control after meaningful page scroll.
- Explore bounded auto-scroll for persistent messages, board growth, or spectator latest-turn visibility only when user intent makes it safe.
- Stop auto-scroll when the user scrolls away.
- Add focused browser/visual tests where practical.
- Create progress report and CSV row.

### Likely Files

- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/app/gameplayAutoCenter.ts`
- `src/app/App.tsx`
- `src/notifications/NotificationCenter.tsx`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`
- `src/ui/Button.tsx`
- `src/ui/Tooltip.tsx`
- `src/app/gameplayAutoCenter.test.ts`
- `src/multiplayer/MultiplayerGameSurface.test.tsx`
- `src/notifications/NotificationCenter.test.tsx`
- `e2e/gameplay/live-v1-spectator.spec.ts`
- `e2e/layout/mobile-scroll.spec.ts`

### Verification

Run focused gameplay/notification/spectator checks first, then:

- `npm run lint`
- `npm run test`
- focused relevant Playwright/E2E command if browser behavior changed
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

### Stop Conditions

- Auto-scroll ignores user scroll intent.
- Spectator work becomes presence/count/list/contract work.
- Notification work becomes mailbox or full notification redesign.
- Gameplay behavior, scoring, Daily claims, or Elo would change.

## Stage 43.7 - Final Hardening, Visual Review, Changelog, And Manual Checklist

### Purpose

Validate Phase 43 end-to-end, create review artifacts, and halt before Git handoff.

### Authorized Work

- Review all Phase 43 stages for regressions, stale docs, privacy gaps, visual issues, routing gaps, and cleanup needs.
- Add only narrow final-hardening fixes if required.
- Run focused regression/E2E coverage for the touched surfaces.
- Run local visual handoff review under ignored `test-results/visual-review/phase-43-stage-43-7/`.
- Create `planning/phase-43/CHANGELOG.md`.
- Create `planning/phase-43/REVIEW-CHECKLIST.md` using the established phase checklist structure.
- Create progress report and CSV row.

### Final Verification

Run:

- focused regression tests;
- focused relevant Playwright/E2E;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run test:full`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port/process cleanup check for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

### Visual Review Expectations

Capture only ignored local artifacts for:

- Home desktop/mobile after simplification.
- Stats local/public ordering.
- Help/About/Settings after cleanup.
- Solo Daily/Practice subtabs.
- Practice Multiplayer setup/request/history surfaces.
- Account dropdown and notification click-away states.
- Gameplay invalid-guess keyboard stability.
- Spectator latest-turn state if changed.

### Manual Checklist Expectations

The checklist should include:

- ranked queue/search-again checks;
- Home density and horizontal-overflow checks;
- Stats local/public ordering checks;
- Help/About/Settings placement checks;
- Solo and Practice Multiplayer layout checks;
- account dropdown, notification click-away, clock, and back-to-top checks;
- invalid-guess keyboard stability checks;
- spectator latest-turn comfort checks if implemented;
- preserved prior-phase invariants and deferred-work confirmation.

### Stop Conditions

- Final verification fails.
- Visual review exposes an unresolved overlap, overflow, or inaccessible critical control.
- A real credential-like secret or forbidden artifact is found.
- Phase completion evidence is incomplete.

## Migration/RLS Addendum Gate

Create a separate migration/RLS addendum only if a stage proves that source/test-only work is insufficient.

Known triggers:

- ranked queue search-again or matching requires trusted RPC/database contract changes;
- completed-game History routing requires a new participant-owned projection;
- cleanup requires new persisted request, queue, profile, Daily, spectator, notification, stats, or admin-dashboard contracts.

Addendum planning must be documentation-only. Migration execution must be separately authorized and must include target confirmation, exactly scoped migration work, non-printing probes, dry-run where applicable, and stop-on-failure behavior.

## Privacy And Supabase Constraints

- Do not expose raw auth IDs, emails, private profile fields, queue internals, rating internals, private row payloads, answers, seeds, tokens, auth state, local artifacts, screenshots, videos, or traces.
- Keep public stats aggregate-only.
- Keep admin dashboard authenticated/admin-gated.
- Keep public profile names and avatars on approved public profile fields only.
- Keep private Practice requests authenticated-only and Practice-only.
- Keep participant-owned active/completed game access bounded to existing safe repository reads.
- Do not modify public stats/admin dashboard RPCs, profile/privacy contracts, private matchmaking contracts, public/guest spectator projections, Daily claim contracts, ranked settlement authority, or browser grants without a reviewed addendum.

## Verification Cadence

- Documentation-only gates use lightweight checks.
- Protected baseline uses the baseline command stack.
- Source stages run focused tests first, then the standard source-stage gate.
- Multiplayer claims use the real two-client/three-client E2E harness where needed.
- Final hardening carries full verification and visual handoff evidence.

## Open Decisions

- Whether the three-player ranked queue issue reproduces and whether it is source-only.
- Whether "Check ranked queue" should remain, change, or be removed.
- Whether completed multiplayer game review can safely route through History.
- Whether sync belongs in Profile, Settings, or both.
- Whether Help should become a placeholder or a slimmer transitional page.
- How much spectator/latest-turn auto-scroll can be safely implemented.
- Which UX expectations should become automated tests versus manual checklist items.

## Next Gated Prompt

Use the Stage 43.0 prompt package below only after reviewing this plan.

```md
# Codex Task: Begin Phase 43 Execution For `brrrdle-dev` - Stage 43.0 Baseline Only

Use `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`. Do not touch the original stable `brrrdle` repository.

## Authorization

I authorize Phase 43 Stage 43.0 only: protected baseline and intake confirmation.

This includes reading required governance, Phase 43 intake/recommendations/planning/spec/implementation materials, completed Phase 42 evidence, current progress records, package/test surfaces, confirming repository state, recording existing uncommitted Phase 43 planning/spec/progress artifacts and the user-updated Phase 42 review checklist state, creating the Stage 43.0 progress report and matching 12-column CSV row, running resource/process checks, and running the Stage 43.0 baseline verification gate.

This does not authorize Stage 43.1 audit work, source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable repository work.

## Current Baseline

Phase 42 is complete, backed up, merged, branch-cleaned, and manually reviewed. Phase 43 intake, recommendations/routing, planning brief, unified specification, detailed implementation plan, and phase scope sizing guidance exist.

Expected local and remote `main`:

`a81e636cd26eb178e1d0bcc75554a1edffe7639d`

Preserve the user-updated Phase 42 checklist:

`planning/phase-42/REVIEW-CHECKLIST.md`

## Required Reading

Read:

- `CONSTITUTION.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`
- `BRRRDLE-SPEC.md`
- `planning/README.md`
- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `planning/testing/TESTING-SUITE.md`
- `planning/phase-42/CHANGELOG.md`
- `planning/phase-42/REVIEW-CHECKLIST.md`
- `planning/phase-43/PHASE-43-UI-UX-GAMEPLAY-INTAKE-2026-07-03.md`
- `planning/phase-43/PHASE-43-RECOMMENDATIONS-AND-ROUTING-2026-07-03.md`
- `planning/phase-43/PLANNING-BRIEF.md`
- `planning/specs/phase-43/PHASE-43-CURRENT-SURFACE-UX-CLEANUP-RANKED-QUEUE-GAMEPLAY-COMFORT-SPEC-2026-07-03.md`
- `planning/phase-43/IMPLEMENTATION-PLAN.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-375.md`
- `progress/PROGRESS-STEP-376.md`
- `progress/PROGRESS-STEP-377.md`
- `progress/PROGRESS-STEP-378.md`
- `progress/PROGRESS-STEP-379.md`
- `docs/supabase.md`
- `docs/ranked-multiplayer.md`
- `agents.md`
- `memory.md`
- `package.json`

## Objectives

1. Confirm repo state: `pwd`, branch, `git status --short --branch`, remotes, `HEAD`, and `origin/main`.
2. Confirm the original stable `brrrdle` repository is not being used.
3. Preserve `planning/phase-42/REVIEW-CHECKLIST.md`.
4. Record current uncommitted Phase 43 intake/recommendation/planning/spec/implementation/progress artifacts.
5. Create the Stage 43.0 progress report and matching 12-column CSV row, likely progress ID `380`.
6. Run watched-port/process/resource checks before and after verification for ports `5173`, `5174`, `3000`, and `4173`.
7. Run sequentially:
   - `npm run lint`
   - `npm run test`
   - `npm run build`
   - `npx tsc -p tsconfig.api.json --noEmit`
   - `git diff --check`
   - progress CSV shape check using `python3 -S`
   - non-printing secret/artifact scan
   - ignored-artifact check
   - watched-port cleanup check
   - `git status --short --branch`
8. If any command fails, stop, record the exact non-secret failure in progress, and do not proceed to Stage 43.1.

## Final Report

Report progress path, files changed, branch/worktree status, progress ID, baseline verification results, resource/process observations, blockers/open questions, boundary confirmation, and a copy-safe prompt for Stage 43.1 current UX and ranked queue audit only if the baseline passes.

Then halt for review.
```
