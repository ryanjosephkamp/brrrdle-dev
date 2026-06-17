# Phase 27 Competitive Ranking And Ranked Matchmaking Specification

**Status**: Unified Phase 27 specification for review. This document does not authorize implementation, test implementation, Supabase migrations, deployment, Git operations, release work, or Phase 27 execution.
**Date**: 2026-06-16
**Repository**: `brrrdle-dev`
**Authority**: This specification follows the Phase 27 planning brief, the post-Phase-26 roadmap revision, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, and the prompt-package standard. Direct user instructions remain higher authority.

## 1. Purpose

Phase 27 should turn the existing competitive multiplayer scaffolding into a production-safe ranked multiplayer foundation.

The phase should define and implement:

- an explainable Elo/rank model;
- clear ranked versus unranked multiplayer boundaries;
- durable, auditable, idempotent rating settlement;
- authenticated ranked matchmaking with safe queue behavior;
- private leaderboard-ready data foundations for later phases.

Phase 27 should not build public leaderboards, public player profiles, public/guest spectation, theme systems, social systems, marketplace systems, or new gameplay modes.

## 2. Current-State Findings

The repository already contains competitive scaffolding from earlier multiplayer work:

- `src/multiplayer/rating.ts` defines a deterministic Elo-style model with:
  - initial rating `1200`;
  - provisional window of 10 rated games;
  - provisional K factor `40`;
  - established K factor `24`;
  - classic Elo expected-score calculation;
  - deterministic transaction ids;
  - mode-level buckets normalized to `multiplayer:og` and `multiplayer:go`.
- `src/multiplayer/matchmaking.ts` defines queue compatibility by mode, scope, rating bucket, word length, UTC Daily key, distinct users, expiry, and rating gap.
- `src/multiplayer/scoring.ts` projects per-game match points, terminal outcomes, winner reasons, and rating evidence while keeping points separate from rating deltas.
- `src/multiplayer/competitiveMultiplayer.ts` stores local/cacheable competitive summaries and applies local rating settlement from durable result evidence.
- `src/multiplayer/MultiplayerPanel.tsx` exposes a `Ranked` match type but currently uses local preview matchmaking for ranked creation.
- `src/multiplayer/MultiplayerStatsPanel.tsx` displays local competitive rating and recent-result summaries.
- `src/account/storageSchema.ts` stores `competitiveMultiplayer` as guest/cloud progress cache state.
- `supabase/migrations/20260604033000_phase23_competitive_multiplayer.sql` creates competitive tables and queue tables but intentionally withholds direct client insert/update policies for rating profiles, match results, player results, and rating transactions.
- `docs/supabase.md` explicitly states that production rating settlement should happen through trusted RPC/server-side code with idempotency keys so browser clients cannot forge Elo values.

Conclusion: Phase 27 should audit and harden the existing scaffold rather than start over. The main product gap is not the basic Elo math; it is production trust, queue authority, durable settlement, RLS proof, and user-facing ranked boundaries.

## 3. Goals

Phase 27 must:

- choose and document the initial production ranked model;
- preserve the distinction between in-game points and Elo/rank movement;
- make ranked, unranked, and custom multiplayer behavior explicit;
- move ranked matchmaking from local preview behavior toward authenticated durable queue behavior;
- ensure rating settlement is idempotent and cannot be forged by ordinary browser clients;
- provide private leaderboard-ready data foundations without public leaderboards;
- preserve existing gameplay, Daily Multiplayer, Practice Multiplayer, Live v1 spectator, notification, dashboard, and route/workspace invariants.

## 4. Product Outcome

At Phase 27 completion, a signed-in player should understand and trust ranked multiplayer:

- ranked games are clearly labeled and distinct from unranked games;
- ranked eligibility is explicit before game creation or queue entry;
- ranked matchmaking uses opponent rating and compatibility windows rather than only existing match points;
- match points remain explainable in-game scoring;
- Elo/rank movement happens after terminal ranked outcomes and opponent strength evaluation;
- every rating movement can be audited through durable transaction records;
- failed, ambiguous, local-preview, anonymous, spectator, cancelled, corrupt, or non-durable games do not change rating;
- public leaderboard features remain deferred to Phase 29.

## 5. In-Scope Work

Phase 27 includes:

- Elo/rank model decision and implementation hardening.
- Rating bucket policy and rank display policy.
- Ranked versus unranked/custom multiplayer eligibility and UI/copy boundaries.
- Ranked Practice Multiplayer matchmaking foundations.
- Daily ranked multiplayer evaluation and possible staged enablement if invariants can be verified.
- Trusted rating settlement architecture.
- Supabase/RLS/RPC addendum if existing tables/policies are insufficient.
- Queue expiry, cancellation, compatibility windows, no-self-match, and stale-row handling.
- Private/internal leaderboard-ready projection requirements.
- Focused tests, real Supabase-backed multiplayer E2E, RLS/privacy probes, and full final gate.
- Progress and planning documentation updates.

## 6. Out-Of-Scope Work

Phase 27 must not include:

- public player profiles, routed to Phase 28;
- public leaderboards, routed to Phase 29;
- public/guest spectation, routed to Phase 30 or later;
- theme proposal/template modernization, routed to Phase 31;
- full concrete theme implementation, routed to Phase 32 or later;
- social graph, chat, marketplace, economy rewards, broader achievements, or additional game modes;
- service workers, push infrastructure, deployment, production release, or PR/merge work without separate authorization;
- gameplay-rule changes outside the narrow competitive boundaries approved by this spec and later execution prompts.

## 7. Required Invariants

Phase 27 must preserve:

- Daily Multiplayer as strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Practice Multiplayer Hard Mode and time-limit behavior unless a specific ranked eligibility rule disables ranked rating for those variants.
- Existing scoring, timeout, forfeit, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior.
- Timeout-loser precedence and post-guess forfeit-loser precedence.
- `playerSessions` as canonical per-viewer gameplay mutation state.
- Shared projections and spectator projections as display/compatibility plumbing only.
- Phase 24 route/workspace behavior.
- Phase 25 dashboard, Notification Center, route badges, and workspace attention behavior.
- Phase 26 notification preferences/sounds/browser controls, responsive hardening, and authenticated Live v1 read-only spectator behavior.

## 8. Elo/Rank Model Decision

Phase 27 should use Elo v1 as the initial production-ranked model.

Required model values:

- Initial rating: `1200`.
- Provisional rated-game window: first `10` rated games in a bucket.
- Provisional K factor: `40`.
- Established K factor: `24`.
- Expected score formula: classic Elo, `1 / (1 + 10 ** ((opponentRating - playerRating) / 400))`.
- Terminal score: win `1`, draw `0.5`, loss `0`.
- Rating rounding: integer ratings and integer deltas.
- Provisional status: derived from rated games played, not a manually editable user setting.

Rationale:

- Elo is familiar to players from chess-style sites.
- The existing code already implements and tests this exact model.
- Elo v1 is easier to explain, audit, and make idempotent than Glicko/Glicko-2.
- Rating deviation and volatility can be revisited later if player volume and ranked accuracy needs justify the complexity.

Non-goals for Elo v1:

- no performance-adjusted bonus directly from match points;
- no per-letter or per-puzzle rating modifiers;
- no separate hidden MMR;
- no inflationary XP/coin-style rank movement;
- no public leaderboard ranking surface in Phase 27.

## 9. Match Points Versus Elo Boundary

Match points and Elo/rank movement are separate quantities.

Match points:

- remain game-scoring evidence;
- use the current tile, solve, unused-attempt, and Hard Mode bonus rules unless a later approved spec changes them;
- can determine the terminal winner when existing multiplayer result rules use points as the tiebreaker;
- can be shown in result summaries.

Elo/rank:

- changes only for eligible ranked terminal matches;
- uses terminal outcome and opponent rating;
- does not directly consume points total as a rating-delta multiplier;
- can move down after a loss even if the player earned many in-game points;
- can stay unchanged when settlement evidence is ambiguous, unranked, anonymous, local-only, corrupt, cancelled, expired where not rateable, or already settled.

Player-facing copy should say this plainly: points decide the match result; rating movement reflects the ranked result against that opponent.

## 10. Rating Bucket Policy

Phase 27 should use two public-facing rating buckets at first:

- `multiplayer:og`;
- `multiplayer:go`.

Implementation must reconcile this with existing Supabase historical bucket values:

- `async:og`;
- `async:go`;
- `live:og`;
- `live:go`.

Recommended rule:

- TypeScript/domain display buckets normalize to `multiplayer:og` and `multiplayer:go`.
- Supabase storage may retain legacy `async:*` values where existing columns require them.
- Any new trusted settlement RPC should document the translation boundary explicitly.
- Do not add separate Daily versus Practice rating buckets in the first Phase 27 implementation unless the implementation plan proves that shared buckets create fairness or product clarity problems.

Open for later review:

- whether timed Practice ranked games should share the same bucket or remain unranked initially;
- whether Hard Mode ranked Practice should share the same bucket or remain unranked initially.

## 11. Rank Display Policy

Phase 27 may include rank labels only as derived display labels.

Recommended v1 labels if included:

- Frost: below 900;
- Snow: 900-1099;
- Ice: 1100-1299;
- Glacier: 1300-1499;
- Aurora: 1500-1699;
- Blizzard: 1700 and above.

These labels are optional. If included, they must:

- be derived from current rating;
- not be stored as independent rating authority;
- not unlock gameplay advantages;
- be easy to rename later without migration risk.

If label naming becomes a distraction, defer rank labels and ship numeric rating first.

## 12. Ranked Eligibility

Ranked games must require:

- authenticated signed-in participants;
- exactly two distinct users;
- durable Supabase-backed match rows;
- ranked flag explicitly set before game creation or queue pairing;
- rating bucket known and valid;
- terminal completed outcome with valid win/loss or draw/draw player results;
- idempotency key not previously settled.

Ranked games must reject rating movement for:

- anonymous/guest players;
- local preview rivals;
- authenticated Live v1 spectator rows;
- unranked matches;
- custom games unless a later spec explicitly authorizes ranked custom games;
- cancelled lobbies;
- expired/corrupt games unless a specific terminal status is approved as rateable;
- games with duplicate user ids;
- games missing player result evidence;
- games already settled.

## 13. Practice Ranked Policy

Practice Multiplayer is the recommended first ranked surface.

Required behavior:

- Ranked Practice can support OG and GO.
- Ranked Practice should initially use word length, mode, and rating bucket compatibility.
- Ranked Practice should require authenticated durable matchmaking.
- Ranked Practice should preserve the five-active-game cap.
- Ranked Practice should preserve existing Practice Hard Mode and time-limit mechanics.

Recommended eligibility defaults:

- Untimed Practice ranked games are allowed.
- Timed Practice ranked games should be explicitly decided during implementation planning; safest default is unranked until timeout/clock fairness is verified under real E2E.
- Practice Hard Mode ranked games should be explicitly decided during implementation planning; safest default is to allow Hard Mode only when both players opted into the same queued settings before pairing.

## 14. Daily Ranked Policy

Daily ranked multiplayer is higher risk than Practice ranked because it touches claim safety and UTC-day constraints.

Recommended Phase 27 staging:

1. Implement and verify Practice ranked first.
2. Add Daily ranked only if the trusted settlement and queue/RLS layer can prove Daily claim safety remains intact.

If Daily ranked is included, it must preserve:

- five-letter fixed Daily play;
- UTC date key;
- no clocks;
- no Daily Hard Mode lobby controls;
- separate OG and GO Daily answer buckets;
- one Daily Multiplayer claim per authenticated user, UTC day, and mode bucket;
- answer and seed secrecy;
- claim behavior for cancelled, joined, terminal, and expired games.

Daily ranked may require a separate sub-stage or addendum if existing queue/claim tables cannot safely express both Daily participation and ranked matching.

## 15. Ranked Matchmaking Requirements

Ranked matchmaking should graduate from local preview compatibility to durable authenticated queue behavior.

Required queue behavior:

- authenticated users can create their own queue requests;
- users can cancel their own queue requests;
- expired queue requests stop matching;
- queue entries include mode, scope, rating bucket, rating snapshot, ranked flag, user id, created/queued time, expiry, and idempotency key;
- Practice queue entries include word length and approved option constraints;
- Daily queue entries include current UTC Daily key;
- no self-match;
- same mode;
- same scope;
- same rating bucket;
- same Daily key for Daily;
- same word length for Practice;
- status must be `queued` before pairing;
- pairing must produce exactly one durable game/lobby per matched pair;
- matched queue rows must be marked `matched` idempotently.

Recommended rating window:

- 1200-rated/new profiles: initial band `200`;
- non-initial profiles: initial band `100`;
- widen by `50` every 10 minutes;
- cap at `600`;
- choose closest compatible match first;
- tie-break older queued request first.

These values match current code and are acceptable for v1. If early testing shows low-volume queues feel stuck, adjust only through a focused spec or implementation-plan decision.

## 16. Queue Authority And RLS Requirements

Current Supabase queue policy lets authenticated users create their own requests, read queued requests, and cancel their own requests. Phase 27 must decide whether that is sufficient or whether a trusted pairing RPC is required.

Recommended production rule:

- matching and game creation should be server-trusted or RPC-mediated, not two independent browser clients racing to create overlapping ranked matches;
- ordinary browser clients should not be able to mark another user's request matched unless the trusted function validates compatibility and idempotency;
- queue pairing should be idempotent and safe under concurrent attempts;
- queue cleanup should not require a privileged client secret in browser code.

If existing RLS cannot satisfy this, create a migration/RLS addendum before implementation.

## 17. Rating Settlement Requirements

Rating settlement must be trusted, durable, idempotent, and auditable.

Required settlement behavior:

- accept or derive canonical terminal match evidence;
- validate ranked eligibility;
- validate exactly two distinct authenticated users;
- validate match id, bucket, terminal status, outcomes, and idempotency key;
- compute old ratings from current profile rows;
- compute expected scores and integer deltas;
- update both rating profiles in one transaction;
- insert match result, player result, and rating transaction rows;
- do nothing on repeat settlement for the same idempotency key;
- return safe result summaries to clients.

The browser must not directly insert arbitrary rating transactions or update rating profiles.

Recommended settlement authority:

- a Supabase RPC with `security definer`, safe `search_path`, explicit auth checks, and locked-down grants; or
- an approved server-side route/function with service privileges kept out of browser code.

Phase 27 should prefer the Supabase RPC route unless the implementation plan finds a concrete reason to use another server authority.

## 18. Rating Transaction Shape

Every rating transaction should preserve:

- transaction id;
- match result id;
- source match id;
- source transport or storage surface;
- mode;
- scope;
- Daily UTC key when applicable;
- rating bucket;
- user id;
- opponent user id;
- outcome;
- old rating;
- new rating;
- rating delta;
- expected score;
- provisional status before settlement;
- games played before settlement;
- idempotency key;
- settlement version;
- created/settled timestamp.

Existing table columns cover much of this, but Phase 27 should verify whether `settlement_version`, pre-settlement provisional flags, or games-played snapshots need an additive migration.

## 19. Leaderboard-Ready Private Data

Phase 27 should prepare private/internal data foundations for Phase 29 leaderboards without creating public leaderboard UI.

Needed private projection shapes:

- current rating by user and bucket;
- ranked games played by user and bucket;
- win/loss/draw counts by user and bucket;
- latest rating transaction per user and bucket;
- optional peak rating by user and bucket;
- safe display identity placeholder or foreign-key seam for Phase 28 public profiles;
- no raw auth emails;
- no private profile data;
- no public endpoint or route.

Any public leaderboard surface must wait until Phase 29 after Phase 28 public identity/privacy work.

## 20. Public Identity And Privacy Constraints

Phase 27 may reference users internally but must not create public profile pages.

Allowed:

- internal user ids in private authenticated records;
- safe profile summary fields already approved for multiplayer display;
- placeholder projection fields needed by later profile work.

Forbidden:

- exposing raw auth emails;
- exposing service ids, tokens, or private account metadata;
- public profile routes;
- public leaderboard routes;
- user-generated public profile content;
- unreviewed public identity projection.

## 21. Live v1 Spectator Constraints

Authenticated Live v1 spectators must remain read-only in Phase 27.

Spectators must not:

- enter ranked queues from spectator rows;
- generate rating transactions;
- affect match settlement;
- mutate timers, claims, moves, joins, forfeits, cancellations, or results;
- see raw answer-bearing projections;
- become a participant without an explicit existing join flow.

Ranked spectator display may show that a game is ranked only if this is already in the sanitized spectator projection. It must not expose rating deltas or private participant rating records unless a later public projection authorizes it.

## 22. Architecture Strategy

Preferred source architecture:

- Keep Elo math in pure helpers under `src/multiplayer/rating.ts`.
- Keep match points and terminal performance projection in `src/multiplayer/scoring.ts`.
- Keep queue compatibility and search-band logic in `src/multiplayer/matchmaking.ts`.
- Add repository seams for trusted queue/settlement RPCs in or near `src/multiplayer/multiplayerRepository.ts`, or split into focused competitive repository files if the module becomes too large.
- Keep UI copy in `MultiplayerPanel`, `MultiplayerWorkspace`, and `MultiplayerStatsPanel` thin by consuming view models.
- Keep `App.tsx` as orchestration only.
- Keep leaderboard-ready projections private and separate from public UI.

Avoid:

- duplicating Elo math in React components;
- settling ratings from dashboard/notification/view-only spectator code;
- making local guest progress the source of truth for production ranked ratings;
- broad rewrites of multiplayer game mechanics;
- direct browser writes to rating tables.

## 23. Likely Files And Modules

Likely source surfaces for later implementation:

- `src/multiplayer/rating.ts`
- `src/multiplayer/rating.test.ts`
- `src/multiplayer/scoring.ts`
- `src/multiplayer/scoring.test.ts`
- `src/multiplayer/competitiveMultiplayer.ts`
- `src/multiplayer/competitiveMultiplayer.test.ts`
- `src/multiplayer/matchmaking.ts`
- `src/multiplayer/matchmaking.test.ts`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerRepository.test.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerViewModels.test.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/MultiplayerStatsPanel.test.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerWorkspace.test.tsx`
- `src/dashboard/dashboardViewModels.ts`
- `src/app/attentionViewModels.ts`
- `src/account/storageSchema.ts`
- relevant multiplayer E2E specs under `e2e/gameplay/`
- `docs/supabase.md`
- `supabase/migrations/` only under separately authorized migration prompts.

Likely planning/progress surfaces:

- `planning/phase-27/IMPLEMENTATION-PLAN.md`
- `planning/phase-27/CHANGELOG.md` if Phase 27 needs a handoff summary;
- `planning/specs/phase-27/`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

## 24. Recommended Stage Breakdown

### Stage 27.0 - Spec Approval And Protected Baseline

- Confirm repository state and existing uncommitted planning artifacts.
- Create the Phase 27 implementation plan if not already present.
- Record baseline progress.
- Run the standard baseline gate.
- Do not edit source/runtime code.

### Stage 27.1 - Competitive Domain Model Hardening

- Audit and tighten pure rating, scoring, and competitive-state helpers.
- Add tests for Elo model edge cases, bucket normalization, points/Elo separation, duplicate settlement, corrupt evidence, and rank-label derivation if labels are included.
- Preserve existing scoring behavior unless the approved implementation plan narrows a competitive-only copy or projection issue.

### Stage 27.2 - Migration/RLS Addendum For Trusted Settlement And Queue Authority

- Audit current Supabase competitive tables and queue policies.
- Create a migration/RLS addendum if trusted settlement or pairing cannot be implemented with existing schema.
- Define RPCs, table additions, grants, rollback, privacy probes, and idempotency behavior.
- Stop before creating or running any migration unless separately authorized.

### Stage 27.3 - Trusted Rating Settlement

- Implement the authorized trusted settlement path.
- Add repository/RPC parsing and error handling.
- Ensure direct browser writes to rating tables remain disallowed.
- Verify with RLS/privacy probes and focused tests.

### Stage 27.4 - Ranked Settlement App Integration

- Integrate ranked Practice settlement through trusted RPCs.
- Keep browser clients from writing rating profile/result/transaction tables directly.
- Preserve Daily ranked and timed Practice ranked deferrals.

### Stage 27.5 - Durable Ranked Matchmaking Queue

- Implement durable ranked queue create/cancel/match flows.
- Replace local preview ranked pairing with trusted queue behavior.
- Preserve unranked and custom creation flows.
- Verify concurrent pairing/idempotency behavior as far as local and Supabase-backed tests allow.

Stage 27.5 may split into separately gated addendum/migration/app implementation sub-stages if trusted queue game creation needs additional RLS/RPC authority.

### Stage 27.6 - Ranked Multiplayer UI, Stats, And Copy

- Update Multiplayer controls, status copy, and Stats summaries for production ranked behavior.
- Clearly label eligibility, queue state, rating bucket, provisional status, and unrated outcomes.
- Keep dashboard, notification, Live, Lobby, and route badges stable.

### Stage 27.7 - Private Leaderboard-Ready Projections

- Add private/internal query seams or view models needed for later leaderboards.
- Do not expose public leaderboard UI.
- Run privacy review against raw auth ids, emails, and private profile data.

### Stage 27.8 - Ranked E2E, Cleanup, And Final Hardening

- Run real two-client ranked Practice Multiplayer E2E.
- Run Daily ranked E2E only if Daily ranked was implemented.
- Run full local gates, RLS/privacy probes, browser smoke, resource checks, and final docs/progress updates.
- Stop for Git handoff preparation authorization.

## 25. Success Criteria

Phase 27 is successful when:

- Elo v1 policy is documented, implemented, and tested.
- Match points remain separate from Elo movement.
- Ranked and unranked behavior are technically and visually distinct.
- Ranked Practice matchmaking works through durable authenticated queue behavior.
- Daily ranked is either safely implemented and verified or explicitly deferred with rationale.
- Rating settlement is trusted, durable, idempotent, and audit-friendly.
- Browser clients cannot forge rating profile or transaction changes.
- Queue pairing is protected from self-match, stale rows, duplicate matches, and incompatible settings.
- Leaderboard-ready data remains private/internal.
- Existing multiplayer, Live v1 spectator, notification, dashboard, and route/workspace behavior remains intact.
- Full final verification passes before Git handoff.

## 26. Verification Strategy

Use focused tests before broader gates.

Expected focused tests:

- `src/multiplayer/rating.test.ts`
- `src/multiplayer/scoring.test.ts`
- `src/multiplayer/competitiveMultiplayer.test.ts`
- `src/multiplayer/matchmaking.test.ts`
- `src/multiplayer/multiplayerRepository.test.ts`
- `src/multiplayer/multiplayerViewModels.test.ts`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/MultiplayerStatsPanel.test.tsx`
- relevant account/storage tests if competitive cache shape changes.

