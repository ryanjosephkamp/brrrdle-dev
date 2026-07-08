# Phase 50 Planning Brief - Solo Completion Persistence And Current-Surface Convenience Macro-Phase

**Date:** 2026-07-06
**Status:** Accepted and closing through Final Acceptance Backup
**Authority:** Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`, `planning/FUTURE-WORKFLOW-TIMELINE.md`, and the completed Phase 49 evidence.

This planning brief authorizes no implementation by itself. Phase 50 source/runtime changes, tests, migrations, storage changes, Supabase/Vercel configuration, deployment, Git/GitHub actions, backup workflow execution, gameplay-rule changes, Elo changes, and original stable `brrrdle` repository work remain gated behind later explicit prompts.

## Final Acceptance Addendum - 2026-07-08

Phase 50 was expanded beyond this initial planning brief through explicitly authorized same-phase Review Follow-up prompts. After the final ranked Practice FIFO Review Candidate Backup, the user reported that all manual review testing passes, no bugs or regressions are currently visible, and Phase 50 is ready to close.

The final accepted Phase 50 scope includes the original Solo completion persistence and current-surface convenience work plus same-phase recovery for Solo cloud persistence, Practice Solo persistence, Home-on-refresh, multiplayer focus/refocus, multiplayer matchmaking and first-turn persistence, ranked Practice cross-browser finalization, and ranked Practice FIFO matchmaking.

Phase 50 closes through the Final Acceptance Backup prompt. Phase 51 planning/implementation, release, deployment configuration changes, profile-name emoji/special-character policy, admin queue visualization, Practice GO answer-selection/randomness auditing, public tunneling, and original stable `brrrdle` repository work remain separately gated.

## Current Baseline

- Repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Expected local `main`: `cc878c6a109406b56f2a9195be6114c1ccf02259`
- Expected `origin/main`: `cc878c6a109406b56f2a9195be6114c1ccf02259`
- Phase 49 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Preserve the user-updated Phase 49 checklist: `planning/phase-49/REVIEW-CHECKLIST.md`
- Preserve current transition artifacts:
  - `planning/FUTURE-WORKFLOW-TIMELINE.md`
  - `progress/PROGRESS-STEP-453.md`
  - `progress/PROGRESS-STEP-454.md`
  - current Phase 50 routing updates in `planning/README.md`, `planning/ROADMAP.md`, `planning/ROADMAP-OPTIMIZED.md`, and `progress/PROGRESS.csv`

## Same-Phase Recovery Addendum - 2026-07-06

Hosted/live manual review of the Phase 50 Review Candidate backed up at `267d3b478b11bd2eaca4f6ba9d6397429c3f092e` failed the required completed Solo persistence checks. Phase 50 therefore remains open in same-phase Review Follow-up / Recovery.

The recovery is inside Phase 50 because the findings directly relate to the Phase 50 completion-persistence and current-surface quality goals:

- completed Practice OG/GO and Daily Solo terminal states were not durable across hosted re-entry/reload paths;
- the prior E2E suite covered route Back/re-entry but not full app reload after completion;
- ordinary Solo/Practice/Daily navigation still performed broad automatic page scrolling that made mobile review feel laggy.

Additional recovery stages are authorized only by the later same-phase recovery prompt, not by this planning brief alone:

- **Stage 50.10 - Same-Phase Recovery Reproduction And Contract Repair**: reproduce the failed hosted/manual reload path, add browser coverage that fails against the broken candidate, and repair terminal Solo display without changing reward formulas or cloud progress contracts.
- **Stage 50.11 - Auto-Scroll Policy Simplification And Scroll Quality**: remove ordinary Solo/Practice/Daily page auto-scroll, preserve auto-scroll only for explicit routed-game targets such as notification/direct-game handoffs, and keep mobile scroll/layout coverage aligned with that policy.
- **Stage 50.12 - Recovery Verification And Review-Candidate Prep**: rerun focused and full gates, update checklist/changelog/progress, and prepare a new Review Candidate Backup prompt if verification is clean.

These recovery stages remain bounded by the same protected-action gates: no Git/GitHub actions, backup workflow, final closure, deployment configuration, migrations, storage schema/cloud progress contract changes, release, merge, Phase 51 work, or stable `brrrdle` repository work without separate explicit authorization.

## Phase 49 Manual Review Result

Phase 49 passed manual review. All required, optional, preserved-invariant, and review-result checklist boxes were checked.

After that pass, the user reported one important follow-up bug and several product-direction notes. The follow-up bug should be treated as Phase 50's core repair target:

- After winning Daily Solo OG/GO or Practice Solo OG/GO, route/tab/browser Back/Forward re-entry can lose the final winning guess and completed end screen.
- Incorrect valid guesses appear to persist correctly.
- GO intermediate solved puzzles appear to persist correctly.
- XP, coins, levels, and progression rewards do not appear to double-award; that idempotence must be preserved.

## User Decision Summary From Future Workflow Timeline

The user accepted the `planning/FUTURE-WORKFLOW-TIMELINE.md` recommendation with these decisions:

- Phase 50 should be an expanded macro-phase, not a bug-only phase.
- Phase 50 should include more than the Solo completion-state bug.
- Phase 50 should attempt all three optional convenience implementation candidates if audits prove they remain source-only and low risk:
  - signed-in Sign out convenience from Profile;
  - Profile-to-Settings Account Management deep link or direct navigation/scroll affordance;
  - Progression HUD click-through to Stats.
- Theme work should wait until a later dedicated UI/theme direction intake phase.
- The larger UI/UX/theme makeover should happen much later, after core game fundamentals are in place and the app is reliably playable.
- Broad shell/side-panel redesign, compact side-dock implementation, top-right Daily button consolidation, and dramatic visual/theme work should remain deferred unless a later prompt explicitly authorizes them.

## Phase-Sizing Decision

Phase 50 should be a larger cohesive macro-phase, but each stage should remain narrow, single-purpose, and verification-friendly.

This fits `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md` because the work shares current user-visible surfaces and verification context:

- Solo completion persistence and reward idempotence both touch Solo re-entry, active progress, storage/resume state, and progression rewards.
- Profile Sign out and Profile-to-Settings navigation are small account-management convenience slices that build on Phase 48 Profile/Settings clarity.
- Progression HUD click-through to Stats is a small continuation of Phase 49's HUD work.
- Future Focus Mode, profile, private Practice, Stats, Live identity, shell, and UI/theme work can be documented and routed without implementing them.

Phase 50 should not merge unrelated deep systems into one implementation stage. Storage, Supabase/RLS, session, reward-contract, shell, gameplay-rule, or Elo changes must stop at an addendum/planning gate.

## Goals

- Audit and repair Solo Daily/Practice OG/GO completion-state persistence across route/tab/browser Back/Forward re-entry.
- Preserve completed end-screen state and final winning guess after a win until the player explicitly starts a new Practice puzzle/chain or the next Daily cycle applies.
- Protect XP, coins, level, stats, Daily claims, and progression rewards from duplicate award on re-entry, refresh, sync, or resume.
- Decide whether the repair can remain source/test-only or requires a storage/reward-contract addendum.
- Add signed-in Profile Sign out convenience if source-only and low risk.
- Add a direct Profile-to-Settings Account Management affordance if source-only and low risk.
- Add Progression HUD click-through to Stats if source-only and low risk.
- Route deeper Focus Mode, player-chip popover, profile simplification, private Practice expansion, Stats/cloud stats, Live identity/Elo metadata, shell redesign, and UI/theme work to later gated phases.

## In Scope

- Solo Daily/Practice OG/GO final winning-guess and completed end-screen persistence.
- Route/subtab/browser Back/Forward re-entry behavior after Solo completion.
- Active progress, resume-slot, local storage, account-scoped progress, auto-sync, route-cache, and hydration audit for the Solo completion path.
- Reward idempotence audit and regression hardening for XP, coins, levels, stats, Daily claims, and progression rewards.
- Source-only versus storage/reward-contract/addendum decisioning before implementation.
- Profile signed-in Sign out convenience if the audit confirms no account-management contract change is required.
- Profile-to-Settings Account Management direct navigation or scroll affordance if source-only.
- Progression HUD click-through to Stats if source-only and accessible.
- Documentation/routing updates for related future work.
- Focused tests, E2E where relevant, visual review, changelog, and manual checklist in later execution stages.

## Out Of Scope

- Supabase migrations or storage schema changes unless a later addendum is explicitly created and approved.
- Vercel/Supabase configuration, deployment, releases, staging, commits, pushes, PRs, merges, or backup workflow execution during planning/spec/implementation gates unless separately authorized.
- Broad Focus Mode expansion.
- Persistent Focus Mode settings unless a later stage proves the change is tiny, source-only, and authorized.
- Top-right player-chip popover implementation.
- Broad mobile/desktop shell redesign.
- Compact side-dock implementation.
- Top-right Daily button consolidation.
- Configurable Home widgets.
- Private Daily.
- Ranked Daily.
- Spectator presence/count/list.
- Service workers or push infrastructure.
- Strict one-active-session/session leases.
- Server-authoritative Daily submissions.
- Theme modernization or concrete theme implementation.
- Gameplay-rule changes, scoring changes, Daily claim contract changes, or Elo changes.

## Recommended Expanded Phase 50 V1 Scope

Phase 50 should use three lanes.

### Core Solo Completion Lane

This is the non-optional lane. It should audit and repair the winning-state persistence bug for Daily/Practice Solo OG/GO, including browser Back/Forward and route re-entry. It must prove reward idempotence remains intact.

### Current-Surface Convenience Lane

This lane should proceed only after audits confirm low risk and source-only boundaries:

- signed-in Profile Sign out convenience while Settings remains the account-management home;
- Profile-to-Settings Account Management direct navigation/scroll affordance;
- Progression HUD click-through to Stats.

### Documentation And Routing Lane

This lane should document future routing only:

- deeper Focus Mode and durable Focus settings;
- player-chip popover;
- profile simplification;
- private Practice expansion;
- Stats clarity, cloud stats, and multiplayer stats;
- Live/profile/Elo metadata;
- broad shell redesign, side-dock, and Daily button consolidation;
- dedicated UI/theme direction intake and later concrete themes.

## Recommended Stage Breakdown

### Stage 50.0 - Protected Baseline And Phase 49 Transition Intake

- Confirm repo state and stable-repo boundary.
- Preserve Phase 49 checklist and transition artifacts.
- Record existing Phase 50 planning/spec/progress artifacts.
- Run baseline verification.
- Do not audit or implement beyond the protected baseline.

### Stage 50.1 - Solo Completion-State Audit And Reproduction

- Reproduce or characterize Daily Solo OG/GO and Practice Solo OG/GO completion-state loss after route/tab/browser Back/Forward re-entry.
- Inspect active progress, resume slots, storage, route cache, browser history, account sync, completion flags, and end-screen rendering.
- Confirm whether the bug is shared across OG/GO, Daily/Practice, and guest/auth scopes.
- Confirm reward idempotence currently remains correct.

### Stage 50.2 - Source-Only Versus Storage/Reward-Contract Decision

- Decide whether Stage 50.3 and Stage 50.4 can remain source/test-only.
- If not, create a narrow storage/reward-contract/Supabase/RLS/session/gameplay-rule addendum and stop.
- Record exact implementation boundaries if source-only is safe.

### Stage 50.3 - Solo Completion-State Persistence Repair

- Implement the smallest source/test-only repair for final winning guess and completed end-screen persistence.
- Preserve existing incorrect-guess and GO intermediate-puzzle persistence.
- Preserve Practice new puzzle/new chain semantics and Daily next-cycle behavior.

### Stage 50.4 - Reward Idempotence And Re-Entry Regression Hardening

- Add regression coverage proving re-entry, refresh, sync, and resume do not double-award XP, coins, levels, stats, Daily claims, or progression rewards.
- Harden source-only guards if needed without changing reward formulas or claim contracts.

### Stage 50.5 - Profile Account-Convenience Audit And Decision

- Audit Profile/Settings account-management surfaces.
- Decide whether Profile Sign out and Profile-to-Settings deep linking can remain source/test-only.
- Preserve Settings as the canonical account-management home.

### Stage 50.6 - Profile Sign Out And Profile-To-Settings Deep Link

- If Stage 50.5 approves, add signed-in Sign out convenience in Profile.
- Add a direct Profile-to-Settings Account Management navigation or scroll affordance.
- Preserve Phase 48 Profile/Settings clarity and account-boundary protections.

### Stage 50.7 - Progression HUD Click-Through To Stats

- If source-only, make the Phase 49 Progression HUD navigate to Stats or the appropriate Stats section.
- Preserve display-only HUD semantics and active-scope ownership.
- Do not expose resource values publicly.

### Stage 50.8 - Future Routing Documentation

- Update planning/roadmap documents for deeper Focus Mode, player-chip popover, profile simplification, private Practice expansion, Stats/cloud stats/multiplayer stats, Live/profile/Elo metadata, shell redesign, and later UI/theme direction intake.
- Do not implement deferred work.

### Stage 50.9 - Final Hardening, Visual Review, Changelog, And Manual Checklist

- Run focused and full verification.
- Run visual handoff review for user-visible Phase 50 surfaces.
- Create `planning/phase-50/CHANGELOG.md`.
- Create `planning/phase-50/REVIEW-CHECKLIST.md`.
- Prepare for Git handoff only after explicit later authorization.

## Success Criteria

- Completed Solo Daily/Practice OG/GO games retain the final winning guess and completed end screen across route changes, tabs, browser Back/Forward, refresh/resume where applicable, and account-safe re-entry.
- Reward idempotence is proven: XP, coins, level, stats, Daily claims, and progression rewards are not double-awarded.
- Practice Solo only starts a new puzzle/chain through explicit player action.
- Daily Solo only changes daily state through the existing Daily lifecycle and claim-safe behavior.
- Profile Sign out convenience, if implemented, is clearly separate from Profile save actions and preserves Settings as the account-management home.
- Profile-to-Settings navigation, if implemented, has accessible labels and predictable route/scroll behavior.
- HUD click-through, if implemented, stays display-only and active-scope safe.
- All prior phase invariants remain intact.

## Likely Files And Modules

Solo completion and re-entry:

- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/solo/SoloWorkspace.tsx`
- `src/app/App.tsx`
- `src/app/navigationState.ts`
- `src/app/browserNavigationHistory.ts`
- `src/app/gameplayAutoCenter.ts`
- `src/app/games/soloGameplayAutoCenter.ts`
- `src/game/storage/dailyOgStorage.ts`
- `src/game/storage/dailyGoStorage.ts`
- `src/account/resumeSlot.ts`
- `src/account/accountScopedProgress.ts`
- `src/account/autoProgressSync.ts`
- `src/account/sync.ts`

