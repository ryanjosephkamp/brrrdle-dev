# Phase 46 Planning Brief - Solo Sync Integrity And Manual Review Follow-Up

**Status:** Draft for review only
**Created:** 2026-07-05
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Baseline:** local and remote `main` expected at `aef8dba063e57cd5381852a66b9a0006fe52bf39`

## Authority

This planning brief is authorized only as a documentation and routing artifact. It does not authorize source/runtime implementation, tests, Supabase migrations, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo changes, secret exposure, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, or work against the original stable `brrrdle` repository.

Highest applicable authorities:

- current user instructions;
- `CONSTITUTION.md`;
- `BRRRDLE-SPEC.md`;
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`;
- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`;
- completed Phase 45 evidence and the user-updated `planning/phase-45/REVIEW-CHECKLIST.md`;
- current roadmap and testing guidance.

## Current Baseline

Phase 45 is complete, backed up, merged, branch-cleaned, and manually reviewed. Manual review passed.

Preserved manual review artifact:

- `planning/phase-45/REVIEW-CHECKLIST.md`

The user's Phase 45 review note confirms that the repaired Daily Solo guest/auth boundary works, but cross-browser signed-in Daily Solo persistence still depends on manual account sync. The user also raised three follow-up observations:

- signed-in Solo Daily/Practice progress should sync more automatically to reduce stale cross-browser state and Daily Solo cheating opportunities;
- the Solo Overview active-game `Select` button appears to select/highlight a resume slot without a meaningful game action;
- mobile Solo Daily/Practice pre-guess auto-scroll can leave the on-screen keyboard cut off at the bottom, while post-guess playability passes.

## Phase-Sizing Decision

Phase 46 should be a cohesive follow-up phase focused on Solo account freshness and small Solo-surface cleanup. The sync/anti-cheat problem should lead the phase because it affects Daily integrity and cross-browser account expectations. The UI follow-ups are small enough to batch behind that audit as separate narrow stages.

Phase 46 should not become a broad mobile shell, Home widget, social, spectator, notification redesign, deployment, gameplay-rule, or Elo phase.

## Recommended Direction

The first recommendation is to improve signed-in Solo sync and freshness before attempting one-active-session enforcement.

One-active-session enforcement may eventually be useful, but it is a more complex session-lease/security feature. It can create stale-lock and lost-progress problems when users close tabs, lose network, background mobile browsers, or switch devices. Phase 46 should evaluate it, but should not assume it is necessary.

Preferred first path:

- audit the existing `progress_snapshots` download/upload path and the manual `Sync now` flow;
- add or plan automatic signed-in Solo sync points if source-only evidence supports them;
- prioritize Daily Solo sync after valid guesses because Daily integrity has the highest anti-cheat value;
- consider debounced Practice Solo sync, focus/visibility refresh, route-entry refresh, and same-browser tab freshness via storage events or BroadcastChannel-style coordination;
- keep guest progress local and separated from authenticated account progress;
- stop for a storage-contract or Supabase/RLS addendum if reliable anti-cheat requires server-authoritative Daily Solo submissions, atomic conflict handling, a new RPC, or a session lease.

## Goals

Phase 46 should:

- audit signed-in Solo Daily/Practice automatic sync and account freshness;
- decide source-only versus storage-contract/Supabase repair before implementation;
- reduce stale cross-browser and cross-tab signed-in Solo progress;
- preserve the Phase 45 guest/auth isolation repair and prevent implicit guest-to-account transfer regressions;
- route one-active-session enforcement as optional later session-lease/security work unless evidence proves it is required now;
- remove the Solo Overview active-game `Select` button if it has no meaningful function, or define and test a meaningful function if it should remain;
- repair narrow mobile Solo pre-guess keyboard visibility/scroll behavior without broad mobile shell redesign;
- update tests and manual-review expectations for the new sync/freshness and mobile behavior.

## In Scope

- Read-only audit of signed-in Solo sync, `progress_snapshots`, account hydration, sign-in/sign-out rehydration, resume slots, local storage, and route/cache behavior.
- Source-only automatic sync/freshness repairs if existing storage contracts are enough.
- Storage-contract/Supabase addendum planning if source-only work is not enough.
- Real browser/E2E planning for two tabs and two browser profiles using safe non-secret accounts.
- Solo Overview active-game selection behavior audit and removal/function decision.
- Mobile Solo pre-guess keyboard visibility repair planning.
- Documentation, progress, changelog, visual review, and manual checklist updates.

## Out Of Scope

- Broad mobile shell/top-tab/navigation overhaul.
- Configurable Home widgets or private request inbox widgets.
- Live/Active/Home spectator previews.
- Notification redesign, notification rival names, or ranked-context notification work.
- UTC/local timestamp policy changes.
- Profile/data-contract simplification.
- Admin queue/lobby observability dashboard.
- Social inbox/mailbox.
- Spectator presence/count/list.
- Service workers or push infrastructure.
- Deployment, release, Vercel configuration, or Supabase configuration changes.
- Gameplay-rule changes, Daily answer rules, scoring changes, or Elo changes.
- Any work against the original stable `brrrdle` repository.

