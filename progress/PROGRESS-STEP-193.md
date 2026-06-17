# Progress Step 193 - Phase 27 Stage 27.5 Durable Ranked Matchmaking Queue

**Phase**: Phase 27
**Stage**: Stage 27.5 - Durable Ranked Matchmaking Queue
**Status**: Blocked - Awaiting Migration/RLS Addendum Authorization
**Started**: 2026-06-16T06:22:51Z
**Completed**: 2026-06-16T06:25:11Z

## Authorization

The user authorized Phase 27 Stage 27.5 only: durable ranked matchmaking queue.

Authorized work includes reading governance, Phase 27 implementation and migration/RLS materials, progress records, Supabase documentation, current multiplayer repository/domain/app surfaces, replacing local preview ranked pairing with durable authenticated ranked Practice queue behavior, adding queue create/cancel/status repository seams, using the Stage 27.3 trusted pairing RPCs where applicable, preserving unranked and custom game creation flows, adding focused domain/repository/component tests, running focused verification first, then running the Stage 27.5 verification gate, and updating progress records.

The authorization does not include creating or running migrations unless a blocker proves a separately authorized migration addendum is required, notification work, public leaderboards, public profiles, public/guest spectation, deployments, commits, pushes, PR creation, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, gameplay-rule changes, or original stable `brrrdle` repository work.

## Repository State

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Confirmed target is `brrrdle-dev`, not the original stable `brrrdle` repository.
- Current branch at kickoff: `main`
- Local `HEAD` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- `origin/main` at kickoff: `747805e61f5014acd82a3487440543ab9ae385b6`
- Local `main` matched `origin/main` at kickoff.
- Existing uncommitted Phase 26/27 planning, source, migration, and progress artifacts were present before Stage 27.5 and must be preserved.

## Work Planned

- Remove local preview-rival ranked pairing from the Multiplayer panel flow.
- Add repository seams for ranked queue creation, cancellation, current-status reads, and atomic pairing.
- Use the Stage 27.3 trusted queue RPCs for authenticated ranked Practice queue behavior.
- Create queue-backed matched Practice games only after the trusted pairing RPC reserves a matched game id.
- Keep unmatched queue requests queued and cancelable.
- Preserve unranked and custom game creation flows.
- Preserve Stage 27.4 trusted settlement behavior and all gameplay invariants.
- Add focused tests for queue DTO parsing, RPC call shapes, durable queue matching behavior, UI copy/status, and local repository no-op behavior.

## Results

Stage 27.5 stopped before source/runtime implementation because the currently applied trusted queue RPCs cannot safely create a durable participant-complete ranked Practice game.

Findings:

- `public.create_ranked_async_matchmaking_request` can create an authenticated ranked Practice queue row.
- `public.cancel_ranked_async_matchmaking_request` can cancel the caller's own queued request.
- `public.claim_ranked_async_matchmaking_pair` can atomically reserve a compatible pair and write a shared `matched_game_id`.
- The pairing RPC returns `request_id`, `opponent_request_id`, `matched_game_id`, and `request_status`, but it does not return the matched opponent's participant user id and does not create the `async_multiplayer_games` row.
- Existing `async_multiplayer_games` RLS permits authenticated users to read waiting games and update waiting games as joiners. If the app used the current reservation-only RPC to create a ranked waiting game without the matched opponent identity, the wrong signed-in account could join the ranked matched game.
- Trusted settlement later requires a terminal ranked game with two distinct participant user ids and two matched queue reservation rows for the same `matched_game_id`.

Conclusion:

- Stage 27.5 needs a separately authorized migration/RLS addendum before app implementation can safely continue.
- The safest addendum is a trusted ranked game creation/finalization RPC, or an enhanced pairing RPC, that validates the matched queue reservation and creates exactly one `async_multiplayer_games` row with the two reserved participant user ids and queue-backed metadata.
- App source changes were intentionally not made because a local workaround would weaken ranked queue authority, idempotency, or participant safety.

## Verification

Lightweight blocked-stage verification passed:

- `git diff --check`
- Python CSV shape check for `progress/PROGRESS.csv`
- `git status --short --branch`

## Next Step

Review this Stage 27.5 blocker. If acceptable, explicitly authorize a narrow Stage 27.5A migration/RLS addendum planning pass for trusted ranked Practice queue game creation/finalization before retrying Stage 27.5 app implementation.

## Boundary Confirmation

No source/runtime implementation, tests, migrations, public leaderboards, public profiles, public/guest spectation, deployments, commits, pushes, PRs, merges, releases, branch deletion, Phase 28 work, new custom skills, force-push, secret printing, gameplay-rule changes, or original stable `brrrdle` repository work was performed during Stage 27.5.
