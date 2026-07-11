# Post-Phase-57 Deeper Functional-Shell Optimization Manual Review Checklist

**Status:** Ready for hosted/manual user review after the governed Review Candidate backup.
**Repository:** `brrrdle-dev` only.
**Created:** 2026-07-11.
**Evidence:** `planning/post-phase-57/CHANGELOG.md`, `planning/post-phase-57/DEEPER-SHELL-PERFORMANCE-BASELINE.md`, and `progress/PROGRESS-STEP-535.md`.

This checklist verifies loading and route ownership changes against the accepted Phase 57 preservation inventory. It does not replace automated verification.

## How To Use

Use disposable accounts and non-sensitive inputs. Check an item only after confirming it. If anything fails, record the exact browser, route, visible non-secret behavior, and repeatable steps; do not paste credentials, raw answers, account identifiers, or private payloads.

## Must Manually Verify

- [ ] **APP-01 / SUP-01 - Home and every main destination remain reachable.** Open Home, Solo, Multiplayer, Calendar, Market, History, Stats, Leaderboard, Words, Profile, Settings, Help, Feedback, and About. Expected: each selected surface loads in the existing shell with one coherent main area and working navigation.
- [ ] **GAME-11 - Home stays lightweight and answer-free.** Hard-refresh to Home and do not open a game. Expected: Home appears normally; no word-data loading/error panel or answer-like content appears.
- [ ] **GAME-03 / GAME-11 - Selected Practice lengths load on demand.** Open Practice OG at five letters, then another supported length such as seven; repeat in Practice GO. Expected: a brief compact preparation state is acceptable, then each game uses the selected length without stale data or a wrong-length board.
- [ ] **GAME-04 / GAME-11 - Daily OG and GO remain deterministic and playable.** Open both Daily Solo modes. Expected: five-letter boards load, valid guesses submit, GO advances normally, and no answer is exposed by loading/error text.
- [ ] **GAME-06 / GAME-07 / GAME-08 - Solo resume and completion survive deferred loading.** Resume active Practice and Daily OG/GO games, complete one, navigate away/back, and start a new Practice game. Expected: drafts, submitted rows, terminal screen, definitions, and superseding-game choice remain correct.
- [ ] **APP-02 / APP-03 - Refresh and browser history remain correct.** Navigate among lazy routes, use Back/Forward, then manually refresh. Expected: Back/Forward follows the current tab session; refresh returns Home; persisted games are available by explicit re-entry.
- [ ] **APP-06 - Loading states are accessible and stable.** Enter a not-yet-opened route or word length on a slower connection if available. Expected: compact loading text remains inside the content area, navigation stays usable, and controls do not overlap or shift incoherently.
- [ ] **MP-01 / MP-06 / MP-10 - Multiplayer preparation preserves all settings.** Create or accept Practice OG/GO games, including a private GO request at a non-default length. Expected: requested length, GO count, Hard Mode, and time control are retained and the created game opens normally.
- [ ] **MP-02 / MP-08 / MP-18 - Daily and ranked queues still work.** Open representative unranked Daily, ranked Daily, and ranked Practice flows with disposable accounts. Expected: queue/finalization, claim lanes, routing, and game entry behave as before.
- [ ] **MP-11 through MP-15 - Active, Lobby, Live, and spectator views remain current.** Open each multiplayer subtab and switch away/back between browser windows. Expected: no stale flash, missing rows, authorization message, lost selection, or spectator mutation control.
- [ ] **APP-08 / ACC-08 / ACC-13 - Marketplace and consumables remain authoritative.** Buy and use both tools in Solo Practice. Expected: coin/inventory counts agree across HUD and Market; Reveal and Remove effects persist; Daily and Multiplayer remain consumable-free.
- [ ] **ACC-01 through ACC-05 - Account surfaces load normally.** Open account menu, Profile, Settings, and a public profile on desktop and mobile. Expected: sign-in/account actions, name policy, menus, preferences, and private-match actions remain available and contained.
- [ ] **ACC-09 through ACC-12 - Data routes retain content.** Open History, Stats, Leaderboard, Calendar, and Words after representative activity. Expected: existing records, provenance labels, public metadata, past-Daily state, and word search remain intact.
- [ ] **APP-04 / APP-05 - 390px scrolling remains smooth and contained.** On mobile Firefox or another 390px-class browser, scroll Home and the longest game/settings routes, type and submit a physical/on-screen guess, and use back-to-top. Expected: no horizontal overflow, clipping, blocking overlay, or unsolicited auto-scroll.

## Optional Nice-To-Check

- [ ] Open several routes for the first time on a throttled connection, then revisit them. Expected: first entry may show compact loading; warm revisits should feel immediate.
- [ ] Go offline only after opening a representative five-letter game, then revisit supported cached content. Expected: previously cached assets remain usable where the existing service worker supports them; never-loaded assets may show the explicit retryable error rather than selecting substitute data.
- [ ] Review keyboard-only focus through navigation, route loading, dialogs, and game controls.

## Preserved Invariants To Spot-Check

- [ ] Guest and signed-in Solo histories remain isolated according to the accepted transfer rules.
- [ ] Definitions, final green rows, GO transitions, sounds, rewards, Elo, and private/public identity boundaries are unchanged.
- [ ] Private-request notifications and the request center remain fresh after focus/refocus despite polling intentionally remaining unchanged.
- [ ] No raw answer, email, user id, private game projection, or admin data appears in a loading/error state.

## Known Deferred / Not In Scope

- Phase 58 design direction, concepts, `design.md`, component/stack decisions, and GPT-5.6 SOL handoff remain deferred until this candidate is accepted.
- No framework, component library, dependency, backend, migration, polling architecture, or visual redesign was introduced.
- Further private-request polling consolidation remains deferred because current consumers intentionally have different limits and responsibilities.

## Review Result

- [ ] Every required item above passes in the hosted Review Candidate.
- [ ] Any failed item has exact non-secret reproduction steps and a bounded same-stage follow-up before acceptance.
- [ ] I approve this optimized functional shell for Final Acceptance and checkpointing.
