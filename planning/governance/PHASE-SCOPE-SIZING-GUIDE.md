# Phase Scope Sizing Guide

**Status**: Active workflow guidance.
**Date**: 2026-07-01.
**Authority**: Supporting governance under `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, active phase specs, and current user instructions.
**Repository Target**: `brrrdle-dev`.

## Purpose

This guide explains how future `brrrdle-dev` phases may carry a larger cohesive payload while preserving narrow implementation stages, explicit review gates, and the existing verification-first workflow.

It is meant to reduce repeated full-suite cost without weakening quality. It does not authorize implementation, migration, deployment, Git/GitHub work, release work, or original stable `brrrdle` repository work.

## Core Recommendation

Future phases may be larger macro-phases when the work is cohesive, but individual implementation stages should remain narrow, single-purpose, and independently reviewable.

In practice:

- increase the phase payload when related work shares the same product area, data contract, privacy boundary, test harness, or UI ownership;
- keep stages focused on one risk class at a time, such as audit, migration/RLS addendum, migration execution, source integration, UI cleanup, final hardening, or review documentation;
- preserve explicit stop gates between stages that change authority, persistence, privacy, gameplay, or route ownership;
- keep full final verification before Git handoff, but rely on focused tests and lightweight documentation checks during smaller planning or documentation-only stages.

This should make phases more economical without turning a single stage into an oversized, hard-to-debug bundle.

## Compatible Batching

Work is usually safe to batch into one macro-phase when most of these are true:

- The items affect the same user journey or product surface.
- The same source modules or nearby modules would be read and tested anyway.
- The same E2E setup can verify multiple claims.
- The same Supabase/RLS contract or parser boundary supports the work.
- The same visual review pass can cover the changed surfaces.
- The work can be divided into narrow stages with clean exit gates.
- A final manual review checklist can describe the phase as one coherent outcome.

Good candidates:

- public profile links, safe profile cards, and private match request planning;
- route/navigation copy, page placement, and nearby component ownership;
- account/profile/settings copy and current-player account management;
- spectator UI source integration after a separately verified spectator projection exists;
- bug fixes that share the same affected flow and verification harness.

## Incompatible Batching

Do not batch unrelated high-risk changes simply to save a full-suite run.

Keep work in separate phases, or at least separate explicitly approved stage gates, when it mixes:

- migration/RLS changes with unrelated app-shell or gameplay-rule changes;
- public/privacy exposure with Elo, ranking, scoring, or settlement changes;
- deployment/configuration work with source/runtime implementation;
- service workers or push subscriptions with ordinary notification UI work;
- production release work with feature implementation;
- broad theme or layout redesign with active gameplay, social, spectator, or account changes;
- multiple high-conflict ownership areas without a clear sequencing plan.

If the only relationship between two items is that they are both "next on the roadmap," keep them separate.

## Stage Shape

Expanded phases should still use narrow stages.

Recommended stage types:

- **Protected baseline**: confirm repo state, preserve user-edited review files, record current artifacts, and run the approved baseline gate.
- **Audit and scope lock**: read-only diagnosis, data-path mapping, risk classification, and source-only versus addendum decision.
- **Migration/RLS addendum planning**: documentation-only SQL/RLS contract, grants, probes, rollback notes, and privacy boundaries.
- **Migration/RLS execution**: exactly scoped migration work, target confirmation, non-printing probes, and stop-on-failure behavior.
- **Source integration**: one product surface or data path at a time, with focused tests first.
- **Optional gate**: explicit decision point for tempting extras such as presence, counts, profile links, or broader social behavior.
- **Final hardening**: focused regressions, feasible E2E, visual handoff review when authorized, changelog, manual review checklist, and final verification.

Avoid using a source implementation stage to also create new governance, change deployment settings, run GitHub backup, or start the next phase.

## Verification Cadence

Use a verification ladder instead of running the largest suite after every small change.

### Documentation-Only Stages

Use lightweight checks:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Do not run the full test suite for documentation-only work unless documentation tooling unexpectedly requires it.

### Protected Baseline Stages

Use the approved baseline gate for the active phase. The current baseline pattern usually includes:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port/process cleanup checks when relevant
- `git status --short --branch`

### Implementation Stages

Run focused tests first, then the standard stage gate required by the stage prompt.

For costly E2E surfaces, prefer the smallest relevant tagged/file-specific E2E during the stage. Save broad E2E and `npm run test:full` for final hardening unless the stage changes a shared contract that needs immediate broad proof.

### Migration/RLS Stages

Keep migration/RLS stages evidence-heavy and narrow:

- create a reviewed addendum before SQL execution;
- create exactly the authorized migration or stop;
- confirm the target project without printing secrets;
- run non-printing probes for allow-listed fields, forbidden fields, grants, RLS behavior, mutation denial, and rollback/idempotency expectations;
- do not claim source/UI integration is complete until a later source stage verifies it.

### Final Hardening

The final hardening stage should be the broad gate:

- focused regression set;
- feasible targeted E2E;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e` when the phase affects browser flows;
- `npm run test:full` for major phases;
- `npm run build`;
- API typecheck where applicable;
- diff, CSV, secret/artifact, ignored-artifact, watched-port, and status checks;
- visual handoff review and manual checklist when authorized.

Git handoff preparation may rely on fresh final-hardening evidence when no source/runtime files changed afterward, but it should still run lightweight pre-handoff checks.

## Manual Review And Visual Review

Manual review checklists and visual handoff artifacts help the user inspect changed behavior. They do not replace automated tests, migration/RLS probes, or final verification.

Manual checklist content should remain phase-specific and should include:

- required manual checks;
- optional nice-to-check items;
- preserved invariants from prior protected phases;
- known deferred or out-of-scope work;
- evidence paths;
- a review result section.

Visual artifacts should stay local-only and ignored under `test-results/visual-review/`.

## Future Routing Guidance

Use this guide when preparing future planning briefs and specs.

Current recommended routing:

- **Phase 39 or the next user-approved phase** may become a larger public profile and private matchmaking macro-phase if the user's next bug/feature notes and the audit keep the work cohesive and safe.
- **Phase 40 or later** should remain the natural home for public site stats, private developer dashboard, onboarding, and help unless the user-provided observations justify rerouting.
- **Phase 41 or later** should keep progression HUD counters and Focus Mode late, after major public, social, private-matchmaking, stats, onboarding, and account surfaces are stable.
- **Theme work** should remain after major feature surfaces stabilize.
- **Service workers, push subscriptions, deployment/release, gameplay-rule changes, and Elo changes** remain later gated work requiring explicit authorization.

If the next user prompt introduces urgent bug fixes or feature improvements that are more cohesive than the current Phase 39 roadmap entry, it is acceptable for the planning brief to reroute phase numbers. The planning brief must explain the reroute, preserve prior roadmap intent, and avoid treating old phase numbers as fixed when the new scope is safer.

## Stop Conditions

Stop and ask for review instead of enlarging a phase if:

- the work cannot be described as one coherent macro-phase;
- the phase would require multiple unrelated migrations or privacy contracts;
- the phase would mix gameplay-rule changes with unrelated UI/social/deployment work;
- the final manual review checklist would become too vague to test by hand;
- focused tests cannot isolate stage failures;
- the phase would require unapproved deployment, production, GitHub, secret, or stable-repo actions.

## Summary Rule

Make phases bigger only when that makes the work more coherent. Keep stages small enough that a failed test or review finding has an obvious owner and rollback path.
