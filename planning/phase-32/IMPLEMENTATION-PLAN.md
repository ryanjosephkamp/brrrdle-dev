# Phase 32 Implementation Plan

**Status**: Detailed implementation plan for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-24.
**Phase focus**: Multiplayer stabilization, identity routing, global account avatar accent propagation, and rating display consistency.

## Authority

This plan is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, completed Phase 31 postgame actions and current-surface cleanup, completed Phase 30 public leaderboards, completed Phase 29 public profile foundations, completed Phase 28 Live spectator behavior, completed Phase 27 ranked Practice foundations, `planning/phase-32/PLANNING-BRIEF.md`, `planning/specs/phase-32/PHASE-32-MULTIPLAYER-STABILIZATION-IDENTITY-ROUTING-AND-RATING-DISPLAY-SPEC-2026-06-24.md`, `docs/ranked-multiplayer.md`, `docs/supabase.md`, `progress/PROGRESS.csv`, and current progress reports.

This plan does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, Phase 32 implementation, Phase 33 ranked mode expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, private data exposure, local session artifact exposure, or work in the original stable `brrrdle` repository.

## Locked Decisions

The open decisions from the unified Phase 32 specification are now resolved:

- **Rematch refresh**: use immediate refresh after lifecycle actions and selected-game/Multiplayer entry changes, plus a 5-second visible-panel polling cadence while an eligible terminal Practice postgame panel is visible and the document is visible. Do not add Supabase realtime unless Stage 32.1 proves it is needed.
- **Rematch lifecycle messaging**: use in-panel status for decline, cancel, expiry, created, and idempotent states. Do not add browser/foreground notification work in Phase 32 unless it is already available without expanding scope.
- **Ranked queue creator auto-routing**: keep checking while the Multiplayer tab/postgame context is active and visible, with an immediate check after queue entry and a 5-second visible polling cadence until finalization, cancellation, error, or navigation makes the request irrelevant.
- **Lobby creator auto-routing**: route creator-owned joined games when the viewer is on the associated waiting/setup surface or has no actively inspected selected game. Do not steal focus from a different active game the viewer is deliberately inspecting.
- **Opponent identity labels**: derive labels for the current viewer. Use `You` only for the viewer's own seat. For opponents, prefer safe participant profile summaries inside participant views, then public-safe profile summaries when allowed, then generic fallback.
- **No-comma rating display**: apply to Elo/rating values and rank labels tied to rating/leaderboard rows. Do not broadly reformat unrelated counts unless touched locally.
- **E2E sequencing**: add real two-client Supabase-backed E2E after source behavior is stable, not before focused fixes and tests.
- **Future social/profile polish**: keep clickable profiles, in-game Elo identity cards, clickable leaderboard names, Settings Danger Zone actions, and History replay/detail views deferred.

## Execution Principles

- Reproduce or audit every user-observed bug before source fixes.
- Prefer app/domain/repository fixes before migration/RLS work; the default expectation is no new migration.
- Keep participant-only state participant-only and public identity state public-safe.
- Preserve Daily Multiplayer claim safety and answer separation.
- Preserve trusted ranked queue/finalization and trusted Elo settlement. Do not create direct ranked rematches.
- Keep auto-routing helpful but non-invasive: route clearly related newly joined/matched games, but do not steal focus from an intentionally selected active game.
- Add focused tests close to each fix before broad verification.
- Run real two-client Supabase-backed E2E only after the core behavior is stable enough to make the tests meaningful.

## Success Criteria

Phase 32 is complete when:

- saving private `Accent color` updates the global top-right account avatar chip without using public profile state;
- one rematch request is enough for the opponent to see accept/decline controls on the terminal Practice game screen;
- accepting an eligible five-letter unranked non-custom Practice OG no-clock rematch creates or opens a fresh safe game;
- decline, cancel, expiry, created, and idempotent rematch states become visible to the other participant through the Phase 32 refresh path;
- ranked Practice search-again routes the queued creator and matching rival into the finalized durable game without manual `Check ranked queue` intervention;
- unranked lobby creators are routed into newly joined games when safe;
- opponent labels do not show the opponent as `You` and use safe names when available;
- Elo/rating and rating-tied rank labels render without comma separators;
- focused tests and real two-client E2E cover the repaired behavior;
- no Phase 33 ranked expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, or original stable repo work is introduced.

## Stage Breakdown

### Stage 32.0: Implementation Plan Approval And Protected Baseline

**Purpose**: Preserve the planning/spec baseline and verify the repo before implementation.

Deliverables:

- read required governance, Phase 31 completion materials, Phase 32 planning/spec/implementation materials, progress records, ranked docs, Supabase docs, package/test surfaces, and relevant source/test surfaces;
- confirm `pwd`, branch, remotes, `HEAD`, and `origin/main`;
- confirm the original stable `brrrdle` repository is not being used;
- record current uncommitted Phase 32 planning/spec/progress artifacts;
- create Stage 32.0 progress report and CSV row;
- run watched-port/process/resource checks before and after verification;
- run `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, and Python CSV shape check using `python3 -S`.

Exit gate:

- all baseline verification passes, or progress records the exact non-secret failure and Stage 32.1 remains blocked.

### Stage 32.1: Reproduction And Audit

**Purpose**: Prove the bugs and decide whether any SQL/RLS work is truly required.

Deliverables:

- audit/reproduce global account avatar accent not updating after private profile save;
- audit/reproduce one-request rematch visibility gap;
- audit/reproduce eligible rematch projection failure for unranked non-custom Practice OG, Hard Mode off, no clock;
- audit/reproduce decline/cancel/created-state visibility gaps;
- audit/reproduce ranked search-again queued creator not auto-routing;
- audit/reproduce lobby/queue creator not auto-routing when a rival joins or matches;
- audit/reproduce opponent label bugs where the opponent appears as `You` or generic `Rival` despite safe profile data;
- audit/reproduce comma-formatted rating/rank labels;
- inspect exact source and test surfaces for Stage 32.4 through Stage 32.6;
- decide whether Stage 32.2 migration/RLS addendum planning is required.

Verification:

- focused reproduction/audit checks only;
- one local dev server only if browser reproduction requires it, then stop it;
- `git diff --check`;
- Python CSV shape check using `python3 -S`;
- `git status --short --branch`.

Default decision:

- skip Stage 32.2 and Stage 32.3 unless Stage 32.1 proves the existing rematch, ranked queue, or participant game contracts cannot support the fixes safely.

### Stage 32.2: Migration/RLS Addendum Planning If Required

**Purpose**: Plan additive SQL/RLS only if existing contracts are insufficient.

Run only if Stage 32.1 proves a contract gap.

Deliverables:

- create a precise addendum under `planning/specs/phase-32/`;
- define exact additive SQL/RPC/RLS changes;
- preserve participant scoping, Daily claim safety, trusted ranked settlement, public profile boundaries, leaderboard boundaries, and forbidden-field protections;
- include grants, rollback, privacy probes, abuse probes, and verification expectations.

Stop condition:

- if the issue is fixable in app/domain/repository code, do not create a migration/RLS addendum.

### Stage 32.3: Migration/RLS Execution If Required

**Purpose**: Execute the approved addendum only after explicit authorization.

Run only after Stage 32.2 is approved.

Deliverables:

- create at most one additive migration;
- apply only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous;
- run non-printing privacy/abuse probes;
- update progress.

Stop condition:

- stop before remote migration execution if Supabase target, credentials, SQL safety, or probes are ambiguous or failing.

### Stage 32.4: Rematch Lifecycle Stabilization

**Purpose**: Make direct unranked non-custom Practice rematch v1 work as intended.

Likely files/modules:

- `src/multiplayer/postgameActions.ts`;
- `src/multiplayer/multiplayerRepository.ts`;
- `src/multiplayer/MultiplayerPanel.tsx`;
- `src/multiplayer/MultiplayerWorkspace.tsx` if selected-game routing is involved;
- focused tests for postgame actions, repository parsing, and terminal UI.

Deliverables:

- implement the locked rematch refresh path;
- make opponent-visible request state appear without the opponent requesting their own rematch;
- fix safe rematch projection for eligible unranked non-custom Practice games without loosening Daily/ranked/custom/nonterminal exclusions;
- synchronize accept, decline, cancel, expiry, created, and idempotent states;
- preserve the existing `Open new unranked match` behavior;
- add focused domain/repository/component tests.

Verification:

- focused rematch tests first;
- then the stage-required lint/test/build/typecheck/diff/CSV gate.

### Stage 32.5: Queue, Lobby, And Identity Routing Stabilization

**Purpose**: Repair creator auto-routing and opponent identity labels.

Likely files/modules:

- `src/multiplayer/MultiplayerPanel.tsx`;
- `src/multiplayer/MultiplayerWorkspace.tsx`;
- `src/multiplayer/MultiplayerActiveGames.tsx`;
- `src/multiplayer/multiplayer.ts`;
- `src/multiplayer/matchmaking.ts`;
- `src/multiplayer/multiplayerRepository.ts`;
- relevant multiplayer, route, and component tests.

Deliverables:

- implement ranked queue creator auto-routing through existing trusted queue/finalization paths;
- implement safe unranked lobby creator auto-routing when a rival joins;
- avoid stealing focus from a deliberately selected active game;
- derive viewer-specific labels so the viewer can see self as `You` but opponents never render as `You`;
- prefer safe participant profile summaries in participant views, then public-safe names, then generic fallback;
- add focused queue/lobby/identity tests.

Verification:

- focused queue/lobby/identity tests first;
- then the stage-required lint/test/build/typecheck/diff/CSV gate.

### Stage 32.6: Account Avatar And Rating Display Consistency

**Purpose**: Fix the remaining account accent bug and no-comma rating display.

Likely files/modules:

- `src/account/AccountBadge.tsx`;
- `src/account/profile.ts` if shared accent class mapping is useful;
- `src/account/ProfilePanel.tsx` only if shared mapping needs extraction from the existing preview;
- `src/leaderboards/publicRankedLeaderboardViewModels.ts`;
- `src/multiplayer/MultiplayerStatsPanel.tsx` if rating formatting needs a shared helper;
- relevant account, leaderboard, Stats, and rating tests.

Deliverables:

- make the global account avatar chip use saved private `accentColor` when no avatar image is present;
- preserve private profile preview and public profile preview behavior;
- add a dedicated no-comma Elo/rating/rating-rank formatter;
- apply it to public ranked leaderboard rating/rank/peak labels and any other touched rating labels;
- add focused tests.

Verification:

- focused account/rating display tests first;
- then the stage-required lint/test/build/typecheck/diff/CSV gate.

### Stage 32.7: Real Two-Client E2E And Final Hardening

**Purpose**: Lock the gameplay-critical fixes into durable regression coverage and complete Phase 32 documentation.

Deliverables:

- add real two-client Supabase-backed E2E for:
  - one-request rematch visible to opponent;
  - opponent accept creates/opens a fresh game for both participants;
  - decline updates requester;
  - ranked search-again routes both participants into the finalized game;
  - lobby creator auto-routes after rival join;
  - opponent labels use safe names and never show opponent as `You`;
- review all Stage 32 changes for stale copy, duplicate logic, privacy gaps, routing regressions, and docs/progress gaps;
- create `planning/phase-32/CHANGELOG.md`;
- update docs only where needed to reflect Phase 32 outcomes and deferrals;
- run non-printing secret/artifact scans and watched-port/process cleanup checks.

Final verification:

- focused Phase 32 tests;
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

## Migration/RLS Gates

Default: no migration. Stage 32 should use the existing Phase 31 rematch RPCs, Phase 27 ranked queue/finalization RPCs, and participant-scoped game repository seams unless Stage 32.1 proves a contract gap.

Stage 32.2 is required only if:

- rematch lifecycle state cannot be safely listed/refreshed through existing participant-scoped RPCs;
- ranked queue requester state cannot be safely observed/finalized through existing trusted queue RPCs;
- lobby creator game state cannot be safely reconciled through existing participant-scoped game reads;
- or privacy/abuse probes reveal a contract gap.

Any migration must be additive, authenticated-only where participant state is involved, participant-scoped, non-public, and must not expose raw auth IDs, emails, private metadata, answers, seeds, sessions, tokens, private progress, raw queue IDs, rating transaction IDs, settlement IDs, local artifacts, or public/guest spectation data.

## Dependencies And Sequencing

- Stage 32.0 must pass before any implementation.
- Stage 32.1 must decide the migration/RLS path before Stage 32.4.
- Stage 32.4 should precede Stage 32.5 because rematch lifecycle touches the same terminal multiplayer surfaces used for queue/lobby state.
- Stage 32.5 should precede Stage 32.6 because identity-routing decisions may reveal shared display helpers.
- Stage 32.7 should not begin until the fixed behavior is stable enough for real E2E.

## Risk Management

- Keep `src/app/App.tsx` and `src/multiplayer/` single-writer or explicitly sequenced.
- Treat auto-routing as UX state, not authority.
- Do not weaken Daily exclusions, ranked direct-rematch exclusions, or custom/private-code restrictions.
- Keep participant-private profile summaries inside participant views only.
- Do not broaden public profile, leaderboard, or spectator visibility.
- Avoid broad formatting changes that affect non-rating numeric labels.
- If browser or Supabase-backed E2E becomes flaky, record exact non-secret evidence and stop rather than relaxing tests or overstating verification.

## Stop Conditions

Stop and update progress if:

- repo state, branch, or remote target is ambiguous;
- the original stable `brrrdle` repository is being used;
- any required verification command fails;
- a proposed fix requires Elo/gameplay-rule changes;
- a proposed fix requires public/guest spectation, service workers, push infrastructure, deployment, or Phase 33 ranked expansion;
- migration/RLS work appears necessary without a separate addendum and explicit authorization;
- secrets, private data, auth state, screenshots, videos, traces, tokens, local session artifacts, or raw auth IDs would be printed or exposed.

## Open Decisions

No open decisions from the Phase 32 specification remain. The implementation defaults are locked in this plan. Stage 32.1 may uncover blockers or require a migration/RLS addendum, but that is an audit finding and must be reported before proceeding.

## Next Gated Prompt

Use a Stage 32.0 baseline-only prompt next. Do not begin source/runtime implementation, test implementation, Supabase migrations, deployments, commits, pushes, pull requests, merges, releases, branch deletion, Phase 33 ranked expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, or original stable repository work until Stage 32.0 is separately authorized and passes.
