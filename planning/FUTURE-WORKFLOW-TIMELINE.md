# Future Workflow Timeline

**Status:** Historical planning and discussion aid.
**Created:** 2026-07-06.
**Authority:** Supporting roadmap document only. It does not authorize implementation, tests, migrations, deployment, Git/GitHub work, backup workflow execution, release work, gameplay-rule changes, Elo changes, or work in the original stable `brrrdle` repository.

## Purpose

This document gives a single forward-looking view of the work currently routed after Phase 49. It is meant to help decide whether Phase 50 should become a larger macro-phase while keeping individual stages narrow, reviewable, and verification-friendly.

Closure update, 2026-07-08: Phase 50 was expanded into the macro-phase recommended here, iterated through the Review Candidate Backup Loop, and was manually accepted by the user before the separately authorized Final Acceptance Backup. Use this document as historical rationale and workflow guidance, not as an active Phase 50 prompt.

The current recommendation is to make Phase 50 larger than recent phases only if it remains cohesive:

- one urgent repair lane for Solo completion-state persistence;
- one small current-surface convenience lane if the audit proves it is source-only and low risk;
- one documentation/routing lane for larger profile, private-match, stats, shell, and theme decisions.

The phase can be bigger. The stages should stay small.

## Current Baseline

- Phase 49 is complete, backed up, merged, branch-cleaned, and manually reviewed.
- Phase 49 manual review passed.
- Current expected `main` and `origin/main`: `cc878c6a109406b56f2a9195be6114c1ccf02259`.
- Phase 50 is accepted by the user and is closing through the Final Acceptance Backup.
- The original stable `brrrdle` repository remains untouched.
- Latest transition record before this document: `progress/PROGRESS-STEP-453.md`.

## Current Problem To Prioritize

The first real follow-up is not cosmetic. It is a Solo completion-state persistence bug:

- Daily Solo OG/GO and Practice Solo OG/GO can lose the final winning guess and completed end screen after the player wins, navigates away, and returns.
- Browser Back/Forward and ordinary route navigation can both trigger the issue.
- Incorrect valid guesses appear to persist correctly.
- Intermediate GO solved puzzles appear to persist correctly.
- XP, coins, level, and rewards do not appear to double-award after re-submitting, which is good and must be preserved.

That makes Phase 50 a better fit for Solo completion-state persistence than theme modernization.

## Big Phase, Small Stages

The phase scope sizing guide supports larger macro-phases when related work shares a user journey, data path, verification harness, or UI ownership. The safe pattern is:

- broaden the phase only around compatible work;
- keep each stage single-purpose;
- place audit and source-only-versus-addendum decisions before source edits;
- run focused tests after each source slice;
- save broad verification and visual review for final hardening.

For Phase 50, this means it is reasonable to consider a larger macro-phase, but not a grab bag.

## Recommended Phase 50 Shape

### Core Lane: Solo Completion Persistence

This lane should be in Phase 50.

Goals:

- reproduce or characterize the missing final winning guess and end-screen state for Daily Solo OG, Daily Solo GO, Practice Solo OG, and Practice Solo GO;
- audit route re-entry, browser Back/Forward, active progress, resume slots, storage writes, route cache, and completion-state hydration;
- repair the final completion persistence path if source-only is safe;
- preserve reward idempotence for XP, coins, level, stats, Daily claims, and progression rewards;
- preserve Phase 49 Progression HUD and Focus Mode behavior.

Likely stages:

1. Protected baseline and review intake.
2. Read-only Solo completion-state audit and reproduction.
3. Source-only versus storage/reward-contract decision.
4. Source/test repair for Solo completion-state persistence.
5. Focused reward idempotence and re-entry regression coverage.

### Optional Small Convenience Lane

This lane can be included in a larger Phase 50 only if the Phase 50 planning brief keeps it modest and stage-separated.

Good candidates:

- add a signed-in Sign out action back to Profile while preserving Settings as the account-management home;
- add a direct Profile-to-Settings Account Management button or deep link where copy tells users those controls live in Settings;
- make the Progression HUD clickable to Stats if it remains display-only and does not expose new public data;
- route Focus Mode preference/player-chip ideas without implementing persistent preferences yet.

Why these are plausible:

- they are visible current-surface cleanup items;
- they do not inherently require storage/RLS changes if kept source-only;
- they can be tested with focused component/UI tests.

