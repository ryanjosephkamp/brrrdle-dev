# Phase 34 Implementation Plan

**Status**: Detailed implementation plan for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-26.
**Phase focus**: Multiplayer Live, Lobby, notification routing, and active-game attention stabilization.

## Authority

This plan is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, completed Phase 33 competitive ladder readiness, completed Phase 32 multiplayer stabilization, completed Phase 31 postgame actions, completed Phase 30 public leaderboards, completed Phase 29 public profile foundations, completed Phase 28 Live behavior, completed Phase 27 ranked Practice foundations, `planning/phase-34/PLANNING-BRIEF.md`, `planning/specs/phase-34/PHASE-34-MULTIPLAYER-LIVE-LOBBY-NOTIFICATION-STABILIZATION-SPEC-2026-06-26.md`, `docs/deployment.md`, `docs/supabase.md`, `docs/ranked-multiplayer.md`, `planning/testing/TESTING-SUITE.md`, `progress/PROGRESS.csv`, and the current progress reports.

This plan does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

Existing user edits to `planning/phase-33/REVIEW-CHECKLIST.md` must be preserved.

## Current Baseline

Phase 33 is complete, merged, post-merge sanity reviewed, branch-cleaned, and manually checked by the user. The Phase 34 planning brief and unified specification are drafted and awaiting staged execution.

During this plan pass, local `main` and `origin/main` were confirmed at:

`95d0bad3c28761db78a016e95a54287f4b096ab8`

Current protected baseline:

- Phase 33 canonical five-minute timed ranked Practice, display-only rank bands, public ranked leaderboard `All buckets` removal, timed ranked two-client E2E coverage, visual review, and manual review checklist remain protected.
- Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and real two-client E2E coverage remain protected.
- Phase 31 Practice-safe postgame actions remain protected.
- Phase 30 public leaderboards remain privacy-safe, display-only, and non-authoritative.
- Phase 29 public profiles remain default-private with moderation boundaries.
- Phase 28 authenticated Live v1 spectator behavior remains read-only.
- Phase 27 trusted ranked Practice queue, settlement, and rating foundations remain protected.
- Daily Multiplayer remains asynchronous, five-letter, UTC-day keyed, no-clock, answer-separated, and claim-safe.
- Existing gameplay rules, Elo math, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged.

## Execution Principles

- Work in small gated stages. Each stage records a progress report and matching 12-column CSV row.
- Keep Phase 34 source-only unless Stage 34.1 proves a safe projection gap and the user explicitly authorizes Stage 34.2 addendum planning.
- Prefer existing view-model, routing, notification, and join helper seams over broad rewrites.
- Fix both Live identity paths: participant Live rows and authenticated read-only spectator rows.
- Preserve privacy by using only safe profile/display data already authorized for the viewer.
- Make UI cues accessible through text or aria-visible labels, not color alone.
- Use focused tests close to the changed behavior first, then full gates at baseline and final hardening.
- Use one dev server and minimal browser contexts for any browser/E2E work, with watched-port and process cleanup checks.
- Keep visual handoff artifacts under ignored local paths and never stage or commit screenshots, traces, videos, auth state, tokens, or local session artifacts.
- Do not run the brrrdle GitHub backup workflow unless the user explicitly invokes it later.

## Success Criteria

Phase 34 is complete when:

- selected `Live` subtab count badges are readable in active and inactive states across desktop and mobile layouts;
- Live participant cards show safe public/profile names in matchup copy;
- authenticated read-only spectator Live cards show safe player names in matchup copy;
- `You` appears only where the viewer perspective is intentional and never as an opponent identity;
- `Rival`, `Host`, `Player one`, `Player two`, or equivalent generic labels appear only when safe identity is unavailable;
- Live cards show clear display-only `Ranked` or `Unranked` state without exposing player Elo/rating values;
- joinable Lobby rows present `Join` and execute guarded one-click join behavior;
- direct Lobby join does not create duplicate lobbies, bypass auth, bypass Daily claim rules, or steal unrelated selected-game focus;
- foreground browser and in-app `multiplayer-your-turn` notifications route to the exact selected active game when safe;
- stale or unavailable notification targets fall back safely to Multiplayer -> Active Games;
- Active Games cards visibly and accessibly mark games where it is the viewer's turn;
- no SQL/RLS changes are made unless a prior Stage 34.2 addendum is explicitly approved;
- no public/guest spectation, public profile browsing, direct matchmaking, service worker, push infrastructure, auth/deployment config, gameplay-rule change, Elo change, deployment, release, or backup workflow work is introduced;
- focused tests, real two-client E2E where needed, full final verification, visual handoff review, and manual review checklist all pass before Git handoff preparation.

