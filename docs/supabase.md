---
layout: page
title: Supabase setup
---

# Supabase setup

Supabase support is optional. Without configuration, the app remains playable in guest mode and shows a clear unconfigured state in account-related settings.

## Browser environment variables

The browser app only uses these public values:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Example local `.env.local` values:

```bash
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-public-anon-key
```

Never commit secrets. Never expose service-role keys, database passwords, JWT secrets, or other privileged credentials through `VITE_*` variables.

## Phase 23 Stage 8 multiplayer note

As of Phase 23 Stage 8, the app exposes one user-facing **Multiplayer** model:

- **Practice Multiplayer** can be untimed or use creator-selected chess-clock total time limits per side.
- **Daily Multiplayer** remains strictly turn-based/asynchronous with no time limits, five-letter Daily puzzles, UTC-midnight expiry, and separate OG/GO answers.
- The previously separate Live Multiplayer UI/domain path is no longer mounted by the app.

Some Supabase tables, functions, storage keys, and migration names below still contain historical `async` or `live` wording. Those names are compatibility plumbing for pre-Stage-8 migrations and deployed schemas. The active browser app writes current Multiplayer game projections through `async_multiplayer_games`; Live tables are not part of the mounted Stage 8 multiplayer flow.

## Schema and RLS

Apply `supabase/migrations/20260526012500_phase8_accounts.sql` to create:

- `profiles`
- `progress_snapshots`
- `game_history`
- `settings`

All user-owned tables have row-level security enabled. Users can read and write only rows where `auth.uid()` matches the row owner. Admin access is represented with an `admin` role in user metadata or profile data managed outside the browser client.

For Phase 23 live multiplayer, also apply `supabase/migrations/20260604024500_phase23_live_multiplayer.sql`. It creates:

- `live_lobbies`
- `live_matches`
- `live_match_participants`
- `live_match_events`
- `get_live_multiplayer_server_time()`

These tables are additive and RLS-protected. Authenticated players can create/join live lobbies and can read/write only match rows, participant rows, and append-only events for matches they participate in. The migration also attempts to add the live tables to the `supabase_realtime` publication when that publication exists.

For Phase 23 Stage 3 competitive multiplayer, also apply `supabase/migrations/20260604033000_phase23_competitive_multiplayer.sql` after the live multiplayer migration. It additively creates or extends:

- `live_lobbies.ranked`, `rating_bucket`, `matchmaking_request_id`, and `custom_game_code`
- `live_matches.ranked`, `rating_bucket`, `matchmaking_request_id`, and `custom_game_code`
- `multiplayer_rating_profiles`
- `multiplayer_match_results`
- `multiplayer_player_results`
- `multiplayer_rating_transactions`
- `multiplayer_matchmaking_queue`
- `custom_game_lobbies`

Stage 3 rating rows are intentionally stricter than live projections. Browser clients can read permitted profile/result/transaction rows and can create their own queue/custom-lobby requests, but the migration does not grant direct client insert/update policies for rating profiles, match results, player results, or rating transactions. Production rating settlement should happen through trusted RPC/server-side code with idempotency keys so clients cannot forge old/new ELO values.

Phase 27 keeps ranked foundations private. Trusted settlement and ranked Practice queue RPCs may update authenticated rating profiles and transactions, but Phase 27 leaderboard-ready projections are app-internal/private seams only. Those projections can summarize current rating, ranked games played, win/loss/draw counts, latest rating movement, and peak rating from trusted cache data, but they must not expose raw auth emails, raw public profile decisions, private account metadata, raw game projections, serialized/player sessions, answers, seeds, service ids, or tokens. After the post-Phase-27 routing revision, public player identity belongs to Phase 29, and public leaderboard UI/API work belongs to Phase 30 or a later separately authorized phase.

Phase 27 ranked Practice v1 uses the following additive migration sequence in `brrrdle-dev`:

- `supabase/migrations/20260616054019_phase27_trusted_settlement_ranked_queue.sql`
- `supabase/migrations/20260616055149_phase27_settlement_rpc_unambiguous_profile_upsert.sql`
- `supabase/migrations/20260616165434_phase27_ranked_queue_game_finalization.sql`

