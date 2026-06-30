# Progress Step 312: Phase 38 Implementation Plan

## Status

Completed - Awaiting User Review.

## Authority

User authorized creation of a detailed Phase 38 implementation plan for review only. This pass created an actionable staged implementation plan from the approved Phase 38 planning brief, unified specification, current repository context, and governing documents.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `cdd780989535a3081a5e034bde1a247569ca28af`
- `origin/main`: `cdd780989535a3081a5e034bde1a247569ca28af`
- Existing user edit to `planning/phase-37/REVIEW-CHECKLIST.md`: preserved and not edited in this pass.

## Implementation Plan Summary

- Created `planning/phase-38/IMPLEMENTATION-PLAN.md`.
- Updated `planning/README.md` for Phase 38 implementation-plan discoverability.
- Staged Phase 38 as:
  - Stage 38.0 protected baseline;
  - Stage 38.1 public/spectator data, RLS, privacy, and abuse audit;
  - Stage 38.2 public spectator migration/RLS addendum planning;
  - Stage 38.3 public spectator migration/RLS execution;
  - Stage 38.4 public/guest Live discovery and read-only spectation source integration;
  - Stage 38.5 spectator presence/count/list gate and optional implementation only if safe;
  - Stage 38.6 final hardening, E2E, visual review, changelog, and manual checklist.

## Key Decisions

- Stage 38.1 should expect a migration/RLS addendum before public/guest spectator implementation unless a source-only safe path is proven unexpectedly.
- Stage 38.3 must create exactly one additive migration only after explicit authorization and only against the confirmed `brrrdle-dev` Supabase project.
- Stage 38.4 must use strict repository parser defenses and capability checks so public/guest viewers cannot mutate game, account, profile, queue, notification, rating, timer, claim, or local persistence state.
- Stage 38.5 is a gate, not an automatic feature stage. Aggregate display-only counts are preferred if included; identity-bearing spectator lists should be deferred if they risk becoming social/profile browsing ahead of Phase 39.
- Public/social profile browsing, clickable rival profiles, direct match requests, private matchmaking expansion, public site stats, developer dashboard, onboarding/help/tutorial UX, progression HUD counters, Focus Mode, theme work, service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes remain deferred.

## Verification

- `git diff --check`
  - Result: passed.
- Progress CSV shape check using `python3 -S`
  - Result: passed, `rows=314 columns=[12] last_id=312`.
- Non-printing secret/artifact scan over changed tracked and untracked repository files
  - Result: initial broad wording scan flagged existing progress-ledger false positives around credential-boundary terminology; refined credential-shaped scan passed, `scanned_files=9 credential_pattern_hits=0`.
- Ignored-artifact check
  - Result: passed, `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch`
  - Result: completed; expected user-edited Phase 37 review checklist, Phase 38 planning/spec/progress artifacts, implementation plan, and planning index update remain unstaged.

## Boundaries Preserved

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work was performed.

## Next Step

Review the detailed Phase 38 implementation plan. If approved, explicitly authorize Phase 38 Stage 38.0 protected baseline before audits, source implementation, test implementation, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
