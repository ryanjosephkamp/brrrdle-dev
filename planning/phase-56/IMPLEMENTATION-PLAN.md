# Phase 56 Private Request Center And Anti-Spam Implementation Plan

> **Execution rule:** Use `superpowers:executing-plans`, `superpowers:test-driven-development`, and the Supabase skill. Keep migration work additive and stop before remote application unless a later prompt explicitly authorizes that gate.

**Goal:** Give signed-in players a lightweight, participant-private place to manage incoming and outgoing private Practice requests, receive useful lifecycle notifications, opt out of new requests or request notifications, block individual players, and rely on server-enforced duplicate and rate limits.

**Architecture:** Preserve `multiplayer_private_match_requests` as the durable request ledger and the existing participant-scoped response shape. Add private preference/block authority in one additive migration, expose only narrow authenticated RPCs, and make request creation enforce opt-out, blocks, one active requester-target-mode row, and existing global anti-spam limits transactionally. Project sanitized request rows into a dedicated shell-native request center and into the existing notification model. Do not put raw account ids, block membership, or private settings into public profiles, lobby state, game projections, URLs, or logs.

**Tech stack:** React, TypeScript, Vitest, Playwright, existing Vite shell, existing Supabase adapter/RPC conventions, PostgreSQL/RLS.

## Protected Boundaries

- Work only in `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`; never touch stable `brrrdle`.
- Preserve Phase 55 ranked Daily, ranked Practice, unranked Daily, private Practice gameplay, Solo persistence, Home-on-refresh, spectator/privacy, Elo/scoring, and functional-shell behavior.
- Private requests remain authenticated, unranked, Practice-only, and limited to OG/GO.
- Do not add private Daily, ranked private challenges, chat, friends/following, presence, public block lists, service workers, push delivery, email notifications, new rewards, consumables, or redesign work.
- Do not expose raw user ids, emails, auth metadata, request idempotency material, block rows, private preference rows, or game answer/session data.
- Do not weaken existing active-outgoing or recent-request limits. One active request is allowed per directional requester-target-mode lane; reverse-direction and OG/GO lanes are independent.
- The implementation prompt stops before remote migration application, Git/GitHub backup, deployment, release, Phase 57, or phase closure.

## Current Implementation Review

### Durable request authority

1. `20260701221500_phase40_private_match_requests.sql` owns `multiplayer_private_match_requests`, participant-only select policy, expiry, sanitized response projection, create/list/cancel/decline/accept RPCs, a five-active-outgoing limit, and a twenty-created-per-hour limit.
2. The current partial unique index is pair-wide and direction-insensitive. The create RPC also returns any active request between the pair regardless of mode or direction. Phase 56 must replace that rule with requester-target-mode uniqueness without allowing duplicate retries or races.
3. `20260701232434_phase40_private_match_accept_contract_repair.sql` supplies the current v2 accept authority. It must remain the accepted-game path unless the Phase 56 audit proves a narrowly additive compatibility change is required.
4. `multiplayerRepository.ts` already parses an allowlisted, sanitized `PrivateMatchRequestResult` and exposes create/list/cancel/decline/accept methods. Parser rejection of forbidden identity fields is a protected privacy invariant.

### Current user experience

1. `MultiplayerPanel.tsx` loads participant requests only inside Practice Multiplayer, polls while visible, and renders only active/request-relevant rows through `PrivateMatchRequestsPanel`.
2. The panel already supports accept, decline, cancel, and created-game routing. Phase 56 should extract reusable request lifecycle/view-model logic rather than duplicate mutation code.
3. `PublicProfilePage.tsx` creates a request and Phase 55 polls the current request so the requester sees pending/terminal state, `Go to Practice Multiplayer`, and `Enter private match`.
4. There is no durable all-status request-management surface, no direct block control, and no server-owned request preference.

### Notifications and settings

1. `notificationViewModels.ts` currently derives Daily, multiplayer-turn, completion, Lobby, and Live candidates from Dashboard state. Stable ids/fingerprints plus `notificationStorage.ts` preserve local read/dismissed metadata.
2. `notificationActions.ts` routes notification actions through existing dashboard action targets. Request notifications need a narrow action target that opens the request center or exact created game without embedding private ids in visible text.
3. `GuestSettingsState` schema version 9 stores general in-app/sound/browser preferences and cloud-syncs the existing payload. A request-notification display preference may extend this normalized settings payload; request acceptance/opt-out authority must live server-side and cannot depend on local settings.
4. Browser notifications remain foreground-only and permission-gated. Phase 56 adds no service worker or background push.

