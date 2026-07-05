# Phase 45 Changelog

**Status**: Ready for manual review.
**Phase**: Solo Cloud Progress Boundaries And Mobile Follow-Up.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 45 addresses the Phase 44 manual review failure around Solo Daily account boundaries. The phase keeps the repair source/test-only: current Daily Solo OG/GO no longer restore or save through unscoped browser-local Daily keys, signed-in and guest Solo progress remounts by active progress owner, and Practice Solo receives the same owner-aware persistence treatment. The phase also applies the two small manual-review follow-ups that were intentionally routed here: Profile embedded sign-in order and mobile Solo responsive scaling after a valid guess.

No Supabase migration, storage schema change, destructive local cleanup, deployment, gameplay-rule change, or Elo change was performed.

## Completed

- Processed the Phase 44 manual review failure into the Phase 45 planning brief, unified specification, implementation plan, and progress records.
- Preserved the user-updated `planning/phase-44/REVIEW-CHECKLIST.md`.
- Audited Solo account/cloud persistence and classified the Daily Solo OG/GO failure as a source/local-storage ownership issue rather than a proven Supabase/RLS contract gap.
- Recorded the Stage 45.2 source-only decision:
  - current Daily Solo OG/GO must not restore from unscoped bare browser-local Daily keys;
  - sign-in must hydrate from account-scoped progress or account-safe defaults, not guest Daily guesses;
  - sign-out must rehydrate guest-safe state;
  - existing `progress_snapshots` remains the authenticated cloud persistence path.
- Repaired current Daily Solo OG/GO persistence:
  - current Daily restores from scoped active progress resume slots;
  - current Daily validates answer/puzzle compatibility before restoring;
  - visible Daily game surfaces remount when the active progress owner changes;
  - past Daily still uses date-keyed legacy storage behavior.
- Repaired Practice Solo/general Solo persistence:
  - Practice Solo OG/GO are keyed by active progress owner;
  - sign-in/sign-out remounts cannot keep prior-owner one-shot resume state alive;
  - guest local play and authenticated account-specific seeds remain intact.
- Updated the embedded Profile/Auth sign-in surface so Email + password is first and active by default, while Magic link remains available second.
- Improved mobile Solo gameplay scaling after valid guesses:
  - added mobile-specific Solo sizing tokens;
  - kept submitted row/status and keyboard closer together after a guess;
  - ordered the keyboard before optional reveal/continue controls on mobile;
  - preserved desktop Solo density.
- Added focused tests for Daily Solo, Practice Solo, auth panel ordering, mobile Solo auto-centering, and nearby regression surfaces.
- Ran a focused Playwright regression set for live spectator, multiplayer reliability, private matchmaking, Solo GO, and mobile scroll/scaling.
- Ran the local-only visual handoff review for Phase 45 user-visible surfaces under `test-results/visual-review/phase-45-stage-45-7/`.
- Created this changelog and the Phase 45 manual review checklist.

## Preserved

- Phase 44 account-scoped local-state repairs, private Practice request eligibility behavior, sign-in modal order, header chip removal, Stats placement, Help placeholder, and keyboard-centering behavior.
- Phase 43 ranked queue fairness/current-surface cleanup, Stats/Help/About/Settings information architecture, shell/Home cleanup, Solo/Practice Multiplayer density cleanup, notifications, back-to-top behavior, and spectator comfort.
- Phase 42 public stats, admin dashboard, Help/tutorial route, Supabase/RLS grant repairs, and ranked queue flashing repair.
- Phase 41 multiplayer reliability repairs and real Supabase-backed E2E harnesses.
- Phase 40 public profile route/card, clickable safe identity, authenticated-only private Practice matchmaking, and v2 accept-contract boundaries.
- Phase 39 mobile scroll smoothness, mobile scroll/layout harness, and Word Explorer tuning.
- Phase 38 public/guest Practice Live discovery, read-only public/guest spectation, Daily spectator exclusion, and false-only mutation capability boundaries.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, and five-letter invariants.
- Existing gameplay rules, word validation, Hard Mode validation, scoring, timeout, forfeit, rating/Elo formula, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior.

## Deferred

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

## Verification

Final verification is recorded in `progress/PROGRESS-STEP-411.md`; the Stage 45.7 gate ran focused regression coverage, the local visual handoff review, full Vitest, full Playwright E2E, `npm run test:full`, build, API typecheck, and repository hygiene checks.
