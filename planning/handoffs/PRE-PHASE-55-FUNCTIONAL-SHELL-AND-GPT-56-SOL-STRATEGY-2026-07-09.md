# Pre-Phase-55 Functional Shell And GPT-5.6 SOL Strategy - 2026-07-09

**Status:** Recommended strategy and implementation plan. Planning only.
**Protected baseline:** Phase 54 closure commit `cc6a1e600a7e330140366d2ba2ab95fd1da11a75`, tag `phase-54-golden-2026-07-09`.
**Functional contract:** `PRE-PHASE-55-FUNCTIONALITY-PRESERVATION-INVENTORY-2026-07-09.md`.

## Executive Recommendation

Build the functional shell **in place on the existing React 19 + Vite 8 + TypeScript application**. Make it HTML-forward through semantic React components and simpler CSS, but do not rewrite it as a static HTML application and do not migrate to Next.js before the shell is accepted.

The current dependency set is already small: React, Supabase, and Vercel Blob are the only runtime packages. The evidence points to presentation and component-ownership weight, not dependency sprawl:

- `src/index.css` is 1,639 lines and includes repeated blur, shadow, fixed-position, and decorative effects.
- `src/app/LunarSignalStage.tsx` is a 502-line decorative surface.
- `src/app/App.tsx` is 2,946 lines and `src/multiplayer/MultiplayerPanel.tsx` is 2,257 lines, concentrating rendering and state wiring.
- The accepted Phase 54 build reported a roughly 975 kB minified main JavaScript chunk and 110 kB minified CSS, with Vite's large-chunk advisory.
- Authentication, account-scoped persistence, real-time multiplayer, notifications, route state, and game sessions necessarily require JavaScript. A static-HTML rewrite would recreate those systems while discarding proven behavior.

The shell should therefore remove ornamental weight, simplify layout primitives, and isolate presentation from orchestration while leaving domain modules, repositories, Supabase contracts, and product behavior intact.

## Repository Architecture Findings

### Durable Foundations To Keep

- Framework-independent game rules live under `src/game/` and already have strong fast-test coverage.
- Account, guest, sync, cloud Solo, profile, and storage responsibilities are split under `src/account/` with dedicated tests.
- Multiplayer domain, repository, views, rating, scoring, queue, private request, and spectator concerns are identifiable under `src/multiplayer/`, even though key files are large.
- Supabase behavior is source-controlled through 29 migrations. Shell work has no reason to change these contracts.
- The suite has 919 Vitest tests and 58 Playwright tests at the accepted baseline, including real temporary-account Supabase-backed multiplayer paths.
- Shared UI primitives already exist under `src/ui/`; the shell can simplify and normalize these without introducing a component library.

### Risks To Manage

- `App.tsx` owns routing, auth, progress, Solo/Multiplayer integration, notifications, and much presentation composition. Large visual edits here can accidentally alter behavior.
- `MultiplayerPanel.tsx` combines multiple complex multiplayer subflows; preserve a single integration owner and extract only when it reduces presentation coupling.
- Global CSS allows small style changes to affect every route. Shell CSS should be introduced in staged, reviewable bands rather than replaced blindly.
- `Tooltip.tsx` performs viewport and ancestor-scroll positioning work; overlays, blur, fixed layers, and scroll listeners deserve measurement during performance work.
- Tests mix behavioral and current-presentation assertions. Classify before changing them; do not mass-update snapshots or selectors.

## Options Considered

| Option | Benefits | Costs and risks | Recommendation |
| --- | --- | --- | --- |
| In-place React/Vite semantic shell | Maximum behavior reuse; lowest backend risk; current tests remain valuable; permits major CSS/layout reduction | Requires disciplined work around large components and global CSS | **Adopt** |
| HTML-forward React shell | Uses native elements, forms, disclosure, tables, and landmarks while retaining stateful React orchestration | Still JavaScript, so it is not a static-site rewrite | **Adopt as the implementation style inside React** |
| Static/mostly static HTML rewrite | Small initial rendering surface | Would need to rebuild auth, realtime, persistence, routing, state, accessibility, and tests; highest regression risk | Reject for this program |
| Next.js migration before redesign | Could add route splitting and framework conventions | No current need for SSR; migration adds routing/build/deployment churn before visual work | Defer unless later evidence establishes a concrete requirement |
| shadcn/ui adoption during shell | Provides polished primitives | Adds dependency and design-system decisions while the goal is neutral reduction | Defer to the redesign decision gate; consider selective adoption later |

## Governance And Tooling Recommendations

