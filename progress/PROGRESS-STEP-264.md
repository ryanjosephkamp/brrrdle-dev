# Progress Step 264: Phase 33 Stage 33.1 Ranked Ladder Audit

**Date:** 2026-06-25
**Status:** Completed - awaiting user review before Stage 33.2 timed ranked migration/RLS addendum planning
**Phase:** Phase 33 - Competitive ladder v2 readiness
**Stage:** 33.1 - Ranked ladder audit and scope lock

## Authority

The user authorized Phase 33 Stage 33.1 audit only. This pass read governance, Phase 33 planning/spec/implementation materials, current progress records, ranked queue/settlement/rating surfaces, timed Practice Multiplayer surfaces, public leaderboard/rating display surfaces, relevant tests, and Supabase/RLS context enough to decide the next safe gate.

This pass did not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, deployment, Vercel or Supabase configuration, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or original stable repository work.

## Repository State

- Working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- `origin/main`: `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`
- Original stable `brrrdle` repository was not used.
- Existing uncommitted Phase 33 planning/spec/progress artifacts were preserved:
  - `planning/README.md`
  - `planning/phase-33/PLANNING-BRIEF.md`
  - `planning/phase-33/IMPLEMENTATION-PLAN.md`
  - `planning/specs/phase-33/PHASE-33-COMPETITIVE-LADDER-V2-READINESS-SPEC-2026-06-25.md`
  - `progress/PROGRESS-STEP-260.md`
  - `progress/PROGRESS-STEP-261.md`
  - `progress/PROGRESS-STEP-262.md`
  - `progress/PROGRESS-STEP-263.md`
  - `progress/PROGRESS.csv`

## Resource Checks

Pre-audit resource check:

- Watched ports `5173`, `5174`, `3000`, and `4173`: clear.
- Existing user/system Chrome, Codex, node helper, VS Code, and related processes were observed; no Stage 33-owned dev server or Playwright process was started.
- Disk: about 77.8 GB free.
- Load average at the pre-audit check: `3.83, 3.91, 4.49`.

No browser or local dev server was required for this read-only audit.

Post-audit resource check:

- Watched ports `5173`, `5174`, and `3000`: clear.
- Watched port `4173`: occupied by `/Library/Frameworks/Python.framework/Versions/3.12/Resources/Python.app/Contents/MacOS/Python -m http.server 4173` with PID `26080`, parent PID `1148`.
- The Python listener was not started by this Stage 33.1 audit and was not stopped in this pass.
- An unrelated Playwright CLI daemon and headless Chrome process were also observed; no Stage 33.1 browser work was performed.
- Disk: about 83 GB free.
- Load average at the post-audit check: `4.53, 3.86, 4.26`.

## Audit Findings

### Timed Practice ranked is intentionally blocked in source today

The current app-side ranked path is consistently scoped to untimed Practice only:

- `src/multiplayer/matchmaking.ts` rejects positive `timeLimitMs` in `getRankedMatchmakingEligibility` with `Timed Practice ranked matchmaking is deferred.`
- `src/multiplayer/scoring.ts` rejects timed ranked evidence in `getCompetitiveRatingEligibility` with `Timed Practice ranked multiplayer is deferred.`
- `src/multiplayer/postgameActions.ts` keeps timed ranked search-again unavailable and routes ranked postgame continuation through the trusted queue path.
- `src/multiplayer/MultiplayerPanel.tsx` blocks timed ranked queue entry and user-facing copy still says ranked is signed-in, untimed Practice only.
- `src/multiplayer/multiplayerRepository.ts` sends `p_time_limit_ms: null` when creating ranked queue requests and excludes positive timed games from trusted settlement candidates.

### Timed Practice mechanics exist, but ranked trust does not

Existing Practice Multiplayer timing already tracks `timeLimitMs`, `timeRemainingMs`, `turnStartedAt`, `timedOutPlayerId`, timeout winner behavior, and stale timeout-save protection for unranked timed Practice. Those mechanics are a useful foundation, but they are not enough for ranked release because trusted queue/finalization/settlement must agree on canonical timing evidence.

### Timed ranked requires migration/RLS addendum planning

Stage 33.2 migration/RLS addendum planning is required before timed Practice ranked implementation can proceed safely.

The Phase 27 SQL/RPC layer explicitly rejects timed ranked:

- `create_ranked_async_matchmaking_request` raises `Timed Practice ranked matchmaking is deferred` when `p_time_limit_ms > 0`.
- `claim_ranked_async_matchmaking_pair` requires `time_limit_ms is null` for both request and candidate rows.
- `finalize_ranked_async_matchmaking_game` rejects nonzero projection `timeLimitMs`.
- `settle_ranked_async_multiplayer_match` rejects positive ranked `timeLimitMs` and requires matching queue rows with `time_limit_ms is null`.
- `phase27_rating_bucket_for_mode` only maps mode to `async:og` or `async:go`.

The Phase 32 participant identity RPC also rejects ranked queue identity contexts when either matched request has non-null `time_limit_ms`, so timed ranked queue identity compatibility must be part of the addendum.

### Rating bucket semantics need an explicit timed bucket contract

Current app buckets are typed and parsed as `multiplayer:og` and `multiplayer:go` only, with legacy normalization for `async:*` and `live:*`. Timed ranked v1 should not reuse untimed buckets. The addendum should define storage and app bucket mapping for separate timed ranked buckets such as:

- `multiplayer:og:timed:v1`
- `multiplayer:go:timed:v1`

and the matching storage/RPC representation.

### Rank bands are source-only

Display-only rank labels/bands do not require SQL if they are derived from rating values already returned in existing profiles and public leaderboard rows. This should be implemented with pure source helpers and tests, and must not change Elo math, rating persistence, or settlement.

### Public leaderboard All buckets cleanup is source-only

The public ranked leaderboard repository already supports a `null` bucket internally, and the Phase 30 RPC supports `p_bucket null`. Removing the player-facing `All buckets` button/view can be source-only if internal null-bucket support remains for compatibility or admin/debug use. The UI should default to OG or another explicit bucket per the Phase 33 spec rather than exposing `All buckets` as a selectable player view.

If timed ranked public leaderboard exposure is attempted in Phase 33, that becomes SQL/RLS work. The safer Phase 33 direction is to keep timed ranked buckets out of public leaderboard exposure until timed ranked settlement is proven and a later leaderboard expansion is explicitly planned.

### Deferred observations remain routed later

- Vercel protection, Supabase auth email wording, password/email management, and account readiness remain routed to a later auth/deployment readiness phase.
- Beginner onboarding/help remains routed to a later UX/onboarding phase.
- Daily ranked and ranked custom/private-code games remain deferred.
- Public/guest spectation remains deferred.

## Scope Lock Recommendation

Proceed to Stage 33.2 migration/RLS addendum planning before implementing timed Practice ranked.

The source-only work for display rank bands and public leaderboard `All buckets` removal can proceed later in Phase 33 without SQL, but the timed ranked expansion cannot safely proceed until the SQL/RPC/RLS contract is specified. Stage 33.2 should decide the exact additive database contract, privacy probes, rollback plan, public leaderboard non-exposure, participant identity compatibility, and two-client verification requirements.

## Verification

Verification is recorded after running the Stage 33.1 lightweight gate:

- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: passed with `rows=266 columns=[12] last_id=264`.
- Non-printing secret/artifact scan over changed tracked and untracked repository files: passed with `scanned_files=7 credential_pattern_hits=0 changed_artifacts=0`.
- Ignored-artifact check for `.env.local`, `dist/`, `node_modules/`, `test-results/`, `playwright-report/`, screenshots, videos, traces, auth state, tokens, and local session artifacts: passed with `tracked_forbidden=0 staged_forbidden=0 staged_files=0`.
- `git status --short --branch`: showed expected Phase 33 planning/spec/progress documentation changes only.
- Resource check: noted the unrelated port `4173` Python listener and unrelated Playwright daemon/browser processes described above.

## Boundaries

No source/runtime code, tests, migrations, deployment, Vercel/Supabase configuration, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, gameplay/Elo changes, brrrdle GitHub backup workflow execution, secret printing, private data exposure, local session artifact exposure, or original stable `brrrdle` repository work was performed.

## Next Gate

If approved, the next safe action is Stage 33.2 timed ranked migration/RLS addendum planning. Do not create or run SQL migrations, edit source/runtime code, implement tests, deploy, or start Git/GitHub operations until that addendum is reviewed and approved.
