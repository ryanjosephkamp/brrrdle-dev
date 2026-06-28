# Phase 35 Ranked Live Identity Migration/RLS Addendum

**Status:** Migration/RLS addendum for review.
**Phase:** Phase 35 - Auth, Profile, Deployment, And Live Identity Readiness.
**Stage:** Stage 35.2 - Ranked Live Identity Migration/RLS Addendum Planning.
**Repository:** `brrrdle-dev` only.
**Created:** 2026-06-27.
**Baseline:** local `main` and `origin/main` expected at `41f37c3a3734be71a2078a60f7aece46543db5fb`.

## Authority

This addendum is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, `planning/phase-35/PLANNING-BRIEF.md`, `planning/specs/phase-35/PHASE-35-AUTH-PROFILE-DEPLOYMENT-AND-LIVE-IDENTITY-READINESS-SPEC-2026-06-27.md`, `planning/phase-35/IMPLEMENTATION-PLAN.md`, the Stage 35.1 audit in `progress/PROGRESS-STEP-284.md`, completed Phase 34, completed Phase 33, completed Phase 32, completed Phase 29 public profile foundations, completed Phase 28 read-only Live behavior, completed Phase 27 ranked Practice foundations, `docs/supabase.md`, `docs/ranked-multiplayer.md`, and the progress ledger.

This document is planning only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

## Problem Statement

Stage 35.1 found that the persistent ranked Live identity regression is caused by an incomplete ranked-game projection rather than a generic Live card rendering failure.

The current ranked queue finalization path stores a durable `async_multiplayer_games.projection` where `playerProfiles` contains only the finalizing viewer's safe profile summary. This can leave the other seat without a profile object in the projection:

- The creator participant can see the joined player's name if the joined player finalized the ranked match.
- The joined participant can fall back to `Rival` for the creator because the creator profile was not stored in the ranked projection.
- A signed-in nonparticipant spectator can fall back to `Player one` because the authenticated spectator RPC currently builds player identity from `game.projection.players` and `game.projection.playerProfiles`, not from active public profile rows.

Source-only repair can improve participant hydration through the existing Phase 32 participant identity RPC. It cannot fully repair signed-in nonparticipant spectator rows until the spectator projection can resolve both players' active public profile summaries server-side from `async_multiplayer_games.player_one_user_id` and `player_two_user_id`.

## Existing Safe Identity Surfaces

### Phase 29 Public Profile Foundations

`public.public_player_profiles` is the public-safe profile projection. Its public reads are limited to active, public profiles and may expose only:

- `public_profile_id`
- `display_name`
- `accent_color`
- `flair_key`
- `avatar_url`
- `bio`
- `created_at`
- `updated_at`

The browser should not directly read or write the table. Public/profile access flows through allow-listed RPCs.

### Phase 32 Participant Identity RPC

`public.get_multiplayer_participant_identity_summaries(p_game_id text, p_ranked_request_id text)` lets authenticated participants resolve safe summaries for their own async game or matched ranked queue context.

This RPC is participant-scoped and must stay participant-scoped. It is not a spectator or public discovery API.

### Phase 28 Authenticated Spectator RPC

`public.get_authenticated_live_v1_spectator_games_v2(p_limit integer, p_terminal_window_seconds integer)` returns sanitized Live v1 rows for signed-in nonparticipants only. It currently:

- requires `auth.role() = 'authenticated'` and a non-null `auth.uid()`;
- excludes rows where the viewer is `player_one_user_id`, `player_two_user_id`, or `host_user_id`;
- excludes current Daily rows as a defense-in-depth Daily integrity boundary;
- limits terminal rows to a bounded hold window;
- returns read-only capabilities;
- builds `players` from the stored game projection.

That last behavior is the ranked identity gap.

## Required Migration Contract

Stage 35.3, if approved, should create exactly one additive migration that replaces the authenticated spectator v2 RPC with the same function signature and same returned table shape:

```sql
public.get_authenticated_live_v1_spectator_games_v2(
  p_limit integer default 50,
  p_terminal_window_seconds integer default 15
)
```

