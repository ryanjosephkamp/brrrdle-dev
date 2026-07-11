# Phase 56 Manual Review Checklist

**Status:** Prepared for hosted review after the remote migration and Review Candidate backup.

Automated Review Candidate evidence passed: 975 unit tests, 68 E2E tests, lint, build, API typecheck, exact 37/37 migration-ledger equality, unchanged migration-repair catalog fingerprint, remote authority/privacy/concurrency probes, and zero disposable-account residue. The boxes below remain the user's hosted/manual acceptance gate.

## Request center

- [ ] Incoming and Outgoing views show only participant-owned requests and sort newest first.
- [ ] Pending, Created, Declined, Cancelled, Expired, and All filters show expected rows.
- [ ] Incoming pending requests expose Accept/Decline; outgoing pending requests expose Cancel.
- [ ] Created requests expose Enter private match and open the exact durable game.
- [ ] Request settings and safe counterpart names appear without raw ids or private account data.

## Preferences, blocks, and anti-spam

- [ ] Disabling incoming private Practice requests prevents new requests without revealing the private reason.
- [ ] Disabling request notifications hides lifecycle items but does not disable receiving requests.
- [ ] Blocking cancels pending pair requests and prevents requests in either direction; unblocking restores future eligibility only.
- [ ] One outgoing OG and one outgoing GO request may coexist for the same target; same-mode duplicates do not create another row.
- [ ] Reverse-direction requests remain independent when neither account blocks or opts out.
- [ ] Global active/recent request limits still prevent spam.

## Notifications and routing

- [ ] Incoming, created, declined, cancelled, and expired changes appear once with correct actions.
- [ ] Polling, refresh, and sign-out/sign-in do not replay unchanged notification sounds or items.
- [ ] Created-game activation opens Practice Multiplayer and the exact game.
- [ ] Read/dismissed metadata and global in-app/sound/browser preferences still work.

## Regression and mobile checks

- [ ] Existing private Practice creation, acceptance, first-turn persistence, and profile routing work.
- [ ] Ranked Daily, ranked Practice, unranked Daily, Solo persistence, and Home-on-refresh remain unchanged.
- [ ] Spectator/Lobby/public-profile privacy boundaries remain unchanged.
- [ ] Settings, block controls, request center, and notifications fit 320/390px without horizontal overflow.
- [ ] Keyboard navigation, focus order, reduced motion, and manual scrolling remain usable.

## Result

- [ ] All required checks pass, or failures are routed to bounded Phase 56 recovery.
- [ ] I authorize final acceptance only after the Review Candidate loop completes.
