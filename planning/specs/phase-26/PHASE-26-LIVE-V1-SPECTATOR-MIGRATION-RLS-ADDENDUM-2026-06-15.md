# Phase 26 Live v1 Spectator Migration/RLS Addendum

**Date**: 2026-06-15
**Status**: Planning addendum - awaiting explicit migration execution authorization
**Repository**: `brrrdle-dev`
**Authority**: This document is a Stage 26.5A planning artifact. It does not authorize migration creation, migration execution, source/runtime implementation, test implementation, public/guest spectation, deployment, PR work, release work, or work against the original stable `brrrdle` repository.

## 1. Purpose

Stage 26.5 found that authenticated nonparticipant Live v1 spectation cannot be implemented safely by broadening reads on the current active Multiplayer table.

The active runtime uses `async_multiplayer_games`. Its raw `projection` contains answer-bearing gameplay state, including `serializedSession` and `playerSessions`. Any Live v1 spectator path must therefore expose a sanitized authenticated projection rather than raw table rows.

This addendum defines the recommended Supabase migration/RLS shape for that projection so a later, separately authorized migration stage can implement and verify it.

## 2. Current Facts

- The current mounted Multiplayer runtime reads and writes `async_multiplayer_games`.
- Legacy `live_matches`, `live_match_participants`, `live_match_events`, and `live_match_spectators` tables exist as compatibility artifacts, but they are not the active Live v1 implementation path.
- `async_multiplayer_games.projection` stores canonical game projection JSON.
- That projection includes `serializedSession`, `playerSessions`, and other game internals.
- OG serialized sessions include the answer.
- GO serialized sessions include per-puzzle answers.
- Current `async_multiplayer_games` RLS permits authenticated SELECT for waiting games and participant-owned games, not arbitrary active playing games.
- Granting authenticated nonparticipants broad SELECT on active `async_multiplayer_games` rows would expose raw answer-bearing data.

## 3. Goals

- Allow signed-in nonparticipants to discover and open eligible currently playing Multiplayer games from Live v1.
- Keep spectator access read-only.
- Keep participant create, join, resume, save, forfeit, timeout, scoring, rating, and Daily claim behavior unchanged.
- Expose only spectator-safe game state needed to render a read-only Live board and metadata.
- Preserve Daily Multiplayer as strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Preserve Practice Multiplayer Hard Mode, time limits, scoring, timeout, forfeit, rating/ELO, GO transition, solved-row hold, keyboard-state behavior, Solo Daily fixed-five behavior, and Practice 2-35 behavior.

## 4. Non-Goals

- Public or guest spectation.
- Browser notifications, service workers, push infrastructure, or cross-device notification delivery.
- Spectator chat, reactions, social presence, or follow systems.
- Leaderboards, public profile pages, Elo/ranking redesign, or matchmaking changes.
- Any client-side mutation path for spectators.
- Any raw answer/session exposure to nonparticipants.
- Any migration execution during Stage 26.5A.

## 5. Recommended Migration Shape

### 5.1 Primary Access Path

Create a sanitized authenticated RPC for spectatable `async_multiplayer_games` rows.

Recommended shape:

```sql
public.get_authenticated_live_v1_spectator_games()
returns setof public.live_v1_spectator_game
```

The exact SQL should be authored in the migration execution stage, but the design should follow these constraints:

- Use a dedicated return type or table-returning function with explicit columns.
- Prefer `security definer` because existing RLS intentionally blocks nonparticipant active-game table reads.
- Set a safe `search_path`, such as `public, pg_temp`.
- Check `auth.role() = 'authenticated'` and `auth.uid() is not null` inside the function.
- Return only `status = 'playing'` rows with both participant seats filled.
- Return both Daily and Practice Multiplayer games when eligible.
- Exclude rows where the viewer is already a participant unless the app specifically needs one combined Live query. Participant resume rows can continue to use the existing repository path.
- Order by `updated_at desc` with a conservative limit if needed.

Do not change the existing raw SELECT policy on `async_multiplayer_games` to allow all authenticated users to read active rows.

### 5.2 Eligible Statuses

Initial Live v1 spectator discovery should include only active playing games:

- Included: `playing`
- Excluded: `waiting`, `won`, `lost`, `expired`, `cancelled`

Waiting lobbies already have their own lobby path. Terminal games belong in History or participant result views, not Live v1 spectator discovery.

### 5.3 Required Returned Fields

The spectator RPC should return only explicit, safe fields:

