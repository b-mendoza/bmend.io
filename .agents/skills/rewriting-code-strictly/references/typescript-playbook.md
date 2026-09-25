# TypeScript Strict Rewrite Playbook

> Read this file only when the target is TypeScript or JavaScript. Use it as a local rewrite guide: load external sources only when a concrete checker, validator, or syntax decision depends on them. Do not paraphrase external docs back into the report.

## Skill-Specific Defaults

- Preserve observable behavior and treat existing `tsconfig`, lint, and validator conventions as the authority.
- Replace broad `any` at untrusted boundaries with `unknown`, then narrow before use.
- Keep assertions local; replace them with narrowing, guards, or runtime schemas when feasible.
- Avoid deep generic machinery unless it removes real duplication or captures a stable public contract.

Anything not listed above defers to project evidence. When a concrete checker, validator, or syntax decision still needs current external docs, the strategist loads the Progressive Loading Map row for `./references/external-sources.md` (from the subagent: `../references/external-sources.md`) — do not chain-load it from this playbook.

## When To Fetch External Sources

Ask the strategist to load `external-sources.md` only for current annotation syntax, narrowing behavior, strict `tsconfig` flags, `typescript-eslint` diagnostics, Zod API choices, or unsoundness rationale that affects the rewrite and is covered by `REFERENCE_NEED`, `EXTERNAL_FETCH_APPROVAL`, or a required project-local source.

## Boundary Validation

For untrusted JSON, API responses, webhooks, form payloads, config, and tool or LLM outputs: parse once at the boundary with the project's validator, then pass validated values internally. Add Zod only when the project already uses it or the user explicitly permits the dependency.

## Validation Commands

Prefer the user's `VALIDATION_COMMAND`. Otherwise use the smallest relevant existing project check only when project scripts, CI config, test config, or nearby documentation identifies it as safe for the target: project tests, `tsc --noEmit`, ESLint, or the configured formatter.
