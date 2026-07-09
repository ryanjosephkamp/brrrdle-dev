# Progress Step 514 - Phase 54 Live/Lobby Identity And Spectator Polish Implementation

**Status**: Completed - Phase 54 Review Candidate Prepared.
**Phase**: Phase 54 implementation.
**Repository**: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev` only.
**Date**: 2026-07-09.

## Summary

The user authorized the bounded Phase 54 source/test implementation from `prompt-packages/phase-54/PHASE-54-LIVE-LOBBY-IDENTITY-AND-SPECTATOR-POLISH-IMPLEMENTATION-PROMPT-2026-07-09.md`.

This pass adds participant-only opponent public-profile actions in Active Games and Live by reusing the existing authenticated, participant-scoped identity RPC. It adds source-aware profile return routing while preserving display-only Lobby and spectator identities. No Supabase contract expansion was required.

## Changes

- Added a separate validated participant public-profile target map while retaining the display-only participant identity map.
- Added optional opponent targets only to authenticated participant Active and Live view models.
- Added accessible profile actions only when a valid existing target is present; static identity fallbacks remain unchanged.
- Kept Lobby hosts and authenticated/public spectator player identities display-only.
- Preserved focused spectator read-only routing and no-mutation behavior.
- Added normalized public-profile return routing so Multiplayer-origin profiles return to the retained Multiplayer subtab and Leaderboard-origin profiles continue returning to Leaderboard.
- Added source, component, navigation, browser-history, and real multi-client Live E2E regressions.
- Created Phase 54 changelog and manual review checklist.
- Updated planning timeline/index and progress routing.
- Created an ignored Review Candidate Backup prompt package after clean verification.

## Verification

- Focused unit/component/navigation suite passed: 8 files / 67 tests.
- Focused `live-v1-spectator` Playwright E2E passed: 1 test.
- `npm run lint` passed.
- `npm run test` passed: 131 files / 919 tests.
- `npm run test:e2e` passed: 58 tests.
  - An initial run lost its Playwright-owned local Vite server mid-run and produced a cascade of connection-refused failures. The isolated initially failed ranked Practice GO test passed; the full retry used an explicit loopback-only Vite server and passed all 58 tests.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.
- `git diff --check`, CSV shape, non-printing/credential-value scan, ignored-artifact check, watched-port check, and final status review passed after documentation and prompt creation.

## Boundaries

No Git/GitHub action, branch creation, staging, commit, push, PR, merge, backup execution, release, deployment, public tunneling, Supabase migration/RPC/RLS/schema/table/storage/grant change, remote Supabase work, Lobby/spectator identity-contract expansion, spectator presence/count/list/tracking, gameplay, Solo persistence, multiplayer persistence, Daily claim, reward/XP/coin/consumable formula, scoring, Elo/rating, ranked queue, private Practice behavior, Phase 55+ work, minimal-shell preparation, UI toolkit adoption, image generation, unsafe credential/private-data handling, or original stable `brrrdle` repository work was performed.

## Next Step

Use `prompt-packages/phase-54/PHASE-54-LIVE-LOBBY-IDENTITY-AND-SPECTATOR-POLISH-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-09.md` to authorize the governed Phase 54 Review Candidate GitHub Backup while keeping Phase 54 open for hosted/manual review.
