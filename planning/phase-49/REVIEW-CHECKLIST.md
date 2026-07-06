# Phase 49 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 49 - Progression HUD, Focus Mode, And Mobile UX Shell Polish.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-06.
**Evidence**: `planning/phase-49/CHANGELOG.md`, `progress/PROGRESS-STEP-452.md`, and local-only visual manifest `test-results/visual-review/phase-49-stage-49-6/manifest.md` when present.

This checklist helps the user manually verify Phase 49 behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment with non-production accounts.
- Do not paste or record secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, tokens, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Codex-Assisted Preflight Summary

Automated proof completed:

- Focused Vitest regression coverage for Phase 49 changed and protected surfaces.
- Focused Playwright mobile layout coverage, including Solo GO keyboard visibility and re-entry checks.
- Local-only visual handoff review under `test-results/visual-review/phase-49-stage-49-6/`.
- `npm run lint`.
- `npm run test`.
- `npm run test:e2e`.
- `npm run test:full`.
- `npm run build` with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.
- Repository hygiene checks recorded in `progress/PROGRESS-STEP-452.md`.

Codex visual/browser review:

- Captured desktop Home with the Progression HUD and inactive Focus control.
- Captured desktop Solo in Focus Mode with Exit focus, route rail, HUD, and Solo buttons visible.
- Captured mobile Solo in Focus Mode with Exit focus, HUD, Settings route access, and Solo buttons visible.
- Captured desktop Settings while Focus Mode remains active and recoverable.
- Captured mobile Settings in the normal shell after Phase 49 shell/HUD changes.

Codex intentionally did not verify:

- Production deployment or release behavior.
- Real user private data or real user accounts.
- Vercel/Supabase configuration changes.
- Persisted Focus Mode or compact-shell preferences.
- Private Daily implementation.
- Ranked Daily implementation.
- Server-authoritative Daily submissions, one-active-session leases, forced sign-out, or session security behavior.
- Spectator presence/count/list behavior, service workers, push subscriptions, gameplay-rule changes, or Elo algorithm changes.

## Must Manually Verify

- [ ] Phase 49 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-49-stage-49-6/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-49-stage-49-6/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `test-results/visual-review/phase-49-stage-49-6/manifest.md`; `progress/PROGRESS-STEP-452.md`.

- [ ] Progression HUD appears in the shell.
  - Expected: the top shell shows a compact `Current progression` HUD with Level, Coins, and XP progress.
  - Suggested steps: open Home, Solo, Settings, and at least one other route as a guest; confirm the HUD is visible and compact.
  - Evidence: `progress/PROGRESS-STEP-450.md`; visual scenario `Desktop Home shell shows the Phase 49 progression HUD and inactive Focus control`.

- [ ] Progression HUD reflects active guest/account scope without implying public exposure.
  - Expected: HUD values represent the current local active progress scope only; they do not expose public profile, leaderboard, spectator, or route metadata resource values.
  - Suggested steps: review as guest, then optionally sign in with a safe test account; confirm HUD values follow the active account/guest state and no public resource exposure appears.
  - Evidence: `progress/PROGRESS-STEP-447.md`; `progress/PROGRESS-STEP-450.md`.

- [ ] Progression HUD is display-only.
  - Expected: the HUD cannot spend coins, reveal answers, continue games, edit progression, open consumable inventory, or trigger economy actions.
  - Suggested steps: click around the HUD area and confirm it behaves as read-only display.
  - Evidence: `progress/PROGRESS-STEP-450.md`.

- [ ] Focus Mode can be entered and exited clearly.
  - Expected: the shell shows a `Focus` control when inactive and `Exit focus` when active; `aria-pressed` state is reflected visually and behaviorally.
  - Suggested steps: open Solo or another primary route, click `Focus`, then click `Exit focus`; confirm the shell returns to normal.
  - Evidence: `progress/PROGRESS-STEP-451.md`; visual scenarios `Desktop Solo route in Focus Mode keeps Exit focus, route rail, HUD, and gameplay entry visible` and `Mobile Solo route in Focus Mode remains navigable with HUD and exit recovery visible`.

- [ ] Focus Mode remains session-local and does not persist unexpectedly.
  - Expected: Focus Mode is not saved as a Settings/profile preference and should reset on a fresh browser session/reload.
  - Suggested steps: turn Focus Mode on, reload the page or open a fresh browser context, and confirm Focus Mode does not remain forced on.
  - Evidence: `progress/PROGRESS-STEP-449.md`; `progress/PROGRESS-STEP-451.md`.

- [ ] Focus Mode preserves route recovery.
  - Expected: route buttons remain visible and usable in Focus Mode, including Settings and Help.
  - Suggested steps: while Focus Mode is active, navigate between Solo, Settings, Help, and Home; confirm you are never stranded.
  - Evidence: `progress/PROGRESS-STEP-451.md`; visual scenario `Desktop Settings remains reachable while Focus Mode is active`.

- [ ] Focus Mode preserves account and attention access.
  - Expected: account controls and notification/attention surfaces remain available; route attention badges/descriptions are not hidden in a way that loses important state.
  - Suggested steps: with safe guest or test account state, open Focus Mode and inspect account controls, notifications if present, and route attention badges if available.
  - Evidence: `progress/PROGRESS-STEP-451.md`.

