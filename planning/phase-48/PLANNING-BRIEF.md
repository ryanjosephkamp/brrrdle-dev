# Phase 48 Planning Brief - Profile And Multiplayer Contract Simplification

**Status:** Draft for review only.
**Created:** 2026-07-06.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Baseline:** local and remote `main` expected at `f3dab778906edc4dad6c8c34365c8354c1affb1f`.

## Authority

This planning brief is authorized only as a documentation and routing artifact. It does not authorize source/runtime implementation, tests, Supabase migrations, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, strict one-active-session/session-lease implementation, server-authoritative Daily implementation, secret exposure, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, local Codex skill changes, or work against the original stable `brrrdle` repository.

Highest applicable authorities:

- current user instructions;
- `CONSTITUTION.md`;
- `BRRRDLE-SPEC.md`;
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`;
- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`;
- completed Phase 47 evidence and the user-updated `planning/phase-47/REVIEW-CHECKLIST.md`;
- current roadmap and testing guidance.

## Current Baseline

Phase 47 is complete, backed up, merged, branch-cleaned, and manually reviewed.

Preserved manual review artifact:

- `planning/phase-47/REVIEW-CHECKLIST.md`

Phase 47 completed and manual review passed for:

- mobile Solo GO keyboard visibility and re-entry scroll repair;
- stricter mobile keyboard bottom-clearance assertions;
- back-to-top positioning near Solo keyboard surfaces;
- signed-out guest/account display-boundary repair;
- stale authenticated sync completion guards;
- preservation of Phase 46 signed-in Solo sync/freshness, Phase 45 Solo account boundaries, and prior phase invariants.

A late real-mobile follow-up observation reported slightly laggy page scrolling after Phase 47. The issue is noticeable but not severe, and it is not currently reported as a failed keyboard-visibility or display-boundary item. Phase 48 should classify this early so a narrow auto-scroll regression can be repaired before deeper work, while broader mobile performance or shell work remains deferred.

## Phase 47 Manual Review Result Summary

Phase 47 manual review was clean for the required checklist behavior. All required, optional, preserved-invariant, and review-result checklist boxes are checked. No failed Phase 47 manual-review item is currently reported.

Late follow-up note:

- real mobile scrolling now feels slightly laggy;
- the lag may be related to automatic page scrolling, but that is not yet proven;
- the issue should be audited and routed early in Phase 48 planning/specification;
- it should not turn Phase 48 into a broad mobile shell or performance phase unless a later addendum explicitly authorizes that.

Phase 48 can safely move back to the profile and multiplayer contract simplification lane that was deferred while urgent mobile, Solo sync, and guest/account boundary repairs were handled.

## Phase-Sizing Decision

Phase 48 should be a cohesive planning phase rather than a runtime implementation pass. The proposed work shares a common theme: simplify player identity and multiplayer invitation contracts without weakening privacy, Daily claim safety, ranked/unranked separation, or existing gameplay/rating invariants.

The phase is appropriately sized if it resolves decision boundaries first and then splits future execution into narrow gates:

- profile/public-profile/private-profile model audit and simplification decision;
- current-player Profile/Settings account-management clarity decision;
- custom-code match type removal, hiding, or redesign decision;
- private Daily request feasibility and Daily claim-safety routing;
- ranked Daily separation and ranked/unranked Daily contract decisioning;
- migration/RLS, storage-contract, Supabase, session, or gameplay-rule addendum routing before any protected change.

This is not the phase to implement social inboxes, spectator presence, strict session leases, server-authoritative Daily, broad mobile shell work, or Elo changes.

The late mobile scroll-lag note should be handled as a small entry gate, not as the main Phase 48 thesis: audit it, decide whether it is a narrow source-only auto-scroll regression, and either include a tiny bounded repair in the future implementation plan or defer it to the later mobile UX shell polish phase.

## Goals

Phase 48 should:

