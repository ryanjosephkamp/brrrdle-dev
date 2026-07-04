# Phase 43 Ranked Queue Matching Fairness Addendum

**Status**: Migration/RLS contract addendum for review only.
**Phase**: Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort.
**Stage**: 43.2 - Ranked Practice queue contract planning.
**Date**: 2026-07-03.
**Repository**: `brrrdle-dev`.

## Authority

This addendum is governed by:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `planning/phase-43/PHASE-43-UI-UX-GAMEPLAY-INTAKE-2026-07-03.md`.
7. `planning/phase-43/PHASE-43-RECOMMENDATIONS-AND-ROUTING-2026-07-03.md`.
8. `planning/phase-43/PLANNING-BRIEF.md`.
9. `planning/specs/phase-43/PHASE-43-CURRENT-SURFACE-UX-CLEANUP-RANKED-QUEUE-GAMEPLAY-COMFORT-SPEC-2026-07-03.md`.
10. `planning/phase-43/IMPLEMENTATION-PLAN.md`.
11. `progress/PROGRESS-STEP-381.md`.
12. Existing ranked queue, trusted finalization, trusted settlement, and E2E harness contracts.

This document does not authorize SQL migration creation or execution. It does not authorize source/runtime edits, test edits, Supabase or Vercel configuration, deployment, Git/GitHub operations, public/guest spectator contract changes, spectator presence/count/list behavior, service workers, push infrastructure, gameplay-rule changes, Elo changes, local Codex skill changes, secret printing, private data exposure, local artifact exposure, or original stable `brrrdle` repository work.

## Baseline And Problem Statement

Phase 43 Stage 43.1 found that current ranked Practice client behavior can keep visible queued-state UI stable, but the reported three-player matching fairness issue is controlled by the server-side ranked queue claim contract.

The active matching RPC is `public.claim_ranked_async_matchmaking_pair(p_request_id text, p_matched_game_id text default null)`, most recently replaced by `supabase/migrations/20260626000925_phase33_timed_ranked_practice.sql`.

The current RPC selects a compatible queued candidate by:

- queued status;
- different user;
- async Practice ranked eligibility;
- same mode;
- same rating bucket;
- same Hard Mode setting;
- same word length;
- same ranked time control;
- unexpired request;
- compatible rating search band;
- then ordering by rating distance, queued time, and request id.

It does not encode recent-opponent avoidance, completed-game cooldown, or a preference for an already waiting third compatible player over an immediate rematch. Browser source cannot safely choose or reorder the server-selected opponent, so the fairness repair requires a narrow reviewed migration/RLS execution stage before source/UI work claims this issue is fixed.

## Contract Decision

Stage 43.2 should repair ranked queue fairness through an additive Supabase migration that preserves the current browser-facing RPC signatures and result shapes.

The preferred contract is a **soft recent-opponent penalty**:

- If a compatible non-recent opponent exists, `claim_ranked_async_matchmaking_pair` should prefer that non-recent opponent over a recently completed same-settings opponent.
- If the only compatible opponent is recent, the queue may still match that opponent rather than deadlocking or forcing indefinite waiting.
- If multiple candidates are equally non-recent or equally recent, preserve the existing rating-distance, queued-time, and id tie-break behavior as much as possible.

This resolves the Player 1/Player 2/Player 3 problem without changing Elo math, rank buckets, trusted settlement, Daily rules, gameplay, or browser privacy boundaries.

## In Scope For The Next Migration/RLS Execution Stage

Exactly one additive migration may be created after review to:

- add an internal helper or inline SQL condition that detects recent same-settings ranked Practice opponents server-side;
- replace `public.claim_ranked_async_matchmaking_pair(text, text)` with the same signature and returned table shape;
- preserve authenticated-only execution grants for ranked queue RPCs;
- preserve `anon` denial for ranked queue mutation/status/finalization RPCs;
- avoid direct browser table grants;
- preserve row locking, stale-row expiration, cancellation exclusion, queue idempotency, and `for update skip locked`;
- optionally add one narrow supporting index if the helper needs bounded lookup over ranked Practice terminal games;
- preserve no-clock ranked Practice and canonical five-minute timed ranked Practice support;
- preserve mode, word length, Hard Mode, rating bucket, rating search band, and exact ranked time-control compatibility;
- preserve `public.get_ranked_async_matchmaking_status` and `public.finalize_ranked_async_matchmaking_game` shapes unless the migration evidence proves they must be adjusted for the same narrow fairness contract.

## Out Of Scope

The next migration/RLS execution stage must not:

- alter Elo formulas, K factors, provisional windows, rank labels, settlement authority, or public leaderboard authority;
- change gameplay rules, scoring rules, Daily claim rules, or Daily ranked deferral;
- create ranked Daily, ranked private-code, ranked custom-code, or private ranked request behavior;
- expose raw auth ids, emails, private profile data, answers, seeds, sessions, queue internals beyond existing participant-owned RPC context, rating internals, settlement ids, tokens, secrets, local artifacts, screenshots, videos, traces, or auth state;
- broaden direct table access for `anon` or `authenticated`;
- add public/guest spectator contracts, spectator presence/count/list behavior, service workers, push subscriptions, deployment, release, Git/GitHub work, or source/UI implementation.

## Recent-Opponent Detection

The migration should derive recent-opponent state server-side.

Acceptable sources include terminal trusted ranked Practice game rows in `public.async_multiplayer_games`, optionally cross-checked with trusted settlement/result tables if that is safer. The repair should prefer a source that:

- is available immediately after a ranked Practice game reaches a terminal state;
- is participant-bounded and server-side;
- can be filtered to the same ranked settings;
- does not require browser clients to send raw opponent auth ids;
- does not depend on public profile visibility or public leaderboard eligibility.

A candidate should be treated as a recent repeat only when the same two users recently completed a ranked Practice game with compatible settings:

- `ranked = true`;
- `scope = 'practice'`;
- matching `mode`;
- matching storage `rating_bucket`;
- matching `word_length`;
- matching `hard_mode`;
- matching `time_limit_ms`;
- both users are the same pair as the current request user and candidate user;
- the game is terminal enough to represent a completed ranked attempt, such as `status in ('won', 'lost', 'expired')` with appropriate ranked evidence.

The detection window should be bounded. A practical default is an immediate recent window such as the most recent terminal ranked Practice game between the pair within a short interval. The migration execution prompt should inspect the existing data shape before choosing the exact interval or "latest completed same-settings pair" predicate. The selected predicate must be documented in `docs/ranked-multiplayer.md` or `docs/supabase.md` if the migration proceeds.

## Candidate Ordering

The preferred claim ordering is:

1. non-recent compatible candidates before recent compatible candidates;
2. existing rating-distance priority within the same recentness class;
3. existing queued-time priority within the same recentness and rating-distance class;
4. existing request id tie-break.

This keeps the blast radius smaller than globally switching to oldest-first matching.

If migration evidence shows this ordering is insufficient for the Player 1/Player 2/Player 3 scenario because Player 3 can be older but much farther in rating while still inside the search band, the execution stage may choose the slightly stronger ordering:

1. non-recent compatible candidates before recent compatible candidates;
2. existing queued-time priority within the same recentness class;
3. existing rating-distance priority within the same recentness and queued-time class;
4. existing request id tie-break.

Changing the rating-vs-age ordering outside the recent-repeat class is not authorized by this addendum without a new review.

## Grants And RLS Constraints

The migration must preserve:

- no direct `anon` table privileges on protected app tables;
- no direct browser mutation grants for rating profiles, rating transactions, result tables, queue authority tables, or async game authority tables;
- authenticated-only execution for ranked queue create, cancel, claim, status, and finalize RPCs;
- trusted settlement authority boundaries;
- public profile, public leaderboard, private matchmaking, participant identity, public/guest spectator, Daily claim, stats/dashboard, and admin-dashboard grant boundaries.

