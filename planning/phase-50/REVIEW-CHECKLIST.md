# Phase 50 Manual Review Checklist

**Status**: Solo and Home-on-refresh reported passing; ranked multiplayer cross-browser recovery implemented locally and pending hosted/live manual acceptance.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-06.
**Evidence**: `planning/phase-50/CHANGELOG.md`, `progress/PROGRESS-STEP-467.md`, `progress/PROGRESS-STEP-472.md`, `progress/PROGRESS-STEP-473.md`, `progress/PROGRESS-STEP-475.md`, `progress/PROGRESS-STEP-482.md`, `progress/PROGRESS-STEP-483.md`, `progress/PROGRESS-STEP-484.md`, `progress/PROGRESS-STEP-486.md`, `progress/PROGRESS-STEP-487.md`, `progress/PROGRESS-STEP-489.md`, `progress/PROGRESS-STEP-491.md`, `progress/PROGRESS-STEP-493.md`, `progress/PROGRESS-STEP-494.md`, `progress/PROGRESS-STEP-495.md`, `progress/PROGRESS-STEP-496.md`, `progress/PROGRESS-STEP-497.md`, and local-only visual manifest `test-results/visual-review/phase-50-review-candidate/manifest.md` when present.

This checklist helps the user manually verify Phase 50 behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## Hosted Manual Review Result - 2026-07-06

Manual review on the hosted/live Review Candidate found that Phase 50 is not accepted.

Failed:

- Completed Practice OG did not show the winning row or game-end screen after returning to the solved puzzle surface.
- Completed Practice GO did not show the final solved chain or game-end screen after returning to the solved puzzle surface.
- Completed Daily Solo state did not persist after navigating away and back; the Daily surface restarted fresh and lost submitted guesses instead of showing the completed screen.

Passed:

- Practice new puzzle/new chain remained the explicit way to move on after completion.
- Profile account-management actions, Profile-to-Settings navigation, Progression HUD-to-Stats behavior, and local-only artifact expectations were manually accepted.

Additional same-phase findings to address:

- Mobile and general page scrolling felt laggy compared with the expected experience.
- Broad automatic page scrolling should be removed for ordinary Solo/Practice/Daily navigation. Auto-scroll should remain only for explicit routed-game targets such as a notification or direct game-specific handoff where the user intends to jump to a particular game.

The previous automated Review Candidate gate did run the full E2E suite, but the suite did not catch these hosted manual-review failures. Same-phase Review Follow-up must reproduce the exact failed manual paths and improve the automated coverage before returning to Review Candidate.

## Same-Phase Recovery Result - 2026-07-06

Codex implemented a same-phase recovery pass for the failed items, but manual review remains required on a recovered hosted/live candidate.

Recovered by source/test changes:

- Completed Solo terminal display now has a local display-only cache separate from in-progress resume slots.
- Practice/Daily OG/GO terminal UI is covered across route re-entry, browser Back, and full app reload after completion.
- Daily/Practice OG/GO mode selection persists the selected Solo game key so reload returns to the intended surface.
- Ordinary Solo/Practice/Daily navigation and normal Solo keyboard play no longer call app-level `scrollIntoView`; auto-scroll remains available for explicit routed-game targets such as notifications/direct-game handoffs.
- GO terminal definitions now prefer bundled/Wiktionary lookup before Dictionary API to avoid browser CORS console noise during terminal restore.

Recovery verification:

- Focused unit coverage passed for resume/display-cache behavior, auto-scroll dispatch policy, and definition provider order.
- Focused Solo completion Playwright passed 4 tests across Practice/Daily OG/GO with reload coverage.
- Focused mobile scroll/layout Playwright passed 15 tests.
- `npm run lint`, `npm run test`, clean rerun of `npm run test:e2e`, `npm run build`, and API typecheck passed.

The failed hosted manual-review boxes below intentionally remain unchecked until the user verifies the recovered hosted/live candidate.

## Hosted Manual Review Follow-Up - 2026-07-07

The recovered hosted candidate still failed manual review for Daily Solo completion persistence.

Failed:

- Solved Daily Solo completion state did not reliably restore the terminal game-end screen after navigating away and returning.
- One mobile browser path returned to a fresh/cleared board instead of the solved Daily terminal surface.
- Another Android browser path showed submitted letters after returning, but did not show the all-green final row or the game-end screen.

Improved or still passed:

- Ordinary Solo auto-scroll behavior was improved by the previous same-phase recovery.
- Practice new puzzle/new chain, Profile/Settings conveniences, Progression HUD-to-Stats, and local-only artifact expectations remained accepted from the earlier hosted manual review.

Same-phase recovery action:

- Codex reproduced the old hosted candidate failure with a new signed-in Daily OG/GO Playwright regression against the hosted surface.
- The local recovery now checks account hydration, reload, route re-entry, browser Back/Forward, and all-green terminal rows for Daily OG and Daily GO.
- Manual acceptance remains unchecked until the next hosted/live Review Candidate is backed up and reviewed.

## Cross-Browser Recovery Result - 2026-07-07

Recovered by source/test changes:

- Completed Solo display slots now outrank stale in-progress resume slots after account hydration.
- Current-cycle Daily completed display evidence remains visible even while signed-in cloud completion IDs catch up.
- Daily OG/GO game surfaces remount when completed display evidence arrives after hydration.
- Authenticated terminal completion schedules an immediate progress-sync flush.
- Mobile widths below `720px` use a static lunar background instead of the animated fixed canvas/noise layers that contributed to scroll lag.
- Solo completion E2E now includes signed-in Daily OG and Daily GO restore after reload/account hydration, direct browser Back/Forward checks, and all-green row styling assertions.

Recovery verification:

- Focused signed-in Daily OG/GO regression failed against the old hosted candidate before the local source repair.
- Focused Solo completion Playwright passed in Chromium, Firefox, WebKit, and mobile Chromium emulation.
- Full local Playwright E2E passed 42 tests.
- `npm run lint`, `npm run test`, `npm run build`, and API typecheck passed.

The original completion-persistence boxes below are now marked as passed based on the next hosted/live manual review. New directly Phase 50-related Daily-only regressions remain unchecked for same-phase Review Follow-up.

## Cross-Browser Recovered Hosted Manual Review Result - 2026-07-07

Manual review on the cross-browser recovered hosted/live Review Candidate found that the major completed Solo restore problem appears fixed:

- Completed Solo final solved rows and game-end screens persisted after refresh or navigation away/back in the user's review.
- Practice Solo OG and Practice Solo GO appeared correct and should be preserved by any follow-up.
- The rest of the existing manual checklist appeared to pass as far as the user could tell.

New Daily-only same-phase follow-up items:

- Daily Solo OG can restore deleted draft letters after the user types letters, deletes them, then scrolls or navigates away/back.
- Daily Solo GO can replay/flash already-settled board letters when the user types a new guess after earlier GO-chain puzzles already have solved rows.

