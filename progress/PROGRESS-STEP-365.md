# Progress Step 365 - Phase 42 Stage 42.3 Stats Dashboard Migration RLS Decision

**Status**: Completed - Awaiting User Review Before Stage 42.4
**Phase**: Phase 42 - Site Stats, Developer Dashboard, Onboarding, And Help
**Stage**: 42.3 - Stats/dashboard migration-RLS addendum or source-only decision
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T15:23:14Z
**Completed**: 2026-07-03T15:24:50Z

## Authorization

The user authorized Phase 42 Stage 42.3 only: stats/dashboard migration-RLS addendum planning or explicit source-only decision using the completed Stage 42.2 ranked Practice queue flashing follow-up baseline.

Authorized work includes reading governance, Phase 42 planning/spec/implementation materials, Stage 42.1 audit progress, Stage 42.2 progress, public stats surfaces, private developer/admin dashboard surfaces, Supabase/RLS context, relevant tests, and local workflow docs enough to decide whether Phase 42 public stats and private developer/admin dashboard work needs a migration/RLS addendum.

This stage does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- `origin/main`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-41/REVIEW-CHECKLIST.md` was preserved.

## Decision

Stage 42.3 created a migration/RLS addendum. Phase 42 stats/dashboard work should not proceed as source-only.

Addendum path:

- `planning/specs/phase-42/PHASE-42-STATS-DASHBOARD-MIGRATION-RLS-ADDENDUM-2026-07-03.md`

## Evidence Summary

- Current `src/stats/StatsDashboard.tsx` is private/local player stats derived from the active player's persisted statistics, history, progression, XP, and coin data. It is not a public live-site stats source.
- Current `src/admin/AdminPanel.tsx`, `src/admin/authorization.ts`, and `src/admin/ManualRefreshControls.tsx` provide a narrow protected manual word-list refresh surface, not a general admin observability dashboard.
- Existing `public.get_public_ranked_leaderboard` is a safe authenticated display-only projection over active public profiles and trusted rating summaries, but it is intentionally limited to ranked Practice leaderboard rows.
- Existing Supabase docs preserve strict privacy boundaries for public profiles, public ranked leaderboards, participant identity, private matchmaking, public/guest spectator projections, Daily claims, ranked queue, trusted settlement, gameplay, and Elo.
- Meaningful public site stats and private developer/admin dashboard data need explicit RPCs, field allowlists, grants, denial probes, and forbidden-field checks before source integration.

## Key Addendum Decisions

- Stage 42.4 should create exactly one additive migration if the user approves the addendum.
- The migration should add `public.get_public_site_stats_v1()` for aggregate public site stats.
- The migration should add `public.get_admin_operational_dashboard_v1()` for authenticated admin-only operational aggregate summaries.
- Public stats should be granted to `anon` and `authenticated`, but only for aggregate non-identifying fields.
- Admin dashboard summaries should be granted only to `authenticated` and must enforce admin authority server-side.
- No direct browser table grants should be added for private tables.
- Public stats must not include per-user rows, per-game rows, active presence, spectator counts/lists, raw IDs, emails, private profile data, private stats/history/progress, raw game projections, answers, seeds, queue/request/rating internals, tokens, or local artifacts.
- Admin dashboard output should stay aggregate-first and must not expose secrets, raw row IDs, raw auth data, private payloads, sessions, answers, seeds, queue/request/rating internals, screenshots, videos, traces, auth state, or local artifacts.
- Stage 42.5 source integration should wait until Stage 42.4 migration/probes pass.

## Protected Boundaries

The addendum preserves:

- Phase 42.2 ranked queue flashing repair;
- Phase 41 multiplayer reliability repairs and real E2E harnesses;
- Phase 40 public profile/private matchmaking boundaries;
- Phase 39 mobile scroll smoothness;
- Phase 38 public/guest spectator read-only boundaries and Daily spectator exclusion;
- public profile privacy;
- public ranked leaderboard display-only authority;
- private Practice request scope;
- Daily claim safety;
- ranked queue/trusted settlement authority;
- gameplay rules and Elo math.

## Verification

Verification passed:

- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: `rows=367 columns=[12] last_id=365`.
- Non-printing changed/untracked file credential scan: `scanned_files=19 credential_pattern_hits=0`.
- Ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check: `port_5173=clear`, `port_5174=clear`, `port_3000=clear`, `port_4173=clear`.
- `git status --short --branch`: completed and showed expected uncommitted Phase 42 planning/progress/source artifacts plus the preserved Phase 41 checklist.

## Blockers

None.

## Next Gate

The next safe gate is Stage 42.4 migration/RLS execution only, after user review of the addendum.

Do not begin Stage 42.4 until the user explicitly authorizes it. Stage 42.4 must not include public stats/developer dashboard source integration, onboarding/help/tutorial implementation, deployment/configuration work, Git/GitHub work, backup workflow execution, or original stable repository work.