- audit profile, public profile, private profile, Settings, and account-management surfaces for redundant fields, confusing copy, and unclear Save/Sign out placement;
- decide the safest simplification path for current-player private profile controls versus public profile display fields;
- preserve public/private profile privacy boundaries and avoid exposing raw auth identifiers, private emails, private progress, tokens, or local session artifacts;
- audit custom-code/custom-game match types and decide whether they should be removed, hidden, renamed, or redesigned;
- evaluate whether private Daily requests are product-appropriate and compatible with Daily claim safety;
- define ranked Daily and unranked Daily separation requirements before any ranked Daily implementation;
- identify whether any profile or multiplayer contract decision requires a migration/RLS, storage-contract, Supabase, session, or gameplay-rule addendum;
- preserve all completed Phase 47, Phase 46, Phase 45, Phase 44, Phase 43, Phase 42, Phase 41, Phase 40, Phase 39, and Phase 38 invariants;
- audit and route the late Phase 47 real-mobile scroll-lag observation before implementation builds on the current mobile auto-scroll behavior.

## In Scope

- Read-only review of Phase 47 manual review results and completion evidence.
- Profile/public-profile/private-profile field and model simplification planning.
- Profile and Settings account-management clarity planning, including Save/Sign out placement if still confusing.
- Public/private profile privacy and raw-auth/private-data boundary planning.
- Custom-code/private game match type audit and removal, hiding, or redesign decisioning.
- Private Daily request feasibility planning with Daily claim-safety gates.
- Ranked Daily separation and ranked/unranked Daily contract decisioning.
- Migration/RLS, storage-contract, Supabase, session, and gameplay-rule gate identification.
- Testing, visual review, manual checklist, progress, and Git handoff expectations for a future implementation phase.
- Early read-only classification of the late Phase 47 mobile scroll-lag observation, limited to deciding whether it is a narrow auto-scroll regression or later mobile performance/shell work.

## Out Of Scope

- Source/runtime implementation during this planning gate.
- Test implementation during this planning gate.
- Supabase migration creation or execution.
- Vercel or Supabase configuration.
- Deployment, release, staging, commits, pushes, PRs, merges, branch deletion, or backup workflow execution.
- Broad mobile shell/top-tab/navigation overhaul.
- Broad mobile scroll-performance overhaul unless a later addendum explicitly authorizes it.
- Compact/collapsible side dock implementation.
- Configurable Home widgets or private request inbox widgets.
- Live/Active/Home spectator previews.
- Notification redesign.
- Social inbox/mailbox.
- Spectator presence/count/list.
- Service workers or push infrastructure.
- Strict one-active-session/session leases.
- Server-authoritative Daily submissions.
- Gameplay-rule changes, Daily answer-rule changes, scoring changes, or Elo changes.
- Any work against the original stable `brrrdle` repository.

## Recommended Phase 48 v1 Scope

Phase 48 v1 should complete the safest path through:

1. protected baseline and Phase 47 manual-review intake, including late mobile scroll-lag classification;
2. profile/public-profile/private-profile model and privacy audit;
3. source-only versus migration/RLS/storage-contract decision for profile simplification;
4. current-player Profile/Settings account-management clarity plan;
5. custom-code/private/custom-game contract audit and decision;
6. private Daily and ranked Daily feasibility and contract gate decision;
7. final spec/implementation-plan readiness with explicit addendum routing for any protected contract changes.

If any item requires a new table, column, RPC, RLS policy, grant, storage contract, session lease, server-authoritative Daily behavior, Daily claim-rule change, gameplay-rule change, or Elo change, Phase 48 should stop and route that item to a narrow addendum before implementation.

## Recommended Narrow Stage Breakdown

### Stage 48.0 - Protected Baseline And Phase 47 Review Intake

- Confirm repo state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the stable `brrrdle` repository is not in use.
- Preserve `planning/phase-47/REVIEW-CHECKLIST.md`.
- Record current Phase 48 planning/spec/progress artifacts.
- Record and classify the late Phase 47 real-mobile scroll-lag observation.
- Decide whether the next implementation plan needs a tiny source-only auto-scroll regression check/repair before profile work, or whether the issue should be deferred to later mobile UX shell polish.
- Run the baseline verification gate before audit or implementation.

