# Phase 27 Competitive Ranking And Ranked Matchmaking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` or `superpowers:subagent-driven-development` only after the user explicitly authorizes a specific Phase 27 execution prompt. This plan is not implementation authorization.

**Status**: Detailed implementation plan for review. This document does not authorize source/runtime implementation, test implementation, Supabase migrations, deployment, Git operations, release work, or Phase 27 execution.
**Repository**: `brrrdle-dev`.
**Created**: 2026-06-16.
**Authority**: Planning artifact under current user instructions, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-27/PLANNING-BRIEF.md`, and `planning/specs/phase-27/PHASE-27-COMPETITIVE-RANKING-AND-MATCHMAKING-SPEC-2026-06-16.md`.
**Goal**: Execute Phase 27 in safe gates: Elo/rank model hardening, ranked/unranked boundaries, trusted settlement, durable ranked matchmaking, private leaderboard-ready projections, and final ranked verification.
**Architecture**: Keep gameplay mechanics authoritative in the existing multiplayer domain. Keep Elo, scoring, matchmaking, settlement evidence, and UI projections separated. Treat Supabase settlement and queue authority as migration/RLS-gated until explicitly planned, authorized, executed, and probed.
**Tech Stack**: React, TypeScript, Vite, Vitest, Playwright, Supabase, existing multiplayer domain modules, existing guest/cloud progress storage, and current Phase 26 Live v1 spectator RPC behavior.

---

## 1. Execution Principles

- Phase 27 is a competitive multiplayer foundation phase, not a gameplay rewrite.
- Every stage requires a separate explicit user prompt.
- Work proceeds in order from Stage 27.0 unless the user explicitly changes the sequence.
- Practice ranked is the safest first product target; Daily ranked is staged behind claim-safety and settlement proof.
- Match points and Elo/rank movement stay separate. Points can decide a match result; Elo movement reflects ranked terminal outcome against opponent strength.
- Browser clients must not be able to forge rating profiles, match results, player results, rating transactions, queue pairings, or settlement outcomes.
- Existing local competitive state is a cache/display surface, not production rating authority once trusted settlement exists.
- Keep `App.tsx` orchestration thin. Put competitive decisions in pure helpers, repositories, RPC seams, and view models.
- Keep `src/multiplayer/`, `src/account/`, `src/app/`, `supabase/`, and progress/planning files single-writer unless a later coordination prompt explicitly sequences them.
- Use real Supabase-backed multi-client verification for ranked matchmaking, trusted settlement, Daily claim safety, and spectator non-mutation claims.
- Do not implement public player profiles, public leaderboards, public/guest spectation, theme work, social systems, service workers, push infrastructure, deployment, release, PR, or merge work inside Phase 27 execution prompts unless separately authorized.

## 2. Required Invariants

All stages must preserve:

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged unless a stage explicitly makes a ranked-eligibility decision that leaves the underlying gameplay behavior intact.
- Existing scoring, timeout, forfeit, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged.
- Timeout-loser precedence and post-guess forfeit-loser precedence remain intact.
- `playerSessions` remain canonical per-viewer mutation state.
- Shared projections and spectator projections remain display/compatibility plumbing only.
- Phase 24 route/workspace behavior remains intact.
- Phase 25 Home Dashboard, Notification Center, local read/dismiss metadata, route badges, and workspace attention cues remain intact.
- Phase 26 notification preferences, sounds, browser controls, responsive hardening, and authenticated Live v1 read-only spectator behavior remain intact.
- Authenticated spectators cannot join ranked queues from spectator rows, submit guesses, forfeit, cancel, mutate timers, settle ratings, alter claims, or see raw answer-bearing projection data.

## 3. Success Criteria

Phase 27 is complete when:

- Elo v1 is documented, implemented or hardened, and tested with the approved values: 1200 initial rating, 10-game provisional window, K=40 provisional, K=24 established, classic expected score, integer deltas, and win/loss/draw terminal scores.
- Rating buckets are explicit and reconciled between TypeScript display buckets (`multiplayer:og`, `multiplayer:go`) and existing Supabase storage buckets (`async:og`, `async:go`, `live:og`, `live:go`).
- Ranked, unranked, and custom multiplayer flows are technically and visually distinct.
- Ranked Practice matchmaking uses durable authenticated queue behavior rather than local preview rival pairing.
- Daily ranked is either safely implemented and verified, or explicitly deferred with a specific rationale and next gate.
- Trusted settlement is idempotent, durable, auditable, and protected from ordinary browser-client forgery.
- Queue pairing is protected from self-matches, stale rows, duplicate matches, incompatible settings, expired requests, and race-prone browser-only matching.
- Private leaderboard-ready projections exist only as internal/private seams, with public leaderboards deferred to Phase 29.
- Full focused, Supabase-backed, browser smoke, resource, CSV, diff, and artifact checks pass before Git handoff preparation.

## 4. File And Module Strategy

### Existing Domain Files To Modify Carefully

- `src/multiplayer/rating.ts`
  - Elo values, bucket normalization, eligibility, transaction ids, rank-label helpers if approved.
- `src/multiplayer/rating.test.ts`
  - Elo edge cases, provisional transitions, bucket mapping, idempotency, corrupt/ambiguous evidence.
- `src/multiplayer/scoring.ts`
  - Competitive evidence projection only; do not change core point formulas without explicit approval.
- `src/multiplayer/scoring.test.ts`
  - Points/Elo separation, timeout/forfeit precedence, ranked/unranked evidence.
- `src/multiplayer/matchmaking.ts`
  - Search-band math, compatibility rules, expiry, no-self-match, Daily UTC key, Practice word length.
- `src/multiplayer/matchmaking.test.ts`
  - Window widening, expiry, tie-breaks, Daily/Practice constraints, ranked flag behavior.
- `src/multiplayer/competitiveMultiplayer.ts`
  - Local/cache state normalization, merge behavior, display summaries, transition away from local settlement authority where needed.
- `src/multiplayer/competitiveMultiplayer.test.ts`
  - Cache merge, duplicate settlement avoidance, legacy compatibility.
- `src/multiplayer/multiplayer.ts`
  - Ranked metadata only where canonical game rows need it; avoid broad gameplay rule edits.
- `src/multiplayer/multiplayerRepository.ts`
  - Trusted RPC seams for queue, settlement, rating/profile reads, and private projections.
- `src/multiplayer/multiplayerRepository.test.ts`
  - DTO parsing, forbidden-field rejection, RPC calls, RLS-safe error handling.

### Existing UI And View-Model Files To Modify Carefully

- `src/multiplayer/MultiplayerPanel.tsx`
  - Replace local preview ranked creation with queue-aware status and controls.
- `src/multiplayer/MultiplayerPanel.test.tsx`
  - Ranked eligibility, queue actions, unrated outcomes, authenticated requirements.
- `src/multiplayer/MultiplayerStatsPanel.tsx`
  - Trusted rating profile/results/transaction summaries.
- `src/multiplayer/MultiplayerStatsPanel.test.tsx`
  - Provisional/established copy, bucket labels, empty and errored states.
- `src/multiplayer/MultiplayerWorkspace.tsx`
  - Ranked subtabs/status integration if needed, preserving existing workspace behavior.
- `src/multiplayer/multiplayerViewModels.ts`
  - Ranked rows, queue rows, rating summaries, private projection formatting.
- `src/dashboard/dashboardViewModels.ts`
  - Only if Home summary or attention cues need ranked counts.
- `src/app/attentionViewModels.ts`
  - Only if ranked queue/turn attention needs existing badge behavior.
- `src/app/App.tsx`
  - Final orchestration only after domain/repository/view-model shapes are stable.

### Existing Persistence And Supabase Files To Modify Carefully

- `src/account/storageSchema.ts`
  - Competitive cache shape only if local/cloud progress needs compatibility updates.
- `docs/supabase.md`
  - Document trusted settlement, queue authority, RLS probes, and manual verification after migration work.
- `supabase/migrations/`
  - Only under separately authorized migration/RLS prompts.
- Existing competitive migration:
  - `supabase/migrations/20260604033000_phase23_competitive_multiplayer.sql`.
- Existing async multiplayer migration:
  - `supabase/migrations/20260604050824_phase23_online_multiplayer_fixes.sql`.
- Existing Daily claim migrations:
  - `supabase/migrations/20260604223000_phase23_daily_multiplayer_claims.sql`.
  - `supabase/migrations/20260605223500_phase23_stage6_daily_claim_release.sql`.
- Existing Phase 26 spectator RPC:
  - `supabase/migrations/20260615235440_phase26_live_v1_authenticated_spectator_projection.sql`.

### Likely New Files

- `src/multiplayer/rankLabels.ts`
  - Optional derived rank labels if labels are approved and would clutter `rating.ts`.
- `src/multiplayer/rankedSettlement.ts`
  - Optional pure DTO/evidence conversion helpers if trusted settlement parsing becomes large.
- `src/multiplayer/rankedMatchmakingRepository.ts`
  - Optional split if queue RPC seams would make `multiplayerRepository.ts` too broad.
- `src/multiplayer/rankedViewModels.ts`
  - Optional split for rating/profile/queue display projections.
- `e2e/gameplay/ranked-multiplayer.spec.ts`
  - Real two-client ranked Practice verification, plus Daily ranked if implemented.
- `planning/specs/phase-27/PHASE-27-TRUSTED-SETTLEMENT-AND-MATCHMAKING-RLS-ADDENDUM-*.md`
  - Required if a migration/RLS change is needed before source implementation.
- `planning/phase-27/CHANGELOG.md`
  - Optional final handoff summary after implementation stages complete.

## 5. Stage Breakdown

### Stage 27.0 - Implementation Plan Approval And Protected Baseline

**Purpose**: Establish a clean Phase 27 baseline before source/runtime work.

**Deliverables**

- Record current repository state, branch, remotes, `HEAD`, and `origin/main`.
- Preserve existing uncommitted planning/spec/progress artifacts.
- Create the Stage 27.0 progress report and matching CSV row.
- Run the baseline local gate and resource checks.
- Add a minimal status note to this plan only if useful.

**Likely files/modules**

- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-187.md` or next available ID
- `planning/phase-27/IMPLEMENTATION-PLAN.md` only for a small status note if warranted

