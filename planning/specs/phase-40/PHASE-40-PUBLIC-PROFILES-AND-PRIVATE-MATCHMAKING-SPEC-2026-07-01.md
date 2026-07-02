# Phase 40 Public Profiles And Private Matchmaking Spec

**Status**: Draft unified specification for review.
**Date**: 2026-07-01.
**Repository**: `brrrdle-dev` only.
**Authority**: Implements the reviewed Phase 40 planning brief once the user explicitly authorizes later implementation stages.

## 1. Status And Authority

This specification is implementation-oriented planning only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

Current authority order:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
5. `planning/phase-40/PLANNING-BRIEF.md`.
6. This specification, once reviewed.
7. Future Phase 40 implementation plan and stage prompts, once explicitly authorized.

If any source conflicts on privacy, mutation authority, Daily behavior, ranked behavior, deployment/configuration, Git/GitHub operations, or stable repository boundaries, stop and ask for review.

## 2. Current Baseline

Phase 39 is complete, backed up, merged, branch-cleaned, and manually reviewed. The expected local and remote `main` hash is:

`4f935881562f338aa2827962917c7ae4b6ce7b47`

Phase 39 completed:

- deterministic mobile scroll/layout Playwright harness;
- mobile shell/shared UI visual-effect reductions;
- Word Explorer mobile row containment and repeated-shadow reduction;
- E2E waiting-game join stability repair;
- Daily selected-game join path preservation;
- Practice Lobby join path stabilization;
- final hardening and full verification;
- checked-off user manual review at `planning/phase-39/REVIEW-CHECKLIST.md`.

Phase 40 starts from several existing foundations:

- Phase 29 public profile RPCs and parser allowlists.
- Phase 30 authenticated public ranked leaderboard display surfaces.
- Phase 31 Practice-only rematch request lifecycle.
- Phase 32 authenticated participant identity summaries.
- Phase 33 trusted timed ranked Practice queue/settlement boundaries.
- Phase 38 public/guest Practice Live discovery and read-only spectation.
- Phase 39 mobile scroll smoothness improvements and mobile scroll harness.

These foundations are not automatic authorization to broaden exposure. Phase 40 must audit and prove each safe data path before implementation.

## 3. Goals

Phase 40 should make safe player identity and private play easier to use without creating a social graph, weakening profile privacy, exposing private match data, or bypassing trusted multiplayer authority.

Goals:

- provide a clear audit and scope lock for public profile and private matchmaking surfaces;
- enable clickable player names/avatars only when the target has active safe public profile fields;
- define public profile pages/cards that use only approved public fields and safe unavailable/private fallbacks;
- enrich multiplayer identity surfaces without exposing raw auth IDs, emails, private profile fields, sessions, queue internals, rating internals, tokens, or local artifacts;
- define private/custom invitation or direct request flows only when anti-abuse, privacy, notification, cancellation, expiry, and routing boundaries are clear;
- keep direct requests unranked/custom by default;
- preserve ranked queue, trusted settlement, Daily claim rules, public spectator read-only boundaries, gameplay rules, and Elo math.

## 4. In Scope

Phase 40 may include, after the appropriate stage authorization:

- read-only audit of public profile, participant identity, public spectator, public leaderboard, rematch, custom lobby, notification, route/history, and E2E seams;
- source-only public profile route/card work if existing public profile RPCs are sufficient;
- clickable public profile names and avatars from approved safe contexts;
- public profile unavailable/private/hidden/suspended/stale fallbacks;
- richer safe multiplayer identity display using active public fields only;
- private/custom-code lobby visibility and routing cleanup if kept participant/private-code scoped;
- direct unranked/custom match request design if addendum and audit show safe lifecycle boundaries;
- in-app notification and attention cues for private requests only when participant-scoped;
- additive migration/RLS addendum planning for any new database contract;
- exactly scoped migration/RLS execution only after separate explicit authorization;
- focused parser, repository, component, route, notification, and real two-client E2E coverage.

## 5. Out Of Scope

Phase 40 must not include:

- public/guest spectation changes or spectator presence/count/list behavior;
- public site stats, private developer dashboard, onboarding, help, or tutorial UX;
- progression HUD, EXP/coin/collectible counters, Focus Mode, compact navigation, or broad mobile UX shell overhaul;
- theme proposal modernization or full concrete theme work;
- service workers, push subscriptions, deployment, release, or Vercel/Supabase configuration;
- ranked private invitations, ranked direct challenges, Daily match requests, or Daily custom invitations unless a later competitive-integrity spec explicitly approves them;
- public social graph, friends/followers, blocking/muting system, public DMs, chat, marketplace, bots, or community feeds;
- any change to OG/GO rules, Hard Mode, scoring, timeout/forfeit precedence, Daily determinism, Daily claim safety, ranked queue, trusted settlement, Elo algorithm, K factors, or rank bands.

