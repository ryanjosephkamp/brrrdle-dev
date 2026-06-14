# Pre-Phase-25 Multiplayer OG Solved-Row Hold Fix Spec

**Status**: Planning/specification only - awaiting explicit implementation authorization.
**Date**: 2026-06-14
**Target repository**: `brrrdle-dev`
**Related progress**: `progress/PROGRESS-STEP-156.md`

## 1. Status And Authority

This is a narrow pre-Phase-25 bugfix plan for the independent `brrrdle-dev` repository.

This document does not authorize implementation, source/runtime edits, test edits, Supabase migrations, Vercel configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, Phase 25 work, new custom skills, or work against the original stable `brrrdle` repository.

Implementation requires a later explicit user prompt.

Authority order remains:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. Active approved specs/plans and progress records.
5. This bugfix spec.
6. Supporting files such as `agents.md` and `memory.md`.

## 2. Problem Statement

Multiplayer OG currently transitions too abruptly from a winning all-green guess to the terminal post-game surface.

The user confirmed:

- Practice Multiplayer OG does not briefly show the final all-green solved board before final results.
- Daily Multiplayer OG does not briefly show the final all-green solved board before final results.
- Solo OG already has the desired final solved-board behavior.
- Multiplayer GO already has the desired final solved-row hold before terminal results.
- This is cosmetic/UX polish and does not appear to affect gameplay mechanics.

Desired behavior:

- After a correct final multiplayer OG guess, the multiplayer gameplay board should remain mounted briefly.
- The final submitted all-green guess should be visible on that board.
- The final answer/definitions/result surface should be delayed until after the hold.
- The hold duration should match existing multiplayer GO terminal solved-row behavior.

## 3. Scope

### In Scope

- Practice Multiplayer OG final solved-row hold.
- Daily Multiplayer OG final solved-row hold.
- Reusing or generalizing the existing terminal solved-move hold behavior in `src/multiplayer/MultiplayerPanel.tsx`.
- Focused tests that prove Practice and Daily Multiplayer OG keep the gameplay surface visible before terminal definitions.
- Focused verification plus the normal local gate needed for a multiplayer UI bugfix.

### Explicitly Out Of Scope

- Solo OG changes.
- Solo GO changes.
- Multiplayer GO behavior changes beyond preservation/non-regression.
- Core gameplay engine changes in `src/game/`.
- Multiplayer reducer semantic changes unless a narrow blocker is discovered and reported.
- Scoring, timeout, forfeit, rating/ELO, result-settlement, or Daily claim rule changes.
- Practice Multiplayer Hard Mode or time-limit rule changes.
- Supabase schema changes or migrations.
- Vercel configuration or deployment.
- Phase 25 work.
- Notifications, dashboard widgets, spectator expansion, public Live gallery, social features, broad redesign, or refactors.
- Work against the original stable `brrrdle` repository.

## 4. Current Code Context

Read-only inspection found the likely cause in `src/multiplayer/MultiplayerPanel.tsx`:

- `getLatestSolvedGoMoveId` finds a solved move only when `game.mode === 'go'`.
- `showTerminalGoSolvedSurface` keeps the multiplayer gameplay surface mounted only for terminal GO wins.
- The terminal definitions block is suppressed only while `showTerminalGoSolvedSurface` is true.
- Therefore terminal multiplayer OG wins skip the solved-row hold and show terminal content immediately.

`src/multiplayer/MultiplayerGameSurface.tsx` already renders OG boards from player sessions plus shared moves. That suggests the fix should stay in the panel-level terminal hold logic rather than in canonical gameplay state.

Existing relevant tests:

- `src/multiplayer/MultiplayerPanel.test.tsx` already verifies terminal GO solved-row hold for both Practice and Daily.
- `src/multiplayer/MultiplayerGameSurface.test.tsx` verifies OG shared move rendering and GO transition projection details.
- `e2e/gameplay/practice-multiplayer-og.spec.ts` and `e2e/gameplay/daily-multiplayer-og.spec.ts` already drive real two-client OG completion flows.

## 5. Recommended Implementation Approach

Use the smallest panel-level generalization:

1. Rename or replace `getLatestSolvedGoMoveId` with a mode-neutral helper such as `getLatestSolvedMoveId`.
2. Allow the helper to return the latest all-correct move for both OG and GO.
3. Rename `clearedTerminalGoMoveId` and `showTerminalGoSolvedSurface` to mode-neutral names, such as `clearedTerminalSolvedMoveId` and `showTerminalSolvedSurface`.
4. Keep the existing 2000ms hold duration.
5. Keep the gameplay surface disabled during the terminal hold.
6. Keep the terminal answer/definitions surface suppressed while the hold is active.
7. Do not change `submitMultiplayerGuess`, scoring, result settlement, player sessions, or repository semantics unless implementation proves the panel-only approach is insufficient.

