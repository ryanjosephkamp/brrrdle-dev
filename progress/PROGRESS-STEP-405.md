# Progress Step 405 - Phase 45 Stage 45.1

**Status:** Completed - Awaiting User Review Before Stage 45.2
**Phase:** Phase 45 - Solo Cloud Progress Boundaries And Mobile Follow-Up
**Stage:** Stage 45.1 - Solo Account/Cloud Persistence Audit And Reproduction
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
**Branch:** `main`
**Started:** 2026-07-05T04:15:26Z
**Completed:** 2026-07-05T04:18:38Z

## Authorization

The user authorized Phase 45 Stage 45.1 read-only Solo account/cloud persistence audit and reproduction using the completed Stage 45.0 protected baseline.

Authorized work includes reading governance, Phase 45 planning/spec/implementation materials, Stage 45.0 progress, current progress records, account/local/cloud persistence surfaces, auth/sign-in/sign-out/sync surfaces, Daily and Practice Solo storage surfaces, relevant tests, Supabase/RLS context as needed, focused read-only/browser/resource checks as needed, creating this progress report and matching 12-column CSV row, and deciding whether Stage 45.2 can remain source-only or requires storage-contract/Supabase addendum planning.

No source/runtime implementation, test implementation, Supabase migration creation or execution, storage schema changes, destructive local cleanup, Vercel/Supabase configuration, deployment, staging, commit, push, PR creation, merge, release, branch deletion, spectator presence/count/list implementation, service worker or push infrastructure work, gameplay-rule change, Elo algorithm change, force-push, secret/private-data/local-artifact exposure, `brrrdle-github-backup` workflow execution, local Codex skill creation/modification, or original stable `brrrdle` repository work is authorized or performed.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Stable repository boundary: preserved; no original stable `brrrdle` repository path is used.
- Current branch: `main`.
- Current `HEAD`: `ff27dd81ecb6b91868fd024247f03950aa04a898`.
- Current `origin/main`: `ff27dd81ecb6b91868fd024247f03950aa04a898`.
- Preserved user-updated checklist: `planning/phase-44/REVIEW-CHECKLIST.md`.

## Audit Scope

Stage 45.1 will audit and, where feasible, reproduce or classify:

- guest Daily Solo OG/GO progress carrying into authenticated state on sign-in;
- authenticated Daily Solo OG/GO progress remaining visible after sign-out;
- sign-in hydration and sign-out rehydration paths;
- guest storage and authenticated cloud sync paths;
- resume-slot ownership and route/cache state;
- `progress_snapshots` assumptions;
- whether Practice Solo OG/GO shares the same persistence-boundary risk;
- whether Stage 45.2 can remain source-only or must create a storage-contract/Supabase addendum.

## Findings

Stage 45.1 classified the Phase 44 manual-review failure as a real Daily Solo persistence-boundary issue. Source inspection found three relevant paths:

- Daily Solo OG and GO still use unscoped browser-local daily session keys. `src/app/games/OgGame.tsx` restores today's Daily OG from `loadDailyOgStoredSession()` and writes every Daily OG session to `saveDailyOgStoredSession()`; `src/app/games/GoGame.tsx` does the same for Daily GO. The underlying storage keys are bare, browser-wide keys: `brrrdle:daily-og:v1` and `brrrdle:daily-go:v1`. They are not scoped by guest/account identity.
- The Phase 44 account-scoped progress guard path is directionally correct but incomplete for Daily Solo. `loadAuthenticatedProgressForScope()` downloads `progress_snapshots` without uploading local guest progress, and `applyScopedProgress()` avoids saving authenticated progress to guest storage. However, Daily Solo game initialization bypasses account-scoped `resumeSlots` and reads the legacy Daily storage keys directly. That can explain guest Daily guesses appearing after sign-in and signed-in Daily guesses appearing after sign-out.
- Manual sync remains a secondary risk surface. `syncGuestProgress()` still uses `mergeGuestProgressIntoCloud()`, and that merge includes `resumeSlots`. If polluted Daily/Practice resume state reaches the authenticated active snapshot before sync, the current sync helper can preserve or upload it. This does not prove a Supabase schema/RLS problem by itself, but it needs source/test hardening during the repair stages.

Practice Solo OG/GO does not use the bare Daily storage keys. It restores from `resumeSlots` in the active account/guest progress snapshot, with account-specific Practice seeds when signed in. It therefore does not share the exact Daily storage-key leak, but it shares the broader resume-slot and sync-merge risk and should remain in the Phase 45 follow-up audit/coverage path.

The current evidence does not prove that `progress_snapshots`, Supabase RLS, or a new Solo progress database table must change. Existing `progress_snapshots` can already store account-owned progress snapshots. Stage 45.2 should therefore remain a source-only-vs-storage-contract decision gate, with a recommended source-only path unless deeper evidence proves that cross-browser signed-in Daily persistence cannot be made reliable with the existing cloud snapshot contract.

No real two-browser authenticated reproduction was run in this read-only stage. A faithful reproduction would require remote auth/session setup or mutation against the linked Supabase project. That is outside the read-only audit boundary. The source-level classification is sufficient to route the next gate without mutating data.

## Verification

Passed lightweight Stage 45.1 verification:

- `git diff --check`
- Progress CSV shape check using `python3 -S`: `rows=407 columns=[12] last_id=405`
- Non-printing changed/untracked file credential-shaped scan: `scanned_files=13 credential_pattern_hits=0 binary_skipped=0`
- Ignored-artifact check, allowing the established tracked `.env.example` template and forbidding real `.env*` secrets/artifacts: `tracked_files=1081 staged_files=0 forbidden_artifact_hits=0`
- Watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear.
- `git status --short --branch`

## Blockers

No blocker to Stage 45.2 documentation/decision work.

Stage 45.3 implementation should remain blocked until Stage 45.2 explicitly records whether the repair is source-only or requires a storage-contract/Supabase addendum.

## Next Gate

The next safe gate is Phase 45 Stage 45.2 storage-contract or source-only decision. The recommended path is to document a source-only repair plan unless Stage 45.2 finds stronger evidence that a database/storage contract change is required.
