# State Machine — validate-implementation-plan

Finite-state execution model for this skill. Mermaid SoT: [`flow-diagram.md`](./flow-diagram.md). This table is the authoritative list of states, transitions, guards, and terminals. Normative status and report wording lives in [`references/audit-protocol.md`](./references/audit-protocol.md).

## States

| State | Kind | Role |
| --- | --- | --- |
| `LoadContracts` | active | Load trust-boundary and audit-protocol |
| `NormalizeInputs` | active | Confirm `PLAN_PATH`; derive `SNAPSHOT_PATH` / `OUTPUT_PATH` |
| `AuthorizeArtifacts` | active | Apply artifact create/overwrite policy |
| `AskArtifact` | active | Ask overwrite approval or alternate path |
| `EstablishOrigin` | active | Confirm `ORIGIN_CONTEXT` adequacy |
| `AskOrigin` | active | One baseline question; summarize approved answer |
| `ClassifyContext` | active | Classify `SOURCE_CONTEXT_PATHS`; reject project-specific external proof |
| `DispatchSnapshot` | active | Dispatch `plan-snapshotter` |
| `RetrySnapshot` | active | Branch-local retry (≤3) |
| `DispatchRequirements` | active | Dispatch `requirements-extractor` |
| `RetryRequirements` | active | Branch-local retry (≤3) |
| `GateEvidence` | active | Decide whether local technical evidence paths exist |
| `DispatchEvidence` | active | Dispatch `technical-researcher` |
| `RetryEvidence` | active | Optional evidence retry (≤3) |
| `RecordEvidenceGap` | active | Record evidence gap when optional branch unrecovered |
| `DispatchAuditors` | active | Dispatch requirements/yagni/assumptions discovery (parallel) |
| `RetryAuditor` | active | Re-dispatch **only** the failed auditor branch (≤3) |
| `GateUnresolved` | active | Check for decision-relevant unresolved assumptions |
| `AskAssumptions` | active | Ask proposed concise questions (orchestrator-owned) |
| `ResolveAssumptions` | active | Re-dispatch `assumptions-auditor` resolution mode |
| `RetryResolve` | active | Resolution-branch retry (≤3) |
| `GateOpenQuestions` | active | Block if decision-relevant open questions remain |
| `DispatchAnnotator` | active | Dispatch `plan-annotator` |
| `RetryReport` | active | Report-branch retry (≤3) |
| `MapFinalStatus` | active | Map structured results to final `AUDIT:*` |
| `TerminalPass` | terminal | `AUDIT: PASS` + compact handoff |
| `TerminalFail` | terminal | `AUDIT: FAIL` + compact handoff |
| `TerminalBlocked` | terminal | `AUDIT: BLOCKED` + compact handoff |
| `TerminalError` | terminal | `AUDIT: ERROR` + compact handoff |

## Transitions

