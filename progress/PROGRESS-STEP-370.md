# Progress Step 370 - Phase 42 Stage 42.4E Partial Browser Grant Repair Execution

**Status**: Blocked - Awaiting User Review Before Stage 42.5
**Phase**: Phase 42 - Site Stats, Developer Dashboard, Onboarding, And Help
**Stage**: 42.4E - Partial browser grant repair execution
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T15:54:00Z
**Completed**: 2026-07-03T16:04:04Z

## Authorization

The user authorized Phase 42 Stage 42.4E only: revise and execute the partial Supabase browser grant repair approved by Stage 42.4D.

Authorized work included confirming repo state and the stable-repo boundary, preserving `planning/phase-41/REVIEW-CHECKLIST.md`, confirming the linked Supabase target without printing secrets, verifying remote migration ledger state, revising only the un-applied `20260703154556` migration, applying it only after a clean dry-run and target confirmation, running non-printing probes, recording the remaining `supabase_admin` default privileges as residual future-object risk if active anonymous access was repaired, creating this progress report and matching CSV row, and running lightweight verification.

This stage did not authorize Stage 42.5 source integration, source/runtime implementation, broad test implementation, additional unrelated migrations, broad authenticated table-grant cleanup, Supabase/Vercel configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- `origin/main`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-41/REVIEW-CHECKLIST.md` was preserved.

## Supabase Target And Ledger Confirmation

- Linked project metadata was present and matched the expected `brrrdle-dev`/`brrrdle` development target by name.
- The linked project ref was present but was not printed.
- Credentials were not printed.
- Remote migration ledger did not contain version `20260703154556` before the revised migration was applied.
- Migration connection metadata remained `current_user=postgres` and `session_user=postgres`.

## Migration Revision And Execution

Revised only:

- `supabase/migrations/20260703154556_phase42_browser_grant_rls_repair.sql`

The revision:

- removed `supabase_admin` default-privilege alteration statements that the linked `postgres` migration role cannot execute;
- retained `postgres` default-privilege revocation for future public-schema tables, sequences, and functions for `anon` and `authenticated`;
- retained existing direct `anon` table and sequence grant revocation across the public schema;
- preserved explicitly intended public RPC execution grants;
- preserved explicitly intended authenticated RPC execution grants required by public profile ownership, Daily claim, public ranked leaderboard, participant identity, ranked queue, private matchmaking, and admin dashboard contracts.

Migration execution:

- `npx --yes supabase db push --linked --dry-run`: passed and showed only `20260703154556_phase42_browser_grant_rls_repair.sql` would be pushed.
- `npx --yes supabase db push --linked --yes`: passed and applied `20260703154556_phase42_browser_grant_rls_repair.sql`.
- Post-apply ledger probe showed version `20260703154556` recorded.
- Post-apply dry-run reported the remote database is up to date.

## Non-Printing Probe Results

Passed:

- Direct `anon` public-schema table privilege probe: `0` hits.
- Direct `anon` public-schema sequence privilege probe: `0` hits.
- Function grant boundary probe:
  - public stats remains executable by `anon` and `authenticated`;
  - admin dashboard is not executable by `anon` and remains executable by `authenticated`;
  - public profile read RPCs remain executable by `anon` and `authenticated`;
  - public/guest spectator RPC remains executable by `anon` and `authenticated`;
  - Daily claim remains denied to `anon` and executable by `authenticated`;
  - public ranked leaderboard remains denied to `anon` and executable by `authenticated`;
  - participant identity remains denied to `anon` and executable by `authenticated`;
  - private matchmaking create and v2 accept remain denied to `anon` and executable by `authenticated`.
- Behavioral denial/success probes:
  - admin dashboard anonymous denial passed;
  - Daily claim anonymous denial passed;
  - public stats anonymous success passed;
  - public profile anonymous success passed;
  - public spectator anonymous success passed.
- Anonymous zero-row probes were denied before RLS for `profiles`, `async_multiplayer_games`, `multiplayer_matchmaking_queue`, `multiplayer_rating_profiles`, `multiplayer_rating_transactions`, `multiplayer_daily_claims`, and `multiplayer_private_match_requests`.

Residual:

- `supabase_admin`-owned default privileges remain for future public-schema table, sequence, and function privileges to `anon` and `authenticated`. This is a residual future-object risk because the linked `postgres` migration role cannot alter `supabase_admin` default privileges. It is not an active direct anonymous table/sequence grant after this migration.

Blocked:

- Anonymous zero-row probes still reached RLS recursion for `multiplayer_match_results` and `multiplayer_player_results`.
- Metadata probes showed `anon` does not have direct SELECT privileges on those two tables, while `authenticated` still has broad table privileges and RLS policies remain public-role policies.
- Because Stage 42.4E required no anonymous zero-row protected-table access reaching RLS evaluation, Stage 42.5 remains blocked.

## Verification

Lightweight verification:

- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: `rows=372 columns=[12] last_id=370`.
- Non-printing changed/untracked file credential scan: `scanned_files=27 credential_pattern_hits=0`.
- Ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check: `port_5173=clear`, `port_5174=clear`, `port_3000=clear`, `port_4173=clear`.
- `npx --yes supabase db push --linked --dry-run`: passed and reported the remote database is up to date.
- `git status --short --branch`: completed and showed expected uncommitted Phase 42 planning/progress/source artifacts, the preserved Phase 41 checklist, the Stage 42.4 stats/dashboard migration, the applied Stage 42.4E repair migration, and the new Stage 42.4E progress artifacts.

## Blockers

Stage 42.5 should not begin yet.

The remaining blocker is now narrower than Stage 42.4C:

- active direct `anon` table/sequence grants are repaired;
- `postgres` future defaults are repaired;
- public/authenticated RPC grants remain bounded;
- `supabase_admin` future defaults remain a documented residual future-object risk;
- but anonymous zero-row SQL probes still reach RLS recursion on `multiplayer_match_results` and `multiplayer_player_results`.

The safest next gate is a narrow Stage 42.4F RLS policy target/recursion repair decision or execution gate for the two ranked result tables only.

## Next Gate

Do not begin Stage 42.5 source integration until the two ranked result table RLS-recursion probes are reviewed and either repaired or explicitly accepted as a SQL-shell-only probe artifact with supporting evidence.
