# Phase 41 Implementation Plan - Multiplayer Reliability And Real E2E Hardening

**Status**: Draft implementation plan for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-02.
**Baseline**: local `main` and `origin/main` are expected at `c3d774bc8a611950f889f2f7a487be4e69844fc0`.
**Authority**: Planning only. This plan does not authorize implementation until a later user prompt explicitly authorizes each stage.

## 1. Authority And Boundaries

This plan translates the Phase 41 planning brief, reliability strategy intake, and unified specification into narrow execution gates.

It does not authorize:

- source/runtime implementation;
- test implementation;
- Supabase migration creation or execution;
- Vercel or Supabase configuration changes;
- deployment, staging, commits, pushes, PR creation, merges, releases, or branch deletion;
- public/guest spectation contract changes;
- spectator presence/count/list implementation;
- service workers or push infrastructure;
- gameplay-rule changes;
- scoring or Elo algorithm changes;
- force-push;
- secret printing;
- private data, auth state, screenshots, videos, traces, tokens, or local session artifact exposure;
- running the brrrdle GitHub backup workflow;
- creating or modifying local Codex skills;
- original stable `brrrdle` repository work.

Authority stack:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
5. `planning/phase-41/PLANNING-BRIEF.md`.
6. `planning/specs/phase-41/PHASE-41-MULTIPLAYER-RELIABILITY-AND-REAL-E2E-SPEC-2026-07-02.md`.
7. This plan, once reviewed.
8. Future stage prompts, once explicitly authorized.

If sources conflict on privacy, mutation authority, migration/RLS work, ranked settlement, Daily behavior, public spectator boundaries, deployment/configuration, Git/GitHub operations, or stable repository boundaries, stop and ask for review.

## 2. Current Baseline

Phase 40 is complete, backed up, merged, branch-cleaned, and manually reviewed with follow-up multiplayer reliability issues. The current expected baseline hash is:

`c3d774bc8a611950f889f2f7a487be4e69844fc0`

Current uncommitted planning artifacts are expected from the Phase 41 strategy, planning brief, unified spec, progress records, roadmap/README routing, and user-edited Phase 40 manual checklist.

The checked-off user-edited `planning/phase-40/REVIEW-CHECKLIST.md` must be preserved throughout Phase 41.

## 3. Phase 41 Execution Principles

- Keep Phase 41 as one cohesive reliability macro-phase.
- Keep each implementation stage narrow, single-purpose, and independently reviewable.
- Start with audit/reproduction and real E2E harness expansion before fixes.
- Prefer source/test-only repairs unless the audit proves a database-contract issue.
- Route any migration/RLS need through addendum planning, then a separately authorized migration execution gate.
- Keep high-conflict multiplayer surfaces sequenced unless Stage 41.1 defines safe read-only explorer lanes.
- Use focused tests first during implementation stages.
- Save broad E2E, `npm run test:full`, visual review, changelog, and manual checklist for final hardening unless a shared contract change needs earlier broad proof.
- Preserve gameplay rules, Elo math, Daily integrity, public profile privacy, public/guest spectator read-only boundaries, and Phase 39 scroll smoothness.

## 4. Stage Overview

| Stage | Purpose | Primary Authority | Default Verification |
| --- | --- | --- | --- |
| 41.0 | Protected baseline and review intake | No implementation | Baseline full local gate without E2E |
| 41.1 | Reliability audit and reproduction | Read-only/browser checks only | Lightweight docs plus focused read-only checks |
| 41.2 | Real E2E harness expansion | Source/test-only harness work | Focused E2E plus standard source-stage gate |
| 41.3 | Ranked Practice queue/search-again repair | Source/test-only unless addendum required | Focused ranked tests/E2E plus standard gate |
| 41.4 | Public leaderboard freshness repair | Source/test-only unless addendum required | Focused leaderboard tests/E2E plus standard gate |
| 41.5 | Private request lifecycle/routing repair | Source/test-only unless addendum required | Focused private request tests/E2E plus standard gate |
| 41.6 | Mobile multiplayer freshness/UI stability repair | Source/test-only | Focused mobile multiplayer E2E plus standard gate |
| 41.7 | Final hardening and review handoff | Narrow final fixes only | Full final verification, visual review, changelog, checklist |

