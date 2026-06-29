# Phase 36 Planning Brief: Leaderboard And Stats Navigation Split

**Status**: Draft planning brief for user review.
**Phase**: Phase 36.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-28.

## Authority

This brief follows the current user prompt, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, completed Phase 35 evidence, and the Phase 35 manual review result.

This is a planning artifact only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

## Current Baseline

- Phase 35 is complete, backed up to GitHub, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `cce41908a0a760086e9b5bf0da6009bdbb866667`.
- Phase 35 completed ranked Live identity repair, authenticated spectator safe-name support, auth redirect hardening, player-facing auth copy, signed-in password-change access, email-change configuration gate documentation, current-player Profile tab, Settings/Danger Zone account-management cleanup, deployment/Supabase checklist docs, visual review, and manual review checklist.
- The user updated `planning/phase-35/REVIEW-CHECKLIST.md` with clean manual review results. That user edit must be preserved.

## Manual Review Result

The Phase 35 manual review is clean. The user confirmed all checklist items pass.

The new observations are not Phase 35 blockers. They are Phase 36 planning inputs:

- Active Games can still show generic `Rival` labels where safe public/profile names should appear.
- The signed-in password-change modal can show reset-link wording for a password-update failure.
- Settings section order and heading capitalization need a small cleanup.
- The planned Leaderboard tab and Stats split remain the main Phase 36 feature direction.

## Recommended Phase 36 Direction

Phase 36 should focus on a current-surface information architecture and polish pass:

1. Add a first-class `Leaderboard` main tab between `Stats` and `Words`.
2. Move public ranked leaderboard content out of Stats and into Leaderboard.
3. Move Multiplayer Ratings / competitive multiplayer rating content out of Stats and into Leaderboard where appropriate.
4. Leave local/personal gameplay statistics in Stats.
5. Repair Active Games safe-name hydration so participant cards prefer safe public/profile names when available.
6. Improve signed-in password-change failure copy so it does not mention reset links.
7. Reorder and consolidate current Settings sections: Gameplay, Sound effects, Notifications, Account management.

This direction is intentionally narrower than a broad Stats redesign or social expansion. It improves the player's current navigation and fixes newly reported surface bugs while preserving the privacy and rating boundaries established in Phases 29 through 35.

## Goals

- Make leaderboard and competitive rating content discoverable without burying local stats or multiplayer ratings deep inside the Stats tab.
- Keep Stats focused on local/personal gameplay statistics.
- Keep public leaderboards display-only, privacy-safe, non-authoritative, and limited to approved ranked Practice buckets.
- Make Active Games safe names consistent with the Phase 35 Live safe-name repair.
- Keep password-management copy accurate for the signed-in password-update path.
- Simplify Settings section order and reduce redundant account sections after the Profile tab exists.

## In Scope

- Main route/navigation updates for a `Leaderboard` tab between `Stats` and `Words`.
- Stats dashboard split so local stats remain in Stats and public leaderboard/competitive multiplayer ratings move to Leaderboard.
- Component extraction or reuse for a Leaderboard page, using existing public leaderboard and MultiplayerStatsPanel surfaces.
- Active Games identity audit and source repair using existing safe participant/public-profile identity seams if available.
- A migration/RLS addendum gate only if Active Games safe names cannot be repaired from existing safe source/RPC data.
- Signed-in password-change failure copy cleanup for current password / no-op / password-update failure cases.
- Settings section ordering, `Sound effects` capitalization, and consolidation of signed-in account email/sign-out controls into Account management if source review confirms no reason to keep a separate `Signed in` section.
- Focused tests and visual review expectations for the changed surfaces.
- Phase 36 changelog, review checklist, progress records, and GitHub backup handoff later in the phase.

## Out Of Scope

- Public/guest spectation.
- Spectator presence lists/counts, spectator sorting, or public projection expansion.
- Public/social profile browsing, clickable rival profiles, direct player match requests, private matchmaking/custom-code expansion, or request/mailbox flows.
- Daily ranked or ranked custom/private-code games.
- Public timed ranked leaderboards.
- Public site stats or private developer dashboard.
- Gameplay auto-scroll and browser back/forward navigation implementation.
- Beginner onboarding/help/tutorial implementation.
- Theme modernization or broad visual redesign.
- Service workers, push subscriptions, or background push.
- Production deployment, release, or Vercel/Supabase configuration changes.
- Gameplay-rule changes or Elo algorithm changes.

## Stage Breakdown

### Stage 36.0 - Protected Baseline

- Confirm repo state and Phase 35 manual-review status.
- Preserve user edits to `planning/phase-35/REVIEW-CHECKLIST.md`.
- Record the existing Phase 36 planning/spec/progress artifacts once created.
- Run the baseline verification gate before implementation.

### Stage 36.1 - Audit And Scope Lock

