# Phase 50 Manual Review Checklist

**Status**: Cross-browser same-phase recovery implemented - awaiting recovered hosted manual review.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-06.
**Evidence**: `planning/phase-50/CHANGELOG.md`, `progress/PROGRESS-STEP-467.md`, `progress/PROGRESS-STEP-472.md`, `progress/PROGRESS-STEP-473.md`, `progress/PROGRESS-STEP-475.md`, and local-only visual manifest `test-results/visual-review/phase-50-review-candidate/manifest.md` when present.

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

The failed hosted manual-review boxes below intentionally remain unchecked until the user verifies the next hosted/live candidate.

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
- Storage schema, cloud progress contract, Supabase migration, RLS/RPC/table/bucket changes.
- Gameplay-rule, reward-formula, scoring, Elo/rating, Daily claim, or multiplayer feature changes.
- Stable `brrrdle` repository work.

## Must Manually Verify

- [ ] **Failed in hosted manual review 2026-07-06; recovered by Codex verification and awaiting next hosted check:** Completed Practice OG keeps the final winning row and completed state after re-entry.
  - Expected: after solving a Practice OG puzzle, navigating away and returning through browser Back or the Solo/Practice route still shows the final winning row, completed status, share result, and definitions.
  - Suggested steps: open Solo -> Practice Solo -> OG, solve a safe Practice puzzle, navigate Home, use browser Back, then route away and back through Solo -> Practice Solo -> OG.
  - Evidence: `progress/PROGRESS-STEP-473.md`, `progress/PROGRESS-STEP-475.md`; focused Playwright reload/back coverage in `e2e/gameplay/solo-completion-reentry.spec.ts`.

- [ ] **Failed in hosted manual review 2026-07-06; recovered by Codex verification and awaiting next hosted check:** Completed Practice GO keeps the final solved chain after re-entry.
  - Expected: after solving all Practice GO puzzles, route re-entry still shows the completed chain, the fifth solved row, share result, and definitions.
  - Suggested steps: open Solo -> Practice Solo -> GO, solve a safe Practice GO chain, navigate Home, return through Solo -> Practice Solo -> GO, and inspect the terminal state.
  - Evidence: `progress/PROGRESS-STEP-473.md`, `progress/PROGRESS-STEP-475.md`; focused Playwright reload/back coverage in `e2e/gameplay/solo-completion-reentry.spec.ts`.

- [ ] **Failed in hosted manual review 2026-07-06 and 2026-07-07; recovered by cross-browser Codex verification and awaiting next hosted check:** Completed Daily OG and Daily GO keep terminal Solo state without duplicate rewards.
  - Expected: Daily Solo OG/GO completed state remains visible for the current Daily cycle, and re-entry does not duplicate XP, coins, history, stats, streak entries, Daily claims, or completed IDs.
  - Suggested steps: in a safe browser/profile, complete Daily Solo OG and/or Daily Solo GO if available, record visible Level/Coins/XP, navigate away/back, and confirm the completed screen remains without another reward bump.
  - Evidence: focused signed-in Playwright reload/account-hydration coverage in `e2e/gameplay/solo-completion-reentry.spec.ts`; `progress/PROGRESS-STEP-473.md`; `progress/PROGRESS-STEP-475.md`.

- [ ] Ordinary Solo navigation no longer auto-scrolls the page during normal route/subtab/mode changes or physical-keyboard play.
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

## Optional Nice-To-Check

- [ ] Try browser refresh after completed Practice OG/GO.
  - Expected: no duplicate rewards; completed UI behavior remains understandable.
- [ ] Try completed Solo re-entry while signed in with a safe test account.
  - Expected: guest/account boundaries remain safe and rewards do not duplicate.
- [ ] Try the Profile account-management section at mobile width.
  - Expected: buttons remain readable and do not overlap with profile editing controls.
- [ ] Try HUD-to-Stats navigation at mobile width.
  - Expected: the HUD action remains accessible and Stats remains scrollable without horizontal overflow.
- [ ] Review the local-only visual screenshots if available.
  - Expected: each screenshot in `test-results/visual-review/phase-50-review-candidate/manifest.md` visually matches its scenario description.

## Preserved Invariants To Spot-Check

- [ ] Resume slots remain in-progress-only; completed Solo display is restored without turning completed games into resumable active games.
- [ ] `completedGameIds` remains authoritative for duplicate reward protection.
- [ ] XP, coins, levels, reward amounts, stats formulas, Daily claims, streak behavior, and progression economy rules remain unchanged.
- [ ] Daily Solo remains tied to the existing Daily lifecycle; Practice Solo remains controlled by explicit new puzzle/new chain actions.
- [ ] Progression HUD remains active-scope local/account display only, not a public profile or leaderboard resource surface.
- [ ] Settings remains the account-management home for password, sync, export, reset, and gated account actions.
- [ ] Profile public/private data contracts, avatar upload behavior, public profile visibility/moderation, and leaderboard/public identity contracts remain unchanged.
- [ ] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.
- [ ] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, five-letter only, and excluded from public/guest spectator discovery.
- [ ] Phase 40 through Phase 49 public profile, private Practice request, multiplayer reliability, public stats/admin/help, mobile shell, account-boundary, sync, Profile/Settings, Progression HUD, and Focus Mode decisions remain intact.

## Known Deferred / Not In Scope

- Final phase closure, Final Acceptance Backup, release, deployment configuration, or production configuration change.
- Storage schema, cloud progress contract, Supabase/RLS/RPC/table/bucket, migration, or deployment-configuration change.
- Broader resume/session contracts, one-active-session leases, server-authoritative Daily submissions, forced sign-out, remote invalidation, or session security work.
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

- [x] Hosted/live manual review attempted on the Phase 50 Review Candidate.
- [ ] Manual review accepted.
- [x] Failed directly Phase 50-related items have been recorded for same-phase Review Follow-up before final acceptance.
- [x] User explicitly routed the completion re-entry failures, mobile scroll lag, auto-scroll policy change, and process/autonomy repair into Phase 50 rather than a new phase.
- [x] Same-phase recovery implementation and automated verification were completed before requesting recovered hosted/live manual review.
- [x] Follow-up hosted/manual Daily Solo completion failures from 2026-07-07 were recorded for same-phase Review Follow-up before final acceptance.
- [x] Cross-browser same-phase recovery implementation and automated verification were completed before requesting another recovered hosted/live manual review.
- [x] If a Review Candidate Backup was used, it was treated as live/device review access only and not as final Phase 50 closure.
- [ ] Final acceptance/closure or Final Acceptance Backup has separate explicit authorization after manual review acceptance.
