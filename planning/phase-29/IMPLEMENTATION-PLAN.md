# Phase 29 Implementation Plan

**Status**: Detailed execution plan for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-20.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, `planning/phase-29/PLANNING-BRIEF.md`, `planning/specs/phase-29/PHASE-29-PUBLIC-PROFILES-NOTIFICATION-ACTIONS-AND-ELO-ABOUT-SPEC-2026-06-20.md`, current roadmap surfaces, and the progress ledger.

## 1. Purpose

Phase 29 should implement privacy-safe public player profile foundations and narrow Phase 28 carryover stabilization for notifications and Elo transparency.

This plan is not implementation authorization. Each stage below requires a separate prompt and progress gate before work begins.

## 2. Execution Principles

- Keep all work in `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Do not touch the original stable `brrrdle` repository.
- Preserve the existing uncommitted Phase 29 planning brief, unified spec, and progress artifacts until Git handoff is separately authorized.
- Treat public profile data as a new public-safe projection, not as direct exposure of Supabase auth metadata.
- Default public profile visibility should be private or opt-in unless Stage 29.2 explicitly justifies a different safe default.
- Use dashboard action targets as the notification click-routing authority instead of creating notification-specific route logic.
- Keep browser notification work inside the existing foreground, no-service-worker, no-push architecture.
- Move long Elo explanation into About without changing the Phase 27 Elo model, trusted settlement, rating transactions, or ranked Practice boundaries.
- Keep profile, notification, About copy, route, and dashboard state out of gameplay authority.
- Prefer focused tests before broad gates, and halt on verification failure.

## 3. Success Criteria

Phase 29 is complete when:

- public profiles expose only approved public-safe identity fields;
- raw auth emails, raw auth ids, private auth metadata, tokens, local/session artifacts, private progress, private ranked projections, answers, seeds, serialized sessions, and raw game projections stay private;
- profile visibility is clear, abuse-resistant, and conservative by default;
- owner writes cannot mutate another user's public profile;
- public profile links use an opaque public profile id or safe slug, not raw auth ids;
- Phase 30 leaderboards can later reference public profile identity without changing rating authority;
- Chrome browser notification behavior is reproduced or classified without adding service workers or push;
- foreground browser notification clicks focus the app and route through existing dashboard action targets while the page context is alive;
- Notification Center has a near-top `Mark all read` control;
- visible `Mark read` and `Dismiss` behavior is simplified or made semantically clear;
- long Elo/ranked explanation lives in About, ranked surfaces keep compact links/copy, and docs remain aligned with `src/multiplayer/rating.ts`;
- Phase 27 ranked Practice behavior, Phase 28 Live spectator behavior, Daily Multiplayer integrity, and all gameplay rules remain unchanged.

## 4. Likely Files And Responsibilities

### Profile Foundations

- `src/account/profile.ts`: pure validation, normalization, public profile DTO helpers, and privacy-safe projection helpers.
- `src/account/ProfilePanel.tsx`: owner profile editing and public/private visibility copy.
- `src/account/auth.ts`: auth summary reference only; avoid exposing private metadata in public profile DTOs.
- `src/account/sync.ts`: reference only unless a separately approved profile repository seam belongs here.
- `src/account/storageSchema.ts`: reference only; do not store public profile authority in guest progress.
- `src/account/Settings.tsx`: possible profile visibility/settings copy if Stage 29.4 chooses Settings placement.
- New profile files if useful: `src/account/publicProfile.ts`, `src/account/publicProfileRepository.ts`, `src/account/PublicProfilePanel.tsx`, `src/account/PublicProfileView.tsx`, and focused tests.
- `docs/supabase.md`: document approved public profile migration/RLS behavior after migration execution.
- `supabase/migrations/`: only after Stage 29.3 is explicitly authorized.

### Notification Actions

- `src/notifications/browserNotifications.ts`: foreground notification dispatch, click handler attachment, click decision DTOs, payload privacy.
- `src/notifications/notificationActions.ts`: mark-all-read helper and shared activation bridge.
- `src/notifications/notificationStorage.ts`: local metadata helpers; preserve separate `readAt` and `dismissedAt` compatibility if useful.
- `src/notifications/notificationViewModels.ts`: visible item counts and eligible mark-all-read selection.
- `src/notifications/NotificationCenter.tsx`: top-level `Mark all read` UI and simplified per-item actions.
- `src/dashboard/dashboardActions.ts`: existing route authority; change only if Stage 29.5 proves a reusable route target gap.
- `src/app/App.tsx`: wire browser notification click routing, Notification Center actions, and route/subtab/game selection.

### About And Elo Copy

- `src/app/App.tsx`: About section and route/focus/scroll integration.
- `src/app/routes.ts`: route/hash/subview support only if the chosen About navigation mechanism requires it.
- `src/multiplayer/MultiplayerPanel.tsx`: replace long inline Elo copy with compact ranked guidance and About link.
- `src/multiplayer/MultiplayerStatsPanel.tsx`: replace long inline Elo copy with compact ranked guidance and About link.
- `src/multiplayer/rating.ts`: source-of-truth reference only; do not change constants/formulas.
- `docs/ranked-multiplayer.md`: keep player-facing Elo docs aligned with About copy.

### Tests And E2E

- `src/account/profile.test.ts`
- `src/account/ProfilePanel.test.tsx`
- New public profile helper/repository/component tests as needed.
- `src/notifications/browserNotifications.test.ts`
- `src/notifications/notificationActions.test.ts`
- `src/notifications/notificationStorage.test.ts`
- `src/notifications/notificationViewModels.test.ts`
- `src/notifications/NotificationCenter.test.tsx`
- `src/dashboard/dashboardActions.test.ts`
- `src/app/routes.test.ts`
- Ranked copy tests in `src/multiplayer/MultiplayerPanel.test.tsx` and `src/multiplayer/MultiplayerStatsPanel.test.tsx`
- Browser smoke or E2E only when visible profile, notification, or About navigation behavior warrants it.

## 5. Dependencies And Constraints

- Supabase access is required only for migration/RLS execution and remote privacy probes.
- Stage 29.2 addendum planning must precede any profile SQL creation.
- Stage 29.3 migration execution must confirm the intended `brrrdle-dev` Supabase target without printing secrets.
- Notification click routing must not promise durable routing after the page context is gone.
- Browser notifications may remain limited by Chrome/Safari/OS permissions; Stage 29.5 should distinguish app bugs from browser policy limits.
- Public leaderboards remain Phase 30.
- Multiplayer rematch and same-settings play-again/search-again remain Phase 31.
- Public/guest spectation remains Phase 32.
- Theme proposal/template modernization remains Phase 33.
- Full concrete themes remain Phase 34 or later.

## 6. Stage Breakdown

### Stage 29.0 - Implementation Plan Approval And Protected Baseline

**Goal**: Approve this plan, preserve planning artifacts, and prove the current baseline before implementation starts.

**Allowed work**:

- read required governance, planning, progress, package, and test surfaces;
- confirm repository state and that the original stable repository is not being used;
- create the Stage 29.0 progress report and CSV row;
- run resource/process checks and baseline verification.

**No source/runtime/test/migration implementation.**

**Verification gate**:

- watched-port/process/resource checks before and after verification;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- Python CSV shape check using `python3 -S`;
- `git status --short --branch`.

**Exit gate**:

- baseline passes;
- progress records updated;
- halt for Stage 29.1 authorization.

### Stage 29.1 - Profile, Notification, And Elo Reproduction/Audit

**Goal**: Reproduce and classify the implementation problems before changing source code.

**Deliverables**:

- progress report and CSV row;
- audit notes inside the progress report or a short planning note if needed;
- decision on whether Stage 29.2 migration/RLS addendum planning is required.

**Audit tasks**:

- confirm current private profile metadata path in `src/account/profile.ts`, `src/account/auth.ts`, `src/account/ProfilePanel.tsx`, and `supabase/migrations/20260526012500_phase8_accounts.sql`;
- confirm avatar bucket assumptions in `docs/supabase.md` and `src/account/auth.ts`;
- confirm browser notification dispatch path in `src/notifications/browserNotifications.ts` and `src/app/App.tsx`;
- reproduce or classify Chrome notification behavior with permission and settings enabled;
- reproduce Safari foreground notification click behavior where available;
- confirm `activateNotificationItem` and `dispatchDashboardAction` are the canonical route bridge;
- confirm Notification Center read/dismiss behavior and whether any archive/read-history view exists;
- confirm current long Elo copy locations in `MultiplayerPanel` and `MultiplayerStatsPanel`;
- identify the safest About navigation mechanism.

**Verification**:

- focused read-only or browser checks as needed;
- one local dev server only if browser reproduction requires it;
- `git diff --check`;
- Python CSV shape check using `python3 -S`;
- `git status --short --branch`.

**Exit gate**:

- if public profile persistence/RLS is required, halt with Stage 29.2 addendum prompt;
- if no migration is needed, explain why and route to Stage 29.4 app foundations.

### Stage 29.2 - Public Profile Migration/RLS Addendum Planning

**Goal**: Create an exact SQL/RLS plan for public-safe profiles without creating SQL yet.

**Deliverables**:

- `planning/specs/phase-29/PHASE-29-PUBLIC-PROFILE-MIGRATION-RLS-ADDENDUM-2026-06-20.md` or date-adjusted equivalent;
- progress report and CSV row.

**Addendum must define**:

- table, view, and RPC names;
- public profile field allow-list;
- default visibility;
- owner insert/update semantics;
- public read scope: unauthenticated public rows versus authenticated-only first step;
- slug or opaque id strategy;
- avatar/flair/bio semantics and validation;
- indexes and uniqueness constraints;
- grants and RLS policies;
- rollback plan;
- non-printing privacy probes;
- future Phase 30 leaderboard identity reference contract.

**Recommended migration shape**:

- additive `public_player_profiles` table or similarly named public-safe projection;
- private `user_id` stored for ownership but excluded from public DTO/RPC output;
- generated opaque `public_profile_id`;
- optional slug only if uniqueness, normalization, and reserved-word handling are specified;
- `visibility` constrained to approved values;
- owner-only writes through RLS or authenticated security-definer RPCs;
- public/anon reads only for explicit allow-listed public fields if public reads are approved.

**Verification**:

- `git diff --check`;
- Python CSV shape check using `python3 -S`;
- `git status --short --branch`.

**Exit gate**:

- halt for explicit Stage 29.3 migration execution authorization.

### Stage 29.3 - Public Profile Migration/RLS Execution

**Goal**: Create and apply the approved additive profile migration, then prove privacy behavior.

**Allowed only after separate authorization.**

**Deliverables**:

- one additive migration under `supabase/migrations/`;
- progress report and CSV row;
- non-printing privacy probe results;
- `docs/supabase.md` update if the migration succeeds.

**Execution rules**:

- confirm Supabase target is the intended `brrrdle-dev` project without printing secrets;
- create only the SQL described in the Stage 29.2 addendum;
- apply only if target and credentials are unambiguous;
- preserve existing `profiles`, `progress_snapshots`, `game_history`, `settings`, ranked tables, spectator RPCs, and Daily claim policies.

**Privacy probes**:

- private profile rows are not readable by anon or non-owner;
- public rows expose only allow-listed fields;
- raw auth emails and raw auth ids are not returned by public profile reads;
- private metadata, private progress, private ranked projections, answers, seeds, sessions, and raw game projections remain denied;
- owners cannot write another user's public profile;
- invalid public fields are rejected or normalized.

**Exit gate**:

- if migration or probes fail, stop before app implementation;
- if clean, halt for Stage 29.4 app implementation authorization.

### Stage 29.4 - Public Profile App Foundations

**Goal**: Add app support for public profile editing, preview, and safe profile routes/links using the approved persistence contract.

**Deliverables**:

- pure public profile helpers and tests;
- repository seam for approved profile RPC/table access;
- owner edit/preview UI;
- public/private visibility copy;
- public profile view or route foundation;
- future-safe public profile link or id for Phase 30 leaderboards;
- progress report and CSV row.

**Implementation guidance**:

- start with failing tests for normalization, forbidden fields, visibility, and DTO parsing;
- reuse `normalizeDisplayName`, `validateAccentColor`, and `validateAvatarUrl` only where they satisfy public-profile constraints;
- add stricter bio/flair/slug helpers rather than putting validation directly in React components;
- keep existing private account metadata editing intact;
- never derive public profile fields from email local-parts unless the user explicitly typed that value as a public display name;
- do not expose raw `authState.user.id` in route text, hrefs, or public DTOs.

**Focused verification**:

- profile helper tests;
- profile repository tests or mocked RPC tests;
- component tests for visibility copy and public/private preview;
- privacy string scans over touched profile code for forbidden raw fields;
- `git diff --check`;
- Python CSV shape check using `python3 -S`.

**Broad verification if TypeScript/export boundaries change**:

- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`.

