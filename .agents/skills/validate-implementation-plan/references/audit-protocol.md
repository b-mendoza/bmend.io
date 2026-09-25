# Audit Protocol

Read this file before the first dispatch and whenever a stage output needs interpretation, a retry is required, or the final report contract is needed. Apply the trust boundary from `./trust-boundary.md` while using this protocol. Execution routing follows `../flow-diagram.md` and `../state-machine.md`.

## Operational Definitions

| Term | Operational meaning |
| --- | --- |
| `ORIGIN_CONTEXT` adequate | The text states a user-request outcome (what to build or change) without requiring inference from the plan. Missing, empty, or plan-only restatements are inadequate. |
| core audit remains viable | `SNAPSHOT_PATH` exists with `SNAPSHOT: PASS`, numbered requirements exist with `REQUIREMENTS: PASS`, and discovery payloads exist for `TRACEABILITY: PASS`, `YAGNI: PASS`, and `ASSUMPTIONS: PASS`. |
| decision-relevant | Resolving the assumption or question could change the final `AUDIT: PASS \| FAIL \| BLOCKED \| ERROR` outcome or could raise or lower a finding between `critical` and `warning`. |

## Status Codes

| Status | Meaning | Orchestrator action |
| --- | --- | --- |
| `PASS` | Stage completed and returned usable output | Continue |
| `BLOCKED` | Missing prerequisite, unreadable authorized path, declined user input, or unapproved artifact collision | Stop if the stage is a hard gate; otherwise record a gap |
| `FAIL` | Stage ran but output cannot support reliable downstream use | Retry the named failed branch, or record the optional evidence gap |
| `ERROR` | Unexpected tool, filesystem, parsing, or execution failure | Retry the named failed branch, then escalate or record if optional |

## Stage Contracts

Accept a stage output only when the stage-specific success label and payload shape are present.

| Stage | Success label | Expected payload |
| --- | --- | --- |
| Snapshot | `SNAPSHOT: PASS` | Snapshot path, section count, redaction state, sensitive categories, technical claim count, artifact action |
| Requirements | `REQUIREMENTS: PASS` | Numbered source requirements, baseline notes, context paths used, unreadable paths |
| Technical evidence | `EVIDENCE: PASS` | JSON array of local-evidence claim reviews plus reviewed path list |
| Traceability audit | `TRACEABILITY: PASS` | JSON object with `req_annotations`, `requirement_gaps`, and `coverage_summary` |
| Scope audit | `YAGNI: PASS` | JSON array of scope findings with smaller alternatives |
| Assumptions audit | `ASSUMPTIONS: PASS` | Discovery or resolution JSON matching the assumptions contract |
| Report assembly | `REPORT: PASS` | Written `OUTPUT_PATH` with all required sections present (use `None.` for empty sections) |

Malformed JSON, missing required fields, wrong status labels, or payloads that cite unauthorized evidence are failed stage contracts.

The annotator returns `REPORT: PASS` only for a successful write. The orchestrator alone maps final `AUDIT: PASS | FAIL | BLOCKED | ERROR` after severity aggregation and hard-gate checks. Annotator blockers use `REPORT: BLOCKED` or `REPORT: ERROR` (not final `AUDIT:*`).

## Hard And Optional Gates

| Gate | Type | Recovery |
| --- | --- | --- |
| `PLAN_PATH` access by `plan-snapshotter` | Hard | Return `AUDIT: BLOCKED` or retry on transient error |
| Artifact write authorization | Hard | Ask for overwrite approval or alternate path |
| `ORIGIN_CONTEXT` baseline | Hard | Ask one baseline question; continue only when adequate |
| Snapshot creation | Hard | Retry snapshot branch only |
| Requirement extraction | Hard | Retry requirements branch only |
| Technical evidence review | Optional | Retry, then record an evidence gap when core audit remains viable |
| Traceability, YAGNI, assumptions discovery | Hard | Retry the named auditor branch only (re-enter dispatch) |
| Assumption resolution for decision-relevant questions | Hard | Ask user; unresolved decision questions block |
| Report assembly | Hard | Retry report branch only |

## Artifact Policy

The workflow writes only `SNAPSHOT_PATH` and `OUTPUT_PATH`. Writers receive an artifact action:

- `create`: path does not exist.
- `overwrite-approved`: path exists and the user approved replacement.
- `blocked-existing`: path exists without approval; writer returns stage `BLOCKED`.

The source plan is never overwritten. Retries reuse the same artifact policy unless the user explicitly changes it.

## Severity Levels

| Severity | Use for |
| --- | --- |
| `critical` | The plan likely fails the request, adds unsafe scope, or depends on a disproven decision-relevant assumption |
| `warning` | The plan has material risk, weak support, or avoidable complexity that may still be salvageable |
| `info` | The plan is supported, a caveat is minor, or the finding is explanatory |

## Retry Loop

1. Name the contract mismatch or failed condition.
2. Re-dispatch only the subagent branch that failed (auditor recovery re-enters `DispatchAuditors` for that branch only).
3. Preserve the same trust limits: no widened paths, no new raw `PLAN_PATH` access outside `plan-snapshotter`, and no project-specific external website evidence.
4. Re-run only the checks that previously failed.
5. Stop after three fix cycles for the same branch.
6. Escalate to the user when a hard gate remains unresolved.

Optional local technical evidence failures can be recorded in the final report as evidence gaps when core audit remains viable.

## Annotation Shape

Findings returned by auditor subagents use this shape unless their own output contract adds fields:

```json
{
  "plan_section": "Implementation Approach",
  "expert": "Requirements Auditor | YAGNI Auditor | Assumptions Auditor",
  "severity": "critical | warning | info",
  "text": "One concise finding with requirement numbers or evidence references when relevant."
}
```

Technical evidence findings use:

```json
{
  "claim": "Library X supports feature Y",
  "plan_section": "Implementation Approach",
  "status": "supported | unsupported | unclear | not-reviewed",
  "evidence_path": "docs/library-notes.md",
  "note": "One-sentence summary of the relevant local evidence"
}
```

## Report Contract

Final artifact path: `OUTPUT_PATH`

Required sections, in order (count = 9; empty sections use `None.`):

- `## Audit Scope`
- `## Source Requirements`
- `## Technical Evidence Review`
- `## Findings By Plan Section`
- `## Requirement Gaps`
- `## Audit Summary`
- `## Resolved Assumptions`
- `## Open Questions`
- `## Sensitive Content Handling`

`Sections covered` in the completion handoff is the count of required headings present (always `9` when the report contract is met).

Completion handoff:

```text
AUDIT: PASS | FAIL | BLOCKED | ERROR
Output: <OUTPUT_PATH or "not written">
Sections covered: <N or "unknown">
Findings: critical=<N>, warning=<N>, info=<N>
Open questions: <N>
Reason: <one line>
```

## Final Status Mapping

Sole prose source of truth for final outcomes (orchestrator applies after `REPORT: PASS`):

- `AUDIT: PASS`: report written, required sections present, no critical findings, no unresolved hard gate, and no decision-relevant open question.
- `AUDIT: FAIL`: report written and at least one critical traceability gap, critical avoidable-complexity finding, or disproven risky assumption remains.
- `AUDIT: BLOCKED`: required input is missing or declined, artifact authorization fails, `ORIGIN_CONTEXT` cannot be established, required external project proof is requested, a hard gate remains unresolved, or a decision-relevant assumption remains unanswered.
- `AUDIT: ERROR`: unrecovered internal, parsing, malformed-output, or report-write failure remains after the retry budget.
