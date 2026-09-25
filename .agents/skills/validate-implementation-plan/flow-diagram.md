# validate-implementation-plan

Audit an implementation plan without overwriting the source plan. Execution is a finite-state machine. Companion transition table: [`state-machine.md`](./state-machine.md).

```mermaid
stateDiagram-v2
  [*] --> LoadContracts

  LoadContracts --> NormalizeInputs: trust-boundary and audit-protocol loaded
  NormalizeInputs --> TerminalBlocked: PLAN_PATH missing or unreadable
  NormalizeInputs --> AuthorizeArtifacts: PLAN_PATH ok and raw read limited to plan-snapshotter

  AuthorizeArtifacts --> AskArtifact: snapshot or report path exists without overwrite approval
  AuthorizeArtifacts --> EstablishOrigin: artifact paths clear or overwrite already approved
  AskArtifact --> TerminalBlocked: overwrite declined and no alternate path
  AskArtifact --> EstablishOrigin: overwrite approved or alternate path set

  EstablishOrigin --> AskOrigin: ORIGIN_CONTEXT missing or inadequate
  EstablishOrigin --> ClassifyContext: ORIGIN_CONTEXT adequate
  AskOrigin --> TerminalBlocked: baseline answer declined or still inadequate
  AskOrigin --> ClassifyContext: approved summarized baseline adequate

  ClassifyContext --> TerminalBlocked: project-specific external website proof required
  ClassifyContext --> DispatchSnapshot: roles classified and allow-list unchanged

  DispatchSnapshot --> RetrySnapshot: not SNAPSHOT_PASS
  DispatchSnapshot --> DispatchRequirements: SNAPSHOT_PASS
  RetrySnapshot --> DispatchSnapshot: recovered and retry_count under 3
  RetrySnapshot --> TerminalBlocked: hard blocker after retry budget
  RetrySnapshot --> TerminalError: internal failure after retry budget

  DispatchRequirements --> RetryRequirements: not REQUIREMENTS_PASS
  DispatchRequirements --> GateEvidence: REQUIREMENTS_PASS
  RetryRequirements --> DispatchRequirements: recovered and retry_count under 3
  RetryRequirements --> TerminalBlocked: no credible baseline after retry budget
  RetryRequirements --> TerminalError: internal failure after retry budget

  GateEvidence --> DispatchEvidence: local-technical-evidence or mixed paths present
  GateEvidence --> DispatchAuditors: no local technical evidence paths

  DispatchEvidence --> RetryEvidence: not EVIDENCE_PASS
  DispatchEvidence --> DispatchAuditors: EVIDENCE_PASS
  RetryEvidence --> DispatchEvidence: recovered and retry_count under 3
  RetryEvidence --> RecordEvidenceGap: unrecovered after retry budget
  RecordEvidenceGap --> DispatchAuditors: core audit remains viable
  RecordEvidenceGap --> TerminalBlocked: core audit not viable

  DispatchAuditors --> RetryAuditor: any of TRACEABILITY_YAGNI_ASSUMPTIONS missing PASS or valid payload
  DispatchAuditors --> GateUnresolved: TRACEABILITY_PASS and YAGNI_PASS and ASSUMPTIONS_PASS
  RetryAuditor --> DispatchAuditors: re-dispatch only failed branch and recovered under budget
  RetryAuditor --> TerminalBlocked: hard blocker after retry budget
  RetryAuditor --> TerminalError: internal failure after retry budget

  GateUnresolved --> AskAssumptions: decision-relevant unresolved assumptions present
  GateUnresolved --> DispatchAnnotator: no decision-relevant unresolved assumptions

  AskAssumptions --> TerminalBlocked: answers declined leaving decision-relevant questions open
  AskAssumptions --> ResolveAssumptions: answers approved as summarized evidence

  ResolveAssumptions --> RetryResolve: not ASSUMPTIONS_PASS with resolution payload
  ResolveAssumptions --> GateOpenQuestions: ASSUMPTIONS_PASS with resolution payload
  RetryResolve --> ResolveAssumptions: recovered and retry_count under 3
  RetryResolve --> TerminalError: unrecovered after retry budget

  GateOpenQuestions --> TerminalBlocked: decision-relevant open questions remain
  GateOpenQuestions --> DispatchAnnotator: no decision-relevant open questions

  DispatchAnnotator --> RetryReport: not REPORT_PASS
  DispatchAnnotator --> MapFinalStatus: REPORT_PASS
  RetryReport --> DispatchAnnotator: recovered and retry_count under 3
  RetryReport --> TerminalBlocked: report blocked after retry budget
  RetryReport --> TerminalError: report internal failure after retry budget

  MapFinalStatus --> TerminalPass: no critical findings and no unresolved hard gate and no decision-relevant open question
  MapFinalStatus --> TerminalFail: report written and critical finding remains
  MapFinalStatus --> TerminalBlocked: hard gate or decision-relevant question unresolved
  MapFinalStatus --> TerminalError: unrecovered internal failure remains

  TerminalPass --> [*]
  TerminalFail --> [*]
  TerminalBlocked --> [*]
  TerminalError --> [*]
```

## Canonical rules

- Load `state-machine.md` with this diagram before the first dispatch.
- Retry: re-dispatch only the failed branch; max three cycles; same trust limits.
- Optional evidence may degrade to an evidence gap when core audit remains viable.
- Annotator success label is `REPORT: PASS`; orchestrator alone maps final `AUDIT:*`.
- Write only `SNAPSHOT_PATH` and `OUTPUT_PATH`; never overwrite `PLAN_PATH`.
