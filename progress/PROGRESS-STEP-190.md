# Progress Step 190 - Phase 27 Stage 27.3 Trusted Settlement And Ranked Queue Migration/RLS

**Phase**: Phase 27
**Stage**: Stage 27.3 - Trusted Settlement And Ranked Queue Migration/RLS
**Status**: Blocked - Awaiting Corrective Migration Authorization
**Started**: 2026-06-16T05:30:09Z
**Completed**: 2026-06-16T05:44:26Z

## Authorization

The user authorized Phase 27 Stage 27.3 only: trusted settlement and ranked queue migration/RLS execution.

Authorized work includes reading governance, Phase 27 planning/spec/implementation-plan materials, the Stage 27.2 addendum, progress records, Supabase documentation, competitive multiplayer source/tests, relevant Supabase migrations/RLS policies, creating one additive Supabase migration SQL file, applying it only to the intended `brrrdle-dev` Supabase project if the target is unambiguous, running non-printing RLS/privacy probes, running focused verification, and updating progress records.

The authorization does not include app source/runtime implementation beyond migration/probe support, UI work, public leaderboards, public profiles, public/guest spectation, deployments, commits, pushes, PR creation, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work.

## Repository State

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Confirmed target is `brrrdle-dev`, not the original stable `brrrdle` repository.
- Current branch at kickoff: `main`
- Local `HEAD` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- `origin/main` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- Local `main` matched `origin/main` at kickoff.
- Existing uncommitted Phase 26/27 planning and Stage 27.1 competitive-domain artifacts were present before Stage 27.3 and were preserved.

## Work Planned

- Create one additive Supabase migration for Phase 27 ranked queue authority and trusted settlement RPCs.
- Confirm the linked Supabase target without printing secrets before remote execution.
- Apply the migration only if the target is unambiguous.
- Run non-printing RLS/privacy probes for queue RPC access, settlement authority, direct-write denial, raw async row privacy, and Live v1 spectator sanitization.
- Run focused verification required by Stage 27.3.

## Work Completed

- Created `supabase/migrations/20260616054019_phase27_trusted_settlement_ranked_queue.sql`.
- Confirmed the linked Supabase target was `fdwmvgervclziuoxbmeg`, the `brrrdle-dev` project, distinct from the original stable `brrrdle` project.
- Applied the migration through the Supabase migration tool after the local Supabase CLI reported that no access token/login was available.
- Confirmed the remote migration list includes `20260616054019 phase27_trusted_settlement_ranked_queue`.
- Ran a non-printing RLS/privacy probe harness using temporary authenticated users and cleanup.

## Results

Stage 27.3 is blocked by a settlement RPC bug found during RLS/privacy probes.

Passed probe checks before the blocker:

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

Blocking probe:

- Participant settlement failed with PostgreSQL error: `column reference "user_id" is ambiguous`.

The temporary probe users and rows were cleaned up successfully. No secret values, Supabase keys, auth state, private user data, screenshots, videos, traces, or local session artifacts were printed.

## Next Step

Create and explicitly authorize a narrow corrective Stage 27.3B migration that replaces `public.settle_ranked_async_multiplayer_match` with an unambiguous implementation, likely by avoiding output-parameter names that collide with table columns and by replacing `on conflict (user_id, bucket)` with `on conflict on constraint multiplayer_rating_profiles_pkey` or equivalent explicit references. After the corrective migration, rerun the full Stage 27.3 non-printing RLS/privacy probe plan.

## Boundary Confirmation

Stage 27.3 is blocked after one authorized migration application. No corrective migration, app source/runtime implementation, UI work, public leaderboards, public profiles, public/guest spectation, deployments, commits, pushes, PRs, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
