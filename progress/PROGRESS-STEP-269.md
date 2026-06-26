# Progress Step 269: Phase 33 Stage 33.6 Timed Practice Ranked UI Integration

**Date:** 2026-06-26
**Phase:** Phase 33 - Competitive Ladder v2 Readiness
**Stage:** 33.6 - Timed Practice Ranked UI Integration
**Status:** Completed - Awaiting User Review Before Stage 33.7 Final Hardening And Two-Client E2E

## Authorization

The user authorized Phase 33 Stage 33.6 only: timed Practice ranked UI integration using the completed Stage 33.3 timed ranked migration/RLS baseline, completed Stage 33.4 display cleanup baseline, and completed Stage 33.5 timed ranked domain/repository foundations.

Authorized work included reading governance, Phase 33 planning/spec/implementation materials, Stage 33.5 progress, ranked Practice UI/queue/postgame surfaces, timed Practice Multiplayer surfaces, ranked queue/repository surfaces, relevant tests, and docs enough to expose the canonical five-minute timed ranked Practice option safely.

The prompt did not authorize additional migrations, deployment, Vercel or Supabase configuration, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- `origin/main`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- Existing uncommitted Phase 33 planning/spec/progress artifacts plus Stage 33.3 migration/docs, Stage 33.4 display cleanup artifacts, and Stage 33.5 domain/repository artifacts were preserved.

## Work Completed

Created:

- `progress/PROGRESS-STEP-269.md`
- `src/multiplayer/multiplayerPanelRankedQueue.ts`

Updated:

- `docs/ranked-multiplayer.md`
- `docs/supabase.md`
- `progress/PROGRESS.csv`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/postgameActions.test.ts`
- `src/multiplayer/postgameActions.ts`

Stage 33.6 did not create or run migrations.

## Timed Ranked UI Behavior

Added player-facing support for the canonical five-minute timed ranked Practice option:

- Ranked Practice controls now offer `No clock` and `5 minutes` only.
- Switching to ranked rejects unsupported current Practice timers and resets to no clock.
- Ranked queue creation sends `null` for untimed ranked and `300000` for canonical timed ranked.
- Unsupported ranked timers remain unavailable or rejected before calling the ranked queue RPC seam.
- Matched timed ranked queue statuses build local finalized game projections with `300000` ms per side and the timed ranked bucket.
- Ranked postgame search-again preserves canonical timed ranked settings through the trusted ranked queue path.
- Timed ranked finalization idempotency uses the Phase 33 timed namespace.

The existing unranked Practice timer options and untimed ranked Practice v1 behavior remain available and unchanged.

## Boundaries Preserved

Daily ranked, ranked custom/private-code games, timed public leaderboard exposure, public/guest spectation, service workers, deployment, Vercel/Supabase configuration, gameplay-rule changes, Elo algorithm changes, and the brrrdle GitHub backup workflow remain deferred or gated.

The change preserves Stage 33.5 domain/repository foundations, Stage 33.4 rank-band and leaderboard cleanup, Stage 33.3 SQL/RLS readiness, Phase 32 stabilization behavior, Phase 31 postgame behavior, Phase 30 public leaderboard display-only authority, Phase 29 public profile privacy, Phase 28 Live read-only behavior, Phase 27 ranked Practice behavior, Daily Multiplayer integrity, gameplay rules, and Elo math.

## Verification

Passed:

- Focused Stage 33.6 tests:
  - `npm run test -- src/multiplayer/postgameActions.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/matchmaking.test.ts src/multiplayer/multiplayerRepository.test.ts src/multiplayer/rating.test.ts`
  - Result: 5 files and 84 tests passed.
- Sequential full gate after a narrow TypeScript normalization repair:
  - `npm run lint`
  - `npm run test`
    - Result: 104 files and 704 tests passed.
  - `npm run build`
    - Passed with the existing Vite large-chunk advisory.
  - `npx tsc -p tsconfig.api.json --noEmit`
  - `git diff --check`
  - Progress CSV shape check using `python3 -S`
  - Non-printing secret/artifact scan over changed tracked and untracked repository files
  - Ignored-artifact check
  - `git status --short --branch`

The first build attempt found a TypeScript narrowing issue where normalized timed ranked values were not statically proven to be either `null` or the canonical `300000` value. The repair moved ranked queue/finalization helpers into `src/multiplayer/multiplayerPanelRankedQueue.ts` and narrowed the canonical timer before game creation. Focused tests and the full required gate were rerun afterward.

## Next Step

Review Stage 33.6. If approved, explicitly authorize Stage 33.7 final hardening and two-client E2E before additional migrations, deployment, Vercel/Supabase configuration, Git/GitHub operations, public/guest spectation, service workers, gameplay/Elo changes, backup workflow execution, or original stable repository work.
