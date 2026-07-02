# Progress Step 344 - Phase 40 Stage 40.5B Private Matchmaking Accept Contract Migration/RLS Repair Execution

**Status**: Completed - Awaiting User Review Before Stage 40.5
**Phase**: Phase 40 - Public Profiles And Private Matchmaking
**Stage**: 40.5B - Private matchmaking accept-contract migration/RLS repair execution
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T23:20:00Z
**Completed**: 2026-07-01T23:34:09Z

## Authorization

The user authorized Phase 40 Stage 40.5B only: private matchmaking accept-contract migration/RLS repair execution following the approved Stage 40.5A addendum. This included reading governance, Phase 40 planning/spec/addendum/implementation materials, Stage 40.3 migration/probe evidence, Stage 40.4C verification, Stage 40.5 blocked progress, Stage 40.5A repair addendum/progress, creating the next progress report and matching 12-column CSV row, creating exactly one additive Supabase migration implementing the Stage 40.5A repair contract, applying it only to the confirmed `brrrdle-dev` Supabase project if target and credentials were unambiguous, running required non-printing probes, updating docs only if needed, and running lightweight verification.

This pass does not authorize private matchmaking source/UI integration, app route changes, broad test implementation beyond migration/probe support if absolutely needed, unrelated migrations, Vercel/Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- `origin/main`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The checked-off user-edited `planning/phase-39/REVIEW-CHECKLIST.md` state was preserved.

## Supabase Target Confirmation

- Supabase CLI access used `npx --yes supabase`; no global CLI binary was required.
- The linked Supabase project was confirmed as `brrrdle-dev` using non-printing project metadata checks.
- Project refs, API keys, service-role keys, database URLs, JWTs, temporary emails, raw auth IDs, and private row payloads were not printed.

## Migration Created And Applied

Created and applied exactly one additive migration:

- `supabase/migrations/20260701232434_phase40_private_match_accept_contract_repair.sql`

The migration adds `public.accept_private_multiplayer_match_request_v2(text, jsonb, text default null)`, revokes browser execution from the Stage 40.3 v1 accept RPC, revokes/grants v2 so only `authenticated` can execute it, and preserves direct table/helper denial for browser roles.

## Repair Behavior

- v2 keeps the existing sanitized private match request response shape.
- v2 rejects browser-supplied `playerUserIds`.
- v2 derives requester/opponent raw auth IDs server-side from the locked `multiplayer_private_match_requests` row.
- v2 injects canonical `playerUserIds` into the stored `async_multiplayer_games.projection` server-side.
- v2 keeps accepted games Practice-only, unranked-only, active-public-profile-gated, opponent-only, idempotent, and excluded from Daily, ranked queues, custom-game codes, spectator authority, rating mutation, and Daily claim authority.
- Source/UI private matchmaking integration was not started.

## Documentation Updated

Updated:

- `docs/supabase.md`

The documentation now records the Stage 40.5B v2 accept contract, v1 browser execution revocation, server-side participant identity injection, sanitized response boundary, and the fact that source/UI integration remains a later Stage 40.5 gate.

## Non-Printing Probe Results

The compact Stage 40.5B probe passed 21 non-printing checks and completed cleanup. It covered:

- `anon` v1/v2 accept denial.
- authenticated v1 accept revocation.
- helper RPC and direct table browser denial.
- requester and nonparticipant accept denial.
- browser-supplied `playerUserIds` rejection.
- opponent accept success with a projection that omits `playerUserIds`.
- sanitized response forbidden-key scan.
- accepted-game Practice/unranked exclusions.
- canonical row columns and server-injected stored projection `playerUserIds`.
- repeat accept idempotency.
- different-game, expired-request, and inactive-profile denial.
- public profile RPC preservation.
- public/guest spectator RPC preservation.
- Daily claim anonymous grant hardening preservation.
- temporary user/profile/request/game cleanup.

## Verification

Lightweight verification passed after this report and CSV row were created:

- `git diff --check` passed.
- Progress CSV shape check using `python3 -S` reported `rows=346 columns=[12] last_id=344`.
- Non-printing changed-content credential scan reported `scanned_files=40 scanned_changed_or_untracked_lines=4804 credential_pattern_hits=0`.
- Ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check reported `watched_ports_clear=true` for `5173`, `5174`, `3000`, and `4173`.
- `npx --yes supabase db push --linked --dry-run` reported the remote database is up to date.
- `git status --short --branch` completed on `main...origin/main` with the expected uncommitted Phase 40 worktree changes and no staged files.

## Blockers And Open Questions

No blockers were found for Stage 40.5 private matchmaking source integration review.

Open question for Stage 40.5 source integration:

- Source should call `accept_private_multiplayer_match_request_v2`, omit `playerUserIds` from browser accept payloads, and refresh/open the returned `created_game_id` through participant-owned repository reads.

## Boundary Confirmation

No private matchmaking source/UI integration, app route change, broad test implementation, unrelated migration, Vercel/Supabase configuration change, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation contract change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
