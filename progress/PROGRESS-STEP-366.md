# Progress Step 366 - Phase 42 Stage 42.4 Stats Dashboard Migration RLS Execution

**Status**: Blocked - Awaiting User Review Before Source Integration
**Phase**: Phase 42 - Site Stats, Developer Dashboard, Onboarding, And Help
**Stage**: 42.4 - Stats/dashboard migration-RLS execution
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T15:26:00Z
**Completed**: 2026-07-03T15:34:09Z

## Authorization

The user authorized Phase 42 Stage 42.4 only: migration/RLS execution for the reviewed Stage 42.3 stats/dashboard addendum.

Authorized work included reading governance, Phase 42 planning/spec/implementation materials, Stage 42.3 addendum/progress, Supabase/RLS context, relevant existing migrations, creating the next progress report and matching 12-column CSV row, creating exactly one additive Supabase migration implementing the Stage 42.3 addendum, applying it only to the confirmed `brrrdle-dev` Supabase project if target and credentials were unambiguous, running required non-printing probes, updating docs only if needed, and running lightweight verification.

This stage did not authorize public stats/developer dashboard source integration, onboarding/help/tutorial implementation, additional unrelated migrations, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- `origin/main`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-41/REVIEW-CHECKLIST.md` was preserved.

## Supabase Target Confirmation

- Supabase CLI was available: `2.109.0`.
- Linked project metadata was present and matched the expected `brrrdle-dev`/`brrrdle` development target by name.
- The linked project ref was present but was not printed.
- Credentials were not printed.

## Migration

Created exactly one additive migration:

- `supabase/migrations/20260703152720_phase42_site_stats_dashboard_rpc.sql`

The migration added:

- `public.get_public_site_stats_v1()`;
- `public.get_admin_operational_dashboard_v1()`.

The migration:

- grants public site stats RPC execution to `anon` and `authenticated`;
- grants admin dashboard RPC execution to `authenticated` only;
- denies anonymous admin dashboard execution;
- enforces admin dashboard access inside the security-definer RPC using JWT admin metadata or the existing `public.profiles.role = 'admin'` marker;
- returns aggregate-only public stats fields;
- returns authenticated-admin-only aggregate operational dashboard fields;
- adds no direct table grants;
- creates no helper functions;
- does not alter existing public profile, public leaderboard, private matchmaking, participant identity, public/guest spectator, Daily claim, ranked queue, trusted settlement, gameplay, or Elo contracts.

## Migration Execution Result

- `npx --yes supabase db push --linked --dry-run`: passed and showed exactly one migration would be applied.
- `npx --yes supabase db push --linked --yes`: passed and applied `20260703152720_phase42_site_stats_dashboard_rpc.sql` to the linked development database.

## Non-Printing Probe Results

Passed:

- New RPC grant probe: public stats granted to `anon`/`authenticated`; admin dashboard granted to `authenticated` and not `anon`.
- Public stats anonymous execution probe.
- Public stats authenticated execution probe.
- Public stats allowlisted-field and forbidden-key probe.
- Admin dashboard anonymous denial probe.
- Admin dashboard non-admin denial probe.
- Admin dashboard admin-JWT success probe.
- Admin dashboard allowlisted-field and forbidden-key probe.
- Migration-file direct-table-grant absence probe.
- No-helper-function probe.
- Existing public profile RPC grant boundary probe.
- Existing public ranked leaderboard authenticated-only grant boundary probe.
- Existing participant identity authenticated-only grant boundary probe.
- Existing public/guest spectator and Daily claim grant boundary probe.
- Existing private matchmaking authenticated-only grant boundary probe.

Blocked:

- The required direct private-table grant probe found pre-existing direct `anon` table privileges in the linked development database for protected tables including `profiles`, `async_multiplayer_games`, `multiplayer_matchmaking_queue`, `multiplayer_rating_profiles`, `multiplayer_match_results`, `multiplayer_player_results`, `multiplayer_rating_transactions`, and `multiplayer_daily_claims`.
- `multiplayer_private_match_requests` did not show the same direct `anon` table grants.
- RLS is enabled on the checked protected tables.
- The Stage 42.4 migration did not introduce these table grants, and the repository migration history searched during this stage did not contain direct `anon` table grants for those protected tables.

Because Stage 42.4 explicitly required a no-direct-private-table-grants probe, source integration should not proceed until the user reviews this pre-existing database-grant boundary and authorizes the safest follow-up.

## Documentation Updates

No `docs/supabase.md` update was made in this blocked pass. The new RPC migration exists locally and has been applied remotely, but the required direct table-grant probe did not pass cleanly enough to document the Stage 42.5 source-integration contract as ready.

## Verification

Lightweight local verification passed:

- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: `rows=368 columns=[12] last_id=366`.
- Non-printing changed/untracked file credential scan: `scanned_files=21 credential_pattern_hits=0`.
- Ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check: `port_5173=clear`, `port_5174=clear`, `port_3000=clear`, `port_4173=clear`.
- `npx --yes supabase db push --linked --dry-run`: passed and reported the remote database is up to date.
- `git status --short --branch`: completed and showed expected uncommitted Phase 42 planning/progress/source artifacts, the preserved Phase 41 checklist, and the new Stage 42.4 migration/progress artifacts.

The Stage 42.5 source-integration gate remains blocked by the non-secret direct-grant probe finding above.

## Blockers

Stage 42.5 should not begin yet.

The safest next gate is a narrow Stage 42.4B Supabase grant/RLS boundary triage addendum or repair-planning pass. That gate should decide whether the pre-existing direct `anon` grants are an intentional dev-only artifact, a Supabase role/reporting nuance, or a real grant cleanup issue requiring a separate reviewed migration.

## Next Gate

Do not begin Stage 42.5 source integration until the direct private-table grant finding is reviewed.

The next safe gate is Stage 42.4B Supabase grant/RLS boundary triage and repair planning only.
