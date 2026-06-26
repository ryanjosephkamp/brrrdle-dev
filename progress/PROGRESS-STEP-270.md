# Progress Step 270: Phase 33 Stage 33.7 Final Hardening And Two-Client E2E

**Date:** 2026-06-26
**Phase:** Phase 33 - Competitive Ladder v2 Readiness
**Stage:** 33.7 - Final Hardening And Two-Client E2E
**Status:** Completed - Awaiting User Review Before Phase 33 Git Handoff Preparation

## Authorization

The user authorized Phase 33 Stage 33.7 only: final hardening, real two-client E2E/regression verification, visual handoff review, manual review checklist, and Phase 33 completion documentation.

The prompt did not authorize additional migrations, deployment, Vercel or Supabase configuration, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- `origin/main`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- Existing uncommitted Phase 33 planning/spec/progress artifacts plus Stage 33.3 through Stage 33.6 implementation artifacts were preserved.

## Work Completed

Created:

- `planning/phase-33/CHANGELOG.md`
- `planning/phase-33/REVIEW-CHECKLIST.md`
- `progress/PROGRESS-STEP-270.md`
- Local ignored visual artifacts under `test-results/visual-review/phase-33-stage-33-7/`

Updated:

- `e2e/gameplay/practice-multiplayer-og.spec.ts`
- `progress/PROGRESS.csv`
- `src/multiplayer/MultiplayerPanel.tsx`

Stage 33.7 did not create or run additional migrations.

## Final Hardening

Reviewed Stage 33.1 through Stage 33.6 for stale copy, duplicated logic, privacy gaps, timed ranked regressions, untimed ranked regressions, leaderboard regressions, docs/progress gaps, and final cleanup needs.

The first focused timed ranked two-client E2E pass exposed one narrow UI status issue: after entering the canonical timed ranked queue, the creator's queue message used the RPC response DTO, which does not return `timeLimitMs`, instead of the request input. This made the creator see the generic ranked queue copy until later refresh. The repair was limited to `src/multiplayer/MultiplayerPanel.tsx`, where the local queue message now derives timed/untimed copy from the submitted request input.

## Two-Client E2E Coverage

Added real two-client Supabase-backed regression coverage in `e2e/gameplay/practice-multiplayer-og.spec.ts` for canonical timed ranked Practice:

- two signed-in players choose ranked Practice `5 minutes`;
- both enter the ranked queue and route into the same finalized timed ranked game;
- finalized timed ranked games use `300000` ms per side;
- finalized timed ranked games use `multiplayer:og:timed:v1`;
- safe opponent profile names render instead of `You` or generic fallback labels;
- terminal timed ranked postgame shows same-settings copy with `5:00 per side`;
- timed ranked search-again uses the trusted ranked queue;
- timed ranked search-again preserves the canonical `300000` ms timed ranked track and routes both players into the next timed ranked game.

Existing Stage 32 two-client Practice OG E2E coverage and Stage 33.6 component/domain coverage continue to protect untimed ranked Practice v1, unsupported timer rejection, Daily ranked deferral, ranked custom/private-code deferral, and public leaderboard OG/GO untimed-only behavior.

## Completion Documentation

Created `planning/phase-33/CHANGELOG.md` summarizing:

- timed Practice ranked audit, addendum, migration/RLS readiness, domain/repository support, UI integration, and final E2E hardening;
- display-only rank bands;
- public ranked leaderboard `All buckets` removal;
- preserved Phase 32, Phase 31, Phase 30, Phase 29, Phase 28, Phase 27, Daily, gameplay, and Elo boundaries;
- explicit deferrals for Daily ranked, ranked custom/private-code, public timed leaderboard exposure, public/guest spectation, auth/deployment/account-management readiness, onboarding/help, service workers, push infrastructure, deployment, and release.

Created `planning/phase-33/REVIEW-CHECKLIST.md` for manual user review before or during Git handoff, with must-verify items for timed ranked controls, timed ranked matching, timed ranked search-again, untimed ranked preservation, deferrals, leaderboard cleanup, rank bands, visual artifacts, and preserved invariants.

