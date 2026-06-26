# Phase 33 Planning Brief

**Status**: Planning brief for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-25.
**Recommended phase focus**: Competitive ladder v2 readiness, safe ranked expansion gates, and small ranked leaderboard polish.

## Authority

This brief is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, completed Phase 32 stabilization materials, completed Phase 31 postgame actions, completed Phase 30 public leaderboards, completed Phase 29 public profiles, completed Phase 28 Live spectator behavior, completed Phase 27 ranked Practice foundations, `docs/ranked-multiplayer.md`, `docs/supabase.md`, `progress/PROGRESS.csv`, and the current progress reports.

This document does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, deployment, Vercel or Supabase configuration, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

## Current Baseline

Phase 32 stabilization is complete, merged, visually reviewed, manually checklisted, backed up through the repository workflow, and cleaned up. The Phase 32 checklist workflow and brrrdle GitHub backup skill documentation are also complete and merged.

During this planning pass, local `main` and `origin/main` were confirmed at:

`32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`

The active ranked system remains ranked Practice v1:

- only signed-in, durable, completed, trusted-settled, untimed Practice games affect Elo;
- timed Practice ranked is explicitly deferred in code and docs;
- Daily ranked is explicitly deferred;
- custom/private-code ranked games are deferred;
- public ranked leaderboards are authenticated-only, display-only, and non-authoritative;
- Phase 32 repaired rematch lifecycle, queue/lobby creator routing, participant identity labels, global account avatar accent propagation, no-comma rating display, and real two-client E2E coverage.

## New User Observations To Route

### Vercel Sign-In Screen After Magic Link

The user-provided screenshot `/Users/noir/Desktop/Screenshot 2026-06-25 at 5.15.19 PM.png` shows a Vercel-hosted `Log in to Vercel` page after following a sign-in link. Based on the screenshot and the repository deployment docs, the safest current interpretation is that this may be Vercel deployment protection or preview-deployment access control rather than an app-source authentication bug. It still matters before public launch because players must not need Vercel accounts to play the game.

Recommended route: defer to a dedicated Phase 34 auth and deployment readiness phase. That phase should audit Vercel deployment protection, production versus preview URL behavior, Supabase Site URL and redirect URLs, magic-link redirect targets, email/password account creation copy, password recovery, email change, and password change flows. Phase 33 should not modify Vercel or Supabase configuration.

### Account Creation And Account Management

The user observed unclear behavior after magic-link sign-up followed by email/password account creation, including unclear confirmation copy and missing password/email management inside the app.

Recommended route: defer to Phase 34 auth and deployment readiness. Account password reset, email change, confirmation copy, and account-management surfaces should be ordinary account/settings features, not hidden inside a destructive Danger Zone. Danger Zone completion can be reviewed there, but password/email management should be treated as normal account administration.

### Public Ranked Leaderboard All-Buckets View

The current public ranked leaderboard view model exposes an `All buckets` filter and the panel defaults to that combined view. The user prefers removing the player-facing all-buckets button/view so players choose between `OG` and `GO` directly.

Recommended route: include this as a small Phase 33 ranked leaderboard polish item. Default the player-facing leaderboard to `OG` and expose only `OG` and `GO` bucket controls. Preserve any repository/RPC capability needed internally, but do not keep the combined all-buckets view as a player-facing table mode unless a later spec reintroduces it.

### Beginner-Friendly Onboarding And Help

The user wants eventual first-time-player onboarding, help, tutorial, walkthrough, or tooltip support so the game is understandable to new players without changing gameplay difficulty.

Recommended route: defer to a later dedicated onboarding/help phase after the competitive ladder and auth/deployment readiness work. This should be product UX work, not a Phase 33 ranked ladder dependency. A good later target is Phase 35 if auth/deployment readiness becomes Phase 34; otherwise route it after the next public-access readiness phase.

## Recommended Phase 33 Direction

Phase 33 should be a competitive ladder v2 readiness and careful ranked expansion phase, not a broad ranked expansion blast.

Best recommendation:

1. Treat timed Practice ranked as the only plausible first ranked expansion candidate, but put it behind explicit audit, RLS/migration, trusted timeout settlement, queue compatibility, and two-client verification gates.
2. Do not implement Daily ranked in Phase 33.
3. Do not implement ranked custom/private-code games in Phase 33.
4. Allow display-only rank labels/bands in Phase 33 if the spec defines them as pure rating-derived labels with no Elo authority.
5. Include the small public leaderboard filter cleanup that removes the player-facing `All buckets` mode.
6. Route the Vercel/auth/account-management observations to Phase 34.
7. Route onboarding/help to a later dedicated UX phase.

