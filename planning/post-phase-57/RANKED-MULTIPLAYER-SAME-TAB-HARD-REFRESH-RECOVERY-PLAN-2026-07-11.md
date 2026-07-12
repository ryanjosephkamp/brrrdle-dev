# Ranked Multiplayer Same-Tab Hard-Refresh Recovery Plan

**Status:** Implemented and automatically verified; governed Review Candidate backup and hosted/manual review remain gated.
**Date:** 2026-07-11.
**Current baseline:** `e7c42284aa23e98d985d8569f6f262c60c58a0fa` from merged PR #68.
**Protected checkpoint:** `phase-57-golden-2026-07-11`.

> **For agentic workers:** Execute this plan test-first and Practice-first. Do not accept a new-page simulation as proof of the reported same-tab hard-refresh behavior.

## Goal

Make an already-created ranked Practice or ranked Daily participant game appear promptly after the participant manually reloads the current browser tab, lands on Home, and re-enters Multiplayer. Preserve every unrelated gameplay, queue, persistence, privacy, economy, and functional-shell contract.

## Hosted Result After PR #68

The hosted Review Candidate did not pass. The user reports that ranked Practice and ranked Daily games still disappear from every expected participant surface after a manual refresh and now take approximately 30-60 seconds to return. The game remains durable and eventually reappears.

This invalidates the previous acceptance claim. The PR #68 source must not be reverted speculatively, but its explicit repository-authority owner is not a sufficient repair and may have lengthened the empty interval by rejecting the account-scoped cached Multiplayer projection until the repository load publishes.

## What The Previous Test Missed

The two PR #68 regressions do not execute the reported browser sequence:

- the Practice regression leaves both original matched pages alive and opens a second page in the host's existing browser context;
- the Daily regression signs in one page and opens a second page in that same context;
- neither reloads the actual participant tab that entered or displayed the ranked match;
- the original live page can retain subscriptions, state, and account activity while the second page starts;
- both tests therefore prove a fresh shared-context page path, not destruction and reconstruction of the active participant page.

The next gate must use `page.reload()` on the actual participant page after UI matchmaking and must not visit Multiplayer between reload completion and the timed re-entry.

## Current Implementation Findings

### Startup Streams

`App` starts with anonymous auth, guest progress, and a local Multiplayer repository. Supabase session recovery then independently causes:

1. account progress download and Solo cloud hydration;
2. replacement of the local Multiplayer repository with a new empty in-memory Supabase repository;
3. a participant-scoped `async_multiplayer_games` load;
4. route/focus/visibility-triggered repository reloads;
5. realtime subscription setup.

These operations do not share one explicit bootstrap generation or completion promise.

### PR #68 Authority Change

PR #68 added `multiplayerAuthorityUserIdRef`. Authenticated progress hydration now:

- preserves the current Multiplayer snapshot only when that ref already names the same user;
- otherwise publishes an empty Multiplayer state and ignores the account-scoped cached projection;
- waits for a later repository snapshot to become visible.

This protects against a stale progress snapshot overwriting an authoritative repository result, but it does not coordinate when the authenticated repository is created, when its first load begins, or which startup generation may publish. It also removes a previously available provisional projection while waiting.

### Repository Readiness

`loadMultiplayerRepositoryWithRetry` retries only a thrown read once, immediately. The Supabase repository starts empty, and its subscription publishes only after a database change triggers `refresh()`. A successful load is accepted without a lifecycle token beyond each React effect's local `isActive` flag.

## Ranked Hypotheses To Measure

These remain hypotheses until the corrected same-tab test supplies evidence:

1. **Wrong test topology:** keeping the original matched page alive concealed the actual hard-reload lifecycle.
2. **Empty interval introduced by PR #68:** account progress may contain a safe same-account provisional game, but the current selector discards it until repository authority arrives.
3. **Uncoordinated generations:** auth progress hydration and repository replacement/load can publish in an order not represented by the pure selector tests.
4. **Repository creation/load latency:** the first participant load may begin later than assumed after restored auth, while route-entry or focus eventually triggers recovery.
5. **Stale load publication:** an older local or authenticated load generation may publish after a newer generation unless ownership covers repository identity and request sequence, not only user identity.

## Considered Approaches

### Recommended: Deterministic Authenticated Bootstrap Coordinator

Represent authenticated Multiplayer bootstrap with one generation-scoped owner that records the user, repository identity, load sequence, and readiness. Only the current generation may publish. Account progress may be treated as a clearly labeled same-account provisional snapshot only if evidence proves it is needed and safe; it must never overwrite a ready repository snapshot.

