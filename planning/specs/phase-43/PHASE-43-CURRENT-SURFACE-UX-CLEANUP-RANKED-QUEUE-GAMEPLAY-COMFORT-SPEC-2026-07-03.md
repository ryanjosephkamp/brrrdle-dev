# Phase 43 Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort Specification

**Status**: Unified specification for review only.
**Phase**: Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort.
**Date**: 2026-07-03.
**Repository**: `brrrdle-dev`.

## Authority

This specification is governed by:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `planning/phase-43/PHASE-43-UI-UX-GAMEPLAY-INTAKE-2026-07-03.md`.
7. `planning/phase-43/PHASE-43-RECOMMENDATIONS-AND-ROUTING-2026-07-03.md`.
8. `planning/phase-43/PLANNING-BRIEF.md`.
9. Current roadmap, testing, progress, and workflow documents.

This document does not authorize implementation. It does not authorize source/runtime edits, test edits, migrations, Supabase or Vercel configuration, deployment, Git/GitHub operations, public/guest spectator contract changes, spectator presence/count/list behavior, service workers, push infrastructure, gameplay-rule changes, Elo changes, local Codex skill changes, secret printing, private data exposure, local artifact exposure, or original stable `brrrdle` repository work.

## Current Baseline

- Phase 42 is complete, backed up, merged, and manually reviewed.
- Expected local and remote `main`: `a81e636cd26eb178e1d0bcc75554a1edffe7639d`.
- The user-updated Phase 42 manual review checklist at `planning/phase-42/REVIEW-CHECKLIST.md` must be preserved.
- Phase 43 intake exists at `planning/phase-43/PHASE-43-UI-UX-GAMEPLAY-INTAKE-2026-07-03.md`.
- Phase 43 recommendations/routing exists at `planning/phase-43/PHASE-43-RECOMMENDATIONS-AND-ROUTING-2026-07-03.md`.
- Phase 43 planning brief exists at `planning/phase-43/PLANNING-BRIEF.md`.
- Progress evidence exists through `progress/PROGRESS-STEP-377.md`.

## Phase Definition

Phase 43 is a cohesive macro-phase for current-surface usability cleanup. It should improve the app players already use before adding larger shell modes, progression surfaces, social systems, profile-contract changes, theme work, or gameplay-rule changes.

The phase is intentionally broad at the macro level and intentionally narrow at the stage level. Each implementation stage must be independently reviewable, focused on a small set of related surfaces, and protected by targeted tests plus the stage-specific verification gate.

## Goals

- Reduce visible clutter and information density across current surfaces.
- Repair or safely route the remaining ranked Practice queue/search-again/stale-status issues.
- Improve Home, Stats, Help/About/Settings, Solo, and Practice Multiplayer scanability.
- Remove ordinary-route horizontal overflow at normal zoom where Phase 43 touches the surface.
- Improve top account, notification, clock, and back-to-top interactions without a mailbox/social redesign.
- Improve gameplay invalid-guess and spectator/latest-turn viewport comfort without changing gameplay contracts.
- Preserve Phase 42 stats/dashboard/help work, Phase 41 multiplayer reliability repairs, Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, Phase 38 public/guest spectator boundaries and Daily exclusion, Daily claim safety, gameplay rules, and Elo math.
- Promote durable manually confirmed UX expectations into focused automated or manual regression coverage where practical.

## In Scope

### Ranked Practice Queue Follow-Up

- Reproduce or characterize the three-player ranked Practice queue issue from the Phase 43 intake.
- Inspect recent-opponent avoidance, stale queue rows, idempotency keys, queue polling, finalization state, search-again routing, and user-visible waiting status.
- Repair source/test behavior if the cause is bounded to client state, routing, polling, cleanup, or request lifecycle behavior.
- Keep the primary queued status visually stable during background polling.
- Clear stale waiting panels after match/open/finalization.
- Decide whether the "Check ranked queue" action should remain, be renamed, be reduced, or be removed.
- Add real two-client or three-client Supabase-backed E2E coverage if source behavior changes.

Stop if evidence proves a trusted queue RPC, RLS, or database-contract gap.

### Stats Information Architecture

- Keep local/personal Stats content first.
- Move public aggregate site stats lower on the Stats route.
- Label public site stats as aggregate-only and separate from private local history.
- Preserve public stats parser allowlists and public/admin dashboard privacy boundaries from Phase 42.

### Help, About, And Settings Cleanup

- Replace the current large Help content with a smaller placeholder or transitional Help surface.
- Move any still-useful rules/context copy into About if it is not already represented there.
- Move Help navigation between Settings and Feedback.
- Remove the large Help/tutorial card from the top of Settings.
- Preserve Help as the later home for richer visual, GIF, or interactive tutorial media.

