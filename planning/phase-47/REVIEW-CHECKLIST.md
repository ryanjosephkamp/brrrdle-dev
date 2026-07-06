# Phase 47 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 47 - Mobile Solo GO Visibility And Account Display Boundaries.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-06.
**Evidence**: `planning/phase-47/CHANGELOG.md`, `progress/PROGRESS-STEP-431.md`, and local-only visual manifest `test-results/visual-review/phase-47-stage-47-6/manifest.md` when present.

This checklist helps the user manually verify Phase 47 behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment with non-production accounts.
- Do not paste or record secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, tokens, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Codex-Assisted Preflight Summary

Automated proof completed:

- Focused Vitest regression coverage for Phase 47 changed surfaces.
- Focused Playwright mobile layout coverage for the failed GO keyboard cases.
- Local-only visual handoff review under `test-results/visual-review/phase-47-stage-47-6/`.
- `npm run lint`.
- `npm run test`.
- `npm run test:e2e`.
- `npm run test:full`.
- `npm run build` with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.
- Repository hygiene checks recorded in `progress/PROGRESS-STEP-431.md`.

Codex visual/browser review:

- Captured mobile Daily Solo GO before the first valid guess.
- Captured mobile Practice Solo GO after starting a new GO chain.
- Captured mobile Practice Solo GO re-entry after a submitted guess.
- Captured mobile Daily Solo GO re-entry after a submitted guess.
- Captured signed-out desktop History and Leaderboard display-boundary surfaces.

Codex intentionally did not verify:

- Production deployment or release behavior.
- Real user private data or real user accounts.
- Vercel/Supabase configuration changes.
- Server-authoritative Daily submissions, one-active-session leases, forced sign-out, or session security behavior.
- Spectator presence/count/list behavior, service workers, push subscriptions, gameplay-rule changes, or Elo algorithm changes.

## Must Manually Verify

- [x] Phase 47 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-47-stage-47-6/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-47-stage-47-6/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `test-results/visual-review/phase-47-stage-47-6/manifest.md`; `progress/PROGRESS-STEP-431.md`.
- [x] Stale authenticated sync completion does not repopulate guest-visible account data after sign-out.
  - Expected: a delayed authenticated sync response after sign-out is ignored unless the current auth state, active progress scope, and request user id still match.
  - Suggested steps: spot-check by signing out during/after sync activity if practical; otherwise rely on focused regression coverage.
  - Evidence: `progress/PROGRESS-STEP-430.md`.

- [x] Signed-out Dashboard/Home and Active Multiplayer do not show stale account-owned multiplayer attention.
  - Expected: after signing out, Home/Dashboard attention chips, Active Multiplayer projections, route attention, and notification attention do not reflect the just-signed-out account's participant-only rows.
  - Suggested steps: use a safe account with active multiplayer rows, sign out, then inspect Home, Multiplayer, and Notifications as guest.
  - Evidence: `progress/PROGRESS-STEP-430.md`.

- [x] Signed-out Leaderboard does not show the just-signed-out account's local rating summary.
  - Expected: after signing out, guest Leaderboard may show public aggregate/public leaderboard data, but not stale local competitive rating summaries from the signed-out account.
  - Suggested steps: use a safe test account with local rating summaries, sign out, then open Leaderboard as guest.
  - Evidence: `progress/PROGRESS-STEP-430.md`; visual capture `desktop-guest-leaderboard-boundary.png`.

- [x] Signed-out History does not show the just-signed-out account's private multiplayer rows.
  - Expected: after signing out, guest History may show legitimate guest-local solo history, but not account-owned competitive multiplayer rows from the account that just signed out.
  - Suggested steps: use a safe test account with multiplayer history, sign out, then open History as guest.
  - Evidence: `progress/PROGRESS-STEP-430.md`; visual capture `desktop-guest-history-boundary.png`.

- [x] Mobile back-to-top control does not block Solo keyboard use.
  - Expected: the floating back-to-top button is lifted away from the keyboard during mobile Solo gameplay and does not cover essential keys.
  - Suggested steps: inspect mobile Daily/Practice Solo OG/GO with the keyboard visible.
  - Evidence: `progress/PROGRESS-STEP-428.md`.

- [x] Mobile Solo OG behavior did not regress.
  - Expected: Practice/Daily Solo OG still remain playable before and after a valid guess, with no horizontal overflow and no clipped keyboard.
  - Suggested steps: spot-check Practice Solo OG and Daily Solo OG on a real mobile device.
  - Evidence: `progress/PROGRESS-STEP-428.md`; `e2e/layout/mobile-scroll.spec.ts`.

- [x] Mobile Practice Solo GO remains playable after a submitted guess and re-entry.
  - Expected: after submitting a valid Practice Solo GO guess, navigating away and returning to the GO chain leaves the full keyboard visible and usable.
  - Suggested steps: submit a valid non-winning Practice GO guess, switch to Solo Overview or another route, return to Practice Solo GO, and inspect the keyboard.
  - Evidence: `progress/PROGRESS-STEP-428.md`; visual capture `mobile-practice-go-reentry-keyboard.png`.

- [x] Mobile Daily Solo GO remains playable after a submitted guess and re-entry.
  - Expected: after submitting a valid Daily Solo GO guess, navigating away and returning to the GO chain leaves the full keyboard visible and usable.
  - Suggested steps: submit a valid non-winning Daily GO guess, switch to Solo Overview or another route, return to Daily Solo GO, and inspect the keyboard.
  - Evidence: `progress/PROGRESS-STEP-428.md`; visual capture `mobile-daily-go-reentry-keyboard.png`.

