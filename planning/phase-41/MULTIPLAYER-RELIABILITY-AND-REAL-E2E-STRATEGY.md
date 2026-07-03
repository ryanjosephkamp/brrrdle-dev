# Phase 41 Multiplayer Reliability And Real E2E Strategy

**Status**: Strategy intake for Phase 41 planning brief preparation.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-02.
**Authority**: Planning context only. This document does not authorize implementation, tests, migrations, Supabase or Vercel configuration, deployment, Git/GitHub operations, release, gameplay-rule changes, Elo changes, or stable `brrrdle` repository work.

## Purpose

Phase 40 manual review found enough multiplayer reliability concerns that the safest next phase should be rerouted away from the previously planned public site stats, developer dashboard, onboarding, and help work.

Recommended Phase 41 direction:

- make Phase 41 a cohesive multiplayer reliability, bugfix, and real E2E hardening macro-phase;
- keep implementation stages narrow and independently reviewable;
- defer the previous Phase 41 roadmap item to the next phase after this stabilization pass;
- use the Phase 40 manual review notes as planning evidence, not as implementation authority.

## Phase 40 Manual Review Intake

The Phase 40 checklist was completed, but it was not a clean "no follow-up" review. The user marked many required checks complete while adding notes that several flows need refinement or deeper investigation.

User-observed concerns to route into Phase 41:

- requester-side private Practice request routing is inconvenient after the opponent accepts;
- private Practice request panels can continue showing stale waiting/cancelled/declined/expired/accepted requests;
- private request cancel and decline optional checks did not pass because requests did not disappear from active lists;
- mobile Practice Multiplayer can show stale lobby/request state after creation or cancellation;
- ranked Practice search-again and ranked queue matching can fail to pair the only two waiting players consistently;
- cancelled ranked queue entries may still be eligible for later matching against a third player;
- ranked queue buttons flicker between `Already queued`, `Ranked queue working`, and action states during refresh;
- a newly established ranked Practice OG player may not appear on the public leaderboard despite an apparently eligible rating bucket;
- current tests did not catch these real multiplayer and freshness regressions;
- future manual review should distinguish what Codex already tested, what Codex attempted manually/browser-side, and what still requires the user's manual review.

## Recommended Phase 41 Scope

Phase 41 should focus on four connected risk areas.

1. Real multiplayer reliability audit and reproduction
   - Reproduce or characterize the user-observed issues with two-account and three-account flows.
   - Compare desktop and mobile behavior for Practice Multiplayer lobby/request/queue freshness.
   - Inspect Supabase rows and RPC responses without printing secrets or private data.
   - Decide which fixes are source-only and which require migration/RLS addenda.

2. Real E2E multiplayer test-harness expansion
   - Extend the current Playwright two-client pattern into a controlled multiplayer reliability harness.
   - Add three-account scenarios for ranked queue cancellation and stale queue participation.
   - Add mobile viewport coverage for multiplayer list/request/lobby freshness.
   - Add remote probe and cleanup helpers for ranked queue rows, private request rows, leaderboard/rating projections, and active games where safe.
   - Keep broad test expansion resource-bounded: one dev server, one worker unless justified, bounded waits, deterministic cleanup, and no committed artifacts.

3. Focused multiplayer bugfixes
   - Repair ranked Practice queue/search-again matching, cancellation, and visible status stability if reproduced.
   - Repair public leaderboard freshness or eligibility for newly established ranked players if reproduced.
   - Repair private Practice request lifecycle cleanup for cancel, decline, expiry, accept, and created-game states.
   - Improve requester-side accepted-game feedback and safe routing from public profile/request surfaces.
   - Repair mobile-only stale Practice Multiplayer lobby/request refresh if reproduced.

4. Review workflow improvement
   - Keep the committed manual checklist as a human review aid.
   - Add a Codex-assisted pre-review convention before future manual checklist handoff:
     - Codex attempts feasible checklist items through tests, browser checks, probes, or visual review;
     - Codex records what was automated, what was manually/browser-checked by Codex, what could not be checked, and what remains for the user;
     - Codex must not check user manual-review boxes unless explicitly authorized.
   - Consider a local skill only after the Phase 41 audit stabilizes the repeatable workflow. A premature skill would likely encode the wrong protocol.

## Recommended Stage Shape

Phase 41 should stay larger at the macro-phase level but narrow at each stage.

- **Stage 41.0 - Protected baseline and review intake**
  - Confirm Phase 40 merge baseline and user-edited checklist state.
  - Record all Phase 40 manual review notes and the strategy document.
  - Run the normal baseline gate before audit or implementation.

- **Stage 41.1 - Multiplayer reliability audit and reproduction**
  - Read-only audit plus targeted browser/Supabase reproduction as needed.
  - Map ranked queue, private request, public leaderboard, notifications, mobile freshness, and cleanup seams.
  - Decide source-only versus migration/RLS addendum requirements.

- **Stage 41.2 - Real E2E harness expansion**
  - Add focused diagnostics and Playwright coverage for the reproduced failure modes.
  - Prefer failing tests or explicit skipped/blocked diagnostics before source fixes.
  - Include two-client, three-client, and mobile viewport flows where feasible.

- **Stage 41.3 - Ranked Practice queue and search-again repair**
  - Fix only ranked Practice queue/search-again/cancel/status behavior supported by audit and harness evidence.
  - Preserve trusted ranked queue, settlement, Elo, Daily, and gameplay boundaries.

- **Stage 41.4 - Public leaderboard freshness repair**
  - Fix eligible newly established player visibility only after confirming whether the root cause is source, RPC, projection freshness, profile eligibility, or test setup.
  - Preserve display-only public leaderboard authority.

