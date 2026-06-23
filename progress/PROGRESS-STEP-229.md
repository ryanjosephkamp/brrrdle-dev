# Progress Step 229: Phase 30 Stage 30.2 Public Leaderboard Migration/RLS Addendum Planning

**Status**: Completed - Awaiting User Review Before Stage 30.3
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-23T00:55:53Z
**Completed**: 2026-06-23T00:56:50Z

## Authorization

The user authorized Phase 30 Stage 30.2 only: public leaderboard migration/RLS addendum planning.

Allowed work:

- read governance, Phase 30 planning/spec/implementation materials, Stage 30.1 findings, public profile foundations, trusted ranked/rating surfaces, Supabase/RLS context, relevant migrations, docs, and tests read-only;
- create this Stage 30.2 progress report and append the matching 12-column row to `progress/PROGRESS.csv`;
- create a precise Phase 30 public leaderboard migration/RLS addendum under `planning/specs/phase-30/`.

Not authorized:

- source/runtime implementation;
- test implementation;
- Supabase migration creation or execution;
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
- Worktree: dirty from expected uncommitted Phase 30 planning/progress artifacts plus this Stage 30.2 addendum and progress report.
- Original stable repository: not used.

## Addendum Created

Created:

- `planning/specs/phase-30/PHASE-30-PUBLIC-LEADERBOARD-RLS-ADDENDUM-2026-06-23.md`

## Key Decisions

- Stage 30.3 should use one additive, allow-listed `security definer` RPC rather than a public mutable leaderboard table.
- Recommended RPC: `public.get_public_ranked_leaderboard(p_bucket text default null, p_limit integer default 50, p_offset integer default 0)`.
- Stage 30 v1 should start authenticated-public, not anonymous-public.
- Stage 30 v1 should include ranked Practice bucket leaderboards only: `multiplayer:og` and `multiplayer:go`, backed by storage buckets `async:og` and `async:go`.
- Public leaderboard rows should include public profile identity, rank, rating, games played, wins, losses, draws, provisional status, latest safe rating movement, and peak rating when safely derived.
- Private, hidden, suspended, missing, or zero-game profiles should be omitted from v1 rows.
- The RPC must not return raw `user_id`, emails, auth metadata, private profile fields, profile `bio`, raw transaction ids, match ids, opponent ids, expected scores, old/new rating audit internals, queue ids, settlement ids, raw projections, sessions, answers, seeds, tokens, or local artifacts.
- Existing direct table policies are not broadened. Public leaderboard app code should use the new RPC rather than direct selects over rating/profile tables.
- Non-printing privacy probes are required in Stage 30.3 before app integration.

## Verification

Passed lightweight Stage 30.2 documentation verification:

- `git diff --check` passed.
- Python CSV shape check using `python3 -S` passed: 231 rows, 12 columns, last progress ID `229`.
- `git status --short --branch` confirmed branch `main` with expected uncommitted Phase 30 planning/progress artifacts.

## Blockers

No blockers.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, Supabase or Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 31 work, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
