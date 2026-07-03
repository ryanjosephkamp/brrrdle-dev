# Progress Step 348 - Phase 41 Planning Brief Reroute

**Status**: Completed - Awaiting User Review Before Phase 41 Specification
**Phase**: Phase 41 - Multiplayer Reliability And Real E2E Hardening
**Stage**: Manual-review-results processing and planning brief creation
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-02T20:48:00Z
**Completed**: 2026-07-02T20:53:26Z

## Authorization

The user authorized a Phase 40 manual-review-results processing and Phase 41 planning decision pass only.

This pass included reading the user-edited Phase 40 manual review checklist, Phase 40 completion evidence, the Phase 41 multiplayer reliability strategy intake, roadmap/planning context, relevant testing strategy, and relevant source/test surfaces enough to decide whether Phase 41 should be formally rerouted and, if safe, create the Phase 41 planning brief.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating or modifying local Codex skills, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Expected baseline: `c3d774bc8a611950f889f2f7a487be4e69844fc0`.
- The original stable `brrrdle` repository was not used or touched.
- The user-edited `planning/phase-40/REVIEW-CHECKLIST.md` was preserved.

## Manual Review Processing

Phase 40 manual review was completed but produced follow-up issues. The checked-off checklist and Phase 41 strategy intake identify reliability concerns around:

- ranked Practice search-again and queue matching;
- cancelled ranked queue entries and stale queue participation;
- ranked queue button/status flicker;
- public ranked leaderboard freshness or eligibility for newly established rated players;
- private Practice request cancel/decline/expiry/accept stale active-list behavior;
- requester-side accepted-game feedback and safe open/resume routing;
- mobile Practice Multiplayer lobby/request/list freshness;
- real two-client and three-client E2E coverage gaps.

These observations are planning-safe and should be handled through a rerouted Phase 41 reliability macro-phase rather than a narrower pre-planning bugfix gate.

## Planning Created

Created:

- `planning/phase-41/PLANNING-BRIEF.md`

Updated:

- `planning/README.md`
- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `progress/PROGRESS.csv`

## Phase 41 Direction

Phase 41 is formally rerouted to multiplayer reliability and real E2E hardening.

The planning brief applies the phase scope sizing guide by allowing a cohesive macro-phase across shared multiplayer, Supabase, ranked queue, leaderboard, private request, notification/routing, mobile freshness, and E2E harness surfaces while requiring narrow single-purpose implementation stages.

Recommended Stage 41 shape:

- Stage 41.0 protected baseline and review intake;
- Stage 41.1 multiplayer reliability audit and reproduction;
- Stage 41.2 real E2E harness expansion;
- Stage 41.3 ranked Practice queue and search-again repair;
- Stage 41.4 public ranked leaderboard freshness repair;
- Stage 41.5 private Practice request lifecycle and routing repair;
- Stage 41.6 mobile multiplayer freshness and UI stability repair;
- Stage 41.7 final hardening, Codex-assisted pre-review, visual review, changelog, and manual checklist.

## Routing Decisions

- Public site stats, private developer dashboard, onboarding, help, and tutorial UX move to Phase 42.
- EXP/coin/collectible header counters, Focus Mode, compact navigation, and broader mobile UX shell overhaul move to Phase 43 or later.
- Theme proposal modernization moves to Phase 44 or later.
- Full concrete theme work moves to Phase 45 or later.
- Full mailbox/notification redesign, spectator presence/count/list, service workers, push subscriptions, production deployment/release, gameplay-rule changes, and Elo changes remain later gated work.

## Verification

Lightweight documentation verification passed:

- `git diff --check`
- Progress CSV shape check using `python3 -S` reported `rows=350 columns=[12] last_id=348`.
- Non-printing changed/untracked file credential scan reported `scanned_files=9 credential_pattern_hits=0`.
- Ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch` completed.

## Blockers And Open Questions

No blockers were found during planning.

Open decisions for the Phase 41 specification:

- whether any Stage 41 issue requires migration/RLS addendum planning;
- whether public leaderboard freshness is source-only, RPC/projection related, profile eligibility related, or test-data related;
- whether private request expiry cleanup needs source polling only or RPC/projection repair;
- whether queue-button flicker is source refresh state, RPC response timing, or E2E setup;
- whether Codex-assisted manual-review preflight should remain checklist-local or later become a reusable governed workflow.

## Boundary Confirmation

No source/runtime implementation, test implementation, migration creation or execution, deployment/configuration work, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation contract change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, local Codex skill creation/modification, or original stable repository work was performed.
