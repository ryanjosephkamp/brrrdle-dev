# Progress Step 430 - Phase 47 Stage 47.5 Guest/Account Display-Boundary Repair

**Status:** Completed - Awaiting User Review Before Stage 47.6
**Phase:** Phase 47 - Mobile Solo GO Visibility and Account Display Boundaries
**Stage:** Stage 47.5 - Guest/Account Display-Boundary Repair
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-06T00:49:00Z
**Completed:** 2026-07-06T01:01:58Z

## Authorization

The user authorized Phase 47 Stage 47.5 only: source/test-only guest/account display-boundary repair using the completed Stage 47.4 guest/account display-boundary audit baseline.

Authorized work included preserving the user-updated `planning/phase-46/REVIEW-CHECKLIST.md`, reading Phase 47 planning/spec/implementation materials and Stage 47.1 through Stage 47.4 progress, creating this progress report and the matching 12-column CSV row, repairing signed-out guest/account display boundaries source/test-only, invalidating scheduled authenticated progress sync work on sign-out/account-scope changes, guarding authenticated sync completion by current auth state, active progress scope, and request user id, auditing the separate local multiplayer storage key for legacy account-row display risk, adding focused tests, and running verification.

This pass did not authorize mobile Solo keyboard work, broad mobile shell/top-tab/navigation overhaul, compact side dock implementation, Supabase migrations, storage schema changes, destructive local cleanup, deployment/configuration, Git/GitHub actions, backup workflow execution, spectator presence/count/list, service workers/push, gameplay-rule changes, Elo changes, secret/private-data/local-artifact exposure, local Codex skill changes, or original stable repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed branch: `main`.
- Confirmed `HEAD`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- Confirmed `origin/main`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- Confirmed remote: `https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved the user-updated `planning/phase-46/REVIEW-CHECKLIST.md`.

## Files Changed

- `src/account/autoProgressSync.ts`: expanded automatic authenticated sync completion guards to require current authenticated auth state, matching active authenticated progress scope, and matching request user id; added a helper for invalidating pending authenticated sync work when auth scope changes.
- `src/account/autoProgressSync.test.ts`: added focused guard coverage for stale sync completion after sign-out/account switching and auth-scope invalidation.
- `src/app/App.tsx`: clears scheduled authenticated progress sync work on auth-scope hydration changes and applies authenticated sync results only when the current auth state and active progress scope still match the request user.
- `src/history/historyViewModels.ts`: hides account-owned multiplayer result rows from signed-out History projections by requiring a current viewer user id before projecting competitive multiplayer rows.
- `src/history/historyViewModels.test.ts`: covers signed-out History rows keeping solo history while hiding account-owned multiplayer rows.
- `src/leaderboards/LeaderboardPanel.tsx`: gates local competitive multiplayer rating summaries to authenticated viewers so stale local account ratings do not render for anonymous guests.
- `src/leaderboards/LeaderboardPanel.test.tsx`: covers anonymous Leaderboard rendering without stale local rating summaries.
- `src/multiplayer/multiplayerViewModels.ts`: requires a signed-in viewer id before projecting active participant multiplayer rows or recent competitive multiplayer results.
- `src/multiplayer/multiplayerViewModels.test.ts`: covers signed-out hiding for active participant multiplayer rows and recent competitive results.
- `src/notifications/notificationViewModels.test.ts`: covers signed-out notification attention staying empty when stale account-owned multiplayer rows are present.
- `src/dashboard/dashboardViewModels.test.ts`: covers Dashboard/Home attention and previews staying empty for stale account-owned multiplayer state when no viewer id is present.
- `progress/PROGRESS-STEP-430.md`: records this Stage 47.5 repair.
- `progress/PROGRESS.csv`: appended the matching 12-column progress row.

## Behavior Implemented

- Scheduled authenticated progress sync work is invalidated when the app hydrates from authenticated account state to guest state or a different authenticated account.
- In-flight authenticated sync completions are treated as stale unless the current auth state is still authenticated, the active progress scope is still authenticated, and both match the request user id.
- Stale authenticated sync completions can no longer reapply account progress after sign-out or account switching.
- Signed-out History no longer projects account-owned competitive multiplayer result rows from stale local state.
- Signed-out Leaderboard no longer renders account-owned local competitive rating summaries from stale local state.
- Signed-out Dashboard/Home and route/notification attention no longer receive active participant multiplayer rows or recent competitive multiplayer results from stale account-owned local state.
- Signed-out Active Multiplayer selectors no longer project participant-only local multiplayer rows from the separate local multiplayer storage key without a current signed-in viewer id.
- Manual `Sync now`, Phase 46 automatic signed-in Solo sync/freshness, no implicit guest-to-account transfer, no authenticated progress writes to guest storage, Phase 47.3 mobile keyboard repairs, Phase 45 Solo account boundaries, Phase 44 account-scoped repairs, Phase 43 ranked fairness, Daily claim safety, gameplay rules, and Elo math were preserved.

## Verification

Focused verification passed before the full gate:

- `npm run test -- src/account/autoProgressSync.test.ts src/history/historyViewModels.test.ts src/leaderboards/LeaderboardPanel.test.tsx src/multiplayer/multiplayerViewModels.test.ts src/dashboard/dashboardViewModels.test.ts src/notifications/notificationViewModels.test.ts`: 6 files, 43 tests.

Passed full Stage 47.5 verification:

- `npm run lint`.
- `npm run test`: 125 files, 862 tests.
- `npm run build`: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.
- `git diff --check`.
- Progress CSV shape check using `python3 -S`: `rows=432 columns=[12] last_id=430`.
- Non-printing changed/untracked file credential-value scan: `scanned_files=36 credential_value_hits=0 binary_skipped=0`.
- Ignored-artifact check: `tracked_files=1117 staged_files=0 forbidden_artifact_hits=0`.
- Watched ports `5173`, `5174`, `3000`, and `4173` clear.
- `git status --short --branch` completed.

## Addendum Decision

No storage-contract, Supabase/RLS, migration, RPC, one-active-session/session-lease, destructive cleanup, gameplay-rule, or Elo addendum became required.

Stage 47.5 remained source/test-only.

## Browser And Resource Observations

- No browser contexts were opened for implementation before the final verification gate.
- No local dev server was started for this Stage 47.5 repair.
- Final watched-port cleanup found no listeners on `5173`, `5174`, `3000`, or `4173`.

## Blockers And Open Questions

No blockers are currently identified.

Open questions remain deferred:

- Same-account multi-tab/browser session freshness and one-active-session enforcement remain deferred unless future evidence proves a session-lease feature is required.
- Broad mobile shell/top-tab/navigation overhaul and compact/collapsible side dock implementation remain deferred.

## Boundary Confirmation

No mobile Solo keyboard work, broad mobile shell/top-tab/navigation overhaul, compact side dock implementation, migrations, storage schema changes, destructive local cleanup, deployment/configuration, staging, commits, pushes, PRs, merges, releases, branch deletion, backup workflow execution, spectator presence/count/list work, service workers/push work, gameplay-rule changes, Elo changes, secret/private-data/local-artifact exposure, local Codex skill changes, or stable `brrrdle` repository work was performed.

## Next Gate

The next safe action is Phase 47 Stage 47.6 final hardening, visual review, changelog, and manual checklist only after Stage 47.5 verification passes.
