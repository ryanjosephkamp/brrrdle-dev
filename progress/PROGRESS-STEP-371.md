# Progress Step 371 - Phase 42 Stage 42.4F Ranked Result RLS Recursion Repair

**Status**: Completed - Awaiting User Review Before Stage 42.5
**Phase**: Phase 42 - Site Stats, Developer Dashboard, Onboarding, And Help
**Stage**: 42.4F - Ranked result RLS recursion repair
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T16:05:00Z
**Completed**: 2026-07-03T16:09:39Z

## Authorization

The user authorized Phase 42 Stage 42.4F only: narrow Supabase RLS policy target/recursion repair for the two remaining ranked result table probes after Stage 42.4E.

Authorized work included confirming repo state and the stable-repo boundary, preserving `planning/phase-41/REVIEW-CHECKLIST.md`, confirming the linked Supabase target without printing secrets, reading Stage 42.4B, 42.4D, and 42.4E evidence, auditing only RLS policies and grants needed for `multiplayer_match_results` and `multiplayer_player_results`, creating exactly one additive migration if safe, applying it only after clean dry-run and target confirmation, running non-printing probes, creating this progress report and matching 12-column CSV row, and running lightweight verification.

This stage did not authorize Stage 42.5 source integration, public stats/developer dashboard source work, onboarding/help/tutorial implementation, broad authenticated table-grant cleanup, unrelated migrations, Supabase/Vercel configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- `origin/main`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-41/REVIEW-CHECKLIST.md` was preserved.

## Supabase Target Confirmation

- Linked project metadata was present and matched the expected `brrrdle-dev`/`brrrdle` development target by name.
- The linked project ref was present but was not printed.
- Credentials were not printed.

## RLS Audit Decision

Policy metadata showed:

- `multiplayer_match_results` SELECT policy was role-targeted to `public` and cross-referenced `multiplayer_player_results`.
- `multiplayer_player_results` SELECT policy was role-targeted to `public` and self-referenced `multiplayer_player_results`.
- Direct `anon` table privileges were already removed by Stage 42.4E.
- `authenticated` retained SELECT/INSERT/UPDATE table privileges needed by existing legacy participant/trusted settlement paths.

This was safe to repair with one narrow additive migration by retargeting the two SELECT policies to `authenticated` and removing the player-result policy self-reference.

## Migration

Created and applied exactly one additive migration:

- `supabase/migrations/20260703160756_phase42_ranked_result_rls_recursion_repair.sql`

The migration:

- drops and recreates `Users can read own player results` on `public.multiplayer_player_results` as a SELECT policy for `authenticated` using direct `user_id = auth.uid()`;
- drops and recreates `Users can read own match results` on `public.multiplayer_match_results` as a SELECT policy for `authenticated`, allowing a viewer to read a match result when their own player-result row belongs to that match;
- does not create helper functions;
- does not change table grants;
- does not alter trusted settlement RPCs, ranked queue behavior, public leaderboard behavior, private matchmaking, public/guest spectator contracts, Daily claim behavior, gameplay rules, or Elo math.

Migration execution:

- `npx --yes supabase db push --linked --dry-run`: passed and showed only `20260703160756_phase42_ranked_result_rls_recursion_repair.sql` would be pushed.
- `npx --yes supabase db push --linked --yes`: passed and applied the migration.
- Post-apply ledger probe showed version `20260703160756` recorded.

## Non-Printing Probe Results

Passed:

- Policy metadata now shows both ranked result SELECT policies are role-targeted to `authenticated`.
- `multiplayer_player_results` policy no longer self-references `multiplayer_player_results`.
- Anonymous zero-row probes for `multiplayer_match_results` and `multiplayer_player_results` are denied before RLS recursion.
- Authenticated zero-row probes for `multiplayer_match_results` and `multiplayer_player_results` pass without RLS recursion.
- Direct `anon` public-schema table privilege probe remains `0`.
- Direct `anon` public-schema sequence privilege probe remains `0`.
- Public stats remains executable by `anon` and `authenticated`.
- Admin dashboard remains denied to `anon` and executable by `authenticated`.
- Public profile and public spectator RPCs remain public as intended.
- Daily claim remains denied to `anon` and executable by `authenticated`.
- Public ranked leaderboard, participant identity, and private matchmaking v2 accept remain denied to `anon` and executable by `authenticated`.
- Behavioral probes passed for admin dashboard anonymous denial, Daily claim anonymous denial, and anonymous public stats/profile/spectator success.

Residual:

- Stage 42.4E's `supabase_admin`-owned default privileges remain a documented future-object risk because the linked `postgres` migration role cannot alter them. They are not an active direct anonymous table/sequence grant after Stage 42.4E and Stage 42.4F.

## Stage 42.5 Status

Stage 42.5 can proceed after user review if the user accepts the documented residual `supabase_admin` future-object risk as a later hardening item.

## Verification

Lightweight verification:

- `npx --yes supabase db push --linked --dry-run`: passed and reported the remote database is up to date.
- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: `rows=373 columns=[12] last_id=371`.
- Non-printing changed/untracked file credential scan: `scanned_files=29 credential_pattern_hits=0`.
- Ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check: `port_5173=clear`, `port_5174=clear`, `port_3000=clear`, `port_4173=clear`.
- `git status --short --branch`: completed and showed expected uncommitted Phase 42 planning/progress/source artifacts, the preserved Phase 41 checklist, the Stage 42.4 stats/dashboard migration, the Stage 42.4E browser-grant repair migration, the Stage 42.4F ranked-result RLS repair migration, and the new Stage 42.4F progress artifacts.

## Next Gate

The next safe gate is Stage 42.5 public stats and private developer dashboard source integration only.
