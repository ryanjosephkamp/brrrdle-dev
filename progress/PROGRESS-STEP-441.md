# Progress Step 441 - Phase 48 Stage 48.5 Private Daily And Ranked Daily Contract Decision

**Status:** Completed - Awaiting User Review Before Stage 48.6
**Phase:** Phase 48 - Profile And Multiplayer Contract Simplification
**Stage:** Stage 48.5 - Private Daily And Ranked Daily Contract Decision
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-06T04:10:30Z
**Completed:** 2026-07-06T04:11:52Z

## Authorization

The user authorized Phase 48 Stage 48.5 only: documentation/planning decision for private Daily and ranked Daily contract feasibility using the completed Stage 48.4 custom-code/private game decision baseline.

Authorized work includes confirming repository state and stable-repo boundary, preserving the user-updated `planning/phase-47/REVIEW-CHECKLIST.md`, reading Phase 48 planning/spec/implementation materials and Stage 48.1 through 48.4 progress, auditing private Daily feasibility and ranked Daily/ranked-unranked Daily contract surfaces, deciding source-only versus addendum routing, creating a narrow addendum if required, creating this progress report and the matching 12-column CSV row, and running lightweight verification.

This stage does not authorize source/runtime implementation, test implementation, Supabase migrations, storage changes, Vercel/Supabase configuration, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, backup workflow execution, spectator presence/count/list, service workers/push, gameplay-rule changes, Elo changes, secrets/private-data/local-artifact exposure, local Codex skill changes, or original stable `brrrdle` repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed baseline expectation from Stage 48.4: local and remote `main` at `f3dab778906edc4dad6c8c34365c8354c1affb1f`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved the user-updated `planning/phase-47/REVIEW-CHECKLIST.md`.

## Audit Summary

Audited the private Daily and ranked Daily contract surfaces:

- `src/multiplayer/privateMatchmaking.ts` creates accepted private-match projections as unranked Practice games only and intentionally omits `dailyDateKey`, `customGameCode`, `matchmakingRequestId`, and browser-supplied `playerUserIds`.
- `src/multiplayer/privateMatchmaking.test.ts` explicitly asserts accepted private matches are fresh unranked Practice games with no Daily key and no custom/ranked queue markers.
- `src/multiplayer/MultiplayerPanel.tsx` loads private match requests only for Practice scope and marks Daily ranked matchmaking as deferred.
- `src/multiplayer/dailyMultiplayer.ts` keeps Daily Multiplayer deterministic, UTC-date keyed, and answer-separated for OG/GO.
- `src/multiplayer/scoring.ts` rejects Daily ranked eligibility with `Daily ranked multiplayer is deferred.`
- `src/multiplayer/multiplayerRepository.ts` only treats Practice, non-custom, trusted ranked queue games as settlement candidates and creates ranked queue requests with `p_scope: 'practice'`.
- `docs/ranked-multiplayer.md` states that only eligible ranked Practice games affect Elo and Daily ranked remains deferred.
- `docs/supabase.md` documents private matchmaking as unranked Practice-only and Daily claims as protected authenticated claim authority.

## Decision Summary

Private Daily and ranked Daily cannot safely proceed as source-only UI/routing work.

Both are deferred behind a protected contract addendum because they can affect Daily claim safety, answer secrecy, UTC-day uniqueness, ranked/unranked separation, trusted settlement authority, public leaderboard exposure, and Elo/rating semantics.

Created addendum:

- `planning/specs/phase-48/PHASE-48-PRIVATE-DAILY-AND-RANKED-DAILY-CONTRACT-ADDENDUM-2026-07-06.md`

## Key Contract Boundaries

- Private Practice requests remain authenticated-only, unranked, Practice-only, and between active public profiles.
- Private Daily remains deferred until a later addendum defines request lifecycle, claim timing, release semantics, answer secrecy, participant eligibility, identity boundaries, and Supabase/RLS/RPC requirements.
- Ranked Daily remains deferred until a later competitive-integrity addendum defines ranked/unranked Daily separation, claim buckets, rating buckets, trusted queue/finalization/settlement authority, leaderboard exposure, and anti-cheat implications.
- Daily Multiplayer remains UTC-day keyed, answer-separated, asynchronous, five-letter, no-clock, claim-safe, and unrated.
- Ranked Practice v1 and canonical five-minute timed ranked Practice remain unchanged.
- No gameplay rules or Elo math changed.

## Files Changed In This Stage

- `planning/specs/phase-48/PHASE-48-PRIVATE-DAILY-AND-RANKED-DAILY-CONTRACT-ADDENDUM-2026-07-06.md` - records the protected addendum gate for private Daily and ranked Daily.
- `progress/PROGRESS-STEP-441.md` - records this Stage 48.5 documentation/planning decision.
- `progress/PROGRESS.csv` - appended the matching 12-column progress row.

Existing uncommitted Phase 48 planning/spec/progress artifacts and Stage 48.0A, Stage 48.3, and Stage 48.4 source/test changes remain present and were not reverted.

## Verification

Passed:

- `git diff --check`
- progress CSV shape check using `python3 -S`: `rows=443 columns=[12] last_id=441`
- non-printing changed/untracked file credential-value scan: `scanned_files=27 credential_value_hits=0 binary_skipped=0`
- ignored-artifact check: `tracked_files=1132 staged_files=0 forbidden_artifact_hits=0`
- watched-port cleanup check: `5173`, `5174`, `3000`, and `4173` clear
- `git status --short --branch`

## Addendum Status

Addendum created. It is a review/planning gate only and does not authorize implementation, migrations, RLS/RPC changes, private Daily, ranked Daily, server-authoritative Daily, gameplay-rule changes, or Elo changes.

## Blockers And Open Questions

- No blockers for Phase 48 v1 final hardening.
- Open decision for a later phase or addendum review: whether private Daily, ranked Daily, both, or neither should be implemented after the protected contract questions are answered.

## Boundary Confirmation

This stage remained documentation/planning-only. It did not modify source/runtime files, tests, migrations, Supabase configuration, Vercel configuration, deployment state, Git/GitHub state, gameplay rules, Elo math, or the original stable `brrrdle` repository.

The decision preserves Daily claim safety, UTC-day behavior, answer separation, ranked Practice Elo math, Phase 48 Profile/Settings clarity, Stage 48.4 custom-code hiding/legacy behavior, Phase 47 repairs, Phase 46 sync/freshness protections, Phase 45 Solo boundaries, and prior phase invariants.
