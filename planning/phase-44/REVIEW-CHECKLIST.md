# Phase 44 Manual Review Checklist

**Status**: Manual review complete with one failed follow-up item.
**Phase**: Phase 44 - Account-Scoped Local State And Manual Review Follow-Up.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-04.
**Evidence**: `planning/phase-44/CHANGELOG.md`, `progress/PROGRESS-STEP-400.md`, and local-only visual manifest `test-results/visual-review/phase-44-stage-44-6/manifest.md` when present.

This checklist helps the user manually verify Phase 44 behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment.
- Do not paste or record secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, tokens, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Codex-Assisted Preflight Summary

Automated proof completed:

- Focused Vitest regression coverage for Phase 44 changed surfaces.
- Focused Playwright regression coverage for private matchmaking, multiplayer reliability, live spectator behavior, Solo GO/Daily GO, and mobile scroll/overflow.
- `npm run lint`.
- `npm run test`.
- `npm run test:e2e`.
- `npm run test:full`.
- `npm run build` with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.
- Repository hygiene checks recorded in `progress/PROGRESS-STEP-400.md`.

Codex visual/browser review:

- Local-only visual captures under `test-results/visual-review/phase-44-stage-44-6/`.
- Captured representative Home, Stats, Help, sign-in modal, Solo mobile keyboard, and mobile Stats surfaces.

Codex intentionally did not verify:

- Production deployment or release behavior.
- Real user private data or real user accounts.
- Vercel/Supabase configuration changes.
- Spectator presence/count/list behavior, service workers, push subscriptions, gameplay-rule changes, or Elo algorithm changes.

## Manual Review Update

Manual review completed on 2026-07-04. Phase 44 passed overall except for the Daily Solo OG/GO account-boundary item below. User-provided mobile screenshots in the review chat also confirmed two follow-up observations: Solo keyboard auto-scroll works but mobile gameplay scaling can push the submitted guess offscreen, and the Profile page's embedded guest sign-in panel still uses the old Magic link first order. The screenshots are review evidence only and are not committed repository artifacts.

## Must Manually Verify

- [x] Account and guest progress stay separated.
  - Expected: after signing out, the app shows guest-safe Practice/Daily/History/Settings/Stats state rather than the prior signed-in account's local progress.
  - Suggested steps: with safe test state, sign in, inspect or create visible Practice Solo and local stats/history state, sign out, then inspect Solo, History, Settings, Stats, Leaderboard/rating summaries, and Active Multiplayer surfaces.
  - Manual review result: passed for the reviewed non-Daily surfaces. The remaining Daily Solo OG/GO cross-browser account-boundary failure is tracked in the dedicated failed Daily item below.
  - Evidence: `progress/PROGRESS-STEP-396.md`; `progress/PROGRESS-STEP-400.md`.

- [x] Guest progress does not silently overwrite or upload into a signed-in account.
  - Expected: ordinary guest local play still works, but signing in does not silently treat guest local progress as account-owned progress without a reviewed transfer path.
  - Suggested steps: create safe guest Practice progress, sign in to a safe test account, and confirm account-owned progress/sync remains distinct.
  - Manual review result: passed for the reviewed non-Daily surfaces. The remaining Daily Solo OG/GO browser-local carryover failure needs immediate Phase 45 investigation before the account/local-state boundary can be treated as fully complete.
  - Evidence: `progress/PROGRESS-STEP-396.md`; focused account-scoped tests.

- [ ] Daily Solo OG/GO account boundaries are protected.
  - Expected: guest Daily state does not carry into a signed-in account as account-owned Daily progress, and signed-in Daily state does not remain visible after sign-out.
  - Suggested steps: inspect Daily Solo OG/GO before and after sign-in/sign-out with safe non-secret state.
  - Manual review result: failed. In two separate browser profiles, guest Daily Solo OG/GO guesses carried into the same signed-in account after sign-in, and signed-in Daily guesses remained visible as guest progress after sign-out. The behavior suggests browser-local Daily progress is still being treated as the active signed-in or signed-out state instead of loading an account-owned cloud state for authenticated users and a separate guest-safe state for guests.
  - Phase 45 routing: deep audit and repair Daily Solo OG/GO account boundaries immediately, including cross-browser signed-in cloud persistence, sign-in hydration, sign-out rehydration, and no implicit guest-to-account transfer. Consider whether all Solo Daily/Practice progress needs a clearer cloud-backed authenticated persistence contract.
  - Evidence: `progress/PROGRESS-STEP-396.md`; `progress/PROGRESS-STEP-400.md`.

- [x] Private Practice requests work for active public profiles without requiring Elo.
  - Expected: an active public requester profile can send an unranked private Practice request even if ranked Elo is not established; missing/private/hidden/suspended/unnamed requester profiles receive a clear active-public-profile requirement message.
  - Suggested steps: use safe test accounts and public profile pages; do not record raw auth IDs or emails.
  - Evidence: `progress/PROGRESS-STEP-397.md`; focused private request tests.

- [x] Ranked Practice fairness behavior remains intact.
  - Expected: the Phase 43 ranked queue fairness contract still prefers a compatible non-recent opponent when one exists while allowing a recent rematch when it is the only compatible queued option.
  - Suggested steps: rely on safe E2E/probe evidence or safe test accounts; do not inspect or expose raw identifiers.
  - Evidence: `progress/PROGRESS-STEP-397.md`; `progress/PROGRESS-STEP-400.md`.

