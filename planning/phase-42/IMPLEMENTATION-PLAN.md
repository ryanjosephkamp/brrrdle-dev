# Phase 42 Implementation Plan - Site Stats, Developer Dashboard, Onboarding, And Help

**Status**: Draft implementation plan for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-03.
**Baseline**: local `main` and `origin/main` are expected at `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
**Authority**: Planning only. This plan does not authorize implementation until a later user prompt explicitly authorizes each stage.

## 1. Authority And Boundaries

This plan translates the Phase 42 planning brief and unified specification into narrow execution gates.

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
5. `planning/phase-42/PLANNING-BRIEF.md`.
6. `planning/specs/phase-42/PHASE-42-SITE-STATS-DEVELOPER-DASHBOARD-ONBOARDING-HELP-SPEC-2026-07-03.md`.
7. This plan, once reviewed.
8. Future stage prompts, once explicitly authorized.

If sources conflict on privacy boundaries, admin access, Supabase/RLS authority, ranked queue behavior, public/guest spectation contracts, Daily behavior, gameplay rules, Elo/rating behavior, deployment/configuration, Git/GitHub operations, or stable repository boundaries, stop and ask for review.

## 2. Current Baseline

Phase 41 is complete, backed up, merged, branch-cleaned, and manually reviewed with one minor Phase 42 follow-up. The current expected baseline hash is:

`7acff9d4d414533afb2930cc7fa547cec8abfee9`

Phase 41 completed:

- real Supabase-backed multiplayer reliability E2E expansion;
- ranked Practice queue cancellation, stale-row, search-again, status, and mobile freshness repairs;
- public ranked leaderboard freshness repair;
- private Practice request lifecycle cleanup and requester-side accepted-game routing;
- final hardening, Codex-assisted pre-review, visual handoff review, changelog, and manual checklist.

The user-updated `planning/phase-41/REVIEW-CHECKLIST.md` records Phase 41 as successful overall with one remaining minor issue: ranked Practice queue buttons/status on the Practice Multiplayer subtab can still visibly flash roughly every five seconds after a player opens a ranked Practice queue. That checklist must be preserved.

Current uncommitted planning artifacts are expected from Phase 42 planning, the unified Phase 42 specification, progress records, roadmap/README routing, and the user-edited Phase 41 checklist.

## 3. Phase 42 Execution Principles

- Keep Phase 42 as one cohesive macro-phase around public stats, private developer/admin dashboard, onboarding/help/tutorial UX, and the narrow ranked Practice queue flashing follow-up.
- Keep each implementation stage narrow, single-purpose, and independently reviewable.
- Start with a protected baseline, then an audit that separates source-only work from migration/RLS work.
- Treat the ranked Practice queue flashing issue as evidence-first: reproduce or characterize it before changing source.
- Prefer source/test-only work when existing safe data and contracts are sufficient.
- Route any public stats or developer dashboard persistence, projection, RPC, grant, or admin-only database contract through addendum planning before SQL execution.
- Keep migration/RLS execution separated from source integration.
- Keep public stats aggregate-only and privacy-safe.
- Keep private developer/admin dashboard access protected by existing or approved admin authorization, not by hidden UI alone.
- Keep onboarding/help/tutorial UX instructional, mobile-friendly, and non-mutating.
- Use focused tests first during implementation stages; save broad final verification, visual review, changelog, and manual checklist for final hardening.
- Preserve Phase 41 multiplayer reliability repairs and E2E harnesses, Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, Phase 38 public/guest spectator read-only boundaries and Daily spectator exclusion, Daily claim safety, gameplay rules, scoring, and Elo math.

## 4. Stage Overview

| Stage | Purpose | Primary Authority | Default Verification |
| --- | --- | --- | --- |
| 42.0 | Protected baseline and review intake | No implementation | Baseline full local gate without E2E |
| 42.1 | Observability, onboarding, and queue-flash audit | Read-only/browser checks only | Lightweight docs plus focused read-only checks |
| 42.2 | Ranked Practice queue button/status flashing follow-up | Source/test-only if bounded | Focused queue tests/E2E plus standard source gate |
| 42.3 | Stats/dashboard addendum or source-only decision | Documentation/planning only | Lightweight docs gate |
| 42.4 | Migration/RLS execution | Only after separate authorization | Migration dry run, non-printing probes, lightweight gate |
| 42.5 | Public stats and developer dashboard integration | Source/test-only after data gate | Focused route/parser/component/E2E plus standard source gate |
| 42.6 | Onboarding, help, and tutorial UX | Source/test-only | Focused route/copy/component/browser plus standard source gate |
| 42.7 | Final hardening and review handoff | Narrow final fixes only | Full final verification, visual review, changelog, checklist |

## 5. Stage 42.0 - Protected Baseline And Review Intake

### Goal

Confirm that Phase 42 starts from the expected Phase 41 merge baseline and that all existing Phase 42 planning/spec/progress artifacts are recorded before audit or implementation begins.

### Authorized Work

- Read required governance, Phase 41 evidence, Phase 42 planning brief, Phase 42 unified spec, this implementation plan, progress records, and package/test surfaces.
- Confirm `pwd`, branch, status, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Preserve `planning/phase-41/REVIEW-CHECKLIST.md`.
- Record current uncommitted Phase 42 planning/spec/progress artifacts.
- Create the Stage 42.0 progress record and matching CSV row, likely progress ID `362`.
- Run watched-port/process/resource checks before and after verification for `5173`, `5174`, `3000`, and `4173`.

### Not Authorized

No audit, source/runtime implementation, test implementation, migration creation/execution, deployment/configuration, Git/GitHub action, backup workflow, local skill creation/modification, or stable repository work.

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

If any command fails, stop, record the exact non-secret failure in progress, and do not proceed to Stage 42.1.

## 6. Stage 42.1 - Observability, Onboarding, And Queue-Flash Audit

### Goal

Map the existing stats, admin, onboarding/help/tutorial, route, privacy, and ranked queue status surfaces before changing source or tests.

### Audit Targets

- Existing private/local stats surfaces and any public-safe aggregation opportunities.
- Existing admin authorization and dashboard surfaces.
- Existing route/navigation seams for stats, admin, help, onboarding, and tutorial entry points.
- Current Settings, dashboard, profile, leaderboard, multiplayer, and notification copy that can anchor help/tutorial UX.
- Ranked Practice queue button/status flashing on the Practice Multiplayer subtab.
- Relevant tests, E2E fixtures, route/history coverage, admin locked-state coverage, and mobile browser coverage.
- Supabase/RLS contracts that might be touched by public stats or admin dashboard data.

### Queue Flash Classification

Stage 42.1 should determine whether the flashing is caused by:

- button label churn;
- disabled/enabled state churn;
- focus/hover/active style churn;
- polling refresh state resets;
- route re-entry or visibility refresh;
- server status transitions;
- deeper ranked queue or settlement contract behavior.

If the cause is source/UI state churn, Stage 42.2 can remain source/test-only. If the cause is database-contract, RLS, polling authority, or settlement related, stop and route to a safer addendum or bugfix gate.

### Likely Files

- `src/admin/AdminPanel.tsx`
- `src/admin/authorization.ts`
- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/dashboard/DashboardHome.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/stats/statistics.ts`
- `src/stats/statsSelectors.ts`
- `src/leaderboards/`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/notifications/`
- `e2e/fixtures/`
- relevant admin, stats, dashboard, help/onboarding, route/history, ranked queue, Supabase/RLS, parser, component, and E2E tests.

### Decisions Required

- Whether the queue flashing repair can proceed as source/test-only in Stage 42.2.
- Whether public stats can use existing safe data or require a new projection/RPC.
- Whether the developer dashboard can use existing admin-gated source data or requires an admin-only database contract.
- Whether onboarding/help/tutorial UX needs persistent dismiss state.
- Whether Stage 42.3 should create a migration/RLS addendum or record an explicit source-only decision.

### Verification

Use focused read-only checks only. Use one local dev server only if browser reproduction requires it, then stop it.

Run:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

If any verification or audit step fails, record the exact non-secret failure and do not proceed to Stage 42.2.

## 7. Stage 42.2 - Ranked Practice Queue Button/Status Flashing Follow-Up

### Goal

Repair the remaining ranked Practice queue button/status flashing only if Stage 42.1 proves a bounded source/test-only cause.

### Authorized Work

- Make the smallest source/test-only change needed to stabilize the visible Practice Multiplayer queue button/status state during normal ranked polling.
- Add focused component, browser, or E2E coverage that proves the state does not churn misleadingly while queued.
- Preserve the Stage 41 ranked queue cancellation, stale-row denial, search-again, and mobile freshness repairs.

### Not Authorized

Do not change:

- ranked queue matching rules;
- cancellation or stale-row denial rules;
- trusted finalization or settlement paths;
- rating buckets, rank bands, K factors, Elo formula, or public leaderboard authority;
- Daily behavior, gameplay rules, timeouts, forfeit precedence, GO transitions, Hard Mode validation, or spectator contracts.

If a broader source behavior, migration/RLS, or settlement issue is discovered, stop and route to the safest new gate.

### Likely Files

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerPanelRankedQueue.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `e2e/gameplay/multiplayer-reliability.spec.ts`
- relevant route/focus/visibility helpers from Phase 41.

### Verification

Run focused queue/status tests first, then:

- `npm run lint`
- `npm run test`
- focused relevant Playwright/E2E command
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

## 8. Stage 42.3 - Stats/Dashboard Migration/RLS Addendum Or Source-Only Decision

### Goal

Decide the data-contract path for public stats and private developer/admin dashboard work before implementation.

### Source-Only Decision

If Stage 42.1 proves existing safe data is enough, Stage 42.3 should record an explicit source-only decision in progress and route directly to Stage 42.5 after review.

The decision must name:

- public stats data sources;
- developer/admin dashboard data sources;
- parser/allowlist requirements;
- why no new grants, RPCs, views, tables, or telemetry persistence are needed;
- what fields remain forbidden.

### Addendum Path

If new database contracts are needed, create a migration/RLS addendum under `planning/specs/phase-42/`, likely:

`planning/specs/phase-42/PHASE-42-STATS-DASHBOARD-MIGRATION-RLS-ADDENDUM-2026-07-03.md`

The addendum must define:

- exact SQL/RLS contract changes;
- whether public stats, admin dashboard, telemetry, or observability persistence is affected;
- aggregate/public fields allowed;
- admin-only fields allowed;
- forbidden fields;
- grants for `anon`, `authenticated`, and admin paths;
- non-printing probes;
- rollback/idempotency expectations;
- proof that public profile privacy, private matchmaking, ranked queue, public spectator, Daily claim, gameplay, and Elo boundaries are preserved.

### Verification

Run lightweight documentation verification only:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

Do not create or run SQL migrations in this stage.

## 9. Stage 42.4 - Migration/RLS Execution Only If Separately Authorized

### Goal

Execute exactly the reviewed Stage 42.3 addendum, only if the user separately authorizes migration/RLS execution.

### Authorized Work

- Confirm the Supabase target is the intended `brrrdle-dev` project without printing secrets.
- Create exactly the approved additive migration unless the user explicitly authorizes otherwise.
- Apply it only when the target and credentials are unambiguous.
- Run required non-printing probes.
- Update `docs/supabase.md` or `docs/ranked-multiplayer.md` only if needed to document the new contract.

### Not Authorized

No source/runtime public stats, developer dashboard, onboarding/help/tutorial, or queue flashing integration work is authorized in this stage unless the user explicitly broadens scope.

### Required Probe Areas

- Anonymous denial where private/admin access is forbidden.
- Non-admin denial for developer dashboard contracts.
- Public aggregate fields only.
- Forbidden-field denial.
- Admin allowed fields only where approved.
- No direct browser grants to private tables.
- No exposure of raw auth IDs, emails, private profiles, sessions, projections, answers, seeds, queue internals, private request internals, rating internals, tokens, or local artifacts.
- Idempotency and rollback safety.
- Unchanged public profile, private matchmaking, public/guest spectator, ranked queue, Daily claim, gameplay, and Elo boundaries.

### Verification

Run the addendum-required probes, then:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check confirming no forbidden artifacts are staged or tracked
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `npx --yes supabase db push --linked --dry-run`
- `git status --short --branch`

If verification or probes fail, stop and do not proceed to source integration.

## 10. Stage 42.5 - Public Stats And Private Developer Dashboard Source Integration

### Goal

Add the smallest useful public stats and private developer/admin dashboard source integration allowed by Stage 42.3 or Stage 42.4.

### Public Stats Requirements

- Public stats must be aggregate-only.
- Payloads must be parsed with strict allowlists.
- UI copy must distinguish public site stats from private player-local stats.
- Refresh behavior must be bounded and non-authoritative.
- No individual nonpublic player activity or raw private data may be rendered or logged.

### Developer Dashboard Requirements

- Anonymous and non-admin users must see locked states.
- Admin access must rely on existing or approved admin authorization.
- Operational summaries should prefer counts, health states, and review aids over raw private rows.
- Secrets, service-role values, tokens, auth state, screenshots, videos, traces, and local artifacts must never be rendered, printed, or committed.

### Likely Files

- `src/admin/AdminPanel.tsx`
- `src/admin/authorization.ts`
- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/dashboard/DashboardHome.tsx`
- `src/stats/`
- `src/leaderboards/`
- relevant parser/view-model files and tests;
- relevant E2E route/admin/public-stats tests.