### Stage 29.5 - Notification Action And Center Cleanup

**Goal**: Make foreground browser notification clicks useful and simplify Notification Center actions.

**Deliverables**:

- browser notification click routing through existing dashboard action targets;
- `Mark all read` helper and top-of-panel UI;
- clarified or simplified `Dismiss` behavior;
- focused notification/dashboard tests;
- progress report and CSV row.

**Implementation guidance**:

- extend `dispatchBrowserNotification` or add a companion helper so the created `Notification` object can receive an `onclick` handler;
- keep notification payload title/body/tag privacy-redacted;
- route clicks through `activateNotificationItem` or equivalent shared dashboard action logic;
- call `window.focus()` best-effort without depending on it for correctness;
- mark clicked notification read locally;
- gracefully handle stale targets by focusing the nearest safe route/subtab;
- add `markAllVisibleNotificationsRead` in notification action/storage helpers rather than mutating UI lists directly;
- keep separate `dismissedAt` metadata internally if needed for backward compatibility, but do not keep unclear `Mark read` and `Dismiss` as equal primary actions.

**Focused verification**:

- `src/notifications/browserNotifications.test.ts`;
- `src/notifications/notificationActions.test.ts`;
- `src/notifications/notificationStorage.test.ts`;
- `src/notifications/notificationViewModels.test.ts`;
- `src/notifications/NotificationCenter.test.tsx`;
- `src/dashboard/dashboardActions.test.ts`;
- browser smoke for Chrome/Safari notification behavior if available without secrets.

