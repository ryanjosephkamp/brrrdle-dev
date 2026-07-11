# Phase 56 Manual Review Checklist

**Status:** Accepted and closed after hosted manual review on 2026-07-11.

Automated Review Candidate evidence passed: 975 unit tests, 68 E2E tests, lint, build, API typecheck, exact 37/37 migration-ledger equality, unchanged migration-repair catalog fingerprint, remote authority/privacy/concurrency probes, and zero disposable-account residue. The boxes below remain the user's hosted/manual acceptance gate.

## Request center

- [x] Incoming and Outgoing views show only participant-owned requests and sort newest first.
- [x] Pending, Created, Declined, Cancelled, Expired, and All filters show expected rows.
- [x] Incoming pending requests expose Accept/Decline; outgoing pending requests expose Cancel.
- [x] Created requests expose Enter private match and open the exact durable game.
- [x] Request settings and safe counterpart names appear without raw ids or private account data.

## Preferences, blocks, and anti-spam

- [x] Disabling incoming private Practice requests prevents new requests without revealing the private reason.
- [x] Disabling request notifications hides lifecycle items but does not disable receiving requests.
- [x] Blocking cancels pending pair requests and prevents requests in either direction; unblocking restores future eligibility only.
- [x] One outgoing OG and one outgoing GO request may coexist for the same target; same-mode duplicates do not create another row.
- [x] Reverse-direction requests remain independent when neither account blocks or opts out.
- [x] Global active/recent request limits still prevent spam.

## Notifications and routing

- [x] Incoming, created, declined, cancelled, and expired changes appear once with correct actions.
- [x] Polling, refresh, and sign-out/sign-in do not replay unchanged notification sounds or items.
- [x] Created-game activation opens Practice Multiplayer and the exact game.
- [x] Read/dismissed metadata and global in-app/sound/browser preferences still work.

## Regression and mobile checks

- [x] Existing private Practice creation, acceptance, first-turn persistence, and profile routing work.
- [x] Ranked Daily, ranked Practice, unranked Daily, Solo persistence, and Home-on-refresh remain unchanged.
- [x] Spectator/Lobby/public-profile privacy boundaries remain unchanged.
- [x] Settings, block controls, request center, and notifications fit 320/390px without horizontal overflow.
- [x] Keyboard navigation, focus order, reduced motion, and manual scrolling remain usable.

## Result

- [x] All required checks pass; the user reported no known failures.
- [x] The user authorized proceeding after the Review Candidate loop completed.
