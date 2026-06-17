# Progress Step 189 - Phase 27 Stage 27.2 Migration/RLS Addendum Planning

**Phase**: Phase 27
**Stage**: Stage 27.2 - Migration/RLS Addendum Planning
**Status**: Completed - Awaiting User Review Before Explicit Migration Execution Authorization
**Started**: 2026-06-16T05:17:30Z
**Completed**: 2026-06-16T05:20:17Z

## Authorization

The user authorized Phase 27 Stage 27.2 only: trusted settlement and ranked queue migration/RLS addendum planning.

Authorized work includes reading governance, Phase 27 planning/spec/implementation-plan materials, progress records, Supabase documentation, competitive multiplayer source/tests, Supabase migrations/RLS policies, auditing current competitive/rating/queue/async game/Live v1 spectator policy surfaces, creating a precise migration/RLS addendum plan, updating progress records, and running lightweight documentation verification.

The authorization does not include source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work.

## Repository State

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Confirmed target is `brrrdle-dev`, not the original stable `brrrdle` repository.
- Current branch at kickoff: `main`
- Local `HEAD` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- `origin/main` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- Local `main` matched `origin/main` at kickoff.

## Work Completed

- Audited existing competitive tables, rating transaction tables, ranked queue table, async multiplayer game policies, Daily claim policies, and Phase 26 Live v1 spectator projection policy.
- Confirmed the existing competitive schema already intends trusted server settlement by denying direct browser writes to rating profiles, match results, player results, and rating transactions.
- Confirmed the existing queue table needs Stage 27.1 compatibility details before durable ranked matchmaking authority, especially Hard Mode matching and timed Practice ranked deferral.
- Confirmed the existing Phase 26 spectator projection should remain a privacy boundary and must not become rating settlement or queue authority.
- Created `planning/specs/phase-27/PHASE-27-TRUSTED-SETTLEMENT-AND-MATCHMAKING-RLS-ADDENDUM-2026-06-16.md`.
- Appended this progress row to `progress/PROGRESS.csv`.
- Did not create or run Supabase migrations.

## Addendum Summary

The addendum recommends one future additive migration, after explicit authorization, that:

- adds queue/audit columns needed by Phase 27.1 compatibility and rating auditability;
- introduces authenticated-only `security definer` RPCs for ranked Practice queue creation, cancellation, and atomic pair claiming;
- introduces an authenticated-only trusted settlement RPC that derives rating evidence from durable `async_multiplayer_games` rows and applies idempotent rating movement;
- preserves direct-write denial on rating tables;
- preserves raw `async_multiplayer_games` privacy and the Phase 26 sanitized spectator projection boundary;
- rejects Daily ranked, timed Practice ranked, public/guest ranked matchmaking, spectator settlement, and any client-supplied rating movement.

## Verification Plan

Documentation-only verification:

- `git diff --check`
- Python `csv` shape check for `progress/PROGRESS.csv`
- `git status --short --branch`

## Results

Stage 27.2 documentation verification passed:

- `git diff --check` passed.
- Python `csv` shape check passed for `progress/PROGRESS.csv`: 191 rows including header, 12 columns each, and `last_id=189`.
- `git status --short --branch` completed and showed the expected existing Phase 26/27 dirty planning/source artifacts plus the new Stage 27.2 addendum/progress files.

One read-only Python CSV invocation stalled without output and was interrupted; it did not change repository state. The check was rerun successfully with a simpler `csv.reader(open(...))` command.

## Next Step

Stage 27.3 or Stage 27.2B migration execution remains gated and requires explicit user authorization before creating or running migration SQL.

## Boundary Confirmation

Stage 27.2 planning is complete. No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
