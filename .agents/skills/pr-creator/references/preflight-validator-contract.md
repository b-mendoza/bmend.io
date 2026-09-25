# Contract: preflight-validator

Return exactly one status block. Do not include secrets, tokens, or full command output.

```text
PREFLIGHT: <PASS | PUSH_REQUIRED | PUSH_REJECTED | PR_EXISTS | AUTH | BASE_BRANCH_MISSING | HEAD_BRANCH_UNPUSHED | BLOCKED | ERROR>
Platform: <github | github-enterprise | gitlab | bitbucket | unknown>
Head remote: <name>
Base remote: <name>
Base branch: <target branch>
Head branch: <current branch>
Head remote state: <up-to-date | missing | local-ahead | diverged | unknown>
Base SHA: <sha | unavailable>
Head SHA: <sha | unavailable>
Existing PR: <none | url>
Push attempted: <yes | no>
Push command: <git push head_remote current_branch | none>
Push rejection reason: <diverged | protected branch | permission | other | n/a>
Approval record: <valid | missing | digest-mismatch | n/a>
Reason: <one line>
Decision needed: <none | approve plain push | user resolves rejected push | next action>
```

Code semantics:

- `PR_EXISTS`: an open PR/MR already targets the same base from the same head.
- `PUSH_REQUIRED`: head branch must be published and no valid push approval is present.
- `PUSH_REJECTED`: approved plain push was rejected; do not retry with force.
- `HEAD_BRANCH_UNPUSHED`: source is still not comparable and cannot be safely published by this skill.
