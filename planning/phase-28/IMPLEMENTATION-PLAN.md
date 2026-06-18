# Phase 28 Implementation Plan

**Status**: Detailed implementation plan for review.
**Created**: 2026-06-17.
**Repository**: `brrrdle-dev` only.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, Phase 28 intake/routing, the Live v1 spectator refresh diagnosis, the Phase 28 planning brief, and the unified Phase 28 specification.

This plan does not authorize implementation. Each stage requires an explicit later prompt before source changes, test changes, migrations, Supabase operations, browser smoke, Git operations, deployment, release, or phase advancement.

## Purpose

Phase 28 stabilizes already-shipped Live v1 spectator and notification surfaces before public identity, leaderboards, public spectation, postgame rematch flows, or theme work. The phase should make authenticated Live spectation feel responsive, fix current Daily Multiplayer answer leakage risk, make spectator end states understandable, restore foreground/browser notification delivery within the existing no-service-worker boundary, and add low-risk Elo transparency without changing the Phase 27 Elo model.

## Execution Principles

- Keep the original stable `brrrdle` repository untouched.
- Preserve all Phase 26 and Phase 27 behavior unless the Phase 28 spec explicitly changes a spectator or notification surface.
- Reproduce and audit before changing source code. Stage 28.1 must verify which Live and notification symptoms are product bugs, implementation gaps, or intentional limitations.
- Treat current Daily Multiplayer spectation as an integrity issue, not cosmetic polish.
- Use trusted sanitized RPCs for spectator discovery. Do not add public/guest spectation or broaden raw multiplayer row access.
- Prefer the smallest app-side change when privacy and integrity can be preserved. Require a migration/RLS addendum before any SQL, RPC, grant, or policy change.
- Keep Live v1 spectators read-only. Focused spectator views may navigate or expand display state, but must not expose mutation controls.
- Keep browser notifications foreground-capable only. Do not add service workers, push infrastructure, background delivery, or deployment configuration.
- Keep Elo transparency explanatory. Do not change rating constants, K-factor behavior, provisional rules, settlement, or match scoring formulas.
- Use one local dev server only when browser smoke is warranted, and stop it afterward.
- Sequence high-conflict app work through the coordinator, especially `src/app/App.tsx`, Live multiplayer UI, notification wiring, and progress files.

## Success Criteria

Phase 28 is complete when:

- Live v1 spectator refresh runs immediately on Live entry and uses faster foreground visible polling, defaulting to a 5 second cadence unless verification supports a lower safe value.
- Background, hidden, and inactive-tab Live polling remains conservative and does not add broad Supabase load.
- `Spectate live game` opens a focused read-only spectator experience instead of only expanding the inline list card.
- Spectators can see a sanitized terminal board/outcome for a short hold window before the row disappears from Live discovery.
- Current Daily Multiplayer games are excluded from spectator discovery, with a server-side/privacy-safe path preferred and an app-side defense kept as a secondary guard.
- Browser and foreground notification delivery works for eligible new notification events when the user has enabled preferences and browser permission allows it.
- Notification delivery avoids spam through existing fingerprint/deduping semantics and suppresses events when the user is already viewing the exact target surface.
- Elo transparency is available in appropriate docs and in-app ranked copy, explaining the Phase 27 Elo model without changing it.
- Focused tests, E2E coverage, browser smoke when warranted, privacy checks, and final verification all pass.

## Stage Breakdown

### Stage 28.0 - Implementation Plan Approval And Protected Baseline

**Scope**: Baseline only. No product source edits, test edits, migrations, Supabase changes, browser UI changes, or Phase 28 implementation.

**Deliverables**:

- Confirm repo state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Preserve existing uncommitted Phase 28 planning/spec/progress artifacts.
- Create the Stage 28.0 progress report and CSV row.
- Run watched-port checks for `5173`, `5174`, `3000`, and `4173`.
- Run obvious process checks for runaway `node`, `vite`, `playwright`, and browser processes.
- Capture disk, memory, and load snapshots before and after verification.
- Run the baseline verification gate:
  - `npm run lint`
  - `npm run test`
  - `npm run build`
  - `npx tsc -p tsconfig.api.json --noEmit`
  - `git diff --check`
  - Python `csv` shape check for `progress/PROGRESS.csv`

