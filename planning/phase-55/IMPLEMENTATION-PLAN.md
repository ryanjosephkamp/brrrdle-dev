# Phase 55 Design Direction And GPT-5.6 SOL Handoff Implementation Plan

> **For agentic workers:** Use the repository's planning, product-design, Impeccable, image-generation, and verification capabilities only within the stage authorization currently active. Production source changes remain Phase 56 work.

**Goal:** Produce an approved, distinctive, implementation-ready design contract and GPT-5.6 SOL handoff for a high-autonomy frontend rebuild while preserving the accepted functional shell as the reversible source of truth.

**Architecture:** Treat the Golden Checkpoint shell as the behavioral baseline. Phase 55 operates in tracked planning/design artifacts and concept assets, not production runtime code. It maps each proposed visual or information-architecture change back to preserved capabilities, decides the component strategy from evidence, and hands Phase 56 a staged source plan with explicit rollback and verification gates.

**Tech stack baseline:** React 19, Vite 8, TypeScript 6, semantic HTML, existing `src/ui/` primitives, Supabase, Vitest, Playwright. Alternatives may be recommended but not installed or implemented in Phase 55.

## Global Constraints

- Work only in `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`; do not touch stable `brrrdle`.
- Do not begin until the functional shell has a verified Final Acceptance commit and Golden Checkpoint tag/release.
- Preserve every capability and sensitivity boundary in `PRE-PHASE-55-FUNCTIONALITY-PRESERVATION-INVENTORY-2026-07-09.md`.
- Do not modify `src/`, `api/`, `e2e/`, tests, migrations, package manifests, lockfiles, deployment configuration, or remote state.
- Do not install shadcn, a framework, a font package, an icon package, or any other dependency during this phase.
- Do not use inspiration as a cloning brief. Extract principles and interaction patterns; maintain an original brrrdle identity.
- Do not put copyrighted page captures or generated concepts into production assets during Phase 55.
- Do not expose credentials, raw answers, private profile/account data, internal identifiers, auth state, or remote payloads in artifacts or concepts.

## Current Implementation Review

### Product And Interaction Contract

1. `PRODUCT.md` defines a focused, dependable, playful word-game tool with gameplay clarity ahead of decoration, mobile-first workflows, stable progress, and purposeful motion/sound.
2. The functionality-preservation inventory identifies application, account, Solo, multiplayer, competitive, spectator, supporting, accessibility, and privacy capabilities that must survive redesign.
3. The accepted shell is deliberately neutral. It is an architectural starting point, not the intended visual identity.

### Frontend Structure

1. `src/ui/` supplies Button, Panel, Navigation, SubtabBar, Dialog, Tooltip, StatusState, ToastRegion, Keyboard, and sharing primitives. Phase 56 can evolve these as the primary design-system seam.
2. `src/app/App.tsx` owns broad route and state integration. `src/app/LunarSignalStage.tsx` now supplies semantic chrome and Focus Mode behavior. Both are high-conflict integration surfaces.
3. `src/multiplayer/MultiplayerPanel.tsx` and its workspace/game/live/lobby/active children are dense operational surfaces requiring staged redesign and real multi-client verification.
4. Game boards and keyboards expose semantic `data-state` attributes, allowing design changes without coupling browser tests to replaceable CSS classes.
5. `src/theme/theme.ts` and `src/theme/surface.ts` are typed seams, but Phase 55 must decide whether the redesigned product uses one strong default identity, selectable themes, or a restrained token architecture before adding new variants.

### Performance And Verification Baseline

1. The accepted shell reports 83.75 kB CSS and 967.78 kB main JavaScript minified, with no mobile horizontal overflow, backdrop-filter layers, shadows, or sticky elements in the required 390px route matrix.
2. Baseline verification is 920 Vitest tests and 63 Playwright scenarios, including real temporary-account Supabase-backed multiplayer paths.
3. Phase 56 must preserve semantic state and behavior assertions, console/network guards, temporary-account cleanup, mobile overflow coverage, and real two-client E2E.

## Planned Artifacts

