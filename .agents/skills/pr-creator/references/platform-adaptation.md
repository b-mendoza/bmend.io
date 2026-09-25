# Platform Adaptation

Load this file only when the inspected platform is GitLab, Bitbucket, GitHub Enterprise, unknown, when a platform adapter flag is set, or when checking PR state support.

## Shared Fields

| Concept | Required meaning |
| --- | --- |
| Base repository | Repository that receives the PR/MR. |
| Head repository | Repository that contains the source branch. May differ from base in fork workflows. |
| Base branch | `TARGET_BRANCH` on `BASE_REMOTE`. |
| Head branch | `CURRENT_BRANCH` on `HEAD_REMOTE`. |
| Existing PR check | Query open PRs/MRs for the same base branch and same head branch/repository before drafting and again before create. |
| Verification | Query the created or found PR/MR and echo platform-returned fields, including body digest evidence. |

## Platform Notes

| Platform | Create path | Draft support | Fork notes |
| --- | --- | --- | --- |
| GitHub / GitHub Enterprise | Prefer `gh pr create` and verify with `gh pr view --json ...`. Use `--head <owner>:<branch>` for fork heads when needed. | Supported where repository plan/policy permits. | Head and base repositories are distinct; do not assume one remote. |
| GitLab | Prefer `glab mr create` or GitLab API and verify with MR query. | Draft MRs supported by title/state conventions or CLI flag depending on version. | Source and target project can differ. |
| Bitbucket Cloud | Use approved CLI/API path if available; otherwise ask for approved tooling. | No native draft PR state. | Source and destination repositories can differ. |
| Unknown | Fetch one current platform/tooling document or ask the user which platform/tooling to use. | Unknown until confirmed. | Do not create until fields are mappable. |

## State Capability Gate

When requested `PR_STATE` has no platform equivalent, ask before preview:

```text
Requested state `<requested>` is not supported on `<platform>`.
Choose one:
1. Proceed as `ready` and show `effective: ready` in the preview.
2. Stop without creating a PR/MR.
```

Silent substitution is forbidden. The preview must show both requested and effective state.

## Unknown Syntax Policy

Fetch at most one authoritative source for the active platform/tooling when the exact flag, field, or capability changes a concrete command. If the exact path remains unsafe after one source, ask the user for the hosting platform or approved tooling instead of improvising.