**Exit gate**: Baseline passes, or a non-secret blocker is recorded and Phase 28 implementation remains stopped.

### Stage 28.1 - Live And Notification Reproduction Audit

**Scope**: Reproduction, diagnosis, and stage-shaping only unless explicitly authorized otherwise. No migration and no product implementation.

**Deliverables**:

- Reproduce current Live subtab refresh delay and confirm the active polling interval and refresh triggers.
- Reproduce the `Spectate live game` button behavior and document the current inline-only expansion path.
- Reproduce terminal spectator disappearance and determine whether the app can preserve a last sanitized terminal snapshot without SQL changes.
- Reproduce current Daily Multiplayer visibility in authenticated spectator discovery and identify the safest exclusion point.
- Reproduce browser/foreground notification behavior with current preferences and permissions.
- Decide whether Stage 28.2/28.3 migration work is required for Daily exclusion and terminal spectator hold.

**Likely read-only surfaces**:

- `src/app/App.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/notifications/`
- `src/account/Settings.tsx`
- `e2e/gameplay/live-v1-spectator.spec.ts`
- Phase 26 Live spectator migration and `docs/supabase.md`

**Exit gate**: A clear implementation route is recorded. If SQL/RLS is needed, stop before source implementation and proceed only to the addendum stage after explicit authorization.

### Stage 28.2 - Live Spectator Migration/RLS Addendum Planning

**Scope**: Planning/documentation only. Required if Stage 28.1 shows that current Daily exclusion, terminal status rows, or sanitized terminal board/outcome projection needs SQL/RPC changes.

**Deliverables**:

- Create a Phase 28 Live spectator migration/RLS addendum under `planning/specs/phase-28/`.
- Define the exact additive RPC/table/policy/grant changes needed.
- Prefer replacing or extending the authenticated sanitized spectator RPC rather than exposing raw `async_multiplayer_games`.
- Define current Daily Multiplayer exclusion semantics. Default: exclude current UTC-day Daily games from spectator discovery; excluding all Daily spectator rows is acceptable only if it is simpler, safer, and does not affect participant flows.
- Define terminal spectator hold data shape, allowed statuses, retention/hold behavior, and answer leakage boundaries.
- Define rollback plan, privacy probes, and real three-client verification.

**Exit gate**: Addendum is reviewed and a later prompt explicitly authorizes migration execution, or the phase proceeds app-only if no SQL/RLS change is needed.

### Stage 28.3 - Live Spectator Migration/RLS Execution

**Scope**: One additive migration only, if Stage 28.2 authorizes it. No app source implementation.

**Deliverables**:

- Create one additive migration under `supabase/migrations/`.
- Apply only to the confirmed `brrrdle-dev` Supabase project if the target and credentials are unambiguous.
- Preserve authenticated-only sanitized Live v1 spectator behavior.
- Preserve no public/guest spectation and no broad raw nonparticipant SELECT access.
- Preserve participant game creation, joining, settlement, ranked queue, and Daily claim behavior.
- Run non-printing RLS/privacy probes for:
  - anonymous denial;
  - authenticated nonparticipant sanitized discovery only;
  - current Daily exclusion;
  - terminal hold output without raw answers/seeds/sessions/private identity;
  - participant access unaffected;
  - Live v1 spectator privacy unaffected.

**Exit gate**: Migration/probes pass and are recorded, or a blocker is reported before app implementation continues.

### Stage 28.4 - Live Spectator App Implementation

**Scope**: App source/test implementation for Live spectator refresh, focused view, terminal hold consumption, and app-side Daily defense.

**Deliverables**:

- Replace the fixed 30 second Live polling experience with:
  - immediate refresh on Live tab entry;
  - immediate refresh when the page becomes visible again while Live is active;
  - default 5 second polling while the Live tab or focused spectator view is active and the document is visible;
  - conservative background/inactive behavior;
  - in-flight request guards and cleanup on unmount/tab switch.
- Implement a focused read-only spectator view. Default UX: a workspace-backed focused panel or route-like internal state inside the authenticated app, not a public/shareable route.
- Keep the inline Live card list available for scanning.
- Show sanitized terminal board/outcome briefly before removal, targeting about 15 seconds.
- Add an app-side Daily spectator exclusion guard even if the server filters current Daily rows.
- Preserve participant resume, unranked/custom flows, ranked Practice queue/settlement, and Live v1 privacy.

