# Phase 50 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-06.
**Evidence**: `planning/phase-50/CHANGELOG.md`, `progress/PROGRESS-STEP-467.md`, and local-only visual manifest `test-results/visual-review/phase-50-review-candidate/manifest.md` when present.

This checklist helps the user manually verify Phase 50 behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

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
- Focused Playwright coverage for Solo completion re-entry across Practice/Daily OG/GO.
- Focused Playwright coverage for Progression HUD opening the existing Stats route.
- Full local Vitest suite.
- Full Playwright E2E suite.
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

- [ ] Completed Practice OG keeps the final winning row and completed state after re-entry.
  - Expected: after solving a Practice OG puzzle, navigating away and returning through browser Back or the Solo/Practice route still shows the final winning row, completed status, share result, and definitions.
  - Suggested steps: open Solo -> Practice Solo -> OG, solve a safe Practice puzzle, navigate Home, use browser Back, then route away and back through Solo -> Practice Solo -> OG.
  - Evidence: `progress/PROGRESS-STEP-462.md`; visual scenario `Completed Practice OG persists after browser Back re-entry`.

- [ ] Completed Practice GO keeps the final solved chain after re-entry.
  - Expected: after solving all Practice GO puzzles, route re-entry still shows the completed chain, the fifth solved row, share result, and definitions.
  - Suggested steps: open Solo -> Practice Solo -> GO, solve a safe Practice GO chain, navigate Home, return through Solo -> Practice Solo -> GO, and inspect the terminal state.
  - Evidence: `progress/PROGRESS-STEP-462.md`; visual scenario `Completed Practice GO persists after route re-entry`.

- [ ] Completed Daily OG and Daily GO keep terminal Solo state without duplicate rewards.
  - Expected: Daily Solo OG/GO completed state remains visible for the current Daily cycle, and re-entry does not duplicate XP, coins, history, stats, streak entries, Daily claims, or completed IDs.
  - Suggested steps: in a safe browser/profile, complete Daily Solo OG and/or Daily Solo GO if available, record visible Level/Coins/XP, navigate away/back, and confirm the completed screen remains without another reward bump.
  - Evidence: focused Playwright coverage in `e2e/gameplay/solo-completion-reentry.spec.ts`; `progress/PROGRESS-STEP-462.md`.

- [ ] Practice new puzzle/new chain remains the explicit way to move on after completion.
  - Expected: completed Practice Solo OG/GO does not silently start a new puzzle on route re-entry; a new Practice puzzle/chain starts only through the visible Practice action.
  - Suggested steps: after completing Practice OG/GO, route away and back, then use `New practice puzzle` or `New go chain` and confirm the old terminal state is replaced only after that explicit action.
  - Evidence: `planning/phase-50/CHANGELOG.md`; `progress/PROGRESS-STEP-462.md`.

- [ ] Profile account-management actions are present but separated from profile editing.
  - Expected: signed-in Profile shows `Open Settings account management` and `Sign out` in a separate Account management section, not mixed into private/public profile Save/Cancel controls.
  - Suggested steps: sign in with a safe test account, open Profile, inspect the Account management section, and confirm Sign out still works through the existing auth path if you choose to test it.
  - Evidence: `progress/PROGRESS-STEP-464.md`; visual scenario `Profile account-management conveniences`.

- [ ] Profile-to-Settings navigation uses the existing Settings account-management route.
  - Expected: clicking `Open Settings account management` opens Settings and does not create a new account route, modal, or duplicated Settings surface.
  - Suggested steps: from signed-in Profile, click `Open Settings account management`; confirm Settings opens and existing account, sync, export, and reset controls remain canonical there.
  - Evidence: `progress/PROGRESS-STEP-464.md`.

- [ ] Progression HUD opens Stats while staying display-only.
  - Expected: the HUD shows active-scope Level, Coins, and XP progress plus `Open Stats`; clicking it opens the existing Stats route. HUD itself does not edit progression, spend coins, expose public/private profile data, or trigger gameplay actions.
  - Suggested steps: on Home or Solo, click `Open Stats` in the HUD and confirm the Stats route opens with local privacy copy visible.
  - Evidence: `progress/PROGRESS-STEP-464.md`; visual scenarios `Progression HUD Open Stats action` and `Stats opened from Progression HUD`.

- [ ] Phase 50 visual handoff artifacts remain local-only and ignored.
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

- [ ] Manual review complete.
- [ ] Any failed directly Phase 50-related item has a same-phase Review Follow-up prompt prepared before final acceptance.
- [ ] Any broader or unrelated finding has been routed to a new phase/addendum instead of expanding Phase 50.
- [ ] If a Review Candidate Backup was used, it was treated as live/device review access only and not as final Phase 50 closure.
- [ ] Final acceptance/closure or Final Acceptance Backup has separate explicit authorization after manual review acceptance.
