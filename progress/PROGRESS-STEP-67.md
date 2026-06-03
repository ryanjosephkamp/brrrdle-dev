# Progress Step Report — Phase 22 Addendum Full Execution (Calendar Central Daily Hub & Top Countdown)

## Step
- **Major step / phase**: Phase 22 Addendum — full autonomous execution (Calendar central daily hub, coin-gated past dailies, legacy daily-tab removal, top countdown positioning).
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §27.10 and `PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03.md`.
- **Report file**: `progress/PROGRESS-STEP-67.md`
- **Date updated**: 2026-06-03
- **Status**: Completed — awaiting explicit user review before creating the Phase 22 PR.

## User Decisions Applied (from the execution prompt)
1. **Past-daily coin cost**: fixed **60 coins** for any past daily (same for OG and GO).
2. **Streak semantics**: unlocked past dailies record full stats (wins, losses, guesses, per-length) but **never** retroactively affect or patch streak continuity. Streaks reflect natural current-day daily play only.
3. **Old dedicated OG/GO Daily tabs**: fully removed. The Calendar is the single source of truth for all daily play. Legacy `og-daily`/`go-daily` deep links gracefully redirect into the Calendar with the appropriate mode/day pre-selected (route patterns preserved for backward compatibility, but hidden from primary navigation).
4. **Calendar history depth**: fixed start date **January 1, 2025** (not a rolling window). Any daily from 2025-01-01 onward is selectable; earlier days are out of scope.

## Summary of Changes
The Calendar is now the first navigation tab and the central hub for all daily play (current + past, OG + GO). It surfaces prominent "Play Today's OG/GO" buttons, a month grid (clamped Jan 1 2025 → today) with per-day OG/GO completion and lock badges, OG/GO daily streak + coin readouts, a 60-coin unlock confirmation modal for locked past dailies, and renders the full OG/GO daily experience inline. Past dailies are full daily experiences (puzzle, persistence, stats, hard mode, resume, definitions); unlocking one costs 60 coins and "first guess = permanently unlocked". The daily countdown moved from the fixed bottom corner to the top of the UI (inside the account stack). All Phase 22 Prompt 2 behavior is preserved.

## Review Performed Before Changes
- Re-read `PHASE-22-ADDENDUM-CALENDAR-AND-COUNTDOWN-POSITIONING-2026-06-03.md` and `AGENT-IMPLEMENTATION-PLAN.md` §27.10.
- Re-read `CONSTITUTION.md` v3.3 (scope/invariants/progress-tracking rules).
- Studied the Phase 22 Prompt 2 `src/daily/` service, `DailyCountdown.tsx`, `App.tsx` routing/state, `OgGame.tsx`/`GoGame.tsx`, account storage (`storageSchema`, `guestStorage`, `guestTransfer`), stats (`statistics`, `types`), per-mode daily session storage, and `index.css` countdown styling.
- Confirmed a green baseline (`npm ci` then lint/test/build all pass; 370 tests) before editing.

## Files Added
- `src/daily/pastDailies.ts` (+ `src/daily/pastDailies.test.ts`) — `PAST_DAILY_UNLOCK_COST = 60`, `CALENDAR_START_DATE_KEY = '2025-01-01'`, `pastDailyKey`, `isDailyUnlocked`, `normalizeUnlockedDailies`, `isPastDailyDateKey`.
- `src/calendar/calendarModel.ts` (+ `calendarModel.test.ts`) — framework-agnostic month-grid builder (clamped between the fixed start and the granted today), per-mode completion derivation from `completedGameIds`, daily streak reader, month/date helpers.
- `src/calendar/CalendarPanel.tsx` (+ `CalendarPanel.test.tsx`) — the Calendar hub UI and inline daily launcher.
- `src/calendar/index.ts` — module barrel.

## Files Changed
- `src/daily/index.ts` — export the new past-daily helpers.
- `src/account/storageSchema.ts` — additive `unlockedDailies?: readonly string[]` on `GuestProgressState`; default `[]`.
- `src/account/guestStorage.ts` — migrate/normalize `unlockedDailies` on load.
- `src/account/guestTransfer.ts` — union-merge `unlockedDailies` in guest→cloud transfer.
- `src/stats/types.ts` — additive `affectsStreak?: boolean` on `CompletedGameStatsInput`.
- `src/stats/statistics.ts` — preserve `currentStreak`/`maxStreak` when `affectsStreak === false` (still record played/won/lost/attempts/per-length).
- `src/game/storage/dailyOgStorage.ts` / `dailyGoStorage.ts` — optional per-date storage keys (today keeps the bare key; past dailies namespace by date).
- `src/app/games/OgGame.tsx` / `GoGame.tsx` — accept `pastDailyDateKey` (render a specific past day as a full daily) and `onMarkDailyUnlocked` (fired on first guess); per-date persistence; `affectsStreak: false` for past dailies; skip resume capture for past days.
- `src/app/routes.ts` (+ `routes.test.ts`) — added the `calendar` route (first play tab) and a `hidden` flag; marked legacy `og-daily`/`go-daily` hidden; Calendar-first primary navigation.
- `src/app/App.tsx` — render `CalendarPanel` for `calendar`; `handleNavigate` redirects legacy daily routes into the Calendar with today's daily pre-launched; countdown tap + daily resume land in the Calendar; `unlockedDailies` update handler; pass `DailyCountdown` into `LunarSignalStage` (top) instead of the bottom overlay.
- `src/app/LunarSignalStage.tsx` — optional `dailyCountdown` node in the top account stack; `calendar` eyebrow.
- `src/index.css` — `.brrrdle-daily-countdown-region` from fixed bottom-corner to inline top-stack.
- `CHANGELOG.md`, `progress/PROGRESS.csv` (`phase_id = 67`), `progress/PROGRESS-STEP-67.md` — documentation/progress tracking.

## Preserved Invariants
- Daily puzzles remain exactly 5 letters; practice still supports 2–35.
- No multiplayer/marketplace changes; the only economy addition is the fixed 60-coin past-daily unlock cost.
- Guest and signed-in sync stay consistent (`unlockedDailies` is additive, migrated on load, and union-merged on transfer; no schema bump).
- All Phase 22 Prompt 2 daily-cycle behavior (local-midnight rollover, anti-gaming guard, reset alert + unique sound, Settings toggle, dev Simulate-Time tool) is intact.

## Additional Improvements / Notes
- The Calendar derives completion purely from existing daily `gameId`s (`og:daily:<date>` / `go:daily:<date>`), so completion badges work without any new persistence.
- Previously completed past dailies stay accessible without paying again (in addition to explicitly unlocked ones).
- The external launch request (countdown/resume/legacy redirect) is applied via the React-recommended render-time prop-change pattern (no cascading effect), satisfying the `react-hooks/set-state-in-effect` lint rule.

## Verification
- `npm run lint` — clean.
- `npm run test` — 390/390 (was 370; +20 new across pastDailies, calendarModel, CalendarPanel, statistics affectsStreak, per-date storage, routes).
- `npm run build` — succeeds.
- `tsc -b` — clean.
- `git diff --check` — clean.
- CodeQL scan — reviewed (see PR summary).

## Blockers, Errors, or Critical Notes
- None.

## Authorization to Proceed
- **Create the Phase 22 PR?**: No — halt for explicit user review first, per the execution prompt.
