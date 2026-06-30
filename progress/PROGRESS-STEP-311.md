# Progress Step 311: Unified Phase 38 Specification

## Status

Completed - Awaiting User Review.

## Authority

User authorized creation of a unified Phase 38 specification for review only. This pass created an implementation-oriented specification from the approved Phase 38 planning brief and current repository context.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `cdd780989535a3081a5e034bde1a247569ca28af`
- `origin/main`: `cdd780989535a3081a5e034bde1a247569ca28af`
- Existing user edit to `planning/phase-37/REVIEW-CHECKLIST.md`: preserved and not edited in this pass.

## Specification Summary

- Created `planning/specs/phase-38/PHASE-38-PUBLIC-SPECTATOR-READINESS-SPEC-2026-06-30.md`.
- Updated `planning/README.md` for Phase 38 spec discoverability.
- Locked Phase 38 around public/spectator readiness:
  - public/guest spectator audit and scope lock;
  - expected migration/RLS addendum before public/guest spectator implementation unless a source-only path is proven safe;
  - sanitized public/guest Live discovery;
  - read-only public/guest spectation;
  - current Daily Multiplayer exclusion;
  - optional spectator presence/count/list only if privacy-safe and abuse-resistant;
  - preservation of authenticated participant and authenticated spectator behavior.

## Key Decisions

- Current Live spectator support is authenticated-only and should not be broadened by reusing authenticated RPC shapes for public/guest viewers.
- Phase 38 should assume a fresh sanitized public/guest projection and migration/RLS addendum are required before implementation.
- Phase 38 v1 should start with Practice Multiplayer public/guest spectator eligibility. Current Daily Multiplayer remains excluded.
- Spectator presence should prefer aggregate display-only counts if included at all. Identity-bearing lists remain risky and should be deferred unless later evidence proves them safe.
- Public/social profile browsing, clickable rival profiles, direct match requests, private matchmaking expansion, public site stats, developer dashboard, onboarding/help/tutorial UX, progression HUD counters, Focus Mode, theme work, service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes remain deferred.

## Verification

- `git diff --check`
  - Result: passed.
- Progress CSV shape check using `python3 -S`
  - Result: passed, `rows=313 columns=[12] last_id=311`.
- Non-printing secret/artifact scan over changed tracked and untracked repository files
  - Result: passed, `scanned_files=7 credential_pattern_hits=0`.
- Ignored-artifact check
  - Result: passed, `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch`
  - Result: completed; expected user-edited Phase 37 review checklist, Phase 38 planning/spec/progress artifacts, and planning index update remain unstaged.

## Boundaries Preserved

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review the unified Phase 38 specification. If approved, explicitly authorize creation of the detailed Phase 38 implementation plan before audits, implementation, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
