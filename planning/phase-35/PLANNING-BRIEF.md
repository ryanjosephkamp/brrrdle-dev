# Phase 35 Planning Brief

**Status**: Planning brief for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-27.
**Recommended phase focus**: urgent Live ranked identity regression repair plus auth, deployment, account-management, and Profile tab readiness.

## Authority

This brief is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, completed Phase 34 Multiplayer Live/Lobby/notification stabilization, completed Phase 33 competitive ladder readiness, completed Phase 32 multiplayer stabilization, completed Phase 31 postgame actions, completed Phase 30 public leaderboards, completed Phase 29 public profiles, completed Phase 28 Live behavior, completed Phase 27 ranked Practice foundations, `docs/deployment.md`, `docs/supabase.md`, `docs/ranked-multiplayer.md`, `planning/testing/TESTING-SUITE.md`, `planning/skills/brrrdle-github-backup.md`, `progress/PROGRESS.csv`, and the current progress reports.

This document does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

## Current Baseline

Phase 34 is complete, backed up to GitHub, merged, post-merge checked, and branch-cleaned. Local `main` and `origin/main` were confirmed at:

`41f37c3a3734be71a2078a60f7aece46543db5fb`

Current durable baseline:

- Phase 34 added Live badge readability, Live safe-name labels, Live ranked/unranked labels, one-click guarded Lobby join, notification direct-resume routing, Active Games `Your turn` cues, visual handoff review, and a manual review checklist.
- The user manually reviewed the Phase 34 checklist and reported that the checklist items worked, while adding a note that safe Live participant identities may still be unavailable where they should be available.
- The user-provided screenshots from 2026-06-27 show a remaining ranked Live identity regression:
  - creator/participant view can show the rival name correctly;
  - joined-player participant view can show `Rival` for a ranked game where `claudine` should appear, while an adjacent unranked game resolves `claudine`;
  - signed-in nonparticipant spectator view can show `Player one vs kiki` and `Player one's turn` for a ranked game where `claudine vs kiki` and `claudine's turn` should appear, while an adjacent unranked game resolves correctly.
- Phase 33 timed ranked Practice, rank bands, public leaderboard cleanup, and timed ranked E2E protections remain intact.
- Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections remain intact.
- Phase 30 public leaderboards remain authenticated-only, privacy-safe, display-only, and non-authoritative.
- Phase 29 public profiles remain default-private with moderation boundaries.
- Phase 28 Live v1 spectator behavior remains read-only.
- Daily Multiplayer remains asynchronous, five-letter, UTC-day keyed, no-clock, answer-separated, and claim-safe.

Existing local user work observed during this pass:

- `planning/phase-34/REVIEW-CHECKLIST.md` contains user checklist results and must be preserved.

## User Observations Reviewed

The planning pass reviewed these user-supplied artifacts and observations:

- `/Users/noir/Desktop/player1.png`: creator/participant Live view, with ranked and unranked cards showing `kiki` correctly.
- `/Users/noir/Desktop/player2.png`: joined-player participant Live view, with the ranked card falling back to `Rival` where `claudine` should appear.
- `/Users/noir/Desktop/spectator.png`: signed-in nonparticipant Live view, with the ranked card falling back to `Player one` where `claudine` should appear.
- `/Users/noir/Desktop/Screenshot 2026-06-25 at 5.15.19 PM.png` style evidence of a Vercel login screen after magic-link flow. This still appears more likely to be Vercel deployment protection or preview access than in-app Supabase auth alone, but Phase 35 should verify the full redirect chain before treating it as only configuration.

The user also requested planning for:

- automatic scrolling to center the gameplay area when entering, joining, or resuming a game;
- browser back/forward integration for route, tab, and subtab navigation;
- a new main `Leaderboard` tab between `Stats` and `Words`, moving the public leaderboard and Multiplayer Ratings content out of `Stats`;
- a new main `Profile` tab between `Words` and `Settings`, moving most `Your profile` content into a dedicated profile/account surface;
- reconsidering the private-vs-public accent split;
- making public avatar images and larger avatar uploads possible later;
- future public profile pages, clickable names/avatars, custom/private matchmaking, direct player requests, spectator lists/counts, public site stats, developer dashboard, onboarding/help, and theme work.

