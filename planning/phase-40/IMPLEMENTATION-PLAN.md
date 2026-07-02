# Phase 40 Implementation Plan: Public Profiles And Private Matchmaking

**Status**: Draft implementation plan for review.
**Phase**: Phase 40.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-01.

## Status And Authority

This implementation plan turns `planning/phase-40/PLANNING-BRIEF.md` and `planning/specs/phase-40/PHASE-40-PUBLIC-PROFILES-AND-PRIVATE-MATCHMAKING-SPEC-2026-07-01.md` into a staged execution plan. It follows the current user authorization, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`, `BRRRDLE-SPEC.md`, completed Phase 39 evidence, roadmap routing, testing workflow guidance, and the progress ledger.

This plan is review-only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

## Current Baseline

- Phase 39 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- The checked-off user-edited Phase 39 manual review checklist at `planning/phase-39/REVIEW-CHECKLIST.md` must be preserved.
- Phase scope sizing guidance exists at `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
- Phase 40 planning artifacts exist:
  - `planning/phase-40/PLANNING-BRIEF.md`
  - `planning/specs/phase-40/PHASE-40-PUBLIC-PROFILES-AND-PRIVATE-MATCHMAKING-SPEC-2026-07-01.md`
- Progress through the Phase 40 specification is recorded in `progress/PROGRESS-STEP-333.md`.

## Phase Objective

Phase 40 should make player identity and private play more useful without weakening privacy, public-profile moderation, trusted ranked matchmaking, Daily claim safety, public spectator read-only boundaries, or gameplay/Elo invariants.

The phase is intentionally a cohesive macro-phase because public profile links, safe identity display, custom/private invitations, direct unranked requests, notifications, routing, and Supabase/RLS boundaries overlap heavily. Individual implementation stages must still remain narrow, independently reviewable, and stopped at authority-changing gates.

## Non-Negotiable Invariants

- Preserve public profile default-private behavior and active/moderated-only public exposure.
- Expose only approved public profile fields: public profile id, display name, accent color, flair key, avatar URL, bio, and approved timestamps where already returned by the relevant RPC.
- Do not expose raw auth IDs, emails, auth metadata, private profile fields, private account metadata, progress, settings, history, answers, seeds, serialized sessions, player sessions, queue internals, rating internals, rating transactions, service IDs, tokens, screenshots, videos, traces, auth state, local artifacts, or local session artifacts.
- Keep private/hidden/suspended/missing/stale public profiles indistinguishable from safe unavailable fallbacks.
- Keep direct requests unranked/custom by default.
- Do not implement ranked private invitations, ranked direct challenges, Daily match requests, or Daily custom invitations unless a later competitive-integrity spec approves them.
- Preserve ranked Practice queue/finalization/settlement authority and public leaderboard display-only authority.
- Preserve Phase 39 mobile scroll smoothness and the mobile scroll/layout harness.
- Preserve Phase 38 public/guest Practice Live discovery, read-only public/guest spectation, Daily spectator exclusion, and false-only mutation capability boundaries.
- Preserve Phase 37 browser history, stale selected-game fallbacks, gameplay auto-centering, and solo invalid-guess sound behavior.
- Preserve Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior.
- Preserve Phase 35 Profile/auth behavior, ranked Live identity repair, authenticated spectator safe-name support, auth redirect hardening, password-change access, and email-change configuration-gate documentation.
- Preserve Phase 34 Live/Lobby/notification behavior and Active Games turn cues.
- Preserve Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections.
- Preserve Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, and five-letter invariants.
- Preserve gameplay rules, word validation, Hard Mode validation, scoring, timeout/forfeit behavior, GO transition behavior, keyboard color precedence, and Elo/rating math.
- Keep public site stats, private developer dashboard, onboarding/help/tutorial UX, progression HUD, Focus Mode, compact navigation, broad mobile UX shell overhaul, theme work, service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes deferred.

## Stage 40.0 - Protected Baseline

**Purpose**: Confirm the Phase 40 implementation plan is approved and capture a clean protected baseline before audit or source/test work.

### Scope

