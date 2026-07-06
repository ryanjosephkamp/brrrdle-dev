# Phase 46 Manual Review Checklist

**Status**: Manual review completed with two mobile GO follow-up failures.
**Phase**: Phase 46 - Solo Sync Integrity And Manual Review Follow-Up.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-05.
**Evidence**: `planning/phase-46/CHANGELOG.md`, `progress/PROGRESS-STEP-421.md`, and local-only visual manifest `test-results/visual-review/phase-46-stage-46-6/manifest.md` when present.

This checklist helps the user manually verify Phase 46 behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment with non-production accounts.
- Do not paste or record secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, tokens, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Codex-Assisted Preflight Summary

Automated proof completed:

- Focused Vitest regression coverage for Phase 46 changed surfaces.
- Focused Playwright mobile layout coverage for pre-guess and post-guess Solo keyboard visibility.
- Local-only visual handoff review under `test-results/visual-review/phase-46-stage-46-6/`.
- `npm run lint`.
- `npm run test`.
- `npm run test:e2e`.
- `npm run test:full`.
- `npm run build` with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.
- Repository hygiene checks recorded in `progress/PROGRESS-STEP-421.md`.

Codex visual/browser review:

- Captured mobile Practice Solo OG before the first valid guess.
- Captured mobile Practice Solo OG after the first valid guess.
- Captured mobile Daily Solo GO before the first valid guess.
- Captured desktop Solo Overview active-card Resume-only behavior.

Codex intentionally did not verify:

- Production deployment or release behavior.
- Real user private data or real user accounts.
- Vercel/Supabase configuration changes.
- Server-authoritative Daily Solo anti-cheat, one-active-session leases, forced sign-out, or conflict-locking behavior.
- Spectator presence/count/list behavior, service workers, push subscriptions, gameplay-rule changes, or Elo algorithm changes.

## User Manual Review Results

Manual review completed after the Phase 46 GitHub backup and merge. The review passed overall except for two mobile GO keyboard/scroll checks that need Phase 47 follow-up:

- Failed: mobile Daily Solo GO keyboard is visible before the first valid guess.
  - Result: the automatic mobile scroll still stops too high, leaving the bottom of the on-screen keyboard clipped.
  - User priority: any mobile automatic scroll into gameplay should always leave the full keyboard visible, ideally near the bottom of the viewport. Showing the full keyboard is more important than preserving all context above it.
- Failed: mobile Practice Solo GO remains playable after the first valid guess and after returning to the game.
  - Result: after at least one valid guess, leaving and re-entering a Solo GO game can scroll down, but not far enough; the keyboard can remain partially clipped.
  - Related observation: Practice Solo OG `New practice puzzle` scrolls correctly before the first guess, but Practice Solo GO `New go chain` does not automatically scroll down enough or may not scroll down at all.

Additional follow-up observations from manual review:

- The same signed-in account can still be active in multiple tabs/browsers, and stale same-account Solo state can still be confusing. This is believed to be deferred session/freshness/security work, not a failed Phase 46 checklist item.
- After signing out, guest-visible History, leaderboard/rating summaries, and other account-specific surfaces can still show data from the just-signed-out account. This is a remaining guest/account display-boundary follow-up and should be routed into planning rather than treated as fixed by Phase 46.
- A broader mobile shell/top-tab/navigation overhaul remains desirable later. The user suggested a compact collapsible side dock as one possible direction, but Phase 47 should only take this on if planning determines it is safe and bounded.
- Longer-term mobile gameplay scaling/responsiveness may be a better root fix than repeated scroll-offset tuning, but the immediate failure is keyboard visibility on GO flows.

## Must Manually Verify

- [x] Signed-in Solo Daily progress syncs more automatically after ordinary play.
  - Expected: after a signed-in Daily Solo OG or GO valid guess, account sync is scheduled without relying only on manual `Sync now`.
  - Suggested steps: use a safe signed-in test account, submit a valid Daily Solo guess, wait briefly, then check sync status or a second signed-in browser after a safe refresh.
  - Evidence: `progress/PROGRESS-STEP-418.md`; `progress/PROGRESS-STEP-421.md`.

