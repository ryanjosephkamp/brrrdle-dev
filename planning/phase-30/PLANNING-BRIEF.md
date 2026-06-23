# Phase 30 Planning Brief

**Status**: Planning brief for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-22.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, completed Phase 29 public profile foundations, Phase 27 ranked foundations, Phase 28 Live spectator stabilization, current roadmap surfaces, and the current progress ledger.

## 1. Purpose

Phase 30 should add privacy-safe public leaderboards after the ranked Practice, private leaderboard-ready projection, and public profile foundations are stable.

The phase should also include two small Multiplayer Overview cleanup items identified by the user from `/Users/noir/Desktop/overview_screenshot_raw.png` and `/Users/noir/Desktop/overview_screnshot_edited.png`:

- remove the redundant secondary shortcut button row on the Multiplayer Overview subtab because the main Multiplayer subtab navigation row already provides the correct navigation and badge counts;
- remove or replace the unclear `Select`/`Selected` game-card affordance if audit confirms it only mutates internal selected-game state without a distinct player-facing action.

These cleanup items are treated as narrow Phase 30 UI polish, not as new gameplay or leaderboard authority.

## 2. Current State

Phase 29 is complete, merged, and cleaned up. Local `main` and `origin/main` are expected to be at `ec5d7824104d9d41e79b2b49e475c68006cf40da`.

Relevant completed foundations:

- Phase 27 created trusted ranked Practice settlement, durable ranked Practice queue behavior, ranked UI/stats copy, and private leaderboard-ready projections.
- Phase 28 stabilized authenticated Live v1 spectator behavior, current Daily spectation integrity, notification delivery, and Elo transparency.
- Phase 29 created default-private public player profile foundations with opaque `public_profile_id` values, allow-listed public fields, owner editing, and public-safe read RPC seams.

Relevant source observations from this planning pass:

- `src/multiplayer/rankedLeaderboardProjections.ts` currently provides private/internal ranked projection rows with safe placeholder identities, rating, games played, wins/losses/draws, recent rating movement, peak rating, provisional state, and per-bucket rank.
- `src/account/publicProfile.ts` and the Phase 29 migration provide public profile DTO/RPC seams that can hydrate public identity without exposing raw auth ids or private profile metadata.
- `src/multiplayer/MultiplayerPanel.tsx` owns selected multiplayer game state and visible per-game selection buttons.
- `src/app/App.tsx` and the Multiplayer workspace own route/subtab state, Overview rendering, and selected multiplayer game routing.
- The user screenshots show a redundant second Overview shortcut row below the main Multiplayer subtab navigation row. The top row has the desired badge/count behavior; the lower row does not.

## 3. Goals

- Define public leaderboard foundations for approved metrics without exposing private account, profile, progress, ranked, session, seed, answer, or local artifact data.
- Use Phase 29 public profile foundations as the public identity layer, not raw auth users or private account metadata.
- Convert private ranked leaderboard-ready projection decisions into a public-safe leaderboard contract.
- Decide which leaderboard metrics are allowed in Phase 30 and which remain deferred.
- Define whether Phase 30 leaderboards should be publicly readable to anonymous visitors or authenticated-only first.
- Plan any required Supabase schema/RLS addendum before creating or applying migrations.
- Keep leaderboard UI and projection code non-authoritative for gameplay, rating settlement, profile ownership, Daily claims, or notification state.
- Include targeted Multiplayer Overview UI cleanup for the redundant shortcut row and unclear `Select`/`Selected` affordance.

## 4. In Scope

- Public leaderboard planning for approved metrics such as:
  - ranked Elo/rating by bucket;
  - rank by bucket;
  - ranked games played;
  - ranked win/loss/draw counts;
  - recent rating movement when privacy-safe and useful;
  - peak rating if it can be trusted cheaply;
  - total games played only if the source can be public-safe and non-answer-bearing;
  - streaks only if their source and anti-abuse semantics are clear.
- Public leaderboard identity display using Phase 29 public profile fields:
  - `public_profile_id`;
  - display name;
  - accent/flair;
  - avatar URL only if already accepted by the Phase 29 public profile contract;
  - fallback `Private player` or anonymized display for non-public users.
