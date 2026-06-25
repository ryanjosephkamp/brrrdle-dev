# Phase 32 Multiplayer Stabilization, Identity Routing, And Rating Display Specification

**Status**: Unified specification for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-24.
**Phase focus**: Multiplayer stabilization, identity routing, global account avatar accent propagation, and rating display consistency.

## Authority

This specification is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, completed Phase 31 postgame actions and current-surface cleanup, completed Phase 30 public leaderboards, completed Phase 29 public profile foundations, completed Phase 28 Live spectator work, completed Phase 27 ranked Practice foundations, `planning/phase-32/PLANNING-BRIEF.md`, `docs/ranked-multiplayer.md`, `docs/supabase.md`, `progress/PROGRESS.csv`, and current progress records.

This document does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, Phase 32 implementation, Phase 33 ranked mode expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, or work in the original stable `brrrdle` repository.

## Purpose

Phase 32 should repair the user-observed post-Phase-31 multiplayer and identity regressions before expanding the ranked ladder. The main objective is to make already-built systems behave reliably in real two-client use:

- global account avatar accent should reflect the saved private profile accent;
- Practice rematch requests should synchronize between both participants;
- eligible unranked Practice rematch accept should create a fresh safe rematch game;
- ranked Practice search-again should route both matched players into the finalized game;
- lobby/queue creators should not remain stranded after a rival joins or matches;
- opponent labels should use safe profile names instead of incorrect `You` or generic `Rival` when safe data exists;
- Elo/rating displays should use no comma separators.

Ranked mode expansion remains routed to Phase 33.

## Baseline

- Phase 31 is complete, merged, and cleaned up.
- Local `main` and `origin/main` were confirmed during Phase 32 planning at `d4d1957fa61da14a62de2c7cf32ff50996e87523`.
- Phase 31 added the Practice-only rematch migration/RPC contract and app foundations, but user testing found cross-client lifecycle and routing gaps.
- Phase 31 also fixed profile preview accent, Stats overlap, About formula formatting, and rating-bucket clarity; Phase 32 must preserve those fixes.
- Phase 30 public ranked Practice leaderboards remain authenticated-only, display-only, and non-authoritative.

## Goals

1. Repair rematch lifecycle behavior for eligible unranked non-custom Practice Multiplayer games.
2. Repair ranked queue and lobby creator auto-routing after a rival matches or joins.
3. Repair opponent identity labels so the opponent is not displayed as `You`, and generic `Rival` appears only when no safe label is available.
4. Repair global account avatar accent propagation after saving private account profile accent color.
5. Apply no-comma display consistency for Elo/rating and ranking labels.
6. Add focused tests and real two-client Supabase-backed E2E coverage after the fixes are stable.
7. Preserve Phase 31 postgame actions, Phase 30 leaderboards, Phase 29 public profiles, Phase 28 Live spectator behavior, Phase 27 ranked Practice behavior, Daily Multiplayer integrity, and all gameplay rules.

## In Scope

### Account Avatar Accent Propagation

Phase 32 must fix the remaining private accent bug shown in `/Users/noir/Desktop/accent_color_arrow.png`:

- saving `Accent color` in `Your profile` must update the global top-right account avatar chip;
- the global chip should use the saved private `profile.accentColor` value, not the public profile accent;
- the fix should use only allow-listed private profile accent slugs;
- existing private profile preview and public profile accent preview behavior must remain intact;
- no private profile metadata may be exposed publicly.

Repository audit note: `src/account/AccountBadge.tsx` currently renders the signed-in avatar circle from `profile.gradient`; `src/account/profile.ts` derives both `accentColor` and a deterministic `gradient`; `src/app/App.tsx` already refreshes auth state after profile save. The implementation plan should verify whether the badge needs an accent-to-class mapping rather than relying on the deterministic gradient.

### Rematch Lifecycle Stabilization

Phase 32 must make direct Practice rematch v1 match the intended one-request flow:

- one participant can request a rematch from a terminal eligible game;
- the other participant should see `Rival requested a rematch` with `Accept rematch` and `Decline` without needing to request their own rematch;
- accepting should create or open one fresh unranked Practice game with the same opponent, same seats, same mode, same word length, same Hard Mode setting, same time-limit setting, GO puzzle count when relevant, and no unsafe metadata;
- the user-reported eligible case, five-letter unranked Practice OG, Hard Mode off, no clock, must not fail with `Unable to create a safe rematch game from this result`;
- decline should update the requester so the requester can see the request was declined;
- cancel, expiry, already-created, idempotent accept, and requester/opponent capability states should be clear and synchronized;
- the existing working `Open new unranked match` behavior should be preserved.

Direct rematch v1 remains limited to completed unranked non-custom Practice games. Ranked Practice direct rematches, Daily rematches, custom/private-code direct rematches, nonterminal rematches, nonparticipant rematches, and malformed rematches remain unavailable.

Repository audit note: the Phase 31 RPC contract supports participant-scoped request/list/cancel/decline/accept. Current app code lists rematch requests for the selected terminal game and locally upserts action results, so Phase 32 should audit selected-game refresh, polling/subscription needs, repository reconciliation, projection generation, and stale selected-game normalization before assuming SQL changes are needed.

### Ranked Practice Search-Again Auto-Routing

Phase 32 must stabilize postgame ranked search-again:

- if player one uses `Search ranked Practice again` and waits in queue, player one's client should automatically open the finalized durable ranked game after a compatible rival matches;
- player one should not need to manually press `Check ranked queue`, `Playing`, or another control to enter the game;
- player two should continue to route into the game when they match;
- finalization must continue through the trusted ranked queue/finalization RPC path;
- no direct ranked rematch RPC or game creation path may be added.

Repository audit note: current code includes `enterRankedQueue`, `refreshRankedQueue`, and `finalizeRankedQueueMatch`. The implementation plan should decide whether queued requester auto-routing should use a visible-state polling cadence, subscription-triggered refresh, active-game reconciliation, or a focused hybrid.

### Lobby And Queue Creator Auto-Routing

Phase 32 must improve creator-side routing when a rival joins or matches:

- unranked lobby creators should automatically open the joined game when another signed-in player joins their waiting lobby;
- ranked queue creators should automatically open the finalized game after a rival matches their queue request;
- the route/subtab/selected-game state should move to the relevant gameplay surface for participant-owned newly joined/matched games;
- auto-routing must not route nonparticipants, spectators, stale terminal games, malformed games, or unrelated games;
- auto-routing should avoid stealing focus when the viewer is intentionally inspecting a different active game unless the implementation plan defines a safe, user-visible exception.

This is UI/state synchronization only. It must not become gameplay authority.

### Opponent Identity Labels

Phase 32 must fix opponent identity display:

- the local viewer may still be shown as `You` where that helps orientation;
- the opponent must never be displayed as `You`;
- opponent labels should prefer safe profile summaries or public-safe display names when available;
- generic `Rival` should be a fallback only when no safe label exists;
- participant-only private profile summaries must not become public data;
- public profile labels must continue respecting default-private visibility and moderation;
- Live spectator, public profile, and leaderboard privacy boundaries must remain intact.

Repository audit note: `src/multiplayer/multiplayer.ts` still normalizes and creates player labels with `You`, `Host`, and `Rival` fallbacks. The implementation plan should separate canonical stored labels from viewer-specific display labels or otherwise guarantee that a label correct for one viewer is not persisted and misread by the other viewer.

### No-Comma Elo And Rating Display

Phase 32 must apply a display-only consistency rule:

- Elo/rating values should render as `1200`, not `1,200`;
- player-facing rank/rating labels tied to leaderboard/rating rows should also avoid comma formatting unless a later spec intentionally distinguishes rank labels from rating labels;
- sorting, numeric comparisons, RPC payloads, trusted settlement, rating transactions, and public leaderboard authority must remain numeric and unchanged;
- counts such as games played may keep existing formatting unless a touched UI surface makes a clear local consistency case.

Repository audit note: `src/leaderboards/publicRankedLeaderboardViewModels.ts` currently uses `Intl.NumberFormat('en-US')` for leaderboard labels, including `ratingLabel`, `peakLabel`, and `rankLabel`.

