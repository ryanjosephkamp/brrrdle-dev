# Phase 30 Public Leaderboard Migration/RLS Addendum

**Status**: Stage 30.2 migration/RLS addendum for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-23.
**Authority**: Current user authorization for Stage 30.2 planning, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-30/PLANNING-BRIEF.md`, `planning/specs/phase-30/PHASE-30-PUBLIC-LEADERBOARDS-AND-MULTIPLAYER-OVERVIEW-CLEANUP-SPEC-2026-06-22.md`, `planning/phase-30/IMPLEMENTATION-PLAN.md`, `planning/phase-30/DEFERRED-RANKED-MODES-ROUTING.md`, `progress/PROGRESS-STEP-228.md`, `docs/ranked-multiplayer.md`, and `docs/supabase.md`.

This addendum is not migration execution authorization. It defines the safest additive Supabase public leaderboard contract for Stage 30.3 if the user separately authorizes migration creation, remote application, and privacy probes.

## 1. Stage 30.1 Finding

Stage 30.1 confirmed that public leaderboard work needs a server-side allow-listed SQL/RPC boundary before app implementation:

- Phase 29 public profiles are default-private and expose public identity only through opaque `public_profile_id` values and allow-listed display fields.
- Current private ranked leaderboard-ready projections in `src/multiplayer/rankedLeaderboardProjections.ts` require a private viewer id and use placeholder identity; they are not a public leaderboard contract.
- Trusted rating tables contain raw `user_id`, `opponent_user_id`, match ids, transaction ids, old/new rating audit values, and settlement evidence that must not be returned to public leaderboard UI.
- The browser currently has no safe RPC that joins trusted rating rows to opt-in public profile identity.
- Existing direct authenticated select policy on `multiplayer_rating_profiles` predates Phase 30 and should not be used by public leaderboard app code.

## 2. Recommended Migration Shape

Create one additive migration in Stage 30.3 that adds one public leaderboard RPC and optional supporting indexes only if query review proves they are needed.

Recommended RPC:

- `public.get_public_ranked_leaderboard(p_bucket text default null, p_limit integer default 50, p_offset integer default 0)`

Recommended v1 posture:

- authenticated-public read first;
- ranked Practice v1 buckets only;
- live-computed RPC over trusted tables, not a public mutable table;
- omit private, hidden, suspended, or missing public profiles;
- no anonymous fallback rows in v1;
- no public direct table grants;
- no leaderboard authority over rating settlement, match results, profile ownership, Daily claims, or gameplay.

Rationale:

- One RPC gives Stage 30.4 a stable repository seam without widening raw table access.
- Omission of private/non-active profiles avoids revealing opted-out users' rating history.
- Authenticated-public first keeps the initial leaderboard visible to signed-in players while leaving anonymous-public broadening for a later review after probes and product feedback.
- A live-computed RPC is simpler and safer than a materialized/public table for v1 because trusted rating settlement remains the only writer.

## 3. Data Sources

The RPC may read these trusted tables internally:

- `public.multiplayer_rating_profiles`
- `public.multiplayer_rating_transactions`
- `public.public_player_profiles`

The RPC must not expose those tables directly. It may join by private `user_id` only inside `security definer` SQL.

Eligible rating rows:

- `multiplayer_rating_profiles.bucket in ('async:og', 'async:go')`
- `games_played > 0`
- matching public profile row has `visibility = 'public'`
- matching public profile row has `moderation_status = 'active'`
- matching public profile row has a non-null display name by Phase 29 constraints

Return bucket labels should use the app-level bucket ids:

- storage `async:og` returns public bucket `multiplayer:og`
- storage `async:go` returns public bucket `multiplayer:go`

Do not include `live:*`, Daily ranked, timed Practice ranked, custom/private-code ranked games, or future Phase 32 ranked modes in Phase 30 v1.

## 4. RPC Contract

### `public.get_public_ranked_leaderboard(...)`

Audience: `authenticated` only in Phase 30 v1.

Suggested parameters:

- `p_bucket text default null`
- `p_limit integer default 50`
- `p_offset integer default 0`

Parameter rules:

- `p_bucket` may be null, `multiplayer:og`, or `multiplayer:go`.
- Legacy input buckets such as `async:og` and `async:go` should be rejected rather than normalized in the public API.
- `p_limit` must be bounded server-side. Recommended default `50`, minimum `1`, maximum `100`.
- `p_offset` must be bounded server-side. Recommended default `0`, minimum `0`, maximum `1000`.
- Invalid parameters should raise a clean `22023` error.

Recommended return fields, in order:

- `leaderboard_key text`
- `rank integer`
- `bucket text`
- `public_profile_id uuid`
- `display_name text`
- `accent_color text`
- `flair_key text`
- `avatar_url text`
- `rating integer`
- `games_played integer`
- `wins integer`
- `losses integer`
- `draws integer`
- `provisional boolean`
- `latest_rating_delta integer`
- `latest_rating_movement_at timestamptz`
- `peak_rating integer`
- `profile_updated_at timestamptz`
- `leaderboard_updated_at timestamptz`

Field rules:

- `leaderboard_key` should be a stable public value such as `ranked-practice-v1`.
- `bucket` must be `multiplayer:og` or `multiplayer:go`.
- `public_profile_id`, `display_name`, `accent_color`, `flair_key`, and `avatar_url` must come from active public profile rows only.
- `avatar_url` may be null.
- `rating`, `games_played`, `wins`, `losses`, `draws`, and `provisional` may come from `multiplayer_rating_profiles`.
- `latest_rating_delta` and `latest_rating_movement_at` may come from the latest trusted transaction for the same `user_id` and bucket, but the transaction id, match id, opponent id, and expected score must not be returned.
- `peak_rating` may be computed as the greatest of current rating and trusted transaction old/new ratings for that same user and bucket.
- `leaderboard_updated_at` should be the rating profile `updated_at` for live-computed v1 rows.

Do not include profile `bio` in leaderboard rows. If a later UI needs profile details, it should load the public profile by `public_profile_id` through the Phase 29 public profile RPC.

## 5. Ranking, Tie-Breaks, And Pagination

Ranking must be deterministic and computed before `limit`/`offset` are applied.

Recommended ranking order within each bucket:

1. `rating desc`
2. `games_played desc`
3. `peak_rating desc`
4. `leaderboard_updated_at desc`
5. `public_profile_id asc`

Pagination:

- apply `p_offset` and `p_limit` after ranking;
- do not return a global hidden-user count;
- if the UI later needs total counts, add a separate reviewed field or RPC that counts only visible public-active leaderboard rows.

## 6. Public Read Posture

Stage 30.3 should grant execute only to `authenticated`:

- `grant execute on function public.get_public_ranked_leaderboard(text, integer, integer) to authenticated;`

Stage 30.3 should revoke from `public` and `anon`:

- `revoke all on function public.get_public_ranked_leaderboard(text, integer, integer) from public;`
- `revoke all on function public.get_public_ranked_leaderboard(text, integer, integer) from anon;`
- `revoke all on function public.get_public_ranked_leaderboard(text, integer, integer) from authenticated;`

Then grant authenticated execution after revocation.

Anonymous-public leaderboards remain deferred. To broaden later, create a separate planning addendum or corrective migration with additional privacy probes.

## 7. RLS And Grant Requirements

The Stage 30.3 migration should:

- create the leaderboard RPC as `security definer`;
- use `stable` when implemented as SQL or otherwise avoid side effects;
- set `search_path = ''`;
- explicitly qualify all table/function references with `public` or required schemas;
- return an explicit column list, never `select *`;
- add no direct table grants for `anon` or `authenticated`;
- leave `public_player_profiles` direct table grants revoked;
- leave rating settlement and rating transaction write authority unchanged;
- leave existing `async_multiplayer_games`, spectator, queue, Daily claim, and public profile RLS policies unchanged unless a separately documented blocker proves a narrow correction is required.

The RPC is a projection boundary. It must not mutate:

- rating profiles;
- rating transactions;
- match results;
- public profiles;
- Daily claims;
- queues;
- game rows;
- spectator rows;
- notifications;
- local/session state.

## 8. Forbidden Fields

The RPC must not return, directly or nested:

- `user_id`
- `opponent_user_id`
- raw Supabase auth id
- raw auth email
- auth metadata
- app metadata
- private `profiles` row data
- private public-profile owner fields such as `visibility` or `moderation_status`
- profile `bio` in leaderboard rows
- private progress
- settings
- game history
- raw private ranked projection rows
- raw rating transaction id
- raw match/result id
- raw opponent id
- expected score
- old rating
- new rating beyond public current rating and approved peak/current aggregate
- settlement id
- queue id
- Daily claim id
- raw game projection
- `serializedSession`
- `playerSessions`
- answers
- seeds
- service ids
- tokens
- local/session artifacts

## 9. Privacy And Moderation Behavior

Profile visibility behavior:

- public/active profiles appear when they have an eligible rating row;
- private profiles are omitted;
- hidden profiles are omitted;
- suspended profiles are omitted;
- missing profile rows are omitted;
- profile updates to private/hidden/suspended should remove the row from the next live-computed leaderboard response.

Display safety:

- display names, flair keys, accents, and avatar URLs are untrusted user content;
- render display names as text only in Stage 30.5;
- do not infer public identity from private account profile fields;
- do not expose anonymous placeholders for omitted users in v1 because placeholders would still leak ranking presence.

## 10. Indexing

Existing indexes likely cover v1 sufficiently:

- `multiplayer_rating_profiles_bucket_rating_idx` on `(bucket, rating desc)`;
- `multiplayer_rating_transactions_user_idx` on `(user_id, bucket, created_at desc)`;
- `public_player_profiles_public_active_idx` for public active profile discovery;
- `public_player_profiles` primary key on `user_id`.

Stage 30.3 may add an index only if SQL review or probe timing shows a clear need. Candidate optional index:

- `multiplayer_rating_transactions_user_bucket_created_idx` on `(user_id, bucket, created_at desc)`.

Do not add a materialized table or public cache table in Stage 30.3 unless the user separately authorizes a revised addendum.

## 11. Rollback Plan

Because the recommended migration is additive, rollback is straightforward:

1. Stop app use of the leaderboard RPC if Stage 30.4 or later has been implemented.
2. Revoke execute on `public.get_public_ranked_leaderboard(text, integer, integer)` from `authenticated`, `anon`, and `public`.
3. Drop `public.get_public_ranked_leaderboard(text, integer, integer)`.
4. Drop any optional Stage 30.3 index created only for leaderboard performance.
5. Leave Phase 27 rating tables and Phase 29 public profile tables/RPCs intact.

If privacy probes fail after migration application, stop before app implementation and create a narrow corrective migration prompt. Do not broaden direct table grants or weaken public profile visibility/moderation checks to make probes pass.

## 12. Stage 30.3 Non-Printing Privacy Probes

Stage 30.3 should run a non-printing probe harness that verifies:

- anon execution of `get_public_ranked_leaderboard` is denied;
- authenticated execution succeeds without printing secrets, auth state, raw rows, or private data;
- the RPC returns only rows with active public profiles;
- private profile rows with eligible ratings are omitted;
- hidden profile rows with eligible ratings are omitted;
- suspended profile rows with eligible ratings are omitted;
- missing profile rows with eligible ratings are omitted;
- rows with zero rated games are omitted;
- `p_bucket = 'multiplayer:og'` returns only `multiplayer:og` rows;
- `p_bucket = 'multiplayer:go'` returns only `multiplayer:go` rows;
- null `p_bucket` may return both approved buckets;
- invalid buckets are rejected;
- limit and offset bounds are enforced;
- row ordering follows the approved tie-breaks;
- latest movement fields do not expose transaction id, match id, opponent id, old rating, expected score, or settlement internals;
- returned rows contain no forbidden keys at any nesting level;
- no direct anonymous table select was granted on `public_player_profiles`, `multiplayer_rating_profiles`, `multiplayer_rating_transactions`, `multiplayer_match_results`, or `multiplayer_player_results`;
- Stage 30.3 did not broaden existing authenticated direct table privileges;
- trusted ranked settlement RPCs still work for participants;
- public profile owner/public RPCs still work as before;
- Daily claim enforcement, Live spectator v2 RPC, and ranked queue/finalization RPCs remain unaffected.

Probe output must not print Supabase keys, tokens, `.env.local` contents, auth state, raw auth ids, emails, raw profile rows, raw rating transaction rows, raw game projections, answers, seeds, screenshots, videos, traces, or local session artifacts.

## 13. App Integration Expectations For Later Stages

Stage 30.4 should:

- add a strict DTO parser for the exact RPC return shape;
- reject overbroad payloads containing forbidden keys;
- normalize `p_bucket`, `p_limit`, and `p_offset` before calling the RPC;
- expose repository errors without revealing private probe details;
- keep private ranked leaderboard-ready projections separate from public leaderboard rows;
- add focused tests for parsing, bucket filtering, row limits, ordering, corrupt payloads, and forbidden-field rejection.

Stage 30.5 should:

- build UI against the Stage 30.4 repository seam;
- explain ranked Practice v1 scope;
- explain that public profiles must be public and active to appear;
- show signed-in states for authenticated-public v1;
- avoid public/guest spectation links;
- avoid implying Daily ranked, timed Practice ranked, custom ranked, or broader ranked modes exist.

## 14. Verification Expectations

Stage 30.3 should verify:

- one additive migration file was created under `supabase/migrations/`;
- Supabase target is confirmed as `brrrdle-dev` without printing secrets;
- migration applies only to the confirmed `brrrdle-dev` project;
- non-printing privacy probes pass;
- `git diff --check` passes;
- Python CSV shape check using `python3 -S` passes;
- `git status --short --branch` is reported.

Stage 30.4 and later implementation stages should add source/tests only after Stage 30.3 migration execution and privacy probes pass.

## 15. Stop Conditions

Stop before migration execution if:

- the Supabase target project is ambiguous;
- credentials are unavailable or require printing secrets;
- SQL review shows the RPC would return raw auth ids, emails, private profile fields, raw transaction ids, match ids, opponent ids, sessions, answers, seeds, or local artifacts;
- SQL review requires a destructive table rewrite or broad grant change;
- anonymous-public read access is needed for product reasons but has not received separate approval;
- the migration would alter Elo/rating rules, trusted settlement, Daily claim behavior, Live spectator behavior, or gameplay rules.

Stop before app implementation if:

- migration application fails;
- any privacy probe fails;
- returned rows expose forbidden fields;
- private/non-active profiles can appear in v1 public leaderboard rows;
- direct table privileges are broadened unexpectedly;
- trusted ranked settlement or public profile RPC behavior regresses.

## 16. Boundary Confirmation

This addendum plans only the Stage 30.3 migration/RLS contract. It does not create or run migrations, change source/runtime code, implement tests, configure Supabase or Vercel, deploy, commit, push, create a PR, merge, release, delete branches, begin Phase 31, begin Phase 32 ranked mode expansion, implement public/guest spectation, add service workers or push infrastructure, change the Elo algorithm, change gameplay rules, create new custom skills, force-push, print secrets, or touch the original stable `brrrdle` repository.
