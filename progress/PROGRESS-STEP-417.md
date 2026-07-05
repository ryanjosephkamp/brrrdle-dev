# Progress Step 417 - Phase 46 Stage 46.2

**Status:** Completed - Awaiting User Review Before Stage 46.3
**Phase:** Phase 46 - Solo Sync Integrity and Manual Review Follow-Up
**Stage:** Stage 46.2 - Source-Only Versus Storage-Contract/Supabase/Session-Lease Decision
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-05T19:13:19Z
**Completed:** 2026-07-05T19:14:28Z

## Authorization

The user authorized Phase 46 Stage 46.2 only: documentation/planning decision for whether the signed-in Solo Daily/Practice automatic sync and freshness repair can remain source-only or requires a storage-contract, Supabase/RLS, or session-lease addendum.

Authorized work included confirming repository state, preserving the user-updated Phase 45 review checklist, reading Phase 46 planning/spec/implementation materials and Stage 46.1 findings, deciding the Stage 46.3 path, creating this progress report, appending the matching 12-column CSV row, and running lightweight verification.

This pass did not authorize source/runtime implementation, test implementation, Supabase migrations, storage schema changes, destructive local cleanup, deployment/configuration, Git/GitHub actions, backup workflow execution, gameplay-rule changes, Elo changes, secret/private data exposure, local session artifact exposure, or original stable repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed repository basename: `brrrdle-dev`.
- Confirmed branch: `main`.
- Confirmed `HEAD`: `aef8dba063e57cd5381852a66b9a0006fe52bf39`.
- Confirmed `origin/main`: `aef8dba063e57cd5381852a66b9a0006fe52bf39`.
- Confirmed remote: `https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved `planning/phase-45/REVIEW-CHECKLIST.md`.

## Decision

Stage 46.3 can remain source/test-only using the existing `progress_snapshots` cloud persistence contract.

No storage-contract, Supabase/RLS, RPC, revision/locking, server-authoritative Daily, destructive-cleanup, broad-sync-replacement, or one-session-lease addendum is required before Stage 46.3.

Rationale:

- `progress_snapshots` already exists as the user-owned cloud progress table, and `docs/supabase.md` records owner RLS for user-owned tables.
- `createSupabaseProgressRepository()` already provides authenticated browser download/upload through `progress_snapshots`.
- `loadAuthenticatedProgressForScope()` already downloads account-owned cloud progress on auth hydration without uploading guest progress.
- `syncGuestProgress()` already uploads/merges active progress to the authenticated user's cloud row and preserves offline/error fallback semantics.
- Stage 46.1 found the gap in client timing: signed-in Solo resume captures update active in-memory progress but do not automatically invoke the existing cloud sync path.
- The Phase 45 guest/account boundary remains intact because authenticated progress is intentionally excluded from guest local storage and sign-in hydration does not upload guest state.

## Stage 46.3 Source-Only Repair Boundary

Stage 46.3 may implement the smallest source/test repair that:

- adds automatic signed-in Solo cloud persistence through existing `progress_snapshots`;
- syncs Daily Solo after meaningful signed-in valid-guess/resume-slot changes, with Daily treated as the highest anti-cheat priority;
- supports Practice Solo with a bounded debounce or lower-frequency automatic persistence path if safe;
- refreshes authenticated Solo progress on safe focus/visibility/route-entry moments only when doing so cannot overwrite newer local signed-in work;
- keeps same-browser tab freshness source-only and account-scoped if implemented, using browser-local signaling without writing authenticated progress to guest storage;
- preserves manual `Sync now` as a recovery/control path;
- keeps uploads authenticated-only and owner-scoped;
- avoids printing or exposing private progress payloads;
- preserves offline/error behavior without destroying local signed-in progress;
- prevents implicit guest-to-account transfer;
- prevents authenticated progress from being written into guest local storage;
- preserves sign-out guest-safe rehydration;
- preserves existing `progress_snapshots` shape, grants, policies, and RLS.

## Required Stop Conditions For Stage 46.3

Stage 46.3 must stop and route to addendum planning if implementation proves any of these are required:

- server-authoritative Daily Solo move submission;
- atomic Daily Solo conflict prevention that cannot be expressed with the existing client-side snapshot contract;
- new `progress_snapshots` revision fields, locking fields, triggers, or server-side merge helpers;
- new table, RPC, direct browser grant, RLS policy, or Supabase migration;
- storage schema migration or destructive local cleanup;
- changed guest-to-account transfer semantics;
- broad sync architecture replacement;
- strict one-active-session enforcement, server-side leases, heartbeats, invalidation, or forced sign-out;
- gameplay-rule, Daily answer, scoring, streak, XP/coin, or Elo changes.

## Session Enforcement Decision

One-active-session enforcement remains deferred.

Stage 46.1 did not show that a session lease is necessary to explain or repair the current stale signed-in Solo behavior. Automatic authenticated upload/download, safe refresh timing, and optional source-only tab freshness should be attempted first. A future session-lease/security phase may revisit strict one-session behavior only after stale-lock, mobile backgrounding, offline, and unsynced-progress recovery requirements are planned.

## Addendum Status

No addendum was created.

Potential addendum path remains reserved only if a later gate proves it necessary:

- `planning/specs/phase-46/PHASE-46-SOLO-SYNC-STORAGE-CONTRACT-ADDENDUM-2026-07-05.md`

## Verification

Passed lightweight Stage 46.2 verification:

- `git diff --check`
- Progress CSV shape check using `python3 -S`: `rows=419 columns=[12] last_id=417`
- Non-printing changed/untracked file credential-value scan: `scanned_files=14 credential_value_hits=0 binary_skipped=0`
- Ignored-artifact check: `tracked_files=1100 staged_files=0 forbidden_artifact_hits=0`
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear.
- `git status --short --branch`

## Files Changed By This Stage

- `progress/PROGRESS-STEP-417.md` - created this Stage 46.2 decision progress report.
- `progress/PROGRESS.csv` - appended the matching 12-column progress row for ID 417.

## Blockers and Open Questions

No blockers.

Open questions for Stage 46.3:

- Whether Daily Solo should sync on every valid submitted guess or every meaningful resume-slot capture.
- Whether Practice Solo should use identical triggers, a debounce, or route/focus timing.
- How to represent pending local signed-in work so focus/visibility refresh does not clobber it.
- Whether same-browser tab freshness is worth adding in Stage 46.3 or should be left to manual refresh/cloud hydration behavior.
- Whether the source-only repair should explicitly document that it reduces but does not fully eliminate intentional multi-tab Daily cheating without server authority.

## Boundary Confirmation

No source/runtime code, tests, migrations, storage schema changes, destructive local cleanup, deployment/configuration, staging, commits, pushes, PRs, merges, backup workflow execution, spectator presence/count/list work, service worker/push work, gameplay-rule changes, Elo changes, secret/private data exposure, local session artifact exposure, or stable `brrrdle` repository work was performed.

## Next Gate

The next safe action is Phase 46 Stage 46.3 automatic signed-in Solo sync/freshness repair, source/test-only, using the repair boundary above.