### Regression Tests And Real E2E

Phase 32 must add focused tests after source fixes are implemented and stabilized:

- account badge/avatar accent component tests;
- no-comma rating/rank display formatter tests;
- rematch domain/repository/component tests for request, opponent visibility, accept, decline, cancel, expiry, created, and idempotent states;
- ranked queue auto-routing tests for queued requester and matching rival;
- lobby creator auto-routing tests;
- opponent identity label tests for safe profile labels, viewer-local `You`, generic fallback, and forbidden private data;
- real two-client Supabase-backed E2E after fixes for gameplay-critical regressions.

The E2E suite should verify at least:

- one rematch request appears on the opponent's terminal screen;
- opponent accept creates and opens a fresh rematch game for both participants;
- opponent decline updates the requester;
- ranked search-again routes both players into the finalized game;
- lobby creator auto-routes when a rival joins;
- opponent labels use safe names and do not show the opponent as `You`.

## Out Of Scope

- Timed Practice ranked implementation.
- Daily ranked implementation.
- Ranked custom/private-code games.
- Rank labels/bands implementation except for routing and future planning.
- Public/guest spectation.
- Clickable multiplayer public profile navigation.
- In-game player identity/Elo cards near gameplay.
- Clickable public leaderboard player names.
- Settings Danger Zone action implementation.
- Interactive History replay/detail views.
- Service workers, push subscriptions, background push, or deployment config.
- Supabase migration creation or execution unless a later Stage 32 migration/RLS addendum and execution prompt explicitly authorize it.
- Elo algorithm, K-factor, expected-score formula, trusted settlement, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five, or Practice 2-35 word-length rule changes.
- Production deployment, release, commits, pushes, PRs, merges, or branch deletion.
- Work in the original stable `brrrdle` repository.

## Explicit Deferrals

- Phase 33: ranked mode expansion / competitive ladder v2.
  - Timed Practice ranked should be considered first only after clock fairness, trusted timeout settlement, queue compatibility, RLS safety, and real two-client verification are planned.
  - Daily ranked remains later inside or after Phase 33 only after Daily claim safety, UTC-day uniqueness, answer separation, no-clock behavior, anti-cheat, spectator exclusion, and Daily invariants are proven safe.
  - Ranked custom/private-code games remain deferred unless a later spec proves ladder-integrity and anti-abuse requirements.
  - Rank labels/bands may be considered only as rating-derived display labels, never rating authority or Elo algorithm changes.
- Phase 34: public/guest spectation unless a later planning pass inserts a small public identity/navigation polish phase first.
- Phase 35: theme proposal/template modernization.
- Phase 36 or later: full concrete theme implementation.
- Later backlog: clickable profile navigation from multiplayer/leaderboards, gameplay identity/Elo cards, Settings Danger Zone completion, and History replay/detail views.

## Success Criteria

Phase 32 is successful when all of the following are true:

- saving a private account accent updates the global signed-in avatar chip;
- one rematch request is enough for the opponent to see accept/decline controls;
- accepting an eligible rematch creates or opens a fresh safe unranked Practice game;
- declining/cancelling/expiry/created states synchronize to the other participant as appropriate;
- ranked search-again routes the queued creator and matched rival into the finalized game without manual polling controls;
- lobby creators are routed into joined games when a rival joins;
- opponent labels prefer safe names and do not display the opponent as `You`;
- Elo/rating and rank labels covered by this phase do not render comma separators;
- focused tests and real two-client E2E cover the repaired behavior;
- no Daily claim bypasses, ranked direct rematches, public/guest spectation, service workers, Elo algorithm changes, or gameplay-rule changes are introduced.

## Recommended Stage Breakdown

### Stage 32.0: Protected Baseline

