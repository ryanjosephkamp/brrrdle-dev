# Progress Step 438 - Phase 48 Stage 48.2 Profile Privacy And Model Simplification Decision

**Status:** Completed - Awaiting User Review Before Stage 48.3
**Phase:** Phase 48 - Profile And Multiplayer Contract Simplification
**Stage:** Stage 48.2 - Profile Privacy And Model Simplification Decision
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-06T03:26:00Z
**Completed:** 2026-07-06T03:33:45Z

## Authorization

The user authorized Phase 48 Stage 48.2 only: documentation/planning decision for profile privacy and model simplification using the completed Stage 48.1 audit baseline.

Authorized work includes confirming repository state and stable-repo boundary, preserving the user-updated `planning/phase-47/REVIEW-CHECKLIST.md`, reading Phase 48 planning/spec/implementation materials and Stage 48.1 findings, deciding profile model direction and source-only versus addendum boundaries, creating this progress report and the matching 12-column CSV row, and running lightweight verification.

This stage does not authorize source/runtime code changes, test implementation, migrations, storage changes, Supabase/Vercel configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, backup workflow execution, spectator presence/count/list, service workers/push, gameplay-rule changes, Elo changes, secrets/private-data/local-artifact exposure, local Codex skill changes, or original stable `brrrdle` repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed branch: `main`.
- Confirmed `HEAD`: `f3dab778906edc4dad6c8c34365c8354c1affb1f`.
- Confirmed `origin/main`: `f3dab778906edc4dad6c8c34365c8354c1affb1f`.
- Confirmed remote: `https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved the user-updated `planning/phase-47/REVIEW-CHECKLIST.md`.

## Decision Summary

Stage 48.3 can remain source/test-only. No profile-contract addendum is required before the next gate if Phase 48 keeps the implementation to Profile/Settings clarity, Save/Sign out placement, public/private ownership copy, grouping, and tests.

No addendum was created in this stage.

The deeper stored profile model is not being simplified in Phase 48 v1. It remains behind a later profile-contract addendum because it touches Supabase table/RPC/RLS contracts and public/private identity boundaries.

## Profile Model Direction

### Private/Current-Player Fields

Keep the current private/current-player profile model unchanged:

- Source: Supabase auth `user_metadata`.
- Source helper: `src/account/profile.ts`.
- Write seam: `updateProfile` through Supabase auth.
- Current stored fields: private display name, private accent color, optional private avatar value.
- Derived current-player fields: email, label, initials, and gradient.
- Scope: signed-in current-player UI only, including `AccountBadge`, Profile editor, and account-management display.

These fields may be clarified in UI copy, but they must not be treated as public profile fields or pushed into public profile RPC payloads.

### Opt-In Public Profile Fields

Keep the public profile contract unchanged:

- Source: `public.public_player_profiles`.
- RPC seams: `get_my_public_player_profile`, `upsert_my_public_player_profile`, `get_public_player_profile`, and `get_public_player_profiles`.
- Owner fields: opaque `public_profile_id`, display name, accent color, flair key, avatar URL, bio, visibility, moderation status, created timestamp, updated timestamp.
- Public display fields: opaque `public_profile_id`, display name, accent color, flair key, avatar URL, bio, created timestamp, updated timestamp.

Public profile fields remain opt-in, privacy-safe, RPC-only, and separate from private auth metadata.

### Public Ranked Leaderboard Fields

Keep public ranked leaderboard display unchanged:

- Public ranked leaderboard rows may use active public profile display fields plus aggregate ranked Practice leaderboard fields.
- Parser guards must continue rejecting raw auth ids, auth emails, private profile fields, progress/settings/history, answer-bearing data, seeds, sessions, queue internals, rating transaction ids, tokens, and local artifacts.
- Public ranked leaderboard display remains read-only and must not change Elo, trusted settlement, Daily claims, or public profile visibility.

### Participant Identity And Private Practice Request Fields

Keep participant identity and private Practice request profile summaries unchanged:

- Participant identity payloads may include safe display summaries only.
- Private Practice requests remain authenticated-only, unranked Practice-only, and dependent on active public profiles.
- Active public requester eligibility remains `visibility='public'`, `moderation_status='active'`, and a display name.
- Browser accept payloads must not include raw `playerUserIds`; server-side RPC handling remains the authority for raw participant ids.

### Low-Value Or Confusing Fields

Handle low-value or confusing fields source-only in Stage 48.3:

- Public `flair_key` currently only supports `none`; do not remove it from storage/RPC contracts now. Hide, de-emphasize, or avoid highlighting it in UI if that makes Profile/public-profile screens clearer.
- Public avatar URL remains distinct from private avatar upload because private avatar storage paths may contain raw user ids. Improve copy/grouping instead of merging fields.
- Duplicate private/public names such as display name, accent color, and avatar should be clarified by section labels and helper copy rather than merged in storage.

## Source-Only Boundary For Stage 48.3

Stage 48.3 may implement source/test-only UI clarity if limited to:

- grouping current-player private profile controls separately from public profile controls;
- renaming labels or helper copy to make private versus public ownership explicit;
- improving Save and Sign out placement so Sign out is not confused with profile-save actions;
- keeping Settings as the account-management home for Sign out, password, sync, progress export/reset, and gated account actions;
- keeping Profile focused on current-player identity and public profile opt-in controls;
- hiding or de-emphasizing public `flair_key` UI if no stored/RPC payload changes are needed;
- clarifying why public avatar URL is separate from private avatar upload;
- adding focused component tests for Profile/Settings copy, grouping, and button placement.

## Addendum Gates

Stop and create a reviewed addendum before implementation if the desired simplification requires any of the following:

- new or changed Supabase table, column, view, trigger, policy, grant, or RPC;
- direct browser table reads/writes for public profile data;
- merging private auth metadata with `public.public_player_profiles`;
- moving public identity into auth metadata;
- removing or renaming stored public profile fields;
- changing public profile RPC input or return shapes;
- changing `visibility`, `moderation_status`, or public-profile activation rules;
- changing public ranked leaderboard profile payloads;
- changing participant identity or private Practice request profile summary payloads;
- changing private Practice request eligibility;
- migrating storage keys or destructively cleaning local or cloud data;
- exposing raw auth ids, emails, auth metadata, private progress, private settings, answers, seeds, sessions, queue internals, rating transaction ids, service ids, tokens, or local artifacts.

## Files Changed In This Stage

- `progress/PROGRESS-STEP-438.md` - records this Stage 48.2 profile privacy/model decision.
- `progress/PROGRESS.csv` - appended the matching 12-column progress row.

Existing uncommitted Phase 48 planning/spec/progress artifacts and Stage 48.0A source/test changes remain present and unchanged.

## Verification

Passed:

- `git diff --check`
- progress CSV shape check using `python3 -S`: `rows=440 columns=[12] last_id=438`
- non-printing changed/untracked file credential-value scan: `scanned_files=17 credential_value_hits=0 binary_skipped=0`
- ignored-artifact check: `tracked_files=1132 staged_files=0 forbidden_artifact_hits=0`
- watched-port cleanup check: `5173`, `5174`, `3000`, and `4173` clear
- `git status --short --branch`

## Blockers And Open Questions

- No blockers found for source/test-only Stage 48.3 Profile/Settings clarity work.
- Open decision for a later phase or addendum: whether to consolidate the stored private/public profile model after the source-only clarity pass proves the desired user experience.
- Open decision for Stage 48.3 implementation: the exact placement of Sign out. Recommended default is to keep Sign out in Settings Account management and remove it from the inline Profile editor flow unless the implementation audit finds a strong reason to keep both.

## Boundary Confirmation

This stage remained documentation/progress-only. It did not modify source/runtime files, tests, migrations, Supabase configuration, Vercel configuration, deployment state, Git/GitHub state, gameplay rules, Elo math, or the original stable `brrrdle` repository.

The decision preserves public/private profile privacy, raw-auth/private-data boundaries, private Practice request eligibility behavior, Phase 47 mobile and display-boundary repairs, Phase 46 sync/freshness protections, Daily claim safety, gameplay rules, and Elo math.

## Next Gate

The next safe gate is Phase 48 Stage 48.3 Profile/Settings Account-Management Clarity Plan, source/test-only under the boundaries above. Do not begin custom-code/private-game decisioning, private Daily/ranked Daily decisioning, Supabase/storage changes, migrations, or gameplay/rating changes without a separate user prompt.