## 5. Stage 41.0 - Protected Baseline And Review Intake

### Goal

Confirm that Phase 41 starts from the expected Phase 40 merge baseline and that all existing Phase 41 planning/spec/progress artifacts are recorded before audit or implementation begins.

### Authorized Work

- Read required governance, Phase 40 evidence, Phase 41 strategy/brief/spec/implementation plan, progress records, and package/test surfaces.
- Confirm `pwd`, branch, status, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Preserve `planning/phase-40/REVIEW-CHECKLIST.md`.
- Record current uncommitted Phase 41 planning/spec/progress artifacts.
- Create progress record and matching CSV row, likely progress ID `351`.
- Run watched-port/process/resource checks before and after verification for `5173`, `5174`, `3000`, and `4173`.

### Not Authorized

No audit, source/runtime implementation, test implementation, migration creation/execution, deployment/configuration, Git/GitHub action, backup workflow, or stable repository work.

### Verification

Run sequentially:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

If any command fails, stop, record the exact non-secret failure in progress, and do not proceed to Stage 41.1.

## 6. Stage 41.1 - Multiplayer Reliability Audit And Reproduction

### Goal

Map and, where feasible, reproduce the Phase 40 manual-review reliability observations before changing source or tests.

### Audit Targets

- Ranked Practice search-again, queue cancellation, stale queue participation, and status/button flicker.
- Public ranked leaderboard freshness and eligibility for newly established rated players.
- Private Practice request cancel, decline, expiry, accept, active-list cleanup, and requester accepted-game routing.
- Mobile Practice Multiplayer lobby/request/list freshness.
- Notification/routing seams relevant to accepted private games and stale selected states.
- Supabase/RLS contracts for ranked queue, public leaderboard, private request, participant identity, public profiles, Daily claims, and public spectator boundaries.
- Existing Vitest and Playwright gaps.

### Likely Files

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
- relevant Supabase migrations and docs.

### Decisions Required

- Whether Stage 41.2 can remain source/test-only.
- Whether ranked queue cancellation/stale matching needs migration/RLS addendum planning.
- Whether leaderboard freshness is source polling, RPC/projection filtering, profile eligibility, settlement timing, or test-data related.
- Whether private request expiry/stale cleanup needs source refresh only or RPC/projection repair.
- Whether mobile freshness belongs in Stage 41.6 or is solved by earlier source repairs.

### Verification

Use focused read-only checks only. Use one local dev server only if browser reproduction requires it, then stop it.

Run:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

If any verification or audit step fails, record the exact non-secret failure and do not proceed to Stage 41.2.

## 7. Optional Migration/RLS Addendum Gate

Stage 41.1 may discover a database-contract issue. If so, insert an addendum planning gate before the affected source repair.

### Addendum Requirements

The addendum must define:

- exact SQL/RLS contract change;
- whether ranked queue, public leaderboard, private requests, or another contract is affected;
- additive migration shape;
- grants for `anon`, `authenticated`, and `public`;
- allowed and forbidden fields;
- non-printing probes;
- rollback/idempotency notes;
- stop conditions;
- proof that Daily, public spectator, public profile privacy, ranked settlement, gameplay rules, and Elo math are preserved.

### Migration Execution Requirements

Migration execution requires a separate explicit prompt. It must create exactly one additive migration unless the user explicitly authorizes otherwise, confirm the `brrrdle-dev` Supabase target without printing secrets, run non-printing probes, and halt before source integration resumes.

## 8. Stage 41.2 - Real E2E Harness Expansion

### Goal

