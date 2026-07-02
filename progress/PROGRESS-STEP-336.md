# Progress Step 336 - Phase 40 Stage 40.1 Public Profile Private Matchmaking Audit

**Status**: Completed - Awaiting User Review Before Stage 40.2
**Phase**: Phase 40 - Public Profiles And Private Matchmaking
**Stage**: 40.1 - Public Profile, Private Matchmaking, RLS, Privacy, And Routing Audit
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T21:50:45Z
**Completed**: 2026-07-01T21:51:58Z

## Authorization

The user authorized Phase 40 Stage 40.1 only: a read-only public profile, private matchmaking, RLS, privacy, and routing audit and scope lock using the completed Stage 40.0 protected baseline. This included reading governance, Phase 40 planning/spec/implementation materials, Stage 40.0 progress, current progress records, public profile/privacy surfaces, multiplayer identity surfaces, private matchmaking/custom-code lobby surfaces, notification/routing surfaces, relevant tests, Supabase/RLS context as needed, creating this progress report and matching CSV row, running focused read-only/browser/resource checks as needed, and deciding the safest Stage 40.2 path.

This pass does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- `origin/main`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The checked-off user-edited `planning/phase-39/REVIEW-CHECKLIST.md` state was preserved.

## Audit Findings

### Public Profile Contract

- `src/account/publicProfile.ts` already has strong source-side normalization and parser allowlists for owner and public profile DTOs.
- Existing public profile RPCs support owner loading/saving plus public active profile lookup by opaque `public_profile_id`.
- `supabase/migrations/20260621003033_phase29_public_profile_rls.sql` keeps the public profile table private, grants owner mutation only to authenticated users, and grants only the safe public lookup RPCs to `anon` and `authenticated`.
- Public profile route/card/clickable identity work appears likely source-only when it uses existing public profile RPCs and only opens from already-approved `public_profile_id` surfaces.
- Public profile pages must still treat private, hidden, suspended, missing, malformed, and stale profiles as safe unavailable fallbacks.

### Existing Safe Identity Surfaces

- Public ranked leaderboard rows already carry `publicProfileId` and safe display fields through `src/leaderboards/publicRankedLeaderboard.ts`.
- The public ranked leaderboard SQL is authenticated-only and returns active public profiles with aggregate ranked Practice display fields, not raw user IDs or rating transaction internals.
- Authenticated participant identity summaries are participant-scoped by game or matched ranked request and return safe display summaries only.
- Authenticated Live spectator identity and public/guest spectator projections already resolve safe public profile summaries without broadening raw multiplayer/session data.
- Current multiplayer view models intentionally strip `publicProfileId` from some active/live card profile maps, so future clickable identity work must be explicit and narrowly scoped rather than accidental.

### Private Matchmaking And Custom Games

- Existing Practice rematch RPCs are a good lifecycle template: authenticated-only, participant-scoped, expiring, cancellable/declinable/acceptable, and guarded against Daily, ranked, custom, stale, or nonparticipant misuse.
- Existing Practice rematch logic is not a general direct-request contract because it requires an eligible completed source game and rejects custom/private-code games.
- Existing custom game lobby RLS allows authenticated users to read active waiting custom lobbies. That is acceptable for the current custom-code behavior but is not a privacy-safe private invitation/direct-request contract by itself.
- Direct player-to-player requests or private invitation flows should not be treated as source-only unless Phase 40 narrows v1 to public profile browsing only.
- Phase 40 v1 can include both public profile surfaces and direct unranked/custom request planning, but the request lifecycle needs an addendum before migration or source integration.

### Routing, Notifications, And Mutation Safety

- App routes and browser history do not yet have a public profile route or selected public profile state.
- Dashboard and notification actions currently route to existing views and selected games only; they do not mutate multiplayer state.
- Private request notifications will need new view-model/action targets, but accepting/declining/cancelling requests should remain trusted repository/RPC operations rather than browser-history or notification-side mutations.
- Existing selected-game fallback and browser-history mutation-safety rules from Phase 37 should be preserved for any new profile/request routing state.

