# Phase 41 Manual Review Checklist

**Status**: Manual review completed with one Phase 42 follow-up.
**Phase**: Phase 41 - Multiplayer Reliability And Real E2E Hardening.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-02.
**Evidence**: `planning/phase-41/CHANGELOG.md`, `progress/PROGRESS-STEP-358.md`, and local-only visual manifest `test-results/visual-review/phase-41-stage-41-7/manifest.md` when present.

This checklist supports manual user review after the Phase 41 final verification gate. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment.
- Do not paste or record secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, tokens, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Codex-Assisted Preflight Summary

Automated proof completed:

- Focused Vitest regression set: 11 files, 130 tests.
- Focused Playwright regression set: 20/20.
- `npm run lint`.
- `npm run test`: 111 files, 783 tests.
- `npm run test:e2e`: 33/33.
- `npm run test:full`: 783 Vitest tests plus 33 Playwright tests.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.
- Repository hygiene checks recorded in `progress/PROGRESS-STEP-358.md`.

Codex-attempted visual/browser review:

- Local-only visual captures under `test-results/visual-review/phase-41-stage-41-7/`.
- Captured desktop/mobile Multiplayer, Leaderboard, and Word Explorer surfaces without horizontal overflow or console warnings/errors in the recorded diagnostics.

Codex intentionally did not verify:

- Production deployment or release behavior.
- Real user private data or real user accounts.
- Screenshots from signed-in private request temporary users, to avoid storing private/auth artifacts.
- Vercel/Supabase configuration changes.
- Spectator presence/count/list behavior, service workers, push subscriptions, gameplay-rule changes, or Elo algorithm changes.

User manual review was completed visually on mobile on 2026-07-03. The user reported that virtually every prior bug was fixed and that only the ranked Practice queue button/status flashing item did not pass. That remaining issue is minor/cosmetic, does not appear to interrupt gameplay flow, and is routed into Phase 42 planning rather than a separate emergency bugfix phase.

## Must Manually Verify

- [x] Ranked Practice search-again reliably creates and opens the next game.
  - Expected: after a terminal ranked Practice game, both participants can use `Search ranked Practice again`; a fresh ranked game is created through the trusted queue path, and both players see safe opponent names.
  - Suggested steps: complete a safe ranked Practice OG game between two test accounts, use search-again on both clients, and confirm both clients open the fresh game.
  - Evidence: `progress/PROGRESS-STEP-354.md`; `progress/PROGRESS-STEP-358.md`.

- [x] Cancelled ranked queue participation does not later match stale entries.
  - Expected: a cancelled ranked queue request is not reused for later matching, including when a third signed-in player enters the same queue.
  - Suggested steps: use safe test accounts to create/cancel a ranked queue request, then queue other compatible accounts and confirm the cancelled entry is not matched.
  - Evidence: `progress/PROGRESS-STEP-353.md`; `progress/PROGRESS-STEP-354.md`; `progress/PROGRESS-STEP-358.md`.

- [ ] Ranked queue status/buttons are stable and understandable.
  - Expected: queue status copy does not flicker misleadingly between queued, working, and action states during normal refresh, cancellation, or search-again.
  - Suggested steps: enter, refresh, cancel, and re-enter ranked Practice matchmaking while watching visible status and button states.
  - Manual review result: did not pass on mobile. When a player opens a ranked Practice multiplayer queue, the Practice Multiplayer subtab buttons still flash roughly every five seconds. This appears cosmetic/minor and does not appear to interrupt gameplay flow, so it should be folded into Phase 42 planning unless planning discovers a broader reliability issue.
  - Evidence: `progress/PROGRESS-STEP-354.md`; `progress/PROGRESS-STEP-358.md`.

- [x] Public ranked leaderboard refreshes after a trusted ranked Practice result.
  - Expected: newly eligible rated players appear consistently after trusted settlement, subject to active public profile and visibility rules.
  - Suggested steps: complete a safe ranked Practice game between two public test profiles, open the Leaderboard route, and confirm refreshed public leaderboard behavior.
  - Evidence: `progress/PROGRESS-STEP-355.md`; `progress/PROGRESS-STEP-358.md`.

- [x] Private Practice request cancel/decline lifecycle cleans active lists.
  - Expected: outgoing cancelled requests and incoming declined requests disappear from active request lists after route re-entry or refresh.
  - Suggested steps: create a private Practice request between two test accounts, cancel as requester, decline as opponent in a second run, and confirm active lists update.
  - Evidence: `progress/PROGRESS-STEP-356.md`; `progress/PROGRESS-STEP-357.md`; `progress/PROGRESS-STEP-358.md`.

- [x] Private Practice request accept flow gives requester a safe open/resume path.
  - Expected: when the opponent accepts a private Practice request, the requester can safely open or resume the created participant-owned game without manual database inspection or stale selected-game confusion.
  - Suggested steps: create and accept a private Practice request between two safe accounts, then review the requester side in Multiplayer -> Practice and Active Games.
  - Evidence: `progress/PROGRESS-STEP-356.md`; `progress/PROGRESS-STEP-358.md`.

