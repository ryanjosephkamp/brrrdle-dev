# Phase 39 Changelog

**Status**: Ready for manual review.
**Phase**: Mobile Performance And Scroll Smoothness.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 39 improved mobile page scroll smoothness without turning the work into a broad mobile redesign. It rerouted the phase to address user-reported mobile scroll lag, added a deterministic mobile scroll/layout Playwright harness, reduced expensive mobile shell and shared-UI visual effects, tuned the Word Explorer mobile row surface, preserved gameplay and public spectator behavior, and kept compact navigation, Focus Mode, progression HUD, and broader mobile UX overhaul work deferred.

Stage 39.5B repaired the final E2E stability blocker recorded in `progress/PROGRESS-STEP-330.md`; final verification is recorded in `progress/PROGRESS-STEP-331.md`.

## Completed

- Planned and specified Phase 39 as a cohesive mobile performance and scroll smoothness macro-phase under the phase scope sizing guidance.
- Preserved the user-edited `planning/phase-38/REVIEW-CHECKLIST.md`.
- Audited mobile scroll and performance-sensitive areas across app shell, global CSS, shared UI primitives, complex workspaces, and E2E/browser harnesses.
- Confirmed the reported issue was page-level scrolling on complex surfaces rather than gameplay input, Live spectation refresh, tab switching, or browser Back/Forward behavior.
- Added a deterministic mobile scroll/layout regression harness at `e2e/layout/mobile-scroll.spec.ts`.
- Extended Playwright assertions with reusable scroll diagnostics, no-horizontal-overflow checks, vertical scroll checks, bottom/top scroll checks, and fixed/sticky overlay occlusion checks.
- Covered Home, Solo, Calendar, Multiplayer, History, Stats, Leaderboard, Word Explorer, Profile, Settings, and About Brrrdle at a 390x844 mobile viewport.
- Kept diagnostics such as scroll height, scroll width, fixed/sticky/backdrop/shadow counts, and coarse scroll-loop timing as debug evidence rather than brittle FPS thresholds.
- Reduced mobile-only shell visual effect cost by removing backdrop filters and heavy shadows from repeated lunar shell, rail, notification, and countdown surfaces.
- Updated shared `Panel` so heavy blur/shadow treatment starts at `sm` and above, preserving lighter mobile panels.
- Kept the sticky mobile keyboard behavior while replacing mobile keyboard blur with an opaque bordered surface.
- Tuned Word Explorer mobile rows by adding scoped row hooks, applying layout/paint containment, and removing repeated mobile row button shadows.
- Preserved desktop/tablet Word Explorer table behavior, filtering, sorting, pagination, copy, definitions, and request-link behavior.
- Ran final focused regression/browser coverage for the mobile scroll harness, Word Explorer data behavior, browser history, gameplay auto-centering, public/guest Live spectator behavior, and read-only Live spectator E2E.
- Ran local visual handoff review for Phase 39 user-visible mobile scroll and Word Explorer surfaces under `test-results/visual-review/phase-39-stage-39-5/`.
- Added the Phase 39 manual review checklist.
- Repaired final E2E waiting-game join stability by making the multiplayer E2E helper status-aware, keeping Practice waiting joins on the Lobby action path, preserving Daily selected-game joins, and adding one stale-projection reload recovery for test setup.

## Preserved

- Phase 38 public/guest Practice Live discovery and read-only spectation.
- Current Daily Multiplayer exclusion from public/guest spectator discovery.
- Phase 37 browser history, stale selected-game fallbacks, gameplay auto-centering, and solo invalid-guess sound behavior.
- Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior.
- Phase 35 Profile/auth behavior, ranked Live identity repair, authenticated spectator safe-name support, auth redirect hardening, password-change access, and email-change configuration gate documentation.
- Phase 34 Live/Lobby/notification behavior and Active Games turn cues.
- Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections.
- Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections.
- Phase 31 Practice-safe postgame behavior and Daily exclusions.
- Phase 30 public leaderboard display-only authority and privacy boundaries.
- Phase 29 public profile default-private and moderation boundaries.
- Phase 28 authenticated Live read-only spectator behavior.
- Phase 27 trusted ranked Practice foundations.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, and five-letter invariants.
- Existing gameplay rules, word validation, Hard Mode validation, scoring, timeout, forfeit, rating/Elo formula, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior.

## Deferred

- Broad mobile UX overhaul.
- Compact navigation and collapsible shell navigation.
- Focus Mode.
- EXP, coin, collectible, or progression HUD counters.
- Public/social profile browsing, clickable rival profiles, direct player match requests, private matchmaking expansion, custom-code invitation expansion, and request/mailbox flows.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public site stats, private developer dashboard, onboarding, help, and tutorial UX.
- Theme modernization and full concrete theme work.
- Service workers, push subscriptions, background push, production deployment, and release.
- Gameplay-rule changes and Elo algorithm changes.

## Verification

Stage 39.5 verification and the initial blocker are recorded in `progress/PROGRESS-STEP-330.md`. Stage 39.5B final verification is recorded in `progress/PROGRESS-STEP-331.md`; the final gate passed cleanly after the narrow E2E stability repair.
