# Phase 48 Implementation Plan

**Status:** Drafted for review. Do not execute until the next stage is explicitly authorized.
**Phase:** Phase 48 - Profile And Multiplayer Contract Simplification.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Stable repository boundary:** Do not touch the original stable `brrrdle` repository.
**Date:** 2026-07-06

## 1. Authority

This plan implements the staged execution path for:

- `planning/phase-48/PLANNING-BRIEF.md`
- `planning/specs/phase-48/PHASE-48-PROFILE-AND-MULTIPLAYER-CONTRACT-SIMPLIFICATION-SPEC-2026-07-06.md`

Higher-authority sources remain, in order:

1. Current explicit user instructions.
2. `CONSTITUTION.md`.
3. `BRRRDLE-SPEC.md`.
4. Phase 48 planning brief and unified specification.
5. `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`.
6. `planning/testing/TESTING-SUITE.md`.
7. Supporting repo docs, `agents.md`, and `memory.md`.

This document is planning only. It does not authorize implementation, test implementation, migrations, deployment, Git/GitHub operations, backup workflow execution, strict one-active-session/session leases, server-authoritative Daily submissions, broad mobile shell/top-tab/navigation overhaul, compact side-dock implementation, broad mobile performance overhaul, gameplay-rule changes, Elo changes, or stable-repository work.

## 2. Current Baseline

- Expected local `main` and `origin/main`: `f3dab778906edc4dad6c8c34365c8354c1affb1f`.
- Phase 47 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Phase 47 manual review passed for required checklist behavior.
- Preserve the user-updated checklist at `planning/phase-47/REVIEW-CHECKLIST.md`.
- Phase 48 planning brief and unified specification are already created and tracked under progress steps 432 and 433.
- Late Phase 47 observation: real-mobile page scrolling feels slightly laggy. It is non-blocking and should be classified early without turning Phase 48 into broad mobile shell or performance work.

## 3. Implementation Principles

- Keep Stage 48.0 as a protected baseline and classification gate only.
- Treat the late mobile scroll-lag note as a bounded routing question:
  - if evidence points to a recent, narrow auto-scroll regression, allow a tiny source/test repair before deeper profile work;
  - if evidence points to broad mobile performance, shell, navigation, side-dock, or layout work, defer it.
- Make profile/public-profile/private-profile boundaries simpler without exposing raw auth data, private account data, private progress, tokens, or local session artifacts.
- Keep Profile and Settings account-management responsibilities clear and non-duplicative.
- Treat custom-code/custom-private games as a product-contract decision, not a stray UI cleanup.
- Treat private Daily and ranked Daily as protected contract decisions because they can affect Daily claim safety, answer secrecy, rating authority, and ranked/unranked separation.
- Stop for addendum planning before any migration/RLS, storage-contract, Supabase, session-lease, server-authoritative Daily, gameplay-rule, or Elo change.
- Preserve Phase 47 mobile Solo GO keyboard visibility and guest/account display-boundary repairs.
- Preserve Phase 46 automatic signed-in Solo sync/freshness, no implicit guest-to-account transfer, no authenticated progress writes to guest storage, and Solo Overview Resume-only behavior.
- Preserve Phase 45 Solo account boundaries, Phase 44 account-scoped repairs, Phase 43 ranked fairness, Phase 42 stats/dashboard/help contracts, Phase 41 multiplayer reliability, Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, Phase 38 spectator boundaries, Daily claim safety, gameplay rules, scoring rules, and Elo math.

## 4. Stage Breakdown

### Stage 48.0 - Protected Baseline, Phase 47 Intake, And Scroll-Lag Classification

**Authorization:** Baseline and classification only.

**Goals:**

- Confirm repo state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not in use.
- Read required governance, Phase 48 planning/spec/implementation materials, Phase 47 completion evidence, package/test surfaces, current progress records, and relevant mobile auto-scroll surfaces.
- Preserve `planning/phase-47/REVIEW-CHECKLIST.md`.
- Record existing uncommitted Phase 48 planning/spec/progress artifacts.
- Create the Stage 48.0 progress report and matching 12-column CSV row, likely progress ID `435`.
- Run watched-port/process/resource checks before and after baseline verification for ports `5173`, `5174`, `3000`, and `4173`.
- Classify the late real-mobile scroll-lag observation:
  - narrow source/test auto-scroll regression path;
  - broader mobile performance/shell deferral path;
  - blocked/unclear path requiring later manual evidence.

**Likely read-only files/modules:**

