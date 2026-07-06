# Phase 50 Unified Specification: Solo Completion Persistence And Current-Surface Convenience

**Status**: Draft unified specification for review only.
**Date**: 2026-07-06.
**Repository**: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Stable repository boundary**: Do not touch the original stable `brrrdle` repository.
**Baseline**: `main` and `origin/main` observed at `cc878c6a109406b56f2a9195be6114c1ccf02259` during specification creation.
**Phase id**: Phase 50 planning/specification. Implementation remains unauthorized until a later explicit prompt.

## 1. Authority And Scope

This document is an implementation-oriented specification, but it does not authorize implementation.

Authority order for Phase 50 remains:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. `BRRRDLE-OVERVIEW.md`.
5. `AGENT-IMPLEMENTATION-PLAN.md`.
6. Approved phase-specific spec files.
7. `agents.md`.
8. `memory.md`.
9. Local observations and source inspection.

If a future implementation prompt conflicts with this document, the higher-authority instruction wins and the agent must report the conflict.

## 2. Current Baseline

Phase 49 has been implemented and manually reviewed. The current product surface includes:

- Solo Daily OG and GO.
- Solo Practice OG and GO.
- Asynchronous Daily Multiplayer.
- Practice Multiplayer.
- Public profile and account surfaces.
- Phase 49 progression HUD and reward/account polish.

Current source inspection shows these likely Phase 50 surfaces:

- Solo game completion and resume callbacks:
  - `src/app/games/OgGame.tsx`
  - `src/app/games/GoGame.tsx`
  - `src/app/App.tsx`
- Progress, reward idempotence, and resume-slot storage:
  - `src/account/guestStorage.ts`
  - `src/account/guestStorage.test.ts`
  - `src/account/resumeSlot.ts`
  - `src/account/resumeSlot.test.ts`
  - `src/account/storageSchema.ts`
  - `src/game/storage/dailyOgStorage.ts`
  - `src/game/storage/dailyOgStorage.test.ts`
- Profile and Settings account boundary:
  - `src/account/ProfilePanel.tsx`
  - `src/account/ProfilePanel.test.tsx`
  - `src/account/Settings.tsx`
  - `src/account/Settings.test.tsx`
  - `src/app/App.tsx`
- Progression HUD and Stats navigation:
  - `src/app/ProgressionHud.tsx`
  - `src/app/ProgressionHud.test.tsx`
  - `src/app/progressionHudViewModel.ts`
  - `src/stats/StatsDashboard.tsx`
  - `src/stats/StatsDashboard.test.tsx`
  - `src/app/App.tsx`
- Browser navigation and route state:
  - `src/app/browserNavigationHistory.ts`
  - `src/app/browserNavigationHistory.test.ts`

The source audit found one important current design invariant: resume slots are normalized around in-progress sessions. Finished OG sessions and completed GO chains should not be forced into the existing resume-slot contract without an explicit storage decision. Phase 50 must repair completed Solo UI restoration without accidentally turning resume slots into a terminal-history store unless a later implementation plan intentionally chooses that route and proves it is safe.

## 3. Phase 49 Manual Review Finding

The user manually reviewed Phase 49 and reported a current Solo completion-state bug:

- After completing a Daily or Practice Solo game in OG or GO, using browser Back/Forward or route re-entry can return to the puzzle without the final winning guess and without the completed end screen.
- Incorrect valid guesses appear preserved.
- Intermediate solved GO puzzles appear preserved.
- XP, coins, level state, and reward totals do not appear to double-award during this bug path.

The Phase 50 core requirement is to make completed Solo game state feel durable across current app navigation without introducing duplicate rewards or changing gameplay rules.

## 4. User Decision Summary

The user selected the expanded Phase 50 shape:

- Fix the Solo completion persistence bug.
- Keep reward idempotence as a first-class requirement.
- Include source-audit-driven Profile and HUD conveniences only if they remain small and local.
- Defer larger shell, theme, privacy, route, profile, daily/private, ranking, and redesign work.

Phase 50 should therefore be a "big phase, small stages" macro-phase: cohesive enough to address current-surface polish, but split into narrow stages that can stop after the core Solo persistence fix if optional convenience work proves larger than expected.

## 5. Goals

Phase 50 must:

1. Reproduce and explain the Solo completion persistence bug before source edits.
2. Preserve completed Solo terminal UI state across Back/Forward and route re-entry for:
   - Daily OG.
   - Daily GO.
   - Practice OG.
   - Practice GO.
3. Preserve current reward idempotence:
   - A completed `gameId` must not grant XP/coins/history more than once.
   - Browser navigation must not replay completion rewards.
   - Authenticated sync must not duplicate local completion rewards.
4. Preserve gameplay rules:
   - OG and GO validation, guesses, max attempts, Hard Mode, answer generation, and Daily determinism must not change except as needed to restore current completed UI.
5. Preserve product boundaries:
   - Solo fix first.
   - Optional Profile/HUD conveniences only after source audit confirms small scope.
6. Produce clear manual-review evidence and a final prompt handoff.

## 6. Non-Goals

Phase 50 must not:

- Implement a redesign, global shell overhaul, or full route architecture rewrite.
- Add theme customization.
- Add rank history pages, ranked Daily expansion, private Daily groups, social feeds, notifications, bots, exports, or economy changes.
- Change scoring, ELO/rating rules, reward values, dictionary behavior, answer generation, or Daily puzzle determinism.
- Change Daily Multiplayer invariants:
  - strictly asynchronous,
  - five-letter,
  - UTC-day keyed,
  - no clock,
  - no Hard Mode lobby control,
  - answer-separated,
  - claim-safe.
- Add Supabase migrations, RLS changes, tables, RPCs, or private payload storage unless a future stage addendum explicitly authorizes it.
- Store secrets, credentials, auth tokens, private email addresses, local session artifacts, or generated browser state in prompt packages, progress reports, or public repo docs.
- Touch the original stable `brrrdle` repository.
- Create commits, PRs, merges, releases, or deployments without later explicit approval.

## 7. Recommended Phase Shape

Phase 50 should be implemented as one macro-phase with narrow gates:

- **Core lane**: Solo completion persistence and reward idempotence.
- **Small convenience lane**: Profile/Settings and Progression HUD/Stats navigation only if source-only and low-risk.
- **Routing lane**: documentation-only routing of deferred larger work.
- **Verification lane**: focused regression coverage, browser Back/Forward checks, responsive smoke, manual review checklist, and resource cleanup.

The future implementation plan should be allowed to stop after the core lane if the optional convenience lane expands beyond small local changes.

## 8. Stage Breakdown

### Stage 50.0 - Baseline Intake And Reproduction Plan

Purpose: make the current bug and boundaries concrete before editing.

Expected work:

- Confirm working directory is `brrrdle-dev`.
- Confirm the stable `brrrdle` repository is not touched.
- Confirm `main` and `origin/main` baseline before edits.
- Read this spec, the Phase 49 review artifacts, and current planning docs.
- Capture current `git status --short --branch`.
- Identify a minimal browser reproduction matrix for Daily/Practice OG/GO completion-state loss.

Stop if:

- The target repo is not `brrrdle-dev`.
- Phase 50 authorization is missing.
- The reproduction requires touching stable `brrrdle`.
- The source audit suggests a storage migration or broad route rewrite is required.

### Stage 50.1 - Reproduce Solo Completion-State Loss

Purpose: prove the bug before fixing it.

Expected work:

- Use browser automation or a deterministic local harness to reproduce:
  - Daily OG completion, Back/Forward or route re-entry, terminal UI missing.
  - Daily GO completion, Back/Forward or route re-entry, terminal UI missing.
  - Practice OG completion, Back/Forward or route re-entry, terminal UI missing.
  - Practice GO completion, Back/Forward or route re-entry, terminal UI missing.
- Record whether the final winning guess, terminal definitions/results, and progression/reward totals persist.
- Verify that incorrect valid guesses and intermediate GO solved puzzles still persist as reported.
- Record the root-cause hypothesis with file paths and test targets.

Stop if:

- The bug cannot be reproduced after a reasonable focused attempt.
- The observed behavior differs materially from the user report.
- The fix appears to require a migration, new private cloud payload, reward-rule change, or broad route rewrite.

### Stage 50.2 - Contract Decision For Completed Solo State

Purpose: choose the smallest durable state contract before implementation.

Expected work:

- Audit `recordCompletedGame`, `createResumeSlot`, `normalizeResumeSlot`, and current App navigation restoration.
- Decide whether the correct fix belongs in:
  - route/view-state restoration,
  - game component terminal-state restoration,
  - a separate completed-session evidence cache,
  - or a small extension to existing progress storage.
- Preserve the existing intent that resume slots represent in-progress sessions unless the implementation plan explicitly proves otherwise.
- Document why the selected contract avoids duplicate rewards.

Hard constraints:

- `completedGameIds` or equivalent idempotence protection must stay authoritative for reward duplication.
- Terminal UI restoration must not call completion reward recording again for the same game.
- Past Daily review and current Daily play must remain distinguishable.
- Practice seed advancement must not skip or repeat because of Back/Forward.

### Stage 50.3 - Core Solo Completion Persistence Fix

Purpose: implement the smallest source fix after Stage 50.1 and 50.2 are complete and approved by the implementation prompt.

Expected behavior:

- Completed Daily OG returns to the completed state with the final guess visible after navigation re-entry.
- Completed Daily GO returns to the completed state with the final solved chain/result visible after navigation re-entry.
- Completed Practice OG returns to the completed state with the final guess visible after navigation re-entry.
- Completed Practice GO returns to the completed state with the final solved chain/result visible after navigation re-entry.
- Browser Back/Forward should not start a new puzzle just because the completed terminal state is being restored.
- Starting a new Practice puzzle intentionally should still be possible through the existing user action.

Likely tests:

- Focused component or hook tests for `OgGame` and `GoGame`.
- Storage tests around completed state and resume-slot normalization if storage changes are selected.
- Browser navigation tests in `src/app/browserNavigationHistory.test.ts` if route restoration is selected.
- One focused browser E2E or smoke script that exercises Back/Forward after a completed Solo game.

### Stage 50.4 - Reward Idempotence Regression Hardening

Purpose: prove the core fix does not duplicate progression.

Expected work:

- Add or update tests that simulate:
  - original completion,
  - route re-entry,
  - browser Back/Forward,
  - repeated terminal-state render,
  - authenticated progress scope if applicable.
- Assert:
  - XP/coins are granted once,
  - history entry is not duplicated,
  - level state is not advanced twice,
  - completed-game tracking remains stable.

Likely target:

- `src/account/guestStorage.test.ts`.
- `src/app/App.test.tsx` or equivalent existing app integration tests if reward capture is App-owned.
- Focused browser E2E if the duplicate path is only visible in runtime navigation.

### Stage 50.5 - Source Audit For Optional Current-Surface Conveniences

Purpose: decide whether optional conveniences stay in Phase 50.

Candidate conveniences:

- Profile panel account-management affordance:
  - Add a visible, safe Sign out path in Profile if source audit shows the handler already exists and placement can avoid destructive adjacency.
  - Add or preserve a clear path from Profile to Settings account management if it remains small.
- Progression HUD navigation:
  - Make the Phase 49 HUD click or button navigate to Stats if the current shell can do this without changing HUD display semantics or route architecture.

Audit requirements:

- Identify exact files and tests.
- Estimate whether changes are source-only and local.
- Confirm no migrations, private payloads, shell redesign, or route rewrite are required.
- Stop and defer if the change needs broad App navigation architecture.

### Stage 50.6 - Optional Profile/Settings Convenience

This stage is conditional. It may be skipped.

Allowed only if Stage 50.5 confirms small source-only scope.

Expected behavior if included:

- Authenticated users can sign out from Profile without needing to hunt through unrelated settings.
- Settings remains the canonical account-management surface.
- Profile editing remains focused on public profile fields.
- Any Sign out button must be clearly separated from Save/Cancel actions.
- Error and loading behavior must match existing Settings sign-out patterns.
- Tests should update current expectations that Profile has no sign-out action.

Out of scope:

- Account deletion.
- Profile privacy controls.
- Public profile redesign.
- Avatar/image upload.
- Private profile fields.
- Supabase schema changes.

### Stage 50.7 - Optional Progression HUD To Stats Navigation

This stage is conditional. It may be skipped.

Allowed only if Stage 50.5 confirms small source-only scope.

Expected behavior if included:

- The HUD remains a compact progression display.
- The navigation affordance is discoverable and accessible.
- Activating the HUD or a contained control routes to the existing Stats surface.
- The HUD must not become a marketing card, modal, or oversized shell element.
- Guest and authenticated progression values should continue to render exactly as before.

Out of scope:

- Redesigning Stats.
- Adding rank history.
- Adding charts not already planned.
- Changing progression formulas or reward values.

### Stage 50.8 - Future Routing Notes

Purpose: keep larger ideas visible without authorizing them.

Expected work:

- Preserve or update planning notes that defer:
  - theme customization,
  - broader shell/navigation redesign,
  - rank history,
  - private Daily groups,
  - ranked Daily,
  - privacy controls,
  - full profile expansion,
  - spectator expansion,
  - social/bot/export features.
- Avoid mixing deferred work into Phase 50 implementation.

### Stage 50.9 - Final Verification, Review Handoff, And Backup Gate

Expected verification:

- Focused tests for changed surfaces.
- Full local gate appropriate to the implementation risk, likely:
  - `npm run lint`
  - `npm run test`
  - `npm run build`
  - targeted E2E or browser smoke for completion Back/Forward behavior.
- Responsive smoke on desktop, tablet, and narrow mobile if UI changed.
- Manual review checklist with exact paths and any known limitations.
- Non-printing/secret scan over changed files and prompt artifacts.
- Resource/process cleanup if a dev server/browser was started.
- `git diff --check`.
- `git status --short --branch`.

Backup/PR expectations:

- No backup, branch creation, PR, merge, release, or deployment happens inside Phase 50 unless a later explicit user prompt authorizes it.
- If backup is later authorized, it must be a separate gate after review evidence exists.

## 9. Success Criteria

Phase 50 succeeds when:

- The Solo completion-state bug is reproduced before source edits.
- Daily OG, Daily GO, Practice OG, and Practice GO all restore the completed terminal state after browser Back/Forward and route re-entry.
- Final winning guess or GO solved-chain evidence remains visible where the completed screen needs it.
- XP, coins, levels, history, and completed-game tracking remain idempotent.
- Existing incorrect-guess persistence and intermediate GO solved-puzzle persistence continue to work.
- Daily determinism is unchanged.
- Practice seed behavior is unchanged except for intentional user-started next puzzles.
- Daily Multiplayer and Practice Multiplayer invariants are unaffected.
- Optional Profile/HUD conveniences either pass their small-scope audit and are implemented with tests, or are explicitly deferred.
- Manual review artifacts make the exact fixed behavior easy to inspect.

## 10. Privacy, Storage, And Supabase Constraints

Phase 50 should be source-only unless a later prompt explicitly authorizes otherwise.

Constraints:

- Do not add new Supabase tables, functions, policies, buckets, or migrations.
- Do not change RLS.
- Do not store private auth/session payloads in public profile data.
- Do not expose private emails, provider tokens, auth refresh tokens, local browser profiles, or generated session artifacts.
- If authenticated progress sync is touched, only sync existing progress payload shapes unless a later migration addendum is approved.
- Keep public profile data public-safe and minimal.

If the selected Solo completion fix requires persistent completed-session evidence, the implementation plan must specify:

- exact shape,
- local vs cloud storage scope,
- migration/normalization behavior,
- privacy classification,
- duplicate reward guard,
- fallback behavior for malformed old data,
- tests proving old progress still loads.

## 11. Gameplay And Reward Constraints

Gameplay constraints:

- Do not change answer selection.
- Do not change allowed guesses.
- Do not change Hard Mode rules.
- Do not change GO advancement rules except to restore completed terminal display.
- Do not change OG attempt counts.
- Do not change Daily time zone behavior.
- Do not change multiplayer turn, scoring, forfeit, timeout, or rating behavior.

Reward constraints:

- `recordCompletedGame`-style idempotence must remain central.
- Reward calculation must not be duplicated in UI-only restore paths.
- Re-rendering a completed game must not re-award.
- Browser navigation must not re-award.
- Auth sync reconciliation must not re-award.
- If terminal UI state is stored separately, it must not become a second reward source.

## 12. UI And Accessibility Constraints

Solo completion UI:

- Preserve existing completion/result presentation.
- Preserve visible final guess or solved GO evidence.
- Do not add explanatory in-app text about implementation details.
- Do not introduce overlapping UI on mobile.
- Do not regress keyboard/board layout.