This addresses the lifecycle rather than adding a timer. It can be extracted as a small pure module with deterministic unit tests instead of adding more ad hoc refs to `App`.

### Alternative: Restore Cached Multiplayer Immediately

Using account progress as the first authenticated projection could reduce the visible delay, but it may be stale or may not include a match created shortly before reload. Use this only as a provisional layer inside the generation coordinator and only if the test proves repository readiness alone cannot satisfy the five-second contract.

### Rejected As Primary Fix: Poll Faster Or Wait Longer

Shorter intervals, permanent polling, timeout extensions, assertion weakening, synthetic focus events, or keeping another page alive would hide the failure rather than repair startup ownership. They are not authorized as the primary solution.

## Implementation Plan

### Stage 0 - Exact Baseline And Remote Safety

- Verify local and remote `main` equal `e7c42284aa23e98d985d8569f6f262c60c58a0fa` before implementation begins.
- Verify exact 39/39 migration equality, accepted spectator function fingerprints, zero temporary E2E users/profiles, clean Git state, and the intended `brrrdle-dev` Supabase/Vercel targets.
- Do not mutate schema, migrations, RLS, RPCs, deployment configuration, production deployment state, or the stable repository.

### Stage 1 - Replace The False-Positive Harness

**Primary files:**

- `e2e/gameplay/multiplayer-reliability.spec.ts`
- `e2e/gameplay/ranked-daily-controls.spec.ts`
- established helpers under `e2e/fixtures/`

Build a real temporary-account sequence:

1. Create two disposable authenticated users with the established helpers.
2. Use two independent browser contexts and the real UI to enter the same ranked Practice queue, starting with Practice OG.
3. Prove the durable game exists and both participants can see it.
4. On one participant's actual matched page, call `page.reload({ waitUntil: 'domcontentloaded' })`.
5. Prove the refresh contract landed on Home and the restored account is authenticated.
6. Start the discovery clock, enter Multiplayer once, and inspect Overview, Practice, Active Games, and Live without focus dispatch, Back/Forward, a second page, or prior Multiplayer warming.
7. Require the exact game on every expected surface within five seconds.
8. Repeat the full Practice sequence at least three times on the unchanged baseline. A failure is required before source correction unless equivalent timestamp evidence proves the boundary.
9. Reproduce against the currently hosted Review Candidate if local development or local production mode does not fail.

Collect only non-secret timing categories: auth ready, authenticated repository created, participant load start/end, returned game count, progress hydration end, snapshot publication source/generation, Multiplayer route entry, and first visible game. Never log user IDs, emails, tokens, auth state, raw answers, serialized sessions, or private projections.

### Stage 2 - Add Deterministic Lifecycle Tests

**Expected files:**

- create `src/app/authenticatedMultiplayerBootstrap.ts`
- create `src/app/authenticatedMultiplayerBootstrap.test.ts`
- modify `src/app/scopedProgressMultiplayerState.ts` and its test only if the proven contract still belongs there
- modify `src/app/App.tsx` only for the smallest integration wiring

Write failing tests for:

- a local repository generation becoming invalid when authenticated identity resolves;
- only the current authenticated repository and current load sequence publishing;
- progress hydration completing before repository load;
- repository load completing before progress hydration;
- stale progress never replacing a ready repository snapshot;
- stale repository generations never replacing current state;
- same-account provisional progress, if retained, yielding permanently to repository readiness;
- account switch, sign-out, guest/local state, and load failure behavior.

Do not implement a broad auth/session rewrite. The coordinator should be a small pure state/decision module consumed by existing effects.

### Stage 3 - Apply The Smallest Proven Source Fix

Choose from measured evidence:

- coordinate auth hydration and repository readiness through one generation-scoped bootstrap owner;
- reject stale repository/load publications with repository and sequence identity;
- prevent authenticated hydration from creating an empty user-visible replacement after a valid current-generation repository snapshot;
- optionally allow the downloaded same-account progress projection as provisional state until repository readiness, but only if it improves the real reload test without cross-account leakage or stale overwrite.

Do not change queues, finalization, participant queries, realtime contracts, persistence schemas, refresh-to-Home, gameplay, claims, Elo, or polling intervals unless evidence proves the issue is outside the client lifecycle. Stop for a new architecture decision if a server contract is genuinely required.

### Stage 4 - Practice-First Proof

