# Phase 51 Manual Review Follow-Up Plan - Account/Profile Mobile Fit And Scroll

**Status:** Planning complete; implementation separately gated.
**Created:** 2026-07-09.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Baseline:** Phase 51 Account/Profile Identity Review Candidate merged through PR #46 at `080d99207365b7ad73e49f75ec74966f261c6f54`.

## Authorization

This artifact records the user's hosted/mobile manual-review findings and proposes the next same-phase Phase 51 follow-up. It does not itself authorize source/runtime edits, tests, migrations, remote Supabase work, deployment configuration changes, Git/GitHub backup, release, public tunneling, Phase 51 closure, Phase 52 implementation, minimal-shell UI stripping, or work in the original stable `brrrdle` repository.

## User-Reported Manual Review Results

The user reviewed the hosted Review Candidate on a mobile device, especially mobile Firefox/Android, and provided these results:

- The top `Player name` field can save ordinary safe names.
- The top `Player name` field correctly rejects emoji and unsupported characters.
- The signed-in account chip/menu fails on mobile because it does not fit inside the viewport and can clip off the left side of the screen. The same surface looked acceptable in desktop view.
- The Profile page still exposes separate private/current-player and public player-name concepts. The desired product model is one single public `Player name` for all player-facing surfaces: profile views, leaderboard, multiplayer, private games, requests, and any other visible identity surface.
- Page scrolling, especially on mobile, feels choppy/laggy and should be investigated and improved before Phase 51 is treated as ready for final acceptance.

## Current Implementation Review

### Account Chip And Menu

`src/account/AccountBadge.tsx` renders the authenticated menu inside a `relative inline-block` container. The menu uses `absolute right-0` and `min-w-40`. On the mobile shell, `src/index.css` switches `.brrrdle-lunar-topbar` to a column and `.brrrdle-lunar-account-stack` to `justify-items: start`, which places the small account chip near the left side of the viewport. Aligning a fixed-width menu to the button's right edge can make the menu extend left beyond the viewport on narrow screens.

Existing E2E coverage in `e2e/layout/mobile-scroll.spec.ts` checks route scrolling and horizontal overflow on ordinary route surfaces, but it does not open the authenticated account menu at mobile width and assert that the menu bounding box remains inside the viewport.

### Profile Name Model

The Phase 51 implementation added a shared player-name policy in `src/account/profile.ts` and reuses it from `src/account/publicProfile.ts`. That source-level validation direction is useful and should be preserved.

However, `src/account/ProfilePanel.tsx` still keeps separate state and controls for:

- current-player `displayName`;
- `publicDisplayName`;
- public profile visibility;
- public profile accent/avatar URL/bio.

The UI therefore still teaches players that there is a private/current-player name and a separate public player name. That conflicts with the new user direction: there should be one `Player name`, and it should be public for all player-facing identity surfaces. Account email, auth IDs, tokens, and account-management details remain private, but the player-facing name is not private.

The existing backend/RPC shape can likely remain intact for this follow-up. The implementation can keep writing to both existing storage surfaces when needed while presenting only one player name in the UI. If a durable fix requires remote schema/RLS/RPC changes, the implementation must stop and report instead of crossing that boundary.

### Mobile Scroll Performance

`src/index.css` already disables the lunar canvas/cursor on mobile and removes several heavy shadows/backdrop filters under `@media (width < 720px)`. The current mobile scroll E2E diagnostics still report many costly fixed/shadow/backdrop-style layers across routes, and the user reports real mobile scrolling is choppy.

Likely contributors to investigate:

- remaining heavy `box-shadow` and `backdrop-filter` styles on mobile surfaces not covered by the existing mobile override, including progression HUD, account/menu surfaces, route cards, panels, and notification/back-to-top surfaces;
- many repeated route/card/panel elements with shadows or translucent backgrounds on long pages;
- fixed overlays and high z-index affordances repainting during scroll;
- route surfaces that pass existing overflow checks but still have high paint cost on real mobile browsers;
- mobile Safari/Firefox differences that are not fully captured by Chromium-only E2E.

The follow-up should first reproduce/measure with the existing mobile scroll harness and a new targeted authenticated account-menu mobile check, then apply the smallest CSS/structure changes that improve real mobile scroll smoothness without beginning the later minimal-shell redesign.

## Recommended Implementation Strategy

