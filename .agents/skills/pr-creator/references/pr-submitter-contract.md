# Contract: pr-submitter

Return exactly one status block. Echo platform-returned values for orchestrator verification; do not rely on inputs as verification evidence.

```text
PR_SUBMIT: <PASS | HEAD_MOVED | CREATE_UNCERTAIN | BLOCKED | CREATE_ERROR | AUTH | ERROR>
Approval record: <valid | missing | digest-mismatch>
Frozen head SHA: <sha>
Remote head SHA before create: <sha | unavailable>
Existing PR race check: <none | url>
Create attempted: <yes | no>
Create retry used: <yes | no>
URL: <platform-returned url | unavailable>
Base returned: <platform-returned base | unavailable>
Head ref returned: <platform-returned head ref | unavailable>
Head SHA returned: <platform-returned head sha | unavailable>
Title returned: <platform-returned title | unavailable>
State returned: <platform-returned state | unavailable>
Reviewers returned: <platform-returned reviewers | none | unavailable>
Labels returned: <platform-returned labels | none | unavailable>
Body first line returned: <line | unavailable>
Body line count returned: <number | unavailable>
Approved body digest: <digest>
Returned body digest: <digest | unavailable>
Verification: <pass | fail | not-run>
Mismatched fields: <comma list | none>
Uncertain check commands: <commands | n/a>
Reason: <one line>
Decision needed: <none | rerun diff after head moved | user checks commands | next action>
```

Use `HEAD_MOVED` before create when the remote head SHA no longer matches the frozen preview. Use `CREATE_UNCERTAIN` only after querying for the PR/MR and one bounded retry still cannot determine the outcome.
