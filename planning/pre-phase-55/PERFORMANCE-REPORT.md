# Pre-Phase-55 Functional Shell Performance Report

**Measured:** 2026-07-09
**Baseline:** accepted Phase 54 source at `019caed8723ed6b9144e4060c110d0b5b8dd96b9` before shell edits
**Candidate:** current uncommitted Review Candidate working tree

## Build Comparison

| Metric | Phase 54 baseline | Shell candidate | Change |
| --- | ---: | ---: | ---: |
| Custom CSS source | 1,639 lines | 404 lines | -75.4% |
| Shell component source | 502 lines | 157 lines | -68.7% |
| Production CSS | 110.46 kB | 83.75 kB | -24.2% |
| Production CSS gzip | 17.79 kB | 14.02 kB | -21.2% |
| Main JavaScript | 974.92 kB | 967.78 kB | -0.7% |
| Main JavaScript gzip | 265.13 kB | 262.53 kB | -1.0% |

The existing Vite advisory for the main chunk over 500 kB remains. Code splitting was not introduced because this pass found a clear presentation-only win and the prompt forbids architecture risk without measurement-backed need.

## Runtime Evidence

Before edits, the live desktop Home shell contained 309 elements and 24 elements with active animation or backdrop filtering. The candidate 390 x 844 shell reported:

- zero active animation/backdrop-filter elements at rest;
- zero backdrop-filter layers;
- zero box-shadow layers;
- zero sticky elements;
- no horizontal overflow across Home, Solo, Calendar, Multiplayer, History, Stats, Leaderboard, Word Explorer, Profile, Settings, and About;
- mobile scroll loops generally completed in 25-35 ms in the full E2E run.

Two expected fixed local-development controls remain in mobile diagnostics: Back to top and the development-only Simulate Time control. Production does not render Simulate Time.

## Interpretation

This is a functional shell, not the final design. The largest measurable win is stylesheet and compositing simplification. The application data/game bundle remains large because word data and product functionality were intentionally preserved. Future GPT-5.6 SOL design work should treat this candidate as a stable behavioral foundation and should not claim that visual redesign alone solves application code splitting.
