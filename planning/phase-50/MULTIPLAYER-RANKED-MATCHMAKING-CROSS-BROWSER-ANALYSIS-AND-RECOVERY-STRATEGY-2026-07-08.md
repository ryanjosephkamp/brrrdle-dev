# Phase 50 Ranked Multiplayer Cross-Browser Analysis And Recovery Strategy

**Status**: Planning and strategy artifact only. No source/runtime code, tests, migrations, deployment configuration, Git/GitHub action, or stable `brrrdle` repository work is authorized by this document.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-08.
**Prompt package**: `prompt-packages/phase-50/PHASE-50-RANKED-MULTIPLAYER-CROSS-BROWSER-RECOVERY-PROMPT-2026-07-08.md`.

## User-Reported Hosted Behavior

The user reported that accepted Solo persistence and Home-on-refresh behavior now appear to pass on the hosted/live Review Candidate. The remaining hosted/manual failures appear limited to multiplayer, especially ranked Practice Multiplayer and Safari/WebKit-adjacent public Practice behavior.

Observed ranked Practice Multiplayer behavior:

- With two signed-in safe test accounts, Player 1 on Firefox and Player 2 on Safari can both enter compatible ranked Practice queues.
- When Player 1 enters queue first and Player 2 enters second, they do not always auto-route into a match.
- When Player 2 clicks `Check ranked queue`, the UI shows `Unable to finalize ranked queue game: Empty or invalid json`.
- Despite that error, the durable ranked game appears to exist: Player 1 is routed into the game, and Player 2 can see a new `OG Playing` current-match button and manually open it.
- If Player 1 clicks `Check ranked queue`, Player 1 routes correctly, but Player 2 still gets the invalid-JSON error and must manually click the current-match button.
- If Player 2 enters queue first and Player 1 enters second, Player 1 can be routed correctly, but Player 2 still receives the error and must manually open the current match.
- The same general pattern appears relevant to OG and GO ranked Practice queues.
- Firefox plus Brave ranked matching was also reported as sometimes failing to match even after both players check the queue.

Observed public Practice behavior:

- Firefox and Brave appear to create public unranked Practice matches normally.
- Safari can show a flash/revert behavior when opening an unranked public Practice match, similar to prior hosted symptoms.

Screenshot evidence supplied by the user:

- `/Users/noir/Desktop/Screenshot 2026-07-08 at 1.30.55 PM.png`
- The screenshot shows Multiplayer > Practice Multiplayer, OG, Ranked, no clock, with a red banner: `Unable to finalize ranked queue game: Empty or invalid json`.

## Current Local Architecture

### Frontend Ranked Queue Flow

The ranked Practice queue flow is concentrated in `src/multiplayer/MultiplayerPanel.tsx` and helper modules.

Key flow:

- `enterRankedQueue` creates a trusted ranked queue request through `rankedQueueActions.createRankedQueueRequest`.
- It immediately calls `rankedQueueActions.claimRankedQueuePair`.
- If no pair is found, the UI remains in `queued` state and auto/manual refresh can check again.
- If a match is found, `finalizeRankedQueueMatch` runs.
- `finalizeRankedQueueMatch` calls `getRankedQueueStatus`, builds a local ranked game projection from that status, calls `finalizeRankedQueueGame`, and only then calls `upsertFinalizedRankedGame`.
- `upsertFinalizedRankedGame` merges the finalized game into local visible state, calls `selectGame(game.id)`, and requests the gameplay auto-center behavior.

The important fragility is that the UI only selects the ranked game after the finalization RPC returns cleanly. If the durable row already exists but the local client receives a finalization error, the client can remain on the queue panel with the red banner while the game is already visible elsewhere in state or after repository refresh. That matches the hosted Player 2/Safari report closely.

### Ranked Queue Helpers

`src/multiplayer/multiplayerPanelRankedQueue.ts` builds the local game projection used for finalization:

- `buildRankedQueueRequestInput` permits untimed ranked Practice or the canonical timed ranked Practice clock only.
- `withRankedQueueExpiry` adds a five-minute expiry to new queue rows.
- `buildFinalizedRankedGameFromStatus` creates a full `MultiplayerGame` projection from status data.

The projection builder is useful for initial row creation. It is less ideal as the only recovery source after another client has already inserted the canonical row. For recovery, the implementation should prefer an already-loaded or freshly refreshed durable `async_multiplayer_games` projection when it exists.

### Supabase Repository Flow

`src/multiplayer/multiplayerRepository.ts` exposes the trusted ranked queue RPC wrappers:

- `createRankedQueueRequest` calls `create_ranked_async_matchmaking_request`.
- `claimRankedQueuePair` calls `claim_ranked_async_matchmaking_pair`.
- `getRankedQueueStatus` calls `get_ranked_async_matchmaking_status`.
- `finalizeRankedQueueGame` calls `finalize_ranked_async_matchmaking_game`.
- Repository `load` refreshes visible `async_multiplayer_games` projections for the authenticated player.
- Realtime subscription refreshes the same repository snapshot on `async_multiplayer_games` table changes.

