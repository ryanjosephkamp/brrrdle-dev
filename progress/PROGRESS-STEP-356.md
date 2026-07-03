# Progress Step 356 - Phase 41 Stage 41.5 Private Practice Request Lifecycle And Routing Repair

**Status**: Completed - Awaiting User Review Before Stage 41.6
**Phase**: Phase 41 - Multiplayer Reliability And Real E2E Hardening
**Stage**: 41.5 - Private Practice request lifecycle and routing repair
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-02T22:43:00Z
**Completed**: 2026-07-02T23:01:08Z

## Authorization

The user authorized Phase 41 Stage 41.5 only: source/test-only private Practice request lifecycle and routing repair using the completed Stage 41.4 public ranked leaderboard freshness repair baseline.

This pass includes reading governance, Phase 41 planning/spec/implementation materials, Stage 41.1 audit, Stage 41.2 harness progress, Stage 41.3 progress, Stage 41.4 progress, private Practice request source surfaces, routing/notification surfaces, relevant tests/E2E harnesses, creating this Stage 41.5 progress report and matching 12-column CSV row, implementing the smallest safe private request lifecycle/routing fixes, adding focused tests/E2E coverage, and running verification.

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

- Classified the private Practice request lifecycle issue as source/test-only; no migration/RLS addendum is required based on Stage 41.5 evidence.
- Added shared routing helpers so active private request lists include only non-expired `requested` rows.
- Kept terminal `created`, `cancelled`, `declined`, and `expired` private request rows out of active request counts and actionable lists.
- Added a participant-owned created-game auto-route helper for cases where a safe terminal `created` request row is available to browser source.
- Preserved the Phase 40 privacy boundary that accepted game projections do not store raw private request ids or broaden private request visibility.
- Verified requester-side accepted-game open/resume routing through real Supabase-backed E2E by asserting the active request list clears and the requester lands on the accepted Practice game without manually selecting it.
- Preserved authenticated-only private request actions, public profile privacy boundaries, accepted-game participant-owned open/resume behavior, public/guest spectator boundaries, Stage 41.3 ranked queue repairs, Stage 41.4 public leaderboard freshness repairs, Daily exclusion, gameplay rules, and Elo math.

## Focused Coverage

- Added unit coverage for:
  - active private request filtering;
  - terminal private request rows staying out of active lists/actions;
  - safe created-game auto-route ownership checks.
- Updated private matchmaking E2E to verify requester-side accepted-game open/resume routing without test-driven manual game selection.
- Updated multiplayer reliability E2E to keep cancel/decline lifecycle cleanup coverage across desktop/mobile clients and verify accepted private request routing without exposing raw identifiers.

During focused E2E triage, an initial assertion expected a terminal private request status message on requester reload. The real browser flow already opened the accepted participant-owned game and cleared active request rows, but did not always receive a terminal `created` row to render a separate request message. The assertion was narrowed to the privacy-preserving contract: active list cleanup plus safe participant-owned game open/resume.

## Verification

Verification completed for the Stage 41.5 source/test repair:

- Focused Vitest: `npx vitest run src/multiplayer/MultiplayerPanel.test.tsx` passed `33/33`.
- Focused Vitest: `npx vitest run src/multiplayer/multiplayerRepository.test.ts src/multiplayer/privateMatchmaking.test.ts` passed `42/42`.
- Focused Playwright single spec: `npx playwright test e2e/gameplay/private-matchmaking.spec.ts` passed `1/1`.
- Focused Playwright targeted reliability slice: `npx playwright test e2e/gameplay/multiplayer-reliability.spec.ts -g "private Practice request|private request acceptance routing"` passed `2/2`.
- `npm run lint` passed.
- `npm run test` reported `111` files and `783` tests passed.
- Focused Playwright reliability/private matchmaking set: `npx playwright test e2e/gameplay/private-matchmaking.spec.ts e2e/gameplay/multiplayer-reliability.spec.ts` passed `6/6`.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.

Final lightweight verification also passed after this progress write:

- `git diff --check` passed.
- Progress CSV shape check using `python3 -S` reported `rows=358 columns=[12] last_id=356`.
- Non-printing changed/untracked file credential scan reported `scanned_files=33 credential_pattern_hits=0`.
- Ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check reported `port_5173=clear`, `port_5174=clear`, `port_3000=clear`, and `port_4173=clear`.
- `git status --short --branch` completed.

## Blockers And Open Questions

No blockers were found.

Open questions for later Phase 41 stages:

- Stage 41.6 should decide whether mobile Practice Multiplayer freshness needs visibility-change refresh, route-entry refresh, shorter polling, or a user-facing refresh affordance.
- Final hardening should confirm the request lifecycle list still stays quiet after Stage 41.6 mobile freshness changes.

## Boundary Confirmation

No Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation contract change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, local Codex skill creation/modification, or original stable repository work has been performed.
