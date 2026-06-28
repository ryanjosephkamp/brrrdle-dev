# Progress Step 284: Phase 35 Stage 35.1 Ranked Live Identity Audit

**Date:** 2026-06-27
**Phase:** Phase 35 - Auth, Profile, Deployment, And Live Identity Readiness
**Stage:** Stage 35.1 - Ranked Live Identity Audit And Scope Lock
**Status:** Completed - Awaiting User Review Before Stage 35.2 Migration/RLS Addendum Planning

## Authorization

The user authorized Phase 35 Stage 35.1 only: read-only ranked Live identity audit and scope lock. The pass includes reading governance, Phase 35 planning/spec/implementation materials, Stage 35.0 progress, current progress records, user-provided Live screenshots, Live identity source surfaces, relevant tests, Supabase/RLS context as needed, creating this progress report and matching CSV row, and deciding whether Stage 35.2 should proceed as source-only repair or migration/RLS addendum planning.

The prompt does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- `origin/main`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- Existing user edits to `planning/phase-34/REVIEW-CHECKLIST.md`: preserved.

## User Evidence Reviewed

- `/Users/noir/Desktop/player1.png`: participant creator perspective. The ranked Live card shows the opponent as `kiki`, matching the expected safe public name for that opponent.
- `/Users/noir/Desktop/player2.png`: participant joined-player perspective. The ranked Live card falls back to `Rival` where the creator should resolve as `claudine`; the adjacent unranked card resolves `claudine`.
- `/Users/noir/Desktop/spectator.png`: signed-in nonparticipant spectator perspective. The ranked Live card falls back to `Player one vs kiki` and `Player one's turn` where it should resolve as `claudine vs kiki` and `claudine's turn`; the adjacent unranked card resolves `claudine`.

## Audit Findings

The regression is ranked-finalization specific, not a general Live card rendering failure.

Relevant source path:

- `src/multiplayer/multiplayerPanelRankedQueue.ts` builds a finalized ranked game from queue status with `playerProfiles` containing only the current finalizing viewer's profile.
- `src/multiplayer/MultiplayerPanel.tsx` sends that projected game into `finalizeRankedQueueGame`.
- `supabase/migrations/20260626000925_phase33_timed_ranked_practice.sql` validates the ranked game projection and stores it in `async_multiplayer_games.projection`.
- `src/multiplayer/multiplayerViewModels.ts` participant Live rows derive labels from `MultiplayerGame.playerProfiles` or stored player labels.
- `supabase/migrations/20260618004638_phase28_live_spectator_v2_daily_terminal_hold.sql` builds authenticated spectator player labels from `game.projection.players` and `game.projection.playerProfiles`; it does not join `public_player_profiles`.

The screenshot pattern matches that data path:

- The ranked durable projection appears to include `kiki` because the finalizing viewer's profile was `kiki`.
- The ranked durable projection does not include `claudine`, so joined-player Live rows fall back to `Rival` for the creator.
- The signed-in spectator RPC can see the stored `kiki` profile from the projection but cannot resolve missing `claudine` from existing spectator output, so it falls back to `Player one`.
- The unranked game resolves both names because the unranked create/join path preserves creator and joiner profile summaries in the game projection.

Existing safe data availability:

- Participant-side safe identity data exists through `get_multiplayer_participant_identity_summaries(p_game_id)`, which joins `async_multiplayer_games.player_one_user_id` and `player_two_user_id` to active public profiles for authenticated participants.
- Current participant source only hydrates identity for the selected game inside `MultiplayerPanel`; it does not hydrate the Live list rows globally.
- Signed-in nonparticipant spectator safe identity data is not available through the current spectator RPC when `game.projection.playerProfiles` is missing a participant profile. The spectator RPC currently has the server-side user ids but returns only projection-derived profile fields.

## Scope Decision

Stage 35.2 should proceed as migration/RLS addendum planning, not source-only repair.

Rationale:

- A source-only repair could improve participant Live rows by calling the existing participant identity RPC for visible participant games, but it cannot repair signed-in nonparticipant spectator rows without a safe spectator projection that includes both players' active public profile summaries.
- The addendum should define a narrow authenticated-only spectator RPC update that joins `public_player_profiles` server-side for `player_one_user_id` and `player_two_user_id`, returns only the existing allow-listed safe profile fields, preserves public/guest spectation deferral, and does not expose raw auth ids, emails, private profile fields, answers, seeds, sessions, queue internals, rating internals, tokens, or local artifacts.
- After the addendum and any separately authorized migration execution, a source stage can merge participant identity summaries and updated spectator profile fields into Live view models with focused tests.

## Verification

Passed:

- `git diff --check`
- Python CSV shape check using `python3 -S`: `rows=286 columns=[12] last_id=284`
- non-printing secret/artifact scan over changed tracked and untracked repository files: `scanned_files=10 credential_pattern_hits=0 changed_artifacts=0`
- ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0 allowed_tracked_env_templates=1`
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: no listeners found.
- `git status --short --branch`

Note: an initial over-broad ignored-artifact helper counted the repository's allowed tracked env template as a forbidden tracked artifact. The refined project-appropriate check excludes allowed env templates and found no forbidden tracked or staged artifacts.

## Resource And Browser Notes

- No local dev server or browser reproduction was required. The screenshots plus source/RPC audit were sufficient to classify the data-path gap.
- Watched ports `5173`, `5174`, `3000`, and `4173` were clear after the audit.

## Boundaries Preserved

No source/runtime code, tests, Supabase migrations, Vercel/Supabase configuration, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable `brrrdle` repository work was performed.

## Next Step

Review this Stage 35.1 audit and scope-lock evidence. If approved, explicitly authorize Stage 35.2 migration/RLS addendum planning for ranked Live identity before SQL migration creation/execution, source repair, auth/deployment work, Vercel/Supabase configuration, deployment, Git/GitHub operations, backup workflow execution, or original stable repository work.