- [x] Mobile Practice Solo GO `New go chain` scrolls to a usable keyboard.
  - Expected: tapping `New go chain` on mobile Practice Solo GO scrolls far enough that the full keyboard is visible and usable.
  - Suggested steps: open Solo > Practice Solo > GO, tap `New go chain`, and inspect the keyboard.
  - Evidence: `progress/PROGRESS-STEP-428.md`; visual capture `mobile-practice-go-new-chain-keyboard.png`.

- [x] Mobile Daily Solo GO keyboard is visible before the first valid guess.
  - Expected: opening fresh Daily Solo GO on a mobile device scrolls far enough that the full keyboard is visible and usable without extra manual scrolling.
  - Suggested steps: open Solo > Daily Solo > GO on a real mobile device before submitting a guess.
  - Evidence: `progress/PROGRESS-STEP-428.md`; visual capture `mobile-daily-go-pre-guess-keyboard.png`.


## Optional Nice-To-Check

- [x] Review the local-only visual screenshots if available.
  - Expected: each screenshot in `test-results/visual-review/phase-47-stage-47-6/manifest.md` visually matches its scenario description.
- [x] Try same-account multi-tab/browser Solo play after Phase 46 sync/freshness.
  - Expected: automatic sync/freshness improvements still work, while strict one-active-session enforcement remains deferred.
- [x] Review signed-out Settings and Stats after sign-out.
  - Expected: Settings and Stats remain guest-safe and do not render stale account-only projections.
- [x] Try route entry from both Calendar/Home/Solo where applicable.
  - Expected: route entry does not bypass the mobile keyboard target or guest/account display boundary.
- [x] Repeat the GO keyboard checks in more than one real mobile browser.
  - Expected: the full keyboard remains visible across mobile browser chrome variations.

## Preserved Invariants To Spot-Check

- [x] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.
- [x] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, five-letter only, and excluded from public/guest spectator discovery.
- [x] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [x] Phase 30 public leaderboards remain display-only and non-authoritative.
- [x] Phase 31 postgame boundaries remain intact: direct rematches and private requests are Practice-only and do not bypass ranked queue or Daily claim rules.
- [x] Phase 38 public/guest Practice Live discovery, read-only public spectation, Daily spectator exclusion, and false-only mutation boundaries remain intact.
- [x] Phase 40 public profile route/card, clickable safe identity, and private Practice matchmaking boundaries remain intact.
- [x] Phase 41 multiplayer reliability repairs and real E2E harness behavior remain intact.
- [x] Phase 42 public stats, admin dashboard, Help/tutorial, browser grant/RLS repairs, and ranked queue flashing repair remain intact.
- [x] Phase 43 ranked queue fairness, shell/Home cleanup, Solo/Practice Multiplayer density cleanup, notification comfort, back-to-top behavior, and spectator comfort remain intact.
- [x] Phase 44 account-scoped local-state repairs, private Practice request eligibility, sign-in modal order, header chip removal, Stats placement, Help placeholder, and keyboard centering remain intact.
- [x] Phase 45 Daily/Practice Solo account-boundary repairs, Profile embedded sign-in order, and mobile Solo scaling follow-up remain intact.
- [x] Phase 46 automatic signed-in Solo sync/freshness, no implicit guest-to-account transfer, no authenticated progress writes to guest storage, and Solo Overview Resume-only cards remain intact.

## Known Deferred / Not In Scope

- Broad mobile shell, top-tab, route navigation, and mobile layout overhaul.
- Compact/collapsible side dock implementation.
- Configurable Home widgets and private request inbox widgets.
- Live, Active Games, and Home spectator preview cards.
- UTC/local timestamp policy changes.
- Notification redesign, rival-name context, and ranked/unranked notification context upgrades.
- Profile/public-profile data-contract simplification.
- Admin queue/lobby observability dashboard.
- Full social inbox/mailbox work and full notification-center redesign.
- Rich tutorial media and full Help rebuild.
- EXP, coin, collectible, progression HUD, Focus Mode, compact navigation, and broader mobile shell work.
- Theme proposal modernization and full concrete theme work.
- Draw-by-repetition or other gameplay-rule changes.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Service workers, push subscriptions, background push, production deployment, and release.
- Strict one-active-session enforcement, session leases, heartbeats, forced sign-out, and server-authoritative Daily submissions.
- Elo algorithm changes.

## Evidence

- `planning/phase-47/PLANNING-BRIEF.md`
- `planning/specs/phase-47/PHASE-47-MOBILE-SOLO-GO-VISIBILITY-AND-ACCOUNT-DISPLAY-BOUNDARY-SPEC-2026-07-05.md`
- `planning/phase-47/IMPLEMENTATION-PLAN.md`
- `planning/phase-47/CHANGELOG.md`
- `progress/PROGRESS-STEP-422.md` through `progress/PROGRESS-STEP-431.md`
- `test-results/visual-review/phase-47-stage-47-6/manifest.md` when present locally.

## Review Result

- [x] Manual review complete.
- [x] Any failed item has a follow-up prompt prepared before Phase 48 planning or additional implementation.

## Late Follow-Up Note

- Manual review was functionally complete, but a late real-mobile observation reported slightly laggy page scrolling after Phase 47. The lag is noticeable but not severe, and it may or may not be related to the automatic Solo gameplay scroll behavior introduced or refined in recent phases.
- This is not treated as a blocking failed Phase 47 checklist item. It is routed into Phase 48 planning as an early audit/classification gate: if the lag is a narrow Phase 47 auto-scroll regression, repair it before deeper implementation; if it is broader mobile performance or shell work, defer it to a later mobile polish phase.