**Verification**

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Python `csv` shape check
- watched-port/process/resource checks

**Exit gate**

- Baseline passes, progress is recorded, and the user explicitly reviews before Stage 27.1.

**Stop conditions**

- Dirty worktree contains unexpected source/runtime changes.
- Any baseline command fails.
- Supabase or environment checks require secrets to diagnose.

### Stage 27.1 - Competitive Domain Model Hardening

**Purpose**: Make the pure competitive model explicit and robust before database authority changes.

**Deliverables**

- Audit `rating.ts`, `scoring.ts`, `matchmaking.ts`, and `competitiveMultiplayer.ts`.
- Harden Elo edge cases: expected score, rounding, K-factor boundary, provisional transition, duplicate settlement, corrupt evidence, draw/draw, win/loss validation, and legacy bucket normalization.
- Add or update pure tests for points/Elo separation and timeout/forfeit precedence.
- Decide whether rank labels are included or deferred; if included, keep labels derived from rating only.
- Confirm Practice ranked eligibility defaults:
  - untimed Practice ranked allowed;
  - timed Practice ranked deferred unless clock fairness is proven;
  - Hard Mode ranked allowed only when queue settings match before pairing.
- Keep Daily ranked as deferred until a later stage proves claim safety.

**Likely files/modules**

