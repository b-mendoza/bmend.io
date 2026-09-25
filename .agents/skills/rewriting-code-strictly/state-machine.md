# State Machine — rewriting-code-strictly

Finite-state execution model for this skill. Mermaid SoT: [`flow-diagram.md`](./flow-diagram.md). This table is the authoritative list of states, transitions, guards, and terminals.

## States

| State | Kind | Role |
| --- | --- | --- |
| `Intake` | active | Normalize inputs; load personality |
| `GateTarget` | active | Require `TARGET_CODE` |
| `AskTarget` | active | One target question; interactive wait |
| `GateLanguage` | active | Language clear or inferable |
| `AskLanguage` | active | One language question |
| `GateScope` | active | Scope safe enough to dispatch |
| `AskScope` | active | One scope question |
| `DeriveLimits` | active | Derive `MUTATION_LIMITS` |
| `DispatchBaseline` | active | Dispatch `strict-baseline-mapper` |
| `RouteBaseline` | active | Route on `STRICT_BASELINE` |
| `AskBaseline` | active | One baseline clarification |
| `DispatchStrategy` | active | Dispatch `strict-rewrite-strategist` |
| `RouteStrategy` | active | Route on `STRICT_STRATEGY` |
| `AskStrategy` | active | One strategy clarification |
| `CheckGates` | active | `G_STRICT_STRATEGY_APPROVAL` and `G_MUTATION_SCOPE` |
| `GateExpansion` | active | Detect dependency/API/behavior/scope/fetch/validation expansion |
| `AskApproval` | active | One expansion-approval question |
| `DispatchImplement` | active | Dispatch `strict-rewrite-implementer` |
| `RouteImplement` | active | Route on `STRICT_IMPLEMENTATION` |
| `DispatchReview` | active | Dispatch `strict-rewrite-reviewer` |
| `RouteReview` | active | Route on `STRICT_REVIEW` |
| `GateFixable` | active | Reviewer supplied actionable fixes? |
| `GateFixCycles` | active | `repair_counter` under 2? |
| `Handoff` | active | Build user-visible output contract |
| `TerminalPass` | terminal | Success handoff with gate evidence |
| `TerminalNoChange` | terminal | Strategist justified no rewrite |
| `TerminalNeedsClarification` | terminal | Unattended/unanswered clarification or approval |
| `TerminalBlocked` | terminal | Unsafe plan, declined expansion, implement block, or exhausted repair |
| `TerminalError` | terminal | Unexpected failure |

## Transitions

| From | To | Guard / event |
| --- | --- | --- |
| `[*]` | `Intake` | run start |
| `Intake` | `GateTarget` | inputs normalized; personality loaded |
| `GateTarget` | `AskTarget` | `TARGET_CODE` missing |
| `GateTarget` | `GateLanguage` | `TARGET_CODE` present |
| `AskTarget` | `GateTarget` | answered interactive |
| `AskTarget` | `TerminalNeedsClarification` | unattended or unanswered |
| `GateLanguage` | `AskLanguage` | language unclear |
| `GateLanguage` | `GateScope` | language clear or inferable |
| `AskLanguage` | `GateLanguage` | answered interactive |
| `AskLanguage` | `TerminalNeedsClarification` | unattended or unanswered |
| `GateScope` | `AskScope` | scope unsafe to dispatch |
| `GateScope` | `DeriveLimits` | scope safe enough |
| `AskScope` | `GateScope` | answered interactive |
| `AskScope` | `TerminalNeedsClarification` | unattended or unanswered |
| `DeriveLimits` | `DispatchBaseline` | `MUTATION_LIMITS` derived |
| `DispatchBaseline` | `RouteBaseline` | `STRICT_BASELINE` returned |
| `RouteBaseline` | `DispatchStrategy` | `PASS` |
| `RouteBaseline` | `DispatchStrategy` | `NO_CHANGE_CANDIDATE` recorded (does **not** stop) |
| `RouteBaseline` | `AskBaseline` | `NEEDS_CLARIFICATION` |
| `RouteBaseline` | `TerminalError` | `ERROR` |
| `AskBaseline` | `DispatchBaseline` | answered interactive |
| `AskBaseline` | `TerminalNeedsClarification` | unattended or unanswered |
| `DispatchStrategy` | `RouteStrategy` | `STRICT_STRATEGY` returned |
| `RouteStrategy` | `CheckGates` | `PASS` |
| `RouteStrategy` | `TerminalNoChange` | `NO_CHANGE` |
| `RouteStrategy` | `AskStrategy` | `NEEDS_CLARIFICATION` |
| `RouteStrategy` | `TerminalError` | `ERROR` |
| `AskStrategy` | `DispatchStrategy` | answered interactive |
| `AskStrategy` | `TerminalNeedsClarification` | unattended or unanswered |
| `CheckGates` | `GateExpansion` | both strategy gates pass |
| `CheckGates` | `AskStrategy` | gates fail on missing decision |
| `CheckGates` | `TerminalBlocked` | gates fail on unsafe plan |
| `GateExpansion` | `DispatchImplement` | no expansion required |
| `GateExpansion` | `AskApproval` | expansion required |
| `AskApproval` | `DispatchImplement` | user approved expansion |
| `AskApproval` | `TerminalBlocked` | user declined expansion |
| `AskApproval` | `TerminalNeedsClarification` | unattended or unanswered |
| `DispatchImplement` | `RouteImplement` | `STRICT_IMPLEMENTATION` returned |
| `RouteImplement` | `DispatchReview` | `PASS` or `PASS_WITH_WARNINGS` |
| `RouteImplement` | `TerminalBlocked` | `BLOCKED` |
| `RouteImplement` | `TerminalError` | `ERROR` |
| `DispatchReview` | `RouteReview` | `STRICT_REVIEW` returned |
| `RouteReview` | `Handoff` | `PASS` |
| `RouteReview` | `GateFixable` | `FAIL` |
| `RouteReview` | `TerminalError` | `ERROR` |
| `GateFixable` | `GateFixCycles` | actionable targeted fixes |
| `GateFixable` | `TerminalBlocked` | no actionable fixes |
| `GateFixCycles` | `DispatchImplement` | `repair_counter` under 2 |
| `GateFixCycles` | `TerminalBlocked` | `repair_counter` at 2 |
| `Handoff` | `TerminalPass` | `G_FINAL_HANDOFF_EVIDENCE` included |
| `TerminalPass` | `[*]` | emit handoff |
| `TerminalNoChange` | `[*]` | emit handoff |
| `TerminalNeedsClarification` | `[*]` | emit handoff |
| `TerminalBlocked` | `[*]` | emit handoff |
| `TerminalError` | `[*]` | emit handoff |

## Terminal decisions

Exactly one of: `PASS`, `NO_CHANGE`, `NEEDS_CLARIFICATION`, `BLOCKED`, `ERROR`.

## Reachability and dead-state checks

| Property | Result |
| --- | --- |
| Every active state reachable from `Intake` | yes |
| Every terminal reachable | yes |
| Dead states (no outgoing, non-terminal) | none |
| Approval resume path | yes — `AskApproval` → `DispatchImplement` on approve |
| Clarification resume path | yes — Ask* → prior gate/dispatch when answered |
| Repair loop bounded | yes — max 2 via `repair_counter` before `TerminalBlocked` |
| `NO_CHANGE_CANDIDATE` does not terminal-stop | yes — continues to `DispatchStrategy` |
