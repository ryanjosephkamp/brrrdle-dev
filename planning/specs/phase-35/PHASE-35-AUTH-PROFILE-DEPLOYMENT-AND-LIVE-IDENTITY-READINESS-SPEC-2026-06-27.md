# Phase 35 Auth, Profile, Deployment, And Live Identity Readiness Spec

**Status:** Unified specification for review.
**Repository:** `brrrdle-dev` only.
**Created:** 2026-06-27.
**Baseline:** `main` and `origin/main` expected at `41f37c3a3734be71a2078a60f7aece46543db5fb`.

## Authority

This specification is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, the Phase 35 planning brief, completed Phase 34 Multiplayer Live/Lobby/notification stabilization, completed Phase 33 competitive ladder readiness, completed Phase 32 multiplayer stabilization and participant identity routing, completed Phase 31 postgame actions, completed Phase 30 public leaderboards, completed Phase 29 public profile privacy foundations, completed Phase 28 read-only Live behavior, completed Phase 27 ranked Practice foundations, `docs/deployment.md`, `docs/supabase.md`, `docs/ranked-multiplayer.md`, and the progress ledger.

This document is a planning/specification artifact only. It does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, or original stable `brrrdle` repository work.

## Current Baseline

Phase 34 is complete, backed up, merged, branch-cleaned, and manually reviewed. The user reported that the Phase 34 checklist items work, but the manual review found one persistent bug in the Live subtab.

User evidence reviewed for Phase 35 routing:

- `/Users/noir/Desktop/player1.png`: creator participant view for `claudine`; ranked and unranked Live cards show `kiki` correctly.
- `/Users/noir/Desktop/player2.png`: joined participant view for `kiki`; the ranked Live card falls back to `Rival` where it should show `claudine`, while an adjacent unranked card resolves `claudine`.
- `/Users/noir/Desktop/spectator.png`: signed-in nonparticipant spectator view; the ranked Live card falls back to `Player one vs kiki` and `Player one's turn` where it should show `claudine vs kiki` and `claudine's turn`, while an adjacent unranked card resolves correctly.
- The earlier Vercel login screenshot shows a Vercel-owned login page after a magic-link attempt. This is more likely to involve deployment protection, preview access, redirect configuration, or a combination than a pure in-app Supabase auth bug, but Phase 35 must verify the redirect chain before drawing conclusions.

Relevant existing implementation facts:

- Participant Live card labels currently depend on the local `MultiplayerGame` projection and `getMultiplayerPlayerDisplayLabel`.
- Signed-in spectator Live cards depend on sanitized authenticated spectator rows and `getSpectatorPlayerDisplayLabel`.
- Phase 32 added a participant identity RPC that returns only safe identity fields.
- Existing auth/account foundations include magic link, email/password sign-in, password sign-up, password recovery URL handling, a password reset modal, private profile editing, public profile controls, optional avatar upload, and Settings account panels.
- `dangerZone.ts` already has low-level password reset and email change helpers, but the player-facing account-management story is not yet coherent.

The user-edited `planning/phase-34/REVIEW-CHECKLIST.md` must be preserved.

## Goals

1. Repair or precisely scope the persistent ranked Live safe-name regression before broader account/profile work begins.
2. Determine whether any missing ranked Live safe identity data requires a narrow migration/RLS addendum before source implementation.
3. Diagnose the Vercel magic-link login behavior without changing Vercel or Supabase configuration in this phase unless a later prompt explicitly authorizes it.
4. Verify Supabase auth redirect, callback, and password recovery assumptions against the current app URL model.
5. Improve confusing account creation and auth copy where source-only and low risk.
6. Make normal account management discoverable, especially password reset/change-password and email-change expectations.
7. Clarify Settings, Danger Zone, and profile responsibilities.
8. Add a first-class current-player `Profile` tab if implementation planning confirms the tab can remain source-only, current-user-only, and privacy-safe.
9. Preserve every Phase 34, Phase 33, Phase 32, Phase 31, Phase 30, Phase 29, Phase 28, Phase 27, Daily Multiplayer, gameplay, and Elo invariant.

## In Scope

### Ranked Live Safe-Name Regression

Phase 35 must start with a ranked Live identity audit. The audit must compare:

- ranked versus unranked participant Live cards;
- ranked versus unranked authenticated spectator Live cards;
- creator participant, joined participant, and signed-in nonparticipant perspectives;
- local `MultiplayerGame.playerProfiles`, `players[].label`, and ranked queue/finalized game projections;
- authenticated spectator row `players[].profile`, `players[].label`, and seat fallback behavior;
- Phase 32 participant identity RPC availability for ranked finalized games;
- stale local cache and DTO parsing behavior.

Expected behavior:

- Participant Live cards prefer safe profile/public identity for the opponent when available.
- Authenticated spectator Live cards prefer safe profile/public identity for both players when available.
- `Rival`, `Player one`, `Player two`, or equivalent generic labels appear only when safe identity is genuinely unavailable.
- `You` appears only for the current viewer's own participant perspective and never as an opponent label.
- No raw auth emails, raw auth ids, private profile fields, answers, seeds, sessions, queue internals, rating transaction ids, settlement ids, tokens, or local artifacts are exposed.

If the audit proves existing safe data is available but mapped incorrectly, Stage 35 implementation may be source-only. If the audit proves safe ranked Live identity data is not available through existing allowed projections, Stage 35 must stop for a narrow migration/RLS addendum before SQL or source integration.

### Auth And Deployment Readiness

Phase 35 includes a source/documentation audit of:

- Vercel deployment protection or preview access behavior for the tested URL;
- magic-link redirect destinations;
- Supabase Site URL and allowed redirect URL assumptions;
- password recovery URL handling through `auth_action=reset-password` and Supabase recovery hash events;
- app-side messaging when auth succeeds, awaits email confirmation, or fails safely.

Vercel and Supabase dashboard configuration changes are not in scope during implementation unless explicitly authorized later.

### Auth Copy And Account Management

Phase 35 may make source-only improvements to:

- account creation confirmation copy;
- magic-link, password sign-in, password sign-up, and reset-password descriptions;
- signed-in password change or password reset access;
- email-change flow if it can be implemented and tested safely without undocumented dashboard assumptions;
- safe status and validation messages that do not expose raw provider errors.

If email change requires a dashboard/configuration decision, the implementation must document the exact gate and defer configuration.

### Profile Tab And Settings Responsibility

Phase 35 should include a first-class current-player `Profile` tab in v1 if the detailed implementation plan confirms it can remain source-only and narrow.

Profile tab requirements:

- Add a main navigation tab named `Profile`, recommended between `Words` and `Settings`.
- The tab is for the signed-in current player's private profile, public profile controls, account identity, password/email management entry points, and sign-out.
- Signed-out players may see a compact sign-in/create-account prompt and a short explanation of what profile controls require sign-in.
- The top-right account badge remains a compact global account affordance and may open a smaller menu or shortcut to the `Profile` tab rather than the full profile editor.
- Settings remains for gameplay defaults, notification preferences, sync status, sound, and guest/local progress.
- Danger Zone remains for destructive or high-risk actions with explicit typed confirmations.

Profile tab privacy boundaries:

- No public profile browsing for other players.
- No clickable public player profile pages.
- No public/guest spectation.
- No raw auth ids or emails exposed in public/player-facing public contexts.
- No public avatar storage expansion unless a later migration/storage policy explicitly authorizes it.
- Existing public profile default-private and moderation boundaries remain intact.

Avatar/accent policy in Phase 35:

- Phase 35 may audit the private/public accent split and the 200 KB private avatar upload limit.
- Phase 35 may improve copy or organization around avatar and accent controls.
- Full public avatar upload/storage expansion, larger public image policy, moderation, and raw-id-safe storage design are deferred to a later profile/social phase unless the detailed implementation plan proves a very small source-only adjustment is safe.

## Out Of Scope