These migrations add authenticated-only trusted RPC authority for ranked Practice queue creation, cancellation, compatible pair claiming, queue status/seat assignment, game finalization, and idempotent ranked settlement from durable `async_multiplayer_games` rows. They preserve Daily ranked deferral, timed Practice ranked source/UI deferral until Phase 33 implementation, Hard Mode matching requirements, raw nonparticipant read denial, and the Phase 26 Live v1 spectator sanitized projection boundary. Browser clients should continue to call the trusted RPC seams rather than directly writing rating profile, result, transaction, or ranked queue authority state.

Phase 29 public profile foundations use the additive migration:

- `supabase/migrations/20260621003033_phase29_public_profile_rls.sql`

This migration creates `public.public_player_profiles` as a public-safe projection separate from private `profiles` rows and Supabase auth metadata. Profiles are private by default, use an opaque `public_profile_id`, and expose public data only through allow-listed RPCs. Browser clients should use `get_my_public_player_profile`, `upsert_my_public_player_profile`, `get_public_player_profile`, and `get_public_player_profiles`; they should not directly read or write `public_player_profiles`.

Public profile reads may return only `public_profile_id`, `display_name`, `accent_color`, `flair_key`, `avatar_url`, `bio`, `created_at`, and `updated_at` for profiles where `visibility='public'` and `moderation_status='active'`. Public profile payloads must never expose raw auth emails, raw auth ids, auth metadata, private account metadata, progress, settings, history, ranked private projections, raw rating transactions, game/session projections, answers, seeds, tokens, or local/session artifacts. Existing private avatar uploads are not automatically public profile avatars because their storage paths may contain raw user ids.

Phase 30 public ranked Practice leaderboards use the additive migration:

- `supabase/migrations/20260623011923_phase30_public_ranked_leaderboard_rpc.sql`

This migration adds authenticated-only RPC `public.get_public_ranked_leaderboard(p_bucket text default null, p_limit integer default 50, p_offset integer default 0)`. The RPC is a `security definer` allow-listed projection over trusted rating data and active public profiles for ranked Practice v1 buckets only. It returns public leaderboard fields for `multiplayer:og` and `multiplayer:go`, omits private/hidden/suspended/missing-profile/zero-game users, and does not grant direct browser access to raw rating or profile tables.

Public leaderboard payloads may include only public profile identity fields and aggregate rating fields such as rank, bucket, rating, games played, wins, losses, draws, provisional status, latest safe rating movement, peak rating, and freshness timestamps. They must never expose raw auth emails, raw auth ids, private profile metadata, private progress, answer-bearing data, seeds, sessions, raw game projections, local artifacts, private ranked projections, raw rating transaction ids, match ids, queue ids, settlement ids, or unapproved rating transaction internals. Public leaderboards are display-only and do not change Elo, trusted settlement, Daily claims, profile visibility, or gameplay authority.

Phase 31 Practice-only rematch mutual intent uses the additive migration:

- `supabase/migrations/20260623235121_phase31_practice_rematch_requests.sql`

This migration creates `public.multiplayer_practice_rematch_requests` and authenticated-only participant-scoped RPCs for requesting, listing, cancelling, declining, and accepting Practice rematches. Direct same-opponent rematch v1 is limited to completed unranked non-custom Practice Multiplayer games. Ranked Practice continuation remains same-settings search-again through the trusted ranked queue path, and Daily Multiplayer remains excluded from rematch, replay, or search-again shortcuts.

Rematch RPC payloads may include only allow-listed request lifecycle and same-settings fields such as request id, source game id, request status, viewer capabilities, mode, word length, Hard Mode, time limit, GO puzzle count, created game id, timestamps, and idempotency booleans. They must never return raw auth emails, raw auth ids, private profile metadata, public profile drafts, answers, seeds, serialized sessions, player sessions, source projections, move history, rating transaction ids, queue ids, settlement ids, tokens, or local/session artifacts. The rematch table does not make postgame intent gameplay, Elo, public leaderboard, profile, notification, spectator, or Daily claim authority.

Phase 32 participant identity routing uses the additive migration:

- `supabase/migrations/20260624233635_phase32_participant_identity_rpc.sql`

