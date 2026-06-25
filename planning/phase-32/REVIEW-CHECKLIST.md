# Phase 32 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 32 - Multiplayer stabilization, identity routing, and rating display consistency.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-25.
**Evidence**: `planning/phase-32/CHANGELOG.md`, `progress/PROGRESS-STEP-256.md`, `progress/PROGRESS-STEP-257.md`, and local-only visual manifest `test-results/visual-review/phase-32-stage-32-8/manifest.md` when present.

This checklist helps the user manually verify Phase 32 behavior. It does not replace automated tests, real two-client E2E, migration/RLS probes, or the visual handoff review gate.

## How To Use

- Use a safe development/test environment with non-production accounts.
- Do not paste or record secrets, tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Must Manually Verify

- [ ] Global account avatar accent follows the saved private profile accent.
  - Expected: after changing `Your profile` -> `Accent color` and pressing `Save`, the top-of-page account avatar chip updates to the saved private accent color.
  - Suggested steps: sign in, open `Your profile`, choose a non-green accent such as Violet or Rose, save, then inspect the account chip visible at the top/right of the app shell.
  - Evidence: `progress/PROGRESS-STEP-255.md`; visual scenario `Global account avatar accent follows saved private profile accent`.

- [ ] One-player Practice rematch request appears to the opponent.
  - Expected: when one player requests a rematch from a completed eligible Practice Multiplayer game, the opponent sees a rival-requested rematch state with `Accept rematch` and `Decline` controls without needing to request a rematch themselves.
  - Suggested steps: finish an unranked non-custom Practice OG game in two signed-in browser contexts, request rematch from player one, then inspect player two's terminal game screen.
  - Evidence: `progress/PROGRESS-STEP-253.md`, `progress/PROGRESS-STEP-256.md`; visual scenario `One-player rematch request appears to opponent`.

- [ ] Eligible unranked non-custom Practice rematch accept creates and opens a fresh safe rematch game.
  - Expected: accepting a rematch for a completed five-letter Practice OG game with Hard Mode off and no clock opens a new unranked Practice game for both participants with the same safe settings and same seats.
  - Suggested steps: from the opponent rematch prompt, press `Accept rematch`; confirm both participants move into a new playing game rather than seeing an unsafe-rematch error.
  - Evidence: `progress/PROGRESS-STEP-253.md`, `progress/PROGRESS-STEP-256.md`; visual scenario `Eligible rematch accept opens a fresh Practice game`.

- [ ] Rematch decline, cancel, and created states visibly synchronize.
  - Expected: declining updates the requester, cancelling clears the opponent prompt, and already-created/idempotent rematch state opens or points to the created game rather than duplicating games.
  - Suggested steps: run one decline flow and one cancel or already-created flow from terminal Practice game screens, then confirm both clients show the updated state after visible refresh/polling.
  - Evidence: `progress/PROGRESS-STEP-253.md`, `progress/PROGRESS-STEP-256.md`; visual scenario `Rematch decline synchronizes to requester`.

- [ ] Ranked Practice search-again routes the queued creator into the finalized game.
  - Expected: if player one clicks ranked Practice search-again first and waits, player one automatically opens the finalized ranked game once player two joins the compatible queue; no manual `Check ranked queue` click is required.
  - Suggested steps: finish or use a terminal ranked Practice game in two contexts, have player one search again, then have player two search again; confirm both clients open the new ranked game.
  - Evidence: `progress/PROGRESS-STEP-254.md`, `progress/PROGRESS-STEP-256.md`; visual scenario `Ranked search-again routes creator and preserves safe opponent identity`.

- [ ] Unranked lobby creator auto-routes when a rival joins.
  - Expected: when a creator opens an unranked lobby and a rival joins it, the creator is moved into the joined game unless they deliberately selected an unrelated active game that should not be stolen.
  - Suggested steps: from a terminal Practice context, open a new unranked lobby with player one, join with player two, then confirm player one opens the joined game.
  - Evidence: `progress/PROGRESS-STEP-254.md`, `progress/PROGRESS-STEP-256.md`; visual scenario `Unranked lobby creator auto-routes when rival joins`.

