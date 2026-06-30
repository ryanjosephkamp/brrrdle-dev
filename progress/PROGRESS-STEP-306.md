# Progress Step 306: Phase 37 Stage 37.2 Solo Invalid-Guess Sound Repair

## Status

Completed - Awaiting User Review Before Stage 37.3.

## Authority

User authorized Phase 37 Stage 37.2 only: source-only solo OG/GO invalid-guess sound repair using the completed Stage 37.1 audit baseline.

This pass did not authorize gameplay auto-centering, browser back/forward integration, upper gameplay information condensation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`
- `origin/main`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`
- Existing user edit to `planning/phase-36/REVIEW-CHECKLIST.md`: preserved and not edited in this stage.
- Existing uncommitted Phase 37 planning/spec/progress artifacts remain unstaged.

## Implementation Summary

- Added `src/app/games/soloSoundEvents.ts` to centralize solo gameplay sound-event selection for edit inputs and submit outcomes.
- Updated `src/app/games/OgGame.tsx` so solo OG letter/delete inputs still play `keyboard-click`, but submit no longer plays the generic click cue first.
- Updated solo OG submit handling to play `invalid-guess` when `submitGuess` returns a validation failure and to preserve `tile-flip` plus `correct-guess` for accepted solves.
- Updated `src/app/games/GoGame.tsx` with the same submit-specific sound handling for solo GO using the active puzzle's validation state and the existing solved-transition detector.
- Added `src/app/games/soloSoundEvents.test.ts` covering solo OG invalid word-list submits, solo GO invalid word-list submits, solo hard-mode invalid submits, valid OG submit cues, valid GO submit cues, and letter/delete submit cue separation.

## Behavior Notes

- Solo invalid submissions now use the distinct `invalid-guess` cue consistently with the existing multiplayer invalid behavior.
- Valid solo submits still play accepted-submit cues.
- Letter and delete inputs still play the normal keyboard click cue.
- Multiplayer invalid-guess behavior was not changed.

## Verification

- Focused new test: `npm run test -- src/app/games/soloSoundEvents.test.ts`
  - Result: passed, `1` file and `6` tests.
- Focused regression set: `npm run test -- src/app/games/soloSoundEvents.test.ts src/app/games/soloHardModeDefaults.test.tsx src/sound/soundEngine.test.ts src/multiplayer/MultiplayerGameSurface.test.tsx`
  - Result: passed, `4` files and `37` tests.
- `npm run lint`
  - Result: passed.
- `npm run test`
  - Result: passed, `107` files and `741` tests.
- `npm run build`
  - Result: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
  - Result: passed.
- `git diff --check`
  - Result: passed.
- Progress CSV shape check using `python3 -S`
  - Result: passed, `rows=308 columns=[12] last_id=306`.
- Non-printing secret/artifact scan
  - Result: passed, `scanned_files=18 credential_pattern_hits=0`.
- Ignored-artifact check
  - Result: passed, `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
  - Result: passed, no listeners found.
- `git status --short --branch`
  - Result: completed; expected uncommitted Phase 37 planning/progress artifacts, preserved Phase 36 review-checklist edits, and Stage 37.2 source/test changes remain in the worktree.

## Boundaries Preserved

No gameplay auto-centering, browser back/forward integration, upper gameplay information condensation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review Stage 37.2 evidence. If approved, explicitly authorize Stage 37.3 gameplay auto-centering before browser-history integration, migrations, configuration/deployment work, Git/GitHub operations, backup workflow execution, or original stable repository work.
