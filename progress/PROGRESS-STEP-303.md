# Progress Step 303: Phase 37 Implementation Plan

**Date:** 2026-06-29
**Phase:** Phase 37 - Navigation And Gameplay Ergonomics
**Stage:** Detailed implementation plan
**Status:** Completed - Awaiting User Review Before Stage 37.0

## Authorization

The user authorized creation of a detailed Phase 37 implementation plan for review only.

The prompt did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`
- `origin/main`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`
- Existing user edit to `planning/phase-36/REVIEW-CHECKLIST.md`: preserved and not edited in this pass.

## Implementation Plan Work Completed

- Created `planning/phase-37/IMPLEMENTATION-PLAN.md`.
- Updated `planning/README.md` for Phase 37 implementation-plan discoverability.
- Added this progress report and the matching `progress/PROGRESS.csv` row.

## Major Staging Decisions

- Stage 37.0 is a protected baseline only, with no audit or source work.
- Stage 37.1 audits route, entry/resume, browser-history, and sound seams before any implementation.
- Stage 37.2 isolates the solo invalid-guess sound repair so multiplayer sound behavior remains the reference behavior.
- Stage 37.3 implements one-shot gameplay-area auto-centering after explicit entry/resume flows.
- Stage 37.4 implements browser back/forward for view state only, with stale selected-game fallbacks and no mutation authority.
- Stage 37.5 handles final hardening, focused/E2E coverage, visual review, changelog, and manual review checklist.

## Migration And Configuration Decisions

- No Supabase migration or RLS work is expected for Phase 37.
- Any unexpected need for SQL, RLS, RPC, Vercel configuration, Supabase configuration, deployment, service workers, push infrastructure, public/guest spectation, gameplay-rule changes, or Elo changes must stop for a separate gated addendum.

## Verification

Lightweight documentation verification was run after the implementation-plan edits:

- `git diff --check`
  - Result: passed.
- Progress CSV shape check using `python3 -S`
  - Result: passed, `rows=305 columns=[12] last_id=303`.
- Non-printing secret/artifact scan over changed tracked and untracked repository files
  - Result: passed, `scanned_files=11 credential_pattern_hits=0 changed_artifacts=0`.
- Ignored-artifact check
  - Result: passed, `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch`
  - Result: completed; expected planning/progress changes and the preserved user-edited Phase 36 review checklist remain in the worktree.

## Boundaries Preserved

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review the detailed Phase 37 implementation plan. If approved, authorize Phase 37 Stage 37.0 protected baseline before any audit, implementation, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
