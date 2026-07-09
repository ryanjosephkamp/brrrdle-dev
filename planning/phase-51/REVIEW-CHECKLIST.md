# Phase 51 Manual Review Checklist

**Status:** Recovered manual review passed; ready for Final Acceptance Backup prompt.
**Phase:** Phase 51 - Account, Profile, And Player Identity.
**Repository:** `brrrdle-dev` only.
**Created:** 2026-07-08.
**Evidence:** `planning/phase-51/CHANGELOG.md`, `planning/phase-51/PLANNING-BRIEF.md`, `planning/phase-51/IMPLEMENTATION-PLAN.md`, `progress/PROGRESS-STEP-503.md`, `progress/PROGRESS-STEP-504.md`, `progress/PROGRESS-STEP-505.md`, and `progress/PROGRESS-STEP-506.md`.

This checklist helps manually verify Phase 51 user-visible account and identity behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## How To Use

Use the hosted Review Candidate after the governed backup prompt completes. Do not paste secrets, real credentials, tokens, or private data into manual notes. Check an item only after confirming it yourself. If anything fails, record exact non-secret steps and keep Phase 51 open for a same-phase follow-up.

## Manual Review Update - 2026-07-09

The user performed hosted mobile review after PR #46 and reported that Phase 51 should remain open for a same-phase follow-up.

- Passed on the top `Player name` field: safe ordinary names save, and emoji/unsupported names are rejected.
- Failed on mobile Firefox/Android: the signed-in account chip/menu does not fit inside the viewport and can clip off the left side of the screen.
- Failed as product direction: Profile still exposes separate private/current-player and public player-name concepts. The desired model is one public `Player name` for all player-facing surfaces, with no separate private/public player-name split.
- Failed on mobile feel: page scrolling is choppy/laggy enough to need a Phase 51 follow-up investigation and targeted performance repair.

## Follow-Up Implementation Update - 2026-07-09

The same-phase follow-up addressed the hosted/mobile findings before the next recovered Review Candidate backup.

- The signed-in account menu now uses a mobile-safe, viewport-capped dropdown and has mobile E2E coverage for account-menu bounds/no horizontal overflow.
- Profile now has one editable public `Player name`; the duplicate `Public player name` field, private/public name split copy, and public-profile visibility controls were removed.
- Saving Profile now sends the same validated `Player name` through the existing account-profile and public-profile seams when those seams are available.
- Optional player-card bio and public avatar URL remain as player-facing details, not separate identity names.
- Mobile CSS now removes extra shadow/backdrop-filter weight on narrow screens, including the account/menu surfaces, progression HUD, and Tailwind shadow/backdrop utilities.

## Final Manual Review Acceptance - 2026-07-09

The user reviewed the recovered hosted/mobile Review Candidate after PR #47 and reported that Phase 51 now works as intended:

- Page scrolling is better.
- Profile looks the way it should.
- Player-name emoji and special-character exclusions are applied properly.
- The signed-in player chip/menu works as intended and fits on the mobile screen.
- As far as the user can tell, the manual review checklist passes.

No additional Phase 51 implementation is recommended before final acceptance closure. Phase 52+ functional work and the future minimal-shell/design handoff remain later separately authorized steps.

## Must Manually Verify

- [x] Guest account chip opens sign-in/create-account.
  - Expected: the top-right guest chip still opens the auth flow cleanly.
  - Suggested steps: sign out or use a clean browser profile, click the guest chip, and confirm sign-in/create-account is reachable.
  - Evidence: Phase 51 changelog account-menu entry.
  - Manual review: Passed as part of the recovered Phase 51 checklist acceptance.

- [x] Signed-in account chip opens a compact account menu.
  - Expected: the signed-in chip exposes Profile, Settings, and Sign out, and the menu stays fully inside the viewport on mobile and desktop.
  - Suggested steps: sign in on mobile Firefox/Android and desktop, click the account chip, confirm the menu is not clipped, then choose Profile, Settings, and Sign out from the menu.
  - Evidence: `src/account/AccountBadge.tsx`, focused account badge tests, and mobile layout E2E account-menu bounds coverage.
  - Manual review: Passed; the user confirmed the player chip/menu fits and works on mobile.

