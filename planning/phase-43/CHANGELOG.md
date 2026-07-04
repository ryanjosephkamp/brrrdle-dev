# Phase 43 Changelog

**Status**: Ready for manual review.
**Phase**: Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 43 applies the user-supplied UI/UX cleanup intake to the current app surfaces without expanding into a broad redesign. It repairs ranked Practice queue fairness at the Supabase RPC layer, cleans up Stats/Help/About/Settings information architecture, removes shell/Home clutter and default-zoom horizontal overflow, reduces Solo and Practice Multiplayer density, and adds gameplay comfort improvements for validation spacing, notifications, back-to-top behavior, and spectator focus.

The phase also hardens the real multiplayer E2E harness against stale remote test artifacts discovered during final regression. It did not change gameplay rules, scoring, Daily behavior, public/guest spectator contracts, profile privacy, ranked settlement authority, or Elo math.

## Completed

- Processed the Phase 43 UI/UX and gameplay intake, screenshots, and recommendations into the Phase 43 planning brief, unified specification, implementation plan, and progress records.
- Preserved the user-updated `planning/phase-42/REVIEW-CHECKLIST.md`.
- Audited current UX surfaces and ranked queue behavior before implementation.
- Created and applied `supabase/migrations/20260703230106_phase43_ranked_queue_matching_fairness.sql`, preserving the browser-facing ranked queue RPC signature while preferring a compatible non-recent opponent when one exists.
- Updated ranked multiplayer documentation for the Phase 43 fairness behavior.
- Reworked Stats, Help, About, and Settings information architecture so:
  - local player Stats appear before public aggregate stats;
  - Help is shorter and route-oriented;
  - About owns deeper explanatory reference content;
  - Settings no longer duplicates the large Help doorway card.
- Cleaned up the app shell and Home route:
  - removed the ordinary-page right rail;
  - moved compact route metrics into the header;
  - moved manual sync access to Settings;
  - removed duplicate shell Sound and Theme controls;
  - compacted Home status/actions;
  - replaced horizontal-table Recent Results with responsive cards.
- Cleaned up Solo density:
  - compacted OG/GO mode controls;
  - removed redundant started-game metadata rows;
  - kept active controls, customization, Hard Mode, and puzzle selection intact.
- Cleaned up Practice Multiplayer density:
  - collapsed ranked Practice explanation behind a help-style disclosure;
  - collapsed empty private request content;
  - separated current Practice games from completed/inactive match history buttons.
- Added gameplay comfort updates:
  - reserved validation-message space in Solo and Multiplayer gameplay;
  - added notification center click-away and Escape dismissal;
  - added a reduced-motion-aware back-to-top control;
  - focused read-only spectator views on the existing gameplay auto-center target.
- Repaired the Stage 43.6 lint blocker by moving back-to-top helper exports into `src/app/backToTopState.ts`.
- Hardened real E2E multiplayer setup so stale `brrrdle-e2e-*` test accounts and orphaned queued ranked rows do not leak into ranked matching scenarios.
- Added focused tests for changed IA, shell/Home, Solo, Practice Multiplayer, notification, back-to-top, spectator focus, and E2E harness behavior where practical.
- Ran focused regression/E2E coverage for Phase 43 changed surfaces, Phase 42 stats/dashboard/help contracts, Phase 41 multiplayer reliability, Phase 40 public profile/private matchmaking boundaries, Phase 38 public/guest spectator behavior, and Phase 39 mobile scroll preservation.
- Ran the local-only visual handoff review for Phase 43 user-visible surfaces under `test-results/visual-review/phase-43-stage-43-7/`.
- Created this changelog and the Phase 43 manual review checklist.

## Preserved

- Phase 42 public stats, admin dashboard, Help/tutorial route, Supabase/RLS grant repairs, and ranked queue flashing repair.
- Phase 41 multiplayer reliability repairs and real Supabase-backed E2E harnesses.
- Phase 40 public profile route/card, clickable safe identity, authenticated-only private Practice matchmaking, and v2 accept-contract boundaries.
- Phase 39 mobile scroll smoothness, mobile scroll/layout harness, and Word Explorer tuning.
- Phase 38 public/guest Practice Live discovery, read-only public/guest spectation, Daily spectator exclusion, and false-only mutation capability boundaries.
- Phase 37 browser history, stale selected-game fallbacks, gameplay auto-centering, and solo invalid-guess sound behavior.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, and five-letter invariants.
- Existing gameplay rules, word validation, Hard Mode validation, scoring, timeout, forfeit, rating/Elo formula, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior.

## Deferred

- Profile/data-contract simplification.
- Configurable Home widgets.
- Custom-code private Daily, ranked Daily, ranked private invitations, direct ranked challenges, Daily match requests, and Daily custom invitations.
- Full social inbox/mailbox work and full notification-center redesign.
- Rich tutorial media.
- EXP, coin, collectible, progression HUD, Focus Mode, compact navigation, and broader mobile shell overhaul.
- Theme proposal modernization and full concrete theme work.
- Draw-by-repetition or other gameplay-rule changes.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Service workers, push subscriptions, background push, production deployment, and release.
- Elo algorithm changes.

## Verification

Final verification is recorded in `progress/PROGRESS-STEP-390.md`; the Stage 43.7 gate ran focused regression coverage, full Vitest, full Playwright E2E, `npm run test:full`, build, API typecheck, visual handoff review, and repository hygiene checks.
