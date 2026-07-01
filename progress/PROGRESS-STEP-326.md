# Progress Step 326 - Phase 39 Stage 39.1 Mobile Scroll And Performance Audit

**Status**: Completed - Awaiting User Review Before Stage 39.2
**Phase**: 39, Mobile Performance And Scroll Smoothness
**Stage**: 39.1, read-only mobile scroll and performance audit and scope lock
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T01:44:24Z
**Completed**: 2026-07-01T01:46:23Z

## Authorization

The user authorized Phase 39 Stage 39.1 only: read-only mobile scroll and performance audit and scope lock using the completed Stage 39.0 protected baseline.

This pass is limited to reading required governance, Phase 39 planning/spec/implementation materials, Stage 39.0 progress, current progress records, app shell/global CSS/shared UI primitives, complex workspace surfaces, relevant tests, E2E/browser harnesses, creating this Stage 39.1 progress report and matching 12-column CSV row, running focused read-only/browser/resource checks as needed, and deciding the safest Stage 39.2 measurement/regression harness path.

This pass does not authorize and did not perform source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `937208ac519860cfa433fa39411c1b077508f26b`.
- `origin/main`: `937208ac519860cfa433fa39411c1b077508f26b`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used.
- The user-edited `planning/phase-38/REVIEW-CHECKLIST.md` checked state was preserved.

## Audit Surfaces Reviewed

- Governance and Phase 39 planning surfaces: constitution, prompt package standard, phase scope sizing guide, Phase 39 planning brief, unified specification, implementation plan, testing suite, Stage 39.0 progress, current progress CSV, agents guide, memory, and package scripts.
- App shell and global styling: `src/index.css`, `src/app/App.tsx`, and `src/app/LunarSignalStage.tsx`.
- Shared UI primitives: `src/ui/Panel.tsx`, `src/ui/Button.tsx`, `src/ui/Keyboard.tsx`, `src/ui/Tooltip.tsx`, and `src/ui/SubtabBar.tsx`.
- Complex workspace surfaces: Dashboard, Multiplayer workspace/Active Games/Lobby/Live, Leaderboard, Stats, History, Settings, Profile, and related route/layout surfaces.
- Existing E2E/browser harnesses, especially `e2e/fixtures/assertions.ts` and current console/horizontal-overflow guard usage.

## Audit Findings

1. Existing browser/E2E helpers already provide console/page-error collection and a deterministic horizontal-overflow assertion, but they do not yet cover mobile scrollability, overlay occlusion, scroll reachability, or route-level scroll diagnostics across heavy surfaces.
2. Global shell and component styling contain many mobile-visible `backdrop-filter`/`backdrop-blur` and shadow layers. The repeated use of `Panel` (`shadow-2xl backdrop-blur-xl`) plus shell panels, route rail buttons, notification panels, route headers, cards, and tables is the most plausible source of mobile scroll paint cost.
3. The mobile gameplay keyboard is `sticky` at small widths and uses `max-md:backdrop-blur-sm`. Gameplay itself was reported as fast, so any keyboard tuning should be measured and kept narrow rather than treated as the primary suspected issue.
4. Tooltip positioning attaches resize and capture-phase scroll listeners only while a tooltip is open. This is a lower-priority risk than always-visible blur/shadow/card density, but Stage 39.3 can tune it if Stage 39.2 shows tooltip-open scroll cost or unnecessary scroll work.
5. Complex workspace routes are long on mobile and often combine nested `Panel` surfaces, repeated cards, responsive tables, and status/readout side panels. Multiplayer, Leaderboard, Stats, History, Settings, Profile, Calendar, About, and Solo are better Stage 39.2 representative surfaces than a single gameplay-only route.
6. The current route shell has mobile compaction rules and did not show horizontal overflow in the read-only browser probe, so Phase 39 should focus first on measured scroll/paint tuning, not a broad navigation or mobile UX redesign.
7. No migration/RLS addendum is required for Phase 39 Stage 39.2, Stage 39.3, or Stage 39.4 based on this audit. The likely work remains source/test/CSS-only.

## Browser And Resource Observations