- [ ] Focus Mode preserves gameplay entry and mobile usability.
  - Expected: Solo Daily/Practice buttons and gameplay keyboard entry remain usable in focused and normal shell states, with no new horizontal overflow.
  - Suggested steps: on mobile, enter Focus Mode on Solo, start or resume a safe Solo Daily/Practice OG/GO game, and confirm the buttons/keyboard remain usable.
  - Evidence: `progress/PROGRESS-STEP-451.md`; focused mobile layout coverage in `progress/PROGRESS-STEP-452.md`.

- [ ] Settings remains readable after the shell/HUD changes.
  - Expected: Settings still shows Account management clearly on desktop and mobile, and the Progression HUD/Focus control do not crowd the Settings surface.
  - Suggested steps: open Settings on desktop and mobile widths with Focus Mode off, then with Focus Mode on if practical.
  - Evidence: visual scenarios `Desktop Settings remains reachable while Focus Mode is active` and `Mobile Settings normal shell remains readable after Phase 49 shell/HUD changes`.

## Optional Nice-To-Check

- [ ] Review the local-only visual screenshots if available.
  - Expected: each screenshot in `test-results/visual-review/phase-49-stage-49-6/manifest.md` visually matches its scenario description.
- [ ] Try Focus Mode at tablet width.
  - Expected: shell compression remains readable and all route buttons remain reachable.
- [ ] Try Focus Mode with reduced motion enabled.
  - Expected: Focus Mode remains usable and does not introduce distracting motion.
- [ ] Try Focus Mode after signing in with a safe test account.
  - Expected: account controls, notifications, Progression HUD, sync behavior, and Settings remain reachable.
- [ ] Try browser Back/Forward while Focus Mode is active.
  - Expected: route/view navigation remains safe and does not trigger gameplay mutations.

## Preserved Invariants To Spot-Check

- [ ] Phase 48 Profile/Settings clarity, custom-code hiding/legacy handling, private Practice request preservation, and private Daily/ranked Daily addendum routing remain intact.
- [ ] Phase 47 mobile Solo GO keyboard visibility and guest/account display-boundary repairs remain intact.
- [ ] Phase 46 automatic signed-in Solo sync/freshness, no implicit guest-to-account transfer, no authenticated progress writes to guest storage, and Solo Overview Resume-only cards remain intact.
- [ ] Phase 45 Daily/Practice Solo account-boundary repairs, Profile embedded sign-in order, and mobile Solo scaling follow-up remain intact.
- [ ] Phase 44 account-scoped local-state repairs, private Practice request eligibility, sign-in modal order, header chip removal, Stats placement, Help placeholder, and keyboard centering remain intact.
- [ ] Phase 43 ranked queue fairness, shell/Home cleanup, Solo/Practice Multiplayer density cleanup, notification comfort, back-to-top behavior, and spectator comfort remain intact.
- [ ] Phase 42 public stats, admin dashboard, Help/tutorial, browser grant/RLS repairs, and ranked queue flashing repair remain intact.
- [ ] Phase 41 multiplayer reliability repairs and real E2E harness behavior remain intact.
- [ ] Phase 40 public profile route/card, clickable safe identity, and private Practice matchmaking boundaries remain intact.
- [ ] Phase 38 public/guest Practice Live discovery, read-only public spectation, Daily spectator exclusion, and false-only mutation boundaries remain intact.
- [ ] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, five-letter only, and excluded from public/guest spectator discovery.
- [ ] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.

## Known Deferred / Not In Scope

- Consumable inventory top-level display.
- Pay-to-Continue or reveal-answer cost context outside gameplay panels.
- New earning, spending, marketplace, inventory, collectible, monetization, or progression mechanics.
- XP formula, level curve, reward amount, coin cost, stats calculation, Daily claim, gameplay-rule, scoring, or Elo changes.
- Persisted Focus Mode or compact-shell preferences.
- Compact navigation implementation beyond the current Focus Mode slice.
- Broad mobile shell, top-tab, route navigation, side-dock, and mobile performance overhaul.
- Compact/collapsible side-dock implementation.
- Configurable Home widgets and private request inbox widgets.
- Private Daily implementation.
- Ranked Daily implementation.
- Server-authoritative Daily submissions.
- Strict one-active-session/session leases, heartbeats, forced sign-out, and remote invalidation.
- New invitation, inbox, social, or notification delivery contracts.
- Live, Active Games, and Home spectator preview cards.
- Notification redesign, rival-name context, and ranked/unranked notification context upgrades.
- Admin queue/lobby observability dashboard.
- Full social inbox/mailbox work and full notification-center redesign.
- Rich tutorial media and full Help rebuild.
- Theme proposal modernization and full concrete theme work.
- Draw-by-repetition or other gameplay-rule changes.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Service workers, push subscriptions, background push, production deployment, and release.
- Elo algorithm changes.

## Evidence

- `planning/phase-49/PLANNING-BRIEF.md`
- `planning/specs/phase-49/PHASE-49-PROGRESSION-HUD-FOCUS-MODE-AND-MOBILE-UX-SHELL-POLISH-SPEC-2026-07-06.md`
- `planning/phase-49/IMPLEMENTATION-PLAN.md`
- `planning/phase-49/CHANGELOG.md`
- `progress/PROGRESS-STEP-443.md` through `progress/PROGRESS-STEP-452.md`
- `test-results/visual-review/phase-49-stage-49-6/manifest.md` when present locally.

## Review Result

- [ ] Manual review complete.
- [ ] Any failed item has a follow-up prompt prepared before Phase 49 Git handoff or additional implementation.
