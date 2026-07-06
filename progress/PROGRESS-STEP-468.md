# Progress Step 468: Review Candidate Interactive Manual Preview Workflow

**Date**: 2026-07-06
**Status**: Completed - Phase 50 Interactive Manual Preview Running
**Stable repository boundary**: The original stable `brrrdle` repository was not touched.

## Authorization

The user authorized a governance/documentation-only update to formalize an interactive local preview step for Review Candidates, then asked Codex to start a local Phase 50 Review Candidate preview server if safe.

Authorized:

- update governance/workflow documentation for Interactive Manual Preview inside the Manual Review Window;
- clarify that screenshots and visual artifacts support, but do not replace, interactive manual review for user-visible work;
- clarify the preferred local preview commands and loopback-only binding;
- update the Phase 50 manual review checklist with explicit preview instructions;
- update progress;
- start a local loopback preview server for Phase 50 manual review.

Not authorized:

- source/runtime implementation;
- tests or migrations;
- storage schema, cloud progress contract, Supabase/RLS/RPC/table/bucket, deployment/configuration, route architecture, shell/Stats/Profile/Settings redesign, gameplay-rule, reward-formula, scoring, Elo/rating, or unrelated changes;
- Git branch creation, staging, commits, pushes, PRs, merges, releases, deployments, backup workflow execution, production changes, next-phase implementation, or stable `brrrdle` repository work.

## Documentation Updates

Updated:

- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `planning/phase-50/REVIEW-CHECKLIST.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-468.md`

New workflow rule:

- Review Candidates with user-visible gameplay, navigation, account, shell, layout, or interaction changes should provide an **Interactive Manual Preview** when feasible.
- The preferred production-style local preview command is `npm run preview -- --host 127.0.0.1 --port 4173` after a clean build.
- Use `npm run dev -- --host 127.0.0.1 --port 5173` only when development-server behavior is specifically needed.
- Screenshots, manifests, and visual artifacts are supporting evidence only, not a replacement for interactive manual review.
- Local preview does not authorize Git/GitHub actions, backup workflow execution, deployment, release, merge, production changes, next-phase implementation, or stable `brrrdle` repository work.

## Preview Server

Started Phase 50 Review Candidate preview:

- URL: `http://127.0.0.1:4173/`
- Command: `npm run preview -- --host 127.0.0.1 --port 4173`
- PID artifact: `test-results/manual-preview/phase-50-review-candidate/preview.pid`
- Scope: loopback-only local manual review preview.

The preview is backed by the clean Phase 50 final-hardening build from `progress/PROGRESS-STEP-467.md`. This pass changed only documentation/progress files, not runtime/source files.

## Verification

Passed:

- HTTP preview probe: `http://127.0.0.1:4173/` returned status `200`.
- Watched ports before final hygiene: `4173=busy`, `4174=clear`, `4175=clear`, `5173=clear`.

Final hygiene results are recorded below after the final check pass.

## Final Hygiene

Passed:

- `git diff --check`
- CSV shape check: `rows=470`, `data_rows=469`, `columns=12`, `widths=[12]`, `last_id=468`.
- Non-printing/credential-value scan over changed tracked/untracked files plus ignored prompt, visual, and preview artifacts: `scanned_files=56`, `credential_value_hits=0`, `nonprinting_hits=0`, `binary_skipped=0`.
- Ignored-artifact check: `tracked_files=1167`, `staged_files=0`, `changed_files=44`, `forbidden_tracked=0`, `forbidden_staged=0`, `forbidden_changed=0`, `local_artifacts_ignored=8/8`, `ignored_prompt_files=9/9`.
- Watched ports: `4173=busy` for the active preview, `4174=clear`, `4175=clear`, `5173=clear`.
- `git status --short --branch`

## Stop Gate

Stop here for the Phase 50 Manual Review Window. The user should review the running local preview against:

- `planning/phase-50/REVIEW-CHECKLIST.md`
- `planning/phase-50/CHANGELOG.md`
- `test-results/visual-review/phase-50-review-candidate/manifest.md`

After manual review, the next safe action is either:

- report directly Phase-50-related findings for same-phase Review Follow-up; or
- report manual review acceptance and explicitly authorize Git handoff/backup preparation as a separate protected action.

Git/GitHub backup, deployment, release, merge, next-phase implementation, and stable `brrrdle` repository work remain unexecuted.
