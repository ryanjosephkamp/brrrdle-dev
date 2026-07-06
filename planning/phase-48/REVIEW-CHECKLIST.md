# Phase 48 Manual Review Checklist

**Status**: Ready for manual user review.
**Phase**: Phase 48 - Profile And Multiplayer Contract Simplification.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-06.
**Evidence**: `planning/phase-48/CHANGELOG.md`, `progress/PROGRESS-STEP-442.md`, and local-only visual manifest `test-results/visual-review/phase-48-stage-48-6/manifest.md` when present.

This checklist helps the user manually verify Phase 48 behavior. It does not replace automated tests, E2E coverage, the visual handoff review gate, or final verification.

## How To Use

- Use a safe development/test environment with non-production accounts.
- Do not paste or record secrets, credentials, Supabase keys, Vercel tokens, raw auth IDs, raw emails, private profile data, screenshots, videos, traces, auth state, tokens, or local session artifacts in this checklist.
- Check an item only after the behavior is manually confirmed.
- If an item fails, record the exact non-secret steps separately and stop before relying on this phase as manually reviewed.

## Codex-Assisted Preflight Summary

Automated proof completed:

- Focused Vitest regression coverage for Phase 48 changed surfaces.
- Focused Playwright mobile layout coverage for the mobile Solo auto-scroll follow-up.
- Local-only visual handoff review under `test-results/visual-review/phase-48-stage-48-6/`.
- `npm run lint`.
- `npm run test`.
- `npm run test:e2e`.
- `npm run test:full`.
- `npm run build` with the existing Vite large-chunk advisory.
- `npx tsc -p tsconfig.api.json --noEmit`.
- Repository hygiene checks recorded in `progress/PROGRESS-STEP-442.md`.

Codex visual/browser review:

- Captured the Profile guest/sign-in state.
- Captured the Settings account-management surface.
- Captured the Multiplayer create surface with new custom-code creation hidden.
- Captured mobile Solo gameplay keyboard visibility after the scroll-lag follow-up.
- Captured the private Daily/ranked Daily deferral/addendum review context.

Codex intentionally did not verify:

- Production deployment or release behavior.
- Real user private data or real user accounts.
- Vercel/Supabase configuration changes.
- Private Daily implementation.
- Ranked Daily implementation.
- Server-authoritative Daily submissions, one-active-session leases, forced sign-out, or session security behavior.
- Spectator presence/count/list behavior, service workers, push subscriptions, gameplay-rule changes, or Elo algorithm changes.

## Must Manually Verify

- [ ] Phase 48 visual handoff artifacts remain local-only and ignored.
  - Expected: `test-results/visual-review/phase-48-stage-48-6/` may exist locally, but screenshots/manifests are not tracked or staged.
  - Suggested steps: run `git status --short --ignored test-results/visual-review/phase-48-stage-48-6/` if reviewing locally; confirm artifacts are ignored/local-only.
  - Evidence: `test-results/visual-review/phase-48-stage-48-6/manifest.md`; `progress/PROGRESS-STEP-442.md`.

- [ ] Mobile Solo scrolling still feels usable after the scroll-lag follow-up.
  - Expected: entering Daily/Practice Solo OG/GO on mobile still reaches the gameplay keyboard cleanly, without noticeable extra smooth-scroll stutter from redundant scroll passes.
  - Suggested steps: on a real mobile device, open Solo Daily and Practice OG/GO before and after a valid guess; confirm the keyboard is visible and the automatic scroll does not feel newly laggy.
  - Evidence: `progress/PROGRESS-STEP-436.md`; `progress/PROGRESS-STEP-442.md`; `e2e/layout/mobile-scroll.spec.ts`.

- [ ] Phase 47 mobile Solo GO keyboard visibility remains fixed.
  - Expected: Daily Solo GO pre-guess, Practice Solo GO new-chain entry, Daily Solo GO re-entry, and Practice Solo GO re-entry leave the full keyboard visible and usable.
  - Suggested steps: repeat the Phase 47 GO keyboard checks on real mobile.
  - Evidence: `planning/phase-47/REVIEW-CHECKLIST.md`; `progress/PROGRESS-STEP-428.md`; `progress/PROGRESS-STEP-442.md`.

- [ ] Profile separates private/current-player and opt-in public profile controls clearly.
  - Expected: Profile copy makes it clear which controls affect the current player's private account profile and which controls affect the optional public profile.
  - Suggested steps: sign in with a safe account, open Profile, and inspect the private profile and public profile sections.
  - Evidence: `progress/PROGRESS-STEP-439.md`; `planning/phase-48/CHANGELOG.md`.

