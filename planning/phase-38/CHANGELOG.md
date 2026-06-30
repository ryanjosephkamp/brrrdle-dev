# Phase 38 Changelog

**Status**: Completed locally pending Git handoff.
**Phase**: Public/Spectator Readiness.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 38 added privacy-safe public/guest Practice Live discovery and read-only spectation. It created the public spectator SQL/RLS projection, hardened a pre-existing Daily claim RPC anonymous grant before source integration, wired signed-out and guest Live spectator views through strict parser allowlists, preserved authenticated participant and spectator paths, and explicitly deferred spectator presence/count/list work until a later dedicated privacy/RLS design.

## Completed

- Planned and specified Phase 38 around public/spectator readiness, public/guest Live discovery, migration/RLS gates, sanitized projections, read-only capability boundaries, and spectator presence routing.
- Preserved existing user edits to `planning/phase-37/REVIEW-CHECKLIST.md`.
- Audited authenticated Live spectator seams, signed-out/guest Live behavior, public profile RLS/RPC patterns, participant identity boundaries, current Daily filtering, and spectator presence risks.
- Created the Phase 38 public spectator migration/RLS addendum.
- Added dedicated public spectator RPC `get_public_live_v1_spectator_games_v1(integer, integer, text)` for sanitized Practice Multiplayer Live projection rows.
- Kept the public spectator projection separate from authenticated spectator and participant identity RPCs.
- Granted the public spectator RPC to `anon` and `authenticated` without adding direct table grants.
- Preserved current Daily Multiplayer exclusion from public/guest spectator output.
- Limited public spectator payloads to safe game display/progress/outcome data, active public profile summaries where safe, and false-only read-only capability flags.
- Blocked forbidden raw identity, private profile, answer, seed, session, projection, queue, rating, token, screenshot, video, trace, auth state, and local-artifact fields from public spectator payloads.
- Found and fixed a pre-existing Daily claim RPC anonymous-execution grant before public/guest source integration proceeded.
- Preserved authenticated/internal trusted Daily claim behavior after anonymous claim RPC execution was revoked.
- Added source-only public/guest Live discovery and read-only focused spectation through the Stage 38 projection.
- Kept authenticated participant resume and authenticated spectator paths intact.
- Updated Live, Multiplayer workspace, Dashboard, and notification copy for public/guest read-only spectation.
- Added focused parser, repository, view-model, component, dashboard, notification, and browser-history regression coverage.
- Hardened the real-browser Live spectator E2E so one real Practice match verifies authenticated spectator and public signed-out spectator read-only behavior.
- Ran the spectator presence/count/list gate and deferred both identity-bearing lists and aggregate counts because Phase 38 has no authoritative, privacy-safe presence/count/list contract.
- Ran local visual handoff review for Phase 38 public/guest and authenticated Live spectator surfaces.
- Added the Phase 38 manual review checklist.

## Preserved

- Phase 37 browser history, stale selected-game fallbacks, gameplay auto-centering, and solo invalid-guess sound behavior.
- Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior.
- Phase 35 Profile/auth behavior, ranked Live identity repair, authenticated spectator safe-name support, auth redirect hardening, password-change access, and email-change configuration gate documentation.
- Phase 34 Live/Lobby/notification behavior and Active Games turn cues.
- Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections.
- Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections.
- Phase 31 Practice-safe postgame behavior and Daily exclusions.
- Phase 30 public leaderboard display-only authority and privacy boundaries.
- Phase 29 public profile default-private and moderation boundaries.
- Phase 28 authenticated Live read-only spectator behavior.
- Phase 27 trusted ranked Practice foundations.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, and five-letter invariants.
- Existing scoring, timeout, forfeit, rating/Elo formula, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, Practice 2-35 word-length behavior, gameplay rules, and Elo algorithm.

## Deferred

- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/social profile browsing, clickable rival profiles, social/profile pages for other players, direct player match requests, private custom-code matchmaking expansion, and request/mailbox flows.
- Public site stats and private developer dashboard.
- Beginner onboarding/help/tutorial implementation.
- EXP, coin, and collectible header/HUD counters.
- Focus Mode or collapsible primary navigation.
- Theme modernization.
- Service workers, push subscriptions, background push, production deployment, and release.
- Gameplay-rule changes and Elo algorithm changes.

## Verification

Final Stage 38.6 verification is recorded in `progress/PROGRESS-STEP-320.md`.
