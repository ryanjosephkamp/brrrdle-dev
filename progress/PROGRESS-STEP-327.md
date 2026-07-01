# Progress Step 327 - Phase 39 Stage 39.2 Scroll Measurement And Regression Harness

**Status**: Completed - Awaiting User Review Before Stage 39.3
**Phase**: 39, Mobile Performance And Scroll Smoothness
**Stage**: 39.2, source/test-only scroll measurement and regression harness
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T01:56:49Z
**Completed**: 2026-07-01T01:56:49Z

## Authorization

The user authorized Phase 39 Stage 39.2 only: source/test-only scroll measurement and regression harness using the completed Stage 39.1 mobile scroll and performance audit baseline.

This pass is limited to reading required governance, Phase 39 planning/spec/implementation materials, Stage 39.1 progress, current progress records, app shell/global CSS/shared UI primitives, complex workspace surfaces, existing E2E/browser harnesses, creating this Stage 39.2 progress report and matching 12-column CSV row, implementing the smallest reliable deterministic mobile scroll/layout regression harness, adding focused browser/E2E coverage, and running verification.

This pass does not authorize and did not perform Stage 39.3 shell/CSS/shared UI performance fixes, Stage 39.4 complex workspace tuning, broad mobile UX overhaul, compact navigation, Focus Mode, progression HUD, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `937208ac519860cfa433fa39411c1b077508f26b`.
- `origin/main`: `937208ac519860cfa433fa39411c1b077508f26b`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used.
- The user-edited `planning/phase-38/REVIEW-CHECKLIST.md` checked state was preserved.

## Files Changed

- `e2e/fixtures/assertions.ts` - added deterministic mobile scroll/layout helpers:
  - `ScrollDiagnostics`;
  - `collectScrollDiagnostics`;
  - `expectPageCanScrollVertically`;
  - `expectPageCanScrollToEnd`;
  - `expectLocatorCenterNotCovered`.
- `e2e/layout/mobile-scroll.spec.ts` - added focused mobile viewport coverage for representative scroll-heavy routes.
- `progress/PROGRESS-STEP-327.md` - recorded Stage 39.2 evidence and boundaries.
- `progress/PROGRESS.csv` - appended row `327`.

## Harness Behavior Implemented

The new Playwright harness uses a `390x844` mobile viewport with touch/mobile context enabled and navigates through the real primary route rail.

It covers:

- Home;
- Solo;
- Calendar;
- Multiplayer;
- History;
- Stats;
- Leaderboard;
- Word Explorer using the stable `Words` route control;
- Profile;
- Settings;
- About Brrrdle.

For each route, it asserts:

- no console/page failures through the existing guard;
- no horizontal overflow;
- expected vertical scrollability;
- scroll-to-bottom and scroll-back-to-top behavior;
- route heading center is not covered by fixed/sticky overlays;
- route rail control center is not covered where applicable.

The harness also emits non-authoritative diagnostics for each route:

- `scrollHeight`;
- `clientHeight`;
- `scrollWidth`;
- `clientWidth`;
- `maxScrollY`;
- visible fixed/sticky/backdrop/shadow counts;
- a coarse `requestAnimationFrame` scroll-loop elapsed value.

The timing and visual-layer counts are intentionally diagnostic only. No brittle FPS or frame-time pass/fail threshold was added.

## Focused Harness Evidence

Focused Playwright command:

- `npx playwright test e2e/layout/mobile-scroll.spec.ts`

Result:

- `11 passed`

Representative diagnostics from the passing run:

- Home: `scrollHeight=4308`, `scrollWidth=390`, `clientWidth=390`, `maxScrollY=3464`, `backdrop=24`, `shadow=48`.
- Multiplayer: `scrollHeight=2780`, `scrollWidth=390`, `clientWidth=390`, `maxScrollY=1936`, `backdrop=22`, `shadow=45`.
- Leaderboard: `scrollHeight=3318`, `scrollWidth=390`, `clientWidth=390`, `maxScrollY=2474`, `backdrop=22`, `shadow=45`.
- Word Explorer: `scrollHeight=9708`, `scrollWidth=390`, `clientWidth=390`, `maxScrollY=8864`, `backdrop=19`, `shadow=137`.
- Settings: `scrollHeight=4738`, `scrollWidth=390`, `clientWidth=390`, `maxScrollY=3894`, `backdrop=22`, `shadow=41`.

The Word Explorer route is now covered through stable navigation and currently shows the highest diagnostic shadow count. This is evidence for Stage 39.4 workspace tuning, not a Stage 39.2 failure.

## Verification

Stage 39.2 verification passed:

- focused Playwright harness: `npx playwright test e2e/layout/mobile-scroll.spec.ts` reported `11 passed`
- `npm run lint`
- `npm run test` reported `109` files and `764` tests passed
- `npm run build` passed with the existing Vite large-chunk advisory
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S` reported `rows=329 columns=[12] last_id=327`
- non-printing credential-shaped secret/artifact scan reported `scanned_files=20 credential_pattern_hits=0`
- ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- watched-port cleanup check found no listeners on `5173`, `5174`, `3000`, or `4173`
- `git status --short --branch`

## Blockers And Open Questions

No blockers prevent Stage 39.3 from proceeding after user review.

Open decisions for Stage 39.3:

- Which mobile visual-effect reductions should be applied first: shared `Panel`, shell route surfaces, route rail buttons, notification surfaces, or selected card/list utilities.
- Whether to include a small diagnostic-budget assertion in a later stage after Stage 39.3 has produced before/after evidence, or keep visual-layer counts as logs only.
- Whether tooltip scroll listener tuning should happen in Stage 39.3 or wait until a tooltip-open route shows measurable scroll work.

## Boundary Confirmation

No Stage 39.3 shell/CSS/shared UI performance fixes, Stage 39.4 complex workspace tuning, broad mobile UX overhaul, compact navigation, Focus Mode, progression HUD, Supabase migration, Vercel/Supabase configuration change, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation change, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
