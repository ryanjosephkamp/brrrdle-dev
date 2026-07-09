# Phase 51 Intake Context - 2026-07-08

**Status:** Current mobile-readable planning context after Phase 50 final acceptance, Final Acceptance Backup, and Golden Checkpoint.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Authority:** Supporting planning aid only. Current user instructions, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, approved phase plans, and the Phase 51 planning prompt remain higher authority.

This document exists so the user can review the current roadmap context on mobile before providing Phase 51 intake. It does not authorize source/runtime implementation, tests, migrations, Supabase remote work, deployment configuration changes, Git/GitHub actions, release work, public tunneling, Phase 51 implementation, or work in the original stable `brrrdle` repository.

## Current Baseline

- Phase 50 is manually accepted and closed on `main`.
- Phase 50 final acceptance PR: <https://github.com/ryanjosephkamp/brrrdle-dev/pull/45>
- Phase 50 final closure commit: `a8f7fdeb0bfdfd5f25f68c7531588d65b87d7ede`
- Phase 50 Golden Checkpoint tag: `phase-50-golden-2026-07-08`
- Phase 50 Golden Checkpoint release: <https://github.com/ryanjosephkamp/brrrdle-dev/releases/tag/phase-50-golden-2026-07-08>
- Accepted ranked Practice FIFO Review Candidate PR: <https://github.com/ryanjosephkamp/brrrdle-dev/pull/44>

The accepted Phase 50 gameplay baseline should be protected during Phase 51:

- Solo completion persistence for guest and signed-in players.
- Signed-in Solo cloud persistence and account hydration.
- Practice Solo new-puzzle/new-chain persistence.
- Manual hard/browser refresh landing on Home.
- GO definition deduplication.
- Multiplayer focus/refocus behavior.
- Multiplayer matchmaking, first-turn persistence, and private forfeit/cancel behavior.
- Ranked Practice cross-browser queue recovery.
- Ranked Practice FIFO matchmaking.

## Current Phase 51 Recommendation

Phase 51 has not been implemented yet. The current prompt package recommends a planning-only Phase 51 centered on:

- account access;
- Profile simplification;
- player identity and menu design;
- related Profile/Settings routing decisions;
- preserving the accepted Phase 50 gameplay baseline.

The Phase 51 planning prompt should decide which items become Phase 51 implementation candidates, which become audit-only gates, and which should be routed to later phases.

User intake update, 2026-07-08:

- The user agrees with the account/Profile/player-identity direction for Phase 51.
- Phase 51 should not touch core gameplay mechanics, backend gameplay persistence, reward/scoring/Elo rules, or Solo/Multiplayer gameplay behavior except to preserve existing accepted behavior.
- Admin multiplayer queue visualization or backend observability UI should not be implemented in Phase 51. It may receive planning notes, a placeholder, or a later-phase route only.
- Design-heavy homepage widgets, broad shell redesign, UI/theme modernization, and major frontend makeover work should be deferred until after the next few foundation phases.
- The later roadmap should include a pre-design handoff-preparation step before the deeper shell/theme phase. That step should strip the UI toward a minimal, terminal-like, fully functional shell while preserving all features and preparing a GPT-5.6-oriented handoff package.

## Items Currently Proposed For Phase 51 Decisioning

These are the items already named in the Phase 51 planning prompt:

- Single public player name versus separate private/public profile names.
- Emoji and special-character player-name policy, including browser/database safety.
- Top-right player chip or player menu for Profile, Settings, Sign out, sound, Focus controls, or account actions.
- Profile simplification and account-management clarity.
- Profile/Settings account access flows and Danger Zone ordering.
- Private Practice request expansion routing.
- Admin multiplayer queue visualization or backend observability tooling.
- Any remaining multiplayer debug or cleanup routes from Phase 50 review.

## Likely Phase 51 Implementation Candidates

These are the strongest candidates to consider for Phase 51 if the user's intake agrees:

- Simplify Profile and Settings so account-management actions are easier to find.
- Decide whether the game should use one player display name everywhere.
- Add or refine a compact player/account menu if it can stay source-only.
- Define and possibly enforce a safe player-name character policy if it can be done without a risky migration/RLS change.
- Clarify Sign out, Settings, Profile, and Danger Zone placement.

