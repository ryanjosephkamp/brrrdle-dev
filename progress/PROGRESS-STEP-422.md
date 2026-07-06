# Progress Step 422 - Phase 47 Planning Decision

**Status:** Completed - Awaiting User Review Before Phase 47 Specification
**Phase:** Phase 47 - Mobile Solo GO Visibility and Account Display Boundaries
**Stage:** Phase 46 Manual Review Results Processing and Phase 47 Planning Brief
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-05T22:24:38Z
**Completed:** 2026-07-05T22:28:03Z

## Authorization

The user authorized a Phase 46 manual-review-results processing and Phase 47 planning decision pass only.

Authorized work included reading the user-updated Phase 46 manual review checklist, Phase 46 completion evidence, roadmap/planning context, phase scope sizing guidance, testing strategy, relevant Solo mobile gameplay/scroll/keyboard surfaces, account/sign-out/display-boundary surfaces, sync/session freshness surfaces, and relevant source/test surfaces read-only as needed. If Phase 47 planning was safe, the user authorized creating `planning/phase-47/PLANNING-BRIEF.md`, updating planning indexes/roadmaps only if needed for routing clarity, creating this progress report, and appending the matching 12-column CSV row.

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

## Manual Review Result

Phase 46 manual review was not fully clean. The review passed overall, but two mobile GO checks failed:

- `Mobile Daily Solo GO keyboard is visible before the first valid guess`.
- `Mobile Practice Solo GO remains playable after the first valid guess`.

The user also reported:

- Practice Solo GO `New go chain` may not scroll down enough or may not scroll at all before a first guess.
- Returning to active Daily/Practice Solo OG/GO after a submitted guess may scroll down but not far enough.
- Longer-term mobile gameplay scaling/responsiveness may be a better root fix than repeated scroll-offset tuning.
- Broad mobile shell/top-tab/navigation overhaul and a possible compact side dock should remain later planning unless explicitly authorized.
- Same-account multi-tab/browser behavior remains confusing, but strict one-active-session enforcement should not be assumed.
- After sign-out, guest-visible History, leaderboard/rating summaries, Stats, and other account-specific surfaces may still show data from the just-signed-out account.

## Planning Decision

Phase 47 planning can safely begin.

The phase is rerouted from older profile/multiplayer contract simplification to the smallest coherent manual-review follow-up scope:

- urgent mobile Solo GO keyboard visibility and automatic scroll repair planning;
- Daily/Practice Solo GO pre-guess and post-guess/re-entry scroll behavior;
- mobile gameplay viewport/scaling audit if needed to avoid another brittle scroll-offset pass;
- source-only versus broader mobile layout decisioning;
- signed-out guest display-boundary audit for History, leaderboard/rating summaries, Stats, and other account-specific surfaces;
- same-account multi-tab/browser session freshness classification while keeping strict one-active-session enforcement deferred unless evidence proves it is required.

Profile/data-contract simplification, custom-code/private Daily/ranked Daily work, compact side dock implementation, broad mobile shell/top-tab/navigation overhaul, configurable Home widgets, spectator previews, notification redesign, social inbox/mailbox, spectator presence/count/list, service workers/push, deployment/release, gameplay-rule changes, and Elo changes remain deferred.

## Files Changed

- `planning/phase-46/REVIEW-CHECKLIST.md` - preserved existing user-updated manual review result with two failed mobile GO checklist items.
- `planning/phase-47/PLANNING-BRIEF.md` - created Phase 47 planning brief.
- `planning/README.md` - updated planning hub routing from Phase 46 to Phase 47.
- `planning/ROADMAP.md` - updated Phase 46 completion/manual-review routing and Phase 47/48 sequencing.
- `planning/ROADMAP-OPTIMIZED.md` - updated optimized phase map and strategy routing.
- `progress/PROGRESS-STEP-422.md` - created this planning progress report.
- `progress/PROGRESS.csv` - appended the matching 12-column progress row for ID 422.

## Phase-Scope Sizing

The phase scope sizing guide supports a cohesive macro-phase when work shares a coherent risk surface and remains staged. Phase 47 is sized as a larger planning umbrella but keeps implementation stages narrow:

- mobile GO keyboard/scroll audit and repair decision;
- mobile GO source-only repair if safe;
- account display-boundary audit and source-only repair decision;
- account display-boundary repair only if safe;
- final hardening and manual checklist.

Broad mobile shell redesign and session-lease enforcement remain later addendum-level decisions.

## Verification

Passed lightweight documentation verification:

- `git diff --check`.
- Progress CSV shape check using `python3 -S`: `rows=424 columns=[12] last_id=422`.
- Non-printing changed/untracked file credential-value scan: `scanned_files=7 credential_value_hits=0 binary_skipped=0`.
- Ignored-artifact check: `changed_files=5 untracked_files=2 staged_files=0 tracked_files=1117 forbidden_artifact_hits=0`.
- `git status --short --branch` completed.

## Blockers And Open Questions

No blocker to Phase 47 specification planning.

Open questions for the unified specification:

- Is the mobile GO failure primarily target timing, target selection, scroll margin, browser chrome/safe-area, or GO layout density?
- Should the immediate repair prioritize full keyboard visibility over latest-guess context?
- Does the signed-out display-boundary issue come from active progress scope selection, cached view models, route state, or component props?
- Can display-boundary repair stay source-only?
- Should same-account multi-tab/browser behavior remain a freshness/documentation concern or become a later session-lease/security feature?

## Boundary Confirmation

No source/runtime implementation, test implementation, migrations, deployment/configuration, staging, commits, pushes, PRs, merges, releases, branch deletion, backup workflow execution, spectator presence/count/list work, service worker/push work, gameplay-rule changes, Elo changes, secret/private-data/local-artifact exposure, local Codex skill changes, or stable `brrrdle` repository work was performed.

## Next Gate

The next safe action is creating the unified Phase 47 specification for review only.