- [x] Cross-browser signed-in Solo Daily freshness is improved.
  - Expected: a second browser signed into the same safe account can load account-owned Daily Solo progress after the automatic sync path has completed, without inheriting guest state.
  - Suggested steps: use two safe browser profiles and one safe test account; keep notes non-secret.
  - Evidence: `progress/PROGRESS-STEP-418.md`; `progress/PROGRESS-STEP-421.md`.

- [x] Signed-in Practice Solo progress sync behavior is improved without hurting local play.
  - Expected: meaningful signed-in Practice Solo progress is covered by the bounded automatic sync path, while ordinary guest Practice remains local.
  - Suggested steps: submit Practice Solo OG/GO progress while signed in, wait briefly, and confirm a safe second browser can refresh account-owned state after sync.
  - Evidence: `progress/PROGRESS-STEP-418.md`.

- [x] Manual `Sync now` remains available.
  - Expected: Settings/Profile sync controls still provide a manual recovery/control path and do not disappear because automatic sync exists.
  - Suggested steps: inspect the account sync surface while signed in.
  - Evidence: `progress/PROGRESS-STEP-418.md`.

- [x] Guest-to-account Solo transfer regressions remain closed.
  - Expected: guest Daily/Practice Solo guesses do not silently upload or merge into an account when signing in.
  - Suggested steps: repeat a safe subset of Phase 45 guest-to-account checks for Daily Solo and Practice Solo.
  - Evidence: `planning/phase-45/REVIEW-CHECKLIST.md`; `progress/PROGRESS-STEP-421.md`.

- [x] Signed-in Solo progress does not appear as guest progress after sign-out.
  - Expected: after sign-out, Daily/Practice Solo rehydrates guest-safe state rather than the prior account's progress.
  - Suggested steps: use a safe signed-in test account with Solo progress, sign out, and inspect Daily/Practice Solo as guest.
  - Evidence: `planning/phase-45/REVIEW-CHECKLIST.md`; `progress/PROGRESS-STEP-421.md`.

- [x] Solo Overview active-game cards use Resume as the only action.
  - Expected: active Solo cards no longer show `Select` or `Selected`; `Resume OG` / `Resume GO` opens the game.
  - Suggested steps: create or resume an active Solo game, open Solo Overview, and inspect the active card.
  - Evidence: `progress/PROGRESS-STEP-419.md`; visual capture `desktop-solo-overview-resume-only.png`.

- [x] Mobile Practice Solo OG keyboard is visible before the first valid guess.
  - Expected: opening fresh Practice Solo OG on a mobile device or 390px viewport scrolls far enough that the on-screen keyboard is usable.
  - Suggested steps: open Solo > Practice Solo > OG on mobile before submitting a guess.
  - Evidence: `progress/PROGRESS-STEP-420.md`; visual capture `mobile-practice-og-pre-guess-keyboard.png`.

- [ ] Failed manual review - Mobile Daily Solo GO keyboard is visible before the first valid guess.
  - Expected: opening fresh Daily Solo GO on a mobile device or 390px viewport scrolls far enough that the on-screen keyboard is usable.
  - Suggested steps: open Solo > Daily Solo > GO on mobile before submitting a guess.
  - Manual result: failed on real mobile review; the page does not scroll down far enough and the keyboard is clipped at the bottom.
  - Evidence: `progress/PROGRESS-STEP-420.md`; visual capture `mobile-daily-go-pre-guess-keyboard.png`.

- [x] Mobile Practice Solo OG remains playable after the first valid guess.
  - Expected: after submitting a valid Practice Solo OG guess, submitted context and keyboard remain usable without horizontal overflow.
  - Suggested steps: submit a valid non-winning Practice Solo OG guess on a real mobile device or 390px viewport.
  - Evidence: `progress/PROGRESS-STEP-420.md`; visual capture `mobile-practice-og-post-guess-context.png`.