## Contract Decisions

### Server-owned preferences and blocks

- Add one private preference row per authenticated user with `accept_private_practice_requests` defaulting to true. Keep the row unreadable to other users.
- Add directional private block rows keyed by blocker and blocked user. Only the blocker may list/create/delete their rows.
- Prefer authenticated security-definer RPCs with empty search paths over direct browser table writes. RPC responses should expose only the caller's own preference and sanitized blocked-player summaries.
- A create request must fail uniformly when the target is unavailable, opted out, or either side has blocked the other; do not reveal which private condition applied.
- Block creation must expire or cancel any still-requested rows between the two players transactionally so a blocked request cannot later be accepted.

### Duplicate and rate limits

- Replace pair-wide active uniqueness with a partial unique index on `(requester_user_id, opponent_user_id, mode)` while `status = 'requested'`.
- Preserve the current maximum of five active outgoing requests and twenty recent creates per hour unless focused load/concurrency evidence requires a stricter value. Do not silently relax either limit.
- Idempotent retry of the same request returns that request. A different request in the same directional mode lane returns or conflicts with the active row deterministically.
- Reverse-direction requests and different-mode requests are independent, subject to block/opt-out and global limits.

### Request center and notifications

- Add a dedicated lightweight request-center view reachable from Notifications and Practice Multiplayer. Prefer tabs or a segmented control for `Incoming` and `Outgoing`, with newest-first order and a small status filter.
- Show sanitized counterpart public name, OG/GO, word length, Hard Mode, time control, GO count where relevant, status, and timestamp.
- Incoming requested rows expose Accept/Decline; outgoing requested rows expose Cancel; created rows expose Enter match. Terminal rows remain visible in history but have no invalid mutation control.
- Add notification candidates for incoming request, accepted/created, declined, cancelled, and expired lifecycle transitions. Stable fingerprints must change only when lifecycle state/updated time changes.
- Honor a new `privateRequestNotificationsEnabled` local/cloud preference for request notification candidates. The server-owned incoming-request opt-out is separate.

## Implementation Tasks

### Task 1 - Characterize current behavior before edits

**Files:** existing private-match repository/domain/component/E2E tests and Phase 40 migrations.

- Add failing tests for directional per-mode duplicate behavior, reverse direction, OG/GO independence, target opt-out, either-direction block, block cleanup, participant-only visibility, newest-first history, and unauthorized mutation.
- Add component/view-model failures for incoming/outgoing separation, terminal history, direct created-game entry, and request notification fingerprints/actions.
- Run the smallest focused suites and record the intended red failures before source or migration changes.

### Task 2 - Prepare one additive Supabase migration

**Files:** one new `supabase/migrations/*_phase56_private_request_center_and_anti_spam.sql`; migration-contract tests; `docs/supabase.md`.

- Create private preference and directional block tables with owner-scoped RLS, indexes, timestamps, and no anon access.
- Add narrow authenticated RPCs to load/update the caller's request preference and list/add/remove caller-owned blocks using public profile ids at the browser boundary.
- Replace the active pair index and update request creation transactionally for requester-target-mode uniqueness, opt-out, bilateral blocks, and preserved global limits.
- Make block creation terminate pending rows safely and make accept reject requests invalidated by a later block or opt-out decision.
- Keep all security-definer functions on `search_path = ''`, explicitly revoke public/anon, grant only intended authenticated functions, and keep internal helpers non-executable by browsers.
- Add catalog tests for columns, constraints, indexes, policies, grants, function search paths, and absence of raw/private fields in participant responses.
- Stop before applying the migration remotely. If more than one cohesive additive migration or a broader social architecture is required, stop and report.

### Task 3 - Extend repository contracts and privacy parsers

**Files:** `src/multiplayer/multiplayerRepository.ts`, focused tests, and a new small request-management domain/view-model module if useful.

- Add typed repository methods for caller preference and blocks without exposing user ids.
- Preserve strict allowlists for request rows and add strict allowlists for preference/block responses.
- Add pure selectors for newest-first incoming/outgoing rows, status filters, counterpart labels, action availability, and lifecycle notification candidates.
- Keep errors non-revealing for blocked/opted-out/unavailable targets.