- [ ] Opponent labels use safe profile/public identity and do not show the opponent as `You`.
  - Expected: the local viewer may be labeled `You`, but the opponent never appears as `You`; when safe public profile data is available, the opponent label uses that safe name.
  - Suggested steps: create or use two signed-in players with public profile names, enter a multiplayer game, and inspect each player's view of the opponent label.
  - Evidence: `progress/PROGRESS-STEP-254.md`, `progress/PROGRESS-STEP-256.md`; visual scenarios for ranked search-again and unranked lobby identity.

- [ ] Generic `Rival` appears only as a fallback when safe identity is unavailable.
  - Expected: `Rival` may appear only when no safe public/profile identity can be resolved; it should not appear for opponents with safe available profile summaries.
  - Suggested steps: compare one game with public profile names available and one private/no-public-profile case if convenient.
  - Evidence: `planning/specs/phase-32/PHASE-32-PARTICIPANT-IDENTITY-RLS-ADDENDUM-2026-06-24.md`, `progress/PROGRESS-STEP-254.md`.

- [ ] Public leaderboard Elo/rating values render without commas.
  - Expected: public ranked leaderboard rating values show as `1200` or `1220`, not `1,200` or `1,220`.
  - Suggested steps: open the public ranked Practice leaderboard and inspect the rating column.
  - Evidence: `progress/PROGRESS-STEP-255.md`; visual scenario `Public ranked leaderboard rating display omits thousands separators`.

- [ ] Multiplayer rating surfaces render Elo/rating values without commas.
  - Expected: Competitive multiplayer rating buckets and similar multiplayer rating surfaces show rating-like values without thousands separators.
  - Suggested steps: open the Stats tab, review Competitive multiplayer rating buckets, and confirm ratings are formatted like `1201`, not `1,201`.
  - Evidence: `progress/PROGRESS-STEP-255.md`; visual scenario `Multiplayer rating display omits thousands separators`.

- [ ] Phase 32 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-32-stage-32-8/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-32-stage-32-8/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `progress/PROGRESS-STEP-257.md`.

## Optional Nice-To-Check

- [ ] Review the Phase 32 visual screenshots if the local artifact directory is available.
  - Expected: each screenshot in `test-results/visual-review/phase-32-stage-32-8/manifest.md` should visually match its scenario description.

- [ ] Try the main Phase 32 flows on a narrow/mobile viewport.
  - Expected: rematch controls, account badge, rating rows, and multiplayer labels remain readable and do not overlap.

## Preserved Invariants To Spot-Check

- [ ] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, and five-letter only.
- [ ] Phase 31 postgame boundaries remain intact: direct rematches are Practice-only and do not apply to Daily, ranked direct-rematch, custom/private-code direct-rematch, nonterminal, or nonparticipant cases.
- [ ] Phase 30 public leaderboards remain display-only and non-authoritative.
- [ ] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [ ] Phase 28 Live spectator behavior remains read-only.
- [ ] Phase 27 ranked Practice behavior still uses trusted queue/finalization/settlement paths.
- [ ] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.

## Known Deferred / Not In Scope

- Phase 33: ranked mode expansion / competitive ladder v2, including timed Practice ranked first and Daily ranked only after claim-safety proof.
- Phase 34: public/guest spectation.
- Phase 35: theme proposal/template modernization.
- Phase 36 or later: full concrete theme implementation.
- Later social/profile polish: clickable profile names or avatars, in-game Elo identity cards, Settings Danger Zone actions, and History replay/detail views.
- Service workers, push subscriptions, deployment/release work, Elo algorithm changes, and gameplay-rule changes were not part of Phase 32.

## Review Result

- [ ] Manual review complete.
- [ ] Any failed item has a follow-up prompt prepared before Phase 33 planning or additional implementation.
