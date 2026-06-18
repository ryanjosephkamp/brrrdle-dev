# Phase 28 Planning Brief

**Status**: Planning brief for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-17.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-28/PHASE-28-SCOPE-INTAKE-AND-ROUTING.md`, `planning/phase-28/LIVE-V1-SPECTATOR-REFRESH-DIAGNOSIS.md`, Phase 27 completion artifacts, and the current roadmap surfaces.

## 1. Purpose

Phase 28 should stabilize already-shipped Live v1 spectator and notification behavior before adding new public identity or leaderboard surfaces.

The phase is not a public-profile phase anymore. Public profiles move to Phase 29, leaderboards to Phase 30, multiplayer postgame actions to Phase 31, public/guest spectation to Phase 32, theme template modernization to Phase 33, and concrete theme implementation to Phase 34 or later.

## 2. Current-State Findings

The current Live spectator app path polls sanitized spectator rows every 30 seconds from `App.tsx` through `loadAuthenticatedLiveSpectatorRows`. Participant games still use the existing multiplayer repository subscription path, so the slower delay is specific to authenticated nonparticipant spectator rows.

The `Spectate live game` card action currently selects a card and expands inline read-only details in `MultiplayerLive.tsx`; it does not open a focused full-page or route-level spectator view.

The current spectator view model filters spectator rows to `status === 'playing'`, and the Phase 26 spectator RPC also returns only `playing` games. Terminal games disappear instead of holding a sanitized final board/outcome for spectators.

The Phase 26 authenticated spectator RPC is intentionally sanitized and authenticated-only, but its current eligibility shape does not exclude current Daily Multiplayer rows. That creates an answer-leakage risk for current Daily games and should be treated as an integrity fix, not cosmetic polish.

Notification settings and permission helpers exist, and notification sounds are dispatched from notification view-model changes. The browser notification surface currently has permission/status plumbing but no actual `Notification` dispatch path was found during this planning review, so Phase 28 should investigate and complete foreground browser notification delivery within the existing no-service-worker/no-push boundary.

Phase 27 ranked Practice v1 already defines the Elo model: 1200 initial rating, 10 provisional games, provisional K factor 40, established K factor 24, expected score using the standard 400-point Elo curve, and trusted settlement only from authenticated durable ranked Practice evidence. Phase 28 may explain this model, but must not change it.

## 3. Goals

- Improve perceived Live spectator freshness with an immediate refresh on Live entry and faster foreground-visible polling, expected around 3-5 seconds, only while the Live surface is active and visible.
- Preserve slower/background behavior outside the active Live surface so the app avoids unnecessary Supabase polling.
- Make `Spectate live game` open a clear focused read-only spectator view or equivalent route-level/full-page experience.
- Show spectators a sanitized terminal board/outcome hold, roughly 15 seconds, before the game disappears from Live.
- Exclude current Daily Multiplayer games from spectator discovery so current Daily answers cannot be leaked through Live.
- Investigate and fix foreground browser notification delivery while keeping notifications local, optional, foreground-only, and free of service workers or push infrastructure.
- Add low-risk Elo transparency in docs and in-app copy without changing the Phase 27 Elo/rank algorithm.
- Preserve Phase 27 ranked Practice queue, trusted settlement, and private projection boundaries.

## 4. In Scope

- Live v1 spectator refresh cadence, foreground visibility checks, and explicit refresh triggers.
- Live v1 spectator focused view UX and read-only route or state handling.
- Sanitized terminal spectator end-state projection and app-side hold/removal behavior.
- Authenticated spectator discovery exclusion for current Daily Multiplayer games.
- Focused notification investigation and foreground browser notification dispatch using the existing notification preference architecture.
- Notification copy cleanup where current wording overpromises behavior.
- Elo transparency copy in README/docs and the app's multiplayer/ranked explanation surfaces.
- Focused tests and E2E/smoke coverage needed for the above.
- Migration/RLS addendum planning if Live spectator RPC changes are needed.

## 5. Out of Scope

- Public player profiles or public identity surfaces.
- Public leaderboards, public APIs, public routes, or public profile-linked ranking pages.
- Public/guest spectation or any unauthenticated spectator path.
- Service workers, push notifications, background cross-device notifications, or Vercel/Supabase production configuration work.
- New gameplay rules, scoring formula changes, Elo model changes, ranked Daily, timed ranked Practice, or new ranked match types.
- Rematch, play-again, same-settings lobby/search-again, or other multiplayer postgame action flows.
- Theme template modernization or concrete theme implementation.
- Deployments, releases, PR creation, merges, or branch cleanup.

## 6. Invariants To Preserve

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Current Daily Multiplayer answer leakage through spectator views must be prevented.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged.
- Ranked Practice v1 remains the only ranked match type from Phase 27.
- Daily ranked and timed Practice ranked remain deferred.
- Match points and Elo/rank movement remain separate.
- Live v1 spectator behavior remains read-only.
- Public/guest spectation remains unavailable unless a later approved phase implements sanitized public projections.
- Existing scoring, timeout, forfeit, rating/Elo, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged.

## 7. Recommended Stage Breakdown

### Stage 28.0 - Planning Approval And Protected Baseline

- Confirm repository state and preserve existing uncommitted planning artifacts.
- Create the Stage 28.0 progress report and CSV row.
- Run the baseline verification gate before implementation begins.
- Do not modify source/runtime code.

### Stage 28.1 - Live And Notification Reproduction/Audit

- Reproduce or confirm the 30-second Live spectator polling delay.
- Confirm current `Spectate live game` action behavior and the expected focused-view UX gap.
- Confirm terminal spectator disappearance after game completion.
- Confirm current Daily Multiplayer spectator discovery exposure.
- Confirm browser/foreground notification behavior with permission granted and preferences enabled.
- Decide whether Live terminal hold and Daily exclusion can be app-only or require RPC/RLS changes.

### Stage 28.2 - Live Spectator Migration/RLS Addendum Planning

- Create a migration/RLS addendum only if Stage 28.1 confirms RPC changes are needed.
- Define authenticated-only spectator RPC changes for current Daily exclusion and sanitized terminal hold.
- Preserve no broad raw `async_multiplayer_games` SELECT for nonparticipants.
- Preserve Phase 26 Live v1 sanitization: no answers, raw sessions, seeds, private auth data, rating mutation authority, join authority, forfeit authority, timer mutation, or claim authority.
- Define privacy probes for anon denial, nonparticipant raw row denial, participant behavior preservation, current Daily exclusion, terminal hold projection, and no public/guest access.

### Stage 28.3 - Live Spectator Migration/RLS Execution

- Execute only after explicit migration authorization.
- Apply one additive migration to the confirmed `brrrdle-dev` Supabase project if the target and credentials are unambiguous.
- Verify Daily exclusion and terminal hold behavior through non-printing RLS/privacy probes.
- Stop before app implementation if migration verification fails.

If Stage 28.1 proves no migration is needed, this stage should be skipped and documented as not required.

### Stage 28.4 - Live Spectator App Implementation

- Replace the global 30-second-only spectator polling behavior with a visibility-aware strategy.
- Refresh immediately on Live subtab entry, focused spectator view entry, auth readiness, and manual visible Live transitions.
- Poll at roughly 3-5 seconds only while the user is authenticated, the Live surface is active or focused, and the document is visible.
- Keep slower/background or paused behavior elsewhere.
- Implement the focused read-only spectator view for `Spectate live game`.
- Implement sanitized terminal board/outcome hold and removal timing.
- Preserve participant resume behavior, unranked/custom flows, Live spectator read-only capabilities, and all gameplay invariants.

### Stage 28.5 - Notification Delivery Stabilization

- Complete foreground browser notification delivery if supported and permission is granted.
- Keep browser notifications local, optional, foreground-only, preference-gated, and deduped.
- Do not add service workers, push subscriptions, background delivery, or cross-device notification infrastructure.
- Align in-app/foreground copy with actual behavior.
- Preserve Phase 25/26 notification center, dashboard, settings, and sound behavior.

### Stage 28.6 - Elo Transparency Copy And Documentation

- Document the Phase 27 Elo model in player-facing terms.
- Explain initial rating, provisional period, K factors, expected score, win/loss/draw outcomes, and trusted settlement.
- Explicitly state that points decide match results and Elo changes only after trusted ranked Practice settlement.
- Avoid changing the Elo algorithm, rating buckets, settlement authority, or leaderboard/private projection behavior.

### Stage 28.7 - Final E2E, Cleanup, And Handoff

- Review Phase 28 changes for stale copy, duplicated logic, privacy gaps, responsive regressions, resource leaks, and documentation drift.
- Run focused Live spectator, notification, and Elo-copy tests first.
- Run real Supabase-backed multi-client Live spectator E2E if Live RPC/app behavior changes.
- Run browser smoke for desktop/tablet/mobile Live participant, authenticated spectator, signed-out restricted state, terminal hold, Daily exclusion, and foreground notification behavior where browser support allows.
- Run the full final gate specified by the implementation plan before Git handoff.

## 8. Success Criteria

- Authenticated spectators see Live updates promptly while actively viewing Live without forcing high-frequency polling elsewhere.
- `Spectate live game` opens a clear focused read-only view, and that view cannot submit guesses, join, forfeit, cancel, mutate timers, or alter ranked state.
- Current Daily Multiplayer games are not discoverable through spectator Live surfaces.
- Terminal spectator state shows the final sanitized board/outcome long enough for spectators to understand the result, then disappears without exposing hidden answers or raw sessions.
- Browser notifications either work as foreground notifications under granted permission and enabled preference, or the UI copy and documentation clearly explain any browser limitation found during implementation.
- Elo transparency is available to players without changing the Phase 27 Elo model.
- Public profiles, leaderboards, rematch/postgame actions, public/guest spectation, and themes remain deferred.

## 9. Likely Files And Modules

- `src/app/App.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/rating.ts` for read-only Elo constants and tests; avoid algorithm changes.
- `src/notifications/`
- `src/account/Settings.tsx`
- `src/sound/soundEngine.ts`
- `e2e/gameplay/live-v1-spectator.spec.ts`
- Relevant Live, notification, settings, ranked copy, and repository tests.
- `docs/supabase.md` if migration/RLS behavior or notification environment constraints need documentation.
- `supabase/migrations/20260615235440_phase26_live_v1_authenticated_spectator_projection.sql` as historical context only; new migration work must be separately authorized.

## 10. Migration And RLS Constraints

This planning brief does not authorize migration creation or execution.

If Phase 28 requires RPC changes, use an explicit migration/RLS addendum stage before any SQL is created. The likely migration path is an additive replacement of the authenticated spectator RPC or a companion RPC that:

- remains authenticated-only;
- excludes current Daily Multiplayer games from spectator discovery;
- can return approved terminal end-state rows for a short app-side hold if needed;
- preserves participant raw-row access only where already allowed;
- does not broaden nonparticipant raw table reads;
- does not expose answers, seeds, raw serialized sessions, private auth fields, emails, tokens, or hidden answer-bearing projection fields;
- does not implement public/guest spectation;
- does not affect ranked queue, trusted settlement, Daily claims, or unranked/custom creation flows.

## 11. Verification Strategy

Planning-only stages should run:

- `git diff --check`
- Python `csv` shape check for `progress/PROGRESS.csv`
- `git status --short --branch`

Implementation stages should run focused tests before broad gates. Expected focused areas include Live spectator repository/view-model/component tests, notification preference/browser dispatch tests, settings tests, ranked/Elo copy tests, and Live spectator E2E.

Final Phase 28 verification should include:

- focused changed-area tests;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run test:full` if the implementation plan confirms the final gate;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact checks;
- watched-port/process cleanup checks;
- browser smoke when visible Live or notification behavior changes.

