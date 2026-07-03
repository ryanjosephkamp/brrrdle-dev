# Progress Step 360 - Phase 42 Unified Specification

**Status**: Completed - Awaiting User Review Before Phase 42 Implementation Plan
**Phase**: Phase 42 - Site Stats, Developer Dashboard, Onboarding, And Help
**Stage**: Unified specification
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T04:18:00Z
**Completed**: 2026-07-03T04:25:41Z

## Authorization

The user authorized creation of a unified Phase 42 specification for review only.

This pass included reading governance, roadmap, completed Phase 41 materials, the Phase 42 planning brief, phase scope sizing guidance, current progress records, public stats, developer/admin dashboard, onboarding/help/tutorial, ranked Practice queue button/status flashing, relevant tests, Supabase/RLS context as needed, and local workflow docs enough to create an implementation-oriented Phase 42 spec.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- `origin/main`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-41/REVIEW-CHECKLIST.md` was preserved.

## Specification Created

Created:

- `planning/specs/phase-42/PHASE-42-SITE-STATS-DEVELOPER-DASHBOARD-ONBOARDING-HELP-SPEC-2026-07-03.md`

Updated for discoverability:

- `planning/README.md`

The specification locks Phase 42 around:

- public live-site stats;
- private developer/admin dashboard;
- onboarding, help, and tutorial UX;
- a narrow ranked Practice queue button/status flashing audit and follow-up;
- migration/RLS addendum gates for any new stats/dashboard database contract.

## Key Decisions

- Phase 42 remains a cohesive macro-phase because public stats, private dashboard, onboarding/help/tutorial UX, and the queue-flash follow-up share observability, route placement, review surfaces, and current-state explanation work.
- Future implementation stages remain narrow and independently reviewable.
- Public stats must be aggregate-only and privacy-safe.
- Private developer/admin dashboard access must be backed by existing or approved admin authorization, not browser-hidden UI alone.
- Onboarding/help/tutorial UX must teach the current product without changing gameplay, Daily, ranked queue, or Elo rules.
- The ranked Practice queue flashing issue must be reproduced or characterized before repair and can proceed only if Stage 42.1 proves a source/test-only path.
- Any new public stats RPC, admin-only dashboard RPC, telemetry persistence, grant, policy, or projection requires a separate migration/RLS addendum before SQL execution.

## Deferred Routing

- EXP, coin, collectible header counters, progression HUD, Focus Mode, compact navigation, and broader mobile UX shell overhaul: Phase 43 or later.
- Theme proposal modernization: Phase 44 or later.
- Full concrete theme work: Phase 45 or later.
- Full mailbox/notification-center redesign: later notification phase.
- Spectator presence/count/list, identity-bearing spectator lists, spectator sorting, aggregate viewer tracking, and public/guest spectation contract changes: later privacy/RLS-gated phase.
- Service workers, push subscriptions, background push, production deployment, release, gameplay-rule changes, and Elo algorithm changes: later gated phases unless separately approved.

## Verification

Passed:

- `git diff --check`.
- Progress CSV shape check using `python3 -S`: `rows=362 columns=[12] last_id=360`.
- Non-printing changed/untracked file credential scan: `scanned_files=9 credential_pattern_hits=0`.
- Ignored/forbidden artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0 allowed_tracked_templates=1`.
- `git status --short --branch`: completed on `main...origin/main` with expected uncommitted documentation/planning changes and no staged files.

## Blockers And Open Questions

No blockers currently prevent review of the Phase 42 unified specification.

Open questions for the detailed implementation plan:

- Which public stats should be included in v1 while remaining privacy-safe?
- Does the private developer dashboard need new Supabase/RLS contracts, or can it initially use existing admin-safe surfaces?
- Should onboarding live in Home, Settings/Help, a dedicated route, or contextual surfaces?
- Should onboarding dismissal persist locally, account-wide, both, or not at all in v1?
- Can the ranked Practice queue flashing be fixed with source/test-only UI state stabilization?
- Which Phase 42 surfaces require visual handoff screenshots?

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation contract change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, local Codex skill creation/modification, or original stable repository work has been performed.
