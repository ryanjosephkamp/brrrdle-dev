# Progress Step 447 - Phase 49 Stage 49.1 Progression HUD And Resource-Surface Audit

**Date:** 2026-07-06
**Phase:** Phase 49 - Progression HUD, Focus Mode, And Mobile UX Shell Polish
**Stage:** Stage 49.1 - Progression HUD and resource-surface audit
**Status:** Completed - Awaiting User Review Before Stage 49.2

## Authorization

The user authorized Phase 49 Stage 49.1 only: read-only progression HUD and resource-surface audit using the completed Stage 49.0 baseline.

This stage is limited to:

- confirming repository state and stable-repository boundary;
- preserving the user-updated Phase 48 manual review checklist;
- reading Phase 49 planning/spec/implementation materials and Stage 49.0 progress evidence;
- auditing progression, rewards, XP, level, coins, consumables, Pay-to-Continue, reveal-answer, Stats, Settings, History, account sync, guest/cloud progress, and visible resource surfaces;
- mapping product meaning and ownership for candidate HUD values;
- identifying guest/account, stale-state, sync, privacy, route-density, and UI clarity risks;
- recommending a first display-only HUD subset or deferral;
- classifying whether Stage 49.3 can likely remain source-only or may require protected storage/Supabase/addendum planning;
- creating this progress report and matching 12-column progress CSV row;
- running lightweight verification.

This stage does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, storage schema changes, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, private Daily implementation, ranked Daily implementation, spectator presence/count/list implementation, service workers, push infrastructure, strict one-active-session/session-lease implementation, server-authoritative Daily implementation, broad mobile shell redesign, compact side-dock implementation, theme modernization, gameplay-rule changes, Elo changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, local Codex skill changes, or work in the original stable `brrrdle` repository.

## Repository And Boundary

