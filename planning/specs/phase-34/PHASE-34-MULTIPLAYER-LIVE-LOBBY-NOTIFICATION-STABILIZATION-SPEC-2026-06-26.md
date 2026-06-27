# Phase 34 Multiplayer Live/Lobby/Notification Stabilization Specification

**Status**: Unified specification for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-26.
**Phase focus**: Current Multiplayer Live, Lobby, notification routing, and active-game attention stabilization.

## Authority

This specification is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, completed Phase 33 competitive ladder readiness, completed Phase 32 multiplayer stabilization, completed Phase 31 postgame actions, completed Phase 30 public leaderboards, completed Phase 29 public profile foundations, completed Phase 28 Live behavior, completed Phase 27 ranked Practice foundations, `planning/phase-34/PLANNING-BRIEF.md`, `docs/deployment.md`, `docs/supabase.md`, `docs/ranked-multiplayer.md`, `planning/testing/TESTING-SUITE.md`, `progress/PROGRESS.csv`, and the current progress reports.

This specification does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

## Current Baseline

Phase 33 is complete, merged, post-merge sanity reviewed, branch-cleaned, and manually checked by the user. Local `main` and `origin/main` were confirmed at:

`95d0bad3c28761db78a016e95a54287f4b096ab8`

Current baseline guarantees to preserve:

- Phase 33 canonical five-minute timed ranked Practice, display-only rank bands, public ranked leaderboard `All buckets` removal, timed ranked E2E coverage, visual handoff review, and manual checklist artifacts.
- Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and real two-client E2E protections.
- Phase 31 Practice-safe postgame actions.
- Phase 30 privacy-safe display-only public leaderboards.
- Phase 29 default-private public profile and moderation boundaries.
- Phase 28 authenticated Live v1 read-only behavior.
- Phase 27 trusted ranked Practice queue, settlement, and rating foundations.
- Daily Multiplayer remains asynchronous, five-letter, UTC-day keyed, no-clock, answer-separated, and claim-safe.
- Existing scoring, timeout, forfeit, rating/Elo, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, Practice 2-35 word-length behavior, gameplay rules, and Elo math remain unchanged.

The user-owned edit to `planning/phase-33/REVIEW-CHECKLIST.md` must be preserved.

## User Evidence

Phase 34 responds to the June 26, 2026 annotated user screenshots and notes:

- The selected `Live` subtab shows a neutral count badge whose number is difficult to read against the active tab color.
- Live cards can show spectator-style matchup text such as `You vs claudine` when the safe name should be `kiki`, and `kiki vs Rival` when the safe rival name should be `claudine`.
- The user also reported Lobby friction where `Open to join` sends the player to another subtab instead of joining directly.
- Foreground browser notification clicks currently route too generically, so a player can land on Active Games instead of the exact game needing their turn.
- Active Games text says `Your turn`, but the card does not visually stand out enough.

## Goals

- Make current Multiplayer subtab attention badges readable, especially selected `Live` neutral count badges.
- Make Live participant and authenticated read-only spectator cards use safe player names consistently.
- Add simple ranked/unranked visibility to Live cards without exposing ratings or widening Live access.
- Replace Lobby `Open to join` friction with a guarded one-click join path.
- Make foreground browser and in-app multiplayer-turn notifications route directly to the specific resumable game when safe.
- Add a clear, accessible `Your turn` visual cue to active multiplayer cards.
- Preserve all completed multiplayer, ranking, profile, leaderboard, Daily, gameplay, Elo, privacy, and deployment boundaries.
- Route larger account, public, spectator, profile/social, private matchmaking, stats/dashboard, onboarding/help, and theme work to later phases.

## In Scope

### Live Badge Readability

Phase 34 must update the current route/subtab attention badge treatment so selected neutral-count badges remain readable.

Requirements:

- The selected `Live` subtab count must meet readable contrast against its active button background.
- Neutral Live counts must not reuse the urgent red tone unless the cue means urgent action.
- Badge dimensions must stay stable across desktop and mobile wrapping layouts.
- Screen-reader copy must continue to describe the count through the existing attention aria label.
- The fix should prefer the existing `SubtabBar`, attention view-model, or shared badge styling path over one-off Live-only markup.

### Live Identity And Privacy

Phase 34 must fix both current Live card projection paths:

- participant Live rows derived from local multiplayer state;
- authenticated read-only spectator rows derived from sanitized Live spectator data.

