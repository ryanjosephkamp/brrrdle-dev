# Progress Step 324 - Phase 39 Implementation Plan

**Status**: Completed - Awaiting User Review
**Phase**: 39, Mobile Performance And Scroll Smoothness
**Stage**: Detailed Phase 39 implementation plan
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T01:27:04Z
**Completed**: 2026-07-01T01:27:04Z

## Authorization

The user authorized creation of a detailed Phase 39 implementation plan for review only.

This pass was limited to reading governance, roadmap, completed Phase 38 materials, the Phase 39 planning brief, the unified Phase 39 specification, phase scope sizing guidance, current progress records, mobile scroll/performance-sensitive app shell and UI surfaces, relevant tests, and local workflow documentation enough to create an actionable staged implementation plan.

This pass did not authorize and did not perform source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `937208ac519860cfa433fa39411c1b077508f26b`.
- `origin/main`: `937208ac519860cfa433fa39411c1b077508f26b`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used.
- The user-edited `planning/phase-38/REVIEW-CHECKLIST.md` checked state was preserved.
- The Phase 39 planning brief, unified specification, and Phase Scope Sizing guidance artifacts from progress IDs `321`, `322`, and `323` were preserved.

## Implementation Plan Created

Created:

- `planning/phase-39/IMPLEMENTATION-PLAN.md`

Updated:

- `planning/README.md` for Phase 39 implementation-plan discoverability.
- `progress/PROGRESS.csv` with the matching 12-column progress row.

## Major Staging Decisions

- Phase 39 remains a cohesive mobile performance and scroll smoothness macro-phase.
- Implementation remains narrow and staged:
  - Stage 39.0 protected baseline.
  - Stage 39.1 mobile scroll and performance audit.
  - Stage 39.2 scroll measurement and regression harness.
  - Stage 39.3 shell, CSS, and shared UI scroll smoothness fixes.
  - Stage 39.4 complex workspace scroll tuning.
  - Stage 39.5 final hardening, E2E/browser review, visual handoff review, changelog, and manual checklist.
- The implementation plan requires audit and measurement before source fixes.
- Stage 39.2 should prefer deterministic layout and scroll guards over brittle absolute FPS thresholds unless the audit proves a stable performance signal.
- Broad mobile UX redesign, compact navigation, Focus Mode, progression HUD, public profile/private matchmaking work, site stats/onboarding/help, themes, service workers, deployment/release, gameplay-rule changes, and Elo changes remain deferred.

## Verification

Lightweight documentation verification was run after the plan edits.

Passed:

- `git diff --check`
- progress CSV shape check using `python3 -S` reported `rows=326 columns=[12] last_id=324`
- non-printing credential-shaped secret/artifact scan reported `scanned_files=12 credential_pattern_hits=0`
- ignored-artifact check initially flagged tracked `public/manifest.webmanifest` due to an overbroad `.webm` substring matcher; refined extension-aware check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- `git status --short --branch`

## Blockers And Open Questions

No blockers prevent review of the Phase 39 implementation plan.

Open decisions for Stage 39.1:

- Which mobile route or workspace best reproduces the user-reported scroll issue.
- Whether Stage 39.2 should include coarse performance observations or deterministic layout/scroll checks only.
- Which shell, CSS, shared UI, or workspace surface should be fixed first after audit evidence exists.
- Whether broader mobile UX overhaul should remain with Focus Mode in Phase 42 or become its own later shell-polish phase.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration, Vercel/Supabase configuration change, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation change, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
