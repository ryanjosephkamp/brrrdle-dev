# Progress Step 426 - Phase 47 Stage 47.1 Mobile Solo GO Keyboard/Viewport Audit

**Status:** Completed - Awaiting User Review Before Stage 47.2
**Phase:** Phase 47 - Mobile Solo GO Visibility and Account Display Boundaries
**Stage:** Stage 47.1 - Mobile Solo GO Keyboard/Viewport Audit and Reproduction
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-05T22:45:30Z
**Completed:** 2026-07-05T22:54:04Z

## Authorization

The user authorized Phase 47 Stage 47.1 only: read-only mobile Solo GO keyboard/viewport audit and reproduction using the completed Stage 47.0 protected baseline.

Authorized work included reading Phase 47 planning/spec/implementation materials and Stage 47.0 progress, inspecting mobile Solo keyboard/viewport source and tests read-only, running focused read-only browser/resource checks with one local dev server, creating this Stage 47.1 progress report and the matching 12-column CSV row, and deciding the safest Stage 47.2 path.

This pass did not authorize source/runtime fixes, test implementation, Supabase migration creation or execution, storage changes, deployment/configuration, Git/GitHub actions, backup workflow execution, gameplay-rule changes, Elo changes, secret/private-data/local-artifact exposure, local Codex skill changes, or original stable repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed repository basename: `brrrdle-dev`.
- Confirmed branch: `main`.
- Confirmed `HEAD`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- Confirmed `origin/main`: `77a696738afcac1c212b45c94e155a3c6ae1246f`.
- Confirmed remote: `https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved `planning/phase-46/REVIEW-CHECKLIST.md`.

## Read-Only Inputs Reviewed

- `progress/PROGRESS-STEP-425.md`.
- `planning/phase-47/PLANNING-BRIEF.md`.
- `planning/specs/phase-47/PHASE-47-MOBILE-SOLO-GO-VISIBILITY-AND-ACCOUNT-DISPLAY-BOUNDARY-SPEC-2026-07-05.md`.
- `planning/phase-47/IMPLEMENTATION-PLAN.md`.
- `planning/phase-46/REVIEW-CHECKLIST.md`.
- `src/app/gameplayAutoCenter.ts`.
- `src/app/games/soloGameplayAutoCenter.ts`.
- `src/app/games/GoGame.tsx`.
- `src/app/games/OgGame.tsx`.
- `src/solo/SoloWorkspace.tsx`.
- `src/index.css`.
- `e2e/layout/mobile-scroll.spec.ts`.
- Related focused helpers and tests for mobile scrolling, game actions, and back-to-top behavior.

## Audit Findings

The current mobile Solo keyboard auto-center path uses `scrollIntoView({ block: 'end' })` on the `solo-keyboard` target for mobile viewports. Fresh playable Solo games call the mobile-only fresh keyboard scheduler when `submittedGuessCount === 0`; post-guess auto-center runs when the submitted-guess count increases.

Likely issue areas identified:

- The existing Playwright assertion for Daily Solo GO pre-guess keyboard visibility accepts `toBeInViewport({ ratio: 0.9 })`, which can pass while the keyboard bottom is still clipped.
- A submitted-guess state can scroll farther than a fresh or re-entry state, so the current tests do not cover the exact manual-review failure shape.
- Re-entry into an already-started Solo game with `submittedGuessCount > 0` does not have a dedicated re-entry auto-center trigger. The fresh auto-center skips and the submitted-count hook does not fire unless another valid guess is made.
- GO has more vertical content before the board and keyboard than OG because of the puzzle-progress grid and GO practice controls. This increases the chance that small target timing/scroll-boundary errors are user-visible.
- The back-to-top button can overlap the keyboard area in the probed auto-centered states. It does not appear to be the root cause of clipping, but Stage 47.2 should include it in the repair boundary.

## Browser Reproduction And Characterization

Used one local Vite dev server on `127.0.0.1:5173`, then stopped it. Ran a custom read-only Playwright Chromium mobile probe at `390x844`, `isMobile: true`, `hasTouch: true`, `deviceScaleFactor: 3`, without saving screenshots or traces.

Observed metrics:

- Daily Solo GO fresh pre-guess: keyboard bottom stabilized at `853px` in an `844px` viewport; bottom gap `-9px`; clipped bottom `true`.
- Daily Solo GO after first submitted guess: keyboard bottom `800px`; bottom gap `44px`; clipped bottom `false`.
- Daily Solo GO re-entry after a submitted guess: keyboard bottom `853px`; bottom gap `-9px`; clipped bottom `true`.
- Practice Solo GO fresh mode entry: keyboard bottom `853px`; bottom gap `-9px`; clipped bottom `true`.
- Practice Solo GO `New go chain` click: keyboard bottom `1635px`; bottom gap `-791px`; clipped bottom `true`; keyboard was effectively below the viewport.
- Practice Solo GO after first submitted guess: keyboard bottom `800px`; bottom gap `44px`; clipped bottom `false`.
- Practice Solo GO re-entry after a submitted guess: keyboard bottom `853px`; bottom gap `-9px`; clipped bottom `true`.
- Practice Solo OG re-entry after a submitted guess in the same emulation probe: keyboard bottom `853px`; bottom gap `-9px`; clipped bottom `true`.

A longer-settle Daily Solo GO check showed the `-9px` bottom gap remained after `5000ms`, so the issue is not simply smooth-scroll settling time.

For comparison, the existing focused Playwright tests passed:

- `Solo Practice OG keeps submitted-row context and keyboard visible after the first valid guess`.
- `Solo Practice OG keeps the keyboard visible before the first valid guess`.
- `Solo Daily GO keeps the keyboard visible before the first valid guess`.

This confirms the automated check is currently too permissive for the manual-review requirement because ratio-based visibility can pass even when the keyboard bottom is clipped.

## Classification

The Phase 47.1 evidence supports a source-only Stage 47.2 decisioning pass rather than immediate broader mobile layout/scaling addendum planning.

Most likely root causes are bounded to:

- mobile keyboard target selection and bottom-clearance math;
- missing or insufficient re-entry auto-center scheduling for already-started Solo sessions;
- Practice GO `New go chain` remount/seed-change timing;
- mobile CSS scroll margin, sticky keyboard, safe-area, and viewport-bottom coordination;
- current E2E visibility thresholds being too weak for "full keyboard visible" requirements.

Broader mobile gameplay scaling remains a real follow-up concern, but Stage 47.1 evidence does not yet prove that a broad mobile shell, compact side dock, route-layout redesign, storage contract, Supabase/RLS change, gameplay-rule change, or Elo change is required for the immediate GO keyboard fix.

## Stage 47.2 Path

Recommended next gate: Phase 47 Stage 47.2 source-only versus broader mobile layout decision.

Stage 47.2 should remain documentation/planning-only and should define the exact Stage 47.3 source/test repair boundary if source-only remains safe:

- require full keyboard bottom clearance, not only a viewport ratio;
- add or choose a re-entry auto-center trigger for active Daily/Practice Solo GO after submitted guesses;
- account for Practice GO `New go chain` remount/seed-change timing;
- decide whether the same bounded repair should also cover OG re-entry because the emulation probe showed a shared bottom-clearance risk;
- include back-to-top overlap avoidance in the repair boundary;
- strengthen focused mobile Playwright assertions so bottom clipping fails.

No broader mobile layout/scaling addendum is required yet, but Stage 47.2 should stop and create one if it concludes the source-only path cannot guarantee full keyboard visibility without broad shell or gameplay layout work.

## Resource And Process Observations

- Watched ports `5173`, `5174`, `3000`, and `4173`: clear before browser checks.
- One Vite dev server was started on `127.0.0.1:5173` for the audit probes.
- The Vite dev server was stopped after browser checks.
- Watched ports `5173`, `5174`, `3000`, and `4173`: clear after stopping the dev server.
- Browser checks created or reused ignored local Playwright output under `test-results/`; no screenshots, videos, traces, or local session artifacts were reported or exposed.

## Verification

Passed lightweight Stage 47.1 verification:

- `git diff --check`.
- Progress CSV shape check using `python3 -S`: `rows=428 columns=[12] last_id=426`.
- Non-printing changed/untracked file credential-value scan: `scanned_files=13 credential_value_hits=0 binary_skipped=0`.
- Ignored-artifact check: `tracked_files=1117 staged_files=0 forbidden_artifact_hits=0`.
- Watched-port cleanup check: ports `5173`, `5174`, `3000`, and `4173` clear.
- `git status --short --branch` completed.

## Blockers And Open Questions

No blocker for Stage 47.2 documentation decisioning.

Open questions for Stage 47.2:

- Should Stage 47.3 repair all Solo mobile keyboard bottom-clearance risk, including OG re-entry, or restrict implementation to the GO flows that failed manual review?
- Should the repair prefer explicit scroll-position computation over `scrollIntoView({ block: 'end' })` for mobile Solo keyboard targets?
- Should the back-to-top control hide or move farther away whenever the Solo keyboard is visible on mobile?
- What is the minimum browser/E2E assertion that reliably fails when the keyboard bottom is clipped on real mobile and Playwright mobile emulation?

## Boundary Confirmation

No source/runtime implementation, test implementation, migrations, storage changes, deployment/configuration, staging, commits, pushes, PRs, merges, releases, branch deletion, backup workflow execution, gameplay-rule changes, Elo changes, secret/private-data/local-artifact exposure, local Codex skill changes, or stable `brrrdle` repository work was performed.

## Next Gate

The next safe action is Phase 47 Stage 47.2 source-only versus broader mobile layout decision only.