- `src/app/gameplayAutoCenter.ts`
- `src/app/games/soloGameplayAutoCenter.ts`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/index.css`
- `e2e/layout/mobile-scroll.spec.ts`
- Phase 47 changelog, checklist, and progress evidence.

**Verification:**

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

**Stop conditions:**

- Repo path is not exactly `brrrdle-dev`.
- Local or remote `main` does not match the expected baseline without a reviewed reason.
- Stable repository would be touched.
- Any baseline verification command fails.
- Scroll-lag classification requires broad mobile shell/performance work; route and stop rather than implementing it in Stage 48.0.

### Stage 48.1 - Profile, Public Profile, And Account-Management Audit

**Authorization:** Read-only audit only.

**Goals:**

- Audit current-player Profile, public profile, private/current-player fields, Settings, auth/account-management, public visibility, profile preview, Save, Sign out, and related tests.
- Identify redundant fields, unclear copy, misleading placement, hidden dependencies, and public/private data-boundary risks.
- Map where public profile data is read, written, displayed, and used by private Practice request flows.
- Identify whether profile simplification appears source-only or may require a migration/RLS/storage-contract addendum.

**Likely read-only files/modules:**

- `src/account/ProfilePanel.tsx`
- `src/account/ProfilePanel.test.tsx`
- `src/account/PublicProfilePage.tsx`
- `src/account/PublicProfilePage.test.tsx`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`
- `src/account/profile.ts`
- `src/account/profile.test.ts`
- `src/account/publicProfile.ts`
- `src/account/publicProfile.test.ts`
- `src/account/publicProfilePrivateMatch.ts`
- `src/account/publicProfilePrivateMatch.test.ts`
- `src/account/AuthPanel.tsx`
- `src/account/AuthModal.tsx`
- relevant profile/account E2E and Supabase docs.

**Decision output:**

- Field ownership map: public, private-current-player, internal-only, redundant, or unknown.
- Source-only versus addendum recommendation for Stage 48.2.
- Notes for Profile/Settings clarity in Stage 48.3.

**Verification:**

- Focused read-only checks as needed.
- Lightweight documentation verification after the progress report is created.

### Stage 48.2 - Profile Privacy And Model Simplification Decision

**Authorization:** Documentation/planning decision only.

**Goals:**

- Use Stage 48.1 evidence to decide the target public/private/current-player profile model.
- Decide whether simplification can stay source/test-only.
- If source-only is safe, record exact implementation boundaries:
  - copy/layout/grouping changes;
  - local view-model simplification;
  - privacy-safe public/private display shaping;
  - no stored-field, RLS, projection, or public-profile table contract changes.
- If not source-only, create a narrow profile contract addendum under `planning/specs/phase-48/` and stop before implementation.

**Potential addendum path if required:**

- `planning/specs/phase-48/PHASE-48-PROFILE-CONTRACT-ADDENDUM-2026-07-06.md`

**Stop conditions:**

- Any required change to public/private profile storage contract, Supabase table/column/RPC/policy/grant/view, raw auth identity handling, private request lifecycle, or destructive local cleanup.

### Stage 48.3 - Profile/Settings Account-Management Clarity Plan

**Authorization:** Source/test-only if Stage 48.2 chooses source-only; otherwise documentation addendum routing only.

**Goals:**

- Make Profile and Settings account-management responsibilities clearer if the chosen path is source-only.
- Clarify Save and Sign out placement.
- Preserve password reset, sign-in, sign-up, redirect, Supabase auth, public visibility, and Settings behavior.
- Avoid duplicative or contradictory controls across Profile and Settings.
- Add focused component/model tests where practical.

**Likely files/modules if source-only is authorized:**

