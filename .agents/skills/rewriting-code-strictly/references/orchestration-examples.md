# Strict Rewrite Orchestration Examples

> Read this file only when a concrete dispatch round-trip, a no-change case, or an unavailable-reference case would clarify execution. Language details live in the language playbooks and optional external source map.

## Boundary Rewrite Round Trip

Input:

- `TARGET_CODE`: `src/payments/webhook.ts`
- `USER_GOAL`: `"remove unsafe any and validate the webhook payload"`
- `VALIDATION_COMMAND`: `npm test -- payments && npx tsc --noEmit`
- `REFERENCE_NEED`: `"current Zod safeParse behavior"`

Flow:

1. Orchestrator dispatches `strict-baseline-mapper`.
2. Mapper returns `STRICT_BASELINE: PASS`: TypeScript, untrusted webhook body, `any` at the boundary, existing payment tests.
3. Orchestrator dispatches `strict-rewrite-strategist`.
4. Strategist resolves the package-relative `./references/typescript-playbook.md` row, reads `../references/typescript-playbook.md`, loads `../references/external-sources.md` only because the Zod API choice affects implementation, and fetches the smallest relevant Zod URL only when `REFERENCE_NEED` or `EXTERNAL_FETCH_APPROVAL` explicitly covers the fetch. It returns a minimal plan: accept `unknown`, parse once at the webhook boundary, pass the inferred payload type internally, leave persistence code alone.
5. Orchestrator runs the approval gate. No dependency, public API, behavior, scope, fetch, or validation authority expansion is required because Zod already exists and the user supplied the validation command.
6. Orchestrator dispatches `strict-rewrite-implementer`.
7. Implementer edits the webhook file, runs the supplied command, and returns `STRICT_IMPLEMENTATION: PASS`.
8. Orchestrator dispatches `strict-rewrite-reviewer`.
9. Reviewer returns `STRICT_REVIEW: PASS`: behavior, scope, validation placement, and TypeScript strictness all match the strategy.
10. Orchestrator returns the handoff with changed files, checks, references, assumptions, and remaining risks.

## Approval Gate Handling

1. Strategist returns `STRICT_STRATEGY: PASS`, but the smallest safe plan would add Pydantic to a project that does not already use it.
2. After `CheckGates` pass, `GateExpansion` detects the dependency expansion. Orchestrator enters `AskApproval` with one question naming the dependency, target file, reason, risk, reversibility, and safer no-dependency alternative.
3. If the user **approves**, resume `DispatchImplement` with the expanded `MUTATION_LIMITS` / scope — do not terminal-stop.
4. If the user **declines**, stop as `TerminalBlocked` (or re-plan only when the user supplies a revised in-limits goal). Unanswered → `TerminalNeedsClarification`.

## Validation Warning Handling

1. Strategist returns `STRICT_STRATEGY: PASS` with a validation plan, but the user did not supply `VALIDATION_COMMAND` and project evidence does not clearly permit running the discovered command.
2. Implementer applies only the approved rewrite, records the skipped command as missing validation evidence, and returns `STRICT_IMPLEMENTATION: PASS_WITH_WARNINGS`.
3. Orchestrator still dispatches the reviewer.
4. Reviewer judges whether the missing validation is acceptable risk, a required targeted fix, or a blocker for the final handoff.

## No-Change Handling

1. Mapper returns `STRICT_BASELINE: NO_CHANGE_CANDIDATE` for Go code that already uses concrete structs, explicit error returns, checked JSON decoding, and passing project validation.
2. Strategist returns `STRICT_STRATEGY: NO_CHANGE` because the requested rewrite would add ceremony without improving safety.
3. Orchestrator stops without editing and reports the behavior summary, no-change rationale, validation evidence, and any assumptions.

## Unavailable External Reference

1. Strategist has approval to fetch current validator API behavior to choose between `.parse` and `.safeParse`, but the linked docs are unavailable.
2. If project code already demonstrates the API safely, strategist proceeds from project evidence and records `unavailable: <url> (used project usage as evidence)`.
3. If approval to fetch is missing, strategist returns `NEEDS_CLARIFICATION` with the target source, reason, risk, reversibility, and safer local alternative.
4. If approval exists but the source is unavailable and project evidence is insufficient, strategist returns `NEEDS_CLARIFICATION` or `ERROR` with the smallest recovery action instead of guessing current docs.
