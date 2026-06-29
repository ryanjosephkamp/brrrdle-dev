# Phase 35 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 35 - Auth, Profile, Deployment, And Live Identity Readiness.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-27.
**Evidence**: `planning/phase-35/CHANGELOG.md`, `progress/PROGRESS-STEP-291.md`, and local-only visual manifest `test-results/visual-review/phase-35-stage-35-8/manifest.md` when present.

This checklist helps the user manually verify Phase 35 behavior. It does not replace automated tests, Supabase migration probes, real E2E, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment with non-production accounts.
- Do not paste or record secrets, tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Must Manually Verify

- [x] About -> ranked transparency copy matches Phase 33.
  - Expected: About no longer says timed Practice ranked is entirely deferred or unrated; it distinguishes canonical five-minute timed ranked from unsupported timers.
  - Suggested steps: open About Brrrdle and inspect the ranked transparency section.
  - Evidence: `progress/PROGRESS-STEP-291.md`.
- [x] Settings no longer pretends to own full profile editing.
  - Expected: Settings keeps preferences, notifications, sync/account status, password access, and gated account actions; full profile editing points to the Profile tab.
  - Suggested steps: open Settings as a signed-in player and inspect Account management and Danger Zone areas.
  - Evidence: `progress/PROGRESS-STEP-290.md`; visual scenario `Settings account management`.

- [x] The top-right account badge remains useful without duplicating the full profile surface awkwardly.
  - Expected: signed-in account badge actions route to the Profile tab; signed-out account badge actions open sign-in.
  - Suggested steps: click the account badge when signed out and signed in.
  - Evidence: `progress/PROGRESS-STEP-290.md`.

- [x] The Profile tab owns full private/public profile editing.
  - Expected: signed-in players can manage private profile fields and public profile visibility/content from the Profile tab without changing public-profile privacy defaults.
  - Suggested steps: sign in with a safe test account, open Profile, inspect private and public profile sections, and confirm public visibility remains opt-in.
  - Evidence: `progress/PROGRESS-STEP-290.md`.

- [x] The current-player Profile tab is visible and correctly placed.
  - Expected: the main navigation includes `Profile` between `Words` and `Settings`.
  - Suggested steps: inspect the main navigation on desktop and mobile-width views.
  - Evidence: `progress/PROGRESS-STEP-290.md`; visual scenario `Profile tab route`.

- [x] Email-change UI remains gated rather than overpromised.
  - Expected: Settings explains that email changes remain gated until Supabase email confirmation and redirect settings are verified; no unfinished email-change form is exposed.
  - Suggested steps: open Settings as a signed-in player and inspect Account management copy.
  - Evidence: `progress/PROGRESS-STEP-289.md`; `progress/PROGRESS-STEP-290.md`.

- [x] Signed-in password change is discoverable.
  - Expected: a signed-in player can open Settings and use `Change password`; the password modal works for a normal signed-in password update path.
  - Suggested steps: sign in with a safe test account, open Settings, click `Change password`, and inspect the modal.
  - Evidence: `progress/PROGRESS-STEP-289.md`.

- [x] Magic-link redirects still require external Vercel/Supabase settings to be correct.
  - Expected: source now sends a safe current-origin redirect target where supported, but Vercel Deployment Protection and Supabase Site URL/allowed redirect settings still control deployed/preview behavior.
  - Suggested steps: review `docs/deployment.md` and `docs/supabase.md`; if testing a protected preview, confirm whether Vercel login appears before the app loads.
  - Evidence: `progress/PROGRESS-STEP-288.md`; `progress/PROGRESS-STEP-289.md`.

- [x] Magic-link and account-creation copy is player-facing.
  - Expected: magic-link, sign-up, reset, and confirmation messages do not expose confusing provider-configuration wording such as "if confirmations are enabled."
  - Suggested steps: open the auth modal, try the magic-link and email/password account flows using safe test addresses, and inspect copy.
  - Evidence: `progress/PROGRESS-STEP-289.md`; visual scenario `Auth modal copy`.

- [x] Public/guest spectation remains unavailable.
  - Expected: signed-out users cannot spectate Live games and are prompted to sign in; signed-in spectator visibility remains authenticated and read-only.
  - Suggested steps: open Multiplayer -> Live signed out, then signed in as a nonparticipant, and compare behavior.
  - Evidence: `progress/PROGRESS-STEP-286.md`; `progress/PROGRESS-STEP-291.md`.

