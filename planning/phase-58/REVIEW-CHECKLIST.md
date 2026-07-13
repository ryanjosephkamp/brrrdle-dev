# Phase 58 Manual Review Checklist

**Status**: Completed and accepted by the user on 2026-07-13.
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

- [x] **Older and fresh unranked Practice matches forfeit durably.**
  - Open an established unranked Practice match that has at least one submitted turn, then forfeit from either participant account. Repeat with the other mode if practical.
  - Expected: the forfeiting player loses, the rival wins, and after refresh the match remains terminal rather than returning to Practice, Overview, Active Games, or Live as active.

- [x] **A failed durable forfeit does not pretend to succeed.**
  - This conflict path has automated coverage and may be difficult to trigger manually.
  - Expected if encountered: the active durable game is restored and a clear retry message appears; the UI does not leave an unsaved terminal projection on screen.

- [x] **Selected subtab badges remain readable.**
  - On desktop and mobile, select tabs that show Overview, Active Games, Lobby, Live, or Daily Multiplayer attention badges. Check both a number and Daily `Ready` if that transient state is available.
  - Expected: the selected badge uses an opaque dark background with clearly readable light text; the label does not overflow or distort the tab.

- [x] **Notification Open collapses the center and preserves routing.**
  - Expand Notifications and choose `Open` on an actionable item.
  - Expected: the center collapses and the exact destination still opens, especially on mobile.

- [x] **Notification local actions stay expanded.**
  - Try Mark read, Mark all read, and Hide on available items.
  - Expected: each action updates its item as before without collapsing the notification center. Outside click and Escape still collapse it.

### Original Phase 58 Scope

- [x] **New Solo Practice GO chains are diverse rather than shifted copies.**
  - Start and complete or inspect at least two consecutive five-letter Practice GO chains.
  - Expected: each chain is deterministic once created, contains no repeated solution inside that chain, and the next chain is not merely the prior chain shifted by one position.

- [x] **GO carry-over mechanics remain unchanged.**
  - Solve the first puzzle of a Practice GO chain and continue.
  - Expected: the solved row carries into the next puzzle, tile/keyboard colors remain correct for the new solution, Hard Mode still applies when enabled, the solved-row hold appears, turns/transitions remain normal, and final definitions still appear.

- [x] **In-progress and legacy GO games restore their already-selected chain.**
  - Submit a valid guess, navigate away and back, then hard-refresh and re-enter the game.
  - Expected: submitted rows, current puzzle, prior solutions, draft state, and the already-selected answers do not change or regenerate.

- [x] **Ranked and unranked Practice GO remain shared between two players.**
  - Create one ranked and one unranked Practice GO match with two accounts.
  - Expected: both participants see the same puzzle sequence, turns, solved transitions, prior rows, and completion state.

- [x] **Private Practice GO remains shared and configurable.**
  - Send and accept a private GO request, enter from both accounts, and submit at least one turn.
  - Expected: the requested settings are preserved, both players see the same chain, and no private/request data is exposed to an unrelated account.

- [x] **All ten Multiplayer lanes rediscover promptly after same-tab hard refresh.**
  - Spot-check at minimum one OG and one GO game in each category: ranked Practice, unranked Practice, ranked Daily, unranked Daily, and private Practice.
  - On the actual matched participant tab, hard-refresh, confirm Home appears, then enter Multiplayer once.
  - Expected: within about five seconds the exact game appears in Overview, the applicable Practice/Daily tab, Active Games, and Live. No second recovery tab, refocus trick, Back/Forward navigation, or repeated tab cycling should be needed.

- [x] **Daily claims and ranked authority remain intact.**
  - Create eligible ranked and unranked Daily matches with fresh review accounts.
  - Expected: ranked and unranked claims remain separate, each mode remains once per UTC day, public surfaces remain answerless, and completing or forfeiting follows the existing result/Elo rules.

## Optional Nice-To-Check

- [x] Repeat one Practice, one Daily, and one private reload check on Firefox or Safari/WebKit.
- [x] Repeat the reload check with an established account that has several prior Multiplayer games.
- [ ] On or after the `2026-07-14` UTC cutoff, play ranked and unranked Daily GO and confirm both chains are complete, reproducible for the date, and different from one another. Automated TypeScript/SQL parity already covers this contract before the calendar cutoff.
- [ ] Observe ranked Daily GO queue finalization after the cutoff. Report if it exceeds the normal interaction budget; the paired internal parity probe took approximately 17.7 seconds and is recorded for observation.

The two unchecked items are optional and calendar-gated after the acceptance date. Their pre-cutoff contracts passed automated TypeScript/SQL parity and do not block Phase 58 closure.

## Preserved Invariants To Spot-Check

- [x] Solo OG, Daily OG, Solo cloud persistence, guest/account isolation, and Home-on-refresh behavior remain unchanged.
- [x] Ranked Practice and ranked Daily queue cancellation, FIFO matching, claims, server-owned settlement, and Elo formulas remain unchanged.
- [x] Consumables remain available only in Solo Practice and remain excluded from Daily and all Multiplayer.
- [x] Private request preferences, blocks, anti-spam limits, incoming/outgoing lifecycle, and direct-resume actions remain intact.
- [x] Authenticated and public spectators remain read-only and privacy-safe.
- [x] Mobile account controls, scrolling, route loading, and answer-free cold Home behavior remain intact.

## Known Deferred / Not In Scope

- Phase 58 does not redesign the UI, install a design system, change frameworks/dependencies, or begin the frontend rebuild.
- Design-direction, concept, `design.md`, stack-decision, and frontend transformation work is transferred to the separate Awordle successor repository after clone parity.
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

- [x] I completed every required manual item that is currently calendar-available.
- [x] No failed required item remains; the two unchecked optional observations are calendar-gated until after the acceptance date.
- [x] I approve Phase 58 for Final Acceptance after the governed Review Candidate backup and hosted review.

**User acceptance record:** On 2026-07-13, the user reported that everything passes, the shell is stable and fully functional, and every intended Phase 58 fix is working. The user directed that the shell implementation be locked and preserved as the final reference baseline.
