# Progress Step 393 - Phase 44 Detailed Implementation Plan

**Status**: Completed - Awaiting User Review Before Stage 44.0 Baseline
**Phase**: Phase 44 - Account-Scoped Local State Isolation And Phase 43 Manual Review Follow-Up
**Stage**: Detailed implementation plan
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-04T22:33:44Z
**Completed**: 2026-07-04T22:33:44Z

## Authorization

The user authorized creation of a detailed Phase 44 implementation plan for review only. Authorized work included reading governance, roadmap, completed Phase 43 materials, the Phase 44 intake/routing document, the Phase 44 planning brief, the unified Phase 44 specification, phase scope sizing guidance, current progress records, account/guest persistence surfaces, auth/sign-out/sync surfaces, Daily and Practice Solo storage surfaces, History, Leaderboard, Active Multiplayer, Settings, Stats, private Practice request eligibility surfaces, ranked queue fairness context, relevant tests, Supabase/RLS context as needed, and local workflow docs enough to create an actionable staged implementation plan.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `173a82951927d134ae4f60e0250444a41916cab5`.
- `origin/main`: `173a82951927d134ae4f60e0250444a41916cab5`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-43/REVIEW-CHECKLIST.md` was preserved.
- No files were staged, committed, pushed, merged, deployed, or released.

## Implementation Plan Created

Created:

- `planning/phase-44/IMPLEMENTATION-PLAN.md`
- `progress/PROGRESS-STEP-393.md`

Updated:

- `planning/README.md`
- `progress/PROGRESS.csv`

## Major Staging Decisions

- Stage 44.0 is a protected baseline and intake confirmation gate only.
- Stage 44.1 is a read-only account and guest state boundary audit before any repair.
- Stage 44.2 is the account-scoped local state repair only if Stage 44.1 proves source/test-only repair is safe.
- Storage-contract addendum planning is required before destructive local cleanup, guest-progress schema changes, account-specific storage migration, changed guest-to-account transfer semantics, cloud progress contract changes, or Supabase work.
- Stage 44.3 handles boundary regression, private Practice request eligibility, and ranked queue third-player fairness classification after the state-boundary repair is stable.
- Stage 44.4 is limited to small source-only UI follow-ups: sign-in order, global header chip removal, Stats public-site placement, and Help placeholder.
- Stage 44.5 is limited to gameplay keyboard centering if source-only and safe.
- Stage 44.6 is final hardening, visual review, changelog, and manual checklist, then halt before Git handoff.

## Open Decisions

- Whether account isolation can be repaired source-only or needs a storage-contract addendum.
- Whether guest-to-account transfer should remain automatic, become explicit, or be preserved with stricter overwrite guards.
- Whether sign-out should rehydrate a separate guest snapshot or reset account-owned surfaces to guest-safe defaults.
- Whether private Practice request eligibility is source/UI staleness or a database predicate issue.
- Whether the ranked queue third-player fairness issue reproduces with fully compatible waiting players after the Phase 43 migration.
- Whether Help should become a minimal placeholder or retain a reduced route guide until later tutorial work.

## Verification

Lightweight documentation verification passed:

- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: passed, `rows=395 columns=[12] last_id=393`.
- Non-printing secret/artifact scan over changed tracked and untracked repository files: passed, `scanned_files=12 credential_pattern_hits=0`.
- Ignored-artifact check: passed, `tracked_files=1058 staged_files=0 forbidden_artifact_hits=0`.
- `git status --short --branch`: completed with expected Phase 44 planning/progress changes and preserved user-updated Phase 43 checklist.

## Blockers

No implementation-plan blocker remains.

## Boundary Confirmation

No source/runtime implementation, test implementation, migration creation or execution, Supabase/Vercel configuration, deployment, staging, commit, push, PR creation, merge, release, branch deletion, spectator presence/count/list implementation, service worker or push infrastructure work, gameplay-rule change, Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, local Codex skill creation/modification, or original stable repository work was performed.

## Next Gate

Review `planning/phase-44/IMPLEMENTATION-PLAN.md`. If approved, authorize Phase 44 Stage 44.0 protected baseline and intake confirmation only.
