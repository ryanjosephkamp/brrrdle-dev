# Phase 44 Planning Brief

**Status**: Draft planning brief for review only.
**Phase**: Phase 44 - Account-Scoped Local State Isolation And Phase 43 Manual Review Follow-Up.
**Date**: 2026-07-04.
**Repository**: `brrrdle-dev`.

## Authority

This brief is governed by:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `planning/phase-43/REVIEW-CHECKLIST.md`.
7. `planning/phase-44/PHASE-44-MANUAL-REVIEW-INTAKE-AND-ROUTING-2026-07-04.md`.
8. Current roadmap, testing, progress, and supporting workflow documents.

This document does not authorize implementation. It does not authorize source/runtime edits, test edits, migrations, Supabase or Vercel configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, Elo changes, local Codex skill changes, secret printing, private data exposure, local artifact exposure, or work in the original stable `brrrdle` repository.

## Current Baseline

- Phase 43 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `173a82951927d134ae4f60e0250444a41916cab5`.
- The user-updated Phase 43 manual review checklist at `planning/phase-43/REVIEW-CHECKLIST.md` must be preserved.
- Phase 43 final evidence exists at `progress/PROGRESS-STEP-390.md`, `planning/phase-43/CHANGELOG.md`, and `planning/phase-43/REVIEW-CHECKLIST.md`.
- Phase 44 manual review intake/routing exists at `planning/phase-44/PHASE-44-MANUAL-REVIEW-INTAKE-AND-ROUTING-2026-07-04.md`.
- Progress evidence exists through `progress/PROGRESS-STEP-390.md`.

## Phase 43 Manual Review Result

Phase 43 manual review was not clean, but the findings are clear enough to plan safely. The user reported that the game looks significantly better and that Phase 43 was broadly successful. The most serious remaining issue is not visual: signed-in and signed-out local state appear to bleed into each other.

Reported follow-up issues:

- signed-in Practice Solo OG and GO progress remains visible after sign-out;
- guest Practice Solo OG and GO progress can overwrite signed-in account progress after sign-in;
- guest Daily Solo OG and GO progress can carry into a signed-in account and overwrite Daily progress;
- History remains visible after sign-out;
- leaderboard rating/Elo summary state remains visible after sign-out;
- Active Multiplayer projections remain visible after sign-out, although guests cannot play them;
- Settings carry across signed-in and guest state;
- Stats did not appear to carry over in the manual review, but still need explicit audit coverage;
- private Practice request creation may incorrectly reject a player with an active public profile but no established ranked Elo;
- ranked Practice matching may still allow an immediate rematch despite a third compatible waiting player;
- Solo gameplay keyboard centering still needs follow-up after the first valid guess;
- small current UI follow-ups remain for sign-in ordering, header chips, Stats public-site placement, and Help placeholder copy;
- larger future improvements remain for Home widgets, Live/Active previews, timestamps, notification clarity, profile simplification, and admin observability.

## Phase-Sizing Decision

Phase 44 should be a cohesive macro-phase because the highest-priority findings share identity, persistence, account-boundary, local-storage, route hydration, and privacy expectations. The stage breakdown must remain narrow because account isolation, private matchmaking eligibility, ranked queue reproduction, and UI cleanup are different risk classes.

The phase should not become a broad "all remaining UX notes" phase. The account/guest state boundary is the phase anchor. The smaller manual-review follow-ups are included only because they are bounded, source/test-only candidates that can be sequenced after the account boundary is understood.

## Goals

- Reproduce and classify signed-in versus guest state bleed across current gameplay, history, leaderboard, multiplayer, settings, and stats surfaces.
- Repair account-scoped and guest-scoped local state isolation without losing valid guest play, account sync behavior, or Daily claim safety.
- Prevent guest progress from overwriting signed-in account progress unless a reviewed transfer/merge path explicitly authorizes it.
- Prevent signed-in account progress, history, leaderboard summaries, and active multiplayer projections from remaining visible to a signed-out guest.
- Audit and repair the private Practice request active-public-profile eligibility issue if source/test-only; route to migration/RLS addendum planning if the RPC contract is wrong.
- Reproduce or classify the ranked Practice matching fairness concern from the Phase 43 manual review, without changing Elo, gameplay, or trusted settlement.
- Complete only small, low-risk current UI follow-ups if account-boundary work is stable.
- Preserve Phase 43 ranked queue fairness, Phase 42 stats/dashboard/help contracts, Phase 41 multiplayer reliability, Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, Phase 38 spectator boundaries, Daily claim safety, gameplay rules, and Elo math.

