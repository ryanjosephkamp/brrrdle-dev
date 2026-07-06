# Progress Step 436 - Phase 48 Stage 48.0A Mobile Auto-Scroll Lag Repair

**Status:** Completed - Awaiting User Review Before Next Phase 48 Gate
**Phase:** Phase 48 - Profile And Multiplayer Contract Simplification
**Stage:** Stage 48.0A - Narrow Mobile Auto-Scroll Lag Audit And Repair
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-06T03:12:55Z
**Completed:** 2026-07-06T03:18:34Z

## Authorization

The user authorized a narrow Phase 48 Stage 48.0A only: source/test-only mobile Solo auto-scroll lag audit and tiny repair using the completed Stage 48.0 baseline and classification.

Authorized work includes confirming repository state and stable-repo boundary, preserving the user-updated `planning/phase-47/REVIEW-CHECKLIST.md`, reading Phase 48 planning/spec/implementation materials and `progress/PROGRESS-STEP-435.md`, auditing the current mobile Solo auto-center timing enough to identify the smallest lag-reducing change, implementing a tiny source/test-only repair if safe, updating focused tests, creating this progress report and the matching 12-column CSV row, and running focused and standard verification.

This stage does not authorize Phase 48 Stage 48.1 profile audit work, broad mobile shell/top-tab/navigation overhaul, compact side-dock implementation, broad mobile performance overhaul, source changes outside the mobile Solo auto-scroll path, Supabase/storage changes, session leases, migrations, deployment/configuration, Git/GitHub operations, backup workflow execution, spectator presence/count/list, service workers/push, gameplay-rule changes, Elo changes, secrets/private-data/local-artifact exposure, local Codex skill changes, or original stable `brrrdle` repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed branch: `main`.
- Confirmed `HEAD`: `f3dab778906edc4dad6c8c34365c8354c1affb1f`.
- Confirmed `origin/main`: `f3dab778906edc4dad6c8c34365c8354c1affb1f`.
- Confirmed remote: `https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved the user-updated `planning/phase-47/REVIEW-CHECKLIST.md`.

## Audit Findings

Stage 48.0 classified the late Phase 47 real-mobile scroll lag as a narrow source-only auto-scroll regression candidate.

The focused audit confirmed the bounded likely cause:

- Mobile Solo keyboard auto-centering used `scrollIntoView({ block: 'end', behavior: 'smooth' })`.
- The same mobile keyboard target then scheduled three delayed bottom-clearance correction passes at 90ms, 240ms, and 420ms.
- Those delayed corrections use immediate `scrollBy({ behavior: 'auto' })` to preserve Phase 47 keyboard bottom clearance.
- On real mobile, the smooth initial scroll plus later immediate correction passes can feel like lag or delayed after-movement even when final keyboard visibility is correct.

No evidence required broad mobile shell/top-tab/navigation overhaul, compact side-dock work, broad mobile performance work, storage/Supabase changes, session leases, gameplay-rule changes, or Elo changes.

## Implementation

Implemented the smallest source/test-only repair:

- Mobile Solo keyboard auto-centering now uses immediate `behavior: 'auto'` for the initial `scrollIntoView`.
- Non-mobile Solo keyboard auto-centering still uses smooth scrolling unless reduced motion is preferred.
- Non-keyboard gameplay auto-centering behavior remains unchanged.
- Existing delayed mobile keyboard bottom-clearance corrections remain in place to preserve Phase 47 keyboard visibility wins.

## Files Changed In This Stage

- `src/app/gameplayAutoCenter.ts` - uses immediate scroll behavior for mobile Solo keyboard auto-centering to avoid smooth-scroll plus delayed-correction lag.
- `src/app/gameplayAutoCenter.test.ts` - updates mobile Solo keyboard expectations and adds a larger-screen regression guard.
- `progress/PROGRESS-STEP-436.md` - records this Stage 48.0A audit, repair, and verification.
- `progress/PROGRESS.csv` - appended the matching 12-column progress row.

Existing uncommitted Phase 48 planning/spec/progress artifacts from prior authorized gates remain present and unchanged except for this new progress entry.

## Verification

Passed:

- Focused Vitest: `npm test -- src/app/gameplayAutoCenter.test.ts src/app/games/soloGameplayAutoCenter.test.ts` reported 2 files and 18 tests passed.
- Focused Playwright mobile layout: `npx playwright test e2e/layout/mobile-scroll.spec.ts` reported 17/17 passed, including Daily GO pre-guess, Practice GO new-chain, Daily GO re-entry, Practice GO re-entry, and OG visibility checks.
- `npm run lint`
- `npm run test`: 125 files and 863 tests passed.
- `npm run build`: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`: `rows=438 columns=[12] last_id=436`
- non-printing changed/untracked file credential-value scan: `scanned_files=15 credential_value_hits=0 binary_skipped=0`
- ignored-artifact check: `tracked_files=1132 staged_files=0 forbidden_artifact_hits=0`
- watched-port cleanup check: `5173`, `5174`, `3000`, and `4173` clear
- `git status --short --branch`

## Resource And Artifact Notes

- The focused Playwright run used the configured local web server and completed cleanly.
- Watched ports `5173`, `5174`, `3000`, and `4173` were clear after verification.
- Build output remains ignored and was not staged.
- No migrations, deployments, configuration changes, commits, pushes, PRs, merges, backup workflow execution, or branch cleanup were performed.

## Boundary Confirmation

This stage stayed source/test-only and limited to mobile Solo auto-scroll behavior. It preserved Phase 47 mobile Solo GO keyboard bottom-clearance behavior, Phase 47 guest/account display-boundary repairs, Phase 46 Solo sync/freshness behavior, Phase 45 Solo account boundaries, Phase 44 account-scoped repairs, Phase 43 ranked fairness, Daily claim safety, gameplay rules, and Elo math.

## Next Gate

The next safe gate is Phase 48 Stage 48.1 profile, public profile, and account-management audit only. Do not begin implementation beyond the authorized Stage 48.1 read-only audit without a separate user prompt.
