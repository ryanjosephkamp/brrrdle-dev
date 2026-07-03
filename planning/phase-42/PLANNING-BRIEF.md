# Phase 42 Planning Brief - Site Stats, Developer Dashboard, Onboarding, And Help

**Status**: Draft planning brief for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-03.
**Current baseline**: local `main` and `origin/main` are expected at `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
**Authority**: Planning only. This brief does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, secret exposure, local session artifact exposure, GitHub backup workflow execution, local Codex skill creation/modification, or original stable `brrrdle` repository work.

## Phase 41 Manual Review Result Summary

Phase 41 is complete, backed up, merged, branch-cleaned, and manually reviewed.

The Phase 41 manual review was not a fully clean no-follow-up review, but it was clean enough to continue planning. The user reported that virtually every previously identified bug appears fixed and that the game looks good overall. One minor issue remains: when a player opens a ranked Practice multiplayer queue, buttons on the Practice Multiplayer subtab still flash roughly every five seconds.

That remaining issue appears cosmetic/minor and does not appear to interrupt gameplay flow. It should be folded into Phase 42 as a narrow early follow-up rather than spun out into a separate emergency phase, unless the Phase 42 audit discovers a broader reliability problem.

The user-updated checklist at `planning/phase-41/REVIEW-CHECKLIST.md` must be preserved.

## Remaining Bug And Observation Summary

The sole Phase 41 manual-review follow-up is:

- ranked Practice queue button/status flashing on mobile after a ranked Practice queue has been opened;
- observed as visible button flashing roughly every five seconds on the Practice Multiplayer subtab;
- likely related to polling/refresh-driven UI state transitions or button-label/disabled-state churn rather than queue matching correctness;
- currently classified as minor/cosmetic because it does not appear to interrupt gameplay.

Phase 42 planning should not assume the cause. The first implementation-stage audit should reproduce or characterize it and decide whether it belongs in a source/test-only repair. It should not change ranked queue, settlement, Elo, Daily, or gameplay contracts.

## Phase-Sizing Decision

Phase 42 should proceed as the next cohesive macro-phase: public site stats, private developer dashboard, onboarding, help, and tutorial UX.

This follows `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`:

- the main Phase 42 work is cohesive because it shares observability, current-state summaries, route placement, privacy boundaries, help/tutorial copy, and review surfaces;
- the ranked Practice button flashing follow-up can be included because it is small, user-visible, and tied to the same manual-review handoff trail, but it must remain an early narrow stage;
- implementation stages must remain single-purpose and independently reviewable;
- any new persistence, telemetry, stats projection, admin-only RPC, or RLS work must go through addendum planning before execution;
- full final verification, visual review, and a manual checklist remain required before Git handoff.

## Goals

- Plan privacy-safe public site statistics without exposing private users, raw game/session data, answers, seeds, auth IDs, emails, or local artifacts.
- Plan a private developer/admin dashboard for operational observability with clear authorization boundaries.
- Plan beginner-friendly onboarding, help, and tutorial UX that teaches the current game without changing gameplay rules.
- Plan a narrow ranked Practice queue button/status flashing follow-up using Stage 41 evidence and manual-review notes.
- Preserve Phase 41 multiplayer reliability repairs and real E2E harnesses.
- Preserve Phase 40 public profile/private matchmaking boundaries.
- Preserve Phase 39 mobile scroll smoothness.
- Preserve Phase 38 public/guest spectator read-only boundaries and Daily spectator exclusion.
- Preserve Daily claim safety, gameplay rules, scoring, and Elo math.

## In Scope

- Read-only audit and scope lock for public stats, developer dashboard, onboarding/help/tutorial UX, and ranked queue button flashing.
- Public live-site stats planning for aggregate, privacy-safe counts and status summaries.
- Private developer/admin dashboard planning for authenticated/admin-only operational views.
- Beginner onboarding, help, and tutorial UX planning for current Solo, Multiplayer, Leaderboard, profile, private request, and spectator concepts.
- Narrow ranked Practice queue button/status flashing audit and source/test-only repair planning.
- Migration/RLS addendum planning if stats/dashboard work requires new database contracts.
- Focused route, copy, component, and E2E planning.
- Final visual handoff and manual checklist expectations.

## Out Of Scope

- Source/runtime implementation in this planning pass.
- Test implementation in this planning pass.
- Supabase migration creation or execution.
- Vercel or Supabase configuration changes.
- Deployment, release, Git/GitHub backup, commits, PRs, merges, or branch deletion.
- Public/guest spectation contract changes.
- Spectator presence/count/list implementation.
- Service workers, push subscriptions, or background push.
- Full mailbox or notification-center redesign.
- EXP, coin, collectible, or progression HUD counters.
- Focus Mode, compact navigation, and broader mobile UX shell overhaul.
- Theme proposal modernization or full concrete theme work.
- Ranked private invitations, ranked direct challenges, Daily match requests, or Daily custom invitations.
- Gameplay-rule, scoring, timeout, forfeit, Daily claim, or Elo algorithm changes.
- Original stable `brrrdle` repository work.

## Recommended Phase 42 V1 Scope

Phase 42 v1 should stay practical and reviewable:

1. audit existing stats/admin/help surfaces and the ranked queue button flashing symptom;
2. decide whether public stats/developer dashboard can be source-only or require migration/RLS addenda;
3. repair the ranked Practice queue button/status flashing only if the audit keeps it source/test-only and bounded;
4. implement the smallest useful public stats and private developer dashboard surfaces after data/privacy gates are approved;
5. add onboarding/help/tutorial UX for the current product without changing gameplay;
6. run final hardening, visual review, changelog, and manual checklist before Git handoff.

## Recommended Stage Breakdown

### Stage 42.0 - Protected Baseline And Review Intake

- Confirm repository state and the Phase 41 merge baseline.
- Preserve the user-updated `planning/phase-41/REVIEW-CHECKLIST.md`.
- Record existing Phase 42 planning artifacts and the remaining ranked queue flashing note.
- Run the protected baseline verification gate before audit or implementation.

### Stage 42.1 - Observability, Onboarding, And Queue-Flash Audit

- Audit public stats, private developer dashboard, onboarding/help/tutorial surfaces, route placement, privacy boundaries, and current tests.
- Reproduce or characterize the ranked Practice queue button/status flashing issue where feasible.
- Decide source-only versus migration/RLS addendum requirements.
- Do not implement fixes in this stage.

### Stage 42.2 - Ranked Practice Queue Button/Status Flashing Follow-Up

- Repair only the ranked Practice queue button/status flashing if Stage 42.1 proves a narrow source/test-only path.
- Preserve queue matching, cancellation, stale-row denial, trusted finalization, settlement, Daily exclusion, gameplay rules, and Elo math.
- If the cause is database-contract or polling authority related, stop and route to the safest addendum or later bugfix gate.

### Stage 42.3 - Stats/Dashboard Migration/RLS Addendum Or Source-Only Decision

- If public stats or the developer dashboard require new projections, RPCs, admin-only reads, or telemetry contracts, create an addendum before SQL execution.
- If existing safe data is sufficient, record an explicit source-only decision.
- Do not create or run migrations in this stage.

### Stage 42.4 - Migration/RLS Execution Only If Separately Authorized

- Create exactly the approved additive migration only if Stage 42.3 addendum review authorizes it.
- Confirm the `brrrdle-dev` Supabase target without printing secrets.
- Run non-printing probes for grants, field allowlists, forbidden fields, admin-only denial, public privacy boundaries, idempotency, and rollback expectations.

### Stage 42.5 - Public Stats And Private Developer Dashboard Source Integration

- Add the smallest useful public stats surface and private developer/admin dashboard source integration allowed by the prior gates.
- Keep public stats aggregate-only and private dashboard admin-gated.
- Add focused parser, view-model, component, route, and E2E coverage.

### Stage 42.6 - Onboarding, Help, And Tutorial UX

- Add beginner-friendly onboarding/help/tutorial surfaces for existing gameplay and navigation.
- Prefer durable Help access from Settings or a dedicated route.
- Teach current behavior without changing game rules, Daily rules, ranked rules, Elo, or multiplayer authority.
- Add focused route/copy/component/browser coverage.

### Stage 42.7 - Final Hardening, Visual Review, Changelog, And Manual Checklist

- Run focused regressions and full final verification.
- Run visual handoff review for new public stats/dashboard/help/onboarding surfaces and the queue button follow-up if visible.
- Create `planning/phase-42/CHANGELOG.md`.
- Create `planning/phase-42/REVIEW-CHECKLIST.md`.
- Halt for review before Git handoff preparation.

## Success Criteria

- Phase 41 manual review is accurately recorded as successful with one minor follow-up.
- Ranked Practice queue button/status flashing is either repaired in a narrow source/test-only way or explicitly routed to the correct later/addendum gate.
- Public stats expose only safe aggregate information and no private user/game/session data.
- Private developer dashboard access is admin-gated and does not expose secrets or private data to ordinary users.
- Onboarding/help/tutorial UX improves discoverability for current features without changing gameplay.
- Existing public profile, private matchmaking, public/guest spectator, ranked queue, leaderboard, Daily, gameplay, and Elo boundaries remain intact.
- Final verification and manual review evidence are ready before Git handoff.

## Likely Files And Modules

- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`
- `src/dashboard/DashboardHome.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/stats/statsSelectors.ts`
- `src/admin/AdminPanel.tsx`
- `src/admin/authorization.ts`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/notifications/NotificationCenter.tsx`
- `src/notifications/notificationActions.ts`
- `e2e/fixtures/`
- `e2e/gameplay/multiplayer-reliability.spec.ts`
- relevant route, admin, stats, dashboard, help/onboarding, Supabase/RLS, parser, component, and E2E tests.

## Migration/RLS Constraints And Addendum Gates

- Phase 42 planning does not authorize migrations.
- Public stats and developer dashboard work may need a migration/RLS addendum if existing data is insufficient or unsafe.
- Public stats projections must be aggregate-only and should avoid per-user/per-game private visibility unless a later spec explicitly proves safety.
- Private developer dashboard reads must be admin-gated and must not rely on browser-hidden UI alone for security.
- Any migration must be additive, separately authorized, applied only to the confirmed `brrrdle-dev` Supabase target, and followed by non-printing probes.
- No direct browser grants for private tables, raw game projections, private request rows, queue internals, rating internals, sessions, answers, seeds, auth data, or service identifiers are allowed without an approved addendum proving safety.

## Public Stats Privacy Constraints

Public stats may include only safe aggregate counts or summaries approved by the future spec, such as current public-facing totals or bounded live-status summaries.

Public stats must not expose:

- raw auth IDs or emails;
- private profile fields;
- private account metadata;
- raw game/session projections;
- answers, seeds, move history, guesses, or player sessions;
- queue internals, private request internals, rating transaction internals, or settlement ids;
- individual nonpublic player activity;
- tokens, screenshots, videos, traces, auth state, or local artifacts.

Any spectator-related count must avoid implementing spectator presence/count/list unless a later explicitly approved gate changes scope.

## Private Developer Dashboard Access Constraints

- Developer/admin dashboard access must be backed by existing or approved admin authorization.
- Dashboard content must distinguish operational summaries from private player data.
- Secrets, Supabase keys, Vercel tokens, auth state, session data, service-role values, and local artifacts must never be shown or logged.
- No production configuration, Vercel project settings, Supabase dashboard settings, or deployment actions are authorized in Phase 42 planning.

## Onboarding, Help, And Tutorial UX Constraints

- Help/tutorial work should explain current game modes, Daily vs Practice, OG vs GO, Hard Mode, Multiplayer, ranked Practice, Leaderboards, Profiles, private requests, and public/guest spectation boundaries.
- Tutorial UX must not change gameplay rules, scoring, Elo, Daily claim rules, word selection, timers, settlement, or profile privacy.
- Onboarding should be accessible, mobile-friendly, dismissible where appropriate, and non-blocking for returning players.
- Avoid oversized marketing pages; build practical in-app help and guidance surfaces.

## Ranked Practice Queue Flashing Follow-Up Constraints

- The remaining flashing issue should be reproduced or characterized before source changes.
- Prefer a source/test-only fix in the queue button/status rendering or refresh-state model if supported by evidence.
- Do not change ranked queue matching, cancellation, stale-row denial, trusted finalization, settlement, rating buckets, Elo, gameplay, or Daily behavior.
- Add focused tests or browser coverage that proves status/button labels do not churn misleadingly during normal queued polling.

## Supabase, Notification, Routing, Mobile, Vercel, Gameplay, And Elo Constraints

- Supabase work remains addendum-gated.
- Notification work is limited to help/onboarding or dashboard routing if explicitly needed; no full mailbox redesign.
- Routing changes must preserve Phase 37 browser history and stale selected-game fallbacks.
- Mobile changes must preserve Phase 39 scroll smoothness and avoid broad shell redesign.
- Vercel/deployment/configuration work is out of scope.
- Gameplay rules, scoring, timeout, forfeit, GO transition, keyboard coloring, Daily claim safety, and Elo algorithm are out of scope.

## Verification Strategy

Documentation-only planning stages should use lightweight verification:

- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan;
- ignored-artifact check;
- `git status --short --branch`.

Future implementation stages should use focused tests first, then the stage gate named in the authorized prompt. Final hardening should run focused regressions, `npm run lint`, `npm run test`, relevant Playwright/E2E, `npm run test:full` for the completed macro-phase, `npm run build`, API typecheck, repository hygiene checks, watched-port cleanup, visual review, and manual checklist creation.

## Visual Handoff Review Expectations

Phase 42 should run a visual handoff review if it changes user-visible stats, admin dashboard, onboarding/help/tutorial, or queue button/status surfaces.

Artifacts should remain local-only and ignored under `test-results/visual-review/phase-42-.../`. Do not stage screenshots, videos, traces, auth state, tokens, private data, or local session artifacts.

## Manual Review Checklist Expectations

Phase 42 should create `planning/phase-42/REVIEW-CHECKLIST.md` after final hardening. The checklist should include:

- public stats privacy/manual checks;
- private developer dashboard access checks;
- onboarding/help/tutorial checks;
- ranked Practice queue button/status flashing follow-up checks;
- preserved invariants from Phases 38 through 41 and earlier protected phases;
- known deferred/out-of-scope items;
- evidence paths.

## GitHub Backup Workflow Expectations

Git handoff preparation and GitHub backup remain separate gates after manual review. If Phase 42 final verification and manual review pass, run the existing handoff preparation pass first, then use the local `brrrdle-github-backup` skill only after explicit user authorization.

## Risks

- Public stats can accidentally become privacy-sensitive if they expose user/game/session-level data.
- Developer dashboards can become unsafe if admin checks are UI-only instead of server/RLS-backed where needed.
- Onboarding/tutorial work can become broad UX redesign if not kept practical.
- The ranked queue flashing issue could indicate refresh-state churn deeper than a cosmetic label issue; audit before repair.
- New dashboard/stats surfaces may increase E2E and visual-review cost.

## Open Decisions

- Which public stats are useful enough for v1 while remaining privacy-safe?
- Does the private developer dashboard need new Supabase/RLS contracts, or can it initially use existing admin-safe surfaces?
- Should onboarding live in Home, Settings/Help, a dedicated route, or contextual surfaces?
- Can the ranked Practice queue flashing be fixed with source/test-only UI state stabilization?
- Which Phase 42 surfaces require visual handoff screenshots?

## Next Gated Prompt

Create the unified Phase 42 specification for review only. The spec should lock Phase 42 around public site stats, private developer dashboard, onboarding/help/tutorial UX, and the narrow ranked Practice queue button/status flashing follow-up, while preserving all protected privacy, Supabase/RLS, public spectator, mobile scroll, Daily, gameplay, Elo, deployment, and stable-repo boundaries.
