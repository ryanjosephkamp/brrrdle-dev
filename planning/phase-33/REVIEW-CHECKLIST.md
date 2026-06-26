# Phase 33 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 33 - Competitive ladder v2 readiness.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-26.
**Evidence**: `planning/phase-33/CHANGELOG.md`, `progress/PROGRESS-STEP-270.md`, and local-only visual manifest `test-results/visual-review/phase-33-stage-33-7/manifest.md` when present.

This checklist helps the user manually verify Phase 33 behavior. It does not replace automated tests, real two-client E2E, migration/RLS probes, or the visual handoff review gate.

## How To Use

- Use a safe development/test environment with non-production accounts.
- Do not paste or record secrets, tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Must Manually Verify

- [ ] Ranked Practice offers only `No clock` and `5 minutes` as ranked time controls.
  - Expected: after selecting `Ranked` in Practice Multiplayer, the time-control dropdown is labeled `Ranked time control` and contains only `No clock` and `5 minutes`.
  - Suggested steps: sign in, open Multiplayer -> Practice Multiplayer, switch Match type to `Ranked`, and inspect the time-control dropdown.
  - Evidence: `progress/PROGRESS-STEP-269.md`; visual scenario `Timed ranked Practice controls`.

- [ ] The `5 minutes` ranked option enters the timed ranked queue.
  - Expected: selecting `5 minutes` changes the main action to `Enter timed ranked queue`; pressing it creates a timed ranked queue request and shows timed ranked queue copy.
  - Suggested steps: choose `Ranked` and `5 minutes`, press `Enter timed ranked queue`, and confirm a waiting queue state appears.
  - Evidence: `progress/PROGRESS-STEP-269.md`, `progress/PROGRESS-STEP-270.md`.

- [ ] Two signed-in players can match into a canonical timed ranked Practice game.
  - Expected: two compatible players entering the `5 minutes` ranked queue route into the same durable ranked Practice game with `5:00` clocks visible for both players.
  - Suggested steps: use two signed-in browser contexts, have both enter Practice ranked `5 minutes`, and confirm both clients open the same active game.
  - Evidence: `progress/PROGRESS-STEP-270.md`; real two-client E2E scenario `matches canonical timed ranked Practice and search-again preserves the five-minute track`.

- [ ] Timed ranked games use a separate timed rating track.
  - Expected: timed ranked games are labeled separately from untimed ranked Practice and use timed ranked buckets internally; public leaderboards do not show timed buckets in Phase 33.
  - Suggested steps: inspect a timed ranked game's visible copy and public leaderboard surfaces; confirm the public leaderboard still shows only OG/GO untimed ranked Practice buckets.
  - Evidence: `planning/specs/phase-33/PHASE-33-TIMED-RANKED-MIGRATION-RLS-ADDENDUM-2026-06-25.md`, `progress/PROGRESS-STEP-268.md`, `progress/PROGRESS-STEP-270.md`.

- [ ] Timed ranked postgame search-again preserves the five-minute track through the trusted queue.
  - Expected: after a terminal timed ranked Practice game, `Search ranked Practice again` queues another canonical five-minute timed ranked match and opens the next finalized game for both players.
  - Suggested steps: finish a timed ranked Practice game, press `Search ranked Practice again` from both clients, and confirm the next game also shows `5:00` clocks.
  - Evidence: `progress/PROGRESS-STEP-270.md`; real two-client E2E scenario `matches canonical timed ranked Practice and search-again preserves the five-minute track`.

- [ ] Untimed ranked Practice still works.
  - Expected: choosing `No clock` keeps the current untimed ranked Practice queue/finalization/search-again behavior unchanged.
  - Suggested steps: choose ranked Practice `No clock`, enter the queue with two users, and confirm the finalized game has no clock.
  - Evidence: existing Phase 32 ranked search-again E2E plus Phase 33 regression tests in `progress/PROGRESS-STEP-270.md`.

- [ ] Unsupported ranked timers are unavailable or rejected.
  - Expected: ranked Practice does not offer 30 seconds, 1 minute, 2 minutes, 10 minutes, or 30 minutes; only unranked Practice keeps the broader timer options.
  - Suggested steps: compare unranked Practice timer options to ranked Practice timer options.
  - Evidence: `progress/PROGRESS-STEP-269.md`.

