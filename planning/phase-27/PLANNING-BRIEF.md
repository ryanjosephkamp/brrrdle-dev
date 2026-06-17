# Phase 27 Planning Brief - Competitive Ranking And Ranked Matchmaking

**Status**: Planning brief for review. This document does not authorize implementation, tests, Supabase migrations, deployment, Git operations, release work, or Phase 27 execution.
**Repository**: `brrrdle-dev`
**Created**: 2026-06-16
**Authority**: Current user authorization for a Phase 27 planning brief, under `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, the prompt-package standard, and the post-Phase-26 roadmap revision.

## 1. Context

Phase 26 completed responsive polish, notification controls/sounds, browser-notification controls, and authenticated Live v1 spectator support. The post-Phase-26 roadmap now routes theme proposal/template modernization later so more foundational multiplayer systems can stabilize first.

Phase 27 should therefore become the competitive multiplayer foundations phase. The current codebase already contains useful competitive scaffolding from earlier work:

- `src/multiplayer/rating.ts` has a deterministic Elo-style rating engine with 1200 initial rating, provisional and established K factors, bucket normalization, and idempotent transaction ids.
- `src/multiplayer/matchmaking.ts` has a rating-window queue compatibility model.
- `src/multiplayer/competitiveMultiplayer.ts` can settle local competitive state from projected multiplayer results.
- `src/multiplayer/scoring.ts` keeps per-game match points explainable and separate from rating evidence.
- Supabase migrations already define competitive tables such as rating profiles, player results, rating transactions, matchmaking queue rows, and custom lobbies.

That scaffolding should be treated as prior work to audit and harden, not as proof that production-ranked multiplayer is complete. Phase 27 should make ranked behavior explicit, server-trusted, privacy-safe, idempotent, and ready to support future leaderboards without building public leaderboards yet.

## 2. Goals

- Define and implement a clear ranked multiplayer v1 foundation.
- Choose and document an Elo/rank model that is explainable, deterministic, and audit-friendly.
- Keep match points independent from Elo/rank movement.
- Separate ranked, unranked, and custom multiplayer behavior cleanly.
- Add ranked matchmaking behavior with safe queue eligibility, compatibility windows, expiry, and cancellation.
- Ensure rating transactions are durable, idempotent, and not forgeable from ordinary browser clients.
- Prepare leaderboard-ready projections for later phases without exposing public leaderboard surfaces in Phase 27.
- Preserve Phase 24 route/workspace behavior, Phase 25 dashboard/notification behavior, Phase 26 Live v1 spectator behavior, and all gameplay invariants.

## 3. Recommended Product Outcome

By the end of Phase 27, signed-in players should have an understandable ranked multiplayer path where:

- ranked matches are clearly distinct from unranked games;
- matchmaking pairs compatible players by mode, scope, word length or UTC daily key where applicable, and rating band;
- completed ranked results generate auditable rating transactions exactly once;
- rating movement is based on opponent strength and terminal outcome, not directly on the in-game points total;
- in-game points still determine the match winner when the existing multiplayer rules require points as the tiebreaker;
- player-facing copy makes it clear that points and Elo/rank are related only through the final result boundary;
- internal data is shaped so later leaderboard and public-profile phases can safely consume approved projections.

## 4. In Scope

- Elo/rank model selection and final Phase 27 specification.
- Rating bucket strategy, provisional handling, K-factor policy, transaction shape, and rank band labels if approved.
- Ranked versus unranked eligibility and UI/copy boundaries.
- Ranked matchmaking queue compatibility, widening windows, expiry, cancellation, no-self-match, and abandoned-row handling.
- Durable settlement architecture for ranked results.
- Supabase/RLS/RPC audit and a separately authorized migration/RLS addendum if schema, grants, policies, or trusted settlement RPCs need changes.
- Focused component, domain, repository, storage, RLS, and real two-client E2E verification plans.
- Leaderboard-ready data projection requirements that remain private/internal until Phase 29.
- Documentation and progress records.

## 5. Out Of Scope

- Full public leaderboards, which remain routed to Phase 29.
- Public player profile pages, which remain routed to Phase 28.
- Public/guest spectation, which remains routed to Phase 30 or later behind sanitized public projections.
- Theme proposal/template modernization and concrete theme implementation, which remain routed to Phase 31 and Phase 32 or later.
- Social/community systems, marketplace work, economy rewards, broader achievements, or additional game modes.
- New browser notifications, service workers, push infrastructure, deployment, release work, or production rollout.
- Any scoring or gameplay rule change outside the narrow competitive boundary explicitly approved in the Phase 27 spec.

## 6. Gameplay And System Invariants

Phase 27 must preserve:

- Daily Multiplayer as strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Practice Multiplayer Hard Mode and time-limit behavior.
- Existing scoring, timeout, forfeit, rating/ELO legacy behavior until explicitly replaced by a safe Phase 27 model, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior.
- Phase 24 route/workspace behavior.
- Phase 25 dashboard, notification center, route badge, and workspace attention behavior.
- Phase 26 notification preferences/sounds/browser controls, responsive hardening, and authenticated Live v1 spectator behavior.
- Authenticated Live v1 spectator rows as read-only; spectators must not mutate games, ratings, claims, timers, or results.

## 7. Elo/Rank Model Recommendation

Use an Elo v1 model for Phase 27 unless a later spec review finds a concrete blocker.

Recommended starting policy:

- Initial rating: 1200.
- Provisional period: first 10 rated games in a bucket.
- Provisional K factor: 40.
- Established K factor: 24.
- Expected score: classic Elo formula, `1 / (1 + 10 ** ((opponentRating - playerRating) / 400))`.
- Terminal score: win = 1, draw = 0.5 if draws remain possible, loss = 0.
- Rating buckets: begin with mode-level buckets such as `multiplayer:og` and `multiplayer:go`; evaluate whether scope-specific buckets such as Practice versus Daily are needed before implementation.
- Rank bands: optional display labels should be derived from rating, not stored as an independent authority.

Rationale:

- Elo is understandable to players familiar with chess-style competitive systems.
- The current repository already has deterministic Elo helpers and tests that can be audited and hardened.
- Elo is easier to make idempotent and explainable than Glicko/Glicko-2 for a first production-ranked release.
- More complex rating deviation or volatility systems can be modeled later if match volume and product needs justify the complexity.

Do not make per-match point totals directly alter Elo deltas in v1. Points can determine who won under existing multiplayer rules, but rating movement should be based on terminal outcome and opponent strength. This preserves the user's requested separation: a player can earn many points and still lose Elo if they lose the ranked match.

## 8. Ranked Versus Unranked Boundaries

Recommended boundaries:

- Ranked games require authenticated players.
- Ranked games require durable server-backed match rows.
- Local preview rivals, guest-only progress, and public spectators must not generate rating transactions.
- Unranked and custom games remain available without rating movement.
- A ranked match must have exactly one settlement path and idempotent transaction ids.
- Rating movement should be blocked if winner evidence, participants, bucket, or completion state is ambiguous.
- Ranked UI copy should avoid implying that every multiplayer game affects rank.

Daily ranked multiplayer should be staged cautiously. If included in Phase 27, it must preserve UTC-day keys, answer separation, claim safety, and no-clock behavior. A safer first implementation may land Practice ranked matchmaking first, then add Daily ranked eligibility only after RLS and Daily claim verification pass.

## 9. Ranked Matchmaking Strategy

Use the existing matchmaking model as a starting point and harden it around server-trusted queue operations.

Recommended compatibility rules:

- queued status only;
- ranked flag matches;
- same mode;
- same rating bucket;
- distinct authenticated users;
- Practice queues match word length and any approved ranked option constraints;
- Daily queues match the current UTC date key and remain claim-safe;
- requests expire and can be canceled;
- rating difference must fit the current search band;
- search band starts narrow and widens over time up to a cap.

The existing model uses a 100-point default initial band for non-initial ratings, a 200-point initial band for 1200-rated profiles, 50-point widening every 10 minutes, and a 600-point maximum. Phase 27 should verify whether these numbers feel right for expected population size and adjust only through the approved spec.

## 10. Rating Transaction Auditability

Every rating-changing result should produce durable, inspectable records:

- match id;
- player id;
- opponent id;
- rating bucket;
- pre-rating and post-rating;
- rating delta;
- expected score;
- terminal score;
- provisional state;
- deterministic transaction id;
- created timestamp;
- settlement source/version;
- idempotency key.

The browser should not be able to directly forge rating deltas. If current policies allow only local/client-side settlement, Phase 27 should add a separately authorized Supabase/RLS/RPC stage before enabling production-ranked behavior.

## 11. Leaderboard-Ready Data Needs

Phase 27 should prepare safe private/internal data foundations for Phase 29 leaderboards without building public leaderboard UI.

Likely projection needs:

- current rating per player and bucket;
- ranked games played per bucket;
- recent rating movement history;
- optional peak rating per bucket;
- normalized player display identity that does not expose raw auth ids, emails, secrets, or private profile data;
- query shapes that can later support public leaderboards only after Phase 28 profile/privacy work.

No public leaderboard, public rank page, or public player page should be introduced in Phase 27 unless separately authorized.

## 12. Likely Files And Modules

Planning and source surfaces to inspect in a full Phase 27 spec:

- `src/multiplayer/rating.ts`
- `src/multiplayer/rating.test.ts`
- `src/multiplayer/scoring.ts`
- `src/multiplayer/scoring.test.ts`
- `src/multiplayer/competitiveMultiplayer.ts`
- `src/multiplayer/competitiveMultiplayer.test.ts`
- `src/multiplayer/matchmaking.ts`
- `src/multiplayer/matchmaking.test.ts`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/dashboard/dashboardViewModels.ts`
- `src/app/attentionViewModels.ts`
- `src/account/storageSchema.ts`
- relevant multiplayer E2E specs under `e2e/gameplay/`
- Supabase migrations and policies for competitive tables, `async_multiplayer_games`, matchmaking queue, custom lobbies, rating profiles, rating transactions, and Phase 26 spectator projection RPCs.

