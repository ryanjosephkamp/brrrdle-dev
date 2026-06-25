# Phase 32 Participant Identity Migration/RLS Addendum

**Status**: Addendum for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-24.
**Stage**: Phase 32 Stage 32.2.

## Authority

This addendum is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, `planning/phase-32/PLANNING-BRIEF.md`, `planning/specs/phase-32/PHASE-32-MULTIPLAYER-STABILIZATION-IDENTITY-ROUTING-AND-RATING-DISPLAY-SPEC-2026-06-24.md`, `planning/phase-32/IMPLEMENTATION-PLAN.md`, Stage 32.1 audit findings in `progress/PROGRESS-STEP-250.md`, completed Phase 31 rematch foundations, completed Phase 30 public leaderboards, completed Phase 29 public profile foundations, completed Phase 28 Live spectator behavior, completed Phase 27 ranked Practice foundations, `docs/supabase.md`, `progress/PROGRESS.csv`, and current progress records.

This document does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, deployment, commits, pushes, pull requests, merges, releases, branch deletion, Stage 32.3 execution, Phase 33 ranked mode expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, private data exposure, local session artifact exposure, or work in the original stable `brrrdle` repository.

## Purpose

Stage 32.1 found that the rematch lifecycle, ranked queue polling, lobby routing, account accent, and no-comma rating fixes are app-side. The remaining SQL/RLS contract gap is opponent identity in participant views.

Current public profile RPCs read by opaque `public_profile_id`. Multiplayer game and ranked queue contexts have participant auth IDs internally, but the browser must not receive raw auth IDs or read profile tables directly. Phase 32 therefore needs one narrow, additive, authenticated-only participant identity projection that lets a signed-in game or ranked queue participant resolve public-active display summaries for the participants in that same context.

## In Scope

- Add a participant-scoped public identity RPC for existing participant-owned multiplayer contexts.
- Support durable `async_multiplayer_games` contexts where the caller is `player_one_user_id` or `player_two_user_id`.
- Support matched ranked Practice queue contexts where the caller owns the request and the matched pair is valid.
- Return one allow-listed row per known participant seat.
- Join public profile data only from `public.public_player_profiles`.
- Return public profile fields only when `visibility = 'public'` and `moderation_status = 'active'`.
- Return a safe unavailable state for private, hidden, suspended, missing, or non-public profiles without disclosing which condition applied.
- Keep direct table access and existing RLS boundaries unchanged.

## Out Of Scope

- Direct client read access to `public_player_profiles`, `async_multiplayer_games`, `multiplayer_matchmaking_queue`, rating tables, rematch tables, or auth tables.
- Public or anon participant identity lookup.
- Public/guest spectation.
- Clickable public profile routes, in-game identity cards, or leaderboard profile navigation.
- Private profile summaries from private `profiles` rows.
- New rematch lifecycle SQL.
- New queue polling SQL.
- New lobby routing SQL.
- Account accent SQL.
- Rating/Elo formatting SQL.
- Ranked mode expansion.
- Elo algorithm, trusted settlement, scoring, Daily claim, timeout, forfeit, GO transition, keyboard, or gameplay-rule changes.

## Recommended SQL Contract

Create exactly one additive authenticated-only RPC unless Stage 32.3 discovers an implementation-level reason to split helper functions:

```sql
public.get_multiplayer_participant_identity_summaries(
  p_game_id text default null,
  p_ranked_request_id text default null
)
```

The function should return:

```sql
seat text,
is_viewer boolean,
identity_available boolean,
public_profile_id uuid,
display_name text,
accent_color text,
flair_key text,
avatar_url text,
updated_at timestamptz
```

Return-field rules:

- `seat` must be `player-one` or `player-two`.
- `is_viewer` may be true only for the authenticated caller's seat.
- `identity_available` is true only when an active public profile row is returned.
- `public_profile_id`, `display_name`, `accent_color`, `flair_key`, `avatar_url`, and `updated_at` must be null when `identity_available` is false.
- The RPC must not return `bio` for participant game labels in Phase 32; in-game labels need name/accent/avatar only, and omitting bio reduces unnecessary display surface.
- The RPC must not return context IDs, request IDs, match IDs, queue IDs, user IDs, auth emails, moderation status, visibility status, profile owner IDs, rating transaction IDs, settlement IDs, or any game/session/answer data.

Argument rules:

- Exactly one of `p_game_id` or `p_ranked_request_id` must be provided.
- If both are null or both are provided, raise a non-secret validation error.
- Blank IDs are invalid.

Execution rules:

- `security definer`.
- Explicit `set search_path = ''`.
- Revoke execute from `PUBLIC`, `anon`, and `authenticated`, then grant execute only to `authenticated`.
- Use fully qualified table/function names.
- Check `auth.role() = 'authenticated'` and `auth.uid()` is not null.
- Do not grant direct table access.

## Game Context Rules

For `p_game_id`:

- Read the matching `public.async_multiplayer_games` row internally.
- The caller must match `player_one_user_id` or `player_two_user_id`.
- Return one row for each non-null participant seat in that game.
- Use `player-one` for `player_one_user_id` and `player-two` for `player_two_user_id`.
- Do not require the game to be nonterminal; terminal postgame screens still need safe opponent labels.
- Do not return answer-bearing projection data, serialized sessions, player sessions, move history, current turn, winner, score, deadline, Daily key, custom code, matchmaking request ID, rating bucket, or any other game metadata.
- Daily Multiplayer rows may use this identity projection for participants only, but the RPC must not expose Daily answers, seeds, claims, UTC keys, or spectator information.

