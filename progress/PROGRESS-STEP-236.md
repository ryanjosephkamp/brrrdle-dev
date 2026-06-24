# Progress Step 236: Phase 31 Unified Specification

**Status**: Completed - Awaiting User Review Before Phase 31 Implementation Plan
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-23T22:41:32Z
**Completed**: 2026-06-23T22:44:21Z

## Authorization

The user authorized creation of a unified Phase 31 specification for review only.

Allowed work:

- read governance, roadmap, completed Phase 30 materials, the Phase 31 planning brief, current progress records, multiplayer postgame/action surfaces, profile/Stats/About/rating-bucket cleanup surfaces, relevant tests, and Supabase/RLS context;
- create one unified Phase 31 specification under `planning/specs/phase-31/`;
- update `planning/README.md` if needed for discoverability;
- append a matching 12-column row to `progress/PROGRESS.csv`;
- run lightweight documentation verification.

Not authorized:

- source/runtime implementation;
- test implementation;
- Supabase migration creation or execution;
- Vercel configuration;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 31 implementation;
- Phase 32 ranked mode expansion;
- public/guest spectation;
- service workers or push infrastructure;
- new custom skills;
- force-push, secret printing, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- `origin/main`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- Remote: `origin` points to `ryanjosephkamp/brrrdle-dev`.
- Worktree: dirty from expected uncommitted Phase 31 planning/progress artifacts.
- Original stable repository: not used.

## Specification Notes

- Created the unified Phase 31 specification under `planning/specs/phase-31/`.
- Covered Practice-only multiplayer postgame actions:
  - rematch request/accept with the same opponent and same settings;
  - same-settings ranked search-again through trusted queue behavior unless a later approved RLS addendum defines a direct rematch RPC;
  - same-settings unranked/custom lobby or setup actions where safe;
  - no Daily rematches, no Daily replay shortcuts, and no Daily search-again shortcuts.
- Defined migration/RLS gates for durable rematch mutual-intent state, trusted direct rematch RPCs, idempotency, expiry, wrong-account protections, and spam/abuse controls.
- Integrated the approved current-surface cleanup items:
  - private profile accent preview;
  - Stats chart/accessibility overlap;
  - About expected-score formula formatting;
  - Competitive multiplayer rating-bucket clarity, dedupe, and stale copy cleanup.
- Preserved Phase 32 ranked-mode expansion deferral for timed Practice ranked and Daily ranked.

## Files Changed

- `planning/specs/phase-31/PHASE-31-MULTIPLAYER-POSTGAME-ACTIONS-AND-CURRENT-SURFACE-CLEANUP-SPEC-2026-06-23.md`: created unified Phase 31 specification.
- `planning/README.md`: updated planning index for Phase 31 spec discoverability.
- `progress/PROGRESS-STEP-236.md`: created this progress report.
- `progress/PROGRESS.csv`: appended the matching Phase 31 specification row.

## Verification

- `git diff --check` passed.
- Python CSV shape check using `python3 -S` passed: `progress/PROGRESS.csv` has 238 rows, 12 columns, and `last_id=236`.
- `git status --short --branch` passed and showed only expected Phase 31 planning/spec/progress changes:
  - `planning/README.md`
  - `planning/phase-31/`
  - `planning/specs/phase-31/`
  - `progress/PROGRESS-STEP-235.md`
  - `progress/PROGRESS-STEP-236.md`
  - `progress/PROGRESS.csv`

## Blockers

No blockers at creation time.

## Boundary Confirmation

This was planning/documentation-only work. No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 31 implementation, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
