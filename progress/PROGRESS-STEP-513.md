# Progress Step 513 - Phase 54 Live/Lobby Identity And Spectator Polish Planning

**Status**: Completed - Phase 54 Planning Package Prepared.
**Phase**: Phase 54 planning.
**Repository**: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Date**: 2026-07-09.

## Summary

Phase 54 is planned as a bounded source/test pass for authenticated participant identity links in Active Games and Live, source-aware public-profile return routing, and spectator-adjacent presentation polish.

The repository review found that the existing authenticated participant identity RPC already supplies a safe public profile id only to a caller who participates in the game. The existing Lobby and public/guest spectator contracts intentionally do not provide profile ids. The planned implementation therefore makes only participant-owned links interactive, keeps Lobby and spectator identities display-only, and stops for a separate migration/RLS addendum if broader linking is desired.

## Changes

- Created `planning/phase-54/PLANNING-BRIEF.md`.
- Created `planning/phase-54/IMPLEMENTATION-PLAN.md` with current-contract analysis, exact source/test tasks, E2E coverage, and protected-contract stop conditions.
- Updated `planning/FUTURE-WORKFLOW-TIMELINE.md` and `planning/README.md` for Phase 54 planning.
- Updated `progress/PROGRESS.csv` with row `513`.
- Created ignored execution prompt `prompt-packages/phase-54/PHASE-54-LIVE-LOBBY-IDENTITY-AND-SPECTATOR-POLISH-IMPLEMENTATION-PROMPT-2026-07-09.md`.

## Verification

Completed during this planning/package pass:

- `git diff --check`.
- CSV shape check.
- Non-printing/credential-value/private-data scan over changed tracked/untracked files plus the ignored prompt artifact.
- Ignored-artifact check confirming the prompt package is ignored and not tracked.
- Watched-port check and `git status --short --branch` review.

## Boundaries

No source/runtime code, tests, migrations, remote Supabase work, deployment configuration, Git/GitHub actions, backup execution, release, public tunneling, spectator presence/count/list work, gameplay/persistence/reward/scoring/Elo/ranked-queue/private-Practice change, minimal-shell handoff preparation, UI toolkit adoption, image generation, unsafe credential/private-data handling, or original stable `brrrdle` repository work was performed.

## Next Step

Use `prompt-packages/phase-54/PHASE-54-LIVE-LOBBY-IDENTITY-AND-SPECTATOR-POLISH-IMPLEMENTATION-PROMPT-2026-07-09.md` to authorize bounded Phase 54 source/test implementation. It must stop rather than widening any Lobby or spectator identity contract.
