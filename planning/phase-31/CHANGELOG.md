# Phase 31 Changelog

**Status**: Phase 31 completion changelog.
**Repository**: `brrrdle-dev`
**Phase**: Practice-only multiplayer postgame actions and current-surface cleanup.

## Summary

Phase 31 adds Practice-only multiplayer postgame convenience actions and completes several current-surface polish fixes without changing gameplay rules, Elo math, Daily Multiplayer claim behavior, public profile authority, public leaderboard authority, or Live spectator behavior.

## Planning And Scope

- Created the Phase 31 planning brief, unified specification, implementation plan, and rematch migration/RLS addendum.
- Preserved the Phase 30 routing where Phase 32 remains ranked mode expansion / competitive ladder v2, Phase 33 remains public/guest spectation, Phase 34 remains theme proposal/template modernization, and Phase 35 or later remains full concrete theme work.
- Kept Phase 31 limited to Practice-only postgame actions and the approved profile, Stats, About, and rating-bucket cleanup items.

## Rematch Migration/RLS

- Added one additive Supabase migration for `public.multiplayer_practice_rematch_requests`.
- Added authenticated-only participant-scoped rematch RPCs for request, list, cancel, decline, and accept.
- Restricted direct same-opponent rematch v1 to completed unranked non-custom Practice Multiplayer games.
- Preserved ranked Practice queue/trusted settlement boundaries by keeping ranked continuation on same-settings search-again through the trusted queue path.
- Preserved Daily Multiplayer claim safety by rejecting Daily games from rematch and same-settings replay shortcuts.
- Added non-printing privacy/abuse probe coverage during the migration execution stage.

## Postgame Actions

- Added postgame domain helpers for Practice-only eligibility, same-settings extraction, rematch projection creation, ranked queue search-again signaling, and custom setup-prefill signaling.
- Added strict DTO parsing for the rematch RPC return contract and repository methods for the rematch request lifecycle.
- Added terminal Practice Multiplayer UI actions for direct unranked rematch request/cancel/decline/accept states.
- Added ranked Practice same-settings search-again through trusted queue behavior.
- Added unranked/custom same-settings play-again or setup-prefill messaging where safe.
- Kept Daily games, nonterminal games, nonparticipants, malformed games, unsupported ranked modes, and direct ranked/custom rematch cases unavailable.

## Current-Surface Cleanup

- Fixed the private profile initials-avatar preview so it follows the selected private accent when no uploaded avatar is present.
- Replaced leaking chart hidden-table `sr-only` classes with the repository's `.brrrdle-visually-hidden` helper in Stats chart components.
- Formatted the About expected-score explanation as a clearer accessible formula block without changing the Phase 27 Elo formula.
- Improved Competitive multiplayer rating-bucket copy with plainer player-facing language.
- Changed rating bucket labels to clear names such as `Ranked Practice OG` and `Ranked Practice GO`.
- Filtered rating buckets to the signed-in viewer where possible, deduped to the latest profile per user/bucket, and dropped malformed bucket rows from player-facing display.
- Removed stale player-facing copy implying public leaderboards remain deferred after Phase 30.

## Verification

Final Stage 31.7 verification is recorded in `progress/PROGRESS-STEP-245.md`.

Expected final gate:

- focused Phase 31 tests for touched source surfaces;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run test:full`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact checks;
- watched-port/process cleanup checks.

## Boundaries Preserved

- No Phase 32 ranked mode expansion.
- No public/guest spectation.
- No additional migrations beyond the one approved Phase 31 rematch migration.
- No service workers or push infrastructure.
- No Elo algorithm, K-factor, trusted settlement, rating authority, scoring, timeout, forfeit, GO transition, keyboard-state, Daily claim, Solo Daily fixed-five, or Practice 2-35 word-length rule changes.
- No deployment, release, commit, push, PR creation, merge, branch deletion, force-push, secret printing, or original stable `brrrdle` repository work during Phase 31 execution.