## Visual Handoff Review

Ran the local visual handoff review gate with one local Vite server and temporary E2E users. The final visual capture passed after assertions and generated local-only ignored artifacts:

- Artifact directory: `test-results/visual-review/phase-33-stage-33-7/`
- Manifest: `test-results/visual-review/phase-33-stage-33-7/manifest.md`
- Screenshots:
  - `timed-ranked-controls-desktop.png`
  - `timed-ranked-playing-desktop.png`
  - `timed-ranked-postgame-search-again-desktop.png`
  - `public-ranked-leaderboard-og-go-rank-bands-desktop.png`

Codex visual assessment found no concerns in the final captures. The artifacts are local-only review evidence and are not intended for commit.

## Verification

Passed:

- Focused Stage 33.7 timed ranked E2E:
  - `npx playwright test e2e/gameplay/practice-multiplayer-og.spec.ts -g "matches canonical timed ranked"`
  - Result: 1/1 passed after the narrow timed queue status-copy repair.
- Focused Stage 33 timed ranked/rank-band/leaderboard regression set:
  - `npm run test -- src/multiplayer/rating.test.ts src/multiplayer/matchmaking.test.ts src/multiplayer/scoring.test.ts src/multiplayer/multiplayerRepository.test.ts src/multiplayer/MultiplayerStatsPanel.test.tsx src/multiplayer/competitiveMultiplayer.test.ts src/leaderboards/publicRankedLeaderboard.test.ts src/leaderboards/publicRankedLeaderboardViewModels.test.ts src/leaderboards/PublicRankedLeaderboardPanel.test.tsx src/multiplayer/postgameActions.test.ts src/multiplayer/MultiplayerPanel.test.tsx`
  - Result: 11 files and 127 tests passed.
- Focused real two-client Practice OG E2E file:
  - `npx playwright test e2e/gameplay/practice-multiplayer-og.spec.ts`
  - Result: 8/8 passed.
- Full required Stage 33.7 gate:
  - `npm run lint`
  - `npm run test`
    - Result: 104 files and 704 tests passed.
  - `npm run test:e2e`
    - Result: 16/16 passed.
  - `npm run test:full`
    - Result: 704 Vitest tests plus 16 Playwright E2E tests passed.
  - `npm run build`
    - Passed with the existing Vite large-chunk advisory.
  - `npx tsc -p tsconfig.api.json --noEmit`
- Local visual handoff capture:
  - `npx playwright test e2e/.phase33-visual.spec.ts --reporter=list`
  - Result: 1/1 passed.

Final hygiene:

- `git diff --check`
- Progress CSV shape check using `python3 -S`
  - Result: `rows=272 columns=[12] last_id=270`
- Non-printing secret/artifact scan over changed tracked and untracked repository files
  - Result: `scanned_files=44 credential_pattern_hits=0 changed_artifacts=0`
- Ignored-artifact check
  - Result: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- Visual artifact ignore check
  - Result: all Phase 33 visual review screenshots and manifest are ignored by `.gitignore:14:test-results`.
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
  - Result: no listeners.
- Obvious Playwright/Vite/browser cleanup check
  - Result: leftover Playwright daemon/headless Chromium processes from the visual pass were stopped; no Stage 33.7-owned Playwright or Vite processes remained afterward.
- `git status --short --branch`

## Boundaries Preserved

No additional migrations, deployment, Vercel or Supabase configuration, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work was performed.

Phase 33 preserves Phase 32 stabilization behavior, Phase 31 postgame behavior, Phase 30 public leaderboard display-only authority, Phase 29 public profile privacy, Phase 28 Live read-only behavior, Phase 27 ranked Practice behavior, Daily Multiplayer integrity, gameplay rules, and Elo math.

## Next Step

Review Stage 33.7 completion evidence, visual handoff artifacts, and the Phase 33 manual review checklist. If approved, explicitly authorize Phase 33 Git handoff preparation before Git/GitHub operations, deployment, release, branch cleanup, backup workflow execution, or Phase 34 planning.
