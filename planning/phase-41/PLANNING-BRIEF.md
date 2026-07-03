# Phase 41 Planning Brief - Multiplayer Reliability And Real E2E Hardening

**Status**: Draft planning brief for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-02.
**Current baseline**: local `main` and `origin/main` are expected at `c3d774bc8a611950f889f2f7a487be4e69844fc0`.
**Authority**: Planning only. This brief does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, secret exposure, local session artifact exposure, GitHub backup workflow execution, or original stable `brrrdle` repository work.

## Manual Review Result Summary

Phase 40 is complete, backed up, merged, branch-cleaned, and manually reviewed, but the Phase 40 manual review was not a clean "no follow-up" review. The checked-off Phase 40 checklist includes notes that several current multiplayer flows need reliability hardening before the roadmap continues into public stats, dashboard, onboarding, help, progression HUD, Focus Mode, or themes.

Planning can safely proceed because the notes are bounded bug/reliability observations, not evidence that Phase 40 must be reverted. They should be routed into Phase 41 as an explicit reliability macro-phase.

## New Bug And Observation Summary

Phase 40 review and the Phase 41 strategy intake identify these areas:

- ranked Practice search-again and ranked queue matching can fail to pair the only two waiting players consistently;
- cancelled ranked queue entries may remain eligible for later matching against a third player;
- ranked queue buttons can flicker between queued, working, and action states during refresh;
- newly established rated Practice OG players may not appear promptly on the public ranked leaderboard;
- private Practice request cancel, decline, expire, and accepted states can remain visible in active request lists;
- requester-side accepted-game feedback and safe open/resume routing need improvement after the opponent accepts;
- mobile Practice Multiplayer lobby/request/list freshness can lag or show stale state;
- current E2E coverage did not catch the user-observed real multiplayer freshness and lifecycle issues;
- future checklist handoffs should distinguish automated evidence, Codex-attempted browser/manual review, and user-only manual review.

## Phase-Sizing And Reroute Decision

Phase 41 should be formally rerouted from the previous public site stats, developer dashboard, onboarding, and help item into a cohesive multiplayer reliability and real E2E hardening macro-phase.

This reroute follows `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`:

- the work is cohesive because it shares multiplayer, Supabase, ranked queue, leaderboard, private request, notification/routing, mobile freshness, and E2E harness surfaces;
- the phase can be larger at the macro level to avoid repeatedly paying the full verification cost for adjacent multiplayer reliability fixes;
- each implementation stage must remain narrow, single-purpose, and separately gated;
- migration/RLS work remains addendum-gated and cannot be folded silently into source stages;
- final full verification and manual review handoff remain mandatory.

## Goals

- Reproduce or safely characterize the Phase 40 manual-review multiplayer reliability observations.
- Expand real two-client and three-client Supabase-backed E2E coverage for the affected flows.
- Repair ranked Practice queue/search-again/cancel/status stability issues if reproduced.
- Repair public ranked leaderboard freshness or eligibility issues if reproduced.
- Repair private Practice request lifecycle cleanup and requester-side accepted-game feedback/routing.
- Repair mobile Practice Multiplayer freshness and queue status flicker where evidence supports it.
- Add a Codex-assisted manual-review preflight convention for future final-hardening gates.
- Preserve all gameplay, Elo, Daily, public spectator, profile privacy, and deployment boundaries.

## In Scope

- Read-only multiplayer reliability audit and reproduction.
- Focused real E2E harness expansion for two-client, three-client, and mobile viewport flows.
- Ranked Practice queue/search-again cancellation, stale participation, and status stability fixes.
- Public ranked leaderboard freshness/eligibility investigation and narrow repair.
- Private Practice request lifecycle cleanup for cancel, decline, expiry, accept, and stale selected states.
- Requester-side accepted-game feedback and safe open/resume routing.
- Mobile Practice Multiplayer lobby/request/list freshness fixes.
- Codex-assisted manual-review preflight documentation and checklist wording.
- Focused docs/progress/changelog/review-checklist updates.

## Out Of Scope