Requirements:

- Live matchup text must prefer safe public/profile display names already available to the app.
- `You` may be used only when the label intentionally describes the viewer's own perspective, such as a turn cue or an active-game participant affordance.
- Live card matchup copy must not render the viewer as `You` in spectator-style text when a safe display name is available.
- Opponents must never be rendered as `You`.
- `Rival`, `Host`, `Player one`, `Player two`, or equivalent generic labels may appear only as true fallbacks when safe identity is unavailable.
- Participant Live cards and authenticated spectator Live cards should use the same fallback ordering where practical.
- Safe name rendering must not expose raw emails, raw auth ids, private profile metadata, tokens, answers, seeds, serialized sessions, private progress, rating transaction ids, settlement ids, queue internals, local artifacts, or public/guest spectator access.
- Daily answer leakage protections must remain intact.

### Live Ranked/Unranked Labels

Phase 34 must add simple ranked/unranked labels to Live cards.

Requirements:

- Live cards should clearly display `Ranked` or `Unranked` from existing safe metadata.
- Timed ranked games may keep existing time-control rules copy, but Phase 34 must not expose timed ranked public leaderboard data.
- Live cards must not display player Elo/rating values in Phase 34.
- The label is display-only and must not become rating, settlement, queue, or leaderboard authority.

### One-Click Guarded Lobby Join

Phase 34 must reduce Lobby join friction.

Requirements:

- Joinable Lobby rows should present the compact visible label `Join`.
- The accessible label should communicate the full action, such as `Join multiplayer match`.
- Clicking `Join` should execute the same guarded join behavior as the Practice Multiplayer join flow, or an equivalent shared helper, without requiring a second click after navigation.
- A successful join should open or select the joined game.
- Own waiting lobbies must remain a management/cancel path, not a self-join path.
- Signed-out viewers must be routed to sign in or otherwise blocked safely.
- Daily claim-blocked rows must remain blocked.
- Stale, already-joined, completed, cancelled, deleted, or no-longer-joinable rows must fail safely, refresh visible state when practical, and avoid duplicate lobby creation.
- The existing working creator auto-routing and rematch behavior from Phase 32 must remain intact.

### Notification Direct Routing

Phase 34 must improve current foreground notification activation without adding service workers or background push.

Requirements:

- `multiplayer-your-turn` notification action targets must include the specific game id whenever available.
- In-app notification activation and browser foreground notification click behavior must share the same route target semantics.
- Clicking a foreground browser notification for a visible active game should route to `Multiplayer -> Active Games`, select the specific game, and land on the same practical destination as the corresponding `Resume` action.
- If the game is deleted, hidden, completed, no longer active, or not visible to the viewer, routing may fall back to `Multiplayer -> Active Games` with safe state refresh and no private-data exposure.
- Browser notification dispatch suppression should continue to avoid redundant notifications when the exact target surface is already active.
- No service workers, background push, push subscriptions, cross-device push, or production notification infrastructure is authorized.

### Active Game Turn Cues

Phase 34 must make active games requiring the viewer's turn visually obvious.

Requirements:

- Active multiplayer game cards must expose a clear visual cue when `turnLabel` or equivalent model state indicates `Your turn`.
- The cue must be accessible through text or aria-visible label, not color alone.
- The cue should be visually stronger than ordinary status text but should not be confused with an urgent error unless the existing attention model marks it urgent.
- The cue must not change gameplay state, turn state, scoring, rating, queue behavior, or notification generation.
- Layout must not shift or overflow at mobile and desktop sizes.

## Out Of Scope

- Vercel deployment protection changes, production deployment, preview access policy changes, Vercel project configuration, or Supabase dashboard configuration.
- Supabase auth redirect URL configuration, email template configuration, or magic-link deployment configuration.
- Account confirmation copy implementation, password change, email change, account deletion, or Settings/Danger Zone implementation.
- Beginner onboarding/help/tutorial implementation.
- Public/guest spectation.
- Spectator list/count implementation or spectator presence systems.
- Public profile routes, clickable player names/avatars, public profile browsing, richer rival avatar/profile rendering, or custom avatar image expansion.
- Player-specific direct matchmaking requests, mailbox/request flows, or custom-code/private-match expansion.
- Showing player Elo/rating values on Live cards.
- Public live site stats, player-facing aggregate site stats, private developer dashboard, admin analytics, or observability products.
- Theme proposal/template modernization or concrete theme work.
- Additional ranked mode expansion beyond Phase 33.
- Elo algorithm changes, gameplay-rule changes, scoring changes, timeout changes, forfeit changes, or settlement authority changes.
- Service workers, push subscriptions, background push, deployments, releases, GitHub backup workflow execution, or original stable repository work.

