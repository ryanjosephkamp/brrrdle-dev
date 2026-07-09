# Phase 54 Changelog - Live/Lobby Identity And Spectator-Adjacent Polish

**Status:** Hosted/manual review accepted; Final Acceptance Backup prompt prepared.
**Date:** 2026-07-09.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev` only.

## Summary

Phase 54 makes an authenticated participant's eligible opponent identity actionable in Active Games and Live without changing the current privacy contract. A participant can open the existing public profile only when the existing participant-scoped identity RPC already supplied a valid active public profile id. Returning from that profile restores Multiplayer and its selected subtab.

Lobby host labels and all authenticated/public spectator names remain display-only. Focused spectator routing and every existing read-only restriction remain intact.

## Implemented

- Added a validated internal participant public-profile target map that is separate from the display-only participant profile map.
- Projected an opponent public-profile target only into authenticated participant Active Games and Live rows.
- Added accessible `Open public profile for <name>` actions only when a valid opponent target exists; ids are callback-only and are not rendered in visible text, DOM attributes, or test ids.
- Preserved static fallback opponent labels when no active public profile target is available.
- Kept Lobby host labels static and preserved direct Join and Manage Lobby actions.
- Kept authenticated and public/guest spectator names static, capability flags false, focused read-only spectation, and Back to Live list behavior unchanged.
- Added a normalized `publicProfileReturnRoute` navigation field. Leaderboard profile opens keep returning to Leaderboard; Multiplayer participant opens return to the retained Multiplayer subtab.
- Added a contextual public-profile Back label without changing the public-profile data boundary.

## Tests Added Or Updated

- Added participant route-target, invalid-target, display-map separation, and spectator no-id coverage in `src/multiplayer/multiplayerViewModels.test.ts`.
- Added participant-link and static fallback coverage for Active Games and Live, plus Lobby no-link coverage.
- Added navigation/browser-history return-route normalization coverage and public-profile contextual Back-copy coverage.
- Extended the real two-client Live E2E scenario to open an opponent public profile, verify the existing public ranked Practice metadata surface, return to Live, and confirm authenticated and signed-out spectators have no profile controls.

## Verification

- Focused unit/component/navigation suite: 8 files / 67 tests passed.
- Focused Live spectator Playwright E2E: 1 test passed.
- `npm run lint` passed.
- `npm run test` passed: 131 files / 919 tests.
- `npm run test:e2e` passed: 58 tests.
  - The first full invocation lost its Playwright-owned local Vite server mid-run after an unrelated sign-in visibility failure, which caused later `ERR_CONNECTION_REFUSED` cascades.
  - The ranked Practice GO test passed in isolation. A full retry against an explicit loopback-only Vite server then passed all 58 tests.
- `npm run build` passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit` passed.
- Final documentation and repository hygiene checks are recorded in `progress/PROGRESS-STEP-514.md`.

## Boundaries Preserved

- No Supabase migration, RPC, RLS, grant, schema, table, storage, or remote-state work was performed.
- No Lobby visitor, authenticated spectator, or public/guest spectator receives a public-profile id or clickable player identity.
- No gameplay, Solo persistence, multiplayer persistence, Daily claim, reward, XP, coin, consumable, Pay-to-Continue, scoring, Elo, rating, ranked queue, or private Practice behavior changed.
- No Git/GitHub action, deployment, release, public tunneling, Phase 55+ work, minimal-shell preparation, UI toolkit adoption, image generation, unsafe credential/private-data handling, or original stable `brrrdle` repository work was performed.

## Manual Review Acceptance

- Review Candidate Backup completed through PR #53.
- The user completed the hosted/manual review on 2026-07-09 and reported that every checklist item passes.
- No direct Phase 54 bug, regression, or same-phase follow-up was reported.

## Next Step

Run the separately authorized Phase 54 Final Acceptance Closure and Backup prompt to record final acceptance and close Phase 54. After the closure commit is verified, prepare a separate Phase 54 Golden Checkpoint prompt to tag and release that exact closure state before any minimal-shell or GPT-5.6 handoff-preparation work begins.
