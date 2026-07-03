# Phase 42 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 42 - Site Stats, Developer Dashboard, Onboarding, And Help.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-03.
**Evidence**: `planning/phase-42/CHANGELOG.md`, `progress/PROGRESS-STEP-374.md`, and local-only visual manifest `test-results/visual-review/phase-42-stage-42-7/manifest.md` when present.

This checklist helps the user manually verify Phase 42 behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, migration/RLS probes, or final verification.

## How To Use

- Use a safe development/test environment.
- Do not paste or record secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, tokens, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Codex-Assisted Preflight Summary

Automated proof completed:

- Focused Vitest regression set: 12 files, 79 tests.
- Focused Playwright regression set: 18/18 for multiplayer reliability, private matchmaking, public/guest spectator, and mobile scroll.
- `npm run lint`.
- `npm run test`.
- `npm run test:e2e`.
- `npm run test:full`.
- `npm run build` with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.
- Repository hygiene checks recorded in `progress/PROGRESS-STEP-374.md`.

Codex visual/browser review:

- Local-only visual captures under `test-results/visual-review/phase-42-stage-42-7/`.
- Captured desktop/mobile Help, mobile Settings Help doorway, desktop Stats public site stats, and mobile Practice Multiplayer route/status surfaces.
- Admin locked/admin-gated behavior was verified by focused tests; no signed-in admin screenshot was captured to avoid storing auth artifacts.

Codex intentionally did not verify:

- Production deployment or release behavior.
- Real user private data or real user accounts.
- Vercel/Supabase configuration changes.
- Spectator presence/count/list behavior, service workers, push subscriptions, gameplay-rule changes, or Elo algorithm changes.

## Must Manually Verify

- [ ] Ranked Practice queue buttons remain visually stable after queue entry.
  - Expected: after entering a ranked Practice queue, background polling does not flash the primary queue button or churn visible action states roughly every five seconds.
  - Suggested steps: sign in with a safe test account, open Multiplayer -> Practice, create a ranked Practice queue request, wait through at least two background refresh intervals, and watch the visible queue buttons/status.
  - Evidence: `progress/PROGRESS-STEP-364.md`; `progress/PROGRESS-STEP-374.md`; visual manifest scenario `multiplayer-practice-mobile`.

- [ ] Public site stats appear aggregate-only on the Stats route.
  - Expected: Stats shows a `Public site stats` / `Live site snapshot` section with aggregate totals and freshness timestamps only, separate from private local player stats.
  - Suggested steps: open Stats as a guest or normal user and confirm no raw auth IDs, emails, private profile fields, sessions, queue ids, answers, seeds, or private row details are visible.
  - Evidence: `progress/PROGRESS-STEP-372.md`; `planning/phase-42/CHANGELOG.md`; visual manifest scenario `stats-public-site-desktop`.

- [ ] Developer/admin dashboard remains locked for non-admin users.
  - Expected: anonymous and signed-in non-admin users do not see admin operational metrics or manual refresh controls.
  - Suggested steps: open the app as a guest and as a non-admin test account if available; confirm the Admin route is unavailable or locked and no admin data is shown.
  - Evidence: `progress/PROGRESS-STEP-372.md`; `progress/PROGRESS-STEP-374.md`.

- [ ] Admin operational dashboard shows only aggregate operational data for an admin test account.
  - Expected: an admin test account can see aggregate operational counts/freshness data, not secrets, tokens, raw user IDs, raw emails, private profile fields, sessions, answers, seeds, or private row payloads.
  - Suggested steps: if a safe admin test account is available, sign in, open Admin, and inspect the dashboard content.
  - Evidence: `progress/PROGRESS-STEP-366.md`; `progress/PROGRESS-STEP-372.md`.

- [ ] Help route is discoverable and readable.
  - Expected: Help appears in navigation, opens a durable Help/tutorial page, and covers current Solo, Daily, Practice, OG/GO, Hard Mode, Multiplayer, ranked Practice, Leaderboard, profile privacy, private request, spectator, Settings, Feedback, Definitions, Stats, and History behavior.
  - Suggested steps: open Help on desktop and mobile, scroll the page, and spot-check that guidance is read-only and does not force a modal or change settings.
  - Evidence: `progress/PROGRESS-STEP-373.md`; visual manifest scenarios `help-desktop` and `help-mobile`.

- [ ] Settings exposes the Help and tutorials doorway.
  - Expected: Settings includes a non-mutating `Help and tutorials` entry near the top and an `Open Help` action.
  - Suggested steps: open Settings on mobile and desktop, confirm the doorway is visible, use `Open Help`, and confirm it navigates to Help without changing settings.
  - Evidence: `progress/PROGRESS-STEP-373.md`; visual manifest scenario `settings-help-mobile`.

