# Phase 36 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 36 - Leaderboard, Stats, Active Games, And Settings.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-28.
**Evidence**: `planning/phase-36/CHANGELOG.md`, `progress/PROGRESS-STEP-300.md`, and local-only visual manifest `test-results/visual-review/phase-36-stage-36-5/manifest.md` when present.

This checklist helps the user manually verify Phase 36 behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment with non-production accounts.
- Do not paste or record secrets, tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Must Manually Verify

- [ ] The main navigation includes `Leaderboard` between `Stats` and `Words`.
  - Expected: `Leaderboard` is a first-class top-level tab and appears between `Stats` and `Words` on desktop and narrow/mobile layouts.
  - Suggested steps: inspect the primary navigation on desktop and a narrow/mobile viewport.
  - Evidence: `progress/PROGRESS-STEP-298.md`; visual scenario `Primary navigation`.

- [ ] Stats is focused on local/personal gameplay statistics.
  - Expected: Stats shows local stats, streaks, XP, and coin trend content, and does not render the public ranked leaderboard or competitive multiplayer rating panel.
  - Suggested steps: open Stats and inspect all visible sections.
  - Evidence: `progress/PROGRESS-STEP-298.md`; visual scenario `Stats local-only`.

- [ ] Leaderboard contains public ranked Practice leaderboard content.
  - Expected: the public ranked leaderboard appears on Leaderboard, remains display-only, and still exposes only approved untimed ranked Practice OG/GO views.
  - Suggested steps: open Leaderboard and inspect the public ranked leaderboard tabs/filters.
  - Evidence: `progress/PROGRESS-STEP-298.md`; visual scenario `Leaderboard route`.

- [ ] Leaderboard contains competitive multiplayer rating content.
  - Expected: Multiplayer Ratings / competitive multiplayer rating summaries live on Leaderboard rather than Stats.
  - Suggested steps: open Leaderboard while signed in and inspect the rating summary area.
  - Evidence: `progress/PROGRESS-STEP-298.md`.

- [ ] Active Games prefers safe rival public/profile names when available.
  - Expected: from creator and joined-player perspectives, Active Games rows use safe public/profile names for the rival when available; `Rival` appears only when safe identity is genuinely unavailable.
  - Suggested steps: create or resume active games with two signed-in public-profile test accounts and inspect Multiplayer -> Active Games from both accounts.
  - Evidence: `progress/PROGRESS-STEP-297.md`.

- [ ] Active Games reserves `You` for the current viewer's own participant context.
  - Expected: `You` appears only for the viewer's own turn/context; rival labels do not incorrectly become `You`.
  - Suggested steps: inspect Active Games rows from both participant accounts.
  - Evidence: `progress/PROGRESS-STEP-297.md`.

- [ ] Settings sections are ordered correctly.
  - Expected: Settings top-level sections appear as Gameplay, Sound effects, Notifications, Account management.
  - Suggested steps: open Settings and scroll through the sections from top to bottom.
  - Evidence: `progress/PROGRESS-STEP-299.md`; visual scenario `Settings order`.

- [ ] Settings uses `Sound effects` capitalization.
  - Expected: the section heading reads `Sound effects`, not `Sound Effects`.
  - Suggested steps: open Settings and inspect the sound section heading.
  - Evidence: `progress/PROGRESS-STEP-299.md`.

- [ ] Account management is consolidated and truthful.
  - Expected: signed-in email/status, sign-out, Profile routing, password change, email-change gate, sync/account status, and destructive account/local-progress actions are grouped under Account management without pretending Settings owns full profile editing.
  - Suggested steps: open Settings signed in and signed out; inspect Account management.
  - Evidence: `progress/PROGRESS-STEP-299.md`.

- [ ] Signed-in password-update failures do not mention reset links.
  - Expected: password update failures use password-update-specific copy; same-current-password wording is used only when the provider error is reliably classifiable.
  - Suggested steps: use a safe signed-in test account and inspect the password-change failure state.
  - Evidence: `progress/PROGRESS-STEP-299.md`.

- [ ] Phase 36 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-36-stage-36-5/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-36-stage-36-5/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `progress/PROGRESS-STEP-300.md`.

## Optional Nice-To-Check

- [ ] Review Phase 36 visual screenshots if the local artifact directory is available.
  - Expected: each screenshot in `test-results/visual-review/phase-36-stage-36-5/manifest.md` visually matches its scenario description.

- [ ] Try Leaderboard and Stats on a narrow/mobile viewport.
  - Expected: navigation wraps cleanly and text does not overlap.

- [ ] Try Active Games with older/stale games where participant profile summaries are unavailable.
  - Expected: generic fallbacks remain readable and no raw identity fields are exposed.

- [ ] Try Settings signed out, signed in, and with auth unconfigured.
  - Expected: Account management remains truthful in each state.

## Preserved Invariants To Spot-Check

- [ ] Phase 35 Profile/auth behavior, ranked Live identity repair, authenticated spectator safe-name support, auth redirect hardening, password-change access, and email-change configuration gate documentation remain intact.
- [ ] Phase 34 Live/Lobby/notification behavior and Active Games turn cues remain intact.
- [ ] Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections remain intact.
- [ ] Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections remain intact.
- [ ] Phase 31 postgame boundaries remain intact: direct rematches are Practice-only and do not bypass ranked queue or Daily claim rules.
- [ ] Phase 30 public leaderboards remain display-only and non-authoritative.
- [ ] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [ ] Phase 28 authenticated Live spectator behavior remains read-only.
- [ ] Phase 27 ranked Practice still uses trusted queue/finalization/settlement paths.
- [ ] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, and five-letter only.
- [ ] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.

## Known Deferred / Not In Scope

- Gameplay auto-scroll to center the board after entering, joining, or resuming a game, routed to Phase 37.
- Browser back/forward in-app navigation integration, routed to Phase 37.
- Public/guest spectation, spectator presence lists/counts, spectator sorting, and public projection expansion.
- Public profile browsing, clickable rival profiles, social/profile pages for other players, direct player match requests, custom-code private matchmaking expansion, and request/mailbox flows.
- Public site stats and private developer dashboard.
- Beginner onboarding/help/tutorial implementation.
- Theme modernization.
- Service workers, push subscriptions, background push, production deployment, and release.
- Gameplay-rule changes and Elo algorithm changes.

## Evidence

- `planning/phase-36/PLANNING-BRIEF.md`
- `planning/specs/phase-36/PHASE-36-LEADERBOARD-STATS-ACTIVE-GAMES-SETTINGS-SPEC-2026-06-28.md`
- `planning/phase-36/IMPLEMENTATION-PLAN.md`
- `planning/phase-36/CHANGELOG.md`
- `progress/PROGRESS-STEP-292.md` through `progress/PROGRESS-STEP-300.md`
- `test-results/visual-review/phase-36-stage-36-5/manifest.md` when present locally.

## Review Result

- [ ] Manual review complete.
- [ ] Any failed item has a follow-up prompt prepared before Phase 36 Git handoff or additional implementation.
