# Progress Step 241: Phase 31 Stage 31.3 Rematch Migration/RLS Execution

**Status**: Completed - Awaiting User Review Before Stage 31.4 App Implementation
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-23T23:50:53Z
**Completed**: 2026-06-24T00:00:10Z

## Authorization

The user authorized Phase 31 Stage 31.3 only: rematch migration/RLS execution following the approved Stage 31.2 addendum.

Allowed work:

- read required governance, Phase 31 planning/spec/addendum/implementation materials, current progress records, docs, Supabase context, and package metadata;
- confirm repository state, branch, remotes, `HEAD`, and `origin/main`;
- confirm the original stable `brrrdle` repository is not being used;
- confirm the Supabase target is the intended `brrrdle-dev` project without printing secrets;
- create this Stage 31.3 progress report and matching 12-column CSV row;
- create exactly one additive Supabase migration under `supabase/migrations/`;
- implement the approved Stage 31.2 contract for `public.multiplayer_practice_rematch_requests` and authenticated-only participant-scoped rematch RPCs;
- apply the migration only to the confirmed `brrrdle-dev` Supabase project if target and credentials are unambiguous;
- run the non-printing privacy/abuse probes from the addendum;
- run `git diff --check`, Python CSV shape check using `python3 -S`, and `git status --short --branch`.

Not authorized:

- app source/runtime implementation;
- tests beyond migration/probe support;
- postgame UI implementation;
- current-surface cleanup implementation;
- Phase 32 ranked mode expansion;
- public/guest spectation;
- service workers or push infrastructure;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Elo algorithm or gameplay-rule changes;
- new custom skills;
- force-push, secret printing, private data exposure, local session artifact exposure, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- `origin/main`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- Remote: `origin` points to `ryanjosephkamp/brrrdle-dev`.
- Original stable repository: not used.

## Supabase Target

- Local Supabase link confirmed project ref `fdwmvgervclziuoxbmeg`.
- Local linked project name confirmed `brrrdle-dev`.
- No Supabase secrets were printed.

## Migration

Created exactly one additive migration:

- `supabase/migrations/20260623235121_phase31_practice_rematch_requests.sql`

The migration adds:

- `public.multiplayer_practice_rematch_requests`;
- participant UUID storage for enforcement only;
- no direct authenticated table grants;
- RLS policy for participant-readable rows if table access is later granted;
- internal helper functions with no public/authenticated execute grants;
- authenticated-only RPCs:
  - `request_practice_multiplayer_rematch`;
  - `get_practice_multiplayer_rematch_requests`;
  - `cancel_practice_multiplayer_rematch`;
  - `decline_practice_multiplayer_rematch`;
  - `accept_practice_multiplayer_rematch`.

The RPC contract is limited to completed, unranked, non-custom Practice Multiplayer source games. Daily, ranked, custom/private-code, nonterminal, wrong-account, stale, and duplicate-creation paths are rejected or idempotently handled.

## Migration Execution

Applied the migration to the confirmed linked `brrrdle-dev` Supabase project:

- project ref: `fdwmvgervclziuoxbmeg`;
- project name: `brrrdle-dev`;
- migration: `20260623235121_phase31_practice_rematch_requests.sql`;
- confirmation: `supabase migration list --linked` showed local and remote both at `20260623235121`.

No Supabase secrets were printed.

## Privacy And Abuse Probes

Remote non-printing transaction-scoped probes passed. Probe-created users, games, and requests were rolled back.

Passed probe checks:

- RLS enabled on `public.multiplayer_practice_rematch_requests`;
- authenticated direct table select not granted;
- authenticated direct table insert not granted;
- authenticated request RPC execute granted;
- anon request RPC execute not granted;
- authenticated accept RPC execute granted;
- anon accept RPC execute not granted;
- requester can create an eligible request;
- Daily source games are rejected;
- ranked source games are rejected;
- custom/private-code source games are rejected;
- nonterminal source games are rejected;
- nonparticipants cannot read request rows through the RPC;
- nonparticipants cannot accept;
- requesters cannot accept their own requests;
- opponent accept creates one fresh unranked Practice game;
- duplicate accept with the same idempotency key returns the same created game;
- created game is unranked Practice with no Daily key, custom code, or rating bucket;
- request RPC return shape contains no forbidden raw auth/user/session/projection/rating/queue/token columns.

## Verification

- Migration applied remotely with `npx --yes supabase@latest db push --linked --include-all`.
- Remote migration parity confirmed with `npx --yes supabase@latest migration list --linked`.
- `git diff --check` passed.
- Python CSV shape check using `python3 -S` passed after progress update.
- `git status --short --branch` showed expected uncommitted Phase 31 planning/spec/progress artifacts plus the new Stage 31.3 migration/progress changes.

## Blockers

No blockers.

## Boundary Confirmation

No app source/runtime implementation, test implementation beyond migration/probe support, postgame UI implementation, current-surface cleanup implementation, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Elo/gameplay changes, new custom skills, force-push, secret printing, private data exposure, local session artifact exposure, or original stable `brrrdle` repository work was performed.
