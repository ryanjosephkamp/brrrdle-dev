# Progress Step 448 - Phase 49 Stage 49.2 Focus Mode And Compact/Mobile Shell Audit

**Date:** 2026-07-06
**Phase:** Phase 49 - Progression HUD, Focus Mode, And Mobile UX Shell Polish
**Stage:** Stage 49.2 - Focus Mode and compact/mobile shell audit
**Status:** Completed - Awaiting User Review Before Stage 49.3

## Authorization

The user authorized Phase 49 Stage 49.2 only: read-only Focus Mode and compact/mobile shell audit using the completed Stage 49.1 progression HUD/resource-surface audit baseline.

This stage is limited to:

- confirming repository state and stable-repository boundary;
- preserving the user-updated Phase 48 manual review checklist;
- reading Phase 49 planning/spec/implementation materials and Stage 49.1 progress evidence;
- auditing current app shell, route rail/top navigation, mobile route access, Back-to-top behavior, route attention, gameplay entry, keyboard visibility, safe-area behavior, reduced-motion behavior, and visual density;
- deciding whether Focus Mode can be a small source-only UI-shell behavior;
- deciding whether the first compact/mobile shell slice should be Focus Mode, compact navigation, or no source work until later addendum planning;
- preserving the Stage 49.1 HUD recommendation;
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
- Stage 49.1 evidence: `progress/PROGRESS-STEP-447.md`
- Shell/navigation: `src/app/App.tsx`, `src/app/LunarSignalStage.tsx`, `src/app/routes.ts`, `src/app/navigationState.ts`, `src/app/browserNavigationHistory.ts`, `src/app/BackToTopButton.tsx`, `src/app/backToTopState.ts`, `src/ui/Navigation.tsx`
- Layout/accessibility/mobile: `src/index.css`, `e2e/layout/mobile-scroll.spec.ts`, `src/app/LunarSignalStage.test.tsx`, `src/app/routes.test.ts`, `src/app/navigationState.test.ts`
- Gameplay entry and auto-scroll adjacency: `src/app/gameplayAutoCenter.ts`, `src/app/games/soloGameplayAutoCenter.ts`, `src/solo/SoloWorkspace.tsx`, `src/multiplayer/MultiplayerWorkspace.tsx`

## Current Shell Map

- `LunarSignalStage` owns the visible app shell, including the brand button, account/notification stack, optional Daily countdowns, primary route rail, route attention badges, route heading, and playfield.
- `App.tsx` currently passes `DEFAULT_SURFACE_THEME`, account controls, Daily countdown controls, route attention, and all primary navigation routes into `LunarSignalStage`.
- `routes.ts` defines 12 non-admin primary routes in a fixed order: Solo, Multiplayer, Calendar, History, Stats, Leaderboard, Word Explorer, Profile, Settings, Help, Feedback, and About.
- `navigationState.ts` persists route/subtab/filter selections in browser-local navigation storage; it does not currently include Focus Mode or compact shell preferences.
- `browserNavigationHistory.ts` mirrors the active navigation view state into browser history and resolves stale Solo, Multiplayer, and Live selections.
- `BackToTopButton` is global, reduced-motion-aware, and already lifts away from the gameplay auto-center target when needed.
- Mobile layout uses safe-area padding, collapses the topbar into a vertical stack, keeps the rail as a wrapping button field, and has Playwright coverage for mobile scroll/overflow plus Solo keyboard bottom clearance.

## Focus Mode Feasibility

Focus Mode is feasible as a small source-only first slice if Stage 49.3 keeps it:

- reversible;
- session-local by default;
- implemented as UI-shell behavior, not gameplay behavior;
- limited to reducing nonessential shell chrome while preserving a visible exit/recovery control;
- limited to gameplay-heavy routes or active gameplay surfaces where route chrome is the distraction;
- covered by component and mobile layout tests.

Recommended first Focus Mode behavior for Stage 49.3 decisioning:

- use explicit in-app control text or icon+label for entering/exiting Focus Mode;
- hide or compress the route rail and route header only while focused;
- keep account, Settings, Help, route recovery, and the active gameplay surface reachable;
- preserve route attention state rather than clearing or mutating it;
- keep browser history/navigation state unchanged unless Stage 49.3 proves a safe source-only path;
- avoid persistence in the first implementation slice unless existing settings compatibility is proven.

## Compact/Mobile Shell Recommendation

Compact navigation can likely remain source-only only if it is a modest compression of the existing route rail:

- keep all primary routes reachable;
- keep accessible labels and `aria-current` behavior;
- preserve attention badges and their screen-reader descriptions;
- preserve Settings, Help, account, and route recovery;
- avoid adding the compact side-dock implementation in Phase 49.

Recommended sequencing:

1. Prefer Focus Mode as the first shell slice if Stage 49.3 authorizes source-only implementation.
2. Treat compact navigation as a secondary, narrow route-rail compression candidate.
3. Defer broad mobile shell redesign and compact/collapsible side-dock implementation to a later protected phase.

## Risk Map

- Route density: the primary route rail has many routes and can consume mobile vertical space; compressing it must not hide routes or attention badges.
- Recovery: Focus Mode must always offer an obvious way back to normal navigation and must preserve access to Settings and Help.
- Accessibility: any compact or focused shell must maintain keyboard focus order, accessible labels, `aria-current`, attention descriptions, and sufficiently large touch targets.
- State persistence: adding persisted Focus Mode or compact-shell preferences would touch navigation/settings/storage contracts and should wait for Stage 49.3 decisioning.
- Mobile playability: shell changes must not reintroduce Solo keyboard clipping, horizontal overflow, scroll lag, or Back-to-top overlap.
- Privacy and attention: shell changes must not expose guest/account-specific data across scopes and must not suppress urgent route or notification attention.

## Stage 49.3 Source-Only Versus Addendum Recommendation

Stage 49.3 can likely stay documentation-only decisioning with a source-only path if it locks implementation to:

- the Stage 49.1 display-only HUD subset: current level, current coin balance, and compact XP progress;
- session-local Focus Mode behavior;
- optional non-persisted compact route-rail compression;
- CSS/class-based shell changes and local view-model/helpers only;
- focused component tests, mobile layout tests, and visual review.

Protected addendum planning is required if Phase 49 tries to:

- persist Focus Mode or compact shell preferences outside an already-safe settings path;
- alter navigation storage shape in a way that needs migration or compatibility handling beyond source-only normalization;
- implement a broad mobile shell/top-tab/navigation overhaul;
- implement the compact/collapsible side-dock;
- change route contracts, account/session behavior, service-worker/push behavior, gameplay rules, or Elo math;
- add any new storage, Supabase/RLS, or deployment/configuration dependency.

## Verification

Stage 49.2 lightweight verification passed:

- `git diff --check`: passed.
- Progress CSV shape check: `rows=450 columns=[12] last_id=448`.
- Non-printing credential-value scan: `scanned_files=14 credential_value_hits=0 binary_skipped=0`.
- Ignored-artifact check: `tracked_files=1149 staged_files=0 forbidden_artifact_hits=0`.
- Watched-port cleanup check: `5173`, `5174`, `3000`, and `4173` clear.
- `git status --short --branch`: completed.

Note: the ignored-artifact check treats the tracked `.env.example` template as an allowed repository template and still rejects real local env files, generated artifacts, auth state, tokens, reports, traces, screenshots, videos, local session artifacts, and local Codex skill files.

## Next Safe Gate

The next safe gate is Phase 49 Stage 49.3: source-only versus storage/mobile-shell addendum decision only.