- Audit Stats, public leaderboard, MultiplayerStatsPanel, route/navigation, and responsive navigation surfaces.
- Audit Active Games identity inputs and compare them with Phase 35 Live identity hydration.
- Audit signed-in password-change error classification and Settings section layout.
- Decide whether Active Games identity can be source-only or requires a migration/RLS addendum.

### Stage 36.2 - Active Games Safe-Name Repair Or Addendum Gate

- Preferred path: source-only repair using existing participant identity/public-profile safe data.
- Stop for a migration/RLS addendum if Active Games lacks an authorized safe identity path.
- Ensure `Rival`, `Player one`, and `Player two` remain true fallbacks only.
- Preserve raw auth ID, email, private profile, queue, answer, seed, session, rating-internal, token, and local-artifact boundaries.

### Stage 36.3 - Leaderboard Tab And Stats Split

- Add a `Leaderboard` route/tab between `Stats` and `Words`.
- Move public ranked leaderboard content from Stats to Leaderboard.
- Move Multiplayer Ratings / competitive multiplayer rating content from Stats to Leaderboard.
- Leave local/personal stat cards, charts, and history-derived statistics in Stats.
- Keep public leaderboard buckets limited to approved untimed OG/GO ranked Practice unless a later phase explicitly approves more.

### Stage 36.4 - Settings And Password Copy Cleanup

- Change `Sound Effects` heading to `Sound effects`.
- Reorder Settings sections to Gameplay, Sound effects, Notifications, Account management.
- Consolidate signed-in email/sign-out controls into Account management if it produces a cleaner and truthful surface.
- Replace reset-link wording on signed-in password-update failures with password-update-specific copy.
- Avoid overclaiming exact Supabase failure reasons unless the source/API exposes them reliably.

### Stage 36.5 - Final Hardening, E2E, Visual Review, Manual Checklist

- Run focused regression and E2E coverage for Leaderboard navigation, Stats split, Active Games safe names, Settings order, and password copy.
- Run the visual handoff review gate for desktop and mobile-relevant surfaces.
- Create `planning/phase-36/CHANGELOG.md`.
- Create `planning/phase-36/REVIEW-CHECKLIST.md`.
- Run the full final verification gate and prepare for Git handoff.

## Success Criteria

- The main navigation includes `Leaderboard` between `Stats` and `Words`.
- Stats no longer renders the public ranked leaderboard or Multiplayer Ratings / competitive multiplayer rating block.
- Leaderboard renders the public ranked leaderboard and competitive multiplayer rating content clearly.
- Public ranked leaderboards remain display-only, authenticated/configured as before, non-authoritative, and limited to approved public buckets.
- Timed ranked buckets remain out of public leaderboards.
- Active Games cards show safe public/profile names for the rival when available from safe identity data.
- Generic Active Games labels appear only when safe identity is genuinely unavailable.
- Active Games does not expose raw auth IDs, emails, private profile fields, answers, seeds, queue internals, session internals, rating internals, tokens, or local artifacts.
- Signed-in password-change failures do not mention sending a reset link.
- If same-current-password detection is reliable, the copy tells the player to choose a new password. If it is not reliable, the copy remains truthful and password-update-specific.
- Settings section order is Gameplay, Sound effects, Notifications, Account management.
- The Settings `Signed in` section is removed or consolidated if source review confirms the Account management section can own its content cleanly.
- Phase 35 Profile tab behavior and Settings account-management gates remain intact.
- Phase 34 Live/Lobby/notification/Active Games behavior remains intact except for the approved Active Games safe-name repair.
- Phase 33 timed ranked Practice behavior remains intact.
- Gameplay rules and Elo math remain unchanged.

## Likely Files And Modules

- `src/app/routes.ts`
- `src/app/routes.test.ts`
- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/stats/StatsDashboard.test.tsx`
- `src/leaderboards/PublicRankedLeaderboardPanel.tsx`
- `src/leaderboards/PublicRankedLeaderboardPanel.test.tsx`
- `src/leaderboards/publicRankedLeaderboard.ts`
- `src/leaderboards/publicRankedLeaderboard.test.ts`
- `src/leaderboards/publicRankedLeaderboardViewModels.ts`
- `src/leaderboards/publicRankedLeaderboardViewModels.test.ts`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/MultiplayerStatsPanel.test.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerActiveGames.test.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerWorkspace.test.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerViewModels.test.ts`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`
- `src/account/PasswordResetModal.tsx`
- `src/account/auth.ts`
- `src/account/auth.test.ts`
- Relevant E2E surfaces for navigation, Active Games, and authenticated account flows.

## Migration And RLS Constraints

No migration is expected for the recommended Phase 36 path.

Active Games safe-name repair should first attempt to reuse existing Phase 32 participant identity and Phase 35 safe public-profile projection paths. If source review proves safe data is unavailable for the required Active Games perspectives, implementation must stop and route to a Phase 36 migration/RLS addendum before any SQL work.

Any migration/RLS addendum must preserve:

- default-private public profile boundaries;
- participant-only identity RPC boundaries;
- authenticated Live spectator read-only boundaries;
- public/guest spectation deferral;
- no raw auth IDs, emails, private profile fields, answers, seeds, sessions, queue internals, rating internals, tokens, or local artifacts;
- idempotency, rollback notes, and non-printing probe expectations.

## Verification Strategy

Planning-only verification for this brief:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Implementation-phase verification should include:

- focused route/navigation tests for the `Leaderboard` tab order;
- focused Stats/Leaderboard component tests for content relocation;
- focused public leaderboard and MultiplayerStatsPanel non-regression tests;
- focused Active Games view-model/component tests for safe names and fallbacks;
- focused Settings/account tests for section order, consolidated account management, and password-copy behavior;
- feasible E2E or browser checks for navigation, Active Games participant perspectives, and Settings password modal copy;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e` when user-visible navigation or multiplayer claims warrant it;
- `npm run test:full` for final hardening;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- final whitespace, CSV, secret/artifact, ignored-artifact, watched-port/process, and git-status checks.

