# Progress Step 355 - Phase 41 Stage 41.4 Public Ranked Leaderboard Freshness Repair

**Status**: Completed - Awaiting User Review Before Stage 41.5
**Phase**: Phase 41 - Multiplayer Reliability And Real E2E Hardening
**Stage**: 41.4 - Public ranked leaderboard freshness repair
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-02T22:30:00Z
**Completed**: 2026-07-02T22:40:44Z

## Authorization

The user authorized Phase 41 Stage 41.4 only: source/test-only public ranked leaderboard freshness repair using the completed Stage 41.3 ranked Practice queue/search-again repair baseline.

This pass includes reading governance, Phase 41 planning/spec/implementation materials, Stage 41.1 audit, Stage 41.2 harness progress, Stage 41.3 progress, public ranked leaderboard source surfaces, trusted ranked settlement and rating profile surfaces, relevant tests/E2E harnesses, creating this Stage 41.4 progress report and matching 12-column CSV row, implementing the smallest safe leaderboard freshness repair, adding focused tests/E2E coverage, and running verification.

This pass does not authorize Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `c3d774bc8a611950f889f2f7a487be4e69844fc0`.
- `origin/main`: `c3d774bc8a611950f889f2f7a487be4e69844fc0`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-edited `planning/phase-40/REVIEW-CHECKLIST.md` was preserved.

## Implemented Repair

- Classified the public ranked leaderboard freshness issue as source-side route/settlement freshness, not an SQL/RLS contract gap.
- Added a non-rendered public leaderboard freshness key derived from local trusted settlement timing, rating counts, public bucket ids, and rating values.
- Kept the freshness key free of raw user ids, rating transaction ids, match ids, emails, sessions, queue ids, answers, seeds, or private profile fields.
- Wired the freshness key into `PublicRankedLeaderboardPanel` so authenticated public leaderboard rows reload automatically when trusted ranked settlement updates local competitive state.
- Added a shared `navigateToLeaderboard` E2E helper that targets the canonical route heading by id.
- Preserved the public ranked leaderboard RPC parser allowlists, public-field-only payloads, Stage 41.3 ranked queue/search-again repairs, trusted settlement boundaries, Daily exclusion, gameplay rules, and Elo math.
- No migration/RLS addendum is required based on Stage 41.4 evidence.

## Focused Coverage

- Added focused unit coverage proving the leaderboard freshness key changes after trusted settlement metadata changes without including raw user ids or private transaction/match ids.
- Added a real two-client Supabase-backed E2E that:
  - creates active public profiles for two authenticated users;
  - matches them through ranked Practice queue;
  - submits a trusted ranked Practice settlement;
  - navigates to Leaderboard without manual refresh;
  - verifies the newly settled public player row appears;
  - probes public ranked leaderboard rows for forbidden identity/session/rating-internal fields.
- Re-ran the full `e2e/gameplay/multiplayer-reliability.spec.ts` file to preserve Stage 41.2 and Stage 41.3 reliability coverage.

## Verification

Verification completed for the Stage 41.4 source/test repair:

- Focused Vitest: `npx vitest run src/leaderboards/LeaderboardPanel.test.tsx src/leaderboards/PublicRankedLeaderboardPanel.test.tsx` passed `9/9`.
- Focused Playwright single case: `npx playwright test e2e/gameplay/multiplayer-reliability.spec.ts -g "refreshes public ranked leaderboard after a trusted ranked Practice settlement"` passed `1/1`.
- Focused Playwright reliability file: `npx playwright test e2e/gameplay/multiplayer-reliability.spec.ts` passed `5/5`.
- `npm run lint` passed after moving the freshness helper out of the component file to preserve React Fast Refresh boundaries.
- `npm run test` reported `111` files and `781` tests passed.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.
- `git diff --check` passed.
- Progress CSV shape check using `python3 -S` reported `rows=357 columns=[12] last_id=355`.
- Non-printing changed/untracked file credential scan reported `scanned_files=31 credential_pattern_hits=0`.
- Ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0` after allowing the pre-existing tracked `.env.example` template and still blocking local `.env*` files.
- Watched-port cleanup check reported `port_5173=clear`, `port_5174=clear`, `port_3000=clear`, and `port_4173=clear`.
- `git status --short --branch` completed.

## Blockers And Open Questions

No blockers were found.

Open questions for later Phase 41 stages:

- Stage 41.5 should decide whether private request `created` rows should remain visible as active history or be removed from active request lists once the created game has safely opened.
- Stage 41.6 should decide whether mobile Practice Multiplayer freshness needs visibility-change refresh, route-entry refresh, shorter polling, or a user-facing refresh affordance.
- Final hardening should confirm the public leaderboard freshness key does not need broader notification integration after Stage 41.5 and Stage 41.6 changes land.

## Boundary Confirmation

No Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation contract change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, local Codex skill creation/modification, or original stable repository work has been performed.
