# Phase 57 Manual Review Checklist

**Status:** Review Candidate prepared for hosted manual review after the separately authorized Review Candidate backup.

Automated evidence includes 993 unit tests, build, lint, API typecheck, focused Phase 57 tests, two guest browser scenarios, two disposable-account authority/browser scenarios, exact 38/38 migration-history equality, unchanged catalog fingerprints, authority/privacy/concurrency probes, zero temporary residue, and a clean final 72/72 authority-enabled Playwright run after one established transient multiplayer identity `403` was isolated and passed on focused retry.

## Marketplace

- [ ] Marketplace appears in primary navigation and shows the current coin balance.
- [ ] Reveal One Letter costs exactly 25 coins and increments only its owned count.
- [ ] Remove Incorrect Letters costs exactly 40 coins and increments only its owned count.
- [ ] Insufficient funds disable or reject purchase without changing coins or inventory.
- [ ] Refresh and same-account sign-out/sign-in preserve authoritative coins and inventory without duplicate purchases.

## Solo Practice OG and GO

- [ ] Both items appear only in Solo Practice OG and GO, with current owned counts.
- [ ] Reveal One Letter reveals one deterministic position/letter, does not type or submit a guess, and does not consume when every position is already revealed.
- [ ] Remove Incorrect Letters disables only answer-absent on-screen letters and rejects the same physical-keyboard letters.
- [ ] Removing letters never disables a letter present in the answer and cannot be applied twice to one puzzle.
- [ ] Refresh, navigation away/back, and same-account hydration preserve active effects and decremented inventory.
- [ ] GO starts each puzzle with independent effects; using an item on one puzzle does not leak it into the next.

## Protected behavior

- [ ] Daily Solo OG/GO show no consumable controls and cannot use inventory.
- [ ] Ranked, unranked, private, Daily, and Practice Multiplayer show no consumable controls and remain unchanged.
- [ ] Pay-to-Continue, reveal-answer, past-Daily unlock, completion rewards, XP, levels, Hard Mode, definitions, sharing, and Home-on-refresh behave as before.
- [ ] Mobile Marketplace and Practice controls fit at 320/390px and manual scrolling remains smooth without horizontal overflow.

## Result

- [ ] All required checks pass with no known regression.
- [ ] Any failed item has exact non-secret reproduction steps and remains inside Phase 57 follow-up.
