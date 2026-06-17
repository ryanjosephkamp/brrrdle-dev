# Progress Step 192 - Phase 27 Stage 27.4 Ranked Settlement App Integration

**Phase**: Phase 27
**Stage**: Stage 27.4 - Ranked Settlement App Integration
**Status**: Completed - Awaiting User Review Before Next Stage 27 Action
**Started**: 2026-06-16T06:03:39Z
**Completed**: 2026-06-16T06:13:59Z

## Authorization

The user authorized Phase 27 Stage 27.4 only: ranked Practice settlement app integration using the already-applied and verified Stage 27.3 and Stage 27.3B trusted settlement RPCs.

Authorized work includes reading governance, Phase 27 implementation and migration/RLS materials, progress records, Supabase documentation, current multiplayer repository/domain/app surfaces, integrating ranked Practice settlement through the trusted RPC, adding focused repository/domain tests, running focused verification first, then running the Stage 27.4 verification gate, and updating progress records.

The authorization does not include creating or running migrations, durable ranked matchmaking UI, public leaderboards, public profiles, public/guest spectation, deployments, commits, pushes, PR creation, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, gameplay-rule changes, or original stable `brrrdle` repository work.

## Repository State

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Confirmed target is `brrrdle-dev`, not the original stable `brrrdle` repository.
- Current branch at kickoff: `main`
- Local `HEAD` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- `origin/main` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- Local `main` matched `origin/main` at kickoff.
- Existing uncommitted Phase 26/27 planning, migration, and progress artifacts were present before Stage 27.4 and must be preserved.

## Work Planned

- Add an app repository seam for trusted ranked Practice settlement through `public.settle_ranked_async_multiplayer_match`.
- Add strict trusted settlement result parsing and forbidden-field rejection.
- Convert terminal ranked Practice multiplayer games into trusted settlement requests without direct browser writes to rating/result tables.
- Treat trusted settlement responses as local competitive cache/display updates only.
- Preserve unranked, Daily, timed Practice, custom, spectator, anonymous, corrupt, and ineligible games as unrated.
- Preserve all gameplay invariants, Daily ranked deferral, timed Practice ranked deferral, Hard Mode matching requirements, and Live v1 spectator privacy.
- Add focused repository/domain tests.

## Results

Stage 27.4 ranked settlement app integration completed.

Implemented behavior:

- Added a trusted settlement repository seam, `settleRankedGame`, to `MultiplayerRepository`.
- Kept the local-storage multiplayer repository as a no-op for ranked settlement.
- Added Supabase repository integration for `public.settle_ranked_async_multiplayer_match`.
- Added a deterministic app idempotency key: `phase27-ranked-v1:async:{game_id}:{async_bucket}`.
- Added strict trusted settlement result parsing that accepts only the RPC return contract and rejects raw projection/session/answer-bearing fields.
- Required the trusted settlement parser path to produce both participant transactions before accepting the response.
- Added a trusted Practice ranked settlement candidate guard so the app does not call settlement for unranked, Daily, timed Practice, custom, nonterminal, non-queue-backed, or ambiguous participant games.
- Added competitive cache helpers that can record terminal result summaries without local browser-authoritative rating movement.
- Added trusted settlement cache application that updates local rating profiles/transactions only from trusted RPC-returned transactions and treats repeat application idempotently.
- Updated `App.tsx` so multiplayer snapshots still cache terminal result summaries immediately, but rating movement is applied only after the trusted settlement RPC returns.
- Added in-flight/completed guards to avoid repeated app-level settlement calls for the same terminal game.
- Preserved existing participant save/load/subscription behavior, Live v1 spectator privacy, Daily ranked deferral, timed Practice ranked deferral, and gameplay invariants.

Files changed in this stage:

- `src/app/App.tsx` - orchestrates trusted settlement after durable multiplayer saves/loads and disables browser-authoritative rating movement in app snapshot caching.
- `src/multiplayer/competitiveMultiplayer.ts` - adds trusted settlement cache application and an option to record results without local rating movement.
- `src/multiplayer/competitiveMultiplayer.test.ts` - covers no-local-rating result caching and idempotent trusted transaction cache updates.
- `src/multiplayer/multiplayerRepository.ts` - adds trusted settlement RPC seam, parser, candidate guard, idempotency key, and Supabase adapter call.
- `src/multiplayer/multiplayerRepository.test.ts` - covers parser safety, candidate filtering, RPC call shape, ineligible no-op behavior, and parse failure behavior.
- `progress/PROGRESS-STEP-192.md` - records Stage 27.4 work and verification.
- `progress/PROGRESS.csv` - appends and completes the Stage 27.4 tracking row.

## Verification

Stage 27.4 verification passed.

Focused verification passed:

- `npm run test -- src/multiplayer/multiplayerRepository.test.ts src/multiplayer/competitiveMultiplayer.test.ts src/multiplayer/scoring.test.ts src/multiplayer/rating.test.ts src/multiplayer/matchmaking.test.ts`
- Result: 5 files, 43 tests passed.

Full local gate passed:

- `npm run lint`
- `npm run test` - 95 files, 601 tests passed.
- `npm run build` - passed with the existing large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Python CSV shape check: 194 rows including header, 12 columns each, last id `192`.

Real Supabase-backed verification was not rerun in this stage because Stage 27.3B already verified the applied settlement RPC and RLS/privacy behavior against the confirmed `brrrdle-dev` Supabase project; Stage 27.4 changed only the app/repository invocation path, parser, local cache behavior, and tests.

## Next Step

Review Stage 27.4 results. If acceptable, explicitly authorize the next Stage 27 action before durable ranked matchmaking UI/queue integration or any additional Phase 27 work.

## Boundary Confirmation

No migrations, durable ranked matchmaking UI, public leaderboards, public profiles, public/guest spectation, deployments, commits, pushes, PRs, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, gameplay-rule changes, or original stable `brrrdle` repository work was performed.
