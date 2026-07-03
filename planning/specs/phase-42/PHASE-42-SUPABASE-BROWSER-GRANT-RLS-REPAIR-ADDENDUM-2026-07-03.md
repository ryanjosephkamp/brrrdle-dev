# Phase 42 Supabase Browser Grant RLS Repair Addendum

**Status**: Draft repair addendum for review.
**Date**: 2026-07-03.
**Repository**: `brrrdle-dev` only.
**Authority**: Documentation-only Stage 42.4B triage and repair planning. This addendum does not authorize SQL migration creation, migration execution, source/runtime implementation, test implementation, Supabase or Vercel configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, secret printing, private data exposure, local session artifact exposure, local Codex skill changes, the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

## 1. Decision

The Stage 42.4 direct private-table grant blocker is a real Supabase grant cleanup issue requiring a reviewed repair migration before Stage 42.5 public stats/developer dashboard source integration.

It is not safe to classify the finding as only a harmless reporting nuance or an intentional dev-only artifact because:

- direct table ACL metadata shows broad `anon` privileges on protected app tables;
- broad default privileges for future public-schema tables, sequences, and functions are present for `anon` and `authenticated`;
- the repository migration history searched in Stage 42.4 and Stage 42.4B does not intentionally grant those broad `anon` table privileges;
- RLS is enabled, but a non-printing anonymous zero-row access probe still reached RLS evaluation and produced an infinite recursion error on `multiplayer_player_results`, confirming anonymous table access can reach protected table policy machinery.

Stage 42.5 must remain blocked until a separate Stage 42.4C repair execution pass removes the anonymous table/default grant exposure or stops with a narrower blocker.

## 2. Findings

Stage 42.4 and Stage 42.4B metadata probes found:

- `profiles`, `async_multiplayer_games`, `multiplayer_matchmaking_queue`, `multiplayer_rating_profiles`, `multiplayer_match_results`, `multiplayer_player_results`, `multiplayer_rating_transactions`, and `multiplayer_daily_claims` have direct `anon` table privileges in the linked development database.
- The same checked protected tables have RLS enabled.
- The checked protected tables do not force RLS.
- `multiplayer_private_match_requests` did not show the same direct `anon` table grants because Phase 40 explicitly revoked direct browser table access for that table.
- Existing policies are mostly public-role policies with RLS expressions that gate access through `auth.role()` or `auth.uid()`, except the private match request policy is explicitly role-targeted to `authenticated`.
- Default privileges in the public schema grant broad future table and sequence privileges, plus function execution, to `anon` and `authenticated` for the `postgres` and `supabase_admin` owner contexts.
- A safe anonymous `limit 0` probe failed with an RLS recursion error on `multiplayer_player_results`; no private row data was printed.

## 3. Risk Classification

The current state is mitigated by RLS, but it still violates the Phase 42 data-contract rule that private/operational tables should not have direct anonymous browser grants.

Risks:

- Future table creation can inherit broad anonymous privileges unless default privileges are repaired.
- Anonymous clients may be able to reach RLS policy evaluation for private tables, increasing policy-recursion and policy-bypass risk if a future policy is wrong.
- The current grant shape makes privacy probes harder to reason about because authorization depends on RLS denial instead of least-privilege table ACLs plus RLS.
- Source integration for Phase 42 stats/dashboard would be proceeding on top of a known grant-boundary inconsistency.

Non-risks observed in this triage:

- Stage 42.4 public stats/admin dashboard RPC grants and allowlisted payload probes passed.
- Stage 42.4 migration added no direct table grants and created no helper functions.
- Existing public profile, public ranked leaderboard, participant identity, public/guest spectator, Daily claim, and private matchmaking function grant probes remained bounded.
- No secrets, raw auth ids, emails, row ids, private payloads, screenshots, videos, traces, auth state, or local artifacts were printed.

## 4. Recommended Stage 42.4C Repair Scope

Stage 42.4C should be a migration/RLS repair execution gate only, separately authorized by the user.

Recommended migration name:

`supabase/migrations/<timestamp>_phase42_browser_grant_rls_repair.sql`

The repair should create exactly one migration unless the user explicitly changes scope.

The migration should:

1. revoke broad future default privileges for `anon` on public-schema tables, sequences, and functions for the owner contexts shown by metadata probes;
2. revoke broad future default privileges for `authenticated` on public-schema tables, sequences, and functions so future migrations must grant browser roles explicitly;
3. revoke existing direct `anon` privileges on public-schema tables and sequences, or at minimum on the protected app tables identified by Stage 42.4B;
4. preserve explicitly intended public RPC execution grants, including public profile read RPCs, public/guest spectator RPCs, and `get_public_site_stats_v1()`;
5. preserve authenticated RPC execution grants required by ranked queue, private matchmaking, public leaderboard, participant identity, Daily claim, and admin dashboard contracts;
6. avoid broad revocation of existing authenticated table privileges in this repair unless the migration author proves the app no longer depends on them and adds focused regression coverage in a separately authorized source/test gate;
7. avoid modifying RLS policy expressions unless a probe proves the grant cleanup cannot pass without a policy-specific repair;
8. avoid changing public/guest spectator contracts, Daily claim rules, ranked queue matching, trusted settlement, private matchmaking lifecycle, gameplay rules, or Elo math.

## 5. Recommended Stage 42.4C Probe Requirements

Stage 42.4C should run non-printing probes and record only safe summaries.

Required probes:

- no direct `anon` table privileges remain on protected public-schema app tables;
- no direct `anon` sequence privileges remain on protected public-schema app sequences, if any;
- public-schema default privileges no longer grant future table/sequence/function privileges to `anon`;
- public-schema default privileges no longer grant future broad table/sequence/function privileges to `authenticated`;
- `get_public_site_stats_v1()` remains executable by `anon` and `authenticated`;
- `get_admin_operational_dashboard_v1()` remains denied to `anon` and executable only through authenticated admin authorization;
- public profile read RPCs remain available to `anon` and `authenticated`;
- public/guest spectator RPC remains available to `anon` and `authenticated`;
- Daily claim mutation RPC remains denied to `anon`;
- public ranked leaderboard remains authenticated-only;
- participant identity remains authenticated-only and participant-scoped;
- private matchmaking RPCs remain authenticated-only and participant/request-scoped;
- no anonymous zero-row table access reaches protected private table RLS policy evaluation after the repair;
- no helper functions become executable by browser roles unless explicitly allowlisted;
- no source/runtime files are changed;
- no secrets, raw auth ids, emails, row ids, private payloads, screenshots, videos, traces, auth state, or local artifacts are printed.

## 6. Authenticated Direct Table Grants

Stage 42.4B also observed broad existing authenticated table privileges on legacy protected tables. This addendum does not recommend broad revocation of those existing authenticated table privileges inside Stage 42.4C.

Reason:

- older app flows and migrations explicitly granted some authenticated table access for participant-owned multiplayer rows;
- broad authenticated ACL cleanup has a larger blast radius than the Stage 42.4 blocker;
- authenticated table access remains RLS-governed;
- Phase 42.5 stats/dashboard source integration can be implemented through the new RPCs without adding or relying on new authenticated direct table grants.

Recommended handling:

- Stage 42.4C should revoke broad future authenticated default privileges so new contracts must be explicit.
- Stage 42.4C should record existing authenticated table grants as a legacy hardening follow-up unless the user authorizes a broader authenticated-grant audit and regression phase.
- Do not block Stage 42.5 solely on legacy authenticated table ACLs if Stage 42.4C removes anonymous direct table grants and confirms the new stats/dashboard RPCs remain bounded.

## 7. Stop Conditions For Stage 42.4C

Stop before or during repair execution if:

- the Supabase target is ambiguous or not confirmed as `brrrdle-dev`;
- credentials are missing, ambiguous, or would need to be printed;
- the repair would require source/runtime implementation in the same gate;
- the repair would require broad authenticated table-grant revocation without focused source/test verification;
- public stats/admin dashboard RPCs would lose their intended grants;
- public profile, public leaderboard, participant identity, public/guest spectator, Daily claim, private matchmaking, ranked queue, trusted settlement, gameplay, or Elo boundaries would change;
- non-printing probes cannot verify the repair without printing secrets or private row data.

## 8. Stage 42.5 Gate

Stage 42.5 public stats and private developer dashboard source integration remains blocked until Stage 42.4C repair execution passes or the user explicitly accepts a narrower documented risk after review.

The safest next gate is Stage 42.4C Supabase browser grant/RLS repair execution only.
