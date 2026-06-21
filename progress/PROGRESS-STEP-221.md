# Progress Step 221: Phase 29 Stage 29.6 Elo/About Transparency Relocation

**Status**: Completed - Awaiting User Review Before Stage 29.7
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-21T01:59:36Z
**Completed**: 2026-06-21T02:03:26Z

## Authorization

The user authorized Phase 29 Stage 29.6 only: relocate and expand Elo transparency copy into the About tab.

Allowed work:

- read required governance, Phase 29 planning/spec/implementation materials, progress records, ranked/Elo docs, App route surfaces, multiplayer ranked surfaces, rating constants, and relevant tests;
- move long Elo/ranked explanation from ranked multiplayer surfaces into the About tab;
- add compact ranked-surface link/button copy such as `How is Elo calculated?` that routes/focuses the About Elo section;
- expand About copy to define K factor, provisional window, expected-score curve, rating buckets, ranked Practice v1 boundaries, and match points versus Elo movement;
- add focused About/ranked copy/navigation tests;
- update progress records and run focused plus broad verification.

Not authorized:

- Elo algorithm, rating constant, trusted settlement, or gameplay-rule changes;
- migrations or migration execution;
- public leaderboards;
- public/guest spectation;
- Phase 30 work;
- service workers or push infrastructure;
- deployments;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- new custom skills, force-push, secret printing, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- `origin/main`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- Original stable repository: not used.

## Implemented Work

- Stage 29.6 opened after Stage 29.5 completed notification action routing and Notification Center cleanup.
- Added a stable About-tab ranked Elo anchor.
- Added expanded About copy for rating buckets, K factor, provisional games, the expected-score curve, outcome scores, ranked Practice v1 boundaries, and match points versus Elo movement.
- Replaced dense inline Elo explanation on ranked multiplayer surfaces with compact copy and `How is Elo calculated?` actions.
- Routed ranked-surface Elo actions to the About route and focused the ranked Elo section best-effort.
- Updated ranked multiplayer docs to keep public profile identity separate from rating authority and public leaderboards.
- Added focused About/ranked copy tests.

## Verification

Passed:

- Focused About/ranked copy tests: `npm run test -- src/app/AboutBrrrdlePanel.test.tsx src/multiplayer/MultiplayerPanel.test.tsx src/multiplayer/MultiplayerStatsPanel.test.tsx` - 3 files, 18 tests.
- `npm run lint`
- `npm run test` - 98 files, 637 tests.
- `npm run build` - passed with existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Python CSV shape check using `python3 -S`: `csv_shape_ok rows=223 columns=12 last_id=221`

## Blockers

None currently.

## Boundary Confirmation

No Elo algorithm changes, rating constant changes, trusted settlement changes, gameplay-rule changes, migrations, public leaderboards, public/guest spectation, Phase 30 work, service workers, push infrastructure, deployments, commits, pushes, PR creation, merges, releases, branch deletion, new custom skills, force-push, secret printing, or original stable repository work has been performed.