## Recommended Phase 35 Direction

Phase 35 should focus on account/profile/deployment readiness, but it should begin with the newly reported Live ranked safe-name regression before expanding account surfaces.

Recommended Phase 35 v1 scope:

1. Re-audit and fix the persistent ranked Live participant/spectator safe-name regression.
2. Diagnose Vercel magic-link behavior, Supabase auth redirect/callback assumptions, and deployed/preview access protection boundaries without changing configuration unless a later prompt explicitly authorizes it.
3. Improve user-facing auth/account copy where source-only and low risk, especially account creation confirmation wording.
4. Complete normal signed-in account-management flows where the current Supabase client supports them safely, including password-change/reset surface consolidation and email-change flow planning or implementation if no migration/config gate is required.
5. Clarify Settings versus Danger Zone responsibilities.
6. Add a first-class private `Profile` tab/account surface if the unified Phase 35 spec confirms the move can be source-only and low risk, while keeping the top-right account badge as a compact status/menu entry.

Reasoning:

- The ranked Live identity issue is a current bug from the just-completed phase and should not wait behind broader account work.
- The Vercel login screenshot may be external deployment protection, so Phase 35 should diagnose and document exact causes before making app changes.
- The account/profile surfaces already have partial foundations: auth modal, password reset modal, Supabase update helpers, profile editor, public profile controls, and Settings account panels. Phase 35 can make them coherent without changing gameplay.
- A dedicated Profile tab belongs with account-management readiness. It is a cleaner place for private profile, public profile, password/email management, and future profile expansion than the current top-right modal alone.
- The Leaderboard tab is a strong near-term request, but it is a separate navigation/content reorganization that should follow after account/profile readiness to avoid too many high-conflict `App.tsx` navigation changes in one phase.

## Goals

- Repair ranked Live safe-name behavior for participant and signed-in spectator views while preserving all Phase 34 Live/Lobby/notification work.
- Determine whether the Vercel login screen is caused by Vercel deployment protection, preview access, Supabase redirect configuration, app callback assumptions, or some combination.
- Make auth copy less confusing and more actionable without exposing provider internals.
- Make account management discoverable and normal: password changes, password reset, email-change expectations, sign-out, public/private profile controls, and clear Settings/Danger Zone separation.
- Decide whether the new `Profile` main tab should be implemented in Phase 35 and specify its exact source-only boundaries.
- Preserve public profile privacy, Live read-only behavior, Daily integrity, multiplayer trust boundaries, and all gameplay/Elo rules.
- Route larger navigation, leaderboard, social, spectator, analytics, onboarding, and theme work to appropriate later phases.

## In Scope

### Live Ranked Identity Regression

Phase 35 should start by reproducing or auditing the persistent ranked Live safe-name bug shown in `player2.png` and `spectator.png`.

Expected investigation:

- compare ranked versus unranked Live card identity inputs;
- inspect participant Live rows from local multiplayer state;
- inspect authenticated spectator rows from the sanitized Live spectator RPC;
- inspect ranked queue/game identity summaries from the Phase 32 participant identity RPC;
- confirm whether ranked Live cards lose creator public profile summaries after ranked queue finalization;
- confirm whether the bug is app-side mapping, DTO parsing, stale local cache, RPC output shape, or RLS/data availability.

Expected behavior:

- participant Live cards prefer the opponent's safe public/profile display name when available;
- spectator Live cards prefer both players' safe public/profile display names when available;
- `Rival`, `Player one`, `Player two`, or equivalent generic labels appear only when safe identity is genuinely unavailable;
- `You` is used only for the viewer's own perspective and never for the opponent;
- no raw auth ids, emails, private profile fields, answers, seeds, sessions, queue internals, rating transaction ids, settlement ids, tokens, or local artifacts are exposed.

If existing safe data proves insufficient, Phase 35 must stop and route a narrow migration/RLS addendum before implementation.

### Vercel And Supabase Auth Redirect Readiness

Phase 35 should diagnose, not guess:

- whether Vercel deployment protection or preview access is enabled for the tested URL;
- whether magic-link redirect URLs target a protected preview URL instead of an accessible app URL;
- whether Supabase Site URL and allowed redirect URLs include the expected deployed and local callback destinations;
- whether app-side password recovery URL handling and magic-link handling align with Supabase events;
- whether docs should distinguish preview-protection behavior from production auth behavior.

Configuration changes in Vercel or Supabase remain out of scope unless a later prompt explicitly authorizes them.

### Auth Copy And Account Creation UX

Phase 35 should improve source-level wording if safe:

- replace confusing "if confirmations are enabled" style copy with a clearer account creation outcome;
- avoid surfacing raw Supabase provider errors;
- explain magic links, password sign-up, email confirmation, and password reset in user-facing language;
- keep messages concise, accessible, and non-technical.

### Password And Email Management

Phase 35 should define and implement only the safe source-level portion approved by the unified spec:

- signed-in change-password flow, likely reusing or extending the existing password update modal/helper;
- password reset flow clarification for recovery sessions;
- email-change flow if Supabase `auth.updateUser({ email })` behavior can be safely represented and tested without dashboard configuration changes;
- safe success/failure messages and status states;
- tests for validation, helper calls, and UI states.

If email changes require Supabase dashboard settings, confirmation templates, or redirect configuration that cannot be verified locally, Phase 35 should document the requirement and stop before configuration.

### Settings, Danger Zone, And Profile Tab

Phase 35 should cleanly assign responsibilities:

- Settings remains for gameplay, notification, sync, sound, and local guest progress preferences.
- Danger Zone is for destructive actions and typed confirmations only.
- Profile becomes the normal place for private profile, public profile, account identity, password/email management, and sign-out if the unified spec approves the tab.
- The top-right account badge should remain compact and may open a smaller account menu or profile shortcut rather than the full profile editor.

Profile tab constraints:

- no public profile browsing in Phase 35;
- no clickable public profile pages for other players in Phase 35;
- no public/guest spectation;
- no raw auth ids/emails exposed through public surfaces;
- no avatar storage/RLS changes unless separately specified;
- no broad redesign of unrelated tabs.

### Avatar And Public Profile Policy Audit

Phase 35 may audit, but should be careful before changing:

- current private avatar upload size limit of `200 KB`;
- whether private and public accent colors should remain separate;
- whether public avatar image handling should use URLs, storage uploads, or a future dedicated public asset policy.

Recommended Phase 35 boundary:

- document decisions and maybe modestly adjust app-side validation only if source-only and compatible with existing storage/RLS;
- defer full public avatar upload/storage expansion until a later profile/social phase with explicit storage and moderation rules.

## Out Of Scope

- Source/runtime implementation beyond a later explicitly approved Phase 35 execution stage.
- Supabase migration creation or execution during this planning brief.
- Vercel or Supabase dashboard configuration changes.
- Production deployment or release.
- Public/guest spectation.
- Spectator list/count implementation or spectator sorting.
- Public profile pages, broad social browsing, clickable names/avatars to other players' profiles, mailbox/request systems, or direct player matchmaking.
- Custom-code/private matchmaking expansion.
- New `Leaderboard` tab implementation in Phase 35 unless the unified spec deliberately narrows Phase 35 away from account/profile work.
- Browser back/forward history integration.
- Automatic gameplay-area scroll implementation unless the unified spec chooses a very small source-only add-on after the account/profile scope is proven smaller than expected.
- Public site stats, live site stats, private developer dashboard, admin analytics, telemetry, or observability products.
- Beginner onboarding/help/tutorial implementation.
- Theme proposal/template modernization or concrete theme work.
- Service workers, push subscriptions, background push, or cross-device notification infrastructure.
- Elo algorithm changes, gameplay-rule changes, scoring changes, timeout changes, forfeit changes, or settlement authority changes.
- Commits, pushes, pull requests, merges, releases, branch deletion, or GitHub backup workflow execution.
- Work in the original stable `brrrdle` repository.

## Routing Decisions