Profile/Settings:

- Settings remains the canonical account-management surface.
- Profile can expose a Sign out affordance only if it is clearly separated and uses existing safe handler behavior.
- Profile-to-Settings navigation should feel like an account-management escape hatch, not a new settings shell.

HUD/Stats:

- The HUD remains compact.
- Any navigation affordance must be keyboard accessible.
- The HUD must not become a card-heavy or marketing-style surface.
- Stats stays the destination for deeper progression/history.

## 13. Verification Strategy

The future implementation plan should define exact commands, but this spec recommends:

Focused unit/component tests:

- `src/account/guestStorage.test.ts`
- `src/account/resumeSlot.test.ts`
- `src/app/browserNavigationHistory.test.ts`
- `src/app/games/OgGame` test target if present or newly added.
- `src/app/games/GoGame` test target if present or newly added.
- `src/account/ProfilePanel.test.tsx` if Stage 50.6 runs.
- `src/account/Settings.test.tsx` if Stage 50.6 runs.
- `src/app/ProgressionHud.test.tsx` if Stage 50.7 runs.
- `src/stats/StatsDashboard.test.tsx` only if Stats integration changes.

Browser/runtime checks:

- Complete Daily OG, navigate away/back, verify completed screen and final guess.
- Complete Daily GO, navigate away/back, verify completed screen and solved-chain evidence.
- Complete Practice OG, navigate away/back, verify completed screen and final guess.
- Complete Practice GO, navigate away/back, verify completed screen and solved-chain evidence.
- Repeat a completed-game render and verify rewards do not double.
- If optional convenience stages run:
  - Profile Sign out action renders and calls the existing sign-out handler safely.
  - HUD navigation reaches Stats without changing displayed values.

General gates:

- `git diff --check`
- `npm run lint`
- `npm run test`
- `npm run build`
- targeted E2E/smoke as needed
- non-printing/secret scan
- final `git status --short --branch`

## 14. Manual Review Checklist Expectations

Phase 50 implementation should create or update a review checklist that includes:

- Exact reproduction summary before fix.
- Exact verification steps after fix.
- Daily OG Back/Forward review item.
- Daily GO Back/Forward review item.
- Practice OG Back/Forward review item.
- Practice GO Back/Forward review item.
- Reward idempotence review item.
- Optional Profile Sign out/Profile-to-Settings review item if implemented.
- Optional HUD-to-Stats review item if implemented.
- Mobile/narrow viewport smoke item if UI changed.
- Known skipped/deferred items.

The checklist should link to evidence paths that actually exist at final handoff time.

## 15. Risks

Key risks:

- Mistaking in-progress resume slots for completed terminal history and corrupting current resume behavior.
- Re-awarding progression when restoring completed UI.
- Starting a new Practice seed too early on browser navigation.
- Accidentally changing Daily determinism or past Daily review behavior.
- Pulling optional Profile/HUD work into a broader shell redesign.
- Touching Supabase or public profile privacy payloads without authorization.
- Overstating browser verification if only unit tests ran.

Mitigations:

- Reproduce first.
- Choose and document a storage/view contract before source edits.
- Add idempotence tests.
- Keep optional convenience stages conditional.
- Use manual review artifacts for final human inspection.

## 16. Open Decisions For The Next Planning Gate

The detailed implementation plan must decide:

1. Which reproduction harness or browser path will be used first?
2. Is the root cause in route restoration, game component state, resume-slot normalization, or a missing completed-session evidence contract?
3. Should completed terminal UI restoration be persisted, route-derived, or held in a small session cache?
4. What is the minimal idempotence test that proves rewards do not double?
5. Are Profile Sign out and Profile-to-Settings small enough to include?
6. Is HUD-to-Stats navigation small enough to include?
7. What exact final gate is proportionate if only docs/source-only changes land?

## 17. Next Gated Prompt

The next safe action is review of this specification. If approved, use the local ignored prompt artifact:

`prompt-packages/phase-50/PHASE-50-DETAILED-IMPLEMENTATION-PLAN-PROMPT-2026-07-06.md`

That next prompt should create a detailed implementation plan for review. It should not implement source changes unless the user explicitly authorizes implementation in a later prompt.
