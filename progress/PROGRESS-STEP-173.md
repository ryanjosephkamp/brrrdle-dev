# Progress Step 173 - Phase 26 Stage 26.1 Responsive Layout Audit And Test Harness

**Date**: 2026-06-15
**Branch**: `main`
**Repository**: `brrrdle-dev`
**HEAD**: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
**Origin main**: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
**Status**: Completed - Awaiting User Review Before Stage 26.2

## Scope

Stage 26.1 is an audit and characterization stage. The user authorized reading the required governance, planning, progress, screenshot, and layout surfaces; identifying the responsive risks behind the Chrome zoom and narrow-width screenshots; defining the Stage 26.2 smoke matrix; adding only narrow characterization harness coverage if useful; and updating progress records.

This step does not authorize Stage 26.2 responsive fixes, broad visual redesign, notification Settings, notification sounds, browser notifications, Live v1 spectation, Supabase migrations, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, new custom skills, or original stable `brrrdle` repository work.

## Repository State

- Working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- Remote: `origin` points to `https://github.com/ryanjosephkamp/brrrdle-dev.git`
- Local `HEAD`: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
- `origin/main`: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
- Original stable `brrrdle` checkout was not used.

## Context Reviewed

Required reading and inspection were completed before progress edits:

- `CONSTITUTION.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `BRRRDLE-SPEC.md`
- `planning/phase-26/PLANNING-BRIEF.md`
- `planning/specs/phase-26/PHASE-26-POLISH-NOTIFICATIONS-AND-LIVE-V1-SPEC-2026-06-15.md`
- `planning/phase-26/IMPLEMENTATION-PLAN.md`
- `planning/testing/TESTING-SUITE.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-172.md`
- `agents.md`
- `memory.md`
- `package.json`
- `src/index.css`
- `src/app/LunarSignalStage.tsx`
- `src/app/LunarSignalStage.test.tsx`
- `src/dashboard/DashboardHome.tsx`
- `src/dashboard/DashboardHome.test.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerWorkspace.test.tsx`
- `src/ui/SubtabBar.tsx`
- `src/ui/SubtabBar.test.tsx`

The three user-provided screenshots were inspected read-only:

- `/Users/noir/Desktop/Screenshot 2026-06-15 at 2.37.58 PM.png`
- `/Users/noir/Desktop/Screenshot 2026-06-15 at 2.39.12 PM.png`
- `/Users/noir/Desktop/Screenshot 2026-06-15 at 10.55.54 AM.png`

## Screenshot Findings

### Home Dashboard And Right Rail Clipping

The Home dashboard screenshot shows the Daily Status section extending under or being clipped by the right rail boundary. The first dashboard metric and quick-action rows are dense but mostly readable; the highest-risk area is the central dashboard content below the fold where a Daily Status card continues past the visible playfield edge and disappears behind the rail-side boundary.

Likely related surfaces:

- `src/app/LunarSignalStage.tsx` renders the permanent left rail, center playfield, and right side deck in one grid.
- `src/index.css` defines the desktop shell grid at `@media (width >= 1024px)` as `minmax(10rem, 13rem) minmax(0, 1fr) minmax(14rem, 18rem)`.
- `src/index.css` also sets `.brrrdle-lunar-playfield { overflow: hidden; }`, which can hide content that exceeds the center column instead of exposing a horizontal scroll or wrapping failure.
- `src/dashboard/DashboardHome.tsx` switches Daily Status to two columns at `md:grid-cols-2` and the wider dashboard layout to `xl:grid-cols-[minmax(0,1fr)_minmax(22rem,0.82fr)]`.

### Multiplayer Setup Controls

The Practice Multiplayer and Daily Multiplayer screenshots show setup controls overlapping or compressing at Chrome zoom and narrower desktop widths:

- Setup labels such as `Mode`, `Match type`, `Length`, `Time per side`, `UTC day`, and `Difficulty` collide or wrap into narrow vertical columns.
- The cyan primary action card/button is too wide for the remaining setup row and appears to overlay or visually crowd the controls.
- Daily `UTC day` and deadline-style date text wraps word-by-word or digit-by-digit, especially when the center column is narrowed by the shell side rail.

Likely related surfaces:

- `src/multiplayer/MultiplayerPanel.tsx` uses an outer setup grid `md:grid-cols-[minmax(0,1fr)_auto]`.
- The inner setup controls switch to `sm:grid-cols-4` and `xl:grid-cols-5`, which can create five narrow tracks inside the already constrained playfield.
- The primary action button sits in an `auto` grid column, so long labels such as `Daily multiplayer already claimed` can consume width instead of stacking below the controls.

### Multiplayer Result And History Cards

The selected multiplayer game metadata and turn-history cards are readable at normal width but high risk under zoom:

- The selected game header uses `md:grid-cols-4`.
- Daily deadlines include full ISO timestamps plus `UTC`, which can wrap aggressively.
- Turn-history metadata uses uppercase text with letter spacing and long timestamps.
- Performance result cards use `md:grid-cols-2`, which is likely acceptable at normal desktop widths but should be checked under zoom because player summaries can be verbose.

## Code Audit Findings

1. The shell grid has a fixed desktop three-column model starting at 1024px:
   - `src/index.css` lines 861-887.
   - This is visually strong at wide desktop sizes, but Chrome zoom effectively reduces available CSS pixels while keeping the desktop layout active until the viewport crosses the breakpoint.

2. The center playfield hides overflow:
   - `src/index.css` lines 491-497.
   - This likely explains why content appears cut off rather than obviously overflowing.

3. The shell root hides horizontal overflow:
   - `src/index.css` lines 63-69.
   - This protects the app from global horizontal scroll, but it also masks layout bugs inside the playfield.

4. The route body has no explicit `min-width: 0`/containment rule:
   - `src/app/LunarSignalStage.tsx` lines 466-477 and `src/index.css` lines 539-540.
   - Stage 26.2 should verify that the route body and direct child workspaces can shrink inside the center column without hidden overflow.

5. Dashboard content switches to multi-column layouts based on viewport, not actual container width:
   - Quick actions: `src/dashboard/DashboardHome.tsx` lines 98-110.
   - Daily Status cards: `src/dashboard/DashboardHome.tsx` lines 124-140.
   - Summary metrics and main dashboard split: `src/dashboard/DashboardHome.tsx` lines 384-397.
   - The center playfield may be much narrower than the viewport because left and right rails reserve width.

6. Multiplayer setup controls use early multi-column breakpoints and an `auto` action column:
   - `src/multiplayer/MultiplayerPanel.tsx` lines 482-558.
   - This is the strongest match to the Practice/Daily Multiplayer screenshots.

7. Multiplayer selected-game metadata and turn history use dense multi-column and timestamp text:
   - `src/multiplayer/MultiplayerPanel.tsx` lines 598-609 and 676-705.
   - Stage 26.2 should make these sections wrap predictably and should avoid digit-by-digit timestamp columns.

8. Existing component tests are server-render/string tests:
   - `src/app/LunarSignalStage.test.tsx` and `src/dashboard/DashboardHome.test.tsx` render static markup.
   - These tests are useful for structure and accessibility, but they cannot measure Chrome zoom overflow, right-rail clipping, `scrollWidth > clientWidth`, or actual grid wrapping.

## Test-Harness Decision

No source/runtime/test harness files were changed in Stage 26.1.

Reason: the observed failures are measured layout failures in a real browser at specific viewport and zoom conditions. The current Vitest/jsdom/static-markup tests cannot reliably detect the right-rail clipping or Chrome zoom overlap without adding a browser-level harness. Adding that harness before the Stage 26.2 fixes would create likely brittle failure-only coverage and would be heavier than the audit stage needs.

Recommended Stage 26.2 test strategy:

- Keep existing component tests for semantic/accessibility regressions.
- Add narrow assertions only where fixes introduce reusable class names, helpers, or structural wrappers.
- Use one browser smoke pass as the primary acceptance proof for the screenshot regressions.
- Consider a small Playwright helper only if the responsive fixes need repeatable automated `scrollWidth <= clientWidth` checks for specific containers.

## Proposed Stage 26.2 Smoke Matrix

Use one local dev server. Verify no global horizontal page overflow and no visible overlap/clipping in these routes/states:

### Viewports And Zoom

- Desktop wide: 1440 x 900 at 100 percent.
- Desktop narrow: 1280 x 900 at 100 percent.
- Chrome zoom stress: 1280 x 900 at 125 percent, if practical.
- Chrome zoom stress: 1280 x 900 at 150 percent, if practical.
- Constrained desktop: 1024 x 900 at 100 percent.
- Tablet: 820 x 1180 at 100 percent.
- Mobile: 390 x 844 at 100 percent.

If automated browser tooling cannot set true Chrome zoom, emulate it with reduced effective viewport widths and record that limitation clearly.

### Required Screens

- Home dashboard:
  - Summary metrics.
  - Quick actions.
  - Daily Status cards with right rail visible.
  - Active Solo and Active Multiplayer empty states.
  - Lobby and Live preview sections.

- Multiplayer Daily:
  - Setup controls in both available and claimed states.
  - Daily date/deadline text.
  - Selected completed game metadata and status/result cards.
  - Turn history rows with timestamps.

- Multiplayer Practice:
  - Setup controls with mode, match type, length, time per side, Hard Mode, difficulty, and primary action.
  - Selected completed game metadata and result cards.
  - Turn history rows.

- Shell non-regression:
  - Left route rail remains usable.
  - Right mode deck does not occlude center content.
  - Notification summary remains usable in the top-right stack.
  - Calendar, History, Settings, and Solo routes do not show new horizontal clipping.

### Acceptance Criteria

- No center content is hidden under the right mode deck.
- No global horizontal scrolling is required on desktop/tablet/mobile.
- No setup-control labels overlap adjacent controls.
- Long action labels wrap or stack without covering form controls.
- Daily date/deadline text wraps as a phrase or stacks intentionally, not one character or one tiny fragment at a time.
- Result and turn-history cards remain readable at narrow desktop and zoomed desktop sizes.
- Existing mobile behavior remains intact.

## Verification

Passed lightweight documentation verification:

- `git diff --check`: passed.
- progress CSV shape check using Python `csv` parsing: passed, 175 rows including header, 12 columns each, no bad rows, last_id=173.
- `git status --short --branch`: completed and showed the expected uncommitted Phase 26 planning/progress artifacts plus this Stage 26.1 report.

## Files Updated

- `progress/PROGRESS.csv`: append progress ID 173.
- `progress/PROGRESS-STEP-173.md`: create this Stage 26.1 audit report.

## Status

Stage 26.1 audit and lightweight documentation verification are complete. Stage 26.2 remains gated and requires explicit user authorization before responsive shell/workspace hardening or source/test changes begin.

## Boundary Confirmation

No Stage 26.2 responsive fixes, source/runtime implementation, test implementation, notification Settings, notification sounds, browser notifications, Live v1 spectation, Supabase migrations, Vercel configuration, deployment, commits, pushes, PRs, merges, releases, branch deletion, new custom skills, gameplay-rule changes, or original stable `brrrdle` repository work was performed.
