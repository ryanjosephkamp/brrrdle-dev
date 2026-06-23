# Phase 30 Deferred Ranked Modes Routing

**Status**: Planning/routing note for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-22.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, completed Phase 27 ranked Practice foundations, current Phase 30 planning/spec/implementation materials, current roadmap surfaces, ranked multiplayer documentation, and the current progress ledger.

This note does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, Phase 30 implementation, Phase 31 implementation, Phase 32 implementation, public/guest spectation implementation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, or work in the original stable `brrrdle` repository.

## 1. Purpose

Phase 27 intentionally launched ranked multiplayer through signed-in, untimed Practice Multiplayer v1. Several ranked-related options remain visible or documented as deferred:

- timed Practice ranked;
- Daily ranked;
- ranked custom or private-code games;
- optional rank labels or bands.

Those deferrals should not remain loose placeholders. This note assigns them to a dedicated future phase so Phase 30 can remain focused on public leaderboards and the small Multiplayer Overview cleanup items already approved for planning.

## 2. Current Deferred Ranked Items

### Timed Practice Ranked

Timed Practice Multiplayer already exists as gameplay, but timed ranked matchmaking and rating movement remain deferred.

Reason:

- clock fairness and timeout evidence need stronger two-client verification before rating changes depend on timed outcomes;
- trusted settlement must prove timeout loser precedence and timer state cannot be manipulated by stale local projections;
- ranked queue compatibility must include time-limit settings and avoid matching untimed players against timed players;
- RLS/RPC contracts may need explicit timeout settlement and evidence fields.

### Daily Ranked

Daily Multiplayer remains unrated.

Reason:

- Daily Multiplayer is claim-safe, UTC-day keyed, answer-separated, asynchronous, and no-clock;
- ranked Daily would combine rating incentives with Daily claim uniqueness, creating anti-cheat and integrity risks;
- Daily answer leakage and current-day spectation protections must remain intact;
- Daily ranked may need separate claim, queue, and settlement addenda before implementation.

### Ranked Custom Or Private-Code Games

Custom/private-code multiplayer remains unranked.

Reason:

- friend/private-code matches are easier to coordinate and can distort a public ladder;
- any future ranked custom mode would need explicit anti-abuse, rematch/farming, queue bypass, and audit rules;
- public leaderboards should not depend on privately arranged ranked outcomes unless a later spec authorizes that product shape.

### Optional Rank Labels Or Bands

Rank labels such as Bronze/Silver/etc. may be considered later only as derived display labels from trusted ratings.

Reason:

- labels must not become rating authority;
- labels should not change the Phase 27 Elo constants, settlement rules, rating buckets, or transaction history;
- label naming can be a product/copy layer after rating and leaderboard behavior is stable.

## 3. Routing Decision

Use this future phase sequence unless a later approved planning pass changes it:

- **Phase 30** remains public leaderboards and Multiplayer Overview cleanup.
- **Phase 31** remains multiplayer postgame actions: Practice rematch request/accept and same-settings play-again/search-again flows.
- **Phase 32** becomes ranked mode expansion / competitive ladder v2.
- **Phase 33** becomes public/guest spectation using sanitized public projections, if still desired and separately authorized.
- **Phase 34** becomes theme proposal/template modernization.
- **Phase 35 or later** becomes full concrete theme creation, implementation, asset/sound work, and theme QA.

This routing keeps public leaderboards from waiting on complex ranked-mode expansion, but gives timed/Daily ranked a clear future home before public/guest spectation and theme work.

## 4. Phase 32 Ranked Mode Expansion Candidate Scope

Phase 32 should be planned separately before any implementation. Its default order should be:

1. **Timed Practice ranked first**:
   - require queue compatibility by mode, word length, Hard Mode, rating bucket, and exact time-limit setting;
   - require trusted timeout settlement and idempotent timeout evidence;
   - preserve timeout-loser precedence and existing gameplay scoring rules;
   - run focused pure tests plus real two-client timed ranked E2E before enabling rating movement.
2. **Daily ranked only after feasibility proof**:
   - prove Daily claim safety remains intact;
   - preserve UTC-day uniqueness, five-letter Daily scope, no-clock behavior, no Daily Hard Mode lobby control, answer separation, and current-day anti-cheat protections;
   - decide whether Daily ranked shares the existing ranked bucket or uses a separate Daily bucket;
   - require explicit migration/RLS planning if Daily ranked needs claim or settlement schema changes.
3. **Ranked custom/private-code games remain deferred unless separately approved**:
   - require anti-abuse, farming, and queue-bypass analysis before any ranked custom implementation;
   - should not be bundled into timed or Daily ranked by default.
4. **Rank labels/bands may be considered as display-only**:
   - labels must derive from trusted rating values;
   - labels must not change Elo, settlement, ranking, or leaderboard authority.

## 5. Phase 30 Impact

Phase 30 public leaderboards should target currently trusted ranked Practice v1 data first.

Phase 30 must not implement timed ranked, Daily ranked, ranked custom/private-code games, or rank-label authority. If Phase 30 leaderboard contracts include future-safe fields, they should be inert category/bucket fields only and must not imply the deferred modes exist.

Phase 30 copy should continue to say:

- ranked Practice v1 is the only current ranked match type;
- timed Practice ranked and Daily ranked are planned for a later competitive ladder expansion;
- public leaderboards are display-only and do not settle matches, mutate ratings, or change gameplay results.

## 6. Invariants To Preserve

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Current Daily Multiplayer answer leakage through spectator views remains prevented.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged unless a later approved spec explicitly changes ranked eligibility while preserving underlying gameplay.
- Ranked Practice v1 remains the only ranked match type until Phase 32 or a later approved spec changes it.
- Daily ranked and timed Practice ranked remain deferred until Phase 32 ranked mode expansion planning and authorization.
- Ranked custom/private-code games remain deferred unless separately approved.
- Match points and Elo/rank movement remain separate.
- Live v1 spectator behavior remains read-only.
- Public/guest spectation remains unavailable until a later approved public projection phase.
- Existing scoring, timeout, forfeit, rating/Elo, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged unless explicitly approved.

## 7. Risks And Open Decisions

- Whether timed Practice ranked should share current ranked buckets or use time-control-specific buckets.
- Whether Daily ranked should exist at all, given Daily anti-cheat and claim-safety constraints.
- Whether Daily ranked should share Practice rating or use a separate Daily rating.
- Whether rank labels should be added in Phase 32 or deferred until after leaderboards gather player feedback.
- Whether ranked custom/private-code games should remain permanently unranked to protect ladder integrity.
- Whether Phase 32 needs new SQL/RPC/RLS contracts or can safely extend the existing Phase 27 ranked queue and settlement contracts.

## 8. Next Gated Action

Return to Phase 30 Stage 30.0 baseline after this routing note is reviewed.

Stage 30.0 should include this note in required reading, preserve current Phase 30 planning/spec/progress artifacts, create the Stage 30.0 progress report and CSV row, and run the baseline verification gate before any Phase 30 implementation begins.
