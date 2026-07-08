# Phase 50 Ranked Practice FIFO Matchmaking Plan

**Status**: Planning and prompt-package artifact only. No source/runtime implementation, test implementation, local migration source change, remote Supabase action, deployment, Git/GitHub action, final Phase 50 closure, next-phase work, or stable `brrrdle` repository work is authorized by this document.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-08.
**Prompt package**: `prompt-packages/phase-50/PHASE-50-RANKED-PRACTICE-FIFO-MATCHMAKING-FOLLOW-UP-PROMPT-2026-07-08.md`.

## User-Reported Hosted Behavior

The user reported that the Phase 50 Solo persistence and manual refresh-to-Home behavior now pass on the hosted/live Review Candidate. Ranked Practice Multiplayer remains the main remaining blocker before Phase 50 can close.

Current hosted findings:

- Ranked Practice GO matchmaking appears to work.
- Ranked Practice OG matchmaking still does not reliably match two different signed-in accounts in two different browsers.
- Some ranked matches can become difficult or impossible to forfeit out of once created.
- Repeated ranked matching between the same two players appears artificially inhibited. Two players who recently played each other do not reliably match again, while adding a third profile can make matching work again.
- The user wants ranked Practice matchmaking simplified to a first-come, first-served queue for now. The current same-opponent suppression/fairness behavior should be removed or bypassed.

Related but deferred observations:

- Emoji or special-character public profile names can appear to break Daily Multiplayer for the affected account. This should be routed to a later profile-name/public-identity policy pass unless it is found to be directly blocking the ranked FIFO fix.
- A future admin/debug surface that visualizes ranked queue state in near real time would be useful, but it should be routed to a later admin dashboard or observability phase rather than implemented in this Phase 50 follow-up.

## Current Implementation

### Frontend Flow

The ranked Practice queue UI flow is concentrated in `src/multiplayer/MultiplayerPanel.tsx` and helper modules:

- `enterRankedQueue` builds a ranked Practice request from selected mode, word length, Hard Mode, and ranked time-control settings.
- `buildRankedQueueRequestInput` and `withRankedQueueExpiry` in `src/multiplayer/multiplayerPanelRankedQueue.ts` normalize supported ranked tracks and attach a five-minute expiry to newly created queue requests.
- `rankedQueueActions.createRankedQueueRequest` calls the trusted Supabase RPC `create_ranked_async_matchmaking_request`.
- `rankedQueueActions.claimRankedQueuePair` calls the trusted Supabase RPC `claim_ranked_async_matchmaking_pair`.
- If a pair is matched, `finalizeRankedQueueMatch` loads ranked queue status, builds a local `MultiplayerGame` projection, calls `finalize_ranked_async_matchmaking_game`, merges the finalized game into visible state, and selects it.
- Step 497 added a narrow recovery path: if finalization throws after a durable matched ranked Practice game already exists for the viewer, the UI reloads multiplayer state and opens the durable game.

That means the remaining repeated-match issue is unlikely to be a separate OG frontend path. OG and GO use the same frontend ranked queue functions. The difference is more likely in queue data, rating bucket/history, stale rows, recent-opponent behavior, or the hosted database RPC behavior for the OG ranked bucket.

### Supabase Ranked Pairing Flow

The current ranked pairing logic is defined by `supabase/migrations/20260703230106_phase43_ranked_queue_matching_fairness.sql`, which replaces `public.claim_ranked_async_matchmaking_pair(text, text)`.

The RPC currently:

- requires an authenticated caller;
- expires queued requests whose `expires_at` has passed;
- loads the caller-owned queue row with `for update`;
- requires the caller's request to still be `queued`;
- requires async Practice ranked settings and supported ranked time controls;
- filters candidates by non-self user, queued status, async Practice scope, ranked flag, mode, rating bucket, Hard Mode, word length, time control, supported ranked track, unexpired status, and rating-band compatibility;
- orders candidates by:
  1. whether `phase43_is_recent_ranked_practice_opponent(...)` reports the candidate as a recent same-settings opponent;
  2. absolute rating distance;
  3. candidate `queued_at`;
  4. candidate id.

The helper `phase43_is_recent_ranked_practice_opponent(...)` checks for a terminal ranked Practice game between the two users in the same mode, rating bucket, word length, Hard Mode, and time-control track during the last 30 minutes.

Important nuance: the current SQL does not appear to hard-filter a recent opponent when that recent opponent is the only compatible candidate. It deprioritizes recent opponents. In a small or stale hosted queue, however, that still creates behavior that is harder to reason about: stale or less relevant non-recent candidates can be preferred over the pair of active testers, and local tests encode fairness instead of the simpler user-accepted rule.

