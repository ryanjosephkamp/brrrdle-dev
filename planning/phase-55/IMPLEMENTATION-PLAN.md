# Phase 55 Ranked Daily Multiplayer And Private Request Routing Implementation Plan

> **For agentic workers:** Follow this plan in order. Keep the accepted functional shell and all current gameplay/persistence behavior protected. Use focused characterization before shared-contract edits and stop at the migration-application gate.

**Goal:** Implement ranked Daily OG/GO and immediate private Practice request routing with trusted backend authority, real two-client verification, and no frontend redesign.

**Architecture:** Extend the existing asynchronous ranked Practice queue, trusted finalization, trusted settlement, rating, public leaderboard, and Daily claim architecture with an explicit Daily-ranked dimension. Do not create a parallel browser-trusted competitive path. Reuse the existing private Practice request RPCs for the routing slice.

## Global Constraints

- Work only in `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`; never touch stable `brrrdle`.
- Verify the functional-shell Golden Checkpoint before source edits.
- Preserve the accepted shell presentation, performance, accessibility, mobile fit, and route behavior.
- Preserve unranked Daily Multiplayer, ranked Practice, private Practice, Live, spectator, Solo, cloud persistence, scoring, forfeit, timeout, and FIFO behavior.
- Do not change the Elo formula, K-factors, provisional thresholds, general scoring formulas, rewards, consumables, or progression.
- Do not implement private Daily, request center/blocking/preferences, service-worker push, social features, design work, dependencies, or framework migration.
- No browser client may directly write rating profiles, rating transactions, trusted match results, queue pair authority, or Daily claim authority.
- Keep answers, seeds, serialized sessions, player sessions, raw auth ids, and private request data out of public payloads and logs.
- One writer at a time owns high-conflict surfaces in `src/multiplayer/`, `src/app/App.tsx`, Supabase migrations, leaderboard code, and progress records.

## Current Supabase Guidance Applied To The Plan

- Keep queue/request reads participant-scoped and narrowly filtered. Supabase notes that Postgres Changes authorization is evaluated for each subscribed user and can become a database bottleneck, so Phase 55 must not add a broad unfiltered request or queue subscription: <https://supabase.com/docs/guides/realtime/postgres-changes>.
- Keep RLS predicates simple and indexed on user, status, date, scope, and bucket fields used by the new paths: <https://supabase.com/features/row-level-security>.
- Any view used for public leaderboard exposure must preserve the approved allowlist and use invoker-safe behavior where applicable: <https://supabase.com/docs/guides/database/tables>.
- Every `security definer` RPC must authenticate `auth.uid()`, validate participant ownership, restrict `search_path`, and expose only the minimum grant surface: <https://supabase.com/docs/guides/troubleshooting/do-i-need-to-expose-security-definer-functions-in-row-level-security-policies-iI0uOw>.

## Stage 55.0 - Baseline, Characterization, And Contract Matrix

1. Verify clean `main`, `origin/main`, Final Acceptance commit, Golden tag, and Release.
2. Read the constitution, product spec, Phase 48 ranked Daily addendum, Phase 50 FIFO migration, Phase 52 private-request plan, current Supabase docs, and this plan.
3. Map the exact source, SQL, test, and UI ownership for Daily claims, ranked queue lifecycle, trusted settlement, deterministic Daily answers, public leaderboard metadata, Daily controls, and private request routing.
4. Add or identify characterization tests proving current ranked Practice, unranked Daily, FIFO repeat-opponent, and private request behavior before source changes.
5. Record the intended Supabase project identifier through existing safe configuration without printing credentials or environment values.

**Gate:** Stop if the Golden Checkpoint is inconsistent, the intended project cannot be safely identified, or current remote migration history differs from the local migration ledger.

## Stage 55.1 - Ranked Daily Contract Tests First

Add failing tests for the approved contract before implementation:

- eligibility accepts Daily only for authenticated async ranked OG/GO with five letters, no clock, canonical GO count, valid UTC date, and Hard Mode boolean;
- Practice and Daily requests cannot match each other;
- Daily requests require matching date, mode, Hard Mode, and Daily rating bucket;
- FIFO selection remains oldest compatible request first and permits immediate repeat opponents;
- Daily OG and GO map to distinct rating/storage buckets from Practice;
- four independent Daily claim lanes exist per user/date;
- duplicate claim in the same lane is idempotent only for the same source and rejected for a different source;
- ranked and unranked Daily answer namespaces differ deterministically for OG and every GO puzzle;
- scoring/settlement eligibility accepts the new Daily buckets without changing Elo math;
- public leaderboard parsing accepts only the new approved buckets and remains privacy-safe;
- malformed scope/date/settings/payloads fail closed.

Run the smallest focused Vitest sets after each test group. Confirm new expectations fail for the intended reason before source changes.

## Stage 55.2 - Additive Supabase Migration Artifact

Create one additive Phase 55 migration with focused SQL contract tests or migration inspection coverage. It must:

1. Add a normalized claim lane or ranked dimension to `multiplayer_daily_claims` and replace the uniqueness contract so ranked/unranked OG/GO can each be claimed once per UTC day.
2. Backfill existing rows as unranked without dropping valid claims.
3. Extend claim RPCs/triggers so unranked existing games remain compatible and ranked Daily claims are authoritative.
4. Add Daily-ranked queue validation for scope, fixed length, no clock, current UTC date, mode, Hard Mode, rating bucket, and oldest-compatible FIFO indexing.
5. Extend trusted finalization to create a Daily-ranked async game with server-validated participants, date, fixed settings, queue ids, and rating bucket.
6. Extend trusted settlement and rating-profile/transaction authority to the new Daily buckets without changing rating math.
7. Extend the public leaderboard RPC allowlist for ranked Daily OG/GO only.
8. Preserve participant-only reads, RLS, grants, `security definer` auth checks, and restricted search paths.
9. Include rollback notes and remote probes.

Do not apply the migration remotely in this stage. Stop and create a separate exact migration-application continuation prompt after the local diff, tests, and project-target preflight are clean.

## Stage 55.3 - Domain, Repository, And Answer Namespace

After the local migration contract is stable:

- add ranked Daily bucket identifiers and safe parser/storage mappings in `rating.ts`;
- generalize ranked eligibility in `matchmaking.ts` and `scoring.ts` while retaining Practice constraints;
- add a ranked dimension to Daily answer selection so ranked/unranked answers are deterministic but distinct;
- extend repository input/result types and RPC adapters for Daily date/scope/buckets;
- keep idempotency keys scoped by user, Daily date, mode, Hard Mode, and ranked Daily lane without embedding private values;
- preserve stale-response guards and empty-response recovery behavior;
- update leaderboard/public-profile metadata view models to label ranked Daily separately.

Run focused domain/repository tests after each logical slice.

## Stage 55.4 - Lightweight Ranked Daily UI

Update Daily Multiplayer with the smallest shell-consistent controls:

- OG/GO selection;
- unranked/ranked selection;
- Hard Mode toggle visible only when ranked is selected;
- no word-length, GO-count, difficulty, or clock controls;
- clear UTC eligibility/claimed/queued/matched/error states;
- queue cancel/check/recovery behavior consistent with ranked Practice;
- direct entry into the finalized game;
- distinct labels for ranked versus unranked current games and History/Leaderboard metadata.

Retain all existing unranked Daily behavior. Add component tests for controls, disabled states, error recovery, mobile fit, semantic statuses, and no answer/private-id exposure. Do not redesign the Multiplayer workspace.

## Stage 55.5 - Immediate Private Request Routing

Extend the existing public-profile request flow without creating a new inbox:

1. Keep the created request object/id in profile-page state after successful send.
2. Show a direct `Go to Practice Multiplayer` action immediately.
3. While the requester remains on the same profile, refresh only that participant's relevant request at a restrained cadence or through an already-approved participant-scoped subscription.
4. Guard every asynchronous response by profile id, request id, viewer session, and request version so refocus/rerender cannot restore stale state.
5. Show requested, created, declined, cancelled, and expired states.
6. On created, show `Enter private match` and navigate to the exact created game.
7. Stop polling/subscription work after terminal state or unmount.

Add helper, component, route, and focused browser tests. Do not add blocking, opt-out settings, new notification storage, or push behavior.

## Stage 55.6 - Remote Migration Gate And Real E2E

After source, unit, component, build, typecheck, and migration-diff checks are clean:

- generate a dedicated Phase 55 remote migration and continuation prompt naming the exact migration file, expected project, probes, rollback conditions, and cleanup;
- stop before remote application until the user activates that prompt;
- after authorization, apply only the exact reviewed migration to the verified intended project;
- probe functions, constraints, indexes, RLS/grants, claim lanes, queue status, settlement, and public leaderboard output without printing private data;
- run real temporary-account two-client E2E for ranked Daily OG and GO, including both Hard Mode settings where practical;
- prove four independent claim lanes, ranked/unranked answer separation, FIFO matching, repeat-opponent compatibility, first turn, completion, trusted settlement, rating display, public metadata, refresh/re-entry, and cleanup;
- run the private request route flow with requester and target contexts through created/declined paths.

Delete all temporary users, queue rows, games, claims, requests, rating/result test rows, and browser artifacts created by the tests.

## Stage 55.7 - Full Regression And Review Candidate

Run sequentially from a clean test environment:

1. focused changed-area Vitest and Playwright;
2. ranked Practice OG/GO FIFO and repeat-opponent regressions;
3. unranked Daily OG/GO claim and gameplay regressions;
4. private Practice create/accept/decline/cancel/direct-entry regressions;
5. Solo Daily/Practice persistence regressions;
6. spectator/privacy regressions;
7. shell desktop/tablet/390px/narrow-mobile no-overflow and scroll checks;
8. `npm run lint`;
9. `npm run test`;
10. a fresh full `npm run test:e2e` after any focused retries;
11. `npm run build`;
12. `npx tsc -p tsconfig.api.json --noEmit`;
13. `git diff --check` and repository hygiene scans.

If clean, update the Phase 55 changelog/checklist/timeline/index/progress, create the ignored Review Candidate GitHub Backup prompt, and stop for explicit backup authorization and hosted manual review.

## Stop Conditions

Stop and report before expanding scope if migration history or project identity is uncertain; ranked Daily would require an Elo formula change or answer/private-data exposure; claim separation requires destructive data loss; current ranked Practice, unranked Daily, Solo, private Practice, or shell behavior would change beyond the approved contract; verification remains failing after focused diagnosis; or the work would require a dependency/framework change, private Daily, request center/blocking, consumables, design work, deployment config, release, or stable-repository edits.
