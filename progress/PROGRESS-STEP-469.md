# Progress Step 469: Review Candidate Mobile Manual Preview Workflow

**Date**: 2026-07-06
**Status**: Completed - Phase 50 Mobile Manual Preview Running
**Stable repository boundary**: The original stable `brrrdle` repository was not touched.

## Authorization

The user authorized a governance/documentation-only update to formalize a Mobile Manual Preview option inside the existing Review Candidate Interactive Manual Preview workflow, then asked Codex to prepare a same-LAN Phase 50 mobile preview if safe.

Authorized:

- update governance/workflow documentation for Mobile Manual Preview;
- clarify that `127.0.0.1` works only on the same machine running the preview server;
- clarify that Android/iOS review usually needs a same-LAN URL such as `http://<mac-lan-ip>:4173/`;
- clarify that same-LAN preview is trusted local-network manual review only;
- update the Phase 50 manual review checklist;
- update progress;
- stop the prior loopback preview and start a same-LAN Phase 50 Review Candidate preview bound to the Mac's active private LAN IP.

Not authorized:

- source/runtime implementation;
- tests or migrations;
- storage schema, cloud progress contract, Supabase/RLS/RPC/table/bucket, deployment/configuration, route architecture, shell/Stats/Profile/Settings redesign, gameplay-rule, reward-formula, scoring, Elo/rating, or unrelated changes;
- public tunneling or external preview services;
- Git branch creation, staging, commits, pushes, PRs, merges, releases, deployments, backup workflow execution, production changes, next-phase implementation, or stable `brrrdle` repository work.

## Documentation Updates

Updated:

- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `planning/phase-50/REVIEW-CHECKLIST.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-469.md`

New workflow rule:

- **Mobile Manual Preview** is an explicitly authorized same-LAN Interactive Manual Preview option for trusted phone/tablet review.
- `127.0.0.1` is loopback for the device opening the URL. It works on the Mac running the preview server, but Android/iOS treats it as the phone/tablet itself.
- Mobile review usually needs a Mac LAN URL such as `http://<mac-lan-ip>:4173/`.
- Same-LAN preview must bind to a specific private LAN IP unless a later prompt explicitly authorizes broader binding.
- Same-LAN preview does not authorize public tunneling, Git/GitHub actions, GitHub backup, PR work, merge, release, deployment, production changes, next-phase implementation, or stable `brrrdle` repository work.
- If same-LAN preview fails or the mobile in-app browser blocks it, Codex should stop and recommend a separately authorized external preview/tunnel prompt rather than creating one automatically.

## Preview Server

Stopped the prior loopback-only preview from:

- PID artifact: `test-results/manual-preview/phase-50-review-candidate/preview.pid`
- Previous URL: `http://127.0.0.1:4173/`

Started Phase 50 same-LAN mobile preview:

- URL: `http://192.168.1.12:4173/`
- Command intent: `npm run preview -- --host 192.168.1.12 --port 4173`
- Launch label: `org.brrrdle.phase50.mobile-preview`
- PID artifact: `test-results/manual-preview/phase-50-mobile/preview.pid`
- URL artifact: `test-results/manual-preview/phase-50-mobile/preview-url.txt`
- Log artifact: `test-results/manual-preview/phase-50-mobile/preview.log`
- Plist artifact: `test-results/manual-preview/phase-50-mobile/org.brrrdle.phase50.mobile-preview.plist`
- Scope: trusted same-LAN manual review preview only.

The preview is backed by the clean Phase 50 final-hardening build from `progress/PROGRESS-STEP-467.md`. This pass changed only governance, checklist, and progress files, not runtime/source files.

## Verification

Initial preview probe passed:

- HTTP preview probe: `http://192.168.1.12:4173/` returned status `200`.
- Watched ports before final hygiene: `4173=busy`, `4174=clear`, `4175=clear`, `5173=clear`.

Final hygiene was pending when this report was first written and is recorded below after the final check pass.

## Final Hygiene

Passed:

- `git diff --check`
- CSV shape check: `rows=471`, `data_rows=470`, `columns=12`, `widths=[12]`, `last_id=469`.
- Non-printing/credential-value scan over changed tracked/untracked files plus ignored preview artifacts: `scanned_files=51`, `credential_value_hits=0`, `nonprinting_hits=0`, `binary_skipped=0`.
- Ignored-artifact check: `tracked_files=1167`, `staged_files=0`, `changed_files=21`, `forbidden_tracked=0`, `forbidden_staged=0`, `forbidden_changed=0`, `local_artifacts_ignored=21/21`.
- Preview probe: same-LAN URL returned `200`; loopback URL returned `000` after the prior loopback preview was stopped.
- Watched ports: `4173=busy` for the active same-LAN preview, `4174=clear`, `4175=clear`, `5173=clear`.
- `git status --short --branch`

## Stop Gate

Stop here for the Phase 50 Manual Review Window. The user should review the running same-LAN mobile preview against:

- `planning/phase-50/REVIEW-CHECKLIST.md`
- `planning/phase-50/CHANGELOG.md`
- `test-results/visual-review/phase-50-review-candidate/manifest.md`

If the ChatGPT/Codex mobile in-app browser still shows a blank or black screen, the user should try the phone's normal Chrome/browser with the same LAN URL before treating the app as failed.

After manual review, the next safe action is either:

- report directly Phase-50-related findings for same-phase Review Follow-up; or
- report manual review acceptance and explicitly authorize Git handoff/backup preparation as a separate protected action.

Git/GitHub backup, deployment, release, merge, next-phase implementation, external tunneling, and stable `brrrdle` repository work remain unexecuted.
