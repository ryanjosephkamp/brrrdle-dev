# Progress Step 254: Phase 32 Stage 32.5 Queue/Lobby/Identity Routing Stabilization

**Date:** 2026-06-24
**Phase:** Phase 32 Stage 32.5 - Queue/lobby/identity routing stabilization
**Status:** Completed - Awaiting User Review Before Stage 32.6 Account Avatar/Rating Display Consistency

## Authority

User authorized Phase 32 Stage 32.5 queue/lobby creator auto-routing and opponent identity routing stabilization only, using the completed Stage 32.4 rematch lifecycle baseline and completed Stage 32.3 participant identity RPC baseline.

This pass may read governance, Phase 32 planning/spec/addendum/implementation materials, progress records, Supabase docs, the Stage 32.3 migration, relevant multiplayer queue/lobby/identity source and test surfaces; create this progress report and matching CSV row; implement queue/lobby creator auto-routing and participant-safe identity routing; add focused tests; and run the requested verification gate.

## Boundaries

This pass does not authorize new migrations, account accent fixes, no-comma rating fixes, Phase 33 ranked expansion, public/guest spectation, service workers, push infrastructure, deployments, commits, pushes, PR creation, merge, release, branch deletion, Elo/gameplay changes, new custom skills, force-push, secret printing, private data exposure, local session artifact exposure, or original stable repository work.

## Initial State

- Repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- `origin/main`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- Original stable repository: not used.
- Existing uncommitted work preserved: Phase 32 planning/spec/progress artifacts, the Stage 32.0 baseline test-fixture repair, Stage 32.1 audit report, Stage 32.2 addendum/progress report, Stage 32.3 participant identity migration/progress report, and Stage 32.4 rematch source/test/progress changes.

## Work Plan

- Add focused tests for ranked queue creator auto-routing decisions, lobby creator auto-routing decisions, selected-game preservation, opponent label mapping, safe profile fallback, and forbidden/private identity-field rejection.
- Add an app-side repository seam for the Stage 32.3 participant identity RPC with strict allow-listed DTO parsing.
- Route safe participant identity summaries into Multiplayer panels so opponents do not render as `You` and generic `Rival` is only a fallback.
- Add ranked Practice queued-request visible polling through the existing trusted queue refresh/finalization path.
- Add creator-owned lobby waiting-to-playing auto-routing without stealing focus from a deliberately selected unrelated active game.
- Run focused queue/lobby/identity tests, then the full Stage 32.5 verification gate.

## Work Completed

- Added `getParticipantIdentitySummaries` repository support for `get_multiplayer_participant_identity_summaries`.
- Added strict participant identity DTO parsing that accepts only Stage 32.3 allow-listed summary fields and rejects forbidden/private fields including raw user IDs, emails, auth metadata, queue internals, answers, seeds, sessions, tokens, rating transaction IDs, and settlement IDs.
- Added focused routing/label helpers for ranked queued-request refresh eligibility, creator lobby auto-routing, and viewer-safe player display labels.
- Wired participant identity actions through the app and Multiplayer panels.
- Updated Multiplayer opponent labels to prefer safe participant identity/public profile summaries, never render an opponent as `You`, and use `Rival` only as a fallback.
- Added ranked queue auto-refresh for visible queued ranked Practice requests so the queued creator can open the finalized durable ranked game through the existing refresh/finalization path.
- Added creator-owned lobby auto-routing when a waiting lobby becomes a playing joined game, while preserving a deliberately selected unrelated active game.
- Preserved Stage 32.4 rematch lifecycle behavior, Phase 31 postgame behavior, Phase 30 leaderboard behavior, Phase 29 profile behavior, Phase 28 Live behavior, Phase 27 ranked Practice behavior, Daily Multiplayer integrity, and gameplay rules.

## Verification Results

- Passed: focused queue/lobby/identity tests with `npm run test -- src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/multiplayerRepository.test.ts` reported 2 files and 52 tests passing.
- Passed: `npm run lint`.
- Passed: `npm run test` reported 104 files and 687 tests passing.
- Passed: `npm run build` with the existing Vite large-chunk advisory.
- Passed: `npx tsc -p tsconfig.api.json --noEmit`.
- Passed: `git diff --check`.
- Passed: Python CSV shape check using `python3 -S` reported `rows=256 columns=[12] last_id=254`.
- Passed: `git status --short --branch` showed expected existing Phase 32 planning/progress/migration changes plus the Stage 32.5 queue/lobby/identity source/test/progress changes.

## Blockers

- None at this stage.

## Next Gate

Review this Stage 32.5 report and authorize Stage 32.6 account avatar/rating display consistency before any account accent fixes, no-comma rating fixes, E2E hardening, Phase 33 ranked expansion, public/guest spectation, or PR/deployment work.
