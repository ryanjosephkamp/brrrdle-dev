# Phase 24 Navigation And Workspaces Spec

**Status**: Draft for user review - planning/specification only
**Date**: 2026-06-12
**Target repository**: `https://github.com/ryanjosephkamp/brrrdle-dev`
**Source repository**: `https://github.com/ryanjosephkamp/brrrdle`
**Phase**: Phase 24 - Navigation, Solo workspace, Multiplayer workspace, Lobby, Live v0, and History v1

---

## 1. Status And Authority

This document is the unified Phase 24 planning and specification document for `brrrdle-dev`.

It reconciles the original roadmap in `planning/ROADMAP.md` with the staged execution strategy in `planning/ROADMAP-OPTIMIZED.md`. It should be treated as the proposed source of truth for Phase 24 scope after user review and approval.

This document does not authorize implementation by itself. Phase 24 code changes, schema changes, Supabase work, Vercel work, pull requests, merges, releases, or deployment work require separate explicit user approval.

Authority order for Phase 24 remains:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. Approved Phase 24 spec documents.
5. `planning/IMPLEMENTATION-PLAN.md` and `planning/phase-24/IMPLEMENTATION-PLAN.md`.
6. Supporting planning, testing, progress, agent, and memory documents.

If any lower-authority document conflicts with this spec after it is approved, prefer the safer interpretation and stop for user review when the conflict affects scope, persistence, multiplayer rules, privacy, deployment, or test gates.

---

## 2. Goals

Phase 24 should make the current stable brrrdle experience easier to navigate, easier to resume, and easier to extend without weakening the Phase 23 gameplay foundation.

The intended product outcome is:

- Players can clearly choose between Solo and Multiplayer play.
- Practice is no longer a top-level tab, but all Practice functionality remains available in the correct Solo or Multiplayer workspace.
- Daily play remains prominent through the Daily/Calendar area and through dedicated Solo and Multiplayer daily subtabs.
- Active games are easy to find and resume.
- Recent results are visible near the relevant workspaces and link into a global History route.
- Multiplayer lobby discovery is clearer and safer.
- Live multiplayer visibility starts with a narrow v0 that does not overreach into a full social/realtime platform.
- Existing Solo OG, Solo GO, Multiplayer OG, Multiplayer GO, Daily, Practice, Hard Mode, timeout, forfeit, scoring, rating, GO transition, keyboard, and resume behavior remains stable.

Phase 24 is primarily an information architecture and workspace migration phase. It should not become a gameplay-rules rewrite or a broad backend redesign.

---

## 3. Final Scope

### 3.1 In Scope

Phase 24 includes:

- A revised top-level navigation model with visible Solo, Multiplayer, Daily/Calendar, and History areas.
- Removal of Practice as a primary navigation tab after Solo and Multiplayer replacements are in place.
- Compatibility handling for existing Practice, Daily OG, and Daily GO access paths.
- A Solo workspace with subtabs for overview, Daily Solo, Practice Solo, active solo games, and links to History.
- A Multiplayer workspace with subtabs for overview, Daily Multiplayer, Practice Multiplayer, active multiplayer games, Lobby, and Live v0.
- A global History v1 route covering Solo and Multiplayer results.
- Active-game and recent-result summaries in Solo and Multiplayer overview subtabs.
- State persistence for selected route, selected subtab, selected active game, and lightweight History filters.
- Focused component extraction and selector/view-model work to reduce future `App.tsx` pressure.
- Focused tests and browser verification for navigation, workspace rendering, state persistence, and changed multiplayer flows.
- Documentation/progress updates required by governance when implementation is later authorized.

### 3.2 Explicitly Out Of Scope

Phase 24 does not include:

- New gameplay modes or variants.
- Changes to answer selection rules, word lists, scoring formulas, rating/ELO rules, timeout rules, forfeit precedence, Hard Mode rules, or GO transition rules.
- Variable-length Daily games. Daily Solo and Daily Multiplayer remain five-letter unless a later approved spec changes that.
- A full public Live gallery with broad spectator presence, rich filtering/sorting, public social discovery, or live chat.
- A notification system.
- A full replay engine or rich move-by-move History review system.
- Theme/skin marketplace work.
- Economy, consumables, rewards store, leaderboards, bots, friend graph, public profiles, or broader social systems.
- Supabase schema changes unless a narrow need is identified, separately justified, and explicitly approved.
- Supabase project configuration, Vercel configuration, production deployment, PR creation, merge, release, or push work without separate authorization.

### 3.3 Deferred Scope

Recommended deferrals:

- **Phase 25**: Notifications, dashboard refinement, turn reminders, richer active-game widgets, and polish based on Phase 24 usage.
- **Phase 26**: Theme system, skins, and broader visual polish.
- **Phase 27+**: Full Live gallery, broader spectator platform, richer replay/review History, social/community systems, marketplace/economy work, and additional game modes.

---

## 4. Success Criteria

Phase 24 is successful only if all of the following are true.

### 4.1 Non-Negotiable Test Gate

- The existing full gameplay testing suite continues to pass after all Phase 24 changes.
- The final Phase 24 gate includes:
  - `npm run lint`
  - `npm run test`
  - `npm run test:e2e`
  - `npm run test:full`
  - `npm run build`
  - `npx tsc -p tsconfig.api.json --noEmit`
  - `git diff --check`

### 4.2 Gameplay Stability

- Solo OG and Solo GO remain playable in Daily and Practice contexts.
- Multiplayer OG and Multiplayer GO remain playable in Daily and Practice contexts.
- Solo Daily stays fixed at five letters.
- Solo Practice continues to support 2-35 letter word lengths where currently supported.
- Daily rotation, countdowns, unlocked-day behavior, and calendar launches remain reliable.
- Hard Mode behavior remains unchanged for Solo Practice and Practice Multiplayer.
- Daily Multiplayer remains:
  - strictly asynchronous
  - five-letter
  - UTC-day keyed
  - no-clock
  - without Daily Hard Mode lobby controls
  - answer-separated
  - claim-safe
- Practice Multiplayer time-limit behavior remains unchanged.
- Existing scoring, rating/ELO, timeout, forfeit, GO transition, keyboard-state, solved-row hold, and result-propagation rules remain unchanged.

### 4.3 Navigation And Workspace Outcome

- Solo and Multiplayer are visible first-class navigation destinations.
- Practice is removed from the primary navigation only after replacement entry points exist.
- Existing hidden/deep-link routes either continue to work or redirect predictably.
- Daily/Calendar remains available as a Daily hub and calendar/routing surface.
- History exists as a global main route for Solo and Multiplayer results.
- Users can move between subtabs without losing game state or relevant typed drafts that are already preserved by existing gameplay flows.

### 4.4 Active Games And Recent Results

- Solo overview shows active solo games and recent solo results.
- Multiplayer overview shows active multiplayer games, open/available lobby snapshots where appropriate, and recent multiplayer results.
- Active-game galleries show enough board/status information to identify and resume the right game.
- Recent result links route to History or a focused History detail/review surface where available.

### 4.5 Lobby And Live v0

- Lobby provides a clear joinable list/table for open Practice Multiplayer lobbies and appropriate Daily Multiplayer claim/join surfaces.
- Lobby actions preserve existing create/join/cancel/claim guards.
- Live v0 is intentionally narrow and does not introduce a broad public spectator platform unless later approved.
- Participant click behavior from Live v0 resumes the participant's game.
- Any spectator/read-only access included in Phase 24 must use already-safe visibility rules and must not expose private data beyond existing authorized surfaces.

### 4.6 Persistence And Compatibility

- Existing guest/cloud progress loads safely.
- Existing `GuestProgressState` and multiplayer persistence remain backward compatible.
- Navigation/subtab persistence is versioned or otherwise resilient to old saved values.
- Route state stays separate from gameplay state.
- No schema migration is introduced unless separately justified and approved.

### 4.7 Accessibility, Responsiveness, Security, And Privacy

- New tabs, subtabs, filters, and tables are keyboard-operable.
- Active navigation state is exposed to assistive technology using appropriate button/tab semantics.
- Layouts remain usable at desktop, tablet, and mobile widths.
- Lobby and Live surfaces respect current auth, RLS, participant, and visibility boundaries.
- No secrets, tokens, `.env.local`, local session artifacts, Supabase keys, or Vercel tokens are committed or printed.

### 4.8 Documentation And Governance

- Approved implementation stages update the relevant Phase 24 plan/progress records before or during execution as required by governance.
- Any scope changes, deferrals, and open decisions discovered during implementation are reflected in this spec or a follow-up approved spec amendment.
- The original stable `brrrdle` repository remains untouched unless explicitly authorized.

---

## 5. Stage Breakdown

Phase 24 should be executed as staged work. Each stage should be reviewable and should avoid changing gameplay rules unless a regression requires a focused approved fix.

### 5.1 Stage 24.0 - Definition And Baseline

**Purpose**: Establish the approved Phase 24 scope, current baseline, and verification plan before implementation begins.

**Deliverables**:

- User-approved Phase 24 spec.
- Updated Phase 24 implementation plan with the selected stage sequence.
- Baseline git state, current branch, remotes, and clean/dirty worktree assessment.
- Baseline test status when execution is authorized.
- Identification of high-conflict files and sequencing plan.

**Likely files/modules**:

- `planning/specs/phase-24/`
- `planning/phase-24/IMPLEMENTATION-PLAN.md`
- `planning/testing/TESTING-SUITE.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

**Verification expectations**:

- Read-only baseline inspection.
- Lightweight planning/document lint checks.
- No runtime code changes in this stage unless separately authorized.

**Exit gate**:

- User approves the spec and authorizes implementation.
- The coordinator records the exact execution scope and first implementation stage.

### 5.2 Stage 24.1 - Navigation Shell And Route Model

**Purpose**: Add the route/subtab foundation before moving major gameplay surfaces.

**Deliverables**:

- New route model for Solo, Multiplayer, History, and Daily/Calendar.
- Subtab model for Solo and Multiplayer workspaces.
- Navigation persistence extension for active route and workspace subtab.
- Compatibility handling for current `practice`, `og-daily`, and `go-daily` routes.
- Primary navigation updated so Practice is no longer a first-class tab after replacement routes exist.
- Initial empty/shell workspace components that do not change gameplay rules.

**Likely files/modules**:

- `src/app/routes.ts`
- `src/app/App.tsx`
- `src/ui/Navigation.tsx`
- New route/workspace helper modules under `src/app/`, `src/solo/`, or `src/ui/`
- Focused route/navigation tests

**Verification expectations**:

- Unit/component tests for route definitions and persistence fallback.
- Browser smoke for primary navigation and hidden route compatibility.
- No gameplay reducer/repository behavior changes.

**Exit gate**:

- Users can navigate among Solo, Multiplayer, Daily/Calendar, History, and existing support routes.
- Legacy route handling is documented and tested.
- Existing Daily and Practice gameplay still launches from old and new-compatible entry points.

### 5.3 Stage 24.2 - Solo Workspace

**Purpose**: Move Solo Daily and Solo Practice entry points into a coherent Solo workspace while preserving current solo gameplay behavior.

**Deliverables**:

- Solo overview subtab.
- Daily Solo subtab with Daily OG and Daily GO access.
- Practice Solo subtab with Practice OG and Practice GO access.
- Active Solo Games gallery/surface for resumable solo games.
- Recent solo results summary with links to History.
- Selector/view-model helpers for solo active games and recent solo results.

**Likely files/modules**:

- New Solo workspace components under `src/solo/` or `src/app/workspaces/`
- `src/app/App.tsx` integration points
- `src/account/storageSchema.ts` read-only shape usage, with no schema version bump unless required
- Existing solo game wrappers such as `src/app/games/OgGame.tsx` and `src/app/games/GoGame.tsx`
- Focused solo navigation and resume tests

**Verification expectations**:

- Focused unit tests for Solo selectors/view models.
- Browser smoke for Daily Solo OG/GO, Practice Solo OG/GO, active-game resume, and recent-result links.
- `npm run test:e2e:solo` or equivalent focused E2E if changed-area coverage exists.

**Exit gate**:

- Solo players can start/resume Daily and Practice OG/GO from the Solo workspace.
- Existing solo saved progress and Practice seeds load correctly.
- Solo Daily remains fixed-five and Practice length behavior remains 2-35 where currently supported.

### 5.4 Stage 24.3 - Multiplayer Workspace And Lobby

**Purpose**: Move Multiplayer Daily and Practice surfaces into a coherent Multiplayer workspace and add a safer lobby-focused discovery surface.

**Deliverables**:

- Multiplayer overview subtab.
- Daily Multiplayer subtab for Daily OG and Daily GO.
- Practice Multiplayer subtab with existing Hard Mode and time-limit options.
- Active Multiplayer Games gallery/surface.
- Lobby subtab listing joinable/open multiplayer games or claimable daily opportunities.
- Recent multiplayer results summary with links to History.
- Selector/view-model helpers for multiplayer active games, open lobbies, and recent results.

**Likely files/modules**:

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayerRepository.ts`
- New Multiplayer workspace, lobby, active-game, and view-model modules
- `src/app/App.tsx` integration points
- Focused multiplayer workspace/lobby tests

**Verification expectations**:

- Focused tests for lobby filtering and active-game selection.
- Browser smoke for Practice Multiplayer OG/GO create/join/cancel/resume where feasible.
- Browser smoke for Daily Multiplayer OG/GO claim/resume behavior where feasible.
- Real two-client Supabase-backed Playwright E2E with remote cleanup for any changed multiplayer create/join/submit/forfeit/timeout behavior when credentials are available.

**Exit gate**:

- Multiplayer players can start, join, resume, and inspect active games from the Multiplayer workspace.
- Daily Multiplayer invariants are preserved.
- Practice Multiplayer Hard Mode and time-limit behavior are preserved.
- Existing status text, scoring, timeout, forfeit, GO transition, and keyboard-state regressions remain covered.

