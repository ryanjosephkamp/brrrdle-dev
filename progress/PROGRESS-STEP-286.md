# Progress Step 286: Phase 35 Stage 35.3 Ranked Live Identity Migration/RLS Execution

**Date:** 2026-06-27
**Phase:** Phase 35 - Auth, Profile, Deployment, And Live Identity Readiness
**Stage:** Stage 35.3 - Ranked Live Identity Migration/RLS Execution
**Status:** Completed - Awaiting User Review Before Stage 35.4 Source Repair

## Authorization

The user authorized Phase 35 Stage 35.3 only: ranked Live identity migration/RLS execution following the approved Stage 35.2 addendum. The pass includes reading governance, Phase 35 planning/spec/implementation materials, the Stage 35.2 addendum, current progress records, authenticated Live spectator RPC context, participant identity RPC context, public profile RLS context, creating this progress report and matching CSV row, creating exactly one additive Supabase migration, applying it only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous, running the required non-printing probes, updating Supabase/ranked docs only if needed, and running lightweight verification.

The prompt does not authorize source/runtime implementation, app UI changes, test implementation beyond migration/probe support if absolutely needed, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or original stable repository work.

## Repository And Target State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- `origin/main`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- Existing user edits to `planning/phase-34/REVIEW-CHECKLIST.md`: preserved.
- Supabase CLI global binary was not on `PATH`; the project-local `npm exec --yes supabase -- ...` invocation was used.
- Linked Supabase metadata identified project `brrrdle-dev` with ref `fdwmvgervclziuoxbmeg`.
- Local `.env.local` Supabase URL ref also resolved to `fdwmvgervclziuoxbmeg` without printing keys.

## Migration Created And Applied

- Migration file: `supabase/migrations/20260627230835_phase35_ranked_live_identity_spectator_profiles.sql`
- Dry run: `npm exec --yes supabase -- db push --linked --dry-run` listed exactly the one pending Phase 35 migration.
- Remote execution: `npm exec --yes supabase -- db push --linked --yes` applied `20260627230835_phase35_ranked_live_identity_spectator_profiles.sql`.
- Migration history check: `npm exec --yes supabase -- migration list --linked` showed local and remote version `20260627230835`.

The migration replaces `public.get_authenticated_live_v1_spectator_games_v2(integer, integer)` with the same signature and returned table shape. It resolves spectator player profile objects from `async_multiplayer_games.player_one_user_id` and `player_two_user_id` joined to active public profiles, returns only `displayName`, `avatarUrl`, `accentColor`, and optional derived `initials`, keeps authenticated-only execution, and preserves current Daily exclusion, bounded terminal hold rows, and read-only spectator capabilities.

## Non-Printing Probe Results

Passed:

- Function grant probe: `anon_execute=false`, `authenticated_execute=true`.
- Existing-data spectator shape/privacy probe: one eligible current spectator row was returned, `current_daily_rows=0`, read-only capabilities were preserved, and forbidden-key scan returned `true` for absent forbidden keys. No current ranked spectator row was available in the live terminal window during this probe, so a rollback-only synthetic ranked probe was used for ranked coverage.
- Rollback-only synthetic ranked spectator probe: inserted one temporary ranked `playing` row using two existing active public-profile users, called the RPC as a third signed-in nonparticipant, and rolled back. Result: `row_count=1`, `ranked_row_count=1`, `player_count=2`, `profile_object_count=2`, `display_name_count=2`, `forbidden_player_payload_count=0`.
- Rollback-only participant exclusion probe: the same synthetic ranked row was not returned when the simulated viewer was a participant. Result: `participant_excluded=true`.
- Rollback-only private-profile probe: one chosen profile was temporarily set private inside the transaction, the RPC returned only one profile object/display name, and the planted projection label did not leak. Result: `profile_object_count_after_one_private=1`, `display_name_count_after_one_private=1`, `stale_projection_leak_count=0`.
- Probe cleanup check: `lingering_probe_rows=0`.

Note: the first participant-exclusion probe attempt failed because the simulated `authenticated` role could not read a temporary helper table. The query was retried with an explicit temporary-table grant and passed. No synthetic row persisted.

## Documentation Updates

- `docs/supabase.md` documents the Phase 35 migration, authenticated spectator RPC boundary, safe profile field allowlist, public/guest spectation deferral, and the fact that app source repair remains separate.

No `docs/ranked-multiplayer.md` update was needed because this migration changes Live spectator identity projection, not Elo, bucket semantics, or ranked settlement behavior.

## Verification

Passed:

- `git diff --check`
- Python CSV shape check using `python3 -S`: `rows=288 columns=[12] last_id=286`
- non-printing secret/artifact scan over changed tracked and untracked repository files: `scanned_files=18 credential_pattern_hits=0 changed_artifacts=0`
- ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0 allowed_tracked_env_templates=1`
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: no listeners found.
- `git status --short --branch`

## Boundaries Preserved

No source/runtime code, app UI changes, application tests, Vercel/Supabase configuration changes, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work was performed.

## Next Step

Review the Stage 35.3 migration/RLS evidence. If approved, explicitly authorize Stage 35.4 ranked Live identity source repair before auth/deployment work, Profile tab work, Vercel/Supabase configuration, deployment, Git/GitHub operations, backup workflow execution, or original stable repository work.