The migration must not grant direct browser table access to `async_multiplayer_games`, `multiplayer_matchmaking_queue`, rating tables, auth metadata, or private profile tables.

### Authenticated Spectator Identity Resolution

The updated RPC must resolve both player seats server-side from the durable game row:

- `player-one` maps to `async_multiplayer_games.player_one_user_id`.
- `player-two` maps to `async_multiplayer_games.player_two_user_id`.

For each seat, the RPC should left join `public.public_player_profiles` where:

- `profile.user_id = seat_user_id`;
- `profile.visibility = 'public'`;
- `profile.moderation_status = 'active'`.

The returned `players` JSON should preserve the existing array shape accepted by `src/multiplayer/multiplayerRepository.ts`:

```json
[
  {
    "seat": "player-one",
    "label": "Player one",
    "profile": {
      "displayName": "safe public name",
      "avatarUrl": "https://safe.example/avatar.webp",
      "accentColor": "ice",
      "initials": "S"
    }
  }
]
```

The `profile` object must be omitted or empty when the seat user has no active public profile. The app should continue to render generic fallback labels in that case.

### Safe Field Allowlist

The spectator `players[].profile` payload may include only fields already consumed by the Live spectator profile parser:

- `displayName`
- `avatarUrl`
- `accentColor`
- `initials`

`displayName`, `avatarUrl`, and `accentColor` must come from the active public profile row. `initials` may be generated from the active public `display_name` or omitted so the app can derive it later.

The spectator RPC must not add clickable profile identifiers in Phase 35. It must not return `public_profile_id` to the spectator Live payload unless a later approved public-profile browsing phase explicitly authorizes that expansion.

### Projection Fallback Policy

Projection-derived player labels may remain as non-authoritative fallback labels for compatibility, but active public profile rows are the authority for spectator profile objects.

The migration should prefer the active public profile display name for player-facing spectator labels when available. If no active public profile exists, the existing safe fallback sequence may remain:

1. safe non-empty stored projection label that is not `You`;
2. seat fallback: `Player one` or `Player two`.

Projection-derived `playerProfiles` must not override a current inactive, hidden, suspended, or private public profile row for spectator identity. This avoids preserving stale public identity after a player changes visibility or moderation state.

### Preserve Participant Boundaries

The migration must not broaden `get_multiplayer_participant_identity_summaries`. That function remains participant-only.

Participant Live repair after the migration may use the existing participant identity RPC for participant rows and the updated spectator RPC for nonparticipant rows, but that source work requires a separate Stage 35 source authorization.

### Preserve Public/Guest Spectation Deferral

The updated RPC remains authenticated-only. It must continue to revoke execution from `public` and `anon` and grant execution only to `authenticated`.

The migration must not create guest spectator access, public spectator URLs, public game projections, public Live lists, spectator counts, spectator lists, or public profile browsing.

### Preserve Daily And Read-Only Boundaries

The updated RPC must preserve the Phase 28 v2 behavior:

- no current Daily spectator rows;
- bounded terminal hold only;
- signed-in nonparticipant rows only;
- read-only spectator capabilities only;
- no join, submit, forfeit, cancel, timer, claim, rating, settlement, or mutation authority.

### Forbidden Payload Data

The RPC and any probes must not print or expose:

- raw auth IDs;
- auth emails;
- private profile fields;
- account metadata;
- progress, settings, or history rows;
- raw game projection objects;
- serialized sessions;
- player sessions;
- answers;
- seeds;
- queue internals;
- rating internals;
- rating transaction IDs;
- settlement IDs;
- service role keys;
- Supabase keys beyond already public browser configuration;
- Vercel tokens;
- local session artifacts;
- screenshots, videos, traces, or auth state.

## Grants And RLS Expectations

The expected migration pattern is:

- `create or replace function public.get_authenticated_live_v1_spectator_games_v2(...)`;
- keep `language sql` or a similarly minimal server-side implementation;
- keep `stable` where valid;
- keep `security definer`;
- use an explicit safe search path;
- do not add direct table grants;
- `revoke all` on the function from `public` and `anon`;
- `grant execute` only to `authenticated`.

