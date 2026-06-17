# Progress Step 199 - Phase 27 Stage 27.8 Ranked E2E, Cleanup, And Final Hardening

**Phase**: Phase 27
**Stage**: Stage 27.8 - Ranked E2E, Cleanup, And Final Hardening
**Status**: Completed - Awaiting User Review Before Git Handoff Preparation
**Started**: 2026-06-17T00:20:01Z
**Completed**: 2026-06-17T00:30:21Z

## Authorization

The user authorized Phase 27 Stage 27.8 only: ranked E2E, cleanup, and final hardening.

Authorized work includes reviewing Stage 27.1 through Stage 27.7 for stale copy, duplicated logic, RLS drift, privacy gaps, ranked UI confusion, and docs/progress gaps; making only narrow cleanup/final-hardening fixes needed to complete Phase 27; running focused and final verification gates; running non-printing secret/artifact checks and watched-port/process cleanup checks; and updating progress records.

The authorization does not include Phase 28 work, public leaderboards, public profiles, public/guest spectation, additional migrations, deployments, commits, pushes, PRs, merges, releases, branch deletion, gameplay-rule changes, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work.

## Repository State

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Confirmed target is `brrrdle-dev`, not the original stable `brrrdle` repository.
- Current branch at kickoff: `main`
- Local `HEAD` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- `origin/main` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- Local `main` matched `origin/main` at kickoff.
- Existing uncommitted Phase 26/27 planning, source, migration, and progress artifacts were present before Stage 27.8 and must be preserved.

## Planned Work

- Review Stage 27.1 through Stage 27.7 changes for stale copy, duplicated logic, RLS drift, privacy gaps, ranked UI confusion, and documentation/progress gaps.
- Apply only narrow cleanup/final-hardening fixes required to complete Phase 27.
- Preserve durable ranked Practice queue behavior, trusted settlement, private leaderboard-ready projection boundaries, Live v1 spectator privacy, Daily/timed ranked deferrals, Hard Mode matching, unranked/custom flows, and all gameplay invariants.
- Run focused verification for touched areas, then the full Stage 27.8 final gate.
- Run non-printing secret/artifact checks and watched-port/process cleanup checks.

## Results

- Reviewed Phase 27 planning/spec/implementation/progress and ranked source surfaces for stale copy, documentation drift, privacy boundaries, and final handoff gaps.
- Aligned the Phase 27 planning brief and unified specification with the actual late-stage sequence:
  - Stage 27.5 durable ranked queue;
  - Stage 27.5A/27.5B/27.5C separately gated queue game-creation addendum, migration, and app implementation;
  - Stage 27.6 ranked UI/stats/copy;
  - Stage 27.7 private leaderboard-ready projections;
  - Stage 27.8 final hardening.
- Created `planning/phase-27/CHANGELOG.md` as a concise handoff summary for completed Phase 27 work, deferrals, migration/RLS notes, verification sources, and boundary reminders.
- Added concise Phase 27 Supabase handoff notes for the trusted ranked Practice migration sequence and RPC boundary.
- Hardened `e2e/gameplay/live-v1-spectator.spec.ts` after the final E2E gate found two valid `Spectate live game` buttons. The test now scopes to the intended `Practice Multiplayer OG` live card and explicitly opens its read-only details before asserting spectator state.
- Preserved durable ranked Practice queue behavior, trusted settlement, private leaderboard-ready projection boundaries, Live v1 spectator privacy, Daily/timed ranked deferrals, Hard Mode matching, unranked/custom flows, and all gameplay invariants.

## Verification

- Focused ranked tests passed: `npm run test -- src/multiplayer/rankedLeaderboardProjections.test.ts src/multiplayer/competitiveMultiplayer.test.ts src/multiplayer/rating.test.ts src/multiplayer/matchmaking.test.ts src/multiplayer/multiplayerRepository.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/MultiplayerStatsPanel.test.tsx` (7 files, 59 tests).
- Initial `npm run test:e2e` exposed an ambiguous global spectator-button locator in `e2e/gameplay/live-v1-spectator.spec.ts` when two authenticated spectator rows were visible. The narrow test fix was applied and verified.
- Focused Live v1 spectator E2E passed: `npx playwright test e2e/gameplay/live-v1-spectator.spec.ts` (1/1).
- Final `npm run test:e2e` passed (11/11).
- `npm run test:full` passed (611 Vitest tests + 11 Playwright E2E tests).
- Post-fix `npm run lint` passed.
- Post-fix `npm run test` passed (96 files, 611 tests).
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.
- `git diff --check` passed.
- Python CSV shape check passed for `progress/PROGRESS.csv` (201 rows including header, 12 columns each, last_id=199).
- Non-printing secret/artifact scan passed over changed tracked and untracked files (57 files, 0 findings).
- Ignored-artifact staging check passed (0 staged files; `.env.local`, `dist/`, `node_modules/`, and `test-results/` remain ignored/not staged).
- Watched-port cleanup check passed for `5173`, `5174`, `3000`, and `4173` with no listeners.
- Browser smoke beyond Playwright E2E was not warranted because the Stage 27.8 source change was a test helper hardening and documentation cleanup only.

## Boundary Confirmation

No Phase 28 work, public leaderboards, public profiles, public/guest spectation, additional migrations, deployments, commits, pushes, PRs, merges, releases, branch deletion, gameplay-rule changes, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
