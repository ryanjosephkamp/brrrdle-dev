# Progress Step 202: Unified Phase 28 Specification

**Date**: 2026-06-17
**Status**: Completed - Awaiting User Review Before Phase 28 Implementation Plan
**Repository**: `brrrdle-dev`

## Authorization

The user authorized creation of a unified Phase 28 specification for review only.

Allowed work:

- read governance, roadmap, completed Phase 27 materials, Phase 28 intake/routing notes, the Live v1 spectator refresh diagnosis, the Phase 28 planning brief, current progress records, relevant Live/notification/Elo source surfaces read-only, and relevant tests enough to create an implementation-oriented Phase 28 spec;
- create a Phase 28 spec under `planning/specs/phase-28/`;
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
- Existing worktree before this pass already contained uncommitted Phase 28 planning artifacts from progress IDs 200 and 201.

## Work Completed

- Created `planning/specs/phase-28/PHASE-28-LIVE-SPECTATOR-NOTIFICATIONS-AND-ELO-TRANSPARENCY-SPEC-2026-06-17.md`.
- Updated `planning/README.md` to list `planning/specs/phase-28/`.
- Recorded this progress report and appended the matching `progress/PROGRESS.csv` row.

## Spec Decisions Captured

- Phase 28 remains scoped to Live v1 spectator and notification stabilization, current Daily spectation integrity, and low-risk Elo transparency.
- Live spectator refresh should move from a 30-second-only spectator polling loop to immediate Live-entry refresh plus active-visible 3-5 second foreground polling, with slower or paused behavior elsewhere.
- `Spectate live game` should open a focused authenticated read-only spectator experience, not only an inline expansion.
- Spectators should see a sanitized terminal board/outcome hold for roughly 15 seconds before a completed game disappears.
- Current Daily Multiplayer games must be excluded from spectator discovery to prevent answer leakage.
- Browser notifications should be completed or corrected as foreground/local, permission-gated, preference-gated notifications without service workers, push, background delivery, or cross-device delivery.
- Elo transparency should explain the Phase 27 Elo model without changing rating constants, formulas, settlement authority, ranked eligibility, or points-versus-Elo separation.

## Verification

Lightweight documentation verification passed:

- `git diff --check`
- Python CSV shape check for `progress/PROGRESS.csv` (`rows=204`, `columns=12`, `last_id=202`)
- `git status --short --branch`

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migrations, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 28 implementation, Phase 29 implementation, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.

## Next Step

Review the unified Phase 28 specification. If approved, explicitly authorize creation of the detailed Phase 28 implementation plan before any implementation, migration, or source/runtime changes.