## 12. Risks

- Faster polling can create unnecessary Supabase load if it is not limited to active, visible Live surfaces.
- Terminal spectator holds can accidentally reveal answer-bearing data if the RPC or DTO parser expands beyond sanitized moves and tile states.
- Current Daily exclusion must not break Daily participant resume, Daily claims, or Daily Multiplayer history.
- Notification behavior varies by browser, permission state, visibility state, and OS-level settings; tests should cover deterministic local logic and browser smoke should report environmental limits clearly.
- Elo transparency copy must be accurate enough to build trust without promising leaderboard behavior that is deferred to Phase 30.

## 13. Open Decisions

- Exact focused spectator view shape: route, workspace state, modal-like full-width panel, or dedicated subview. The preferred direction is a route/workspace-backed focused view rather than a transient inline expansion.
- Exact Live foreground polling interval within the 3-5 second range.
- Whether terminal spectator hold is purely app-side or requires RPC status expansion.
- Whether Daily exclusion should exclude every Daily row or only the current UTC-day Daily row. The default recommendation is to exclude current Daily rows at minimum; excluding all Daily spectator rows is safer if historical Daily spectator value is low.
- Whether foreground browser notifications should fire while the app tab is focused, while the document is visible but another route is open, or only when the document is hidden but the browser process is still foreground-capable. This must stay inside the no-service-worker/no-push boundary.
- Final placement for Elo transparency copy: README/docs, Settings/About, Multiplayer ranked panel, or a compact Info affordance. The default recommendation is docs plus a concise in-app ranked explanation.

## 14. Next Gated Action

Create a unified Phase 28 specification for review. The spec should turn this brief and the intake/routing notes into implementation-ready requirements, with explicit migration/RLS gates before any SQL and an implementation plan gate before source/runtime changes.

Do not begin Phase 28 implementation from this brief alone.
