# Phase 27 Changelog

**Status**: Handoff note for completed Phase 27 implementation; final Stage 27.8 verification passed.
**Repository**: `brrrdle-dev`.
**Authority**: Supporting summary under `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-27/PLANNING-BRIEF.md`, `planning/specs/phase-27/PHASE-27-COMPETITIVE-RANKING-AND-MATCHMAKING-SPEC-2026-06-16.md`, the Phase 27 migration/RLS addenda, and `planning/phase-27/IMPLEMENTATION-PLAN.md`.

## Summary

Phase 27 implemented the competitive ranking and ranked matchmaking foundation without changing core gameplay rules.

Completed outcomes:

- hardened Elo/rank, scoring-evidence, and matchmaking domain helpers;
- added trusted Supabase RPC/RLS authority for ranked Practice queue requests, queue cancellation, compatible pair claiming, queue status/seat assignment, trusted game finalization, and idempotent ranked settlement;
- added a narrow corrective settlement RPC migration to preserve unambiguous trusted profile upserts;
- integrated ranked Practice settlement through trusted RPCs without direct browser writes to protected rating tables;
- replaced local preview ranked pairing with durable authenticated ranked Practice queue behavior;
- clarified ranked eligibility, queue state, provisional rating, unrated outcomes, points-versus-Elo, and trusted settlement copy;
- added private/internal leaderboard-ready projections for later public leaderboard work without creating public routes, APIs, identity surfaces, or UI;
- preserved Live v1 spectator privacy, unranked/custom flows, Daily/timed ranked deferrals, Hard Mode matching, and all gameplay invariants.

## Explicit Deferrals

Phase 27 did not include:

- Daily ranked multiplayer;
- timed Practice ranked matchmaking;
- public leaderboards, routed to Phase 29;
- public player profiles, routed to Phase 28;
- public/guest spectation, routed to Phase 30 or later behind sanitized public projections;
- theme proposal/template modernization or full theme implementation, routed to Phase 31 and Phase 32 or later;
- deployment, release, merge, PR creation, or Git handoff actions.

## Migration/RLS Notes

Phase 27 created and applied these additive migrations to the confirmed `brrrdle-dev` Supabase project:

- `supabase/migrations/20260616054019_phase27_trusted_settlement_ranked_queue.sql`
- `supabase/migrations/20260616055149_phase27_settlement_rpc_unambiguous_profile_upsert.sql`
- `supabase/migrations/20260616165434_phase27_ranked_queue_game_finalization.sql`

The trusted RPC boundary remains authenticated-only. Browser clients must not directly write rating profile, match result, player result, rating transaction, or ranked queue authority state.

## Verification Source

The canonical verification evidence remains in the progress ledger, especially:

- `progress/PROGRESS-STEP-188.md` for Stage 27.1 domain hardening;
- `progress/PROGRESS-STEP-189.md` for Stage 27.2 migration/RLS addendum planning;
- `progress/PROGRESS-STEP-190.md` and `progress/PROGRESS-STEP-191.md` for Stage 27.3 and 27.3B migration/RLS execution;
- `progress/PROGRESS-STEP-192.md` for ranked settlement app integration;
- `progress/PROGRESS-STEP-193.md` through `progress/PROGRESS-STEP-196.md` for durable ranked queue blocker handling, addendum, migration, and app implementation;
- `progress/PROGRESS-STEP-197.md` for ranked multiplayer UI, stats, and copy;
- `progress/PROGRESS-STEP-198.md` for private leaderboard-ready projections;
- `progress/PROGRESS-STEP-199.md` for final Stage 27.8 verification.

## Handoff Notes

- Keep the original stable `brrrdle` repository untouched.
- Treat ranked Practice v1 as the only Phase 27 ranked match type.
- Keep match points separate from Elo/rank movement: points determine match result where gameplay rules require it; trusted ranked settlement determines rating movement from eligible ranked terminal outcomes.
- Do not expose private leaderboard-ready projections publicly until public identity/privacy work is approved and implemented in later phases.
