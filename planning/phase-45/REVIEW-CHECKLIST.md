# Phase 45 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 45 - Solo Cloud Progress Boundaries And Mobile Follow-Up.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-05.
**Evidence**: `planning/phase-45/CHANGELOG.md`, `progress/PROGRESS-STEP-411.md`, and local-only visual manifest `test-results/visual-review/phase-45-stage-45-7/manifest.md` when present.

This checklist helps the user manually verify Phase 45 behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment with non-production accounts.
- Do not paste or record secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, tokens, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Codex-Assisted Preflight Summary

Automated proof completed:

- Focused Vitest regression coverage for Phase 45 changed surfaces.
- Focused Playwright regression coverage for mobile Solo scaling, public/guest spectator behavior, private matchmaking, multiplayer reliability, and Solo GO routes.
- `npm run lint`.
- `npm run test`.
- `npm run test:e2e`.
- `npm run test:full`.
- `npm run build` with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.
- Repository hygiene checks recorded in `progress/PROGRESS-STEP-411.md`.

Codex visual/browser review:

- Local-only visual captures under `test-results/visual-review/phase-45-stage-45-7/`.
- Captured mobile Solo Practice OG after a valid guess, mobile Solo Practice GO after a valid guess, mobile Profile embedded sign-in ordering, and desktop Solo Practice OG after a valid guess.

Codex intentionally did not verify:

- Production deployment or release behavior.
- Real user private data or real user accounts.
- Vercel/Supabase configuration changes.
- Spectator presence/count/list behavior, service workers, push subscriptions, gameplay-rule changes, or Elo algorithm changes.

## Must Manually Verify

- [x] Mobile Solo Practice GO remains playable after the first valid guess.
  - Expected: after submitting a valid Solo Practice GO guess on mobile, the submitted row/status and keyboard remain usable without horizontal overflow.
  - Suggested steps: use a real mobile device or a 390px-wide viewport and submit a valid non-winning Practice GO guess.
  - Evidence: `progress/PROGRESS-STEP-410.md`; visual capture `mobile-solo-practice-go-after-guess.png`.

- [x] Mobile Solo Practice OG remains playable after the first valid guess.
  - Expected: after submitting a valid Solo Practice OG guess on mobile, the submitted row/status and keyboard remain usable without horizontal overflow.
  - Suggested steps: use a real mobile device or a 390px-wide viewport and submit a valid non-winning Practice OG guess.
  - Evidence: `progress/PROGRESS-STEP-410.md`; visual capture `mobile-solo-practice-og-after-guess.png`.

- [x] Phase 45 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-45-stage-45-7/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-45-stage-45-7/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `test-results/visual-review/phase-45-stage-45-7/manifest.md`; `progress/PROGRESS-STEP-411.md`.
- [x] Phase 44 account-scoped local-state repairs remain intact.
  - Expected: History, Settings, Stats, Leaderboard/rating summaries, Active Multiplayer projections, selected-game state, and sign-out rehydration remain scoped by guest/account ownership.
  - Suggested steps: spot-check the Phase 44 checklist items that previously passed.
  - Evidence: `planning/phase-44/REVIEW-CHECKLIST.md`; `progress/PROGRESS-STEP-411.md`.

- [x] Desktop Solo layout remains stable.
  - Expected: the mobile-specific Solo scaling repair does not make desktop Solo feel cramped or misaligned.
  - Suggested steps: inspect Solo Practice OG/GO on a desktop viewport before and after a valid guess.
  - Evidence: visual capture `desktop-solo-practice-og-after-guess.png`.

- [x] Sign-in modal order still matches the Profile embedded panel.
  - Expected: the modal and embedded Profile panel both use Email + password first/default and Magic link second.
  - Suggested steps: open the account/sign-in modal from the header and compare with Profile.
  - Evidence: `progress/PROGRESS-STEP-409.md`; prior Phase 44 checklist.

- [x] Profile embedded sign-in defaults to Email + password first.
  - Expected: on the Profile route while signed out, the embedded sign-in panel shows Email + password first and selected by default; Magic link remains second and available.
  - Suggested steps: open Profile as guest on desktop and mobile.
  - Evidence: `progress/PROGRESS-STEP-409.md`; visual capture `mobile-profile-embedded-sign-in-order.png`.

- [x] Signed-in Practice Solo OG/GO progress does not remain visible after sign-out.
  - Expected: guest Practice Solo after sign-out shows guest-safe state and not the prior account's signed-in Practice progress.
  - Suggested steps: use a safe test account with Practice Solo OG/GO progress, sign out, and inspect Practice Solo.
  - Evidence: `progress/PROGRESS-STEP-408.md`.

- [x] Practice Solo GO guest progress does not transfer into a signed-in account.
  - Expected: signing in after guest Practice Solo GO play does not silently treat the guest GO chain as account-owned progress.
  - Suggested steps: repeat the Practice OG check for Practice GO.
  - Evidence: `progress/PROGRESS-STEP-408.md`.

