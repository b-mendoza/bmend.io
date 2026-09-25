# State Machine — planning-codebase-restructuring

Finite-state execution model for this skill. Mermaid source of truth: [`flow-diagram.md`](./flow-diagram.md). This table is the authoritative list of states, transitions, guards, and terminals.

`SKILL.md` must use the same state names, guards, and terminal decisions.

## States

| State | Kind | Role |
| --- | --- | --- |
| `ResumeCheck` | active | Detect optional `RESUME_PACKET` |
| `ResumeValidate` | active | Re-validate retained summaries; restore counters and notes |
| `Preflight` | active | Normalize inputs; init counters; resolve paths; disclose clone |
| `ReferenceGate` | active | Decide skip vs assess for `REFERENCE_URL` |
| `ReferenceAssess` | active | Dispatch `reference-assessor` |
| `ReferenceContract` | active | Validate reference `PASS` summary contract |
| `ReferenceRepair` | active | One contract re-dispatch for a `PASS` summary that failed contract |
| `QuarantineHold` | active | Hold validated reference in orchestrator context only |
| `ArchitectureMap` | active | Dispatch `architecture-cartographer` (no reference material) |
| `MapContract` | active | Validate architecture-map summary contract |
| `MapRepair` | active | One contract re-dispatch for map summary |
| `DomainAnalysis` | active | Dispatch `domain-analyst` (no reference material) |
| `DomainContract` | active | Validate domain-analysis summary contract |
| `DomainRepair` | active | One contract re-dispatch for domain summary |
| `EvidencePrecedence` | active | Authorize, limit, or mark not-applicable for reference patterns |
| `RestructuringPlan` | active | Dispatch `restructuring-strategist` |
| `PlanContract` | active | Validate restructuring-plan summary contract |
| `PlanRepair` | active | One contract re-dispatch for plan summary |
| `CandidateReport` | active | Synthesize candidate report from validated summaries only |
| `PlanReview` | active | Dispatch `plan-reviewer` |
| `ReviewRepair` | active | Targeted repair after `PLAN_REVIEW: FAIL` within budget |
| `Finalize` | active | Write reviewed report to `ARTIFACT_PATH` |
| `TerminalReady` | terminal | Decision: `READY` |
| `TerminalNeedsInput` | terminal | Decision: `NEEDS_INPUT` (+ `RESUME_PACKET`) |
| `TerminalBlocked` | terminal | Decision: `BLOCKED` |
| `TerminalError` | terminal | Decision: `ERROR` |

## Counters and named guards

| Name | Rule |
| --- | --- |
| `review_repair_count` | Starts at `0`. On each `PLAN_REVIEW: FAIL`, increment by 1, then if `review_repair_count > 2` enter `TerminalBlocked`; otherwise enter `ReviewRepair`. Allows at most two FAIL→repair cycles (counts `1` and `2`). |
| `per_phase_contract_repair` | Each required phase may re-dispatch once for summary-contract failure on a `PASS` summary; second contract failure → `TerminalBlocked`. |
| Reference accessibility | Inaccessible, unparseable, unverifiable, or unfetchable reference → `BLOCKED` from `ReferenceAssess`, never `PASS`, and never enters `ReferenceRepair`. |
| Optional reference degrade | When `REFERENCE_REQUIRED=false`, reference `BLOCKED`/`ERROR` or exhausted optional contract failure → continue at `ArchitectureMap` with a recorded limitation. |
| Required reference stop | When `REFERENCE_REQUIRED=true`, those failures → `TerminalBlocked` or `TerminalError`. |
| Resume | Valid packet restores state and continues at `phase_reached` (named next active state). Invalid packet → discard and enter `Preflight`. |

## Transitions

