# Phase 31 Multiplayer Postgame Actions And Current-Surface Cleanup Spec

**Status**: Unified specification for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-23.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, completed Phase 30 public leaderboards and Multiplayer Overview cleanup, completed Phase 29 public profile foundations, completed Phase 28 Live spectator stabilization, completed Phase 27 ranked Practice foundations, current roadmap surfaces, `planning/phase-31/PLANNING-BRIEF.md`, and the current progress ledger.

This specification does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, Phase 31 implementation, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, new custom skills, force-push, secret printing, or work in the original stable `brrrdle` repository.

## 1. Purpose

Phase 31 should add safe multiplayer postgame convenience actions after completed Practice Multiplayer games while preserving every existing authority boundary.

The core product scope is:

- Practice-only rematch request/accept with the same opponent and same settings;
- same-settings play-again or search-again after a completed Practice Multiplayer game;
- no Daily rematches, no Daily replay shortcuts, and no Daily claim bypass.

The phase also includes narrow current-surface cleanup approved by the Phase 31 planning brief:

- private "Your profile" accent preview should update with the selected account accent;
- Stats chart/accessibility markup should stop leaking duplicate visual labels or overlapping text;
- the About expected-score formula should be displayed in a clearer math-like block without changing the formula;
- Stats competitive rating buckets should be clearer, deduped, and free of stale public-leaderboard-deferred copy.

## 2. Baseline

Phase 30 is complete, merged, and cleaned up. The expected baseline is:

- `main`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- `origin/main`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`

Relevant completed foundations:

- Phase 27 created ranked Practice v1, trusted settlement, durable ranked Practice queue/finalization, and private leaderboard-ready rating projections.
- Phase 28 stabilized authenticated Live v1 spectation, excluded current Daily Multiplayer games from Live spectator discovery, stabilized notifications, and added Elo transparency.
- Phase 29 added default-private public profile foundations, notification action routing, Notification Center cleanup, and About-tab Elo transparency relocation.
- Phase 30 added authenticated-only public ranked Practice leaderboards and cleaned the Multiplayer Overview redundant shortcut row and confusing `Select`/`Selected` affordance.
- Phase 30 routed timed Practice ranked and Daily ranked to Phase 32 ranked mode expansion / competitive ladder v2.

## 3. Goals

- Add postgame rematch and same-settings convenience flows that reduce friction after completed Practice Multiplayer games.
- Preserve Daily Multiplayer claim safety, Daily answer separation, and Daily uniqueness.
- Preserve ranked Practice v1 as the only ranked match type.
- Preserve trusted ranked queue/finalization and trusted settlement authority.
- Preserve unranked/custom Practice creation flows.
- Avoid reusing answer-bearing state, seeds, serialized sessions, or participant sessions from completed games.
- Fix the approved profile, Stats, About, and rating-bucket UI/copy issues as narrow current-surface cleanup.
- Keep Phase 31 out of Phase 32 ranked expansion, public/guest spectation, service workers, push infrastructure, Elo changes, and gameplay-rule changes.

## 4. In Scope

Phase 31 may include:

- audit and reproduction of postgame terminal surfaces, ranked queue paths, unranked/custom Practice paths, Daily ineligibility, and current cleanup issues;
- Practice-only rematch request/accept for completed Practice Multiplayer OG and GO games;
- same-settings ranked queue/search-again for ranked Practice games, through the existing trusted queue path unless a later approved RLS addendum defines a safe direct rematch RPC;
- same-settings new-lobby or setup-prefill actions for unranked/custom Practice games;
- durable mutual-intent state only if Stage 31.1 proves it is required and Stage 31.2/31.3 separately approve the addendum and migration;
- stale rematch expiry, cancellation, duplicate prevention, wrong-account protections, and spam/abuse controls;
- focused domain, repository, component, and E2E coverage for postgame actions once implementation is separately authorized;
- private account initials-avatar accent preview cleanup in `ProfilePanel`;
- Stats chart/accessibility hidden-caption cleanup in the chart components and/or Stats dashboard;
- About expected-score formula display cleanup;
- rating-bucket label/copy cleanup and latest-by-user-and-bucket dedupe in the competitive Stats surface;
- stale ranked copy updates after Phase 30 public leaderboards.

## 5. Out Of Scope

Phase 31 must not include:

- implementation before separate Stage 31 execution authorization;
- timed Practice ranked, Daily ranked, ranked custom/private-code games, or rank labels/bands;
- public/guest spectation;
- new public leaderboard metrics, new public leaderboard tables/RPCs, or leaderboard authority changes;
- service workers, push subscriptions, background push, or deployment configuration;
- Elo algorithm changes, K-factor changes, expected-score formula changes, rating-bucket authority changes, trusted settlement rule changes, or rating transaction authority changes;
- gameplay-rule changes, scoring formula changes, timeout/forfeit precedence changes, GO transition changes, keyboard-state changes, Daily claim changes, Solo Daily fixed-five behavior changes, or Practice 2-35 word-length changes;
- broad redesign of Stats, Profiles, About, Multiplayer, Leaderboards, or the app shell;
- Supabase migration creation or execution before a separately approved migration/RLS stage;
- Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work.

## 6. Required Invariants

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Current Daily Multiplayer answer leakage through spectator views remains prevented.
- Daily rematches, Daily replay shortcuts, and Daily search-again shortcuts are forbidden.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged unless later explicitly approved.
- Ranked Practice v1 remains the only ranked match type unless Phase 32 or a later approved spec changes it.
- Daily ranked and timed Practice ranked remain deferred to Phase 32 ranked mode expansion.
- Match points and Elo/rank movement remain separate.
- Elo movement remains controlled by trusted settlement after durable ranked evidence.
- Live v1 spectator behavior remains read-only.
- Public/guest spectation remains unavailable unless a later approved phase explicitly implements sanitized public projections.
- Public leaderboards remain display-only and non-authoritative.
- Public profiles remain opt-in/default-private public identity projections and must not become gameplay, rating, notification, spectator, or account authority.
- Notification state, profile state, About copy, Stats copy, public leaderboard display, and postgame convenience actions must not become gameplay authority.

## 7. Postgame Action Contract

### 7.1 Eligible Source Games

Rematch and same-settings actions may be shown only for completed Practice Multiplayer games that satisfy all applicable checks:

- the source game is Practice, not Daily;
- the source game is terminal;
- the current viewer is a participant, not a spectator;
- the source game has exactly the participants required for the action;
- the source game metadata can provide same-settings input without exposing answers, seeds, serialized sessions, or participant sessions;
- the action target can be created through an approved local/repository/RPC path for the relevant ranked or unranked flow.

Daily games must show no rematch, replay, or search-again action that could imply another Daily claim or another Daily puzzle attempt.

### 7.2 Rematch Request/Accept

A rematch means the same two players agree to create a fresh Practice Multiplayer game using the same approved settings as the completed source game.

Required behavior:

- one player can request a rematch;
- the other player must accept before a rematch game is created;
- the requester should see waiting/cancelled/expired/accepted states;
- the recipient should see that the opponent requested a rematch;
- stale requests expire predictably;
- either participant can cancel where applicable;
- duplicate acceptance and duplicate game creation are idempotently guarded;
- self-rematch, wrong-account acceptance, stale source-game acceptance, unrelated-game acceptance, and nonparticipant acceptance are rejected;
- rematch intent never changes the completed source game result;
- rematch intent never changes Elo, settlement, points, public leaderboard rows, Daily claims, profile state, notification state, or spectator state.

The fresh rematch game must not reuse:

- answers;
- seeds;
- serialized sessions;
- participant sessions;
- move history;
- keyboard state;
- settlement transactions;
- queue IDs except where a trusted ranked queue/finalization flow explicitly returns a new approved identifier.

### 7.3 Ranked Practice Rematch

Ranked Practice rematches require the strictest path.

Default posture:

- same-settings ranked "search again" should use the existing trusted ranked queue path;
- direct same-opponent ranked rematch should be allowed only if a separately approved migration/RLS addendum defines a trusted direct rematch contract that preserves compatible pair creation, seat assignment, finalization, settlement eligibility, and anti-farming protections.

Ranked rematch/same-settings actions must not:

- bypass ranked queue compatibility by mode, word length, Hard Mode, and rating bucket;
- bypass trusted ranked game finalization;
- make rematch intent rating authority;
- create Daily ranked or timed Practice ranked;
- change the Phase 27 Elo model;
- change public leaderboard row authority.

### 7.4 Unranked And Custom Practice

Unranked Practice postgame actions may use simpler flows if safe:

- same-settings new lobby;
- same-settings setup prefill;
- same-settings direct game creation only if the existing repository model safely supports it.

Custom/private-code games must preserve their current privacy and invite expectations. If a new private-code or direct-pair rematch path is needed, it must be explicitly specified before implementation.

### 7.5 Same-Settings Search Again / Play Again

Same-settings search-again/play-again is distinct from rematch:

- it does not require the same opponent;
- it may create or enter another compatible Practice flow using the source game's non-answer-bearing settings;
- ranked Practice search-again uses trusted ranked queue behavior;
- unranked Practice play-again may create/pre-fill a lobby or setup surface;
- Daily search-again/play-again remains forbidden.

## 8. Current-Surface Cleanup Contract

### 8.1 Private Profile Accent Preview

The private "Your profile" initials-avatar preview must reflect the currently selected account accent when no uploaded avatar image is present.

Requirements:

- use the selected private `accentColor` for the private initials-avatar gradient;
- keep uploaded avatar images unchanged;
- keep persisted save behavior unchanged until the user saves;
- keep the public profile accent preview unchanged;
- do not change public profile visibility, public profile data, auth metadata, storage contracts, or avatar upload behavior;
- test that changing private account accent changes the private initials preview without changing the public preview.

### 8.2 Stats Chart And Accessibility Label Overlap

The Stats tab must not visibly duplicate or overlap chart captions such as "Win rate by mode & scope" or "Recent activity".

Requirements:

- audit `BarChart`, `CalendarHeatmap`, `TrendSparkline`, `StatsDashboard`, and global CSS;
- preserve visible figure captions where they are intended;
- keep screen-reader data tables available to assistive technology;
- if hidden tables use `sr-only`, ensure the project actually defines or emits that class, or replace it with the existing `.brrrdle-visually-hidden` helper;
- prefer an accessibility-correct hidden-caption/table fix over spacing hacks;
- add focused rendering tests that fail if hidden accessibility captions leak into visible layout where they should not;
- run browser smoke if the visual layout change warrants it.

### 8.3 About Expected-Score Formula Formatting

The About Elo expected-score explanation must be more readable without changing the formula.

Requirements:

- keep the existing standard 400-point Elo curve and constants;
- insert a clear visual break after the phrase introducing the curve;
- render the formula in a distinct math-like block using existing React/CSS capabilities;
- do not add MathJax, KaTeX, or new dependencies unless a later audit proves a real need and a separate authorization approves it;
- keep labels such as `expected score`, `opponent rating`, and `your rating` non-italic;
- preserve About route behavior and the "How is Elo calculated?" link target;
- update About tests for the new copy/markup.

### 8.4 Rating Buckets Clarity, Dedupe, And Stale Copy

The Stats "Competitive multiplayer" rating-bucket display should explain buckets in plain player language and avoid misleading duplicate rows.

Requirements:

- explain that a rating bucket is a separate Elo track/category, such as ranked Practice OG and ranked Practice GO;
- replace player-facing "trusted settlement" phrasing where it is confusing with clearer language such as "confirmed ranked results", while preserving trusted-settlement terminology in technical docs/tests where useful;
- display labels such as `Ranked Practice OG` and `Ranked Practice GO`, not generic `MULTIPLAYER OG`;
- dedupe profiles by normalized user and bucket before rendering, choosing the latest `updatedAt` row;
- avoid silently rendering corrupt or unknown bucket values as valid-looking duplicate OG rows;
- remove stale copy that says public leaderboards remain deferred after Phase 30;
- keep Daily ranked and timed Practice ranked deferred messaging intact;
- keep Elo constants, rating transaction authority, and trusted settlement authority unchanged;
- add focused `MultiplayerStatsPanel` tests for duplicate profiles, labels, clear copy, unknown bucket handling, stale copy removal, and no formula/algorithm changes.

## 9. Migration And RLS Decision Gate

Stage 31.1 must decide whether rematch request/accept can be implemented safely through existing repository/RPC surfaces or requires new durable state.

Stage 31.2 migration/RLS addendum planning is required if any of these are true:

- rematch request/accept requires durable cross-client mutual-intent state;
- same-opponent rematch needs a trusted RPC to create a fresh game from a completed source game;
- ranked Practice direct rematch could otherwise bypass queue/finalization or trusted settlement rules;
- wrong-account protections, request expiry, duplicate creation prevention, or spam prevention cannot be enforced with existing app-only state;
- repository behavior would need new table, RPC, view, policy, grant, trigger, or cleanup behavior.

Any addendum must define:

- exact table/RPC/view names;
- exact allowed fields and forbidden fields;
- participant read/write rules;
- request lifecycle states;
- stale request expiry;
- cancellation behavior;
- idempotency keys or duplicate creation protections;
- wrong-account and nonparticipant rejection;
- spam/rate-limit posture;
- grants and RLS policies;
- rollback plan;
- non-printing privacy/abuse probes;
- verification strategy.

Current-surface cleanup items should not require migrations. If implementation audit suggests SQL/RLS work for those cleanup items, stop and report before proceeding.

## 10. Privacy And Abuse Requirements

Postgame actions must not expose or persist:

- raw auth emails;
- raw auth IDs beyond existing participant-owned trusted server boundaries;
- private profile metadata;
- private public-profile drafts;
- private ranked projections;
- answers;
- seeds;
- serialized sessions;
- participant sessions;
- move histories beyond the completed source game's existing authorized views;
- tokens;
- local session artifacts;
- spectator-only data;
- Daily claim internals.

Abuse controls must cover:

- repeated rematch spam;
- stale request acceptance;
- source-game mismatch;
- wrong-account acceptance;
- nonparticipant access;
- self-match attempts;
- duplicate game creation;
- ranked queue bypass;
- same-settings actions that accidentally act as rematches without mutual consent.

## 11. Likely Files And Modules

Postgame action surfaces:

- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/matchmaking.ts`
- `src/multiplayer/scoring.ts`
- `src/multiplayer/rating.ts`
- focused multiplayer domain/repository/component tests
- relevant Playwright E2E specs for two-client postgame behavior

