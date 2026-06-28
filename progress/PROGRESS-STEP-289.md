# Progress Step 289: Phase 35 Stage 35.6 Auth Copy And Account Management

**Date:** 2026-06-27
**Phase:** Phase 35 - Auth, Profile, Deployment, And Live Identity Readiness
**Stage:** Stage 35.6 - Auth Copy And Account Management
**Status:** Completed - Awaiting User Review Before Next Phase 35 Stage

## Authorization

The user authorized Phase 35 Stage 35.6 only: source-only auth copy, auth redirect hardening, account-management UI, and deployment/Supabase configuration checklist documentation using the completed Stage 35.5 audit baseline.

The prompt does not authorize Profile tab implementation, Vercel or Supabase configuration changes, Supabase migration creation or execution, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- `origin/main`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- Existing user edits to `planning/phase-34/REVIEW-CHECKLIST.md`: preserved.
- Existing uncommitted Phase 35 planning/spec/progress/source/migration artifacts from Stages 35.0 through 35.5 were preserved.

## Implementation

- Hardened magic-link auth by passing a safe current-origin `emailRedirectTo` to Supabase `signInWithOtp` when the browser origin is available.
- Hardened password sign-up by passing the same current-origin `emailRedirectTo` to Supabase `signUp` when available.
- Replaced confusing provider-configuration wording with player-facing auth copy:
  - magic links now tell players to open the link in the same browser;
  - password reset copy refers to a password reset link;
  - account creation copy asks players to check email for a confirmation link before signing in;
  - inline auth copy no longer says email/password auth must be enabled in Supabase.
- Added signed-in change-password access in Settings by opening the existing password update modal from the account-management panel.
- Updated the password modal description so it works for both recovery sessions and ordinary signed-in password changes.
- Documented Vercel Deployment Protection, Supabase Site URL, redirect allowlist, password reset callback, email confirmation, and email-change configuration gates in deployment/Supabase docs.

## Email-Change Decision

Email-change UI was not implemented in this stage. The source already has a low-level Supabase email-change helper, but a truthful player-facing email-change flow depends on verified Supabase confirmation behavior, redirect allowlists, and email templates. This stage therefore documents the external configuration gate and keeps email-change UI deferred until those settings are confirmed.

## Focused Check

Passed:

- `npm run test -- src/account/auth.test.ts src/account/authHelpers.test.ts src/account/AuthModal.test.tsx src/account/Settings.test.tsx src/account/supabaseClient.test.ts`
- Result: 5 files, 72 tests passed.

## Verification

Passed:

- Focused auth/account regression set:
  - `npm run test -- src/account/auth.test.ts src/account/authHelpers.test.ts src/account/AuthModal.test.tsx src/account/Settings.test.tsx src/account/supabaseClient.test.ts`
  - Result: 5 files, 72 tests passed.
- `npm run lint`
- `npm run test`
  - Result: 105 files, 723 tests passed.
- `npm run build`
  - Result: passed with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Python CSV shape check using `python3 -S`
  - Result: `rows=291 columns=[12] last_id=289`.
- non-printing secret/artifact scan
  - Initial over-broad helper matched normal auth/password source and test text in 5 files without printing matched content.
  - Refined non-printing credential-shaped scan result: `scanned_files=33 credential_pattern_hits=0 changed_artifacts=0`.
- ignored-artifact check
  - Result: `tracked_forbidden=0 staged_forbidden=0 staged_files=0 allowed_tracked_env_templates=1`.
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
  - Result: clear.
- `git status --short --branch`

## Boundaries Preserved

No Profile tab implementation, Vercel or Supabase configuration changes, Supabase migration creation or execution, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.

## Next Step

Review Stage 35.6 auth/account-management source and documentation changes. If approved, explicitly authorize the next Phase 35 stage before Profile tab work, final hardening, visual review, manual checklist generation, Vercel/Supabase configuration changes, deployment, Git/GitHub operations, backup workflow execution, or original stable repository work.
