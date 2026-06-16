# Progress Step 177 - Phase 26 Stage 26.5 Authenticated Live v1 Spectation

**Date**: 2026-06-15
**Branch**: `main`
**Repository**: `brrrdle-dev`
**HEAD**: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
**Origin main**: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
**Status**: Blocked - Awaiting Explicit Migration/RLS Authorization Before Live v1 Implementation

## Scope

Stage 26.5 is limited to authenticated nonparticipant Live v1 spectation.

Authorized work includes source/test/documentation changes needed for authenticated nonparticipant Live v1 spectation, focused verification, real Supabase-backed E2E if credentials are available and changed Live/repository behavior requires it, browser smoke when warranted, and progress updates.

Supabase schema/RLS migration work is separately gated. This step was required to inspect whether migration work is needed, document the exact need, and stop before creating or running any migration.

This step does not authorize public/guest spectation, service workers, push infrastructure, Phase 26.6 work, deployment, commits, pushes, PR creation, merges, releases, branch deletion, new custom skills, gameplay-rule changes, or original stable `brrrdle` repository work.

## Repository State

- Working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- Remote: `origin` points to `https://github.com/ryanjosephkamp/brrrdle-dev.git`
- Local `HEAD`: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
- `origin/main`: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
- Original stable `brrrdle` checkout was not used.

## Context Reviewed

Required reading and Live/RLS inspection were completed before the stop decision:

- `CONSTITUTION.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `BRRRDLE-SPEC.md`
- `planning/phase-26/PLANNING-BRIEF.md`
- `planning/specs/phase-26/PHASE-26-POLISH-NOTIFICATIONS-AND-LIVE-V1-SPEC-2026-06-15.md`
- `planning/phase-26/IMPLEMENTATION-PLAN.md`
- `planning/testing/TESTING-SUITE.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-176.md`
- `agents.md`
- `memory.md`
- `package.json`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerGameSurface.tsx`
- relevant multiplayer tests
- relevant Supabase migrations/RLS policies
- `docs/supabase.md`

## Findings

Authenticated nonparticipant Live v1 cannot be implemented safely on the current active repository/schema path without a separately authorized Supabase migration/RLS addendum.

Reasons:

- The active Multiplayer runtime uses `async_multiplayer_games`, not the legacy `live_matches` / `live_match_spectators` tables.
- `createSupabaseMultiplayerRepository` currently reads raw `projection` values from `async_multiplayer_games`.
- The active `async_multiplayer_games` select policy allows authenticated users to read waiting games and participant-owned games, not arbitrary active playing games.
- The raw `projection` contains `serializedSession` and `playerSessions`.
- `SerializedOgSession` contains `answer`.
- `SerializedGoSession` contains per-puzzle `answer` values.
- Broadening raw `async_multiplayer_games` read access for nonparticipants would expose answer-bearing gameplay internals to unrelated signed-in clients.
- The existing Live v0 selectors and tests intentionally keep Live rows participant-only and count nonparticipant active games as restricted.
- The legacy `live_match_spectators` schema is documented as compatibility schema and is not part of the mounted/current Multiplayer runtime.

## Stop Decision

No source/runtime Live v1 implementation was performed in this stage.

The safe Stage 26.5 result is to stop at the migration/RLS gate and request explicit authorization for a migration addendum that defines a sanitized spectator projection before any app code depends on nonparticipant active-game discovery.

## Required Migration/RLS Addendum

The next authorized step should create a migration/RLS plan for authenticated Live v1 spectation. It should define exact tables, views/RPCs, policies, grants, rollback notes, verification, and privacy review.

Minimum recommended direction:

- Add a sanitized authenticated spectator projection for `async_multiplayer_games`, preferably a SECURITY DEFINER RPC or tightly scoped view/RPC.
- Keep raw `async_multiplayer_games.projection` inaccessible to authenticated nonparticipants.
- Expose only fields needed for read-only Live display:
  - game id;
  - scope, mode, status, word length, difficulty, GO puzzle count;
  - Daily date key where relevant;
  - current turn as player seat only;
  - created/updated/deadline timestamps;
  - safe participant labels/profile summaries already sanitized for display;
  - submitted moves with player seat, puzzle index, created timestamp, guess text, and tile states only when that submitted move is already visible on the board;
  - aggregate progress such as submitted turn count and solved puzzle count.
- Exclude:
  - `serializedSession`;
  - `playerSessions`;
  - answer fields;
  - seeds or deterministic answer derivation inputs;
  - raw auth user ids;
  - emails;
  - private profile data;
  - mutable participant-only state not needed for read-only display.
- Keep policies and grants authenticated-only; do not grant anonymous/public access.
- Preserve existing participant create/join/resume/save behavior.
- Preserve waiting lobby visibility, Daily claim triggers, Daily claim safety, and participant save/update policies.
- Decide whether spectator presence requires a separate `async_multiplayer_spectators` table. If added, it must be read/write constrained to the authenticated spectator's own row and must not grant match mutation authority.
- Add repository support that is separate from the participant repository, such as a read-only `loadAuthenticatedLiveSpectatorRows` seam.
- Add Live v1 app/view-model/UI tests proving participant rows remain resumable, spectator rows are read-only, restricted rows remain restricted, signed-out users cannot spectate, and spectator UI exposes no submit/forfeit/cancel/join controls.
- Add real three-client Supabase-backed E2E after migration execution: player one and player two play, authenticated nonparticipant discovers and opens read-only Live v1, and the spectator cannot mutate game state.

## Verification

No source/test/migration implementation was performed, so verification was documentation/lightweight only.

- `git diff --check` - passed.
- Progress CSV shape check using Python `csv` parsing - passed, 179 rows including header, 12 columns each, last_id=177.
- `git status --short --branch` - completed and showed the existing Phase 26 working set plus this Stage 26.5 progress record.

## Status

Stage 26.5 is blocked on explicit migration/RLS authorization.

The next safe gated action is a migration/RLS addendum prompt for authenticated Live v1 sanitized spectator projections. Stage 26.6 should not start until the Stage 26.5 migration/addendum path is resolved or explicitly deferred by the user.

## Boundary Confirmation

No public/guest spectation, service workers, push infrastructure, Phase 26.6 work, Supabase migrations, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, new custom skills, gameplay-rule changes, or original stable `brrrdle` repository work was performed.
