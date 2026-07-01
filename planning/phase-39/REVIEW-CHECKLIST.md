# Phase 39 Manual Review Checklist

**Status**: Ready for manual review.
**Phase**: Phase 39 - Mobile Performance And Scroll Smoothness.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-01.
**Evidence**: `planning/phase-39/CHANGELOG.md`, `progress/PROGRESS-STEP-330.md`, `progress/PROGRESS-STEP-331.md`, and local-only visual manifest `test-results/visual-review/phase-39-stage-39-5/manifest.md` when present.

This checklist supports manual user review after the Phase 39 final verification gate. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment.
- Do not paste or record secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, tokens, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Must Manually Verify

- [ ] Mobile route scrolling feels smoother on current complex pages.
  - Expected: Home, Multiplayer, Settings, and Word Explorer scroll vertically without obvious stutter, horizontal overflow, or content being covered by fixed/sticky shell controls.
  - Suggested steps: on a narrow/mobile viewport or real mobile device, open Home, Multiplayer, Settings, and Words; scroll from top to bottom and back; confirm route headings, navigation buttons, and main controls remain reachable.
  - Evidence: `progress/PROGRESS-STEP-327.md`; `progress/PROGRESS-STEP-328.md`; `progress/PROGRESS-STEP-329.md`; visual scenarios `Mobile Home shell`, `Mobile Multiplayer route`, `Mobile Settings long scroll surface`, and `Mobile Word Explorer top`.

- [ ] Word Explorer mobile rows remain usable after row tuning.
  - Expected: Words shows readable mobile row cards with working `Define` and `Copy` actions, no horizontal overflow, and no obvious repeated heavy button shadows.
  - Suggested steps: open Words on mobile, scroll into the word list, inspect several rows, and use `Define` or `Copy` on a safe sample word if desired.
  - Evidence: `progress/PROGRESS-STEP-329.md`; visual scenario `Mobile Word Explorer mid-scroll rows after row shadow tuning`.

- [ ] Desktop/tablet Word Explorer table remains intact.
  - Expected: wider viewports still show the Word Explorer table layout with filter, pagination, row actions, and content alignment preserved.
  - Suggested steps: open Words on a desktop-width viewport, confirm the table appears, change filters or page size if desired, and confirm the mobile-only tuning did not replace the table.
  - Evidence: `progress/PROGRESS-STEP-329.md`; visual scenario `Desktop Word Explorer table remains intact after mobile-only tuning`.

- [ ] Gameplay input and mobile keyboard behavior still feel normal.
  - Expected: the on-screen keyboard remains sticky on mobile, key taps remain responsive, and normal gameplay input, delete, enter, valid submits, and invalid-submit behavior are not visually or mechanically changed.
  - Suggested steps: play a safe Practice OG or GO game on mobile, type/delete a guess, submit a valid guess, and optionally submit an invalid guess.
  - Evidence: `progress/PROGRESS-STEP-328.md`; Phase 37 sound/navigation evidence in `progress/PROGRESS-STEP-309.md`.

- [ ] Public/guest Live spectation still works read-only.
  - Expected: signed-out or guest viewers can still see eligible public Practice Live rows and focused spectator details, with no join/resume/submit/forfeit/mutation actions exposed.
  - Suggested steps: with a safe eligible Practice Live game available, open Multiplayer -> Live as a signed-out or guest viewer and inspect the list/detail path.
  - Evidence: `progress/PROGRESS-STEP-318.md`; final focused Live spectator E2E evidence in `progress/PROGRESS-STEP-330.md`; clean final verification in `progress/PROGRESS-STEP-331.md`.

