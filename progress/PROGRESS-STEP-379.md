# Progress Step 379 - Phase 43 Implementation Plan

**Status**: Completed - Awaiting User Review Before Stage 43.0 Baseline
**Phase**: Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort
**Stage**: Detailed implementation plan creation
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T22:21:28Z
**Completed**: 2026-07-03T22:21:28Z

## Authorization

The user authorized creation of a detailed Phase 43 implementation plan for review only.

Authorized work included reading governance, roadmap, completed Phase 42 materials, the Phase 43 intake, recommendations/routing document, planning brief, unified Phase 43 specification, phase scope sizing guidance, progress records, testing strategy, and relevant source surfaces read-only as needed.

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

## Implementation Plan Created

Created:

- `planning/phase-43/IMPLEMENTATION-PLAN.md`

Updated for discoverability:

- `planning/README.md`

The plan converts the unified specification into narrow gated stages and includes the copy-safe Stage 43.0 protected-baseline prompt.

## Major Staging Decisions

Phase 43 should execute in this order:

1. Stage 43.0 protected baseline and intake confirmation.
2. Stage 43.1 current UX and ranked queue audit.
3. Stage 43.2 ranked Practice queue follow-up.
4. Stage 43.3 Stats, Help, About, and Settings information architecture.
5. Stage 43.4 app shell, header, Home, and horizontal overflow cleanup.
6. Stage 43.5 Solo and Practice Multiplayer density cleanup.
7. Stage 43.6 gameplay viewport, notifications, back-to-top, and spectator comfort.
8. Stage 43.7 final hardening, visual review, changelog, and manual checklist.

The plan keeps ranked queue repair before broad UI cleanup, separates route information architecture from shell/Home work, separates Solo/Practice Multiplayer density cleanup from gameplay viewport behavior, and reserves broad verification for final hardening.

## Open Decisions Preserved

- Whether the three-player ranked queue issue reproduces and whether it is source-only.
- Whether "Check ranked queue" should remain, change, or be removed.
- Whether completed multiplayer game review can safely route through History.
- Whether sync belongs in Profile, Settings, or both.
- Whether Help should become a placeholder or a slimmer transitional page.
- How much spectator/latest-turn auto-scroll can be safely implemented.
- Which UX expectations should become automated tests versus manual checklist items.

## Verification

Lightweight documentation verification:

- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: passed, `rows=381 columns=[12] last_id=379`.
- Non-printing changed/untracked file credential scan: passed, `scanned_files=16 credential_pattern_hits=0`.
- Ignored-artifact check: passed, no forbidden artifacts staged or tracked.
- `git status --short --branch`: completed and showed expected uncommitted Phase 42 manual-review, Phase 43 intake/recommendation/planning/spec/implementation, roadmap/testing, and progress artifacts.

## Browser And Resource Notes

- No dev server was started.
- No browser automation was run.
- No screenshots, videos, traces, auth state, tokens, secrets, local session artifacts, or private data were staged or intentionally exposed.

## Blockers

No implementation-plan blocker is known.

The next safe gate is Phase 43 Stage 43.0 protected baseline and intake confirmation. Implementation remains blocked until Stage 43.0 passes and Stage 43.1 is separately authorized.

## Next Gate

Begin Phase 43 Stage 43.0 baseline only. Do not begin Stage 43.1 audit or implementation.