- Public site stats, private developer dashboard, onboarding, help, and tutorial UX.
- EXP, coin, collectible counters, Focus Mode, compact navigation, and broader mobile UX shell overhaul.
- Theme proposal modernization or concrete theme implementation.
- Full mailbox or notification-center redesign.
- Spectator presence/count/list implementation.
- Public/guest spectation contract changes.
- Ranked private invitations, ranked direct challenges, Daily match requests, and Daily custom invitations.
- Service workers, push subscriptions, deployment, release, Vercel or Supabase configuration changes.
- Gameplay-rule changes, scoring changes, Elo algorithm changes, or rating-settlement rule changes.
- Original stable `brrrdle` repository work.

## Recommended Phase 41 V1 Scope

Phase 41 v1 should avoid broad feature expansion. The preferred v1 scope is:

1. audit and reproduce current ranked queue, leaderboard, private request, and mobile multiplayer freshness observations;
2. add deterministic real E2E coverage for reproduced failure modes before source fixes where feasible;
3. make the smallest source or migration/RLS-gated repairs needed for current behavior;
4. add final hardening and a Codex-assisted pre-review evidence pass before manual checklist handoff.

## Recommended Stage Breakdown

### Stage 41.0 - Protected Baseline And Review Intake

- Confirm repository state and Phase 40 merge baseline.
- Preserve the user-edited Phase 40 checklist.
- Record existing Phase 41 strategy/planning artifacts.
- Run the protected baseline verification gate.

### Stage 41.1 - Multiplayer Reliability Audit And Reproduction

- Audit ranked Practice queue/search-again/cancel flows, public leaderboard freshness, private request lifecycle, requester routing, notifications, and mobile freshness.
- Use focused browser/Supabase read-only checks where needed.
- Decide whether any issue requires migration/RLS addendum planning.
- Do not implement fixes in this stage.

### Stage 41.2 - Real E2E Harness Expansion

- Add focused real E2E harness coverage for reproduced failure modes.
- Include two-client and three-client flows where safe.
- Include mobile viewport coverage for Practice Multiplayer freshness where feasible.
- Add cleanup/probe support only for the affected temporary users, queues, requests, games, and artifacts.

### Stage 41.3 - Ranked Practice Queue And Search-Again Repair

- Repair ranked Practice search-again, queue cancellation, stale queue participation, and visible status stability only if reproduced or proven by harness diagnostics.
- Preserve trusted ranked queue, finalization, settlement, rating bucket, Daily, gameplay, and Elo boundaries.

### Stage 41.4 - Public Ranked Leaderboard Freshness Repair

- Repair newly eligible player visibility only after identifying whether the root cause is source polling, RPC projection, profile eligibility, rating settlement timing, or test/setup data.
- Preserve display-only leaderboard authority and strict public-field allowlists.

### Stage 41.5 - Private Practice Request Lifecycle And Routing Repair

- Repair active request list cleanup after cancel, decline, expiry, accept, and stale selected states.
- Improve requester-side accepted-game feedback and safe open/resume routing.
- Preserve authenticated-only, Practice-only, unranked-only, public-profile-targeted request boundaries.

### Stage 41.6 - Mobile Multiplayer Freshness And UI Stability Repair

- Repair mobile Practice Multiplayer lobby/request/list freshness if it remains separate after earlier fixes.
- Repair queue button flicker if not already resolved in Stage 41.3.
- Preserve Phase 39 mobile scroll smoothness and avoid broad navigation redesign.

### Stage 41.7 - Final Hardening, Codex-Assisted Pre-Review, Visual Review, Changelog, And Manual Checklist

- Run focused and full verification.
- Run the local visual handoff review gate for Phase 41 user-visible surfaces.
- Create the Phase 41 changelog and manual review checklist.
- Add a Codex-assisted manual-review preflight summary distinguishing automated proof, Codex-attempted browser/manual checks, unavailable checks, and user-only manual review.
- Halt for review before Git handoff.

## Success Criteria

- Ranked Practice queue/search-again/cancel behavior is either repaired or explicitly documented as blocked by a separately gated migration/RLS requirement.
- Cancelled ranked queue entries cannot silently match later if they should be inactive.
- Queue status buttons avoid misleading flicker during refresh.
- Newly eligible public ranked leaderboard players appear consistently or the exact gated blocker is documented.
- Private request cancel, decline, expire, accept, and stale states no longer remain incorrectly active.
- Requesters receive clear accepted-game feedback and can safely open/resume the created participant-owned game.
- Mobile Practice Multiplayer request/lobby/list freshness is improved without broad shell redesign.
- Real E2E coverage catches the critical two-client, three-client, and mobile freshness paths added in Phase 41.
- Public/guest spectator read-only boundaries, Daily claim safety, public profile privacy, ranked settlement, gameplay rules, Elo math, and Phase 39 scroll smoothness remain intact.

