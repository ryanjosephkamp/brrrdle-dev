# Phase 37 Implementation Plan: Navigation And Gameplay Ergonomics

**Status**: Draft implementation plan for review.
**Phase**: Phase 37.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-29.

## Status And Authority

This implementation plan follows the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, the completed Phase 36 evidence, `planning/phase-37/PLANNING-BRIEF.md`, `planning/specs/phase-37/PHASE-37-NAVIGATION-GAMEPLAY-ERGONOMICS-SPEC-2026-06-29.md`, `planning/testing/TESTING-SUITE.md`, the progress ledger, and local workflow documentation.

It is planning-only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, brrrdle GitHub backup workflow execution, force-push, secret printing, private data exposure, local session artifact exposure, or original stable `brrrdle` repository work.

## Execution Principles

- Keep Phase 37 source-only unless an explicit later addendum proves otherwise. No migration/RLS work is expected.
- Preserve the user-edited `planning/phase-36/REVIEW-CHECKLIST.md`.
- Treat `src/app/App.tsx`, route state, and gameplay surfaces as high-conflict integration points. Sequence work rather than letting unrelated changes collide.
- Reproduce or lock the solo invalid-guess sound bug before changing sound dispatch.
- Treat browser history as view state only. It must never replay gameplay, auth, account, queue, claim, profile, password, notification, or persistence mutations.
- Treat gameplay auto-centering as a one-shot entry/resume intent. It must not react to passive hydration, polling, realtime refreshes, identity hydration, timer ticks, or ordinary typing.
- Preserve Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior.
- Preserve Phase 35 Profile/auth and Live identity behavior.
- Preserve Phase 34 Live/Lobby/notification behavior.
- Preserve Phase 33 timed ranked Practice behavior and public leaderboard display-only boundaries.
- Preserve Daily integrity, gameplay rules, scoring, timeout/forfeit handling, GO transition behavior, solved-row hold behavior, keyboard-state rules, and Elo math.

## Success Criteria

- Solo OG invalid submissions use the invalid-guess cue and no longer sound like valid submissions.
- Solo GO invalid submissions use the invalid-guess cue and no longer sound like valid submissions.
- Multiplayer invalid-guess behavior remains unchanged.
- Explicit Solo game entry/resume can place the board/keyboard region in a useful viewport position after route and selected-game state settle.
- Explicit Multiplayer join/resume/direct-route flows can place the board/keyboard region in a useful viewport position after route, subtab, and selected-game state settle.
- Auto-centering does not loop, does not trigger on passive updates, respects reduced-motion where available, and does not steal focus from active text/gameplay controls.
- Browser back/forward can traverse approved route, subtab, and selected-game view states without mutating gameplay or account state.
- Stale, hidden, completed, deleted, unavailable, or unauthorized selected games fall back to the safest owning route/subtab.
- Existing local-storage navigation state remains backward compatible.
- No raw auth IDs, emails, private profile data, answers, seeds, sessions, tokens, screenshots, videos, traces, or local artifacts are exposed.

## Stage Breakdown

### Stage 37.0 - Protected Baseline

**Goal**: Approve the implementation plan as the execution baseline and verify the worktree before any audit or source work.

**Deliverables**

- Create `progress/PROGRESS-STEP-304.md` and append the matching 12-column `progress/PROGRESS.csv` row.
- Record current uncommitted Phase 37 planning/spec/progress artifacts.
- Preserve the user-edited Phase 36 review checklist.
- Run watched-port/process checks before and after verification for `5173`, `5174`, `3000`, and `4173`.

**Verification**

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

**Exit Gate**

Stage 37.0 passes only if all baseline checks pass. If any command fails, record the exact non-secret failure in progress and stop before Stage 37.1.

### Stage 37.1 - Route, Entry/Resume, History, And Sound Audit

**Goal**: Map the current navigation and sound seams before implementation.

**Audit Targets**

- Route and primary navigation ownership in `src/app/routes.ts`, `src/app/navigationState.ts`, `src/app/App.tsx`, and `src/app/LunarSignalStage.tsx`.
- Solo subtab, selected Solo game, resume, start, Practice/Daily, and active-game entry paths.
- Multiplayer subtab, selected Multiplayer game, Active Games resume, Lobby direct join, Live participant resume, focused Live spectator routing, notification routing, dashboard routing, and postgame routing.
- Browser-history feasibility and fallback behavior for stale selected games.
- Solo OG, solo GO, and multiplayer invalid-guess sound dispatch, including whether the bug is missing `invalid-guess`, audible masking by `keyboard-click`/valid-submit cues, or an alternate input path.
- Whether upper gameplay information condensation remains deferred. Expected: defer unless the audit proves a very narrow low-risk companion change.

**Deliverables**

- Create `progress/PROGRESS-STEP-305.md` and matching CSV row.
- Document the chosen Stage 37.2, Stage 37.3, and Stage 37.4 source-only paths.
- Decide whether any migration/RLS addendum is required. Expected: no.

