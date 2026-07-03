# Progress Step 349 - Phase 41 Unified Specification

**Status**: Completed - Awaiting User Review Before Phase 41 Implementation Plan
**Phase**: Phase 41 - Multiplayer Reliability And Real E2E Hardening
**Stage**: Unified specification creation
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-02T21:12:52Z
**Completed**: 2026-07-02T21:12:52Z

## Authorization

The user authorized creation of a unified Phase 41 specification for review only.

This pass included reading governance, roadmap, completed Phase 40 materials, the Phase 41 planning brief, the Phase 41 reliability strategy intake, phase scope sizing guidance, current progress records, multiplayer reliability, ranked queue, leaderboard, private request, mobile freshness, notification/routing, relevant tests, Supabase/RLS context as needed, and local workflow docs enough to create an implementation-oriented Phase 41 spec.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Expected baseline: `c3d774bc8a611950f889f2f7a487be4e69844fc0`.
- The original stable `brrrdle` repository was not used or touched.
- The user-edited `planning/phase-40/REVIEW-CHECKLIST.md` was preserved.

## Specification Created

Created:

- `planning/specs/phase-41/PHASE-41-MULTIPLAYER-RELIABILITY-AND-REAL-E2E-SPEC-2026-07-02.md`

Updated:

- `planning/README.md`
- `progress/PROGRESS.csv`

## Major Specification Decisions

Phase 41 is locked around multiplayer reliability and real E2E hardening:

- ranked Practice search-again, queue cancellation, stale queue participation, and visible queue status stability;
- public ranked leaderboard freshness and eligibility for newly established rated players;
- private Practice request lifecycle cleanup and requester accepted-game routing;
- mobile Practice Multiplayer freshness;
- real two-client and three-client Supabase-backed E2E harness expansion;
- Codex-assisted manual-review preflight expectations.

The spec keeps Phase 41 as a cohesive macro-phase under the phase scope sizing guide while requiring narrow implementation stages and addendum gates for any database-contract work.

## Deferred Routing Decisions

- Public site stats, private developer dashboard, onboarding, help, and tutorial UX remain routed to Phase 42.
- EXP/coin/collectible header counters, Focus Mode, compact navigation, and broader mobile UX shell overhaul remain routed to Phase 43 or later.
- Theme proposal modernization remains routed to Phase 44 or later.
- Full concrete theme work remains routed to Phase 45 or later.
- Full mailbox/notification redesign, spectator presence/count/list, service workers, push subscriptions, production deployment/release, gameplay-rule changes, and Elo changes remain later gated work.

## Verification

Lightweight documentation verification passed:

- `git diff --check`
- Progress CSV shape check using `python3 -S` reported `rows=351 columns=[12] last_id=349`.
- Non-printing changed/untracked file credential scan reported `scanned_files=11 credential_pattern_hits=0`.
- Ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch` completed.

## Blockers And Open Questions

No blockers were found during specification.

Open decisions for the Phase 41 implementation plan:

- whether Stage 41.1 finds any migration/RLS addendum requirement;
- whether ranked queue stale cancellation is source-only, RPC-contract related, or data-cleanup related;
- whether leaderboard freshness is source polling, RPC/projection filtering, public profile eligibility, rating settlement timing, or E2E setup;
- whether private request expiry cleanup needs source refresh only or RPC/projection repair;
- whether three-client E2E remains reliable enough for the broad E2E suite or should be isolated to focused final-hardening slices.

## Boundary Confirmation

No source/runtime implementation, test implementation, migration creation or execution, deployment/configuration work, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation contract change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, local Codex skill creation/modification, or original stable repository work was performed.
