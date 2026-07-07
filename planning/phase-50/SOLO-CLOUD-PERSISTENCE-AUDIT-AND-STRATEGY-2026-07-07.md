# Phase 50 Solo Cloud Persistence Audit And Strategy

**Status**: Planning complete; implementation prompt prepared.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-07-07.
**Scope**: Signed-in Solo persistence for Daily/Practice OG/GO.

## Summary

The current signed-in Solo persistence model is a whole-progress snapshot system. It can store active Solo resume slots and completed Solo summaries inside `progress_snapshots`, but the upload path is debounced and asynchronous for authenticated players. Phase 50 added local terminal-display safeguards and stronger re-entry coverage, but the architecture still allows a fast "submit, sign out, sign back in" flow to outrun the latest cloud write.

The durable fix should not be another narrow debounce adjustment by itself. The best next step is a bounded Phase 50 Solo cloud persistence overhaul: create an immediate, write-through cloud contract for signed-in Solo game state and per-event history, then hydrate signed-in Solo views from that cloud contract before falling back to snapshot-only state.

This document is a planning artifact. It does not implement source/runtime changes, migrations, RLS/RPC changes, deployment, Git/GitHub backup, release, next-phase work, or original stable `brrrdle` repository work.

## Current Persistence Model

### Supabase Account Tables

The Phase 8 account migration creates `progress_snapshots`, `game_history`, and `settings` as user-owned RLS-protected tables.

Evidence:

- `supabase/migrations/20260526012500_phase8_accounts.sql:14` creates `progress_snapshots(user_id, progress, updated_at)`.
- `supabase/migrations/20260526012500_phase8_accounts.sql:20` creates `game_history(id, user_id, entry, completed_at)`.
- `supabase/migrations/20260526012500_phase8_accounts.sql:42` through `:48` restrict user progress/history reads and writes to `auth.uid()`.
- `docs/supabase.md:38` through `:45` documents the same user-owned account tables.

Source inspection found no active Solo gameplay write path to `game_history`. The only direct app source writes found for account progress are whole-row `progress_snapshots` uploads.

### Whole-Progress Snapshot Sync

`src/account/sync.ts` defines a repository that downloads and uploads one JSON progress blob per user.

Evidence:

- `src/account/sync.ts:36` through `:64` implements `createSupabaseProgressRepository()`.
- `src/account/sync.ts:39` through `:43` selects `progress, updated_at, user_id` from `progress_snapshots`.
- `src/account/sync.ts:55` through `:59` upserts the complete progress payload back into `progress_snapshots`.
- `src/account/sync.ts:67` through `:87` merges local and cloud progress snapshots by timestamp and calls `mergeGuestProgressIntoCloud()`.
- `src/account/sync.ts:89` through `:90` makes authenticated sync use the same whole-snapshot function.

This design is useful for compact account progress, but it is not an append-only or per-turn Solo history system.

### Authenticated Auto-Sync Timing

Authenticated progress upload is deliberately debounced today.

Evidence:

- `src/account/autoProgressSync.ts:5` sets `AUTHENTICATED_PROGRESS_AUTO_SYNC_DEBOUNCE_MS = 750`.
- `src/account/autoProgressSync.ts:43` through `:55` builds an authenticated sync request from the current whole `GuestProgressState`.
- `src/app/App.tsx:1156` through `:1182` schedules authenticated sync after the debounce interval.
- `src/app/App.tsx:1183` through `:1189` saves guest progress immediately, but schedules authenticated progress for later upload.
- `src/app/App.tsx:1106` through `:1152` performs the async upload and may schedule another debounced flush if more changes arrived while a write was in flight.

This explains the observed timing pattern: if the player waits long enough, the latest terminal state may arrive in the cloud; if the player signs out/in immediately, the app may rehydrate from an older cloud snapshot.

### Solo Session Capture

Solo game components report serialized session state on every session change through `onResumeCapture`.

Evidence:

- `src/app/games/OgGame.tsx:242` through `:250` captures serialized OG sessions.
- `src/app/games/GoGame.tsx:294` through `:303` captures serialized GO sessions.
- `src/app/App.tsx:1639` through `:1673` stores in-progress captures in `resumeSlots` and clears slots when a capture is no longer in progress.
- `src/account/resumeSlot.ts:55` through `:77` classifies in-progress OG/GO sessions.
- `src/account/resumeSlot.ts:224` through `:233` separately normalizes completed Solo display slots, but those are local display evidence rather than resumable cloud state.

This captures useful state, but for signed-in users it still travels through the debounced whole-progress upload path unless completion triggers the special terminal flush.

### Terminal Completion Summaries

Terminal Solo completion calls `recordCompletedGame()`, which writes a compact completion summary into the progress blob and clears the resume slot.

Evidence:

- `src/app/games/OgGame.tsx:252` through `:278` reports OG completion.
- `src/app/games/GoGame.tsx:305` through `:335` reports GO chain completion.
- `src/app/App.tsx:1955` through `:1965` records completion and asks authenticated sync to flush on a zero-delay timer.
- `src/account/guestStorage.ts:116` through `:157` implements `recordCompletedGame()`.
- `src/account/storageSchema.ts:98` through `:116` shows `GameHistoryEntry` is a completion summary, not a turn log.
- `src/account/guestStorage.ts:147` caps merged visible history to 200 entries.

The zero-delay flush improves terminal completion durability, but it is still asynchronous and still updates one whole progress blob. It does not create a durable per-guess event record.

### Merge Behavior

Snapshot merge keeps only compact summaries and latest-ish resume slots.

Evidence:

- `src/account/guestTransfer.ts:44` through `:81` merges whole progress snapshots.
- `src/account/guestTransfer.ts:45` through `:51` merges history by `gameId` and caps it at 200 entries.
- `src/account/guestTransfer.ts:57` through `:58` merges resume slots and picks a latest resume slot.
- `src/account/guestTransfer.ts:62` through `:80` uses max/union-style merges for aggregate progress fields.

This is not strong enough for "every signed-in Solo guess is permanently saved" because it can collapse detail, discard older history entries, and lose very recent state if the newest whole snapshot was not uploaded before rehydration.

## Failure Analysis

The user's observations are consistent with the current architecture:

- Valid nonterminal guesses, GO intermediate puzzle transitions, Pay-to-Continue, and reveal actions rely on `onResumeCapture` plus debounced authenticated snapshot upload.
- A terminal completion attempts an immediate flush, but the write is still async and can be invalidated or outrun by sign-out/scope changes.
- A GO puzzle 1 to puzzle 2 transition is nonterminal, so it is especially exposed to the debounced resume-slot path if the player signs out before making a guess on puzzle 2.
- Pay-to-Continue changes coins and then changes the game session; those are separate app-state changes and both currently ride the snapshot path for signed-in users.
- The existing `game_history` table is not currently the source of truth for Solo turns, and local/cloud visible history only stores terminal summaries.

The result is a reasonable "eventually synced progress snapshot" design, not an immediate signed-in Solo write-through design.

## Recommended Target Contract

For signed-in Solo play, the app should treat every valid Solo mutation as write-through account state:

- A valid submitted guess in Daily OG, Daily GO, Practice OG, or Practice GO writes immediately to cloud.
- A completed win/loss writes immediately to cloud and remains restorable after refresh, sign-out/sign-in, browser switch, and cleared local storage.
- Pay-to-Continue and reveal/give-up actions write immediately to cloud.
- Intermediate GO puzzle transitions write immediately to cloud, including the first puzzle to second puzzle transition before any guess is submitted on the next puzzle.
- Existing manual sync can remain as a recovery/manual reconciliation tool, but it should not be required for ordinary signed-in Solo durability.
- Guest play should remain local-first and should not leak into signed-in accounts unless the existing explicit transfer/sync flow is used.

The existing `progress_snapshots` table should remain useful for aggregate progress, settings, coins, XP, completed IDs, stats, and compatibility. It should not remain the only durable record of signed-in Solo turns.

