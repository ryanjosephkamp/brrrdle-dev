# Phase 47 Planning Brief - Mobile Solo GO Visibility And Account Display Boundaries

**Status:** Draft for review only.
**Created:** 2026-07-05.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Baseline:** local and remote `main` expected at `77a696738afcac1c212b45c94e155a3c6ae1246f`.

## Authority

This planning brief is authorized only as a documentation and routing artifact. It does not authorize source/runtime implementation, tests, Supabase migrations, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo changes, secret exposure, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, local Codex skill changes, or work against the original stable `brrrdle` repository.

Highest applicable authorities:

- current user instructions;
- `CONSTITUTION.md`;
- `BRRRDLE-SPEC.md`;
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`;
- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`;
- completed Phase 46 evidence and the user-updated `planning/phase-46/REVIEW-CHECKLIST.md`;
- current roadmap and testing guidance.

## Current Baseline

Phase 46 is complete, backed up, merged, branch-cleaned, and manually reviewed with two failed mobile GO follow-up items.

Preserved manual review artifact:

- `planning/phase-46/REVIEW-CHECKLIST.md`

Phase 46 completed and manual review passed for:

- automatic signed-in Solo Daily/Practice sync and freshness through existing `progress_snapshots`;
- no implicit guest-to-account Solo transfer;
- no authenticated progress writes to guest storage;
- Solo Overview active-game cards using `Resume` as the only action;
- prior Phase 45 Solo account boundaries and earlier phase invariants.

## Phase 46 Manual Review Result Summary

Phase 46 manual review was not fully clean. It passed overall, but two mobile GO keyboard/scroll checks failed on real mobile review:

1. `Mobile Daily Solo GO keyboard is visible before the first valid guess`.
2. `Mobile Practice Solo GO remains playable after the first valid guess`.

The review also surfaced broader observations that should be routed without expanding Phase 47 beyond a coherent repair and audit pass:

- returning to Daily/Practice Solo OG/GO after at least one submitted guess can scroll down but not far enough;
- a longer-term mobile gameplay scaling/responsiveness approach may be better than repeated scroll-offset tuning;
- a broad mobile shell/top-tab/navigation overhaul and possible compact side dock remain later product work;
- same-account multi-tab/browser session behavior remains confusing, but strict one-active-session enforcement should not be assumed;
- after sign-out, guest-visible History, leaderboard/rating summaries, Stats, and related account-specific surfaces may still show data from the just-signed-out account.

## Failed Mobile Daily Solo GO Keyboard Summary

Manual result:

- opening mobile Daily Solo GO before the first valid guess still auto-scrolls too high;
- the bottom of the on-screen keyboard is clipped;
- the player must manually scroll farther, defeating the purpose of automatic gameplay entry scrolling.

Planning requirement:

- any mobile automatic scroll into Solo gameplay should leave the full keyboard visible and usable;
- preserving full keyboard visibility is higher priority than preserving all context above the keyboard;
- the keyboard should ideally sit near the bottom of the viewport without horizontal overflow or back-to-top overlap.

## Failed Mobile Practice Solo GO Post-Guess/Re-Entry Summary

Manual result:

- Practice Solo GO can scroll after at least one valid guess, but when the player navigates away and returns to the active GO chain, the page does not scroll far enough;
- the keyboard can remain clipped at the bottom;
- Practice Solo OG `New practice puzzle` scrolls correctly before the first guess, but Practice Solo GO `New go chain` does not reliably auto-scroll far enough and may not scroll at all.

Planning requirement:

- Phase 47 should audit both fresh entry and re-entry flows for Daily/Practice Solo GO;
- Phase 47 should also check whether the same re-entry target issue affects OG after submitted guesses, even though the failed checklist items are GO-specific;
- the immediate success criterion is full keyboard visibility and usable input, not a broad mobile layout redesign.

## Additional Manual-Review Observations

### Mobile Scaling And Navigation

The user correctly identified that repeated scroll-offset tuning may be a symptom of deeper mobile gameplay density and viewport scaling. Phase 47 can audit mobile gameplay viewport sizing enough to avoid another narrow false fix, but it should not implement a broad mobile shell/top-tab/navigation overhaul.

The proposed compact/collapsible side dock is a reasonable later direction for mobile shell work, but it is out of scope for Phase 47 unless a later prompt explicitly authorizes a dedicated mobile shell phase.

### Same-Account Multi-Tab/Browser Sessions