## Likely Files And Modules

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerPanelRankedQueue.ts`
- `src/multiplayer/privateMatchmaking.ts`
- `src/leaderboards/publicRankedLeaderboard.ts`
- `src/leaderboards/PublicRankedLeaderboardPanel.tsx`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`
- `e2e/fixtures/`
- `e2e/gameplay/practice-multiplayer-og.spec.ts`
- `e2e/gameplay/practice-multiplayer-go.spec.ts`
- `e2e/gameplay/private-matchmaking.spec.ts`
- affected Supabase migrations/RPC docs only if an addendum authorizes database-contract work.

## Migration/RLS Constraints And Addendum Gates

- Stage 41 should start source/test-only unless Stage 41.1 proves a database-contract issue.
- Any migration/RLS change requires a separate addendum planning stage before migration execution.
- Any migration execution must be additive, explicitly authorized, applied only to the confirmed `brrrdle-dev` Supabase target, and followed by non-printing probes.
- No direct table grants should be added for browser clients unless an approved addendum proves they are safe.
- No broadening of public spectator, public leaderboard, public profile, private request, Daily claim, ranked queue, or rating settlement contracts is allowed without explicit approval.

## Real E2E Harness Strategy

- Prefer failing focused E2E coverage or clear diagnostics before source fixes.
- Use bounded two-client and three-client Supabase-backed flows for ranked queues, private requests, and accepted-game routing.
- Use mobile viewport coverage for Practice Multiplayer freshness where feasible.
- Keep waits bounded and selectors stable.
- Use deterministic cleanup for temporary users, ranked queue rows, private requests, games, Daily claims where touched, and generated artifacts.
- Do not commit screenshots, videos, traces, auth state, tokens, or local session artifacts.
- Keep one local dev server and low worker counts unless a stage explicitly proves safe parallelism.

## Multi-Agent Coordination Strategy

Parallelism is useful only after Stage 41.1 defines disjoint ownership.

Safe early explorer lanes:

- ranked queue/search-again/cancel and E2E gap audit;
- private request lifecycle, notifications, requester routing, and mobile freshness audit;
- public leaderboard eligibility/freshness and rating projection audit.

Implementation should stay sequenced when high-conflict files overlap, especially `src/multiplayer/MultiplayerPanel.tsx`, `src/multiplayer/multiplayerRepository.ts`, `src/multiplayer/multiplayerViewModels.ts`, `e2e/fixtures/`, `e2e/gameplay/`, `supabase/migrations/`, and progress/governance files.

## Codex-Assisted Manual-Review Preflight Expectations

Phase 41 final hardening should add a preflight section to the progress record and review checklist:

- checks Codex verified through automated tests;
- checks Codex attempted in-browser or through non-printing probes;
- checks Codex could not safely verify;
- checks that remain user-only manual review;
- known limitations and resource/browser caveats.

Codex must not check user manual-review boxes unless explicitly authorized by the user.

## Privacy, Supabase, And Public-Profile Constraints

- Do not expose raw auth IDs, emails, private profile fields, sessions, queue internals, rating internals, answers, seeds, tokens, screenshots, videos, traces, auth state, or local artifacts.
- Public profile summaries must remain safe, active, and allowlisted.
- Public leaderboard data remains display-only and non-authoritative.
- Private matchmaking remains authenticated-only, Practice-only, unranked-only, and public-profile-targeted.
- Public/guest spectator contracts remain read-only and unchanged.

## Ranked Queue Constraints

- Preserve trusted ranked queue and finalization paths.
- Preserve rating-settlement authority and idempotency.
- Do not change rating buckets, Elo formulas, match scoring, timeout rules, forfeit rules, or gameplay rules.
- Ranked private invitations and ranked direct challenges remain deferred.

## Leaderboard Constraints

