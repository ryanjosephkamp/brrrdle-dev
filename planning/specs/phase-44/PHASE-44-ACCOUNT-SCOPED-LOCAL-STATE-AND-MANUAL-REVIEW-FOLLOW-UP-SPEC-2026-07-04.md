# Phase 44 Account-Scoped Local State And Manual Review Follow-Up Spec

**Status**: Draft unified specification for review only.
**Date**: 2026-07-04.
**Repository**: `brrrdle-dev`.
**Phase**: Phase 44 - Account-Scoped Local State Isolation And Phase 43 Manual Review Follow-Up.

## Authority

This specification is governed by:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `planning/phase-43/REVIEW-CHECKLIST.md`.
7. `planning/phase-44/PHASE-44-MANUAL-REVIEW-INTAKE-AND-ROUTING-2026-07-04.md`.
8. `planning/phase-44/PLANNING-BRIEF.md`.
9. Current roadmap, testing, Supabase, ranked multiplayer, and progress documents.

This specification does not authorize implementation. It does not authorize source/runtime edits, test edits, migrations, Supabase or Vercel configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, Elo changes, local Codex skill changes, secret printing, private data exposure, local artifact exposure, or work in the original stable `brrrdle` repository.

## Current Baseline

- Phase 43 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `173a82951927d134ae4f60e0250444a41916cab5`.
- The user-updated Phase 43 checklist at `planning/phase-43/REVIEW-CHECKLIST.md` must be preserved.
- Phase 43 final evidence exists at `progress/PROGRESS-STEP-390.md`, `planning/phase-43/CHANGELOG.md`, and `planning/phase-43/REVIEW-CHECKLIST.md`.
- Phase 44 intake/routing exists at `planning/phase-44/PHASE-44-MANUAL-REVIEW-INTAKE-AND-ROUTING-2026-07-04.md`.
- Phase 44 planning brief exists at `planning/phase-44/PLANNING-BRIEF.md`.
- Progress evidence exists through `progress/PROGRESS-STEP-391.md`.

## Phase Definition

Phase 44 is a reliability and boundary phase. Its anchor is account-scoped local state isolation: signed-in player state and signed-out guest state must stop bleeding into each other, and guest progress must not silently overwrite account progress.

Phase 44 may also include a small tail of bounded Phase 43 manual-review follow-ups only after the state-boundary work is understood and remains stable. Those follow-ups must be source/test-only unless a later stage proves a reviewed storage, migration, or RLS addendum is required.

## Goals

- Reproduce, classify, and repair signed-in versus guest state bleed.
- Prevent guest progress from silently overwriting signed-in account progress.
- Prevent signed-in account progress, history, rating summaries, settings, and multiplayer projections from remaining visible after sign-out.
- Preserve explicit guest-to-account transfer or sync behavior only through reviewed, intentional flows.
- Protect Daily Solo OG/GO account boundaries and Daily claim safety.
- Audit Practice Solo OG/GO, History, Leaderboard/rating summaries, Active Multiplayer, Settings, and Stats sign-out behavior.
- Audit the private Practice request active-public-profile eligibility failure and repair it if source/test-only.
- Reproduce or classify the ranked Practice third-player fairness concern against the Phase 43 database contract.
- Complete small, low-risk UI follow-ups only if they remain source/test-only and do not distract from account-boundary repair.

## In Scope

### Account And Guest Boundary Audit

- Map local persistence keys, cloud sync hydration, sign-in/sign-out handlers, guest transfer/merge behavior, route state, and visible caches.
- Reproduce signed-in Practice Solo OG and GO progress remaining visible after sign-out.
- Reproduce guest Practice Solo OG and GO progress overwriting or replacing signed-in account progress after sign-in.
- Reproduce guest Daily Solo OG and GO progress carrying into signed-in account state.
- Audit History, Leaderboard/rating summaries, Active Multiplayer projections, Settings, and Stats after sign-out.
- Decide whether source/test-only repair is sufficient or whether a storage-contract addendum is required.

### Account-Scoped Local State Repair

- Introduce the smallest safe isolation model for effective identity:
  - anonymous guest state;
  - authenticated account state;
  - explicitly reviewed guest-to-account transfer state.
