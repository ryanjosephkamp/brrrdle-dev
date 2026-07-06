# Progress Step 463: Phase 50 Stage 50.5 Optional Convenience Audit

**Date**: 2026-07-06
**Status**: Completed - Awaiting User Review Before Stage 50.6-50.7 Optional Convenience Implementation Or Review Candidate
**Stable repository boundary**: The original stable `brrrdle` repository was not touched.

## Authorization

The current prompt authorized only:

- Stage 50.5 read-only source/test audit for optional Profile sign-out and Profile-to-Settings convenience;
- Stage 50.5 read-only source/test audit for optional Progression HUD-to-Stats navigation;
- a concise recommendation deciding whether Stage 50.6 and/or Stage 50.7 should remain in Phase 50;
- progress reporting;
- one ignored local next prompt artifact, if useful.

The prompt did not authorize:

- implementing Profile sign-out, Profile-to-Settings navigation, Progression HUD navigation, or any other runtime/source change;
- adding or changing tests for the optional conveniences;
- storage schema, cloud progress contract, migration, Supabase/RLS/RPC/table/bucket, deployment/configuration, route architecture, shell redesign, Stats redesign, public profile redesign, account deletion, privacy controls, reward/progression formula, gameplay-rule, scoring, Elo/rating, or multiplayer changes;
- Git branch creation, staging, commits, pushes, PRs, merges, releases, deployments, or backup workflow execution;
- original stable `brrrdle` repository work;
- work beyond Stage 50.5 audit.

## Recommendation

Stage 50.6 and Stage 50.7 can remain in Phase 50 as a small source/test-only optional convenience implementation gate, provided the next prompt keeps them bounded to the audited seams and stops on any broader account, storage, route, shell, or Stats requirement.

Recommended next gate:

- execute Stage 50.6 and Stage 50.7 together only if the user wants both tiny conveniences now;
- otherwise skip directly to a Phase 50 Review Candidate/final-follow-up gate.

## Profile/Settings Audit Decision

Stage 50.6 is safe for Phase 50 if limited to a clearly separated Profile account-action area.

Findings:

- `src/app/App.tsx` already defines `handleSignOut` and passes it to both the Profile route and `ProfilePanel`.
- `src/account/ProfilePanel.tsx` already includes `onSignOut` in `ProfileEditorProps` and `ProfilePanelProps`, and `ProfilePanel` already passes it through to `ProfileEditor`.
- `ProfileEditor` currently does not destructure or render `onSignOut`.
- `src/account/ProfilePanel.test.tsx` explicitly expects no `Sign out` button today, so Stage 50.6 must intentionally update that expectation.
- `src/account/Settings.tsx` already renders the canonical Account management section with `Sign out`, `Open Profile tab`, password change, cloud sync, progress export/reset, and danger-zone copy.
- `src/app/App.tsx` already has `handleNavigate('settings')`, and the `settings` route is a normal route in `src/app/routes.ts`.

Safe implementation shape:

- render a Profile account-management affordance only for authenticated users and only when `onSignOut` is available;
- keep Sign out visually and structurally separated from private/public profile Save/Cancel actions;
- keep Settings as the canonical account-management home;
- add a Profile-to-Settings button or link that calls an existing route handler, with no scroll/route architecture rewrite;
- reuse the existing `handleSignOut` behavior and existing auth/profile status messages.

Candidate files/tests:

- `src/account/ProfilePanel.tsx`
- `src/account/ProfilePanel.test.tsx`
- `src/app/App.tsx` only to pass a bounded `onOpenSettings`/route callback if needed
- `src/account/Settings.tsx` and `src/account/Settings.test.tsx` only if a stable Settings account-section anchor or copy expectation is needed

Defer to a later phase or addendum if implementation requires account deletion, privacy controls, public profile redesign, Supabase/storage/schema changes, new auth contracts, a Settings redesign, or a route/scroll architecture rewrite.

## Progression HUD/Stats Audit Decision

Stage 50.7 is safe for Phase 50 if limited to an accessible navigation affordance that preserves HUD display ownership.

Findings:

- `src/app/ProgressionHud.tsx` is display-only today and derives values through `createProgressionHudViewModel`.
- `src/app/ProgressionHud.test.tsx` already protects display-only Level, Coins, XP, active-scope rendering, and no mutation.
- `src/app/App.tsx` mounts `<ProgressionHud progression={guestProgress.progression} />` in the `LunarSignalStage` `progressionHud` slot.
- `src/app/LunarSignalStage.tsx` renders that slot inside the topbar account stack, not inside another button.
- `src/app/routes.ts` already includes the `stats` route, and `RoutePanel` already renders `StatsDashboard` when `route.id === 'stats'`.
- `src/stats/StatsDashboard.tsx` already includes local progression/history/stat details, XP progress, coin trend, and public site stats separation.

Safe implementation shape:

- keep the HUD compact and display-only for value ownership;
- add an optional `onOpenStats` or similarly named callback to `ProgressionHud`, passed from `App.tsx` as `() => handleNavigate('stats')`;
- make the affordance keyboard and screen-reader activatable, either with a contained button or a carefully styled button-like root that preserves existing accessible labels and progressbar semantics;
- preserve all displayed HUD values and active-scope privacy behavior;
- avoid changes to Stats content, charts, public stats, route architecture, or progression formulas.

Candidate files/tests:

- `src/app/ProgressionHud.tsx`
- `src/app/ProgressionHud.test.tsx`
- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx` and `src/app/LunarSignalStage.test.tsx` only if slot/container semantics need an assertion update
- `src/stats/StatsDashboard.test.tsx` only if the Stats target copy or integration changes, which the audit does not recommend
- `src/index.css` only for minimal focus/hover styling if the existing HUD styles need to support the new control without layout shift

Defer to a later phase or addendum if implementation requires a Stats redesign, new public resource exposure, progression/reward formula changes, persistent Focus Mode or shell settings, a broad shell/topbar redesign, or route architecture changes.

## Explicit Deferrals

Still out of scope for Phase 50.6-50.7 unless a later prompt explicitly changes authorization:

- account deletion and privacy controls;
- public profile redesign;
- Settings redesign;
- Stats redesign, rank history, cloud-stats changes, or new charts;
- storage schema, cloud progress contract, Supabase/RLS/RPC/table/bucket, migration, or deployment changes;
- reward/progression formula, gameplay-rule, scoring, Elo/rating, multiplayer, or shell redesign changes;
- Git/GitHub actions, backup workflow execution, release, deployment, merge, or stable repository work.

## Next Prompt Artifact

Created ignored local prompt artifact:

- `prompt-packages/phase-50/PHASE-50-STAGE-50-6-50-7-OPTIONAL-CONVENIENCE-IMPLEMENTATION-PROMPT-2026-07-06.md`

This next prompt authorizes only the optional Stage 50.6-50.7 source/test-only convenience implementation if the user approves it. It does not authorize Stage 50.8, Review Candidate work, Git/GitHub work, deployment, or backup.

## Verification

Passed:

- `git diff --check`
- CSV shape check: `rows=465`, `data_rows=464`, `columns=12`, `widths=[12]`, `last_id=463`.
- Non-printing/credential-value scan over changed tracked/untracked files plus ignored prompt artifacts: `scanned_files=34`, `credential_value_hits=0`, `nonprinting_hits=0`, `binary_skipped=0`.
- Ignored-artifact check: `tracked_files=1167`, `staged_files=0`, `changed_files=31`, `forbidden_tracked=0`, `forbidden_staged=0`, `forbidden_changed=0`, `ignored_checks_ok=[True, True, True, True]`.
- `git status --short --branch`

Notes:

- No dev server or browser E2E was run because Stage 50.5 was a read-only audit and source facts were visible in existing files.
- No source/runtime code or optional convenience tests were changed.

## Stop Gate

Stop here for user review. Stage 50.5 audit is complete. Stage 50.6/Profile implementation, Stage 50.7/HUD implementation, Stage 50.8 routing documentation, Phase 50 Review Candidate, Manual Review Window, Git/GitHub handoff or backup, deployment, release, merge, and stable-repository work remain unexecuted and require separate explicit authorization.
