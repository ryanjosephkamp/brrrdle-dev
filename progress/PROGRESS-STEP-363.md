# Progress Step 363 - Phase 42 Stage 42.1 Observability, Onboarding, And Queue-Flash Audit

**Status**: Completed - Awaiting User Review Before Stage 42.2
**Phase**: Phase 42 - Site Stats, Developer Dashboard, Onboarding, And Help
**Stage**: 42.1 - Observability, onboarding, and queue-flash audit
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T14:42:12Z
**Completed**: 2026-07-03T14:45:33Z

## Authorization

The user authorized Phase 42 Stage 42.1 only: read-only observability, onboarding, and queue-flash audit using the completed Stage 42.0 protected baseline.

Authorized work includes reading governance, Phase 42 planning/spec/implementation materials, Stage 42.0 progress, current progress records, public stats surfaces, private developer/admin dashboard surfaces, onboarding/help/tutorial route and UX surfaces, ranked Practice queue button/status surfaces, relevant tests, Supabase/RLS context as needed, creating this progress report and the matching 12-column CSV row, running focused read-only/browser/resource checks as needed, and deciding the safest Stage 42.2 and Stage 42.3 paths.

This stage does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- `origin/main`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-41/REVIEW-CHECKLIST.md` was preserved.

## Required Reading Summary

- `CONSTITUTION.md`, prompt package/governance standards, phase sizing guidance, `BRRRDLE-SPEC.md`, testing guidance, Phase 42 planning/spec/implementation documents, and Stage 42.0 progress were reviewed for authority, scope, and stop conditions.
- Source/test audit covered current admin, stats, leaderboard, route/navigation, dashboard, notification, ranked queue, and reliability E2E surfaces.
- Supabase/RLS documentation and migrations were inspected for existing admin, public leaderboard, private request, ranked queue, and public-profile contracts.

## Public Stats Audit

- Current `src/stats/StatsDashboard.tsx` is explicitly local/private player statistics. It renders local gameplay buckets, private history-derived charts, XP progress, and coin trend data from the current browser or synced player state. It is not a public site-wide stats surface.
- Current public-facing aggregate gameplay data is mainly the authenticated public ranked Practice leaderboard path. `src/leaderboards/publicRankedLeaderboard.ts` uses strict allowlists and forbidden-field checks for public leaderboard rows, and `src/leaderboards/PublicRankedLeaderboardPanel.tsx` keeps the leaderboard authenticated-only in the current version.
- Public stats can reuse the leaderboard parser style, but a useful live-site stats v1 would need either a very narrow source-only summary from existing safe public leaderboard data or a new privacy-safe aggregate projection/RPC. The latter is the safer path for meaningful public site stats.

## Developer/Admin Dashboard Audit

- `src/admin/AdminPanel.tsx` and `src/admin/authorization.ts` already provide a role-gated admin surface. Anonymous, unconfigured, and non-admin users receive locked states.
- The current admin UI is manual word-list refresh only. `src/admin/ManualRefreshControls.tsx` sends requests to `/api/admin-refresh` with the current Supabase access token and states that service-role credentials must never reach the browser.
- `docs/supabase.md` documents that admin privileges are assigned outside browser code and that `/api/admin-refresh` must reject missing auth and non-admin auth.
- A broader developer/admin dashboard should not rely on hidden UI alone. Any new operational database read, telemetry view, raw row inspection, or admin-only projection should go through a Stage 42.3 migration/RLS addendum before source integration.
- `src/admin/README.md` still describes a Phase 0 placeholder, which is stale relative to the current manual refresh surface. This is documentation cleanup scope for a later implementation/hardening gate, not a Stage 42.1 change.

## Onboarding, Help, And Tutorial Audit

- Existing route inventory includes `about`, `settings`, `feedback`, `stats`, `leaderboard`, `profile`, and `admin`, but there is no first-class `help`, `tutorial`, or `onboarding` route.
- `AboutBrrrdlePanel` contains general product context and detailed ranked Elo explanation. Settings includes many contextual tooltips and copy for difficulty, GO chain length, Hard Mode, themes, Daily countdowns, and notification preferences.
- Navigation state already persists route/subtab state through `src/app/navigationState.ts`. Any new Help route or help panels can likely remain source-only.
- Persistent first-run onboarding/dismissal state should use an approved existing guest/account storage path or remain deferred until an explicit storage contract is approved.

## Ranked Queue Flashing Audit

- User manual review reported the remaining symptom: when a player opens a ranked Practice multiplayer queue, buttons on the Practice Multiplayer subtab still flash roughly every five seconds.
- Stage 42.1 did not create a real ranked queue in-browser because that would mutate remote Supabase queue state and this gate is read-only.
- Static source evidence matches the timing: `RANKED_QUEUE_REFRESH_INTERVAL_MS` is `5000`, and `MultiplayerPanel` auto-refreshes queued ranked requests on that interval.
- The queue refresh path sets `rankedQueueBusy` to `true` before each poll and back to `false` afterward. The main create button label switches to `Ranked queue working` when busy and `Already queued` when queued and not busy. The visible `Check ranked queue` and `Cancel ranked queue` buttons are disabled while busy. This likely causes label/disabled-state/style churn every poll.
- Classification: polling refresh state reset plus button label/disabled state churn. Current evidence does not indicate a server status transition, route/focus/visibility refresh issue, or deeper ranked queue/settlement database-contract bug.

## Test And E2E Audit

- Existing unit tests cover ranked queue active request helpers and auto-refresh gating in `src/multiplayer/MultiplayerPanel.test.tsx`.
- Existing real Supabase-backed E2E coverage in `e2e/gameplay/multiplayer-reliability.spec.ts` covers cancelled ranked queue exclusion, ranked queue re-entry after cancellation, public leaderboard freshness, mobile private request list freshness, and private request routing.
- The missing Stage 42.2 coverage is a focused assertion that queued ranked Practice auto-refresh does not visibly churn the primary create button label or important queue action disabled states during routine polling.

## Chosen Stage 42.2 Path

Stage 42.2 can remain source/test-only.

Recommended Stage 42.2 scope:

- Keep the ranked queue poller and server contract intact.
- Decouple background polling from visible action busy state unless the user explicitly clicks a queue action.
- Keep the primary create button stable as `Already queued` while background polling confirms the queued state.
- Avoid disabling `Check ranked queue` or `Cancel ranked queue` for background-only polling if safe, while still preventing duplicate explicit user actions.
- Add focused unit/component and, if practical, browser/E2E coverage for no visible five-second label/status/button churn during queued ranked Practice background refresh.
- Preserve ranked queue cancellation, matching, search-again, trusted settlement, Daily exclusion, gameplay rules, and Elo math.

No migration/RLS addendum is required for Stage 42.2 based on the audit.

## Chosen Stage 42.3 Path

Stage 42.3 should create a migration/RLS addendum for the stats/dashboard data contract before any meaningful public stats or private developer dashboard source integration.

Reasoning:

- Current local stats are private and not appropriate for public live-site stats.
- Existing public ranked leaderboard data is safe but too narrow to cover the broader public live-site stats and developer/admin dashboard goals by itself.
- Current admin UI is role-gated but not a general dashboard data contract.
- Public aggregate stats and admin-only observability reads need explicit field allowlists, grants, denial probes, and forbidden-field probes before SQL execution or source integration.

Onboarding/help/tutorial route work can remain source-only later if it avoids new persistence or uses only approved existing storage.

## Browser And Resource Observations

- No local dev server was started. The audit remained source/documentation-based because real ranked queue reproduction would require creating remote queue state.
- No screenshots, videos, traces, auth state, tokens, or local browser artifacts were created.
- Watched-port cleanup checks are recorded under Verification.

## Verification

Verification passed:

- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: `rows=365 columns=[12] last_id=363`.
- Non-printing changed/untracked file credential scan: `scanned_files=13 credential_pattern_hits=0`.
- Ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check: `port_5173=clear`, `port_5174=clear`, `port_3000=clear`, `port_4173=clear`.
- `git status --short --branch`: completed and showed the expected uncommitted Phase 42 planning/spec/progress artifacts plus the preserved Phase 41 checklist.

## Blockers

None.

## Next Gate

The next safe gate is Stage 42.2 ranked Practice queue button/status flashing follow-up only.

Do not begin Stage 42.2 until the user explicitly authorizes it. Stage 42.3 should follow after Stage 42.2 review unless a later prompt reroutes the phase.
