# brrrdle Gameplay Testing Suite

**Status**: Canonical Phase 24 testing strategy.
**Updated**: 2026-07-09
**Primary focus**: Gameplay correctness for solo and multiplayer brrrdle.

## Purpose

This suite is the regression safety net for gameplay behavior. It has two
layers:

- A fast Vitest layer for deterministic domain and component regressions.
- A Playwright E2E layer for browser gameplay, including real two-client
  Supabase-backed multiplayer flows.

The suite is intentionally modular. During implementation, run focused files or
tagged E2E subsets. Before handoff on major work, run the full gate.

For UI-heavy or gameplay-visible phases, an explicitly authorized visual
handoff review may run after automated verification and before Git handoff. This
captures local screenshots for human inspection under ignored artifacts such as
`test-results/visual-review/<phase-or-stage>/`. It is review evidence, not a
pass/fail pixel-diff visual regression suite.

## Pre-Phase-55 Functional Shell Coverage

The shell Review Candidate keeps behavioral assertions independent of replaceable presentation:

- `e2e/gameplay/solo-og.spec.ts` directly covers Practice OG and Daily OG solve, Home-on-refresh, and explicit re-entry restoration.
- `e2e/layout/functional-shell-accessibility.spec.ts` covers primary-route keyboard reachability, one main landmark, Focus recovery, authenticated mobile account-menu containment, and horizontal overflow.
- `e2e/layout/mobile-scroll.spec.ts` remains the cross-route 390px scroll/overflow/effect-layer matrix.
- Keyboard and game tiles expose semantic `data-state` values so correct/present/absent/unknown assertions do not depend on Tailwind classes.
- The full Playwright gate remains mandatory because it exercises real authenticated multi-client Supabase behavior that screenshots and component tests cannot prove.

The full shell gate on 2026-07-09 passed 132 Vitest files / 920 tests and 63 Playwright scenarios. One initial spectator identity-summary RPC 403 was treated as transient only after the exact focused scenario passed and the complete 63-scenario gate then passed cleanly.

## Test Layers

### Fast Vitest Layer

Command:

```bash
npm run test
npm run test:unit
```

Primary coverage:

- OG and GO session mechanics.
- Duplicate-letter tile states and keyboard precedence.
- Hard Mode validation.
- Daily cycle, anti-gaming, and Daily Multiplayer UTC rollover.
- Multiplayer reducer rules for create, join, turns, claims, forfeit, timeout,
  GO transitions, and result settlement.
- Multiplayer component projection for shared rows, prior GO solutions, and
  keyboard evidence.

### Playwright E2E Layer

Commands:

```bash
npm run test:e2e
npm run test:e2e:practice
npm run test:e2e:daily
npm run test:e2e:multiplayer
npm run test:e2e:solo
```

Single-test example:

```bash
npx playwright test e2e/gameplay/practice-multiplayer-go.spec.ts -g "solved GO transition"
```

The E2E layer starts one Vite dev server and uses one worker by default. Real
multiplayer tests create two distinct temporary Supabase users, sign them in
through the UI in isolated browser contexts, drive real gameplay, probe remote
rows, and clean up temporary users/rows.

### Full Suite

```bash
npm run test:full
```

`test:full` runs the fast Vitest layer followed by all Playwright E2E tests.

## E2E Environment

Required:

- `VITE_SUPABASE_URL` or `E2E_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` or `E2E_SUPABASE_ANON_KEY`

Required for the committed real two-client tests:

- `SUPABASE_SERVICE_ROLE_KEY` or `E2E_SUPABASE_SERVICE_ROLE_KEY`

The service-role key is used only from Node-side Playwright fixtures to create
and delete temporary auth users and to probe/clean test multiplayer, ranked
queue, private request, public leaderboard, and related temporary rows. Never
print, commit, or paste secret values. The suite records only whether variables
are present.

## Coverage Matrix

