# Phase 37 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 37 - Navigation And Gameplay Ergonomics.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-30.
**Evidence**: `planning/phase-37/CHANGELOG.md`, `progress/PROGRESS-STEP-309.md`, and local-only visual manifest `test-results/visual-review/phase-37-stage-37-5/manifest.md` when present.

This checklist helps the user manually verify Phase 37 behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment with non-production accounts.
- Do not paste or record secrets, tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Must Manually Verify

- [ ] Phase 37 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-37-stage-37-5/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-37-stage-37-5/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `progress/PROGRESS-STEP-309.md`.

- [ ] Solo OG invalid guesses use the invalid-guess sound.
  - Expected: submitting a guess that is not in the word list, or that violates an active validation rule, plays the distinct invalid-guess cue rather than the normal valid-submit cue.
  - Suggested steps: open Solo -> Practice Solo -> OG, enter a known invalid guess, and listen for the invalid cue.
  - Evidence: `progress/PROGRESS-STEP-306.md`.

- [ ] Solo GO invalid guesses use the invalid-guess sound.
  - Expected: submitting an invalid GO guess plays the invalid-guess cue rather than the normal valid-submit cue.
  - Suggested steps: open Solo -> Practice Solo -> GO, enter a known invalid guess, and listen for the invalid cue.
  - Evidence: `progress/PROGRESS-STEP-306.md`.

- [ ] Multiplayer invalid-guess sound behavior still works.
  - Expected: Multiplayer invalid guesses continue to play the invalid-guess cue as before Phase 37.
  - Suggested steps: in a safe Multiplayer test match, submit an invalid guess and confirm the invalid cue still plays.
  - Evidence: `progress/PROGRESS-STEP-306.md`.

- [ ] Entering Solo Practice lands near the gameplay board/keyboard.
  - Expected: entering Solo Practice brings the gameplay area into view without requiring manual scrolling from the top of the page.
  - Suggested steps: open Solo -> Practice Solo on desktop and mobile/narrow viewport.
  - Evidence: `progress/PROGRESS-STEP-307.md`; visual scenarios `Solo Practice gameplay auto-centering, desktop` and `Solo Practice gameplay auto-centering, mobile`.

- [ ] Resuming or selecting a Solo active game lands near the gameplay board/keyboard.
  - Expected: selecting or resuming an active Solo game brings the gameplay area into view when a gameplay surface exists.
  - Suggested steps: create or resume a Solo Daily or Practice game from Solo Active Games.
  - Evidence: `progress/PROGRESS-STEP-307.md`.

- [ ] Joining or resuming a Multiplayer game lands near the gameplay board/keyboard.
  - Expected: direct Multiplayer resume and Lobby join flows bring the active gameplay surface into view after the game is selected.
  - Suggested steps: use safe signed-in test accounts to create/join a Practice Multiplayer match, then resume it from Active Games.
  - Evidence: `progress/PROGRESS-STEP-307.md`; `progress/PROGRESS-STEP-309.md`.

- [ ] Browser Back restores the previous app route/view instead of leaving the app immediately.
  - Expected: after navigating between app tabs, browser Back returns to the previous app view state.
  - Suggested steps: navigate from Solo Practice to Leaderboard, press browser Back, and confirm Solo Practice returns.
  - Evidence: `progress/PROGRESS-STEP-308.md`; visual scenario `Browser Back restores Solo Practice view, desktop`.

- [ ] Browser Forward restores the later app route/view.
  - Expected: after browser Back restores an earlier app view, browser Forward returns to the later app view state.
  - Suggested steps: continue from the Back check and press browser Forward; confirm the later route returns.
  - Evidence: `progress/PROGRESS-STEP-308.md`; visual scenario `Browser Forward restores Leaderboard view, desktop`.

- [ ] Browser history does not mutate gameplay.
  - Expected: browser Back/Forward never replays a guess, submits a move, joins a lobby, claims Daily Multiplayer, creates a game, or bypasses ranked queue routing.
  - Suggested steps: while in a safe test game, use browser Back/Forward and confirm no moves, joins, claims, or queue actions occur automatically.
  - Evidence: `progress/PROGRESS-STEP-308.md`.

- [ ] Stale or unavailable selected-game history falls back safely.
  - Expected: stale, deleted, hidden, completed, or unavailable selected games return to a safe owning workspace view such as Solo Active Games, Multiplayer Active Games, or the Live list.
  - Suggested steps: use an old or completed selected-game state if available; otherwise spot-check by using browser Back/Forward after a game completes.
  - Evidence: `progress/PROGRESS-STEP-308.md`; visual scenario `Multiplayer Active Games safe fallback, mobile`.

- [ ] Waiting Multiplayer lobbies remain valid selected-game states.
  - Expected: opening a waiting lobby or viewing a joinable lobby does not immediately bounce to Active Games as stale.
  - Suggested steps: create a safe Practice Multiplayer lobby, view it as creator and as joiner, and confirm the waiting/joinable view remains usable.
  - Evidence: `progress/PROGRESS-STEP-309.md`.

## Optional Nice-To-Check

- [ ] Review Phase 37 visual screenshots if the local artifact directory is available.
  - Expected: each screenshot in `test-results/visual-review/phase-37-stage-37-5/manifest.md` visually matches its scenario description.

- [ ] Try browser Back/Forward across Solo, Multiplayer, Leaderboard, Profile, and Settings.
  - Expected: route and subtab state restores cleanly without layout overlap or stale selected-game confusion.

- [ ] Try auto-centering with reduced-motion enabled in the operating system/browser.
  - Expected: auto-centering uses non-smooth behavior and remains usable.

- [ ] Try typing in a game after auto-centering.
  - Expected: ordinary typing, deleting, timer ticks, and passive remote updates do not keep yanking the page position.

## Preserved Invariants To Spot-Check

- [ ] Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior remain intact.
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

- Upper gameplay information condensation/collapse.
- EXP, coin, and collectible header/HUD counters.
- Focus Mode or collapsible primary navigation.
- Public/guest spectation, spectator presence lists/counts, spectator sorting, and public projection expansion.
- Public profile browsing, clickable rival profiles, social/profile pages for other players, direct player match requests, custom-code private matchmaking expansion, and request/mailbox flows.
- Public site stats and private developer dashboard.
- Beginner onboarding/help/tutorial implementation.
- Theme modernization.
- Service workers, push subscriptions, background push, production deployment, and release.
- Gameplay-rule changes and Elo algorithm changes.

## Evidence

- `planning/phase-37/PLANNING-BRIEF.md`
- `planning/specs/phase-37/PHASE-37-NAVIGATION-GAMEPLAY-ERGONOMICS-SPEC-2026-06-29.md`
- `planning/phase-37/IMPLEMENTATION-PLAN.md`
- `planning/phase-37/CHANGELOG.md`
- `progress/PROGRESS-STEP-301.md` through `progress/PROGRESS-STEP-309.md`
- `test-results/visual-review/phase-37-stage-37-5/manifest.md` when present locally.

## Review Result

- [ ] Manual review complete.
- [ ] Any failed item has a follow-up prompt prepared before Phase 37 Git handoff or additional implementation.
