# Phase 38 Specification: Public/Spectator Readiness

**Status**: Draft unified specification for review.
**Phase**: Phase 38.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-30.

## Status And Authority

This specification turns the Phase 38 planning brief into an implementation-oriented review artifact. It follows the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, completed Phase 37 evidence, `planning/phase-38/PLANNING-BRIEF.md`, Supabase/public-profile documentation, ranked multiplayer documentation, and the progress ledger.

This specification does not authorize implementation. Source/runtime changes, test changes, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo changes, the brrrdle GitHub backup workflow, force-push, secret printing, private data exposure, local session artifact exposure, and original stable `brrrdle` repository work remain gated.

## Current Baseline

- Phase 37 is complete, backed up to GitHub, merged, branch-cleaned, and manually reviewed.
- Expected local and remote `main`: `cdd780989535a3081a5e034bde1a247569ca28af`.
- Phase 37 completed solo OG/GO invalid-guess sound consistency, gameplay-area auto-centering, browser back/forward view-state integration, stale selected-game fallbacks, E2E helper hardening, visual handoff review, and manual checklist review.
- Phase 38 planning brief exists at `planning/phase-38/PLANNING-BRIEF.md`.
- User-edited `planning/phase-37/REVIEW-CHECKLIST.md` must be preserved.
- Current Live spectator source behavior is authenticated-only. Signed-out viewers see an auth-required Live message, and `selectLiveMultiplayerRows` returns no Live rows without a viewer user id.
- Current authenticated spectator data comes through `get_authenticated_live_v1_spectator_games_v2`, normalized by the repository, filtered for current Daily rows, and rendered read-only.
- Public profile foundations are default-private and allow-list based. Phase 35 ranked Live identity repair uses active public profile summaries server-side for authenticated spectator names without exposing raw auth ids, emails, private profile fields, answers, seeds, sessions, or rating internals.

## Goals

- Define the safest Phase 38 path for public/guest Live discovery and read-only spectation.
- Start with a public/guest spectator audit before implementation.
- Require a migration/RLS addendum before public/guest spectator SQL work unless the audit proves a source-only path is safe.
- Keep public/guest spectator payloads sanitized, allow-listed, bounded, and read-only.
- Preserve authenticated participant resume and authenticated read-only spectator behavior.
- Preserve current Daily Multiplayer exclusion unless a later approved design proves no answer leakage.
- Decide whether spectator presence, counts, or lists are safe for Phase 38 v1.
- Keep broader social/profile, matchmaking, dashboard, onboarding, progression HUD, Focus Mode, theme, service worker, push, deployment/release, gameplay-rule, and Elo work routed to later gated phases.

## In Scope

- Public/guest spectation audit and scope lock.
- RLS/RPC/privacy audit of current authenticated spectator, public profile, participant identity, ranked Live identity, and public leaderboard patterns.
- Addendum planning for a public/guest spectator projection if needed.
- Additive migration/RLS execution only in a later explicitly authorized stage.
- Source integration for sanitized public/guest Live discovery only after an approved projection exists.
- Source integration for read-only public/guest spectator details only after safe projection and capability boundaries are proven.
- Signed-out and local guest behavior for approved public/guest spectator surfaces.
- Current Practice Multiplayer public/guest spectator eligibility, with current Daily Multiplayer excluded.
- Optional spectator presence/count/list planning and implementation only if privacy-safe and abuse-resistant.
- Focused tests, E2E coverage, visual handoff review, manual review checklist, changelog, progress records, and later Git handoff gates when separately authorized.

## Out Of Scope

- Any implementation during this specification pass.
- Public/social profile browsing.
- Clickable rival profiles.
- Public profile pages for other players.
- Direct player match requests.
- Private matchmaking or custom-code expansion.
- Public site stats or private developer dashboard.
- Beginner onboarding/help/tutorial implementation.
- EXP, coin, collectible, or progression HUD counters.
- Focus Mode or collapsible primary navigation.
- Theme modernization or full theme work.
- Service workers, push subscriptions, background push, deployment, release, gameplay-rule changes, scoring changes, timeout/forfeit changes, Daily claim changes, and Elo algorithm changes.

## Phase 38 V1 Scope Decision

Phase 38 v1 should be a public/spectator readiness and implementation phase only if the early gates prove the data boundary is safe.

The intended v1 public/guest spectator surface is:

- Practice Multiplayer only.
- Public/guest Live discovery from a dedicated sanitized projection.
- Read-only public/guest spectator detail view.
- No current Daily Multiplayer discovery.
- No join, submit, forfeit, cancel, queue, claim, settle, notify, account/profile, timer, or persistence mutation capability.
- No identity-bearing spectator list unless a later Stage 38 gate proves it is privacy-safe and abuse-resistant.

The implementation plan should assume a migration/RLS addendum is required before public/guest spectator implementation because the current spectator RPC is authenticated-only and not designed for anon/public use.

## Public/Guest Spectator Contract

Public/guest spectator behavior must satisfy all of these constraints:

- Public/guest viewers may discover only eligible sanitized Live rows.
- Public/guest viewers may open only read-only spectator details for eligible games.
- Public/guest viewers must not become participants.
- Public/guest viewers must not create, join, cancel, forfeit, submit guesses, start timers, change timers, claim Daily participation, create queue requests, settle ratings, change game results, change notifications, change account state, change profile state, or write spectator state that changes gameplay authority.
- Public/guest views must tolerate stale, deleted, hidden, completed, expired, or unavailable games by falling back to the safe Live list or empty state.
- Public/guest views must not require sign-in and must not rely on privileged browser secrets.
- Public/guest views must not weaken authenticated participant or authenticated spectator routing.

## Sanitized Projection Contract

The Phase 38 public/guest projection must be additive and allow-listed. It must avoid direct browser access to raw `async_multiplayer_games` rows.

Allowed public/guest fields should be intentionally minimal, for example:

- opaque game id needed to open the read-only spectator detail;
- scope and mode labels for approved Practice games;
- word length and safe Hard Mode/ranked/unranked display metadata when already public-safe;
- status and updated/terminal timestamps inside approved visibility windows;
- safe turn/progress labels;
- safe public participant display summaries from active public profiles, falling back to generic seat labels;
- visible submitted tile states needed for read-only board display, only if they cannot reveal answers beyond already-submitted visible play;
- read-only capability flags that explicitly deny mutation.

Forbidden public/guest fields include:

- raw auth ids;
- emails;
- private profile fields;
- auth metadata;
- private progress, settings, history, or account state;
- answers;
- seeds;
- serialized sessions;
- player sessions;
- raw game projections;
- queue internals;
- rating internals;
- rating transactions;
- settlement ids;
- service ids;
- tokens;
- screenshots, videos, traces, auth state, or local session artifacts.

Phase 38 v1 should not expose public profile ids in spectator payloads unless a Stage 38 addendum proves they are necessary and consistent with Phase 39 social/profile routing. Public/guest spectator identity should be display-only.

## Current Daily Multiplayer Exclusion

Current Daily Multiplayer remains excluded from public/guest spectation in Phase 38 v1.

Reasons:

- Daily answers are globally meaningful and time-bound.
- Spectator rows can easily become answer leakage if current Daily rows are exposed.
- Existing authenticated spectator normalization already filters current Daily rows as defense in depth.
- Daily claim safety and answer separation must remain protected.

Any future Daily public spectation, delayed archive, or post-day replay design belongs in a later gated phase with explicit answer-leakage analysis.

## Spectator Presence, Counts, And Lists

Spectator presence is optional and must be gated.

Preferred Phase 38 v1 decision:

- aggregate display-only counts may be considered if they can be bounded, non-authoritative, non-identifying, and abuse-resistant;
- identity-bearing spectator lists should be deferred unless the audit proves they do not become social/profile browsing ahead of Phase 39.

Spectator presence must not include chat, reactions, direct messages, profile links, social graph features, direct match requests, notification targeting, or account/profile mutation.

## Supabase And RLS Constraints

Stage 38.1 must audit whether a new SQL/RLS contract is needed. Expected answer: yes.

Any Phase 38 migration/RLS addendum must define:

- function name and signature;
- whether `anon`, `authenticated`, or both may execute;
- row eligibility rules;
- Practice-only filtering;
- current Daily exclusion;
- terminal visibility window;
- row limits and input bounds;
- exact returned fields;
- exact forbidden fields;
- grant/revoke behavior;
- RLS behavior;
- idempotency;
- rollback notes;
- non-printing probe plan;
- abuse boundaries;
- read-only capability boundaries.

Any later migration must be additive, preserve existing authenticated spectator and participant identity RPCs, and avoid direct browser table grants for raw game/rating/profile authority.

