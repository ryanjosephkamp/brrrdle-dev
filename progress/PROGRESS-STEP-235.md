# Progress Step 235: Phase 31 Planning Brief

**Status**: Completed - Awaiting User Review Before Unified Phase 31 Specification
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-23T22:31:58Z
**Completed**: 2026-06-23T22:31:58Z

## Authorization

The user authorized a Phase 31 planning brief pass only.

Allowed work:

- read governance, roadmap, completed Phase 30 materials, current progress records, multiplayer postgame/action surfaces, multiplayer repository/domain/UI surfaces, ranked/unranked/Daily invariant docs, relevant tests, and user-provided bug notes/screenshots;
- create `planning/phase-31/PLANNING-BRIEF.md`;
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
- Elo algorithm changes;
- gameplay-rule changes;
- new custom skills;
- force-push, secret printing, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- `origin/main`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- Remote: `origin` points to `ryanjosephkamp/brrrdle-dev`.
- Original stable repository: not used.

## Planning Notes

- Created the Phase 31 planning brief for Practice-only multiplayer postgame actions:
  - rematch request/accept with the same opponent and same settings;
  - same-settings play-again or search-again flows;
  - no Daily rematches or Daily replay/search shortcuts;
  - ranked Practice queue/finalization and trusted settlement preservation;
  - migration/RLS addendum gate if durable rematch mutual-intent state or trusted same-settings RPC work is required.
- Integrated the new user-reported Phase 31 cleanup items:
  - private profile accent preview should follow the selected account accent when rendering initials;
  - Stats chart/accessibility text overlap should be fixed without harming screen-reader chart access;
  - About expected-score formula should be rendered in a clearer math-like block without changing the formula;
  - Competitive multiplayer rating-bucket copy should explain buckets in plainer language;
  - rating-bucket rows should be deduped/latest-selected by user and bucket and labeled clearly as ranked Practice OG/GO;
  - stale public-leaderboard-deferred copy should be corrected.
- Kept timed Practice ranked and Daily ranked deferred to Phase 32 ranked mode expansion / competitive ladder v2.

## Files Changed

- `planning/phase-31/PLANNING-BRIEF.md`: created Phase 31 planning brief.
- `planning/README.md`: updated planning index for Phase 31 discoverability.
- `progress/PROGRESS-STEP-235.md`: created this progress report.
- `progress/PROGRESS.csv`: appended the matching Phase 31 planning row.

## Verification

- `git diff --check` passed.
- Python CSV shape check using `python3 -S` passed: `progress/PROGRESS.csv` has 237 rows, 12 columns, and `last_id=235`.
- `git status --short --branch` passed and showed only expected Phase 31 planning/progress changes:
  - `planning/README.md`
  - `planning/phase-31/`
  - `progress/PROGRESS-STEP-235.md`
  - `progress/PROGRESS.csv`

## Blockers

No blockers at creation time.

## Boundary Confirmation

This was planning/documentation-only work. No source/runtime implementation, test implementation, migrations, deployments, commits, pushes, PRs, merges, releases, branch deletion, Phase 31 implementation, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
