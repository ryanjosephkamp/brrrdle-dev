# Phase 38 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 38 - Public/Spectator Readiness.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-30.
**Evidence**: `planning/phase-38/CHANGELOG.md`, `progress/PROGRESS-STEP-320.md`, and local-only visual manifest `test-results/visual-review/phase-38-stage-38-6/manifest.md` when present.

This checklist helps the user manually verify Phase 38 behavior. It does not replace automated tests, E2E coverage, migration/RLS probes, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment with non-production accounts.
- Do not paste or record secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, tokens, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Must Manually Verify

- [x] Public/signed-out users can discover eligible Practice Live games.
  - Expected: a signed-out or guest viewer can open Multiplayer -> Live and see eligible Practice Multiplayer rows when the public spectator projection has safe rows available.
  - Suggested steps: create or use a safe Practice Multiplayer match with public-profile display names, sign out or use a fresh browser context, open Multiplayer -> Live, and confirm the public row appears.
  - Evidence: `progress/PROGRESS-STEP-318.md`; visual scenario `Signed-out public Live list`.

- [x] Public/signed-out focused spectation is read-only.
  - Expected: opening a public Live spectator row shows a focused spectator view with safe submitted progress and no Submit, Join, Resume, Forfeit, Cancel, queue, Daily claim, notification, rating, account, or profile mutation controls.
  - Suggested steps: from the public Live row, click `Spectate live game` and inspect the focused spectator details.
  - Evidence: `progress/PROGRESS-STEP-318.md`; visual scenarios `Signed-out focused spectator detail` and `Signed-out focused spectator detail on mobile`.

- [x] Authenticated nonparticipant spectation still works.
  - Expected: a signed-in nonparticipant can still spectate eligible Live games read-only, with safe public participant names when available.
  - Suggested steps: use a third signed-in account that is not a participant in the test match, open Multiplayer -> Live, and spectate the game.
  - Evidence: `progress/PROGRESS-STEP-318.md`; visual scenarios `Authenticated spectator Live list` and `Authenticated focused spectator detail`.

- [x] Authenticated participant resume still works.
  - Expected: a signed-in participant sees `Resume live game` for their own active Live game and does not get pushed into the public spectator path.
  - Suggested steps: as a participant in the same safe Practice match, open Multiplayer -> Live and confirm the resume action appears.
  - Evidence: `progress/PROGRESS-STEP-318.md`; visual scenario `Signed-in participant Live resume card`.

- [x] Current Daily Multiplayer games are not public/guest spectator rows.
  - Expected: public/guest Live discovery remains Practice-only; current Daily Multiplayer rows do not appear in public Live discovery.
  - Suggested steps: if a safe Daily Multiplayer test row exists, compare signed-out Live visibility with Practice Live visibility; do not expose answers or private row data.
  - Evidence: `progress/PROGRESS-STEP-316.md`; `progress/PROGRESS-STEP-317.md`; `progress/PROGRESS-STEP-318.md`.

- [x] Public spectator payloads do not expose sensitive identity or game authority data.
  - Expected: UI surfaces show only safe labels/profile summaries and visible submitted progress. They do not show raw auth IDs, emails, public profile IDs, private profile fields, answers, seeds, raw sessions/projections, queue internals, rating internals, tokens, auth state, or local artifacts.
  - Suggested steps: inspect the public Live card and focused detail UI using safe test users; confirm only safe display names/fallback labels and visible board progress are shown.
  - Evidence: `progress/PROGRESS-STEP-316.md`; `progress/PROGRESS-STEP-318.md`.

- [x] Stale, hidden, completed, deleted, or unavailable public spectator selections fall back safely.
  - Expected: if a focused public spectator game expires or becomes unavailable, the UI returns to a safe Live list/empty state and does not expose stale private data or mutation controls.
  - Suggested steps: use browser Back/Forward or wait for/remotely remove a safe test row if practical; otherwise spot-check by opening an old focused spectator URL/state.
  - Evidence: `progress/PROGRESS-STEP-318.md`; Phase 37 browser-history fallback evidence in `progress/PROGRESS-STEP-308.md`.

