# Progress Step 149 - Copy-Safe Prompt Package Formatting Fix

**Date**: 2026-06-13
**Phase**: Governance - Prompt Package Formatting
**Status**: Completed - Awaiting User Review Before Stage 24.1
**Branch**: `main`
**Repository**: `https://github.com/ryanjosephkamp/brrrdle-dev`

## Authorization

The user explicitly authorized a governance/documentation-only update to fix copy-safe formatting rules for generated prompt packages.

The user also explicitly authorized updating the existing local custom Codex skill:

`/Users/noir/.codex/skills/brrrdle-prompt-packages`

This authorization did not allow Phase 24.1 runtime/source implementation, Supabase migrations, Vercel configuration, production deployment, commits, pushes, pull request creation, merges, releases, branch deletion, new custom skills, or work against the original stable `brrrdle` repository.

## Required Reading

This pass reviewed the requested repository governance and planning files:

- `CONSTITUTION.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `planning/README.md`
- `planning/phase-24/IMPLEMENTATION-PLAN.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-148.md`
- `agents.md`
- `memory.md`

It also reviewed the existing local prompt-package skill and skill-creator guidance:

- `/Users/noir/.codex/skills/brrrdle-prompt-packages/SKILL.md`
- `/Users/noir/.codex/skills/brrrdle-prompt-packages/agents/openai.yaml`
- `/Users/noir/.codex/skills/.system/skill-creator/SKILL.md`

## Changes Made

Updated:

- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `/Users/noir/.codex/skills/brrrdle-prompt-packages/SKILL.md`
- `memory.md`
- `progress/PROGRESS.csv`

Created:

- `progress/PROGRESS-STEP-149.md`

## Copy-Safe Formatting Rule

The prompt-package standard now explicitly requires generated prompt packages to be emitted as one copyable markdown/text block whenever practical.

The standard now warns against wrapping prompt packages in a triple-backtick outer block when the prompt contains inner triple-backtick fences. It recommends either avoiding inner fenced code blocks or using an outer fence longer than any inner fence.

The authorization-status rule now allows status to appear immediately before the copyable block or inside the block under a labeled section, instead of requiring status after the block.

The minimum prompt template now lists verification commands as bullets instead of demonstrating an inner fenced command block.

## Local Skill Update

The local `brrrdle-prompt-packages` skill now tells future Codex runs to:

- generate one copy-safe prompt block by default;
- avoid nested triple-backtick fence collisions;
- use an outer fence longer than inner fences when nested fences are unavoidable;
- prefer inline commands or bullet lists over inner fenced command blocks;
- keep all required copyable prompt content inside the main block;
- place authorization status before the block or inside it when mobile copyability matters.

## Verification

Skill validation:

- `python3 /Users/noir/.codex/skills/.system/skill-creator/scripts/quick_validate.py /Users/noir/.codex/skills/brrrdle-prompt-packages`

Documentation and ledger verification:

- `git diff --check`
- `git status --short --branch`
- progress CSV shape check for 12 columns per row

Result: completed successfully. See the final chat report for exact command results.

## Scope Confirmation

As of this governance pass:

- No source/runtime application code was modified.
- No Phase 24.1 implementation began.
- No Supabase migration was run.
- No Vercel configuration or deployment was changed.
- No commit, push, PR, merge, release, or branch deletion was performed.
- No original stable `brrrdle` repository work was performed.
- No new custom Codex skill was created.
- No secrets, credentials, project tokens, Supabase keys, Vercel tokens, `.env.local`, local session artifacts, screenshots, videos, traces, or auth state were added.

## Next Gate

Review this formatting governance update. If accepted, the next safe project step remains explicit Stage 24.1 authorization for the Phase 24 Navigation Shell And Route Model.
