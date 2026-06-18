# Phase 28 Live Spectator, Notifications, And Elo Transparency Specification

**Status**: Unified Phase 28 specification for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-17.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-28/PHASE-28-SCOPE-INTAKE-AND-ROUTING.md`, `planning/phase-28/LIVE-V1-SPECTATOR-REFRESH-DIAGNOSIS.md`, `planning/phase-28/PLANNING-BRIEF.md`, completed Phase 27 artifacts, and the current roadmap.

This file does not authorize implementation, test changes, Supabase migration creation or execution, deployment, commits, pushes, pull requests, merges, releases, branch deletion, Phase 29 work, new custom skills, force-push, secret printing, or work in the original stable `brrrdle` repository.

## 1. Purpose

Phase 28 stabilizes already-shipped Live v1 spectator and notification behavior before the project starts new public profile, leaderboard, public spectator, postgame action, or theme work.

The phase should deliver four current-product fixes and one clarity improvement:

1. Make authenticated Live v1 spectation feel materially fresher without broadening raw multiplayer data access.
2. Make `Spectate live game` open an obvious focused read-only spectator experience.
3. Prevent current Daily Multiplayer answer leakage through spectator discovery.
4. Complete or correct foreground browser notification delivery within the existing no-service-worker/no-push boundary.
5. Explain the Phase 27 Elo/rank model to players without changing the model.

## 2. Current-State Findings

The current app has two Live data paths:

- participant-owned Live rows use the multiplayer repository and Supabase realtime refresh path;
- authenticated nonparticipant spectator rows use `loadAuthenticatedLiveSpectatorRows(...)`, backed by the sanitized `get_authenticated_live_v1_spectator_games` RPC.

The spectator path currently refreshes immediately when the signed-in Supabase app state is ready, then polls every 30 seconds. This explains the observed delay for spectators.

The `Spectate live game` action currently selects a card and expands inline read-only details. It does not open a route-level or otherwise clearly focused spectator view.

The spectator view-model and repository DTO currently accept only `status === 'playing'`, and the Phase 26 spectator RPC returns only `playing` games. Completed games therefore disappear from Live instead of showing a sanitized terminal board/outcome hold.

The current authenticated spectator RPC is sanitized and authenticated-only, but the eligible game filter does not exclude current Daily Multiplayer rows. Current Daily spectation can leak active Daily answers and must be treated as a gameplay integrity issue.

Notification settings, permission helpers, notification view models, and notification sounds exist. During planning review, no actual browser `Notification` dispatch path was found, so Phase 28 should confirm whether foreground browser notification delivery is incomplete, deduped away, permission-blocked, or otherwise miswired.

Phase 27 implemented ranked Practice v1 with a transparent Elo model: 1200 initial rating, 10 provisional games, provisional K factor 40, established K factor 24, standard 400-point expected-score curve, trusted settlement, and separation between match points and Elo/rank movement. Phase 28 may explain this model but must not change it.

## 3. Goals

- Reduce authenticated spectator perceived Live delay by refreshing on Live entry and polling roughly every 3-5 seconds only while the Live spectator surface is active and visible.
- Preserve bounded request volume by slowing or pausing spectator polling outside visible active Live surfaces.
- Preserve the sanitized authenticated RPC boundary and strict app-side DTO parsing.
- Provide a focused, read-only spectator view for `Spectate live game`.
- Hold terminal spectator board/outcome state for roughly 15 seconds before removing it from Live.
- Exclude current Daily Multiplayer games from spectator discovery.
- Make foreground browser notifications work where browser support, permission, and preferences allow, or tighten copy/documentation if a platform limitation is confirmed.
- Add player-facing Elo transparency in docs and in-app copy without altering Phase 27 rating behavior.

## 4. In Scope

- Live spectator refresh cadence, visibility gating, immediate entry refresh, and in-flight request guarding.
- Focused authenticated read-only spectator view behavior.
- Sanitized terminal spectator projection and app-side terminal hold behavior.
- Current Daily Multiplayer spectator discovery exclusion.
- Notification delivery investigation and foreground browser dispatch within existing notification preferences.
- Notification copy corrections if current UI overpromises foreground/browser behavior.
- Elo transparency documentation and rendered app copy.
- Focused tests, browser smoke, and Supabase-backed verification needed for the above.
- Migration/RLS addendum planning if Live spectator RPC changes are required.

## 5. Out Of Scope

- Public player profiles and public identity.
- Public leaderboards, public ranking pages, public APIs, and public routes.
- Public/guest spectation or unauthenticated spectator access.
- Service workers, push subscriptions, background notifications, or cross-device notification infrastructure.
- New gameplay rules, scoring formula changes, Elo algorithm changes, rating bucket changes, ranked Daily, timed ranked Practice, or new ranked match types.
- Rematch, play-again, search-again, or same-settings postgame action flows.
- Theme proposal modernization or concrete theme implementation.
- Supabase migrations without an explicit later migration authorization.
- Deployment, release, PR creation, merge, branch deletion, or Git handoff operations.

## 6. Required Invariants

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Current Daily Multiplayer answer leakage through spectator views must be prevented.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged.
- Ranked Practice v1 remains the only ranked match type from Phase 27.
- Daily ranked and timed Practice ranked remain deferred.
- Match points and Elo/rank movement remain separate.
- Live v1 spectator behavior remains read-only.
- Public/guest spectation remains unavailable unless a later approved phase implements sanitized public projections.
- Existing scoring, timeout, forfeit, rating/Elo, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged.
- Unranked/custom multiplayer creation and join flows remain unchanged.
- Phase 27 trusted ranked queue, settlement, and private projection boundaries remain unchanged.

## 7. Live Spectator Refresh Requirements

Phase 28 should replace the current spectator-only 30-second polling behavior with a visibility-aware strategy.

Required behavior:

- refresh authenticated spectator rows immediately when the user enters the Multiplayer Live subtab;
- refresh immediately when the focused spectator view opens;
- refresh immediately when auth/Supabase readiness changes from unavailable to available;
- refresh immediately when a hidden document becomes visible while the Live surface is active;
- poll at roughly 3-5 seconds while all of these are true:
  - the user is authenticated;
  - the app has a Supabase client;
  - the Live subtab or focused spectator view is active;
  - `document.visibilityState` is `visible`;
- keep slower polling, such as the existing 30-second cadence, or pause polling when Live is not active;
- pause or slow polling when the document is hidden;
- preserve the existing in-flight guard so overlapping RPC calls cannot accumulate;
- clear spectator rows when auth/Supabase state is unavailable;
- leave participant-owned Live rows on the existing repository realtime path;
- avoid raw Supabase realtime subscriptions for nonparticipant spectator data in Phase 28.

The conservative default interval should be 5 seconds for active visible Live. A 3-second interval is acceptable only if focused verification shows request volume remains bounded and the implementation still throttles hidden or inactive surfaces.

## 8. Focused Read-Only Spectator View Requirements

`Spectate live game` should have an obvious result for authenticated spectators.

Preferred UX direction:

- open a route-backed or workspace-state-backed focused spectator view rather than only toggling inline details;
- use a clear heading, game metadata, participant display labels already approved by the sanitized projection, current board/turn status, and a visible way back to the Live list;
- keep the view read-only and unable to submit guesses, join, forfeit, cancel, mutate timers, mutate Daily claims, mutate ratings, or settle matches;
- handle stale or disappeared rows with a clear non-error empty state;
- keep signed-out users restricted to the existing authenticated-only message;
- do not create public, guest, or shareable spectator URLs in Phase 28.

The focused view may reuse the existing Live card/detail components if the result is visually and navigationally clear. It should not become a new gameplay surface.

## 9. Terminal Spectator Hold Requirements

Authenticated spectators should be able to see the end of a watched game before it disappears.

Required behavior:

- hold terminal spectator rows for roughly 15 seconds after completion;
- show only sanitized final board state and outcome summary;
- make the terminal state visually distinct from an active game;
- avoid answer-bearing raw fields, seeds, raw `projection`, `serializedSession`, `playerSessions`, auth emails, private profile data, tokens, settlement ids, or mutable controls;
- support OG and GO only where sanitized projection data can represent the terminal board safely;
- remove terminal rows after the hold window so Live remains focused on active games;
- avoid affecting participants' result screens, solved-row holds, GO transitions, or scoring.

If the current RPC cannot safely return terminal rows, Phase 28 must use a migration/RLS addendum gate before SQL is created. App-only terminal holds are acceptable only if they can preserve the last sanitized `playing` row and derive the hold without exposing hidden state.

## 10. Current Daily Spectation Integrity Requirements

Current Daily Multiplayer games must not be discoverable through spectator Live surfaces.

Default requirement:

- exclude current UTC-day Daily Multiplayer rows from authenticated spectator discovery at the server/RPC boundary;
- include app-side filtering and tests as a defense-in-depth layer;
- keep Daily participant resume, Daily claims, Daily history, and participant-owned game access intact;
- preserve Daily Multiplayer's asynchronous, no-clock, no-Hard-Mode-lobby-control, answer-separated, claim-safe behavior.

If implementation finds that excluding every Daily spectator row is simpler and safer than excluding only current Daily rows, that is acceptable if it does not break participant-owned Daily behavior. Historical Daily spectation should not be added unless a later spec explicitly analyzes answer-leakage risk and user value.

## 11. Notification Delivery Requirements

Phase 28 should turn the existing foreground browser notification preference into a working, accurately described feature where browser support permits.

Required behavior:

- keep Notification Center and dashboard notification behavior intact;
- keep sounds governed by the existing sound preference architecture;
- dispatch foreground browser notifications only when:
  - the environment supports the Notification API;
  - permission is `granted`;
  - foreground browser notifications are enabled in preferences;
  - the notification kind is eligible;
  - the event has not already been dispatched for the same fingerprint;
  - hydration or initial-load suppression rules allow it;
- avoid dispatching when permission is denied/default, the preference is off, the event is ineligible, or the notification is a duplicate;
- do not add service workers, push subscriptions, background delivery, or cross-device infrastructure;
- ensure visible copy says foreground/local/browser-limited rather than implying background push behavior.

Open behavior decision for implementation: whether foreground browser notifications should fire while the app tab is focused, only when the document is visible but another route is active, or only when the document is hidden but the browser process can still display local notifications. The implementation plan should choose one behavior and test it explicitly.

## 12. Elo Transparency Requirements

Phase 28 should explain the existing Elo model in player-facing language.

Required content:

- starting ranked rating is 1200;
- the first 10 ranked Practice games are provisional;
- provisional games use K factor 40;
- established games use K factor 24;
- expected score follows the standard Elo curve, where defeating a higher-rated opponent is worth more than defeating a lower-rated opponent;
- win/draw/loss outcomes map to standard Elo scores of 1, 0.5, and 0;
- match points decide a game result, while Elo/rank moves after trusted ranked Practice settlement;
- only eligible ranked Practice v1 games affect Elo;
- Daily ranked and timed Practice ranked remain deferred;
- Elo transparency does not promise public leaderboards, public profiles, or public ranking pages in Phase 28.

Recommended surfaces:

- concise in-app Multiplayer ranked explanation or Info affordance;
- README or docs update if the project has a player-facing explanation surface;
- tests for rendered copy or view-model output where applicable.

Do not change `src/multiplayer/rating.ts` constants, formulas, settlement eligibility, bucket rules, or trusted settlement authority as part of Elo transparency work.

## 13. Migration And RLS Constraints

This specification does not authorize migration creation or execution.

If Phase 28 needs SQL changes for Daily exclusion, terminal spectator rows, or any spectator RPC contract change, use a separate migration/RLS addendum stage before writing SQL.

Any Live spectator migration/RLS addendum must require:

- authenticated-only execution;
- explicit `search_path`;
- least-privilege grants;
- no broad raw `async_multiplayer_games` SELECT for nonparticipants;
- no public/guest spectator access;
- no answer, seed, raw projection, raw session, auth email, private profile, token, claim mutation, settlement mutation, rating mutation, join, cancel, forfeit, or timer mutation authority;
- current Daily spectation exclusion;
- terminal rows only if sanitized and bounded;
- participant-owned behavior preservation;
- non-printing privacy probes for anon denial, nonparticipant raw row denial, current Daily exclusion, terminal projection safety, participant resume preservation, signed-out restricted UI, and no public exposure.

If no SQL is needed, the implementation should document why app-only changes satisfy the privacy and integrity requirements.

## 14. Likely Files And Modules

Likely implementation surfaces:

- `src/app/App.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/rating.ts` as read-only Elo source of truth
- `src/notifications/`
- `src/account/Settings.tsx`
- `src/sound/soundEngine.ts`
- `e2e/gameplay/live-v1-spectator.spec.ts`
- relevant Live, notification, settings, ranked copy, and repository tests
- `docs/supabase.md` if migration/RLS or notification environment behavior changes
- a new Phase 28 changelog if the implementation plan requires one

Historical context only:

- `supabase/migrations/20260615235440_phase26_live_v1_authenticated_spectator_projection.sql`
- Phase 27 ranked queue and settlement migrations

Do not edit historical applied migrations except by adding a new separately authorized additive migration.

## 15. Recommended Stage Breakdown

### Stage 28.0 - Implementation Plan Approval And Protected Baseline

- Read governance, this spec, the Phase 28 planning brief, progress, package/test surfaces, and relevant source/tests.
- Confirm repository state and preserve uncommitted planning artifacts.
- Create Stage 28.0 progress records.
- Run baseline verification and resource/process checks.
- Do not edit source/runtime code.

### Stage 28.1 - Live And Notification Reproduction/Audit

- Reproduce or confirm the 30-second spectator delay.
- Confirm `Spectate live game` focused-view gap.
- Confirm terminal spectator disappearance.
- Confirm current Daily spectator discovery exposure.
- Confirm browser notification behavior under granted permission and enabled preferences.
- Decide whether Live terminal hold and Daily exclusion require SQL changes.
- Do not implement source changes beyond focused reproduction tooling if separately authorized.

### Stage 28.2 - Live Spectator Migration/RLS Addendum Planning

- Create an addendum only if Stage 28.1 confirms RPC/RLS changes are needed.
- Define exact RPC/table/policy/grant changes, sanitized return contract, rollback plan, and privacy probes.
- Preserve Phase 26 Live v1 authentication and sanitization boundaries.
- Do not create or run migrations.

### Stage 28.3 - Live Spectator Migration/RLS Execution

- Execute only after explicit migration authorization.
- Apply one additive migration only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous.
- Verify Daily exclusion, terminal projection safety, anon denial, nonparticipant privacy, and participant behavior with non-printing probes.
- Stop before app implementation if migration verification fails.

If Stage 28.1 proves no migration is needed, Stage 28.2 and Stage 28.3 should be skipped and documented as not required.

### Stage 28.4 - Live Spectator App Implementation

- Implement visibility-aware spectator refresh.
- Implement focused read-only spectator view.
- Implement terminal spectator hold/removal behavior.
- Preserve signed-out restricted state and participant resume behavior.
- Add focused repository, view-model, component, and E2E coverage.

### Stage 28.5 - Notification Delivery Stabilization

- Implement or fix foreground browser notification dispatch within existing preferences.
- Keep no-service-worker and no-push boundaries.
- Preserve notification center, dashboard, and sound behavior.
- Add deterministic unit/component tests and browser smoke if visible behavior changes.

### Stage 28.6 - Elo Transparency Copy And Documentation

- Add concise Elo transparency to in-app ranked surfaces and docs.
- Preserve all Phase 27 Elo constants and settlement behavior.
- Add tests only where rendered copy or view-model output changes.

### Stage 28.7 - Final E2E, Cleanup, And Handoff

- Review Stage 28.1 through 28.6 for stale copy, duplicated logic, privacy gaps, RLS drift, responsive regressions, resource leaks, and documentation drift.
- Run focused Live, notification, Elo-copy, and any migration-probe tests first.
- Run full final verification before Git handoff.
- Use one local dev server only if browser smoke is warranted, and stop it afterward.

## 16. Detailed Success Criteria

Phase 28 is successful when:

- authenticated spectators see visible Live updates on the faster active-visible cadence;
- inactive/hidden app states do not generate high-frequency spectator polling;
- participant-owned Live updates remain on the existing repository realtime path;
- `Spectate live game` opens a focused read-only spectator experience;
- spectator views cannot mutate gameplay, queue, claim, timer, settlement, rating, or participant state;
- current Daily Multiplayer games are not discoverable by spectators;
- terminal spectator board/outcome state is shown briefly and safely, then removed;
- foreground browser notifications dispatch correctly under approved conditions or copy accurately explains any browser/platform limits;
- notification sounds, Notification Center, dashboard attention, and settings behavior are preserved;
- Elo transparency explains the existing model accurately without changing the model;
- public profiles, public leaderboards, public/guest spectation, postgame rematch/play-again flows, and theme work remain deferred.

## 17. Verification Strategy

Planning-only stages:

- `git diff --check`
- Python `csv` shape check for `progress/PROGRESS.csv`
- `git status --short --branch`

Focused implementation verification should include:

- Live spectator refresh cadence helper tests;
- Live repository/DTO parser tests for sanitized rows and forbidden fields;
- Live view-model tests for current Daily exclusion, terminal hold rows, active rows, and selected/focused view state;
- Live component/workspace tests for focused spectator view, read-only constraints, signed-out restricted state, stale-row empty state, and terminal outcome hold;
- notification permission/preference/dedupe/browser-dispatch tests;
- Settings tests for accurate foreground notification copy;
- Elo copy/view-model tests for the rendered explanation;
- focused Live v1 spectator E2E with authenticated participant and authenticated nonparticipant spectator;
- real Supabase-backed RLS/privacy probes if migration behavior changes.

Final Phase 28 gate should run, unless the implementation plan narrows it for a documented reason:

- focused changed-area tests;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run test:full`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact checks;
- watched-port/process cleanup checks;
- browser smoke for desktop/tablet/mobile Live participant, authenticated spectator, signed-out restricted state, terminal hold, Daily exclusion, and foreground notifications where browser/OS support allows.

