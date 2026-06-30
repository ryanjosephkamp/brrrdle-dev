# Progress Step 317 - Phase 38 Stage 38.3B Daily Claim RPC Anon Grant Hardening

**Status**: Completed - Awaiting User Review Before Stage 38.4
**Phase**: 38, Public/Spectator Readiness
**Stage**: 38.3B, Daily claim RPC anonymous grant hardening
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-30T22:05:32Z
**Completed**: 2026-06-30T22:05:32Z

## Authorization

The user authorized Phase 38 Stage 38.3B only: a narrow migration/RLS hardening pass for the pre-existing Daily claim RPC anonymous-execution blocker found during Stage 38.3.

This pass was limited to reading required governance and Phase 38 planning/spec/addendum/progress materials, confirming repository and Supabase target state, creating exactly one additive Supabase migration to revoke anonymous execution from `claim_daily_multiplayer_participation(text, text, text, text, text, text)`, applying it only to the confirmed `brrrdle-dev` Supabase project when target and credentials were unambiguous, running non-printing probes, updating docs where useful, creating this progress report and matching CSV row, and running lightweight verification.

This pass did not authorize and did not perform source/runtime public/guest spectation integration, app UI changes, broad test implementation, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, service worker/push work, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

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
- Supabase project listing confirmed active linked project name: `brrrdle-dev`.
- Supabase project listing also showed the original `brrrdle` project as a separate inactive project; it was not targeted.
- No secrets, credentials, database passwords, Supabase keys, Vercel tokens, or local session artifacts were printed.

## Migration Created

Created exactly one additive migration:

- `supabase/migrations/20260630220251_phase38_daily_claim_rpc_anon_revoke.sql`

The migration:

- explicitly revokes all privileges on `public.claim_daily_multiplayer_participation(text, text, text, text, text, text)` from `public`;
- explicitly revokes all privileges on the same function from `anon`;
- explicitly resets and restores `authenticated` execute permission;
- preserves authenticated direct execution;
- preserves trusted security-definer trigger/internal execution by leaving the function body and trigger functions unchanged;
- preserves the Phase 38 public spectator projection RPC and its `anon`/`authenticated` grants;
- does not alter Daily claim rules, game mutation behavior, public/guest source/UI behavior, authenticated spectator RPCs, participant identity RPCs, public profile RPCs, ratings, queues, or gameplay logic.

## Migration Execution

Execution path:

- `npx --yes supabase db push --linked --dry-run`
- `npx --yes supabase db push --linked --yes`
- `npx --yes supabase migration list --linked`
- `npx --yes supabase db push --linked --dry-run`

Initial dry run reported exactly one pending migration:

- `20260630220251_phase38_daily_claim_rpc_anon_revoke.sql`

Remote migration application succeeded. Post-apply migration listing showed local and remote migration history aligned through:

- `20260630220251`

Post-apply dry run reported the remote database is up to date.

## Documentation Updates

Updated:

- `docs/supabase.md`

Reason:

- Documented the Phase 38 Stage 38.3B Daily claim RPC anonymous grant hardening, including that `public`/`anon` execution is revoked while authenticated/internal trusted claim behavior is preserved.

No ranked multiplayer documentation update was needed because the migration does not change Elo, ranked settlement, public leaderboard authority, rating internals, ranked gameplay rules, or source/UI behavior.

## Non-Printing Probe Results

Daily claim grant hardening probes passed:

- `anon` no longer has execute privilege for `claim_daily_multiplayer_participation(text, text, text, text, text, text)`.
- `public` no longer has execute privilege for the Daily claim RPC.
- `authenticated` still has execute privilege for the Daily claim RPC.
- The function owner still has execute privilege for trusted internal paths.
- A rollback-scoped `anon` Daily claim RPC call no longer completes and is denied.
- A rollback-scoped authenticated Daily claim RPC call completed using an existing safe input count and was rolled back.

Public spectator projection non-regression probes passed:

- `anon` still has execute privilege for `get_public_live_v1_spectator_games_v1(integer, integer, text)`.
- `authenticated` still has execute privilege for the public spectator RPC.
- `anon` public spectator output returned `4` eligible rows in current project state, with `0` Daily rows and `0` non-Practice rows.
- `authenticated` public spectator output returned `4` eligible rows in current project state, with `0` Daily rows and `0` non-Practice rows.
- Recursive public spectator payload scan inspected `4` rows and found `0` forbidden-key hits.
- Public spectator capability scan found `0` rows with true or non-false mutation capability flags.

One concurrent Supabase CLI query initially returned a non-secret local CLI access-token lookup error while other parallel queries succeeded. The same probe passed when rerun serially; no Supabase target ambiguity or credential printing occurred.

## Verification

Passed:

- `git diff --check`
- progress CSV shape check using `python3 -S`: `rows=319 columns=[12] last_id=317`
- non-printing credential-shaped secret/artifact scan: `scanned_files=14 credential_pattern_hits=0`
- ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear
- `npx --yes supabase db push --linked --dry-run`: remote database is up to date
- `git status --short --branch`

## Resource Observations

- No local app dev server was started.
- No browser or Playwright process was started.
- Supabase CLI was invoked through `npx --yes supabase`.
- Supabase SQL probes reported aggregate/boolean outputs only.

## Blockers And Open Questions

- No blockers remain for Stage 38.4 review after the claim hardening and public spectator projection probes.
- Stage 38.5 open question remains unchanged: whether aggregate spectator counts can be privacy-safe and abuse-resistant. Identity-bearing spectator lists remain deferred.

## Boundary Confirmation

No source/runtime public/guest spectation integration, app UI changes, broad test implementation, Vercel/Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, service worker/push work, gameplay/Elo changes, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or stable repository work was performed.
