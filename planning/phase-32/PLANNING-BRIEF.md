# Phase 32 Planning Brief

**Status**: Planning brief for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-24.
**Recommended phase focus**: Multiplayer stabilization, identity routing, and rating display consistency after Phase 31.

## Authority

This brief is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, completed Phase 31 postgame actions/current-surface cleanup, completed Phase 30 public leaderboards, completed Phase 29 public profiles, completed Phase 28 Live spectator stabilization, completed Phase 27 ranked Practice foundations, current roadmap surfaces, `docs/ranked-multiplayer.md`, `docs/supabase.md`, `progress/PROGRESS.csv`, and the current progress reports.

This document does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, or work in the original stable `brrrdle` repository.

## Current Situation

Phase 31 is complete, merged, and cleaned up. Local `main` and `origin/main` were confirmed at merge commit `d4d1957fa61da14a62de2c7cf32ff50996e87523` during this planning pass.

Phase 31 laid the foundations for Practice-only postgame actions, but user testing surfaced several newly important regressions around rematch lifecycle visibility, ranked queue continuation, lobby/match auto-routing, multiplayer identity display, and global avatar accent display. These are closer to current gameplay stability than optional future feature work.

The prior roadmap routed Phase 32 as ranked mode expansion / competitive ladder v2. Based on the new user-reported behavior, this brief recommends changing Phase 32 to a targeted stabilization phase and moving ranked mode expansion to Phase 33. Mixing timed/Daily ranked expansion into the same phase as newly observed postgame and matchmaking regressions would raise risk in the same multiplayer authority surfaces that need repair.

## Goals

- Fix user-observed Phase 31 follow-up bugs in rematch, ranked queue continuation, lobby auto-routing, rival identity display, account avatar accent display, and rating/Elo formatting.
- Preserve the working same-settings new multiplayer match behavior at the end of Practice multiplayer games.
- Add or plan focused regression coverage only after the bugs are fixed and behavior is verified, with real two-client Supabase-backed E2E for the gameplay-critical flows.
- Keep ranked mode expansion out of Phase 32 and explicitly route it to the next competitive ladder phase.
- Preserve completed Phase 31 postgame actions, Phase 30 public leaderboards, Phase 29 public profiles, Phase 28 Live spectator behavior, Phase 27 ranked Practice behavior, Daily Multiplayer integrity, and all gameplay rules.

## In Scope

### 1. Global Account Avatar Accent Bug

Fix the remaining private account accent propagation issue:

- changing and saving private `Accent color` in `Your profile` should update the global top-right signed-in avatar circle on all app pages;
- this should use the saved private profile accent, not the public profile accent;
- preserve the already-fixed in-panel private avatar preview and public profile accent preview;
- do not expose private profile metadata publicly.

The attached screenshot `accent_color_arrow.png` points at the global signed-in avatar chip. Repository context indicates `AccountBadge` currently renders the account avatar from `profile.gradient`, while private profile save stores `accent_color` and re-derives auth state. Phase 32 should audit whether the badge should map `profile.accentColor` to the same allow-listed accent classes used by the profile preview rather than relying on the older deterministic gradient.

### 2. Rematch Lifecycle Stabilization

Fix direct unranked Practice rematch behavior so it matches the intended mutual-intent flow:

- one player requesting a rematch should make the opponent see the rival-requested state automatically on the terminal game screen;
- the opponent should be able to accept or decline without first creating a matching request of their own;
- accept should create a fresh unranked Practice game with the same opponent, seats, mode, word length, Hard Mode setting, time setting, and safe allowed metadata;
- the reported eligible case, five-letter unranked Practice OG, Hard Mode off, no clock, should not fail with `Unable to create a safe rematch game from this result`;
- declining should update the requester so the requester knows the rematch was denied;
- cancellation, expiry, already-created, idempotent accept, wrong-account, nonparticipant, Daily, ranked, custom/private-code, nonterminal, and malformed cases must remain safe.

Stage 31.3 privacy/abuse probes showed the database contract can create an eligible rematch under controlled conditions, so Phase 32 should first audit the app projection, selected-game/request refresh, and cross-client refresh path before considering a new migration.

### 3. Ranked Practice Search-Again Auto-Routing

Fix ranked Practice postgame `Search ranked Practice again` behavior:

- when player one enters the ranked queue from a completed ranked Practice game and is later matched, player one's screen should automatically open the finalized durable ranked game;
- player one should not need to manually press `Check ranked queue` or `Playing` after player two joins/matches;
- player two should continue to route into the new game as currently observed;
- queue finalization must continue through the trusted ranked queue/finalization path;
- do not create direct ranked rematches.