- [ ] Public/guest Live spectation still works read-only.
  - Expected: signed-out or guest viewers can still see eligible public Practice Live rows and focused spectator details, with no join/resume/submit/forfeit/mutation actions exposed.
  - Suggested steps: with a safe eligible Practice Live game available, open Multiplayer -> Live as a signed-out or guest viewer and inspect the list/detail path.
  - Evidence: `progress/PROGRESS-STEP-371.md`; `progress/PROGRESS-STEP-374.md`.

- [ ] Phase 39 mobile scroll smoothness still feels intact.
  - Expected: Home, Multiplayer, Stats, Leaderboard, Settings, Help, and Word Explorer scroll smoothly on mobile; no horizontal overflow or obvious overlap appears.
  - Suggested steps: use a narrow/mobile viewport or real mobile device and scroll representative Phase 42 and prior heavy surfaces.
  - Evidence: `progress/PROGRESS-STEP-327.md`; `progress/PROGRESS-STEP-329.md`; `progress/PROGRESS-STEP-373.md`; `progress/PROGRESS-STEP-374.md`.

- [ ] Phase 42 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-42-stage-42-7/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-42-stage-42-7/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `test-results/visual-review/phase-42-stage-42-7/manifest.md`; `progress/PROGRESS-STEP-374.md`.

## Optional Nice-To-Check

- [ ] Refresh Stats after opening it.
  - Expected: public stats refresh remains bounded and aggregate-only.

- [ ] Try Help route quick links.
  - Expected: Help route buttons navigate to existing routes without creating games, changing settings, or mutating account state.

- [ ] Review visual screenshots if the local artifact directory is available.
  - Expected: each screenshot in `test-results/visual-review/phase-42-stage-42-7/manifest.md` visually matches its scenario description.

- [ ] Use a small mobile viewport to open Multiplayer -> Practice after signing in.
  - Expected: Practice Multiplayer controls stay readable and the ranked queue panel remains understandable.

## Preserved Invariants To Spot-Check

- [ ] Phase 41 multiplayer reliability repairs and real E2E harness behavior remain intact.
- [ ] Phase 40 public profile route/card, clickable safe identity, and private Practice matchmaking boundaries remain intact.
- [ ] Phase 38 public/guest Practice Live discovery, read-only public spectation, Daily spectator exclusion, and false-only mutation boundaries remain intact.
- [ ] Phase 37 browser history, stale selected-game fallbacks, gameplay auto-centering, and solo invalid-guess sound behavior remain intact.
- [ ] Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior remain intact.
- [ ] Phase 35 Profile/auth behavior, ranked Live identity repair, authenticated spectator safe-name support, auth redirect hardening, password-change access, and email-change configuration gate documentation remain intact.
- [ ] Phase 34 Live/Lobby/notification behavior and Active Games turn cues remain intact.
- [ ] Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections remain intact.
- [ ] Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections remain intact.
- [ ] Phase 31 postgame boundaries remain intact: direct rematches and private requests are Practice-only and do not bypass ranked queue or Daily claim rules.
- [ ] Phase 30 public leaderboards remain display-only and non-authoritative.
- [ ] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [ ] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, five-letter only, and excluded from public/guest spectator discovery.
- [ ] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.

## Known Deferred / Not In Scope

- EXP, coin, collectible, or progression HUD counters.
- Focus Mode, compact navigation, and broader mobile UX shell overhaul.
- Theme proposal modernization and full concrete theme work.
- Full mailbox or notification-center redesign.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Ranked private invitations, ranked direct challenges, Daily match requests, and Daily custom invitations.
- Service workers, push subscriptions, background push, production deployment, and release.
- Supabase `supabase_admin` future default-privilege ownership cleanup beyond the Stage 42 active direct-grant repair.
- Gameplay-rule changes and Elo algorithm changes.

## Evidence

- `planning/phase-42/PLANNING-BRIEF.md`
- `planning/specs/phase-42/PHASE-42-SITE-STATS-DEVELOPER-DASHBOARD-ONBOARDING-HELP-SPEC-2026-07-03.md`
- `planning/specs/phase-42/PHASE-42-STATS-DASHBOARD-MIGRATION-RLS-ADDENDUM-2026-07-03.md`
- `planning/specs/phase-42/PHASE-42-SUPABASE-BROWSER-GRANT-RLS-REPAIR-ADDENDUM-2026-07-03.md`
- `planning/phase-42/IMPLEMENTATION-PLAN.md`
- `planning/phase-42/CHANGELOG.md`
- `progress/PROGRESS-STEP-359.md` through `progress/PROGRESS-STEP-374.md`
- `test-results/visual-review/phase-42-stage-42-7/manifest.md` when present locally.

## Review Result

- [ ] Any failed item has a follow-up prompt prepared before Phase 43 planning or additional implementation.
- [ ] Manual review complete.
