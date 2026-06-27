# Phase 34 Changelog

**Status**: Completed locally pending Git handoff.
**Phase**: Multiplayer Live, Lobby, notification routing, and active-game attention stabilization.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 34 stabilized the current Multiplayer Live, Lobby, notification, and Active Games surfaces. It fixed the selected Live badge readability issue, made Live cards use safe player labels consistently, added display-only ranked state labels, replaced Lobby friction with guarded one-click join, routed foreground and in-app turn notifications directly to the relevant active game when safe, and made `Your turn` active-game cards stand out accessibly.

## Completed

- Planned and specified Phase 34 around current Multiplayer Live/Lobby/notification stabilization.
- Preserved existing user edits to `planning/phase-33/REVIEW-CHECKLIST.md`.
- Audited Live, Lobby, notification, and Active Games surfaces and confirmed no Phase 34 migration/RLS addendum was required.
- Fixed selected neutral Live subtab count badge readability without reusing urgent/error badge semantics.
- Updated Live participant card labels so safe profile/public names are preferred and incorrect opponent `You` labels are avoided.
- Updated authenticated Live spectator card labels so safe player names are preferred, with generic fallbacks only when safe identity is unavailable.
- Added display-only `Ranked` and `Unranked` labels to Live cards.
- Replaced joinable Lobby row `Open to join` behavior with a direct guarded `Join` action using accessible `Join multiplayer match` copy.
- Preserved own-lobby management, signed-out blocking, Daily claim blocking, stale-row fallback, duplicate-join protection, creator auto-routing, and rematch behavior.
- Added direct-resume game targets to multiplayer `Your turn` notification action models.
- Aligned in-app notification activation and foreground browser notification clicks through the same dashboard action path.
- Routed safe notification activation to the exact Daily or Practice game surface, with fallback to Multiplayer -> Active Games when the target is stale or unavailable.
- Updated browser notification duplicate suppression to recognize selected Daily/Practice gameplay surfaces as the active exact target.
- Added visible and accessible `Your turn` cues to Active Games cards.
- Added focused tests for Live badge/card labels, Lobby one-click join, notification routing, browser-notification suppression/click handling, and Active Games turn cues.
- Ran local visual handoff review for changed Phase 34 user-visible surfaces.
- Added the Phase 34 manual review checklist.

## Preserved

- Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections.
- Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections.
- Phase 31 Practice-safe postgame behavior and Daily exclusions.
- Phase 30 public leaderboard display-only authority and privacy boundaries.
- Phase 29 public profile default-private and moderation boundaries.
- Phase 28 authenticated Live read-only spectator behavior.
- Phase 27 trusted ranked Practice foundations.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, and five-letter invariants.
- Existing scoring, timeout, forfeit, rating/Elo, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, Practice 2-35 word-length behavior, gameplay rules, and Elo algorithm.

## Deferred

- Vercel deployment protection, magic-link redirect diagnosis, Supabase auth redirect/configuration, account confirmation copy, password changes, email changes, Settings/Danger Zone completion, and account management readiness.
- Public/guest spectation, spectator presence lists/counts, and public projection expansion.
- Public profile pages, clickable player names/avatars, richer rival avatar rendering, custom avatar images, direct player match requests, custom-code private matchmaking expansion, and request/mailbox flows.
- Live card Elo/rating values, public site stats, private developer dashboard, admin analytics, onboarding/help/tutorials, theme modernization, deployments, releases, service workers, push subscriptions, gameplay-rule changes, and Elo algorithm changes.

## Verification

Final Stage 34.6 verification is recorded in `progress/PROGRESS-STEP-279.md`.