### 5.5 Stage 24.4 - History v1

**Purpose**: Add a minimum useful global History route without building a full replay platform.

**Deliverables**:

- Global History route.
- Filters for Solo/Multiplayer, Daily/Practice, OG/GO, result/status, and date where practical.
- Result list or table showing mode, scope, date, attempts/result, word length, status, and relevant opponent/context for multiplayer where available.
- Links from Solo and Multiplayer recent-result summaries into History.
- Optional focused result detail only if it can reuse existing data without new schema work.

**Likely files/modules**:

- New History components under `src/history/` or `src/app/workspaces/`
- `src/account/storageSchema.ts` read-only shape usage
- Multiplayer result projection helpers if already available
- `src/app/routes.ts`
- `src/app/App.tsx`
- History selector/view-model tests

**Verification expectations**:

- Unit tests for History filtering and sort order.
- Browser smoke for History route, filters, empty states, and result links.
- No schema migration unless separately approved.

**Exit gate**:

- A player can review recent/completed Solo and Multiplayer results in one global History surface.
- Recent-result links from Solo and Multiplayer land predictably in History.
- Rich replay/review remains deferred unless already supported by existing data and safe to expose.

### 5.6 Stage 24.5 - Live v0

**Purpose**: Introduce a narrow Live multiplayer surface that improves visibility without prematurely building the full Live gallery/spectator platform.

**Deliverables**:

- Live subtab inside Multiplayer.
- Live v0 list or compact gallery of eligible active multiplayer games using existing safe data.
- Participant click behavior resumes that participant's game.
- If safe without schema or RLS changes, non-participant click behavior may open an existing read-only spectator view. Otherwise, it should show a disabled/limited read-only state and document the deferral.
- Completed games may remain briefly visible only if existing state supports it safely and predictably.

**Likely files/modules**:

- New Live v0 component/view-model modules
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/multiplayerRepository.ts`
- Supabase/RLS documentation review if any visibility behavior changes are proposed

**Verification expectations**:

- Unit tests for Live v0 eligibility filtering and participant/non-participant click behavior.
- Browser smoke for participant resume from Live v0.
- Real two-client Supabase-backed Playwright E2E for any changed realtime visibility, spectator, or participant-resume behavior when credentials are available.
- RLS/privacy review before exposing any non-participant data.

**Exit gate**:

- Live v0 improves participant game visibility without exposing private data or introducing a broad public spectator model.
- Full public Live gallery, spectator presence, rich sorting/filtering, and broader realtime/social behavior remain clearly deferred.

### 5.7 Stage 24.6 - Cleanup And Final Hardening

**Purpose**: Finish the migration, remove obsolete top-level affordances, and verify the full product surface.

**Deliverables**:

- Practice removed from primary navigation after all replacement entry points are validated.
- Compatibility redirects and hidden routes documented.
- Dead shell components or duplicate entry points removed only when safe.
- Planning/progress/changelog updates required by governance.
- Final verification evidence.

**Likely files/modules**:

- `src/app/routes.ts`
- `src/app/App.tsx`
- `src/ui/Navigation.tsx`
- New Solo/Multiplayer/History modules
- `planning/phase-24/IMPLEMENTATION-PLAN.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`
- `CHANGELOG.md` if user-facing changes warrant it

**Verification expectations**:

- Full final gate listed in Section 4.1.
- Responsive browser smoke for desktop, tablet, and mobile widths.
- Real two-client Supabase-backed E2E plus cleanup for any changed multiplayer behavior when credentials are available.
- Secrets/artifact scan before commit or handoff if a commit is later authorized.

**Exit gate**:

- Phase 24 navigation and workspace migration is complete.
- All final gates pass or any failure is documented with exact error output and remediation status.
- No out-of-scope deployment, migration, PR, merge, release, or original repository work occurred.

---

## 6. Navigation Structure

### 6.1 Intended Main Navigation

Recommended visible main navigation after Phase 24:

- **Home**: Lightweight dashboard/landing area. It may surface active games across Solo and Multiplayer, but it should not become a duplicate of every workspace.
- **Solo**: First-class solo play workspace.
- **Multiplayer**: First-class multiplayer play workspace.
- **Daily**: Daily calendar/routing hub. The existing route id may remain `calendar` for compatibility, but the user-facing label should align with the product decision made before implementation.
- **History**: Global history for Solo and Multiplayer results.
- **Word Explorer**: Existing support route.
- **Settings**: Existing support route.
- **Feedback**: Existing support route.
- **About**: Existing support route.
- **Admin**: Conditional route for authorized admin users only.

Hidden/contextual routes should remain available where needed:

- Daily OG and Daily GO direct routes may remain as hidden compatibility routes or redirect through Daily/Solo.
- Practice direct route should remain as a compatibility route during migration and should redirect to the appropriate Solo or Multiplayer subtab after replacement surfaces are stable.
- Definitions and result detail routes should stay contextual.

### 6.2 Daily/Calendar Relationship

The current app has a `calendar` route and hidden `og-daily`/`go-daily` routes. Phase 24 should preserve the calendar's role as the Daily hub while making Daily play easier to reach from Solo and Multiplayer.

Recommended behavior:

- Daily/Calendar remains the place to browse days, unlocks, and daily routing.
- Solo Daily and Multiplayer Daily subtabs provide direct mode-focused entry points.
- Calendar launches should route into the relevant game surface without changing Daily answer or claim rules.
- Direct `og-daily` and `go-daily` route attempts should continue to resolve predictably, preferably through the Daily hub or Solo Daily subtab.

### 6.3 Practice Compatibility

Practice should be removed from primary navigation only after:

- Practice Solo OG/GO exists under Solo.
- Practice Multiplayer OG/GO exists under Multiplayer.
- Existing saved Practice games and seeds resume correctly.
- Legacy `practice` route behavior redirects or maps predictably to the last relevant Practice subtab.

---

## 7. Solo Workspace

### 7.1 Required Subtabs

The Solo workspace should include:

- **Overview**: Primary solo landing surface.
- **Daily Solo**: Daily Solo OG and Daily Solo GO entry points.
- **Practice Solo**: Practice Solo OG and Practice Solo GO entry points.
- **Active Solo Games**: Gallery/list of active solo games.

Solo History should not be a separate Solo subtab in Phase 24. Solo recent results should link into the global History route.

### 7.2 Overview

The Solo overview should show:

- Primary actions to start or resume Daily Solo OG/GO.
- Primary actions to start or resume Practice Solo OG/GO.
- Active solo games with enough metadata to identify mode, scope, date/seed, word length, and status.
- The most recent solo results, initially limited to a practical range such as the latest 3-5 results.
- Links to the global History route with filters applied where possible.

### 7.3 Daily Solo

Daily Solo must preserve:

- Daily OG and Daily GO behavior.
- Fixed five-letter daily play.
- UTC/day rotation and existing Daily calendar/unlock behavior.
- Existing Daily completion, history, countdown, and result flows.

The Daily Solo subtab should avoid duplicating calendar logic. It should provide focused gameplay entry and resume affordances while the Daily/Calendar route remains the broader date hub.

### 7.4 Practice Solo

Practice Solo must preserve:

- Practice OG and Practice GO behavior.
- Practice word-length support from 2-35 letters where currently supported.
- Existing Practice seed/resume behavior.
- Practice Hard Mode behavior where currently supported.
- Existing post-game and replay behavior.

Practice Solo should feel structurally consistent with Daily Solo but may retain Practice-specific controls such as word length and customization.

### 7.5 Active Solo Games

Active Solo Games should:

- Use existing local/cloud progress data first.
- Avoid duplicating core game state or reimplementing game rules.
- Present compact board/status snapshots only if they can be derived safely from existing session state.
- Route clicks to the correct Solo subtab/game surface and selected active game.
- Preserve typed draft and resume behavior that existing gameplay surfaces already support.

---

## 8. Multiplayer Workspace

### 8.1 Required Subtabs

The Multiplayer workspace should include:

- **Overview**: Primary multiplayer landing surface.
- **Daily Multiplayer**: Daily Multiplayer OG and Daily Multiplayer GO entry points.
- **Practice Multiplayer**: Practice Multiplayer OG/GO entry points and setup controls.
- **Active Multiplayer Games**: Gallery/list of the player's active multiplayer games.
- **Lobby**: Joinable lobby and claim/join surface.
- **Live**: Narrow Live v0 surface.

Multiplayer History should not be a separate Multiplayer subtab in Phase 24. Multiplayer recent results should link into the global History route.

### 8.2 Overview

The Multiplayer overview should show:

- Active multiplayer games for the current player.
- Open lobbies or claimable Daily multiplayer opportunities where safe and useful.
- Recent multiplayer results.
- Entry points to Daily Multiplayer, Practice Multiplayer, Lobby, Live, and global History.

### 8.3 Daily Multiplayer

Daily Multiplayer must preserve all existing Daily Multiplayer invariants:

- Strictly asynchronous play.
- Five-letter games only.
- UTC-day keyed game identity.
- No clocks.
- No Daily Hard Mode lobby control.
- Answer-separated state.
- Claim-safe create/join behavior.

Daily Multiplayer should provide direct access to Daily Multiplayer OG and GO while respecting existing claim guards and current daily date selection behavior.

### 8.4 Practice Multiplayer

Practice Multiplayer must preserve:

- Practice OG and Practice GO behavior.
- Existing create/join/cancel/resume behavior.
- Existing Practice Hard Mode behavior.
- Existing Practice time-limit behavior.
- Existing timeout, forfeit, scoring, rating/ELO, GO transition, keyboard-state, and result propagation behavior.

Practice Multiplayer may improve layout and discoverability, but it should not change underlying multiplayer rules in Phase 24.

### 8.5 Active Multiplayer Games

Active Multiplayer Games should:

- Use current multiplayer repository/state first.
- Filter to games visible to or involving the current player unless a later-approved Live/spectator scope allows broader visibility.
- Show mode, scope, status, turn ownership, opponent, time-limit state if relevant, and completion state where available.
- Route participant clicks into the correct game surface.
- Preserve current selected-game and resume behavior.

---

## 9. Lobby And Live

### 9.1 Lobby

The Lobby subtab should be the primary join/discovery surface for multiplayer games that are safe to join.

Minimum Lobby expectations:

- Show open Practice Multiplayer lobbies.
- Show Daily Multiplayer claim/join opportunities only in ways that preserve claim safety and Daily invariants.
- Include mode/scope, game type, creator/opponent metadata when available, time limit for Practice games, Hard Mode for Practice games, and status.
- Provide direct join actions where the current user is eligible.
- Provide cancel controls for the current user's own waiting Practice lobbies where existing behavior supports cancellation.
- Avoid exposing private data beyond existing authorized multiplayer surfaces.

The Lobby should be implemented as a view of existing multiplayer state/repository data, not as a separate competing source of truth.

### 9.2 Live v0

Live v0 should be intentionally conservative.

Recommended Live v0 scope:

- A compact list or gallery of eligible active multiplayer games.
- Participant games always appear for the current participant.
- Clicking a participant game resumes play.
- Non-participant visibility should be included only if existing RLS/repository rules already make it safe and if the UI can present a clear read-only state.
- If non-participant spectator access requires schema, RLS, or privacy changes, defer it and show a limited placeholder or restricted view instead.

Deferred from Live v0:

- Full public Live gallery.
- Persistent spectator presence.
- Public spectator counts and identities.
- Rich sorting/filtering beyond basic status/mode filters.
- Completed-game result linger behavior if it requires new realtime infrastructure.
- Chat, reactions, public profiles, following, or social discovery.

The safest Phase 24 interpretation is to treat Live v0 as a participant-centric visibility and resume surface, with optional read-only observation only where existing authorization makes it safe.

---

## 10. Active Games And Recent Results

### 10.1 Data Sources

Use existing data sources first:

- Solo active games and recent results should derive from existing guest/cloud progress, resume slots, practice seeds, and history entries.
- Multiplayer active games and recent results should derive from existing multiplayer state and repository data.
- History v1 should derive from existing local/cloud history and multiplayer result projections before any schema change is considered.

Do not create duplicate gameplay state for galleries. Galleries and lists should use selectors/view models that project display data from canonical gameplay and repository state.

### 10.2 Active Game Display

Active-game cards or rows should prioritize:

- Mode: OG or GO.
- Scope: Daily or Practice.
- Status: waiting, active, current turn, completed, forfeited, timed out, or equivalent existing status.
- Date/seed/context.
- Word length where relevant.
- Opponent/player information for multiplayer where available.
- Last updated/completed timestamp where available.

Board snapshots are desirable but must be derived from existing session state. If a compact board preview risks duplicating or mutating gameplay state, defer the preview and show metadata first.

### 10.3 Recent Results

Recent results should:

- Be limited on workspace overview screens to avoid crowding.
- Link to global History with filters or direct result context where practical.
- Use existing result/status semantics.
- Avoid revealing answers or private multiplayer details before the existing game flow would reveal them.

---

## 11. History v1

History v1 should be useful but modest.

Minimum display expectations:

- A global History route in primary navigation.
- Combined Solo and Multiplayer result list.
- Filters for:
  - Solo vs Multiplayer
  - Daily vs Practice
  - OG vs GO
  - result/status
  - date range or recent/all where practical
- Sort by completion date descending by default.
- Empty states for no matching results.
- Links back to relevant game/review/detail surfaces only when those surfaces already exist safely.

Recommended result fields:

- Completed date/time.
- Mode and scope.
- Status/result.
- Attempts or score where available.
- Word length.
- Daily date or Practice context.
- Opponent/context for multiplayer where available and safe.

Deferred History features:

- Full replay engine.
- Move-by-move visual review for all modes.
- Rich opponent profile integration.
- Export/share features.
- Public match pages.
- Advanced analytics beyond existing Stats behavior.

---

## 12. State Persistence

Phase 24 should distinguish route/UI state from gameplay state.

### 12.1 Navigation Persistence

Persist:

- Active main route.
- Active Solo subtab.
- Active Multiplayer subtab.
- Selected active solo game id/context where safe.
- Selected active multiplayer game id/context where safe.
- Lightweight History filters.

Persistence should be versioned or resilient to missing/obsolete values. The current app uses `brrrdle:navigation:v1`; Phase 24 should either migrate to a new version or safely extend the current shape with validation and fallbacks.

### 12.2 Gameplay Persistence

Do not move gameplay persistence into navigation state.

Preserve:

- Existing guest/cloud progress.
- Existing resume slots.
- Existing Practice seed behavior.
- Existing multiplayer canonical `playerSessions`.
- Existing `serializedSession` compatibility/answer plumbing.
- Existing typed draft behavior where currently supported.

If tab switching causes a gameplay draft or active session to reset, that is a regression unless the reset already exists and is explicitly documented before implementation.

---

## 13. Backward Compatibility And Migration

Phase 24 should avoid schema changes by default.

Compatibility requirements:

- Existing guest progress should load safely.
- Existing cloud progress should load safely.
- Existing active and completed multiplayer games should remain readable.
- Existing hidden/deep-link route ids should work or redirect predictably.
- Existing history entries should remain valid.
- Existing saved navigation values should fall back safely if route ids change.
- Existing Supabase RLS assumptions should not be weakened.

`src/account/storageSchema.ts` should not receive a schema version bump unless Phase 24 introduces a real stored data-shape change. Adding route-only localStorage state usually should not require a guest progress schema migration.

Potential future schema needs, if discovered, should be documented as open decisions before implementation:

- Durable spectator presence.
- Public Live gallery visibility.
- Rich History/replay records beyond existing result data.
- Notification delivery state.

---

## 14. Architecture And Component Strategy

### 14.1 High-Conflict Files

Treat these as high-conflict and sequence edits carefully:

- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/ui/Navigation.tsx`
- `src/calendar/CalendarPanel.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/account/storageSchema.ts`
- `planning/phase-24/IMPLEMENTATION-PLAN.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`
- `CHANGELOG.md`
- `agents.md`
- `memory.md`

