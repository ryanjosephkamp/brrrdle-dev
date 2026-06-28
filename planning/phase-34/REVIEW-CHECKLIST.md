# Phase 34 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 34 - Multiplayer Live, Lobby, notification routing, and active-game attention stabilization.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-26.
**Evidence**: `planning/phase-34/CHANGELOG.md`, `progress/PROGRESS-STEP-279.md`, and local-only visual manifest `test-results/visual-review/phase-34-stage-34-6/manifest.md` when present.

This checklist helps the user manually verify Phase 34 behavior. It does not replace automated tests, real two-client E2E, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment with non-production accounts.
- Do not paste or record secrets, tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Must Manually Verify

- [x] Phase 34 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-34-stage-34-6/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-34-stage-34-6/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `progress/PROGRESS-STEP-279.md`.
- [x] Active Games cards visibly mark games where it is your turn.
  - Expected: cards with `Your turn` show a clear visible cue and accessible label, making them stand out from waiting games without looking like an error.
  - Suggested steps: open Multiplayer -> Active Games with at least one game where it is your turn and one where it is not, then compare the cards.
  - Evidence: `progress/PROGRESS-STEP-278.md`; visual scenario `Active Games your-turn cue`.

- [x] Stale notification targets fall back safely to Multiplayer -> Active Games.
  - Expected: if a notification's target game is completed, hidden, deleted, stale, or unavailable, activation opens Active Games rather than exposing private details or selecting a broken game.
  - Suggested steps: if practical, activate an older notification after its game is no longer active and confirm the fallback.
  - Evidence: `progress/PROGRESS-STEP-278.md`.

- [x] In-app `Your turn` notifications route directly to the relevant active game when safe.
  - Expected: activating a multiplayer `Your turn` notification opens the exact Daily or Practice game when it is still playable for the viewer.
  - Suggested steps: create a multiplayer game where it becomes your turn, open the Notification Center, activate the `Your turn` notification, and confirm the matching game opens.
  - Evidence: `progress/PROGRESS-STEP-278.md`; visual scenario `Notification direct-resume target`.

- [x] Foreground browser notification clicks follow the same safe direct-resume path.
  - Expected: when browser notifications are enabled and a foreground `Your turn` notification appears, clicking it routes to the exact game when safe.
  - Suggested steps: enable browser notifications in a test browser, trigger a rival turn, click the browser notification, and confirm the relevant game opens.
  - Evidence: `progress/PROGRESS-STEP-278.md`.

- [x] Lobby one-click join does not create a duplicate lobby.
  - Expected: clicking `Join` on an existing lobby joins that lobby; it does not open a new separate match.
  - Suggested steps: after joining from Lobby, inspect the active game/lobby list and confirm only the intended game was joined.
  - Evidence: `progress/PROGRESS-STEP-277.md`.

- [x] Lobby `Join` joins the match in one guarded click.
  - Expected: clicking `Join` from the Lobby joins the selected match directly and opens/selects the joined game without requiring a second click in the Practice tab.
  - Suggested steps: from the second signed-in user, click `Join` on a joinable Lobby row and confirm the gameplay surface opens for that game.
  - Evidence: `progress/PROGRESS-STEP-277.md`; `progress/PROGRESS-STEP-279.md`.

- [x] Joinable Lobby rows use a direct `Join` action.
  - Expected: a joinable Lobby row shows `Join` with accessible `Join multiplayer match` semantics, not `Open to join`.
  - Suggested steps: have one signed-in user open a Practice Multiplayer lobby, then use a second signed-in user to open Multiplayer -> Lobby and inspect the row action.
  - Evidence: `progress/PROGRESS-STEP-277.md`; visual scenario `Lobby one-click join`.

- [x] Live cards clearly show whether a game is `Ranked` or `Unranked`.
  - Expected: each Live card shows a display-only ranked-state chip without exposing Elo/rating values.
  - Suggested steps: open Multiplayer -> Live with both ranked and unranked visible games if available, and inspect the card chips.
  - Evidence: `progress/PROGRESS-STEP-276.md`; visual scenario `Live tab selected badge and ranked labels`.

