# Final Functional Shell Lock

**Status:** Locked after Phase 58 Final Acceptance.
**Lock date:** 2026-07-13.
**Repository:** `brrrdle-dev` only.
**Golden checkpoint:** `phase-58-final-functional-shell-golden-2026-07-13`.

## Purpose

This repository is the accepted reference implementation of the complete, lightweight, fully functional game shell. It is retained as a working recovery source and as a read-only implementation reference for the successor product, Awordle (pronounced "Award-le").

## Locked Surfaces

The following surfaces must not be changed unless the user explicitly unlocks this shell in a future task that names this repository and the exact intended change:

- runtime and application source;
- gameplay, account, persistence, progression, marketplace, multiplayer, spectator, admin, and API behavior;
- tests, E2E harnesses, assertions, fixtures, and testing configuration;
- dependencies, lockfiles, framework, build configuration, and deployment configuration;
- Supabase migrations, schema/RPC/RLS contracts, remote state, Auth, Storage, and data;
- Vercel project configuration, deployment state, cron, Blob configuration, and environment variables;
- product rules, Elo/scoring, Daily claims, answer selection, economy rules, and privacy boundaries.

## Permitted Future Access

Without unlocking the shell, future work may:

- read files and inspect Git history, tags, releases, tests, migrations, and documentation;
- copy files from the exact Golden Checkpoint into a separately named successor workspace;
- compare a successor against the preservation inventory and test contract;
- update documentation in this repository only when the user explicitly authorizes that documentation-only maintenance and it does not alter the locked implementation.

The Awordle successor repository and its agents must treat `brrrdle-dev` as read-only. They must never use this repository as their working tree, deployment source, Supabase target, or Vercel target.

## Source Of Truth

The accepted capability contract is recorded in:

- `planning/handoffs/PRE-PHASE-55-FUNCTIONALITY-PRESERVATION-INVENTORY-2026-07-09.md`;
- `planning/phase-58/REVIEW-CHECKLIST.md`;
- `planning/phase-58/CHANGELOG.md`;
- `planning/handoffs/AWORDLE-SUCCESSOR-ROADMAP-AND-HANDOFF-2026-07-13.md`.

If later documentation conflicts with this lock, stop and require explicit user direction before changing a locked surface.