The function may read `public.public_player_profiles` internally under its security definer context, but the output is constrained by the active public profile filters and the field allowlist above.

## Abuse And Privacy Boundaries

The RPC remains a discovery surface for signed-in nonparticipants. Abuse risk is controlled by:

- existing row limit clamping;
- existing terminal-window clamping;
- authenticated-only execution;
- no raw ids or contact fields;
- no current Daily rows;
- no direct table reads;
- active public profile filtering;
- no profile IDs or public profile pages in Phase 35;
- no mutation capability.

If future work needs public/guest spectation, spectator counts, spectator lists, profile links, or site-wide presence, it must go through later phase planning with separate RLS and abuse review.

## Idempotency And Compatibility

The migration should be idempotent:

- use `create or replace function`;
- preserve the RPC signature and returned columns;
- preserve existing indexes unless a narrowly justified additive index is required;
- preserve current parser-compatible JSON keys;
- preserve terminal hold and Daily exclusion semantics.

Existing clients should continue to parse spectator rows. Source follow-up may add tests around `players[].profile` preference without requiring a DTO shape break.

## Rollback Notes

Rollback should be possible by reapplying the previous Phase 28 v2 RPC body or a reviewed rollback migration that restores projection-only `players` generation.

Rollback must not drop `public.public_player_profiles`, participant identity functions, ranked queue functions, rating tables, or async multiplayer tables.

## Non-Printing Probe Expectations

Stage 35.3 migration execution, if authorized, should run non-printing or redacted probes that verify behavior without dumping private data.

Required probe assertions:

1. Anonymous execution is denied.
2. Authenticated participant execution for a row where the viewer is a participant does not return that row through the spectator RPC.
3. Authenticated nonparticipant execution can return an eligible ranked Practice row.
4. For a ranked row where `projection.playerProfiles` is missing one participant, both seats resolve active public profile names from `player_one_user_id` and `player_two_user_id`.
5. If a seat has no active public profile, the profile object is omitted and the row falls back to a generic safe label.
6. Hidden, suspended, or private public profiles are not returned as spectator profiles.
7. Returned JSON contains no forbidden keys such as `user_id`, `email`, `projection`, `serializedSession`, `playerSessions`, `answer`, `seed`, `queue`, `ratingTransaction`, `settlement`, or token-like values.
8. Current Daily rows remain excluded.
9. Terminal rows remain limited by `p_terminal_window_seconds`.
10. Read-only spectator capabilities remain all false.

The probes should report counts, booleans, and redacted/pass-fail summaries only.

## Source Follow-Up Expectations

After a clean migration/RLS execution, a later source stage should:

- keep participant rows using the participant identity RPC for participant perspectives;
- keep spectator rows using the updated authenticated spectator RPC;
- prefer active public profile display names over generic fallback labels;
- preserve `You` only for the current viewer's own participant context;
- preserve generic fallback labels when safe identity is genuinely unavailable;
- add focused tests for ranked creator participant, joined participant, and signed-in nonparticipant spectator perspectives;
- preserve unranked Live identity behavior.

That source repair is not authorized by this addendum.

## Stop Conditions For Stage 35.3

Stop before creating or applying a migration if:

- the target repository is not `brrrdle-dev`;
- the original stable `brrrdle` repository would be touched;
- the intended Supabase target is ambiguous;
- credentials are missing or ambiguous;
- the migration cannot preserve the RPC signature and output shape;
- public/anon access would be broadened;
- raw auth IDs, emails, private profile data, answers, seeds, sessions, queue internals, rating internals, tokens, or local artifacts would be exposed;
- probes cannot be run without printing sensitive payloads;
- any verification fails.

## Recommended Next Gated Action

After user review, the next safe action should be Stage 35.3 migration/RLS execution for this addendum, not source repair yet.

Reason: participant source repair can use existing safe data, but the signed-in nonparticipant spectator path requires the authenticated spectator RPC to return both active public profile summaries. Once the migration/RLS probe evidence is clean, a later Stage 35 source repair can update the Live identity mapping and tests.
