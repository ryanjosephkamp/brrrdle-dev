# Deeper Functional-Shell Optimization Audit

**Status:** Planning audit complete; implementation remains separately gated.
**Baseline:** `phase-57-golden-2026-07-11`.
**Preservation contract:** `planning/handoffs/PRE-PHASE-55-FUNCTIONALITY-PRESERVATION-INVENTORY-2026-07-09.md`, refreshed 2026-07-11.

## Executive Finding

The accepted shell is already close to the responsible visual minimum. Further removal of styling, content, controls, or product surfaces is not recommended. A bounded technical optimization pass is worthwhile because initial loading still eagerly transfers every word bank and every route implementation.

Keep React 19, Vite 8, TypeScript, the existing Supabase contracts, and the current low-ornament shell. Optimize loading and active work in place.

## Current Architecture

### Strengths

- Framework-independent OG/GO, scoring, rating, economy, request-selection, and persistence rules have strong fast-test coverage.
- Supabase authority is isolated behind repositories and 38 source-controlled migrations with exact accepted remote history.
- Runtime dependencies are already sparse; dependency removal is not the main opportunity.
- The shell has no resting animation, blur, shadow, or sticky-layer burden and remains overflow-free at 390px.
- Route rendering is conditional, so only the active route owns DOM weight even though all route code is downloaded.
- Existing guest, disposable-account, two-client, three-client, privacy, cleanup, and authority fixtures provide a strong preservation harness.

### Concentration And Risk

- `App.tsx` owns route composition, auth, progress, economy, navigation, notifications, clocks, Live data, repositories, and sync. Its size is a change-risk signal, but not by itself a runtime defect.
- `MultiplayerPanel.tsx` combines queue, request, rematch, game, clock, and subflow state. Extract only boundaries that remove duplicate active work or enable code splitting.
- `multiplayerRepository.ts` is large because it implements a broad trusted adapter contract. Splitting it cosmetically would not reduce the client bundle unless import boundaries also become lazy.
- The synchronous word-list API makes every dictionary part of the initial static module graph.
- `RoutePanel` uses conditional rendering but statically imports all routes, games, account panels, multiplayer, Stats, Leaderboard, Admin, and support surfaces.
- App-level notification and Live freshness requirements create global polling/subscription ownership that must not be removed casually.

## Candidate Assessment

| Candidate | Evidence | Expected benefit | Risk | Recommendation |
| --- | --- | --- | --- | --- |
| On-demand per-length word banks | All 34 chunks are module-preloaded; approximately 1.68 MB of cold JS transfer is dictionary data not needed on Home | Very high initial transfer and parse reduction; avoids loading unused lengths | Medium-high: current loader is synchronous; Daily determinism, Practice seeds, refresh cache, failure states, answer secrecy, and PWA behavior must stay correct | **Implement first with characterization and an async preparation/cache boundary** |
| Route-level lazy loading | No `React.lazy`; one 1,008.86 kB main chunk contains every product route | Medium-high initial parse/compile reduction; clearer ownership | Medium: suspense/failure states, route navigation, auth modals, game resume, and tests must remain stable | **Implement after word-bank boundary** |
| Separate metadata from dictionary payloads | App needs supported-length metadata for Home but imports the data barrel that reaches all dictionaries | Enables shell/Home to render without game data and simplifies lazy loading | Low-medium | **Implement as part of word-bank stage** |
| Consolidate duplicate private-request polling | App polls signed-in requests every five seconds for notifications; Practice panel can poll the same participant list every five seconds | Lower signed-in RPC traffic and fewer duplicated state updates | Medium: notification freshness, request center, focus/refocus, and lifecycle sounds must remain exact | **Measure with disposable accounts, then consolidate into one participant-owned source if duplication is proven** |
| Narrow Live polling ownership | 30-second idle polling runs globally because Home/nav attention uses Live rows | Lower background network activity on unrelated routes | Medium-high: Home, attention badges, spectator routing, and freshness depend on it | **Investigate only; preserve current behavior unless a source can serve all consumers** |
| Isolate one-second countdown rendering | Two `useDailyCycle` hooks update root App state; 10-second sample produced 10 layouts and 17.7 ms script time | Small reduction in root reconciliation on low-end devices | Low-medium: reset alerts, date keys, Dashboard copy, and Daily expiry depend on clocks | **Optional after higher-value work; require profiler proof** |
| Extract large files solely to reduce line count | Three files exceed 2,300 lines | Better maintainability and lower merge conflict risk | Medium regression risk; no automatic runtime benefit | **Extract only where required by lazy boundaries or shared polling ownership** |
| Further CSS/visual stripping | CSS is 14.02 kB gzip; mobile has zero blur/shadow/sticky/animation and no overflow | Negligible measured runtime benefit | High product/readability risk relative to benefit | **Reject** |
| Replace Tailwind or shared primitives | CSS size is not the bottleneck | Little immediate benefit | High churn and test/design coupling | **Reject for optimization; Phase 58 may reconsider from design evidence** |
| Static HTML rewrite | Auth, cloud sync, realtime multiplayer, routing, games, and notifications require client state | None without rebuilding proven systems | Extreme | **Reject** |
| Next.js/framework migration | No SSR/SEO or server-component requirement was established | Unproven | Extreme migration/deployment/test churn | **Reject unless a future product requirement supplies evidence** |
| New component library | The accepted shell already has usable primitives | No performance case | Bundle/design/migration cost | **Defer to Phase 58 stack decision** |
| Supabase schema/RPC changes | No backend bottleneck was established | None for current goals | Protected contract risk | **Reject** |

