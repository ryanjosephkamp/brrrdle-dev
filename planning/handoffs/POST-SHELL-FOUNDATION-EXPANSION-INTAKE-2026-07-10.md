# Post-Shell Foundation Expansion Intake

**Status:** Current user direction and routing record.
**Date:** 2026-07-10.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev` only.
**Protected baseline:** Functional Shell Final Acceptance commit `ef2349ac53f8d02959d759615d85cfa85190beb9`, annotated tag `pre-phase-55-functional-shell-golden-2026-07-10`, and matching GitHub Release.

## Purpose

This document faithfully reorganizes the user's post-shell product direction. It supersedes the assumption that design direction and the GPT-5.6 SOL handoff should begin immediately after the functional shell. The shell remains the preferred, accepted, reversible baseline, but the remaining non-design product foundations should be implemented first.

This intake records product direction. It does not by itself authorize source changes, migrations, remote Supabase work, Git/GitHub actions, deployment, release, or work in the original stable `brrrdle` repository.

## Protected Product Direction

- Keep the accepted functional shell lightweight, fast, and low-ornament while adding the remaining capabilities.
- Preserve all existing gameplay, account, persistence, progression, multiplayer, privacy, rating, spectator, and supporting behavior.
- Continue the established workflow: plan a substantial phase, implement and verify autonomously, prepare a Review Candidate, perform a separately authorized GitHub backup, complete hosted manual review, fix directly related findings inside the same phase, and close only after explicit acceptance.
- Expand automated coverage with each new feature so later work detects regressions.
- Defer the elaborate frontend redesign, design concepts, new component-system decisions, and GPT-5.6 SOL handoff until the remaining foundation phases are accepted.
- Prefer the smallest number of cohesive phases, but do not combine unrelated database, privacy, economy, and gameplay contracts into one unsafe implementation stage.

## Ranked Daily Multiplayer

### Product Contract

- Add ranked Daily Multiplayer for both OG and GO.
- Ranked Daily is authenticated, public FIFO matchmaking. It is not private matchmaking.
- Ranked Daily and ranked Practice use the same trusted queue principles, but they must use separate queue compatibility and never match across scopes.
- Ranked Daily configuration is limited to mode (OG or GO) and Hard Mode (on or off).
- Ranked Daily remains asynchronous, no-clock, fixed at five letters, and fixed to the canonical Daily GO puzzle count.
- Players cannot configure word length, GO chain length, difficulty, time control, or custom lobby settings.
- Hard Mode does not create a separate public leaderboard.

### Daily Participation Contract

Each eligible signed-in player may complete four Daily Multiplayer lanes per UTC day:

1. unranked Daily OG;
2. unranked Daily GO;
3. ranked Daily OG;
4. ranked Daily GO.

Each lane must have independent claim authority. Cancelling or retry behavior must preserve the current claim-safety principles and must not create additional completed attempts.

### Answer Separation

- Ranked Daily OG must use a deterministic answer namespace distinct from unranked Daily OG for the same UTC day.
- Ranked Daily GO must use a deterministic answer sequence namespace distinct from unranked Daily GO for the same UTC day.
- Ranked and unranked clients must not expose answers, seeds, serialized sessions, or rival-owned state through queue, profile, leaderboard, logs, or public payloads.

### Rating And Leaderboards

- Add distinct ranked Daily OG and ranked Daily GO rating buckets.
- Show ranked Daily performance in Leaderboard and approved public rating/profile metadata surfaces.
- Do not split leaderboard rows by Hard Mode.
- Preserve the current Elo formula and trusted settlement authority unless a later explicit decision changes it.
- Existing multiplayer scoring may continue to recognize Hard Mode where it already does. Any extra Elo multiplier, reward multiplier, consumable drop chance, or other Hard Mode economy bonus is deferred to the economy phase.

## Immediate Private Practice Request Routing

The next phase should also make the existing private Practice request flow easier without attempting the full request-center system.

- After a player sends a private Practice request from another player's public profile, show a direct action to open Practice Multiplayer.
- If the requester remains on that public profile while the request changes state, show the current state without requiring manual navigation.
- If the target accepts and a game is created, show a direct `Enter private match` action.
- If the target declines, cancels, or the request expires, show that terminal state clearly.
- Route the requester directly to the created game when they choose the action.
- Reuse the existing participant-scoped private-request repository contract and polling/subscription behavior. Do not create the full notification center in this slice.

## Private Match Request Center And Anti-Spam

A later foundation phase should implement a complete participant-owned request-management experience.

### Request Center

- Show incoming and outgoing private Practice requests together or in clearly separated views.
- Show status, requested settings, counterpart public name, and timestamp.
- Sort newest first by default and allow only useful low-complexity filters or sorting.
- Allow accept, decline, cancel, and direct entry into a created game from the request surface.
- Integrate accepted, declined, cancelled, expired, and created states with the existing in-app Notification Center where appropriate.
- Keep browser notifications foreground-only unless a future phase separately authorizes service workers or push delivery.

### Preferences And Blocking

- Add a setting that disables new incoming private Practice requests.
- Add a separately configurable private-request notification preference.
- Allow a player to block a specific public player from sending private Practice requests.
- Blocking and opt-out decisions must be server-enforced and participant-private; a client-only filter is insufficient.
- A general allowlist or friends-only system is not required for the first version.

### Duplicate And Spam Limits

- A requester may have at most one active `requested` request to the same target for the same mode.
- OG and GO are independent, so one active OG and one active GO request may coexist for the same pair.
- The requester may send qualifying requests to different players.
- Preserve or strengthen existing per-user active-request and recent-request rate limits.
- Do not add chat, a social graph, public block lists, or presence tracking.

## Marketplace And Consumables

A later foundation phase should complete the existing economy foundation while preserving competitive integrity.

- Consumables may be bought with coins through a lightweight shop or marketplace.
- Initial capabilities may build on the existing `revealOneLetter` and `removeIncorrectLetters` domain helpers; any additional hint must be explicitly specified and tested.
- Consumables may be used only in Solo Practice.
- Consumables are prohibited in Solo Daily and every multiplayer mode, including private and ranked.
- Purchases, inventory changes, and use must be deterministic, idempotent where cloud writes are involved, and protected against duplicate reward/spend application.
- Reward probabilities, Hard Mode reward multipliers, and consumable drops are deferred until the economy contract explicitly defines them.

## Phase Routing Decision

The smallest responsible route is:

| Phase | Focus | Reason |
| --- | --- | --- |
| 55 | Ranked Daily Multiplayer plus immediate private-request routing | Cohesive multiplayer scope; reuses ranked queue and existing private request contracts while keeping the UI lightweight. |
| 56 | Private Request Center, preferences, blocking, and anti-spam | Distinct participant-private data, RLS, settings, lifecycle, and notification contract. |
| 57 | Solo-Practice-only marketplace and consumables | Distinct progression, inventory, spend, cloud-sync, and gameplay contract. |
| 58 | Design direction and GPT-5.6 SOL handoff | Preserves the previously planned audit, concepts, `design.md`, stack decision, budgets, and rebuild handoff after the foundations settle. |
| 59 | GPT-5.6 SOL frontend rebuild | Applies the accepted design contract while preserving the expanded functionality inventory. |

## Verification Policy

Every implementation phase must:

- characterize the current behavior before changing shared contracts;
- add focused domain, repository, component, migration-contract, and browser tests;
- run real temporary-account, two-client Supabase-backed E2E for multiplayer claims;
- verify cleanup of temporary users, rows, claims, queues, requests, and browser artifacts;
- preserve the accepted shell's mobile performance, no-horizontal-overflow behavior, and low-ornament presentation;
- run the full lint, unit, E2E, build, API typecheck, and hygiene gates before Review Candidate handoff;
- produce a comprehensive manual review checklist and remain open for same-phase follow-up.

## Explicit Deferrals

Until their routed phase is authorized, do not implement private Daily, service-worker/push infrastructure, friends/chat/social graph, public presence, spectator expansion, new Elo formulas, Hard Mode reward multipliers, consumable drop probabilities, consumables outside Solo Practice, frontend redesign, design-system installation, framework migration, concept generation, or the GPT-5.6 SOL rebuild.
