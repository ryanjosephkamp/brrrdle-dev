# Progress Step 217: Phase 29 Stage 29.2 Public Profile Migration/RLS Addendum Planning

**Status**: Completed - Awaiting User Review Before Stage 29.3
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-21T00:19:38Z
**Completed**: 2026-06-21T00:19:38Z

## Authorization

The user authorized Phase 29 Stage 29.2 only: public profile migration/RLS addendum planning.

Allowed work:

- read required governance, Phase 29 planning/spec/implementation materials, Stage 29.1 findings, current progress records, Supabase docs, account/profile/auth/storage surfaces, and relevant RLS/migration context;
- create a precise Phase 29 public profile migration/RLS addendum under `planning/specs/phase-29/`;
- create this progress report and append the matching 12-column row to `progress/PROGRESS.csv`;
- run lightweight documentation verification.

Not authorized:

- source/runtime implementation or test implementation;
- Supabase migration creation or execution;
- Supabase or Vercel configuration;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Stage 29.3 execution, Stage 29.4 app implementation, Phase 30, public leaderboards, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- `origin/main`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- Original stable repository: not used.

## Addendum Created

- `planning/specs/phase-29/PHASE-29-PUBLIC-PROFILE-MIGRATION-RLS-ADDENDUM-2026-06-20.md`

## Key Decisions

- Public profiles should use a new additive `public.public_player_profiles` projection table rather than widening `profiles` or exposing Supabase auth metadata.
- Public identity should use opaque `public_profile_id` values only in Phase 29. User-facing slugs are deferred.
- Profiles should default to `visibility='private'`; public reads should return only explicitly public and active rows.
- Browser clients should use security-definer RPCs with explicit allow-listed return columns, not broad direct table reads.
- Direct public output must never include raw auth emails, raw auth ids, private account metadata, private progress, private ranked projections, answers, seeds, sessions, local artifacts, or tokens.
- Public avatar URLs should not be auto-copied from private account avatar metadata; non-null public avatar URLs should be `https://` only and should reject URLs containing the caller raw auth id.
- Phase 30 leaderboards can later hydrate identity through `public_profile_id` while rating authority remains trusted and private.

## Verification

- `git diff --check`: passed.
- Python CSV shape check using `python3 -S`: passed, 219 rows including header, 12 columns each, `last_id=217`.
- `git status --short --branch`: completed for final worktree reporting.

## Blockers

No blockers.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, Supabase or Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Stage 29.3 execution, Stage 29.4 app implementation, Phase 30 work, public leaderboards, public/guest spectation, service workers or push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, or original stable repository work was performed.