Reward and progression idempotence:

- `src/progression/coins.ts`
- `src/progression/experience.ts`
- `src/progression/progression.test.ts`
- `src/app/progressionHudViewModel.ts`
- `src/app/ProgressionHud.tsx`
- `src/stats/`
- `src/history/`

Profile, Settings, HUD, and Stats convenience:

- `src/account/ProfilePanel.tsx`
- `src/account/ProfilePanel.test.tsx`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`
- `src/app/ProgressionHud.tsx`
- `src/app/ProgressionHud.test.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/app/App.tsx`

Likely E2E and layout tests:

- `e2e/gameplay/solo-daily-go.spec.ts`
- `e2e/gameplay/solo-practice-go.spec.ts`
- `e2e/layout/mobile-scroll.spec.ts`
- New or extended Solo completion re-entry E2E only if practical and bounded.

## Protected Gates

### Source-Only Gate

Proceed source-only only if the fix can use existing state, storage, selectors, route state, and tests without changing persisted schema or authoritative contracts.

### Storage-Contract Gate

Stop for addendum planning if completion state requires a new persisted shape, schema migration, compatibility rewrite, destructive cleanup, or old-progress migration.

### Migration/RLS And Supabase Gate

Stop for addendum planning if the repair requires new Supabase tables, columns, RPCs, grants, policies, or changed `progress_snapshots` contracts.

### Session Gate

Stop for addendum planning if the repair requires strict one-active-session, session leases, heartbeats, remote forced sign-out, or server-side session invalidation.

### Shell Gate

Stop for later planning if the convenience work grows into broad mobile/desktop shell redesign, side-dock work, route model replacement, or persistent navigation contracts.

### Reward Gate

Stop for addendum planning if the fix requires changing XP formulas, coin award amounts, level curves, reward timing, Pay-to-Continue costs, reveal-answer costs, stats calculations, or Daily claim contracts.

### Gameplay-Rule And Elo Gate

Stop for addendum planning if the repair requires changing OG/GO rules, Hard Mode, scoring, Daily uniqueness, timeout/forfeit behavior, or Elo/rating math.

## Solo Completion-State Constraints

- Final winning guesses must persist like other submitted guesses.
- Completed end-screen state must persist until an explicit valid state transition occurs.
- Practice "New practice puzzle" and "New go chain" remain explicit user actions.
- Daily completion must remain date/variant scoped and claim-safe.
- No implicit guest-to-account transfer regression.
- No authenticated progress writes to guest storage.
- Cross-browser signed-in sync/freshness from Phase 46 must remain intact.
- Mobile keyboard visibility and re-entry repairs from Phase 47 must remain intact.

## Reward Idempotence Constraints

- Re-entry must not replay reward application.
- Refresh, route Back/Forward, focus/visibility refresh, sync completion, and resume-slot hydration must not double-award.
- XP, coins, level, Daily claims, stats, history, and progression rewards must remain active-scope owned.
- Existing progression formulas and reward amounts must not change.
- Completed state repair should prefer idempotent completion markers or existing persisted completion evidence over repeated reward application.

## Profile And Settings Account-Boundary Constraints

- Settings remains the clear home for password, sync, progress export/reset, danger actions, and gated account-management flows.
- Profile can expose a signed-in Sign out convenience only if it is visibly separate from profile-save actions.
- Profile-to-Settings navigation should not bypass account gates or confuse public/private profile ownership.
- Sign-out behavior must preserve Phase 47 guest/account display-boundary repairs and Phase 46 sync guards.

## Progression HUD And Stats Navigation Constraints

- HUD remains display-only for active-scope level, coins, and compact XP progress.
- HUD click-through must not mutate storage or expose resource values publicly.
- HUD click-through should preserve Focus Mode recovery and route access.
- Stats target should be deterministic, accessible, and not require broad Stats redesign.

## Privacy And Supabase Constraints

- Do not expose raw auth ids, emails, tokens, private account metadata, local session artifacts, or private progress artifacts.
- Do not change public profile, leaderboard, spectator, Live, or private request payloads during Phase 50 unless a later addendum explicitly authorizes it.
- Keep public/guest spectator boundaries, Daily spectator exclusion, and private Practice request eligibility intact.

## Verification Strategy

Early gates should use focused tests first, then broaden:

- focused unit/component tests for completion-state persistence, reward idempotence, Profile/Settings convenience, and HUD click-through;
- focused Playwright/E2E for Solo completion re-entry and browser Back/Forward if practical;
- mobile layout checks when the repair touches gameplay scroll/viewport behavior;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e` during final hardening if browser flows changed;
- `npm run test:full` during final hardening;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check with `python3 -S`;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

