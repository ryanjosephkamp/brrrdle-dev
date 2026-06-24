# Progress Step 237: Phase 31 Implementation Plan

**Status**: Completed - Awaiting User Review Before Stage 31.0 Baseline
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-23T22:50:27Z
**Completed**: 2026-06-23T22:52:50Z

## Authorization

The user authorized creation of a detailed Phase 31 implementation plan for review only.

Allowed work:

- read governance, roadmap, completed Phase 30 materials, the Phase 31 planning brief, the unified Phase 31 specification, current progress records, multiplayer postgame/action surfaces, profile/Stats/About/rating-bucket cleanup surfaces, relevant tests, and Supabase/RLS context;
- create or update `planning/phase-31/IMPLEMENTATION-PLAN.md`;
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
- Worktree: dirty from expected uncommitted Phase 31 planning/spec/progress artifacts.
- Original stable repository: not used.

## Implementation Plan Notes

- Created the detailed Phase 31 implementation plan under `planning/phase-31/`.
- Defined staged execution from protected baseline through audit, optional migration/RLS addendum, optional migration execution, postgame domain/repository foundations, postgame UI integration, current-surface cleanup, and final hardening.
- Preserved Practice-only scope for rematch and same-settings actions.
- Preserved Daily Multiplayer claim safety and explicitly rejected Daily rematches, replay shortcuts, and search-again shortcuts.
- Preserved ranked Practice v1 boundaries and routed timed Practice ranked, Daily ranked, ranked custom/private-code games, and optional rank labels to Phase 32.
- Included current-surface cleanup sequencing for private accent preview, Stats chart/accessibility overlap, About expected-score formula formatting, and rating-bucket clarity/dedupe.

## Files Changed

- `planning/phase-31/IMPLEMENTATION-PLAN.md`: created detailed Phase 31 implementation plan.
- `planning/README.md`: updated planning index for Phase 31 implementation-plan discoverability.
- `progress/PROGRESS-STEP-237.md`: created this progress report.
- `progress/PROGRESS.csv`: appended the matching Phase 31 implementation-plan row.

## Verification

- `git diff --check` passed.
- Python CSV shape check using `python3 -S` passed: `progress/PROGRESS.csv` has 239 rows, 12 columns, and `last_id=237`.
- `git status --short --branch` passed and showed only expected Phase 31 planning/spec/progress changes:
  - `planning/README.md`
  - `planning/phase-31/`
  - `planning/specs/phase-31/`
  - `progress/PROGRESS-STEP-235.md`
  - `progress/PROGRESS-STEP-236.md`
  - `progress/PROGRESS-STEP-237.md`
  - `progress/PROGRESS.csv`

## Blockers

No blockers at creation time.

## Boundary Confirmation

This was planning/documentation-only work. No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 31 implementation, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
