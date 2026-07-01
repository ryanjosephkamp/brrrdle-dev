# Progress Step 328 - Phase 39 Stage 39.3 Shell CSS And Shared UI Scroll Smoothness Fixes

**Status**: Completed - Awaiting User Review Before Stage 39.4
**Phase**: 39, Mobile Performance And Scroll Smoothness
**Stage**: 39.3, source-only shell/CSS/shared UI scroll smoothness fixes
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T02:11:00Z
**Completed**: 2026-07-01T02:11:00Z

## Authorization

The user authorized Phase 39 Stage 39.3 only: source-only shell, CSS, and shared UI scroll smoothness fixes using the completed Stage 39.2 scroll measurement and regression harness baseline.

This pass is limited to reading required governance, Phase 39 planning/spec/implementation materials, Stage 39.2 progress, app shell/global CSS/shared UI primitive surfaces, the mobile scroll E2E harness, relevant tests, creating this Stage 39.3 progress report and matching 12-column CSV row, implementing narrow source/CSS/shared UI fixes supported by Stage 39.1 and Stage 39.2 evidence, and running verification.

This pass does not authorize and did not perform Stage 39.4 complex workspace tuning, broad mobile UX overhaul, compact navigation, Focus Mode, progression HUD, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `937208ac519860cfa433fa39411c1b077508f26b`.
- `origin/main`: `937208ac519860cfa433fa39411c1b077508f26b`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used.
- The user-edited `planning/phase-38/REVIEW-CHECKLIST.md` checked state was preserved.

## Files Changed

- `src/index.css` - added mobile-only shell overrides that remove backdrop filters and heavy box shadows from repeated Lunar shell surfaces, route rail buttons, notification panels, and the daily countdown.
- `src/ui/Panel.tsx` - kept shared `Panel` blur and heavy shadow from `sm` upward while removing those repeated effects on mobile.
- `src/ui/Keyboard.tsx` - preserved sticky mobile keyboard behavior while replacing the blurred mobile backing surface with an opaque bordered surface.
- `progress/PROGRESS-STEP-328.md` - recorded Stage 39.3 evidence and boundaries.
- `progress/PROGRESS.csv` - appended row `328`.

## Behavior Implemented

Stage 39.3 used Stage 39.1 and Stage 39.2 evidence to reduce always-visible mobile paint-cost contributors in shared shell/UI surfaces before any workspace-specific tuning.

Implemented changes:

- Removed mobile `backdrop-filter`/`-webkit-backdrop-filter` from repeated Lunar shell chrome and panel surfaces.
- Removed mobile-heavy shell box shadows from route chrome, panels, notification panels, rail buttons, and countdown surfaces.
- Kept richer shared `Panel` blur/shadow treatment on `sm` and larger breakpoints.
- Kept the gameplay keyboard sticky on mobile, with the same input behavior and no gameplay rule changes.
- Replaced the mobile keyboard wrapper's blur with a darker, bordered non-blurred surface.

Deferred to Stage 39.4:

- Word Explorer and other workspace-specific card/list/table density tuning.
- Any route-specific list virtualization, card shadow cleanup, or dense table/list layout changes.
- Any broad mobile navigation redesign, compact navigation, Focus Mode, or mobile shell overhaul.

## Before And After Harness Diagnostics

Focused harness command before edits:

- `npx playwright test e2e/layout/mobile-scroll.spec.ts`

Result:

- `11 passed`

Representative before-edit diagnostics:

- Home: `backdrop=24`, `shadow=48`, `scrollHeight=4308`, `scrollWidth=390`, `clientWidth=390`.
- Solo: `backdrop=20`, `shadow=45`, `scrollHeight=2412`, `scrollWidth=390`, `clientWidth=390`.
- Calendar: `backdrop=20`, `shadow=41`, `scrollHeight=2777`, `scrollWidth=390`, `clientWidth=390`.
- Multiplayer: `backdrop=22`, `shadow=45`, `scrollHeight=2780`, `scrollWidth=390`, `clientWidth=390`.
- Stats: `backdrop=18`, `shadow=34`, `scrollHeight=3386`, `scrollWidth=390`, `clientWidth=390`.
- Leaderboard: `backdrop=22`, `shadow=45`, `scrollHeight=3318`, `scrollWidth=390`, `clientWidth=390`.
- Word Explorer: `backdrop=19`, `shadow=137`, `scrollHeight=9708`, `scrollWidth=390`, `clientWidth=390`.
- Settings: `backdrop=22`, `shadow=41`, `scrollHeight=4738`, `scrollWidth=390`, `clientWidth=390`.

Focused harness command after edits:

- `npx playwright test e2e/layout/mobile-scroll.spec.ts`

Result:

- `11 passed`

Representative after-edit diagnostics:

- Home: `backdrop=2`, `shadow=26`, `scrollHeight=4308`, `scrollWidth=390`, `clientWidth=390`.
- Solo: `backdrop=2`, `shadow=27`, `scrollHeight=2412`, `scrollWidth=390`, `clientWidth=390`.
- Calendar: `backdrop=2`, `shadow=23`, `scrollHeight=2777`, `scrollWidth=390`, `clientWidth=390`.
- Multiplayer: `backdrop=2`, `shadow=25`, `scrollHeight=2780`, `scrollWidth=390`, `clientWidth=390`.
- Stats: `backdrop=2`, `shadow=18`, `scrollHeight=3386`, `scrollWidth=390`, `clientWidth=390`.
- Leaderboard: `backdrop=2`, `shadow=25`, `scrollHeight=3318`, `scrollWidth=390`, `clientWidth=390`.
- Word Explorer: `backdrop=2`, `shadow=120`, `scrollHeight=9708`, `scrollWidth=390`, `clientWidth=390`.
- Settings: `backdrop=2`, `shadow=21`, `scrollHeight=4738`, `scrollWidth=390`, `clientWidth=390`.

The backdrop count reduction is the strongest Stage 39.3 signal because it directly tracks the shared mobile blur removal. Word Explorer remains the highest diagnostic shadow-count route and is intentionally routed to Stage 39.4 workspace-specific tuning.

## Verification

Stage 39.3 verification passed:

- before-edit focused Playwright harness: `npx playwright test e2e/layout/mobile-scroll.spec.ts` reported `11 passed`
- after-edit focused Playwright harness: `npx playwright test e2e/layout/mobile-scroll.spec.ts` reported `11 passed`
- `npm run lint`
- `npm run test` reported `109` files and `764` tests passed
- `npm run build` passed with the existing Vite large-chunk advisory
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S` reported `rows=329 columns=[12] last_id=328`
- non-printing credential-shaped secret/artifact scan reported `scanned_files=24 credential_pattern_hits=0`
- ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- watched-port cleanup check found no listeners on `5173`, `5174`, `3000`, or `4173`
- `git status --short --branch`

An initial overbroad text-pattern scan flagged `progress/PROGRESS.csv` because of progress-ledger wording, not because of a credential-shaped secret. The refined credential-shaped/high-entropy scan passed.

## Blockers And Open Questions

No blockers prevent Stage 39.4 from proceeding after user review.

Open decisions for Stage 39.4:

- Whether to begin with Word Explorer, because it remains the highest sampled route for diagnostic shadow count.
- Whether workspace-specific tuning should remove remaining repeated mobile shadows, adjust dense card/list/table surfaces, or add route-specific containment rules.
- Whether any Stage 39.4 change needs a focused component test in addition to the mobile scroll harness.

## Boundary Confirmation

No Stage 39.4 complex workspace tuning, broad mobile UX overhaul, compact navigation, Focus Mode, progression HUD, Supabase migration, Vercel/Supabase configuration change, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation change, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