| Observation or request | Recommended route | Rationale |
| --- | --- | --- |
| Ranked Live participant/spectator safe-name regression | Phase 35 Stage 35.1 | Current user-visible bug from Phase 34 manual review; likely ranked-specific identity path. |
| Vercel login screen after magic link | Phase 35 auth/deployment audit | Likely deployment protection or redirect configuration; diagnose before app changes. |
| Supabase auth redirects/callback URLs | Phase 35 auth/deployment audit | Required to distinguish app bug from project configuration. |
| Confusing account creation confirmation copy | Phase 35 source UX | Small, high-value auth readiness improvement. |
| Password change/reset consolidation | Phase 35 account management | Existing helpers/modals provide a foundation. |
| Email change flow | Phase 35 if safe; otherwise Phase 35 docs/config checklist and later config gate | Supabase may require confirmation and redirect configuration decisions. |
| Settings/Danger Zone cleanup | Phase 35 | Account-management readiness needs clear destructive/non-destructive separation. |
| New `Profile` main tab | Phase 35 if unified spec confirms source-only scope | Fits account/profile readiness and reduces modal overload. |
| Private/public accent simplification | Phase 35 audit; implementation only if low risk | Needs privacy and UI review; avoid breaking public profile defaults. |
| Larger or public avatar image support | Later profile/social/storage phase, with Phase 35 audit only | Storage, moderation, and raw-id leakage concerns need separate guardrails. |
| Automatic gameplay-area centering on game entry/resume | Phase 37 navigation/gameplay ergonomics | Useful and likely source-only, but not auth/account-critical. |
| Browser back/forward integration | Phase 37 or later navigation/history phase | Cross-app routing/history work is higher risk and should be designed separately. |
| New `Leaderboard` tab and Stats split | Phase 36 near-term navigation/content phase | User definitely wants it soon; best as the next focused navigation/content reorganization. |
| Public/guest spectation | Phase 38 or later public/spectator readiness | Requires sanitized projections and explicit privacy/RLS planning. |
| Spectator list/count and spectator sorting | Phase 38 or later spectator presence phase | Presence semantics and privacy/RLS rules are needed. |
| Public profile pages and clickable rival names/avatars | Phase 39 or later profile/social phase | Requires public routes, moderation, abuse handling, and privacy review. |
| Custom-code private games and direct player requests | Phase 39 or later private matchmaking/social phase | Needs anti-abuse/collusion rules; ranked and Daily should remain excluded by default. |
| Public site stats and private developer dashboard | Phase 40 or later analytics/readiness phase | Requires telemetry/data model, privacy review, and admin authorization. |
| Beginner onboarding/help/tutorial | Phase 40 or later UX readiness phase | Important, but best after account/deployment and navigation structure settle. |
| Theme work | Phase 41 or later | Cosmetic/template work should wait until major navigation/account/public surfaces settle. |

## Recommended Stage Breakdown

### Stage 35.0: Protected Baseline

- Read governance, Phase 34 completion materials, this planning brief, package/test surfaces, account/auth/deployment docs, and relevant Live identity surfaces.
- Confirm repository state, branch, remotes, `HEAD`, and `origin/main`.
- Preserve the user-edited `planning/phase-34/REVIEW-CHECKLIST.md`.
- Run watched-port/process/resource checks.
- Run baseline verification before implementation.

### Stage 35.1: Live Ranked Identity Regression Audit And Scope Lock

- Reproduce or inspect the `player1.png`, `player2.png`, and `spectator.png` evidence.
- Audit ranked versus unranked Live identity inputs for participant and spectator rows.
- Audit Phase 32 participant identity RPC usage for ranked finalized games.
- Decide whether the fix is source-only or requires a migration/RLS addendum.
- Do not implement account/profile work until this regression is classified.

### Stage 35.2: Live Ranked Identity Regression Fix Or Addendum

- If source-only: fix mapping/parsing/cache behavior and add focused tests plus real two-client ranked Live coverage where feasible.
- If data projection is insufficient: create a narrow migration/RLS addendum first, then halt for review before migration execution.

### Stage 35.3: Auth/Deployment Redirect Audit

- Audit Vercel protection evidence, Supabase Site URL/redirect assumptions, app callback URL handling, password recovery markers, and documentation gaps.
- Produce a non-secret diagnosis and a configuration checklist.
- Do not change Vercel or Supabase dashboard configuration.