Phase 46 improved signed-in Solo sync freshness but did not implement strict one-active-session enforcement. That remains the right default. Phase 47 should classify residual same-account stale-session behavior and route it, while keeping one-active-session leases, forced sign-out, heartbeats, and server-side session invalidation deferred unless evidence proves they are required now.

### Signed-Out Guest Display Boundaries

The user observed that after sign-out, guest-visible History, leaderboard/rating summaries, and other account-specific surfaces can still show data from the just-signed-out account. This should be routed as a guest/account display-boundary audit and repair path. It is separate from the Phase 46 Solo sync repair and should not undo the automatic signed-in progress sync work.

## Phase-Sizing Decision

Phase 47 can safely begin as a cohesive follow-up phase because the failed manual checks and additional observations share a common theme: mobile/gameplay entry must be reliable, and signed-out/account-specific display surfaces must not confuse guest and authenticated contexts.

The phase should stay narrow by splitting implementation into small gates:

- mobile GO keyboard visibility first;
- source-only versus broader mobile scaling/layout decision before source edits;
- guest/account display-boundary audit after the mobile failure is understood;
- same-account session enforcement classification only, unless a later addendum proves it is required.

Profile simplification, custom-code/private Daily/ranked Daily routing, and broader shell/mobile navigation work should move later because Phase 46 manual review exposed more immediate usability and account-boundary follow-up.

## Goals

Phase 47 should:

- repair or route the mobile Daily Solo GO pre-guess keyboard visibility failure;
- repair or route the mobile Practice Solo GO post-guess/re-entry keyboard visibility failure;
- audit Daily/Practice Solo OG/GO mobile entry and re-entry scroll behavior for a common target issue;
- decide whether the mobile repair can remain source-only scroll/viewport/scaling work or needs broader layout planning;
- preserve Phase 46 automatic signed-in Solo sync/freshness and guest/account Solo transfer protections;
- audit signed-out guest display boundaries for History, leaderboard/rating summaries, Stats, and other account-specific surfaces;
- classify same-account multi-tab/browser session freshness risk without assuming strict session leases;
- prepare a manual review checklist that directly covers the failed real mobile GO cases.

## In Scope

- Read-only audit of Phase 46 manual review notes and current mobile Solo scroll/keyboard code.
- Source-only mobile Solo GO keyboard visibility planning for Daily and Practice.
- Daily/Practice Solo OG/GO mobile entry and re-entry scroll-target audit.
- Mobile gameplay viewport/scaling audit if needed to avoid repeated brittle scroll-offset changes.
- Source-only versus broader mobile layout decisioning before implementation.
- Guest/account display-boundary audit after sign-out for History, Leaderboard/rating summaries, Stats, and other account-specific surfaces.
- Same-account multi-tab/browser session freshness classification and routing.
- Documentation, progress, changelog, visual review, manual review checklist, and Git handoff expectations.

## Out Of Scope

- Source/runtime implementation during this planning gate.
- Test implementation during this planning gate.
- Supabase migration creation or execution.
- Vercel or Supabase configuration.
- Deployment, release, staging, commits, pushes, PRs, merges, or backup workflow execution.
- Broad mobile shell/top-tab/navigation overhaul.
- Compact/collapsible side dock implementation.
- Configurable Home widgets or private request inbox widgets.
- Live/Active/Home spectator previews.
- Notification redesign, notification rival names, or ranked-context notification work.
- UTC/local timestamp policy changes.
- Profile/data-contract simplification.
- Custom-code/private Daily/ranked Daily implementation.
- Admin queue/lobby observability dashboard.
- Social inbox/mailbox.
- Spectator presence/count/list.
- Service workers or push infrastructure.
- Gameplay-rule changes, Daily answer rules, scoring changes, or Elo changes.
- Any work against the original stable `brrrdle` repository.

## Recommended Phase 47 v1 Scope

Phase 47 v1 should complete the safest path through:

1. protected baseline and Phase 46 manual-review intake confirmation;
2. mobile Solo GO keyboard/viewport audit and real reproduction;
3. source-only versus broader mobile layout/scaling decision;
4. mobile Solo GO keyboard visibility and re-entry scroll repair if source-only is safe;
5. guest/account display-boundary audit and source-only versus storage/session decision;
6. narrow guest/account display-boundary repair if source-only is safe, otherwise addendum/routing;
7. final hardening, visual review, changelog, and manual checklist.

If the mobile repair proves to require broad shell navigation changes, a compact side dock, or a major gameplay layout overhaul, Phase 47 should stop and create a separate mobile layout addendum rather than implementing the redesign inside a bugfix stage.