- `src/multiplayer/rating.ts`
- `src/multiplayer/rating.test.ts`
- `src/multiplayer/scoring.ts`
- `src/multiplayer/scoring.test.ts`
- `src/multiplayer/matchmaking.ts`
- `src/multiplayer/matchmaking.test.ts`
- `src/multiplayer/competitiveMultiplayer.ts`
- `src/multiplayer/competitiveMultiplayer.test.ts`

**Dependencies**

- Stage 27.0 baseline.
- Unified Phase 27 spec decisions.

**Verification**

- Focused competitive domain tests.
- `npm run lint`
- `npm run test`
- `git diff --check`
- Python `csv` shape check
- Build/typecheck if exported types or module boundaries change.

**Exit gate**

- Pure competitive model is stable enough to support migration/RLS addendum work.

**Stop conditions**

- Hardening requires changing gameplay scoring formulas rather than competitive evidence projection.
- Bucket policy cannot reconcile TypeScript and Supabase values without migration planning.
- Daily ranked cannot be reasoned about without claim-schema changes.

### Stage 27.2 - Trusted Settlement And Queue Migration/RLS Addendum

**Purpose**: Plan database authority before creating or running migrations.

**Deliverables**

- Audit current Supabase competitive tables, queue policies, grants, indexes, and RLS.
- Define whether existing schema is sufficient for:
  - trusted rating settlement;
  - idempotent match result/player result/rating transaction inserts;
  - atomic profile updates;
  - trusted queue pairing and matched-row updates;
  - private leaderboard-ready projections.