## Public Profile Constraints

- Public profiles remain default-private.
- Only active public profiles may contribute safe display names, avatar URLs, accent colors, or derived initials where already permitted.
- Missing, private, hidden, suspended, or malformed public profiles must fall back to generic display labels.
- Private account profile data must not be used for public/guest spectator display.
- Existing public profile RPCs remain the public profile authority. Phase 38 must not create profile browsing or clickable rival profiles.

## Vercel And Deployment Constraints

Phase 38 does not configure Vercel or Supabase and does not deploy.

If later public/guest spectation needs preview verification, that remains a separate explicitly authorized preview/deployment gate. Production deployment and release stay out of scope.

## Success Criteria

- Public/guest spectator scope is audited and locked before implementation.
- Any required SQL/RLS work is specified in an addendum before migration creation or execution.
- Public/guest Live discovery uses only a sanitized projection.
- Public/guest spectator detail views are read-only and capability-checked.
- Current Daily Multiplayer rows are excluded.
- Public profile privacy remains default-private.
- Authenticated participant resume remains intact.
- Authenticated read-only spectator behavior remains intact.
- Public/guest spectator payloads contain no forbidden sensitive fields.
- Any spectator count/list slice is display-only, bounded, privacy-safe, and abuse-resistant.
- Phase 37 browser history and gameplay auto-centering behavior remains intact.
- Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior remain intact.
- Phase 35 Profile/auth and Live identity behavior remains intact.
- Phase 34 Live/Lobby/notification behavior remains intact.
- Phase 33 timed ranked Practice behavior and public leaderboard boundaries remain intact.
- Daily integrity, gameplay rules, scoring, timeout/forfeit behavior, Elo math, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged.

## Stage Breakdown

### Stage 38.0 - Protected Baseline

- Read governance, Phase 38 planning/spec materials, completed Phase 37 evidence, progress records, testing docs, and package scripts.
- Confirm repo state, branch, remotes, `HEAD`, and `origin/main`.
- Preserve user edits to `planning/phase-37/REVIEW-CHECKLIST.md`.
- Record existing uncommitted Phase 38 planning/spec/progress artifacts.
- Create the Stage 38.0 progress report and CSV row.
- Run watched-port/process checks and the baseline verification gate.
- Do not begin Stage 38.1.

### Stage 38.1 - Public/Spectator Data, RLS, And Privacy Audit

- Audit current Live participant, authenticated spectator, public profile, participant identity, ranked Live identity, repository parsing, and E2E seams.
- Audit signed-out and guest Live behavior.
- Audit whether public/guest spectation can be source-only. Expected: no.
- Decide the exact Stage 38.2 path: migration/RLS addendum planning or a documented source-only path if unexpectedly safe.
- Decide whether spectator presence/count/list remains in Phase 38 v1 or is deferred.
- Do not implement source, tests, migrations, or configuration.

### Stage 38.2 - Public Spectator Migration/RLS Addendum Planning

- Create a Phase 38 addendum under `planning/specs/phase-38/`.
- Define the additive SQL/RLS contract for sanitized public/guest spectator projections.
- Define grants, RLS, returned fields, forbidden fields, abuse boundaries, idempotency, rollback notes, and non-printing probes.
- Stop before SQL migration creation or execution.

### Stage 38.3 - Public Spectator Migration/RLS Execution

- Create exactly one additive migration only after explicit authorization.
- Apply only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous.
- Run non-printing probes for field allowlisting, forbidden field denial, Daily exclusion, eligibility bounds, and mutation denial.
- Update Supabase/ranked docs only where needed.
- Stop before source/UI implementation if migration verification fails.

### Stage 38.4 - Public/Guest Live Discovery And Read-Only Spectation

- Implement source-only public/guest Live discovery and read-only spectation using the approved projection.
- Keep authenticated participant and authenticated spectator paths intact.
- Add parser defenses against forbidden keys.
- Add capability checks that prevent public/guest mutation actions from rendering or firing.
- Add focused tests for signed-out/guest discovery, read-only detail surfaces, forbidden actions, Daily exclusion, stale/terminal fallbacks, public profile fallback names, and authenticated non-regression.

### Stage 38.5 - Spectator Presence Gate And Optional Implementation