If the guest/account display-boundary repair proves to require new storage schema, Supabase/RLS changes, destructive cleanup, or session leases, Phase 47 should stop and route to an addendum.

## Recommended Narrow Stage Breakdown

### Stage 47.0 - Protected Baseline And Manual Review Intake

- Confirm repo state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the stable `brrrdle` repository is not in use.
- Preserve `planning/phase-46/REVIEW-CHECKLIST.md`.
- Record current Phase 47 planning/spec/progress artifacts.
- Run the baseline verification gate before audit or implementation.

### Stage 47.1 - Mobile Solo GO Keyboard/Viewport Audit And Reproduction

- Reproduce or characterize mobile Daily Solo GO pre-guess keyboard clipping.
- Reproduce or characterize mobile Practice Solo GO new-chain and post-guess/re-entry clipping.
- Check whether Daily/Practice Solo OG re-entry shares the same scroll-target problem.
- Audit current `gameplayAutoCenter`, `soloGameplayAutoCenter`, OG/GO markup, CSS scroll margins, back-to-top overlap, browser chrome behavior, and Playwright mobile assertions.
- Decide whether the mobile issue is a target selection, timing, scroll-margin, layout density, safe-area, or scaling problem.

### Stage 47.2 - Source-Only Versus Broader Mobile Layout Decision

- Decide whether Stage 47.3 can remain source/test-only.
- If source-only is safe, define exact repair boundaries for scroll targets, timing, CSS margins, viewport sizing, and mobile-only behavior.
- If broader mobile shell/navigation/scaling work is required, create a narrow mobile layout addendum and stop before implementation.

### Stage 47.3 - Mobile Solo GO Keyboard Visibility And Re-Entry Repair

- If authorized and source-only, repair the smallest mobile Solo GO keyboard visibility path.
- Cover Daily GO pre-guess, Practice GO new-chain entry, and Practice/Daily GO re-entry after submitted guesses.
- Preserve OG behavior that already passes, while fixing common re-entry issues if the same root cause is present.
- Preserve desktop/tablet layout, Phase 46 sync/freshness behavior, and gameplay rules.

### Stage 47.4 - Guest/Account Display-Boundary Audit

- Audit what guest-visible History, Leaderboard/rating summaries, Stats, Active/Multiplayer projections, Settings/Profile surfaces, and cached view models show immediately after sign-out.
- Classify whether account-specific signed-out leakage is a source-only cache/view-model reset issue or requires storage/session addendum planning.
- Include same-account multi-tab/browser session freshness classification, but keep strict one-active-session enforcement deferred unless evidence proves it is required.

### Stage 47.5 - Guest/Account Display-Boundary Repair Or Addendum Routing

- If source-only is safe, repair the narrow signed-out display-boundary issue.
- Ensure guests do not see the just-signed-out account's History, leaderboard/rating summaries, Stats, or account-specific projections.
- Preserve legitimate guest-local history/stats where present.
- Stop and route to addendum planning if storage contracts, Supabase/RLS changes, destructive cleanup, or session leases are required.

### Stage 47.6 - Final Hardening, Visual Review, Changelog, And Checklist

- Run focused regressions and final verification.
- Run real mobile/browser or Playwright mobile visual review for the failed GO cases.
- Create Phase 47 changelog and manual review checklist.
- Preserve local-only visual artifacts under ignored `test-results/visual-review/phase-47-stage-47-6/`.

## Success Criteria

Phase 47 succeeds when:

- mobile Daily Solo GO before the first valid guess leaves the full keyboard visible and usable;
- mobile Practice Solo GO `New go chain` and active-chain re-entry leave the full keyboard visible and usable;
- returning to an active Daily/Practice Solo GO game after at least one guess scrolls far enough to use the full keyboard without manual extra scrolling;
- OG re-entry behavior is either confirmed safe or repaired if the same root cause applies;
- the repair does not introduce horizontal overflow, desktop layout regression, or back-to-top keyboard occlusion;
- Phase 46 automatic signed-in Solo sync/freshness still works;
- no implicit guest-to-account Solo transfer and no authenticated progress writes to guest storage remain preserved;
- signed-out guest account-specific display-boundary behavior is audited and either repaired source-only or routed to a reviewed addendum;
- one-active-session enforcement remains deferred unless evidence proves it is required;
- Daily claim safety, gameplay rules, and Elo math remain unchanged;
- focused tests, relevant mobile/browser checks, final verification, visual review, changelog, and manual checklist pass before Git handoff.