Current-surface cleanup surfaces:

- `src/account/ProfilePanel.tsx`
- `src/account/ProfilePanel.test.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/stats/StatsDashboard.test.tsx`
- `src/stats/charts/BarChart.tsx`
- `src/stats/charts/CalendarHeatmap.tsx`
- `src/stats/charts/TrendSparkline.tsx`
- `src/index.css`
- `src/app/App.tsx`
- `src/app/AboutBrrrdlePanel.test.tsx`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/MultiplayerStatsPanel.test.tsx`
- `src/multiplayer/rankedLeaderboardProjections.ts`
- `src/multiplayer/rating.ts`

Planning and docs:

- `planning/phase-31/PLANNING-BRIEF.md`
- `planning/specs/phase-31/PHASE-31-MULTIPLAYER-POSTGAME-ACTIONS-AND-CURRENT-SURFACE-CLEANUP-SPEC-2026-06-23.md`
- future `planning/phase-31/IMPLEMENTATION-PLAN.md`
- future `planning/phase-31/CHANGELOG.md`
- `planning/README.md`
- `docs/ranked-multiplayer.md`
- `docs/supabase.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

## 12. Recommended Stage Breakdown

### Stage 31.0 - Implementation Plan Approval And Protected Baseline

- Confirm repository state.
- Preserve existing uncommitted Phase 31 planning/spec/progress artifacts.
- Create Stage 31.0 progress records.
- Run baseline verification.
- Do not modify source/runtime code.

