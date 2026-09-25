# Go Strict Rewrite Playbook

> Read this file only when the target is Go. Use it as a local rewrite guide: load external sources only when a concrete checker, standard-library, or idiom decision depends on them. Do not paraphrase external docs back into the report.

## Skill-Specific Defaults

- Preserve observable behavior and treat existing module, lint, and formatting conventions as the authority.
- Prefer concrete structs for stable shapes; use `map[string]T` only for genuinely dynamic key spaces.
- Keep `any` or `interface{}` at unavoidable generic, decoding, or adapter boundaries; convert to concrete values promptly.
- Return errors explicitly and handle them near where they occur. Pass `context.Context` when the surrounding code already follows that convention.

Anything not listed above defers to project evidence. When a concrete checker, stdlib, or idiom decision still needs current external docs, the strategist loads the Progressive Loading Map row for `./references/external-sources.md` (from the subagent: `../references/external-sources.md`) — do not chain-load it from this playbook.

## When To Fetch External Sources

Ask the strategist to load `external-sources.md` only for disputed idiom, public API comments, package naming, error flow, context usage, JSON decoding behavior, `go vet`, or Staticcheck diagnostics that affect the rewrite when the decision is covered by `REFERENCE_NEED`, `EXTERNAL_FETCH_APPROVAL`, or a required project-local source.

## Boundary Validation

For untrusted JSON and external records: prefer the standard library plus explicit validation unless the project already uses a validation package. Decode known shapes into structs, validate required semantic constraints after decoding, and convert to concrete structs or domain values near the boundary instead of passing `map[string]any` deeper.

## Validation Commands

Prefer the user's `VALIDATION_COMMAND`. Otherwise use the smallest relevant existing project check only when project scripts, CI config, test config, or nearby documentation identifies it as safe for the target: `go test ./...`, `go vet ./...`, `staticcheck ./...`, `gofmt`, or `goimports`.
