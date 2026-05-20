# Output Contract - PR Submitter

> Load at return time. The orchestrator uses the verified URL and field summary
> for final output.

## Template

```text
PR_SUBMIT: PASS | BLOCKED | CREATE_ERROR | AUTH | ERROR
URL: <created PR/MR URL or none>
Base: <target_branch>
Head: <current_branch>
Title: <title>
State: draft | ready
Reviewers: <reviewer list or none>
Labels: <label list or none>
Verification: pass | fail | not-run

Reason: none | <why status is not PASS>
Decision needed: none | <smallest recovery action>
```

## Codes

- `PASS`: approved PR is created and verified.
- `BLOCKED`: approval or a required approved value is missing.
- `CREATE_ERROR`: creation or verification failed after approval.
- `AUTH`: platform CLI or credentials are missing or invalid.
- `ERROR`: unexpected submission failure.

## Example

<example>
PR_SUBMIT: PASS
URL: https://github.com/acme/app/pull/42
Base: main
Head: docs/pr-creator-skill
Title: docs(skills): strengthen pr creation workflow
State: draft
Reviewers: @docs-team
Labels: documentation
Verification: pass

Reason: none
Decision needed: none
</example>