Expected Supabase/RLS checks if migration work is authorized:

- authenticated user can create/cancel own queue request;
- authenticated user cannot forge another user's queue update;
- trusted settlement can settle exactly one eligible ranked result;
- repeat settlement is idempotent;
- direct client insert/update into rating profiles, match results, player results, and rating transactions remains denied;
- spectators cannot settle or mutate ranked results;
- private leaderboard-ready projection excludes raw auth emails and private metadata.

Expected real E2E:

- two signed-in users complete ranked Practice Multiplayer OG;
- two signed-in users complete ranked Practice Multiplayer GO if GO ranked is included;
- if Daily ranked is included, two signed-in users complete Daily Multiplayer ranked flow while preserving claim safety;
- a third authenticated Live v1 spectator can view a ranked live game read-only and cannot mutate settlement;
- unranked/custom games remain unrated.

Expected final gate:

- `npm run lint`
- `npm run test`
- relevant multiplayer E2E, including Supabase-backed ranked flows
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port/process cleanup checks
- browser smoke for ranked controls, stats summaries, dashboard badges, Live v1 spectator non-regression, Settings, Calendar, History, Solo, and core Multiplayer flows.

## 27. Migration/RLS Constraints

No migration is authorized by this specification.

If Phase 27 requires Supabase changes:

- create a migration/RLS addendum first;
- identify exact tables, policies, functions, views, indexes, grants, and rollback behavior;
- forbid service-role secrets in browser code;
- use `security definer` functions only with a safe `search_path` and narrow grants;
- preserve existing `async_multiplayer_games` participant policies and Phase 26 spectator RPC behavior;
- preserve Daily claim behavior;
- run non-printing RLS/privacy probes;
- stop before migration creation or execution unless explicitly authorized.

Likely migration needs:

- trusted rating settlement RPC;
- trusted matchmaking pairing RPC;
- optional settlement-version or audit fields;
- optional private leaderboard-ready view or RPC;
- optional queue cleanup/expiry helper.

## 28. Risks And Mitigations

- **Rating manipulation**: keep rating writes behind trusted RPC/server authority and verify direct client writes are denied.
- **Duplicate settlement**: use idempotency keys and unique constraints, then test repeated settlement.
- **Queue race conditions**: use trusted pairing and atomic matched-state updates.
- **Daily claim regression**: stage Daily ranked after Practice ranked unless verified separately.
- **Points/Elo confusion**: write plain copy and tests around ranked result summaries.
- **Sparse queues**: keep widening conservative and visible; allow cancellation and unranked fallback.
- **Privacy leakage**: keep leaderboard-ready data private and exclude raw auth emails/private metadata.
- **Regression in Live v1 spectator behavior**: keep spectator projections read-only and out of settlement authority.
- **Schema drift**: treat the existing competitive migration as a starting point and prove current remote behavior before relying on it.

## 29. Open Decisions

Recommended defaults are included here, but the implementation plan should either adopt or explicitly defer each one:

- **Daily ranked**: recommend Practice ranked first; add Daily ranked only after settlement and claim-safety proof.
- **Timed ranked Practice**: recommend unranked initially unless the implementation plan includes clock fairness tests.
- **Hard Mode ranked Practice**: recommend allowed only when queue settings match and both players opted into Hard Mode before pairing.
- **Rank labels**: recommend optional derived labels; defer if naming distracts from settlement and matchmaking.
- **Trusted settlement authority**: recommend Supabase RPC unless a server route is clearly safer.
- **Private leaderboard projection**: recommend private/internal only, with public leaderboard work deferred to Phase 29.

## 30. Recommended Next Gated Action

Create a detailed Phase 27 implementation plan for review.

That plan should turn this spec into a stage-by-stage execution plan, starting with Stage 27.0 protected baseline only. It should define exact deliverables, likely files/modules, verification expectations, exit gates, stop conditions, migration/RLS addendum gates, and a copy-safe Stage 27.0 prompt package.