## Recommended Phase 50 Change

For Phase 50, simplify ranked Practice pairing to first-come, first-served among compatible queued requests.

Recommended contract:

- Keep authentication, caller ownership, status, expiry, no-self-match, async Practice scope, ranked flag, mode, rating bucket, Hard Mode, word length, and time-control compatibility.
- Keep `rating_snapshot` for future rating settlement and auditability, but do not use rating distance as a blocker or priority for this Phase 50 queue.
- Remove recent-opponent preference from current ranked Practice pairing.
- Remove rating-distance priority from current ranked Practice pairing unless implementation discovers that the existing data model requires it for a hard invariant. If retained, the implementation must explain why it is still compatible with the first-come, first-served acceptance target.
- Order candidates by `candidate.queued_at asc, candidate.id asc`.
- Preserve the browser-facing RPC signature and result shape of `claim_ranked_async_matchmaking_pair(text, text)`.
- Prefer a new additive local migration that replaces the RPC body and comment. Do not edit old historical migrations unless repository policy or test structure requires it.
- Do not execute remote Supabase SQL, apply a remote migration, change RLS/schema/table structure, or deploy anything without a separate explicit prompt.

This should make the queue behave like a simple active tester pool: if two compatible players are the only queued players, they can match repeatedly. If more players are queued, the caller should be paired with the oldest compatible queued opponent rather than avoiding a recent opponent.

## Implementation Plan For The Follow-Up Prompt

1. Re-read governance, this plan, the Phase 50 checklist/changelog, Step 497, the ranked queue SQL, and the relevant source/tests.
2. Confirm the current SQL contract and tests that encode Phase 43 fairness behavior.
3. Add a small source-controlled migration or equivalent local SQL artifact that redefines `claim_ranked_async_matchmaking_pair(text, text)` for FIFO ranked Practice pairing while preserving the public signature and compatible settings filters.
4. Update or add migration contract tests so the current intended contract is first-come, first-served among compatible requests, not recent-opponent suppression.
5. Update ranked Practice E2E coverage where feasible:
   - OG ranked Practice repeated matching between the same two safe temporary accounts after a terminal ranked match;
   - GO ranked Practice non-regression if feasible within resource limits;
   - ranked forfeit/cancel behavior for created ranked matches if the user-reported stuck match can be reproduced safely.
6. Preserve accepted guardrails:
   - Solo Daily/Practice persistence;
   - guest/account Solo boundaries;
   - manual hard/browser refresh landing and remaining on Home;
   - public/private profile boundaries;
   - existing ranked finalization durable-game recovery;
   - Daily Multiplayer claim-safety and no-clock/five-letter constraints;
   - scoring, reward, Elo/rating formula, and settlement rules.
7. Update Phase 50 checklist/changelog/progress.
8. If verification is clean, generate the next recovered Review Candidate Backup prompt. If the implementation requires applying SQL to a remote Supabase project to verify hosted behavior, stop and report the separate authorization needed instead of executing it.

## Suggested Verification

Minimum local checks for the implementation follow-up:

- focused migration/RPC contract test for the new FIFO SQL;
- `npm run test -- src/multiplayer/rankedQueueFairnessContract.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/multiplayerRepository.test.ts src/multiplayer/privateMatchmaking.test.ts src/app/scopedProgressMultiplayerState.test.ts`;
- `npx playwright test e2e/gameplay/practice-multiplayer-og.spec.ts e2e/gameplay/practice-multiplayer-go.spec.ts e2e/gameplay/private-matchmaking.spec.ts`;
- `npx playwright test e2e/gameplay/multiplayer-reliability.spec.ts e2e/gameplay/multiplayer-focus-refocus.spec.ts`;
- `npx playwright test e2e/navigation/refresh-route-persistence.spec.ts e2e/gameplay/solo-completion-reentry.spec.ts`;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`.

If a local migration cannot affect remote-backed E2E in the current environment, the implementation must be explicit about which checks are contract/local-source checks and which hosted/live checks require a later separately authorized migration/deployment path.

## Out Of Scope

Do not use this follow-up to implement:

- profile-name emoji/special-character validation or public/private profile simplification;
- admin queue visualization or backend observability UI;
- Daily ranked multiplayer;
- ranked direct challenges;
- scoring, Elo/rating formula, reward, coin, XP, or settlement rule changes;
- Solo persistence rewrites;
- refresh-routing rewrites;
- Practice GO answer-selection/randomness changes;
- deployment configuration, public tunneling, release, or production changes;
- final Phase 50 acceptance/closure or Final Acceptance Backup;
- stable `brrrdle` repository work.