- Public leaderboard ranking, pagination, empty states, loading states, and profile opt-in copy.
- Migration/RLS addendum planning if public leaderboard views, tables, RPCs, policies, grants, indexes, or materialized/cache refresh paths are required.
- Privacy probes that prove raw private data remains denied.
- UI cleanup in the Multiplayer Overview:
  - remove the lower secondary shortcut button row from the Overview subtab if it is only redundant navigation;
  - preserve the top Multiplayer subtab row, its active state, and badge/count behavior;
  - audit and remove or clarify the `Select`/`Selected` affordance on game cards when `Resume`, `View Active`, or direct subtab navigation already expresses the useful action;
  - preserve selected-game state needed for resume/open active game behavior.

## 5. Out of Scope

- Phase 30 implementation before separate execution authorization.
- Public/guest spectation or any new spectator projection.
- Multiplayer postgame rematch, same-settings play-again, or same-settings search-again flows.
- New ranked match types, Daily ranked, timed Practice ranked, ranked custom/private-code games, or ranked Daily leaderboards; these are routed to Phase 32 ranked mode expansion / competitive ladder v2 unless a later approved plan changes that sequence.
- Elo algorithm, K-factor, expected-score formula, rating bucket, trusted settlement, or rating transaction changes.
- Gameplay-rule changes, scoring formula changes, timeout/forfeit precedence changes, GO transition changes, keyboard-state changes, Daily claim changes, or Practice word-length changes.
- Service workers, push subscriptions, background push, or deployment configuration.
- Theme proposal/template modernization or concrete theme implementation.
- Supabase migrations before a separately authorized migration/RLS addendum and execution prompt.
- Vercel configuration, production deployment, commits, pushes, PRs, merges, releases, branch deletion, or original stable `brrrdle` repository work.

## 6. Invariants To Preserve

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Current Daily Multiplayer answer leakage through spectator views remains prevented.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged unless later explicitly approved.
- Ranked Practice v1 remains the only ranked match type unless Phase 32 or a later approved spec changes it.
- Daily ranked and timed Practice ranked remain deferred until Phase 32 ranked mode expansion planning and authorization.
- Match points and Elo/rank movement remain separate.
- Live v1 spectator behavior remains read-only.
- Public/guest spectation remains unavailable unless a later approved phase explicitly implements sanitized public projections.
- Public profiles remain opt-in/default-private public identity projections and must not become gameplay, rating, notification, or account authority.
- Leaderboard UI and leaderboard projections must not become gameplay, rating settlement, profile ownership, Daily claim, or notification authority.
- Existing scoring, timeout, forfeit, rating/Elo, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged unless explicitly approved.
- The original stable `brrrdle` repository remains untouched.

## 7. Recommended Stage Breakdown

### Stage 30.0 - Implementation Plan Approval And Protected Baseline

- Confirm repository state and preserve existing Phase 30 planning/spec/progress artifacts.
- Create the Stage 30.0 progress report and CSV row.
- Run baseline verification before implementation begins.
- Do not modify source/runtime code.

### Stage 30.1 - Leaderboard And Multiplayer Overview Audit

- Audit public profile RPCs, private ranked leaderboard-ready projections, rating profile/transaction data, ranked settlement boundaries, stats/history sources, and Supabase/RLS surfaces.
- Decide which leaderboard metrics can be public in Phase 30 without exposing private progress, answer-bearing data, raw auth ids, raw emails, private ranked projections, or local artifacts.
- Decide whether leaderboards should be anonymous-public, authenticated-public, or authenticated-only first.
- Audit the Multiplayer Overview lower shortcut row and `Select`/`Selected` affordance in the UI/source. Confirm the row is redundant with the main subtab navigation and identify whether `Select` has any distinct workflow value.
- Decide whether Stage 30.2 migration/RLS addendum planning is required.

### Stage 30.2 - Leaderboard Migration/RLS Addendum Planning

- Create a precise migration/RLS addendum if Stage 30.1 confirms durable public leaderboard tables, views, RPCs, materialized projections, or grants are needed.
- Define the public leaderboard row contract, identity hydration contract, grants, policies, rollback plan, and privacy probes.
- Define cache/refresh expectations and whether results are computed live, materialized, or periodically refreshed.
- Do not create or run migrations in this stage.

### Stage 30.3 - Leaderboard Migration/RLS Execution

