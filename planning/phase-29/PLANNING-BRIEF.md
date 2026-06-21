# Phase 29 Planning Brief

**Status**: Planning brief for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-20.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, Phase 28 completion artifacts, Phase 27 ranked foundations, current roadmap surfaces, and the current progress ledger.

## 1. Purpose

Phase 29 should introduce privacy-safe public player profile foundations while carrying forward a narrow set of Phase 28 stabilization items that affect already-shipped notification and Elo transparency surfaces.

The phase is not a leaderboard phase. Public leaderboards remain Phase 30, multiplayer rematch and same-settings play-again/search-again remain Phase 31, public/guest spectation remains Phase 32, theme proposal/template modernization remains Phase 33, and full concrete theme implementation remains Phase 34 or later.

## 2. Current-State Findings

Phase 28 is complete, merged, and cleaned up. Local `main` and `origin/main` are expected to be at `f34f3c9463af09286cfd1230ba2312b19163f75e`.

Phase 28 fixed the Live subtab spectator freshness problem, keeps current Daily Multiplayer games out of Live spectator discovery, and added focused authenticated spectation with sanitized terminal hold behavior. Phase 29 must preserve those results.

Existing profile editing is account-local and stores display name, accent color, and optional avatar URL through validated Supabase `auth.users.user_metadata`. That metadata is useful input, but it is not itself a public-safe identity contract. Public profile foundations need a deliberate projection or table/RPC boundary that never exposes raw auth emails, raw auth ids, private account metadata, tokens, local progress, private ranked projections, answer-bearing data, or session artifacts.

Existing notification state distinguishes `readAt` from `dismissedAt`: read notifications can still exist as read items, while dismissed notifications are hidden. In the current UI, there is no meaningful show-read or archived-notification workflow, so `Mark read` and `Dismiss` appear redundant to players. Phase 29 should simplify or clarify this behavior.

Existing in-app notification activation already routes through dashboard action targets. Browser notifications are dispatched as foreground `Notification` objects, but the browser notification object is not wired to a durable click-routing bridge. This explains why clicking Safari's `Show` action can focus the browser without moving the app from Home to the target multiplayer route/subtab/game.

Phase 28 added useful Elo transparency copy in ranked surfaces and docs. The long player-facing explanation should move to the About tab so ranked multiplayer surfaces stay compact. Ranked surfaces may keep a small link or button such as `How is Elo calculated?` that routes to or scrolls to the About Elo section. The Phase 27 Elo model must not change.

## 3. Goals

- Define privacy-safe public player profile foundations that can later support public leaderboards without exposing private account, gameplay, or ranked data.
- Add or plan safe player-controlled public identity fields such as display name, avatar/flair/accent, optional bio, and future-safe profile metadata.
- Keep public identity abuse-resistant, conservative by default, and clearly separated from raw Supabase auth metadata.
- Plan any required schema/RLS addendum before creating or executing migrations.
- Diagnose Chrome browser notification behavior without adding service workers, push subscriptions, background push, or deployment configuration.
- Route browser notification clicks through existing dashboard action targets, route/subtab state, selected multiplayer game state, and window focus behavior.
- Add a near-top `Mark all read` affordance for eligible Notification Center items.
- Decide whether to remove, rename, or demote `Dismiss` now that `Mark read` is the clearer primary action.
- Move long Elo transparency copy to the About tab and keep compact navigation from ranked surfaces.
- Expand About-tab Elo copy to define K factor, provisional games, expected-score curve, rating buckets, ranked Practice v1 boundaries, and match points versus Elo movement.

## 4. In Scope

- Public profile foundation planning, including display identity, visibility controls, public-safe projection shape, owner edit flow, and future leaderboard linkability.
- Public-safe profile fields: display name, initials/avatar/flair/accent, optional bio, optional slug or public profile id, creation/update timestamps, and future-safe placeholders for Phase 30 leaderboard identity.
- Abuse-resistant defaults: private/off until the user opts in or a later spec approves a narrower safe default; length limits; allow-listed style values; sanitized text fields; no raw HTML; no direct trust in client-provided public fields.
- Migration/RLS addendum planning if any new public profile tables, RPCs, policies, grants, indexes, or storage rules are required.
- Chrome browser notification reproduction and permission/site-setting diagnosis.
- Foreground browser notification click routing using existing privacy-redacted notification items and dashboard action targets.
- Notification Center `Mark all read` design and local metadata behavior.
- `Mark read` versus `Dismiss` UX simplification or clearer semantics.
- About-tab Elo transparency relocation and expanded explanatory copy.
- Focused tests and documentation updates required for the above once implementation is separately authorized.

