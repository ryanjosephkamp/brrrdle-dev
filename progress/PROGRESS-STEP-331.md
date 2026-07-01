# Progress Step 331 - Phase 39 Stage 39.5B E2E Stability Repair

**Status**: Completed - Awaiting User Review Before Phase 39 Git Handoff Preparation
**Phase**: 39, Mobile Performance And Scroll Smoothness
**Stage**: 39.5B, narrow E2E stability repair
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T03:05:00Z
**Completed**: 2026-07-01T03:44:35Z

## Authorization

The user authorized Phase 39 Stage 39.5B only: a narrow E2E stability repair for the final Phase 39 verification blockers found during Stage 39.5.

This pass did not authorize and did not perform broad mobile UX overhaul, compact navigation, Focus Mode, progression HUD, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `937208ac519860cfa433fa39411c1b077508f26b`.
- `origin/main`: `937208ac519860cfa433fa39411c1b077508f26b`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used.
- The user-edited `planning/phase-38/REVIEW-CHECKLIST.md` checked state was preserved.

## Files Changed

- `e2e/fixtures/gameActions.ts` - made multiplayer E2E game selection status-aware, added stale-projection reload recovery, added a strict Lobby join path for Practice waiting games, and added an explicit selected-surface join path for Daily games.
- `e2e/gameplay/daily-multiplayer-go.spec.ts` - routed Daily GO waiting joins through the selected-surface join helper and required the host surface to reach `playing` before submitting.
- `e2e/gameplay/daily-multiplayer-og.spec.ts` - routed Daily OG waiting joins through the selected-surface join helper and required the host surface to reach `playing` before submitting.
- `e2e/gameplay/live-v1-spectator.spec.ts` - routed Practice waiting joins through the strict Lobby join helper and required the host surface to reach `playing` before submitting.
- `e2e/gameplay/practice-multiplayer-go.spec.ts` - routed Practice GO waiting joins through the strict Lobby join helper and required selected game surfaces to reach `playing` where the test depends on live game state.
- `e2e/gameplay/practice-multiplayer-og.spec.ts` - routed Practice OG waiting joins through the strict Lobby join helper and required selected game surfaces to reach `playing` where the test depends on live game state.
- `planning/phase-39/CHANGELOG.md` - updated Phase 39 completion evidence from blocked to ready for manual review.
- `planning/phase-39/REVIEW-CHECKLIST.md` - updated Phase 39 manual review checklist evidence from blocked to ready for manual review.
- `progress/PROGRESS-STEP-331.md` - recorded Stage 39.5B evidence and boundaries.
- `progress/PROGRESS.csv` - appended row `331`.

## Repair Summary

The Stage 39.5 full-suite failure came from E2E setup racing ahead of the browser UI projection:

- Practice waiting-game joins could fall back into selected-game or Active Games behavior when the intended Lobby row had not rendered yet, which briefly exposed participant-only identity fetch timing to nonparticipant setup paths.
- Selected game helpers returned as soon as the game id matched, even if the rendered game was still the pre-join `waiting` projection.
- Daily Multiplayer does not use the same workspace Lobby tab, so it needs a selected-surface join path rather than the Practice Lobby path.

Stage 39.5B repaired this in the E2E harness only:

- Practice waiting joins now use the Lobby action path first and fail/recover there instead of opening participant-only selected-game surfaces.
- The Lobby path gets one reload recovery if the admin row exists but the client fetch has not rendered the lobby row.
- Daily waiting joins require and click the visible selected-game `Join multiplayer match` button, then assert the selected game reaches `playing`.
- Selected-game setup can require an expected rendered status and perform one stale-status reload recovery.

No app source/runtime behavior was changed.

## Verification

Focused checks passed:

- `npx playwright test e2e/gameplay/practice-multiplayer-og.spec.ts -g "keeps post-guess forfeits|auto-routes an unranked lobby creator|routes ranked search-again creators"` reported `3 passed`.
- `npx playwright test e2e/gameplay/practice-multiplayer-og.spec.ts` reported `8 passed`.
- `npx playwright test e2e/gameplay/daily-multiplayer-go.spec.ts e2e/gameplay/daily-multiplayer-og.spec.ts` reported `2 passed`.
- `npx playwright test e2e/gameplay/practice-multiplayer-og.spec.ts e2e/gameplay/daily-multiplayer-og.spec.ts e2e/gameplay/daily-multiplayer-go.spec.ts` reported `10 passed`.

Final verification passed:

- `npm run lint`
- `npm run test` reported `109` files and `764` tests passed.
- `npm run test:e2e` reported `27` Playwright tests passed.
- `npm run test:full` reported `764` Vitest tests passed and `27` Playwright tests passed.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Progress CSV shape check using `python3 -S` reported `rows=333 columns=[12] last_id=331`.
- Non-printing credential-shaped secret/artifact scan reported no hits.
- Ignored-artifact check reported no forbidden tracked or staged artifacts.
- Watched-port cleanup check found no listeners on `5173`, `5174`, `3000`, or `4173`.
- `git status --short --branch` completed.

## Visual Artifacts

Stage 39.5 visual handoff artifacts remain local-only ignored evidence under:

- `test-results/visual-review/phase-39-stage-39-5/manifest.md`
- `test-results/visual-review/phase-39-stage-39-5/mobile-home-shell.png`
- `test-results/visual-review/phase-39-stage-39-5/mobile-word-explorer-top.png`
- `test-results/visual-review/phase-39-stage-39-5/mobile-word-explorer-mid-scroll.png`
- `test-results/visual-review/phase-39-stage-39-5/mobile-multiplayer-shell.png`
- `test-results/visual-review/phase-39-stage-39-5/mobile-settings-long-surface.png`
- `test-results/visual-review/phase-39-stage-39-5/desktop-word-explorer-table.png`

These artifacts must remain unstaged and uncommitted.

## Blockers And Open Questions

No blockers remain for Phase 39 Git handoff preparation after final repository hygiene verification.

Open question for review:

- Whether the user wants a separate manual mobile-device scroll review before Git handoff, or to proceed directly to Phase 39 Git handoff preparation using the generated manual checklist.

## Boundary Confirmation

No broad mobile UX overhaul, compact navigation, Focus Mode, progression HUD, Supabase migration, Vercel/Supabase configuration change, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation change, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