These findings remain inside Phase 50 because they are directly related to the hosted Review Candidate and the Solo persistence/rendering work. They are not final Phase 50 acceptance.

## Daily Solo Polish Follow-Up Result - 2026-07-07

Recovered by source/test changes, pending hosted/live manual review:

- Daily Solo OG no longer remounts from every in-progress resume timestamp update, so deleted draft letters stay deleted during scroll and normal route re-entry.
- Daily Solo GO no longer remounts settled in-progress boards on ordinary keyboard input, so already-settled rows stay visually stable while the active draft row changes.
- Completed Daily OG/GO evidence still forces a remount when terminal display evidence arrives after account hydration, preserving the earlier cross-browser terminal-persistence recovery.
- Practice Solo OG/GO keeps its existing resume-key behavior and remains covered by the same Solo completion re-entry suite.

Recovery verification:

- Focused Daily session-key unit coverage passed for in-progress Daily OG/GO key stability and completed Daily OG/GO remount behavior.
- Focused Playwright coverage passed for Daily OG deleted draft letters staying cleared after scroll and route re-entry.
- Focused Playwright coverage passed for Daily GO settled rows not replaying reveal animations during ordinary keyboard input.
- Full local Playwright E2E passed 44 tests, including the signed-in Daily OG/GO terminal-restore regression.
- `npm run lint`, `npm run test`, `npm run build`, app/API typechecks, and lightweight hygiene checks passed in the follow-up run.

The Daily-only boxes below remain unchecked until the next hosted/live Review Candidate is backed up and manually reviewed.

## GO Definition Deduplication Local Recovery - 2026-07-07

Codex locally recovered the GO terminal definition duplication finding:

- Daily Solo GO and Practice Solo GO were both affected by the shared Solo `GoGame` render path.
- Pre-fix regression coverage reproduced six `Definitions` panels for a five-puzzle completed Solo GO chain in both Daily and Practice scopes.
- The source fix prevents the separate terminal current-puzzle definition panel from rendering when that answer is already present in the solved GO-chain definition list.
- Multiplayer GO was audited through component coverage and rendered one terminal answer/definition section with one `Definitions` panel per answer for both Practice and Daily scopes.
- Focused component and affected Solo browser coverage passed locally.

The GO definition item below remains unchecked until the next hosted/live Review Candidate is backed up and manually reviewed on the user's devices.

## GO Definition Deduplication Finding - 2026-07-07

Manual review of the hosted/live Daily Solo polish Review Candidate found one remaining targeted GO terminal UI issue:

- Daily Solo GO can show the final solution definition twice: once inside the solved GO-chain definitions list and again as a separate final answer definition panel below that list.
- The user supplied screenshot evidence showing the final answer definition repeated after the all-solved definition cards.
- Codex source inspection found that Solo `GoGame` currently renders a solved-puzzle definitions list and also renders a separate end-state `DefinitionPanel` for the current puzzle answer, which is a plausible root cause for the observed duplicate final answer panel.
- Multiplayer GO currently appears to use one terminal answer/definitions section, but the follow-up prompt must audit and verify Practice Solo GO and Multiplayer GO rather than assuming they are unaffected.

This remains inside Phase 50 as directly related Manual Review Window polish. It is not final Phase 50 acceptance.

## Hosted Manual Review Pass And Multiplayer Follow-Up - 2026-07-07

The user reported that the current manual-review checklist items now pass on the hosted/live candidate:

- guest versus signed-in Solo persistence and non-persistence behavior now appears correct;
- completed Solo final rows and end-game screens persist after refresh and navigation re-entry;
- Daily Solo OG deleted draft letters stay deleted;
- Daily Solo GO settled rows no longer replay ordinary keyboard-input animations;
- GO terminal definitions no longer duplicate the final solved answer definition;
- past Solo Daily OG/GO coin-unlock behavior appears to work correctly.

Phase 50 is not closed yet because the user also reported a new multiplayer-only focus/refocus flash that should be handled before final closure:

- when two signed-in browser/account windows are used for multiplayer testing, switching focus between browser windows can briefly flash multiplayer content;
- the flash appears to expose or redraw current matches/lobbies, including old E2E-hosted practice multiplayer games;
- affected surfaces from the user's report: Multiplayer Overview, Practice Multiplayer, Lobby, and Live subtab count display;
- surfaces that did not appear affected from the user's report: Daily Multiplayer and Active Games.

The same-phase follow-up should preserve the now-good Solo persistence state, add or harden automated regressions for that state, reproduce/fix the multiplayer focus/refocus flash as narrowly as possible, and audit E2E multiplayer lobby/game cleanup expectations before Phase 50 final closure.

## Multiplayer Focus Follow-Up Local Recovery - 2026-07-07

The multiplayer focus/refocus flash follow-up has been implemented and verified locally, but it has not yet been backed up for hosted/live manual review or accepted by the user.

Local recovery summary:

- same-account signed-in progress hydration now preserves the visible async multiplayer state instead of temporarily replacing it from a stale progress-cache multiplayer snapshot;
- account/guest identity switches remain isolated and still use the next scoped progress state;
- multiplayer subscription/focus-refresh effects no longer rerun from auth-object, subtab-only, or selected-game-only changes;
- transient Live spectator refresh failures no longer clear existing spectator rows and flash visible counts to zero;
- E2E cleanup now checks that temporary multiplayer rows for the temporary E2E users were actually deleted.

Automated coverage added or confirmed:

- focused unit regression for same-account progress hydration preserving visible async multiplayer rows;
- two-client Playwright focus/refocus regression using temporary signed-in users and a real Practice Multiplayer OG match;
- full Solo completion re-entry E2E coverage remains passing for Daily OG deleted drafts, Daily GO settled-row stability, Practice/Daily terminal re-entry, and authenticated Daily OG/GO reload/account hydration;
- full E2E suite passed after the fix.

## Refresh Routing Follow-Up Local Recovery - 2026-07-08

The refresh-routing follow-up was implemented, verified locally, and backed up for hosted/live manual review. Hosted/live manual review found that it improved the behavior but did not solve refresh routing consistently enough for acceptance.

Local recovery summary:

- same-tab navigation state is now saved to session storage as well as local storage;
- browser refresh startup normally restores the same-tab saved route/tab/subtab/mode surface instead of stale browser-history payloads;
- public-profile and private-request route handoff remains intact when local storage and browser history intentionally agree against an older session route;
- browser back/forward popstate behavior remains active and updates saved navigation for later refreshes;
- focused Live spectator history state is retained only when it matches the selected saved navigation state.

Automated coverage added or confirmed:

- focused stale-history refresh regression failed before the source repair and passed after it;
- focused refresh coverage now checks Solo Practice GO and Multiplayer Lobby immediate refresh;
- private Practice request/public-profile route handoff tests passed after the startup precedence repair;
- full Solo re-entry E2E, mobile scroll/layout E2E, and full E2E all passed after the repair.

