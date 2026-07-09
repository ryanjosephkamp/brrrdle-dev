# Phase 54 Planning Brief - Live/Lobby Identity And Spectator-Adjacent Polish

**Status:** Planning package prepared; source/test implementation requires the companion prompt package.
**Created:** 2026-07-09.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev` only.
**Baseline:** Phase 53 final acceptance closure commit `52b44d3e533baa200d57b36af6ea5d33c7ddde97`.

## Phase Thesis

Phase 54 should make multiplayer identity and Live navigation more legible without changing who may see player identity. The phase should use the existing authenticated, participant-scoped identity RPC to make an active participant's eligible opponent card open the established public-profile route and return the player to the same Multiplayer context. It should preserve Lobby and spectator identities as display-only where the current contract deliberately withholds public profile ids.

## Current Contract Findings

| Surface | Current data authority | Current identity capability | Phase 54 decision |
| --- | --- | --- | --- |
| Active Games and participant Live rows | Authenticated participant calls `get_multiplayer_participant_identity_summaries` for its own game. The result can contain an active public `public_profile_id`. | `MultiplayerWorkspace` currently reduces the result to display-only profile data before view models render it. | Retain a non-rendered, validated route target for the opponent's active public profile and make only that participant-owned identity card clickable. |
| Lobby | `selectMultiplayerLobbyRows` reads a local host label from the game projection. A browsing viewer is not a participant in the waiting game. | No public profile id is available to the browsing viewer through the current contract. | Keep the host name display-only and preserve direct Join/Manage Lobby actions. Do not infer a profile from a name. |
| Authenticated and public/guest spectator Live rows | Dedicated authenticated/public spectator RPCs return sanitized display summaries, but their parsers expressly reject `public_profile_id`. | Read-only names, avatars, accents, submitted visible moves, and capability flags only. | Keep identities display-only, retain focused spectator routing, and state the read-only boundary clearly. Do not add player-profile links to spectator rows. |
| Public profile route | `PublicProfilePage` already loads only allowlisted public data and Phase 53 public ranked Practice metadata. The route currently always returns to Leaderboard. | Existing route state already stores selected public profile id and Multiplayer subtab/game selection. | Add a bounded public-profile return source so a profile opened from participant Live/Active returns to Multiplayer instead of being forced to Leaderboard. |

## Recommended Scope

### In Scope

- Authenticated participant identity links from Active Games and Live participant rows to an existing active public player profile.
- Safe active/Live identity cards with clear static fallbacks when no eligible public profile exists.
- Public-profile return routing that restores the Multiplayer route and retained subtab context for an identity opened there.
- Focused spectator presentation polish that reinforces read-only behavior without adding mutation controls or profile links.
- Lobby presentation and regression coverage that confirms host labels remain display-only while direct Join and Manage Lobby behavior remains unchanged.
- Focused unit/component/route tests, real two-client Live browser E2E, and full final verification before a Review Candidate.

### Explicitly Deferred Or Stop-Gated

- Profile links for a Lobby visitor, an authenticated nonparticipant spectator, or a public/guest spectator. Those flows lack a safe public profile id by design.
- Any new or broadened Supabase RPC, migration, RLS/grant change, table/schema change, direct table read, or remote Supabase action.
- Spectator lists, counts, presence, tracking, chat, following, social graph, notifications, and admin visualization.
- Daily spectator exposure, Daily eligibility changes, gameplay/rule changes, Solo persistence, rewards, scoring, Elo, ranking, queue, private Practice, deployment, release, and stable `brrrdle` repository work.

If a desired Phase 54 behavior needs a public profile id outside the authenticated participant identity RPC, the implementation must stop before source changes that broaden data access and prepare a separate migration/RLS addendum. It must not reuse a display name as an identity key.

## Success Criteria

- An authenticated participant with an opponent who has an active public profile can open that opponent's profile from Active Games and Live participant surfaces.
- The profile's existing ranked Practice metadata remains the authoritative visible rating summary; Phase 54 introduces no rating lookup, formula, or display contract.
- Returning from that profile restores Multiplayer and its previous subtab rather than forcing Leaderboard.
- Lobby hosts and spectator players remain visible only as safe display identities, never as guessed profile links.
- Spectators remain unable to submit, join, cancel, forfeit, queue, claim Daily, alter timers, or mutate ratings.
- No raw ids, emails, answers, seeds, sessions, player projections, queue data, rating transactions, tokens, or credentials are rendered or logged.

## Next Gated Action

Use the Phase 54 execution prompt package to perform the bounded source/test implementation and prepare a Review Candidate. The package must stop and report if the current safe contracts are insufficient.
