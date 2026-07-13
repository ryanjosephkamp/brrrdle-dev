# Phase 58 Post-Review Forfeit, Badge, And Notification Follow-Up Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` or `superpowers:executing-plans` to implement this plan task by task after explicit user approval.

**Status:** Implemented and verified; Review Candidate backup remains separately gated.

**Goal:** Finish Phase 58 with three bounded corrections: make participant forfeits durably end legacy-compatible unranked Multiplayer games, make every selected subtab attention badge readable, and collapse the notification center only when an `Open` action navigates.

**Architecture:** Keep the three changes independent. Harden ordinary Multiplayer persistence at the repository boundary with explicit write acknowledgment and one evidence-bounded conflict recovery path; use the existing `data-active` hook for a generic selected-badge contrast rule; and keep notification disclosure state inside `NotificationCenter` while wrapping only its navigation action.

**Tech Stack:** React 19, TypeScript 6, Vite 8, Vitest 4, Playwright 1.60, Supabase Postgres/Data API/Realtime, existing functional-shell CSS.

**Outcome:** The repository now validates ordinary update acknowledgments, retries only participant-owned forfeits once after a compare-and-swap miss, restores durable state and reports a stable error when confirmation still fails, applies one high-contrast selected-badge treatment, and collapses notifications only for `Open` navigation. No migration or remote schema change was required.

## Global Constraints

