# Phase 26 Changelog

**Status**: Handoff note for completed Phase 26 implementation; final Stage 26.7 verification passed.
**Repository**: `brrrdle-dev`.
**Authority**: Supporting summary under `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-26/PLANNING-BRIEF.md`, `planning/specs/phase-26/PHASE-26-POLISH-NOTIFICATIONS-AND-LIVE-V1-SPEC-2026-06-15.md`, and `planning/phase-26/IMPLEMENTATION-PLAN.md`.

## Summary

Phase 26 has implemented the current-surface polish and notification/Live v1 expansion scope without changing gameplay rules. It is ready for Git handoff preparation under separate explicit authorization.

Completed outcomes:

- responsive shell, dashboard, and multiplayer workspace hardening for Chrome zoom and narrow-width layouts;
- notification Settings with guest/cloud-synced preference persistence;
- important-only notification sound decisions gated by master sound and notification preferences;
- local, optional, foreground-only browser notification controls with no service workers or push infrastructure;
- authenticated Live v1 spectator projection through a separately authorized Supabase RPC migration/RLS gate;
- read-only authenticated spectator discovery and detail viewing in Multiplayer Live;
- final visual polish, accessibility, copy cleanup, and Stage 26.7 hardening work to date.

## Explicit Deferrals

Phase 26 did not include:

- Phase 31 theme proposal/template modernization or Phase 32+ full theme work;
- public or guest spectation;
- service workers, push infrastructure, background notification delivery, or cross-device notification delivery;
- Elo/ranking, ranked matchmaking, leaderboards, public player profiles, or social/community systems;
- deployment, release, merge, PR creation, or Git handoff actions.

## Verification Source

The canonical verification evidence remains in the progress ledger, especially:

- `progress/PROGRESS-STEP-174.md` for responsive hardening;
- `progress/PROGRESS-STEP-175.md` for notification preferences;
- `progress/PROGRESS-STEP-176.md` for notification sounds and browser controls;
- `progress/PROGRESS-STEP-179.md` for migration/RLS execution;
- `progress/PROGRESS-STEP-180.md` for Live v1 app implementation;
- `progress/PROGRESS-STEP-181.md` for visual polish and accessibility cleanup;
- `progress/PROGRESS-STEP-182.md` for final Phase 26 verification.

## Handoff Notes

- Keep the original stable `brrrdle` repository untouched.
- Treat the applied migration `supabase/migrations/20260615235440_phase26_live_v1_authenticated_spectator_projection.sql` as part of the Phase 26 handoff.
- Phase 27 should start from competitive ranking and ranked matchmaking planning, not additional Phase 26 feature work or theme work.
