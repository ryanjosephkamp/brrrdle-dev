# Phase 31 Planning Brief

**Status**: Planning brief for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-23.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, completed Phase 30 public leaderboards and Multiplayer Overview cleanup, completed Phase 29 public profile foundations, completed Phase 28 Live spectator stabilization, completed Phase 27 ranked Practice foundations, current roadmap surfaces, and the current progress ledger.

This planning brief does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, Phase 31 implementation, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, new custom skills, force-push, secret printing, or work in the original stable `brrrdle` repository.

## 1. Purpose

Phase 31 should add safe multiplayer postgame convenience flows after Phase 30 public leaderboards and the current Multiplayer workspace cleanup are stable.

The primary Phase 31 product goal is:

- Practice-only rematch request/accept with the same opponent and same settings;
- same-settings play-again or search-again actions after completed Practice multiplayer games.

The user also identified several small current-surface bugs and clarity issues that should be handled in Phase 31 if implementation review confirms they remain narrow:

- the private "Your profile" accent-color selector does not update the local initials-avatar circle preview, while the public accent preview does;
- Stats chart/accessibility text appears visually duplicated or overlapped around "Win rate by mode & scope" and "Recent activity";
- the About-tab expected-score formula should be displayed as a clearer math-styled block after a newline, without italicizing labels such as expected score, opponent rating, or your rating;
- the Stats "Competitive multiplayer" rating-bucket section needs plainer player-facing language and should fix the duplicate/misleading bucket display where multiple rows can all appear as `MULTIPLAYER OG`;
- stale ranked copy that still says public leaderboards are deferred should be corrected.

These cleanup items are current-feature polish and should not change gameplay rules, Elo constants, ranking authority, Daily claims, public leaderboard contracts, or profile privacy boundaries.

## 2. Current Situation

Phase 30 is complete, merged, and cleaned up. The expected local and remote `main` baseline is:

- `HEAD`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- `origin/main`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`

Relevant completed foundations:

- Phase 27 completed trusted ranked Practice settlement, durable ranked Practice queue behavior, ranked UI/stats copy, and private leaderboard-ready projections.
- Phase 28 stabilized authenticated Live v1 spectator behavior, current Daily Multiplayer spectation integrity, notification delivery, and Elo transparency.
- Phase 29 created default-private public profile foundations, notification click routing/center cleanup, and About-tab Elo transparency relocation.
- Phase 30 added authenticated-only public ranked Practice leaderboards and removed the redundant Multiplayer Overview shortcut row plus the confusing active-game `Select`/`Selected` affordance.
- Phase 30 deferred ranked-mode routing assigned timed Practice ranked and Daily ranked to Phase 32 ranked mode expansion / competitive ladder v2.

Relevant source observations for Phase 31 planning:

- `src/account/ProfilePanel.tsx` renders the private account avatar preview using the persisted derived `profile.gradient`, while the public profile preview uses the selected public accent background. The private preview should use the selected account accent when no uploaded avatar image is present.
- `src/stats/charts/BarChart.tsx` and `src/stats/charts/CalendarHeatmap.tsx` include visually hidden table captions using `sr-only`, while `src/index.css` defines the project helper `.brrrdle-visually-hidden`. The reported overlap likely involves accessibility fallback markup or hidden captions becoming visible, and should be audited before applying a spacing-only fix.
- `src/app/App.tsx` contains the About-tab expected-score explanation inline in prose. It should be made more readable with a dedicated formula block without changing the formula.
- `src/multiplayer/MultiplayerStatsPanel.tsx` renders raw `competitive.rating.profiles` rows and labels buckets via a simple bucket-string split. It does not dedupe profiles by user and bucket, while `src/multiplayer/rankedLeaderboardProjections.ts` already uses a latest-profile-by-user-bucket pattern.
- `src/multiplayer/MultiplayerStatsPanel.tsx` currently includes player-facing "trusted settlement" language and stale copy that public leaderboards remain deferred after Phase 30.

## 3. Goals

- Add Practice-only rematch request/accept with the same opponent and same settings when both players consent.
- Add same-settings play-again or search-again actions after completed Practice multiplayer games.
- Preserve ranked Practice v1, trusted ranked queue behavior, trusted settlement, unranked/custom flows, and Daily claim rules.
- Decide whether rematch requests require durable mutual-intent persistence and, if so, require a migration/RLS addendum before implementation.
- Add narrow current-surface cleanup for profile accent previews, Stats chart/accessibility overlap, About expected-score formula formatting, rating-bucket clarity/dedupe, and stale ranked copy.
- Keep Phase 31 out of ranked-mode expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, and gameplay-rule changes.

## 4. In Scope

Phase 31 may include:

- Practice-only rematch request/accept UI and state for completed Practice Multiplayer OG and GO games;
- same-settings play-again and search-again actions for Practice Multiplayer where Daily claims are not involved;
- ranked Practice rematch handling only if it preserves the trusted queue/finalization and settlement boundaries;
- unranked Practice and custom/private-code flow preservation;
- durable mutual-intent state, stale request expiry, cancellation, wrong-account protections, spam/rate-limit planning, and privacy review if rematch accept needs persistence;
- a separately authorized migration/RLS addendum and one later additive migration only if required;
- focused postgame domain/repository/component tests and real two-client verification for multiplayer claims;
- account profile accent preview correction in `ProfilePanel`;
- Stats chart/accessibility overlap correction for visual duplicate labels/captions;
- About expected-score formula formatting with an accessible math-like display and no new formula behavior;
- plain-language rating-bucket explanation in Stats;
- deduped/latest rating bucket rows so users do not see several visually identical `MULTIPLAYER OG` rows for the same normalized bucket;
- clearer labels such as `Ranked Practice OG` and `Ranked Practice GO`;
- stale ranked/public-leaderboard copy updates.

## 5. Out Of Scope

Phase 31 must not include:

- implementation before separate stage authorization;
- Phase 32 ranked mode expansion, including timed Practice ranked, Daily ranked, ranked custom/private-code games, or rank labels/bands;
- public/guest spectation;
- new public leaderboard metrics or new public leaderboard migration/RPC work beyond bug-safe copy updates;
- service workers, push subscriptions, background push, or deployment configuration;
- Elo algorithm changes, K-factor changes, expected-score formula changes, rating bucket authority changes, trusted settlement rule changes, or rating transaction authority changes;
- gameplay-rule changes, scoring formula changes, timeout/forfeit precedence changes, GO transition changes, keyboard-state changes, Daily claim changes, Solo Daily fixed-five behavior changes, or Practice 2-35 word-length changes;
- broad redesign of Stats, Profiles, About, Multiplayer, Leaderboards, or the app shell;
- Supabase migration creation or execution before a separately approved migration/RLS stage;
- Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work.

## 6. Required Invariants

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Current Daily Multiplayer answer leakage through spectator views remains prevented.
- Daily rematches, Daily replay shortcuts, and Daily search-again shortcuts must not bypass Daily claim rules.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged unless later explicitly approved.
- Ranked Practice v1 remains the only ranked match type unless Phase 32 or a later approved spec changes it.
- Daily ranked and timed Practice ranked remain deferred to Phase 32 ranked mode expansion.
- Match points and Elo/rank movement remain separate.
- Live v1 spectator behavior remains read-only.
- Public/guest spectation remains unavailable unless a later approved phase explicitly implements sanitized public projections.
- Public leaderboards remain display-only and non-authoritative.
- Public profiles remain opt-in/default-private identity projections and must not become gameplay, rating, notification, spectator, or account authority.
- Existing scoring, timeout, forfeit, rating/Elo, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged unless explicitly approved.
- Notification state, profile state, About copy, Stats copy, public leaderboard display, and postgame convenience actions must not become gameplay authority.

## 7. Postgame Action Requirements

### Practice Rematch Request/Accept

Phase 31 should define and implement a rematch flow only for Practice multiplayer variants.

Required behavior:

- available after terminal Practice Multiplayer games, including eligible unranked Practice games and ranked Practice games if ranked boundaries are preserved;
- unavailable for Daily Multiplayer;
- unavailable for guest/non-authenticated multiplayer contexts unless the existing flow already supports them safely;
- uses the same opponent and same settings as the completed Practice game;
- requires mutual intent before a rematch game is created;
- expires stale requests and allows cancellation where appropriate;
- blocks self-rematch, wrong-account acceptance, duplicate acceptance, and replay from stale or unrelated games;
- does not mutate the completed source game;
- does not reuse answer-bearing state, serialized sessions, seeds, or participant sessions from the completed game except through approved same-settings metadata;
- creates a fresh game only through the approved repository/RPC path for the target ranked or unranked flow.

Ranked Practice rematches require extra caution:

- if ranked rematch uses the durable queue, it must not bypass compatible pair claiming, seat assignment, or trusted game finalization unless a separately approved migration/RLS addendum defines a safe direct rematch RPC;
- Elo moves only through trusted settlement after the new game completes;
- rematch intent must not become ranking authority.

### Same-Settings Play Again / Search Again

Phase 31 should also add one-click convenience actions for players who want another Practice match without manually recreating the same setup.

Recommended behavior:

- for unranked Practice custom/lobby games: offer a same-settings lobby creation or setup prefill if direct creation is safe;
- for ranked Practice queue games: offer same-settings ranked search/queue again through the trusted ranked queue flow;
- for completed Practice games where rematch is not desired or the rival does not accept: offer search-again or new-lobby flow;
- for Daily games: do not show a Daily play-again action that would bypass Daily uniqueness.

## 8. Current-Surface Cleanup Requirements

### Profile Accent Preview

The private "Your profile" avatar preview should respond to the selected "Accent color" when no uploaded avatar is present.

Implementation guidance:

- reuse or share the accent-to-gradient mapping used by the public profile preview where appropriate;
- keep uploaded avatar images unchanged;
- keep public profile accent behavior unchanged;
- preserve private account metadata validation and public profile privacy boundaries;
- add focused `ProfilePanel` tests for preview classes changing when account accent changes.

### Stats Chart/Accessibility Overlap

The screenshot `/Users/noir/Desktop/stats-overlap-annotated.png` shows visible duplicate/overlapping text around "Win rate by mode & scope" and "Recent activity".

Implementation guidance:

- audit chart figure captions and the visually hidden accessibility tables in `BarChart` and `CalendarHeatmap`;
- prefer a durable accessible hidden helper such as the existing `.brrrdle-visually-hidden` class or an equivalent local CSS fix over spacing hacks if hidden table captions are leaking visually;
- keep chart labels available to screen readers;
- avoid hiding meaningful visible section headings;
- add focused chart/StatsDashboard tests and browser smoke if visible layout changes warrant it.

### About Expected-Score Formula Formatting

The About-tab Elo section should make the expected-score formula easier to read.

Implementation guidance:

- put a line break after the sentence introducing the standard 400-point Elo curve;
- render the formula in a distinct math-like block using accessible HTML/CSS or code-style formatting;
- avoid adding MathJax/KaTeX or other dependencies unless Stage 31 audit proves a real need;
- keep text labels such as `expected score`, `opponent rating`, and `your rating` non-italic;
- preserve the current expected-score formula and Elo constants exactly;
- update About tests and ranked docs only if needed for consistency.

### Rating Buckets Clarity And Dedupe

The Stats "Competitive multiplayer" section should explain rating buckets in plainer language and avoid duplicate/misleading bucket rows.

Implementation guidance:

- explain that a rating bucket is a separate Elo track/category, such as ranked Practice OG versus ranked Practice GO;
- replace or soften "settlement" language with player-facing language such as "confirmed ranked results" while preserving internal trusted-settlement meaning in docs/tests where appropriate;
- label buckets clearly as `Ranked Practice OG` and `Ranked Practice GO`;
- dedupe latest profiles by user and normalized bucket before rendering, using a helper equivalent to the `latestProfileByUserBucket` pattern in `rankedLeaderboardProjections.ts`;
- investigate whether malformed/legacy buckets silently normalize to `multiplayer:og`; avoid letting corrupt or unknown buckets appear as valid duplicate OG rows;
- update stale copy that says public leaderboards remain deferred after Phase 30;
- add focused `MultiplayerStatsPanel` tests for duplicate profile rows, clear labels, stale copy removal, and no Elo-algorithm changes.

## 9. Migration And RLS Constraints

This planning brief does not authorize migration creation or execution.

Stage 31 migration/RLS planning is required if:

- rematch request/accept requires durable cross-client mutual-intent state;
- same-settings play-again/search-again needs a trusted RPC to create or finalize a fresh game from a completed game;
- ranked Practice rematches would otherwise bypass queue/finalization or trusted settlement rules;
- wrong-account protections, request expiry, or spam prevention cannot be safely enforced with existing tables/RPCs.

Any migration/RLS addendum must define:

- exact table/RPC/view names;
- exact allowed request fields and forbidden fields;
- owner/participant write and read rules;
- stale request expiry and cancellation semantics;
- wrong-account protections;
- grants and RLS policies;
- rollback plan;
- non-printing privacy and abuse probes;
- verification strategy.

Current-surface cleanup items should not require migrations. If they appear to require new SQL/RLS, stop and report.

## 10. Likely Files And Modules

Planning and docs:

- `planning/phase-31/PLANNING-BRIEF.md`
- future `planning/specs/phase-31/` specification files
- future `planning/phase-31/IMPLEMENTATION-PLAN.md`
- future `planning/phase-31/CHANGELOG.md`
- `planning/README.md`
- `docs/ranked-multiplayer.md`
- `docs/supabase.md`
- `progress/PROGRESS.csv`
- `progress/PROGRESS-STEP-*.md`

Postgame action surfaces:

- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerWorkspace.tsx`
- `src/multiplayer/MultiplayerActiveGames.tsx`
- `src/multiplayer/multiplayer.ts`
- `src/multiplayer/multiplayerRepository.ts`
- `src/multiplayer/matchmaking.ts`
- `src/multiplayer/scoring.ts`
- `src/multiplayer/rating.ts`
- focused multiplayer repository/domain/component tests
- relevant E2E specs for two-client postgame behavior