## Routing Decisions

| Observation or request | Route | Decision |
| --- | --- | --- |
| Selected Live subtab count readability | Phase 34 | In scope as a current visual bug. |
| Live cards rendering `You`/`Rival` where safe names exist | Phase 34 | In scope as a current identity-display bug. |
| Live ranked/unranked card labels | Phase 34 | In scope as low-risk transparency using safe metadata. |
| Lobby `Open to join` one-click join | Phase 34 | In scope as current UX friction and accidental-lobby risk. |
| Notification click should resume exact game | Phase 34 | In scope for local foreground notification routing only. |
| Active Games `Your turn` visual cue | Phase 34 | In scope as current attention improvement. |
| Vercel login screen after magic-link sign-in | Phase 35 auth/deployment readiness | Likely deployment protection or redirect configuration; requires dedicated external-config diagnosis. |
| Supabase auth redirects, confirmation copy, password/email management | Phase 35 auth/account-management readiness | Needs account-specific UX, auth, and configuration review. |
| Settings/Danger Zone completion | Phase 35 | Related to account safety and authenticated account management. |
| Public/guest spectation | Phase 36 or later public/spectator phase | Requires sanitized public projections and explicit RLS planning. |
| Spectator count/list and spectator sorting | Phase 36 or later spectator presence phase | Requires presence semantics, privacy rules, and likely schema/RLS work. |
| Public profile pages and clickable names/avatars | Phase 37 or later profile/social phase | Requires route, privacy, moderation, and abuse review. |
| Rival public accent/custom avatar in match surfaces | Phase 37 or later profile/social phase | Belongs with richer public profile projection. |
| Custom-code private matches and direct player match requests | Later private matchmaking/social phase | Requires anti-abuse and collusion boundaries; ranked and Daily should remain excluded by default. |
| Live card game-type Elo values | Later competitive/social display phase | Requires privacy, bucket, and timed ranked display decisions. |
| Public site stats and private developer dashboard | Later analytics/observability phase | Requires data model, privacy, and admin authorization design. |
| Beginner onboarding/help/tutorial | Later UX/onboarding phase | Important product polish, best after auth/deployment and current multiplayer surfaces settle. |
| Theme work | Later theme phase after current multiplayer/account/public/UX readiness | Not related to current Live/Lobby bugs. |

## Detailed Success Criteria

Phase 34 is successful when all of these are true:

- Selected `Live` subtab count badges are readable in desktop and mobile wrapping layouts.
- Live participant rows show safe names correctly in matchup copy.
- Authenticated read-only spectator Live rows show safe player names correctly in matchup copy.
- `You` appears only where the viewer perspective is intentional and never as the opponent's identity.
- `Rival` and other generic labels appear only when safe identity is genuinely unavailable.
- Live cards show clear display-only ranked/unranked state.
- Joinable Lobby rows present `Join` and perform a guarded one-click join.
- Direct Lobby join does not create duplicate lobbies, bypass auth, bypass Daily claim rules, or steal unrelated selected-game focus.
- `multiplayer-your-turn` in-app and browser notification activation routes to the exact selected active game when safe.
- Stale or unavailable notification targets fall back safely.
- Active Games cards visibly and accessibly mark games where it is the viewer's turn.
- No SQL/RLS changes are made unless a prior Stage 34.2 addendum is explicitly approved.
- No public/guest spectation, public profile browsing, direct matchmaking, service worker, push infrastructure, auth/deployment config, gameplay-rule change, Elo change, deployment, release, or backup workflow work is introduced.
- Focused tests, real two-client E2E where needed, final verification, visual handoff review, and manual review checklist all pass before Git handoff.

## Recommended Stage Breakdown

### Stage 34.0: Protected Baseline

- Read governance, Phase 33 completion materials, this specification, the Phase 34 planning brief, testing docs, package/test surfaces, and relevant Live/Lobby/notification source and tests.
- Confirm repository state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Record existing uncommitted Phase 34 planning/spec/progress artifacts and preserve the user-edited Phase 33 review checklist.
- Run watched-port/process/resource checks.
- Run the protected baseline verification gate.

