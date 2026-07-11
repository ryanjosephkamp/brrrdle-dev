# Phase 57 Planning Brief - Solo Practice Marketplace And Consumables

**Status:** Implementation-ready; execution remains separately gated.
**Date:** 2026-07-11.

Phase 57 should complete a lightweight coin marketplace and consumable inventory/use contract, building on the existing `revealOneLetter` and `removeIncorrectLetters` helpers where suitable.

Hard scope boundary:

- consumables may be purchased and used only for Solo Practice;
- they are unavailable in every Daily mode and every multiplayer mode, including private and ranked;
- purchases, inventory mutations, and use must be deterministic, validated, cloud-compatible for signed-in players, and duplicate-safe;
- reward drops, Hard Mode multipliers, probability systems, and additional hint types require explicit economy decisions;
- all existing Pay-to-Continue, coin, XP, reward idempotence, Daily integrity, multiplayer fairness, and shell-performance behavior must remain protected.

Phase 57 requires a separate implementation plan after Phase 56 closes. It must audit the current progression schema, cloud merge/write path, shop surfaces, answer-secrecy implications, and Solo game integration before implementation.

That audit and the resulting contract are recorded in `planning/phase-57/IMPLEMENTATION-PLAN.md`.
