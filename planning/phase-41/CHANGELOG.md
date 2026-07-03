# Phase 41 Changelog

**Status**: Ready for manual review.
**Phase**: Multiplayer Reliability And Real E2E Hardening.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 41 reroutes the roadmap into a multiplayer reliability macro-phase based on the Phase 40 manual review notes. It strengthens real Supabase-backed E2E coverage, repairs ranked Practice queue/search-again reliability, improves public ranked leaderboard freshness, cleans up private Practice request lifecycle and routing behavior, and preserves mobile Multiplayer freshness without broadening product scope.

The phase remained source/test-only after audit. No migration/RLS addendum was required.

## Completed

- Processed Phase 40 manual review follow-up issues and created the Phase 41 reliability strategy intake, planning brief, unified spec, and implementation plan.
- Preserved the user-edited `planning/phase-40/REVIEW-CHECKLIST.md`.
- Audited ranked Practice queue/search-again, cancelled/stale queue participation, public ranked leaderboard freshness, private Practice request lifecycle/routing, mobile Multiplayer freshness, notification/routing seams, Supabase/RLS context, and current test gaps.
- Added reusable real Supabase-backed E2E harness support for three-client flows and expanded cleanup/probe support for ranked queue, private request, public leaderboard/rating, and multiplayer rows without printing secrets.
- Added `e2e/gameplay/multiplayer-reliability.spec.ts` with focused real-E2E coverage for:
  - cancelled ranked queue rows staying out of later three-client matching;
  - ranked Practice re-entry from the current request after cancellation;
  - public ranked leaderboard freshness after trusted ranked Practice settlement;
  - mobile Practice request cancel/decline lifecycle list freshness on route re-entry;
  - private request acceptance routing and public ranked leaderboard access without raw identifier exposure.
- Repaired ranked Practice queue/search-again behavior so stale cancelled/expired/non-active queue request ids are cleared, current-request context survives recoverable errors, and fresh ranked queue/search-again requests do not reuse stale client state.
- Repaired public ranked leaderboard freshness by adding a source-only freshness key from trusted settlement rating metadata and reloading the display-only public leaderboard when that key changes.
- Repaired private Practice request active-list cleanup so cancelled, declined, expired, accepted, and terminal rows no longer remain active.
- Improved requester-side accepted-game routing so requesters can open/resume the created participant-owned game without manual game selection.
- Repaired mobile Practice Multiplayer freshness by refreshing participant-owned multiplayer state on route entry, browser focus, and visibility changes.
- Updated the testing suite documentation to include Phase 38 through Phase 41 public/guest spectator, private matchmaking, multiplayer reliability, and mobile scroll/layout E2E coverage.
- Added narrow Stage 41.7 E2E stability hardening:
  - selected Daily Multiplayer joins now retry through one reload if the embedded selected-game surface is stale;
  - ranked Practice search-again E2E row waits use a targeted longer timeout under full-suite resource pressure while keeping the same exact users/mode/scope/status contract.
- Ran Codex-assisted manual-review preflight and visual handoff review for Phase 41 user-visible surfaces.
- Created this changelog and the Phase 41 manual review checklist.

## Preserved

- Phase 40 public profile route/card and clickable safe identity integration.
- Phase 40 authenticated-only direct unranked Practice private matchmaking contracts and v2 accept-contract repair boundaries.
- Phase 39 mobile scroll smoothness, mobile scroll/layout harness, and Word Explorer tuning.
- Phase 38 public/guest Practice Live discovery, read-only public/guest spectation, Daily spectator exclusion, and false-only mutation capability boundaries.
- Phase 37 browser history, stale selected-game fallbacks, gameplay auto-centering, and solo invalid-guess sound behavior.
- Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior.
- Phase 35 Profile/auth behavior, ranked Live identity repair, authenticated spectator safe-name support, auth redirect hardening, password-change access, and email-change configuration gate documentation.
- Phase 34 Live/Lobby/notification behavior and Active Games turn cues.
- Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections.
- Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections.
- Phase 31 postgame boundaries; direct rematches and private requests remain Practice-only and do not bypass ranked queue or Daily claim rules.
- Phase 30 public leaderboard display-only authority and privacy boundaries.
- Phase 29 public profile default-private and moderation boundaries.
- Phase 28 authenticated Live read-only spectator behavior.
- Phase 27 trusted ranked Practice foundations.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, and five-letter invariants.
- Existing gameplay rules, word validation, Hard Mode validation, scoring, timeout, forfeit, rating/Elo formula, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior.

## Deferred

- Public site stats, private developer dashboard, onboarding, help, and tutorial UX.
- EXP, coin, collectible, or progression HUD counters.
- Focus Mode, compact navigation, and broader mobile UX shell overhaul.
- Theme proposal modernization and full concrete theme work.
- Full mailbox or notification-center redesign.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Ranked private invitations, ranked direct challenges, Daily match requests, and Daily custom invitations.
- Service workers, push subscriptions, background push, production deployment, and release.
- Gameplay-rule changes and Elo algorithm changes.

## Verification

Final verification is recorded in `progress/PROGRESS-STEP-358.md`; the Stage 41.7 gate passed focused regression coverage, full Vitest, full Playwright E2E, `npm run test:full`, build, API typecheck, visual handoff review, and repository hygiene checks.
