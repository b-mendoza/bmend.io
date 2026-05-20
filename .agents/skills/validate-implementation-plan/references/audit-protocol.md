# Audit Protocol

Read this file when a subagent output is malformed, a status needs
interpretation, or the final report contract is needed. Keep raw plan text out of
the orchestrator context while applying this protocol.

## Status Codes

| Status    | Meaning                                                            | Orchestrator action                                        |
| --------- | ------------------------------------------------------------------ | ---------------------------------------------------------- |
| `PASS`    | Stage completed and returned usable output                         | Continue                                                   |
| `BLOCKED` | Missing input, unreadable path, or unavailable required capability | Stop if the stage is a hard gate; otherwise record the gap |
| `FAIL`    | Stage ran but the output cannot support reliable downstream use    | Retry the same branch or record the gap                    |
| `ERROR`   | Unexpected tool, filesystem, parsing, or execution failure         | Retry once with the exact failure, then escalate or record |

## Severity Levels

| Severity   | Use for                                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------- |
| `critical` | The plan likely fails the request, adds unsafe scope, or depends on a disproven assumption      |
| `warning`  | The plan has material risk, weak support, or avoidable complexity that may still be salvageable |
| `info`     | The plan is supported, a caveat is minor, or the finding is explanatory                         |

## Retry Loop

1. Name the contract mismatch or failed condition.
2. Re-dispatch only the subagent branch that failed.
3. Re-run only the checks that previously failed.
4. Stop after three fix cycles for the same branch.
5. Escalate to the user when a hard gate remains unresolved.

Snapshot creation and requirement extraction are hard gates. Other failed audit
branches can be recorded in the final report if enough successful branches remain
to produce a useful audit.

## Annotation Shape

Findings returned by auditor subagents use this shape unless their own output
contract says otherwise:

```json
{
  "plan_section": "Implementation Approach",
  "expert": "Requirements Auditor | YAGNI Auditor | Assumptions Auditor",
  "severity": "critical | warning | info",
  "text": "One concise finding with requirement numbers or evidence references when relevant."
}
```

## Report Contract

Final artifact path: `OUTPUT_PATH`

Required sections, in order:

- `## Audit Scope`
- `## Source Requirements`
- `## Findings By Plan Section`
- `## Requirement Gaps`
- `## Audit Summary`
- `## Resolved Assumptions`
- `## Open Questions`
- `## Sensitive Content Handling`

Completion handoff:

```text
AUDIT: PASS | BLOCKED | FAIL | ERROR
Output: <OUTPUT_PATH or "not written">
Sections covered: <N or "unknown">
Findings: critical=<N>, warning=<N>, info=<N>
Open questions: <N>
Reason: <one line>
```
