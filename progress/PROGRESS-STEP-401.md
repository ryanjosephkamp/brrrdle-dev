# Progress Step 401 - Phase 45 Planning Brief

**Status:** Completed - Awaiting User Review Before Unified Phase 45 Specification
**Phase:** Phase 45 - Solo Cloud Progress Boundaries And Mobile Follow-Up
**Stage:** Planning Brief
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-05T03:20:00Z
**Completed:** 2026-07-05T03:36:31Z

## Authorization

The user authorized a Phase 44 manual-review-results processing and Phase 45 planning decision pass only.

If Phase 45 planning was safe, the user authorized creation of the Phase 45 planning brief only.

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commit, push, PR creation, merge, release, branch deletion, spectator presence/count/list implementation, service worker or push infrastructure work, gameplay-rule change, Elo algorithm change, force-push, secret/private-data/local-artifact exposure, `brrrdle-github-backup` workflow execution, local Codex skill creation/modification, or original stable `brrrdle` repository work was authorized or performed.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Stable repository boundary: preserved; no original stable `brrrdle` repository path was used.
- Expected local and remote `main`: `ff27dd81ecb6b91868fd024247f03950aa04a898`.
- Preserved user-updated checklist: `planning/phase-44/REVIEW-CHECKLIST.md`.

## Manual Review Results Processed

Phase 44 manual review was not fully clean. It passed overall, but produced one failed follow-up item:

- `Daily Solo OG/GO account boundaries are protected` failed.

The user reported that guest Daily Solo OG/GO guesses in separate browser profiles carried into the same signed-in account after sign-in, and signed-in Daily guesses remained visible as guest progress after sign-out. This was routed as an urgent Phase 45 account/cloud persistence issue rather than a routine UI follow-up.

Two passed-with-follow-up observations were also routed:

- Profile embedded guest sign-in panel still shows Magic link before Email + password.
- Solo keyboard centering works, but mobile Solo gameplay scaling appears too large and can hide the submitted first guess while keeping the keyboard visible.

## Planning Decision

Phase 45 planning was safe to create because:

- the failed Daily Solo item is clear enough to plan without source implementation;
- the likely solution space needs a staged audit and possible storage-contract/Supabase addendum gate;
- the issue is urgent enough to lead the next phase before preview/social/profile expansion work resumes;
- Profile sign-in order and mobile Solo scaling can remain bounded follow-ups if they stay source/test-only.

## Files Changed

- Created `planning/phase-45/PLANNING-BRIEF.md` for Phase 45 scope, stage breakdown, gates, verification, and next prompt.
- Updated `planning/README.md` so the planning hub routes future work to Phase 45.
- Updated `planning/ROADMAP.md` so Phase 44 is complete and Phase 45 is the next planning target.
- Updated `planning/ROADMAP-OPTIMIZED.md` so the optimized phase map routes Phase 45 to Solo cloud progress boundaries.
- Created `progress/PROGRESS-STEP-401.md`.
- Updated `progress/PROGRESS.csv`.

The user-updated `planning/phase-44/REVIEW-CHECKLIST.md` was preserved as manual-review evidence.

## Phase 45 Scope Summary

Phase 45 is locked around:

- urgent Daily Solo OG/GO guest/auth account-boundary audit and repair planning;
- cross-browser signed-in cloud persistence expectations;
- sign-in hydration and sign-out rehydration boundaries;
- prevention of implicit guest-to-account progress transfer;
- evaluation of whether Solo Daily/Practice progress requires a cloud-backed authenticated persistence contract;
- storage-contract and Supabase/RLS addendum gates if database-backed Solo progress changes are needed;
- real browser/E2E strategy for two-browser guest/auth Daily Solo boundary reproduction;
- Profile embedded sign-in order follow-up;
- narrow mobile Solo gameplay responsive-scaling follow-up.

## Routed And Deferred Work

Routed to later phases:

- broad mobile shell/top-tab/navigation overhaul;
- configurable Home widgets and private request inbox widgets;
- Live/Active/Home spectator previews;
- UTC/local timestamp policy changes;
- notification rival-name/ranked-context work;
- profile/data-contract simplification;
- admin queue/lobby observability dashboard;
- social inbox/mailbox;
- spectator presence/count/list;
- service workers/push;
- deployment/release;
- gameplay-rule changes;
- Elo changes;
- theme proposal modernization and concrete theme work.

## Verification

Passed:

- `git diff --check`
- Progress CSV shape check using `python3 -S`: `rows=402 columns=[12] last_id=401`
- Non-printing changed/untracked file credential-value scan: `scanned_files=7 credential_value_hits=0 binary_skipped=0`
- Ignored-artifact check: `tracked_files=1081 staged_files=0 forbidden_artifact_hits=0`
- `git status --short --branch`

## Blockers

No blocker prevents Phase 45 specification planning.

Phase 45 implementation should not begin until the unified specification and detailed implementation plan are reviewed and separately authorized.

## Next Gate

Create the unified Phase 45 specification for review only.
