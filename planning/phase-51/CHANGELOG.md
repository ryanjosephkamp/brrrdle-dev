# Phase 51 Changelog - Account, Profile, And Player Identity

**Status:** Recovered Review Candidate prepared.
**Phase:** Phase 51.
**Repository:** `brrrdle-dev` only.
**Updated:** 2026-07-09.

## Summary

Phase 51 implemented a bounded account/Profile/player-identity pass while preserving the accepted Phase 50 gameplay baseline. The 2026-07-09 same-phase review follow-up repairs mobile account-menu fit, collapses Profile to one public `Player name`, and adds bounded mobile scroll-weight reductions.

## Implemented

- Added a shared source-only player-name policy in `src/account/profile.ts`.
- Reused that policy from private account profile saves and public-profile display-name normalization.
- Rejected empty, over-length, control-character, private/format-character, emoji, and unsupported-symbol player names before save.
- Kept existing Supabase storage/RPC contracts intact; no remote Supabase, migration, RLS, RPC, table, bucket, or grant work was performed.
- Simplified Profile around one public `Player name` concept.
- Removed the duplicate `Public player name` field, public/private name split copy, and public-profile visibility controls from Profile.
- Saved the one validated `Player name` through existing account-profile and public-profile seams when the public-profile seam is available.
- Kept optional player-card bio and public avatar URL as player-facing details, not a second name.
- Clarified that Settings remains the account-management home for sign out, password, sync, export, reset, and Danger Zone actions.
- Added a compact signed-in account menu for Profile, Settings, and Sign out through existing app handlers.
- Made the signed-in account menu viewport-aware on mobile so it does not clip off-screen.
- Added mobile-only scroll-weight reductions for shadows/backdrop filters on narrow viewports while preserving functionality and focus outlines.
- Left Sound/Focus menu entries deferred because adding them cleanly would reach broader shell state.
- Aligned the shared E2E sign-in helper with the new account-menu accessible label.

## Tests Added Or Updated

- Player-name helper coverage for safe names, max-length rejection, control-character rejection, emoji rejection, and unsupported-symbol rejection.
- Public-profile display-name coverage for the shared player-name policy and clearer unsafe-name errors.
- Auth profile update coverage confirming invalid player names are rejected before touching Supabase.
- Profile, Settings, and account badge render coverage for updated copy, one-name Profile behavior, and menu actions.
- Route/shell focused coverage was rerun because the account badge wiring changed.
- Mobile layout E2E coverage now signs in with a disposable E2E account, opens the account menu at a mobile viewport, and checks viewport bounds/no horizontal overflow.
- Authenticated two-client E2E smoke was rerun after aligning the shared sign-in helper.

## Preserved

- Phase 50 Solo persistence, signed-in Solo cloud persistence, Practice Solo resume/new-game behavior, Home-on-refresh, GO definition dedupe, multiplayer matchmaking, first-turn persistence, private forfeit/cancel behavior, and ranked Practice FIFO remain intentionally untouched.
- Raw auth IDs, private account metadata, emails, tokens, and credentials remain excluded from public profile DTOs and prompts.
- Existing public-profile RPC/storage contracts remain intact; no remote schema, RLS, RPC, table, bucket, or grant changes were performed.
- Original stable `brrrdle` repository remains untouched.

## Deferred

- Admin/backend multiplayer queue visualization remains routed later.
- Minimal-shell handoff preparation remains routed to the future pre-Phase-55 process.
- Design-heavy homepage widgets, broad shell redesign, theme modernization, ShadCN/Impeccable adoption, generated design concepts, and image-generation concept work remain later-phase work.
- Sound/Focus entries inside the account menu are deferred to a later shell phase unless they can be added without broader shell/state changes.
- Git/GitHub backup, PR, merge, deployment, release, and Phase 51 closure remain separately authorized steps.