- Create a Phase 27 migration/RLS addendum if changes are required.
- Define exact RPC/view/table/index/policy/grant shapes, rollback, privacy probes, and real E2E.
- Preserve direct-client denial for rating profile, match result, player result, and rating transaction writes.

**Likely files/modules**

- `planning/specs/phase-27/PHASE-27-TRUSTED-SETTLEMENT-AND-MATCHMAKING-RLS-ADDENDUM-2026-06-16.md` or date-accurate successor
- `docs/supabase.md` read-only unless the addendum prompt explicitly permits documentation updates
- `supabase/migrations/` read-only in this stage
- relevant Supabase migration files read-only

**Dependencies**

- Stage 27.1 domain decisions.

**Verification**

- `git diff --check`
- Python `csv` shape check
- `git status --short --branch`

**Exit gate**

- Addendum is reviewed and the user can explicitly authorize migration execution.

**Stop conditions**

- Any temptation to create or run migration SQL.
- A proposed RPC would need service-role secrets in browser code.
- A proposed policy would expose raw auth emails, private profile data, raw projections, answers, seeds, or participant-only mutable state.

### Stage 27.3 - Authorized Settlement And Queue Migration/RLS Execution

**Purpose**: Create and apply only the separately authorized database changes needed for trusted ranked behavior.

**Deliverables**

- Create one or more additive Supabase migrations matching the Stage 27.2 addendum.
- Apply migrations only to the confirmed intended `brrrdle-dev` Supabase project.
- Add or update SQL/RLS probe support if authorized.
- Verify:
  - anon users cannot use protected ranked RPCs;
  - authenticated users cannot forge rating writes;
  - trusted settlement is idempotent;
  - trusted pairing is atomic and compatibility-checked;
  - participants retain expected read/write access;
  - spectators remain read-only;
  - Daily claims remain intact.

**Likely files/modules**

- `supabase/migrations/`
- `docs/supabase.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

**Dependencies**

- Explicit migration execution authorization.
- Unambiguous Supabase project target.
- Stage 27.2 addendum approval.

**Verification**

- Non-printing SQL/RLS/privacy probes.
- Focused multiplayer repository tests if policies affect participant reads/writes.
- `git diff --check`
- Python `csv` shape check
- `git status --short --branch`

**Exit gate**

- Remote migration and RLS probes pass, with no source/runtime app implementation yet unless separately authorized.

**Stop conditions**

- Supabase target is ambiguous.
- Credentials/tooling are unavailable.
- Probe results show raw write, raw projection, answer, seed, email, or private metadata exposure.
- Persistent spectator or public projection work appears necessary.

### Stage 27.4 - Trusted Rating Settlement App Integration

**Purpose**: Wire ranked result settlement through the trusted path while preserving local display/cache compatibility.

**Deliverables**

- Add repository seams for trusted settlement RPCs.
- Add strict DTO parsing and forbidden-field rejection where applicable.
- Convert canonical terminal multiplayer results into trusted settlement requests.
- Make repeat settlement idempotent from the app perspective.
- Keep unranked, custom, local preview, anonymous, spectator, cancelled, corrupt, duplicate-user, and ambiguous results unrated.
- Update local competitive state only as a cache/display of trusted settlement results.
- Preserve existing result summaries and gameplay flow.

**Likely files/modules**

- `src/multiplayer/multiplayerRepository.ts`
- optional `src/multiplayer/rankedSettlement.ts`
- `src/multiplayer/competitiveMultiplayer.ts`
- `src/multiplayer/scoring.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- relevant tests
- `src/app/App.tsx` only for orchestration after helper shapes are stable