- Read required governance, Phase 40 planning/spec/implementation materials, completed Phase 39 evidence, current progress records, testing workflow docs, `agents.md`, `memory.md`, and `package.json`.
- Confirm repository state:
  - `pwd`
  - current branch
  - `git status --short --branch`
  - remotes
  - `HEAD`
  - `origin/main`
- Confirm the original stable `brrrdle` repository is not being used.
- Preserve the checked-off user-edited `planning/phase-39/REVIEW-CHECKLIST.md`.
- Record current uncommitted Phase 40 planning/spec/progress artifacts and Phase 39 checklist state.
- Create the Stage 40.0 progress report and matching 12-column CSV row, likely progress ID `335`.
- Run watched-port/process/resource checks before and after verification for `5173`, `5174`, `3000`, and `4173`.

### Verification

Run sequentially:

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

### Stop Conditions

Stop and record the exact non-secret failure if the repo is not `brrrdle-dev`, local or remote `main` is unexpected, verification fails, a forbidden artifact or real credential-like secret is found, ports remain occupied by Stage-owned processes, or the stable `brrrdle` repository would be touched.

### Output

If the baseline passes, produce a copy-safe prompt for Stage 40.1 audit only.

## Stage 40.1 - Public Profile, Private Matchmaking, RLS, Privacy, And Routing Audit

**Purpose**: Lock Phase 40 implementation scope before any source/test or SQL work.

### Scope

- Audit current public profile RPCs, parser allowlists, owner/public profile UI, public profile privacy states, public avatar rules, and moderation states.
- Audit public ranked leaderboard identity rows and whether they already carry a safe `publicProfileId` route/link seam.
- Audit authenticated participant identity summaries and confirm they remain participant-scoped.
- Audit authenticated and public/guest Live spectator profile summaries to avoid broadening spectator contracts.
- Audit current Practice rematch lifecycle, same-settings continuation, ranked search-again, and custom lobby helpers.
- Audit notification action targets, browser history routing, selected-game fallbacks, and dashboard actions for private-request routing feasibility.
- Audit Supabase/RLS migrations for public profiles, participant identity, public ranked leaderboards, rematches, ranked queues, custom lobbies, public spectator boundaries, and Daily claim safety.
- Audit relevant unit/component/E2E coverage and identify missing tests for public profile pages, clickable identity, private request lifecycle, and two-client private matchmaking flows.
- Decide whether Stage 40.2 must create a migration/RLS addendum or whether a smaller source-only path is safe.
- Decide whether Phase 40 v1 should include direct player-to-player requests, custom-code/private invitation cleanup only, or both.

### Likely Read-Only Surfaces

- `src/account/publicProfile.ts`
- `src/account/profile.ts`
- `src/account/ProfilePanel.tsx`
- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/leaderboards/publicRankedLeaderboard.ts`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/customGames.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`
- relevant public profile, leaderboard, participant identity, custom lobby, rematch, notification, route/history, Supabase/RLS, and E2E tests
- relevant Supabase migrations for public profiles, participant identity, ranked Live identity spectator profiles, public spectator boundaries, rematches, queues, and custom lobbies

### Verification

Run focused read-only checks as needed, then:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

### Stop Conditions

Stop if the audit finds that Phase 40 would require public social graph work, spectator presence/count/list work, ranked/Daily invitations, gameplay/Elo changes, deployment/configuration, or broad unplanned database exposure.

### Output

Recommend the exact Stage 40.2 path: migration/RLS addendum planning, or an explicit source-only decision with evidence.

## Stage 40.2 - Migration/RLS Addendum Planning Or Explicit Source-Only Decision

**Purpose**: Define any new database contract before SQL work, or record a source-only route if the audit proves one is safe.

### Scope

If Stage 40.1 finds new database work is needed, create a precise addendum under `planning/specs/phase-40/` for the required contract. Potential contracts include:

- public profile route lookup or batch lookup if existing `get_public_player_profile` / `get_public_player_profiles` cannot support the approved route/link surfaces;
- private/custom invitation lookup or request lifecycle;
- direct unranked/custom match request create/list/accept/decline/cancel/expire behavior;
- request-backed notification payload boundaries;
- custom-code private-game join/visibility hardening.

