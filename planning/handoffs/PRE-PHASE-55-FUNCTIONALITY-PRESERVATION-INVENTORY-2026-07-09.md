# Pre-Phase-55 Functionality Preservation Inventory - 2026-07-09

**Status:** Planning baseline for the functional-shell program. No implementation authorization.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev` only.
**Protected baseline:** Phase 54 closure commit `cc6a1e600a7e330140366d2ba2ab95fd1da11a75`, tag `phase-54-golden-2026-07-09`.

## Purpose

This inventory defines the behavior that a minimal shell and later GPT-5.6 SOL frontend rebuild must preserve. It is a contract map, not a claim that every item has dedicated browser automation today. Missing anchors are explicit work items for the characterization stage.

Presentation labels:

- **Functional:** exact behavior or perceivable feedback must remain, although visual styling may change.
- **Semantic:** accessible structure, state, and action must remain; exact composition and copy may change carefully.
- **Cosmetic:** current visual treatment is replaceable after confirming it does not carry state or accessibility meaning.

Sensitivity labels:

- **Public:** intentionally public or anonymous data.
- **Account:** authenticated user data or account-scoped state.
- **Protected:** auth, private game, administrative, or server-authoritative data that must not be exposed.

## A. Application Shell, Navigation, And Platform

| ID | Capability to preserve | Primary repository evidence | Automated anchor | Manual anchor | Sensitivity | Presentation |
| --- | --- | --- | --- | --- | --- | --- |
| APP-01 | All current product routes remain reachable: Home, Solo, Calendar, Multiplayer, History, Leaderboard, Words, Profile, public profile, Feedback, Definitions, Stats, Help, Settings, About, and authorized Admin. | `src/app/routes.ts`, `src/app/App.tsx`, `src/ui/Navigation.tsx` | `src/app/routes.test.ts`, `src/app/navigationState.test.ts` | Route-by-route desktop/mobile checklist | Mixed | Semantic |
| APP-02 | Manual browser refresh returns to Home while preserving persisted game state for later re-entry. | `src/app/browserNavigationHistory.ts`, `src/app/navigationState.ts`, `src/app/App.tsx` | `e2e/navigation/refresh-route-persistence.spec.ts` | Refresh from representative routes, then reopen games | Account | Functional |
| APP-03 | Browser Back/Forward and explicit in-app navigation do not corrupt game or route state. | `src/app/browserNavigationHistory.ts`, `src/app/App.tsx` | `src/app/browserNavigationHistory.test.ts`, Solo re-entry E2E | Back/Forward through Solo, Multiplayer, Profile | Mixed | Functional |
| APP-04 | Mobile and desktop layouts avoid horizontal overflow, clipped menus, inaccessible controls, and blocking fixed elements. | `src/index.css`, `src/account/AccountBadge.tsx`, `src/app/BackToTopButton.tsx` | `e2e/layout/mobile-scroll.spec.ts`, component tests | 390px, tablet, and desktop review | Public | Functional |
| APP-05 | Manual scrolling remains responsive; auto-scroll occurs only for explicit game routing or narrowly justified gameplay events. | `src/app/gameplayAutoCenter.ts`, `src/index.css`, multiplayer surfaces | `src/app/gameplayAutoCenter.test.ts`, `e2e/layout/mobile-scroll.spec.ts` | Long-page mobile scroll and route entry | Public | Functional |
| APP-06 | Keyboard navigation, visible focus, dialogs, tooltips, status messages, and controls remain accessible. | `src/ui/Button.tsx`, `Dialog.tsx`, `Tooltip.tsx`, `StatusState.tsx`, `ToastRegion.tsx` | Existing component tests; add shell-wide accessibility smoke | Keyboard-only and screen-reader-oriented review | Public | Functional |
| APP-07 | Focus Mode continues to reduce chrome without hiding required gameplay controls or state. | `src/app/App.tsx`, `src/app/attentionViewModels.ts` | `src/app/attentionViewModels.test.ts`, route/component tests | Toggle during Solo and Multiplayer | Account | Functional |
| APP-08 | Progression HUD remains actionable and routes to Stats with correct coin, XP, level, and Daily countdown information. | `src/app/ProgressionHud.tsx`, `src/app/progressionHudViewModel.ts` | `src/app/ProgressionHud.test.tsx` and view-model tests | HUD desktop/mobile and Stats routing | Account | Functional |
| APP-09 | Notification center, account menu, dialogs, and menus dismiss predictably without viewport spillover. | `src/notifications/NotificationCenter.tsx`, `src/account/AccountBadge.tsx`, shared dialog/UI | Component tests and mobile scroll E2E | Mobile menu and outside-click review | Account | Functional |
| APP-10 | PWA/service-worker registration remains non-blocking and does not change refresh or update behavior unexpectedly. | `src/pwa/registerServiceWorker.ts`, `src/main.tsx` | Build and browser smoke; add explicit registration smoke if changed | Install/update sanity check where supported | Public | Functional |
| APP-11 | Decorative command-center staging, glass, glow, gradients, heavy shadows, and ambient motion may be removed. | `src/app/LunarSignalStage.tsx`, `src/index.css`, `src/theme/` | Update presentation-only component assertions | Visual review only | Public | Cosmetic |

## B. Core Game, Solo, Data, And Definitions

| ID | Capability to preserve | Primary repository evidence | Automated anchor | Manual anchor | Sensitivity | Presentation |
| --- | --- | --- | --- | --- | --- | --- |
| GAME-01 | OG guess validation, duplicate-letter scoring, keyboard precedence, attempt limits, win/loss, and Hard Mode remain correct. | `src/game/session.ts`, `validation.ts`, `tileStates.ts`, `hardMode.ts` | Corresponding `src/game/*.test.ts` | Practice and Daily OG playthroughs | Public | Functional |
| GAME-02 | GO remains a five-puzzle transformation chain with correct advancement, prior-solution evidence, terminal completion, and Hard Mode behavior. | `src/game/go/`, `src/app/games/GoGame.tsx` | GO domain/component tests; Solo GO E2E | Practice and Daily GO full-chain review | Public | Functional |
| GAME-03 | Practice OG and GO support configured lengths and settings without changing Daily contracts. | `src/data/practiceLengthCoverage.test.ts`, `src/app/games/`, Practice seed modules | Fast coverage and Practice GO E2E | Multiple lengths/settings | Account | Functional |
| GAME-04 | Daily Solo remains deterministic for the intended local day and supports current/past Daily access rules. | `src/daily/`, `src/data/daily.ts`, `src/calendar/` | Daily cycle/clock/past-Daily tests and E2E | Daily rollover and Calendar entry | Account | Functional |
| GAME-05 | Guest Solo progress stays local and separate from signed-in cloud history; sign-in does not silently leak or merge state outside established transfer rules. | `src/account/guestStorage.ts`, `guestTransfer.ts`, `accountScopedProgress.ts` | Account/guest tests and Solo re-entry E2E | Guest, sign-in, sign-out matrix | Protected | Functional |
| GAME-06 | Signed-in Solo valid submissions, completion, paid continuation, and new-game decisions persist promptly to cloud state and resume correctly across refresh, navigation, and sign-in. | `src/account/soloCloudProgress.ts`, `autoProgressSync.ts`, `resumeSlot.ts`, game surfaces | Account persistence tests, `solo-completion-reentry.spec.ts`, Solo GO E2E | Cross-browser/account re-entry matrix | Protected | Functional |
| GAME-07 | Starting a new Practice game supersedes the active resume target without resurrecting a completed prior game. | `src/account/resumeSlot.ts`, Practice game surfaces | Resume-slot tests and Practice GO E2E | Complete, start new, refresh/re-enter | Account | Functional |
| GAME-08 | Completion screens, the final all-green row, definitions, and GO solved-row transition remain visible at the correct time and survive re-entry. | `src/account/soloCompletionDisplayStorage.ts`, OG/GO game surfaces | Completion-display tests and Solo completion E2E | Win, navigate away, return | Account | Functional |
| GAME-09 | Essential gameplay feedback remains perceivable: typed draft, invalid guess, submitted tile states, solved state, transition, and completion. | OG/GO game surfaces, shared keyboard/status UI | Component/domain tests | Keyboard/mouse/touch play | Public | Functional; exact animation cosmetic |
| GAME-10 | Sound settings and gameplay/notification cues remain opt-in, user-controlled, and triggered at correct events. | `src/sound/`, notification sound modules | Sound-engine and notification tests | Toggle and representative events | Account | Functional; audio asset style cosmetic |
| GAME-11 | Word lists load, validate, cache, refresh, and cover supported lengths without exposing puzzle answers. | `src/data/` | Data/cache/schema/repository tests | Representative offline/error state | Protected | Functional |
| GAME-12 | Definitions use the established source/fallback path and do not duplicate the final GO definition. | `src/definitions/`, OG/GO results surfaces | Definition service and Google-search tests; game component tests | OG/GO results with available/missing definitions | Public | Functional |
| GAME-13 | Sharing produces accurate, privacy-safe result text without exposing answers before allowed. | `src/game/share.ts`, `src/ui/ShareButton.tsx` | `src/game/share.test.ts` | Share won/lost OG/GO | Public | Functional |

## C. Account, Persistence, Progression, History, And Settings

| ID | Capability to preserve | Primary repository evidence | Automated anchor | Manual anchor | Sensitivity | Presentation |
| --- | --- | --- | --- | --- | --- | --- |
| ACC-01 | Email/password account creation, sign-in, sign-out, session restore, password reset, and auth error handling remain functional. | `src/account/auth.ts`, `AuthModal.tsx`, `AuthPanel.tsx`, `PasswordResetModal.tsx` | Auth/modal/panel tests | Disposable-account auth flow | Protected | Functional |
| ACC-02 | One public player name is used consistently; validation excludes unsupported emoji/special characters and preserves accepted names. | `src/account/profile.ts`, `ProfilePanel.tsx`, public profile modules | Profile component/domain tests | Save valid/invalid names | Account/Public | Functional |
| ACC-03 | Avatar/accent and account badge remain usable, responsive, and privacy-safe. | `src/account/AccountBadge.tsx`, profile/storage code | AccountBadge/Profile tests and mobile E2E | Mobile/desktop account menu | Account | Semantic |
| ACC-04 | Public profiles reveal only sanctioned public metadata and support correct return routing and eligible private-match actions. | `src/account/PublicProfilePage.tsx`, `publicProfile.ts`, private-match/rating metadata modules | Public-profile tests | Leaderboard/Live/Active profile navigation | Public/Protected | Functional |
| ACC-05 | Settings preserve notification, sound, account-management, and Danger Zone behavior with correct confirmation boundaries. | `src/account/Settings.tsx`, danger-zone and preference modules | Settings/danger-zone/notification tests | Settings review, destructive actions only in disposable account | Protected | Functional |
| ACC-06 | Local storage remains account-scoped, versioned, and migration-safe; users do not see another account's local state. | `src/account/storageSchema.ts`, scoped progress and sync modules | Storage/account-scope tests | Switch disposable accounts in one browser | Protected | Functional |
| ACC-07 | Sync status and manual recovery remain available without replacing immediate automatic persistence. | `src/account/sync.ts`, `syncStatus.ts`, `autoProgressSync.ts` | Sync tests | Offline/error/retry review | Account | Functional |
| ACC-08 | Coins, XP, level progression, consumables, and pay-to-continue remain deterministic and idempotent. | `src/progression/` | `src/progression/progression.test.ts` and completion regressions | Win/loss/continue review | Account | Functional |
| ACC-09 | History displays retained Solo and multiplayer records with accurate mode/result metadata and privacy boundaries. | `src/history/`, scoped progress/history sources | History workspace/view-model tests | History after representative games | Account | Functional |
| ACC-10 | Calendar exposes current and eligible past Dailies, purchase/access state, and routes to the selected game. | `src/calendar/`, `src/daily/pastDailies.ts` | Calendar and past-Daily tests | Current/past Daily navigation | Account | Functional |
| ACC-11 | Private Stats distinguish data provenance and preserve Solo, multiplayer, progression, and aggregate summaries. | `src/stats/`, `src/multiplayer/MultiplayerStatsPanel.tsx` | Stats dashboard/selectors/site-stats tests | Stats after representative activity | Account | Functional; chart styling cosmetic |
| ACC-12 | Public site stats and leaderboard/rating metadata remain privacy-safe, clearly labeled, and fresh enough for their current contract. | `src/stats/PublicSiteStatsPanel.tsx`, `src/leaderboards/` | Public stats/leaderboard tests | Signed-out and signed-in views | Public | Functional |

## D. Multiplayer, Competitive, Private, Live, And Spectation

| ID | Capability to preserve | Primary repository evidence | Automated anchor | Manual anchor | Sensitivity | Presentation |
| --- | --- | --- | --- | --- | --- | --- |
| MP-01 | Practice Multiplayer OG and GO create, join, alternate turns, persist first and later turns, resume, complete, and clean up correctly. | `src/multiplayer/multiplayer.ts`, repository, game surface/panel | Practice OG/GO E2E and multiplayer tests | Two-account Practice play | Protected | Functional |
| MP-02 | Daily Multiplayer OG and GO remain asynchronous, five-letter, UTC-day keyed, answer-separated, claim-safe, and free of Practice-only clock/Hard Mode controls. | `src/multiplayer/dailyMultiplayer.ts`, repository, panel | Daily OG/GO E2E and daily tests | Two-account Daily flow | Protected | Functional |
| MP-03 | Canonical per-player sessions remain authoritative; rival moves are display projections and do not overwrite player-owned state. | `src/multiplayer/multiplayer.ts`, repository, game surface | Multiplayer domain/repository/component tests | Two-client board comparison | Protected | Functional |
| MP-04 | Shared submitted rows and keyboard evidence appear consistently to both participants without replaying completed animations on every input. | Multiplayer game surface/view models | Component tests and multiplayer E2E | Two-client turn review | Protected | Functional; exact flip animation cosmetic |
| MP-05 | GO solved-row holds, transitions, prior solutions, final definitions, and continued turn ownership synchronize across both clients. | Multiplayer domain/game surface | Practice/Daily GO E2E | Two-client full GO chain | Protected | Functional |
| MP-06 | Hard Mode, configured Practice settings, and optional time controls are enforced according to the canonical game contract. | Multiplayer domain, custom games, game surface | Domain tests and Practice E2E | Hard Mode/timed match | Protected | Functional |
| MP-07 | Forfeit, cancel, timeout, normal completion, winner precedence, and status text remain correct and idempotent. | Multiplayer domain/repository/scoring | Multiplayer/reliability E2E and domain tests | Forfeit before/after guess; timeout | Protected | Functional |
| MP-08 | Ranked Practice FIFO matchmaking permits repeat opponents, supports OG/GO compatibility, finalizes once, and routes both players to the match. | `src/multiplayer/matchmaking.ts`, ranked queue helper, repository, Phase 50 RPC migration | Queue fairness, panel, repository tests and E2E | Two/three-account queue sequences | Protected | Functional |
| MP-09 | Rating, rank bands, scoring, and settlement remain deterministic and are not changed by shell work. | `src/multiplayer/rating.ts`, `scoring.ts`, competitive modules | Rating/scoring/settlement tests | Ranked result and leaderboard review | Account/Public | Functional |
| MP-10 | Private Practice requests support eligible public profiles, OG/GO settings, inbox/outbox lifecycle, accept/decline/cancel, and first-turn persistence. | `src/multiplayer/privateMatchmaking.ts`, account private-match module, panel | Private matchmaking unit and E2E | Two-account request lifecycle | Protected | Functional |
| MP-11 | Active Games accurately lists participant-owned games, turn cues, status, resume action, and allowed opponent profile link. | `MultiplayerActiveGames.tsx`, identity/view models | Active Games tests | Multiple active games | Protected | Functional |
| MP-12 | Lobby accurately lists joinable public games, supports join/cancel rules, and does not broaden identity exposure. | `MultiplayerLobby.tsx`, repository projections | Lobby/repository tests and multiplayer E2E | Lobby create/join/cancel | Protected/Public projection | Functional |
| MP-13 | Live lists sanctioned games/status and preserves participant-only identity links where currently authorized. | `MultiplayerLive.tsx`, identity projections | Live component and spectator E2E | Participant and nonparticipant views | Protected/Public projection | Functional |
| MP-14 | Spectators remain read-only, receive sanitized projections and transitions, and cannot mutate games or access protected identity/answers. | Live spectator modules, repository, Supabase policies | `live-v1-spectator.spec.ts`, spectator tests | Signed-in/signed-out spectator review | Protected | Functional |
| MP-15 | Realtime refocus does not flash stale lists, reset current state, or generate avoidable authorization/console failures. | Multiplayer panel/repository subscriptions | Focus/refocus and reliability E2E | Switch windows/tabs during play | Protected | Functional |
| MP-16 | Notifications route directly to the intended multiplayer game/request and preserve current navigation behavior. | `src/notifications/notificationActions.ts`, App routing | Notification action/view-model tests | Notification click-through | Account | Functional |
| MP-17 | Postgame rematch/actions preserve eligibility, result state, and privacy boundaries. | `src/multiplayer/postgameActions.ts`, game surface | Postgame tests | Complete match and inspect actions | Protected | Functional |

## E. Supporting Product And Operational Surfaces

| ID | Capability to preserve | Primary repository evidence | Automated anchor | Manual anchor | Sensitivity | Presentation |
| --- | --- | --- | --- | --- | --- | --- |
| SUP-01 | Home summarizes actionable current state and routes to core product areas. | `src/dashboard/` | Dashboard tests | Guest/account Home review | Mixed | Semantic |
| SUP-02 | Word Explorer loads sanctioned word data and handles unavailable entries. | `src/wordExplorer/` | Word Explorer data tests | Search representative words | Public | Functional |
| SUP-03 | Help and About remain reachable and accurately separate instructions from product/rating explanation. | `src/help/`, `src/app/AboutBrrrdlePanel.tsx` | Help/About tests | Content and route review | Public | Semantic |
| SUP-04 | Feedback creates the intended GitHub issue handoff without leaking private state. | `src/feedback/`, `src/lib/githubIssue.ts` | GitHub issue tests | Inspect generated link without submission | Public | Functional |
| SUP-05 | Authorized Admin operational views and manual refresh controls remain access-controlled and non-public. | `src/admin/` | Admin authorization/dashboard/refresh tests | Authorized/unauthorized review | Protected | Functional |
| SUP-06 | Data refresh and update-status surfaces communicate failure without blocking gameplay. | `src/data/refresh.ts`, `refreshStore.ts`, `updateCheck.ts` | Data refresh/update tests | Simulated failure state | Public | Functional |

## F. Cross-Cutting Preservation Rules

1. Do not change Supabase schemas, RPCs, RLS, storage, settlement, or remote state merely to simplify the frontend.
2. Do not weaken tests to make a shell pass. Replace only assertions that encode presentation already classified as cosmetic; retain behavioral and accessibility assertions.
3. Do not expose raw answers, auth identifiers, private game payloads, account-scoped progress, or administrative data in UI, logs, screenshots, or handoffs.
4. Keep essential gameplay feedback perceivable even if animation duration, easing, glow, shadow, and decorative staging are removed.
5. Treat a route or capability without dedicated E2E coverage as a characterization gap, not as permission to remove it.
6. Require full automated verification and a comprehensive interactive manual checklist before calling the shell functionally equivalent.

## Characterization Gaps To Close Before Or During Shell Work

- Add dedicated browser solve/re-entry coverage for Solo Practice OG and Solo Daily OG; current coverage is stronger for GO and shared completion re-entry.
- Add a broad route-availability and no-horizontal-overflow smoke matrix for guest and authenticated states.
- Add shell-focused accessibility checks for dialogs, menus, tabs, keyboard operation, visible focus, and live/status regions.
- Capture repeatable bundle and mobile-scroll baselines before presentation changes so improvement claims are evidence-based.
- Inventory component tests that assert exact decorative copy/class names/timing and tag them as behavioral, semantic, or cosmetic before updating them.