This keeps Phase 33 valuable while avoiding the riskiest possible combination: timed clocks, Daily claim rules, custom lobbies, public access, deployment settings, and Elo authority all changing at once.

## Goals

- Decide and specify the safest competitive ladder v2 path after Phase 32 stabilization.
- Audit timed Practice ranked readiness before any ranked mode is enabled.
- Preserve untimed ranked Practice v1 behavior while preparing any approved extension.
- Plan display-only rank labels/bands without changing Elo authority.
- Remove the player-facing public leaderboard all-buckets mode if later implementation is authorized.
- Preserve Phase 32 multiplayer stabilization, Phase 31 postgame boundaries, Phase 30 leaderboard authority, Phase 29 public profile privacy, Phase 28 Live read-only behavior, Phase 27 ranked Practice foundations, Daily Multiplayer integrity, and all gameplay rules.

## In Scope

### Timed Practice Ranked Readiness

Phase 33 may audit and, only if later gated stages prove safety, implement a first timed Practice ranked slice.

Required before implementation:

- clock fairness audit for both clients;
- trusted timeout settlement proof;
- queue compatibility rules for time-limit settings;
- rating-bucket semantics that do not mix untimed and timed ratings;
- public leaderboard impact review;
- RLS/RPC contract review;
- two-client Supabase-backed E2E plan;
- rollback strategy if a timed ranked path proves too risky.

Recommended v1 constraint: if timed Practice ranked is implemented, support one explicitly approved ranked time control first rather than every Practice timer option. Use separate timed rating buckets so timed results do not mix with untimed ranked Practice v1 ratings.

### Display-Only Rank Labels/Bands

Phase 33 may add rank labels/bands only if they are display-only labels derived from existing trusted ratings.

Allowed:

- labels such as tiers/bands based on current rating thresholds;
- clear copy that labels are descriptive and rating-derived;
- tests proving labels do not change sorting, settlement, or Elo values.

Not allowed:

- changing Elo algorithm, K-factors, provisional windows, expected-score formula, rating movement, or settlement authority;
- using labels as matchmaking authority unless a later spec explicitly approves it.

### Public Leaderboard Filter Cleanup

Phase 33 may remove the player-facing `All buckets` leaderboard button/view.

Expected behavior:

- public ranked leaderboard shows only `OG` and `GO` bucket controls;
- default selection should be `OG ranked Practice`;
- `GO` remains one click away;
- no comma rating display from Phase 32 remains preserved;
- leaderboard authority remains display-only and authenticated-only;
- no SQL change should be required for this cleanup unless the later spec finds a hidden contract issue.

### Ranked Expansion Documentation

Phase 33 should update `docs/ranked-multiplayer.md`, `docs/supabase.md`, planning docs, and progress records to reflect any approved changes or explicit deferrals.

## Out Of Scope

- Daily ranked implementation.
- Ranked custom/private-code games.
- Broad Elo algorithm changes.
- Gameplay-rule changes.
- Public/guest spectation.
- Broad social/profile browsing features.
- Clickable leaderboard profiles or in-game profile cards unless a later approved scope explicitly pulls them in.
- Vercel deployment protection changes, production deployment, Supabase auth configuration, magic-link redirect configuration, password/email management implementation, and account creation copy changes.
- Beginner onboarding/tutorial/help implementation.
- Service workers, push subscriptions, background push, or deployment config.
- Theme proposal/template modernization and full concrete theme implementation.
- Unrelated UI redesign.
- Commits, pushes, pull requests, merges, releases, branch deletion, or GitHub backup workflow execution.
- Work in the original stable `brrrdle` repository.

## Ranked Mode Routing Decisions

### Timed Practice Ranked

Route as the only viable Phase 33 ranked expansion candidate, gated by audit and possibly migration/RLS addendum work.

Phase 33 must not simply flip the existing `Timed Practice ranked matchmaking is deferred` guard. Timed ranked needs trusted timeout evidence, compatible queue matching, clear bucket semantics, and two-client verification.

Recommended semantics if implemented:

- signed-in only;
- Practice only;
- one approved time control for v1;
- separate timed rating buckets from untimed ranked Practice;
- no Daily claims or custom/private-code games;
- trusted settlement only;
- public leaderboard exposure only after privacy and bucket-label review.

### Daily Ranked

Defer. Daily ranked has higher integrity risk because it touches UTC-day uniqueness, answer separation, no-clock behavior, claim safety, anti-cheat expectations, and Daily spectator leakage boundaries. It should not be Phase 33 v1.

### Ranked Custom/Private-Code Games

Defer. Private-code ranked games create collusion and ladder-integrity concerns. They should remain unranked unless a later competitive integrity spec creates an anti-abuse model.

### Rank Labels/Bands

Allow in Phase 33 as display-only if the unified spec defines names, thresholds, edge cases, and copy. Labels must be rating-derived and non-authoritative.

