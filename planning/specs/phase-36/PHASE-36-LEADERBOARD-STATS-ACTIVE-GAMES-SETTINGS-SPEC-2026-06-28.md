# Phase 36 Leaderboard, Stats, Active Games, And Settings Specification

**Status:** Unified specification for review.
**Repository:** `brrrdle-dev` only.
**Created:** 2026-06-28.
**Baseline:** `main` and `origin/main` expected at `cce41908a0a760086e9b5bf0da6009bdbb866667`.

## Authority

This specification is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, the Phase 36 planning brief, completed Phase 35 auth/profile/deployment/Live identity readiness, completed Phase 34 Multiplayer Live/Lobby/notification stabilization, completed Phase 33 competitive ladder readiness, completed Phase 32 multiplayer stabilization and participant identity routing, completed Phase 31 postgame actions, completed Phase 30 public leaderboards, completed Phase 29 public profile privacy foundations, completed Phase 28 read-only Live behavior, completed Phase 27 ranked Practice foundations, `docs/deployment.md`, `docs/supabase.md`, `docs/ranked-multiplayer.md`, and the progress ledger.

This document is a planning/specification artifact only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

## Current Baseline

Phase 35 is complete, backed up, merged, branch-cleaned, and manually reviewed. The user reported that all Phase 35 checklist items pass.

Phase 35 left these durable current surfaces:

- current-player `Profile` route between `Words` and `Settings`;
- player-facing auth copy and signed-in password-change access;
- deployment/Supabase redirect checklist documentation;
- ranked Live safe-name repair for creator, joined-player, and signed-in nonparticipant spectator perspectives;
- public profile default-private boundaries and authenticated Live read-only spectator behavior;
- Settings no longer owning full profile editing.

User evidence reviewed for Phase 36 routing:

- `/Users/noir/Desktop/Screenshot 2026-06-28 at 3.37.23 PM.png`: Active Games from a creator/player-one perspective, showing Active Games participant labels that need audit against safe public/profile names.
- `/Users/noir/Desktop/Screenshot 2026-06-28 at 3.40.36 PM.png`: Active Games from a joined-player/player-two perspective, showing some cards falling back to `Rival` where the safe public/profile name should appear.
- `/Users/noir/Desktop/Screenshot 2026-06-28 at 4.19.07 PM.png`: signed-in password-change modal showing `Unable to send a reset link right now. Please try again in a moment.` after a password-update failure, even though the signed-in change-password path does not send a reset link.

Relevant implementation facts from read-only inspection:

- `src/app/routes.ts` currently has no `leaderboard` route. Primary navigation order is `Stats`, `Words`, `Profile`, `Settings` after the Phase 35 work.
- `src/stats/StatsDashboard.tsx` currently renders both `PublicRankedLeaderboardPanel` and `MultiplayerStatsPanel` inside Stats, along with local/personal stats.
- `src/multiplayer/multiplayerViewModels.ts` already supports `profileOverrides` in `toActiveGameViewModel`, but `selectActiveMultiplayerGameRows` does not receive/pass a per-game participant profile map.
- `src/multiplayer/MultiplayerWorkspace.tsx` fetches participant identity summaries for playing participant games and passes the resulting `participantProfilesByGameId` to Live rows, but Active Games rows currently do not consume that map.
- `src/account/auth.ts` currently classifies `reset-password` failures with reset-link wording; the signed-in update-password path can surface that copy.
- `src/account/Settings.tsx` currently renders Settings sections in a way that separates Notifications, Account management, `AuthPanel`/signed-in state, and Sound Effects, with heading capitalization `Sound Effects`.

The user-edited `planning/phase-35/REVIEW-CHECKLIST.md` must be preserved throughout Phase 36 planning and execution.

## Goals