- [x] Mobile Practice Multiplayer freshness is improved.
  - Expected: on mobile, Practice Multiplayer lobby/request/list state refreshes on route re-entry, browser focus, and visibility changes without needing a hard reload for normal user flows.
  - Suggested steps: use a mobile viewport or real mobile device, perform private request cancel/decline and route away/back to Multiplayer -> Practice, then confirm lists are fresh.
  - Evidence: `progress/PROGRESS-STEP-357.md`; `progress/PROGRESS-STEP-358.md`.

- [x] Public/guest Live spectation still works read-only.
  - Expected: signed-out or guest viewers can still see eligible public Practice Live rows and focused spectator details, with no join/resume/submit/forfeit/mutation actions exposed.
  - Suggested steps: with a safe eligible Practice Live game available, open Multiplayer -> Live as a signed-out or guest viewer and inspect the list/detail path.
  - Evidence: `progress/PROGRESS-STEP-318.md`; `progress/PROGRESS-STEP-358.md`.

- [x] Phase 39 mobile scroll smoothness still feels intact.
  - Expected: Home, Multiplayer, Leaderboard, Settings, and Word Explorer scroll smoothly on mobile; no horizontal overflow or obvious overlap appears.
  - Suggested steps: use a narrow/mobile viewport or real mobile device, scroll representative surfaces, and spot-check Word Explorer row actions.
  - Evidence: `progress/PROGRESS-STEP-327.md`; `progress/PROGRESS-STEP-328.md`; `progress/PROGRESS-STEP-329.md`; `progress/PROGRESS-STEP-358.md`.

- [x] Phase 41 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-41-stage-41-7/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-41-stage-41-7/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `test-results/visual-review/phase-41-stage-41-7/manifest.md`; `progress/PROGRESS-STEP-358.md`.

## Optional Nice-To-Check

- [x] Try a ranked Practice queue cancellation followed by immediate re-entry on the same account.
  - Expected: the app uses the current queue request and does not surface stale cancelled state.

- [x] Try a private request cancel or decline on a mobile browser after backgrounding and refocusing the tab.
  - Expected: route/focus/visibility refresh updates the request list without exposing private fields.

- [x] Spot-check desktop and mobile layouts for Multiplayer -> Practice, Multiplayer -> Lobby, and Leaderboard.
  - Expected: text fits, controls remain reachable, and no UI overlaps or overflows.

- [x] Review Phase 41 visual screenshots if the local artifact directory is available.
  - Expected: each screenshot in `test-results/visual-review/phase-41-stage-41-7/manifest.md` visually matches its scenario description.

## Preserved Invariants To Spot-Check

- [x] Phase 40 public profile route/card, clickable safe identity, and private matchmaking boundaries remain intact.
- [x] Phase 38 public/guest Practice Live discovery, read-only public spectation, Daily spectator exclusion, and false-only mutation boundaries remain intact.
- [x] Phase 37 browser history, stale selected-game fallbacks, gameplay auto-centering, and solo invalid-guess sound behavior remain intact.
- [x] Phase 36 Leaderboard/Stats split, Active Games safe names, Settings cleanup, and password-copy behavior remain intact.
- [x] Phase 35 Profile/auth behavior, ranked Live identity repair, authenticated spectator safe-name support, auth redirect hardening, password-change access, and email-change configuration gate documentation remain intact.
- [x] Phase 34 Live/Lobby/notification behavior and Active Games turn cues remain intact.
- [x] Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections remain intact.
- [x] Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections remain intact.
- [x] Phase 31 postgame boundaries remain intact: direct rematches and private requests are Practice-only and do not bypass ranked queue or Daily claim rules.
- [x] Phase 30 public leaderboards remain display-only and non-authoritative.
- [x] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [x] Phase 28 authenticated Live spectator behavior remains read-only.
- [x] Phase 27 ranked Practice still uses trusted queue/finalization/settlement paths.
- [x] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, five-letter only, and excluded from public/guest spectator discovery.
- [x] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.

## Known Deferred / Not In Scope

- Public site stats, private developer dashboard, onboarding, help, and tutorial UX.
- EXP, coin, collectible, or progression HUD counters.
- Focus Mode, compact navigation, and broader mobile UX shell overhaul.
- Theme proposal modernization and full concrete theme work.
- Full mailbox or notification-center redesign.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Ranked private invitations, ranked direct challenges, Daily match requests, and Daily custom invitations.
- Service workers, push subscriptions, background push, production deployment, and release.
- Gameplay-rule changes and Elo algorithm changes.

## Evidence

- `planning/phase-41/PLANNING-BRIEF.md`
- `planning/phase-41/MULTIPLAYER-RELIABILITY-AND-REAL-E2E-STRATEGY.md`
- `planning/specs/phase-41/PHASE-41-MULTIPLAYER-RELIABILITY-AND-REAL-E2E-SPEC-2026-07-02.md`
- `planning/phase-41/IMPLEMENTATION-PLAN.md`
- `planning/phase-41/CHANGELOG.md`
- `progress/PROGRESS-STEP-347.md` through `progress/PROGRESS-STEP-358.md`
- `e2e/gameplay/multiplayer-reliability.spec.ts`
- `test-results/visual-review/phase-41-stage-41-7/manifest.md` when present locally.

## Review Result

- [x] Any failed item has a follow-up prompt prepared before Phase 42 planning or additional implementation.
- [x] Manual review complete.
