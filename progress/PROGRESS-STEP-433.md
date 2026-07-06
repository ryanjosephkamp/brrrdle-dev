# Progress Step 433 - Phase 48 Unified Specification

**Phase:** Phase 48 specification
**Status:** Completed - Awaiting User Review Before Phase 48 Implementation Plan
**Date:** 2026-07-06
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`

## Authorization

The user authorized creation of a unified Phase 48 specification for review only.

This progress step does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, strict one-active-session/session-lease implementation, server-authoritative Daily implementation, broad mobile shell/top-tab/navigation overhaul, compact side-dock implementation, broad mobile performance overhaul, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, local Codex skill changes, or original stable repository work.

## Baseline

- Expected local `main`: `f3dab778906edc4dad6c8c34365c8354c1affb1f`
- Expected `origin/main`: `f3dab778906edc4dad6c8c34365c8354c1affb1f`
- Preserved manual review artifact: `planning/phase-47/REVIEW-CHECKLIST.md`
- Phase 48 planning brief: `planning/phase-48/PLANNING-BRIEF.md`
- Latest completed progress record before this pass: `progress/PROGRESS-STEP-432.md`

## Created Specification

- `planning/specs/phase-48/PHASE-48-PROFILE-AND-MULTIPLAYER-CONTRACT-SIMPLIFICATION-SPEC-2026-07-06.md`

The unified specification locks Phase 48 around profile/public-profile/private-profile simplification, Profile/Settings account-management clarity, custom-code/private game routing, private Daily feasibility, ranked Daily contract decisioning, and early classification of the late Phase 47 real-mobile scroll-lag observation.

## Key Decisions

- The late Phase 47 mobile scroll-lag observation is non-blocking and must be classified early.
- If the scroll lag is a narrow recent auto-scroll regression, it can be routed as a tiny source/test repair before deeper implementation.
- If the scroll lag is broader mobile performance, shell, tab navigation, compact side-dock, or layout work, it remains deferred to a later mobile polish phase.
- Phase 48 remains primarily a profile and multiplayer contract simplification phase.
- Any migration/RLS, storage-contract, Supabase, session, server-authoritative Daily, gameplay-rule, or Elo requirement must stop implementation and trigger addendum planning.
- Strict one-active-session/session leases, server-authoritative Daily submissions, broad mobile performance overhaul, broad mobile shell work, gameplay-rule changes, and Elo changes remain deferred.

## Files Changed

- `planning/specs/phase-48/PHASE-48-PROFILE-AND-MULTIPLAYER-CONTRACT-SIMPLIFICATION-SPEC-2026-07-06.md` - created the unified Phase 48 specification.
- `planning/README.md` - updated the specs index now that the Phase 48 spec exists.
- `progress/PROGRESS-STEP-433.md` - recorded this specification pass.
- `progress/PROGRESS.csv` - appended the matching 12-column progress row.

## Verification

Passed:

- `git diff --check`
- progress CSV shape check: `rows=435 columns=[12] last_id=433`
- non-printing changed/untracked file credential-value scan: `scanned_files=9 credential_value_hits=0 binary_skipped=0`
- ignored-artifact check: `tracked_files=1132 staged_files=0 forbidden_artifact_hits=0`
- `git status --short --branch`

## Boundary Confirmation

All work in this pass targeted `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`. The original stable `brrrdle` repository was not touched.

## Next Safe Gate

Create the detailed Phase 48 implementation plan for review only. Do not begin implementation until the detailed implementation plan has been created and reviewed.