- `src/account/ProfilePanel.tsx`
- `src/account/ProfilePanel.test.tsx`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`
- `src/account/AuthPanel.tsx`
- `src/account/AuthModal.tsx`
- `src/account/profile.ts`
- `src/account/publicProfile.ts`
- related public profile tests if display copy changes.

**Verification focus:**

- Focused Profile/Settings/account tests first.
- Then the standard implementation-stage gate if source/test work occurs.

**Stop conditions:**

- Requires auth contract changes, Supabase/RLS changes, profile storage changes, deployment/configuration, strict session leases, gameplay-rule changes, or Elo changes.

### Stage 48.4 - Custom-Code And Private Game Contract Decision

**Authorization:** Audit, decisioning, and source/test-only cleanup only if proven safe.

**Goals:**

- Audit custom-code/custom-private game entry points, match types, copy, tests, and product role.
- Decide whether the custom-code match type should be removed, hidden, renamed, or redesigned.
- Preserve existing private Practice request behavior and Phase 40 public profile/private matchmaking boundaries.
- If source-only cleanup is safe, make the smallest UI/copy/routing adjustment needed.
- If the desired product direction requires invitations, inboxes, social systems, new multiplayer tables, RLS changes, or private lifecycle changes, create an addendum and stop.

**Likely files/modules:**

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/privateMatchmaking.ts`
- `src/multiplayer/privateMatchmaking.test.ts`
- `src/multiplayer/customGames.ts`
- `src/multiplayer/customGames.test.ts`
- `src/account/publicProfilePrivateMatch.ts`
- `src/account/publicProfilePrivateMatch.test.ts`
- relevant private matchmaking and lobby E2E tests.

**Potential addendum path if required:**

- `planning/specs/phase-48/PHASE-48-CUSTOM-PRIVATE-MULTIPLAYER-CONTRACT-ADDENDUM-2026-07-06.md`

**Stop conditions:**

- Requires new invitation/inbox/social contracts, new or changed multiplayer rows, RLS policy changes, notification delivery changes, storage migrations, or deployment/configuration.

### Stage 48.5 - Private Daily And Ranked Daily Contract Decision

**Authorization:** Documentation/planning decision only unless the stage prompt later explicitly authorizes a source-only UI routing change.

**Goals:**

- Evaluate private Daily request feasibility against Daily claim safety, answer secrecy, UTC-day boundaries, spectator/public discovery boundaries, ranked/unranked separation, and rating authority.
- Evaluate ranked Daily separation against ranked Practice assumptions, Daily claims, Elo authority, settlement, and competitive-integrity requirements.
- Decide whether private Daily and ranked Daily remain deferred, receive separate addenda, or can proceed later through a tightly scoped implementation stage.
- Do not implement private Daily, ranked Daily, server-authoritative Daily, Daily replay, Daily rematch, Daily claim-rule changes, or Elo changes in this stage.

**Likely files/modules for audit:**

- `src/multiplayer/dailyMultiplayer.ts`
- `src/multiplayer/matchmaking.ts`
- `src/multiplayer/rating.ts`
- `src/multiplayer/rankedQueueFairnessContract.test.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `docs/ranked-multiplayer.md`
- `docs/supabase.md`
- relevant Daily multiplayer and ranked queue tests/E2E fixtures.

**Potential addendum paths if required:**

- `planning/specs/phase-48/PHASE-48-PRIVATE-DAILY-CONTRACT-ADDENDUM-2026-07-06.md`
- `planning/specs/phase-48/PHASE-48-RANKED-DAILY-CONTRACT-ADDENDUM-2026-07-06.md`

**Stop conditions:**

- Requires Daily claim semantic changes, private Daily implementation, ranked Daily implementation, server-authoritative Daily, new Supabase/RLS contract, gameplay-rule changes, scoring changes, or Elo changes.

### Stage 48.6 - Final Hardening, Visual Review, Changelog, And Manual Checklist

**Authorization:** Final hardening/documentation only after prior implementation or decision stages are complete.

**Goals:**

- Review Phase 48 stages for regressions, stale docs, privacy gaps, route gaps, visual issues, and cleanup needs.
- Add only narrow final-hardening fixes if required and if already within source/test authority.
- Run focused regression coverage for:
  - profile/public-profile privacy;
  - Profile/Settings account-management clarity;
  - custom-code/private game routing;
  - private Practice request preservation;
  - private Daily/ranked Daily deferral or addendum routing;
  - late scroll-lag classification or repair if touched;
  - Phase 47, Phase 46, Phase 45, Phase 44, Phase 43, and Daily/ranked/gameplay/Elo non-regressions.
- Run local visual handoff review for changed user-visible surfaces, saving artifacts only under ignored `test-results/visual-review/phase-48-stage-48-6/`.
- Create `planning/phase-48/CHANGELOG.md`.
- Create `planning/phase-48/REVIEW-CHECKLIST.md` using the local Phase 37-style checklist structure.

**Final verification:**

- focused tests first;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e` if browser flows changed;
- `npm run test:full` for final hardening if source/test work occurred;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

**Stop conditions:**

- Any verification failure.
- Visual review reveals a user-facing regression that cannot be fixed narrowly.
- Any required migration/RLS, storage, session, gameplay-rule, Elo, deployment, or Git/GitHub action lacks explicit separate authorization.

