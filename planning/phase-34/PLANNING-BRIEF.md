# Phase 34 Planning Brief

**Status**: Planning brief for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-26.
**Recommended phase focus**: Multiplayer Live/Lobby/notification current-surface stabilization and routing cleanup.

## Authority

This brief is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, completed Phase 33 competitive ladder readiness, completed Phase 32 multiplayer stabilization, completed Phase 31 postgame actions, completed Phase 30 public leaderboards, completed Phase 29 public profiles, completed Phase 28 Live behavior, completed Phase 27 ranked Practice foundations, `docs/deployment.md`, `docs/supabase.md`, `docs/ranked-multiplayer.md`, `planning/testing/TESTING-SUITE.md`, `progress/PROGRESS.csv`, and the current progress reports.

This document does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

## Current Baseline

Phase 33 is complete, merged, post-merge sanity reviewed, and branch-cleaned. The user has manually reviewed the Phase 33 checklist and reported that all checklist items passed.

During this planning pass, local `main` and `origin/main` were confirmed at:

`95d0bad3c28761db78a016e95a54287f4b096ab8`

Existing local user work was also observed:

- `planning/phase-33/REVIEW-CHECKLIST.md` contains user checklist completions and was preserved.

Current durable baseline:

- Phase 33 added canonical five-minute timed ranked Practice, display-only rank bands, public ranked leaderboard `All buckets` removal, timed ranked two-client E2E coverage, visual review, and a manual review checklist.
- Phase 32 stabilized rematches, ranked/lobby auto-routing, safe opponent labels, account avatar accent propagation, no-comma rating display, and real two-client E2E coverage.
- Phase 31 postgame actions remain Practice-safe.
- Phase 30 public leaderboards remain authenticated-only, privacy-safe, display-only, and non-authoritative.
- Phase 29 public profiles remain default-private with moderation boundaries.
- Phase 28 Live v1 spectator behavior remains read-only.
- Daily Multiplayer remains asynchronous, five-letter, UTC-day keyed, no-clock, answer-separated, and claim-safe.

## User Observations Reviewed

The planning pass inspected the user-provided annotated screenshots dated 2026-06-26:

- Multiplayer subtab row screenshot: the selected `Live` subtab has a light active button and a light count pill, making the number difficult to read.
- Live subtab screenshot: Live participant/spectator cards can show `You` or generic `Rival` where safe public names such as `kiki` and `claudine` should appear. The screenshot also shows that the problem may differ between participant Live rows and authenticated read-only spectator rows.

The prompt also supplied new UX and future-product requests:

- Lobby `Open to join` should become a direct one-click `Join` style action.
- Foreground browser notification clicks should route to the exact game when possible, not only to the Active Games subtab.
- Active game cards should make `Your turn` games visually stand out.
- Live cards should indicate ranked versus unranked.
- Future Live cards may show player game-type Elo and clickable names.
- Future spectator lists/counts should be visible to players and spectators.
- Future public profile pages and clickable player names/avatars should exist.
- Future custom-code/private matches and direct player match requests should be better defined.
- Future public site stats and a private developer dashboard should be planned.
- Phase 33's previously routed Vercel/auth/account-management and onboarding/help observations remain important.

## Recommended Phase 34 Direction

Phase 34 should focus on current Multiplayer Live/Lobby/notification surfaces rather than auth/deployment readiness.

Reasoning:

- The new highest-priority items are user-visible bugs and friction inside already-shipped authenticated multiplayer surfaces.
- They are tightly related to Phase 32 identity/routing work and Phase 28 Live behavior, so fixing them now reduces regression risk while the surrounding code is fresh.
- Auth/deployment work can require external Vercel and Supabase configuration decisions that should not be mixed with Live/Lobby behavior repairs.
- Public/guest spectation, spectator lists, clickable profiles, custom invitations, and site stats all require broader privacy/product design and should stay out of this bug-fix-oriented phase.

Best recommended Phase 34 v1 scope:

1. Fix Live subtab count readability.
2. Fix Live participant and spectator card identity labels so safe profile names are used consistently and `You`/`Rival` appear only when semantically correct or as true fallbacks.
3. Add a ranked/unranked indication to Live cards without exposing private rating data.
4. Replace Lobby `Open to join` friction with a direct one-click join/resume route where the existing guards allow joining.
5. Improve foreground browser notification activation so multiplayer turn notifications deep-route to the specific resumable game when possible.
6. Add a stronger visual `Your turn` cue to active multiplayer game cards.

