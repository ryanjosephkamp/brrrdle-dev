# Progress Step 296: Phase 36 Stage 36.1 Audit And Scope Lock

**Date:** 2026-06-28
**Phase:** Phase 36 - Leaderboard And Stats Navigation Split
**Stage:** Stage 36.1 - Route, Identity, Settings, And Copy Audit
**Status:** Completed - Awaiting User Review Before Stage 36.2

## Authorization

The user authorized Phase 36 Stage 36.1 only: read-only route, identity, Settings, and password-copy audit and scope lock.

The prompt did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at audit start: `main`
- `HEAD`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- `origin/main`: `cce41908a0a760086e9b5bf0da6009bdbb866667`
- Existing user edit to `planning/phase-35/REVIEW-CHECKLIST.md`: preserved and not edited in this stage.
- Existing uncommitted Phase 36 planning/spec/progress artifacts from Steps 292 through 295: preserved.

## Audit Findings

### Route and navigation ownership

- `src/app/routes.ts` has no `leaderboard` route yet.
- Primary navigation currently orders support routes as `History`, `Stats`, `Words`, `Profile`, `Settings`, `Feedback`, and `About`.
- `src/app/routes.test.ts` explicitly locks the current primary navigation order and support-route grouping.
- `src/app/LunarSignalStage.tsx` derives route color by route index and maps route ids to eyebrow labels; a new `leaderboard` route will need an eyebrow label and visual review for color/readability.
- `src/app/App.tsx` currently renders `StatsDashboard` for the `stats` route and does not yet have a Leaderboard route branch.

### Stats and Leaderboard content ownership

- `src/stats/StatsDashboard.tsx` currently imports and renders `PublicRankedLeaderboardPanel` and `MultiplayerStatsPanel` inside Stats.
- `StatsDashboard` also owns local/personal stat cards, charts, calendar heatmap, XP progress, and coin trend content that should remain in Stats.
- A Stage 36.3 split can be source-only by moving public ranked leaderboard and competitive multiplayer rating content into a route-level Leaderboard component while leaving local stats in `StatsDashboard`.
- Relevant tests to update later include `src/app/routes.test.ts`, `src/stats/StatsDashboard.test.tsx`, public leaderboard tests, `src/multiplayer/MultiplayerStatsPanel.test.tsx`, and new Leaderboard route/component tests.

### Active Games safe-name inputs

- The user screenshots show Active Games cards falling back to `Rival` for the opponent where the safe public/profile name should be available.
- `src/multiplayer/multiplayerViewModels.ts` already supports safe profile overrides in `toActiveGameViewModel`, `getOpponentLabel`, and `getTurnLabel`.
- `selectLiveMultiplayerRows` already accepts `participantProfilesByGameId` and passes the per-game safe profile map to `toLiveGameViewModel`.
- `selectActiveMultiplayerGameRows` currently calls `toActiveGameViewModel(game, viewerUserId)` without accepting or passing `participantProfilesByGameId`.
- `src/multiplayer/MultiplayerWorkspace.tsx` already fetches participant identity summaries for authenticated participant games through `getParticipantIdentitySummaries`, stores them as `participantProfilesByGameId`, and passes that map to Live rows.
- Active Games currently computes rows with `selectActiveMultiplayerGameRows(state, viewerUserId)`, so it does not consume the safe profile map that Live already receives.
- Existing source and RPC seams appear sufficient for a source-only Active Games safe-name repair. No migration/RLS addendum is required at this stage.

### Password-update copy

- The user screenshot shows the signed-in password-change modal reporting `Unable to send a reset link right now. Please try again in a moment.` for a password-update failure.
- `src/account/auth.ts` currently defines auth error actions for `reset-password` and `update-profile`, but not a distinct `update-password` action.
- `updatePassword` currently classifies Supabase `updateUser({ password })` failures through `classifyAuthError(error, 'reset-password')`, which explains the reset-link wording.
- Stage 36.4 can source-only add update-password-specific safe copy. Same-current-password-specific copy should be used only if provider error text can be classified reliably; otherwise the copy should remain truthful and password-update-specific.

### Settings order and consolidation

- `src/account/Settings.tsx` currently renders Gameplay first, then Notifications, then signed-in Account management, then `AuthPanel` signed-in state, then `Sound Effects`, then Cloud sync, Local guest progress, and Danger zone.
- The current `Sound Effects` heading capitalization does not match the requested `Sound effects`.
- Signed-in email/sign-out controls currently come through `AuthPanel`, separate from the Account management panel. Stage 36.4 should consolidate those controls into Account management if it can preserve sign-out, password-change access, email-change gate copy, anonymous/unconfigured states, and Profile-tab ownership.

## Stage 36.2 Decision

Stage 36.2 should proceed as source-only Active Games safe-name repair.

The audit found that safe participant identity data is already available through the Phase 32 participant identity RPC and is already fetched by `MultiplayerWorkspace`. The Active Games regression appears to be a source wiring gap: Active rows do not receive the safe `participantProfilesByGameId` map already used by Live rows.

If Stage 36.2 implementation discovers that a required Active Games perspective cannot be served by the existing safe identity seams, implementation must stop and route to a migration/RLS addendum before SQL or broader source work.

## Browser And Resource Notes

- The three user-provided screenshots were inspected for the audit record.
- No local browser reproduction or dev server was needed because the reported symptoms match a clear code-level omission.
- Pre-verification watched-port check found no listeners on `5173`, `5174`, `3000`, or `4173`.

## Verification

Stage 36.1 verification passed:

- `git diff --check`
  - Result: passed with no output.
- Progress CSV shape check using `python3 -S`
  - Result: `rows=298 columns=[12] last_id=296`.
- Non-printing secret/artifact scan over changed tracked and untracked repository files
  - Result: `scanned_files=11 credential_pattern_hits=0 changed_artifacts=0`.
- Ignored-artifact check
  - Result: refined check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0` after an initial over-broad false positive flagged tracked `.env.example` and `public/manifest.webmanifest`, which are not forbidden local artifacts.
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
  - Result: all watched ports clear.
- `git status --short --branch`
  - Result: completed; branch remained `main` tracking `origin/main`, with Phase 36 planning/spec/progress artifacts plus the preserved user-edited Phase 35 review checklist.

## Boundaries Preserved

No source/runtime code, tests, Supabase migrations, Vercel or Supabase configuration, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, Stage 36.2 implementation, or original stable repository work was performed.

## Next Step

Review the Stage 36.1 audit evidence. If approved, authorize Stage 36.2 source-only Active Games safe-name repair before Leaderboard route work, Settings/password-copy work, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
