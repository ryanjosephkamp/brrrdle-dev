# Post-Phase-57 Deeper Functional-Shell Optimization Implementation Plan

**Status:** Implementation-ready plan; execution remains separately gated.
**Protected baseline:** `7df20365d9f0dc29bd609a22118403fce6662abd`, tag/Release `phase-57-golden-2026-07-11`.
**Goal:** Reduce avoidable initial loading and duplicate active work while preserving the complete Phase 57 functionality inventory and current shell presentation.

## Architecture Decision

Keep React 19, Vite 8, TypeScript, Tailwind's existing build integration, shared UI primitives, Supabase repositories, API routes, and all 38 migrations. Introduce selective loading inside the existing application.

No dependency, framework, backend, migration, deployment, gameplay, economy, rating, or product-content change is part of this plan.

## Stage 0 - Protected Baseline And Characterization

### Objectives

- Re-verify the exact Golden Checkpoint, clean `main`, and source/test counts.
- Reproduce the production build and cold-load baseline from `DEEPER-SHELL-PERFORMANCE-BASELINE.md`.
- Add failing characterization/tests before changing source.

### Tests To Add First

- A build-manifest or browser assertion proving the current Home preload includes all word banks, then invert it only after the fix.
- Per-length 2-35 word-loader success and schema validation.
- concurrent same-length request deduplication;
- cache reuse, failed load, retry, unsupported length, refreshed-source precedence, and no partial-cache state;
- Daily OG/GO and Daily Multiplayer deterministic answer/sequence equality before and after asynchronous preparation;
- guest and authenticated Practice seed equality;
- resume before selected length is loaded;
- PWA/offline characterization for previously loaded and never-loaded lengths;
- route loading/failure fallback semantics, browser navigation, Home-on-refresh, and draft/resume preservation;
- clean-context initial console/network assertion.

### Gate

Characterization must pass on the protected source except tests intentionally proving the current eager-load condition. Stop if current offline or deterministic behavior cannot be represented without a broader product decision.

## Stage 1 - On-Demand Word-Bank Boundary

### Owned Surfaces

- `src/data/localWordLists.ts` and narrowly related loader/cache modules;
- game/data preparation helpers;
- the smallest required Solo, Daily, Calendar, Multiplayer, and Word Explorer entry/loading surfaces;
- focused data/game tests and loading E2E.

### Implementation Shape

1. Keep supported-length and manifest metadata eager and answer-free.
2. Replace 34 static dictionary imports with one typed lazy import registry.
3. Add a per-length preparation function that:
   - deduplicates concurrent requests;
   - validates through the canonical schema;
   - normalizes seed definitions exactly once;
   - caches only successful results;
   - exposes retryable non-secret failures.
4. Preserve synchronous canonical game logic after preparation. Do not make reducers, tile scoring, answer selection, or submissions network-dependent.
5. Ensure resume and direct route entry await the required length through a compact accessible loading state.
6. Preserve refreshed remote-list precedence and existing fallback behavior.
7. Keep errors and asset identifiers answer-free.

### Required Focused Verification

- all Stage 0 loader/determinism/cache/failure tests;
- Solo OG/GO Daily/Practice focused tests;
- Daily Multiplayer and ranked Daily setup/answer-separation tests;
- Word Explorer and Calendar focused tests;
- guest and authenticated consumable persistence tests;
- cold Home network assertion: zero word-list chunks before a length is requested;
- request the same length twice and prove one module request plus cache reuse;
- request distinct lengths and prove only those chunks load.

### Gate

Target cold Home JavaScript transfer: no more than 400 kB in the controlled preview. Stop rather than bypass canonical validation, duplicate source data, expose answers, or change deterministic selection.

## Stage 2 - Route-Level Loading Boundaries

### Ownership And Sequencing

One coordinator owns `src/app/App.tsx` and the route integration. Route workers, if used, own disjoint new presentation modules only. No parallel edits to `App.tsx`, navigation state, `index.css`, or gameplay entry wiring.

### Implementation Shape

1. Extract route presentation from `RoutePanel` without moving canonical App state or repository authority.
2. Keep shell/Home, account badge, notification center, auth/password dialogs, and required initialization eager.
3. Add lazy groups for:
   - Solo/Daily/Calendar gameplay;
   - Multiplayer/Live/Lobby/spectator;
   - Stats/Leaderboard/History/Word Explorer;
   - Profile/Settings/Public Profile;
   - Admin;
   - smaller support/Marketplace surfaces only when emitted-chunk evidence justifies them.
4. Add accessible loading and retry/failure states that do not resize or obscure navigation.
5. Preserve browser Back/Forward and Home-on-refresh.
6. Preserve in-memory drafts, selected games, focused spectator state, and modal/account state across ordinary navigation.
7. Consider focus/hover preloading only after cold-load budgets pass; never preload every route at startup.

### Required Focused Verification

