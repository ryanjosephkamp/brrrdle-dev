# Progress Step 316 - Phase 38 Stage 38.3 Public Spectator Migration/RLS Execution

**Status**: Completed With Blocker - Stage 38.4 Not Safe Until Claim RPC Hardening
**Phase**: 38, Public/Spectator Readiness
**Stage**: 38.3, public spectator migration/RLS execution
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-30T21:57:28Z
**Completed**: 2026-06-30T21:57:28Z

## Authorization

The user authorized Phase 38 Stage 38.3 only: public spectator migration/RLS execution following the approved Stage 38.2 addendum.

This pass was limited to reading required governance and Phase 38 planning/spec/addendum materials, confirming repository and Supabase target state, creating exactly one additive Supabase migration, applying it only to the confirmed `brrrdle-dev` Supabase project when target and credentials were unambiguous, running non-printing probes, updating documentation only where needed, creating this progress report and CSV row, and running lightweight verification.

This pass did not authorize and did not perform source/runtime public/guest spectation integration, app UI changes, broad test implementation, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `cdd780989535a3081a5e034bde1a247569ca28af`.
- `origin/main`: `cdd780989535a3081a5e034bde1a247569ca28af`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used.
- The user-edited `planning/phase-37/REVIEW-CHECKLIST.md` state was preserved.

## Supabase Target Confirmation

- Local linked project ref: `fdwmvgervclziuoxbmeg`.
- Supabase project listing confirmed active project name: `brrrdle-dev`.
- Supabase project listing also showed the original `brrrdle` project as a separate inactive project; it was not targeted.
- No secrets, credentials, database passwords, Supabase keys, Vercel tokens, or local session artifacts were printed.

## Migration Created

Created exactly one additive migration:

- `supabase/migrations/20260630215141_phase38_public_spectator_projection.sql`

The migration adds dedicated RPC:

- `public.get_public_live_v1_spectator_games_v1(p_limit integer default 25, p_terminal_window_seconds integer default 15, p_game_id text default null)`

The migration:

- keeps the existing authenticated spectator RPC unchanged;
- keeps participant identity RPC boundaries unchanged;
- returns only Practice Multiplayer rows;
- excludes all Daily Multiplayer rows;
- bounds row limits and terminal visibility server-side;
- returns only safe game display, progress, active public profile summary, visible submitted move, outcome, and read-only capability fields;
- omits public profile ids;
- grants execute to `anon` and `authenticated` on the dedicated public spectator RPC only;
- adds no direct table grants;
- adds no spectator presence table, presence writes, or identity-bearing spectator list.

## Migration Execution

Execution path:

- `npx --yes supabase migration list --linked`
- `npx --yes supabase db push --linked --dry-run`
- `npx --yes supabase db push --linked --yes`
- `npx --yes supabase migration list --linked`

Dry run reported exactly one pending migration:

- `20260630215141_phase38_public_spectator_projection.sql`

Remote migration application succeeded. Post-apply migration listing showed local and remote migration history aligned through:

- `20260630215141`

## Documentation Updates

Updated:

- `docs/supabase.md`

Reason:

- Documented the Phase 38 dedicated public/guest Practice Live spectator projection RPC, its `anon` and `authenticated` execute grants, Practice-only and Daily-exclusion boundaries, safe output fields, forbidden output fields, no direct table grants, and the fact that source/UI integration remains a later stage.

No ranked multiplayer documentation update was needed because the migration does not change Elo, ranked settlement, public leaderboard authority, rating internals, or ranked gameplay rules.

## Non-Printing Probe Results

Public spectator projection probes passed:

- Dedicated public spectator RPC exists.
- `anon` can execute the dedicated public spectator RPC.
- `authenticated` can execute the dedicated public spectator RPC.
- Existing authenticated spectator RPC remains unavailable to `anon`.
- Existing authenticated spectator RPC remains available to `authenticated`.
- Existing participant identity RPC remains unavailable to `anon`.
- Existing participant identity RPC remains available to `authenticated`.
- Direct `anon` table query against `async_multiplayer_games` returned `0` visible rows under RLS.
- Public spectator RPC returned `4` eligible Practice rows in the current project state.
- Source had `8` Daily rows, and public spectator output returned `0` Daily rows.
- Public spectator output had `0` non-Practice rows.
- Public spectator output had `0` invalid status rows.
- Public spectator output had `0` terminal-window violations.
- Public spectator output had `0` unexpected top-level keys.
- Recursive returned-key scan had `0` forbidden-key hits.
- All public spectator capability flags were false.
- Player payloads were arrays.
- Move payloads were arrays.
- Large `p_limit` was clamped: large-limit call returned `4` rows, matching available eligible rows and below the `50` maximum.
- Zero limit returned `0` rows.
- Missing targeted game id returned `0` rows.
- Rollback-scoped anon table mutation probe reported no inserted, updated, or deleted `async_multiplayer_games` rows.

## Blocker Found During Probe

The Stage 38.3 non-printing probes found a separate pre-existing mutation-boundary issue outside the new public spectator RPC:

- `claim_daily_multiplayer_participation(text, text, text, text, text, text)` is currently executable by `anon`.
- A rollback-scoped `anon` call to that Daily claim RPC completed successfully.

This was not introduced by the Phase 38 migration, and the rollback probe did not persist data. However, the Phase 38 addendum required mutation-denial evidence for claims before public/guest spectator source integration. Therefore Stage 38.4 is not safe yet.

Recommended next action:

- Run a narrow Stage 38.3B migration/RLS hardening pass to revoke `anon` execution from `claim_daily_multiplayer_participation`, preserve authenticated/internal trigger behavior, and rerun non-printing mutation probes.

## Verification

Passed:

- `git diff --check`
- progress CSV shape check using `python3 -S`: `rows=318 columns=[12] last_id=316`
- non-printing credential-shaped secret/artifact scan: initial broad scan flagged the existing placeholder `your-public-anon-key` in `docs/supabase.md`; refined high-entropy credential-shaped scan reported `scanned_files=16 credential_pattern_hits=0`
- ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear
- `npx --yes supabase db push --linked --dry-run`: remote database is up to date
- `git status --short --branch`

## Resource Observations

- No local app dev server was started.
- No browser or Playwright process was started.
- Supabase CLI was invoked through `npx --yes supabase`.
- Supabase SQL probes were run through the Supabase connector with aggregate/boolean outputs only.

## Blockers And Open Questions

- Blocker: pre-existing `anon` execution on `claim_daily_multiplayer_participation` must be hardened before Stage 38.4 public/guest source integration.
- Open question for Stage 38.5 remains unchanged: whether aggregate spectator counts can be privacy-safe and abuse-resistant. Identity-bearing spectator lists remain deferred.

## Boundary Confirmation

No source/runtime public/guest spectation integration, app UI changes, broad test implementation, Vercel/Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, service worker/push work, gameplay/Elo changes, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or stable repository work was performed.
