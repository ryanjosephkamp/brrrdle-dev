# Progress Step 378 - Phase 43 Unified Specification

**Status**: Completed - Awaiting User Review Before Detailed Phase 43 Implementation Plan
**Phase**: Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort
**Stage**: Unified specification creation
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T21:47:37Z
**Completed**: 2026-07-03T21:47:37Z

## Authorization

The user authorized creation of a unified Phase 43 specification for review only.

Authorized work included reading governance, roadmap, completed Phase 42 materials, the Phase 43 intake, the Phase 43 recommendations/routing document, the Phase 43 planning brief, phase scope sizing guidance, current progress records, current-surface UX, ranked queue, Stats, Help/About/Settings, Home/shell, Solo, Practice Multiplayer, notifications, gameplay viewport, spectator viewport, relevant tests, and source surfaces read-only as needed.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `a81e636cd26eb178e1d0bcc75554a1edffe7639d`.
- `origin/main`: `a81e636cd26eb178e1d0bcc75554a1edffe7639d`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-42/REVIEW-CHECKLIST.md` was preserved.
- No files were staged, committed, pushed, merged, deployed, or released.

## Specification Created

Created:

- `planning/specs/phase-43/PHASE-43-CURRENT-SURFACE-UX-CLEANUP-RANKED-QUEUE-GAMEPLAY-COMFORT-SPEC-2026-07-03.md`

Updated for discoverability:

- `planning/README.md`

The specification turns the Phase 43 planning brief into implementation-oriented requirements while preserving the planning-only boundary.

## Major Specification Decisions

The specification locks Phase 43 around:

- current-surface UX cleanup;
- ranked Practice queue follow-up;
- Stats information architecture cleanup;
- Help, About, and Settings cleanup;
- app shell, header, Home, and horizontal-overflow cleanup;
- Solo and Practice Multiplayer density cleanup;
- account dropdown, notification click-away, clocks, and back-to-top behavior;
- gameplay invalid-guess and spectator viewport comfort.

The spec requires Phase 43 to start migration-free and stop for migration/RLS addendum planning if ranked queue, completed-game History routing, or any cleanup requires new persisted contracts.

## Deferred Routing

Deferred to later gated work:

- profile/data-contract simplification;
- custom-code removal/rerouting, private Daily requests, ranked Daily, and Daily claim contract changes;
- full social inbox, mailbox, following, messaging, or notification-center redesign;
- rich GIF or interactive tutorial media;
- configurable Home widgets;
- progression HUD counters, Focus Mode, compact navigation, and broad mobile shell overhaul;
- theme proposal modernization and concrete theme implementation;
- spectator presence/count/list behavior;
- service workers, push subscriptions, deployment/release;
- draw-by-repetition and other gameplay-rule changes;
- Elo changes.

## Verification

Lightweight documentation verification:

- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: passed, `rows=380 columns=[12] last_id=378`.
- Non-printing changed/untracked file credential scan: passed, `scanned_files=14 credential_pattern_hits=0`.
- Ignored-artifact check: passed, no forbidden artifacts staged or tracked.
- `git status --short --branch`: completed and showed expected uncommitted Phase 42 manual-review, Phase 43 intake/recommendation/planning/spec, roadmap/testing, and progress artifacts.

## Browser And Resource Notes

- No dev server was started.
- No browser automation was run.
- No screenshots, videos, traces, auth state, tokens, secrets, local session artifacts, or private data were staged or intentionally exposed.

## Blockers

No specification blocker is known.

The next safe gate is creation of the detailed Phase 43 implementation plan. Implementation remains blocked until the detailed implementation plan and protected baseline gates are separately authorized and completed.

## Next Gate

Create the detailed Phase 43 implementation plan for review only. Do not begin implementation.