1. Add a first-class `Leaderboard` main tab between `Stats` and `Words`.
2. Move public ranked leaderboard content out of Stats and into Leaderboard.
3. Move Multiplayer Ratings / competitive multiplayer rating content out of Stats and into Leaderboard.
4. Leave local/personal gameplay statistics in Stats.
5. Repair Active Games safe-name behavior so participant cards prefer safe public/profile names when available.
6. Replace reset-link wording in signed-in password-update failures with password-update-specific copy.
7. Reorder and consolidate current Settings sections: Gameplay, Sound effects, Notifications, Account management.
8. Preserve all Phase 35, Phase 34, Phase 33, Phase 32, Phase 31, Phase 30, Phase 29, Phase 28, Phase 27, Daily Multiplayer, gameplay, and Elo invariants.

## In Scope

### Leaderboard Route And Stats Split

Phase 36 should add a main `Leaderboard` route/tab and move existing competitive/public rating content there.

Requirements:

- Add route id `leaderboard` or an equivalent explicitly reviewed route id.
- Add navigation label `Leaderboard` and short label `Leaderboard` unless responsive constraints require a shorter short label.
- Place `Leaderboard` in primary navigation between `Stats` and `Words`.
- Give the route a distinct visual route tone that is compatible with the existing main navigation palette and readable on desktop and mobile.
- Move `PublicRankedLeaderboardPanel` out of `StatsDashboard` and into the Leaderboard route.
- Move `MultiplayerStatsPanel` / competitive multiplayer rating content out of `StatsDashboard` and into the Leaderboard route.
- Leave local/personal statistics, charts, progress meters, streak/calendar, coin trends, and history-derived local stat content in Stats.
- Preserve existing public leaderboard repository/auth-status behavior.
- Preserve public leaderboard bucket boundaries: approved untimed ranked Practice OG/GO only, no timed ranked buckets, no Daily ranked buckets, no custom/private-code ranked buckets, and no `All buckets` player-facing view.
- Preserve Multiplayer Ratings as display/explanatory content only. Do not change Elo math, rating storage, settlement, or scoring.

Recommended implementation shape:

- Create a route-level Leaderboard component under `src/leaderboards/` or another clearly named route module.
- Keep public leaderboard and multiplayer rating components reusable so Stats does not need duplicate state or duplicate repository wiring.
- Update route tests, Stats tests, Leaderboard tests, and shell/navigation tests together.

### Active Games Safe-Name Repair

Phase 36 should repair the newly reported Active Games safe-name regression using the same privacy posture as the Phase 35 Live repair.

Expected behavior:

- From the creator/player-one perspective, Active Games should show the joined player's safe public/profile display name when available.
- From the joined-player/player-two perspective, Active Games should show the creator's safe public/profile display name when available.
- `You` appears only for the current viewer's own participant context, never as a rival/opponent label.
- `Rival`, `Player one`, and `Player two` appear only when safe identity is genuinely unavailable.
- Turn/progress labels should also use the safe name when the rival has the current turn.
- Active Games overview cards and the Active Games subtab should be consistent.
- The repair must not expose raw auth IDs, auth emails, private profile fields, public profile IDs unless already explicitly authorized for that context, answers, seeds, sessions, queue internals, rating internals, tokens, or local artifacts.

Preferred source-only route:

- Reuse the existing participant identity summary fetch in `MultiplayerWorkspace`.
- Expand Active Games row selection to accept the existing `participantProfilesByGameId` safe profile map.
- Keep the identity fetch bounded to authenticated participant games and current playing/active games.
- Add focused tests for creator perspective, joined-player perspective, stale/fallback behavior, and forbidden raw identity fields.

Migration/RLS gate:

- No migration is expected from current read-only inspection.
- If Stage 36.1 audit proves Active Games cannot access safe identity through existing participant identity/public-profile seams, stop and create a Phase 36 migration/RLS addendum before any SQL or source repair.

### Password-Change Failure Copy

Phase 36 should fix signed-in password-update failure copy so it does not mention reset links.

Requirements:

- The signed-in password-change path should use update-password-specific error classification or status messaging.
- If the provider error reliably identifies same-current-password/no-op changes, show concise copy such as `Choose a new password that is different from your current password.`
- If the provider error does not reliably identify that case, show truthful update-specific copy such as `Unable to update your password right now. Choose a different password and try again.`
- Keep validation for length and mismatched confirmation local and immediate.
- Do not expose raw Supabase provider errors.
- Do not change magic-link or reset-password behavior beyond avoiding wrong copy in the signed-in update path.

### Settings Order And Account Consolidation

Phase 36 should clean up current Settings section order and reduce redundant account sections now that Profile is first-class.

Requirements:

- Render current Settings sections in this order when present:
  1. Gameplay
  2. Sound effects
  3. Notifications
  4. Account management
- Change the heading `Sound Effects` to `Sound effects`.
- Consolidate signed-in email/status/sign-out controls into Account management if it can be done cleanly without hiding sign-out, password-change, or email-change gate information.
- Remove the separate `Signed in` section if the consolidated Account management panel covers the same content more clearly.
- Keep signed-out sign-in/create-account access clear.
- Keep Supabase unconfigured, anonymous, and authenticated states truthful.
- Preserve Profile-tab ownership of full profile editing.
- Preserve email-change as a configuration-gated action unless a later phase explicitly authorizes implementation.
- Preserve destructive local/account actions behind existing Danger Zone/confirmation boundaries.

## Out Of Scope

- Source/runtime implementation during this spec pass.
- Supabase migration creation or execution unless a later Phase 36 addendum prompt explicitly authorizes it.
- Vercel or Supabase dashboard configuration changes.
- Deployment, release, staging, commits, pushes, pull requests, merges, branch deletion, or GitHub backup execution.
- Public/guest spectation.
- Spectator lists, spectator counts, spectator sorting, or public spectator projections.
- Public profile pages for other players, clickable rival profile navigation, social/profile browsing, mailbox-style match requests, or direct player matchmaking.
- Custom-code/private matchmaking expansion.
- Daily ranked games.
- Ranked custom/private-code games.
- Public timed ranked leaderboards.
- Public site stats, developer dashboard, telemetry, analytics products, or admin views.
- Gameplay-area auto-scroll or game-surface layout collapse behavior.
- Browser back/forward navigation integration.
- Beginner onboarding/help/tutorial implementation.
- Theme proposal modernization or concrete theme implementation.
- Service workers, push subscriptions, background push, or cross-device notification infrastructure.
- Gameplay-rule changes, Elo algorithm changes, scoring changes, timeout changes, forfeit changes, or settlement authority changes.
- Work in the original stable `brrrdle` repository.

## Later-Phase Routing

| Request or observation | Route | Notes |
| --- | --- | --- |
| Active Games safe-name regression | Phase 36 | Preferred source-only repair using participant identity summaries. |
| Leaderboard tab and Stats split | Phase 36 | Main feature scope. |
| Password-change reset-link copy | Phase 36 | Source-only copy/classification fix. |
| Settings order and account consolidation | Phase 36 | Source-only current-surface cleanup. |
| Gameplay-area auto-scroll | Phase 37 | Navigation/gameplay ergonomics after Profile and Leaderboard routes settle. |
| Browser back/forward support | Phase 37 | Requires careful app-history model and stale-game fallback design. |
| Public/guest spectation | Later public/spectator phase | Requires sanitized projections and privacy/RLS planning. |
| Spectator list/count/sorting | Later public/spectator phase | Presence semantics and privacy review needed. |
| Public profile pages and clickable player names | Later profile/social phase | Requires routing, moderation, abuse handling, and privacy review. |
| Avatar size/public avatar policy expansion | Later profile/social/storage phase | Needs storage, moderation, and raw-id-safe rules. |
| Custom-code private games and direct requests | Later matchmaking phase | Keep ranked and Daily excluded by default. |
| Public site stats and developer dashboard | Later telemetry/stats phase | Requires telemetry/privacy/admin design. |
| Onboarding/help/tutorial | Later UX phase | Best after route/navigation structure settles. |
| Theme work | Later theme phase | Wait for larger surface structure to settle. |
| Service workers, push subscriptions, deployment, release | Later explicit operations phases | Require separate authorization. |
| Gameplay or Elo changes | Not routed without future approval | Preserve current rules and math. |

