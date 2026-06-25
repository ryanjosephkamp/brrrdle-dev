# Progress Step 250: Phase 32 Stage 32.1 Audit

**Date:** 2026-06-24
**Phase:** Phase 32 Stage 32.1 - Reproduction and audit
**Status:** Completed - Awaiting User Review Before Stage 32.2 Migration/RLS Addendum Planning

## Authority

User authorized Phase 32 Stage 32.1 audit only for multiplayer stabilization, identity routing, account avatar accent propagation, and rating display consistency.

This pass may read governance, Phase 32 planning/spec/implementation artifacts, progress records, docs, relevant source/test surfaces, and Supabase/RLS context; create this progress report and the matching CSV row; run focused audit/reproduction checks; run watched-port/process/resource checks; decide whether Stage 32.2 migration/RLS addendum planning is required; and run lightweight verification.

## Boundaries

This pass does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, deployment, commits, pushes, PR creation, merge, release, branch deletion, Stage 32.2, Phase 33 ranked mode expansion, public/guest spectation, service workers, push infrastructure, Elo/gameplay changes, new custom skills, force-push, secret printing, private data exposure, local session artifact exposure, or original stable repository work.

## Initial State

- Repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- `origin/main`: `d4d1957fa61da14a62de2c7cf32ff50996e87523`
- Original stable repository: not used.
- Existing uncommitted work preserved: Phase 32 planning/spec/progress artifacts plus the Stage 32.0 baseline test-fixture repair.

## Audit Targets

- Global account avatar accent propagation after private profile save.
- One-request rematch visibility and opponent accept/decline/cancel/expiry/created-state synchronization.
- Eligible unranked non-custom Practice rematch accept and safe game projection behavior.
- Ranked Practice search-again creator auto-routing.
- Lobby/queue creator auto-routing when a rival joins or matches.
- Opponent labels incorrectly showing `You` or generic `Rival` despite safe profile data.
- Comma-formatted Elo/rating/rank labels.
- Need for Stage 32.2 migration/RLS addendum planning.

## Verification Plan

- Watched-port/process/resource checks before and after any browser/dev-server work.
- Focused source/test audit and browser checks only if required.
- `git diff --check`
- Python CSV shape check using `python3 -S`
- `git status --short --branch`

## Findings

- **Global account avatar accent:** confirmed source-level bug. `AccountBadge` re-renders after private profile save because `App` refreshes auth state, but the badge uses `profile.gradient`, not `profile.accentColor`, for the initials circle. This explains the saved accent not changing the top-right avatar chip.
- **Eligible rematch accept failure:** confirmed source-level bug. New unranked Practice games currently receive `ratingBucket: getRatingBucket(mode)` even when `ranked` is false. Direct-rematch projection rejects any source game with `ratingBucket`, so a normal unranked five-letter Practice OG game can fail with `Unable to create a safe rematch game from this result.` The fix should stop writing rating buckets on unranked game creation and tolerate existing legacy unranked projections without loosening Daily/ranked/custom/nonterminal exclusions.
- **One-request rematch visibility and decline/requester updates:** confirmed source-level synchronization gap. The app lists rematch requests on selected-game/status/update changes and upserts only the local action result. There is no rematch-table realtime subscription and no polling/refresh bridge, so the opponent and requester can remain stale until another refresh occurs. Existing participant-scoped rematch RPCs can list request/decline/cancel/created/expired state, so this part does not require a migration.
- **Rematch RPC contract:** reviewed Phase 31 SQL. The existing accept/decline/cancel/list RPCs enforce participant scope, requester/opponent capabilities, expiry, created/idempotent state, same-settings game creation, and forbidden direct Daily/ranked/custom rematch behavior. No rematch-table SQL change is required for the observed lifecycle bugs if the app adds the planned refresh path.
- **Ranked Practice search-again creator auto-routing:** confirmed source-level gap. The creator finalizes only if the immediate claim finds a match or if they manually run `Check ranked queue`; no visible queued-request polling auto-finalizes for the creator after another player matches.
- **Lobby/queue creator auto-routing:** confirmed source-level gap. Repository snapshots refresh when `async_multiplayer_games` changes, but `App` only stores the new multiplayer snapshot; it does not route/select the creator into a newly joined lobby or matched game. `MultiplayerPanel` keeps controlled/previous selection unless the user selects/resumes a game.
- **Opponent labels showing `You` or generic `Rival`:** confirmed source-level bug and contract gap. Stored player labels are not viewer-specific: `createMultiplayerGame` falls back to `You` for `player-one` and `Rival` for `player-two`. Ranked queue finalization currently includes only the current viewer's profile summary, so the other seat can remain generic or, for the player-two viewer, render the opponent as `You`. Existing public-profile RPCs read by opaque `public_profile_id`, not participant auth id, so resolving safe public opponent names for ranked queue/game participants likely needs an additive participant-scoped public-safe identity RPC or equivalent contract.
- **No-comma Elo/rating display:** confirmed source-level display bug. Public ranked leaderboard view models use `Intl.NumberFormat('en-US')`, and current tests expect `1,260`, `1,290`, and `1,205`. Ratings/Elo should use a no-comma formatter in the implementation stage.
- **Browser/dev-server decision:** no local dev server was started. Source/test/SQL audit was sufficient to reproduce the deterministic root causes without exposing private sessions or local browser artifacts.
- **Stage 32.2 decision:** required. The rematch lifecycle, ranked queue polling, lobby routing, account accent, and no-comma rating fixes are app-side, but opponent identity requires a privacy-safe participant identity contract that is not currently available through the Phase 29 public-profile RPCs.

## Verification Results

- Passed: `git diff --check`.
- Passed: Python CSV shape check using `python3 -S` reported `rows=252 columns=[12] last_id=250`.
- Passed: `git status --short --branch` showed the expected existing Phase 32 planning/docs/progress changes, the Stage 32.0 baseline test-fixture repair, and the new Stage 32.1 progress report.
- Resource/process checks: ports `5173`, `5174`, `3000`, and `4173` were clear before and after the audit; no obvious `vite`, `vitest`, `playwright`, `npm run dev`, `npm run test`, or `playwright test` processes were found; no local dev server or browser session was started.
- Disk/load/memory: local disk showed about `70Gi` available; load remained elevated but stable for this workstation; memory pressure remained pre-existing with compressor pages present.

## Next Gate

Review Stage 32.1 audit findings. If approved, authorize Stage 32.2 migration/RLS addendum planning for a narrow privacy-safe participant identity projection before source/runtime implementation.
