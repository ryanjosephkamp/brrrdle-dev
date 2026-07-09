# Phase 52 Changelog - Private Practice Matchmaking Expansion

**Status:** Hosted/manual review accepted; Final Acceptance Backup prompt prepared.
**Phase:** Phase 52.
**Repository:** `brrrdle-dev` only.
**Updated:** 2026-07-09.

## Summary

Phase 52 expands private Practice matchmaking through the existing Phase 40 private-request contract. Signed-in players can now request unranked private Practice matches from public profiles with selectable OG/GO mode, Practice word length, Hard Mode, and supported Practice time controls.

The user reported on 2026-07-09 that the hosted/manual review checklist appears to pass and requested preparation for official Phase 52 closure.

No Supabase migration, remote RPC/RLS/schema change, deployment configuration change, gameplay-rule change, ranked queue change, scoring/reward/Elo change, Daily change, or stable `brrrdle` repository work was performed.

## Implemented

- Added shared private Practice request settings normalization, labels, and idempotency-key construction in `src/account/publicProfilePrivateMatch.ts`.
- Replaced the fixed public-profile private request action with settings-aware controls in `src/account/PublicProfilePage.tsx`.
- Kept GO private requests on the existing default GO chain length through the current projection contract.
- Preserved existing active-public-profile eligibility checks before submitting private requests.
- Preserved safe public-profile boundaries: raw auth ids, emails, credentials, tokens, game answers, serialized sessions, and projection blobs remain excluded from the user-visible request surfaces.
- Kept private requests authenticated-only and unranked Practice-only.

## Tests Added Or Updated

- Added helper coverage for default OG requests, GO settings, Hard Mode, time controls, invalid settings, labels, and idempotency-key shape.
- Updated public profile render tests for the settings-aware request card and privacy boundary.
- Added accepted-game projection coverage for private Practice GO, Hard Mode, word length, and time control.
- Added repository seam coverage for GO private request rows and create-RPC payloads.
- Added private request panel coverage for GO/timed/Hard Mode settings labels.
- Extended real two-client Playwright coverage with a selected private Practice GO request that is accepted and persisted with the expected settings.

## Preserved

- The existing private Practice OG first-turn persistence and forfeit E2E path still passes.
- Phase 50 Solo persistence, Home-on-refresh, GO definition dedupe, multiplayer first-turn persistence, private forfeit/cancel behavior, and ranked Practice FIFO matchmaking remain intentionally untouched.
- Phase 51 Profile/player-name/account-menu/mobile-scroll behavior remains intentionally untouched.
- The private request accept path continues to rely on `accept_private_multiplayer_match_request_v2`, which prevents browser-supplied raw participant user ids.

## Deferred

- Private Daily matches.
- Ranked private challenges.
- Custom-code invitation expansion.
- Friend/block/opt-out/social graph work.
- Admin/backend multiplayer queue visualization.
- Minimal-shell handoff preparation.
- Broad redesign, theme modernization, ShadCN/Impeccable adoption, generated design concepts, and homepage widgets.
- Deployment configuration changes, release work, and final Phase 52 acceptance/closure.

## Manual Review Acceptance

- Review Candidate Backup completed through PR #49.
- The user reported that the Phase 52 hosted/manual review checklist appears to pass.
- No direct Phase 52 follow-up bugs are currently reported.

## Next Recommended Action

Execute the Phase 52 Final Acceptance Closure and Backup prompt to record final acceptance, close Phase 52, and then route to separately authorized Phase 53 planning.
