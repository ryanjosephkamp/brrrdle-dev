# Progress Step 523 - Phase 55 Post-Migration Contract Blocker

**Status:** Blocked - ledger reconciled; post-apply contract conflicts require a new additive migration.
**Phase:** Phase 55 ranked Daily Multiplayer and narrow private Practice request routing.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev` only.
**Date:** 2026-07-10.

## Summary

The generated remote migration version `20260710170918` was proven to contain the exact statement from source-controlled migration `20260710061039_phase55_ranked_daily_multiplayer.sql`. One minimal transaction changed only that migration-ledger version to `20260710061039`. Local and remote histories are now exactly equal, and all captured application-schema, catalog, security, ACL, claim, and row-count fingerprints remained byte-for-byte unchanged.

The resumed post-apply gate then found several conflicts between the deployed ranked Daily contract and the protected application behavior. These conflicts require source changes and one new additive corrective migration; they cannot be repaired by changing the already-applied migration or by continuing directly to real E2E.

Execution therefore stopped before creating temporary accounts or ranked Daily E2E rows.

## Completed Reconciliation Evidence

- verified exactly one active project named `brrrdle-dev` without printing its project identifier or credentials;
- verified the migration source SHA-256 remained `7e71de944f6c3f3a89b947a5cd2b8dcc45a1049fa8391f552f8ecb02308dadf4`;
- proved the generated ledger row had the exact migration name, one stored statement, and the same raw statement digest as the local source;
- transactionally changed only ledger version `20260710170918` to `20260710061039`;
- proved local and remote histories are exactly equal at 32 migrations each;
- proved function, constraint, index, trigger, policy, ACL, claim-schema, catalog, and row-count fingerprints were unchanged;
- matched local and remote catalog counts and ordered digests for 2,175 answers and 9,776 valid guesses without printing words;
- passed the focused eight-file, 100-test contract gate and `git diff --check`;
- received zero Supabase security-advisor findings and zero performance-advisor findings.

## Blocking Contract Findings

1. **Ranked Daily queue expiry:** the current client helper supplies `now + 5 minutes` to both Practice and Daily queue creation. The deployed Daily queue RPC accepts only `NULL` or the canonical next UTC midnight. A normal UI-ranked Daily queue request will therefore be rejected.
2. **GO final puzzle:** the deployed action RPC computes the GO attempt limit as `6 - current_puzzle_index`, leaving two attempts per participant on puzzle five, and completes when both players exhaust that budget. Protected client/gameplay behavior requires the fifth puzzle to continue alternating until solved.
3. **Cancellation and repeat queueing:** the deterministic queue idempotency key reactivates a cancelled or expired request with the same request id, while pair-reservation request columns are permanently unique. Reusing that request in a later pairing can violate the reservation constraint.
4. **Public projection construction:** finalization starts with the complete caller projection and subtracts known fields. Unknown or nested future private fields can survive. The server-authority boundary requires construction from an explicit safe-field allowlist.
5. **Real-E2E cleanup:** the existing cleanup flow does not delete the new private action ledger, authority row, and pair reservation in dependency-safe order before queue/game cleanup. Running it now could leak remote temporary artifacts.
6. **Test-oracle drift:** existing ranked Daily browser coverage does not submit a real queue request, and the local matchmaking helper still models rating-band selection rather than the deployed FIFO server contract.

## Recovery Boundary

Do not edit or re-run `20260710061039_phase55_ranked_daily_multiplayer.sql`. The next implementation must add tests first, make the smallest client/domain changes, and create exactly one new additive source-controlled corrective migration. It must preserve ranked Practice, unranked Daily, private Practice, Solo, spectator/privacy, the functional shell, scoring, and existing Elo formulas.

The local recovery pass must stop before remote application and prepare a separate exact-migration continuation prompt. That later prompt must verify the intended project and sole pending migration, apply only the corrective migration, run catalog/security/concurrency probes and real temporary-account OG/GO E2E, clean all artifacts in dependency-safe order, and rerun full regression before Review Candidate preparation.

## Next Step

Use `prompt-packages/phase-55/PHASE-55-POST-MIGRATION-CONTRACT-REPAIR-IMPLEMENTATION-PROMPT-2026-07-10.md` for the bounded test-first local repair and additive migration preparation.