**Verification**

- Focused read-only checks only, with one local dev server only if browser reproduction requires it.
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

### Stage 37.2 - Solo Invalid-Guess Sound Repair

**Goal**: Make solo invalid submissions match the existing multiplayer invalid-guess sound behavior.

**Likely Files**

- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/sound/`
- focused solo game and sound tests

**Implementation Requirements**

- Reproduce or test the invalid-guess sound inconsistency before source repair where practical.
- Repair solo OG and solo GO invalid submissions so the invalid-guess cue is the clear invalid-submit result.
- Preserve multiplayer invalid-guess behavior.
- Preserve valid solo submission cues, correct-guess cues, win/loss cues, keyboard input cues where intended, master sound preferences, Web Audio fallback behavior, and suspended AudioContext resume behavior.
- Do not change validation rules, Hard Mode rules, word-list membership, tile evaluation, animation timing, scoring, progression, Daily claims, or completion rules.

**Focused Tests**

- Solo OG invalid word-list submission.
- Solo OG Hard Mode invalid submission where applicable.
- Solo GO invalid word-list submission.
- Solo GO Hard Mode invalid submission where applicable.
- Valid solo submission sound behavior remains intact.
- Multiplayer invalid-guess behavior remains intact or is covered by existing regressions.

**Verification**

- Run focused tests first.
- Then run `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, CSV shape check, secret/artifact scan, ignored-artifact check, watched-port cleanup check, and `git status --short --branch`.

### Stage 37.3 - Gameplay Entry/Resume Auto-Centering

**Goal**: Bring the playable board/keyboard area into useful view after explicit entry, join, resume, or direct-route flows.

**Likely Files**

- `src/app/App.tsx`
- `src/solo/SoloWorkspace.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerLobby.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- component and browser-facing tests

**Implementation Requirements**

- Add a small anchor/ref or equivalent helper for the board/keyboard region.
- Trigger auto-centering from explicit game-entry intents only:
  - Solo start/entry;
  - Solo Active Games resume/select;
  - signed-in auto-resume when it selects a game;
  - Multiplayer Active Games resume;
  - Lobby direct join;
  - Live participant resume;
  - notification direct resume into a specific game;
  - dashboard direct resume into a specific game.
- Treat focused Live spectator centering as optional and read-only; include only if Stage 37.1 proves it safe.
- Make scroll requests one-shot and clear them after use.
- Avoid scroll jumps on typing, invalid row-shake, timers, Live refresh, identity hydration, multiplayer subscriptions, and passive resume capture.
- Respect reduced-motion and avoid stealing focus from text fields or active gameplay controls.

**Focused Tests**

- Entry/resume actions create the expected one-shot scroll intent.
- Passive updates do not create scroll intents.
- The intent clears after use.
- Reduced-motion and focus safeguards are represented where practical.
- Browser smoke or visual checks confirm useful board/keyboard placement on desktop and mobile-sized viewports.

**Verification**

- Run focused tests first, then the standard full gate.

### Stage 37.4 - Browser Back/Forward Navigation Integration

**Goal**: Make browser back/forward useful for app view state without giving it gameplay authority.

**Likely Files**

- `src/app/navigationState.ts`
- `src/app/routes.ts`
- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/dashboard/dashboardActions.ts`
- `src/notifications/notificationActions.ts`
- `src/notifications/browserNotifications.ts`
- route/navigation tests and E2E coverage

**Implementation Requirements**

- Define a typed browser-history state for:
  - active route;
  - Solo subtab;
  - Multiplayer subtab;
  - selected Solo game key when safe;
  - selected Multiplayer game id when safe;
  - focused Live spectator game id when safe;
  - History filters when safe.
- Push or replace browser history for deliberate view-state changes only.
- Handle `popstate` by applying view state only.
- Never store action intents or mutation intents in history state.
- Preserve existing local-storage navigation compatibility.
- Define precedence between browser history state and persisted local navigation on startup.
- Preserve hidden compatibility routes and their existing fallback targets.
- Fallback safely when selected games are stale, hidden, completed, deleted, unavailable, no longer visible, no longer resumable, or unauthorized.

**Focused Tests**

- Route and primary tab history push/replace behavior.
- Solo subtab and selected-game history behavior.
- Multiplayer subtab and selected-game history behavior.
- Focused spectator popstate fallback.
- Stale selected-game fallback.
- No gameplay mutation on `popstate`.
- Local-storage compatibility.

**Verification**

- Run focused tests first, then the standard full gate.

### Stage 37.5 - Final Hardening, E2E, Visual Review, Changelog, Manual Checklist

**Goal**: Close Phase 37 with evidence, user-review materials, and clean handoff readiness.

**Deliverables**