- `planning/phase-55/DESIGN-INTAKE.md`
- `planning/phase-55/INSPIRATION-ANALYSIS.md`
- `planning/phase-55/CONCEPT-REVIEW.md`
- `planning/phase-55/design.md`
- `planning/phase-55/FRONTEND-STACK-DECISION.md`
- `planning/phase-55/PHASE-56-REBUILD-HANDOFF.md`
- `planning/phase-55/REVIEW-CHECKLIST.md`
- approved concept assets under `planning/phase-55/concepts/`
- progress/changelog records and an ignored Review Candidate prompt package

## Stage 55.0 - Checkpoint Preflight And Design Intake

**Goal:** Bind all later work to the exact accepted shell and capture the user's direction without invention.

- Verify local `main`, `origin/main`, the Final Acceptance commit, Golden Checkpoint annotated tag, and GitHub Release all identify the same accepted shell tree.
- Read the preservation inventory, strategy, decision log, shell performance report, checklist, `PRODUCT.md`, current theme seams, and historical proposals.
- Create `DESIGN-INTAKE.md` containing supplied inspiration URLs/screenshots, desired qualities, anti-goals, preferred density, motion/sound preferences, mobile priorities, brand language, and any absolute constraints.
- Record unknowns explicitly. Do not fabricate missing user preferences.

**Gate:** Stop if the Golden Checkpoint cannot be verified or if design inputs conflict with preserved functionality, privacy, accessibility, or performance requirements.

## Stage 55.1 - Evidence-Based Product And Design Audit

**Goal:** Diagnose the accepted shell as a game product before proposing aesthetics.

- Audit Home, Solo, Multiplayer, Calendar, History, Stats, Leaderboard, Words, Profile, Settings, Help, About, Feedback, and authorized Admin surfaces on desktop and mobile.
- Use the Impeccable and product-design audit workflows for hierarchy, density, navigation, accessibility, interaction feedback, responsive behavior, content rhythm, and consistency.
- Analyze each user-supplied reference for transferable principles: information hierarchy, typography, color, spacing, controls, motion, game feedback, mobile behavior, and data visualization.
- Distinguish inspiration from direct imitation and document accessibility or performance risks in each reference.
- Map every recommendation to preservation inventory IDs and classify it as presentation-only, information-architecture, interaction, content, or potentially contract-affecting.

**Gate:** Contract-affecting recommendations are deferred unless separately planned; Phase 55 concepts may not assume backend/game changes.

## Stage 55.2 - Distinct Concept Directions

**Goal:** Explore meaningful alternatives before selecting a system.

- Produce three or four concept directions with different layout, typography, palette, control, motion, and data-visualization approaches. Avoid palette-only variants.
- Include representative desktop and mobile concepts for Home, active Solo gameplay, Multiplayer workspace/gameplay, Stats/Leaderboard, and Profile/Settings.
- Preserve recognizably interactive controls, game-state colors, readable boards/keyboards, accessible focus, result/definition clarity, and mobile reachability.
- Use image generation only for separately authorized concept work and disclose generated assets as concepts, not implementation promises.
- Create `CONCEPT-REVIEW.md` comparing distinctiveness, usability, implementation cost, bundle risk, accessibility, responsive fit, and compatibility with the current architecture.

**Gate:** Stop for explicit user concept selection or synthesis direction. Do not finalize `design.md` or begin production implementation merely because one concept scores highest.

## Stage 55.3 - `design.md` And Frontend Stack Decision

**Goal:** Turn the selected direction into enforceable implementation guidance.

- Create `design.md` with brand/product principles, information hierarchy, layout rules, typography, palette, spacing, shape, iconography, controls, boards/keyboards, status/error/result feedback, data visualization, responsive rules, accessibility, motion/sound, content voice, and anti-patterns.
- Define stable semantic tokens and component contracts without hard-coding implementation to a library prematurely.
- Create `FRONTEND-STACK-DECISION.md` comparing:
  - evolved bespoke primitives;
  - selective shadcn adoption;
  - another evidence-backed component system;
  - any proposed framework change.
