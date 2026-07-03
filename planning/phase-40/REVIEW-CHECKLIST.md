# Phase 40 Manual Review Checklist

**Status**: Ready for manual review.
**Phase**: Phase 40 - Public Profiles And Private Matchmaking.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-01.
**Evidence**: `planning/phase-40/CHANGELOG.md`, `progress/PROGRESS-STEP-346.md`, and local-only visual manifest `test-results/visual-review/phase-40-stage-40-6/manifest.md` when present.

This checklist supports manual user review after the Phase 40 final verification gate. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment.
- Do not paste or record secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, tokens, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Must Manually Verify

- [x] Browser Back/Forward and gameplay auto-centering still behave as expected.
  - Expected: route/tab/subtab and selected-game history state remains safe, and entering/resuming gameplay still scrolls/focuses the gameplay area where appropriate without replaying moves or mutating state.
  - Suggested steps: navigate between public profiles, Multiplayer subtabs, and an eligible selected game; use browser Back/Forward; confirm state changes are coherent.
  - Evidence: Phase 37 evidence in `progress/PROGRESS-STEP-309.md`; Phase 40 route/history evidence in `progress/PROGRESS-STEP-339.md`; `progress/PROGRESS-STEP-346.md`.
- [x] Mobile scroll smoothness and Word Explorer tuning from Phase 39 still feel intact.
  - Expected: Home, Multiplayer, Settings, and Word Explorer scroll smoothly on mobile; Word Explorer mobile rows remain readable and usable without horizontal overflow.
  - Suggested steps: use a narrow/mobile viewport or real mobile device, scroll the representative surfaces, and spot-check Word Explorer row actions.
  - Evidence: `progress/PROGRESS-STEP-327.md`; `progress/PROGRESS-STEP-328.md`; `progress/PROGRESS-STEP-329.md`; `progress/PROGRESS-STEP-346.md`.

- [x] Public/guest Live spectation still works read-only.
  - Expected: signed-out or guest viewers can still see eligible public Practice Live rows and focused spectator details, with no join/resume/submit/forfeit/mutation actions exposed.
  - Suggested steps: with a safe eligible Practice Live game available, open Multiplayer -> Live as a signed-out or guest viewer and inspect the list/detail path.
  - Evidence: `progress/PROGRESS-STEP-318.md`; `progress/PROGRESS-STEP-346.md`.

- [x] Private matchmaking remains Practice-only, unranked-only, and authenticated-only.
  - Expected: no Daily, ranked, rating, ranked queue, public/guest spectator, custom-code lobby, gameplay-rule, or Elo behavior changes are visible through the private request flow.
  - Suggested steps: inspect request copy/settings, Daily Multiplayer entry points, ranked queue/search-again behavior, and public/guest spectator views after a private match flow.
  - Evidence: `planning/specs/phase-40/PHASE-40-PRIVATE-MATCHMAKING-MIGRATION-RLS-ADDENDUM-2026-07-01.md`; `planning/specs/phase-40/PHASE-40-PRIVATE-MATCHMAKING-ACCEPT-CONTRACT-REPAIR-ADDENDUM-2026-07-01.md`; `progress/PROGRESS-STEP-346.md`.

- [x] Accepting a private Practice request opens the created game for both participants.
  - Expected: the opponent can accept the request, the app opens or selects the returned created game, and the requester can load/open the same participant-owned game from Practice Multiplayer.
  - Suggested steps: accept a safe private request as the opponent, confirm the selected game is playing, then resume/open the created game as the requester.
  - Evidence: `progress/PROGRESS-STEP-344.md`; `progress/PROGRESS-STEP-345.md`; `progress/PROGRESS-STEP-346.md`.
  - **NOTE: Accepting a private Practice request opens the game correctly for the player who accepts the request, and technically the game is created for the first player, but the first player (the requester) isn’t taken to the Practice Multiplayer page to play the game, nor is the first player given buttons to conveniently click to be taken to that game. Please see my prompt about bugfixes for more details. I’m going to mark this as complete because the new game does indeed open for both players, but the routing still needs improvement. Thanks!**

- [x] Practice Multiplayer shows private incoming/outgoing requests safely.
  - Expected: incoming requests identify the requester by safe public display fields and expose only opponent-owned `Accept private match` and `Decline` actions; outgoing requests expose only requester-owned `Cancel request`.
  - Suggested steps: create a safe private Practice request between two test accounts, open Multiplayer -> Practice Multiplayer as both users, and inspect incoming/outgoing request panels.
  - Evidence: `progress/PROGRESS-STEP-345.md`; `progress/PROGRESS-STEP-346.md`.
  - **NOTE: These things are being *shown* properly, but there may be some issues with our implementation. Please see my prompt about the bugfixes. Thanks!**

- [x] Public profile private Practice request action is authenticated-only and safe.
  - Expected: authenticated users viewing another active public profile can request an unranked 5-letter OG Practice match; signed-out or unconfigured contexts do not expose a usable request action.
  - Suggested steps: sign in with a safe test account, open another active public profile, send a private Practice request, then review the outgoing state.
  - Evidence: `progress/PROGRESS-STEP-345.md`; `progress/PROGRESS-STEP-346.md`.