## 18. Risks And Mitigations

- **Supabase load from faster polling**: restrict 3-5 second polling to active visible Live surfaces and keep the in-flight guard.
- **Privacy leakage from terminal rows**: require sanitized DTOs, no raw projection/session fields, and RLS probes before app use.
- **Daily answer leakage**: prefer server/RPC exclusion, add app-side defense, and test both current Daily and non-Daily rows.
- **Focused spectator view accidentally mutates state**: reuse read-only components and assert no mutation controls render.
- **Notification platform variability**: separate deterministic logic tests from browser smoke and report OS/browser limitations honestly.
- **Elo explanation drift**: use Phase 27 constants and tests as source of truth, and avoid restating formulas in multiple inconsistent places.
- **Scope creep into public surfaces**: keep profiles, leaderboards, public/guest spectation, and postgame actions in later phases.

## 19. Open Decisions

- Exact active-visible polling interval: 5 seconds by default, or 3 seconds if verification supports it.
- Focused spectator view shape: route-backed view, workspace subview, or full-width selected-game panel.
- Terminal hold implementation: preserve last sanitized app row, expand RPC return contract, or add a companion RPC.
- Daily exclusion breadth: current UTC-day Daily rows only, or all Daily spectator rows.
- Browser notification firing context: focused tab, visible document on non-current route, hidden tab with foreground-capable browser, or a narrower combination.
- Elo transparency placement: README/docs, Multiplayer ranked panel, Settings/About, or a compact Info affordance.

## 20. Next Gated Action

Create a detailed Phase 28 implementation plan that turns this spec into a stage-by-stage execution route.

The implementation plan should:

- decide whether Stage 28.1 must precede any migration addendum;
- define exact Stage 28.0 baseline verification;
- state the preferred focused spectator view shape;
- decide the foreground polling interval default;
- define the migration/RLS stop condition for Daily exclusion and terminal hold;
- decide the browser-notification firing context;
- identify focused tests and final gates per stage;
- generate the next prompt package for Stage 28.0 baseline only.

Do not begin Phase 28 implementation from this specification alone.
