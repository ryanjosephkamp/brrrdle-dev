# Progress Step 315 - Phase 38 Stage 38.2 Public Spectator Migration/RLS Addendum Planning

**Status**: Completed - Awaiting User Review Before Stage 38.3
**Phase**: 38, Public/Spectator Readiness
**Stage**: 38.2, public spectator migration/RLS addendum planning
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-30T21:41:50Z
**Completed**: 2026-06-30T21:41:50Z

## Authorization

The user authorized Phase 38 Stage 38.2 only: migration/RLS addendum planning for public/guest spectator readiness using the completed Stage 38.1 audit baseline.

This pass did not authorize and did not perform source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- The original stable `brrrdle` repository was not used.
- The user-edited `planning/phase-37/REVIEW-CHECKLIST.md` state was preserved.

## Required Reading

Read and used:

- `CONSTITUTION.md`
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- `BRRRDLE-SPEC.md`
- `planning/phase-38/PLANNING-BRIEF.md`
- `planning/specs/phase-38/PHASE-38-PUBLIC-SPECTATOR-READINESS-SPEC-2026-06-30.md`
- `planning/phase-38/IMPLEMENTATION-PLAN.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-313.md`
- `progress/PROGRESS-STEP-314.md`
- `docs/supabase.md`
- `docs/ranked-multiplayer.md`
- `agents.md`
- `memory.md`
- `package.json`

Also inspected read-only as needed:

- `src/multiplayer/MultiplayerLive.tsx`
- `src/multiplayer/multiplayerViewModels.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/account/publicProfile.ts`
- `src/account/profile.ts`
- Supabase migrations for authenticated spectator, public profile RLS, participant identity, ranked Live identity spectator profiles, and public leaderboard boundaries.

## Artifacts Created

- `planning/specs/phase-38/PHASE-38-PUBLIC-SPECTATOR-MIGRATION-RLS-ADDENDUM-2026-06-30.md`
- `progress/PROGRESS-STEP-315.md`

## Key Addendum Decisions

- Public/guest spectation requires a dedicated additive public spectator projection RPC.
- The existing authenticated spectator RPC must remain authenticated-only.
- Participant identity RPCs must remain authenticated participant-scoped.
- The Stage 38.3 migration should be exactly one additive migration after review.
- The recommended public RPC is `get_public_live_v1_spectator_games_v1(p_limit integer default 25, p_terminal_window_seconds integer default 15, p_game_id text default null)`.
- The public projection is Practice Multiplayer only.
- Current Daily Multiplayer and historical Daily records remain excluded.
- Inputs must be bounded server-side.
- Grants should allow `anon` and `authenticated` execute on the dedicated public RPC only.
- No direct table grants should be added.
- Returned fields are limited to safe display, progress, active public profile summary, and read-only capability data.
- The projection must not expose raw auth IDs, raw user IDs, emails, private profile fields, answers, seeds, serialized sessions, player sessions, raw projections, queue internals, rating internals, rating transactions, service IDs, tokens, screenshots, videos, traces, auth state, or local artifacts.
- Public profile IDs are omitted in Phase 38 v1 to preserve Phase 39 routing for public/social profile browsing.
- All mutation capability flags must be false.

## Spectator Presence Routing

Identity-bearing spectator lists remain deferred.

Stage 38.3 should not create a spectator presence table, viewer write path, or identity-bearing spectator list. Stage 38.5 may evaluate a bounded aggregate count only if it can be display-only, privacy-safe, abuse-resistant, and free of raw viewer identifiers, auth state, IP addresses, session IDs, local storage IDs, profile IDs, or cross-session tracking data.

## Stage 38.3 Recommendation

After user review, Stage 38.3 should proceed as migration/RLS execution only:

- create exactly one additive migration;
- apply it only to the confirmed `brrrdle-dev` Supabase project if the target and credentials are unambiguous;
- run the addendum's non-printing probes;
- update docs only if needed;
- stop before source/runtime public/guest spectator integration.

Source/runtime public/guest Live discovery and read-only spectation integration remains Stage 38.4.

## Verification

Passed:

- `git diff --check`
- progress CSV shape check using `python3 -S`: `rows=317 columns=[12] last_id=315`
- non-printing credential-shaped secret/artifact scan: `scanned_files=13 credential_pattern_hits=0`
- ignored-artifact check: initial overbroad matcher flagged the tracked `.env.example` template; refined check reported `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear
- `git status --short --branch`

## Resource Observations

No local dev server, browser reproduction, migration execution, or remote configuration work was started for this planning pass.

## Blockers And Open Questions

- No blockers for review.
- Stage 38.3 must stop before remote migration execution if the Supabase target or credentials are ambiguous.
- Stage 38.5 must separately decide whether aggregate spectator counts are safe; identity-bearing lists remain deferred.

## Boundary Confirmation

No source/runtime implementation, tests, SQL migration creation/execution, Vercel/Supabase configuration, deployment, Git/GitHub operation, backup workflow execution, public/guest spectation implementation, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, or stable repository work was performed.
