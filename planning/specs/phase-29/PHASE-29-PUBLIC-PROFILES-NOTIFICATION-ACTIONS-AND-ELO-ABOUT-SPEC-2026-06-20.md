# Phase 29 Public Profiles, Notification Actions, And Elo About Specification

**Status**: Unified Phase 29 specification for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-20.
**Authority**: Current user authorization, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, Phase 28 completion artifacts, `planning/phase-29/PLANNING-BRIEF.md`, current roadmap surfaces, and the current progress ledger.

This file does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, pull requests, merges, releases, branch deletion, Phase 29 implementation, Phase 30 implementation, public leaderboards, public/guest spectation, service workers, push infrastructure, new custom skills, force-push, secret printing, or work in the original stable `brrrdle` repository.

## 1. Purpose

Phase 29 introduces privacy-safe public player profile foundations while carrying forward tightly scoped Phase 28 stabilization work for notifications and Elo transparency.

The phase should deliver:

1. An explicit public-safe player identity foundation that can later support Phase 30 leaderboards.
2. A conservative profile visibility model that does not expose private Supabase auth metadata.
3. Browser notification diagnosis and click routing through existing dashboard action targets.
4. Notification Center action cleanup, including a top-level `Mark all read` control.
5. Relocation and expansion of long Elo transparency copy into the About tab.

Phase 29 is not a leaderboard, public spectator, rematch, theme, push-notification, or gameplay-rule phase.

## 2. Current-State Findings

Existing account profile editing lives in `src/account/ProfilePanel.tsx`, `src/account/profile.ts`, and `src/account/auth.ts`. It validates display name, accent color, and optional avatar URL, then saves those values to Supabase `auth.users.user_metadata` through `supabase.auth.updateUser(...)`. That metadata is useful for the signed-in account UI, but it is not a public profile contract.

Existing avatar uploads are optional and use a public `avatars` Storage bucket when configured. Phase 29 must make public visibility clear because a public avatar URL may be player-visible outside private account settings if the player opts into a public profile.

Existing Notification Center items are created from dashboard action targets. In-app activation calls `activateNotificationItem(...)`, marks the item read, and dispatches through `dispatchDashboardAction(...)`, which already knows how to navigate routes, solo subtabs, multiplayer subtabs, selected solo games, selected multiplayer games, and history filters.

Existing browser notifications are created by `dispatchBrowserNotification(...)` in `src/notifications/browserNotifications.ts`. The helper builds a privacy-redacted payload and instantiates `new Notification(...)`, but it does not retain the Notification object or attach an `onclick` bridge. Clicking a browser notification can focus the browser, but the app has no durable handler to route to the matching dashboard action target.

Existing notification metadata stores `readAt` and `dismissedAt` separately. Read-but-not-dismissed items can remain available to counts or optional read views, while dismissed items are hidden by the view model. The current UI does not expose a useful read-history or archive workflow, so the two visible actions feel redundant.

Existing long Elo copy appears in ranked multiplayer surfaces. The About tab exists in `src/app/App.tsx` as `AboutBrrrdlePanel`, but it does not yet contain ranked/Elo documentation. `docs/ranked-multiplayer.md` already explains the Phase 27 Elo model and should remain aligned with any About copy.

Phase 28 completed authenticated Live spectator stabilization. Phase 29 must preserve fast active-visible Live refresh, current Daily spectator exclusion, focused read-only spectation, sanitized terminal hold behavior, and the no public/guest spectation boundary.

## 3. Goals

- Add a public profile foundation that exposes only allow-listed public identity fields.
- Keep profile visibility conservative by default: no user becomes publicly visible merely because they have an account.
- Provide a future-safe identity link target for Phase 30 leaderboards without exposing raw auth ids.
- Preserve existing private profile editing and account sync behavior.
- Diagnose Chrome foreground browser notification behavior under real browser permission/site-setting conditions.
- Route browser notification clicks to the same app targets used by in-app notification activation when the app page context is alive.
- Keep notifications local, foreground-only, and no-push unless a later phase explicitly authorizes service workers or push infrastructure.
- Add `Mark all read` near the top of the Notification Center.
- Simplify `Mark read` versus `Dismiss` so the primary user action is obvious.
- Move long Elo explanation into the About tab, add compact links from ranked surfaces, and keep the Phase 27 Elo model unchanged.

