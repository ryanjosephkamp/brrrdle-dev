# Progress Step 287: Phase 35 Stage 35.4 Ranked Live Identity Source Repair

**Date:** 2026-06-27
**Phase:** Phase 35 - Auth, Profile, Deployment, And Live Identity Readiness
**Stage:** Stage 35.4 - Ranked Live Identity Source Repair
**Status:** Completed - Awaiting User Review Before Stage 35.5 Auth/Deployment Redirect Audit

## Authorization

The user authorized Phase 35 Stage 35.4 only: ranked Live identity source repair using the completed Stage 35.3 migration/RLS baseline. The pass includes reading governance, Phase 35 planning/spec/implementation materials, Stage 35.3 progress, Live identity source surfaces, participant identity RPC integration, authenticated spectator RPC parsing/view-model surfaces, relevant tests, creating this progress report and matching CSV row, implementing source-only Live identity repair, adding focused tests, and running verification.

The prompt does not authorize additional Supabase migrations, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, auth/deployment/Profile tab work, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- `origin/main`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- Existing user edits to `planning/phase-34/REVIEW-CHECKLIST.md`: preserved.

## Implementation Summary

- Added a safe `participantIdentitySummariesToProfileMap` helper that converts Phase 32 participant identity summaries into `MultiplayerProfileSummary` values without carrying public profile ids, viewer flags, flair keys, raw auth ids, emails, or private fields into Live view models.
- Extended Live row projection so participant rows can merge per-game safe participant profile overrides before falling back to durable game projection labels or generic labels.
- Updated participant turn labels so safe opponent names are used when available; `You` remains only the viewer's own participant context and `Rival` remains a fallback only when safe identity is unavailable.
- Updated `MultiplayerWorkspace` to fetch safe participant identity summaries for the signed-in viewer's visible playing participant games through the existing participant identity RPC action.
- Passed the existing participant identity repository action from `App` into the Multiplayer workspace.
- Preserved the Stage 35.3 spectator RPC payload path; signed-in spectator rows continue to prefer `players[].profile.displayName` from the authenticated spectator RPC and fall back to generic labels only when safe profile data is unavailable.

## Files Changed In This Stage

- `src/app/App.tsx`: passes existing participant identity repository actions into the Multiplayer workspace.
- `src/multiplayer/MultiplayerWorkspace.tsx`: fetches safe participant identity summaries for visible participant Live games and caches per-game display profile maps.
- `src/multiplayer/multiplayerViewModels.ts`: adds safe participant profile-map conversion and Live participant label hydration.
- `src/multiplayer/multiplayerViewModels.test.ts`: adds focused ranked participant/spectator safe-name and privacy-shape tests.
- `progress/PROGRESS-STEP-287.md`: records this stage.
- `progress/PROGRESS.csv`: appends the matching progress ledger row.

## Focused Tests

Passed:

- `npm run test -- src/multiplayer/multiplayerViewModels.test.ts src/multiplayer/MultiplayerLive.test.tsx src/multiplayer/MultiplayerWorkspace.test.tsx src/multiplayer/multiplayerRepository.test.ts src/multiplayer/MultiplayerPanel.test.tsx`
- Result: 5 files, 84 tests passed.

Focused coverage added for:

- ranked joined-player participant Live rows hydrating the creator's safe name from participant identity summaries;
- ranked creator participant Live rows retaining the joined player's safe name;
- participant identity summary maps omitting raw/profile-management metadata from Live display profile maps;
- ranked signed-in spectator rows preferring Stage 35.3 profile payload names;
- fallback behavior when safe profile names are unavailable.

## Full Verification

Passed:

- `npm run lint`
- `npm run test`
  - Result: 105 files, 719 tests passed.
- `npm run build`
  - Passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Python CSV shape check using `python3 -S`
  - Result: `rows=289 columns=[12] last_id=287`.
- non-printing secret/artifact scan
  - Result: `scanned_files=23 credential_pattern_hits=0 changed_artifacts=0`.
- ignored-artifact check
  - Result: `tracked_forbidden=0 staged_forbidden=0 staged_files=0 allowed_tracked_env_templates=1`.
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
  - Result: clear.
- `git status --short --branch`

## Boundaries Preserved

No additional migrations, Vercel/Supabase configuration changes, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, auth/deployment/Profile tab work, or original stable repository work was performed.

## Next Step

Review Stage 35.4 source repair evidence. If approved, explicitly authorize Stage 35.5 Vercel/Supabase auth redirect audit before auth copy/account management work, Profile tab work, Vercel/Supabase configuration changes, deployment, Git/GitHub operations, backup workflow execution, or original stable repository work.