The coordinator should own final `App.tsx` integration during implementation.

### 14.2 Recommended Boundaries

Prefer additive component and selector extraction:

- Workspace components for Solo, Multiplayer, and History.
- Shared subtab UI primitives if the existing UI system supports them.
- Selector/view-model modules for active games, recent results, Lobby rows, Live v0 rows, and History rows.
- Thin integration in `App.tsx` that wires state and handlers into workspace components.

Avoid:

- Reimplementing game reducers in UI components.
- Copying canonical gameplay state into galleries.
- Mixing route/subtab persistence with gameplay session persistence.
- Broad rewrites of `OgGame`, `GoGame`, `src/game/`, multiplayer reducers, or repository seams.
- Schema/RLS changes for convenience.

### 14.3 Suggested Module Direction

Exact filenames can be chosen during implementation, but the architecture should trend toward:

- `src/app/routes.ts`: route ids, labels, hidden/primary route classification, compatibility helpers.
- `src/app/App.tsx`: app-level orchestration only.
- `src/solo/` or `src/app/workspaces/SoloWorkspace.tsx`: Solo workspace composition.
- `src/multiplayer/MultiplayerWorkspace.tsx`: Multiplayer workspace composition.
- `src/multiplayer/MultiplayerLobby*.tsx`: Lobby-specific display and actions.
- `src/multiplayer/MultiplayerLive*.tsx`: Live v0-specific display and click behavior.
- `src/history/` or `src/app/workspaces/HistoryWorkspace.tsx`: History route and filters.
- Selector/view-model modules colocated with their domain surface.

