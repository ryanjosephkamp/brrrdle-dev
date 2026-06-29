# Phase 36 Changelog

**Status**: Completed locally pending Git handoff.
**Phase**: Leaderboard, Stats, Active Games, And Settings.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 36 added a first-class Leaderboard route, kept Stats focused on local/personal gameplay statistics, repaired Active Games safe-name display, and cleaned up Settings/password-update copy. It preserved the public ranked leaderboard as display-only and privacy-safe, kept all rating/gameplay rules unchanged, and completed final regression, E2E, and visual review gates.

## Completed

- Planned and specified Phase 36 around Leaderboard/Stats navigation split, Active Games identity repair, Settings order/consolidation, and password-copy cleanup.
- Preserved existing user edits to `planning/phase-35/REVIEW-CHECKLIST.md`.
- Audited route/navigation ownership, Stats/Leaderboard content ownership, Active Games identity inputs, Settings order, and password-update failure copy.
- Repaired Active Games safe-name behavior source-only by wiring existing safe `participantProfilesByGameId` data into Active Games row selection.
- Ensured Active Games prefers safe public/profile names from creator and joined-player perspectives when available.
- Kept `You` limited to the current viewer's own participant context and generic `Rival`, `Player one`, and `Player two` labels as true fallbacks only.
- Added a first-class `Leaderboard` main tab between `Stats` and `Words`.
- Moved public ranked Practice leaderboard content from Stats into the new Leaderboard route.
- Moved competitive multiplayer rating content from Stats into the new Leaderboard route.
- Kept local/personal gameplay stats, history, streaks, XP, and coin trend content in Stats.
- Preserved public ranked leaderboard bucket limits and display-only/non-authoritative boundaries.
- Reordered Settings sections to Gameplay, Sound effects, Notifications, Account management.
- Changed the Settings heading from `Sound Effects` to `Sound effects`.
- Consolidated signed-in email, sign-out, Profile tab routing, password-change access, email-change gate copy, cloud sync, local guest progress, and danger-zone account/persistence copy under Account management.
- Replaced reset-link wording in signed-in password-update failure paths with password-update-specific copy.
- Added focused tests for Active Games safe-name mapping, route order, Leaderboard/Stats content placement, public leaderboard boundaries, Settings order/consolidation, and password-update copy.
- Ran local visual handoff review for changed Phase 36 user-visible surfaces.
- Added the Phase 36 manual review checklist.

## Preserved

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

- Gameplay auto-scroll to center the board after entering, joining, or resuming a game, routed to Phase 37.
- Browser back/forward in-app navigation integration, routed to Phase 37.
- Public/guest spectation, spectator presence lists/counts, spectator sorting, and public projection expansion.
- Public profile browsing, clickable rival profiles, social/profile pages for other players, direct player match requests, private matchmaking/custom-code expansion, and request/mailbox flows.
- Public site stats and private developer dashboard.
- Beginner onboarding/help/tutorial implementation.
- Theme modernization.
- Service workers, push subscriptions, background push, production deployment, and release.
- Gameplay-rule changes and Elo algorithm changes.

## Verification

Final Stage 36.5 verification is recorded in `progress/PROGRESS-STEP-300.md`.
