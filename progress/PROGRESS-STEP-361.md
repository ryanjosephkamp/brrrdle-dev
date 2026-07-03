# Progress Step 361 - Phase 42 Implementation Plan

**Status**: Completed - Awaiting User Review Before Stage 42.0
**Date**: 2026-07-03
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Baseline**: local `HEAD` and `origin/main` confirmed at `7acff9d4d414533afb2930cc7fa547cec8abfee9`

## Authorization

The user authorized creation of a detailed Phase 42 implementation plan for review only.

Authorized work included reading Phase 42 planning/specification context, completed Phase 41 materials, governance, roadmap/testing context, relevant source/test surfaces as needed, creating `planning/phase-42/IMPLEMENTATION-PLAN.md`, updating `planning/README.md` only if needed, recording progress ID `361`, appending the matching 12-column progress CSV row, and running lightweight documentation verification.

Not authorized: source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, local Codex skill creation/modification, or original stable `brrrdle` repository work.

## Work Completed

- Confirmed repo boundary and baseline:
  - `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
  - branch: `main`
  - local `HEAD`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`
  - `origin/main`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`
  - remote: `https://github.com/ryanjosephkamp/brrrdle-dev.git`
- Preserved the user-updated `planning/phase-41/REVIEW-CHECKLIST.md`.
- Created `planning/phase-42/IMPLEMENTATION-PLAN.md`.
- Updated `planning/README.md` to include Phase 42 implementation-plan discoverability.
- Appended progress ID `361` to `progress/PROGRESS.csv`.

## Implementation Plan Decisions

The detailed plan keeps Phase 42 as a cohesive macro-phase around:

- public live-site stats;
- private developer/admin dashboard;
- onboarding, help, and tutorial UX;
- narrow ranked Practice queue button/status flashing follow-up.

The plan breaks execution into narrow stages:

- Stage 42.0 - Protected baseline and review intake.
- Stage 42.1 - Observability, onboarding, and queue-flash audit.
- Stage 42.2 - Ranked Practice queue button/status flashing follow-up.
- Stage 42.3 - Stats/dashboard migration/RLS addendum or source-only decision.
- Stage 42.4 - Migration/RLS execution only if separately authorized.
- Stage 42.5 - Public stats and private developer dashboard source integration.
- Stage 42.6 - Onboarding, help, and tutorial UX.
- Stage 42.7 - Final hardening, visual review, changelog, and manual checklist.

The remaining ranked Practice queue flashing issue is routed as an early source/test-only follow-up only if Stage 42.1 proves the cause is bounded. If it requires migration/RLS, settlement, matching-rule, gameplay, or Elo changes, Stage 42.2 must stop and route to a safer gate.

## Verification

Lightweight documentation verification passed after documentation updates:

- `git diff --check` passed.
- Python progress CSV shape check reported `rows=363 columns=[12] last_id=361`.
- Non-printing changed/untracked file credential scan reported `scanned_files=11 credential_pattern_hits=0`.
- Ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch` completed and showed the expected uncommitted Phase 42 planning/spec/progress artifacts plus the preserved Phase 41 checklist.

## Blockers

None.

## Next Gate

Review the Phase 42 implementation plan. If approved, authorize Stage 42.0 protected baseline only before Stage 42.1 audit, source/runtime implementation, test implementation, migration execution, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
