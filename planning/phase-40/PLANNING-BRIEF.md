# Phase 40 Planning Brief: Public Profiles And Private Matchmaking

**Status**: Draft planning brief for review.
**Phase**: Phase 40.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-01.

## Status And Authority

This document is a planning brief only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

Authority stack for Phase 40:

1. Current user prompt.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
5. This planning brief, once reviewed.
6. The future unified Phase 40 specification and implementation plan, once explicitly authorized.

## Current Baseline

Phase 39 is complete, backed up to GitHub, merged, branch-cleaned, and manually reviewed from local and remote `main` hash `4f935881562f338aa2827962917c7ae4b6ce7b47`.

Phase 39 completed:

- deterministic mobile scroll/layout Playwright harness;
- mobile shell/shared UI visual-effect reductions;
- Word Explorer mobile row containment and repeated-shadow reduction;
- E2E waiting-game join stability repair;
- Daily selected-game join path preservation;
- Practice Lobby join path stabilization;
- final hardening and full verification;
- checked-off manual review checklist at `planning/phase-39/REVIEW-CHECKLIST.md`.

Phase 40 starts from the existing public profile, participant identity, rematch, ranked queue, custom lobby, public leaderboard, and public spectator foundations. Those foundations are useful but must not be assumed sufficient for new public profile browsing or private matchmaking without an audit.

## Manual Review Result Summary

The Phase 39 manual review is clean.

User review notes:

- mobile scrolling is extremely smooth;
- desktop scrolling is extremely smooth;
- all Phase 39 manual review checklist items have been completed;
- everything passes as far as the user can tell;
- no significant new bugs or new feature requests need to be added beyond planned Phase 40 work.

## Phase-Sizing Decision

Phase 40 may be planned as a cohesive macro-phase under `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md` because public profiles and private matchmaking share several high-overlap surfaces:

- public profile identity, visibility, moderation, and safe display fields;
- multiplayer player labels, avatars, profile links, and route context;
- custom-code and request-style private matchmaking flows;
- Supabase/RLS privacy contracts;
- notification and routing behavior for invites, accepts, declines, cancellations, expiry, and created games;
- real two-client E2E coverage and privacy probes.

The macro-phase should remain audit-first and stage-gated. Individual implementation stages must stay narrow, single-purpose, and independently reviewable.

## Goals

Phase 40 should make player identity and private play more useful without weakening privacy or trusted matchmaking boundaries.

Goals:

- audit current public profile visibility, privacy, moderation, and safe identity surfaces before source or database implementation;
- plan clickable public profile names and avatars only where active public profile fields are available;
- plan public profile pages/cards using safe public fields only;
- enrich multiplayer identity surfaces without exposing raw auth IDs, emails, private profile fields, sessions, queue internals, rating internals, tokens, or local artifacts;
- plan custom-code private games or invitation flows that do not appear in inappropriate public surfaces;
- plan direct unranked/custom match requests only if anti-abuse, privacy, notification, cancellation, expiry, and routing boundaries are clear;
- preserve trusted ranked queue behavior and do not bypass rating settlement paths.

## In-Scope Work

Phase 40 planning may cover:

- public profile and private matchmaking audit;
- public profile route/card specification;
- clickable public profile names/avatars from safe surfaces such as public leaderboards, multiplayer identity summaries, public spectator rows, and eligible multiplayer cards;
- safe fallbacks when profile identity is private, hidden, suspended, unavailable, or stale;
- private custom-code lobby discovery and joining improvements if kept out of public lists;
- direct player-to-player unranked/custom match request design if anti-abuse boundaries are clear;
- request lifecycle planning for create, list, accept, decline, cancel, expire, and created-game routing;
- notification and in-app attention cues for private requests only where privacy-safe;
- Supabase/RLS addendum planning and probe expectations before any new database work;
- focused component, repository, and E2E coverage plans.

## Out-Of-Scope Work

Phase 40 must not include:

- source/runtime implementation before explicit implementation-stage authorization;
- Supabase migration creation or execution before a separate migration/RLS stage authorization;
- public/guest spectation changes or spectator presence/count/list behavior;
- ranked private invitations, ranked direct challenges, Daily match requests, or Daily custom invitations unless a later competitive-integrity spec explicitly approves them;
- bypassing ranked queue, trusted finalization, trusted settlement, Daily claim rules, or participant-only identity boundaries;
- public site stats, private developer dashboard, onboarding, help, or tutorial UX;
- EXP/coin/collectible header counters, Focus Mode, compact navigation, or broad mobile UX shell overhaul;
- theme proposal modernization or full concrete theme work;
- service workers, push subscriptions, production deployment, release, gameplay-rule changes, or Elo algorithm changes.

## Recommended Phase 40 V1 Scope

Recommended v1 scope:

1. Start with a read-only audit of public profile, participant identity, public spectator, leaderboard, rematch, custom lobby, notification, routing, and E2E seams.
2. Decide whether clickable public profile cards can be source-only using existing public profile RPCs or require a narrow addendum for route lookup/list batching.
3. Treat private matchmaking as addendum-gated unless the audit proves existing custom lobby/rematch seams already cover the approved behavior safely.
4. Keep direct requests limited to unranked/custom Practice games by default.
5. Keep ranked and Daily invitations deferred.
6. Do not implement spectator presence/count/list as part of this phase.

## Recommended Narrow Stage Breakdown

- **Stage 40.0 - Protected baseline**: confirm Phase 39 manual review state, current branch/remotes/hashes, progress shape, resource status, and full baseline verification.
- **Stage 40.1 - Public profile/private matchmaking audit**: read-only audit of public profile visibility, safe identity fields, existing RPCs/RLS, current multiplayer labels, custom lobby/rematch flows, notifications, route/history seams, and E2E coverage.
- **Stage 40.2 - Migration/RLS addendum planning**: if needed, create a precise addendum for any new profile lookup, direct request, private invitation, or custom-code RPC contract. If the audit proves a source-only path is safe, document that decision instead.
- **Stage 40.3 - Migration/RLS execution**: only if separately authorized after the addendum; create/apply exactly the approved additive migration and run non-printing probes.
- **Stage 40.4 - Public profile surfaces source integration**: add public profile pages/cards and clickable safe identity links using audited safe fields and fallbacks.
- **Stage 40.5 - Private matchmaking source integration**: add approved custom-code/private invitation or direct unranked/custom request behavior with notification/routing/cancellation/expiry boundaries.
- **Stage 40.6 - Final hardening, E2E, visual review, changelog, and manual checklist**: run focused and full verification, visual handoff review, create changelog and manual review checklist, and prepare Git handoff only after clean results.

Stages 40.3, 40.4, and 40.5 may be split further if audit findings show higher risk.

## Success Criteria

Phase 40 succeeds when:

- all new public profile surfaces use only active public profile fields and safe fallbacks;
- private/hidden/suspended/stale profiles do not leak private identity;
- clickable player identity does not expose raw auth IDs, emails, private profile fields, sessions, queue internals, rating internals, or local artifacts;
- private/custom match requests cannot appear in inappropriate public surfaces;
- direct requests, if implemented, are unranked/custom only, anti-abuse bounded, cancellable/declinable/expiring, and do not bypass ranked queue or Daily claim rules;
- notifications and routing are clear without exposing private request data to nonparticipants;
- authenticated participant, authenticated spectator, public/guest spectator, leaderboard, Active Games, browser history, gameplay auto-centering, and mobile scroll behavior remain intact;
- gameplay rules and Elo math remain unchanged;
- focused tests, E2E coverage, final verification, visual review, and manual checklist evidence are clean.

## Likely Files And Modules

Likely read/implementation surfaces:

- `src/account/publicProfile.ts`
- `src/account/profile.ts`
- `src/account/ProfilePanel.tsx`
- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/customGames.ts`
- `src/leaderboards/LeaderboardPanel.tsx`
- notification view-model/action surfaces as needed
- relevant public profile, participant identity, private request, repository/parser, privacy, route, and E2E tests
- relevant Supabase migrations for public profiles, participant identity, ranked Live identity spectator profiles, public spectator boundaries, rematches, queues, and custom lobbies.

## Migration/RLS Constraints And Addendum Gates

Any new database work must be additive, explicitly authorized, and preceded by a Stage 40 addendum.

Constraints:

- prefer dedicated RPCs/projections over broad table grants;
- do not grant direct browser access to private profile, auth, rating transaction, game session, queue-internal, or raw projection tables;
- keep public profile payloads allow-listed;
- keep private matchmaking request payloads participant-scoped;
- include bounded row limits, request expiry, idempotency, cancellation/decline semantics, and abuse/rate-limit expectations where applicable;
- require non-printing probes for allowed fields, forbidden fields, private profile denial, hidden/suspended profile denial, nonparticipant denial, anon/authenticated behavior, stale/expired behavior, and mutation authority.

## Public Profile Privacy Constraints

Public profile surfaces may use only approved public fields such as:

- `public_profile_id`;
- `display_name`;
- `accent_color`;
- `flair_key`;
- `avatar_url`;
- `bio`;
- safe timestamps where already approved.

They must not expose raw auth IDs, emails, auth metadata, private account metadata, progress, settings, history, private ranked projections, raw rating transactions, game/session projections, answers, seeds, tokens, screenshots, videos, traces, auth state, or local/session artifacts.

## Private Matchmaking And Anti-Abuse Constraints

Private matchmaking must be conservative:

- direct requests default to unranked/custom Practice only;
- ranked and Daily requests remain unavailable by default;
- requests should require authenticated users;
- request creation, acceptance, decline, cancellation, expiry, and created-game routing must be participant-scoped;
- requests must not force a game onto another user;
- public profile visibility should not imply invitation consent unless the approved spec says so;
- request lists must not become public profile browsing, spectator presence, or social graph authority;
- anti-spam/abuse controls should include limits, expiry, idempotency, and safe repeated-action behavior.

## Supabase Auth, Account, And Public Profile Constraints

Phase 40 must preserve:

- default-private public profiles;
- moderated active public profile exposure only;
- existing account/profile behavior and guest-to-account transfer expectations;
- authenticated participant identity boundaries;
- public leaderboard display-only boundaries;
- public/guest spectator read-only boundaries and Daily spectator exclusion.

## Notification And Routing Constraints

Notifications and routing may support private requests only if they:

- reveal request state only to participants;
- do not expose private profile data;
- route to safe, existing workspaces without replaying moves or mutating gameplay;
- preserve browser back/forward behavior and stale selected-game fallbacks;
- avoid service workers or push subscriptions.

## Vercel And Deployment Constraints

Phase 40 does not authorize deployment, Vercel configuration, production release, environment-variable changes, or Supabase project configuration. Any deployment or configuration work remains a later explicit gate.

## Gameplay And Elo Constraints

Phase 40 must not change:

- OG or GO rules;
- Daily determinism, UTC-day behavior, claim safety, answer separation, or five-letter Daily Multiplayer constraint;
- Hard Mode enforcement;
- scoring rules;
- timeout, forfeit, solved-row hold, or GO transition semantics;
- Elo algorithm, K factors, rank bands, trusted settlement, or ranked queue authority.

## Verification Strategy

Planning/spec stages use lightweight documentation verification.

Implementation stages should run focused tests first, then expand to the relevant suite:

- public profile parser/repository tests;
- public profile card/page component tests;
- multiplayer identity/routing tests;
- private request lifecycle tests;
- notification/view-model tests;
- real two-client E2E for private request/custom-game flows where behavior crosses browsers or accounts;
- public/guest spectator, leaderboard, Active Games, browser history, gameplay auto-centering, and mobile scroll non-regression checks where touched.

Final hardening should run:

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
- watched-port/process cleanup check;
- `git status --short --branch`.

## Visual Handoff Review Expectations

Phase 40 user-visible surfaces should use the local visual review gate before final handoff. Capture artifacts only under ignored `test-results/visual-review/phase-40-stage-40-6/` or the final approved stage-specific equivalent. Screenshots, videos, traces, auth state, tokens, and local artifacts must not be staged or committed.

Expected visual coverage:

- public profile card/page at desktop and mobile widths;
- multiplayer player identity link surfaces;
- private request/custom-code controls if implemented;
- request notification/routing surfaces if implemented;
- fallback states for private/hidden/unavailable profiles.

## Manual Review Checklist Expectations

Final Phase 40 documentation should include `planning/phase-40/REVIEW-CHECKLIST.md` using the local `brrrdle-phase-review-checklist` skill and the Phase 37-style structure.

The checklist should cover:

- public profile safe-field behavior;
- private/hidden/suspended/stale profile fallbacks;
- clickable player identity behavior;
- private/custom request lifecycle behavior if implemented;
- notification/routing behavior if implemented;
- preserved Phase 39 mobile scroll smoothness;
- preserved Phase 38 spectator boundaries;
- preserved gameplay/Elo invariants.

## GitHub Backup Workflow Expectations

GitHub backup is not authorized by this planning brief. After Phase 40 final verification and manual handoff preparation, use the local `brrrdle-github-backup` skill only when explicitly authorized by a later user prompt.

## Risks

- Accidentally exposing raw auth IDs, emails, private profile data, rating internals, queue internals, or session data through profile links or private request payloads.
- Letting direct requests bypass ranked queue, Daily claim, or trusted settlement authority.
- Creating public discovery of private/custom games by mistake.
- Overloading Phase 40 by mixing social browsing, private matchmaking, notifications, and RLS changes without narrow stage gates.
- Adding notification or routing behavior that mutates gameplay or repeats actions on navigation.
- Regressing Phase 39 mobile scroll smoothness by adding heavy new public/profile surfaces.

## Open Decisions

- Can public profile pages/cards use existing public profile RPCs source-only, or is a narrow lookup/list addendum required?
- Should public profile pages be route-addressable by opaque `public_profile_id`, or only linked from known safe contexts?
- What private matchmaking v1 should include: custom-code improvements only, direct unranked/custom match requests, or both?
- What anti-abuse limits are required for direct requests?
- Should request notifications be in-app only for v1?
- Which E2E flows are required to prove private request lifecycle safety?

## Next Gated Prompt

The next safe gate is a unified Phase 40 specification for review only. That prompt should read this planning brief, inspect the relevant public profile/private matchmaking surfaces, create one implementation-oriented spec under `planning/specs/phase-40/`, record progress, run lightweight documentation verification, and halt before implementation.
