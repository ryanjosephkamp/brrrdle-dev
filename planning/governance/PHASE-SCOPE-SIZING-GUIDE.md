# Phase Scope Sizing Guide

**Status**: Active workflow guidance.
**Date**: 2026-07-01.
**Authority**: Supporting governance under `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, active phase specs, and current user instructions.
**Repository Target**: `brrrdle-dev`.

## Purpose

This guide explains how future `brrrdle-dev` phases may carry a larger cohesive payload while preserving narrow implementation stages, explicit review gates, and the existing verification-first workflow.

It is meant to reduce repeated full-suite cost without weakening quality. It does not authorize implementation, migration, deployment, Git/GitHub work, release work, or original stable `brrrdle` repository work.

For Review Candidate backup cadence, also use `planning/governance/REVIEW-CANDIDATE-BACKUP-LOOP.md`.

## Core Recommendation

Future phases may be larger macro-phases when the work is cohesive, but individual implementation stages should remain narrow, single-purpose, and independently reviewable.

In practice:

- increase the phase payload when related work shares the same product area, data contract, privacy boundary, test harness, or UI ownership;
- keep stages focused on one risk class at a time, such as audit, migration/RLS addendum, migration execution, source integration, UI cleanup, final hardening, or review documentation;
- preserve explicit stop gates between stages that change authority, persistence, privacy, gameplay, or route ownership;
- keep full final verification before Review Candidate backup or final Git handoff, but rely on focused tests and lightweight documentation checks during smaller planning or documentation-only stages.

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
- **Review Candidate**: a pre-closure state after final hardening where the phase is ready for user inspection but not yet accepted or closed.
- **Review Candidate Backup**: a separately authorized Git/GitHub backup of a Review Candidate so the user can review the candidate through the normal GitHub-backed hosted/live surface; this does not close the phase.
- **Manual Review Window**: a user-owned inspection gate after a Review Candidate Backup, local/Codex-browser preview, visual artifacts, or checklist handoff where the user can test the candidate before final acceptance.
- **Interactive Manual Preview**: a local preview of the Review Candidate app for hands-on user review. Prefer `npm run preview -- --host 127.0.0.1 --port 4173` after a clean build for same-machine desktop review; use `npm run dev -- --host 127.0.0.1 --port 5173` only when development-server behavior is specifically needed.
- **Mobile Manual Preview**: an explicitly authorized same-LAN Interactive Manual Preview option for trusted phone/tablet review. `127.0.0.1` works only on the machine running the preview server, so Android/iOS review usually needs a specific private Mac LAN URL such as `http://<mac-lan-ip>:4173/`.
- **Review Follow-up**: same-phase targeted fixes for directly phase-related manual-review findings, followed by focused verification and a return to Review Candidate.
- **Final Acceptance Backup**: a separately authorized final Git/GitHub backup after manual review acceptance and phase closure documentation, when repository state changed or the user wants the accepted close state recorded on GitHub.

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

The final hardening stage should be the broad gate that prepares a Review Candidate, not the phase closure itself:

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

Review Candidate backup preparation may rely on fresh final-hardening evidence when no source/runtime files changed afterward, but it should still run lightweight pre-backup checks. Final Acceptance Backup may rely on the latest Review Candidate backup plus focused follow-up evidence when no source/runtime files changed afterward.

## Manual Review And Visual Review

Manual review checklists and visual handoff artifacts help the user inspect changed behavior. They do not replace automated tests, migration/RLS probes, or final verification.

For phases with user-visible gameplay, navigation, account, shell, layout, or interaction changes, screenshots and manifests are supporting evidence only. They are not a replacement for interactive manual review. The Review Candidate should provide a local preview path when feasible so the user can click through the checklist before accepting the phase.

Use this close model for completed user-visible phases:

1. Final hardening produces a **Review Candidate** with verification evidence, interactive local/Codex-browser preview instructions when applicable, ignored visual artifacts, and a committed manual review checklist.
2. The user may explicitly authorize a **Review Candidate Backup** so the candidate can be reviewed through the normal GitHub-backed hosted/live surface on desktop and mobile devices. This protected backup does not close the phase.
3. The **Manual Review Window** happens after the Review Candidate is available through the chosen review surface. During this window the user may inspect the hosted/live candidate, running local app, Codex-browser preview, screenshots, manifests, and checklist, then report acceptance or findings.
4. **Review Follow-up** stays inside the same phase only for directly phase-related findings. After each accepted follow-up, rerun focused verification plus any affected final-hardening checks, update progress, and return to Review Candidate.
5. Repeat Review Candidate Backup and Manual Review Window as needed until the user accepts the phase.
6. Phase closure, Final Acceptance Backup, release, deployment configuration, and next-phase implementation remain separate protected actions requiring explicit current-turn authorization.

Interactive local preview rules:

- Prefer the production-style preview server after a clean build: `npm run preview -- --host 127.0.0.1 --port 4173`.
- Use the dev server only when the review specifically needs development-server behavior: `npm run dev -- --host 127.0.0.1 --port 5173`.
- `127.0.0.1` is loopback for the device opening the URL. It works for desktop review on the same machine running the preview server, but an Android/iOS device will treat `127.0.0.1` as the phone/tablet itself.
- Bind preview servers to `127.0.0.1` unless the user explicitly authorizes another host.
- When the user explicitly authorizes Mobile Manual Preview, bind only to the Mac's active private LAN IPv4 address, such as `npm run preview -- --host <mac-lan-ip> --port 4173`, and report the exact same-LAN URL for trusted local-network review.
- If the preferred port is unavailable, choose a nearby free local port and report the exact URL.
- Keep preview logs, PIDs, screenshots, videos, traces, and local session artifacts ignored/local-only.
- Same-LAN mobile preview is not public deployment and does not authorize public tunneling, Git/GitHub actions, GitHub backup, PR work, merge, release, deployment, production changes, next-phase implementation, or stable `brrrdle` repository work.
- If same-LAN preview fails, binding to the specific private LAN IP fails, or the mobile in-app browser blocks the page, stop and recommend a separately authorized external preview/tunnel prompt rather than creating a tunnel automatically.
- Stop the preview server after review or when the user asks; record the stop command or PID in the closeout.
- If local, Codex-browser, or same-LAN preview is not usable for manual review, clean up any preview server Codex started and route to the Review Candidate Backup Loop instead of creating a public tunnel automatically.

Manual-review feedback belongs in the same phase when all of these are true:

- the finding is directly about behavior, copy, layout, evidence, or documentation changed or explicitly routed by the current phase;
- the finding came from the phase's manual checklist, local/Codex-browser preview, visual artifacts, or closely related review path;
- the fix can use the same source, test, migration, privacy, and verification boundaries already authorized for the phase;
- the fix is narrow enough to verify with the phase's existing harness and does not require unrelated ownership areas;
- the fix does not require a new protected action such as migration/RLS execution, deployment/configuration changes, release work, gameplay-rule changes, Elo/rating changes, broad redesign, or stable `brrrdle` repository access.

Manual-review feedback should become a new phase, later-phase route, or explicit addendum when any of these are true:

- it is a new feature request, broader redesign, roadmap preference, or unrelated bug;
- it changes storage schemas, Supabase/RLS contracts, privacy exposure, deployment/configuration, release posture, scoring/rating/Elo rules, or canonical gameplay rules;
- it needs a materially different test harness, data contract, migration plan, or ownership area from the phase being reviewed;
- it would make the manual checklist too broad to inspect clearly;
- it depends on credentials, external access, production action, or protected repo work that the current phase did not authorize.

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
- the manual review finding is not directly phase-related or requires a new protected action;
- focused tests cannot isolate stage failures;
- the phase would require unapproved deployment, production configuration, GitHub, secret, or stable-repo actions.

## Summary Rule

Make phases bigger only when that makes the work more coherent. Keep stages small enough that a failed test or review finding has an obvious owner and rollback path, then close through Review Candidate, explicitly authorized Review Candidate Backup, Manual Review Window, same-phase Review Follow-up if needed, accepted review, and separately authorized Final Acceptance Backup or closure.
