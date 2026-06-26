# Progress Step 265: Phase 33 Stage 33.2 Timed Ranked Migration/RLS Addendum Planning

**Date:** 2026-06-25
**Phase:** Phase 33 - Competitive Ladder v2 Readiness
**Stage:** 33.2 - Timed Ranked Migration/RLS Addendum Planning
**Status:** Completed - Awaiting User Review Before Stage 33.3 Timed Ranked Migration/RLS Execution

## Authorization

The user authorized Phase 33 Stage 33.2 only: migration/RLS addendum planning for timed Practice ranked.

Authorized work included reading governance, Phase 33 planning/spec/implementation materials, Stage 33.1 audit findings, current progress records, ranked queue/finalization/settlement/rating surfaces, timed Practice Multiplayer surfaces, public leaderboard surfaces, participant identity RPC context, relevant migrations/docs/tests read-only, creating the next progress report and CSV row, and creating a precise Stage 33.2 migration/RLS addendum under `planning/specs/phase-33/`.

The prompt did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, deployment, Vercel or Supabase configuration, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- `origin/main`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- Existing uncommitted Phase 33 planning/spec/progress artifacts from prior stages were preserved.

## Work Completed

Created:

- `planning/specs/phase-33/PHASE-33-TIMED-RANKED-MIGRATION-RLS-ADDENDUM-2026-06-25.md`
- `progress/PROGRESS-STEP-265.md`

Updated:

- `progress/PROGRESS.csv`

## Key Decisions Captured

- Timed Practice ranked v1 may support only the canonical `300000` ms per-side clock.
- Timed ranked requires separate storage buckets:
  - `async:og:timed:v1`
  - `async:go:timed:v1`
- Timed ranked requires separate app buckets:
  - `multiplayer:og:timed:v1`
  - `multiplayer:go:timed:v1`
- Timed and untimed ranked games must not match each other and must not share rating profiles or rating transactions.
- Stage 33.3 must expand ranked/rating/result/queue bucket constraints before timed buckets can be stored.
- Stage 33.3 must update or replace the Phase 27 ranked queue creation, claim, status, finalization, and trusted settlement RPCs to accept only untimed or canonical five-minute timed ranked Practice contexts.
- Stage 33.3 must update the Phase 32 participant identity RPC so matched timed ranked queue participants can resolve allow-listed opponent identity summaries without private data exposure.
- Public ranked leaderboard timed bucket exposure remains out of scope for Phase 33.
- Daily ranked and ranked custom/private-code games remain deferred.
- Elo algorithm, provisional rules, K factors, outcome scoring, and gameplay rules remain unchanged.

## Verification

Passed:

- `git diff --check`
- Progress CSV shape check using `python3 -S`: `rows=267 columns=[12] last_id=265`
- Non-printing secret/artifact scan over changed tracked and untracked repository files: `scanned_files=12 credential_pattern_hits=0 changed_artifacts=0`
- Ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- `git status --short --branch` showed expected Phase 33 planning/spec/progress documentation changes only.

## Next Step

Review the Stage 33.2 addendum. If approved, explicitly authorize Stage 33.3 timed ranked migration/RLS execution before creating or applying any SQL migration, modifying source/runtime code, implementing tests, deploying, configuring Vercel/Supabase, performing Git/GitHub operations, changing gameplay/Elo behavior, running the backup workflow, or touching the original stable repository.

## Boundaries Preserved

No source/runtime code, test implementation, SQL migration creation/execution, deployment, Vercel/Supabase configuration, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay/Elo changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work was performed.