### Stage 48.1 - Profile And Account-Management Surface Audit

- Audit Profile, public profile, Settings, account management, sign-in/out, Save, public visibility, profile field, and profile preview surfaces.
- Identify redundant fields, unclear copy, misleading placement, and privacy-sensitive data boundaries.
- Classify whether simplification can remain source-only or requires schema/RLS/storage addendum planning.

### Stage 48.2 - Profile Privacy And Model Simplification Decision

- Decide the public/private/current-player profile field model.
- Define safe public fields and private-only fields.
- Preserve public opt-in behavior and raw-auth/private-data boundaries.
- Stop and create an addendum if database/RLS/profile projection changes are required.

### Stage 48.3 - Profile/Settings Account-Management Clarity Plan

- Decide whether Save, Sign out, password, email, public visibility, and profile management controls should stay in Profile, Settings, or both.
- Keep the decision source-only unless the model requires storage/Supabase changes.
- Preserve existing auth, password reset, sign-in, sign-up, redirect, and Settings behavior unless a later implementation prompt explicitly authorizes changes.

### Stage 48.4 - Custom-Code And Private Game Contract Decision

- Audit custom-code/custom/private-game surfaces and tests.
- Decide whether custom-code match type should be removed, hidden, renamed, or redesigned.
- Preserve existing private Practice request behavior and Phase 40 public profile/private matchmaking boundaries.
- Stop and route to addendum planning if the decision requires new multiplayer tables, RLS, invitations, inboxes, or social systems.

### Stage 48.5 - Private Daily And Ranked Daily Contract Decision

- Evaluate private Daily request feasibility against Daily claim safety, answer secrecy, UTC-day boundaries, spectator/public discovery boundaries, ranked/unranked separation, and rating authority.
- Decide whether private Daily and ranked Daily should remain deferred, receive a separate addendum, or proceed later through a tightly scoped contract stage.
- Do not implement private Daily, ranked Daily, server-authoritative Daily, Daily replay, or Elo changes inside a planning-only gate.

### Stage 48.6 - Final Planning Hardening And Next-Gate Readiness

- Create or update the unified Phase 48 spec and detailed implementation plan in later gates.
- Ensure manual review checklist expectations and verification strategy cover privacy, profile, custom/private, Daily, ranked, and claim-safety boundaries.
- Prepare a Git handoff path only after future implementation and final verification are complete.

## Success Criteria

Phase 48 planning succeeds when:

- Phase 47 manual review is recorded as clean;
- Profile/public-profile/private-profile simplification goals are explicit;
- current-player Profile/Settings account-management clarity questions are routed;
- custom-code/custom-private match type decisions are framed with clear source-only versus contract-change gates;
- private Daily request feasibility is routed without weakening Daily claim safety;
- ranked Daily and unranked Daily boundaries are defined as a contract decision before implementation;
- migration/RLS, storage-contract, Supabase, session, and gameplay-rule gates are explicit;
- all prior phase invariants are preserved;
- progress, roadmap, and planning-hub updates point to Phase 48 as the next active planning target;
- the late Phase 47 mobile scroll-lag observation is routed as either a narrow source-only preflight repair or a later mobile performance/shell follow-up;
- lightweight documentation verification passes.

## Likely Files And Modules

Profile, public profile, and account management:

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

Multiplayer contracts:

- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/privateMatchmaking.ts`
- `src/multiplayer/privateMatchmaking.test.ts`
- `src/multiplayer/customGames.ts`
- `src/multiplayer/customGames.test.ts`
- `src/multiplayer/dailyMultiplayer.ts`
- `src/multiplayer/matchmaking.ts`
- `src/multiplayer/rating.ts`
- `src/multiplayer/rankedQueueFairnessContract.test.ts`
- relevant private matchmaking, Daily multiplayer, ranked queue, lobby, and public leaderboard E2E tests.

Supabase and documentation:

- `supabase/migrations/`
- `docs/supabase.md`
- `docs/ranked-multiplayer.md`
- `planning/phase-48/`
- `planning/specs/phase-48/`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

Late mobile scroll-lag triage if the unified spec keeps it in the early gate:

- `src/app/gameplayAutoCenter.ts`
- `src/app/games/soloGameplayAutoCenter.ts`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/index.css`
- `e2e/layout/mobile-scroll.spec.ts`