## 4. In Scope

- Public profile data model specification, including public-safe fields, visibility, identity link keys, and migration/RLS gates.
- Owner-controlled public profile editing and private/public preview behavior once implementation is authorized.
- A future-safe public profile display surface, but not leaderboard aggregation or ranking pages.
- Chrome browser notification reproduction and browser/site-setting diagnosis.
- Browser notification click routing for foreground Notification API instances created while the app page context is alive.
- Notification Center `Mark all read` and action simplification.
- About-tab Elo section, About navigation/focus behavior, and compact ranked-surface link/button copy.
- Focused tests and privacy probes once implementation is separately authorized.
- Documentation updates for Supabase/profile/RLS and ranked/Elo copy if implementation changes require them.

## 5. Out Of Scope

- Public leaderboards, leaderboard routes, leaderboard APIs, or public ranking pages.
- Public/guest spectation or unauthenticated spectator discovery.
- Multiplayer rematch, same-settings play-again, same-settings search-again, or postgame mutual-intent flows.
- Service workers, push subscriptions, background push, cross-device notification delivery, or deployment configuration.
- Changes to the Phase 27 Elo model, K factors, provisional window, expected-score formula, settlement authority, rating transaction rules, or ranked eligibility.
- New gameplay rules, scoring changes, Daily ranked, timed ranked Practice, or new ranked match types.
- Direct exposure of existing Supabase auth metadata as public profile data.
- Supabase migration creation or execution before a separate migration/RLS addendum and execution authorization.
- Theme proposal modernization or concrete theme implementation.
- Deployment, release, commits, pushes, PR creation, merges, branch deletion, or Phase 30 implementation.

## 6. Required Invariants

- Daily Multiplayer remains strictly asynchronous, five-letter, UTC-day keyed, no-clock, no Daily Hard Mode lobby control, answer-separated, and claim-safe.
- Current Daily Multiplayer answer leakage through spectator views remains prevented.
- Practice Multiplayer Hard Mode and time-limit behavior remain unchanged unless later explicitly approved.
- Ranked Practice v1 remains the only ranked match type unless later explicitly approved.
- Daily ranked and timed Practice ranked remain deferred.
- Match points and Elo/rank movement remain separate.
- Live v1 spectator behavior remains read-only.
- Public/guest spectation remains unavailable unless a later approved phase explicitly implements sanitized public projections.
- Existing scoring, timeout, forfeit, rating/Elo, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, and Practice 2-35 word-length behavior remain unchanged.
- Notification state, profile state, About copy, and dashboard route state must not become gameplay authority.
- Browser clients must not directly write rating profiles, rating transactions, trusted settlement state, Daily claims, or profile projection authority outside the approved owner profile path.

## 7. Public Profile Requirements

Phase 29 must create a new public-safe identity boundary instead of making `auth.users.user_metadata` public.

Default product decision:

- public profiles are opt-in;
- a signed-in account begins private;
- a player can preview their own public profile data before enabling public visibility;
- only a strict allow-list is public when visibility is public;
- hidden/private profiles should resolve to a non-revealing unavailable state, not private account details.

Recommended public profile projection fields:

- opaque public profile id, not the raw auth user id;
- optional slug only if the implementation can make uniqueness, normalization, and reserved-word handling safe;
- visibility status: at minimum `private` and `public`;
- display name, using the existing normalization rules or stricter public-profile rules;
- initials or generated avatar fallback;
- avatar URL only if explicitly chosen and safely validated;
- accent color from the existing allow-list;
- optional flair slug from an allow-list;
- optional short bio with strict length limits, plain text only, and no rendered HTML;
- created and updated timestamps;
- future-safe moderation/status field if the migration addendum chooses to reserve it.

