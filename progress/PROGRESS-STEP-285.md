# Progress Step 285: Phase 35 Stage 35.2 Ranked Live Identity Migration/RLS Addendum Planning

**Date:** 2026-06-27
**Phase:** Phase 35 - Auth, Profile, Deployment, And Live Identity Readiness
**Stage:** Stage 35.2 - Ranked Live Identity Migration/RLS Addendum Planning
**Status:** Completed - Awaiting User Review Before Stage 35.3 Migration/RLS Execution

## Authorization

The user authorized Phase 35 Stage 35.2 only: migration/RLS addendum planning for ranked Live identity. The pass includes reading governance, Phase 35 planning/spec/implementation materials, Stage 35.1 audit findings, current progress records, Live participant/spectator identity source surfaces, authenticated spectator RPC migrations, participant identity RPC context, public profile RLS context, relevant tests read-only, creating this progress report and matching CSV row, and creating a precise Stage 35.2 migration/RLS addendum under `planning/specs/phase-35/`.

The prompt does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- `origin/main`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- Existing user edits to `planning/phase-34/REVIEW-CHECKLIST.md`: preserved.

## Addendum Created

- `planning/specs/phase-35/PHASE-35-RANKED-LIVE-IDENTITY-MIGRATION-RLS-ADDENDUM-2026-06-27.md`

## Key Decisions

Stage 35.2 confirms the Stage 35.1 direction: the next safe step should be migration/RLS execution before source repair.

The addendum defines a narrow authenticated spectator RPC contract:

- Replace `public.get_authenticated_live_v1_spectator_games_v2(integer, integer)` with the same signature and returned table shape.
- Resolve both seats' active public profile summaries server-side from `async_multiplayer_games.player_one_user_id` and `player_two_user_id`.
- Return only spectator-parser-compatible safe profile fields: `displayName`, `avatarUrl`, `accentColor`, and optional derived `initials`.
- Keep projection labels as compatibility fallbacks, but do not let stale projection profiles override current private, hidden, suspended, or missing public profiles.
- Preserve participant-only identity RPC boundaries.
- Preserve public/guest spectation deferral.
- Do not return public profile IDs for spectator Live cards in Phase 35.
- Expose no raw auth IDs, emails, private profile fields, answers, seeds, sessions, queue internals, rating internals, tokens, or local artifacts.
- Preserve current Daily exclusion, bounded terminal hold behavior, read-only spectator capabilities, and authenticated-only grants.

## Verification

Passed:

- `git diff --check`
- Python CSV shape check using `python3 -S`: `rows=287 columns=[12] last_id=285`
- non-printing secret/artifact scan over changed tracked and untracked repository files: `scanned_files=12 credential_pattern_hits=0 changed_artifacts=0`
- ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0 allowed_tracked_env_templates=1`
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: no listeners found.
- `git status --short --branch`

## Resource Notes

- No local dev server or browser reproduction was required for this addendum-planning pass.
- Watched ports `5173`, `5174`, `3000`, and `4173` were clear.

## Boundaries Preserved

No source/runtime code, tests, SQL migrations, remote Supabase migration execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work was performed.

## Next Step

Review the Stage 35.2 addendum. If approved, explicitly authorize Stage 35.3 ranked Live identity migration/RLS execution before source repair, auth/deployment work, Vercel/Supabase configuration, deployment, Git/GitHub operations, backup workflow execution, or original stable repository work.
