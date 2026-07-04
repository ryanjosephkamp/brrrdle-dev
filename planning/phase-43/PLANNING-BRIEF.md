# Phase 43 Planning Brief

**Status**: Draft planning brief for review only.
**Phase**: Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort.
**Date**: 2026-07-03.
**Repository**: `brrrdle-dev`.

## Authority

This brief is governed by:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `planning/phase-43/PHASE-43-UI-UX-GAMEPLAY-INTAKE-2026-07-03.md`.
7. `planning/phase-43/PHASE-43-RECOMMENDATIONS-AND-ROUTING-2026-07-03.md`.
8. Current roadmap, testing, progress, and supporting workflow documents.

This document does not authorize implementation. It does not authorize source/runtime edits, test edits, migrations, Supabase or Vercel configuration, deployment, Git/GitHub operations, public/guest spectator contract changes, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, Elo changes, local Codex skill changes, secret printing, private data exposure, local artifact exposure, or work in the original stable `brrrdle` repository.

## Current Baseline

- Phase 42 is complete, backed up, merged, and manually reviewed.
- Expected local and remote `main`: `a81e636cd26eb178e1d0bcc75554a1edffe7639d`.
- The user-updated Phase 42 manual review checklist at `planning/phase-42/REVIEW-CHECKLIST.md` must be preserved.
- Phase 43 intake exists at `planning/phase-43/PHASE-43-UI-UX-GAMEPLAY-INTAKE-2026-07-03.md`.
- Phase 43 recommendations/routing exists at `planning/phase-43/PHASE-43-RECOMMENDATIONS-AND-ROUTING-2026-07-03.md`.
- Progress evidence exists through `progress/PROGRESS-STEP-376.md`.

## Phase 42 Manual Review Result

Phase 42 manual review passed overall and confirmed that the site stats, developer dashboard, onboarding/help, and supporting hardening work is usable.

The follow-up intake identified current-surface UX and gameplay-comfort issues that should be planned before adding larger progression, Focus Mode, social, profile-contract, or theme work.

Key manual-review follow-ups:

- ranked Practice Multiplayer still has user-visible queue/search-again/stale waiting-state concerns;
- Home, Stats, Help, Settings, Solo, Practice Multiplayer, and the global shell need simplification;
- invalid-guess messages and some gameplay/spectator growth states need viewport comfort work;
- durable confirmed UX expectations should become focused regression coverage where practical.

## Phase-Sizing Decision

Phase 43 should be a cohesive macro-phase because the work shares current route surfaces, app-shell ownership, mobile layout risk, visual review needs, and E2E harness concerns.

The implementation stages must remain narrow:

- ranked queue audit and follow-up should not be mixed with broad shell cleanup;
- information architecture cleanup should be separate from gameplay viewport changes;
- migration/RLS, gameplay-rule, deployment, and Git/GitHub actions remain separate gates;
- final hardening should carry broad verification, visual handoff, changelog, and manual checklist.

## Goals

- Reduce current app clutter before stacking larger systems on top.
- Repair or route the remaining ranked Practice queue/search-again issues.
- Make Home, Stats, Help/About/Settings, Solo, and Practice Multiplayer easier to scan.
- Remove ordinary-route horizontal overflow at normal zoom where Phase 43 touches the surface.
- Improve account/notification/back-to-top shell interactions without a full notification redesign.
- Improve invalid-guess and spectator viewport comfort without changing gameplay rules.
- Preserve all privacy, Daily, ranked, public profile, private matchmaking, spectator, mobile scroll, gameplay, and Elo boundaries.
- Promote durable user-confirmed UX behavior into focused tests or manual checklist coverage where practical.

## In Scope

### Ranked Practice Queue Follow-Up

- Reproduce the three-player ranked Practice matching issue from the Phase 43 intake.
- Investigate recent-opponent avoidance, stale queue rows, idempotency keys, queue polling, finalization state, and search-again routing.
- Repair source/test behavior if the issue is source-side and bounded.
- Clear stale "Still waiting for a compatible signed-in rival" state after match/open/finalization.
- Decide whether "Check ranked queue" should be kept, removed, renamed, or redesigned.
- Add real two-client or three-client E2E coverage if behavior changes.