The current source includes a manual `refreshRankedQueue` path and a `finalizeRankedQueueMatch` path. Phase 32 should audit whether the queued requester needs active polling, subscription-triggered status checks, or repository/state reconciliation that selects the newly finalized game once `matched_game_id` exists.

### 4. Lobby And Match Join Auto-Routing

Improve creator-side routing when another player joins a created multiplayer opportunity:

- if the viewer created a ranked queue request and another player matches it, route the creator into the resulting game once finalized;
- if the viewer opened an unranked lobby and another player joins it, route the creator into the joined game instead of leaving the creator on a stale previous game or setup surface;
- preserve selected-game state when no new joined game exists;
- preserve manual navigation and active-game limits;
- do not route spectators, nonparticipants, or stale/terminal games into gameplay.

This should be handled as a UX/state synchronization fix, not as gameplay authority.

### 5. Rival Identity Display Consistency

Fix cases where the rival is displayed as `You` or generic `Rival` even when a safe profile label exists:

- the local viewer may be labeled `You` where that helps orientation;
- the opponent should not be labeled `You`;
- prefer safe profile summaries and public-safe display names for opponents when available;
- use a clear fallback only when no safe profile label exists;
- avoid raw auth IDs, raw emails, private metadata, tokens, sessions, seeds, answers, local artifacts, queue IDs, transaction IDs, or private progress;
- preserve privacy boundaries for Live spectator, public profile, and leaderboard data.

Repository context shows player labels still use `You`/`Rival` fallbacks in multiplayer normalization and creation. Phase 32 should tighten viewer-specific display mapping so the same underlying game can show the local viewer as `You` while still showing the opponent's safe name.

### 6. Rating/Elo Number Formatting Consistency

Apply one player-facing rule across the app:

- Elo/rating values should not include thousands separators;
- `1200`, not `1,200`;
- apply this to public ranked leaderboards, competitive multiplayer rating buckets, About/ranked copy where dynamic values appear, Stats surfaces, multiplayer identity cards if any are later added, and tests;
- this is display-only and must not alter Elo values, transaction data, sorting, ranking, settlement, or leaderboard authority.

Repository context shows the public ranked leaderboard view model currently formats ratings through `Intl.NumberFormat('en-US')`, which creates comma-separated labels.

### 7. Regression Test Planning After Fixes

Phase 32 should plan focused tests after fixes are implemented:

- pure/domain tests for rematch eligibility/projection and no-comma rating formatters;
- repository/parser tests for rematch request lifecycle and forbidden fields;
- component tests for rematch request/accept/decline states, queue auto-route states, lobby join auto-route, rival label display, and global avatar accent display;
- real two-client Supabase-backed E2E after the bugs are fixed for:
  - one-request rematch request visible to opponent;
  - opponent accept creates and opens a fresh game for both participants;
  - decline updates requester;
  - ranked search-again routes both players into the finalized game;
  - lobby creator auto-routes when a rival joins;
  - opponent identity labels use safe profile names.

The E2E expansion should come after source fixes are verified, not before the reproduction/audit stage.

## Future Features To Route Or Defer

The following user-requested ideas are valuable, but they should not crowd Phase 32's bugfix surface unless a later prompt explicitly changes the scope:

- **Clickable multiplayer rival avatars/names to public profiles**: route to a later public identity/navigation polish phase after the current rival label bugs are fixed.
- **In-game player identity cards with names, avatars, public accent colors, and current bucket Elo near the gameplay area**: route with the public identity/navigation polish work; this should use safe public profile data and current trusted bucket ratings only.
- **Clickable leaderboard player names**: route with public identity/navigation polish; preserve default-private public profiles and authenticated-only leaderboard posture unless a later spec changes it.
- **Settings Danger Zone actions**: route to a later account/settings safety phase. The current placeholder should eventually gain explicit safe actions, likely export/reset/delete-sign-out-adjacent controls only after a dedicated risk review.
- **Interactive History rows and replay/detail views**: route to a later History/replay phase. Current history rows show completed results, but rich replay requires durable saved-game evidence, answer/seed privacy review, and a clear distinction between solo, multiplayer, Daily, Practice, and public-safe views.

Recommended route after this planning pass:

- Phase 32: multiplayer stabilization, identity routing, and rating display consistency.
- Phase 33: ranked mode expansion / competitive ladder v2.
- Phase 34: public/guest spectation, unless a later planning pass inserts a small public profile navigation polish phase first.
- Phase 35: theme proposal/template modernization.
- Phase 36 or later: full concrete theme implementation.
- Later backlog: Settings Danger Zone completion, History replay/detail views, and broader social/profile navigation polish if not pulled into Phase 34.

