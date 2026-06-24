# Progress Step 240: Phase 31 Stage 31.2 Rematch Migration/RLS Addendum Planning

**Status**: Completed - Awaiting User Review Before Stage 31.3 Migration/RLS Execution
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-23T23:41:55Z
**Completed**: 2026-06-23T23:41:55Z

## Authorization

The user authorized Phase 31 Stage 31.2 only: migration/RLS addendum planning for Practice-only rematch mutual intent.

Allowed work:

- read required governance, Phase 31 planning/spec/implementation materials, Stage 31.1 audit findings, current progress records, relevant multiplayer/ranked/custom/Daily/Supabase source context, docs, and tests read-only;
- confirm repository state, branch, remotes, `HEAD`, and `origin/main`;
- confirm the original stable `brrrdle` repository is not being used;
- create this Stage 31.2 progress report and matching 12-column CSV row;
- create a precise migration/RLS addendum under `planning/specs/phase-31/`.

Not authorized:

- source/runtime implementation;
- test implementation;
- Supabase migration creation or execution;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 32 ranked mode expansion;
- public/guest spectation;
- service workers or push infrastructure;
- Elo algorithm changes;
- gameplay-rule changes;
- new custom skills;
- force-push, secret printing, private data exposure, local session artifact exposure, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- `origin/main`: `5efafcb22863d36266ec7c81aa2f23f6b7e217b5`
- Remote: `origin` points to `ryanjosephkamp/brrrdle-dev`.
- Original stable repository: not used.

## Addendum Created

Created:

- `planning/specs/phase-31/PHASE-31-REMATCH-MIGRATION-RLS-ADDENDUM-2026-06-23.md`

The addendum defines a narrow future Stage 31.3 additive migration contract for durable Practice-only rematch mutual intent.

## Key Decisions

- Stage 31.3 should create one additive rematch persistence migration only after explicit authorization.
- The proposed table is `public.multiplayer_practice_rematch_requests`.
- The proposed RPC family is:
  - `request_practice_multiplayer_rematch`;
  - `get_practice_multiplayer_rematch_requests`;
  - `cancel_practice_multiplayer_rematch`;
  - `decline_practice_multiplayer_rematch`;
  - `accept_practice_multiplayer_rematch`.
- Direct same-opponent rematch v1 should be limited to completed, unranked, non-custom Practice Multiplayer games with two authenticated participants.
- Ranked Practice should not get direct same-opponent rematch in this migration. Ranked same-settings continuation should use the existing Phase 27 trusted queue path.
- Custom/private-code Practice should use app-level same-settings lobby/setup-prefill behavior rather than this direct rematch RPC.
- Daily Multiplayer remains fully excluded from rematch, replay, and search-again shortcuts.
- Rematch request rows may store participant UUIDs for participant-only RLS, but rematch RPC payloads should not return raw auth ids.
- Rematch request rows must not store answers, seeds, serialized sessions, player sessions, move histories, raw projections, rating transactions, queue ids, private profile metadata, tokens, emails, or local artifacts.
- The accept RPC may receive a fresh validated game projection only to insert a new `async_multiplayer_games` row, mirroring existing multiplayer persistence patterns, but it must not copy source-game projections or return projections in rematch RPC payloads.

## Verification

- `git diff --check` passed.
- Python CSV shape check using `python3 -S` passed: `progress/PROGRESS.csv` has 242 rows, 12 columns, and `last_id=240`.
- `git status --short --branch` passed and showed `main` with expected Phase 31 planning/spec/progress artifacts plus this Stage 31.2 addendum/progress work.

## Blockers

No blockers.

## Boundary Confirmation

No source/runtime implementation, test implementation, Supabase migration creation/execution, deployment, commits, pushes, PR creation, merges, releases, branch deletion, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, private data exposure, local session artifact exposure, or original stable `brrrdle` repository work was performed.