- Work only in `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Do not touch the original stable `brrrdle` repository.
- Preserve the accepted Phase 58 GO selector, Multiplayer refresh-readiness, answer privacy, queue/claim/settlement, Elo, spectator, economy, Solo, and functional-shell contracts.
- Do not implement a global Multiplayer-history wipe or admin cleanup control.
- Do not redesign the UI, install dependencies, change frameworks, deploy, release, close Phase 58, create a checkpoint, or create the future redesign repository.
- Do not print credentials, raw answers, user IDs, emails, private projections, access tokens, or environment values.
- A remote migration, if evidence proves one is required, remains a separately authorized gate. At most one additive, participant-scoped migration may be prepared locally during implementation.
- The current accepted baseline is `main`/`origin/main` commit `c640e395d79b384153d9a1ac8ab51687a863ab45` from PR #71.

---

## 1. User-Observed Requirements

### 1.1 Durable forfeit

- Some older unranked Multiplayer games appear to forfeit locally but remain in Practice Multiplayer and Active Games.
- A participant-owned active game must become terminal durably when the participant forfeits.
- A pre-turn exit must preserve the existing cancellation rule; a post-turn exit must preserve the existing forfeit-loss rule.
- The fix must work for either participant and must not alter ranked settlement, scores, or Elo.
- The UI must not silently claim success when the durable mutation did not happen.

### 1.2 Selected badge contrast

- The unreadable state shown in the supplied screenshots occurs when a light selected subtab contains a pale outlined attention badge.
- The correction must apply to every `SubtabBar` badge, including numeric `neutral`, `attention`, and `urgent` cues and text cues such as Daily Multiplayer `Ready`.
- Unselected badges may retain their current tone colors.
- The shell may use one simple, consistent selected-badge treatment rather than separate decorative colors.

### 1.3 Notification navigation collapse

- `Open` must collapse the notification center and then preserve the current route/action behavior.
- `Mark read`, `Mark all read`, and `Hide` must keep the center open.
- Outside click and Escape must continue to close it.
- Apply the rule consistently on mobile and desktop.

## 2. Repository Findings And Diagnosis

### 2.1 Forfeit persistence

- `forfeitMultiplayerGame` in `src/multiplayer/multiplayer.ts` already projects the intended domain result: zero moves becomes `cancelled`; one or more moves becomes `lost` with `forfeitedPlayerId` and the opponent winner.
- `MultiplayerPanel` applies that result optimistically and calls `onChange` immediately.
- `App.handleMultiplayerChange` updates local React state first, then calls `multiplayerRepository.save`. If persistence rejects, the catch path reloads the durable snapshot, which can restore the still-active game.
- Ordinary games are written by `updateMultiplayerGameRows` in `src/multiplayer/multiplayerRepository.ts`. It uses an `updated_at` compare-and-swap match, but it does not request or inspect returned rows. A zero-row update can therefore look successful to the client.
- Supabase RLS updates also depend on participant columns. Current Postgres/Supabase behavior permits a zero-row result without a transport error when a row no longer matches the compare-and-swap or is not update-visible.
- This is a strong match for the user-visible symptom, but the precise older-row cause is not yet proven. Likely classes are compare-and-swap mismatch, legacy participant/projection shape, or an update-policy mismatch. The implementation must reproduce and classify before choosing a source-only repair or an additive server contract.

### 2.2 Attention badge contrast

- `SubtabBar` already emits `data-active="true"` on the selected badge.
- `src/index.css` defines tone-specific pale border/text colors but has no active-badge override.
- The selected `Button` uses the light primary background, so urgent/attention badge colors lose contrast exactly as shown in the screenshots.
- No component redesign is needed; the missing generic active-state CSS is the root cause.

### 2.3 Notification disclosure state

- `NotificationCenter` owns `open` state and already handles outside pointer events and Escape.
- Its `Open` button calls `onActivate(item)` directly and never calls `setOpen(false)`.
- Read, mark-all, and hide actions have separate callbacks, so the requested distinction is already represented cleanly.
- The smallest correct change is a local activation wrapper that closes before delegating to `onActivate`.

## 3. Considered Approaches

### Approach A - Evidence-first repository hardening plus two local UI fixes (recommended)

1. Reproduce legacy-compatible forfeit behavior with a sanitized fixture and temporary accounts.
2. Make ordinary updates return and validate the mutated row.
3. On a compare-and-swap miss for a participant-owned active forfeit, re-read the canonical row and reapply the same terminal intent once.
4. If the second participant-authorized write still returns no row, surface a durable error and stop; prepare one narrowly scoped server RPC migration only if remote evidence proves direct update authority cannot safely support legacy rows.
5. Add generic selected-badge CSS and notification activation collapse independently.

**Why recommended:** It fixes the persistence contract instead of hiding stale cards, gives a deterministic failure signal, preserves existing architecture, and keeps a migration as a proven fallback rather than a guess.

### Approach B - Introduce a forfeit RPC immediately

Create a security-definer participant-checked RPC for every ordinary forfeit and route all clients through it.

**Trade-off:** This is durable and authoritative, but it changes the backend contract before proving the current direct-update failure and adds migration/application overhead. Use only if Approach A's remote reproduction proves it necessary.

### Approach C - Remove the game locally after clicking Forfeit

Filter the game from the UI without proving the database row became terminal.

**Rejected:** The rival, Live, refresh, and active-game capacity would still see the durable active row. This would conceal the bug rather than fix it.

## 4. File Ownership

### Expected source files

- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerRepository.test.ts`
- `src/multiplayer/MultiplayerPanel.tsx` only if a durable error/busy state needs a focused UI seam
- `src/multiplayer/MultiplayerPanel.test.tsx` only if that UI seam changes
- `src/ui/SubtabBar.tsx` only if an additional stable test hook is required; existing `data-active` should normally suffice
- `src/ui/SubtabBar.test.tsx`
- `src/notifications/NotificationCenter.tsx`
- `src/notifications/NotificationCenter.test.tsx`
- `src/index.css`
- one focused Playwright spec, preferably `e2e/layout/functional-shell-accessibility.spec.ts` for badge/notification interactions
- one focused Multiplayer E2E spec or fixture for legacy-compatible forfeits

### Documentation after implementation

- `planning/phase-58/CHANGELOG.md`
- `planning/phase-58/REVIEW-CHECKLIST.md`
- `planning/testing/TESTING-SUITE.md`
- `progress/PROGRESS.csv`
- a new `progress/PROGRESS-STEP-*.md`