### Stage 31.1 - Postgame And Current-Surface Audit

- Audit completed Practice terminal screens, result surfaces, ranked queue state, unranked/custom creation, Daily boundaries, and source-game metadata.
- Reproduce or confirm private profile accent preview behavior.
- Reproduce or confirm Stats caption/accessibility overlap.
- Audit About expected-score formula markup.
- Reproduce or confirm rating-bucket duplicate/misleading rows and stale copy.
- Decide whether Stage 31.2 migration/RLS addendum planning is required.
- Do not implement source/runtime fixes.

### Stage 31.2 - Rematch Migration/RLS Addendum Planning

- Create an addendum only if Stage 31.1 confirms durable rematch state or trusted RPC work is required.
- Define request lifecycle, participant rules, fields, forbidden data, expiry, cancellation, idempotency, grants, RLS, rollback, probes, and verification.
- Do not create or run SQL.

### Stage 31.3 - Rematch Migration/RLS Execution

- Execute only after explicit migration authorization.
- Create one additive migration if required.
- Apply only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous.
- Run non-printing privacy/abuse probes.
- Stop before app implementation if migration verification fails.

### Stage 31.4 - Postgame Domain And Repository Foundations

- Add domain/repository seams for rematch intent and same-settings actions.
- Preserve ranked queue, unranked/custom, and Daily exclusions.
- Add focused pure/repository tests for eligibility, same-settings extraction, lifecycle state, idempotency, stale requests, wrong-account rejection, ranked queue preservation, and Daily exclusion.