| From | To | Guard / event |
| --- | --- | --- |
| `[*]` | `ResumeCheck` | run start |
| `ResumeCheck` | `ResumeValidate` | `RESUME_PACKET` supplied |
| `ResumeCheck` | `Preflight` | no packet |
| `ResumeValidate` | _(restored active state)_ | packet valid; jump to `phase_reached` (Mermaid cannot enumerate dynamic targets; this table is authoritative) |
| `ResumeValidate` | `Preflight` | packet malformed or retained summary fails contract |
| `Preflight` | `TerminalNeedsInput` | required inputs missing and not safely inferable |
| `Preflight` | `ReferenceGate` | preflight summary stated; inputs ready |
| `ReferenceGate` | `ArchitectureMap` | no `REFERENCE_URL` (orchestrator records `REFERENCE_ASSESSMENT: SKIPPED`) |
| `ReferenceGate` | `ReferenceAssess` | `REFERENCE_URL` present |
| `ReferenceAssess` | `ReferenceContract` | `REFERENCE_ASSESSMENT: PASS` |
| `ReferenceAssess` | `TerminalNeedsInput` | `NEEDS_INPUT` |
| `ReferenceAssess` | `ArchitectureMap` | `BLOCKED` or `ERROR` and `REFERENCE_REQUIRED=false` |
| `ReferenceAssess` | `TerminalBlocked` | accessibility/`BLOCKED` and `REFERENCE_REQUIRED=true` |
| `ReferenceAssess` | `TerminalError` | `ERROR` and `REFERENCE_REQUIRED=true` |
| `ReferenceContract` | `QuarantineHold` | summary contract pass |
| `ReferenceContract` | `ReferenceRepair` | contract fail and phase repair unused |
| `ReferenceContract` | `ArchitectureMap` | contract repair exhausted and `REFERENCE_REQUIRED=false` |
| `ReferenceContract` | `TerminalBlocked` | contract repair exhausted and `REFERENCE_REQUIRED=true` |
| `ReferenceRepair` | `ReferenceAssess` | re-dispatch with `REPAIR_FINDINGS` |
| `QuarantineHold` | `ArchitectureMap` | reference held; not passed to map/domain |
| `ArchitectureMap` | `MapContract` | `ARCHITECTURE_MAP: PASS` |
| `ArchitectureMap` | `TerminalNeedsInput` | `NEEDS_INPUT` |
| `ArchitectureMap` | `TerminalBlocked` | `BLOCKED` |
| `ArchitectureMap` | `TerminalError` | `ERROR` |
| `MapContract` | `DomainAnalysis` | contract pass |
| `MapContract` | `MapRepair` | contract fail and phase repair unused |
| `MapContract` | `TerminalBlocked` | contract repair exhausted |
| `MapRepair` | `ArchitectureMap` | re-dispatch with `REPAIR_FINDINGS` |
| `DomainAnalysis` | `DomainContract` | `DOMAIN_ANALYSIS: PASS` |
| `DomainAnalysis` | `TerminalNeedsInput` | `NEEDS_INPUT` |
| `DomainAnalysis` | `TerminalBlocked` | `BLOCKED` |
| `DomainAnalysis` | `TerminalError` | `ERROR` |
| `DomainContract` | `EvidencePrecedence` | contract pass |
| `DomainContract` | `DomainRepair` | contract fail and phase repair unused |
| `DomainContract` | `TerminalBlocked` | contract repair exhausted |
| `DomainRepair` | `DomainAnalysis` | re-dispatch with `REPAIR_FINDINGS` |
| `EvidencePrecedence` | `RestructuringPlan` | decision recorded (`not-applicable`, `reference-authorized`, or `limitations-only`) |
| `RestructuringPlan` | `PlanContract` | `RESTRUCTURING_PLAN: PASS` |
| `RestructuringPlan` | `TerminalNeedsInput` | `NEEDS_INPUT` |
| `RestructuringPlan` | `TerminalBlocked` | `BLOCKED` |
| `RestructuringPlan` | `TerminalError` | `ERROR` |
| `PlanContract` | `CandidateReport` | contract pass |
| `PlanContract` | `PlanRepair` | contract fail and phase repair unused |
| `PlanContract` | `TerminalBlocked` | contract repair exhausted |
| `PlanRepair` | `RestructuringPlan` | re-dispatch with `REPAIR_FINDINGS` |
| `CandidateReport` | `PlanReview` | candidate synthesized |
| `PlanReview` | `Finalize` | `PLAN_REVIEW: PASS` |
| `PlanReview` | `ReviewRepair` | `FAIL` and after increment `review_repair_count <= 2` |
| `PlanReview` | `TerminalBlocked` | `FAIL` and after increment `review_repair_count > 2` |
| `PlanReview` | `TerminalBlocked` | `BLOCKED` |
| `PlanReview` | `TerminalError` | `ERROR` |
| `ReviewRepair` | `CandidateReport` | subagent summary repaired and contract-valid (re-synthesize) |
| `ReviewRepair` | `PlanReview` | named candidate-report section revised from validated summaries |
| `ReviewRepair` | `TerminalNeedsInput` | repair owner returns `NEEDS_INPUT` |
| `ReviewRepair` | `TerminalBlocked` | repair owner `BLOCKED` or repaired summary still fails contract |
| `ReviewRepair` | `TerminalError` | repair owner `ERROR` |
| `Finalize` | `TerminalReady` | report written to `ARTIFACT_PATH` |
| `TerminalReady` | `[*]` | emit compact chat summary |
| `TerminalNeedsInput` | `[*]` | emit stopping payload + `RESUME_PACKET` |
| `TerminalBlocked` | `[*]` | emit stopping payload |
| `TerminalError` | `[*]` | emit stopping payload |

## Terminal decisions

Exactly one of: `READY`, `NEEDS_INPUT`, `BLOCKED`, `ERROR`.

## Reachability and dead-state checks

| Property | Result |
| --- | --- |
| Every active state reachable from `ResumeCheck` | yes |
| Every terminal reachable | yes |
| Dead states (no outgoing, non-terminal) | none |
| Review repair loop bounded | yes — `review_repair_count > 2` after increment |
| Per-phase contract repair bounded | yes — one re-dispatch per phase |
| Reference accessibility never uses `ReferenceRepair` | yes |