## Stage Breakdown

### Stage 34.0: Implementation Plan Approval And Protected Baseline

**Purpose**: Approve this implementation plan, preserve the current worktree, and prove the Phase 34 baseline is healthy before implementation.

**Authorized deliverables for the stage**:

- Read required governance, Phase 34 planning/spec, progress, package/test, Live/Lobby/notification, and workflow surfaces.
- Confirm repository state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Record current uncommitted Phase 34 planning/spec/progress artifacts and the user-edited Phase 33 checklist state.
- Create the Stage 34.0 progress report and matching CSV row.
- Run watched-port/process/resource checks before and after verification.
- Run the protected baseline gate.

**Likely files**:

- `progress/PROGRESS.csv`
- next `progress/PROGRESS-STEP-*.md`
- read-only governance/planning/test/source surfaces named in the Stage 34.0 prompt

**Verification**:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked files
- ignored-artifact check
- watched-port/process/resource checks
- `git status --short --branch`

**Exit gate**: Baseline passes and Stage 34.1 audit can be safely authorized.

**Stop conditions**:

- any baseline command fails;
- repository target or branch is ambiguous;
- original stable `brrrdle` repository would be touched;
- forbidden artifacts are staged or tracked;
- secret scan finds credential-like material;
- user-edited Phase 33 checklist changes are accidentally modified.

### Stage 34.1: Live/Lobby/Notification Audit And Scope Lock

**Purpose**: Reproduce or audit the user-observed issues and lock whether Phase 34 can remain source-only.

**Authorized deliverables for the stage**:

- Create the Stage 34.1 progress report and matching CSV row.
- Inspect the attached Live badge and Live identity screenshots if still available.
- Audit selected Live badge styling through `SubtabBar` and workspace attention view models.
- Audit participant Live card identity mapping.
- Audit authenticated spectator Live card identity mapping.
- Audit ranked/unranked metadata availability for Live cards.
- Audit Lobby row actions and the guarded join path.
- Audit notification action targets, foreground browser notification click handling, dashboard dispatch, and selected-game routing.
- Decide whether Stage 34.2 migration/RLS addendum planning is required.

**Likely files/modules**:

- `src/ui/SubtabBar.tsx`
- `src/app/attentionViewModels.ts`
- `src/app/LunarSignalStage.tsx`
- `src/dashboard/dashboardActions.ts`
- `src/dashboard/dashboardViewModels.ts`
- `src/notifications/browserNotifications.ts`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerLobby.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerRepository.ts`
- relevant dashboard, notification, multiplayer, Live/Lobby/Active Games, routing, Supabase/RLS, and E2E tests

**Verification**:

- focused read-only/browser checks only as needed;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- `git status --short --branch`.

**Exit gate**:

- If existing app state and existing sanitized projections are sufficient, proceed to Stage 34.3 source implementation after user approval.
- If a safe projection gap exists, stop and request Stage 34.2 addendum planning authorization.

**Stop conditions**:

- a fix would require SQL/RLS without an addendum;
- Live identity data would require exposing private profile data, raw auth details, answers, seeds, sessions, queue internals, rating transaction ids, or settlement ids;
- audit reveals browser notification behavior requires service workers or background push;
- focused audit cannot classify a user-visible issue safely.

### Stage 34.2: Migration/RLS Addendum Planning If Required

**Purpose**: Plan a narrow additive SQL/RLS/RPC contract only if Stage 34.1 proves the existing safe projections are insufficient.

**Authorized deliverables for the stage**:

- Create a Stage 34.2 progress report and matching CSV row.
- Create a Phase 34 migration/RLS addendum under `planning/specs/phase-34/`.
- Define allow-listed safe fields for Live identity and/or ranked metadata if needed.
- Preserve Phase 29 public profile default-private boundaries.
- Preserve Phase 28 Live read-only behavior and Daily answer leakage protections.
- Define non-printing privacy probes.

**Verification**:

- `git diff --check`
- progress CSV shape check
- non-printing secret/artifact scan
- ignored-artifact check
- `git status --short --branch`

**Exit gate**: Addendum is clean and can be reviewed before any migration execution.

**Stop conditions**:

- proposed projection expands public/guest access;
- proposed projection exposes private fields;
- proposed SQL changes are broader than needed for current Live card labels;
- source implementation pressure appears before addendum review.

### Stage 34.3: Live Card And Badge Stabilization

**Purpose**: Fix current Live readability, identity labels, and ranked/unranked labels.

**Authorized deliverables for the stage**:

- Create a Stage 34.3 progress report and matching CSV row.
- Fix selected Live neutral count badge readability without reusing urgent red semantics.
- Normalize participant Live matchup labels to safe display names.
- Normalize authenticated spectator Live matchup labels to safe display names.
- Add display-only `Ranked` or `Unranked` labels to Live cards.
- Add focused tests for badge readability, Live identity fallback, privacy boundaries, and ranked/unranked labels.

**Likely files/modules**:

- `src/ui/SubtabBar.tsx`
- `src/app/attentionViewModels.ts`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- relevant Live/badge/component/view-model tests

**Verification**:

- focused Live/badge/view-model/component tests first;
- then `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, progress CSV shape check, secret/artifact checks, ignored-artifact check, and `git status --short --branch`.

