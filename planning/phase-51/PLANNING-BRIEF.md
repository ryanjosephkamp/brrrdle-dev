# Phase 51 Planning Brief - Account, Profile, And Player Identity

**Status:** Planning package prepared.
**Created:** 2026-07-08.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Baseline:** `main` and `origin/main` at Phase 50 closure commit `a8f7fdeb0bfdfd5f25f68c7531588d65b87d7ede`.

## Authority

This planning brief is authorized only as a documentation and routing artifact. It does not authorize Phase 51 source/runtime implementation, tests, migrations, remote Supabase work, deployment configuration changes, Git/GitHub backup, release, public tunneling, minimal-shell UI stripping, image-generation concept work, UI toolkit adoption, or work in the original stable `brrrdle` repository.

Highest applicable authorities:

- current user instructions;
- `CONSTITUTION.md`;
- `BRRRDLE-SPEC.md`;
- `planning/governance/PROMPT-PACKAGE-STANDARD.md`;
- `planning/governance/PHASE-SCOPE-SIZING-GUIDE.md`;
- `planning/governance/REVIEW-CANDIDATE-BACKUP-LOOP.md`;
- Phase 50 final acceptance and Golden Checkpoint records.

## Current Baseline

Phase 50 is complete, merged, branch-cleaned, manually accepted, and captured with a Golden Checkpoint:

- Phase 50 final PR: <https://github.com/ryanjosephkamp/brrrdle-dev/pull/45>
- Phase 50 closure commit: `a8f7fdeb0bfdfd5f25f68c7531588d65b87d7ede`
- Phase 50 Golden Checkpoint tag: `phase-50-golden-2026-07-08`
- Phase 50 Golden Checkpoint release: <https://github.com/ryanjosephkamp/brrrdle-dev/releases/tag/phase-50-golden-2026-07-08>

The accepted Phase 50 gameplay baseline is protected during Phase 51:

- Solo completion persistence for guest and signed-in players.
- Signed-in Solo cloud persistence and account hydration.
- Practice Solo new-puzzle/new-chain persistence.
- Manual hard/browser refresh landing on Home.
- GO definition deduplication.
- Multiplayer focus/refocus behavior.
- Multiplayer matchmaking, first-turn persistence, private forfeit/cancel behavior.
- Ranked Practice FIFO matchmaking.

## User Direction For Phase 51

The user accepted the account/Profile/player-identity direction and does not want extra Phase 51 work beyond that lane.

Phase 51 should:

- focus on account access, Profile simplification, player identity/menu design, and related Profile/Settings routing;
- avoid gameplay mechanics, backend gameplay persistence, reward/scoring/Elo rules, and broad gameplay frontend changes except to preserve accepted behavior;
- defer admin multiplayer queue visualization/backend observability UI from Phase 51 implementation;
- route design-heavy homepage widgets, broad shell redesign, UI/theme modernization, new UI toolkit adoption, image-generation concepts, and the minimal-shell handoff process later.

## Repository Evidence

The current source shape supports a mostly source-only Phase 51:

- `src/account/AccountBadge.tsx` renders the top-right guest/signed-in indicator and currently opens the Profile route directly.
- `src/account/ProfilePanel.tsx` contains current-player private profile controls and opt-in public profile controls in one editor.
- `src/account/Settings.tsx` already hosts Sign out, password, cloud sync, progress export/reset, and Danger Zone copy.
- `src/account/profile.ts` normalizes private display names by trimming, length-capping, and removing control characters.
- `src/account/publicProfile.ts` normalizes public profile display names as bounded plain text and protects public profile DTO parsing from raw private fields.
- `supabase/migrations/20260621003033_phase29_public_profile_rls.sql` stores public profile display names with length and control-character constraints, but does not itself define an emoji/symbol policy.
- Phase 40 private Practice request flows depend on active public profile fields, including public display names, but should not need schema changes for a frontend source-only name policy.

The planning conclusion is that Phase 51 can start as a source/test implementation pass. If implementation proves that a durable fix requires a new table, column, RPC, RLS policy, grant, storage bucket, or remote migration, Phase 51 should stop and produce a narrow addendum instead of crossing that boundary.

## Recommended Phase 51 Scope

Phase 51 should be one cohesive macro-phase with narrow internal stages:

1. Baseline audit and protected-invariant setup.
2. Player-name policy and source-only validation.
3. Profile simplification around one player-facing name.
4. Account/Profile/Settings access clarity.
5. Compact player chip/menu if it can stay source-only and small.
6. Review Candidate hardening, manual checklist, and next backup prompt.