## Refresh Home Reset Follow-Up - 2026-07-08

New manual-review target:

- The preserve-current-surface refresh policy is superseded for Phase 50 acceptance.
- A manual hard/browser refresh should route to Home consistently from representative app surfaces.
- Saved game/account progress, accepted Solo persistence, ordinary in-app navigation, and browser Back/Forward behavior should remain preserved unless implementation investigation finds a direct conflict that must be reported.
- This follow-up remains inside Phase 50 as a directly related Manual Review Window finding.

## Refresh Home Reset Local Recovery - 2026-07-08

Codex locally recovered the revised refresh target:

- Full page load/manual hard refresh now starts on Home by default.
- Browser Back/Forward remains preserved for ordinary in-session navigation.
- Public profile handoff remains a narrow exception so private Practice request/public-profile flows can intentionally open the target profile after an app-controlled reload.
- Saved Solo progress is not cleared by the Home reset; manual review should refresh, confirm Home appears, then navigate back to the relevant Solo surface and confirm the saved completed or in-progress game state is still there.
- Multiplayer refresh/re-entry test helpers now explicitly re-enter Multiplayer after refresh before resuming a match, matching the new user-facing policy.

Automated verification passed locally:

- focused navigation unit and browser refresh tests;
- focused Solo completion/re-entry tests;
- focused private profile/private request recovery reruns;
- focused multiplayer GO transition and timed timeout reruns;
- full lint, unit/component, build, API typecheck, and E2E gates.

This item remains pending hosted/live manual review until the next Review Candidate Backup is authorized and reviewed.

## Hosted Multiplayer Regression Follow-Up - 2026-07-08

Hosted/manual review update:

- The user reported that Solo persistence and manual hard/browser refresh landing on Home now pass and should be treated as accepted guardrails.
- Multiplayer is not accepted and requires same-phase recovery before Phase 50 can close.
- The reported multiplayer regressions were not intentionally accepted by the user and should be reproduced with real temporary-account E2E where feasible.

New multiplayer recovery items:

- [ ] **Locally recovered; pending hosted manual review:** Private Practice request first-turn submission persists and is visible to the rival.
  - Expected: after player one requests a private unranked Practice match and both safe test accounts open the match, player one's first valid submitted guess remains a submitted colored row, clears the typed draft, advances/persists the turn state, and becomes visible to player two as appropriate. If the first guess solves the puzzle, the solved/terminal state must persist rather than reverting to typed draft.
  - Suggested steps: use two safe signed-in accounts, create a private Practice request from a public/leaderboard profile path, accept/open it, submit a valid first guess as the requester, and confirm it remains after short settle, focus switch, route re-entry, and refresh/re-entry.
  - Evidence target: real temporary-account E2E plus repository/RPC root-cause notes from the follow-up prompt.

- [ ] **Locally recovered; pending hosted manual review:** Private Practice request forfeit/cancel persists.
  - Expected: after a private Practice match exists, forfeit/cancel should save durably, update the local and rival views, and not restore the active match after refresh/re-entry.
  - Suggested steps: use two safe signed-in accounts with a private Practice match, trigger forfeit/cancel from the relevant player, wait briefly, refresh/re-enter, and confirm the match does not revert to active playable state.
  - Evidence target: focused private-match E2E coverage and cleanup proof.

- [ ] **Locally recovered; pending hosted manual review:** Daily Multiplayer `Open Multiplayer Match` creates a durable waiting/open match instead of flash-reverting.
  - Expected: for an eligible safe account with no current Daily Multiplayer claim in that bucket, clicking `Open Multiplayer Match` should leave a stable waiting/open multiplayer state, keep the relevant Lobby/Active count consistent, and not automatically cancel/revert after a short settle or focus refresh.
  - Suggested steps: use a safe signed-in account that has not claimed the relevant Daily Multiplayer bucket, open Daily Multiplayer OG and GO when feasible, click `Open Multiplayer Match`, wait, refresh/re-enter if safe, and confirm the waiting/open state remains until joined/canceled.
  - Evidence target: focused Daily Multiplayer E2E with remote row/claim cleanup.

- [ ] **Locally recovered; pending hosted manual review:** Practice public unranked `Open Multiplayer Match` creates a durable waiting/open match instead of flash-reverting.
  - Expected: opening a public unranked Practice Multiplayer match should leave a stable waiting lobby row and visible waiting state until another player joins or the creator cancels/forfeits.
  - Suggested steps: use a safe signed-in account, open Practice Multiplayer OG and GO where feasible, choose unranked/public settings, click `Open Multiplayer Match`, wait, refresh/re-enter if safe, and confirm the waiting/open state remains.
  - Evidence target: focused Practice Multiplayer E2E with cleanup proof.

- [ ] **Locally recovered; pending hosted manual review:** Ranked Practice queue finalizes without the invalid JSON error.
  - Expected: compatible safe test accounts entering ranked Practice queue should either remain in a stable searchable queue state or finalize to a ranked Practice game without showing `Unable to finalize ranked queue game: Empty or invalid json`.
  - Suggested steps: use two safe signed-in accounts, enter compatible ranked Practice queue settings, wait for matching/finalization, and confirm no invalid JSON banner appears and the resulting game/queue rows are stable.
  - Evidence target: focused ranked queue E2E and repository/RPC contract notes.

This follow-up does not reopen accepted Solo or refresh behavior except as guardrail verification. It also does not authorize Git/GitHub backup, final Phase 50 acceptance/closure, migrations, deployment, release, merge, next-phase work, public tunneling, production configuration, or stable `brrrdle` repository work.

## Multiplayer Matchmaking And First-Turn Persistence Local Recovery - 2026-07-08

Codex locally recovered and hardened the reported multiplayer regressions, pending the next hosted/live Review Candidate:

- private Practice request coverage now submits the requester's first valid guess, verifies the remote row contains a submitted move, verifies the rival can see the move, reloads/re-enters the requester view, and verifies the submitted row persists;
- the same private Practice request coverage now forfeits from the rival side and verifies the forfeited player, winner, lost status, and post-refresh forfeit message persist;
- Practice and Daily public open-match E2E coverage now waits after the initial open action and rechecks the exact waiting row by id before a rival joins, covering the hosted flash/revert/cancel symptom for OG and GO where feasible;
- ranked Practice queue requests now carry a finite five-minute expiry before they are sent to the trusted queue RPC, preventing newly created queue rows from becoming immortal stale match candidates;
- ranked Practice E2E now uses a non-default word length for the untimed queue path, reducing collision with old default-length rows while still verifying real matching/finalization and safe opponent labels;
- accepted Solo persistence and Home-on-refresh behavior remained protected by the full Solo completion re-entry and refresh-route E2E suites.

Local automated verification passed:

- focused unit/component slice: 4 files, 83 tests;
- private + Practice OG Playwright: 9 tests;
- Practice GO, Daily OG, and Daily GO Playwright: 3 tests;
- multiplayer reliability/focus, refresh-route, and Solo completion Playwright: 23 tests;
- `npm run lint`;
- `npm run test`: 129 files, 899 tests;
- `npm run test:e2e`: 55 tests;
- `npm run build` with the existing Vite large-chunk advisory;
- `npx tsc -p tsconfig.api.json --noEmit`.

The checkboxes above remain unchecked until the recovered hosted/live candidate is backed up and manually reviewed on the user's devices.

## Ranked Multiplayer Cross-Browser Hosted Review Follow-Up - 2026-07-08

Hosted/live manual review after the Step 495 multiplayer recovery backup found that the prior local recovery did not fully solve ranked Practice Multiplayer:

- ranked Practice OG/GO can create or expose a durable game while one participant still sees `Unable to finalize ranked queue game: Empty or invalid json`;
- the participant with the error can often manually open the new current-match button, indicating that the durable game may already exist even though the queue finalization/routing path failed locally;
- the clearest report used Firefox for Player 1 and Safari for Player 2;
- Firefox plus Brave ranked matching was also reported inconsistent;
- Safari also appeared to flash/revert when opening public unranked Practice Multiplayer, while Firefox and Brave appeared better.

New same-phase recovery items:

- [x] **Implemented locally; pending hosted/manual acceptance:** Ranked Practice queue finalization recovers when the durable game already exists.
  - Expected: if a compatible ranked Practice match has already produced a durable game row for both participants, either player can check or auto-refresh the ranked queue and be routed into the game without a persistent red invalid-JSON banner.
  - Suggested steps: use two safe signed-in accounts, enter compatible ranked Practice OG settings in both entry orders, use `Check ranked queue` from either player, and confirm both players are routed to the same ranked game without needing to manually click a current-match fallback.
  - Evidence: `getRecoverableRankedQueueGame` regression coverage verifies recovery is limited to viewer-owned ranked Practice games, while the panel now reloads multiplayer state and opens the durable matched game if finalization throws after the game already exists. Focused ranked Practice E2E and full E2E passed locally.

- [x] **Implemented locally through shared ranked queue recovery path; pending hosted/manual acceptance:** Ranked Practice GO follows the same recovery behavior.
  - Expected: compatible ranked Practice GO queues should finalize/open the ranked game without the invalid-JSON banner or a stranded second participant.
  - Suggested steps: repeat the ranked queue check with GO settings where feasible, including reversed queue-entry order.
  - Evidence: the recovery is mode-agnostic inside shared ranked queue finalization/routing code and checks only matched game id, viewer ownership, ranked flag, Practice scope, and non-cancelled status. Existing Practice GO multiplayer E2E remained green.

- [x] **Documented with deterministic recovery coverage; pending hosted/manual acceptance:** WebKit/Safari-adjacent ranked coverage is added or explicitly documented as unavailable.
  - Expected: if local Playwright WebKit/cross-engine support is available, run the smallest practical WebKit or mixed-engine ranked queue subset. If unavailable, keep deterministic simulated coverage and report that browser-engine limitation clearly.
  - Suggested steps: run a focused WebKit/cross-engine queue test or document the exact local limitation.
  - Evidence: current repo Playwright config ran the required gates in Chromium. The hosted Safari/WebKit failure was not reproduced locally, so coverage was added at the deterministic recovery selector level plus real Chromium ranked non-regression E2E.

- [x] **Investigated within this bounded pass; pending hosted/manual acceptance:** Safari/WebKit public unranked Practice flash/revert is investigated.
  - Expected: public unranked Practice Multiplayer opened from Safari/WebKit should remain stable, or the follow-up should identify that the hosted Safari behavior requires a separate authorized browser-specific pass.
  - Suggested steps: attempt a focused WebKit public unranked Practice open-match stability check; preserve Firefox/Brave/Chromium behavior.
  - Evidence: the existing public unranked Practice auto-routing and multiplayer reliability/focus E2E checks passed after the ranked recovery. No separate source change was made to public unranked Practice because the durable ranked finalization failure had a narrower root-cause match and the local Chromium paths stayed stable.

Created planning artifact:

- `planning/phase-50/MULTIPLAYER-RANKED-MATCHMAKING-CROSS-BROWSER-ANALYSIS-AND-RECOVERY-STRATEGY-2026-07-08.md`

Created next prompt package:

- `prompt-packages/phase-50/PHASE-50-RANKED-MULTIPLAYER-CROSS-BROWSER-RECOVERY-PROMPT-2026-07-08.md`

## Ranked Multiplayer Cross-Browser Local Recovery - 2026-07-08

Codex implemented the bounded ranked recovery locally, pending the next hosted/live Review Candidate:

- ranked queue finalization now recovers from a broken/empty finalization response by reloading multiplayer state and opening the already-created durable matched ranked Practice game when it belongs to the signed-in viewer;
- recovery is intentionally narrow: matched game id must match, the row must be ranked, Practice-scoped, not cancelled, and viewer-owned;
- if no valid durable game is found, the original finalization error remains visible instead of being converted to a false success;
- accepted Solo persistence and Home-on-refresh behavior stayed protected by the required regression suites.

Local automated verification passed:

- focused unit/component slice: 4 files, 84 tests;
- ranked Practice focused Playwright: 1 test before and after the fix;
- private, Practice OG/GO, and private-matchmaking Playwright subset: 10 tests;
- multiplayer reliability/focus Playwright subset: 6 tests;
- refresh-route and Solo completion Playwright subset: 17 tests;
- `npm run lint`;
- `npm run test`: 129 files, 900 tests;
- `npm run test:e2e`: 55 tests;
- `npm run build` with the existing Vite large-chunk advisory.

Hosted/live acceptance remains unchecked until the recovered candidate is backed up and manually reviewed on the user's devices.

This follow-up does not reopen accepted Solo persistence or Home-on-refresh behavior except as guardrail verification. It also does not authorize Git/GitHub backup, final Phase 50 acceptance/closure, migrations, deployment, release, merge, next-phase work, public tunneling, production configuration, or stable `brrrdle` repository work.

## Refresh Home Reset Hosted Review Follow-Up - 2026-07-08

Hosted/live manual review after the Refresh Home Reset Review Candidate Backup found that the behavior improved but still does not pass:

- refreshing the page now pretty consistently returns the game to the Solo tab instead of the Home tab.

The acceptance target remains unchanged:

- manual hard/browser refresh should land on Home consistently;
- the app should not later auto-route back to Solo without user action after auth/progress/Solo cloud hydration or other delayed startup effects settle;
- saved Solo state must remain available when the user manually navigates back to the relevant Solo surface after refresh.

Same-phase action prepared:

- `prompt-packages/phase-50/PHASE-50-REFRESH-HOME-RESET-SECOND-PASS-FOLLOW-UP-PROMPT-2026-07-08.md`

This finding remains inside Phase 50 as directly related Manual Review Window follow-up work. It is not final Phase 50 acceptance.