1. Keep `CONSTITUTION.md` model-agnostic. Do not add special exceptions for GPT-5.6 or weaken protected-action gates.
2. Add a scoped preservation contract and stage records through planning artifacts rather than rewriting constitutional authority.
3. Keep the existing Review Candidate Backup loop. A shell is not accepted because tests pass; it requires hosted interactive review.
4. Use existing `brrrdle-prompt-packages`, review-checklist, visual-review, GitHub-backup, Playwright, and game-playtest capabilities.
5. Use Impeccable during later design audit and polish, not during neutral shell reduction.
6. Evaluate shadcn and other component systems only after design direction exists. Do not install a toolkit speculatively.
7. Do not create a new custom skill yet. If the preservation matrix is reused for both shell and final redesign, then extract a `brrrdle-functional-preservation-gate` skill from the proven workflow.
8. No connector or external service is needed for the shell. Figma or image-generation workflows may become useful during the separately authorized inspiration stage.

## Functional Shell Definition

The accepted shell should feel like a restrained utility application, not a blank prototype. It must retain:

- all routes, controls, states, data, and actions in the preservation inventory;
- essential tile/keyboard/status feedback and sound controls;
- responsive mobile and desktop layouts;
- visible focus, status semantics, errors, dialogs, and accessible labels;
- sufficient hierarchy to make manual review practical.

It should remove or reduce:

- ambient command-center staging and decorative scene components;
- glass blur, repeated gradients, glow, ornamental shadows, and neon treatments;
- nonessential animated flourishes and expensive fixed overlays;
- redundant nested containers and decorative labels;
- one-off CSS that duplicates shared control, panel, tab, status, or typography patterns.

It should not remove content merely because it is visually inconvenient. Content reduction is a separate product decision.

## Staged Implementation Program

### Stage 0 - Baseline And Characterization

Goal: freeze measurable behavior before changing presentation.

- Confirm clean alignment with the Phase 54 Golden Checkpoint plus approved planning records.
- Record route inventory, current build sizes, CSS-effect counts, mobile overflow, and representative scroll behavior.
- Classify affected tests as behavioral, semantic/accessibility, or cosmetic.
- Add dedicated Solo Practice OG and Solo Daily OG browser solve/re-entry coverage.
- Add guest/auth route-availability and mobile-overflow smoke coverage.
- Add focused accessibility checks for navigation, tabs, menus, dialogs, forms, focus, and status regions.

Gate: characterization tests pass against the current accepted UI before shell edits.

### Stage 1 - Neutral Shell Foundation

Goal: establish low-ornament tokens and shared primitives without changing behavior.

- Simplify color, type, spacing, borders, elevation, motion, and focus tokens.
- Normalize buttons, inputs, panels, tabs, status states, dialogs, tooltips, and navigation through existing shared UI primitives.
- Preserve stable accessible names and durable test selectors.
- Respect reduced-motion preferences and remove decorative motion by default.

Gate: focused shared-UI tests, route smoke, responsive checks, and diff review.

### Stage 2 - Application Chrome And Route Surfaces

Goal: simplify global chrome and ordinary workspaces.

- Remove the decorative command-center stage and ambient effects.
- Simplify Home, navigation, account menu, notification center, HUD, Profile, Settings, Stats, History, Calendar, Leaderboard, Words, Help, About, Feedback, and Admin presentation.
- Keep route hierarchy and actions intact; avoid product-copy rewrites except where needed for the shell.
- Reduce fixed/sticky layers and verify scroll responsiveness.

Gate: route matrix, accessibility smoke, mobile-scroll E2E, and manual visual evidence.

### Stage 3 - Gameplay And Multiplayer Shell

Goal: simplify the highest-risk interactive surfaces while preserving every game contract.

- Simplify OG/GO boards, keyboards, status/results, definitions, and Practice/Daily controls.
- Retain tile state distinctions, invalid feedback, solved hold/transition, completion, and essential cues; simplify their styling and timing only.
- Simplify Multiplayer Overview, Daily, Practice, Active, Lobby, Live, game, spectator, queue, private request, and postgame presentation.
- Preserve per-player canonical state, privacy boundaries, FIFO queueing, settings, forfeit/timeout, and realtime behavior exactly.

Gate: focused domain/component tests after each slice, then all real Solo and multiplayer E2E paths.

### Stage 4 - Performance And Maintainability Hardening

Goal: turn simplification into measured improvement.

- Remove unused presentation code and CSS after route coverage proves it unreachable.
- Audit scroll listeners, fixed layers, tooltip positioning, backdrop filters, large shadows, and unnecessary render churn.
- Introduce lazy route/surface boundaries only where they reduce initial bundle cost without destabilizing state.
- Extract presentation composition from `App.tsx` and `MultiplayerPanel.tsx` only where behavior remains owned by existing modules.
- Compare bundle, CSS, DOM, overflow, and mobile-scroll evidence to Stage 0.

Target guardrails:

- no main JavaScript or CSS regression beyond a documented measurement variance;
- materially fewer blur/shadow/fixed decorative effects;
- no horizontal overflow at 390px, tablet, or desktop;
- no new console/network failures;
- smooth manual scrolling on representative Android/mobile browsers;
- no lost focus, inaccessible controls, or route state.