- Read governance, Phase 31 completion materials, Phase 32 planning/spec materials, progress records, ranked docs, Supabase docs, package/test surfaces, and relevant source/test surfaces.
- Confirm `pwd`, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Record current uncommitted Phase 32 planning/spec/progress artifacts.
- Run resource/process checks.
- Run `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, and Python CSV shape check using `python3 -S`.

### Stage 32.1: Reproduction And Audit

- Reproduce or audit:
  - global avatar accent not updating after profile save;
  - rematch request not becoming visible to the opponent automatically;
  - eligible rematch accept failing to create a safe rematch game;
  - decline not updating the requester;
  - ranked search-again creator not auto-routing;
  - lobby/queue creator not auto-routing on rival join/match;
  - opponent label incorrectly showing `You` or generic `Rival`;
  - comma-formatted rating/rank labels.
- Use one local dev server only if browser reproduction requires it, then stop it.
- Decide whether Stage 32.2 migration/RLS addendum planning is required.

### Stage 32.2: Migration/RLS Addendum Planning If Required

Run only if Stage 32.1 proves existing SQL/RPC/RLS contracts cannot safely support the required behavior.

- Define exact additive SQL/RPC/RLS changes.
- Preserve participant scoping, Daily claim safety, ranked settlement authority, public profile boundaries, and forbidden-field protections.
- Do not create or run migrations.

If Stage 32.1 finds source/runtime work is sufficient, skip Stage 32.2 and Stage 32.3.

### Stage 32.3: Migration/RLS Execution If Required

Run only after a clean Stage 32.2 addendum and explicit authorization.

- Create at most one additive migration.
- Apply only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous.
- Run non-printing privacy/abuse probes.
- Stop before app work if target, credentials, SQL safety, or probes fail.

### Stage 32.4: Rematch Lifecycle Stabilization

- Fix rematch request visibility and refresh for both participants.
- Fix safe rematch projection creation for eligible unranked non-custom Practice games.
- Fix accept, decline, cancel, expiry, created, and idempotent state synchronization.
- Preserve ranked/Daily/custom exclusions and the working new unranked match action.
- Add focused domain/repository/component tests.

### Stage 32.5: Queue, Lobby, And Identity Routing Stabilization

- Auto-route queued ranked request creators into finalized ranked games.
- Auto-route unranked lobby creators into joined games.
- Fix opponent identity labels using safe participant/public profile names.
- Preserve viewer-local `You` orientation without persisting it incorrectly for the opponent.
- Add focused tests for queue/lobby routing and identity display.

### Stage 32.6: Account Avatar And Rating Display Consistency

- Make `AccountBadge` reflect saved private accent color.
- Apply no-comma display formatting for Elo/rating and rank labels covered by this phase.
- Add focused tests for avatar accent propagation and rating display.

### Stage 32.7: Real E2E And Final Hardening

- Add real two-client Supabase-backed E2E for the repaired gameplay-critical flows.
- Review Stage 32.1 through Stage 32.6 for stale copy, duplicate logic, privacy gaps, routing regressions, and docs/progress gaps.
- Create `planning/phase-32/CHANGELOG.md`.
- Run focused tests, full verification, non-printing secret/artifact scans, and watched-port/process cleanup checks.

## Migration And RLS Constraints

Default expectation: no migration should be required. Phase 31 already added participant-scoped rematch lifecycle RPCs, Phase 27 already added ranked queue/finalization RPCs, and lobby creator auto-routing should be app/repository state reconciliation.

Stage 32.2 is required only if reproduction proves:

- rematch lifecycle state cannot be safely listed or refreshed through existing participant-scoped RPCs;
- ranked queue requester state cannot be safely observed through existing queue status/finalization RPCs;
- lobby join state cannot be safely reconciled through existing participant-scoped game reads;
- or privacy probes reveal a current contract gap.

Any migration/RLS work must be:

- additive;
- authenticated-only where participant state is involved;
- participant-scoped for rematch and game lifecycle data;
- not anon/public;
- not a broad raw `async_multiplayer_games` SELECT expansion for nonparticipants;
- not a source of raw auth IDs, emails, private metadata, answers, seeds, sessions, tokens, private progress, raw queue IDs, rating transaction IDs, settlement IDs, local artifacts, or public/guest spectation leakage.

## Privacy And Security Requirements

- Public profile visibility remains default-private and opt-in.
- Public leaderboard rows remain display-only and authenticated-only.
- Participant-only game labels may use safe private participant summaries, but those summaries must not become public profile data.
- Opponent labels may use public-safe display names only when visibility/moderation allows them, or private participant summaries only inside participant views.
- Browser clients must not gain authority over Elo, ranked settlement, Daily claims, public profiles, leaderboard rows, rematch lifecycle authority, or Supabase auth metadata.
- E2E probes and reports must not print secrets, tokens, raw auth ids, private emails, local session artifacts, screenshots, videos, traces, or private user data.

## Verification Strategy

Every implementation stage should run focused tests first, followed by the stage-required wider gate. Final hardening should run:

- focused Phase 32 tests for account badge, rematch lifecycle, queue/lobby routing, identity labels, and rating display;
- real two-client Supabase-backed E2E for rematch request/accept/decline, ranked search-again auto-routing, lobby creator auto-routing, and opponent identity display;
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

If any stage verification fails, stop, update progress with the exact non-secret blocker, and do not advance to the next stage.

## Risks

- Rematch and queue/lobby fixes touch high-conflict state synchronization surfaces in `src/app/App.tsx` and `src/multiplayer/`.
- Auto-routing can become annoying if it steals focus from intentional user navigation.
- Identity-label fixes can leak private data if participant/private summaries are confused with public profile projections.
- Rematch projection fixes can accidentally permit ranked, Daily, custom, nonterminal, or malformed games if eligibility is loosened too broadly.
- E2E coverage can become flaky if added before source behavior is stable.
- Rating display formatting fixes must not alter numeric sorting, RPC parsing, settlement, or leaderboard authority.

## Locked Implementation Decisions

The user accepted the implementation agent's recommendations on 2026-06-24. Treat these as Phase 32 decisions unless a later explicit prompt revises them.

- Rematch refresh should use a conservative hybrid: immediate refresh after request/cancel/decline/accept and on Multiplayer entry or selected-game changes, plus a short visible-panel polling cadence while an eligible terminal Practice postgame panel is visible and the document is visible. Default cadence: 5 seconds. Pause while hidden or inactive. Do not add Supabase realtime unless Stage 32.1 proves polling/reconciliation is insufficient.
- Rematch decline/cancel/created states should use in-panel status as the required path. Do not add foreground/browser notifications for rematch lifecycle in Phase 32 unless existing notification architecture can be reused without broadening the phase.
- Ranked queue creator auto-routing should continue while the Multiplayer tab/postgame context is active and the document is visible, not only while the terminal postgame panel is visible. Use an immediate check after entering queue plus a 5-second visible polling cadence, then select/open the finalized game through the existing trusted queue/finalization path.
- Lobby creator auto-routing should open a newly joined creator-owned game when the viewer is on the associated waiting lobby/setup surface or has no actively inspected selected game. It should not steal focus from a different active game the viewer is deliberately inspecting; surface a visible attention cue instead if needed.
- Opponent identity labels should be viewer-derived, not persisted as viewer-specific canonical labels. Preserve `You` only for the viewer's own seat. For opponents, prefer participant-private profile summaries inside participant views, then public-safe profile summaries when visibility/moderation allows, then a generic fallback such as `Rival` or `Host` only when no safe name exists.
- No-comma formatting applies to Elo/rating values and rank labels tied to rating/leaderboard rows. Counts such as games played may keep existing local formatting unless a touched component has a clear consistency reason to change them. Use a dedicated rating/rank formatter rather than broad numeric formatting changes.
- Real two-client Supabase-backed E2E belongs in the late verification/hardening stage after source fixes are stable. Earlier stages should add focused unit, repository, and component tests first.
- Clickable public profile navigation, in-game identity/Elo cards, clickable leaderboard names, Settings Danger Zone actions, and History replay/detail views remain deferred future work and should not be pulled into Phase 32 stabilization.

## Next Gated Action

Create `planning/phase-32/IMPLEMENTATION-PLAN.md` to turn this specification into an execution plan. Do not begin Stage 32.0, source/runtime implementation, test implementation, Supabase migrations, deployments, commits, pushes, pull requests, merges, releases, branch deletion, Phase 33 ranked expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, or original stable repository work until separately authorized.
