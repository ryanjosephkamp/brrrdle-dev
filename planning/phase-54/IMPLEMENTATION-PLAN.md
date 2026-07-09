# Phase 54 Live/Lobby Identity And Spectator-Adjacent Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. The phase has shared `src/app/` and `src/multiplayer/` ownership, so use one sequential integrator rather than parallel writers.

**Goal:** Let authenticated multiplayer participants open an eligible opponent's existing public profile from Active Games and Live, return to the same Multiplayer context, and make the current Lobby/spectator identity boundaries clearer without widening privacy or mutation authority.

**Architecture:** Keep public-profile navigation source-side and identifier-based. Existing participant identity summaries may produce a validated internal route target only for the authenticated caller's own game; Active/Live view models receive the target without rendering it. Lobby and spectator paths continue to receive display-only identity summaries, so they render static cards and retain their existing Join/read-only controls.

**Tech Stack:** React, TypeScript, Vitest, Playwright, existing Supabase RPC adapters, existing browser navigation state, Vite.

## Global Constraints

- Work only in `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`; do not touch stable `brrrdle`.
- Preserve Phase 50 Solo persistence and Home-on-refresh, Phase 51 mobile/profile behavior, Phase 52 private Practice behavior, and Phase 53 Stats/public rating metadata.
- Do not add dependencies, schema/table/storage changes, SQL migrations, RPC/RLS/grant changes, remote Supabase work, deployment configuration, release work, or Git/GitHub actions.
- Do not expose or serialize a public profile id into visible card text, URLs, DOM attributes, logs, screenshots, or browser-test output.
- Do not construct profile links from display names, initials, avatar URLs, game ids, or raw player ids.
- Daily Multiplayer remains excluded from public/guest spectation. Spectator capability flags remain false and spectator views remain read-only.
- Treat the known Vite chunk-size advisory as non-blocking only when the build otherwise succeeds.

---

## Current Implementation Review

### Data And Privacy Boundaries

1. `src/multiplayer/multiplayerRepository.ts` parses participant identity results that may contain `publicProfileId`, but `src/multiplayer/multiplayerViewModels.ts` intentionally converts them to display-only `MultiplayerProfileSummary` maps. Existing tests assert that the current display maps and spectator rows do not contain public profile ids.
2. The participant identity RPC is authenticated and participant-scoped: a caller may request identities only for an async game in which they are a participant. It cannot safely supply a Lobby visitor with a waiting host's profile id.
3. `get_public_live_v1_spectator_games_v1` and the authenticated Live spectator projection deliberately exclude `public_profile_id`. Their repository parsers reject it. Public/guest and nonparticipant spectator cards must therefore remain non-clickable.
4. `PublicProfilePage` and the public leaderboard already load privacy-safe profile/ranked Practice data. `App.tsx` already routes a validated `selectedPublicProfileId`, but its Back action is hard-coded to Leaderboard.

### Presentation And Routing Boundaries

1. `MultiplayerWorkspace` collects participant display identities for active games, projects Active/Lobby/Live rows, and owns focused spectator selection.
2. `MultiplayerActiveGames` and participant Live cards currently show an opponent label but have no profile callback.
3. `MultiplayerLobby` has only `hostLabel`, `canJoin`, `canCancel`, and direct action semantics. The host label must remain a static label until a separately authorized safe public-lobby identity contract exists.
4. The current focused spectator flow already routes through `focusedLiveSpectatorGameId` and has an explicit Back-to-Live-list action. Phase 54 must preserve it and prove no mutation action appears.

## File Map

