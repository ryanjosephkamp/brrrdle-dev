# Progress Step 239: Phase 31 Stage 31.1 Audit

**Status**: Completed - Awaiting User Review Before Stage 31.2 Migration/RLS Addendum Planning
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-23T23:29:01Z
**Completed**: 2026-06-23T23:33:41Z

## Authorization

The user authorized Phase 31 Stage 31.1 only: postgame and current-surface audit/reproduction.

Allowed work:

- read required governance, Phase 31 planning/spec/implementation materials, current progress records, relevant source/test/Supabase context, and current-surface cleanup surfaces;
- confirm repository state, branch, remotes, `HEAD`, and `origin/main`;
- confirm the original stable `brrrdle` repository is not being used;
- create this Stage 31.1 progress report and matching 12-column CSV row;
- run focused read-only/browser/resource checks as needed;
- audit Practice Multiplayer terminal/result insertion points, ranked queue/settlement paths, unranked/custom Practice flows, Daily Multiplayer invariants, profile accent preview, Stats chart/accessibility overlap, About expected-score formula markup, and rating-bucket display/copy;
- decide whether Stage 31.2 migration/RLS addendum planning is required.

Not authorized:

- source/runtime implementation;
- test implementation;
- Supabase migration creation or execution;
- Vercel configuration;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 32 ranked mode expansion;
- public/guest spectation;
- service workers or push infrastructure;
- Elo algorithm changes;
- gameplay-rule changes;
- new custom skills;
- force-push, secret printing, private data exposure, local session artifact exposure, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- `origin/main`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- Remote: `origin` points to `ryanjosephkamp/brrrdle-dev`.
- Original stable repository: not used.

## Pre-Audit Resource Check

- No listeners on watched ports `5173`, `5174`, `3000`, or `4173`.
- No obvious Stage-owned Vite or Playwright process was running.
- Existing Chrome, Codex helper, and MCP-related node processes were present.
- Disk check reported 67 GiB available on the workspace volume.
- Memory and load showed normal existing pressure for this machine.

## Audit Findings

- Practice Multiplayer terminal/result insertion point:
  - `src/multiplayer/MultiplayerPanel.tsx` already computes `selectedPerformance` for terminal games and renders the result summary, player summaries, answer/definition panels, and terminal status inside the selected-game panel.
  - The safest postgame action insertion point is after the selected performance summary and before turn history/answers, gated to terminal Practice games only.
  - Existing active-game cards and workspace sections already preserve Resume/selected-game routing; the postgame UI should not disturb those route/selection paths.
- Ranked Practice same-settings action:
  - Ranked creation currently runs through the authenticated ranked queue RPC path, then finalizes a durable game from a matched queue reservation.
  - A ranked `Search again` action should reuse the existing queue-only path with the completed game's mode, word length, Hard Mode, and untimed Practice settings.
  - A direct same-opponent ranked rematch should not bypass trusted queue/finalization/settlement without a new approved RPC contract.
- Unranked/custom Practice action:
  - Unranked same-settings play-again can reuse existing game/lobby creation semantics.
  - Custom/private-code same-settings flows should preserve existing lobby and join behavior rather than silently creating unauthorized private cross-client state.
- Daily Multiplayer:
  - Daily participation checks already protect same UTC day/mode participation and terminal Daily rows still count as claimed.
  - Phase 31 should not add Daily rematch, replay, or search-again shortcuts.
- Durable rematch state:
  - True rematch request/accept is mutual cross-client intent after a completed game.
  - Existing ranked queue, custom lobby, active-game, and local selected-game state do not provide participant-only durable request/accept/decline/expiry semantics.
  - A migration/RLS addendum is required before implementing same-opponent rematch request/accept.
- Private profile accent preview:
  - Source audit confirmed the private avatar preview uses `profile?.gradient` from the saved profile rather than the currently selected `accentColor`.
  - The public preview already uses live `publicAccentColor` mapped through `PUBLIC_ACCENT_AVATAR_BACKGROUNDS`, so the private preview can use the same style of mapping without changing persistence semantics.
- Stats chart/accessibility overlap:
  - Source audit confirmed chart components render accessible mirror tables with `className="sr-only"`.
  - The app stylesheet defines `.brrrdle-visually-hidden`, not `.sr-only`, so the hidden tables can render visibly and overlap the chart cards.
  - The likely fix is to use the existing app hidden class, or add a compatible `.sr-only` utility, while preserving accessible table content.
- About expected-score formatting:
  - Source audit confirmed the expected-score explanation is currently one inline sentence.
  - The safest path is a newline plus a semantic formula block using plain text/monospace or accessible math-style markup, without adding a math-rendering dependency or changing the formula.
- Rating-bucket display and stale copy:
  - Source audit confirmed `MultiplayerStatsPanel` labels buckets by splitting the bucket string and rendering `multiplayer ${mode}` in uppercase.
  - The panel renders every raw `competitive.rating.profiles` row without deduping by user plus bucket.
  - `rankedLeaderboardProjections.ts` already has a latest-profile-by-user-bucket pattern that can guide the fix.
  - The stats copy still says public leaderboards remain deferred, which is stale after Phase 30.
  - Recommended cleanup: label buckets as `Ranked Practice OG` / `Ranked Practice GO`, dedupe to the latest profile per bucket/user, surface plain-language explanation that buckets are separate Elo tracks, and avoid silently turning malformed bucket values into extra OG-looking rows.
- Browser/dev-server reproduction:
  - No browser/dev-server reproduction was needed because the requested issues were confirmed through current source paths and the user-provided screenshots.

## Stage 31.2 Migration/RLS Decision

Required.

Reason:

- Phase 31 can implement same-settings `Search again`/queue-again and same-settings lobby/play-again flows with existing source paths after implementation is authorized.
- Practice-only rematch request/accept with the same opponent requires durable mutual-intent state, participant-only reads/writes, wrong-account protections, expiry, cancellation/decline behavior, spam controls, and careful ranked/unranked boundaries.
- Those requirements should be specified in a Stage 31.2 migration/RLS addendum before creating SQL or source/runtime implementation.

## Verification

- `git diff --check` passed.
- Python CSV shape check using `python3 -S` passed: `progress/PROGRESS.csv` has 241 rows, 12 columns, and `last_id=239`.
- `git status --short --branch` passed and showed `main` with expected Phase 31 planning/spec/progress artifacts plus this Stage 31.1 progress report.
- Post-audit resource/process check passed:
  - no watched-port listeners on `5173`, `5174`, `3000`, or `4173`;
  - no obvious Stage-owned Vite or Playwright process;
  - existing Chrome, Codex helper, and MCP-related node processes were present;
  - disk still reported 67 GiB available on the workspace volume;
  - memory and load showed normal existing pressure for this machine.

## Blockers

No blockers.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation/execution, Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, private data exposure, local session artifact exposure, or original stable `brrrdle` repository work was performed.
