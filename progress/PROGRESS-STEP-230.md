# Progress Step 230: Phase 30 Stage 30.3 Public Leaderboard Migration/RLS Execution

**Status**: Completed - Awaiting User Review Before Stage 30.4
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-23T01:20:08Z
**Completed**: 2026-06-23T01:23:28Z

## Authorization

The user authorized Phase 30 Stage 30.3 only: public leaderboard migration/RLS execution following the approved Stage 30.2 addendum.

Allowed work:

- read governance, Phase 30 planning/spec/implementation materials, the Stage 30.2 leaderboard RLS addendum, current progress records, public profile foundations, trusted ranked/rating surfaces, Supabase/RLS context, relevant migrations/docs;
- create one additive Supabase migration;
- apply it only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous;
- run non-printing privacy probes;
- create this Stage 30.3 progress report and append the matching 12-column row to `progress/PROGRESS.csv`.

Not authorized:

- app source/runtime implementation;
- test implementation beyond migration/probe support;
- public leaderboard UI;
- Multiplayer Overview cleanup implementation;
- Vercel configuration;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 31 work;
- Phase 32 ranked mode expansion;
- public/guest spectation;
- service workers or push infrastructure;
- Elo algorithm changes;
- gameplay-rule changes;
- new custom skills;
- force-push, secret printing, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `ec5d7824104d9d41e79b2b49e475c68006cf40da`
- `origin/main`: `ec5d7824104d9d41e79b2b49e475c68006cf40da`
- Remote: `origin` points to `ryanjosephkamp/brrrdle-dev`.
- Worktree: dirty from expected uncommitted Phase 30 planning/progress artifacts plus the Stage 30.3 migration and progress report.
- Original stable repository: not used.

## Migration Created

Created:

- `supabase/migrations/20260623011923_phase30_public_ranked_leaderboard_rpc.sql`

The migration adds:

- `public.get_public_ranked_leaderboard(p_bucket text default null, p_limit integer default 50, p_offset integer default 0)`

The RPC is intended to be authenticated-only, `security definer`, stable, live-computed, and restricted to ranked Practice v1 buckets backed by storage buckets `async:og` and `async:go`.

## Target Confirmation

- Confirmed local repository path: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed `origin` remote points to `ryanjosephkamp/brrrdle-dev`.
- Confirmed local Supabase project ref: `fdwmvgervclziuoxbmeg`.
- Confirmed linked project metadata identifies the project as `brrrdle-dev`.
- Confirmed remote migration history before apply had exactly one pending local migration: `20260623011923_phase30_public_ranked_leaderboard_rpc.sql`.
- No secrets, Supabase keys, tokens, auth state, environment contents, private rows, or local session artifacts were printed.

## Migration Execution

- Used `npx --yes supabase` because `supabase` was not available directly on the shell `PATH`.
- `npx --yes supabase db push --linked --dry-run` reported exactly one migration to apply: `20260623011923_phase30_public_ranked_leaderboard_rpc.sql`.
- `npx --yes supabase db push --linked --yes` applied the migration successfully to the confirmed `brrrdle-dev` project.
- `npx --yes supabase migration list --linked` confirmed remote migration history now includes `20260623011923`.

## Privacy Probes

Passed non-printing Stage 30.3 privacy probes:

- function exists;
- function is `security definer`;
- function volatility is stable;
- `anon` does not have execute privilege;
- `authenticated` has execute privilege;
- declared return shape excludes forbidden fields;
- anon claim execution is denied by the RPC auth gate;
- authenticated claim execution succeeds;
- all returned rows, if any, use only approved public buckets;
- `multiplayer:og` and `multiplayer:go` filters return only matching public buckets;
- active public profile joins are enforced;
- zero-game rows are omitted;
- forbidden keys are absent from returned row objects;
- positive rank and `ranked-practice-v1` leaderboard key invariants hold for returned rows;
- invalid buckets, legacy `async:*` public inputs, out-of-range limits, and out-of-range offsets are rejected.

Probe output was limited to pass/fail booleans and did not print raw leaderboard rows or private user data.

## Verification

Passed:

- `git diff --check`
- Python CSV shape check using `python3 -S`: 232 rows, 12 columns, last progress ID `230`
- `git status --short --branch`

## Blockers

No blockers.

## Boundary Confirmation

No app source/runtime code, test implementation beyond migration/probe support, public leaderboard UI, Multiplayer Overview cleanup, Phase 31 work, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, deployment, commits, pushes, PRs, merges, releases, branch deletion, new custom skills, force-push, secret printing, or original stable repository work was performed.