- Preserve valid guest play and valid account play as first-class states.
- Preserve existing cloud sync unless a later reviewed gate changes its contract.
- Prevent stale authenticated state from remaining mounted as guest-visible state after sign-out.
- Prevent guest state from being uploaded or merged into an account unless the user action is explicit and covered by tests.
- Preserve local-only behavior for environments without Supabase configuration.

### Daily And Practice Solo Boundary Protection

- Keep Daily Solo OG/GO deterministic and claim-safe.
- Keep Practice Solo OG/GO resume slots account-scoped or guest-scoped according to the active effective identity.
- Avoid destructive local data cleanup unless a later storage-contract addendum explicitly authorizes it.
- Preserve Hard Mode, difficulty defaults, GO chain defaults, seed behavior, validation, scoring, and gameplay rules.

### History, Leaderboard, Active Multiplayer, Settings, And Stats Boundaries

- Ensure History reflects the active effective identity only.
- Ensure Leaderboard/rating summaries do not show a previous authenticated user's local competitive cache after sign-out.
- Ensure Active Multiplayer projections do not expose previous account-owned rows to guest after sign-out.
- Ensure Settings use the active effective identity and do not silently cross-contaminate guest/account preferences.
- Verify Stats behavior even though manual review did not show a visible stats bleed.

### Private Practice Request Eligibility Follow-Up

- Audit the reported failure where a user with a configured public profile could not request an unranked private Practice match.
- Confirm whether the failure is caused by:
  - wrong signed-in account;
  - stale local public-profile state;
  - source-side request target mismatch;
  - RPC active-profile predicate mismatch;
  - misleading error text;
  - another active-public-profile eligibility issue.
- Preserve the rule that unranked private Practice requests do not require established Elo or public leaderboard eligibility.
- Stop and route to a migration/RLS addendum if the database predicate is wrong.

### Ranked Practice Fairness Follow-Up

- Reproduce or classify the report that two recent opponents rematched despite a third compatible queued player.
- Verify compatibility before declaring a contract failure:
  - mode;
  - word length;
  - Hard Mode;
  - ranked time control;
  - rating bucket;
  - queue expiration;
  - cancellation;
  - stale-row status;
  - same-user/self-match denial.
- Preserve Phase 43 behavior: prefer a compatible non-recent opponent when one exists, but allow recent rematches when no compatible non-recent player is waiting.
- Stop and route to migration/RLS addendum planning if the trusted queue RPC violates the Phase 43 contract.

### Small UI Follow-Ups

These are in scope only after the account-boundary work is stable and only if they remain source/test-only:

- Make Email + password the first/default sign-in option and Magic link the second option.
- Remove global header chips for `READY`, `DAILY`, `PRACTICE`, `GO CHAIN`, and `BANKS` where safe.
- Move Public Site Stats lower on the Stats page and place its heading/description outside the public stats card.
- Reduce Help to a simple transitional placeholder.
- Repair Solo gameplay keyboard centering after the first valid guess if bounded.

## Out Of Scope

- Source/runtime implementation before a later execution prompt.
- Test implementation before a later execution prompt.
- Supabase migrations, migration execution, or Supabase/Vercel configuration without a later explicit migration/RLS gate.
- Deployment, staging, release, commits, pushes, PRs, merges, branch deletion, or backup workflow execution.
- Public/guest spectator contract changes.
- Spectator presence, aggregate counts, identity-bearing spectator lists, viewer tracking, chat, or social spectator behavior.
- Service workers, push subscriptions, and background push.
- Gameplay-rule changes, including draw-by-repetition.
- Elo algorithm changes, rating-authority changes, or ranked result formula changes.
- Profile/public-profile/private-profile data-contract simplification.
- Custom-code private Daily, ranked Daily, ranked private invitations, direct ranked challenges, Daily match requests, and Daily custom invitations.
- Full social inbox/mailbox work, following, messaging, or full notification-center redesign.
- Rich Help/tutorial media.
- Configurable Home widgets or private request inbox widgets.
- Live/Active/Home spectator previews or participant-owned spectator preview expansion.
- App-wide UTC/local timestamp policy implementation.
- Admin live queue/lobby/match observability dashboard.
- Progression HUD counters, Focus Mode, compact navigation, broad mobile shell overhaul, theme proposal modernization, or concrete theme implementation.
- Original stable `brrrdle` repository work.

