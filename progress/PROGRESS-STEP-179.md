# Progress Step 179 - Phase 26 Stage 26.5B Live v1 Authenticated Spectator Migration/RLS

**Date**: 2026-06-15
**Branch**: `main`
**Repository**: `brrrdle-dev`
**HEAD**: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
**Origin main**: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
**Status**: Completed - Awaiting User Review Before Stage 26.5C

## Scope

Stage 26.5B is limited to the Live v1 authenticated spectator Supabase migration/RLS work described by the Stage 26.5A addendum.

Authorized work includes creating the Supabase migration SQL, applying it only to the intended `brrrdle-dev` Supabase project if the project target is unambiguous, running non-secret migration/RLS privacy probes, focused verification, and progress updates.

This step does not authorize Live v1 source/runtime implementation, test implementation beyond migration/probe support, public/guest spectation, Phase 26.5C app implementation, Phase 26.6 work, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, new custom skills, or original stable `brrrdle` repository work.

## Repository State

- Working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- Remote: `origin` points to `https://github.com/ryanjosephkamp/brrrdle-dev.git`
- Local `HEAD`: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
- `origin/main`: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
- Original stable `brrrdle` checkout was not used.

## Context Reviewed

Required reading and migration/RLS inspection were completed before writing the migration:

- `CONSTITUTION.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `BRRRDLE-SPEC.md`
- `planning/phase-26/PLANNING-BRIEF.md`
- `planning/specs/phase-26/PHASE-26-POLISH-NOTIFICATIONS-AND-LIVE-V1-SPEC-2026-06-15.md`
- `planning/phase-26/IMPLEMENTATION-PLAN.md`
- `planning/specs/phase-26/PHASE-26-LIVE-V1-SPECTATOR-MIGRATION-RLS-ADDENDUM-2026-06-15.md`
- `planning/testing/TESTING-SUITE.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-178.md`
- `docs/supabase.md`
- `agents.md`
- `memory.md`
- relevant Supabase migrations/RLS policies for `async_multiplayer_games`, grants, Daily claims, and realtime publication
- relevant `src/multiplayer/` repository, view-model, Live, and game model surfaces

## Work Completed

Created local migration:

- `supabase/migrations/20260615235440_phase26_live_v1_authenticated_spectator_projection.sql`

The migration is additive and defines:

- a partial index for active filled `async_multiplayer_games` Live spectator discovery;
- `public.get_authenticated_live_v1_spectator_games(integer)`;
- authenticated-only sanitized spectator rows;
- no broad raw `async_multiplayer_games` SELECT policy changes;
- no persistent spectator presence table;
- no public/guest access.

## Project Target Confirmation

Confirmed without printing secrets:

- Supabase connector project: `brrrdle-dev`
- Supabase project ref: `fdwmvgervclziuoxbmeg`
- Local `.env.local` Supabase URL ref: `fdwmvgervclziuoxbmeg`
- Remote migration list before execution matched the existing repo migration history and did not contain the Phase 26 migration.

## Migration Execution

Migration applied through the Supabase connector to project `fdwmvgervclziuoxbmeg`.

Remote migration list after execution includes:

- `20260615235440` - `phase26_live_v1_authenticated_spectator_projection`

## RLS And Privacy Probes

Passed using temporary authenticated users and a temporary Practice Multiplayer probe row. No secrets, keys, row data, auth IDs, emails, or private values were printed.

- Anonymous RPC execution was denied.
- Authenticated nonparticipant spectator RPC execution succeeded.
- Spectator RPC output returned the temporary playing game through the sanitized projection.
- Recursive forbidden-key/value scan found no `projection`, `serializedSession`, `playerSessions`, answer fields, seed fields, raw auth ids, emails, private profile data, or raw move ids in the RPC output.
- Spectator raw active-row SELECT returned no row.
- Participant raw active-row SELECT still returned the participant-owned row.
- Temporary probe row and temporary auth users were cleaned up.

## Verification

Passed:

- Focused multiplayer tests: `npm run test -- src/multiplayer/multiplayerRepository.test.ts src/multiplayer/multiplayerViewModels.test.ts src/multiplayer/multiplayer.test.ts` - 3 files, 40 tests.
- `git diff --check` - passed.
- Progress CSV shape check using Python `csv` parsing - passed, 181 rows including header, 12 columns each, last_id=179.
- Remote migration list confirmation - passed.

## Status

Stage 26.5B is complete.

The next safe gated action is Stage 26.5C Live v1 app implementation using the sanitized RPC. Stage 26.6 should not start until Stage 26.5C is completed or Live v1 app implementation is explicitly deferred.

## Boundary Confirmation

No Live v1 source/runtime implementation, public/guest spectation, service workers, push infrastructure, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 26.6 work, new custom skills, or original stable `brrrdle` repository work was performed.