### Stage 34.1: Live/Lobby/Notification Audit And Scope Lock

- Reproduce or inspect the attached Live badge and Live identity screenshots.
- Audit `SubtabBar`, route/workspace attention models, and selected badge styling.
- Audit participant Live row identity mapping and authenticated spectator Live row identity mapping.
- Audit Live ranked metadata availability.
- Audit Lobby row action wiring and the existing guarded join path.
- Audit notification action targets, browser foreground click behavior, dashboard dispatch, and selected-game routing.
- Decide whether Stage 34.2 migration/RLS addendum planning is required.
- Expected decision: source-only unless safe names or ranked labels cannot be derived from existing app state or existing sanitized RPC projections.

### Stage 34.2: Migration/RLS Addendum Planning If Required

Run only if Stage 34.1 proves a safe projection gap.

- Define the narrow additive SQL/RLS/RPC contract.
- Preserve Phase 29 public profile default-private boundaries.
- Preserve Phase 28 Live read-only and Daily answer-leakage boundaries.
- Define privacy-safe grants, output fields, and non-printing probes.
- Do not create or run migrations in this stage.

### Stage 34.3: Live Card And Badge Stabilization

- Fix selected Live badge readability.
- Fix participant Live card safe-name matchup labels.
- Fix authenticated spectator Live card safe-name matchup labels.
- Add Live ranked/unranked display-only labels.
- Add focused view-model/component tests for name fallback, privacy, ranked labels, and badge readability where practical.

### Stage 34.4: Lobby One-Click Join

- Replace joinable Lobby visible action copy with `Join`.
- Implement guarded one-click Lobby join using the existing join path or a shared helper.
- Preserve own-lobby management, signed-out blocking, Daily claim blocking, and stale-row fallback.
- Add focused view-model/component/domain tests for join labels, action behavior, blocked states, and no duplicate lobby creation.

### Stage 34.5: Notification Direct Routing And Active Turn Cues

- Update notification action targets and browser click routing for exact selected active games.
- Add active multiplayer `Your turn` card cue.
- Preserve foreground-only notification architecture.
- Add focused dashboard/notification/browser-notification/component tests.

### Stage 34.6: Final Hardening, Two-Client E2E, Visual Review, Checklist, And Completion Docs

- Add real two-client Supabase-backed E2E/regression coverage where Phase 34 claims require it, especially Live identity and direct Lobby join.
- Add browser or Playwright coverage for notification direct routing if feasible without service worker infrastructure.
- Run final focused and full verification gates.
- Run visual handoff review for Live/Lobby/notification surfaces.
- Create `planning/phase-34/CHANGELOG.md`.
- Create `planning/phase-34/REVIEW-CHECKLIST.md`.
- Prepare Git handoff only after explicit authorization.

## Likely Files And Modules

Likely implementation/read surfaces:

- `src/ui/SubtabBar.tsx`
- `src/app/attentionViewModels.ts`
- `src/app/LunarSignalStage.tsx`
- `src/app/App.tsx`
- `src/dashboard/dashboardActions.ts`
- `src/dashboard/dashboardViewModels.ts`
- `src/notifications/browserNotifications.ts`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerLobby.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerRepository.ts`
- Relevant dashboard, notification, multiplayer Live/Lobby/Active Games, routing, Supabase/RLS, and E2E tests.

Deferred later-phase surfaces:

- `src/account/AuthPanel.tsx`
- `src/account/AuthModal.tsx`
- `src/account/PasswordResetModal.tsx`
- `src/account/Settings.tsx`
- `src/account/dangerZone.ts`
- `src/account/auth.ts`
- `src/account/supabaseClient.ts`
- Vercel/Supabase project settings and deployment configuration.

## Migration/RLS Constraints And Addendum Gates

Phase 34 is expected to be source-only.

A migration/RLS addendum is required before SQL work if:

- Live participant safe names cannot be obtained from current app state, profile state, or existing participant identity projections.
- Live spectator safe names cannot be obtained from existing authenticated spectator RPC data.
- Ranked/unranked Live card labels require new sanitized projected fields.
- Any proposed fix expands nonparticipant visibility or public/guest access.

Any Phase 34 addendum must prohibit raw emails, raw auth ids except where already approved and unavoidable internally, private profile metadata, tokens, answers, seeds, serialized sessions, private progress, queue internals, rating transaction ids, settlement ids, local artifacts, and public/guest spectator leakage.

Rematch lifecycle, direct Lobby join, notification routing, active-game cues, badge readability, and Live ranked/unranked labels should remain app-side unless Stage 34.1 proves otherwise.

## Verification Strategy

Stage-level verification should scale with risk:

- Stage 34.0: `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, progress CSV shape check, secret/artifact checks, ignored-artifact checks, and resource checks.
- Stage 34.1 and Stage 34.2: focused read-only/browser checks as needed plus documentation verification.
- Stage 34.3: focused Live/badge view-model and component tests, then standard local gate for touched surfaces.
- Stage 34.4: focused Lobby/direct-join tests, then standard local gate for touched surfaces.
- Stage 34.5: focused dashboard/notification/browser-notification/Active Games tests, then standard local gate for touched surfaces.
- Stage 34.6: focused changed-area tests, real two-client E2E where needed, `npm run lint`, `npm run test`, `npm run test:e2e`, `npm run test:full`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, progress CSV shape check, non-printing secret/artifact scan, ignored-artifact check, watched-port/process cleanup checks, and `git status --short --branch`.

