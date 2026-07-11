# Prompt Package Standard

**Status**: Active governance reference for Codex-generated prompt packages.
**Date**: 2026-06-13
**Authority**: Supporting governance under `CONSTITUTION.md`. Current explicit user instructions and `CONSTITUTION.md` remain higher authority.

## 1. Purpose

This document defines the default standard for prompt packages that Codex generates for the user.

Prompt packages are intended to:

- make authorization boundaries explicit;
- reduce ambiguity before high-impact work;
- preserve phase gates and review gates;
- keep repository, deployment, migration, and release actions separated;
- give future Codex runs a complete, copy-ready instruction block for the next safe step.

Prompt packages are recommendations only. A generated prompt package does not authorize work until the user sends it back or otherwise explicitly authorizes the work.

## 2. Authority

Prompt packages must follow this authority order:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. Approved phase specs and implementation plans.
5. `planning/governance/PROMPT-PACKAGE-STANDARD.md`.
6. Supporting files such as `agents.md`, `memory.md`, planning indexes, and progress reports.

If a prompt package would conflict with a higher-authority source, do not generate it as safe to use. Explain the conflict and state what must be resolved first.

## 3. Default Prompt Package Anatomy

Use this structure by default, adjusting only when the task is simpler, blocked, or governed by a more specific user instruction.

1. **Title**
   - State the exact task and target repository or system.

2. **Role and governance**
   - Name the Codex runtime if relevant.
   - Require adherence to `CONSTITUTION.md`, the current authority stack, and applicable repo governance.

3. **Target repository or target system**
   - Include the absolute local path when local work is involved.
   - State which repository is in scope.
   - State which repository or system is out of scope.

4. **Authorization**
   - State exactly what the prompt authorizes.
   - State exactly what it does not authorize.
   - Separate planning, implementation, verification, migration, deployment, PR, merge, release, commit, and push authority.

5. **Required reading**
   - List the governing documents and current progress artifacts needed for the task.
   - Include code or architecture surfaces only when implementation-oriented work requires them.

6. **Current situation**
   - Summarize relevant baseline state, blockers, prior progress id, branch state, or known dirty-worktree facts.

7. **Objectives and deliverables**
   - Define what must be produced.
   - Keep deliverables scoped to the authorized step.

8. **Execution instructions**
   - Give ordered steps when order matters.
   - Call out any stop conditions.
   - Prefer conservative defaults that match the existing codebase and governance.

9. **Verification**
   - List required commands or checks.
   - Say whether commands should be sequential or may be parallelized.
   - Define what to do if a command fails.

10. **Progress and documentation updates**
    - State which progress or planning files should be created or updated.
    - State whether a new progress id is expected.

11. **Resource, secrets, and artifact safety**
    - Forbid printing or committing secrets.
    - For browser/E2E work, require process, port, artifact, and cleanup checks.
    - For local dependency or generated-output work, call out ignored outputs and disk usage when relevant.

12. **Boundaries**
    - Repeat hard no-go actions in concrete terms.
    - Include repository split boundaries when relevant.

13. **Final report**
    - Require file links, verification results, changed files, blockers, open questions, and confirmation of protected actions not taken.
    - Require a clearly labeled `Ryan Action Items` section in the chat response. It must say `None` when the user has nothing to do manually. Otherwise it must identify the exact manual step, required evidence or inputs, sensitive information that must not be shared, and the copy-ready activation prompt or approval phrase when available.
    - Require a halt for review.

14. **Next prompt package**
    - When the step is complete, require Codex to provide the recommended next prompt package unless an exception in Section 5 applies.

## 4. Prompt Type Variants

### 4.1 Planning Or Specification Work

Emphasize:

- planning/documentation-only authorization;
- source documents to reconcile;
- no source/runtime edits;
- required spec or plan contents;
- open decisions and deferrals;
- lightweight markdown verification.
- whether the phase should remain narrow or use the macro-phase guidance in `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.

### 4.2 Implementation Work

Emphasize:

- exact stage or bug scope;
- high-conflict files and sequencing;
- tests to add before or alongside changes;
- final verification gate;
- progress and changelog expectations;
- explicit halt at each stage gate.
- larger phase payloads do not imply broader implementation-stage authority; stages should remain single-purpose unless the prompt explicitly says otherwise.

### 4.3 Verification Or Baseline Work

Emphasize:

- current branch, remote, dirty-worktree, and resource baseline;
- exact command list and sequential execution;
- failure-stop rules;
- no implementation unless separately authorized;
- progress artifact updates.

### 4.4 Dependency Or Bootstrap Work

Emphasize:

- package-manager evidence;
- lockfile-preserving install flow;
- disk-space checks;
- no global installs unless justified;
- whether lockfiles changed;
- ignored dependency/build outputs.

### 4.5 Debugging Or Bugfix Work

Emphasize:

- reproduce-first discipline;
- smallest targeted fix;
- focused regression tests;
- preservation of known invariants;
- real E2E when multiplayer or integration claims are affected.

### 4.6 Migration, Deployment, PR, Merge, Or Release Work

Emphasize:

- separate explicit authorization for each protected action;
- preflight checks;
- rollback or stop conditions;
- secrets and environment handling;
- post-action verification;
- no implicit production or merge authority.

### 4.7 Custom Codex Skill Creation Or Update Work

Emphasize:

- local skill path and whether it is inside or outside the repository;
- `skill-creator` guidance;
- concise `SKILL.md` body and strong frontmatter description;
- no secrets or credentials in the skill;
- validation with the bundled skill validator;
- whether the skill is authoritative or only a convenience helper.

### 4.8 Visual Handoff Review Work

Emphasize:

- local-only screenshot artifacts for human review after automated verification;
- no source/runtime fixes unless separately authorized;
- Playwright assertions before screenshots so screenshots illustrate verified state;
- ignored artifact paths such as `test-results/visual-review/<phase-or-stage>/`;
- manifest output with scenario, viewport, assertion, screenshot path, and concerns;
- absolute Markdown image links in the final report for Codex chat review;
- no staging or committing screenshots, videos, traces, auth state, secrets, tokens, or local session artifacts;
- stop-and-report behavior when a visual state cannot be captured or appears wrong.

### 4.9 Manual Phase Review Checklist Work

Emphasize:

- a committed human-review checklist at `planning/phase-<N>/REVIEW-CHECKLIST.md`;
- generation after final automated verification and any visual handoff review, as part of a Review Candidate before Review Candidate Backup or before starting the next phase;
- user-testable checkboxes with expected behavior, suggested manual steps, and evidence references;
- clear separation between required manual checks, optional nice-to-check items, preserved invariants, known deferred work, and out-of-scope work;
- a reminder that manual checklists are not replacements for automated tests, real multiplayer E2E, migration probes, or visual handoff review;
- no screenshots, videos, traces, auth state, tokens, secrets, private data, or local session artifacts in committed checklist content;
- stop-and-report behavior when phase evidence is too incomplete or contradictory to produce a trustworthy checklist.

### 4.10 Review Candidate Backup Loop, Manual Review Window, And Review Follow-Up Work

Emphasize:

- final hardening produces a Review Candidate, not automatic phase closure or final acceptance;
- the Review Candidate closeout should include verification evidence, interactive local/Codex-browser preview instructions when applicable, ignored visual artifact paths, the manual checklist, known limitations, and a halt for user inspection;
- when the user wants device/live-site review, the next prompt may authorize a Review Candidate Backup through the governed GitHub backup workflow while keeping the phase open;
- Review Candidate Backup is a protected Git/GitHub action requiring explicit current-turn authorization, exact staging allowlist, preflight checks, PR/check verification, merge safety checks, and artifact/secret boundaries;
- Review Candidate Backup may make the candidate visible through existing GitHub-backed hosting or automatic host behavior if already configured; it must not run separate deployment, release, migration, or production-configuration commands unless a later prompt explicitly authorizes them;
- the Manual Review Window happens after the Review Candidate is available through the chosen review surface and before final phase acceptance, final closure backup, release, deployment configuration, or next-phase implementation;
- screenshots, visual manifests, and generated artifacts are supporting evidence only; for user-visible gameplay, navigation, account, shell, layout, or interaction changes, they should not be treated as a replacement for interactive manual review when local preview is feasible;
- the default same-machine interactive preview path is `npm run preview -- --host 127.0.0.1 --port 4173` after a clean build; use `npm run dev -- --host 127.0.0.1 --port 5173` only when development-server behavior is specifically needed;
- local preview servers must bind to `127.0.0.1` unless the user explicitly authorizes another host, and the final report should include the exact URL plus how to stop the server;
- mobile manual review from Android/iOS normally cannot use `http://127.0.0.1:4173/`, because that address points to the phone/tablet rather than the Mac running the preview server;
- when the user explicitly authorizes Mobile Manual Preview, the prompt may ask Codex to bind the preview to the Mac's active private LAN IPv4 address, for example `npm run preview -- --host <mac-lan-ip> --port 4173`, and report the exact trusted same-LAN URL;
- Mobile Manual Preview must bind to a specific private LAN IP, not `0.0.0.0`, unless a later prompt explicitly authorizes a broader host binding;
- if same-LAN mobile preview fails or the ChatGPT/Codex mobile in-app browser blocks the page, Codex should stop and recommend a separately authorized external preview/tunnel prompt instead of creating a public tunnel automatically;
- preview logs, PIDs, screenshots, videos, traces, auth state, tokens, and local session artifacts must remain ignored/local-only;
- starting or reporting a local or same-LAN preview does not authorize public tunneling, Git/GitHub actions, GitHub backup, PR work, merge, release, deployment, production changes, next-phase implementation, or stable `brrrdle` repository work;
- local, Codex-browser, and same-LAN previews are supporting options, not prerequisites for Review Candidate Backup; if they are not usable, Codex should clean up any server it started and route to the Review Candidate Backup Loop rather than creating a public tunnel automatically;
- directly phase-related manual-review findings may be handled through a same-phase Review Follow-up prompt when the current user explicitly authorizes that follow-up;
- Review Follow-up work must be narrow, use the phase's existing source/test/privacy boundaries, rerun focused verification plus affected final-hardening checks, update progress, and return to Review Candidate;
- review feedback must be routed to a new phase, later-phase note, or explicit addendum when it is unrelated, broad, feature-like, risky, protected-action-dependent, or requires new migration/RLS, storage, deployment/configuration, release, scoring/rating/Elo, gameplay-rule, or stable-repository authority;
- after a Review Follow-up, the phase returns to Review Candidate and may receive another explicitly authorized Review Candidate Backup for another Manual Review Window;
- after the user accepts manual review, final phase closure and any Final Acceptance Backup still require separate explicit current-turn authorization.

