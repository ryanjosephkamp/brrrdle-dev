# Phase 41 Multiplayer Reliability And Real E2E Hardening Spec

**Status**: Draft unified specification for review.
**Date**: 2026-07-02.
**Repository**: `brrrdle-dev` only.
**Authority**: Implements the reviewed Phase 41 planning brief once the user explicitly authorizes later implementation stages.

## 1. Status And Authority

This specification is implementation-oriented planning only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, local Codex skill creation or modification, or original stable `brrrdle` repository work.

Current authority order:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
5. `planning/phase-41/PLANNING-BRIEF.md`.
6. `planning/phase-41/MULTIPLAYER-RELIABILITY-AND-REAL-E2E-STRATEGY.md`.
7. This specification, once reviewed.
8. Future Phase 41 implementation plan and stage prompts, once explicitly authorized.

If any source conflicts on migration/RLS authority, public/private data exposure, ranked queue authority, rating settlement, Daily behavior, public/guest spectation contracts, deployment/configuration, Git/GitHub operations, or stable repository boundaries, stop and ask for review.

## 2. Current Baseline

Phase 40 is complete, backed up, merged, branch-cleaned, and manually reviewed with follow-up multiplayer reliability issues. The expected local and remote `main` hash is:

`c3d774bc8a611950f889f2f7a487be4e69844fc0`

Phase 40 completed:

- public profile route/card and clickable safe identity integration;
- strict public profile parser allowlists and forbidden-field defenses;
- authenticated-only direct unranked Practice private match request migration/RLS contract;
- v2 accept-contract repair migration deriving raw participant IDs server-side;
- private match request source integration for create, list, cancel, decline, and accept;
- Practice Multiplayer incoming/outgoing private request UI;
- accepted-game participant-owned load/open behavior;
- two-client private matchmaking Playwright E2E hardening;
- preservation of Phase 39 mobile scroll smoothness and Phase 38 public/guest spectator read-only boundaries.

Phase 40 manual review found follow-up reliability concerns rather than rollback blockers. Phase 41 is therefore rerouted to multiplayer reliability and real E2E hardening before continuing into public stats, developer dashboard, onboarding, help, progression HUD, Focus Mode, mobile shell overhaul, or theme work.

## 3. Goals

Phase 41 should harden current multiplayer behavior and testing coverage without expanding product scope.

Goals:

- reproduce or safely characterize ranked Practice search-again, queue cancellation, stale queue participation, and queue status stability issues;
- repair ranked Practice reliability issues only after evidence or deterministic diagnostics identify the cause;
- reproduce or characterize public ranked leaderboard freshness/eligibility issues for newly established rated players;
- repair public leaderboard freshness only after identifying whether the issue is source polling, RPC/projection shape, profile eligibility, rating settlement timing, or test setup;
- repair private Practice request cancel, decline, expire, accept, active-list cleanup, and requester-side accepted-game routing;
- improve mobile Practice Multiplayer lobby, request, list, and queue-status freshness without broad mobile UX redesign;
- expand real two-client and three-client Supabase-backed E2E harness coverage so future regressions are caught before manual review;
- formalize a Codex-assisted manual-review preflight summary for future checklist handoffs;
- preserve gameplay rules, Elo math, Daily integrity, public profile privacy, public/guest spectator boundaries, and Phase 39 scroll smoothness.

## 4. In Scope

Phase 41 may include, after the appropriate stage authorization:

- read-only audit and reproduction for ranked queue, public leaderboard, private request, notification/routing, mobile freshness, and E2E harness gaps;
- focused real E2E fixture expansion for two-client and three-client Supabase-backed flows;
- focused mobile viewport multiplayer freshness coverage where feasible;
- ranked Practice queue/search-again cancellation, stale participation, and visible status stability repairs;
- public ranked leaderboard freshness or eligibility repairs if the root cause is identified;
- private Practice request lifecycle cleanup and requester accepted-game routing repairs;
- notification/routing fixes directly required for request lifecycle and accepted-game feedback;
- Codex-assisted final pre-review documentation distinguishing automated proof, Codex-attempted browser/manual checks, unavailable checks, and user-only checks;
- progress, changelog, review-checklist, testing documentation, and roadmap updates needed to keep Phase 41 discoverable and reviewable.

## 5. Out Of Scope

Phase 41 must not include:

- public site stats, private developer dashboard, onboarding, help, or tutorial UX;
- EXP, coin, collectible counters, progression HUD, Focus Mode, compact navigation, or broader mobile UX shell overhaul;
- theme proposal modernization or full concrete theme implementation;
- full mailbox, notification-center, inbox, or push-notification redesign;
- spectator presence/count/list implementation;
- public/guest spectation contract changes;
- public social graph, friends/followers, public DMs, chat, marketplace, bots, or community feeds;
- ranked private invitations, ranked direct challenges, Daily match requests, or Daily custom invitations;
- service workers, push subscriptions, production deployment, release, or Vercel/Supabase configuration changes;
- gameplay-rule changes, scoring changes, Elo algorithm changes, K-factor changes, rank-band changes, rating-settlement rule changes, timeout rule changes, forfeit precedence changes, Daily answer/claim behavior changes, or Hard Mode rule changes;
- original stable `brrrdle` repository work.

## 6. Product Requirements

### 6.1 Ranked Practice Queue Reliability

Ranked Practice queue work must remain within existing trusted queue and settlement authority.

Required behavior:

- search-again from a completed ranked Practice game must create or reuse only valid current queue participation;
- cancellation must prevent the cancelled queue entry from later matching silently;
- stale queue entries must be expired, ignored, or surfaced safely according to existing queue contract;
- visible queue status and buttons must avoid misleading flicker during polling/refresh;
- matched games must continue to be opened through participant-owned reads;
- errors must be actionable without exposing queue internals or raw identifiers.

Preserved behavior:

- trusted finalization remains the only ranked settlement path;
- rating bucket, rating transaction, finalization, and idempotency boundaries remain intact;
- timed ranked Practice and untimed ranked Practice contracts remain separate where currently separate;
- Daily Multiplayer remains strictly asynchronous and outside ranked Practice queue fixes.

### 6.2 Public Ranked Leaderboard Freshness

Leaderboard work must preserve display-only, sanitized public leaderboard behavior.

Required behavior:

- newly eligible rated players should appear after the approved eligibility requirements are met;
- empty or stale leaderboard states should show accurate copy and recover through safe refresh behavior;
- source code must not guess eligibility by reading private profile, rating transaction, or auth data directly;
- parser allowlists and forbidden-field defenses must stay strict.

Root-cause classification is required before repair:

- source polling or cache invalidation;
- RPC/projection filtering;
- public profile active/private/hidden/suspended eligibility;
- rating settlement or transaction timing;
- E2E fixture/test setup.

### 6.3 Private Practice Request Lifecycle

Private matchmaking reliability must remain authenticated-only, Practice-only, unranked-only, and public-profile-targeted.

Required behavior:

- outgoing cancel removes or clearly marks the request as inactive for the requester;
- incoming decline removes or clearly marks the request as inactive for the opponent;
- expired requests do not remain actionable in active lists;
- accepted requests do not remain actionable in incoming/outgoing active lists;
- requester-side accepted-game feedback clearly identifies that the game is ready and provides safe open/resume routing;
- acceptor-side open routing remains participant-owned and safe;
- stale selected requests fall back gracefully.

Forbidden behavior:

- exposing raw auth IDs, emails, private profile fields, sessions, queue internals, rating internals, answers, seeds, tokens, screenshots, videos, traces, auth state, or local artifacts;
- adding Daily, ranked, custom-code, spectator, rating, queue, profile, or account mutation authority through private request fixes;
- turning private requests into a public social graph or public browse surface.

### 6.4 Mobile Practice Multiplayer Freshness

Mobile fixes must be freshness and stability fixes, not a navigation redesign.

Required behavior:

- Practice Multiplayer lobby/request/list surfaces refresh predictably after create, join, cancel, decline, accept, expire, and route actions;
- mobile queue/request controls must remain reachable and not visually misleading;
- Phase 39 mobile scroll smoothness must be preserved;
- fixes should prefer source state, polling/subscription, stale-state, or copy adjustments over broad layout changes.

Deferred mobile work:

- compact navigation;
- Focus Mode;
- progression HUD/header counters;
- broader mobile shell overhaul.

### 6.5 Codex-Assisted Manual-Review Preflight

Phase 41 final hardening should add a human-facing preflight summary to the progress evidence and manual checklist.

The preflight should distinguish:

- automated tests that passed;
- browser/manual checks Codex actually attempted;
- non-printing Supabase/RLS probes Codex ran;
- checks Codex could not safely run or could only partially characterize;
- user-only manual checklist items;
- known caveats, resource limits, and browser limitations.

Codex must not check user manual-review boxes unless explicitly authorized by the user.

## 7. Data And Privacy Requirements

Phase 41 must preserve existing privacy boundaries:

- public profile summaries remain active, safe, and allowlisted;
- public leaderboard rows remain display-only and sanitized;
- participant identity summaries remain participant-scoped;
- public/guest spectator projections remain read-only and unchanged;
- private match requests remain authenticated participant-scoped;
- raw auth IDs, emails, private profile fields, raw projections, player sessions, serialized sessions, queue internals, rating internals, rating transactions, answers, seeds, service IDs, tokens, screenshots, videos, traces, auth state, and local artifacts must not be printed, displayed, logged in progress, or exposed through browser payloads.

If evidence suggests a current payload violates these constraints, stop and route to the safest privacy or migration/RLS gate before source integration continues.

## 8. Migration/RLS Constraints

No migration is authorized by this spec alone.

Stage 41 should default to source/test-only unless Stage 41.1 proves a database-contract issue.

Any migration/RLS work requires:

- a separate addendum planning stage;
- explicit review before migration execution;
- exactly one additive migration per authorized execution stage unless the user explicitly broadens scope;
- confirmed `brrrdle-dev` Supabase target before remote execution;
- no secret printing;
- non-printing probes for grants, allowed fields, forbidden-field denial, participant/nonparticipant denial, stale/cancelled/expired behavior, Daily/ranked exclusions where relevant, idempotency, and mutation boundaries;
- rollback/idempotency notes;
- documentation updates only where needed.

Migration/RLS work must not:

- broaden public spectator, public leaderboard, public profile, private request, ranked queue, Daily claim, or rating settlement contracts without explicit approval;
- add anonymous mutation authority;
- add direct browser table grants for private data;
- add public visibility for private requests, queue participation, rating internals, sessions, answers, seeds, or service identifiers.

## 9. Real E2E Strategy

Phase 41 real E2E expansion is a first-class deliverable, not just final verification.

Harness expectations:

- add failing or diagnostic focused E2E coverage before source fixes where feasible;
- include two-client Supabase-backed flows for private request and ranked queue behavior;
- include three-client Supabase-backed flows for stale/cancelled ranked queue participation where safe;
- include mobile viewport coverage for Practice Multiplayer freshness where feasible;
- keep waits bounded and selectors resilient;
- prefer deterministic fixture helpers over copy/paste test setup;
- clean up temporary auth users, queue rows, private requests, multiplayer games, Daily claims where touched, and generated artifacts;
- run with one local dev server and conservative worker counts unless a stage proves safe parallelism;
- do not commit screenshots, videos, traces, auth state, tokens, or local session artifacts.

Likely E2E surfaces:

- `e2e/fixtures/cleanup.ts`
- `e2e/fixtures/gameActions.ts`
- `e2e/fixtures/supabaseAdmin.ts`
- `e2e/fixtures/twoClientGame.ts`
- `e2e/gameplay/practice-multiplayer-og.spec.ts`
- `e2e/gameplay/practice-multiplayer-go.spec.ts`
- `e2e/gameplay/private-matchmaking.spec.ts`

## 10. Multi-Agent Strategy

Parallelism should be considered only after Stage 41.1 defines disjoint ownership.

Safe audit/explorer lanes:

- ranked queue, search-again, cancellation, stale participation, and three-client E2E gap audit;
- private request lifecycle, requester routing, notification, and mobile freshness audit;
- public leaderboard eligibility/freshness and rating projection audit.

Implementation lanes must avoid overlapping high-conflict writers. Sequence work when these files overlap:

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
- `e2e/gameplay/`
- `supabase/migrations/`
- progress and planning files.

The coordinator must own final integration, progress ledger updates, final verification, and user-facing prompt packages.

## 11. Recommended Stage Breakdown

### Stage 41.0 - Protected Baseline And Review Intake

Purpose:

- confirm repository state and baseline hash;
- preserve the user-edited Phase 40 checklist;
- record current Phase 41 planning/spec/progress artifacts;
- run the protected baseline verification gate before audit or implementation.

Expected verification:

- watched-port/process/resource checks;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port cleanup check;
- `git status --short --branch`.

### Stage 41.1 - Multiplayer Reliability Audit And Reproduction

Purpose:

- audit ranked Practice queue/search-again/cancel flows;
- audit public leaderboard freshness and eligibility;
- audit private request lifecycle, accepted-game routing, notifications, and mobile freshness;
- inspect relevant Supabase/RLS contracts;
- run read-only browser/resource checks as needed;
- decide whether Stage 41.2 can remain source/test-only and whether any migration/RLS addendum is required.

Stop conditions:

- any privacy/RLS issue requiring database-contract work;
- any reproduction that requires secrets/private data printing;
- any evidence that the issue is outside Phase 41 scope.

### Stage 41.2 - Real E2E Harness Expansion

Purpose:

- add the smallest deterministic two-client, three-client, and mobile E2E coverage needed to catch the current reliability issues;
- expand cleanup helpers for affected temporary users, queue entries, requests, and games;
- keep the harness bounded and non-authoritative on product changes.

Expected coverage:

- ranked Practice search-again/cancel/stale queue diagnostics;
- private request cancel/decline/accept/requester-routing diagnostics;
- mobile Practice Multiplayer freshness diagnostics.

### Stage 41.3 - Ranked Practice Queue And Search-Again Repair

Purpose:

- repair ranked Practice search-again and queue cancellation behavior;
- prevent cancelled/stale queue participation from matching later when it should be inactive;
- stabilize visible queue status and button states.

Constraints:

- no Elo formula, rating bucket, rank-band, scoring, timeout, forfeit, Daily, or gameplay rule changes;
- no migration unless Stage 41.1/41.2 routed through an addendum and separate execution gate.

### Stage 41.4 - Public Ranked Leaderboard Freshness Repair

Purpose:

- repair public ranked leaderboard freshness/eligibility only after root-cause classification;
- preserve authenticated display-only RPC use and strict parser allowlists.

Constraints:

- no direct private rating/profile reads from browser source;
- no public exposure of private, hidden, suspended, or malformed profiles;
- no leaderboard mutation authority.

### Stage 41.5 - Private Practice Request Lifecycle And Routing Repair

Purpose:

- repair cancel/decline/expire/accept cleanup in active request lists;
- improve requester-side accepted-game feedback and safe open/resume routing;
- preserve acceptor-side participant-owned game opening.

Constraints:

- no ranked, Daily, custom-code, spectator, rating, queue, profile, or account mutation authority expansion;
- no full mailbox/notification redesign;
- no public social graph expansion.

### Stage 41.6 - Mobile Multiplayer Freshness And UI Stability Repair

Purpose:

- repair mobile Practice Multiplayer freshness and stale visible state that remains after earlier stages;
- repair queue button flicker if not already resolved by Stage 41.3;
- verify Phase 39 mobile scroll smoothness remains intact.

Constraints:

- no compact navigation, Focus Mode, progression HUD, or broad mobile shell overhaul;
- no decorative redesign or heavy layout churn.

### Stage 41.7 - Final Hardening, Codex-Assisted Pre-Review, Visual Review, Changelog, And Manual Checklist

Purpose:

- review all Phase 41 work for regressions, stale copy, privacy gaps, and cleanup needs;
- run focused and full verification;
- run the visual handoff review gate for user-visible surfaces;
- create `planning/phase-41/CHANGELOG.md`;
- create `planning/phase-41/REVIEW-CHECKLIST.md`;
- add Codex-assisted manual-review preflight evidence;
- halt for user review before Git handoff.

Expected final verification:

- focused tests;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run test:full`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port/process cleanup check;
- `git status --short --branch`.

## 12. Success Criteria

Phase 41 is successful when:

- ranked Practice search-again and queue cancellation are reliable or any remaining blocker is documented and routed to a gated addendum;
- cancelled/stale ranked queue entries cannot silently create invalid later matches;
- queue buttons/status no longer mislead users during refresh;
- public leaderboard freshness for newly eligible rated players is repaired or the exact database/test-data blocker is documented;
- private request cancel, decline, expire, and accept states clean up from active lists correctly;
- requesters receive clear accepted-game feedback and can safely open/resume the created participant-owned game;
- mobile Practice Multiplayer lobby/request/list freshness is improved without broad mobile redesign;
- real E2E coverage includes the critical current multiplayer reliability paths;
- final manual-review materials clearly separate automated proof, Codex-attempted checks, unavailable checks, and user-only checks;
- public/guest spectator read-only boundaries, Daily claim safety, public profile privacy, ranked settlement, gameplay rules, Elo math, and Phase 39 scroll smoothness remain intact.

## 13. Likely Files And Modules

Likely source files:

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerPanelRankedQueue.ts`
- `src/multiplayer/privateMatchmaking.ts`
- `src/leaderboards/publicRankedLeaderboard.ts`
- `src/leaderboards/PublicRankedLeaderboardPanel.tsx`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`

Likely test/E2E files:

- `e2e/fixtures/cleanup.ts`
- `e2e/fixtures/gameActions.ts`
- `e2e/fixtures/supabaseAdmin.ts`
- `e2e/fixtures/twoClientGame.ts`
- `e2e/gameplay/practice-multiplayer-og.spec.ts`
- `e2e/gameplay/practice-multiplayer-go.spec.ts`
- `e2e/gameplay/private-matchmaking.spec.ts`
- relevant component and repository tests near touched source files.

Likely documentation/progress files:

- `planning/phase-41/IMPLEMENTATION-PLAN.md`
- `planning/phase-41/CHANGELOG.md`
- `planning/phase-41/REVIEW-CHECKLIST.md`
- `planning/testing/TESTING-SUITE.md`
- `docs/supabase.md`
- `docs/ranked-multiplayer.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

