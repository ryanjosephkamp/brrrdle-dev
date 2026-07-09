# Pre-Phase-55 Functional Shell Decision Log - 2026-07-09

**Status:** Planning decisions and explicit future gates. No implementation authorization.

## Decisions Recommended Now

| Decision | Recommendation | Evidence/rationale | Revisit trigger |
| --- | --- | --- | --- |
| Shell architecture | Keep React/Vite/TypeScript; use semantic HTML through React | Existing behavior and tests are deeply integrated; runtime dependencies are already lean | A measured limitation that cannot be solved incrementally |
| Static HTML rewrite | Do not pursue | Auth, realtime, persistence, routing, and state would need to be rebuilt in JavaScript | None expected for this web game |
| Next.js migration | Defer | No demonstrated SSR/SEO/server-component need; migration adds risk before redesign | Concrete routing, SSR, deployment, or performance requirement |
| shadcn adoption | Defer until design direction | Shell needs neutral reduction, not a new visual system | `design.md` selects a compatible component strategy |
| Impeccable | Use later for design critique/polish | Valuable after a direction exists; premature for neutral shell | Design-inspiration or rebuild stage begins |
| Governance changes | Keep constitution model-agnostic; use scoped planning contracts | Model-specific governance will age quickly; current gates already support autonomy | A specific recurring governance failure with evidence |
| New custom skill | Defer until workflow repeats | Existing brrrdle skills cover prompt, review, visual, backup; avoid speculative maintenance | Preservation gate is reused for shell and rebuild |
| Shell scope | Presentation simplification, not product reduction | User requires full functionality and reversible evolution | Explicit user product-scope change |
| Essential animation | Retain perceivable feedback; simplify exact motion | Tile/result/status transitions communicate state; ambient motion does not | Accessibility or performance evidence supports a replacement cue |
| Test strategy | Characterize first; retain behavior; loosen only cosmetic assertions | Prevents tests from being rewritten to bless regressions | Explicit test classification review |
| Checkpoint timing | After automated and hosted manual shell acceptance | A checkpoint should represent a trusted fallback | Separate explicit Git/GitHub authorization |
| Design work timing | After shell checkpoint | Keeps neutral simplification separate from visual direction | Shell accepted and checkpointed |

## Assumptions

- Phase 54 Golden Checkpoint remains the accepted pre-shell fallback.
- Current Supabase contracts, gameplay rules, economy, scoring, rating, persistence, and privacy boundaries are correct and protected.
- The user prioritizes restoring a working product baseline over preserving future live user data.
- The final product remains a web application; native applications are deferred.
- GPT-5.6 SOL should receive broad frontend autonomy within explicit functional and verification contracts.

## Open Decisions With Later Gates

1. **Visual direction:** terminal utility, editorial game, arcade, restrained product UI, or another concept. Decide during design inspiration, not shell implementation.
2. **Component strategy:** continue bespoke primitives, selectively adopt shadcn, or choose another system. Decide after `design.md` and a small proof, not by default.
3. **Information architecture changes:** the shell preserves routes and content. The rebuild may reorganize them only with a mapped migration and manual review.
4. **Content reduction:** current explanatory text remains unless a later content audit classifies it as redundant.
5. **Code splitting targets:** collect baseline evidence first; add lazy boundaries where they measurably help and do not destabilize state.
6. **Performance budgets:** Stage 0 should record reproducible measurements, then set exact non-regression and improvement thresholds.
7. **Generated concepts:** number, style families, and source inspirations require a separate user-approved design brief.
8. **Frontend migration:** GPT-5.6 SOL may propose one, but implementation requires cost, incremental path, test mapping, and rollback plan.

## Explicitly Rejected Shortcuts

- Removing routes or features to make the shell easier.
- Replacing real multiplayer E2E with mocked-only tests.
- Bulk rewriting selectors or snapshots without classifying what they protect.
- Installing a component system before design direction exists.
- Combining shell reduction, shell checkpoint, concept generation, and final redesign in one irreversible action.
- Treating screenshots as a substitute for hosted interactive review.
- Modifying the stable `brrrdle` repository.

## Decision Gate Sequence

1. Approve functional-shell implementation through Review Candidate only.
2. Review the hosted shell and resolve same-phase findings.
3. Separately approve shell final acceptance and backup.
4. Separately approve the shell Golden Checkpoint.
5. Supply inspiration inputs and approve design/concept work.
6. Approve `design.md` and frontend/component strategy.
7. Activate the GPT-5.6 SOL rebuild handoff.
