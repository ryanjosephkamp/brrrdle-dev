# Progress Step 271: Phase 34 Planning Brief

**Date:** 2026-06-26
**Phase:** Phase 34 - Multiplayer Live/Lobby/Notification Current-Surface Stabilization
**Stage:** Planning Brief
**Status:** Completed - Awaiting User Review Before Phase 34 Specification

## Authorization

The user authorized a Phase 34 planning brief pass only.

The prompt did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `95d0bad3c28761db78a016e95a54287f4b096ab8`
- `origin/main`: `95d0bad3c28761db78a016e95a54287f4b096ab8`
- Existing local user change preserved: `planning/phase-33/REVIEW-CHECKLIST.md` had user-completed checklist items before this pass.

## Work Completed

Created:

- `planning/phase-34/PLANNING-BRIEF.md`
- `progress/PROGRESS-STEP-271.md`

Updated:

- `planning/README.md`
- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `progress/PROGRESS.csv`

## Planning Decision

Phase 34 was routed to current Multiplayer Live/Lobby/notification stabilization rather than auth/deployment readiness.

Recommended Phase 34 v1 scope:

- fix selected Live subtab count readability;
- fix Live participant and authenticated spectator safe-name labels so opponents do not render as `You` and generic `Rival` appears only as fallback;
- add ranked/unranked labels to Live cards without exposing private rating data;
- replace Lobby `Open to join` friction with a direct guarded `Join` action where safe;
- route multiplayer-turn foreground browser notifications to the exact resumable game when possible;
- add stronger active-game `Your turn` visual cues.

## Routing Decisions

- Vercel magic-link login screen, Supabase redirect settings, account confirmation copy, password/email management, and Settings/Danger Zone cleanup were routed to Phase 35 auth/deployment/account-management readiness.
- Public/guest spectation and spectator count/list presence were routed to Phase 36 or later.
- Clickable public profiles, richer rival identity cards, custom-code private games, and direct player match requests were routed to Phase 37 or later.
- Public live site stats, private developer dashboard, onboarding, help, and tutorial UX were routed to Phase 38 or later.
- Theme proposal/template modernization was shifted behind those larger product surfaces, with full concrete themes later.

## Verification

Passed:

- `git diff --check`
- progress CSV shape check using `python3 -S`
  - Result: `rows=273 columns=[12] last_id=271`
- non-printing secret/artifact scan over changed tracked and untracked repository files
  - Result: `scanned_files=7 credential_pattern_hits=0 changed_artifacts=0`
- ignored-artifact check
  - Result: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`; existing ignored `test-results/` artifacts remain local-only.
- `git status --short --branch`

## Boundaries Preserved

No source/runtime implementation, tests, migrations, Vercel or Supabase configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work was performed.

## Next Step

Review the Phase 34 planning brief and routing decisions. If approved, explicitly authorize creation of the unified Phase 34 specification before any Phase 34 implementation, migration planning/execution, Git/GitHub operations, deployment, backup workflow execution, or original stable repository work.