- [ ] Failed manual review - Mobile Practice Solo GO remains playable after the first valid guess and after returning to the game.
  - Expected: after submitting a valid Practice Solo GO guess, navigating away, and returning to the active GO chain, the automatic mobile scroll leaves the full keyboard visible and usable.
  - Suggested steps: open Solo > Practice Solo > GO on mobile, start or resume a GO chain, submit a valid non-winning guess, navigate away, return to the same GO chain, and inspect whether the full keyboard is visible without manual extra scrolling.
  - Manual result: failed/partial on real mobile review; the page scrolls down but not far enough, so the keyboard can still be clipped at the bottom.
  - Evidence: user manual review notes and attached mobile screenshot from Phase 46 manual review.

- [x] Phase 46 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-46-stage-46-6/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-46-stage-46-6/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `test-results/visual-review/phase-46-stage-46-6/manifest.md`; `progress/PROGRESS-STEP-421.md`.

## Optional Nice-To-Check

- [x] Try same-account Solo play in two tabs after automatic sync.
  - Expected: focus/visibility or route-entry refresh helps stale tabs recover when no local signed-in upload is pending or in flight.
- [x] Try a temporary offline or failed-sync condition.
  - Expected: local signed-in progress is not destroyed, and manual `Sync now` remains the recovery path.
- [x] Review the floating back-to-top button near the mobile keyboard.
  - Expected: it should not block normal keyboard use; broad mobile shell changes remain deferred.
- [x] Repeat Solo Daily and Practice checks from both Calendar/Home/Solo entry points where applicable.
  - Expected: route entry does not bypass account/guest boundaries or sync freshness behavior.
- [x] Review the local-only visual screenshots if available.
  - Expected: each screenshot in `test-results/visual-review/phase-46-stage-46-6/manifest.md` visually matches its scenario description.

## Preserved Invariants To Spot-Check

- [x] Phase 45 Daily/Practice Solo account-boundary repairs, Profile embedded sign-in order, and mobile Solo post-guess scaling remain intact.
- [x] Phase 44 account-scoped local-state repairs, private Practice request eligibility, sign-in modal order, header chip removal, Stats placement, Help placeholder, and keyboard centering remain intact.
- [x] Phase 43 ranked queue fairness, shell/Home cleanup, Solo/Practice Multiplayer density cleanup, notification comfort, back-to-top behavior, and spectator comfort remain intact.
- [x] Phase 42 public stats, admin dashboard, Help/tutorial, browser grant/RLS repairs, and ranked queue flashing repair remain intact.
- [x] Phase 41 multiplayer reliability repairs and real E2E harness behavior remain intact.
- [x] Phase 40 public profile route/card, clickable safe identity, and private Practice matchmaking boundaries remain intact.
- [x] Phase 38 public/guest Practice Live discovery, read-only public spectation, Daily spectator exclusion, and false-only mutation boundaries remain intact.
- [x] Phase 31 postgame boundaries remain intact: direct rematches and private requests are Practice-only and do not bypass ranked queue or Daily claim rules.
- [x] Phase 30 public leaderboards remain display-only and non-authoritative.
- [x] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [x] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, five-letter only, and excluded from public/guest spectator discovery.
- [x] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.

## Known Deferred / Not In Scope

- Server-authoritative Daily Solo submissions, conflict revision/locking, strict one-active-session enforcement, session leases, heartbeats, forced sign-out, and stronger anti-cheat security work.
- Broad mobile shell, top-tab, route navigation, and mobile layout overhaul.
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
- Elo algorithm changes.

## Evidence

- `planning/phase-46/PLANNING-BRIEF.md`
- `planning/specs/phase-46/PHASE-46-SOLO-SYNC-INTEGRITY-AND-MANUAL-REVIEW-FOLLOW-UP-SPEC-2026-07-05.md`
- `planning/phase-46/IMPLEMENTATION-PLAN.md`
- `planning/phase-46/CHANGELOG.md`
- `progress/PROGRESS-STEP-412.md` through `progress/PROGRESS-STEP-421.md`
- `test-results/visual-review/phase-46-stage-46-6/manifest.md` when present locally.

## Review Result

- [x] Any failed item has a follow-up prompt prepared before Phase 47 planning or additional implementation.
- [x] Manual review complete with the two failed mobile GO keyboard/scroll items routed to Phase 47 planning.
