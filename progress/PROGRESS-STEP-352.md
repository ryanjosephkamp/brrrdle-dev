# Progress Step 352 - Phase 41 Stage 41.1 Multiplayer Reliability Audit And Reproduction

**Status**: Completed - Awaiting User Review Before Stage 41.2
**Phase**: Phase 41 - Multiplayer Reliability And Real E2E Hardening
**Stage**: 41.1 - Multiplayer reliability audit and reproduction
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-02T21:42:00Z
**Completed**: 2026-07-02T21:53:41Z

## Authorization

The user authorized Phase 41 Stage 41.1 only: read-only multiplayer reliability audit and reproduction using the completed Stage 41.0 protected baseline.

This pass includes reading governance, Phase 41 planning/spec/implementation materials, Stage 41.0 progress, current progress records, multiplayer reliability surfaces, ranked queue/search-again/cancel flows, public ranked leaderboard freshness surfaces, private request lifecycle/routing surfaces, mobile Practice Multiplayer freshness surfaces, notification/routing seams, relevant tests, Supabase/RLS context as needed, creating this Stage 41.1 progress report and matching 12-column CSV row, running focused read-only checks as needed, and deciding whether Stage 41.2 can remain source/test-only or whether a migration/RLS addendum gate is required.

This pass does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `c3d774bc8a611950f889f2f7a487be4e69844fc0`.
- `origin/main`: `c3d774bc8a611950f889f2f7a487be4e69844fc0`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-edited `planning/phase-40/REVIEW-CHECKLIST.md` was preserved.

## Audit Findings

### Ranked Practice Queue And Search-Again

- `src/multiplayer/MultiplayerPanel.tsx` owns ranked queue entry, search-again, polling, manual refresh, cancellation, and user-visible queue messages.
- `src/multiplayer/multiplayerPanelRankedQueue.ts` builds the ranked queue request and finalized ranked game projection from the authenticated queue status.
- `src/multiplayer/multiplayerRepository.ts` uses strict parser defenses for ranked queue RPC rows and rejects forbidden queue/projection keys.
- The current UI auto-refreshes queued requests every 5 seconds only while the request is active, visible, unread-only false, and not busy.
- Search-again reuses the trusted ranked queue path rather than direct rematch creation.
- The ranked queue SQL contracts filter current requests and candidate requests to `status = 'queued'`, expire old queued rows before claiming, and reject non-owned status/finalization. The static SQL audit did not show a cancelled-row matching contract bug.
- The likely Stage 41 risk is source/E2E reliability rather than an obvious migration defect: cancellation, stale queue participation, status flicker, and search-again matching need real two-client and three-client coverage before source fixes.

### Public Ranked Leaderboard Freshness

- `src/leaderboards/publicRankedLeaderboard.ts` and `src/leaderboards/PublicRankedLeaderboardPanel.tsx` keep the public ranked leaderboard authenticated-only, allow-listed, manually refreshable, and bounded.
- The leaderboard RPC omits zero-game profiles and requires active public profiles with non-null display names.
- The panel loads on mount and manual refresh only; it does not currently subscribe, poll, or auto-refresh after a ranked match settles.
- The static audit did not prove a SQL/RLS contract defect. The next safe step is a real E2E/probe harness that completes a ranked Practice game, confirms trusted settlement/rating eligibility, and then checks whether the public leaderboard becomes fresh under the expected refresh path.

### Private Practice Request Lifecycle And Routing

- `src/multiplayer/privateMatchmaking.ts` builds accepted private Practice games without browser-supplied `playerUserIds`.
- `src/multiplayer/multiplayerRepository.ts` calls `accept_private_multiplayer_match_request_v2`, and the v2 migration derives raw participant auth IDs server-side.
- `get_private_multiplayer_match_requests` lists authenticated participant-visible requests with optional status filtering. The current source requests all statuses and the panel filters visible rows to `requested` and `created`.
- Cancel, decline, expire, and accept are authenticated participant-only in SQL. The static SQL audit did not show anon/private visibility broadening.
- The main reliability risks are source/UI freshness and routing: terminal lifecycle rows can remain in the returned request list, requester-side feedback after opponent acceptance is currently dependent on refresh/navigation, and mobile active-list freshness needs real browser coverage.

