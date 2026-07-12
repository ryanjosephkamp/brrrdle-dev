# Post-Phase-57 Ranked Multiplayer Hard-Refresh Discovery Final Follow-Up Plan

**Status:** Final bounded attempt completed; narrow repair deferred after the three-cycle limit.
**Current Review Candidate:** `ad8f65aebf12b56bda372777b015dbe8d773a4b5` from PR #67.
**Protected baseline:** `7df20365d9f0dc29bd609a22118403fce6662abd`, tag/Release `phase-57-golden-2026-07-11`.
**Goal:** Make an already-created ranked Practice or ranked Daily participant game discoverable promptly after a manual refresh-to-Home and explicit Multiplayer re-entry, without changing queue, gameplay, authority, privacy, or refresh routing.

## Hosted Review Result

The user reports that every other post-Phase-57 recovery item passes. Signed-in Solo persistence and spectator cancellation/forfeit transparency are accepted.

One issue remains across ranked Multiplayer only:

1. Two signed-in players match through a ranked queue in Practice or Daily, OG or GO.
2. A participant manually refreshes. The accepted refresh contract correctly returns Home.
3. The participant explicitly enters Multiplayer and checks Overview, the corresponding Daily or Practice tab, Active Games, and Live.
4. The durable match is absent from every expected surface for approximately 15-30 seconds, then appears without user repair.

The match is not deleted, cancelled, or permanently lost. Browser focus/refocus and Back/Forward do not reproduce the problem. This points to delayed authenticated participant-state discovery after cold browser bootstrap rather than a queue-finalization or durable-game-loss defect.

## Current Implementation Review

### Authentication And Repository Bootstrap

- `App` initializes authentication as anonymous while `getCurrentAuthState` and the Supabase auth subscription resolve the persisted session.
- During that interval, `multiplayerRepository` is a local-storage repository. Authentication then replaces it with a newly created Supabase repository keyed by the authenticated user ID.
- The Supabase repository starts with an empty in-memory snapshot. Its subscription listens for later `async_multiplayer_games` changes, while its `load()` performs a broad participant-visible games query.
- App repository initialization and explicit Multiplayer route entry both call `loadMultiplayerRepositoryWithRetry`.
- The retry helper retries only a thrown read failure and does so immediately. A successful empty response is treated as authoritative and receives no readiness confirmation or delayed bounded retry.
- The route-entry load is protected only by the effect's local active flag. The authenticated repository replacement prevents the retired repository's effect from applying later, but the implementation has no explicit repository-generation contract that can be asserted in tests.

### Existing Refresh And E2E Coverage

- The current ranked Daily refresh regression queues and finalizes a durable match, signs in through the UI, enters Multiplayer, confirms the match, and only then reloads.
- That sequence warms the authenticated repository before the hard refresh. It does not reproduce a participant arriving from a genuinely cold authenticated bootstrap whose first expected content is the already-created ranked match.
- The test covers ranked Daily OG. It does not cover a true cold-start ranked Practice path, the GO variants, or a newly constructed browser context/page after durable game finalization.
- Practice multiplayer reload tests resume a selected match or exercise gameplay state; they do not assert prompt discovery across Overview, Practice, Active, and Live from a cold Home bootstrap.

## Ranked Hypotheses

These are hypotheses to test, not established root causes:

1. **Authenticated cold-bootstrap empty success.** The first Supabase games read can complete successfully with an empty participant projection while auth or server visibility is still converging. The immediate retry helper does not retry successful emptiness, and a later existing refresh or realtime event recovers the game.
2. **Repository-generation timing.** Anonymous/local and authenticated repository effects can overlap during startup. Although cleanup guards retired effects, state publication ordering or an unasserted generation transition may allow an empty authenticated snapshot to become the last applied startup state.
3. **Ranked finalization/discovery ordering.** The ranked queue status can know the matched game before the broad participant-games read returns it. A later queue/status/realtime reconciliation may be what makes the durable row appear.
4. **Warm-test false negative.** Existing E2E primes the participant repository before reload, masking the true cold-start behavior reported on the hosted site.

## Architecture Decision

Diagnose with a real cold-start reproduction before changing source. Prefer an explicit readiness or generation correction over timers or broader polling. If a successful empty participant read is proven transient, permit only a short, bounded, cold-start retry budget that completes within five seconds and does not alter normal background polling.

Do not change ranked FIFO behavior, queue compatibility, queue eligibility, Daily claims, durable game projection shape, Elo, gameplay, spectator privacy, refresh-to-Home, or Supabase contracts.

## Stage 0 - Establish Baseline And Reproduce

1. Verify `main` and `origin/main` are exactly `ad8f65aebf12b56bda372777b015dbe8d773a4b5`, the migration histories remain 39/39, catalog fingerprints are unchanged, and no temporary-account residue exists.
2. Add a real disposable-account E2E that finalizes a ranked game without first warming the participant's Multiplayer UI.
3. Use a fresh page or browser context for the participant's cold authenticated bootstrap, confirm Home, enter Multiplayer, and require the durable match on every expected surface within five seconds.
4. Cover ranked Daily and ranked Practice. Use a compact table or paired scenarios to establish OG and GO behavior without multiplying expensive setup unnecessarily.
5. Capture non-secret timing markers only: auth-ready time, repository generation, first participant load start/end and game count, route-entry load, queue-status result category, realtime subscription readiness, and the event that first exposes the game. Never print credentials, user IDs, emails, raw answers, private projections, access tokens, or session payloads.

No source correction may begin until the hosted symptom is reproduced or equivalent timing evidence isolates the failing boundary.

## Stage 1 - Apply The Smallest Proven Correction

