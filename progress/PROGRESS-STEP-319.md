# Progress Step 319 - Phase 38 Stage 38.5 Spectator Presence/Count/List Gate

**Status**: Completed - Awaiting User Review Before Stage 38.6
**Phase**: 38, Public/Spectator Readiness
**Stage**: 38.5, spectator presence/count/list gate
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-30T22:21:13Z
**Completed**: 2026-06-30T22:21:13Z

## Authorization

The user authorized Phase 38 Stage 38.5 only: spectator presence/count/list audit and scope gate using the completed Stage 38.4 public/guest Live discovery and read-only spectation baseline.

This pass was limited to reading required governance and Phase 38 planning/spec/addendum/implementation/progress materials, confirming repository state, preserving prior user edits, auditing public spectator source/RLS/privacy surfaces, creating this progress report and matching CSV row, and running lightweight documentation verification.

This pass did not authorize and did not perform source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration changes, deployment, staging, commits, pushes, PR creation, merges, releases, branch deletion, service worker/push work, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work.

## Repository Boundary Confirmation

- Working repository: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`.
- Branch: `main`.
- Local `HEAD`: `cdd780989535a3081a5e034bde1a247569ca28af`.
- `origin/main`: `cdd780989535a3081a5e034bde1a247569ca28af`.
- Remote: `origin https://github.com/ryanjosephkamp/brrrdle-dev.git`.
- The original stable `brrrdle` repository was not used.
- The user-edited `planning/phase-37/REVIEW-CHECKLIST.md` state was preserved.

## Audit Findings

- Stage 38.4 added public/guest Live discovery and read-only spectation through the dedicated `get_public_live_v1_spectator_games_v1` projection.
- The public spectator projection is intentionally row-based. It returns safe Practice game display/progress/outcome/player-summary data and read-only capability flags, but it does not return spectator viewer counts, spectator presence records, viewer identifiers, session identifiers, or identity-bearing spectator lists.
- The app source currently consumes public spectator rows for Live cards and focused read-only details. It has no authorized public/guest viewer presence write path, no presence table integration, and no authoritative aggregate spectator count source.
- The current local UI count named around spectator games counts visible spectatable game rows, not people watching those games. Reusing that value as a spectator count would be misleading.
- Identity-bearing spectator lists remain unsafe for Phase 38 because they would introduce social/profile exposure, viewer tracking, and abuse surfaces ahead of the later social/profile/private matchmaking phases.
- Aggregate spectator counts should also remain deferred for now. A truthful aggregate count needs a dedicated privacy-safe, bounded, abuse-resistant presence/count design and likely a separate migration/RLS addendum or later approved source contract. Stage 38.5 did not authorize that implementation.

## Recommendation

- Defer identity-bearing spectator lists out of Phase 38.
- Defer aggregate spectator counts out of Phase 38 unless a later explicit prompt authorizes a dedicated presence/count addendum and implementation path.
- Proceed to Stage 38.6 final hardening after user review.
- Stage 38.6 should verify the absence of spectator presence/count/list UI as intentional, while hardening public/guest read-only spectation, authenticated spectator preservation, Daily exclusion, forbidden-field defenses, stale/terminal fallbacks, and mutation-safety boundaries.

## Routing

- Public/guest read-only Live spectation remains in Phase 38 through the completed Stage 38.4 source integration.
- Spectator presence/count/list work remains deferred to a later dedicated gated design, most likely alongside or after Phase 39 social/profile and private matchmaking planning if identity-bearing behavior is desired.
- Public/social profile browsing, clickable rival profiles, direct player match requests, and private matchmaking expansion remain routed to Phase 39.
- Public site stats, private developer dashboard, onboarding/help/tutorial UX remain routed to Phase 40.
- EXP/coin/collectible header counters and Focus Mode remain routed to Phase 41 or later.
- Theme work, service workers, push subscriptions, production deployment/release, gameplay-rule changes, and Elo changes remain later gated work.

## Verification

Passed:

- `git diff --check`
- progress CSV shape check using `python3 -S`: `rows=321 columns=[12] last_id=319`
- non-printing credential-shaped secret/artifact scan: `scanned_files=31 credential_pattern_hits=0`
- ignored-artifact check: `tracked_forbidden=0 staged_forbidden=0 staged_files=0`
- watched-port cleanup check for `5173`, `5174`, `3000`, and `4173`: clear
- `git status --short --branch`

## Resource Observations

- No local dev server was started for this stage.
- No browser or Playwright process was started.

## Blockers And Open Questions

- No blockers remain for Stage 38.6 final hardening.
- Open decision for a future phase: whether spectator presence should ever be aggregate-only, identity-bearing, or omitted entirely. Any implementation should start with a dedicated privacy/RLS addendum rather than an app-only UI change.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation or execution, Vercel/Supabase configuration change, deployment, staging, commit, push, PR creation, merge, release, branch deletion, service worker/push work, gameplay/Elo change, secret/private-data/local-artifact exposure, brrrdle GitHub backup workflow execution, or original stable repository work was performed.
