# Phase 42 Changelog

**Status**: Ready for manual review.
**Phase**: Site Stats, Developer Dashboard, Onboarding, And Help.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 42 adds privacy-safe observability and beginner guidance after the Phase 41 multiplayer reliability pass. It repairs the remaining ranked Practice queue button/status flashing issue, adds public aggregate live-site stats, adds an admin-gated operational dashboard, introduces a durable Help/tutorial route, and tightens Supabase browser grant/RLS boundaries discovered during the stats/dashboard data-contract work.

The phase included reviewed migration/RLS gates for stats/dashboard RPCs and Supabase browser grants, followed by source/test integration and final visual/manual-review handoff evidence. It did not change gameplay rules, scoring, Daily behavior, public/guest spectator contracts, profile privacy, ranked settlement authority, or Elo math.

## Completed

- Processed the Phase 41 manual-review follow-up and created the Phase 42 planning brief, unified specification, implementation plan, and progress records.
- Preserved the user-updated `planning/phase-41/REVIEW-CHECKLIST.md`.
- Audited public stats, developer/admin dashboard, onboarding/help/tutorial opportunities, and the ranked Practice queue button/status flashing symptom.
- Repaired ranked Practice queue flashing by separating background ranked queue polling from visible manual-action busy state while preserving create, check, cancel, match finalization, search-again, trusted settlement, Daily exclusion, gameplay rules, and Elo math.
- Created and applied `supabase/migrations/20260703152720_phase42_site_stats_dashboard_rpc.sql` with:
  - `public.get_public_site_stats_v1()` for aggregate-only public stats;
  - `public.get_admin_operational_dashboard_v1()` for authenticated admin-only operational aggregates;
  - strict grants/revokes and non-printing probe expectations.
- Triaged and repaired pre-existing broad browser grant/RLS boundary findings:
  - created `planning/specs/phase-42/PHASE-42-SUPABASE-BROWSER-GRANT-RLS-REPAIR-ADDENDUM-2026-07-03.md`;
  - revised and applied `supabase/migrations/20260703154556_phase42_browser_grant_rls_repair.sql`;
  - removed active direct anonymous table/sequence access while preserving explicit public/authenticated RPC contracts;
  - recorded the residual `supabase_admin` future default-privilege risk as later hardening, not an active Phase 42 blocker.
- Repaired ranked result RLS recursion with `supabase/migrations/20260703160756_phase42_ranked_result_rls_recursion_repair.sql`, retargeting ranked result SELECT policies to authenticated users and removing anonymous zero-row RLS recursion.
- Added strict parser allowlists and forbidden-field defenses for public stats and admin dashboard RPC payloads.
- Added public site stats to the Stats route with aggregate-only counts and freshness timestamps.
- Added the admin operational dashboard inside the existing admin route gate, keeping anonymous and non-admin users locked out.
- Added a durable read-only Help route and a Settings-to-Help doorway.
- Added Help/tutorial guidance for current Solo, Daily, Practice, OG/GO, Hard Mode, Multiplayer, ranked Practice, Leaderboard, public profile, private Practice request, spectator, Settings, Feedback, Definitions, Stats, and History behavior.
- Added focused route/parser/component tests for queue flashing, public stats, admin dashboard, Help, and Settings doorway behavior.
- Ran focused regression/E2E coverage for Phase 42 changed surfaces, Phase 41 multiplayer reliability, Phase 40 private matchmaking, Phase 38 public/guest spectator behavior, and Phase 39 mobile scroll preservation.
- Ran the local-only visual handoff review for Phase 42 user-visible surfaces under `test-results/visual-review/phase-42-stage-42-7/`.
- Created this changelog and the Phase 42 manual review checklist.

## Preserved

- Phase 41 multiplayer reliability repairs and real Supabase-backed E2E harnesses.
- Phase 40 public profile route/card, clickable safe identity, authenticated-only private Practice matchmaking, and v2 accept-contract boundaries.
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

- EXP, coin, collectible, or progression HUD counters.
- Focus Mode, compact navigation, and broader mobile UX shell overhaul.
- Theme proposal modernization and full concrete theme work.
- Full mailbox or notification-center redesign.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Ranked private invitations, ranked direct challenges, Daily match requests, and Daily custom invitations.
- Service workers, push subscriptions, background push, production deployment, and release.
- Supabase `supabase_admin` future default-privilege ownership cleanup beyond the Stage 42 active direct-grant repair.
- Gameplay-rule changes and Elo algorithm changes.

## Verification

Final verification is recorded in `progress/PROGRESS-STEP-374.md`; the Stage 42.7 gate ran focused regression coverage, full Vitest, full Playwright E2E, `npm run test:full`, build, API typecheck, visual handoff review, and repository hygiene checks.