- Keep leaderboard rows sanitized and parser-allowlisted.
- Do not make the public leaderboard a mutation authority.
- Do not expose queue IDs, raw rating internals, raw auth IDs, emails, or private profile data.
- Any freshness repair must identify whether the issue is source polling, RPC projection, profile eligibility, or settlement timing before changing behavior.

## Private Matchmaking Constraints

- Keep private requests unranked Practice only.
- Keep requester/opponent lifecycle actions ownership-scoped.
- Keep accepted-game opening participant-owned and route-safe.
- Do not expand into a full mailbox/social inbox unless a later phase approves it.
- Do not add Daily, ranked, custom-code, spectator, or rating mutation authority.

## Notification And Routing Constraints

- Keep notification work limited to bug-relevant private request and multiplayer routing behavior.
- Do not implement push subscriptions, service workers, browser background push, or production notification infrastructure.
- Preserve browser history, stale selected-game fallbacks, and gameplay auto-centering from Phase 37.

## Mobile Freshness Constraints

- Preserve Phase 39 mobile scroll smoothness.
- Keep mobile fixes focused on Practice Multiplayer list/request/lobby freshness and queue status stability.
- Do not implement compact navigation, Focus Mode, or broader mobile shell overhaul in Phase 41.

## Vercel, Deployment, Gameplay, And Elo Constraints

- No Vercel or Supabase configuration changes.
- No production deployment or release.
- No gameplay-rule changes.
- No scoring formula changes.
- No Elo algorithm changes.
- No stable `brrrdle` repository work.

## Verification Strategy

- Documentation-only stages use lightweight verification only.
- Audit stages use focused read-only/browser/resource checks as needed.
- Source/test stages run focused tests first, then lint, full Vitest, build, API typecheck, diff check, CSV shape check, non-printing scans, ignored-artifact checks, watched-port cleanup, and status.
- E2E-heavy stages should run focused Playwright slices before broad E2E.
- Final hardening should run focused tests, `npm run lint`, `npm run test`, `npm run test:e2e`, `npm run test:full`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, progress CSV shape check, non-printing secret/artifact scan, ignored-artifact check, watched-port/process cleanup, and `git status --short --branch`.

## Visual Review Expectations

Phase 41 final hardening should run the local visual handoff review gate for user-visible affected surfaces. Artifacts should stay ignored/local-only under `test-results/visual-review/phase-41-stage-41-7/`.

## Manual Review Checklist Expectations

The Phase 41 checklist should include:

- ranked queue/search-again/cancel/status checks;
- public leaderboard freshness checks;
- private request lifecycle and requester accepted-game routing checks;
- mobile Practice Multiplayer freshness checks;
- public/guest spectator, Daily, profile privacy, ranked settlement, gameplay/Elo, and Phase 39 scroll non-regression checks;
- a Codex-assisted preflight evidence section.

## GitHub Backup Workflow Expectations

After final manual review and separate authorization, use the governed `brrrdle-github-backup` skill. Do not stage, commit, push, create PRs, merge, delete branches, or run the backup workflow during planning or implementation stages unless explicitly authorized.

## Risks

- Real E2E expansion can become slow or flaky if waits, cleanup, and worker counts are not bounded.
- Ranked queue fixes may reveal database-contract issues that require addendum-gated migration work.
- Leaderboard freshness can be caused by profile eligibility, settlement timing, projection refresh, source polling, or test setup; premature fixes risk masking the real cause.
- Private request lifecycle changes touch high-conflict multiplayer, routing, notification, and E2E surfaces.
- Mobile freshness fixes could accidentally broaden into mobile navigation redesign if scope is not enforced.

## Open Decisions

- Whether Stage 41.1 finds any migration/RLS addendum requirement.
- Whether leaderboard freshness is source-only or database-contract related.
- Whether private request expiry cleanup needs source polling only or RPC/projection changes.
- Whether queue button flicker is source refresh state, RPC response timing, or E2E setup.
- Whether the Codex-assisted manual-review preflight should remain checklist-local or later become a reusable governed workflow.

## Next Gated Action

Create a unified Phase 41 specification for review only. The spec should read this planning brief, the strategy intake, Phase 40 evidence, roadmaps, testing strategy, progress records, and relevant multiplayer/leaderboard/private-request source and E2E surfaces. It should not begin implementation.
