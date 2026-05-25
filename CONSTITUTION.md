# brrrdle Constitution (Base v1.0)

**Version**: 1.0  
**Date**: 2026-05-25  
**Status**: Base version — The GPT-5.5 Copilot agent is instructed to read this file + `BRRRDLE-SPEC.md` + the approved plan, then upgrade this constitution (overwrite the file) to make it optimal for the task. It will perform a second upgrade after creating its own implementation plan.

---

## Purpose

This is the **starting constitution**. It defines the non-negotiable principles, rules, and quality standards for the development of `brrrdle`. The agent must follow these rules at all times and may only deviate when explicitly approved by the user.

---

## Non-Negotiable Rules

1. **Fidelity to Spec and Plan**  
   Implement *only* what is described in `BRRRDLE-SPEC.md` and the approved project plan (v2.6). No new features, no “nice-to-haves,” and no scope creep. When in doubt, quote the spec or plan and ask the user for clarification.

2. **Verification First**  
   After every significant code change or logical step, run the verification commands specified in the plan or by the user (hard refresh, clear Vite cache, test edge lengths, check console, etc.). Never assume something works.

3. **Exact Coloring Logic**  
   The core coloring function (`getTileStates`) must be a single source of truth and must match original Wordle behavior exactly, including all duplicate-letter handling. Test against known vectors before considering the logic complete.

4. **Pre-processed Data Priority**  
   Definitions and word lists must prefer the pre-processed JSON files from English OpenList before falling back to external APIs. The hybrid data consumption strategy (bundled at build time + update checking) must be respected.

5. **Supabase from Day One + Admin Role**  
   Account and guest systems must be built against Supabase. The protected admin route for manual word list refresh override must use a Supabase user with an `admin` role. Manual role assignment via the Supabase dashboard is acceptable for v1.

6. **Review Gates**  
   After scaffolding and after every major phase/step defined in `AGENT-IMPLEMENTATION-PLAN.md`, the agent **must halt** and wait for explicit user approval (“Start next step”, “REVISE”, or “APPROVE”) before continuing. The agent must also halt immediately on any critical error or decision that requires human judgment.

7. **Naming**  
   The game is spelled `brrrdle` (no space). All files, folders, variables, documentation, and comments must use this spelling.

8. **Daily Mode Scope (Initial Launch)**  
   Daily `og` and `go` modes are fixed at 5 letters for the initial launch. Only practice mode supports variable lengths (2–35). This scope decision must be respected.

---

## Style & Quality Standards

- **Tech Stack**: React 19 + TypeScript (strict mode) + Vite + Tailwind CSS + Zustand.
- **Code Quality**: Clean, readable, and well-commented. Every non-obvious piece of logic must reference the relevant section of `BRRRDLE-SPEC.md` or the plan.
- **User Experience**: Mobile-first, smooth 60 fps animations, WCAG AA accessibility minimum, clear loading/error/empty states.
- **Performance**: Fast initial load and interactions. Word list JSONs are bundled at build time with update checking.
- **Error Handling**: User-friendly messages. Definition fallback must follow the exact behavior described in the spec (clear message + dynamic Google search button).

---

## Anti-Patterns (Strictly Forbidden)

- Adding features or behaviors not present in `BRRRDLE-SPEC.md` or the approved plan.
- Skipping verification steps or review gates.
- Making manual edits to source files while the Copilot agent is actively working on the repository (this has caused conflicts in the past).
- Storing secrets, API keys, or sensitive configuration in client-side code.
- Assuming something works without running the required verification commands.
- Ignoring the daily mode scope decision (daily = 5 letters at launch).

---

## Review Gate Protocol

After completing each major logical section or phase (as defined in `AGENT-IMPLEMENTATION-PLAN.md`):

1. Commit the changes.
2. Update the changelog.
3. Pause and explicitly ask the user for approval before continuing.

The agent must also pause immediately if it encounters uncertainty, ambiguity, or any situation that requires human decision-making.

---

## Versioning & Evolution

This base constitution will be upgraded by the agent during the first phase of work. A second upgrade will occur after the agent creates its own implementation plan. All upgrades must preserve the core principles above while adding project-specific guidance that improves execution quality.

---

**This constitution is binding for all work on the `brrrdle` project until revised with explicit user approval.**