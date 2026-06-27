# brrrdle Local Codex Skills

**Status**: Repo-tracked documentation for local Codex workflow helpers.
**Authority**: Supporting documentation only. Current user instructions, `CONSTITUTION.md`, approved phase docs, and progress gates remain higher authority.

## Purpose

This directory documents brrrdle-specific Codex skills that live outside the repository under `/Users/noir/.codex/skills/`.

The actual local skill files are intentionally not committed. They may help Codex run repeatable workflows, but they do not replace repository governance, automated verification, user review gates, or explicit authorization.

## Local Skills

- `brrrdle-prompt-packages`: generates governed next-step prompt packages for the brrrdle workflow.
- `brrrdle-visual-review-gate`: runs local-only screenshot review gates after automated verification.
- `brrrdle-phase-review-checklist`: generates committed manual phase review checklists.
- `brrrdle-github-backup`: runs the explicitly authorized all-in-one GitHub backup workflow for `brrrdle-dev`.

## Rules

- Do not commit anything under `/Users/noir/.codex/skills/`.
- Do not store secrets, credentials, auth state, tokens, private data, screenshots, videos, traces, or local session artifacts in skill docs.
- If a skill conflicts with current user instructions or repository governance, follow the higher-authority source and report the conflict.
- Skills that perform protected actions must require explicit current-prompt authorization before they act.
- After a clean Git handoff preparation pass, generated backup prompts should normally invoke `brrrdle-github-backup` for the all-in-one governed backup workflow unless the user requests stepwise gates or forbids merge/cleanup.