- [x] Spectator presence/count/list UI is absent by design.
  - Expected: Phase 38 does not show spectator counts, viewer lists, presence badges, viewer identities, or watcher tracking UI.
  - Suggested steps: inspect public and authenticated Live list/detail surfaces and confirm no spectator count/list/presence UI appears.
  - Evidence: `progress/PROGRESS-STEP-319.md`; visual manifest notes.

- [x] Phase 38 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-38-stage-38-6/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-38-stage-38-6/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `progress/PROGRESS-STEP-320.md`.

## Optional Nice-To-Check

- [x] Try public Live on a narrow/mobile viewport.
  - Expected: the public focused spectator detail remains readable and controls do not overlap.

- [x] Try Dashboard -> Live routing as a signed-out or guest viewer.
  - Expected: Live copy points to read-only spectator visibility without promising hidden private rows.

- [x] Try browser Back/Forward from a focused public spectator view.
  - Expected: route/view state restores safely without replaying moves, joining games, or exposing unavailable rows.

- [x] Review Phase 38 visual screenshots if the local artifact directory is available.
  - Expected: each screenshot in `test-results/visual-review/phase-38-stage-38-6/manifest.md` visually matches its scenario description.

## Preserved Invariants To Spot-Check

- [x] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.
- [x] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, five-letter only, and excluded from public/guest spectator discovery.
- [x] Phase 27 ranked Practice still uses trusted queue/finalization/settlement paths.
- [x] Phase 28 authenticated Live spectator behavior remains read-only.
- [x] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [x] Phase 30 public leaderboards remain display-only and non-authoritative.
- [x] Phase 31 postgame boundaries remain intact: direct rematches are Practice-only and do not bypass ranked queue or Daily claim rules.
- [x] Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections remain intact.
- [x] Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections remain intact.
- [x] Phase 34 Live/Lobby/notification behavior and Active Games turn cues remain intact.
- [x] Phase 35 Profile/auth behavior, ranked Live identity repair, authenticated spectator safe-name support, auth redirect hardening, password-change access, and email-change configuration gate documentation remain intact.
- [x] Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior remain intact.
- [x] Phase 37 browser history, stale selected-game fallbacks, gameplay auto-centering, and solo invalid-guess sound behavior remain intact.

## Known Deferred / Not In Scope

- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/social profile browsing, clickable rival profiles, social/profile pages for other players, direct player match requests, private custom-code matchmaking expansion, and request/mailbox flows.
- Public site stats and private developer dashboard.
- Beginner onboarding/help/tutorial implementation.
- EXP, coin, and collectible header/HUD counters.
- Focus Mode or collapsible primary navigation.
- Theme modernization.
- Service workers, push subscriptions, background push, production deployment, and release.
- Gameplay-rule changes and Elo algorithm changes.

## Evidence

- `planning/phase-38/PLANNING-BRIEF.md`
- `planning/specs/phase-38/PHASE-38-PUBLIC-SPECTATOR-READINESS-SPEC-2026-06-30.md`
- `planning/specs/phase-38/PHASE-38-PUBLIC-SPECTATOR-MIGRATION-RLS-ADDENDUM-2026-06-30.md`
- `planning/phase-38/IMPLEMENTATION-PLAN.md`
- `planning/phase-38/CHANGELOG.md`
- `progress/PROGRESS-STEP-310.md` through `progress/PROGRESS-STEP-320.md`
- `supabase/migrations/20260630215141_phase38_public_spectator_projection.sql`
- `supabase/migrations/20260630220251_phase38_daily_claim_rpc_anon_revoke.sql`
- `test-results/visual-review/phase-38-stage-38-6/manifest.md` when present locally.

## Review Result

- [x] Manual review complete.
- [x] Any failed item has a follow-up prompt prepared before Phase 38 Git handoff or additional implementation.
