# Phase 42 Site Stats Developer Dashboard Onboarding And Help Spec

**Status**: Draft unified specification for review.
**Date**: 2026-07-03.
**Repository**: `brrrdle-dev` only.
**Authority**: Implements the reviewed Phase 42 planning brief once the user explicitly authorizes later implementation stages.

## 1. Status And Authority

This specification is implementation-oriented planning only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, local Codex skill creation or modification, or original stable `brrrdle` repository work.

Current authority order:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
5. `planning/phase-42/PLANNING-BRIEF.md`.
6. This specification, once reviewed.
7. Future Phase 42 implementation plan and stage prompts, once explicitly authorized.

If any source conflicts on privacy boundaries, admin access, Supabase/RLS authority, ranked queue behavior, public/guest spectation contracts, Daily behavior, gameplay rules, Elo/rating behavior, deployment/configuration, Git/GitHub operations, or stable repository boundaries, stop and ask for review.

## 2. Current Baseline

Phase 41 is complete, backed up, merged, branch-cleaned, and manually reviewed with one minor follow-up. The expected local and remote `main` hash is:

`7acff9d4d414533afb2930cc7fa547cec8abfee9`

Phase 41 completed:

- real Supabase-backed multiplayer reliability E2E expansion;
- reusable three-client E2E harness support;
- ranked Practice queue cancellation, stale-row, and search-again reliability repairs;
- public ranked leaderboard freshness repair;
- private Practice request lifecycle cleanup and requester-side accepted-game routing;
- mobile Practice Multiplayer route/focus/visibility freshness repair;
- Codex-assisted manual-review preflight and visual handoff review;
- preservation of Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, and Phase 38 public/guest spectator read-only boundaries.

Phase 41 manual review was successful overall but not fully clean. The single remaining follow-up is that ranked Practice queue buttons on the Practice Multiplayer subtab can still flash roughly every five seconds after a player opens a ranked Practice queue. The user classified this as minor/cosmetic and suitable for Phase 42 unless later audit evidence shows a broader reliability issue.

## 3. Phase 42 Goals

Phase 42 should add practical observability and beginner guidance while preserving existing privacy and gameplay authority.

Goals:

- define privacy-safe public live-site stats that use only approved aggregate data;
- define a private developer/admin dashboard that is access-controlled beyond UI hiding;
- add beginner-friendly onboarding, help, and tutorial UX for the current product;
- audit and, if evidence supports it, repair the ranked Practice queue button/status flashing issue with a narrow source/test-only change;
- decide whether public stats or developer dashboard work can remain source-only or requires a migration/RLS addendum;
- preserve Phase 41 multiplayer reliability repairs and real E2E harnesses;
- preserve Phase 40 public profile/private matchmaking privacy and anti-abuse boundaries;
- preserve Phase 39 mobile scroll smoothness;
- preserve Phase 38 public/guest spectator read-only boundaries and Daily spectator exclusion;
- preserve Daily claim safety, gameplay rules, scoring, and Elo math.

## 4. In Scope

Phase 42 may include, after the appropriate stage authorization:

- read-only audit and scope lock for public stats, private developer/admin dashboard, onboarding/help/tutorial UX, and ranked queue button flashing;
- focused reproduction or characterization of the ranked Practice queue button/status flashing issue;
- source/test-only queue button/status stability repair if Stage 42.1 proves the bug is bounded and not a database-contract issue;
- migration/RLS addendum planning if public stats or developer dashboard work needs new projections, RPCs, admin-only reads, or telemetry contracts;
- migration/RLS execution only after a separately reviewed and authorized addendum;
- public stats source integration using approved aggregate public data only;
- private developer/admin dashboard source integration using approved admin access boundaries;
- onboarding, help, and tutorial surfaces for current Solo, Daily, Practice, Multiplayer, Leaderboard, public profile, private request, and spectator concepts;
- route, navigation, copy, parser, component, browser, E2E, and visual review updates required by the approved Phase 42 stages;
- progress, changelog, review checklist, testing documentation, and planning index updates needed to keep Phase 42 reviewable.

## 5. Out Of Scope

Phase 42 must not include:

- source/runtime implementation in this specification pass;
- test implementation in this specification pass;
- Supabase migration creation or execution without a later addendum and explicit execution prompt;
- Vercel or Supabase configuration changes;
- deployment, release, Git/GitHub backup, commits, pushes, pull requests, merges, or branch deletion;
- public/guest spectation contract changes;
- spectator presence/count/list implementation, identity-bearing spectator lists, spectator sorting, or viewer tracking;
- service workers, push subscriptions, background push, or production release work;
- full mailbox, notification-center, inbox, or notification architecture redesign;
- EXP, coin, collectible, or progression HUD counters;
- Focus Mode, compact navigation, or broader mobile UX shell overhaul;
- theme proposal modernization or full concrete theme implementation;
- ranked private invitations, ranked direct challenges, Daily match requests, or Daily custom invitations;
- gameplay-rule, scoring, timeout, forfeit, Daily claim, Hard Mode, GO transition, or Elo algorithm changes;
- original stable `brrrdle` repository work.

## 6. Product Requirements

### 6.1 Public Live-Site Stats

Public stats must be aggregate-only and privacy-safe.

Allowed v1 directions, subject to audit and data-gate review:

- high-level public totals or bounded summaries that cannot identify private users;
- public-facing counts for safely visible concepts, such as public leaderboard availability or public stats approved by an addendum/source-only decision;
- explanatory copy that distinguishes local player stats from public site-wide stats;
- refresh behavior that is clear, bounded, and non-authoritative.

Forbidden public stats exposure:

- raw auth IDs, emails, private profile fields, account metadata, settings, progress, history, or local storage data;
- raw game/session projections, serialized sessions, player sessions, answers, seeds, move history, guesses, or active private game details;
- ranked queue internals, private request internals, rating transaction internals, settlement ids, queue ids, request ids, service identifiers, or private admin diagnostics;
- individual nonpublic player activity;
- spectator presence/count/list behavior unless a later explicitly approved gate changes scope;
- tokens, Supabase keys, Vercel tokens, screenshots, videos, traces, auth state, or local artifacts.

If the desired public stats cannot be derived from already safe data, Stage 42.3 must create a migration/RLS addendum before any SQL or source integration claims are made.

### 6.2 Private Developer/Admin Dashboard

The private dashboard must be operationally useful without becoming a private-data leak.

Required behavior:

- access must be backed by existing or approved admin authorization, not merely hidden browser UI;
- anonymous users and signed-in non-admin users must see locked states;
- admin-facing summaries should prefer counts, health states, and operational checks over raw private rows;
- dashboard copy must clearly distinguish admin-only operational views from player-facing public stats;
- privileged credentials, service-role values, database passwords, auth state, session tokens, and local artifacts must never be printed, stored in progress, or rendered in browser UI.

Existing admin foundation:

- `src/admin/authorization.ts` evaluates signed-in admin-role access;
- `src/admin/AdminPanel.tsx` currently protects manual refresh controls in the browser and documents that server/RLS enforcement remains required.

Phase 42 may build on this foundation only after auditing whether the dashboard can stay source-only or needs new admin-only Supabase/RLS contracts.

### 6.3 Onboarding, Help, And Tutorial UX

Help and tutorial UX should teach the current product without changing how the product works.

Required coverage candidates:

- Solo Daily and Solo Practice basics;
- OG versus GO behavior, including GO carry-over rows;
- Daily versus Practice differences;
- Hard Mode availability and constraints;
- Multiplayer Practice and Daily boundaries;
- ranked Practice basics, trusted queue behavior, and display-only Elo/rank explanations;
- Leaderboard visibility and public-profile eligibility;
- public profile privacy basics;
- private Practice requests and accepted-game routing;
- public/guest spectator read-only boundaries and Daily spectator exclusion;
- Settings, feedback, definitions, stats, and history orientation.

UX constraints:

- onboarding must be practical in-app guidance, not a marketing landing page;
- guidance should be mobile-friendly, readable, and non-blocking for returning users;
- dismiss/persistence behavior must use approved guest/account settings paths if persistence is introduced;
- no tutorial step may mutate gameplay authority, Daily claims, rating settlement, queue behavior, word selection, scoring, Elo, or profile privacy.