## Refresh Home Reset Second-Pass Local Recovery - 2026-07-08

Codex locally recovered the remaining refresh-to-Solo symptom:

- auth/progress hydration on app startup now loads signed-in progress without automatically routing to the Solo resume surface;
- manual hard/browser refresh is expected to land on Home and remain on Home after startup/auth hydration settles;
- saved Solo progress is not cleared by the Home reset and remains available after the user manually navigates back to the relevant Solo surface;
- the public-profile/private-request route handoff path remains protected by existing E2E coverage and was not changed in this follow-up.

Automated verification passed locally:

- pre-fix authenticated Daily GO refresh regression failed for the expected delayed route-away-from-Home behavior;
- focused navigation unit and browser refresh tests;
- focused Solo completion/re-entry tests, including authenticated Daily GO/OG hydration after reload;
- full lint, unit/component, build, API typecheck, and E2E gates.

Manual review item for the next hosted/live Review Candidate:

- [ ] From representative signed-in and guest surfaces, manually hard-refresh the hosted site and confirm it lands on Home and does not automatically route back to Solo after a short wait.
- [ ] After the refresh lands on Home, manually navigate back to the relevant Solo surface and confirm the saved accepted Daily/Practice Solo state is still available.

This item remains pending hosted/live manual review until the next Review Candidate Backup is authorized and reviewed.

## How To Use

- Use a safe development/test environment with non-production accounts.
- Prefer the hosted/live Review Candidate produced by an explicitly authorized Review Candidate Backup for hands-on desktop and mobile review.
- Local, Codex-browser, or same-LAN previews are optional supporting review paths when they work; they are no longer required before Review Candidate Backup.
- Do not paste or record secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, tokens, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before accepting Phase 50.
- Directly Phase 50-related manual-review findings can be handled as same-phase Review Follow-up before final acceptance; broader or unrelated findings should be routed to a new phase/addendum.
- A Review Candidate Backup may happen before final acceptance when separately authorized, but it does not close Phase 50. Final acceptance/closure or Final Acceptance Backup still requires separate explicit authorization.

## Manual Review Preview Options

- Open the exact hosted/live Review Candidate URL produced by the Review Candidate Backup workflow when available.
- For desktop review on the Mac, the preview should be a loopback-only local server, preferably `http://127.0.0.1:4173/`.
- For mobile review on Android/iOS, open the exact same-LAN URL reported by Codex, usually `http://<mac-lan-ip>:4173/`, while the phone and Mac are on the same trusted local network.
- If the ChatGPT/Codex mobile in-app browser shows a blank or black screen, try the phone's normal Chrome/browser with the same LAN URL before treating the app behavior as failed.
- If local, Codex-browser, or same-LAN preview does not work, use the Review Candidate Backup Loop for hosted/live manual review instead of creating a public tunnel as part of this checklist.
- If `4173` is busy, use the alternate loopback URL reported by Codex.
- Screenshots and `test-results/visual-review/phase-50-review-candidate/manifest.md` are supporting evidence, not a substitute for interacting with the app.
- The checklist does not authorize Git/GitHub actions, deployment configuration, public tunneling, release, merge, backup workflow execution, production changes, next-phase implementation, or stable `brrrdle` repository work. Those remain separate current-prompt actions.
- Ask Codex to stop the preview server when manual review is complete or when you no longer need it.

## Codex-Assisted Preflight Summary

Automated proof completed:

- Focused Phase 50 Vitest regression coverage for Solo completion, resume-slot/browser-history behavior, Profile account actions, Settings, HUD, shell, and Stats surfaces.
- Focused Playwright coverage for Solo completion re-entry across Practice/Daily OG/GO, including full app reload after completion.
- Focused Playwright coverage for Progression HUD opening the existing Stats route.
- Full local Vitest suite after cross-browser recovery: 127 files, 881 tests passed.
- Full Playwright E2E suite after cross-browser recovery: clean rerun passed 42 tests.
- Focused Solo completion re-entry suite passed in Chromium, Firefox, WebKit, and mobile Chromium emulation.
- Focused signed-in Daily OG/GO regression reproduced the old hosted candidate failure before the local source repair.
- Focused GO definition deduplication coverage reproduced the Solo GO duplicate definition bug before the local source repair, then passed for Daily Solo GO, Practice Solo GO, and Multiplayer GO after repair.
- Production build and API typecheck.
- Local-only visual handoff review under `test-results/visual-review/phase-50-review-candidate/`.
- Repository hygiene checks recorded in `progress/PROGRESS-STEP-467.md`.

Codex visual/browser review:

- Captured completed Practice OG after Home -> browser Back re-entry.
- Captured completed Practice GO after route re-entry on mobile.
- Captured the Profile account-management subsection with `Open Settings account management` and `Sign out`.
- Captured the Progression HUD `Open Stats` action.
- Captured the existing Stats route opened from the HUD action.

Codex intentionally did not verify or perform:

- Production deployment configuration, release, merge, PR, GitHub backup, or branch work.
- Real user private data or real user accounts.
- Vercel/Supabase configuration changes.
- New storage schema, new Supabase migration, RLS/RPC/table/bucket changes, destructive cloud progress changes, or deployment configuration changes.
- Gameplay-rule, reward-formula, scoring, Elo/rating, Daily claim, or multiplayer feature changes.
- Stable `brrrdle` repository work.

## Must Manually Verify

- [x] **Passed in hosted manual review 2026-07-07 after GO definition recovery:** GO terminal definitions do not duplicate the final answer definition.
  - Expected: after completing a GO chain, each solved word's definition appears once in the terminal definitions area. The final solved word should not be repeated in a separate duplicate definition panel below the solved-chain definitions.
  - Suggested steps: complete or revisit a completed Daily Solo GO chain and inspect the definitions area. Then spot-check Practice Solo GO and, if feasible, completed Practice/Daily Multiplayer GO terminal definitions.
  - Evidence: user screenshot/manual review report on 2026-07-07; local recovery and verification recorded in `progress/PROGRESS-STEP-482.md`.

- [x] **Passed in hosted manual review 2026-07-07 after Daily Solo polish recovery:** Daily Solo GO settled rows do not replay flip/flash animations on ordinary keyboard input.
  - Expected: after earlier Daily Solo GO puzzles have solved rows or accumulated carry-forward words above the play area, typing a new guess changes only the active draft row. Previously solved/settled letters should not flip, flash, or replay submission animations on every keyboard touch.
  - Suggested steps: open Solo -> Daily -> GO after one or more GO-chain puzzles have solved rows, type letters into the current puzzle, and confirm already-settled words stay visually stable.
  - Evidence: user hosted/mobile manual review report on 2026-07-07; Codex local recovery and verification recorded in `progress/PROGRESS-STEP-479.md`.

