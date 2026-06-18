# Progress Step 207: Phase 28 Stage 28.3 Live Spectator Migration/RLS Execution

**Status**: Completed - Awaiting User Review Before Stage 28.4.
**Date**: 2026-06-18.
**Repository**: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Branch**: `main`.

## Authorization

The user authorized Phase 28 Stage 28.3 only: Live spectator migration/RLS execution.

Authorized work:

- read governance, Phase 28 planning/spec/addendum materials, Stage 28.2 progress, `docs/supabase.md`, and the Phase 26 spectator migration;
- create this progress report and append the matching `progress/PROGRESS.csv` row;
- create one additive Supabase migration implementing the approved companion sanitized Live spectator RPC;
- apply it only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous;
- run non-printing RLS/privacy probes;
- run lightweight verification.

Not authorized:

- app source/runtime implementation;
- test implementation beyond migration/probe support;
- public/guest spectation;
- public profiles;
- public leaderboards;
- service workers or push infrastructure;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 29 work;
- secret printing;
- original stable `brrrdle` repository work.

## Starting Repository State

Confirmed before editing:

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- branch: `main`
- `HEAD`: `a051931dad51e554be151bc45e811efc18f4f04d`
- `origin/main`: `a051931dad51e554be151bc45e811efc18f4f04d`
- remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`
- Supabase local project ref: `fdwmvgervclziuoxbmeg`
- original stable repo: not used; this pass stayed inside `brrrdle-dev`

Existing uncommitted Phase 28 planning/spec/progress artifacts were present and preserved.

## Work Performed

Created:

- `supabase/migrations/20260618004638_phase28_live_spectator_v2_daily_terminal_hold.sql`
- `progress/PROGRESS-STEP-207.md`

Updated:

- `progress/PROGRESS.csv`

## Migration Intent

The migration adds companion RPC `public.get_authenticated_live_v1_spectator_games_v2(p_limit integer default 50, p_terminal_window_seconds integer default 15)` while preserving the Phase 26 v1 RPC.

The v2 RPC is intended to enforce:

- authenticated-only execution;
- no anonymous/public execution;
- no broad raw `async_multiplayer_games` SELECT for nonparticipants;
- current UTC-day Daily exclusion;
- bounded terminal hold rows for `won`, `lost`, and `expired` statuses;
- sanitized outcome metadata;
- all-false spectator capabilities.

## Supabase Target And Migration Execution

Target confirmation without secrets:

- local linked Supabase project ref: `fdwmvgervclziuoxbmeg`
- dry-run result: only `20260618004638_phase28_live_spectator_v2_daily_terminal_hold.sql` would be pushed
- migration execution: `supabase db push --linked` applied `20260618004638_phase28_live_spectator_v2_daily_terminal_hold.sql`
- remote migration history confirmed `20260618004638` present

The standalone `supabase` binary was not on `PATH`, so Stage 28.3 used `npm exec --yes supabase -- ...` with Supabase CLI `2.107.0`. One read-only `projects list` attempt produced no output and was interrupted before any remote change. The linked project ref and dry-run were unambiguous before migration execution.

## Non-Printing Privacy Probes

Passed with disposable users/rows and cleanup:

- anon v2 execution denied;
- authenticated nonparticipant v2 execution allowed only through sanitized rows;
- Practice `playing` row returned;
- Practice terminal row inside the hold window returned;
- Practice terminal row outside the hold window not returned;
- waiting row not returned;
- cancelled row not returned;
- current UTC-day Daily `playing` row not returned;
- current UTC-day Daily terminal row not returned;
- non-current Daily row returned under the approved current-day exclusion rule;
- terminal row included sanitized terminal metadata and outcome;
- returned rows contained no forbidden raw projection/session/answer/auth/token/id fields checked by the probe;
- all spectator capabilities remained false;
- nonparticipant raw `async_multiplayer_games` select for a participant-complete `playing` row returned no rows;
- participant read/update behavior remained available for the participant-owned fixture row;
- participant users did not receive their own games through the v2 spectator RPC;
- Phase 26 v1 RPC remained callable;
- cleanup passed.

## Verification

Passed:

- `git diff --check`;
- Python CSV shape check using `python3 -S`;
- `git status --short --branch`.

## Blockers

None.

## Boundary Confirmation

No app source/runtime implementation, test implementation beyond migration/probe support, public/guest spectation, public profiles, public leaderboards, service workers or push infrastructure, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 29 work, secret printing, or original stable `brrrdle` repository work was performed.