### Conditional migration

- At most one CLI-generated migration under `supabase/migrations/`, and only after source-only authority recovery fails with reproducible non-secret evidence.
- Do not apply it remotely in the same implementation pass.

## 5. Implementation Tasks

### Task 1 - Baseline and sanitized forfeit characterization

- [ ] Verify `pwd`, clean `main`, `HEAD`, `origin/main`, the Phase 58 41/41 migration baseline, intended `brrrdle-dev` project, and zero temporary-account residue.
- [ ] Rerun the current ordinary post-guess forfeit E2E first to prove fresh rows still work.
- [ ] Add a repository test where the Data API update returns zero rows with no error; assert that save cannot report success.
- [ ] Add a legacy-compatible fixture that omits only optional newer projection fields while preserving participant identity, sessions, and moves.
- [ ] Cover host and rival, pre-turn cancellation and post-turn forfeit, OG and GO where the shared persistence path could differ.
- [ ] If remote characterization is needed, report only aggregate booleans/counts and schema-era categories. Never print IDs, names, answers, or projections.

**Exit:** The failure is classified as a write acknowledgment/CAS problem, a legacy normalization problem, or a server authorization problem.

### Task 2 - Make ordinary terminal writes acknowledgment-safe

- [ ] Change ordinary update persistence to request the updated row and validate exactly one canonical result.
- [ ] Distinguish `updated`, `already terminal in the requested way`, `compare-and-swap miss`, and `not authorized/not found` outcomes.
- [ ] For a compare-and-swap miss on an active participant-owned forfeit, re-read once, derive the viewer seat from canonical participant IDs, reapply `forfeitMultiplayerGame`, and retry once using the fresh durable `updated_at`.
- [ ] Never retry generic turns, stale timeouts, joins, or cancellations through the forfeit-specific path.
- [ ] Return/merge the canonical row after success so local state and the database agree.
- [ ] Surface a stable non-secret error if the mutation still cannot be confirmed; do not leave an optimistic terminal projection presented as durable.
- [ ] Preserve stale-creator cancellation protection and timed-turn protection.

**Conditional stop:** If an authenticated participant cannot update a correctly matched legacy row under current RLS, prepare one additive participant-scoped RPC migration and stop at the remote-application gate. Do not weaken RLS or broaden table writes.

### Task 3 - Add selected-badge contrast

- [ ] Keep the existing unselected tone styles.
- [ ] Add one generic `.brrrdle-attention-badge[data-active='true']` treatment with a dark opaque background, high-contrast light text, and a visible border against every selected subtab background/theme.
- [ ] Ensure the rule wins over `neutral`, `attention`, and `urgent` tone declarations without changing accessible names.
- [ ] Verify numeric labels and `Ready` fit without changing tab dimensions or wrapping incoherently.

**Exit:** Computed text/background contrast is at least 4.5:1 for selected number and `Ready` badges at desktop and 390px mobile widths.

### Task 4 - Collapse notifications only on navigation

- [ ] Add a `handleActivate(item)` wrapper inside `NotificationCenter` that calls `setOpen(false)` and then delegates to `onActivate(item)`.
- [ ] Keep `onMarkRead`, `onMarkAllRead`, and `onDismiss` unchanged.
- [ ] Preserve outside click, Escape, action routing, read metadata, and browser-notification callbacks.
- [ ] Add an interaction regression proving `Open` closes and routes, while Mark read, Mark all read, and Hide do not close.

### Task 5 - Real browser and temporary-account verification

