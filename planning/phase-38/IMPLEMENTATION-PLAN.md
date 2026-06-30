# Phase 38 Implementation Plan: Public/Spectator Readiness

**Status**: Draft implementation plan for review.
**Phase**: Phase 38.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-30.

## Status And Authority

This implementation plan turns the Phase 38 planning brief and unified specification into a staged execution plan. It follows the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, completed Phase 37 evidence, `planning/phase-38/PLANNING-BRIEF.md`, `planning/specs/phase-38/PHASE-38-PUBLIC-SPECTATOR-READINESS-SPEC-2026-06-30.md`, Supabase/public-profile documentation, ranked multiplayer documentation, and the progress ledger.

This plan is for review only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, brrrdle GitHub backup workflow execution, force-push, secret printing, private data exposure, local session artifact exposure, or original stable `brrrdle` repository work.

## Current Baseline

- Phase 37 is complete, backed up to GitHub, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `cdd780989535a3081a5e034bde1a247569ca28af`.
- Phase 38 planning brief exists at `planning/phase-38/PLANNING-BRIEF.md`.
- Phase 38 unified specification exists at `planning/specs/phase-38/PHASE-38-PUBLIC-SPECTATOR-READINESS-SPEC-2026-06-30.md`.
- Existing user edits to `planning/phase-37/REVIEW-CHECKLIST.md` must be preserved.
- Current Live spectator support is authenticated-only. Signed-out users do not receive Live rows.
- Current authenticated spectator data is normalized through `get_authenticated_live_v1_spectator_games_v2` and repository parsing defenses.
- Current public profile foundations are default-private and allow-list based.

## Phase Objective

Phase 38 should make public/guest spectator readiness real only if the data boundary proves safe. The phase must start with audit and RLS planning, then proceed through an additive projection contract before any public/guest Live discovery or read-only spectation UI is implemented.

Phase 38 v1 should target:

- sanitized public/guest Practice Multiplayer Live discovery;
- read-only public/guest spectation for approved eligible games;
- current Daily Multiplayer exclusion;
- preservation of authenticated participant and authenticated spectator behavior;
- optional spectator presence/count/list only after an explicit privacy and abuse gate.

## Non-Negotiable Invariants

- Public/guest spectators must not mutate ratings, claims, timers, results, game state, queues, notifications, account state, profile state, or local persistence authority.
- Public/guest payloads must not expose raw auth IDs, emails, private profile fields, auth metadata, answers, seeds, serialized sessions, player sessions, raw game projections, queue internals, rating internals, rating transactions, service IDs, tokens, screenshots, videos, traces, auth state, or local session artifacts.
- Current Daily Multiplayer remains excluded from public/guest spectation unless a later approved phase proves a no-answer-leak design.
- Public profiles remain default-private and allow-listed.
- Authenticated participant resume and authenticated read-only spectator behavior remain intact.
- Phase 37 browser history and gameplay auto-centering remain intact.
- Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior remain intact.
- Phase 35 Profile/auth and Live identity behavior remains intact.
- Phase 34 Live/Lobby/notification behavior remains intact.
- Phase 33 timed ranked Practice behavior and public leaderboard display-only boundaries remain intact.
- Daily integrity, gameplay rules, scoring, timeout/forfeit behavior, Elo math, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged.

## Stage Plan

### Stage 38.0 - Protected Baseline

**Authorization**: Baseline only.

**Goal**: Confirm the approved Phase 38 planning/spec/implementation-plan baseline and verify the repo before public/spectator audit begins.

**Actions**:

- Read required governance, Phase 38 planning/spec/implementation materials, completed Phase 37 evidence, progress records, testing workflow docs, `agents.md`, `memory.md`, and `package.json`.
- Confirm repository path, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Preserve the user-edited `planning/phase-37/REVIEW-CHECKLIST.md`.
- Record current uncommitted Phase 38 planning/spec/progress artifacts.
- Create the Stage 38.0 progress report and matching 12-column CSV row.
- Run watched-port/process checks before and after verification for `5173`, `5174`, `3000`, and `4173`.

**Verification**:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

**Stop Conditions**:

- Any verification failure.
- Repo is not `brrrdle-dev`.
- Stable `brrrdle` repo would be touched.
- Unexpected source/runtime changes appear.
- Secrets, private data, auth state, tokens, or forbidden artifacts appear in tracked or staged files.

**Output**: Stage 38.0 progress evidence and a prompt for Stage 38.1 audit only if the baseline passes.

### Stage 38.1 - Public/Spectator Data, RLS, Privacy, And Abuse Audit

**Authorization**: Read-only audit and scope lock only.

**Goal**: Determine the safe data path for public/guest spectation and decide whether the next step is a migration/RLS addendum. Expected result: migration/RLS addendum planning is required.

**Actions**:

- Audit current authenticated Live spectator UI, view-model, repository, parser, routing, and E2E seams.
- Audit signed-out and guest Live behavior.
- Audit current public profile, participant identity, ranked Live identity, and public leaderboard RLS/RPC patterns.
- Audit whether public/guest discovery can use any existing source-only seam without broadening database exposure.
- Audit current Daily Multiplayer filtering and answer-leakage protections.
- Audit potential spectator presence/count/list shapes and abuse risks.
- Decide whether Stage 38.2 should be migration/RLS addendum planning or a source-only path.

**Likely Read-Only Files**:

- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/account/publicProfile.ts`
- `src/account/profile.ts`
- Live spectator, public profile, repository, privacy, Supabase/RLS, and E2E tests.
- Relevant Supabase migrations for authenticated spectator foundations, public profiles, participant identity, ranked Live identity spectator profiles, and public leaderboard boundaries.

**Verification**:

- Focused read-only checks as needed.
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check if browser checks run
- `git status --short --branch`

**Stop Conditions**:

- Safe data cannot be identified clearly enough to plan a projection contract.
- Audit finds public/guest spectation would require broader social/profile, Daily archive, or abuse-control design.
- Any verification failure.

**Output**: Stage 38.1 progress evidence and the chosen Stage 38.2 path.

### Stage 38.2 - Public Spectator Migration/RLS Addendum Planning

**Authorization**: Documentation/spec addendum only.

**Goal**: Define the additive SQL/RLS contract for sanitized public/guest spectator projections before any migration is created.

**Actions**:

- Create a precise addendum under `planning/specs/phase-38/`.
- Define function name/signature, `anon` and/or `authenticated` execution rules, row eligibility, Practice-only filtering, current Daily exclusion, terminal visibility window, input bounds, row limits, returned fields, forbidden fields, grants/revokes, RLS behavior, parser expectations, abuse boundaries, idempotency, rollback notes, and non-printing probes.
- Decide whether public/guest spectator payloads include public avatar/accent fields or only display names/generic labels in v1.
- Decide whether aggregate spectator counts can be included in the SQL contract or should wait for Stage 38.5.

**Verification**:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

**Stop Conditions**:

- Addendum cannot exclude forbidden fields.
- Addendum requires direct raw table grants or privileged browser secrets.
- Addendum cannot preserve current Daily exclusion.
- Addendum would expose social/profile browsing ahead of Phase 39.

**Output**: Stage 38.2 addendum and progress evidence. No SQL migration is created in this stage.

### Stage 38.3 - Public Spectator Migration/RLS Execution

**Authorization**: One additive migration only after explicit user approval.

**Goal**: Implement and verify the approved sanitized public/guest spectator projection at the database/RLS layer.

**Actions**:

- Confirm the intended `brrrdle-dev` Supabase project without printing secrets.
- Create exactly one additive migration under `supabase/migrations/`.
- Preserve existing authenticated spectator and participant identity RPCs.
- Avoid direct browser table grants for raw game/rating/profile authority.
- Apply the migration only if target and credentials are unambiguous.
- Run non-printing probes for field allowlisting, forbidden field denial, read-only capabilities, current Daily exclusion, eligible Practice rows, stale/terminal windows, anon/auth grant behavior, and mutation denial.
- Update `docs/supabase.md` and/or `docs/ranked-multiplayer.md` only where needed, without claiming source/UI repair is complete.

**Focused Verification**:

- Migration dry-run/list checks where appropriate.
- Non-printing SQL/RLS probes required by the addendum.
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

**Stop Conditions**:

- Supabase target is ambiguous.
- Credentials are unavailable or would need to be printed.
- Any probe exposes forbidden fields.
- Public/guest execution can mutate data.
- Current Daily rows appear in public/guest output.
- Existing authenticated spectator behavior is affected.

**Output**: Migration path, execution/probe evidence, docs updates if any, and a prompt for source integration only if migration verification succeeds.

### Stage 38.4 - Public/Guest Live Discovery And Read-Only Spectation Source Integration

**Authorization**: Source-only public/guest discovery and read-only spectation after Stage 38.3 succeeds.

**Goal**: Add the public/guest Live surface using the approved sanitized projection while preserving authenticated paths.

**Actions**:

- Add repository parsing for public/guest spectator rows with strict forbidden-key rejection.
- Add view-model selection for signed-out and local guest public/guest Live discovery.
- Add read-only spectator detail routing for eligible public/guest rows.
- Keep signed-in participant resume and authenticated spectator behavior unchanged.
- Hide or disable all mutation actions for public/guest spectators.
- Add stale/hidden/completed/deleted/unavailable fallbacks to safe Live list or empty state.
- Preserve Phase 37 browser history and gameplay auto-centering behavior.
- Add focused tests for signed-out/guest discovery, read-only detail surfaces, forbidden actions, current Daily exclusion, public-profile fallback labels, forbidden raw identity fields, stale/terminal fallbacks, and authenticated non-regression.

**Verification**:

- Focused tests first.
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

**Stop Conditions**:

- Existing safe data proves insufficient.
- Public/guest UI can fire any mutation handler.
- Authenticated participant or authenticated spectator routing regresses.
- Current Daily rows appear.
- Any forbidden field reaches source fixtures, parsers, views, tests, docs, or output.

**Output**: Public/guest Live discovery and read-only spectation source behavior with focused and full verification evidence.

### Stage 38.5 - Spectator Presence/Count/List Gate And Optional Implementation

**Authorization**: Gate first; implement only a narrow safe slice if explicitly approved by prior evidence.

**Goal**: Decide whether spectator presence belongs in Phase 38 v1. Implement only if privacy-safe and abuse-resistant.

**Preferred Decision Path**:

- Aggregate display-only counts are the safest possible Phase 38 slice.
- Identity-bearing lists should be deferred if they risk becoming social/profile browsing ahead of Phase 39.
- Presence must not include chat, reactions, direct messages, profile links, match requests, notification targeting, or account/profile mutation.

**Actions If Safe**:

- Implement bounded aggregate counts or the explicitly approved narrow presence shape.
- Add tests for count/list privacy, display-only behavior, stale cleanup/fallback, and no mutation.
- Document any deferral clearly in progress and changelog.

**Verification**:

- Focused tests first.
- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check
- `git status --short --branch`

**Stop Conditions**:

- Presence requires identity-bearing social/profile exposure.
- Presence requires write-capable public/guest state.
- Abuse controls are unclear.
- Counts/lists become authoritative or gameplay-affecting.

**Output**: Implemented safe presence/count slice or documented deferral.

### Stage 38.6 - Final Hardening, E2E, Visual Review, Changelog, Manual Checklist

**Authorization**: Final hardening and documentation only after prior implementation stages succeed.

**Goal**: Complete Phase 38 with regression coverage, visual evidence, manual review checklist, and handoff documentation.

**Actions**:

- Review Stages 38.1 through 38.5 for regressions, stale copy, privacy gaps, docs gaps, and final cleanup needs.
- Add only narrow final-hardening fixes if required.
- Run focused regression/E2E coverage for public/guest read-only spectation, authenticated spectator preservation, participant preservation, current Daily exclusion, privacy field denial, stale/terminal fallbacks, and any spectator presence slice.
- Run local visual handoff review for Phase 38 user-visible surfaces, saving artifacts only under ignored `test-results/visual-review/phase-38-stage-38-6/`.
- Create `planning/phase-38/CHANGELOG.md`.
- Create `planning/phase-38/REVIEW-CHECKLIST.md`, using the local `brrrdle-phase-review-checklist` skill where appropriate.

**Final Verification**:

- Focused tests.
- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run test:full`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port/process cleanup
- `git status --short --branch`

