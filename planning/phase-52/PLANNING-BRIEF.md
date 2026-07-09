# Phase 52 Planning Brief - Private Practice Matchmaking Expansion

**Status:** Review Candidate prepared; hosted/manual review requires a separately authorized Review Candidate Backup.
**Created:** 2026-07-09.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Baseline:** Phase 51 closure commit `2edbe50aea68615a19255c36c6718d41c2671688`.

## Authorization

This brief records the Phase 52 plan and Review Candidate state. It does not authorize migrations, remote Supabase work, deployment configuration changes, Git/GitHub backup, release work, public tunneling, Phase 53+ implementation, minimal-shell handoff preparation, UI toolkit adoption, image generation, or work in the original stable `brrrdle` repository.

## Phase Thesis

Phase 52 should expand private Practice matchmaking by exposing settings the existing backend/repository contract already supports:

- unranked Practice OG and GO private requests;
- Practice word lengths from 2 through 35;
- Hard Mode;
- supported Practice chess-clock time controls;
- GO puzzle count through the existing default and projection contract;
- clearer incoming/outgoing request UX.

The phase should preserve all Phase 50 and Phase 51 accepted behavior. It should not change Solo persistence, Home-on-refresh, ranked Practice FIFO matchmaking, Daily Multiplayer, scoring, rewards, Elo/rating rules, public profile privacy boundaries, or visual design direction.

## Current Implementation Summary

The current implementation already has most of the backend and repository shape needed for Phase 52:

- `supabase/migrations/20260701221500_phase40_private_match_requests.sql` created `multiplayer_private_match_requests` with `mode`, `word_length`, `hard_mode`, `time_limit_ms`, and `go_puzzle_count` fields.
- `create_private_multiplayer_match_request` already validates OG/GO, Practice word length 2-35, positive time limits, GO puzzle count when mode is GO, active public profiles, no self-request, active outgoing caps, recent request caps, and one pending request per pair.
- `supabase/migrations/20260701232434_phase40_private_match_accept_contract_repair.sql` added `accept_private_multiplayer_match_request_v2`, which rejects browser-supplied raw user ids and enforces that the created game projection matches the private-request contract.
- `src/multiplayer/multiplayerRepository.ts` already maps `CreatePrivateMatchRequestInput` to the RPC fields and parses private-request rows without allowing raw identity, projection, answer, or unknown fields.
- `src/multiplayer/privateMatchmaking.ts` already creates accepted private Practice game projections for OG/GO with word length, Hard Mode, supported time limits, and GO puzzle count.
- `src/multiplayer/MultiplayerPanel.tsx` already displays private request settings and supports accept, decline, cancel, refresh, and auto-route for created requests.

The biggest current limitation is UI exposure:

- `src/account/PublicProfilePage.tsx` still sends a fixed unranked 5-letter OG Practice request.
- Public profile copy still says "5-letter OG Practice request."
- Existing private-request E2E primarily proves the fixed OG path.
- GO, Hard Mode, and time-control private-request acceptance are not strongly covered end to end.

## Recommended Scope

Phase 52 should implement a focused private Practice expansion, not a broad social system.

In scope:

- settings-aware private Practice request controls on public player profiles;
- shared validation/normalization helpers for private Practice request settings;
- private request list copy and labels that make incoming/outgoing state clearer;
- tests for OG/GO, word length, Hard Mode, time controls, and safe payloads;
- real two-client E2E for at least one GO private request and preservation of the existing OG first-turn persistence/forfeit path;
- Phase 52 changelog, manual review checklist, progress update, and next Review Candidate Backup prompt if verification is clean.

Out of scope:

- private Daily matches;
- ranked private challenges;
- custom-code private invite expansion;
- friends, blocking, opt-out settings, social graph, push/service-worker infrastructure, or notification delivery;
- admin/backend queue visualization;
- public profile privacy or RLS model changes;
- new Supabase migrations, remote RPC/RLS/schema changes, or deployment configuration changes unless a later prompt explicitly authorizes an addendum;
- gameplay-rule, reward, scoring, Elo/rating, ranked FIFO, or Daily claim changes;
- minimal-shell handoff preparation, broad shell redesign, theme work, ShadCN/Impeccable adoption, or generated design concepts.

## Expected Stage Shape

1. **Stage 52.0 - Baseline and Contract Audit**
   Confirm Phase 51 closure baseline, re-read private-match SQL/repository/domain/UI tests, and verify whether the expected implementation can remain source/test-only.

2. **Stage 52.1 - Request Settings Helper**
   Add a small source helper for private Practice request settings normalization, labels, and safe idempotency key inputs if the implementation benefits from it.

3. **Stage 52.2 - Public Profile Request Controls**
   Replace the fixed public-profile request action with bounded controls for mode, length, Hard Mode, and time control, with GO-specific puzzle-count handling using the existing default.

4. **Stage 52.3 - Request Lifecycle UX Polish**
   Improve incoming/outgoing labels and settings summaries in the Practice Multiplayer private-request panel without changing the existing request lifecycle contract.

5. **Stage 52.4 - Focused E2E And Regression Coverage**
   Extend private-request E2E to cover GO and preserve the existing OG persistence/forfeit path. Protect Phase 50/51 navigation, account, and mobile behavior with focused smoke coverage.

6. **Stage 52.5 - Review Candidate Handoff**
   Update Phase 52 changelog/checklist/progress and prepare the next Review Candidate Backup prompt if all required verification passes.

## Stop Conditions

Stop and report instead of continuing if Phase 52 implementation would require:

- a new Supabase migration, remote SQL execution, RLS/grant change, table/storage/schema change, or production project mutation;
- exposing raw auth ids, emails, private account data, queue internals, game answers, serialized sessions, projection blobs, or tokens;
- changing ranked queue, Daily Multiplayer, Solo persistence, rewards, scoring, Elo/rating, gameplay rules, or Home-on-refresh behavior;
- broad profile/social graph policy changes such as blocking or request opt-out settings;
- Git/GitHub backup, branch cleanup, PR, merge, release, or deployment work.

## Implementation Update - 2026-07-09

The bounded source/test implementation is complete for a Phase 52 Review Candidate:

- public profiles now expose settings-aware private Practice request controls for OG/GO, word length, Hard Mode, and supported Practice time controls;
- GO private requests use the existing default GO puzzle count through the current private-match projection contract;
- focused helper, component/render, projection, repository seam, and request-panel tests were added or updated;
- real two-client Playwright coverage now includes a selected private Practice GO request accepted into a persisted Practice GO game;
- no new migrations, remote Supabase changes, deployment changes, Git/GitHub actions, release work, or stable `brrrdle` repository work were performed.

## Next Recommended Action

Use the Phase 52 Review Candidate Backup prompt so the user can test the hosted/live candidate while keeping Phase 52 open for manual review follow-up.
