# Phase 42 Stats Dashboard Migration RLS Addendum

**Status**: Draft addendum for review.
**Date**: 2026-07-03.
**Repository**: `brrrdle-dev` only.
**Authority**: Documentation-only Stage 42.3 addendum planning. This addendum does not authorize SQL migration creation, migration execution, source/runtime implementation, test implementation, Supabase or Vercel configuration, deployment, Git/GitHub actions, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, secret printing, private data exposure, local session artifact exposure, local Codex skill changes, or original stable `brrrdle` repository work.

## 1. Decision

Phase 42 public stats and private developer/admin dashboard work should not proceed as source-only.

Stage 42.1 and Stage 42.3 evidence show that:

- `src/stats/StatsDashboard.tsx` renders private/local player stats from browser/account-owned history and progression state;
- the current admin surface is limited to protected manual word-list refresh controls and is not a general operational dashboard contract;
- the public ranked leaderboard RPC is a safe, authenticated, display-only projection, but it is intentionally narrow and not a full public site-stats contract;
- meaningful public stats and developer dashboard summaries need explicit aggregate projections, grants, admin denial behavior, parser allowlists, forbidden-field probes, and protected-contract preservation checks.

Therefore Stage 42.4 should create exactly one additive migration after review of this addendum. Stage 42.5 source integration should wait until that migration and its non-printing probes pass.

## 2. Goals

- Add a privacy-safe public aggregate stats RPC for Phase 42 public live-site stats.
- Add an authenticated admin-only operational summary RPC for the private developer/admin dashboard.
- Avoid direct browser table grants for private, raw, or operational tables.
- Keep public stats aggregate-only and non-identifying.
- Keep admin dashboard summaries operational and aggregate-first.
- Preserve existing public profile, public ranked leaderboard, private matchmaking, public/guest spectator, ranked queue, Daily claim, gameplay, and Elo boundaries.

## 3. Non-Goals

This addendum must not introduce:

- public browsing of users, games, queues, private requests, spectator rows, rating transactions, or admin diagnostics;
- spectator presence, spectator counts, spectator lists, viewer tracking, or online-user presence;
- raw auth IDs, emails, private profile fields, private account metadata, progress snapshots, settings, history payloads, serialized sessions, player sessions, answers, seeds, move history, guesses, queue IDs, request IDs, settlement IDs, rating transaction IDs, service IDs, tokens, screenshots, videos, traces, auth state, or local artifacts in any browser payload;
- direct browser grants for private tables;
- changes to gameplay rules, Daily claim rules, ranked queue matching, trusted settlement, public leaderboard authority, profile privacy, private matchmaking lifecycle, or Elo math.

## 4. Required Migration Shape

Stage 42.4 should create exactly one additive migration under `supabase/migrations/`, unless the user explicitly changes scope.

Recommended migration name:

`supabase/migrations/<timestamp>_phase42_site_stats_dashboard_rpc.sql`

The migration should:

1. create or replace `public.get_public_site_stats_v1()`;
2. create or replace `public.get_admin_operational_dashboard_v1()`;
3. revoke all execution from `public`, `anon`, and `authenticated` before applying the intended grants;
4. grant `get_public_site_stats_v1()` to `anon` and `authenticated`;
5. grant `get_admin_operational_dashboard_v1()` to `authenticated` only;
6. avoid direct browser grants on private tables;
7. avoid helper-function browser grants unless a helper is explicitly required and fully documented; any helper must remain ungranted to browser roles;
8. use `security definer` and `set search_path = ''` for RPCs that read protected tables;
9. use strict comments documenting allowed fields and forbidden data.

## 5. Public Site Stats RPC Contract

### Function

`public.get_public_site_stats_v1()`

### Access

- `anon`: allowed.
- `authenticated`: allowed.
- direct table access: not expanded.

### Allowed Output

The function should return one row or one allowlisted JSON object with only aggregate, non-identifying values.

Allowed fields:

- `stats_key`: literal `site-stats-v1`;
- `generated_at`: server timestamp for the response;
- `public_profiles_active`: count of public player profiles where visibility is public and moderation status is active;
- `ranked_practice_public_players`: count of active public profiles with at least one eligible public ranked Practice leaderboard row in untimed OG/GO buckets;
- `ranked_practice_public_player_results`: aggregate participant-result count derived from eligible public leaderboard/rating profile rows, clearly labeled as player-results rather than match count;
- `ranked_practice_public_og_players`: public ranked OG player count;
- `ranked_practice_public_go_players`: public ranked GO player count;
- `leaderboard_updated_at`: latest safe public leaderboard/rating-profile freshness timestamp, nullable;
- `public_profiles_updated_at`: latest active public profile update timestamp, nullable.

Stage 42.5 may combine this RPC with source-only static product facts, such as supported game modes, supported Practice lengths, or bundled word-list counts, if those facts come from public app data and do not require database reads.

### Forbidden Output

The public RPC must not return:

- per-user rows;
- per-game rows;
- active game counts that imply live presence;
- spectator counts or viewer counts;
- raw auth IDs or emails;
- public profile drafts, hidden profiles, private profiles, suspended profiles, or private profile metadata;
- private progress, settings, history, or account metadata;
- raw game projections, sessions, moves, guesses, answers, or seeds;
- ranked queue internals, private request internals, rating transaction internals, settlement IDs, queue IDs, request IDs, match IDs, or service IDs;
- precise admin diagnostics;
- tokens, keys, auth state, local artifacts, screenshots, videos, or traces.

## 6. Admin Operational Dashboard RPC Contract

### Function

`public.get_admin_operational_dashboard_v1()`

### Access

- `anon`: denied.
- signed-in non-admin users: denied.
- signed-in admin users: allowed.
- direct table access: not expanded.

### Admin Check

The function must verify admin authority server-side, not through UI hiding. Acceptable checks:

- `auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'`;
- `auth.jwt() -> 'app_metadata' -> 'roles'` contains `admin`;
- or an existing approved server-side/profile metadata admin marker.

If the implementation reads `public.profiles.role`, it must only do so inside the `security definer` RPC and must not broaden ordinary browser table grants.

### Allowed Output

The function should return one row or one allowlisted JSON object with operational aggregate summaries only.

Allowed fields:

- `dashboard_key`: literal `admin-operational-dashboard-v1`;
- `generated_at`: server timestamp for the response;
- `accounts_total`: total account/profile count;
- `public_profiles_total`: total public-profile projection rows;
- `public_profiles_active_public`: public + active profile count;
- `public_profiles_hidden_or_private`: hidden/private profile count;
- `public_profiles_suspended`: suspended profile count;
- `ranked_profiles_total`: rating profile count;
- `ranked_profiles_established`: non-provisional rating profile count;
- `ranked_queue_pending`: pending ranked queue count;
- `ranked_queue_stale_candidates`: aggregate count of stale ranked queue rows using the same stale threshold selected in the migration;
- `async_games_active`: aggregate active async multiplayer game count;
- `async_games_terminal`: aggregate terminal async multiplayer game count;
- `private_match_requests_pending`: pending private Practice request count;
- `private_match_requests_terminal`: aggregate accepted/cancelled/declined/expired private Practice request count;
- `daily_claims_today`: aggregate count of current UTC-date Daily multiplayer claims, if safe and available;
- `latest_ranked_queue_activity_at`: latest ranked queue update timestamp, nullable;
- `latest_private_request_activity_at`: latest private request update timestamp, nullable;
- `latest_async_game_activity_at`: latest async game update timestamp, nullable.

### Forbidden Output

The admin dashboard RPC must not return:

- raw row IDs unless a later addendum explicitly approves a row-inspection workflow;
- raw auth IDs, emails, auth metadata, or private account metadata;
- raw profile records or public-profile drafts;
- progress snapshots, settings JSON, history JSON, local stats, or private player activity rows;
- raw game projections, serialized sessions, player sessions, moves, guesses, answers, or seeds;
- queue row IDs, request IDs, settlement IDs, rating transaction IDs, match IDs, claim IDs, service IDs, or token-like values;
- private request participants, opponent identifiers, emails, or raw public-profile linkage beyond aggregate counts;
- secrets, Supabase keys, Vercel tokens, auth state, screenshots, videos, traces, or local artifacts.

## 7. Parser And Source Integration Requirements

Stage 42.5 source integration must add strict parser allowlists for both RPC payloads.

Parser requirements:

- reject payloads containing unknown keys;
- reject payloads containing forbidden key names or forbidden key tokens;
- normalize nullable timestamps;
- clamp or reject negative counts;
- treat missing/invalid payloads as unavailable stats/dashboard data;
- distinguish public stat labels from private/local player stats labels;
- keep admin dashboard locked for anonymous and non-admin users.

Stage 42.5 must not render raw response objects.

## 8. Non-Printing Probe Requirements

Stage 42.4 must run non-printing probes and record only safe summaries.

Required probes:

- `anon` can execute `get_public_site_stats_v1()`;
- authenticated user can execute `get_public_site_stats_v1()`;
- public stats payload contains only the allowlisted public keys;
- public stats payload contains no forbidden key names or forbidden key tokens;
- `anon` cannot execute `get_admin_operational_dashboard_v1()`;
- signed-in non-admin cannot execute `get_admin_operational_dashboard_v1()`;
- signed-in admin can execute `get_admin_operational_dashboard_v1()` if a safe existing admin test account is available;
- admin dashboard payload contains only the allowlisted admin keys;
- admin dashboard payload contains no forbidden key names or forbidden key tokens;
- no direct browser table grants are introduced for private tables;
- helper functions, if any, are not directly executable by `anon` or ordinary authenticated users;
- existing public profile RPCs remain bounded to active public fields;
- existing public ranked leaderboard RPC remains authenticated-only and display-only;
- existing participant identity RPC remains participant-scoped;
- existing private matchmaking RPCs remain authenticated and participant/request scoped;
- existing public/guest spectator RPC remains read-only, bounded, and Daily-excluding;
- existing Daily claim RPC anonymous execution remains revoked;
- ranked queue, trusted settlement, gameplay, and Elo boundaries are unchanged.

Probe output must not print secrets, raw auth IDs, emails, row IDs, tokens, private payloads, screenshots, videos, traces, auth state, or local artifacts.

## 9. Rollback And Idempotency Expectations

The migration should be additive and idempotent:

- use `create or replace function` for new RPCs;
- avoid destructive table changes;
- avoid backfills;
- avoid changing existing policies or grants except for the new RPCs;
- avoid modifying existing public profile, public leaderboard, public spectator, private matchmaking, ranked queue, Daily claim, or settlement functions;
- include comments for new functions.

Rollback should be possible by dropping the two new RPCs and any ungranted internal helper created solely for this phase.

## 10. Stage 42.4 Stop Conditions

Stop before migration execution if:

- the Supabase target is ambiguous or not confirmed as `brrrdle-dev`;
- credentials are missing, ambiguous, or would need to be printed;
- the required SQL would need direct browser grants to private tables;
- the admin check cannot be enforced server-side;
- public stats require per-user, per-game, spectator presence, or private activity exposure;
- any probe prints or would require printing secrets/private identifiers;
- implementing the requested dashboard requires raw row inspection rather than aggregate summaries;
- the change would alter public/guest spectator contracts, Daily claim behavior, ranked queue matching, trusted settlement, gameplay rules, or Elo math.

## 11. Next Gate

After review, the next safe gate is Stage 42.4 migration/RLS execution only. Stage 42.4 must create exactly one additive migration implementing this addendum, apply it only to the confirmed `brrrdle-dev` Supabase project when target and credentials are unambiguous, run the non-printing probes above, and halt before source integration.