## 5. Out of Scope

- Public leaderboards, leaderboard routes, leaderboard APIs, leaderboard ranking pages, or public ranked aggregation UI.
- Public/guest spectation or any unauthenticated spectator path.
- Multiplayer rematch, same-settings play-again, same-settings search-again, or postgame mutual-intent flows.
- Service workers, push subscriptions, background cross-device notification delivery, or notification deployment configuration.
- Changes to the Phase 27 Elo algorithm, K factors, provisional window, expected-score formula, ranked bucket rules, or trusted settlement authority.
- New gameplay rules, scoring formula changes, Daily ranked, timed ranked Practice, or new ranked match types.
- New Supabase migrations before a separate migration/RLS addendum and execution authorization.
- Theme proposal modernization or concrete theme implementation.
- Deployments, releases, PR creation, merges, branch cleanup, or Phase 30 implementation.

## 6. Invariants To Preserve

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Current Daily Multiplayer answer leakage through spectator views remains prevented.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged unless later explicitly approved.
- Ranked Practice v1 remains the only ranked match type unless later explicitly approved.
- Daily ranked and timed Practice ranked remain deferred.
- Match points and Elo/rank movement remain separate.
- Live v1 spectator behavior remains read-only.
- Public/guest spectation remains unavailable unless a later approved phase explicitly implements sanitized public projections.
- Existing scoring, timeout, forfeit, rating/Elo, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged unless explicitly approved.
- Notification state, profile state, About copy, and dashboard route state must not become gameplay authority.

## 7. Recommended Stage Breakdown

### Stage 29.0 - Planning Approval And Protected Baseline

- Confirm repository state and preserve existing Phase 29 planning artifacts.
- Create the Stage 29.0 progress report and CSV row.
- Run the baseline verification gate before implementation begins.
- Do not modify source/runtime code.

### Stage 29.1 - Profile, Notification, And Elo Reproduction/Audit

- Audit current account/profile metadata, avatar storage assumptions, dashboard routing, notification action targets, browser notification dispatch, About tab structure, ranked Elo copy locations, and relevant tests.
- Reproduce or classify Chrome foreground browser notification behavior with permission and preferences enabled.
- Confirm Safari browser notification `Show` behavior and the missing app-route handoff.
- Confirm Notification Center `Mark read`/`Dismiss` behavior and whether a read-item view exists.
- Confirm current Elo copy placement and the safest About-tab relocation point.
- Decide whether public profile foundations require a migration/RLS addendum before app implementation.

### Stage 29.2 - Public Profile Migration/RLS Addendum Planning

- Create a precise migration/RLS addendum only if Stage 29.1 confirms a database/RLS change is needed.
- Define tables/RPCs/policies/grants for a public-safe identity projection.
- Separate owner-write/private auth metadata from public-read identity fields.
- Define public/anon versus authenticated-read behavior explicitly.
- Define privacy probes for raw email denial, raw auth id denial, private metadata denial, private ranked projection denial, answer/session/seed denial, owner-write enforcement, and public projection allow-list behavior.

If Stage 29.1 proves no migration is needed for a narrow local-only planning increment, this stage should be skipped and documented as not required.

### Stage 29.3 - Public Profile Migration/RLS Execution

- Execute only after explicit migration authorization.
- Apply one additive migration to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous.
- Verify owner-write and public-safe read behavior through non-printing privacy probes.
- Stop before app implementation if migration verification fails.

### Stage 29.4 - Public Profile App Foundations

- Add profile editing/view-model support for approved public identity fields.
- Provide visibility controls and clear copy for what is public versus private.
- Reuse existing display-name/accent/avatar validation where safe, but do not expose raw auth metadata directly.
- Add future-safe profile links or ids that Phase 30 leaderboards can reference without changing rating authority.
- Preserve local account/profile behavior and avatar fallback behavior.

### Stage 29.5 - Notification Action And Center Cleanup