| File | Phase 54 responsibility |
| --- | --- |
| `src/multiplayer/multiplayerViewModels.ts` | Keep display maps intact; add a distinct internal map for validated participant public-profile route targets and project only an opponent target into participant Active/Live view models. |
| `src/multiplayer/multiplayerViewModels.test.ts` | Verify valid participant targets are retained only for eligible active-public identities and never enter spectator view models or display-only profile maps. |
| `src/multiplayer/MultiplayerWorkspace.tsx` | Fetch display identities and route-target identities together, pass the latter only to participant Active/Live rows, pass the existing profile-open callback, and preserve focused spectator flow. |
| `src/multiplayer/MultiplayerActiveGames.tsx` | Render a click-capable opponent identity only when a validated target is supplied; retain a static fallback otherwise. |
| `src/multiplayer/MultiplayerLive.tsx` | Render participant identity links only when supplied; keep spectator player names static and retain read-only controls/copy. |
| `src/multiplayer/MultiplayerLobby.tsx` | Preserve static host identity and direct Join/Manage actions; add or retain tests making the non-link rule explicit. |
| `src/multiplayer/MultiplayerWorkspace.test.tsx`, `src/multiplayer/MultiplayerActiveGames.test.tsx`, `src/multiplayer/MultiplayerLive.test.tsx`, `src/multiplayer/MultiplayerLobby.test.tsx` | Component-level identity, fallback, read-only, and no-link coverage. |
| `src/app/navigationState.ts` | Add a strictly normalized `publicProfileReturnRoute` limited to `leaderboard` or `multiplayer`. |
| `src/app/App.tsx` | Set profile-return origin when opening from Multiplayer and return there from `PublicProfilePage`, preserving stored Multiplayer subtab/selection. |
| `src/app/navigationState.test.ts`, `src/app/routes.test.ts`, `src/app/App.test.tsx` when present | Verify origin normalization, profile-route return behavior, and no route regression. |
| `e2e/gameplay/live-v1-spectator.spec.ts` | Use real public profiles and multiple browser contexts to prove participant profile routing, spectator non-link behavior, focused Live routing, and no console failures. |
| `planning/phase-54/CHANGELOG.md`, `planning/phase-54/REVIEW-CHECKLIST.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-514.md` | Record implementation, verification, manual checks, and retained deferrals after source/test work succeeds. |

## Implementation Tasks

### Task 1: Lock the Existing Identity Contract With Failing Tests

**Files:**

- Modify: `src/multiplayer/multiplayerViewModels.test.ts`
- Modify: `src/multiplayer/MultiplayerLive.test.tsx`
- Modify: `src/multiplayer/MultiplayerLobby.test.tsx`

- [ ] Add a view-model test where a participant identity summary has `identityAvailable: true`, a valid UUID `publicProfileId`, and a public display name. Assert the new participant route-target map contains the correct seat/id pair while `participantIdentitySummariesToProfileMap` still has no `publicProfileId` property.
- [ ] Add negative cases for unavailable identity, malformed profile id, and a spectator row. Assert no route target is present and `JSON.stringify(spectatorRow)` does not contain `publicProfileId`, `userId`, or `email`.
- [ ] Add a Live render test that expects an `Open public profile for <name>` button for a participant row with an explicit target, and a static name with no such button for a spectator row.
- [ ] Add a Lobby render test that expects the Host label plus direct Join/Manage behavior and asserts no `Open public profile for` control exists.
- [ ] Run the changed test files. Expected result before implementation: the new participant link assertions fail while current spectator/lobby boundary assertions pass.

### Task 2: Separate Internal Participant Route Targets From Display Data

**Files:**

- Modify: `src/multiplayer/multiplayerViewModels.ts`
- Modify: `src/multiplayer/multiplayerViewModels.test.ts`

- [ ] Import the existing `normalizePublicProfileId` validator and add these source-only types:

```ts
export type MultiplayerParticipantPublicProfileIdMap = Partial<Record<MultiplayerPlayerId, string>>
export type MultiplayerParticipantPublicProfileIdMapByGameId = Readonly<Record<string, MultiplayerParticipantPublicProfileIdMap | undefined>>

export function participantIdentitySummariesToPublicProfileIdMap(
  summaries: readonly ParticipantIdentitySummaryResult[],
): MultiplayerParticipantPublicProfileIdMap {
  return Object.fromEntries(summaries.flatMap((summary) => {
    const publicProfileId = summary.identityAvailable
      ? normalizePublicProfileId(summary.publicProfileId)
      : undefined
    return publicProfileId ? [[summary.seat, publicProfileId] as const] : []
  })) as MultiplayerParticipantPublicProfileIdMap
}
```

