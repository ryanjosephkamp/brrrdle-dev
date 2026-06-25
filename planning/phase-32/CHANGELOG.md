# Phase 32 Changelog

**Status**: Completed locally pending Git handoff.
**Phase**: Multiplayer stabilization, identity routing, and rating display consistency.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 32 stabilized the Phase 31 postgame and multiplayer routing work after live user testing. It kept ranked mode expansion deferred to Phase 33 and focused on gameplay-critical stabilization, safe participant identity, account avatar consistency, and no-comma rating display.

## Completed

- Planned and specified Phase 32 as a stabilization phase, rerouting ranked mode expansion / competitive ladder v2 to Phase 33.
- Added a narrow authenticated-only participant identity RPC for participant-scoped public-safe opponent display summaries.
- Stabilized Practice-only rematch lifecycle behavior so one participant request becomes visible to the opponent, decline/cancel/created states refresh visibly, and eligible unranked non-custom Practice rematch accept creates and opens a fresh safe game.
- Preserved ranked direct-rematch exclusion, Daily rematch exclusion, custom/private-code direct-rematch exclusion, nonterminal exclusion, and nonparticipant exclusion.
- Stabilized ranked Practice search-again and unranked lobby creator routing without changing trusted queue, settlement, Elo, or gameplay rules.
- Added viewer-safe opponent identity labels so opponents do not render as `You` when safe profile summaries are available.
- Fixed global account avatar accent propagation from the saved private profile accent color.
- Standardized Elo/rating display so rating-like values render without thousands separators.
- Added real two-client Supabase-backed E2E/regression coverage for the repaired rematch, ranked search-again, lobby routing, and opponent identity paths.
- Documented the Phase 32 participant identity RPC and updated progress records.

## Preserved

- Phase 31 Practice-only postgame boundaries and Daily exclusion.
- Phase 30 public leaderboard display-only authority.
- Phase 29 public profile default-private and moderation boundaries.
- Phase 28 Live spectator read-only behavior.
- Phase 27 ranked Practice trusted queue/finalization/settlement behavior.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, and five-letter UTC-day invariants.
- Existing Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five, and Practice 2-35 word-length rules.

## Deferred

- Phase 33: ranked mode expansion / competitive ladder v2, including timed Practice ranked first and Daily ranked only after claim-safety proof.
- Phase 34: public/guest spectation.
- Phase 35: theme proposal/template modernization.
- Phase 36 or later: full concrete theme implementation.
- Later social/profile polish: clickable profile names/avatars, in-game Elo identity cards, Settings Danger Zone actions, and History replay/detail views.

## Verification

Final Stage 32.7 verification is recorded in `progress/PROGRESS-STEP-256.md`.