Stop if the evidence proves a trusted queue RPC or database-contract gap.

### Stats Information Architecture

- Keep personal/local Stats first.
- Move public aggregate site stats lower on the Stats route.
- Label public stats as aggregate-only and separate from private local history.
- Preserve Phase 42 parser allowlists and public/admin dashboard privacy boundaries.

### Help, About, And Settings Cleanup

- Replace current Help content with a smaller placeholder or transitional Help surface.
- Move useful rules/context copy into About if it is not already represented there.
- Move Help navigation between Settings and Feedback.
- Remove the large Help/tutorial card from the top of Settings.
- Preserve Help as the later home for richer visual or interactive tutorials.

### Global Shell And Home Cleanup

- Remove or demote the right-side mode/account/sync/sound/theme panel from ordinary route pages.
- Move sync access into Profile or Settings after a small audit.
- Avoid duplicate global sound/theme controls where Settings/Profile own those responsibilities.
- Simplify Home's default information density.
- Preserve future Home widgets as later work, not Phase 43 implementation.
- Repair Recent Results or equivalent touched surfaces so they do not require horizontal scrolling at normal zoom.

### Practice Multiplayer Layout Cleanup

- Collapse or demote the Ranked Practice V1 explanatory block.
- Reconsider Private Practice requests placement without building a full social inbox or mailbox.
- Reduce the dense completed/canceled/won/lost game button grid.
- Prefer History for completed-game review if existing participant-owned reads and routing can support it safely.
- Keep active/current multiplayer items easy to find.

### Solo Layout Cleanup

- Apply cleanup to relevant Solo subtabs, not only Practice Solo.
- Make OG/GO mode choice compact and polished.
- Remove redundant Word length / Current puzzle / Chain status / Seed lists rows where those facts are already obvious.
- Preserve gameplay setup locks, Practice GO chain behavior, Hard Mode behavior, and lower configuration/gameplay content the user marked as useful.

### Top Account, Notifications, Clocks, And Back-To-Top

- Turn the signed-in avatar/name chip into a dropdown with "View profile" and "Sign out."
- Close the account dropdown on outside click or repeated avatar click.
- Condense next-Daily and Daily Multiplayer clock controls without removing their functions.
- Close expanded notifications on outside/background click.
- Add a non-overlapping back-to-top control after meaningful page scroll.

### Gameplay And Spectator Viewport Comfort

- Display transient invalid-guess and Hard Mode messages without shifting the on-screen keyboard vertically.
- Preserve message content and existing invalid-guess behavior.
- Explore bounded auto-scroll for persistent gameplay messages, board growth, or spectator latest-turn visibility only when the user is already centered on the relevant gameplay surface.
- Stop auto-scroll when the user scrolls away.
- Preserve public/guest spectator read-only behavior and Daily spectator exclusion.

## Out Of Scope

- Source/runtime implementation before later approval.
- Test implementation before later approval.
- Supabase migrations or migration execution.
- Supabase or Vercel configuration.
- Deployment, release, staging, commits, pushes, PRs, merges, branch deletion, or backup workflow execution.
- Public/guest spectator contract changes.
- Spectator presence, counts, lists, sorting, or viewer tracking.
- Service workers, push subscriptions, or background push.
- Gameplay-rule changes, including draw-by-repetition.
- Elo algorithm changes or rating-authority changes.
- Profile model simplification or public/private profile contract changes.
- Custom-code removal/rerouting, private Daily requests, ranked Daily, or Daily claim contract changes.
- Full social inbox, mailbox, following, messaging, or notification-center redesign.
- Rich GIF/interactive tutorial media.
- User-configurable Home widgets.
- Progression HUD counters, Focus Mode, compact navigation, or broad mobile shell overhaul.
- Theme proposal modernization or concrete theme implementation.
- Original stable `brrrdle` repository work.

## Recommended Phase 43 V1 Scope

The recommended V1 is current-surface cleanup plus one ranked queue follow-up path:

