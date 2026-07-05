# Phase 44 Manual Review Intake And Routing

**Status:** Recommendation and routing intake only. This is not the official Phase 44 planning brief.
**Date:** 2026-07-04
**Authority:** Prepared from the user-completed Phase 43 manual review, the Phase 44 screenshot notes, and current planning context. Future Phase 44 work still requires separate planning, specification, implementation-plan, execution, verification, and Git handoff gates.

## Sources Reviewed

- `planning/phase-43/REVIEW-CHECKLIST.md`
- `planning/phase-43/CHANGELOG.md`
- `planning/phase-43/PLANNING-BRIEF.md`
- `planning/specs/phase-43/PHASE-43-CURRENT-SURFACE-UX-CLEANUP-RANKED-QUEUE-GAMEPLAY-COMFORT-SPEC-2026-07-03.md`
- `planning/phase-43/IMPLEMENTATION-PLAN.md`
- `planning/ROADMAP.md`
- `planning/ROADMAP-OPTIMIZED.md`
- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`
- `planning/testing/TESTING-SUITE.md`
- `progress/PROGRESS-STEP-390.md`
- User Phase 44 intake attachment dated 2026-07-04
- Screenshot notes:
  - `/Users/noir/Desktop/improvements_44/home-upgrades-1.png`
  - `/Users/noir/Desktop/improvements_44/home-upgrades-2.png`
  - `/Users/noir/Desktop/improvements_44/live-spectator-view-upgrades.png`
  - `/Users/noir/Desktop/improvements_44/private-matchmaking-potential-bug.png`
  - `/Users/noir/Desktop/improvements_44/sign-in-upgrade.png`
  - `/Users/noir/Desktop/improvements_44/stats-improvements-1.png`
  - `/Users/noir/Desktop/improvements_44/stats-improvements-2.png`
  - `/Users/noir/Desktop/improvements_44/unimportant-info.png`

## Executive Recommendation

The safest next official phase should be rerouted from the older future Phase 44 placeholder into:

**Phase 44 - Account-Scoped Local State Isolation And Phase 43 Manual Review Follow-Up**

The reason is straightforward: the account/guest state bleed and overwrite behavior reported in the manual review is qualitatively more serious than the visual and UX follow-ups. It can affect player trust, Daily integrity, account privacy expectations, and persistence boundaries. It should be planned and fixed before broader profile simplification, widget configuration, social inbox work, or visual expansion.

Recommended Phase 44 should still include a small set of bounded manual-review follow-ups if they remain source/test-only:

- Private Practice request eligibility audit and repair.
- Sign-in modal default order.
- Global removal of the top status chips if source-only and low risk.
- Help placeholder simplification.
- Stats public-site section placement cleanup.
- Gameplay keyboard centering follow-up if bounded.

Larger enhancements should be routed to later phases.

## Manual Review Result Summary

Phase 43 appears visually and functionally successful overall. The user reported that the game looks significantly better after the Phase 43 cleanup. The remaining findings are split between:

- One urgent boundary/integrity issue: account and guest state bleed.
- One ranked matchmaking fairness concern that may or may not indicate a remaining contract bug.
- Several small UI/UX cleanup items.
- Several larger feature directions that should not be folded into an urgent bugfix phase.

## Highest-Priority Bug: Account And Guest State Bleed

### Observed Behavior

The manual review reports that signed-in and signed-out state are not isolated correctly:

- Signed-in Practice Solo OG guesses remain visible after signing out and continuing as guest.
- Signed-in Practice Solo GO guesses remain visible after signing out and continuing as guest.
- Guest Practice Solo OG and GO guesses can overwrite or replace the signed-in account's progress after signing back in.
- Guest Daily Solo OG and GO progress can carry into a signed-in account and overwrite Daily progress.
- History remains visible after sign-out.
- Leaderboard rating and Elo bucket summaries remain visible after sign-out.
- Active Multiplayer projections remain visible after sign-out, even though the guest cannot play them.
- Settings carry over between signed-in and guest states.
- Stats did not appear to carry over in the user's manual check, but still need explicit audit coverage.

### Why This Is Urgent

This issue is more than cosmetic. It crosses account boundaries, guest boundaries, and Daily persistence boundaries. It may create confusing or incorrect resume slots, corrupt user expectations about local-versus-account progress, and expose stale account-owned history or multiplayer context to a signed-out guest session on the same device.

### Initial Hypothesis

Likely root causes to audit:

- Local storage keys that are not scoped by effective identity.
- Account sync hydration that merges guest and authenticated state too broadly.
- Sign-out handling that clears auth state but leaves account-scoped cached local state mounted.
- History, leaderboard summary, and active-game projections retaining the last signed-in user's cached view-models after sign-out.
- Daily claim/progress keys that do not consistently account-scope local session state.

### Recommended Phase 44 Route

This should be the first implementation focus of Phase 44. The phase should start with an audit/reproduction stage, then implement account-scoped local state isolation with focused tests for:

- Signed-in to guest transition.
- Guest to signed-in transition.
- Guest progress not overwriting account progress.
- Account progress not remaining visible after sign-out.
- Daily Solo OG and GO isolation.
- Practice Solo OG and GO isolation.
- History, leaderboard, active multiplayer, settings, and stats isolation or explicit documented behavior.

## Ranked Matchmaking Follow-Up

### Observed Behavior

The manual review described a three-account scenario where a third compatible player was waiting in the ranked Practice queue, but the two most recent opponents could still be matched against each other again.

### Routing Decision

This should be audited in Phase 44, but it should not outrank the account-state isolation bug unless reproduction shows the Phase 43 fairness migration is not functioning at all. The Phase 43 contract allowed recent rematches when no compatible non-recent opponent exists. Phase 44 should verify whether the third player was actually compatible across:

- Mode.
- Word length.
- Hard Mode.
- Time control.
- Rating bucket.
- Expiration/stale-row state.
- Queue cancellation state.
- Existing same-user/self-match denial.

If the observed behavior is a real contract gap, route to a narrow ranked queue addendum or repair gate. If it is expected compatibility behavior, improve About/Help transparency for ranked matchmaking.

## Private Practice Request Eligibility Bug

### Observed Behavior

The user configured a public profile for account `super`, but requesting an unranked private Practice match failed with:

`Requester must have an active public profile.`

The user correctly noted that an unranked private Practice request should not require established Elo.

### Routing Decision

Include this in Phase 44 as a narrow audit/bugfix candidate. The likely issue is not Elo itself, but a mismatch between the source-side active profile assumption and the database/RPC active-profile eligibility predicate. Phase 44 should verify whether:

- The requester profile is active and publicly visible.
- The requester public profile ID is available to the RPC.
- The RPC is accidentally requiring ranked eligibility or leaderboard eligibility.
- The client is signed into the expected account when calling the RPC.
- The error text is misleading despite a different eligibility failure.

If the bug is confirmed source-only, repair in Phase 44. If the RPC predicate is wrong, route through a migration/RLS addendum gate.

## Gameplay Keyboard Centering Follow-Up

### Observed Behavior

After the first valid Solo guess, validation controls appear below the board and the keyboard shifts down. The page does not automatically scroll enough to keep the keyboard comfortably visible.

### Routing Decision

Include only if it stays narrow and source/test-only. The goal should be scroll/viewport comfort, not gameplay-rule changes. Preserve Phase 39 mobile scroll smoothness and Phase 43 back-to-top behavior.

## Live And Active Game Preview Consistency

### Observed Behavior

The Live tab now has a useful spectator preview for games where the current player is not a participant. The user wants the same preview shown for all live games, including participant-owned games, so a participant can identify which game is which before resuming.

The user also wants Home "Spectate live game" and Active Games previews to route consistently to a full spectator-like read-only view instead of only showing the Live list.

### Routing Decision

Route to a later dedicated visibility/preview phase unless Phase 44 has extra room after the urgent account-state work. This likely touches Home, Live, Active Games, spectator projection rendering, routing, and participant-owned read-only preview semantics. It should not be treated as a small cosmetic patch.

Important boundary: this does not authorize spectator presence, counts, lists, chat, live mutation, or public/guest spectator contract changes.

## Home Page Preview And Widget Direction

### Observed Behavior

The user wants Home cards to carry more useful preview information:

- Daily Status should show a board/status preview.
- Active Solo should show a board/status preview.
- Active Multiplayer should show board/status previews and public participant names where available.
- Live v1 should show live board status, matching the Live tab.
- Recent Results should not need a board preview.
- Home sections should eventually become configurable widgets that users can add, remove, and rearrange.
- A future widget should show private matchmaking inbox metadata for incoming and outgoing requests.

### Routing Decision

Route configurable widgets and private request inbox widgets to a later Home customization phase. Phase 44 may mention them, but should not implement them. The active-game participant-name improvements may be paired with a later preview/routing phase.

## Timestamp Policy

### Observed Behavior

The user wants both UTC and local timestamps visible on History and Home, and preferably app-wide wherever timestamps are useful.

### Routing Decision

Route to a later display-format consistency stage. This is likely source-only but broad enough to deserve its own stage because timestamps appear across History, Home, Live, Active Games, Results, and possibly notifications.

## Sign-In Modal Default Order

### Observed Behavior

The sign-in modal currently presents Magic link before Email + password. The user expects most players to sign in with Email + password, so Email + password should be first/default and Magic link second.

### Routing Decision

Include as a small Phase 44 follow-up if it is source-only and covered by focused tests. This should not change auth providers or Supabase configuration.

## Notification Rival Names And Ranked Context

### Observed Behavior

The user wants notifications to show:

- The rival/player name.
- Whether the match is ranked or unranked.
- Potentially recent guessed-word context, though that is lower priority and may be risky/noisy.

### Routing Decision

Route to a later notification clarity stage. Rival names and ranked/unranked labels may be safe if they come from already-approved public or participant-owned data. Guessed-word content should be treated carefully and probably deferred unless clearly participant-owned and privacy-safe.

## Remove Global Header Status Chips

### Observed Behavior

The user wants the top header chips removed globally:

- `READY`
- `DAILY`
- `PRACTICE`
- `GO CHAIN`
- `BANKS`

### Routing Decision

This is a good small Phase 44 UI follow-up if it stays source-only. It should be implemented carefully because these chips appear across multiple pages and may affect layout, visual review baselines, and tests.

## Stats Page Placement

### Observed Behavior

The Stats page is improved, but the Public Site Stats section should be placed lower, below local charts. Its header and description should sit outside the outer card, matching the Local Stats treatment.

### Routing Decision

Include as a small Phase 44 UI follow-up if it stays source-only. Preserve public stats aggregate-only boundaries and existing stats/dashboard RPC contracts.

## Help Tab Placeholder

### Observed Behavior

The current Help content should be reduced to a simple under-construction placeholder for now. The quick route guide is not useful enough to keep.

### Routing Decision

Include as a small Phase 44 UI follow-up if source-only. Preserve existing Help route and navigation.

## About Tab Matchmaking Transparency

### Observed Behavior

About is better after Phase 43, but should eventually include a detailed multiplayer matchmaking transparency section after ranked transparency.

### Routing Decision

Route to Phase 44 only if paired with ranked matchmaking audit results. Otherwise defer to a later documentation/IA stage. The content should explain actual implemented behavior, not aspirational behavior.

## Profile Tab Simplification

### Observed Behavior

The Profile tab and the distinction between private and public profiles feel too complex. The user prefers a future simplification where a player has one visible identity model with avatar/accent/name, and ranked participation implies public leaderboard identity.

### Routing Decision

Defer to a later profile/data-contract simplification phase. This likely requires careful source, data-contract, RLS, migration, privacy, and copy review. It should not be mixed with Phase 44's urgent account-state isolation work unless the account-state audit proves the current profile split is directly causing the bug.

## Admin Queue And Lobby Visualization

### Observed Behavior

The user wants the private developer/admin dashboard to eventually show live queues, lobbies, matches, player names, wait times, settings, status, and other operational metadata to make matchmaking issues easier to diagnose.

### Routing Decision

Defer to a later admin observability phase. This likely needs explicit privacy review, Supabase/RLS addendum planning, aggregation and access constraints, and performance safeguards. It should not be implemented opportunistically in Phase 44.

## Recommended Phase Routing

### Phase 44 Candidate Scope

Recommended official Phase 44 scope:

- Account/guest state isolation audit and repair.
- Daily and Practice Solo account-boundary protection.
- History, leaderboard, active multiplayer, settings, and stats sign-out/identity-boundary audit.
- Private Practice request active-profile eligibility bug audit and repair.
- Small bounded UI follow-ups:
  - Sign-in order.
  - Global header chip removal.
  - Help placeholder.
  - Stats public-site placement.
  - Keyboard centering if safe.
- Ranked queue fairness reproduction and documentation, with migration/RLS addendum only if required.

### Phase 45 Candidate Scope

Recommended later Phase 45-style scope:

- Live and Active Games participant preview consistency.
- Home active-game public participant names.
- Home and Live direct spectator-preview routing consistency.
- UTC/local timestamp display policy.
- Notification rival-name and ranked/unranked context.

### Later Phase Candidates

Defer beyond Phase 45 unless separately approved:

- Profile/public-profile/private-profile data-contract simplification.
- Configurable Home widgets.
- Private request inbox widget and broader mailbox/social inbox.
- Rich Help/tutorial media.
- Admin live queue/lobby/match observability dashboard.
- Progression HUD and economy surfacing.
- Focus Mode.
- Compact navigation and broad mobile shell overhaul.
- Theme work.
- Spectator presence/count/list.
- Service workers and push subscriptions.
- Production deployment/release.
- Gameplay-rule changes.
- Elo changes.

## Recommended Phase 44 Stage Shape

### Stage 44.0 - Protected Baseline And Manual Review Intake

Confirm repo state, preserve the user-updated Phase 43 checklist, record intake artifacts, and run the baseline verification gate.

### Stage 44.1 - Account/Guest State Boundary Audit

Reproduce and classify every account/guest bleed path:

- Practice Solo OG.
- Practice Solo GO.
- Daily Solo OG.
- Daily Solo GO.
- History.
- Leaderboard/rating summaries.
- Active Multiplayer.
- Settings.
- Stats.

Decide whether repairs can remain source/test-only or need storage/schema migration planning.

### Stage 44.2 - Account-Scoped Local State Repair

Implement the smallest safe source/test repair for account-scoped and guest-scoped local state separation. Preserve Daily claim safety, synced account behavior, local guest behavior, and existing gameplay rules.

### Stage 44.3 - Account Boundary Regression And Private Request Eligibility

Add focused regression coverage for sign-in/sign-out transitions and audit/fix the private Practice request active public profile issue.

### Stage 44.4 - Small Manual Review UI Follow-Ups

Implement only low-risk source-only UI follow-ups:

- Sign-in tab order.
- Header chip removal.
- Help placeholder.
- Stats public-site placement.

### Stage 44.5 - Keyboard Centering Follow-Up

Repair the Solo gameplay keyboard centering issue if it remains source-only and safe. Preserve Phase 39 mobile scroll behavior and Phase 43 back-to-top behavior.

### Stage 44.6 - Final Hardening, Visual Review, Changelog, Manual Checklist

Run final regression coverage, visual handoff review, changelog, manual checklist, and completion progress.

## Stop Conditions

Stop and route to a narrower addendum or bugfix gate if:

- Account-state repair requires persistent data migration or destructive local-storage cleanup beyond a reviewed source plan.
- Daily claim integrity appears affected.
- Private Practice request eligibility is caused by a database/RLS predicate gap.
- Ranked matchmaking fairness still violates the reviewed Phase 43 contract.
- Any work would expose private account data, raw auth IDs, sessions, local artifacts, tokens, hidden profile fields, answer/seed internals, or unauthorized spectator details.
- Any work would require Supabase/Vercel configuration, deployment, service workers, push infrastructure, gameplay-rule changes, or Elo changes.

## Next Safe Gate

The next safe repository action is to create the official Phase 44 planning brief from this intake:

`planning/phase-44/PLANNING-BRIEF.md`

That gate should update roadmap/planning discoverability and progress records only if explicitly authorized by the next prompt. No source/runtime implementation should begin until the Phase 44 planning brief, unified spec, and detailed implementation plan are reviewed.