Choose exactly one primary correction based on Stage 0 evidence:

- **Auth/readiness race:** gate the first authenticated participant load on the established auth session and add an explicit tested repository-generation guard.
- **Successful-empty transient:** add a bounded, evidence-based cold-start retry with short backoff, capped to the five-second discovery budget and disabled after an authoritative participant snapshot settles.
- **Ranked status precedes broad query:** use the existing participant-safe ranked status/game identifier to reconcile that exact durable game through an existing safe repository path. Do not expose another participant's private data or create a new server contract.
- **Stale snapshot ordering:** prevent an older repository generation or older load sequence from replacing a newer authenticated snapshot.

Do not reduce global polling intervals, introduce an unbounded retry loop, add a permanent page timer, replace realtime, or broaden repository/session architecture.

## Stage 2 - Regression Coverage

Add focused tests for the proven cause:

- authenticated cold-bootstrap repository generation and snapshot ordering;
- thrown failure versus successful-empty behavior and exact retry bounds;
- ranked Practice and ranked Daily durable-game discovery after hard refresh-to-Home;
- Overview, corresponding Daily/Practice, Active Games, and Live visibility;
- OG and GO preservation;
- no duplicate game cards, queue requests, finalization calls, or subscriptions;
- signed-out/local and unranked/private paths unchanged.

The real E2E must create disposable users through the established authority-safe helpers, avoid answer logging, and remove every game, request, claim, profile, and auth user it creates.

## Stage 3 - Verification

Run sequentially:

1. focused repository-readiness and App integration tests;
2. the new cold-start ranked Practice/Daily real E2E;
3. existing ranked queue, ranked Daily, Practice multiplayer, refresh routing, Daily Solo persistence, and Live spectator regressions;
4. `npm run lint`;
5. `npm run test`;
6. `npm run build`;
7. app and API typechecks;
8. complete authority-enabled `npm run test:e2e` with one worker;
9. exact 39/39 migration equality, unchanged catalog fingerprints, zero temporary residue, answer-free artifact/log scan, process/port cleanup, CSV validation, and diff hygiene.

Use the established exact-failure retry once, followed by one fresh complete run, only for a recognized transient. Never weaken an assertion or extend the five-second discovery budget merely to obtain a pass.

## Attempt And Deferral Boundary

This is the final bounded attempt before accepting the hosted behavior as a known minor limitation.

- Permit no more than three evidence-backed diagnose/fix cycles.
- Each cycle must begin with a distinct measured hypothesis and end with focused verification.
- If the issue cannot be reproduced reliably, the proven fix does not hold in hosted review, or a safe correction requires broader session/repository/Supabase architecture, remove temporary diagnostics and speculative changes.
- Preserve the current accepted candidate and document the 15-30 second post-hard-refresh ranked rediscovery delay as deferred rather than introducing a risky workaround.

## Acceptance Criteria

- Ranked Practice and ranked Daily, OG and GO, remain durable through manual refresh-to-Home.
- On explicit Multiplayer re-entry, participant matches appear on Overview, the corresponding Daily/Practice tab, Active Games, and Live within five seconds.
- No duplicate queue/finalization/game/subscription behavior is introduced.
- Ranked FIFO, Daily eligibility/claims, gameplay, Elo, spectator privacy, Solo persistence, unranked/private multiplayer, and functional-shell performance remain unchanged.
- Full verification is clean and temporary residue is zero.

## Hard Stops

Stop and report if the work requires:

- a migration, remote Supabase mutation, new RPC/RLS/schema/deployment contract, or corrective SQL;
- a dependency/framework/deployment change or broad auth/session/repository architecture;
- a queue, claim, Daily eligibility, gameplay, reward, economy, consumable, scoring, Elo, privacy, or refresh-to-Home rule change;
- unsafe credential, private-data, auth-state, or raw-answer handling;
- weakening realtime, Live visibility/privacy, cleanup, mobile/accessibility, or complete E2E coverage;
- Git/GitHub actions before a separately authorized Review Candidate Backup;
- stable `brrrdle` access.

At a hard stop, retain the accepted candidate, report exact non-secret evidence, and recommend deferral or the smallest separately governed architectural decision.

## Final Bounded Attempt Result

The issue was reproduced with a true-cold authenticated page after durable ranked game creation. Server response probes showed the expected participant game was already present in participant-scoped reads while the fresh UI remained empty. Dispatching a focus event recovered the game immediately in two of three hosted Firefox reproductions, proving that cold authenticated progress hydration could publish stale progress-owned Multiplayer state after an earlier authoritative repository snapshot.

Three evidence-backed cycles were completed:

1. Service-worker interference was tested with service workers blocked and ruled out; the delayed discovery remained.
2. Auth subject, participant visibility, and durable-game presence were verified. A post-hydration focus event restored the game immediately, isolating startup snapshot ordering rather than queue finalization or row visibility.
3. A one-time authenticated reconciliation after scope hydration was implemented and then tightened to avoid reading the pre-auth local repository. The focused production-bundle scenarios passed in Firefox and Chromium, and ranked Daily passed under the standard runner, but ranked Practice GO missed the unchanged five-second assertion twice under the standard Chromium runner.

Per the three-cycle rule, all temporary diagnostics, temporary browser configs, speculative runtime changes, and non-deterministic new E2E changes were removed. The accepted Review Candidate source and tests remain unchanged. The 15-30 second post-hard-refresh ranked rediscovery delay is therefore deferred as a known minor limitation. Any future repair requires a separately governed decision about deterministic coordination between authenticated progress hydration and authenticated Multiplayer repository readiness; no polling, timeout extension, assertion weakening, migration, or remote change is recommended.
