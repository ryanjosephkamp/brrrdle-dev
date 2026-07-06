# Phase 48 Private Daily And Ranked Daily Contract Addendum

**Status:** Draft addendum for review only.
**Date:** 2026-07-06.
**Repository:** `brrrdle-dev`.
**Phase:** Phase 48 - Profile And Multiplayer Contract Simplification.
**Stage Created:** Stage 48.5 - Private Daily And Ranked Daily Contract Decision.

## Authority

This addendum records the Stage 48.5 decision that private Daily requests and ranked Daily cannot safely proceed as source-only UI work.

This addendum does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, storage changes, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, strict session leases, server-authoritative Daily submissions, secret exposure, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, local Codex skill changes, or work against the original stable `brrrdle` repository.

Higher-authority sources remain:

1. Current user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. Phase 48 planning brief, unified specification, and implementation plan.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `docs/supabase.md`.
7. `docs/ranked-multiplayer.md`.
8. Existing source and tests.

## Current Contract Baseline

Current app and database contracts keep these boundaries:

- Private match requests are authenticated-only, unranked, Practice-only, and between active public profiles.
- Accepted private match requests create fresh unranked Practice multiplayer games.
- Private match accepted-game projections intentionally omit `dailyDateKey`, `customGameCode`, `matchmakingRequestId`, and browser-supplied `playerUserIds`.
- Daily Multiplayer remains UTC-day keyed, answer-separated, asynchronous, five-letter, no-clock, claim-safe, and unrated.
- Ranked Multiplayer currently means ranked Practice only, with separate untimed and canonical five-minute timed Practice buckets.
- Ranked queue creation uses Practice scope, compatible Practice settings, trusted queue RPCs, trusted finalization, and trusted settlement.
- Rating eligibility rejects Daily games and custom-code games.
- Public ranked leaderboards remain limited to untimed ranked Practice buckets.
- Browser clients do not directly write rating profiles, rating transactions, trusted settlement rows, or Daily claim authority.

## Stage 48.5 Decision

Private Daily and ranked Daily must remain deferred behind this protected contract addendum.

They are not safe as source-only changes because either direction would require at least one protected contract decision:

- new or changed private request scope/date semantics;
- Daily claim reservation, release, or acceptance rules;
- answer secrecy and route/log safety for current Daily content;
- Daily replay/rematch/retry exclusion rules;
- ranked Daily queue, bucket, trusted finalization, and trusted settlement authority;
- ranked/unranked Daily labeling and eligibility;
- public leaderboard exposure decisions;
- Supabase RPC/RLS/grant review;
- potential migration work;
- competitive-integrity review distinct from ranked Practice.

No Stage 48.5 implementation should begin until a later prompt explicitly approves a design or implementation stage for this addendum.

## Private Daily Contract Questions

Private Daily is not merely "private Practice with a date." It needs a separate contract because Daily Multiplayer has one-claim-per-user/date/mode semantics and answer secrecy constraints.

Open contract decisions:

- Should a private Daily request reserve a Daily claim when sent, when accepted, or only when the accepted game is created?
- Can a player who already claimed public Daily Multiplayer accept or send a private Daily request for the same date and mode?
- Can cancelling, declining, expiration, or creator cancellation release a Daily claim, and under which joined/unjoined states?
- Should private Daily use the same Daily Multiplayer answer sequence as public Daily Multiplayer for the UTC day?
- How does the request avoid leaking whether a target has played, claimed, solved, or failed that Daily?
- How should private Daily appear in History, Dashboard/Home, Leaderboard/rating summaries, notifications, route attention, and active multiplayer lists?
- Should private Daily require both players to have active public profiles, or is a separate private identity contract needed?
- Is private Daily discoverable by public/guest spectator surfaces? Recommended default: no.

Required boundaries for any future private Daily design:

- preserve UTC-day and mode claim safety;
- preserve answer separation and avoid answer-bearing request previews;
- preserve public/guest spectator exclusions unless separately authorized;
- preserve no ranked/Elo movement unless a ranked Daily contract separately approves it;
- preserve server-side raw auth id authority for accepted game participants;
- preserve private profile and public profile privacy boundaries;
- avoid invitations, inboxes, social systems, or notification delivery unless separately scoped.

## Ranked Daily Contract Questions

Ranked Daily is not a UI toggle over Daily Multiplayer. It needs a separate competitive-integrity and rating authority contract because Daily attempts are shared by calendar day and can affect anti-cheat expectations differently from ranked Practice.

Open contract decisions:

- Should ranked Daily be a separate queue, a Daily claim mode, or a distinct rating track?
- Should ranked Daily be public matchmaking only, private Daily only, or both?
- Does ranked Daily use the same Daily answers as unranked Daily for the UTC day?
- Can a player enter both ranked Daily and unranked Daily for the same date and mode?
- Does ranked Daily require a new claim bucket such as `ranked-daily:og` / `ranked-daily:go`, or reuse existing async Daily claim buckets?
- What rating buckets would ranked Daily use, and should they be public leaderboard buckets?
- What trusted settlement evidence is required to prove ranked Daily outcomes without exposing answers, seeds, or private projections?
- How should queue fairness handle Daily-specific date/mode constraints?
- Should ranked Daily be no-clock only, and should timed Daily remain disallowed?

Required boundaries for any future ranked Daily design:

- no Elo algorithm change without explicit approval;
- no reuse of ranked Practice bucket assumptions without a competitive-integrity review;
- no public leaderboard exposure until bucket visibility and public profile rules are approved;
- no client direct writes to rating profiles, results, transactions, queue authority, or settlement authority;
- no Daily answer, seed, serialized session, player session, or move-history leakage outside participant-owned reads;
- no gameplay-rule changes without a separate gameplay-rule gate.

## Required Future Addendum Work Before Implementation

A later implementation-ready addendum must define:

- exact product decision: private Daily, ranked Daily, both, or neither;
- in-scope modes: OG, GO, or both;
- request/queue lifecycle states and idempotency;
- claim timing and release semantics;
- participant eligibility and public/private identity boundaries;
- Daily answer secrecy and projection payload rules;
- ranking eligibility, bucket ids, storage bucket ids, settlement path, and leaderboard exposure;
- Supabase table/RPC/RLS/grant changes, if any;
- browser repository seams and parser guards;
- migration rollout and rollback expectations;
- focused Vitest coverage;
- real Supabase-backed two-client E2E coverage;
- manual review checklist items.

## Explicit Deferrals

This addendum keeps the following deferred unless a later prompt explicitly approves them:

- private Daily implementation;
- ranked Daily implementation;
- server-authoritative Daily submissions;
- strict one-active-session/session leases;
- social inbox/mailbox;
- notification redesign or delivery infrastructure;
- spectator presence/count/list;
- public/guest spectator contract changes;
- service workers/push;
- deployment/release;
- gameplay-rule changes;
- Elo algorithm changes.

## Recommended Next Routing

For Phase 48 v1, keep private Daily and ranked Daily deferred and proceed to Stage 48.6 final hardening, visual review, changelog, and manual checklist.

Do not implement private Daily or ranked Daily inside Phase 48 v1. Treat this addendum as a documented protected gate for a later phase or a separately approved addendum review cycle.
