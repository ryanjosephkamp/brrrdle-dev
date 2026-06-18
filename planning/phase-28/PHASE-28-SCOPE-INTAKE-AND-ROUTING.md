# Phase 28 Scope Intake And Routing

**Status**: Planning intake for review.
**Authority**: Documentation-only routing note. This file does not authorize implementation, source changes, tests, migrations, deployment, release, PR, merge, branch deletion, or work against the original stable `brrrdle` repository.
**Created**: 2026-06-17.

## Purpose

This document records the post-Phase-27 routing decision for user-reported Live v1 spectator, notification, Elo transparency, and multiplayer postgame action ideas before the full Phase 28 planning brief is created.

The main product decision is to make Phase 28 a stabilization phase for current Live v1 spectator and notification behavior before starting new public identity surfaces.

## Source Prompt Summary

The user asked to route several candidate Phase 28 bug fixes and future feature ideas:

- Live subtab spectator delay and the existing refresh diagnosis.
- `Spectate live game` button not opening a focused spectator view.
- Live spectator game-ending screens disappearing too abruptly.
- Current Daily Multiplayer games being spectatable and potentially leaking answers.
- Browser and foreground notifications not visibly firing.
- Elo/rank transparency for players.
- Multiplayer postgame rematch and same-settings play-again/search-again actions.

## Recommended Phase 28 Scope

Phase 28 should focus on **Live v1 spectator and notification stabilization, Daily spectation integrity, and low-risk Elo transparency**.

Recommended Phase 28 items:

1. Improve authenticated Live v1 spectator refresh behavior using the existing sanitized RPC boundary.
2. Make `Spectate live game` open a focused read-only spectator experience.
3. Preserve final spectator board/outcome state briefly before removing terminal games from Live.
4. Exclude current Daily Multiplayer games from spectator discovery to prevent answer leakage.
5. Investigate and fix foreground/browser notification delivery within the existing Phase 25/26 notification architecture.
6. Add transparent Elo/rank explanation copy in docs and in app surfaces without changing the Elo model.

Phase 28 should not implement public player profiles, public leaderboards, public/guest spectation, rematch workflows, new theme systems, service workers, push infrastructure, or gameplay rule changes.

## Items Routed Into Phase 28

### Live v1 Spectator Refresh

Integrate `planning/phase-28/LIVE-V1-SPECTATOR-REFRESH-DIAGNOSIS.md`.

The preferred implementation direction remains:

- refresh spectator rows immediately when the user opens the Multiplayer Live subtab;
- poll authenticated spectator rows faster only while Live is active and the document is visible;
- use a conservative 5 second foreground Live polling cadence, with 3-5 seconds acceptable if verification shows request volume remains bounded;
- keep the current slower 30 second behavior or pause/throttle outside active visible Live contexts;
- retain the in-flight guard to avoid overlapping RPC calls;
- keep participant-owned Live rows on the repository realtime path;
- preserve the sanitized authenticated RPC and strict DTO parsing.

### Focused Spectator View

The `Spectate live game` button should open a clearly focused read-only spectator view.

Recommended planning direction:

- prefer an existing app route/subtab state or focused panel pattern over a new public route;
- make the selected spectator game visibly expanded or full-page/focused enough that the button has an obvious outcome;
- preserve read-only constraints: no guessing, joining, forfeiting, cancelling, timer mutation, claim mutation, rating mutation, or settlement controls;
- keep signed-out users restricted; do not create public/guest spectation in Phase 28.

### Spectator Terminal Hold

Authenticated spectators should see a terminal board/outcome briefly before the game disappears from Live.

Recommended planning direction:

- hold terminal spectator rows for roughly 15 seconds after completion;
- show final board state and outcome summary only through a sanitized end-state projection;
- do not expose raw answers, seeds, serialized sessions, `playerSessions`, raw `projection`, private profile data, auth emails, or mutable controls;
- verify terminal hold behavior for OG and GO where sanitized projection support exists.

### Current Daily Multiplayer Spectation Integrity

Current Daily Multiplayer games should not be spectatable.

This is an integrity fix, not cosmetic polish. Current Daily spectation can leak active daily answers to players who have not played yet.

Recommended planning direction:

- exclude current Daily Multiplayer games from authenticated spectator discovery entirely;
- prefer a simple server-side/RPC predicate backed by app-side view-model filtering and tests;
- if any past-Daily or terminal-Daily spectator behavior is considered later, require a separate leakage analysis before exposing it;
- preserve Daily Multiplayer as asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.

### Notification Delivery

Phase 28 should investigate and fix foreground/browser notification delivery if the current implementation is incomplete or miswired.

Current planning evidence:

- in-app notification view models, Settings preferences, notification metadata, and notification sounds exist;
- Settings exposes foreground browser notification permission/preference controls and explicitly excludes service workers, push delivery, and background cross-device delivery;
- the browser notification helper currently covers permission/status handling, so Phase 28 should verify whether an actual `Notification` dispatch path exists and add it only within the approved foreground/local boundary if missing.

Recommended planning direction:

- keep Notification Center items and badges working as the primary in-app notification surface;
- make foreground browser notifications fire only when permission is granted, browser notifications are enabled, the event is eligible, and foreground/local constraints are satisfied;
- preserve no service worker, push infrastructure, background delivery, or cross-device delivery unless a later approved phase explicitly adds them;
- add tests for preference gating, permission gating, dedupe/fingerprints, hydration behavior, foreground dispatch, and no-dispatch cases.