## Ranked Queue Context Rules

For `p_ranked_request_id`:

- Read the caller-owned `public.multiplayer_matchmaking_queue` row internally.
- The caller must own the request.
- Only matched ranked Practice v1 requests may return participant rows.
- The matched pair must contain exactly two distinct authenticated users with:
  - `status = 'matched'`;
  - `transport = 'async'`;
  - `scope = 'practice'`;
  - `ranked = true`;
  - `time_limit_ms is null`;
  - compatible `mode`, `rating_bucket`, `word_length`, and `hard_mode`;
  - a non-empty matched game id.
- Seat assignment must match Phase 27 deterministic queue finalization ordering: earliest `queued_at`, then `id`, becomes `player-one`; the other participant becomes `player-two`.
- If the request is queued, cancelled, expired, malformed, not owned by the caller, or not Phase 27 ranked Practice v1, return no rows or raise a non-secret validation/authorization error as appropriate.
- Do not return request IDs, opponent request IDs, matched game IDs, queue internals, rating snapshots, search bands, raw queue status, or participant auth IDs.

## Public Profile Join Rules

The RPC may internally join participant user IDs to `public.public_player_profiles.user_id`, but output must be limited to active public profiles:

- `visibility = 'public'`
- `moderation_status = 'active'`

For private, hidden, suspended, missing, or invalid public profile rows:

- still return the participant `seat` and `is_viewer`;
- set `identity_available = false`;
- set all public profile output fields to null;
- do not reveal whether the profile is private, hidden, suspended, missing, or malformed.

This preserves Phase 29 default-private behavior while allowing participant UIs to use a generic fallback label when no public-safe identity is available.

## Forbidden Data

The Stage 32 participant identity RPC must never return, log, or expose:

- raw auth emails;
- raw auth user IDs;
- auth metadata;
- private account profile metadata;
- private public-profile drafts;
- moderation status or visibility status;
- tokens, service-role keys, session data, local/session artifacts, auth state, screenshots, videos, or traces;
- private progress, settings, history, or economy data;
- answers, seeds, serialized sessions, player sessions, move history, keyboard evidence, guesses, or game projections;
- queue request IDs, opponent request IDs, matched game IDs, queue internals, rating snapshots, or search bands;
- raw rating transaction IDs, match result IDs, settlement IDs, idempotency keys, or private ranked projections;
- spectator rows or public/guest spectator data.

## Grants And RLS

- Keep existing RLS policies on `public_player_profiles`, `async_multiplayer_games`, `multiplayer_matchmaking_queue`, and rematch tables unchanged.
- Do not add direct browser grants to raw tables.
- Revoke all on the new RPC from `PUBLIC`, `anon`, and `authenticated`.
- Grant execute on the new RPC only to `authenticated`.
- The RPC must enforce participant membership internally and must not rely on broad table grants.
- No new table is required.
- No new direct view is required by default. Prefer an RPC over a view so participant checks and output filtering stay explicit.

## Verification And Privacy Probes

Stage 32.3 execution should include non-printing probes that confirm:

- anon execution is denied.
- unauthenticated/public execution is denied.
- an authenticated nonparticipant cannot resolve a game's participant identities.
- an authenticated participant can resolve rows only for their own participant game.
- an authenticated ranked queue requester can resolve rows only for their own matched ranked Practice v1 request.
- queued, expired, cancelled, malformed, non-owned, Daily-ranked, timed-ranked, or custom-ranked queue requests do not expose opponent identity rows.
- active public profiles return only `seat`, `is_viewer`, `identity_available`, `public_profile_id`, `display_name`, `accent_color`, `flair_key`, `avatar_url`, and `updated_at`.
- private, hidden, suspended, and missing profile rows return `identity_available = false` and null public profile fields without revealing the reason.
- no returned column includes raw auth IDs, emails, queue IDs, game internals, answers, seeds, sessions, projections, rating transaction IDs, settlement IDs, tokens, or local artifacts.
- existing Phase 29 public profile RPC behavior remains unchanged.
- existing Phase 30 public leaderboard RPC behavior remains unchanged.
- existing Phase 31 rematch RPC behavior remains unchanged.

Probe outputs and progress reports must avoid printing secrets, raw auth IDs, private emails, auth state, tokens, local session artifacts, screenshots, videos, traces, or private user data.

## App-Side Work Confirmed Out Of This Addendum

Stage 32.1 confirmed the following should remain app-side and should not require SQL changes:

- rematch request polling/refresh and lifecycle synchronization;
- eligible rematch projection repair for unranked games carrying legacy `ratingBucket` values;
- ranked queue visible polling and finalized-game auto-routing;
- lobby creator snapshot reconciliation and auto-routing;
- global account avatar accent propagation after private profile save;
- no-comma Elo/rating/rank display.

## Rollback

Rollback for Stage 32.3 should be limited to dropping the new RPC and any helper function created solely for it. Because this addendum does not require new tables, table grants, or policy rewrites, rollback should not affect existing Phase 27 ranked queue, Phase 29 public profile, Phase 30 public leaderboard, or Phase 31 rematch behavior.

## Stage 32.3 Recommendation

If this addendum is approved, Stage 32.3 should create one additive Supabase migration that implements `public.get_multiplayer_participant_identity_summaries`, applies it only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous, runs the non-printing privacy probes above, and stops before app source/runtime implementation.