## Success Criteria

- Signed-in account state does not remain visible after sign-out.
- Guest state does not silently overwrite signed-in account state on sign-in.
- Daily Solo OG/GO and Practice Solo OG/GO are verified across signed-in, signed-out, and sign-in transition paths.
- History, Leaderboard/rating summaries, Active Multiplayer, Settings, and Stats have explicit signed-out behavior coverage.
- Account sync remains usable and does not leak or silently merge unintended guest/account state.
- Private Practice request eligibility is either source-fixed or routed to a precise migration/RLS addendum.
- Ranked Practice third-player fairness is either confirmed under compatibility rules or routed to a precise migration/RLS addendum.
- Small UI follow-ups are completed only if low risk and source-only.
- Final Phase 44 hardening produces changelog, manual checklist, visual review evidence, progress report, and verification evidence when later authorized.

## Recommended Stage Breakdown

### Stage 44.0 - Protected Baseline And Intake Confirmation

- Confirm repo path, branch, status, remotes, `HEAD`, and `origin/main`.
- Confirm original stable `brrrdle` is not used.
- Preserve `planning/phase-43/REVIEW-CHECKLIST.md`.
- Record current Phase 44 planning/spec/progress artifacts.
- Run the baseline verification gate.
- Do not begin audit or implementation.

### Stage 44.1 - Account And Guest State Boundary Audit

- Reproduce and classify all reported account/guest bleed paths.
- Map local storage, account sync, sign-out cleanup, route state, and view-model caches.
- Decide whether Stage 44.2 can remain source/test-only.
- Create a storage-contract addendum only if the repair needs destructive cleanup, schema migration, or a new explicit transfer/merge contract.
- Do not implement fixes.

### Stage 44.2 - Account-Scoped Local State Repair

- Implement the smallest safe source/test repair for account and guest state isolation.
- Preserve guest play, account play, Supabase sync, Daily integrity, Practice resume behavior, and no-Supabase local behavior.
- Add focused unit/component tests plus browser/E2E coverage where practical for sign-in/sign-out transitions.
- Stop if the evidence requires unreviewed storage migration, data deletion, or Supabase contract changes.

### Stage 44.3 - Boundary Regression, Private Request Eligibility, And Ranked Queue Classification

- Expand focused regression coverage for account-boundary surfaces after Stage 44.2.
- Audit and repair private Practice request eligibility if source-only.
- Reproduce or classify ranked Practice third-player fairness with real Supabase-backed contexts if practical.
- Route any RPC/RLS contract gap to an addendum instead of patching around it in source.

### Stage 44.4 - Small Manual Review UI Follow-Ups

- Apply only the bounded source-only UI follow-ups:
  - sign-in default order;
  - global header chip removal;
  - Stats public-site placement;
  - Help placeholder simplification.
- Preserve Phase 43 shell/Home cleanup, Phase 42 stats/dashboard/help contracts, and account-boundary repairs.

### Stage 44.5 - Gameplay Keyboard Centering Follow-Up

- Repair Solo gameplay keyboard centering after the first valid guess if source-only and safe.
- Preserve Phase 39 mobile scroll smoothness, Phase 43 back-to-top behavior, validation behavior, Hard Mode, scoring, and gameplay rules.

### Stage 44.6 - Final Hardening, Visual Review, Changelog, And Manual Checklist

- Review all Phase 44 stages for regressions, stale docs, privacy gaps, visual issues, route gaps, and cleanup needs.
- Add only narrow final-hardening fixes if required.
- Run focused regression coverage and final verification.
- Run visual handoff review with ignored local-only artifacts.
- Create `planning/phase-44/CHANGELOG.md`.
- Create `planning/phase-44/REVIEW-CHECKLIST.md`.
- Halt before Git handoff preparation.

## Likely Files And Modules

Likely source surfaces for later approved stages:

- `src/account/guestStorage.ts`
- `src/account/storageSchema.ts`
- `src/account/sync.ts`
- `src/account/guestTransfer.ts`
- `src/account/auth.ts`
- `src/account/AuthModal.tsx`
- `src/account/AuthPanel.tsx`
- `src/account/ProfilePanel.tsx`
- `src/account/Settings.tsx`
- `src/account/publicProfile.ts`
- `src/app/App.tsx`
- `src/app/navigationState.ts`
- `src/app/routes.ts`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/solo/SoloWorkspace.tsx`
- `src/history/HistoryWorkspace.tsx`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/privateMatchmaking.ts`
- `src/stats/StatsDashboard.tsx`
- `src/help/HelpPanel.tsx`
- `src/dashboard/DashboardHome.tsx`

Likely tests and E2E surfaces:

- `src/account/*.test.ts`
- `src/account/*.test.tsx`
- `src/app/*.test.ts`
- `src/app/*.test.tsx`
- `src/solo/*.test.tsx`
- `src/history/*.test.tsx`
- `src/leaderboards/*.test.tsx`
- `src/multiplayer/*.test.ts`
- `src/multiplayer/*.test.tsx`
- `src/stats/*.test.tsx`
- `src/help/*.test.tsx`
- `e2e/fixtures/`
- `e2e/gameplay/`
- `e2e/layout/mobile-scroll.spec.ts`

Likely documentation and Supabase context:

- `docs/supabase.md`
- `docs/ranked-multiplayer.md`
- `planning/phase-44/`
- `planning/specs/phase-44/`
- `supabase/migrations/20260621003033_phase29_public_profile_rls.sql`
- `supabase/migrations/20260701221500_phase40_private_match_requests.sql`
- `supabase/migrations/20260703230106_phase43_ranked_queue_matching_fairness.sql`

## Migration, RLS, And Storage-Contract Gates

### Storage-Contract Addendum Gate

A storage-contract addendum is required before implementation continues if Stage 44.1 or 44.2 proves that a safe repair requires:

- a new persisted guest-progress schema version;
- destructive local cleanup;
- one-time account-specific local storage migration;
- explicit local guest-to-account transfer semantics that differ from the current sync behavior;
- cloud progress merge contract changes;
- any data-loss-prone fallback.

The addendum must define preflight checks, rollback-safe behavior, migration tests, and user-visible fallback rules before source repair proceeds.

### Migration/RLS Addendum Gate

A migration/RLS addendum is required before implementation continues if:

- private Practice request eligibility fails because the Supabase RPC contract incorrectly rejects active public profiles;
- ranked queue fairness violates the Phase 43 RPC contract;
- any proposed fix requires database grants, policies, functions, tables, indexes, or remote data cleanup.

No Stage 44 source stage may patch around a proven server-side contract bug without a reviewed addendum.

## Privacy And Supabase Constraints

- Do not expose raw auth ids, emails, Supabase session objects, auth metadata, service keys, access tokens, refresh tokens, private profile rows, private progress rows, or local artifacts.
- Public profile data must remain limited to existing public-profile RPC allowlists.
- Public stats must remain aggregate-only and separate from private account progress.
- Admin dashboard access and payload boundaries from Phase 42 must remain unchanged.
- Private Practice request payloads must remain authenticated-only, active-public-profile-targeted, Practice-only, unranked-only, and sanitized.
- Ranked queue payloads must remain authenticated-only and free of raw queue internals beyond existing approved safe fields.
- Public/guest spectator read-only boundaries and Daily spectator exclusion must remain unchanged.

## Account And Guest State Constraints

- Effective identity must be explicit in implementation planning before state writes are changed.
- Guest state and authenticated account state must not silently merge on route render.
- Sign-out must not leave authenticated account state visible to the guest UI.
- Sign-in must not upload or merge guest state into the authenticated account without reviewed intent.
- No-Supabase local play must continue to work.
- Existing legitimate guest progress must not be discarded without a reviewed storage gate.
- Existing legitimate authenticated progress must not be overwritten by a stale local guest cache.

## Private Matchmaking Constraints

- Private Practice requests remain unranked Practice only.
- Public leaderboard/rating eligibility must not be required for private unranked Practice requests.
- Active public profile eligibility remains required unless a later approved spec changes the privacy model.
- Accepted-game routing, participant-owned load/open behavior, raw auth id hiding, and v2 accept boundaries from Phase 40 must remain intact.

## Ranked Queue Constraints