**Dependencies**

- Stage 27.3 migration/RLS execution if required.
- Stage 27.1 domain decisions.

**Verification**

- Focused repository/domain/view-model tests.
- RLS probes for direct write denial and idempotent settlement.
- Real two-client ranked Practice OG terminal settlement if feasible.
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Python `csv` shape check

**Exit gate**

- Ranked settlement is trusted and non-forgeable for completed eligible Practice ranked matches.

**Stop conditions**

- Settlement depends on client-supplied old/new ratings as authority.
- Direct browser writes to protected rating tables are required.
- Spectator rows can settle or mutate rating state.
- Daily claim or existing multiplayer participant save behavior regresses.

### Stage 27.5 - Durable Ranked Matchmaking Queue

**Purpose**: Replace local preview ranked pairing with durable authenticated queue behavior.

**Deliverables**

- Add queue create/cancel/status repository seams.
- Add trusted pairing call if Stage 27.3 provided it.
- Preserve unranked and custom game creation flows.
- Use approved compatibility rules:
  - authenticated users only;
  - queued status only;
  - no self-match;
  - same mode, scope, rating bucket;
  - Practice word length and approved option constraints;
  - Daily UTC key only if Daily ranked is enabled;
  - expiry and cancellation;
  - widening bands with closest-compatible/oldest tie-break.
- Surface queue status without implying guaranteed instant matching.
- Do not create duplicate games for the same matched pair/idempotency key.

**Likely files/modules**

- `src/multiplayer/matchmaking.ts`
- `src/multiplayer/multiplayerRepository.ts`
- optional `src/multiplayer/rankedMatchmakingRepository.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- relevant tests

**Dependencies**

- Stage 27.3 queue authority if current policies are insufficient.
- Stage 27.4 settlement integration can be in progress only if file ownership is sequenced; otherwise complete Stage 27.4 first.

**Verification**

- Focused queue/domain/repository/component tests.
- RLS probes:
  - user can create/cancel own queue request;
  - user cannot update another user's request directly;
  - trusted pairing validates compatibility and is idempotent.
- Real two-client queue pairing E2E.
- Standard local gate subset for touched files, then lint/test/build/typecheck if wiring changes are broad.

**Exit gate**

- Ranked Practice queue can create a durable matched game without local preview rivals or duplicate rows.

**Stop conditions**

- Pairing can be raced into duplicate games.
- Queue cancellation can cancel another user's request.
- Ranked queue creation bypasses authentication.
- Daily ranked queueing threatens Daily claim safety.

### Stage 27.6 - Ranked Multiplayer UI, Stats, And Copy

**Purpose**: Make ranked status understandable and keep existing app surfaces stable.

**Deliverables**

- Update Multiplayer controls to explain ranked eligibility, queue state, provisional rating, and unrated outcomes.
- Update Stats panel to consume trusted rating/profile/transaction summaries.
- Add derived rank labels only if Stage 27.1 approved them.
- Show clear copy for points versus Elo:
  - points decide match result;
  - rating movement reflects ranked result against opponent strength.
- Keep Dashboard, Notification Center, route badges, Live v1 spectator, History, Calendar, Settings, and Solo non-regressed.
- Ensure read-only spectator UI cannot expose settlement controls or private rating details.

**Likely files/modules**

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/dashboard/dashboardViewModels.ts` only if needed
- `src/app/attentionViewModels.ts` only if needed
- relevant component tests
- `src/index.css` only for small layout/accessibility adjustments if needed

