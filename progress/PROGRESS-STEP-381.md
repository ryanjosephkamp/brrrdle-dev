# Progress Step 381 - Phase 43 Stage 43.1 Audit

**Status**: Completed - Awaiting User Review Before Ranked Queue Contract Addendum Planning
**Phase**: Phase 43 - Current-Surface UX Cleanup, Ranked Queue Follow-Up, And Gameplay Comfort
**Stage**: 43.1 - Current UX and ranked queue audit
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-07-03T22:33:02Z
**Completed**: 2026-07-03T22:33:02Z

## Authorization

The user authorized Phase 43 Stage 43.1 only: a read-only current UX and ranked queue audit using the completed Stage 43.0 protected baseline.

Authorized work included reading governance, Phase 43 intake/recommendations/planning/spec/implementation materials, Stage 43.0 progress, current progress records, ranked Practice queue/search-again/status surfaces, Home/shell, Stats, Help/About/Settings, Solo, Practice Multiplayer, notifications, clocks, back-to-top, gameplay viewport, spectator viewport, relevant tests, E2E harnesses, and Supabase/RLS context as needed; running focused read-only checks; creating this progress report and matching 12-column CSV row; and deciding whether Stage 43.2 can remain source/test-only or requires migration/RLS addendum planning.

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

## Ranked Queue Audit Findings

The ranked Practice queue/search-again follow-up has two different classes of work:

1. **Client-visible status and button stability** can remain source/test-only when it is limited to visible label/disabled-state stability, stale status display, manual/automatic refresh behavior, search-again routing, and accepted/matched game opening.
2. **Three-player matching fairness after a completed ranked game** appears to be a Supabase queue contract issue and should not be claimed as source-only.

The current client flow in `src/multiplayer/MultiplayerPanel.tsx`:

- creates a ranked queue request through authenticated `rankedQueueActions.createRankedQueueRequest`;
- immediately calls `claimRankedQueuePair`;
- polls queued requests every `RANKED_QUEUE_REFRESH_INTERVAL_MS` while visible;
- avoids visible busy-button churn on automatic refresh by using `shouldShowRankedQueueBusyForRefresh('auto') === false`;
- keeps the create button label stable as `Already queued` while queued;
- finalizes matched rows through `finalizeRankedQueueMatch`.

The current Stage 41/42 tests cover several reliability cases:

- cancelled ranked queue rows stay out of later three-client matching;
- a cancelled request can be re-entered through the current request path;
- automatic ranked queue polling stays out of visible busy button state;
- ranked postgame search-again stays on the trusted ranked queue path.

The current tests do not cover the exact Phase 43 intake scenario where Player 1 and Player 2 complete a ranked Practice match, Player 3 waits in the same exact compatible ranked queue, and Player 1/Player 2 search again but rematch each other instead of pairing with Player 3.

The active ranked queue selection logic is inside `public.claim_ranked_async_matchmaking_pair` in `supabase/migrations/20260626000925_phase33_timed_ranked_practice.sql`. That RPC selects a candidate by:

- queued status;
- different user;
- same async Practice ranked mode, rating bucket, Hard Mode, word length, time control, and supported ranked time limit;
- unexpired request;
- compatible rating search band;
- then orders by closest rating snapshot, oldest queued time, and candidate id.

That SQL does not encode a recent-opponent avoidance, completed-game cooldown, or explicit "waiting third compatible player before immediate rematch" rule. Because browser source cannot safely choose or reorder the server-side matched opponent, the reported three-player matching behavior requires a reviewed ranked queue migration/RLS addendum before implementation.

## Current UX Audit Findings

Current-surface UX cleanup remains mostly source/test-only:

- Home and shell/right-rail density are current source-layout issues. The right rail repeats mode/account/sync/sound/theme details that can be removed, demoted, or moved to Profile/Settings without new database contracts.
- Home Recent Results can create normal-zoom horizontal overflow. That should be repaired in source layout/tests, likely by replacing table-like wide rows with responsive cards or a wrapped/grid layout.
- Stats, Help, About, and Settings information architecture can remain source-only because the Phase 42 stats/dashboard RPCs and Help route already exist. The work should consolidate navigation/copy without changing public stats/admin contracts.
- Solo subtab density cleanup can remain source-only. The OG/GO toggle display and redundant GO status metadata rows can be tightened across applicable Solo subtabs without gameplay-rule changes.
- Practice Multiplayer density cleanup can remain source-only for demoting Ranked Practice explanatory copy, reconsidering Private Practice requests placement, and reducing completed-game button-grid clutter. Any completed-game History routing must use existing participant-owned reads only; if it needs new persistence or visibility contracts, it must stop for a later addendum.
- Notifications click-away, condensed clocks, account dropdown behavior, and back-to-top controls are source/test UI work and should avoid mailbox/social redesign scope.
- Gameplay invalid-guess keyboard stability and bounded spectator/latest-turn comfort are source/test UI work as long as they preserve message content, gameplay rules, public/guest spectator read-only behavior, and Daily spectator exclusion.

## Stage 43.2 Routing Decision

Stage 43.2 should begin with a narrow ranked Practice queue contract addendum planning gate, not direct source/test implementation.

The addendum should decide the safest server-side contract for:

- avoiding immediate repeat opponents when another compatible player is already waiting;
- preserving same-settings ranked Practice search-again;
- preserving queue cancellation, expiration, stale-row denial, trusted settlement, rating-bucket/time-control compatibility, Daily exclusion, gameplay rules, and Elo math;
- adding non-printing probes and real three-client E2E expectations for the Player 1/Player 2/Player 3 scenario;
- keeping browser payloads sanitized and authenticated-only.

After the addendum is reviewed, Stage 43.2 can proceed either to a narrowly authorized migration/RLS repair or to source/test cleanup if the addendum proves no database contract change is needed.

## Migration/RLS Decision

Migration/RLS addendum planning is required for the ranked queue fairness portion of Stage 43.2.

No migration/RLS addendum is currently required for the Home, shell, Stats/Help/About/Settings, Solo, Practice Multiplayer density, notification, back-to-top, invalid-guess, or spectator comfort items, provided those stages stay source/test-only and do not create new persisted queue/profile/stats/admin/spectator contracts.

## Browser And Resource Notes

- No dev server was started.
- No browser automation was run.
- The audit used source, test, planning, and migration inspection only.
- No screenshots, videos, traces, auth state, tokens, secrets, local session artifacts, or private data were staged or intentionally exposed.
- Watched ports `5173`, `5174`, `3000`, and `4173` were clear before the audit and will be checked again in verification.

## Verification

Lightweight documentation verification was run after this progress record and CSV row were created:

- `git diff --check`: passed.
- Progress CSV shape check using `python3 -S`: passed, `rows=383 columns=[12] last_id=381`.
- Non-printing changed/untracked file credential scan: passed, `scanned_files=18 credential_pattern_hits=0`.
- Ignored-artifact check: passed, no forbidden local/generated artifacts staged or tracked. An initial overbroad local helper flagged legitimate tracked auth/source/documentation paths; the corrected artifact check scoped to real forbidden local/generated artifacts passed with `forbidden_artifact_hits=0`.
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear.
- `git status --short --branch`: completed and showed expected uncommitted Phase 42 manual-review, Phase 43 intake/recommendation/planning/spec/implementation, roadmap/testing, and progress artifacts.

## Blockers

Stage 43.2 direct source/test implementation is blocked for the ranked matching fairness issue until a narrow ranked queue migration/RLS addendum is reviewed.

No blocker was found for later current-surface source/test UI cleanup stages if they stay within the existing contracts.

## Next Gate

Authorize Phase 43 Stage 43.2 ranked Practice queue contract addendum planning only.
