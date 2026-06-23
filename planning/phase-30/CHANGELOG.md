# Phase 30 Changelog

**Status**: Handoff note for completed Phase 30 implementation; final Stage 30.7 verification passed.
**Repository**: `brrrdle-dev`.
**Authority**: Supporting summary under `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-30/PLANNING-BRIEF.md`, `planning/specs/phase-30/PHASE-30-PUBLIC-LEADERBOARDS-AND-MULTIPLAYER-OVERVIEW-CLEANUP-SPEC-2026-06-22.md`, the Phase 30 public leaderboard migration/RLS addendum, `planning/phase-30/DEFERRED-RANKED-MODES-ROUTING.md`, and `planning/phase-30/IMPLEMENTATION-PLAN.md`.

## Summary

Phase 30 added privacy-safe public ranked Practice leaderboards and completed the small Multiplayer Overview cleanup requested from the user-provided screenshots.

Completed outcomes:

- planned Phase 30 as public leaderboards plus narrow Multiplayer Overview cleanup;
- created a unified Phase 30 specification, detailed implementation plan, and deferred ranked-mode routing note;
- routed timed Practice ranked and Daily ranked to Phase 32 ranked mode expansion / competitive ladder v2 instead of adding them to Phase 30;
- audited public profile, private ranked projection, rating, stats/history, Supabase/RLS, and Multiplayer Overview surfaces before implementation;
- planned and applied one additive authenticated-only public leaderboard RPC migration;
- added app-side public ranked leaderboard domain and repository seams with strict DTO parsing, request normalization, and forbidden-field rejection;
- added a Stats-route public ranked Practice leaderboard UI with signed-in gating, bucket filters, row limits, loading/error/empty states, public profile identity display, provisional state, latest movement, and peak rating display;
- made the existing Stats route visible in the primary navigation so the public leaderboard is reachable;
- removed the redundant secondary Multiplayer Overview shortcut row while preserving the main subtab row and badge/count behavior;
- removed the confusing `Select`/`Selected` active-game-card affordance while preserving `Resume`, visual selected-game state, selected-game routing, active-game routing, lobby routing, Live routing, and focused spectator routing;
- preserved Phase 29 public profile boundaries, Phase 28 Live behavior, Phase 27 ranked Practice behavior, Daily Multiplayer integrity, and gameplay rules.

## Explicit Deferrals

Phase 30 did not include:

- multiplayer postgame rematch or same-settings play-again/search-again flows, routed to Phase 31;
- ranked mode expansion / competitive ladder v2, routed to Phase 32, including timed Practice ranked first and Daily ranked only after claim-safety proof;
- public/guest spectation, routed to Phase 33 behind separately approved sanitized public projections;
- theme proposal/template modernization, routed to Phase 34;
- full concrete theme implementation, routed to Phase 35 or later;
- service workers, push subscriptions, background push, or cross-device notification infrastructure;
- new ranked match types, Daily ranked, timed Practice ranked, ranked custom/private-code games, rank-label authority, scoring-rule changes, Elo model changes, or gameplay-rule changes;
- deployment, release, commits, pushes, PR creation, merge, or branch deletion.

## Migration/RLS Notes

Phase 30 created and applied one additive migration to the confirmed `brrrdle-dev` Supabase project:

- `supabase/migrations/20260623011923_phase30_public_ranked_leaderboard_rpc.sql`

The migration adds authenticated-only RPC `public.get_public_ranked_leaderboard(p_bucket text default null, p_limit integer default 50, p_offset integer default 0)`.

The RPC is a `security definer` allow-listed projection for ranked Practice v1 leaderboard rows. It returns active public profile identity plus aggregate rating fields for `multiplayer:og` and `multiplayer:go` buckets only. It omits private, hidden, suspended, missing-profile, and zero-game users.

The RPC must not expose raw auth emails, raw auth ids, private profile metadata, private progress, answer-bearing data, seeds, sessions, raw game projections, local artifacts, private ranked projections, raw rating transaction ids, match ids, queue ids, settlement ids, or unapproved rating transaction internals.

## Verification Source

The canonical verification evidence remains in the progress ledger, especially:

- `progress/PROGRESS-STEP-228.md` for Stage 30.1 public leaderboard and Multiplayer Overview audit;
- `progress/PROGRESS-STEP-229.md` for Stage 30.2 public leaderboard migration/RLS addendum planning;
- `progress/PROGRESS-STEP-230.md` for Stage 30.3 migration/RLS execution and privacy probes;
- `progress/PROGRESS-STEP-231.md` for Stage 30.4 public leaderboard domain/repository foundations;
- `progress/PROGRESS-STEP-232.md` for Stage 30.5 public leaderboard UI;
- `progress/PROGRESS-STEP-233.md` for Stage 30.6 Multiplayer Overview cleanup;
- `progress/PROGRESS-STEP-234.md` for final Stage 30.7 cleanup, full verification, and handoff readiness.

## Handoff Notes

- Keep the original stable `brrrdle` repository untouched.
- Keep public leaderboard reads authenticated-only unless a later approved addendum broadens access.
- Keep public leaderboard identity tied to Phase 29 public active profiles only.
- Keep private ranked leaderboard-ready projections private/internal.
- Keep leaderboards display-only; they do not settle matches, mutate Elo, change profile visibility, alter Daily claims, or drive gameplay authority.
- Keep ranked Practice v1 as the only ranked match type until Phase 32 or a later approved spec changes it.
- Keep Daily ranked, timed Practice ranked, and ranked custom/private-code games deferred.
- Keep public/guest spectation unavailable until a later approved phase defines sanitized public projections.
- Keep the Multiplayer Overview free of the redundant secondary shortcut row and the ambiguous `Select`/`Selected` active-game action.
