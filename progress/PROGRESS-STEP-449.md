# Progress Step 449 - Phase 49 Stage 49.3 Source-Only Versus Storage/Mobile-Shell Addendum Decision

**Date:** 2026-07-06
**Phase:** Phase 49 - Progression HUD, Focus Mode, And Mobile UX Shell Polish
**Stage:** Stage 49.3 - Source-only versus storage/mobile-shell addendum decision
**Status:** Completed - Awaiting User Review Before Stage 49.4

## Authorization

The user authorized Phase 49 Stage 49.3 only: documentation/planning decision for whether the Phase 49 progression HUD, Focus Mode, and compact/mobile shell first slice can remain source/test-only or require a storage, Supabase, session, mobile-shell, or gameplay-rule addendum.

This stage is limited to:

- confirming repository state and stable-repository boundary;
- preserving the user-updated Phase 48 manual review checklist;
- reading Phase 49 planning/spec/implementation materials and Stage 49.1 through Stage 49.2 findings;
- deciding whether Stage 49.4 and Stage 49.5 can remain source/test-only;
- creating a progress report and matching 12-column progress CSV row;
- running lightweight verification.

This stage does not authorize source/runtime code, tests, migrations, storage changes, deployment/configuration, Git/GitHub actions, backup workflow execution, private Daily implementation, ranked Daily implementation, spectator presence/count/list, service workers, push infrastructure, strict session leases, server-authoritative Daily, broad mobile shell redesign, compact side-dock implementation, theme modernization, gameplay-rule changes, Elo changes, secret/private-data/local-artifact exposure, local Codex skill changes, or work in the original stable `brrrdle` repository.

## Repository And Boundary

- Working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- Local `HEAD`: `07fd0e0d8acb8244b7779fc7f0cce46bf0424db4`
- `origin/main`: `07fd0e0d8acb8244b7779fc7f0cce46bf0424db4`
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`
- Stable-repository boundary: current work was performed only in `brrrdle-dev`; the original stable `brrrdle` repository was not used or touched.
- Preserved manual review checklist: `planning/phase-48/REVIEW-CHECKLIST.md`

## Decision

Stage 49.4 and Stage 49.5 can remain source/test-only if their implementation prompts preserve the exact boundaries below.

No Phase 49 storage, Supabase/RLS, session, mobile-shell, service-worker, gameplay-rule, or Elo addendum is required at this gate.

## Stage 49.4 Source-Only Boundary

Stage 49.4 can proceed as a source/test-only Progression HUD first slice if it is limited to:

- displaying the current active-scope player level;
- displaying the current active-scope coin balance;
- displaying compact XP progress toward the next level;
- deriving all values from existing progression state and existing progression/selector math;
- treating HUD values as display-only, local UI state;
- preserving guest/authenticated progress ownership and sign-out/account-switch display boundaries;
- preserving manual and automatic signed-in Solo sync behavior;
- adding focused tests for view-model derivation, account/guest scope, rendering, and no storage mutation.

Stage 49.4 must not:

- show consumable inventory counts in the top-level shell;
- show Pay-to-Continue or reveal-answer cost context outside gameplay panels;
- expose resource values publicly through profile, leaderboard, spectator, or route metadata contracts;
- add new earning, spending, marketplace, inventory, collectible, monetization, or progression mechanics;
- change XP formulas, level curves, reward amounts, coin costs, Pay-to-Continue costs, reveal-answer costs, stats calculations, Daily claim behavior, gameplay rules, scoring, or Elo.

## Stage 49.5 Source-Only Boundary

Stage 49.5 can proceed as a source/test-only Focus Mode or compact navigation first slice if it is limited to:

- reversible Focus Mode UI-shell behavior;
- session-local Focus Mode state by default;
- hiding or compressing only nonessential shell chrome while focused;
- keeping a visible exit or recovery control;
- preserving all primary routes and route recovery;
- preserving account controls, Settings, Help, sync/recovery access, route attention, and notification safety;
- preserving accessible labels, `aria-current`, attention descriptions, focus order, adequate touch targets, safe-area behavior, reduced-motion behavior, keyboard playability, Back-to-top safety, and mobile Solo/Multiplayer gameplay visibility;
- optional non-persisted route-rail compression that keeps every route reachable.

Stage 49.5 must not:

- persist Focus Mode or compact-shell preferences unless an existing settings path is proven safe inside the implementation prompt and requires no contract or migration change;
- alter navigation storage shape in a way that requires migration or compatibility handling beyond source-only normalization;
- implement the broad mobile shell/top-tab/navigation overhaul;
- implement a compact or collapsible side dock;
- change route contracts, account/session behavior, service-worker or push behavior, gameplay rules, scoring, Daily answer behavior, timeout/forfeit behavior, or Elo.

## Addendum Triggers

Stop and create a narrow addendum under `planning/specs/phase-49/` before implementation if any Phase 49 item requires:

- new or modified Supabase tables, columns, RPCs, triggers, policies, grants, or views;
- guest/cloud progress storage schema changes that are not clearly backward-compatible;
- persisted Focus Mode or shell preferences outside an already-safe settings path;
- new economy mechanics, collectibles, inventory, marketplace, monetization, resource earning, or resource spending loops;
- public exposure of progression/resource values through profile, leaderboard, spectator, or route metadata contracts;
- one-active-session/session leases, forced sign-out, heartbeats, or remote invalidation;
- server-authoritative Daily submissions;
- private Daily or ranked Daily implementation;
- broad mobile shell/top-tab/navigation redesign;
- compact/collapsible side-dock implementation;
- service workers or push infrastructure;
- gameplay-rule, scoring, Daily answer, timeout, forfeit, or Elo changes.

## Preserved Invariants

Stage 49.3 preserves:

- Phase 48 Profile/Settings clarity, custom-code hiding/legacy handling, and private Daily/ranked Daily addendum routing;
- Phase 47 mobile/display-boundary repairs;
- Phase 46 automatic signed-in Solo sync/freshness protections;
- Phase 45 Solo account boundaries;
- Phase 44 account-scoped repairs;
- Phase 43 ranked fairness/current-surface cleanup;
- Phase 42 stats/dashboard/help contracts;
- Phase 41 multiplayer reliability;
- Phase 40 public profile/private matchmaking boundaries;
- Phase 39 mobile scroll smoothness;
- Phase 38 public/guest spectator boundaries;
- Daily claim safety, gameplay rules, scoring, and Elo math.

## Verification

Stage 49.3 lightweight verification passed:

- `git diff --check`: passed.
- Progress CSV shape check: `rows=451 columns=[12] last_id=449`.
- Non-printing credential-value scan: `scanned_files=15 credential_value_hits=0 binary_skipped=0`.
- Ignored-artifact check: `tracked_files=1149 staged_files=0 forbidden_artifact_hits=0`.
- Watched-port cleanup check: `5173`, `5174`, `3000`, and `4173` clear.
- `git status --short --branch`: completed.

Note: the ignored-artifact check treats the tracked `.env.example` template as an allowed repository template and still rejects real local env files, generated artifacts, auth state, tokens, reports, traces, screenshots, videos, local session artifacts, and local Codex skill files.

## Next Safe Gate

The next safe gate is Phase 49 Stage 49.4: source/test-only Progression HUD first slice.