- [ ] Extend `MultiplayerActiveGameViewModel` and participant-role `MultiplayerLiveGameViewModel` with optional `opponentPublicProfileId`.
- [ ] Update `selectActiveMultiplayerGameRows` and the participant branch of `selectLiveMultiplayerRows` to accept the new per-game map and select only the other seat's validated id. Do not add the property in the spectator branch.
- [ ] Keep `participantIdentitySummariesToProfileMap` unchanged in purpose: it must output only safe display data.
- [ ] Re-run the Task 1 tests. Expected result: valid participant route targets pass; invalid/unavailable/spectator targets remain absent.

### Task 3: Render Participant Links, Static Lobby/Spectator Identities, And Existing Focused Spectation

**Files:**

- Modify: `src/multiplayer/MultiplayerWorkspace.tsx`
- Modify: `src/multiplayer/MultiplayerActiveGames.tsx`
- Modify: `src/multiplayer/MultiplayerLive.tsx`
- Modify: `src/multiplayer/MultiplayerLobby.tsx`
- Modify: the component tests named in the file map

- [ ] In `MultiplayerWorkspace`, retain a second state map for `MultiplayerParticipantPublicProfileIdMapByGameId` beside the display-profile map. When the existing debounced participant identity request resolves, derive both maps from the same result and discard entries for games no longer active.
- [ ] Add `onOpenPublicProfile?: (publicProfileId: string) => void` to Workspace, Active Games, and Live props. Pass it only to participant projections. The callback must receive the id only in an event handler; it must not be interpolated into visible text, test ids, or attributes.
- [ ] Render the opponent name as a button only when both `onOpenPublicProfile` and `opponentPublicProfileId` exist. Its accessible name must be `Open public profile for <display label>`.
- [ ] Keep no-target identities as ordinary text. For Lobby, keep `hostLabel` as ordinary text and preserve `data-action-target="join"` and Manage Lobby semantics. For spectator cards/details, retain ordinary text and existing read-only capability copy.
- [ ] Preserve `onOpenFocusedSpectatorGame`, `onCloseFocusedSpectatorGame`, the focused read-only panel, and the `GAMEPLAY_AUTOCENTER_TARGET_ATTRIBUTE` already used for the focused view.
- [ ] Re-run Active, Live, Lobby, and Workspace tests. Expected result: participant links work, static fallbacks work, no spectator mutation action or profile link appears.

### Task 4: Return Public Profiles To Their Opening Surface

**Files:**

- Modify: `src/app/navigationState.ts`
- Modify: `src/app/navigationState.test.ts`
- Modify: `src/app/App.tsx`
- Modify: `src/app/routes.test.ts` and the nearest existing App route test if needed

- [ ] Add a narrow navigation field and validator:

```ts
export type PublicProfileReturnRoute = 'leaderboard' | 'multiplayer'

function normalizePublicProfileReturnRoute(value: unknown): PublicProfileReturnRoute | undefined {
  return value === 'leaderboard' || value === 'multiplayer' ? value : undefined
}
```

- [ ] Store `publicProfileReturnRoute` in `NavigationState`, normalize it during load, and preserve the existing selected Multiplayer subtab/game fields. Do not add raw user, profile-owner, participant, or spectator ids beyond the already validated selected public profile id.
- [ ] Change the profile-open handler to accept a source route. Leaderboard opens use `leaderboard`; Workspace participant links use `multiplayer`.
- [ ] Change `PublicProfilePage`'s Back action to select the normalized stored return route, clearing only the return marker. A return from Multiplayer must preserve the previously selected Multiplayer subtab; existing Leaderboard opens must still return to Leaderboard.
- [ ] Re-run navigation and route tests. Expected result: malformed return values normalize away, Leaderboard behavior remains unchanged, and Multiplayer-origin profile return restores Multiplayer.