## Proposed Storage Strategy

Add a narrow signed-in Solo cloud persistence contract. The preferred design is two user-owned RLS-protected tables:

1. `solo_game_sessions`
   - One latest-state row per signed-in Solo game/session.
   - Owned by `(user_id, session_key)`.
   - Stores mode, scope, status, word length, difficulty, hard mode, Daily date key or Practice seed metadata, GO puzzle count/current puzzle index, serialized latest session, started/updated/completed timestamps, and optional abandoned/pruned timestamp.

2. `solo_game_events`
   - One idempotent row per meaningful signed-in Solo mutation.
   - Owned by `(user_id, event_id)` or `(user_id, session_key, event_index)`.
   - Stores session key, event type, mode, scope, puzzle index, submitted guess for valid-guess events, cost/action payload for Pay-to-Continue/reveal events, status after event, and timestamp.
   - Event IDs should be deterministic enough that retrying the same submitted guess or action does not duplicate the event.

The source implementation should add a typed Solo cloud repository seam, then a Supabase adapter that writes the event row and latest session row immediately after each valid Solo mutation for authenticated users.

If implementation proves a one-table JSON event log is safer for this phase, it may be used only if it still satisfies:

- immediate signed-in cloud write after every valid/significant Solo mutation;
- deterministic/idempotent retries;
- durable full session history by signed-in account;
- current game restoration from cloud after local data is unavailable;
- user-owned RLS isolation.

## Source Integration Strategy

The next implementation should avoid writing to cloud on every typed letter. Unsubmitted drafts can remain local for now. The durable write trigger should be valid/significant Solo mutations:

- OG valid guess accepted by `submitGuess()`;
- GO valid guess accepted by `submitGoGuess()`;
- GO intermediate puzzle advancement, including first to second puzzle;
- OG/GO terminal win/loss/reveal;
- Pay-to-Continue and future consumable-like mutation points;
- explicit new Practice puzzle/chain replacement should mark prior incomplete signed-in session abandoned or superseded if a durable row exists.

Implementation should prefer a small event classification helper that compares the previous and next serialized session, rather than letting `onResumeCapture` write every local draft keystroke to cloud.

Signed-in sign-out, account hydration, route re-entry, and manual sync should all account for pending Solo cloud writes. At minimum, the in-app sign-out path should wait for pending signed-in Solo writes or report a visible sync error instead of silently dropping the latest terminal state.

## Hydration Strategy

On signed-in Solo load:

1. Download the account's `progress_snapshots` as today for aggregate progress.
2. Download relevant Solo cloud session rows for the selected Daily/Practice OG/GO lane.
3. Prefer a newer or more complete Solo cloud session over stale `resumeSlots`/completed-display state.
4. Reconcile terminal Solo sessions idempotently with `completedGameIds` and `recordCompletedGame()` so rewards/stats are not duplicated.
5. Keep guest and authenticated scopes separated by active progress owner.

This means a signed-in player should be able to clear browser storage, sign back in, and see the solved or in-progress Solo game from cloud.

## Implementation Plan

1. Re-read governance, Phase 50 context, this audit, and current source before editing.
2. Add failing tests for the current bug patterns:
   - Daily Solo OG: several valid guesses, correct terminal guess, immediate sign-out/in or fresh context, terminal board restored.
   - Daily Solo GO: solve puzzle 1, advance to puzzle 2, immediate sign-out/in before guessing puzzle 2, puzzle 2 restored with puzzle 1 solved.
   - Pay-to-Continue: purchased extra attempt remains durable immediately.
   - Practice Solo OG/GO signed-in sessions restore across fresh authenticated context.
   - Guest scopes remain local and do not upload to the signed-in Solo cloud contract.
