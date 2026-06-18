# Progress Step 205: Phase 28 Stage 28.1 Live And Notification Reproduction/Audit

**Status**: Completed - Awaiting User Review Before Stage 28.2.
**Date**: 2026-06-17.
**Repository**: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Branch**: `main`.

## Authorization

The user authorized Phase 28 Stage 28.1 only: Live And Notification Reproduction/Audit.

Authorized work:

- read required governance, Phase 28 planning/spec/implementation materials, progress records, relevant Live v1 spectator, notification, Settings, sound, Elo/rating, multiplayer repository/view-model/UI, tests, E2E specs, and Supabase/RLS spectator context;
- create this Stage 28.1 progress report and append the matching `progress/PROGRESS.csv` row;
- reproduce or audit the Stage 28.1 Live and notification issues;
- run focused read-only, browser, and resource checks needed to diagnose the route;
- report whether Stage 28.2 migration/RLS addendum planning is required.

Not authorized:

- source/runtime implementation;
- test implementation;
- Supabase migration creation or execution;
- Vercel configuration;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 29 work;
- new custom skills;
- force-push;
- secret printing;
- public/guest spectation;
- public profiles;
- public leaderboards;
- service workers or push infrastructure;
- gameplay-rule changes;
- original stable `brrrdle` repository work.

## Starting Repository State

Confirmed before editing:

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- branch: `main`
- `HEAD`: `a051931dad51e554be151bc45e811efc18f4f04d`
- `origin/main`: `a051931dad51e554be151bc45e811efc18f4f04d`
- remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`
- original stable repo: not used; this pass stayed inside `brrrdle-dev`

Existing uncommitted Phase 28 planning/spec/progress artifacts were present and preserved.

## Pre-Audit Resource Snapshot

- Watched ports `5173`, `5174`, `3000`, and `4173`: no listening processes reported.
- Process-name summary showed existing Chrome, Codex helper, and Node processes; no watched app-port listener was reported.
- Disk snapshot for the repo volume: `460Gi` size, `339Gi` used, `64Gi` available, `85%` capacity.
- Load/memory snapshot: load averages around `4.44 4.68 4.56`; `vm_stat` showed low free pages and active compressor usage before audit.

## Audit Findings

- **Live spectator 30-second delay confirmed**: `src/app/App.tsx` loads authenticated spectator rows with `loadAuthenticatedLiveSpectatorRows(...)`, calls `refresh()` immediately after auth/client readiness, then uses `setInterval(refresh, 30_000)`. The effect is not keyed to the Live subtab or Page Visibility API today, so authenticated nonparticipant spectator rows can lag until the next 30-second poll.
- **Participant Live rows use a separate realtime path**: the multiplayer repository subscription still loads/saves the full participant-owned multiplayer state. The observed polling delay is specific to sanitized nonparticipant spectator rows, not participant resume rows.
- **`Spectate live game` focused-view gap confirmed**: `src/multiplayer/MultiplayerLive.tsx` handles spectator card clicks by calling `onSelectGame?.(game.id)`. The selected spectator details render inline under the same Live card. `src/multiplayer/MultiplayerWorkspace.tsx` keeps this inside the Live panel rather than opening a focused route, full-page view, or focused workspace subview.
- **Terminal spectator disappearance confirmed**: `src/multiplayer/multiplayerViewModels.ts` filters both participant Live rows and spectator rows to `status === 'playing'`. `src/multiplayer/multiplayerRepository.ts` only parses authenticated spectator rows with `status: 'playing'`, and the Phase 26 spectator RPC filters `game.status = 'playing'`. There is no current terminal spectator row contract or app-side terminal hold.
- **Current Daily Multiplayer spectator discovery exposure confirmed**: the Phase 26 sanitized RPC returns `daily_date_key` but has no current-Daily or Daily-scope exclusion predicate; app-side Live view models also do not filter Daily spectator rows. A current Daily game with two non-viewer participants and `status = 'playing'` is eligible for authenticated nonparticipant spectator discovery.
- **Browser notification delivery gap confirmed**: Settings and permission helpers exist, notification view models exist, and notification sounds are dispatched through `selectNotificationSoundDecision`. A repository search found no `new Notification(...)` dispatch path. The current browser-notification surface can request/report permission and store the preference, but does not actually create foreground browser notifications.
- **Elo transparency source confirmed**: `src/multiplayer/rating.ts` defines the Phase 27 Elo constants and formula source of truth: initial rating `1200`, provisional window `10`, provisional K `40`, established K `24`, and standard 400-point expected score. No Elo model changes are needed for Stage 28.1.

## Stage 28.2 Decision

Stage 28.2 migration/RLS addendum planning is required before Live spectator app implementation.

Rationale:

- Current Daily Multiplayer answer leakage should be blocked at the sanitized RPC boundary, with app-side filtering as defense in depth.
- Terminal spectator hold likely needs a changed or companion sanitized RPC return contract because current SQL and DTO parsing only allow `playing` rows.
- The addendum should define exact status eligibility, Daily exclusion semantics, sanitized terminal end-state fields, grants, rollback plan, and non-printing privacy probes before any migration is created or applied.

Notification delivery and focused spectator view work appear app-side and should wait for later Stage 28 implementation gates after the RPC/RLS path is planned and, if authorized, applied.

## Browser And Resource Notes

- No local dev server or browser reproduction was started. The relevant symptoms were confirmed from exact source and SQL paths.
- Post-audit watched ports `5173`, `5174`, `3000`, and `4173`: no listening processes reported.
- Process-name summary still showed existing Chrome, Codex helper, and Node processes; no watched app-port listener was reported.
- Disk snapshot for the repo volume stayed at `460Gi` size, `339Gi` used, `64Gi` available, `85%` capacity.
- Post-audit load/memory snapshot: load averages around `3.49 4.32 4.44`; `vm_stat` still showed low free pages and active compressor usage.

## Verification

Passed:

- `git diff --check`
- Python `csv` shape check with `PYTHONDONTWRITEBYTECODE=1 PYTHONNOUSERSITE=1 python3 -S` streaming parser: `rows=207 columns=12 last_id=205`
- `git status --short --branch`

## Blockers

None. Stage 28.1 completed with a clear Stage 28.2 migration/RLS addendum planning requirement.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 29 work, new custom skills, force-push, secret printing, public/guest spectation, public profiles, public leaderboards, service workers or push infrastructure, gameplay-rule changes, or original stable `brrrdle` repository work was performed.