### Global Shell, Header, And Home Cleanup

- Remove or demote the right-side mode/account/sync/sound/theme rail from ordinary route pages.
- Move sync access into Profile or Settings after a focused source audit.
- Avoid duplicate global sound/theme controls when Settings/Profile already own those responsibilities.
- Simplify Home's default information density.
- Preserve configurable Home widgets as later work, not Phase 43 implementation.
- Repair Recent Results or equivalent touched surfaces so normal zoom does not require horizontal scrolling.

### Practice Multiplayer Density Cleanup

- Collapse, demote, or make tooltip-like the Ranked Practice V1 explanatory block.
- Reconsider Private Practice requests placement without creating a full request inbox.
- Reduce the dense completed/canceled/won/lost game button grid.
- Prefer History for completed-game review only if existing participant-owned reads and routing can support it safely.
- Keep active/current games easy to find and open.

### Solo Density Cleanup

- Apply cleanup to applicable Solo subtabs, not only Practice Solo.
- Make OG/GO mode choice compact and visually polished.
- Remove redundant Word length, Current puzzle, Chain status, and Seed lists rows where those facts are already obvious from the active game or setup surface.
- Preserve Practice GO chain behavior, setup locks, Hard Mode behavior, and lower configuration/gameplay content the user marked as useful.

### Account, Notifications, Clocks, And Back-To-Top

- Turn the signed-in avatar/name chip into a dropdown with "View profile" and "Sign out."
- Close the account dropdown on outside click and repeated avatar click.
- Condense next-Daily and Daily Multiplayer clock controls without removing their functions.
- Close expanded notifications on outside/background click without mutating notification data.
- Add a non-overlapping back-to-top control after meaningful page scroll.

### Gameplay And Spectator Viewport Comfort

- Display transient invalid-guess and Hard Mode messages without vertically shifting the on-screen keyboard.
- Preserve the content and timing of existing invalid-guess messages.
- Keep persistent gameplay messages such as Give Up or Reveal Answer intact.
- Explore bounded auto-scroll for persistent messages, board growth, or spectator latest-turn visibility only when the user is already centered on the relevant gameplay surface.
- Stop auto-scroll when the user scrolls away.
- Preserve public/guest spectator read-only behavior and Daily spectator exclusion.

## Out Of Scope

- Source/runtime implementation before later approval.
- Test implementation before later approval.
- Supabase migrations, migration execution, or Supabase/Vercel configuration.
- Deployment, release, staging, commits, pushes, PRs, merges, branch deletion, or backup workflow execution.
- Profile/data-contract simplification.
- Custom-code removal/rerouting, private Daily requests, ranked Daily, or Daily claim contract changes.
- Full social inbox, mailbox, following, messaging, or notification-center redesign.
- Rich GIF or interactive tutorial media.
- User-configurable Home widgets.
- Progression HUD counters, Focus Mode, compact navigation, or broad mobile shell overhaul.
- Theme proposal modernization or concrete theme implementation.
- Public/guest spectator contract changes.
- Spectator presence, count, list, sorting, viewer tracking, or identity-bearing spectator displays.
- Service workers, push subscriptions, or background push.
- Gameplay-rule changes, including draw-by-repetition.
- Elo algorithm changes or rating-authority changes.
- Original stable `brrrdle` repository work.

## Success Criteria

- The ranked queue issue is either repaired with source/test evidence or routed to a narrower migration/RLS addendum with non-secret reproduction evidence.
- Home, Stats, Help/About/Settings, Solo, and Practice Multiplayer surfaces are visibly simpler and easier to scan.
- Touched ordinary route surfaces avoid horizontal overflow at normal zoom.
- Account dropdown, notification click-away, clock condensation, and back-to-top behavior are predictable and mobile-safe.
- Invalid-guess messages no longer move the keyboard under repeated interactions.
- Spectator/latest-turn viewport comfort improves without changing spectator contracts.
- Focused tests cover durable behavior where practical.
- Final Phase 43 verification passes and final handoff artifacts include changelog, manual review checklist, visual review evidence, and progress records.

## Stage Breakdown

### Stage 43.0 - Protected Baseline And Intake Confirmation

- Confirm repo path, branch, status, remotes, `HEAD`, and `origin/main`.
- Confirm original stable `brrrdle` is not used.
- Preserve `planning/phase-42/REVIEW-CHECKLIST.md`.
- Record current Phase 43 intake, recommendation, planning, spec, and progress artifacts.
- Run baseline verification.
- Do not begin audit or implementation.

