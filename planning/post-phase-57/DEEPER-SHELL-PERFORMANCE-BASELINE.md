# Post-Phase-57 Deeper-Shell Performance Baseline

**Measured:** 2026-07-11.
**Protected source:** `7df20365d9f0dc29bd609a22118403fce6662abd` / `phase-57-golden-2026-07-11`.
**Purpose:** Reproducible before/after evidence for the deeper functional-shell Review Candidate.

## Measurement Boundaries

- Production output was built from the protected source with the repository's installed Vite 8 toolchain.
- Browser measurements used the production preview at `http://127.0.0.1:4173/`, Chromium, and a temporary 390 x 844 viewport where stated.
- Network cache and service-worker interception were bypassed for the cold-load measurement. Warm-cache measurements are not used as a substitute for first-load cost.
- CDP timings are controlled-machine observations, not promises for Android, Safari, Firefox, low-end hardware, or real network latency.
- The complete authority-enabled E2E suite was not rerun for this documentation-only audit. Its accepted 74/74 result and 10.7-minute duration come from Progress Step 532.

## Build And Transfer Baseline

Command: `/usr/bin/time -p npm run build`

| Metric | Phase 57 Golden Checkpoint |
| --- | ---: |
| Build wall time | 5.38 s |
| Transformed modules | 300 |
| Main JavaScript | 1,008.86 kB / 272.81 kB gzip |
| Production CSS | 83.75 kB / 14.02 kB gzip |
| Word-list chunks | 34 |
| Generated JS assets | 36, including runtime and main |
| All generated JS | 6.23 MB raw / 1.94 MB gzip |
| Generated CSS + JS assets | 6.31 MB raw / 1.95 MB gzip |
| HTML module-preload links | 35: runtime plus every word-list chunk |

The main chunk grew from the accepted functional shell's 967.78 kB / 262.53 kB gzip to 1,008.86 kB / 272.81 kB gzip as Phases 55-57 added functionality. That is a 4.2% raw and 3.9% gzip increase, not an unexplained regression.

The important issue is the static word-list graph. `src/data/localWordLists.ts` imports all 34 `src/latest/words_length_N.json` modules. Vite emits separate chunks, but `dist/index.html` module-preloads every one because they remain static dependencies. Chunking therefore reduces main-chunk parse size without deferring network transfer.

## Review Candidate Comparison

| Metric | Golden Checkpoint | Review Candidate | Change |
| --- | ---: | ---: | ---: |
| Transformed modules | 300 | 301 | +1 |
| Main JavaScript | 1,008.86 kB / 272.81 kB gzip | 647.94 kB / 175.79 kB gzip | -35.8% raw / -35.6% gzip |
| Production CSS | 83.75 kB / 14.02 kB gzip | 83.79 kB / 14.03 kB gzip | effectively unchanged |
| Eager word-list requests on Home | 34 | 0 | -100% |
| HTML module-preload links | 35 | 7 | -80% |
| Product route chunks | 0 | 14 | route code deferred until selected |

The Review Candidate keeps one eager answer-free manifest and a typed dynamic registry for lengths 2 through 35. A selected length is imported, canonically validated, normalized with any matching historical definition supplement, and cached only after complete success. Same-length concurrent preparation shares one in-flight request; failed preparation is retryable and never enters the completed cache.

Route presentation now uses retryable `React.lazy` boundaries while canonical App state, repositories, account controls, notifications, Home, and modal ownership remain eager. A route-chunk failure stays inside the single main landmark. Retry performs the already accepted clean reload to Home because Chromium retains failed ES-module URLs for the lifetime of the page; persisted game state remains available for explicit re-entry.

Controlled production-preview checks observed 12 cold-Home requests, 8 JavaScript requests, 227,812 transferred bytes total, 211,274 JavaScript bytes, zero word-list requests, zero route-presentation chunks, 265 DOM elements, and no 390px horizontal overflow. Opening Solo loaded only the Solo workspace; entering Daily Solo then requested only length-5 dictionary/definition assets. The clean production retry probe and development E2E both preserved one main landmark and returned to Home after Retry.

## Cold Home Load

Chromium CDP with cache disabled and the service worker bypassed reported:

| Metric | Cold Home load |
| --- | ---: |
| Total requests observed | 41 |
| JavaScript requests | 36 |
| Total transferred bytes | 1,972,602 |
| JavaScript transferred bytes | 1,954,446 |
| Main JS transfer | 271,272 bytes |
| Word-list/runtime JS transfer | approximately 1.68 MB |
| Script duration through settled Home | 476 ms |
| Browser task duration through settled Home | 511 ms |
| JS heap used after settled Home | approximately 22.9 MB |

The largest transferred assets after main were word lengths 10, 9, 11, 12, 8, 13, 14, 7, and 15. None is needed to render Home. This is measured evidence for on-demand word-bank loading, not evidence that the word data should be deleted or reduced.

## Mobile Shell And Scroll Baseline

