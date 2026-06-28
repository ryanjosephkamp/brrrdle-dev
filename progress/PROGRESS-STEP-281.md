# Progress Step 281: Phase 35 Unified Specification

**Date:** 2026-06-27
**Phase:** Phase 35 - Auth, Profile, Deployment, And Live Identity Readiness
**Stage:** Unified specification
**Status:** Completed - Awaiting User Review Before Phase 35 Implementation Plan

## Authorization

The user authorized creation of a unified Phase 35 specification for review only. The pass included reading governance, roadmap, completed Phase 34 materials, the Phase 35 planning brief, current progress records, Live identity surfaces, auth/account/profile/deployment surfaces, relevant tests, Supabase/RLS context as needed, local workflow docs, and user-provided screenshots enough to create an implementation-oriented Phase 35 spec.

The prompt did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- `origin/main`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- Existing user edits to `planning/phase-34/REVIEW-CHECKLIST.md`: preserved.

## Work Completed

Created:

- `planning/specs/phase-35/PHASE-35-AUTH-PROFILE-DEPLOYMENT-AND-LIVE-IDENTITY-READINESS-SPEC-2026-06-27.md`
- `progress/PROGRESS-STEP-281.md`

Updated:

- `planning/README.md`
- `progress/PROGRESS.csv`

## Key Decisions

- Locked Phase 35 around the persistent ranked Live participant/spectator safe-name regression, auth/deployment readiness, account-management cleanup, and current-player Profile tab readiness.
- Required Stage 35.1 to audit ranked Live identity first and decide whether Stage 35.2 is source-only or requires a migration/RLS addendum.
- Included Vercel deployment protection and Supabase auth redirect diagnosis, but kept external configuration changes gated.
- Included auth copy, password reset/change-password, and email-change evaluation behind clear source-only/configuration gates.
- Included a first-class current-player Profile tab in Phase 35 v1 if the detailed implementation plan confirms it can remain source-only and privacy-safe.
- Routed the Leaderboard tab and Stats split to Phase 36, gameplay auto-scroll and browser history to Phase 37, public/spectator work to Phase 38 or later, profile/social/private matchmaking to Phase 39 or later, stats/dashboard/onboarding to Phase 40 or later, and theme work to Phase 41 or later.

## Verification

Passed for this pass:

- `git diff --check`
- progress CSV shape check using `python3 -S`: `rows=283 columns=[12] last_id=281`
- whitespace scan over changed tracked and untracked repository files: `whitespace_scanned_files=9 trailing_whitespace_hits=0`
- non-printing secret/artifact scan over changed tracked and untracked repository files: `scanned_files=9 credential_pattern_hits=0 changed_artifacts=0`
- ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- `git status --short --branch`

Note: an initial over-broad credential scanner flagged `progress/PROGRESS.csv` because prior progress history contains the literal non-secret governance phrase `service_role`. A category-only follow-up confirmed fourteen phrase-level hits, not a credential assignment or key value. The refined credential-shaped scan above passed without hits.

## Boundaries Preserved

No source/runtime code, tests, migrations, Vercel/Supabase configuration, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work was performed.

## Next Step

Review the unified Phase 35 specification. If approved, explicitly authorize creation of the detailed Phase 35 implementation plan before any implementation, tests, migrations, Vercel/Supabase configuration, deployment, Git/GitHub operations, backup workflow execution, or original stable repository work.
