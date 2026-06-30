# Progress Step 302: Phase 37 Unified Specification

**Date:** 2026-06-29
**Phase:** Phase 37 - Navigation And Gameplay Ergonomics
**Stage:** Unified specification
**Status:** Completed - Awaiting User Review

## Authorization

The user authorized creation of a unified Phase 37 specification for review only.

The prompt did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`
- `origin/main`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`
- Existing user edit to `planning/phase-36/REVIEW-CHECKLIST.md`: preserved and not edited in this pass.

## Specification Work Completed

- Created `planning/specs/phase-37/PHASE-37-NAVIGATION-GAMEPLAY-ERGONOMICS-SPEC-2026-06-29.md`.
- Updated `planning/README.md` for Phase 37 spec discoverability.
- Added this progress report and the matching `progress/PROGRESS.csv` row.

## Major Scope Decisions

- Phase 37 remains focused on gameplay-area auto-centering, browser back/forward view-state integration, and solo invalid-guess sound consistency.
- Browser history must store view state only and must never replay gameplay, auth, account, queue, claim, or persistence mutations.
- Auto-centering must be a one-shot explicit entry/resume intent, not a passive reaction to typing, timers, realtime refreshes, identity hydration, or resume capture.
- Solo invalid-guess repair must preserve existing multiplayer invalid-guess behavior and must reproduce or test the audible solo inconsistency before changing dispatch.
- No migration/RLS addendum is expected; any unexpected need for schema/RLS/config changes must stop for a separate addendum.

## Deferred Routing

- EXP, coins, and other collectible header counters remain routed to Phase 41 or a later progression/HUD phase after earnables have clear gameplay functions for guest and signed-in players.
- Focus Mode remains routed to Phase 41 or a later shell-polish/accessibility phase after major surfaces stabilize.
- Public/guest spectation, spectator presence, social/profile browsing, private matchmaking, public site stats/developer dashboard, onboarding/help/tutorials, theme work, service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes remain deferred to later gated phases.

## Verification

Lightweight documentation verification was run after the specification edits:

- `git diff --check`
  - Result: passed.
- Progress CSV shape check using `python3 -S`
  - Result: passed, `rows=304 columns=[12] last_id=302`.
- Non-printing secret/artifact scan over changed tracked and untracked repository files
  - Result: passed, `scanned_files=9 credential_pattern_hits=0 changed_artifacts=0`.
- Ignored-artifact check
  - Result: passed, `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch`
  - Result: completed; expected planning/progress changes and the preserved user-edited Phase 36 review checklist remain in the worktree.

## Boundaries Preserved

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review the unified Phase 37 specification. If approved, authorize creation of the detailed Phase 37 implementation plan before implementation, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
