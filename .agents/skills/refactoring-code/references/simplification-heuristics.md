# Simplification Heuristics

Load this file when dispatching `chunk-analyst`, when synthesizing the plan card, or when reviewing the simplification verdict. These heuristics rank candidate transformations; they never override the protected boundary in [`protected-surfaces.md`](./protected-surfaces.md) or the validation rules in [`validation-safety.md`](./validation-safety.md).

## Reuse Ladder

Before proposing any new code, walk this ladder top to bottom and stop at the first rung that works. A proposal must name the rung it landed on.

1. **Avoid** — the change is not needed at all; the target already does this, or the complexity serves no current requirement. Prefer deletion.
2. **Reuse repository code** — an existing function, helper, type, or pattern in this codebase already does the job. Search for it before writing; cite the path when found.
3. **Standard library** — the language's standard library covers it.
4. **Platform capability** — the runtime or framework already provides it.
5. **Installed dependency** — a dependency already in the manifest covers it. Never add a new dependency to satisfy this rung.
6. **Smallest new code** — only when rungs 1–5 fail, write the minimum implementation, with no speculative parameters or abstractions.

New code that duplicates something rungs 2–5 would have found is a finding, not a style preference: report it with the existing equivalent's path.

## Deletion Test

Before extracting or keeping a module, helper, or layer, ask: _would deleting it concentrate complexity in one honest place, or does it merely relocate complexity while adding indirection?_ Keep only structure that concentrates. A wrapper that forwards to one callee, a layer with one caller and no decision logic, or an abstraction with a single implementation are deletion candidates.

## Clarity Rules

- Choose clarity over brevity. A longer explicit form beats a dense clever one.
- Flatten nesting: prefer early returns and guard clauses to pyramid conditionals. Never use nested ternaries.
- Name things after the domain, not the mechanism.
- Consolidate genuinely related logic, but do not force deduplication when the copies serve different concepts and merging them would couple unrelated code — incidental duplication is cheaper than the wrong abstraction.
- Remove comments that restate the code; keep comments that state constraints the code cannot show.
- Fix root causes, not symptoms: when a smell appears at several call sites, the finding targets the shared source, not one occurrence.

## What Simplification Never Removes

Efficiency and reduction never override:

- validation at trust boundaries;
- error handling and data-loss protection;
- security and access-control checks;
- accessibility behavior;
- anything in the protected-surfaces boundary;
- explicit user requirements.

A proposal that deletes any of these is a scope violation, not a simplification.

## Measuring the Outcome

A refactor plan and its review should be able to state, per file and in total:

- net physical lines (after minus before);
- duplicated code removed versus introduced;
- nesting or branching reduced where that was the diagnosis;
- reuse-ladder rung for every piece of new code.

Negative net lines are not mandatory — clarity can justify growth — but any growth must trace to a diagnosis, and duplication introduced is always a reviewer finding.