When implementation begins, choose names that match existing local style and minimize churn.

---

## 15. Verification Strategy

### 15.1 Stage-Level Verification

Each stage should include focused verification:

- **Stage 24.1**: route model, navigation persistence, hidden-route compatibility, browser nav smoke.
- **Stage 24.2**: Solo Daily/Practice launch and resume, active solo selectors, recent solo links, solo E2E where available.
- **Stage 24.3**: Multiplayer create/join/resume/lobby filtering, Daily invariant checks, Practice Hard Mode/time-limit checks, real two-client E2E for changed multiplayer behavior.
- **Stage 24.4**: History filters, sorting, empty states, recent-result links.
- **Stage 24.5**: Live v0 eligibility, participant resume, non-participant restrictions, RLS/privacy review for any visibility expansion.
- **Stage 24.6**: full final gate, responsive smoke, artifact/secrets scan, governance updates.

### 15.2 Final Required Gate

Before Phase 24 can be reported complete, run:

```sh
npm run lint
npm run test
npm run test:e2e
npm run test:full
npm run build
npx tsc -p tsconfig.api.json --noEmit
git diff --check
```

If any command fails, report the exact command and failure and do not claim Phase 24 is complete.

### 15.3 Multiplayer Remote Verification

For any changed multiplayer behavior, run real two-client Supabase-backed Playwright E2E when credentials are available.

