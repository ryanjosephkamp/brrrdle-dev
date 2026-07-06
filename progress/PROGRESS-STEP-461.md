# Progress Step 461: Review Candidate Close Model Governance Update

**Date**: 2026-07-06
**Status**: Completed - Awaiting User Review Before Stage 50.3-50.4 Implementation
**Stable repository boundary**: The original stable `brrrdle` repository was not touched.

## Authorization

The current prompt authorized only a governance-only workflow update for:

- Review Candidate phase-close modeling;
- Manual Review Window handling before GitHub backup;
- Review Follow-up routing for directly phase-related manual-review findings;
- criteria for same-phase versus new-phase/addendum review feedback;
- progress tracking;
- lightweight documentation verification.

The prompt did not authorize:

- source/runtime code changes;
- test implementation;
- migrations or storage contract changes;
- deployment configuration changes;
- Git/GitHub state changes, commits, PRs, merges, backup workflow execution, release work, or production actions;
- prompt-package artifact changes;
- Phase 50.3-50.4 implementation;
- original stable `brrrdle` repository work.

## Changes

Updated governance:

- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`

Updated workflow/index docs:

- `planning/FUTURE-WORKFLOW-TIMELINE.md`
- `planning/README.md`

Updated progress:

- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-461.md`

## Workflow Rule Added

Future user-visible phases should close through this model:

1. Final hardening produces a **Review Candidate** with verification evidence, local/Codex-browser preview instructions when useful, ignored visual artifacts, and a committed manual review checklist.
2. The user gets a **Manual Review Window** before Git handoff or GitHub backup.
3. Directly phase-related findings may be handled through **Review Follow-up** inside the same phase, followed by focused verification and a return to Review Candidate.
4. Broader, unrelated, risky, protected-action-dependent, or new-feature feedback is routed to a later phase or explicit addendum.
5. Git handoff, GitHub backup, PR work, merge, deployment, release, and next-phase implementation happen only after manual review acceptance and separate explicit current-turn authorization.

## Same-Phase Feedback Criteria

Review feedback belongs in the same phase only when it is directly about current-phase behavior, copy, layout, evidence, or documentation; came from the phase checklist, local/Codex-browser preview, visual artifacts, or closely related review path; uses the same source/test/privacy boundaries; remains narrow; and does not require new migration/RLS, storage, deployment/configuration, Git/GitHub, release, scoring/rating/Elo, gameplay-rule, broad redesign, or stable-repository authority.

Feedback belongs in a new phase, later route, or explicit addendum when it is unrelated, feature-like, broad, protected-action-dependent, requires a materially different harness or ownership area, or depends on credentials, external access, production action, or stable-repository work.

## Verification

Passed:

- `git diff --check`
- CSV shape check: `rows=463`, `data_rows=462`, `columns=12`, `widths=[12]`, `last_id=461`.
- Non-printing/credential-value scan over changed tracked/untracked files: `scanned_files=21`, `credential_value_hits=0`, `nonprinting_hits=0`, `binary_skipped=0`.
- Ignored-artifact check: `tracked_files=1167`, `staged_files=0`, `changed_files=21`, `forbidden_tracked=0`, `forbidden_staged=0`, `forbidden_changed=0`, `ignored_checks_ok=[True, True]`.
- `git status --short --branch`

## Stop Gate

Stop here for user review. Phase 50.3-50.4 implementation remains prepared but unexecuted until the user sends the activation prompt or otherwise explicitly authorizes that gate.
