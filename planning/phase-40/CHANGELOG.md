# Phase 40 Changelog

**Status**: Ready for manual review.
**Phase**: Public Profiles And Private Matchmaking.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 40 adds safe public profile viewing and authenticated-only private Practice matchmaking while preserving the privacy, spectator, ranked queue, Daily, gameplay, and Elo boundaries from prior phases.

The phase stayed audit-first and addendum-gated. Public profile pages and clickable identity remained source-only on existing safe public profile RPCs. Direct private Practice requests required new authenticated-only Supabase contracts, plus a follow-up v2 accept repair so browser payloads never need raw auth IDs.

## Completed

- Planned and specified Phase 40 as a cohesive public profiles and private matchmaking macro-phase under the phase scope sizing guide.
- Preserved the checked-off user-edited `planning/phase-39/REVIEW-CHECKLIST.md`.
- Audited public profile, public ranked leaderboard identity, participant identity, public/guest spectator identity, custom lobby, rematch, notification, routing, browser-history, Supabase/RLS, and E2E surfaces.
- Created and reviewed the Stage 40.2 migration/RLS addendum for direct unranked Practice private match requests.
- Created and applied one additive private match request migration:
  - `supabase/migrations/20260701221500_phase40_private_match_requests.sql`
  - authenticated-only request create/list/cancel/decline/accept RPCs;
  - no direct browser table grants;
  - Practice-only, unranked-only, active-public-profile-targeted requests;
  - current Daily, ranked, rating, queue, custom-code lobby, spectator, and profile mutation exclusions.
- Created and reviewed the Stage 40.5A accept-contract repair addendum.
- Created and applied one additive v2 accept-contract repair migration:
  - `supabase/migrations/20260701232434_phase40_private_match_accept_contract_repair.sql`
  - `accept_private_multiplayer_match_request_v2(text, jsonb, text default null)`;
  - browser execution revoked from the v1 accept RPC;
  - browser-supplied `playerUserIds` rejected;
  - requester/opponent raw auth IDs derived server-side from the locked request row;
  - canonical `playerUserIds` injected into stored game projections server-side.
- Added a hidden public profile route using safe `public_profile_id` navigation state only.
- Added public profile page/card rendering with private/hidden/suspended/missing/unavailable fallbacks.
- Added strict public profile parser allowlists and forbidden-field defenses.
- Added clickable public ranked leaderboard names/avatars only where approved `publicProfileId` data exists.
- Preserved non-clickable safe labels where approved public profile IDs are unavailable.
- Added strict private match request parser allowlists and forbidden-field defenses.
- Added repository methods for creating, listing, cancelling, declining, and accepting private match requests.
- Added authenticated public profile page action for sending a private unranked Practice OG request.
- Added Practice Multiplayer incoming/outgoing private request list with accept, decline, and cancel actions.
- Routed accepted private matches through the returned `created_game_id` and participant-owned multiplayer repository reads.
- Added a safe private match game projection helper and v2 accept payload behavior that omits `playerUserIds`.
- Added focused component/domain/repository tests for public profile route/clickable identity and private match lifecycle behavior.
- Added a two-client Playwright E2E covering public-profile request creation, incoming request visibility, v2 accept, created-game routing, participant-owned load/open behavior, and raw identity/projection leakage guards.
- Updated Supabase documentation for the new private matchmaking contracts.

## Preserved

- Phase 39 mobile scroll smoothness, mobile scroll/layout harness, and Word Explorer tuning.
- Phase 38 public/guest Practice Live discovery, read-only public/guest spectation, Daily spectator exclusion, and false-only mutation capability boundaries.
- Phase 37 browser history, stale selected-game fallbacks, gameplay auto-centering, and solo invalid-guess sound behavior.
- Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior.
- Phase 35 Profile/auth behavior, ranked Live identity repair, authenticated spectator safe-name support, auth redirect hardening, password-change access, and email-change configuration gate documentation.
- Phase 34 Live/Lobby/notification behavior and Active Games turn cues.
- Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections.
- Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections.
- Phase 31 postgame boundaries; direct rematches and direct private requests remain Practice-only and do not bypass ranked queue or Daily claim rules.
- Phase 30 public leaderboard display-only authority and privacy boundaries.
- Phase 29 public profile default-private and moderation boundaries.
- Phase 28 authenticated Live read-only spectator behavior.
- Phase 27 trusted ranked Practice foundations.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, and five-letter invariants.
- Existing gameplay rules, word validation, Hard Mode validation, scoring, timeout, forfeit, rating/Elo formula, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior.

## Deferred

- Ranked private invitations, ranked direct challenges, Daily match requests, and Daily custom invitations.
- Public site stats, private developer dashboard, onboarding, help, and tutorial UX.
- EXP, coin, collectible, or progression HUD counters.
- Focus Mode, compact navigation, and broader mobile UX shell overhaul.
- Theme proposal modernization and full concrete theme work.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Service workers, push subscriptions, background push, production deployment, and release.
- Gameplay-rule changes and Elo algorithm changes.

## Verification

Final verification is recorded in `progress/PROGRESS-STEP-346.md`; the Stage 40.6 gate passed cleanly with focused regression coverage, full Vitest, full Playwright E2E, build, API typecheck, visual handoff review, and repository hygiene checks.