## Success Criteria

Phase 36 is successful when:

- Main navigation includes `Leaderboard` between `Stats` and `Words` on desktop and mobile-safe widths.
- Stats contains local/personal gameplay statistics only and no longer renders public ranked leaderboard or competitive multiplayer rating sections.
- Leaderboard contains the public ranked leaderboard and Multiplayer Ratings / competitive multiplayer rating content.
- Public ranked leaderboard boundaries remain display-only, privacy-safe, non-authoritative, and limited to approved untimed ranked Practice OG/GO buckets.
- Timed ranked buckets remain out of public leaderboards.
- Active Games rows prefer safe public/profile names for the rival from both creator and joined-player perspectives.
- Generic Active Games labels appear only when safe identity is genuinely unavailable.
- Active Games identity repair does not expose raw/private identity or game internals.
- Signed-in password-change failure copy is password-update-specific and does not mention reset links.
- Settings section order is Gameplay, Sound effects, Notifications, Account management.
- `Sound effects` capitalization matches other section-heading style.
- Account management consolidation preserves sign-out, password-change access, email-change configuration gate copy, and Profile tab ownership of profile editing.
- Phase 35 Profile tab and Live identity repair remain intact.
- Phase 34 Live/Lobby/notification/Active Games behavior remains intact except for the approved Active Games safe-name repair.
- Phase 33 timed ranked Practice behavior remains intact.
- Daily Multiplayer integrity, gameplay rules, and Elo math remain unchanged.
- Final Phase 36 visual review and manual review checklist are created before Git handoff.

## Recommended Stage Breakdown

### Stage 36.0: Protected Baseline

- Read governance, Phase 36 planning/spec materials, Phase 35 completion evidence, planning/progress docs, and relevant source/test surfaces.
- Confirm repository state, branch, remotes, `HEAD`, and `origin/main`.
- Preserve user edits to `planning/phase-35/REVIEW-CHECKLIST.md`.
- Record current uncommitted Phase 36 planning/spec/progress artifacts.
- Run resource/process checks.
- Run the baseline verification gate before implementation.

### Stage 36.1: Route, Identity, Settings, And Copy Audit

- Audit Stats/Leaderboard route ownership, component props, repository wiring, and responsive navigation risk.
- Audit Active Games safe-name data paths and compare them with Phase 35 Live participant identity hydration.
- Audit password-update error classification and status-message wiring.
- Audit Settings section ordering and account-management duplication.
- Decide whether Active Games identity repair is source-only or requires migration/RLS addendum planning.
- Do not implement fixes during the audit stage.

### Stage 36.2: Active Games Safe-Name Repair Or Addendum

- If source-only, wire existing safe participant identity maps into Active Games row selection and rendering.
- Add focused view-model/component tests for creator, joined-player, fallback, and forbidden raw-field behavior.
- If safe data is unavailable, create a narrow migration/RLS addendum and halt before SQL execution.
- Preserve Live identity behavior and do not broaden public/guest spectation.

### Stage 36.3: Leaderboard Route And Stats Split

- Add the new `Leaderboard` route and navigation item.
- Create or reuse a route-level Leaderboard component.
- Move `PublicRankedLeaderboardPanel` and `MultiplayerStatsPanel` from Stats into Leaderboard.
- Remove public/competitive content from Stats while preserving local stat charts and cards.
- Add focused route/navigation, Stats, Leaderboard, public leaderboard, and MultiplayerStatsPanel tests.

### Stage 36.4: Settings And Password Copy Cleanup

