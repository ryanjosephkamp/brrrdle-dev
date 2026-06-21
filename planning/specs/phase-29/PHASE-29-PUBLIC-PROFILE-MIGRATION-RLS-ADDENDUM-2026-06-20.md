# Phase 29 Public Profile Migration/RLS Addendum

**Status**: Draft for review; Stage 29.2 planning only.
**Date**: 2026-06-20
**Phase**: Phase 29 - Public profile foundations, notification action cleanup, and About-tab Elo transparency.
**Authority**: Current user authorization for Stage 29.2 planning, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-29/PLANNING-BRIEF.md`, `planning/specs/phase-29/PHASE-29-PUBLIC-PROFILES-NOTIFICATION-ACTIONS-AND-ELO-ABOUT-SPEC-2026-06-20.md`, `planning/phase-29/IMPLEMENTATION-PLAN.md`, and `progress/PROGRESS-STEP-216.md`.

This addendum is not migration execution authorization. It defines the safest additive Supabase contract for Stage 29.3 if the user separately authorizes migration creation and execution.

## 1. Stage 29.1 Finding

Stage 29.1 confirmed that a migration/RLS addendum is required before public profile implementation:

- existing `public.profiles` rows are private, owner/admin scoped, and include account metadata such as email;
- existing Supabase auth metadata is useful for private account UI but is not a public profile contract;
- existing private progress, settings, history, ranked projection, rating transaction, game, session, answer, seed, and spectator surfaces must remain private;
- existing avatar upload paths may include raw user ids, so public avatar behavior needs an explicit safety rule;
- Phase 30 leaderboards need a future-safe identity reference, but Phase 29 must not implement leaderboards.

## 2. Recommended Migration Shape

Create one additive migration in Stage 29.3 that adds a new public-safe profile projection rather than widening the current `profiles` table.

Recommended table name:

- `public.public_player_profiles`

Recommended table columns:

- `user_id uuid primary key references auth.users(id) on delete cascade`
- `public_profile_id uuid not null default gen_random_uuid() unique`
- `visibility text not null default 'private' check (visibility in ('private', 'public'))`
- `display_name text`
- `accent_color text not null default 'ice' check (accent_color in ('ice', 'aurora', 'cyan', 'violet', 'rose', 'amber'))`
- `flair_key text not null default 'none' check (flair_key in ('none'))`
- `avatar_url text`
- `bio text`
- `moderation_status text not null default 'active' check (moderation_status in ('active', 'hidden', 'suspended'))`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`

Recommended indexes and constraints:

- unique index on `public_profile_id`;
- partial index on `(visibility, moderation_status, updated_at desc)` for public discovery/future Phase 30 joins;
- optional expression or check constraints for length/control-character validation if implemented directly in SQL;
- no slug column in Phase 29. Opaque `public_profile_id` is the only public link key for this phase.

Rationale:

- `user_id` is required for ownership and trusted joins, but it must never appear in public DTO/RPC output.
- `public_profile_id` gives Phase 30 leaderboards a durable public identity key without exposing raw auth ids.
- Default-private visibility makes public exposure opt-in.
- A nullable public avatar URL keeps the schema future-safe without forcing unsafe reuse of existing avatar storage paths.
- A constrained `flair_key` reserves the field without creating unmoderated arbitrary public text.
- `moderation_status` lets a future admin/moderation pass hide public rows without deleting player data.

## 3. Public Field Allow-List

Only these fields may be returned by public read RPCs:

- `public_profile_id`
- `display_name`
- `accent_color`
- `flair_key`
- `avatar_url`
- `bio`
- `created_at`
- `updated_at`

The public DTO must not include:

- `user_id`
- raw auth email
- raw Supabase auth id
- auth metadata
- app metadata
- role/admin status
- private `profiles` rows
- `progress_snapshots`
- `settings`
- `game_history`
- guest/local progress payloads
- private ranked projection rows
- raw rating transactions
- raw match/result ids
- queue ids
- settlement ids
- daily claims
- live spectator rows
- `async_multiplayer_games` rows
- raw game projections
- serialized sessions
- player sessions
- answers
- seeds
- service ids
- tokens
- local/session artifacts

## 4. Validation Decisions

Display name:

- Optional while `visibility='private'`.
- Required to enable `visibility='public'`.
- Normalize by trimming whitespace.
- Reject empty public names.
- Reject control characters.
- Cap at the existing private-profile limit of 50 characters.
- Do not auto-derive public names from email local-parts.

Accent color:

- Use the existing profile accent allow-list: `ice`, `aurora`, `cyan`, `violet`, `rose`, `amber`.
- Default to `ice`.

Flair:

- Ship Phase 29 with `flair_key='none'` only.
- Future earned/admin-granted flair should require a later addendum because it may imply achievements, moderation, or economy authority.

Bio:

- Allow a short optional plain-text bio.
- Recommended max length: 160 characters.
- Trim whitespace.
- Reject control characters.
- Store empty strings as null.
- Render as text only; no Markdown or HTML.

Avatar URL:

- Nullable.
- Do not auto-copy the private account avatar URL into the public profile.
- Accept only `https://` URLs if non-null.
- Reject `data:` URLs, `javascript:`, `http:`, relative URLs, and oversized strings.
- Reject URLs containing the caller's raw auth user id string. Existing avatar storage paths may include `avatars/<user-id>/...`; those must not become public profile defaults.
- Stage 29.4 may render initials/accent fallback when `avatar_url` is null.

Visibility:

- Default `private`.
- Public reads require `visibility='public'` and `moderation_status='active'`.
- Owners may read their own row regardless of visibility through an authenticated owner RPC.

## 5. RPC Contract

Do not grant broad browser table access. Stage 29.3 should expose profile data through security-definer RPCs with explicit allow-listed returns.

Recommended RPCs:

### `public.get_my_public_player_profile()`

Audience: authenticated owner only.

Purpose: return the caller's own profile projection for editing/preview.

Return fields:

- `public_profile_id`
- `visibility`
- `display_name`
- `accent_color`
- `flair_key`
- `avatar_url`
- `bio`
- `moderation_status`
- `created_at`
- `updated_at`

Rules:

- require `auth.role()='authenticated'` and non-null `auth.uid()`;
- return at most one row;
- never return `user_id`, email, auth metadata, private progress, rating details, or game data.

### `public.upsert_my_public_player_profile(...)`

Audience: authenticated owner only.

Suggested parameters:

- `p_display_name text default null`
- `p_accent_color text default 'ice'`
- `p_avatar_url text default null`
- `p_bio text default null`
- `p_visibility text default 'private'`

Purpose: create/update the caller's own public profile projection with server-side validation.

Rules:

- require `auth.role()='authenticated'` and non-null `auth.uid()`;
- ignore or reject any caller-supplied `user_id`, `public_profile_id`, `moderation_status`, role, rating, progress, or gameplay authority values;
- validate all public fields server-side;
- use insert-on-conflict on `user_id` so the caller has exactly one public profile projection row;
- preserve the existing `public_profile_id` on updates;
- set `updated_at=now()`;
- return the same owner-safe fields as `get_my_public_player_profile()`.

### `public.get_public_player_profile(p_public_profile_id uuid)`

Audience: `anon` and `authenticated`.

Purpose: read one explicitly public, active profile by opaque public id.

Return fields:

- `public_profile_id`
- `display_name`
- `accent_color`
- `flair_key`
- `avatar_url`
- `bio`
- `created_at`
- `updated_at`

Rules:

- return a row only when `visibility='public'` and `moderation_status='active'`;
- require a non-null opaque public profile id;
- never return `user_id`, email, private metadata, progress, rating internals, sessions, answers, seeds, or local artifacts.

### `public.get_public_player_profiles(p_public_profile_ids uuid[])`

Audience: `anon` and `authenticated`.

Purpose: future-safe Phase 30 identity hydration for leaderboard rows without exposing raw auth ids.

Return fields:

- same public allow-list as `get_public_player_profile`;
- optional `ordinal` or stable ordering only if needed by implementation.

Rules:

- cap input length, recommended maximum 100 ids;
- return only explicitly public, active rows;
- do not return private/missing rows as distinguishable private-user details beyond absence from the result set;
- do not include rank, rating, game count, streak, or leaderboard metrics in Phase 29.

## 6. RLS And Grants

Recommended table posture:

- enable RLS on `public.public_player_profiles`;
- revoke all direct privileges on the table from `anon` and `authenticated`;
- grant direct table access only to trusted roles as needed by the migration owner/service role;
- use RPCs as the browser contract.

Recommended RLS defense-in-depth policies:

- owner select: `auth.uid() = user_id`;
- owner insert: `auth.uid() = user_id`;
- owner update: `auth.uid() = user_id`;
- no browser delete policy;
- no public direct table select policy.

Recommended RPC grants:

- grant execute on `get_my_public_player_profile()` to `authenticated`;
- grant execute on `upsert_my_public_player_profile(...)` to `authenticated`;
- grant execute on `get_public_player_profile(uuid)` to `anon`, `authenticated`;
- grant execute on `get_public_player_profiles(uuid[])` to `anon`, `authenticated`;
- do not grant execute on owner-write RPCs to `anon`.

Recommended function safety:

- `security definer`;
- `set search_path = public, pg_temp`;
- explicit `auth.role()` checks for owner RPCs;
- explicit `where visibility = 'public' and moderation_status = 'active'` for public read RPCs;
- explicit returned column list, never `select *`;
- no dynamic SQL required.

## 7. Public Read Scope Decision