## 13. Recommended Stage Breakdown

### Stage 27.0 - Planning Approval And Protected Baseline

- Record Phase 27 baseline progress.
- Run the standard local gate before implementation.
- Confirm no Phase 27 source/runtime work begins before approval.

### Stage 27.1 - Competitive Model Audit And Final Spec

- Audit existing rating, scoring, competitive state, matchmaking, and Supabase competitive migrations.
- Decide the final Elo/rank policy, bucket strategy, ranked eligibility, Daily ranked staging, and rank display policy.
- Produce the unified Phase 27 specification.

### Stage 27.2 - Trusted Settlement And Migration/RLS Plan

- Determine whether existing Supabase tables/policies/RPCs are sufficient.
- If not sufficient, create a separately gated migration/RLS addendum for trusted settlement, idempotency, and private leaderboard-ready projections.
- Stop before migration creation/execution unless explicitly authorized.

### Stage 27.3 - Rating Settlement Foundations

- Harden rating transaction generation and settlement boundaries.
- Ensure browser clients cannot forge rating movement.
- Add domain/repository/storage tests and RLS probes where applicable.

### Stage 27.4 - Ranked Matchmaking Foundations

- Implement or harden authenticated ranked queue flows, cancellation, expiry, compatibility windows, and pairing behavior.
- Preserve unranked/custom paths.
- Verify no self-match, no stale queue reuse, and safe Daily eligibility behavior.

