# Progress Step Report — Phase 20.0

## Step
- **Major step / phase**: Phase 20.0 — Critical sign-out button fix
- **Implementation-plan reference**: `AGENT-IMPLEMENTATION-PLAN.md` §25.2, §25.5, §25.6
- **Report file**: `progress/PROGRESS-STEP-56.md`
- **Date updated**: 2026-05-31
- **Status**: Completed — awaiting explicit user approval before any Phase 20 layout variant.

## Summary
Fixed the required Phase 20.0 sign-out bug before layout exploration. Users who click Sign out after authentication now hit a hardened sign-out path: successful sign-out clears the authenticated UI state and closes auth/profile surfaces; provider errors or thrown/network failures show a safe user-facing message instead of appearing to do nothing.

No Phase 20 layout variant, UI redesign, game-logic change, word-list filtering, monetization change, merge, preview, or deployment action was performed in this step.

## Files Changed
- `src/account/auth.ts`
  - Added a `sign-out` error classification path.
  - Hardened `signOut` to catch Supabase provider errors and thrown failures, returning safe messages.
- `src/app/App.tsx`
  - Clears stale auth/profile messages before sign-out.
  - Prevents concurrent auth actions from starting another sign-out.
  - Keeps the profile panel open on failure so the error remains visible.
  - On success, explicitly sets auth state to anonymous and closes auth/profile surfaces.
  - Does not reset guest progress, settings, history, stats, coins, or resume state.
- `src/account/auth.test.ts`
  - Added tests for successful `auth.signOut`, provider-error fallback, and thrown/network failure handling.
- `CHANGELOG.md`
  - Added the Phase 20.0 entry.
- `progress/PROGRESS.csv`
  - Appended `phase_id = 56`.
- `progress/PROGRESS-STEP-56.md`
  - Created this report.

## Verification
- Focused auth tests: `npm run test -- src/account/auth.test.ts` — **27/27 passing**.
- `npm run lint` — clean.
- `npm run test` — **324/324 passing**.
- `npm run build` — clean; existing Vite chunk-size advisory remains.
- `npx tsc -p tsconfig.api.json --noEmit` — clean.
- `git diff --check` — clean.

## Skipped Checks
- Live signed-in Supabase browser smoke was not run because this local environment has no configured Supabase credentials or authenticated session. The sign-out helper and app sign-out path were verified with focused unit tests and code-path review.

## Preserved Invariants
- No layout variant started.
- No gameplay mechanics changed.
- No word-list filtering changed.
- No daily/practice constraints changed.
- No auth credential, service-role, or secret handling changed.
- Guest progress and local persisted data are not reset by sign-out.

## Next Step
Halt here. The next authorized step may begin Phase 20.1: one single layout variant, with preview-before-commit and explicit user feedback before any merge or further variant work.

## User Action Required
Provide explicit approval to proceed to the first Phase 20 layout variant.