- Run the same-tab Practice OG reproduction repeatedly until at least five consecutive passes occur in standard Chromium.
- Repeat with Practice GO.
- Run the corrected Practice test in Firefox and, when the installed browser is available, WebKit.
- Run against a production build, not only the Vite development server.
- Confirm no duplicate games, queue requests, finalization calls, subscriptions, or cards.

No Daily source adaptation begins until Practice is consistently clean.

### Stage 5 - Daily Transfer Validation

- Apply the shared lifecycle repair to ranked Daily without changing Daily queue or claim rules.
- Create fresh disposable accounts so each Daily scenario has clean eligibility.
- Verify same-tab hard refresh for ranked Daily OG and GO across Overview, Daily, Active Games, and Live within five seconds.
- Confirm unranked Daily, ranked Practice, private/unranked Practice, and spectator views remain unchanged.

### Stage 6 - Temporary Hosted Preview Gate

After local source and production-build verification are clean, create one temporary non-production Vercel preview solely for this recovery. Do not promote it or alter production configuration.

Run the corrected Practice-first and Daily same-tab tests against that preview with disposable accounts and exact cleanup. The recovery is not a Review Candidate unless the temporary hosted preview passes the same five-second contract. If preview authorization, authentication, or safe target verification is unavailable, stop and state the exact Ryan action required.

### Stage 7 - Full Regression And Handoff

Run sequentially:

- focused bootstrap/selector/auth/repository tests;
- repeated Practice and Daily same-tab hard-refresh E2E;
- ranked queue, refresh routing, Daily Solo persistence, spectator, private/unranked Multiplayer, and functional-shell regressions;
- `npm run lint`;
- `npm test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- complete authority-enabled E2E with one worker;
- fresh local/remote 39/39 migration proof, catalog fingerprints, zero residue, answer-free artifact scan, CSV validation, diff hygiene, and process cleanup.

The established exact-retry then fresh-complete protocol may be used only for a separately recognized transient. It may not excuse failure of the new same-tab ranked reload test.

Update the checklist, testing documentation, changelog, preservation inventory if behavior ownership changes, and progress records. Prepare an ignored recovered Review Candidate backup prompt, but do not perform Git/GitHub backup without separate authorization.

## Acceptance Criteria

- The unchanged baseline fails or is conclusively characterized with the same-tab UI-created Practice test.
- Ranked Practice OG and GO pass five consecutive Chromium reload cycles and cross-browser production checks.
- Ranked Daily OG and GO pass with fresh eligibility accounts.
- The actual reloaded participant tab, not a second page, sees its exact game on every expected surface within five seconds.
- A temporary hosted preview passes the corrected Practice and Daily tests.
- No focus dispatch, polling reduction, timeout extension, assertion weakening, warm page, duplicate finalization, or second-tab assistance is used.
- Full verification passes and temporary residue is zero.

## Hard Stops

Stop and report if the repair requires a migration, RPC/RLS/schema change, production deployment, dependency/framework change, raw-answer/private-data handling, or a broad auth/session rewrite beyond the focused bootstrap coordinator. Do not touch stable `brrrdle`, perform Git/GitHub backup, begin Phase 58, or claim manual acceptance.

## Implementation Result

The corrected same-tab harness reproduced the missing-game interval by holding the participant repository read beyond the five-second budget after the same account's progress projection had synced. PR #68's empty-until-authoritative selector was the measured boundary: it discarded that safe account-scoped projection until the repository response arrived.

The smallest repair stays in the existing pure selector. Authenticated progress loaded and request-guarded for the current account may now render as a provisional Multiplayer projection only while that account's repository is pending. Once the repository publishes, its explicit same-user authority continues to preserve the repository snapshot and prevents later progress hydration from replacing it. No timer, polling, queue, persistence, Supabase, or auth-session architecture changed.

Real UI tests now reload the actual matched participant page for ranked Practice and ranked Daily OG/GO, delay only the authoritative participant read beyond five seconds, and require the exact game in Overview, the matching mode tab, Active Games, and Live. Practice passed five consecutive Chromium runs per mode, Firefox, WebKit, local production mode, and the protected non-production Vercel preview. Daily passed Chromium, Firefox, WebKit, local production mode, and the same preview.

The final authority-enabled suite passed 83/83 after two separately classified existing-test failures were repaired or shielded: the unranked Daily selected-join helper now reopens the exact lobby after refresh-to-Home, and temporary Auth-user deletion has a bounded three-attempt cleanup retry. Final remote proof is exact 39/39 migration equality, accepted spectator hashes unchanged, and zero temporary Auth users/public profiles.
