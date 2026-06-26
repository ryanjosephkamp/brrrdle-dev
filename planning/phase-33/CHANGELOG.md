# Phase 33 Changelog

**Status**: Completed locally pending Git handoff.
**Phase**: Competitive ladder v2 readiness, timed Practice ranked, rank bands, and leaderboard cleanup.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 33 moved ranked multiplayer from untimed ranked Practice v1 to a safer competitive ladder v2 foundation. It added a single canonical five-minute timed ranked Practice track after explicit audit and migration/RLS gates, kept timed and untimed ratings separate, added display-only rank bands, and simplified the public ranked leaderboard by removing the player-facing `All buckets` mode.

## Completed

- Planned and specified Phase 33 as competitive ladder v2 readiness with safe ranked expansion gates.
- Routed Vercel/auth/account-management observations to a later auth/deployment readiness phase.
- Routed beginner onboarding/help to a later UX phase.
- Audited timed Practice ranked readiness and confirmed SQL/RPC/RLS addendum planning was required.
- Created and executed the timed ranked migration/RLS addendum for canonical `300000` ms timed ranked Practice.
- Added timed ranked storage/app bucket handling:
  - `async:og:timed:v1` / `async:go:timed:v1` in trusted storage.
  - `multiplayer:og:timed:v1` / `multiplayer:go:timed:v1` in app projections.
- Preserved untimed ranked Practice v1 buckets:
  - `multiplayer:og`
  - `multiplayer:go`
- Added source/domain/repository support for canonical timed ranked queue creation, matching, finalized-game projection, trusted settlement eligibility, DTO parsing, and cached rating normalization.
- Exposed the ranked Practice `5 minutes` player-facing option while keeping ranked Practice limited to `No clock` or `5 minutes`.
- Preserved all existing unranked Practice timer options.
- Added timed ranked postgame search-again through the trusted ranked queue path.
- Added display-only rank bands derived from current rounded Elo:
  - Learner, Bronze, Silver, Gold, Platinum, Diamond, Master.
- Removed the player-facing public ranked leaderboard `All buckets` view/button and defaulted the table to `OG`.
- Kept timed ranked buckets out of public leaderboards in Phase 33.
- Added focused unit/component/domain/repository coverage for rank bands, leaderboard cleanup, timed ranked bucket mapping, queue/finalization/settlement eligibility, UI affordance, and unsupported timer rejection.
- Added real two-client Supabase-backed E2E coverage for canonical timed ranked matching and timed ranked search-again.
- Ran local visual handoff review for changed user-visible ranked surfaces.
- Added the Phase 33 manual review checklist.

## Preserved

- Untimed ranked Practice v1 queue, finalization, settlement, and Elo behavior.
- Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections.
- Phase 31 Practice-only postgame boundaries and Daily exclusion.
- Phase 30 public leaderboard display-only authority.
- Phase 29 public profile default-private and moderation boundaries.
- Phase 28 Live read-only spectator behavior.
- Phase 27 trusted ranked Practice foundations.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, and five-letter invariants.
- Existing scoring, timeout, forfeit, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, Practice 2-35 word-length behavior, gameplay rules, and Elo algorithm.

## Deferred

- Daily ranked.
- Ranked custom/private-code games.
- Public timed ranked leaderboards.
- Public/guest spectation.
- Vercel deployment protection, Supabase auth redirect/configuration, account confirmation copy, password/email management, and related auth/deployment readiness work.
- Beginner onboarding, help, walkthrough, and tutorial UX.
- Service workers, push subscriptions, background push, deployment/release work, broad social/profile browsing, theme work, gameplay-rule changes, and Elo algorithm changes.

## Verification

Final Stage 33.7 verification is recorded in `progress/PROGRESS-STEP-270.md`.
