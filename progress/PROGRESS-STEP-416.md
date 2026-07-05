# Progress Step 416 - Phase 46 Stage 46.1

**Status:** Completed - Awaiting User Review Before Stage 46.2
**Phase:** Phase 46 - Solo Sync Integrity and Manual Review Follow-Up
**Stage:** Stage 46.1 - Solo Sync/Session Freshness Audit and Reproduction
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-05T19:03:44Z
**Completed:** 2026-07-05T19:05:10Z

## Authorization

The user authorized Phase 46 Stage 46.1 only: read-only Solo sync/session freshness audit and reproduction using the completed Stage 46.0 protected baseline.

Authorized work included reading governance, Phase 46 planning/spec/implementation materials, Stage 46.0 progress, account sync/local/cloud progress surfaces, Solo Daily/Practice storage and resume surfaces, sign-in/sign-out hydration surfaces, Solo Overview active-game selection source, mobile Solo auto-center/keyboard visibility surfaces, relevant tests, Supabase/RLS context as needed, local workflow docs, focused read-only/browser/resource checks as needed, and creation of this progress report plus the matching 12-column CSV row.

This pass did not authorize source/runtime fixes, test implementation, Supabase migrations, storage schema changes, destructive local cleanup, deployment/configuration, Git/GitHub actions, backup workflow execution, gameplay-rule changes, Elo changes, secret/private data exposure, local session artifact exposure, or original stable repository work.

## Repository Boundary

- Confirmed working directory: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Confirmed local branch at Stage 46.1 start: `main`.
- Confirmed `HEAD` and `origin/main` at the expected baseline during Stage 46.1 setup: `aef8dba063e57cd5381852a66b9a0006fe52bf39`.
- Confirmed the original stable `brrrdle` repository was not used.
- Preserved the user-updated Phase 45 checklist at `planning/phase-45/REVIEW-CHECKLIST.md`.

## Audit Findings

### Authenticated Sync Contract

- The browser cloud progress contract currently uses `progress_snapshots` through `createSupabaseProgressRepository`.
- `loadAuthenticatedProgressForScope()` downloads the authenticated user's cloud snapshot on auth hydration and never uploads local guest progress during sign-in hydration.
- `syncGuestProgress()` can upload/merge the active local progress into the authenticated user's `progress_snapshots` row, but it is only called from the manual `Sync now` path in `App.tsx`.
- Signed-in Solo progress mutations call `persistActiveProgress()`, but `persistActiveProgress()` intentionally writes only when the active scope is not authenticated. For authenticated users it does not write guest storage and does not upload to cloud.

### Solo Resume Capture

- `OgGame` and `GoGame` call `onResumeCapture` whenever the live session changes.
- `handleResumeCapture()` records in-progress Daily/Practice Solo sessions into active progress and then calls `persistActiveProgress()`.
- For guests, this saves to guest local storage.
- For authenticated users, this updates in-memory React state only unless the user manually runs sync.

### Daily and Practice Boundaries

- Phase 45's current Daily protections remain visible in source/tests: current Daily OG/GO no longer restore from bare legacy browser-local keys.
- Current Daily OG/GO and Practice OG/GO restore from account-scoped active progress resume slots.
- The observed Phase 45 manual-review note is therefore classified as a freshness/upload gap rather than a current bare-key guest/account transfer regression.

### Cross-Browser and Same-Browser Freshness

- Cross-browser stale signed-in Solo state is expected from the current source path: browser A can hold new signed-in Daily/Practice resume slots only in memory until manual sync; browser B hydrates from the older `progress_snapshots` row.
- Same-browser multi-tab stale signed-in Solo state is also expected: there is no discovered Solo progress `BroadcastChannel` or `storage` event freshness path, and authenticated progress is not written to local storage where another tab could observe it.
- Existing focus/visibility refresh logic targets multiplayer and live spectator surfaces, not authenticated Solo `progress_snapshots` refresh.

### Practice Solo Risk

- Practice Solo shares the same persistence/freshness mechanism as Daily Solo because both flow through resume-slot capture and `persistActiveProgress()`.
- Daily Solo has higher anti-cheat priority because stale tabs can affect Daily streak/results. Practice Solo is lower integrity risk but should use a compatible freshness strategy if the source-only path is approved.

### Solo Overview Select Button