- Source/runtime implementation during this spec pass.
- Supabase migration creation or execution unless a later Stage 35 addendum prompt explicitly authorizes it.
- Vercel or Supabase dashboard configuration changes.
- Deployment, release, staging, commits, pushes, pull requests, merges, branch deletion, or GitHub backup execution.
- Public/guest spectation.
- Spectator lists, spectator counts, spectator sorting, or public spectator projections.
- Public profile pages for other players, clickable rival profile navigation, social/profile browsing, mailbox-style match requests, or direct player matchmaking.
- Custom-code/private matchmaking expansion.
- New `Leaderboard` tab or Stats split.
- Gameplay-area auto-scroll.
- Browser back/forward navigation integration.
- Public site stats, developer dashboard, telemetry, analytics products, or admin views.
- Beginner onboarding/help/tutorial implementation.
- Theme proposal modernization or concrete theme implementation.
- Service workers, push subscriptions, background push, or cross-device notification infrastructure.
- Gameplay-rule changes, Elo algorithm changes, scoring changes, timeout changes, forfeit changes, or settlement authority changes.
- Work in the original stable `brrrdle` repository.

## Later-Phase Routing

| Request or observation | Route | Notes |
| --- | --- | --- |
| Persistent ranked Live safe-name bug | Phase 35 | First implementation gate. |
| Vercel magic-link login screen | Phase 35 | Diagnose protection and redirects before configuration. |
| Supabase auth redirect/callback assumptions | Phase 35 | Audit and document required settings. |
| Account confirmation copy | Phase 35 | Source-only copy improvement. |
| Password reset/change-password | Phase 35 | Use existing auth primitives where safe. |
| Email change | Phase 35 if source-only; otherwise config gate | Do not guess dashboard behavior. |
| Settings/Danger Zone cleanup | Phase 35 | Clarify non-destructive versus destructive responsibilities. |
| Current-player Profile tab | Phase 35 v1 if source-only | No public browsing. |
| Private/public accent simplification | Phase 35 audit, possible narrow source change | Preserve public profile privacy. |
| Larger/public avatar image support | Later profile/social/storage phase | Needs storage, moderation, and raw-id-safe rules. |
| New `Leaderboard` tab and Stats split | Phase 36 | Next near-term navigation/content reorganization. |
| Gameplay-area auto-scroll | Phase 37 | Navigation/gameplay ergonomics. |
| Browser back/forward support | Phase 37 or later | Requires careful history model. |
| Public/guest spectation | Phase 38 or later | Requires sanitized projections and privacy/RLS planning. |
| Spectator list/count/sorting | Phase 38 or later | Presence semantics and privacy review needed. |
| Public profile pages and clickable player names | Phase 39 or later | Requires routing, moderation, abuse handling. |
| Custom-code private games and direct requests | Phase 39 or later | Keep ranked and Daily excluded by default. |
| Public site stats and developer dashboard | Phase 40 or later | Requires telemetry/privacy/admin design. |
| Onboarding/help/tutorial | Phase 40 or later | Best after account and navigation settle. |
| Theme work | Phase 41 or later | Wait for larger surface structure to settle. |

## Success Criteria

Phase 35 is successful when:

- Ranked Live participant and signed-in spectator cards use safe public/profile names consistently across creator, joined-player, and nonparticipant perspectives.
- Generic labels appear only for genuinely missing safe identity data and are covered by tests.
- Any required migration/RLS addendum is explicitly written and reviewed before SQL execution.
- Vercel login behavior is diagnosed as deployment protection, preview access, Supabase redirect configuration, app callback handling, or a documented combination.
- Auth copy no longer tells users that confirmation email behavior is conditional in a confusing way.
- Password reset and signed-in password-change behavior are discoverable and tested.
- Email-change behavior is either implemented safely or documented as blocked by a specific configuration gate.
- Settings, Danger Zone, and Profile tab responsibilities are clear.
- A current-player Profile tab exists if approved by the implementation plan, with responsive and accessible behavior.
- Public profile privacy, Live read-only behavior, Daily integrity, ranked Practice trust, timed ranked behavior, public leaderboard display-only authority, and gameplay/Elo rules remain unchanged.
- Visual handoff and manual review artifacts are generated for user-visible changes before Git handoff.

## Recommended Stage Breakdown

### Stage 35.0: Protected Baseline

- Read governance, Phase 35 planning/spec materials, Phase 34 completion evidence, account/auth/profile/deployment docs, and relevant Live identity surfaces.
- Confirm repository state, branch, remotes, `HEAD`, and `origin/main`.
- Preserve user edits to `planning/phase-34/REVIEW-CHECKLIST.md`.
- Run resource/process checks.
- Run the baseline verification gate before implementation.

### Stage 35.1: Ranked Live Identity Audit And Scope Lock

