# Repair Protocol

Load from the `Repair` state after changed-file validation fails or the conformance check reports a repairable mismatch. Terminal names follow [`../state-machine.md`](../state-machine.md).

## Budget

`REPAIR_TOTAL` counts every repair attempt in the run across all failure signatures: test edit redispatches, validation retries, and first-error retries. Maximum: three. Increment immediately before each attempt. Never reset for a new failure signature.

**First-error retry:** any subagent dispatch returning `ERROR` outside an active repair gets exactly one same-dispatch retry, incrementing `REPAIR_TOTAL`; a second `ERROR` follows that state's `ERROR otherwise` route in [`../state-machine.md`](../state-machine.md).

## Cause-First Routing

| Likely cause | Route |
| --- | --- |
| `test refactor regression` | If budget remains, repair through `test-refactorer`; re-enter conformance |
| `production bug exposed` | Ask dual authority if a production fix is in scope; declined or out of scope → `TerminalBug` |
| `pre-existing failure` | `TerminalFailed` with raw-log path and risk summary |
| `unknown` and retry plausible | If budget remains, retry validation once with same guarded command |
| `unknown` and retry not plausible | `TerminalFailed` |
| Conformance mismatch | If budget remains, repair through `test-refactorer`; user-decision mismatches ask and resume at `Synthesis` |

Budget exhausted always routes to `TerminalFailed` unless a production bug has been identified, in which case use `TerminalBug`.

## Repair Packet Contract

Repair dispatch packets satisfy the receiving subagent's full required-input contract. Do not pass only a failure summary.

For `test-refactorer`, include:

| Input | Requirement |
| --- | --- |
| `RESOLVED_TARGET_SET` | Required |
| `MINIMAL_HARNESS_DECISION` | Required, approved or amended plan |
| `TEST_VALUE_REVIEW` | Required |
| `OTHER_REPORTS` | Optional compact API/security and maintainability reports |
| `PRODUCTION_EDIT_APPROVAL` | Required, `none` or approved file list |
| `SCOPE_LIMITS` | Optional |
| `VALIDATION_FAILURE` | Required during repair |
| `REPAIR_TOTAL` | Required during repair |
| `REPORT_TEMPLATE_PATH` | Required |

For `test-validator`, include resolved targets, changed files or `none`, command candidates, scope limits, template path, raw-log destination guidance, and the confirmed guarded command when retrying.

## Re-entry Points

Test-edit repairs re-enter the conformance check. Validation retries re-enter validation status routing. First-error retries return to the exact dispatch that errored.