The user-facing status text can stay aligned with GO:

- `Advancing to final results`

The change should preserve read-only/nonparticipant behavior:

- Read-only views should continue to show terminal summaries directly.
- Authenticated nonparticipants should not get a gameplay surface mounted.

## 6. Likely Files

Implementation:

- `src/multiplayer/MultiplayerPanel.tsx`

Focused tests:

- `src/multiplayer/MultiplayerPanel.test.tsx`

Possible read-only/reference surfaces:

- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/MultiplayerGameSurface.test.tsx`
- `e2e/gameplay/practice-multiplayer-og.spec.ts`
- `e2e/gameplay/daily-multiplayer-og.spec.ts`

Avoid touching unless a narrow blocker is found:

- `src/game/`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayerRepository.ts`
- Supabase files
- route/workspace files unrelated to the selected-game terminal rendering

## 7. Focused Test Plan

Add focused component coverage to `src/multiplayer/MultiplayerPanel.test.tsx`.

Recommended test:

- Add `it.each(['practice', 'daily'] as const)` coverage for a completed multiplayer OG game.
- Create/join a multiplayer OG lobby.
- Submit the correct answer.
- Render `MultiplayerPanel` for a participant.
- Assert:
  - game status is `won`;
  - rendered HTML contains `Multiplayer guess grid`;
  - rendered HTML contains `Advancing to final results`;
  - rendered HTML does not contain `Answer and definitions`;
  - the final answer letters appear in the submitted row.

Keep or add non-regression around GO:

- Existing Practice/Daily terminal GO hold test should continue to pass unchanged or after symbol renames.

Recommended focused command:

- `npm run test -- src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/MultiplayerGameSurface.test.tsx src/multiplayer/multiplayer.test.ts`

Recommended E2E command if implementation touches only panel-level terminal rendering:

- `npm run test:e2e:multiplayer`

Reason: the existing real two-client Practice/Daily OG E2E already completes OG games. It should remain green, and it may naturally exercise the post-submit UI state. If the component tests directly prove the transient hold, E2E does not need brittle fixed-sleep assertions unless browser behavior diverges.

## 8. Verification Expectations

Focused verification should run first:

- `npm run test -- src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/MultiplayerGameSurface.test.tsx src/multiplayer/multiplayer.test.ts`
- `npm run test:e2e:multiplayer` when local Supabase E2E credentials are available

Then run the normal local gate:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`

If a visible browser check is warranted, use one local dev server and smoke the two affected flows:

- Practice Multiplayer OG solved final guess.
- Daily Multiplayer OG solved final guess.

Stop any Stage-owned dev server afterward.

## 9. Risks And Mitigations

| Risk | Mitigation |
| --- | --- |
| The terminal hold accidentally appears for losses, forfeits, timeouts, or cancelled lobbies. | Gate the hold on `selectedGame.status === 'won'` and a latest solved all-correct move. |
| The fix changes multiplayer domain behavior. | Keep the change in `MultiplayerPanel.tsx`; do not alter `submitMultiplayerGuess` or reducers unless proven necessary. |
| GO terminal hold regresses during helper rename. | Keep the existing GO test and run `MultiplayerPanel.test.tsx` plus `MultiplayerGameSurface.test.tsx`. |
| Read-only/nonparticipant views mount gameplay unexpectedly. | Preserve `!readOnly` and `viewerPlayerId` guards around `MultiplayerGameSurface`. |
| Daily Multiplayer invariants regress. | Do not touch creation/join/claim logic; run focused multiplayer tests and E2E when credentials are available. |
| The transient UI is hard to prove in E2E without brittle sleeps. | Prove the terminal hold in deterministic component tests; use E2E for real completion non-regression. |

## 10. Stop Conditions

Stop and report before implementation continues if:

- the fix appears to require canonical gameplay or settlement changes;
- the fix appears to require Supabase schema/RLS changes;
- Practice and Daily Multiplayer OG need different approaches;
- focused tests cannot be written without brittle timing assumptions;
- any verification failure suggests broader multiplayer regression;
- local E2E credentials are unavailable and the execution prompt requires real E2E as a hard gate.

## 11. Open Decisions

No blocking user decisions are needed before implementing the planned fix.

Recommended default:

- Fix before Phase 25 as a pre-Phase-25 bugfix.
- Keep the implementation panel-scoped.
- Add deterministic component tests for Practice and Daily Multiplayer OG.
- Run real multiplayer E2E as a non-regression gate when credentials are available.
