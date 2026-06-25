# Progress Step 256: Phase 32 Stage 32.7 Real Two-Client E2E/Regression Hardening

**Date:** 2026-06-24
**Phase:** Phase 32 Stage 32.7 - Real two-client E2E/regression hardening
**Status:** Completed - Awaiting User Review Before Phase 32 Git Handoff Preparation

## Authority

User authorized Phase 32 Stage 32.7 real two-client E2E/regression hardening, final cleanup, verification, and Phase 32 completion documentation only.

This pass may read governance, Phase 32 planning/spec/addendum/implementation materials, current progress records, ranked and Supabase docs, completed Stage 32 source/test surfaces, create the Stage 32.7 progress report and CSV row, add real two-client Supabase-backed E2E/regression coverage for fixed Phase 32 mechanics where feasible, make narrow final-hardening fixes, create `planning/phase-32/CHANGELOG.md`, run the requested verification gate, and perform non-printing secret/artifact and resource/process checks.

## Boundaries

This pass does not authorize additional migrations, Phase 33 ranked expansion, public/guest spectation, service workers, push infrastructure, deployments, commits, pushes, PR creation, merge, release, branch deletion, Elo/gameplay rule changes, new custom skills, force-push, secret printing, private data exposure, local session artifact exposure, or original stable repository work.

## Initial State

- Repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- `origin/main`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- Original stable repository: not used.
- Existing uncommitted work preserved: Phase 32 planning/spec/progress artifacts, Stage 32.0 baseline fixture repair, Stage 32.1 audit, Stage 32.2 addendum, Stage 32.3 migration/RLS execution, Stage 32.4 rematch lifecycle stabilization, Stage 32.5 queue/lobby/identity routing stabilization, and Stage 32.6 account avatar/rating display consistency.

## Work Completed

- Added real two-client Practice OG E2E coverage for one-request rematch decline synchronization.
- Added real two-client Practice OG E2E coverage for eligible unranked non-custom rematch accept opening a fresh safe rematch game for both clients.
- Added real two-client ranked Practice E2E coverage for search-again routing both players into the finalized durable game and preserving safe opponent labels.
- Added real two-client unranked lobby E2E coverage for creator auto-routing when a rival joins from a terminal-game context.
- Added E2E public profile setup for temporary users so opponent identity labels can verify safe public names.
- Fixed Practice rematch list parsing so list rows with `request_status='created'` and `created=false` still normalize as created state when a `created_game_id` is present.
- Added regression coverage for created rematch list-row normalization.
- Fixed idempotent ranked queue finalization so it does not replace an existing local terminal ranked game with a fresh `playing` projection.
- Added regression coverage for preserving an existing terminal ranked game during idempotent finalization.
- Documented the Phase 32 participant identity RPC in `docs/supabase.md`.
- Created `planning/phase-32/CHANGELOG.md`.
- Updated `planning/README.md` and `memory.md` for the completed Phase 32 state.

## Verification Results

Focused verification:

- Passed: `npm run test -- src/multiplayer/multiplayerRepository.test.ts` reported 1 file and 29 tests passing.
- Red regression observed: `npm run test -- src/multiplayer/MultiplayerPanel.test.tsx` failed before implementation because `mergeFinalizedRankedGameIntoLocalState` was not yet available.
- Passed after implementation: `npm run test -- src/multiplayer/MultiplayerPanel.test.tsx` reported 1 file and 24 tests passing.
- Passed: `npx playwright test e2e/gameplay/practice-multiplayer-og.spec.ts -g "routes ranked search-again"` reported 1/1 passing.
- Passed: `npx playwright test e2e/gameplay/practice-multiplayer-og.spec.ts` reported 7/7 passing.
- Passed: focused Phase 32 unit/component set reported 8 files and 100 tests passing.

Final verification:

- Passed: `npm run lint`.
- Passed: `npm run test` reported 104 files and 690 tests passing.
- Passed: `npm run test:e2e` reported 15/15 Playwright tests passing.
- Passed: `npm run test:full` reported 690 Vitest tests and 15 Playwright E2E tests passing.
- Passed: `npm run build` with the existing Vite large-chunk advisory.
- Passed: `npx tsc -p tsconfig.api.json --noEmit`.
- Passed: `git diff --check`.
- Passed: Python CSV shape check using `python3 -S` reported `rows=257 columns=[12] last_id=256`.
- Passed: non-printing secret/artifact scan reported `scanned_files=42 secret_pattern_hits=0 changed_artifacts=0`.
- Passed: watched-port cleanup check reported ports `5173`, `5174`, `3000`, and `4173` clear.

Resource observations:

- Existing user/system Chrome, Codex MCP/node, Obsidian, and helper processes were present; no Stage 32-owned Vite, Playwright, or browser runaway was identified.
- Disk remained high but usable at approximately 460 GiB total, 350 GiB used, 69 GiB available.
- Memory/load remained elevated but usable for the completed verification gate.

## Blockers

- None currently identified.

## Next Gate

Review this report and, if approved, explicitly authorize Phase 32 Git handoff preparation before staging, committing, pushing, PR creation, merge, deployment, release, branch cleanup, Phase 33 ranked expansion, public/guest spectation, or any additional implementation.
