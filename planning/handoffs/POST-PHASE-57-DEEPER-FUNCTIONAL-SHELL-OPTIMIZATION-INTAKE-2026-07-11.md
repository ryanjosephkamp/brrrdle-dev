# Post-Phase-57 Deeper Functional-Shell Optimization Intake

**Status:** Current user direction; planning and implementation remain separately gated.
**Date:** 2026-07-11.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev` only.

## Purpose

This intake records the user's direction after accepting Phase 57. The accepted game is highly playable and functionally strong. It should first be protected by a Phase 57 Final Acceptance backup and Golden Checkpoint. Only after that checkpoint should a new planning pass determine whether the existing functional shell can safely become lighter, faster, and easier to run across desktop and mobile browsers.

This document does not authorize source, runtime, CSS, test, dependency, framework, migration, Supabase, deployment, Git/GitHub, release, or stable-repository work.

## Protected Outcome

Any later optimization must retain every accepted current capability and contract, including gameplay, account behavior, guest and cloud persistence, progression, economy, Marketplace, consumables, Daily integrity, multiplayer, matchmaking, private requests, notifications, blocking, ratings, leaderboards, history, Stats, spectation, privacy, accessibility, responsive behavior, and Home-on-refresh.

The optimization goal is not a product reduction. It is an evidence-backed attempt to reduce unnecessary browser work, bundle/runtime cost, rendering churn, styling overhead, and implementation complexity while preserving behavior.

## Required Planning Sequence

1. Verify the exact Phase 57 Golden Checkpoint before analysis.
2. Refresh `planning/handoffs/PRE-PHASE-55-FUNCTIONALITY-PRESERVATION-INVENTORY-2026-07-09.md` against the accepted Phase 55-57 implementation and current tests.
3. Audit current architecture and implementation without assuming that a rewrite, framework migration, dependency installation, static-HTML conversion, or component-system replacement is beneficial.
4. Establish current bundle, route, rendering, scroll, memory, network, and browser-performance baselines with repeatable evidence.
5. Identify and rank optimization candidates by expected benefit, regression risk, reversibility, affected contracts, verification needs, and whether they are source-only or require a separately authorized protected change.
6. Recommend whether a deeper shell pass is worthwhile. It is acceptable to conclude that the current shell is already near the responsible minimum.
7. If worthwhile, prepare a detailed implementation plan, test strategy, Review Candidate loop, rollback checkpoints, and a separate execution prompt. Do not implement from the audit prompt itself.

## Hard Boundaries

- Do not remove, merge away, hide, or intentionally degrade a current function merely to improve a performance metric.
- Do not weaken behavioral, accessibility, authority, privacy, migration, or real-E2E assertions.
- Do not change gameplay rules, rewards, XP, coins, consumable prices/effects, rating/Elo, queue behavior, Daily claims, answer selection, or persistence semantics.
- Do not modify Supabase schema, RPCs, RLS, grants, data, Auth, Storage, or deployment configuration during the planning audit.
- Do not install dependencies or change frameworks during the planning audit.
- Do not begin Phase 58 design direction or Phase 59 frontend rebuilding during the optimization audit.
- Do not touch the original stable `brrrdle` repository.

## Relationship To Later Phases

The accepted deeper-shell implementation, if the audit recommends one and the user later authorizes it, should receive its own Review Candidate loop, Final Acceptance backup, and Golden Checkpoint. Phase 58 design direction and the GPT-5.6 SOL handoff should then use that exact optimized baseline. If the audit recommends no implementation, Phase 58 may proceed directly from the Phase 57 Golden Checkpoint.
