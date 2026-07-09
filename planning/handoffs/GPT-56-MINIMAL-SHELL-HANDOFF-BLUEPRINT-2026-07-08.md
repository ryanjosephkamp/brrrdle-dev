# GPT-5.6 Minimal-Shell Handoff Blueprint - 2026-07-08

**Status:** Living planning blueprint for a future handoff-preparation phase.
**Repository:** `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
**Authority:** Supporting planning artifact only. Current user instructions, `CONSTITUTION.md`, `BRRRDLE-SPEC.md`, active phase plans, and future prompt packages remain higher authority.

This document records the user's current intention to prepare `brrrdle-dev` for a future GPT-5.6-oriented frontend/design handoff after the near-term account/profile/social-readiness phases are complete. It does not authorize source/runtime implementation, UI stripping, tests, migrations, Supabase remote work, deployment configuration changes, Git/GitHub actions, release work, public tunneling, image generation, new dependencies, skill installation, Phase 51 implementation, or work in the original stable `brrrdle` repository.

## User Goal

After the current non-design foundations are in place, prepare a clean handoff package for a new model/chat focused on higher-quality frontend architecture, UI/UX, and visual design.

The handoff target should inherit the current game functionality but start from a simpler, lower-ornament baseline:

- all core gameplay and backend behavior preserved;
- all major surfaces and flows still present and playable;
- reduced visual ornamentation, heavy effects, decorative styling, and unnecessary design weight;
- lighter animation behavior while preserving important gameplay feedback;
- a minimal, almost terminal-like working shell that is easier to redesign from;
- no functional regression or intentional feature removal.

The user currently expects this handoff-preparation process to happen after the Phase 54 lane and before the deeper Phase 55 shell/design work.

## Guardrails

The future handoff-preparation phase must preserve:

- Solo OG and GO gameplay.
- Daily and Practice Solo persistence, including the accepted Phase 50 guest/account behavior.
- Multiplayer Practice/Daily OG and GO playability.
- Ranked Practice FIFO matchmaking.
- Private Practice requests, first-turn persistence, forfeit/cancel behavior, and live hosted/manual stability accepted in Phase 50.
- Account/auth behavior, Profile/Settings behavior, stats, progression, history, economy, definitions, sharing, accessibility, and responsive playability unless a later prompt explicitly changes one of those surfaces.
- The Home-on-refresh policy accepted in Phase 50.

The future phase should not change without separate authorization:

- gameplay rules;
- reward, XP, level, stats, scoring, Elo/rating, or Daily claim rules;
- Supabase schema/RLS/RPC/storage contracts;
- production deployment or Vercel configuration;
- public tunneling;
- stable `brrrdle` repository contents.

## Minimal-Shell Interpretation

The future minimal-shell phase should be a visual and structural simplification, not a product reduction.

Appropriate candidates to reduce or simplify:

- decorative gradients, glows, shadows, and visual flourishes;
- heavy animation or repeated motion that is not required for comprehension;
- overly dense decorative containers;
- one-off styling that makes later redesign harder;
- redundant visual hierarchy or excessive color emphasis;
- nonessential chrome around already-working game surfaces.

Elements to retain:

- game boards, keyboards, inputs, controls, modals, tabs, account surfaces, multiplayer controls, definitions, stats, settings, and profile surfaces;
- important gameplay feedback such as tile states, valid/invalid guess feedback, and completion/result affordances;
- enough visual distinction that the game remains testable and user-reviewable;
- responsive mobile and desktop behavior;
- accessibility and focus states;
- current automated test expectations unless intentionally updated by a later scoped prompt.

## Handoff Package Contents To Prepare Later

When the handoff-preparation phase is reached, create a repo-backed handoff package that includes:

- exact accepted commit/tag baseline at the time of handoff;
- a concise product/current-state digest;
- protected gameplay and persistence invariants;
- known source architecture and high-conflict files;
- current test and E2E gates;
- any remaining deferred backend/account/profile/multiplayer items;
- UI/design goals and non-goals;
- minimal-shell change summary and verification evidence;
- user-provided inspiration sites or references;
- generated concept images or design directions only if separately authorized at that time;
- recommended tools/skills for the next model/chat to consider, such as Impeccable, ShadCN, image generation, or other UI/design aids, without installing or using them until separately authorized.

## Current Phase Routing

The current routing intent is:

- **Phase 51:** account access, Profile simplification, player identity/menu design, and player-name policy decisioning. Admin/backend visualization should be placeholder/planning only or deferred.
- **Phase 52:** private Practice matchmaking expansion or related request-contract work, if still desired after Phase 51.
- **Phase 53:** stats, progression transparency, and public rating/profile metadata.
- **Phase 54:** Live/Lobby identity and spectator-adjacent polish.
- **Pre-Phase-55 handoff preparation:** minimal-shell simplification plus GPT-5.6 handoff package.
- **Phase 55+:** deeper Focus Mode, shell redesign, UI/theme direction intake, design-system planning, theme modernization, and concrete visual polish.

These route numbers are planning conveniences. Future planning passes may renumber or merge phases if doing so is safer and more cohesive.

## Phase 51 Impact

Phase 51 should be planned with this future handoff in mind:

- favor source-only account/profile/player-menu improvements that reduce confusion without adding decorative design complexity;
- defer design-heavy homepage widgets, broad shell redesign, major theme work, and visual overhaul ideas to the handoff or post-handoff phases;
- keep admin queue/backend visualization out of Phase 51 implementation unless the user later explicitly authorizes a narrow placeholder or planning-only foundation;
- preserve the accepted Phase 50 gameplay baseline.

## Open Questions For Later

- How minimal should the stripped shell be visually: pure terminal-like, restrained utility UI, or a neutral design-system baseline?
- Which animations are essential gameplay feedback and which can be removed?
- Which current text blocks should be preserved for functionality versus shortened for the handoff?
- Which inspiration sites and visual references should be included in the handoff package?
- Should the future handoff package include generated concept images, and if so, what visual directions should be explored?
- Which UI toolkit or design-system direction should the future model/chat evaluate first?

## Stop Conditions For Future Handoff Prep

When this work is eventually authorized, stop rather than proceed if:

- simplification would remove or break gameplay/account/multiplayer functionality;
- a design reduction requires changing backend contracts or migrations;
- visual simplification causes accessibility or mobile responsiveness regressions;
- source/test verification fails and cannot be fixed narrowly;
- the work drifts into full redesign, new dependency adoption, image-generation concept work, or production deployment without explicit authorization.
