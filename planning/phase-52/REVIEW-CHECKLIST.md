# Phase 52 Manual Review Checklist

**Status:** Hosted/manual review reported passed by the user; ready for Final Acceptance Backup.
**Phase:** Phase 52 - Private Practice Matchmaking Expansion.
**Repository:** `brrrdle-dev` only.
**Created:** 2026-07-09.
**Evidence:** `planning/phase-52/CHANGELOG.md`, `planning/phase-52/PLANNING-BRIEF.md`, `planning/phase-52/IMPLEMENTATION-PLAN.md`, `progress/PROGRESS-STEP-507.md`, `progress/PROGRESS-STEP-508.md`, and `progress/PROGRESS-STEP-509.md`.

This checklist helps manually verify the Phase 52 user-visible private Practice matchmaking expansion. It does not replace automated tests, E2E coverage, or final verification.

## How To Use

Use the hosted Review Candidate after the governed backup prompt completes. Do not paste secrets, real credentials, tokens, private account data, raw auth ids, or puzzle answers into manual notes. If anything fails, record exact non-secret steps and keep Phase 52 open for a same-phase follow-up.

User result, 2026-07-09: the user reported that the checklist appears to pass and requested Phase 52 final acceptance closure preparation.

## Must Manually Verify

- [x] Public profile private request controls are visible only when signed in.
  - Expected: signed-in players viewing another active public profile see private Practice request controls; guests are prompted to sign in.
  - Suggested steps: sign in, open another player's public profile from the leaderboard, then sign out or use a clean browser and confirm the guest message.

- [x] Default private request remains OG, 5 letters, Hard Mode off, no clock.
  - Expected: without changing settings, the request summary says `OG, 5 letters, Hard Mode off, no clock`.
  - Suggested steps: open a public profile and inspect the private Practice request summary before sending.

- [x] Private Practice GO settings can be requested and accepted.
  - Expected: mode `GO`, a non-default word length such as `7`, Hard Mode, and a supported time control appear correctly to both requester and opponent, and accepting opens a Practice GO match.
  - Suggested steps: with two signed-in accounts, choose GO, set 7 letters, enable Hard Mode, choose 5 minutes, request the match, then accept it from Practice Multiplayer.

- [x] Private Practice OG settings can be requested and accepted.
  - Expected: selected OG word length, Hard Mode, and time control appear in the request shelf and the accepted match opens normally.
  - Suggested steps: repeat the two-account flow with OG and a non-default word length.

- [x] Incoming and outgoing private request shelves remain clear.
  - Expected: incoming requests show who requested the match and an `Accept private match` action; outgoing requests show the opponent and a requester-only cancel action.
  - Suggested steps: send a request and inspect both accounts before accepting.

- [x] Existing private Practice lifecycle still works.
  - Expected: request accept, cancel, decline, first-turn persistence, and forfeit behavior still match the accepted Phase 50/51 behavior.
  - Suggested steps: run one accepted private match, submit the first valid guess, refresh/navigate away and back, then forfeit or cancel as appropriate.

## Preserved Invariants To Spot-Check

- [x] Phase 50 Solo persistence still works after sign-out/sign-in and navigation away/back.
- [x] Hard refresh still lands on Home.
- [x] Phase 51 Profile still has one public `Player name` and rejects unsupported names.
- [x] Signed-in account chip/menu still fits on mobile.
- [x] Ranked Practice FIFO matchmaking still behaves as accepted.

## Known Deferred / Not In Scope

- Private Daily matches.
- Ranked private challenges.
- Friends, blocking, opt-out settings, social graph, push notifications, and admin/backend queue visualization.
- Gameplay, rewards, scoring, Elo/rating, Daily claims, Solo persistence rewrites, ranked queue rewrites, and broad multiplayer architecture changes.
- Minimal-shell handoff preparation, UI toolkit adoption, generated image concepts, theme modernization, and redesign work.
- Final Acceptance Backup and Phase 52 closure until separately authorized.

## Review Result

- [x] Manual review passed and Phase 52 can proceed toward final acceptance closure.
- [ ] Manual review found one or more direct Phase 52 issues and Phase 52 should remain open for a same-phase follow-up prompt.
- [x] Review Candidate backup completed before this manual review.
