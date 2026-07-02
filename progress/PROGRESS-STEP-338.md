# Progress Step 338 - Phase 40 Stage 40.3 Private Matchmaking Migration/RLS Execution

**Status**: Completed - Awaiting User Review Before Stage 40.4
**Phase**: Phase 40 - Public Profiles And Private Matchmaking
**Stage**: 40.3 - Private Matchmaking Migration/RLS Execution
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T22:05:00Z
**Completed**: 2026-07-01T22:19:53Z

## Authorization

The user authorized Phase 40 Stage 40.3 only: private matchmaking migration/RLS execution following the approved Stage 40.2 addendum. This included reading governance, Phase 40 planning/spec/addendum/implementation materials, current progress records, public profile/privacy Supabase context, multiplayer private request/rematch/custom lobby context, creating this progress report and matching 12-column CSV row, creating exactly one additive Supabase migration implementing the Stage 40.2 addendum, applying it only to the confirmed `brrrdle-dev` Supabase project if target and credentials were unambiguous, running required non-printing probes, updating Supabase/ranked docs only if needed, and running lightweight verification.

This pass does not authorize source/runtime public profile or private matchmaking UI integration, app route changes, broad test implementation beyond migration/probe support if absolutely needed, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- `origin/main`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The checked-off user-edited `planning/phase-39/REVIEW-CHECKLIST.md` state was preserved.

## Supabase Target Confirmation

- The linked Supabase project metadata was present and format-valid.
- The Supabase CLI project-list check matched the linked project to the intended `brrrdle-dev` project name.
- No project ref, Supabase key, database URL, password, JWT, token, email, raw auth ID, or private data was printed.

## Migration Created And Applied

Created exactly one additive migration:

- `supabase/migrations/20260701221500_phase40_private_match_requests.sql`

The migration creates:

- `public.multiplayer_private_match_requests`
- `public.phase40_expire_private_match_requests()`
- `public.phase40_private_match_request_response(text, uuid, boolean, boolean)`
- `public.create_private_multiplayer_match_request(uuid, text, integer, boolean, integer, integer, text, timestamptz)`
- `public.get_private_multiplayer_match_requests(text, integer)`
- `public.cancel_private_multiplayer_match_request(text)`
- `public.decline_private_multiplayer_match_request(text)`
- `public.accept_private_multiplayer_match_request(text, jsonb, text)`

The migration grants only the browser-facing request/list/cancel/decline/accept RPCs to `authenticated`. It revokes direct table access from `public`, `anon`, and `authenticated`, revokes helper-function browser grants, and does not grant direct browser table access.

Pre-apply dry-run showed only:

- `20260701221500_phase40_private_match_requests.sql`

Remote apply completed successfully against the confirmed `brrrdle-dev` Supabase project. Non-fatal notices reported the pre-existing `pgcrypto` extension and the expected first-run absence of the participant-read policy before creation.

## SQL/RLS Contract Implemented

- Direct private match requests require authenticated callers.
- Requester and opponent must both have active public profiles at creation.
- Opponent/requester active profile eligibility is rechecked at acceptance.
- Requests are Practice-only, unranked-only, OG/GO-only, and bounded to word lengths `2` through `35`.
- GO requests require a positive GO puzzle count.
- OG requests reject GO puzzle counts.
- Request expiry must be within the next 10 minutes.
- Active outgoing pending requests are capped at `5`.
- Recent outgoing request creation is capped at `20` per hour.
- Duplicate active pairs are prevented by an unordered-pair partial unique index.
- Requester-only cancellation, opponent-only decline, opponent-only accept, idempotent create, and idempotent accept are enforced.
- Accepted requests create exactly one fresh unranked Practice `async_multiplayer_games` row with no Daily date key, no ranked flag, no rating bucket, no matchmaking request ID, and no custom game code.
- Existing public profile, public leaderboard, participant identity, public/guest spectator, ranked queue, rematch, custom lobby, Daily claim, gameplay, and Elo boundaries are preserved.
- `custom_game_lobbies` RLS was not changed.

## Documentation Update

Updated:

- `docs/supabase.md`

The documentation now names the Phase 40 private matchmaking migration, records its authenticated-only direct-request scope, lists its safe payload boundaries, and explicitly states that source/UI private matchmaking integration remains later Phase 40 work after migration/probe verification.

## Non-Printing Probe Results

The Stage 40.3 probe used temporary users/profiles and removed temporary users/game rows afterward. It printed only probe labels/counts, not secrets, refs, auth IDs, emails, keys, tokens, game payloads, or private data.

Probe summary: `passed count=30`; cleanup attempted for `users=13 games=1`.

Passed probes covered:

- anon create denial;
- anon list denial;
- anon direct table read denial;
- authenticated direct table read denial;
- helper RPC denial to authenticated callers;
- self-request denial;
- private profile target denial;
- hidden profile target denial;
- suspended profile target denial;
- missing profile target denial;
- GO request puzzle-count requirement;
- OG request GO-puzzle-count denial;
- idempotent duplicate request preservation;
- nonparticipant cancel denial;
- nonparticipant accept denial;
- opponent cancel denial;
- requester cancel success;
- requester decline denial;
- opponent decline success;
- expired accept denial;
- requester accept denial;
- Daily projection accept denial;
- opponent accept success;
- accepted-game Practice-only/unranked contract preservation;
- accept idempotency preservation;
- participant-scoped listing preservation;
- outgoing active request cap denial;
- public profile RPC preservation;
- public spectator RPC preservation;
- anon Daily claim RPC denial preservation.

## Verification

Stage 40.3 lightweight verification passed:

- `npx --yes supabase db push --linked --dry-run` before apply reported only the new Phase 40 migration would be pushed.
- `npx --yes supabase db push --linked --yes` applied the migration successfully to the confirmed `brrrdle-dev` Supabase project.
- Non-printing Stage 40.3 probes passed `30` checks and cleaned up temporary users/game rows.
- `git diff --check`
- Progress CSV shape check using `python3 -S` reported `rows=340 columns=[12] last_id=338`.
- Non-printing credential-shaped secret/artifact scan reported `scanned_files=18 credential_pattern_hits=0`.
- Final `npx --yes supabase db push --linked --dry-run` reported the remote database is up to date.
- Watched-port cleanup check found no listeners on `5173`, `5174`, `3000`, or `4173`.
- The exact forbidden-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch` completed with expected uncommitted Phase 40 planning/spec/progress artifacts, the checked-off Phase 39 checklist, the Stage 40.3 migration, and the Supabase documentation update.

Note: an initial overbroad artifact check counted existing tracked project files under a wider pattern. The precise Stage 40.3 forbidden-artifact check above passed and found no forbidden tracked or staged artifacts.

## Blockers And Open Questions

No blockers were found for Stage 40.4 source integration planning.

Open questions for Stage 40.4:

- The source integration should map the new RPC rows into strict TypeScript allowlists before UI rendering.
- Direct private request notifications/routing should remain authenticated-only and should not expose raw auth IDs, emails, private profile fields, queue internals, rating internals, projections, sessions, answers, seeds, tokens, or local artifacts.
- Stage 40.4 should remain focused on public profile route/clickable identity source integration before Stage 40.5 private matchmaking UI/source integration.

## Boundary Confirmation

No source/runtime public profile or private matchmaking UI integration, app route changes, broad test implementation, Vercel or Supabase configuration changes, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
