# Progress Step 212: Phase 29 Planning Brief

**Status**: Completed - Awaiting User Review Before Unified Phase 29 Specification
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-20T04:52:52Z
**Completed**: 2026-06-20T04:52:52Z

## Authorization

The user authorized a Phase 29 planning brief pass only.

Allowed work:

- read governance, roadmap, completed Phase 28 materials, current progress records, public-profile-adjacent account/profile surfaces, notification surfaces, browser notification surfaces, About/Elo copy surfaces, relevant tests, Supabase/RLS context, and documentation;
- create `planning/phase-29/PLANNING-BRIEF.md`;
- update `planning/README.md` only if needed for discoverability;
- create this progress report and append the matching 12-column row to `progress/PROGRESS.csv`;
- run lightweight documentation verification only.

Not authorized:

- source/runtime implementation;
- test implementation;
- Supabase migration creation or execution;
- Vercel configuration;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 29 implementation or Phase 30 implementation;
- public leaderboards or public/guest spectation;
- service workers or push infrastructure;
- new custom skills, force-push, secret printing, or original stable `brrrdle` repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- `origin/main`: `f34f3c9463af09286cfd1230ba2312b19163f75e`
- Original stable repository: not used.

## Work Completed

- Created `planning/phase-29/PLANNING-BRIEF.md`.
- Updated `planning/README.md` so the active/next phase pointer and directory map discover Phase 29.
- Recorded Phase 29 planning progress in this report and `progress/PROGRESS.csv`.

## Planning Decisions

- Phase 29 remains focused on public player profile foundations and privacy-safe public identity.
- Public leaderboards remain Phase 30.
- Multiplayer rematch and same-settings play-again/search-again remain Phase 31.
- Public/guest spectation remains Phase 32.
- Theme proposal/template modernization remains Phase 33.
- Full concrete theme implementation remains Phase 34 or later.
- Chrome/browser notification diagnostics, browser notification click routing, Notification Center `Mark all read`, `Mark read` versus `Dismiss` simplification, and Elo transparency relocation to About are routed into Phase 29 as narrow Phase 28 carryover stabilization items.

## Mark Read Versus Dismiss Finding

Repository evidence shows that notification items store `readAt` separately from `dismissedAt`. A read notification can remain present as read metadata, while a dismissed notification is hidden by the view model. Because the current UI does not expose a meaningful show-read or archive workflow, Phase 29 planning recommends simplifying the UI unless Stage 29.1 finds an intentional future use for dismissed-but-not-read state.

## Verification

- Passed: `git diff --check`
- Passed: Python CSV shape check using `python3 -S` (`214` rows including header, `12` columns each, `last_id=212`)
- Passed: `git status --short --branch`

## Blockers

No blockers.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migrations, Supabase or Vercel configuration, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 29 implementation, Phase 30 implementation, public leaderboards, public/guest spectation, service workers, push infrastructure, new custom skills, force-push, secret printing, or original stable `brrrdle` repository work was performed.