- [x] Authenticated Live spectator cards use safe profile names where available.
  - Expected: when a signed-in nonparticipant can view a Live card, both player labels prefer safe profile/public names; generic labels appear only when safe identity is unavailable.
  - Suggested steps: with a third signed-in account, open Multiplayer -> Live while two other test users have an active game and inspect the matchup copy.
  - Evidence: `progress/PROGRESS-STEP-276.md`; visual scenario `Live spectator safe labels`.
  - **NOTE:** I’ve checked this box because it looks like the generic labels are properly being used, *but* I’m not sure if safe identities are unavailable when they actually should be available. So, it looks like this is working as intended, but there may be an underlying issue where safe identities are unavailable to signed-in nonparticipants when those identities should actually be available. Please look into this for me. Thanks!

- [x] Live participant cards use safe player names rather than incorrect opponent `You` labels.
  - Expected: when you are a participant in an active Live-listed game, the opponent name uses their safe profile/public display name when available; `Rival` or another generic label appears only as fallback.
  - Suggested steps: create or open a two-player multiplayer game, open Multiplayer -> Live, and inspect the matchup copy from each player's signed-in view.
  - Evidence: `progress/PROGRESS-STEP-276.md`; `progress/PROGRESS-STEP-279.md`.

- [x] The selected `Live` subtab count is readable.
  - Expected: when `Live` is selected and a neutral count badge appears, the number has enough contrast to read clearly and does not look like an urgent/error badge.
  - Suggested steps: sign in with visible Live games, open Multiplayer -> Live, and inspect the selected tab count on desktop and mobile-width views.
  - Evidence: `progress/PROGRESS-STEP-276.md`; visual scenario `Live tab selected badge and ranked labels`.


## Optional Nice-To-Check

- [ ] Review Phase 34 visual screenshots if the local artifact directory is available.
  - Expected: each screenshot in `test-results/visual-review/phase-34-stage-34-6/manifest.md` visually matches its scenario description.

- [ ] Try the Live/Lobby/Active Games surfaces on a narrow/mobile viewport.
  - Expected: badges, chips, buttons, notification-driven routing, and turn cues remain readable and do not overlap.

- [ ] Try Lobby join while signed out.
  - Expected: signed-out users are blocked by the existing auth requirements and cannot bypass guarded join behavior.

## Preserved Invariants To Spot-Check

- [ ] Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections remain intact.
- [ ] Phase 32 rematch lifecycle, queue/lobby routing, opponent identity labels, account avatar accent propagation, no-comma rating display, and E2E protections remain intact.
- [ ] Phase 31 postgame boundaries remain intact: direct rematches are Practice-only and do not apply to Daily, ranked direct-rematch, custom/private-code direct-rematch, nonterminal, or nonparticipant cases.
- [ ] Phase 30 public leaderboards remain display-only and non-authoritative.
- [ ] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [ ] Phase 28 authenticated Live spectator behavior remains read-only.
- [ ] Phase 27 ranked Practice still uses trusted queue/finalization/settlement paths.
- [ ] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, and five-letter only.
- [ ] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.

## Known Deferred / Not In Scope

- Vercel deployment protection, magic-link redirect diagnosis, Supabase auth redirect/configuration, account confirmation copy, password changes, email changes, Settings/Danger Zone completion, and account management readiness.
- Public/guest spectation, spectator presence lists/counts, spectator sorting, and public projection expansion.
- Public profile pages, clickable player names/avatars, richer rival avatar rendering, custom avatar images, direct player match requests, custom-code private matchmaking expansion, and request/mailbox flows.
- Live card Elo/rating values, public site stats, private developer dashboard, admin analytics, onboarding/help/tutorials, theme modernization, deployments, releases, service workers, push subscriptions, gameplay-rule changes, and Elo algorithm changes.

## Review Result

- [ ] Manual review complete.
- [ ] Any failed item has a follow-up prompt prepared before Phase 34 Git handoff or additional implementation.
