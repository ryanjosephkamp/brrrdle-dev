# Phase 28 Changelog

**Status**: Handoff note for completed Phase 28 implementation; final Stage 28.7 verification passed.
**Repository**: `brrrdle-dev`.
**Authority**: Supporting summary under `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-28/PLANNING-BRIEF.md`, `planning/specs/phase-28/PHASE-28-LIVE-SPECTATOR-NOTIFICATIONS-AND-ELO-TRANSPARENCY-SPEC-2026-06-17.md`, the Phase 28 Live spectator migration/RLS addendum, and `planning/phase-28/IMPLEMENTATION-PLAN.md`.

## Summary

Phase 28 stabilized existing authenticated Live v1 spectator and notification behavior before public identity, public leaderboards, public/guest spectation, multiplayer postgame actions, or theme work.

Completed outcomes:

- confirmed the authenticated nonparticipant Live spectator path used a 30-second polling delay and documented the app/RPC route;
- planned and applied one additive authenticated-only Live spectator v2 RPC migration for current Daily exclusion and bounded sanitized terminal hold rows;
- updated app spectator discovery to consume `get_authenticated_live_v1_spectator_games_v2`;
- added immediate Live entry refresh and a 5-second active-visible spectator polling cadence while preserving conservative inactive/hidden behavior;
- made `Spectate live game` open a focused read-only spectator panel instead of only expanding an inline card;
- added sanitized terminal board/outcome hold behavior before terminal spectator rows disappear;
- kept current Daily Multiplayer rows excluded from spectator discovery at both the RPC and app-defense layers;
- restored foreground browser notification delivery within the existing no-service-worker/no-push notification architecture;
- kept browser notifications permission-gated, preference-gated, deduped, route-suppressed when already on-target, hidden-document capable, privacy-redacted, and silent so app sound preferences remain authoritative;
- added ranked Elo transparency documentation and in-app copy without changing the Phase 27 Elo model;
- preserved Phase 27 ranked Practice queue/settlement behavior, Live v1 privacy, Daily Multiplayer invariants, unranked/custom flows, and gameplay rules.

## Explicit Deferrals

Phase 28 did not include:

- public player profiles, routed to Phase 29;
- public leaderboards, routed to Phase 30;
- multiplayer postgame rematch or same-settings play-again/search-again flows, routed to Phase 31;
- public/guest spectation, routed to Phase 32 behind separately approved sanitized public projections;
- theme proposal/template modernization, routed to Phase 33;
- full concrete theme implementation, routed to Phase 34 or later;
- service workers, push subscriptions, background push, or cross-device notification infrastructure;
- new ranked match types, Daily ranked, timed Practice ranked, scoring-rule changes, Elo model changes, or gameplay-rule changes;
- deployment, release, commits, pushes, PR creation, merge, or branch deletion.

## Migration/RLS Notes

Phase 28 created and applied one additive migration to the confirmed `brrrdle-dev` Supabase project:

- `supabase/migrations/20260618004638_phase28_live_spectator_v2_daily_terminal_hold.sql`

The migration preserves the Phase 26 v1 spectator RPC and adds companion RPC `public.get_authenticated_live_v1_spectator_games_v2(p_limit integer default 50, p_terminal_window_seconds integer default 15)`.

The v2 RPC remains authenticated-only and sanitized. It excludes current UTC-day Daily Multiplayer rows, returns bounded terminal rows for approved terminal statuses, keeps all spectator capabilities false, and does not grant broad raw `async_multiplayer_games` access to nonparticipants.

## Verification Source

The canonical verification evidence remains in the progress ledger, especially:

- `progress/PROGRESS-STEP-205.md` for Stage 28.1 Live and notification reproduction/audit;
- `progress/PROGRESS-STEP-206.md` for Stage 28.2 Live spectator migration/RLS addendum planning;
- `progress/PROGRESS-STEP-207.md` for Stage 28.3 migration/RLS execution and privacy probes;
- `progress/PROGRESS-STEP-208.md` for Stage 28.4 Live spectator app implementation;
- `progress/PROGRESS-STEP-209.md` for Stage 28.5 notification delivery stabilization;
- `progress/PROGRESS-STEP-210.md` for Stage 28.6 Elo transparency documentation and in-app copy;
- `progress/PROGRESS-STEP-211.md` for final Stage 28.7 cleanup, full verification, and handoff readiness.

## Handoff Notes

- Keep the original stable `brrrdle` repository untouched.
- Treat Live v1 spectator access as authenticated-only and read-only.
- Keep public/guest spectation unavailable until a later approved phase defines sanitized public projections.
- Keep current Daily Multiplayer games excluded from spectator discovery to prevent answer leakage.
- Keep browser notifications local and foreground-capable only; do not add service workers or push infrastructure without later approval.
- Keep ranked Practice v1 as the only ranked match type and keep match points separate from Elo/rank movement.
- Do not expose private leaderboard-ready projections publicly until public identity/privacy work is approved and implemented.