Internal helpers should not receive browser execution grants unless the migration proves a grant is necessary. If helper grants are accidentally inherited through defaults, the migration must explicitly revoke them from `public`, `anon`, and `authenticated` unless the helper is meant to be callable by browsers.

## Required Non-Printing Probes

The migration execution stage must run non-printing probes for:

- target project confirmation for `brrrdle-dev` without printing secrets;
- dry-run success before actual push;
- remote migration ledger does not already contain the new migration version;
- `anon` denial for ranked queue create, cancel, claim, status, and finalize RPCs;
- authenticated owner-only claim behavior;
- nonparticipant denial for claim/status/finalize;
- cancelled, expired, and stale queue rows remain excluded;
- incompatible mode, word length, Hard Mode, rating bucket, and time-control rows remain excluded;
- a compatible waiting third player is preferred over an immediate recent rematch;
- a recent rematch can still occur when no compatible non-recent opponent exists;
- matched pair still contains exactly two distinct users;
- matched game id creation remains idempotent and server-bounded;
- finalization still requires participant-owned matched queue evidence;
- trusted settlement, public leaderboard freshness, and rating transaction authority remain unchanged;
- Daily ranked remains denied/deferred;
- ranked custom/private-code games remain denied/deferred;
- no direct table grants are introduced;
- no forbidden fields or secret-like payloads are returned by browser-callable RPCs.

The probes must avoid printing raw auth ids, emails, secrets, answers, seeds, projections, tokens, session artifacts, screenshots, videos, traces, or private row data.

## Real E2E Expectations

After migration execution and any necessary source/test follow-up, Phase 43 should include real three-client Supabase-backed E2E coverage for the reported scenario:

1. Player 1 and Player 2 create and complete a ranked Practice match with compatible settings.
2. Player 3 enters the exact same ranked Practice queue and remains waiting.
3. Player 1 and Player 2 search again with the same settings.
4. The first rematched player should pair with Player 3 when Player 3 is still compatible and waiting.
5. The other recent opponent should not steal the match while Player 3 is eligible.
6. Cleanup must remove touched queue rows, multiplayer rows, rating/profile rows where test-owned, temporary users, and generated artifacts.

If the current browser path is too expensive for the migration execution stage, the migration stage may use non-printing SQL/RPC probes first and leave full browser E2E for the following source/test stage.

## Documentation Expectations

If the migration proceeds, update only the necessary documentation:

- `docs/supabase.md` should note the Phase 43 ranked queue fairness RPC repair and its grants/RLS boundaries.
- `docs/ranked-multiplayer.md` should mention that ranked Practice queue selection softly avoids immediate repeat opponents when another compatible player is waiting, without changing Elo math or rating buckets.

Do not claim UI/source cleanup is complete from the migration stage alone.

## Stop Conditions For Migration Execution

Stop before remote execution if:

- the target Supabase project is ambiguous or not `brrrdle-dev`;
- credentials are missing or would need to be printed;
- dry-run fails;
- the migration would require Elo/rating math changes;
- the migration would require browser-supplied raw auth ids or private profile fields;
- the migration would broaden public/anon access;
- the migration would change Daily, spectator, private matchmaking, public profile, public stats/admin dashboard, or gameplay contracts;
- probes cannot prove the three-client fairness contract without exposing private data;
- remote ledger already contains the proposed migration version;
- any verification command fails.

## Next Safe Gate

After review, the next safe gate is Phase 43 Stage 43.2B ranked queue matching fairness migration/RLS execution. That stage should create exactly one migration, apply it only to the confirmed `brrrdle-dev` Supabase project if dry-run and target confirmation are clean, run the non-printing probes above, update docs only if needed, record progress, and halt before source/UI work.
