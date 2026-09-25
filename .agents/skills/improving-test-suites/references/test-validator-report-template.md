# Test Validator Report Template

```text
# Test Validator Report

Status: <PASS | FAIL | BLOCKED | ERROR>

## Command

- Selected command: <command>
- Guard result: <known test runner | user-confirmed verbatim | blocked>
- Scope widening: <reason or none>

## Result

- Summary: <short result>
- Changed files: <paths or none>
- Likely cause: <test refactor regression | production bug exposed | pre-existing failure | unknown | none>
- Raw log path on non-PASS: <local uncommitted path or none>

## Evidence

- <bounded failure or success evidence>

## Non-PASS Detail

- Reason: <required for non-PASS>
- Decision needed: <question or none>
```