**Dependencies**

- Stage 27.4 and Stage 27.5 core behaviors.

**Verification**

- Focused UI/view-model tests.
- Browser smoke for signed-out, signed-in unranked, signed-in ranked queued, matched, settled, spectator read-only, and empty states.
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Python `csv` shape check

**Exit gate**

- Ranked surfaces are understandable without disrupting Phase 24-26 navigation, dashboard, notification, and Live behavior.

**Stop conditions**

- UI copy implies all multiplayer games are ranked.
- Stats display treats local preview/cache as trusted production rating.
- Read-only spectator surfaces expose mutation or settlement affordances.

### Stage 27.7 - Private Leaderboard-Ready Projections

**Purpose**: Prepare internal data seams for Phase 29 leaderboards without building public leaderboards.

**Deliverables**

- Add private/internal projection or repository seams for:
  - current rating by user and bucket;
  - ranked games played by user and bucket;
  - win/loss/draw counts;
  - recent rating movement;
  - optional peak rating if cheap and trusted;
  - safe display identity placeholders for Phase 28.
- Keep projections private/authenticated/internal; do not create public routes or public leaderboard UI.
- Add privacy tests/probes for raw auth emails, private profile data, tokens, raw ids where not approved, answer-bearing projections, and raw sessions.
- Document how Phase 28 public profile identity should attach later.

**Likely files/modules**

- `src/multiplayer/multiplayerRepository.ts` or optional split repository file
- `src/multiplayer/multiplayerViewModels.ts` or optional `rankedViewModels.ts`
- `docs/supabase.md`
- Supabase migration/view/RPC only if already authorized through Stage 27.2/27.3
- focused tests

**Dependencies**

- Trusted rating tables and settlement from Stage 27.3/27.4.

**Verification**

- Focused repository/view-model tests.
- RLS/privacy probes.
- Non-printing secret/artifact scan over changed files.
- Standard documentation and local checks for touched surfaces.

**Exit gate**

- Phase 29 has a private data foundation to build public leaderboards later, without public exposure in Phase 27.

**Stop conditions**

- Public leaderboard UI, routes, or public APIs appear necessary.
- Raw auth emails or private profile metadata would be exposed.
- Projection requires public profile decisions from Phase 28.

### Stage 27.8 - Ranked E2E, Cleanup, And Final Hardening

**Purpose**: Complete Phase 27 with focused cleanup and full final verification.

**Deliverables**

- Review Stage 27.1 through Stage 27.7 for stale copy, duplicate logic, RLS drift, UI confusion, accessibility gaps, and docs/progress gaps.
- Add final targeted tests only where cleanup changes behavior or an obvious gap remains.
- Create `planning/phase-27/CHANGELOG.md` if useful for handoff.
- Update docs/progress minimally.
- Do not stage, commit, push, create a PR, merge, deploy, release, or begin Phase 28.

**Likely files/modules**

- Any touched Phase 27 source/test/docs surfaces.
- `planning/phase-27/CHANGELOG.md` if created.
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

**Verification**

