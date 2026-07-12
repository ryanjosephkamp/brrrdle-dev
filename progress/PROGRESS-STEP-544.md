# Progress Step 544 - Ranked Multiplayer Same-Tab Hard-Refresh Recovery

**Status:** Completed - Review Candidate prepared for governed backup and hosted/manual review.
**Date:** 2026-07-11.
**Protected baseline:** `e7c42284aa23e98d985d8569f6f262c60c58a0fa` from PR #68.

## Summary

Replaced the false-positive second-page ranked discovery proof with real two-context UI matchmaking and `page.reload()` on the actual matched participant page. The corrected harness reproduced the hosted empty interval when the participant repository read was delayed beyond five seconds even though the same account's progress projection had already synced.

PR #68's empty-until-authoritative selector was the measured boundary. The smallest repair allows authenticated progress loaded for the current account to render its Multiplayer projection provisionally while that account's repository is pending. Once the repository publishes, the existing explicit same-user authority continues to preserve the repository snapshot and later progress hydration cannot replace it.

## Implementation

- Updated the pure scoped-progress selector and deterministic tests for provisional current-account state, cross-account replacement, and permanent repository precedence.
- Added real same-tab ranked Practice and Daily OG/GO E2E across Overview, mode tab, Active Games, and Live with an eight-second participant-read delay and five-second visibility budget.
- Added reusable Daily navigation/match-type E2E actions and a dedicated Chromium/Firefox/WebKit recovery config.
- Added an optional process-scoped protected-preview access hook for disposable contexts; no share URL or credential is persisted.
- Repaired the existing selected unranked Daily join fallback so refresh-to-Home reopens the exact lobby before seeking the game-surface join control.
- Added a bounded three-attempt Auth-user deletion retry; persistent failure still stops cleanup and requires a zero-residue proof.

## Verification

- TDD: three selector expectations failed before the source change; all six selector tests passed after it.
- Ranked Practice: five consecutive Chromium passes per mode (10 total), plus Firefox OG/GO and WebKit OG/GO.
- Ranked Daily: Chromium OG/GO plus Firefox OG/GO and WebKit OG/GO.
- Local production build: all four Practice/Daily OG/GO same-tab scenarios passed.
- Non-production Vercel preview: all four scenarios passed; deployment is `READY`, target `preview`, and was not promoted.
- `npm run lint` passed.
- Full unit suite passed 144 files / 1,018 tests.
- `npm run build` and `npx tsc -p tsconfig.api.json --noEmit` passed locally.
- Complete authority-enabled Playwright passed 83/83 with one worker in the final fresh run.
- Two existing-suite failures were classified before the final clean run: the Daily selected-join fallback was deterministically repaired; a request-center block UI miss passed exact retry; an Auth deletion error led to bounded cleanup retry hardening.
- Final focused stale-cleanup execution passed and removed the one orphaned temporary user from the earlier deletion failure.
- Exact local/remote migration history remains 39/39.
- Spectator function hashes remain `546ad763742d56de9dfea2dcf63e436d` and `79330949c8ef878ed78e439954d23661`.
- Temporary E2E Auth users and public profiles are both zero.

## Preview

Temporary Review Candidate proof URL: `https://brrrdle-a4rdkoy7k-ryanjosephkamps-projects.vercel.app`.

The preview is protected, short-lived evidence only. It is not production and no deployment configuration or production alias changed.

## Next Step

Use the ignored recovered Review Candidate GitHub Backup prompt. Stage only its exact allowlist, complete the governed backup workflow, and keep post-Phase-57 optimization/recovery open for hosted manual review. The ranked manual checklist item must remain unchecked until the user repeats the actual same-tab refresh sequence on the hosted Review Candidate.

## Boundaries

No migration, RPC, RLS, schema, Supabase application-state change, dependency/framework change, gameplay, queue, claim, Elo/rating, economy, production deployment/promotion, Git/GitHub action, Phase 58 work, or stable `brrrdle` work was performed.