- Execute only after explicit migration authorization.
- Create one additive migration if the approved addendum requires it.
- Apply only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous.
- Run non-printing privacy probes for public rows, private users, auth identifiers, emails, answers, seeds, sessions, private progress, private ranked projections, and raw rating internals.
- Stop before app implementation if migration verification fails.

### Stage 30.4 - Leaderboard Domain And Repository Foundations

- Add strict DTO parsing and repository seams for approved leaderboard RPCs or projection sources.
- Hydrate public identity only through allow-listed public profile fields.
- Keep private projections private and avoid exposing raw rating transaction internals beyond approved aggregate fields.
- Add focused tests for metric ordering, tie-breaks, row limits, missing/private profile fallback, corrupt payload rejection, and privacy exclusions.

### Stage 30.5 - Leaderboard UI And Profile Integration

- Add public leaderboard UI in the approved app location.
- Provide filters for approved categories/buckets.
- Show public-safe profile identity and clear private-profile fallbacks.
- Include empty states, loading/error states, and copy explaining opt-in profile visibility and ranked Practice v1 scope.
- Avoid making leaderboard UI a route into public/guest spectation or private gameplay state.

### Stage 30.6 - Multiplayer Overview Cleanup

- Remove the redundant secondary shortcut button row from the Multiplayer Overview subtab while preserving the primary subtab row and badge/count behavior.
- Remove, rename, or replace the confusing `Select`/`Selected` affordance after audit confirms it does not add a distinct action.
- Preserve `Resume`, `View Active`, `Open Lobby`, focused game selection, selected game persistence, active-game routing, and all existing Multiplayer subtab behavior.
- Add focused component or E2E coverage for the Overview subtab so the redundant row does not return and the useful navigation remains intact.

### Stage 30.7 - Final Hardening And Handoff

- Review public leaderboard privacy, identity display, responsive behavior, empty states, stale copy, docs/progress, and Multiplayer Overview cleanup.
- Run focused tests, relevant E2E/browser smoke, full local verification, non-printing secret/artifact checks, and resource/process cleanup checks.
- Prepare Phase 30 changelog and Git handoff evidence.

## 8. Success Criteria

- Approved public leaderboard rows expose only safe aggregate metrics and public identity fields.
- Leaderboards never expose raw auth emails, raw auth ids, private account metadata, private progress, answer-bearing fields, seeds, sessions, raw game projections, local artifacts, private ranked projections, or unapproved rating transaction internals.
- Private-profile users are omitted or displayed through an approved anonymous fallback without revealing identity.
- Public profile opt-in/default-private behavior is preserved.
- Leaderboard ordering, tie-breaks, row limits, bucket filters, and refresh/caching behavior are deterministic and tested.
- Any migration/RLS work has non-printing privacy probes proving the allow-list and deny-list behavior.
- Leaderboard UI clearly communicates ranked Practice v1 boundaries and does not imply Daily ranked, timed ranked Practice, or broader public ranking modes exist.
- Multiplayer Overview no longer shows the redundant lower shortcut row.
- The main Multiplayer subtab navigation row, badge/count behavior, active-game routing, lobby routing, Live routing, and selected-game resume behavior continue to work.
- The `Select`/`Selected` affordance is removed or clarified so players see only useful, distinct actions.
- Phase 27 ranked behavior, Phase 28 Live behavior, Phase 29 public profile behavior, Daily Multiplayer integrity, and all gameplay rules remain unchanged.

## 9. Likely Files And Modules

Planning and docs:

- `planning/phase-30/PLANNING-BRIEF.md`
- `planning/specs/phase-30/`
- `planning/phase-30/IMPLEMENTATION-PLAN.md`
- `planning/phase-30/CHANGELOG.md`
- `planning/README.md`
- `docs/ranked-multiplayer.md`
- `docs/supabase.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

Leaderboard/profile/ranked surfaces:

- `src/multiplayer/rankedLeaderboardProjections.ts`
- `src/multiplayer/rankedLeaderboardProjections.test.ts`
- `src/multiplayer/rating.ts`
- `src/multiplayer/competitiveMultiplayer.ts`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/account/publicProfile.ts`
- `src/account/publicProfile.test.ts`
- `src/account/ProfilePanel.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/app/App.tsx`
- future leaderboard component/view-model files if the spec approves them