- Re-evaluate spectator presence/count/list after the projection exists.
- Implement only a narrow safe slice if approved by Stage 38.1 and Stage 38.2 evidence.
- Prefer aggregate counts. Defer identity-bearing lists if there is any profile/social/abuse ambiguity.
- If deferred, document the deferral clearly in progress and changelog.

### Stage 38.6 - Final Hardening, E2E, Visual Review, Manual Checklist

- Run focused regression and E2E coverage for public/guest read-only spectation, authenticated spectator preservation, participant preservation, Daily exclusion, privacy field denial, stale/terminal fallback behavior, and any spectator presence slice.
- Run full final verification.
- Run local visual handoff review, storing artifacts only under ignored `test-results/visual-review/phase-38-stage-38-6/`.
- Create `planning/phase-38/CHANGELOG.md`.
- Create `planning/phase-38/REVIEW-CHECKLIST.md`, using the local phase review checklist skill when appropriate.
- Prepare Git handoff only after explicit authorization.

## Likely Files And Modules

- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/account/publicProfile.ts`
- `src/account/profile.ts`
- Live spectator, public profile, repository, view-model, route/history, and E2E tests.
- Relevant Supabase migrations for Phase 26 authenticated spectator projection, Phase 28 terminal hold, Phase 29 public profile RLS, Phase 32 participant identity, Phase 35 ranked Live identity spectator profiles, and any later Phase 38 migration.
- `docs/supabase.md`
- `docs/ranked-multiplayer.md` if ranked spectator boundaries need clarification.

## Verification Strategy

Planning/spec/addendum stages should run lightweight documentation verification only:

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
- watched-port/process cleanup checks when browser or E2E work runs
- `git status --short --branch`

Final hardening should also run `npm run test:e2e` and `npm run test:full` unless a later prompt explicitly narrows the gate with a non-secret reason.

Public/guest spectator claims should include real browser/E2E coverage when feasible, including signed-out/guest behavior, authenticated participant non-regression, authenticated spectator non-regression, and remote non-printing probes for migration/RLS work.

## Visual Review Expectations

Final Phase 38 visual artifacts should remain ignored/local-only under:

`test-results/visual-review/phase-38-stage-38-6/`

Suggested visual scenarios:

- signed-out or guest Live discovery empty/visible state, depending on approved implementation;
- public/guest read-only spectator detail surface;
- authenticated participant Live resume;
- authenticated spectator Live view;
- public/guest stale or terminal fallback;
- narrow/mobile public/guest spectator view if implemented.

Screenshots, videos, traces, auth state, tokens, and local artifacts must remain ignored/local-only and unstaged.

## Manual Review Checklist Expectations

The Phase 38 manual checklist should ask the user to verify:

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

## Risks

- Public/guest spectation can leak current Daily answers if eligibility is wrong.
- Anon/public RPCs can overexpose raw game, identity, profile, rating, or queue data if they reuse authenticated shapes.
- Read-only UI can still mutate state if handlers are shared without capability checks.
- Spectator presence can become social/profile browsing ahead of Phase 39.
- Public/guest routes can disrupt authenticated participant or authenticated spectator routing.
- E2E or remote probes may require Supabase credentials; missing credentials should stop with a documented limitation rather than weakening claims.

## Open Decisions

- Should Phase 38 v1 ship public/guest spectation, or stop after migration/RLS readiness if privacy risk remains too high?
- Should v1 treat signed-out anonymous users and local guest users identically?
- Should eligible public/guest discovery include only in-progress Practice games or also a bounded terminal hold?
- Are aggregate spectator counts safe enough for Phase 38, or should all presence wait for Phase 39?
- What row limit, terminal hold, and polling cadence are acceptable for public/guest spectator discovery?
- Should public/guest spectator payloads include public avatar/accent fields in v1, or only display names/generic seat labels?

## Deferred Routing

- Public/social profile browsing, clickable rival profiles, direct player match requests, and private matchmaking expansion: Phase 39.
- Public site stats, private developer dashboard, onboarding/help/tutorial UX: Phase 40.
- EXP/coin/collectible header counters and Focus Mode: Phase 41 or later.
- Theme work: Phase 42 or later.
- Service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes: later gated phases only.

## Next Gated Action

The next safe action after review is creation of the detailed Phase 38 implementation plan. That plan should stage the protected baseline, public/spectator audit, migration/RLS addendum, migration execution, source integration, spectator presence gate, and final hardening/manual review workflow. It must halt before implementation.