The finalization wrapper throws `Unable to finalize ranked queue game: ${error.message}` when Supabase returns an RPC error. The user-visible error text indicates that Supabase returned `Empty or invalid json` as the RPC error message, rather than the local parser emitting `Unable to parse ranked queue finalization result.`

### SQL/RPC Contract

Relevant migrations:

- `supabase/migrations/20260616054019_phase27_trusted_settlement_ranked_queue.sql`
- `supabase/migrations/20260616165434_phase27_ranked_queue_game_finalization.sql`
- `supabase/migrations/20260626000925_phase33_timed_ranked_practice.sql`
- `supabase/migrations/20260703154556_phase42_browser_grant_rls_repair.sql`
- `supabase/migrations/20260703230106_phase43_ranked_queue_matching_fairness.sql`

The latest `claim_ranked_async_matchmaking_pair` implementation is from Phase 43 and preserves the browser-facing signature while adding fairness ordering. It only claims a request if the caller's request is still `queued`; it does not treat an already-matched request as idempotent.

The latest `get_ranked_async_matchmaking_status` and `finalize_ranked_async_matchmaking_game` implementations are from Phase 33. The finalization RPC is designed to be idempotent when an existing `async_multiplayer_games` row already matches the reservation. It selects the existing row and returns `created = false`, `idempotent = true`.

That means the hosted symptom could be one of several things:

- the finalization RPC is receiving a projection that fails JSON validation or cast/shape rules in one browser path;
- the finalization RPC is being called with a stale or mismatched request/game id after another client already completed a pair;
- an RPC implementation currently deployed on the hosted database differs from local migration expectations;
- the client throws on a recoverable finalization error even though repository refresh can already see the durable game;
- browser focus/visibility/timer behavior changes the order of auto-refresh, manual check, subscription refresh, and selected-game routing.

## Current Automated Test Coverage Gap

The default Playwright configuration defines only the `chromium` project. The current E2E suite uses separate browser contexts within one browser engine, not a mixed Firefox/Safari/WebKit/Brave-style set of clients.

Existing ranked E2E coverage in `e2e/gameplay/practice-multiplayer-og.spec.ts` verifies a happy path where:

- one client queues first;
- another client queues second;
- a ranked row appears;
- both clients become selected on the row;
- a ranked search-again flow works.

That is useful, but it does not directly cover the hosted failure path:

- durable game row exists;
- one client is routed;
- second client gets a finalization error;
- second client should recover by finding/opening the already-created game instead of staying on the queue panel with a red error.

The next implementation should add or strengthen coverage for this exact failure mode. If local mixed-browser Playwright engines are available, the follow-up should add a focused cross-engine or WebKit-specific check. If not, it should still add a deterministic component/unit or browser test that simulates finalization failure after durable-game availability.

## Likely Root Cause Ranking

1. **Most likely: missing client recovery after recoverable ranked finalization failure.**
   The UI treats any `finalizeRankedQueueGame` error as fatal, even if the matched durable game row already exists and can be opened. The user's report that Player 2 can manually click `OG Playing` after the error is strong evidence that the row exists and the UI simply did not route to it.

2. **Likely: race/idempotency mismatch between claim/status/finalize calls.**
   Both participants can try to create/open the same ranked game around the same time. The SQL has an idempotent existing-row branch, but the UI/RPC path may still surface a recoverable error or use stale queue state.

3. **Possible: hosted RPC or grant drift.**
   The error text is coming through Supabase, not the local parser message. Phase 42 had browser grant/RLS repair work and Phase 43 changed claim fairness; the implementation follow-up should inspect actual local migration contracts and avoid assuming the hosted database exactly matches local expectations if a real browser E2E keeps reproducing the RPC error.

4. **Possible: Safari/WebKit timing and visibility behavior.**
   Safari/WebKit can throttle timers and visibility/focus work differently. The current ranked auto-refresh uses an interval and `visibilitychange`, while manual checks call the same finalization path. The Safari public-unranked flash/revert finding also suggests a WebKit timing/hydration surface worth testing.

5. **Less likely but worth checking: stale queue rows and old default settings.**
   Step 495 added finite expiry for newly created queue requests and used a non-default word length in ranked E2E to avoid stale default rows. Hosted user testing with real profiles may still encounter older queue rows or old current matches. The recovery should not rely on hidden stale rows being absent.

## Recommended Implementation Strategy

### 1. Reproduce Or Simulate The Hosted Failure

Start with focused reproduction:

- run the current ranked Practice E2E path;
- add a manual-check path for both entry orders;
- cover OG and, if feasible, GO;
- cover the second participant opening the already-created match without seeing the invalid-JSON banner;
- attempt WebKit or mixed-engine reproduction if the local environment supports it.

If the real hosted error does not reproduce locally, add a deterministic lower-level regression that simulates `finalizeRankedQueueGame` throwing after a matching durable game exists in `normalized.games` or after repository refresh can load it.

