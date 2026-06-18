# Live v1 Spectator Refresh Diagnosis

**Status**: Phase 28 planning seed.
**Authority**: Diagnostic note only. This document does not authorize implementation, schema changes, deployment, or release work.
**Created**: 2026-06-16.

**Related intake**: See `planning/phase-28/PHASE-28-SCOPE-INTAKE-AND-ROUTING.md` for the broader Phase 28 routing decision that pairs this refresh work with focused spectator view, terminal spectator hold, current Daily spectation exclusion, notification delivery, and Elo transparency planning.

## Purpose

This note records the current Live v1 refresh behavior and the recommended Phase 28 direction for making authenticated spectator views feel faster without weakening the existing privacy and gameplay boundaries.

## Current Behavior

The Multiplayer Live subtab combines two different data paths:

1. Participant-owned Live rows.
2. Authenticated nonparticipant spectator rows.

Participant-owned rows use the normal Supabase multiplayer repository. The repository subscribes to `postgres_changes` on `public.async_multiplayer_games`, then calls its internal refresh path when Supabase emits a table-change event. This is the near-realtime path used for games the current signed-in user is playing or can resume.

Authenticated nonparticipant spectator rows use a separate sanitized RPC path:

- `loadAuthenticatedLiveSpectatorRows(...)`
- `get_authenticated_live_v1_spectator_games`

The app currently loads these spectator rows immediately after the signed-in Supabase-backed app state is ready, then polls again every 30 seconds through `setInterval(refresh, 30_000)`.

The Live view model merges participant rows and spectator rows into one sorted Live list. Participant rows remain resumable. Spectator rows remain read-only and expose only spectator-safe details.

## Why Spectator Rows Poll

The active multiplayer table, `async_multiplayer_games`, stores raw game projection data. That projection includes answer-bearing and session-bearing state that must not be broadly exposed to nonparticipants.

Live v1 therefore uses a sanitized authenticated RPC for spectator discovery instead of broadening raw table reads. This preserves the Phase 26 privacy boundary:

- no raw `projection`;
- no `serializedSession`;
- no `playerSessions`;
- no answer fields or seeds;
- no raw auth emails or private profile data;
- no spectator mutation authority.

Because the spectator projection is currently returned by a request/response RPC rather than a realtime-subscribed sanitized projection, spectator rows refresh on the app's polling cadence.

## Observed Delay

For authenticated nonparticipant spectators, the current implementation can show move and turn updates up to about 30 seconds after a participant move is saved. The average perceived delay is roughly half the interval, depending on where the move lands in the polling cycle.

If a participating player sees the same delay for their own Live row, that is a separate issue. Participant-owned rows are expected to update through the Supabase realtime repository path rather than the 30-second spectator polling loop.

## Recommended Phase 28 Direction

Phase 28 should improve the perceived Live spectator refresh rate without turning the spectator path into a raw-data subscription.

Recommended behavior:

1. Refresh spectator rows immediately when the user opens the Multiplayer Live subtab.
2. Poll spectator rows faster only while the Live subtab is active and the document is visible.
3. Use a 3-5 second foreground Live polling cadence, with 5 seconds as the conservative default.
4. Keep a slower cadence, such as the current 30 seconds, when the user is signed in but not viewing Live.
5. Pause or slow polling when the browser tab is hidden.
6. Keep the existing in-flight guard so overlapping RPC calls do not pile up.
7. Keep participant-owned Live rows on the current realtime repository subscription path.
8. Preserve the sanitized RPC and strict app-side DTO parsing.
9. Do not broaden raw `async_multiplayer_games` SELECT access for nonparticipants.

This approach gives spectators a much more live-feeling experience while keeping request volume bounded and keeping the existing privacy model intact.

## Implementation Notes For Later Planning

Likely implementation surfaces:

- `src/app/App.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- Live v1 spectator component and repository tests

Potential implementation shape:

- Extract the spectator refresh cadence decision into a small helper or hook if it keeps `App.tsx` from growing too much.
- Include `multiplayerSubtab` and route visibility in the spectator refresh effect so foreground Live can use a faster interval.
- Trigger an immediate refresh when entering the Live subtab.
- Use the Page Visibility API to avoid aggressive background polling.
- Preserve the current signed-out behavior: no spectator rows and no public/guest spectation.
- Preserve the current read-only spectator UI: no submit, join, cancel, forfeit, timer mutation, rating mutation, or claim mutation controls.

## Acceptance Criteria

Phase 28 implementation should be considered successful if:

- authenticated spectators see participant moves reflected in the Live subtab on the faster foreground cadence;
- participant-owned Live rows continue to use realtime repository refresh behavior;
- non-Live app surfaces do not generate unnecessary high-frequency spectator RPC traffic;
- hidden/background tabs do not keep aggressive polling active;
- spectator rows remain sanitized and read-only;
- public/guest spectation remains unavailable unless a later approved phase explicitly changes that;
- tests cover refresh cadence decisions, Live subtab entry refresh, hidden-tab throttling, and privacy-preserving spectator projections.

## Deferred Alternative

A future phase could consider a true sanitized realtime spectator projection. That would need a separate privacy and RLS design because Supabase realtime on raw `async_multiplayer_games` is not appropriate for nonparticipant spectators. The Phase 28 recommendation is to improve the existing sanitized RPC polling cadence first.