- Audit and reproduce the `player1.png`, `player2.png`, and `spectator.png` ranked Live identity mismatch.
- Compare ranked and unranked participant/spectator data paths.
- Decide whether Stage 35.2 is source-only or requires a migration/RLS addendum.
- Do not begin auth/profile implementation until this decision is recorded.

### Stage 35.2: Ranked Live Identity Repair Or Addendum

- If source-only, fix mapping, parsing, merge, or stale-cache behavior with focused tests.
- If data projection is insufficient, create a narrow migration/RLS addendum and halt before SQL execution.
- Verify creator participant, joined participant, and signed-in spectator ranked Live name behavior with focused tests and real two-client Supabase-backed coverage where feasible.

### Stage 35.3: Auth/Deployment Redirect Audit

- Inspect app-side auth redirect handling, password recovery markers, magic-link assumptions, and deployment docs.
- Produce a non-secret checklist for Vercel protection and Supabase Site URL/redirect URL settings.
- Do not change Vercel or Supabase configuration.

### Stage 35.4: Auth Copy And Account Management

- Improve sign-up, magic-link, sign-in, and reset copy.
- Add or consolidate signed-in change-password access.
- Add email-change flow only if safe without unverified config assumptions; otherwise document the gate.
- Add focused helper and component tests.

### Stage 35.5: Current-Player Profile Tab And Settings Cleanup

- Add a main `Profile` tab if the implementation plan approves it.
- Move or reuse current private/public profile controls in that tab.
- Keep the top-right badge as a compact global account affordance.
- Rebalance Settings and Danger Zone copy/responsibilities without broad redesign.
- Add responsive/accessibility tests.

### Stage 35.6: Final Hardening, E2E, Visual Review, Manual Checklist

- Review all Phase 35 changes for stale copy, duplicated logic, privacy gaps, and regression risk.
- Run focused and broad verification.
- Create `planning/phase-35/CHANGELOG.md`.
- Create `planning/phase-35/REVIEW-CHECKLIST.md`.
- Run the visual handoff review gate for Live identity, auth/account, Profile tab, and Settings surfaces.
- Prepare for the governed GitHub backup flow only after user review.

## Likely Files And Modules

Likely source surfaces for later implementation:

- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/account/AuthModal.tsx`
- `src/account/AuthPanel.tsx`
- `src/account/PasswordResetModal.tsx`
- `src/account/ProfilePanel.tsx`
- `src/account/AccountBadge.tsx`
- `src/account/Settings.tsx`
- `src/account/auth.ts`
- `src/account/dangerZone.ts`
- `src/account/profile.ts`
- `src/account/publicProfile.ts`
- `src/app/App.tsx`
- Shared navigation and tab tests as needed.

Likely documentation/planning surfaces:

- `docs/deployment.md`
- `docs/supabase.md`
- `planning/phase-35/IMPLEMENTATION-PLAN.md`
- `planning/phase-35/CHANGELOG.md`
- `planning/phase-35/REVIEW-CHECKLIST.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

Likely SQL/RLS surfaces only if an addendum is required:

- `supabase/migrations/20260624233635_phase32_participant_identity_rpc.sql`
- relevant authenticated Live spectator RPC migrations
- ranked queue/finalization migrations that shape ranked game participant identity availability

## Migration And RLS Constraints

No migration should be created or executed unless Stage 35.1 proves current sanitized projections cannot provide the required safe identity data.

If an addendum is required, it must specify:

- exact RPC/table behavior that fails the ranked Live identity use case;
- additive SQL only;
- allow-listed safe identity fields only;
- no raw auth emails, raw auth ids, private profile metadata, progress, settings, history, answers, seeds, sessions, queue internals beyond necessary participant context, rating transaction ids, settlement ids, tokens, local artifacts, or public/guest spectator projections;
- grants and RLS behavior;
- non-printing probe expectations;
- rollback notes;
- E2E coverage expectations.

## Vercel And Supabase Constraints

Phase 35 may inspect and document expected settings, but must not change external configuration without a later prompt.

The auth/deployment audit should answer:

- Is the tested URL a protected Vercel preview or protected deployment?
- Does the magic-link email redirect to a protected URL?
- Does the app have the expected origin for magic-link and password recovery flows?
- Are Supabase Site URL and allowed redirect URLs documented for local, preview, and eventual production?
- Does the app need source changes to pass an explicit redirect target to `signInWithOtp`, or is this a project settings issue?
- Are password recovery redirects already scoped through `auth_action=reset-password`?

