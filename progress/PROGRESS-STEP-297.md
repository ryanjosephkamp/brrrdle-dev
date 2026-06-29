# Progress Step 297: Phase 36 Stage 36.2 Active Games Safe-Name Source Repair

**Date:** 2026-06-28
**Phase:** Phase 36 - Leaderboard And Stats Navigation Split
**Stage:** Stage 36.2 - Active Games Safe-Name Source Repair
**Status:** Completed - Awaiting User Review Before Stage 36.3

## Authorization

The user authorized Phase 36 Stage 36.2 only: source-only Active Games safe-name repair using the completed Stage 36.1 audit baseline.

The prompt did not authorize Leaderboard route work, Stats split work, Settings cleanup, password-copy cleanup, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- `origin/main`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- Existing user edit to `planning/phase-35/REVIEW-CHECKLIST.md`: preserved and not edited in this stage.
- Existing uncommitted Phase 36 planning/spec/progress artifacts from Steps 292 through 296: preserved.

## Implementation

- Updated `src/multiplayer/multiplayerViewModels.ts` so `selectActiveMultiplayerGameRows` accepts the existing safe `participantProfilesByGameId` map and passes per-game profile overrides into `toActiveGameViewModel`.
- Updated `src/multiplayer/MultiplayerWorkspace.tsx` so Active Games rows receive the same safe participant profile map already fetched and used by Live rows.
- Added focused tests in `src/multiplayer/multiplayerViewModels.test.ts` covering:
  - joined-player perspective preferring the creator's safe public/profile name;
  - creator perspective preferring the joined player's safe public/profile name;
  - turn/detail labels using safe names where available;
  - `You` not leaking into rival/opponent labels;
  - `Rival` remaining a true fallback when identity summaries are unavailable;
  - public profile ids, flair keys, auth emails, and user ids staying out of Active Games view models.

## Focused Verification

- `npm run test -- src/multiplayer/multiplayerViewModels.test.ts src/multiplayer/MultiplayerWorkspace.test.tsx src/multiplayer/MultiplayerActiveGames.test.tsx`
  - Result: passed, `3` files and `22` tests.

## Full Verification

- `npm run lint`
  - Result: passed.
- `npm run test`
  - Result: passed, `105` files and `726` tests.
- `npm run build`
  - Result: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
  - Result: passed.
- `git diff --check`
  - Result: passed.
- Progress CSV shape check using `python3 -S`
  - Result: passed, `rows=299 columns=[12] last_id=297`.
- Non-printing credential-shaped secret/artifact scan over changed files
  - Result: passed, `scanned_files=15 credential_pattern_hits=0`.
- Ignored-artifact check
  - Result: passed, `tracked_files_checked=870 staged_files_checked=0 forbidden_hits=0` after refining an initial over-broad check that incorrectly flagged tracked source/session files and `.env.example`.
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
  - Result: passed, no listeners found.
- `git status --short --branch --untracked-files=all`
  - Result: completed; expected uncommitted Phase 36 planning/progress files, the user-edited Phase 35 review checklist, and the Stage 36.2 source/test/progress changes remain in the worktree.

## Boundaries Preserved

No Leaderboard route work, Stats split work, Settings cleanup, password-copy cleanup, Supabase migrations, Vercel or Supabase configuration, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review Stage 36.2 evidence. If approved, explicitly authorize Stage 36.3 Leaderboard route and Stats split before Settings/password-copy cleanup, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