### Verification

Run focused parser/view-model/component/browser tests first, then:

- `npm run lint`
- `npm run test`
- focused relevant Playwright/E2E command
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

## 11. Stage 42.6 - Onboarding, Help, And Tutorial UX

### Goal

Add practical onboarding/help/tutorial UX for the current product without changing product authority or gameplay behavior.

### Required Coverage Candidates

- Solo Daily and Solo Practice basics.
- OG versus GO behavior.
- Daily versus Practice differences.
- Hard Mode availability and constraints.
- Multiplayer Practice and Daily boundaries.
- Ranked Practice basics, trusted queue behavior, and display-only Elo/rank explanations.
- Leaderboard visibility and public-profile eligibility.
- Public profile privacy basics.
- Private Practice requests and accepted-game routing.
- Public/guest spectator read-only boundaries and Daily spectator exclusion.
- Settings, feedback, definitions, stats, and history orientation.

### UX Constraints

- Guidance must be practical in-app help, not a marketing landing page.
- Help/tutorial surfaces should be mobile-friendly, readable, and non-blocking.
- Dismiss or persistence behavior must use approved guest/account settings paths if persistence is introduced.
- No tutorial step may mutate gameplay authority, Daily claims, rating settlement, queue behavior, word selection, scoring, Elo, or profile privacy.