- Working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- Local `HEAD`: `07fd0e0d8acb8244b7779fc7f0cce46bf0424db4`
- `origin/main`: `07fd0e0d8acb8244b7779fc7f0cce46bf0424db4`
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`
- Stable-repository boundary: immediate workspace scan showed only `../brrrdle-dev`; the original stable `brrrdle` repository was not used or touched.
- Preserved manual review checklist: `planning/phase-48/REVIEW-CHECKLIST.md`

## Audited Surfaces

- Phase 49 planning/spec/implementation: `planning/phase-49/PLANNING-BRIEF.md`, `planning/specs/phase-49/PHASE-49-PROGRESSION-HUD-FOCUS-MODE-AND-MOBILE-UX-SHELL-POLISH-SPEC-2026-07-06.md`, `planning/phase-49/IMPLEMENTATION-PLAN.md`
- Stage 49.0 evidence: `progress/PROGRESS-STEP-446.md`
- Progression domain: `src/progression/coins.ts`, `src/progression/experience.ts`, `src/progression/consumables.ts`, `src/progression/payToContinue.ts`, `src/progression/progression.test.ts`
- Progress storage and sync: `src/account/storageSchema.ts`, `src/account/guestStorage.ts`, `src/account/accountScopedProgress.ts`, `src/account/sync.ts`, `src/account/autoProgressSync.ts`
- Current resource displays and selectors: `src/account/Settings.tsx`, `src/account/Settings.test.tsx`, `src/stats/StatsDashboard.tsx`, `src/stats/statsSelectors.ts`, `src/stats/statsSelectors.test.ts`, `src/history/historyViewModels.ts`, `src/solo/soloViewModels.ts`
- App wiring and spend/completion ownership: `src/app/App.tsx`, `src/app/games/OgGame.tsx`, `src/app/games/GoGame.tsx`

## Resource Ownership Map

- Progression state is stored in `GuestProgressState.progression` with `coins`, `consumables`, `level`, and `xp`.
- The active progression state is already scoped through the current progress owner: guest, unconfigured local, or authenticated user.
- Guest/unconfigured progress persists to browser-local guest storage; authenticated progress persists through existing `progress_snapshots` sync paths.
- Completed Solo games call `recordCompletedGame`, which awards XP and coins, updates level from total XP, appends History, updates Stats, and clears matching resume slots.
- Coin spending currently happens through `handleSpendCoins` in `App.tsx`, then flows into OG/GO Pay-to-Continue and reveal-answer controls.
- Manual and automatic authenticated sync already preserve account ownership through existing scope/user-id guards.

## Current Product Meaning

- Level: a compact player progression marker derived from total XP using the existing level curve.
- XP: total earned progression from completed games, already surfaced in Settings and Stats.
- XP-to-next-level: already available through `selectXpProgress`, with progress percent and remaining XP.
- Coins: current spendable balance used by Pay-to-Continue and reveal-answer controls.
- Coin trend: historical earned coins from completed games, already a Stats chart, not the same as current spendable balance.
- Consumables: domain functions and storage counters exist, but the audited UI does not show a mature inventory purchase/use loop; they should not become top-level HUD promises in the first slice.
- Pay-to-Continue and reveal-answer costs: contextual gameplay costs, best kept inside game surfaces rather than promoted to global HUD values.
- History reward labels: per-result XP/coin awards are already displayed in History and Solo recent results.
- Settings snapshot: Level, XP, and Coins already appear in Account management as a heavier progress/export view.

## Risks

- Guest/account risk: a HUD must read only the active scoped progress state and must not retain stale authenticated values after sign-out or account switch.
- Sync risk: authenticated HUD values may briefly lag pending cloud sync unless they are explicitly treated as local active-progress values, not server-authoritative values.
- Privacy risk: progression values are private current-player state unless a later public-profile or leaderboard contract explicitly exposes them.
- UI-density risk: Settings and Stats already provide detailed progression/resource views; the HUD should stay small and avoid duplicating dashboards.
- Product-semantics risk: consumables and contextual costs can imply unapproved inventory/economy features if surfaced prematurely.

## Recommended HUD Subset

Stage 49.4 can safely target a display-only first slice if Stage 49.3 confirms the source-only boundary:

- current level;
- current coin balance;
- compact XP progress toward the next level, derived from existing XP and level math.

Recommended first-slice exclusions:

- consumable inventory counts;
- Pay-to-Continue or reveal-answer prices outside gameplay panels;
- coin trend;
- history reward totals;
- public/profile-visible progression values;
- any new earning, spending, marketplace, economy, or progression mechanics.

## Stage 49.3 Source-Only Versus Addendum Recommendation

Stage 49.3 can likely remain source-only for a display-only HUD that reads existing active `GuestProgressState.progression`, derives XP progress from existing selectors/math, and preserves all existing progress ownership and sync boundaries.

Protected addendum planning is required if Phase 49 tries to:

- change reward formulas, XP level curves, coin costs, consumable behavior, Pay-to-Continue, or reveal-answer economics;
- add new progression/resource storage fields or change `progress_snapshots` payload contracts;
- expose progression/resource values publicly or through profile/leaderboard contracts;
- add persisted HUD preferences that cannot safely fit the existing settings contract;
- add inventory, marketplace, collectibles, purchases, monetization, or new resource spending loops;
- change guest/account transfer, sync, or privacy semantics.

## Verification

Stage 49.1 lightweight verification passed:

- `git diff --check`: passed.
- Progress CSV shape check: `rows=449 columns=[12] last_id=447`.
- Non-printing credential-value scan: `scanned_files=13 credential_value_hits=0 binary_skipped=0`.
- Ignored-artifact check: `tracked_files=1149 staged_files=0 forbidden_artifact_hits=0`.
- Watched-port cleanup check: `5173`, `5174`, `3000`, and `4173` clear.
- `git status --short --branch`: completed.

Note: the ignored-artifact check treats the tracked `.env.example` template as an allowed repository template and still rejects real local env files, generated artifacts, auth state, tokens, reports, traces, screenshots, videos, local session artifacts, and local Codex skill files.

## Next Safe Gate

The next safe gate is Phase 49 Stage 49.2: read-only Focus Mode and compact/mobile shell audit only.