If Stage 40.1 proves a source-only path is safe, create a progress report documenting that decision and route Stage 40.3 as unnecessary unless a later prompt changes scope.

### Required Addendum Content

- Status and authority.
- Current baseline and Stage 40.1 findings.
- Exact SQL/RLS contract and purpose.
- Whether one or more migrations are expected; prefer exactly one additive migration per execution stage.
- RPC/table/function names where known.
- `anon`, `authenticated`, and `public` grant expectations.
- Participant-scoped read/write rules.
- Public profile safe-field allowlist and forbidden fields.
- Direct request eligibility, expiry, cancellation, decline, acceptance, idempotency, and stale handling.
- Custom/private lobby visibility rules.
- Daily and ranked exclusion rules.
- Non-printing probe expectations for allowlisted fields, forbidden-field denial, private/hidden/suspended profile denial, nonparticipant denial, grant behavior, stale/expired behavior, mutation denial, Daily/ranked exclusion, and rollback/idempotency.
- Stop conditions.

### Verification

Run lightweight documentation verification:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

### Stop Conditions

Stop if the database contract cannot be described as additive, privacy-safe, participant-scoped where mutable, or probeable without printing secrets/private data.

### Output

If an addendum is created and reviewed, produce a copy-safe prompt for Stage 40.3 migration/RLS execution. If source-only, produce a copy-safe prompt for Stage 40.4 public profile route/clickable identity source integration.

## Stage 40.3 - Migration/RLS Execution

**Purpose**: Execute only the separately reviewed Stage 40.2 database contract, if one exists and the user explicitly authorizes execution.

### Scope

- Confirm the intended `brrrdle-dev` Supabase target without printing secrets.
- Create exactly the authorized additive migration under `supabase/migrations/`.
- Preserve existing public profile, participant identity, public leaderboard, public spectator, rematch, ranked queue, and Daily claim boundaries unless the addendum explicitly changes an allowlisted contract.
- Grant only the approved RPC/table/function access.
- Do not grant direct browser access to private profile, auth, rating transaction, raw game/session, queue-internal, answer/seed, token-bearing, or local artifact data.
- Run the Stage 40.2 non-printing probes.
- Update `docs/supabase.md` and `docs/ranked-multiplayer.md` only where needed, without claiming source/UI integration is complete.

### Verification

Run addendum-required probes first, then:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `npx --yes supabase db push --linked --dry-run`
- `git status --short --branch`

### Stop Conditions

Stop before remote execution if the Supabase target or credentials are ambiguous, a probe would require printing secrets/private data, the migration broadens unauthorized exposure, or the addendum no longer matches the required behavior.

### Output

If migration verification succeeds, produce a copy-safe prompt for Stage 40.4 public profile route/clickable identity source integration.

## Stage 40.4 - Public Profile Route And Clickable Identity Source Integration

**Purpose**: Implement the approved safe public profile route/card/link behavior after audit and any required database readiness.

### Scope

- Add public profile route/card/page behavior only from approved safe public fields.
- Add clickable player names/avatars only on approved surfaces where a safe `publicProfileId` or safe public profile row is already available.
- Preserve fallback behavior for private, hidden, suspended, missing, stale, or unavailable profiles.
- Keep public profile pages/cards display-only.
- Avoid implying a private account/profile exists behind unavailable fallback states.
- Preserve public spectator, leaderboard, participant identity, and profile editor boundaries.
- Add focused tests for:
  - public profile parser/repository behavior;
  - public profile route parsing and invalid-id fallback;
  - card/page safe-field display;
  - private/hidden/suspended/missing/stale fallback copy;
  - clickable identity link presence/absence;
  - forbidden raw identity fields;
  - leaderboard/multiplayer/public spectator non-regression where touched.

### Likely Files