**Exit gate**:

- if browser/OS policy prevents Chrome delivery after app-side fixes, document the limitation plainly and keep the no-service-worker/no-push boundary.

### Stage 29.6 - About Elo Transparency Relocation

**Goal**: Move detailed Elo explanation to About and keep ranked surfaces concise.

**Deliverables**:

- About-tab ranked/Elo section;
- compact ranked-surface link/button;
- aligned docs copy;
- focused copy/navigation tests;
- progress report and CSV row.

**Implementation guidance**:

- use `src/multiplayer/rating.ts` constants as copy inputs or verified source references;
- explain K factor, provisional games, established K, expected-score curve, rating buckets, ranked Practice v1 boundaries, and match points versus Elo movement;
- state Daily ranked and timed Practice ranked remain deferred;
- state public leaderboards remain Phase 30;
- remove duplicated long Elo copy from `MultiplayerPanel` and `MultiplayerStatsPanel`;
- choose one navigation mechanism for `How is Elo calculated?`: route hash, focus ref, app state scroll target, or About subview.

**Focused verification**:

- About render/navigation tests;
- ranked multiplayer copy tests;
- docs copy review against `docs/ranked-multiplayer.md`;
- no changes to rating constants or settlement behavior.

### Stage 29.7 - Final Hardening And Handoff Preparation