**Likely files**:

- `src/app/App.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/MultiplayerLive.test.tsx`
- `src/multiplayer/MultiplayerWorkspace.test.tsx`
- `src/multiplayer/multiplayerViewModels.test.ts`
- `src/multiplayer/multiplayerRepository.test.ts`
- `e2e/gameplay/live-v1-spectator.spec.ts`

**Exit gate**: Focused tests pass before broad checks. Real Supabase-backed three-client Live spectator E2E should verify read-only focused view, faster perceived refresh, terminal hold, and Daily exclusion if credentials are available.

### Stage 28.5 - Notification Delivery Stabilization

**Scope**: App source/test implementation for foreground-capable browser notification delivery within existing Phase 25/26 notification architecture. No service workers or push.

**Default behavior decision**:

- Browser notifications should dispatch for eligible new notification events when:
  - the user is authenticated as required by the source event;
  - the notification preference enables the event kind;
  - browser notifications are enabled in Settings;
  - browser permission is `granted`;
  - the event passes existing importance/filter/deduping rules;
  - and the user is either not currently looking at the exact target surface or the document is hidden.
- Suppress browser notifications when the user is already viewing the exact relevant target surface to avoid noisy duplicate UI.
- Keep foreground browser notifications device-local. Do not add service workers, push subscriptions, server fanout, or deployment configuration.

**Deliverables**:

- Add a tested browser notification dispatch helper or expand the existing helper module.
- Wire notification dispatch from the existing in-app notification decision path without bypassing sound/importance deduping.
- Ensure permission request UX stays in Settings and does not surprise-prompt during gameplay.
- Add focused tests for permission denied/default/granted, preference disabled, important-only filtering, all-notifications mode, duplicate suppression, and current-route suppression.

**Likely files**:

- `src/app/App.tsx`
- `src/notifications/browserNotifications.ts`
- `src/notifications/browserNotifications.test.ts`
- `src/notifications/notificationPreferences.ts`
- `src/notifications/notificationPreferences.test.ts`
- `src/notifications/notificationViewModels.ts`
- `src/notifications/notificationViewModels.test.ts`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`

**Exit gate**: Focused notification tests pass, broad tests pass, and browser smoke confirms permission/copy behavior if visible changes warrant it.

### Stage 28.6 - Elo Transparency Copy And Documentation

**Scope**: Low-risk documentation and in-app copy. No Elo/rating algorithm changes.

**Deliverables**:

- Explain the Phase 27 Elo model in player-facing terms:
  - starting rating `1200`;
  - provisional period of first 10 ranked games;
  - provisional K-factor `40`;
  - established K-factor `24`;
  - standard 400-point Elo expected-score curve;
  - win/loss/draw score values;
  - match points remain separate from Elo movement;
  - trusted settlement records rating movement from ranked Practice games.
- Add or update documentation in the most appropriate README/planning/user-facing place.
- Add concise in-app ranked explanation copy where players already see ranked stats or queue guidance.
- Preserve existing ranked Practice v1 scope and Daily/timed ranked deferrals.

**Likely files**:

- `README.md` or another existing user-facing repo doc if more appropriate.
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/MultiplayerStatsPanel.test.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/rating.ts` only for exported constants or comments if needed; no algorithm changes.

**Exit gate**: Focused copy/view tests pass and no source changes alter Elo behavior.

### Stage 28.7 - Final E2E, Cleanup, And Handoff Preparation

**Scope**: Narrow final hardening. No Phase 29 work, public profiles, leaderboards, public/guest spectation, extra migrations, deployment, or Git handoff unless separately authorized.

**Deliverables**:

- Review Stage 28.1 through Stage 28.6 for stale copy, duplicated logic, RLS drift, privacy gaps, confusing spectator/notification states, and docs/progress gaps.
- Create or update `planning/phase-28/CHANGELOG.md` if Phase 28 implementation created enough durable decisions to summarize.
- Run focused tests for touched files first.
- Run final gate:
  - `npm run lint`
  - `npm run test`
  - `npm run test:e2e`
  - `npm run test:full`
  - `npm run build`
  - `npx tsc -p tsconfig.api.json --noEmit`
  - `git diff --check`
  - Python `csv` shape check for `progress/PROGRESS.csv`
  - non-printing secret/artifact scan over changed files
  - watched-port/process cleanup checks
