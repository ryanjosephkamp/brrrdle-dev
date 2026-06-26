# Progress Step 266: Phase 33 Stage 33.3 Timed Ranked Migration/RLS Execution

**Date:** 2026-06-26
**Phase:** Phase 33 - Competitive Ladder v2 Readiness
**Stage:** 33.3 - Timed Ranked Migration/RLS Execution
**Status:** Completed - Awaiting User Review Before Stage 33.4 Display-Only Rank Bands And Leaderboard Cleanup

## Authorization

The user authorized Phase 33 Stage 33.3 only: timed Practice ranked migration/RLS execution following the approved Stage 33.2 addendum.

Authorized work included reading governance, Phase 33 planning/spec/implementation materials, the Stage 33.2 addendum, current progress records, ranked queue/finalization/settlement/rating SQL context, participant identity RPC context, public leaderboard boundaries, creating the next progress report and CSV row, creating exactly one additive Supabase migration, applying it only to the confirmed `brrrdle-dev` Supabase project if target and credentials were unambiguous, running the non-printing probes required by the addendum, updating Supabase/ranked documentation as appropriate, and running lightweight verification.

The prompt did not authorize source/runtime implementation, app UI changes, test implementation beyond migration/probe support if absolutely needed, deployment, Vercel configuration, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- `origin/main`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- Existing uncommitted Phase 33 planning/spec/progress artifacts from prior stages were preserved.

## Supabase Target

- Supabase target confirmed without printing secrets.
- Active project used: `brrrdle-dev` (`fdwmvgervclziuoxbmeg`).
- Original stable project observed separately as `brrrdle` and not used.
- Supabase CLI was unavailable locally, so Stage 33.3 used the Supabase connector after target confirmation.

## Work Completed

Created:

- `supabase/migrations/20260626000925_phase33_timed_ranked_practice.sql`
- `progress/PROGRESS-STEP-266.md`

Updated:

- `docs/supabase.md`
- `docs/ranked-multiplayer.md`
- `progress/PROGRESS.csv`

## Migration Result

Applied exactly one additive migration to the confirmed `brrrdle-dev` Supabase project:

- Remote version: `20260626000925`
- Remote name: `phase33_timed_ranked_practice`
- Local path: `supabase/migrations/20260626000925_phase33_timed_ranked_practice.sql`

The migration implements the Stage 33.2 contract for:

- canonical `300000` ms timed ranked Practice only;
- timed storage buckets `async:og:timed:v1` and `async:go:timed:v1`;
- timed app bucket mappings for `multiplayer:og:timed:v1` and `multiplayer:go:timed:v1`;
- ranked queue creation, claim, status, and finalization compatibility;
- trusted timed settlement and timeout evidence checks;
- participant identity RPC compatibility for matched timed ranked queue contexts;
- rating profile/transaction bucket handling;
- public leaderboard timed bucket non-exposure;
- authenticated-only RPC grants and helper revokes.

Initial non-printing probes exposed ambiguity in the replaced trusted settlement RPC around `multiplayer_rating_profiles` upsert/update references. The local migration file was corrected and the live RPC definition was repaired to match the corrected migration definition without creating a second migration. A probe harness auth-seat assumption was also corrected by deriving seats from the ranked status RPC before projection finalization.

## Non-Printing Probe Results

Passed:

- Aggregate Stage 33.3 non-printing probe suite: `total_probes=31 passed_probes=31 failed_probes=0 failed_probe_names=[]`
- Probe residue check: `auth_probe_users=0 queue_probe_rows=0 game_probe_rows=0 result_probe_rows=0 rating_probe_rows=0`
- Remote migration list confirmed `20260626000925 phase33_timed_ranked_practice`.

Probe coverage included unauthenticated RPC denial, untimed ranked compatibility, canonical timed queue creation, unsupported timer rejection, Daily ranked rejection, timed/untimed no-match behavior, incompatible settings no-match behavior, matched timed status, participant identity queue context, finalization acceptance/rejection cases, timed settlement, settlement idempotency, Phase 33 timed settlement versioning, bad/valid timeout evidence, public leaderboard timed bucket rejection, and no direct authenticated ranked queue insert privilege.

## Documentation Updates

- `docs/supabase.md` now documents Phase 33 timed Practice ranked SQL/RLS readiness and the boundary that app source/UI support remains gated.
- `docs/ranked-multiplayer.md` now distinguishes current player-facing ranked Practice from Phase 33 migration-ready timed ranked support.

## Verification

Passed:

- `git diff --check`
- Progress CSV shape check using `python3 -S`: `rows=268 columns=[12] last_id=266`
- Non-printing secret/artifact scan over changed tracked and untracked repository files: `scanned_files=16 credential_pattern_hits=0 changed_artifacts=0`
- Ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- `git status --short --branch` showed expected Phase 33 planning/spec/progress documentation changes, Stage 33.3 docs updates, and the single Stage 33.3 migration file.

## Next Step

Review Stage 33.3. If approved, explicitly authorize Stage 33.4 display-only rank bands and public leaderboard cleanup before any source/runtime implementation, UI changes, tests, deployment, Vercel configuration, Git/GitHub operations, public/guest spectation, service workers, gameplay/Elo changes, backup workflow execution, or original stable repository work.

## Boundaries Preserved

No app source/runtime code, UI changes, test implementation beyond migration/probe support, deployment, Vercel configuration, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay/Elo changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work was performed.