- **Stage 41.5 - Private Practice request lifecycle and routing repair**
  - Fix stale active request lists and requester-side accepted-game feedback/routing.
  - Decide whether notification/mailbox-like expansion is a narrow bugfix or should be deferred.
  - Preserve authenticated-only, Practice-only, unranked-only, public-profile-targeted request boundaries.

- **Stage 41.6 - Mobile multiplayer freshness and UI stability repair**
  - Fix mobile-only stale lobby/request/list behavior if it remains separate from earlier source fixes.
  - Repair ranked queue button flicker if not already covered by Stage 41.3.

- **Stage 41.7 - Final hardening, Codex-assisted pre-review, visual review, changelog, and manual checklist**
  - Run focused and full verification.
  - Run a Codex-assisted manual-review preflight where feasible.
  - Create Phase 41 changelog and manual review checklist with clear "Codex attempted" versus "User must manually verify" evidence.

## Phase Routing Recommendation

Recommended reroute:

- **Phase 41**: Multiplayer reliability, real E2E hardening, and critical multiplayer bugfixes.
- **Phase 42**: Public site stats, private developer dashboard, onboarding, help, and tutorial UX.
- **Phase 43**: Progression HUD, Focus Mode, compact navigation, and broader mobile UX shell polish.
- **Phase 44**: Theme proposal/template modernization.
- **Phase 45 or later**: Full concrete theme work.
- **Later gated phases**: spectator presence/count/list implementation, service workers/push, production deployment/release, gameplay-rule changes, and Elo changes.

The Phase 41 planning brief should update `planning/ROADMAP.md`, `planning/ROADMAP-OPTIMIZED.md`, and `planning/README.md` if the reroute is formally adopted.

## Multi-Agent Recommendation

Use multiple agents only after the audit defines disjoint ownership.

Safe early parallel lanes:

- Explorer lane A: ranked queue/search-again/cancel data path and E2E gaps.
- Explorer lane B: private request lifecycle, notifications, requester routing, and mobile freshness.
- Explorer lane C: public leaderboard eligibility/freshness and rating projection evidence.

Implementation should stay sequenced where files overlap. High-conflict surfaces include:

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerPanelRankedQueue.ts`
- `src/leaderboards/publicRankedLeaderboard.ts`
- `src/notifications/`
- `e2e/fixtures/`
- `e2e/gameplay/`
- `supabase/migrations/`
- `progress/PROGRESS.csv`

If a migration/RLS repair is needed, isolate it behind addendum planning and execution gates before source integration resumes.

## Testing And Evidence Requirements

Phase 41 should improve the test suite without turning every manual observation into a brittle UI test.

High-value new coverage:

- two-client ranked Practice search-again happy path after completed games;
- three-client ranked queue cancellation denial and stale-row cleanup;
- ranked queue visible status stability during polling/refresh;
- private request cancel/decline/expire/accept list cleanup;
- requester-side accepted-game feedback and open/resume path;
- mobile viewport Practice Multiplayer lobby/request freshness;
- public leaderboard inclusion for newly eligible established profiles;
- no regressions to public/guest spectator read-only boundaries, Daily Multiplayer claims, ranked settlement, Elo math, gameplay rules, and Phase 39 scroll smoothness.

Evidence should include:

- focused Vitest coverage for parsers/view models/domain helpers;
- focused Playwright E2E for real two-client and three-client flows;
- remote Supabase probes for durable queue/request/rating state where useful;
- cleanup evidence for temporary users, rows, queues, private requests, and generated artifacts;
- final full verification only at the final hardening gate unless a shared contract change warrants earlier broad proof.

## Explicit Deferrals

Do not let Phase 41 turn into a broad feature expansion.

Defer unless a later approved prompt explicitly changes scope:

- full mailbox or notification-center redesign;
- browser push, service workers, background push, or production notification infrastructure;
- broad public/social profile browsing beyond bug-relevant links;
- ranked private invitations, ranked direct challenges, Daily match requests, and Daily custom invitations;
- spectator presence/count/list work;
- public site stats, private developer dashboard, onboarding, help, and tutorial UX;
- progression HUD, Focus Mode, compact navigation, and broader mobile UX overhaul;
- theme proposal modernization and concrete theme implementation;
- gameplay-rule changes and Elo algorithm changes.

## Stop Conditions

Stop and report instead of implementing if:

- the manual review notes cannot be reproduced or safely characterized;
- a bug requires unapproved migration/RLS work;
- a fix would expose raw auth IDs, emails, private profile data, sessions, queue internals, rating internals, tokens, or local artifacts;
- ranked queue repair would change Elo, settlement, rating buckets, or gameplay rules;
- Daily claim safety or public/guest spectator read-only boundaries are implicated;
- test cleanup cannot reliably remove temporary users, queues, games, private requests, or generated artifacts;
- multiple high-conflict source areas would need simultaneous edits without a sequencing plan.

## Next Planning Brief Inputs

The Phase 41 planning brief should read this strategy document, the user-edited Phase 40 checklist, Phase 40 completion evidence, roadmaps, testing strategy, and the relevant multiplayer/leaderboard/private-request source and E2E surfaces.

The brief should decide:

- whether Phase 41 is formally rerouted as recommended;
- whether any issue requires an immediate migration/RLS addendum stage;
- whether a Codex-assisted manual-review preflight belongs in Phase 41 final hardening;
- whether a local custom skill should be planned after the workflow is proven, or deferred until the testing protocol stabilizes.