## Word-Bank Design Constraints

The highest-value candidate is also the most contract-sensitive.

The implementation should introduce an asynchronous preparation layer keyed by length, deduplicate concurrent loads, validate through the existing schema, cache the normalized result, and leave answer selection synchronous only after preparation. The supported-length manifest must remain a small eager metadata source.

Characterize before choosing the exact code shape:

- Daily OG/GO and Daily Multiplayer deterministic answer/sequence selection.
- Practice seed determinism for guest and signed-in players.
- all lengths 2-35, invalid length, malformed payload, load failure, retry, concurrent request, and cache behavior;
- refreshed remote word-list override and fallback precedence;
- resumed games whose selected length is not loaded yet;
- PWA behavior for a length that was and was not loaded before going offline;
- no answer or private seed leakage in URLs, logs, errors, preload metadata, or public payloads.

Do not duplicate the authoritative dictionaries into a second tracked source merely to make Vite emit assets. Prefer one import registry and one canonical validation/cache boundary.

## Route-Boundary Design Constraints

After the data graph is lazy, extract route presentation from `App.tsx` without moving canonical state ownership prematurely.

Candidate groups:

- shell/Home and global account/notification controls: eager;
- Solo/Daily/Calendar game surfaces: lazy group;
- Multiplayer/Live/Lobby/spectator surfaces: lazy group;
- Stats/Leaderboard/History/Word Explorer: independent lazy groups where build evidence supports it;
- Profile/Settings/Public Profile/Auth support: account group;
- Admin: lazy and authorization-preserving;
- Help/About/Feedback/Marketplace: small groups or eager only if measurement shows splitting overhead exceeds benefit.

Every lazy surface needs accessible loading and failure states, stable navigation history, preserved Home-on-refresh, no loss of typed drafts or active game state, and deterministic preloading on pointer/focus only when it improves perceived latency without restoring eager global loading.

## Polling And Subscription Boundaries

Do not optimize by removing freshness.

First record named RPC counts for a signed-in account on Home, Practice request center, Live, and an active ranked queue. Only then:

- make one source own participant private-request refresh and feed both notifications and the request center;
- retain visibility/focus recovery and request lifecycle sound deduplication;
- keep realtime multiplayer state canonical;
- preserve active/idle Live freshness or document a user-approved change;
- ensure timers and subscriptions clean up on route, auth, and browser-context changes.

## Test Architecture

Retain all 998 fast tests and all 74 authority-enabled browser scenarios for final hardening. Add focused optimization contracts rather than embedding timing assertions in broad gameplay tests:

- build-manifest assertion that Home no longer preloads all word-bank chunks;
- cold-load request/transfer budget check with documented variance;
- per-length lazy loader, concurrency, cache, failure, retry, determinism, and secrecy tests;
- route lazy-loading, accessible fallback, navigation, refresh, and error-recovery tests;
- signed-in RPC count/deduplication characterization;
- mobile scroll/overflow and essential gameplay feedback preservation;
- clean-context console/network guard.

Do not make exact millisecond timings a pass/fail gate in CI. Use stable structural budgets and report controlled before/after timings separately.

## Security And Privacy Boundary

Optimization cannot change migration history, grants, RLS, security-definer functions, answer catalogs, authority ledgers, public profile allowlists, spectator projections, private request visibility, economy commands, or authenticated cleanup. New loading errors and module names must not contain answers or account identifiers.

## Conclusion

Proceed with a bounded deeper-shell optimization implementation. The responsible target is a selectively loaded React/Vite application, not a smaller product and not a new framework.
