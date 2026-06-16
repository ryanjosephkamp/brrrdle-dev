# Progress Step 169 - Phase 26 Scope Revision And Future Roadmap Routing

**Status**: Completed - Awaiting User Review Before Phase 26 Specification
**Date**: 2026-06-15
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Head at start**: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`
**Origin main at start**: `a8fbc51339e220d5465d8047c88226e53cbcfc6c`

## Authorization

The user authorized a Phase 26 scope-revision planning/documentation pass only.

Authorized work included:

- reading governance, Phase 26 planning, roadmap, progress, theme proposal, notification, settings, Live, layout, and CSS surfaces;
- inspecting the three user-provided screenshots;
- updating the Phase 26 planning brief to reflect revised scope decisions;
- updating overall roadmap/planning surfaces for deferred and future-phase work;
- updating progress records.

Not authorized:

- source/runtime implementation;
- test implementation;
- Supabase migrations;
- Vercel or Supabase configuration;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- new custom skills;
- original stable `brrrdle` repository work;
- individual Phase 27 theme-template modernization.

## Repository State

- Working directory confirmed as `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Current branch confirmed as `main`.
- Local `HEAD` and `origin/main` were both `a8fbc51339e220d5465d8047c88226e53cbcfc6c`.
- Pre-existing uncommitted planning/progress artifacts from Phase 26 planning were preserved.

## Context Reviewed

Read or inspected:

- `CONSTITUTION.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `BRRRDLE-SPEC.md`
- `planning/README.md`
- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `planning/phase-26/PLANNING-BRIEF.md`
- Phase 25 planning/spec/implementation materials
- `planning/testing/TESTING-SUITE.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-168.md`
- `agents.md`
- `memory.md`
- `themes/proposals/README.md`
- `themes/proposals/theme_proposals.csv`
- all Markdown files under `themes/proposals/template_proposals/`
- screenshot evidence from `/Users/noir/Desktop/`
- relevant layout, dashboard, multiplayer Live, repository, settings, sound, and notification source surfaces for planning context only
- relevant Supabase migrations for existing multiplayer Live/spectator/RLS behavior

## Screenshot-Driven Findings

The screenshots show Phase 26 should treat responsive hardening as first-class scope:

- Home Dashboard Daily Status content can be clipped near the fixed right rail under Chrome zoom or narrow desktop width.
- Multiplayer Daily/Practice setup controls can overlap or compress into neighboring content.
- Dense result/status cards need stronger wrapping and fallback behavior.

Likely planning focus areas include the three-column Lunar Signal shell, center playfield overflow behavior, dashboard card grids, multiplayer setup form rows, and result/status cards.

## Decisions Applied

Applied the user's Phase 26 decision answers:

- Notification sounds default to important-only.
- Notification preferences should be cloud-synced through guest progress.
- Authenticated nonparticipant spectation remains in Phase 26, including a separately authorized Supabase migration/RLS stage if required.
- Public/guest spectation is deferred beyond Phase 26 unless a sanitized public projection is built and explicitly authorized.
- Theme-specific work moves out of Phase 26 and into a new Phase 27.

## Files Changed

- `planning/phase-26/PLANNING-BRIEF.md`: revised Phase 26 scope around responsive polish, notification controls/sounds, and authenticated Live v1.
- `planning/ROADMAP.md`: updated long-term phase routing after Phase 25.
- `planning/ROADMAP-OPTIMIZED.md`: updated optimized execution sequence and Phase 26 stage shape.
- `planning/README.md`: updated active Phase 26 pointer and noted Phase 27 theme deferral.
- `themes/proposals/README.md`: added Phase 27 modernization note without changing individual template proposals or CSV rows.
- `memory.md`: added a short durable planning note for Phase 26/27+ routing.
- `progress/PROGRESS.csv`: appended progress row 169.
- `progress/PROGRESS-STEP-169.md`: recorded this planning-only revision.

## Future Phase Routing Recorded

- Phase 26: polish/hardening, Chrome zoom/narrow-width overflow fixes, notification preferences/sounds, local browser notification controls where safe, authenticated Live v1 spectation.
- Phase 27: theme proposal/template modernization and theme implementation planning.
- Phase 28: comprehensive Elo/ranking and ranked matchmaking, with game points independent from Elo/rank.
- Phase 29: public player profile foundations and privacy-safe public identity.
- Phase 30: leaderboards for Elo/rank, streaks, total games played, and other approved metrics.
- Later phases: public/guest spectation using sanitized public projections, deeper social/community systems, marketplace, additional modes, and other expansion work.

## Verification

Passed:

- `git diff --check`
- progress CSV shape check using Python `csv` parsing: `rows=171 columns=12 last_id=169`
- `git status --short --branch`

## Blockers

None.

## Next Gate

The next safe gated action is to create a unified Phase 26 specification for review. No Phase 26 source/runtime implementation is authorized by this progress step.

## Boundary Confirmation

No source/runtime implementation, test implementation, commits, pushes, PRs, merges, releases, deployments, migrations, branch deletion, Phase 26 implementation, new custom skills, or original stable `brrrdle` repository work was performed.