### Likely Files

- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/dashboard/DashboardHome.tsx`
- `src/account/Settings.tsx`
- `src/ui/`
- potential new help/onboarding module under `src/`
- route/history, component, browser, and accessibility tests.

### Verification

Run focused route/copy/component/browser tests first, then:

- `npm run lint`
- `npm run test`
- focused relevant Playwright/E2E command
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

## 12. Stage 42.7 - Final Hardening, Visual Review, Changelog, And Manual Checklist

### Goal

Complete Phase 42 with final regression coverage, visual handoff review, documentation, and manual review artifacts before any Git handoff preparation.

### Authorized Work

- Review Stage 42.1 through Stage 42.6 outputs for regressions, stale docs, privacy gaps, visual issues, routing gaps, and cleanup needs.
- Add only narrow final-hardening fixes if required.
- Run focused regressions for public stats, developer dashboard, onboarding/help/tutorial UX, ranked queue flashing follow-up, public/guest spectator non-regression, Daily/ranked/gameplay/Elo non-regression, Phase 41 multiplayer reliability, and Phase 39 mobile scroll preservation.
- Run the local visual handoff review gate for Phase 42 user-visible surfaces.
- Save visual artifacts only under ignored `test-results/visual-review/phase-42-stage-42-7/`.
- Create `planning/phase-42/CHANGELOG.md`.
- Create `planning/phase-42/REVIEW-CHECKLIST.md` using the local Phase 37-style checklist structure.
- Record final progress and halt for review.

### Verification

Run final verification:

- focused tests;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run test:full`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port/process cleanup check for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

