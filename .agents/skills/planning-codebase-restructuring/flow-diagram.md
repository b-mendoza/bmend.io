# Planning Codebase Restructuring Flow

Control-flow source of truth for this orchestrator. The high-level execution model is a finite-state machine (`stateDiagram-v2`). The companion transition table is [`state-machine.md`](./state-machine.md).

`SKILL.md` must use the same state names, guards, counters, and terminals. Numeric thresholds live in `state-machine.md` and are restated in `SKILL.md` Execution; this diagram does not invent a second budget.

```mermaid
stateDiagram-v2
  [*] --> ResumeCheck

  ResumeCheck --> ResumeValidate: RESUME_PACKET supplied
  ResumeCheck --> Preflight: no packet

  ResumeValidate --> Preflight: packet invalid
  note right of ResumeValidate
    Valid packet: table-authoritative jump
    to phase_reached active state
  end note

  Preflight --> TerminalNeedsInput: required inputs missing
  Preflight --> ReferenceGate: preflight ready

  ReferenceGate --> ArchitectureMap: no REFERENCE_URL SKIPPED
  ReferenceGate --> ReferenceAssess: REFERENCE_URL present

  ReferenceAssess --> ReferenceContract: PASS
  ReferenceAssess --> TerminalNeedsInput: NEEDS_INPUT
  ReferenceAssess --> ArchitectureMap: BLOCKED or ERROR and not required
  ReferenceAssess --> TerminalBlocked: BLOCKED and required
  ReferenceAssess --> TerminalError: ERROR and required

  ReferenceContract --> QuarantineHold: contract pass
  ReferenceContract --> ReferenceRepair: contract fail repair available
  ReferenceContract --> ArchitectureMap: repair exhausted and not required
  ReferenceContract --> TerminalBlocked: repair exhausted and required
  ReferenceRepair --> ReferenceAssess: re-dispatch REPAIR_FINDINGS

  QuarantineHold --> ArchitectureMap: hold only never pass to map or domain

  ArchitectureMap --> MapContract: PASS
  ArchitectureMap --> TerminalNeedsInput: NEEDS_INPUT
  ArchitectureMap --> TerminalBlocked: BLOCKED
  ArchitectureMap --> TerminalError: ERROR
  MapContract --> DomainAnalysis: contract pass
  MapContract --> MapRepair: contract fail repair available
  MapContract --> TerminalBlocked: repair exhausted
  MapRepair --> ArchitectureMap: re-dispatch

  DomainAnalysis --> DomainContract: PASS
  DomainAnalysis --> TerminalNeedsInput: NEEDS_INPUT
  DomainAnalysis --> TerminalBlocked: BLOCKED
  DomainAnalysis --> TerminalError: ERROR
  DomainContract --> EvidencePrecedence: contract pass
  DomainContract --> DomainRepair: contract fail repair available
  DomainContract --> TerminalBlocked: repair exhausted
  DomainRepair --> DomainAnalysis: re-dispatch

  EvidencePrecedence --> RestructuringPlan: decision recorded

  RestructuringPlan --> PlanContract: PASS
  RestructuringPlan --> TerminalNeedsInput: NEEDS_INPUT
  RestructuringPlan --> TerminalBlocked: BLOCKED
  RestructuringPlan --> TerminalError: ERROR
  PlanContract --> CandidateReport: contract pass
  PlanContract --> PlanRepair: contract fail repair available
  PlanContract --> TerminalBlocked: repair exhausted
  PlanRepair --> RestructuringPlan: re-dispatch

  CandidateReport --> PlanReview: candidate ready

  PlanReview --> Finalize: PASS
  PlanReview --> ReviewRepair: FAIL and count after increment <= 2
  PlanReview --> TerminalBlocked: FAIL and count after increment > 2
  PlanReview --> TerminalBlocked: BLOCKED
  PlanReview --> TerminalError: ERROR

  ReviewRepair --> CandidateReport: subagent repaired
  ReviewRepair --> PlanReview: report section revised
  ReviewRepair --> TerminalNeedsInput: repair NEEDS_INPUT
  ReviewRepair --> TerminalBlocked: repair BLOCKED or contract fail
  ReviewRepair --> TerminalError: repair ERROR

  Finalize --> TerminalReady: report written

  TerminalReady --> [*]
  TerminalNeedsInput --> [*]
  TerminalBlocked --> [*]
  TerminalError --> [*]
```

## Canonical Rules

- Quarantine: validated reference summaries never reach `ArchitectureMap` or `DomainAnalysis`.
- Accessibility vs contract: unfetchable references leave `ReferenceAssess` as `BLOCKED` and never enter `ReferenceRepair`.
- Resume: continue at `phase_reached`, not a hardwired early gate.
- Review budget: increment `review_repair_count` on each `FAIL`; block when the count exceeds 2 (at most two repair cycles).
- Every `NEEDS_INPUT` stop emits a `RESUME_PACKET`.
