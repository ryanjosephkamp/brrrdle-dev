# Progress Step 440 - Phase 48 Stage 48.4 Custom-Code And Private Game Contract Decision

**Status:** Completed - Awaiting User Review Before Stage 48.5
**Phase:** Phase 48 - Profile And Multiplayer Contract Simplification
**Stage:** Stage 48.4 - Custom-Code And Private Game Contract Decision
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-06T04:00:00Z
**Completed:** 2026-07-06T04:06:10Z

## Authorization

The user authorized Phase 48 Stage 48.4 only: custom-code and private game contract audit, decisioning, and source/test-only cleanup only if proven safe using the completed Stage 48.3 Profile/Settings clarity baseline.

Authorized work includes confirming repository state and stable-repo boundary, preserving the user-updated `planning/phase-47/REVIEW-CHECKLIST.md`, reading Phase 48 planning/spec/implementation materials and Stage 48.1 through 48.3 progress, creating this progress report and the matching 12-column CSV row, auditing custom-code/custom-private game entry points, deciding whether the custom-code match type should be removed, hidden, renamed, or redesigned, making the smallest source/test-only UI/copy/routing cleanup if safe, adding focused tests, and running verification.

This stage does not authorize private Daily/ranked Daily decisioning, Supabase migrations, storage changes, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, backup workflow execution, spectator presence/count/list, service workers/push, gameplay-rule changes, Elo changes, secrets/private-data/local-artifact exposure, local Codex skill changes, or original stable `brrrdle` repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed baseline expectation from Stage 48.3: local and remote `main` at `f3dab778906edc4dad6c8c34365c8354c1affb1f`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved the user-updated `planning/phase-47/REVIEW-CHECKLIST.md`.

## Audit And Decision Summary

Audited the custom-code/custom-private game surfaces:

- `src/multiplayer/customGames.ts` still defines local custom-code lobby creation/normalization.
- `src/multiplayer/competitiveMultiplayer.ts` still preserves custom lobby records in competitive state.
- `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, and scoring/rating guards still preserve `customGameCode` as a legacy unrated multiplayer marker.
- `src/multiplayer/privateMatchmaking.ts` continues to create only fresh unranked Practice private-match games with no Daily, ranked, custom-code, queue, or spectator behavior.
- `src/multiplayer/postgameActions.ts` still keeps legacy custom-code Practice games out of direct rematch.
- `src/multiplayer/MultiplayerPanel.tsx` was the only visible new custom-code creation entry point found in the current app surface.

Decision: Stage 48.4 can remain source/test-only. The custom-code match type does not currently have a strong enough player-facing role to remain visible as a new creation option. The safe cleanup is to hide new custom-code creation while preserving legacy custom-code game readability, unrated classification, parser/storage compatibility, and existing private Practice request behavior.

No addendum is required for this source-only path because it does not remove stored fields, delete custom lobby support, change RPC/RLS/storage contracts, change private Practice request lifecycle, or introduce invitations/inboxes/social systems/new multiplayer tables.

## Implementation Summary

- Hid the visible `Custom code` match-type option from the Multiplayer create form.
- Guarded the hidden custom-code creation branch so accidental legacy/internal `custom` state cannot create a new custom-code lobby.
- Kept legacy custom-code games readable and labelled as unrated.
- Changed legacy custom-code Practice postgame setup from `Set up custom play again` to `Load as unranked setup`, loading the same settings into the supported unranked Practice setup path instead of reopening hidden custom-code creation.
- Preserved private Practice requests as the supported private-match path.

## Files Changed In This Stage

- `src/multiplayer/MultiplayerPanel.tsx` - hides new custom-code creation, guards legacy/internal custom state, and maps legacy custom-code postgame setup to unranked Practice setup.
- `src/multiplayer/MultiplayerPanel.test.tsx` - asserts the custom-code creation option is hidden and legacy custom-code postgame setup uses the unranked setup copy.
- `progress/PROGRESS-STEP-440.md` - records this Stage 48.4 decision and source/test cleanup.
- `progress/PROGRESS.csv` - appended the matching 12-column progress row.

Existing uncommitted Phase 48 planning/spec/progress artifacts, Stage 48.0A source/test changes, and Stage 48.3 source/test changes remain present and were not reverted.

## Focused Verification

Passed:

- `npm test -- src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/customGames.test.ts src/multiplayer/privateMatchmaking.test.ts src/multiplayer/postgameActions.test.ts src/account/publicProfilePrivateMatch.test.ts`: 5 files, 52 tests.

## Final Verification

Passed:

- `npm run lint`
- `npm run test`: 125 files, 863 tests.
- `npm run build`: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`: `rows=442 columns=[12] last_id=440`
- non-printing changed/untracked file credential-value scan: `scanned_files=25 credential_value_hits=0 binary_skipped=0`
- ignored-artifact check: `tracked_files=1132 staged_files=0 forbidden_artifact_hits=0`
- watched-port cleanup check: `5173`, `5174`, `3000`, and `4173` clear
- `git status --short --branch`

## Addendum Status

No custom-code/private game contract addendum is currently required. A later addendum remains required before removing stored `customGameCode` support, deleting custom lobby persistence, changing private Practice request lifecycle, adding invitations/inboxes/social systems, adding new multiplayer tables, changing RLS/RPC grants, changing gameplay rules, or changing Elo math.

## Blockers And Open Questions

- No blockers found.
- Stage 48.5 remains the next planned gate for private Daily and ranked Daily contract decisioning. That work was not started in this stage.

## Boundary Confirmation

This stage stayed source/test-only for custom-code/private game cleanup. It did not modify migrations, Supabase configuration, Vercel configuration, deployment state, Git/GitHub state, private Daily/ranked Daily contracts, private Practice request lifecycle, gameplay rules, Elo math, or the original stable `brrrdle` repository.

The implementation preserves existing private Practice request behavior, Phase 40 public profile/private matchmaking boundaries, Phase 48 Profile/Settings clarity, Phase 47 repairs, Phase 46 sync/freshness protections, Daily claim safety, gameplay rules, and Elo math.
