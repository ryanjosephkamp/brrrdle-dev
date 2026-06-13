# brrrdle Development Roadmap

**Status**: Ready for Codex – v1.0
**Last Updated**: 2026-06-11
**Purpose**: This document serves as the long-term vision and planning reference for the brrrdle project. It is intended to be given to Codex so it can propose its own optimized staging and execution strategy.

---

## Overview

The goal of this roadmap is to evolve `brrrdle` into a more organized, social, and scalable experience while protecting the stability of the current playable version.

All new development will take place in the `brrrdle-dev` repository. The original `brrrdle` repository will remain as the stable reference version.

This document outlines planned phases and strategic priorities. Codex is expected to read this document and propose improvements to phasing, staging, and implementation approach. Codex will have significant flexibility in deciding how to stage work within phases and what technical approach to take.

---

## Current State (End of Phase 23)

- Core gameplay (Solo OG/GO + Multiplayer OG/GO) is stable and playable.
- Comprehensive gameplay-correctness testing suite has been added (Vitest + Playwright E2E with two-client Supabase coverage).
- Daily puzzle rotation, claim guards, Hard Mode, forfeit/timeout logic, and GO transitions are reliable.
- The project uses a Vite + React + Supabase architecture with real-time multiplayer support.

---

## Phase Summary Table

| Phase     | Main Focus                                           | Key / Complex Features                                      | Priority     | Notes |
|-----------|-------------------------------------------------------|-------------------------------------------------------------|--------------|-------|
| Phase 23  | Multiplayer stabilization + Testing suite            | Multiplayer unification, bug fixes, testing infrastructure  | Complete     | - |
| **Phase 24** | **Tab Restructuring + Core Solo/Multiplayer Experience** | Solo & Multiplayer tabs, subtabs, Lobby, scoped Live gallery | **High**     | Likely needs internal staging |
| Phase 25  | Notifications + Dashboard Improvements               | Turn notifications, active games widgets                    | Medium       | Can be split from Phase 24 |
| Phase 26  | Theming & Visual Polish                              | Theme system, skins, visual consistency                     | Medium       | - |
| Phase 27+ | Expansion & Advanced Features                        | Additional modes, marketplace, deeper social features       | Future       | High-level |

---

## Phase 23 Summary (Brief)

Phase 23 focused on stabilizing multiplayer after earlier issues. Major accomplishments included unifying async/live models, adding time limits, improving GO transitions and keyboard consistency, and delivering a robust gameplay testing suite. The project left Phase 23 in a significantly more stable state.

---

## Phase 24 – Tab Restructuring & Core Experience (Detailed)

### Goals
- Improve navigation by cleanly separating Solo and Multiplayer experiences.
- Remove the Practice tab and redistribute its content logically.
- Create a scalable tab/subtab structure.
- Lay groundwork for richer multiplayer social features.
- Maintain the ability for players to have multiple active games simultaneously.

### Major Structural Changes
- Remove the **Practice** tab.
- Add two new main tabs: **Solo** and **Multiplayer**.
- Keep the **Daily** tab (primarily as a calendar and routing hub).
- Add a dedicated **History** main tab (global history for both Solo and Multiplayer games).

### Solo Tab – Proposed Subtabs

1. **Main / Landing Subtab**
   - Primary entry point for solo play.
   - Quick access to start Practice or Daily solo games.
   - Section showing currently active solo games (clickable).
   - Section showing recently completed solo games (last 3–5).
   - Future expansion area for new solo modes.

2. **Daily Solo Subtab**
   - Dedicated area to play Daily Solo OG and GO.
   - Should support playing both daily variants concurrently where possible.

3. **Practice Solo Subtab**
   - Area for playing Practice Solo OG and GO.
   - Should feel consistent with the Daily Solo subtab.

4. **Active Solo Games Subtab (Gallery)**
   - Visual gallery showing the current board state of all active solo games (daily + practice).
   - Clicking a game opens it in the appropriate subtab.
   - Persistent state when navigating between subtabs.

5. **Solo History** (via Global History Tab)
   - No dedicated Solo History subtab.
   - Recent completed games will appear on the Main/Landing subtab.
   - Clicking the recent history list or table will take the user to the dedicated global **History** main tab.
   - Clicking an individual game from the recent list will open that game’s history/review view.

