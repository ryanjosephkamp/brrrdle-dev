# Progress Step 342 - Phase 40 Stage 40.5 Private Matchmaking Source Integration

**Status**: Blocked - Private Request Accept Contract Requires Additional Migration/RLS Repair
**Phase**: Phase 40 - Public Profiles And Private Matchmaking
**Stage**: 40.5 - Private Matchmaking Source Integration
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-01T22:57:00Z
**Completed**: 2026-07-01T23:06:09Z

## Authorization

The user authorized Phase 40 Stage 40.5 only: source/test-only private matchmaking source integration using the completed Stage 40.4C public profile route/clickable identity verification baseline and the completed Stage 40.3 private matchmaking migration/RLS baseline. This included reading governance, Phase 40 planning/spec/addendum/implementation materials, Stage 40.3, Stage 40.4, Stage 40.4B, and Stage 40.4C progress, private matchmaking RPC/source surfaces, public profile/privacy surfaces, multiplayer routing surfaces, notification surfaces, relevant tests, creating this progress report and matching 12-column CSV row, implementing the smallest safe authenticated-only private matchmaking source/UI integration, adding focused tests, and running verification.

This pass does not authorize additional Supabase migrations, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- `origin/main`: `4f935881562f338aa2827962917c7ae4b6ce7b47`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The checked-off user-edited `planning/phase-39/REVIEW-CHECKLIST.md` state was preserved.

## Blocker Summary

Stage 40.5 source integration was stopped before source/runtime edits because the Stage 40.3 private matchmaking accept contract cannot be safely consumed by browser source as written.

The Stage 40.3 migration intentionally returns only sanitized private request lifecycle fields and active public profile display summaries. It does not return raw auth IDs, which preserves the Phase 40 privacy boundary.

However, `public.accept_private_multiplayer_match_request(text, jsonb, text)` requires the client-supplied `p_game_projection` to include:

- `playerUserIds.player-one` matching the requester raw auth user ID;
- `playerUserIds.player-two` matching the opponent raw auth user ID.

The accepting browser knows only the current viewer's raw auth ID. It cannot know the requester raw auth ID from the sanitized request payload without broadening forbidden identity exposure. Therefore a source-only Stage 40.5 cannot implement accepted-game creation and routing without either:

- exposing a raw auth ID to the browser in the private request payload, which is forbidden; or
- changing the database/RPC contract so the server derives/injects participant user IDs during acceptance, which requires a new separately authorized migration/RLS repair gate.

## Non-Secret Evidence

Reviewed evidence:

- `planning/specs/phase-40/PHASE-40-PRIVATE-MATCHMAKING-MIGRATION-RLS-ADDENDUM-2026-07-01.md`
- `progress/PROGRESS-STEP-338.md`
- `progress/PROGRESS-STEP-341.md`
- `supabase/migrations/20260701221500_phase40_private_match_requests.sql`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/account/PublicProfilePage.tsx`
- `src/app/App.tsx`

The migration's public response fields include safe public profile IDs and display summaries, but no requester/opponent raw auth IDs. The accept RPC separately validates raw participant user IDs inside the submitted projection. This is the mismatch.

## Work Performed

- Confirmed repository state and stable-repo boundary.
- Re-read Phase 40 scope, Stage 40.3/40.4C evidence, and relevant source/migration surfaces.
- Identified the accept-contract blocker before implementing source/UI changes.
- Created this blocked progress report and matching CSV row.

No private matchmaking parser, repository adapter, UI panel, tests, migrations, Supabase configuration, deployment, Git/GitHub operation, backup workflow, or stable repository work was performed.

## Recommended Repair Gate

The safest next action is a narrow planning gate before any new SQL or source work:

**Phase 40 Stage 40.5A - Private Matchmaking Accepted-Game Contract Repair Addendum Planning**

That gate should define an additive repair contract that preserves the sanitized request payload while letting the accept RPC derive or inject requester/opponent participant IDs server-side. One likely shape is a new versioned accept RPC that accepts a client-created game projection without raw `playerUserIds`, validates only approved Practice settings and profile/request eligibility, injects server-known participant IDs into the stored projection, creates the unranked Practice game, and returns only the same sanitized request result plus created game ID. The addendum should also define non-printing probes for anon denial, participant-only acceptance, forbidden field cleanliness, Daily/ranked exclusion, idempotency, and accepted-game projection safety.

Stage 40.5 source integration should not resume until that addendum is reviewed and the corresponding migration/RLS repair is separately authorized and verified.

## Verification

Stage 40.5 stopped before source/runtime edits and before the implementation verification gate because the accept-contract blocker requires a new migration/RLS repair gate.

Lightweight progress-only verification was run after this report and CSV row were created:

- `git diff --check` passed.
- Progress CSV shape check using `python3 -S` reported `rows=344 columns=[12] last_id=342`.
- A first overbroad non-printing credential scan reported source-identifier false positives in changed source files; no matched values were printed.
- A refined changed-content non-printing credential scan reported `scanned_files=36 scanned_changed_or_untracked_lines=4107 credential_pattern_hits=0`.
- Ignored-artifact check treated tracked `.env.example` as an allowed committed template and found no forbidden generated/private artifacts staged or newly tracked.
- Watched-port cleanup check reported `watched_ports_clear=true` for `5173`, `5174`, `3000`, and `4173`.
- `git status --short --branch` completed on `main...origin/main` with the expected Phase 40 planning/source/progress worktree changes and no staged files.

## Blockers And Open Questions

Blocking issue:

- Source-only Stage 40.5 cannot implement private request acceptance without a new database/RPC repair, because the current accept RPC requires raw participant user IDs that the sanitized browser payload must not expose.

Open questions for the repair addendum:

- Should the repair add a new versioned accept RPC instead of changing the already-applied Stage 40.3 function in place?
- Should the source-created projection omit `playerUserIds` entirely, or provide only non-authoritative player labels/profiles while the server injects canonical participant IDs?
- Should the server also inject safe player labels/profiles into the stored projection from active public profile summaries, or should source continue to provide safe public labels while server only injects raw IDs?
- Should Stage 40.5 source integration include create/list/cancel/decline while accept waits, or should all private matchmaking UI stay gated until acceptance is fixed? The recommended answer is to keep all private matchmaking source integration gated so the user receives one complete lifecycle.

## Boundary Confirmation

No Stage 40.5 private matchmaking source/UI integration, parser implementation, test implementation, additional migration, Vercel or Supabase configuration change, deployment, staging, commit, push, PR creation, merge, release, branch deletion, public/guest spectation contract change, spectator presence/count/list implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
