# Phase 50 Changelog

**Status**: Solo Cloud Persistence Overhaul Recovered Locally And Backup Prompt Prepared.
**Phase**: Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 50 attempted to repair the completed Solo re-entry bug reported after Phase 49 manual review and added two small current-surface conveniences that were audited as source-only and low risk.

Hosted/live manual review on 2026-07-06 found that the completed Solo Daily/Practice OG/GO repair did not work reliably enough to accept Phase 50. Profile now exposes separated account-management actions for Settings and Sign out while keeping Settings canonical. The Progression HUD now offers an explicit Open Stats action while remaining display-only and active-scope-owned.

Same-phase recovery later on 2026-07-06 repaired the first hosted/manual completion failure pattern, added reload-based Playwright coverage, simplified Solo auto-scroll behavior, and reran the full local verification gate. A later hosted/manual review on 2026-07-07 still found signed-in Daily Solo completion restore failures on mobile browsers, so Phase 50 returned to same-phase Review Follow-up again. The cross-browser recovery added authenticated Daily OG/GO coverage and mobile shell scroll mitigation. The next hosted/manual review found that the major terminal-restore problem appears fixed, but identified two Daily-only regressions: deleted Daily OG draft letters could reappear, and settled Daily GO rows could replay visual animations on keyboard input. The Daily Solo polish follow-up recovered those regressions locally and passed the full local verification gate. A later hosted/manual review found one remaining GO terminal UI polish issue: Solo GO could duplicate the final solved definition panel after chain completion. The GO definition deduplication follow-up recovered that locally, verified Multiplayer GO was not affected, and was backed up for hosted/live review. The user then reported that the current manual checklist items pass, including the guest versus signed-in Solo persistence behavior and past Solo Daily coin-unlock behavior. The multiplayer-only focus/refocus flash follow-up preserved the accepted Solo behavior, fixed same-account progress-hydration multiplayer state flicker, added two-client E2E coverage, hardened E2E multiplayer row cleanup, and passed the full local verification gate. Phase 50 remains open for a recovered Review Candidate Backup and hosted/live manual review before final acceptance.

After the multiplayer focus backup and the user's manual checklist update, the user requested a deeper same-phase Phase 50 response to signed-in Solo cloud persistence timing inconsistencies. A planning-only audit found that signed-in Solo still relied primarily on debounced whole-progress `progress_snapshots` uploads and compact completion summaries. The follow-up implementation keeps `progress_snapshots` for aggregate progress while adding immediate signed-in Solo session/event persistence through the existing user-owned `game_history` table.

No new Supabase migration, new table, RLS/RPC/table/bucket change, Supabase remote operation, deployment configuration, gameplay-rule change, reward formula change, scoring change, Elo/rating change, Git/GitHub action, backup workflow, release, merge, final Phase 50 closure, next-phase work, or stable `brrrdle` repository work was performed in the implementation step.

## Solo Cloud Persistence Overhaul Implementation - 2026-07-07

Implemented:

- Added a signed-in Solo cloud repository over the existing RLS-protected `game_history` table using `solo-cloud-session-v1` entries keyed by Solo lane, date/seed, difficulty, word length, and GO chain count.
- Signed-in Solo OG/GO now writes immediately after accepted valid guesses, successful Pay-to-Continue mutations, and reveal/loss mutations. Draft typing and deletions remain local and do not create cloud history events.
- Authenticated progress hydration now loads recent Solo cloud session records and merges them into the existing in-progress resume slots or completed display-only Solo slots before auto-resume/re-entry decisions.
- Sign-out waits for any pending Solo cloud write before dropping the authenticated session.
- Guest play remains local-first; explicit guest-to-account transfer boundaries remain unchanged.
- `progress_snapshots` remains the aggregate progress/settings/stats/coins/XP/completed-ID compatibility path.

Storage decision:

- No new migration was required because `game_history` already exists from Phase 8 with RLS policies allowing each authenticated user to read, insert, and update only their own rows.
- The `game_history` entries intentionally store answer-bearing serialized Solo sessions only behind user-owned RLS; public profile, leaderboard, spectator, and guest surfaces do not read these entries.

Verification:

- `npm run build` passed with the existing Vite large-chunk advisory.
- Focused unit coverage for Solo cloud keying and hydration passed: `src/account/soloCloudProgress.test.ts`.
- Focused Solo completion E2E passed: 8 tests, including fresh-browser signed-in Daily GO puzzle-two hydration and fresh-browser signed-in completed Daily OG/GO hydration.
- `npm run lint` passed.
- `npm run test`: 129 files, 895 tests passed.
- `npm run test:e2e`: 46 tests passed.
- `npx tsc -p tsconfig.api.json --noEmit` passed.

Next action:

- Use `prompt-packages/phase-50/PHASE-50-SOLO-CLOUD-PERSISTENCE-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-07.md` to authorize a Solo-cloud-persistence recovered Review Candidate Backup for hosted/live manual review while keeping Phase 50 open.

## Solo Cloud Persistence Overhaul Planning - 2026-07-07

Finding:

- Signed-in Solo state currently relies primarily on whole-progress `progress_snapshots` uploads.
- Authenticated progress uploads are debounced and asynchronous, so fast sign-out/sign-in flows can outrun the newest cloud write.
- Solo OG/GO components capture serialized sessions through `onResumeCapture`, but authenticated persistence still routes through the debounced snapshot path for nonterminal changes.
- Terminal completion creates a compact completion summary and requests a quick flush, but the flush is still async and not a durable per-turn event record.
- Existing visible history is capped completion-summary history, not full per-guess Solo account history.
- The `game_history` table exists in the account schema, but source inspection found no active Solo gameplay write path to it.

Recommendation:

- Keep `progress_snapshots` for aggregate progress, settings, stats, coins, XP, completed IDs, and compatibility.
- Add a durable signed-in Solo cloud contract for per-session/per-event state.
- Write every valid submitted signed-in Solo guess and every significant Solo mutation immediately to cloud when online.
- Hydrate authenticated Solo lanes from the new cloud contract before falling back to stale snapshot/local display state.
- Keep guest play local-first and preserve explicit transfer boundaries.

Next action prepared:

- Created `planning/phase-50/SOLO-CLOUD-PERSISTENCE-AUDIT-AND-STRATEGY-2026-07-07.md`.
- Created an ignored local prompt package for a bounded same-phase implementation/testing follow-up: `prompt-packages/phase-50/PHASE-50-SOLO-CLOUD-PERSISTENCE-OVERHAUL-PROMPT-2026-07-07.md`.

## Multiplayer Focus Follow-Up Implementation - 2026-07-07

Root cause:

- Authenticated focus/visibility refresh hydrates the signed-in account progress blob.
- The progress blob can contain stale or empty cached multiplayer state, while signed-in async multiplayer games are actually owned by the Supabase multiplayer repository.
- Before this follow-up, same-account progress hydration could temporarily replace the visible multiplayer state with the progress-cache state until the async multiplayer repository reloaded, producing a brief multiplayer list/count flash when switching focus between signed-in browser windows.

Implemented:

- Added a scoped progress/multiplayer state selection helper so same signed-in-account progress hydration preserves the currently visible async multiplayer state.
- Kept identity changes safe: switching accounts or returning to guest scope still uses the next scoped progress state rather than leaking the previous account's multiplayer rows.
- Trimmed multiplayer subscription/focus-refresh effect dependencies to avoid unnecessary resubscribe/reload churn on auth-object, subtab, or selected-game-only changes.
- Kept previous Live spectator rows visible when a transient live spectator refresh fails instead of clearing rows and flashing counts to zero.
- Added a real two-client Playwright regression that signs in two temporary users, opens and joins a Practice Multiplayer OG match, switches focus between pages, and records any active-game empty-state/count flashes.
- Hardened E2E cleanup so temporary multiplayer rows involving E2E users are checked after deletion; cleanup now fails loudly if any matching temporary rows remain.

Solo persistence hardening:

- Re-ran the full Solo completion re-entry Playwright file.
- Confirmed Daily OG deleted-draft stability, Daily GO settled-row animation stability, Practice OG/GO terminal re-entry, Daily OG/GO terminal re-entry, and authenticated Daily OG/GO reload/account-hydration persistence remain covered and passing.

Verification:

- Pre-fix focused regression failed for same-account progress hydration selecting stale cached multiplayer state.
- Post-fix focused regression passed.
- New focused two-client multiplayer focus/refocus Playwright spec passed.
- Focused Solo completion re-entry Playwright spec passed: 7 tests.
- `npx tsc -p tsconfig.app.json --noEmit` passed.
- `npm run lint` passed.
- `npm run test`: 128 files, 891 tests passed.
- `npm run test:e2e`: 45 tests passed.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.

Next action prepared:

- Create a recovered Review Candidate Backup prompt so the locally recovered multiplayer focus follow-up can be backed up for hosted/live manual review while keeping Phase 50 open.

## Hosted Manual Review Pass And Multiplayer Focus Follow-Up Prompt - 2026-07-07

Passed by user manual review:

- Current guest versus signed-in Solo progress, completion persistence, and lack-of-cross-scope persistence now work as intended.
- Completed Solo final guesses, all-green rows, definitions, and end-game screens persist after refresh and navigation re-entry.
- Daily Solo OG deleted draft letters stay deleted after scroll and route re-entry.
- Daily Solo GO settled rows no longer flash/replay on ordinary keyboard input.
- GO terminal definitions no longer duplicate the final solved answer definition.
- Past Solo Daily OG/GO coin unlocks appear to work correctly.

New same-phase follow-up recorded:

- Multiplayer surfaces can flash or briefly redraw content when focus switches between two signed-in browser/account windows during multiplayer testing.
- The user observed the issue on Multiplayer Overview, Practice Multiplayer, Lobby, and Live subtab count display.
- The user did not observe the issue on Daily Multiplayer, Active Games, or Solo surfaces.
- Old E2E-hosted practice multiplayer games can be visible in some browsers; the next follow-up should audit cleanup so test lobbies/games are closed or safely cleaned up by final Phase 50 closure.

Next action prepared:

- Created an ignored local prompt package for a bounded same-phase follow-up that preserves the now-good Solo persistence state with hardened regression coverage, reproduces and fixes the multiplayer focus/refocus flash as narrowly as possible, audits E2E multiplayer lobby cleanup, updates progress, and returns Phase 50 to Review Candidate.
- The prompt includes placeholder-only optional current Daily solution inputs for future real Daily Solo OG/GO E2E/manual-test assistance. Raw answers, credentials, secrets, and private account data must remain out of tracked files, reports, screenshots, logs, and final responses.

Still pending:

- The multiplayer focus/refocus follow-up implementation, verification, and any subsequent Review Candidate Backup for hosted/live review remain separately authorized future actions.
- Final Phase 50 acceptance/closure and any Final Acceptance Backup remain separately authorized future actions.

## GO Definition Deduplication Follow-Up Update - 2026-07-07

Recovered:

- Daily Solo GO and Practice Solo GO no longer render the final solved answer definition twice after completed GO chain restore.
- The pre-fix component regression reproduced both Solo GO variants rendering six `Definitions` panels for a five-puzzle completed chain.
- `GoGame` now suppresses the separate terminal current-puzzle definition panel when that answer is already represented in the solved GO-chain definition list.
- Loss/reveal paths remain able to show the current answer definition because the guard only suppresses the panel when the current answer is already solved.
- Multiplayer GO was audited at the component level and already rendered one terminal answer/definition section with one definition panel per answer for both Practice and Daily scopes.

Preserved:

- Completed Solo terminal persistence, Daily Solo polish fixes, Practice Solo behavior, GO solved-row hold/transitions, share result behavior, reward idempotence, and multiplayer terminal behavior.
- Definition lookup provider order and Google search fallback were unchanged.

Still pending:

- A GO-definition recovered Review Candidate Backup is required before hosted/live desktop and mobile manual review.
- Manual review should re-check Daily Solo GO, spot-check Practice Solo GO, and optionally inspect completed Practice/Daily Multiplayer GO definitions on the hosted/live candidate.
- Final acceptance/closure and any Final Acceptance Backup remain separately authorized future actions.

## GO Definition Deduplication Manual Review Finding - 2026-07-07

Manual review after the Daily Solo polish Review Candidate Backup reported that Daily Solo GO terminal definitions can duplicate the final solution definition:

- the solved GO chain correctly shows definitions for solved words;
- after that list, the final solved word can appear a second time in a separate terminal definition panel;
- the screenshot evidence showed the final GO answer definition rendered once inside the all-solved list and once again below it.

This finding is directly phase-related because Phase 50 is still in Manual Review Window and the issue is a small terminal UI polish bug on the completed GO surface. The next same-phase prompt should reproduce the redundancy, fix it for Daily Solo GO, check and fix Practice Solo GO if affected, audit Multiplayer GO terminal definitions, and add focused regression coverage. Final acceptance/closure and any backup remain separately gated.

No source/runtime implementation, test implementation, Git/GitHub action, backup workflow, deployment, release, migration, next-phase work, or stable `brrrdle` repository work was performed while recording this finding and preparing the prompt artifact.

## Daily Solo Polish Follow-Up Update - 2026-07-07

Recovered:

- Daily OG and Daily GO now keep stable in-progress Daily session keys instead of remounting on every resume-slot timestamp change.
- Completed Daily OG and Daily GO still include completed display evidence in their session keys so terminal evidence arriving after account hydration remounts into the solved end screen.
- The session-key helper now lives outside the React component files to preserve the app's fast-refresh lint contract.
- E2E coverage now asserts Daily OG deleted draft letters stay cleared after scroll and route re-entry.
- E2E coverage now asserts Daily GO settled rows do not replay reveal animations during ordinary keyboard input.

Preserved:

- Practice Solo OG/GO behavior remains protected by the existing Practice completion re-entry checks.
- The cross-browser signed-in Daily OG/GO terminal-restore regression remains protected.
- Ordinary Solo auto-scroll reduction remains intact.
- Completion IDs and reward guards remain unchanged.

Still pending:

- A Daily-polish recovered Review Candidate Backup is required before hosted/live manual review on desktop/mobile.
- Manual review must verify the two Daily-only polish items on the new hosted/live candidate.
- Final acceptance/closure and any Final Acceptance Backup remain separately authorized future actions.

## Cross-Browser Recovered Hosted Manual Review Update - 2026-07-07

Passed or improved:

- Completed Solo final solved rows and end-game screens now appear to persist after refresh or navigation away/back in the hosted/live review candidate.
- Practice Solo OG and Practice Solo GO appear correct after the cross-browser recovery and should be preserved by any follow-up.
- Ordinary Solo auto-scroll behavior and the remaining Profile, Settings, Progression HUD, and artifact-boundary checklist items appeared to pass in manual review.

Failed Daily-only follow-up items:

- Daily Solo OG can restore deleted draft letters after typing, deleting, then scrolling or navigating away/back.
- Daily Solo GO can replay or flash already-settled solved/carry-forward rows when the user types a new guess after earlier GO-chain puzzles have solved rows.

Next same-phase follow-up should compare Daily behavior against the now-good Practice behavior, preserve the terminal-persistence fix, and add focused regression coverage before returning to Review Candidate.

## Hosted Manual Review Update - 2026-07-07

Phase 50 remained not accepted after the recovered hosted candidate.

Failed manual-review items:

- Daily Solo completion still did not reliably restore the solved terminal screen after navigating away and returning.
- In one mobile browser path, returning to the solved Daily surface cleared the board instead of restoring the completed game.
- In another Android browser path, returning to the solved Daily surface showed submitted letters but did not restore the all-green final row or end-game screen.

Passed or improved manual-review items:

- The ordinary Solo auto-scroll reduction improved the unwanted automatic page-jump behavior.
- The remaining optional Profile, Settings, Progression HUD, and artifact-boundary items from the earlier hosted checklist stayed accepted.

Additional same-phase follow-up:

- Reproduce the signed-in hosted Daily Solo completion failure with account hydration and browser history/reload behavior.
- Strengthen E2E coverage so authenticated Daily OG and Daily GO terminal state must remain visible after reload, route re-entry, and browser Back/Forward.
- Improve mobile scroll smoothness further without reintroducing broad automatic Solo page scrolling.

## Cross-Browser Recovery Update - 2026-07-07

Recovered:

- Completed Solo display evidence now outranks in-progress resume slots for Practice and Daily OG/GO surfaces, preventing stale cloud in-progress hydration from hiding a locally completed terminal display.
- Completed Daily display evidence is no longer filtered out merely because cloud `completedGameIds` has not caught up during signed-in hydration. The existing Daily game setup still rejects stale previous-day evidence.
- Daily OG/GO session keys now include completed-resume update identity when display evidence arrives after account hydration, forcing the game surface to remount into the terminal display instead of keeping an already-mounted stale session.
- Authenticated Solo completion now schedules an immediate progress sync flush after terminal reward recording instead of waiting only for debounce timing.
- E2E now asserts all-green final-row tile styling, direct browser Back/Forward, and signed-in Daily OG plus Daily GO terminal restore after reload and account hydration.
- Mobile scroll mitigation now disables the animated lunar canvas and masked noise overlay below `720px`, replacing them with a static mobile background while preserving the broader visual theme.
- Cross-browser Playwright coverage passed in Chromium, Firefox, WebKit, and mobile Chromium emulation for the Solo completion re-entry suite. Firefox/WebKit-specific benign external warning guards were narrowed to known Supabase cookie-domain and definition-lookup noise.

Still pending:

- A cross-browser recovered Review Candidate Backup is required before hosted/live desktop and mobile manual review.
- Manual review must still verify the failed Daily/Practice completion persistence checklist items on the new hosted/live candidate.
- Final acceptance/closure and any Final Acceptance Backup remain separately authorized future actions.

## Hosted Manual Review Update - 2026-07-06

Phase 50 is not accepted.

Failed manual-review items:

- Completed Practice OG did not restore the winning row or game-end screen after returning to the solved puzzle surface.
- Completed Practice GO did not restore the final solved chain or game-end screen after returning to the solved puzzle surface.
- Completed Daily Solo state did not persist after navigating away and back; the Daily surface restarted fresh and lost submitted guesses.

Passed manual-review items:

- Practice new puzzle/new chain remains explicit.
- Profile account-management actions remain separated from profile editing.
- Profile-to-Settings navigation uses the existing Settings route.
- Progression HUD opens Stats and remains display-only.
- Phase 50 visual handoff artifacts remain local-only and ignored.

Additional same-phase follow-up:

- Investigate and repair mobile/general scroll lag regression.
- Remove broad automatic page scrolling for ordinary Solo/Practice/Daily navigation. Keep auto-scroll only for explicit routed-game targets such as notifications or direct game-specific handoffs.
- Improve the automated E2E coverage so the exact hosted/manual re-entry paths fail before repair and pass before the next Review Candidate.

## Same-Phase Recovery Update - 2026-07-06

Recovered:

- Added a local terminal-display cache for completed Solo sessions using existing serialized OG/GO session evidence. `resumeSlots` remain in-progress-only, while completed boards can re-render after route changes and reloads.
- Persisted selected Solo game keys for Daily/Practice OG/GO mode choices so reload returns to the selected surface instead of defaulting Daily back to OG.
- Added reload coverage to `e2e/gameplay/solo-completion-reentry.spec.ts`; the new assertion failed against the broken candidate for Practice OG before the source repair and now passes across Practice OG, Practice GO, Daily OG, and Daily GO.
- Removed ordinary Solo page auto-scroll from route/subtab/mode selection and normal keyboard gameplay. Notification/direct-game routing can still request explicit auto-centering.
- Updated mobile scroll E2E so ordinary Solo navigation and physical-keyboard submission must not call app-level `scrollIntoView`, while route pages remain manually scrollable and overflow-safe.
- Reordered definition lookup fallback to prefer bundled definitions, then Wiktionary, then Dictionary API, reducing browser console noise from Dictionary API CORS failures on terminal GO definition panels.

Still pending:

- A recovered Review Candidate Backup is required before hosted/live manual review on desktop/mobile.
- Manual review must still verify the first three checklist items on the recovered hosted/live candidate.
- Final acceptance/closure and any Final Acceptance Backup remain separately authorized future actions.

## Completed

