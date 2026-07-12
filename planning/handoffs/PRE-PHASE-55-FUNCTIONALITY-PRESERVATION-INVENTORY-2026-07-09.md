# Functionality Preservation Inventory - Refreshed After Phase 57

**Status:** Current accepted preservation contract, mapped through post-Phase-57 Final Acceptance.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev` only.
**Originally created:** 2026-07-09.
**Refreshed:** 2026-07-11.
**Protected baseline:** Phase 57 remains protected by `phase-57-golden-2026-07-11`; `post-phase-57-optimized-shell-golden-2026-07-12` supersedes it as the Phase 58 design baseline.

## Purpose

This inventory defines the behavior that deeper-shell optimization, Phase 58 design work, and the later GPT-5.6 SOL frontend rebuild must preserve. It is a contract map, not permission to remove anything lacking a dedicated browser scenario. The refresh reconciles every original row with current repository paths and adds accepted Phase 55 ranked Daily, Phase 56 private-request management, and Phase 57 Marketplace/economy/consumable behavior.

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
| APP-01 | All current product routes remain reachable: Home, Solo, Calendar, Multiplayer, Marketplace, History, Leaderboard, Words, Profile, public profile, Feedback, Definitions, Stats, Help, Settings, About, and authorized Admin. | `src/app/routes.ts`, `src/app/App.tsx`, `src/ui/Navigation.tsx` | `src/app/routes.test.ts`, `src/app/navigationState.test.ts`, functional-shell route E2E | Route-by-route desktop/mobile checklist | Mixed | Semantic |
| APP-02 | Manual browser refresh returns to Home while preserving persisted game state for later re-entry. | `src/app/browserNavigationHistory.ts`, `src/app/navigationState.ts`, `src/app/App.tsx` | `e2e/navigation/refresh-route-persistence.spec.ts` | Refresh from representative routes, then reopen games | Account | Functional |
| APP-03 | Browser Back/Forward and explicit in-app navigation do not corrupt game or route state. | `src/app/browserNavigationHistory.ts`, `src/app/App.tsx` | `src/app/browserNavigationHistory.test.ts`, Solo re-entry E2E | Back/Forward through Solo, Multiplayer, Profile | Mixed | Functional |
| APP-04 | Mobile and desktop layouts avoid horizontal overflow, clipped menus, inaccessible controls, and blocking fixed elements. | `src/index.css`, `src/account/AccountBadge.tsx`, `src/app/BackToTopButton.tsx` | `e2e/layout/mobile-scroll.spec.ts`, component tests | 390px, tablet, and desktop review | Public | Functional |
| APP-05 | Manual scrolling remains responsive; auto-scroll occurs only for explicit game routing or narrowly justified gameplay events. | `src/app/gameplayAutoCenter.ts`, `src/index.css`, multiplayer surfaces | `src/app/gameplayAutoCenter.test.ts`, `e2e/layout/mobile-scroll.spec.ts` | Long-page mobile scroll and route entry | Public | Functional |
| APP-06 | Keyboard navigation, visible focus, dialogs, tooltips, status messages, and controls remain accessible. | `src/ui/Button.tsx`, `Dialog.tsx`, `Tooltip.tsx`, `StatusState.tsx`, `ToastRegion.tsx` | Shared component tests and `e2e/layout/functional-shell-accessibility.spec.ts` | Keyboard-only and screen-reader-oriented review | Public | Functional |
| APP-07 | Focus Mode continues to reduce chrome without hiding required gameplay controls or state. | `src/app/App.tsx`, `src/app/attentionViewModels.ts` | `src/app/attentionViewModels.test.ts`, route/component tests | Toggle during Solo and Multiplayer | Account | Functional |
| APP-08 | Progression HUD remains actionable and routes to Stats with correct coin, XP, level, and Daily countdown information; Marketplace displays the same authoritative coin state. | `src/app/ProgressionHud.tsx`, `src/app/progressionHudViewModel.ts`, `src/marketplace/MarketplacePanel.tsx` | HUD/view-model tests, Marketplace tests, Phase 57 E2E | HUD/Marketplace desktop and mobile review | Account | Functional |
| APP-09 | Notification center, account menu, dialogs, private-request lifecycle actions, and menus dismiss and route predictably without viewport spillover or replaying unchanged notices. | `src/notifications/NotificationCenter.tsx`, `src/notifications/notificationViewModels.ts`, `src/account/AccountBadge.tsx`, shared dialog/UI | Notification component/view-model tests, Phase 56 E2E, mobile scroll E2E | Mobile menu, request action, and outside-click review | Account | Functional |
| APP-10 | PWA/service-worker registration remains non-blocking and does not change refresh or update behavior unexpectedly. | `src/pwa/registerServiceWorker.ts`, `src/main.tsx` | Build and browser smoke; add explicit registration smoke if changed | Install/update sanity check where supported | Public | Functional |
| APP-11 | Decorative command-center staging, glass, glow, gradients, heavy shadows, and ambient motion may be removed. | `src/app/LunarSignalStage.tsx`, `src/index.css`, `src/theme/` | Update presentation-only component assertions | Visual review only | Public | Cosmetic |

## B. Core Game, Solo, Data, And Definitions

| ID | Capability to preserve | Primary repository evidence | Automated anchor | Manual anchor | Sensitivity | Presentation |
| --- | --- | --- | --- | --- | --- | --- |
| GAME-01 | OG guess validation, duplicate-letter scoring, keyboard precedence, attempt limits, win/loss, and Hard Mode remain correct. | `src/game/session.ts`, `validation.ts`, `tileStates.ts`, `hardMode.ts` | Corresponding `src/game/*.test.ts` | Practice and Daily OG playthroughs | Public | Functional |
| GAME-02 | GO remains a chained transformation game with correct configured puzzle count where allowed, fixed canonical Daily count, advancement, prior-solution evidence, terminal completion, and Hard Mode behavior. | `src/game/go/`, `src/app/games/GoGame.tsx`, `src/game/constants.ts` | GO domain/component tests; Solo GO E2E | Practice and Daily GO full-chain review | Public | Functional |
| GAME-03 | Practice OG and GO support configured word lengths, difficulty, Hard Mode, and supported GO counts without changing fixed Daily contracts. | `src/data/practiceLengthCoverage.test.ts`, `src/app/games/`, Practice seed modules | Fast coverage and Practice OG/GO E2E | Multiple lengths/settings | Account | Functional |
| GAME-04 | Daily Solo remains deterministic for the intended local day and supports current/past Daily access rules. | `src/daily/`, `src/data/daily.ts`, `src/calendar/` | Daily cycle/clock/past-Daily tests and E2E | Daily rollover and Calendar entry | Account | Functional |
| GAME-05 | Guest Solo progress stays local and separate from signed-in cloud history; sign-in does not silently leak or merge state outside established transfer rules. | `src/account/guestStorage.ts`, `guestTransfer.ts`, `accountScopedProgress.ts` | Account/guest tests and Solo re-entry E2E | Guest, sign-in, sign-out matrix | Protected | Functional |
| GAME-06 | Signed-in Solo valid submissions, completion, paid continuation, new-game decisions, inventory use, and private puzzle-scoped consumable effects persist promptly and resume correctly across refresh, navigation, fresh browser, and sign-in. | `src/account/soloCloudProgress.ts`, `src/account/autoProgressSync.ts`, `src/account/resumeSlot.ts`, OG/GO game surfaces | Account persistence tests, completion re-entry E2E, Phase 57 authenticated E2E | Cross-browser/account re-entry and consumable matrix | Protected | Functional |
| GAME-07 | Starting a new Practice game supersedes the active resume target without resurrecting a completed prior game. | `src/account/resumeSlot.ts`, Practice game surfaces | Resume-slot tests and Practice GO E2E | Complete, start new, refresh/re-enter | Account | Functional |
| GAME-08 | Completion screens, the final all-green row, definitions, and GO solved-row transition remain visible at the correct time and survive re-entry. | `src/account/soloCompletionDisplayStorage.ts`, OG/GO game surfaces | Completion-display tests and Solo completion E2E | Win, navigate away, return | Account | Functional |
| GAME-09 | Essential gameplay feedback remains perceivable: typed draft, invalid guess, submitted tile states, locked-green Reveal tiles, removed-key state, solved state, transition, and completion. | OG/GO game surfaces, `src/ui/Keyboard.tsx`, `src/marketplace/PracticeConsumableControls.tsx` | Game/keyboard/economy component and domain tests; Phase 57 E2E | Keyboard/mouse/touch Practice play with and without consumables | Account | Functional; exact animation cosmetic |
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
| ACC-05 | Settings preserve notification, private-request opt-out, request-notification preference, player blocking, sound, account-management, and Danger Zone behavior with correct confirmation boundaries. | `src/account/Settings.tsx`, notification preference modules, private-request repository actions | Settings, notification, Phase 56 repository/contract tests | Settings review, block/unblock with disposable accounts, destructive actions only in disposable account | Protected | Functional |
| ACC-06 | Local storage remains account-scoped, versioned, and migration-safe; users do not see another account's local state. | `src/account/storageSchema.ts`, scoped progress and sync modules | Storage/account-scope tests | Switch disposable accounts in one browser | Protected | Functional |
| ACC-07 | Sync status and manual recovery remain available without replacing immediate automatic persistence or authoritative signed-in economy commands. | `src/account/sync.ts`, `src/account/syncStatus.ts`, `src/account/autoProgressSync.ts`, `src/account/economyRepository.ts` | Sync and economy repository tests | Offline/error/retry plus fresh-browser economy hydration | Account | Functional |
| ACC-08 | Coins, XP, level progression, Pay-to-Continue, past-Daily spending, Marketplace purchases, and consumable use remain deterministic, revision-aware, fixed-price, serialized, and idempotent. Stale browser state cannot resurrect spent coins or inventory. | `src/progression/economy.ts`, `src/progression/consumables.ts`, `src/account/economyRepository.ts`, `src/account/guestStorage.ts` | Economy/progression/repository/migration-contract tests and Phase 57 authenticated E2E | Purchase/use/reload/cross-browser/insufficient-funds review | Protected | Functional |
| ACC-09 | History displays retained Solo and multiplayer records with accurate mode/result metadata and privacy boundaries. | `src/history/`, scoped progress/history sources | History workspace/view-model tests | History after representative games | Account | Functional |
| ACC-10 | Calendar exposes current and eligible past Dailies, purchase/access state, and routes to the selected game. | `src/calendar/`, `src/daily/pastDailies.ts` | Calendar and past-Daily tests | Current/past Daily navigation | Account | Functional |
| ACC-11 | Private Stats distinguish data provenance and preserve Solo, multiplayer, progression, and aggregate summaries. | `src/stats/`, `src/multiplayer/MultiplayerStatsPanel.tsx` | Stats dashboard/selectors/site-stats tests | Stats after representative activity | Account | Functional; chart styling cosmetic |
| ACC-12 | Public site stats and leaderboard/rating metadata remain privacy-safe, clearly labeled, and fresh enough for their current contract. | `src/stats/PublicSiteStatsPanel.tsx`, `src/leaderboards/` | Public stats/leaderboard tests | Signed-out and signed-in views | Public | Functional |
| ACC-13 | Marketplace sells only Reveal One Letter for 25 coins and Remove Incorrect Letters for 40 coins, displays authoritative owned counts, handles pending/success/error/insufficient-funds states, and never exposes private operation data. | `src/marketplace/`, `src/progression/consumables.ts`, `src/account/economyRepository.ts` | Marketplace/economy tests and Phase 57 guest/authenticated E2E | Guest and signed-in purchase matrix at desktop/390px | Account | Functional |

## D. Multiplayer, Competitive, Private, Live, And Spectation

| ID | Capability to preserve | Primary repository evidence | Automated anchor | Manual anchor | Sensitivity | Presentation |
| --- | --- | --- | --- | --- | --- | --- |
| MP-01 | Practice Multiplayer OG and GO create, join, alternate turns, persist first and later turns, resume, complete, and clean up correctly. | `src/multiplayer/multiplayer.ts`, repository, game surface/panel | Practice OG/GO E2E and multiplayer tests | Two-account Practice play | Protected | Functional |
| MP-02 | Unranked Daily Multiplayer OG and GO remain asynchronous, five-letter, UTC-day keyed, answer-separated, claim-safe, no-clock, and free of Practice-only controls. Ranked Daily is a separate claim, queue, answer, and rating lane. | `src/multiplayer/dailyMultiplayer.ts`, `src/multiplayer/multiplayerRepository.ts`, panel | Daily OG/GO E2E and daily tests | Two-account unranked Daily flow plus ranked/unranked separation | Protected | Functional |
| MP-03 | Canonical per-player sessions remain authoritative; rival moves are display projections and do not overwrite player-owned state. | `src/multiplayer/multiplayer.ts`, repository, game surface | Multiplayer domain/repository/component tests | Two-client board comparison | Protected | Functional |
| MP-04 | Shared submitted rows and keyboard evidence appear consistently to both participants without replaying completed animations on every input. | Multiplayer game surface/view models | Component tests and multiplayer E2E | Two-client turn review | Protected | Functional; exact flip animation cosmetic |
| MP-05 | GO solved-row holds, transitions, prior solutions, final definitions, and continued turn ownership synchronize across both clients. | Multiplayer domain/game surface | Practice/Daily GO E2E | Two-client full GO chain | Protected | Functional |
| MP-06 | Hard Mode, configured Practice settings, and optional supported Practice time controls are enforced according to the canonical game contract. Ranked Daily permits only mode and Hard Mode while remaining fixed five-letter and no-clock. | Multiplayer domain, custom games, ranked queue helpers, game surface | Domain tests, Practice E2E, ranked Daily controls E2E | Hard Mode/timed Practice and ranked Daily Hard Mode review | Protected | Functional |
| MP-07 | Forfeit, cancel, timeout, normal completion, winner precedence, and status text remain correct and idempotent. | Multiplayer domain/repository/scoring | Multiplayer/reliability E2E and domain tests | Forfeit before/after guess; timeout | Protected | Functional |
| MP-08 | Ranked Practice FIFO matchmaking permits repeat opponents, supports OG/GO compatibility, finalizes once, and routes both players to the match. | `src/multiplayer/matchmaking.ts`, ranked queue helper, repository, Phase 50 RPC migration | Queue fairness, panel, repository tests and E2E | Two/three-account queue sequences | Protected | Functional |
| MP-09 | Rating, rank bands, scoring, and trusted settlement remain deterministic across ranked Practice and separate ranked Daily OG/GO buckets. Hard Mode does not create a separate leaderboard bucket. | `src/multiplayer/rating.ts`, `src/multiplayer/scoring.ts`, competitive modules, repository authority | Rating/scoring/settlement/migration-contract tests and ranked Daily E2E | Ranked Practice/Daily result and leaderboard review | Account/Public | Functional |
| MP-10 | Private Practice requests support eligible public profiles, OG/GO settings, incoming/outgoing views, newest-first status filtering, accept/decline/cancel/expire/create lifecycle, direct durable-game entry, and first-turn persistence. | `src/multiplayer/privateMatchmaking.ts`, `src/multiplayer/privateRequestCenter.ts`, repository, panel | Private matchmaking/request-center unit tests and Phase 56 E2E | Two-account full request lifecycle | Protected | Functional |
| MP-11 | Active Games accurately lists participant-owned games, turn cues, status, resume action, and allowed opponent profile link. | `MultiplayerActiveGames.tsx`, identity/view models | Active Games tests | Multiple active games | Protected | Functional |
| MP-12 | Lobby accurately lists joinable public games, supports join/cancel rules, and does not broaden identity exposure. | `MultiplayerLobby.tsx`, repository projections | Lobby/repository tests and multiplayer E2E | Lobby create/join/cancel | Protected/Public projection | Functional |
| MP-13 | Live lists sanctioned games/status and preserves participant-only identity links where currently authorized. | `MultiplayerLive.tsx`, identity projections | Live component and spectator E2E | Participant and nonparticipant views | Protected/Public projection | Functional |
| MP-14 | Spectators remain read-only, receive sanitized projections and transitions, and cannot mutate games or access protected identity/answers. | Live spectator modules, repository, Supabase policies | `live-v1-spectator.spec.ts`, spectator tests | Signed-in/signed-out spectator review | Protected | Functional |
| MP-15 | Realtime refocus does not flash stale lists, reset current state, or generate avoidable authorization/console failures. | Multiplayer panel/repository subscriptions | Focus/refocus and reliability E2E | Switch windows/tabs during play | Protected | Functional |
| MP-16 | Notifications project private-request lifecycle changes once, respect request-specific preferences, and route directly to the request center or exact created game while preserving current navigation behavior. | `src/notifications/notificationActions.ts`, `src/notifications/notificationViewModels.ts`, App routing | Notification action/preference/view-model tests and Phase 56 E2E | Notification lifecycle and click-through | Account | Functional |
| MP-17 | Postgame rematch/actions preserve eligibility, result state, and privacy boundaries. | `src/multiplayer/postgameActions.ts`, game surface | Postgame tests | Complete match and inspect actions | Protected | Functional |
| MP-18 | Ranked Daily OG and GO use independent authenticated FIFO queues, four independent Daily participation lanes, deterministic answer namespaces distinct from unranked Daily, server-authorized pair/action evidence, finalization/cleanup recovery, reload hydration, and public metadata without exposing answers or private projections. | `src/multiplayer/matchmaking.ts`, `src/multiplayer/multiplayerPanelRankedQueue.ts`, `src/multiplayer/multiplayerRepository.ts`, Phase 55 migrations | Matchmaking/repository/migration-contract tests and `e2e/gameplay/ranked-daily-controls.spec.ts` | Two-account ranked Daily OG/GO queue, play, reload, completion, and repeat queue | Protected | Functional |
| MP-19 | Private-request opt-out, directional blocking, requester-target-mode uniqueness, pair locking, active/recent anti-spam limits, participant-only visibility, and lifecycle mutations remain server-enforced. | `src/multiplayer/multiplayerRepository.ts`, `src/account/Settings.tsx`, Phase 56 migration | Phase 56 repository/migration-contract tests and request-center E2E | Opt-out, block/unblock, duplicate, reverse-direction, and limit review | Protected | Functional |
| MP-20 | After an authenticated same-tab refresh-to-Home, the current account's synced Multiplayer projection may display provisionally while its participant repository loads; explicit same-account repository authority supersedes it and cannot be overwritten by later progress hydration. Cross-account, guest, queue, claim, settlement, and write authority remain unchanged. | `src/app/scopedProgressMultiplayerState.ts`, `src/app/App.tsx` | Selector tests and ranked Practice/Daily OG/GO same-tab reload E2E | Reload an actual ranked participant page, re-enter Overview/mode/Active/Live within five seconds | Protected | Functional |

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
7. Consumables remain usable only in Solo Practice. Daily Solo and every ranked, unranked, private, Daily, Practice, Live, Lobby, and spectator multiplayer lane must stay consumable-free.
8. Optimization may change loading boundaries or presentation ownership, but it must not expose answers, weaken server authority, or make an offline/failed-load state silently select different puzzle data.

## Characterization Status And Current Optimization Gaps

Resolved since the original 2026-07-09 inventory:

- Dedicated Practice/Daily Solo OG solve, Home-on-refresh, and explicit re-entry coverage exists in `e2e/gameplay/solo-og.spec.ts` and the broader completion suite.
- Guest/auth route availability, 390px overflow, Focus recovery, account-menu containment, and shell accessibility are covered by the functional-shell and mobile-scroll E2E files.
- Phase 55-57 added real ranked Daily, private-request-center, Marketplace, guest consumable, and disposable-account authority/browser coverage.

Post-Phase-57 Review Candidate characterization:

- Per-length preparation now covers success, canonical validation, all lengths, concurrent deduplication, completed-cache reuse, failed-load retry, and answer-free errors.
- Cold Home browser coverage prevents word assets and route-presentation chunks from silently returning to startup; entering Daily Solo proves only length-5 assets load.
- Route boundaries preserve one main landmark, ordinary Back/Forward, Home-on-refresh, mobile fit, account controls, and a deterministic failure/retry-to-Home path.
- Signed-in focus/refocus tracing proved overlapping private-request reads, but the notification and request-center consumers have different row limits and responsibilities. Polling remains unchanged pending a separately justified shared-data contract.
- Countdown/reset and mobile scroll costs remain characterized and did not justify root-state restructuring.
- Phase 58 design work must preserve these loading/error boundaries unless replacement evidence proves equal or better transfer, accessibility, and behavior.