## Out Of Scope

- Timed Practice ranked implementation.
- Daily ranked implementation.
- Ranked custom/private-code games.
- Rank labels/bands implementation.
- Public/guest spectation.
- Public profile route expansion beyond any labels needed for existing multiplayer identity display.
- Service workers, push subscriptions, background push, or deployment config.
- Supabase migration creation or execution unless a later Stage 32 migration/RLS addendum and execution prompt explicitly authorize it.
- Elo algorithm, K-factor, expected-score formula, trusted settlement, scoring, timeout, forfeit, GO transition, keyboard-state, Solo Daily fixed-five, or Practice 2-35 word-length rule changes.
- Production deployment, release, commits, pushes, PRs, merges, or branch deletion.

## Recommended Stage Breakdown

### Stage 32.0: Baseline And Protected Context

- Read governance, Phase 31 completion materials, this brief, progress records, ranked docs, Supabase docs, and package/test surfaces.
- Confirm `main`, remotes, `HEAD`, and `origin/main`.
- Record uncommitted Phase 32 planning artifacts.
- Run resource/process checks.
- Run the protected baseline verification gate.

### Stage 32.1: Reproduction And Audit

- Reproduce or audit each user-reported bug:
  - global avatar accent not updating;
  - rematch one-request visibility gap;
  - safe rematch creation failure for eligible unranked Practice OG;
  - decline not updating requester;
  - ranked search-again creator not auto-routing;
  - lobby/queue creator not auto-routing when joined/matched;
  - opponent shown as `You` or generic `Rival`;
  - comma-separated rating labels.
- Use one local dev server only if browser reproduction needs it, then stop it.
- Decide whether any migration/RLS addendum is needed. Default expectation: source/runtime and test work should be enough, because the Phase 31 rematch RPC contract already supports participant-scoped rematch lifecycle.

### Stage 32.2: Migration/RLS Addendum Planning If Required

Only run if Stage 32.1 proves the existing rematch/queue/profile contracts cannot support the required fixes safely.

- Define exact additive SQL/RPC/RLS changes.
- Preserve all existing Phase 31, 30, 29, 28, and 27 privacy and gameplay boundaries.
- Do not create or run migrations in this stage.

If no migration is required, skip directly to app implementation.

### Stage 32.3: Migration/RLS Execution If Required

Only run if Stage 32.2 creates a clean addendum and the user explicitly authorizes execution.

- Create at most one additive migration.
- Apply only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous.
- Run non-printing privacy/abuse probes.
- Stop before app work if target, credentials, SQL safety, or probes fail.

### Stage 32.4: Rematch And Postgame Stabilization

- Fix rematch request visibility, accept, decline, cancel, expiry, and created-game routing.
- Preserve direct rematch v1 limits: completed unranked non-custom Practice games only.
- Preserve ranked queue search-again and Daily/custom exclusions.
- Add focused domain/repository/component tests.

### Stage 32.5: Queue, Lobby, And Identity Routing Stabilization

- Auto-route ranked queue creators into finalized matches.
- Auto-route unranked lobby creators into joined games.
- Fix opponent identity labels so safe profile names display instead of wrong `You` or generic `Rival` when safe data exists.
- Preserve viewer-local `You` orientation where appropriate.
- Add focused tests for queue/lobby routing and identity display.

### Stage 32.6: Avatar Accent And Rating Display Consistency

- Make the global account avatar chip follow saved private accent color.
- Apply no-comma Elo/rating formatting across player-facing rating displays.
- Add focused tests for account badge/avatar accent and rating label formatting.

### Stage 32.7: Real Two-Client E2E And Final Hardening

- After the source fixes are stable, add focused real Supabase-backed two-client E2E coverage for the gameplay-critical regressions.
- Run focused tests first, then the full final verification gate requested by the stage prompt.
- Create `planning/phase-32/CHANGELOG.md`.
- Run non-printing secret/artifact checks and watched-port/process cleanup checks.

## Success Criteria

- The global signed-in avatar chip updates to the saved private accent after profile save.
- One rematch request is enough for the opponent to see accept/decline controls.
- Eligible unranked Practice rematch accept creates a fresh safe game and opens it for participants.
- Decline/cancel/expiry/created states are visible to both sides as appropriate.
- Ranked search-again auto-routes both matched players into the finalized ranked Practice game.
- Queue/lobby creators are not left stranded on stale screens after a rival joins or matches.
- Opponent labels use safe profile names when available and never show the opponent as `You`.
- Elo/rating displays use no thousands separators across the game.
- Focused local tests and real two-client E2E cover the repaired gameplay-critical flows.
- No Daily claim bypasses, ranked direct rematches, public/guest spectation, new push infrastructure, Elo algorithm changes, or gameplay-rule changes are introduced.

