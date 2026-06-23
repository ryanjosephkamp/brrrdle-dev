# Progress Step 224: Phase 30 Unified Specification

**Status**: Completed - Awaiting User Review Before Phase 30 Implementation Plan
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-22T22:18:40Z
**Completed**: 2026-06-22T22:18:40Z

## Authorization

The user authorized creation of a unified Phase 30 specification for review only.

Allowed work:

- read governance, roadmap, completed Phase 29 materials, the Phase 30 planning brief, current progress records, public profile foundations, ranked/private projection surfaces, leaderboard-adjacent stats/rating surfaces, Multiplayer Overview source surfaces, Supabase/RLS context, relevant tests, and the user-provided Multiplayer Overview screenshots;
- create one Phase 30 specification under `planning/specs/phase-30/`;
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
- Phase 30 implementation or Phase 31 implementation;
- public/guest spectation;
- service workers or push infrastructure;
- new custom skills, force-push, secret printing, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `ec5d7824104d9d41e79b2b49e475c68006cf40da`
- `origin/main`: `ec5d7824104d9d41e79b2b49e475c68006cf40da`
- Original stable repository: not used.

## Work Completed

- Created `planning/specs/phase-30/PHASE-30-PUBLIC-LEADERBOARDS-AND-MULTIPLAYER-OVERVIEW-CLEANUP-SPEC-2026-06-22.md`.
- Updated `planning/README.md` so the Phase 30 specs directory points to the concrete public leaderboard and Multiplayer Overview cleanup spec.
- Recorded Phase 30 specification progress in this report and `progress/PROGRESS.csv`.

## Major Specification Decisions

- Phase 30 remains focused on privacy-safe public leaderboards after Phase 29 public profile foundations and Phase 27 ranked Practice foundations.
- The recommended Phase 30 v1 leaderboard default is ranked bucket leaderboards first: current rating, rank, ranked games played, wins/losses/draws, recent movement, and optional peak rating if trusted cheaply.
- Broader streak and total-games leaderboards require Stage 30.1 source/privacy approval before implementation.
- Public identity must flow through Phase 29 public profiles using `public_profile_id` and allow-listed public fields, never raw auth ids or emails.
- A migration/RLS addendum is expected before any public leaderboard database contract is created unless Stage 30.1 proves a safer no-migration path.
- The redundant secondary shortcut row on the Multiplayer Overview subtab is specified for removal after audit, while preserving the main subtab row and badge/count behavior.
- The confusing `Select`/`Selected` active-game affordance is specified for audit and removal or clarification while preserving selected-game state, `Resume`, active-game routing, lobby routing, and Live routing.

## Verification

- Passed: `git diff --check`
- Passed: Python CSV shape check using `python3 -S` (`226` rows including header, `12` columns each, `last_id=224`)
- Passed: `git status --short --branch`

## Blockers

No blockers at initial creation.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migrations, Supabase or Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 30 implementation, Phase 31 implementation, public/guest spectation, service workers, push infrastructure, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
