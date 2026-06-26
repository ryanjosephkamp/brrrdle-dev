# Phase 33 Implementation Plan

**Status**: Detailed implementation plan for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-25.
**Phase focus**: Competitive ladder v2 readiness, gated timed Practice ranked, display-only rank bands, and public ranked leaderboard polish.

## Authority

This plan is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, `planning/phase-33/PLANNING-BRIEF.md`, `planning/specs/phase-33/PHASE-33-COMPETITIVE-LADDER-V2-READINESS-SPEC-2026-06-25.md`, `docs/ranked-multiplayer.md`, `docs/supabase.md`, `docs/deployment.md`, `progress/PROGRESS.csv`, and current progress reports.

This plan does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, deployment, Vercel or Supabase configuration, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

## Current Baseline

- Local `main` and `origin/main` were confirmed at `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692` during Phase 33 planning/specification.
- Phase 32 stabilization, visual handoff review, manual checklist workflow, and brrrdle GitHub backup skill documentation are complete and merged.
- Existing uncommitted Phase 33 planning/spec/progress artifacts are intentionally preserved.
- Current ranked multiplayer is signed-in, untimed ranked Practice v1 only.
- App and SQL seams currently reject positive `timeLimitMs` for ranked Practice:
  - `src/multiplayer/matchmaking.ts`;
  - `src/multiplayer/scoring.ts`;
  - `supabase/migrations/20260616054019_phase27_trusted_settlement_ranked_queue.sql`;
  - `supabase/migrations/20260616165434_phase27_ranked_queue_game_finalization.sql`;
  - `supabase/migrations/20260624233635_phase32_participant_identity_rpc.sql`.
- Public ranked leaderboard UI currently exposes `All buckets`; Phase 33 should remove that player-facing view.

## Execution Principles

- Preserve working ranked Practice v1 first. Untimed `multiplayer:og` and `multiplayer:go` remain the baseline.
- Treat timed ranked as rating-authority work, not a UI toggle.
- Prefer source-only rank-band and leaderboard cleanup before timed ranked implementation.
- Require a migration/RLS addendum before any timed ranked SQL/RPC/RLS execution.
- Keep Daily ranked and ranked custom/private-code games explicitly deferred.
- Keep Vercel/auth/account-management work routed to a later auth/deployment readiness phase.
- Keep onboarding/help routed to a later UX phase.
- Use one stage per authorization prompt; do not combine protected baseline, SQL planning, SQL execution, source implementation, E2E, visual review, checklist, or Git handoff without explicit user approval.

## Success Criteria

Phase 33 is complete only when all authorized stages are done and:

- untimed ranked Practice v1 still works;
- Daily ranked remains unavailable;
- ranked custom/private-code games remain unavailable;
- Elo formula, K factors, provisional window, expected-score curve, rating movement, scoring, timeout, forfeit, GO transition, keyboard-state, Daily claim, and gameplay rules remain unchanged;
- public ranked leaderboard no longer exposes a player-facing `All buckets` control/view;
- public ranked leaderboard defaults to `OG`;
- display-only rank bands, if implemented, are pure rating-derived labels and are tested as non-authoritative;
- timed Practice ranked, if implemented, supports exactly `5 minutes` per side and separate timed buckets only;
- timed Practice ranked, if implemented, passes trusted queue, finalization, settlement, privacy/RLS, and real two-client E2E verification;
- if timed Practice ranked is not implemented, the phase leaves a clean audit/addendum record and a safe next gate;
- visual handoff review and manual review checklist artifacts are created before Git handoff when user-visible implementation lands.

## Stage Breakdown

### Stage 33.0: Implementation Plan Approval And Protected Baseline

**Authorization shape**: documentation/progress plus verification only. No source/runtime changes.

Deliverables:

- Confirm repository state, remotes, `HEAD`, `origin/main`, and stable-repo boundary.
- Record current uncommitted Phase 33 planning/spec/progress artifacts.
- Create Stage 33.0 progress report and CSV row.
- Run watched-port/process/resource checks for ports `5173`, `5174`, `3000`, and `4173`, obvious runaway `node`/`vite`/`playwright`/browser processes, disk, memory, and load.
- Run baseline verification:
  - `npm run lint`;
  - `npm run test`;
  - `npm run build`;
  - `npx tsc -p tsconfig.api.json --noEmit`;
  - `git diff --check`;
  - progress CSV shape check using `python3 -S`.

