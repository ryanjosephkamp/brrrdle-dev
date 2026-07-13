# Awordle Successor Roadmap And Handoff

**Status:** Approved successor direction after Phase 58 Final Acceptance.
**Date:** 2026-07-13.
**Reference repository:** `https://github.com/ryanjosephkamp/brrrdle-dev`.
**Successor repository:** `https://github.com/ryanjosephkamp/awordle`.
**Successor product name:** `Awordle` (pronounced "Award-le").
**Reference checkpoint:** `phase-58-final-functional-shell-golden-2026-07-13`.

## Objective

Preserve `brrrdle-dev` as the locked, fully functional lightweight shell while creating Awordle as a clean-history successor. Awordle must first become an independently configured, functionally equivalent clone. Only after that clone passes automated and manual parity review may it enter the research, concept, design-system, and frontend transformation program.

This document records direction. It does not authorize the successor bootstrap, repository visibility changes, Supabase/Vercel provisioning, migration application, deployment, rebranding, dependency installation, or redesign by itself.

## Non-Negotiable Decisions

1. `brrrdle-dev` is read-only after its final Golden Checkpoint. The new chat may inspect and copy from it but must not edit, deploy, relink, or reconfigure it.
2. Awordle uses a fresh Git history. Do not clone or push the `brrrdle-dev` `.git` directory, branches, tags, pull requests, or historical planning/progress trail.
3. Awordle remains private during bootstrap and parity review. It becomes public only after a secret/privacy/history audit and explicit user acceptance.
4. Preserve internal compatibility identifiers during the first clone: database schema names, migration filenames, storage keys, E2E prefixes, and non-user-facing identifiers may continue to contain `brrrdle`. First rebrand user-visible product text and assets. Broader internal renaming requires a separate risk-reviewed decision after parity.
5. Do not migrate live user data, Auth users, Storage objects, Vercel Blob contents, or secrets. The successor begins with clean service state and recreates functionality for new test users.
6. Keep the complete test suite, all 41 source-controlled migrations, runtime source, APIs, assets, and deployment/build configuration needed for functional equivalence.
7. Do not weaken tests or remove behavior to make the copy pass. Presentation-only assertions may change later only when an accepted design contract supersedes the current presentation.

## Successor Bootstrap Stages

### Stage A - New-Chat Onboarding And Source Verification

- Start a new chat dedicated to Awordle.
- Read the local-only handoff and execution prompt, this roadmap, `SHELL-LOCK.md`, the final preservation inventory, testing suite, Phase 58 closure records, and exact Golden Checkpoint metadata.
- Verify `brrrdle-dev` is clean and the tag/release resolve to the expected closure commit.
- Verify `awordle` is the exact intended empty repository. Change it from public to private before seeding anything.
- Create a separate local Awordle workspace. Do not use a Git worktree backed by `brrrdle-dev`; the repositories must have independent object databases and histories.

### Stage B - Clean-History Seed

Build the successor from the Golden Checkpoint with an explicit copy manifest.

Publicly tracked foundation:

- `.env.example`, `.gitignore`, package manifests, TypeScript/Vite/ESLint/Playwright/Vercel configuration, and `index.html`;
- `src/`, `api/`, `e2e/`, `public/`, and every file under `supabase/migrations/`;
- a rewritten Awordle `README.md`, a concise public `PRODUCT.md`, and only sanitized operational documentation needed by contributors or deployers;
- no credentials, local links, test output, auth state, environment files, project refs, tokens, or service-role material.

Local-only, ignored agent workspace:

- `.codex-internal/` containing the handoff, governance, preservation inventory, design research, concept decisions, implementation plans, evidence manifests, and workflow records;
- `prompt-packages/`, local visual evidence, browser traces, screenshots, and session artifacts;
- copied reference documents only when the agent needs them locally. The canonical source remains the locked tag in `brrrdle-dev`.

Do not carry into Awordle public history:

- `planning/`, `progress/`, `memory.md`, `agents.md`, `AGENT-IMPLEMENTATION-PLAN.md`, historical `CHANGELOG.md`, old phase specifications, old theme proposals, or internal prompt packages;
- `.git`, `.vercel`, `.env*`, `supabase/.temp`, `.DS_Store`, `node_modules`, `dist`, Playwright output, screenshots, videos, or traces;
- obsolete public documentation that describes the old phase history rather than the current product.

Before the first Awordle commit, generate and inspect:

- a source-to-destination manifest;
- a tracked-file allowlist;
- a non-printing secret/private-data scan;
- an old-brand inventory split into user-visible replacements and intentionally retained compatibility identifiers;
- a clean-history proof showing no `brrrdle-dev` commit objects or refs were imported.

### Stage C - User-Visible Awordle Rebrand

- Replace user-facing `brrrdle` names with `Awordle` across page metadata, headings, copy, manifest, service worker/cache labels, icons, feedback links, docs, and accessible labels.
- Use pronunciation copy only where product copy benefits from it; the canonical displayed name is `Awordle`.
- Preserve internal compatibility identifiers until parity is accepted.
- Update tests only where they assert user-visible brand copy or asset names. Do not alter behavior assertions.

### Stage D - Independent Supabase Foundation

