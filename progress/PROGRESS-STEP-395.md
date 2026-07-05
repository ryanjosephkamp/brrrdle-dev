# Progress Step 395 - Phase 44 Stage 44.1 Account And Guest State Boundary Audit

**Status:** Completed - Awaiting User Review Before Stage 44.2
**Phase:** Phase 44 - Account-Scoped Local State And Manual Review Follow-Up
**Stage:** Stage 44.1 - Account And Guest State Boundary Audit
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-04T23:03:57Z
**Completed:** 2026-07-04T23:05:22Z

## Authorization

The user authorized Phase 44 Stage 44.1 only: a read-only account and guest state boundary audit using the completed Stage 44.0 protected baseline.

No source/runtime implementation, test implementation, Supabase migration creation or execution, storage schema change, destructive local cleanup, deployment/configuration, Git/GitHub operation, backup workflow execution, spectator presence/count/list implementation, service worker or push infrastructure work, gameplay-rule change, Elo change, secret/private-data/local-artifact exposure, local Codex skill change, or original stable `brrrdle` repository work was authorized or performed.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Stable repository boundary: preserved; no original stable `brrrdle` repository path was used.
- Local `HEAD`: `173a82951927d134ae4f60e0250444a41916cab5`.
- `origin/main`: `173a82951927d134ae4f60e0250444a41916cab5`.
- Preserved user-updated checklist: `planning/phase-43/REVIEW-CHECKLIST.md`.

## Files Changed

- Created `progress/PROGRESS-STEP-395.md`.
- Updated `progress/PROGRESS.csv`.

No product source, tests, migrations, configuration, deployment files, visual artifacts, secrets, or local session artifacts were changed.

## Audit Method

The audit used source and test inspection only. Browser reproduction was not run because the Phase 43 manual-review evidence plus the source paths were sufficient to classify the account/guest state boundary issue without using credentials, private row data, or local session artifacts.

Read-only surfaces inspected included:

- `src/account/guestStorage.ts`
- `src/account/storageSchema.ts`
- `src/account/guestTransfer.ts`
- `src/account/sync.ts`
- `src/account/practiceSeeds.ts`
- `src/account/Settings.tsx`
- `src/app/App.tsx`
- `src/dashboard/dashboardViewModels.ts`
- `src/history/HistoryWorkspace.tsx`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/multiplayer/multiplayerRepository.ts`
- Relevant account, sync, practice seed, dashboard, history, leaderboard, settings, and multiplayer repository tests.

## Findings

| Surface | Classification | Evidence | Likely Root Cause |
| --- | --- | --- | --- |
| Signed-in Practice Solo OG/GO visible after sign-out | Classified from source | Practice resume slots live in the shared `guestProgress.resumeSlots`; `handleSignOut` clears auth/profile UI but does not reload or reset progress state. | Unscoped local progress plus incomplete sign-out rehydration. |
| Guest Practice Solo OG/GO overwriting signed-in progress after sign-in | Classified from source | `syncGuestProgress` uploads or merges the current local progress payload into the authenticated cloud record; `mergeGuestProgressIntoCloud` merges resume slots, history, stats, settings, multiplayer, competitive state, and practice seed counters. | Broad guest-to-account sync merge without an explicit transfer boundary. |
| Guest Daily Solo OG/GO carrying into signed-in account state | Classified from source | Daily completions, unlocked Dailies, history, stats, resume slots, and progression share the same progress payload and merge path. | Shared progress payload and broad cloud/local merge. |
| History visible after sign-out | Classified from source | `HistoryWorkspace` receives `guestProgress.history` and `guestProgress.competitiveMultiplayer`; sign-out does not rehydrate a guest-safe payload. | Shared history state remains mounted after auth state changes. |
| Leaderboard/rating summaries visible after sign-out | Classified from source | `LeaderboardPanel` receives `guestProgress.competitiveMultiplayer`; the shared progress payload can keep authenticated competitive summaries after sign-out. | Competitive/rating state is stored in unscoped local progress. |
| Active Multiplayer projections visible after sign-out | Classified from source | `multiplayer` is stored in `guestProgress.multiplayer` and the separate unscoped `brrrdle:async-multiplayer:v1` key; sign-out does not reset either state. | Shared multiplayer cache plus unscoped local multiplayer storage. |
| Settings carryover between signed-in and guest states | Classified from source | Settings live in `guestProgress.settings`; merge preference can select settings from whichever side has more history. | Settings are not identity-scoped and are part of the broad sync payload. |
| Stats signed-out behavior | Classified from source | `StatsDashboard` receives `guestProgress.stats`, `guestProgress.progression`, and `guestProgress.history`; stats merge by max/combined values. | Local stats are not identity-scoped and remain active after sign-out. |
| Route/navigation/cache amplification | Classified from source | Navigation state and selected game IDs are independent of identity and can continue pointing at account-derived slots or cached games after sign-out. | Route state is not the primary cause, but can expose stale identity-derived state. |

## Root Cause Summary

The reported account/guest state bleed is best explained by one bounded architecture issue:

1. The browser stores a single `brrrdle:guest-progress:v1` progress payload for guest and authenticated sessions.
2. That payload includes resume slots, completed IDs, history, progression, settings, stats, multiplayer state, competitive/rating summaries, Daily unlocks, and Practice seed counters.
3. Account sync treats the current local payload as input to the authenticated cloud record and merges broadly through `mergeGuestProgressIntoCloud`.
4. Sign-out clears auth/profile UI, but does not switch the app back to a clean guest-safe progress snapshot or clear account-derived multiplayer/competitive/route selections.
5. A separate unscoped async multiplayer local-storage key can preserve account-derived multiplayer projections outside the main progress payload.

## Stage 44.2 Path Decision

Stage 44.2 can proceed as a source/test-only repair first.

No storage-contract addendum is required before Stage 44.2 if the repair stays within existing source behavior and uses non-destructive identity-aware hydration, sign-out cleanup, and sync-boundary guards.

Stage 44.2 must stop and route to a storage-contract addendum if implementation requires any of the following:

- Local storage key migration or schema-version change.
- Destructive local cleanup of existing user progress.
- Changed cloud progress payload contract.
- Changed guest-to-account transfer semantics beyond a narrow explicit reviewed boundary.
- Supabase migration, RLS change, or remote data contract change.

Recommended Stage 44.2 focus:

- Introduce an identity-aware active progress selection/hydration seam in the app/account storage layer.
- Ensure sign-out restores guest-safe state and clears account-derived resume slots, history, settings, stats, multiplayer, competitive/rating summaries, and selected game IDs where needed.
- Prevent guest progress from silently uploading or merging into an authenticated account without an explicit reviewed transfer path.
- Preserve ordinary guest local play and authenticated account sync.
- Add focused tests for sign-out/sign-in boundaries across Practice Solo OG/GO, Daily Solo OG/GO, History, Settings, Stats, Leaderboard/rating summaries, Active Multiplayer, and sync behavior.

## Verification

Passed:

- `git diff --check`
- Progress CSV shape check: `rows=397 columns=[12] last_id=395`
- Non-printing changed/untracked file credential scan: `scanned_files=14 credential_pattern_hits=0`
- Ignored-artifact check: `tracked_files=1058 staged_files=0 forbidden_artifact_hits=0`
- Watched-port cleanup check: `watched_ports_clear=5173,5174,3000,4173`
- `git status --short --branch`

## Boundaries Preserved

- Phase 43 ranked queue fairness migration behavior remains untouched.
- Phase 42 stats/dashboard/help contracts remain untouched.
- Phase 41 multiplayer reliability repairs remain untouched.
- Phase 40 public profile/private matchmaking boundaries remain untouched.
- Phase 39 mobile scroll smoothness remains untouched.
- Phase 38 public/guest spectator boundaries remain untouched.
- Daily claim safety, gameplay rules, and Elo math remain untouched.

## Next Gate

If approved, proceed to Phase 44 Stage 44.2 account-scoped local state repair as a source/test-only stage with the storage-contract stop conditions above.