## In Scope

### Account And Guest State Boundary Audit

- Map all local and synced persistence surfaces that can affect signed-in, signed-out, and guest views.
- Reproduce the reported bleed paths for Practice Solo OG, Practice Solo GO, Daily Solo OG, Daily Solo GO, History, leaderboard rating summaries, Active Multiplayer projections, Settings, and Stats.
- Determine whether the root cause is local storage key scoping, guest-to-account merge behavior, sign-out cleanup, account sync hydration, cached route state, or a combination.
- Decide whether source/test-only repair is sufficient or whether a storage schema migration/addendum is needed.

### Account-Scoped Local State Repair

- Repair guest/account local state isolation with the smallest safe source/test change.
- Preserve guest play and account play as valid first-class experiences.
- Preserve intentional guest-to-account transfer behavior while preventing silent overwrite.
- Preserve Daily claim safety, Daily determinism, Practice resume behavior, history integrity, settings expectations, local stats, and account sync boundaries.
- Add focused tests and browser/E2E coverage for sign-in/sign-out transitions where practical.

### Private Practice Request Eligibility Follow-Up

- Audit the request flow that returned `Requester must have an active public profile.` for a player who believed their public profile was active.
- Confirm whether the failure is source state, current-account mismatch, stale public-profile fetch, misleading error text, or an RPC predicate issue.
- Keep unranked private Practice requests independent of established Elo or public leaderboard eligibility.
- Stop and route to a migration/RLS addendum if the database contract incorrectly requires ranked eligibility or otherwise misclassifies active public profiles.

### Ranked Practice Matching Follow-Up

- Reproduce or characterize the manual-review scenario where two recent opponents rematched despite a third waiting player.
- Verify compatibility details before calling it a contract failure: mode, word length, Hard Mode, time control, rating bucket, expiration, cancellation, stale-row state, and self-match denial.
- Preserve the Phase 43 rule: prefer a compatible non-recent opponent when one exists, but allow recent rematch when no compatible non-recent player is waiting.
- Stop and route to a migration/RLS addendum if the trusted queue RPC violates the Phase 43 contract.

### Small Manual-Review UI Follow-Ups

Include only if source-only and low risk:

- Make Email + password the first/default sign-in option and Magic link the second option.
- Remove the global header chips for `READY`, `DAILY`, `PRACTICE`, `GO CHAIN`, and `BANKS` where safe.
- Move Public Site Stats lower on Stats and place its header/description outside the public stats card, matching Local Stats treatment.
- Reduce Help to a simple under-construction or transitional placeholder.
- Repair Solo gameplay keyboard centering after the first valid guess if bounded.

## Out Of Scope

- Source/runtime implementation before later approval.
- Test implementation before later approval.
- Supabase migrations, migration execution, or Supabase/Vercel configuration.
- Deployment, staging, release, commits, pushes, PRs, merges, branch deletion, or backup workflow execution.
- Public/guest spectator contract changes.
- Spectator presence, aggregate counts, identity-bearing spectator lists, sorting, or viewer tracking.
- Service workers, push subscriptions, or background push.
- Gameplay-rule changes, including draw-by-repetition.
- Elo algorithm changes or rating-authority changes.
- Profile/public-profile/private-profile data-contract simplification.
- Custom-code private Daily, ranked Daily, ranked private invitations, direct ranked challenges, Daily match requests, and Daily custom invitations.
- Full social inbox/mailbox work, following, messaging, or full notification-center redesign.
- Rich Help/tutorial media.
- Configurable Home widgets or private matchmaking inbox widgets.
- Live/Active/Home spectator preview expansion, except as read-only audit context.
- App-wide UTC/local timestamp policy implementation.
- Admin live queue/lobby/match observability dashboard.
- Progression HUD counters, Focus Mode, compact navigation, or broad mobile shell overhaul.
- Theme proposal modernization or concrete theme implementation.
- Original stable `brrrdle` repository work.

## Recommended Phase 44 V1 Scope

