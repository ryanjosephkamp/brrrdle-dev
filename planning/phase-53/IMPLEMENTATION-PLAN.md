# Phase 53 Stats, Progression Transparency, And Public Rating Metadata Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` only if scopes are truly disjoint, or `superpowers:executing-plans` for inline execution. Steps use checkbox (`- [ ]`) syntax for tracking. Do not commit during implementation; this repository's governed Git/GitHub backup flow happens only through a later explicit prompt.

**Goal:** Improve Stats, progression transparency, and privacy-safe public rating/profile metadata without changing gameplay, rewards, scoring, Elo, or storage authority.

**Architecture:** Keep Phase 53 source/test-first. Use pure selectors and existing components where possible, route public rating metadata through already allowlisted public leaderboard contracts, and stop for a separate addendum if implementation requires new Supabase/RLS/RPC/storage work.

**Tech Stack:** React, TypeScript, Vite, Vitest, Playwright, Supabase RPC repository adapters, existing brrrdle UI primitives.

## Global Constraints

- Work only in `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Do not touch the original stable `brrrdle` repository.
- Preserve accepted Phase 50, Phase 51, and Phase 52 behavior.
- Do not change gameplay rules, Daily claim rules, Solo persistence, multiplayer persistence, rewards, XP formulas, coin formulas, consumable costs, scoring, Elo/rating formulas, rank bands, ranked queue behavior, or private Practice matchmaking behavior.
- Do not perform Git/GitHub actions, commits, pushes, PRs, merges, releases, deployment configuration changes, public tunneling, or stable-repository work.
- Do not perform remote Supabase migration/RPC/RLS/schema/table/storage/grant work. If a source-controlled migration or remote change is required, stop and prepare a separate addendum prompt.
- Do not expose raw auth ids, emails, account ids, private account data, progress snapshots, history payloads, game answers, seeds, serialized sessions, queue ids, match ids, transaction ids, tokens, credentials, or local session artifacts.
- Keep `prompt-packages/` ignored/local-only.

---

## Current Implementation Review

### Stats And Progression

- `src/stats/statistics.ts` owns four local stats buckets: OG Daily, OG Practice, GO Daily, and GO Practice.
- `src/stats/statsSelectors.ts` already derives chart data for win rates, difficulty tiers, calendar activity, XP progress, and coin trends.
- `src/stats/StatsDashboard.tsx` renders private local stats plus public site stats. It needs clearer section architecture and provenance labels.
- `src/app/ProgressionHud.tsx` already links to Stats and displays Level, Coins, and XP progress through `src/app/progressionHudViewModel.ts`.
- `src/progression/experience.ts` and `src/progression/coins.ts` are formula authority and must not be changed.

### Cloud Sync

- `src/account/storageSchema.ts` stores private stats/history/progression inside `GuestProgressState`.
- `src/account/sync.ts` syncs authenticated progress snapshots as a whole.
- `src/account/guestTransfer.ts` merges local/cloud stats and progression conservatively.
- Phase 53 should describe this existing cloud-sync behavior. It should not introduce a new stats table, event log, or public player stats contract without an addendum.

### Multiplayer And Ratings

- `src/multiplayer/scoring.ts` projects multiplayer performance without touching Solo stats.
- `src/multiplayer/rating.ts` defines rating buckets, Elo math, provisional status, and rank bands.
- `src/multiplayer/competitiveMultiplayer.ts` stores local/cacheable competitive summaries.
- `src/multiplayer/MultiplayerStatsPanel.tsx` renders local competitive multiplayer summaries on the Leaderboard route.

### Public Profiles And Public Rating Metadata

- `src/account/publicProfile.ts` and `src/account/PublicProfilePage.tsx` keep public profiles privacy-safe.
- `src/leaderboards/publicRankedLeaderboard.ts` parses strict allowlisted leaderboard rows from `get_public_ranked_leaderboard`.
- `src/leaderboards/PublicRankedLeaderboardPanel.tsx` already displays rank, public identity, bucket, rating, record, provisional status, movement, peak, and rank band.
- Public profile pages do not currently receive rating metadata. Phase 53 may add safe metadata derived from leaderboard rows when available, but must stop for addendum if the desired experience requires a new profile-id lookup RPC.

---

## File Structure

Expected files to create if useful:

- `src/stats/playerStatsOverview.ts` - pure selectors for Stats-page provenance, private/local summaries, and multiplayer summary rows.
- `src/stats/playerStatsOverview.test.ts` - selector and privacy/provenance tests.
- `src/account/publicProfileRatingMetadata.ts` - pure helper for safe public profile rating summaries derived from public leaderboard rows.
- `src/account/publicProfileRatingMetadata.test.ts` - public metadata derivation and privacy tests.
- `planning/phase-53/CHANGELOG.md` - implementation summary after source/test work.
- `planning/phase-53/REVIEW-CHECKLIST.md` - manual hosted/live review checklist after verification.
- next `progress/PROGRESS-STEP-*.md` - implementation progress report.
- `prompt-packages/phase-53/PHASE-53-STATS-PROGRESSION-PUBLIC-METADATA-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-09.md` - ignored next-step backup prompt if verification passes.

Expected files to modify:

- `src/stats/StatsDashboard.tsx` - clarify private/local Stats, progression, multiplayer, and public aggregate sections.
- `src/stats/StatsDashboard.test.tsx` - verify section separation and privacy boundaries.
- `src/stats/statsSelectors.ts` and `src/stats/statsSelectors.test.ts` only if existing selectors need small extensions.
- `src/app/App.tsx` - pass `competitiveMultiplayer`, auth status, viewer id, or public leaderboard repository into Stats/Public Profile only if needed.
- `src/app/ProgressionHud.test.tsx` - protect HUD-to-Stats affordance if copy or labels change.
- `src/account/PublicProfilePage.tsx` and `src/account/PublicProfilePage.test.tsx` - safe public rating metadata display if supported without new backend work.
- `src/leaderboards/PublicRankedLeaderboardPanel.tsx`, `src/leaderboards/publicRankedLeaderboardViewModels.ts`, and related tests only if leaderboard metadata labels need shared helpers.
- `e2e/gameplay/authenticated-two-client-smoke.spec.ts` or a new focused E2E file if route/profile/Stats behavior needs browser coverage.
- `planning/FUTURE-WORKFLOW-TIMELINE.md`, `planning/README.md`, and `progress/PROGRESS.csv`.

Avoid unless a later explicit addendum authorizes it:

- `supabase/migrations/*`
- deployment config files
- reward/scoring/Elo/ranked queue/matchmaking source files except read-only or focused regression tests
- broad shell/theme/minimal-shell CSS rewrites

---

## Task 1: Baseline, Scope Check, And Test Map

**Files:**
- Read: `CONSTITUTION.md`
- Read: `BRRRDLE-SPEC.md`
- Read: `planning/governance/PROMPT-PACKAGE-STANDARD.md`
- Read: `planning/phase-53/PLANNING-BRIEF.md`
- Read: `planning/phase-53/IMPLEMENTATION-PLAN.md`
- Read: `progress/PROGRESS.csv`
- Read: current files listed in the Current Implementation Review.

**Interfaces:**
- Consumes: Phase 52 closure baseline and current stats/profile/rating contracts.
- Produces: source-only versus addendum decision before source edits.

- [ ] **Step 1: Confirm repository and branch**
  Run `pwd`, `git status --short --branch`, `git rev-parse HEAD`, and `git rev-parse origin/main`.
  Expected: worktree is `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`; stable repo is untouched; local and remote `main` are at the Phase 52 closure commit unless the user has authorized a newer state.

- [ ] **Step 2: Confirm ignored prompt package boundary**
  Run `git check-ignore -v prompt-packages/phase-53/example.md`.
  Expected: `prompt-packages/` is ignored.

- [ ] **Step 3: Map current tests**
  Identify focused tests for stats, progression HUD, public profiles, public leaderboard, multiplayer stats, private matchmaking, and mobile/route smoke.

- [ ] **Step 4: Make the source-only decision**
  If the desired minimum Phase 53 can be implemented through source/tests and existing RPCs, continue. If it requires new Supabase schema/RPC/RLS/grants or remote mutation, stop and prepare an addendum prompt instead.

---

## Task 2: Pure Stats And Progression View Models

**Files:**
- Create if useful: `src/stats/playerStatsOverview.ts`
- Create if useful: `src/stats/playerStatsOverview.test.ts`
- Modify if necessary: `src/stats/statsSelectors.ts`
- Modify if necessary: `src/stats/statsSelectors.test.ts`

**Interfaces:**
- Consumes: `StatisticsState`, `GameHistoryEntry[]`, `GuestProgressionState`, optional `MultiplayerCompetitiveState`, and optional viewer user id.
- Produces: small display-ready summaries for Stats page sections without React or I/O.

- [ ] **Step 1: Write selector tests first**
  Cover private Solo bucket summaries, progression summary, cloud/provenance labels, and multiplayer summary rows. Expected: no raw ids or private fields appear in output labels.

- [ ] **Step 2: Run focused selector tests and confirm failure**
  Run the new selector test file plus existing stats selector tests. Expected: new tests fail only because the new helper does not exist yet.

- [ ] **Step 3: Implement the pure helper**
  Keep helper output small, typed, deterministic, and view-oriented. Do not mutate stats, history, progression, or competitive multiplayer state.

- [ ] **Step 4: Verify focused selectors**
  Run `npm run test -- src/stats/statsSelectors.test.ts src/stats/playerStatsOverview.test.ts`.
  Expected: pass.

---

## Task 3: Stats Dashboard Clarity

**Files:**
- Modify: `src/stats/StatsDashboard.tsx`
- Modify: `src/stats/StatsDashboard.test.tsx`
- Modify if needed: `src/app/App.tsx`

**Interfaces:**
- Consumes: existing Stats props plus optional competitive multiplayer state/viewer identity if local multiplayer summaries are displayed.
- Produces: clearer Stats route sections while preserving current local/private/public boundaries.

- [ ] **Step 1: Add or update render tests first**
  Tests should verify that Stats separates private local stats, progression, local multiplayer performance, and aggregate public site stats. Tests must assert that Leaderboard-only public table behavior is not accidentally merged into Stats.

- [ ] **Step 2: Implement minimal Stats dashboard layout/copy changes**
  Reuse existing chart components and `MultiplayerStatsPanel` only if it stays visually coherent and privacy-safe. If reuse makes the page too heavy or duplicates Leaderboard confusingly, use smaller summary rows from Task 2 instead.

- [ ] **Step 3: Preserve HUD-to-Stats behavior**
  If App wiring changes, confirm `ProgressionHud` still opens the Stats route and manual refresh still lands on Home per Phase 50.

- [ ] **Step 4: Verify focused UI tests**
  Run `npm run test -- src/stats/StatsDashboard.test.tsx src/stats/PublicSiteStatsPanel.test.tsx src/app/ProgressionHud.test.tsx`.
  Expected: pass.

---

## Task 4: Public Rating/Profile Metadata

**Files:**
- Create if useful: `src/account/publicProfileRatingMetadata.ts`
- Create if useful: `src/account/publicProfileRatingMetadata.test.ts`
- Modify if source-only is sufficient: `src/account/PublicProfilePage.tsx`
- Modify if source-only is sufficient: `src/account/PublicProfilePage.test.tsx`
- Modify if needed: `src/leaderboards/publicRankedLeaderboardViewModels.ts`
- Modify if needed: `src/leaderboards/PublicRankedLeaderboardPanel.test.tsx`

**Interfaces:**
- Consumes: `PublicRankedLeaderboardRow[]` from the existing public leaderboard repository, and public profile id only in memory/callbacks.
- Produces: public-safe rating metadata labels for a public profile or adjacent leaderboard UI without exposing raw ids in markup.

- [ ] **Step 1: Write privacy tests first**
  Tests must include representative leaderboard rows and assert safe labels for rating, record, bucket, rank band, provisional status, movement, and peak rating. Tests must assert no raw auth ids, emails, `publicProfileId`, `user_id`, `match_id`, `queue_id`, `rating_transaction_id`, sessions, answers, tokens, or progress payloads appear in rendered markup.

- [ ] **Step 2: Decide metadata source**
  Prefer existing `get_public_ranked_leaderboard` rows. If a profile-specific rating summary cannot be made useful without a new backend contract, stop and document the addendum instead of adding a leaky or misleading workaround.

- [ ] **Step 3: Implement safe metadata display**
  Keep public profile metadata clearly marked as ranked Practice public metadata, not full private player history. Handle missing metadata with a non-error empty state.

- [ ] **Step 4: Verify focused profile/leaderboard tests**
  Run `npm run test -- src/account/publicProfile.test.ts src/account/PublicProfilePage.test.tsx src/leaderboards/publicRankedLeaderboard.test.ts src/leaderboards/publicRankedLeaderboardViewModels.test.ts src/leaderboards/PublicRankedLeaderboardPanel.test.tsx`.
  Expected: pass.

---

## Task 5: Browser/E2E Coverage

**Files:**
- Modify or create focused E2E under `e2e/gameplay/` or `e2e/layout/`.

**Interfaces:**
- Consumes: existing authenticated E2E fixtures and public profile/leaderboard helpers if needed.
- Produces: confidence that the user-visible route flow works after source changes.

- [ ] **Step 1: Add a focused smoke if source changes are route-visible**
  Cover signed-in navigation from HUD to Stats, Leaderboard public metadata, public profile metadata if implemented, and no console failures.

- [ ] **Step 2: Preserve prior-phase regression paths**
  Run private matchmaking and mobile-scroll focused tests if App/Profile/Leaderboard/Stats changes affect those surfaces.

- [ ] **Step 3: Verify E2E subset**
  Recommended starting subset:
  `npm run test:e2e -- e2e/gameplay/authenticated-two-client-smoke.spec.ts e2e/gameplay/private-matchmaking.spec.ts e2e/layout/mobile-scroll.spec.ts`
  Add the new focused E2E file if one is created.

---

## Task 6: Full Verification And Review Candidate Handoff

**Files:**
- Create/modify: `planning/phase-53/CHANGELOG.md`
- Create/modify: `planning/phase-53/REVIEW-CHECKLIST.md`
- Modify: `planning/FUTURE-WORKFLOW-TIMELINE.md`
- Modify: `planning/README.md`
- Modify: `progress/PROGRESS.csv`
- Create: next `progress/PROGRESS-STEP-*.md`
- Create if verification is clean: ignored Review Candidate Backup prompt under `prompt-packages/phase-53/`

**Interfaces:**
- Consumes: all Phase 53 implementation results.
- Produces: Review Candidate handoff and next safe backup prompt if verification is clean.

- [ ] **Step 1: Run focused verification**
  Run all focused tests listed in Tasks 2-5.

- [ ] **Step 2: Run full required gates**
  Run:
  - `npm run lint`
  - `npm run test`
  - `npm run test:e2e`
  - `npm run build`
  - `npx tsc -p tsconfig.api.json --noEmit`
  - `git diff --check`

- [ ] **Step 3: Run lightweight hygiene checks**
  Run CSV shape check, non-printing/credential/private-data scan over changed tracked/untracked files plus ignored prompt artifacts, ignored-artifact check, watched-port check, and `git status --short --branch`.

- [ ] **Step 4: Prepare manual review checklist**
  Checklist should include Stats clarity, HUD-to-Stats, progression explanation, public profile/rating metadata if implemented, Leaderboard preservation, Profile/private Practice preservation, mobile smoke, and privacy boundary checks.

- [ ] **Step 5: Prepare next prompt**
  If verification is clean, create the ignored Review Candidate Backup prompt. If verification fails, create a bounded recovery prompt or stop with the blocker.

## Self-Review Checklist

- Phase 53 implementation stays source/test-first unless an addendum is explicitly authorized.
- Stats and Leaderboard remain conceptually separate.
- Signed-in cloud stats are described through the existing progress snapshot sync path.
- Public metadata comes only from safe public profile and public leaderboard contracts.
- No gameplay, reward, scoring, Elo, Daily, ranked queue, private Practice, or stable-repository work is included.
- Verification includes focused tests, E2E where user-visible route/profile changes occur, full gates, and hygiene checks.
