# Progress Step 337 - Phase 40 Stage 40.2 Migration/RLS Addendum Planning

**Status**: Completed - Awaiting User Review Before Stage 40.3
**Phase**: Phase 40 - Public Profiles And Private Matchmaking
**Stage**: 40.2 - Migration/RLS Addendum Planning
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T22:00:25Z
**Completed**: 2026-07-01T22:02:33Z

## Authorization

The user authorized Phase 40 Stage 40.2 only: migration/RLS addendum planning for public profiles and private matchmaking using the completed Stage 40.1 audit baseline. This included reading governance, Phase 40 planning/spec/implementation materials, Stage 40.1 audit findings, current progress records, public profile/privacy surfaces, multiplayer identity surfaces, private matchmaking/custom-code lobby surfaces, notification/routing surfaces, relevant tests, Supabase/RLS context as needed, creating this progress report and matching CSV row, and creating a precise Stage 40.2 migration/RLS addendum under `planning/specs/phase-40/`.

This pass does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work.

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

- `planning/specs/phase-40/PHASE-40-PRIVATE-MATCHMAKING-MIGRATION-RLS-ADDENDUM-2026-07-01.md`

The addendum defines the Stage 40.3 SQL/RLS contract for direct unranked Practice private match requests and records that public profile pages/cards/clickable identity can remain source-only if they use existing safe public profile RPCs and approved `public_profile_id` surfaces.

## Key Contract Decisions

- Public profile source integration should not require a new migration when it stays on `get_public_player_profile(uuid)` and `get_public_player_profiles(uuid[])`.
- Direct private matchmaking should use a new dedicated table/RPC family instead of broadening public profile, public spectator, participant identity, ranked queue, rematch, or custom lobby contracts.
- The proposed table is `public.multiplayer_private_match_requests`.
- Browser mutation/listing RPCs should be authenticated-only:
  - `create_private_multiplayer_match_request`
  - `get_private_multiplayer_match_requests`
  - `cancel_private_multiplayer_match_request`
  - `decline_private_multiplayer_match_request`
  - `accept_private_multiplayer_match_request`
- Helper functions should not receive browser grants.
- Direct requests should require active public profiles for both requester and opponent at creation, and again before acceptance.
- Direct requests should be Practice-only, unranked-only, OG/GO only, word lengths `2` through `35`, bounded by expiry, idempotent, cancellable, declinable, acceptable only by the opponent, and denied to nonparticipants.
- Accepted requests should create exactly one fresh unranked Practice `async_multiplayer_games` row with no Daily date key, no ranked flag, no rating bucket, no matchmaking request ID, and no custom game code.
- Stage 40.3 should not change `custom_game_lobbies` RLS. Custom-code/private invitation cleanup remains source-only only when it does not require RLS changes; otherwise it needs a later addendum.

## Forbidden Data And Mutation Boundaries

The addendum forbids output or mutation authority for raw auth IDs, emails, auth metadata, private profile fields, public profile drafts, progress/settings/history/stats/local persistence, answers, seeds, serialized sessions, player sessions, projections, moves, guesses, queue internals, ranked request IDs, rating internals, rating transactions, settlement IDs, Daily claim IDs, service IDs, tokens, Supabase keys, Vercel tokens, screenshots, videos, traces, auth state, local artifacts, and local session artifacts.

The migration must not create ranked private invitations, Daily match requests, custom-code game creation, rating settlement authority, Daily claim authority, public social graph behavior, public/guest spectation changes, spectator presence/count/list behavior, service workers, push subscriptions, gameplay-rule changes, or Elo changes.

## Probe Expectations

The addendum requires non-printing probes for:

- grant behavior for `anon`, `authenticated`, helper functions, and direct table access;
- active public profile eligibility;
- private/hidden/suspended/missing/self profile denial;
- duplicate active pair request behavior;
- outgoing request caps;
- nonparticipant denial;
- requester-only cancel;
- opponent-only decline/accept;
- stale/expired denial;
- accepted-game creation safety;
- forbidden-field scans over RPC output;
- preservation of public profile, public ranked leaderboard, participant identity, public/guest spectator, and Daily claim hardening behavior.

## Stage 40.3 Recommendation

Stage 40.3 should proceed after user review as migration/RLS execution only. It should create exactly one additive migration implementing the addendum, apply it only to the confirmed `brrrdle-dev` Supabase project if the target and credentials are unambiguous, run the addendum probes, update Supabase/ranked docs only if needed, record progress, and halt before source/runtime integration.

## Verification

Stage 40.2 lightweight verification passed:

- `git diff --check`
- Progress CSV shape check using `python3 -S` reported `rows=339 columns=[12] last_id=337`.
- Non-printing credential-shaped secret/artifact scan reported `scanned_files=15 credential_pattern_hits=0`.
- Ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check found no listeners on `5173`, `5174`, `3000`, or `4173`.
- `git status --short --branch` completed with the expected uncommitted Phase 40 planning/spec/progress artifacts and checked-off Phase 39 review checklist.

## Blockers And Open Questions

No blockers were found for Stage 40.3 migration/RLS execution planning.

Open questions for Stage 40.3 execution:

- Exact active outgoing request cap and recent-create rate limit values should be chosen in the migration implementation, with the addendum recommending bounded caps rather than unbounded requests.
- The accepted-game projection validation should follow the existing rematch pattern closely, but the Stage 40.3 implementer should stop if that requires broader source/runtime assumptions.
- If a truly private custom-code lobby contract becomes necessary, it should be split into a separate addendum rather than added to Stage 40.3 ad hoc.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
