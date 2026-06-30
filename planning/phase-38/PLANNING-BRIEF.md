# Phase 38 Planning Brief: Public/Spectator Readiness

**Status**: Draft planning brief for review.
**Phase**: Phase 38.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-30.

## Status And Authority

This planning brief follows the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, completed Phase 37 evidence, `planning/ROADMAP.md`, `planning/ROADMAP-OPTIMIZED.md`, `planning/testing/TESTING-SUITE.md`, Supabase/public-profile documentation, ranked multiplayer documentation, and the progress ledger.

It is planning-only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, brrrdle GitHub backup workflow execution, force-push, secret printing, private data exposure, local session artifact exposure, or original stable `brrrdle` repository work.

## Current Baseline

- Phase 37 is complete, backed up to GitHub, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `cdd780989535a3081a5e034bde1a247569ca28af`.
- User-reported Phase 37 manual review result: all manual review checklist items passed and no additional Phase 38 bugfix or feature requests were added.
- User-edited `planning/phase-37/REVIEW-CHECKLIST.md` must be preserved.
- Phase 37 completed:
  - solo OG/GO invalid-guess sound consistency with existing multiplayer invalid-guess behavior;
  - gameplay-area auto-centering after safe entry, join, resume, routing, and postgame transitions;
  - browser back/forward view-state integration for routes, tabs, subtabs, and selected games;
  - stale/unavailable selected-game fallbacks without gameplay mutation;
  - E2E helper hardening for one-click Lobby join;
  - visual handoff review;
  - manual review checklist.
- Existing public-profile, participant-identity, authenticated Live spectator, ranked Live identity, leaderboard, and rematch RPC work establishes a privacy-safe pattern for future public/spectator planning, but it does not authorize public/guest spectation by itself.

## Manual Review Result Summary

The Phase 37 manual review is clean based on the user's current report. Phase 38 planning can proceed.

No new user-reported bugs or feature additions were added to the Phase 38 scope beyond the roadmap-planned public/spectator readiness work.

## Recommended Phase 38 Direction

Phase 38 should be a conservative public/spectator readiness phase, not a broad social or public profile expansion phase.

The safest v1 direction is:

1. Start with a read-only audit of public/guest spectation feasibility, data availability, RLS boundaries, Live filtering, and abuse/privacy constraints.
2. Create a migration/RLS addendum before any SQL work if public/guest spectator projections require database changes. This is expected because current Live spectator RPCs are authenticated-only.
3. Implement sanitized public/guest Live discovery and read-only spectation only after the projection contract proves it can exclude sensitive data and prevent all mutation paths.
4. Treat spectator count/list presence as optional and gated by the audit/addendum. It should be included only if it can remain privacy-safe, abuse-resistant, and display-only.

Phase 38 should not implement public/social profile browsing, direct player match requests, private matchmaking expansion, public site stats, onboarding/help, progression HUD counters, Focus Mode, theme work, service workers, push subscriptions, deployment/release, gameplay-rule changes, or Elo changes.

## Goals

- Determine whether public/guest Live discovery and read-only spectation can be supported without exposing private or gameplay-authoritative data.
- Define a sanitized projection contract for public/guest spectators if Phase 38 proceeds beyond audit.
- Preserve authenticated participant and authenticated spectator behavior from Phases 28, 34, 35, and 37.
- Preserve current Daily Multiplayer answer-leakage protections, including current Daily exclusion from spectator discovery.
- Ensure public/guest spectators cannot mutate ratings, claims, timers, results, game state, queues, notifications, account state, or profile state.
- Decide whether spectator count/list presence belongs in Phase 38 v1 or should remain deferred.
- Produce implementation-ready staging without bypassing migration/RLS, privacy, E2E, visual review, manual checklist, or Git handoff gates.

## In Scope

- Read-only audit of current Live spectator data flow:
  - `MultiplayerLive`;
  - `MultiplayerWorkspace`;
  - `MultiplayerPanel`;
  - `multiplayerViewModels`;
  - `multiplayerRepository`;
  - `multiplayerPanelRouting`;
  - authenticated spectator E2E.
- Read-only audit of relevant Supabase/RLS foundations:
  - authenticated Live spectator projection migrations;
  - Phase 28 terminal-hold spectator RPC;
  - Phase 29 public profile RLS;
  - Phase 32 participant identity RPC;
  - Phase 35 ranked Live identity spectator profile repair.
- Planning a sanitized public/guest spectator projection if safe:
  - active Practice Multiplayer games only unless a later spec proves broader scope;
  - no current Daily Multiplayer exposure;
  - no raw game projection/session payloads;
  - no answer/seed leakage;
  - no participant-only identity data;
  - no rating internals or queue internals.
