# Phase 56 Changelog

## Local implementation gate - 2026-07-10

Phase 56 is implemented locally through the explicit remote-migration stop gate.

### Private request authority

- Added one source-controlled additive migration for owner-private incoming-request preferences and directional player blocks.
- Replaced pair-wide active-request uniqueness with requester-target-mode uniqueness, keeping OG and GO independent and preserving five-active/twenty-recent global limits.
- Added a directional advisory lock for concurrent creates and revoked authenticated access to the superseded v1 create RPC.
- Added a uniform unavailable response for target opt-out, either-direction block, inactive target, and invalid self-target cases.
- Blocking cancels pending rows between the pair; acceptance rechecks preference/block authority through the request trigger.
- Added strict authenticated RPCs for load/update preference and list/set caller-owned blocks. Tables remain unavailable to browser roles directly.

### Request center and notifications

- Expanded the Practice request panel into incoming/outgoing views with status filtering, newest-first rows, terminal history, and direct entry into created games.
- Added request lifecycle notifications for incoming, created, declined, cancelled, and expired states using stable fingerprints and existing dashboard actions.
- Added normalized `privateRequestNotificationsEnabled` guest/cloud state and bumped progress schema to version 10 with version-9 migration support.
- Added a server-owned incoming-request control in Settings and Block/Unblock controls on eligible public profiles.
- Added participant request polling for Notification Center integration with visibility throttling and account-boundary cleanup.

### Verification

- Test-first red gate proved the missing selector, notification, preference, and migration contracts.
- Focused request/repository/notification/settings/profile/panel/migration suites passed.
- Full unit suite passed at 137 files and 973 tests.
- Lint, build, TypeScript project build, and API typecheck passed.
- Focused shell/accessibility/mobile-scroll/refresh Playwright passed 24/24.
- Final local gates are rerun before handoff.

## Recovered Review Candidate - 2026-07-10

- Applied the exact Phase 56 migration to the verified development project. The migration tool recorded generated version `20260711012007`; after exact semantic equivalence was proven, a transactional ledger-only reconciliation replaced it with source-controlled version `20260711001811` without rerunning migration SQL or changing application schema or data.
- Proved 37/37 local/remote migration equality and an unchanged bounded catalog fingerprint before and after ledger repair.
- Added real disposable-account browser coverage for participant-scoped incoming/outgoing history, OG/GO lane independence, concurrent duplicate collapse, reverse-direction requests, lifecycle actions, opt-out, block/unblock, expiry, five-active and twenty-recent limits, direct-table denial, mobile fit, and guaranteed cleanup.
- Fixed initial request-center direction selection after asynchronous participant rows load while preserving later manual direction changes.
- Added optimistic row-version matching and monotonic multiplayer refresh merging so concurrent private-game projections cannot overwrite a newer first turn.
- Made account hydration and multiplayer refs monotonic and account-scoped so reload cannot restore an unrelated or stale public game projection.
- Verified the existing private-match path still creates, accepts, enters, persists its first turn across reload, and supports non-default GO settings.
- Passed lint; 137 unit files and 975 tests; build; API typecheck; and all 68 Playwright E2E tests. Remote cleanup finished with zero temporary users, requests, preferences, blocks, or games.

Phase 56 remains open for hosted manual review. No Git/GitHub action, deployment configuration change, release, phase closure, Phase 57 work, or stable `brrrdle` work occurred during Review Candidate preparation.