### Stage 35.4: Auth Copy And Account Management

- Improve account creation/sign-in/reset copy.
- Add or consolidate signed-in change-password behavior.
- Add or plan email-change behavior depending on Supabase redirect/config constraints.
- Add focused unit/component tests.

### Stage 35.5: Profile Tab And Settings/Danger Zone Reorganization

- If approved by the unified spec, add a first-class `Profile` tab between `Words` and `Settings`.
- Move most current `Your profile` content into the tab.
- Keep the top-right account badge as compact identity/status and navigation to Profile.
- Keep Settings focused on preferences and sync; keep Danger Zone for destructive actions.
- Preserve public profile privacy and avoid public profile browsing.

### Stage 35.6: Final Hardening, Visual Review, Manual Checklist, And Completion Docs

- Run focused tests, full verification, and any feasible auth/account/Live E2E coverage.
- Run visual handoff review for Live identity and account/profile surfaces if user-visible UI changed.
- Create `planning/phase-35/CHANGELOG.md`.
- Create `planning/phase-35/REVIEW-CHECKLIST.md`.
- Prepare Git handoff only after explicit authorization; after clean handoff prep, the next backup prompt should invoke `brrrdle-github-backup`.

## Success Criteria

Phase 35 succeeds when:

- ranked Live cards resolve safe participant names consistently for creator, joiner, and signed-in nonparticipant views when safe public/profile identity exists;
- ranked Live generic fallbacks appear only when safe identity is genuinely unavailable;
- the Vercel magic-link login screen is diagnosed as Vercel protection, Supabase redirect configuration, app callback behavior, or a documented combination;
- account creation, sign-in, magic-link, password reset, and password-management copy is clear and non-technical;
- signed-in password management is available or explicitly documented as blocked by a verified constraint;
- email-change behavior is either safely implemented or documented as requiring a later configuration gate;
- Settings, Profile, and Danger Zone responsibilities are clear;
- if the Profile tab is implemented, it is reachable, responsive, accessible, and does not create public profile browsing or privacy expansion;
- no Vercel/Supabase configuration, deployment, migration, public/guest spectation, service worker, push infrastructure, gameplay-rule change, Elo change, or original stable repository work is introduced without separate authorization;
- focused tests, full verification, visual handoff review when applicable, and a manual review checklist pass before Git handoff.

## Likely Files And Modules

Planning/docs:

- `planning/phase-35/PLANNING-BRIEF.md`
- future `planning/specs/phase-35/`
- future `planning/phase-35/IMPLEMENTATION-PLAN.md`
- future `planning/phase-35/CHANGELOG.md`
- future `planning/phase-35/REVIEW-CHECKLIST.md`
- `planning/README.md`
- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `docs/deployment.md`
- `docs/supabase.md`

Likely source surfaces for later implementation stages:

- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/account/AuthPanel.tsx`
- `src/account/AuthModal.tsx`
- `src/account/PasswordResetModal.tsx`
- `src/account/Settings.tsx`
- `src/account/ProfilePanel.tsx`
- `src/account/AccountBadge.tsx`
- `src/account/auth.ts`
- `src/account/authModalConstants.ts`
- `src/account/profile.ts`
- `src/account/publicProfile.ts`
- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/app/navigationState.ts`

Likely tests:

- Live/view-model/repository/component tests for ranked identity paths;
- account auth/helper/component tests;
- Settings/Profile/AccountBadge tests;
- app/navigation component tests if a Profile tab is added;
- focused real two-client E2E for ranked Live identity where feasible.

## Migration And RLS Constraints

- Phase 35 planning does not authorize migrations.
- Live identity fixes should be source-only if existing Phase 32 participant identity and existing authenticated spectator projections contain the required safe names.
- If ranked Live safe names are missing because a trusted RPC does not expose allow-listed public profile fields for the required context, Phase 35 must stop and create a migration/RLS addendum before SQL execution.
- Public profile defaults remain private; public identity reads remain allow-listed and moderated.
- No raw auth ids, emails, private profile metadata, progress, settings, history, answers, seeds, sessions, queue internals, settlement internals, tokens, or local artifacts may be exposed.

## Vercel And Deployment Constraints

