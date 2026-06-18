# Progress Step 203: Phase 28 Implementation Plan

**Status**: Completed - Awaiting User Review Before Stage 28.0.
**Date**: 2026-06-17.
**Repository**: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Branch**: `main`.

## Authorization

The user authorized creation of a detailed Phase 28 implementation plan for review only.

Authorized work:

- read governance, roadmap, completed Phase 27 materials, Phase 28 intake/routing notes, the Live v1 spectator refresh diagnosis, the Phase 28 planning brief, the unified Phase 28 specification, current progress records, relevant Live/notification/Elo source surfaces, and relevant tests;
- create `planning/phase-28/IMPLEMENTATION-PLAN.md`;
- update `planning/README.md` only if needed for discoverability;
- record progress using the next available progress ID;
- run lightweight documentation verification.

Not authorized:

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

## Repo State

Confirmed before editing:

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- branch: `main`
- status: existing uncommitted Phase 28 planning/progress work present and preserved
- `HEAD`: `a051931dad51e554be151bc45e811efc18f4f04d`
- `origin/main`: `a051931dad51e554be151bc45e811efc18f4f04d`
- remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`

## Work Performed

- Created `planning/phase-28/IMPLEMENTATION-PLAN.md`.
- Updated `planning/README.md` to include the Phase 28 implementation plan in the phase directory description.
- Appended the matching progress row to `progress/PROGRESS.csv`.

## Major Plan Decisions

- Stage 28.0 is a protected baseline only, with no source/test/migration implementation.
- Stage 28.1 is a reproduction/audit stage that decides whether Live spectator Daily exclusion and terminal hold require SQL/RLS work.
- Stage 28.2 and Stage 28.3 are conditional migration/RLS addendum and execution gates.
- Stage 28.4 implements Live spectator app behavior: immediate Live refresh, default 5 second foreground visible polling, focused read-only spectator view, terminal hold, and app-side Daily guard.
- Stage 28.5 implements foreground-capable browser notification delivery within the existing no-service-worker/no-push boundary.
- Stage 28.6 adds Elo transparency docs/copy without changing the Phase 27 Elo model.
- Stage 28.7 performs final E2E, cleanup, resource checks, and handoff preparation.

## Verification

Passed:

- `git diff --check`
- Python `csv` shape check for `progress/PROGRESS.csv` using a streaming parser after the first non-streaming attempt was killed by the shell with exit 137 before printing output
- `git status --short --branch`

## Blockers

None currently.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migrations, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 28 implementation, Phase 29 implementation, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
