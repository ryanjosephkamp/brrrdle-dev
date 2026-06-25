---
layout: page
title: Ranked multiplayer and Elo
---

# Ranked multiplayer and Elo

Ranked multiplayer in brrrdle currently means ranked Practice Multiplayer v1. Public ranked Practice leaderboards are authenticated-only Phase 30 display surfaces for opted-in public profiles. Daily ranked and timed Practice ranked are routed to Phase 33 ranked mode expansion / competitive ladder v2 after the Phase 32 multiplayer stabilization pass, and remain unavailable until separately planned and authorized. Public profile foundations are separate identity work and do not change Elo.

## What affects Elo

Only eligible ranked Practice games affect Elo. A game must be authenticated, durable, ranked, completed, and settled through the trusted ranked settlement path. Local previews, spectators, custom games, Daily games, timed Practice games, guest games, corrupt evidence, and unranked games do not move Elo.

Match points and Elo are separate:

- Match points decide who won, lost, or drew the game.
- Elo movement happens afterward, only after trusted settlement confirms the ranked result.
- A player can score many match points without Elo moving unless the game is an eligible ranked Practice match.

## Starting rating and provisional games

Each ranked rating bucket starts at `1200`.

The first `10` ranked Practice games in a bucket are provisional. Provisional ratings move faster so the system can react more quickly while it has little evidence:

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

## Current boundaries

Ranked Practice v1 preserves these boundaries:

- Ranked Practice is signed-in and untimed.
- The ranked queue matches compatible mode, word length, Hard Mode setting, and rating bucket.
- Daily ranked remains deferred until Phase 33 planning proves claim safety, UTC-day uniqueness, answer separation, no-clock behavior, and anti-cheat implications.
- Timed Practice ranked remains deferred until Phase 33 planning proves clock fairness, trusted timeout settlement, queue compatibility, RLS safety, and two-client verification.
- Ranked custom/private-code games remain deferred unless a later approved spec authorizes them.
- Public profile identity is separate from rating authority; public leaderboards are authenticated-only display surfaces and do not change Elo.
- Browser clients do not directly write rating profiles or rating transactions; trusted settlement is the rating authority.