## Visual Handoff Review Expectations

If Phase 50 changes user-visible surfaces, the final hardening stage should capture local-only ignored visual artifacts under:

- `test-results/visual-review/phase-50-stage-50-9/`

Likely scenarios:

- completed Practice Solo OG re-entry;
- completed Practice Solo GO re-entry;
- completed Daily Solo OG/GO re-entry when practical;
- Profile signed-in account convenience if implemented;
- Profile-to-Settings navigation if implemented;
- HUD click-through to Stats if implemented;
- Focus Mode preservation if touched.

## Manual Review Checklist Expectations

Phase 50 final hardening should create:

- `planning/phase-50/REVIEW-CHECKLIST.md`

The checklist should include required checks for Solo completion re-entry, reward idempotence, Profile convenience, HUD click-through, mobile/keyboarding non-regression, account boundary preservation, and deferred-scope confirmation.

## GitHub Backup Workflow Expectations

After Phase 50 final verification, a Review Candidate Backup may be explicitly authorized so the user can manually review the candidate through the normal GitHub-backed hosted/live surface without closing the phase. Review Candidate Backup, Final Acceptance Backup, Git handoff, staging, committing, pushing, PR creation, merging, branch deletion, release, deployment configuration, and backup workflow execution all require explicit later authorization. The planning/spec/implementation stages do not authorize those actions by themselves.