## Goals

- Stabilize current Live v1 participant and authenticated spectator card identity display.
- Improve Live subtab readability and card transparency.
- Reduce Lobby join friction and prevent users from accidentally opening a new lobby while trying to join an existing one.
- Make foreground browser notifications and in-app notification actions route to the most useful current destination.
- Make active games requiring the viewer's turn visually obvious.
- Preserve all completed Phase 33, Phase 32, Phase 31, Phase 30, Phase 29, Phase 28, Phase 27, Daily, gameplay, and Elo invariants.
- Route larger account, public profile, spectator, private-match, stats/dashboard, onboarding, theme, and deployment work to later gates.

## In Scope

### Live Subtab Readability

Phase 34 should update the selected `Live` subtab count badge styling so the number is readable in both active and inactive states.

Expected constraints:

- Keep the existing route badge model.
- Do not reuse the urgent red tone unless the badge means urgent attention.
- Preserve accessible contrast and stable layout at desktop and mobile widths.
- Cover the changed cue with focused component or view-model tests when practical, plus visual handoff screenshots.

### Live Identity Label Stabilization

Phase 34 should audit and fix both Live row types:

- participant Live rows from local multiplayer state;
- authenticated read-only spectator rows from sanitized Live RPC data.

Expected behavior:

- Live cards prefer safe public/profile display names already available to the app.
- The viewer may see themselves as `You` only where that label is intentionally describing the viewer.
- Opponents should not be rendered as `You`.
- Generic `Rival`, `Host`, `Player one`, or `Player two` labels should appear only as fallbacks when safe identity is unavailable.
- Current Daily answer leakage protections must remain intact.
- Raw emails, raw auth ids, private metadata, tokens, seeds, answers, serialized sessions, private progress, and mutable participant state remain unavailable through Live cards.

### Live Ranked/Unranked Labels

Phase 34 should add a simple ranked/unranked indicator to Live cards.

Allowed:

- `Ranked` or `Unranked` copy/chip derived from existing safe game metadata.
- If a ranked game is timed, the rules line may continue to show the time-control copy already available.

Not allowed:

- Exposing timed ranked buckets publicly before approved.
- Showing player Elo values on Live cards in Phase 34.
- Expanding public/guest spectation.
- Making Live card metadata authoritative for rating or settlement.

### One-Click Lobby Join

Phase 34 should replace the user-facing `Open to join` wording and behavior with a direct join action where safe.

Expected behavior:

- Joinable lobby rows should say `Join` or `Join match`.
- Clicking the Lobby row action should call the same guarded join path as the Practice Multiplayer join flow, or an equivalent shared helper, without requiring the user to navigate, scroll, and click again.
- Own waiting lobbies should still use a management/cancel flow.
- Daily claim-blocked rows remain blocked.
- Signed-out users are directed to sign in, not allowed to bypass auth.
- Join failures should surface safe user-facing messages and should not create duplicate lobbies.

### Notification Direct Routing And Active Game Attention

Phase 34 should improve local foreground notification actions inside the existing no-push architecture.

Expected behavior:

- A `multiplayer-your-turn` notification should route to the specific selected multiplayer game when `selectedMultiplayerGameId` is present and the game is still visible.
- The route should match the practical `Resume` destination rather than stopping at the generic Active Games list.
- If the target game is no longer available, routing may fall back to `Multiplayer -> Active Games` with a safe status message.
- Active multiplayer cards should visibly mark `Your turn` games with a clear, accessible cue, without changing gameplay state.
- In-app notification activation and browser foreground notification click behavior should stay aligned.

Not allowed:

- Service workers, background push, cross-device push, or production notification infrastructure.
- Browser notification behavior that depends on private session artifacts or prints tokens.

## Out Of Scope

