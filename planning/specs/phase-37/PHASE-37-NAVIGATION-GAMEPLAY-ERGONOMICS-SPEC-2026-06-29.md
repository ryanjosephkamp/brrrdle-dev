# Phase 37 Specification: Navigation And Gameplay Ergonomics

**Status**: Draft unified specification for review.
**Phase**: Phase 37.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-29.

## Status And Authority

This specification follows the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, `planning/phase-37/PLANNING-BRIEF.md`, completed Phase 36 evidence, the roadmap files, the testing strategy, and the progress ledger.

It is planning/specification only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, brrrdle GitHub backup workflow execution, force-push, secret printing, private data exposure, local session artifact exposure, or original stable `brrrdle` repository work.

## Current Baseline

- Phase 36 is complete, backed up to GitHub, merged, branch-cleaned, and manually reviewed.
- User-reported Phase 36 manual review result: all manual review checklist items passed and no Phase 36 issues were found.
- Expected local and remote `main`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`.
- The user-edited `planning/phase-36/REVIEW-CHECKLIST.md` must be preserved.
- Phase 36 completed:
  - Active Games safe-name source repair;
  - first-class `Leaderboard` tab between `Stats` and `Words`;
  - public ranked Practice leaderboard moved from Stats to Leaderboard;
  - competitive multiplayer rating content moved from Stats to Leaderboard;
  - Stats kept focused on local/personal gameplay statistics;
  - Settings order and Account management consolidation;
  - signed-in password-update failure copy cleanup.
- Phase 37 is now scoped to gameplay entry/resume ergonomics, browser history navigation readiness, and solo invalid-guess sound consistency.

## Goals

Phase 37 should make navigation into playable game surfaces feel natural without weakening gameplay authority.

The phase should:

- automatically bring the gameplay board/keyboard into useful view when a player explicitly enters, joins, resumes, or is directly routed into a playable game, where safe and non-disruptive;
- keep browser back/forward behavior useful for route, main tab, subtab, and selected-game view state without treating browser history as gameplay authority;
- make solo OG and solo GO invalid submissions use the same invalid-guess cue players already hear in multiplayer invalid submissions;
- preserve current notification direct-routing, Lobby one-click join, Live/Active identity behavior, Profile/auth behavior, Leaderboard/Stats split, Settings cleanup, and all gameplay/rating invariants;
- route larger shell/HUD ideas to later phases instead of mixing them into this focused ergonomics pass.

## In Scope

- Audit current app route, primary navigation, local-storage navigation, and selected-game state ownership in `src/app/routes.ts`, `src/app/navigationState.ts`, `src/app/App.tsx`, and `src/app/LunarSignalStage.tsx`.
- Audit Solo and Multiplayer entry, join, resume, notification, dashboard, Live, Lobby, Active Games, and postgame routing flows.
- Define and implement, in later authorized stages, safe gameplay-area auto-scroll/focus behavior for explicit entry/resume flows.
- Define and implement, in later authorized stages, browser back/forward integration for view state only.
- Define stale, hidden, completed, deleted, unavailable, unauthorized, and no-longer-visible selected-game fallbacks.
- Repair solo OG and solo GO invalid-guess sound consistency with the existing multiplayer invalid-guess behavior.
- Audit whether upper gameplay information can be lightly condensed or collapsed, but implement it only if a later stage proves a very small, low-risk companion change is needed.
- Add focused tests in later authorized stages for route/history state, popstate handling, stale fallbacks, auto-scroll/focus triggers, accessibility safeguards, and solo invalid-guess sound dispatch.
- Run final visual handoff review and create a manual review checklist during final hardening.

## Out Of Scope

- Gameplay-rule changes, Elo algorithm changes, scoring changes, timeout/forfeit result changes, Daily claim-rule changes, word-list changes, tile-state changes, GO transition changes, solved-row hold changes, keyboard-state behavior changes, Solo Daily fixed-five changes, or Practice 2-35 word-length changes.
- Public/guest spectation, spectator presence lists/counts, spectator sorting, and public projection expansion.
- Public/social profile browsing, clickable rival profiles, public profile pages for other players, private/custom-code matchmaking expansion, direct player match requests, or request mailbox flows.
- EXP, coins, or collectible counters in the header/top shell.
- Focus Mode, side-navigation collapse, or broad shell chrome reduction.
- Public site stats or private developer dashboard.
- Beginner onboarding/help/tutorial implementation.
- Theme modernization or broad visual redesign.
- Service workers, push subscriptions, background push, production deployment, release, Vercel/Supabase configuration, or Supabase migrations unless a later addendum explicitly authorizes them.

## Detailed Success Criteria

- Solo OG invalid submissions play the invalid-guess cue and do not feel like valid submissions.
- Solo GO invalid submissions play the invalid-guess cue and do not feel like valid submissions.
- Multiplayer invalid-guess behavior remains unchanged.
- Valid solo submissions, tile-flip sounds, correct-guess sounds, win/loss sounds, notification sounds, daily reset sounds, and master sound preference behavior remain unchanged.
- Explicit Solo game entry/resume can land the player near the board/keyboard after route/subtab selection settles.
- Explicit Multiplayer game join/resume/direct-route flows can land the player near the board/keyboard after route/subtab/selected-game state settles.
- Auto-scroll/focus does not trigger on ordinary typing, local draft changes, timer ticks, passive resume capture, realtime hydration, Live refresh, background polling, or non-game route changes.
- Auto-scroll/focus respects reduced-motion where available and does not steal input focus from text fields or active gameplay controls.
- Browser back/forward can move through approved app view states without creating, joining, submitting, forfeiting, cancelling, claiming, queueing, settling, or replaying any gameplay action.
- Stale, hidden, completed, deleted, unavailable, or unauthorized selected games fall back to the safest owning route/subtab.
- Existing local-storage navigation state remains backward compatible.
- No raw auth IDs, emails, private profile data, answers, seeds, sessions, tokens, traces, screenshots, videos, or local session artifacts are exposed.

## Recommended Stage Breakdown

### Stage 37.0 - Protected Baseline

- Confirm `brrrdle-dev` repo state and expected `main`/`origin/main` hash.
- Preserve the user-edited Phase 36 manual checklist.
- Record existing Phase 37 planning/spec/progress artifacts.
- Run baseline verification before implementation.
- Do not begin audit or source work.

### Stage 37.1 - Route, Entry/Resume, History, And Sound Audit

- Audit app route, subtab, selected Solo game, selected Multiplayer game, focused Live spectator game, dashboard action, notification action, and local-storage navigation ownership.
- Audit current game-entry flows:
  - Solo overview start;
  - Solo Daily/Practice mode change;
  - Solo Active Games resume/select;
  - auto-resume after sign-in;
  - Multiplayer Active Games resume;
  - Lobby direct join;
  - Live participant resume;
  - focused Live spectator open/back;
  - notification direct resume;
  - dashboard action routing;
  - Practice postgame search/play-again/rematch routing.
- Audit current solo and multiplayer invalid-guess sound dispatch. The audit must distinguish actual invalid-guess event emission from audible masking, double-cue ordering, preference gating, and alternate input paths.
- Decide whether Stage 37.2 is source-only repair. Expected: source-only.
- Decide whether Stage 37.3 and Stage 37.4 can remain source-only. Expected: source-only.
- Decide whether upper gameplay information condensation should remain deferred. Expected: defer unless a tiny audit-proven change is clearly helpful.

### Stage 37.2 - Solo Invalid-Guess Sound Repair

- Reproduce or lock the solo invalid-guess sound inconsistency with focused tests before source repair where practical.
- Repair solo OG and solo GO invalid submissions so the audible result matches existing multiplayer invalid submissions.
- Avoid changing multiplayer sound behavior.
- Avoid changing validation rules, Hard Mode rules, word-list membership, tile evaluation, animation timing, scoring, progression, Daily claims, or completion rules.
- Add focused tests for:
  - solo OG invalid word-list submissions;
  - solo OG Hard Mode invalid submissions where applicable;
  - solo GO invalid word-list submissions;
  - solo GO Hard Mode invalid submissions where applicable;
  - no extra valid-submit cue on invalid solo submit if the audit identifies double-cue masking as the root cause;
  - valid solo submit sound behavior preservation.

### Stage 37.3 - Gameplay Entry/Resume Auto-Centering

- Introduce a small source-only gameplay surface anchor/ref or equivalent routing signal after Stage 37.1 chooses the seam.
- Trigger auto-centering only from explicit user navigation or direct-route activation into a game.
- Supported initial trigger set should include:
  - Solo start/entry from Solo overview;
  - Solo Active Games resume;
  - signed-in auto-resume when it selects a game;
  - Multiplayer Active Games resume;
  - Lobby direct join;
  - Live participant resume;
  - notification direct resume into a specific game;
  - dashboard direct resume into a specific game.
- Focused Live spectator views may be included if safe, but spectator auto-centering must remain read-only and must not imply gameplay authority.
- Prevent repeated scroll loops by treating the scroll request as a one-shot navigation intent.
- Respect reduced-motion and avoid stealing focus from active typing/editing controls.
- Add focused component/unit tests for trigger creation and suppression where practical, plus browser checks for actual visual placement.

### Stage 37.4 - Browser Back/Forward Navigation Integration

- Define a typed browser history state for app view state:
  - active route;
  - Solo subtab;
  - Multiplayer subtab;
  - selected Solo game key when safe;
  - selected Multiplayer game id when safe;
  - focused Live spectator game id when safe;
  - History filters when safe.
- Push or replace browser history only for deliberate view-state changes, not passive hydration.
- Handle `popstate` by applying view state only.
- Never store action intents such as submit guess, create lobby, join lobby, cancel lobby, forfeit, queue/cancel ranked search, Daily claim, rematch creation, settlement, spend coins, password update, profile save, sign-in, or sign-out.
- Preserve `saveNavigationState` local-storage compatibility and define precedence between browser history state and persisted local navigation.
- Fall back safely when a selected game is stale, hidden, completed, deleted, unavailable, no longer visible, no longer resumable, or unauthorized:
  - Solo stale selected game -> Solo Active Games or the owning Solo subtab without selected game.
  - Multiplayer stale resumable game -> Multiplayer Active Games without selected game.
  - Focused spectator game no longer visible -> Multiplayer Live list.
  - Hidden compatibility daily/practice routes -> existing Calendar/Solo compatibility targets.
- Add focused tests for push/replace decisions, popstate application, stale fallback, selected-game safety, and local-storage compatibility.

### Stage 37.5 - Final Hardening, E2E, Visual Review, Changelog, Manual Checklist

- Review Stages 37.1 through 37.4 for stale copy, regressions, accessibility gaps, and docs gaps.
- Run focused regression/E2E coverage for:
  - solo invalid-guess sound;
  - gameplay-area auto-centering;
  - route/subtab browser history;
  - selected-game history and stale fallbacks;
  - notification direct-resume preservation;
  - Lobby join/resume preservation;
  - Leaderboard/Stats and Profile/Settings non-regressions where practical.
- Run full final verification.
- Run visual handoff review for changed user-visible surfaces.
- Create `planning/phase-37/CHANGELOG.md`.
- Create `planning/phase-37/REVIEW-CHECKLIST.md`.
- Prepare for Git handoff only after final evidence is clean and the user authorizes the next gate.

## Live Routing And Notification Requirements

- Notification direct-resume behavior from Phase 34 must remain intact.
- In-app notification activation and foreground browser notification click routing should continue to share the same safe action path.
- If a notification targets a stale or unavailable multiplayer game, fallback remains Multiplayer -> Active Games.
- Browser history integration must not create duplicate notification side effects or mark notifications read during back/forward traversal unless the user explicitly activated the notification.

## Gameplay Auto-Centering Requirements

- Use a dedicated route/entry intent, anchor ref, or equivalent one-shot signal rather than passive state comparisons alone.
- The gameplay anchor should represent the playable board/keyboard region, not the top route title or workspace subtab bar.
- Scrolling should prefer a stable and accessible visual result over exact pixel centering.
- Reduced-motion users should receive instant or minimal-motion positioning.
- The implementation must avoid scroll jumps when:
  - letters are typed;
  - invalid guess row-shake triggers;
  - timers tick;
  - a Live/spectator list refreshes;
  - participant identity hydration arrives;
  - a multiplayer subscription refreshes the current game;
  - a resume slot is passively captured.

## Browser History Requirements

- Browser history stores view state only.
- `popstate` must never cause a gameplay mutation.
- Back/forward should be allowed to move from a game view to the prior route/subtab view, but if the selected game is no longer valid, the app must degrade to the relevant safe list.
- The browser URL may remain a single-page URL unless Stage 37.1 explicitly recommends URL search/hash support and the implementation plan approves it. History state integration is enough for Phase 37 unless a narrow URL benefit is proven.
- If browser history support is unavailable, the app should continue using existing local navigation state.
- Existing hidden route compatibility for `practice`, `og-daily`, and `go-daily` must remain intact.

## Solo Invalid-Guess Sound Requirements

- Multiplayer invalid-guess behavior is the reference behavior and should remain unchanged.
- Solo invalid submissions should not sound like valid submissions.
- The repair should address both OG and GO.
- The implementation must respect:
  - the master sound toggle;
  - Web Audio availability fallbacks;
  - suspended AudioContext resume behavior from user-triggered playback;
  - existing sound event categories unless a focused test proves a category fix is required.
- If the audit finds that solo already emits `invalid-guess` but it is masked by a preceding `keyboard-click`, the repair should adjust solo submit dispatch so invalid submit produces the intended audible cue without changing letter/delete keypress feedback.

## Upper Gameplay Information Condensation

Phase 37 may audit whether upper gameplay information can be lightly condensed. Implementation should be deferred unless the audit proves a very small, low-risk change that directly improves auto-centering and does not create broad layout churn.

Focus Mode, navigation collapse, persistent distraction-free mode, and broad page-chrome removal are explicitly deferred.

## Migration And RLS Constraints

No Supabase migration or RLS change is expected for Phase 37.

If any Stage 37 audit unexpectedly concludes that browser history, auto-centering, or solo invalid-guess sound repair requires schema, RLS, RPC, or Supabase configuration changes, stop and create a Phase 37 addendum before any SQL or configuration work.

## Vercel And Supabase Constraints

Phase 37 must not configure Vercel or Supabase and must not deploy.

The Phase 35 auth/deployment checklist remains the source for Vercel Deployment Protection and Supabase redirect configuration concerns. Phase 37 should not change those settings.

## Verification Strategy

Planning/spec passes should run lightweight documentation checks only:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Implementation stages should run focused tests first, then the authorized gate for that stage. Later implementation prompts should usually run:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check when browser/E2E work runs
- `git status --short --branch`

Final hardening should also run `npm run test:e2e` and `npm run test:full` unless a later authorized prompt explicitly narrows the final gate with a reason.

## Visual Handoff Review Expectations

Final Phase 37 visual artifacts should remain ignored/local-only under:

`test-results/visual-review/phase-37-stage-37-5/`

Suggested visual scenarios:

- Solo Practice entry/resume with the board/keyboard in useful view.
- Solo Daily resume with the board/keyboard in useful view.
- Multiplayer Active Games resume with the board/keyboard in useful view.
- Lobby join leading to the playable area.
- Live participant resume leading to the playable area.
- Notification/dashboard direct resume leading to the playable area if feasible in a safe harness.
- Browser back/forward route/subtab traversal after navigation.
- Narrow/mobile viewport for at least one Solo and one Multiplayer entry flow.

Screenshots, videos, traces, auth state, and local artifacts must remain ignored/local-only and unstaged.

## Manual Review Checklist Expectations

The Phase 37 manual checklist should ask the user to verify:

- solo invalid guesses sound like multiplayer invalid guesses;
- valid solo guesses still use the expected valid-submit/reveal sounds;
- multiplayer invalid-guess sound behavior still works;
- entering a Solo game lands near the board/keyboard;
- resuming a Solo game lands near the board/keyboard;
- joining or resuming a Multiplayer game lands near the board/keyboard;
- notification or dashboard direct resume still targets the right game and lands usefully;
- browser back/forward moves through app routes/subtabs without submitting moves or corrupting selected games;
- stale/completed/unavailable game history falls back safely;
- Leaderboard/Stats, Profile/auth, Settings, Live/Lobby/notification, and Active Games behavior from Phases 35 and 36 remain intact.

## GitHub Backup Workflow Expectations

Phase 37 Git handoff remains a later gate. After a clean Git handoff preparation pass, the next backup prompt should invoke the local `brrrdle-github-backup` skill for the all-in-one governed backup workflow unless the user explicitly asks for stepwise Git gates or forbids merge/cleanup.

## Risks

- Auto-scroll can become annoying if triggered by passive state refreshes.
- Browser history can become unsafe if it stores action intents or replays handlers with side effects.
- Browser history and local-storage navigation can fight each other if precedence is not defined.
- Selected-game ids can become stale during multiplayer polling, terminal transitions, queue finalization, auth changes, cleanup, or visibility filtering.
- Sound repair can accidentally suppress desired keypress feedback or double-play sounds if the root cause is not reproduced first.
- Mobile virtual keyboards and narrow viewports can make scroll positioning unstable.
- Focus management can reduce accessibility if it steals focus from players using keyboard or assistive technology.

## Open Decisions

- Should the gameplay anchor use scroll-only, focus-only, or scroll-then-focus with `preventScroll`?
- Should Stage 37.3 initially support all entry/resume flows or start with the highest-value Solo/Multiplayer resume flows?
- Should browser history include selected-game ids in the first implementation, or should Stage 37.4 first ship route/subtab history and then selected-game history after focused tests pass?
- Should URL search/hash state be deferred entirely, or is there a narrow benefit to exposing route/subtab state in the URL during Phase 37?
- Is the solo invalid-guess sound bug caused by missing `invalid-guess` dispatch, masked/double-cue ordering, or a different input path than the inspected components?

## Explicit Deferrals

- EXP, coins, and other collectible counters near the header/top shell are deferred to Phase 41 or a later progression/HUD phase after earnable systems have clear gameplay functions for guests and signed-in players.
- Focus Mode is deferred to Phase 41 or a later shell-polish/accessibility phase after major surfaces stabilize.
- Public/guest spectation, spectator presence, social/profile browsing, private matchmaking, public site stats/developer dashboard, onboarding/help/tutorials, theme work, service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes remain deferred to later gated phases.

## Next Gated Action

If this specification is approved, the next safe step is to create `planning/phase-37/IMPLEMENTATION-PLAN.md` and record the next progress entry. That plan should translate this spec into staged execution with a Stage 37.0 protected baseline prompt only. It should not begin implementation.