Stage 29 should allow unauthenticated reads only through the public allow-listed RPCs for profiles that are both:

- `visibility='public'`; and
- `moderation_status='active'`.

This is safer than shipping authenticated-only reads and later widening hurriedly for Phase 30. The public shape is narrow, opaque-id based, and excludes raw account authority data from day one.

## 8. Phase 30 Leaderboard Identity Contract

Phase 29 must not build public leaderboards, but the migration should make Phase 30 easier.

Future Phase 30 leaderboard rows may:

- keep trusted rating/user ownership server-side;
- join to `public_player_profiles` internally by `user_id` in trusted SQL/RPC code;
- expose only `public_profile_id` plus allow-listed public identity fields;
- omit or anonymize users without `visibility='public'` or with non-active moderation status;
- never expose raw rating table user ids, emails, profile metadata, sessions, answers, seeds, or transaction ids.

If Phase 30 needs leaderboard rows for private-profile users, the safe default should be an anonymous display such as `Private player` with no `public_profile_id`, not a raw auth id.

## 9. Rollback Plan

If Stage 29.3 migration execution fails before completion:

- stop immediately;
- record the exact non-secret error in progress;
- do not begin app implementation;
- do not attempt a broad workaround.

If the migration applies but probes fail:

- stop before Stage 29.4;
- create a narrow corrective migration prompt only after documenting the failed privacy condition;
- do not weaken RLS or direct table grants to make probes pass.

Rollback SQL for a fully additive failed migration may drop, in reverse dependency order:

- public read RPCs;
- owner read/write RPCs;
- helper validation functions;
- triggers;
- indexes;
- `public.public_player_profiles`.

Do not drop or alter existing `profiles`, `progress_snapshots`, `game_history`, `settings`, multiplayer, ranked, notification, or spectator tables during rollback.

## 10. Required Privacy Probes For Stage 29.3

Run non-printing probes only. Do not print secrets, tokens, private user payloads, auth state, raw emails, UUIDs tied to real users, screenshots, videos, traces, or local session artifacts.

Required probe assertions:

- anon cannot execute owner RPCs;
- anon cannot directly select from `public.public_player_profiles`;
- anon can read only allow-listed fields for an explicitly public/active profile through public RPCs;
- anon cannot read private or hidden/suspended profiles through public RPCs;
- authenticated owner can create and update only their own profile through owner RPCs;
- authenticated owner cannot set another `user_id` or `public_profile_id`;
- authenticated non-owner cannot update another profile;
- authenticated non-owner cannot read private profiles;
- direct table access does not expose `user_id` to anon/authenticated browser roles;
- public RPC output columns do not include `user_id`, `email`, auth metadata, app metadata, progress, settings, game history, ranked private projection fields, rating transactions, match ids, sessions, answers, seeds, service ids, or tokens;
- public profile avatar URL rejects data URLs and URLs containing the caller raw auth id;
- invalid display names, bios, accent colors, flair keys, avatar URLs, and visibility values are rejected or normalized;
- profile RPCs grant no gameplay, spectator, leaderboard, rating, claim, notification, or admin authority.

Suggested probe style:

- use two temporary authenticated users and anon access;
- generate throwaway values only;
- assert shape/column names and row counts without printing private row contents;
- clean up temporary profile rows and temporary users where feasible.

## 11. Verification Strategy

Stage 29.3 migration execution should run:

- SQL lint/review by inspection before remote apply;
- migration apply only after confirming the intended `brrrdle-dev` Supabase target without printing secrets;
- non-printing privacy probes above;
- focused repository tests only if app repository seams are added in Stage 29.3, otherwise defer source tests to Stage 29.4;
- `git diff --check`;
- Python CSV shape check using `python3 -S`;
- `git status --short --branch`.

Stage 29.4 app implementation should add:

- pure public profile normalization tests;
- repository/parser tests for owner/public RPC DTOs;
- component tests for edit/preview/visibility copy;
- route tests for opaque public profile links;
- privacy scans over touched code for forbidden raw fields.

## 12. Explicit Deferrals

This addendum does not authorize or plan implementation for:

- public leaderboards or leaderboard UI/API;
- public/guest spectation;
- raw public ranked projections;
- service workers, push subscriptions, or background notifications;
- profile search/discovery;
- user-facing slug reservation;
- public profile comments/social graph/friends;
- public avatar upload redesign;
- moderation tools beyond reserving `moderation_status`;
- changes to Elo/rating algorithms;
- gameplay rule changes.

## 13. Next Gated Action

If this addendum is accepted, the next safe action is Stage 29.3 migration/RLS execution:

- create exactly one additive migration under `supabase/migrations/`;
- implement only the table/RPC/grant/RLS contract defined here;
- apply only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous;
- run the non-printing privacy probes;
- update progress;
- stop before Stage 29.4 app implementation.