## Likely Files And Modules

Mobile Solo gameplay and scroll:

- `src/app/gameplayAutoCenter.ts`
- `src/app/gameplayAutoCenter.test.ts`
- `src/app/games/soloGameplayAutoCenter.ts`
- `src/app/games/soloGameplayAutoCenter.test.ts`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/solo/SoloWorkspace.tsx`
- `src/solo/SoloWorkspace.test.tsx`
- `src/app/App.tsx`
- `src/index.css`
- `e2e/layout/mobile-scroll.spec.ts`

Guest/account display boundaries:

- `src/account/accountScopedProgress.ts`
- `src/account/autoProgressSync.ts`
- `src/account/sync.ts`
- `src/account/syncStatus.ts`
- `src/account/guestStorage.ts`
- `src/account/storageSchema.ts`
- `src/app/App.tsx`
- `src/history/HistoryWorkspace.tsx`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/account/Settings.tsx`
- relevant account boundary, history, leaderboard, stats, and route/cache tests.

Docs and progress:

- `planning/phase-47/`
- `planning/specs/phase-47/`
- `planning/testing/TESTING-SUITE.md` if new durable mobile or account-boundary E2E expectations are added
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

## Source-Only, Storage-Contract, Supabase/RLS, And Session-Lease Gates

Phase 47 mobile work may remain source-only only if:

- the repair is limited to scroll target selection, timing, CSS scroll margins, responsive sizing, safe-area spacing, or mobile-only layout constraints;
- no new gameplay state, storage schema, Supabase table, RPC, RLS policy, or deployment configuration is needed;
- desktop/tablet layout remains preserved.

Phase 47 account display-boundary work may remain source-only only if:

- the signed-out leakage is caused by view-model/cache state, active `guestProgress` selection, route hydration, or component rendering after auth-state transition;
- guest-local history/stats can be preserved without showing the just-signed-out account's data;
- no storage migration, destructive cleanup, RLS change, or session lease is needed.

Create an addendum and stop before implementation if any Phase 47 item requires:

- a new Supabase table, column, RPC, RLS policy, or grant;
- direct changes to `progress_snapshots` storage contract;
- server-authoritative Daily submissions;
- strict one-active-session leases, forced sign-out, heartbeats, or invalidation;
- destructive local cleanup or storage-key migration;
- gameplay-rule, Daily claim, scoring, or Elo changes;
- broad mobile shell/top-tab/navigation redesign.

## Mobile Viewport, Scroll, And Keyboard Constraints

- Full keyboard visibility is the minimum mobile gameplay entry requirement.
- For GO, the current puzzle context can be partly higher on the page if needed, but the keyboard cannot be clipped.
- Scroll targets should be robust for fresh entry, post-guess state, and re-entry after navigation.
- Mobile checks should account for browser chrome and safe-area bottom insets where feasible.
- Back-to-top controls must not cover essential keyboard actions.
- Avoid one-off offsets that only satisfy Playwright if real mobile evidence points elsewhere.
- Longer-term responsive scaling may be considered in audit and decision stages, but broad mobile shell work remains deferred.

## Account/Guest Display-Boundary Constraints

- Guests should see only guest-safe local data.
- Signing out must not leave the just-signed-out account's History, leaderboard/rating summaries, Stats, Active Multiplayer projections, or account-specific profile/settings data visible as guest-owned content.
- Legitimate guest-local History and Stats can remain visible if they belong to the guest progress scope.
- Authenticated account data should remain available again after sign-in through the reviewed account progress path.
- The repair must not reintroduce guest-to-account Solo transfer or account-to-guest Solo leakage.

## Sync/Session Freshness Constraints

- Preserve Phase 46 automatic signed-in Solo sync/freshness.
- Preserve manual `Sync now`.
- Do not write authenticated progress to guest storage.
- Do not implicitly upload guest progress to authenticated accounts.
- Same-account multi-tab/browser concerns should be classified and routed.
- Strict one-active-session enforcement remains a later optional session-lease/security feature unless evidence proves it is required for Phase 47.

## Privacy And Supabase Constraints

- Do not print Supabase keys, Vercel tokens, auth tokens, account emails, raw auth IDs, local session artifacts, or private row data.
- Browser/E2E work should use safe test accounts and non-secret logs.
- Public/guest spectator contracts, public profile privacy, private matchmaking boundaries, Daily claim safety, ranked queue fairness, and Elo authority must remain unchanged.
- No migration should be created or applied without a separate explicit prompt.