Remote verification should include:

- Two authenticated browser contexts.
- Practice Multiplayer OG/GO affected flows.
- Daily Multiplayer OG/GO affected flows when daily behavior changes.
- Remote row/claim probes as needed.
- Cleanup of touched multiplayer rows, daily claims, temporary users, and generated artifacts.

Do not print or commit Supabase credentials or session artifacts.

### 15.4 Browser And Responsiveness

For visible UI changes, verify at minimum:

- Desktop width.
- Tablet width.
- Mobile width near 390px.
- Keyboard navigation for main tabs and subtabs.
- No overlapping text or broken controls.
- Active route/subtab state remains clear.

---

## 16. Risks And Mitigations

### 16.1 Navigation Regression Risk

**Risk**: Moving Practice and Daily entry points may break existing launch/resume flows.

**Mitigation**: Build the navigation shell first, preserve hidden routes, add compatibility redirects, and remove Practice from primary nav only after Solo/Multiplayer replacements pass focused smoke.

### 16.2 `App.tsx` And Routing Conflict Risk

**Risk**: `App.tsx` currently coordinates route state, gameplay state, auth, daily launches, multiplayer state, and persistence.

**Mitigation**: Keep `App.tsx` integration sequenced and coordinator-owned. Extract workspace components and selector/view-model helpers before moving heavy UI logic.

### 16.3 Multiplayer Realtime/Repository Risk

**Risk**: Lobby, Active Games, and Live v0 may accidentally change multiplayer selection, claims, realtime subscriptions, or repository behavior.

**Mitigation**: Treat Lobby and Live as projections of existing state first. Do not change repository writes unless required and approved. Use real two-client E2E for any changed multiplayer behavior.

### 16.4 Supabase/RLS/Privacy Risk

**Risk**: Live or spectator features could expose non-participant game data.

**Mitigation**: Keep Live v0 participant-centric unless existing authorization clearly supports read-only spectators. Defer spectator presence and public gallery features until a dedicated schema/RLS review.

### 16.5 Resource And Test Runtime Risk

**Risk**: Full E2E and two-client tests can be slow and resource intensive.

**Mitigation**: Use focused tests during intermediate stages, one dev server, minimal browser contexts, sequential heavy gates, explicit cleanup, and final full gate only after stage integration stabilizes.

### 16.6 Scope Creep Risk

**Risk**: Phase 24 can expand into notifications, social discovery, rich spectator presence, replay, theme work, or new gameplay.

**Mitigation**: Use this spec's out-of-scope list as a stop condition. Defer expansion to Phase 25+ unless the user explicitly approves a spec amendment.

---

## 17. Open Decisions

These decisions do not block spec review, but they should be resolved before or during Stage 24.0 implementation planning.

1. **Visible Daily label**: Recommend using the user-facing label `Daily` while preserving the existing `calendar` route id or providing a compatibility alias.
2. **Home dashboard depth**: Recommend keeping Home lightweight in Phase 24 and avoiding a full dashboard build until Phase 25.
3. **Live v0 non-participant access**: Recommend participant-centric Live v0 unless existing authorization already makes read-only spectator access safe without schema/RLS changes.
4. **History detail depth**: Recommend History v1 as filters plus result summaries, with rich replay/review deferred.
5. **Implementation packaging**: Recommend staged implementation checkpoints or staged PRs rather than one large all-or-nothing change, subject to the user's execution preference.

No blocking product decision is required before reviewing this spec. Implementation should not begin until the user explicitly approves an execution plan.

---

## 18. Stop Conditions During Implementation

When implementation is later authorized, stop and report before proceeding if any of these occur:

- A required behavior appears to require a Supabase schema or RLS change not already approved.
- Daily Multiplayer invariants would need to change.
- Existing scoring, rating/ELO, timeout, forfeit, GO transition, keyboard-state, Hard Mode, or answer-selection rules would need to change.
- Live v0 requires exposing non-participant data beyond existing authorized surfaces.
- A compatibility route cannot be preserved or redirected predictably.
- Full final verification cannot be run or cannot pass after reasonable focused remediation.
- Secrets, local session artifacts, generated auth state, or deployment credentials appear in the worktree.

---

**End of Phase 24 Navigation And Workspaces Spec**
