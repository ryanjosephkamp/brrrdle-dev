# Progress Step 294: Phase 36 Detailed Implementation Plan

**Date:** 2026-06-28
**Phase:** Phase 36 - Leaderboard And Stats Navigation Split
**Stage:** Detailed implementation plan
**Status:** Completed - Awaiting User Review

## Authorization

The user authorized creation of a detailed Phase 36 implementation plan for review only.

The prompt did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- `origin/main`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- Existing user edit to `planning/phase-35/REVIEW-CHECKLIST.md`: preserved.
- Existing Phase 36 planning/spec/progress artifacts from progress IDs `292` and `293`: preserved.

## Implementation Plan Work Completed

- Created `planning/phase-36/IMPLEMENTATION-PLAN.md`.
- Updated `planning/README.md` so the Phase 36 implementation plan is discoverable.
- Appended the matching 12-column CSV row to `progress/PROGRESS.csv`.

The detailed plan stages Phase 36 as:

- Stage 36.0 protected baseline;
- Stage 36.1 route, identity, Settings, and copy audit;
- Stage 36.2 Active Games safe-name source repair or migration/RLS addendum gate;
- Stage 36.3 Leaderboard route and Stats split;
- Stage 36.4 Settings and password-copy cleanup;
- Stage 36.5 final hardening, E2E, visual review, changelog, and manual checklist.

## Major Decisions

- Active Games safe-name repair is planned source-only by default, using existing participant identity summaries and safe profile maps.
- Migration/RLS addendum planning remains gated unless the Stage 36.1 audit proves existing safe identity seams are insufficient.
- Leaderboard route work is sequenced separately from Active Games identity repair to avoid mixing navigation churn with privacy-sensitive identity handling.
- Settings/password-copy cleanup is sequenced after Leaderboard work unless the Stage 36.1 audit finds a safer ordering.
- GitHub backup remains a later gate and should use the local `brrrdle-github-backup` skill after a clean handoff preparation pass.

## Verification

Lightweight documentation verification passed after the implementation plan/progress edits:

- `git diff --check`
  - Result: passed with no output.
- Python CSV shape check using `python3 -S`
  - Result: `rows=296 columns=[12] last_id=294`.
- non-printing secret/artifact scan over changed tracked and untracked repository files
  - Result: refined credential-shaped scan reported `scanned_files=9 credential_pattern_hits=0 changed_artifacts=0`.
  - Note: an initial over-broad scan matched ordinary workflow text in `progress/PROGRESS.csv`; the refined credential-shaped scan passed.
- ignored-artifact check confirming forbidden local artifacts are not tracked or staged
  - Result: refined artifact-path check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
  - Note: an initial over-broad filename scan matched ordinary source files containing `session` in their names; the refined artifact-path check passed.
- `git status --short --branch`
  - Result: completed; branch remained `main` tracking `origin/main`, with Phase 36 planning/spec/progress edits plus the preserved user-edited Phase 35 review checklist.

## Boundaries Preserved

No source/runtime code, tests, Supabase migrations, Vercel or Supabase configuration, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review the detailed Phase 36 implementation plan. If approved, authorize Phase 36 Stage 36.0 baseline only before Stage 36.1 audit, implementation, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
