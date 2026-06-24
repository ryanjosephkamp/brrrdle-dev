# Progress Step 244: Phase 31 Stage 31.6 Current-Surface Cleanup

**Status**: Completed - Awaiting User Review Before Stage 31.7 Final Hardening
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-24T00:44:32Z
**Completed**: 2026-06-24T00:51:07Z

## Authorization

The user authorized Phase 31 Stage 31.6 only: current-surface cleanup.

Allowed work:

- read required governance, Phase 31 planning/spec/implementation materials, current progress records, ranked docs, package metadata, current profile/Stats/About/rating-bucket source surfaces, and relevant tests;
- confirm repository state, branch, remotes, `HEAD`, and `origin/main`;
- confirm the original stable `brrrdle` repository is not being used;
- create this Stage 31.6 progress report and matching 12-column CSV row;
- fix the private profile accent preview so the avatar circle follows the selected private accent color;
- fix the Stats chart/accessibility header overlap without changing stats authority or gameplay data;
- improve About expected-score formula formatting without changing the Elo algorithm;
- improve Competitive multiplayer rating-bucket clarity, including plain-language copy, clearer labels, stale public-leaderboard copy cleanup, and duplicate/malformed bucket display handling;
- preserve Stage 31.5 postgame UI behavior, Stage 31.4 repository foundations, Phase 30 leaderboards, Phase 29 profiles, Phase 28 Live, Phase 27 ranked Practice, Daily Multiplayer integrity, and all gameplay rules;
- add focused tests for touched profile, Stats, About, and rating-bucket surfaces;
- run focused cleanup tests first, then `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, and Python CSV shape check using `python3 -S`.

Not authorized:

- migrations;
- Phase 32 ranked mode expansion;
- public/guest spectation;
- service workers or push infrastructure;
- deployments;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Elo algorithm or gameplay-rule changes;
- new custom skills;
- force-push, secret printing, private data exposure, local session artifact exposure, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- `origin/main`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- Remote: `origin` points to `ryanjosephkamp/brrrdle-dev`.
- Original stable repository: not used.

## Implementation Notes

- Added focused TDD coverage for the private profile initials-avatar accent preview, Stats hidden accessibility tables, About expected-score formula block, malformed rating buckets, competitive rating-bucket labels/dedupe, and viewer-specific rating bucket display.
- Reused the profile accent gradient mapping for both private and public initials-avatar previews so the private preview now follows the selected private accent color when no uploaded avatar image is present.
- Replaced Stats chart hidden-table `sr-only` classes with the repository's `.brrrdle-visually-hidden` helper in `BarChart`, `CalendarHeatmap`, and `TrendSparkline`, preventing hidden captions/tables from leaking into visible layout while preserving assistive data.
- Split the About expected-score explanation into prose plus a distinct accessible formula block labeled `Expected score formula`, without changing the Phase 27 Elo constants or formula.
- Updated Competitive multiplayer copy to use clearer player-facing language for confirmed ranked results and display-only public leaderboards.
- Added clear rating bucket labels such as `Ranked Practice OG` and `Ranked Practice GO`.
- Filtered rating buckets to the signed-in viewer when available, deduped to the latest profile per user/bucket, and dropped malformed bucket rows from rating normalization instead of turning them into valid-looking OG rows.

## Verification

- TDD red step observed before implementation:
  - `npm run test -- src/account/ProfilePanel.test.tsx src/stats/StatsDashboard.test.tsx src/app/AboutBrrrdlePanel.test.tsx src/multiplayer/MultiplayerStatsPanel.test.tsx src/multiplayer/rating.test.ts` failed for the new cleanup assertions.
- Focused Stage 31.6 cleanup tests passed after implementation:
  - `npm run test -- src/account/ProfilePanel.test.tsx src/stats/StatsDashboard.test.tsx src/app/AboutBrrrdlePanel.test.tsx src/multiplayer/MultiplayerStatsPanel.test.tsx src/multiplayer/rating.test.ts`
  - 5 files, 22 tests.
- `npm run lint` passed.
- `npm run test` passed:
  - 104 files, 680 tests.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.
- `git diff --check` passed.
- Final Python CSV shape check using `python3 -S` passed:
  - 246 rows;
  - 12 columns;
  - last_id=244.
- Final `git status --short --branch` showed expected uncommitted Phase 31 planning/spec/progress artifacts plus Stage 31.3 through Stage 31.6 source/test/progress changes.

## Blockers

No blockers.

## Boundary Confirmation

Stage 31.6 remained limited to current-surface cleanup. No migrations, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, deployments, commits, pushes, PR creation, merges, releases, branch deletion, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, private data exposure, local session artifact exposure, or original stable repository work was performed.