## Likely Files And Modules

- `src/account/AccountBadge.tsx`
- `src/account/ProfilePanel.tsx`
- `src/account/profile.ts`
- `src/app/App.tsx`
- `src/leaderboards/publicRankedLeaderboardViewModels.ts`
- `src/leaderboards/PublicRankedLeaderboardPanel.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/postgameActions.ts`
- `src/multiplayer/matchmaking.ts`
- `src/multiplayer/rating.ts`
- relevant account, leaderboard, multiplayer, postgame, ranked queue, route, and E2E tests
- `docs/ranked-multiplayer.md`
- `docs/supabase.md` only if contract documentation changes
- `planning/phase-32/`
- `planning/specs/phase-32/`
- `progress/`

## Migration/RLS Constraints

Default expectation: Phase 32 should not need a migration because:

- Phase 31 already added durable participant-scoped rematch request/accept/decline/cancel/list RPCs;
- Stage 31.3 probes verified direct rematch creation for eligible cases at the RPC level;
- ranked search-again should continue to use existing trusted ranked queue/finalization RPCs;
- lobby join auto-routing should be app/repository state reconciliation, not authority expansion.

Stage 32.2 is required only if audit proves an existing RPC cannot safely expose required participant-scoped state or if a privacy/abuse probe reveals a contract gap.

If migration/RLS work becomes necessary:

- additive only;
- authenticated-only where private participant state is involved;
- no anon/public rematch lifecycle RPCs;
- no raw `async_multiplayer_games` SELECT expansion for nonparticipants;
- no raw auth IDs, emails, private metadata, answers, seeds, sessions, tokens, private progress, queue IDs, rating transaction IDs, or local artifacts in public or cross-participant payloads;
- preserve Daily claim safety and ranked settlement authority.

## Verification Strategy

Every implementation stage should run focused tests first, then the stage-required wider gate. Phase 32 final hardening should include:

- focused Phase 32 tests for account badge, rematch lifecycle, queue/lobby auto-routing, identity labels, leaderboard/rating formatting, and postgame actions;
- real two-client Supabase-backed E2E for the gameplay-critical rematch and queue/lobby routing fixes after implementation;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run test:full`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan;
- watched-port/process cleanup checks.

## Risks

- Rematch and queue/lobby fixes touch high-conflict state synchronization surfaces.
- Auto-routing must not steal navigation when the viewer is not a participant or is intentionally inspecting another game.
- Opponent identity must improve user-facing labels without leaking raw private account data.
- E2E coverage can become flaky if added before the underlying behavior is stable.
- No-comma rating formatting should not accidentally affect sorting, numeric comparisons, or API payloads.
- Pulling ranked mode expansion into this phase would increase blast radius and make debugging the new regressions harder.

## Open Decisions

- Should queued ranked requester auto-routing use active polling while the terminal postgame panel is visible, repository subscription events, or a targeted queue-status refresh interval?
- Should unranked lobby creator auto-routing happen immediately on any joined waiting game, or only when the creator is currently on the matching lobby/setup surface?
- What is the cleanest viewer-specific label model for `You` versus opponent profile labels?
- Are current public profile display names enough for in-game opponent labels, or should private authenticated profile summaries remain the source for participant-only views?
- Should Phase 32 add E2E coverage in a dedicated final stage after all fixes, or split E2E tests immediately after each gameplay fix?
- Should clickable public profile navigation and in-game Elo identity cards be planned as Phase 34, or after public/guest spectation?

## Explicit Deferred Ranked Mode Routing

Phase 32 should not implement ranked mode expansion. Route as follows:

- **Timed Practice ranked**: Phase 33 competitive ladder v2 candidate, first in that phase only after clock fairness, trusted timeout settlement, queue compatibility, RLS safety, and two-client verification are planned.
- **Daily ranked**: Phase 33 or later only after Daily claim safety, UTC-day uniqueness, answer separation, no-clock behavior, current-day anti-cheat, spectator exclusion, and Daily invariants are proven safe.
- **Ranked custom/private-code games**: remain deferred unless a later spec proves ladder-integrity and anti-abuse requirements.
- **Rank labels/bands**: may be considered in Phase 33 only as rating-derived display labels, never as rating authority or Elo algorithm changes.

## Next Gated Prompt

Next recommended action: create the unified Phase 32 specification for multiplayer stabilization, identity routing, and rating display consistency.

Do not begin source/runtime implementation until the unified spec, detailed implementation plan, Stage 32.0 baseline, and later implementation stages are separately authorized.
