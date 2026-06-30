# Progress Step 307: Phase 37 Stage 37.3 Gameplay Auto-Centering

## Status

Completed - Awaiting User Review Before Stage 37.4.

## Authority

User authorized Phase 37 Stage 37.3 only: source-only gameplay-area auto-centering after safe game entry, join, resume, notification routing, Live/Lobby selection, dashboard routing, and postgame routing transitions, using the completed Stage 37.2 solo invalid-guess sound baseline.

This pass did not authorize browser back/forward integration, upper gameplay information condensation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`
- `origin/main`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`
- Existing user edit to `planning/phase-36/REVIEW-CHECKLIST.md`: preserved and not edited in this stage.
- Existing uncommitted Phase 37 planning/spec/progress artifacts remain unstaged.

## Implementation Summary

- Added `src/app/gameplayAutoCenter.ts` with a best-effort browser-only gameplay auto-centering scheduler and stable gameplay target selectors.
- Tagged solo OG and solo GO guess grids as the solo gameplay auto-center target.
- Tagged the active multiplayer game surface as the multiplayer gameplay auto-center target.
- Wired auto-centering from explicit solo entry, mode switch, selected active game, resume, and signed-in auto-resume flows.
- Wired auto-centering from multiplayer direct resume, Lobby join, selected visible games, create/join actions, ranked queue finalization, and safe postgame rematch/play-again routing flows.
- Kept passive multiplayer auto-route and stale/unavailable selected-game fallbacks from forcing a scroll to a nonexistent gameplay surface.
- Added focused tests for browser/SSR no-op behavior, reduced-motion behavior, safe focus behavior, missing-anchor no-op behavior, and scheduler selection.

## Verification

- Focused Stage 37.3 test set: `npm run test -- src/app/gameplayAutoCenter.test.ts src/app/games/soloSoundEvents.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/app/routes.test.ts`
  - Result: passed, `4` files and `46` tests.
- `npm run lint`
  - Result: passed.
- `npm run test`
  - Result: passed, `108` files and `746` tests.
- `npm run build`
  - Result: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
  - Result: passed.
- `git diff --check`
  - Result: passed.
- Progress CSV shape check using `python3 -S`
  - Result: passed, `rows=309 columns=[12] last_id=307`.
- Non-printing secret/artifact scan
  - Result: passed, `scanned_files=24 credential_pattern_hits=0`.
- Ignored-artifact check
  - Result: passed, `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
  - Result: passed, no listeners found.
- `git status --short --branch`
  - Result: completed; expected uncommitted Phase 37 planning/progress artifacts, preserved Phase 36 review-checklist edits, Stage 37.2 source/test changes, and Stage 37.3 source/test changes remain in the worktree.

## Boundaries Preserved

No browser back/forward integration, upper gameplay information condensation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review Stage 37.3 evidence. If approved, explicitly authorize Stage 37.4 browser back/forward integration before browser-history source work, migrations, configuration/deployment work, Git/GitHub operations, backup workflow execution, or original stable repository work.
