# Progress Step 350 - Phase 41 Implementation Plan

**Status**: Completed - Awaiting User Review Before Stage 41.0
**Phase**: Phase 41 - Multiplayer Reliability And Real E2E Hardening
**Stage**: Detailed implementation plan creation
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-02T21:24:37Z
**Completed**: 2026-07-02T21:24:37Z

## Authorization

The user authorized creation of a detailed Phase 41 implementation plan for review only.

This pass included reading governance, roadmap, completed Phase 40 materials, the Phase 41 planning brief, the Phase 41 reliability strategy intake, the unified Phase 41 specification, phase scope sizing guidance, current progress records, multiplayer reliability, ranked queue, leaderboard, private request, mobile freshness, notification/routing, relevant tests, Supabase/RLS context as needed, and local workflow docs enough to create an actionable staged implementation plan.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Expected baseline: `c3d774bc8a611950f889f2f7a487be4e69844fc0`.
- The original stable `brrrdle` repository was not used or touched.
- The user-edited `planning/phase-40/REVIEW-CHECKLIST.md` was preserved.

## Implementation Plan Created

Created:

- `planning/phase-41/IMPLEMENTATION-PLAN.md`

Updated:

- `planning/README.md`
- `progress/PROGRESS.csv`

## Major Staging Decisions

The plan keeps Phase 41 as a cohesive multiplayer reliability macro-phase with narrow execution stages:

- Stage 41.0 protected baseline and review intake;
- Stage 41.1 multiplayer reliability audit and reproduction;
- Stage 41.2 real E2E harness expansion;
- Stage 41.3 ranked Practice queue and search-again repair;
- Stage 41.4 public ranked leaderboard freshness repair;
- Stage 41.5 private Practice request lifecycle and routing repair;
- Stage 41.6 mobile multiplayer freshness and UI stability repair;
- Stage 41.7 final hardening, Codex-assisted pre-review, visual review, changelog, and manual checklist.

The plan explicitly adds optional migration/RLS addendum and execution gates only if Stage 41.1 proves a database-contract issue.

## Verification

Lightweight documentation verification passed:

- `git diff --check`
- Progress CSV shape check using `python3 -S` reported `rows=352 columns=[12] last_id=350`.
- Non-printing changed/untracked file credential scan reported `scanned_files=13 credential_pattern_hits=0`.
- Ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch` completed.

## Blockers And Open Questions

No blockers were found during implementation planning.

Open decisions for Stage 41.1:

- whether ranked queue stale cancellation is source-only, RPC-contract related, or data-cleanup related;
- whether leaderboard freshness is source polling, RPC/projection filtering, public profile eligibility, rating settlement timing, or E2E setup;
- whether private request expiry cleanup needs source refresh only or RPC/projection repair;
- whether three-client E2E remains reliable enough for broad E2E;
- whether the Codex-assisted manual-review preflight should remain Phase 41-local or become a future reusable governed workflow after it is proven.

## Boundary Confirmation

No source/runtime implementation, test implementation, migration creation or execution, deployment/configuration work, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation contract change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, local Codex skill creation/modification, or original stable repository work was performed.