- Diagnose Chrome behavior and record whether failures are browser permission/site setting, app dispatch, foreground browser API behavior, or no-service-worker/no-push limitation.
- Wire browser notification click handling to the same dashboard action target used by in-app notification activation.
- On click, focus the window and route to the intended tab/subtab/selected game without exposing private payload details in the browser notification.
- Add a top-of-list `Mark all read` action for currently eligible Notification Center items.
- Simplify `Mark read` versus `Dismiss` by making `Mark read` the primary action and either removing `Dismiss`, renaming it to a clearer archive/hide action, or demoting it behind a secondary menu if an intentional future use is preserved.
- Keep notification read/dismiss metadata local unless a later spec separately authorizes synced notification state.

### Stage 29.6 - About Elo Transparency Relocation

- Move long Elo/ranked explanation out of crowded ranked multiplayer surfaces and into the About tab.
- Add an About section anchor or route target for `How is Elo calculated?`.
- Keep ranked surfaces compact with a link/button to the About Elo section.
- Expand the About copy with plain-language definitions of K factor, provisional games, expected score, rating buckets, ranked Practice v1 boundaries, and points versus Elo.
- Do not change `rating.ts`, settlement SQL, rating transaction behavior, or any Phase 27 Elo constants unless a later authorized spec explicitly changes the model.

### Stage 29.7 - Final Hardening And Handoff

- Review Phase 29 changes for privacy gaps, stale copy, notification routing regressions, profile default confusion, responsive issues, and documentation/progress gaps.
- Run focused tests for profile, notification, dashboard action, About/Elo, and any migration/RLS seams touched.
- Run full final verification before Git handoff.
- Prepare Phase 29 changelog and handoff evidence.

## 8. Success Criteria

- Public profile foundations expose only approved public-safe identity fields and never expose raw auth emails, raw auth ids, private account metadata, tokens, local/session artifacts, private progress, answer-bearing fields, or private ranked projections.
- Profile visibility and field semantics are clear to players and conservative by default.
- Any public profile migration/RLS work has non-printing privacy probes that prove the allow-list and deny-list behavior.
- Chrome browser notification behavior is reproduced or classified, and any app-side fix stays within the existing foreground/no-push architecture.
- Browser notification clicks focus the app and route to the correct existing target when an action target is available.
- Notification Center has a near-top `Mark all read` control that marks eligible visible notifications read without mutating gameplay, profile, ranking, or Supabase authority.
- `Mark read` and `Dismiss` no longer feel redundant to players: either the UI is simplified or the distinction is made useful and clear.
- Long Elo transparency copy lives in About, ranked surfaces stay compact, and the player can navigate from ranked surfaces to the About Elo section.
- Phase 27 Elo/rank rules, Phase 28 Live spectator behavior, Daily Multiplayer integrity, and all gameplay rules remain unchanged.

## 9. Likely Files And Modules

- `src/account/ProfilePanel.tsx`
- `src/account/profile.ts`
- `src/account/auth.ts`
- `src/account/sync.ts`
- `src/account/storageSchema.ts`
- `src/account/Settings.tsx`
- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/dashboard/dashboardActions.ts`
- `src/notifications/NotificationCenter.tsx`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationStorage.ts`
- `src/notifications/notificationViewModels.ts`
- `src/notifications/browserNotifications.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/rating.ts` for read-only reference only; avoid algorithm changes.
- `docs/ranked-multiplayer.md`
- `docs/supabase.md`
- Relevant account/profile, notification, dashboard, route, About/Elo, ranked, and E2E tests.
- Future `supabase/migrations/` files only after separate migration execution authorization.

## 10. Migration And RLS Constraints

This planning brief does not authorize migration creation or execution.

If Phase 29 requires new public profile persistence, use an explicit migration/RLS addendum stage before any SQL is created. The preferred shape is an additive public-safe identity projection, such as a dedicated table and/or authenticated security-definer RPCs, that:

- separates private auth metadata from public profile data;
- allows owners to create/update only their own public profile fields;
- permits public reads only for a strict allow-list if public profiles are intentionally public;
- can alternatively begin authenticated-only if the spec chooses a more conservative first step;
- never exposes raw auth emails, raw auth ids, private account metadata, tokens, private progress, local/session artifacts, raw ranked profiles/transactions, answer-bearing fields, seeds, or raw game/session projections;
- uses normalized display names, allow-listed accent/flair values, bounded optional bio text, and safe avatar/flair references;
- includes clear rollback steps and privacy probes.