### Task 4 - Build the lightweight request center

**Files:** a focused request-center component, `MultiplayerPanel.tsx`, routing/navigation state, and component tests.

- Reuse the existing Practice request loader and mutation functions through one controller/hook or narrowly shared action layer.
- Render Incoming/Outgoing segmented views, newest-first status rows, useful filters, and stable empty/loading/error states.
- Preserve direct accept/decline/cancel/enter actions and exact-game routing.
- Add a clear route from Practice Multiplayer and notification activation without automatic page scrolling except existing explicit game routing.
- Verify 320/390px mobile fit, keyboard navigation, focus order, accessible names, reduced motion, and no horizontal overflow.

### Task 5 - Add preferences and player block controls

**Files:** `src/account/Settings.tsx`, settings/storage normalization and tests, `PublicProfilePage.tsx`, request-center UI, repository wiring.

- Add `privateRequestNotificationsEnabled` to normalized guest/cloud settings with a safe true default and schema migration coverage.
- Add the server-owned `Allow new private Practice requests` setting for authenticated users, with explicit save/error state distinct from local notification preferences.
- Add Block/Unblock private requests on eligible public profiles and in request rows. Require confirmation for block; never show who has blocked the current user.
- After blocking, refresh request lists and prevent stale Accept/Request controls from remaining actionable.

### Task 6 - Integrate request lifecycle notifications

**Files:** notification view models/actions/preferences/sounds/browser-dispatch tests and App/dashboard wiring.

- Feed sanitized request state into notification candidate generation without storing raw request payloads in local notification metadata.
- Add stable kinds and fingerprints for incoming, created/accepted, declined, cancelled, and expired states.
- Route incoming items to the request center and created items to the exact participant-owned game.
- Respect global in-app mode, request-notification preference, read/dismissed metadata, sound mode, and foreground-browser permission. Avoid replay on hydration or unchanged polling results.

### Task 7 - Real temporary-account verification and Review Candidate preparation

- Apply no remote migration under the initial implementation prompt. Instead create an ignored continuation prompt that authorizes exact sole-pending-migration application and real E2E only after local verification is clean.
- The continuation E2E must use at least three temporary accounts to prove incoming/outgoing history; OG/GO lane independence; same-lane duplicate prevention; opt-out; bilateral block; unblock; accept/decline/cancel/expiry; notification routing; direct game entry; first-turn persistence; and global anti-spam behavior without printing private values.
- Prove a nonparticipant cannot read request/preference/block rows or infer block state. Prove cleanup removes temporary requests, blocks, preference rows, games, and Auth users.
- Run focused tests, lint, full unit, full E2E, build, API typecheck, migration-ledger/catalog/security probes, `git diff --check`, CSV validation, secret/private-data scan, ignored-artifact checks, watched-port checks, and final status.
- Update Phase 56 changelog, comprehensive manual checklist, timeline/index, progress, and create an ignored Review Candidate Backup prompt. Stop for user authorization.

## Required Regression Matrix

- Phase 55 ranked Daily OG/GO queue, authority, settlement, and public metadata.
- Ranked Practice FIFO and settlement.
- Unranked Daily OG/GO claims and answers.
- Existing private Practice request creation, acceptance, first-turn persistence, and exact-game routing.
- Solo Daily/Practice persistence and completed screens.
- Home-on-refresh and account/guest isolation.
- Notification read/dismiss/sound/browser behavior.
- Live/Lobby/spectator privacy and read-only behavior.
- Functional-shell mobile scrolling, no horizontal overflow, accessibility, and performance budget.

## Stop Conditions

Stop and report if implementation requires public block data, raw user ids in browser contracts, direct browser table writes that bypass the intended RPC boundary, service-worker/push infrastructure, a second migration to complete the initial contract, edits to applied migrations, gameplay/Elo/reward changes, or broader social-graph architecture.

## Plan Self-Review

- The plan maps every accepted Phase 56 requirement to a server contract, UI surface, notification path, test lane, and cleanup obligation.
- Private preference/block decisions remain server-enforced; notification preference remains normalized UI/cloud state.
- The migration and remote-application gates remain separate, preserving reviewability after the Phase 55 migration recovery experience.
- The functional shell remains the presentation baseline; no design-system or dependency work is introduced.
