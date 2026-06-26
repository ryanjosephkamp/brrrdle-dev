# Phase 33 Competitive Ladder V2 Readiness Specification

**Status**: Unified specification for review.
**Repository**: `brrrdle-dev` only.
**Created**: 2026-06-25.
**Phase focus**: Competitive ladder v2 readiness, gated timed Practice ranked, display-only rank bands, and public ranked leaderboard polish.

## Authority

This specification is governed by the current user prompt, `CONSTITUTION.md`, `planning/governance/PROMPT-PACKAGE-STANDARD.md`, `BRRRDLE-SPEC.md`, completed Phase 32 stabilization, completed Phase 31 postgame actions, completed Phase 30 public leaderboards, completed Phase 29 public profiles, completed Phase 28 Live spectator behavior, completed Phase 27 ranked Practice foundations, `planning/phase-33/PLANNING-BRIEF.md`, `docs/ranked-multiplayer.md`, `docs/supabase.md`, `docs/deployment.md`, `progress/PROGRESS.csv`, and current progress reports.

This specification does not authorize source/runtime implementation, test implementation, Supabase migration creation or execution, deployment, Vercel or Supabase configuration, commits, pushes, pull requests, merges, releases, branch deletion, public/guest spectation implementation, service workers, push infrastructure, gameplay-rule changes, Elo algorithm changes, force-push, secret printing, private data exposure, local session artifact exposure, running the brrrdle GitHub backup workflow, or work in the original stable `brrrdle` repository.

## Purpose

Phase 33 should move the competitive ladder forward without destabilizing the ranked foundations that are already working. The phase should lock down the next competitive product layer while keeping Elo authority, Daily integrity, and public leaderboard privacy intact.

The approved Phase 33 shape is:

1. audit timed Practice ranked readiness;
2. plan and execute a migration/RLS addendum only if timed ranked implementation proceeds;
3. add display-only rank bands;
4. remove the player-facing public ranked leaderboard `All buckets` mode;
5. implement timed Practice ranked only if the audit and migration/RLS gates prove it safe;
6. explicitly keep Daily ranked and ranked custom/private-code games deferred.

Phase 33 also records the user-observed Vercel/auth/account-management and onboarding needs, but routes those out of Phase 33.

## Baseline

- Local `main` and `origin/main` were confirmed during Phase 33 planning at `32f01d032ceb0c4d2dae31476f2a3ccccbf2b692`.
- Phase 32 is complete, merged, visually reviewed, manually checklisted, backed up through the repository workflow, and cleaned up.
- Phase 32 repaired rematch lifecycle, ranked search-again routing, unranked lobby creator routing, safe opponent identity labels, account avatar accent propagation, no-comma rating display, and real two-client E2E coverage.
- Ranked multiplayer currently means signed-in, untimed ranked Practice v1 only.
- Current app and SQL surfaces explicitly reject timed Practice ranked:
  - `src/multiplayer/matchmaking.ts` marks positive `timeLimitMs` ranked Practice as deferred;
  - `src/multiplayer/scoring.ts` marks timed ranked as ineligible for rating;
  - Phase 27 trusted ranked queue/finalization/settlement RPCs reject non-null/positive `time_limit_ms`.
- Current app rating buckets are `multiplayer:og` and `multiplayer:go`.
- Current public ranked leaderboard UI exposes `All buckets`, `OG`, and `GO`; the player-facing `All buckets` mode should be removed in Phase 33.

## Locked Decisions

- **Phase 33 default scope**: audit plus safe display/leaderboard polish first; timed Practice ranked implementation is conditional on Stage 33.1 and migration/RLS gates.
- **Timed ranked v1 time control**: if timed Practice ranked proceeds, support exactly one ranked clock first: `5 minutes` per side (`300000` ms). Other Practice time-limit options remain unranked.
- **Timed ranked bucket semantics**: if timed Practice ranked proceeds, use separate rating buckets from untimed ranked Practice:
  - `multiplayer:og:timed:v1`
  - `multiplayer:go:timed:v1`
- **Untimed ranked buckets stay unchanged**: `multiplayer:og` and `multiplayer:go` remain current ranked Practice v1.
- **Rank bands**: Phase 33 may implement display-only rating-derived rank bands. Bands have no authority over matchmaking, settlement, Elo movement, or leaderboard sorting.
- **Rank band thresholds**:
  - `Learner`: rating below `900`
  - `Bronze`: `900` through `1099`
  - `Silver`: `1100` through `1299`
  - `Gold`: `1300` through `1499`
  - `Platinum`: `1500` through `1699`
  - `Diamond`: `1700` through `1899`
  - `Master`: `1900` and above