- The Vercel login screen must be treated as a deployment/protection/preview-access diagnosis until proven otherwise.
- This phase may document what to check in Vercel and Supabase dashboards, but may not change those settings unless explicitly authorized later.
- No production deployment or release is authorized.
- No environment variables, tokens, keys, protected URLs, or private dashboard data should be printed or committed.

## Supabase Auth And Account Constraints

- Supabase client code must use public `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` only in browser-exposed config.
- Password and email management must use Supabase auth APIs through safe helpers and user-facing messages.
- Raw provider errors should stay mapped to safe app copy.
- Email-change behavior may require confirmation settings and redirect templates; if so, document and stop before dashboard configuration.
- Public profile updates must preserve Phase 29 validation, visibility, moderation, and avatar URL privacy checks.

## Verification Strategy

Planning/spec stages:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Implementation stages:

- focused tests for each touched Live/account/profile surface first;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- real two-client Supabase-backed E2E for ranked Live identity if feasible;
- full E2E/final gate in final hardening when user-visible auth/profile navigation changes land;
- watched-port/process cleanup checks for browser/E2E work.

## Visual Handoff Review Expectations

If Phase 35 changes Live cards, auth modals, Profile tab, Settings, Danger Zone, or account badge/menu behavior, run the local visual handoff review gate after automated verification and before Git handoff preparation.

Artifacts should remain local-only and ignored under:

`test-results/visual-review/phase-35-*/`

Do not stage or commit screenshots, videos, traces, auth state, tokens, secrets, raw IDs, private profile data, or local session artifacts.

## Manual Review Checklist Expectations

If implementation reaches completion, create:

`planning/phase-35/REVIEW-CHECKLIST.md`

The checklist should include user-testable items for:

- ranked Live safe-name behavior from creator, joiner, and signed-in spectator views;
- Vercel/Supabase auth redirect diagnosis outcomes;
- account creation/sign-in/reset copy;
- password-management behavior;
- email-change behavior or documented deferral;
- Profile tab/account badge behavior if implemented;
- Settings/Danger Zone responsibilities;
- preserved multiplayer, Daily, privacy, gameplay, and Elo invariants.

## GitHub Backup Workflow Expectations

Do not run the brrrdle GitHub backup workflow during planning or implementation unless the user explicitly invokes it.

After clean Git handoff preparation, the recommended backup prompt should invoke the local `brrrdle-github-backup` skill and authorize the all-in-one governed sequence: preflight, branch creation, exact allowlist staging, commit, push, draft PR, visible-check verification, mark ready, squash merge, local `main` update, post-merge sanity, tree-equivalence branch cleanup, and final report.

## Risks

- Ranked Live identity may require a server-side projection correction despite Stage 34's source-only assumption.
- Auth/deployment diagnosis may depend on dashboard configuration that Codex cannot safely change or inspect without explicit authorization.
- Moving profile content into a main tab touches high-conflict navigation and account surfaces.
- Email-change flows can be confusing if Supabase confirmation behavior is not configured or documented clearly.
- Avatar/public profile expansion can accidentally expose raw user IDs or private storage paths if rushed.
- Combining Live regression repair, auth readiness, and Profile tab work is feasible only if staged carefully; otherwise Phase 35 should narrow before implementation.

## Open Decisions

- Should Phase 35 implement the Profile tab in the same phase as auth/deployment readiness, or only specify it and leave implementation to Phase 36?
- Should private and public profile accent colors remain separate, or should Phase 35 simplify them after an audit?
- What larger avatar upload limit is acceptable, and should larger avatars wait for a storage/RLS/public-avatar policy phase?
- Should email-change implementation proceed if local tests can cover helper/UI behavior but deployed Supabase confirmation settings remain unverified?
- What exact deployed URL triggered the Vercel login screen: production, preview, branch preview, or protected deployment?
- Should automatic gameplay-area scroll happen in the navigation ergonomics phase before or after browser back/forward integration?

## Next Gated Prompt

The next safe step is a unified Phase 35 specification for review. It should lock the exact Phase 35 scope before any implementation, especially whether Profile tab work is included in Phase 35 v1 and whether the Live ranked identity regression can proceed source-only.
