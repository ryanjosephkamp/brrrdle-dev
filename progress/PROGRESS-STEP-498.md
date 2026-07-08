# Progress Step 498 - Phase 50 Ranked Practice FIFO Matchmaking Planning

**Status**: Completed - Ranked Practice FIFO Matchmaking Prompt Prepared.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Started**: 2026-07-08T20:06:15Z.
**Completed**: 2026-07-08T20:06:15Z.

## Summary

Recorded the user's hosted/live manual review feedback after the ranked multiplayer recovered Review Candidate Backup and prepared a bounded same-phase follow-up prompt for ranked Practice FIFO matchmaking.

The user reported that accepted Solo persistence and Home-on-refresh behavior appear to pass, and that ranked Practice GO matchmaking appears to work. Ranked Practice OG matchmaking still does not reliably match two signed-in accounts in different browsers. The user also observed that repeated ranked matching between the same two players appears artificially inhibited and requested a simpler first-come, first-served ranked Practice queue.

Phase 50 remains open.

## Findings Recorded

The current ranked Practice queue backend is not a pure FIFO queue. Source inspection found that `supabase/migrations/20260703230106_phase43_ranked_queue_matching_fairness.sql` redefines `public.claim_ranked_async_matchmaking_pair(text, text)` to prefer compatible non-recent opponents by calling `phase43_is_recent_ranked_practice_opponent(...)` before rating-distance and queue-age ordering.

That behavior does not necessarily hard-block repeated opponents when they are the only compatible candidate, but it does complicate matching in a small/stale live queue and no longer matches the user's current acceptance target.

Related user observations were recorded as deferred unless directly required for the ranked FIFO fix:

- emoji or special-character public profile names can appear to break Daily Multiplayer for the affected account;
- a future admin/debug surface for visualizing ranked queue state would be useful.

## Analysis Artifact

Created:

- `planning/phase-50/RANKED-PRACTICE-FIFO-MATCHMAKING-PLAN-2026-07-08.md`

The plan recommends:

- simplifying ranked Practice pairing to first-come, first-served among compatible queued requests;
- preserving authentication, ownership, no-self-match, Practice/ranked/settings/time-control compatibility, expiry, and existing finalization/recovery behavior;
- removing recent-opponent preference and rating-distance priority/blocking from the current intended Phase 50 queue contract unless implementation evidence proves a minimal invariant must remain;
- adding a new local source-controlled migration/RPC SQL artifact if required, while keeping remote Supabase execution separately gated.

## Prompt Package

Created an ignored local prompt package:

- `prompt-packages/phase-50/PHASE-50-RANKED-PRACTICE-FIFO-MATCHMAKING-FOLLOW-UP-PROMPT-2026-07-08.md`

This prompt authorizes a bounded same-phase implementation/testing follow-up only when the user sends it back. It does not authorize Git/GitHub backup, final Phase 50 closure, remote Supabase SQL/migration/RPC/RLS/schema execution, deployment, release, next-phase work, unsafe credential/private-data handling, public tunneling, profile-name policy implementation, admin queue visualization, or stable `brrrdle` repository work.

## Changed

- Added a ranked Practice FIFO matchmaking plan artifact.
- Updated the Phase 50 manual review checklist with the current hosted/live ranked Practice findings.
- Updated the Phase 50 changelog with the new planning and next-step prompt.
- Added this progress report and updated `progress/PROGRESS.csv`.
- Created the ignored local implementation prompt package for the next safe step.

## Verification

Run in this planning-only pass:

- `git diff --check`;
- CSV shape check;
- non-printing/credential-value/private-data scan over changed tracked/untracked files plus the ignored prompt artifact;
- ignored-artifact check confirming the prompt package is ignored and not tracked;
- `git status --short --branch`.

No source/runtime code, tests, local migration source, remote Supabase state, deployment configuration, Git/GitHub state, or stable `brrrdle` repository work was changed.

## Boundaries

This step did not implement ranked FIFO matchmaking. It did not run Git/GitHub backup, branch creation, staging, commit, push, PR, merge, branch cleanup, final Phase 50 acceptance/closure, Final Acceptance Backup, deployment configuration changes, release, local migration source changes, remote Supabase/RLS/RPC/table/bucket/schema execution, destructive cloud cleanup, gameplay/reward/scoring/Elo changes, Daily claim changes, Solo persistence rewrites, refresh-routing rewrites, Practice GO answer-selection/randomness algorithm changes, profile-name policy changes, admin queue visualization, next-phase work, public tunneling, unsafe credential/private-data handling, or stable `brrrdle` repository work.

## Next Step

Use `prompt-packages/phase-50/PHASE-50-RANKED-PRACTICE-FIFO-MATCHMAKING-FOLLOW-UP-PROMPT-2026-07-08.md` to authorize the bounded same-phase ranked Practice FIFO matchmaking implementation/testing follow-up.