- [ ] Profile Save/Cancel actions are not confused with Sign out.
  - Expected: Profile editing uses Save/Cancel for profile changes; Sign out is not placed inside the Profile editor action row.
  - Suggested steps: open Profile while signed in, edit a safe non-secret profile field, and confirm the action row does not include Sign out.
  - Evidence: `progress/PROGRESS-STEP-439.md`.

- [ ] Settings Account management remains the clear home for Sign out and account actions.
  - Expected: Settings Account management contains Sign out, password, sync, progress export/reset, and gated account actions; the copy explains this responsibility clearly.
  - Suggested steps: open Settings while signed in and inspect Account management.
  - Evidence: `progress/PROGRESS-STEP-439.md`.

- [ ] Public avatar URL and private avatar upload are not presented as the same thing.
  - Expected: Profile copy explains that private avatar upload is current-player/private, while public avatar URL is opt-in public profile display and should not use account-identifying URLs.
  - Suggested steps: inspect Profile avatar-related fields while signed in.
  - Evidence: `progress/PROGRESS-STEP-439.md`.

- [ ] New custom-code multiplayer creation is hidden.
  - Expected: the Multiplayer create form no longer offers `Custom code` as a new match type.
  - Suggested steps: open Multiplayer create/setup surfaces and inspect available match-type options.
  - Evidence: `progress/PROGRESS-STEP-440.md`.

- [ ] Legacy custom-code games remain readable and unrated if encountered.
  - Expected: existing custom-code game rows can still be parsed/displayed as legacy unrated games; postgame setup maps to supported unranked Practice setup rather than hidden custom-code creation.
  - Suggested steps: if a safe legacy custom-code test row exists, inspect it without exposing IDs or private data; otherwise rely on focused regression coverage.
  - Evidence: `progress/PROGRESS-STEP-440.md`.

- [ ] Private Practice requests still work as the supported private-match path.
  - Expected: authenticated players with active public profiles can still create/receive/accept private Practice requests; accepted private matches remain fresh, unranked, Practice-only games.
  - Suggested steps: use safe test accounts with active public profiles and run a subset of private Practice request creation/acceptance manually if practical.
  - Evidence: `progress/PROGRESS-STEP-440.md`; `progress/PROGRESS-STEP-442.md`.

- [ ] Private Daily remains deferred.
  - Expected: the app does not expose or implement private Daily requests; the decision is documented behind the Phase 48 addendum.
  - Suggested steps: inspect Daily/private request surfaces and confirm no private Daily creation path is introduced.
  - Evidence: `planning/specs/phase-48/PHASE-48-PRIVATE-DAILY-AND-RANKED-DAILY-CONTRACT-ADDENDUM-2026-07-06.md`; `progress/PROGRESS-STEP-441.md`.

- [ ] Ranked Daily remains deferred.
  - Expected: the app does not expose or implement ranked Daily; ranked Practice remains the ranked multiplayer surface.
  - Suggested steps: inspect Daily Multiplayer and ranked queue surfaces; confirm Daily ranked is not available as a playable ranked flow.
  - Evidence: `planning/specs/phase-48/PHASE-48-PRIVATE-DAILY-AND-RANKED-DAILY-CONTRACT-ADDENDUM-2026-07-06.md`; `progress/PROGRESS-STEP-441.md`.

- [ ] Public/private profile privacy remains intact.
  - Expected: public surfaces do not expose private auth metadata, raw auth IDs, private emails, tokens, private progress, private settings, or local session artifacts.
  - Suggested steps: inspect Profile, public profile, Leaderboards, private request cards, and participant labels with safe test accounts.
  - Evidence: `progress/PROGRESS-STEP-437.md`; `progress/PROGRESS-STEP-438.md`; `progress/PROGRESS-STEP-442.md`.

## Optional Nice-To-Check

- [ ] Review the local-only visual screenshots if available.
  - Expected: each screenshot in `test-results/visual-review/phase-48-stage-48-6/manifest.md` visually matches its scenario description.
- [ ] Try Profile and Settings at mobile width.
  - Expected: the clarified account-management layout remains readable and does not introduce horizontal overflow.
- [ ] Try Multiplayer setup at mobile width.
  - Expected: match-type options remain readable and no custom-code creation option appears.
