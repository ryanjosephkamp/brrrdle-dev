# Progress Step 550 - Phase 58 Post-Review Forfeit, Badge, And Notification Follow-Up

**Status:** Completed - Review Candidate prepared.
**Date:** 2026-07-12.
**Protected baseline:** Phase 58 Review Candidate on `main`/`origin/main` at `c640e395d79b384153d9a1ac8ab51687a863ab45`.

## Completed

- Reproduced the participant-forfeit persistence risk as an unacknowledged ordinary update: the optimistic domain result was correct, but a zero-row compare-and-swap could be treated as success.
- Added exact affected-row acknowledgment, canonical-row merging, and one bounded retry only for an initiating participant's forfeit. The retry re-reads durable state, derives the viewer seat from canonical participant IDs, and reapplies the existing zero-move cancellation or post-move forfeit-loss rule.
- Added a stable visible failure path. If both attempts conflict, the app reloads the durable game; if that reload also fails, it restores the prior non-terminal view rather than leaving an optimistic terminal result on screen.
- Added one generic selected attention-badge treatment with an opaque dark background and light text. Numeric and `Ready` badges share the rule; unselected tone styles remain unchanged.
- Wrapped only Notification `Open` so it collapses before delegating to the existing route action. Mark read, Mark all read, Hide, outside click, and Escape retain their intended behavior.
- Determined that current participant RLS already supports the write contract. No migration, RPC, policy, schema, or remote-state change was necessary.

## Verification

- Focused repository, Multiplayer panel, SubtabBar, and notification tests passed.
- Lint passed.
- Full unit suite: 147 files and 1,044 tests passed.
- Production build, app TypeScript, and API TypeScript passed. The implementation prompt's `api/tsconfig.json` path was stale; the canonical repository file is `tsconfig.api.json`.
- Real temporary-account focused E2E passed for fresh OG/GO forfeits, one-conflict older-compatible recovery, two-conflict visible failure, selected numeric badge contrast at desktop and 390px, and notification navigation/non-navigation behavior.
- Final fresh authority-enabled Chromium suite: 95/95 passed with one worker.
- Exact local/remote migrations remain 41/41. Protected mixer and spectator function digests are unchanged; private mixer browser grants, public ranked-Daily answer leaks, post-cutoff authority rows, temporary E2E Auth users, temporary profiles, and temporary game projections are all zero.
- Security/performance advisor inventories contain no Phase 58 finding. Visual evidence was inspected locally and remains ignored under `test-results/visual-review/phase-58-post-review-follow-up/`.

## Gate

No implementation blocker remains. The next authorized action is the governed Phase 58 post-review Review Candidate GitHub Backup. Phase 58 remains open for hosted/manual review afterward.

No Git/GitHub action, remote migration, deployment/release action, phase closure, golden checkpoint, redesign-repository creation, Phase 59/60 work, dependency/framework change, or stable-repository work was performed.

## Ryan Action Items

Use the ignored Phase 58 post-review Review Candidate GitHub Backup prompt. After the hosted candidate is available, complete the newly added post-review items in `planning/phase-58/REVIEW-CHECKLIST.md`. Do not share credentials, raw answers, user IDs, private projections, or environment values.