| Area | Unit/Domain | Component | Real E2E | Command | Notes |
| --- | --- | --- | --- | --- | --- |
| Solo Practice OG | Yes | Yes | Indirect smoke | `npm run test`, `npm run test:e2e:solo` | Existing Vitest coverage remains primary for OG solo rules. |
| Solo Practice GO | Yes | Yes | Yes | `npm run test:e2e:solo` | `solo-practice-go.spec.ts` solves puzzle 1 and verifies carry-over into puzzle 2. |
| Solo Daily OG | Yes | Smoke | Limited | `npm run test`, `npm run test:e2e:daily` | Daily cycle and calendar coverage are mostly fast tests; no dedicated OG browser solve yet. |
| Solo Daily GO | Yes | Yes | Yes | `npm run test:e2e:solo`, `npm run test:e2e:daily` | `solo-daily-go.spec.ts` solves puzzle 1 under deterministic browser time. |
| Daily rotation | Yes | N/A | Yes | `npm run test:e2e:daily` | `daily-rotation.spec.ts` verifies Daily Multiplayer date rollover across UTC midnight. Solo Daily remains local-midnight by current product design. |
| Practice Multiplayer OG | Yes | Yes | Yes | `npm run test:e2e:practice`, `npm run test:e2e:multiplayer` | Create/join, normal completion, post-guess forfeit loss, and timeout loser precedence. |
| Practice Multiplayer GO | Yes | Yes | Yes | `npm run test:e2e:practice`, `npm run test:e2e:multiplayer` | Real two-client solved transition, prior solution visibility, keyboard evidence, and reload persistence. |
| Daily Multiplayer OG | Yes | Yes | Yes | `npm run test:e2e:daily`, `npm run test:e2e:multiplayer` | Create/join, completion, five-letter/no-clock/no-Hard-Mode checks, and claim guard. |
| Daily Multiplayer GO | Yes | Yes | Yes | `npm run test:e2e:daily`, `npm run test:e2e:multiplayer` | Real two-client solved transition, prior answer visibility, keyboard evidence, and Daily invariant checks. |
| Authenticated two-client harness | N/A | N/A | Yes | `npm run test:e2e:multiplayer` | `authenticated-two-client-smoke.spec.ts` validates temp-user creation, UI sign-in, isolated contexts, and cleanup. |
| Public/guest Live spectation | Yes | Yes | Yes | `npm run test:e2e:multiplayer` | `live-v1-spectator.spec.ts` protects public/guest read-only Practice Live discovery and Daily exclusion. |
| Private matchmaking | Yes | Yes | Yes | `npm run test:e2e:multiplayer` | `private-matchmaking.spec.ts` covers safe public-profile request creation, incoming request visibility, accept, and participant-owned created-game routing. |
| Multiplayer reliability | Yes | Yes | Yes | `npm run test:e2e:multiplayer` | `multiplayer-reliability.spec.ts` covers three-client ranked queue cancellation/stale-row denial, ranked search-again, public leaderboard freshness, private request lifecycle cleanup, accepted-game routing, and mobile route-entry freshness. |
| Mobile route layout/scroll | N/A | N/A | Yes | `npx playwright test e2e/layout/mobile-scroll.spec.ts` | Deterministic route scroll/layout harness for mobile overflow, reachability, and sticky/fixed overlay checks. |

## Current E2E Files

- `e2e/gameplay/authenticated-two-client-smoke.spec.ts`
- `e2e/gameplay/daily-multiplayer-og.spec.ts`
- `e2e/gameplay/daily-multiplayer-go.spec.ts`
- `e2e/gameplay/daily-rotation.spec.ts`
- `e2e/gameplay/live-v1-spectator.spec.ts`
- `e2e/gameplay/multiplayer-reliability.spec.ts`
- `e2e/gameplay/practice-multiplayer-og.spec.ts`
- `e2e/gameplay/practice-multiplayer-go.spec.ts`
- `e2e/gameplay/private-matchmaking.spec.ts`
- `e2e/gameplay/solo-daily-go.spec.ts`
- `e2e/gameplay/solo-practice-go.spec.ts`
- `e2e/layout/mobile-scroll.spec.ts`

Shared fixtures live under `e2e/fixtures/`.

## Adding E2E Scenarios

Prefer this pattern:

1. Use existing user/context helpers from `e2e/fixtures/twoClientGame.ts`.
2. Drive the app through visible UI controls where practical.
3. Use remote Supabase probes from `e2e/fixtures/supabaseAdmin.ts` for durable
   evidence and cleanup, not as a replacement for UI assertions.
4. Use bounded waits and app-observed state instead of fixed sleeps.
5. Tag tests with `@practice`, `@daily`, `@multiplayer`, and/or `@solo`.
6. Keep each scenario short enough that cleanup boundaries stay obvious.

Use durable selectors only when roles/labels cannot target a state surface
reliably. Current source test hooks are neutral `data-testid`/`data-*` attributes
around multiplayer panels and selected games; they do not change gameplay.

## Supabase Cleanup Rules

