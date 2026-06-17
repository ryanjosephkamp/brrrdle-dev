# Progress Step 191 - Phase 27 Stage 27.3B Corrective Settlement RPC Migration

**Phase**: Phase 27
**Stage**: Stage 27.3B - Corrective Settlement RPC Migration
**Status**: Completed - Awaiting User Review Before Stage 27.4
**Started**: 2026-06-16T05:48:48Z
**Completed**: 2026-06-16T05:54:52Z

## Authorization

The user authorized Phase 27 Stage 27.3B only: a narrow corrective migration for the Stage 27.3 settlement RPC blocker where participant settlement failed with `column reference "user_id" is ambiguous`.

Authorized work includes reading governance, Phase 27 implementation and migration/RLS addendum materials, progress records, Supabase documentation, creating one additive corrective Supabase migration, applying it only to the confirmed `brrrdle-dev` Supabase project `fdwmvgervclziuoxbmeg`, rerunning the full non-printing Stage 27.3 RLS/privacy probe harness, and updating progress records.

The authorization does not include app source/runtime/UI work, Stage 27.4, public leaderboards, public profiles, public/guest spectation, deployments, commits, pushes, PR creation, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work.

## Repository State

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Confirmed target is `brrrdle-dev`, not the original stable `brrrdle` repository.
- Current branch at kickoff: `main`
- Local `HEAD` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- `origin/main` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- Local `main` matched `origin/main` at kickoff.
- Existing uncommitted Phase 26/27 planning, Stage 27.1, Stage 27.2, and Stage 27.3 artifacts were present before Stage 27.3B and were preserved.

## Work Planned

- Create one additive corrective migration that replaces only `public.settle_ranked_async_multiplayer_match(text, text)` with an implementation that avoids ambiguous profile `user_id` and `bucket` references.
- Preserve authenticated-only security-definer behavior, idempotency, matched queue reservation requirements, Daily/timed ranked deferrals, rating audit columns, grants, and return contract.
- Apply the migration only to confirmed Supabase project `fdwmvgervclziuoxbmeg`.
- Rerun the full Stage 27.3 non-printing RLS/privacy probe harness.
- Run `git diff --check`, a Python CSV shape check, and `git status --short --branch`.

## Work Completed

- Created `supabase/migrations/20260616055149_phase27_settlement_rpc_unambiguous_profile_upsert.sql`.
- Confirmed the linked local Supabase project ref is `fdwmvgervclziuoxbmeg`.
- Confirmed through the Supabase connector that `fdwmvgervclziuoxbmeg` is the `brrrdle-dev` project and that the original stable `brrrdle` project uses a different ref.
- Applied the corrective migration only to project `fdwmvgervclziuoxbmeg`.
- Confirmed the remote migration list includes `20260616055149 phase27_settlement_rpc_unambiguous_profile_upsert`.
- Reran the full non-printing Stage 27.3 RLS/privacy probe harness using temporary authenticated users and cleanup.
- Ran `git diff --check`, a Python CSV shape check, and `git status --short --branch`.

## Results

Stage 27.3B corrective verification passed.

Remote migration result:

- `20260616055149 phase27_settlement_rpc_unambiguous_profile_upsert` applied successfully to the confirmed `brrrdle-dev` Supabase project.

Probe checks passed:

- `anon` cannot create ranked queue requests.
- `anon` cannot execute ranked settlement.
- Authenticated user can create a ranked Practice queue request.
- Authenticated user cannot create ranked Daily queue requests.
- Authenticated user cannot create timed Practice ranked requests.
- Authenticated user cannot directly insert queue rows.
- Authenticated user cannot directly insert rating profiles.
- Authenticated second user can create a mismatched Hard Mode request.
- Different Hard Mode settings do not match.
- Caller can cancel own mismatched queued request.
- Authenticated second user can create a compatible queue request.
- Compatible ranked Practice requests pair exactly once.
- Matched queue request cannot be claimed again.
- Probe ranked game row can be inserted by admin support for settlement verification.
- Authenticated nonparticipant cannot settle the ranked match.
- Participant can settle eligible ranked Practice game.
- Participant repeat settlement is idempotent.
- Rating profile `games_played` remains one after idempotent repeat.
- Probe active game row can be inserted by admin support for privacy verification.
- Authenticated nonparticipant raw active row read returns no rows.
- Participant raw active row read remains intact.
- Authenticated spectator RPC remains callable.
- Spectator RPC output excludes forbidden keys.
- Temporary probe users and rows were cleaned up successfully.

Local verification passed:

- `git diff --check`
- Python CSV shape check: 193 rows including header, 12 columns, last id `191`
- `git status --short --branch`

## Next Step

Review Stage 27.3B results. If acceptable, explicitly authorize Stage 27.4 ranked settlement app integration before app source/runtime work.

## Boundary Confirmation

No app source/runtime/UI work, Stage 27.4 work, public leaderboards, public profiles, public/guest spectation, deployments, commits, pushes, PRs, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
