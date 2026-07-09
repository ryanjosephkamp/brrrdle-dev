# Phase 51 Implementation Plan - Account, Profile, And Player Identity

**Status:** Planning complete; updated by the 2026-07-09 same-phase review follow-up.
**Created:** 2026-07-08.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Baseline:** Phase 50 Golden Checkpoint and closure commit `a8f7fdeb0bfdfd5f25f68c7531588d65b87d7ede`.

## Authorization

This plan describes a future Phase 51 implementation. It does not itself authorize source/runtime edits, tests, migrations, remote Supabase work, deployment configuration changes, Git/GitHub backup, release, public tunneling, minimal-shell UI stripping, or stable `brrrdle` repository work.

## Phase Thesis

Phase 51 should make account and identity surfaces clearer while preserving the Phase 50 gameplay baseline.

The phase should improve:

- how players find Profile, Settings, Sign out, and account actions;
- how the game explains and validates the player's display name;
- how the single public `Player name` relates to account management and player-card details;
- how future private-match, stats, Live identity, and shell redesign work can build on a simpler identity model.

The phase should not change gameplay rules, storage authority for gameplay, reward/scoring/Elo rules, Daily claims, word selection, ranked queue behavior, or multiplayer match lifecycle logic.

## Protected Phase 50 Invariants

Implementation must preserve:

- Solo completion persistence for guest and signed-in players.
- Signed-in Solo cloud persistence and account hydration.
- Practice Solo new-puzzle/new-chain persistence.
- Manual hard/browser refresh landing on Home.
- GO definition deduplication.
- Multiplayer focus/refocus behavior.
- Multiplayer matchmaking, first-turn persistence, private forfeit/cancel behavior.
- Ranked Practice FIFO matchmaking.
- Public-profile/private-request privacy boundaries.
- Existing Home-on-refresh public-profile route handoff exception.

## Stage 51.0 - Baseline, Source Audit, And Test Map

### Goal

Confirm the Phase 50 closure baseline and map the exact account/Profile/player-identity surfaces before edits.

### Required Reading

- `CONSTITUTION.md`
- `BRRRDLE-SPEC.md`
- `planning/phase-51/PLANNING-BRIEF.md`
- `planning/phase-51/INTAKE-CONTEXT-2026-07-08.md`
- `planning/handoffs/GPT-56-MINIMAL-SHELL-HANDOFF-BLUEPRINT-2026-07-08.md`
- `planning/phase-50/CHANGELOG.md`
- `planning/phase-50/REVIEW-CHECKLIST.md`
- `progress/PROGRESS-STEP-500.md`
- `progress/PROGRESS-STEP-501.md`

### Evidence To Confirm

- local `main` and `origin/main` point to the Phase 50 closure commit before source work;
- `prompt-packages/` remains ignored/local-only;
- the stable `brrrdle` repository is not touched.

### Likely Source Surfaces

- `src/account/AccountBadge.tsx`
- `src/account/AccountBadge.test.tsx`
- `src/account/ProfilePanel.tsx`
- `src/account/ProfilePanel.test.tsx`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`
- `src/account/profile.ts`
- `src/account/profile.test.ts`
- `src/account/publicProfile.ts`
- `src/account/publicProfile.test.ts`
- `src/account/PublicProfilePage.tsx`
- `src/account/PublicProfilePage.test.tsx`
- `src/account/publicProfilePrivateMatch.ts`
- `src/account/publicProfilePrivateMatch.test.ts`
- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx` only if the player chip/menu needs existing Focus or shell state.
- `src/app/routes.ts` only if route copy requires a small update.
- account/profile/navigation E2E tests if route behavior changes.

## Stage 51.1 - Shared Player-Name Policy

### Goal

Create or refine source-only helpers so private and public display names use the same safe player-name policy where practical.

### Recommended Policy

Phase 51 v1 should reject names that have already proven risky or are likely to behave inconsistently across current public/multiplayer surfaces:

- empty names after trim;
- control characters;
- line breaks;
- private-use or format characters;
- emoji or symbol-only names;
- names above the existing length cap.

Allow ordinary letters, numbers, spaces, and a small punctuation set sufficient for normal player names. Keep this source-side unless a separate migration/RLS addendum is explicitly authorized.

### Implementation Notes

- Prefer pure helpers in `src/account/profile.ts` and re-use them from `src/account/publicProfile.ts`.
- Preserve existing max-length constants unless there is a strong source-only reason to tighten the display length.
- Avoid server-contract changes. The existing Supabase RPC may still accept broader text if called outside the app; record that as a known backend hardening candidate rather than changing remote schema in this phase.
- Make error copy clear enough that a player understands why an emoji or unsafe symbol was rejected.

### Tests

Add focused unit tests covering:

- valid ordinary names;
- trim behavior;
- max length;
- control-character rejection;
- emoji/symbol rejection;
- public profile save rejection before RPC calls;
- current-player/private display-name normalization behavior.

## Stage 51.2 - Profile Simplification

### Goal

Collapse Profile to one public `Player name` while preserving existing backend contracts.

### Recommended Shape

- Present one primary "Player name" concept.
- Keep account email private and separate from public display.
- Remove separate public/private player-name controls and private-profile name language.
- Save the same validated `Player name` through the existing public-profile display-name seam when available.
- Treat player identity as public for player-facing surfaces.
- Retain optional public avatar URL/bio only if they remain clearly player-card details, not a second identity.
- Preserve separate storage fields behind the scenes if needed for compatibility.

