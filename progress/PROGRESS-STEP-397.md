# Progress Step 397 - Phase 44 Stage 44.3 Boundary Regression, Private Request Eligibility, And Ranked Queue Classification

**Status:** Completed - Awaiting User Review Before Stage 44.4
**Phase:** Phase 44 - Account-Scoped Local State And Manual Review Follow-Up
**Stage:** Stage 44.3 - Boundary Regression, Private Request Eligibility, And Ranked Queue Classification
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-04T23:31:00Z
**Completed:** 2026-07-04T23:46:00Z

## Authorization

The user authorized Phase 44 Stage 44.3 only: focused boundary regression, private Practice request eligibility follow-up, and ranked Practice queue classification using the completed Stage 44.2 account-scoped local state repair baseline.

No Supabase migration creation or execution, storage-contract change, destructive local cleanup, deployment/configuration, Git/GitHub operation, backup workflow execution, spectator presence/count/list implementation, service worker or push infrastructure work, gameplay-rule change, Elo change, secret/private-data/local-artifact exposure, local Codex skill change, or original stable `brrrdle` repository work was authorized or performed.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Stable repository boundary: preserved; no original stable `brrrdle` repository path was used.
- Local `HEAD`: `173a82951927d134ae4f60e0250444a41916cab5`.
- `origin/main`: `173a82951927d134ae4f60e0250444a41916cab5`.
- Preserved user-updated checklist: `planning/phase-43/REVIEW-CHECKLIST.md`.

## Files Changed

- Updated `src/account/PublicProfilePage.tsx`.
- Added `src/account/publicProfilePrivateMatch.ts`.
- Added `src/account/publicProfilePrivateMatch.test.ts`.
- Updated `src/account/accountScopedProgress.test.ts`.
- Added `src/multiplayer/rankedQueueFairnessContract.test.ts`.
- Created `progress/PROGRESS-STEP-397.md`.
- Updated `progress/PROGRESS.csv`.

The existing uncommitted Phase 44 planning/spec/progress artifacts and the user-updated `planning/phase-43/REVIEW-CHECKLIST.md` were preserved.

## Boundary Regression Coverage

Stage 44.3 expanded account-scoped progress coverage around the Stage 44.2 repair:

- Account hydration with no cloud state now has explicit assertions for empty resume slots, history, completed IDs, multiplayer games, custom games, rating profiles, rating transactions, competitive results, default settings, and default stats.
- Guest-to-account silent transfer remains blocked by the existing scoped sync guards.
- Authenticated account progress remains out of the guest local-storage payload.

## Private Practice Request Eligibility Follow-Up

The private Practice request audit confirmed that the Supabase contract requires an active public requester profile and an active public target profile, not an established ranked Elo.

Implemented source/test behavior:

- Added a narrow private-match public-profile eligibility helper.
- Public profile private Practice requests now preflight the signed-in requester's own profile when the public-profile repository exposes `loadMine()`.
- Missing, private, hidden, suspended, or unnamed requester profiles show a clear active-public-profile message before sending the request.
- The prior RPC rejection message for requester profile eligibility is normalized to: `Private Practice requests require your account to have an active public profile with a display name. Ranked Elo is not required.`
- Active public requester profiles remain eligible without rating metadata.
- Public target profile payloads remain sanitized and public-profile-id based; raw auth IDs, email, tokens, sessions, queue internals, rating internals, and `playerUserIds` remain hidden.

## Ranked Queue Classification

The ranked Practice third-player fairness behavior was classified from the applied Phase 43 fairness migration and focused contract coverage:

- `claim_ranked_async_matchmaking_pair(text, text)` keeps its browser-facing signature and response shape.
- Ranked Practice compatibility filters still require same mode, rating bucket, Hard Mode, word length, supported time control, rating band, queued status, and authenticated ownership.
- The fairness ordering prefers a compatible non-recent opponent before rating-distance and queue-age sorting.
- A recent rematch remains allowed when it is the only compatible queued option.
- The recent-opponent helper derives Hard Mode and time control from trusted stored game projection fields and remains internal with browser execution revoked.
- No source/UI change, migration, RLS change, gameplay-rule change, or Elo change was required for this classification.

## Verification

Passed:

- Focused Vitest: `npx vitest run src/account/publicProfilePrivateMatch.test.ts src/account/PublicProfilePage.test.tsx src/account/accountScopedProgress.test.ts src/multiplayer/privateMatchmaking.test.ts src/multiplayer/multiplayerRepository.test.ts src/multiplayer/rankedQueueFairnessContract.test.ts`
  - `6` files passed.
  - `59` tests passed.
- `npm run lint`
- `npm run test`
  - `120` files passed.
  - `823` tests passed.
- `npm run build`
  - Passed with the existing Vite large-chunk advisory after repairing the new ranked migration contract test to avoid Node-only filesystem imports in the app build typecheck.
- `npx tsc -p tsconfig.api.json --noEmit`

Final hygiene checks:

- `git diff --check`
- Progress CSV shape check: `rows=399 columns=[12] last_id=397`
- Non-printing changed/untracked file credential scan: `scanned_files=28 credential_pattern_hits=0 forbidden_artifact_path_hits=0`
- Ignored-artifact check: `tracked_files=1058 staged_files=0 forbidden_artifact_hits=0`
- Watched-port cleanup check: `5173`, `5174`, `3000`, and `4173` clear
- `git status --short --branch`

## Addendum Decision

No storage-contract, Supabase/RLS, migration, destructive cleanup, gameplay-rule, or Elo addendum is required for Stage 44.3.

The private Practice request issue was source/test-only: clarify and enforce active-public-profile requester eligibility in browser source, while confirming ranked Elo is not part of the unranked private Practice request contract.

The ranked Practice third-player fairness follow-up was classification-only for this stage: the Phase 43 migration already preserves the intended non-recent-opponent preference and rematch fallback.

## Next Gate

If approved, proceed to Phase 44 Stage 44.4 small manual-review UI follow-ups only.
