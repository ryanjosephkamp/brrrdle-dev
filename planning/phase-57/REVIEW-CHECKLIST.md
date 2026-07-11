# Phase 57 Manual Review Checklist

**Status:** Accepted and closed after hosted manual review on 2026-07-11.

Automated refinement evidence includes 998 unit tests, build, lint, API typecheck, 16 focused domain/component tests, four guest browser scenarios, two disposable-account authority/browser scenarios, and a clean 74/74 authority-enabled Playwright run. The previously accepted exact 38/38 migration-history equality, unchanged catalog fingerprint, authority/privacy/concurrency probes, and zero-residue evidence remain unchanged because this follow-up made no migration or remote-contract change. The user completed the hosted checklist and reported that every item passes with no known regression.

## Marketplace

- [x] Marketplace appears in primary navigation and shows the current coin balance.
- [x] Reveal One Letter costs exactly 25 coins and increments only its owned count.
- [x] Remove Incorrect Letters costs exactly 40 coins and increments only its owned count.
- [x] Insufficient funds disable or reject purchase without changing coins or inventory.
- [x] Refresh and same-account sign-out/sign-in preserve authoritative coins and inventory without duplicate purchases.

## Solo Practice OG and GO

- [x] GO starts each puzzle with independent effects; using an item on one puzzle does not leak it into the next.
- [x] Refresh, navigation away/back, and same-account hydration preserve locked green cells, removed-key batches, and decremented inventory.
- [x] Remove Incorrect Letters may be used repeatedly; it removes all remaining eligible letters only when five or fewer remain and does not consume inventory when none remain.
- [x] Remove Incorrect Letters removes no more than five eligible wrong keyboard letters per use, never removes an answer letter, and rejects removed letters from both input paths.
- [x] Repeated Reveal uses preserve prior locked cells; revealing the final unresolved position produces the normal all-green OG win or GO solved transition exactly once.
- [x] Both items appear only in Solo Practice OG and GO, with current owned counts.
- [x] Reveal One Letter selects an unresolved position, shows its answer letter as a locked green tile in the active row, and marks the corresponding keyboard letter correct.

## Protected behavior

- [x] Daily Solo OG/GO show no consumable controls and cannot use inventory.
- [x] Ranked, unranked, private, Daily, and Practice Multiplayer show no consumable controls and remain unchanged.
- [x] Pay-to-Continue, reveal-answer, past-Daily unlock, completion rewards, XP, levels, Hard Mode, definitions, sharing, and Home-on-refresh behave as before.
- [x] Mobile Marketplace and Practice controls fit at 320/390px and manual scrolling remains smooth without horizontal overflow.

## Result

- [x] Any failed item has exact non-secret reproduction steps and remains inside Phase 57 follow-up.
- [x] All required checks pass with no known regression.