- Create or select a new Supabase project dedicated to Awordle and verify its identity before every operation.
- Dry-run, then apply the complete ordered migration history to the empty project while preserving the local migration versions. Do not point Awordle at the `brrrdle-dev` project.
- Verify exact local/remote migration-ledger equality, RLS/grants, private schemas, RPC fingerprints, security/performance advisors, answer privacy, and zero temporary residue.
- Configure Auth Site URL and approved redirect URLs for local, preview, and production Awordle origins.
- Use disposable accounts for real two-client E2E. Keep the service-role key in process/environment scope only and remove temporary users and rows after testing.

### Stage E - Independent Vercel Foundation

- Create a new Vercel project linked only to `ryanjosephkamp/awordle`.
- Configure public Supabase URL/publishable or anon values in the appropriate browser/server aliases; never place service-role credentials in `VITE_*` variables.
- Provision distinct Awordle values for `CRON_SECRET` and Vercel Blob if those production features are retained. Do not copy secret values from `brrrdle-dev`.
- Verify build settings from `vercel.json`, auth redirects, cron authorization, Blob fallback behavior, PWA assets, and preview/production access policy.
- Do not relink, promote, roll back, or otherwise modify the existing `brrrdle-dev` Vercel project.

### Stage F - Functional Clone Acceptance

- Run lint, all unit tests, build, app/API typechecks, complete authority-enabled Chromium E2E, required Firefox/WebKit lanes, migration/catalog/privacy/advisor probes, and hygiene checks.
- Use the final preservation inventory as the traceability matrix. Every capability must be automated, manually checked, or explicitly identified as a characterization gap. A gap is not permission to remove behavior.
- Produce a comprehensive Awordle clone manual review checklist covering guest/account boundaries, Solo, Daily, Practice, multiplayer, requests, Marketplace/consumables, spectator/admin/privacy, navigation, mobile fit, refresh/re-entry, and deployment-specific behavior.
- Fix clone defects before acceptance. When all gates pass, perform a governed Awordle Final Acceptance backup and create an Awordle functional-clone Golden Checkpoint.

## Frontend Transformation Program

Only after Stage F is accepted:

1. **Research and audit:** inspect current frontend architecture, current ecosystem documentation, accessibility/performance guidance, and supplied inspiration sites. Use primary technical sources for stack decisions.
2. **Concept exploration:** create multiple genuinely distinct desktop/mobile directions. Generate original concept images for every major product area, not only a Home mockup.
3. **Vision lock:** iterate with the user until one coherent image set maps Home, navigation, Solo setup/game/results, Multiplayer overview/modes/game/spectation, Calendar/History, Marketplace, Stats/Leaderboard, Profile/Settings, Help/About, and responsive states.
4. **Design contract:** establish `design.md` with hierarchy, typography, palette, spacing, controls, board/keyboard semantics, feedback, data visualization, responsive behavior, accessibility, motion/sound, asset rules, and anti-patterns.
5. **Stack decision:** compare evolving the React/Vite foundation with selective component/tool adoption or a justified migration. Evaluate shadcn, Impeccable guidance, Next.js, animation tooling, data visualization, bundle cost, test impact, accessibility, rollback, and compatibility. No tool is mandatory merely because it is popular.
6. **Architecture and execution plan:** map the selected concepts to components, preserved contracts, test gates, migration boundaries, implementation batches, rollback points, and evidence requirements.
7. **Iterative implementation:** use reviewable vertical batches rather than a single unreviewed rewrite. Recommended batches are shell/navigation, Solo gameplay, Multiplayer, account/supporting workspaces, then global polish/onboarding. Each batch must pass focused tests, cross-route smoke, mobile review, and preservation checks before the next batch.
8. **Final hardening:** run the complete regression and real multiplayer matrix, accessibility/performance review, visual review, hosted manual checklist, and governed backup/checkpoint workflow.

## Future Tutorial Direction

The redesigned product should eventually provide a first-account onboarding sequence with accessible popover/dialog steps and lightweight in-product animated demonstrations. Users may skip it, it must not automatically replay after completion, and the same maintained tutorial content should be reachable later from Help. Animation should be generated from UI primitives or lightweight assets rather than mandatory autoplay video, must honor reduced motion, and must not block gameplay or account creation. This is design/rebuild scope, not part of the clone-equivalence gate.

## Governance And Review Cadence

- Continue the established loop: plan, implement, verify, Review Candidate backup, hosted/manual review, same-stage follow-up, Final Acceptance backup, checkpoint.
- Separate source work, migrations, service configuration, deployments, Git/GitHub actions, repository visibility changes, and releases unless one prompt explicitly authorizes the complete bounded operation.
- Every final report includes `Ryan Action Items`, even when the value is `None`.
- Awordle's local governance may evolve, but it must keep preservation, privacy, evidence, and review gates at least as strong as this handoff.

## Definition Of Success

The handoff is successful when Awordle has an independent clean Git history, independent Supabase and Vercel projects, user-visible Awordle branding, no committed internal/private artifacts, complete functional parity with the locked shell, clean automated and manual acceptance, and its own Golden Checkpoint. The redesign program may then proceed without placing the accepted shell at risk.
