# Progress Step 428 - Phase 47 Stage 47.3 Mobile Solo GO Keyboard Visibility And Re-Entry Repair

**Status:** Completed - Awaiting User Review Before Stage 47.4
**Phase:** Phase 47 - Mobile Solo GO Visibility and Account Display Boundaries
**Stage:** Stage 47.3 - Mobile Solo GO Keyboard Visibility And Re-Entry Repair
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-06T00:16:12Z
**Completed:** 2026-07-06T00:23:27Z

## Authorization

The user authorized Phase 47 Stage 47.3 only: source/test-only mobile Solo GO keyboard visibility and re-entry repair using the completed Stage 47.2 source-only decision baseline.

Authorized work included preserving the user-updated `planning/phase-46/REVIEW-CHECKLIST.md`, reading Phase 47 planning/spec/implementation materials and Stage 47.1 through Stage 47.2 progress, creating this progress report and the matching 12-column CSV row, implementing the smallest source/test repair, strengthening focused mobile Playwright assertions, and running verification.

This pass did not authorize guest/account display-boundary audit or repair, broad mobile shell/top-tab/navigation overhaul, compact side dock implementation, Supabase migrations, storage schema changes, destructive local cleanup, deployment/configuration, Git/GitHub actions, backup workflow execution, spectator presence/count/list, service workers/push, gameplay-rule changes, Elo changes, secret/private-data/local-artifact exposure, local Codex skill changes, or original stable repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed branch: `main`.
- Confirmed `HEAD`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- Confirmed `origin/main`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- Confirmed remote: `https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved the user-updated `planning/phase-46/REVIEW-CHECKLIST.md`.

## Files Changed

- `src/app/gameplayAutoCenter.ts`: added mobile Solo keyboard bottom-clearance correction after initial scroll, using actual keyboard bottom geometry and delayed re-querying to handle layout settle/remount timing.
- `src/app/gameplayAutoCenter.test.ts`: covered bottom-clearance correction math and delayed mobile keyboard correction.
- `src/app/games/soloGameplayAutoCenter.ts`: added playing-session entry/re-entry scheduling for mobile Solo keyboard alignment.
- `src/app/games/soloGameplayAutoCenter.test.ts`: covered the new entry/re-entry scheduling predicate.
- `src/app/games/GoGame.tsx`: switched GO from fresh-only mobile keyboard scheduling to playing-session entry/re-entry scheduling while preserving existing post-guess scheduling.
- `src/app/games/OgGame.tsx`: applied the same shared bounded entry/re-entry scheduling path so OG re-entry risk is naturally covered without changing gameplay behavior.
- `src/index.css`: lifted the mobile back-to-top button farther while gameplay is active to avoid overlapping the Solo keyboard.
- `e2e/layout/mobile-scroll.spec.ts`: replaced permissive viewport-ratio keyboard checks with bottom-clearance assertions and added Daily GO pre-guess, Practice GO new-chain, Daily GO re-entry, and Practice GO re-entry coverage.
- `progress/PROGRESS-STEP-428.md`: recorded this Stage 47.3 pass.
- `progress/PROGRESS.csv`: appended the matching 12-column progress row.

## Behavior Implemented

- Mobile Daily Solo GO before the first valid guess now uses the shared Solo keyboard target plus explicit bottom-clearance correction.
- Mobile Practice Solo GO `New go chain` now recovers from button-click scroll positioning by re-querying and correcting the current keyboard after layout settles.
- Mobile Daily Solo GO re-entry after submitted guesses now schedules mobile keyboard alignment even when the session is not fresh.
- Mobile Practice Solo GO re-entry after submitted guesses now schedules mobile keyboard alignment even when the session is not fresh.
- OG re-entry risk is naturally covered by the same shared Solo entry/re-entry scheduling without changing OG gameplay rules or already-passing fresh/post-guess behavior.
- Mobile keyboard assertions now fail when the keyboard bottom is clipped, rather than passing on partial viewport visibility.
- The back-to-top button is lifted farther on mobile while gameplay is active to avoid sitting on top of the keyboard area.

## Verification

Passed focused verification:

- `npm run test -- src/app/gameplayAutoCenter.test.ts src/app/games/soloGameplayAutoCenter.test.ts`: 2 files, 17 tests.
- `npx playwright test e2e/layout/mobile-scroll.spec.ts`: 17/17 mobile layout tests.

Passed full Stage 47.3 verification:

- `npm run lint`.
- `npm run test`: 125 files, 854 tests.
- `npm run build`: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.
- `git diff --check`.
- Progress CSV shape check using `python3 -S`: `rows=430 columns=[12] last_id=428`.
- Non-printing changed/untracked file credential-value scan: no credential values found.
- Ignored-artifact check: no staged or tracked forbidden artifacts found.
- Watched ports `5173`, `5174`, `3000`, and `4173` clear after verification.
- `git status --short --branch` completed.

## Browser And Resource Observations

- Focused mobile Playwright coverage used a 390px by 844px mobile viewport with touch/mobile emulation.
- The browser checks confirmed bottom keyboard clearance for Practice OG fresh/post-guess, Daily GO pre-guess, Practice GO `New go chain`, Daily GO re-entry after a submitted guess, and Practice GO re-entry after a submitted guess.
- Playwright's web server was stopped after the focused run; final watched-port cleanup found no listeners on `5173`, `5174`, `3000`, or `4173`.

## Addendum Decision

No broader mobile layout/scaling addendum became required.

Stage 47.3 remained within the approved source/test-only repair boundary. The repair did not require broad mobile shell/top-tab/navigation overhaul, compact side dock work, broad gameplay layout redesign, storage/Supabase changes, session leases, gameplay-rule changes, or Elo changes.

## Blockers And Open Questions

No blockers remain for Stage 47.3.

Open questions remain routed to later approved stages:

- Stage 47.4 should audit signed-out guest/account display boundaries for History, leaderboard/rating summaries, Stats, and other account-specific surfaces.
- Same-account multi-tab/browser session freshness remains classified for later routing; one-active-session enforcement remains deferred unless future evidence proves it is necessary.
- Broad mobile shell/top-tab/navigation overhaul and compact/collapsible side dock implementation remain deferred.

## Boundary Confirmation

No guest/account display-boundary repair, broad mobile shell/top-tab/navigation overhaul, compact side dock implementation, migrations, storage changes, deployment/configuration, staging, commits, pushes, PRs, merges, releases, branch deletion, backup workflow execution, spectator presence/count/list work, service workers/push work, gameplay-rule changes, Elo changes, secret/private-data/local-artifact exposure, local Codex skill changes, or stable `brrrdle` repository work was performed.

## Next Gate

The next safe action is Phase 47 Stage 47.4 guest/account display-boundary audit only.