- Preserve Phase 43 fairness contract.
- Preserve browser-facing `claim_ranked_async_matchmaking_pair(text, text)` signature and response shape unless a later migration/RLS spec explicitly changes it.
- Preserve mode, word length, Hard Mode, rating bucket, and ranked time-control compatibility.
- Preserve cancellation, expiration, stale-row denial, self-match denial, trusted finalization, trusted settlement, Daily ranked deferral, gameplay rules, and Elo math.

## UI Follow-Up Constraints

- Sign-in order changes must not change auth provider configuration or error handling.
- Global header chip removal must not remove real navigation, account, notification, or countdown functionality.
- Stats public-site repositioning must preserve aggregate-only public stats and local-private stats separation.
- Help placeholder simplification must preserve a reachable Help route.
- Keyboard centering must preserve existing scroll smoothness, back-to-top behavior, and gameplay validation behavior.

## Verification Strategy

Each implementation stage should run focused tests first, then the relevant broad gate for its risk:

- account/storage/parser/unit tests for persistence changes;
- focused component tests for Settings, Stats, Help, Auth, Solo, History, Leaderboard, and Multiplayer surfaces;
- real browser/E2E coverage for sign-in/sign-out transitions and Supabase-backed private/ranked cases where needed;
- `npm run lint`;
- `npm run test`;
- focused relevant Playwright/E2E commands;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

Stage 44.6 should run the final full gate including `npm run test:e2e` and `npm run test:full`.

## Visual Review Expectations

Final Phase 44 visual review should inspect at least:

- signed-out guest Home after sign-out from an authenticated account;
- signed-in account Home after guest activity on the same device;
- Practice Solo OG and GO resume surfaces across identity transitions;
- Daily Solo OG and GO across identity transitions;
- History, Stats, Leaderboard, Active Multiplayer, and Settings after sign-out;
- Auth modal with Email + password as the first/default option if Stage 44.4 implements it;
- Stats page public-site section placement if Stage 44.4 implements it;
- Help route placeholder if Stage 44.4 implements it;
- Solo gameplay keyboard centering if Stage 44.5 implements it.

Visual artifacts must remain under an ignored local-only path such as `test-results/visual-review/phase-44-stage-44-6/`.

## Manual Checklist Expectations

`planning/phase-44/REVIEW-CHECKLIST.md` should be created only during final hardening. It should include:

- account/guest isolation checks;
- Daily Solo OG/GO boundary checks;
- Practice Solo OG/GO boundary checks;
- History, Leaderboard, Active Multiplayer, Settings, and Stats sign-out checks;
- private Practice request eligibility check;
- ranked Practice third-player fairness classification;
- small UI follow-up checks if implemented;
- regression checks for Phase 43, Phase 42, Phase 41, Phase 40, Phase 39, and Phase 38 boundaries.

## Risks

- A naive sign-out cleanup could delete valid guest progress or authenticated progress.
- A naive sign-in sync repair could break intentional guest-to-account transfer.
- Local storage key changes can orphan existing progress unless migration behavior is planned.
- Daily state repair can accidentally affect Daily claim safety or deterministic puzzle selection.
- Private Practice request eligibility may be a server-side predicate issue rather than a source bug.
- Ranked fairness concerns may be expected compatibility behavior and should not trigger a database change without reproduction.
- Header chip removal and keyboard centering can create layout regressions on mobile.

## Open Decisions

- Should guest and authenticated local progress use separate storage keys, or should current `brrrdle:guest-progress:v1` be wrapped by an account-aware resolver?
- Should guest-to-account transfer remain automatic during sync, become explicit, or remain automatic only for first sign-in with no cloud progress?
- What is the expected guest-visible fallback after sign-out: fresh default guest state, prior guest state, or a user-selectable resume?
- Should Settings be strictly identity-scoped or should some preferences remain device-scoped?
- Does the private Practice request bug reproduce with a fresh active public profile and no ranked Elo?
- Does the ranked queue concern reproduce with a truly compatible third waiting player?

## Next Gated Action

The next safe action is to create `planning/phase-44/IMPLEMENTATION-PLAN.md` for review only. That plan should turn this unified specification into narrow stages and define the Stage 44.0 baseline prompt. It must not begin implementation.
