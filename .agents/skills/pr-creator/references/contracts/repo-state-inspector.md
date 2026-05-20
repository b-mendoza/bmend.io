# Output Contract - Repo State Inspector

> Load at return time. The orchestrator uses only these summary fields.

## Template

```text
REPO_STATE: PASS | BLOCKED | ERROR
Remote: <remote url or none>
Platform: github | github-enterprise | gitlab | bitbucket | unknown
Current branch: <branch or none>
Target branch: <target branch or missing>
PR state: draft | ready | invalid
Uncommitted work: none | <count and concise categories>
Platform adapter needed: yes | no

Reason: none | <why status is not PASS>
Decision needed: none | <smallest user decision or orchestrator action>
```

## Codes

- `PASS`: routing data is available.
- `BLOCKED`: not a git repo, detached HEAD, or no safe branch name.
- `ERROR`: unexpected inspection failure.

## Example

<example>
REPO_STATE: PASS
Remote: git@github.com:acme/app.git
Platform: github
Current branch: docs/pr-creator-skill
Target branch: main
PR state: draft
Uncommitted work: none
Platform adapter needed: no

Reason: none
Decision needed: none
</example>
