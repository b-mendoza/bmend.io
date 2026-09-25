# Contract: repo-state-inspector

Return exactly one status block. Do not include raw command output.

```text
REPO_STATE: <PASS | BLOCKED | ERROR>
Execution mode support: dispatch-compatible | inline-compatible
Current branch: <branch | none>
Target branch: <input value | missing>
Target branch candidate: <base default branch | unknown>
PR state: <draft | ready | invalid: value>
Remotes:
- <name>: <url> (<github | github-enterprise | gitlab | bitbucket | unknown>)
Head remote: <name | unresolved>
Base remote: <name | unresolved>
Topology: <same-remote | fork | ambiguous>
Topology candidates: <list when ambiguous | n/a>
Platform: <github | github-enterprise | gitlab | bitbucket | unknown>
Platform adapter needed: <yes | no>
Uncommitted work: <none | summary; outside PR until committed>
Reason: <one line>
Decision needed: <none | question for orchestrator>
```

Use `BLOCKED` for not-a-git-repository, detached HEAD, invalid `PR_STATE`, no safely nameable branch, or unusable remote facts. Use `ERROR` for unexpected inspection failure.