## Risks

- The visible Solo completion bug may be a symptom of a deeper persisted completion-state gap rather than a route-cache issue.
- A naive repair could double-award XP/coins or mutate Daily claims on re-entry.
- Practice and Daily may share UI rendering while relying on different storage lifecycles.
- OG and GO may need different completion evidence because GO chains have intermediate solved puzzles.
- Profile Sign out could confuse profile-save actions if placement is too close.
- HUD click-through could become a broader Stats redesign unless tightly scoped.
- Browser Back/Forward behavior may differ from tab/subtab route navigation and should be tested directly.

## Open Decisions

- Which exact state record is currently missing the final winning guess/completed end-screen evidence?
- Is the completion loss purely UI route-cache state, or does persisted active progress lose terminal state?
- Does the bug occur for guest and signed-in accounts identically?
- Does cross-browser signed-in sync preserve completed Solo terminal state after manual/automatic sync?
- Should Profile Sign out be a secondary button on Profile or a link-style account action?
- Should Profile-to-Settings navigation target the Settings tab generally or the Account Management section directly?
- Should HUD click-through open Stats top-level or a specific progression section if one exists?

## Next Gated Prompt

After Phase 50 final acceptance backup completes, the next safe step is a Phase 51 planning prompt package. Phase 51 implementation remains gated until that planning package is created, reviewed, and explicitly authorized.