This migration adds authenticated-only RPC `public.get_multiplayer_participant_identity_summaries(p_game_id text default null, p_ranked_request_id text default null)`. The RPC lets a signed-in participant resolve allow-listed display summaries for their own async multiplayer game or matched ranked Practice queue context only. It returns seat, viewer marker, identity availability, and active public profile display fields when the participant has an active public profile; it does not make game participation publicly readable.

Participant identity payloads may include only `seat`, `is_viewer`, `identity_available`, `public_profile_id`, `display_name`, `accent_color`, `flair_key`, `avatar_url`, and `updated_at`. They must never expose raw auth emails, raw auth ids, private profile metadata, tokens, private progress, answers, seeds, sessions, queue internals, rating transaction ids, settlement ids, local artifacts, or public/guest spectation data. Rematch lifecycle, ranked queue polling, lobby routing, account accent propagation, and rating formatting remain app-side behavior layered on top of the RPC.

Phase 33 timed Practice ranked SQL/RLS readiness uses the additive migration:

- `supabase/migrations/20260626000925_phase33_timed_ranked_practice.sql`

This migration keeps browser authority on authenticated RPC seams and adds SQL/RLS readiness for canonical five-minute timed ranked Practice only. It expands async/rating/queue/result bucket constraints for `async:og:timed:v1` and `async:go:timed:v1`, adds internal Phase 33 bucket/time helpers, updates ranked queue creation/claim/status/finalization/trusted settlement RPCs, and updates participant identity queue context handling for matched timed ranked Practice. Stage 33.5 adds matching domain/repository support for the same canonical `300000` ms clock and bucket mapping. Stage 33.6 exposes that single timed ranked option in the Practice ranked UI while keeping unsupported ranked timers rejected. Timed ranked uses separate rating buckets from untimed ranked Practice. It does not expose timed buckets through public ranked leaderboards in Phase 33 and does not enable Daily ranked or ranked custom/private-code games.

Timed ranked public and RPC payloads must continue to avoid raw auth emails, raw auth ids, private profile metadata, private progress, answers, seeds, sessions, raw game projections beyond trusted participant RPC needs, queue internals beyond existing participant context, rating transaction ids, settlement ids, service ids, tokens, local/session artifacts, and unapproved public/guest spectator data. The migration does not change Elo math, gameplay rules, match-points semantics, Daily Multiplayer claims, public leaderboard authority, or public profile privacy.

Phase 43 ranked queue matching fairness uses the additive migration:

- `supabase/migrations/20260703230106_phase43_ranked_queue_matching_fairness.sql`

This migration preserves the browser-facing `public.claim_ranked_async_matchmaking_pair(p_request_id text, p_matched_game_id text default null)` signature and response shape while adding a server-side soft recent-opponent penalty. When a compatible non-recent ranked Practice opponent is queued, the claim RPC prefers that player over an immediate same-settings repeat opponent; when only a recent compatible opponent is waiting, the rematch can still proceed. The repair preserves mode, word length, Hard Mode, rating bucket, exact ranked time-control compatibility, queue cancellation, expiration, stale-row denial, trusted finalization, trusted settlement, Daily ranked deferral, authenticated-only grants, and direct table grant denial. It does not change Elo math, gameplay rules, public profile privacy, public/guest spectator boundaries, private matchmaking, public stats/admin dashboard contracts, or source/UI behavior by itself.

Phase 35 ranked Live identity SQL/RLS repair uses the additive migration:

- `supabase/migrations/20260627230835_phase35_ranked_live_identity_spectator_profiles.sql`

This migration keeps the authenticated-only `get_authenticated_live_v1_spectator_games_v2` RPC signature and returned table shape intact while changing spectator player profile resolution to use `async_multiplayer_games.player_one_user_id` and `player_two_user_id` joined to active public profiles. It returns only existing Live spectator safe profile fields (`displayName`, `avatarUrl`, `accentColor`, and optional derived `initials`) and keeps generic seat labels when active public identity is unavailable. It preserves participant-only identity RPC boundaries, public/guest spectation deferral, current Daily exclusion, bounded terminal hold rows, and read-only spectator capabilities.

The Phase 35 migration does not grant direct table access, does not expose public profile ids in Live spectator payloads, and does not expose raw auth ids, emails, private profile fields, answers, seeds, sessions, raw projections, queue internals, rating internals, service ids, tokens, or local/session artifacts. App source repair and UI behavior remain separate Phase 35 source work after migration verification.

