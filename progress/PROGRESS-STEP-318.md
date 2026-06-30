# Progress Step 318 - Phase 38 Stage 38.4 Public/Guest Live Discovery And Read-Only Spectation Source Integration

**Status**: Completed - Awaiting User Review Before Stage 38.5
**Phase**: 38, Public/Spectator Readiness
**Stage**: 38.4, public/guest Live discovery and read-only spectation source integration
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-30T22:14:51Z
**Completed**: 2026-06-30T22:14:51Z

## Authorization

The user authorized Phase 38 Stage 38.4 only: source-only public/guest Live discovery and read-only spectation integration using the completed Stage 38.3 public spectator projection migration and Stage 38.3B Daily claim RPC anonymous grant hardening baseline.

This pass was limited to reading required governance and Phase 38 planning/spec/addendum/progress materials, confirming repository state, preserving prior user edits, implementing source-only public/guest Live discovery and read-only spectation, adding focused tests, creating this progress report and matching CSV row, and running verification.

This pass did not authorize and did not perform additional Supabase migrations, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, spectator presence/count/list implementation, service worker/push work, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `cdd780989535a3081a5e034bde1a247569ca28af`.
- `origin/main`: `cdd780989535a3081a5e034bde1a247569ca28af`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used.
- The user-edited `planning/phase-37/REVIEW-CHECKLIST.md` state was preserved.

## Source Integration

Implemented source-only public/guest spectator integration:

- Added strict parsing and normalization for `get_public_live_v1_spectator_games_v1`.
- Added exact public spectator top-level allowlist enforcement.
- Added recursive forbidden-key defenses for raw identity, public profile IDs, projection/session data, rating internals, answers, seeds, and session artifacts.
- Required public spectator capability payloads to keep base mutation flags false and extended public read-only flags false.
- Added `loadPublicLiveSpectatorRows` using bounded `p_limit`, `p_terminal_window_seconds`, and optional bounded `p_game_id`.
- Allowed signed-out and guest viewers to see sanitized public spectator rows while participant resume rows remain participant-authenticated.
- Preserved authenticated participant resume and authenticated spectator rows through the existing authenticated RPC.
- Updated the app Live spectator polling path to use the authenticated spectator RPC for authenticated users and the public spectator RPC for signed-out/guest users.
- Updated Live, Multiplayer workspace, Dashboard, and notification copy to reflect public/guest read-only spectator availability without exposing hidden-game details.

## Behavior Preserved

- Public/guest spectators can discover eligible Practice Live rows only through the sanitized public spectator projection.
- Public/guest spectator details are read-only and expose no join, resume, submit, forfeit, cancel, Daily claim, queue, notification, settlement, rating, account, or profile mutation actions.
- Current Daily Multiplayer exclusion remains enforced by the migration baseline and app-side public parser.
- Authenticated participant resume paths remain intact.
- Authenticated spectator paths remain intact.
- Stale/hidden/completed/deleted/unavailable selected-game fallbacks remain intact.
- Phase 38.3B Daily claim RPC anonymous grant hardening remains intact.
- Phase 37 browser history and gameplay auto-centering behavior remains intact.
- Phase 36 Leaderboard/Stats and Active Games behavior remains intact.
- Phase 35 Profile/auth and Live identity behavior remains intact.
- Phase 34 Live/Lobby/notification behavior remains intact.
- Phase 33 timed ranked behavior, Daily integrity, gameplay rules, and Elo math remain unchanged.

## Tests Added Or Updated

Updated focused coverage for:

- public spectator RPC parsing and loading;
- exact allowlist and recursive forbidden-key rejection;
- Daily-scope public spectator rejection;
- false-only public mutation capability enforcement;
- signed-out/guest public spectator Live projection;
- participant-only Live row closure without a signed-in participant;
- public/guest read-only Live cards and focused spectator surfaces;
- authenticated spectator non-regression;
- Live dashboard/notification copy non-regression.

Focused regression command passed:

- `npx vitest run src/multiplayer/multiplayerRepository.test.ts src/multiplayer/multiplayerViewModels.test.ts src/multiplayer/MultiplayerLive.test.tsx src/multiplayer/MultiplayerWorkspace.test.tsx src/dashboard/dashboardViewModels.test.ts src/dashboard/DashboardHome.test.tsx src/notifications/notificationViewModels.test.ts`
- Result: `7` files, `74` tests passed.

## Verification

Passed:

- focused Stage 38.4 regression set: `7` files, `74` tests
- `npm run lint`
- `npm run test`: `109` files, `764` tests
- `npm run build` passed with the existing Vite large-chunk advisory
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- progress CSV shape check using `python3 -S`: `rows=320 columns=[12] last_id=318`
- non-printing credential-shaped secret/artifact scan: `credential_pattern_hits=0`
- ignored-artifact check: no forbidden artifacts staged or tracked
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear
- `git status --short --branch`

## Resource Observations

- No local dev server was started for this stage.
- No browser or Playwright process was started.
- Build output regenerated ignored `dist/` artifacts only.
- Watched ports `5173`, `5174`, `3000`, and `4173` were clear at cleanup.

## Blockers And Open Questions

- No blockers remain for Stage 38.5 review.
- Stage 38.5 remains a gate: spectator presence/count/list should still be audited separately. Identity-bearing spectator lists remain deferred unless a privacy-safe, abuse-resistant design is explicitly approved.

## Boundary Confirmation

No additional Supabase migration, Vercel/Supabase configuration change, deployment, staging, commit, push, PR creation, merge, release, branch deletion, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