- **Provisional status remains separate**: provisional/established state continues to come from rated-game count and does not change the band threshold.
- **Public leaderboard filter**: remove the player-facing `All buckets` control and default to `OG ranked Practice`.
- **Public leaderboard RPC**: keep any existing `p_bucket null` RPC behavior intact unless a migration/RLS addendum separately changes it. Phase 33 UI should not expose the combined all-buckets table.
- **Daily ranked**: deferred.
- **Ranked custom/private-code games**: deferred.
- **Vercel/auth/account management**: route to a later auth/deployment readiness phase.
- **Onboarding/help**: route to a later beginner-friendly UX phase.

## Goals

1. Preserve current untimed ranked Practice v1 behavior.
2. Add a precise readiness path for timed Practice ranked instead of flipping deferred guards opportunistically.
3. Define timed ranked queue, settlement, bucket, leaderboard, and verification requirements.
4. Add display-only rank bands that help players understand ratings without changing Elo authority.
5. Simplify the public ranked leaderboard by removing the player-facing all-buckets mode.
6. Preserve Phase 32 multiplayer stabilization, Phase 31 Practice postgame boundaries, Phase 30 public leaderboard display authority, Phase 29 public profile privacy, Phase 28 Live read-only behavior, Phase 27 trusted ranked Practice behavior, Daily Multiplayer integrity, and all gameplay rules.

## In Scope

### Timed Practice Ranked Readiness

Phase 33 must audit timed Practice ranked before implementation. If implementation proceeds, the first slice is limited to:

- signed-in users only;
- Practice Multiplayer only;
- OG and GO modes;
- one clock: `5 minutes` per side (`300000` ms);
- existing Practice word lengths;
- existing Practice Hard Mode option;
- trusted queue/finalization/settlement paths;
- separate timed buckets for OG and GO;
- no Daily ranked;
- no custom/private-code ranked;
- no Elo formula changes.

Required audit questions:

- Can both clients observe and persist fair clock state without stale local projections mutating the result incorrectly?
- Does trusted settlement have enough durable timeout evidence to decide winner/loser without trusting arbitrary client claims?
- Can queue matching require exact mode, word length, Hard Mode, and the canonical `300000` ms time control?
- Can finalization create a durable ranked game whose projection exactly matches the matched queue contract?
- Can settlement reject noncanonical timed ranked games and all unsupported time controls?
- Do timed buckets require new SQL helpers, constraints, grants, indexes, RPC return fields, or public leaderboard changes?

### Timed Practice Ranked Implementation If Approved

Implementation may proceed only after Stage 33.1 proves the path and any Stage 33.2/33.3 migration/RLS work succeeds.

Expected behavior if implemented:

- `Search ranked Practice` should offer a clearly labeled timed ranked option only for the canonical `5 minutes` clock.
- Timed ranked queue requests must match only compatible timed ranked requests.
- Timed ranked games must store the timed bucket and canonical time limit.
- Timed ranked settlement must accept only trusted completed results with the approved timed bucket and `300000` ms time limit.
- Timeout loser precedence remains unchanged.
- Match points and Elo remain separate.
- Timed ranked postgame search-again should use the trusted ranked queue path, not direct rematch.
- Untimed ranked Practice v1 remains available and unchanged.

### Display-Only Rank Bands

Phase 33 may add rank bands to player-facing ranked surfaces:

- public ranked Practice leaderboard rows;
- competitive multiplayer rating buckets in Stats;
- ranked guidance copy where useful.

Rank bands must be calculated from the displayed current rating only. They must not:

- change rating movement;
- change K factor;
- change provisional-game count;
- change expected-score formula;
- change ranked queue matching;
- change settlement;
- create new persisted authority unless a later spec explicitly requires a cached display field.

Recommended display:

- provisional rows may show `Provisional` plus the rating-derived band;
- established rows may show `Established` plus the rating-derived band;
- copy should explain that bands are shorthand labels for current Elo ranges.

### Public Ranked Leaderboard Filter Cleanup

Phase 33 should remove the player-facing all-buckets mode:

- `All buckets` button is removed;
- `OG` and `GO` remain as the only player-facing bucket controls;
- default player-facing bucket is `multiplayer:og`;
- selected-bucket copy should say `Showing OG ranked Practice` or `Showing GO ranked Practice`;
- no-comma rating labels remain preserved;
- row-limit controls remain unchanged;
- empty/loading/error/authentication states remain privacy-safe;
- existing public leaderboard privacy filters remain unchanged.

No SQL change should be needed for this cleanup. If the implementation discovers SQL coupling, stop and route through a migration/RLS addendum.

