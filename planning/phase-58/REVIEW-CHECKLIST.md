# Phase 58 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 58 - GO Solution Diversity And Multiplayer Refresh Readiness.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-12.
**Evidence**: `planning/phase-58/CHANGELOG.md`, `progress/PROGRESS-STEP-549.md`, and `planning/testing/TESTING-SUITE.md`.

This checklist helps the user manually verify Phase 58 behavior. It does not replace automated tests, real two-client E2E, migration/privacy probes, or final verification.

## How To Use

- Use development or hosted review accounts, never production-sensitive credentials or private user data.
- Check an item only after observing the expected behavior.
- If an item fails, stop and record the exact non-secret steps, mode, browser, and visible message. Do not share credentials, raw answers, user IDs, tokens, or private projections.
- Keep Phase 58 open until required items pass or an explicit follow-up records an accepted limitation.

## Must Manually Verify

### Post-Review Follow-Up

- [ ] **Older and fresh unranked Practice matches forfeit durably.**
  - Open an established unranked Practice match that has at least one submitted turn, then forfeit from either participant account. Repeat with the other mode if practical.
  - Expected: the forfeiting player loses, the rival wins, and after refresh the match remains terminal rather than returning to Practice, Overview, Active Games, or Live as active.

- [ ] **A failed durable forfeit does not pretend to succeed.**
  - This conflict path has automated coverage and may be difficult to trigger manually.
  - Expected if encountered: the active durable game is restored and a clear retry message appears; the UI does not leave an unsaved terminal projection on screen.

- [ ] **Selected subtab badges remain readable.**
  - On desktop and mobile, select tabs that show Overview, Active Games, Lobby, Live, or Daily Multiplayer attention badges. Check both a number and Daily `Ready` if that transient state is available.
  - Expected: the selected badge uses an opaque dark background with clearly readable light text; the label does not overflow or distort the tab.

- [ ] **Notification Open collapses the center and preserves routing.**
  - Expand Notifications and choose `Open` on an actionable item.
  - Expected: the center collapses and the exact destination still opens, especially on mobile.

- [ ] **Notification local actions stay expanded.**
  - Try Mark read, Mark all read, and Hide on available items.
  - Expected: each action updates its item as before without collapsing the notification center. Outside click and Escape still collapse it.

### Original Phase 58 Scope

- [ ] **New Solo Practice GO chains are diverse rather than shifted copies.**
  - Start and complete or inspect at least two consecutive five-letter Practice GO chains.
  - Expected: each chain is deterministic once created, contains no repeated solution inside that chain, and the next chain is not merely the prior chain shifted by one position.

- [ ] **GO carry-over mechanics remain unchanged.**
  - Solve the first puzzle of a Practice GO chain and continue.
  - Expected: the solved row carries into the next puzzle, tile/keyboard colors remain correct for the new solution, Hard Mode still applies when enabled, the solved-row hold appears, turns/transitions remain normal, and final definitions still appear.

- [ ] **In-progress and legacy GO games restore their already-selected chain.**
  - Submit a valid guess, navigate away and back, then hard-refresh and re-enter the game.
  - Expected: submitted rows, current puzzle, prior solutions, draft state, and the already-selected answers do not change or regenerate.

- [ ] **Ranked and unranked Practice GO remain shared between two players.**
  - Create one ranked and one unranked Practice GO match with two accounts.
  - Expected: both participants see the same puzzle sequence, turns, solved transitions, prior rows, and completion state.

- [ ] **Private Practice GO remains shared and configurable.**
  - Send and accept a private GO request, enter from both accounts, and submit at least one turn.
  - Expected: the requested settings are preserved, both players see the same chain, and no private/request data is exposed to an unrelated account.

- [ ] **All ten Multiplayer lanes rediscover promptly after same-tab hard refresh.**
  - Spot-check at minimum one OG and one GO game in each category: ranked Practice, unranked Practice, ranked Daily, unranked Daily, and private Practice.
  - On the actual matched participant tab, hard-refresh, confirm Home appears, then enter Multiplayer once.
  - Expected: within about five seconds the exact game appears in Overview, the applicable Practice/Daily tab, Active Games, and Live. No second recovery tab, refocus trick, Back/Forward navigation, or repeated tab cycling should be needed.

- [ ] **Daily claims and ranked authority remain intact.**
  - Create eligible ranked and unranked Daily matches with fresh review accounts.
  - Expected: ranked and unranked claims remain separate, each mode remains once per UTC day, public surfaces remain answerless, and completing or forfeiting follows the existing result/Elo rules.

## Optional Nice-To-Check

- [ ] Repeat one Practice, one Daily, and one private reload check on Firefox or Safari/WebKit.
- [ ] Repeat the reload check with an established account that has several prior Multiplayer games.
- [ ] On or after the `2026-07-14` UTC cutoff, play ranked and unranked Daily GO and confirm both chains are complete, reproducible for the date, and different from one another. Automated TypeScript/SQL parity already covers this contract before the calendar cutoff.
- [ ] Observe ranked Daily GO queue finalization after the cutoff. Report if it exceeds the normal interaction budget; the paired internal parity probe took approximately 17.7 seconds and is recorded for observation.

## Preserved Invariants To Spot-Check

- [ ] Solo OG, Daily OG, Solo cloud persistence, guest/account isolation, and Home-on-refresh behavior remain unchanged.
- [ ] Ranked Practice and ranked Daily queue cancellation, FIFO matching, claims, server-owned settlement, and Elo formulas remain unchanged.
- [ ] Consumables remain available only in Solo Practice and remain excluded from Daily and all Multiplayer.
- [ ] Private request preferences, blocks, anti-spam limits, incoming/outgoing lifecycle, and direct-resume actions remain intact.
- [ ] Authenticated and public spectators remain read-only and privacy-safe.
- [ ] Mobile account controls, scrolling, route loading, and answer-free cold Home behavior remain intact.

## Known Deferred / Not In Scope

- Phase 58 does not redesign the UI, install a design system, change frameworks/dependencies, or begin the frontend rebuild.
- Phase 59 remains the design-direction, concept, `design.md`, stack-decision, and GPT-5.6 SOL handoff phase.
- Phase 60 remains the separately gated frontend rebuild.
- No new gameplay rules, Elo formula, economy rule, social graph, push infrastructure, or spectator expansion is included.

## Evidence

- `planning/phase-58/IMPLEMENTATION-PLAN.md`
- `planning/phase-58/CHANGELOG.md`
- `planning/testing/TESTING-SUITE.md`
- `planning/handoffs/PRE-PHASE-55-FUNCTIONALITY-PRESERVATION-INVENTORY-2026-07-09.md`
- `progress/PROGRESS-STEP-547.md`
- `progress/PROGRESS-STEP-548.md`
- `progress/PROGRESS-STEP-549.md`
- `progress/PROGRESS-STEP-550.md`

## Review Result

- [ ] I completed every required manual item that is currently calendar-available.
- [ ] Any failed item has exact non-secret reproduction steps and a separately governed follow-up before Phase 58 closure.
- [ ] I approve Phase 58 for Final Acceptance after the governed Review Candidate backup and hosted review.