- Pre-browser watched-port checks found no listeners on `5173`, `5174`, `3000`, or `4173`.
- One temporary local Vite dev server was started on `127.0.0.1:5173` for read-only browser diagnostics, then stopped.
- A mobile Chromium probe at `390x844` found no console/page errors and no horizontal overflow on sampled routes.
- Sampled long-route diagnostics showed structural scrollability and dense visible blur/shadow layers:
  - Home: `scrollHeight=4308`, `scrollWidth=390`, `clientWidth=390`, visible costly-layer counts `fixed=2`, `backdrop=24`, `shadow=48`.
  - Multiplayer: `scrollHeight=2680`, `scrollWidth=390`, `clientWidth=390`, visible costly-layer counts `fixed=2`, `backdrop=19`, `shadow=43`.
  - Leaderboard: `scrollHeight=3318`, `scrollWidth=390`, `clientWidth=390`, visible costly-layer counts `fixed=2`, `backdrop=22`, `shadow=45`.
  - Stats: `scrollHeight=3386`, `scrollWidth=390`, `clientWidth=390`, visible costly-layer counts `fixed=2`, `backdrop=18`, `shadow=34`.
  - History: `scrollHeight=2876`, `scrollWidth=390`, `clientWidth=390`, visible costly-layer counts `fixed=2`, `backdrop=21`, `shadow=40`.
  - Settings: `scrollHeight=4738`, `scrollWidth=390`, `clientWidth=390`, visible costly-layer counts `fixed=2`, `backdrop=22`, `shadow=41`.
  - Profile: `scrollHeight=2170`, `scrollWidth=390`, `clientWidth=390`, visible costly-layer counts `fixed=2`, `backdrop=20`, `shadow=39`.
  - Solo, Calendar, and About also showed no horizontal overflow and similar blur/shadow density.
- The quick script did not reliably land on Word Explorer by label lookup, so no Word Explorer-specific browser conclusion is recorded from this pass.
- These diagnostics are intentionally coarse and non-authoritative for frame rate; Stage 39.2 should prefer deterministic layout/scroll assertions with optional diagnostic logging rather than brittle FPS thresholds.

## Chosen Stage 39.2 Path

Stage 39.2 should proceed as a source/test-only scroll measurement and regression harness stage.

Recommended Stage 39.2 scope:

- Extend `e2e/fixtures/assertions.ts` with deterministic mobile scroll/layout helpers.
- Add focused Playwright coverage for representative long/heavy routes at a mobile viewport.
- Assert no horizontal overflow, no console/page errors, expected page scrollability, successful scroll-to-bottom/top behavior, important controls remaining reachable, and no obvious fixed/sticky overlay occlusion where practical.
- Capture coarse route diagnostics such as `scrollHeight`, `clientHeight`, `scrollWidth`, `clientWidth`, visible fixed/sticky/backdrop/shadow counts, and optional elapsed scroll-loop diagnostics as non-authoritative debug output.
- Avoid brittle FPS/pass thresholds unless a stable browser metric is proven reliable.
- Do not create screenshots, videos, traces, or local artifacts as committed evidence.

Stage 39.3 should remain source/CSS/shared-UI-only and use Stage 39.2 evidence to make narrow fixes such as reducing mobile blur/shadow cost on repeated panels/cards/shell elements, tuning hover/transition behavior, and only then touching the sticky keyboard or tooltip behavior if evidence supports it.

Stage 39.4 should remain source-only complex workspace tuning for the heaviest current surfaces. It should not become a broad mobile UX/navigation overhaul.

## Deferred Work Confirmed

- Broad mobile UX overhaul, compact navigation, and Focus Mode remain deferred to Phase 42 or later.
- Progression HUD/EXP/coin/collectible counters remain deferred to Phase 42 or later.
- Public/social profiles, clickable rival profiles, direct match requests, private matchmaking, and custom-code invitation expansion remain deferred to Phase 40.
- Public site stats, private developer dashboard, onboarding/help/tutorial UX remain deferred to Phase 41.
- Theme work, service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes remain later gated work.
- Spectator presence/count/list implementation remains out of Phase 39 scope.

## Verification

Stage 39.1 lightweight verification passed:

- `git diff --check`
- progress CSV shape check using `python3 -S` reported `rows=328 columns=[12] last_id=326`
- non-printing credential-shaped secret/artifact scan reported `scanned_files=17 credential_pattern_hits=0`
- ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- watched-port cleanup check found no listeners on `5173`, `5174`, `3000`, or `4173`
- `git status --short --branch`

Verification note: initial overbroad local scan matchers flagged `progress/PROGRESS.csv` wording and tracked `.env.example`; refined non-printing credential and artifact checks excluded those false positives and passed without printing secret-shaped values.

## Blockers And Open Questions

No blockers were found that prevent Stage 39.2 from proceeding as a measurement/regression harness stage.

Open decisions for Stage 39.2:

- Which exact route set should be required in the first mobile scroll smoke: likely Home, Solo, Multiplayer, Leaderboard, Stats, History, Settings, Profile, and About, with Word Explorer included once the harness uses stable route selectors.
- Whether diagnostic counts should be logged only, asserted only above a very high budget, or reserved for comparison after Stage 39.3/39.4 fixes.
- Whether overlay occlusion can be expressed as a stable helper without brittle element-position assumptions.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration, Vercel/Supabase configuration change, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation change, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