- [x] Practice Solo OG guest progress does not transfer into a signed-in account.
  - Expected: signing in after guest Practice Solo OG play does not silently treat the guest Practice progress as account-owned progress.
  - Suggested steps: submit guest Practice Solo OG progress, sign in, and confirm account-scoped Practice state is used.
  - Evidence: `progress/PROGRESS-STEP-408.md`.

- [x] Cross-browser signed-in Daily Solo persistence follows the account.
  - Expected: when authenticated cloud sync is available, a safe signed-in account's Daily Solo OG/GO progress can load on another browser without inheriting that browser's guest Daily guesses.
  - Suggested steps: use two safe browser profiles and one safe test account; keep notes non-secret and do not record raw auth identifiers.
  - Evidence: `progress/PROGRESS-STEP-405.md` through `progress/PROGRESS-STEP-407.md`.
  - **NOTE: This works works as intended only if the account has properly synced the progress. Perhaps we can find a way to perform an automatic sync more often? I don’t know what the best approach to this would be, but it does appear to be working as intended. It is just a bit inconvenient that the player must manually sync progress to have it properly persist across browsers.**

- [x] Signed-in Daily Solo GO progress does not remain visible after sign-out.
  - Expected: after signing out, the guest Daily Solo GO surface shows guest-safe state and does not show the prior account's signed-in Daily GO guesses.
  - Suggested steps: repeat the Daily OG sign-out boundary check for Daily Solo GO.
  - Evidence: `progress/PROGRESS-STEP-407.md`; focused Daily account-boundary tests.

- [x] Signed-in Daily Solo OG progress does not remain visible after sign-out.
  - Expected: after signing out, the guest Daily Solo OG surface shows guest-safe state and does not show the prior account's signed-in Daily OG guesses.
  - Suggested steps: submit a signed-in Daily Solo OG guess in a safe test account, sign out, and inspect Daily Solo OG as guest.
  - Evidence: `progress/PROGRESS-STEP-407.md`; focused Daily account-boundary tests.

- [x] Daily Solo GO guest progress does not transfer into a signed-in account.
  - Expected: if a signed-out guest submits a current Daily Solo GO guess and then signs in, the signed-in account shows account-owned Daily GO progress or an account-safe fresh state, not the guest guess.
  - Suggested steps: repeat the Daily OG sign-in boundary check for Daily Solo GO.
  - Evidence: `progress/PROGRESS-STEP-407.md`; `progress/PROGRESS-STEP-411.md`.

- [x] Daily Solo OG guest progress does not transfer into a signed-in account.
  - Expected: if a signed-out guest submits a current Daily Solo OG guess and then signs in, the signed-in account shows account-owned Daily OG progress or an account-safe fresh state, not the guest guess.
  - Suggested steps: use a safe test browser profile and safe test account; submit one guest Daily Solo OG guess, sign in, and inspect Daily Solo OG.
  - Evidence: `progress/PROGRESS-STEP-407.md`; `progress/PROGRESS-STEP-411.md`.


## Optional Nice-To-Check

- [x] Try two browser profiles with different guest Daily guesses before signing into the same safe account.
  - Expected: neither guest's Daily guesses become account-owned by signing in.
- [x] Try Daily Solo from both Calendar and Solo routes.
  - Expected: both entry points use the same scoped Daily persistence behavior.
- [x] Review the local-only visual screenshots if available.
  - Expected: each screenshot in `test-results/visual-review/phase-45-stage-45-7/manifest.md` visually matches its scenario description.
- [x] Repeat sign-in/sign-out more than once in the same browser profile.
  - Expected: Daily and Practice Solo do not drift back into prior-owner state.

## Preserved Invariants To Spot-Check

- [x] Phase 44 private Practice request eligibility, sign-in modal order, header chip removal, Stats placement, Help placeholder, and keyboard centering remain intact.
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

- Broad mobile shell, top-tab, route navigation, and mobile layout overhaul.
- Configurable Home widgets and private request inbox widgets.
- Live, Active Games, and Home spectator preview cards.
- UTC/local timestamp policy changes.
- Notification rival-name and ranked/unranked context upgrades.
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

- `planning/phase-45/PLANNING-BRIEF.md`
- `planning/specs/phase-45/PHASE-45-SOLO-CLOUD-PROGRESS-BOUNDARIES-AND-MOBILE-FOLLOW-UP-SPEC-2026-07-04.md`
- `planning/phase-45/IMPLEMENTATION-PLAN.md`
- `planning/phase-45/CHANGELOG.md`
- `progress/PROGRESS-STEP-401.md` through `progress/PROGRESS-STEP-411.md`
- `test-results/visual-review/phase-45-stage-45-7/manifest.md` when present locally.

## Review Result

- [x] Any failed item has a follow-up prompt prepared before Phase 46 planning or additional implementation.
- [x] Manual review complete.