### 4.11 GitHub Backup Skill Work

Emphasize:

- all-in-one backup authorization must be explicit in the current prompt;
- the target repository must be confirmed as `brrrdle-dev`, with the original stable `brrrdle` repository out of scope;
- GitHub backup means GitHub `main` becomes tree-equivalent to the backed-up local branch after PR merge, not necessarily commit-hash identical after squash merge;
- Review Candidate Backup prompts are allowed before final manual review acceptance when they explicitly state that the backup is for live/device review and does not close the phase;
- after a clean `brrrdle-dev` Review Candidate or Git handoff preparation pass, the recommended next prompt should default to explicitly invoking the local `brrrdle-github-backup` skill for the full governed backup workflow when the user is ready for backup;
- the all-in-one backup prompt should preserve the exact approved staging allowlist, branch name, commit and PR copy, verification evidence, scope boundaries, and forbidden artifact list from handoff preparation;
- use the older stepwise Git prompt sequence only when the user explicitly requests separate gates, forbids merge or branch cleanup, leaves unresolved review prerequisites, or the handoff preparation reports a blocker;
- preflight, staging, commit, push, draft PR, ready/merge, post-merge sanity, and branch cleanup are protected actions that must be named in the authorization;
- local Codex skills under `/Users/noir/.codex/skills/` remain local-only and must not be committed;
- secret/artifact scans, ignored-artifact checks, visible PR checks, PR metadata checks, and tree-equivalence checks are required stop gates;
- never force-push `main`, bypass visible check failures, present a Review Candidate Backup as phase closure, begin a final acceptance backup while manual review is pending, or delete a branch whose merge safety cannot be proven.

### 4.12 Phase Scope Sizing Work

Emphasize:

- phase-level batching is allowed only for cohesive work with shared product area, data contracts, test harnesses, privacy/RLS boundaries, or UI ownership;
- implementation stages should remain narrow, single-purpose, and independently reviewable;
- phase closeout should route through Review Candidate, explicitly authorized Review Candidate Backup when hosted/live review is needed, Manual Review Window, Review Follow-up if needed, accepted manual review, and separately authorized Final Acceptance Backup or closure;
- migration/RLS, deployment/configuration, Git/GitHub, release, gameplay-rule, and Elo changes remain separately authorized protected actions;
- focused tests should run during implementation stages, while full final verification stays at the final hardening or pre-handoff gate for major phases;
- documentation-only scope-sizing passes should use lightweight verification and should not create the next phase planning brief unless explicitly authorized.

## 5. Next Prompt Package Rule

At meaningful review gates, Codex should include one of the following in the final report:

- the recommended next prompt package for the next safe gated action;
- a concise explanation that no prompt package should be generated yet.

Every meaningful final report must also include a short **Recommended Next Step** explanation in plain language before any activation prompt or footer. This applies even when verification fails. The explanation should tell the user what Codex recommends doing next, why that is the safest move, and whether the next action is agent-owned or requires a human decision.

For `brrrdle-dev`, the preferred default is artifact-first:

- write the full prompt package as a Markdown artifact under the ignored local-only `prompt-packages/` directory;
- include only a short activation prompt in chat, pointing to the exact artifact path;
- put that activation prompt in a fenced `markdown` code block every time a prompt-package artifact is created or updated;
- use inline full prompt-package code blocks only when the user explicitly asks for inline output or artifact creation is impossible;
- keep prompt-package artifacts out of Git unless a later prompt explicitly authorizes committing them;
- when a new Codex chat/session handoff is useful, create a separate handoff artifact under `prompt-packages/handoffs/` and make the activation prompt name both the handoff artifact and the next prompt-package artifact.

The activation prompt should be minimal but sufficient:

- target the exact repository path;
- repeat the stable-repository boundary when relevant;
- name the handoff artifact first when one is required;
- name the prompt-package artifact to read and execute;
- include a stop-and-report condition for missing files, conflicts, stable-repository touches, or scope expansion.

Example activation prompt shape:

````markdown
```markdown
Use `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`. Do not touch the original stable `brrrdle` repository.

Read:
`/Users/noir/visual_studio/Codex_Projects/brrrdle-dev/prompt-packages/handoffs/HANDOFF.md`

Then read and execute:
`/Users/noir/visual_studio/Codex_Projects/brrrdle-dev/prompt-packages/phase-XX/NEXT-PROMPT.md`

Stop and report if anything is missing, conflicts with current instructions, would touch stable `brrrdle`, or would authorize work beyond the prompt artifact.
```
````

If a final report has a required footer, such as a memory citation block, put the activation prompt code block immediately before that footer.

- target `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`;
- keep the original stable `brrrdle` repository untouched;
- read the exact handoff and prompt artifact paths;
- execute only the authorized prompt artifact;
- stop if an artifact is missing, conflicts with current instructions, or would cross a protected boundary.

When a verification gate fails, do not proceed into phase closure, manual review, Git handoff, backup, deployment, or the next phase. Still provide the user with a concrete recovery recommendation. If the failure can be addressed by a bounded, agent-owned rerun, triage, or same-stage repair without crossing protected boundaries, generate a recovery prompt package for that bounded next action. If the failure requires a human decision, credentials, production access, a migration/RLS/storage contract, Git/GitHub action, deployment/release action, broad redesign, gameplay-rule/scoring/Elo change, or stable-repository access, do not generate an execution prompt; instead state the exact prerequisite.

Do not generate a next prompt package when:

- the current user explicitly asks not to;
- the next step is blocked by a failed verification gate and no bounded recovery prompt can safely address it;
- a human review or manual decision is required first;
- the next step would require secrets, credentials, deployment, migration, PR, merge, release, or production access that has not been explicitly authorized;
- the next step is unclear or would require choosing between materially different strategies without user input;
- generating a prompt would be misleading because the worktree or governance state is inconsistent.

Generated next prompts should be emitted as one copyable markdown/text block whenever practical.