## 6. Product Requirements

### 6.1 Public Profile Links And Cards

Public profile links/cards may appear only where a safe public profile identifier is already available from an approved projection or RPC.

Allowed public profile card fields:

- public profile id;
- display name;
- accent color;
- flair key;
- avatar URL;
- bio;
- approved timestamps where already returned by the public profile RPC.

Required behavior:

- private, hidden, suspended, missing, malformed, stale, or unavailable profiles show safe generic fallback copy;
- fallback copy must not imply the user has a profile, account, or request availability;
- profile links must be inert or absent when the target profile is unavailable;
- public profile cards must not reveal whether a private profile exists behind the fallback;
- public profile pages/cards must remain display-only.

### 6.2 Clickable Multiplayer Identity

Clickable names/avatars may be considered for:

- public ranked leaderboard rows;
- public/guest spectator rows and focused spectator details if the projection includes approved public profile identity;
- authenticated participant identity summaries;
- eligible multiplayer active game, selected game, Lobby, Live, and postgame surfaces where safe identity is already present.

Identity must remain safe:

- viewer identity can still show `You` in viewer-owned contexts;
- rivals without active public profiles use existing generic labels;
- raw auth IDs, emails, internal seats, queue IDs, rating transaction IDs, and session details must not appear in links, URLs, visible text, analytics, test logs, or progress docs.

### 6.3 Private Matchmaking

Private matchmaking v1 should be conservative and scoped to unranked/custom Practice play unless later authorized.

Potential v1 shapes:

- improved custom-code lobby setup/join/copy behavior;
- private invitation links or codes that are not listed in public discovery;
- direct player-to-player unranked/custom match requests between authenticated users with active safe profile context;
- request lifecycle: create, list, accept, decline, cancel, expire, and route to created game.

Required boundaries:

- a public profile does not automatically mean a player accepts direct requests unless the approved design makes invitation availability explicit;
- requests must be authenticated and participant-scoped;
- request lists must not be public browsing, spectator presence, or social graph authority;
- requests must be cancellable/declinable and expire automatically;
- repeated actions must be idempotent or safely rejected;
- users must not be forced into games;
- ranked queue, trusted ranked finalization, trusted settlement, Daily claims, and public leaderboard authority must not be bypassed.

### 6.4 Notifications And Routing

Private request notifications, if implemented, must be in-app only for v1 unless a later prompt authorizes service workers or push.

Notification/routing requirements:

- request notifications are visible only to request participants;
- notifications do not reveal private profile data to nonparticipants;
- accept/decline/cancel actions are explicit and do not happen through browser history replay;
- browser back/forward, selected-game state, and stale fallbacks from Phase 37 remain intact;
- notification routing must not submit guesses, create games, accept requests, mutate ratings, mutate Daily claims, or change account/profile state without explicit user action.

## 7. Data And Privacy Requirements

### 7.1 Existing Public Profile Contract

Existing public profile behavior remains the model:

- profiles default private;
- public exposure uses opaque `public_profile_id`;
- active public profile rows are exposed only through allow-listed RPCs;
- direct table access should not be granted to browser clients;
- public reads must omit raw auth IDs, emails, auth metadata, private profile fields, progress, settings, history, private ranked projections, raw rating transactions, game/session projections, answers, seeds, tokens, and local artifacts.

### 7.2 Existing Participant Identity Contract

Participant identity summaries remain authenticated and participant-scoped. They do not make game participation publicly readable.

Phase 40 may reuse them only within their existing authority:

- own game or matched ranked queue context;
- approved seat/display fields only;
- no raw IDs, emails, private metadata, queue internals, rating transaction internals, sessions, or public/guest spectator authority.

### 7.3 Private Request Contract

If Phase 40 needs a new direct-request or private-invitation database contract, it must be covered by an addendum before SQL work.

The addendum must define:

- table/RPC names and purpose;
- grants for `anon`, `authenticated`, and `public`;
- participant-scoped read/write behavior;
- request eligibility;
- expiry, cancellation, decline, acceptance, idempotency, and stale handling;
- returned allow-listed fields;
- forbidden fields and denial probes;
- rollback/idempotency notes;
- non-printing probe plan.

## 8. Migration/RLS Constraints

No migration is authorized by this spec alone.

If a later stage authorizes migration/RLS work, constraints are:

- exactly one additive migration per authorized execution stage unless the user explicitly broadens it;
- dedicated RPCs/projections preferred over direct table grants;
- no broadening of existing public spectator, participant identity, ranked queue, public leaderboard, or public profile contracts unless specified;
- no direct browser grants to private profile, auth, rating transaction, raw game/session, answer/seed, queue-internal, or token-bearing tables;
- no anonymous mutation authority;
- no public visibility for private/custom requests or private game lobbies beyond explicit private-code lookup behavior;
- non-printing probes must prove allow-listed fields, forbidden-field denial, private/hidden/suspended fallback behavior, grant behavior, participant/nonparticipant denial, Daily/ranked exclusion, request expiry, and mutation-safety boundaries.

## 9. Supabase/Auth/Public Profile Constraints

Phase 40 must preserve:

- Supabase account and guest-to-account transfer behavior;
- private account profile settings;
- public profile default-private behavior;
- active/moderated-only public profile exposure;
- public avatar URL restrictions, including no raw account id in public avatar URLs;
- authenticated participant identity boundaries;
- public leaderboard display-only authority;
- public/guest spectator read-only boundaries and Daily spectator exclusion.

## 10. Vercel And Deployment Constraints

Phase 40 does not authorize:

- Vercel configuration changes;
- Supabase project configuration changes;
- environment variable changes;
- preview or production deployment;
- release actions.

Any such work must be separately planned and explicitly authorized.

## 11. Gameplay And Elo Constraints

Phase 40 must not change:

- OG or GO rules;
- Practice length range;
- Daily fixed-five behavior;
- Daily Multiplayer UTC keying, no-clock behavior, answer separation, or claim safety;
- Hard Mode;
- scoring;
- timeout/forfeit precedence;
- GO solved-row hold and transition semantics;
- ranked queue compatibility;
- trusted ranked finalization or settlement;
- Elo formula, K factors, provisional window, rating buckets, or rank bands.

## 12. Stage Breakdown

### Stage 40.0 - Protected Baseline

Purpose:

- confirm repository state, branch, remotes, `HEAD`, `origin/main`, and stable repo boundary;
- preserve checked-off `planning/phase-39/REVIEW-CHECKLIST.md`;
- record existing Phase 40 planning/spec/progress artifacts;
- run the approved baseline verification gate.

No source/runtime implementation.

### Stage 40.1 - Public Profile, Private Matchmaking, RLS, Privacy, And Routing Audit

Purpose:

- audit existing public profile RPCs, parsers, Profile UI, public leaderboard identity, public spectator identity, participant identity, rematch lifecycle, custom lobby, ranked queue, notification, route/history, and E2E seams;
- decide what can be source-only and what requires a migration/RLS addendum;
- decide the safest public profile route shape;
- decide whether direct requests belong in Phase 40 v1 or must be reduced to custom-code/private invitation cleanup;
- define stale/private/hidden/suspended fallback requirements.

No source/runtime implementation.

### Stage 40.2 - Migration/RLS Addendum Planning

Purpose:

- create a precise addendum for any new public profile lookup, private invitation, direct request, private-code, or notification-backed database contract required by the audit;
- if the audit proves a fully source-only path, record that and route Stage 40.3 as unnecessary.

No SQL migration creation or execution.

### Stage 40.3 - Migration/RLS Execution

Purpose:

- create exactly the authorized additive migration;
- apply it only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous;
- run non-printing probes required by the addendum;
- update docs only where needed.

No app source integration beyond migration/probe support unless separately authorized.

### Stage 40.4 - Public Profile Route And Clickable Identity Source Integration

Purpose:

- implement approved public profile route/card behavior;
- connect safe identity links from approved surfaces;
- preserve private/hidden/suspended/stale fallbacks;
- add focused tests for parsers, route behavior, visible copy, link availability, and forbidden raw fields.

No private matchmaking source integration unless explicitly combined by a later prompt.

### Stage 40.5 - Private Matchmaking Source Integration

Purpose:

- implement approved private/custom-code invitation or direct unranked/custom request behavior;
- integrate notification/routing/cancellation/expiry behavior only inside approved participant-scoped boundaries;
- add focused tests and real two-client E2E where behavior crosses accounts/browsers.

No ranked/Daily direct requests.

### Stage 40.6 - Final Hardening, E2E, Visual Review, Changelog, And Manual Checklist

Purpose:

- review Phase 40 for regressions, privacy gaps, stale docs, and visual issues;
- add only narrow final-hardening fixes if required;
- run focused and full verification;
- run visual handoff review under ignored local artifacts;
- create `planning/phase-40/CHANGELOG.md`;
- create `planning/phase-40/REVIEW-CHECKLIST.md` using the local review-checklist skill;
- halt for Git handoff preparation only after clean verification.

