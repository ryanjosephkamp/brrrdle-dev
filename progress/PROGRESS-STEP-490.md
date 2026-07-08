# Progress Step 490 - Phase 50 Refresh Home Reset Follow-Up Prompt

**Status**: Completed - Refresh Home Reset Follow-Up Prompt Prepared.
**Phase**: Phase 50 - Solo Completion Persistence And Current-Surface Convenience.
**Repository**: `brrrdle-dev` only.
**Started**: 2026-07-08T02:51:42Z.
**Completed**: 2026-07-08T02:51:42Z.

## Summary

After the refresh-routing recovered Review Candidate Backup, the user reported that the hosted/live refresh behavior improved but remained inconsistent and therefore is not accepted as the final Phase 50 refresh policy.

The user revised the Phase 50 acceptance target to a simpler deterministic rule: manual hard/browser refresh may route the player to Home consistently instead of trying to preserve the exact current page, tab, subtab, or game surface.

This step records that hosted manual-review feedback, marks the previous preserve-current-surface target as superseded for acceptance, and prepares a bounded implementation prompt package for the Home-on-refresh follow-up.

## Updated

- Updated the Phase 50 changelog with the hosted/live refresh-routing feedback.
- Updated the Phase 50 manual review checklist with the new Home-on-refresh target.
- Marked the previous preserve-current-surface refresh target as superseded evidence rather than the acceptance target.
- Added this progress report and a new `progress/PROGRESS.csv` row.
- Created an ignored local prompt package for the next implementation/testing step:
  - `prompt-packages/phase-50/PHASE-50-REFRESH-HOME-RESET-FOLLOW-UP-PROMPT-2026-07-08.md`

## Changed Files

- `planning/phase-50/CHANGELOG.md`
- `planning/phase-50/REVIEW-CHECKLIST.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-490.md`

Ignored local artifact prepared:

- `prompt-packages/phase-50/PHASE-50-REFRESH-HOME-RESET-FOLLOW-UP-PROMPT-2026-07-08.md`

## Verification

Passed:

- `git diff --check`
- progress CSV shape check with `python3 -S`
- non-printing/credential-value/raw-answer scan over changed tracked/untracked files plus ignored prompt artifact
- ignored-artifact check confirming the prompt package is local-only and ignored
- `git status --short --branch`

## Boundaries

No source/runtime code, tests, migrations, Supabase/RLS/RPC/table/bucket changes, deployment configuration changes, Git/GitHub actions, branch creation, staging, commit, push, PR, merge, backup workflow execution, release, final Phase 50 acceptance/closure, Final Acceptance Backup, next-phase work, public tunneling, Practice GO answer-selection/randomness algorithm changes, or stable `brrrdle` repository work was performed.

No raw Daily answers, credentials, auth tokens, secrets, screenshots, videos, traces, HAR files, local storage dumps, local session artifacts, private account data, Supabase keys, Vercel tokens, or environment values were written to tracked files, progress reports, prompt packages, logs, or final reports.

## Next Step

Use `prompt-packages/phase-50/PHASE-50-REFRESH-HOME-RESET-FOLLOW-UP-PROMPT-2026-07-08.md` to authorize the bounded same-phase Home-on-refresh implementation/testing follow-up while keeping Phase 50 open.