At the 390 x 844 override, the Home document reported:

| Metric | Result |
| --- | ---: |
| DOM elements | 312 |
| Document height | 4,045 px |
| Horizontal overflow | none |
| Fixed elements | 1 |
| Sticky elements | 0 |
| Active backdrop filters | 0 |
| Box shadows | 0 |
| Active CSS animations at rest | 0 |
| Elements with nonzero transitions | 18 |

A controlled six-sweep down and six-sweep up scroll loop added approximately 18.2 ms of task time, 12.2 ms of script time, one layout, and one style recalculation. This supports the user's observation that the accepted shell scrolls well. It does not simulate low-end Android hardware or every browser compositor.

Representative route DOM snapshots remained overflow-free:

- Solo: 234 elements; 1,893 px document height.
- Multiplayer: 332 elements; 3,315 px document height.
- Marketplace: 196 elements; 1,539 px document height.
- Settings: 327 elements; 4,277 px document height.

## Idle Activity

Ten seconds on mobile Home produced:

- 10 layouts;
- approximately 17.7 ms script time;
- approximately 35.2 ms browser task time;
- no style recalculations attributable to the interval window.

The root owns two one-second `useDailyCycle` hooks, so countdown updates propagate through `AppInner`. The measured cost is small on this machine. Isolating clocks is a secondary candidate, not justification for a broad state rewrite.

The shell also maintains:

- a 30-second idle / 5-second active Live spectator poll;
- a signed-in five-second private-request notification poll;
- route-scoped five-second ranked queue, private-request, and rematch polls when their conditions are active;
- one realtime multiplayer repository subscription.

Static analysis proves that the signed-in Practice surface can own both the App-level private-request poll and the panel-level private-request poll. Exact duplicate network frequency requires a disposable signed-in measurement before consolidation.

Review Candidate signed-in trace evidence recorded 18 private-request RPC resource requests across two clients during a 13.4-second Practice focus/refocus scenario, plus 2 authenticated Live and 4 public Live requests. The two private-request consumers intentionally use different limits and responsibilities: 100 rows for lifecycle notifications and 20 rows for the visible request center. No polling or ticker source was changed because exact ownership consolidation would require a broader data-sharing decision, while focus/refocus, lifecycle, sound deduplication, ranked queue, rematch, and Live freshness all pass their existing E2E contracts. The measured countdown/scroll cost also remained too small to justify root-state restructuring.

## Source And Dependency Baseline

| Metric | Result |
| --- | ---: |
| TypeScript/TSX/CSS source lines | 59,821 |
| TypeScript/TSX source lines | 59,416 |
| `App.tsx` | 3,112 lines |
| `MultiplayerPanel.tsx` | 2,356 lines |
| `multiplayerRepository.ts` | 2,629 lines |
| `index.css` | 405 lines |
| `LunarSignalStage.tsx` | 157 lines |
| Runtime dependencies | React, React DOM, Supabase JS, Vercel Blob server helper |
| Installed dependency directory | 164 MB local development footprint |

The production main sourcemap contains 214 sources. Source-content size is not emitted-byte attribution, but it identifies concentration:

- React DOM source: approximately 545 kB;
- `src/multiplayer/`: approximately 399 kB;
- Supabase auth source: approximately 385 kB;
- `src/app/`: approximately 262 kB;
- `src/account/`: approximately 224 kB.

There are no route-level `React.lazy` boundaries. `RoutePanel` conditionally renders one route, but all route modules are statically imported into the main graph.

## Verification-Cost Baseline

| Gate | Current result |
| --- | --- |
| Vitest | 141 files / 1,001 tests; 10.74 s measured wall time |
| ESLint | 6.25 s measured wall time |
| Production build | 5.38 s measured wall time |
| API typecheck | 1.23 s measured wall time |
| Playwright discovery | 22 files / 76 scenarios |
| Review Candidate full authority E2E | 76/76, one worker, 10.4 minutes; fresh evidence |

The fast suite is healthy. The browser suite remains intentionally expensive because it uses real authenticated Supabase flows and cleanup. A worker-only canonical five-letter fixture prepares synchronous E2E helper calculations; browser gameplay still exercises the real dynamic loader, including non-default private GO request acceptance.

## Browser Console Observation

The existing in-app browser profile emitted one `Invalid Refresh Token: Refresh Token Not Found` error and recovered to Guest. No storage or token content was inspected. The accepted clean-context 74/74 E2E run did not report this as a product blocker, so this audit classifies it as an environment-specific observation requiring clean-context reproduction before any source fix.

## Reproduction Commands

- `npm run build`
- `./node_modules/.bin/vite build --sourcemap` for local-only module inspection
- `npm run preview -- --host 127.0.0.1 --port 4173`
- `npm run test`
- `npm run lint`
- `npx tsc -p tsconfig.api.json --noEmit`
- `npx playwright test --list`

Generated `dist/` and sourcemaps are ignored local evidence and must not be committed.
