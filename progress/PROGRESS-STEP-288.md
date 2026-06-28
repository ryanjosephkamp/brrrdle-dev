# Progress Step 288: Phase 35 Stage 35.5 Auth Redirect Audit

**Date:** 2026-06-27
**Phase:** Phase 35 - Auth, Profile, Deployment, And Live Identity Readiness
**Stage:** Stage 35.5 - Auth Redirect Audit And Scope Lock
**Status:** Completed - Awaiting User Review Before Stage 35.6 Auth Copy And Account Management

## Authorization

The user authorized Phase 35 Stage 35.5 only: Vercel/Supabase auth redirect audit and scope lock. The pass includes reading governance, Phase 35 planning/spec/implementation materials, Stage 35.4 progress, auth/account/profile/deployment surfaces, Supabase auth redirect assumptions, Vercel deployment-protection context, the user-provided Vercel login screenshot when available, creating this progress report and matching CSV row, and deciding the safest next implementation path.

The prompt does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, Profile tab implementation, or original stable repository work.

## Repository State

- Repository used: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Original stable repository: not used.
- Branch at start: `main`
- `HEAD`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- `origin/main`: `41f37c3a3734be71a2078a60f7aece46543db5fb`
- Existing user edits to `planning/phase-34/REVIEW-CHECKLIST.md`: preserved.

## Audit Inputs

- Reviewed `/Users/noir/Desktop/Screenshot 2026-06-25 at 5.15.19 PM.png`.
- Reviewed repository deployment and Supabase docs.
- Reviewed auth source surfaces:
  - `src/account/auth.ts`
  - `src/account/AuthModal.tsx`
  - `src/account/AuthPanel.tsx`
  - `src/account/PasswordResetModal.tsx`
  - `src/account/Settings.tsx`
  - `src/account/dangerZone.ts`
  - `src/account/supabaseClient.ts`
  - `src/app/App.tsx`
- Reviewed focused auth/account tests.
- Checked local Vercel project metadata availability without printing secrets. `.vercel/project.json` is absent, so actual Vercel dashboard protection settings cannot be confirmed from the repository.
- Consulted public vendor documentation for Vercel Authentication deployment protection and Supabase auth redirect APIs without changing configuration.

## Findings

### Vercel Login Screenshot

The screenshot is a Vercel-owned login screen, not a brrrdle auth modal or Supabase-hosted auth UI. It is most consistent with Vercel Authentication / Deployment Protection or protected preview access intercepting the URL before the brrrdle app route can load.

This means the observed screen is likely deployment-access related rather than an in-app Supabase authentication bug. If the magic link redirects to a protected preview deployment, users who are not allowed through Vercel protection will see Vercel login before any app-side callback, session handling, or profile/account code can run.

Because the local checkout has no `.vercel/project.json` and this pass did not authorize Vercel dashboard or CLI configuration reads/changes, the exact project setting remains a manual/external confirmation item.

### Supabase Magic-Link Redirect Behavior

`sendMagicLink` currently calls:

- `client.auth.signInWithOtp({ email })`

It does not pass an explicit `emailRedirectTo` or equivalent redirect target. Therefore, magic-link behavior depends on Supabase project settings, email template/link defaults, and the current deployment URL assumptions rather than a source-defined brrrdle callback target.

Recommended source-level hardening for the next implementation stage:

- add a small safe redirect-target helper for magic links, parallel to the existing password-reset helper;
- call `signInWithOtp` with an explicit current-origin redirect when available;
- keep the redirect URL constrained to the current app origin;
- add focused tests proving the redirect option is passed and does not expose secrets.

This will not bypass Vercel Deployment Protection. It only prevents accidental Supabase default/Site URL drift from sending users to an unintended app URL.

### Password Reset Redirect Behavior

Password reset is already stronger than magic link:

- `sendPasswordResetEmail` builds an explicit redirect URL containing `auth_action=reset-password`.
- `isPasswordResetUrl` detects both `auth_action=reset-password` query state and Supabase recovery hash state.
- `App.tsx` opens `PasswordResetModal` on `PASSWORD_RECOVERY` or authenticated reset URL detection.

This path is suitable for source-level copy/account-management work next. It still depends on Supabase allowed redirect URL settings for deployed URLs.

### Account Creation Copy

`handleSignUpWithPassword` currently reports:

- `Check your email to confirm your account, if email confirmation is enabled.`

The user's confusion is valid. That copy exposes provider configuration uncertainty instead of giving a player-facing outcome. The next source stage should replace it with clearer copy that explains that the user may need to check email before signing in and that password sign-up can create or start account confirmation depending on the configured Supabase auth policy.

### Password And Email Management Readiness

- `updatePassword` exists and is currently wired to the recovery modal, not to normal signed-in account management.
- `requestEmailChange` exists in `dangerZone.ts` but is not wired into a normal player-facing flow.
- Settings currently describes email changes/password resets as Supabase user-management flows, but the player-facing account-management UI is still incomplete.
- Email change should be treated as source-implementable only with explicit copy that confirmation and delivery depend on Supabase email settings and redirect allowlists. If the next stage cannot represent that truthfully in source/tests, it should document an external configuration gate instead of overpromising.

## Scope Decision

Stage 35.6 should be source-only auth copy and account-management implementation plus a deployment/auth configuration checklist update. It should:

- harden magic-link redirects with a current-origin redirect target where available;
- improve account creation, magic-link, password reset, and auth status copy;
- add signed-in change-password access using the existing `updatePassword` helper;
- add email-change UI only if it can truthfully describe Supabase confirmation/redirect dependencies and remain source-only;
- update deployment/Supabase docs with a non-secret checklist for Vercel Deployment Protection and Supabase Site URL/redirect allowlists.

Actual Vercel protection changes, Supabase dashboard redirect allowlist edits, email template changes, production deployment, and release remain separate explicit configuration/deployment gates.

Profile tab work should remain deferred until after Stage 35.6 completes the auth/account-management source pass, because both the Profile tab and auth management touch account UX and `App.tsx`-level routing/navigation.

## Focused Check

Passed:

- `npm run test -- src/account/auth.test.ts src/account/authHelpers.test.ts src/account/AuthModal.test.tsx src/account/supabaseClient.test.ts src/account/Settings.test.tsx`
- Result: 5 files, 68 tests passed.

## Verification

Passed:

- `git diff --check`
- Python CSV shape check using `python3 -S`
  - Result: `rows=290 columns=[12] last_id=288`.
- non-printing secret/artifact scan
  - Result: `scanned_files=24 credential_pattern_hits=0 changed_artifacts=0`.
- ignored-artifact check
  - Result: `tracked_forbidden=0 staged_forbidden=0 staged_files=0 allowed_tracked_env_templates=1`.
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`
  - Result: clear.
- `git status --short --branch`

## Boundaries Preserved

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel or Supabase configuration changes, deployment, staging, commits, pushes, PRs, merges, releases, branch deletion, public/guest spectation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, Profile tab implementation, or original stable repository work was performed.

## Next Step

Review Stage 35.5 auth redirect audit evidence. If approved, explicitly authorize Stage 35.6 source-only auth copy and account-management implementation plus deployment/Supabase configuration checklist documentation before Profile tab work, external Vercel/Supabase configuration changes, deployment, Git/GitHub operations, backup workflow execution, or original stable repository work.