- [x] **Passed in hosted manual review 2026-07-07 after cross-browser recovery:** Completed Practice OG keeps the final winning row and completed state after re-entry.
  - Expected: after solving a Practice OG puzzle, navigating away and returning through browser Back or the Solo/Practice route still shows the final winning row, completed status, share result, and definitions.
  - Suggested steps: open Solo -> Practice Solo -> OG, solve a safe Practice puzzle, navigate Home, use browser Back, then route away and back through Solo -> Practice Solo -> OG.
  - Evidence: `progress/PROGRESS-STEP-473.md`, `progress/PROGRESS-STEP-475.md`; focused Playwright reload/back coverage in `e2e/gameplay/solo-completion-reentry.spec.ts`.

- [x] **Passed in hosted manual review 2026-07-07 after cross-browser recovery:** Completed Practice GO keeps the final solved chain after re-entry.
  - Expected: after solving all Practice GO puzzles, route re-entry still shows the completed chain, the fifth solved row, share result, and definitions.
  - Suggested steps: open Solo -> Practice Solo -> GO, solve a safe Practice GO chain, navigate Home, return through Solo -> Practice Solo -> GO, and inspect the terminal state.
  - Evidence: `progress/PROGRESS-STEP-473.md`, `progress/PROGRESS-STEP-475.md`; focused Playwright reload/back coverage in `e2e/gameplay/solo-completion-reentry.spec.ts`.

- [x] **Passed for terminal restore in hosted manual review 2026-07-07 after cross-browser recovery; Daily-only polish regressions tracked separately below:** Completed Daily OG and Daily GO keep terminal Solo state without duplicate rewards.
  - Expected: Daily Solo OG/GO completed state remains visible for the current Daily cycle, and re-entry does not duplicate XP, coins, history, stats, streak entries, Daily claims, or completed IDs.
  - Suggested steps: in a safe browser/profile, complete Daily Solo OG and/or Daily Solo GO if available, record visible Level/Coins/XP, navigate away/back, and confirm the completed screen remains without another reward bump.
  - Evidence: focused signed-in Playwright reload/account-hydration coverage in `e2e/gameplay/solo-completion-reentry.spec.ts`; `progress/PROGRESS-STEP-473.md`; `progress/PROGRESS-STEP-475.md`.

- [x] **Passed in hosted manual review 2026-07-07 after Daily Solo polish recovery:** Daily Solo OG deleted draft letters stay deleted after scroll and route re-entry.
  - Expected: if the user types draft letters in Daily Solo OG, deletes them, scrolls the page, navigates away/back, or returns through normal Solo routing before submitting a guess, the deleted draft letters do not reappear.
  - Suggested steps: open Solo -> Daily -> OG, type a few letters without submitting, delete them, scroll up/down, then navigate away and return to Daily OG. Confirm the active draft row remains empty.
  - Evidence: user hosted/mobile manual review report on 2026-07-07; Codex local recovery and verification recorded in `progress/PROGRESS-STEP-479.md`.

- [x] **Passed in hosted manual review 2026-07-07 after cross-browser recovery:** Ordinary Solo navigation no longer auto-scrolls the page during normal route/subtab/mode changes or physical-keyboard play.
  - Expected: opening Solo -> Daily/Practice -> OG/GO leaves page positioning under the user's control; the app does not auto-center the board or keyboard. Auto-scroll remains acceptable when a notification/direct-game handoff explicitly routes the user to a game.
  - Suggested steps: on mobile and desktop, open Solo Practice OG/GO and Daily OG/GO normally. Confirm the page does not jump unexpectedly and remains manually scrollable.
  - Evidence: focused mobile scroll/layout Playwright coverage in `e2e/layout/mobile-scroll.spec.ts`; `progress/PROGRESS-STEP-473.md`.

- [x] **Passed in hosted manual review 2026-07-06:** Practice new puzzle/new chain remains the explicit way to move on after completion.
  - Expected: completed Practice Solo OG/GO does not silently start a new puzzle on route re-entry; a new Practice puzzle/chain starts only through the visible Practice action.
  - Suggested steps: after completing Practice OG/GO, route away and back, then use `New practice puzzle` or `New go chain` and confirm the old terminal state is replaced only after that explicit action.
  - Evidence: `planning/phase-50/CHANGELOG.md`; `progress/PROGRESS-STEP-462.md`.

- [x] **Passed in hosted manual review 2026-07-06:** Profile account-management actions are present but separated from profile editing.
  - Expected: signed-in Profile shows `Open Settings account management` and `Sign out` in a separate Account management section, not mixed into private/public profile Save/Cancel controls.
  - Suggested steps: sign in with a safe test account, open Profile, inspect the Account management section, and confirm Sign out still works through the existing auth path if you choose to test it.
  - Evidence: `progress/PROGRESS-STEP-464.md`; visual scenario `Profile account-management conveniences`.

- [x] **Passed in hosted manual review 2026-07-06:** Profile-to-Settings navigation uses the existing Settings account-management route.
  - Expected: clicking `Open Settings account management` opens Settings and does not create a new account route, modal, or duplicated Settings surface.
  - Suggested steps: from signed-in Profile, click `Open Settings account management`; confirm Settings opens and existing account, sync, export, and reset controls remain canonical there.
  - Evidence: `progress/PROGRESS-STEP-464.md`.

- [x] **Passed in hosted manual review 2026-07-06:** Progression HUD opens Stats while staying display-only.
  - Expected: the HUD shows active-scope Level, Coins, and XP progress plus `Open Stats`; clicking it opens the existing Stats route. HUD itself does not edit progression, spend coins, expose public/private profile data, or trigger gameplay actions.
  - Suggested steps: on Home or Solo, click `Open Stats` in the HUD and confirm the Stats route opens with local privacy copy visible.
  - Evidence: `progress/PROGRESS-STEP-464.md`; visual scenarios `Progression HUD Open Stats action` and `Stats opened from Progression HUD`.

- [x] **Passed in hosted manual review 2026-07-06:** Phase 50 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-50-review-candidate/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-50-review-candidate/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `test-results/visual-review/phase-50-review-candidate/manifest.md`; `progress/PROGRESS-STEP-467.md`.

- [x] **Recovered locally 2026-07-07; awaiting hosted manual review:** Multiplayer focus/refocus does not flash lobby/game lists or subtab counts when switching between signed-in browser windows.
  - Expected: with two safe signed-in accounts playing or inspecting Practice Multiplayer, switching focus between browser windows does not briefly blank, redraw, or flash all current matches/lobbies, old E2E-hosted games, or transient lobby counts. Overview, Practice Multiplayer, Lobby, and Live should remain visually stable; Daily Multiplayer and Active Games should remain non-regressed.
  - Suggested steps: use two browsers or browser contexts signed into separate safe accounts, open Multiplayer Overview, Practice Multiplayer, Lobby, Live, Daily Multiplayer, and Active Games, switch focus between windows repeatedly, and confirm no transient content/list/count flash occurs.
  - Evidence: user manual report on 2026-07-07; same-phase follow-up prompt prepared in `progress/PROGRESS-STEP-483.md`; local recovery and automated verification recorded in `progress/PROGRESS-STEP-484.md`.