Add the smallest deterministic real E2E harness coverage needed to catch the reliability issues before fixes land.

### Likely Work

- Extend cleanup/probe helpers for ranked queue rows, private request rows, multiplayer games, rating/leaderboard setup data, and temporary users.
- Add or extend two-client ranked Practice search-again/cancel diagnostics.
- Add a three-client ranked queue cancellation/stale-participation scenario if safe and bounded.
- Add private request cancel/decline/accept/requester-routing diagnostics.
- Add mobile viewport Practice Multiplayer freshness diagnostics where feasible.
- Keep screenshots, videos, traces, auth state, tokens, and local artifacts untracked and unstaged.

### Likely Files

- `e2e/fixtures/cleanup.ts`
- `e2e/fixtures/gameActions.ts`
- `e2e/fixtures/supabaseAdmin.ts`
- `e2e/fixtures/twoClientGame.ts`
- potential new three-client helper under `e2e/fixtures/`
- `e2e/gameplay/practice-multiplayer-og.spec.ts`
- `e2e/gameplay/practice-multiplayer-go.spec.ts`
- `e2e/gameplay/private-matchmaking.spec.ts`

### Verification

Run focused harness tests first, then:

- `npm run lint`
- `npm run test`
- focused relevant Playwright/E2E command for the new harness coverage
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

If verification fails, record the exact non-secret failure and do not proceed to Stage 41.3.

## 9. Stage 41.3 - Ranked Practice Queue And Search-Again Repair

### Goal

Repair ranked Practice queue/search-again/cancellation/stale-participation/status stability issues supported by Stage 41.1 and Stage 41.2 evidence.

### Likely Work

- Stabilize queue state transitions in `MultiplayerPanel`.
- Ensure cancellation state prevents further stale active polling/matching from the current client.
- Ensure search-again creates or reuses only the intended current queue participation.
- Avoid misleading `Already queued`/`Ranked queue working` flicker during refresh.
- Harden parser/repository handling only if source evidence requires it.
- Route any RPC/database-contract gap to the addendum gate instead of patching around it in UI.

### Constraints

- No Elo, K-factor, rating bucket, rank-band, scoring, timeout, forfeit, Daily, Hard Mode, or gameplay-rule changes.
- No ranked private invitations or ranked direct challenges.
- No public/guest spectator or public profile contract changes.

### Verification

Run focused ranked queue tests first, including the relevant new Stage 41.2 E2E slices, then:

- `npm run lint`
- `npm run test`
- focused ranked Practice Playwright/E2E command
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

## 10. Stage 41.4 - Public Ranked Leaderboard Freshness Repair

### Goal

Repair public ranked leaderboard freshness or eligibility only after the root cause is classified.

### Required Root-Cause Classification

Before any source change, identify whether the issue is:

- source polling/cache behavior;
- RPC/projection filtering;
- active public profile eligibility;
- rating settlement timing;
- E2E/test-data setup;
- a database-contract issue requiring addendum planning.

### Likely Work

- Improve refresh behavior or empty/loading copy if source-only.
- Add focused parser/view-model tests if payload assumptions are involved.
- Add focused E2E/probe coverage for newly eligible established players if safe.
- Keep public leaderboard display-only and sanitized.

### Constraints

- No direct browser reads from private rating/profile tables.
- No public exposure of private, hidden, suspended, missing, or malformed profiles.
- No leaderboard mutation authority.
- No Elo/rating-settlement rule changes.

### Verification

Run focused leaderboard tests/E2E first, then the standard source-stage gate:

- `npm run lint`
- `npm run test`
- focused relevant Playwright/E2E command if browser coverage changed
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

## 11. Stage 41.5 - Private Practice Request Lifecycle And Routing Repair

### Goal

Repair private Practice request lifecycle cleanup and requester accepted-game feedback/routing while preserving the Phase 40 authenticated-only private request contract.

### Likely Work