- [x] Sign-in modal defaults to Email + password first.
  - Expected: Email + password is the first and active sign-in method; Magic link remains available as the second option.
  - Suggested steps: open the sign-in modal from a signed-out state and inspect method order.
  - Manual review result: modal passed. Follow-up found the Profile page's embedded guest sign-in panel still shows Magic link first and Email + password second; apply the same ordering there in Phase 45 if safe.
  - Evidence: `progress/PROGRESS-STEP-398.md`; visual review manifest.

- [x] Global header mode/stat chips are removed from ordinary pages.
  - Expected: pages no longer show the Daily/Practice/GO Chain/Banks chip deck in the global header area; page content still has route context and actions.
  - Suggested steps: inspect Home, Multiplayer, Stats, Help, Settings, and Profile.
  - Evidence: `progress/PROGRESS-STEP-398.md`; visual review manifest.

- [x] Stats public-site snapshot placement is clearer.
  - Expected: local Stats content appears first, and the Public Site Stats section has its heading outside the bordered metric panel.
  - Suggested steps: open Stats on desktop and mobile; confirm no horizontal overflow.
  - Evidence: `progress/PROGRESS-STEP-398.md`; visual review manifest.

- [x] Help is intentionally a placeholder.
  - Expected: Help no longer duplicates route buttons or tutorial content; it shows a concise under-construction message for a later phase.
  - Suggested steps: open Help and confirm the placeholder is clear and non-mutating.
  - Evidence: `progress/PROGRESS-STEP-398.md`; visual review manifest.

- [x] Solo gameplay keyboard centering is improved after a valid guess.
  - Expected: after a valid Solo OG or Solo GO guess, the gameplay viewport brings the keyboard area back into view without changing game rules or keyboard semantics.
  - Suggested steps: on a narrow/mobile viewport, start Solo Practice OG and GO games, submit a valid guess, and watch the post-guess viewport position.
  - Manual review result: passed. Follow-up: on mobile, the Solo gameplay surface appears too large/zoomed in compared with Multiplayer, and the post-guess scroll can place the submitted first guess above the visible viewport while showing the full keyboard. Route this as a mobile gameplay responsive-scaling follow-up, not as a failure of the keyboard-centering mechanic itself.
  - Evidence: `progress/PROGRESS-STEP-399.md`; `progress/PROGRESS-STEP-400.md`.

- [x] Live spectator and public/guest spectator boundaries remain read-only.
  - Expected: public/guest spectator views remain read-only and do not expose join, resume, submit, claim, forfeit, rating, or private identity controls.
  - Suggested steps: open a safe eligible Practice Live spectator view as signed-out or guest.
  - Evidence: `progress/PROGRESS-STEP-400.md`.

- [x] Phase 39 mobile scroll smoothness remains intact.
  - Expected: Home, Multiplayer, Stats, Leaderboard, Settings, Help, About, and other long routes scroll smoothly on mobile without horizontal overflow.
  - Suggested steps: use a real mobile device or a narrow viewport and scroll representative heavy surfaces.
  - Manual review result: passed. Follow-up: broader mobile navigation/top-tab ergonomics should remain deferred to a later mobile shell/layout phase; Phase 45 should only take narrow mobile scaling/playability fixes if they stay bounded.
  - Evidence: `progress/PROGRESS-STEP-400.md`; visual review manifest.

## Optional Nice-To-Check

- [x] Review the local-only visual screenshots if available.
  - Expected: each screenshot in `test-results/visual-review/phase-44-stage-44-6/manifest.md` visually matches its scenario description.

- [x] Try sign-in/sign-out more than once.
  - Expected: repeated transitions keep account and guest state scoped correctly.

- [x] Inspect Settings after sign-out and sign-in.
  - Expected: local-only controls remain usable without leaking account-owned sync/profile state to guest.

- [x] Inspect Profile/Public Profile private request messaging with safe test accounts.
  - Expected: the public-profile eligibility message is clear and does not expose private profile fields.

## Preserved Invariants To Spot-Check

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

- Live, Active Games, and Home spectator preview cards.
- Configurable Home widgets and private request inbox widgets.
- UTC/local timestamp policy changes.
- Notification rival-name and ranked/unranked context upgrades.
- Profile/public-profile data-contract simplification.
- Admin queue/lobby observability dashboard.
- Full social inbox/mailbox work and full notification-center redesign.
- Rich tutorial media and full Help rebuild.
- EXP, coin, collectible, progression HUD, Focus Mode, compact navigation, and broader mobile shell overhaul.
- Broad mobile navigation/top-tab/shell overhaul, including sticky mobile tab navigation or a redesigned mobile route layout.
- Theme proposal modernization and full concrete theme work.
- Draw-by-repetition or other gameplay-rule changes.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Service workers, push subscriptions, background push, production deployment, and release.
- Elo algorithm changes.

## Evidence

- `planning/phase-44/PHASE-44-MANUAL-REVIEW-INTAKE-AND-ROUTING-2026-07-04.md`
- `planning/phase-44/PLANNING-BRIEF.md`
- `planning/specs/phase-44/PHASE-44-ACCOUNT-SCOPED-LOCAL-STATE-AND-MANUAL-REVIEW-FOLLOW-UP-SPEC-2026-07-04.md`
- `planning/phase-44/IMPLEMENTATION-PLAN.md`
- `planning/phase-44/CHANGELOG.md`
- `progress/PROGRESS-STEP-391.md` through `progress/PROGRESS-STEP-400.md`
- `test-results/visual-review/phase-44-stage-44-6/manifest.md` when present locally.

## Review Result

- [x] Any failed item has a follow-up prompt prepared before Phase 45 planning or additional implementation.
- [x] Manual review complete.