### Stage 31.5 - Postgame UI Integration

- Add postgame actions to appropriate Practice terminal/result surfaces.
- Show request, waiting, accepted, cancelled, expired, and unavailable states clearly.
- Add same-settings ranked search-again or unranked lobby/setup actions.
- Add component tests and real two-client E2E for any cross-client mutual-intent claims.

### Stage 31.6 - Current-Surface Cleanup

- Fix private profile accent preview.
- Fix Stats chart/accessibility overlap.
- Format About expected-score formula.
- Improve rating-bucket copy and labels.
- Dedupe latest rating-bucket rows and guard corrupt/unknown buckets.
- Remove stale public-leaderboard-deferred copy.
- Add focused tests and browser smoke where visible behavior changed.

### Stage 31.7 - Final Hardening And Handoff

- Review postgame actions, ranked/unranked/Daily boundaries, current-surface cleanup, docs/progress, privacy boundaries, and resource state.
- Create Phase 31 changelog.
- Run focused tests, relevant two-client E2E/browser smoke, full local verification, non-printing secret/artifact checks, and watched-port/process cleanup checks.
- Halt for separate Git handoff preparation authorization.

## 13. Success Criteria

Phase 31 is successful when:

- completed Practice Multiplayer games offer approved rematch and/or same-settings convenience actions;
- rematch game creation requires mutual intent;
- one-player same-settings search/new-lobby actions are clearly not rematches;
- Daily Multiplayer offers no rematch, replay, or search-again shortcuts;
- ranked Practice actions preserve queue/finalization and trusted settlement;
- unranked/custom Practice flows still work;
- stale rematch requests expire or cancel predictably if durable requests are implemented;
- wrong-account, nonparticipant, self-match, duplicate, stale source game, and spam/abuse cases are guarded;
- the private profile initials-avatar preview reflects selected private accent;
- Stats chart/accessibility labels no longer visually overlap while remaining accessible;
- the About expected-score formula is readable and mathematically unchanged;
- rating buckets are explained in plain language and display at most one latest row per user/bucket;
- bucket labels are clear and do not show misleading duplicate `MULTIPLAYER OG` rows;
- public leaderboard copy is no longer stale;
- Phase 30 public leaderboards, Phase 29 public profiles, Phase 28 Live spectator behavior, Phase 27 ranked Practice behavior, Daily Multiplayer integrity, and all gameplay rules remain unchanged.

