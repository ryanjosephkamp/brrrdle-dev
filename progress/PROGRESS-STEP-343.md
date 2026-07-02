# Progress Step 343 - Phase 40 Stage 40.5A Private Matchmaking Accept Contract Repair Addendum Planning

**Status**: Completed - Awaiting User Review Before Stage 40.5B
**Phase**: Phase 40 - Public Profiles And Private Matchmaking
**Stage**: 40.5A - Accepted-game contract repair addendum planning
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T23:08:00Z
**Completed**: 2026-07-01T23:18:13Z

## Authorization

The user authorized Phase 40 Stage 40.5A only: documentation-only accepted-game contract repair addendum planning for the Stage 40.5 private matchmaking blocker. This included reading governance, Phase 40 planning/spec/addendum/implementation materials, Stage 40.3 migration/probe evidence, Stage 40.4C verification, Stage 40.5 blocked progress, the private request migration, public profile/privacy surfaces, multiplayer projection/source surfaces, and relevant tests enough to define the smallest safe migration/RLS repair path.

This pass does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- `origin/main`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The checked-off user-edited `planning/phase-39/REVIEW-CHECKLIST.md` state was preserved.

## Addendum Created

Created:

- `planning/specs/phase-40/PHASE-40-PRIVATE-MATCHMAKING-ACCEPT-CONTRACT-REPAIR-ADDENDUM-2026-07-01.md`

The addendum records the Stage 40.5 blocker and defines the smallest safe migration/RLS repair path before private matchmaking source integration can resume.

## Key Repair Decisions

- Add a versioned browser RPC: `public.accept_private_multiplayer_match_request_v2(text, jsonb, text default null)`.
- Keep the existing sanitized Stage 40.3 private request response shape.
- Preserve raw requester/opponent auth IDs as server-owned data only.
- Require browser accept projections to omit `playerUserIds`.
- Reject browser-supplied `playerUserIds` rather than trusting or merging them.
- Derive requester/opponent raw auth IDs from the locked `multiplayer_private_match_requests` row server-side.
- Inject canonical `playerUserIds` into the stored `async_multiplayer_games.projection` server-side.
- Set `host_user_id`, `player_one_user_id`, and `player_two_user_id` from the locked request row server-side.
- Revoke browser execution from the original v1 accept RPC so source integration targets the repaired v2 contract.
- Preserve Practice-only, unranked-only, authenticated-only, active-public-profile, opponent-only, idempotent, Daily/ranked/custom-code/spectator/rating/queue-excluded boundaries.
- Require Stage 40.5 source integration to refresh participant-owned game rows after accept instead of locally constructing accepted games with unknown raw user IDs.

## Verification

Stage 40.5A is documentation-only. Lightweight documentation verification was run after this report, CSV row, and addendum were created:

- `git diff --check` passed.
- Progress CSV shape check using `python3 -S` reported `rows=345 columns=[12] last_id=343`.
- Non-printing changed-content credential scan reported `scanned_files=38 scanned_changed_or_untracked_lines=4396 credential_pattern_hits=0`.
- Ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check reported `watched_ports_clear=true` for `5173`, `5174`, `3000`, and `4173`.
- `git status --short --branch` completed on `main...origin/main` with the expected Phase 40 worktree changes and no staged files.

## Blockers And Open Questions

No blockers were found for Stage 40.5B addendum review and migration/RLS repair execution.

Open questions for Stage 40.5B:

- Should the v2 migration leave the v1 accept function definition in place but revoke browser execution, as recommended, or replace v1 behavior in place? The addendum recommends a versioned v2 RPC with v1 browser execution revoked.
- Should the server inject only `playerUserIds`, or also normalize safe display profile fields in the stored projection from active public profiles? The addendum requires canonical raw IDs server-side and leaves safe display profile strategy to the migration implementation if it can stay within existing source assumptions.
- Should Stage 40.5 source integration refresh the accepted game from the repository immediately after v2 accept? The addendum recommends yes.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration change, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation contract change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