### 6.4 Ranked Practice Queue Button/Status Flashing Follow-Up

The queue flashing issue must be treated as an evidence-first bugfix, not an assumption.

Required Stage 42.1 classification:

- reproduce or characterize the visible flashing where feasible;
- determine whether the symptom is caused by button label churn, disabled/enabled state churn, focus/hover style churn, polling state resets, route re-entry refresh, server status transitions, or a deeper queue-contract issue;
- decide whether Stage 42.2 can remain source/test-only.

Permitted Stage 42.2 repair:

- stabilize visible queue status/button rendering or refresh-state mapping if the audit proves a bounded source/test-only cause;
- add focused component or browser coverage proving the visible button/status state does not churn misleadingly during normal queued polling;
- preserve all existing ranked Practice reliability repairs.

Forbidden Stage 42.2 changes:

- ranked queue matching rules;
- cancellation or stale-row denial rules;
- trusted finalization or settlement paths;
- rating buckets, rank bands, K factors, Elo formula, public leaderboard authority, Daily behavior, gameplay rules, timeouts, forfeit precedence, or Hard Mode validation.

If the issue proves to be database-contract, RLS, polling authority, or ranked settlement related, stop and route to the safest addendum or bugfix gate instead of expanding Stage 42.2.

## 7. Data And Privacy Requirements

Phase 42 must preserve existing privacy boundaries:

- public stats are aggregate-only unless a later approved addendum proves a safe projection;
- public profile summaries remain active, safe, and allowlisted;
- public leaderboard rows remain display-only and sanitized;
- private match requests remain authenticated participant-scoped;
- participant identity summaries remain participant-scoped;
- public/guest spectator projections remain read-only and unchanged;
- developer/admin dashboard data remains admin-gated and never exposes secrets.

Do not print, display, log in progress, or expose through browser payloads:

- raw auth IDs;
- emails;
- private profile fields;
- auth metadata;
- private account metadata;
- raw projections;
- player sessions;
- serialized sessions;
- move history or guesses;
- answers or seeds;
- ranked queue internals;
- private request internals;
- rating internals or raw rating transactions;
- service IDs;
- Supabase keys;
- Vercel tokens;
- screenshots, videos, traces, auth state, local session artifacts, or other local-only artifacts.

If audit evidence suggests any current payload violates these constraints, stop and route to the safest privacy or migration/RLS gate before source integration continues.

## 8. Migration/RLS Constraints

No migration is authorized by this spec alone.

Stage 42 should default to source/test-only when existing safe data is sufficient. New SQL/RLS work requires a separate addendum and review.

A migration/RLS addendum is required before:

- introducing new public stats RPCs or public aggregate projections;
- adding admin-only dashboard RPCs, tables, views, or grants;
- adding telemetry or observability persistence;
- broadening any existing public stats, public profile, public leaderboard, public/guest spectator, ranked queue, private request, Daily claim, or rating settlement contract;
- changing grants, policies, browser function execution, or service-side helper authority.

Any authorized migration/RLS execution must:

- create exactly the authorized additive migration unless the user explicitly broadens scope;
- confirm the `brrrdle-dev` Supabase target without printing secrets;
- avoid direct browser grants for private data;
- deny anonymous mutation unless a later approved spec explicitly proves safety;
- run non-printing probes for grants, allowed fields, forbidden fields, admin-only denial, anonymous denial, non-admin denial, public privacy boundaries, idempotency, rollback expectations, and unchanged protected contracts;
- update docs only where needed.

## 9. Verification Strategy

Documentation-only Phase 42 planning/spec stages use lightweight verification:

- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan over changed tracked and untracked repository files;
- ignored-artifact check;
- `git status --short --branch`.

Future implementation stages should run focused tests first, then the gate named in the authorized stage prompt.

Minimum source-stage verification:

- focused relevant Vitest/component tests;
- focused relevant Playwright/E2E when browser-visible behavior changes;
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

- focused Phase 42 regression set;
- public stats/dashboard/help/tutorial route checks;
- queue flashing follow-up browser check if Stage 42.2 changes visible queue state;
- `npm run test:e2e` when Phase 42 changes browser flows;
- `npm run test:full` for the completed macro-phase;
- local visual handoff review gate;
- changelog and manual checklist creation.