- Processed the clean Phase 49 manual-review result and user follow-up notes into Phase 50 planning, specification, and detailed implementation planning.
- Preserved the user-updated `planning/phase-49/REVIEW-CHECKLIST.md`.
- Reproduced the completed Solo terminal-state loss across:
  - Practice OG;
  - Practice GO;
  - Daily OG under deterministic browser time;
  - Daily GO under deterministic browser time.
- Chose and implemented a source-only completed Solo display contract:
  - `resumeSlots` remain in-progress-only;
  - `completedGameIds` remains the authoritative duplicate-reward guard;
  - App-owned session-local completed Solo display evidence restores terminal UI for the selected Solo lane;
  - completed display evidence resets across active progress-owner hydration to preserve guest/account boundaries.
- Repaired Solo Daily/Practice OG/GO route re-entry and browser Back/Forward behavior so the final winning row and completed state remain visible until the user explicitly starts the next Practice puzzle/chain or the existing Daily lifecycle changes.
- Hardened reward idempotence with browser coverage proving repeated re-entry does not duplicate completed IDs, history rows, XP, coins, stats, streak-affecting entries, or resume slots.
- Added same-phase recovery coverage proving completed Solo terminal UI survives full app reload after completion across Practice/Daily OG/GO.
- Repaired the hosted/manual Daily GO reload fallback by persisting the selected Solo game key when choosing Daily/Practice OG/GO.
- Removed normal Solo gameplay keyboard auto-centering and ordinary Solo route/mode auto-scroll while preserving explicit routed-game auto-center hooks.
- Added local-only completed Solo display storage scoped by progress owner without writing raw account identifiers to the display-cache payload.
- Audited optional Profile and HUD conveniences and kept them bounded to existing source-only routes and handlers.
- Added separated Profile account-management actions:
  - `Open Settings account management`;
  - `Sign out`;
  - Settings remains the home for password, sync, export, reset, and broader account controls.
- Added a Progression HUD `Open Stats` action wired to the existing Stats route.
- Preserved the HUD as display-only Level, Coins, and XP progress for the active local/account progress scope.
- Recovered the final-hardening full E2E blocker by rerunning the failed ranked Practice queue reliability subset, then rerunning the full E2E suite cleanly without source/test changes.
- Ran a local-only visual handoff review for Phase 50 user-visible surfaces under `test-results/visual-review/phase-50-review-candidate/`.
- Created this changelog and the Phase 50 manual review checklist.

## Process Updates During Phase 50

- Prompt-package workflow guidance now requires a fenced markdown activation prompt whenever a prompt-package artifact is generated.
- Governance now formalizes the Review Candidate, Manual Review Window, and Review Follow-up model.
- Blocked final reports now require a practical next-step recommendation and may create a bounded recovery prompt when the recovery path is safe and agent-owned.

These workflow updates did not authorize runtime feature expansion, Git/GitHub handoff, Review Candidate Backup, Final Acceptance Backup, deployment configuration, release, merge, or stable-repository work.

## Preserved

- Phase 49 Progression HUD display-only ownership, Focus Mode boundaries, shell route recovery, mobile shell preservation, and no-storage-change decisions.
- Phase 48 Profile/Settings clarity, custom-code hiding/legacy handling, private Practice request preservation, and private Daily/ranked Daily protected addendum routing.
- Phase 47 mobile Solo GO keyboard visibility and guest/account display-boundary repairs.
- Phase 46 automatic signed-in Solo sync/freshness, no implicit guest-to-account transfer, no authenticated progress writes to guest storage, and Solo Overview Resume-only cards.
- Phase 45 Daily/Practice Solo account-boundary repairs, Profile embedded sign-in order, and mobile Solo scaling follow-up.
- Phase 44 account-scoped local-state repairs, private Practice request eligibility, sign-in modal order, header chip removal, Stats placement, Help placeholder, and keyboard-centering behavior.
- Phase 43 ranked queue fairness/current-surface cleanup, route information architecture, shell/Home cleanup, Solo/Practice Multiplayer density cleanup, notifications, back-to-top behavior, and spectator comfort.
- Phase 42 public stats, admin dashboard, Help/tutorial route, Supabase/RLS grant repairs, and ranked queue flashing repair.
- Phase 41 multiplayer reliability repairs and real Supabase-backed E2E harnesses.
- Phase 40 public profile route/card, clickable safe identity, authenticated-only private Practice matchmaking, and v2 accept-contract boundaries.
- Phase 39 mobile scroll smoothness, mobile scroll/layout harness, and Word Explorer tuning.
- Phase 38 public/guest Practice Live discovery, read-only public/guest spectation, Daily spectator exclusion, and false-only mutation capability boundaries.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, five-letter invariants, and unrated Daily behavior.
- Existing gameplay rules, answer generation, dictionary behavior, word validation, Hard Mode validation, scoring, timeout, forfeit, rating/Elo formula, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior.