## Source-Only, Migration/RLS, Supabase, Storage-Contract, Session, And Gameplay-Rule Gates

Profile simplification may remain source-only only if:

- it changes copy, layout, grouping, or local view-model shaping without changing stored fields;
- it does not alter public profile projection tables, RLS policies, grants, or account auth data;
- it does not expose private account data or raw auth identifiers.

Custom-code/private/Daily/ranked multiplayer work may remain source-only only if:

- it hides, renames, or routes existing UI without changing stored game rows, queue contracts, trusted RPC behavior, Daily claims, or ranking authority;
- existing private Practice request behavior remains intact;
- ranked Practice fairness and rating behavior remain unchanged.

Create an addendum and stop before implementation if any Phase 48 item requires:

- a new or modified Supabase table, column, RPC, trigger, policy, grant, or view;
- changes to public/private profile data contracts;
- changed private request lifecycle contracts;
- private Daily implementation or new Daily claim semantics;
- ranked Daily implementation or ranked/unranked Daily contract changes;
- server-authoritative Daily submissions;
- strict one-active-session/session leases, forced sign-out, heartbeats, or invalidation;
- gameplay-rule, scoring, Daily answer, timeout, forfeit, or Elo changes.
- broad mobile shell/top-tab/navigation redesign or broad mobile scroll-performance rework.

## Profile, Privacy, And Public-Profile Constraints

- Public profiles must remain opt-in and privacy-safe.
- Public display must not include auth email, raw auth IDs, account tokens, private progress, private match metadata, or unapproved session artifacts.
- Private account-management controls should be clear to the signed-in player but not leak into public profile displays.
- Current-player Profile and Settings should avoid duplicated or conflicting Save/Sign out responsibilities.
- Any profile model change should preserve Phase 40 public profile/private matchmaking boundaries.

## Private, Custom, Daily, And Ranked Multiplayer Contract Constraints

- Private Practice requests remain authenticated-only and unranked unless a later contract explicitly changes that.
- Custom-code/custom-private games should not remain visible as a confusing dead-end if they have no clear product role.
- Private Daily requests must not bypass UTC-day claim safety, answer secrecy, or Daily availability rules.
- Ranked Daily must be separated from unranked Daily before any UI or backend implementation.
- Ranked Daily cannot reuse Practice ranked assumptions without a dedicated competitive-integrity review.
- Ranked/unranked labels, matchmaking, settlement, and rating behavior must stay explicit.

## Daily Claim-Safety Constraints

- Daily Multiplayer remains UTC-day keyed, answer-separated, asynchronous, and claim-safe.
- No private Daily or ranked Daily decision may leak current Daily answers through invitations, previews, spectator surfaces, or public discovery.
- Daily replay, rematch, and repeat-attempt behavior remains out of scope unless a gameplay-rule gate explicitly authorizes it.

## Ranked/Unranked And Elo Constraints

- Match points and Elo/rank movement remain separate.
- Phase 27 and Phase 33 ranked Practice behavior must remain intact.
- Phase 43 ranked queue fairness behavior must remain intact.
- No Elo algorithm change is allowed in Phase 48 planning.
- Any ranked Daily concept requires a later competitive-integrity spec before implementation.

## Privacy And Supabase Constraints

- Do not print Supabase keys, Vercel tokens, auth tokens, account emails, raw auth IDs, local session artifacts, or private row data.
- Browser/E2E work in future stages should use safe test accounts and non-secret logs.
- No migration should be created or applied without separate explicit authorization.
- Public/guest spectator contracts, profile privacy, private matchmaking boundaries, Daily claim safety, ranked queue fairness, and Elo authority must remain unchanged.