## 14. Verification Strategy

Planning-only stages:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- `git status --short --branch`

Implementation stages, once separately authorized, should include:

- focused postgame domain/repository tests;
- focused postgame component/view-model tests;
- real two-client Supabase-backed E2E for rematch or durable cross-client mutual-intent claims;
- focused `ProfilePanel` tests for accent preview;
- focused `StatsDashboard` and chart tests for hidden accessibility tables/captions and visible layout labels;
- focused `AboutBrrrdlePanel` tests for expected-score formula formatting;
- focused `MultiplayerStatsPanel` tests for bucket labels, dedupe, unknown bucket handling, and copy;
- browser smoke for Stats/Profile/About visible changes if warranted;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e` when postgame route/workspace behavior or two-client multiplayer behavior changes;
- `npm run test:full` during final hardening;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan;
- watched-port/process cleanup checks.

## 15. Risks And Mitigations

- **Daily claim bypass**: never show Daily rematch/replay/search-again actions; add explicit tests.
- **Ranked queue bypass**: default ranked same-settings action to trusted queue/search-again unless a direct rematch RPC is explicitly approved.
- **Stale rematch request**: require expiry and source-game validation if requests are durable.
- **Wrong-account acceptance**: require authenticated participant identity checks.
- **Duplicate creation**: require idempotency or duplicate guards before creating fresh games.
- **Rematch spam**: debounce or rate-limit repeated requests where state is durable.
- **Answer/seed leakage**: copy only approved same-settings metadata.
- **Profile privacy drift**: private accent preview must not change public profile visibility or public identity.
- **Accessibility regression**: Stats fixes must preserve screen-reader chart data.
- **Elo authority confusion**: copy can be friendlier, but Elo constants and trusted settlement authority do not change.
- **Bucket corruption masking**: unknown buckets should not become valid-looking duplicate OG rows.
- **Scope creep**: keep Phase 32 ranked expansion, public/guest spectation, service workers, push infrastructure, theme work, Elo changes, and gameplay-rule changes out of Phase 31.

## 16. Open Decisions

- Does rematch request/accept require durable Supabase state, or can Phase 31 safely use existing game/lobby/RPC paths?
- Should ranked Practice offer direct same-opponent rematch, or only same-settings ranked search-again through the queue?
- Should unranked Practice rematch create a fresh private-code/custom game, a setup prefill, or a direct participant-pair game?
- What expiry window should durable rematch requests use?
- Should players see both `Request rematch` and `Search again`, or should one action be primary by ranked/unranked context?
- Should unknown rating buckets be hidden from player-facing UI, grouped under a safe diagnostic label, or dropped during normalization?
- Should About formula formatting use a code-style block, semantic math-like HTML, or a small local component?

## 17. Explicit Deferrals

- Ranked mode expansion / competitive ladder v2 remains Phase 32, including timed Practice ranked first and Daily ranked only after claim-safety proof.
- Public/guest spectation remains Phase 33 and requires separately approved sanitized public projections.
- Theme proposal/template modernization remains Phase 34.
- Full concrete theme implementation remains Phase 35 or later.
- Service workers, push subscriptions, background push, and deployment configuration remain out of Phase 31 unless separately planned and authorized.
- Elo algorithm changes, rating authority changes, and gameplay-rule changes remain out of Phase 31.

## 18. Next Gated Action

The next safe action is a detailed Phase 31 implementation plan.

That plan should:

- turn this specification into a staged execution plan;
- preserve Practice-only rematch/search-again scope and Daily exclusions;
- decide the Stage 31.1 audit contract and Stage 31.2 migration/RLS addendum gate;
- include the profile, Stats, About, and rating-bucket cleanup items;
- define exact stage-level verification expectations;
- generate the next prompt package for Stage 31.0 baseline only.

Do not begin Phase 31 implementation from this specification alone.
