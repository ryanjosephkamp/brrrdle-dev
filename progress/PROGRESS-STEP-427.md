# Progress Step 427 - Phase 47 Stage 47.2 Source-Only Vs Broader Mobile Layout Decision

**Status:** Completed - Awaiting User Review Before Stage 47.3
**Phase:** Phase 47 - Mobile Solo GO Visibility and Account Display Boundaries
**Stage:** Stage 47.2 - Source-Only Vs Broader Mobile Layout Decision
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-06T00:10:02Z
**Completed:** 2026-07-06T00:14:06Z

## Authorization

The user authorized Phase 47 Stage 47.2 only: documentation/planning decision for whether the mobile Solo GO keyboard visibility and re-entry repair can remain source/test-only or requires broader mobile layout/scaling addendum planning.

Authorized work included confirming repository state and stable-repository boundary, preserving `planning/phase-46/REVIEW-CHECKLIST.md`, reading Phase 47 planning/spec/implementation materials and Stage 47.1 findings, creating this Stage 47.2 progress report and the matching 12-column CSV row, deciding the Stage 47.3 path, and running lightweight documentation verification.

This pass did not authorize source/runtime code, tests, Supabase migrations, storage changes, deployment/configuration, Git/GitHub actions, backup workflow execution, broad mobile shell/top-tab/navigation overhaul, compact side dock work, gameplay-rule changes, Elo changes, secret/private-data/local-artifact exposure, local Codex skill changes, or original stable repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed repository basename: `brrrdle-dev`.
- Confirmed branch: `main`.
- Confirmed `HEAD`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- Confirmed `origin/main`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- Confirmed remote: `https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved the user-updated `planning/phase-46/REVIEW-CHECKLIST.md`.

## Inputs Reviewed

- `progress/PROGRESS-STEP-426.md`.
- `planning/phase-47/PLANNING-BRIEF.md`.
- `planning/specs/phase-47/PHASE-47-MOBILE-SOLO-GO-VISIBILITY-AND-ACCOUNT-DISPLAY-BOUNDARY-SPEC-2026-07-05.md`.
- `planning/phase-47/IMPLEMENTATION-PLAN.md`.
- `planning/phase-46/REVIEW-CHECKLIST.md`.
- Current repository status, remotes, `HEAD`, and `origin/main`.

## Decision

Stage 47.3 can remain source/test-only.

No broader mobile layout/scaling addendum is required before Stage 47.3 because Stage 47.1 evidence points to bounded implementation surfaces:

- mobile keyboard bottom-clearance math;
- mobile scroll target selection and timing;
- missing or insufficient re-entry auto-center scheduling for already-started Solo sessions;
- Practice GO `New go chain` remount/seed-change timing;
- CSS scroll margin, sticky keyboard, safe-area, viewport-bottom, and back-to-top coordination;
- overly permissive Playwright viewport-ratio assertions.

Stage 47.1 did not prove a need for broad mobile shell/top-tab/navigation overhaul, compact side dock implementation, route-layout redesign, major gameplay layout/scaling redesign, storage-contract work, Supabase/RLS changes, session leases, gameplay-rule changes, or Elo changes.

## Stage 47.3 Repair Boundary

Stage 47.3 should be limited to source/test-only mobile Solo keyboard visibility repair.

Required covered flows:

- Mobile Daily Solo GO before the first valid guess must leave the full keyboard visible and usable.
- Mobile Practice Solo GO `New go chain` must scroll to a playable keyboard position.
- Mobile Daily Solo GO re-entry after one or more submitted guesses must leave the full keyboard visible and usable.
- Mobile Practice Solo GO re-entry after one or more submitted guesses must leave the full keyboard visible and usable.

Source-only repair options that remain within scope:

- Replace or augment `scrollIntoView({ block: 'end' })` with explicit mobile bottom-clearance logic for Solo keyboard targets.
- Add a bounded re-entry auto-center trigger for active Solo sessions with submitted guesses when entering Daily/Practice Solo views.
- Add a remount/seed-change auto-center path for Practice GO `New go chain`.
- Adjust mobile-only CSS scroll margins, bottom padding, safe-area handling, or sticky keyboard positioning.
- Hide, lift, or otherwise avoid back-to-top overlap while the Solo keyboard is visible on mobile.
- Strengthen focused Playwright mobile assertions so keyboard bottom clipping fails.

## OG Re-Entry Routing

Although the failed manual checklist items are GO-specific, Stage 47.1's mobile emulation probe showed the same bottom-clearance risk for Practice Solo OG re-entry after a submitted guess. Stage 47.3 should not rewrite OG behavior broadly, but it may include OG in the same bounded repair if the implementation naturally fixes the shared Solo keyboard target/re-entry path.

The manual success signal for OG should remain protected: do not regress Practice Solo OG fresh entry or post-guess playability that already passed manual review.

## Back-To-Top Routing

Stage 47.1 observed back-to-top overlap with the keyboard area in some auto-centered states. This is not classified as the primary cause of keyboard clipping, but Stage 47.3 should include back-to-top overlap avoidance if it can be handled through the same source/test-only mobile keyboard visibility repair.

## Test Boundary

Stage 47.3 should add or update focused tests where practical:

- Vitest coverage for any changed auto-center decision logic.
- Playwright/mobile coverage for Daily GO pre-guess keyboard bottom clearance.
- Playwright/mobile coverage for Practice GO `New go chain`.
- Playwright/mobile coverage for Daily/Practice GO re-entry after a submitted guess.
- If shared repair includes OG re-entry, include a focused OG re-entry non-regression check.

Assertions should verify full keyboard bottom clearance instead of accepting a partial viewport ratio that can pass while the keyboard bottom is clipped.

## Stop Conditions For Stage 47.3

Stage 47.3 must stop and route back to addendum planning if implementation proves a need for:

- broad mobile shell/top-tab/navigation overhaul;
- compact/collapsible side dock implementation;
- broad route-layout or gameplay-layout redesign;
- storage schema changes or destructive cleanup;
- Supabase/RLS, RPC, or deployment/configuration changes;
- session leases, forced sign-out, or one-active-session enforcement;
- gameplay input semantics changes;
- Daily answer/rule changes;
- gameplay-rule changes or Elo changes.

## Addendum Decision

No addendum was created in Stage 47.2.

Potential addendum path remains reserved only if Stage 47.3 cannot satisfy the manual-review keyboard visibility requirement source/test-only:

- `planning/specs/phase-47/PHASE-47-MOBILE-SOLO-LAYOUT-SCALING-ADDENDUM-2026-07-05.md`

## Verification

Passed lightweight Stage 47.2 verification:

- `git diff --check`.
- Progress CSV shape check using `python3 -S`: `rows=429 columns=[12] last_id=427`.
- Non-printing changed/untracked file credential-value scan: `scanned_files=14 credential_value_hits=0 binary_skipped=0`.
- Ignored-artifact check: `tracked_files=1117 staged_files=0 forbidden_artifact_hits=0`.
- Watched-port cleanup check: ports `5173`, `5174`, `3000`, and `4173` clear.
- `git status --short --branch` completed.

## Blockers And Open Questions

No blocker for Stage 47.3 source/test-only implementation.

Open questions for Stage 47.3 implementation:

- Is explicit scroll-position calculation more reliable than `scrollIntoView({ block: 'end' })` for mobile Solo keyboard targets?
- Should the auto-center helper schedule a follow-up correction after layout settles, or should it compute the exact bottom-clearance target once?
- Should back-to-top hide when the keyboard target is in the lower viewport, or is a larger lift enough?
- What bottom gap should the mobile Playwright assertion require to cover real mobile browser chrome safely without overfitting?

## Boundary Confirmation

No source/runtime implementation, test implementation, migrations, storage changes, deployment/configuration, staging, commits, pushes, PRs, merges, releases, branch deletion, backup workflow execution, broad mobile shell/top-tab/navigation work, compact side dock work, gameplay-rule changes, Elo changes, secret/private-data/local-artifact exposure, local Codex skill changes, or stable `brrrdle` repository work was performed.

## Next Gate

The next safe action is Phase 47 Stage 47.3 mobile Solo GO keyboard visibility and re-entry repair, source/test-only.
