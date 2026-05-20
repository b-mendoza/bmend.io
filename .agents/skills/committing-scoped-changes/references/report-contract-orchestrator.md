# Report Contract: Orchestrator Final Report

> Read this file only when formatting the final user-facing report at the end of
> the workflow. Return compact facts; never paste raw diffs, copied article
> text, or full command logs.

## Success Structure

```text
Commits created:
- <sha> <message>
  Summary: <what changed and why>
  Verification: <check run or "not run: reason">

Remaining scoped changes: <none or concise list>
Unrelated changes left untouched: <none or concise list>
References fetched: <none or concise list>
```

## Failure Structure

```text
COMMIT_SCOPED_CHANGES: <status>
Status values: BLOCKED | NEEDS_CONTEXT | NO_SCOPED_CHANGES | VERIFY_FAILED | COMMIT_ERROR | ERROR
Reason: <one line>
Next step: <one clear action or question>
```

## Examples

<example>
Commits created:
- abc1234 fix(checkout): retry failed payment confirmation
  Summary: Adds retry handling for failed checkout confirmation and covers it with checkout tests.
  Verification: npm test -- checkout

Remaining scoped changes: none
Unrelated changes left untouched: README.md modified
References fetched: none
</example>

<example>
COMMIT_SCOPED_CHANGES: NO_SCOPED_CHANGES
Reason: src/payments/ has no tracked, staged, or untracked changes.
Next step: Confirm the intended path scope or skip the commit request.
</example>
