# Progress Step 541 - Ranked Multiplayer Hard-Refresh Discovery Deferral

**Status:** Completed - accepted baseline preserved; narrow repair deferred.
**Date:** 2026-07-11.

## Summary

Completed the final bounded three-cycle investigation of delayed ranked Practice/Daily discovery after cold authenticated bootstrap. The durable game was present in participant-scoped server responses while the UI could retain stale progress-owned Multiplayer state until focus-triggered hydration. The narrow reconciliation candidate was not reliable across the required five-second standard-runner gate, so all speculative source/test changes and temporary diagnostics were removed.

## Evidence

- Service-worker interference was ruled out.
- Participant auth subjects were correct and participant-scoped responses included the expected durable game.
- Focus restored the missing game immediately in two of three hosted Firefox reproductions.
- Production Firefox and Chromium passed the narrow candidate for ranked Practice GO and ranked Daily OG.
- The standard Chromium runner passed ranked Daily but missed ranked Practice GO's unchanged five-second assertion twice.
- Runtime source and committed test surfaces were restored exactly to the accepted `ad8f65aebf12b56bda372777b015dbe8d773a4b5` baseline.

## Decision

The 15-30 second post-hard-refresh ranked rediscovery delay remains a known minor limitation. A future fix requires a separately governed authenticated progress-hydration and Multiplayer repository-readiness design. Do not add polling, extend the assertion, weaken console or visibility checks, or change Supabase contracts to conceal the delay.

## Boundaries

No runtime source, committed test, migration, Supabase, dependency, deployment, Git/GitHub, Phase 58, or stable-repository change remains from this attempt. Planning, checklist, changelog, and progress documentation record the evidence and deferral only.