- [x] Signed-in nonparticipant Live spectator cards show safe player names when available.
  - Expected: a third signed-in account sees safe player names for both players on eligible Live spectator cards when those profiles are active and public; generic `Player one` / `Player two` labels appear only as fallbacks.
  - Suggested steps: with a third signed-in account, open Multiplayer -> Live while two other test users have an active eligible game and inspect the matchup copy.
  - Evidence: `progress/PROGRESS-STEP-286.md`; `progress/PROGRESS-STEP-287.md`; `progress/PROGRESS-STEP-291.md`.

- [x] Ranked Live participant names use safe public/profile names from the joined-player perspective.
  - Expected: when the joined player opens Multiplayer -> Live, the creator name uses the creator's safe public/profile name when available; `Rival` appears only if safe identity is genuinely unavailable.
  - Suggested steps: open the same ranked Practice game as the joined player and inspect Multiplayer -> Live.
  - Evidence: `progress/PROGRESS-STEP-287.md`; `progress/PROGRESS-STEP-291.md`.

- [x] Ranked Live participant names use safe public/profile names from the creator perspective.
  - Expected: when the game creator opens Multiplayer -> Live, the rival name uses the rival's safe public/profile name when available; `You` appears only for the creator's own participant context.
  - Suggested steps: create or resume a ranked Practice game with two signed-in public-profile test accounts, open Multiplayer -> Live as the creator, and inspect the card labels.
  - Evidence: `progress/PROGRESS-STEP-287.md`; `progress/PROGRESS-STEP-291.md`.

- [x] Phase 35 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-35-stage-35-8/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-35-stage-35-8/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `progress/PROGRESS-STEP-291.md`.


## Optional Nice-To-Check

- [ ] Review Phase 35 visual screenshots if the local artifact directory is available.
  - Expected: each screenshot in `test-results/visual-review/phase-35-stage-35-8/manifest.md` visually matches its scenario description.

- [ ] Try Profile and Settings on a narrow/mobile viewport.
  - Expected: Profile, auth, Settings account management, and About transparency copy remain readable and do not overlap.

- [ ] Try a private public-profile state.
  - Expected: a private public profile does not appear to other players or spectators as a public identity source.

- [ ] Re-check the Vercel magic-link flow on the actual preview/deployed URL.
  - Expected: if a Vercel login screen still appears, that remains a deployment-protection/configuration issue rather than a brrrdle in-app auth screen.

## Preserved Invariants To Spot-Check

- [ ] Phase 34 Live/Lobby/notification/Active Games behavior remains intact.
- [ ] Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections remain intact.
- [ ] Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections remain intact.
- [ ] Phase 31 postgame boundaries remain intact: direct rematches are Practice-only and do not bypass ranked queue or Daily claim rules.
- [ ] Phase 30 public leaderboards remain display-only and non-authoritative.
- [ ] Phase 29 public profile privacy remains default-private and moderated; raw auth IDs/emails/private metadata are not exposed.
- [ ] Phase 28 authenticated Live spectator behavior remains read-only.
- [ ] Phase 27 ranked Practice still uses trusted queue/finalization/settlement paths.
- [ ] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, and five-letter only.
- [ ] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.

## Known Deferred / Not In Scope

- Vercel Deployment Protection setting changes, Supabase dashboard configuration changes, email template changes, production deployment, and release.
- Email-change UI until Supabase email confirmation, redirect allowlists, and email templates are verified.
- Avatar upload size increase and public avatar policy expansion.
- Public profile browsing, clickable rival profiles, social/profile pages for other players, direct player match requests, custom-code private matchmaking expansion, and request/mailbox flows.
- Public/guest spectation, spectator presence lists/counts, spectator sorting, and public projection expansion.
- Leaderboard tab and Stats split, routed to Phase 36.
- Gameplay auto-scroll and browser back/forward navigation, routed to Phase 37.
- Public site stats, private developer dashboard, onboarding/help/tutorials, theme modernization, service workers, push subscriptions, gameplay-rule changes, and Elo algorithm changes.

## Evidence

- `planning/phase-35/PLANNING-BRIEF.md`
- `planning/specs/phase-35/PHASE-35-AUTH-PROFILE-DEPLOYMENT-AND-LIVE-IDENTITY-READINESS-SPEC-2026-06-27.md`
- `planning/specs/phase-35/PHASE-35-RANKED-LIVE-IDENTITY-MIGRATION-RLS-ADDENDUM-2026-06-27.md`
- `planning/phase-35/IMPLEMENTATION-PLAN.md`
- `planning/phase-35/CHANGELOG.md`
- `progress/PROGRESS-STEP-280.md` through `progress/PROGRESS-STEP-291.md`
- `test-results/visual-review/phase-35-stage-35-8/manifest.md` when present locally.

## Review Result

- [ ] Manual review complete.
- [ ] Any failed item has a follow-up prompt prepared before Phase 35 Git handoff or additional implementation.
