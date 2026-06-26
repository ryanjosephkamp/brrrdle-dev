# Progress Step 261: Unified Phase 33 Specification

**Date:** 2026-06-25
**Phase:** Phase 33 specification
**Status:** Completed - awaiting user review before detailed Phase 33 implementation plan

## Authority

User authorized creation of a unified Phase 33 specification for review only.

This pass may read governance, roadmap, completed Phase 32 materials, the Phase 33 planning brief, current progress records, ranked queue/settlement/rating surfaces, timed Practice Multiplayer surfaces, public leaderboard/rating display surfaces, relevant tests, Supabase/RLS context, and local workflow documentation enough to create an implementation-oriented Phase 33 specification.

## Boundaries

This pass does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, deployment, Vercel or Supabase configuration, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

## Initial State

- Repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- `origin/main`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- Original stable repository: not used.
- Existing uncommitted Phase 33 planning artifacts preserved.

## Work Completed

- Created `planning/specs/phase-33/PHASE-33-COMPETITIVE-LADDER-V2-READINESS-SPEC-2026-06-25.md`.
- Locked Phase 33 around competitive ladder v2 readiness, gated timed Practice ranked, display-only rank bands, and public ranked leaderboard polish.
- Defined canonical timed ranked v1 as exactly `5 minutes` per side (`300000` ms) if implementation proceeds.
- Defined separate timed ranked buckets `multiplayer:og:timed:v1` and `multiplayer:go:timed:v1` if implementation proceeds.
- Defined display-only rank band thresholds from `Learner` through `Master`.
- Required public leaderboard `All buckets` removal and default `OG` selection.
- Required migration/RLS addendum planning before any timed ranked SQL/RPC/RLS execution.
- Deferred Daily ranked, ranked custom/private-code games, Vercel/auth/account-management work, onboarding/help, public/guest spectation, service workers, deployment, Elo algorithm changes, and gameplay-rule changes.
- Updated `planning/README.md` so the Phase 33 spec area reflects the created spec.

## Verification Results

- Passed: `git diff --check`.
- Passed: Python CSV shape check using `python3 -S` reported `rows=263 columns=[12] last_id=261`.
- Passed: non-printing secret/artifact scan over changed tracked and untracked repository files reported `scanned_files=6 credential_pattern_hits=0 changed_artifacts=0`.
- Passed: ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Passed: `git status --short --branch` showed expected Phase 33 planning/spec/progress documentation changes only.

## Blockers

- None currently identified.

## Next Gate

Review the unified Phase 33 specification. If approved and verification passes, explicitly authorize creation of the detailed Phase 33 implementation plan before source/runtime implementation, tests, migrations, Vercel or Supabase configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay/Elo changes, brrrdle GitHub backup workflow execution, or original stable repository work.
