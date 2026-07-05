# Phase 43 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-04.
**Evidence**: `planning/phase-43/CHANGELOG.md`, `progress/PROGRESS-STEP-390.md`, and local-only visual manifest `test-results/visual-review/phase-43-stage-43-7/manifest.md` when present.

This checklist helps the user manually verify Phase 43 behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, migration/RLS probes, or final verification.

## How To Use

- Use a safe development/test environment.
- Do not paste or record secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, tokens, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Codex-Assisted Preflight Summary

Automated proof completed:

- Focused Vitest regression set for Phase 43 changed surfaces.
- Focused Playwright regression set for multiplayer reliability and mobile scroll/overflow.
- `npm run lint`.
- `npm run test`.
- `npm run test:e2e`.
- `npm run test:full`.
- `npm run build` with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.
- Repository hygiene checks recorded in `progress/PROGRESS-STEP-390.md`.

Codex visual/browser review:

- Local-only visual captures under `test-results/visual-review/phase-43-stage-43-7/`.
- Captured representative desktop/mobile Home, Stats, Help, About, Settings, Solo, Practice Multiplayer, gameplay comfort, notification, back-to-top, and public spectator surfaces where practical.

Codex intentionally did not verify:

- Production deployment or release behavior.
- Real user private data or real user accounts.
- Vercel/Supabase configuration changes.
- Spectator presence/count/list behavior, service workers, push subscriptions, gameplay-rule changes, or Elo algorithm changes.

## Must Manually Verify

- [ ] Public/guest spectator comfort is preserved.
  - Expected: public/guest Practice Live spectator views remain read-only and focus useful gameplay content without exposing join/resume/submit/forfeit actions.
  - Suggested steps: with a safe eligible Practice Live game available, open the spectator path as signed-out or guest.
  - Evidence: `progress/PROGRESS-STEP-388.md`; `progress/PROGRESS-STEP-390.md`.

- [x] Practice Multiplayer density is improved.
  - Expected: ranked explanation and empty private request content are compact, while current match actions remain clear.
  - Suggested steps: open Multiplayer -> Practice Multiplayer with signed-in test state if available.
  - Evidence: `progress/PROGRESS-STEP-387.md`; visual review manifest.

- [x] Back-to-top behavior is helpful and not intrusive.
  - Expected: the back-to-top control appears after scrolling, respects reduced-motion behavior, and stays out of gameplay interaction targets.
  - Suggested steps: scroll a long route and a gameplay route on desktop/mobile, then activate the control.
  - Evidence: `progress/PROGRESS-STEP-388.md`; `progress/PROGRESS-STEP-389.md`.

- [x] Completed/inactive Practice Multiplayer history no longer dominates the active setup area.
  - Expected: completed/inactive game buttons are separated from current-game controls and do not create a large wall of buttons above active work.
  - Suggested steps: inspect Practice Multiplayer with existing completed/inactive games.
  - Evidence: `progress/PROGRESS-STEP-387.md`.

- [x] Notification center click-away and Escape dismissal work.
  - Expected: opening Notifications, clicking outside, or pressing Escape closes the panel without navigation or data mutation.
  - Suggested steps: open Notifications on desktop and mobile-sized viewports and test dismissal.
  - Evidence: `progress/PROGRESS-STEP-388.md`; visual review manifest.

- [x] Phase 39 mobile scroll smoothness still feels intact.
  - Expected: Home, Multiplayer, Stats, Leaderboard, Settings, Help, About, and Word Explorer scroll smoothly on mobile; no horizontal overflow or obvious overlap appears.
  - Suggested steps: use a narrow/mobile viewport or real mobile device and scroll representative heavy surfaces.
  - Evidence: `progress/PROGRESS-STEP-386.md`; `progress/PROGRESS-STEP-390.md`.
- [x] Solo GO active-game metadata is not redundant.
  - Expected: the active GO chain still shows useful current controls and puzzle cards, without a bulky redundant metadata row.
  - Suggested steps: open or resume a Practice GO chain and inspect the setup/customize area.
  - Evidence: `progress/PROGRESS-STEP-387.md`.