### Acceptable Source-Only Paths

- Rename and reorganize Profile sections so the user sees one coherent identity flow.
- Remove the separate public display-name field from the UI.
- Validate the one `Player name` with the shared helper before all relevant save paths.
- Save current-player and public profile values through existing callbacks/RPCs only.

### Stop Conditions

Stop and route to an addendum if the desired simplification requires:

- removing or renaming database columns;
- changing public profile RPC signatures;
- changing RLS policies or grants;
- auto-rewriting existing remote profile rows outside explicit user saves;
- exposing auth email, raw auth IDs, private progress, queue internals, rating internals, tokens, or local artifacts.

## Stage 51.3 - Settings And Account-Management Clarity

### Goal

Make Profile and Settings responsibilities predictable.

### Expected Responsibility Split

- Profile: public `Player name`, accent/avatar, player-card preview, optional player-card bio/public avatar URL, link to Settings, optional separated Sign out convenience.
- Settings: account management, Sign out, password change, cloud sync, progress export/reset, notification and sound preferences, Danger Zone copy.

### Implementation Notes

- Keep Sign out visually separated from Save actions.
- Keep Danger Zone copy in Settings.
- Avoid moving destructive actions into the profile editor.
- Keep sign-in/create-account affordances available for guests.
- Do not alter auth provider setup, redirect configuration, password reset behavior, or email-change gates.

### Tests

Update component tests to assert:

- Profile no longer presents contradictory private/public name language.
- Sign out remains separated from profile-save controls.
- Settings still contains account-management and Danger Zone content.
- Guest/unconfigured states remain understandable.

## Stage 51.4 - Compact Player Chip/Menu

### Goal

Improve account action discovery from the top-right account surface without beginning a broad shell redesign.

### Candidate Behavior

For signed-in players:

- open a small menu from the player chip;
- include Profile, Settings, and Sign out;
- optionally include Sound and Focus controls only if they can use existing state with small wiring.

For guests:

- open sign-in/create-account cleanly;
- avoid implying cloud sync is active.

For unconfigured environments:

- retain "sync unavailable" clarity.

### Implementation Notes

- Re-use existing UI primitives where possible.
- Keep the menu accessible by keyboard and screen reader.
- Avoid adding new dependencies.
- Avoid moving major navigation or changing route architecture.
- If Focus/Sound integration becomes broad, route those entries to a later shell phase and ship only Profile/Settings/auth actions.

### Tests

Add or update tests for:

- authenticated chip/menu labels and actions;
- guest sign-in action;
- unconfigured disabled/sync-unavailable state;
- menu accessibility basics if the menu is interactive in tests.

## Stage 51.5 - Documentation, Manual Review Checklist, And Review Candidate

### Deliverables

Create or update as appropriate:

- `planning/phase-51/CHANGELOG.md`
- `planning/phase-51/REVIEW-CHECKLIST.md`
- `progress/PROGRESS.csv`
- next `progress/PROGRESS-STEP-*.md`
- ignored next-step prompt package for Review Candidate Backup if implementation verifies cleanly.

### Manual Review Checklist Should Cover

- guest chip/sign-in;
- signed-in chip/menu;
- Profile player-name save with safe names;
- invalid emoji/symbol name rejection;
- one public `Player name` and player-card preview;
- Settings account management and Danger Zone;
- Sign out from the expected location;
- quick smoke that Phase 50 gameplay invariants remain intact.

## Verification Strategy

Run focused tests first:

- `npm run test -- src/account/profile.test.ts src/account/publicProfile.test.ts src/account/ProfilePanel.test.tsx src/account/Settings.test.tsx src/account/AccountBadge.test.tsx`

If route/menu wiring changes, also run focused route/navigation tests:

- `npm run test -- src/app/routes.test.ts src/app/LunarSignalStage.test.tsx`
- targeted Playwright account/navigation smoke if relevant.

Before reporting Phase 51 as a Review Candidate, run the full required gate:

- `npm run lint`
- `npm run test`
- `npm run test:e2e`
- `npm run build`
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- CSV shape check
- non-printing/credential/private-data scan over changed tracked/untracked files plus ignored prompt artifacts
- ignored-artifact check
- watched-port/process check
- `git status --short --branch`

## Failure And Stop Rules

Stop before source edits or after the smallest safe investigation if:

- implementation requires Supabase migration/RLS/RPC/schema/grant/table/bucket changes;
- account/profile changes would expose private data or raw identifiers;
- player-name policy cannot be implemented safely source-side;
- shell/menu work grows into broad navigation redesign;
- gameplay, persistence, scoring, rewards, Elo/rating, Daily claim, ranked queue, or multiplayer lifecycle behavior would need to change;
- verification fails and cannot be fixed narrowly inside Phase 51.

## Later Routes

- Phase 52: private Practice request expansion and request-contract work.
- Phase 53: stats, progression transparency, cloud-stat decisions, and public rating/profile metadata.
- Phase 54: Live/Lobby identity and spectator-adjacent polish.
- Pre-Phase-55 handoff prep: minimal-shell simplification plus GPT-5.6 handoff package.
- Phase 55+: deeper shell, Focus Mode, design-system, theme, and UI/UX modernization work.