Gate: full local verification plus explicit before/after performance report.

### Stage 5 - Functional Shell Review Candidate

Goal: prove behavioral equivalence before checkpointing.

- Run lint, all 919+ fast tests, all 58+ E2E tests, build, API typecheck, diff/hygiene checks, and any new shell gates.
- Run visual review across desktop, tablet, and mobile, but treat screenshots as evidence rather than interactive-review substitutes.
- Create a comprehensive manual checklist directly from the preservation inventory.
- Prepare a governed Review Candidate Backup prompt; keep the shell phase open.
- Repair direct findings through same-phase follow-up and repeat until accepted.

### Stage 6 - Shell Final Acceptance And Golden Checkpoint

Goal: create a reversible foundation for design work.

- Close the shell phase only after explicit user acceptance and separately authorized Final Acceptance Backup.
- Create a separate annotated Golden Checkpoint tag and GitHub Release for the accepted shell.
- Record source commit, test evidence, limitations, Vercel rollback note, and Supabase migration-state note.

### Stage 7 - Design Inspiration And `design.md`

Goal: define direction without prematurely constraining implementation.

- Collect user-selected inspiration URLs/screenshots and analyze interaction, information hierarchy, typography, color, motion, game feedback, mobile behavior, and data visualization.
- Use image generation for multiple concept directions only after explicit authorization.
- Create `design.md` with principles, anti-patterns, accessibility/performance budgets, selected concepts, and allowed interpretation range.
- Decide whether shadcn, another system, or bespoke primitives best serve the chosen direction.

### Stage 8 - GPT-5.6 SOL Handoff And Rebuild

Goal: enable a high-autonomy rebuild without sacrificing contracts.

The handoff package should contain:

- exact shell checkpoint commit/tag/release;
- functionality inventory and protected invariants;
- source architecture and high-conflict ownership map;
- test commands, fixtures, known gaps, manual-review workflow, and performance baseline;
- `design.md`, inspiration analyses, and approved concept assets;
- stack-decision authority and explicit protected backend contracts;
- sub-agent work-packet guidance and single-owner integration rules;
- required Review Candidate, hosted manual review, and checkpoint gates.

The rebuild may reconsider frontend libraries or architecture, but any migration must first demonstrate a concrete benefit, an incremental path, and preservation coverage. Broad autonomy does not authorize skipping gates or altering protected backend/game contracts silently.

## Test Evolution Rules

- Preserve all domain, repository, auth, privacy, progression, and multiplayer behavior tests.
- Prefer roles, accessible names, state, route, and user-visible outcomes over class names or exact DOM nesting.
- Update exact timing/animation assertions only when the underlying feedback remains observable.
- Do not replace real two-client Supabase E2E with mocks for multiplayer claims.
- Keep console/network failure guards.
- Add characterization before deleting presentation code.
- Keep screenshots out of pass/fail pixel baselines unless a later design system has stable tokens and explicit authorization.
- Build the shell manual checklist from inventory IDs so every protected capability has a disposition.

## Agent And Ownership Model

Parallel read-only audits and independent test lanes are useful. Writes should remain sequenced around high-conflict files.

- **Lane A - Characterization:** tests, route matrix, performance baseline.
- **Lane B - Shared shell primitives:** `src/ui/`, theme tokens, global CSS bands.
- **Lane C - Ordinary routes:** account/dashboard/stats/history/calendar/support surfaces.
- **Lane D - Gameplay:** OG/GO and shared keyboard/results presentation.
- **Lane E - Multiplayer:** panel/game/live/lobby/active/spectator presentation.
- **Coordinator:** `App.tsx`, global CSS integration, preservation matrix, full verification, progress, and handoff.

Only one writer should own `App.tsx`, `index.css`, or `MultiplayerPanel.tsx` at a time. Every integrated claim must be rerun in the coordinator state.

## Stop Conditions

Stop and report rather than expanding scope if:

- a shell change requires a Supabase schema/RPC/RLS/storage or gameplay-contract change;
- a capability cannot be reconciled with the preservation inventory;
- test failures require weakening behavioral coverage;
- mobile/accessibility regressions cannot be repaired narrowly;
- a new framework or component system becomes necessary without a documented decision addendum;
- implementation drifts into design inspiration, concept generation, deployment, checkpointing, or final redesign without the corresponding authorization.

## Recommended Immediate Next Action

Authorize one substantial but bounded **Functional Shell Implementation** prompt that executes Stages 0-5 in order, beginning with characterization coverage and ending at a verified Review Candidate. It must not perform Git/GitHub backup, shell acceptance/checkpointing, design generation, dependency installation, stack migration, or the GPT-5.6 SOL rebuild.