### Supabase/RLS And Privacy

- Existing public profile, public leaderboard, participant identity, public spectator, rematch, ranked queue, custom lobby, and Daily claim migrations preserve useful patterns but do not yet define a general private matchmaking request table/RPC contract.
- Stage 40.2 should define whether new database work is needed for:
  - direct unranked/custom match requests;
  - request lifecycle create/list/accept/decline/cancel/expire behavior;
  - notification-safe request payloads;
  - custom-code/private invitation visibility hardening;
  - accepted-request game creation and stale/expired handling.
- Any new mutable private matchmaking contract should be authenticated-only, participant-scoped, nonpublic, bounded, expiring, idempotent, and probeable without printing secrets or private data.
- Daily, ranked private invitations, ranked direct challenges, rating settlement bypasses, raw auth IDs, emails, private profile fields, queue internals, rating internals, sessions, answers, seeds, tokens, and local artifacts remain forbidden.

### Test Coverage Gaps

Existing coverage already includes public profile parser/RPC tests, public ranked leaderboard parser/view-model tests, participant identity parser/RPC tests, Practice rematch repository tests, postgame rematch/custom/ranked/Daily routing tests, and multiplayer E2E rematch coverage.

Missing or future Phase 40 coverage should include:

- public profile route/card lookup success and unavailable-profile fallbacks;
- clickable profile identity from leaderboard and safe multiplayer identity surfaces;
- parser defenses for any new request payloads;
- private request create/list/accept/decline/cancel/expire lifecycle tests;
- nonparticipant denial and forbidden-field denial tests;
- notification/routing tests for private request view targets;
- two-client E2E for private unranked/custom request flows;
- non-regression for ranked queue, Daily claim safety, public/guest spectator read-only boundaries, browser history, and mobile scroll harness behavior.

## Stage 40.2 Scope Decision

Stage 40.2 should proceed as **migration/RLS addendum planning**.

Recommended Phase 40 v1 route:

- keep public profile pages/cards and clickable identity as a source-only implementation path that uses the existing safe public profile RPCs and approved `public_profile_id` surfaces;
- plan direct unranked/custom private matchmaking through a Stage 40.2 addendum before any SQL migration, source implementation, test implementation, or remote execution;
- default to authenticated-only direct requests, Practice-only, unranked/custom only, no Daily, no ranked, no rating settlement bypass, bounded expiry, cancellation, decline, acceptance, idempotency, and nonparticipant denial;
- use the addendum to decide whether custom-code/private invitation cleanup is part of the same contract or remains a later source-only cleanup after direct requests are safe.

## Verification

Stage 40.1 lightweight verification passed:

- `git diff --check`
- Progress CSV shape check using `python3 -S` reported `rows=338 columns=[12] last_id=336`.
- Non-printing credential-shaped secret/artifact scan reported `scanned_files=13 credential_pattern_hits=0`.
- Ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check found no listeners on `5173`, `5174`, `3000`, or `4173`.
- `git status --short --branch` completed with the expected uncommitted Phase 40 planning/spec/progress artifacts and checked-off Phase 39 review checklist.

## Blockers And Open Questions

No blockers were found for proceeding to Stage 40.2 addendum planning.

Open questions for Stage 40.2:

- Whether direct requests target only active public profiles, prior participant-scoped opponents, or both.
- Whether Phase 40 v1 should create a new dedicated private request table/RPC family or extend existing custom lobby/rematch patterns with a new contract.
- Whether accepted private requests create fresh unranked/custom Practice games directly or create a private lobby that both players route through.
- Which rate limits, expiry windows, idempotency keys, and notification payload fields are required.
- Whether custom-code lobby visibility should be hardened in Phase 40 or deferred if direct requests use a dedicated contract.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