## Verification Strategy

Planning/spec pass verification:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check for `.env*`, `dist/`, `node_modules/`, `test-results/`, `playwright-report/`, screenshots, videos, traces, auth state, tokens, and local session artifacts
- `git status --short --branch`

Implementation verification expectations:

- focused unit tests for Live participant and spectator label mapping;
- focused repository/DTO tests for ranked safe identity parsing;
- component tests for Live cards, auth copy, account-management controls, Profile tab, Settings, and top-right account affordance;
- real two-client Supabase-backed E2E for ranked Live identity where feasible;
- auth/account browser checks without printing secrets or using private user data;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e` where relevant;
- `npm run test:full` before completion if touched surfaces are broad;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact scan;
- ignored-artifact check;
- watched-port/process cleanup checks.

## Visual Handoff Review Expectations

Before Phase 35 Git handoff preparation, run the local visual handoff review gate for user-visible Phase 35 surfaces:

- ranked Live card from creator participant perspective;
- ranked Live card from joined participant perspective;
- ranked Live card from signed-in nonparticipant perspective;
- auth modal sign-in/sign-up/magic-link copy;
- password reset/change-password flow;
- email-change or documented gate copy, if implemented;
- Profile tab signed-out and signed-in views, if implemented;
- Settings and Danger Zone account responsibility changes.

Artifacts must remain ignored/local-only under `test-results/visual-review/...` and must not be staged or committed.

## Manual Review Checklist Expectations

At Phase 35 completion, create `planning/phase-35/REVIEW-CHECKLIST.md` with user-testable items for:

- ranked Live creator participant names;
- ranked Live joined participant names;
- ranked Live signed-in spectator names;
- fallback label behavior when safe identity is unavailable;
- Vercel/Supabase auth redirect diagnosis evidence;
- account creation copy;
- password reset/change-password flow;
- email-change flow or documented configuration gate;
- Profile tab behavior if implemented;
- Settings/Danger Zone responsibility cleanup;
- preservation of Phase 34, Phase 33, Phase 32, Phase 31, Phase 30, Phase 29, Phase 28, Phase 27, Daily, gameplay, and Elo invariants.

## GitHub Backup Expectations

After Phase 35 is implemented, verified, visually reviewed, and manually checklisted, the Git handoff preparation prompt should prepare an exact file allowlist. If clean and the user authorizes backup, future generated backup prompts should invoke the local `brrrdle-github-backup` skill for the all-in-one governed backup workflow unless the user explicitly requests stepwise Git gates or forbids merge/cleanup.

## Risks

- The ranked Live identity regression may be caused by missing sanitized data from ranked queue finalization rather than app-side rendering.
- A migration/RLS fix could accidentally expose identity fields too broadly if not scoped carefully.
- Vercel deployment protection can look like an app auth failure when it is actually an access-control setting outside the app.
- Supabase email confirmation and email-change behavior may depend on dashboard settings that cannot be verified safely from source alone.
- Adding a Profile tab touches main navigation and `App.tsx`, so it should be staged after the identity/auth audit.
- Avatar public/private behavior has raw-id and moderation implications; expanding it too early could weaken Phase 29 privacy boundaries.

## Open Decisions

- Is the ranked Live identity bug source-only, or does it require an additive migration/RLS addendum?
- Should magic-link sign-in pass an explicit redirect target in source, or should Phase 35 only document Supabase/Vercel settings?
- Should email-change be implemented in Phase 35 or documented behind a configuration gate?
- How should the top-right account badge behave after the Profile tab exists: small menu, direct tab navigation, or compact profile modal?
- Should private and public accent colors remain separate after Phase 35, or should a later profile/social phase simplify them?
- Should avatar upload size increase wait until public profile/storage policy work, or can a modest private-only limit change be safely made?

## Next Gated Action

If this unified specification is approved, the next safe action is to create `planning/phase-35/IMPLEMENTATION-PLAN.md`. That plan should convert this spec into a staged execution sequence beginning with Stage 35.0 protected baseline and Stage 35.1 ranked Live identity audit only. It must not begin implementation.