## Deferred

- Review Candidate Backup, Final Acceptance Backup, PR, merge, release, deployment configuration, and production configuration changes unless separately authorized.
- New storage schema, new Supabase/RLS/RPC/table/bucket, migration, destructive cloud progress changes, and deployment-configuration changes.
- Broader resume/session contracts, one-active-session leases, server-authoritative Daily submissions, forced sign-out, remote invalidation, and session security work.
- Reward formula, XP curve, level curve, coin economy, inventory, consumable, Pay-to-Continue, reveal-answer, marketplace, monetization, stats-calculation, Daily claim, gameplay-rule, scoring, and Elo/rating changes.
- Broad Profile/public-profile model simplification, visibility/moderation contract changes, account deletion, privacy controls, top-right player-chip popover, and route-architecture changes.
- Stats redesign, cloud stats, multiplayer stats, public stats expansion, and HUD economic controls.
- Private Practice expansion, private Daily, ranked Daily, ranked direct challenges, Daily invitations, inbox/mailbox, social requests, and notification delivery contracts.
- Live identity expansion, spectator presence/count/list, spectator sorting, viewer tracking, public/guest spectation contract changes, service workers, push subscriptions, and background push.
- Broad shell redesign, compact/collapsible side dock, configurable Home widgets, top-right Daily consolidation, richer tutorial media, full Help rebuild, theme proposal modernization, and concrete theme implementation.

## Verification

Original Review Candidate verification is recorded in `progress/PROGRESS-STEP-467.md`; hosted manual-review failure and recovery prompt preparation are recorded in `progress/PROGRESS-STEP-472.md`; same-phase recovery verification is recorded in `progress/PROGRESS-STEP-473.md`.

Same-phase recovery evidence:

- Pre-fix reproduction: the new reload assertion in `e2e/gameplay/solo-completion-reentry.spec.ts` failed for completed Practice OG before the terminal-display cache repair.
- Focused unit tests: resume-slot/display-cache, dashboard/notification auto-scroll policy, and definition provider order passed.
- Focused Solo completion Playwright: 4 tests passed across Practice/Daily OG/GO with route, browser Back, and reload re-entry.
- Focused mobile scroll/layout Playwright: 15 tests passed, including no app-level `scrollIntoView` for ordinary Solo navigation and physical-keyboard submission.
- `npm run lint` passed.
- `npm run test`: 127 files, 881 tests passed.
- First `npm run test:e2e` recovery run: 40 passed, 1 ranked search-again test failed once; targeted rerun of that test passed.
- Clean `npm run test:e2e` rerun: 41 tests passed.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.

Key Review Candidate evidence:

- Focused Phase 50 Vitest slice: 8 files, 62 tests passed.
- Focused HUD Playwright check: 1 test passed.
- Focused Solo completion Playwright check: 4 tests passed.
- `npm run lint` passed.
- `npm run test`: 126 files, 875 tests passed.
- Failed ranked Practice queue E2E subset rerun: 2 tests passed, no code change required.
- `npm run test:e2e`: 44 tests passed.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.
- Local-only visual capture: 4 Playwright capture tests passed, generating 5 screenshots and `test-results/visual-review/phase-50-review-candidate/manifest.md`.
- Final repository hygiene checks passed.

Phase 50 returned from Review Candidate to same-phase Review Follow-up after hosted manual review failed required Solo completion persistence checks. A later separately authorized Review Candidate Backup may be used again for hosted/live device review without closing the phase. Manual review acceptance, Final Acceptance Backup, deployment configuration, release, merge, and stable-repository work remain unexecuted.
