# Progress Step 359 - Phase 42 Planning Brief

**Status**: Completed - Awaiting User Review Before Phase 42 Specification
**Phase**: Phase 42 - Site Stats, Developer Dashboard, Onboarding, And Help
**Stage**: Planning brief
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T04:10:20Z
**Completed**: 2026-07-03T04:10:50Z

## Authorization

The user authorized a Phase 41 manual-review-results processing and Phase 42 planning decision pass only.

This pass included reading the user-updated Phase 41 manual review checklist, Phase 41 completion evidence, roadmap/planning context, phase scope sizing guidance, relevant testing strategy, and relevant source/test surfaces enough to decide whether Phase 42 planning could safely begin. Because planning was safe, this pass created the Phase 42 planning brief, updated planning indexes/roadmaps for discoverability and routing clarity, and recorded this progress report plus the matching 12-column CSV row.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- `origin/main`: `7acff9d4d414533afb2930cc7fa547cec8abfee9`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-41/REVIEW-CHECKLIST.md` was preserved.

## Manual Review Processing

Phase 41 manual review was completed with one follow-up issue, not a fully clean no-follow-up review.

User-reported result:

- virtually every previously identified bug appears fixed;
- the game looks good overall;
- the only failed manual item is ranked Practice queue button/status flashing on the Practice Multiplayer subtab roughly every five seconds after a ranked Practice queue is opened;
- the issue appears minor/cosmetic and does not appear to interrupt gameplay flow;
- the issue should be folded into Phase 42 planning unless evidence suggests a broader reliability problem.

Planning decision:

- Phase 42 planning is safe to begin.
- The remaining flashing-button issue is routed into Phase 42 as a narrow early audit/source-test follow-up.
- No separate emergency bugfix phase is required based on the manual review notes.

## Phase 42 Planning Created

Created:

- `planning/phase-42/PLANNING-BRIEF.md`

Updated for routing/discoverability:

- `planning/README.md`
- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`

Phase 42 is planned as a cohesive macro-phase for:

- public live-site stats;
- private developer/admin dashboard;
- onboarding, help, and tutorial UX;
- a narrow ranked Practice queue button/status flashing follow-up.

The phase scope sizing guide was applied by keeping the macro-phase cohesive while requiring narrow, single-purpose future stages with explicit migration/RLS addendum gates.

## Routing Decisions

- Public site stats, private developer dashboard, onboarding, help, and tutorial UX: Phase 42.
- Ranked Practice queue flashing-button follow-up: Phase 42 early narrow audit/source-test stage.
- EXP/coin/collectible header counters, Focus Mode, compact navigation, and broader mobile UX shell overhaul: Phase 43 or later.
- Theme proposal modernization: Phase 44 or later.
- Full concrete theme work: Phase 45 or later.
- Full mailbox/notification redesign, spectator presence/count/list, service workers, push subscriptions, production deployment/release, gameplay-rule changes, and Elo algorithm changes: later gated phases unless separately approved.

## Verification

Passed:

- `git diff --check`.
- Progress CSV shape check using `python3 -S`: `rows=361 columns=[12] last_id=359`.
- Non-printing changed/untracked file credential scan: `scanned_files=7 credential_pattern_hits=0`.
- Ignored/forbidden artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0 allowed_tracked_templates=1`.
- `git status --short --branch`: completed on `main...origin/main` with expected uncommitted documentation/planning changes and no staged files.

Note: an initial overbroad artifact scan flagged the repository's pre-existing tracked `.env.example` template. The final check explicitly allowed that known template while continuing to block real `.env.local`/environment files, build outputs, reports, screenshots, videos, traces, auth state, and local artifacts.

## Blockers And Open Questions

No blockers currently prevent review of the Phase 42 planning brief.

Open questions for Phase 42 specification:

- Which public stats are useful enough for v1 while remaining privacy-safe?
- Does the private developer dashboard need new Supabase/RLS contracts, or can it initially use existing admin-safe surfaces?
- Should onboarding live in Home, Settings/Help, a dedicated route, or contextual surfaces?
- Can the ranked Practice queue flashing be fixed with source/test-only UI state stabilization?
- Which Phase 42 surfaces require visual handoff screenshots?

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation contract change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, local Codex skill creation/modification, or original stable repository work has been performed.