**Stop Conditions**:

- Any final verification failure.
- Visual artifacts become tracked or staged.
- Privacy, read-only, Daily exclusion, or authenticated non-regression evidence is incomplete.

**Output**: Phase 38 completion evidence and a prompt for Git handoff preparation only if clean.

## Likely Files And Modules

Likely implementation/audit surfaces:

- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/account/publicProfile.ts`
- `src/account/profile.ts`
- Live spectator, public profile, repository, view-model, route/history, and E2E tests.
- Supabase migrations for authenticated spectator projection foundations, public profiles, participant identity, ranked Live identity spectator profiles, public leaderboard boundaries, and any Phase 38 additive migration.
- `docs/supabase.md`
- `docs/ranked-multiplayer.md` only if ranked spectator boundaries need clarification.

High-conflict surfaces should be single-writer or explicitly sequenced, especially `src/multiplayer/`, `supabase/migrations/`, `docs/supabase.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-*.md`, `planning/phase-38/`, and `planning/specs/phase-38/`.

## Migration/RLS Gate

Stage 38.1 should assume a migration/RLS addendum is required unless proven otherwise. Current authenticated spectator RPCs are not public/guest RPCs and must not be broadened without a dedicated projection contract.

Any Stage 38.3 migration must be:

- additive;
- allow-listed;
- bounded;
- read-only for public/guest callers;
- explicit about `anon` and `authenticated` grants;
- protective of current Daily exclusion;
- defensive against forbidden field exposure;
- reversible enough for rollback notes;
- verified by non-printing probes before source/UI claims are made.

## Public/Guest Privacy Contract

Public/guest spectator payloads may include only explicitly approved display data and read-only capability flags. All implementation stages must treat forbidden fields as parser/test failures, not just UI omissions.

If a later stage cannot prove the projection is safe without broader social/profile, account, leaderboard, Daily archive, or abuse-control work, stop and route the work to a later phase rather than expanding Phase 38.

## Supabase/Public-Profile Constraints

- Public profiles remain default-private.
- Missing, private, hidden, suspended, or malformed profiles fall back to generic labels.
- Private account profile data is never public spectator data.
- Public/guest spectator identity remains display-only.
- Profile browsing, clickable profile pages, direct requests, and social graph behavior remain Phase 39 or later.

## Vercel/Deployment Constraints

Phase 38 does not configure Vercel or deploy. Any preview, production deployment, or release remains a later explicit gate.

If a stage needs Supabase credentials, the stage must confirm the target without printing secrets. Missing credentials should stop the stage with a clear non-secret limitation rather than weakening the evidence.

## Verification Expectations

- Planning/addendum stages use lightweight documentation verification.
- Implementation stages run focused tests first, then the standard local gate.
- Migration stages include non-printing SQL/RLS probes.
- Final hardening includes full E2E and full test gates unless a later user prompt explicitly narrows the gate with a documented reason.
- Browser/resource checks should use one local dev server where possible and must clean up watched ports.

## Open Decisions

- Should Phase 38 v1 ship public/guest spectation, or stop after migration/RLS readiness if the projection is not safe enough?
- Should signed-out anonymous users and local guest users receive identical spectator behavior?
- Should eligible public/guest discovery include only in-progress Practice games or also a bounded terminal hold?
- Should public/guest spectator rows include public avatar/accent fields in v1, or only display names/generic labels?
- Are aggregate spectator counts safe enough for Phase 38, or should all presence wait for Phase 39?
- If aggregate counts are included, what row limit, refresh/poll cadence, stale cleanup, and terminal visibility windows are acceptable?

## Deferred Routing

- Public/social profile browsing, clickable rival profiles, direct player match requests, and private matchmaking expansion: Phase 39.
- Public site stats, private developer dashboard, onboarding/help/tutorial UX: Phase 40.
- EXP/coin/collectible header counters and Focus Mode: Phase 41 or later.
- Theme work: Phase 42 or later.
- Service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes: later gated phases only.

## Next Gated Action

The next safe action after review is Phase 38 Stage 38.0 protected baseline. Stage 38.0 should approve the plan, record the current uncommitted planning/spec/progress baseline, and run the baseline verification gate before any public/spectator audit, source implementation, migration/RLS work, configuration/deployment work, Git/GitHub operations, backup workflow execution, or original stable repository work.
