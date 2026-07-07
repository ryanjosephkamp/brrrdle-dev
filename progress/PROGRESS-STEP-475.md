# Progress Step 475: Phase 50 Hosted Manual Review Cross-Browser Recovery

**Date**: 2026-07-07
**Status**: Completed - Cross-Browser Recovered Review Candidate Ready For Backup Authorization
**Stable repository boundary**: The original stable `brrrdle` repository was not touched.

## Authorization

The user authorized Phase 50 same-phase hosted/manual cross-browser recovery from the local prompt artifact:

`prompt-packages/phase-50/PHASE-50-HOSTED-MANUAL-REVIEW-CROSS-BROWSER-RECOVERY-PROMPT-2026-07-07.md`

Authorized:

- use the supplied Daily puzzle answers only as temporary test inputs;
- reproduce the hosted/manual Daily Solo completion restore failure where safe;
- repair directly Phase-50-related Solo completion persistence and mobile scroll-lag issues;
- strengthen automated E2E coverage, including real signed-in Daily OG/GO re-entry paths;
- update Phase 50 checklist/changelog/progress;
- prepare the next Review Candidate Backup prompt artifact if clean.

Not authorized:

- writing raw Daily answers, credentials, tokens, auth IDs, private profile data, raw emails, or hidden environment values into tracked files, progress reports, logs, screenshots, prompt artifacts, or final reports;
- Git/GitHub actions or backup workflow execution;
- final Phase 50 acceptance or closure;
- Phase 51 or next-phase implementation;
- migrations, Supabase/RLS/RPC/table/bucket work, storage schema or cloud progress contract changes, deployment configuration, releases, public tunneling, gameplay-rule changes, reward-formula changes, scoring changes, Elo/rating changes, Daily claim changes, multiplayer settlement changes, or broad redesign work;
- work in the original stable `brrrdle` repository.

## Hosted Manual Review Follow-Up

The recovered hosted candidate remained unacceptable before this pass. The user reported that solved Daily Solo completion state still did not reliably restore the terminal game-end screen after navigating away and returning. Browser behavior differed by mobile browser: one path returned to a fresh/cleared board, while another returned letters without restoring the all-green terminal row or completed end screen. The user also reported that manual mobile/page scrolling still felt laggy, though ordinary auto-scroll behavior was improved.

The temporary current-Daily answers supplied in chat were treated as context only. The committed tests use deterministic fixture-generated answers instead.

## Root Cause And Repair

Root cause:

- Authenticated cloud progress hydration could restore stale in-progress resume-slot evidence after a local terminal completion.
- Completed Solo display evidence could be hidden while cloud `completedGameIds` had not caught up.
- Daily OG/GO game surfaces did not always remount when completed display evidence arrived after account hydration.
- Authenticated terminal completion could wait behind normal debounce timing before syncing.
- On small mobile screens, fixed animated lunar background layers could contribute to scroll cost.

Implemented:

- Completed Solo display slots now outrank in-progress resume slots for Practice and Daily OG/GO route surfaces.
- Current-cycle Daily completed display evidence remains visible while signed-in cloud completion IDs catch up. Daily setup still guards against stale previous-day answers.
- Daily OG/GO session keys now include completed-resume update identity, forcing a remount when completed display evidence hydrates.
- Authenticated terminal completion schedules an immediate progress-sync flush after reward recording.
- E2E now checks direct browser Back/Forward, reload/account hydration, and all-green final-row styling.
- A signed-in Daily OG plus Daily GO regression now covers the exact account-hydration failure class.
- Mobile widths below `720px` use a static lunar background instead of the fixed animated canvas and masked noise layers.
- Cross-browser console guards were narrowed for known benign external Supabase cookie-domain and definition lookup noise seen in Firefox/WebKit.

## Verification

Passed:

- Hosted old candidate reproduction: the new signed-in Daily OG/GO regression failed against the hosted candidate before the local source repair.
- Focused signed-in Daily OG/GO regression passed locally after repair.
- Focused Solo completion Playwright in Chromium: 5 tests passed.
- Focused Solo completion Playwright in Firefox: 5 tests passed.
- Focused Solo completion Playwright in WebKit: 5 tests passed.
- Focused Solo completion Playwright in mobile Chromium emulation: 5 tests passed.
- Focused unit slice: 8 files, 52 tests passed.
- Focused mobile scroll/layout Playwright: 15 tests passed.
- `npm run lint`
- `npm run test`: 127 files passed, 881 tests passed.
- `npm run test:e2e`: 42 tests passed.
- `npm run build`: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`

Final lightweight hygiene checks are reported in the Codex closeout for this step. The backup prompt must rerun its own preflight before any staging or Git/GitHub action.

## Phase Gate

Phase 50 remains open after this recovery. The next action is a separately authorized cross-browser recovered Review Candidate Backup for hosted/live manual review:

`prompt-packages/phase-50/PHASE-50-CROSS-BROWSER-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-07.md`

After that backup, the user should manually review the hosted/live candidate using `planning/phase-50/REVIEW-CHECKLIST.md`.

Directly Phase-50-related manual-review findings may still return to same-phase Review Follow-up. Final Phase 50 acceptance/closure, Final Acceptance Backup, deployment/release, next-phase work, and stable `brrrdle` repository work remain separately gated and unexecuted by this progress record.