- Focused tests for touched files.
- Real Supabase-backed ranked Practice OG and GO E2E if both are implemented.
- Daily ranked E2E only if Daily ranked was implemented.
- Third-client authenticated Live v1 spectator non-mutation check.
- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run test:full`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Python `csv` shape check
- non-printing secret/artifact scan
- ignored-artifact staging check
- watched-port/process cleanup checks
- desktop/tablet/mobile browser smoke for ranked controls, stats summaries, dashboard badges, Live v1 spectator non-regression, Settings, Calendar, History, Solo, and core Multiplayer flows

**Exit gate**

- Phase 27 appears complete and ready for Git handoff preparation under separate explicit authorization.

**Stop conditions**

- Any final gate fails.
- Remote cleanup or test artifacts cannot be verified.
- A migration, deployment, release, PR, merge, or Phase 28 action becomes necessary.

## 6. Migration And RLS Gate Strategy

No Supabase migration is authorized by this plan.

Before any migration is created or run, a separate Stage 27 migration/RLS addendum must define:

- exact tables, columns, constraints, indexes, functions, views, grants, and policies;
- trusted settlement RPC shape and idempotency key behavior;
- trusted queue pairing RPC shape and concurrency behavior;
- rating bucket translation between `multiplayer:*` and existing `async:*`/`live:*` buckets;
- private leaderboard-ready projection boundaries;
- explicit excluded fields such as raw auth emails, private profile data, answers, seeds, serialized sessions, player sessions, raw projections, service ids, and tokens;
- rollback plan;
- remote project target confirmation rules;
- SQL/RLS/privacy probes;
- real Supabase-backed E2E plan.

Stop before migration creation or execution unless the user explicitly authorizes that protected action.

## 7. Architecture And State Strategy

- Pure competitive math stays in `rating.ts`.
- Match points and terminal performance projection stay in `scoring.ts`.
- Queue compatibility math stays in `matchmaking.ts`.
- Trusted RPC DTO parsing and repository calls stay in repository/seam modules, not in React components.
- React components consume view models and callbacks, not raw database rows.
- Local guest/cloud progress may preserve competitive cache state for display and backward compatibility, but production-ranked truth should come from trusted Supabase rows once Stage 27 settlement is active.
- Existing custom lobbies remain unranked unless a later approved spec authorizes ranked custom behavior.
- Existing notification/dashboard/attention surfaces may summarize ranked state but must not become settlement or queue authority.

## 8. Risk Management

- **Rating manipulation**: keep writes behind trusted RPC/server authority; probe direct client denial.
- **Duplicate settlement**: use unique idempotency keys and repeat-settlement tests.
- **Queue races**: use atomic trusted pairing and matched-state updates.
- **Daily claim regression**: ship Practice ranked first; add Daily ranked only after claim-safety proof.
- **Points/Elo confusion**: add plain UI copy and tests around result summaries.
- **Sparse queues**: expose queue status, cancellation, and unranked fallback; keep widening conservative.
- **Privacy leakage**: keep private projections internal and scan/probe for raw emails, ids, private metadata, answers, seeds, sessions, and projections.
- **Spectator regression**: keep Live v1 spectator rows read-only and outside rating mutation.
- **Schema drift**: inspect local and remote migrations before relying on existing policies.
- **High-conflict files**: sequence `src/multiplayer/`, `src/app/App.tsx`, `supabase/`, and progress edits.

## 9. Documentation And Progress Expectations

Each stage should:

- create the next `progress/PROGRESS-STEP-*.md`;
- append exactly one matching 12-column row to `progress/PROGRESS.csv`;
- update this implementation plan only for status notes or accepted scope decisions;
- update the Phase 27 spec only if the user authorizes a spec change;
- update `docs/supabase.md` after authorized migration/RLS work;
- create or update `planning/phase-27/CHANGELOG.md` near final hardening if useful;
- end with a copy-safe next prompt package for the next gated action.

## 10. Open Decisions

Recommended defaults unless the user changes them:

- **Daily ranked**: defer until Practice ranked settlement and queue safety pass; implement in Phase 27 only if claim safety is proven.
- **Timed Practice ranked**: keep unranked initially unless Stage 27.1 and real E2E prove clock fairness and timeout settlement are safe.
- **Hard Mode Practice ranked**: allow only when both queued players opted into matching Hard Mode settings before pairing.
- **Rank labels**: optional derived labels; defer if naming slows trusted settlement and matchmaking.
- **Settlement authority**: prefer Supabase RPC with safe `search_path`, narrow grants, and no service-role secrets in browser code.
- **Private leaderboard projection**: implement private/internal seams only; public leaderboards wait for Phase 29 after Phase 28 public identity work.

## 11. Recommended Next Gated Prompt

The next safe action is Stage 27.0 baseline only. The prompt should authorize baseline verification and progress recording, not source/runtime implementation.