### Documentation

Phase 33 should update documentation only as outcomes become true:

- `docs/ranked-multiplayer.md` for rank bands, timed ranked status, and deferrals;
- `docs/supabase.md` if migration/RLS changes are planned or executed;
- `planning/phase-33/CHANGELOG.md` at final hardening;
- `planning/phase-33/REVIEW-CHECKLIST.md` after implementation and visual review;
- progress reports for every stage.

## Out Of Scope

- Daily ranked implementation.
- Ranked custom/private-code games.
- More than one timed ranked time control.
- Elo algorithm changes, K-factor changes, expected-score changes, provisional-window changes, or rating transaction authority changes.
- Gameplay-rule changes.
- Public/guest spectation.
- Clickable leaderboard profiles, in-game profile cards, or broader social/profile browsing.
- Vercel deployment protection changes, production deployment, Supabase auth configuration, magic-link redirect configuration, password/email management implementation, and account creation copy changes.
- Beginner onboarding/tutorial/help implementation.
- Service workers, push subscriptions, background push, or deployment config.
- Theme proposal/template modernization and concrete theme implementation.
- Unrelated UI redesign.
- GitHub backup workflow execution.
- Work in the original stable `brrrdle` repository.

## Explicit Deferrals

### Phase 34: Auth And Deployment Readiness

Route the user-observed Vercel sign-in wall and account-management concerns here:

- determine whether the Vercel login page is preview deployment protection or production access configuration;
- audit Supabase Site URL and redirect URLs;
- audit magic-link landing behavior;
- clarify email/password account creation copy;
- add normal account password reset/change and email change flows if safe;
- review Settings account management and Danger Zone responsibilities.

Phase 33 must not configure Vercel or Supabase.

### Later UX Phase: Onboarding And Help

Route beginner-friendly onboarding/help after auth/deployment readiness and the competitive ladder path are stable:

- first-time-player instructions;
- optional walkthrough or tooltips;
- durable help/about content;
- no gameplay difficulty changes unless a later spec approves them.

### Public/Guest Spectation

Keep public/guest spectation deferred to a later gated phase. It still requires sanitized public projections, RLS review, and explicit authorization.

## Detailed Success Criteria

Phase 33 succeeds when all approved stage work is complete and:

- untimed ranked Practice v1 remains intact;
- Daily ranked remains unavailable;
- ranked custom/private-code games remain unavailable;
- Elo algorithm and gameplay rules remain unchanged;
- rank bands, if implemented, are display-only and tested as non-authoritative;
- public ranked leaderboard no longer exposes a player-facing `All buckets` button/view;
- public ranked leaderboard defaults to `OG`;
- if timed Practice ranked is implemented, it supports only `5 minutes` per side in separate timed buckets and passes trusted queue/finalization/settlement verification;
- if timed Practice ranked is not implemented, the phase leaves a clear audit/addendum record and safe next gate;
- public leaderboard privacy and display-only authority remain intact;
- Phase 32 rematch, queue/lobby routing, participant identity, account avatar, no-comma rating display, and E2E protections remain intact;
- visual handoff review and manual review checklist expectations are satisfied before Git handoff.

## Recommended Stage Breakdown

### Stage 33.0: Protected Baseline

- Read governance, Phase 32 completion materials, this spec, ranked docs, Supabase docs, deployment docs, workflow docs, package/test surfaces, and relevant source/test surfaces.
- Confirm repository state, branch, remotes, `HEAD`, and `origin/main`.
- Confirm the original stable `brrrdle` repository is not being used.
- Record current uncommitted Phase 33 planning/spec/progress artifacts.
- Run resource/process checks.
- Run the protected baseline verification gate.

### Stage 33.1: Ranked Ladder Audit

- Audit timed Practice clock behavior, timeout evidence, queue creation, queue status, queue pair claiming, game finalization, trusted settlement, rating buckets, public leaderboard projections, and current E2E coverage.
- Confirm the exact app and SQL changes required for canonical `5 minutes` timed ranked.
- Confirm rank-band implementation is source-only.
- Confirm public leaderboard all-buckets removal is source-only.
- Confirm Vercel/auth/account-management remains routed to Phase 34.
- Decide whether Stage 33.2 migration/RLS addendum planning is required. Expected decision: yes if timed ranked implementation proceeds.

### Stage 33.2: Timed Ranked Migration/RLS Addendum Planning If Required

Run only if Stage 33.1 recommends timed ranked implementation.