Copy-safe rendering rules:

- Do not split required prompt-package content across multiple code blocks unless the user explicitly asks for that.
- Do not place required copyable prompt content outside the main prompt block.
- Do not wrap a prompt package in a triple-backtick outer block if the prompt itself contains inner triple-backtick fences.
- If inner fenced code blocks are necessary, use an outer fence longer than any inner fence, such as four backticks or more.
- Prefer avoiding inner fenced code blocks inside generated prompt packages when inline commands, bullet lists, or plain indented command lists are sufficient.
- If the user specifically asks for "one big markdown code block", put all prompt-package content inside that block and avoid after-block commentary.

## 6. Authorization Status Language

For each generated prompt package, Codex must state one authorization status:

- **Safe/authorized to use now**: the prompt only asks for work the user has already approved or is allowed to approve next without additional manual prerequisites.
- **Safe after review**: the user should review the completed work or prompt content first, then may use it if satisfied.
- **Not authorized until manual prerequisite is done**: a specific human action, credential setup, repo action, or decision is required first.
- **Blocked pending issue resolution**: verification, conflict, missing access, or unsafe state blocks the prompt from being used.

If not safe to use now, explain exactly what the user must do to make it safe.

Authorization status may be placed immediately before the copyable block, or included inside the copyable block under a clearly labeled `Use Note` or `Authorization Status` section. When mobile copyability matters, prefer placing authorization status before the block or inside it rather than after it.

## 7. Safety Rules

Prompt packages must not ask Codex to:

- print, inspect, or commit secrets;
- commit `.env.local`, tokens, Supabase keys, Vercel tokens, session artifacts, screenshots, videos, traces, or auth state;
- delete files or branches without explicit authorization;
- force-push without explicit authorization;
- modify production deployment without explicit authorization;
- touch the original stable `brrrdle` repository when the target is `brrrdle-dev`;
- bypass required progress, verification, or review gates.

For work that may use subagents, the prompt must preserve coordinator review and file ownership rules.

For heavy browser or E2E work, the prompt should require conservative resource behavior, final process checks, and artifact cleanup.

## 8. Flexibility

This standard is a default, not a rigid form. Codex may shorten, expand, reorder, or omit sections when:

- the current user instruction requires it;
- a task is simple and a full package would add noise;
- a higher-authority document gives a stricter format;
- the task is blocked and only a blocker report is appropriate;
- a safety or privacy concern requires a narrower prompt.

When deviating from the default structure for a meaningful gated step, Codex should briefly state why.

## 9. Local Codex Skills

Local Codex skills may help generate prompt packages, but they are convenience helpers only.

The repository governance remains authoritative. If a local skill conflicts with `CONSTITUTION.md`, this prompt-package standard, the active phase spec, or the current user prompt, follow the higher-authority repo/user source and report the conflict.

Local skills must not store secrets, credentials, project tokens, private account data, or deployment access details.

Repo-tracked documentation for brrrdle-specific local skills lives under `planning/skills/` when present. That documentation is descriptive; it does not make local skills authoritative or self-authorizing.

## 10. Minimum Prompt Package Template

````md
# Codex Task: <Exact Task Title>

You are GPT-5.5 (Extra High) running in Codex on my Mac. Please follow the project `CONSTITUTION.md`, the current authority stack, and all applicable repository governance.

## Target

Use:

`<absolute path or target system>`

## Authorization

I authorize:

- <authorized action>

I do not authorize:

- <protected action>

## Required Reading

- <governing docs>

## Objective

<what to accomplish>

## Instructions

1. <step>
2. <step>

## Verification

Run these commands, sequentially:

- `<command one>`
- `<command two>`

If verification fails, stop, record the exact failure, and do not proceed beyond the authorized scope.

## Boundaries

Do not:

- <hard boundary>

## Final Report

Report:

- changed files
- verification results
- blockers or open questions
- confirmation of protected actions not taken
- recommended next prompt package or reason not to generate one

## Ryan Action Items

State `None` if the user has no manual action. Otherwise state exactly what the user must do, whether evidence or private input is needed, what must not be shared, and include the copy-ready activation prompt or precise approval phrase when available.

Then halt for review.
````

Use the template as a starting point, then tailor it to the actual task.
