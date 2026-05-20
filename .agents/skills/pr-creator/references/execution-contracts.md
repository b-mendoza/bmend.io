# Execution Contracts

> Load this file when mapping a failure, showing the PR preview, using the body
> template, or printing the final result. Subagent return formats live in
> `./contracts/<subagent-name>.md` and are loaded only by that
> subagent.

## Failure Envelope

```text
PR_CREATE: AUTH | BASE_BRANCH_MISSING | HEAD_BRANCH_UNPUSHED | EMPTY_DIFF | BLOCKED | CANCELLED | CREATE_ERROR
Reason: <one line>
Next step: <one clear action>
```

## Failure Map

| Source status                                                     | Envelope code                      |
| ----------------------------------------------------------------- | ---------------------------------- |
| `PREFLIGHT: AUTH`, `PR_SUBMIT: AUTH`, `REVIEW_METADATA: AUTH`     | `AUTH`                             |
| `PREFLIGHT: BASE_BRANCH_MISSING`                                  | `BASE_BRANCH_MISSING`              |
| `PREFLIGHT: HEAD_BRANCH_UNPUSHED` or declined push                | `HEAD_BRANCH_UNPUSHED`             |
| `DIFF_ANALYSIS: EMPTY_DIFF`                                       | `EMPTY_DIFF`                       |
| `REPO_STATE: BLOCKED`, `PREFLIGHT: BLOCKED`, `PR_SUBMIT: BLOCKED` | `BLOCKED`                          |
| User declines large-PR or create confirmation                     | `CANCELLED`                        |
| `PR_SUBMIT: CREATE_ERROR`                                         | `CREATE_ERROR`                     |
| Any subagent `ERROR`                                              | `BLOCKED` with the subagent reason |

Recover by re-running only the earliest affected phase. After three
non-converging preview or validation cycles, ask the user for exact final values
or permission to stop.

## Preview Template

Show this before creating anything. Any edit to title, body, reviewer, label,
branch, or state invalidates approval.

```text
PR Preview
----------
Title:      <title>
Target:     <target_branch>
Source:     <current_branch>
Reviewers:  <reviewer list>
Labels:     <label list or "none">
Status:     <draft or ready>

Description:
<description>
```

## Final Success Output

```text
PR created: <url>

Base: <target_branch>
Head: <current_branch>
Title: <title>
State: <draft|ready>
Reviewers: <reviewer list or none>
Labels: <label list or none>

Description:
<description>
```

## PR Body Template

Use this body when the user did not provide `BODY_OVERRIDE`. For deeper writing
guidance, load `./external-resources.md` and fetch one source from
"Writing and Review Sources".

```markdown
## Summary

<2-3 sentence overview of what changed and why it matters>

## Key Changes

- <specific grounded change>
- <specific grounded change>

## Impact

- <who or what is affected>
- <testing, migration, rollout, or risk notes when present>
```
