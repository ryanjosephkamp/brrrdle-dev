# Progress Step Report — Phase 19.2

## Step
- **Major step / phase**: Phase 19.2 — Configurable Go Puzzle Count
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §24.4, §24.10 (sub-phase 19.2)
- **Report file**: `progress/PROGRESS-STEP-49.md`
- **Date updated**: 2026-05-30
- **Status**: Completed — contiguous execution (Prompt 3 authorized); proceeding to Phase 19.3

## Summary of Changes
Made the go chain length user-configurable (5, 7, or 10 linked puzzles) with a per-game override and a global default, defaulting to the historical value of 5 so existing behavior is reproduced exactly. **Chain length is independent of word length** — daily go puzzles remain exactly 5 letters at every count, preserving the daily 5-letter lock.

- **`src/game/constants.ts`** — added the `GoPuzzleCount` type, `GO_PUZZLE_COUNTS = [5, 7, 10]`, `DEFAULT_GO_PUZZLE_COUNT = 5`, and the `isGoPuzzleCount`/`normalizeGoPuzzleCount` guards. The legacy `GO_PUZZLE_COUNT` (= 5) alias is retained so existing imports/tests stay valid.
- **`src/game/go/session.ts`** — `selectAnswerSequence`, `createDailyGoSetup`, and `createPracticeGoSetup` accept `puzzleCount: GoPuzzleCount = DEFAULT_GO_PUZZLE_COUNT`; last-puzzle detection now derives from `puzzles.length` (count-agnostic). Carry-over pre-fills and prior-answer tracking generalize to any count.
- **`src/account/storageSchema.ts`** — added `goPuzzleCountDefault: GoPuzzleCount` to `GuestSettingsState`, `createDefaultGuestSettings`, and `normalizeGuestSettings` (backfilled to 5 for older payloads). Bumped `GUEST_PROGRESS_SCHEMA_VERSION` 2 → 3.
- **`src/account/guestStorage.ts`** — `isGuestProgressState` accepts schema versions 1, 2, and 3 so older saves migrate cleanly.
- **`src/app/games/CustomizeMenu.tsx` / `GoGame.tsx`** — optional per-game Go-count selector (5/7/10) that locks once the first guess is submitted, mirroring the difficulty control; count-aware UI copy.
- **`src/account/Settings.tsx` / `src/app/App.tsx`** — global "Default go chain length" selector in the Gameplay panel; the default flows into daily and practice go via the route wiring and `PracticeGameSwitcher`.
- **New tests**: `src/game/go/session.test.ts` — daily chains of 5/7/10 (distinct answers, all 5-letter), full-chain win for a non-5 count, and practice chain length. `src/account/guestStorage.test.ts` — v1→v3 migration backfills `goPuzzleCountDefault = 5`; schema-version expectations updated 2 → 3.

## Files Changed
- `src/game/constants.ts`, `src/game/go/session.ts`, `src/game/go/session.test.ts`
- `src/account/storageSchema.ts`, `src/account/guestStorage.ts`, `src/account/guestStorage.test.ts`
- `src/account/Settings.tsx`
- `src/app/games/CustomizeMenu.tsx`, `src/app/games/GoGame.tsx`, `src/app/App.tsx`
- `CHANGELOG.md`, `progress/PROGRESS.csv`, `progress/PROGRESS-STEP-49.md`

## Verification
- `npm run lint` — clean.
- `npm run test` — **300/300** (298 prior + 4 new go-session tests; migration test extended in place).
- `npm run build` — clean (chunk-size warning pre-existing; no new dependency).
- `npx tsc -p tsconfig.api.json --noEmit` — clean.
- Client-bundle leak check — no `@vercel/blob` or `service_role` in `dist/assets/*.js`.
- `git diff --check` — clean.

## Blockers, Errors, or Critical Notes
- None. Schema bumped 2 → 3 with a backfilled default; all prior versions still migrate. The bumped settings field syncs to Supabase automatically via `normalizeGuestSettings`/`mergeGuestProgressIntoCloud`.

## User Action Required Before Next Step
- None required mid-Prompt-3 (contiguous execution authorized). Final review/merge gate at Phase 19.6.

## Authorization to Proceed
- **Safe/authorized to proceed to next sub-phase?**: Yes — contiguous execution authorized by the user (Prompt 3). Halt remains required before any production release (CONSTITUTION §4).
- **Next major step**: Phase 19.3 — Resume Most-Recent Game.

## Additional Notes / Annotations
- Invariants intact: **daily 5-letter lock preserved** (count ≠ word length; daily go stays 5 letters at 5/7/10); practice 2–35; valid guesses identical across tiers; default Expert; default go count 5 reproduces current behavior; `getTileStates`/Hard Mode untouched. No secrets in any changed artifact.
