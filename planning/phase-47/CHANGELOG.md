# Phase 47 Changelog

**Status**: Ready for manual review.
**Phase**: Mobile Solo GO Visibility And Account Display Boundaries.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 47 addresses the Phase 46 manual-review follow-up failures around mobile Solo GO keyboard visibility and the follow-up concern that signed-out guest surfaces could still display data from the just-signed-out account.

The phase remained source/test-only. Mobile Solo GO now uses stricter keyboard bottom-clearance behavior for fresh entry, `New go chain`, and re-entry after submitted guesses. Signed-out guest display boundaries now guard stale authenticated sync completions and hide account-owned multiplayer projections from guest History, Leaderboard/rating summaries, Dashboard/Home attention, Active Multiplayer selectors, route attention, and notification attention.

No Supabase migration, storage schema change, deployment, one-active-session/session-lease enforcement, gameplay-rule change, or Elo change was performed.

## Completed

- Processed the Phase 46 manual-review failures into the Phase 47 planning brief, unified specification, implementation plan, and progress records.
- Preserved the user-updated `planning/phase-46/REVIEW-CHECKLIST.md`.
- Audited mobile Solo GO keyboard/viewport behavior and reproduced that older ratio-based checks were too permissive for real mobile keyboard clipping.
- Recorded the Stage 47.2 source-only decision:
  - require full mobile keyboard bottom clearance, not only partial viewport-ratio visibility;
  - cover Daily Solo GO pre-guess visibility;
  - cover Practice Solo GO `New go chain` entry;
  - cover Daily/Practice Solo GO re-entry after submitted guesses;
  - naturally cover OG re-entry risk through the same bounded Solo keyboard-entry target when applicable;
  - avoid broad mobile shell/top-tab/navigation overhaul and compact side-dock work.
- Repaired mobile Solo keyboard entry and re-entry:
  - added delayed bottom-clearance correction for mobile Solo keyboard auto-centering;
  - switched Solo entry scheduling to playable-session entry/re-entry instead of fresh-zero-guess only;
  - strengthened Playwright assertions so keyboard bottom clipping fails;
  - lifted the mobile back-to-top button farther away from the Solo keyboard.
- Audited guest/account display-boundary behavior after sign-out.
- Repaired guest/account display boundaries source/test-only:
  - invalidates pending authenticated Solo sync work when auth scope changes;
  - rejects stale authenticated sync completions unless current auth state, active progress scope, and request user id still match;
  - hides account-owned competitive multiplayer rows from signed-out History;
  - hides local competitive rating summaries from signed-out Leaderboard views;
  - prevents signed-out Dashboard/Home, route attention, notification attention, and Active Multiplayer selectors from projecting stale account-owned multiplayer state.
- Added focused Vitest coverage for mobile auto-centering helpers, signed-in sync guards, History, Leaderboard, Dashboard/Home, Active Multiplayer, and notification display boundaries.
- Added focused Playwright coverage for mobile Daily/Practice Solo GO keyboard visibility and re-entry.
- Ran a local-only visual handoff review for Phase 47 user-visible surfaces under `test-results/visual-review/phase-47-stage-47-6/`.
- Created this changelog and the Phase 47 manual review checklist.

## Preserved

- Phase 46 automatic signed-in Solo sync/freshness behavior, no implicit guest-to-account Solo transfer, no authenticated progress writes to guest storage, and Solo Overview Resume-only cards.
- Phase 45 Daily/Practice Solo account-boundary repairs, Profile embedded sign-in order, and mobile Solo scaling follow-up.
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

## Verification

Final verification is recorded in `progress/PROGRESS-STEP-431.md`; the Stage 47.6 gate ran focused regression coverage, the local visual handoff review, full Vitest, full Playwright E2E, `npm run test:full`, build, API typecheck, and repository hygiene checks.