- [ ] Recheck same-account multi-tab/browser behavior.
  - Expected: Phase 46 automatic sync/freshness remains improved, while strict one-active-session enforcement remains deferred.
- [ ] Recheck signed-out guest display boundaries.
  - Expected: Phase 47 guest/account display-boundary repairs remain intact after Phase 48 profile/account copy changes.

## Preserved Invariants To Spot-Check

- [ ] Phase 47 mobile Solo GO keyboard visibility and guest/account display-boundary repairs remain intact.
- [ ] Phase 46 automatic signed-in Solo sync/freshness, no implicit guest-to-account transfer, no authenticated progress writes to guest storage, and Solo Overview Resume-only cards remain intact.
- [ ] Phase 45 Daily/Practice Solo account-boundary repairs, Profile embedded sign-in order, and mobile Solo scaling follow-up remain intact.
- [ ] Phase 44 account-scoped local-state repairs, private Practice request eligibility, sign-in modal order, header chip removal, Stats placement, Help placeholder, and keyboard centering remain intact.
- [ ] Phase 43 ranked queue fairness, shell/Home cleanup, Solo/Practice Multiplayer density cleanup, notification comfort, back-to-top behavior, and spectator comfort remain intact.
- [ ] Phase 42 public stats, admin dashboard, Help/tutorial, browser grant/RLS repairs, and ranked queue flashing repair remain intact.
- [ ] Phase 41 multiplayer reliability repairs and real E2E harness behavior remain intact.
- [ ] Phase 40 public profile route/card, clickable safe identity, and private Practice matchmaking boundaries remain intact.
- [ ] Phase 38 public/guest Practice Live discovery, read-only public spectation, Daily spectator exclusion, and false-only mutation boundaries remain intact.
- [ ] Daily Multiplayer remains claim-safe, answer-separated, no-clock, UTC-day keyed, five-letter only, and excluded from public/guest spectator discovery.
- [ ] Elo algorithm, scoring, timeout, forfeit, GO transition, solved-row hold, keyboard state, Solo Daily fixed-five behavior, and Practice 2-35 word-length rules remain unchanged.

## Known Deferred / Not In Scope

- Private Daily implementation.
- Ranked Daily implementation.
- Server-authoritative Daily submissions.
- Stored profile model consolidation, public profile RPC/table changes, RLS/grant changes, and profile moderation/visibility contract changes.
- Removing stored legacy `customGameCode` support or deleting custom lobby compatibility.
- New invitation, inbox, social, or notification delivery contracts.
- Strict one-active-session enforcement, session leases, heartbeats, forced sign-out, and stronger anti-cheat security work.
- Broad mobile shell, top-tab, route navigation, side-dock, and mobile performance overhaul.
- Configurable Home widgets and private request inbox widgets.
- Live, Active Games, and Home spectator preview cards.
- UTC/local timestamp policy changes.
- Notification redesign, rival-name context, and ranked/unranked notification context upgrades.
- Admin queue/lobby observability dashboard.
- Full social inbox/mailbox work and full notification-center redesign.
- Rich tutorial media and full Help rebuild.
- EXP, coin, collectible, progression HUD, Focus Mode, compact navigation, and broader mobile shell work.
- Theme proposal modernization and full concrete theme work.
- Draw-by-repetition or other gameplay-rule changes.
- Spectator presence, aggregate spectator counts, identity-bearing spectator lists, spectator sorting, and viewer tracking.
- Public/guest spectation contract changes.
- Service workers, push subscriptions, background push, production deployment, and release.
- Elo algorithm changes.

## Evidence

- `planning/phase-48/PLANNING-BRIEF.md`
- `planning/specs/phase-48/PHASE-48-PROFILE-AND-MULTIPLAYER-CONTRACT-SIMPLIFICATION-SPEC-2026-07-06.md`
- `planning/specs/phase-48/PHASE-48-PRIVATE-DAILY-AND-RANKED-DAILY-CONTRACT-ADDENDUM-2026-07-06.md`
- `planning/phase-48/IMPLEMENTATION-PLAN.md`
- `planning/phase-48/CHANGELOG.md`
- `progress/PROGRESS-STEP-432.md` through `progress/PROGRESS-STEP-442.md`
- `test-results/visual-review/phase-48-stage-48-6/manifest.md` when present locally.

## Review Result

- [ ] Manual review complete.
- [ ] Any failed item has a follow-up prompt prepared before Phase 49 planning or additional implementation.