Current-surface cleanup surfaces:

- `src/account/ProfilePanel.tsx`
- `src/account/ProfilePanel.test.tsx`
- `src/stats/StatsDashboard.tsx`
- `src/stats/StatsDashboard.test.tsx`
- `src/stats/charts/BarChart.tsx`
- `src/stats/charts/CalendarHeatmap.tsx`
- `src/index.css`
- `src/app/App.tsx`
- `src/app/AboutBrrrdlePanel.test.tsx`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/MultiplayerStatsPanel.test.tsx`
- `src/multiplayer/rankedLeaderboardProjections.ts` only for helper reuse or alignment

Supabase/RLS surfaces:

- `docs/supabase.md`
- Phase 27 ranked queue/finalization and trusted settlement migrations
- Phase 29 public profile migration
- Phase 30 public leaderboard migration
- any future Phase 31 rematch migration, only after separate authorization

## 11. Recommended Stage Breakdown

### Stage 31.0 - Implementation Plan Approval And Protected Baseline

- Confirm repository state.
- Preserve existing uncommitted Phase 31 planning/spec/progress artifacts.
- Create Stage 31.0 progress records.
- Run baseline verification before implementation begins.
- Do not modify source/runtime code.

### Stage 31.1 - Postgame And Current-Surface Audit

- Audit completed Practice Multiplayer terminal screens, result surfaces, ranked queue state, unranked/custom creation, Daily claim boundaries, and source game metadata.
- Decide whether rematch request/accept requires new durable state and whether Stage 31.2 migration/RLS addendum planning is required.
- Reproduce/audit the profile accent preview, Stats overlap, About expected-score formatting, rating-bucket duplicate rows, rating-bucket copy, and stale public-leaderboard deferral copy.
- Decide exact safest implementation points and tests.
- Do not implement source/runtime fixes.

### Stage 31.2 - Rematch Migration/RLS Addendum Planning

- Create a precise addendum if Stage 31.1 confirms durable rematch or trusted same-settings RPC work is needed.
- Define mutual-intent state, expiry, cancellation, wrong-account protections, spam prevention, grants, RLS, rollback, probes, and verification.
- Do not create or run SQL.

### Stage 31.3 - Rematch Migration/RLS Execution

- Execute only after explicit migration authorization.
- Create one additive migration if the addendum requires it.
- Apply only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous.
- Run non-printing privacy/abuse probes.
- Stop before app implementation if migration verification fails.

### Stage 31.4 - Postgame Domain And Repository Foundations

- Add domain/repository seams for rematch intent and same-settings play-again/search-again.
- Preserve existing ranked/unranked/custom creation paths.
- Keep Daily ineligible.
- Add focused pure/repository tests for same-settings extraction, request lifecycle, idempotency, wrong-account protections, stale requests, ranked queue preservation, and Daily exclusion.

### Stage 31.5 - Postgame UI Integration

- Add player-facing postgame actions to appropriate Practice terminal/result surfaces.
- Show rematch request/accepted/waiting/expired/cancelled states.
- Add same-settings search-again or create-lobby actions.
- Keep UI clear for ranked Practice versus unranked/custom Practice.
- Add component and E2E coverage for two-client rematch and same-settings flows.

### Stage 31.6 - Current-Surface Cleanup

- Fix the private profile accent preview.
- Fix Stats chart/accessibility text overlap without harming screen-reader access.
- Format the About expected-score formula clearly.
- Improve rating-bucket copy and labels.
- Dedupe/latest-select rating bucket profile rows and guard against corrupt/unknown bucket display.
- Remove stale public-leaderboard-deferred copy.
- Add focused tests for each touched surface and browser smoke for Stats/About/Profile if visible changes warrant it.

### Stage 31.7 - Final Hardening And Handoff

- Review postgame actions, ranked/unranked/Daily boundaries, Stats/Profile/About cleanup, docs/progress, privacy boundaries, and resource state.
- Run focused tests, relevant two-client E2E/browser smoke, full local verification, non-printing secret/artifact checks, and watched-port/process cleanup checks.
- Create a Phase 31 changelog.
- Halt for a separate Git handoff preparation prompt.

## 12. Success Criteria

Phase 31 is successful when:

- completed Practice Multiplayer games offer safe rematch and/or same-settings convenience actions as approved;
- rematch creation requires mutual intent and cannot be triggered by one player alone unless the action is explicitly same-settings search/new-lobby rather than rematch;
- Daily Multiplayer does not offer rematch/replay shortcuts that bypass Daily claims;
- ranked Practice rematches/search-again preserve trusted queue/finalization and trusted settlement;
- unranked/custom flows still work;
- stale rematch requests expire or cancel predictably;
- wrong-account, self-match, duplicate, stale source game, and spam/abuse cases are guarded;
- private profile accent preview reflects the selected account accent when using initials;
- Stats chart/accessibility labels no longer visually overlap while remaining accessible;
- About expected-score formula is readable and formula behavior is unchanged;
- rating buckets are explained in player-friendly language and display at most one latest row per user/bucket;
- bucket labels are clear and do not show misleading duplicate `MULTIPLAYER OG` rows;
- public leaderboard copy is no longer stale;
- Phase 30 public leaderboard behavior, Phase 29 public profile behavior, Phase 28 Live spectator behavior, Phase 27 ranked Practice behavior, Daily Multiplayer integrity, and all gameplay rules remain unchanged.

## 13. Verification Strategy

Planning-only stages:

- `git diff --check`
- progress CSV shape check using `python3 -S`
- `git status --short --branch`

Implementation stages, once separately authorized, should include:

- focused postgame domain/repository tests;
- focused postgame component/view-model tests;
- real two-client Supabase-backed E2E for rematch or cross-client mutual-intent claims;
- focused `ProfilePanel` tests for accent preview;
- focused `StatsDashboard`/chart tests for hidden captions and layout labels;
- focused `AboutBrrrdlePanel` tests for formula formatting and anchor behavior;
- focused `MultiplayerStatsPanel` tests for bucket dedupe, labels, and copy;
- browser smoke for Stats/Profile/About visible changes if warranted;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e` when postgame route/workspace behavior or two-client multiplayer behavior changes;
- `npm run test:full` during final hardening;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact scan;
- watched-port/process cleanup checks.

