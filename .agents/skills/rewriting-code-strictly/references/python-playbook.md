# Python Strict Rewrite Playbook

> Read this file only when the target is Python. Use it as a local rewrite guide: load external sources only when a concrete checker, validator, or syntax decision depends on them. Do not paraphrase external docs back into the report.

## Skill-Specific Defaults

- Preserve observable behavior and treat existing project checker, linter, formatter, and validation settings as the authority.
- Add or tighten annotations on the rewritten path only when they clarify a caller contract or change a checker diagnostic.
- Treat untrusted external data as `object` or a validated model before internal use; do not pass raw boundary dictionaries deeper.
- Keep `Any`, `cast`, `# type: ignore`, and checker-specific ignores local and justified when an external API or language limit forces them.

Anything not listed above defers to project evidence. When a concrete checker, validator, or syntax decision still needs current external docs, the strategist loads the Progressive Loading Map row for `./references/external-sources.md` (from the subagent: `../references/external-sources.md`) — do not chain-load it from this playbook.

## When To Fetch External Sources

Ask the strategist to load `external-sources.md` only for current annotation syntax, checker flags, Pyright or mypy configuration, Pydantic behavior, legacy implicit optional cleanup, or type-system tradeoffs that are not clear from the project and are covered by `REFERENCE_NEED`, `EXTERNAL_FETCH_APPROVAL`, or a required project-local source.

## Boundary Validation

For JSON payloads, API responses, webhooks, LLM/tool outputs, config, environment variables, database rows, and other untrusted records: validate near the boundary, convert to a typed internal value, and use the project's existing validator. Add Pydantic only when the project already uses it or the user explicitly permits the dependency.

## Validation Commands

Prefer the user's `VALIDATION_COMMAND`. Otherwise use the smallest relevant existing project check only when project scripts, CI config, test config, or nearby documentation identifies it as safe for the target: `mypy`, `pyright`, targeted tests, or the configured formatter or linter.