**Exit gate**: Live card and badge behavior is tested, source-only, and ready for Stage 34.4.

**Stop conditions**:

- identity fix needs new SQL/RLS not already approved;
- Live labels expose Elo/rating values or private data;
- Daily answer leakage risk appears;
- CSS change causes layout instability or unreadable mobile text.

### Stage 34.4: Lobby One-Click Join

**Purpose**: Replace Lobby `Open to join` friction with a guarded direct join action.

**Authorized deliverables for the stage**:

- Create a Stage 34.4 progress report and matching CSV row.
- Change joinable Lobby visible action label to `Join`.
- Use accessible action copy such as `Join multiplayer match`.
- Reuse the existing guarded join path or extract an equivalent shared helper.
- Open or select the joined game after successful join.
- Preserve own-lobby management/cancel behavior.
- Preserve signed-out blocking, Daily claim blocking, stale-row fallback, duplicate-join protections, creator auto-routing, and rematch behavior.
- Add focused tests for labels, action behavior, blocked states, stale rows, and no duplicate lobby creation.

**Likely files/modules**:

- `src/multiplayer/MultiplayerLobby.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerRepository.ts`
- relevant Lobby/component/repository tests

**Verification**:

- focused Lobby/direct-join tests first;
- then standard lint/test/build/typecheck/diff/CSV/secret/artifact/status gate for touched surfaces.

**Exit gate**: One-click Lobby join is tested and ready for notification/attention work.

**Stop conditions**:

- direct join bypasses existing auth or Daily claim checks;
- own lobby can self-join incorrectly;
- stale rows create duplicates or unsafe state;
- selected-game behavior steals focus from a deliberately selected unrelated active game.

### Stage 34.5: Notification Direct Routing And Active Turn Cues

**Purpose**: Route current foreground notifications to the exact game when safe and make active turn attention visible.

**Authorized deliverables for the stage**:

- Create a Stage 34.5 progress report and matching CSV row.
- Ensure `multiplayer-your-turn` notification action targets include the specific game id whenever available.
- Align in-app Notification Center activation and browser foreground click routing.
- Select the exact active game and practical Resume destination when safe.
- Fall back to Multiplayer -> Active Games when the target is unavailable.
- Keep redundant notification suppression accurate for the exact active target.
- Add visible and accessible active-game `Your turn` cues.
- Add focused dashboard/notification/browser-notification/Active Games tests.

**Likely files/modules**:

- `src/dashboard/dashboardActions.ts`
- `src/dashboard/dashboardViewModels.ts`
- `src/notifications/browserNotifications.ts`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerPanelRouting.ts`
- relevant dashboard, notification, browser notification, active-game component, and routing tests

**Verification**:

- focused dashboard/notification/browser-notification/Active Games tests first;
- deterministic unit/component/browser-route tests are acceptable if native browser notification clicks are unstable in Playwright;
- then standard lint/test/build/typecheck/diff/CSV/secret/artifact/status gate for touched surfaces.

**Exit gate**: Notification routing and active turn cues are tested and ready for final hardening.

**Stop conditions**:

- implementation requires service workers, push subscriptions, background push, or production notification infrastructure;
- click routing exposes private details;
- stale notification fallback is unsafe or confusing;
- active turn cue becomes visually indistinguishable from urgent errors.

### Stage 34.6: Final Hardening, Two-Client E2E, Visual Review, Checklist, And Completion Docs

**Purpose**: Prove Phase 34 behavior end to end, clean up, and prepare completion artifacts.

**Authorized deliverables for the stage**:

- Create a Stage 34.6 progress report and matching CSV row.
- Review Stages 34.1 through 34.5 for stale copy, duplicated logic, privacy gaps, routing regressions, Live identity regressions, Lobby join regressions, notification regressions, docs/progress gaps, and final cleanup needs.
- Add real two-client Supabase-backed E2E where feasible for:
  - Live participant/spectator safe names;
  - Live ranked/unranked labels;
  - one-click Lobby join;
  - active-game resume/direct routing;
  - preserved Phase 33 timed ranked behavior and Phase 32 multiplayer stabilization behavior.
- Add deterministic browser/unit/component coverage for notification direct routing if native browser notification click automation is unreliable.
- Make only narrow final-hardening fixes required to complete Phase 34.
- Create `planning/phase-34/CHANGELOG.md`.
- Create `planning/phase-34/REVIEW-CHECKLIST.md`.
- Run local visual handoff review for Phase 34 surfaces and keep artifacts ignored/local-only.

**Verification**:

- focused tests for touched files;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run test:full`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port/process cleanup checks for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

