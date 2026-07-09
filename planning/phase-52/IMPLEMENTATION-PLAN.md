# Phase 52 Private Practice Matchmaking Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` for parallel task execution when scopes are disjoint, or `superpowers:executing-plans` for inline execution. Steps use checkbox (`- [ ]`) syntax for tracking. Do not commit during implementation; this repository's governed Git/GitHub backup flow happens only through a later explicit prompt.

**Goal:** Expand private Practice matchmaking so signed-in players can send and accept unranked Practice OG/GO requests with the same core settings the existing backend contract already supports.

**Architecture:** Keep Phase 52 source/test-first. The existing Phase 40 Supabase request table/RPCs, repository parser, and accepted-game projection already support OG/GO, word length, Hard Mode, time limits, and GO puzzle count. The implementation should primarily add a small source-side request-settings helper, expose settings on public profile private-request controls, improve request-list clarity, and strengthen focused unit/component/E2E coverage.

**Tech Stack:** React, TypeScript, Vite, Vitest, Playwright, Supabase RPC repository adapters, existing brrrdle UI primitives.

**Implementation Status - 2026-07-09:** Review Candidate prepared. The source/test implementation added the private Practice settings helper, wired the public profile request controls, added focused tests, extended the real two-client private-matchmaking E2E for selected GO settings, and prepared the Phase 52 changelog/checklist/progress trail. Review Candidate Backup remains separately authorized.

## Global Constraints