Multiplayer Overview cleanup surfaces:

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/app/App.tsx`
- Multiplayer workspace/route tests and E2E specs as needed

Supabase/RLS surfaces:

- `supabase/migrations/20260621003033_phase29_public_profile_rls.sql`
- Phase 27 rating/ranked settlement migrations
- Phase 28 spectator v2 migration
- any future Phase 30 leaderboard migration, only after separate authorization

## 10. Migration/RLS Constraints

- A migration/RLS addendum is required before any public leaderboard database contract is created or changed.
- Public leaderboard RPCs should return a minimal allow-list, not raw table rows.
- Public leaderboard identity should join through `public_profile_id` or another approved public-safe key, never raw auth ids.
- Raw rating profile and rating transaction internals should remain private unless a specific aggregate field is approved for public display.
- Non-public profile users must not leak raw identity through leaderboard rows.
- Public reads must be explicitly decided: authenticated-only first versus anonymous-public.
- All grants and policies must be checked through non-printing probes before app integration.

## 11. Verification Strategy

Planning-only stages:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- `git status --short --branch`

Implementation stages, once separately authorized:

- focused leaderboard DTO/repository tests;
- focused public profile hydration/privacy tests;
- focused Multiplayer Overview component tests;
- relevant route/browser smoke for leaderboard and Multiplayer Overview behavior;
- Supabase-backed privacy probes if migrations/RPCs are involved;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan;
- watched-port/process cleanup checks.

Run full E2E only when implementation changes visible routes, public profile/leaderboard flows, or Multiplayer Overview behavior enough to warrant browser coverage.

## 12. Risks

- Public leaderboards can accidentally expose raw auth ids, emails, or private ranked/profile data if identity hydration bypasses Phase 29 public profile seams.
- Rating tables and transactions contain private audit data; Phase 30 should expose aggregates only.
- Streaks and total games played may be harder to make public-safe than ranked Elo rows if their source crosses private progress/history boundaries.
- Anonymous-public leaderboards are product-friendly but require stronger RLS and privacy confidence than authenticated-only leaderboards.
- Leaderboard refresh/caching can drift from trusted settlement if the projection source is not clearly defined.
- Multiplayer Overview cleanup is small but touches navigation affordances; removing redundant UI should not break active-game selection or resume routing.
- The `Select` affordance may have hidden test or state-selection behavior; Stage 30.1 should audit before removing it.

## 13. Open Decisions

- Should Phase 30 leaderboards be anonymous-public from the start, authenticated-only first, or public but restricted to opted-in public profiles?
- Which metrics are approved for Phase 30 v1: Elo/rank only, ranked games played, win/loss/draw counts, recent movement, peak rating, streaks, total games played, or a smaller subset?
- Should private-profile users be omitted entirely or shown as `Private player` rows without profile links?
- What tie-breakers should be used after rating: games played, peak rating, latest movement time, or stable deterministic id?
- Should leaderboard rows be computed live from trusted tables, materialized through a refreshable projection, or stored in a dedicated public leaderboard table?
- Where should leaderboard UI live: Stats, Multiplayer, Profile, a new route/subtab, or a dashboard card linking to a dedicated surface?
- Should Multiplayer Overview cleanup happen before or after leaderboard UI so navigation tests can cover both changes together?
- Should the `Select` affordance be removed entirely, replaced with `Open`, or hidden when `Resume` is already available?

## 14. Explicit Deferrals

- Multiplayer postgame rematch and same-settings play-again/search-again remain Phase 31.
- Ranked mode expansion / competitive ladder v2 remains Phase 32, including timed Practice ranked first and Daily ranked only after claim-safety proof.
- Public/guest spectation remains Phase 33 and requires separately approved sanitized public projections.
- Theme proposal/template modernization remains Phase 34.
- Full concrete theme implementation remains Phase 35 or later.
- Service workers, push subscriptions, background push, and deployment configuration remain out of Phase 30 unless separately planned and authorized.
- Elo algorithm changes and gameplay-rule changes remain out of Phase 30.

## 15. Next Gated Action

Create the unified Phase 30 specification for review.

The spec should turn this planning brief into a precise implementation-oriented document covering public leaderboard scope, approved metrics, public profile identity integration, privacy/RLS requirements, migration gates, UI expectations, Multiplayer Overview cleanup, verification strategy, risks, open decisions, and the next implementation-plan gate.