### Public Leaderboard Expansion

Do not expand public leaderboards to new timed buckets until timed ranked has been fully implemented and verified. Phase 33 may remove the player-facing all-buckets view and may display rank labels for current ranked Practice v1 rows if labels are approved.

## Recommended Stage Breakdown

### Stage 33.0: Protected Baseline

- Read governance, completed Phase 32 materials, ranked docs, Supabase docs, local workflow docs, package/test surfaces, and relevant source/test surfaces.
- Confirm repository state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Record existing uncommitted Phase 33 planning artifacts.
- Run resource/process checks.
- Run baseline verification before implementation work.

### Stage 33.1: Ranked Expansion Audit And User-Observation Routing

- Audit ranked queue, settlement, rating buckets, timeout settlement, timed Practice gameplay, public leaderboard view models, and relevant E2E coverage.
- Confirm whether timed Practice ranked requires SQL/RPC/RLS changes.
- Confirm leaderboard all-buckets cleanup is source-only.
- Confirm Vercel/auth/account-management observations are routed to Phase 34 and not Phase 33 implementation.
- Confirm onboarding/help is routed later.

### Stage 33.2: Migration/RLS Addendum Planning If Required

Run only if Stage 33.1 proves timed Practice ranked, timed buckets, trusted timeout settlement, or leaderboard exposure requires database/RPC/RLS changes.

- Define exact additive migration/RPC/RLS contract.
- Define privacy probes and rollback.
- Preserve ranked settlement authority, Daily claim safety, public profile boundaries, and leaderboard display-only authority.
- Do not create or run migrations in this stage.

### Stage 33.3: Migration/RLS Execution If Approved

Run only after a clean Stage 33.2 addendum and explicit user authorization.

- Create at most the approved additive migration(s).
- Apply only to confirmed `brrrdle-dev` Supabase if target and credentials are unambiguous.
- Run non-printing privacy/abuse probes.
- Stop before app work if target, credentials, SQL safety, or probes fail.

### Stage 33.4: Ranked Display And Leaderboard Polish

- Implement display-only rank labels/bands if approved by the unified spec.
- Remove the player-facing public leaderboard `All buckets` view.
- Default public ranked leaderboard to `OG`.
- Preserve no-comma rating display and display-only leaderboard authority.
- Add focused formatter/component tests.

### Stage 33.5: Timed Practice Ranked Domain And Repository Foundations If Approved

Run only if Stages 33.1 through 33.3 prove timed ranked is safe enough for implementation.

- Add timed ranked eligibility and bucket handling.
- Preserve untimed ranked Practice v1.
- Preserve unranked timed Practice behavior.
- Preserve Daily ranked deferral.
- Add focused domain/repository tests.

### Stage 33.6: Timed Practice Ranked UI Integration If Approved

Run only after Stage 33.5 succeeds.

- Add UI affordances for the approved timed ranked v1 time control.
- Keep unavailable ranked modes clearly unavailable or hidden.
- Preserve Phase 32 queue/lobby routing and postgame search-again behavior.
- Add focused component/route tests.

### Stage 33.7: Real Two-Client E2E, Visual Review, Manual Checklist, And Final Hardening

- Add or update real two-client Supabase-backed E2E for any ranked expansion implemented.
- Verify rank labels and leaderboard filter cleanup.
- Run final verification gate.
- Run visual handoff review for changed user-visible surfaces.
- Generate the Phase 33 manual review checklist before Git handoff.
- Create Phase 33 changelog and final progress report.

## Success Criteria

Phase 33 is successful when the approved scope is complete and:

- untimed ranked Practice v1 remains intact;
- no Daily ranked, ranked custom/private-code, Elo algorithm, or gameplay-rule changes are introduced;
- if timed Practice ranked is implemented, it uses trusted settlement, clear queue compatibility, separate timed bucket semantics, and real two-client verification;
- if timed Practice ranked is not implemented, the phase still leaves a clear audit/addendum record and safe next gate;
- display-only rank labels, if implemented, cannot affect rating authority;
- public ranked leaderboard no longer exposes a player-facing `All buckets` view if that cleanup is authorized;
- public leaderboard authority remains display-only and authenticated-only;
- Phase 32 rematch, identity, queue/lobby routing, avatar, rating-display, and E2E behavior remain preserved;
- visual review and manual checklist workflow expectations are satisfied before Git handoff.

## Likely Files And Modules

