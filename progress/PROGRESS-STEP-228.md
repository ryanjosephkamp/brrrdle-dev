# Progress Step 228: Phase 30 Stage 30.1 Audit

**Status**: Completed - Awaiting User Review Before Stage 30.2
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-23T00:39:44Z
**Completed**: 2026-06-23T00:46:10Z

## Authorization

The user authorized Phase 30 Stage 30.1 only: public leaderboard and Multiplayer Overview audit.

Allowed work:

- read required governance, Phase 30 planning/spec/implementation materials, progress records, public profile foundations, ranked/private projection surfaces, leaderboard-adjacent stats/rating surfaces, Multiplayer Overview source surfaces, Supabase/RLS context, and relevant tests read-only;
- create this Stage 30.1 progress report and append the matching 12-column row to `progress/PROGRESS.csv`;
- run focused audit/browser/resource checks as needed;
- decide whether Stage 30.2 migration/RLS addendum planning is required.

Not authorized:

- source/runtime implementation;
- test implementation;
- Supabase migration creation or execution;
- Vercel configuration;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 31 work;
- Phase 32 ranked mode expansion;
- public/guest spectation;
- service workers or push infrastructure;
- Elo algorithm changes;
- gameplay-rule changes;
- new custom skills;
- force-push, secret printing, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `ec5d7824104d9d41e79b2b49e475c68006cf40da`
- `origin/main`: `ec5d7824104d9d41e79b2b49e475c68006cf40da`
- Remote: `origin` points to `ryanjosephkamp/brrrdle-dev`
- Worktree: dirty only from uncommitted Phase 30 planning/progress artifacts already in the gated workflow plus this Stage 30.1 report.
- Original stable repository: not used.

## Resource And Process Checks

Pre-audit checks:

- Watched ports `5173`, `5174`, `3000`, and `4173` had no listening processes.
- No Stage 30.1-owned `vite`, Playwright, or browser process was started.
- Existing Chrome, Codex, Obsidian, and MCP helper processes were present.
- Disk snapshot for this volume: 460 GiB total, 347 GiB used, 71 GiB available; workspace size 192 MiB.
- Load snapshot: approximately `2.73 1.97 1.87`; swap in use was approximately 4546 MiB of 6144 MiB.

Post-audit checks:

- Watched ports `5173`, `5174`, `3000`, and `4173` again had no listening processes.
- No dev server or browser reproduction was needed for the read-only audit.
- Existing Chrome, Codex, Obsidian, and MCP helper processes remained present.
- Disk snapshot remained 460 GiB total, 347 GiB used, 71 GiB available; workspace size remained 192 MiB.
- Load snapshot: approximately `3.50 2.39 2.05`; swap in use was approximately 4538 MiB of 6144 MiB.

## Audit Findings

Public leaderboard data path:

- Phase 29 public profiles are privacy-safe and default-private. The app repository calls owner/public RPCs in `src/account/publicProfile.ts`, and public reads are by opaque `public_profile_id` only.
- The Phase 29 migration revokes direct table grants for `public_player_profiles`; owner writes are authenticated, and public RPCs return only allow-listed display fields where `visibility = 'public'` and `moderation_status = 'active'`.
- Existing ranked leaderboard projections in `src/multiplayer/rankedLeaderboardProjections.ts` are private/internal only. They require a `viewerUserId`, use placeholder identity labels, and are not a public leaderboard contract.
- Rating profiles and transactions contain raw `user_id`, `opponent_user_id`, match ids, and transaction ids. They are trusted ranking authority inputs, not public UI payloads.
- The Phase 23 rating profile table is indexed for bucket/rating, but the existing authenticated select policy still exposes raw rating-profile rows to authenticated users if queried directly. Phase 30 public leaderboard UI should not use direct browser selects over this table.
- Current stats and multiplayer stats surfaces consume local/private state. They do not provide an authoritative public leaderboard source for streaks or total games.

Recommended Phase 30 v1 leaderboard direction:

- Start with ranked Practice v1 bucket leaderboards for approved rating metrics.
- Use a new server-side allow-listed projection/RPC that joins trusted rating rows to active public profile rows internally and returns only public-safe identity and aggregate leaderboard fields.
- Omit private, inactive, or moderated public profiles from v1 leaderboards rather than showing anonymous rows that could reveal opted-out rating history.
- Use authenticated-public read access first unless the addendum and probes prove anonymous public reads are safe.
- Recommended v1 fields: public profile id, display name, accent/flair/avatar if approved, bucket, rank, current rating, games played, wins, losses, draws, provisional status, latest safe rating movement, optional peak rating if cheaply and safely derived.
- Defer non-ranked total-games and streak leaderboards until a public-safe authoritative source is specified.

Multiplayer Overview cleanup:

- The redundant secondary shortcut row is in `src/multiplayer/MultiplayerWorkspace.tsx` inside `MultiplayerOverview`. It duplicates the main `SubtabBar` and does not carry the main badge/count behavior.
- The main `SubtabBar` in `MultiplayerWorkspace` is the correct navigation row to preserve.
- Section-level contextual actions such as `View Active`, `Open Lobby`, and `Open Live` are useful and should remain.
- The confusing `Select`/`Selected` affordance is rendered by `src/multiplayer/MultiplayerActiveGames.tsx`. It only toggles selected card state via `onSelectGame`; the meaningful action for players is `Resume`.
- The active-game selection state still matters for existing route/game-surface behavior and should be preserved internally through `Resume`, selected-game ids, and existing game tabs in `MultiplayerPanel`.

## Stage 30.2 Migration/RLS Addendum Need

Stage 30.2 migration/RLS addendum planning is required before public leaderboard app implementation.

Reason: a public leaderboard must combine trusted rating authority with opt-in public profile identity without exposing raw auth ids, emails, private profile metadata, rating transaction internals, private progress, answers, seeds, sessions, or local artifacts. The browser currently has no safe allow-listed RPC that performs that join and projection. A Stage 30.2 addendum should define the exact RPC/view/table shape, grants, row limits, tie-breakers, read posture, rollback, and non-printing privacy probes.

## Verification

Passed lightweight Stage 30.1 verification:

- `git diff --check` passed.
- Python CSV shape check using `python3 -S` passed: 230 rows, 12 columns, last progress ID `228`.
- `git status --short --branch` confirmed branch `main` with expected uncommitted Phase 30 planning/progress artifacts and no source/runtime implementation files modified by this audit.

## Blockers

No blockers.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, Supabase or Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 31 work, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
