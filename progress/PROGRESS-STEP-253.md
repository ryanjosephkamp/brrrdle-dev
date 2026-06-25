# Progress Step 253: Phase 32 Stage 32.4 Rematch Lifecycle Stabilization

**Date:** 2026-06-24
**Phase:** Phase 32 Stage 32.4 - Rematch lifecycle stabilization
**Status:** Completed - Awaiting User Review Before Stage 32.5 Queue/Lobby/Identity Routing Stabilization

## Authority

User authorized Phase 32 Stage 32.4 rematch lifecycle stabilization only, using the completed Stage 32.3 participant identity migration/RLS baseline.

This pass may read governance, Phase 32 planning/spec/addendum/implementation materials, progress records, Supabase docs, relevant migration/source/test surfaces; create this progress report and matching CSV row; fix direct unranked non-custom Practice rematch lifecycle behavior; add focused rematch tests; and run the requested verification gate.

## Boundaries

This pass does not authorize new migrations, queue/lobby routing fixes, opponent identity app integration, account accent fixes, no-comma rating fixes, Phase 33 ranked expansion, public/guest spectation, service workers, push infrastructure, deployments, commits, pushes, PR creation, merge, release, branch deletion, Elo/gameplay changes, new custom skills, force-push, secret printing, private data exposure, local session artifact exposure, or original stable repository work.

## Initial State

- Repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- `origin/main`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- Original stable repository: not used.
- Existing uncommitted work preserved: Phase 32 planning/spec/progress artifacts, the Stage 32.0 baseline test-fixture repair, Stage 32.1 audit report, Stage 32.2 addendum/progress report, and Stage 32.3 participant identity migration/progress report.

## Work Plan

- Add focused failing tests for legacy unranked `ratingBucket` rematch projection tolerance and visible rematch lifecycle states.
- Fix app-side rematch projection and creation behavior without widening ranked, Daily, custom/private-code, nonterminal, or nonparticipant eligibility.
- Add visible-panel rematch refresh through immediate action refresh and 5-second visible polling while eligible terminal unranked Practice postgame actions are mounted.
- Preserve existing `Open new unranked match` behavior.
- Run focused rematch tests, then the full Stage 32.4 verification gate.

## Work Completed

- Added a domain regression covering legacy unranked Practice projections that carried a `ratingBucket`.
- Added component coverage for declined, cancelled, expired, created, and idempotent rematch lifecycle states.
- Updated direct Practice rematch projection eligibility to tolerate legacy unranked `ratingBucket` values while still rejecting ranked, Daily, custom/private-code, matchmaking, nonterminal, nonparticipant, and malformed sources.
- Updated new Multiplayer game creation so unranked games no longer carry app-side `ratingBucket` values.
- Added visible-panel rematch refresh:
  - initial selected-game rematch load;
  - immediate refresh after request, cancel, decline, and accept actions;
  - 5-second polling while an eligible terminal unranked Practice postgame panel is visible and the document is visible;
  - refresh on document visibility return.
- Preserved existing `Open new unranked match` behavior.

## Verification Results

- Passed: focused rematch tests with `npm run test -- src/multiplayer/postgameActions.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/multiplayerRepository.test.ts` reported 3 files and 53 tests passing.
- Passed: `npm run lint` after repairing a local lint-only shape issue in the new helper code.
- Passed: `npm run test` reported 104 files and 682 tests passing.
- Passed: `npm run build` with the existing Vite large-chunk advisory.
- Passed: `npx tsc -p tsconfig.api.json --noEmit`.
- Passed: `git diff --check`.
- Passed: Python CSV shape check using `python3 -S` reported `rows=255 columns=[12] last_id=253`.
- Passed: `git status --short --branch` showed expected existing Phase 32 planning/progress/migration changes plus the Stage 32.4 rematch source/test/progress changes.

## Blockers

- None at this stage.

## Next Gate

Review this Stage 32.4 report and authorize Stage 32.5 queue/lobby/identity routing stabilization before any queue/lobby routing fixes, opponent identity app integration, account accent fixes, rating display fixes, E2E hardening, Phase 33 ranked expansion, public/guest spectation, or PR/deployment work.