**Goal**: Complete Phase 29 with privacy, UX, route, docs, and verification evidence ready for Git handoff.

**Deliverables**:

- narrow cleanup fixes only;
- Phase 29 changelog;
- final progress report and CSV row;
- verification evidence;
- copy-safe Git handoff preparation prompt.

**Review checklist**:

- profile public DTOs contain no forbidden private fields;
- profile default visibility and user-facing copy are clear;
- public profile links do not reveal raw auth ids;
- notification click routing reuses dashboard action targets;
- notification payloads remain redacted;
- `Mark all read` does not mutate gameplay, profile, ranking, Daily claims, Supabase authority, or remote state;
- About/Elo copy matches the Phase 27 model;
- Phase 27 and Phase 28 invariants remain intact;
- docs and progress records are complete.

**Final verification expectation**:

- focused Stage 29 tests;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e` if route/profile/notification browser behavior changed enough to warrant it;
- `npm run test:full` if the final hardening prompt requires the full final gate;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- Python CSV shape check using `python3 -S`;
- non-printing secret/artifact scan;
- watched-port/process cleanup check.

## 7. Migration/RLS Gates

Stage 29.2 and Stage 29.3 are expected unless Stage 29.1 proves a safer no-migration route.

Stop before SQL creation if:

- the public profile field allow-list is unclear;
- public versus authenticated read scope is unresolved;
- slug versus opaque-id routing is unresolved;
- avatar/bio visibility semantics are unresolved;
- migration target or credentials are ambiguous;
- privacy probes cannot be written without printing private data or secrets.

Stop before app implementation if:

- migration application fails;
- RLS/privacy probes fail;
- public profile DTOs expose raw auth ids, emails, private metadata, raw ranked data, answers, seeds, sessions, or raw game projections;
- rollback requirements are unclear.

## 8. Stop Conditions

Stop and record the non-secret blocker if any stage reveals:

- a conflict between current user instructions, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, the Phase 29 brief, and the unified spec;
- source/runtime work required during a planning-only prompt;
- migration creation/execution required without explicit migration authorization;
- service workers, push subscriptions, deployment configuration, public leaderboards, public/guest spectation, or Phase 30 work becoming necessary;
- a need to change Elo constants, rating formulas, trusted settlement, scoring, Daily claims, or gameplay rules;
- a verification command failure;
- a secret, token, private account payload, auth state, screenshot, video, trace, or local session artifact would need to be printed.

## 9. Risk Management

- **Profile privacy leakage**: use allow-listed DTOs and privacy probes; never expose raw auth metadata.
- **Unexpected public exposure**: ship private/opt-in defaults and preview copy.
- **Slug abuse or collisions**: prefer opaque ids unless slug rules are exact and testable.
- **Avatar visibility confusion**: default to initials/flair or clear public-avatar copy.
- **Bio moderation risk**: keep bios short, plain text, and easy to disable.
- **Chrome notification variability**: classify browser/OS limitations separately from app dispatch failures.
- **Stale notification targets**: route to nearest safe route/subtab if the target game is no longer available.
- **Notification UI confusion**: simplify visible actions instead of preserving unclear redundancy.
- **Elo copy drift**: maintain one canonical About explanation and keep docs aligned.
- **Scope creep**: keep leaderboards, public/guest spectation, rematch flows, push infrastructure, themes, and gameplay changes out of Phase 29.

## 10. Open Decisions For Stage 29.1/29.2

- Should opted-in public profiles be readable by unauthenticated visitors in Phase 29, or should public-safe reads begin authenticated-only?
- Should Phase 29 ship optional bios, or reserve the field while shipping display name, visibility, accent/flair, and avatar foundations first?
- Should public profile links use only opaque public ids, or also user-facing slugs?
- Should public avatar URLs be enabled in Phase 29, or should initials/flair be the first public identity visual?
- Should `Dismiss` be removed from visible per-item actions, renamed to `Hide`, or moved behind a secondary affordance?
- Should About Elo navigation use a route hash, focus ref, app state scroll target, or dedicated About subview?

## 11. Next Gated Prompt

The next safe action is Stage 29.0: Implementation Plan Approval And Protected Baseline.

Stage 29.0 should not edit source/runtime code, implement tests, create migrations, or begin Phase 29 product work. It should verify the baseline, preserve all planning artifacts, create progress ID 215, and halt for Stage 29.1 authorization.
