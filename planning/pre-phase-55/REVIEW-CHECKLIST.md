# Pre-Phase-55 Functional Shell Manual Review Checklist

**Status:** Review Candidate. Automated verification is clean; user acceptance is pending.
**Inventory source:** `planning/handoffs/PRE-PHASE-55-FUNCTIONALITY-PRESERVATION-INVENTORY-2026-07-09.md`

Use a hosted Review Candidate after the separately authorized backup. Test at least one desktop browser and one mobile browser. Do not mark shell acceptance until all applicable items pass or a same-phase follow-up is recorded.

## Application Shell

- [ ] `APP-01` All primary routes remain reachable and show the correct H1/content.
- [ ] `APP-02` Manual refresh returns Home; persisted games remain available after re-entry.
- [ ] `APP-03` Browser Back/Forward and in-app navigation do not corrupt route or game state.
- [ ] `APP-04` Desktop, tablet, and mobile have no horizontal overflow, clipped controls, or blocked menus.
- [ ] `APP-05` Long-page manual scrolling is responsive; ordinary game entry does not auto-scroll.
- [ ] `APP-06` Keyboard navigation, focus outlines, dialogs, tooltips, status, and controls remain usable.
- [ ] `APP-07` Focus Mode is reversible and does not hide required routes or game controls.
- [ ] `APP-08` Progression HUD values/countdowns remain readable and Open Stats routes correctly.
- [ ] `APP-09` Notifications, account menu, dialogs, and menus fit and dismiss predictably.
- [ ] `APP-10` Refresh/update/PWA behavior remains non-blocking.
- [ ] `APP-11` The retired decorative stage is absent; the neutral shell is acceptable as a redesign foundation.

## Solo, Game, Data, And Definitions

- [ ] `GAME-01` Practice/Daily OG input, validation, colors, Hard Mode, attempts, win, and loss work.
- [ ] `GAME-02` Practice/Daily GO chain advancement, prior answers, transitions, Hard Mode, and completion work.
- [ ] `GAME-03` Practice lengths and settings remain configurable without changing Daily behavior.
- [ ] `GAME-04` Current and eligible past Daily Solo entry remains deterministic and date-correct.
- [ ] `GAME-05` Guest progress stays local and separate from signed-in cloud history.
- [ ] `GAME-06` Signed-in valid guesses, paid continuation, completion, and new-game decisions persist promptly.
- [ ] `GAME-07` Starting a new Practice game does not resurrect the completed prior game.
- [ ] `GAME-08` Final green row, end screen, definitions, and GO transition survive re-entry.
- [ ] `GAME-09` Draft, invalid, submitted, correct/present/absent, solved, transition, and completion feedback is perceivable.
- [ ] `GAME-10` Sound preferences and representative gameplay/notification sounds remain correct.
- [ ] `GAME-11` Word data loads and error/offline states do not expose answers.
- [ ] `GAME-12` Definitions/fallback search work and GO does not duplicate the final definition.
- [ ] `GAME-13` Share output is accurate and privacy-safe.

## Account, Progression, History, And Settings

- [ ] `ACC-01` Create account, sign in, sign out, restore, reset password, and auth errors remain usable.
- [ ] `ACC-02` The single public player name and character validation remain correct.
- [ ] `ACC-03` Avatar/accent/account badge fit mobile and desktop and remain privacy-safe.
- [ ] `ACC-04` Public profiles expose sanctioned metadata and return to the correct source.
- [ ] `ACC-05` Settings, notifications, sound, account management, and Danger Zone boundaries remain correct.
- [ ] `ACC-06` Switching disposable accounts does not expose another account's local state.
- [ ] `ACC-07` Automatic sync, status, and manual recovery remain available.
- [ ] `ACC-08` Coins, XP, level, consumables, and pay-to-continue remain deterministic/idempotent.
- [ ] `ACC-09` History shows accurate retained Solo/multiplayer records.
- [ ] `ACC-10` Calendar current/past Daily access and purchase state route correctly.
- [ ] `ACC-11` Private Stats provenance, Solo, multiplayer, progression, and aggregate summaries remain clear.
- [ ] `ACC-12` Public site stats and leaderboard/rating metadata remain privacy-safe.

## Multiplayer And Spectation

- [ ] `MP-01` Practice OG/GO create, join, alternate turns, persist, resume, complete, and clean up.
- [ ] `MP-02` Daily OG/GO remains UTC-keyed, asynchronous, claim-safe, and free of Practice-only controls.
- [ ] `MP-03` Each participant's canonical board remains player-owned.
- [ ] `MP-04` Shared rows/keyboard evidence synchronize without replaying settled animations on input.
- [ ] `MP-05` GO solved rows, transitions, prior answers, final definitions, and turn ownership synchronize.
- [ ] `MP-06` Practice Hard Mode, settings, and time controls remain enforced.
- [ ] `MP-07` Cancel, forfeit, timeout, normal completion, winner, and status precedence remain correct.
- [ ] `MP-08` Ranked Practice FIFO matchmaking supports repeat opponents and routes both clients.
- [ ] `MP-09` Rating, bands, scoring, and settlement remain unchanged.
- [ ] `MP-10` Private Practice request settings/lifecycle/first-turn persistence remain correct.
- [ ] `MP-11` Active Games shows owned games, turn cues, resume, status, and allowed profile link.
- [ ] `MP-12` Lobby create/join/cancel works without broader identity exposure.
- [ ] `MP-13` Live status and participant-only identity links remain correct.
- [ ] `MP-14` Signed-in and public spectators remain read-only and privacy-safe.
- [ ] `MP-15` Switching tabs/windows does not flash stale lists or reset state.
- [ ] `MP-16` Notifications route to the intended game/request.
- [ ] `MP-17` Postgame rematch/search actions preserve eligibility, state, and privacy.

## Supporting Surfaces

- [ ] `SUP-01` Home summaries and quick actions route correctly.
- [ ] `SUP-02` Word Explorer loads/searches sanctioned data and handles missing entries.
- [ ] `SUP-03` Help and About remain reachable and accurate.
- [ ] `SUP-04` Feedback prepares the intended GitHub issue handoff without private state.
- [ ] `SUP-05` Admin views remain access-controlled and refresh only when authorized.
- [ ] `SUP-06` Data refresh/update failure states remain visible without blocking gameplay.

## Acceptance

- [ ] No gameplay, persistence, privacy, progression, multiplayer, or route regression was found.
- [ ] The neutral shell is acceptable as the protected foundation for later design work.
- [ ] Any finding is recorded as a same-phase follow-up before shell acceptance/checkpointing.
