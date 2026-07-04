# Progress Step 382 - Phase 43 Stage 43.2 Ranked Queue Contract Addendum Planning

**Status**: Completed - Awaiting User Review Before Ranked Queue Migration/RLS Execution
**Phase**: Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort
**Stage**: 43.2 - Ranked Practice queue contract addendum planning
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T22:40:09Z
**Completed**: 2026-07-03T22:40:09Z

## Authorization

The user authorized Phase 43 Stage 43.2 only: documentation/planning-only ranked Practice queue matching fairness contract addendum planning using the completed Stage 43.1 audit baseline.

Authorized work included reading governance, Phase 43 planning/spec/implementation materials, Stage 43.1 audit findings, ranked queue source/tests/E2E harnesses, relevant Supabase ranked queue migrations/RPCs, docs, and progress records enough to define the smallest safe migration/RLS repair path.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation contract changes, spectator presence/count/list implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, creating/modifying local Codex skills, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `a81e636cd26eb178e1d0bcc75554a1edffe7639d`.
- `origin/main`: `a81e636cd26eb178e1d0bcc75554a1edffe7639d`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-42/REVIEW-CHECKLIST.md` was preserved.
- No files were staged, committed, pushed, merged, deployed, or released.

## Addendum Created

Created:

- `planning/specs/phase-43/PHASE-43-RANKED-QUEUE-MATCHING-FAIRNESS-ADDENDUM-2026-07-03.md`

The addendum documents the narrow ranked queue SQL/RLS repair contract for review. It does not create or run a migration.

## Ranked Queue Contract Decision

The Stage 43.1 audit finding was confirmed: the Player 1/Player 2/Player 3 ranked Practice queue fairness issue is controlled by `public.claim_ranked_async_matchmaking_pair`, not by browser UI alone.

The addendum recommends an additive migration that preserves the current browser-facing RPC signature and returned table shape while adding a server-side soft recent-opponent penalty:

- prefer a compatible non-recent opponent when one exists;
- allow a recent-opponent match when that is the only compatible queued candidate;
- preserve current compatibility filters for async Practice ranked mode, rating bucket, Hard Mode, word length, exact ranked time control, expiration, and rating search band;
- preserve existing rating-distance, queued-time, and id tie-break behavior within the same recentness class;
- preserve authenticated-only browser RPC authority and direct table grant denial.

The addendum explicitly avoids Elo math changes, gameplay-rule changes, Daily ranked work, ranked private/custom-code work, public/guest spectator changes, and source/UI implementation.

## Migration/RLS Decision

Custom SQL/RLS repair is required before claiming the ranked queue fairness issue is fixed.

The next safe gate is a migration/RLS execution stage that creates exactly one additive migration for the ranked queue claim contract, applies it only to confirmed `brrrdle-dev` Supabase when dry-run and target checks are clean, runs non-printing probes, updates ranked/Supabase docs only if needed, records progress, and halts before source/UI work.

## Verification

Lightweight documentation verification was run after this progress record, the addendum, and CSV row were created:

- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: passed, `rows=384 columns=[12] last_id=382`.
- Non-printing changed/untracked file credential scan: passed, `scanned_files=20 credential_pattern_hits=0`.
- Ignored-artifact check: passed, `forbidden_artifact_hits=0`.
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear.
- `git status --short --branch`: completed and showed expected uncommitted Phase 42 manual-review, Phase 43 intake/recommendation/planning/spec/addendum/implementation, roadmap/testing, and progress artifacts.

## Blockers

Stage 43.2 direct source/test UI implementation remains blocked for ranked queue fairness until the ranked queue migration/RLS repair is reviewed and executed successfully.

No blocker was found for later current-surface source/test UI cleanup stages if they stay within existing contracts.

## Next Gate

Authorize Phase 43 Stage 43.2B ranked queue matching fairness migration/RLS execution only.
