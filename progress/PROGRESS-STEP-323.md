# Progress Step 323 - Phase 39 Unified Specification

**Status**: Completed - Awaiting User Review
**Phase**: 39, Mobile Performance And Scroll Smoothness
**Stage**: Unified Phase 39 specification
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T01:16:32Z
**Completed**: 2026-07-01T01:16:32Z

## Authorization

The user authorized creation of a unified Phase 39 specification for review only.

This pass was limited to reading governance, roadmap, completed Phase 38 materials, the Phase 39 planning brief, phase scope sizing guidance, current progress records, mobile scroll/performance-sensitive app shell and UI surfaces, relevant tests, and local workflow docs enough to create an implementation-oriented Phase 39 spec.

This pass did not authorize and did not perform source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `937208ac519860cfa433fa39411c1b077508f26b`.
- `origin/main`: `937208ac519860cfa433fa39411c1b077508f26b`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used.
- The user-edited `planning/phase-38/REVIEW-CHECKLIST.md` checked state was preserved.
- The Phase 39 planning brief and Phase Scope Sizing guidance artifacts from progress IDs `321` and `322` were preserved.

## Specification Created

Created:

- `planning/specs/phase-39/PHASE-39-MOBILE-PERFORMANCE-AND-SCROLL-SMOOTHNESS-SPEC-2026-07-01.md`

Updated:

- `planning/README.md` for Phase 39 spec discoverability.
- `progress/PROGRESS.csv` with the matching 12-column progress row.

## Major Spec Decisions

- Phase 39 remains a cohesive mobile performance and scroll smoothness macro-phase.
- Implementation stages remain narrow:
  - Stage 39.0 protected baseline.
  - Stage 39.1 mobile scroll/performance audit.
  - Stage 39.2 scroll measurement and regression harness.
  - Stage 39.3 shell, CSS, and shared UI scroll smoothness fixes.
  - Stage 39.4 complex workspace scroll tuning.
  - Stage 39.5 final hardening, E2E/browser review, visual handoff review, changelog, and manual checklist.
- The spec requires audit and measurement before source fixes rather than assuming a root cause.
- The spec treats likely causes as audit candidates only: heavy visual effects, sticky/fixed UI, tooltip scroll listeners, complex workspace cards/tables, route chrome, and avoidable rerender/layout work.
- Broad mobile UX redesign, compact navigation, Focus Mode, progression HUD, public profile/private matchmaking work, site stats/onboarding/help, themes, service workers, deployment/release, gameplay-rule changes, and Elo changes remain deferred.

## Verification

Lightweight documentation verification was run after the spec edits.

Passed:

- `git diff --check`
- progress CSV shape check using `python3 -S` reported `rows=325 columns=[12] last_id=323`
- non-printing credential-shaped secret/artifact scan reported `scanned_files=13 credential_pattern_hits=0`
- ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- `git status --short --branch`

## Blockers And Open Questions

No blockers prevent review of the Phase 39 unified specification.

Open decisions for the detailed Phase 39 implementation plan:

- Which route best reproduces the reported mobile scroll issue.
- Whether the Stage 39.2 harness should rely on deterministic layout/scroll checks only or include coarse performance observations.
- Which audited source area should be sequenced first if multiple likely scroll-jank contributors are found.
- Whether broader mobile UX overhaul should stay with Focus Mode in Phase 42 or become a separate later mobile-shell phase.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration, Vercel/Supabase configuration change, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation change, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