Phase 38 public/guest Practice Live spectator SQL/RLS readiness uses the additive migration:

- `supabase/migrations/20260630215141_phase38_public_spectator_projection.sql`

This migration adds dedicated RPC `public.get_public_live_v1_spectator_games_v1(p_limit integer default 25, p_terminal_window_seconds integer default 15, p_game_id text default null)`. The RPC is separate from the authenticated spectator and participant identity RPCs, is granted to `anon` and `authenticated`, and returns only sanitized Practice Multiplayer display/progress data, active public profile summaries where safe, and read-only capability flags. It is bounded by server-side row and terminal-visibility limits, excludes all Daily Multiplayer rows, and does not grant direct table access.

Public/guest spectator payloads must not expose public profile ids, raw auth ids, emails, private profile fields, answers, seeds, serialized sessions, player sessions, raw projections, queue internals, rating internals, rating transactions, service ids, tokens, screenshots, videos, traces, auth state, or local/session artifacts. The Phase 38 migration does not implement source/UI public spectation by itself; app integration remains a later source stage after migration and probe verification.

Phase 38 Stage 38.3B Daily claim hardening uses the additive migration:

- `supabase/migrations/20260630220251_phase38_daily_claim_rpc_anon_revoke.sql`

This migration explicitly revokes `public` and `anon` execution from `public.claim_daily_multiplayer_participation(text, text, text, text, text, text)` while preserving authenticated/internal trusted claim behavior. It closes the pre-existing anonymous claim-RPC grant found during public spectator migration probes before public/guest spectator source integration proceeds. It does not alter Daily claim rules, game mutation behavior, the public spectator projection RPC, authenticated spectator RPCs, participant identity RPCs, or source/UI behavior.

Phase 40 private matchmaking SQL/RLS readiness uses the additive migration:

- `supabase/migrations/20260701221500_phase40_private_match_requests.sql`

This migration creates `public.multiplayer_private_match_requests` and authenticated-only RPCs for direct unranked Practice private match requests between active public profiles. Request lifecycle is limited to create, list, cancel, decline, expire, and opponent-only accept. Accepted requests may create one fresh unranked Practice `async_multiplayer_games` row through the trusted RPC path, with no Daily date key, no ranked flag, no rating bucket, no ranked queue/matchmaking request ID, and no custom game code. Direct table grants and helper-function browser grants remain denied.

Private match request payloads may include only allow-listed request lifecycle fields, viewer capability flags, same-settings Practice fields, created game id, timestamps, idempotency booleans, and active public profile display summaries. They must never expose raw auth emails, raw auth ids, auth metadata, private profile fields, public profile drafts, progress/settings/history/stats, answers, seeds, serialized sessions, player sessions, raw projections, moves, guesses, queue internals, rating internals, rating transactions, Daily claim ids, service ids, tokens, Supabase keys, Vercel tokens, screenshots, videos, traces, auth state, or local/session artifacts. The migration does not implement source/UI private matchmaking by itself; app integration remains later Phase 40 source work after migration and probe verification.

Phase 40 Stage 40.5B private matchmaking accept-contract repair uses the additive migration:

- `supabase/migrations/20260701232434_phase40_private_match_accept_contract_repair.sql`

This migration adds authenticated-only RPC `public.accept_private_multiplayer_match_request_v2(p_request_id text, p_game_projection jsonb, p_idempotency_key text default null)` and revokes browser execution from the original v1 accept RPC. Browser accept payloads must omit `playerUserIds`; v2 derives requester/opponent raw auth ids from the locked private request row server-side, injects canonical `playerUserIds` into the stored `async_multiplayer_games.projection`, and returns only the existing sanitized private match request response shape. It preserves Practice-only, unranked-only, opponent-only acceptance, active-public-profile eligibility, idempotency, Daily/ranked/custom-code/spectator/rating/queue exclusions, and direct table/helper grant denial. This migration does not implement source/UI private matchmaking by itself; Stage 40.5 source integration must call v2, keep raw auth ids out of browser state, and refresh the accepted game through participant-owned repository reads.