- Run browser smoke with one local dev server only if visible behavior changed and stop it afterward.

**Exit gate**: Phase 28 appears complete, blockers are recorded, and the next safe prompt is Git handoff preparation only.

## Deliverable Matrix

| Stage | Primary deliverables | Protected boundaries |
| --- | --- | --- |
| 28.0 | Baseline, progress, resource checks, full local non-E2E gate | No source/test/migration implementation |
| 28.1 | Reproduction and SQL/app route decision | No product implementation unless separately authorized |
| 28.2 | Migration/RLS addendum if needed | No migration creation or execution |
| 28.3 | One additive Live spectator migration if authorized | No app implementation |
| 28.4 | Live refresh, focused spectator view, terminal hold, Daily guard | No public/guest spectation |
| 28.5 | Browser/foreground notification delivery | No service worker or push infrastructure |
| 28.6 | Elo transparency docs/copy | No Elo model change |
| 28.7 | Cleanup, E2E, final hardening | No Phase 29 or Git handoff without later prompt |

## Dependencies And Sequencing

- Stage 28.1 must precede Live source changes because it decides whether the app can safely implement terminal hold and Daily exclusion without SQL.
- Stage 28.2 and Stage 28.3 are conditional. Skip them only if Stage 28.1 proves the server boundary already supports the required behavior safely.
- Stage 28.4 should wait until any required spectator RPC change is applied and probed.
- Stage 28.5 should run after Stage 28.4 to avoid concurrent edits in `src/app/App.tsx` and shared notification routing.
- Stage 28.6 can be implemented late because it is copy-focused and should reflect the final ranked UI context.
- Stage 28.7 is required before Git handoff preparation.

## Verification Strategy

Each implementation stage should run focused tests for touched files before broad commands. Broad verification should scale with risk:

- Live spectator changes: repository parser tests, view-model tests, component tests, and real Supabase-backed three-client E2E when credentials are available.
- Daily exclusion: unit tests plus RLS/privacy probes if SQL changes; E2E should verify current Daily games do not appear to nonparticipant spectators.
- Terminal hold: view-model/component tests and E2E confirming final board/outcome hold without raw answers, seeds, or private data.
- Notification delivery: helper tests with mocked Notification API, App integration tests, and browser smoke for Settings/permission copy if warranted.
- Elo transparency: focused component/copy tests and no behavior deltas in rating tests.
- Final gate: full Stage 28.7 command stack.

## Migration And RLS Gates

Stop before SQL/RLS work if any of these are true:

- The target Supabase project is ambiguous.
- Credentials are unavailable or would require printing secrets.
- The change would expose raw `async_multiplayer_games` rows to nonparticipants.
- The change would expose answers, seeds, raw sessions, private user identity, auth state, or service-role-only data.
- The change would implement public/guest spectation, public profiles, or public leaderboards.
- The change would alter participant gameplay, Daily claims, ranked queue/settlement, or rating behavior outside the approved spectator boundary.

Any migration stage must include:

- one additive migration unless a reviewed corrective migration is explicitly authorized;
- explicit grants;
- rollback notes;
- non-printing RLS/privacy probes;
- real target confirmation without secrets;
- progress updates before and after execution.

## Risk Management

- **Supabase load**: keep the faster polling limited to active visible Live/focused spectator contexts and use in-flight guards.
- **Daily answer leakage**: prefer server-side current Daily exclusion and keep app-side exclusion as defense in depth.
- **Terminal answer leakage**: show only sanitized end-state data approved by the RPC contract and never raw answer-bearing fields.
- **UI confusion**: focused spectator mode should make read-only status obvious and provide a clear way back to Live.
- **Notification spam**: reuse existing importance and fingerprint dedupe; suppress target-surface duplicates.
- **Permission UX**: keep browser notification permission requests in Settings.
- **Rating trust**: Elo transparency must document the existing model, not change it.
- **Regression risk**: preserve participant multiplayer paths, ranked Practice queue/settlement, Live v1 privacy, and all game-rule invariants.