If verification fails, record the exact non-secret failure in progress and do not proceed to Git handoff preparation.

## 13. Success Criteria

- Stage 42.0 confirms the protected baseline and expected uncommitted planning artifacts.
- Stage 42.1 produces an evidence-based data, route, privacy, onboarding, and queue flashing scope decision.
- The ranked Practice queue flashing issue is repaired in a narrow source/test-only way, or routed to the correct later/addendum gate if it proves broader.
- Public stats expose only safe aggregate information and no private user/game/session data.
- Private developer/admin dashboard access is admin-gated and does not expose secrets or private data to ordinary users.
- Onboarding/help/tutorial UX teaches current game behavior without changing gameplay rules, Daily behavior, ranked rules, profile privacy, or Elo.
- Existing Phase 41, Phase 40, Phase 39, and Phase 38 protected behaviors remain intact.
- Final verification, visual review, changelog, and manual review checklist are complete before Git handoff preparation.

## 14. Likely Files And Ownership Notes

High-conflict files should stay coordinator-owned or explicitly sequenced:

- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/admin/`
- `src/dashboard/DashboardHome.tsx`
- `src/stats/`
- `src/leaderboards/`
- `src/multiplayer/`
- `src/notifications/`
- `e2e/fixtures/`
- `planning/phase-42/`
- `planning/specs/phase-42/`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

Parallel read-only exploration is safe in Stage 42.1 if the coordinator owns final synthesis. Implementation stages should avoid parallel writers on `src/app/`, `src/multiplayer/`, `src/admin/`, `src/stats/`, and progress/governance files unless a later prompt defines explicit file ownership.

## 15. Migration/RLS Gates

Stage 42 must create a migration/RLS addendum before:

- introducing new public stats RPCs or public aggregate projections;
- adding admin-only dashboard RPCs, tables, views, or grants;
- adding telemetry or observability persistence;
- broadening public profile, public leaderboard, public/guest spectator, ranked queue, private request, Daily claim, or rating settlement contracts;
- changing grants, policies, browser function execution, or service-side helper authority.

Any authorized migration must be additive, separately approved, applied only to the confirmed `brrrdle-dev` Supabase target, and followed by non-printing probes.

## 16. Public Stats Privacy Constraints

Public stats must never expose:

- raw auth IDs or emails;
- private profile fields;
- private account metadata;
- raw game/session projections;
- answers, seeds, guesses, move history, or player sessions;
- queue internals, private request internals, rating transaction internals, or settlement ids;
- individual nonpublic player activity;
- spectator presence/count/list behavior;
- tokens, Supabase keys, Vercel tokens, screenshots, videos, traces, auth state, or local artifacts.

## 17. Developer Dashboard Access Constraints

- Access must be backed by existing or approved admin authorization.
- Anonymous and non-admin users must receive locked states.
- Dashboard summaries should avoid raw private rows unless an approved admin-only contract explicitly permits them.
- Secrets, service-role values, tokens, auth state, private browser artifacts, and local files must never be shown or logged.
- Vercel/Supabase configuration and production deployment remain out of scope.

## 18. Onboarding, Help, And Tutorial Constraints

- Teach current features, not future roadmap work.
- Keep the first screen and existing app workflows usable; do not replace the app with a landing page.
- Keep copy concise and mobile-readable.
- Avoid changing gameplay, Daily claims, ranked queues, Elo, profile privacy, or spectator contracts.
- Avoid introducing persistent onboarding state without an approved guest/account storage path.

## 19. Ranked Queue Flashing Constraints

- Reproduce or characterize before repair.
- Keep fixes in rendering/refresh-state mapping if possible.
- Preserve Stage 41 ranked queue reliability repairs.
- Stop if root cause requires migration/RLS, settlement, or matching-rule changes.
- Add focused coverage for visible stability during normal polling.

## 20. Verification Expectations

Stage prompts should state exact verification. Default patterns:

- Documentation-only: `git diff --check`, CSV shape, non-printing scan, ignored-artifact check, status.
- Protected baseline: lint, test, build, API typecheck, repository hygiene, watched-port cleanup, status.
- Source stages: focused tests first, lint, test, focused E2E where browser-visible, build, API typecheck, repository hygiene, watched-port cleanup, status.
- Migration stages: addendum probes, Supabase dry run, repository hygiene, status.
- Final hardening: focused regressions, full Vitest/E2E/full gate, build, API typecheck, visual review, changelog, checklist, repository hygiene, watched-port cleanup, status.

## 21. Stop Conditions

Stop and report before proceeding if:

- the repo is not exactly `brrrdle-dev`;
- the original stable `brrrdle` repository would be touched;
- `HEAD` or `origin/main` does not match the expected baseline unless the user has explicitly updated it;
- the user-edited Phase 41 checklist would be overwritten;
- audit finds privacy exposure, credential-like values, or forbidden local artifacts;
- public stats/dashboard work requires a database contract but no addendum is authorized;
- queue flashing root cause requires ranked matching, settlement, migration/RLS, gameplay, or Elo changes;
- verification fails;
- a stage would require deployment/configuration, Git/GitHub operations, backup workflow execution, or local skill creation/modification.

## 22. Risks

- Public stats can accidentally reveal private behavior if aggregation boundaries are vague.
- Developer dashboard UI can create a false sense of security if access is not enforced beyond hidden navigation.
- Help/tutorial copy can drift from actual rules if it is not tied to current behavior.
- Queue flashing may be a symptom of deeper polling or authority churn; Stage 42.1 must not assume it is purely cosmetic.
- Route additions can disturb browser history, mobile layout, or scroll behavior.
- Broad final verification may expose unrelated pre-existing E2E flakes; failures should be recorded without masking real regressions.

## 23. Open Decisions

- Which public stats belong in Phase 42 v1 if no new database contract is approved?
- Whether the developer dashboard can remain source-only or needs an admin-only Supabase/RLS contract.
- Whether onboarding/help/tutorial should be one Help route, contextual help panels, first-run onboarding, or a minimal combination.
- Whether help/tutorial dismissal should persist and, if so, where.
- Whether the ranked queue flashing root cause is source/UI churn or a deeper contract issue.
- Which exact user-visible surfaces should be included in the Phase 42 visual review matrix.

## 24. Next Gated Prompt

The next safe gate is Stage 42.0 protected baseline only. It should confirm repository state, preserve the Phase 41 checklist, record the existing Phase 42 planning/spec/progress artifacts, run the baseline verification gate, and halt before Stage 42.1 audit or implementation.