3. Add an additive Supabase migration and RLS policies for the chosen Solo cloud tables/RPCs.
4. Add typed source models, normalizers, idempotency helpers, and a repository seam with a mocked/in-memory test adapter.
5. Add the Supabase adapter without printing secrets or raw account data.
6. Wire OG/GO valid mutation points to signed-in write-through persistence.
7. Wire signed-in hydration to prefer the Solo cloud contract for current Solo lane state.
8. Preserve existing aggregate progress/reward/stat updates and idempotent completion behavior.
9. Update docs, Phase 50 checklist/changelog/progress, and create the next Review Candidate Backup prompt only after verification is clean.

## Verification Plan

Minimum verification for the implementation pass:

- focused unit tests for event classification and idempotency;
- focused repository tests for session/event write and hydration selection;
- component or integration tests for OG/GO mutation wiring;
- focused E2E for signed-in Daily OG immediate terminal restore;
- focused E2E for signed-in Daily GO first-to-second puzzle transition restore;
- focused E2E for signed-in Practice OG/GO restore from fresh browser context;
- focused E2E for Pay-to-Continue durability if deterministic setup supports it safely;
- existing Phase 50 Solo completion re-entry E2E;
- full implementation gate: app typecheck, lint, unit tests, E2E, build, API typecheck, hygiene scans.

The implementation should not write raw Daily answers, credentials, tokens, auth states, screenshots, traces, or private account data into tracked files, progress reports, prompt packages, logs, or final reports. Temporary current Daily answers, if supplied by the user, must stay in process/runtime-only or ignored local artifacts.

## Risks And Decisions

- **Migration/RLS risk**: The durable design likely needs additive tables or RPCs. The next prompt should explicitly authorize only this bounded migration/RLS work for `brrrdle-dev`, and should stop if the target Supabase project cannot be confirmed safely.
- **Answer visibility**: Current serialized Solo sessions already include answers inside the user-owned progress snapshot. A new user-owned Solo session row would not make that materially broader, but reports/logs must still avoid exposing answers.
- **Offline behavior**: Offline signed-in play cannot truly cloud-write immediately. The safe fallback is a local pending-write outbox plus clear sync-error UI. The user-facing guarantee should be "immediate when online; queued and visible when offline."
- **History UI**: The first implementation should create durable account history and use it for restoration. A rich UI for browsing every historical Solo turn can be a later phase unless the implementation remains small and safe.
- **Old snapshot compatibility**: Existing `resumeSlots`, completed display slots, and `progress_snapshots` must keep loading for older accounts.

## Boundaries

This strategy does not authorize:

- original stable `brrrdle` repository work;
- Git/GitHub backup, branch creation, staging, commit, push, PR, merge, or branch cleanup;
- Final Phase 50 acceptance/closure;
- deployment, release, public tunneling, or deployment configuration changes;
- broad gameplay-rule, reward-formula, scoring, Elo/rating, multiplayer, dictionary, answer-generation, or redesign work;
- unsafe credential/raw-answer handling.

## Prepared Next Prompt

The corresponding implementation prompt is:

`prompt-packages/phase-50/PHASE-50-SOLO-CLOUD-PERSISTENCE-OVERHAUL-PROMPT-2026-07-07.md`

It is ignored/local under the prompt-package workflow until the user explicitly activates it.

## Implementation Outcome - 2026-07-07

The activated implementation chose the existing-table strategy rather than adding a new migration:

- `progress_snapshots` remains the aggregate account progress path for settings, stats, coins, XP, completed IDs, and compatibility.
- `game_history` now stores private signed-in Solo `solo-cloud-session-v1` session/event entries behind the existing Phase 8 owner-only RLS policies.
- Signed-in Solo OG/GO writes occur immediately after accepted valid guesses, successful Pay-to-Continue mutations, and reveal/loss mutations when online.
- Draft letters and deletes remain local and do not create cloud history events.
- Authenticated hydration loads recent Solo cloud sessions and merges them into the current in-progress resume slots or completed display-only slots before re-entry/auto-resume.
- Sign-out waits for pending Solo cloud writes before dropping the authenticated session.

This avoided a new table/RLS migration while still activating durable user-owned Solo session/event history from the deployed account schema.
