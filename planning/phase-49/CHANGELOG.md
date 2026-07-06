# Phase 49 Changelog

**Status**: Ready for manual review.
**Phase**: Progression HUD, Focus Mode, And Mobile UX Shell Polish.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 49 adds the first shell-level progression and focus polish slice without changing storage, Supabase contracts, economy rules, gameplay rules, or Elo math.

The phase first audited progression/resource surfaces and shell/mobile constraints, then recorded a source-only decision. The implemented work adds a compact display-only Progression HUD for the active player scope and a reversible session-local Focus Mode that quiets nonessential shell chrome while preserving route recovery, Settings, Help, account controls, route attention, and gameplay access.

No Supabase migration, storage schema change, deployment, private Daily implementation, ranked Daily implementation, session lease, service worker, broad mobile shell redesign, compact side-dock implementation, gameplay-rule change, scoring change, or Elo change was performed.

## Completed

- Processed the clean Phase 48 manual review result into the Phase 49 planning brief, unified specification, implementation plan, and progress records.
- Preserved the user-updated `planning/phase-48/REVIEW-CHECKLIST.md`.
- Audited existing XP, level, coin, consumable, Pay-to-Continue, reveal-answer, Stats, Settings, History, account sync, guest/cloud progress, and visible resource surfaces.
- Recommended the first HUD subset as display-only current level, current coin balance, and compact XP progress toward the next level.
- Audited the current app shell, route rail, topbar, Back-to-top behavior, mobile route access, safe-area behavior, reduced-motion behavior, and visual density.
- Recommended Focus Mode as the first source-only shell slice and kept compact navigation as a later bounded candidate.
- Recorded the Stage 49.3 source-only decision:
  - Progression HUD may show only active-scope level, coins, and compact XP progress;
  - Focus Mode must be reversible, session-local, shell-only, and visibly recoverable;
  - route access, account controls, Settings, Help, sync/recovery access, route attention, notification safety, safe-area behavior, and reduced-motion behavior must remain protected;
  - persisted preferences, storage changes, Supabase/RLS changes, session leases, broad mobile shell redesign, compact side-dock implementation, service workers, gameplay-rule changes, and Elo changes require a later protected addendum.
- Implemented the Progression HUD first slice:
  - added a pure HUD view model derived from existing progression state and existing XP selector math;
  - added a compact `ProgressionHud` component;
  - added a dedicated shell slot for the HUD;
  - wired the HUD to the active scoped `guestProgress.progression`;
  - added focused tests for value derivation, account/guest scope, rendering, and no storage mutation.
- Implemented the Focus Mode first slice:
  - added session-local Focus Mode state in `App`;
  - added controlled Focus Mode props to `LunarSignalStage`;
  - added a visible `Focus` / `Exit focus` control with `aria-pressed` and explicit accessible labels;
  - added bounded Focus Mode shell styling that compresses nonessential chrome;
  - preserved route rail access, account controls, route attention, Settings/Help access, and Progression HUD visibility;
  - added focused shell tests for inactive rendering, active recovery behavior, route access, attention descriptions, HUD preservation, and no storage access during render.
- Ran focused regression coverage for Phase 49 shell/HUD behavior plus protected account, display-boundary, sync, mobile auto-center, and multiplayer contract surfaces.
- Ran the focused mobile layout Playwright harness, including Solo GO keyboard visibility and re-entry checks.
- Ran a local-only visual handoff review for Phase 49 user-visible surfaces under `test-results/visual-review/phase-49-stage-49-6/`.
- Created this changelog and the Phase 49 manual review checklist.

## Preserved

- Phase 48 Profile/Settings clarity, custom-code hiding/legacy handling, private Practice request preservation, and private Daily/ranked Daily protected addendum routing.
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

- Consumable inventory top-level display.
- Pay-to-Continue or reveal-answer cost context outside gameplay panels.
- New earning, spending, marketplace, inventory, collectible, monetization, or progression mechanics.
- XP formula, level curve, reward amount, coin cost, stats calculation, Daily claim, gameplay-rule, scoring, or Elo changes.
- Persisted Focus Mode or compact-shell preferences.
- Compact navigation implementation beyond the current Focus Mode slice.
- Broad mobile shell, top-tab, route navigation, side-dock, and mobile performance overhaul.
- Compact/collapsible side-dock implementation.
- Configurable Home widgets and private request inbox widgets.
- Private Daily implementation.
- Ranked Daily implementation.
- Server-authoritative Daily submissions.
- Strict one-active-session/session leases, heartbeats, forced sign-out, and remote invalidation.
- New invitation, inbox, social, or notification delivery contracts.
- Live, Active Games, and Home spectator preview cards.
- Notification redesign, rival-name context, and ranked/unranked notification context upgrades.
- Admin queue/lobby observability dashboard.
- Full social inbox/mailbox work and full notification-center redesign.
- Rich tutorial media and full Help rebuild.
- Theme proposal modernization and full concrete theme work.
- Draw-by-repetition or other gameplay-rule changes.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Service workers, push subscriptions, background push, production deployment, and release.
- Elo algorithm changes.

## Verification

Final verification is recorded in `progress/PROGRESS-STEP-452.md`; the Stage 49.6 gate ran focused regression coverage, focused mobile layout coverage, local visual handoff review, full Vitest, full Playwright E2E, `npm run test:full`, build, API typecheck, and repository hygiene checks.
