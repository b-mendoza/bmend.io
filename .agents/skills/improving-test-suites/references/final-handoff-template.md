# Final Handoff Template

Use this template once exactly one terminal status has been selected.

```text
# Improving Test Suites Handoff

Status: <CHANGED_PASS | COMPLETE_NO_SAFE_CHANGE | COMPLETE_PRODUCTION_BUG_EXPOSED | VALIDATION_FAILED_AFTER_REPAIR | COMPLETE_ERROR | COMPLETE_BLOCKED>

## Target

- Requested target: <original TARGET_TEST_FILES>
- Resolved target set: <paths>
- User goal: <goal or none>
- Scope limits: <scope or none>
- AUTO_APPROVE: <true/false; if true, record that only the plan gate was bypassed>

## Outcome

- Changed files: <paths or none>
- No-op rationale: <if no changes>
- Production bug exposed: <behavior, failing evidence, and why no unapproved production edit was made>
- Error or blocker: <source, reason, and recovery context>

## Harness Actions

Deleted tests:
- <file::test_name | verbatim-category | reason>

Rewritten tests:
- <file::test_name | verbatim-category | reason>

Consolidated tests:
- <file::test_name | verbatim-category | reason>

Added tests:
- <file or area | high-value category | protected behavior>

Unapplied approved decisions:
- <decision id | reason>

## Metrics And Coverage Map

- Before test count: <number or unavailable with reason>
- After test count: <number or unavailable with reason>
- Behavior-to-surviving-test map:
  - <behavior/category | surviving file::test_name | coverage rating>

## Validation

- Command: <guard-passing or user-confirmed command>
- Result: <PASS/FAIL/BLOCKED/ERROR>
- Likely cause on failure: <test refactor regression | production bug exposed | pre-existing failure | unknown>
- Raw log path on non-PASS: <local uncommitted path or none>

## Reviews And Sources

- Value review status: <status>
- API/security review: <status, route, or not needed>
- Maintainability review: <status, route, or not needed>
- Sufficiency-checklist outcomes for skipped optional reviews: <items or none>
- Fetched URLs that influenced decisions: <urls or none>

## Approvals And Safety Gates

- Harness plan approval: <approved/declined/amended/AUTO_APPROVE bypass>
- Production/shared-helper approvals: <file list or none>
- Workspace-risk acknowledgment: <record or none>
- Conformance check: <pass/fail summary>
- REPAIR_TOTAL used: <0-3>

## Remaining Risks

- <risk, including external-source prompt-injection residual when sources were used>

## Resume Packet

Only for COMPLETE_BLOCKED:
- Inputs: <compact inputs>
- Reports so far: <compact statuses and paths>
- Pending question: <single focused question>
- Next step: <retry point>
- REPAIR_TOTAL: <number>
```