### Notification, Routing, And Mobile Freshness

- Current notification view models cover Daily ready, multiplayer turns/completions, Lobby, and Live, but do not define a private match request notification kind.
- The Phase 41 scope should avoid a full mailbox/notification redesign. Any notification work should stay limited to existing routing/freshness evidence unless later stages explicitly approve more.
- Existing mobile scroll harness covers the Multiplayer route as a mobile layout target, but not signed-in Practice Multiplayer request-list or queue freshness under live remote updates.

### Existing E2E Coverage And Gaps

- Existing Playwright coverage includes two-client Practice OG/GO flows, ranked search-again happy paths, timed ranked happy paths, private match create-and-accept happy path, rematch decline/accept paths, and cleanup for async multiplayer rows and private match request rows.
- The current harness is mainly two-client. A three-client helper is not present yet.
- Missing Stage 41 evidence includes: cancelled ranked queue rows not matching, stale/expired ranked queue rows not matching, queue status/button flicker under polling, public leaderboard freshness after newly established rated players, private request cancel/decline/expire cleanup from both sides, requester-side accepted-game feedback, mobile signed-in Practice request/list refresh, and broader cleanup/probe support for ranked queue/rating artifacts.

## Reproduction Results

No source/test implementation, migration, or data-mutating reproduction was run in this read-only audit stage.

Browser reproduction for the named multiplayer reliability issues would require creating temporary authenticated users and real Supabase queue/request/game/rating rows. That belongs in the separately authorized Stage 41.2 real E2E harness expansion rather than this read-only Stage 41.1 audit.

Read-only reproduction consisted of source, test, and SQL/RLS contract inspection. The inspected contracts characterize the likely failure areas well enough to choose the next gate.

## Stage 41.2 Decision

Stage 41.2 can remain source/test-only and should focus on real E2E harness expansion, diagnostics, cleanup support, and non-authoritative probes.

No migration/RLS addendum is required before Stage 41.2 based on this static audit. Addendum planning should be triggered only if Stage 41.2 evidence proves that an existing RPC/RLS contract cannot support:

- cancelled/stale ranked queue denial;
- fresh leaderboard eligibility after trusted settlement;
- private request lifecycle cleanup;
- requester-side accepted-game routing;
- mobile authenticated Practice list freshness.

Recommended Stage 41.2 path:

- add a reusable three-client Supabase-backed E2E fixture;
- extend cleanup support for ranked queue/rating/private request artifacts as needed;
- add focused real E2E diagnostics for ranked queue cancellation/stale matching, leaderboard freshness, private request lifecycle cleanup, requester accepted-game feedback, and mobile Practice Multiplayer freshness;
- keep tests non-printing and avoid screenshots/videos/traces/auth-state commits;
- do not implement product fixes until Stage 41.3 or later.

## Verification

Lightweight verification completed after this progress report and CSV row were created:

- `git diff --check` passed.
- Progress CSV shape check using `python3 -S` reported `rows=354 columns=[12] last_id=352`.
- Non-printing changed/untracked file credential scan reported `scanned_files=15 credential_pattern_hits=0`.
- Ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check reported `port_5173=clear`, `port_5174=clear`, `port_3000=clear`, and `port_4173=clear`.
- `git status --short --branch` completed.

## Blockers And Open Questions

No blockers were found.

Open questions for Stage 41.2:

- how much ranked queue/rating cleanup should be added to E2E fixtures before adding three-client tests;
- whether public leaderboard freshness should be validated through UI refresh only, direct RPC probe only, or both;
- whether private request `created` rows should remain visible as active requester/opponent history or be hidden from active request lists after the created game is safely routed;
- whether mobile freshness requires shorter polling, explicit refresh affordances, visibility-change refresh, or route-entry refresh after E2E proves the current behavior.

## Boundary Confirmation

No source/runtime implementation, test implementation, migration creation or execution, deployment/configuration work, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation contract change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, local Codex skill creation/modification, or original stable repository work has been performed.