### 1. Reproduce And Lock The Mobile Account Menu Failure

Add or update Playwright coverage at a mobile viewport to:

- sign in using the existing safe test-account fixture helpers;
- open the signed-in account menu;
- assert the account button and menu are visible;
- assert the menu bounding box is within the viewport horizontally;
- assert no horizontal document overflow appears after opening the menu;
- verify Profile, Settings, and Sign out remain reachable.

Likely source fix:

- give the account control container full mobile width or viewport-aware alignment;
- make the account menu use a mobile-safe width such as `min(100vw - safe gutters, menu max width)`;
- anchor the menu to `left: 0` or a viewport-safe transform on narrow screens;
- keep desktop behavior unchanged.

### 2. Collapse Profile To One Public Player Name

Preserve the shared player-name validation policy, then update Profile so there is exactly one editable `Player name` field.

Expected behavior:

- one `Player name` is saved for the signed-in player;
- that name is public and used for leaderboard, multiplayer, private requests/games, profile views, and other player-facing identity surfaces;
- no separate `Public player name` field appears;
- no copy implies a private profile name or private/public name split;
- account email remains private account-management information and is not a public display fallback;
- existing public profile storage/RPC contracts remain source-compatible by saving the same `Player name` through the existing public-profile save seam when available;
- public profile visibility controls should be removed or made non-confusing if the implementation can do so source-only. The user's desired model is public-by-default player identity, not opt-in private/public profile names.

If the existing public-profile RPC requires a visibility value, use the existing source contract with `visibility: 'public'` for saved player identity unless doing so requires unauthorized remote changes. Do not expose raw IDs, emails, tokens, or private account metadata.

Tests should assert:

- Profile renders one `Player name` input;
- Profile does not render `Public player name`, `Private avatar image`, contradictory private/public-name copy, or public-name visibility language;
- saving the player name triggers the appropriate current-player save and, when available, the existing public-profile save with the same name;
- emoji/unsupported names are rejected before both save paths;
- public-profile normalizers still reject unsafe names.

### 3. Investigate And Improve Mobile Scroll Smoothness

Use the existing mobile scroll diagnostics as a baseline, then add a more targeted regression check if feasible. The check should avoid fragile device-specific timing while still catching obvious regressions:

- mobile route sweep still has no horizontal overflow;
- costly mobile layer counts should not grow;
- account menu open state should not introduce overflow;
- scroll-to-end checks should still pass after CSS simplification.

Likely source fixes:

- extend the existing mobile CSS override to remove or reduce remaining heavy shadows/backdrop filters on mobile-only account/menu/progression/panel surfaces;
- simplify repeated mobile route-card and panel paint styles without changing layout or gameplay controls;
- add `contain: layout paint` only to safe repeated card surfaces where it does not break popovers/tooltips;
- preserve focus rings, readable contrast, and accessible controls.

This is not the future minimal-shell handoff. It is a bounded Phase 51 performance repair focused on making the current hosted mobile experience usable.

## Required Verification

Run focused checks first:

- account/Profile/player-name unit/component tests;
- targeted mobile account-menu Playwright test;
- targeted mobile scroll/layout Playwright tests;
- route/shell tests if shell CSS or account-control placement changes.

Before reporting a recovered Review Candidate, rerun the full gate:

- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- CSV shape check if progress changes;
- non-printing/credential/private-data scan over changed tracked/untracked files plus ignored prompt artifact;
- ignored-artifact check;
- watched-port/process check;
- `git status --short --branch`

## Stop Conditions

Stop and report before source changes or backup actions if the follow-up would require:

- remote Supabase migration/RPC/RLS/schema/table/bucket/grant work;
- deployment configuration changes, release, public tunneling, or Git/GitHub backup;
- gameplay-rule, reward, scoring, Elo/rating, Daily claim, Solo persistence, multiplayer matchmaking, ranked queue, or private Practice expansion changes;
- broad redesign, UI toolkit adoption, image-generation concept work, minimal-shell stripping, or Phase 52 implementation;
- stable `brrrdle` repository work;
- unsafe credential/private-data handling.

## Recommended Next Prompt

Use the ignored prompt artifact `prompt-packages/phase-51/PHASE-51-ACCOUNT-PROFILE-MOBILE-SCROLL-REVIEW-FOLLOW-UP-PROMPT-2026-07-09.md` to authorize the bounded source/test implementation follow-up.
