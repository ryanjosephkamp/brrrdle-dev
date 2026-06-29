# Progress Step 292: Phase 35 Manual Review Processing And Phase 36 Planning Brief

**Date:** 2026-06-28
**Phase:** Phase 36 - Leaderboard And Stats Navigation Split
**Stage:** Manual-review processing and planning brief
**Status:** Completed - Awaiting User Review

## Authorization

The user authorized a Phase 35 manual-review-results processing and next-planning decision pass only. If the Phase 35 manual review was clean, the user authorized creation of the Phase 36 planning brief only.

The prompt did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- `origin/main`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- Existing user edit to `planning/phase-35/REVIEW-CHECKLIST.md`: preserved.

## Manual Review Result

The Phase 35 manual review was clean. The user confirmed all checklist items pass.

The new observations were treated as Phase 36 planning inputs rather than Phase 35 blockers:

- Active Games can still show generic `Rival` labels where safe public/profile names should appear.
- Signed-in password-change failures can still show reset-link wording in a path that does not send reset links.
- Settings section order and `Sound Effects` capitalization need small cleanup.
- The previously routed Leaderboard tab and Stats split remains the recommended Phase 36 feature direction.

## Planning Work Completed

- Created `planning/phase-36/PLANNING-BRIEF.md`.
- Updated `planning/README.md` so Phase 36 is discoverable from the planning hub.
- Appended the matching 12-column CSV row to `progress/PROGRESS.csv`.

The Phase 36 brief recommends a tightly scoped current-surface pass:

- Add a `Leaderboard` main tab between `Stats` and `Words`.
- Move public ranked leaderboard and competitive multiplayer rating content out of Stats into Leaderboard.
- Leave local/personal gameplay statistics in Stats.
- Repair Active Games safe-name hydration using existing safe identity data if available.
- Improve signed-in password-update failure copy.
- Reorder and consolidate current Settings sections around Gameplay, Sound effects, Notifications, and Account management.

## Deferred Routing

- Gameplay auto-scroll and browser back/forward navigation remain routed to Phase 37.
- Public/guest spectation, spectator presence lists/counts, public/social profile expansion, private matchmaking/custom-code expansion, public site stats, private developer dashboard, onboarding/help/tutorials, theme modernization, service workers, push subscriptions, production deployment, release, gameplay-rule changes, and Elo algorithm changes remain deferred to later gated phases.

## Verification

Lightweight documentation verification passed after the planning/progress edits:

- `git diff --check`
  - Result: passed with no output.
- Python CSV shape check using `python3 -S`
  - Result: `rows=294 columns=[12] last_id=292`.
- non-printing secret/artifact scan over changed tracked and untracked repository files
  - Result: `scanned_files=5 credential_pattern_hits=0 changed_artifacts=0`.
- ignored-artifact check confirming forbidden local artifacts are not tracked or staged
  - Result: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch`
  - Result: completed; branch remained `main` tracking `origin/main`, with planning/progress edits plus the preserved user-edited Phase 35 review checklist.

## Boundaries Preserved

No source/runtime code, tests, Supabase migrations, Vercel or Supabase configuration, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review the Phase 36 planning brief. If approved, authorize creation of the unified Phase 36 specification before implementation, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