Any item that requires a new schema, RLS policy, RPC, storage contract, or privacy boundary should be split into an explicit migration/RLS addendum or later gated stage.

Phase 51 should bias toward practical, low-risk account/profile clarity over visual flourish. The work should make the current surfaces easier to understand and prepare them for later redesign, not begin the redesign now.

## Likely Phase 51 Audit Or Routing Candidates

These may belong in Phase 51 as planning, audit, or routing, but not necessarily implementation:

- Private Practice request expansion beyond the current behavior.
- Admin/backoffice visualization for ranked queues and multiplayer state.
- Profile-name emoji/special-character investigation if backend behavior is unclear.
- Remaining multiplayer cleanup if it is operational or observability-oriented rather than player-facing.
- Account/profile changes that would affect public privacy, raw auth identifiers, or multiplayer eligibility.

Admin/backoffice visualization should be treated as a later-phase concept unless the Phase 51 planning pass decides that a nonfunctional placeholder or route note is useful. Do not implement live queue probes, admin dashboard data access, Supabase RPCs, or private backend views in Phase 51 without a later explicit prompt.

## Currently Routed Later-Phase Themes

The historical timeline currently routes future work roughly like this:

| Route | Current Theme |
| --- | --- |
| Phase 52 | Private Practice matchmaking expansion, likely contract-heavy and possibly Supabase/RLS-gated. |
| Phase 53 | Stats, progression transparency, cloud-stat decisions, and public rating/profile metadata. |
| Phase 54 | Live/Lobby identity and spectator-adjacent polish. |
| Pre-Phase-55 handoff prep | Minimal-shell simplification plus GPT-5.6-oriented handoff package. |
| Phase 55 | Deeper Focus Mode expansion and mobile/desktop shell redesign. |
| Phase 56 | UI/theme direction intake and design-system planning. |
| Phase 57 | Theme proposal/template modernization. |
| Phase 58+ | Concrete themes, assets, sounds, and broader visual polish. |

These phase numbers are roadmap conveniences, not immutable promises. The Phase 51 planning pass may reroute them if the user's new intake makes a different cohesive macro-phase safer.

Supporting blueprint:

- `planning/handoffs/GPT-56-MINIMAL-SHELL-HANDOFF-BLUEPRINT-2026-07-08.md`

## Explicit Deferred Or Protected Items

These are not currently authorized for Phase 51 implementation unless the user explicitly routes them and the planning pass creates the right gates:

- Production deployment, release, production release labeling, or Vercel configuration changes.
- New Supabase project, Vercel project, or public tunneling.
- Remote Supabase migrations, SQL/RLS/schema/table/bucket/storage/RPC execution without separate authorization.
- Gameplay-rule, scoring, reward, XP, level, stats, Elo/rating, or Daily claim rule changes.
- Practice GO answer-selection/randomness algorithm changes.
- Private Daily or ranked Daily implementation.
- Strict one-active-session/session leases.
- Server-authoritative Daily submissions.
- Service workers or push notification infrastructure.
- Spectator presence/count/list expansion.
- Broad mobile/desktop shell redesign.
- Full theme implementation.
- Minimal-shell stripping or frontend handoff preparation implementation before the future pre-Phase-55 handoff-prep phase.
- Image-generation concept work, new UI toolkit adoption, ShadCN integration, Impeccable-driven redesign, or new design dependencies before a later explicit prompt.
- Work in the original stable `brrrdle` repository.

## How To Use This Before Phase 51 Planning

When preparing Phase 51 intake, the most useful structure is:

- must-have Phase 51 items;
- nice-to-have Phase 51 items;
- bugs or rough edges still visible after Phase 50;
- items that should explicitly not change;
- items that can be routed later;
- screenshots or examples;
- any account/profile/player-name policy preferences.

The next planned prompt is still:

- `prompt-packages/phase-51/PHASE-51-PLANNING-PROMPT-2026-07-08.md`

That prompt is planning/documentation-only. It should turn the user's intake plus this context into the canonical Phase 51 planning package.