- `src/account/publicProfile.ts`
- `src/account/ProfilePanel.tsx` or new public profile display component(s)
- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/leaderboards/publicRankedLeaderboard.ts`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- relevant tests and E2E/browser checks

### Verification

Run focused tests first, then:

- `npm run lint`
- `npm run test`
- focused relevant Playwright/E2E if route/link behavior is browser-visible
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

### Stop Conditions

Stop if clickable identity requires exposing raw user ids, broadening participant identity/public spectator contracts, adding public social graph behavior, or changing private profile visibility assumptions.

### Output

If verification succeeds, produce a copy-safe prompt for Stage 40.5 private matchmaking source integration.

## Stage 40.5 - Private Matchmaking Source Integration

**Purpose**: Implement only the approved private/custom-code invitation or direct unranked/custom request behavior.

### Scope

- Implement the Stage 40.1/40.2-approved private matchmaking v1 shape.
- Keep requests authenticated and participant-scoped.
- Keep direct requests unranked/custom Practice only.
- Keep ranked and Daily requests unavailable.
- Keep custom/private games out of inappropriate public surfaces.
- Implement lifecycle behavior only where approved:
  - create;
  - list;
  - accept;
  - decline;
  - cancel;
  - expire;
  - route to created game.
- Add notification and attention cues only if participant-scoped and in-app only.
- Ensure browser history and notification activation never accept, decline, cancel, create, submit, forfeit, mutate ratings, mutate Daily claims, or alter profile/account state without explicit user action.
- Add focused tests for:
  - request parser/repository allowlists;
  - request lifecycle and idempotency;
  - private/custom lobby visibility and join behavior;
  - notification/view-model/action behavior;
  - route/history/stale fallback behavior;
  - ranked/Daily exclusion;
  - nonparticipant denial;
  - real two-client E2E for accepted request/custom/private flows when cross-account behavior is implemented.

### Likely Files

- `src/multiplayer/customGames.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationViewModels.ts`
- relevant E2E fixtures and specs

### Verification

Run focused tests first, including real two-client E2E where behavior crosses accounts/browsers, then:

- `npm run lint`
- `npm run test`
- focused relevant Playwright/E2E
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

### Stop Conditions

Stop if implementation would require ranked/Daily direct requests, public social graph behavior, public request browsing, service workers/push, gameplay/Elo changes, or new database authority not covered by the reviewed addendum/source-only decision.

### Output

If verification succeeds, produce a copy-safe prompt for Stage 40.6 final hardening, E2E, visual review, changelog, and manual checklist.

## Stage 40.6 - Final Hardening, E2E, Visual Review, Changelog, And Manual Checklist

**Purpose**: Complete Phase 40 with broad verification, privacy review, visual review, documentation, and manual review artifacts.

### Scope

- Review Stages 40.1 through 40.5 for regressions, stale copy, docs gaps, privacy leaks, visual issues, route gaps, and final cleanup needs.
- Add only narrow final-hardening fixes if required.
- Run focused regression/browser coverage for:
  - public profile safe-field display;
  - private/hidden/suspended/missing/stale profile fallback behavior;
  - clickable identity link behavior;
  - private/custom request lifecycle if implemented;
  - ranked/Daily request exclusion;
  - request notification/routing behavior if implemented;
  - public/guest spectator non-regression;
  - authenticated participant and authenticated spectator non-regression;
  - public ranked leaderboard display-only boundaries;
  - browser history/gameplay auto-centering preservation;
  - Phase 39 mobile scroll harness preservation.
- Run the local visual handoff review gate for Phase 40 user-visible surfaces, saving artifacts only under ignored `test-results/visual-review/phase-40-stage-40-6/`.
- Create `planning/phase-40/CHANGELOG.md`.
- Create `planning/phase-40/REVIEW-CHECKLIST.md` using the local `brrrdle-phase-review-checklist` skill and Phase 37-style checklist structure.

### Final Verification

Run:

- focused tests
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
- watched-port/process cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

### Stop Conditions

Stop if final verification fails, visual review reveals unresolved critical overlap/usability regressions, forbidden artifacts appear, private data leaks are found, request/profile behavior cannot be proven participant-safe/public-safe, or Phase 40 changes cannot be clearly bounded to public profiles and private matchmaking.

### Output

Report whether Phase 40 appears complete and provide a copy-safe prompt for Phase 40 Git handoff preparation only if verification succeeds.

## Migration/RLS Gates

Phase 40 is addendum-gated, not migration-authorized by default.

- Stage 40.1 decides whether a migration/RLS addendum is required.
- Stage 40.2 creates the addendum or records a source-only decision.
- Stage 40.3 executes only after explicit user authorization and only against the confirmed `brrrdle-dev` Supabase target.
- Any migration stage should create exactly the authorized additive migration, preserve existing privacy boundaries, run non-printing probes, update docs only as needed, and stop on ambiguity.

## Privacy, Supabase, Public Profile, And Anti-Abuse Constraints

- Prefer dedicated RPCs and projections over direct table grants.
- Keep public profile payloads allow-listed.
- Keep private request payloads participant-scoped.
- Do not broaden public spectator, authenticated spectator, participant identity, public leaderboard, or ranked queue contracts without explicit addendum approval.
- Direct requests should include bounded eligibility, expiry, cancellation, decline, acceptance, idempotency, and stale handling.
- Public profile visibility must not imply invitation consent unless a later approved design makes that explicit.
- Request lists must not become public profile browsing, spectator presence, or social graph authority.

## Notification And Routing Constraints

- Private request notifications, if implemented, should be in-app only for v1.
- Notification content must be visible only to request participants.
- Action targets may route users to safe views, but must not mutate request/game/profile/account state without explicit user actions.
- Browser Back/Forward must never replay request acceptance, request cancellation, game creation, guesses, forfeits, ranked settlement, or Daily claims.

## Vercel And Deployment Constraints

Phase 40 does not authorize Vercel configuration changes, Supabase configuration changes, preview deployment, production deployment, release, environment-variable changes, or staging. Any future deployment/configuration work must be separately planned and explicitly authorized.

## Gameplay And Elo Constraints

Phase 40 must not change gameplay rules, Daily rules, word validation, Hard Mode validation, tile coloring, keyboard color precedence, GO transition rules, solved-row hold behavior, scoring, timeout/forfeit logic, ranked queue behavior, public leaderboard authority, or Elo/rating math.

## Documentation Expectations

- Each stage must create a progress report and matching 12-column CSV row.
- Stage reports should record exact non-secret verification outcomes.
- Stage 40.2 should create a migration/RLS addendum under `planning/specs/phase-40/` if needed.
- Stage 40.3 should update `docs/supabase.md` and `docs/ranked-multiplayer.md` only where needed.
- Final hardening should create:
  - `planning/phase-40/CHANGELOG.md`
  - `planning/phase-40/REVIEW-CHECKLIST.md`
- Visual handoff artifacts must remain ignored/local-only.

## Risks

- Public profile routes could accidentally imply or reveal private profile existence.
- Clickable identity links could accidentally expose raw user ids, unsafe route params, or stale private data.
- Direct requests could become spammy or coercive without limits, expiry, decline, cancellation, and idempotency.
- Private/custom games could appear in public surfaces if route/list filtering is wrong.
- Notification routing could mutate request or game state through navigation instead of explicit action.
- New profile cards or request lists could regress Phase 39 mobile scroll smoothness.
- Existing custom-code or rematch seams may not be sufficient for direct requests and may require a separately reviewed database contract.

## Open Decisions

- Can Stage 40.4 public profile route/card work use existing `get_public_player_profile` and `get_public_player_profiles` source-only?
- Should public profile pages be route-addressable by opaque `public_profile_id`, or only opened from already-known safe contexts?
- Which surfaces receive clickable identity in v1?
- Does private matchmaking v1 include direct player requests, custom-code/private invitation cleanup, or both?
- Are direct requests limited to active public profiles, or can they originate from prior participant-scoped contexts where an opponent has a safe identity summary?
- What anti-abuse limits are required before direct requests are safe?
- Should request notifications be in-app only for v1? The plan recommends yes.
- Which real two-client E2E scenarios are mandatory before final handoff?

## Next Gated Prompt

After this implementation plan is reviewed, the next safe action is Phase 40 Stage 40.0 protected baseline only. Stage 40.0 should not audit, implement, or test new behavior; it should confirm state, preserve current planning artifacts, create progress ID `335`, run the protected baseline verification gate, and halt before Stage 40.1.
