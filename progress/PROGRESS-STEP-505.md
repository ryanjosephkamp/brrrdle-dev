# Progress Step 505 - Phase 51 Account/Profile Mobile Scroll Review Follow-Up

**Status**: Completed - Phase 51 Account/Profile Mobile Scroll Recovered Review Candidate Prepared.
**Phase**: Phase 51 same-phase manual review follow-up.
**Repository**: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Date**: 2026-07-09.

## Summary

The user authorized the bounded Phase 51 follow-up from `prompt-packages/phase-51/PHASE-51-ACCOUNT-PROFILE-MOBILE-SCROLL-REVIEW-FOLLOW-UP-PROMPT-2026-07-09.md` after hosted mobile review found account-menu clipping, an unacceptable private/public player-name split, and choppy mobile scrolling.

This pass keeps Phase 51 open and prepares a recovered Review Candidate Backup prompt for hosted/manual review.

## Changes

- Made the signed-in account menu mobile-safe with viewport-capped dropdown sizing and mobile-first anchoring.
- Added mobile E2E coverage that signs in with a disposable E2E account, opens the account menu at a 390px mobile viewport, and checks viewport bounds/no horizontal overflow.
- Collapsed Profile to one editable public `Player name`.
- Removed the duplicate `Public player name` field, public/private name split copy, and public-profile visibility controls from Profile.
- Saved the same validated `Player name` through existing account-profile and public-profile seams when the public-profile seam is available.
- Kept optional player-card bio and public avatar URL as player-facing details, not separate identity names.
- Applied bounded mobile-only scroll-weight reductions for shadows/backdrop filters, including account/menu surfaces, progression HUD, and Tailwind shadow/backdrop utilities on narrow screens.
- Updated Phase 51 implementation plan, changelog, and recovered manual review checklist.
- Created the ignored local recovered Review Candidate Backup prompt package.

## Verification

Passed:

- focused account/Profile/player-name, route, and shell tests: `7` files, `68` tests;
- focused mobile layout E2E: `16` tests;
- rendered in-app browser mobile sanity check at local `127.0.0.1:5173` with no horizontal overflow (`scrollWidth=375`, `clientWidth=375`);
- `npm run lint`;
- `npm run test`: `129` files, `903` tests;
- `npm run test:e2e`: `57` tests;
- `npm run build` with the existing Vite large-chunk advisory;
- `npx tsc -p tsconfig.api.json --noEmit`.

Final lightweight hygiene checks are reported in the Codex closeout and should be rerun by the backup prompt before staging.

## Boundaries

No Phase 51 final acceptance/closure, Git/GitHub backup, branch creation, commit, push, PR, merge, tag, release, deployment configuration change, remote Supabase migration/RPC/RLS/schema/table/bucket/grant work, public tunneling, Phase 52 implementation, minimal-shell UI stripping, generated image concept work, UI toolkit adoption, gameplay-rule change, reward/scoring/Elo/rating change, Daily claim change, Solo/Multiplayer persistence rewrite, ranked queue change, private Practice expansion, unsafe credential/private-data handling, or original stable `brrrdle` repository work was performed.

## Next Step

Use `prompt-packages/phase-51/PHASE-51-ACCOUNT-PROFILE-MOBILE-SCROLL-RECOVERED-REVIEW-CANDIDATE-GITHUB-BACKUP-PROMPT-2026-07-09.md` to authorize a governed Phase 51 recovered Review Candidate GitHub Backup while keeping Phase 51 open for hosted/manual review.