- Planning a read-only public/guest Live surface if safe:
  - signed-out and guest users can browse only sanitized eligible Live games;
  - public/guest spectators can inspect only approved visible board/progress data;
  - public/guest spectators cannot join, submit, forfeit, cancel, claim, queue, settle, notify, save account/profile data, or affect timers.
- Planning spectator count/list presence only if audit proves it can be display-only, bounded, privacy-safe, and abuse-resistant.
- Focused tests and E2E expectations for public/guest read-only boundaries, authenticated non-regression, Daily exclusion, profile privacy, and mutation denial.
- Final visual handoff review, manual review checklist, changelog, progress records, and Git handoff preparation after implementation stages are explicitly authorized and completed.

## Out Of Scope

- Source/runtime implementation during this planning brief.
- Test implementation during this planning brief.
- Supabase migration creation or execution during this planning brief.
- Vercel/Supabase configuration changes, deployment, production release, staging, committing, pushing, PR creation, merging, or branch deletion.
- Public/social profile browsing, public profile pages for other players, clickable rival profiles, richer profile cards, social graph features, request/mailbox flows, direct player match requests, and private matchmaking expansion.
- Custom-code private game expansion beyond existing behavior.
- Public site stats, private developer dashboard, onboarding/help/tutorial UX, progression HUD counters, Focus Mode, theme modernization, full themes, service workers, push subscriptions, background push, gameplay-rule changes, scoring changes, timeout/forfeit changes, Daily claim changes, and Elo algorithm changes.

## Recommended Phase 38 V1 Scope

Phase 38 v1 should include:

- protected baseline;
- public/spectator data, RLS, and privacy audit;
- migration/RLS addendum planning if required;
- additive migration/RLS execution only after explicit user authorization and only against the confirmed `brrrdle-dev` Supabase project;
- source integration for sanitized public/guest Live discovery and read-only spectation if the projection contract is approved and verified;
- spectator presence/count/list only if the audit and spec approve a narrow, privacy-safe slice;
- final hardening, E2E, visual review, changelog, manual review checklist, and Git handoff preparation.

If the audit finds that public/guest spectation cannot be made safe without a broader privacy or abuse-control design, Phase 38 should stop at the addendum/planning gate and route implementation to a later phase.

## Recommended Stage Breakdown

### Stage 38.0 - Protected Baseline

- Record the approved planning/spec/progress baseline.
- Preserve the user-edited Phase 37 manual checklist.
- Run the baseline gate before any public/spectator audit or implementation.

### Stage 38.1 - Public/Spectator Data, RLS, And Privacy Audit

- Audit current authenticated Live spectator data and UI seams.
- Audit current public-profile and participant-identity RLS/RPC boundaries.
- Audit what a signed-out or guest viewer can safely receive.
- Decide whether public/guest spectation requires a migration/RLS addendum. Expected: yes.
- Decide whether spectator count/list presence is safe for Phase 38 v1 or should be deferred.
- Do not implement source, tests, migrations, or configuration.

### Stage 38.2 - Public Spectator Migration/RLS Addendum Planning

- Create a precise addendum under `planning/specs/phase-38/`.
- Define the additive SQL/RLS contract for sanitized public/guest spectator projections.
- Define whether anon execution is acceptable, whether guest users use anon access only, and how row eligibility is bounded.
- Define returned fields, forbidden fields, grants, RLS behavior, abuse boundaries, rate/limit expectations, idempotency, rollback notes, and non-printing probe expectations.
- Stop before migration creation or execution.

### Stage 38.3 - Public Spectator Migration/RLS Execution

- Create exactly one additive migration only after explicit authorization.
- Apply only to the confirmed `brrrdle-dev` Supabase project when target and credentials are unambiguous.
- Run non-printing probes proving public/guest projection eligibility, field allowlisting, mutation denial, Daily exclusion, and no sensitive fields.
- Update Supabase docs only where needed.
- Stop before source/UI implementation if migration verification fails.

### Stage 38.4 - Public/Guest Live Discovery And Read-Only Spectation Source Integration

- Add source-only public/guest Live discovery and read-only spectation using the approved projection.
- Keep authenticated participant and authenticated spectator paths intact.
- Keep public/guest spectation unable to mutate game, account, profile, notification, queue, rating, timer, or claim state.
- Add focused tests for signed-out/guest discovery, read-only controls, forbidden actions, Daily exclusion, privacy field parsing, authenticated non-regression, and stale/terminal visibility.

### Stage 38.5 - Spectator Presence/Count/List Decision And Implementation If Safe

- Implement only if Stage 38.1 and the unified spec approve a narrow safe slice.
- Prefer display-only aggregate spectator counts over identity-bearing lists if lists create privacy or abuse risk.
- Do not create chat, reactions, direct messaging, public profile links, social graph features, or match requests.
- If not safe, document deferral to Phase 39 or later.