## Visual Handoff Expectations

The final Phase 36 visual review should capture local-only ignored screenshots under `test-results/visual-review/phase-36-stage-36-5/` or the final approved stage path.

Expected scenarios:

- Desktop navigation showing `Leaderboard` between `Stats` and `Words`.
- Mobile/narrow navigation confirming no overlap or unreadable tab text.
- Stats tab showing local/personal stats without public leaderboard or multiplayer rating sections.
- Leaderboard tab showing public ranked leaderboard and competitive multiplayer rating content.
- Active Games with corrected safe rival names where safe public/profile data exists.
- Settings with section order Gameplay, Sound effects, Notifications, Account management.
- Password-change modal or safe test state showing password-update-specific failure copy if practical without recording private account data.

## Manual Review Checklist Expectations

The Phase 36 checklist should ask the user to verify:

- Leaderboard tab placement and readability.
- Stats contains only local/personal stats.
- Leaderboard contains public ranked leaderboard and competitive multiplayer ratings.
- Active Games names match safe public/profile names from both creator and joined-player perspectives when available.
- Generic rival labels appear only when no safe identity exists.
- Password-change failure copy no longer references reset links in the signed-in update path.
- Settings section order and `Sound effects` capitalization.
- Account management consolidation still preserves sign-out and password-change access.
- No public/guest spectation, public timed leaderboards, gameplay rule changes, or Elo math changes appeared.

## GitHub Backup Expectations

After Phase 36 implementation, final hardening, manual checklist creation, and Git handoff preparation are complete and clean, the next backup prompt should invoke the local `brrrdle-github-backup` skill for the all-in-one governed backup workflow unless the user explicitly asks for stepwise Git gates or forbids merge/cleanup.

## Risks

- Main navigation can become crowded on narrow screens after adding Leaderboard.
- Moving public leaderboard and rating surfaces can accidentally duplicate or drop required repository/auth props.
- Active Games may require async identity hydration that must not introduce flicker, stale names, or privacy leakage.
- Supabase password-update errors may not reliably distinguish same-current-password from other provider errors.
- Settings consolidation could hide sign-out or password-change controls if the layout is not tested across signed-in and signed-out states.

## Open Decisions

- Whether the new page component should live under `src/leaderboards/` or a broader route-level module.
- The exact route id for the new tab. Recommended: `leaderboard`.
- The exact color/tone for the new main tab. Recommended: choose a distinct existing-compatible tone and verify mobile readability.
- Whether Active Games identity repair is source-only or requires migration/RLS addendum planning.
- Whether Settings should fully remove the separate `Signed in` section or keep it if source review finds a clearer future expansion path.

## Deferred Routing

- Phase 37: gameplay auto-scroll to center the board on enter/join/resume, plus browser back/forward app navigation planning and implementation.
- Later public/spectator phase: public/guest spectation, spectator presence list/counts, spectator sorting, and public projection expansion.
- Later profile/social phase: public player profile pages, clickable rival profiles, public avatar policy/avatar size expansion, social browsing, and profile privacy expansion.
- Later matchmaking phase: private custom-code matchmaking, direct player match requests, request inbox/mailbox, and abuse-prevention design.
- Later telemetry/stats phase: public site stats and private developer dashboard.
- Later UX phase: onboarding, help, and tutorials.
- Later theme phase: theme proposal/template modernization and broad theme work.
- Explicitly not routed without future approval: service workers, push subscriptions, production deployment, release, gameplay-rule changes, and Elo algorithm changes.

## Next Gated Action

Create a unified Phase 36 specification under `planning/specs/phase-36/` that turns this planning brief into implementation-oriented scope, success criteria, stage gates, and verification expectations. Do not begin implementation until that specification and the detailed implementation plan are separately authorized.
