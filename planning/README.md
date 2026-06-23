# brrrdle Planning System

**Status**: Active planning hub after the Phase 23 to Phase 24 repository reorganization.

## Purpose

The `planning/` directory keeps current plans, phase specs, historical context, and testing strategy out of the repository root while preserving fast access for Codex and future agents.

## What To Read First

For normal future work, read:

1. The current user prompt.
2. Root [CONSTITUTION.md](../CONSTITUTION.md).
3. Root [BRRRDLE-SPEC.md](../BRRRDLE-SPEC.md).
4. Root [BRRRDLE-OVERVIEW.md](../BRRRDLE-OVERVIEW.md) when historical product-plan context matters.
5. Root [AGENT-IMPLEMENTATION-PLAN.md](../AGENT-IMPLEMENTATION-PLAN.md), which now points into this planning hub.
6. [planning/IMPLEMENTATION-PLAN.md](IMPLEMENTATION-PLAN.md).
7. The active or next phase plan. Phase 30 public leaderboard planning is the next planning target after completed Phase 29 public profile foundations.
8. [progress/PROGRESS.csv](../progress/PROGRESS.csv) and the latest matching progress report.

## Directory Map

- `planning/IMPLEMENTATION-PLAN.md`: lightweight living project plan.
- `planning/phase-24/`: active Phase 24 planning and changelog area.
- `planning/phase-25/`: Phase 25 planning brief and implementation plan.
- `planning/phase-26/`: revised Phase 26 planning brief, implementation plan, and changelog for responsive polish, notification controls, and Live v1 spectation.
- `planning/phase-27/`: Phase 27 planning brief, implementation plan, and changelog for competitive ranking, Elo/rank, ranked matchmaking, and leaderboard-ready data foundations.
- `planning/phase-28/`: Phase 28 planning brief, implementation plan, changelog, and seeds for Live v1 spectator refresh, notification stabilization, Daily spectation integrity, Elo transparency, and scope routing.
- `planning/phase-29/`: Phase 29 planning brief, implementation plan, and changelog for public player profile foundations, privacy-safe public identity, notification action cleanup, and About-tab Elo transparency relocation.
- `planning/phase-30/`: Phase 30 planning brief, implementation plan, changelog, and deferred ranked-mode routing note for privacy-safe public leaderboards, small Multiplayer Overview cleanup items, and future competitive ladder v2 scope assignment.
- `planning/specs/phase-23/`: Phase 23 source specs and bug notes.
- `planning/specs/phase-24/`: future Phase 24 specs once provided.
- `planning/specs/phase-25/`: Phase 25 dashboard, notifications, and engagement specs.
- `planning/specs/phase-26/`: Phase 26 responsive polish, notification controls, and Live v1 specs.
- `planning/specs/phase-27/`: Phase 27 competitive ranking, Elo/rank, ranked matchmaking, and leaderboard-ready data foundation specs.
- `planning/specs/phase-28/`: Phase 28 Live spectator, notification stabilization, Daily spectation integrity, and Elo transparency specs.
- `planning/specs/phase-29/`: Phase 29 public profile foundations, notification action cleanup, and About-tab Elo transparency specs.
- `planning/specs/phase-30/`: Phase 30 public leaderboard and Multiplayer Overview cleanup specs.
- `planning/specs/pre-phase-25/`: narrow post-Phase-24, pre-Phase-25 bugfix specs.
- `planning/specs/archive/`: earlier phase specs and historical planning artifacts.
- `planning/history/`: long historical plans, changelogs, Vercel logs, and summaries.
- `planning/governance/`: guidance for active governance file locations.
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`: standard for Codex-generated prompt packages and next-step handoff prompts.
- `planning/testing/`: testing-suite strategy and verification philosophy.

Theme proposal modernization is intentionally deferred until Phase 34, with full concrete theme implementation routed to Phase 35 or later. Theme materials remain under `themes/proposals/`, outside this `planning/` directory.

## Planning Rules

- Keep root entrypoints short and stable.
- Keep active phase plans concise.
- Move completed phase specs into `planning/specs/`.
- Keep long historical material under `planning/history/`.
- Do not treat planning documents as implementation authorization unless the user explicitly authorizes execution.
- Keep `progress/` at the repository root as the canonical progress ledger.

## Testing Strategy

The testing strategy is documented in [planning/testing/TESTING-SUITE.md](testing/TESTING-SUITE.md). It prioritizes core gameplay correctness, real multiplayer E2E for multiplayer claims, and smoke coverage that remains flexible enough for future UI changes.