## Recommended Phase 46 v1 Scope

Phase 46 v1 should complete the safest path through:

1. protected baseline and review intake;
2. sync/session audit and reproduction;
3. source-only versus storage-contract/Supabase/session-lease decision;
4. automatic signed-in Solo sync/freshness repair or addendum planning;
5. Solo Overview `Select` button cleanup;
6. mobile Solo pre-guess keyboard visibility repair;
7. final hardening, visual review, changelog, and manual checklist.

If Stage 46.2 determines that the sync problem requires server-authoritative Daily Solo submissions, a new storage contract, or active-session leases, implementation must pause for a reviewed addendum before source/runtime work continues.

## Success Criteria

Phase 46 succeeds when:

- signed-in Solo Daily progress is not dependent on a user remembering manual sync for ordinary cross-browser freshness within the selected contract;
- signed-in Practice Solo sync behavior is improved or explicitly documented as lower-risk and deferred;
- guest progress remains guest-owned and cannot silently transfer into authenticated account progress;
- signed-in progress does not leak into guest surfaces after sign-out;
- same-account multi-tab/browser behavior is characterized and either repaired source-only or routed to a storage/session addendum;
- the Solo Overview `Select` button is removed or given a clearly useful, tested behavior;
- mobile Solo pre-guess keyboard entry keeps the keyboard reachable on narrow mobile viewports;
- Daily claim safety, gameplay rules, and Elo math remain unchanged;
- focused tests, real browser/E2E coverage where feasible, and final verification pass;
- a Phase 46 changelog and manual review checklist are created before Git handoff.

## Likely Files And Modules

Account and sync:

- `src/account/sync.ts`
- `src/account/syncStatus.ts`
- `src/account/accountScopedProgress.ts`
- `src/account/guestStorage.ts`
- `src/account/guestTransfer.ts`
- `src/account/storageSchema.ts`
- `src/account/resumeSlot.ts`
- `src/account/Settings.tsx`

Solo and gameplay:

- `src/app/App.tsx`
- `src/app/navigationState.ts`
- `src/app/gameplayAutoCenter.ts`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/solo/SoloWorkspace.tsx`
- `src/game/storage/dailyOgStorage.ts`
- `src/game/storage/dailyGoStorage.ts`
- `src/index.css`

Testing and E2E:

- `src/app/games/dailyAccountBoundary.test.tsx`
- `src/app/games/practiceAccountBoundary.test.tsx`
- `src/account/*sync*` tests if new helpers are introduced
- `e2e/fixtures/`
- `e2e/layout/mobile-scroll.spec.ts`
- new focused two-tab/two-profile sync tests if feasible

Docs and progress:

- `planning/phase-46/`
- `planning/specs/phase-46/`
- `planning/testing/TESTING-SUITE.md` if new durable sync or browser coverage is added
- `docs/supabase.md` only if an approved storage-contract/Supabase addendum changes RPC or table behavior
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

## Storage-Contract, Migration, And Supabase Gates

Phase 46 may remain source-only only if:

- existing `progress_snapshots` can safely support automatic signed-in Solo uploads/downloads;
- automatic sync does not require new table columns, new RPCs, RLS changes, or migration changes;
- merge/conflict behavior can preserve account ownership and avoid guest-to-account transfer;
- Daily Solo anti-cheat can be improved without server-authoritative move submission.

A storage-contract/Supabase addendum is required if:

- Daily Solo needs atomic server-side move acceptance or conflict prevention;
- a new authenticated Solo progress table, row lock, revision, or RPC is needed;
- direct browser writes need new RLS policy review;
- one-active-session enforcement requires server-side session leases, heartbeats, or invalidation;
- existing `progress_snapshots` merge semantics are insufficient or unsafe for automatic per-guess sync.

No migration should be created or applied without a separate explicit prompt.

## Account, Guest, And Cloud Persistence Constraints

- Guest state remains local and guest-owned.
- Authenticated state remains account-owned.
- Signing in must not implicitly upload or merge guest Solo progress into the account.
- Signing out must not leave authenticated Solo progress visible to guest surfaces.
- Automatic sync must avoid overwriting newer account cloud progress with stale local state.
- Cross-tab same-account coordination should prefer lightweight browser-local signaling before server-side session locks.
- Manual sync must remain available as a recovery/control path.

## Session Enforcement Recommendation

Do not make one-active-session enforcement the default Phase 46 implementation path.

Instead:

- audit whether automatic signed-in Solo sync plus focus/visibility refresh solves the practical cheating/staleness risk;
- document residual risks for users intentionally opening multiple Daily tabs;
- escalate to a storage/session addendum only if stronger anti-cheat requires server authority;
- treat strict one-active-session enforcement as a later optional security/session-lease feature with stale-lock, mobile backgrounding, and unsynced-progress recovery requirements.

## Daily Solo And Practice Solo Constraints

- Daily Solo must remain fixed-five, date-keyed, and claim-safe.
- Daily answer selection and validation rules must not change.
- Practice Solo must preserve 2-35 word-length support, OG/GO behavior, Hard Mode behavior, and existing resume semantics.
- No gameplay rules, scoring, streak rules, XP/coin behavior, or Elo math may be changed in this phase without a separate gate.

## Solo Overview Select Button Constraints

Current evidence indicates the Solo Overview `Select` button mainly highlights a card, stores `selectedSoloGameKey`, and triggers gameplay auto-center. Resume/Open buttons perform the actual game-opening behavior.

Phase 46 should:

- verify whether any accessibility, navigation, or hidden workflow depends on the selected state;
- remove the button and selected-card affordance if it has no meaningful game function;
- preserve direct resume/open behavior;
- avoid replacing it with another low-value control.

## Mobile Solo Keyboard Visibility Constraints

Phase 46 should target the pre-guess mobile entry case where route/subtab auto-scroll can leave the keyboard bottom clipped. It should not redesign mobile navigation.

Acceptable work:

- adjust the pre-guess auto-center target, scroll block alignment, scroll margin, or mobile spacing;
- add a focused mobile Playwright check when feasible;
- preserve post-guess keyboard/context visibility from Phase 45.6;
- preserve desktop layout.

Out of scope:

- broad top-tab/navigation redesign;
- Focus Mode;
- major shell restructuring;
- gameplay input semantic changes.

## Privacy And Security Constraints

- Do not print Supabase keys, Vercel tokens, auth tokens, account emails, raw auth IDs, local session artifacts, or private row data.
- Browser/E2E work should use safe test accounts and non-secret logs.
- Any cloud-sync change must preserve account isolation and existing RLS/privacy boundaries.
- Public/guest spectator contracts, public profile privacy, private matchmaking boundaries, Daily claim safety, and ranked queue fairness must remain unchanged.

## Verification Strategy

Planning/spec stages:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check when browser work is used
- `git status --short --branch`

Implementation stages:

- focused sync/account-boundary tests first;
- focused Solo Daily/Practice persistence tests;
- focused browser/E2E for two tabs and two browser profiles where feasible;
- focused mobile keyboard visibility check;
- `npm run lint`
- `npm run test`
- relevant focused Playwright/E2E;
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- documentation and artifact hygiene checks.

Final stage:

- focused regressions;
- full local verification;
- visual handoff review under ignored `test-results/visual-review/phase-46-*`;
- changelog and manual checklist;
- Git handoff preparation after review only.

## Visual Handoff Expectations

If Phase 46 touches visible Solo surfaces, final visual review should include:

- Solo Overview active games after `Select` button decision;
- mobile Daily Solo pre-guess keyboard visibility;
- mobile Practice Solo pre-guess keyboard visibility;
- a desktop Solo smoke capture to confirm no desktop regression.

Artifacts must remain ignored/local-only under `test-results/visual-review/`.

## Manual Review Checklist Expectations

The Phase 46 checklist should include manual checks for:

- signed-in Daily Solo progress freshness across two browser profiles after normal play;
- signed-in Practice Solo progress freshness across two browser profiles if implemented;
- same-account two-tab behavior and any residual stale-state caveat;
- guest-to-account transfer remains blocked;
- account-to-guest leakage remains blocked after sign-out;
- Solo Overview active-game controls are understandable and useful;
- mobile pre-guess keyboard is not clipped on a real mobile device;
- Phase 45 account-boundary repairs remain intact.

## GitHub Backup Workflow Expectations

GitHub backup remains separately gated after Phase 46 final verification, manual review, and handoff preparation. The backup workflow should not be run during planning, specification, implementation, or visual review stages unless the user explicitly authorizes it.

## Risks

- Automatic sync can overwrite newer cloud progress if revision/conflict handling is weak.
- Per-guess sync can create network churn if not scoped and debounced carefully.
- Daily anti-cheat may require server-authoritative submission to be truly robust.
- One-active-session locks can trap users behind stale sessions or lost mobile tabs if implemented prematurely.
- Browser automation for two-profile auth flows may require safe credentials and careful cleanup.
- Mobile keyboard scroll behavior can vary by browser chrome and viewport height.

## Open Decisions

- Can Phase 46 stay source-only using existing `progress_snapshots`, or is a storage-contract/Supabase addendum required?
- Should signed-in Daily Solo sync after every valid guess, after every state-changing capture, on debounce, on route exit, or a combination?
- Should Practice Solo sync use the same timing as Daily or a lower-frequency path?
- What conflict policy should win if two same-account tabs submit divergent signed-in Solo progress before syncing?
- Is strict one-active-session enforcement necessary now, or should it remain a later security/session-lease feature?
- Should Solo Overview selected-state persistence be removed entirely if the `Select` button is removed?
- What mobile viewport threshold best captures the pre-guess keyboard clipping issue without hurting desktop or tablet layout?

## Next Gated Action

The next safe gate is a unified Phase 46 specification for review only. The spec should translate this brief into implementation-oriented requirements, stage gates, likely files/modules, verification, storage/Supabase addendum conditions, and explicit deferrals.
