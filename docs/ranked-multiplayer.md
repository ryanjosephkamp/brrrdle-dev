---
layout: page
title: Ranked multiplayer and Elo
---

# Ranked multiplayer and Elo

Ranked multiplayer in brrrdle includes ranked Practice Multiplayer v1, Phase 33 canonical five-minute timed ranked Practice, and the deployed Phase 55 ranked Daily OG/GO contract. Public ranked leaderboards are authenticated-only display surfaces for opted-in public profiles. Public profile identity does not change Elo authority.

## What affects Elo

Only eligible ranked Practice or ranked Daily games affect Elo. A game must be authenticated, durable, queue-backed, ranked, completed, and settled through the trusted ranked settlement path. Ranked Daily adds a stricter server-authority boundary: the database selects canonical answers from a source-controlled private catalog, accepts one idempotent guess or owned forfeit at a time, computes tiles and progression itself, and settles only from its private authority/action ledger. Participant-writable projections never authorize the outcome. Local previews, spectators, custom games, unranked Daily games, unsupported timed Practice games, guest games, corrupt evidence, and other unranked games do not move Elo.

Match points and Elo are separate:

- Match points decide who won, lost, or drew the game.
- Elo movement happens afterward, only after trusted settlement confirms the ranked result.
- A player can score many match points without Elo moving unless the game is an eligible trusted ranked match.

## Starting rating and provisional games

Each ranked rating bucket starts at `1200`.

The first `10` ranked games in each bucket are provisional. Provisional ratings move faster so the system can react more quickly while it has little evidence:

- Provisional K factor: `40`.
- Established K factor: `24`.

After the provisional window, the rating is established and uses the smaller K factor.

## Expected score

brrrdle uses the standard Elo expected-score curve:

`expected score = 1 / (1 + 10 ^ ((opponent rating - your rating) / 400))`

That means defeating a higher-rated opponent is worth more than defeating a lower-rated opponent. Losing to a lower-rated opponent costs more than losing to a higher-rated opponent.

The match outcome maps to Elo scores this way:

- Win: `1`.
- Draw: `0.5`.
- Loss: `0`.

The final rating movement is the K factor multiplied by the difference between the actual outcome score and the expected score, rounded to a whole number.

## Rank bands

Phase 33 rank bands are display-only labels derived from the current rounded rating:

- Learner: below `900`.
- Bronze: `900` through `1099`.
- Silver: `1100` through `1299`.
- Gold: `1300` through `1499`.
- Platinum: `1500` through `1699`.
- Diamond: `1700` through `1899`.
- Master: `1900` and above.

Rank bands do not change Elo movement, K factors, provisional-game counts, matchmaking, settlement, public leaderboard authority, or gameplay rules.

## Current boundaries

The ranked contract preserves these boundaries:

- Ranked Practice is signed-in. The current player-facing app offers no-clock ranked Practice and the separate canonical timed ranked clock of `300000` ms per side.
- Phase 33 supports only that one timed ranked clock. Other Practice time-limit options remain unranked.
- Timed ranked uses separate rating buckets from untimed ranked Practice: `async:og:timed:v1` / `async:go:timed:v1` in storage and `multiplayer:og:timed:v1` / `multiplayer:go:timed:v1` in app projections.
- The ranked queue matches compatible mode, word length, Hard Mode setting, rating bucket, and exact ranked time control.
- Phase 50 ranked Practice queue selection is strict FIFO among compatible requests and permits immediate repeat opponents.
- Ranked Daily is signed-in, asynchronous, five-letter, no-clock, and current-UTC-day only. OG/GO and Hard Mode settings must match between queued players.
- Ranked Daily uses separate storage buckets (`async:og:daily:v1` and `async:go:daily:v1`) and app buckets (`multiplayer:og:daily:v1` and `multiplayer:go:daily:v1`). Hard Mode does not create a separate leaderboard bucket.
- A signed-in player has four independent Daily claim lanes per UTC date: unranked OG, unranked GO, ranked OG, and ranked GO.
- Ranked and unranked Daily use deterministic but guaranteed-distinct answer namespaces for OG and every GO puzzle.
- Ranked Daily queue rows are visible only to their owner. A private server-generated pair reservation binds exactly two queue requests to one game id; Daily lane locks use a deterministic order.
- Ranked Daily public game rows are answerless projections. Clients hydrate playable sessions from the canonical date/mode contract, while the server validates every action against the private catalog and immutable action ledger.
- Direct browser inserts or updates of ranked Daily game rows are denied. The narrow action RPC validates dictionary membership, turn ownership, optimistic version/move counts, GO prefilled-attempt limits, shared Hard Mode evidence, terminal state, and winner derivation.
- Ranked Daily settlement reads terminal status, winner, attempts, solved puzzles, and moves only from server-owned authority/ledger records. It does not trust the public projection for Elo evidence.
- Timed Practice ranked remains limited to the trusted ranked queue, trusted finalization, and trusted settlement path. Real two-client verification remains part of Phase 33 final hardening before Git handoff.
- Ranked custom/private-code games remain deferred unless a later approved spec authorizes them.
- Public leaderboards expose untimed ranked Practice OG/GO and ranked Daily OG/GO only. Timed Practice buckets remain private.
- Public profile identity is separate from rating authority; public leaderboards are authenticated-only display surfaces and do not change Elo.
- Browser clients do not directly write rating profiles or rating transactions; trusted settlement is the rating authority.

## Phase 55 deployed authority

The ranked Daily contract is source-controlled by the immutable base migration and four narrowly additive repairs:

- `supabase/migrations/20260710061039_phase55_ranked_daily_multiplayer.sql`
- `supabase/migrations/20260710180608_phase55_ranked_daily_contract_repair.sql`
- `supabase/migrations/20260710183654_phase55_ranked_daily_queue_matched_at_repair.sql`
- `supabase/migrations/20260710184116_phase55_ranked_daily_cleanup_orphan_repair.sql`
- `supabase/migrations/20260710184922_phase55_ranked_daily_finalization_authority_repair.sql`

The repairs preserve the base migration while making Daily queue expiry canonical, repeat queue attempts cancellation-safe, GO puzzle five continue until solved, public projections allowlist-only, finalization evidence reservation-owned, and E2E cleanup service-role-only and orphan-safe. Local and remote migration histories match exactly. Real temporary-account OG/GO, concurrent FIFO, settlement, reload, private-routing, spectator, Solo, and shell E2E passed before Review Candidate preparation, and all temporary rows and users were removed.