Exit gate:

- Stop after reporting baseline results and the Stage 33.1 audit prompt.
- If any baseline command fails, record the exact non-secret failure in progress and do not proceed to Stage 33.1.

### Stage 33.1: Ranked Ladder Audit And Scope Lock

**Authorization shape**: read-only audit/reproduction plus progress only. No implementation.

Deliverables:

- Audit app guards in `src/multiplayer/matchmaking.ts`, `src/multiplayer/scoring.ts`, `src/multiplayer/rating.ts`, `src/multiplayer/competitiveMultiplayer.ts`, `src/multiplayer/multiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, `src/multiplayer/MultiplayerPanel.tsx`, and related tests.
- Audit SQL/RPC/RLS guards in Phase 27 queue/settlement/finalization migrations and Phase 32 participant identity RPC.
- Audit public leaderboard all-buckets cleanup path in `src/leaderboards/publicRankedLeaderboardViewModels.ts`, `src/leaderboards/PublicRankedLeaderboardPanel.tsx`, and tests.
- Audit rank-band helper placement and display surfaces.
- Decide whether timed Practice ranked implementation should be attempted in Phase 33 or deferred after addendum readiness.
- Decide whether Stage 33.2 migration/RLS addendum planning is required. Expected default: required if timed ranked implementation proceeds.
- Confirm Vercel/auth/account-management and onboarding/help remain out of Phase 33 implementation.

Exit gate:

- Stop with audit findings, migration/RLS decision, and next prompt.
- If timed ranked risk remains unclear, prefer stopping after audit and source-only leaderboard/rank-band polish rather than forcing timed ranked implementation.

### Stage 33.2: Timed Ranked Migration/RLS Addendum Planning If Required

**Authorization shape**: planning/spec/progress only. No SQL migration creation or execution.

Run only if Stage 33.1 recommends timed Practice ranked implementation.

Deliverables:

- Create `planning/specs/phase-33/PHASE-33-TIMED-RANKED-MIGRATION-RLS-ADDENDUM-2026-06-25.md` or date-appropriate equivalent.
- Define a narrow additive contract for:
  - canonical `300000` ms ranked time control;
  - timed bucket helpers for `multiplayer:og:timed:v1` and `multiplayer:go:timed:v1`;
  - queue creation;
  - pair claiming;
  - queue status;
  - ranked game finalization;
  - trusted settlement;
  - profile/transaction bucket handling;
  - participant identity summaries for timed ranked queue contexts;
  - public leaderboard exposure or explicit non-exposure for timed buckets;
  - grants, revokes, indexes, rollback, and probes.
- Preserve untimed ranked Practice v1 and all deferrals.
- Define non-printing privacy/abuse probes.

Exit gate:

- Stop for addendum review.
- Do not create migration SQL until separately authorized.

### Stage 33.3: Timed Ranked Migration/RLS Execution If Approved

**Authorization shape**: SQL migration/probe/progress only.

Run only after a clean Stage 33.2 addendum and explicit execution authorization.

Deliverables:

- Confirm intended `brrrdle-dev` Supabase target without printing secrets.
- Create exactly the approved additive migration(s).
- Apply only if target and credentials are unambiguous.
- Run the addendum's privacy/abuse probes without printing secrets or private data.
- Update `docs/supabase.md` only for SQL/RPC/RLS outcomes that actually land.

Exit gate:

- Stop before app source implementation if migration or probes fail.
- If target/credentials are ambiguous, stop before remote migration execution.

### Stage 33.4: Rank Bands And Leaderboard Filter Cleanup

**Authorization shape**: source/test/docs/progress implementation stage, no migrations.

Deliverables:

- Add display-only rank-band helper(s), likely in `src/multiplayer/rating.ts` or a narrow adjacent module.
- Implement rank thresholds:
  - `Learner`: below `900`;
  - `Bronze`: `900` through `1099`;
  - `Silver`: `1100` through `1299`;
  - `Gold`: `1300` through `1499`;
  - `Platinum`: `1500` through `1699`;
  - `Diamond`: `1700` through `1899`;
  - `Master`: `1900` and above.
- Surface rank bands in approved ranked displays, recommended:
  - public ranked leaderboard rows;
  - competitive multiplayer rating buckets in Stats.
- Remove the player-facing `All buckets` option from public ranked leaderboard controls.
- Default public ranked leaderboard state to `multiplayer:og`.
- Preserve repository/RPC `bucket: null` behavior internally unless an addendum changes it.
- Preserve no-comma rating/rank display.
- Update copy and tests.

Likely files:

- `src/multiplayer/rating.ts`
- `src/multiplayer/rating.test.ts`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/MultiplayerStatsPanel.test.tsx`
- `src/leaderboards/publicRankedLeaderboardViewModels.ts`
- `src/leaderboards/publicRankedLeaderboardViewModels.test.ts`
- `src/leaderboards/PublicRankedLeaderboardPanel.tsx`
- `src/leaderboards/PublicRankedLeaderboardPanel.test.tsx`
- `docs/ranked-multiplayer.md`