This should be a practical cleanup phase, not a redesign. The work should make account controls easier to understand and reduce profile-name ambiguity before private-match, stats, and later UI work build on these surfaces.

## Phase 51 Implementation Candidates

### Single Player Name Direction

Recommend treating "player name" as the primary user-facing identity concept.

Phase 51 should not remove database fields or run migrations. Instead, it should source-side align the UI so users are not asked to reason about separate private and public names unless an existing backend contract requires a distinction. A safe implementation may retain the existing `auth.users.user_metadata` display name and `public_player_profiles.display_name` storage fields while presenting one canonical "Player name" affordance in Profile.

Implementation should preserve public-profile opt-in visibility and raw-private-data boundaries.

### Emoji And Special-Character Policy

Recommend a conservative Phase 51 v1 player-name policy:

- allow ordinary text that is stable across current browser, Supabase, leaderboard, multiplayer, private-request, and notification surfaces;
- reject control characters, emoji, private-use/format characters, and symbol-heavy names that can break current multiplayer/public-profile behavior;
- keep the policy source-side unless a later migration/RLS addendum is explicitly authorized;
- show a clear validation message before save rather than allowing names that are known to be risky.

The exact helper should be shared by private and public display-name flows where practical so the account badge, Profile editor, public profile preview, leaderboard, private request flows, and multiplayer identity summaries converge on the same rule.

### Profile Simplification

Profile should explain:

- the player name;
- accent/avatar choices;
- public visibility;
- which public fields other signed-in players can see;
- where account management lives.

It should avoid duplicative save language, contradictory private/public name copy, and Sign out placement that looks like a profile-save action.

### Account/Settings Clarity

Settings should remain the home for account management:

- Sign out;
- password change;
- cloud sync and manual sync;
- progress export/reset;
- Danger Zone copy and gates.

Profile can link to Settings and may include Sign out if it remains visually separated from profile-save controls.

### Top-Right Player Chip/Menu

Recommend implementing a small player chip/menu only if it can remain source-only and accessible.

Candidate menu entries:

- Profile;
- Settings;
- Sign out for signed-in users;
- Sign in/Create account for guests;
- Sound toggle if the current shell can pass the existing sound state without broad refactor;
- Focus toggle only if it uses the existing shell Focus Mode state without redesigning the shell.

If adding Sound or Focus to the menu would require broad shell/state refactoring, route those menu entries later and keep Phase 51 to Profile/Settings/auth actions.

## Explicit Deferrals

Phase 51 should not implement:

- admin multiplayer queue visualization or live backend observability UI;
- queue/RPC probes, admin data access, or private backend views;
- private Practice request expansion beyond preserving existing flows;
- stats/progression redesign;
- Live/Lobby identity expansion;
- minimal-shell stripping;
- homepage widgets;
- broad shell redesign or theme modernization;
- ShadCN, Impeccable-driven redesign, generated visual concepts, or new UI dependencies;
- gameplay, scoring, rewards, Elo/rating, Daily claims, word selection, or Solo/Multiplayer persistence changes.

Admin/backend observability remains a later-phase concept. The future minimal-shell handoff remains routed to the pre-Phase-55 handoff-preparation process described in `planning/handoffs/GPT-56-MINIMAL-SHELL-HANDOFF-BLUEPRINT-2026-07-08.md`.

## Recommended Manual Review

Manual review after Phase 51 implementation should check:

- guest account chip still opens sign-in/create-account cleanly;
- signed-in chip/menu exposes Profile, Settings, and Sign out without hiding gameplay controls;
- Profile uses the intended player-name policy and gives clear validation errors for disallowed names;
- public profile save/visibility still works for safe names;
- emoji/symbol names are blocked or clearly rejected before they can affect multiplayer/public surfaces;
- Settings still contains account management, sync, reset/export, password, and Danger Zone content;
- Phase 50 gameplay smoke remains stable, especially Solo persistence, Home-on-refresh, multiplayer matchmaking, and ranked Practice FIFO.

## Success Criteria

Phase 51 planning succeeds when:

- the implementation path is source/test-first and narrowly scoped;
- Phase 50 gameplay stability is treated as protected baseline;
- profile/public-profile/player-name ambiguity is routed into a concrete source-only plan;
- admin/backend visualization and minimal-shell handoff work are explicitly deferred;
- a governed implementation prompt exists for the next step;
- lightweight documentation verification passes.
