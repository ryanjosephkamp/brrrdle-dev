# Progress Step 333 - Phase 40 Unified Specification

**Status**: Completed - Awaiting User Review
**Phase**: Phase 40 - Public Profiles And Private Matchmaking
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T20:57:55Z
**Completed**: 2026-07-01T20:58:43Z

## Authorization

The user authorized creation of a unified Phase 40 specification for review only. This pass was authorized to read governance, roadmap, completed Phase 39 materials, the Phase 40 planning brief, phase scope sizing guidance, current progress records, public profile/privacy, multiplayer identity, private matchmaking, custom-code lobby, notification/routing, relevant tests, Supabase/RLS context, and workflow docs enough to create an implementation-oriented Phase 40 spec.

Not authorized: source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work.

## Repo State

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Stable repository boundary: the original stable `brrrdle` repository was not used or touched.
- Branch: `main`.
- `HEAD`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- `origin/main`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- Preserved user edit: `planning/phase-39/REVIEW-CHECKLIST.md` remains checked off and was not modified by this pass.

## Work Completed

- Created `planning/specs/phase-40/PHASE-40-PUBLIC-PROFILES-AND-PRIVATE-MATCHMAKING-SPEC-2026-07-01.md`.
- Updated `planning/README.md` to point to the actual Phase 40 spec folder instead of future-spec wording.
- Appended progress ID `333` to `progress/PROGRESS.csv`.

## Major Spec Decisions

- Phase 40 remains a cohesive macro-phase, but implementation stages remain narrow and independently reviewable.
- Stage 40.1 must audit public profile, participant identity, public spectator, public leaderboard, rematch, custom lobby, notification, route/history, and E2E seams before source work.
- Any new database contract requires a Stage 40 migration/RLS addendum before SQL creation or execution.
- Public profile pages/cards may use only active safe public fields and must preserve private/hidden/suspended/stale fallbacks.
- Clickable identity links may appear only where safe public profile context exists.
- Private matchmaking/direct requests are unranked/custom by default and must not bypass ranked queue, trusted settlement, or Daily claim rules.
- Notification/routing behavior must not mutate gameplay or request state through browser history replay.

## Deferred Or Routed

- Ranked private invitations, ranked direct challenges, Daily match requests, and Daily custom invitations remain deferred unless a later competitive-integrity spec approves them.
- Public site stats, private developer dashboard, onboarding, help, and tutorial UX remain routed to Phase 41.
- EXP/coin/collectible counters, Focus Mode, compact navigation, and broader mobile UX shell overhaul remain routed to Phase 42 or later.
- Theme proposal modernization remains routed to Phase 43 or later.
- Full concrete theme work remains routed to Phase 44 or later.
- Spectator presence/count/list implementation, service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes remain later gated.

## Verification

Passed lightweight documentation verification:

- `git diff --check`
- progress CSV shape check using `python3 -S`: `rows=335 columns=[12] last_id=333`
- non-printing credential-shaped secret/artifact scan over changed tracked and untracked repository files: `scanned_files=9 credential_pattern_hits=0`
- ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- `git status --short --branch`

## Blockers

No blockers.

## Next Safe Gate

Review the unified Phase 40 specification. If approved, authorize a detailed Phase 40 implementation plan for review only before implementation, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