### Task 5: Prove the Real Multi-Client Flow and Spectator Boundary

**Files:**

- Modify: `e2e/gameplay/live-v1-spectator.spec.ts`
- Modify only shared E2E fixtures that are necessary to express the existing public-profile setup or non-printing assertions.

- [ ] Extend the existing two-player plus spectator scenario after both temporary players receive active public profiles.
- [ ] As an authenticated participant, open Live or Active Games, activate the opponent's public-profile control, assert `Player profile` and the existing public ranked Practice metadata section appear, then activate Back and assert Multiplayer returns to the prior subtab.
- [ ] As an authenticated nonparticipant spectator and as a signed-out public spectator, assert player names render but no `Open public profile for` control appears. Reassert absence of Submit, Join, Forfeit, Cancel, queue, and Daily-claim actions.
- [ ] Exercise the existing focused spectator action and Back to Live list. Confirm no console failures in participant, spectator, and signed-out contexts.
- [ ] Keep temporary-account and row cleanup in the existing E2E cleanup path. Do not print raw ids, emails, answers, tokens, or projection payloads.
- [ ] Run this focused Playwright file before wider E2E. Expected result: all participant-link and spectator-negative assertions pass on desktop and mobile viewports already used by the file.

### Task 6: Final Hardening, Review Candidate, And Stop Gate

**Files:**

- Create: `planning/phase-54/CHANGELOG.md`
- Create: `planning/phase-54/REVIEW-CHECKLIST.md`
- Modify: `planning/FUTURE-WORKFLOW-TIMELINE.md`
- Modify: `planning/README.md`
- Modify: `progress/PROGRESS.csv`
- Create: `progress/PROGRESS-STEP-514.md`

- [ ] Run focused unit/component tests from Tasks 1-4.
- [ ] Run `npx playwright test e2e/gameplay/live-v1-spectator.spec.ts`.
- [ ] Run `npm run lint`, `npm run test`, `npm run test:e2e`, `npm run build`, and `npx tsc -p tsconfig.api.json --noEmit` sequentially.
- [ ] Run `git diff --check`, the CSV shape check with `python3 -S`, non-printing/credential-value scan over changed files, ignored-artifact check, watched-port check for `5173`, `5174`, `3000`, and `4173`, and `git status --short --branch`.
- [ ] Create a Phase 54 manual checklist with participant profile navigation, return routing, static Lobby host behavior, spectator read-only/no-link behavior, focused spectator routing, mobile fit, and Phase 50-53 regression spot-checks.
- [ ] Create an ignored Review Candidate Backup prompt only after all verification passes. Stop for user authorization; do not create a branch, stage, commit, push, PR, merge, release, deployment, or migration action.

## Protected Contract Decision

The implementation must stop and report instead of expanding scope if any requirement needs one of the following:

- a public profile id in Lobby, authenticated spectator, or public/guest spectator output;
- any modification to `get_multiplayer_participant_identity_summaries`, `get_authenticated_live_v1_spectator_games_v2`, or `get_public_live_v1_spectator_games_v1`;
- a migration, RLS/grant change, direct table query, remote SQL execution, or public/guest profile browsing contract;
- spectator presence, counts, lists, tracking, or any mutation capability.

The required recovery in that case is a new Phase 54 migration/RLS addendum, not a source workaround.

## Plan Self-Review

- Spec coverage: participant identity links, Lobby static identity, public profile/ranked metadata reuse, focused spectator routing, route return, privacy, E2E, review candidate, and future protected-contract routing each map to a task above.
- Placeholder scan: no unbounded implementation step or unspecified API is used; the only conditional branch is a mandatory stop when the existing contract is insufficient.
- Type consistency: `MultiplayerParticipantPublicProfileIdMap` is introduced before Workspace state and selector usage; `PublicProfileReturnRoute` is introduced before App routing use; public profile ids remain callback-only.
