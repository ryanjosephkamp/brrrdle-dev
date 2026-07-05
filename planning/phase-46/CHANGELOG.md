# Phase 46 Changelog

**Status**: Ready for manual review.
**Phase**: Solo Sync Integrity And Manual Review Follow-Up.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 46 addresses the Phase 45 manual review follow-up around signed-in Solo Daily/Practice sync freshness, same-account stale browser state, the low-value Solo Overview active-game `Select` control, and mobile Solo pre-guess keyboard visibility.

The phase keeps the main repair source/test-only and uses the existing `progress_snapshots` contract. It adds automatic authenticated Solo sync and safe refresh behavior, removes the active Solo `Select` action after confirming it had no meaningful standalone function, and improves mobile pre-guess keyboard alignment for Solo Daily/Practice without changing gameplay rules.

No Supabase migration, storage schema change, destructive local cleanup, deployment, gameplay-rule change, Elo change, one-active-session lease, or stable `brrrdle` repository work was performed.

## Completed

- Processed the Phase 45 manual review notes into the Phase 46 planning brief, unified specification, implementation plan, and progress records.
- Preserved the user-updated `planning/phase-45/REVIEW-CHECKLIST.md`.
- Audited signed-in Solo sync and session freshness across local active progress, `progress_snapshots`, manual sync, sign-in hydration, sign-out rehydration, route/cache state, resume slots, and merge behavior.
- Recorded the Stage 46.2 source-only decision:
  - existing `progress_snapshots` can support the Stage 46 automatic sync repair;
  - no storage-contract, Supabase/RLS, RPC, revision/locking, server-authoritative Daily, destructive cleanup, broad sync replacement, or one-session lease addendum was required;
  - one-active-session enforcement remains deferred as a later optional session-lease/security feature unless future evidence proves it necessary.
- Added source-only authenticated Solo sync/freshness behavior:
  - signed-in active progress changes schedule debounced cloud sync;
  - manual `Sync now` remains available as a recovery/control path;
  - focus, visibility restore, and Solo route-entry refresh can load authenticated cloud progress only when no signed-in upload is pending or in flight;
  - stale automatic sync results are ignored when newer local signed-in work exists.
- Preserved Phase 45 guest/account boundary protections:
  - no implicit guest-to-account Solo progress transfer;
  - no authenticated progress writes to guest storage;
  - sign-out remains guest-safe.
- Audited the Solo Overview active-game `Select` button and removed it from active Solo cards because it only saved selected state, highlighted the card, and requested auto-centering without opening or mutating the game.
- Kept `Resume` as the clear primary action on active Solo cards while preserving dashboard/navigation selection behavior.
- Repaired mobile Solo pre-guess keyboard visibility:
  - added a mobile-only fresh Solo keyboard auto-center path for playable zero-guess OG/GO sessions;
  - kept post-guess keyboard/context alignment intact;
  - reused the dedicated Solo keyboard target;
  - increased mobile keyboard bottom scroll margin for browser chrome and safe-area clearance.
- Added focused tests for automatic sync guards, sync wrapper behavior, Solo active-card Resume-only behavior, gameplay auto-center helpers, Solo keyboard auto-centering, and mobile layout checks.
- Ran the local-only visual handoff review for Phase 46 user-visible surfaces under `test-results/visual-review/phase-46-stage-46-6/`.
- Created this changelog and the Phase 46 manual review checklist.

## Preserved

- Phase 45 Daily/Practice Solo account-boundary repairs, Profile embedded sign-in order, and mobile Solo post-guess scaling.
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

## Verification

Final verification is recorded in `progress/PROGRESS-STEP-421.md`; the Stage 46.6 gate ran focused regression coverage, the local visual handoff review, full Vitest, full Playwright E2E, `npm run test:full`, build, API typecheck, and repository hygiene checks.