### Stage 27.5 - Durable Ranked Matchmaking Queue

- Replace local preview ranked pairing with durable authenticated ranked Practice queue behavior.
- Preserve unranked/custom paths.
- Stop for separately gated queue game-finalization migration/RLS work if trusted queue pairing cannot safely create participant-complete ranked games.

### Stage 27.6 - Ranked Multiplayer UI, Stats, And Copy

- Add conservative ranked/unranked controls and status copy.
- Display rating/rank summaries where appropriate without building public leaderboards.
- Keep dashboard, notification, and workspace attention behavior stable.

### Stage 27.7 - Leaderboard-Ready Private Projections

- Add internal/private projections or query seams needed for later leaderboards.
- Keep public leaderboard UI and public profile linking out of scope.
- Run privacy review against raw auth ids, emails, and private profile data.

### Stage 27.8 - Cleanup, E2E, And Final Hardening

- Run focused ranked Practice and, if included, Daily multiplayer E2E.
- Run full local gates, RLS/privacy probes, resource checks, and final documentation updates.
- Prepare Git handoff only after explicit authorization.

## 14. Success Criteria

Phase 27 should be considered complete only if:

- The final Elo/rank model is documented and test-covered.
- Ranked and unranked behavior are visibly and technically distinct.
- Match points remain separate from Elo/rank movement.
- Rating settlement is idempotent and audit-friendly.
- Browser clients cannot directly forge rating transactions.
- Matchmaking queues handle compatibility, expiry, cancellation, and no-self-match rules.
- Daily Multiplayer invariants are preserved if Daily ranked behavior is included.
- Leaderboard-ready foundations do not expose public leaderboards or private identity data.
- Real multiplayer verification covers the ranked flows claimed by the implementation.
- Full local verification passes before Git handoff.

