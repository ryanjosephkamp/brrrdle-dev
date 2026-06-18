# Progress Step 209: Phase 28 Stage 28.5 Notification Delivery Stabilization

**Status**: Completed - Awaiting User Review Before Stage 28.6.
**Date**: 2026-06-18.
**Repository**: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Branch**: `main`.

## Authorization

The user authorized Phase 28 Stage 28.5 only: notification delivery stabilization within the existing no-service-worker/no-push Phase 25/26 notification architecture.

Authorized work:

- read governance, Phase 28 planning/spec/progress materials, `agents.md`, `memory.md`, package/test surfaces, and relevant notification, Settings, sound, app, dashboard, and E2E surfaces;
- create this progress report and append the matching `progress/PROGRESS.csv` row;
- audit existing browser and foreground notification preference flow;
- fix notification delivery only within existing foreground/browser notification architecture;
- preserve Stage 28.4 Live spectator behavior, Phase 27 ranked behavior, Daily Multiplayer invariants, and gameplay rules;
- add focused tests for notification preferences, delivery gating, foreground/browser behavior, and no-secret/no-private-data payload safety;
- run focused notification tests first, then the Stage 28.5 verification gate.

Not authorized:

- Supabase migration creation or execution;
- Elo transparency implementation;
- public/guest spectation;
- public profiles;
- public leaderboards;
- service workers or push infrastructure;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 29 work;
- gameplay-rule changes;
- new custom skills;
- force-push;
- secret printing;
- original stable `brrrdle` repository work.

## Starting Repository State

Confirmed before editing:

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- branch: `main`
- `HEAD`: `a051931dad51e554be151bc45e811efc18f4f04d`
- `origin/main`: `a051931dad51e554be151bc45e811efc18f4f04d`
- remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`
- original stable repo: not used; this pass stayed inside `brrrdle-dev`

Existing uncommitted Phase 28 planning/spec/progress, Stage 28.3 migration, and Stage 28.4 source/test artifacts were present and preserved.

## Work Completed

Created:

- `progress/PROGRESS-STEP-209.md`

Updated:

- `progress/PROGRESS.csv`
- `src/app/App.tsx`
- `src/notifications/browserNotifications.test.ts`
- `src/notifications/browserNotifications.ts`

Implementation summary:

- Confirmed Stage 28.1's notification audit finding: Settings can request/report browser notification permission and store the preference, while notification view models and notification sound dispatch exist, but the app had no `Notification` constructor delivery path.
- Added deterministic browser notification fingerprint, selection, payload, and dispatch helpers inside the existing browser notification module.
- Wired `App.tsx` to dispatch browser notifications from the existing Notification Center item stream after initial hydration only.
- Preserved the Settings-only permission request path; the app never asks for browser notification permission during gameplay.
- Gated browser dispatch on supported/granted permission, enabled foreground browser preference, enabled in-app notification preference, existing importance filtering, unread/undismissed state, duplicate fingerprints, and current-route suppression.
- Chose the Stage 28.5 routing heuristic from the implementation plan: suppress visible-document browser notifications when the user is already viewing the exact target surface, but allow hidden-document notifications.
- Built payloads only from notification title/detail copy, redacting raw email-like strings and UUIDs, and using `silent: true` so browser notifications do not bypass the existing notification sound preference architecture.
- Did not add service workers, push subscriptions, background delivery, cross-device notification infrastructure, public APIs, or deployment configuration.
- Preserved Stage 28.4 Live spectator behavior, Phase 27 ranked behavior, Daily Multiplayer invariants, and gameplay rules.

## Verification

Passed:

- Focused notification tests: `npm run test -- src/notifications/browserNotifications.test.ts src/notifications/notificationPreferences.test.ts src/notifications/notificationSounds.test.ts src/account/Settings.test.tsx` (4 files, 21 tests).
- `npm run lint`.
- `npm run test` (96 files, 621 tests).
- `npm run build` after correcting Stage 28.5 TypeScript issues; passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.
- `git diff --check`.
- Python CSV shape check using `PYTHONDONTWRITEBYTECODE=1 PYTHONNOUSERSITE=1 python3 -S` streaming parser: `rows=211 columns=12 last_id=209`.
- `git status --short --branch`.

Transient corrected issue:

- The first `npm run build` attempt failed with non-secret TypeScript errors from this stage's edits: missing `DashboardActionTarget` type import in `src/app/App.tsx` and unsupported `renotify` in this project's `NotificationOptions` type surface. Both were corrected inside the Stage 28.5 scope, focused tests were rerun, and the full build passed.

## Blockers

None. Stage 28.5 completed cleanly after the corrected TypeScript build retry.

## Boundary Confirmation

No Supabase migrations, Elo transparency implementation, public/guest spectation, public profiles, public leaderboards, service workers or push infrastructure, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 29 work, gameplay-rule changes, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
