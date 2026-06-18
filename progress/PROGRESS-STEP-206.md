# Progress Step 206: Phase 28 Stage 28.2 Live Spectator Migration/RLS Addendum Planning

**Status**: Completed - Awaiting User Review Before Stage 28.3.
**Date**: 2026-06-18.
**Repository**: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Branch**: `main`.

## Authorization

The user authorized Phase 28 Stage 28.2 only: Live spectator migration/RLS addendum planning.

Authorized work:

- read governance, Phase 28 planning/spec/implementation materials, Stage 28.1 findings, relevant Live spectator source/tests, `docs/supabase.md`, and the Phase 26 spectator migration;
- create this progress report and append the matching `progress/PROGRESS.csv` row;
- create a precise migration/RLS addendum under `planning/specs/phase-28/`;
- define exact RPC contract changes, status eligibility, Daily exclusion semantics, allowed terminal fields, forbidden fields, grants, rollback plan, privacy probes, and verification strategy.

Not authorized:

- source/runtime implementation;
- test implementation;
- Supabase migration creation or execution;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 29 work;
- public/guest spectation;
- public profiles;
- public leaderboards;
- service workers or push infrastructure;
- secret printing;
- original stable `brrrdle` repository work.

## Starting Repository State

Confirmed before editing:

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- branch: `main`
- `HEAD`: `a051931dad51e554be151bc45e811efc18f4f04d`
- `origin/main`: `a051931dad51e554be151bc45e811efc18f4f04d`
- remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`
- original stable repo: not used; this pass stayed inside `brrrdle-dev`

Existing uncommitted Phase 28 planning/spec/progress artifacts were present and preserved.

## Work Performed

Created:

- `planning/specs/phase-28/PHASE-28-LIVE-SPECTATOR-MIGRATION-RLS-ADDENDUM-2026-06-18.md`
- `progress/PROGRESS-STEP-206.md`

Updated:

- `progress/PROGRESS.csv`

## Addendum Decisions

- Recommended one additive migration that adds companion RPC `public.get_authenticated_live_v1_spectator_games_v2(p_limit integer default 50, p_terminal_window_seconds integer default 15)`.
- Kept existing Phase 26 `public.get_authenticated_live_v1_spectator_games(integer)` intact for compatibility.
- Required authenticated-only security-definer execution with explicit `search_path`.
- Required no broad raw `async_multiplayer_games` SELECT access for nonparticipants.
- Required current UTC-day Daily Multiplayer exclusion at the server/RPC boundary, plus later app-side defense in depth.
- Defined terminal hold status eligibility as `won`, `lost`, and `expired` rows within a bounded terminal window, with `playing` rows still returned normally.
- Recommended a bounded terminal window defaulting to 15 seconds and capped at 60 seconds server-side.
- Defined sanitized terminal metadata fields and a small `outcome` object while forbidding raw answers, seeds, raw projections, serialized sessions, `playerSessions`, auth emails, private profile data, user ids, tokens, Daily claim internals, and mutation authority.
- Required all spectator capabilities to remain false.
- Defined rollback, privacy probes, verification expectations, and stop conditions.

## Verification

Passed:

- `git diff --check`
- Python `csv` shape check with `PYTHONDONTWRITEBYTECODE=1 PYTHONNOUSERSITE=1 python3 -S`: `rows=208 columns=12 last_id=206`
- `git status --short --branch`

## Blockers

None.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 29 work, public/guest spectation, public profiles, public leaderboards, service workers or push infrastructure, secret printing, or original stable `brrrdle` repository work was performed.