### Stage 38.6 - Final Hardening, E2E, Visual Review, Changelog, Manual Checklist

- Run focused regression and real browser/E2E coverage for public/guest spectator read-only behavior, authenticated spectator preservation, participant preservation, Daily exclusion, privacy field denial, and stale/terminal fallbacks.
- Run full final verification.
- Run local visual handoff review for changed user-visible public/spectator surfaces.
- Create `planning/phase-38/CHANGELOG.md`.
- Create `planning/phase-38/REVIEW-CHECKLIST.md`.
- Prepare for Git handoff only after evidence is clean and the user authorizes the next gate.

## Success Criteria

- Phase 38 public/guest spectator scope is explicitly audited and locked before implementation.
- Any required SQL/RLS work is described in an addendum before migration creation/execution.
- Public/guest Live discovery returns only sanitized eligible rows and no sensitive fields.
- Public/guest spectation is read-only and cannot mutate ratings, claims, timers, results, game state, queues, notifications, accounts, profiles, or local persistence authority.
- Current Daily Multiplayer games remain excluded from public/guest spectator discovery unless a later approved spec proves a safe no-answer-leak path.
- Authenticated participant resume and authenticated spectator behavior remain intact.
- Public profile privacy remains default-private; only active public allow-listed profile summaries may appear.
- No raw auth IDs, emails, private profile fields, answers, seeds, serialized sessions, player sessions, queue internals, rating internals, tokens, screenshots, videos, traces, auth state, or local session artifacts are exposed.
- Spectator count/list presence, if included, is display-only, bounded, privacy-safe, and abuse-resistant.
- Phase 37 browser history and gameplay auto-centering behavior remain intact.
- Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior remain intact.
- Phase 35 Profile/auth and Live identity behavior remains intact.
- Phase 34 Live/Lobby/notification behavior remains intact.
- Phase 33 timed ranked Practice behavior and public leaderboard boundaries remain intact.
- No gameplay rules, scoring, timeout/forfeit behavior, Daily claim rules, Elo math, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, or Practice 2-35 word-length behavior change.

## Likely Files And Modules

- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/account/publicProfile.ts`
- `src/account/profile.ts`
- Live spectator, public profile, repository, view-model, and E2E tests.
- Supabase migrations for authenticated spectator projections, public profiles, participant identity, ranked Live identity spectator profiles, and any Phase 38 additive migration if later authorized.
- `docs/supabase.md`
- `docs/ranked-multiplayer.md` only if ranked spectator boundaries need documentation clarification.

## Migration/RLS Constraints And Addendum Gates

Current authenticated spectator RPCs are not public/guest RPCs. Phase 38 should assume an addendum is required before implementation unless Stage 38.1 proves a source-only path that does not broaden database exposure.

Any Phase 38 SQL/RLS contract must:

- be additive;
- avoid direct browser access to raw `async_multiplayer_games`;
- preserve existing authenticated spectator RPCs and participant identity RPC boundaries;
- avoid granting mutation capability to anon/public/guest viewers;
- preserve current Daily exclusion unless explicitly and safely revised;
- return only allow-listed public/spectator fields;
- bound row count and terminal visibility windows;
- define grants for `anon` and/or `authenticated` separately;
- define non-printing probes for allowlisted fields, forbidden fields, read-only capabilities, and mutation denial;
- include rollback notes and abuse boundaries.

Stop before migration creation/execution if the addendum is missing, contradictory, or too broad.

## Public/Guest Privacy Constraints

Public/guest spectator payloads must not expose:

- raw auth IDs;
- emails;
- private profile fields;
- auth metadata;
- private progress, settings, history, or account state;
- answers;
- seeds;
- serialized sessions or player sessions;
- raw game projections;
- queue internals;
- rating internals;
- rating transactions;
- settlement ids;
- service ids;
- tokens;
- screenshots, videos, traces, auth state, or local session artifacts.

Public/guest payloads may include only explicitly approved sanitized display fields such as mode, scope, word length, non-current-Daily-safe eligibility metadata, turn/progress labels, safe tile states for already-submitted visible moves, public display names from active public profiles, public avatar/accent fields if already allowed, and read-only capability flags.

## Supabase Auth/Account/Public-Profile Constraints

- Public profile privacy remains default-private.
- Public profile reads remain allow-listed and moderated.
- Private account profile data must not become public spectator data.
- Existing account/profile management from Phase 35 remains unchanged.
- Existing email-change configuration gate remains unchanged.
- Public/guest spectation must not require sign-in, but it also must not rely on privileged browser secrets.
- Any anon-access RPC must be `security definer` only when the addendum proves a safe allow-listed projection and explicit grants.

## Vercel/Deployment Constraints

Phase 38 should not configure Vercel or deploy.

If public/guest spectation eventually needs preview testing, it should still remain local/dev or explicitly gated preview verification. Production deployment and release remain out of scope.

Phase 35 Vercel Deployment Protection and Supabase redirect observations remain documentation/configuration context only unless a future prompt explicitly authorizes configuration work.

## Verification Strategy

Planning/spec/addendum passes should run lightweight documentation checks only:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Implementation stages should run focused tests first, then:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port/process cleanup checks when browser/E2E work runs
- `git status --short --branch`

Final hardening should also run `npm run test:e2e` and `npm run test:full` unless a later prompt narrows the gate with an explicit non-secret reason.

Phase 38 public/spectator claims should include real browser/E2E coverage when feasible, including signed-out or guest view behavior, authenticated participant non-regression, authenticated spectator non-regression, and remote non-printing probes for any migration/RLS work.

## Visual Handoff Review Expectations

Final Phase 38 visual artifacts should remain ignored/local-only under:

`test-results/visual-review/phase-38-stage-38-6/`

Suggested scenarios:

- signed-out/guest Live discovery empty or visible state, depending on the approved implementation;
- public/guest read-only spectator detail surface;
- authenticated participant Live resume remains intact;
- authenticated spectator Live view remains intact;
- public/guest stale or terminal fallback;
- narrow/mobile public/guest spectator view if implemented.

Screenshots, videos, traces, auth state, tokens, and local artifacts must remain ignored/local-only and unstaged.

## Manual Review Checklist Expectations

The Phase 38 manual checklist should use the local `brrrdle-phase-review-checklist` skill when appropriate and ask the user to verify:

- public/guest spectator discovery appears only for approved eligible games;
- public/guest spectator view is read-only;
- public/guest spectators cannot submit guesses, join games, forfeit, cancel, claim Daily, queue, settle ratings, change timers, or affect notifications/accounts/profiles;
- current Daily Multiplayer games are not exposed;
- safe public participant names appear only when active public profiles allow them;
- private account/profile data is not visible;
- authenticated participant resume still works;
- authenticated spectator Live behavior still works;
- spectator counts/lists, if implemented, are display-only and privacy-safe;
- Phase 37 browser history and auto-centering remain intact;
- Phase 36/35/34/33 protected behavior remains intact.

## GitHub Backup Workflow Expectations

Phase 38 Git handoff remains a later gate. After clean Git handoff preparation, the next backup prompt should invoke the local `brrrdle-github-backup` skill for the all-in-one governed backup workflow unless the user explicitly asks for stepwise Git gates or forbids merge/cleanup.

## Risks

- Public/guest spectation can accidentally become answer leakage if current Daily games or hidden answer-bearing projections are exposed.
- Anon/public RPCs can overexpose data if they reuse authenticated spectator shapes without a fresh allowlist.
- Public spectator presence lists can become social/profile exposure before Phase 39 privacy and anti-abuse planning.
- Spectator counts can become misleading or abusable without bounded presence semantics.
- Public/guest routes can accidentally bypass authenticated participant or authenticated spectator routing if shared state is overgeneralized.
- Read-only UI can still mutate state if handlers are reused without capability checks.
- Real E2E may need Supabase credentials; missing credentials should stop with a non-secret limitation rather than weakening claims.

## Open Decisions

- Should Phase 38 v1 expose any public/guest spectation, or should it stop at migration/RLS readiness if privacy risk remains too high?
- Should v1 support signed-out anon users, local guest users, or both, and should their UI differ?
- Should public/guest Live discovery include only Practice Multiplayer games, only in-progress games, or a short terminal-hold window too?
- Should spectator presence start as aggregate counts only, or should identity-bearing lists be deferred to Phase 39 public profile/social work?
- Should current Daily Multiplayer remain fully excluded from public/guest spectation, or is there a future safe delayed/archive-only design worth routing to later planning?
- What row limits, polling cadence, and terminal visibility windows are safe for public/guest spectators?

## Routing And Deferrals

- Public/guest spectation: Phase 38 audit/addendum first; implementation only if sanitized projections and read-only guarantees are approved.
- Spectator presence/count/list: Phase 38 optional gated slice; prefer aggregate counts or defer if identity/privacy risk is unclear.
- Public/social profile browsing, clickable rival profiles, direct player match requests, and private matchmaking expansion: Phase 39.
- Public site stats, private developer dashboard, onboarding/help/tutorial UX: Phase 40.
- EXP/coin/collectible header counters and Focus Mode: Phase 41 or later.
- Theme work: Phase 42+.
- Service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes: later gated phases only.

## Next Gated Prompt

The next safe step is to create the unified Phase 38 specification for review only. That specification should turn this planning brief into an implementation-oriented spec, decide whether a migration/RLS addendum is expected before source work, preserve the user-edited Phase 37 manual checklist, create the next progress report, run lightweight documentation verification, and halt before implementation.
