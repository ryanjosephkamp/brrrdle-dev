# Progress Step 249: Phase 32 Stage 32.0 Protected Baseline

**Status**: Completed - Awaiting User Review Before Stage 32.1 Audit
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-24T22:16:39Z
**Completed**: 2026-06-24T23:01:03Z

## Authorization

The user authorized Phase 32 Stage 32.0 only: implementation plan approval and protected baseline.

Allowed work:

- read required governance, planning, progress, package, and testing surfaces;
- confirm repository state;
- confirm the original stable `brrrdle` repository is not being used;
- record existing uncommitted Phase 32 planning/spec/progress artifacts and preserve them;
- create this Stage 32.0 progress report and matching 12-column CSV row;
- run watched-port/process/resource checks before and after verification;
- run the Stage 32.0 baseline verification gate.

Not authorized:

- Stage 32.1 work;
- source/runtime implementation;
- test implementation;
- Supabase migration creation or execution;
- Vercel configuration or deployment;
- commits, pushes, pull requests, merges, releases, or branch deletion;
- Phase 33 ranked mode expansion;
- public/guest spectation;
- service workers or push infrastructure;
- new custom skills;
- force-push, secret printing, private data exposure, local session artifact exposure, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- `origin/main`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- Remote: `origin` points to `ryanjosephkamp/brrrdle-dev`.
- Original stable repository: not used.

## Preserved Uncommitted Phase 32 Artifacts

Existing uncommitted Phase 32 planning/spec/progress artifacts were recorded and preserved before verification:

- `docs/ranked-multiplayer.md`
- `memory.md`
- `planning/README.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `planning/ROADMAP.md`
- `planning/phase-30/DEFERRED-RANKED-MODES-ROUTING.md`
- `planning/phase-32/IMPLEMENTATION-PLAN.md`
- `planning/phase-32/PLANNING-BRIEF.md`
- `planning/specs/phase-32/PHASE-32-MULTIPLAYER-STABILIZATION-IDENTITY-ROUTING-AND-RATING-DISPLAY-SPEC-2026-06-24.md`
- `progress/PROGRESS-STEP-246.md`
- `progress/PROGRESS-STEP-247.md`
- `progress/PROGRESS-STEP-248.md`
- `progress/PROGRESS.csv`

## Resource Baseline

Pre-verification checks found:

- watched ports `5173`, `5174`, `3000`, and `4173`: no listeners;
- no persistent Vite, Vitest, Playwright, `npm run dev`, or `npm run test` process identified;
- existing user Chrome helper processes were present;
- disk at repository mount: 460Gi total, 349Gi used, 70Gi available, 84% capacity;
- memory/load snapshot recorded with high existing memory pressure and load averages around 5.27, 4.41, 3.48.

Post-failure checks found:

- watched ports `5173`, `5174`, `3000`, and `4173`: no listeners;
- no persistent Vite, Vitest, Playwright, `npm run dev`, or `npm run test` process identified;
- disk at repository mount remained 460Gi total, 349Gi used, 70Gi available, 84% capacity;
- load averages were around 6.46, 5.45, 4.07 after the failed test run.

## Baseline Repair

The initial Stage 32.0 baseline failed because `src/multiplayer/multiplayerRepository.test.ts` used an absolute `expires_at` fixture value of `2026-06-24T01:20:00.000Z`. The baseline was run later on 2026-06-24 UTC, so the parser correctly treated the rematch row as expired and forced `viewerCanAccept` to `false`.

Repair:

- updated the rematch RPC test fixture expiration to a stable future timestamp, `2099-06-24T01:20:00.000Z`;
- preserved the stale/expired rematch test case, which still passes its own fixed `now` value and explicit expired override;
- made no runtime, migration, gameplay, Elo, or Stage 32.1 behavior changes.

## Verification

Initial failure:

- `npm run lint` passed.
- `npm run test` failed:
  - failing file: `src/multiplayer/multiplayerRepository.test.ts`;
  - failing test: `multiplayer repository seam > requests, lists, cancels, declines, and accepts Practice rematches through Stage 31.3 RPCs`;
  - assertion: expected `viewerCanAccept: true` and `viewerRole: "opponent"` for `listed[0]`, but received `viewerCanAccept: false` with `viewerRole: "opponent"`;
  - location: `src/multiplayer/multiplayerRepository.test.ts:727`;
  - summary: 1 failed test, 679 passed tests, 104 test files run.
- `npm run build` was not run after the test failure.
- `npx tsc -p tsconfig.api.json --noEmit` was not run after the test failure.
- `git diff --check` was not run after the test failure.
- Python CSV shape check using `python3 -S` was not run after the test failure.

Repair verification:

- Focused failed test reproduced before the repair:
  - `npx vitest run src/multiplayer/multiplayerRepository.test.ts -t "requests, lists, cancels, declines, and accepts Practice rematches through Stage 31.3 RPCs"` failed with the same `viewerCanAccept` assertion.
- Focused failed test after the repair passed:
  - 1 passed, 26 skipped.
- `npm run lint` passed.
- `npm run test` passed:
  - 104 test files passed;
  - 680 tests passed.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.
- `git diff --check` passed.
- Python CSV shape check using `python3 -S` passed:
  - 251 rows;
  - 12 columns;
  - last_id=249.
- Final resource/process check found no listeners on watched ports `5173`, `5174`, `3000`, or `4173` and no persistent Vite, Vitest, Playwright, `npm run dev`, or `npm run test` process.

## Blockers

No blockers after the narrow baseline repair and full Stage 32.0 verification rerun.

## Boundary Confirmation

Stage 32.0 remained a protected baseline gate. No Stage 32.1 work, source/runtime implementation beyond the one-line stale test fixture repair, Supabase migrations, deployments, commits, pushes, PRs, merges, releases, branch deletion, Phase 33 ranked expansion, public/guest spectation, service workers, push infrastructure, Elo/gameplay changes, new custom skills, force-push, secret printing, private data exposure, local session artifact exposure, or original stable repository work was performed.