- route availability and one-main-landmark checks;
- browser Back/Forward and refresh policy;
- direct resume for all four Solo slots and participant multiplayer games;
- account/public-profile/settings navigation;
- notification and request-created direct routing;
- Marketplace purchase and Practice consumable entry;
- lazy failure/retry and visible focus;
- mobile overflow and scroll tests;
- build output listing intended chunks and no all-route eager dependency.

### Gate

Planning target: main JavaScript gzip at least 15% below 272.81 kB, unless source evidence documents why a smaller safe reduction is the responsible limit. No route may lose an action, state, accessible name, or accepted workflow to meet the target.

## Stage 3 - Measured Polling And Root-Render Hardening

This stage is conditional. Do not change timers or polling until disposable-account measurements prove duplicated work after Stages 1-2.

### Characterize

- named RPC request counts over fixed visible Home, Practice request-center, ranked queue, Live, and background/foreground windows;
- request lifecycle notification latency and sound/item deduplication;
- App/render/commit activity from the two countdown clocks;
- cleanup after route, auth, visibility, and context changes.

### Allowed Narrow Changes

- one participant-owned private-request refresh source feeding notifications and the request center;
- shared in-flight/cache semantics for identical request reads;
- countdown state separation so per-second labels do not force unrelated route composition to recalculate;
- route-aware Live refresh only if Home, badges, focus recovery, and spectator freshness remain equivalent.

### Focused Verification

- Phase 56 request center, preferences, blocking, lifecycle, notification, and direct-entry tests;
- focus/refocus and no-flash E2E;
- ranked queue and rematch polling;
- Live spectator/public/participant freshness;
- Daily reset alert/date-key behavior;
- timer/listener cleanup assertions;
- before/after named RPC count report.

### Gate

Skip any change whose measurable benefit is negligible or whose freshness contract becomes ambiguous. This stage must not become a new data-fetching architecture.

## Stage 4 - Integration And Maintainability Cleanup

Remove dead imports, obsolete eager-loader plumbing, and presentation composition made unreachable by Stages 1-3. Extract from `App.tsx`, `MultiplayerPanel.tsx`, or `multiplayerRepository.ts` only where the extraction supports the new loading/ownership boundary.

Do not pursue file size, abstraction count, or stylistic uniformity as standalone goals. Do not change public interfaces unrelated to the measured optimization.

Run focused tests after each deletion or ownership move.

## Stage 5 - Complete Verification And Review Candidate

Run sequentially:

1. focused Stage 0-4 tests;
2. `npm run lint`;
3. `npm run test`;
4. `npm run build`;
5. `npx tsc -p tsconfig.api.json --noEmit`;
6. complete authority-enabled `npm run test:e2e` with one worker;
7. desktop and 390px browser checks for Home, Solo, Multiplayer, Marketplace, Settings, Stats, Leaderboard, Profile, and representative game states;
8. cold/warm load, selected-length, route chunk, console/network, scroll, idle, and cleanup measurements;
9. exact Supabase migration-history and catalog-fingerprint non-drift proof;
10. diff, CSV, secret/artifact, ignored-artifact, watched-port, and process cleanup checks.

Update the performance baseline with an explicit before/after table. Do not claim improvement from source size or subjective smoothness alone.

Create a comprehensive manual checklist mapped to every preservation-inventory ID affected by loading or ownership changes. Prepare an ignored Review Candidate Backup prompt and halt. Do not perform Git/GitHub backup from the implementation prompt.

## Stage 6 - Manual Review, Final Acceptance, And Checkpoint

These remain separate authorizations:

1. governed Review Candidate Backup;
2. hosted/manual desktop and mobile review;
3. bounded same-phase recovery as needed;
4. Final Acceptance closure and backup;
5. annotated Golden Checkpoint tag and GitHub Release for the exact accepted optimized commit;
6. Phase 58 plan refresh against that checkpoint.

## High-Conflict Files

- `src/app/App.tsx`
- `src/data/localWordLists.ts`
- `src/data/loadWordList.ts`
- `src/data/wordRepository.ts`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/calendar/CalendarPanel.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerRepository.ts`
- `src/index.css`
- preservation, testing, roadmap, progress, and changelog artifacts

Sequence these surfaces. One writer owns each high-conflict file at a time.

## Hard Stop Conditions

Stop if implementation requires:

- gameplay, answer-selection, Daily claim, reward, economy, consumable, rating, queue, request, privacy, persistence, or spectator behavior changes;
- a migration, RPC, RLS, grant, schema, data, Auth, Storage, or deployment change;
- a dependency install/removal, lockfile change, framework migration, or component-system adoption;
- weakening behavioral, accessibility, authority, cleanup, or complete real-E2E coverage;
- duplicating authoritative word data or exposing answers/private identifiers;
- sacrificing PWA/offline behavior without an explicit user decision;
- broad visual redesign, Phase 58 concept work, or Phase 59 rebuild work;
- stable `brrrdle` access.

If a stop condition is reached, preserve the Golden Checkpoint, report the exact evidence, and prepare the smallest recovery or decision prompt.