Why they should stay optional:

- Profile/Auth/Settings are account-sensitive surfaces;
- player-chip popovers and persistent Focus Mode preferences could become shell/account-preference contract work;
- too many UI conveniences can distract from the urgent Solo completion bug.

### Documentation/Routing Lane

This lane should be included in Phase 50 if the user wants a bigger phase but does not want risky implementation sprawl.

Route, but do not implement yet:

- deeper Focus Mode that removes more page chrome;
- persistent Focus Mode preference in Settings;
- top-right player chip/popover with Profile, Settings, Sign out, sound, and Focus controls;
- broader desktop/mobile side-panel or compact navigation redesign;
- top-right Daily button consolidation;
- simplified public-by-default multiplayer profile model;
- private Practice request expansion to public profiles, GO, custom settings, inbox/outbox, and request opt-out settings;
- Stats clarity for Solo versus multiplayer, cloud-synced stats, and multiplayer performance stats;
- clickable Live/Lobby player names and safe Elo/rating metadata;
- theme/UI direction intake before theme templates are modernized.

## Recommended Timeline

| Phase | Recommended Focus | Implementation Level | Notes |
| --- | --- | --- | --- |
| Phase 50 | Solo completion-state persistence plus narrow review routing | Source/test for Solo bug; optional tiny UI convenience; documentation routing | Best next larger macro-phase if kept staged. |
| Phase 51 | Account access, Profile simplification, and player-chip/menu design | Likely mixed source-only plus possible profile/RLS decision gates | Good home for Profile sign-out if not included in Phase 50, public-by-default profile decisions, and account popover design. |
| Phase 52 | Private Practice matchmaking expansion | Likely contract-heavy; may need Supabase/RLS addenda | Multi-surface requests, GO, custom unranked Practice settings, inbox/outbox, opt-out controls. |
| Phase 53 | Stats, progression transparency, and public rating/profile metadata | Likely staged source plus possible storage/RLS decision gates | Solo/multiplayer stats clarity, cloud stats decisioning, HUD-to-Stats, public Elo/profile metadata. |
| Phase 54 | Live/Lobby identity and spectator-adjacent polish | Likely source plus privacy gates | Clickable names, safe profile cards, ranked metadata, spectator preview routing. |
| Phase 55 | Focus Mode expansion and mobile/desktop shell redesign | UI-heavy; likely broad visual review | Deeper Focus Mode, route rail/side-panel concepts, top-right Daily button consolidation. |
| Phase 56 | UI/theme direction intake and design system planning | Planning/design first | Capture the user's unshared theme and frontend direction before touching theme proposals. |
| Phase 57 | Theme proposal/template modernization | Planning/source docs; possible assets later | Update old theme templates after shell/profile/social surfaces settle. |
| Phase 58+ | Concrete themes and polish | Dedicated cosmetic implementation | Implement selected themes, assets, sounds, and full theme QA. |

## Review Candidate Backup Loop

Future phases should use a Review Candidate Backup Loop instead of forcing all manual review to happen before GitHub backup:

1. Final hardening creates a Review Candidate with verification evidence, local/Codex-browser preview instructions when useful, ignored visual artifacts, and the manual checklist.
2. The user may explicitly authorize a Review Candidate Backup so the candidate is available through the normal GitHub-backed hosted/live surface for desktop and mobile testing.
3. The phase remains open after that backup; it is not finally accepted, closed, released, or advanced.
4. The user gets a Manual Review Window on the hosted/live candidate. This is where checklist findings, device observations, local-preview observations, and visual-artifact concerns can be reported.
5. Directly phase-related findings may be fixed through a Review Follow-up inside the same phase, then the phase returns to Review Candidate.
6. Repeat Review Candidate Backup and Manual Review Window as needed.
7. Broader findings are routed to a later phase or explicit addendum.
8. Final phase closure and any Final Acceptance Backup happen only after manual review is accepted and a separate current prompt authorizes the protected Git/GitHub action.

## Workflow Diagram

