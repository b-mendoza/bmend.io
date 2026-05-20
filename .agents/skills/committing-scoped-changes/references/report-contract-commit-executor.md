# Report Contract: scoped-commit-executor

> Read this file only when formatting the result of the commit executor
> subagent. Return compact facts; never paste raw diffs or full command output.

## Structure

```text
COMMIT_EXECUTE: PASS | VERIFY_FAILED | BLOCKED | COMMIT_ERROR | ERROR
Group ID: <group-id>
Commit: <short-sha or none>
Message: <commit message>
Staged diff reviewed: yes | no
Verification: pass | fail | not-run
Verification command: none | <command>
References fetched: none | <urls and one-line conclusions>
Summary: <what changed and why>
Remaining scoped changes: unknown | none | <concise list>

Reason: none | <why status is not PASS>
Decision needed: none | <smallest recovery action>
```

`Remaining scoped changes` is `unknown` unless the executor performed a fresh
state inspection after the commit. The orchestrator typically refreshes state by
re-dispatching `scoped-state-summarizer`.

## Examples

<example>
COMMIT_EXECUTE: PASS
Group ID: checkout-retry-fix
Commit: abc1234
Message: fix(checkout): retry failed payment confirmation
Staged diff reviewed: yes
Verification: pass
Verification command: npm test -- checkout
References fetched: none
Summary: Adds retry handling for failed checkout confirmation and covers it with checkout tests.
Remaining scoped changes: unknown

Reason: none
Decision needed: none
</example>

<example>
COMMIT_EXECUTE: VERIFY_FAILED
Group ID: checkout-retry-fix
Commit: none
Message: fix(checkout): retry failed payment confirmation
Staged diff reviewed: yes
Verification: fail
Verification command: npm test -- checkout
References fetched: none
Summary: Retry behavior and tests were staged, but checkout tests failed.
Remaining scoped changes: unknown

Reason: Checkout retry exhaustion test failed after staging the planned group.
Decision needed: Fix the failing checkout test inside the current scope or ask whether to commit without this verification.
</example>
