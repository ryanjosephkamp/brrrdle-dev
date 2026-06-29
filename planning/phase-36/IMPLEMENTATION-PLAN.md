# Phase 36 Implementation Plan: Leaderboard, Stats, Active Games, And Settings

**Status:** Detailed implementation plan for review.
**Phase:** Phase 36.
**Repository:** `brrrdle-dev` only.
**Created:** 2026-06-28.
**Baseline:** `main` and `origin/main` expected at `cce41908a0a760086e9b5bf0da6009bdbb866667`.

## Authority

This plan follows the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, the Phase 36 planning brief, the unified Phase 36 specification, completed Phase 35 evidence, and the progress ledger.

This is a planning artifact only. It does not authorize Stage 36.0, source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

## Current Baseline

- Phase 35 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Phase 36 planning brief and unified specification are present locally.
- Expected local and remote `main`: `cce41908a0a760086e9b5bf0da6009bdbb866667`.
- User edits to `planning/phase-35/REVIEW-CHECKLIST.md` must be preserved.
- Existing Phase 36 planning/progress artifacts must be preserved while Stage 36 execution remains gated.

## Execution Principles

- Sequence high-conflict UI, route, account, multiplayer, and progress surfaces. Do not parallelize writers across `src/app/`, `src/multiplayer/`, `src/account/`, `src/stats/`, or `src/leaderboards/` without an explicit integration plan.
- Prefer source-only repairs first. Stop for a migration/RLS addendum only if existing safe identity seams cannot support Active Games names.
- Keep public leaderboard and rating display surfaces non-authoritative. Do not change Elo math, rating storage, settlement, scoring, gameplay rules, timeout, or forfeit logic.
- Keep implementation changes small and test-backed by stage.
- Run focused tests before full gates, and stop on the first non-secret failure that changes the stage safety decision.
- Keep screenshots, videos, traces, auth state, tokens, and local visual artifacts ignored/local-only.

## Success Criteria

Phase 36 succeeds when all of the following are true:

- The primary navigation includes `Leaderboard` between `Stats` and `Words`.
- Stats no longer renders public ranked leaderboard or competitive multiplayer rating content.
- Leaderboard renders public ranked leaderboard and Multiplayer Ratings / competitive multiplayer rating content.
- Public ranked leaderboard remains display-only, privacy-safe, non-authoritative, and limited to approved untimed ranked Practice OG/GO buckets.
- Active Games rows prefer safe public/profile names for creator and joined-player perspectives when safe identity data exists.
- Generic Active Games labels appear only when safe identity is genuinely unavailable.
- Signed-in password-update failures no longer mention reset links.
- Settings renders current sections in this order: Gameplay, Sound effects, Notifications, Account management.
- Settings consolidates signed-in account status/sign-out/password/email-gate content into Account management if the audit confirms it is cleaner and truthful.
- Phase 35 Profile tab and Live identity repairs remain intact.
- Phase 34 Live/Lobby/notification/Active Games turn-cue behavior remains intact except for the approved Active Games safe-name repair.
- Phase 33 timed ranked Practice behavior remains intact.
- Daily Multiplayer integrity, gameplay rules, and Elo math remain unchanged.

## Stage Breakdown

### Stage 36.0 - Protected Baseline

**Purpose:** confirm the approved implementation plan, record current uncommitted planning/spec/progress artifacts, and prove the baseline is healthy before implementation.

**Deliverables:**

- Confirm `pwd`, branch, `git status --short --branch`, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Preserve the user-edited `planning/phase-35/REVIEW-CHECKLIST.md`.
- Record existing uncommitted Phase 36 planning/spec/progress artifacts.
- Create the Stage 36.0 progress report and matching 12-column CSV row.
- Run watched-port/process/resource checks before and after verification for `5173`, `5174`, `3000`, and `4173`.
- Run the Stage 36.0 baseline verification gate.

**Likely files:**

- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-295.md`

**Verification:**

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port/process cleanup check
- `git status --short --branch`

**Exit gate:** baseline passes, progress is recorded, no implementation has begun, and the next prompt is Stage 36.1 audit only.

### Stage 36.1 - Route, Identity, Settings, And Copy Audit

**Purpose:** lock implementation scope and confirm whether Active Games safe names can be repaired source-only.

**Deliverables:**

- Audit route/navigation ownership in `src/app/routes.ts`, `src/app/App.tsx`, `src/app/LunarSignalStage.tsx`, and route tests.
- Audit Stats/Leaderboard component ownership in `src/stats/`, `src/leaderboards/`, and `src/multiplayer/MultiplayerStatsPanel.tsx`.
- Audit Active Games identity inputs in `src/multiplayer/MultiplayerWorkspace.tsx`, `src/multiplayer/multiplayerViewModels.ts`, `src/multiplayer/MultiplayerActiveGames.tsx`, and relevant tests.
- Audit password-update error classification in `src/account/auth.ts`, `src/account/PasswordResetModal.tsx`, `src/app/App.tsx`, and account tests.
- Audit Settings current order/consolidation options in `src/account/Settings.tsx` and tests.
- Decide whether Stage 36.2 is source-only repair or migration/RLS addendum planning.
- Create the Stage 36.1 progress report and matching CSV row.

**Verification:** focused read-only checks as needed, then documentation hygiene checks: `git diff --check`, CSV shape, secret/artifact scan, ignored-artifact check, watched-port cleanup, and `git status --short --branch`.

**Exit gate:** a documented source-only/addendum decision for Active Games safe names, with no source/runtime implementation.

### Stage 36.2 - Active Games Safe-Name Repair Or Addendum Gate

**Preferred source-only path:**

- Reuse existing participant identity summaries and safe profile maps already fetched by `MultiplayerWorkspace`.
- Thread `participantProfilesByGameId` into Active Games row selection without broadening identity exposure.
- Ensure creator and joined-player perspectives both prefer safe rival names.
- Ensure `You` appears only for the viewer's own participant context.
- Ensure `Rival`, `Player one`, and `Player two` remain true fallbacks only.
- Add focused view-model/component tests for creator, joined-player, fallback, stale data, and forbidden raw identity fields.

**Addendum gate path:**

- If existing safe data is not available, stop before source repair.
- Create a migration/RLS addendum that defines a minimal safe identity contract.
- Do not create or run SQL in this stage unless a later prompt explicitly authorizes migration execution.

**Likely files if source-only:**

- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerViewModels.test.ts`
- `src/multiplayer/MultiplayerActiveGames.test.tsx`
- possibly `src/multiplayer/MultiplayerWorkspace.test.tsx`
- `progress/PROGRESS.csv`
- next progress report

**Verification:** focused Active Games identity tests first, then `npm run lint`, `npm run test`, `npm run build`, API typecheck, diff/CSV/secret/artifact/ignored checks, watched-port cleanup, and git status.

**Exit gate:** Active Games safe-name behavior is repaired or an addendum is created and implementation stops for review.

### Stage 36.3 - Leaderboard Route And Stats Split

**Purpose:** add the first-class Leaderboard tab and move public/competitive rating content out of Stats.

**Deliverables:**

- Add a `leaderboard` route id or approved equivalent.
- Add the primary navigation item between `stats` and `word-explorer`.
- Choose a distinct route tone and verify readability.
- Add a route-level Leaderboard component under `src/leaderboards/` or another clear route module.
- Move `PublicRankedLeaderboardPanel` and `MultiplayerStatsPanel` from Stats to Leaderboard.
- Leave local/personal stats in Stats.
- Preserve public leaderboard bucket restrictions and non-authoritative rating display behavior.
- Add focused route/navigation, Stats, Leaderboard, public leaderboard, and MultiplayerStatsPanel tests.

**Likely files:**

- `src/app/routes.ts`
- `src/app/routes.test.ts`
- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/stats/StatsDashboard.test.tsx`
- `src/leaderboards/index.ts`
- `src/leaderboards/LeaderboardPanel.tsx`
- `src/leaderboards/LeaderboardPanel.test.tsx`
- `src/leaderboards/PublicRankedLeaderboardPanel.test.tsx`
- `src/multiplayer/MultiplayerStatsPanel.test.tsx`
- E2E route/navigation surfaces where feasible
- progress report and CSV row

**Verification:** focused route/navigation and moved-content tests first, then full standard gate for the stage.

**Exit gate:** Leaderboard and Stats split is implemented without duplicated content, hidden local stats, public timed leaderboards, or rating/Elo changes.

### Stage 36.4 - Settings And Password Copy Cleanup

**Purpose:** polish Settings and the signed-in password-update failure path.

**Deliverables:**

- Add update-password-specific error classification or status copy.
- Avoid reset-link wording in the signed-in password-update path.
- Use same-current-password/no-op copy only if the provider error can be classified reliably.
- Change `Sound Effects` to `Sound effects`.
- Reorder Settings sections to Gameplay, Sound effects, Notifications, Account management.
- Consolidate signed-in email/sign-out/password/email-gate content into Account management if the Stage 36.1 audit confirms the consolidation is cleaner.
- Preserve Profile tab ownership of full profile editing.
- Preserve email-change configuration gate and destructive-action confirmation boundaries.
- Add focused auth/settings tests for signed-in, anonymous, unconfigured, and error states.

**Likely files:**

- `src/account/auth.ts`
- `src/account/auth.test.ts`
- `src/account/authHelpers.test.ts`
- `src/account/PasswordResetModal.tsx`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`
- possibly `src/app/App.tsx`
- progress report and CSV row

