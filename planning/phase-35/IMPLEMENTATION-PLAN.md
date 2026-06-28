# Phase 35 Implementation Plan

**Status:** Detailed implementation plan for review.
**Phase:** Phase 35 - Auth, Profile, Deployment, And Live Identity Readiness.
**Repository:** `brrrdle-dev` only.
**Created:** 2026-06-27.
**Baseline:** local `main` and `origin/main` expected at `41f37c3a3734be71a2078a60f7aece46543db5fb`.

## Authority

This implementation plan is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, `planning/phase-35/PLANNING-BRIEF.md`, `planning/specs/phase-35/PHASE-35-AUTH-PROFILE-DEPLOYMENT-AND-LIVE-IDENTITY-READINESS-SPEC-2026-06-27.md`, completed Phase 34, completed Phase 33, completed Phase 32, completed Phase 31, completed Phase 30, completed Phase 29, completed Phase 28, completed Phase 27, `docs/deployment.md`, `docs/supabase.md`, `docs/ranked-multiplayer.md`, `planning/testing/TESTING-SUITE.md`, `planning/skills/brrrdle-github-backup.md`, `progress/PROGRESS.csv`, and the current progress reports.

This plan does not authorize implementation. It defines the execution sequence to use only after the user explicitly authorizes each stage.

## Execution Principles

- Start with the current bug, not the larger account work: Stage 35.1 must audit the ranked Live safe-name regression before any Profile tab, Settings, or auth-copy implementation begins.
- Prefer source-only fixes when the existing safe identity data is present but mapped or merged incorrectly.
- Stop for a migration/RLS addendum if existing sanitized projections cannot provide the required ranked Live names.
- Keep Vercel and Supabase dashboard configuration read-only unless a later prompt explicitly authorizes configuration changes.
- Keep the Profile tab current-player-only. Do not introduce public profile browsing, clickable other-player profiles, public/guest spectation, or social matchmaking.
- Use focused tests for each stage and broad verification only at protected baseline and final hardening gates.
- Preserve user edits to `planning/phase-34/REVIEW-CHECKLIST.md`.
- Do not run the `brrrdle-github-backup` workflow during implementation stages.

## Success Criteria

Phase 35 is complete only when:

- Ranked Live participant cards use safe opponent names in creator and joined-player perspectives.
- Ranked Live signed-in spectator cards use safe names for both players when available.
- Generic labels such as `Rival`, `Player one`, and `Player two` appear only when safe identity is genuinely unavailable.
- The implementation path proves whether the ranked Live identity repair was source-only or required a reviewed migration/RLS addendum.
- Vercel magic-link behavior is diagnosed without guessing and without changing external configuration.
- Supabase auth redirect and password recovery assumptions are documented and, where source changes are made, tested.
- Account creation/sign-in/reset copy is clearer and does not expose raw provider internals.
- Signed-in password management is discoverable and tested.
- Email-change behavior is either safely implemented or explicitly documented behind a configuration gate.
- Settings, Danger Zone, and Profile responsibilities are clear.
- The current-player Profile tab exists if Stage 35.5 confirms it remains source-only and privacy-safe.
- Visual handoff review and `planning/phase-35/REVIEW-CHECKLIST.md` exist before Git handoff preparation.
- Phase 34, Phase 33, Phase 32, Phase 31, Phase 30, Phase 29, Phase 28, Phase 27, Daily Multiplayer, gameplay, and Elo invariants remain intact.

## Stage Breakdown

### Stage 35.0: Implementation Plan Approval And Protected Baseline

**Goal:** Confirm the Phase 35 implementation plan is approved and establish a clean execution baseline.

**Allowed work:**

- Read required governance, Phase 35 planning/spec/implementation docs, current progress records, package scripts, and testing docs.
- Confirm repository state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Record existing uncommitted Phase 35 planning/spec/progress artifacts and the user-edited Phase 34 checklist state.
- Create the Stage 35.0 progress report and CSV row.
- Run watched-port/process/resource checks for ports `5173`, `5174`, `3000`, and `4173`.
- Run the protected baseline verification gate:
  - `npm run lint`
  - `npm run test`
  - `npm run build`
  - `npx tsc -p tsconfig.api.json --noEmit`
  - `git diff --check`
  - progress CSV shape check using `python3 -S`
  - non-printing secret/artifact scan
  - ignored-artifact check
  - `git status --short --branch`