- [x] Clickable public identity appears only where approved public profile IDs exist.
  - Expected: leaderboard rows with safe `publicProfileId` values can open public profiles; surfaces without approved public profile IDs keep non-clickable safe labels.
  - Suggested steps: inspect public ranked leaderboard identity rows and at least one multiplayer/spectator surface that lacks clickable public profile IDs.
  - Evidence: `progress/PROGRESS-STEP-339.md`; `progress/PROGRESS-STEP-341.md`; `progress/PROGRESS-STEP-346.md`.
  - **NOTE: This is working as intended, but eventually, I will want the players to be able to click on public profile names *from anywhere that they’re shown on the site* and have that open the public profile content for the corresponding player.**

- [x] Public profile route opens only safe public profile content.
  - Expected: public profile pages show active public display fields only, use unavailable fallbacks for private/hidden/suspended/missing profiles, and do not expose raw auth IDs, emails, private profile fields, sessions, tokens, or local artifacts.
  - Suggested steps: open a clickable public profile from an approved surface such as the public ranked leaderboard; inspect the profile card and fallback behavior if a profile is unavailable.
  - Evidence: `progress/PROGRESS-STEP-339.md`; `progress/PROGRESS-STEP-341.md`; `progress/PROGRESS-STEP-346.md`.

- [x] Phase 40 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-40-stage-40-6/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-40-stage-40-6/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `progress/PROGRESS-STEP-346.md`.


## Optional Nice-To-Check

- [ ] Try cancelling an outgoing private request.
  - Expected: requester-owned pending requests can be cancelled and disappear from the active request list.
  - **NOTE: These do not disappear from the active request list! This check does not pass :(**
- [ ] Try declining an incoming private request.
  - Expected: opponent-owned pending requests can be declined and disappear from the active request list.
  - **NOTE: These do not disappear from the active request list! This check does not pass :(**
- [x] Spot-check desktop and mobile layouts for the public profile page and Practice Multiplayer private request panel.
  - Expected: text fits, controls remain reachable, and no private request UI overlaps or overflows.
- [x] Review Phase 40 visual screenshots if the local artifact directory is available.
  - Expected: each screenshot in `test-results/visual-review/phase-40-stage-40-6/manifest.md` visually matches its scenario description.

## Preserved Invariants To Spot-Check

- [ ] Phase 38 public/guest Practice Live discovery, read-only public spectation, Daily spectator exclusion, and false-only mutation boundaries remain intact.
  - **NOTE: I’m not sure if this is completely true; please see my bugfix prompt details. Thanks!**
- [ ] Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections remain intact.
  - **NOTE: I’m not sure if this is completely true; please see my bugfix prompt details. Thanks!**
- [ ] Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections remain intact.
  - **NOTE: I’m not sure if this is completely true; please see my bugfix prompt details. Thanks!**
- [x] Phase 37 browser history, stale selected-game fallbacks, gameplay auto-centering, and solo invalid-guess sound behavior remain intact.
- [x] Phase 35 Profile/auth behavior, ranked Live identity repair, authenticated spectator safe-name support, auth redirect hardening, password-change access, and email-change configuration gate documentation remain intact.
- [x] Phase 34 Live/Lobby/notification behavior and Active Games turn cues remain intact.
- [x] Phase 31 postgame boundaries remain intact: direct rematches and private requests are Practice-only and do not bypass ranked queue or Daily claim rules.
- [x] Phase 30 public leaderboards remain display-only and non-authoritative.
- [x] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [x] Phase 28 authenticated Live spectator behavior remains read-only.
- [x] Phase 27 ranked Practice still uses trusted queue/finalization/settlement paths.
- [x] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, five-letter only, and excluded from public/guest spectator discovery.
- [x] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.
- [x] Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior remain intact.
- [x] Phase 39 mobile scroll smoothness, mobile scroll/layout harness, and Word Explorer tuning remain intact.

## Known Deferred / Not In Scope

- Ranked private invitations, ranked direct challenges, Daily match requests, and Daily custom invitations.
- Public site stats, private developer dashboard, onboarding, help, and tutorial UX.
- EXP, coin, collectible, or progression HUD counters.
- Focus Mode, compact navigation, and broader mobile UX shell overhaul.
- Theme proposal modernization and full concrete theme work.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Service workers, push subscriptions, background push, production deployment, and release.
- Gameplay-rule changes and Elo algorithm changes.

## Evidence

- `planning/phase-40/PLANNING-BRIEF.md`
- `planning/specs/phase-40/PHASE-40-PUBLIC-PROFILES-AND-PRIVATE-MATCHMAKING-SPEC-2026-07-01.md`
- `planning/specs/phase-40/PHASE-40-PRIVATE-MATCHMAKING-MIGRATION-RLS-ADDENDUM-2026-07-01.md`
- `planning/specs/phase-40/PHASE-40-PRIVATE-MATCHMAKING-ACCEPT-CONTRACT-REPAIR-ADDENDUM-2026-07-01.md`
- `planning/phase-40/IMPLEMENTATION-PLAN.md`
- `planning/phase-40/CHANGELOG.md`
- `progress/PROGRESS-STEP-332.md` through `progress/PROGRESS-STEP-346.md`
- `e2e/gameplay/private-matchmaking.spec.ts`
- `test-results/visual-review/phase-40-stage-40-6/manifest.md` when present locally.

## Review Result
- [x] Any failed item has a follow-up prompt prepared before Phase 40 Git handoff or additional implementation.

- [x] Manual review complete.