- `src/multiplayer/matchmaking.ts`
- `src/multiplayer/rating.ts`
- `src/multiplayer/scoring.ts`
- `src/multiplayer/competitiveMultiplayer.ts`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/postgameActions.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/leaderboards/publicRankedLeaderboard.ts`
- `src/leaderboards/publicRankedLeaderboardViewModels.ts`
- `src/leaderboards/PublicRankedLeaderboardPanel.tsx`
- ranked, leaderboard, queue, timeout, settlement, postgame, identity, Supabase/RLS, and E2E tests
- `supabase/migrations/` only if a later addendum and execution prompt authorizes SQL
- `docs/ranked-multiplayer.md`
- `docs/supabase.md`
- `planning/phase-33/`
- `planning/specs/phase-33/`
- `progress/PROGRESS.csv`

## Migration And RLS Constraints

- No migration should be created without a Stage 33 migration/RLS addendum.
- Any timed ranked SQL must be additive and must not weaken existing ranked queue, trusted settlement, public profile, public leaderboard, participant identity, rematch, or Daily claim policies.
- Clients must not directly write rating profiles or rating transactions.
- Trusted settlement remains the rating authority.
- Public leaderboards remain display-only.
- Daily answers, seeds, claims, private profile metadata, auth emails, raw auth IDs, tokens, sessions, queue internals, rating transaction IDs, and settlement IDs must not leak.
- If new timed buckets are introduced, migration/RLS planning must define how they are inserted, exposed, queried, and rolled back.

## Verification Strategy

Planning and spec stages:

- `git diff --check`
- Python CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Implementation stages, if later authorized:

- focused ranked/leaderboard/domain/component tests first;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- real two-client Supabase-backed E2E for any ranked expansion and affected queue/postgame flows;
- public leaderboard component/route checks for bucket filter behavior;
- visual handoff review for user-visible ranked and leaderboard changes;
- manual review checklist before Git handoff;
- non-printing secret/artifact checks and watched-port/process cleanup checks.

## Visual Handoff Review Expectations

Before Phase 33 Git handoff, run the local visual handoff review workflow for changed user-visible surfaces where feasible. Expected targets may include:

- public ranked leaderboard with `OG` and `GO` controls only;
- rank labels/bands if implemented;
- timed ranked queue/game UI if implemented;
- unavailable/deferred Daily ranked or custom ranked affordances if visible;
- any preserved Phase 32 surfaces touched during Phase 33.

Visual artifacts must remain local-only ignored artifacts and must not be committed.

## Manual Review Checklist Expectations

Before Phase 33 Git handoff, generate `planning/phase-33/REVIEW-CHECKLIST.md` if implementation work lands. The checklist should give the user simple manual verification steps for:

- ranked ladder changes actually implemented;
- leaderboard all-buckets removal;
- rank labels/bands if implemented;
- timed ranked behavior if implemented;
- explicit deferrals that should remain unavailable;
- preserved Phase 32/31/30/29/28/27 invariants.

The checklist is a human review aid, not a substitute for automated verification.

## GitHub Backup Workflow Expectations

Do not run the brrrdle GitHub backup workflow during planning or implementation unless the user explicitly invokes and authorizes it. If Phase 33 completes and the user requests backup, use the local brrrdle GitHub backup skill as the all-in-one Git/GitHub path, preserving its stop conditions and squash-merge tree-equivalence model.

## Risks

- Timed Practice ranked can create unfair rating movement if client clocks, timeout evidence, or trusted settlement disagree.
- Sharing untimed and timed ratings would confuse players and distort competitive meaning.
- Too many timed buckets would fragment leaderboards and queue matching.
- Public leaderboard bucket changes could accidentally remove useful internal query behavior if UI and repository responsibilities are mixed.
- Rank labels could be mistaken for authority unless copy and tests make them display-only.
- Daily ranked could compromise Daily claim safety if pulled in prematurely.
- Vercel/auth work touches deployment configuration and should not be mixed into ranked ladder implementation.
- Onboarding work is broad UX work and should not distract from ranked authority.

## Open Decisions For The Unified Spec

Recommended defaults for the next spec:

- Phase 33 v1 should default to audit plus display polish, with timed Practice ranked implementation gated by Stage 33.1 and Stage 33.2 findings.
- If timed ranked proceeds, support one canonical time control first and use separate timed rating buckets.
- Rank labels/bands should be display-only and rating-derived; exact names and thresholds should be selected in the unified spec.
- Public leaderboard should default to `OG` and remove player-facing `All buckets`.
- Vercel/auth/account-management should become Phase 34 auth and deployment readiness.
- Onboarding/help should be routed to the next broad UX polish phase after auth/deployment readiness.

## Next Gated Prompt

If this planning brief is approved, the next step is a unified Phase 33 specification. That spec should lock the Phase 33 scope, decide whether timed Practice ranked implementation is attempted or only prepared, define rank label/band behavior if included, define public leaderboard filter cleanup, and preserve all Phase 32 stabilization guarantees.
