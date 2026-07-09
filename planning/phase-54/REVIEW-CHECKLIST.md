# Phase 54 Manual Review Checklist

**Status:** Hosted/manual review accepted by the user; ready for Final Acceptance Backup.
**Phase:** Phase 54 - Live/Lobby identity and spectator-adjacent polish.
**Repository:** `brrrdle-dev` only.
**Created:** 2026-07-09.
**Evidence:** `planning/phase-54/CHANGELOG.md`, `planning/phase-54/PLANNING-BRIEF.md`, `planning/phase-54/IMPLEMENTATION-PLAN.md`, and `progress/PROGRESS-STEP-514.md`.

This checklist helps verify the Phase 54 participant identity and route behavior. It does not replace the automated test, E2E, privacy, or final verification gates.

**User result, 2026-07-09:** The user completed the hosted/manual review and reported that every checklist item passes. No direct Phase 54 bug, regression, or follow-up was reported.

## How To Use

Use the hosted Review Candidate after the governed backup completes. Review with safe disposable accounts only; do not paste credentials, profile ids, raw auth ids, emails, puzzle answers, tokens, or private data into notes. Check a box only after confirming it manually. If something fails, record concise non-secret steps and keep Phase 54 open for a direct same-phase follow-up.

## Must Manually Verify

- [x] Focused spectator routing remains intact.
  - Expected: `Spectate live game` opens the focused read-only view and `Back to Live list` returns to the Live list without adding profile links or gameplay controls.
  - Suggested steps: open a spectator row, inspect its read-only badge/moves, then return to the Live list.
- [x] Authenticated and signed-out spectators remain read-only and cannot open player profiles.
  - Expected: spectator player names are visible but not clickable; no Submit, Join, Cancel, Forfeit, queue, or Daily-claim action appears.
  - Suggested steps: from a third signed-in account and a clean signed-out browser, open an eligible Practice Live game and inspect the card and focused view.

- [x] Lobby host identity stays display-only and core lobby actions still work.
  - Expected: Lobby shows the host name as text, never a profile action; Join and Manage Lobby retain their existing behavior.
  - Suggested steps: open Multiplayer > Lobby as both a non-host and the host; inspect the host label and use the appropriate normal action.

- [x] No eligible target remains a safe static fallback.
  - Expected: when an opponent does not have an active public profile, their identity remains ordinary text with no broken or empty profile control.
  - Suggested steps: use an account or match where the opponent has no public profile, then inspect Active Games and Live.

- [x] An authenticated participant can open an eligible opponent public profile from Live and return to the same Multiplayer context.
  - Expected: the Live participant card opens the opponent profile; `Back to Multiplayer` returns to Multiplayer > Live rather than Leaderboard.
  - Suggested steps: with the same active match, open Multiplayer > Live, open the opponent profile, then use the contextual Back action.

- [x] An authenticated participant can open an eligible opponent public profile from Active Games.
  - Expected: an opponent with an active public profile has an accessible profile action; activating it opens `Player profile` and the existing `Public ranked Practice metadata` section.
  - Suggested steps: with two signed-in public profiles in an active Practice match, open Multiplayer > Active Games and select the opponent identity.


## Optional Nice-To-Check

- [x] Leaderboard-origin profile return remains unchanged.
  - Expected: a public profile opened from Leaderboard still uses `Back to leaderboard` and returns there.
  - Suggested steps: open a visible Leaderboard profile and use its Back control.
- [x] Mobile participant identity action fits without horizontal clipping.
  - Expected: at a narrow mobile viewport, the participant-only profile action wraps cleanly and does not overlap the Live or Active card controls.
  - Suggested steps: repeat the participant Live check on a phone or browser responsive view near 390px wide.


## Preserved Invariants To Spot-Check

- [x] Daily Multiplayer remains excluded from public/guest Live spectation.
- [x] Phase 52 private Practice requests and Phase 53 Stats/Leaderboard/public-profile metadata remain functional.
- [x] Phase 51 single public Player name, profile chip/menu fit, and mobile scrolling remain as accepted.
- [x] Phase 50 Solo persistence and Home-on-refresh behavior remain as accepted.

## Known Deferred / Not In Scope

- Lobby host profile links, spectator profile links, spectator presence/count/list/tracking, chat, social graph, notifications, and admin/backend visualization.
- Any new Supabase migration, RPC, RLS/grant, schema, table, storage, or remote project work.
- Gameplay, persistence, rewards, scoring, Elo/rating, ranked queue, private Practice, Daily, deployment, release, minimal-shell preparation, UI toolkit adoption, image generation, and Phase 55+ work.

## Evidence

- `planning/phase-54/PLANNING-BRIEF.md`
- `planning/phase-54/IMPLEMENTATION-PLAN.md`
- `planning/phase-54/CHANGELOG.md`
- `progress/PROGRESS-STEP-513.md`
- `progress/PROGRESS-STEP-514.md`

## Review Result

- [x] Review Candidate backup completed before this manual review.
- [ ] Manual review found one or more direct Phase 54 issues and Phase 54 should remain open for a same-phase follow-up prompt.
- [x] Manual review passed and Phase 54 can proceed toward final acceptance closure.
