# Phase 44 Changelog

**Status**: Ready for manual review.
**Phase**: Account-Scoped Local State And Manual Review Follow-Up.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 44 addresses the Phase 43 manual review follow-up that carried real account-boundary risk: signed-in and guest local state could bleed across sign-in/sign-out, and guest progress could be treated too eagerly as account progress. The phase adds account-scoped local progress ownership, tightens sign-out and sync hydration boundaries, repairs private Practice request requester eligibility messaging, classifies the ranked queue fairness follow-up, and applies the small UI follow-ups routed from manual review.

The phase also finishes the requested gameplay keyboard centering follow-up and final-hardens the changed areas with focused regression coverage, visual handoff evidence, and a new manual checklist. It did not change gameplay rules, scoring, Daily claims, public/guest spectator contracts, ranked settlement authority, or Elo math.

## Completed

- Processed the Phase 43 manual review notes into the Phase 44 planning brief, unified specification, implementation plan, and progress records.
- Preserved the user-updated `planning/phase-43/REVIEW-CHECKLIST.md`.
- Audited account and guest persistence boundaries across local progress, auth hydration, sign-out, sync, History, Settings, Stats, Leaderboard/rating summaries, Active Multiplayer projections, and route state.
- Added account-scoped progress ownership helpers so:
  - authenticated progress is not saved into guest local storage;
  - sign-out rehydrates guest-safe state;
  - account-derived selected-game and profile-dependent projections are cleared when appropriate;
  - guest progress is not silently uploaded or merged into an authenticated account without a reviewed transfer path;
  - ordinary guest local play and authenticated account sync remain intact.
- Added focused account-boundary regression coverage for Practice Solo OG/GO, Daily Solo OG/GO, History, Settings, Stats, Leaderboard/rating summaries, Active Multiplayer projections, and sync behavior.
- Repaired the private Practice request eligibility follow-up source-only:
  - active public requester profiles can send unranked private Practice requests without ranked Elo;
  - missing, hidden, suspended, or unnamed requester profiles get clearer active-public-profile messaging;
  - raw account identifiers and private fields remain hidden.
- Classified the ranked Practice third-player fairness behavior as covered by the Phase 43 ranked queue fairness migration contract.
- Applied small manual-review UI follow-ups:
  - Email + password is the first/default sign-in method and Magic link remains second;
  - ordinary-page global header mode/stat chips are removed;
  - Help is reduced to a non-mutating under-construction placeholder;
  - public live-site stats are moved below local stats content with the heading outside the bordered metric panel.
- Added solo gameplay keyboard centering after valid submitted guesses so the keyboard area is brought back into view without changing gameplay semantics.
- Final-hardened the live spectator E2E setup helper to wait for either the visible multiplayer status message or the durable selected-game waiting state.
- Ran focused regression coverage for account/guest boundaries, private Practice request eligibility, ranked queue classification, sign-in order, header chip removal, Stats placement, Help placeholder, gameplay keyboard centering, public/guest spectator non-regression, Daily/ranked/gameplay/Elo non-regression, Phase 42 stats/dashboard/help contracts, Phase 41 multiplayer reliability, and Phase 39 mobile scroll preservation.
- Ran the local-only visual handoff review for Phase 44 user-visible surfaces under `test-results/visual-review/phase-44-stage-44-6/`.
- Created this changelog and the Phase 44 manual review checklist.

## Preserved

- Phase 43 ranked queue fairness migration behavior, current-surface UX cleanup, notification comfort, back-to-top behavior, spectator comfort, and gameplay validation spacing.
- Phase 42 public stats, admin dashboard, Help/tutorial route, Supabase/RLS grant repairs, and ranked queue flashing repair.
- Phase 41 multiplayer reliability repairs and real Supabase-backed E2E harnesses.
- Phase 40 public profile route/card, clickable safe identity, authenticated-only private Practice matchmaking, and v2 accept-contract boundaries.
- Phase 39 mobile scroll smoothness, mobile scroll/layout harness, and Word Explorer tuning.
- Phase 38 public/guest Practice Live discovery, read-only public/guest spectation, Daily spectator exclusion, and false-only mutation capability boundaries.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, and five-letter invariants.
- Existing gameplay rules, word validation, Hard Mode validation, scoring, timeout, forfeit, rating/Elo formula, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior.

## Deferred

- Live, Active Games, and Home spectator preview cards.
- Configurable Home widgets and private request inbox widgets.
- UTC/local timestamp policy changes.
- Notification rival-name and ranked/unranked context upgrades.
- Profile/public-profile data-contract simplification.
- Admin queue/lobby observability dashboard.
- Full social inbox/mailbox work and full notification-center redesign.
- Rich tutorial media and full Help rebuild.
- EXP, coin, collectible, progression HUD, Focus Mode, compact navigation, and broader mobile shell overhaul.
- Theme proposal modernization and full concrete theme work.
- Draw-by-repetition or other gameplay-rule changes.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Service workers, push subscriptions, background push, production deployment, and release.
- Elo algorithm changes.

## Verification

Final verification is recorded in `progress/PROGRESS-STEP-400.md`; the Stage 44.6 gate ran focused regression coverage, full Vitest, full Playwright E2E, `npm run test:full`, build, API typecheck, visual handoff review, and repository hygiene checks.
