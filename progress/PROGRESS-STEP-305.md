# Progress Step 305: Phase 37 Stage 37.1 Route, Entry, History, Gameplay Centering, And Sound Audit

## Status

Completed - Awaiting User Review Before Stage 37.2.

## Authority

User authorized Phase 37 Stage 37.1 only: read-only route, entry/resume, browser-history, gameplay auto-centering, and solo/multiplayer invalid-guess sound audit and scope lock.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- Local `HEAD`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`
- `origin/main`: `11e07a8a3175b5ceb0ad69fe8937391036458ac0`
- Original stable `brrrdle` repository was not used.
- Existing uncommitted Phase 37 planning/spec/progress artifacts remain unstaged.
- Existing user edits to `planning/phase-36/REVIEW-CHECKLIST.md` were preserved.

## Required Reading And Audit Surfaces

Read or inspected the Stage 37 governance and planning stack, Stage 37.0 baseline evidence, route/navigation state, route definitions, app shell, dashboard and notification action routing, Solo workspace, solo OG/GO game surfaces, Multiplayer workspace, Active Games, Lobby, Live, Multiplayer selected-game panel, postgame routing helpers, sound provider/engine, and relevant tests.

Key surfaces audited:

- `src/app/navigationState.ts`
- `src/app/routes.ts`
- `src/app/App.tsx`
- `src/app/LunarSignalStage.tsx`
- `src/dashboard/dashboardActions.ts`
- `src/notifications/browserNotifications.ts`
- `src/notifications/notificationActions.ts`
- `src/solo/SoloWorkspace.tsx`
- `src/app/games/OgGame.tsx`
- `src/app/games/GoGame.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerGameSurface.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/MultiplayerLobby.tsx`
- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/multiplayerPanelRouting.ts`
- `src/multiplayer/postgameActions.ts`
- `src/sound/SoundProvider.tsx`
- `src/sound/soundEngine.ts`
- relevant navigation, dashboard, notification, multiplayer, solo, sound, and E2E fixtures/tests.

## Audit Findings

### Route And Navigation State Ownership

- Route, subtab, selected solo game, selected multiplayer game, and History filter state are centralized in `App.tsx` and persisted through `saveNavigationState` in `src/app/navigationState.ts`.
- `NavigationState` currently persists `activeRouteId`, `legacyPracticeMode`, `soloSubtab`, `multiplayerSubtab`, `selectedSoloGameKey`, `selectedMultiplayerGameId`, and `historyFilters`.
- Hidden daily and legacy Practice compatibility routes already normalize through `getRouteCompatibilityTarget`.
- No current browser `popstate`, `pushState`, or `replaceState` integration was found for app route/subtab/selected-game navigation. Browser back/forward is therefore a source-only app-shell enhancement, not a migration/RLS concern.
- Tests already cover navigation state persistence/normalization and route ordering, but Stage 37.4 should add browser-history-specific coverage for route, subtab, selected-game, stale-game, and compatibility fallback behavior.

### Entry, Join, Resume, Live, Lobby, Notification, Dashboard, And Postgame Routing

- Solo resume routes through `handleResumeSoloGame` and `navigateToResumeSlot`, both setting route/subtab/selected game and persisting navigation state.
- Multiplayer direct resume routes through `handleResumeMultiplayerGame`, which validates game existence, playing status, and viewer eligibility before routing to Daily or Practice. Stale/unavailable targets fall back to Multiplayer -> Active Games and clear the selected game id.
- Dashboard and in-app notification activation route through `dispatchDashboardAction`; direct multiplayer resume can short-circuit generic subtab selection when `handleResumeMultiplayerGame` succeeds.
- Foreground browser notification clicks call the same notification activation path and therefore share the same direct-resume and stale fallback behavior.
- Lobby direct join already calls the guarded `onJoinGame` path. Live participant resume calls `onResumeGame`; authenticated spectator focused Live selection uses `onSelectGame` plus focused spectator state.
- Multiplayer panel creator auto-route, ranked queue finalization, rematch accept, Play Again, Search Again, and join/create flows converge on selected game ids through `selectGame`.
- Stage 37 auto-centering should attach after successful route/subtab/selected-game state transitions rather than before guards run. This preserves stale fallback, Daily claim boundaries, ranked queue/rematch routing, and notification direct-resume behavior.

