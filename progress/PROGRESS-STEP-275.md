# Progress Step 275: Phase 34 Stage 34.1 Live/Lobby/Notification Audit

**Status**: Completed - Awaiting User Review Before Stage 34.3 Live Card And Badge Stabilization

**Started**: 2026-06-26T21:49:04Z

**Completed**: 2026-06-26T21:50:45Z

## Authorization

The user authorized Phase 34 Stage 34.1 only: read-only Multiplayer Live/Lobby/notification audit and scope lock.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, the brrrdle GitHub backup workflow, or original stable repository work.

## Repository State

- Working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`
- `HEAD`: `95d0bad3c28761db78a016e95a54287f4b096ab8`
- `origin/main`: `95d0bad3c28761db78a016e95a54287f4b096ab8`
- Original stable repository: not used.
- Existing user edits to `planning/phase-33/REVIEW-CHECKLIST.md`: preserved.

## Read-Only Audit Findings

### Live Subtab Count Readability

The selected Live subtab count readability issue is source-only. The Live count attention item uses the neutral tone from `src/app/attentionViewModels.ts`, and `src/ui/SubtabBar.tsx` renders that neutral badge inside an active primary `Button`. The current `.brrrdle-attention-badge` default styling in `src/index.css` keeps a pale badge on a pale selected tab, so the count can become difficult to read. This should be fixed with focused shared badge styling and component coverage.

### Live Participant And Spectator Safe Names

The Live safe-name issue appears source-only with existing safe data available.

Participant Live rows currently derive labels from local `game.players` through `src/multiplayer/multiplayerViewModels.ts`, rather than the Phase 32 participant identity summary helper used by selected games. This can preserve stale stored labels such as `You` or generic `Rival` in Live card contexts.

Authenticated spectator Live rows already include safe profile summaries from the existing Live spectator RPC shape, but the Live card matchup label currently joins `player.label` values and does not prefer `player.profile.displayName`. This can make the main Live card label less precise even when the details section has safer profile data.

### Live Ranked And Unranked Labels

The Live ranked/unranked label need is source-only. Both participant game records and authenticated spectator rows already carry ranked metadata, but the Live view model and Live card do not expose a player-facing ranked/unranked label.

### Lobby One-Click Join

The Lobby `Open to join` path is a source-only UX issue. `src/multiplayer/multiplayerViewModels.ts` emits the `Open to join` label, and `src/multiplayer/MultiplayerLobby.tsx` opens/selects the game rather than joining it directly. A later implementation should provide a guarded one-click join path for eligible joinable lobbies while preserving manage/open behavior for creator, participant, and spectator cases.

### Notification Direct-Resume Routing

Foreground browser and in-app notification clicks already carry a selected multiplayer game id, but dashboard/notification actions route to the Active Games subtab. The existing Resume path in `src/app/App.tsx` routes selected games into the Practice or Daily gameplay panel. A later implementation should align notification activation with direct-resume semantics without adding service workers or push infrastructure.

### Active Games Turn Cues

Active Games already includes text such as `Your turn`, but the cue is not visually strong enough for scanning. This is source-only and should be implemented as an accessible card-level turn indicator without changing turn logic.

## Migration/RLS Decision

Stage 34.2 migration/RLS addendum planning is not required before implementation.

Existing sanitized data paths appear sufficient:

- Authenticated Live spectator rows already include allow-listed safe profile summaries and ranked metadata.
- The Phase 32 participant identity RPC already supports participant game identity summaries for authenticated users.
- No new private data, public/guest spectator projection, raw auth ids, auth emails, tokens, answers, seeds, session artifacts, or queue internals are needed for the Phase 34 source work.

If Stage 34 implementation proves that remote rows cannot provide the safe display summaries or ranked metadata through the existing contracts, implementation should stop and request a narrow migration/RLS addendum before proceeding.

## Focused Audit Check

Ran the focused current-behavior audit set:

```sh
npm run test -- src/multiplayer/multiplayerViewModels.test.ts src/multiplayer/MultiplayerWorkspace.test.tsx src/ui/SubtabBar.test.tsx src/dashboard/dashboardViewModels.test.ts src/notifications/notificationViewModels.test.ts src/notifications/browserNotifications.test.ts src/dashboard/dashboardActions.test.ts src/notifications/notificationActions.test.ts
```

Result: 8 files and 42 tests passed.

## Verification

Passed final lightweight verification:

- Focused read-only audit check reported 8 files and 42 tests passing.
- `git diff --check`
- Python progress CSV shape check using `python3 -S` reported `rows=277 columns=[12] last_id=275`.
- Non-printing secret/artifact scan reported `scanned_files=13 credential_pattern_hits=0 changed_artifacts=0`.
- Ignored-artifact check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- Watched-port cleanup check found no listeners on `5173`, `5174`, `3000`, or `4173`.
- `git status --short --branch` completed.

## Resource Notes

No local dev server or browser reproduction was required for Stage 34.1. Audit was completed through source, test, migration, and documentation review plus focused Vitest checks.

## Next Safe Action

If approved, proceed to Stage 34.3 Live card and badge stabilization. Stage 34.3 should implement the selected Live badge readability fix, Live participant/spectator safe-name label consistency, and Live ranked/unranked labels with focused tests. Lobby one-click join, notification routing, and Active Games turn cues should remain in later Stage 34 implementation slices unless the user explicitly broadens Stage 34.3.
