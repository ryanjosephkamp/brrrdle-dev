# Deeper Functional-Shell Optimization Decision

**Decision:** Proceed with a bounded deeper-shell implementation.
**Date:** 2026-07-11.
**Protected rollback:** `phase-57-golden-2026-07-11`.

## Why

The accepted shell is already visually inexpensive and scrolls well, so another broad UI reduction would create more risk than value. However, the cold Home load transfers all 34 word banks and every product route:

- approximately 1.97 MB total cold transfer;
- approximately 1.95 MB JavaScript transfer;
- approximately 1.68 MB attributable to word-list/runtime chunks beyond main;
- 36 JavaScript requests;
- one 1,008.86 kB / 272.81 kB gzip main application chunk;
- no route-level lazy boundaries.

Those costs are avoidable without changing the product or backend.

## Approved Planning Direction

1. Load only the selected word length through a validated deduplicated cache boundary.
2. Add route-level loading boundaries after the word-data graph is no longer globally eager.
3. Measure and consolidate duplicate signed-in polling only where identical authority data currently feeds multiple consumers.
4. Isolate countdown rendering only if post-loading measurements still justify it.
5. Preserve the current shell presentation, React/Vite stack, all backend contracts, and every inventory capability.

## Success Criteria

The implementation plan should target:

- zero word-list chunks requested on cold Home before a game/data surface needs one;
- cold Home JavaScript transfer at or below 400 kB in the controlled baseline, unless a documented build constraint makes that unsafe;
- a materially smaller main chunk, with a planning target of at least 15% gzip reduction from 272.81 kB where route splitting permits it;
- no horizontal overflow, scroll regression, inaccessible fallback, lost state, console/network regression, or new background polling duplication;
- equal Daily/Practice determinism and all-length coverage;
- unchanged Supabase, economy, queue, rating, privacy, and persistence contracts;
- full 998+ unit and 74+ authority-enabled E2E verification before Review Candidate.

Targets are guardrails, not permission to weaken behavior. Missing a numeric target with a technically sound explanation is preferable to an unsafe workaround.

## Explicit Rejections

- no static-HTML rewrite;
- no Next.js or framework migration;
- no new component library;
- no dependency installation/removal;
- no further cosmetic stripping as a performance strategy;
- no Supabase or gameplay contract changes;
- no line-count-only refactor.

## Phase Routing

Complete this optimization as a separate post-Phase-57 gated program before Phase 58. If accepted, give it its own Final Acceptance backup and Golden Checkpoint, then refresh Phase 58 against that exact optimized baseline.
