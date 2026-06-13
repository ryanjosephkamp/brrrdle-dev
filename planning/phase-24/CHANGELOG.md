# Phase 24 Changelog

All notable Phase 24 changes should be documented here once Phase 24 is explicitly authorized.

## Unreleased

- Completed the Phase 24 navigation/workspace migration under `phase_id = 150` through `phase_id = 155`: added first-class Solo, Multiplayer, and History routes; added route/subtab persistence; built Solo and Multiplayer workspaces with Daily, Practice, Active Games, Lobby, and scoped Live v0 surfaces; added History v1 filters/results; removed Practice from primary navigation after replacement entry points passed smoke; and preserved the hidden Practice compatibility path into Solo Practice. Final Stage 24.6 verification passed lint, Vitest, real Supabase-backed Playwright E2E, `test:full`, build, API typecheck, diff check, CSV shape check, and desktop/tablet/mobile browser smoke.
- Completed the Phase 24 gameplay-correctness testing-suite implementation under `phase_id = 146`: added Playwright E2E infrastructure, real two-client Supabase-backed Practice/Daily Multiplayer OG/GO flows, Daily UTC rollover coverage, modular E2E scripts, a Daily cycle regression, and the expanded canonical `planning/testing/TESTING-SUITE.md` coverage matrix. Verification passed with lint, Vitest, E2E, full-suite, build, API typecheck, and diff checks.
- Started the Phase 24 gameplay-correctness testing-suite execution under `phase_id = 146`, covering the planned Vitest regression expansion, Playwright E2E harness, real two-client Supabase-backed multiplayer flows, Daily midnight UTC rotation coverage, and canonical `planning/testing/TESTING-SUITE.md` documentation expansion.
