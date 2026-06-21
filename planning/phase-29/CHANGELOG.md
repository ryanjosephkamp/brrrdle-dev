# Phase 29 Changelog

**Status**: Handoff note for completed Phase 29 implementation; final Stage 29.7 verification passed.
**Repository**: `brrrdle-dev`.
**Authority**: Supporting summary under `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-29/PLANNING-BRIEF.md`, `planning/specs/phase-29/PHASE-29-PUBLIC-PROFILES-NOTIFICATION-ACTIONS-AND-ELO-ABOUT-SPEC-2026-06-20.md`, the Phase 29 public profile migration/RLS addendum, and `planning/phase-29/IMPLEMENTATION-PLAN.md`.

## Summary

Phase 29 added privacy-safe public player profile foundations and completed narrow Phase 28 carryover stabilization for notification action routing, Notification Center action cleanup, and About-tab Elo transparency placement.

Completed outcomes:

- planned Phase 29 as public profile foundations plus narrow notification and Elo/About carryover work;
- created a unified Phase 29 specification and staged implementation plan;
- audited profile, notification, route, and Elo/About surfaces before implementation;
- planned and applied one additive public profile migration/RLS contract;
- added default-private public profile storage with opaque public profile IDs and allow-listed public fields;
- added app-side public profile repository/domain seams and owner editing foundations for display name, visibility, accent/flair, avatar URL, and optional bio;
- preserved private account metadata, raw auth IDs, raw emails, private ranked projections, game/session/answer/seed data, and local/session artifacts outside public profile reads;
- aligned the public profile preview avatar background with the selected public accent instead of the private account avatar gradient;
- wired foreground browser notification clicks through existing dashboard action targets when the page context is alive;
- added a top-level Notification Center `Mark all read` action for visible unread notifications;
- simplified visible Notification Center action copy by keeping read as the primary action and renaming the secondary dismissal behavior to `Hide` while preserving `dismissedAt` metadata compatibility;
- moved expanded ranked Elo explanation into the About tab;
- added compact ranked-surface `How is Elo calculated?` actions that route and focus the About Elo section;
- preserved Phase 28 Live spectator behavior, Phase 27 ranked Practice behavior, Daily Multiplayer invariants, no-service-worker/no-push notification boundaries, and gameplay rules.

## Explicit Deferrals

Phase 29 did not include:

- public leaderboards, routed to Phase 30;
- multiplayer postgame rematch or same-settings play-again/search-again flows, routed to Phase 31;
- public/guest spectation, routed to Phase 32 behind separately approved sanitized public projections;
- theme proposal/template modernization, routed to Phase 33;
- full concrete theme implementation, routed to Phase 34 or later;
- service workers, push subscriptions, background push, cross-device notification infrastructure, or deployment configuration;
- new ranked match types, Daily ranked, timed Practice ranked, scoring-rule changes, Elo model changes, or gameplay-rule changes;
- deployment, release, commits, pushes, PR creation, merge, or branch deletion.

## Migration/RLS Notes

Phase 29 created and applied one additive migration to the confirmed `brrrdle-dev` Supabase project:

- `supabase/migrations/20260621003033_phase29_public_profile_rls.sql`

The migration adds the public profile contract for:

- `public.public_player_profiles`;
- opaque `public_profile_id` values for public identity links;
- default-private visibility;
- owner-only authenticated profile write/read RPCs;
- allow-listed public read RPCs for public active profiles only;
- grants, RLS, validation helpers, and updated timestamp behavior.

The migration does not expose private `profiles`, raw auth emails, raw auth IDs, private account metadata, private progress, private ranked projections, game/session/answer/seed data, Live spectator internals, tokens, or local/session artifacts.

## Verification Source

The canonical verification evidence remains in the progress ledger, especially:

- `progress/PROGRESS-STEP-216.md` for Stage 29.1 reproduction/audit;
- `progress/PROGRESS-STEP-217.md` for Stage 29.2 public profile migration/RLS addendum planning;
- `progress/PROGRESS-STEP-218.md` for Stage 29.3 migration/RLS execution and privacy probes;
- `progress/PROGRESS-STEP-219.md` for Stage 29.4 public profile app foundations;
- `progress/PROGRESS-STEP-220.md` for Stage 29.5 notification click routing and Notification Center cleanup;
- `progress/PROGRESS-STEP-221.md` for Stage 29.6 Elo/About transparency relocation;
- `progress/PROGRESS-STEP-222.md` for final Stage 29.7 cleanup, full verification, and handoff readiness.

## Handoff Notes

- Keep the original stable `brrrdle` repository untouched.
- Keep public profile reads allow-listed, opt-in, and default-private.
- Do not use public profiles as gameplay, rating, notification, or account authority.
- Keep public leaderboards unavailable until Phase 30 defines the public ranking projection contract.
- Keep public/guest spectation unavailable until a later approved phase defines sanitized public projections.
- Keep browser notifications local and foreground-capable only; do not add service workers or push infrastructure without later approval.
- Keep ranked Practice v1 as the only ranked match type and keep match points separate from Elo/rank movement.
- Keep the Live spectator E2E isolated to the current test-run participant labels so older visible Live rows in the dev database cannot make the focused spectator selector ambiguous.
