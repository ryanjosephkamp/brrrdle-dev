# Progress Step Report — Phase 22 Addendum Follow-up (Landing Tab-Row Layout Fix + Feedback Tab Reorder)

## Step
- **Major step / phase**: Phase 22 Addendum follow-up — small UI/UX fixes requested by the user on top of the Phase 22 addendum branch.
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §27.10 (Phase 22 addendum surfaces: Lunar Signal Deck landing tabs + navigation routes). No new scope introduced.
- **Report file**: `progress/PROGRESS-STEP-68.md`
- **Date updated**: 2026-06-03
- **Status**: Completed — awaiting user review/feedback before any further changes.

## User Requests Addressed
1. **Landing tab row cut off**: On both mobile and desktop, the horizontal tab row on the landing page was being clipped by the bottom of the page and was not fully reachable. Fix so it always fits on the page.
2. **Slightly larger landing tabs**: Make the landing-page tabs a little bigger (not by much).
3. **Move the Feedback tab**: Keep the tabs otherwise the same, but move the Feedback tab to the second-to-last position — just after Settings and just before About.

## Review Performed Before Changes
- Re-read `CONSTITUTION.md` v3.3 (scope, invariants, progress-tracking amendment).
- Located the landing tab row: it is the `.brrrdle-lunar-dock` rendered by the dormant (`!isAwake`) landing state in `src/app/LunarSignalStage.tsx`, styled in `src/index.css`.
- Confirmed the dock is `position: absolute; bottom: 1rem` inside `.brrrdle-lunar-intro`, whose height was a magic-number estimate `calc(100svh - 7.25rem)` (and `- 10rem` / `- 9.25rem` in mobile breakpoints) of the topbar height. When the topbar was taller than the estimate (notably on mobile, where the account stack + countdown stack vertically), the intro overflowed the viewport and pushed the bottom-anchored dock below the fold.
- Confirmed a green baseline (`npm install`, then lint/test/build all pass; 390 tests) before editing.

## Changes Made

### 1. Landing tab-row layout fix (`src/index.css`)
- `.brrrdle-lunar-interface`: added `display: flex; flex-direction: column;` so the topbar and the main landing region lay out as a column inside the `min-height: 100svh` shell.
- `.brrrdle-lunar-intro`: replaced the magic-number `min-height: calc(100svh - 7.25rem)` with `flex: 1 1 auto; min-height: 0;` so the landing region fills exactly the space left after the (variable-height) topbar. The bottom-anchored dock therefore always lands on-screen regardless of how tall the topbar grows.
- Neutralized the now-redundant per-breakpoint intro height estimates (`calc(100svh - 10rem)` at `< 720px` and `calc(100svh - 9.25rem)` at `< 420px`/short height) to `min-height: 0` so they no longer force the intro taller than the available flex space.

### 2. Slightly larger landing tabs (`src/index.css`)
- `.brrrdle-lunar-dock-chip` (desktop): `min-height` 2.5rem → 2.85rem, padding `0.45rem 0.82rem` → `0.55rem 1rem`, `font-size` 0.82rem → 0.92rem, `gap` 0.45rem → 0.5rem.
- Landing dock indicator dot: `.brrrdle-lunar-dock-chip span` enlarged 0.55rem → 0.6rem. This was split out from the shared `.brrrdle-lunar-rail-light` rule so the in-game (awake) rail dot is left unchanged.
- `.brrrdle-lunar-dock-chip` (mobile `< 720px`): `min-height` 2rem → 2.3rem, padding `0.3rem 0.52rem` → `0.4rem 0.7rem`, `font-size` 0.68rem → 0.78rem.

### 3. Feedback tab repositioned (`src/app/routes.ts`)
- Moved the `feedback` route object in `APP_ROUTES` from its prior position (right after `word-explorer`) to second-to-last — immediately after `settings` and immediately before `about`. The primary navigation order is derived from `APP_ROUTES` order, so this is what drives the visible tab order.
- Updated the membership-list literal in `getPrimaryNavigationRoutes` to reflect the new order (`['calendar', 'practice', 'word-explorer', 'settings', 'feedback', 'about']`) for readability; the list is a membership check, so this is cosmetic but kept consistent.

### Tests updated (`src/app/routes.test.ts`)
- Updated the `getRoutesByGroup('support')` expected order to `['word-explorer', 'definitions', 'stats', 'settings', 'feedback', 'about', 'admin']`.
- Updated both `getPrimaryNavigationRoutes` expectations (non-admin and admin) to put `settings` before `feedback`.

## Scope & Invariant Confirmation
- CSS-only landing layout change plus a pure navigation reordering; no gameplay, economy, persistence, sync, or daily-cycle behavior touched.
- Daily puzzles remain exactly 5 letters; practice remains 2–35; no multiplayer/marketplace/economy changes; guest and signed-in behavior unchanged.
- The in-game (awake) rail and playfield layout are untouched.

## Verification
- `npm run lint` — clean.
- `npm run test` — 390/390 passing (count unchanged; `routes.test.ts` updated to match the new order).
- `npm run build` — succeeds.
- `git diff --check` — clean.
- `PROGRESS.csv` parse check — all rows 12 columns, last row `phase_id = 68`.

## Gate
Halt for user review. Awaiting the user's next prompt regarding any additional changes, bugs, or features.
