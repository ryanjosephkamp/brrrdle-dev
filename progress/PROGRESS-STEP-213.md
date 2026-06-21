# Progress Step 213: Unified Phase 29 Specification

**Status**: Completed - Awaiting User Review Before Phase 29 Implementation Plan
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-20T06:15:38Z
**Completed**: 2026-06-20T06:15:38Z

## Authorization

The user authorized creation of a unified Phase 29 specification for review only.

Allowed work:

- read governance, roadmap, completed Phase 28 materials, the Phase 29 planning brief, current progress records, public-profile-adjacent account/profile surfaces, notification/browser notification surfaces, About/Elo copy surfaces, relevant tests, Supabase/RLS context, and documentation;
- create one unified Phase 29 specification under `planning/specs/phase-29/`;
- update `planning/README.md` only if needed for discoverability;
- create this progress report and append the matching 12-column row to `progress/PROGRESS.csv`;
- run lightweight documentation verification only.

Not authorized:

- source/runtime implementation;
- test implementation;
- Supabase migration creation or execution;
- Vercel configuration;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 29 implementation or Phase 30 implementation;
- public leaderboards or public/guest spectation;
- service workers or push infrastructure;
- new custom skills, force-push, secret printing, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- `origin/main`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- Original stable repository: not used.

## Work Completed

- Created `planning/specs/phase-29/PHASE-29-PUBLIC-PROFILES-NOTIFICATION-ACTIONS-AND-ELO-ABOUT-SPEC-2026-06-20.md`.
- Updated `planning/README.md` so the Phase 29 specs directory points to the actual Phase 29 spec area.
- Recorded Phase 29 specification progress in this report and `progress/PROGRESS.csv`.

## Major Spec Decisions

- Public profile foundations must use a new public-safe allow-listed projection rather than exposing existing Supabase auth metadata.
- Public profiles are opt-in/private by default unless a later approved implementation plan changes that with explicit privacy reasoning.
- Public profile links should use an opaque public id or safe slug, never a raw auth id.
- Stage 29.2 public profile migration/RLS addendum planning is expected because existing private auth metadata is not a safe public identity contract.
- Browser notification click routing should reuse existing dashboard action targets when the app page context is alive; service workers and push infrastructure remain out of scope.
- Notification Center should add `Mark all read` and simplify visible `Mark read` versus `Dismiss` semantics.
- Long Elo transparency copy should move to About, with compact ranked-surface links and no changes to the Phase 27 Elo model.

## Verification

- Passed: `git diff --check`
- Passed: Python CSV shape check using `python3 -S` (`CSV OK: 215 rows including header, 12 columns each, last_id=213`)
- Passed: `git status --short --branch`

## Blockers

No blockers at planning time.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, Supabase or Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 29 implementation, Phase 30 implementation, public leaderboards, public/guest spectation, service workers, push infrastructure, new custom skills, force-push, secret printing, or original stable repository work was performed.
