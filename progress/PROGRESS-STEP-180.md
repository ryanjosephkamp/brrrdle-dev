# Progress Step 180 - Phase 26 Stage 26.5C Live v1 App Implementation

**Date**: 2026-06-15
**Branch**: `main`
**Repository**: `brrrdle-dev`
**HEAD**: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
**Origin main**: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
**Status**: Completed - Awaiting User Review Before Stage 26.6

## Scope

Stage 26.5C is limited to Live v1 app implementation using the already-applied authenticated spectator RPC `get_authenticated_live_v1_spectator_games`.

Authorized work includes source/test/documentation changes needed to wire authenticated nonparticipant Live v1 spectation through the sanitized Supabase RPC, focused verification, real Supabase-backed three-client E2E when credentials are available, browser smoke when warranted, and progress updates.

This step does not authorize additional Supabase migrations, public/guest spectation, service workers, push infrastructure, Phase 26.6 work, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, new custom skills, gameplay-rule changes, or original stable `brrrdle` repository work.

## Repository State

- Working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- Remote: `origin` points to `https://github.com/ryanjosephkamp/brrrdle-dev.git`
- Local `HEAD`: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
- `origin/main`: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
- Original stable `brrrdle` checkout was not used.

## Context Reviewed

Required reading and Stage 26.5B handoff context were reviewed before implementation:

- `CONSTITUTION.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `BRRRDLE-SPEC.md`
- `planning/phase-26/PLANNING-BRIEF.md`
- `planning/specs/phase-26/PHASE-26-POLISH-NOTIFICATIONS-AND-LIVE-V1-SPEC-2026-06-15.md`
- `planning/phase-26/IMPLEMENTATION-PLAN.md`
- `planning/specs/phase-26/PHASE-26-LIVE-V1-SPECTATOR-MIGRATION-RLS-ADDENDUM-2026-06-15.md`
- `planning/testing/TESTING-SUITE.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-179.md`
- `docs/supabase.md`
- `agents.md`
- `memory.md`
- `supabase/migrations/20260615235440_phase26_live_v1_authenticated_spectator_projection.sql`
- relevant `src/multiplayer/` repository, view-model, Live, workspace, panel, test, and E2E surfaces

## Work Plan

- Add a read-only spectator repository seam for the sanitized RPC.
- Add strict DTO parsing that rejects forbidden raw projection/session fields.
- Add Live v1 view models distinguishing participant resumable rows, authenticated spectator read-only rows, and signed-out/public unavailable states.
- Update Live UI/workspace behavior so authenticated spectators can discover and open read-only rows without mutation controls.
- Preserve participant resume behavior, Daily Multiplayer invariants, and all gameplay rules.
- Add focused tests and run the Stage 26.5C verification gate.

## Verification

Stage 26.5C verification passed:

- `npm run test -- src/multiplayer/multiplayerRepository.test.ts src/multiplayer/multiplayerViewModels.test.ts src/multiplayer/MultiplayerLive.test.tsx src/multiplayer/MultiplayerWorkspace.test.tsx src/dashboard/dashboardViewModels.test.ts src/dashboard/DashboardHome.test.tsx src/app/attentionViewModels.test.ts src/notifications/notificationViewModels.test.ts` - 8 files, 38 tests passed.
- `npx playwright test e2e/gameplay/live-v1-spectator.spec.ts` - 1/1 passed.
- `npm run test:e2e:multiplayer` - 8/8 passed, including Live v1 authenticated spectator coverage.
- `npm run lint` - passed.
- `npm run test` - 95 files, 587 tests passed.
- `npm run build` - passed with the existing large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` - passed.
- `git diff --check` - passed.
- Progress CSV shape check using Python `csv` parsing - passed with 182 rows including the header, 12 columns each, and `last_id=180`.

The focused Live v1 spectator E2E covered participant resume visibility, authenticated spectator read-only visibility, signed-out/public unavailable state, and desktop/tablet/mobile viewport smoke for the Live surface.

## Implementation Notes

- Added a read-only repository seam for the sanitized RPC `get_authenticated_live_v1_spectator_games`.
- Added strict DTO normalization that rejects rows containing forbidden raw projection, session, answer, seed, raw auth id, email, or private-profile fields.
- Extended Live view models to distinguish participant resumable rows, authenticated spectator read-only rows, and signed-out/public restricted state.
- Updated Multiplayer Live and workspace rendering so participant rows remain resumable while authenticated spectator rows are discoverable and read-only.
- Wired app orchestration to poll the authenticated spectator RPC for signed-in users without changing mutable multiplayer save/resume paths.
- Updated dashboard, attention, route, and notification copy from Live v0 to Live v1 where the authenticated spectator surface is now represented.
- Added focused unit/component coverage and a real Supabase-backed spectator E2E path.

## Status

Stage 26.5C is complete and ready for user review before any Stage 26.6 work.

## Boundary Confirmation

No additional Supabase migrations, public/guest spectation, service workers, push infrastructure, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 26.6 work, new custom skills, gameplay-rule changes, or original stable `brrrdle` repository work was performed.
