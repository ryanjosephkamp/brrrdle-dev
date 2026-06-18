# Progress Step 200 - Phase 28 Scope And Future Roadmap Revision

**Phase**: Phase 28
**Stage**: Scope Intake And Routing
**Status**: Completed - Awaiting User Review Before Phase 28 Planning Brief
**Started**: 2026-06-17T22:21:46Z
**Completed**: 2026-06-17T22:21:46Z

## Authorization

The user authorized a planning/documentation-only Phase 28 scope revision pass.

Authorized work includes reading governance, current roadmap, completed Phase 27 materials, current progress records, existing Phase 28 planning seed notes, Live v1 spectator surfaces, notification surfaces, ranked/Elo surfaces, and relevant source/test files read-only; deciding the safest phase routing for new user-provided Phase 28 candidate items and later-phase feature ideas; updating repository planning documentation to reflect the revised post-Phase-27 sequence; creating or expanding a Phase 28 planning intake document; recording progress; and generating a copy-safe next prompt package for creating the revised Phase 28 planning brief.

The authorization does not include source/runtime implementation, test implementation, Supabase migrations, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 28 implementation, Phase 29 implementation, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work.

## Repository State

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Confirmed target is `brrrdle-dev`, not the original stable `brrrdle` repository.
- Current branch at kickoff: `main`
- Local `HEAD` at kickoff: `a051931dad51e554be151bc45e811efc18f4f04d`
- `origin/main` at kickoff: `a051931dad51e554be151bc45e811efc18f4f04d`
- Local `main` matched `origin/main` at kickoff.
- Existing untracked `planning/phase-28/LIVE-V1-SPECTATOR-REFRESH-DIAGNOSIS.md` was present before this pass and was preserved.

## Planned Work

- Create a Phase 28 intake/routing document for Live spectator, notification, Elo transparency, and multiplayer postgame action ideas.
- Update roadmap surfaces so Phase 28 no longer starts with public profiles.
- Route public profiles, leaderboards, rematch/postgame actions, public/guest spectation, and themes into later phases.
- Preserve completed Phase 27 ranked behavior and all gameplay/privacy invariants.
- Run lightweight documentation verification only.

## Results

- Created `planning/phase-28/PHASE-28-SCOPE-INTAKE-AND-ROUTING.md`.
- Routed Phase 28 to Live v1 spectator and notification stabilization, current Daily spectation integrity, and low-risk Elo transparency.
- Routed public player profiles to Phase 29.
- Routed leaderboards to Phase 30.
- Routed multiplayer postgame actions, including Practice rematch and same-settings play-again/search-again flows, to Phase 31.
- Routed public/guest spectation to Phase 32.
- Routed theme proposal/template modernization to Phase 33 and full concrete theme implementation to Phase 34 or later.
- Updated `planning/ROADMAP.md`, `planning/ROADMAP-OPTIMIZED.md`, and `planning/README.md` to reflect the revised sequence.
- Added a cross-reference from `planning/phase-28/LIVE-V1-SPECTATOR-REFRESH-DIAGNOSIS.md` to the broader intake/routing document.
- Added a short durable note to `memory.md` for future agents.

## Verification

- `git diff --check` passed.
- Python CSV shape check passed for `progress/PROGRESS.csv` (202 rows including header, 12 columns each, last_id=200).
- `git status --short --branch` confirmed local `main` still tracks `origin/main` with only documentation/progress changes and the untracked Phase 28 planning files expected from this pass.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migrations, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 28 implementation, Phase 29 implementation, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
