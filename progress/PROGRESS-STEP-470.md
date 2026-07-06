# Progress Step 470: Review Candidate Backup Loop Governance

**Date**: 2026-07-06
**Status**: Completed - Review Candidate Backup Loop Documented
**Stable repository boundary**: The original stable `brrrdle` repository was not touched.

## Authorization

The user authorized replacing the local/mobile-preview-first Manual Review Window policy with a Review Candidate Backup Loop. The goal is to allow a GitHub backup at the Review Candidate point so the user can manually review the game on desktop and mobile through the normal hosted/live surface without closing the current phase.

Authorized:

- update governance and workflow documentation for Review Candidate Backup before phase closure;
- clarify that Review Candidate Backup does not close the phase;
- allow directly phase-related manual-review findings to stay in the same phase after a Review Candidate Backup;
- clarify that the loop may repeat until manual review is accepted;
- generate an ignored local prompt package for the next explicitly authorized Review Candidate GitHub backup;
- stop the unsuccessful same-LAN preview server started in Step 469.

Not authorized:

- execute the GitHub backup in this step;
- stage, commit, push, open a PR, merge, delete branches, release, deploy, run migrations, change deployment configuration, start next-phase work, or touch the original stable `brrrdle` repository;
- change source/runtime code, tests, migrations, storage schemas, Supabase/RLS/RPC/table/bucket contracts, gameplay rules, reward formulas, scoring, Elo/rating, or unrelated phase scope.

## Documentation Updates

Updated:

- `planning/governance/REVIEW-CANDIDATE-BACKUP-LOOP.md`
- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `planning/FUTURE-WORKFLOW-TIMELINE.md`
- `planning/README.md`
- `planning/phase-50/REVIEW-CHECKLIST.md`
- `planning/phase-50/CHANGELOG.md`
- `planning/phase-50/PLANNING-BRIEF.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-470.md`

New workflow rule:

- Final hardening produces a Review Candidate, not final phase closure.
- The user may explicitly authorize a Review Candidate Backup so the candidate can be reviewed through the normal GitHub-backed hosted/live surface on desktop and mobile devices.
- The phase remains open after Review Candidate Backup.
- Manual-review findings that are directly Phase 50-related may be fixed through same-phase Review Follow-up.
- After follow-up, Codex returns the phase to Review Candidate and the user may authorize another Review Candidate Backup.
- Final phase closure and any Final Acceptance Backup happen only after manual review acceptance and separate explicit authorization.

This supersedes the Step 468/469 primary assumption that manual review must be completed through local/Codex-browser/same-LAN preview before GitHub backup. Local preview remains an optional support path when it works.

## Preview Cleanup

Stopped the same-LAN preview server from Step 469:

- Launch label: `org.brrrdle.phase50.mobile-preview`
- Watched ports after cleanup: `4173=clear`, `4174=clear`, `4175=clear`, `5173=clear`.

Ignored preview artifacts may remain under `test-results/manual-preview/phase-50-mobile/` as local-only evidence and must not be staged or committed.

## Prompt Package

Created ignored local prompt artifact:

- `prompt-packages/phase-50/PHASE-50-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-06.md`

The prompt is intended to invoke the governed `brrrdle-github-backup` workflow for a Review Candidate Backup only. It must state that Phase 50 remains open after the backup and that manual review findings may still be handled in the same phase.

## Verification

Passed:

- `git diff --check`
- CSV shape check: `rows=472`, `data_rows=471`, `columns=12`, `widths=[12]`, `last_id=470`.
- Non-printing/credential-value scan over changed tracked/untracked files plus ignored prompt and preview artifacts: `scanned_files=64`, `credential_value_hits=0`, `nonprinting_hits=0`, `binary_skipped=5`.
- Ignored-artifact check: `tracked_files=1167`, `staged_files=0`, `changed_files=21`, `forbidden_tracked=0`, `forbidden_staged=0`, `forbidden_changed=0`, `local_artifacts_ignored=22/22`.
- Watched ports: `4173=clear`, `4174=clear`, `5173=clear`, `3000=clear`.
- Prompt artifact ignored check: `.gitignore` excludes `prompt-packages/phase-50/PHASE-50-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-06.md`.
- Stale policy scan: `stale_policy_hits=0` for old manual-review-before-backup wording in active workflow files.
- `git status --short --branch`

## Stop Gate

Stop here before Git/GitHub actions. The next safe action is for the user to run the Review Candidate GitHub backup activation prompt if they want the Phase 50 Review Candidate backed up for hosted/live manual review.

Git/GitHub backup, deployment, release, merge, next-phase implementation, external tunneling, and stable `brrrdle` repository work remain unexecuted.
