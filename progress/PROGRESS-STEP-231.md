# Progress Step 231: Phase 30 Stage 30.4 Public Leaderboard App Integration Foundations

**Status**: Completed - Awaiting User Review Before Stage 30.5
**Repository**: `brrrdle-dev`
**Branch**: `main`
**Started**: 2026-06-23T01:55:50Z
**Completed**: 2026-06-23T02:00:54Z

## Authorization

The user authorized Phase 30 Stage 30.4 only: public leaderboard domain and repository foundations using the already-applied and verified Stage 30.3 public leaderboard RPC.

Allowed work:

- read governance, Phase 30 planning/spec/addendum/implementation materials, current progress records, ranked docs, Supabase docs, and relevant leaderboard-adjacent source/tests;
- create this Stage 30.4 progress report and append the matching 12-column row to `progress/PROGRESS.csv`;
- add app-side public leaderboard domain/repository seams for `get_public_ranked_leaderboard`;
- add strict DTO parsing for the allow-listed Stage 30.3 RPC fields;
- add focused domain/repository tests;
- run focused leaderboard tests first, then the requested verification gate.

Not authorized:

- public leaderboard UI;
- Multiplayer Overview cleanup;
- source/runtime work outside Stage 30.4 leaderboard foundations;
- Supabase migration creation or execution;
- Vercel configuration;
- deployment;
- commits, pushes, PR creation, merges, releases, or branch deletion;
- Phase 31 work;
- Phase 32 ranked mode expansion;
- public/guest spectation;
- service workers or push infrastructure;
- Elo algorithm changes;
- gameplay-rule changes;
- new custom skills;
- force-push, secret printing, or original stable repository work.

## Repository State

- `pwd`: `/Users/noir/visual_studio/Codex_Projects/brrrdle-dev`
- Branch: `main`
- `HEAD`: `ec5d7824104d9d41e79b2b49e475c68006cf40da`
- `origin/main`: `ec5d7824104d9d41e79b2b49e475c68006cf40da`
- Remote: `origin` points to `ryanjosephkamp/brrrdle-dev`.
- Worktree: dirty from expected uncommitted Phase 30 planning/progress artifacts plus the applied Stage 30.3 migration artifact.
- Original stable repository: not used.

## Implementation Notes

Created:

- `src/leaderboards/publicRankedLeaderboard.ts`
- `src/leaderboards/publicRankedLeaderboard.test.ts`
- `src/leaderboards/index.ts`

Implemented the app-side domain/repository seam for `public.get_public_ranked_leaderboard`.

The Stage 30.4 seam:

- supports only public ranked Practice v1 buckets `multiplayer:og` and `multiplayer:go`;
- normalizes default all-bucket pagination to limit `50` and offset `0`;
- rejects unsupported public request buckets, including legacy storage buckets such as `async:og` / `async:go`;
- enforces Stage 30.3 row allow-lists with strict DTO parsing;
- rejects rows containing raw user ids, emails, private profile metadata, raw rating transaction ids, match ids, queue ids, settlement ids, answer/seed/session/token fields, and unknown fields;
- parses only public profile identity fields and trusted aggregate rating fields returned by the Stage 30.3 RPC;
- treats RPC errors, including signed-out/auth-gate failures, as an empty repository result;
- preserves private leaderboard-ready projections as private/internal and does not expose them as public UI/API data.

## Verification

Initial `npm run build` found a TypeScript narrowing issue in the new query normalizer:

```text
src/leaderboards/publicRankedLeaderboard.ts(238,7): error TS2322: Type '"multiplayer:og" | "multiplayer:go" | null | undefined' is not assignable to type '"multiplayer:og" | "multiplayer:go" | null'.
```

The narrowing issue was fixed within the Stage 30.4 implementation, then verification was rerun.

Passed:

- focused leaderboard tests: `npm run test -- src/leaderboards/publicRankedLeaderboard.test.ts` (1 file, 13 tests)
- `npm run lint`
- `npm run test` (99 files, 650 tests)
- `npm run build` with the existing Vite large-chunk advisory
- `npx tsc -p tsconfig.api.json --noEmit`
- `git diff --check`
- Python CSV shape check using `python3 -S`: 233 rows, 12 columns, last progress ID `231`
- `git status --short --branch`

## Blockers

No blockers.

## Boundary Confirmation

No public leaderboard UI, Multiplayer Overview cleanup, Supabase migration creation or execution, Vercel configuration, deployment, commits, pushes, PRs, merges, releases, branch deletion, Phase 31 work, Phase 32 ranked mode expansion, public/guest spectation, service workers, push infrastructure, Elo algorithm changes, gameplay-rule changes, new custom skills, force-push, secret printing, or original stable repository work was performed.
