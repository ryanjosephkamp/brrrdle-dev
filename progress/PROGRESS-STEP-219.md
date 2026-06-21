# Progress Step 219: Phase 29 Stage 29.4 Public Profile App Foundations

**Status**: Completed - Awaiting User Review Before Stage 29.5
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-21T00:45:46Z
**Completed**: 2026-06-21T00:54:29Z

## Authorization

The user authorized Phase 29 Stage 29.4 only: public profile app foundations using the already-applied and verified Stage 29.3 public profile migration/RLS contract.

Allowed work:

- read required governance, Phase 29 planning/spec/addendum/implementation materials, progress records, Supabase docs, and repository account/profile/RLS surfaces;
- inspect the Stage 29.3 public profile migration;
- add app repository/domain seams for the approved public profile RPCs;
- add owner editing foundations for display name, visibility, accent/flair, avatar URL, and optional bio within the approved public profile contract;
- add public-safe profile read helpers that consume only allow-listed public RPC fields;
- add focused repository/domain/component tests;
- update progress records and run focused plus broad verification.

Not authorized:

- new migrations or migration execution;
- public leaderboards;
- public/guest spectation;
- Phase 30 work;
- notification changes;
- service workers or push infrastructure;
- deployments;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Elo algorithm changes or gameplay-rule changes;
- new custom skills, force-push, secret printing, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- `origin/main`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- Original stable repository: not used.

## Implemented Work

- Added `src/account/publicProfile.ts` with strict public profile DTO parsing, plain-text validation, public avatar URL validation, owner/public RPC repository helpers, and batch public profile hydration helpers.
- Exported public profile helpers through `src/account/index.ts`.
- Extended `ProfilePanel` with a separate public profile section for visibility, public display name, accent, avatar URL, bio, preview, opaque public profile ID display, and public profile save action.
- Kept the existing private account metadata save path unchanged.
- Wired `App.tsx` to load the owner's public profile through `get_my_public_player_profile` when the profile dialog opens and to save through `upsert_my_public_player_profile`.
- Updated `docs/supabase.md` with the Phase 29 public profile migration/RPC contract and privacy allow-list.
- Added focused public profile tests for validation, forbidden-field rejection, repository RPC calls, default-private behavior, public read parsing, and component visibility copy.

## Verification

Passed:

- Focused public profile/account tests: `npm run test -- src/account/publicProfile.test.ts src/account/ProfilePanel.test.tsx src/account/profile.test.ts src/account/authHelpers.test.ts` - 4 files, 67 tests.
- `npm run lint`
- `npm run test` - 97 files, 633 tests.
- `npm run build` - passed with existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Python CSV shape check using `python3 -S`: `csv_shape_ok rows=221 columns=12 last_id=219`

Real Supabase-backed browser/app verification was not run in Stage 29.4. Stage 29.3 already applied the remote RPC migration and passed non-printing privacy probes; Stage 29.4 repository behavior was verified with mocked RPC seams and full local gates.

## Blockers

No Stage 29.4 blockers.

## Boundary Confirmation

No migrations, public leaderboards, public/guest spectation, Phase 30 work, notification changes, service workers, push infrastructure, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Elo/gameplay changes, new custom skills, force-push, secret printing, or original stable repository work has been performed.