### Stage 43.1 - Current UX And Ranked Queue Audit

- Reproduce or characterize the ranked Practice queue/search-again/stale-status issue.
- Audit Home, right rail, header, Stats, Help, About, Settings, Solo, Practice Multiplayer, notifications, clocks, back-to-top, gameplay viewport, and spectator viewport surfaces.
- Decide whether Stage 43.2 can remain source/test-only.
- Decide whether any Phase 43 item needs migration/RLS addendum planning.
- Do not implement fixes during the audit.

### Stage 43.2 - Ranked Practice Queue Follow-Up

- Implement only the smallest safe source/test repair if Stage 43.1 proves a source-side cause.
- Preserve ranked queue cancellation, matching, search-again, trusted settlement, Daily exclusion, gameplay rules, and Elo math.
- Add focused Vitest and real E2E coverage as needed.
- Stop for migration/RLS addendum planning if a database/RPC contract gap is proven.

### Stage 43.3 - Stats, Help, About, And Settings Information Architecture

- Reorder Stats so personal/local content remains primary and public stats are clearly aggregate-only.
- Replace or shrink Help content and route useful explanatory copy to About where appropriate.
- Remove the large Settings Help card.
- Move Help navigation between Settings and Feedback.
- Add focused route, copy, and ordering tests.

### Stage 43.4 - App Shell, Header, Home, And Horizontal Overflow Cleanup

- Remove or demote ordinary-route right-rail clutter.
- Add account dropdown behavior and safe sign-out placement.
- Condense top clocks.
- Simplify Home default density while preserving active-game access.
- Remove horizontal overflow from Home Recent Results or equivalent touched layouts.
- Add component, route, and mobile/desktop layout coverage where practical.

### Stage 43.5 - Solo And Practice Multiplayer Density Cleanup

- Improve Solo mode toggles and redundant status rows.
- Collapse or demote ranked Practice explanation.
- Replace the dense Practice Multiplayer completed-game grid with a cleaner current/history split if safe.
- Preserve active game findability, participant-owned access, and all gameplay setup behavior.

### Stage 43.6 - Gameplay Viewport, Notifications, Back-To-Top, And Spectator Comfort

- Stabilize transient invalid-guess keyboard layout.
- Add notification click-away and back-to-top behavior if not already covered.
- Implement only bounded client-side auto-scroll behavior for gameplay/spectator comfort if safe.
- Preserve all spectator read-only and Daily exclusion contracts.
- Add focused browser or visual checks for viewport behavior.

### Stage 43.7 - Final Hardening, Visual Review, Changelog, And Manual Checklist

- Review Phase 43 stages for regressions, stale docs, privacy gaps, visual issues, and route gaps.
- Add only narrow final-hardening fixes if required.
- Run focused regression coverage and full verification.
- Run visual handoff review with ignored local-only artifacts.
- Create `planning/phase-43/CHANGELOG.md`.
- Create `planning/phase-43/REVIEW-CHECKLIST.md`.
- Halt before Git handoff preparation.

## Likely Files And Modules

Likely source surfaces for later approved stages:

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

Likely test and harness surfaces for later approved stages:

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

## Migration/RLS Gates

Phase 43 should start migration-free.

Create a migration/RLS addendum only if audit proves that:

- ranked queue search-again or matching cannot be fixed through source/test behavior alone;
- History-to-completed-game routing requires a new participant-owned projection;
- any planned cleanup requires new persisted request, queue, profile, Daily, spectator, notification, stats, or admin-dashboard contracts.

Do not modify public stats/admin dashboard RPCs, profile/privacy contracts, private matchmaking contracts, public/guest spectator projections, Daily claim contracts, ranked settlement authority, or browser grants without a separately authorized addendum.

## Privacy And Supabase Constraints

- Do not expose raw auth IDs, emails, private profile fields, queue internals, rating internals, private row payloads, answers, seeds, tokens, auth state, local artifacts, screenshots, videos, or traces.
- Keep public stats aggregate-only.
- Keep admin dashboard authenticated/admin-gated.
- Keep public profile names/avatars sourced only from approved public profile fields.
- Keep private Practice requests authenticated-only and Practice-only.
- Keep participant-owned active/completed game access bounded to existing safe repository reads.
- Preserve Phase 42 Supabase grant/RLS hardening and the documented residual `supabase_admin` future default-privilege risk as later security work unless separately authorized.

## Ranked Queue Constraints

- Preserve trusted ranked Practice settlement authority.
- Preserve ranked/unranked boundaries.
- Preserve cancelled/stale queue denial protections.
- Preserve Daily exclusion from ranked Practice queue paths.
- Preserve recent-opponent or compatibility rules unless a later audit proves a bug and a safe repair is authorized.
- Do not change Elo calculations or rating-authority rules.

