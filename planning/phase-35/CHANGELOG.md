# Phase 35 Changelog

**Status**: Completed locally pending Git handoff.
**Phase**: Auth, Profile, Deployment, And Live Identity Readiness.
**Repository**: `brrrdle-dev` only.

## Summary

Phase 35 repaired the persistent ranked Live identity regression, clarified auth/deployment readiness, improved player-facing auth/account management, and moved current-player profile editing into a first-class Profile tab. It added a reviewed ranked Live identity migration/RLS baseline, source hydration for ranked participant and spectator names, current-origin auth redirect hardening, signed-in password-change access, configuration-gated email-change documentation, Settings responsibility cleanup, final visual review, and a manual review checklist.

## Completed

- Planned and specified Phase 35 around auth, profile, deployment, and ranked Live identity readiness.
- Preserved existing user edits to `planning/phase-34/REVIEW-CHECKLIST.md`.
- Audited the ranked Live participant/spectator safe-name regression from the user-provided screenshots and confirmed a spectator RPC gap required migration/RLS addendum planning.
- Added the Phase 35 ranked Live identity migration/RLS addendum.
- Created and applied exactly one additive Supabase migration for authenticated Live spectator safe profile projection:
  - `supabase/migrations/20260627230835_phase35_ranked_live_identity_spectator_profiles.sql`.
- Kept authenticated spectator profile payloads limited to safe profile fields: `displayName`, `avatarUrl`, `accentColor`, and derived `initials`.
- Preserved public/guest spectation deferral and participant-only identity boundaries.
- Repaired ranked Live source hydration so creator, joined-player, and signed-in spectator perspectives prefer safe profile/public names when available.
- Kept `You` limited to the current viewer's own participant context and generic `Rival`, `Player one`, and `Player two` labels as true fallbacks only.
- Audited the user-provided Vercel login screenshot and routed it as likely Vercel Deployment Protection or preview-access behavior rather than an in-app Supabase auth screen.
- Hardened magic-link and password sign-up source redirects by passing a safe current-origin `emailRedirectTo` when available.
- Improved auth copy for magic links, password sign-up, sign-in, confirmation, and password reset so it stays player-facing.
- Added signed-in change-password access through the existing password update modal path.
- Documented Vercel Deployment Protection, Supabase Site URL, redirect allowlists, email confirmation, and email-change configuration gates in deployment/Supabase docs.
- Added a first-class current-player `Profile` tab between Words and Settings.
- Reused the existing private/public profile editor as a route-safe `ProfileEditor` component.
- Routed top-right account affordances to the Profile tab while retaining the compact account modal wrapper.
- Updated Settings account-management copy so Settings no longer pretends to own full profile editing.
- Corrected stale About-panel ranked transparency copy so canonical five-minute timed ranked Practice is no longer described as deferred or unrated.
- Added focused tests for ranked Live identity hydration, auth redirect/copy/account management, Profile tab routing, Settings cleanup, and the final ranked transparency copy.
- Ran local visual handoff review for changed Phase 35 user-visible surfaces.
- Added the Phase 35 manual review checklist.

## Preserved

- Phase 34 Live/Lobby/notification/Active Games behavior.
- Phase 33 timed ranked Practice behavior, display-only rank bands, public leaderboard cleanup, and timed ranked E2E protections.
- Phase 32 rematch lifecycle, queue/lobby auto-routing, participant identity routing, account avatar accent propagation, no-comma rating display, and E2E protections.
- Phase 31 Practice-safe postgame behavior and Daily exclusions.
- Phase 30 public leaderboard display-only authority and privacy boundaries.
- Phase 29 public profile default-private and moderation boundaries.
- Phase 28 authenticated Live read-only spectator behavior.
- Phase 27 trusted ranked Practice foundations.
- Daily Multiplayer claim safety, answer separation, no-clock behavior, UTC-day keying, and five-letter invariants.
- Existing scoring, timeout, forfeit, rating/Elo formula, GO transition, solved-row hold, keyboard-state, Solo Daily fixed-five behavior, Practice 2-35 word-length behavior, gameplay rules, and Elo algorithm.

## Deferred

- Vercel Deployment Protection setting changes, Supabase dashboard configuration changes, email template changes, production deployment, and release.
- Email-change UI until Supabase email confirmation, redirect allowlists, and email templates are verified.
- Avatar upload size increase and public avatar policy expansion.
- Public profile browsing, clickable rival profiles, social/profile pages for other players, direct player match requests, private matchmaking/custom-code expansion, and request/mailbox flows.
- Public/guest spectation, spectator presence lists/counts, spectator sorting, and public projection expansion.
- Leaderboard tab and Stats split, routed to Phase 36.
- Gameplay auto-scroll and browser back/forward navigation, routed to Phase 37.
- Public site stats, private developer dashboard, onboarding/help/tutorials, theme modernization, service workers, push subscriptions, gameplay-rule changes, and Elo algorithm changes.

## Verification

Final Stage 35.8 verification is recorded in `progress/PROGRESS-STEP-291.md`.
