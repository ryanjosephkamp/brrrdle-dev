# Progress Step 459: Phase 50 Stage 50.0-50.2 Baseline, Reproduction, And Contract Decision

**Date**: 2026-07-06
**Status**: Completed - Awaiting User Review Before Stage 50.3-50.4 Implementation
**Stable repository boundary**: The original stable `brrrdle` repository was not touched.

## Authorization

The current prompt authorized only:

- Phase 50 Stage 50.0 protected baseline and execution setup,
- Phase 50 Stage 50.1 read-only Solo completion-state audit and reproduction,
- Phase 50 Stage 50.2 completed-state contract decision,
- progress reporting,
- ignored local reproduction evidence,
- one ignored local prompt artifact for the next gated implementation pass.

The prompt did not authorize source/runtime implementation, test implementation, migrations, storage contract changes, Supabase/Vercel configuration, Git/GitHub actions, backup, stable repository work, optional Profile/HUD implementation, or work beyond Stage 50.0-50.2.

## Baseline

- Working repo: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Git toplevel: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Local `main`: `cc878c6a109406b56f2a9195be6114c1ccf02259`
- `origin/main`: `cc878c6a109406b56f2a9195be6114c1ccf02259`
- Branch status: `main...origin/main`
- Watched ports before browser work: `5173`, `5174`, `3000`, and `4173` were free.
- Prompt artifacts checked: required handoff and Stage 50.0-50.2 prompt artifacts were present and ignored/local-only under `prompt-packages/`.

The dirty tree matched the expected Phase 49/Phase 50 planning and prompt-package context already recorded in the handoff.

## Read-Only Source Findings

Relevant current seams:

- `src/account/resumeSlot.ts` intentionally treats resume slots as in-progress only.
- `isOgSessionInProgress` rejects solved/lost OG sessions.
- `isGoSessionInProgress` rejects fully won GO chains and lost active puzzles.
- `normalizeResumeSlot` drops malformed, missing, and finished slots.
- `src/account/guestStorage.ts` `recordCompletedGame` is idempotent by `completedGameIds` and deletes the matching resume slot.
- `src/app/browserNavigationHistory.ts` only preserves `selectedSoloGameKey` when a matching resume slot exists; otherwise stale Solo selection falls back to Active Games.
- `src/app/App.tsx` `handleResumeCapture` persists a lane while `isCaptureInProgress(capture)` is true and deletes it when a captured session is no longer in progress.
- `OgGame` and `GoGame` emit live resume captures and call `onGameComplete` from terminal session state.

This supports the root-cause hypothesis that completion deletes the only persisted game-surface evidence used by route/history re-entry, while reward/history progress persists separately.

## Reproduction Evidence

Generated ignored local evidence:

- `test-results/phase-50/reproduction/stage-50-1-solo-completion-reproduction.json`
- `test-results/phase-50/reproduction/README.md`

Harness:

- Local Vite dev server on `http://127.0.0.1:5173/`
- Headless Chromium through Playwright
- Fixed Daily browser time: `2026-06-11T16:00:00.000Z`
- Fresh guest browser context per scenario

Observed matrix:

| Scenario | Winning answer(s) | Terminal before navigation | Browser Back terminal | Route re-entry terminal | Progress/reward after re-entry |
| --- | --- | --- | --- | --- | --- |
| Practice OG | `abbes` | visible | missing | missing | `og:practice:5:0:abbes`, 70 XP, 13 coins |
| Practice GO | `abbes`, `abets`, `abled`, `abler`, `ables` | visible | missing | missing | `go:practice:5:abbes-abets-abled-abler-ables`, 345 XP, 58 coins |
| Daily OG | `lader` | visible | missing | missing | `og:daily:2026-06-11`, 70 XP, 18 coins |
| Daily GO | `stair`, `stake`, `stale`, `stane`, `stare` | visible | missing | missing | `go:daily:2026-06-11`, 345 XP, 63 coins |

Additional characterization:

- The wrong valid guess `aahed` persisted in each current in-progress lane before completion.
- GO intermediate solved evidence persisted before final completion; the first GO solve snapshots showed puzzle 1 won and puzzle 2 active.
- After final completion, terminal status was visible before navigation.
- After browser Back or route re-entry, the terminal message was gone and the UI showed a fresh or in-progress game surface.
- Reward/progression snapshots after re-entry remained stable; this reproduced terminal display loss without evidence of duplicate rewards.

## Contract Decision

Use a source-only completed Solo terminal-state restoration contract for Stage 50.3-50.4.

Selected path:

- Keep existing `resumeSlots` as in-progress-only.
- Do not persist completed sessions in `resumeSlots`.
- Do not change guest/cloud progress schema, storage normalization, Supabase contracts, RLS, migrations, Daily selection, answer generation, reward formulas, or scoring rules.
- Add a display-only completed Solo terminal evidence path in source, likely App-owned and session-local, keyed to the Solo lane/game identity.
- Hydrate `OgGame` and `GoGame` terminal display from that evidence on route/back-forward re-entry.
- Do not call `recordCompletedGame` as part of restoration.
- Keep `completedGameIds` authoritative for idempotence and add/extend tests to prove re-entry does not double-award.

Rejected for this stage:

- Forcing completed terminal sessions into existing `resumeSlots`, because current tests and comments intentionally reserve those slots for unfinished games.
- A persisted progress schema extension, because the observed issue can be addressed in source for route/back-forward re-entry and does not require a migration.
- A broad route/history rewrite, because the failure is local to completed Solo terminal evidence.

## Next Prompt Artifact

Created ignored local prompt artifact:

- `prompt-packages/phase-50/PHASE-50-STAGE-50-3-50-4-SOLO-COMPLETION-REPAIR-PROMPT-2026-07-06.md`

This prompt authorizes only Stage 50.3 core Solo completion repair and Stage 50.4 reward idempotence hardening if the user approves it.

## Verification

Passed:

- Stage 50.1 browser reproduction artifact recorded all four scenarios with `ok=true`.
- `git diff --check`
- CSV shape check: `rows=461`, `data_rows=460`, `columns=12`, `widths=[12]`, `last_id=459`.
- Non-printing/credential-value scan over changed tracked/untracked files plus ignored prompt/reproduction artifacts: `scanned_files=20`, `credential_value_hits=0`, `nonprinting_hits=0`, `binary_skipped=0`.
- Ignored-artifact check confirmed reproduction evidence and prompt-package artifacts are ignored/local-only.
- Dev server stopped after reproduction.
- Watched ports `5173`, `5174`, `3000`, and `4173` were clear after cleanup.
- `git status --short --branch`

Notes:

- The reproduction harness used a fixed browser clock. The generated JSON captured a few non-blocking resource-load console messages during definition lookups; no source behavior was changed in this gate.

## Stop Gate

Stop here for user review. Stage 50.3-50.4 implementation is prepared but not executed. Optional Profile/HUD stages, migrations, Git/GitHub actions, backup, deployment, and stable repository work remain unauthorized.
