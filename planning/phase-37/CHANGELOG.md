# Phase 37 Changelog

**Status**: Completed locally pending Git handoff.
**Phase**: Navigation And Gameplay Ergonomics.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 37 improved gameplay-entry ergonomics, browser navigation behavior, and solo invalid-guess sound consistency. It added source-only gameplay auto-centering, view-state-only browser back/forward support, and a solo OG/GO invalid-guess sound repair that matches the existing multiplayer cue. Final hardening also tightened browser-history validation so waiting multiplayer lobbies remain valid selected-game states while stale or terminal selected games still fall back safely.

## Completed

- Planned and specified Phase 37 around gameplay entry/resume auto-centering, browser back/forward view-state integration, and solo invalid-guess sound consistency.
- Preserved existing user edits to `planning/phase-36/REVIEW-CHECKLIST.md`.
- Audited route state, selected game state, Solo/Multiplayer entry and resume flows, dashboard/notification routing, gameplay layout anchors, browser-history feasibility, and solo/multiplayer invalid-guess sound paths.
- Repaired solo OG invalid submissions so validation failures play the distinct `invalid-guess` cue instead of being masked by a generic keyboard/submit cue.
- Repaired solo GO invalid submissions with the same invalid-guess cue behavior.
- Preserved valid solo submit cues, correct-guess cues, keyboard input sounds, sound toggle behavior, Web Audio fallback behavior, Hard Mode validation, and word-list validation.
- Added a source-only gameplay auto-centering helper and stable solo/multiplayer gameplay anchors.
- Wired auto-centering from safe Solo entry, Solo resume, signed-in auto-resume, Multiplayer active-game resume, Lobby join, direct game selection, notification/dashboard routing, ranked finalization, and postgame rematch/play-again flows where a gameplay surface exists.
- Kept gameplay auto-centering best-effort and browser-only, with safe no-op behavior when no gameplay anchor exists.
- Added source-only browser-history view-state serialization for route, Solo subtab, Multiplayer subtab, selected Solo game, selected Multiplayer game, focused Live spectator game, and History filters.
- Added `popstate` handling that applies view state only and does not replay gameplay, join, claim, queue, notification, account, or persistence mutations.
- Added stale selected-game fallbacks for Solo, Multiplayer, and focused Live spectator state.
- Preserved waiting Multiplayer lobbies as valid selected-game states when the viewer can join or cancel them, while terminal Multiplayer selections still fall back to Active Games.
- Updated E2E helpers for the current one-click Lobby join flow.
- Ran local visual handoff review for Phase 37 user-visible surfaces.
- Added the Phase 37 manual review checklist.

## Preserved

- Phase 36 Leaderboard/Stats split, Active Games safe names, Settings section order/consolidation, and password-copy behavior.
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

- Upper gameplay information condensation/collapse.
- EXP, coin, and collectible header/HUD counters.
- Focus Mode or collapsible primary navigation.
- Public/guest spectation, spectator presence lists/counts, spectator sorting, and public projection expansion.
- Public profile browsing, clickable rival profiles, social/profile pages for other players, direct player match requests, private custom-code matchmaking expansion, and request/mailbox flows.
- Public site stats and private developer dashboard.
- Beginner onboarding/help/tutorial implementation.
- Theme modernization.
- Service workers, push subscriptions, background push, production deployment, and release.
- Gameplay-rule changes and Elo algorithm changes.

## Verification

Final Stage 37.5 verification is recorded in `progress/PROGRESS-STEP-309.md`.