## Real Mobile And Browser Verification Strategy

Phase 47 implementation should use both automated and manual-friendly evidence:

- focused mobile Playwright checks for Daily GO pre-guess keyboard visibility;
- focused mobile Playwright checks for Practice GO new-chain entry and active-chain re-entry after a submitted guess;
- focused OG re-entry regression check if the root cause is shared;
- horizontal overflow checks at narrow widths;
- visual handoff captures for the failed real mobile scenarios;
- manual checklist items that mirror the user's real-device failures rather than only desktop or happy-path flows.

If Playwright cannot reproduce browser-chrome clipping reliably, record that limitation and make the manual checklist explicit.

## Verification Strategy

Planning/spec stages:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- `git status --short --branch`

Implementation stages:

- focused tests first;
- focused mobile/browser checks before broad suites when changing scroll/viewport behavior;
- `npm run lint`;
- `npm run test`;
- focused relevant E2E/browser checks;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

Final hardening should add `npm run test:e2e` and `npm run test:full` if Phase 47 source/test work proceeds.

## Visual Handoff Review Expectations

Phase 47 final review should include local-only ignored screenshots under `test-results/visual-review/phase-47-stage-47-6/` for:

- mobile Daily Solo GO pre-guess keyboard visible;
- mobile Practice Solo GO pre-guess or new-chain keyboard visible;
- mobile Practice Solo GO post-guess/re-entry keyboard visible;
- any signed-out guest display-boundary surface if user-visible repair is implemented.

These artifacts must remain ignored and must not be staged or committed.

## Manual Review Checklist Expectations

Create `planning/phase-47/REVIEW-CHECKLIST.md` after final verification if Phase 47 implementation completes. It should include explicit checks for:

- mobile Daily Solo GO keyboard visible before first valid guess;
- mobile Practice Solo GO new-chain entry scrolls to a usable keyboard;
- mobile Practice Solo GO remains playable after a valid guess and re-entry;
- Daily/Practice Solo OG/GO re-entry does not clip the keyboard if audited/repaired;
- signed-out guest History does not show the just-signed-out account's history;
- signed-out guest Leaderboard/rating summaries do not show the just-signed-out account's ratings;
- signed-out guest Stats and other account-specific surfaces stay guest-safe;
- Phase 46 automatic signed-in Solo sync/freshness remains intact;
- Daily claim safety, gameplay rules, and Elo math remain unchanged.

## GitHub Backup Workflow Expectations

After Phase 47 implementation and manual checklist creation, run a separate Git handoff preparation pass before any backup workflow. A future backup prompt must:

- use an explicit allowlist of changed files;
- exclude `.env*`, `.DS_Store`, `dist/`, `node_modules/`, `supabase/.temp/`, `test-results/`, `playwright-report/`, screenshots, videos, traces, auth state, tokens, Supabase keys, Vercel tokens, local session artifacts, and local Codex skills;
- invoke `brrrdle-github-backup` only when explicitly authorized;
- preserve the stable `brrrdle` repository boundary.

## Risks

- Real mobile browser chrome may behave differently from Playwright's mobile viewport; manual evidence may remain necessary.
- Fixing GO by scroll offset alone may mask a deeper viewport/scaling issue.
- Broad mobile shell changes would create avoidable regression risk if folded into a bugfix phase.
- Guest/account display-boundary repair could touch high-conflict app state and should be sequenced carefully.
- Same-account session leases can create stale-lock and lost-progress problems if introduced before a storage/session design exists.
- Any account-boundary repair must avoid weakening Phase 46 automatic sync or Phase 45 guest/auth Solo isolation.

## Open Decisions

- Is the mobile GO failure primarily caused by scroll target timing, target element position, CSS scroll margin, browser chrome/safe-area behavior, or GO layout density?
- Should the immediate mobile repair prioritize keyboard bottom alignment even if the latest submitted guess is partly offscreen?
- Can OG and GO share one robust re-entry auto-center target?
- Does signed-out account-specific display leakage come from `guestProgress` scope selection, cached view models, route state, component props, or another source?
- Can the guest display-boundary repair stay source-only?
- Does same-account multi-tab/browser behavior need only documentation/freshness follow-up, or should it become a later session-lease/security phase?

## Next Gated Prompt

The next safe action is a unified Phase 47 specification for review only. Do not begin implementation until that specification and a detailed implementation plan are created and reviewed.