- Vercel deployment protection changes, production deployment, Vercel project configuration, or Supabase dashboard configuration.
- Supabase auth redirect URL configuration.
- Password change, email change, account confirmation copy, and Settings/Danger Zone implementation.
- Beginner onboarding/help/tutorial implementation.
- Public/guest spectation.
- Spectator list/count implementation.
- Public profile routes, clickable player names/avatars, public profile browsing, or custom avatar image expansion.
- Player-specific direct matchmaking requests, mailbox/request flows, or custom-code/private-match expansion.
- Showing player Elo/rating values on Live cards.
- Public site stats, live site stats, private developer dashboard, admin analytics, or observability products.
- Theme proposal/template modernization or full concrete theme work.
- Additional ranked mode expansion beyond Phase 33.
- Elo algorithm changes, gameplay-rule changes, scoring changes, timeout changes, or settlement authority changes.
- Service workers, push subscriptions, background push, deployments, releases, commits, pushes, pull requests, merges, branch deletion, or GitHub backup workflow execution.
- Work in the original stable `brrrdle` repository.

## Routing Decisions

| Observation or request | Recommended route | Rationale |
| --- | --- | --- |
| Live count pill readability | Phase 34 | Small current-surface UI bug, directly visible in the attached screenshot. |
| Live card safe public names showing `You` or `Rival` incorrectly | Phase 34 | Current user-visible identity bug in an existing surface. |
| Live card ranked/unranked indicator | Phase 34 | Low-risk transparency improvement using existing metadata. |
| Lobby `Open to join` one-click join | Phase 34 | Current UX friction that can cause wrong lobby creation. |
| Foreground notification click should open exact game | Phase 34 | Current local notification routing issue, no service worker needed. |
| Active Games `Your turn` visual cue | Phase 34 | Current attention cue improvement tied to notification routing. |
| Vercel login screen after magic link | Phase 35 auth/deployment readiness | Likely deployment protection or redirect configuration; needs external configuration audit, not mixed with Live fixes. |
| Supabase magic-link redirects and account creation confirmation copy | Phase 35 auth/deployment readiness | Account auth correctness deserves a dedicated audit and implementation phase. |
| Password change and email change | Phase 35 auth/account management | Normal account-management features, not Danger Zone-only work. |
| Settings/Danger Zone completion | Phase 35 auth/account management | Related to account safety and destructive actions. |
| Beginner onboarding/help/tutorial | Phase 37 or later UX phase | Important product polish, best after account/deployment and current multiplayer surfaces settle. |
| Public/guest spectation | Phase 36 or later public/spectator phase | Needs sanitized public projection and explicit RLS planning. |
| Spectator count/list visible to players/spectators | Same later public/spectator phase or a follow-on spectator presence phase | Requires presence semantics, privacy rules, and likely RLS/schema work. |
| Clickable public profiles from player names/avatars | Later public profile/social phase | Requires public profile route, privacy review, moderation and abuse considerations. |
| Rival avatar public accent/custom image in match surfaces | Later public profile/social phase | Related to profile browsing and richer identity projection. |
| Live card game-type Elo values | Later competitive/social display phase | Requires careful privacy and bucket semantics, especially for timed ranked buckets. |
| Custom-code private matches and direct player match requests | Later private matchmaking/social phase | Needs anti-abuse and collusion boundaries; keep ranked and Daily out by default. |
| Public live site stats and private developer dashboard | Later observability/analytics phase | Requires data model, privacy policy, admin authorization, and possible new telemetry. |

## Recommended Stage Breakdown

### Stage 34.0: Protected Baseline

- Read governance, Phase 33 completion materials, this planning brief, package/test surfaces, and relevant Live/Lobby/notification/account docs.
- Confirm repository state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Record existing user-edited Phase 33 checklist state and preserve it.
- Run resource/process checks.
- Run the protected baseline verification gate.

### Stage 34.1: Live/Lobby/Notification Audit And Scope Lock

- Reproduce or inspect the two attached Live screenshots.
- Audit participant Live row identity mapping and authenticated spectator Live row identity mapping.
- Audit route badge tone/contrast handling.
- Audit Lobby row action semantics and whether direct join can reuse existing guarded join code.
- Audit notification action targets and browser foreground click behavior.
- Decide whether any migration/RLS addendum is required.
- Expected decision: source-only unless Live card identity lacks a safe existing projection.

### Stage 34.2: Migration/RLS Addendum Planning If Required

Run only if Stage 34.1 finds missing safe identity or ranked metadata in the existing participant/spectator projections.

- Define the narrow additive SQL/RLS/RPC contract.
- Preserve public profile default-private behavior.
- Preserve Daily answer leakage protections.
- Define non-printing privacy probes.
- Do not create or run migrations in this stage.

