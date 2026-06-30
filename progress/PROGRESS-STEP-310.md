# Progress Step 310: Phase 37 Manual Review Results And Phase 38 Planning Brief

## Status

Completed - Awaiting User Review.

## Authority

User authorized a Phase 37 manual-review-results processing and next-planning decision pass only. Because the user reported the Phase 37 manual review checklist passed with no additional bugs or feature requests for Phase 38, this pass was authorized to create the Phase 38 planning brief.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `cdd780989535a3081a5e034bde1a247569ca28af`
- `origin/main`: `cdd780989535a3081a5e034bde1a247569ca28af`
- Existing user edit to `planning/phase-37/REVIEW-CHECKLIST.md`: preserved and not edited in this pass.

## Manual Review Result

- Phase 37 manual review was clean based on the user's current report.
- The user reported no new bugs, concerns, screenshots, or feature requests to add beyond the already planned Phase 38 direction.
- Phase 38 planning was therefore created.

## Planning Summary

- Created `planning/phase-38/PLANNING-BRIEF.md`.
- Updated `planning/README.md` for Phase 38 discoverability and to replace stale Phase 37 next-target wording.
- Locked the recommended Phase 38 direction around public/spectator readiness:
  - public/guest spectation audit first;
  - expected migration/RLS addendum gate before SQL/source work;
  - sanitized public/guest Live discovery only if safe projections avoid sensitive data;
  - read-only public/guest spectation only if it cannot mutate ratings, claims, timers, results, game state, queues, notifications, account/profile state, or local persistence authority;
  - spectator presence/count/list only if privacy-safe and abuse-resistant.

## Routing Decisions

- Public/guest spectation: Phase 38 audit/addendum first; implementation only if sanitized projections and read-only guarantees are approved.
- Spectator presence/count/list: optional Phase 38 gated slice; prefer aggregate counts or defer if identity/privacy risk is unclear.
- Public/social profile browsing, clickable rival profiles, direct player match requests, and private matchmaking expansion: Phase 39.
- Public site stats, private developer dashboard, onboarding/help/tutorial UX: Phase 40.
- EXP/coin/collectible header counters and Focus Mode: Phase 41 or later.
- Theme work: Phase 42 or later.
- Service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes: later gated phases only.

## Verification

- `git diff --check`
  - Result: passed.
- Progress CSV shape check using `python3 -S`
  - Result: passed, `rows=311 columns=[12] last_id=310`.
- Non-printing secret/artifact scan over changed tracked and untracked repository files
  - Result: passed, `scanned_files=5 credential_pattern_hits=0`.
- Ignored-artifact check
  - Result: passed, `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch`
  - Result: completed; expected user-edited Phase 37 review checklist, Phase 38 planning/progress artifacts, and planning index update remain unstaged.

## Boundaries Preserved

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review the Phase 38 planning brief. If approved, explicitly authorize creation of the unified Phase 38 specification before implementation, migration/RLS work, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