1. Reproduce and fix or route the ranked Practice queue/search-again/stale-status issues.
2. Clean up Stats, Help/About/Settings, Home/shell, Solo, and Practice Multiplayer surfaces.
3. Add small global interaction fixes: account dropdown, notification click-away, clock condensation, and back-to-top.
4. Stabilize invalid-guess keyboard positioning and bounded spectator/latest-turn viewport behavior where feasible.
5. Add focused regression coverage for durable confirmed behavior.

Anything that requires new database contracts, new social systems, new gameplay rules, or profile contract changes should be deferred to later gated phases.

## Recommended Stage Breakdown

### Stage 43.0 - Protected Baseline And Intake Confirmation

- Confirm repo state, branch, remotes, local `HEAD`, and `origin/main`.
- Preserve `planning/phase-42/REVIEW-CHECKLIST.md`.
- Record current Phase 43 planning/intake/recommendation/progress artifacts.
- Run the protected baseline verification gate.
- Do not begin audit or implementation.

### Stage 43.1 - Current UX And Ranked Queue Audit

- Reproduce or characterize ranked Practice queue issues with the existing E2E harness where feasible.
- Audit Home, shell/right rail, Stats, Help, About, Settings, Solo, Practice Multiplayer, notifications, clocks, back-to-top needs, gameplay viewport, and spectator viewport surfaces.
- Decide whether Stage 43.2 can remain source/test-only or requires a migration/RLS addendum.

### Stage 43.2 - Ranked Practice Queue Follow-Up

- Repair ranked queue/search-again/stale-status behavior if source/test-only.
- Add focused tests/E2E using existing two-client or three-client harnesses.
- Stop and route to addendum planning if the queue issue is a database/RPC contract gap.

### Stage 43.3 - Stats, Help, About, And Settings Information Architecture

- Reorder Stats local/public content.
- Replace or shrink Help content and move useful copy to About.
- Remove the Settings Help card.
- Move Help navigation between Settings and Feedback.
- Add focused tests for route/copy/order behavior.

### Stage 43.4 - App Shell, Header, Home, And Horizontal Overflow Cleanup

- Remove or demote ordinary-route right-rail clutter.
- Add account dropdown behavior and safe sign-out placement.
- Condense clocks.
- Simplify Home default density.
- Repair Home Recent Results horizontal overflow.
- Add focused component/browser/mobile-layout coverage.

### Stage 43.5 - Solo And Practice Multiplayer Density Cleanup

- Improve Solo mode toggles and redundant status rows.
- Collapse or demote ranked Practice explanatory copy.
- Replace the dense Practice Multiplayer completed-game button grid with a cleaner current/history split if safe.
- Preserve active-game findability and participant-owned access boundaries.

### Stage 43.6 - Gameplay Viewport, Notifications, Back-To-Top, And Spectator Comfort

- Stabilize transient invalid-guess keyboard layout.
- Explore bounded persistent-message and spectator latest-turn auto-scroll.
- Add notification click-away and back-to-top behavior.
- Add focused browser and visual coverage where practical.

### Stage 43.7 - Final Hardening, Visual Review, Changelog, And Manual Checklist

- Review prior Phase 43 stages for regressions and stale docs.
- Run focused regression coverage, full verification, visual handoff review, changelog, manual review checklist, and progress evidence.
- Halt before Git handoff preparation.

## Success Criteria

- Ranked queue follow-up is either repaired with source/test evidence or clearly routed to a narrower addendum gate.
- Home, Stats, Help/About/Settings, Solo, and Practice Multiplayer are visibly simpler and easier to scan.
- Touched ordinary route surfaces avoid normal-zoom horizontal overflow.
- Account dropdown, notification click-away, clock, and back-to-top behavior is predictable and mobile-safe.
- Invalid-guess messages no longer move the keyboard under repeated clicks.
- Spectator/latest-turn viewport behavior improves without changing spectator contracts.
- Focused tests cover the durable new behavior where practical.
- Phase 39 mobile scroll smoothness remains protected.
- Public stats, admin dashboard, profile privacy, private matchmaking, ranked queue, public/guest spectator, Daily claim, gameplay-rule, and Elo boundaries remain intact.
- Final hardening creates changelog, review checklist, visual handoff evidence, and progress records.

