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

- [ ] Phase 43 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-43-stage-43-7/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-43-stage-43-7/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `test-results/visual-review/phase-43-stage-43-7/manifest.md`; `progress/PROGRESS-STEP-390.md`.

- [ ] Ranked Practice queue matching avoids immediate repeat opponents when another compatible player is waiting.
  - Expected: a same-settings ranked Practice search-again can still work, but a compatible third player already waiting should be preferred over an immediate recent rematch.
  - Suggested steps: use safe test accounts or the E2E harness evidence; do not inspect or expose raw auth IDs.
  - Evidence: `progress/PROGRESS-STEP-384.md`; `progress/PROGRESS-STEP-390.md`.

- [ ] Stats, Help, About, and Settings feel better organized.
  - Expected: Stats starts with local stats before public site stats; Help is a concise route guide; About holds deeper explanations; Settings does not duplicate a large Help tutorial block.
  - Suggested steps: open each route on desktop and mobile and confirm the content is discoverable without feeling duplicated.
  - Evidence: `progress/PROGRESS-STEP-385.md`; visual review manifest.

- [ ] Home is less cluttered and does not horizontally overflow at default zoom.
  - Expected: Home no longer shows the ordinary-page right rail, uses compact header chips, and recent results do not require horizontal scrolling.
  - Suggested steps: open Home on desktop and mobile at default zoom and scroll through the dashboard.
  - Evidence: `progress/PROGRESS-STEP-386.md`; visual review manifest.

- [ ] Shell duplicate controls are removed or moved to a better home.
  - Expected: manual sync is available from Settings, while duplicate shell-level Sound/Theme controls are not shown on every route.
  - Suggested steps: inspect the header/shell on several routes and confirm Settings still exposes appropriate controls.
  - Evidence: `progress/PROGRESS-STEP-386.md`.

- [ ] Solo mode toggles and configuration feel compact across Solo subtabs.
  - Expected: OG/GO controls no longer leave awkward empty space, and active GO/OG setup content is still reachable.
  - Suggested steps: open Solo -> Overview, Daily Solo, Practice Solo, and Active Games; switch OG/GO where available.
  - Evidence: `progress/PROGRESS-STEP-387.md`; visual review manifest.

- [ ] Solo GO active-game metadata is not redundant.
  - Expected: the active GO chain still shows useful current controls and puzzle cards, without a bulky redundant metadata row.
  - Suggested steps: open or resume a Practice GO chain and inspect the setup/customize area.
  - Evidence: `progress/PROGRESS-STEP-387.md`.

- [ ] Practice Multiplayer density is improved.
  - Expected: ranked explanation and empty private request content are compact, while current match actions remain clear.
  - Suggested steps: open Multiplayer -> Practice Multiplayer with signed-in test state if available.
  - Evidence: `progress/PROGRESS-STEP-387.md`; visual review manifest.

- [ ] Completed/inactive Practice Multiplayer history no longer dominates the active setup area.
  - Expected: completed/inactive game buttons are separated from current-game controls and do not create a large wall of buttons above active work.
  - Suggested steps: inspect Practice Multiplayer with existing completed/inactive games.
  - Evidence: `progress/PROGRESS-STEP-387.md`.

- [ ] Gameplay validation spacing feels stable.
  - Expected: entering invalid guesses or waiting for validation messages should not cause abrupt board/control jumps.
  - Suggested steps: try Solo OG, Solo GO, and a safe Multiplayer practice surface.
  - Evidence: `progress/PROGRESS-STEP-388.md`; `progress/PROGRESS-STEP-389.md`.

- [ ] Notification center click-away and Escape dismissal work.
  - Expected: opening Notifications, clicking outside, or pressing Escape closes the panel without navigation or data mutation.
  - Suggested steps: open Notifications on desktop and mobile-sized viewports and test dismissal.
  - Evidence: `progress/PROGRESS-STEP-388.md`; visual review manifest.

- [ ] Back-to-top behavior is helpful and not intrusive.
  - Expected: the back-to-top control appears after scrolling, respects reduced-motion behavior, and stays out of gameplay interaction targets.
  - Suggested steps: scroll a long route and a gameplay route on desktop/mobile, then activate the control.
  - Evidence: `progress/PROGRESS-STEP-388.md`; `progress/PROGRESS-STEP-389.md`.

- [ ] Public/guest spectator comfort is preserved.
  - Expected: public/guest Practice Live spectator views remain read-only and focus useful gameplay content without exposing join/resume/submit/forfeit actions.
  - Suggested steps: with a safe eligible Practice Live game available, open the spectator path as signed-out or guest.
  - Evidence: `progress/PROGRESS-STEP-388.md`; `progress/PROGRESS-STEP-390.md`.

- [ ] Phase 39 mobile scroll smoothness still feels intact.
  - Expected: Home, Multiplayer, Stats, Leaderboard, Settings, Help, About, and Word Explorer scroll smoothly on mobile; no horizontal overflow or obvious overlap appears.
  - Suggested steps: use a narrow/mobile viewport or real mobile device and scroll representative heavy surfaces.
  - Evidence: `progress/PROGRESS-STEP-386.md`; `progress/PROGRESS-STEP-390.md`.

## Optional Nice-To-Check

- [ ] Review visual screenshots if the local artifact directory is available.
  - Expected: each screenshot in `test-results/visual-review/phase-43-stage-43-7/manifest.md` visually matches its scenario description.

- [ ] Try the Settings, Help, About, Stats, and Feedback route order.
  - Expected: routes remain discoverable and do not duplicate the same long explanations in multiple places.

- [ ] Open a ranked Practice queue with safe test accounts.
  - Expected: queue controls stay stable and ranked matching remains authenticated, Practice-only, and trusted-settlement-bound.

- [ ] Inspect Practice Multiplayer after several completed games.
  - Expected: active controls remain easy to find, while completed games are less visually dominant.

## Preserved Invariants To Spot-Check

- [ ] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.
- [ ] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, five-letter only, and excluded from public/guest spectator discovery.
- [ ] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [ ] Phase 30 public leaderboards remain display-only and non-authoritative.
- [ ] Phase 31 postgame boundaries remain intact: direct rematches and private requests are Practice-only and do not bypass ranked queue or Daily claim rules.
- [ ] Phase 38 public/guest Practice Live discovery, read-only public spectation, Daily spectator exclusion, and false-only mutation boundaries remain intact.
- [ ] Phase 40 public profile route/card, clickable safe identity, and private Practice matchmaking boundaries remain intact.
- [ ] Phase 41 multiplayer reliability repairs and real E2E harness behavior remain intact.
- [ ] Phase 42 public stats, admin dashboard, Help/tutorial, browser grant/RLS repairs, and ranked queue flashing repair remain intact.

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
