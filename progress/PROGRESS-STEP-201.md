# Progress Step 201: Revised Phase 28 Planning Brief

**Date**: 2026-06-17
**Status**: Completed - Awaiting User Review Before Phase 28 Specification
**Repository**: `brrrdle-dev`

## Authorization

The user authorized a Phase 28 planning brief pass only.

Allowed work:

- read governance, roadmap, Phase 27 completion materials, current progress records, Phase 28 intake/routing notes, Live v1 spectator refresh diagnosis, relevant Live/notification/Elo source surfaces read-only, and relevant tests enough to create an implementation-oriented Phase 28 planning brief;
- create `planning/phase-28/PLANNING-BRIEF.md`;
- update `planning/README.md` only if needed for discoverability;
- record progress;
- run lightweight documentation verification.

Explicitly not authorized:

- source/runtime implementation;
- test implementation;
- Supabase migrations;
- Vercel configuration;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 28 implementation;
- Phase 29 implementation;
- new custom skills;
- force-push;
- secret printing;
- original stable `brrrdle` repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch at start: `main`
- `HEAD`: `a051931dad51e554be151bc45e811efc18f4f04d`
- `origin/main`: `a051931dad51e554be151bc45e811efc18f4f04d`
- Existing worktree before this pass already contained uncommitted planning artifacts from Phase 28 scope intake/routing, including progress ID 200.

## Work Completed

- Created `planning/phase-28/PLANNING-BRIEF.md`.
- Updated `planning/README.md` to list Phase 28 as having a planning brief plus intake/diagnosis seeds.
- Recorded this progress report and appended the matching `progress/PROGRESS.csv` row.

## Read-Only Implementation Findings Used

- Live spectator rows are currently refreshed through `App.tsx` on an immediate call plus a 30-second interval.
- `Spectate live game` currently selects/expands inline read-only details instead of opening a focused spectator view.
- Spectator view-model and RPC surfaces currently return/filter only `playing` rows, so terminal rows disappear rather than holding a final sanitized state.
- The Phase 26 authenticated spectator RPC is sanitized/authenticated-only, but its current eligibility shape does not exclude current Daily Multiplayer rows.
- Notification settings and permission helpers exist, and notification sounds are dispatched, but no actual browser `Notification` dispatch path was found during this planning review.
- Phase 27 Elo/rating constants and settlement behavior are already implemented and should be explained, not changed, in Phase 28.

## Phase 28 Direction Captured

Phase 28 should cover:

- Live spectator immediate refresh and foreground-visible 3-5 second polling;
- focused read-only spectator view for `Spectate live game`;
- sanitized terminal spectator board/outcome hold;
- current Daily Multiplayer spectator discovery exclusion;
- browser/foreground notification delivery investigation and fix planning within no-service-worker/no-push constraints;
- low-risk Elo transparency docs/in-app copy without changing the Phase 27 Elo model.

Deferred:

- public player profiles to Phase 29;
- leaderboards to Phase 30;
- multiplayer rematch/play-again/search-again postgame actions to Phase 31;
- public/guest spectation to Phase 32;
- theme template modernization to Phase 33;
- full concrete themes to Phase 34 or later.

## Verification

Lightweight documentation verification passed:

- `git diff --check`
- Python CSV shape check for `progress/PROGRESS.csv` (`rows=203`, `columns=12`, `last_id=201`)
- `git status --short --branch`

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migrations, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 28 implementation, Phase 29 implementation, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.

## Next Step

Review the Phase 28 planning brief. If approved, explicitly authorize creation of the unified Phase 28 specification before any implementation or migration work.