**Verification:** focused auth/settings tests first, then full standard gate for the stage.

**Exit gate:** password-copy and Settings cleanup pass focused and full verification with Phase 35 Profile behavior preserved.

### Stage 36.5 - Final Hardening, E2E, Visual Review, Manual Checklist

**Purpose:** complete Phase 36, verify user-visible flows, and prepare review artifacts.

**Deliverables:**

- Review Stages 36.1 through 36.4 for stale copy, duplicated rendering, privacy gaps, navigation crowding, and docs/progress gaps.
- Add only narrow final-hardening fixes if required.
- Run feasible focused regression/E2E coverage for:
  - Leaderboard navigation and tab placement;
  - Stats local-only content;
  - Leaderboard public ranked leaderboard and Multiplayer Ratings content;
  - Active Games safe names from creator and joined-player perspectives;
  - password-update failure copy;
  - Settings order and account consolidation.
- Run the visual handoff review gate, saving artifacts only under ignored `test-results/visual-review/phase-36-stage-36-5/`.
- Create `planning/phase-36/CHANGELOG.md`.
- Create `planning/phase-36/REVIEW-CHECKLIST.md`.
- Run final verification.

**Verification:**

- Focused tests for touched files.
- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run test:full`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port/process cleanup checks for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

**Exit gate:** Phase 36 appears complete, changelog and manual checklist exist, visual artifacts remain ignored/local-only, and the next prompt is Git handoff preparation.

## Dependencies And Sequencing

- Stage 36.1 must precede any implementation because it decides whether Active Games safe names can stay source-only.
- Stage 36.2 should land before or separately from the Leaderboard route split so identity repair risk does not mix with route/navigation churn.
- Stage 36.3 should precede Stage 36.4 unless the audit finds password-copy cleanup is safer to do first; both are source-only but touch different ownership surfaces.
- Stage 36.5 must be last because it creates the changelog, checklist, final evidence, and visual artifacts.

## Migration And RLS Gates

No migration is expected for the recommended Phase 36 path.

Stage 36.2 must stop for migration/RLS addendum planning if any of these are true:

- Active Games cannot receive safe rival names from existing participant identity summaries.
- The source-only path would require broadening authenticated spectator/public projection boundaries.
- The source-only path would expose raw auth IDs, emails, private profile fields, answers, seeds, serialized sessions, player sessions, queue internals, rating internals, tokens, or local artifacts.
- The repair needs new SQL/RPC grants, RLS changes, or remote data semantics.

Any addendum must remain planning-only until a later prompt explicitly authorizes migration execution.

## Vercel, Supabase, And Deployment Constraints

- Do not change Vercel or Supabase dashboard settings.
- Do not deploy or release.
- Do not create new environment variables.
- Do not print or commit Supabase keys, Vercel tokens, auth state, private account data, or local session artifacts.
- Existing Phase 35 deployment/Supabase redirect documentation remains informational.
- Public leaderboard behavior must continue using existing safe public/anon/authenticated browser client seams.

## Risk Management

- **Navigation crowding:** verify desktop and mobile navigation after adding `Leaderboard`.
- **Content duplication:** test that public leaderboard and Multiplayer Ratings appear in Leaderboard, not both Leaderboard and Stats.
- **Identity leakage:** restrict Active Games repair to existing safe profile summary fields and add forbidden-field tests.
- **Fallback regressions:** test safe-name fallback when identity summaries are missing or stale.
- **Provider error ambiguity:** avoid overclaiming same-current-password detection unless the error is reliable.
- **Settings discoverability:** ensure sign-out, password change, and email-change gate remain visible after consolidation.

## Open Decisions

- Final route tone/color for `Leaderboard`.
- Whether the Leaderboard component lives at `src/leaderboards/LeaderboardPanel.tsx` or another route-specific module.
- Whether Stage 36.2 remains source-only after audit.
- Whether Settings fully removes the separate signed-in section or keeps a small fallback for anonymous/unconfigured states.
- Whether final E2E should use real two-client Active Games identity reproduction or component-level coverage plus existing multiplayer E2E, depending on Stage 36.2 risk.

## Stop Conditions

Stop and record a non-secret blocker if:

- the repository is not `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`;
- the original stable `brrrdle` repository would be touched;
- user edits to `planning/phase-35/REVIEW-CHECKLIST.md` would be overwritten;
- Stage 36.1 finds Active Games needs migration/RLS support;
- any verification gate fails;
- a secret, credential-like value, forbidden artifact, auth state, token, screenshot, video, trace, or local session artifact would be exposed or staged;
- implementation would require Vercel/Supabase configuration, deployment, gameplay/Elo changes, public/guest spectation, service workers, push infrastructure, or GitHub backup workflow execution without a later explicit prompt.

## GitHub Backup Expectations

Phase 36 Git handoff preparation and backup remain later gates. After a clean handoff preparation pass, the next backup prompt should explicitly invoke the local `brrrdle-github-backup` skill for the all-in-one governed backup workflow, preserving the exact approved staging list and forbidden artifact boundaries.

## Next Gated Prompt: Stage 36.0 Baseline Only

Safe after review:

````md
# Codex Task: Begin Phase 36 Execution For `brrrdle-dev` - Stage 36.0 Baseline Only

Use `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`. Do not touch the original stable `brrrdle` repository.

## Authorization

I authorize Phase 36 Stage 36.0 only: Implementation Plan Approval And Protected Baseline.

This includes reading required governance, Phase 36 planning/spec/implementation materials, completed Phase 35 evidence, current progress records, package/test surfaces, confirming repository state, recording existing uncommitted Phase 36 planning/spec/progress artifacts and the user-edited Phase 35 review checklist state, creating the Stage 36.0 progress report and matching 12-column CSV row, running resource/process checks, and running the Stage 36.0 baseline verification gate.

This does not authorize Stage 36.1 work, source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or original stable repository work.

## Required Reading

Read:

- `CONSTITUTION.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `BRRRDLE-SPEC.md`
- `planning/README.md`
- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `planning/testing/TESTING-SUITE.md`
- `planning/phase-35/CHANGELOG.md`
- `planning/phase-35/REVIEW-CHECKLIST.md`
- `planning/phase-36/PLANNING-BRIEF.md`
- `planning/specs/phase-36/PHASE-36-LEADERBOARD-STATS-ACTIVE-GAMES-SETTINGS-SPEC-2026-06-28.md`
- `planning/phase-36/IMPLEMENTATION-PLAN.md`
- `planning/skills/brrrdle-github-backup.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-292.md`
- `progress/PROGRESS-STEP-293.md`
- `progress/PROGRESS-STEP-294.md`
- `agents.md`
- `memory.md`
- `package.json`