### Gameplay Auto-Centering Seam

- The app already has a local precedent for deferred scrolling and focus in `handleOpenEloAbout`, which uses `window.setTimeout`, `scrollIntoView`, and focus with `preventScroll`.
- Solo and Multiplayer gameplay surfaces are nested under route and subtab headers. The likely low-risk seam is a shared gameplay-area anchor/ref or data attribute inside the selected gameplay surface, with route handlers scheduling scroll/focus only after the relevant game surface is mounted.
- Auto-centering should be best-effort, disabled/no-op in SSR/test contexts without `window`/`document`, and should respect unavailable/stale game fallbacks.
- The first implementation should prefer a small helper over broad layout changes and should not condense upper gameplay information in this phase unless a later stage finds a tiny, low-risk change. The audit recommends keeping upper gameplay information condensation deferred.

### Browser Back/Forward Feasibility

- Current navigation persistence is storage-based, not URL/history-based.
- Browser back/forward integration is feasible as a source-only app-shell change by deriving a normalized navigation snapshot, pushing/replacing state on user navigation, and handling `popstate` to restore route/subtab/selected-game state.
- Stage 37.4 should keep history entries view-state-only. It must not replay game mutations, resubmit guesses, bypass multiplayer guards, or resurrect unavailable selected games.
- Stale selected multiplayer game ids should reuse or mirror `handleResumeMultiplayerGame` style fallback to Multiplayer -> Active Games. Stale selected solo game keys should fall back to the safest Solo subtab for the requested scope or Active Games if the slot is missing.

### Invalid-Guess Sound Audit

- Solo OG and Solo GO both call `sound.play('keyboard-click')` before handling every keyboard input, including submit.
- Solo OG then calls `submitGuess`; when the session is unchanged, it calls `sound.play('invalid-guess')`; otherwise it calls `tile-flip` and optionally `correct-guess`.
- Solo GO follows the same pattern with `submitGoGuess`.
- Multiplayer also has a submit-time invalid path that plays `invalid-guess`, but it runs through `MultiplayerGameSurface` and persisted multiplayer submit handling. The user-confirmed multiplayer invalid sound should be preserved.
- The likely solo issue is not missing `invalid-guess` entirely; it is that solo submit dispatch starts with `keyboard-click`, so invalid submit can be masked or perceived as the normal submit/key cue before the invalid cue. Stage 37.2 should verify with focused tests and make the smallest solo-only repair.
- Recommended Stage 37.2 path: source-only solo invalid-guess sound repair. The likely implementation is to stop treating submit as a generic keyboard click in solo OG/GO, then emit only `invalid-guess` for rejected submits and valid submit cues for accepted submits while preserving letter/delete key click behavior.

## Scope Decisions

- Stage 37.2 should proceed as source-only solo OG/GO invalid-guess sound repair.
- Stage 37.3 should remain source-only gameplay-area auto-centering after safe route/entry/resume state transitions.
- Stage 37.4 should remain source-only browser history/back-forward integration around normalized navigation state and stale fallbacks.
- No migration/RLS addendum planning is required for Stage 37 based on this audit.
- Upper gameplay information condensation remains deferred unless a later explicitly authorized stage narrows and approves it.

## Browser And Resource Observations

- No local dev server or browser reproduction was needed for this read-only audit; source and test inspection were sufficient to lock the next source-only path.
- Watched ports were clear before the audit.

## Verification

Passed after refining two intentionally over-broad helper checks:

- `git diff --check`
- Progress CSV shape check using `python3 -S`: `rows=307 columns=[12] last_id=305`
- Initial broad non-printing scan flagged `progress/PROGRESS.csv` because it contains generic boundary wording like "token"; refined credential-shaped scan reported `scanned_files=13 credential_pattern_hits=0`
- Initial broad ignored-artifact check flagged intentionally tracked safe files `.env.example` and `public/manifest.webmanifest`; refined ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear
- `git status --short --branch` completed and showed only existing unstaged/untracked planning/progress/checklist artifacts.

## Next Gate

If approved, authorize Stage 37.2 source-only solo invalid-guess sound repair. Do not begin gameplay auto-centering, browser-history integration, implementation outside solo sound dispatch, migrations, configuration/deployment work, Git/GitHub operations, backup workflow execution, or original stable repository work without a later explicit prompt.
