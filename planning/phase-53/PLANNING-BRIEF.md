# Phase 53 Planning Brief - Stats, Progression Transparency, And Public Rating Metadata

**Status:** Planning package prepared; implementation requires the companion prompt package.
**Created:** 2026-07-09.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Baseline:** Phase 52 final acceptance closure commit `9f0096c839ac007d2717f2b7a0ba91541f18ed4d`.

## Authorization

This brief records the recommended Phase 53 plan only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, remote Supabase work, deployment configuration changes, Git/GitHub backup, release work, public tunneling, Phase 54+ work, minimal-shell handoff preparation, UI toolkit adoption, image generation, or work in the original stable `brrrdle` repository.

## Phase Thesis

Phase 53 should make the already implemented stats, progression, public profile, and ranked metadata surfaces easier to understand without changing gameplay rules or rating authority.

The safest first implementation should be source/test-first:

- clarify that local Stats are private player history and progression details;
- surface multiplayer performance and rating summaries in a way that explains how they differ from Solo stats and public leaderboards;
- make progression math and HUD-to-Stats behavior more transparent;
- expose only privacy-safe public rating/profile metadata that already comes from allowlisted public profile and leaderboard contracts;
- stop for a separate migration/RPC/RLS addendum if exhaustive public profile rating lookup or new cloud stats contracts are required.

## Current Implementation Review

### Local Stats And Progression

`src/stats/statistics.ts` owns the canonical local stats buckets for OG/GO and Daily/Practice. `updateStatistics` increments played, won, lost, streak, attempts, best attempts, and per-length stats when completed Solo games are recorded.

`src/stats/statsSelectors.ts` converts private local history and progression into chart-ready data:

- win rate by mode/scope;
- win rate by word length;
- win rate by difficulty tier;
- recent activity calendar;
- XP progress through `selectXpProgress`;
- cumulative coin trend.

`src/stats/StatsDashboard.tsx` currently renders local stats, charts, progression meter, recent activity, coin trend, and `PublicSiteStatsPanel`. Its copy says local stats stay private on this device, but the page still blends local gameplay stats, progression, and public site totals in one long section. This is the main Phase 53 clarity opportunity.

`src/progression/experience.ts` and `src/progression/coins.ts` define current XP and coin award formulas. Phase 53 must not change those formulas. It may only explain the existing progression state and current level progress.

`src/app/ProgressionHud.tsx` and `src/app/progressionHudViewModel.ts` already show Level, Coins, XP percent, exact XP into the level, and an `Open Stats` button. Phase 53 can strengthen Stats-page continuity with this HUD without changing rewards or persistence.

### Cloud Progress And Stats Decisioning

`src/account/storageSchema.ts` stores `GuestProgressState`, including:

- private completed game ids;
- private history;
- progression;
- local stats;
- multiplayer state;
- competitive multiplayer cache;
- practice seeds;
- settings and unlocked dailies.

`src/account/sync.ts` syncs authenticated progress through `progress_snapshots`, uploading and downloading the whole migrated progress payload.

`src/account/guestTransfer.ts` merges local and cloud progress. It merges stats bucket values conservatively, unions completed game ids and unlocked dailies, caps history, takes max XP/coins/consumables, and merges competitive multiplayer state.

Phase 53 should treat signed-in stats as cloud-synced through the existing authenticated progress snapshot, not as a separate public stats product. Any new server-side stats schema, per-guess analytical table, public player stats table, RPC, RLS policy, or storage contract is outside the default source-only Phase 53 implementation and requires a later addendum.

### Multiplayer Performance And Rating

`src/multiplayer/scoring.ts` projects multiplayer performance from terminal games without mutating Solo stats. It derives points, puzzles solved, winner, outcome, ranked eligibility, and the rating bucket.

`src/multiplayer/rating.ts` defines Practice ranked Elo buckets, provisional status, rank bands, K factors, expected score math, and transaction application. Phase 53 must not alter Elo formulas, eligibility, bucket mapping, settlement authority, or ranking math.

`src/multiplayer/competitiveMultiplayer.ts` stores local/cacheable multiplayer result summaries and rating projections in `competitiveMultiplayer`.

`src/multiplayer/MultiplayerStatsPanel.tsx` already renders a signed-in player's local competitive multiplayer ratings, recent results, and rating changes. It currently lives on the Leaderboard page through `src/leaderboards/LeaderboardPanel.tsx`, while the Stats page mostly focuses on Solo/local gameplay and public site aggregates.

Phase 53 should decide whether to add a Stats-page multiplayer section by reusing existing view models/components or by creating small pure selectors. It should not duplicate rating authority or move the public leaderboard itself into Stats.

### Public Profiles And Public Ranked Leaderboards

`src/account/profile.ts` owns the shared safe `Player name` policy. `src/account/publicProfile.ts` parses owner and public profile DTOs, rejects forbidden private keys, validates public profile ids, and saves owner profiles through existing RPCs.

`src/account/PublicProfilePage.tsx` renders public-safe player profile fields and the Phase 52 private Practice request controls. It deliberately hides raw ids, emails, session data, queue internals, rating internals, and tokens.

