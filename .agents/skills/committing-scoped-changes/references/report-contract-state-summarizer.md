# Report Contract: scoped-state-summarizer

> Read this file only when formatting the result of the state summarizer
> subagent. Return compact facts; never paste raw diffs or full command output.

## Structure

```text
SCOPED_STATE: PASS | NEEDS_CONTEXT | NO_SCOPED_CHANGES | BLOCKED | ERROR
Path scope:
- <path>: tracked | untracked | missing | mixed

Scoped changes:
- <file or area>: <concise behavioral or structural summary>

Staged scoped changes: none | <concise summary>
Untracked in scope: none | <concise list>
Unrelated changes outside scope: none | <concise list or count>
Mixed-hunk risk: none | <file and reason>
Tests in scope: none | <test files or test-relevant changes>
Recent commit style: <observed style or unknown>
Local context: none | found | missing
Context summary: none | <1-3 bullets>
Reference need: none | git-workflow | git-status | git-diff | git-add | git-restore | interactive-staging | git-commit | conventional-commits | atomic-commits | commit-message-style
References fetched: none | <urls and one-line conclusions>

Reason: none | <why status is not PASS>
Decision needed: none | <smallest user decision or orchestrator action>
```

`Reference need` values match the reference keys in
`./external-sources.md`. Use the same key string.

## Examples

<example>
SCOPED_STATE: PASS
Path scope:
- src/checkout/: tracked
- tests/checkout/: tracked

Scoped changes:

- src/checkout/retry.ts: adds retry handling for failed payment confirmation
- tests/checkout/retry.test.ts: covers retry success and retry exhaustion

Staged scoped changes: none
Untracked in scope: none
Unrelated changes outside scope: README.md modified
Mixed-hunk risk: none
Tests in scope: tests/checkout/retry.test.ts
Recent commit style: Conventional Commits with checkout scope
Local context: found
Context summary: JNS-6880 describes transient payment confirmation failures after provider timeout.
Reference need: none
References fetched: none

Reason: none
Decision needed: none
</example>

<example>
SCOPED_STATE: NEEDS_CONTEXT
Reason: The scoped diff changes retry behavior and telemetry naming, but no matching context explains whether they share one intent.
Decision needed: Ask whether telemetry naming belongs with the retry fix or should be separate.
</example>
