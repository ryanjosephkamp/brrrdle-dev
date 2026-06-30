# Progress Step 301: Phase 37 Planning Brief

**Date:** 2026-06-29
**Phase:** Phase 37 - Navigation And Gameplay Ergonomics
**Stage:** Planning brief
**Status:** Completed - Awaiting User Review

## Authorization

The user authorized a Phase 36 manual-review-results processing and next-planning decision pass only. Because the user reported that all Phase 36 manual review checklist items passed and no issues were found, the prompt authorized creation of the Phase 37 planning brief.

The prompt did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`
- `origin/main`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`
- Existing user edit to `planning/phase-36/REVIEW-CHECKLIST.md`: preserved and not edited in this pass.

## Manual Review Result

The user reported that the Phase 36 manual review checklist was fully reviewed and that no issues were found. Phase 36 is therefore clear for Phase 37 planning.

## Planning Work Completed

- Created `planning/phase-37/PLANNING-BRIEF.md`.
- Updated `planning/README.md` for Phase 37 discoverability.
- Updated `planning/ROADMAP.md` and `planning/ROADMAP-OPTIMIZED.md` to reflect Phase 35 and Phase 36 completion, Phase 37 scope, and later routing for EXP/coin counters and Focus Mode.
- Added this progress report and the matching `progress/PROGRESS.csv` row.

## Phase 37 Scope Decisions

- Phase 37 should focus on gameplay entry/resume ergonomics and browser navigation readiness.
- Gameplay-area auto-centering on enter, join, resume, or direct routing remains in Phase 37.
- Browser back/forward integration remains in Phase 37 and must treat history as view state, not gameplay authority.
- The newly reported solo invalid-guess sound inconsistency is small and in scope for Phase 37.
- EXP/coin/collectible header counters are routed to a later progression/HUD phase after earnable systems have clearer gameplay function.
- Focus Mode is routed to a late shell-polish/accessibility phase after major surfaces stabilize.

## Verification

Lightweight documentation verification was run after the planning edits:

- `git diff --check`
  - Result: passed.
- Progress CSV shape check using `python3 -S`
  - Result: passed, `rows=303 columns=[12] last_id=301`.
- Non-printing secret/artifact scan over changed tracked and untracked repository files
  - Result: passed, `scanned_files=7 credential_pattern_hits=0 changed_artifacts=0`.
- Ignored-artifact check
  - Result: passed, `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch --untracked-files=all`
  - Result: completed; expected planning/progress changes and the preserved user-edited Phase 36 review checklist remain in the worktree.

## Boundaries Preserved

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review the Phase 37 planning brief. If approved, authorize creation of the unified Phase 37 specification before implementation, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