## Gameplay And Elo Constraints

- Do not change OG or GO rules.
- Do not change Hard Mode validation.
- Do not change scoring, timeout, forfeit, solved-row hold, GO transition, keyboard-state, Daily claim, or Elo behavior.
- Treat draw-by-repetition as a future gameplay-rule gate, not Phase 43 UI cleanup.
- Keep viewport auto-scroll changes client-only and reversible by user scroll intent unless a later spec authorizes broader behavior.

## Spectator Constraints

- Preserve Phase 38 public/guest Practice Live read-only boundaries.
- Preserve Daily spectator exclusion.
- Do not add spectator presence, counts, lists, sorting, identity-bearing viewer lists, tracking, or contract changes.
- Spectator work in Phase 43 may only improve viewport comfort unless a later prompt explicitly changes scope.

## Notification And Routing Constraints

- Notification click-away may close expanded UI, but must not erase notification state or create a mailbox.
- Account dropdown may expose View profile and Sign out, but must not rewrite profile/privacy contracts.
- Search-again auto-route should only navigate the requester when the requester is still in the relevant waiting or postgame context.
- If a player is elsewhere or active in another game, prefer notification or passive status behavior over abrupt navigation.
- Back-to-top must not overlap gameplay, navigation, notification, or modal controls.

## Mobile And Visual Constraints

- Preserve Phase 39 mobile scroll smoothness.
- Use the mobile scroll/layout harness where practical to protect normal-zoom overflow.
- Avoid fixed or sticky controls that overlap core gameplay or route navigation.
- Avoid a broad redesign; Phase 43 cleans current surfaces rather than replacing the shell.
- Keep text fitting inside buttons, tabs, cards, and compact controls across mobile and desktop.

## Verification Strategy

Planning-only stages should run:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- `git status --short --branch`

Implementation stages should run focused tests first, then the stage-specific verification gate. Use real two-client or three-client Supabase-backed E2E only for multiplayer claims that need it.

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

## Visual Review Expectations

Phase 43 final hardening should run a visual handoff review because this phase is UI-heavy.

Suggested capture surfaces:

- Home desktop/mobile after simplification.
- Stats local/public ordering.
- Help, About, and Settings after information architecture cleanup.
- Solo Daily/Practice subtabs.
- Practice Multiplayer setup/request/history surfaces.
- Account dropdown and notifications click-away states.
- Gameplay invalid-guess keyboard state.
- Spectator latest-turn view if changed.

Artifacts must remain ignored and local-only under `test-results/visual-review/phase-43-stage-43-7/` or a stage-specific ignored path.

## Manual Checklist Expectations

The final Phase 43 manual checklist should include:

- ranked queue/search-again follow-up checks;
- Home density and horizontal-overflow checks;
- Stats local/public ordering checks;
- Help/About/Settings placement checks;
- Solo and Practice Multiplayer layout checks;
- account dropdown, notification click-away, clock, and back-to-top checks;
- invalid-guess keyboard stability checks;
- spectator latest-turn comfort checks if implemented;
- preserved prior-phase invariants and deferred-work confirmation.

## Risks

- Ranked queue issues may be a database/RPC contract problem rather than a source-only bug.
- Removing or demoting the right rail may touch high-conflict app-shell and navigation surfaces.
- Simplifying Home or Practice Multiplayer can hide useful active-game affordances if not tested carefully.
- Invalid-guess keyboard behavior may be viewport/browser-sensitive.
- Spectator auto-scroll can be disorienting if it ignores user intent.
- Cosmetic assertions can become brittle if over-automated.
- Adjacent profile, custom-code, private Daily, ranked Daily, social, and gameplay-rule work can easily exceed Phase 43 scope.

## Open Decisions

- Whether the three-player ranked queue issue reproduces and whether it is source-only.
- Whether "Check ranked queue" should remain.
- Whether completed multiplayer game review can safely route through History.
- Whether sync access belongs in Profile, Settings, or both after right-rail demotion.
- Whether Help should become a placeholder or a slimmer transitional page in Phase 43.
- How much spectator auto-scroll can be safely implemented without creating a new spectator feature.
- Which UX expectations should be automated versus left to the manual checklist.

## Next Gated Action

Create `planning/phase-43/IMPLEMENTATION-PLAN.md` for review only.

The detailed implementation plan should translate this specification into narrow gated stages, define stop conditions, list stage-specific verification, and provide the Stage 43.0 protected-baseline prompt. Do not begin source implementation until the implementation plan and Stage 43.0 baseline are separately authorized.