## 13. Success Criteria

Phase 40 is successful only if:

- public profile pages/cards and links never expose private or forbidden fields;
- unavailable/private/hidden/suspended/stale profiles have safe fallbacks;
- clickable identity links are present only where safe public profile context exists;
- direct requests, if implemented, are unranked/custom only and cannot bypass ranked queue, trusted settlement, or Daily claims;
- private/custom request lifecycle is participant-scoped, idempotent or safely rejected, expiring, cancellable, declinable, and not publicly discoverable;
- notification and routing behavior never mutates gameplay through history/navigation replay;
- public/guest spectator behavior remains read-only;
- Phase 39 mobile scroll smoothness remains intact;
- all focused tests, real two-client E2E where needed, final verification, visual review, and manual checklist evidence are clean.

## 14. Likely Files And Modules

Likely source/test/doc surfaces:

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
- public profile, leaderboard, participant identity, custom lobby, rematch, notification, route/history, and E2E tests;
- `docs/supabase.md`
- `docs/ranked-multiplayer.md`
- future Phase 40 migration/RLS addendum and migration if authorized.

## 15. Verification Strategy

Documentation-only stages:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Baseline stages:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- repository hygiene checks and watched-port cleanup checks.

Implementation stages:

- focused parser/repository/component tests first;
- route and navigation tests where public profile routes or request routing are touched;
- notification/view-model tests where private request attention cues are touched;
- focused Playwright/E2E for safe public profile navigation and private request flows;
- real two-client Supabase-backed E2E for any accepted private request or cross-account custom/private match flow.

Final hardening:

- focused Phase 40 regression set;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e`;
- `npm run test:full`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port/process cleanup check for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

## 16. Visual Review Expectations

If Phase 40 reaches final hardening, run visual handoff review for changed user-visible surfaces under ignored local-only artifacts such as:

`test-results/visual-review/phase-40-stage-40-6/`

Likely visual scenarios:

- public profile card/page desktop;
- public profile card/page mobile;
- leaderboard public profile link surface;
- multiplayer selected-game identity link surface;
- Live/public spectator identity fallback surface;
- private/custom request controls if implemented;
- notification/request routing surface if implemented;
- unavailable/private/hidden/suspended fallback state.

Screenshots, videos, traces, auth state, tokens, and local session artifacts must remain unstaged and uncommitted.

## 17. Manual Review Checklist Expectations

Final Phase 40 should create:

`planning/phase-40/REVIEW-CHECKLIST.md`

Use the local `brrrdle-phase-review-checklist` skill and the Phase 37-style structure. Required manual review topics should include:

- public profile safe-field display;
- private/hidden/suspended/missing profile fallbacks;
- clickable public identity link behavior;
- private/custom request lifecycle behavior if implemented;
- notification and routing behavior if implemented;
- public/guest spectator non-regression;
- ranked queue/Daily claim non-regression;
- Phase 39 mobile scroll smoothness preservation;
- gameplay and Elo invariants.

## 18. Risks

- Public profile links could accidentally expose raw IDs or imply private profile existence.
- Existing custom-code or rematch seams may be insufficient for direct requests and require a separate addendum.
- Direct requests could become spammy or coercive without limits, expiry, cancellation, and decline behavior.
- Private match requests could accidentally appear in public spectator, leaderboard, or lobby surfaces.
- Notification routing could mutate request/game state through navigation instead of explicit user action.
- New profile cards could regress Phase 39 mobile scroll smoothness if they use heavy effects or large lists.
- Combining public profile browsing and private matchmaking could become too broad unless implementation stages stay narrow.

## 19. Open Decisions

Stage 40.1 must answer:

- Can public profile pages/cards use existing `get_public_player_profile` and `get_public_player_profiles` source-only?
- Should profile routes use opaque `public_profile_id`, or only open from already-known safe contexts?
- Which surfaces should receive clickable identity in v1?
- Does private matchmaking v1 include direct player requests, custom-code improvements, or both?
- Are direct requests limited to active public profiles, or can a user request a known opponent from prior participant-scoped contexts?
- What anti-abuse limits are required before direct requests are safe?
- Is any private request notification limited to in-app notifications for v1?
- Which real two-client E2E scenarios are mandatory before final handoff?

## 20. Next Gated Action

The next safe gate is a detailed Phase 40 implementation plan for review only. It should turn this specification into stage prompts, preserve the checked Phase 39 manual review file, record progress, run lightweight documentation verification, and halt before implementation.