### Multiplayer Tab – Proposed Subtabs

1. **Main / Landing Subtab**
   - Similar structure to the Solo landing subtab.
   - Additional live snapshot of open lobbies or currently active multiplayer games.

2. **Daily Multiplayer Subtab**
   - Dedicated area for Daily Multiplayer OG and GO.
   - Should support concurrent play of both variants where possible.

3. **Practice Multiplayer Subtab**
   - Area for Practice Multiplayer games (with time limit options).

4. **Active Multiplayer Games Subtab (Gallery)**
   - Gallery view of the player’s currently active multiplayer games.
   - Shows current board state.

5. **Lobby Subtab (New)**
   - Dynamic table of currently open lobbies.
   - Shows relevant metadata (game type, creator info, etc.).
   - Players can join lobbies directly from this table.

6. **Live Subtab (New – Scoped)**
   - Gallery showing ongoing multiplayer games.
   - Shows live board and keyboard snapshots.
   - **Click behavior**:
     - If the current player is one of the two participants in the game → clicking enters the game so they can resume playing.
     - If the current player is not a participant → clicking enters the game as a spectator (read-only).
   - Spectators should be visible to the players and other spectators.
   - Completed games should briefly show the result before being removed from the gallery.
   - Should support sorting and filtering.
   - Initial scope, implementation details, and exact visibility rules are left flexible for Codex to decide.

7. **Multiplayer History** (via Global History Tab)
   - No dedicated Multiplayer History subtab.
   - Recent completed games will appear on the Main/Landing subtab.
   - Clicking the recent history list or table will take the user to the dedicated global **History** main tab.
   - Clicking an individual game from the recent list will open that game’s history/review view.

### Additional Features Desired in Phase 24

- **Persistent State**: State should be preserved when switching between subtabs.
- **Dashboard Widgets** (on main landing page of the app): Show currently active games across both Solo and Multiplayer. Codex should propose the best implementation approach.
- **Notifications** (Lower priority): Especially turn notifications for multiplayer games. Can be deferred to Phase 25 if scope is too large.
- **Spectator Mode**: Build upon existing spectator functionality. Behavior when clicking games in the Live subtab is defined above.

### Priority Guidance for Phase 24

If scope needs to be reduced, the following are considered lower priority and can be deferred:
- Full Live gallery with spectator mode
- Notifications system
- Global History main tab (though recent games lists on landing subtabs are higher priority)

Core tab restructuring, subtabs, Lobby, and Active Games galleries are higher priority.

### Success Criteria for Phase 24

Codex **must** define its own success criteria for Phase 24. Creating success criteria is **mandatory**.

While Codex has discretion over the exact criteria, one non-negotiable requirement is that the full existing gameplay testing suite must continue to pass. All core gameplay mechanics (Solo OG/GO, Multiplayer OG/GO, Daily rotation, Hard Mode, forfeit/timeout logic, GO transitions, keyboard state, etc.) must remain functional and unbroken after the changes in Phase 24.

Codex is expected to document its chosen success criteria clearly before beginning implementation.

---

## Later Phases (Higher Level)

### Phase 25 – Notifications & Dashboard Improvements
- Full notification system (especially multiplayer turn updates).
- Refined dashboard widgets showing active games.
- Polish based on usage of the new tab system.

### Phase 26 – Theming & Visual Polish
- Comprehensive theme and skin system.
- Improved visual consistency across the application.

### Phase 27+ – Expansion
- Additional game modes and variants.
- Marketplace / consumables system.
- Deeper social and community features.
- Further expansion of the Live and spectator experience.
- Potential refinements to the global History tab.

---

## Guiding Principles

- The original `brrrdle` repository should remain stable.
- All new development targets the `brrrdle-dev` repository.
- Codex should be given significant autonomy to propose staging, architecture, and implementation order.
- Risk should be managed by breaking large efforts into logical stages where appropriate.
- Features with high complexity (especially real-time systems like the Live gallery) should be carefully scoped. Codex has flexibility to decide initial scope and staging within Phase 24.
- Success criteria are mandatory. Codex must define its own success criteria (with the existing test suite remaining fully functional as a hard requirement).

---

**End of Roadmap – Ready for Codex (v1.0)**
