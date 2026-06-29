# Progress Step 299: Phase 36 Stage 36.4 Settings And Password Copy Cleanup

**Date:** 2026-06-28
**Phase:** Phase 36 - Leaderboard And Stats Navigation Split
**Stage:** Stage 36.4 - Settings And Password Copy Cleanup
**Status:** Completed - Awaiting User Review Before Stage 36.5

## Authorization

The user authorized Phase 36 Stage 36.4 only: Settings section order/consolidation and signed-in password-update failure copy cleanup using the completed Stage 36.3 Leaderboard route and Stats split baseline.

The prompt did not authorize additional Leaderboard/Stats route work, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- `origin/main`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- Existing user edit to `planning/phase-35/REVIEW-CHECKLIST.md`: preserved and not edited in this stage.
- Existing uncommitted Phase 36 planning/spec/progress artifacts and Stage 36.2/36.3 source/test changes: preserved.

## Implementation

- Updated `src/account/Settings.tsx` so Settings top-level sections render in the requested order: Gameplay, Sound effects, Notifications, Account management.
- Changed `Sound Effects` to `Sound effects`, including the notification helper copy that references the master sound toggle.
- Consolidated signed-in email, sign-out, Profile tab routing, password-change access, email-change gate copy, cloud sync, local guest progress, and danger-zone account/persistence copy into the Account management section.
- Kept signed-out and unconfigured account-management states truthful without exposing new auth flows or changing Supabase/Vercel configuration.
- Updated `src/account/auth.ts` so signed-in password updates use an `update-password` error classification instead of the reset-link classifier.
- Added safe same-current-password/no-op copy only for provider errors that explicitly identify the password as needing to differ from the old/current password.
- Added focused account tests for Settings order/capitalization, signed-in consolidation, signed-out/unconfigured states, password-update generic copy, and same-current-password copy.

## Focused Verification

- `npm run test -- src/account/Settings.test.tsx src/account/authHelpers.test.ts src/account/auth.test.ts`
  - Result: passed, `3` files and `70` tests.

## Full Verification

- `npm run lint`
  - Result: passed.
- `npm run test`
  - Result: passed, `106` files and `735` tests.
- `npm run build`
  - Result: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
  - Result: passed.
- `git diff --check`
  - Result: passed.
- Progress CSV shape check using `python3 -S`
  - Result: passed, `rows=301 columns=[12] last_id=299`.
- Non-printing credential-shaped secret/artifact scan over changed files
  - Result: passed, `scanned_files=30 credential_pattern_hits=0`.
- Ignored-artifact check
  - Result: passed, `tracked_files_checked=870 staged_files_checked=0 forbidden_hits=0`.
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
  - Result: passed, no listeners found.
- `git status --short --branch --untracked-files=all`
  - Result: completed; expected uncommitted Phase 36 planning/progress files, the user-edited Phase 35 review checklist, Stage 36.2/36.3 source/test changes, and Stage 36.4 source/test/progress changes remain in the worktree.

## Boundaries Preserved

No additional Leaderboard/Stats route work, Supabase migrations, Vercel or Supabase configuration, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review Stage 36.4 evidence. If approved, explicitly authorize Stage 36.5 final hardening/visual review/manual checklist before final hardening, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
