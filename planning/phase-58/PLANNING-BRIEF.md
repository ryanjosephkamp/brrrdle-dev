# Phase 58 Planning Brief - GO Solution Diversity And Multiplayer Refresh Readiness

**Status:** Accepted and closed; retained as historical Phase 58 intent.
**Date:** 2026-07-13.
**Protected baseline:** `post-phase-57-optimized-shell-golden-2026-07-12` at `046c681dd99e66b21b9fdbeca97b60b2e0ada99c`.

## Purpose

Phase 58 is the final foundation-hardening phase before design direction. It has two bounded objectives:

1. Replace GO's contiguous answer-window selection with a versioned deterministic sampler that selects unique, independently distributed answers from the eligible word-length and difficulty pool while preserving every existing GO gameplay, carry-over, keyboard, Hard Mode, persistence, privacy, and multiplayer rule.
2. Make participant-owned Multiplayer games rediscoverable after a same-tab hard refresh within one shared five-second readiness budget across ranked, unranked, Daily, Practice, private, OG, and GO lanes, without weakening repository authority or relying on stale cross-account cache state.

The two objectives share a single reason to precede redesign: both define foundational game/data behavior that the later visual work must preserve. They should remain separate implementation stages and verification lanes inside the phase.

## Evidence Summary

- Current Solo and most Multiplayer GO creation uses `answers[(seedIndex + offset) % answers.length]`. Because eligible answer lists retain alphabetical ordering, each chain is a contiguous lexical window.
- Five-letter adjacent answers currently share their first letter about 98.8 percent of the time and their first two letters about 90.0 percent of the time.
- Practice counters advance by one. A new five-, seven-, or ten-puzzle chain therefore overlaps the prior same-configuration chain by four, six, or nine answers respectively.
- The participant repository currently reads every RLS-visible `async_multiplayer_games` row ordered by `updated_at`. RLS also exposes global waiting rows, so the critical participant read grows with account history and current public activity.
- The accepted reload bridge depends on a debounced progress snapshot. Existing E2E normally uses fresh accounts and waits for that snapshot, so it does not model an established account that reloads immediately.

## Compatibility Rules

- Existing serialized Solo and non-ranked Multiplayer sessions keep their stored answers exactly.
- Existing ranked Daily games keep their canonical server answers exactly.
- Daily answer-generation v2 activates only on an explicit future UTC cutoff shared by TypeScript and the ranked Daily server contract.
- New Practice games use v2 after implementation; absence of an answer-generation version means legacy v1.
- GO mechanics and UI are out of scope except for changes strictly required to preserve or expose the selected chain version.
- Multiplayer participant repository authority remains final. Provisional same-account display may bridge startup only when it cannot cross users or overwrite later authority.

## Phase Routing

- **Phase 58:** accepted and closed as the final `brrrdle-dev` foundation phase.
- **Awordle successor:** clean-history clone parity, then design direction and the separately authorized frontend transformation.

No later implementation is authorized in the locked shell by this historical brief. See `SHELL-LOCK.md` and `planning/handoffs/AWORDLE-SUCCESSOR-ROADMAP-AND-HANDOFF-2026-07-13.md`.