Notification click routing, Notification Center cleanup, and About-tab Elo copy should not require migrations. If implementation discovers that synced notification state or cross-device notification behavior is necessary, stop and route that to a later separately authorized phase because it would exceed the no-service-worker/no-push Phase 29 boundary.

## 11. Verification Strategy

Planning-only stages should run:

- `git diff --check`
- Python `csv` shape check for `progress/PROGRESS.csv` using `python3 -S`
- `git status --short --branch`

Implementation stages should run focused tests before broad gates. Expected focused areas include:

- account/profile helper and UI tests;
- public profile repository/RLS probe tests if migrations are authorized;
- notification browser dispatch and click-routing tests;
- Notification Center action tests for `Mark all read` and any `Dismiss` simplification;
- dashboard action routing tests;
- About/Elo copy and navigation tests;
- ranked copy regression tests to ensure the Elo model did not change.

Final Phase 29 verification should include:

- focused changed-area tests;
- `npm run lint`;
- `npm run test`;
- `npm run test:e2e` if route/browser behavior changes warrant it;
- `npm run test:full` if the implementation plan confirms the final gate;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check;
- non-printing secret/artifact checks;
- watched-port/process cleanup checks;
- browser smoke for Chrome/Safari notification behavior where practical and non-secret.

## 12. Risks

- Public profile work can accidentally leak private auth metadata if it reuses existing `user_metadata` directly instead of projecting allow-listed fields.
- Avatar URLs may already be public through the optional `avatars` bucket; Phase 29 needs clear visibility semantics so users understand which avatar or flair is public.
- Public display names and bios can create abuse/moderation concerns. Keep limits tight and avoid open-ended HTML or rich text.
- Browser notification behavior varies across Chrome, Safari, OS permissions, focus state, installed-app state, and site settings. The plan should distinguish app bugs from browser or OS policy limits.
- Browser notification click handling can route to stale or inaccessible games. Use existing action-target validation and fail gracefully if the target no longer exists.
- Removing `Dismiss` outright could surprise users who rely on hiding old items. If retained, it needs clearer label/copy and possibly a secondary placement.
- Elo copy relocation can create stale duplicate explanations if the old long copy remains in ranked surfaces.

## 13. Open Decisions

- Should public profiles be visible to unauthenticated visitors in Phase 29, or should the first public-safe projection be authenticated-only until Phase 30 leaderboards require broader access?
- Should public profiles be opt-in only by default, or should a minimal generated public identity exist for every ranked/player account with no email-derived data?
- Should profile URLs use stable slugs, opaque public profile ids, or both?
- Should optional bios ship in Phase 29, or should Phase 29 reserve the field while shipping display name/avatar/accent first?
- Should avatar images be reused from the existing optional public `avatars` bucket, or should Phase 29 prefer initials/flair until image moderation/storage rules are stronger?
- Should `Dismiss` be removed from the visible Notification Center, renamed to `Hide`, or retained only in a secondary menu?
- What exact About-tab navigation mechanism should be used for Elo: route hash, internal section id, app state scroll target, or a dedicated About subtab?

## 14. Recommended Routing For User-Provided Items

- Chrome browser notifications: include in Phase 29 as a reproduction/diagnosis and app-side stabilization item within the existing foreground/no-service-worker architecture.
- Browser notification `Show` action routing: include in Phase 29 because it reuses existing notification action targets and route/subtab state.
- Notification Center `Mark all read`: include in Phase 29 as local notification metadata UX cleanup.
- `Mark read` versus `Dismiss`: include in Phase 29; recommended default is to simplify the UI unless Stage 29.1 finds a real read-history/archive workflow worth preserving.
- Elo transparency relocation: include in Phase 29 as low-risk About-tab copy/navigation work with no Elo algorithm changes.
- Public player profile foundations: primary Phase 29 scope.
- Public leaderboards: defer to Phase 30.
- Multiplayer rematch and same-settings play-again/search-again: defer to Phase 31.
- Public/guest spectation: defer to Phase 32.
- Theme proposal/template modernization: defer to Phase 33.
- Full concrete themes: defer to Phase 34 or later.

## 15. Next Gated Prompt

The next safe gated action is a unified Phase 29 specification. It should turn this planning brief into a precise implementation-oriented spec, decide whether a public profile migration/RLS addendum is needed, and keep browser notification/Elo carryover work bounded to Phase 29 stabilization.
