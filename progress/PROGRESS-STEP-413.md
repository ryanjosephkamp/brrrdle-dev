# Progress Step 413 - Phase 46 Unified Specification

**Status:** Completed - Awaiting User Review Before Detailed Phase 46 Implementation Plan
**Phase:** Phase 46 - Solo Sync Integrity And Manual Review Follow-Up
**Stage:** Unified Phase 46 Specification
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-05T18:30:06Z
**Completed:** 2026-07-05T18:34:10Z

## Authorization

The user authorized creation of a unified Phase 46 specification for review only.

Authorized work included confirming repository state and the stable-repo boundary, preserving the user-updated Phase 45 review checklist, reading governance, roadmap, completed Phase 45 materials, the Phase 46 planning brief, phase scope sizing guidance, current progress records, account sync/local/cloud progress surfaces, Solo Daily/Practice storage and resume surfaces, sign-in/sign-out hydration surfaces, Solo Overview active-game selection source, mobile Solo auto-center/keyboard visibility surfaces, relevant tests, Supabase/RLS context as needed, local workflow docs, creating the unified Phase 46 spec, creating this progress report, appending the matching 12-column CSV row, and running lightweight documentation verification.

No source/runtime implementation, test implementation, Supabase migration creation or execution, storage schema change, Vercel or Supabase configuration, deployment, staging, commit, push, PR creation, merge, release, branch deletion, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule change, Elo change, secret/private-data/local-session-artifact exposure, brrrdle GitHub backup workflow execution, local Codex skill modification, or original stable `brrrdle` repository work was authorized or performed.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Stable repository boundary: preserved; no original stable `brrrdle` repository path was used.
- Current branch: `main`.
- Expected baseline: local and remote `main` at `aef8dba063e57cd5381852a66b9a0006fe52bf39`.
- Preserved user-updated checklist: `planning/phase-45/REVIEW-CHECKLIST.md`.

## Specification Created

Created:

- `planning/specs/phase-46/PHASE-46-SOLO-SYNC-INTEGRITY-AND-MANUAL-REVIEW-FOLLOW-UP-SPEC-2026-07-05.md`

The specification locks Phase 46 around:

- signed-in Solo Daily/Practice automatic sync and anti-cheat audit;
- cross-tab/cross-browser account progress freshness;
- source-only versus Supabase/storage-contract decisioning;
- prevention of guest/account transfer regressions;
- Solo Overview `Select` button removal or meaningful-function decision;
- narrow mobile Solo pre-guess keyboard visibility.

## Major Decisions

- Phase 46 should first audit and improve automatic signed-in Solo freshness through existing cloud progress paths where safe.
- One-active-session enforcement must be evaluated but should not be assumed; it remains a later optional session-lease/security feature unless audit evidence proves it is required.
- Storage-contract/Supabase addendum planning is required before any server-authoritative Daily Solo progress, new RPC/table, RLS change, or session-lease work.
- The Solo Overview `Select` button should be removed unless audit evidence proves a meaningful hidden function.
- The mobile Solo issue should remain a narrow pre-guess keyboard visibility follow-up, not a broad mobile shell/top-tab/navigation overhaul.

## Deferred Routing

Explicitly deferred:

- broad mobile shell/top-tab/navigation overhaul;
- configurable Home widgets;
- Live/Active/Home spectator previews;
- notification redesign and notification rival/ranked-context work;
- UTC/local timestamp policy changes;
- profile/data-contract simplification;
- admin queue/lobby observability dashboard;
- social inbox/mailbox;
- spectator presence/count/list;
- public/guest spectator contract changes;
- service workers and push infrastructure;
- deployment/release;
- gameplay-rule changes;
- Elo changes.

## Verification

Passed:

- `git diff --check`
- Progress CSV shape check: `rows=415 columns=[12] last_id=413`
- Non-printing changed/untracked file credential-value scan: `scanned_files=9 credential_value_hits=0 binary_skipped=0`
- Ignored-artifact check: `tracked_files=1100 staged_files=0 forbidden_artifact_hits=0`
- `git status --short --branch`

## Preserved Boundaries

- Phase 45 checklist edits from the user were preserved.
- Phase 45 Daily/Practice Solo guest/auth repairs were not changed.
- Phase 44 account-scoped repairs were not changed.
- Phase 43 ranked fairness/current-surface cleanup was not changed.
- Phase 42 stats/dashboard/help contracts were not changed.
- Phase 41 multiplayer reliability was not changed.
- Phase 40 public profile/private matchmaking boundaries were not changed.
- Phase 39 mobile scroll smoothness was not changed.
- Phase 38 spectator boundaries were not changed.
- Daily claim safety, gameplay rules, and Elo math were not changed.

## Blockers

No blockers.

## Next Gate

If verification passes, the next safe gate is a detailed Phase 46 implementation plan for review only.