- The Solo Overview `Select` button currently sets `selectedSoloGameKey`, persists that selection in navigation state, highlights the card, and requests gameplay auto-centering.
- The adjacent Resume button performs the meaningful route/subtab/mode navigation to the selected game. The Select button appears to be mostly a focus/highlight/navigation-state affordance, not a distinct gameplay action.
- Stage 46.4 remains the right gate to decide whether to remove it or collapse its behavior into Resume.

### Session Enforcement

- One-active-session enforcement is not required to explain the current stale Solo behavior.
- Automatic authenticated Solo upload/download plus focus/visibility and tab-freshness coordination should be evaluated first.
- Strict session leases would require a separate storage/Supabase/security contract with stale-lock, mobile backgrounding, offline, and unsynced-progress recovery decisions.

## Reproduction and Classification

No live browser reproduction was run in this Stage 46.1 pass. The issue was characterized from source and existing focused tests without creating accounts, starting a dev server, printing secrets, exposing local session artifacts, or modifying tests. This is sufficient for Stage 46.1 because the source path directly explains the reported manual-review behavior.

Classification:

- Primary root cause: missing automatic authenticated Solo upload after signed-in Daily/Practice resume-slot captures.
- Secondary freshness gap: missing authenticated Solo cloud refresh on focus/visibility/route entry and missing same-browser tab coordination.
- Not classified as an active Phase 45 guest/account transfer regression.
- Not classified as a mandatory one-active-session/session-lease problem.
- Not classified as a proven storage-schema or RLS defect.

## Stage 46.2 Path Decision

Stage 46.2 can remain a documentation-only source-only versus storage-contract/Supabase/session-lease decision gate.

Recommended Stage 46.2 default direction:

- Treat existing `progress_snapshots` as likely sufficient for a source-only automatic signed-in Solo freshness repair.
- Define a narrow source-only repair boundary for Stage 46.3:
  - automatically upload signed-in Daily Solo after meaningful valid-guess/resume-slot changes;
  - consider debounced signed-in Practice Solo upload;
  - refresh authenticated Solo progress on focus/visibility/route entry only when safe and not while a newer local change is pending;
  - preserve manual sync as a recovery/control path;
  - add same-browser tab freshness coordination only if it can remain source-only and account-scoped;
  - never merge guest-origin state into authenticated progress implicitly;
  - never write authenticated progress into guest storage.
- Route to addendum planning only if Stage 46.2 determines the fix needs server-authoritative Daily Solo submissions, new `progress_snapshots` revision/locking fields, new RPCs/tables/RLS policies, broad sync architecture replacement, destructive local cleanup, or strict one-session leases.

## Browser and Resource Observations

- No local dev server was started.
- No browser contexts were opened.
- No Playwright artifacts were created.
- No secrets, private row data, auth state, or local session artifacts were printed.

## Verification

Passed lightweight Stage 46.1 verification:

- `git diff --check`
- Progress CSV shape check using `python3 -S`: `rows=418 columns=[12] last_id=416`
- Non-printing changed/untracked file credential-value scan: `scanned_files=13 credential_value_hits=0 binary_skipped=0`
- Ignored-artifact check: `tracked_files=1100 staged_files=0 forbidden_artifact_hits=0`
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear.
- `git status --short --branch`

## Files Changed By This Stage

- `progress/PROGRESS-STEP-416.md` - created this Stage 46.1 audit progress report.
- `progress/PROGRESS.csv` - appended the matching 12-column progress row for ID 416.

## Blockers and Open Questions

No blockers.

Open questions for Stage 46.2:

- Should Daily Solo upload after every meaningful resume capture or only after valid submitted guesses?
- Should Practice Solo use the same cadence, a debounce, or a lower-frequency route/focus path?
- What conflict policy is acceptable when two signed-in tabs diverge before sync?
- Can same-browser freshness be handled with a source-only channel without writing authenticated progress to guest storage?
- Should the source-only plan explicitly defer stronger server-authoritative Daily anti-cheat to a later storage-contract phase?

## Boundary Confirmation

No source/runtime code, tests, migrations, storage schema changes, destructive local cleanup, deployment/configuration, staging, commits, pushes, PRs, merges, backup workflow execution, spectator presence/count/list work, service worker/push work, gameplay-rule changes, Elo changes, secret/private data exposure, local session artifact exposure, or stable `brrrdle` repository work was performed.

## Next Gate

The next safe action is Phase 46 Stage 46.2 source-only versus storage-contract/Supabase/session-lease decision only.