## Solo Cloud Persistence Overhaul Manual Review - 2026-07-07

- [x] **Passed in hosted/manual review 2026-07-07 after Solo cloud persistence backup:** Signed-in Daily GO first-puzzle solve persists the transition to puzzle 2 immediately.
  - Expected: after signing in, solving the first Daily GO puzzle, and leaving before entering any manual guess on puzzle 2, a fresh browser/device sign-in returns to Daily GO on puzzle 2 with the carried-forward prior answer row visible.
  - Suggested steps: use a safe signed-in account, solve only puzzle 1 of Daily GO, then test another browser/device or clear local site data, sign in again, and open Solo -> Daily -> GO.
  - Evidence: focused Playwright coverage in `e2e/gameplay/solo-completion-reentry.spec.ts` verifies fresh-browser account hydration for this exact transition.

- [x] **Passed in hosted/manual review 2026-07-07 after Solo cloud persistence backup:** Signed-in Daily OG and Daily GO terminal states persist immediately across fresh browser/device account hydration.
  - Expected: after completing Daily OG or the full Daily GO chain while signed in, a fresh browser/device sign-in shows the completed terminal board/end screen without requiring a delayed manual sync or another guess.
  - Suggested steps: solve Daily OG and/or Daily GO with a safe signed-in account, then sign in on another browser/device or clear local site data, open the same Solo Daily surface, and confirm the completed screen and final rows are present.
  - Evidence: focused Playwright coverage in `e2e/gameplay/solo-completion-reentry.spec.ts` verifies fresh-browser completed Daily OG/GO hydration from the signed-in account cloud record.

- [x] **Passed in hosted/manual review 2026-07-07 after Solo cloud persistence backup:** Guest/account boundaries remain unchanged after the Solo cloud persistence overhaul.
  - Expected: guest drafts and guest-only progress remain local unless explicitly transferred; signed-in Solo cloud records belong only to the authenticated account; signing out does not expose account-owned Solo terminal state to guest mode.
  - Suggested steps: compare guest mode and signed-in mode in separate browsers/profiles, and confirm each scope shows only its own Solo progress.
  - Evidence: the implementation writes only when `authState.status === 'authenticated'`; existing guest/account manual-review checks remain listed above.

## Practice Solo Persistence Follow-Up Manual Review - 2026-07-07

- [x] **Passed in hosted/manual review after recovered backup:** Practice GO starts and restores a new chain after a completed chain is superseded.
  - Expected: after completing Practice GO, pressing `New go chain` starts a new blank chain. If the player submits a valid guess in the new chain, refresh, route re-entry, or fresh signed-in browser/account hydration returns to the new in-progress chain, not the previous completed terminal screen.
  - Suggested steps: sign in with a safe account, complete Practice Solo GO, click `New go chain`, submit one valid incorrect guess in the new chain, then refresh and/or sign out/sign in on another browser/device. Confirm the submitted guess remains visible and the old terminal screen does not return.
  - Evidence: pre-fix focused E2E reproduced the authenticated fresh-browser stale terminal restore; local recovery and verification recorded in `progress/PROGRESS-STEP-487.md`; user hosted/live report after the recovered backup said the problems appear solved.

- [x] **Passed in hosted/manual review after recovered backup:** Practice GO remains blank after `New go chain` even before the first new guess.
  - Expected: after completing Practice GO and pressing `New go chain`, a refresh or route re-entry still shows the new blank chain's first puzzle instead of the previous completed terminal chain.
  - Suggested steps: complete Practice Solo GO, click `New go chain`, do not submit a guess, refresh the page, and confirm Solo -> Practice -> GO shows puzzle 1 of a fresh chain with an empty draft row.
  - Evidence: focused Playwright refresh coverage in `e2e/gameplay/solo-completion-reentry.spec.ts`; user hosted/live report after the recovered backup said the problems appear solved.

- [x] **Passed in hosted/manual review after recovered backup:** Practice OG starts and restores a new puzzle after a completed puzzle is superseded.
  - Expected: after completing Practice OG, pressing `New practice puzzle` starts a new puzzle. If the player submits a valid guess in the new puzzle, refresh or route re-entry returns to that in-progress puzzle, not the previous completed terminal screen.
  - Suggested steps: complete Practice Solo OG, click `New practice puzzle`, submit one valid incorrect guess, refresh and/or route away and back, and confirm the submitted guess remains visible while the old completed screen stays superseded.
  - Evidence: focused Playwright refresh coverage in `e2e/gameplay/solo-completion-reentry.spec.ts`; local recovery recorded in `progress/PROGRESS-STEP-487.md`; user hosted/live report after the recovered backup said the problems appear solved.

## Refresh Routing Follow-Up Manual Review - 2026-07-08

- [x] **Passed in hosted/manual review 2026-07-08 after second-pass recovery:** Manual hard/browser refresh routes to Home consistently.
  - Expected: refreshing the browser from representative ordinary app surfaces returns the user to Home after reload. Examples include Solo Daily OG/GO, Solo Practice OG/GO, Multiplayer Overview, Practice Multiplayer, Daily Multiplayer, Active Games, Lobby, Live, Profile, Settings, Stats, Calendar, History, Leaderboard, Word Explorer, About, and Home.
  - Suggested steps: open representative desktop/mobile surfaces, use browser refresh, and confirm the reloaded app lands on Home consistently instead of bouncing among Solo, Multiplayer, or another stale surface.
  - Evidence: local recovery recorded in `progress/PROGRESS-STEP-493.md`; user hosted/manual report on 2026-07-08 said manual refresh now lands on Home consistently.

- [x] **Superseded evidence only after hosted manual review 2026-07-08:** Browser refresh preserves the current route, tab, subtab, and selected gameplay surface.
  - Expected: refreshing the browser from any ordinary app page keeps the user on the same visible app surface after reload. Examples include Solo Daily OG/GO, Solo Practice OG/GO, Multiplayer Overview, Practice Multiplayer, Daily Multiplayer, Active Games, Lobby, Live, Profile, Settings, Stats, Calendar, History, Leaderboard, Word Explorer, About, and Home.
  - Suggested steps: open representative desktop/mobile surfaces, use browser refresh, and confirm the reloaded page returns to the same route/tab/subtab/mode instead of defaulting to another surface.
  - Evidence: focused refresh-routing Playwright coverage in `e2e/navigation/refresh-route-persistence.spec.ts`; full local E2E passed after the repair; local recovery recorded in `progress/PROGRESS-STEP-489.md`.
  - Manual-review result: the hosted/live candidate improved the refresh problem but did not solve it consistently, so this is no longer the acceptance target.

## Optional Nice-To-Check

- [x] Review the local-only visual screenshots if available.
  - Expected: each screenshot in `test-results/visual-review/phase-50-review-candidate/manifest.md` visually matches its scenario description.
