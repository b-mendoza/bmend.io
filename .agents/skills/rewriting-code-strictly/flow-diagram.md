# Rewriting Code Strictly Flow

Finite-state execution model for `rewriting-code-strictly`. Companion transition table: [`state-machine.md`](./state-machine.md). The orchestrator loads personality, derives `MUTATION_LIMITS`, dispatches one subagent at a time, and mutates only after strategy gates and any required expansion approval succeed.

```mermaid
stateDiagram-v2
  [*] --> Intake

  Intake --> GateTarget: inputs normalized personality loaded
  GateTarget --> AskTarget: TARGET_CODE missing
  GateTarget --> GateLanguage: TARGET_CODE present
  AskTarget --> GateTarget: answered interactive
  AskTarget --> TerminalNeedsClarification: unattended or unanswered

  GateLanguage --> AskLanguage: language unclear
  GateLanguage --> GateScope: language clear or inferable
  AskLanguage --> GateLanguage: answered interactive
  AskLanguage --> TerminalNeedsClarification: unattended or unanswered

  GateScope --> AskScope: scope unsafe to dispatch
  GateScope --> DeriveLimits: scope safe enough
  AskScope --> GateScope: answered interactive
  AskScope --> TerminalNeedsClarification: unattended or unanswered

  DeriveLimits --> DispatchBaseline: MUTATION_LIMITS derived

  DispatchBaseline --> RouteBaseline: STRICT_BASELINE returned
  RouteBaseline --> DispatchStrategy: PASS
  RouteBaseline --> DispatchStrategy: NO_CHANGE_CANDIDATE recorded
  RouteBaseline --> AskBaseline: NEEDS_CLARIFICATION
  RouteBaseline --> TerminalError: ERROR
  AskBaseline --> DispatchBaseline: answered interactive
  AskBaseline --> TerminalNeedsClarification: unattended or unanswered

  DispatchStrategy --> RouteStrategy: STRICT_STRATEGY returned
  RouteStrategy --> CheckGates: PASS
  RouteStrategy --> TerminalNoChange: NO_CHANGE
  RouteStrategy --> AskStrategy: NEEDS_CLARIFICATION
  RouteStrategy --> TerminalError: ERROR
  AskStrategy --> DispatchStrategy: answered interactive
  AskStrategy --> TerminalNeedsClarification: unattended or unanswered

  CheckGates --> GateExpansion: G_STRICT_STRATEGY_APPROVAL and G_MUTATION_SCOPE pass
  CheckGates --> AskStrategy: gates fail missing decision
  CheckGates --> TerminalBlocked: gates fail unsafe plan

  GateExpansion --> DispatchImplement: no expansion required
  GateExpansion --> AskApproval: dependency API behavior scope fetch or validation authority expansion

  AskApproval --> DispatchImplement: user approved expansion
  AskApproval --> TerminalBlocked: user declined expansion
  AskApproval --> TerminalNeedsClarification: unattended or unanswered

  DispatchImplement --> RouteImplement: STRICT_IMPLEMENTATION returned
  RouteImplement --> DispatchReview: PASS or PASS_WITH_WARNINGS
  RouteImplement --> TerminalBlocked: BLOCKED
  RouteImplement --> TerminalError: ERROR

  DispatchReview --> RouteReview: STRICT_REVIEW returned
  RouteReview --> Handoff: PASS
  RouteReview --> GateFixable: FAIL
  RouteReview --> TerminalError: ERROR

  GateFixable --> GateFixCycles: actionable targeted fixes
  GateFixable --> TerminalBlocked: no actionable fixes
  GateFixCycles --> DispatchImplement: repair_counter under 2
  GateFixCycles --> TerminalBlocked: repair_counter at 2

  Handoff --> TerminalPass: G_FINAL_HANDOFF_EVIDENCE included

  TerminalPass --> [*]
  TerminalNoChange --> [*]
  TerminalNeedsClarification --> [*]
  TerminalBlocked --> [*]
  TerminalError --> [*]
```

## Invariants

- Baseline `NO_CHANGE_CANDIDATE` continues to Strategy; only strategist `NO_CHANGE` reaches `TerminalNoChange` before edits.
- Approval is a gate, not a sink: approved expansion resumes `DispatchImplement`; decline → `TerminalBlocked`; no reply → `TerminalNeedsClarification`.
- Clarification Ask* states resume the prior gate when answered; they do not permanently terminate an interactive run.
- Reviewer `FAIL` re-enters `DispatchImplement` with `REVIEW_FIXES` only, at most two cycles, then `TerminalBlocked`.
- `PASS` requires personality loaded, `MUTATION_LIMITS` derived, mid-pipeline gates checked, and `G_FINAL_HANDOFF_EVIDENCE` in the handoff.