## 15. Verification Strategy

Expected Phase 27 verification:

- Focused unit tests for rating, scoring, competitive state, matchmaking, repository parsing, and storage migration.
- Component tests for ranked controls, copy, disabled states, and rating summaries.
- Supabase/RLS/privacy probes for any migration-backed settlement or queue behavior.
- Real two-client Supabase-backed E2E for ranked Practice OG/GO if implemented.
- Real Daily Multiplayer E2E only if Daily ranked eligibility is implemented.
- Regression checks for Live v1 spectator read-only behavior, notifications, dashboard, route/workspace persistence, and responsive shell behavior.
- Standard final gate: lint, full unit suite, relevant E2E, build, API typecheck, `git diff --check`, progress CSV shape check, non-printing secret/artifact scan, ignored-artifact check, and resource cleanup checks.

## 16. Risks And Mitigations

- **Rating manipulation risk**: use trusted settlement, RLS/RPC gates, deterministic idempotency keys, and privacy probes.
- **Points versus Elo confusion**: write player-facing copy that distinguishes in-game points from rating movement.
- **Daily ranked complexity**: stage Daily ranked after Practice ranked unless the spec proves Daily claim and UTC-key behavior stays simple.
- **Sparse matchmaking population**: keep band-widening conservative and explain queue expiry/cancellation.
- **Schema/RLS drift**: require a migration/RLS addendum before changing Supabase authority.
- **Privacy creep from leaderboard-ready data**: keep projections private/internal until Phase 28 profile and Phase 29 leaderboard phases approve public exposure.
- **Regression risk in existing multiplayer modes**: preserve unranked/custom paths and run focused multiplayer regression tests.

## 17. Open Decisions

Recommended defaults are listed here for review before the unified spec:

- Rating model: use Elo v1 rather than Glicko/Glicko-2 for initial production ranked behavior.
- Rating buckets: start with `multiplayer:og` and `multiplayer:go`; decide whether Daily/Practice or timed/untimed buckets need separation.
- Ranked Daily: decide whether Phase 27 includes Daily ranked multiplayer or stages it after Practice ranked.
- Timed ranked Practice: decide whether time-limit games are ranked-eligible or remain unranked/custom initially.
- Hard Mode ranked Practice: decide whether Hard Mode gets the same bucket or an explicit eligibility/copy rule.
- Rank bands: decide whether display labels such as Bronze/Silver/Gold are needed in Phase 27 or deferred.
- Settlement authority: decide whether Supabase RPC is the preferred trusted settlement path or whether another separately approved server-side path is needed.

## 18. Recommended Next Gated Action

Create a unified Phase 27 specification for competitive ranking and ranked matchmaking. That spec should resolve the open decisions above, audit the existing competitive scaffolding, and define any required migration/RLS addendum before implementation begins.