- [x] Solo mode toggles and configuration feel compact across Solo subtabs.
  - Expected: OG/GO controls no longer leave awkward empty space, and active GO/OG setup content is still reachable.
  - Suggested steps: open Solo -> Overview, Daily Solo, Practice Solo, and Active Games; switch OG/GO where available.
  - Evidence: `progress/PROGRESS-STEP-387.md`; visual review manifest.

- [x] Stats, Help, About, and Settings feel better organized.
  - Expected: Stats starts with local stats before public site stats; Help is a concise route guide; About holds deeper explanations; Settings does not duplicate a large Help tutorial block.
  - Suggested steps: open each route on desktop and mobile and confirm the content is discoverable without feeling duplicated.
  - Evidence: `progress/PROGRESS-STEP-385.md`; visual review manifest.
  - **NOTE: Verdict – Stats feels a bit better organized, Help isn’t much better at all, About is better organized (but will need to be improved later, not now) and Settings is fine.**
  - **Stats: Stats dos feel a bit “better organized”, but there’s still a small issue with its contents. I’ve attached a screenshot to the prompt, so please look at that. But, I’ll still describe it here for you. The PUBLIC SITE STATS content belongs at the very bottom of the Stats page. And if you look at how the “LOCAL STATS” header and text below it is *outside* of the container for the local stats, we should use the same approach for the “PUBLIC SITES STATS” header and text below it. Otherwise, the user might incorrectly infer that the public site stats are actually part of the local stats, which is incorrect. Thanks!**
  - **Help: Please remove the quick route guide. The player doesn’t need buttons for these tabs – the buttons already exist in the side navigation tab column! Actually, like I said in my previous Phase 43 prep prompt: *Please remove everything from Help, and replace it all with an “under construction” type of placeholder.* We will handle the Help tab in a later Phase, once we’ve implemented the other major components of the game. Thanks!**
  - **About: This looks pretty good, but we will upgrade it in a later Phase. We should add content about the matchmaking process (lobbies, queues, etc.) as a new section after the RANKED TRANSPARENCY section, using similar formatting and style. But we don’t need to add that now if you recommend doing it in a later Phase instead. **
  - **Settings: This looks great right now. I have no new specific revisions to request at the moment.**

- [x] Gameplay validation spacing feels stable.
  - Expected: entering invalid guesses or waiting for validation messages should not cause abrupt board/control jumps.
  - Suggested steps: try Solo OG, Solo GO, and a safe Multiplayer practice surface.
  - Evidence: `progress/PROGRESS-STEP-388.md`; `progress/PROGRESS-STEP-389.md`.
  - **NOTE: Yes, this does feel stable. However, we still need to ensure that the screen is centered with keyboard always fully present during gameplay in the gameplay area of each game. If I play a solo game, then after submitting the first valid guess, the keyboard moves down (to show the “Give Up / Reveal Answer box, etc.) without the page automatically scrolling down like it should; so, I must actually scroll down on the page manually, and that is very inconvenient. We need to handle that soon.**

- [x] Shell duplicate controls are removed or moved to a better home.
  - Expected: manual sync is available from Settings, while duplicate shell-level Sound/Theme controls are not shown on every route.
  - Suggested steps: inspect the header/shell on several routes and confirm Settings still exposes appropriate controls.
  - Evidence: `progress/PROGRESS-STEP-386.md`.

- [x] Home is less cluttered and does not horizontally overflow at default zoom.
  - Expected: Home no longer shows the ordinary-page right rail, uses compact header chips, and recent results do not require horizontal scrolling.
  - Suggested steps: open Home on desktop and mobile at default zoom and scroll through the dashboard.
  - Evidence: `progress/PROGRESS-STEP-386.md`; visual review manifest.