Focused verification first:

- `npm run test -- src/multiplayer/rating.test.ts src/multiplayer/MultiplayerStatsPanel.test.tsx src/leaderboards/publicRankedLeaderboardViewModels.test.ts src/leaderboards/PublicRankedLeaderboardPanel.test.tsx`

Exit gate:

- If source-only cleanup unexpectedly requires SQL/RPC changes, stop and route through addendum planning.

### Stage 33.5: Timed Practice Ranked Domain And Repository Foundations If Approved

**Authorization shape**: source/test/docs/progress implementation stage, no new migrations unless Stage 33.3 already landed the approved SQL.

Run only after Stage 33.1 through Stage 33.3 prove timed ranked safe enough to implement.

Deliverables:

- Extend rating bucket types/parsers/normalizers for timed buckets without weakening malformed-bucket rejection.
- Add canonical timed ranked eligibility for `300000` ms only.
- Keep all other timed Practice options unranked.
- Keep Daily ranked and custom/private-code ranked rejected.
- Extend matchmaking compatibility to include exact canonical timed ranked clock.
- Extend repository DTO parsing for any approved new RPC fields.
- Preserve strict forbidden-field rejection.
- Add focused tests for canonical timed ranked, unsupported time limits, Daily/custom exclusions, malformed buckets, privacy/forbidden fields, and untimed ranked non-regression.

Likely files:

- `src/multiplayer/rating.ts`
- `src/multiplayer/matchmaking.ts`
- `src/multiplayer/scoring.ts`
- `src/multiplayer/competitiveMultiplayer.ts`
- `src/multiplayer/multiplayerRepository.ts`
- related tests.

Exit gate:

- Stop if trusted settlement, queue finalization, or DTO parsing cannot prove timed ranked authority without broad refactor.

### Stage 33.6: Timed Practice Ranked UI Integration If Approved

**Authorization shape**: UI/source/test/docs/progress implementation stage.

Run only after Stage 33.5 passes.

Deliverables:

- Add a clear UI affordance for canonical `5 minutes` timed ranked only.
- Keep unsupported ranked time controls hidden, disabled, or clearly unavailable.
- Preserve unranked timed Practice behavior for all existing time controls.
- Preserve Phase 32 ranked search-again routing and postgame behavior.
- Update player-facing copy so timed and untimed ranked are separate rating tracks.
- Add focused component/route tests for canonical timed ranked, unsupported time controls, untimed ranked non-regression, and explicit Daily/custom deferrals.

Likely files:

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/postgameActions.ts`
- `src/multiplayer/postgameActions.test.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- relevant E2E helpers if needed.

Exit gate:

- Stop if UI integration reveals missing SQL/RPC fields or unsafe client-side authority assumptions.

### Stage 33.7: Real Two-Client E2E, Visual Review, Manual Checklist, And Final Hardening

**Authorization shape**: final hardening/source-test-doc/progress stage.

Deliverables:

- Review Stages 33.1 through 33.6 for stale copy, duplicated logic, privacy gaps, ranked regressions, leaderboard regressions, and docs/progress gaps.
- Add or update real two-client Supabase-backed E2E for any timed ranked implementation.
- Verify source-only rank bands and leaderboard cleanup.
- Create `planning/phase-33/CHANGELOG.md`.
- Run local visual handoff review for changed user-visible ranked surfaces.
- Generate `planning/phase-33/REVIEW-CHECKLIST.md`.
- Run final verification gate.
- Run non-printing secret/artifact checks and watched-port/process cleanup checks.

Final verification expectation:

- focused tests for touched files;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run test:full`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact checks;
- ignored-artifact checks;
- watched-port/process cleanup checks.

Exit gate:

- Stop after reporting whether Phase 33 appears complete and provide Git handoff preparation prompt.

## Migration/RLS Addendum Gates

Migration/RLS addendum planning is required before any of the following:

- adding timed ranked buckets to trusted SQL helpers;
- allowing positive `time_limit_ms` in ranked queue creation;
- allowing timed ranked pair claiming;
- allowing timed ranked queue status/finalization;
- allowing timed ranked trusted settlement;
- changing public leaderboard RPC bucket behavior;
- changing participant identity RPC behavior for timed ranked queue contexts;
- changing grants, revokes, indexes, or table constraints.

No migration is needed for:

- display-only rank-band helpers;
- public leaderboard `All buckets` UI removal if repository/RPC behavior stays unchanged;
- docs/progress/changelog updates.

## Dependencies

- Existing Phase 27 ranked queue and trusted settlement RPCs.
- Existing Phase 30 authenticated-only public ranked leaderboard RPC.
- Existing Phase 32 participant identity RPC.
- Existing Phase 32 real two-client E2E helpers and Supabase admin fixtures.
- Existing local visual review and manual checklist workflows.

## Stop Conditions

Stop and report before proceeding if:

- repository target is ambiguous or not `brrrdle-dev`;
- original stable `brrrdle` would be touched;
- protected action is requested without explicit authorization;
- baseline verification fails;
- migration target or credentials are ambiguous;
- any secret/artifact scan finds real credential-like material;
- ignored artifacts, screenshots, videos, traces, auth state, tokens, or local session artifacts are staged or tracked;
- timed ranked cannot be implemented without broad Elo/gameplay-rule changes;
- Daily claim safety, public profile privacy, participant identity privacy, or leaderboard display-only authority would be weakened;
- public/guest spectation becomes necessary;
- Vercel/Supabase configuration changes appear necessary;
- GitHub backup workflow execution would be required.

## Risk Management

- Timed ranked should be attempted only after Stage 33.1 audit proves bounded SQL/app changes are enough.
- If timed ranked looks too risky, Phase 33 can still complete useful source-only work: rank bands, leaderboard filter cleanup, docs, visual review, manual checklist, and clear timed-ranked deferral.
- Keep timed ranked v1 to exactly `5 minutes` per side to avoid queue fragmentation and test explosion.
- Keep timed and untimed rating buckets separate to protect player meaning.
- Keep rank bands descriptive to avoid accidental competitive authority.
- Keep all Vercel/auth work outside Phase 33 to avoid mixing deployment access control with ranked authority.

## Open Decisions For Stage 33.1

Stage 33.1 should lock these before implementation:

- whether Phase 33 attempts timed ranked implementation or stops at readiness/addendum;
- exact visual placement for rank bands;
- whether timed ranked buckets should be publicly visible in Phase 33 if implementation lands;
- whether the public leaderboard table keeps the `Bucket` column after `All buckets` is removed;
- exact final E2E scenarios if timed ranked implementation proceeds.

Recommended defaults:

- attempt timed ranked only if audit and addendum show a narrow safe path;
- implement rank bands on public leaderboard rows and Stats rating buckets;
- keep timed buckets out of public leaderboards until timed ranked E2E and privacy probes pass;
- keep the `Bucket` column initially, then remove it only if Stage 33.4 confirms the two-filter layout makes it redundant without reducing clarity.

## Next Gated Prompt

The next safe action is Stage 33.0 protected baseline only. It should create progress ID `263` unless another approved progress row is added first, run resource/process checks, run the baseline verification gate, and stop before Stage 33.1 audit or implementation.