## Verification Strategy

Planning/spec stages:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan
- ignored-artifact check
- `git status --short --branch`

Implementation stages, if later authorized:

- focused profile/privacy tests before broad suites;
- focused custom/private/Daily/ranked contract tests before broad suites;
- real Supabase-backed E2E only when a multiplayer or private request claim requires it;
- `npm run lint`;
- `npm run test`;
- focused relevant E2E/browser checks;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`;
- `git status --short --branch`.

Final hardening should add `npm run test:e2e` and `npm run test:full` if Phase 48 source/test work proceeds.

## Visual Handoff Review Expectations

Phase 48 final review should include local-only ignored screenshots under `test-results/visual-review/phase-48-stage-48-final/` or the final stage-specific directory for:

- current-player Profile/Settings account-management surfaces if changed;
- public profile display if changed;
- custom/private multiplayer entry surfaces if changed;
- Daily/ranked multiplayer entry surfaces if changed.

These artifacts must remain ignored and must not be staged or committed.

## Manual Review Checklist Expectations

If Phase 48 implementation later completes, create `planning/phase-48/REVIEW-CHECKLIST.md` with checks for:

- public profile display remains privacy-safe;
- private/current-player profile controls are clear;
- Profile and Settings account-management responsibilities are not duplicated confusingly;
- Save and Sign out placement is understandable;
- custom-code/custom-private game behavior is removed, hidden, or given a meaningful role;
- private Daily and ranked Daily remain deferred or are routed through approved contract gates;
- private Practice request behavior still works;
- Daily claim safety, gameplay rules, ranked Practice behavior, and Elo math remain unchanged.

## GitHub Backup Workflow Expectations

After Phase 48 implementation and manual checklist creation, run a separate Git handoff preparation pass before any backup workflow. A future backup prompt must:

- use an explicit allowlist of changed files;
- exclude `.env*`, `.DS_Store`, `dist/`, `node_modules/`, `supabase/.temp/`, `test-results/`, `playwright-report/`, screenshots, videos, traces, auth state, tokens, Supabase keys, Vercel tokens, local session artifacts, and local Codex skills;
- invoke `brrrdle-github-backup` only when explicitly authorized;
- preserve the stable `brrrdle` repository boundary.

## Risks

- Profile simplification can accidentally mix public display and private account-management concerns.
- Removing or hiding custom-code options can break tests or user paths if they still have hidden dependencies.
- Private Daily and ranked Daily concepts can weaken Daily claim safety if treated as UI-only work.
- Ranked Daily may need a different competitive-integrity model than ranked Practice.
- Migration/RLS changes may be unavoidable for clean profile or invitation contracts, requiring an addendum.
- Session leases and server-authoritative Daily are tempting anti-cheat tools but should remain deferred unless a dedicated design proves they are necessary.
- The late mobile scroll-lag note could be a real Phase 47 auto-scroll regression, but it could also be broader mobile browser performance. Folding broad performance work into Phase 48 would blur the contract-simplification scope.

## Open Decisions

- Which current profile fields are public, private-current-player, internal-only, or redundant?
- Should Save and Sign out live in Profile, Settings, or a clearer split between identity and account safety?
- Does custom-code currently have a real product role, or should it be removed/hidden until redesigned?
- Are private Daily requests compatible with Daily claim safety, or should they stay deferred?
- What would ranked Daily mean relative to Practice ranked queues, Daily claims, and Elo authority?
- Can Phase 48 implementation remain source-only, or does the profile/multiplayer contract need a Supabase/RLS addendum?
- Is the late real-mobile scroll lag caused by recent automatic gameplay scrolling, or should it be deferred to a later mobile performance/shell polish phase?

## Next Gated Prompt

The next safe action is a unified Phase 48 specification for review only. Do not begin implementation until that specification and a detailed implementation plan are created and reviewed.
