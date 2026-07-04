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
7. The active or next phase plan. Phase 42 is complete, backed up, merged, and manually reviewed. Use the Phase 43 intake, recommendations/routing document, planning brief, unified specification, and implementation plan before beginning Stage 43.0.
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
- `planning/phase-31/`: Phase 31 planning brief, implementation plan, and changelog for Practice-only multiplayer postgame actions plus narrow profile, Stats, About, and rating-bucket cleanup items.
- `planning/phase-32/`: Phase 32 planning brief, implementation plan, changelog, and review checklist for post-Phase-31 multiplayer stabilization, identity routing, global account avatar accent propagation, no-comma rating displays, and explicit rerouting of competitive ladder v2.
- `planning/phase-33/`: Phase 33 planning brief, implementation plan, changelog, and review checklist for competitive ladder v2 readiness, canonical five-minute timed ranked Practice, rank bands, public leaderboard cleanup, and routing of auth/deployment/onboarding observations.
- `planning/phase-34/`: Phase 34 planning brief, implementation plan, changelog, and review checklist for Multiplayer Live/Lobby/notification current-surface stabilization, including Live identity labels, Live badge readability, direct Lobby join, notification direct-resume routing, and Active Games turn cues.
- `planning/phase-35/`: Phase 35 planning brief, implementation plan, changelog, and review checklist for persistent ranked Live safe-name repair plus auth, deployment, account-management, Settings/Danger Zone, and Profile tab readiness.
- `planning/phase-36/`: Phase 36 planning brief, implementation plan, changelog, and review checklist for Leaderboard/Stats navigation split, Active Games safe-name cleanup, password-copy polish, and Settings section ordering.
- `planning/phase-37/`: Phase 37 planning brief, implementation plan, changelog, and review checklist for gameplay entry/resume ergonomics, browser back/forward navigation readiness, and solo invalid-guess sound consistency.
- `planning/phase-38/`: Phase 38 planning brief, implementation plan, changelog, and review checklist for public/spectator readiness, including public/guest spectation audit, privacy/RLS gates, read-only public spectator integration, and spectator presence routing.
- `planning/phase-39/`: Phase 39 planning brief, implementation plan, changelog, and review checklist for mobile performance and scroll smoothness readiness, including audit/measurement planning, targeted source/CSS optimization routing, complex workspace scroll tuning, and later mobile UX overhaul deferral.
- `planning/phase-40/`: Phase 40 planning brief and implementation plan for public profiles and private matchmaking, including public profile privacy audit, safe clickable identity surfaces, private/custom invitation routing, anti-abuse gates, and migration/RLS addendum expectations.
- `planning/phase-41/`: Phase 41 planning brief, strategy intake, implementation plan, changelog, and review checklist for multiplayer reliability, real E2E hardening, and Phase 40 manual-review bug routing.
- `planning/phase-42/`: Phase 42 planning brief, implementation plan, changelog, and review checklist for public site stats, private developer/admin dashboard, onboarding/help/tutorial UX, and the ranked Practice queue button/status flashing follow-up.
- `planning/phase-43/`: Phase 43 planning brief, implementation plan, intake, and recommendation/routing artifacts for current-surface UX cleanup, ranked queue follow-up, gameplay comfort, and later-phase routing.
- `planning/specs/phase-23/`: Phase 23 source specs and bug notes.
- `planning/specs/phase-24/`: future Phase 24 specs once provided.
- `planning/specs/phase-25/`: Phase 25 dashboard, notifications, and engagement specs.
- `planning/specs/phase-26/`: Phase 26 responsive polish, notification controls, and Live v1 specs.
- `planning/specs/phase-27/`: Phase 27 competitive ranking, Elo/rank, ranked matchmaking, and leaderboard-ready data foundation specs.
- `planning/specs/phase-28/`: Phase 28 Live spectator, notification stabilization, Daily spectation integrity, and Elo transparency specs.
- `planning/specs/phase-29/`: Phase 29 public profile foundations, notification action cleanup, and About-tab Elo transparency specs.
- `planning/specs/phase-30/`: Phase 30 public leaderboard and Multiplayer Overview cleanup specs.
- `planning/specs/phase-31/`: Phase 31 multiplayer postgame actions and current-surface cleanup specs.
- `planning/specs/phase-32/`: Phase 32 multiplayer stabilization, identity routing, and rating display consistency specs.
- `planning/specs/phase-33/`: Phase 33 competitive ladder v2 readiness specs.
- `planning/specs/phase-34/`: Phase 34 Multiplayer Live/Lobby/notification stabilization specs.
- `planning/specs/phase-35/`: Phase 35 Live identity, auth/deployment, account-management, and Profile tab readiness specs.
- `planning/specs/phase-36/`: Phase 36 Leaderboard/Stats split, Active Games safe-name, password-copy, and Settings cleanup specs.
- `planning/specs/phase-37/`: Phase 37 navigation, gameplay-entry ergonomics, browser history, and solo invalid-guess sound specs.
- `planning/specs/phase-38/`: Phase 38 public/spectator readiness specs for public/guest spectation audit, migration/RLS gates, sanitized Live discovery, and read-only spectator boundaries.
- `planning/specs/phase-39/`: Phase 39 mobile performance and scroll smoothness specs for audit, measurement harness planning, targeted shell/CSS/shared-UI optimization, complex workspace tuning, and final hardening gates.
- `planning/specs/phase-40/`: Phase 40 public profile and private matchmaking specs.
- `planning/specs/phase-41/`: Phase 41 multiplayer reliability and real E2E hardening specs for ranked queue, public leaderboard, private request, mobile freshness, and Codex-assisted manual-review preflight gates.
- `planning/specs/phase-42/`: Phase 42 site stats, developer dashboard, onboarding/help/tutorial UX, and narrow ranked Practice queue flashing follow-up specs.
- `planning/specs/phase-43/`: Phase 43 current-surface UX cleanup, ranked queue follow-up, gameplay comfort, route/shell density cleanup, and visual-review specs.
- `planning/specs/pre-phase-25/`: narrow post-Phase-24, pre-Phase-25 bugfix specs.
- `planning/specs/archive/`: earlier phase specs and historical planning artifacts.
- `planning/history/`: long historical plans, changelogs, Vercel logs, and summaries.
- `planning/governance/`: guidance for active governance file locations.
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`: standard for Codex-generated prompt packages and next-step handoff prompts.
- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`: guidance for safely making future phases larger while keeping implementation stages narrow, gated, and verification-friendly.
- `planning/skills/`: documentation for brrrdle-specific local Codex workflow skills; the actual skills live under `/Users/noir/.codex/skills/` and are not committed.
- `planning/testing/`: testing-suite strategy and verification philosophy.

Theme proposal modernization is intentionally deferred until after the current multiplayer, auth/deployment, public/spectator, profile/social, onboarding, current-surface UX cleanup, and shell-comfort readiness phases. Theme materials remain under `themes/proposals/`, outside this `planning/` directory.

## Planning Rules

- Keep root entrypoints short and stable.
- Keep active phase plans concise.
- Move completed phase specs into `planning/specs/`.
- Keep long historical material under `planning/history/`.
- Do not treat planning documents as implementation authorization unless the user explicitly authorizes execution.
- Keep `progress/` at the repository root as the canonical progress ledger.
- For completed user-visible phases, use `planning/phase-<N>/REVIEW-CHECKLIST.md` as the committed manual review aid when explicitly authorized. It is not a replacement for automated verification.
- When a future phase can safely batch more work, follow `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`: enlarge cohesive macro-phase scope, not individual implementation-stage scope.

## Testing Strategy

The testing strategy is documented in [planning/testing/TESTING-SUITE.md](testing/TESTING-SUITE.md). It prioritizes core gameplay correctness, real multiplayer E2E for multiplayer claims, and smoke coverage that remains flexible enough for future UI changes.
