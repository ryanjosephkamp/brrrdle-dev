# Progress Step 392 - Phase 44 Unified Specification

**Status**: Completed - Awaiting User Review Before Detailed Phase 44 Implementation Plan
**Phase**: Phase 44 - Account-Scoped Local State Isolation And Phase 43 Manual Review Follow-Up
**Stage**: Unified specification
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-04T22:10:54Z
**Completed**: 2026-07-04T22:10:54Z

## Authorization

The user authorized creation of a unified Phase 44 specification for review only. Authorized work included reading governance, roadmap, completed Phase 43 materials, the Phase 44 manual review intake/routing document, the Phase 44 planning brief, phase scope sizing guidance, current progress records, account/guest persistence surfaces, auth/sign-out/sync surfaces, Daily and Practice Solo storage surfaces, History, Leaderboard, Active Multiplayer, Settings, Stats, private Practice request eligibility surfaces, ranked queue fairness context, relevant tests, Supabase/RLS context as needed, and local workflow docs enough to create an implementation-oriented Phase 44 spec.

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

## Specification Created

Created:

- `planning/specs/phase-44/PHASE-44-ACCOUNT-SCOPED-LOCAL-STATE-AND-MANUAL-REVIEW-FOLLOW-UP-SPEC-2026-07-04.md`

Updated:

- `planning/README.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-392.md`

## Major Specification Decisions

- Phase 44 remains anchored on account-scoped local state isolation and guest/account boundary repair.
- Signed-in versus signed-out state bleed, guest overwrite prevention, Daily Solo OG/GO protection, Practice Solo OG/GO protection, History, Leaderboard/rating summaries, Active Multiplayer, Settings, and Stats sign-out behavior are the primary reliability surface.
- The private Practice request active-public-profile eligibility bug is included as an audit/repair item only if source/test-only; a migration/RLS addendum is required if the RPC predicate is wrong.
- The ranked Practice third-player fairness concern is included as a reproduction/classification item; a migration/RLS addendum is required if the trusted queue RPC violates the Phase 43 fairness contract.
- Small UI follow-ups are included only after account-boundary work is stable and only if source/test-only: sign-in order, global header chip removal, Stats public-site placement, Help placeholder, and keyboard centering.
- Storage-contract addendum gates are explicitly required for destructive local cleanup, guest-progress schema changes, account-specific local storage migration, or changed guest-to-account transfer semantics.

## Deferred Routing

Explicitly deferred:

- Live/Active/Home previews;
- configurable Home widgets and private request inbox widgets;
- UTC/local timestamp policy;
- notification rival-name/ranked-context work;
- profile/data-contract simplification;
- admin queue/lobby observability;
- social inbox/mailbox;
- spectator presence/count/list;
- service workers and push;
- deployment/release;
- gameplay-rule changes;
- Elo changes.

## Verification

Lightweight documentation verification passed:

- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: passed, `rows=394 columns=[12] last_id=392`.
- Non-printing secret/artifact scan over changed tracked and untracked repository files: passed, `credential_pattern_hits=0`.
- Ignored-artifact check: passed, no forbidden artifacts staged or tracked.
- `git status --short --branch`: completed with expected planning/progress changes and preserved user-updated Phase 43 checklist.

## Blockers

No specification blocker remains.

## Boundary Confirmation

No source/runtime implementation, test implementation, migration creation or execution, Supabase/Vercel configuration, deployment, staging, commit, push, PR creation, merge, release, branch deletion, spectator presence/count/list implementation, service worker or push infrastructure work, gameplay-rule change, Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, local Codex skill creation/modification, or original stable repository work was performed.

## Next Gate

Review the unified Phase 44 specification. If approved, authorize creation of `planning/phase-44/IMPLEMENTATION-PLAN.md` for review only.