- `id`
- `scope`
- `mode`
- `status`
- `daily_date_key`
- `word_length`
- `difficulty`
- `go_puzzle_count`
- `hard_mode`
- `ranked`
- `rating_bucket`
- `current_turn_seat`
- `created_at`
- `updated_at`
- `deadline_at`
- `time_limit_ms`
- `players`
- `moves`
- `progress`
- `spectator_capabilities`

Recommended `players` shape:

```json
[
  {
    "seat": "player-one",
    "label": "Player",
    "profile": {
      "displayName": "Player",
      "avatarUrl": null,
      "accentColor": null,
      "initials": "P"
    }
  }
]
```

Recommended `moves` shape:

```json
[
  {
    "seat": "player-one",
    "puzzleIndex": 0,
    "guess": "ROBOT",
    "tiles": [
      { "letter": "R", "state": "correct" }
    ],
    "createdAt": "2026-06-15T00:00:00.000Z"
  }
]
```

Recommended `progress` shape:

```json
{
  "moveCount": 4,
  "currentPuzzleIndex": 0,
  "solvedPuzzleCount": 0,
  "latestMoveAt": "2026-06-15T00:00:00.000Z"
}
```

Recommended `spectator_capabilities` shape:

```json
{
  "canSubmitGuess": false,
  "canForfeit": false,
  "canCancel": false,
  "canJoin": false,
  "canMutate": false
}
```

### 5.4 Explicitly Excluded Fields

The spectator RPC must not return:

- `projection`
- `serializedSession`
- `playerSessions`
- OG answer fields
- GO puzzle answer fields
- prior answer arrays that reveal future or hidden answers
- seeds or deterministic answer-derivation inputs
- raw auth user ids
- emails
- private profile payloads
- unsubmitted local drafts
- participant-only clock mutation state beyond safe display metadata
- row fields that grant or imply mutation authority
- service-role-only data

### 5.5 Submitted Guess Visibility

Submitted guesses and their evaluated tile states may be exposed to authenticated spectators because they are already visible board evidence during Live play.

If a future privacy review decides submitted guess text should not be public to authenticated spectators, the RPC can return tile letters and states only. The initial recommendation is to include submitted guess text and tile states because spectators need the board to be intelligible.

### 5.6 Current Puzzle Index

For GO games, the RPC may expose a derived `currentPuzzleIndex` but must not return puzzle answers. The migration should prefer derivation from safe progress data where practical. If server-side extraction from the raw projection is necessary, it must copy out only the numeric index and never return the raw session object.

### 5.7 Time Metadata

For Practice games with time limits, the RPC may expose `deadline_at`, `time_limit_ms`, and safe display-only clock metadata. The first Live v1 implementation should avoid introducing a spectator-owned ticking clock authority. Participant timers remain canonical through existing game logic.

## 6. Grants And RLS Behavior

The migration should:

- Keep RLS enabled on `async_multiplayer_games`.
- Preserve the existing participant/waiting SELECT policy.
- Preserve existing INSERT and UPDATE policies.
- Revoke the spectator RPC from `public` and `anon`.
- Grant EXECUTE on the spectator RPC to `authenticated` only.
- Avoid granting raw `projection` access to authenticated nonparticipants.
- Avoid exposing anonymous/public access.

Recommended grant posture:

```sql
revoke all on function public.get_authenticated_live_v1_spectator_games() from public;
revoke all on function public.get_authenticated_live_v1_spectator_games() from anon;
grant execute on function public.get_authenticated_live_v1_spectator_games() to authenticated;
```

If the migration uses a custom composite type, ensure type visibility does not accidentally expose tables or require broader table grants.

## 7. Optional Presence Table Decision

Do not add a persistent spectator presence table in the first migration unless implementation discovery proves it is required.

Recommended initial Live v1 behavior:

- Discovery: RPC returns eligible active games.
- Viewing: read-only client state opens the spectator surface.
- Presence count: omitted or displayed as unavailable.

If later required, add a separately planned `async_multiplayer_spectators` table with strict policies:

- `game_id`
- `user_id`
- `profile`
- `joined_at`
- `last_seen_at`
- primary key on `(game_id, user_id)`
- authenticated users can read/write only their own spectator row unless a later sanitized count projection is approved
- no participant mutation permissions
- no public/guest access

Presence should remain explicitly deferred for Stage 26.5B unless the migration execution prompt authorizes it.

## 8. App Implementation Dependencies

After the migration is created, executed, and verified, source implementation should add a separate read-only repository seam.

Recommended app direction:

- Add a spectator DTO parser independent from `normalizeMultiplayerState`.
- Add a method such as `loadAuthenticatedLiveSpectatorRows`.
- Keep participant resume rows on the existing Multiplayer repository path.
- Add view models that distinguish:
  - participant resumable rows;
  - authenticated spectator read-only rows;
  - restricted signed-out/public rows.
