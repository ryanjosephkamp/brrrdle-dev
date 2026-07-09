# Phase 51 Manual Review Checklist

**Status:** Ready for recovered manual user review after Review Candidate backup.
**Phase:** Phase 51 - Account, Profile, And Player Identity.
**Repository:** `brrrdle-dev` only.
**Created:** 2026-07-08.
**Evidence:** `planning/phase-51/CHANGELOG.md`, `planning/phase-51/PLANNING-BRIEF.md`, `planning/phase-51/IMPLEMENTATION-PLAN.md`, `progress/PROGRESS-STEP-503.md`, `progress/PROGRESS-STEP-504.md`, and `progress/PROGRESS-STEP-505.md`.

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

## Must Manually Verify

- [ ] Guest account chip opens sign-in/create-account.
  - Expected: the top-right guest chip still opens the auth flow cleanly.
  - Suggested steps: sign out or use a clean browser profile, click the guest chip, and confirm sign-in/create-account is reachable.
  - Evidence: Phase 51 changelog account-menu entry.

- [ ] Signed-in account chip opens a compact account menu.
  - Expected: the signed-in chip exposes Profile, Settings, and Sign out, and the menu stays fully inside the viewport on mobile and desktop.
  - Suggested steps: sign in on mobile Firefox/Android and desktop, click the account chip, confirm the menu is not clipped, then choose Profile, Settings, and Sign out from the menu.
  - Evidence: `src/account/AccountBadge.tsx`, focused account badge tests, and mobile layout E2E account-menu bounds coverage.

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

- [ ] Profile exposes one public Player name.
  - Expected: Profile has exactly one editable `Player name`; there is no `Public player name` field, no private/public player-name split, and no visibility toggle for a second name.
  - Suggested steps: open Profile, confirm only one `Player name` input is present, save a safe name, and confirm the chip/Profile/player-card preview use that name.
  - Evidence: Phase 51 Profile/public-profile tests and `src/account/ProfilePanel.tsx`.

- [ ] Settings remains the account-management home.
  - Expected: Settings still contains sign out, password change, cloud sync, progress export/reset, and Danger Zone copy; Danger Zone is not mixed into Profile save actions.
  - Suggested steps: open Settings from the account menu and inspect Account management, Cloud sync, progress snapshot, and Danger Zone.
  - Evidence: `src/account/Settings.tsx` and Settings render tests.

- [ ] Mobile scrolling feels smoother than the failed PR #46 candidate.
  - Expected: mobile page scrolling should feel less choppy, with no horizontal overflow and no clipped account/menu surfaces.
  - Suggested steps: on mobile Firefox/Android, scroll Home, Profile, Settings, Solo, Multiplayer, Leaderboard, and Word Explorer; confirm the page remains usable without obvious stutter or layout spillover.
  - Evidence: `src/index.css` mobile shadow/backdrop reductions and `e2e/layout/mobile-scroll.spec.ts`.

## Optional Nice-To-Check

- [ ] Try the account chip/menu on mobile and desktop widths.
- [ ] Confirm long but valid names stay within the chip/Profile layout.
- [ ] Confirm public profile and private Practice request surfaces still show safe player names.
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
- `progress/PROGRESS-STEP-504.md`
- `progress/PROGRESS-STEP-505.md`

## Review Result

- [ ] Recovered manual review passed.
- [ ] Recovered manual review found one or more issues and Phase 51 should remain open for a same-phase follow-up prompt.
- [x] Prior Review Candidate backup completed before this follow-up.