- [x] Try HUD-to-Stats navigation at mobile width.
  - Expected: the HUD action remains accessible and Stats remains scrollable without horizontal overflow.
- [x] Try the Profile account-management section at mobile width.
  - Expected: buttons remain readable and do not overlap with profile editing controls.
- [x] Try completed Solo re-entry while signed in with a safe test account.
  - Expected: guest/account boundaries remain safe and rewards do not duplicate.
- [x] Try browser refresh after completed Practice OG/GO.
  - Expected: no duplicate rewards; completed UI behavior remains understandable.
- [x] Try past Solo Daily OG/GO coin unlocks.
  - Expected: spending coins for previous Solo Daily OG/GO puzzles works and does not show the current-day guest/account persistence regressions.

## Preserved Invariants To Spot-Check

- [x] Phase 40 through Phase 49 public profile, private Practice request, multiplayer reliability, public stats/admin/help, mobile shell, account-boundary, sync, Profile/Settings, Progression HUD, and Focus Mode decisions remain intact.
- [x] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, five-letter only, and excluded from public/guest spectator discovery.
- [x] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.
- [x] Profile public/private data contracts, avatar upload behavior, public profile visibility/moderation, and leaderboard/public identity contracts remain unchanged.
- [x] Settings remains the account-management home for password, sync, export, reset, and gated account actions.
- [x] Progression HUD remains active-scope local/account display only, not a public profile or leaderboard resource surface.
- [x] Daily Solo remains tied to the existing Daily lifecycle; Practice Solo remains controlled by explicit new puzzle/new chain actions.
- [x] XP, coins, levels, reward amounts, stats formulas, Daily claims, streak behavior, and progression economy rules remain unchanged.
- [x] `completedGameIds` remains authoritative for duplicate reward protection.
- [x] Resume slots remain in-progress-only; completed Solo display is restored without turning completed games into resumable active games.

## Known Deferred / Not In Scope

- Final phase closure, Final Acceptance Backup, release, deployment configuration, or production configuration change.
- New storage schema, new Supabase/RLS/RPC/table/bucket, migration, destructive cloud progress change, or deployment-configuration change.
- Broader resume/session contracts, one-active-session leases, server-authoritative Daily submissions, forced sign-out, remote invalidation, or session security work.
- Practice GO answer-selection/randomness auditing or algorithm changes beyond preserving the current deterministic Practice seed flow.
- Reward formula, XP curve, level curve, coin economy, inventory, consumables, Pay-to-Continue, reveal-answer, marketplace, monetization, stats-calculation, Daily claim, gameplay-rule, scoring, or Elo/rating changes.
- Broad Profile/public-profile model simplification, visibility/moderation contract changes, account deletion, privacy controls, top-right player-chip popover, or route-architecture changes.
- Stats redesign, cloud stats, multiplayer stats, public stats expansion, or HUD economic controls.
- Private Practice expansion, private Daily, ranked Daily, ranked direct challenges, Daily invitations, inbox/mailbox, social requests, or notification delivery contracts.
- Live identity expansion, spectator presence/count/list, spectator sorting, viewer tracking, public/guest spectation contract changes, service workers, push subscriptions, or background push.
- Broad shell redesign, compact/collapsible side dock, configurable Home widgets, top-right Daily consolidation, richer tutorial media, full Help rebuild, theme proposal modernization, or concrete theme implementation.

## Evidence

- `planning/phase-50/PLANNING-BRIEF.md`
- `planning/specs/phase-50/PHASE-50-SOLO-COMPLETION-PERSISTENCE-AND-CURRENT-SURFACE-CONVENIENCE-SPEC-2026-07-06.md`
- `planning/phase-50/IMPLEMENTATION-PLAN.md`
- `planning/phase-50/CHANGELOG.md`
- `progress/PROGRESS-STEP-459.md` through `progress/PROGRESS-STEP-467.md`
- `test-results/visual-review/phase-50-review-candidate/manifest.md` when present locally.

## Review Result

- [x] Final acceptance/closure or Final Acceptance Backup has separate explicit authorization after manual review acceptance.
- [x] Hosted/live manual review attempted on the Phase 50 Review Candidate.
- [x] Manual review accepted for the current Solo/current-surface checklist items.
- [x] Failed directly Phase 50-related items have been recorded for same-phase Review Follow-up before final acceptance.
- [x] User explicitly routed the completion re-entry failures, mobile scroll lag, auto-scroll policy change, and process/autonomy repair into Phase 50 rather than a new phase.
- [x] Same-phase recovery implementation and automated verification were completed before requesting recovered hosted/live manual review.
- [x] Follow-up hosted/manual Daily Solo completion failures from 2026-07-07 were recorded for same-phase Review Follow-up before final acceptance.
- [x] Cross-browser same-phase recovery implementation and automated verification were completed before requesting another recovered hosted/live manual review.
- [x] Cross-browser recovered hosted/live manual review found the major Solo completion terminal-restore issue resolved.
- [x] New Daily-only manual-review regressions were recorded for same-phase Review Follow-up before final acceptance.
- [x] If a Review Candidate Backup was used, it was treated as live/device review access only and not as final Phase 50 closure.
- [x] GO final-definition duplication was recorded for same-phase Review Follow-up before final acceptance.
- [x] User routed the multiplayer focus/refocus flash and E2E multiplayer test-lobby cleanup expectations into Phase 50 before final closure.
- [x] Multiplayer focus/refocus follow-up has been implemented and verified locally.
- [x] Multiplayer focus/refocus follow-up has been backed up for hosted/manual review if needed and accepted before final Phase 50 closure.
- [x] Practice Solo persistence follow-up has been backed up and accepted by the user before final Phase 50 closure.
- [x] User routed the refresh rerouting issue into Phase 50 before final closure.
- [x] Refresh routing follow-up has been implemented and verified locally before final Phase 50 closure.
- [x] Refresh routing preserve-current-surface follow-up has been backed up for hosted/live manual review.
- [x] Refresh Home reset second-pass follow-up has been backed up and reported passing by the user before final Phase 50 closure.
- [x] User routed the multiplayer matchmaking, first-turn persistence, private forfeit/cancel, Daily/Practice lobby flash-revert, and ranked queue invalid-JSON regressions into Phase 50 before final closure.
- [x] Multiplayer matchmaking and first-turn persistence recovery has been implemented and verified locally before final Phase 50 closure.
- [x] Ranked Practice cross-browser finalization/routing recovery has been implemented and verified locally before final Phase 50 closure.
- [ ] Ranked Practice cross-browser finalization/routing recovery has been accepted in hosted/live manual review before final Phase 50 closure.
- [x] User reported that preserve-current-surface refresh behavior improved but remained inconsistent, and routed the simpler Home-on-refresh policy into Phase 50.
- [x] Refresh Home reset follow-up has been implemented, backed up if needed, and accepted by the user before final Phase 50 closure.
