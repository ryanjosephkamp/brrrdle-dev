# Progress Step 334 - Phase 40 Implementation Plan

**Status**: Completed - Awaiting User Review
**Phase**: Phase 40 - Public Profiles And Private Matchmaking
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T21:06:22Z
**Completed**: 2026-07-01T21:10:34Z

## Authorization

The user authorized creation of a detailed Phase 40 implementation plan for review only. This pass was authorized to read governance, roadmap, completed Phase 39 materials, the Phase 40 planning brief, the unified Phase 40 specification, phase scope sizing guidance, current progress records, public profile/privacy, multiplayer identity, private matchmaking, custom-code lobby, notification/routing, relevant tests, Supabase/RLS context, and workflow docs enough to create an actionable staged implementation plan.

Not authorized: source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work.

## Repo State

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Stable repository boundary: the original stable `brrrdle` repository was not used or touched.
- Branch: `main`.
- `HEAD`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- `origin/main`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- Preserved user edit: `planning/phase-39/REVIEW-CHECKLIST.md` remains checked off and was not modified by this pass.

## Work Completed

- Created `planning/phase-40/IMPLEMENTATION-PLAN.md`.
- Updated `planning/README.md` to include the Phase 40 implementation plan in the Phase 40 directory description.
- Appended progress ID `334` to `progress/PROGRESS.csv`.

## Major Staging Decisions

- Phase 40 remains a cohesive macro-phase, while implementation stages remain narrow and independently reviewable.
- Stage 40.0 is a protected baseline only.
- Stage 40.1 is a read-only public profile, private matchmaking, RLS, privacy, and routing audit.
- Stage 40.2 creates a migration/RLS addendum if the audit finds new database authority is required, or records an explicit source-only decision if no addendum is needed.
- Stage 40.3 executes only a separately reviewed and authorized migration/RLS contract.
- Stage 40.4 implements public profile routes/cards and clickable identity source integration.
- Stage 40.5 implements private/custom invitation or direct unranked/custom request behavior only within approved participant-scoped boundaries.
- Stage 40.6 performs final hardening, E2E, visual review, changelog, and manual checklist work.

## Open Decisions Routed To Stage 40.1

- Whether existing public profile RPCs are sufficient for source-only public profile route/card work.
- Whether profile routes should use opaque `public_profile_id` or only open from known safe contexts.
- Which surfaces receive clickable identity in v1.
- Whether private matchmaking v1 includes direct player requests, custom-code/private invitation cleanup, or both.
- Whether direct requests are limited to active public profiles or can originate from prior participant-scoped contexts.
- Which anti-abuse limits and real two-client E2E flows are mandatory.

## Verification

Passed lightweight documentation verification:

- `git diff --check`
- progress CSV shape check using `python3 -S`: `rows=336 columns=[12] last_id=334`
- non-printing credential-shaped secret/artifact scan over changed tracked and untracked repository files: `scanned_files=11 credential_pattern_hits=0`
- ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- `git status --short --branch`

Initial overbroad hygiene checks matched progress-ledger boundary wording and the tracked `.env.example` template. Those checks were refined to credential-shaped values and the explicit forbidden artifact list, then rerun cleanly without printing secrets.

## Blockers

No blockers at plan creation time.

## Next Safe Gate

Review the Phase 40 implementation plan. If approved, authorize Phase 40 Stage 40.0 protected baseline only before Stage 40.1 audit, source/runtime implementation, test implementation, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
