# Progress Step 396 - Phase 44 Stage 44.2 Account-Scoped Local State Repair

**Status:** Completed - Awaiting User Review Before Stage 44.3
**Phase:** Phase 44 - Account-Scoped Local State And Manual Review Follow-Up
**Stage:** Stage 44.2 - Account-Scoped Local State Repair
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-04T23:07:00Z
**Completed:** 2026-07-04T23:22:32Z

## Authorization

The user authorized Phase 44 Stage 44.2 only: source/test-only account-scoped local state repair using the completed Stage 44.1 account and guest state boundary audit baseline.

No Supabase migration creation or execution, storage schema change, local storage key migration, destructive local cleanup, deployment/configuration, Git/GitHub operation, backup workflow execution, spectator presence/count/list implementation, service worker or push infrastructure work, gameplay-rule change, Elo change, secret/private-data/local-artifact exposure, local Codex skill change, or original stable `brrrdle` repository work was authorized or performed.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Stable repository boundary: preserved; no original stable `brrrdle` repository path was used.
- Local `HEAD`: `173a82951927d134ae4f60e0250444a41916cab5`.
- `origin/main`: `173a82951927d134ae4f60e0250444a41916cab5`.
- Preserved user-updated checklist: `planning/phase-43/REVIEW-CHECKLIST.md`.

## Files Changed

- Added `src/account/accountScopedProgress.ts`.
- Added `src/account/accountScopedProgress.test.ts`.
- Updated `src/account/index.ts`.
- Updated `src/account/sync.ts`.
- Updated `src/account/syncStatus.ts`.
- Updated `src/account/Settings.tsx`.
- Updated `src/account/Settings.test.tsx`.
- Updated `src/app/App.tsx`.
- Created `progress/PROGRESS-STEP-396.md`.
- Updated `progress/PROGRESS.csv`.

The existing uncommitted Phase 44 planning/spec/progress artifacts and the user-updated `planning/phase-43/REVIEW-CHECKLIST.md` were preserved.

## Repair Summary

Stage 44.2 added an account-scoped progress ownership seam and routed the app's local persistence through that seam.

Implemented behavior:

- Auth state now maps to an active progress scope: guest, authenticated account, or unconfigured.
- Guest and unconfigured scopes may persist to the existing guest local-storage payload.
- Authenticated account progress is kept out of guest local storage.
- Sign-in loads the signed-in account's cloud progress through `loadAuthenticatedProgressForScope()` and does not upload guest progress as part of auth hydration.
- If no cloud progress exists for a signed-in account, the app starts from a fresh default account progress snapshot instead of silently adopting guest progress.
- Sign-out rehydrates guest-safe local progress, clears identity-scoped selected solo/multiplayer/live selections, and closes account-derived profile/auth surfaces.
- Explicit Sync now runs only when the active progress scope belongs to the signed-in account.
- Multiplayer snapshot persistence, trusted ranked settlement persistence, resume capture, settings updates, Daily unlocks, practice seed advancement, timed multiplayer expiry, game completion, coin spending, and reset progress now respect the active progress scope.
- Supabase progress download now normalizes cloud payloads through the existing guest-progress migration parser.
- Settings and sync-status copy now describe scoped account/guest persistence rather than automatic guest transfer.

## Boundaries And Residual Notes

- No storage schema version changed.
- No local storage key migration was created.
- No destructive cleanup of pre-existing local browser payloads was performed.
- No Supabase migration, RLS change, or remote data contract change was performed.
- No guest-to-account transfer UI or merge flow was added.
- Pre-existing local guest payloads that were already contaminated before this repair were not destructively cleaned; the repair prevents newly hydrated authenticated account progress from continuing to write into the guest payload.

## Verification

Passed:

- Focused Vitest: `npx vitest run src/account/accountScopedProgress.test.ts src/account/sync.test.ts src/account/Settings.test.tsx src/multiplayer/multiplayerRepository.test.ts src/stats/StatsDashboard.test.tsx src/leaderboards/LeaderboardPanel.test.tsx`
  - `6` files passed.
  - `59` tests passed.
- `npm run lint`
- `npm run test`
  - `118` files passed.
  - `816` tests passed.
- `npm run build`
  - Passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`

Final hygiene checks:

- `git diff --check`
- Progress CSV shape check: `rows=398 columns=[12] last_id=396`
- Non-printing changed/untracked file credential scan: `scanned_files=23 credential_pattern_hits=0`
- Ignored-artifact check: `tracked_files=1058 staged_files=0 forbidden_artifact_hits=0`
- Watched-port cleanup check: `5173`, `5174`, `3000`, and `4173` clear
- `git status --short --branch`

## Next Gate

If approved, proceed to Phase 44 Stage 44.3 boundary regression, private request eligibility, and ranked queue classification only.
