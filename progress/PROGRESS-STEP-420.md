# Progress Step 420 - Phase 46 Stage 46.5

**Status:** Completed - Awaiting User Review Before Stage 46.6
**Phase:** Phase 46 - Solo Sync Integrity and Manual Review Follow-Up
**Stage:** Stage 46.5 - Mobile Solo Pre-Guess Keyboard Visibility Follow-Up
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-05T19:43:00Z
**Completed:** 2026-07-05T19:52:11Z

## Authorization

The user authorized Phase 46 Stage 46.5 only: source/test-only mobile Solo pre-guess keyboard visibility follow-up using the completed Stage 46.4 Solo Overview Select button cleanup baseline.

Authorized work included confirming repository state, preserving the user-updated Phase 45 review checklist, reading Phase 46 planning/spec/implementation materials and Stage 46.1 through Stage 46.4 progress, creating this progress report and matching CSV row, auditing and reproducing or characterizing the mobile Solo Daily/Practice pre-guess keyboard cut-off, applying the smallest visual/layout/scroll repair needed to keep the keyboard visible and usable before the first valid guess on mobile, adding focused tests or mobile browser checks where practical, and running verification.

This pass did not authorize broad mobile shell or top-tab/navigation overhaul, Supabase migrations, storage schema changes, destructive local cleanup, deployment/configuration, Git/GitHub actions, backup workflow execution, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, Elo changes, secret/private data exposure, local session artifact exposure, or original stable repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed repository basename: `brrrdle-dev`.
- Confirmed branch: `main`.
- Confirmed `HEAD`: `aef8dba063e57cd5381852a66b9a0006fe52bf39`.
- Confirmed `origin/main`: `aef8dba063e57cd5381852a66b9a0006fe52bf39`.
- Confirmed remote: `https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved `planning/phase-45/REVIEW-CHECKLIST.md`.

## Audit Summary

The mobile pre-guess keyboard issue was traced to scroll timing and target selection:

- Route/subtab navigation requested the general Solo gameplay target.
- The dedicated Solo keyboard target only auto-centered after the submitted-guess count increased.
- Fresh Daily/Practice Solo games therefore never requested the keyboard-specific mobile alignment before the first valid guess.
- Existing Phase 45.6 sizing and post-guess ordering were already present, so a broad mobile density or shell change was not needed.

## Implementation Summary

- Added a mobile-only fresh Solo keyboard auto-center path for playable games with zero submitted guesses.
- Kept the existing post-guess keyboard auto-center behavior intact for valid submitted guesses.
- Added a `mobileOnly` scheduling option to gameplay auto-center so the fresh pre-guess path does not affect desktop.
- Reused the existing Solo keyboard target and mobile `block: end` alignment.
- Increased the mobile keyboard target bottom scroll margin so the keyboard clears bottom browser chrome and safe-area space more reliably.
- Wired the fresh pre-guess alignment into both OG and GO Solo sessions.

## Boundary Preservation

- Stage 46.3 signed-in Solo sync/freshness behavior remains unchanged.
- Stage 46.4 Solo Overview Select cleanup remains unchanged.
- Phase 45 Daily/Practice Solo account-boundary protections remain unchanged.
- Phase 44 account-scoped repairs remain unchanged.
- Phase 43 ranked fairness behavior remains unchanged.
- Phase 42 stats/dashboard/help contracts remain unchanged.
- Daily claim safety, gameplay rules, scoring, and Elo math were not changed.
- No broad mobile shell, top-tab, route navigation, or layout overhaul was introduced.

## Tests Added Or Updated

- `src/app/gameplayAutoCenter.test.ts` - added mobile-only scheduling coverage and mobile viewport helper coverage.
- `src/app/games/soloGameplayAutoCenter.test.ts` - added fresh pre-guess Solo keyboard alignment guard coverage.
- `e2e/layout/mobile-scroll.spec.ts` - added mobile browser checks for pre-guess Practice OG and Daily GO keyboard visibility while preserving the existing post-guess context/keyboard check.

## Verification

Passed Stage 46.5 verification:

- Focused Vitest: `npm run test -- src/app/gameplayAutoCenter.test.ts src/app/games/soloGameplayAutoCenter.test.ts src/app/games/soloHardModeDefaults.test.tsx` reported 3 files and 27 tests passed.
- Focused Playwright: `npx playwright test e2e/layout/mobile-scroll.spec.ts --project=chromium --grep "Solo Practice OG keeps the keyboard visible before|Solo Daily GO keeps the keyboard visible before|Solo Practice OG keeps submitted-row context"` reported 3 tests passed.
- `npm run lint`
- `npm run test` reported 125 files and 851 tests passed.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Progress CSV shape check using `python3 -S`: `rows=422 columns=[12] last_id=420`
- Non-printing changed/untracked file credential-value scan: `scanned_files=33 credential_value_hits=0 binary_skipped=0`
- Ignored-artifact check: `tracked_files=1100 staged_files=0 forbidden_artifact_hits=0`
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear.
- `git status --short --branch`

## Files Changed By This Stage

- `e2e/layout/mobile-scroll.spec.ts` - added focused mobile pre-guess keyboard visibility checks.
- `src/app/gameplayAutoCenter.ts` - added mobile viewport detection and mobile-only scheduling support.
- `src/app/gameplayAutoCenter.test.ts` - added focused coverage for mobile-only scheduling.
- `src/app/games/GoGame.tsx` - scheduled fresh mobile pre-guess keyboard alignment for playable GO Solo sessions.
- `src/app/games/OgGame.tsx` - scheduled fresh mobile pre-guess keyboard alignment for playable OG Solo sessions.
- `src/app/games/soloGameplayAutoCenter.ts` - added fresh pre-guess Solo keyboard alignment helpers.
- `src/app/games/soloGameplayAutoCenter.test.ts` - added focused helper coverage.
- `src/index.css` - increased mobile Solo keyboard scroll margin at the bottom edge.
- `progress/PROGRESS-STEP-420.md` - created this Stage 46.5 progress report.
- `progress/PROGRESS.csv` - appended the matching 12-column progress row for ID 420.

## Browser and Resource Notes

Focused Playwright mobile checks used the existing local web server harness and passed for pre-guess Practice OG, pre-guess Daily GO, and post-guess Practice OG context/keyboard visibility. No local auth/session artifacts were exposed.

## Blockers and Open Questions

No blockers.

Open question for later phases: this repair improves pre-guess keyboard visibility inside the current mobile shell, but it intentionally does not address the separately deferred broad mobile shell/top-tab/navigation overhaul.

## Boundary Confirmation

No broad mobile shell work, migrations, storage schema changes, destructive local cleanup, deployment/configuration, staging, commits, pushes, PRs, merges, backup workflow execution, spectator presence/count/list work, service worker/push work, gameplay-rule changes, Elo changes, secret/private data exposure, local session artifact exposure, or stable `brrrdle` repository work was performed.

## Next Gate

The next safe action is Phase 46 Stage 46.6 final hardening, visual review, changelog, and manual checklist.
