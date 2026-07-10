# Phase 55 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 55 - Ranked Daily Multiplayer and private-request routing.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-10.
**Evidence**: `planning/phase-55/CHANGELOG.md` and `progress/PROGRESS-STEP-524.md`.

This checklist helps the user manually verify Phase 55 behavior after the governed Review Candidate Backup. It does not replace automated tests, real E2E coverage, or final verification.

## How To Use

Use the hosted development site with disposable or non-sensitive test accounts. Do not paste credentials, raw answers, private account data, or tokens into this checklist. Check an item only after observing the expected behavior. If an item fails, record the browser/device and exact non-secret steps, then keep Phase 55 open for a same-phase recovery pass.

## Must Manually Verify

- [ ] **Ranked Daily controls are separate and fixed.** In Daily Multiplayer, confirm OG/GO and Hard Mode are selectable for ranked play, while word length stays five and no clock or GO-count control appears.
- [ ] **Ranked and unranked Daily claims are independent.** Confirm the same signed-in account can enter one ranked and one unranked Daily game for each of OG and GO on the same UTC day, while a duplicate claim in the same lane remains blocked.
- [ ] **Ranked Daily matchmaking works for OG and GO.** With two eligible accounts, enter the same ranked Daily lane and confirm the oldest compatible request matches, both players enter the same game, and a repeat pairing is allowed after a prior game or pre-move cancellation.
- [ ] **Ranked Daily progress survives navigation and refresh.** Submit a valid guess, navigate away or refresh, return to Multiplayer, and confirm the durable game and submitted turn remain visible without flashing back to an empty board.
- [ ] **Ranked Daily GO completes correctly.** Confirm solved puzzles advance both players together and the fifth puzzle does not end merely because ordinary attempts are exhausted; play continues until it is solved or a participant forfeits.
- [ ] **Ranked Daily results and public metadata appear safely.** Complete a ranked Daily game and confirm the relevant leaderboard/Profile surface shows ranked Daily metadata without exposing answers, raw ids, queue details, sessions, or settlement internals.
- [ ] **Private Practice request routing remains direct.** Send a private Practice request from another player's public profile, use `Go to Practice Multiplayer`, accept it from the other account, and confirm the requester receives `Enter private match` and opens the exact created game.
- [ ] **Private Practice first turns still persist.** Submit the requester's first valid guess, refresh that browser, re-enter the match, and confirm the submitted row and current turn are preserved.
- [ ] **Mobile controls fit.** At a narrow phone viewport, confirm ranked Daily controls, account controls, request actions, and multiplayer game surfaces do not overflow horizontally or cover required actions.

## Optional Nice-To-Check

- [ ] Repeat ranked Daily matchmaking with the two accounts entering in the opposite order.
- [ ] Check reduced-motion and keyboard-only navigation through Daily Multiplayer, Leaderboard, and a public Profile.
- [ ] Check a completed ranked Daily result after signing out and back in to the same account.

## Preserved Invariants To Spot-Check

- [ ] Ranked Practice still matches and settles with its existing no-clock and canonical five-minute tracks.
- [ ] Unranked Daily OG/GO still uses its prior controls, answer namespace, and one-claim-per-mode behavior.
- [ ] Solo Practice/Daily OG/GO persistence, completed screens, and superseding Practice games remain unchanged.
- [ ] Manual browser refresh still opens Home, with saved games available after explicit re-entry.
- [ ] Live spectator views remain read-only, and public profiles expose only approved public identity/rating fields.
- [ ] The functional shell remains responsive and smoothly scrollable on mobile without horizontal overflow.

## Known Deferred / Not In Scope

- Full private-request center, notification integration, blocking, opt-out preferences, and anti-spam limits remain routed to Phase 56.
- Marketplace and consumables restricted to Solo Practice remain routed to Phase 57.
- Design direction and GPT-5.6 SOL handoff remain routed to Phase 58; the frontend rebuild remains routed to Phase 59.
- Private Daily, ranked private challenges, ranked custom-code games, new Elo formulas, and consumables in Daily or Multiplayer remain deferred.

## Evidence

- `planning/phase-55/PLANNING-BRIEF.md`
- `planning/phase-55/IMPLEMENTATION-PLAN.md`
- `planning/phase-55/CHANGELOG.md`
- `progress/PROGRESS-STEP-521.md`
- `progress/PROGRESS-STEP-522.md`
- `progress/PROGRESS-STEP-523.md`
- `progress/PROGRESS-STEP-524.md`

## Review Result

- [ ] I completed all required manual checks.
- [ ] All required checks pass, or every failure has a bounded Phase 55 follow-up before final acceptance.
- [ ] I authorize Phase 55 final acceptance/closure only after the checklist passes and a separate closure prompt is prepared.
