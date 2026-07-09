# Phase 51 Manual Review Checklist

**Status:** Ready for manual user review after Review Candidate backup.
**Phase:** Phase 51 - Account, Profile, And Player Identity.
**Repository:** `brrrdle-dev` only.
**Created:** 2026-07-08.
**Evidence:** `planning/phase-51/CHANGELOG.md`, `planning/phase-51/PLANNING-BRIEF.md`, `planning/phase-51/IMPLEMENTATION-PLAN.md`, and `progress/PROGRESS-STEP-503.md`.

This checklist helps manually verify Phase 51 user-visible account and identity behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## How To Use

Use the hosted Review Candidate after the governed backup prompt completes. Do not paste secrets, real credentials, tokens, or private data into manual notes. Check an item only after confirming it yourself. If anything fails, record exact non-secret steps and keep Phase 51 open for a same-phase follow-up.

## Must Manually Verify

- [ ] Guest account chip opens sign-in/create-account.
  - Expected: the top-right guest chip still opens the auth flow cleanly.
  - Suggested steps: sign out or use a clean browser profile, click the guest chip, and confirm sign-in/create-account is reachable.
  - Evidence: Phase 51 changelog account-menu entry.

- [ ] Signed-in account chip opens a compact account menu.
  - Expected: the signed-in chip exposes Profile, Settings, and Sign out without hiding notification or gameplay controls.
  - Suggested steps: sign in, click the account chip, choose Profile, Settings, and Sign out from the menu.
  - Evidence: `src/account/AccountBadge.tsx` and focused account badge tests.

- [ ] Profile saves a safe Player name.
  - Expected: ordinary names using letters, numbers, spaces, apostrophes, periods, underscores, or hyphens can be saved.
  - Suggested steps: open Profile, save a safe player name such as `Ada Lovelace` or `Jean-Luc_2`, and confirm the chip/Profile reflect the saved name.
  - Evidence: shared player-name helper tests.

- [ ] Profile rejects unsupported player names before save.
  - Expected: empty, too-long, emoji, control-character, or unsupported-symbol names show a clear validation error and do not save.
  - Suggested steps: try a name with an emoji or unsupported symbol and confirm the error appears before any public/multiplayer surface changes.
  - Evidence: Phase 51 player-name policy tests.

- [ ] Public profile uses Player name by default and preserves opt-in visibility.
  - Expected: leaving Public player name blank uses Player name for the preview/save path, and the profile stays private unless Public is selected.
  - Suggested steps: open Profile public-profile controls, leave Public player name blank, use a safe Player name, switch visibility as desired, and confirm preview/copy are clear.
  - Evidence: Phase 51 Profile/public-profile tests.

- [ ] Settings remains the account-management home.
  - Expected: Settings still contains sign out, password change, cloud sync, progress export/reset, and Danger Zone copy; Danger Zone is not mixed into Profile save actions.
  - Suggested steps: open Settings from the account menu and inspect Account management, Cloud sync, progress snapshot, and Danger Zone.
  - Evidence: `src/account/Settings.tsx` and Settings render tests.

## Optional Nice-To-Check

- [ ] Try the account chip/menu on mobile and desktop widths.
- [ ] Confirm long but valid names stay within the chip/Profile layout.
- [ ] Confirm public profile/private Practice request surfaces still show safe player names.
- [ ] Confirm sign-out from the account menu flushes signed-in state and returns to guest/account access cleanly.

## Preserved Invariants To Spot-Check

- [ ] Phase 50 Solo persistence still works after sign-out/sign-in and navigation away/back.
- [ ] Hard refresh still lands on Home.
- [ ] Daily and Practice Solo OG/GO still preserve solved/end-screen state as accepted.
- [ ] Multiplayer matchmaking, first-turn persistence, private forfeit/cancel, and ranked Practice FIFO still behave as accepted.
- [ ] GO definitions still are not duplicated.

## Known Deferred / Not In Scope

- Admin/backend multiplayer queue visualization.
- Minimal-shell handoff preparation.
- Broad redesign, theme modernization, ShadCN/Impeccable adoption, generated design concepts, and homepage widgets.
- Sound and Focus entries inside the account menu.
- Gameplay, rewards, scoring, Elo/rating, Daily claims, word selection, Solo/Multiplayer persistence rewrites, and ranked queue changes.
- Git/GitHub backup, deployment, release, and Phase 51 closure until separately authorized.

## Evidence

- `planning/phase-51/CHANGELOG.md`
- `planning/phase-51/PLANNING-BRIEF.md`
- `planning/phase-51/IMPLEMENTATION-PLAN.md`
- `progress/PROGRESS-STEP-503.md`

## Review Result

- [ ] Manual review passed.
- [ ] Manual review found one or more issues and Phase 51 should remain open for a same-phase follow-up prompt.
- [ ] Review Candidate backup completed before this checklist was used.
