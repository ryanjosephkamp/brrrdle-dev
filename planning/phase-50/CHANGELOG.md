# Phase 50 Changelog

**Status**: Review Candidate - Ready for Review Candidate Backup and manual review.
**Phase**: Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 50 repairs the completed Solo re-entry bug reported after Phase 49 manual review and adds two small current-surface conveniences that were audited as source-only and low risk.

Completed Solo Daily/Practice OG/GO games now retain the final winning row and terminal completed state across route re-entry and browser Back/Forward without double-awarding rewards. Profile now exposes separated account-management actions for Settings and Sign out while keeping Settings canonical. The Progression HUD now offers an explicit Open Stats action while remaining display-only and active-scope-owned.

No storage schema, cloud progress contract, Supabase migration, RLS/RPC/table/bucket change, deployment configuration, gameplay-rule change, reward formula change, scoring change, Elo/rating change, multiplayer feature change, Git/GitHub action, backup workflow, release, merge, or stable `brrrdle` repository work was performed.

## Completed

- Processed the clean Phase 49 manual-review result and user follow-up notes into Phase 50 planning, specification, and detailed implementation planning.
- Preserved the user-updated `planning/phase-49/REVIEW-CHECKLIST.md`.
- Reproduced the completed Solo terminal-state loss across:
  - Practice OG;
  - Practice GO;
  - Daily OG under deterministic browser time;
  - Daily GO under deterministic browser time.
- Chose and implemented a source-only completed Solo display contract:
  - `resumeSlots` remain in-progress-only;
  - `completedGameIds` remains the authoritative duplicate-reward guard;
  - App-owned session-local completed Solo display evidence restores terminal UI for the selected Solo lane;
  - completed display evidence resets across active progress-owner hydration to preserve guest/account boundaries.
- Repaired Solo Daily/Practice OG/GO route re-entry and browser Back/Forward behavior so the final winning row and completed state remain visible until the user explicitly starts the next Practice puzzle/chain or the existing Daily lifecycle changes.
- Hardened reward idempotence with browser coverage proving repeated re-entry does not duplicate completed IDs, history rows, XP, coins, stats, streak-affecting entries, or resume slots.
- Audited optional Profile and HUD conveniences and kept them bounded to existing source-only routes and handlers.
- Added separated Profile account-management actions:
  - `Open Settings account management`;
  - `Sign out`;
  - Settings remains the home for password, sync, export, reset, and broader account controls.
- Added a Progression HUD `Open Stats` action wired to the existing Stats route.
- Preserved the HUD as display-only Level, Coins, and XP progress for the active local/account progress scope.
- Recovered the final-hardening full E2E blocker by rerunning the failed ranked Practice queue reliability subset, then rerunning the full E2E suite cleanly without source/test changes.
- Ran a local-only visual handoff review for Phase 50 user-visible surfaces under `test-results/visual-review/phase-50-review-candidate/`.
- Created this changelog and the Phase 50 manual review checklist.

## Process Updates During Phase 50

- Prompt-package workflow guidance now requires a fenced markdown activation prompt whenever a prompt-package artifact is generated.
- Governance now formalizes the Review Candidate, Manual Review Window, and Review Follow-up model.
- Blocked final reports now require a practical next-step recommendation and may create a bounded recovery prompt when the recovery path is safe and agent-owned.

These workflow updates did not authorize runtime feature expansion, Git/GitHub handoff, Review Candidate Backup, Final Acceptance Backup, deployment configuration, release, merge, or stable-repository work.

## Preserved