For the Phase 23 Stage 3 online-multiplayer stabilization, also apply `supabase/migrations/20260604050824_phase23_online_multiplayer_fixes.sql` after the live and competitive migrations. It creates:

- `async_multiplayer_games`

It also updates the live-lobby update policy so a second authenticated player can claim a waiting live lobby, and it adds `async_multiplayer_games` to the `supabase_realtime` publication when that publication exists. Async and live browser clients should now write only rows owned by, or participated in by, the current authenticated user; public waiting rooms can be read for matchmaking but should not be blindly upserted by every client.

For the Phase 23 Stage 3 stabilization follow-up, also apply these additive migrations in order:

- `supabase/migrations/20260604202631_phase23_multiplayer_grants_reset_forfeit.sql`
- `supabase/migrations/20260604210000_phase23_live_policy_recursion_fix.sql`
- `supabase/migrations/20260604211000_phase23_live_join_policy_fix.sql`
- `supabase/migrations/20260604211500_phase23_live_matched_lobby_visibility.sql`
- `supabase/migrations/20260604223000_phase23_daily_multiplayer_claims.sql`
- `supabase/migrations/20260605043000_phase23_stage4_lobby_cancel_spectators.sql`
- `supabase/migrations/20260605223500_phase23_stage6_daily_claim_release.sql`

These migrations grant the expected authenticated access to the multiplayer tables/functions, refine live-lobby policies so a second signed-in player can claim a waiting lobby and continue reading the matched lobby row after the join update, persist safe live-lobby host profile summaries, and enforce one Daily Multiplayer claim per authenticated user, UTC date, transport, and mode. The daily claim buckets are `async:og`, `async:go`, `live:og`, and `live:go`. They do not grant browser clients direct write access to rating profiles, rating transactions, or trusted result-settlement tables.

The Stage 4 migration adds the async `cancelled` status and a separate `live_match_spectators` table. The Stage 6 migration then narrows cancellation behavior so creator-cancelled unjoined Daily Async games and Daily Live lobbies release the matching Daily claim; joined, terminal, forfeited, expired, or matched games remain claimed for that UTC date and bucket. Live spectators are authenticated read-only viewers recorded outside `live_match_participants`; they can read the live match after joining spectator mode but cannot update match rows, participant rows, ratings, guesses, forfeits, or word-length selection.

Phase 23 Stage 14 re-audits these spectator artifacts as legacy compatibility schema. The active Stage 14 app has no mounted Live spectator runtime and does not write `live_*` or `live_match_spectators` tables; future spectator work should be separately specified before changing permissions or reactivating UI.

## Account and sync behavior

Implemented account features include:

- Supabase client creation from public browser configuration.
- Magic-link sign-in helper and sign-out helper.
- Guest progress loading, export, reset, and merge helpers.
- Cloud progress upload/download helpers with merge and failure states.
- Settings UI that shows unconfigured, anonymous, or signed-in states.

Account-backed sync and Multiplayer require a real Supabase project, applied migrations, configured environment variables, and email/auth settings in Supabase.

### Auth redirects and account management

The browser app sends magic-link and password sign-up requests with a current-origin redirect target when it can safely determine the current app origin. Password reset requests use an explicit reset URL that includes `auth_action=reset-password`; the app detects that marker and opens the password reset modal for the signed-in recovery session.

Supabase dashboard configuration must still be checked outside the repository:

1. Set the Supabase `Site URL` to the intended public brrrdle origin.
2. Add every approved brrrdle origin used for auth flows to the allowed redirect URLs, including local development, preview, and production origins as applicable.
3. Confirm password reset links allow the `auth_action=reset-password` callback URL.
4. Confirm email confirmation is enabled or disabled intentionally, and keep player-facing copy aligned with that choice.
5. Confirm email-change confirmation behavior, redirect URLs, and email templates before enabling player-facing email-change UI.

Signed-in players can change their password from Settings using the existing Supabase account session. Email-change UI remains gated until the Supabase confirmation and redirect settings above are verified; the app should not promise that a source-only change can deliver or confirm email changes without that configuration.

## Admin role assignment

For v1, assign admin privileges manually through a secure Supabase dashboard or server-side workflow. Do not assign admin roles from browser code.

Admin verification checklist:

1. Create or choose a Supabase user.
2. Assign the user an `admin` role in the approved server-side/profile metadata location.
3. Confirm the app's admin route remains locked for anonymous users.
4. Confirm the admin route remains locked for signed-in non-admin users.
5. Confirm the admin panel unlocks for the admin user.
6. Confirm `/api/admin-refresh` rejects missing auth, non-admin auth, and non-POST requests.
7. Confirm `/api/admin-refresh` accepts only authenticated admin POST requests.

## Manual verification checklist

1. Create a Supabase project.
2. Run the Phase 8 migration.
3. Run the Phase 23 multiplayer migrations listed above that match your deployed project history. Stage 8 keeps the historical table names as compatibility storage for the unified Multiplayer model.
4. Run the Phase 23 Stage 3 competitive multiplayer migration if ranked/custom multiplayer is enabled.
5. Run the Phase 23 Stage 3 online-multiplayer stabilization migration if shared account-backed Multiplayer play is enabled.
6. Run the Phase 23 Stage 3 stabilization follow-up migrations if account-backed Multiplayer matchmaking is enabled.
7. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` locally or in Vercel.
8. Sign in with a magic link.
9. Transfer local guest progress to the account.
10. Refresh and confirm cloud progress can be downloaded.
11. Confirm a second user cannot read the first user's `progress_snapshots`, `game_history`, or `settings` rows.
12. Confirm two signed-in browsers can create/join an untimed Practice Multiplayer match, submit one turn, refresh the other browser, and see the submitted turn without controlling the other player seat.
13. Confirm two signed-in browsers can create/join a timed Practice Multiplayer match and both see the same per-side chess-clock budgets.
14. Confirm Daily Multiplayer does not expose time-limit controls and persists Daily claim rows for both joined players.
15. Confirm a signed-in user cannot create or join more than one Daily Multiplayer game for the same UTC date and mode, even after the first game becomes terminal.
16. Confirm Daily Multiplayer OG and GO reveal different deterministic answer sequences for the same UTC date.
17. Confirm a Daily Multiplayer lobby creator can cancel an unjoined lobby, the lobby leaves the active count, and the same Daily mode becomes available again only while no rival has joined.
18. Confirm the five-active-game limit is enforced per authenticated user, not globally across all visible lobbies.
19. Confirm no Live Multiplayer UI is mounted in the Stage 8 app flow.
20. Confirm a user can create their own `multiplayer_matchmaking_queue` row and `custom_game_lobbies` row.
21. Confirm a browser client cannot directly insert/update `multiplayer_rating_profiles`, `multiplayer_match_results`, `multiplayer_player_results`, or `multiplayer_rating_transactions`.
22. Confirm the active browser app does not mount Live spectator UI or write `live_*` / `live_match_spectators` tables.
23. Assign an admin role through a secure server-side path, then confirm the admin route unlocks only for that user.
24. Confirm `/api/admin-refresh` rejects missing auth, non-admin auth, and non-POST requests.

## Optional: avatar uploads (Phase 15)

Phase 15 (AUTH-UX-IMPROVEMENTS-SPEC-2026-05-27) adds an optional avatar
upload affordance in the new Profile panel. By default brrrdle renders
deterministic initials on a colored gradient, which requires no Supabase
Storage configuration. To enable image uploads:

1. In the Supabase dashboard, create a **public** Storage bucket named
   `avatars`.
2. Add an RLS policy that allows each authenticated user to insert/update
   only paths under their own `auth.uid()/`. For example:

   ```sql
   create policy "Avatars are publicly readable"
     on storage.objects for select
     using ( bucket_id = 'avatars' );

   create policy "Users can manage their own avatar"
     on storage.objects for all
     using ( bucket_id = 'avatars' and (auth.uid())::text = (storage.foldername(name))[1] )
     with check ( bucket_id = 'avatars' and (auth.uid())::text = (storage.foldername(name))[1] );
   ```

3. brrrdle probes for the bucket at runtime. If the probe fails (no
   bucket, RLS denied), the upload UI is silently hidden and the
   initials avatar is used everywhere — nothing else breaks.

Uploads are limited to PNG, JPEG, or WebP under 200 KB and are stored
under `avatars/<user-id>/avatar.<ext>` via `supabase.storage.from('avatars').upload(...)`.
