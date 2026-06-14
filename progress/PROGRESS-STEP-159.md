# Progress Step 159 - Unified Phase 25 Specification

**Date**: 2026-06-14
**Phase**: Phase 25 specification
**Status**: Completed - Awaiting User Review Before Phase 25 Implementation Plan
**Repository**: `https://github.com/ryanjosephkamp/brrrdle-dev`
**Branch**: `main`
**HEAD / origin/main at start**: `6bedaa7a7aa2c12c3e5097400c82c0e60ff338fe`

## Authorization

The user authorized creation of a unified Phase 25 specification for review only. This included reading governance, roadmap, Phase 24 completion materials, pre-Phase-25 bugfix materials, the Phase 25 planning brief, current progress records, and relevant app architecture surfaces.

This did not authorize source/runtime implementation, test implementation, Supabase migrations, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, new custom skills, Phase 25 implementation, or original stable `brrrdle` repository work.

## Starting State

- Working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- Remote: `origin` points to `https://github.com/ryanjosephkamp/brrrdle-dev.git`
- Local `HEAD` and `origin/main`: `6bedaa7a7aa2c12c3e5097400c82c0e60ff338fe`
- Worktree already contained the prior planning-only Phase 25 brief/progress files from Progress Step 158.

## Work Completed

- Created `planning/specs/phase-25/PHASE-25-DASHBOARD-AND-NOTIFICATIONS-SPEC-2026-06-14.md`.
- Updated `planning/README.md` to list `planning/specs/phase-25/`.
- Appended this progress step to `progress/PROGRESS.csv`.

## Major Spec Decisions

- Phase 25 should focus on Home dashboard v1, in-app notification foundations, navigation/workspace attention cues, and conservative Lobby/Live freshness.
- Browser notifications, push infrastructure, service-worker delivery, cross-device notification sync, public Live expansion, social systems, schema/RLS changes, deployment, and gameplay-rule changes are explicitly out of scope unless separately approved.
- Dashboard and notification state should be projection-first and local-first.
- `App.tsx` should remain orchestration-focused while dashboard and notification rendering move to dedicated modules.
- Daily Multiplayer invariants and all Phase 23/24 gameplay guarantees remain mandatory success criteria.

## Verification

Passed:

- `git diff --check`
- progress CSV shape check with Python `csv` parsing: 161 rows, 12 columns
- `git status --short --branch`

Post-edit worktree status:

- Modified: `planning/README.md`
- Modified: `progress/PROGRESS.csv`
- Untracked: `planning/phase-25/PLANNING-BRIEF.md`
- Untracked: `planning/specs/phase-25/PHASE-25-DASHBOARD-AND-NOTIFICATIONS-SPEC-2026-06-14.md`
- Untracked: `progress/PROGRESS-STEP-158.md`
- Untracked: `progress/PROGRESS-STEP-159.md`

## Scope Confirmation

No source/runtime code, tests, Supabase migrations, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 25 implementation, new custom skills, or original stable `brrrdle` repository work was performed.

## Next Step

Review the unified Phase 25 spec. If approved, explicitly authorize creation of a detailed Phase 25 implementation plan before any baseline or source changes.