## 5. Cross-Stage Source-Only Gates

Source/test-only implementation may proceed only when all of these are true:

- no new or modified Supabase table, column, RPC, trigger, policy, grant, or view is required;
- no public/private profile data contract changes are required;
- no private request lifecycle contract changes are required;
- no custom invitation, inbox, social, or notification delivery contract is required;
- no Daily claim semantics, Daily answer secrecy, UTC-day, or replay/rematch behavior changes are required;
- no ranked Daily implementation or ranked/unranked Daily contract change is required;
- no storage-key migration or destructive local cleanup is required;
- no strict one-active-session/session-lease, forced sign-out, heartbeat, or invalidation mechanism is required;
- no broad mobile shell/top-tab/navigation, compact side-dock, or broad mobile performance overhaul is required;
- no gameplay-rule, scoring, timeout, forfeit, or Elo change is required.

If any gate fails, the stage must stop, record the non-secret finding, and route to addendum planning.

## 6. Profile And Privacy Constraints

- Public profiles remain opt-in.
- Public profile display must not expose raw auth IDs, auth email, tokens, private progress, private match metadata, private settings, or local session artifacts.
- Current-player private account controls may be visible only to the signed-in account owner.
- Public/private/current-player field responsibilities should be easy to explain in the manual checklist.
- Phase 40 public profile/private matchmaking boundaries must remain preserved.
- Profile simplification should remove confusion, not erase useful privacy controls.

## 7. Private, Custom, Daily, And Ranked Constraints

- Private Practice requests remain authenticated-only and unranked unless a later approved contract changes that.
- Custom-code/custom-private game surfaces should not remain a confusing dead-end.
- Removing or hiding custom-code must not break private Practice request behavior.
- Private Daily requests must not bypass Daily claim safety, answer secrecy, UTC-day boundaries, or availability rules.
- Ranked Daily requires explicit ranked/unranked separation and competitive-integrity review before implementation.
- Ranked Practice fairness and rating behavior remain preserved.
- No Elo algorithm change is allowed.

## 8. Verification Expectations By Stage Type

Documentation-only stages:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Protected baseline stage:

- `npm run lint`
- `npm run test`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- CSV shape check
- non-printing secret/artifact scan
- ignored-artifact check
- watched-port cleanup for `5173`, `5174`, `3000`, and `4173`
- `git status --short --branch`

Source/test implementation stages:

- focused tests first;
- `npm run lint`;
- `npm run test`;
- focused relevant E2E/browser checks if needed;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port cleanup;
- `git status --short --branch`.

Final hardening:

- focused regression set;
- feasible targeted E2E;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e` when browser flows changed;
- `npm run test:full` when source/test work occurred;
- `npm run build`;
- API typecheck;
- diff, CSV, secret/artifact, ignored-artifact, watched-port, and status checks;
- visual handoff review;
- changelog and manual checklist.

## 9. Risks

- Profile simplification could accidentally merge public and private account responsibilities.
- Sign out and Save placement could become clearer visually but less precise behaviorally.
- Custom-code removal/hiding could break hidden private-game dependencies if the audit is incomplete.
- Private Daily and ranked Daily could weaken Daily claim safety if treated as copy-only decisions.
- Ranked Daily may need a deeper competitive-integrity model than Phase 48 can safely implement.
- Migration/RLS changes may be unavoidable for a clean long-term profile or invitation contract.
- The late mobile scroll-lag note could be broad mobile performance, which should remain deferred rather than absorbed into this phase.
- Strict session leases and server-authoritative Daily are tempting anti-cheat tools but remain later gates unless separately authorized.

## 10. Open Decisions

- Which profile fields are public, private-current-player, internal-only, redundant, or unclear?
- Should Save and Sign out live in Profile, Settings, or a clearer split between identity editing and account safety?
- Does custom-code have a meaningful current role, or should it be hidden/removed until redesigned?
- Are private Daily requests compatible with Daily claim safety?
- What exact product and data contract would ranked Daily require?
- Can all Phase 48 implementation remain source/test-only, or are one or more addenda needed?
- Is the late real-mobile scroll lag a narrow auto-scroll regression or later mobile performance/shell work?

## 11. Next Gated Prompt

The next safe action is Stage 48.0 protected baseline, Phase 47 intake, and scroll-lag classification only. Do not begin profile audit, source/runtime implementation, test implementation, migrations, deployment, Git/GitHub operations, or backup workflow execution until separately authorized.
