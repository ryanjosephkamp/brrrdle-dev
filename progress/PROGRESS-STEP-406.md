# Progress Step 406 - Phase 45 Stage 45.2

**Status:** Completed - Awaiting User Review Before Stage 45.3
**Phase:** Phase 45 - Solo Cloud Progress Boundaries And Mobile Follow-Up
**Stage:** Stage 45.2 - Storage-Contract Or Source-Only Decision
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-05T04:22:01Z
**Completed:** 2026-07-05T04:22:01Z

## Authorization

The user authorized Phase 45 Stage 45.2 documentation/planning decision work only: decide whether the Solo account/cloud persistence repair can remain source-only or requires a storage-contract/Supabase addendum.

Authorized work included confirming repository state and stable-repo boundary, preserving the user-updated Phase 44 review checklist, reading Phase 45 planning/spec/implementation materials and Stage 45.1 findings, creating this progress report and the matching 12-column CSV row, recording the source-only or storage-contract decision, and running lightweight documentation verification.

No source/runtime implementation, test implementation, Supabase migration creation or execution, storage schema change, destructive local cleanup, Vercel/Supabase configuration, deployment, staging, commit, push, PR creation, merge, release, branch deletion, spectator presence/count/list implementation, service worker or push infrastructure work, gameplay-rule change, Elo algorithm change, secret/private-data/local-artifact exposure, `brrrdle-github-backup` workflow execution, local Codex skill creation/modification, or original stable `brrrdle` repository work was authorized or performed.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Stable repository boundary: preserved; no original stable `brrrdle` repository path was used.
- Current branch: `main`.
- Current `HEAD`: `ff27dd81ecb6b91868fd024247f03950aa04a898`.
- Current `origin/main`: `ff27dd81ecb6b91868fd024247f03950aa04a898`.
- Preserved user-updated checklist: `planning/phase-44/REVIEW-CHECKLIST.md`.

## Decision

Stage 45.2 records a **source-only repair decision** for the next implementation gate.

No storage-contract/Supabase addendum is required before Stage 45.3 based on current evidence. Stage 45.1 showed that the failed Daily Solo OG/GO account-boundary behavior is explained by source/local-storage boundaries:

- Daily OG and GO still restore from and save to unscoped bare browser-local keys: `brrrdle:daily-og:v1` and `brrrdle:daily-go:v1`.
- Those bare keys bypass account-scoped progress ownership and can leak Daily state across sign-in and sign-out.
- Existing authenticated hydration already downloads `progress_snapshots` and does not upload guest progress by itself.
- Existing `progress_snapshots` can already store account-owned whole-progress snapshots, including resume slots, without a schema/RLS change.
- Manual sync and resume-slot merge behavior remain secondary source hardening surfaces, but that does not prove a database contract gap.

Because the issue can be addressed by routing Daily Solo persistence through account-scoped progress state, remounting/re-keying visible Solo sessions by active progress owner where needed, and hardening sync/resume-slot merge behavior, Stage 45.3 may proceed source/test-only.

## Source-Only Repair Boundary For Stage 45.3

Stage 45.3 should implement the smallest safe source/test repair that satisfies these boundaries:

1. **Account/scope-aware Daily Solo persistence**
   - Daily Solo OG/GO must not restore today's signed-in or signed-out play from unscoped bare browser-local Daily keys.
   - Daily Solo OG/GO should use account-scoped active progress/resume capture for current Daily progress, or an equivalent source-only owner-aware adapter around the existing storage helpers.
   - Past Daily behavior may keep its date-keyed compatibility path only if it is proven not to leak current account/guest state; otherwise it should be explicitly scoped or routed for later review.

2. **No implicit guest-to-account transfer**
   - Signing in must hydrate from account-owned cloud progress or account-safe defaults.
   - Browser guest Daily guesses must not become authenticated account guesses merely because sign-in occurred.
   - Manual sync must not merge guest-origin resume slots into authenticated progress unless a future explicit transfer path is separately approved.

3. **No signed-in progress visible after sign-out**
   - Signing out must rehydrate guest-safe local state.
   - Mounted Daily Solo OG/GO components, selected Solo route state, resume slots, and cached view state must not leave account-owned guesses visible to the guest surface after sign-out.

4. **Cross-browser authenticated Daily loading through existing `progress_snapshots`**
   - Authenticated Daily Solo progress should load from the signed-in account's `progress_snapshots` payload where available.
   - If no cloud progress exists, the authenticated account should see a fresh account-safe default, not browser guest Daily guesses.
   - If cloud load fails, the app should fail safe and visible rather than silently adopting guest Daily state as account-owned state.

5. **Manual sync/resume-slot hardening**
   - `syncGuestProgress()` and `mergeGuestProgressIntoCloud()` usage should be audited during implementation so source-owned authenticated sync cannot preserve polluted guest resume slots.
   - Any desired guest-to-account transfer UX remains out of scope unless separately authorized.

## Addendum Decision

No addendum was created.

A storage-contract/Supabase addendum remains a stop condition for Stage 45.3 if implementation proves that the repair requires any of the following:

- a new Supabase table, column, RPC, trigger, or RLS policy;
- a changed `progress_snapshots` storage contract;
- a required local storage key migration;
- destructive local cleanup;
- new guest-to-account transfer semantics;
- broad direct table grants or private data exposure;
- a privileged server/service-role write path;
- gameplay-rule, Daily claim, or Elo changes.

## Practice Solo Routing

Practice Solo OG/GO does not share the exact unscoped bare Daily key leak because it restores from account/guest `resumeSlots` and account-specific Practice seeds. It should remain in Stage 45.4 as a follow-up audit/repair target for shared resume-slot and sync-merge risk, but Stage 45.3 should focus on Daily Solo first.

## Verification

Passed lightweight Stage 45.2 verification:

- `git diff --check`
- Progress CSV shape check using `python3 -S`: `rows=408 columns=[12] last_id=406`
- Non-printing changed/untracked file credential-shaped scan: `scanned_files=14 credential_pattern_hits=0 binary_skipped=0`
- Ignored-artifact check, allowing the established tracked `.env.example` template and forbidding real `.env*` secrets/artifacts: `tracked_files=1081 staged_files=0 forbidden_artifact_hits=0`
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear.
- `git status --short --branch`

## Blockers

No blocker to Stage 45.3 source/test-only Daily Solo account-boundary repair.

## Next Gate

The next safe gate is Phase 45 Stage 45.3 Daily Solo account-boundary repair, source/test-only, with focused regression coverage and stop conditions for any newly proven storage-contract/Supabase requirement.