For direct Lobby join and Live identity claims, prefer real two-client Supabase-backed E2E if the existing harness can cover the flow without excessive runtime. Notification direct routing may use deterministic unit/component/browser harness checks if native browser notification clicks cannot be reliably automated.

## Visual Handoff Review Expectations

Phase 34 final hardening must run the local visual handoff review gate for current user-visible surfaces.

Capture, after assertions:

- selected `Live` subtab with readable count badge;
- Live participant card with safe matchup names and ranked/unranked label;
- Live authenticated spectator card with safe matchup names and ranked/unranked label;
- Lobby row with direct `Join` action;
- Active Games card with visible `Your turn` cue;
- notification activation result when safely capturable.

Artifacts must remain under ignored `test-results/visual-review/phase-34-.../` and must not be staged or committed.

## Manual Review Checklist Expectations

Stage 34.6 must create `planning/phase-34/REVIEW-CHECKLIST.md` with manual user-testable items for:

- Live badge readability.
- Live public-safe names in participant and spectator cards.
- Live ranked/unranked labels.
- one-click guarded Lobby join.
- notification click direct-resume behavior.
- active-game `Your turn` cue.
- preserved Phase 33 timed ranked behavior.
- preserved Phase 32 rematch/routing/identity behavior.
- preserved Daily, gameplay, Elo, leaderboard, public profile, and Live privacy boundaries.
- explicitly deferred auth/deployment, public/guest spectation, spectator lists, profile/social, private matchmaking, stats/dashboard, onboarding/help, theme, service worker, push, gameplay, and Elo work.

## Risks

- Participant Live rows and authenticated spectator rows use different projection paths; fixing one can leave the other broken.
- Replacing `Open to join` with direct join touches routing and join guards; a careless fix could duplicate lobbies or bypass auth/Daily claim rules.
- Browser notification clicks are best-effort and depend on the page context; implementation needs a reliable fallback.
- A stronger active-game turn cue can become visually noisy if it looks like an error or urgent alert for ordinary in-progress games.
- Live ranked/unranked labels must not imply public leaderboard availability, rating authority, or public access.
- If a SQL/RLS projection gap appears, Phase 34 must stop for addendum planning instead of hiding SQL work in an app-stage implementation.

## Open Decisions

These decisions are intentionally locked for the detailed implementation plan unless Stage 34.1 finds contradicting evidence:

- Lobby joinable action visible label: `Join`.
- Lobby joinable accessible action label: `Join multiplayer match`.
- Notification stale-target fallback: route to `Multiplayer -> Active Games`, refresh visible state where practical, and avoid surfacing private details.
- Live ranked/unranked label copy: `Ranked` and `Unranked`.
- Live identity work is source-only by default, but Stage 34.1 must prove this before implementation.
- Browser notification click testing may use deterministic unit/component/browser-route tests if native notification clicks are not stable in Playwright.

## Next Gated Action

Create `planning/phase-34/IMPLEMENTATION-PLAN.md` for review. The implementation plan should turn this specification into a staged execution plan, beginning with Stage 34.0 protected baseline only, and should not begin implementation.