## 10. Real E2E And Browser Strategy

Phase 42 should reuse the existing E2E harness without weakening it.

Expected browser/E2E coverage by stage, when implementation is later authorized:

- ranked Practice queue button/status flashing characterization and repair coverage;
- public stats route rendering and privacy-safe payload/parser coverage;
- developer/admin dashboard locked states for anonymous and non-admin users;
- admin-allowed dashboard behavior only where safe test credentials and existing admin authorization support it;
- onboarding/help/tutorial route, disclosure, dismiss, and browser-history behavior;
- regression checks for public profile/private matchmaking boundaries, public/guest spectator read-only boundaries, mobile scroll smoothness, and ranked queue reliability where touched.

E2E safety:

- use one local dev server unless a later prompt explicitly authorizes otherwise;
- keep waits bounded and selectors resilient;
- prefer deterministic fixture helpers over copy/paste setup;
- do not commit screenshots, videos, traces, auth state, tokens, local artifacts, or private data;
- clean temporary users/rows when real Supabase-backed tests are used.

## 11. Visual Review Expectations

Phase 42 final hardening should run the local visual handoff review gate for user-visible changed surfaces.

Expected visual surfaces:

- public stats route or stats section;
- private developer/admin dashboard locked and allowed states where safe;
- onboarding/help/tutorial entry points and content;
- ranked Practice queue button/status state after the flashing follow-up if Stage 42.2 changes it;
- representative mobile views to confirm Phase 39 scroll smoothness remains intact.

Visual artifacts must remain ignored/local-only under:

`test-results/visual-review/phase-42-stage-42-7/`

Do not stage or expose screenshots, videos, traces, auth state, tokens, private data, or local session artifacts.

## 12. Manual Review Checklist Expectations

Phase 42 final hardening should create:

`planning/phase-42/REVIEW-CHECKLIST.md`

The checklist should include:

- public stats privacy and aggregate-only checks;
- private developer/admin dashboard access checks;
- onboarding/help/tutorial usability checks;
- ranked Practice queue button/status flashing follow-up checks;
- mobile scroll smoothness spot-checks;
- public profile/private matchmaking non-regression checks;
- public/guest spectator read-only and Daily exclusion non-regression checks;
- gameplay/Elo/Daily invariant spot-checks;
- known deferred/out-of-scope items;
- evidence paths and review result section.

Manual review checklists remain human-facing aids. They do not replace automated tests, E2E, migration/RLS probes, visual handoff review, or final verification.

## 13. Multi-Agent Strategy

Parallelism should be considered only after Stage 42.1 defines disjoint ownership.

Possible read-only explorer lanes:

- stats/dashboard/admin/RLS/data-source audit;
- onboarding/help/tutorial route and UX audit;
- ranked Practice queue button/status flashing reproduction and source-state audit;
- public/privacy and visual review risk audit.

Implementation lanes must be sequenced if they touch the same high-conflict surfaces:

- `src/app/App.tsx`;
- `src/app/routes.ts`;
- `src/app/navigationState.ts`;
- `src/dashboard/`;
- `src/stats/`;
- `src/admin/`;
- `src/multiplayer/MultiplayerPanel.tsx`;
- `src/multiplayer/multiplayerPanelRouting.ts`;
- `supabase/migrations/`;
- `progress/PROGRESS.csv`;
- phase planning/progress/checklist files.

The coordinator owns final integration, progress ledger updates, final verification, and prompt-package generation.

## 14. Recommended Stage Breakdown

### Stage 42.0 - Protected Baseline And Review Intake

Purpose:

- confirm repository state and Phase 41 merge baseline;
- preserve the user-updated Phase 41 checklist;
- record current Phase 42 planning/spec/progress artifacts and the remaining queue flashing note;
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

### Stage 42.1 - Observability, Onboarding, And Queue-Flash Audit

Purpose:

- audit public stats, private developer/admin dashboard, onboarding/help/tutorial, route placement, privacy boundaries, and current tests;
- inspect relevant Supabase/RLS contracts and determine whether stats/dashboard work can stay source-only;
- reproduce or characterize ranked Practice queue button/status flashing where feasible;
- decide the exact Stage 42.2 path and whether Stage 42.3 needs an addendum.

