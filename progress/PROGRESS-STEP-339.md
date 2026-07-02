# Progress Step 339 - Phase 40 Stage 40.4 Public Profile Route And Clickable Identity Source Integration

**Status**: Blocked - Lint Verification Failure
**Phase**: Phase 40 - Public Profiles And Private Matchmaking
**Stage**: 40.4 - Public Profile Route And Clickable Identity Source Integration
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T22:31:36Z
**Completed**: 2026-07-01T22:32:47Z

## Authorization

The user authorized Phase 40 Stage 40.4 only: source/test-only public profile route, public profile card/page, and clickable safe identity integration using the completed Stage 40.3 private matchmaking migration/RLS baseline. This included reading governance, Phase 40 planning/spec/addendum/implementation materials, Stage 40.3 progress, public profile/privacy source surfaces, multiplayer identity surfaces, leaderboard identity surfaces, route/history surfaces, relevant tests, creating this progress report and matching 12-column CSV row, implementing the smallest safe source-only public profile route and clickable identity integration, adding focused tests, and running verification.

This pass does not authorize Stage 40.5 private matchmaking source/UI integration, additional Supabase migrations, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- `origin/main`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The checked-off user-edited `planning/phase-39/REVIEW-CHECKLIST.md` state was preserved.

## Implementation Summary

Stage 40.4 added a source-only public profile route and safe clickable identity path:

- Added a hidden `public-profile` support route for display-only public player profiles.
- Added normalized `selectedPublicProfileId` storage/browser-navigation state.
- Added `PublicProfilePage` and `PublicProfileCard` for read-only profile rendering through existing safe public profile RPCs.
- Added a public profile ID normalizer shared by public profile parsing and route state.
- Added clickable leaderboard names/avatars only for rows that already carry approved opaque `publicProfileId` data.
- Preserved non-clickable labels for surfaces without approved public profile IDs, including Phase 38 public/guest spectator payloads.
- Preserved private/hidden/suspended/missing profile fallbacks as one generic unavailable state.
- Preserved Stage 40.3 private matchmaking migration/RLS boundaries and did not implement Stage 40.5 private request UI/source integration.

## Focused Tests Added

- Public profile ID normalization rejects raw/non-UUID identifiers.
- Public profile card renders safe public fields without exposing opaque IDs or forbidden private fields.
- Public profile page falls back safely for malformed route IDs.
- Route/navigation/browser-history state serializes normalized public profile view state only.
- Public ranked leaderboard rows can render clickable safe identity without exposing the public profile ID in markup.

## Verification

Initial focused checks passed:

- `npm run test -- --run src/account/publicProfile.test.ts src/account/PublicProfilePage.test.tsx src/app/routes.test.ts src/app/navigationState.test.ts src/app/browserNavigationHistory.test.ts src/leaderboards/PublicRankedLeaderboardPanel.test.tsx` reported `6` files and `47` tests passed.
- `npx tsc -p tsconfig.api.json --noEmit`

Full Stage 40.4 verification was stopped at the first failing command:

- `npm run lint` failed with `react-hooks/set-state-in-effect` in `src/account/PublicProfilePage.tsx` at line `165`, reporting that calling `setProfile(undefined)` synchronously within an effect can trigger cascading renders.

Per the Stage 40.4 stop condition, no further verification commands were run after this lint failure and Stage 40.5 must not proceed from this state.

## Blockers And Open Questions

Blocked by the lint failure above. The smallest likely next action is a narrow Stage 40.4 lint repair pass that rewrites the public profile page effect state handling without broadening Stage 40.4 scope.

Open questions for Stage 40.5:

- Private matchmaking source integration should map the new Stage 40.3 RPC payloads through strict allowlists before rendering.
- Stage 40.5 should keep direct private requests authenticated-only, unranked Practice-only, cancellation/decline/accept bounded, and separate from ranked queues, Daily claims, spectator projections, gameplay rules, and Elo math.

## Boundary Confirmation

No Stage 40.5 private matchmaking source/UI integration, additional migration, Vercel or Supabase configuration change, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation contract change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