**Exit gate:** Baseline passes and progress is recorded. If any check fails, record the exact non-secret failure and stop before Stage 35.1.

### Stage 35.1: Ranked Live Identity Audit And Scope Lock

**Goal:** Diagnose the persistent ranked Live name regression and decide whether Stage 35.2 is source-only or requires migration/RLS addendum planning.

**Read-only audit targets:**

- `/Users/noir/Desktop/player1.png`
- `/Users/noir/Desktop/player2.png`
- `/Users/noir/Desktop/spectator.png`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/MultiplayerLive.test.tsx`
- `src/multiplayer/multiplayerViewModels.test.ts`
- `src/multiplayer/multiplayerRepository.test.ts`
- `src/multiplayer/MultiplayerPanel.test.tsx`
- `supabase/migrations/20260624233635_phase32_participant_identity_rpc.sql`
- `supabase/migrations/20260626000925_phase33_timed_ranked_practice.sql`
- authenticated Live spectator RPC migrations, especially Phase 26/28 spectator projection migrations.

**Audit questions:**

- Why does the ranked creator participant view resolve `kiki` while joined-player and spectator ranked views fall back?
- Does the ranked game local state lose `playerProfiles` after queue finalization or reload?
- Does the spectator RPC return generic `Player one` for ranked finalized games because public profile data is unavailable, filtered, or not parsed?
- Does the unranked row resolve through a different data path that can be reused safely?
- Can Phase 32 participant identity summaries fill participant rows for ranked finalized games without broadening spectator permissions?
- Is the problem stale cache/state merge, DTO parsing, source mapping, or SQL/RLS projection availability?

**Deliverables:**

- `progress/PROGRESS-STEP-*.md` for Stage 35.1.
- A clear source-only versus addendum-required decision.
- A focused next prompt for either Stage 35.2 source repair or Stage 35.2 migration/RLS addendum planning.

**Exit gate:** Do not implement fixes in Stage 35.1. If safe data is insufficient, stop and route to addendum planning.

### Stage 35.2A: Ranked Live Identity Source Repair

Use this path only if Stage 35.1 proves existing safe data is available and the bug is source-side.

**Likely files:**

- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- focused test files listed in Stage 35.1.

**Requirements:**

- Preserve `You` for only the viewer's own seat.
- Prefer safe public/profile names before `Rival`, `Player one`, or `Player two`.
- Do not expose raw auth IDs, auth emails, private metadata, answers, seeds, sessions, queue internals, rating transaction IDs, settlement IDs, tokens, or local artifacts.
- Add focused tests for creator, joined-player, and signed-in spectator ranked Live perspectives.
- Add fallback tests proving generic labels appear only when safe identity is unavailable.

**Verification:**

- Focused Live identity tests first.
- Then `npm run lint`, `npm run test`, `npm run build`, `npx tsc -p tsconfig.api.json --noEmit`, `git diff --check`, CSV shape check, secret/artifact scan, ignored-artifact check, and `git status --short --branch`.

### Stage 35.2B: Migration/RLS Addendum Planning

Use this path only if Stage 35.1 proves existing safe projections cannot support ranked Live identity repair.

**Deliverable:**

- `planning/specs/phase-35/PHASE-35-RANKED-LIVE-IDENTITY-MIGRATION-RLS-ADDENDUM-2026-06-27.md` or date-appropriate equivalent.

**Addendum requirements:**

- Identify the exact RPC/table gap.
- Use additive SQL only.
- Preserve authenticated-only visibility.
- Return only allow-listed safe identity fields.
- Define grants, RLS behavior, abuse boundaries, idempotency, rollback notes, and non-printing probes.
- Preserve public/guest spectation deferral.

**Exit gate:** Halt after addendum review. Do not create or run SQL migrations until separately authorized.

### Stage 35.3: Vercel And Supabase Auth Redirect Audit

**Goal:** Diagnose magic-link/Vercel login behavior and auth redirect assumptions without changing external configuration.

**Likely files:**

- `docs/deployment.md`
- `docs/supabase.md`
- `src/account/auth.ts`
- `src/account/AuthModal.tsx`
- `src/account/AuthPanel.tsx`
- `src/account/supabaseClient.ts`
- `src/app/App.tsx`
- `src/account/authHelpers.test.ts`
- `src/account/auth.test.ts`
- `src/account/AuthModal.test.tsx`

**Audit requirements:**

- Confirm whether the user-provided screenshot is a Vercel protection screen.
- Determine whether magic links redirect to a protected preview URL.
- Review whether `sendMagicLink` should pass an explicit redirect target, or whether dashboard settings are the correct fix.
- Confirm password reset redirect behavior through `auth_action=reset-password` and recovery hash handling.
- Update docs/checklists only where source evidence supports it.
- Do not inspect or print secrets.
- Do not change Vercel or Supabase settings.

**Exit gate:** A non-secret diagnosis and any source/doc recommendations are recorded before Stage 35.4.

### Stage 35.4: Auth Copy And Account Management

**Goal:** Make sign-up, password management, and email-change expectations clearer and more discoverable.

**Likely files:**

- `src/account/auth.ts`
- `src/account/AuthModal.tsx`
- `src/account/AuthPanel.tsx`
- `src/account/PasswordResetModal.tsx`
- `src/account/Settings.tsx`
- `src/account/dangerZone.ts`
- `src/app/App.tsx`
- `src/account/authHelpers.test.ts`
- `src/account/auth.test.ts`
- `src/account/AuthModal.test.tsx`
- `src/account/Settings.test.tsx`

**Requirements:**

- Replace confusing account creation copy such as "if email confirmation is enabled" with clearer user-facing wording.
- Keep provider errors classified and safe.
- Add or consolidate signed-in change-password access using existing password update helpers where possible.
- Evaluate email-change behavior through `auth.updateUser({ email })`; implement only if the source behavior can be represented safely without dashboard assumptions.
- If email change depends on Supabase confirmation/redirect settings, document the gate instead of pretending the app can guarantee delivery.
- Add focused helper/component tests.

**Exit gate:** Account-management behavior is source-safe and tested, or any blocked email-change requirement is documented.

### Stage 35.5: Current-Player Profile Tab And Settings/Danger Zone Cleanup

**Goal:** Create a focused current-player Profile surface while keeping public/social profile expansion deferred.

**Likely files:**

- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- current navigation route/tab model files
- `src/account/ProfilePanel.tsx`
- `src/account/AccountBadge.tsx`
- `src/account/Settings.tsx`
- `src/account/profile.ts`
- `src/account/publicProfile.ts`
- `src/account/ProfilePanel.test.tsx`
- `src/account/AccountBadge.test.tsx`
- `src/account/Settings.test.tsx`
- route/navigation/component tests as discovered.

**Requirements:**

- Add a main `Profile` tab between `Words` and `Settings` if still source-only and manageable.
- Move or reuse current private/public profile controls without broad redesign.
- Keep signed-out behavior clear and compact.
- Keep top-right account badge as a global shortcut/status affordance.
- Keep Settings focused on gameplay, notifications, sync, sound, and local guest progress.
- Keep Danger Zone for destructive or high-risk actions only.
- Do not implement public profile pages, clickable rival profiles, private match requests, public avatar storage expansion, public/guest spectation, or social browsing.
- Audit but do not broadly change private/public accent or avatar size policy unless Stage 35.5 explicitly proves a small source-only copy/organization change is safe.

**Exit gate:** Profile tab and Settings responsibility changes are tested and responsive.

### Stage 35.6: Final Hardening, E2E, Visual Review, Manual Checklist, And Completion Docs

**Goal:** Close Phase 35 with evidence, cleanup, and review artifacts before Git handoff preparation.

**Allowed work:**

- Review Stage 35.1 through Stage 35.5 changes for stale copy, duplicated logic, privacy gaps, Live identity regressions, auth/account regressions, and docs gaps.
- Add only narrow final-hardening fixes needed for Phase 35 completion.
- Run feasible focused E2E/regression coverage:
  - ranked Live creator participant names;
  - ranked Live joined participant names;
  - ranked Live signed-in spectator names;
  - auth copy and password/email management flows;
  - Profile tab if implemented.
- Run local visual handoff review for changed user-visible surfaces.
- Create `planning/phase-35/CHANGELOG.md`.
- Create `planning/phase-35/REVIEW-CHECKLIST.md`.
- Run final verification:
  - focused tests for touched files;
  - `npm run lint`;
  - `npm run test`;
  - `npm run test:e2e` when E2E surfaces were touched or feasible;
  - `npm run test:full` before handoff if broad source surfaces changed;
  - `npm run build`;
  - `npx tsc -p tsconfig.api.json --noEmit`;
  - `git diff --check`;
  - progress CSV shape check using `python3 -S`;
  - non-printing secret/artifact scan;
  - ignored-artifact check;
  - watched-port/process cleanup check;
  - `git status --short --branch`.

**Exit gate:** Phase 35 appears complete and is ready for Git handoff preparation. Do not run Git handoff or backup workflow in Stage 35.6.

## Dependencies

- Supabase-backed E2E requires the existing E2E Supabase environment variables and service-role fixture setup. Do not print values.
- Vercel/Supabase configuration diagnosis may require user-visible deployment URLs or dashboard context. If inaccessible, document the exact unknowns and stop before claiming a config fix.
- Migration/RLS execution requires a separate addendum and explicit authorization.
- Profile tab work depends on the app's current route/tab model and may require careful sequencing around `src/app/App.tsx`.

## Migration/RLS Addendum Gate

Trigger an addendum gate when any of these are true:

- ranked participant Live rows do not have access to a safe opponent display name through existing app/RPC seams;
- ranked spectator Live rows cannot access safe public/profile names through current authenticated spectator projection;
- the only available workaround would expose raw IDs, emails, private profile metadata, answers, seeds, sessions, queue internals, rating transaction IDs, settlement IDs, tokens, or local artifacts;
- ranked queue/finalization paths need a new sanitized identity projection to serve both participants and authenticated spectators.

Do not create or run a migration without a separately approved addendum and execution prompt.

## Vercel And Supabase Configuration Gate

Stop before configuration changes if:

- Vercel deployment protection or preview access must be changed;
- Supabase Site URL or redirect allowlist must be changed;
- Supabase email confirmation behavior must be changed;
- email-change confirmation templates or redirect URLs must be configured;
- production or preview deployment settings must be edited.

Record the exact non-secret configuration need and prepare a separate prompt if the user wants that work later.

## Stop Conditions

Stop and report before continuing if:

- the repository is not `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`;
- the original stable `brrrdle` repository would be touched;
- `planning/phase-34/REVIEW-CHECKLIST.md` user edits are at risk of being overwritten;
- source implementation is requested before the relevant stage is authorized;
- a secret, auth state, screenshot, video, trace, token, or local session artifact appears in staged/tracked changes;
- Stage 35.1 cannot classify the ranked Live identity bug safely;
- a migration/RLS gap is found before addendum planning;
- Vercel/Supabase configuration changes are needed before source work can be truthful;
- verification fails;
- resource/process checks find a runaway process that cannot be cleaned up safely;
- any planned change would affect gameplay rules, Elo math, Daily integrity, public leaderboard authority, public profile privacy, public/guest spectation, service workers, deployment, release, or GitHub backup without explicit authorization.

## Risk Management

- Keep `src/app/App.tsx` and navigation changes until after the identity and auth audits.
- Prefer focused tests around each stage before broad verification.
- Keep visual review artifacts ignored/local-only.
- Do not overfit the Live identity fix to only the three observed account names; test fallback and unavailable-identity cases too.
- Treat Vercel auth screens as deployment-access signals until proved otherwise.
- Avoid combining Profile tab navigation and email-change behavior in the same narrow commit-sized mental chunk; they touch different risk surfaces.

## Open Decisions

- Whether Stage 35.2 is source-only or addendum-required.
- Whether magic-link sign-in should pass an explicit redirect target.
- Whether email-change can be safely implemented without dashboard/config changes.
- Whether the top-right account badge should open a compact menu or navigate directly to `Profile`.
- Whether avatar upload limit or public/private accent behavior should change now or wait for a later profile/social/storage phase.

## Next Gated Prompt

The next safe action is Stage 35.0 protected baseline only. That stage verifies the current worktree and records the baseline before any audit or implementation work begins.
