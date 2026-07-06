# Progress Step 437 - Phase 48 Stage 48.1 Profile And Account-Management Audit

**Status:** Completed - Awaiting User Review Before Stage 48.2
**Phase:** Phase 48 - Profile And Multiplayer Contract Simplification
**Stage:** Stage 48.1 - Profile, Public Profile, And Account-Management Audit
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-06T03:20:00Z
**Completed:** 2026-07-06T03:24:42Z

## Authorization

The user authorized Phase 48 Stage 48.1 only: a read-only profile, public profile, and account-management audit using the completed Stage 48.0A mobile auto-scroll lag repair baseline.

Authorized work includes confirming repository state and stable-repo boundary, preserving the user-updated `planning/phase-47/REVIEW-CHECKLIST.md`, reading Phase 48 planning/spec/implementation materials, reading progress through `progress/PROGRESS-STEP-436.md`, auditing profile/public-profile/private-profile fields and ownership boundaries, auditing Profile and Settings account-management UX including Save and Sign out placement, identifying duplicated/confusing/unused/unsafe/over-broad profile/account fields, creating this progress report and the matching 12-column CSV row, and running lightweight read-only verification.

This stage does not authorize source/runtime fixes, test implementation, migrations, storage changes, Supabase/Vercel configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, backup workflow execution, spectator presence/count/list, service workers/push, gameplay-rule changes, Elo changes, secrets/private-data/local-artifact exposure, local Codex skill changes, or original stable `brrrdle` repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed branch: `main`.
- Confirmed `HEAD`: `f3dab778906edc4dad6c8c34365c8354c1affb1f`.
- Confirmed `origin/main`: `f3dab778906edc4dad6c8c34365c8354c1affb1f`.
- Confirmed remote: `https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved the user-updated `planning/phase-47/REVIEW-CHECKLIST.md`.

## Audit Scope

Read the Phase 48 planning brief, unified specification, implementation plan, progress through Stage 48.0A, Supabase/RLS notes, package/test context, and the following profile/account surfaces:

- `src/account/profile.ts`
- `src/account/publicProfile.ts`
- `src/account/ProfilePanel.tsx`
- `src/account/ProfilePanel.test.tsx`
- `src/account/Settings.tsx`
- `src/account/Settings.test.tsx`
- `src/account/AuthPanel.tsx`
- `src/account/AuthModal.tsx`
- `src/account/AccountBadge.tsx`
- `src/account/PublicProfilePage.tsx`
- `src/account/publicProfilePrivateMatch.ts`
- `src/account/publicProfile.test.ts`
- `src/leaderboards/publicRankedLeaderboard.ts`
- `src/multiplayer/privateMatchmaking.ts`
- `src/multiplayer/privateMatchmaking.test.ts`
- relevant `src/app/App.tsx` profile, Settings, sign-out, public-profile load/save, and route wiring
- relevant `docs/supabase.md` and Supabase migration references for public profile/RPC boundaries

## Field And Boundary Findings

Current profile ownership is split into two real contracts:

- Private/current-player profile metadata is stored through Supabase auth `user_metadata` via `updateProfile`. The app normalizes `display_name`, `accent_color`, and optional private avatar data, then derives `email`, `label`, `initials`, and gradients for current-user surfaces such as `AccountBadge`, `ProfileEditor`, and Settings account-management copy.
- Public player profile data is stored in `public.public_player_profiles` and accessed only through RPC seams. Owner public profile rows include `public_profile_id`, `display_name`, `accent_color`, `flair_key`, `avatar_url`, `bio`, `visibility`, `moderation_status`, `created_at`, and `updated_at`.
- Public display profile rows intentionally omit owner-only `visibility` and `moderation_status`, while parser guards reject raw auth ids, emails, progress, settings, history, answers, seeds, tokens, sessions, queue ids, rating transaction ids, and other private/internal keys.
- Public ranked leaderboard rows reuse public profile display fields plus aggregate rating fields only, and apply additional forbidden-key guards.
- Private Practice request eligibility depends on an active public owner profile with `visibility='public'`, `moderation_status='active'`, and a display name. Ranked Elo is not required.

No audit evidence showed a current raw-auth/private-data exposure in the profile/public-profile parser paths. The main issue is model and UX clarity, not an emergency privacy failure.

## Confusing Or Duplicated Areas

- `displayName`, `accentColor`, and avatar data exist in both private/current-player metadata and public profile data. This is contractually intentional today, but the UI can make the two ownership domains feel like duplicates instead of separate private account appearance versus opt-in public identity.
- `ProfileEditor` places private account profile controls, a primary `Save`, and `Sign out` before the public profile controls. In the route version, this makes Sign out sit inside the profile-editing form even though Settings also has Account management and Sign out.
- The public profile section has a separate `Save public profile` button, which is contractually correct, but it appears in the same component as private profile save controls without a strong enough ownership split.
- `Public avatar URL` is distinct from the private avatar upload path because private storage paths can contain raw user ids. This is privacy-safe but likely confusing without explicit copy or grouping.
- `flair_key` currently only supports `none`; removing it from the stored/RPC contract would require a migration/RLS/RPC addendum, but UI can hide or downplay it source-only if no payload shape changes occur.
- Settings has improved Account management placement for Sign out, Profile, password, sync, current progress export, reset, and danger-zone copy. It still mixes user-facing account controls with technical progress-export/debug-style controls, which may be a Phase 48 clarity target if kept source-only.

## Stage 48.2 Recommendation

Stage 48.2 can remain documentation/planning decisioning, but the decision should be split:

- Source-only work is safe for UI/account-management clarity: stronger labels, grouping, section ordering, Save/Sign out placement, public versus private ownership copy, hiding low-value UI affordances that do not alter stored data, and focused component tests.
- A migration/RLS/Supabase/storage-contract/privacy addendum is required for any stored profile model simplification: merging private and public profile fields, removing or renaming public-profile columns, changing RPC return/input shapes, changing `visibility` or `moderation_status`, altering `flair_key` storage, changing direct grants/RLS, changing public ranked leaderboard payloads, changing participant identity/private match profile summaries, or moving public identity into auth metadata.
- The safest Phase 48 path is to handle source-only Profile/Settings clarity first, while documenting a later profile-contract addendum path for deeper model consolidation if the user wants stored schema/RPC simplification.

## Files Changed In This Stage

- `progress/PROGRESS-STEP-437.md` - records this Stage 48.1 read-only audit and routing recommendation.
- `progress/PROGRESS.csv` - appended the matching 12-column progress row.

Existing uncommitted Phase 48 planning/spec/progress artifacts and Stage 48.0A source/test changes remain present and unchanged.

## Verification

Passed:

- `git diff --check`
- progress CSV shape check using `python3 -S`: `rows=439 columns=[12] last_id=437`
- non-printing changed/untracked file credential-value scan: `scanned_files=16 credential_value_hits=0 binary_skipped=0`
- ignored-artifact check: `tracked_files=1132 staged_files=0 forbidden_artifact_hits=0`
- watched-port cleanup check: `5173`, `5174`, `3000`, and `4173` clear
- `git status --short --branch`

## Blockers And Open Questions

- No blockers found for Stage 48.2 documentation/planning decisioning.
- Open decision: whether Phase 48 should stop at source-only Profile/Settings clarity or create a separate addendum for deeper profile model/storage/RPC simplification.
- Open decision: whether public avatar URL, public flair, and public/private duplicate field names should be clarified in UI only or simplified in a later contract phase.

## Boundary Confirmation

This stage remained read-only for source/runtime/test/Supabase surfaces and only modified progress documentation. It preserved Phase 47 mobile Solo GO and guest/account display-boundary repairs, Phase 46 Solo sync/freshness and transfer protections, Phase 45 Solo account boundaries, Phase 44 account-scoped repairs, Phase 43 ranked fairness, Phase 42 stats/dashboard/help contracts, Phase 41 multiplayer reliability, Phase 40 public profile/private matchmaking boundaries, Phase 39 mobile scroll smoothness, Phase 38 spectator boundaries, Daily claim safety, gameplay rules, and Elo math.

## Next Gate

The next safe gate is Phase 48 Stage 48.2 profile privacy and model simplification decision only. Do not begin source/runtime implementation or Supabase/storage contract changes without a separate user prompt.
