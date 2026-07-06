# Progress Step 429 - Phase 47 Stage 47.4 Guest/Account Display-Boundary Audit

**Status:** Completed - Awaiting User Review Before Stage 47.5
**Phase:** Phase 47 - Mobile Solo GO Visibility and Account Display Boundaries
**Stage:** Stage 47.4 - Guest/Account Display-Boundary Audit
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-06T00:32:00Z
**Completed:** 2026-07-06T00:48:26Z

## Authorization

The user authorized Phase 47 Stage 47.4 only: read-only guest/account display-boundary audit using the completed Stage 47.3 mobile Solo GO keyboard visibility and re-entry repair baseline.

Authorized work included preserving the user-updated `planning/phase-46/REVIEW-CHECKLIST.md`, reading Phase 47 planning/spec/implementation materials and Stage 47.1 through Stage 47.3 progress, auditing signed-out guest/account display boundaries for History, leaderboard/rating summaries, Stats, Settings, Active Multiplayer, route/cache state, and other account-specific surfaces, creating this progress report and the matching 12-column CSV row, and running lightweight verification.

This pass did not authorize source/runtime fixes, test implementation, Supabase migrations, storage changes, deployment/configuration, Git/GitHub actions, backup workflow execution, gameplay-rule changes, Elo changes, secret/private-data/local-artifact exposure, local Codex skill changes, or original stable repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed branch: `main`.
- Confirmed `HEAD`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- Confirmed `origin/main`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- Confirmed remote: `https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved the user-updated `planning/phase-46/REVIEW-CHECKLIST.md`.

## Files Changed

- `progress/PROGRESS-STEP-429.md`: recorded this Stage 47.4 audit.
- `progress/PROGRESS.csv`: appended the matching 12-column progress row.

No source/runtime files, tests, migrations, configuration, or deployment files were edited in this Stage 47.4 audit.

## Audit Findings

- `App` owns the active progress snapshot passed into History, Stats, Settings, Leaderboard, Dashboard/Home, Solo, Calendar, and Multiplayer surfaces.
- History renders `guestProgress.history` plus `guestProgress.competitiveMultiplayer.results`; it does not independently know whether that snapshot is guest-owned or account-owned.
- Stats renders `guestProgress.stats`, `guestProgress.history`, and `guestProgress.progression`; it relies on `App` to provide the correct guest or authenticated snapshot.
- Leaderboard's public ranked panel is public-safe, but the local `MultiplayerStatsPanel` renders `guestProgress.competitiveMultiplayer` and shows all rating profiles/results when no `viewerUserId` is present. If stale account competitive state is still in memory after sign-out, guests can see the just-signed-out account's local rating summaries and multiplayer result cache.
- Settings renders current settings, cloud-sync status, progression counters, and an exported current progress snapshot from `guestProgress`; stale account progress in memory after sign-out would be visible there.
- Dashboard/Home and Multiplayer Active Games derive active multiplayer, recent multiplayer results, route attention, and notification attention from `multiplayer` and `guestProgress.competitiveMultiplayer`; they depend on `App` rehydrating a true guest-safe snapshot after sign-out.
- Route/cache state clears selected Solo, selected Multiplayer, and focused Live selections during auth-scope hydration, but route choice and filters can remain. That is acceptable if the underlying data snapshot is rehydrated correctly.
- Supabase/RLS visibility was not implicated by the source audit. Public leaderboard and public Live spectator reads are expected public surfaces; authenticated multiplayer repository subscriptions are replaced on sign-out.

## Reproduction And Classification

Manual credential-backed browser reproduction was not run in this audit because the failure requires a real authenticated session and this stage forbids exposing private session artifacts. The behavior was classified from the current source and Phase 46/47 evidence.

The strongest likely root cause is a source-only asynchronous auth/sync race introduced or exposed by automatic signed-in progress sync:

- `flushAuthenticatedProgressSync` creates authenticated sync requests with a request version.
- When the async sync completes, it only checks `shouldApplyAuthenticatedProgressSyncResult({ currentVersion, requestVersion })`.
- It does not re-check the current auth state, current progress scope, or request user id before calling `applyScopedProgress(result.progress, { kind: 'authenticated', userId: request.userId })`.
- `handleSignOut` and anonymous auth hydration rehydrate guest progress, but they do not visibly invalidate pending authenticated sync requests, clear scheduled authenticated sync timeouts, or prevent an in-flight authenticated sync result from applying after sign-out.
- Therefore, a pending or in-flight authenticated sync can finish after sign-out and repopulate the now-guest app with the just-signed-out account's progress snapshot.
- The same gap could also affect fast account switching: a stale sync result for account A can apply after auth has moved to anonymous or account B unless the completion path checks the current auth/scope.

Secondary source-only risk:

- The local multiplayer repository uses the separate `brrrdle:async-multiplayer:v1` key. If legacy authenticated rows were cached there before account-scope protections, signed-out Active Multiplayer could be seeded from that legacy key. Stage 47.5 should audit whether this needs a non-destructive guest-safe read filter rather than destructive cleanup.

## Stage 47.5 Path Decision

Stage 47.5 can remain source/test-only.

No storage-contract, Supabase/RLS, migration, RPC, session-lease, destructive cleanup, gameplay-rule, or Elo addendum is required by the Stage 47.4 audit.

Recommended Stage 47.5 repair boundary:

- Invalidate or clear scheduled authenticated progress sync work on sign-out and account-scope changes.
- Guard authenticated sync completion with the current auth state, active progress scope, and request user id before applying downloaded/uploaded progress.
- Prevent stale authenticated sync results from changing `guestProgress`, `multiplayer`, `activeProgressScope`, Settings snapshot export, History rows, Stats, Dashboard/Home attention, Leaderboard local rating summaries, or Active Multiplayer after sign-out.
- Preserve manual `Sync now`, Phase 46 automatic signed-in Solo sync/freshness, no implicit guest-to-account transfer, no authenticated progress writes to guest storage, Phase 47.3 mobile keyboard repairs, Phase 45 Solo account boundaries, Phase 44 account-scoped repairs, Phase 43 ranked fairness, Daily claim safety, gameplay rules, and Elo math.
- Add focused tests for stale authenticated sync completion after sign-out and account switch, plus display-boundary assertions for History, Leaderboard/ratings, Stats, Settings, Dashboard/Home, and Active Multiplayer where practical.
- Keep one-active-session enforcement deferred; this audit did not produce evidence that a session-lease feature is required for Stage 47.5.

## Verification

Passed final lightweight verification:

- `git diff --check`.
- Progress CSV shape check using `python3 -S`: `rows=431 columns=[12] last_id=429`.
- Non-printing changed/untracked file credential-value scan: `scanned_files=21 credential_value_hits=0 binary_skipped=0`.
- Ignored-artifact check: `tracked_files=1117 staged_files=0 forbidden_artifact_hits=0`.
- Watched-port cleanup check: ports `5173`, `5174`, `3000`, and `4173` clear.
- `git status --short --branch` completed.

## Browser And Resource Observations

- No local dev server was started for this Stage 47.4 audit.
- No browser contexts were opened.
- Final watched-port cleanup found no listeners on `5173`, `5174`, `3000`, or `4173`.

## Blockers And Open Questions

No blockers are currently identified for Stage 47.5 source/test-only repair.

Open questions for Stage 47.5:

- Whether the separate local multiplayer storage key can display legacy account-owned multiplayer rows after sign-out and should be filtered or ignored for anonymous viewers.
- Which display-boundary assertions should live at App/integration level versus focused view-model/component level.
- Whether account switching should be explicitly covered in addition to sign-out.

## Boundary Confirmation

No source/runtime fixes, tests, migrations, storage changes, deployment/configuration, staging, commits, pushes, PRs, merges, releases, branch deletion, backup workflow execution, spectator presence/count/list work, service workers/push work, gameplay-rule changes, Elo changes, secret/private-data/local-artifact exposure, local Codex skill changes, or stable `brrrdle` repository work was performed.

## Next Gate

The next safe action is Phase 47 Stage 47.5 guest/account display-boundary repair source/test-only.
