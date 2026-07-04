# Progress Step 384 - Phase 43 Stage 43.2C Ranked Queue Fairness Migration Repair

**Status**: Completed - Awaiting User Review Before Source/UI Work
**Phase**: Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort
**Stage**: 43.2C - Ranked queue fairness migration repair
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T23:19:00Z
**Completed**: 2026-07-03T23:19:00Z

## Authorization

The user authorized Phase 43 Stage 43.2C only: narrow repair of the failed Stage 43.2B ranked queue fairness migration.

Authorized work included confirming repo state and the stable-repo boundary, confirming the linked Supabase target without printing secrets, verifying the remote migration ledger did not contain version `20260703230106`, revising only the un-applied `20260703230106` migration if safe, preserving the browser-facing `claim_ranked_async_matchmaking_pair(text, text)` signature and response shape, running dry-run and actual push only if clean, running non-printing fairness and grant/RLS boundary probes, and recording progress.

This pass did not authorize source/UI work, broad test implementation, unrelated migrations, deployment/configuration, Git/GitHub operations, backup workflow execution, gameplay-rule changes, Elo changes, public/guest spectator changes, secret printing, private data exposure, local session artifact exposure, local Codex skill changes, or original stable `brrrdle` repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `a81e636cd26eb178e1d0bcc75554a1edffe7639d`.
- `origin/main`: `a81e636cd26eb178e1d0bcc75554a1edffe7639d`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- Linked Supabase project metadata identified the target as `brrrdle-dev` without printing secrets.
- Remote migration ledger initially showed local version `20260703230106` with no remote version, so the failed Stage 43.2B migration had not been applied.
- The original stable `brrrdle` repository was not used or touched.
- The user-updated `planning/phase-42/REVIEW-CHECKLIST.md` was preserved.
- No files were staged, committed, pushed, merged, deployed, or released.

## Migration Repair

Revised only:

- `supabase/migrations/20260703230106_phase43_ranked_queue_matching_fairness.sql`

The Stage 43.2B blocker was caused by assuming `async_multiplayer_games` had physical `hard_mode` and `time_limit_ms` columns. The repaired migration now:

- keeps the supporting indexes limited to physical `async_multiplayer_games` columns;
- derives recent completed-game Hard Mode from trusted stored projection field `hardMode`;
- derives recent completed-game time control from trusted stored projection field `timeLimitMs`;
- parses those projection fields defensively so missing or invalid values do not leak authority or crash candidate ordering;
- preserves the existing browser-facing `claim_ranked_async_matchmaking_pair(text, text)` signature and returned table shape;
- preserves the soft recent-opponent penalty: compatible non-recent candidates sort before recent same-settings candidates, while a recent rematch remains allowed when it is the only compatible option.

## Migration Execution

- `npx --yes supabase db push --linked --dry-run`: passed and showed exactly `20260703230106_phase43_ranked_queue_matching_fairness.sql` would be pushed.
- `npx --yes supabase db push --linked --yes`: passed and applied `20260703230106_phase43_ranked_queue_matching_fairness.sql`.
- Post-apply migration ledger check confirmed remote version `20260703230106`.

## Non-Printing Probes

Remote SQL probes were run without printing raw auth ids, emails, private row data, projections, secrets, tokens, sessions, screenshots, videos, traces, or local artifacts.

Passed probes:

- Migration ledger: `20260703230106` present remotely after apply.
- Grant boundary: `claim_ranked_async_matchmaking_pair(text, text)` remains denied to `anon` and granted to `authenticated`.
- Helper boundary: `phase43_is_recent_ranked_practice_opponent(...)` remains denied to `anon` and `authenticated`.
- Protected table grants: no direct `anon` table grants on ranked queue/rating/result/async game protected tables.
- Ranked queue RPC grants: create, cancel, claim, status, and finalize remain denied to `anon` and granted to `authenticated`.
- Fairness behavior: a compatible waiting third player is preferred over an immediate recent same-settings rematch.
- Fairness behavior: a recent same-settings rematch is still allowed when no compatible non-recent opponent is available.
- Participant boundary: a non-owner is denied when trying to claim another user's queue request.
- Probe cleanup: fixed-prefix probe rows were defensively removed after transactional probes.

One intermediate probe script failed before testing behavior because a `null` in a `union all` was inferred as text for `time_limit_ms`; the probe was corrected with explicit integer casts, defensively cleaned up by fixed prefix, and rerun successfully.

## Verification

Final lightweight verification was run after this progress record and CSV row were created:

- `npx --yes supabase db push --linked --dry-run`: passed with no pending migrations.
- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: passed, `rows=386 columns=[12] last_id=384`.
- Non-printing changed/untracked file credential scan: passed, `credential_pattern_hits=0`.
- Ignored-artifact check: passed, `forbidden_artifact_hits=0`.
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear.
- `git status --short --branch`: completed and showed expected uncommitted Phase 42 manual-review, Phase 43 planning/spec/progress, docs, and migration artifacts.

## Blockers

No Stage 43.2C migration/RLS blocker remains.

Stage 43 source/UI work remains unstarted and should proceed only through the next authorized gate.

## Boundary Confirmation

No source/UI work, broad test implementation, unrelated migration, deployment/configuration, Git/GitHub operation, backup workflow execution, gameplay-rule change, Elo change, public/guest spectator change, secret/private-data/local-artifact exposure, local Codex skill change, or original stable repository work was performed.

## Next Gate

Authorize Phase 43 Stage 43.3 Stats, Help, About, and Settings information architecture only, or return to Stage 43.2 source/test follow-up only if the user wants additional client-visible ranked queue cleanup before moving on.
