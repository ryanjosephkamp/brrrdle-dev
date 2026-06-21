# Progress Step 218: Phase 29 Stage 29.3 Public Profile Migration/RLS Execution

**Status**: Completed - Awaiting User Review Before Stage 29.4
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-21T00:29:24Z
**Completed**: 2026-06-21T00:41:23Z

## Authorization

The user authorized Phase 29 Stage 29.3 only: public profile migration/RLS execution following the approved Stage 29.2 addendum.

Allowed work:

- read required governance, Phase 29 planning/spec/addendum/implementation materials, progress records, Supabase docs, and repository account/profile/RLS surfaces;
- create exactly one additive Supabase migration under `supabase/migrations/`;
- confirm the intended `brrrdle-dev` Supabase target without printing secrets;
- apply the migration only if target and credentials are unambiguous;
- run non-printing privacy probes from the addendum;
- update progress records and run lightweight verification.

Not authorized:

- app source/runtime implementation;
- public profile UI;
- public leaderboards or public/guest spectation;
- notification changes, service workers, or push infrastructure;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 30 work;
- Elo algorithm changes or gameplay-rule changes;
- new custom skills, force-push, secret printing, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- `origin/main`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- Original stable repository: not used.

## Migration

Created exactly one additive migration:

- `supabase/migrations/20260621003033_phase29_public_profile_rls.sql`

The migration implements the approved Stage 29.2 public profile contract:

- `public.public_player_profiles` with private `user_id`, opaque `public_profile_id`, default-private visibility, allow-listed display fields, moderation state, and timestamps.
- Owner-only authenticated RPCs:
  - `public.get_my_public_player_profile()`
  - `public.upsert_my_public_player_profile(text,text,text,text,text,text)`
- Public-safe read RPCs:
  - `public.get_public_player_profile(uuid)`
  - `public.get_public_player_profiles(uuid[])`
- RLS enabled with owner policies as defense in depth.
- No direct table grants to `anon` or `authenticated`.
- Helper validation for visibility, accent, flair, avatar URL, public display-name requirements, and updated timestamp behavior.

## Supabase Target Confirmation

Confirmed the intended `brrrdle-dev` Supabase target without printing secrets:

- Supabase project ref: `fdwmvgervclziuoxbmeg`
- Local linked project metadata name: `brrrdle-dev`
- Remote dry-run showed only `20260621003033_phase29_public_profile_rls.sql` pending before apply.

## Migration Execution

Applied the migration to the confirmed `brrrdle-dev` project with `npm exec --yes supabase -- db push --linked`.

Result:

- Migration `20260621003033_phase29_public_profile_rls.sql` applied successfully.
- Remote migration list includes `20260621003033`.
- Supabase CLI global binary was not on PATH, so the project-local `npm exec --yes supabase -- ...` invocation was used.
- Optional `supabase db lint` was attempted but did not return output and was stopped; this was not part of the required Stage 29.3 verification gate.

## Privacy Probes

Non-printing privacy probes passed.

The rollback-only probe verified:

- `anon` and `authenticated` do not have direct table `select`/`insert` grants on `public.public_player_profiles`.
- `anon` cannot execute owner read/write RPCs.
- `anon` can execute public read RPCs.
- `authenticated` can execute owner write RPCs.
- Public visibility without a display name is rejected.
- Invalid accent values are rejected.
- Data URLs and raw-auth-id-bearing avatar URLs are rejected.
- Public reads expose allow-listed public fields and do not expose `user_id`, email, or moderation status.
- Private profiles are not returned by public read RPCs.
- Hidden profiles are not returned by public read RPCs.
- A non-owner cannot discover another user's private profile through the public read RPC.
- Synthetic auth/profile probe rows were created inside a transaction and rolled back.

## Verification

Required lightweight verification passed:

- `git diff --check`
- Python CSV shape check using `python3 -S`: `csv_shape_ok rows=220 columns=12 last_id=218`
- `git status --short --branch`

## Blockers

No Stage 29.3 blockers.

## Boundary Confirmation

No app source/runtime implementation, public profile UI, public leaderboards, public/guest spectation, notification changes, service workers, push infrastructure, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 30 work, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, or original stable repository work has been performed.