The recommended V1 is a reliability and boundary phase with a small cleanup tail:

1. Prove and fix account/guest state isolation first.
2. Add regression coverage that prevents silent guest/account overwrite paths.
3. Audit private Practice request eligibility and ranked queue fairness while account surfaces are under review.
4. Apply only small source-only UI follow-ups after account-state repair is stable.
5. Finish with focused regression, final hardening, visual review, changelog, and manual checklist.

## Recommended Stage Breakdown

### Stage 44.0 - Protected Baseline And Manual Review Intake

- Confirm repo path, branch, status, remotes, `HEAD`, and `origin/main`.
- Confirm original stable `brrrdle` is not used.
- Preserve `planning/phase-43/REVIEW-CHECKLIST.md`.
- Record current Phase 44 planning/intake/progress artifacts.
- Run the protected baseline verification gate.
- Do not begin audit or implementation.

### Stage 44.1 - Account/Guest State Boundary Audit

- Reproduce and classify every reported signed-in/guest bleed path.
- Map local storage keys, account sync hydration, sign-out handling, guest transfer behavior, and route-level cache/view-model state.
- Decide whether Stage 44.2 can remain source/test-only or whether storage schema/migration planning is required.
- Do not implement fixes during the audit.

### Stage 44.2 - Account-Scoped Local State Repair

- Implement the smallest safe source/test repair for account-scoped and guest-scoped local state separation.
- Preserve valid guest progress, valid account progress, and explicitly authorized guest-to-account transfer.
- Add focused tests for Daily, Practice, history, settings, stats, leaderboard, and multiplayer state boundaries where practical.
- Stop if repair requires destructive local data cleanup or unreviewed storage migration behavior.

### Stage 44.3 - Account Boundary Regression And Private Request Eligibility

- Add broader focused regression coverage for sign-in/sign-out transitions.
- Audit and repair private Practice request active-public-profile eligibility if source-only.
- Route to a migration/RLS addendum if RPC behavior is wrong.
- Reproduce or classify the ranked Practice third-player fairness concern and route any contract gap.

### Stage 44.4 - Small Manual Review UI Follow-Ups

- Apply the bounded source-only UI follow-ups approved by the spec:
  - sign-in default ordering;
  - global header chip removal;
  - Stats public-site placement;
  - Help placeholder.
- Preserve Phase 43 shell/Home cleanup and Phase 42 stats/dashboard/help contracts.

### Stage 44.5 - Gameplay Keyboard Centering Follow-Up

- Repair Solo gameplay keyboard centering after the first valid guess if source-only and safe.
- Preserve Phase 39 mobile scroll smoothness and Phase 43 back-to-top behavior.
- Do not change gameplay rules, validation rules, Hard Mode, scoring, or board state.

### Stage 44.6 - Final Hardening, Visual Review, Changelog, And Manual Checklist

- Review Phase 44 stages for regressions, stale docs, privacy gaps, visual issues, route gaps, and cleanup needs.
- Add only narrow final-hardening fixes if required.
- Run focused regression coverage and final verification.
- Run visual handoff review with ignored local-only artifacts.
- Create `planning/phase-44/CHANGELOG.md`.
- Create `planning/phase-44/REVIEW-CHECKLIST.md`.
- Halt before Git handoff preparation.

## Success Criteria

- Signed-in account progress does not remain visible after sign-out.
- Guest progress does not silently overwrite signed-in account progress on sign-in.
- Signed-in Practice Solo, Daily Solo, History, leaderboard summaries, Active Multiplayer projections, Settings, and Stats have explicitly verified signed-out behavior.
- Daily Solo account-boundary behavior remains claim-safe and deterministic.
- Account sync remains usable and does not expose or merge unintended guest/account state.
- Private Practice request eligibility is either fixed or routed to a precise migration/RLS addendum.
- Ranked Practice third-player fairness is either confirmed under compatibility rules or routed to a precise migration/RLS addendum.
- Small UI follow-ups are completed only if they remain low risk and source-only.
- Final verification passes and Phase 44 produces changelog, manual checklist, progress records, and visual handoff artifacts when authorized.

## Likely Files And Modules

Likely source surfaces for later approved stages:

- `src/account/guestStorage.ts`
- `src/account/storageSchema.ts`
- `src/account/sync.ts`
- `src/account/guestTransfer.ts`
- `src/account/auth.ts`
- `src/account/AuthPanel.tsx`
- `src/account/ProfilePanel.tsx`
- `src/account/Settings.tsx`
- `src/account/publicProfile.ts`
- `src/app/App.tsx`
- `src/app/navigationState.ts`
- `src/app/routes.ts`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/game/storage/`
- `src/solo/SoloWorkspace.tsx`
- `src/history/HistoryWorkspace.tsx`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/privateMatchmaking.ts`
- `src/stats/StatsDashboard.tsx`
- `src/help/HelpPanel.tsx`
- `src/dashboard/DashboardHome.tsx`

Likely tests and E2E surfaces for later approved stages:

- `src/account/*.test.ts`
- `src/app/*.test.tsx`
- `src/app/*.test.ts`
- `src/solo/*.test.tsx`
- `src/history/*.test.tsx`
- `src/leaderboards/*.test.tsx`
- `src/multiplayer/*.test.tsx`
- `src/multiplayer/*.test.ts`
- `src/stats/*.test.tsx`
- `src/help/*.test.tsx`
- `e2e/fixtures/`
- `e2e/gameplay/`
- `e2e/layout/mobile-scroll.spec.ts`

Likely docs/planning surfaces:

- `planning/phase-44/`
- `planning/specs/phase-44/`
- `planning/testing/TESTING-SUITE.md`
- `docs/supabase.md`
- `docs/ranked-multiplayer.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

## Migration/RLS Constraints And Addendum Gates

Phase 44 should remain source/test-only unless audit evidence proves a database or storage contract gap.

Create a reviewed migration/RLS or storage-contract addendum before any migration or durable contract change if:

- private Practice request eligibility is caused by the RPC predicate rather than app state;
- ranked queue fairness violates the Phase 43 server-side contract;
- account/guest isolation requires a storage schema version migration beyond source-only key scoping;
- any repair would alter Supabase grants, RLS policies, trusted RPCs, Daily claims, ranked settlement, private matchmaking authority, public profile privacy, or public/guest spectator projections.

No migration execution is authorized by this planning brief.

## Privacy And Supabase Constraints

- Do not expose raw auth IDs, raw emails, private profile fields, hidden profile state, auth metadata, sessions, tokens, Supabase keys, Vercel tokens, screenshots, videos, traces, local artifacts, answer-bearing data, seeds, queue internals, rating internals, settlement internals, or private account data.
- Keep public profile data limited to approved active-public fields.
- Keep private Practice request data authenticated-only and participant-owned.
- Keep public stats aggregate-only and private developer dashboard admin-gated.
- Keep public/guest spectator read-only, Practice-only, sanitized, and Daily-excluded.
- Keep browser clients on trusted RPC seams for ranked queue, trusted settlement, private matchmaking, public profiles, public leaderboard, and admin dashboard behavior.

## Account And Guest State Constraints

- Guest play remains supported.
- Signed-in account play remains supported.
- Guest-to-account transfer remains explicit and intentional, not silent or incidental.
- Sign-out must not leave prior account-owned gameplay/history/leaderboard/multiplayer state visible to a guest view.
- Guest state must not silently overwrite account state after sign-in.
- Daily state must preserve current Daily integrity and claim safety.
- Settings behavior must be intentionally classified: either account-scoped, guest-scoped, or explicitly global/device-local.
- Stats behavior must be explicitly classified and tested.

## Private Matchmaking Constraints

- Private requests remain authenticated-only, unranked-only, Practice-only, and public-profile-targeted.
- Established Elo, ranked leaderboard eligibility, rating bucket, and ranked queue state must not be required for an unranked private Practice request.
- If the RPC only requires active public profile eligibility, the source integration should not mislead users with stale profile state.
- If the RPC actually rejects a valid active public profile, stop and route to migration/RLS addendum planning.

## Ranked Queue Constraints

- Preserve Phase 43 ranked queue fairness migration behavior.
- Preserve the browser-facing ranked queue RPC signature and response shape.
- Preserve same-settings ranked Practice search-again.
- Preserve cancellation, expiration, stale-row denial, trusted finalization, trusted settlement, rating bucket/time-control compatibility, Daily ranked deferral, gameplay rules, and Elo math.
- Do not broaden ranked queue authority or expose queue internals to the browser.

## UI Follow-Up Constraints

- Small UI follow-ups must not become a new shell redesign.
- Header chip removal must not remove needed gameplay, Daily, Practice, bank, or progression state from the underlying data model; it is a display cleanup only.
- Stats public-site placement must preserve aggregate-only public stats and local/private stats separation.
- Help placeholder work must preserve navigation and leave room for later rich tutorial media.
- Sign-in ordering must not change auth providers, Supabase configuration, redirect behavior, or password/magic-link semantics.
- Keyboard centering must not change gameplay validation, board state, Hard Mode, scoring, or input rules.

## Verification Strategy

Planning and documentation stages should use lightweight checks:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Implementation stages should run focused tests first, then the standard stage gate:

- `npm run lint`
- `npm run test`
- focused relevant Playwright/E2E where browser or account transition behavior changes
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup checks for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

Final hardening should include broad focused regression, feasible E2E coverage for account boundaries and affected manual-review surfaces, visual handoff review, changelog, manual checklist, and final verification.

## Visual Handoff Review Expectations

Phase 44 final hardening should capture only ignored local artifacts under:

`test-results/visual-review/phase-44-stage-44-6/`

Recommended visual scenarios:

- signed-out Home after prior account sign-out;
- signed-out Solo/Daily state after prior account use;
- signed-out History/Leaderboard/Active Multiplayer state after prior account use;
- Stats after public-site placement cleanup;
- Help placeholder;
- sign-in modal order;
- header after chip removal;
- gameplay keyboard centering if changed.

Screenshots, videos, traces, auth state, tokens, secrets, and local session artifacts must not be staged or committed.

## Manual Review Checklist Expectations

Phase 44 should create:

`planning/phase-44/REVIEW-CHECKLIST.md`

The checklist should include:

- signed-in to guest boundary checks;
- guest to signed-in boundary checks;
- Practice Solo OG/GO checks;
- Daily Solo OG/GO checks;
- History/Leaderboard/Active Multiplayer sign-out checks;
- Settings and Stats classified behavior checks;
- private Practice request eligibility check;
- ranked queue fairness spot-check or documented routing;
- sign-in order, header chip, Stats, Help, and keyboard follow-up checks if implemented;
- preserved invariants for public/guest spectator, Daily claims, ranked settlement, private matchmaking, gameplay rules, and Elo math.

## GitHub Backup Workflow Expectations

Git handoff is not part of Phase 44 planning, specification, or implementation stages. After Phase 44 final hardening and manual checklist are complete, a separate Git handoff preparation pass should verify exact changed files and produce an allowlisted backup prompt. The governed `brrrdle-github-backup` workflow may run only after explicit authorization.

## Risks

- Account/guest state isolation touches high-conflict persistence and route hydration surfaces.
- Silent guest-to-account overwrite behavior could be tied to intentional transfer/merge code and needs careful separation from bugs.
- Daily state repair could accidentally affect Daily claim or deterministic resume behavior if not tested carefully.
- Sign-out cleanup could over-clear desired device-local settings if settings scope is not decided explicitly.
- Private request eligibility may require a migration/RLS addendum if the RPC predicate is wrong.
- Ranked queue fairness might be expected behavior if the waiting third player was not actually compatible.
- Header chip removal may have broad visual/test impact if route headers assume those controls exist.

## Open Decisions

- Which local settings are intended to be account-scoped, guest-scoped, or device-global?
- Should signed-out History and Leaderboard show empty guest-only state or a signed-out privacy message?
- Should Active Multiplayer after sign-out hide all prior account projections or show an auth-required empty state?
- Should guest-to-account transfer remain automatic anywhere, or should it always require explicit user intent?
- Is the private Practice request failure source-side stale profile state, account mismatch, or a Supabase RPC predicate issue?
- Was the ranked queue third player compatible under every Phase 43 matching filter?
- Should keyboard centering be handled in the game surfaces or the shared gameplay auto-center helper?

## Next Gated Prompt

After reviewing this brief, the next safe action is to create the unified Phase 44 specification for review only. No implementation should begin until the Phase 44 spec and detailed implementation plan are also reviewed.