- [ ] Browser Back/Forward and gameplay auto-centering still behave as expected.
  - Expected: app route/tab/subtab navigation and selected-game view state remain safe, and entering/resuming gameplay still scrolls/focuses the gameplay area where appropriate without replaying moves or mutating state.
  - Suggested steps: navigate between several main tabs, use browser Back/Forward, and resume a safe game if available.
  - Evidence: Phase 37 evidence in `progress/PROGRESS-STEP-308.md`; final focused regression evidence in `progress/PROGRESS-STEP-330.md`; clean final verification in `progress/PROGRESS-STEP-331.md`.

- [ ] Phase 39 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-39-stage-39-5/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-39-stage-39-5/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `progress/PROGRESS-STEP-330.md`; `progress/PROGRESS-STEP-331.md`.

## Optional Nice-To-Check

- [ ] Compare mobile scrolling in a normal browser tab and in split-screen or low-resource conditions.
  - Expected: normal conditions should be smoother; resource-constrained conditions may still be slower, but content should remain usable and reachable.

- [ ] Try Word Explorer search, length, difficulty, and page-size controls on mobile.
  - Expected: controls remain reachable and do not introduce horizontal overflow or layout overlap.

- [ ] Review the Phase 39 visual screenshots if the local artifact directory is available.
  - Expected: each screenshot in `test-results/visual-review/phase-39-stage-39-5/manifest.md` visually matches its scenario description.

- [ ] Spot-check a desktop route after the mobile-only visual effect reductions.
  - Expected: desktop shell and panels should still retain the intended richer lighting/shadow style where applicable.

## Preserved Invariants To Spot-Check

- [ ] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.
- [ ] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, five-letter only, and excluded from public/guest spectator discovery.
- [ ] Phase 27 ranked Practice still uses trusted queue/finalization/settlement paths.
- [ ] Phase 28 authenticated Live spectator behavior remains read-only.
- [ ] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [ ] Phase 30 public leaderboards remain display-only and non-authoritative.
- [ ] Phase 31 postgame boundaries remain intact: direct rematches are Practice-only and do not bypass ranked queue or Daily claim rules.
- [ ] Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections remain intact.
- [ ] Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections remain intact.
- [ ] Phase 34 Live/Lobby/notification behavior and Active Games turn cues remain intact.
- [ ] Phase 35 Profile/auth behavior, ranked Live identity repair, authenticated spectator safe-name support, auth redirect hardening, password-change access, and email-change configuration gate documentation remain intact.
- [ ] Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior remain intact.
- [ ] Phase 37 browser history, stale selected-game fallbacks, gameplay auto-centering, and solo invalid-guess sound behavior remain intact.
- [ ] Phase 38 public/guest Practice Live discovery, read-only public spectation, Daily spectator exclusion, and false-only mutation boundaries remain intact.

## Known Deferred / Not In Scope

- Broad mobile UX overhaul.
- Compact navigation and collapsible shell navigation.
- Focus Mode.
- EXP, coin, collectible, or progression HUD counters.
- Public/social profile browsing, clickable rival profiles, direct player match requests, private matchmaking expansion, custom-code invitation expansion, and request/mailbox flows.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public site stats, private developer dashboard, onboarding, help, and tutorial UX.
- Theme modernization and full concrete theme work.
- Service workers, push subscriptions, background push, production deployment, and release.
- Gameplay-rule changes and Elo algorithm changes.

## Evidence

- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`
- `planning/phase-39/PLANNING-BRIEF.md`
- `planning/specs/phase-39/PHASE-39-MOBILE-PERFORMANCE-AND-SCROLL-SMOOTHNESS-SPEC-2026-07-01.md`
- `planning/phase-39/IMPLEMENTATION-PLAN.md`
- `planning/phase-39/CHANGELOG.md`
- `progress/PROGRESS-STEP-321.md` through `progress/PROGRESS-STEP-331.md`
- `e2e/layout/mobile-scroll.spec.ts`
- `test-results/visual-review/phase-39-stage-39-5/manifest.md` when present locally.

## Review Result

- [ ] Manual review complete.
- [ ] Any failed item has a follow-up prompt prepared before Phase 39 Git handoff or additional implementation.
