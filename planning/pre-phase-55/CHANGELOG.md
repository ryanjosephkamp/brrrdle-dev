# Pre-Phase-55 Functional Shell Changelog

**Status:** Accepted and closed through the governed Final Acceptance Backup represented by this record. The separate Golden Checkpoint remains pending.

## Summary

The accepted Phase 54 application has been reduced in place to a low-ornament React/Vite functional shell. Product routes, content, account controls, gameplay, persistence, progression, multiplayer, privacy, and Supabase contracts are preserved. No dependency, framework, backend, gameplay, or deployment contract changed.

## Presentation Simplified

- Replaced the decorative command-center stage with static semantic application chrome.
- Removed the canvas renderer, pointer tracking, custom cursor, ambient noise/grid layers, dormant route selector, route color gradients, and ornamental signal effects.
- Reduced shared elevation, backdrop blur, oversized rounding, hover translation, sticky mobile keyboard behavior, and nonessential decorative motion.
- Kept a neutral near-black palette, flat borders, visible focus, responsive route navigation, semantic status colors, and essential tile feedback.
- Simplified shared buttons, panels, navigation, tabs, dialogs, tooltips, keyboard, Solo tiles, and multiplayer tiles.

## Tests Added Or Adapted

- Added dedicated Practice Solo OG and Daily Solo OG solve/refresh/re-entry browser coverage.
- Added shell route accessibility, Focus recovery, authenticated mobile account-menu, and overflow coverage.
- Added semantic `data-state` contracts for keyboard and tile states.
- Adapted keyboard E2E assertions from replaceable Tailwind classes to semantic state attributes.
- Hardened the scroll-to-end helper against one-frame dynamic document-height settling without weakening its bottom/top assertions.

## Performance Result

- Custom CSS source: 1,639 lines to 404 lines.
- Shell component: 502 lines to 157 lines.
- Production CSS: 110.46 kB / 17.79 kB gzip to 83.75 kB / 14.02 kB gzip.
- Main JavaScript: 974.92 kB / 265.13 kB gzip to 967.78 kB / 262.53 kB gzip.
- 390px shell diagnostics: zero backdrop-filter layers, zero shadows, zero sticky elements, and no horizontal overflow on the required route matrix.

## Verification

- `npm run lint`: passed.
- `npm run test`: 132 files, 920 tests passed.
- Focused Solo/shell/mobile browser matrix: 21 tests passed after hardening the layout-settling assertion.
- Full `npm run test:e2e`: one transient spectator identity-summary RPC 403 on the first run; the exact focused scenario passed immediately, then the full suite passed 63/63 in 9.4 minutes.
- `npm run build`: passed with the existing large main-chunk advisory.
- API typecheck, final hygiene, artifact scans, and process cleanup are recorded in Progress Step 518.

## Hosted Manual Acceptance

- The user completed the hosted functional-shell review on 2026-07-09 and reported that every item in `REVIEW-CHECKLIST.md` passes.
- No direct shell bug, functional regression, mobile-fit problem, accessibility blocker, persistence failure, or multiplayer failure was reported.
- The separately authorized Final Acceptance Backup records the accepted shell as closed and backed up; the Golden Checkpoint remains the next protected action.
- Phase 55 design/handoff work must not begin until that checkpoint records the exact accepted shell commit.

## Boundaries

No Git/GitHub action, deployment, public tunnel, remote Supabase action, schema/RPC/RLS change, dependency installation, framework migration, gameplay change, Final Acceptance Backup, shell checkpoint, design inspiration work, image generation, `design.md`, GPT-5.6 SOL redesign, Phase 55 implementation, or stable `brrrdle` work was performed by this acceptance-record/planning pass.