- Define additive SQL/RPC/RLS changes for timed ranked queue, finalization, settlement, bucket helpers, grants, indexes, and public leaderboard projection policy.
- Preserve untimed ranked Practice v1.
- Preserve Daily ranked deferral.
- Preserve custom/private-code ranked deferral.
- Define non-printing privacy/abuse probes.
- Do not create or run migrations.

### Stage 33.3: Timed Ranked Migration/RLS Execution If Approved

Run only after a clean addendum and explicit execution authorization.

- Create exactly the approved additive migration(s).
- Apply only to confirmed `brrrdle-dev` if target and credentials are unambiguous.
- Run privacy/abuse probes.
- Stop before app implementation if the migration or probes fail.

### Stage 33.4: Rank Bands And Leaderboard Filter Cleanup

- Add display-only rank band helpers and tests.
- Integrate rank bands into approved ranked surfaces.
- Remove the player-facing public leaderboard `All buckets` control.
- Default public ranked leaderboard to `OG`.
- Preserve no-comma rating displays.
- Add focused component/formatter tests.

### Stage 33.5: Timed Practice Ranked Domain And Repository Foundations If Approved

Run only if Stage 33.1 through Stage 33.3 succeed.

- Extend rating bucket parsing and formatting to support timed buckets.
- Extend ranked eligibility for canonical `300000` ms only.
- Preserve untimed ranked Practice v1 eligibility.
- Preserve all other timed Practice options as unranked.
- Preserve Daily ranked and custom/private-code ranked deferrals.
- Add strict DTO parsing for any new RPC fields.
- Add focused domain/repository tests.

### Stage 33.6: Timed Practice Ranked UI Integration If Approved

Run only after Stage 33.5 succeeds.

- Add clear UI affordance for timed ranked `5 minutes` only.
- Keep unsupported ranked modes hidden or clearly unavailable.
- Preserve Phase 32 ranked search-again routing and postgame behavior.
- Update copy so players understand timed and untimed ranked are separate tracks.
- Add focused component/route tests.

### Stage 33.7: Real Two-Client E2E, Visual Review, Manual Checklist, And Final Hardening

- Add real two-client Supabase-backed E2E for any timed ranked implementation.
- Verify rank bands and leaderboard filter cleanup.
- Verify explicit Daily/custom ranked deferrals.
- Run final verification gate.
- Run local visual handoff review for changed user-visible ranked surfaces.
- Generate `planning/phase-33/REVIEW-CHECKLIST.md`.
- Create `planning/phase-33/CHANGELOG.md`.
- Run non-printing secret/artifact checks and watched-port/process cleanup checks.

## Timed Practice Ranked Requirements

Timed ranked implementation must satisfy all requirements below before rating movement is enabled:

- Queue requests include the canonical time limit and reject all other time limits for ranked play.
- Queue compatibility matches mode, scope, word length, Hard Mode, rating bucket, and exact `300000` ms time limit.
- Finalized game projection includes ranked status, timed bucket, canonical time limit, and participants matching the queue reservation.
- Settlement verifies the durable game came from a matched ranked queue reservation.
- Settlement rejects unranked, Daily, custom/private-code, noncanonical time-limit, missing-time-limit, malformed, nonparticipant, corrupt, duplicate-user, and unsupported-bucket evidence.
- Settlement treats timeout loser precedence exactly as current gameplay scoring does.
- Clients never directly write rating profiles or rating transactions.
- Browser code cannot create arbitrary timed ranked buckets.
- Public leaderboard exposure for timed buckets is either explicitly included by addendum/spec or stays unavailable.

## Rank Band Requirements

- Rank bands are derived from the current rounded rating value.
- Rank bands must be deterministic and pure.
- Rank bands must not require a migration.
- Rank bands must not be used by matchmaking or settlement.
- Tests must prove each threshold boundary.
- Copy must explain that rank bands are display labels for Elo ranges.
- Provisional status remains visible and separate.

## Public Leaderboard Cleanup Requirements

- Remove `All buckets` from `PUBLIC_RANKED_LEADERBOARD_BUCKET_OPTIONS` or equivalent player-facing controls.
- Change default bucket state from `null` to `multiplayer:og`.
- Keep `multiplayer:go` selectable.
- Preserve repository query normalization unless implementation proves it must be tightened.
- Preserve public-safe DTO parsing and forbidden-field rejection.
- Update tests that currently expect `All buckets`.
- Add tests that `All buckets` no longer renders.

## Migration And RLS Constraints

No migration is authorized by this spec. A later addendum is required before SQL work.

If timed ranked proceeds, the addendum must define:

- new timed bucket helper behavior;
- queue creation validation;
- pair-claim compatibility;
- queue status output;
- finalization validation;
- settlement validation;
- profile/transaction bucket constraints;
- public leaderboard projection behavior for timed buckets, if any;
- grants and revokes;
- indexes;
- rollback plan;
- privacy probes;
- abuse probes.

The addendum must preserve:

- current untimed ranked Practice v1;
- Daily claim safety;
- public profile default-private/moderation boundaries;
- participant identity RPC boundaries;
- rematch RPC boundaries;
- public leaderboard display-only authority;
- forbidden private fields and local artifacts.

## Verification Strategy

Documentation/spec stages:

- `git diff --check`
- Python CSV shape check using `python3 -S`
- non-printing secret/artifact scan over changed tracked and untracked repository files
- ignored-artifact check
- `git status --short --branch`

Implementation stages, if later authorized:

- focused rank/rating/leaderboard tests first;
- focused timed ranked domain/repository tests before UI integration;
- focused migration privacy/abuse probes if SQL changes land;
- `npm run lint`;
- `npm run test`;
- `npm run build`;
- `npx tsc -p tsconfig.api.json --noEmit`;
- real two-client Supabase-backed E2E for any timed ranked queue/finalization/settlement path;
- `npm run test:e2e` and `npm run test:full` during final hardening;
- visual handoff review for user-visible ranked changes;
- manual review checklist before Git handoff;
- non-printing secret/artifact checks and watched-port/process cleanup checks.

## Visual Handoff Review Expectations

Before Phase 33 Git handoff, capture local-only visual review evidence for changed user-visible surfaces where feasible:

- public ranked leaderboard showing only `OG` and `GO`;
- public ranked leaderboard defaulted to `OG`;
- rank bands on leaderboard or Stats surfaces if implemented;
- timed ranked UI if implemented;
- explicit unavailable/deferred Daily/custom ranked affordances if visible.

Screenshots, videos, traces, auth state, tokens, and local session artifacts must remain ignored/local-only and must not be committed.

## Manual Review Checklist Expectations

Before Phase 33 Git handoff, generate `planning/phase-33/REVIEW-CHECKLIST.md` if implementation work lands.

The checklist should include:

- public leaderboard `All buckets` removal;
- `OG` default and `GO` selection;
- rank bands and threshold behavior if implemented;
- timed ranked queue/game/settlement behavior if implemented;
- Daily ranked still unavailable;
- ranked custom/private-code games still unavailable;
- preserved Phase 32/31/30/29/28/27 invariants;
- local-only visual artifact confirmation.

## GitHub Backup Workflow Expectations

Do not run the brrrdle GitHub backup workflow unless the user explicitly invokes and authorizes it. If Phase 33 later completes and the user requests backup, use the local brrrdle GitHub backup skill and preserve its stop conditions, explicit invocation contract, and squash-merge tree-equivalence model.

## Risks

- Timed ranked is rating authority work, not a simple UI toggle.
- Existing SQL rejects timed ranked, so enabling it without an addendum would create app/database mismatch.
- Too many timed ranked buckets would fragment matchmaking; Phase 33 avoids that by choosing one v1 clock.
- Sharing timed and untimed ratings would confuse player meaning and corrupt ladder interpretation.
- Rank bands can imply authority if copy is vague.
- Public leaderboard filter changes can accidentally remove useful internal all-bucket query behavior if UI and repository contracts are conflated.
- Daily ranked remains high risk because it combines rating incentives with Daily claim uniqueness and answer secrecy.
- Vercel/auth work is deployment/account-management work and should not be mixed into ranked authority changes.

## Open Decisions

The implementation plan should decide:

- whether Stage 33.1 should attempt timed ranked implementation in Phase 33 or stop after audit/addendum readiness if risk remains high;
- exact UI placement for rank bands;
- whether timed buckets should be public leaderboard-visible in Phase 33 or private until enough data exists;
- whether the public leaderboard table should keep the `Bucket` column after player-facing filters are reduced to OG/GO only.

Recommended defaults:

- attempt timed ranked only if Stage 33.1 and Stage 33.2 find the migration/RLS path clean;
- show rank bands on public leaderboard rows and competitive multiplayer rating buckets;
- keep timed ranked buckets out of public leaderboards until timed ranked E2E and privacy probes pass;
- keep the `Bucket` column for now because it is harmless and explicit, but allow Stage 33.4 to remove it if the two-filter layout makes it redundant.

## Next Gated Action

If this specification is approved, create `planning/phase-33/IMPLEMENTATION-PLAN.md`. The implementation plan should lock exact stage gates, decide whether timed ranked implementation is attempted in Phase 33 or kept at readiness/addendum level, and provide the next gated prompt for Stage 33.0 baseline only.
