# Progress Step 444 - Phase 49 Unified Specification

**Phase:** Phase 49 unified specification
**Status:** Completed - Awaiting User Review Before Phase 49 Implementation Plan
**Date:** 2026-07-06
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`

## Authorization

The user authorized creation of a unified Phase 49 specification for review only.

This pass was limited to:

- confirming repository state and the stable-repository boundary;
- preserving the user-updated Phase 48 review checklist;
- reading governance, roadmap, Phase 48 completion evidence, Phase 49 planning brief, phase scope sizing guidance, current progress records, progression/resource surfaces, shell/navigation surfaces, Focus Mode/mobile shell routing context, testing strategy, and local workflow docs as needed;
- creating one unified Phase 49 specification under `planning/specs/phase-49/`;
- recording this progress report and the matching 12-column progress CSV row;
- running lightweight documentation verification.

This pass did not authorize or perform source/runtime implementation, test implementation, migrations, storage schema changes, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, private Daily implementation, ranked Daily implementation, spectator presence/count/list implementation, service workers, push infrastructure, strict session leases, server-authoritative Daily implementation, gameplay-rule changes, Elo changes, broad mobile shell/top-tab/navigation overhaul, compact side-dock implementation, theme modernization, secret/private-data/local-artifact exposure, the brrrdle GitHub backup workflow, local Codex skill changes, or work against the original stable `brrrdle` repository.

## Baseline

- Expected local `main`: `07fd0e0d8acb8244b7779fc7f0cce46bf0424db4`
- Expected `origin/main`: `07fd0e0d8acb8244b7779fc7f0cce46bf0424db4`
- Preserved manual review artifact: `planning/phase-48/REVIEW-CHECKLIST.md`
- Phase 49 planning brief: `planning/phase-49/PLANNING-BRIEF.md`
- Last completed progress record before this pass: `progress/PROGRESS-STEP-443.md`

## Created Specification

Created:

- `planning/specs/phase-49/PHASE-49-PROGRESSION-HUD-FOCUS-MODE-AND-MOBILE-UX-SHELL-POLISH-SPEC-2026-07-06.md`

The unified spec locks Phase 49 around:

- progression/resource HUD audit and existing resource visibility;
- Focus Mode feasibility and source-only versus storage-contract decisioning;
- compact/mobile shell polish decisioning without broad mobile redesign;
- explicit storage, Supabase/RLS, session, mobile-shell, service-worker, gameplay-rule, and Elo gates;
- preservation of Phase 48 Profile/Settings clarity, custom-code hiding/legacy handling, private Daily/ranked Daily addendum routing, Phase 47 mobile/display-boundary repairs, Phase 46 Solo sync/freshness protections, Phase 45 Solo account boundaries, Phase 44 account-scoped repairs, Phase 43 ranked fairness, Daily claim safety, gameplay rules, and Elo math.

## Planning Index Update

Updated:

- `planning/README.md`

The update adds `planning/specs/phase-49/` to the planning directory map.

## Major Spec Decisions

- Phase 49 should treat the resource HUD as display-only unless a later addendum explicitly approves deeper economy or storage changes.
- Existing XP, level, coins, consumables, Pay-to-Continue, and reveal-answer logic are audit inputs, not authorization to change rewards, costs, progression math, or gameplay.
- Focus Mode is UI-shell behavior, not gameplay behavior.
- Focus Mode should be session-local unless audit proves an existing settings path is safe, or a storage-contract addendum is created first.
- Compact navigation is bounded to mobile/shell polish, accessibility, and route discoverability.
- Broad mobile shell/top-tab/navigation overhaul and compact side-dock implementation remain deferred.
- Theme modernization is routed to Phase 50 or later.

## Deferred Or Gated Items

Deferred or gated outside this specification:

- private Daily and ranked Daily remain behind the Phase 48 protected addendum;
- broad mobile shell/top-tab/navigation overhaul;
- compact/collapsible side-dock implementation beyond later explicit approval;
- configurable Home widgets;
- spectator previews;
- notification redesign;
- social inbox/mailbox;
- spectator presence/count/list;
- service workers and push infrastructure;
- deployment/release work;
- strict one-active-session/session leases;
- server-authoritative Daily submissions;
- new economy mechanics, collectibles, marketplace, monetization, or resource-spending rules;
- gameplay-rule changes;
- Elo changes;
- broad theme modernization and concrete theme implementation.

## Verification Results

Lightweight documentation verification passed:

- `git diff --check`
- progress CSV shape check: `rows=446 columns=[12] last_id=444`
- non-printing changed/untracked file credential-value scan: `scanned_files=9 credential_value_hits=0 binary_skipped=0`
- ignored-artifact check: `tracked_files=1149 staged_files=0 forbidden_artifact_hits=0`
- `git status --short --branch`

## Boundary Confirmation

All work in this pass was confined to `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.

The original stable `brrrdle` repository was not used or touched.

## Next Safe Gate

If the user approves this specification, the next safe gate is a detailed Phase 49 implementation plan for review only.