### 2. Add Client Recovery For Already-Finalized Ranked Games

Make `finalizeRankedQueueMatch` resilient:

- keep the existing trusted finalization RPC as the primary path;
- if finalization fails after status says `matched` and `matchedGameId` exists, attempt bounded recovery before showing a red error;
- first look for the durable matched game in current normalized games;
- then, if available through the surrounding repository/state wiring, trigger or wait for a repository refresh and look for `matchedGameId`;
- if found and the viewer is a participant, merge/select the durable game, clear the red error, and show a non-error message such as `Ranked match already finalized. Opening the durable game.`;
- only show the original error if the matched durable game cannot be found or is not valid for the viewer.

This preserves the existing server-authoritative insertion flow while avoiding a bad user-visible state when the server-side durable row is already present.

### 3. Keep RPC/Migration Work Gated

Do not make a Supabase migration or execute remote SQL during the next implementation unless investigation proves source-only recovery is insufficient and the current prompt explicitly allows stopping to report the need. The likely first pass should be source/test only.

If a migration is required, the next implementation must stop and create a separate migration-specific prompt rather than quietly adding or executing database changes.

### 4. Add Cross-Browser-Oriented E2E Where Feasible

Recommended tests:

- ranked Practice OG two-client queue where Player A enters first, Player B enters second, and either client checks queue;
- reversed entry order;
- finalization failure recovery simulation if real RPC behavior does not fail locally;
- WebKit project or explicit `webkit.launch` mixed-client test if local Playwright dependencies support it;
- Safari-adjacent public unranked Practice open-match stability check, at least in WebKit.

If WebKit or Firefox engines are unavailable locally, document that limitation and keep the deterministic simulated regression so the recovery behavior is still protected.

### 5. Preserve Accepted Guardrails

The next implementation must preserve:

- accepted Solo Daily/Practice persistence;
- signed-in/guest Solo boundary behavior;
- manual hard/browser refresh landing and remaining on Home;
- public-profile/private-request handoff;
- existing private first-turn/forfeit coverage;
- public Daily/Practice waiting-row stability;
- ranked scoring/Elo/rating/settlement semantics.

## Recommended Scope For The Next Prompt

The next prompt should authorize:

- bounded Phase 50 same-phase implementation/testing only;
- source/test fixes for ranked Practice finalization recovery and Safari/WebKit-adjacent public Practice stability if reproduced;
- Phase 50 documentation/progress updates;
- a new recovered Review Candidate Backup prompt only after verification is clean.

The next prompt should not authorize:

- final Phase 50 acceptance/closure;
- Git/GitHub branch creation, staging, commit, push, PR, merge, or backup workflow execution;
- deployment configuration, release, public tunneling, or production changes;
- Supabase remote SQL, schema/RLS/RPC/table/bucket changes, migrations, or destructive cloud cleanup unless the implementation stops and asks for a separate prompt;
- scoring, Elo/rating, reward, Daily claim, Solo persistence rewrite, refresh-routing rewrite, Practice GO answer-selection/randomness changes, or next-phase work;
- stable `brrrdle` repository work.

## Verification Plan For The Implementation Prompt

Minimum focused verification:

- targeted unit/component tests around ranked finalization failure recovery and matched-game selection;
- `npm run test -- src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/multiplayerRepository.test.ts src/multiplayer/privateMatchmaking.test.ts src/app/scopedProgressMultiplayerState.test.ts`;
- `npx playwright test e2e/gameplay/practice-multiplayer-og.spec.ts e2e/gameplay/practice-multiplayer-go.spec.ts e2e/gameplay/private-matchmaking.spec.ts`;
- `npx playwright test e2e/gameplay/multiplayer-reliability.spec.ts e2e/gameplay/multiplayer-focus-refocus.spec.ts`;
- `npx playwright test e2e/navigation/refresh-route-persistence.spec.ts e2e/gameplay/solo-completion-reentry.spec.ts`.

If cross-browser tests are added:

- run the smallest relevant WebKit/cross-engine subset first;
- keep full-suite browser project expansion out of the default gate unless the local config and runtime make it safe;
- report exactly which engines were actually run.

Full verification before declaring the recovery ready:

- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- CSV shape check if progress changed;
- non-printing/credential-value/private-data scan over changed tracked/untracked files and ignored prompt artifacts;
- ignored-artifact check;
- watched-port/process cleanup check;
- `git status --short --branch`.

## Stop Conditions

Stop before implementation completion and report if:

- the prompt artifact is missing or conflicts with governance;
- reproducing or fixing the issue requires unsafe credentials or private user data;
- the fix requires stable `brrrdle` repository work;
- the fix requires a Supabase migration, remote SQL execution, RLS/RPC/table/bucket change, or deployment configuration change not separately authorized;
- the fix would change scoring, Elo/rating, rewards, Daily claims, Solo persistence contracts, refresh-route policy, or next-phase scope;
- verification remains failing after focused recovery.
