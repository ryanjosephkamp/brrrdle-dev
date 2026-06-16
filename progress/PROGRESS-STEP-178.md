# Progress Step 178 - Phase 26 Stage 26.5A Live v1 Migration/RLS Addendum

**Date**: 2026-06-15
**Branch**: `main`
**Repository**: `brrrdle-dev`
**HEAD**: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
**Origin main**: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
**Status**: Completed - Awaiting Explicit Migration Execution Authorization Before Stage 26.5B

## Scope

Stage 26.5A is limited to planning/documentation for a Live v1 authenticated spectator migration/RLS addendum.

Authorized work includes reading the Stage 26.5 findings, current Supabase migrations/RLS policies, current multiplayer repository/view-model surfaces, and creating a precise migration/RLS addendum plan for sanitized authenticated Live v1 spectation.

This step does not authorize creating or running Supabase migrations, source/runtime implementation, test implementation, public/guest spectation, Phase 26.6 work, deployment, commits, pushes, PR creation, merges, releases, branch deletion, new custom skills, or original stable `brrrdle` repository work.

## Repository State

- Working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- Remote: `origin` points to `https://github.com/ryanjosephkamp/brrrdle-dev.git`
- Local `HEAD`: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
- `origin/main`: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
- Original stable `brrrdle` checkout was not used.

## Context Reviewed

Required reading and migration/RLS inspection were completed before writing the addendum:

- `CONSTITUTION.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `BRRRDLE-SPEC.md`
- `planning/phase-26/PLANNING-BRIEF.md`
- `planning/specs/phase-26/PHASE-26-POLISH-NOTIFICATIONS-AND-LIVE-V1-SPEC-2026-06-15.md`
- `planning/phase-26/IMPLEMENTATION-PLAN.md`
- `planning/testing/TESTING-SUITE.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-177.md`
- `agents.md`
- `memory.md`
- `docs/supabase.md`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- relevant multiplayer tests
- relevant Supabase migrations touching `async_multiplayer_games`, `live_match_spectators`, RLS, grants, Daily claims, and realtime publication

## Work Completed

Created:

- `planning/specs/phase-26/PHASE-26-LIVE-V1-SPECTATOR-MIGRATION-RLS-ADDENDUM-2026-06-15.md`

The addendum defines:

- the current blocker from answer-bearing `async_multiplayer_games.projection` data;
- why raw active-game SELECT should not be broadened for authenticated nonparticipants;
- a recommended authenticated-only sanitized RPC path;
- eligible statuses and excluded statuses;
- exact safe returned fields;
- explicitly excluded fields including `projection`, `serializedSession`, `playerSessions`, answers, seeds, raw auth ids, emails, and private profile data;
- grants and RLS behavior;
- optional spectator presence table deferral;
- app implementation dependencies for a later source stage;
- rollback plan;
- privacy review checklist;
- real Supabase-backed three-client verification plan;
- stop conditions and open decisions.

## Recommended Migration/RLS Strategy

The recommended Stage 26.5B migration should add an authenticated-only sanitized RPC for `async_multiplayer_games` rather than changing raw table SELECT policies.

The RPC should:

- return only active `playing` games with both seats filled;
- require `auth.role() = 'authenticated'` and `auth.uid() is not null`;
- return safe metadata, safe participant display summaries, submitted move evidence, and read-only spectator capabilities;
- exclude all raw session/projection/answer/seed/private identity fields;
- be granted to `authenticated` only;
- remain unavailable to `anon` and public callers;
- preserve existing participant and waiting-lobby policies.

Persistent spectator presence should be deferred unless separately authorized.

## Verification

Documentation/lightweight verification passed:

- `git diff --check` - passed.
- Progress CSV shape check using Python `csv` parsing - passed, 180 rows including header, 12 columns each, last_id=178.
- `git status --short --branch` - completed and showed the existing Phase 26 working set plus this Stage 26.5A progress record and addendum.

## Status

Stage 26.5A is complete.

The next safe gated action is explicit Stage 26.5B migration execution authorization. Stage 26.6 should not start until the Stage 26.5 migration/addendum path is resolved or explicitly deferred by the user.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, public/guest spectation, Phase 26.6 work, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, new custom skills, or original stable `brrrdle` repository work was performed.