- Review Stages 37.1 through 37.4 for stale copy, regressions, accessibility gaps, docs gaps, privacy gaps, and final cleanup needs.
- Add only narrow final-hardening fixes if required.
- Run feasible focused regression/E2E coverage for:
  - solo invalid-guess sound;
  - gameplay-area auto-centering;
  - route/subtab browser history;
  - selected-game stale fallbacks;
  - notification direct-resume preservation;
  - Lobby join/resume preservation;
  - Leaderboard/Stats and Profile/Settings non-regressions where practical.
- Run local visual handoff review for changed user-visible flows, saving artifacts only under `test-results/visual-review/phase-37-stage-37-5/`.
- Create `planning/phase-37/CHANGELOG.md`.
- Create `planning/phase-37/REVIEW-CHECKLIST.md`.
- Create `progress/PROGRESS-STEP-308.md` or the next available progress report and matching CSV row.

**Verification**

- Focused regression tests.
- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run test:full`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port/process cleanup
- `git status --short --branch`

## Likely Files And Modules

- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/app/navigationState.ts`
- `src/app/routes.ts`
- `src/app/attentionViewModels.ts`
- `src/dashboard/dashboardActions.ts`
- `src/dashboard/dashboardViewModels.ts`
- `src/notifications/browserNotifications.ts`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`
- `src/solo/SoloWorkspace.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerLobby.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/postgameActions.ts`
- `src/sound/`
- relevant route, navigation, solo, multiplayer, sound, browser-history, component, and E2E tests.

## Dependencies And Sequencing

- Stage 37.2 should run before auto-centering/history if the audit finds a simple sound-only fix; that keeps the bugfix isolated.
- Stage 37.3 should run before Stage 37.4 so selected-game and direct-route flows are stable before browser-history wiring starts.
- Stage 37.4 should own browser history and route-state integration. Avoid concurrent edits to `src/app/App.tsx` during this stage.
- Stage 37.5 should be the first stage to create Phase 37 changelog and manual review checklist.

## Migration And RLS Gates

No Supabase migration or RLS work is expected for Phase 37.

Stop and create a separate addendum before any SQL, RLS, RPC, Supabase configuration, or remote project work if an implementation stage unexpectedly discovers that safe navigation or sound behavior cannot be repaired source-only.

## Vercel And Supabase Constraints

- Do not configure Vercel.
- Do not configure Supabase.
- Do not deploy.
- Do not run migrations.
- Keep Phase 35 deployment/auth redirect observations as documentation/configuration context only.

## Verification Expectations

- Every implementation stage should run focused tests first.
- Any browser or E2E work should use one local dev server and clean it up before reporting.
- Final hardening should run the full final gate, including E2E and `npm run test:full`, unless a later prompt explicitly narrows the gate with a concrete reason.
- Verification outputs should be summarized in progress reports without printing secrets or local session artifacts.

## Stop Conditions

Stop before further work if:

- the repository is not `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`;
- the original stable `brrrdle` repository would be touched;
- the Phase 36 review checklist would be overwritten or reverted;
- baseline `main`/`origin/main` is unexpected and the discrepancy is not explained;
- any required verification command fails;
- a source-only stage appears to require migration/RLS work, deployment, Vercel/Supabase configuration, service workers, push infrastructure, gameplay-rule changes, Elo changes, public/guest spectation, or broader shell redesign;
- a real credential-like secret or forbidden artifact is found;
- browser history work would need to encode mutation intents or private data;
- auto-centering would require broad layout redesign instead of a narrow anchor/intent path.

## Risk Management

- **Scroll churn risk**: Use one-shot intents and suppress passive update triggers.
- **Focus/accessibility risk**: Avoid stealing active focus; respect reduced motion; prefer stable visual positioning over aggressive focus calls.
- **History mutation risk**: Keep history state view-only and add tests proving `popstate` does not trigger actions.
- **Stale selected-game risk**: Centralize fallback behavior and test unavailable/deleted/completed cases.
- **Sound regression risk**: Keep multiplayer as the reference behavior and test valid/invalid solo paths separately.
- **High-conflict file risk**: Sequence `App.tsx` and navigation-state edits.

## Open Decisions

- Whether the solo sound bug is missing invalid dispatch, double-cue masking, or an alternate input path. Stage 37.1 must answer this before Stage 37.2.
- Whether focused Live spectator views should auto-center like playable game views. Expected: only if safe and read-only.
- Whether browser history should remain state-only with no URL changes. Expected: yes for Phase 37.
- Whether upper gameplay information needs any small condensation. Expected: defer unless the audit proves a tiny low-risk change.

## Next Gated Action

The next authorized action should be Stage 37.0 protected baseline only. Stage 37.0 should read the required documents, confirm repository state, preserve existing Phase 37 planning/spec/progress artifacts and the user-edited Phase 36 review checklist, create the Stage 37.0 progress report and CSV row, run watched-port/resource checks, run the baseline verification gate, and stop before Stage 37.1 audit or implementation.