### Stage 34.3: Live Card Stabilization

- Fix selected Live badge readability.
- Fix participant and spectator Live identity labels.
- Add ranked/unranked Live card labels.
- Add focused view-model/component tests and any required privacy/fallback tests.

### Stage 34.4: Lobby Join And Notification Routing

- Implement direct one-click Lobby join behavior where existing guards allow it.
- Improve `multiplayer-your-turn` notification action targets and browser click routing to select the exact game when available.
- Add a stronger active-card `Your turn` visual cue.
- Add focused dashboard/notification/lobby/component tests.

### Stage 34.5: Two-Client E2E, Visual Review, Manual Checklist, And Completion Docs

- Add real two-client Supabase-backed coverage where Phase 34 claims require it, especially Live identity, Lobby join, and notification/direct-resume flows if feasible.
- Run final focused and full verification gates.
- Run the visual handoff review for Live/Lobby/notification surfaces.
- Create `planning/phase-34/CHANGELOG.md`.
- Create `planning/phase-34/REVIEW-CHECKLIST.md`.
- Prepare Git handoff only after explicit authorization.

## Success Criteria

Phase 34 succeeds when:

- selected Live subtab count badges remain readable;
- Live participant rows show safe names correctly;
- authenticated read-only spectator Live rows show safe player names correctly;
- `You` is used only for the viewer where semantically appropriate;
- `Rival` and other generic labels appear only as true fallbacks;
- Live cards show ranked/unranked state without exposing private or unauthorized rating data;
- joinable Lobby rows provide a direct guarded join action;
- direct Lobby join does not create duplicate lobbies or bypass auth/Daily claim rules;
- foreground browser and in-app multiplayer-turn notifications route to the specific game when safe;
- Active Games makes `Your turn` items visually obvious;
- no service workers, background push, public/guest spectation, profile browsing, custom invitations, auth/deployment config, gameplay changes, Elo changes, or original stable repository work is introduced;
- focused tests, real two-client E2E where needed, visual handoff review, and manual checklist expectations are satisfied before Git handoff.

## Likely Files And Modules

Read or implementation candidates for later authorized stages:

- `src/ui/SubtabBar.tsx`
- `src/app/attentionViewModels.ts`
- `src/app/LunarSignalStage.tsx`
- `src/app/App.tsx`
- `src/dashboard/dashboardActions.ts`
- `src/dashboard/dashboardViewModels.ts`
- `src/dashboard/DashboardHome.tsx`
- `src/notifications/browserNotifications.ts`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerLobby.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerRepository.ts`
- relevant dashboard, notification, multiplayer view-model, component, and E2E tests;
- relevant Supabase migrations/RPC docs only if Stage 34.1 finds a projection gap.

Deferred read surfaces for later phases:

- `src/account/AuthModal.tsx`
- `src/account/PasswordResetModal.tsx`
- `src/account/Settings.tsx`
- `src/account/auth.ts`
- `src/account/supabaseClient.ts`
- `docs/deployment.md`
- Vercel and Supabase project configuration, only in an explicitly authorized auth/deployment readiness phase.

## Migration/RLS Constraints

Expected Phase 34 implementation should be source-only. A migration/RLS addendum is required before SQL work if:

- safe public names for Live participant or spectator rows cannot be derived from current app state or existing authenticated spectator RPC data;
- ranked/unranked Live card labeling requires new sanitized projection fields;
- any proposed fix would expose nonparticipant data beyond the current authenticated Live v1 rules.

Any addendum must prohibit:

- raw auth emails;
- raw auth ids where not already authorized;
- private profile metadata;
- auth/session tokens;
- answers, seeds, serialized sessions, or private progress;
- queue internals not needed for display;
- rating transaction ids or settlement ids;
- public/guest access.

## Vercel And Deployment Constraints

Phase 34 should not configure Vercel, deploy, or change Supabase redirect settings.

The Vercel login screen after magic-link sign-in is routed to Phase 35 because it may involve:

- Vercel deployment protection;
- preview versus production URL selection;
- Supabase Site URL;
- Supabase additional redirect URLs;
- email template redirect targets;
- production access policy.

Phase 35 should diagnose those with non-secret evidence and stop before configuration changes unless explicitly authorized.

## Supabase Auth And Account Constraints

Phase 34 should not implement password/email management. Phase 35 should cover:

- user-facing auth copy, including account creation confirmation wording;
- magic-link landing behavior and password creation expectations;
- existing password reset flow review;
- signed-in change-password flow;
- signed-in change-email flow;
- Settings account-management layout;
- Danger Zone scope and typed confirmations.

## Verification Strategy

Planning-only verification for this brief:

- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan over changed tracked and untracked repository files;
- ignored-artifact check for forbidden local outputs;
- `git status --short --branch`.

Future Phase 34 implementation verification should include:

- focused view-model tests for Live identity labels, ranked/unranked labels, and Lobby action labels;
- component tests for `MultiplayerLive`, `MultiplayerLobby`, `MultiplayerActiveGames`, route badges, and Notification Center activation where applicable;
- browser or Playwright tests for foreground browser notification click routing if feasible in the local harness;
- real two-client Supabase-backed E2E for direct Lobby join and Live identity labels where required;
- final `npm run lint`, `npm run test`, `npm run test:e2e`, `npm run test:full`, `npm run build`, and `npx tsc -p tsconfig.api.json --noEmit` at final hardening;
- non-printing secret/artifact scans;
- watched-port/process cleanup checks;
- visual handoff review and manual review checklist.

## Visual Handoff Review Expectations

The visual review gate should capture, after assertions:

- selected Live subtab with readable count badge;
- Live participant card with safe names and ranked/unranked label;
- Live authenticated spectator card with safe names and ranked/unranked label;
- Lobby row with direct `Join` action;
- Active Games row/card with a clear `Your turn` cue;
- notification activation result if the browser harness can capture it safely.

Artifacts must remain under ignored `test-results/visual-review/phase-34-.../` and must not be staged or committed.

## Manual Review Checklist Expectations

At final hardening, create `planning/phase-34/REVIEW-CHECKLIST.md` with user-testable items for:

- Live badge readability;
- Live public-safe names;
- Live ranked/unranked labels;
- one-click Lobby join;
- notification click direct-resume behavior;
- active-game `Your turn` cue;
- preserved Phase 33 timed ranked behavior;
- preserved Phase 32 rematch/routing/identity behavior;
- deferred auth/deployment, onboarding, public/guest spectation, profile browsing, custom invitations, stats/dashboard, service worker, gameplay, and Elo work.

## GitHub Handoff Expectations

Do not run the brrrdle GitHub backup workflow during Phase 34 planning or implementation unless the user explicitly invokes and authorizes it.

Use the existing segmented Git handoff pattern:

1. review and prepare Git handoff;
2. explicit branch/commit/push/draft PR authorization;
3. explicit ready/merge authorization;
4. post-merge sanity review;
5. explicit branch cleanup authorization.

## Risks

- Live identity has two different projection paths: participant rows and authenticated spectator RPC rows. Fixing only one could leave the screenshot bug half-fixed.
- One-click Lobby join touches routing and join guards. It must not bypass Daily claim rules, auth requirements, or duplicate join protections.
- Browser notification click routing depends on browser behavior and whether the page context is alive. The implementation must support best-effort direct routing and safe fallback.
- Active-game visual attention cues can become noisy if they look like urgent alerts when the game is merely in progress.
- Adding ranked/unranked Live labels must not imply public leaderboard availability, rating authority, or public access.
- If a SQL/RLS gap is found, Phase 34 must stop for an addendum rather than smuggling a migration into source work.

## Open Decisions

- Exact Live count badge styling should be chosen during implementation after checking contrast against active and inactive subtab backgrounds.
- The Lobby button label should be finalized in the spec. Recommended: `Join` for compact rows, with accessible label `Join multiplayer match`.
- Notification fallback behavior should be specified for deleted, completed, hidden, or no-longer-visible games.
- Stage 34.1 must decide whether Live identity fixes are source-only or require a narrow RLS/RPC addendum.
- Stage 34.1 must decide how much browser notification click behavior can be tested automatically versus manually and visually.

## Next Gated Action

Create the unified Phase 34 specification for review. The spec should lock Phase 34 around Live/Lobby/notification current-surface stabilization, explicitly route auth/deployment/account management to Phase 35, and keep public/guest spectation, public profile browsing, custom/private invitations, spectator presence, site stats/dashboard, onboarding/help, service workers, gameplay changes, and Elo changes deferred.
