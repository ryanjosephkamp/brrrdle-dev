# Progress Step 423 - Phase 47 Unified Specification

**Status:** Completed - Awaiting User Review Before Phase 47 Implementation Plan
**Phase:** Phase 47 - Mobile Solo GO Visibility and Account Display Boundaries
**Stage:** Unified Specification
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-05T22:31:35Z
**Completed:** 2026-07-05T22:34:28Z

## Authorization

The user authorized creation of a unified Phase 47 specification for review only.

Authorized work included reading governance, roadmap, completed Phase 46 materials, the Phase 47 planning brief, phase scope sizing guidance, current progress records, Solo mobile gameplay/scroll/keyboard surfaces, account/sign-out/display-boundary surfaces, sync/session freshness surfaces, relevant tests, and local workflow docs; creating one unified Phase 47 spec under `planning/specs/phase-47/`; creating this progress report; and appending the matching 12-column CSV row.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating or modifying local Codex skills, or original stable repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed repository basename: `brrrdle-dev`.
- Confirmed branch: `main`.
- Confirmed `HEAD`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- Confirmed `origin/main`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- Confirmed remote: `https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved the user-updated `planning/phase-46/REVIEW-CHECKLIST.md`.

## Specification Summary

Created `planning/specs/phase-47/PHASE-47-MOBILE-SOLO-GO-VISIBILITY-AND-ACCOUNT-DISPLAY-BOUNDARY-SPEC-2026-07-05.md`.

The unified spec locks Phase 47 around:

- mobile Daily Solo GO keyboard visibility before the first valid guess;
- mobile Practice Solo GO new-chain and post-guess/re-entry keyboard visibility;
- Daily/Practice Solo OG/GO re-entry audit for common scroll-target failures;
- source-only versus broader mobile layout/scaling decisioning;
- signed-out guest display-boundary audit for History, leaderboard/rating summaries, Stats, and related account-specific surfaces;
- source-only display-boundary repair only if safe;
- same-account multi-tab/browser session freshness classification without assuming one-active-session enforcement.

The spec explicitly preserves Phase 46 automatic signed-in Solo sync/freshness behavior, no implicit guest-to-account Solo transfer, no authenticated progress writes to guest storage, Solo Overview Resume-only behavior, Phase 45 Solo account boundaries, Phase 44 account-scoped repairs, Phase 43 ranked fairness/current-surface cleanup, Phase 42 stats/dashboard/help contracts, Phase 41 multiplayer reliability, Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, Phase 38 public/guest spectator boundaries, Daily claim safety, gameplay rules, and Elo math.

## Deferred Routing

The spec explicitly defers:

- broad mobile shell/top-tab/navigation overhaul;
- compact/collapsible side dock implementation;
- configurable Home widgets;
- private request inbox widgets;
- Live/Active/Home spectator previews;
- notification redesign, notification rival-name, and ranked-context work;
- UTC/local timestamp policy changes;
- profile/data-contract simplification;
- admin queue/lobby observability dashboard;
- social inbox/mailbox;
- spectator presence/count/list;
- service workers and push infrastructure;
- strict one-active-session enforcement or session leases unless a later addendum proves they are required;
- server-authoritative Daily submissions;
- deployment/release;
- gameplay-rule changes;
- Elo changes.

## Files Changed

- `planning/specs/phase-47/PHASE-47-MOBILE-SOLO-GO-VISIBILITY-AND-ACCOUNT-DISPLAY-BOUNDARY-SPEC-2026-07-05.md` - created unified Phase 47 specification.
- `progress/PROGRESS-STEP-423.md` - created this progress report.
- `progress/PROGRESS.csv` - appended the matching 12-column progress row for ID 423.

Existing uncommitted Phase 47 planning artifacts from the prior gate remain preserved:

- `planning/phase-47/PLANNING-BRIEF.md`.
- `progress/PROGRESS-STEP-422.md`.
- planning hub/roadmap updates from the Phase 47 planning brief pass.
- user-updated `planning/phase-46/REVIEW-CHECKLIST.md`.

## Verification

Passed lightweight documentation verification:

- `git diff --check`.
- Progress CSV shape check using `python3 -S`: `rows=425 columns=[12] last_id=423`.
- Non-printing changed/untracked file credential-value scan: `scanned_files=9 credential_value_hits=0 binary_skipped=0`.
- Ignored-artifact check: `tracked_files=1117 staged_files=0 forbidden_artifact_hits=0`.
- `git status --short --branch` completed.

## Blockers And Open Questions

No blocker to Phase 47 implementation-plan drafting.

Open decisions for the implementation plan:

- Whether the mobile GO failure is target timing, target selection, safe-area/browser chrome, scroll margin, GO layout density, or broader mobile scaling.
- Whether full keyboard visibility should be enforced through a stronger Playwright/mobile assertion than the current threshold.
- Which signed-out guest surfaces leak account-owned data and whether repair can stay source-only.
- Whether same-account multi-tab/browser behavior remains a freshness classification item or later session-lease addendum work.

## Boundary Confirmation

No source/runtime implementation, test implementation, migrations, deployment/configuration, staging, commits, pushes, PRs, merges, releases, branch deletion, backup workflow execution, spectator presence/count/list work, service worker/push work, gameplay-rule changes, Elo changes, secret/private-data/local-artifact exposure, local Codex skill changes, or stable `brrrdle` repository work was performed.

## Next Gate

The next safe action is creating the detailed Phase 47 implementation plan for review only.