- [x] Ranked Practice queue matching avoids immediate repeat opponents when another compatible player is waiting.
  - Expected: a same-settings ranked Practice search-again can still work, but a compatible third player already waiting should be preferred over an immediate recent rematch.
  - Suggested steps: use safe test accounts or the E2E harness evidence; do not inspect or expose raw auth IDs.
  - Evidence: `progress/PROGRESS-STEP-384.md`; `progress/PROGRESS-STEP-390.md`.

- [x] Phase 43 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-43-stage-43-7/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-43-stage-43-7/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `test-results/visual-review/phase-43-stage-43-7/manifest.md`; `progress/PROGRESS-STEP-390.md`.


## Optional Nice-To-Check

- [x] Inspect Practice Multiplayer after several completed games.
  - Expected: active controls remain easy to find, while completed games are less visually dominant.
- [x] Open a ranked Practice queue with safe test accounts.
  - Expected: queue controls stay stable and ranked matching remains authenticated, Practice-only, and trusted-settlement-bound.

- [x] Try the Settings, Help, About, Stats, and Feedback route order.
  - Expected: routes remain discoverable and do not duplicate the same long explanations in multiple places.

- [x] Review visual screenshots if the local artifact directory is available.
  - Expected: each screenshot in `test-results/visual-review/phase-43-stage-43-7/manifest.md` visually matches its scenario description.


## Preserved Invariants To Spot-Check

- [x] Phase 42 public stats, admin dashboard, Help/tutorial, browser grant/RLS repairs, and ranked queue flashing repair remain intact.
- [x] Phase 41 multiplayer reliability repairs and real E2E harness behavior remain intact.
- [x] Phase 40 public profile route/card, clickable safe identity, and private Practice matchmaking boundaries remain intact.
- [x] Phase 38 public/guest Practice Live discovery, read-only public spectation, Daily spectator exclusion, and false-only mutation boundaries remain intact.
- [x] Phase 31 postgame boundaries remain intact: direct rematches and private requests are Practice-only and do not bypass ranked queue or Daily claim rules.
- [x] Phase 30 public leaderboards remain display-only and non-authoritative.
- [x] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [x] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, five-letter only, and excluded from public/guest spectator discovery.
- [x] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.

## Known Deferred / Not In Scope

- Profile/data-contract simplification.
- Configurable Home widgets.
- Custom-code private Daily, ranked Daily, ranked private invitations, direct ranked challenges, Daily match requests, and Daily custom invitations.
- Full social inbox/mailbox work and full notification-center redesign.
- Rich tutorial media.
- EXP, coin, collectible, progression HUD, Focus Mode, compact navigation, and broader mobile shell overhaul.
- Theme proposal modernization and full concrete theme work.
- Draw-by-repetition or other gameplay-rule changes.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Service workers, push subscriptions, background push, production deployment, and release.
- Elo algorithm changes.

## Evidence

- `planning/phase-43/PHASE-43-UI-UX-GAMEPLAY-INTAKE-2026-07-03.md`
- `planning/phase-43/PHASE-43-RECOMMENDATIONS-AND-ROUTING-2026-07-03.md`
- `planning/phase-43/PLANNING-BRIEF.md`
- `planning/specs/phase-43/PHASE-43-CURRENT-SURFACE-UX-CLEANUP-RANKED-QUEUE-GAMEPLAY-COMFORT-SPEC-2026-07-03.md`
- `planning/specs/phase-43/PHASE-43-RANKED-QUEUE-MATCHING-FAIRNESS-ADDENDUM-2026-07-03.md`
- `planning/phase-43/IMPLEMENTATION-PLAN.md`
- `planning/phase-43/CHANGELOG.md`
- `progress/PROGRESS-STEP-375.md` through `progress/PROGRESS-STEP-390.md`
- `test-results/visual-review/phase-43-stage-43-7/manifest.md` when present locally.

## Review Result

- [ ] Any failed item has a follow-up prompt prepared before Phase 44 planning or additional implementation.
- [ ] Manual review complete.