## 14. Deferred Routing Decisions

Phase 41 explicitly routes:

- public site stats, private developer dashboard, onboarding, help, and tutorial UX to Phase 42;
- EXP/coin/collectible header counters, Focus Mode, compact navigation, and broader mobile UX shell overhaul to Phase 43 or later;
- theme proposal modernization to Phase 44 or later;
- full concrete theme work to Phase 45 or later;
- full mailbox/notification redesign to a later notification phase;
- spectator presence/count/list to a later privacy/RLS-gated phase;
- service workers, push subscriptions, production deployment/release, gameplay-rule changes, and Elo changes to later gated phases.

## 15. Verification Strategy

Verification cadence:

- documentation-only stages use lightweight verification only;
- audit stages use focused read-only/browser/resource checks as needed;
- source/test stages run focused tests first, then broader verification;
- E2E-heavy stages run focused Playwright slices before broad E2E;
- final hardening runs full verification and visual review.

Minimum source-stage verification:

- focused relevant tests;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

Final hardening must additionally run:

- `npm run test:e2e`;
- `npm run test:full`;
- local visual handoff review gate.

## 16. Visual Review Expectations

Phase 41 final hardening should run the local visual handoff review gate for user-visible affected surfaces. Expected visual surfaces include:

- Practice Multiplayer ranked queue/search-again status;
- public ranked leaderboard refresh/empty/freshness states;
- Practice Multiplayer incoming/outgoing private request lifecycle states;
- accepted-game feedback and safe open/resume routing;
- mobile Practice Multiplayer lobby/request/list freshness states.

Visual artifacts must remain ignored/local-only under:

`test-results/visual-review/phase-41-stage-41-7/`

Do not stage or expose screenshots, videos, traces, auth state, tokens, or local session artifacts.

## 17. Manual Checklist Expectations

The Phase 41 manual review checklist should include:

- ranked Practice search-again and queue cancellation checks;
- stale ranked queue participation checks;
- queue status/button flicker checks;
- public leaderboard newly eligible player freshness checks;
- private request cancel/decline/expire/accept cleanup checks;
- requester-side accepted-game feedback/open-resume checks;
- mobile Practice Multiplayer freshness checks;
- public/guest spectator read-only non-regression checks;
- Daily, ranked settlement, gameplay rules, Elo math, public profile privacy, and Phase 39 scroll non-regression checks;
- Codex-assisted preflight evidence summary.

## 18. Risks

- Three-client E2E can become slow or flaky without strict cleanup and bounded waits.
- Queue cancellation issues may be database-contract related and require an addendum before repair.
- Leaderboard freshness could be test-data, source-cache, profile-eligibility, RPC, or settlement timing related.
- Private request lifecycle fixes touch high-conflict multiplayer state, routing, notifications, and E2E surfaces.
- Mobile freshness fixes could drift into broader mobile UX work if not carefully constrained.
- Attempting to fix queue or leaderboard symptoms without root-cause classification could mask real RLS or data-contract problems.

## 19. Open Decisions

- Does Stage 41.1 prove any migration/RLS addendum is needed?
- Is ranked queue stale cancellation source-only, RPC-contract related, or data-cleanup related?
- Is leaderboard freshness source polling, RPC/projection filtering, public profile eligibility, rating settlement timing, or E2E setup?
- Does private request expiry cleanup need source refresh only or RPC/projection repair?
- Should the Codex-assisted manual-review preflight remain Phase 41 checklist-local or later become a reusable governed workflow?
- Can three-client E2E stay reliable enough for full `npm run test:e2e`, or should part of it remain a focused final-hardening slice with clear cleanup?

## 20. Next Gated Action

Create a detailed Phase 41 implementation plan for review only.

The implementation plan should turn this unified spec into a staged execution plan covering:

- Stage 41.0 protected baseline and review intake;
- Stage 41.1 multiplayer reliability audit and reproduction;
- Stage 41.2 real E2E harness expansion;
- Stage 41.3 ranked Practice queue and search-again repair;
- Stage 41.4 public ranked leaderboard freshness repair;
- Stage 41.5 private Practice request lifecycle and routing repair;
- Stage 41.6 mobile multiplayer freshness and UI stability repair;
- Stage 41.7 final hardening, Codex-assisted pre-review, visual review, changelog, and manual checklist.

The implementation plan must not begin implementation.