- [ ] Daily ranked remains unavailable.
  - Expected: Daily Multiplayer does not expose ranked queue controls, ranked time controls, or search-again ranked shortcuts.
  - Suggested steps: open Daily Multiplayer and confirm there is no ranked Match type flow.
  - Evidence: `planning/phase-33/CHANGELOG.md`, `progress/PROGRESS-STEP-270.md`.

- [ ] Ranked custom/private-code games remain unavailable.
  - Expected: Custom code Practice games remain unrated and do not expose direct ranked/private-code ladder behavior.
  - Suggested steps: choose Custom code in Practice Multiplayer and confirm ranked queue controls are not active for that custom flow.
  - Evidence: `planning/phase-33/CHANGELOG.md`, `progress/PROGRESS-STEP-270.md`.

- [ ] Public ranked leaderboard defaults to OG and no longer shows `All buckets`.
  - Expected: the public ranked leaderboard player-facing controls show `OG` and `GO` only, with `OG` selected by default.
  - Suggested steps: open Stats/public ranked leaderboard and inspect the bucket controls.
  - Evidence: `progress/PROGRESS-STEP-267.md`; visual scenario `Public ranked leaderboard OG/GO controls`.

- [ ] Public leaderboard rows show display-only rank bands.
  - Expected: public leaderboard rows include descriptive rank bands such as Bronze, Silver, Gold, etc., and no copy implies bands affect Elo or matchmaking.
  - Suggested steps: open the public ranked leaderboard and inspect the rank/band labels.
  - Evidence: `progress/PROGRESS-STEP-267.md`; visual scenario `Public ranked leaderboard rank bands`.

- [ ] Multiplayer rating bucket surfaces show display-only rank bands.
  - Expected: Stats/Competitive multiplayer rating buckets include rank bands derived from current rating while preserving no-comma rating display.
  - Suggested steps: open Stats and inspect Competitive multiplayer rating buckets.
  - Evidence: `progress/PROGRESS-STEP-267.md`.

- [ ] Phase 33 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-33-stage-33-7/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-33-stage-33-7/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `progress/PROGRESS-STEP-270.md`.

## Optional Nice-To-Check

- [ ] Review the Phase 33 visual screenshots if the local artifact directory is available.
  - Expected: each screenshot in `test-results/visual-review/phase-33-stage-33-7/manifest.md` should visually match its scenario description.

- [ ] Try the ranked controls and leaderboard on a narrow/mobile viewport.
  - Expected: ranked time-control copy, rank bands, and OG/GO leaderboard controls remain readable and do not overlap.

## Preserved Invariants To Spot-Check

- [ ] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, and five-letter only.
- [ ] Phase 32 rematch lifecycle, queue/lobby routing, opponent identity labels, account avatar accent propagation, no-comma rating display, and two-client E2E protections remain intact.
- [ ] Phase 31 postgame boundaries remain intact: direct rematches are Practice-only and do not apply to Daily, ranked direct-rematch, custom/private-code direct-rematch, nonterminal, or nonparticipant cases.
- [ ] Phase 30 public leaderboards remain display-only and non-authoritative.
- [ ] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [ ] Phase 28 Live spectator behavior remains read-only.
- [ ] Phase 27 ranked Practice still uses trusted queue/finalization/settlement paths.
- [ ] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.

## Known Deferred / Not In Scope

- Daily ranked.
- Ranked custom/private-code games.
- Public timed ranked leaderboards.
- Public/guest spectation.
- Vercel deployment protection, Supabase auth redirect/configuration, account confirmation copy, password/email management, and related auth/deployment readiness work.
- Beginner onboarding, help, walkthrough, and tutorial UX.
- Service workers, push subscriptions, production deployment/release work, broad social/profile browsing, theme work, gameplay-rule changes, and Elo algorithm changes.

## Review Result

- [ ] Manual review complete.
- [ ] Any failed item has a follow-up prompt prepared before Phase 33 Git handoff or additional implementation.