- Keep inactive request rows out of active incoming/outgoing lists or clearly mark them as inactive.
- Ensure cancel, decline, expiry, and accept states refresh predictably.
- Improve requester-side accepted-game feedback and safe open/resume routing.
- Keep acceptor-side participant-owned game opening intact.
- Add/extend tests for cancel/decline/expiry/accept cleanup and requester routing.
- Limit notification/routing changes to the bug-relevant private request path.

### Constraints

- Private requests remain authenticated-only, Practice-only, unranked-only, and public-profile-targeted.
- No Daily, ranked, custom-code, spectator, rating, queue, profile, or account mutation expansion.
- No full mailbox/inbox/social graph/notification-center redesign.
- No raw auth IDs, emails, private profile fields, sessions, queue internals, rating internals, answers, seeds, tokens, screenshots, videos, traces, auth state, or local artifacts.

### Verification

Run focused private request tests/E2E first, then:

- `npm run lint`
- `npm run test`
- focused private matchmaking Playwright/E2E command
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

## 12. Stage 41.6 - Mobile Multiplayer Freshness And UI Stability Repair

### Goal

Repair mobile Practice Multiplayer freshness and UI stability issues that remain after the ranked and private request stages.

### Likely Work

- Verify mobile viewport request/lobby/list refresh behavior.
- Repair stale visible state after create, cancel, decline, accept, expire, route, and selected-game transitions.
- Repair queue status/button flicker if not already covered by Stage 41.3.
- Preserve text fit, control reachability, and Phase 39 mobile scroll smoothness.

### Constraints

- No compact navigation, Focus Mode, progression HUD, or broad mobile shell overhaul.
- No redesign or decorative churn.
- No gameplay/Elo/Daily/spectator/privacy contract changes.

### Verification

Run focused mobile multiplayer E2E/browser checks first, then:

- `npm run lint`
- `npm run test`
- focused relevant Playwright/E2E command for mobile multiplayer freshness
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

## 13. Stage 41.7 - Final Hardening, Codex-Assisted Pre-Review, Visual Review, Changelog, And Manual Checklist

### Goal

Complete Phase 41 with final regression review, full verification, visual handoff evidence, changelog, manual checklist, and Codex-assisted pre-review evidence.

### Likely Work

- Review Stages 41.1 through 41.6 for regressions, stale copy, privacy gaps, E2E gaps, cleanup gaps, and resource issues.
- Add only narrow final-hardening fixes if required.
- Run focused coverage for ranked queue/search-again/cancel/stale status, public leaderboard freshness, private request lifecycle/requester routing, mobile multiplayer freshness, public/guest spectator non-regression, Daily/ranked/gameplay/Elo non-regression, and Phase 39 scroll smoothness preservation.
- Run the local visual handoff review gate for user-visible Phase 41 surfaces under ignored `test-results/visual-review/phase-41-stage-41-7/`.
- Create `planning/phase-41/CHANGELOG.md`.
- Create `planning/phase-41/REVIEW-CHECKLIST.md`.
- Add Codex-assisted pre-review evidence distinguishing automated proof, Codex-attempted checks, unavailable checks, and user-only manual review.

### Final Verification

Run:

- focused tests
- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run test:full`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port/process cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

If verification fails, record the exact non-secret failure in progress and do not proceed to Git handoff preparation.

## 14. Success Criteria

Phase 41 is complete only when:

- ranked Practice search-again and queue cancellation are reliable or any remaining blocker is documented and routed to a gated addendum;
- cancelled/stale ranked queue entries cannot silently create invalid later matches;
- queue buttons/status do not mislead during refresh;
- public leaderboard freshness for newly eligible rated players is repaired or the exact database/test-data blocker is documented;
- private request cancel, decline, expire, and accept states clean up from active lists correctly;
- requesters receive clear accepted-game feedback and can safely open/resume the participant-owned game;
- mobile Practice Multiplayer lobby/request/list freshness is improved without broad mobile redesign;
- real E2E coverage includes the critical current two-client, three-client, and mobile freshness paths;
- final materials clearly separate automated proof, Codex-attempted checks, unavailable checks, and user-only manual review;
- public/guest spectator read-only boundaries, Daily claim safety, public profile privacy, ranked settlement, gameplay rules, Elo math, and Phase 39 scroll smoothness remain intact.

## 15. Likely Files And Ownership

High-conflict source files:

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerPanelRankedQueue.ts`
- `src/multiplayer/privateMatchmaking.ts`
- `src/leaderboards/publicRankedLeaderboard.ts`
- `src/leaderboards/PublicRankedLeaderboardPanel.tsx`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`

High-conflict test/E2E files:

- `e2e/fixtures/cleanup.ts`
- `e2e/fixtures/gameActions.ts`
- `e2e/fixtures/supabaseAdmin.ts`
- `e2e/fixtures/twoClientGame.ts`
- `e2e/gameplay/practice-multiplayer-og.spec.ts`
- `e2e/gameplay/practice-multiplayer-go.spec.ts`
- `e2e/gameplay/private-matchmaking.spec.ts`

Coordinator-owned files:

- `planning/phase-41/CHANGELOG.md`
- `planning/phase-41/REVIEW-CHECKLIST.md`
- `planning/testing/TESTING-SUITE.md`
- `docs/supabase.md`
- `docs/ranked-multiplayer.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

Parallel agents should be read-only explorers until Stage 41.1 defines disjoint implementation ownership.

## 16. Migration/RLS Gates

Do not create or run SQL during Stage 41 unless a later user prompt explicitly authorizes it.

If needed, insert:

1. **Stage 41.xA - Migration/RLS addendum planning**: documentation-only contract, grants, allowlists, forbidden fields, probes, rollback/idempotency, and stop conditions.
2. **Stage 41.xB - Migration/RLS execution**: exactly one additive migration, confirmed `brrrdle-dev` target, non-printing probes, lightweight verification, and halt before source integration resumes.

Potential addendum triggers:

- cancelled ranked queue rows can still be matched because an RPC contract ignores inactive status;
- leaderboard freshness requires projection/RPC eligibility change;
- private request list/expiry state cannot be repaired through source refresh because the RPC returns stale active rows;
- any privacy/RLS leak or forbidden field appears.

## 17. Stop Conditions

Stop and report if:

- the stable `brrrdle` repository would be touched;
- the repo baseline is not the expected `brrrdle-dev` state;
- `planning/phase-40/REVIEW-CHECKLIST.md` would be overwritten or reverted;
- a fix requires unapproved migration/RLS work;
- a fix requires exposing raw auth IDs, emails, private profile data, sessions, queue internals, rating internals, answers, seeds, tokens, or local artifacts;
- ranked queue repair would change Elo, settlement, rating buckets, rank bands, scoring, or gameplay rules;
- Daily claim safety or public/guest spectator read-only boundaries are implicated;
- cleanup cannot reliably remove temporary users, queues, games, private requests, or generated artifacts;
- focused tests cannot isolate a stage failure;
- verification fails.

## 18. Open Decisions

- Does Stage 41.1 prove any migration/RLS addendum requirement?
- Can three-client E2E remain stable enough for broad E2E, or should part of it remain focused final-hardening evidence?
- Should leaderboard freshness be repaired through source refresh, test setup, profile eligibility handling, or database projection work?
- Should private request expiry cleanup use source refresh/filtering, RPC projection changes, or both?
- Should Codex-assisted manual-review preflight remain Phase 41-local or become a future reusable governed workflow after it is proven?

## 19. Next Gated Prompt

The next safe action is Stage 41.0 protected baseline and review intake only. It should record the current Phase 41 planning/spec/progress artifacts, preserve the user-edited Phase 40 checklist, and run the protected baseline gate before any Stage 41.1 audit work begins.