Forbidden public profile data:

- raw auth emails;
- raw Supabase auth ids;
- private account metadata;
- app metadata and roles;
- tokens, sessions, service ids, or local session artifacts;
- private progress snapshots, local storage payloads, stats history, economy data, settings, or sync status;
- raw ranked profiles, raw rating transactions, private leaderboard-ready projections, match ids, transaction ids, settlement ids, or queue ids;
- answers, seeds, serialized sessions, player sessions, raw game projections, Daily claim internals, or answer-bearing move/session data.

Public profile links should use an opaque public profile id or safe slug, never a raw auth id. Phase 29 may create route foundations for profile viewing, but Phase 30 remains responsible for leaderboard pages and leaderboard/profile integration.

## 8. Public Profile Data And Privacy Requirements

Any public profile persistence must be behind a separately authorized migration/RLS stage.

Preferred migration shape:

- create one additive public profile table or public-safe projection table;
- keep `user_id` private and never expose it in public DTOs;
- generate a distinct public identifier;
- require owner-only insert/update/delete or owner-only visibility changes;
- expose public rows only through an allow-listed SELECT policy, view, or RPC;
- use authenticated security-definer RPCs for validated writes if that is safer than direct table writes;
- keep raw `profiles`, `progress_snapshots`, `settings`, `game_history`, ranked private projections, and auth metadata private.

Public read scope must be explicit in the Stage 29.2 addendum. The recommended first public implementation may allow unauthenticated reads of only `visibility='public'` allow-listed profile projection rows because this is a public profile phase. If the addendum chooses authenticated-only read as a safer first step, it must explain how Phase 30 leaderboards will later broaden that safely.

Required privacy probes for any migration:

- anon cannot read private profile rows;
- anon can read only allow-listed fields for explicitly public profiles if public reads are enabled;
- authenticated non-owner cannot read private profile rows;
- authenticated non-owner cannot read raw auth ids, emails, private metadata, private progress, raw ranked rows, answers, seeds, sessions, or local artifacts;
- owner can create/update only their own public profile projection;
- owner cannot impersonate another user id or public profile id;
- invalid display names, bios, avatar URLs, flair values, or accent values are rejected or normalized;
- visibility changes take effect without exposing stale private data;
- profile reads do not grant any gameplay, spectator, leaderboard, rating, claim, or notification authority.

## 9. Browser Notification Requirements

Phase 29 should stabilize browser notification behavior only within the existing foreground/no-push architecture.

Required diagnosis:

- test Chrome with permission `granted`, Settings browser notifications enabled, in-app notifications enabled, and eligible notification events;
- distinguish app dispatch issues from Chrome site permission blocks, OS-level notification blocks, focus/visibility behavior, installed-app behavior, or no-service-worker/no-push limits;
- keep Safari behavior in scope for click-routing verification because Safari currently shows foreground notifications for the user.

Required click-routing behavior:

- browser notification payloads remain privacy-redacted;
- the click handler should focus the app window when possible;
- the click handler should route through the same dashboard action target used by in-app notification activation;
- the click handler should mark the item read using the existing local metadata path;
- multiplayer notification clicks should select route `multiplayer`, the correct subtab, and the selected multiplayer game when an action target exists;
- stale targets should fail gracefully by focusing the closest safe route/subtab and showing existing empty/stale state;
- no private target data should be placed in the browser notification title/body/tag beyond existing redacted payload rules.

No service worker limitation:

- because Phase 29 does not add service workers or push infrastructure, click routing is only expected for foreground Notification objects created while the app page context is alive;
- if the browser or OS displays a notification after the page context has gone away, Phase 29 should not promise durable routing;
- Settings/About copy should be honest about local foreground behavior.

## 10. Notification Center Requirements

Phase 29 should make Notification Center actions easier to understand.

Required behavior:

- add a `Mark all read` control near the top of the panel when there is at least one unread eligible visible item;
- `Mark all read` marks all currently visible/eligible notification items read through local metadata only;
- `Mark all read` does not mutate gameplay, profile, ranking, Daily claims, Supabase authority, or remote notification state;
- keep `Open` as the route/action activation command;
- keep `Mark read` as the primary per-item cleanup command for unread items.

Default simplification decision:

- remove `Dismiss` from the primary per-item action row, or demote/rename it to a clearer secondary `Hide`/`Archive` affordance only if Stage 29.1 finds a genuine workflow that cannot be satisfied by read state;
- do not keep `Mark read` and `Dismiss` side by side with unclear semantics;
- if a hide/archive action remains, copy must explain that it hides the item locally until its source changes.

Read/dismiss metadata may remain internally separate for backward compatibility. Phase 29 is allowed to simplify the visible UI without deleting old metadata support.

## 11. Elo And About Requirements

Phase 29 should move long Elo transparency out of ranked multiplayer surfaces and into the About tab.

Required behavior:

- add a dedicated About section for ranked Practice v1 and Elo;
- expand the explanation beyond the current short copy;
- define K factor in plain language as the multiplier that controls how much a rating can move after a result;
- define the 10-game provisional window and why K=40 moves faster during that period;
- define established K=24;
- explain the standard 400-point expected-score curve;
- explain win/draw/loss scores of 1/0.5/0;
- explain that each ranked bucket starts at 1200;
- explain rating buckets by mode and current ranked Practice v1 boundaries;
- explain that match points decide the game result first, while trusted settlement moves Elo afterward;
- state that Daily ranked and timed Practice ranked remain deferred;
- state that public leaderboards are Phase 30, not Phase 29.

Required ranked-surface behavior:

- remove or shorten the long inline Elo explanation in ranked multiplayer setup/stats surfaces;
- preserve concise ranked eligibility and trusted settlement copy;
- add a compact link/button such as `How is Elo calculated?`;
- route that link/button to the About tab Elo section and focus or scroll to the section where practical;
- keep `docs/ranked-multiplayer.md` aligned with About copy.

Do not change `src/multiplayer/rating.ts` constants or formulas except for non-behavioral exports/comments if implementation later proves necessary. Any Elo behavior change is out of Phase 29.

## 12. Migration And RLS Constraints

This specification does not authorize migration creation or execution.

Stage 29.2 is expected to be required because public profile foundations need persistence and RLS that existing private auth metadata does not provide. Stage 29.1 may still confirm the exact shape before addendum drafting.

Any Phase 29 profile migration/RLS addendum must define:

- exact table/RPC/view names;
- exact public/private field allow-list;
- exact visibility defaults;
- owner write/update semantics;
- public read scope;
- grants;
- indexes;
- rollback plan;
- non-printing privacy probes;
- whether avatar URLs are public, private, or disabled for first implementation;
- how future Phase 30 leaderboards can reference public profiles without exposing raw auth ids.

Do not add migrations for notification click routing, Notification Center cleanup, or About/Elo relocation unless a blocker proves a database change is required and the user separately authorizes a new addendum.

## 13. Likely Files And Modules

Likely profile surfaces:

- `src/account/ProfilePanel.tsx`
- `src/account/profile.ts`
- `src/account/auth.ts`
- `src/account/sync.ts`
- `src/account/storageSchema.ts`
- `src/account/Settings.tsx`
- future public profile repository/view-model/component files
- `docs/supabase.md`
- future `supabase/migrations/` files only after explicit migration authorization

Likely notification surfaces:

- `src/app/App.tsx`
- `src/dashboard/dashboardActions.ts`
- `src/notifications/NotificationCenter.tsx`
- `src/notifications/notificationActions.ts`
- `src/notifications/notificationStorage.ts`
- `src/notifications/notificationViewModels.ts`
- `src/notifications/browserNotifications.ts`

Likely About/Elo surfaces:

- `src/app/App.tsx`
- `src/app/routes.ts`
- `src/multiplayer/MultiplayerPanel.tsx`
- `src/multiplayer/MultiplayerStatsPanel.tsx`
- `src/multiplayer/rating.ts` as source-of-truth reference only
- `docs/ranked-multiplayer.md`

Likely tests:

- account/profile helper and component tests;
- notification storage/actions/view-model/browser dispatch/center tests;
- dashboard action routing tests;
- App/About navigation tests if present or added;
- ranked multiplayer copy tests;
- focused browser smoke for Chrome/Safari notification behavior if Stage 29 implementation changes visible notification behavior.

## 14. Recommended Stage Breakdown

### Stage 29.0 - Implementation Plan Approval And Protected Baseline

- Confirm repository state and preserve existing uncommitted Phase 29 planning/spec/progress artifacts.
- Create Stage 29.0 progress records.
- Run baseline verification and resource/process checks.
- Do not edit source/runtime code.

### Stage 29.1 - Profile, Notification, And Elo Reproduction/Audit

- Audit account/profile metadata, avatar storage assumptions, profile route needs, notification action targets, browser notification behavior, About tab structure, and ranked Elo copy locations.
- Reproduce Chrome browser notification behavior with permission/settings enabled.
- Reproduce Safari browser notification click behavior and missing route/subtab/game handoff.
- Confirm Notification Center read/dismiss behavior and whether read history/archive is useful.
- Decide exact profile migration/RLS addendum shape.
- Do not implement product fixes.

### Stage 29.2 - Public Profile Migration/RLS Addendum Planning

- Create a precise addendum under `planning/specs/phase-29/`.
- Define the public profile table/RPC/view contract, visibility defaults, grants, rollback, and privacy probes.
- Do not create or run SQL.

### Stage 29.3 - Public Profile Migration/RLS Execution

- Execute only after explicit migration authorization.
- Create one additive migration if the addendum is approved.
- Apply only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous.
- Run non-printing privacy probes.
- Stop before app implementation if probes fail.

### Stage 29.4 - Public Profile App Foundations

- Implement public profile domain/view-model/repository/component support using the approved migration/RLS contract.
- Add profile visibility controls and clear public/private copy.
- Preserve existing private account profile editing and avatar fallback behavior.
- Add future-safe public profile links or route foundations without leaderboards.

### Stage 29.5 - Notification Action And Center Cleanup

- Stabilize Chrome/browser notification diagnostics and copy.
- Add browser notification click handling through existing action targets where the app page context is alive.
- Add `Mark all read`.
- Simplify `Mark read` versus `Dismiss`.
- Preserve no-service-worker/no-push boundaries.

### Stage 29.6 - About Elo Transparency Relocation

- Move long Elo explanation to About.
- Add compact ranked-surface link/button to the About Elo section.
- Keep ranked copy concise.
- Keep docs and About copy aligned.
- Do not change Elo behavior.

### Stage 29.7 - Final Hardening And Handoff

- Review profile privacy, notification routing, About copy, tests, docs, and progress.
- Run focused tests first, then final verification gates defined by the implementation plan.
- Prepare Phase 29 changelog and handoff evidence.

## 15. Detailed Success Criteria

Phase 29 is successful when:

- public profile data is served only through a public-safe allow-list;
- default profile visibility is private or otherwise conservative enough that no existing account is unexpectedly public;
- public profile links do not expose raw auth ids;
- owner updates cannot mutate another user's public profile;
- non-owners cannot read private profile rows or forbidden fields;
- public profile foundations can later support Phase 30 leaderboards without changing rating authority;
- Chrome browser notification behavior is reproduced, classified, and fixed where app-side foreground behavior is responsible;
- browser notification clicks focus the app and route through existing dashboard action targets when a live page context can handle them;
- Notification Center includes top-level `Mark all read`;
- `Mark read` and `Dismiss` no longer appear as redundant primary actions;
- long Elo copy lives in About, ranked surfaces are compact, and the About Elo link works;
- the Phase 27 Elo model, Phase 28 Live spectator behavior, Daily Multiplayer integrity, ranked Practice v1, and all gameplay rules remain unchanged.

