# Progress Step 414 - Phase 46 Detailed Implementation Plan

**Status:** Completed - Awaiting User Review Before Stage 46.0
**Phase:** Phase 46 - Solo Sync Integrity and Manual Review Follow-Up
**Stage:** Detailed Phase 46 Implementation Plan
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-05T18:47:54Z
**Completed:** 2026-07-05T18:49:54Z

## Authorization

The user authorized creation of a detailed Phase 46 implementation plan for review only.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, storage schema changes, destructive local cleanup, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, local Codex skill changes, or original stable repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed local branch: `main`.
- Confirmed `HEAD`: `aef8dba063e57cd5381852a66b9a0006fe52bf39`.
- Confirmed `origin/main`: `aef8dba063e57cd5381852a66b9a0006fe52bf39`.
- Confirmed remote: `https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved the user-updated Phase 45 checklist at `planning/phase-45/REVIEW-CHECKLIST.md`.

## Files Changed

- `planning/phase-46/IMPLEMENTATION-PLAN.md` - created the detailed staged execution plan for Phase 46.
- `progress/PROGRESS-STEP-414.md` - created this progress record.
- `progress/PROGRESS.csv` - appended the matching 12-column row for progress ID 414.

## Major Staging Decisions

Phase 46 was staged as:

1. Stage 46.0 protected baseline and manual-review intake confirmation.
2. Stage 46.1 Solo sync/session freshness audit and reproduction.
3. Stage 46.2 source-only versus storage-contract/Supabase/session-lease decision.
4. Stage 46.3 automatic signed-in Solo sync/freshness repair or addendum routing.
5. Stage 46.4 Solo Overview Select button cleanup.
6. Stage 46.5 mobile Solo pre-guess keyboard visibility follow-up.
7. Stage 46.6 final hardening, visual review, changelog, and manual checklist.

## Sync and Session Recommendation

The plan recommends improving automatic signed-in Solo Daily/Practice freshness first, using existing `progress_snapshots` if Stage 46.1 and Stage 46.2 prove source-only repairs are safe. One-active-session enforcement should not be assumed and remains a later optional session-lease/security feature unless evidence proves it is necessary.

## Select-Button Routing

The Solo Overview active-game `Select` button is routed to Stage 46.4. Stage 46.4 should remove it if audit confirms it only highlights or saves selected state without a meaningful gameplay function. If the audit finds a real hidden function, the stage should preserve the function and make the affordance clear.

## Mobile Keyboard Routing

The mobile Solo pre-guess keyboard clipping issue is routed to Stage 46.5 as a narrow visual/layout follow-up. Broad mobile shell, top-tab, and navigation overhaul remains deferred.

## Deferred Work

Phase 46 continues to defer broad mobile shell/top-tab/navigation overhaul, configurable Home widgets, spectator previews, notification redesign, timestamp policy changes, profile/data-contract simplification, admin observability, social inbox/mailbox, spectator presence/count/list, service workers/push, deployment/release, gameplay-rule changes, and Elo changes.

## Verification

Passed:

- `git diff --check`
- progress CSV shape check with `python3 -S`: `rows=416 columns=[12] last_id=414`
- non-printing changed/untracked file credential-value scan: `scanned_files=11 credential_value_hits=0 binary_skipped=0`
- ignored-artifact check: `tracked_files=1100 staged_files=0 forbidden_artifact_hits=0`
- `git status --short --branch`

## Blockers and Open Questions

- Open decision: whether existing `progress_snapshots` can safely support automatic signed-in Solo sync without schema/RLS changes.
- Open decision: which signed-in Solo sync triggers are safe enough for Daily and Practice without excessive writes or stale overwrite risk.
- Open decision: whether same-tab/same-browser freshness requires local broadcast or storage-event handling.
- Open decision: whether the Solo Overview `Select` button has any hidden route/cache function.
- Open decision: minimum mobile viewport sizes for the pre-guess keyboard visibility gate.

No implementation blocker was found during this planning pass.

## Boundary Confirmation

No source/runtime code, tests, migrations, storage schema changes, destructive local cleanup, deployment/configuration, Git/GitHub operations, backup workflow execution, spectator presence/count/list work, service worker/push work, gameplay-rule changes, Elo changes, secret/private data exposure, local session artifact exposure, local Codex skill changes, or stable `brrrdle` repository work was performed.

## Next Gate

The next safe action is Phase 46 Stage 46.0 protected baseline and manual-review intake confirmation only.
