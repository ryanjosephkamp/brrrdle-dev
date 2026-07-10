# Phase 55 Planning Brief - Ranked Daily Multiplayer And Private Request Routing

**Status:** Planned; implementation requires the separate ignored execution prompt.
**Created:** 2026-07-10.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev` only.
**Protected baseline:** Functional Shell Final Acceptance commit `ef2349ac53f8d02959d759615d85cfa85190beb9` and Golden Checkpoint `pre-phase-55-functional-shell-golden-2026-07-10`.
**User intake:** `planning/handoffs/POST-SHELL-FOUNDATION-EXPANSION-INTAKE-2026-07-10.md`.

## Phase Thesis

Phase 55 should add ranked Daily OG/GO through the existing trusted multiplayer architecture while preserving the accepted functional shell and current Daily, ranked Practice, Solo, privacy, and claim-safety contracts. The same phase may add the narrow public-profile request-status and direct-routing convenience because it reuses the existing private Practice request contract and does not require the broader request-center data model.

This is a substantial multiplayer phase. It must not absorb the request center/blocking/settings system, consumable economy, or frontend redesign.

## User-Approved Ranked Daily Contract

- Authenticated, public, asynchronous FIFO matchmaking for OG and GO.
- Ranked Daily queues are separate from ranked Practice and from each other by UTC date, mode, Hard Mode, and rating bucket.
- Fixed five-letter answers, canonical GO chain length, and no clock.
- Only mode and Hard Mode are selectable.
- Four independent Daily Multiplayer claims per signed-in player per UTC day: unranked OG, unranked GO, ranked OG, ranked GO.
- Ranked and unranked Daily use distinct deterministic answer namespaces.
- Distinct ranked Daily OG/GO rating buckets and leaderboard/public-profile metadata.
- No Hard Mode leaderboard split and no Elo formula change.
- No private Daily.

## Current Contract Findings

- `multiplayer_daily_claims` currently keys claims by user, transport, mode, and date, so it cannot represent separate ranked and unranked Daily claims.
- `create_ranked_async_matchmaking_request` currently rejects every scope except Practice, and the trusted finalization/settlement functions use Practice-only assumptions.
- FIFO queue work from Phase 50 is the correct ordering baseline and should be generalized without restoring repeat-opponent suppression.
- `matchmaking.ts` and `scoring.ts` explicitly reject ranked Daily eligibility.
- `rating.ts` exposes Practice OG/GO and timed Practice buckets only.
- `dailyMultiplayer.ts` already separates multiplayer answers from Solo Daily, but needs a ranked-versus-unranked namespace dimension.
- the public leaderboard RPC and public-profile metadata allowlist currently expose ranked Practice buckets only.
- the public profile already creates private Practice requests and shows a status message, but does not retain a participant-owned lifecycle watcher or a direct Practice/game route action.

## Required Supabase Addendum

Ranked Daily is not source-only. Phase 55 requires one reviewed, additive, source-controlled migration covering:

- ranked/unranked Daily claim dimension and uniqueness;
- Daily-compatible ranked queue validation and indexing;
- UTC date, fixed settings, Hard Mode, and bucket compatibility;
- trusted ranked Daily finalization and settlement;
- ranked Daily rating bucket storage and public leaderboard exposure;
- participant-only queue/status reads, RLS, grants, and function authorization;
- rollback and remote verification notes.

The first implementation prompt may create and test the local migration artifact. Applying it to the intended Supabase project requires a separate exact migration authorization after the artifact and diff are reviewable.

## Narrow Private Request Routing Slice

- After a private Practice request is sent from a public profile, show `Go to Practice Multiplayer`.
- While the requester remains on the profile, refresh only that participant's request lifecycle at a restrained cadence or through an existing safe participant-scoped mechanism.
- On `created`, show `Enter private match` and route to the exact created game.
- Show declined, cancelled, and expired states without exposing raw ids or private data.
- Do not implement the full request center, blocking, opt-out preferences, push, or new notification categories in Phase 55.

## Exit Criteria

Phase 55 reaches Review Candidate only when:

- local source/tests and the exact migration artifact are clean;
- the separately authorized migration is applied to the intended project;
- real two-client OG/GO ranked Daily E2E proves queueing, claim separation, answer separation, gameplay, settlement, leaderboard visibility, and cleanup;
- ranked Practice, unranked Daily, private Practice, Solo, and shell performance regressions pass;
- private request direct-routing behavior passes component and browser coverage;
- the full verification gate passes from a clean run;
- the phase changelog, manual checklist, progress, and Review Candidate Backup prompt are complete.

Phase 55 remains open until hosted manual review and Final Acceptance Backup are separately authorized.