## 16. Verification Strategy

Planning-only stages:

- `git diff --check`
- Python CSV shape check using `python3 -S`
- `git status --short --branch`

Profile implementation verification should include:

- pure public profile normalization tests;
- profile visibility tests;
- owner/non-owner repository tests or RLS probes where applicable;
- component tests for profile editing, preview, visibility copy, and public profile view;
- privacy scans for raw emails, raw auth ids, private metadata, answers, seeds, raw sessions, and private ranked projections.

Notification implementation verification should include:

- browser notification dispatch tests with mocked Notification objects and `onclick`;
- route/subtab/selected-game click-routing tests;
- Chrome/Safari browser smoke when practical;
- Notification Center tests for `Mark all read`, read counts, and simplified/demoted hide/archive behavior.

Elo/About verification should include:

- rendered About section tests;
- ranked-surface link/button tests;
- docs/copy review against `src/multiplayer/rating.ts` constants and `docs/ranked-multiplayer.md`;
- regression checks that no Elo constants or settlement behavior changed.

Final Phase 29 verification should include the commands selected by the implementation plan, expected to include:

- focused changed-area tests;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- `git diff --check`;
- progress CSV shape check using `python3 -S`;
- non-printing secret/artifact checks;
- watched-port/process cleanup checks;
- `npm run test:e2e` or targeted browser smoke if route/profile/notification browser behavior changes warrant it.

## 17. Risks And Mitigations

- **Profile privacy leakage**: use a new allow-listed public projection, not raw auth metadata.
- **Unexpected public exposure**: default to private/opt-in and add clear visibility copy.
- **Avatar visibility confusion**: explain when avatar URLs are public and keep initials/flair as safe fallbacks.
- **Bio abuse**: keep bios short, plain text, sanitized, and easy to disable if necessary.
- **Slug complexity**: prefer opaque public ids unless slug uniqueness/reserved-word handling is clearly specified.
- **Browser notification variability**: separate app dispatch bugs from Chrome/Safari/OS permission limits.
- **Notification click stale targets**: route gracefully to the nearest safe route/subtab when a specific game no longer exists.
- **Notification action confusion**: simplify visible controls rather than preserving two unclear buttons.
- **Elo copy drift**: treat `rating.ts` and `docs/ranked-multiplayer.md` as source references; avoid duplicate inconsistent formulas.
- **Scope creep**: keep public leaderboards, public/guest spectation, rematch flows, push infrastructure, and themes outside Phase 29.

## 18. Open Decisions

- Should Phase 29 public profile reads be available to unauthenticated visitors for opted-in profiles, or should first implementation be authenticated-only with a later public broadening before Phase 30?
- Should Phase 29 ship optional bios immediately or reserve the column/field while shipping display name, avatar/accent, and visibility first?
- Should profile links use only opaque public ids, or also support user-facing slugs?
- Should public avatar URLs be enabled for opted-in profiles in Phase 29, or should the first pass prefer initials/flair until moderation/storage semantics are clearer?
- Should a hide/archive action remain in Notification Center after simplifying `Dismiss`, and if so where should it live?
- What exact About navigation mechanism should implementation use: route hash, app state scroll target, focus ref, or a dedicated About subview?

## 19. Next Gated Action

The next safe action is a detailed Phase 29 implementation plan.

That implementation plan should:

- turn this spec into stage-by-stage deliverables;
- decide the exact Stage 29.0 baseline gate;
- treat Stage 29.2 migration/RLS addendum planning as expected unless Stage 29.1 proves a safer no-migration route;
- identify high-conflict files and sequencing;
- define focused tests and final gates per stage;
- generate the next prompt package for Stage 29.0 baseline only.

Do not begin Phase 29 implementation from this specification alone.
