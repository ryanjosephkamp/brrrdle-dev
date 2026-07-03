# Progress Step 373 - Phase 42 Stage 42.6 Onboarding, Help, And Tutorial UX

**Status**: Completed - Awaiting User Review Before Stage 42.7
**Phase**: Phase 42 - Site Stats, Developer Dashboard, Onboarding, And Help
**Stage**: 42.6 - Onboarding, help, and tutorial UX
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T16:28:00Z
**Completed**: 2026-07-03T16:34:17Z

## Authorization

The user authorized Phase 42 Stage 42.6 only: source/test-only onboarding, help, and tutorial UX using the completed Stage 42.5 public stats and private developer dashboard source integration baseline.

Authorized work included confirming repo state and stable-repo boundary, reading Phase 42 planning/spec/implementation materials and Stage 42.5 progress, preserving the user-updated Phase 41 review checklist, implementing a small in-app onboarding/help/tutorial surface for current brrrdle behavior, adding focused tests, creating this progress report and matching 12-column CSV row, and running verification.

This stage did not authorize additional Supabase migrations, Supabase/Vercel configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- `origin/main`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-41/REVIEW-CHECKLIST.md` was preserved.

## Onboarding, Help, And Tutorial UX

Added a durable `Help` route:

- Added `help` to the app route allowlist and primary support navigation.
- Added `src/help/HelpPanel.tsx` and `src/help/index.ts`.
- Wired `HelpPanel` through `src/app/App.tsx`.
- Added a Settings doorway so users can open Help from the existing Settings surface.

Help coverage:

- Solo Daily and Solo Practice basics.
- OG versus GO behavior, including GO carry-forward context.
- Daily versus Practice differences.
- Hard Mode availability and first-guess constraints.
- Practice and Daily Multiplayer boundaries.
- Ranked Practice trusted queue, trusted settlement, and display-only Elo/rank explanations.
- Leaderboard visibility and public-profile eligibility.
- Public profile privacy and safe fallback language.
- Private Practice requests and accepted-game open/resume routing.
- Public/guest Live spectator read-only boundaries and Daily spectator exclusion.
- Settings, feedback, definitions, stats, history, Word Explorer, and route orientation.

Safety constraints preserved:

- The Help route is read-only and non-blocking.
- No first-run modal, persistent dismiss state, local/account storage write, Daily claim, queue action, match creation, gameplay mutation, profile mutation, scoring change, or Elo change was added.
- Public stats/admin dashboard contracts from Stage 42.5 were not changed.
- Phase 42.2 ranked queue flashing repair, Phase 41 multiplayer reliability repairs, Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, and Phase 38 public/guest spectator boundaries remain preserved.

## Tests

Added or updated focused tests:

- `src/help/HelpPanel.test.tsx`: validates required onboarding/help/tutorial copy coverage and read-only route-button rendering.
- `src/app/routes.test.ts`: validates the new `help` route, support grouping, and primary navigation order.
- `src/account/Settings.test.tsx`: validates the optional Settings-to-Help affordance.

## Verification

Focused checks:

- Initial focused Vitest slice found one test dependency mismatch: `@testing-library/react` is not installed in this repo.
- Repaired the new Help test to use the repo's existing `renderToStaticMarkup` pattern.
- Final focused Vitest slice passed: `3` files, `15` tests.

Source verification:

- `npm run lint`: passed.
- `npm run test`: passed, `116` files and `801` tests.
- `npm run build`: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`: passed.
- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: `rows=375 columns=[12] last_id=373`.
- Non-printing changed/untracked file credential scan: `scanned_files=53 credential_pattern_hits=0`.
- Initial ignored-artifact check was overbroad and flagged tracked `.env.example`; corrected local-secret/generated-artifact check passed with `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check: `port_5173=clear`, `port_5174=clear`, `port_3000=clear`, `port_4173=clear`.
- `git status --short --branch`: completed and showed expected uncommitted Phase 42 planning/progress/source/migration artifacts, the preserved Phase 41 checklist, and no staged files.

## Browser And Resource Notes

- No dev server or browser contexts were required for Stage 42.6 because the change is a static route/help surface with route and component coverage.
- Watched-port cleanup is included in final hygiene.

## Next Gate

The next safe gate is Stage 42.7 final hardening, visual review, changelog, and manual checklist, only after user review of this Stage 42.6 source/test integration.