Stop conditions:

- any privacy/RLS issue requiring database-contract work;
- any queue flashing evidence that points to ranked queue matching, trusted settlement, Daily, gameplay, or Elo rules;
- any need to print secrets, auth state, raw identifiers, or private data.

### Stage 42.2 - Ranked Practice Queue Button/Status Flashing Follow-Up

Purpose:

- repair only the ranked Practice queue button/status flashing if Stage 42.1 proves a bounded source/test-only cause;
- add focused tests or browser coverage for stable visible status/button behavior during normal queued polling;
- document whether the manual-review follow-up is resolved or routed.

Constraints:

- no migration/RLS work;
- no ranked queue matching, cancellation, stale-row denial, finalization, settlement, Elo, Daily, or gameplay-rule changes;
- stop if the symptom proves broader than cosmetic UI-state churn.

### Stage 42.3 - Stats/Dashboard Migration/RLS Addendum Or Source-Only Decision

Purpose:

- decide whether public stats and private developer dashboard work can use existing safe surfaces;
- create a documentation-only migration/RLS addendum if new public aggregate projections, admin-only RPCs, telemetry tables, or grants are needed;
- record an explicit source-only decision if no database contract change is required.

Constraints:

- do not create or run SQL migrations;
- do not implement source/runtime code;
- define non-printing probes and stop gates if a later migration is needed.

### Stage 42.4 - Migration/RLS Execution Only If Separately Authorized

Purpose:

- create exactly the approved additive migration only if Stage 42.3 addendum review authorizes it;
- confirm the `brrrdle-dev` Supabase target without printing secrets;
- run non-printing probes for grants, allowed fields, forbidden fields, admin-only denial, public privacy boundaries, and protected contract preservation.

Constraints:

- no unrelated migration cleanup;
- no source/UI integration claims until a later source stage verifies them.

### Stage 42.5 - Public Stats And Private Developer Dashboard Source Integration

Purpose:

- implement the smallest useful public stats and private developer/admin dashboard surfaces allowed by prior gates;
- keep public stats aggregate-only and private dashboard admin-gated;
- add focused parser, view-model, component, route, and E2E coverage.

Constraints:

- no public/private data leakage;
- no production configuration or deployment;
- no public/guest spectator, gameplay, Daily, or Elo contract changes.

### Stage 42.6 - Onboarding, Help, And Tutorial UX

Purpose:

- add beginner-friendly onboarding/help/tutorial surfaces for current gameplay, navigation, profile, private request, ranked, leaderboard, spectator, settings, and feedback concepts;
- preserve current product rules while improving discoverability;
- add focused route, copy, component, accessibility, browser-history, and mobile coverage.

Constraints:

- no gameplay-rule changes;
- no full shell redesign, Focus Mode, compact navigation, progression HUD, theme work, or mailbox redesign;
- keep guidance practical and in-app.

### Stage 42.7 - Final Hardening, Visual Review, Changelog, And Manual Checklist

Purpose:

- review all Phase 42 work for regressions, stale copy, privacy gaps, visual issues, and cleanup needs;
- run focused and full verification;
- run the visual handoff review gate for user-visible surfaces;
- create `planning/phase-42/CHANGELOG.md`;
- create `planning/phase-42/REVIEW-CHECKLIST.md`;
- halt for user review before Git handoff preparation.

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

## 15. Success Criteria

Phase 42 is successful when:

- public stats expose only approved aggregate information and no private user/game/session data;
- the private developer/admin dashboard is locked for anonymous and non-admin users and does not expose secrets or private data to ordinary users;
- onboarding/help/tutorial UX makes current gameplay and navigation easier to understand without changing product rules;
- the ranked Practice queue button/status flashing issue is repaired in a narrow source/test-only way or explicitly routed to the correct later/addendum gate with evidence;
- Phase 41 multiplayer reliability repairs and real E2E harnesses remain intact;
- Phase 40 public profile/private matchmaking boundaries remain intact;
- Phase 39 mobile scroll smoothness remains intact;
- Phase 38 public/guest spectator read-only boundaries and Daily spectator exclusion remain intact;
- Daily claim safety, gameplay rules, scoring, timeout, forfeit, GO transition, Hard Mode, and Elo math remain unchanged;
- final verification, visual handoff review, changelog, and manual review checklist are complete before Git handoff preparation.

