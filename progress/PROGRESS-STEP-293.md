# Progress Step 293: Phase 36 Unified Specification

**Date:** 2026-06-28
**Phase:** Phase 36 - Leaderboard And Stats Navigation Split
**Stage:** Unified specification
**Status:** Completed - Awaiting User Review

## Authorization

The user authorized creation of a unified Phase 36 specification for review only.

The prompt did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- `origin/main`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- Existing user edit to `planning/phase-35/REVIEW-CHECKLIST.md`: preserved.
- Existing Phase 36 planning/progress artifacts from progress ID `292`: preserved.

## Specification Work Completed

- Created `planning/specs/phase-36/PHASE-36-LEADERBOARD-STATS-ACTIVE-GAMES-SETTINGS-SPEC-2026-06-28.md`.
- Updated `planning/README.md` so Phase 36 specs are discoverable.
- Appended the matching 12-column CSV row to `progress/PROGRESS.csv`.

The unified Phase 36 specification locks scope around:

- adding a first-class `Leaderboard` main tab between `Stats` and `Words`;
- moving public ranked leaderboard and competitive multiplayer rating content from Stats to Leaderboard;
- keeping local/personal gameplay stats in Stats;
- repairing Active Games safe-name behavior from creator and joined-player perspectives;
- replacing reset-link wording in signed-in password-update failures;
- reordering/consolidating Settings around Gameplay, Sound effects, Notifications, and Account management;
- keeping migration/RLS addendum planning gated unless Active Games cannot be repaired source-only.

## Routing Decisions

- Gameplay auto-scroll and browser back/forward navigation remain routed to Phase 37.
- Public/guest spectation, spectator presence, public/social profile browsing, private matchmaking, public site stats, developer dashboard, onboarding/help/tutorials, theme work, service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes remain deferred to later gated phases.

## Verification

Lightweight documentation verification passed after the spec/progress edits:

- `git diff --check`
  - Result: passed with no output.
- Python CSV shape check using `python3 -S`
  - Result: `rows=295 columns=[12] last_id=293`.
- non-printing secret/artifact scan over changed tracked and untracked repository files
  - Result: `scanned_files=7 credential_pattern_hits=0 changed_artifacts=0`.
- ignored-artifact check confirming forbidden local artifacts are not tracked or staged
  - Result: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch`
  - Result: completed; branch remained `main` tracking `origin/main`, with planning/progress/spec edits plus the preserved user-edited Phase 35 review checklist.

## Boundaries Preserved

No source/runtime code, tests, Supabase migrations, Vercel or Supabase configuration, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review the unified Phase 36 specification. If approved, authorize creation of the detailed Phase 36 implementation plan before Stage 36.0 baseline, implementation, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