- Require measurable benefit, incremental adoption, bundle impact, accessibility behavior, migration cost, test impact, and rollback path for every nontrivial stack change.
- Default to React/Vite and incremental primitive evolution unless evidence establishes a stronger option.

**Gate:** User accepts `design.md` and the component/stack decision before the rebuild handoff is considered final.

## Stage 55.4 - Phase 56 Rebuild Architecture And Work Packets

**Goal:** Make the redesign executable at high autonomy without weakening ownership or verification.

- Create a route-to-component map and divide Phase 56 into cohesive slices: tokens/primitives, global chrome/navigation, ordinary routes, Solo gameplay, Multiplayer, data-rich surfaces, accessibility/performance hardening, and integration.
- Keep one writer at a time for `src/app/App.tsx`, `src/index.css`, `src/app/LunarSignalStage.tsx`, and `src/multiplayer/MultiplayerPanel.tsx`.
- Define a characterization-before-edit rule for any untested behavior and focused verification after every integrated slice.
- Map preservation inventory IDs and E2E scenarios to each work packet.
- Define rollback points and Review Candidate backups between major integrated slices when a hosted review would materially reduce risk.
- Specify which existing tests may change because they encode cosmetic presentation and which behavioral assertions are protected.

## Stage 55.5 - GPT-5.6 SOL Handoff Package

**Goal:** Give the rebuild agent enough context and autonomy to execute without guessing.

The handoff must include:

- exact Golden Checkpoint commit, tag, release, and rollback instructions;
- current product digest and full preservation inventory;
- accepted `design.md`, concepts, inspiration analysis, and anti-patterns;
- source architecture, high-conflict files, privacy boundaries, and Supabase non-goals;
- accepted stack/component decision and dependency authorization boundaries;
- performance and accessibility budgets;
- complete test commands, real E2E requirements, cleanup rules, and known transient-failure policy;
- staged work packets, integration order, stop conditions, and Review Candidate loop;
- explicit authority to improve the frontend boldly while preserving protected contracts.

## Stage 55.6 - Verification, Review Candidate, And Stop

- Validate all tracked Markdown links and referenced artifact paths.
- Check that every preservation-inventory category appears in the Phase 56 work/test map.
- Check that every concept claim is traceable to user intake, repository evidence, or clearly labeled agent recommendation.
- Confirm no secrets, private data, raw answers, hidden environment values, or production payloads appear in text or images.
- Run `git diff --check`, quote-aware CSV validation if progress changes, non-printing/credential/private-data scans, ignored-artifact checks, and `git status --short --branch`.
- Do not rerun the full application suite for documentation-only changes unless source/runtime files changed unexpectedly; verify the checkpoint's recorded suite instead.
- Create a Phase 55 manual review checklist and an ignored Review Candidate Backup prompt only after documentation verification is clean.
- Stop for user review. Do not begin Phase 56.

## Phase 56 Verification Contract

The handoff must require Phase 56 to run, at minimum:

- focused unit/component tests after every design-system and route slice;
- responsive browser verification at desktop, tablet, 390px, and a narrow mobile width;
- keyboard-only, focus, dialog/menu/tab, status-region, reduced-motion, contrast, and no-horizontal-overflow checks;
- all Solo Daily/Practice OG/GO solve, persistence, refresh, and re-entry E2E;
- all Practice/Daily/private/ranked/spectator multiplayer E2E with real temporary accounts and remote cleanup;
- `npm run lint`;
- `npm run test`;
- a fresh full `npm run test:e2e` after any focused retries;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- before/after CSS, JavaScript, route-render, and mobile-scroll evidence;
- full hygiene, artifact, port, and process cleanup checks;
- a comprehensive hosted manual Review Candidate loop before final acceptance.

## Stop Conditions

Stop and report if:

- the accepted shell checkpoint is missing or does not match the expected tree;
- supplied references require copying a protected design or asset;
- a concept depends on gameplay/backend/Supabase behavior changes;
- a new dependency or framework is treated as pre-approved;
- design work exposes private data or weakens accessibility/performance budgets;
- the phase drifts into production source implementation, deployment, Git/GitHub actions, or stable-repository work.