| From | To | Guard / event |
| --- | --- | --- |
| `[*]` | `LoadContracts` | run start |
| `LoadContracts` | `NormalizeInputs` | trust-boundary and audit-protocol loaded |
| `NormalizeInputs` | `TerminalBlocked` | `PLAN_PATH` missing or unreadable |
| `NormalizeInputs` | `AuthorizeArtifacts` | `PLAN_PATH` ok; raw read limited to `plan-snapshotter` |
| `AuthorizeArtifacts` | `AskArtifact` | snapshot or report path exists without overwrite approval |
| `AuthorizeArtifacts` | `EstablishOrigin` | paths clear or overwrite already approved |
| `AskArtifact` | `TerminalBlocked` | overwrite declined and no alternate path |
| `AskArtifact` | `EstablishOrigin` | overwrite approved or alternate path set |
| `EstablishOrigin` | `AskOrigin` | `ORIGIN_CONTEXT` missing or inadequate |
| `EstablishOrigin` | `ClassifyContext` | `ORIGIN_CONTEXT` adequate |
| `AskOrigin` | `TerminalBlocked` | baseline answer declined or still inadequate |
| `AskOrigin` | `ClassifyContext` | approved summarized baseline adequate |
| `ClassifyContext` | `TerminalBlocked` | project-specific external website proof required |
| `ClassifyContext` | `DispatchSnapshot` | roles classified; allow-list unchanged |
| `DispatchSnapshot` | `RetrySnapshot` | not `SNAPSHOT: PASS` |
| `DispatchSnapshot` | `DispatchRequirements` | `SNAPSHOT: PASS` |
| `RetrySnapshot` | `DispatchSnapshot` | recovered and `retry_count < 3` |
| `RetrySnapshot` | `TerminalBlocked` | hard blocker after retry budget |
| `RetrySnapshot` | `TerminalError` | internal failure after retry budget |
| `DispatchRequirements` | `RetryRequirements` | not `REQUIREMENTS: PASS` |
| `DispatchRequirements` | `GateEvidence` | `REQUIREMENTS: PASS` |
| `RetryRequirements` | `DispatchRequirements` | recovered and `retry_count < 3` |
| `RetryRequirements` | `TerminalBlocked` | no credible baseline after retry budget |
| `RetryRequirements` | `TerminalError` | internal failure after retry budget |
| `GateEvidence` | `DispatchEvidence` | local-technical-evidence or mixed paths present |
| `GateEvidence` | `DispatchAuditors` | no local technical evidence paths |
| `DispatchEvidence` | `RetryEvidence` | not `EVIDENCE: PASS` |
| `DispatchEvidence` | `DispatchAuditors` | `EVIDENCE: PASS` |
| `RetryEvidence` | `DispatchEvidence` | recovered and `retry_count < 3` |
| `RetryEvidence` | `RecordEvidenceGap` | unrecovered after retry budget |
| `RecordEvidenceGap` | `DispatchAuditors` | core audit remains viable |
| `RecordEvidenceGap` | `TerminalBlocked` | core audit not viable |
| `DispatchAuditors` | `RetryAuditor` | any of TRACEABILITY / YAGNI / ASSUMPTIONS missing PASS or valid payload |
| `DispatchAuditors` | `GateUnresolved` | all three discovery PASS with valid payloads |
| `RetryAuditor` | `DispatchAuditors` | re-dispatch only failed branch; recovered under budget |
| `RetryAuditor` | `TerminalBlocked` | hard blocker after retry budget |
| `RetryAuditor` | `TerminalError` | internal failure after retry budget |
| `GateUnresolved` | `AskAssumptions` | decision-relevant unresolved assumptions present |
| `GateUnresolved` | `DispatchAnnotator` | none |
| `AskAssumptions` | `TerminalBlocked` | answers declined leaving decision-relevant questions open |
| `AskAssumptions` | `ResolveAssumptions` | answers approved as summarized evidence |
| `ResolveAssumptions` | `RetryResolve` | not `ASSUMPTIONS: PASS` with resolution payload |
| `ResolveAssumptions` | `GateOpenQuestions` | `ASSUMPTIONS: PASS` with resolution payload |
| `RetryResolve` | `ResolveAssumptions` | recovered and `retry_count < 3` |
| `RetryResolve` | `TerminalError` | unrecovered after retry budget |
| `GateOpenQuestions` | `TerminalBlocked` | decision-relevant open questions remain |
| `GateOpenQuestions` | `DispatchAnnotator` | none remain |
| `DispatchAnnotator` | `RetryReport` | not `REPORT: PASS` |
| `DispatchAnnotator` | `MapFinalStatus` | `REPORT: PASS` |
| `RetryReport` | `DispatchAnnotator` | recovered and `retry_count < 3` |
| `RetryReport` | `TerminalBlocked` | report blocked after retry budget |
| `RetryReport` | `TerminalError` | report internal failure after retry budget |
| `MapFinalStatus` | `TerminalPass` | no criticals; no unresolved hard gate; no decision-relevant open question |
| `MapFinalStatus` | `TerminalFail` | report written and ≥1 critical finding remains |
| `MapFinalStatus` | `TerminalBlocked` | hard gate or decision-relevant question unresolved |
| `MapFinalStatus` | `TerminalError` | unrecovered internal failure remains |
| `TerminalPass` | `[*]` | emit compact handoff |
| `TerminalFail` | `[*]` | emit compact handoff |
| `TerminalBlocked` | `[*]` | emit compact handoff |
| `TerminalError` | `[*]` | emit compact handoff |

## Operational definitions (guards)

Defined in [`references/audit-protocol.md`](./references/audit-protocol.md):

| Term | Meaning |
| --- | --- |
| `ORIGIN_CONTEXT` adequate | States a user-request outcome without requiring inference from the plan |
| core audit remains viable | Snapshot + numbered requirements + all three discovery auditor payloads exist |
| decision-relevant | Resolving it could change final `AUDIT:*` or a finding’s `critical`/`warning` severity |

## Terminal decisions

Exactly one of: `AUDIT: PASS`, `AUDIT: FAIL`, `AUDIT: BLOCKED`, `AUDIT: ERROR`.

## Reachability and dead-state checks

| Property | Result |
| --- | --- |
| Every active state reachable from `LoadContracts` | yes |
| Every terminal reachable | yes (`TerminalPass`/`Fail` via `MapFinalStatus`; `Blocked`/`Error` via intake, retries, and gates) |
| Dead states (no outgoing, non-terminal) | none |
| Retry loops bounded | yes — max 3 per named branch |
| Auditor recovery re-enters dispatch | yes — `RetryAuditor` → `DispatchAuditors` (failed branch only) |
