# Phase 48 Changelog

**Status**: Ready for manual review.
**Phase**: Profile And Multiplayer Contract Simplification.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 48 simplifies current-player profile/account-management surfaces and resolves several multiplayer contract routing questions while preserving protected backend, Daily, ranked, and privacy boundaries.

The phase stayed source/test-only except for documentation and the private Daily/ranked Daily addendum. Profile and Settings now separate private current-player controls from opt-in public profile controls more clearly, with Settings as the clear home for account-management actions such as Sign out. New custom-code game creation is hidden because it does not currently have a meaningful supported player-facing role, while legacy custom-code games remain readable and unrated. Private Daily and ranked Daily remain deferred behind a protected contract addendum because they affect Daily claim safety, answer secrecy, ranked/unranked separation, trusted settlement, and competitive integrity.

The late Phase 47 real-mobile scroll-lag note was handled as a narrow mobile Solo auto-scroll follow-up. Mobile Solo keyboard entry now avoids redundant smooth scrolling while preserving the Phase 47 keyboard bottom-clearance repairs.

No Supabase migration, storage schema change, deployment, private Daily implementation, ranked Daily implementation, session lease, server-authoritative Daily implementation, gameplay-rule change, or Elo change was performed.

## Completed

- Processed the clean Phase 47 manual review result into the Phase 48 planning brief, unified specification, implementation plan, and progress records.
- Preserved the user-updated `planning/phase-47/REVIEW-CHECKLIST.md`.
- Classified the late real-mobile scroll-lag observation as a narrow source-only auto-scroll regression candidate, not broad mobile shell/performance work.
- Repaired the narrow mobile Solo auto-scroll lag candidate by making mobile Solo keyboard `scrollIntoView` immediate while preserving non-mobile smooth scrolling and existing delayed bottom-clearance corrections.
- Audited profile, public profile, private/current-player profile metadata, Settings account-management, public ranked leaderboard display fields, participant identity summaries, and private Practice request profile summaries.
- Recorded the Stage 48.2 source-only decision:
  - keep private/current-player auth metadata unchanged;
  - keep opt-in public profile RPC/table fields unchanged;
  - keep public leaderboard profile display fields unchanged;
  - keep participant identity and private Practice request summaries unchanged;
  - use UI grouping/copy/placement to clarify the existing model;
  - require addendum planning before stored model, RPC payload, RLS/grant, visibility/moderation, public leaderboard, participant identity, private match, or public/private field consolidation changes.
- Implemented Profile/Settings clarity:
  - separated private current-player account profile controls from opt-in public profile controls;
  - removed Sign out from the Profile editor flow;
  - kept Settings Account management as the home for Sign out, password, sync, progress export/reset, and gated account actions;
  - clarified private avatar upload versus public avatar URL responsibilities;
  - de-emphasized public flair copy without changing payloads or contracts.
- Audited custom-code/custom-private game entry points and decided source-only cleanup was safe.
- Hid new custom-code game creation while preserving legacy custom-code game readability, unrated classification, parser/storage compatibility, and existing private Practice request behavior.
- Mapped legacy custom-code Practice postgame setup to the supported unranked Practice setup path instead of reopening hidden custom-code creation.
- Audited private Daily and ranked Daily feasibility against Daily claim safety, answer secrecy, UTC-day boundaries, ranked/unranked separation, trusted queue/finalization/settlement authority, leaderboard exposure, and Elo boundaries.
- Created `planning/specs/phase-48/PHASE-48-PRIVATE-DAILY-AND-RANKED-DAILY-CONTRACT-ADDENDUM-2026-07-06.md` to keep private Daily and ranked Daily behind a protected future gate.
- Added focused Vitest coverage for mobile auto-centering helpers, Profile/Settings clarity, and custom-code/private game cleanup.
- Ran a local-only visual handoff review for Phase 48 user-visible surfaces under `test-results/visual-review/phase-48-stage-48-6/`.
- Created this changelog and the Phase 48 manual review checklist.

## Preserved

- Phase 47 mobile Solo GO keyboard visibility and guest/account display-boundary repairs.
- Phase 46 automatic signed-in Solo sync/freshness, no implicit guest-to-account transfer, no authenticated progress writes to guest storage, and Solo Overview Resume-only cards.
- Phase 45 Daily/Practice Solo account-boundary repairs, Profile embedded sign-in order, and mobile Solo scaling follow-up.
- Phase 44 account-scoped local-state repairs, private Practice request eligibility behavior, sign-in modal order, header chip removal, Stats placement, Help placeholder, and keyboard-centering behavior.
- Phase 43 ranked queue fairness/current-surface cleanup, Stats/Help/About/Settings information architecture, shell/Home cleanup, Solo/Practice Multiplayer density cleanup, notifications, back-to-top behavior, and spectator comfort.
- Phase 42 public stats, admin dashboard, Help/tutorial route, Supabase/RLS grant repairs, and ranked queue flashing repair.
- Phase 41 multiplayer reliability repairs and real Supabase-backed E2E harnesses.
- Phase 40 public profile route/card, clickable safe identity, authenticated-only private Practice matchmaking, and v2 accept-contract boundaries.
- Phase 39 mobile scroll smoothness, mobile scroll/layout harness, and Word Explorer tuning.
- Phase 38 public/guest Practice Live discovery, read-only public/guest spectation, Daily spectator exclusion, and false-only mutation capability boundaries.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, five-letter invariants, and unrated Daily behavior.
- Existing gameplay rules, word validation, Hard Mode validation, scoring, timeout, forfeit, rating/Elo formula, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior.

## Deferred

- Private Daily implementation.
- Ranked Daily implementation.
- Server-authoritative Daily submissions.
- Strict one-active-session/session leases, heartbeats, forced sign-out, and remote invalidation.
- Stored profile model consolidation, public profile RPC/table changes, RLS/grant changes, and profile moderation/visibility contract changes.
- Removing stored legacy `customGameCode` support or deleting custom lobby compatibility.
- New invitation, inbox, social, or notification delivery contracts.
- Broad mobile shell, top-tab, route navigation, side-dock, and mobile performance overhaul.
- Configurable Home widgets and private request inbox widgets.
- Live, Active Games, and Home spectator preview cards.
- UTC/local timestamp policy changes.
- Notification redesign, rival-name context, and ranked/unranked notification context upgrades.
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

Final verification is recorded in `progress/PROGRESS-STEP-442.md`; the Stage 48.6 gate ran focused regression coverage, the local visual handoff review, full Vitest, full Playwright E2E, `npm run test:full`, build, API typecheck, and repository hygiene checks.