`supabase/migrations/20260621003033_phase29_public_profile_rls.sql` created the public profile table and RPCs. The public profile RPC returns public identity and bio metadata only; it does not return rating rows.

`src/leaderboards/publicRankedLeaderboard.ts` parses `get_public_ranked_leaderboard` rows with a strict allowlist. The row includes public profile id, display name, accent, flair, optional avatar, rating, games played, wins, losses, draws, provisional flag, latest rating movement, peak rating, and freshness timestamps. It rejects raw auth ids, emails, private profile fields, queue ids, match ids, sessions, tokens, and rating transaction ids.

`src/leaderboards/PublicRankedLeaderboardPanel.tsx` renders signed-in, authenticated-only public ranked Practice leaderboards. The table already shows rank, public player identity, bucket, rating, record, provisional status, movement, peak rating, and rank band.

Phase 53 can safely derive public rating metadata from these already public leaderboard rows. It should not require a new profile-by-id rating RPC unless implementation proves that the current leaderboard projection cannot support the intended minimum useful profile metadata.

### Public Site Stats

`src/stats/siteStats.ts` and `src/stats/PublicSiteStatsPanel.tsx` load and render `get_public_site_stats_v1`, an aggregate-only public site stats RPC from Phase 42. It exposes counts and freshness timestamps for active public profiles and ranked Practice public leaderboard participation. It does not expose player-level private stats.

Phase 53 should keep public site stats aggregate-only.

## Recommended Scope

In scope:

- Stats page sectioning and copy that separates private Solo stats, progression, local multiplayer performance, public site aggregates, and public ranked leaderboard/profile metadata.
- Small pure selector/view-model helpers for local player stats summaries if they reduce duplication.
- Reuse of `MultiplayerStatsPanel` or equivalent derived local multiplayer summaries inside Stats, while preserving the Leaderboard page's public leaderboard role.
- Progression transparency improvements using existing XP/coin/level values only.
- Public profile rating metadata derived from safe leaderboard rows where available.
- Tests proving privacy boundaries, section copy, progression math, local-vs-public separation, and no raw ids/private fields in markup.
- A focused Playwright smoke that signs in, navigates HUD-to-Stats, checks Stats/Leaderboard/Profile metadata, and verifies no console failures.

Out of scope:

- New or changed XP, coin, consumable, Pay-to-Continue, reward, scoring, Elo, rating, rank-band, Daily claim, or gameplay rules.
- New stats storage tables, analytical event tables, cloud stats schemas, public player stats contracts, profile-rating RPCs, RLS/grant changes, or remote Supabase work unless a later addendum explicitly authorizes them.
- Public exposure of private local history, raw auth ids, emails, account ids, progress snapshots, game answers, seeds, sessions, queues, transactions, private request internals, tokens, or credentials.
- Private Daily, ranked Daily, admin/backend visualization, social graph/opt-out controls, spectator expansion, design-heavy shell work, minimal-shell handoff prep, ShadCN/Impeccable adoption, image generation, deployment, release, or Git/GitHub backup.

## Recommended Stage Shape

1. **Stage 53.0 - Baseline and source-only decision**
   Confirm the Phase 52 closure baseline, map current stats/progression/profile/rating files, and stop if the desired work requires a protected server/storage contract.

2. **Stage 53.1 - Stats and progression view models**
   Add or refine pure selectors for Stats-page summary sections, cloud/provenance labels, progression transparency, and local multiplayer summaries.

3. **Stage 53.2 - Stats dashboard clarity**
   Update the Stats page so Solo/local stats, progression, local multiplayer performance, and public site stats are visually and textually separated without making the UI heavier.

4. **Stage 53.3 - Public rating/profile metadata**
   Add safe public rating metadata to public profile and/or leaderboard-adjacent surfaces using existing allowlisted leaderboard data. Stop for addendum if an exhaustive server-side public profile rating summary is required.

5. **Stage 53.4 - Focused automated and E2E coverage**
   Add unit/component tests for new selectors and UI privacy boundaries. Add a focused authenticated Playwright smoke if the implementation touches route-to-route behavior, public profile metadata, or HUD-to-Stats.

6. **Stage 53.5 - Review Candidate handoff**
   Update Phase 53 changelog, manual review checklist, progress, and create the next Review Candidate Backup prompt only after verification is clean.

## Success Criteria

- Stats explains what is private/local, what is cloud-synced for signed-in accounts, what is local multiplayer/competitive cache, and what is public aggregate metadata.
- Progression is understandable from both the HUD and Stats without changing rewards or formulas.
- Public profile/rating metadata remains limited to safe public identity and aggregate ranked Practice fields already exposed by public leaderboard contracts.
- No raw ids, emails, sessions, answers, seeds, progress snapshots, queue internals, transaction ids, credentials, or tokens appear in user-visible markup, tracked docs, prompt artifacts, logs, or reports.
- Focused tests protect selector math, rendering, privacy boundaries, and route smoke behavior.
- Full verification passes before any Review Candidate handoff.