## Open Decisions

- Whether Live foreground polling should remain at 5 seconds or move closer to 3 seconds after measurement. Default: 5 seconds for the first implementation pass.
- Whether the terminal spectator hold can be implemented app-side by retaining the last sanitized row, or needs RPC support for recently completed rows.
- Whether current Daily exclusion should block only the current UTC-day Daily rows or all Daily rows from spectator discovery. Default: current UTC-day exclusion, with all-Daily exclusion acceptable if safer and simpler.
- Exact focused spectator UX shape. Default: authenticated workspace-backed focused view or focused panel, not a public route.
- Exact browser notification route-suppression heuristic. Default: notify when hidden or off-target; suppress when the user is already viewing the exact target surface.
- Exact placement for Elo transparency. Default: ranked stats/queue copy plus user-facing documentation.

## Next Gated Prompt: Stage 28.0 Baseline Only

```md
# Codex Task: Begin Phase 28 Execution For `brrrdle-dev` - Stage 28.0 Baseline Only

Use `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`. Do not touch the original stable `brrrdle` repository.

## Authorization

I authorize Phase 28 Stage 28.0 only: Implementation Plan Approval And Protected Baseline.

This includes reading required governance, planning, progress, package/test surfaces, confirming repository state, recording existing uncommitted Phase 28 planning/spec/progress artifacts, creating the Stage 28.0 progress report and CSV row, running lightweight resource/process checks, and running the Stage 28.0 baseline verification gate.

This does not authorize Stage 28.1 work, source/runtime implementation, test implementation, Supabase migrations, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 29 work, new custom skills, force-push, secret printing, or original stable repo work.

## Required Reading

Before editing or verification, read:

- `CONSTITUTION.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `BRRRDLE-SPEC.md`
- `planning/README.md`
- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `planning/phase-28/LIVE-V1-SPECTATOR-REFRESH-DIAGNOSIS.md`
- `planning/phase-28/PHASE-28-SCOPE-INTAKE-AND-ROUTING.md`
- `planning/phase-28/PLANNING-BRIEF.md`
- `planning/specs/phase-28/PHASE-28-LIVE-SPECTATOR-NOTIFICATIONS-AND-ELO-TRANSPARENCY-SPEC-2026-06-17.md`
- `planning/phase-28/IMPLEMENTATION-PLAN.md`
- `planning/testing/TESTING-SUITE.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-200.md`
- `progress/PROGRESS-STEP-201.md`
- `progress/PROGRESS-STEP-202.md`
- `agents.md`
- `memory.md`
- `package.json`

## Objectives

1. Confirm `pwd`, branch, `git status --short --branch`, remotes, `HEAD`, and `origin/main`.
2. Confirm the original stable `brrrdle` repository is not being used.
3. Record current uncommitted Phase 28 planning/spec/progress artifacts and preserve them.
4. Identify the next progress ID.
5. Create the Stage 28.0 progress report and append the matching 12-column row to `progress/PROGRESS.csv`.
6. Run resource/process checks before and after verification:
   - watched ports `5173`, `5174`, `3000`, and `4173`;
   - obvious runaway `node`, `vite`, `playwright`, or browser processes;
   - disk snapshot;
   - memory/load snapshot.
7. Run sequentially:
   - `npm run lint`
   - `npm run test`
   - `npm run build`
   - `npx tsc -p tsconfig.api.json --noEmit`
   - `git diff --check`
   - Python `csv` shape check for `progress/PROGRESS.csv`
8. If any command fails, stop, record the exact non-secret error, update progress, and do not proceed to Stage 28.1.

## Boundaries

Do not proceed to Stage 28.1. Do not edit source/runtime code, implement tests, create or run migrations, configure Supabase or Vercel, deploy, commit, push, create a PR, merge, release, delete branches, begin Phase 29, create new custom skills, force-push, print secrets, discard existing artifacts, or touch the original stable repo.

## Final Report

Report progress path, files changed, current branch/worktree status, progress ID used, baseline verification results, resource/process observations, blockers/open questions, boundary confirmation, and a copy-safe prompt for Stage 28.1.

Then halt for review.
```