- Ensure spectator UI omits submit, keyboard input, forfeit, cancel, join, and editable controls.
- Preserve the current Live v0 participant resume behavior.

## 9. Privacy Review Checklist

Before executing or shipping the migration, verify:

- Anonymous users cannot call the RPC.
- Signed-out app clients cannot discover spectator rows.
- Authenticated nonparticipants cannot SELECT raw active `async_multiplayer_games` rows.
- Authenticated nonparticipants can call only the sanitized spectator RPC.
- RPC output contains no `answer`, `serializedSession`, `playerSessions`, `projection`, raw ids, or emails.
- Participant create/join/resume/save/update behavior remains unchanged.
- Daily claim triggers and release rules remain unchanged.
- Terminal and waiting games do not appear in spectator Live v1 discovery.
- Spectator rows cannot be used to mutate games, claims, ratings, moves, timers, or results.

## 10. Rollback Plan

The migration should be additive and reversible.

Rollback should:

- Drop the spectator RPC.
- Drop any custom spectator return type if created.
- Drop any optional spectator-only index if created.
- Drop optional presence table and policies only if that table was explicitly authorized and created.
- Leave `async_multiplayer_games`, existing RLS policies, Daily claim triggers, and participant grants intact.

Because the recommended first migration does not rewrite existing data, rollback should not require data restoration.

## 11. Verification Plan

### 11.1 Migration-Level Verification

After explicit migration authorization and execution:

- Confirm the RPC exists and has the intended grants.
- Confirm `anon` cannot execute it.
- Confirm authenticated nonparticipants can execute it.
- Confirm authenticated nonparticipants still cannot read raw active rows through broad SELECT.
- Confirm participant reads through the existing repository still work.
- Confirm the RPC returns only `playing` rows with both seats filled.
- Confirm the RPC excludes answer-bearing and private fields by key scan and by representative row inspection.

### 11.2 App-Level Verification After Source Implementation

After the later Stage 26.5C app implementation:

- Focused Live v1 view-model tests.
- Repository parsing tests for sanitized spectator DTOs.
- Component tests proving spectator cards are read-only.
- Workspace tests proving participant rows remain resumable.
- Signed-out tests proving public/guest spectation remains unavailable.

### 11.3 Real Supabase-Backed E2E

Run a three-client E2E after migration and app implementation:

- Player one creates a Practice Multiplayer game.
- Player two joins and submits moves.
- Authenticated nonparticipant opens Live v1 and sees the game as read-only.
- Spectator sees submitted board evidence but no answer-bearing data.
- Spectator cannot submit, forfeit, cancel, join, or mutate the match.
- Participant clients continue normal gameplay.
- Cleanup removes temporary rows, claims if applicable, and temporary users.

Daily Multiplayer should also be covered or probed to confirm:

- UTC-day behavior remains unchanged.
- Daily claim behavior remains claim-safe.
- No Daily Hard Mode or clock controls appear.
- Answer-separated behavior is preserved.

## 12. Stop Conditions

Stop before migration execution or app implementation if:

- A sanitized projection cannot be built without returning raw session data.
- The required UI cannot be rendered without exposing answers.
- RLS cannot be kept participant-safe while adding the spectator path.
- The migration would require destructive table rewrites.
- The migration would alter participant save/update policies.
- Public/guest spectation becomes necessary to complete the authenticated scope.
- Three-client E2E cannot be designed without leaking secrets or relying on production-only state.

## 13. Open Decisions

- Whether the initial spectator RPC should include participant rows with a `viewerRole` field or only nonparticipant spectator rows. Recommendation: return nonparticipant spectator rows only; keep participant rows on the existing repository path.
- Whether the RPC should include submitted guess text or tile-only board evidence. Recommendation: include submitted guess text and tile states for authenticated spectators only.
- Whether Practice timed games should expose a spectator clock. Recommendation: expose only safe display metadata initially, not a spectator-owned ticking authority.
- Whether persistent spectator presence is needed in Phase 26. Recommendation: defer presence until read-only authenticated spectation is verified.
- Whether Daily Multiplayer should be included in the first Live v1 spectator implementation. Recommendation: include active Daily Multiplayer only through the sanitized projection, while preserving all Daily invariants.

## 14. Recommended Next Gated Action

The next action should be an explicit Stage 26.5B migration execution prompt.

That prompt should authorize creating the SQL migration, applying it only to the intended `brrrdle-dev` Supabase project when the project target is unambiguous, running migration-level privacy probes without printing secrets, and updating progress. It should not authorize Live v1 source/runtime implementation unless the migration passes and the user separately approves the app implementation stage.
