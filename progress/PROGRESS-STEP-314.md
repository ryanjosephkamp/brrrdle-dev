# Progress Step 314: Phase 38 Stage 38.1 Public/Spectator Audit

## Status

Completed - Awaiting User Review Before Stage 38.2.

## Authority

User authorized Phase 38 Stage 38.1 only: read-only public/spectator data, RLS, privacy, and abuse audit and scope lock. This pass is limited to reading required governance and Phase 38 planning/spec/implementation materials, auditing Live spectator, public-profile, privacy, repository, test, and Supabase/RLS surfaces, creating this progress report and matching CSV row, running focused read-only checks as needed, and deciding the safest Stage 38.2 path.

This pass does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `cdd780989535a3081a5e034bde1a247569ca28af`
- `origin/main`: `cdd780989535a3081a5e034bde1a247569ca28af`
- Existing user edit to `planning/phase-37/REVIEW-CHECKLIST.md`: preserved and not edited in this pass.

## Audit Findings

- Current Live UI remains closed to signed-out and guest viewers. Without `viewerUserId`, `MultiplayerLive` renders the sign-in notice and states that public and guest spectation remain unavailable.
- Current Live view-model selection returns no Live rows when `viewerUserId` is unavailable, so signed-out or local guest viewers do not have a source-only Live discovery path.
- Authenticated nonparticipant spectator discovery uses `loadAuthenticatedLiveSpectatorRows`, which calls only `get_authenticated_live_v1_spectator_games_v2` and normalizes the returned rows through strict parser defenses.
- The authenticated spectator parser rejects raw projection, answer, seed, player-session, raw auth identity, email, token, and similar forbidden fields before rows can reach UI view models.
- Authenticated spectator capabilities are explicitly read-only: submit, forfeit, cancel, join, and mutation capabilities must all be false.
- Current Daily Multiplayer rows are filtered from authenticated spectator output in SQL and again by app-side normalization as defense in depth.
- Phase 35 ranked Live identity projection keeps the authenticated spectator RPC signature and grants intact, revokes anon/public execution, and resolves active public profile summaries server-side without exposing raw auth ids or private profile fields.
- Phase 32 participant identity summaries remain authenticated participant-scoped and cannot safely become public/guest discovery without a new contract.
- Phase 29 public profile RPCs expose allow-listed active public profile data through purpose-built functions, while direct table access remains revoked and owner write paths remain authenticated-only.
- Phase 30 public ranked leaderboard provides a useful allow-list pattern, but it is authenticated-only and should not be treated as an anon Live spectator precedent.

## Stage 38.2 Scope Lock Decision

Stage 38.2 should proceed as **public spectator migration/RLS addendum planning**.

A source-only path is not safe because the current source seams either require an authenticated viewer or depend on authenticated-only RPCs. Public/guest Live discovery needs a dedicated additive projection contract before any source/runtime implementation, test implementation, or migration execution. Reusing or broadening the authenticated spectator RPC directly would risk weakening the Phase 28/35 authenticated boundary and could accidentally expose sensitive game or identity data.

## Spectator Presence Recommendation

- Do not implement identity-bearing spectator lists in Phase 38 v1.
- Treat spectator presence as a later gated decision after the public/guest projection contract exists.
- If Phase 38 includes any presence slice, prefer a bounded aggregate count only, display-only, non-authoritative, no raw viewer identifiers, no profile links, no mutation authority, and no durable public tracking unless a later approved addendum explicitly proves the privacy and abuse boundaries.

## Resource And Browser Observations

- No local dev server or browser reproduction was required for this read-only audit.
- No Stage 38-owned browser, Playwright, or Vite process was started.

## Verification

- `git diff --check`
  - Result: passed.
- Progress CSV shape check using `python3 -S`
  - Result: passed, `rows=316 columns=[12] last_id=314`.
- Non-printing secret/artifact scan
  - Result: passed, `scanned_files=11 credential_pattern_hits=0`.
- Ignored-artifact check
  - Result: passed, `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
  - Note: an initial overbroad local script flagged safe tracked paths (`.env.example` and `public/manifest.webmanifest`) as false positives; the refined check used the actual local-artifact boundary from this prompt.
- Watched-port cleanup check
  - Result: passed, no listeners on `5173`, `5174`, `3000`, or `4173`.
- `git status --short --branch`
  - Result: completed; expected Phase 38 planning/spec/progress artifacts and the preserved user-edited Phase 37 review checklist remain unstaged.

## Boundaries Preserved

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work was performed.

## Next Step

Review the Stage 38.1 audit evidence. If approved, explicitly authorize Stage 38.2 public spectator migration/RLS addendum planning before SQL migration creation/execution, source/runtime implementation, test implementation, deployment/configuration work, Git/GitHub operations, backup workflow execution, or original stable repository work.