## 14. Risks And Mitigations

- **Daily claim bypass**: never show Daily rematch/replay shortcuts; add explicit tests.
- **Ranked queue bypass**: ranked same-settings search should use trusted ranked queue/RPC flow unless a separately approved rematch RPC exists.
- **Stale mutual intent**: rematch requests need expiry, cancellation, and source-game validation.
- **Wrong-account acceptance**: require authenticated participant identity checks.
- **Spam/abuse**: debounce or rate-limit repeated requests where state is durable.
- **Answer/seed leakage**: copy only same-settings metadata, never answer-bearing sessions or seeds.
- **Profile privacy drift**: account accent preview must not change public profile visibility or public identity.
- **Accessibility regression**: Stats overlap fixes must preserve screen-reader access to chart data.
- **Elo authority confusion**: copy can be friendlier, but trusted settlement remains the internal authority and Elo constants do not change.
- **Bucket corruption masking**: avoid turning unknown buckets into valid-looking duplicate OG rows in the UI.
- **Scope creep**: keep Phase 32 ranked expansion, public/guest spectation, service workers, push infrastructure, theme work, Elo changes, and gameplay-rule changes out of Phase 31.

## 15. Open Decisions

- Does rematch request/accept require durable Supabase state, or can Phase 31 safely use an existing game/lobby/RPC path?
- Should ranked Practice rematches be direct opponent rematches or same-settings ranked search-again through the queue only?
- Should unranked Practice rematch create a fresh private-code/custom game, or create a direct participant-pair game if safely supported?
- What expiry window should rematch requests use?
- Should a player see both `Request rematch` and `Search again`, or should one be primary based on ranked/unranked context?
- Should Stats rating buckets drop corrupt unknown bucket rows or surface a non-player-facing diagnostic in tests only?
- Should About formula formatting be implemented with plain accessible HTML/CSS or a lightweight math component local to the About panel?

## 16. Explicit Deferrals

- Ranked mode expansion / competitive ladder v2 remains Phase 32, including timed Practice ranked first and Daily ranked only after claim-safety proof.
- Public/guest spectation remains Phase 33 and requires separately approved sanitized public projections.
- Theme proposal/template modernization remains Phase 34.
- Full concrete theme implementation remains Phase 35 or later.
- Service workers, push subscriptions, background push, and deployment configuration remain out of Phase 31 unless separately planned and authorized.
- Elo algorithm changes, rating authority changes, and gameplay-rule changes remain out of Phase 31.

## 17. Next Gated Action

The next safe action is a unified Phase 31 specification.

That specification should:

- turn this planning brief into an implementation-oriented contract;
- preserve Practice-only rematch/search-again scope and Daily exclusions;
- define the migration/RLS decision gate for durable rematch mutual intent;
- include the user-reported profile, Stats, About, and rating-bucket cleanup items;
- define focused tests and verification gates;
- generate the next prompt package for the detailed Phase 31 implementation plan.

Do not begin Phase 31 implementation from this planning brief alone.
