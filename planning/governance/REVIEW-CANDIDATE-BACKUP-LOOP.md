# Review Candidate Backup Loop

**Status**: Active workflow guidance.
**Date**: 2026-07-06.
**Authority**: Supporting governance under `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, active phase specs, and current user instructions.
**Repository Target**: `brrrdle-dev`.

## Purpose

This document defines how `brrrdle-dev` phases can use GitHub backup before final phase closure so the user can manually review a Review Candidate on desktop and mobile devices through the normal hosted surface.

This replaces the earlier default that manual review must always happen before any GitHub backup. It does not authorize Git/GitHub actions by itself. Every backup still requires a separate current prompt with explicit protected-action authorization.

## Core Model

A phase may now use a loop:

1. Final hardening produces a **Review Candidate** with verification evidence, changelog/checklist updates, and known limitations.
2. The user explicitly authorizes a **Review Candidate Backup**.
3. Codex runs the governed GitHub backup workflow for the Review Candidate.
4. The phase remains open and is not finally accepted, closed, or advanced.
5. The user manually reviews the hosted/live candidate against the checklist on desktop and mobile.
6. Directly phase-related findings go through same-phase **Review Follow-up**.
7. Follow-up fixes rerun focused verification plus affected final-hardening checks, then return to Review Candidate.
8. A new Review Candidate Backup may be authorized for the next review cycle.
9. When the user accepts manual review, Codex records final acceptance/closure and runs a **Final Acceptance Backup** if repository state changed or the user wants the acceptance recorded on GitHub.

In practice, a user-visible phase often has at least one Review Candidate Backup and one Final Acceptance Backup. If the latest Review Candidate Backup already matches the accepted repo state and no acceptance/closure docs need committing, the user may explicitly skip the final backup; otherwise the final backup records the accepted close state.

## Definitions

- **Review Candidate**: A verified, review-ready phase state. It is not final acceptance, phase closure, release approval, or next-phase authorization.
- **Review Candidate Backup**: A protected Git/GitHub backup of a Review Candidate so the user can review the candidate through GitHub-backed hosting or the normal live/review surface. It may update GitHub `main` and may trigger existing automatic host behavior if the repository is already configured that way. Codex must not separately run deployment, release, migration, or production-configuration commands unless a later prompt explicitly authorizes them.
- **Manual Review Window**: The period after a Review Candidate Backup when the user inspects the hosted/live candidate, checklist, changelog, and local visual evidence.
- **Review Follow-up**: A same-phase implementation or documentation pass for directly phase-related manual-review findings.
- **Final Acceptance Backup**: The protected Git/GitHub backup after manual review acceptance and phase closure documentation, when needed.

## Backup Authority Rules

- A Review Candidate Backup requires explicit current-turn authorization.
- A Review Candidate Backup must state that the phase remains open after the backup.
- A Review Candidate Backup must use the governed `brrrdle-github-backup` workflow or a stricter prompt that preserves the same checks.
- A Review Candidate Backup must include an exact staging allowlist and must exclude ignored/local artifacts such as `prompt-packages/`, `test-results/`, screenshots, videos, traces, auth state, tokens, `.env*`, `dist/`, `node_modules/`, and local Codex skills.
- A Review Candidate Backup may include source/runtime, tests, docs, and progress files that belong to the Review Candidate, but it must not include unrelated work.
- A Review Candidate Backup does not authorize final phase acceptance, phase closure, release, deployment configuration, migrations, next-phase implementation, broad redesign, protected gameplay/rating rule changes, or work in the original stable `brrrdle` repository.
- If GitHub checks, PR metadata, visible host status, tree-equivalence checks, or secret/artifact checks fail, Codex must stop and report the blocker.

## Manual Review Rules

During the Manual Review Window, the user may test the backed-up candidate on any normal review surface available from the GitHub-backed workflow, including desktop and mobile devices.

Manual review feedback belongs in the same phase when all of these are true:

- the finding is directly about behavior, copy, layout, evidence, or documentation changed or explicitly routed by the current phase;
- the finding came from the phase checklist, hosted/live Review Candidate, local preview, visual artifacts, or closely related review path;
- the fix can use the same source, test, migration, privacy, and verification boundaries already authorized for the phase;
- the fix is narrow enough to verify with the phase's existing harness and does not require unrelated ownership areas;
- the fix does not require a new protected action such as migration/RLS execution, deployment/configuration changes, release work, gameplay-rule changes, Elo/rating changes, broad redesign, or stable `brrrdle` repository access.

Manual review feedback should become a new phase, later-phase route, or explicit addendum when any of these are true:

- it is a new feature request, broader redesign, roadmap preference, or unrelated bug;
- it changes storage schemas, Supabase/RLS contracts, privacy exposure, deployment/configuration, release posture, scoring/rating/Elo rules, or canonical gameplay rules;
- it needs a materially different test harness, data contract, migration plan, or ownership area from the phase being reviewed;
- it would make the manual checklist too broad to inspect clearly;
- it depends on credentials, external access, production configuration, migration execution, release action, or protected repo work that the current phase did not authorize.

## Local Preview Status

Interactive local, Codex-browser, or same-LAN previews are still allowed as convenience tools when they work. They are supporting review options, not required prerequisites for Review Candidate Backup.

If local or same-LAN preview fails, Codex should clean up any preview server it started and route the user to the Review Candidate Backup Loop rather than creating a public tunnel automatically.

## Final Acceptance

The phase closes only after the user explicitly accepts manual review or explicitly approves closure with known limitations.

At closure, Codex should:

- update the phase checklist, changelog, progress row, and progress report as needed;
- state whether any same-phase Review Follow-up was performed after the latest Review Candidate Backup;
- run the required final acceptance or pre-backup checks;
- request or execute a Final Acceptance Backup only when explicitly authorized;
- confirm that next-phase work remains gated until the user authorizes it.

## Summary Rule

Back up Review Candidates so the user can review the real hosted experience, but do not confuse a Review Candidate Backup with phase closure. The loop is: final hardening, Review Candidate Backup, manual review, same-phase follow-up if needed, repeat, final acceptance, and separately authorized final backup/closure.