- [ ] Use two temporary authenticated accounts and real `async_multiplayer_games` rows.
- [ ] Prove fresh and legacy-compatible unranked Practice OG/GO games can be ended by either participant.
- [ ] Prove pre-turn cancellation and post-turn forfeit survive reload, disappear from active capacity/surfaces, and show the existing terminal result to the rival/spectator.
- [ ] Prove ranked Practice/Daily and private Practice forfeits retain their existing contracts.
- [ ] At 390px mobile and desktop widths, inspect selected Overview, Daily (`Ready`), Active, Lobby, and Live badges across available tones.
- [ ] Open a navigation notification and prove the panel collapses while the exact destination/game opens; prove the three non-navigation actions keep it open.
- [ ] Save local-only screenshots and a manifest under `test-results/visual-review/phase-58-post-review-follow-up/`; do not commit them.
- [ ] Delete every temporary Auth/profile/game/claim/request row and all generated browser artifacts not required for local review.

### Task 6 - Full regression and Review Candidate preparation

- [ ] Run focused Vitest files for repository, Multiplayer panel, SubtabBar, NotificationCenter, attention view models, and affected helpers.
- [ ] Run `npm run lint`.
- [ ] Run `npm run test:unit`.
- [ ] Run `npm run build`.
- [ ] Run `npx tsc -p api/tsconfig.json --noEmit`.
- [ ] Run focused Multiplayer/notification/layout Playwright specs with one worker.
- [ ] Run `E2E_WORKERS=1 E2E_PHASE57_ECONOMY_AUTHORITY=enabled npx playwright test --project=chromium`.
- [ ] Use the existing exact-retry-then-full-rerun shield only for a known transient; never weaken assertions or extend the five-second reload deadline.
- [ ] Reconfirm migration equality, protected catalog/function fingerprints, advisors, privacy, zero residue, secret/artifact scans, `git diff --check`, and no owned runaway process.
- [ ] Update Phase 58 docs and create a revised manual checklist. Leave all user boxes unchecked until hosted review.
- [ ] Prepare the next governed Review Candidate backup prompt. Do not perform Git/GitHub actions in the implementation pass.

## 6. Acceptance Criteria

- Every participant-visible Forfeit action either durably terminals the exact game or shows a stable error; it never silently succeeds locally while leaving the game active remotely.
- Fresh and legacy-compatible unranked rows pass for both seats, before and after a submitted turn.
- No active slot, Practice/Daily list, Overview, Active Games, or Live surface retains a successfully forfeited game as active after repository reload.
- Ranked, private, Daily claims, Elo, spectator termination, and refresh-readiness behavior remain unchanged.
- Every selected subtab badge, including `Ready`, is readable at 4.5:1 or better in supported themes and mobile/desktop viewports.
- Notification `Open` collapses the center and preserves navigation; Mark read, Mark all read, and Hide keep it expanded.
- Focused, full unit, build/typecheck, authority-enabled E2E, privacy/catalog, cleanup, and visual gates are clean.

## 7. Checkpoint And Future Repository Recommendation

- Do **not** create an intermediate golden checkpoint before this follow-up. Commit `c640e395d79b384153d9a1ac8ab51687a863ab45` and merged PR #71 already provide an exact recoverable pre-follow-up baseline.
- After these fixes pass hosted/manual review, close Phase 58 and create one final functional-shell golden checkpoint. That checkpoint should be the source anchor for the redesign split.
- Create the redesign repository only in a separately planned bootstrap phase after the checkpoint. Use an explicit copy allowlist for runtime source, tests, migrations, essential governance, preservation inventory, and redesign planning; exclude historical clutter only after classifying it.
- Use an independent non-production Vercel project and an independent Supabase project for redesign experimentation. Replay source-controlled migrations; do not copy secrets or live private user data.
- Keep this repository and its hosted shell active and immutable except for separately approved maintenance.

## 8. Approval Gate

Approval phrase: `Approved. Execute the Phase 58 post-review forfeit, badge, and notification follow-up plan autonomously.`

On approval, the agent may execute this plan through local implementation, temporary-account E2E, one non-production preview if needed, and Review Candidate preparation. Remote migration application, Git/GitHub backup, Phase 58 closure, golden checkpointing, and redesign-repository creation remain separately gated.
