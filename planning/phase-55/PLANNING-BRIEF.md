# Phase 55 Planning Brief - Design Direction And GPT-5.6 SOL Handoff

**Status:** Planned. The functional shell is accepted and closed through its Final Acceptance Backup; Phase 55 execution remains gated by the separate Golden Checkpoint.
**Created:** 2026-07-09.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev` only.
**Review Candidate baseline:** `1893e385fb97d2194a40b3fc550a5d07fcf2ea34`. The Golden Checkpoint must bind Phase 55 to the later Final Acceptance merge commit that contains these closure records.

## Phase Thesis

Phase 55 should turn the accepted low-ornament functional shell into a precise, evidence-backed design and implementation contract for GPT-5.6 SOL. It should establish a distinctive visual direction, interaction principles, performance and accessibility budgets, a justified frontend component strategy, and a complete rebuild handoff without changing production runtime behavior.

The actual frontend rebuild belongs to Phase 56. Keeping the direction/handoff phase separate ensures the future rebuild starts from an approved shell checkpoint and an approved design contract instead of mixing exploration, stack decisions, and broad source changes in one irreversible action.

## Current Implementation Findings

- The product remains a React 19, Vite 8, and TypeScript application. Runtime dependencies are limited to React, Supabase, and Vercel Blob.
- The accepted shell reduced `src/index.css` to 404 lines and replaced decorative rendering with semantic application chrome while retaining all routes and game behavior.
- Shared primitives already exist in `src/ui/`; major composition/state ownership remains concentrated in `src/app/App.tsx` and `src/multiplayer/MultiplayerPanel.tsx`.
- The application has typed accent and surface-theme seams under `src/theme/`, plus historical theme proposals under `themes/proposals/`. Those proposals are references, not an approved final direction.
- `PRODUCT.md` establishes the product as focused, dependable, playful, mobile-first, and explicitly opposed to generic dashboard styling, glass effects, ambient decoration, and slot-machine-like noise.
- The accepted preservation inventory and 920-unit/63-E2E shell evidence provide the functional contract that later design work must retain.
- The current main JavaScript chunk remains roughly 968 kB minified with Vite's advisory, so Phase 55 must define measurable budgets and Phase 56 must justify any new dependency or architecture change.

## Scope

Phase 55 includes:

- design intake and inspiration analysis;
- product/UI audit of the accepted shell;
- several genuinely distinct visual and interaction concepts;
- desktop and mobile concept evidence for representative product surfaces;
- an approved `design.md` contract;
- a documented bespoke-versus-shadcn-versus-other component decision;
- performance, accessibility, motion, and responsive budgets;
- a source architecture and implementation-slice map for Phase 56;
- a complete GPT-5.6 SOL handoff package and Review Candidate documentation.

Phase 55 excludes:

- production source/runtime or CSS changes;
- dependency installation or framework migration;
- gameplay, persistence, economy, scoring, rating, privacy, or Supabase changes;
- Vercel/deployment changes;
- Git/GitHub backup, tag, or release work except through separately authorized workflows;
- the Phase 56 frontend rebuild.

## Required Gates

1. Final Acceptance Backup for the accepted functional shell - satisfied by the closure record containing this plan.
2. Golden Checkpoint tag and GitHub Release for the exact Final Acceptance merge commit - still required before Phase 55 execution.
3. User design intake and authorization to analyze supplied references.
4. Concept Review Candidate and explicit user direction selection.
5. Final `design.md`, stack decision, and handoff acceptance.
6. Separate Phase 56 implementation authorization.

## Phase Exit

Phase 55 closes only when the user accepts the design direction and handoff package. A completed Phase 55 must leave production behavior unchanged and make the next implementation prompt concrete enough for a high-autonomy Phase 56 rebuild with preservation-mapped verification.