## Likely Files And Modules

Likely source surfaces for later stages:

- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/app/gameplayAutoCenter.ts`
- `src/dashboard/DashboardHome.tsx`
- `src/solo/SoloWorkspace.tsx`
- `src/help/HelpPanel.tsx`
- `src/account/AccountBadge.tsx`
- `src/account/ProfilePanel.tsx`
- `src/account/Settings.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/stats/PublicSiteStatsPanel.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/multiplayerPanelRankedQueue.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/notifications/NotificationCenter.tsx`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`
- `src/ui/Button.tsx`
- `src/ui/Navigation.tsx`
- `src/ui/Panel.tsx`
- `src/ui/SubtabBar.tsx`
- `src/ui/Tooltip.tsx`

Likely test and harness surfaces for later stages:

- `src/app/*.test.ts`
- `src/dashboard/DashboardHome.test.tsx`
- `src/solo/SoloWorkspace.test.tsx`
- `src/help/HelpPanel.test.tsx`
- `src/account/AccountBadge.test.tsx`
- `src/account/Settings.test.tsx`
- `src/stats/*.test.tsx`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/multiplayerRepository.test.ts`
- `src/notifications/NotificationCenter.test.tsx`
- `e2e/fixtures/twoClientGame.ts`
- `e2e/fixtures/threeClientGame.ts`
- `e2e/fixtures/gameActions.ts`
- `e2e/fixtures/supabaseAdmin.ts`
- `e2e/gameplay/multiplayer-reliability.spec.ts`
- `e2e/gameplay/practice-multiplayer-og.spec.ts`
- `e2e/gameplay/private-matchmaking.spec.ts`
- `e2e/gameplay/live-v1-spectator.spec.ts`
- `e2e/layout/mobile-scroll.spec.ts`

Likely documentation surfaces:

- `planning/phase-43/`
- `planning/specs/phase-43/`
- `planning/testing/TESTING-SUITE.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

## Migration/RLS Constraints

Phase 43 should start migration-free.

Create a migration/RLS addendum only if audit proves that:

- ranked queue search-again/matching cannot be fixed through source/test behavior alone;
- History-to-completed-game routing requires a new participant-owned projection;
- any planned cleanup would require new persisted request, queue, profile, Daily, spectator, or notification contracts.

Do not modify public stats/admin dashboard RPCs, profile/privacy contracts, private matchmaking contracts, public/guest spectator projections, Daily claim contracts, ranked settlement authority, or direct browser grants in Phase 43 unless a later prompt explicitly authorizes a reviewed addendum.

## Privacy And Supabase Constraints

- Do not expose raw auth IDs, emails, private profile fields, queue internals, rating internals, private row payloads, answers, seeds, tokens, auth state, local artifacts, screenshots, videos, or traces.
- Keep public stats aggregate-only.
- Keep admin dashboard authenticated/admin-gated.
- Keep public profile links and avatar/name surfaces on approved public profile fields only.
- Keep private Practice requests authenticated-only and Practice-only.
- Keep participant-owned active/completed game access bounded to existing safe repository reads.
- Preserve the residual `supabase_admin` future default-privilege risk as documented Phase 42 later hardening unless a future security prompt authorizes that work.

## Ranked Queue Constraints

- Preserve trusted ranked Practice settlement authority.
- Preserve ranked/unranked boundaries.
- Preserve cancelled/stale queue denial protections.
- Preserve recent-opponent or compatibility rules unless a later audit proves a bug and a safe repair is authorized.
- Preserve Daily exclusion from ranked Practice queue paths.
- Do not change Elo calculations.

## Gameplay And Elo Constraints

- Do not change OG or GO rules.
- Do not change Hard Mode validation.
- Do not change scoring, timeout, forfeit, solved-row hold, GO transition, keyboard-state, Daily claim, or Elo behavior.
- Treat draw-by-repetition as a future gameplay-rule gate, not Phase 43 UI cleanup.
- Keep viewport auto-scroll changes visual/client-only unless a later spec authorizes gameplay state changes.

## Spectator Constraints

