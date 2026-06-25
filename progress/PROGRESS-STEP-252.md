# Progress Step 252: Phase 32 Stage 32.3 Participant Identity Migration/RLS Execution

**Date:** 2026-06-24
**Phase:** Phase 32 Stage 32.3 - Participant identity migration/RLS execution
**Status:** Completed - Awaiting User Review Before Stage 32.4 Rematch Lifecycle Stabilization

## Authority

User authorized Phase 32 Stage 32.3 participant identity migration/RLS execution only, following the approved Stage 32.2 addendum.

This pass may read governance, Phase 32 planning/spec/addendum/implementation materials, progress records, Supabase docs, relevant source/migration surfaces read-only; confirm the Supabase target; create this progress report and matching CSV row; create exactly one additive Supabase migration; apply it only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous; run non-printing privacy probes; and run lightweight verification.

## Boundaries

This pass does not authorize app source/runtime implementation, tests beyond migration/probe support, rematch fixes, queue/lobby routing fixes, account accent fixes, no-comma rating fixes, Phase 33 ranked expansion, public/guest spectation, service workers, push infrastructure, deployments, commits, pushes, PR creation, merge, release, branch deletion, Elo/gameplay changes, new custom skills, force-push, secret printing, private data exposure, local session artifact exposure, or original stable repository work.

## Initial State

- Repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- `origin/main`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- Supabase target: confirmed through local project ref and Supabase project listing as `brrrdle-dev`, ref `fdwmvgervclziuoxbmeg`.
- Original stable repository: not used.
- Existing uncommitted work preserved: Phase 32 planning/spec/progress artifacts plus the Stage 32.0 baseline test-fixture repair, Stage 32.1 audit report, and Stage 32.2 addendum/progress report.

## Work Plan

- Create one additive migration implementing `public.get_multiplayer_participant_identity_summaries(p_game_id text default null, p_ranked_request_id text default null)`.
- Apply the migration to the confirmed `brrrdle-dev` Supabase project only if target and credentials remain unambiguous.
- Run non-printing privacy probes for grants, output shape, anon denial, participant scoping, and forbidden-field absence.
- Run `git diff --check`, Python CSV shape check using `python3 -S`, and `git status --short --branch`.

## Work Completed

- Created exactly one additive migration: `supabase/migrations/20260624233635_phase32_participant_identity_rpc.sql`.
- Implemented `public.get_multiplayer_participant_identity_summaries(p_game_id text default null, p_ranked_request_id text default null)`.
- Confirmed the migration dry run would apply exactly the one Phase 32 migration.
- Applied the migration to the confirmed `brrrdle-dev` Supabase project ref `fdwmvgervclziuoxbmeg`.
- Confirmed remote migration history includes `20260624233635 phase32_participant_identity_rpc`.
- Confirmed a post-apply dry run reports the remote database is up to date.

## Privacy/Surface Probe Results

- Passed: metadata probe confirmed function existence, authenticated execute grant, anon execute denial, exactly nine allow-listed return columns, and zero unexpected return columns.
- Passed: unauthenticated/invalid context probe returned denied behavior.
- Passed: game-context probe confirmed participant lookup works, nonparticipant lookup is denied, and unavailable/public profile rows preserve the expected null/allow-list behavior without printing identifiers.
- Passed: matched ranked queue probe confirmed owned matched ranked Practice queue lookup works, non-owner lookup is denied, and nonmatched queue requests return no identity rows.
- Passed: surface probe confirmed the RPC is `security definer` with explicit `search_path`, direct public profile table reads remain denied to `anon` and `authenticated`, and the Phase 29 public profile, Phase 30 leaderboard, and Phase 31 rematch RPCs still exist.

## Verification Results

- Passed: `git diff --check`.
- Passed: Python CSV shape check using `python3 -S` reported `rows=254 columns=[12] last_id=252`.
- Passed: `git status --short --branch` showed expected existing Phase 32 planning/docs/progress changes, the Stage 32.0 baseline test-fixture repair, Stage 32.1 audit report, Stage 32.2 addendum/progress report, the new Stage 32.3 progress report, and the new Phase 32 migration file.

## Next Gate

If migration execution and probes pass, review this Stage 32.3 report and authorize Stage 32.4 rematch lifecycle stabilization before app source/runtime implementation.