- Update password-update failure classification/copy.
- Reorder Settings sections and change `Sound Effects` to `Sound effects`.
- Consolidate signed-in account status/sign-out/password/email-gate content into Account management when safe.
- Add focused auth/settings tests for signed-in, anonymous, and unconfigured states.

### Stage 36.5: Final Hardening, E2E, Visual Review, Manual Checklist

- Review Phase 36 changes for stale copy, privacy gaps, navigation crowding, duplicate component ownership, and regression risk.
- Run focused regression/E2E coverage for Leaderboard navigation, Stats split, Active Games safe names, password copy, and Settings order.
- Run the local visual handoff review gate.
- Create `planning/phase-36/CHANGELOG.md`.
- Create `planning/phase-36/REVIEW-CHECKLIST.md`.
- Run final verification and prepare for governed Git handoff only after user authorization.

## Likely Files And Modules

Likely source surfaces for later implementation:

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
- E2E surfaces for navigation, Active Games, and authenticated account flows where feasible.

Likely planning/progress surfaces:

- `planning/phase-36/IMPLEMENTATION-PLAN.md`
- `planning/phase-36/CHANGELOG.md`
- `planning/phase-36/REVIEW-CHECKLIST.md`
- `planning/specs/phase-36/`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

## Migration And RLS Constraints

No migration is expected for the recommended Phase 36 route.

The Active Games repair must first use existing safe identity paths:

- existing `getParticipantIdentitySummaries` repository action;
- existing participant identity summary parsing;
- existing `participantIdentitySummariesToProfileMap`;
- existing safe `MultiplayerProfileSummary` fields;
- existing default-private public profile rules.

If these paths cannot safely hydrate Active Games from both participant perspectives, Stage 36 must stop for migration/RLS addendum planning before any SQL work.

Any migration/RLS addendum must preserve:

- public profile default-private behavior;
- participant-only identity boundaries;
- authenticated Live spectator read-only boundaries;
- public/guest spectation deferral;
- no raw auth IDs, auth emails, private profile fields, answers, seeds, serialized sessions, player sessions, queue internals, rating internals, tokens, screenshots, videos, traces, or local artifacts;
- grants, RLS behavior, abuse boundaries, idempotency, rollback notes, and non-printing probe expectations.

## Vercel, Supabase, And Deployment Constraints

- No Vercel or Supabase configuration changes are in scope.
- No deployment or release is in scope.
- Existing Supabase auth redirect documentation from Phase 35 remains informational and must not be converted into configuration changes without a later explicit prompt.
- Public leaderboard repository behavior must continue using existing public/anon-safe browser configuration only.
- No service-role keys, privileged Supabase keys, Vercel tokens, or private environment values may be printed or committed.

## Verification Strategy

Specification-stage verification:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Implementation-stage focused verification should include:

- route/navigation tests for `Leaderboard` placement;
- Stats tests confirming local/personal content remains and public/competitive content moved out;
- Leaderboard tests confirming public leaderboard and Multiplayer Ratings render there;
- public leaderboard non-regression tests confirming bucket boundaries and no timed/public Daily exposure;
- MultiplayerStatsPanel tests confirming no Elo/rating math changes;
- Active Games view-model/component tests for safe names, turn labels, fallback behavior, and forbidden raw identity fields;
- Settings tests for section order, `Sound effects` capitalization, signed-in consolidation, sign-out access, password-change access, and email-change gate preservation;
- password modal/auth tests for update-specific failure copy;
- feasible browser/E2E checks for navigation and Active Games participant perspectives.

Final verification should include:

- focused touched-file tests first;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e` when user-visible routing or multiplayer claims warrant it;
- `npm run test:full` during final hardening;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port/process cleanup checks for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

## Visual Handoff Expectations

The final visual review should save local-only ignored artifacts under `test-results/visual-review/phase-36-stage-36-5/` or the final approved stage path.

Required scenarios:

- desktop navigation with `Leaderboard` between `Stats` and `Words`;
- narrow/mobile navigation proving no overlap or unreadable tab labels;
- Stats tab showing local/personal statistics without public leaderboard or Multiplayer Ratings;
- Leaderboard tab showing public ranked leaderboard and competitive multiplayer rating content;
- Active Games from creator and joined-player perspectives showing safe rival names where safe public/profile data exists;
- Settings showing Gameplay, Sound effects, Notifications, Account management order;
- password-change modal or safe test state proving signed-in update failure copy does not mention reset links, when feasible without recording private account data.

Screenshots, videos, traces, auth state, tokens, private account data, and local session artifacts must remain ignored/local-only and must not be staged or committed.

## Manual Review Checklist Expectations

`planning/phase-36/REVIEW-CHECKLIST.md` should include user-testable items for:

- Leaderboard tab placement and readability.
- Stats contains only local/personal stats.
- Leaderboard contains public ranked leaderboard and competitive multiplayer ratings.
- Public leaderboard remains OG/GO untimed ranked Practice only.
- Active Games names match safe public/profile names from creator and joined-player perspectives when available.
- Generic Active Games rival labels appear only when no safe identity exists.
- Password-change failure copy no longer references reset links in the signed-in update path.
- Settings section order and `Sound effects` capitalization.
- Account management consolidation preserves sign-out, password-change access, and email-change gate copy.
- Profile tab remains available and owns full profile editing.
- Phase 35 Live identity behavior remains fixed.
- No public/guest spectation, timed public leaderboards, gameplay-rule changes, or Elo math changes appeared.

## Risks

- Main navigation could crowd on narrow screens after adding another first-class tab.
- Moving public/competitive content could accidentally duplicate repository/auth props or hide leaderboard unauthenticated/unconfigured states.
- Active Games identity hydration could flicker, stale-cache, or leak if the identity map is not scoped by active game id and updated timestamp.
- Password provider errors may not reliably identify same-current-password; copy must be truthful without overclaiming.
- Settings consolidation could hide sign-out or password-change entry points if signed-in, signed-out, and unconfigured states are not tested.

## Open Decisions

- Final route id for the new tab. Recommendation: `leaderboard`.
- Final route tone/color. Recommendation: choose a distinct existing-compatible tone during implementation and verify responsive readability.
- Component location for the Leaderboard route. Recommendation: a route-level `src/leaderboards/LeaderboardPanel.tsx` or equivalent.
- Whether Active Games identity repair remains source-only after Stage 36.1 audit.
- Whether Settings fully removes the separate signed-in/AuthPanel section or keeps a small fallback for anonymous/unconfigured states.
- Whether final E2E should include a real two-client Active Games identity check or remain component-focused plus existing multiplayer E2E, depending on Stage 36.2 risk.

## Boundary Invariants

Phase 36 must preserve:

- Phase 35 Profile tab, auth redirect hardening, signed-in password-change access, email-change gate documentation, and ranked Live identity repair.
- Phase 34 Live/Lobby/notification/Active Games turn-cue behavior.
- Phase 33 timed ranked Practice, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections.
- Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections.
- Phase 31 Practice-safe postgame behavior and Daily exclusions.
- Phase 30 public leaderboard display-only authority and privacy boundaries.
- Phase 29 public profile default-private and moderation boundaries.
- Phase 28 authenticated Live read-only spectator behavior.
- Phase 27 trusted ranked Practice foundations.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, and five-letter invariants.
- Existing scoring, timeout, forfeit, rating/Elo formula, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, Practice 2-35 word-length behavior, gameplay rules, and Elo algorithm.

## Next Gated Action

Create `planning/phase-36/IMPLEMENTATION-PLAN.md` to turn this specification into a staged execution plan. Do not begin Stage 36.0 baseline, source/runtime implementation, test implementation, migration/RLS work, deployment/configuration work, Git/GitHub work, backup workflow execution, or original stable repository work until separately authorized.
