# Progress Step 329 - Phase 39 Stage 39.4 Complex Workspace Scroll Tuning

**Status**: Completed - Awaiting User Review Before Stage 39.5
**Phase**: 39, Mobile Performance And Scroll Smoothness
**Stage**: 39.4, source-only complex workspace scroll tuning
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T02:19:45Z
**Completed**: 2026-07-01T02:19:45Z

## Authorization

The user authorized Phase 39 Stage 39.4 only: source-only complex workspace scroll tuning using the completed Stage 39.3 shell/CSS/shared UI scroll smoothness baseline.

This pass is limited to reading required governance, Phase 39 planning/spec/implementation materials, Stage 39.3 progress, current progress records, complex workspace surfaces, the mobile scroll E2E harness, relevant tests, creating this Stage 39.4 progress report and matching 12-column CSV row, implementing narrow workspace-specific source/CSS fixes supported by Stage 39.1 through Stage 39.3 evidence, and running verification.

This pass does not authorize and did not perform Stage 39.5 final hardening, broad mobile UX overhaul, compact navigation, Focus Mode, progression HUD, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation changes, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `937208ac519860cfa433fa39411c1b077508f26b`.
- `origin/main`: `937208ac519860cfa433fa39411c1b077508f26b`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used.
- The user-edited `planning/phase-38/REVIEW-CHECKLIST.md` checked state was preserved.

## Files Changed

- `src/wordExplorer/WordExplorerPanel.tsx` - added Word Explorer-specific mobile list/row class hooks for targeted workspace tuning.
- `src/index.css` - added mobile-only Word Explorer row containment and removed shadows from Word Explorer mobile row action buttons.
- `progress/PROGRESS-STEP-329.md` - recorded Stage 39.4 evidence and boundaries.
- `progress/PROGRESS.csv` - appended row `329`.

## Workspace Tuning Implemented

Stage 39.4 prioritized Word Explorer because Stage 39.2 and Stage 39.3 diagnostics consistently identified it as the highest sampled route by visible shadow count.

Implemented changes:

- Added `brrrdle-word-explorer-mobile-list` and `brrrdle-word-explorer-mobile-row` hooks to the mobile-only Word Explorer list.
- Added mobile-only `contain: layout paint` on each Word Explorer mobile row.
- Removed repeated box shadows from Word Explorer mobile row action buttons.
- Preserved desktop/tablet Word Explorer table behavior.
- Preserved Word Explorer filtering, sorting, pagination, copy, definition lookup, and request-link behavior.

No shared `Button` behavior was changed. The shadow override is scoped to Word Explorer mobile rows only.

## Before And After Diagnostics

Focused harness command before edits:

- `npx playwright test e2e/layout/mobile-scroll.spec.ts`

Result:

- `11 passed`

Representative before-edit diagnostics:

- Word Explorer: `backdrop=2`, `shadow=120`, `scrollHeight=9708`, `scrollWidth=390`, `clientWidth=390`, `maxScrollY=8864`.
- Home: `backdrop=2`, `shadow=26`.
- Multiplayer: `backdrop=2`, `shadow=25`.
- Leaderboard: `backdrop=2`, `shadow=25`.
- Settings: `backdrop=2`, `shadow=21`.

A focused browser attribution check showed `102` Word Explorer shadowed elements were repeated mobile row buttons.

Focused harness command after edits:

- `npx playwright test e2e/layout/mobile-scroll.spec.ts`

Result:

- `11 passed`

Representative after-edit diagnostics:

- Word Explorer: `backdrop=2`, `shadow=20`, `scrollHeight=9708`, `scrollWidth=390`, `clientWidth=390`, `maxScrollY=8864`.
- Home: `backdrop=2`, `shadow=26`.
- Multiplayer: `backdrop=2`, `shadow=25`.
- Leaderboard: `backdrop=2`, `shadow=25`.
- Settings: `backdrop=2`, `shadow=21`.

The Word Explorer route now has shadow-count diagnostics in the same range as other sampled complex routes. The harness still reports no horizontal overflow, expected scrollability, successful scroll-to-bottom/top behavior, no route-control occlusion, and no console/page failures.

## Verification

Stage 39.4 verification passed:

- before-edit focused Playwright harness: `npx playwright test e2e/layout/mobile-scroll.spec.ts` reported `11 passed`
- after-edit focused Playwright harness: `npx playwright test e2e/layout/mobile-scroll.spec.ts` reported `11 passed`
- focused Word Explorer data tests: `npm run test -- src/wordExplorer/wordExplorerData.test.ts` reported `1` file and `20` tests passed
- `npm run lint`
- `npm run test` reported `109` files and `764` tests passed
- `npm run build` passed with the existing Vite large-chunk advisory
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S` reported `rows=330 columns=[12] last_id=329`
- non-printing credential-shaped secret/artifact scan reported `scanned_files=26 credential_pattern_hits=0`
- ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- watched-port cleanup check found no listeners on `5173`, `5174`, `3000`, or `4173`
- `git status --short --branch`

## Browser And Resource Observations

- One temporary local Vite dev server on `127.0.0.1:5173` was used for the Word Explorer shadow attribution check and was stopped immediately after.
- Playwright emitted the existing benign `NO_COLOR`/`FORCE_COLOR` warning during focused harness runs.
- No watched-port listeners remained after verification.

## Blockers And Open Questions

No blockers prevent Stage 39.5 from proceeding after user review.

Open decisions for Stage 39.5:

- Which mobile scroll-heavy surfaces should be emphasized during visual handoff review after the Stage 39.3 and Stage 39.4 changes.
- Whether the final manual checklist should call out Word Explorer mobile row action buttons and shell mobile blur/shadow reductions as explicit review items.
- Whether any additional non-brittle diagnostic budget should be documented for future phases, or whether the Stage 39.2 harness should remain diagnostic-only for layer counts.

## Boundary Confirmation

No Stage 39.5 final hardening, broad mobile UX overhaul, compact navigation, Focus Mode, progression HUD, Supabase migration, Vercel/Supabase configuration change, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation change, spectator presence/count/list implementation, public profile/private matchmaking implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