## Objectives

1. Confirm repo state: `pwd`, branch, `git status --short --branch`, remotes, `HEAD`, and `origin/main`.
2. Confirm the original stable `brrrdle` repository is not being used.
3. Preserve user edits to `planning/phase-35/REVIEW-CHECKLIST.md`.
4. Record current uncommitted Phase 36 planning/spec/progress artifacts.
5. Create the Stage 36.0 progress report and matching 12-column CSV row, likely progress ID `295`.
6. Run watched-port/process/resource checks before and after verification for ports `5173`, `5174`, `3000`, and `4173`.
7. Run sequentially:
   - `npm run lint`
   - `npm run test`
   - `npm run build`
   - `npx tsc -p tsconfig.api.json --noEmit`
   - `git diff --check`
   - progress CSV shape check using `python3 -S`
   - non-printing secret/artifact scan
   - ignored-artifact check
   - watched-port cleanup check
   - `git status --short --branch`
8. If any command fails, stop, record the exact non-secret failure in progress, and do not proceed to Stage 36.1.

## Final Report

Report progress path, files changed, branch/worktree status, progress ID, baseline verification results, resource/process observations, blockers/open questions, boundary confirmation, and a copy-safe prompt for Stage 36.1 audit only if the baseline passes.

Then halt for review.
````