The E2E fixtures:

- Generate unique temporary emails per run.
- Create confirmed auth users through the Supabase Admin API.
- Delete multiplayer rows, ranked queue rows, ranked rating/leaderboard test
  rows, and private match request rows associated with temporary users.
- Delete temporary users after browser contexts close.

If cleanup credentials are missing or a cleanup call fails, stop and report the
limitation. Do not leave durable test users or rows unmentioned.

## Resource Safety

- One Vite dev server.
- One Playwright worker by default.
- Minimal browser contexts.
- Prompt context cleanup in `finally` blocks.
- No unbounded polling or huge logs.
- Do not commit `test-results/`, `playwright-report/`, `.env*`, screenshots,
  videos, traces, or session artifacts.

## Visual Handoff Review

When a phase changes visible gameplay, account, stats, leaderboard, or
navigation behavior, Codex may run a visual handoff review before Git handoff if
the user explicitly authorizes it.

Recommended flow:

1. Run the phase's required automated verification first.
2. Build a small screenshot checklist for changed surfaces.
3. Use Playwright assertions to confirm each intended state before screenshot
   capture.
4. Save screenshots and a manifest under `test-results/visual-review/`.
5. Report absolute Markdown image links in the final response for human review.
6. Keep all visual artifacts ignored and unstaged.

Visual review should not become broad screenshot-diff testing by default.
Promote a screenshot into automated visual regression only after the surface is
stable, deterministic, and worth the maintenance cost.

## Promoting Manual UX Findings

When manual review confirms a durable UX behavior, promote it into focused
automated or manual regression coverage where practical.

Recommended Phase 43-style examples:

- three-client ranked queue/search-again behavior after reproduction;
- stale ranked queue waiting panels disappearing after match/open/finalization;
- normal-zoom horizontal overflow checks for Home Recent Results or equivalent
  row layouts;
- Stats local/public ordering, Help placeholder/About copy routing, and
  Settings Help-card removal;
- account dropdown and notification outside-click dismissal;
- invalid-guess message behavior that does not shift the on-screen keyboard;
- persistent-message or spectator latest-turn auto-scroll only when the user is
  already centered on the relevant gameplay surface;
- back-to-top controls that do not overlap primary gameplay or navigation.

Prefer behavior assertions, durable selectors, and the existing mobile-scroll
harness over brittle pixel-perfect checks.

## Manual Phase Review Checklists

When a completed phase changes visible behavior, Codex may create a committed
manual review checklist before Git handoff or before starting the next phase if
the user explicitly authorizes it.

Recommended flow:

1. Run the phase's required automated verification first.
2. Run any authorized visual handoff review separately when useful.
3. Read the phase planning brief, spec, implementation plan, changelog, final
   progress reports, and visual manifest when present.
4. Write `planning/phase-<N>/REVIEW-CHECKLIST.md` with user-testable checkbox
   items, expected behavior, suggested manual steps, evidence references,
   preserved invariants, and known deferred/out-of-scope work.
5. Keep checklist content free of secrets, auth state, raw IDs, private data,
   screenshots, videos, traces, tokens, and local session artifacts.

Manual review checklists are a human review aid. They do not replace unit tests,
integration tests, real two-client E2E, migration/RLS probes, visual handoff
review, or any required phase verification gate.

## Known Gaps

- Phase 57 adds `e2e/gameplay/solo-practice-consumables-phase57.spec.ts` for guest Marketplace purchase, OG/GO use, private effect persistence, on-screen/physical keyboard enforcement, and Daily/Multiplayer exclusion. `e2e/gameplay/solo-practice-consumables-phase57-authenticated.spec.ts` adds real disposable-account bootstrap, price/range/underflow, idempotency/concurrency, privacy, cross-browser hydration, OG/GO persistence, scope exclusion, mobile-fit, and cleanup coverage. Signed-in authority runs must explicitly set `E2E_PHASE57_ECONOMY_AUTHORITY=enabled`.

- The E2E suite intentionally avoids visual regression testing so Phase 24 UI
  work can evolve without brittle screenshot churn.
- Solo Daily currently follows the product's local-midnight variant; Daily
  Multiplayer is the UTC-midnight variant covered by browser and fast tests.
- Solo Practice OG has strong fast coverage but no dedicated standalone browser
  solve spec yet.
- Browser E2E timeout coverage uses a controlled temporary-row clock setup to
  avoid a 30-second wall-clock wait while still settling through the app's
  existing timeout path.
