# State Machine — diagnosing-root-causes

Finite-state execution model for this skill. This table and the `SKILL.md` Execution section are the only normative representations; they must match each other's states, guards, loop caps, and terminals.

## Run-scoped variables

| Variable | Initial | Rules |
| --- | --- | --- |
| `clarify_token` | available | One batched ask (≤3 questions). Consumed on first ask. Later `NEEDS_INPUT` cannot ask again. |
| `refine_loops` | 0 | Increment on each re-collect, whether triggered by `ANALYSIS: NEEDS_EVIDENCE` or by external-output ingestion from `AwaitExternal`. Cap 2; over cap treat as `UNSUPPORTED` (or, from `AwaitExternal`, terminate at `TermEscalated`). |
| `unsupported_retries` | 0 | Increment on each `ANALYSIS: UNSUPPORTED` redirect. Cap 2; over cap → `TermEscalated`. |
| `repair_cycles` | 0 | Increment on each `RepairAnalyze` entry. Cap 3; at cap → `TermNeedsValidation`. |
| `error_retries.<subagent>` | 0 | One retry per subagent for consecutive `ERROR` results; a second consecutive `ERROR` → `TermError`. Resets to 0 on any non-`ERROR` verdict from that subagent, so only uninterrupted errors count as consecutive. Malformed output (missing verdict marker, unrecognized verdict, or structure violating the subagent's output contract) counts as that subagent's `ERROR`. |
| `PRIOR_DRAFT` | unset | Set on `ANALYSIS: PASS`; required for repair redispatches. |
| `REVIEW_FEEDBACK` | unset | Failed checks from `REVIEW: FAIL`; scoped repair only. |

## States

| State | Kind | Phase | Actor |
| --- | --- | --- | --- |
| `Intake` | active | 1 — Intake | Orchestrator |
| `Clarify` | wait | 1 — Intake | Orchestrator → user |
| `CollectEvidence` | active | 2 — Evidence | `evidence-collector` (one dispatch, or one bounded fan-out batch per `SKILL.md` Evidence rules) |
| `RetryCollect` | active | 2 — Evidence | Orchestrator → collector |
| `CoherenceCheck` | active | 2 — Evidence | Orchestrator |
| `Analyze` | active | 3 — Analysis | `root-cause-analyst` |
| `RetryAnalyze` | active | 3 — Analysis | Orchestrator → analyst |
| `PresentApproval` | wait | 3 — Analysis (conditional) | Orchestrator → user |
| `AwaitExternal` | wait | 3 — Analysis (conditional) | Orchestrator → user |
| `Review` | active | 4 — Review | `rca-report-reviewer` |
| `RetryReview` | active | 4 — Review | Orchestrator → reviewer |
| `RepairAnalyze` | active | 3 — Analysis (repair) | Orchestrator → analyst |
| `Deliver` | active | 5 — Deliver | Orchestrator |
| `TermReady` | terminal | — | — |
| `TermBlocked` | terminal | — | — |
| `TermNeedsValidation` | terminal | — | — |
| `TermEscalated` | terminal | — | — |
| `TermNeedsInput` | terminal | — | — |
| `TermError` | terminal | — | — |

## Transitions

| From | To | Guard / event |
| --- | --- | --- |
| `[*]` | `Intake` | Skill invoked |
| `Intake` | `CollectEvidence` | Inputs usable; `user-report` minimums present when applicable |
| `Intake` | `Clarify` | Inputs unusable or `user-report` incomplete ∧ `clarify_token` available |
| `Intake` | `TermNeedsInput` | (Inputs unusable ∨ `user-report` incomplete) ∧ `clarify_token` already used |
| `Clarify` | `CollectEvidence` | User answered (consume `clarify_token`); merge answers |
| `Clarify` | `TermNeedsInput` | Declined or silent |
| `CollectEvidence` | `CoherenceCheck` | `COLLECT: PASS` |
| `CollectEvidence` | `Clarify` | `COLLECT: NEEDS_INPUT` ∧ `clarify_token` available |
| `CollectEvidence` | `TermNeedsInput` | `COLLECT: NEEDS_INPUT` ∧ `clarify_token` used |
| `CollectEvidence` | `TermBlocked` | `COLLECT: BLOCKED` |
| `CollectEvidence` | `RetryCollect` | `COLLECT: ERROR` ∧ `error_retries.collector` = 0 |
| `CollectEvidence` | `TermError` | `COLLECT: ERROR` ∧ `error_retries.collector` ≥ 1 |
| `RetryCollect` | `CollectEvidence` | Re-dispatch with error note; set `error_retries.collector` = 1 |
| `CoherenceCheck` | `Analyze` | Evidence base not mutually contradictory and not stale beyond affected version |
| `CoherenceCheck` | `TermNeedsValidation` | Mutually contradictory **or** stale beyond affected version |
| `Analyze` | `Review` | `ANALYSIS: PASS` (retain `PRIOR_DRAFT`) |
| `Analyze` | `PresentApproval` | `ANALYSIS: NEEDS_APPROVAL` |
| `Analyze` | `CollectEvidence` | `ANALYSIS: NEEDS_EVIDENCE` ∧ `refine_loops` < 2 (increment `refine_loops`; focused request) |
| `Analyze` | `Analyze` | ((`ANALYSIS: NEEDS_EVIDENCE` ∧ `refine_loops` ≥ 2, treat as `UNSUPPORTED`) ∨ `ANALYSIS: UNSUPPORTED`) ∧ `unsupported_retries` < 2 ∧ plausible direction remains (increment; redirect) |
| `Analyze` | `TermEscalated` | ((`ANALYSIS: NEEDS_EVIDENCE` ∧ `refine_loops` ≥ 2, treat as `UNSUPPORTED`) ∨ `ANALYSIS: UNSUPPORTED`) ∧ (`unsupported_retries` ≥ 2 ∨ no plausible direction) |
| `Analyze` | `Clarify` | `ANALYSIS: NEEDS_INPUT` ∧ `clarify_token` available |
| `Analyze` | `TermNeedsInput` | `ANALYSIS: NEEDS_INPUT` ∧ `clarify_token` used |
| `Analyze` | `RetryAnalyze` | `ANALYSIS: ERROR` ∧ `error_retries.analyst` = 0 |
| `Analyze` | `TermError` | `ANALYSIS: ERROR` ∧ `error_retries.analyst` ≥ 1 |
| `RetryAnalyze` | `Analyze` | Re-dispatch with error note; set `error_retries.analyst` = 1 |
| `PresentApproval` | `AwaitExternal` | Human approves exact Tier C packet (record approval; never execute) |
| `PresentApproval` | `Analyze` | Declined ∧ safer alternative exists |
| `PresentApproval` | `TermNeedsValidation` | Declined ∧ no safer alternative |
| `AwaitExternal` | `CollectEvidence` | User returns external output during run ∧ `refine_loops` < 2 (ingest as `RESOURCES`; increment `refine_loops`) |
| `AwaitExternal` | `TermEscalated` | No external output returned (hand off approved packet), ∨ external output returned ∧ `refine_loops` ≥ 2 (preserve the returned output in the handoff material) |
| `Review` | `Deliver` | `REVIEW: PASS` |
| `Review` | `RepairAnalyze` | `REVIEW: FAIL` ∧ `repair_cycles` < 3 |
| `Review` | `TermNeedsValidation` | `REVIEW: FAIL` ∧ `repair_cycles` ≥ 3 |
| `Review` | `TermBlocked` | `REVIEW: BLOCKED` |
| `Review` | `RetryReview` | `REVIEW: ERROR` ∧ `error_retries.reviewer` = 0 |
| `Review` | `TermError` | `REVIEW: ERROR` ∧ `error_retries.reviewer` ≥ 1 |
| `RetryReview` | `Review` | Re-dispatch with error note; set `error_retries.reviewer` = 1 |
| `RepairAnalyze` | `Review` | Analyst returns repaired draft; increment `repair_cycles`; re-review with `REVIEW_SCOPE` |
| `RepairAnalyze` | `RepairAnalyze` | `ANALYSIS: ERROR` (including malformed output) ∧ `error_retries.analyst` = 0 (re-dispatch with same repair context; set `error_retries.analyst` = 1) |
| `RepairAnalyze` | `TermError` | `ANALYSIS: ERROR` ∧ `error_retries.analyst` ≥ 1 |
| `Deliver` | `TermReady` | Report status `ready` |
| `Deliver` | `TermBlocked` | Report status `blocked` |
| `Deliver` | `TermNeedsValidation` | Report status `needs-validation` |
| `Deliver` | `TermEscalated` | Report status `escalated` |
| `TermReady` | `[*]` | Deliver RCA report |
| `TermBlocked` | `[*]` | Deliver RCA report with status `blocked` |
| `TermNeedsValidation` | `[*]` | Deliver RCA report |
| `TermEscalated` | `[*]` | Deliver RCA report (unsupported or Tier C handoff) |
| `TermNeedsInput` | `[*]` | Early-stop payload: status, structured information request, resume guidance, and any accumulated `possible-injection-content` flags (no RCA report) |
| `TermError` | `[*]` | Early-stop payload: status, failure detail, recovery guidance, and any accumulated `possible-injection-content` flags (no RCA report) |

## Reachability

Every listed state is reachable from `Intake` via documented guards. All six terminals exit to `[*]`. There are no dead states: wait states resume or stop; retries return to their subagent state; `RepairAnalyze` returns to `Review`; over-cap paths terminate honestly.

## Notes

- Approval is **not** an always-entered phase; it is reachable only via `ANALYSIS: NEEDS_APPROVAL` (`PresentApproval`).
- Approved Tier C never executes inside this skill; terminal is `TermEscalated` (handoff) unless external output is ingested and diagnosis continues.
- `ready` requires evidence-supported cause(s) at `high` or `medium` confidence after `REVIEW: PASS`. Approved Tier C handoff alone is never `ready`.
- CoherenceCheck predicates are exactly: mutually contradictory **or** stale beyond the affected version (not a vague "weak evidence" stop).