- Phase 49 Progression HUD display-only ownership, Focus Mode boundaries, shell route recovery, mobile shell preservation, and no-storage-change decisions.
- Phase 48 Profile/Settings clarity, custom-code hiding/legacy handling, private Practice request preservation, and private Daily/ranked Daily protected addendum routing.
- Phase 47 mobile Solo GO keyboard visibility and guest/account display-boundary repairs.
- Phase 46 automatic signed-in Solo sync/freshness, no implicit guest-to-account transfer, no authenticated progress writes to guest storage, and Solo Overview Resume-only cards.
- Phase 45 Daily/Practice Solo account-boundary repairs, Profile embedded sign-in order, and mobile Solo scaling follow-up.
- Phase 44 account-scoped local-state repairs, private Practice request eligibility, sign-in modal order, header chip removal, Stats placement, Help placeholder, and keyboard-centering behavior.
- Phase 43 ranked queue fairness/current-surface cleanup, route information architecture, shell/Home cleanup, Solo/Practice Multiplayer density cleanup, notifications, back-to-top behavior, and spectator comfort.
- Phase 42 public stats, admin dashboard, Help/tutorial route, Supabase/RLS grant repairs, and ranked queue flashing repair.
- Phase 41 multiplayer reliability repairs and real Supabase-backed E2E harnesses.
- Phase 40 public profile route/card, clickable safe identity, authenticated-only private Practice matchmaking, and v2 accept-contract boundaries.
- Phase 39 mobile scroll smoothness, mobile scroll/layout harness, and Word Explorer tuning.
- Phase 38 public/guest Practice Live discovery, read-only public/guest spectation, Daily spectator exclusion, and false-only mutation capability boundaries.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, five-letter invariants, and unrated Daily behavior.
- Existing gameplay rules, answer generation, dictionary behavior, word validation, Hard Mode validation, scoring, timeout, forfeit, rating/Elo formula, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior.

## Deferred

- Review Candidate Backup, Final Acceptance Backup, PR, merge, release, deployment configuration, and production configuration changes unless separately authorized.
- Storage schema, cloud progress contract, Supabase/RLS/RPC/table/bucket, migration, and deployment-configuration changes.
- Broader resume/session contracts, one-active-session leases, server-authoritative Daily submissions, forced sign-out, remote invalidation, and session security work.
- Reward formula, XP curve, level curve, coin economy, inventory, consumable, Pay-to-Continue, reveal-answer, marketplace, monetization, stats-calculation, Daily claim, gameplay-rule, scoring, and Elo/rating changes.
- Broad Profile/public-profile model simplification, visibility/moderation contract changes, account deletion, privacy controls, top-right player-chip popover, and route-architecture changes.
- Stats redesign, cloud stats, multiplayer stats, public stats expansion, and HUD economic controls.
- Private Practice expansion, private Daily, ranked Daily, ranked direct challenges, Daily invitations, inbox/mailbox, social requests, and notification delivery contracts.
- Live identity expansion, spectator presence/count/list, spectator sorting, viewer tracking, public/guest spectation contract changes, service workers, push subscriptions, and background push.
- Broad shell redesign, compact/collapsible side dock, configurable Home widgets, top-right Daily consolidation, richer tutorial media, full Help rebuild, theme proposal modernization, and concrete theme implementation.

## Verification

Final verification is recorded in `progress/PROGRESS-STEP-467.md`.

Key Review Candidate evidence:

- Focused Phase 50 Vitest slice: 8 files, 62 tests passed.
- Focused HUD Playwright check: 1 test passed.
- Focused Solo completion Playwright check: 4 tests passed.
- `npm run lint` passed.
- `npm run test`: 126 files, 875 tests passed.
- Failed ranked Practice queue E2E subset rerun: 2 tests passed, no code change required.
- `npm run test:e2e`: 44 tests passed.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.
- Local-only visual capture: 4 Playwright capture tests passed, generating 5 screenshots and `test-results/visual-review/phase-50-review-candidate/manifest.md`.
- Final repository hygiene checks passed.

Phase 50 is now a Review Candidate for the Review Candidate Backup Loop and Manual Review Window. A separately authorized Review Candidate Backup may be used for hosted/live device review without closing the phase. Manual review acceptance, Review Follow-up if needed, Final Acceptance Backup, deployment configuration, release, merge, and stable-repository work remain unexecuted.
