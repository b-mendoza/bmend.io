# State Machine — recency-guard

Finite-state execution model for this skill. Mermaid SoT: [`flow-diagram.md`](./flow-diagram.md). This table is the authoritative list of states, transitions, guards, and terminals.

Canonical dispatch-budget numbers live only in [`references/repair-and-integration.md`](./references/repair-and-integration.md).

## States

| State | Kind | Role |
| --- | --- | --- |
| `ScopeTriage` | active | Collect inputs; default `TODAYS_DATE`; classify request; probe verification tools |
| `DraftLedger` | active | Inspect or draft answer; build claim ledger |
| `NoToolsQualify` | active | Remove or label time-sensitive claims; mark rows `unverifiable` |
| `RecencyAudit` | active | Dispatch `recency-checker`; conformance gate; status routing; budgeted FAIL reruns |
| `ClaimAudit` | active | Dispatch `claim-verifier`; conformance gate; status routing; budgeted FAIL reruns |
| `IntegrateEvidence` | active | Stricter overlap; tier conflicts; screen revisions; align wording to ledger |
| `CompletenessCheck` | active | Cover deliverables; detect new risky claims in final wording |
| `RevalidateClaim` | active | Single-claim revalidation with the relevant subagent when budget remains |
| `SelectOutcome` | active | Apply material-uncertainty then limited then ready tests |
| `TerminalOutOfScope` | terminal | High-impact action not performed |
| `TerminalReady` | terminal | `Ready final answer` |
| `TerminalLimited` | terminal | `Limited final answer` |
| `TerminalMaterial` | terminal | `Material uncertainty final` |

## Guards

| Guard | Operational definition |
| --- | --- |
| `request_class=action` | Entire request is a high-impact action (purchase, post, publish, send, deploy, delete/modify external systems, account/policy change, financial/legal/medical transaction) |
| `request_class=mixed` | Informational plus high-impact action; strip action, record routing limit, continue informational |
| `request_class=informational` | No high-impact action to perform |
| `ledger_empty` | Claim ledger has zero rows after extraction |
| `tools_unavailable` | Probe found no current-source search, browse, or docs access in the active runtime |
| `report_conforms` | Subagent report passes `G_REPORT_CONFORMANCE` |
| `error_retry_remains` | That subagent's non-consuming ERROR retry is still available |
| `status=PASS\|FAIL\|TOOLS_MISSING\|ERROR` | Exact status from the conforming report |
| `fail_budget_remains` | That subagent still has dispatch budget for a FAIL rerun |
| `claim_review_warranted` | After recency `TOOLS_MISSING` (or equivalent no-current-source handling), the ledger still has at least one `decision-shaping` or `both` row in `unreviewed` / open status that is not solely a time-sensitive fact already marked `unverifiable`. If false, mark remaining decision-shaping candidates that needed current sources `unverifiable` and skip `ClaimAudit` |
| `new_risky_claim` | Final wording introduces a time-sensitive or decision-shaping claim absent from the ledger |
| `reval_budget_remains` | Relevant subagent still has dispatch budget for single-claim revalidation |
| `material_uncertainty` | Any condition in the material-uncertainty table in `repair-and-integration.md` |
| `has_limits` | Any row is `qualified`, `unverifiable`, or `unreviewed`; any tool/freshness limit recorded; or mixed-request action routing was recorded |

## Transitions

| From | To | Guard / event |
| --- | --- | --- |
| `[*]` | `ScopeTriage` | run start |
| `ScopeTriage` | `TerminalOutOfScope` | `request_class=action` |
| `ScopeTriage` | `DraftLedger` | `request_class=informational` or `request_class=mixed` |
| `DraftLedger` | `SelectOutcome` | `ledger_empty` (record no-current-fact note) |
| `DraftLedger` | `NoToolsQualify` | ledger has rows and `tools_unavailable` |
| `DraftLedger` | `RecencyAudit` | ledger has rows and tools available |
| `NoToolsQualify` | `SelectOutcome` | time-sensitive rows handled; skip subagent pipeline |
| `RecencyAudit` | `RecencyAudit` | report non-conforming or `ERROR`, and `error_retry_remains` (retry with conformance reminder) |
| `RecencyAudit` | `SelectOutcome` | non-conforming/`ERROR` with no retry left: mark open rows `unverifiable` |
| `RecencyAudit` | `RecencyAudit` | `status=FAIL`, edits screened/applied, open flags remain, and `fail_budget_remains` |
| `RecencyAudit` | `SelectOutcome` | `status=FAIL` and budget exhausted: mark still-flagged rows `unverifiable` |
| `RecencyAudit` | `ClaimAudit` | `status=PASS`, or `status=FAIL` with no open flags, or `status=TOOLS_MISSING` and `claim_review_warranted` |
| `RecencyAudit` | `IntegrateEvidence` | `status=TOOLS_MISSING` and not `claim_review_warranted` (decision-shaping candidates marked `unverifiable` as needed) |
| `ClaimAudit` | `ClaimAudit` | report non-conforming or `ERROR`, and `error_retry_remains` |
| `ClaimAudit` | `SelectOutcome` | non-conforming/`ERROR` with no retry left: mark open rows `unverifiable` |
| `ClaimAudit` | `ClaimAudit` | `status=FAIL`, edits screened/applied, open flags remain, and `fail_budget_remains` |
| `ClaimAudit` | `SelectOutcome` | `status=FAIL` and budget exhausted: mark still-flagged rows `unverifiable` |
| `ClaimAudit` | `IntegrateEvidence` | `status=PASS` (unreviewed candidates recorded), or `status=FAIL` with no open flags, or `status=TOOLS_MISSING` |
| `IntegrateEvidence` | `CompletenessCheck` | evidence folded; wording aligned |
| `CompletenessCheck` | `RevalidateClaim` | `new_risky_claim` and `reval_budget_remains` |
| `CompletenessCheck` | `SelectOutcome` | `new_risky_claim` and not `reval_budget_remains` (mark new row `unverifiable`) |
| `CompletenessCheck` | `SelectOutcome` | no new risky claim (after any completeness wording fixes) |
| `RevalidateClaim` | `SelectOutcome` | single-claim result folded; never full pipeline replay |
| `SelectOutcome` | `TerminalMaterial` | `material_uncertainty` |
| `SelectOutcome` | `TerminalLimited` | not material, and `has_limits` |
| `SelectOutcome` | `TerminalReady` | not material, and not `has_limits` |
| `TerminalOutOfScope` | `[*]` | emit user-visible out-of-scope outcome |
| `TerminalReady` | `[*]` | emit ready final answer |
| `TerminalLimited` | `[*]` | emit limited final answer |
| `TerminalMaterial` | `[*]` | emit material uncertainty final |

## Terminal decisions

Exactly one user-visible outcome per run: `Out-of-scope route`, `Ready final answer`, `Limited final answer`, or `Material uncertainty final`.

## Reachability and dead-state checks

| Property | Result |
| --- | --- |
| Every active state reachable from `ScopeTriage` | yes |
| Every terminal reachable | yes |
| Dead states (no outgoing, non-terminal) | none |
| Recency/claim FAIL and ERROR loops bounded | yes — dispatch budget and one ERROR retry per subagent in `repair-and-integration.md` |
| `claim_review_warranted` replaces undefined "plausible" branch | yes — gap-002 |