## 16. Likely Files And Modules

Likely source files:

- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/dashboard/DashboardHome.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/stats/statistics.ts`
- `src/stats/statsSelectors.ts`
- `src/stats/types.ts`
- `src/admin/AdminPanel.tsx`
- `src/admin/authorization.ts`
- `src/admin/manualRefresh.ts`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/leaderboards/PublicRankedLeaderboardPanel.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/notifications/NotificationCenter.tsx`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`

Likely test/E2E files:

- `src/admin/authorization.test.ts`
- `src/admin/ManualRefreshControls.test.tsx`
- `src/stats/StatsDashboard.test.tsx`
- `src/stats/statsSelectors.test.ts`
- `src/leaderboards/LeaderboardPanel.test.tsx`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/app/routes.test.ts`
- `src/app/navigationState.test.ts`
- `e2e/fixtures/`
- `e2e/gameplay/multiplayer-reliability.spec.ts`
- relevant new Phase 42 stats/dashboard/help/onboarding E2E files if later authorized.

Likely documentation/progress files:

- `planning/phase-42/IMPLEMENTATION-PLAN.md`
- `planning/phase-42/CHANGELOG.md`
- `planning/phase-42/REVIEW-CHECKLIST.md`
- `planning/testing/TESTING-SUITE.md`
- `docs/supabase.md`
- `docs/ranked-multiplayer.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

## 17. Deferred Routing Decisions

Phase 42 explicitly routes:

- EXP, coin, collectible header counters, progression HUD, Focus Mode, compact navigation, and broader mobile UX shell overhaul to Phase 43 or later;
- theme proposal modernization to Phase 44 or later;
- full concrete theme work to Phase 45 or later;
- full mailbox/notification-center redesign to a later notification phase;
- spectator presence/count/list, identity-bearing spectator lists, spectator sorting, aggregate viewer tracking, and public/guest spectation contract changes to a later privacy/RLS-gated phase;
- service workers, push subscriptions, background push, production deployment, release, gameplay-rule changes, and Elo algorithm changes to later gated phases.

## 18. Risks

- Public stats can accidentally identify users if aggregates are too narrow or derived from private data.
- Developer dashboards can become unsafe if admin checks are UI-only instead of server/RLS-backed where needed.
- Onboarding/tutorial work can become broad UX redesign if not kept practical.
- Help copy can become stale quickly if it documents future features instead of current behavior.
- The ranked queue flashing issue could indicate refresh-state churn deeper than cosmetic button rendering.
- New dashboard/stats surfaces may increase E2E, visual review, and accessibility review cost.

## 19. Open Decisions

- Which public stats are useful enough for v1 while remaining privacy-safe?
- Does the private developer dashboard need new Supabase/RLS contracts, or can it initially use existing admin-safe surfaces?
- Should onboarding live in Home, Settings/Help, a dedicated route, or contextual surfaces?
- Should onboarding dismissal persist locally, account-wide, both, or not at all in v1?
- Can the ranked Practice queue flashing be fixed with source/test-only UI state stabilization?
- Which Phase 42 surfaces require visual handoff screenshots?

## 20. Next Gated Action

Create the detailed Phase 42 implementation plan for review only.

The implementation plan should turn this unified specification into narrow stages covering Stage 42.0 protected baseline, Stage 42.1 audit and queue-flash reproduction, Stage 42.2 queue flashing follow-up, Stage 42.3 stats/dashboard source-only versus migration/RLS decision, Stage 42.4 migration/RLS execution only if separately authorized, Stage 42.5 public stats/developer dashboard source integration, Stage 42.6 onboarding/help/tutorial UX, and Stage 42.7 final hardening, visual review, changelog, and manual checklist.

No implementation, migration execution, deployment/configuration, Git/GitHub action, backup workflow, or stable repository work should begin until a later prompt explicitly authorizes that exact gate.
