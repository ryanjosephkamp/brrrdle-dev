# Progress Step 367 - Phase 42 Stage 42.4B Supabase Grant RLS Boundary Triage

**Status**: Completed - Awaiting User Review Before Stage 42.4C
**Phase**: Phase 42 - Site Stats, Developer Dashboard, Onboarding, And Help
**Stage**: 42.4B - Supabase grant/RLS boundary triage
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T15:35:00Z
**Completed**: 2026-07-03T15:41:44Z

## Authorization

The user authorized Phase 42 Stage 42.4B only: documentation/planning triage of the Stage 42.4 direct private-table grant probe blocker.

Authorized work included reading governance, Phase 42 planning/spec/addendum/implementation materials, Stage 42.4 progress, the Stage 42.4 migration, Supabase/RLS docs, relevant existing migrations, and non-printing remote grant/RLS metadata enough to decide whether the pre-existing direct `anon` table privileges were an intentional dev-only artifact, a Supabase role/reporting nuance, or a real grant cleanup issue requiring a reviewed repair migration.

This stage did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, grant/RLS mutation, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- `origin/main`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-41/REVIEW-CHECKLIST.md` was preserved.

## Triage Decision

The Stage 42.4 direct private-table grant blocker is a real Supabase grant cleanup issue requiring a reviewed repair migration before Stage 42.5 public stats/developer dashboard source integration.

It is not classified as an intentional dev-only artifact or only a harmless reporting nuance.

## Evidence Summary

Non-printing metadata probes found:

- direct `anon` table ACL privileges on protected app tables including `profiles`, `async_multiplayer_games`, `multiplayer_matchmaking_queue`, `multiplayer_rating_profiles`, `multiplayer_match_results`, `multiplayer_player_results`, `multiplayer_rating_transactions`, and `multiplayer_daily_claims`;
- no matching direct `anon` table grant on `multiplayer_private_match_requests`, which already has explicit Phase 40 table grant revocation;
- RLS enabled on the checked protected tables;
- RLS not forced on the checked protected tables;
- broad public-schema default privileges for future tables, sequences, and functions to `anon` and `authenticated` under the owner contexts reported by remote metadata;
- policy metadata showing most legacy RLS policies are public-role policies gated inside expressions, while private match request RLS is explicitly role-targeted to `authenticated`;
- an anonymous zero-row table access probe reached RLS evaluation and failed with an infinite recursion error on `multiplayer_player_results`.

Repository migration history searched during this stage did not show an intentional broad direct `anon` table grant. Existing migrations do show older authenticated table grants for some participant-owned multiplayer flows and many explicit function grant/revoke hardening steps.

## Addendum Created

Created:

- `planning/specs/phase-42/PHASE-42-SUPABASE-BROWSER-GRANT-RLS-REPAIR-ADDENDUM-2026-07-03.md`

The addendum recommends Stage 42.4C as a separate repair execution gate.

## Recommended Repair Direction

Stage 42.4C should create exactly one reviewed repair migration if authorized.

Recommended scope:

- revoke broad future default privileges for `anon` on public-schema tables, sequences, and functions;
- revoke broad future default privileges for `authenticated` on public-schema tables, sequences, and functions so future grants must be explicit;
- revoke existing direct `anon` table/sequence privileges from protected public-schema app tables, or from all public-schema tables if the execution gate confirms no direct anonymous table access is intended;
- preserve explicitly intended public RPC grants;
- preserve authenticated RPC grants;
- avoid broad existing authenticated table-grant revocation in the same gate unless a later prompt explicitly authorizes broader source/test verification.

## Stage 42.5 Status

Stage 42.5 remains blocked.

Public stats and private developer dashboard source integration should not begin until Stage 42.4C passes or the user explicitly accepts a narrower documented risk after review.

## Verification

Lightweight verification passed:

- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: `rows=369 columns=[12] last_id=367`.
- Non-printing changed/untracked file credential scan: `scanned_files=23 credential_pattern_hits=0`.
- Ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check: `port_5173=clear`, `port_5174=clear`, `port_3000=clear`, `port_4173=clear`.
- `git status --short --branch`: completed and showed expected uncommitted Phase 42 planning/progress/source artifacts, the preserved Phase 41 checklist, the Stage 42.4 migration/progress artifacts, and the new Stage 42.4B addendum/progress artifacts.

No source/runtime files, migrations, Supabase grants, policies, or configuration were changed in this triage stage.

## Blockers

The direct `anon` table/default grant issue must be reviewed before Stage 42.5.

## Next Gate

The next safe gate is Stage 42.4C Supabase browser grant/RLS repair execution only.