```mermaid
flowchart TB
    A["Phase 49 complete and manually reviewed"] --> B["Phase 50 planning decision"]
    B --> C{"Can Phase 50 safely expand?"}
    C -->|Yes| D["Expanded Phase 50 macro-phase"]
    C -->|No| E["Conservative Phase 50 bug-fix phase"]

    D --> D1["Core lane: Solo completion-state audit and repair"]
    D --> D2["Optional lane: tiny account/HUD convenience if source-only"]
    D --> D3["Routing lane: profile, private-match, stats, shell, and theme decisions"]
    E --> E1["Solo completion-state audit, repair, verification, checklist"]

    D1 --> F["Final hardening, visual artifacts, and checklist"]
    D2 --> F
    D3 --> F
    E1 --> F

    F --> R["Review Candidate: verified but phase open"]
    R --> RB["Review Candidate Backup after explicit GitHub authorization"]
    RB --> MR["Manual Review Window on hosted/live candidate"]
    MR --> Q{"Manual review finding?"}
    Q -->|Directly phase-related| RF["Review Follow-up inside same phase"]
    RF --> F
    Q -->|Needs another review cycle| RB
    Q -->|Accepted or no phase feedback| G["Final acceptance and optional final backup after separate explicit authorization"]
    Q -->|New scope or protected action| NX["Route to later phase or explicit addendum"]
    NX --> G

    G --> H["Phase 51 account/profile/player menu"]
    H --> I["Phase 52 private Practice expansion"]
    I --> J["Phase 53 stats/progression/public rating metadata"]
    J --> K["Phase 54 Live/Lobby identity polish"]
    K --> L["Phase 55 deeper Focus Mode and shell redesign"]
    L --> M["Phase 56 UI/theme direction intake"]
    M --> N["Phase 57 theme template modernization"]
    N --> O["Phase 58+ concrete themes"]
```

## Items Safe To Consider For A Larger Phase 50

| Candidate | Recommendation | Reason |
| --- | --- | --- |
| Solo completion-state persistence | Include | Urgent user-reported bug, same Solo storage/navigation/reward path. |
| Completion reward idempotence regressions | Include | Must be verified with the Solo completion repair. |
| Profile Sign out convenience | Optional stretch | Likely source-only, but touches account/auth UI and should be isolated. |
| Profile-to-Settings Account Management deep link | Optional stretch | Small UX convenience if route/scroll targeting stays bounded. |
| Progression HUD click-through to Stats | Optional stretch | Related to Phase 49 HUD, but should remain display-only and local UI-only. |
| Focus Mode Settings preference | Route only unless proven tiny | Persistence may involve guest/account settings semantics. |
| Player-chip popover | Route only | Useful, but shell/account/control surface is broader than the Solo bug. |
| Public-by-default profile simplification | Route only | Likely privacy/model/RLS decision work. |
| Private Practice expansion | Route only | Likely social/request lifecycle and Supabase/RLS work. |
| Stats cloud sync or multiplayer stats | Route only | Likely storage/model and product-definition work. |
| Live/Lobby Elo/profile metadata | Route only | Public identity and privacy boundaries need dedicated gates. |
| Broad shell/side-panel redesign | Defer | High visual and navigation blast radius. |
| Theme modernization | Defer | User has additional UI/theme direction to share first. |

## Hard Deferrals

Do not pull these into Phase 50 without a later explicit change in authorization:

- private Daily implementation;
- ranked Daily implementation;
- strict one-active-session/session leases;
- server-authoritative Daily submissions;
- service workers/push infrastructure;
- spectator presence/count/list;
- production deployment or release;
- broad mobile/desktop shell redesign as an implementation item;
- compact side-dock implementation;
- gameplay-rule changes;
- Elo algorithm changes;
- full theme implementation.

## Suggested Decision Points For The User

Before creating the Phase 50 planning brief, decide:

1. Should Phase 50 be bug-only, or an expanded macro-phase?
2. If expanded, should it include one small convenience implementation slice, or only documentation routing beyond the Solo bug?
3. Which tiny convenience item is highest value: Profile Sign out, Profile-to-Settings deep link, or HUD click-through to Stats?
4. Should all theme work wait until after a dedicated UI/theme direction intake phase? The current recommendation is yes.

## Recommended Next Move

Create the Phase 50 planning brief as a larger macro-phase with this structure:

- primary source/test lane for Solo completion-state persistence;
- optional tiny source-only convenience lane, gated by audit;
- documentation/routing lane for Focus Mode, account/profile, private Practice, Stats, Live identity, shell, and themes;
- explicit deferral of theme modernization until after UI/theme direction intake.

This gives Phase 50 more useful payload without letting it become a sprawling, high-risk implementation bundle.