**Exit gate**: Phase 34 appears complete and can move to Git handoff preparation only after explicit user authorization.

**Stop conditions**:

- any final verification command fails;
- any visual capture shows a likely defect that should be repaired before handoff;
- manual checklist cannot be made trustworthy from available evidence;
- ignored visual artifacts are tracked or staged;
- process/resource cleanup is ambiguous.

## Deliverables By Stage

| Stage | Deliverables |
| --- | --- |
| 34.0 | baseline progress report/CSV row, resource checks, protected verification evidence |
| 34.1 | audit progress report/CSV row, source-only or addendum-required decision |
| 34.2 if needed | migration/RLS addendum, privacy probes plan, progress report/CSV row |
| 34.3 | Live badge/readability, safe-name labels, ranked/unranked labels, focused tests, progress |
| 34.4 | one-click guarded Lobby join, focused tests, progress |
| 34.5 | notification direct routing, active turn cues, focused tests, progress |
| 34.6 | final hardening, E2E/regressions, visual review artifacts, changelog, review checklist, final verification, progress |

## Dependencies

- Existing Phase 32 participant identity and safe label helpers.
- Existing Phase 28 authenticated Live spectator projections.
- Existing Phase 33 timed ranked metadata and public leaderboard boundaries.
- Existing guarded multiplayer join and selected-game routing behavior.
- Existing dashboard/notification action target model.
- Existing local visual handoff and manual checklist workflows.
- Supabase-backed E2E test fixtures, only where real two-client behavior must be verified.

## Risk Management

- Sequence Live identity before Lobby join and notification routing so shared label/routing helpers settle early.
- Keep `src/multiplayer/MultiplayerPanel.tsx` and `src/app/App.tsx` high-conflict changes narrow and sequenced.
- Avoid broad redesign of Live/Lobby/Active Games; this is a stabilization pass.
- Prefer pure view-model tests for identity and labels before component/browser tests.
- Use real two-client E2E for join/Live behavior when it is the only honest proof of the bug fix.
- Treat notification direct routing as foreground/local only; any push/service-worker idea belongs to a later phase.
- Stop before SQL if safe Live projections are missing.
- Keep later feature seeds in roadmap/planning only; do not let Phase 34 become a spectator/profile/social/dashboard phase.

## Migration/RLS Addendum Gates

Stage 34.2 is required before SQL work if any of these are true:

- Live participant safe names cannot be derived from current app state or existing participant identity helpers.
- Live spectator safe names cannot be derived from current sanitized authenticated Live RPC data.
- ranked/unranked Live card labels require new sanitized projected fields.
- any proposed change expands nonparticipant visibility.
- any proposed change touches public/guest spectator access.

Stage 34.2 must remain planning-only. Migration execution, if ever needed, requires a separate later authorization.

## Open Decisions

The following decisions are locked by the Phase 34 spec unless Stage 34.1 finds contradictory evidence:

- Lobby visible join action: `Join`.
- Lobby accessible join action: `Join multiplayer match`.
- Live ranked labels: `Ranked` and `Unranked`.
- Stale notification fallback: route to Multiplayer -> Active Games, refresh visible state where practical, and avoid private details.
- Browser notification click testing: deterministic unit/component/browser-route tests are acceptable if native notification clicks are unstable.
- Expected SQL posture: source-only unless Stage 34.1 proves a safe projection gap.

Questions for Stage 34.1 to answer:

- Do participant Live rows already have enough safe profile/name data in app state to avoid SQL?
- Do authenticated spectator Live rows already include enough safe profile/name data from existing RPC projections?
- Can direct Lobby join reuse the existing Practice join flow cleanly, or should a small shared helper be extracted?
- Does current notification routing already select the exact game for some paths, and which paths remain generic?
- Which Phase 34 claims require real two-client E2E rather than unit/component coverage?

## Explicit Deferrals

Phase 34 does not include:

- Vercel deployment protection, magic-link redirect configuration, Supabase auth redirects, account confirmation copy, password changes, email changes, Settings/Danger Zone completion, or account management. Route to Phase 35.
- Public/guest spectation, spectator presence lists/counts, spectator sorting, or public projection expansion. Route to Phase 36 or later.
- Public profile pages, clickable player names/avatars, richer rival avatar rendering, custom avatar images, direct player match requests, custom-code private matchmaking expansion, or mailbox/request flows. Route to Phase 37 or later.
- Live card Elo/rating values, public site stats, private developer dashboard, admin analytics, onboarding/help/tutorials, theme modernization, deployments, releases, service workers, push subscriptions, gameplay-rule changes, or Elo algorithm changes. Route to later explicitly approved phases.

## Next Gated Prompt: Stage 34.0 Baseline Only

Use the following prompt only after this implementation plan is reviewed and approved. It authorizes Stage 34.0 protected baseline only and does not authorize Stage 34.1 or implementation.

````md
# Codex Task: Begin Phase 34 Execution For `brrrdle-dev` - Stage 34.0 Baseline Only

Use `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`. Do not touch the original stable `brrrdle` repository.

## Authorization

I authorize Phase 34 Stage 34.0 only: Implementation Plan Approval And Protected Baseline.

This includes reading required governance, planning, progress, package/test surfaces, confirming repository state, recording existing uncommitted Phase 34 planning/spec/progress artifacts and the user-edited Phase 33 review checklist state, creating the Stage 34.0 progress report and matching CSV row, running resource/process checks, and running the Stage 34.0 baseline verification gate.

This does not authorize Stage 34.1 work, source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or original stable repository work.

## Required Reading

Before editing or verification, read:

- `CONSTITUTION.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `BRRRDLE-SPEC.md`
- `planning/README.md`
- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `planning/testing/TESTING-SUITE.md`
- `planning/phase-33/CHANGELOG.md`
- `planning/phase-33/REVIEW-CHECKLIST.md`
- `planning/phase-34/PLANNING-BRIEF.md`
- `planning/specs/phase-34/PHASE-34-MULTIPLAYER-LIVE-LOBBY-NOTIFICATION-STABILIZATION-SPEC-2026-06-26.md`
- `planning/phase-34/IMPLEMENTATION-PLAN.md`
- `docs/deployment.md`
- `docs/supabase.md`
- `docs/ranked-multiplayer.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-270.md`
- `progress/PROGRESS-STEP-271.md`
- `progress/PROGRESS-STEP-272.md`
- `agents.md`
- `memory.md`
- `package.json`

## Objectives

1. Confirm repo state: `pwd`, branch, `git status --short --branch`, remotes, `HEAD`, and `origin/main`.
2. Confirm the original stable `brrrdle` repository is not being used.
3. Record current uncommitted Phase 34 planning/spec/progress artifacts and preserve existing user edits to `planning/phase-33/REVIEW-CHECKLIST.md`.
4. Create the Stage 34.0 progress report and matching 12-column CSV row, likely progress ID `274`.
5. Run watched-port/process/resource checks before and after verification for ports `5173`, `5174`, `3000`, and `4173`, obvious runaway `node`/`vite`/`playwright`/browser processes, disk, memory, and load.
6. Run sequentially:
   - `npm run lint`
   - `npm run test`
   - `npm run build`
   - `npx tsc -p tsconfig.api.json --noEmit`
   - `git diff --check`
   - progress CSV shape check using `python3 -S`
   - non-printing secret/artifact scan over changed tracked and untracked repository files
   - ignored-artifact check confirming `.env.local`, `dist/`, `node_modules/`, `test-results/`, `playwright-report/`, screenshots, videos, traces, auth state, tokens, and local session artifacts are not staged or tracked
   - `git status --short --branch`
7. If any command fails, stop, record the exact non-secret failure, update progress, and do not proceed to Stage 34.1.

## Boundaries

Do not edit source/runtime code, implement tests, create or run migrations, configure Supabase or Vercel, deploy, commit, push, create a PR, merge, release, delete branches, begin Stage 34.1, implement public/guest spectation, add service workers or push infrastructure, change gameplay or Elo rules, create new custom skills, run the brrrdle GitHub backup workflow, force-push, print secrets, expose private data or local session artifacts, or touch the original stable repo.

## Final Report

Report progress path, files changed, branch/worktree status, progress ID used, baseline verification results, resource/process observations, blockers/open questions, boundary confirmation, and a copy-safe prompt for Stage 34.1 audit only if the baseline passes.

Then halt for review.
````
