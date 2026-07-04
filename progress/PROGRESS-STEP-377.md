# Progress Step 377 - Phase 43 Planning Brief

**Status**: Completed - Awaiting User Review Before Unified Phase 43 Specification
**Phase**: Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort
**Stage**: Planning brief creation
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T21:41:53Z
**Completed**: 2026-07-03T21:41:53Z

## Authorization

The user authorized creation of the official Phase 43 planning brief for review only.

Authorized work included reading governance, Phase 42 completion/manual-review evidence, the Phase 43 intake, the Phase 43 recommendations/routing document, roadmap/planning context, testing strategy, current progress records, relevant source surfaces read-only as needed, creating `planning/phase-43/PLANNING-BRIEF.md`, updating planning docs only where needed for discoverability, creating this progress report and the matching 12-column CSV row, and running lightweight documentation verification.

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

## Planning Brief Created

Created:

- `planning/phase-43/PLANNING-BRIEF.md`

The planning brief locks Phase 43 around current-surface UX cleanup, ranked queue follow-up, and gameplay comfort. It uses the Phase 43 intake and recommendations/routing document as the immediate planning basis.

## Major Planning Decisions

Phase 43 should proceed as a cohesive macro-phase with narrow stages:

- Stage 43.0 protected baseline and intake confirmation.
- Stage 43.1 current UX and ranked queue audit.
- Stage 43.2 ranked Practice queue follow-up.
- Stage 43.3 Stats, Help, About, and Settings information architecture.
- Stage 43.4 app shell, header, Home, and horizontal overflow cleanup.
- Stage 43.5 Solo and Practice Multiplayer density cleanup.
- Stage 43.6 gameplay viewport, notifications, back-to-top, and spectator comfort.
- Stage 43.7 final hardening, visual review, changelog, and manual checklist.

The brief preserves Phase 42 stats/dashboard/help work, Phase 41 multiplayer reliability and E2E harnesses, Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, Phase 38 public/guest spectator read-only boundaries and Daily spectator exclusion, Daily claim safety, gameplay rules, and Elo math.

## Deferred Routing

Deferred to later gated work:

- profile/data-contract simplification;
- custom-code removal/rerouting, private Daily requests, and ranked Daily separation;
- full social inbox, mailbox, following, messaging, or notification-center redesign;
- rich GIF/interactive tutorial media;
- configurable Home widgets;
- progression HUD counters, Focus Mode, compact navigation, and broader mobile shell overhaul;
- draw-by-repetition gameplay-rule changes;
- theme proposal modernization and full concrete theme work;
- spectator presence/count/list behavior;
- service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes.

## Verification

Lightweight documentation verification:

- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: passed, `rows=379 columns=[12] last_id=377`.
- Non-printing changed/untracked file credential scan: passed, `scanned_files=12 credential_pattern_hits=0`.
- Ignored-artifact check: passed, no forbidden artifacts staged or tracked.
- `git status --short --branch`: completed and showed expected uncommitted Phase 42 manual-review, Phase 43 intake/recommendation/planning, roadmap/testing, and progress artifacts.

## Browser And Resource Notes

- No dev server was started.
- No browser automation was run.
- No screenshots, videos, traces, auth state, tokens, secrets, local session artifacts, or private data were staged or intentionally exposed.

## Blockers

No planning-brief blocker is known.

The next safe gate is creation of the unified Phase 43 specification. Implementation remains blocked until the unified specification, detailed implementation plan, and protected baseline gates are separately authorized and completed.

## Next Gate

Create the unified Phase 43 specification for review only. Do not begin implementation.