- Work only in `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Do not touch the original stable `brrrdle` repository.
- Preserve Phase 50 accepted gameplay, Solo persistence, Home-on-refresh, multiplayer matchmaking, first-turn persistence, private forfeit/cancel behavior, and ranked Practice FIFO matchmaking.
- Preserve Phase 51 account/Profile/player identity behavior, single public `Player name`, player-name policy, mobile account menu fit, and mobile scroll repair.
- Do not change gameplay rules, rewards, scoring, Elo/rating, Daily claims, ranked queues, or canonical Solo/Multiplayer persistence outside the private Practice request surface.
- Do not perform Git/GitHub actions, commits, pushes, PRs, merges, releases, deployment configuration changes, public tunneling, or stable-repository work.
- Do not perform remote Supabase migration/RPC/RLS/schema/table/storage/grant work. If a new source-controlled migration or remote change is required, stop and create a separate addendum prompt.
- Do not print or store secrets, credentials, raw answers, auth tokens, private account data, raw auth ids, emails, projection blobs, serialized sessions, or local session artifacts in tracked files, prompt packages, progress reports, logs, or final reports.
- Keep `prompt-packages/` ignored/local-only.

---

## Current Implementation Review

### Backend And RPC Contract

`supabase/migrations/20260701221500_phase40_private_match_requests.sql` created `public.multiplayer_private_match_requests` with a request contract that already includes:

- `mode` constrained to `og` or `go`;
- `word_length` constrained to 2-35;
- `hard_mode`;
- `time_limit_ms`;
- `go_puzzle_count`, required for GO and forbidden for OG;
- request status values `requested`, `created`, `declined`, `cancelled`, and `expired`;
- active public profile checks for requester and opponent;
- no self-request;
- active outgoing and recent request caps;
- one active requested row per player pair.

`supabase/migrations/20260701232434_phase40_private_match_accept_contract_repair.sql` added `accept_private_multiplayer_match_request_v2`, which keeps the browser from supplying raw participant user ids. It also verifies that the accepted game projection matches the request's Practice/unranked/mode/length/Hard Mode/time/GO-puzzle contract before creating `async_multiplayer_games`.

Phase 52 should not need a migration for the core request expansion. If implementation discovers that the existing RPC rejects a setting that should be in Phase 52 scope, stop and route to a migration/RPC addendum instead of widening the source implementation.

### Repository Contract

`src/multiplayer/multiplayerRepository.ts` already exposes:

- `CreatePrivateMatchRequestInput` with `mode`, `wordLength`, `hardMode`, `timeLimitMs`, `goPuzzleCount`, `targetPublicProfileId`, `expiresAt`, and `idempotencyKey`;
- `PrivateMatchRequestResult` with parsed settings and safe requester/opponent profile summaries;
- `createPrivateMatchRequest`, which maps mode-specific GO puzzle count to `p_go_puzzle_count`;
- `acceptPrivateMatchRequest`, which calls `accept_private_multiplayer_match_request_v2` after stripping `playerUserIds`;
- parser guards rejecting private fields, projection/session/answer data, and unknown keys.

Existing repository tests cover private request parsing, forbidden fields, and accept payload safety. Phase 52 should add coverage for GO request rows and create-RPC payloads where gaps remain.

### Accepted-Game Projection

`src/multiplayer/privateMatchmaking.ts` already:

- refuses expired, non-opponent, or non-acceptable requests;
- validates time limits against `PRACTICE_MULTIPLAYER_TIME_LIMIT_OPTIONS`;
- normalizes and verifies GO puzzle count;
- creates a fresh unranked Practice `MultiplayerGame`;
- preserves safe public profile labels without raw user ids;
- builds an accept idempotency key from request id and generated game id.

Existing tests cover the default OG path, invalid requests, unsupported time limits, and accept idempotency key safety. Phase 52 should add GO, Hard Mode, and supported time-limit projection coverage.

### Public Profile Entry Point

`src/account/PublicProfilePage.tsx` is the narrowest missing source surface:

- the private-request card still says it sends an "authenticated, unranked 5-letter OG Practice request";
- `requestPrivatePracticeMatch` hard-codes `mode: 'og'`, `wordLength: 5`, `hardMode: false`, and `timeLimitMs: null`;
- the current idempotency key includes the target public profile id plus random/time material;
- render tests only verify that a generic private Practice request button appears and hides safe identifiers.

Phase 52 should replace this fixed request action with settings-aware controls while preserving the same public-profile privacy boundary.

### Practice Multiplayer Request Panel

`src/multiplayer/MultiplayerPanel.tsx` already:

- loads private match requests only for authenticated Practice Multiplayer;
- displays active incoming/outgoing requests;
- labels settings as mode, word length, GO puzzle count, Hard Mode, and clock;
- supports accept, decline, cancel, and created-game auto-route;
- refreshes while visible.

Phase 52 should keep this lifecycle but make labels and request state clearer if needed. It should not change the request contract unless tests show a direct Phase 52 bug.

### Existing E2E Coverage

`e2e/gameplay/private-matchmaking.spec.ts` proves the current fixed OG public-profile request path, request acceptance, requester first-turn persistence, and forfeit persistence.

`e2e/gameplay/multiplayer-reliability.spec.ts` adds private request cancel/decline lifecycle and routing coverage.

Phase 52 should preserve those tests and add a focused GO/settings E2E without turning the phase into a broad multiplayer rewrite.

---

## File Structure

Expected files to create:

- `planning/phase-52/CHANGELOG.md` - implementation summary and preserved/deferred items.
- `planning/phase-52/REVIEW-CHECKLIST.md` - manual hosted/live review checklist for private Practice expansion.
- `progress/PROGRESS-STEP-508.md` or the next available progress step - implementation closeout after execution.
- `prompt-packages/phase-52/PHASE-52-PRIVATE-PRACTICE-MATCHMAKING-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-09.md` - ignored next-step backup prompt if verification passes.

Expected files to modify:

- `src/account/PublicProfilePage.tsx` - settings-aware public-profile private request UI and payload construction.
- `src/account/PublicProfilePage.test.tsx` - render/payload/privacy tests for private request settings.
- `src/account/publicProfilePrivateMatch.ts` - optional source-only validation/helper functions if better kept near public-profile request eligibility.
- `src/account/publicProfilePrivateMatch.test.ts` - helper tests if the helper file changes.
- `src/multiplayer/privateMatchmaking.ts` - only if existing projection helper needs a small source-side export or validation improvement.
- `src/multiplayer/privateMatchmaking.test.ts` - GO/Hard Mode/time-limit projection coverage.
- `src/multiplayer/MultiplayerPanel.tsx` - request panel labels or small lifecycle clarity if needed.
- `src/multiplayer/MultiplayerPanel.test.tsx` - incoming/outgoing settings-label coverage.
- `src/multiplayer/multiplayerRepository.test.ts` - GO create/list/private request parser/payload coverage if gaps remain.
- `e2e/gameplay/private-matchmaking.spec.ts` - real two-client GO/settings private request flow.
- `e2e/gameplay/multiplayer-reliability.spec.ts` - only if request lifecycle behavior changes.
- `planning/FUTURE-WORKFLOW-TIMELINE.md` and `planning/README.md` - routing/status updates if implementation succeeds.
- `progress/PROGRESS.csv` - implementation progress row.

Avoid unless a later explicit addendum authorizes it:

- `supabase/migrations/*`
- deployment config files
- broad app shell redesign files
- Solo gameplay/persistence files
- ranked queue/FIFO SQL or source files except protected regression tests.

---

## Task 1: Baseline, Contract Audit, And Test Map

**Files:**
- Read: `CONSTITUTION.md`
- Read: `BRRRDLE-SPEC.md`
- Read: `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- Read: `planning/governance/REVIEW-CANDIDATE-BACKUP-LOOP.md`
- Read: `planning/phase-52/PLANNING-BRIEF.md`
- Read: `planning/phase-52/IMPLEMENTATION-PLAN.md`
- Read: `planning/phase-51/CHANGELOG.md`
- Read: `progress/PROGRESS-STEP-506.md`
- Read: `supabase/migrations/20260701221500_phase40_private_match_requests.sql`
- Read: `supabase/migrations/20260701232434_phase40_private_match_accept_contract_repair.sql`
- Read: `src/account/PublicProfilePage.tsx`
- Read: `src/multiplayer/privateMatchmaking.ts`
- Read: `src/multiplayer/multiplayerRepository.ts`
- Read: `src/multiplayer/MultiplayerPanel.tsx`
- Read: current focused tests listed in this plan.

**Interfaces:**
- Consumes: existing private-request repository/RPC/domain contract.
- Produces: an explicit source-only versus addendum decision before source edits.

- [ ] **Step 1: Confirm repository baseline**

Run: `git status --short --branch`

Expected: clean or only user-authorized changes. If unrelated dirty files exist, inspect before editing and avoid overwriting user changes.

- [ ] **Step 2: Confirm Phase 51 closure baseline**

Run: `git rev-parse HEAD && git rev-parse origin/main`

Expected: both point to the Phase 51 closure commit unless the user has explicitly advanced the repository.

- [ ] **Step 3: Confirm prompt packages remain ignored**

Run: `git check-ignore -v prompt-packages/phase-52/example.md`

Expected: `.gitignore` matches `prompt-packages/`.

- [ ] **Step 4: Search private-request surfaces**

Run: `rg -n "createPrivateMatchRequest|PrivateMatchRequestsPanel|createPrivateMatchGameProjection|multiplayer_private_match_requests|accept_private_multiplayer_match_request_v2" src supabase/migrations e2e`

Expected: only the known public profile, multiplayer panel, repository, projection, migration, and E2E surfaces.

- [ ] **Step 5: Make the source-only decision**

Expected decision: source/test-only implementation is viable because the existing Phase 40 table/RPC contract already supports OG/GO, length, Hard Mode, time limit, and GO puzzle count. If this is false, stop before implementation and create a migration/RPC addendum prompt.

---

## Task 2: Add Or Reuse Private Practice Request Settings Helpers

**Files:**
- Modify: `src/account/publicProfilePrivateMatch.ts` if a helper belongs with public-profile request eligibility.
- Test: `src/account/publicProfilePrivateMatch.test.ts`
- Possible read-only imports: `src/game/constants.ts`, `src/multiplayer/multiplayer.ts`.

**Interfaces:**
- Consumes: `mode`, `wordLength`, `hardMode`, `timeLimitMs`, and default GO puzzle count.
- Produces: a normalized settings object suitable for `createPrivateMatchRequest`.

- [ ] **Step 1: Write focused helper tests if adding a helper**

Add tests that prove:

- OG requests omit `goPuzzleCount`;
- GO requests include the default GO puzzle count;
- invalid word lengths below 2 and above 35 are rejected or clamped only if the UI already uses clamping consistently;
- unsupported time-limit values are rejected before RPC submission;
- labels do not include raw profile ids or account ids.

Run: `npm run test -- src/account/publicProfilePrivateMatch.test.ts`

Expected before implementation: failing tests for any new helper behavior.

- [ ] **Step 2: Implement the smallest helper**

Recommended helper shape:

- `normalizePrivatePracticeRequestSettings(input)` returns `{ ok: true, settings }` or `{ ok: false, message }`.
- `settings` contains `mode`, `wordLength`, `hardMode`, `timeLimitMs`, and optional `goPuzzleCount`.
- Supported time limits should come from existing Practice Multiplayer time-limit options, not a new arbitrary list.
- Do not add dependencies.

- [ ] **Step 3: Verify helper tests**

Run: `npm run test -- src/account/publicProfilePrivateMatch.test.ts`

Expected: pass.

---

## Task 3: Expose Settings-Aware Public Profile Private Requests

**Files:**
- Modify: `src/account/PublicProfilePage.tsx`
- Test: `src/account/PublicProfilePage.test.tsx`

**Interfaces:**
- Consumes: target `PublicPlayerProfile`, authenticated owner profile eligibility, private-match settings helper or local normalized state.
- Produces: `createPrivateMatchRequest` payloads for OG/GO Practice requests.

- [ ] **Step 1: Add component tests for the new controls**

Tests should assert:

- authenticated public profile page shows mode, word length, Hard Mode, and time-control controls;
- copy no longer promises only "5-letter OG";
- unauthenticated and unconfigured states still cannot send requests;
- static markup and rendered DOM do not expose `publicProfileId`, raw auth ids, emails, `playerUserIds`, serialized sessions, queue ids, or tokens.

Run: `npm run test -- src/account/PublicProfilePage.test.tsx`

Expected before implementation: new control/copy expectations fail.

- [ ] **Step 2: Add payload tests**

Use the existing component test style or a small interaction test to verify:

- default request payload remains unranked Practice OG, 5 letters, Hard Mode off, no clock;
- selecting GO sends `mode: 'go'` and a GO puzzle count through the repository input;
- selecting a non-default word length sends that length;
- selecting Hard Mode sends `hardMode: true`;
- selecting a supported time control sends `timeLimitMs`;
- idempotency keys do not contain raw auth ids, emails, secrets, or answers.

- [ ] **Step 3: Implement controls with stable layout**

Implementation guidance:

- Use existing inputs/selects/buttons and local style patterns.
- Keep controls compact and readable on mobile.
- Use the existing Practice Multiplayer option vocabulary where practical.
- For GO, keep GO puzzle count at the current default unless the current codebase already has a safe existing selector.
- Keep the action signed-in-only and require active public requester profile if `loadMine` is available.
- Preserve the public-profile handoff route behavior.

- [ ] **Step 4: Verify public-profile tests**

Run: `npm run test -- src/account/PublicProfilePage.test.tsx src/account/publicProfilePrivateMatch.test.ts`

Expected: pass.

---

## Task 4: Strengthen Accepted-Game Projection And Repository Coverage

**Files:**
- Modify if needed: `src/multiplayer/privateMatchmaking.ts`
- Test: `src/multiplayer/privateMatchmaking.test.ts`
- Modify if needed: `src/multiplayer/multiplayerRepository.test.ts`

**Interfaces:**
- Consumes: `PrivateMatchRequestResult` from repository parsing.
- Produces: accepted private Practice `MultiplayerGame` projection without browser-supplied raw user ids.

- [ ] **Step 1: Add projection tests**

Add tests that prove:

- GO private requests create GO Practice games with the requested word length and default/current GO puzzle count;
- Hard Mode true is preserved;
- supported time limit is preserved;
- unsupported time limit is refused;
- malformed GO puzzle count is refused;
- `playerUserIds`, `dailyDateKey`, `customGameCode`, `matchmakingRequestId`, and `ratingBucket` remain absent.

Run: `npm run test -- src/multiplayer/privateMatchmaking.test.ts`

Expected before any needed implementation: fail only if current coverage or behavior is missing.

- [ ] **Step 2: Add repository parser/payload tests if gaps remain**

Extend `src/multiplayer/multiplayerRepository.test.ts` to cover:

- GO private request row normalization with `go_puzzle_count`;
- OG row rejection when `go_puzzle_count` is present;
- create RPC payload with `p_go_puzzle_count` set for GO and null for OG;
- continued omission of `playerUserIds` from v2 accept payloads.

Run: `npm run test -- src/multiplayer/privateMatchmaking.test.ts src/multiplayer/multiplayerRepository.test.ts`

Expected: pass.

- [ ] **Step 3: Make only necessary source changes**

If tests expose a source gap, fix only the projection/parser/helper needed for Phase 52. Do not change Supabase SQL, ranked queue code, Daily code, scoring, or gameplay rules.

---

## Task 5: Improve Private Request Lifecycle UX Labels

**Files:**
- Modify: `src/multiplayer/MultiplayerPanel.tsx`
- Test: `src/multiplayer/MultiplayerPanel.test.tsx`

**Interfaces:**
- Consumes: `PrivateMatchRequestResult`.
- Produces: readable incoming/outgoing request rows and settings summaries.

- [ ] **Step 1: Add label tests**

Add or update tests proving:

- incoming request rows clearly say who requested the match;
- outgoing request rows clearly say who is being waited on;
- GO settings display mode, letters, puzzle count, Hard Mode, and clock;
- OG settings do not show GO puzzle count;
- created, cancelled, declined, and expired rows remain absent from the active list;
- raw ids and private fields are not rendered.

Run: `npm run test -- src/multiplayer/MultiplayerPanel.test.tsx`

Expected before implementation: fail only for new/changed labels.

- [ ] **Step 2: Implement small UX adjustments**

Implementation guidance:

- Keep `PrivateMatchRequestsPanel` as the request lifecycle home.
- Keep accept, decline, cancel actions in the same panel.
- Avoid redesigning Multiplayer layout.
- If touching refresh logic, preserve visibility-aware refresh and created-game auto-route.

- [ ] **Step 3: Verify panel tests**

Run: `npm run test -- src/multiplayer/MultiplayerPanel.test.tsx`

Expected: pass.

---

## Task 6: Real E2E For Private Practice Settings

**Files:**
- Modify: `e2e/gameplay/private-matchmaking.spec.ts`
- Modify if needed: `e2e/gameplay/multiplayer-reliability.spec.ts`
- Read: `e2e/fixtures/supabaseAdmin.ts`
- Read: `e2e/fixtures/twoClientGame.ts`
- Read: `e2e/fixtures/gameActions.ts`

**Interfaces:**
- Consumes: temporary authenticated E2E accounts and public profiles.
- Produces: hosted-like browser proof that private settings create durable playable Practice games.

- [ ] **Step 1: Preserve existing OG E2E**

Run: `npx playwright test e2e/gameplay/private-matchmaking.spec.ts --project=chromium`

Expected before source edits: existing OG path passes or any failure is investigated before widening tests.

- [ ] **Step 2: Add GO/settings E2E**

Add a focused test that:

- creates two temporary signed-in players;
- upserts active public profiles for both;
- opens the rival public profile;
- selects GO and a non-default word length if the UI supports it reliably in the test;
- enables Hard Mode and a supported time control if the UI supports it reliably in the test;
- sends the request;
- verifies the receiver sees the settings summary;
- accepts the request;
- waits for a durable `async_multiplayer_games` row with `scope: 'practice'`, `mode: 'go'`, `ranked: false`, expected word length, expected GO puzzle count, and no private browser-exposed fields;
- verifies both players can open the created game.

- [ ] **Step 3: Keep cleanup strict**

Use existing cleanup helpers. Do not leave E2E private request rows, multiplayer rows, auth users, auth state files, traces, videos, screenshots, or storage artifacts tracked.

- [ ] **Step 4: Run focused E2E**

Run: `npx playwright test e2e/gameplay/private-matchmaking.spec.ts`

Expected: pass.

If request lifecycle code changed, also run:

`npx playwright test e2e/gameplay/multiplayer-reliability.spec.ts --grep "private request|private match"`

Expected: pass. If grep selection is unreliable, run the whole file.

---

## Task 7: Regression Gate Before Review Candidate

**Files:**
- No source file should be changed by this task except docs/progress after verification.

**Interfaces:**
- Consumes: all Phase 52 implementation.
- Produces: clean verification evidence for Review Candidate.

- [ ] **Step 1: Run focused unit/component suite**

Run:

`npm run test -- src/account/publicProfilePrivateMatch.test.ts src/account/PublicProfilePage.test.tsx src/multiplayer/privateMatchmaking.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/multiplayerRepository.test.ts`

Expected: pass.

- [ ] **Step 2: Protect Phase 51 account/profile behavior**

Run:

`npm run test -- src/account/profile.test.ts src/account/publicProfile.test.ts src/account/ProfilePanel.test.tsx src/account/Settings.test.tsx src/account/AccountBadge.test.tsx`

Expected: pass.

- [ ] **Step 3: Run focused browser coverage**

Run:

`npx playwright test e2e/gameplay/private-matchmaking.spec.ts`

Expected: pass.

Run:

`npx playwright test e2e/layout/mobile-scroll.spec.ts e2e/navigation/refresh-route-persistence.spec.ts`

Expected: pass.

- [ ] **Step 4: Run full standard gate**

Run sequentially:

- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`

Expected: all pass. Existing known Vite chunk-size advisories may be reported but are not failures unless the command exits non-zero.

- [ ] **Step 5: Run lightweight hygiene checks**

Run:

- `git diff --check`
- CSV shape check if progress changed
- non-printing/credential/private-data scan over changed tracked/untracked files plus ignored prompt artifacts
- ignored-artifact check for `prompt-packages/`
- watched-port/process check for Vite/preview/browser/Playwright leftovers
- `git status --short --branch`

Expected: no blockers, no tracked ignored artifacts, no secrets/private data, no unexpected long-running owned processes.

---

## Task 8: Documentation, Review Checklist, And Next Prompt

**Files:**
- Create or update: `planning/phase-52/CHANGELOG.md`
- Create or update: `planning/phase-52/REVIEW-CHECKLIST.md`
- Modify: `planning/FUTURE-WORKFLOW-TIMELINE.md`
- Modify: `planning/README.md`
- Modify: `progress/PROGRESS.csv`
- Create: next `progress/PROGRESS-STEP-*.md`
- Create ignored: `prompt-packages/phase-52/PHASE-52-PRIVATE-PRACTICE-MATCHMAKING-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-09.md`

**Interfaces:**
- Consumes: final verification results.
- Produces: Review Candidate handoff and next safe backup prompt if verification is clean.

- [ ] **Step 1: Write changelog**

Include:

- settings-aware private Practice request summary;
- tests added/updated;
- preserved Phase 50/51 invariants;
- explicit note that no migrations/remote Supabase/deployment/Git/GitHub/release/stable repo work was performed unless separately authorized.

- [ ] **Step 2: Write manual review checklist**

Required checks:

- authenticated player can request default OG private Practice match from another public profile;
- authenticated player can request GO private Practice match;
- selected word length, Hard Mode, and clock are visible to the receiver;
- receiver can accept and both players can open the created match;
- outgoing requester sees pending/created state and can open the created game;
- cancel and decline still clear active request counts;
- guest/unconfigured users cannot send requests;
- raw ids/private data are not visible in public profile or request UI;
- Phase 51 account chip/Profile still work on mobile;
- Solo and refresh behavior smoke still pass.

- [ ] **Step 3: Update progress**

Add the next progress row and markdown report with changed files, verification, blockers, boundaries, and next step.

- [ ] **Step 4: Create Review Candidate Backup prompt only if clean**

If verification passes, create an ignored prompt package that authorizes the governed Review Candidate GitHub Backup while keeping Phase 52 open for hosted/manual review.

If verification fails, create a bounded recovery prompt instead, or stop without a prompt if the blocker needs user input or protected authorization.

- [ ] **Step 5: Final implementation report**

Report:

- changed files;
- verification outcomes;
- manual review checklist link;
- exact next prompt artifact path;
- confirmation that Git/GitHub backup, deployment, release, migrations/remote Supabase work, next-phase work, minimal-shell prep, UI toolkit adoption, image generation, and stable `brrrdle` repository work remain unexecuted.

## Self-Review Checklist For This Plan

- Phase 52 maps to the roadmap's private Practice matchmaking expansion.
- The plan starts from the actual current implementation rather than assuming a missing backend.
- Source/test work is separated from migration/RLS, backup, deployment, and release authority.
- Tests cover helper behavior, public-profile UI, repository/parser safety, projection behavior, request panel UX, real two-client E2E, and prior-phase regressions.
- Prompt-package and progress artifacts remain local/governed according to the repository workflow.
