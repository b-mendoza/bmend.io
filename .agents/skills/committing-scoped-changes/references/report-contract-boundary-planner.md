# Report Contract: commit-boundary-planner

> Read this file only when formatting the result of the boundary planner
> subagent. Return compact facts; never paste raw diffs or full article text.

## Structure

```text
COMMIT_PLAN: PASS | NEEDS_DECISION | BLOCKED | ERROR
Plan summary: <one sentence>
References fetched: none | <urls and one-line conclusions>

Groups:
- ID: <group-id>
  Intent: <single reason>
  Include: <paths or hunk descriptions>
  Exclude: <related but separate paths/hunks or none>
  Message: <proposed commit message>
  Verification: <smallest meaningful check or not-run reason>
  Staging notes: <file-level staging or exact mixed-hunk caution>
  Risk notes: none | <concise risk>

Reason: none | <why status is not PASS>
Decision needed: none | <smallest user decision or orchestrator action>
```

A valid group has a single reviewer-facing reason, a specific message, the
smallest meaningful verification, and a staging note that the executor can act
on without ambiguity.

## Examples

<example>
COMMIT_PLAN: PASS
Plan summary: One atomic fix commit covers retry behavior and its tests.
References fetched: none

Groups:

- ID: checkout-retry-fix
  Intent: Retry transient payment confirmation failures described by JNS-6880.
  Include: src/checkout/retry.ts; tests/checkout/retry.test.ts
  Exclude: none
  Message: fix(checkout): retry failed payment confirmation
  Verification: npm test -- checkout
  Staging notes: file-level staging is sufficient
  Risk notes: retry behavior changes payment confirmation timing

Reason: none
Decision needed: none
</example>

<example>
COMMIT_PLAN: NEEDS_DECISION
Plan summary: Scoped changes contain a behavior fix and a telemetry rename.
References fetched: https://www.aleksandrhovhannisyan.com/blog/atomic-git-commits/ - atomic commits should have one reason and be independently revertable.

Groups: none

Reason: Telemetry rename may be cleanup or part of the checkout fix; the context does not say.
Decision needed: Ask whether telemetry naming should be committed separately from retry behavior.
</example>
