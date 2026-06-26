# Progress Step 268: Phase 33 Stage 33.5 Timed Practice Ranked Domain And Repository Foundations

**Date:** 2026-06-26
**Phase:** Phase 33 - Competitive Ladder v2 Readiness
**Stage:** 33.5 - Timed Practice Ranked Domain And Repository Foundations
**Status:** Completed - Awaiting User Review Before Stage 33.6 Timed Practice Ranked UI Integration

## Authorization

The user authorized Phase 33 Stage 33.5 only: timed Practice ranked domain and repository foundations using the completed Stage 33.3 timed ranked migration/RLS baseline and completed Stage 33.4 display cleanup baseline.

Authorized work included reading governance, Phase 33 planning/spec/implementation materials, Stage 33.4 progress, timed ranked SQL/RLS migration context, ranked queue/finalization/settlement/rating source surfaces, repository seams, and relevant tests enough to implement source-only domain/repository support for timed Practice ranked.

The prompt did not authorize timed ranked UI integration, additional migrations, deployment, Vercel or Supabase configuration, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- `origin/main`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- Existing uncommitted Phase 33 planning/spec/progress artifacts plus Stage 33.3 migration/docs and Stage 33.4 source/test/doc/progress artifacts were preserved.

## Work Completed

Created:

- `progress/PROGRESS-STEP-268.md`

Updated:

- `docs/ranked-multiplayer.md`
- `docs/supabase.md`
- `progress/PROGRESS.csv`
- `src/multiplayer/MultiplayerStatsPanel.test.tsx`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/competitiveMultiplayer.ts`
- `src/multiplayer/matchmaking.test.ts`
- `src/multiplayer/matchmaking.ts`
- `src/multiplayer/multiplayerRepository.test.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/rating.test.ts`
- `src/multiplayer/rating.ts`
- `src/multiplayer/scoring.test.ts`
- `src/multiplayer/scoring.ts`

Stage 33.5 did not create or run migrations and did not expose timed ranked player-facing UI.

## Timed Ranked Domain Behavior

Added source-only support for canonical timed Practice ranked:

- `300000` ms is the only supported timed ranked clock.
- Untimed ranked Practice v1 remains `multiplayer:og` / `multiplayer:go`.
- Timed ranked uses separate app buckets:
  - `multiplayer:og:timed:v1`
  - `multiplayer:go:timed:v1`
- Timed ranked maps to the Stage 33.3 storage buckets:
  - `async:og:timed:v1`
  - `async:go:timed:v1`
- Unsupported time limits remain ineligible for ranked matchmaking/rating/settlement.
- Daily ranked and ranked custom/private-code games remain deferred.

The changes do not alter Elo math, K factors, provisional-game counts, match scoring, gameplay rules, timeout rules, or Daily Multiplayer behavior.

## Repository Behavior

Updated the Supabase repository seam to:

- send `p_time_limit_ms = 300000` only for canonical timed ranked queue creation;
- reject unsupported timed ranked queue creation before calling the RPC;
- parse timed ranked queue request/status rows only when bucket and time control are compatible;
- reject mismatched bucket/time-control DTOs;
- save canonical timed ranked games with timed storage rating buckets;
- treat canonical timed, queue-backed, terminal ranked Practice games as trusted settlement candidates;
- keep untimed ranked settlement idempotency keys under `phase27-ranked-v1`;
- use `phase33-ranked-timed-v1` idempotency keys for timed ranked settlement;
- normalize timed trusted settlement rows back to app buckets;
- keep timed ranked buckets out of public leaderboard query/DTO parsing.

Cached competitive result normalization now parses bucket strings instead of passing malformed strings through to rendering.

## Documentation

Updated ranked multiplayer and Supabase docs to say Stage 33 now has SQL/RLS plus domain/repository readiness for canonical timed Practice ranked, while player-facing timed ranked remains gated until the later UI integration stage.

## Verification

Passed:

- Focused Stage 33.5 tests:
  - `npm run test -- src/multiplayer/rating.test.ts src/multiplayer/matchmaking.test.ts src/multiplayer/scoring.test.ts src/multiplayer/multiplayerRepository.test.ts src/multiplayer/MultiplayerStatsPanel.test.tsx src/multiplayer/competitiveMultiplayer.test.ts src/leaderboards/publicRankedLeaderboard.test.ts`
  - Result: 7 files and 82 tests passed.
- Sequential full gate after the TypeScript fixture repair:
  - `npm run lint`
  - `npm run test`
    - Result: 104 files and 699 tests passed.
  - `npm run build`
    - Passed with the existing Vite large-chunk advisory.
  - `npx tsc -p tsconfig.api.json --noEmit`
  - `git diff --check`
  - Progress CSV shape check using `python3 -S`
  - Non-printing secret/artifact scan over changed tracked and untracked repository files
  - Ignored-artifact check
  - `git status --short --branch`

During verification, the first build attempt found a test-only TypeScript fixture issue where a spread widened the literal `300000` time-limit value to `number`. The fixture was repaired narrowly and the focused tests plus full required gate were rerun.

## Next Step

Review Stage 33.5. If approved, explicitly authorize Stage 33.6 timed Practice ranked UI integration before timed ranked player-facing controls, additional migrations, deployment, Vercel/Supabase configuration, Git/GitHub operations, public/guest spectation, service workers, gameplay/Elo changes, backup workflow execution, or original stable repository work.

## Boundaries Preserved

No timed ranked UI integration, additional migrations, deployment, Vercel or Supabase configuration, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work was performed.
