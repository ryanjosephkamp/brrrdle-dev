# brrrdle GitHub Backup Skill

**Local skill path**: `/Users/noir/.codex/skills/brrrdle-github-backup/`
**Status**: Local-only workflow helper.
**Repository**: `brrrdle-dev`.

## Purpose

The `brrrdle-github-backup` skill packages the end-to-end GitHub backup workflow for `brrrdle-dev`: preflight, branch, stage, commit, push, draft PR, ready/merge, local `main` update, post-merge sanity, and safe branch cleanup.

The skill exists to streamline a workflow the user may explicitly authorize as one autonomous operation. It is not a standing authorization to modify GitHub.

## Invocation Contract

The skill may run the full backup workflow only when the current user prompt explicitly invokes the skill for `brrrdle-dev` and authorizes the GitHub backup actions.

After a clean `brrrdle-dev` Git handoff preparation pass, generated next prompt packages should normally invoke this skill for the all-in-one governed backup workflow when the user is ready for backup. The generated prompt should carry forward the approved file allowlist, branch name, commit and PR copy, verification evidence, scope boundaries, and forbidden artifact list from handoff preparation.

The older stepwise Git prompt sequence remains appropriate when the user explicitly asks for separate gates, forbids merge or branch cleanup, leaves unresolved review prerequisites, or the handoff preparation reports a blocker.

The skill must not run Git operations when the user only asks:

- what the workflow does;
- for a prompt package;
- to create, review, or update the skill;
- for planning-only or documentation-only work.

Current user instructions, `CONSTITUTION.md`, approved phase docs, and progress gates remain higher authority than the skill.

## Backup Equality Model

For squash merges, the branch commit hash and GitHub `main` merge commit hash normally differ. The skill treats the backup as successful when GitHub `main` is tree-equivalent to the backed-up local branch and PR metadata confirms the merge.

The skill must never force-push `main`.

## Workflow Summary

1. Confirm the target repository is `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
2. Confirm the original stable `brrrdle` repository is not being used.
3. Confirm branch, remotes, `HEAD`, and `origin/main`.
4. When invoked from a clean handoff-prep packet, verify the approved file allowlist still matches the current changed repository files.
5. Classify changed, staged, untracked, and ignored files.
6. Run preflight checks appropriate to the changed surfaces.
7. Reject secrets, auth state, screenshots, videos, traces, build outputs, dependency folders, local session artifacts, and other forbidden artifacts.
8. Create a dedicated `codex/` backup branch.
9. Stage only approved repository files.
10. Verify staged files and whitespace.
11. Commit once with clear verification and boundary notes.
12. Push the branch to `origin`.
13. Create a draft PR targeting `main`.
14. Verify PR metadata and visible checks.
15. Mark ready and squash-merge only when the invocation authorizes it and preflight is clean.
16. Fetch and fast-forward local `main` to `origin/main`.
17. Confirm the merge on local and remote `main`.
18. Run post-merge sanity checks.
19. Use PR metadata plus tree equivalence before deleting local or remote branches.
20. Report hashes, PR URL, verification, branch cleanup, and boundaries.

## Stop Conditions

Stop and report without continuing if:

- the target repository is ambiguous;
- the stable `brrrdle` repository would be touched;
- files cannot be safely classified;
- a real credential-like secret or forbidden artifact is found;
- ignored artifacts are staged or tracked;
- verification fails;
- a branch already exists and cannot be safely reused;
- `origin/main` moved unexpectedly;
- PR metadata does not match the intended base, branch, or commit;
- visible checks fail or remain inconclusive beyond a bounded wait;
- the PR merge state is not clean;
- GitHub CLI authentication fails;
- branch cleanup cannot be proven safe by PR metadata plus tree equivalence.

## Verification Expectations

The minimum backup verification set is:

- `git diff --check`;
- progress CSV shape check with `python3 -S` when progress files exist;
- non-printing secret/artifact scan over changed files;
- ignored-artifact check;
- staged-list and `git diff --cached --check` before commit;
- PR metadata and visible check verification before merge;
- post-merge `main` hash/tree verification;
- safe branch cleanup verification after merge.

For source/runtime, tests, migrations, Supabase, browser, or E2E changes, the skill must run the appropriate stronger project gate before backup.

## Relationship To Governance

This skill is a convenience helper. It does not replace user approval, repository governance, progress records, automated tests, visual handoff review, or manual review checklists.

If the current prompt authorizes less than the full backup workflow, the skill must obey the narrower prompt.