- Preserve Phase 38 public/guest Practice Live read-only boundaries.
- Preserve Daily spectator exclusion.
- Do not add spectator presence, counts, lists, sorting, identity-bearing viewer lists, tracking, or contract changes.
- Spectator latest-turn work, if included, should be viewport comfort only.

## Notification And Routing Constraints

- Notification click-away may close expanded UI, but must not erase notification state, mutate read/dismiss metadata, or create a mailbox.
- Account dropdown may expose View profile and Sign out, but should not rewrite profile/privacy contracts.
- Search-again auto-route should only navigate the requester when the requester is still in the relevant waiting/postgame context.
- If the player is elsewhere or active in another game, prefer notification or passive status behavior over abrupt navigation.

## Mobile And Visual Constraints

- Preserve Phase 39 mobile scroll smoothness.
- Use the mobile scroll/layout harness to protect normal-zoom overflow where practical.
- Do not introduce fixed/sticky controls that overlap gameplay, navigation, notifications, or back-to-top behavior.
- Avoid broad one-phase redesign; this is cleanup of current surfaces.

## Verification Strategy

Planning-only work uses lightweight checks:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- `git status --short --branch`

Implementation stages should run focused tests first, then the stage-specific verification gate.

Final hardening should run:

- focused regression tests;
- relevant Playwright/E2E;
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
- watched-port/process cleanup checks;
- `git status --short --branch`.

## Visual Handoff Review Expectations

Phase 43 should run a final visual handoff review because the phase is visibly UI-heavy.

Suggested capture surfaces:

- Home desktop/mobile after simplification.
- Stats local/public ordering.
- Help/About/Settings after information architecture cleanup.
- Solo Daily/Practice subtabs.
- Practice Multiplayer setup/request/history surfaces.
- Account dropdown and notifications click-away states.
- Gameplay invalid-guess keyboard state.
- Spectator latest-turn view if changed.

Artifacts must stay local-only under ignored `test-results/visual-review/phase-43-stage-43-7/` or the stage-specific equivalent.

## Manual Review Checklist Expectations

The final Phase 43 checklist should include:

- ranked queue/search-again follow-up checks;
- Home density and horizontal-overflow checks;
- Stats local/public ordering checks;
- Help/About/Settings placement checks;
- Solo and Practice Multiplayer layout checks;
- account dropdown, notification click-away, clock, and back-to-top checks;
- invalid-guess keyboard stability checks;
- spectator latest-turn comfort checks if implemented;
- preserved invariants and deferred work.

## GitHub Backup Workflow Expectations

After Phase 43 final hardening and manual-review checklist creation, run a separate Git handoff preparation gate before any backup.

The governed `brrrdle-github-backup` workflow remains separately authorized. Phase 43 planning, spec, implementation, final hardening, Git handoff preparation, and GitHub backup must stay separate gates.

## Risks

- Ranked queue issues may reveal a database/RPC contract problem rather than a source-only bug.
- Removing the right rail may touch high-conflict app shell and navigation surfaces.
- Condensing Home/Practice Multiplayer can accidentally hide useful active-game affordances.
- Invalid-guess keyboard stability may be browser/viewport-sensitive and need careful Playwright evidence.
- Spectator auto-scroll can become annoying if it ignores user intent.
- Over-testing cosmetic details can create brittle maintenance cost.
- Profile/custom-code/private Daily/ranked Daily requests are tempting adjacent work but should remain deferred.

## Open Decisions

- Whether the three-player ranked queue issue reproduces locally/remotely and whether it is source-only.
- Whether "Check ranked queue" has enough value to preserve.
- Whether completed multiplayer game review can safely route through History in Phase 43.
- Where sync access belongs after right-rail removal: Profile or Settings.
- Whether Help should be a placeholder-only page or a slimmer transitional page during Phase 43.
- How much spectator auto-scroll should be attempted without creating a new spectator feature.
- Which UX expectations should become automated tests versus manual checklist items.

## Next Gated Action

Create the unified Phase 43 specification under `planning/specs/phase-43/`.

The spec should turn this brief into implementation-oriented requirements while preserving the same boundaries. Do not begin implementation until the unified specification, detailed implementation plan, and protected baseline gates are separately authorized.