### Elo Transparency

Elo/rank transparency should be routed into Phase 28 as low-risk current-feature clarity.

Phase 27 already established Elo v1. Phase 28 should explain it without changing the algorithm:

- initial rating `1200`;
- provisional window of 10 ranked games;
- provisional K factor `40`;
- established K factor `24`;
- classic Elo expected-score formula;
- win/loss/draw terminal scores;
- match points and Elo/rank movement are separate;
- only eligible trusted ranked Practice results affect Elo in v1.

Recommended surfaces:

- `README.md` or a focused docs/planning explanation if product docs are not ready;
- in-app Multiplayer ranked guidance, Info/About copy, or Settings/help copy if a suitable surface exists;
- tests only where rendered copy or view-model output changes.

## Items Explicitly Deferred

### Public Player Profiles

Route to Phase 29.

Public profile work remains important but should follow the Phase 28 Live/notification stabilization pass. Profile work should define privacy-safe public identity without raw auth emails, internal ids, private account metadata, tokens, or private progress details.

### Public Leaderboards

Route to Phase 30.

Leaderboards should build on Phase 27 ranked data foundations and Phase 29 public identity decisions. They should include Elo/rank, streaks, total games played, and approved performance metrics only after privacy and abuse-resistance plans are explicit.

### Multiplayer Postgame Actions

Route to Phase 31 as a dedicated multiplayer UX phase.

Candidate scope:

- Practice-only rematch request/accept with the same opponent and same settings;
- same-settings play-again or search-again action for players who do not want the same opponent;
- no Daily variants because Daily claims and daily uniqueness make rematches inappropriate;
- preserve ranked/unranked boundaries, trusted ranked queue behavior, Daily claims, and gameplay invariants.

This likely needs durable mutual-intent state, timeout/cancel behavior, same-settings cloning rules, and queue/RLS review, so it should not be bundled into Phase 28.

### Public/Guest Spectation

Route to Phase 32.

Public or guest spectation still requires separately approved sanitized public projections and RLS/privacy design. Phase 28 may improve authenticated read-only spectation but must not open public/guest spectation.

### Theme Work

Route theme proposal/template modernization to Phase 33 and full concrete theme creation/implementation to Phase 34 or later.

Theme work remains late to avoid compatibility churn while Live, notification, profile, leaderboard, public spectator, and multiplayer UX surfaces continue to evolve.

## Recommended Future Phase Sequence

| Phase | Recommended Focus | Notes |
| --- | --- | --- |
| Phase 28 | Live v1 spectator and notification stabilization | Includes current Daily spectation integrity and low-risk Elo transparency. |
| Phase 29 | Public player profile foundations | Privacy-safe public identity for later social and leaderboard surfaces. |
| Phase 30 | Leaderboards | Elo/rank, streaks, total games played, and approved metrics after public identity foundations. |
| Phase 31 | Multiplayer postgame actions | Practice rematch and same-settings play-again/search-again flows. |
| Phase 32 | Public/guest spectation | Sanitized public projections only if still desired and separately authorized. |
| Phase 33 | Theme proposal/template modernization | Modernize theme templates after major feature surfaces stabilize. |
| Phase 34 or later | Full concrete themes | Concrete theme specs, assets, sounds, implementation, and QA. |

Broader social/community systems, marketplace work, additional modes, and deeper expansion remain later and separately gated.

## Risks And Open Decisions

- **Daily leakage risk**: current Daily spectator discovery should be treated as a high-priority integrity issue. The default fix is exclusion from discovery.
- **Terminal spectator projection**: final board/outcome display may require RPC changes; Phase 28 planning must decide whether to use a migration/RLS addendum gate.
- **Refresh cadence load**: foreground 3-5 second polling must remain bounded by route/subtab visibility and in-flight guarding.
- **Focused spectator UX**: decide whether the best focused view is a route, modal, expanded panel, or existing selected-game surface before implementation.
- **Browser notification behavior**: determine whether the existing foreground preference lacks dispatch or whether user testing failed due permission, focus, fingerprint dedupe, or candidate eligibility.
- **Elo explanation placement**: decide whether to put player-facing Elo transparency in Multiplayer copy, a general Info/About surface, README, or more than one place.

## Invariants To Preserve

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Current Daily Multiplayer answer leakage through spectator views must be prevented.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged unless a later approved spec changes them.
- Ranked Practice v1 remains the only ranked match type from Phase 27 unless a later approved spec changes it.
- Daily ranked and timed Practice ranked remain deferred.
- Match points and Elo/rank movement remain separate.
- Live v1 spectator behavior remains read-only.
- Public/guest spectation remains unavailable unless a later approved phase explicitly implements sanitized public projections.
- Existing scoring, timeout, forfeit, rating/Elo, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged unless explicitly approved.

## Recommended Next Gated Action

Create the full Phase 28 planning brief using this intake document and the Live v1 refresh diagnosis as required inputs.

The planning brief should decide the exact Phase 28 stage sequence, identify whether any migration/RLS addendum is required for Daily exclusion or terminal spectator hold, and define focused verification expectations before any source/runtime implementation is authorized.
