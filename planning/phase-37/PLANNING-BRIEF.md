# Phase 37 Planning Brief: Navigation And Gameplay Ergonomics

**Status**: Draft planning brief for review.
**Phase**: Phase 37.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-29.

## Status And Authority

This planning brief follows the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, completed Phase 36 evidence, `planning/ROADMAP.md`, `planning/ROADMAP-OPTIMIZED.md`, `planning/testing/TESTING-SUITE.md`, and the progress ledger.

It is planning-only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, brrrdle GitHub backup workflow execution, force-push, secret printing, private data exposure, local session artifact exposure, or original stable `brrrdle` repository work.

## Current Baseline

- Phase 36 is complete, backed up to GitHub, merged, branch-cleaned, and manually reviewed.
- Phase 36 manual review result from the user: all checklist items passed and no Phase 36 blockers were found.
- Expected local and remote `main`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`.
- User-edited `planning/phase-36/REVIEW-CHECKLIST.md` must be preserved.
- Phase 37 was already routed for gameplay-area centering and browser back/forward navigation after Profile and Leaderboard routes stabilized.
- New Phase 37 bug input: solo invalid guesses should play the same invalid-guess sound that multiplayer invalid guesses already play.

## Recommended Phase 37 Direction

Phase 37 should be a focused gameplay-entry and navigation ergonomics phase:

1. Make entering, joining, resuming, or direct-routing into a playable game land the player near the actual gameplay board/keyboard when safe and non-disruptive.
2. Add careful browser back/forward integration for app routes, main tabs, subtabs, and selected games without turning browser history into gameplay authority.
3. Repair the solo invalid-guess sound path so solo OG/GO invalid submissions use the same intended invalid-guess cue as multiplayer.

The sound bug is small and tightly related to gameplay feedback, so it belongs in Phase 37. The route/history and auto-scroll work should remain the primary feature shape.

## Goals

- Improve user comfort when a game is entered from Solo active games, Multiplayer active games, Lobby joins, Live resume/spectate actions, notification direct-routing, postgame actions, and direct selected-game state.
- Keep gameplay information accessible while preventing the top of the page from forcing repeated manual scrolling before the board/keyboard is visible.
- Design browser history so route and subtab navigation feels browser-native where possible.
- Preserve mutation safety: browser back/forward must not replay moves, resubmit turns, join matches, create lobbies, spend coins, claim Daily multiplayer entries, or bypass ranked queue authority.
- Repair solo invalid-guess audio feedback without changing validation rules, Hard Mode rules, word lists, tile colors, scoring, or animation semantics.
- Keep Phase 37 source work source-only unless the specification proves otherwise.

## In Scope

- Audit current route/navigation persistence in `src/app/navigationState.ts`, `src/app/routes.ts`, `src/app/App.tsx`, and `src/app/LunarSignalStage.tsx`.
- Audit Solo and Multiplayer entry/resume routing through `SoloWorkspace`, `MultiplayerWorkspace`, `MultiplayerPanel`, `MultiplayerActiveGames`, `MultiplayerLobby`, notification action handlers, dashboard actions, and postgame actions.
- Define and implement, in later authorized stages, a safe gameplay-area scroll/focus behavior for game entry and resume.
- Use accessibility-aware focus behavior: avoid stealing focus while the player is typing, avoid surprise scroll loops, respect reduced-motion where applicable, and keep keyboard navigation usable.
- Treat upper gameplay information collapse/condensation as optional. Include only if audit proves a very small, low-risk companion change is needed; otherwise defer.
- Define and implement, in later authorized stages, browser back/forward handling for top-level routes and selected subtabs where safe.
- Include stale-game and unavailable-game fallbacks: deleted, completed, hidden, stale, no-longer-visible, or unauthorized selected-game references should fall back to the safest owning route/subtab.
- Repair solo invalid-guess sound consistency for solo OG and solo GO.
- Add focused tests for navigation history serialization, popstate behavior, stale fallback behavior, entry/resume scroll triggers, accessibility safeguards, and solo invalid-guess sound dispatch.
- Run visual handoff review and a manual review checklist during final hardening.

## Out Of Scope

- Gameplay rule changes, Elo algorithm changes, scoring changes, timeout/forfeit result changes, Daily claim-rule changes, word-list changes, and tile-state changes.
- Broad gameplay layout redesign or Focus Mode implementation.
- Public/guest spectation, spectator presence lists/counts, spectator sorting, and public projection expansion.
- Public profile browsing, clickable rival profiles, social/profile pages for other players, richer public avatar policy, avatar upload size changes, direct player match requests, private custom-code matchmaking expansion, and request/mailbox flows.
- EXP, coins, or collectible counters in the header/top shell.
- Public site stats and private developer dashboard.
- Beginner onboarding/help/tutorial implementation.
- Theme modernization or broad cosmetic redesign.
- Service workers, push subscriptions, background push, production deployment, release, Vercel/Supabase configuration, or Supabase migrations unless a later addendum explicitly authorizes them.

## User Observations Routed

| Observation | Routing | Reason |
| --- | --- | --- |
| Solo invalid guesses play the valid-submit sound instead of the invalid-guess sound | Phase 37 | Small gameplay-feedback bug tied to the same current gameplay ergonomics surface. Multiplayer behavior is already the reference behavior and should remain unchanged. |
| Auto-scroll/center gameplay area on enter, join, resume, or direct route | Phase 37 | Already routed here and directly improves the same user flow. |
| Browser back/forward integration | Phase 37 | Requires careful navigation-state design after Profile and Leaderboard routes stabilized. |
| Light collapse/condensation of upper gameplay information | Phase 37 audit only, likely deferred | Potentially helpful, but broad UI churn should not block auto-scroll/focus. |
| EXP, coins, and similar counters near the header/top site area | Later progression/HUD phase after earnable systems have clear gameplay functions | This should wait until XP/coins/collectibles have durable player-facing meaning beyond current foundations. It should support guests and signed-in players. |
| Focus Mode that collapses side navigation and reduces page chrome | Late shell polish/accessibility phase after major surfaces stabilize | User preference is near the end of development; it should be designed after public/spectator, social/profile, stats/dashboard, onboarding/help, and theme implications are clearer. |

## Recommended Phase 37 V1 Scope

Phase 37 v1 should include:

- a protected baseline;
- a route/game-entry/sound audit and scope lock;
- solo invalid-guess sound source repair;
- gameplay-area scroll/focus implementation;
- browser back/forward route/subtab/selected-game integration;
- final hardening, focused regression/E2E, visual review, changelog, and manual checklist.

Phase 37 should not implement Focus Mode or EXP/coin header counters.

## Recommended Stage Breakdown

### Stage 37.0 - Protected Baseline

- Record the approved planning/spec/progress baseline.
- Preserve user-edited Phase 36 checklist state.
- Run the baseline gate before any implementation.

### Stage 37.1 - Route, Entry/Resume, History, And Sound Audit

- Audit route/subtab/selected-game state ownership.
- Audit game entry/resume flows across Solo, Multiplayer, Lobby, Live, notification, dashboard, and postgame actions.
- Audit solo OG/GO and multiplayer invalid-guess sound dispatch paths.
- Decide whether the Phase 37 sound bug is source-only. Expected answer: source-only.
- Decide whether browser history can be implemented source-only. Expected answer: source-only.
- Decide whether gameplay-area scroll/focus needs any shared component helper.

### Stage 37.2 - Solo Invalid-Guess Sound Repair

- Reproduce the solo invalid-guess sound inconsistency in focused tests or a small browser harness.
- Make the smallest source-only repair so solo OG/GO invalid submissions play the invalid-guess sound and do not also trigger the valid-submit cue.
- Preserve multiplayer invalid-guess behavior exactly.
- Preserve Hard Mode validation, word-list validation, tile flips, correct-guess sounds, game-over sounds, keyboard clicks, and sound preference gating.

### Stage 37.3 - Gameplay Entry/Resume Auto-Centering

- Implement a safe gameplay-area anchor/ref for solo and multiplayer game surfaces.
- Trigger scroll/focus only after explicit game entry, join, resume, direct-route selection, or notification routing.
- Avoid repeated scrolling on ordinary typing, timer ticks, remote polling, Live refresh, or passive data hydration.
- Respect reduced-motion and accessibility expectations.
- Add focused tests where practical and browser checks for visible board/keyboard placement.

### Stage 37.4 - Browser Back/Forward Navigation

- Define a typed navigation-history state for route, subtab, and selected-game references.
- Push browser history for deliberate route/subtab navigation and selected-game resume where safe.
- Handle `popstate` without replaying gameplay mutations.
- Fall back to the owning route/subtab when selected games are stale, hidden, deleted, completed, unavailable, or unauthorized.
- Preserve local storage navigation state compatibility.

### Stage 37.5 - Final Hardening, E2E, Visual Review, Changelog, Manual Checklist

- Run focused regression/E2E coverage for solo invalid-guess sound, gameplay-area auto-centering, route/subtab browser history, stale-game fallbacks, and key preserved flows.
- Run full final verification.
- Run local visual handoff review for changed user-visible flows.
- Create `planning/phase-37/CHANGELOG.md`.
- Create `planning/phase-37/REVIEW-CHECKLIST.md`.
- Prepare for Git handoff only after final evidence is clean.

## Success Criteria

- Solo OG and solo GO invalid submissions use the invalid-guess sound cue consistently with multiplayer invalid submissions.
- Multiplayer invalid-guess sound behavior remains unchanged.
- Entering, joining, resuming, or direct-routing into a game can land the player near the board/keyboard when safe.
- Auto-scroll/focus does not loop, steal focus during typing, or trigger during passive remote updates.
- Browser back/forward can traverse approved route/subtab/selected-game navigation states without mutating game state.
- Stale or unavailable selected-game history entries fall back safely.
- Existing local-storage navigation state remains compatible.
- Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior remain intact.
- Phase 35 Profile/auth and Live identity behavior remains intact.
- Phase 34 Live/Lobby/notification behavior remains intact.
- Phase 33 timed ranked Practice behavior and public leaderboard boundaries remain intact.
- No gameplay rules, Elo math, Daily claims, scoring, timeout, forfeit, tile-state, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, or Practice 2-35 word-length behavior change.

## Likely Files And Modules

- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/app/navigationState.ts`
- `src/app/routes.ts`
- `src/app/attentionViewModels.ts`
- `src/dashboard/dashboardActions.ts`
- `src/dashboard/dashboardViewModels.ts`
- `src/notifications/browserNotifications.ts`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`
- `src/solo/SoloWorkspace.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerLobby.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/postgameActions.ts`
- `src/sound/`
- focused tests under the corresponding source folders and E2E files as needed.

## Migration And RLS Constraints

No migration is expected for Phase 37.

If audit discovers that browser history, auto-scroll, or invalid-guess sound repair somehow requires Supabase schema/RLS changes, stop and create a Phase 37 addendum before any SQL work. Do not create or run migrations under the Phase 37 planning brief.

## Vercel And Deployment Constraints

Phase 37 should not configure Vercel or Supabase and should not deploy.

Vercel preview/protection observations from Phase 35 remain documentation/configuration concerns, not Phase 37 implementation scope. Any deployment or release action remains separately gated.

## Verification Strategy

Planning/spec passes should run lightweight documentation checks only.

Implementation stages should run focused tests first, then the relevant full gate:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check when browser/E2E work runs
- `git status --short --branch`

Final hardening should also run `npm run test:e2e` and `npm run test:full` unless a later prompt narrows the gate with an explicit reason.

## Visual Handoff Review Expectations

Final Phase 37 visual handoff should capture local-only ignored screenshots under:

`test-results/visual-review/phase-37-stage-37-5/`

Suggested scenarios:

- Solo Practice game entry after selecting a game, showing the board/keyboard centered or focused.
- Solo active-game resume.
- Multiplayer Active Games resume.
- Lobby one-click join leading to the playable area.
- Notification/direct route into a specific game if feasible in a safe harness.
- Browser back/forward route/subtab state after navigation.

Screenshots, traces, auth state, videos, and local artifacts must remain ignored/local-only and unstaged.

## Manual Review Checklist Expectations

The Phase 37 checklist should ask the user to verify:

- solo invalid guesses sound like multiplayer invalid guesses;
- multiplayer invalid-guess sound behavior still works;
- entering a solo game lands near the board/keyboard;
- resuming a solo game lands near the board/keyboard;
- joining or resuming a multiplayer game lands near the board/keyboard;
- notification/direct resume still targets the right game and lands usefully;
- browser back/forward moves through app routes/subtabs without submitting moves or corrupting selected games;
- stale/completed/unavailable game history falls back safely;
- Phase 36 Leaderboard/Stats and Settings behavior remains intact.

## GitHub Backup Workflow Expectations

Phase 37 Git handoff remains a later gate. After clean Git handoff preparation, the next backup prompt should invoke the local `brrrdle-github-backup` skill for the all-in-one governed backup workflow unless the user explicitly asks for stepwise Git gates or forbids merge/cleanup.

## Risks

- Auto-scroll can become irritating if triggered by passive state changes instead of deliberate entry/resume events.
- Browser history can become unsafe if it stores action intents instead of view state.
- `popstate` handling can fight existing local-storage navigation persistence if the ownership model is unclear.
- Selected-game references can become stale during multiplayer polling, terminal transitions, queue finalization, or cleanup.
- Sound repair should avoid double-playing keyboard/submission cues and should respect the existing sound preference gate.
- Mobile virtual keyboard behavior can make scroll positioning unstable if not verified in narrow viewports.

## Open Decisions

- Should auto-centering use scroll only, focus only, or a combined scroll-then-focus pattern for the gameplay container?
- Which flows should trigger auto-centering on first implementation: all game entries, only explicit resume/join actions, or a narrower initial set?
- Should browser history include selected-game ids immediately, or start with route/subtab history and add selected-game state after focused audit?
- Can current solo invalid-guess sound repair be covered entirely in component/unit tests, or should the final phase include a small browser sound-dispatch smoke?
- Should upper gameplay metadata condensation stay fully deferred, or should Phase 37 add only a small non-default collapse affordance if audit proves it reduces scroll without broad churn?

## Next Gated Action

Create a unified Phase 37 specification under `planning/specs/phase-37/` that turns this planning brief into implementation-oriented scope, success criteria, stage gates, and verification expectations. Do not begin implementation until that specification and the detailed implementation plan are separately authorized.