- [x] Profile saves a safe Player name.
  - Expected: ordinary names using letters, numbers, spaces, apostrophes, periods, underscores, or hyphens can be saved.
  - Suggested steps: open Profile, save a safe player name such as `Ada Lovelace` or `Jean-Luc_2`, and confirm the chip/Profile reflect the saved name.
  - Evidence: shared player-name helper tests.
  - Manual review: Passed for the top `Player name` field.

- [x] Profile rejects unsupported player names before save.
  - Expected: empty, too-long, emoji, control-character, or unsupported-symbol names show a clear validation error and do not save.
  - Suggested steps: try a name with an emoji or unsupported symbol and confirm the error appears before any public/multiplayer surface changes.
  - Evidence: Phase 51 player-name policy tests.
  - Manual review: Passed for the top `Player name` field; follow-up must remove the duplicate public-name field rather than preserving separate name controls.

- [x] Profile exposes one public Player name.
  - Expected: Profile has exactly one editable `Player name`; there is no `Public player name` field, no private/public player-name split, and no visibility toggle for a second name.
  - Suggested steps: open Profile, confirm only one `Player name` input is present, save a safe name, and confirm the chip/Profile/player-card preview use that name.
  - Evidence: Phase 51 Profile/public-profile tests and `src/account/ProfilePanel.tsx`.
  - Manual review: Passed; the user confirmed the Profile tab looks the way it should.

- [x] Settings remains the account-management home.
  - Expected: Settings still contains sign out, password change, cloud sync, progress export/reset, and Danger Zone copy; Danger Zone is not mixed into Profile save actions.
  - Suggested steps: open Settings from the account menu and inspect Account management, Cloud sync, progress snapshot, and Danger Zone.
  - Evidence: `src/account/Settings.tsx` and Settings render tests.
  - Manual review: Passed as part of the recovered Phase 51 checklist acceptance.

- [x] Mobile scrolling feels smoother than the failed PR #46 candidate.
  - Expected: mobile page scrolling should feel less choppy, with no horizontal overflow and no clipped account/menu surfaces.
  - Suggested steps: on mobile Firefox/Android, scroll Home, Profile, Settings, Solo, Multiplayer, Leaderboard, and Word Explorer; confirm the page remains usable without obvious stutter or layout spillover.
  - Evidence: `src/index.css` mobile shadow/backdrop reductions and `e2e/layout/mobile-scroll.spec.ts`.
  - Manual review: Passed; the user confirmed page scrolling is better.

## Optional Nice-To-Check

- [x] Try the account chip/menu on mobile and desktop widths.
- [x] Confirm long but valid names stay within the chip/Profile layout.
- [x] Confirm public profile and private Practice request surfaces still show safe player names.
- [x] Confirm sign-out from the account menu flushes signed-in state and returns to guest/account access cleanly.

## Preserved Invariants To Spot-Check

- [x] Phase 50 Solo persistence still works after sign-out/sign-in and navigation away/back.
- [x] Hard refresh still lands on Home.
- [x] Daily and Practice Solo OG/GO still preserve solved/end-screen state as accepted.
- [x] Multiplayer matchmaking, first-turn persistence, private forfeit/cancel, and ranked Practice FIFO still behave as accepted.
- [x] GO definitions still are not duplicated.

## Known Deferred / Not In Scope

- Admin/backend multiplayer queue visualization.
- Minimal-shell handoff preparation.
- Broad redesign, theme modernization, ShadCN/Impeccable adoption, generated design concepts, and homepage widgets.
- Sound and Focus entries inside the account menu.
- Gameplay, rewards, scoring, Elo/rating, Daily claims, word selection, Solo/Multiplayer persistence rewrites, and ranked queue changes.
- Final Acceptance Backup and Phase 51 closure until separately authorized by the next prompt.
- Deployment configuration changes and release work.

## Evidence

- `planning/phase-51/CHANGELOG.md`
- `planning/phase-51/PLANNING-BRIEF.md`
- `planning/phase-51/IMPLEMENTATION-PLAN.md`
- `progress/PROGRESS-STEP-503.md`
- `progress/PROGRESS-STEP-504.md`
- `progress/PROGRESS-STEP-505.md`
- `progress/PROGRESS-STEP-506.md`

## Review Result

- [x] Recovered manual review passed.
- [ ] Recovered manual review found one or more issues and Phase 51 should remain open for a same-phase follow-up prompt.
- [x] Prior Review Candidate backup completed before this follow-up.
