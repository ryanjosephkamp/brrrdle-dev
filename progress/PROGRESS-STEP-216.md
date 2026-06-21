# Progress Step 216: Phase 29 Stage 29.1 Reproduction/Audit

**Status**: Completed - Stage 29.2 Migration/RLS Addendum Required
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-21T00:07:14Z
**Completed**: 2026-06-21T00:11:10Z

## Authorization

The user authorized Phase 29 Stage 29.1 only: reproduction/audit for public profile foundations, notification action routing, Notification Center action cleanup, and Elo/About relocation.

Allowed work:

- read required governance, Phase 29 planning/spec/implementation materials, current progress records, relevant source/test files, and Supabase/RLS context;
- create this progress report and append the matching 12-column row to `progress/PROGRESS.csv`;
- run watched-port, process, disk, memory, and load checks before and after any browser/dev-server work;
- audit or reproduce the Stage 29.1 profile, notification, Notification Center, and Elo/About issues;
- decide whether Stage 29.2 migration/RLS addendum planning is required.

Not authorized:

- source/runtime implementation or test implementation;
- Supabase migration creation or execution;
- Supabase or Vercel configuration;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Stage 29.2, Phase 30, public leaderboards, or public/guest spectation;
- service workers or push infrastructure;
- Elo algorithm or gameplay-rule changes;
- new custom skills, force-push, secret printing, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- `origin/main`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- Original stable repository: not used.

## Pre-Audit Resource Snapshot

- Watched ports: no listeners on `5173`, `5174`, `3000`, or `4173`.
- Matching process summary: existing Chrome, Safari/WebKit, Codex `node_repl`, and `node` helper processes were present; no watched-port listener was found.
- Disk snapshot: `/System/Volumes/Data` reported 460 Gi total, 330 Gi used, 92 Gi available, 79% used.
- Load snapshot: `3.24 2.89 2.78`.
- Memory snapshot: free 13561 pages; active 255667 pages; inactive 253660 pages; speculative 1506 pages; wired 207329 pages; compressor 405441 pages.

## Audit Findings

- Public profile foundations need Stage 29.2 migration/RLS addendum planning. Existing account/profile surfaces are private account metadata: `profiles` is owner/admin scoped, `auth.users` metadata contains raw auth identity, and no public-safe identity projection/RPC/view currently exists. Public profile work should use an additive public-safe projection with owner-controlled writes, opaque public identifiers, default-private/opt-in visibility, allow-listed fields, and privacy probes that deny raw auth emails, auth IDs, private account metadata, private progress, ranked-private projections, answer-bearing data, session artifacts, tokens, and local artifacts.
- Avatar/public identity semantics need explicit planning. Existing optional avatar storage documentation uses paths under `avatars/<user-id>/...`, which is acceptable for private account display but should not be assumed safe for public identity without an approved public projection strategy.
- Browser notification click routing has a source-confirmed gap. Browser notifications are created from redacted payloads, but the returned `Notification` instance is not wired with an `onclick` handler and no durable browser-notification click bridge dispatches the existing dashboard action target. In-app notification activation already routes through `dispatchDashboardAction`, so Stage 29 can reuse that route/subtab/selected-game path for browser notification clicks.
- Chrome browser notification delivery was audited from source, not browser-reproduced. There is no Chrome-specific dispatch path; delivery depends on app preferences, browser permission, OS notification settings/focus behavior, foreground visibility suppression, and fingerprint dedupe. Stage 29 should add focused Chrome diagnostics without service workers or push infrastructure.
- Notification Center `Mark read` and `Dismiss` are distinct internally but mostly redundant in the current visible UI. `readAt` contributes to read counts and supports source-change resurfacing; `dismissedAt` hides an item. Because there is no read/archive review workflow, the primary UI should likely simplify around `Open`, `Mark read`, and a top-of-panel `Mark all read`, with any persistent hide/dismiss behavior demoted or renamed only if still useful.
- Elo transparency currently has long copy in ranked multiplayer surfaces and no dedicated About-tab Elo section. The safest Phase 29 path is to move the long explanation into About, expand it with definitions for K factor/provisional games/expected-score curve/rating buckets/ranked Practice v1/match points versus Elo movement, and leave only compact ranked-surface links or buttons that route/focus the About Elo section. The Phase 27 Elo model should remain unchanged.
- A dev server/browser reproduction was not started. Source and focused existing-test audit were sufficient to classify the required Stage 29.2 migration/RLS planning gate and the Stage 29.5/29.6 app-work targets without creating browser artifacts.

## Verification

- Focused audit tests passed: `npx vitest run src/account/profile.test.ts src/account/ProfilePanel.test.tsx src/notifications/browserNotifications.test.ts src/notifications/notificationActions.test.ts src/notifications/notificationStorage.test.ts src/notifications/notificationViewModels.test.ts src/notifications/NotificationCenter.test.tsx src/dashboard/dashboardActions.test.ts src/app/routes.test.ts src/app/navigationState.test.ts src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/MultiplayerStatsPanel.test.tsx` (12 files, 84 tests).
- `git diff --check`: passed.
- Python CSV shape check using `python3 -S`: passed after this progress row update.
- `git status --short --branch`: completed for final worktree reporting.

## Post-Audit Resource Snapshot

- Watched ports: no listeners on `5173`, `5174`, `3000`, or `4173`.
- Matching process summary: existing Chrome, Safari/WebKit, and Codex `node_repl` helper processes were present; no Stage 29.1-owned dev server, browser, or Playwright process was started.
- Disk snapshot: `/System/Volumes/Data` reported 460 Gi total, 330 Gi used, 92 Gi available, 79% used.
- Load snapshot: `4.12 3.46 3.05`.
- Memory snapshot: free 41611 pages; active 226693 pages; inactive 221536 pages; speculative 5499 pages; wired 198966 pages.

## Blockers

No blockers. Stage 29.2 migration/RLS addendum planning is required before public profile implementation can safely proceed.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, Supabase or Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Stage 29.2 work, Phase 30 work, public leaderboards, public/guest spectation, service workers or push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, or original stable repository work was performed.
