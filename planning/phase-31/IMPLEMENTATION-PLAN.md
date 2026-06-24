# Phase 31 Implementation Plan

**Status**: Detailed execution plan for review.
**Repository**: `brrrdle-dev`
**Created**: 2026-06-23
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, completed Phase 30 public leaderboards and Multiplayer Overview cleanup, completed Phase 29 public profile foundations, completed Phase 28 Live spectator stabilization, completed Phase 27 ranked Practice foundations, `planning/phase-31/PLANNING-BRIEF.md`, `planning/specs/phase-31/PHASE-31-MULTIPLAYER-POSTGAME-ACTIONS-AND-CURRENT-SURFACE-CLEANUP-SPEC-2026-06-23.md`, and the current progress ledger.

This plan does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, Phase 31 implementation, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, new custom skills, force-push, secret printing, or work in the original stable `brrrdle` repository.

## Purpose

Phase 31 should add safe Practice-only multiplayer postgame convenience actions while cleaning up a small set of current user-facing surfaces.

The implementation should make it easier to continue playing after a completed Practice multiplayer game without weakening any authority boundary:

- rematch request/accept with the same opponent and same settings, only where a safe durable flow exists;
- same-settings play-again or search-again actions for Practice multiplayer variants;
- no Daily rematches, Daily replay shortcuts, or Daily search-again shortcuts;
- no gameplay-rule, scoring, timeout, forfeit, Elo, settlement, or ranked-mode expansion changes.

The same phase should also fix approved narrow current-surface issues:

- private profile accent preview not reflecting the selected accent;
- Stats chart/accessibility hidden text visually overlapping chart cards;
- About expected-score formula formatting;
- Competitive multiplayer rating-bucket clarity, dedupe, and stale copy cleanup.

## Execution Principles

- Preserve the completed Phase 30, 29, 28, and 27 behavior unless a Phase 31 stage explicitly changes a narrow approved surface.
- Keep Daily Multiplayer strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Keep ranked Practice v1 as the only ranked match type. Daily ranked, timed Practice ranked, ranked custom/private-code games, and rank labels remain Phase 32 or later.
- Prefer existing repository seams, route helpers, queue helpers, game creation paths, and UI patterns over new abstractions.
- Add durable state only when Stage 31.1 proves local-only rematch state cannot safely represent mutual intent.
- Use additive Supabase/RLS changes only behind a separate Stage 31.2 addendum and Stage 31.3 execution authorization.
- Do not expose raw auth IDs, emails, private profile metadata, private progress, answers, seeds, sessions, rating transaction IDs, queue IDs, match IDs, tokens, or local artifacts.
- Make current-surface cleanup small and testable. These fixes should not become broad redesign work.
- Run focused tests first in implementation stages, then the wider verification gate requested by each stage prompt.

## Success Criteria

Phase 31 is complete when:

- completed Practice multiplayer games offer clear, safe next actions without affecting Daily Multiplayer or gameplay authority;
- rematch request/accept, if implemented, requires both eligible players and preserves same-opponent/same-settings semantics;
- same-settings play-again/search-again works only for eligible Practice contexts and respects ranked/unranked boundaries;
- ranked Practice search-again continues through trusted queue behavior unless a separately approved migration/RLS contract safely permits direct ranked rematch creation;
- Daily Multiplayer never exposes rematch, replay, or search-again shortcuts that bypass claims or leak answers;
- the private profile accent preview follows the selected private accent before save without affecting the public accent contract;
- Stats chart cards no longer show hidden accessibility labels as visible overlapping text;
- the About expected-score formula is readable, non-italic, and still represents the unchanged Phase 27 Elo formula;
- rating buckets display one clear latest row per valid bucket with labels such as `Ranked Practice OG` and `Ranked Practice GO`;
- stale ranked copy that still describes public leaderboards as deferred is removed or updated;
- final verification evidence is captured in `planning/phase-31/CHANGELOG.md`, progress reports, and the Phase 31 handoff materials.

## Stage Breakdown

### Stage 31.0: Implementation Plan Approval And Protected Baseline

Goal: preserve the Phase 31 planning/spec/progress baseline before any source work.

Allowed work:

- read required governance, planning, progress, package, and testing surfaces;
- confirm `pwd`, branch, remotes, `HEAD`, and `origin/main`;
- confirm the original stable `brrrdle` repository is not being used;
- record existing uncommitted Phase 31 planning/spec/progress artifacts;
- create the Stage 31.0 progress report and matching CSV row;
- run watched-port/process/resource checks for `5173`, `5174`, `3000`, and `4173`;
- run `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, and the Python CSV shape check using `python3 -S`.

Exit gate:

- if any baseline command fails, update progress with the exact non-secret failure and stop before Stage 31.1;
- if clean, halt with a copy-safe Stage 31.1 audit prompt.

### Stage 31.1: Postgame And Current-Surface Audit Only

Goal: reproduce and map exact implementation routes before code changes.

Audit items:

- terminal multiplayer game surfaces for completed Practice OG/GO games;
- ranked Practice queue, settlement, and terminal state behavior;
- unranked Practice lobby/custom code behavior;
- Daily Multiplayer terminal behavior and claim boundaries;
- existing game creation, lobby, selected-game, active-game, route, and notification action paths;
- whether rematch mutual intent needs new durable Supabase state;
- private profile accent preview wiring;
- Stats chart hidden data-table and visually hidden class behavior;
- About expected-score copy and section anchoring;
- competitive rating bucket data normalization, dedupe needs, label mapping, and stale copy.

Required decision:

- report whether Stage 31.2 migration/RLS addendum planning is required before postgame implementation.

Exit gate:

- if durable mutual-intent state, direct ranked rematch creation, or new RPC/policy behavior is required, stop with a Stage 31.2 addendum prompt;
- if no migration/RLS work is required, stop with the next safe app implementation prompt.

### Stage 31.2: Rematch Migration/RLS Addendum Planning

Goal: create a precise addendum only if Stage 31.1 proves durable database support is needed.

The addendum should define:

- table/RPC shape for rematch request and acceptance, if needed;
- participant-only access, owner/opponent checks, expiry, idempotency, spam prevention, and wrong-account protections;
- same-settings constraints for Practice-only rematches;
- ranked Practice restrictions and whether direct same-opponent ranked rematch is allowed or whether ranked must use queue search-again only;
- forbidden fields and privacy probes;
- grants, RLS policies, rollback plan, verification strategy, and probe plan.

Exit gate:

- no SQL migration is created or applied in this stage;
- if clean, halt with explicit Stage 31.3 migration execution authorization prompt.

### Stage 31.3: Rematch Migration/RLS Execution

Goal: implement one approved additive migration only if Stage 31.2 exists and is approved.

Execution constraints:

- create exactly one additive migration under `supabase/migrations/`;
- apply only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous;
- preserve existing async multiplayer, ranked queue, settlement, public profile, leaderboard, and Live spectator contracts;
- run non-printing privacy/RLS probes from the addendum;
- stop if target, credentials, SQL safety, or probes are ambiguous or fail.

Exit gate:

- if successful, halt with Stage 31.4 postgame app foundations prompt.

### Stage 31.4: Postgame Domain And Repository Foundations

Goal: add safe domain/repository support for Phase 31 postgame actions.

Likely deliverables:

- same-settings extraction helpers for Practice multiplayer terminal games;
- eligibility helpers that reject Daily games, unfinished games, malformed rows, unsupported ranked modes, timed ranked, and wrong participants;
- rematch/request repository seam if Stage 31.3 created one;
- same-settings unranked lobby creation or setup helpers using existing safe game creation paths;
- ranked Practice search-again helpers that keep queue behavior authoritative;
- strict DTO parsing and privacy guards for any new repository contract.

Testing:

- focused domain/repository tests for eligible/ineligible games, Daily rejection, ranked/unranked boundaries, same-settings preservation, stale/expired request behavior if applicable, idempotency, and privacy.

Exit gate:

- run focused tests first, then the requested lint/test/build/typecheck/diff/CSV gate.

### Stage 31.5: Postgame UI Integration

Goal: expose the approved postgame actions in terminal Practice multiplayer UI.

Likely deliverables:

- terminal game action area with clear primary actions such as `Request rematch`, `Accept rematch`, `Waiting for rival`, `Search again`, or `Play again`;
- same-opponent rematch affordance only where supported by Stage 31.4/31.3;
- same-settings search-again for ranked Practice through the trusted queue;
- same-settings play-again/open-lobby action for unranked Practice where safe;
- clear disabled/hidden states for Daily games, timed ranked placeholders, malformed games, nonparticipants, and nonterminal games;
- no mutation of gameplay result, scoring, forfeit, timeout, Elo, settlement, Daily claim, or leaderboard authority.

Testing:

- component and route tests for terminal action rendering, Daily exclusion, ranked/unranked branches, request/accept state, loading/error states, and selected/active game preservation;
- browser/E2E coverage where needed for two-user mutual-intent or queue flows.

### Stage 31.6: Current-Surface Cleanup

Goal: implement the approved small cleanup items after core postgame work is stable.

Deliverables:

- make the private `Accent color` preview in `Your profile` reflect the selected private accent before save, while keeping public accent behavior separate;
- fix Stats chart/accessibility overlap by using the repository's intended visually hidden utility or an equivalent accessible pattern that remains invisible visually;
- format the About expected-score formula as a readable block after `curve:` without changing the formula or adding heavy dependencies;
- make competitive rating-bucket labels user-friendly and explicit, likely `Ranked Practice OG` and `Ranked Practice GO`;
- dedupe rating profiles to the latest valid profile per user/bucket before display;
- reject or hide malformed/legacy bucket values instead of silently displaying multiple `MULTIPLAYER OG` rows;
- replace `trusted settlement` copy with plainer user-facing language where appropriate;
- remove stale copy that describes public leaderboards as deferred now that Phase 30 exists.

Testing:

- focused profile, Stats, About, and multiplayer stats tests for the touched surfaces;
- include regression coverage for private/public accent separation, hidden accessibility data, formula copy, valid bucket labels, dedupe, and malformed buckets.

### Stage 31.7: Final Hardening And Completion Documentation

Goal: complete Phase 31 with cleanup, documentation, and full verification.

Deliverables:

- review Stage 31.1 through 31.6 for stale copy, duplicated logic, privacy gaps, postgame regressions, current-surface regressions, docs gaps, and progress gaps;
- create `planning/phase-31/CHANGELOG.md`;
- update docs only where they improve reviewer understanding, including ranked docs or Supabase docs if migrations/RLS were added;
- run focused tests for touched files, then full verification:
  - `npm run lint`;
  - `npm run test`;
  - `npm run test:e2e`;
  - `npm run test:full`;
  - `npm run build`;
  - `npx tsc -p tsconfig.api.json --noEmit`;
  - `git diff --check`;
  - Python CSV shape check using `python3 -S`;
  - non-printing secret/artifact scan;
  - watched-port/process cleanup checks.

Exit gate:

- halt with a Phase 31 Git handoff preparation prompt if clean;
- do not stage, commit, push, open a PR, merge, release, deploy, or delete branches.

## Likely Files And Modules

Planning and progress:

- `planning/phase-31/PLANNING-BRIEF.md`
- `planning/specs/phase-31/PHASE-31-MULTIPLAYER-POSTGAME-ACTIONS-AND-CURRENT-SURFACE-CLEANUP-SPEC-2026-06-23.md`
- `planning/phase-31/IMPLEMENTATION-PLAN.md`
- future `planning/specs/phase-31/*REMATCH*MIGRATION*RLS*ADDENDUM*.md` if needed
- future `planning/phase-31/CHANGELOG.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`
- `memory.md`

Postgame app surfaces:

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
- relevant multiplayer tests and E2E specs

Current-surface cleanup:

- `src/account/ProfilePanel.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/stats/charts/*`
- `src/index.css`
- `src/app/App.tsx`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/rankedLeaderboardProjections.ts`
- relevant profile, Stats, About, and multiplayer stats tests

Supabase/RLS, only if separately authorized:

- `docs/supabase.md`
- future additive migration under `supabase/migrations/`
- existing migrations for async multiplayer games, ranked queues, trusted settlement, public profiles, and public leaderboards

## Dependencies And Sequencing

- Stage 31.0 must pass before Stage 31.1.
- Stage 31.1 must decide whether durable rematch state is required before any implementation.
- If Stage 31.2/31.3 are required, they must precede repository and UI work that depends on new RPCs or policies.
- Stage 31.4 should stabilize domain and repository semantics before UI wiring.
- Stage 31.5 should not invent persistence or authority rules that Stage 31.4 did not define.
- Stage 31.6 should run after postgame UI integration to reduce cross-surface churn.
- Stage 31.7 should be the only stage that broadens to full hardening and changelog completion.

## Migration And RLS Gates

Do not create or run a migration unless Stage 31.1 proves one is required and the user separately authorizes Stage 31.2 and Stage 31.3.

Migration/RLS work is required if Phase 31 needs any of the following:

- durable rematch mutual-intent state that survives refreshes or cross-device sessions;
- participant-only rematch request visibility;
- a trusted direct rematch creation RPC;
- ranked rematch support beyond queue search-again;
- new policy or grant behavior for postgame actions.

Migration/RLS work is not required for purely local UI cleanup, About copy, profile preview rendering, Stats chart accessibility fixes, rating-bucket display cleanup, or existing queue/search-again flows that use already-approved contracts.

## Verification Expectations

Every implementation stage should run focused tests first. Broad commands should be sequential to avoid resource pressure.

Expected commands by later implementation stages:

- focused tests for touched files;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- Python CSV shape check using `python3 -S`.

Stage 31.7 should additionally run:

- `npm run test:e2e`;
- `npm run test:full`;
- non-printing secret/artifact scan;
- watched-port/process cleanup checks.

Use real two-client Supabase-backed verification only when a postgame claim depends on cross-account state, durable mutual intent, ranked queue behavior, or remote RLS policy behavior. Do not print secrets, auth state, private user data, screenshots, videos, traces, or local session artifacts.

## Stop Conditions

Stop and report if:

- the worktree contains unexpected unrelated changes that make safe planning or implementation ambiguous;
- the original stable `brrrdle` repository is the active workspace;
- a required verification command fails;
- Supabase target or credentials are ambiguous;
- a proposed rematch route would bypass Daily claims or answer separation;
- ranked rematch would bypass trusted ranked queue/settlement behavior without an approved RLS contract;
- implementation would require Phase 32 ranked-mode expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, or gameplay-rule changes;
- a secret, token, auth state, private data, generated artifact, screenshot, video, trace, or local session artifact would be staged, printed, or exposed.

## Risk Management

- **Daily bypass risk**: never show Daily postgame rematch, replay, or search-again actions.
- **Ranked fairness risk**: prefer trusted queue search-again for ranked Practice; direct same-opponent ranked rematches need explicit RLS/addendum support and anti-abuse review.
- **Spam risk**: rematch request state needs expiry, idempotency, and per-game or per-opponent throttling if it becomes durable.
- **Privacy risk**: postgame and profile surfaces must not expose raw identities or private metadata.
- **UI ambiguity risk**: terminal actions must clearly distinguish rematch with the same player from search/play-again with same settings.
- **Accessibility risk**: hidden Stats chart data must remain available to assistive tech without visible overlap.
- **Data normalization risk**: rating-bucket display should dedupe and reject malformed buckets rather than papering over stale data.

## Open Decisions

- Does same-opponent rematch require durable Supabase state, or can an existing lobby/game path safely represent mutual intent?
- Should ranked Practice rematch be direct same-opponent only after a new trusted RPC, or should Phase 31 only provide ranked search-again through the queue?
- For unranked Practice, should `Play again` create a new private-code lobby immediately or route to the Lobby tab with settings prefilled?
- How long should rematch requests remain valid before expiry?
- Should malformed/legacy rating buckets be hidden, grouped under an `Unknown` label, or surfaced in diagnostics only?
- Should the About expected-score formula use plain semantic markup only, or a lightweight math-style component already present in the app?

## Explicit Deferrals

- Phase 32 ranked mode expansion / competitive ladder v2, including timed Practice ranked, Daily ranked, ranked custom/private-code games, and optional rank labels.
- Phase 33 public/guest spectation.
- Phase 34 theme proposal/template modernization.
- Phase 35 or later full concrete theme implementation.
- Service workers, push subscriptions, background push, production deployment configuration, and production release.
- Elo algorithm changes, rating authority changes, settlement-rule changes, scoring changes, timeout changes, forfeit-rule changes, and gameplay-rule changes.

## Next Gated Action

The next safe action is Stage 31.0 baseline only. Stage 31.0 should preserve the current planning baseline, run the protected verification gate, and halt before Stage 31.1 audit or any source/runtime implementation.
