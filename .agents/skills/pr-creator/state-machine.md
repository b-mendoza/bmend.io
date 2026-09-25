# State Machine — pr-creator

Finite-state execution model for this skill. Mermaid SoT: [`flow-diagram.md`](./flow-diagram.md). This table is the authoritative list of states, transitions, guards, and terminals.

Six specialists stay separate: each owns a distinct status prefix and failure mode (topology, preflight/push, scope, draft, metadata, submit). That split is earned complexity, not decoration.

## States

| State | Kind | Role |
| --- | --- | --- |
| `ResolveMode` | active | Set `EXECUTION_MODE` to `dispatch` or `inline` |
| `NormalizeInputs` | active | Defaults and normalized user inputs |
| `InspectRepo` | active | Dispatch `repo-state-inspector` |
| `GateTopology` | active | Resolve ambiguous head/base remotes |
| `GateTargetBranch` | active | Ask `TARGET_BRANCH`; offer candidate, never auto-apply |
| `AdaptPlatform` | active | Load platform adaptation when needed |
| `GatePlatformTooling` | active | Ask platform or approved tooling |
| `GateStateFallback` | active | Draft unsupported → ready or stop |
| `RunPreflight` | active | Dispatch `preflight-validator` |
| `GatePush` | active | Approve plain push; never force-push |
| `GatePushRejected` | active | Stop or confirm manual resolution |
| `AnalyzeDiff` | active | Dispatch `diff-analyzer` |
| `GateScope` | active | Large/mixed PR confirmation |
| `DraftPr` | active | Dispatch `pr-drafter` |
| `GateTypeScope` | active | Type/scope title choice |
| `SuggestMetadata` | active | Dispatch `review-metadata-suggester` |
| `GateReviewer` | active | Named reviewers or confirmed `none` |
| `GateLabels` | active | Existing labels or remove |
| `ShowPreview` | active | Exact preview with head SHA and effective state |
| `GatePreview` | active | Approve, decline, or request edits |
| `FreezeApproval` | active | Freeze fields; build preview `APPROVAL_RECORD` |
| `SubmitPr` | active | Dispatch `pr-submitter` |
| `VerifySubmit` | active | Orchestrator field + body-digest compare |
| `FinalDecision` | active | Third-cycle recovery or stop |
| `TerminalSuccess` | terminal | Verified PR/MR URL |
| `TerminalAwaitingUser` | terminal (suspend) | Focused question pending (`AWAITING_USER`) |
| `TerminalPrExists` | terminal | `PR_EXISTS` |
| `TerminalAuth` | terminal | `AUTH` |
| `TerminalBaseMissing` | terminal | `BASE_BRANCH_MISSING` |
| `TerminalHeadUnpushed` | terminal | `HEAD_BRANCH_UNPUSHED` |
| `TerminalEmptyDiff` | terminal | `EMPTY_DIFF` |
| `TerminalBlocked` | terminal | `BLOCKED` |
| `TerminalCancelled` | terminal | `CANCELLED` |
| `TerminalCreateError` | terminal | `CREATE_ERROR` |
| `TerminalCreateUncertain` | terminal | `CREATE_UNCERTAIN` |
| `TerminalEscalated` | terminal | `ESCALATED` |

## Transitions

| From | To | Guard / event |
| --- | --- | --- |
| `[*]` | `ResolveMode` | run start |
| `ResolveMode` | `NormalizeInputs` | mode recorded |
| `NormalizeInputs` | `InspectRepo` | inputs normalized |
| `InspectRepo` | `TerminalBlocked` | `REPO_STATE` is `BLOCKED` or `ERROR` |
| `InspectRepo` | `GateTopology` | `PASS` and topology ambiguous |
| `InspectRepo` | `GateTargetBranch` | `PASS`, topology clear, target missing |
| `InspectRepo` | `AdaptPlatform` | `PASS`, topology clear, target known, adapter needed |
| `InspectRepo` | `GateStateFallback` | `PASS`, path clear, draft unsupported |
| `InspectRepo` | `RunPreflight` | `PASS`, path clear, state supported |
| `GateTopology` | `TerminalAwaitingUser` | question pending |
| `GateTopology` | `GateTargetBranch` | remotes chosen, target missing |
| `GateTopology` | `AdaptPlatform` | remotes chosen, target known, adapter needed |
| `GateTopology` | `RunPreflight` | remotes chosen, ready for preflight |
| `GateTargetBranch` | `TerminalAwaitingUser` | question pending |
| `GateTargetBranch` | `AdaptPlatform` | target chosen, adapter needed |
| `GateTargetBranch` | `GateStateFallback` | target chosen, draft unsupported |
| `GateTargetBranch` | `RunPreflight` | target chosen, ready for preflight |
| `AdaptPlatform` | `GatePlatformTooling` | safe create path unknown |
| `AdaptPlatform` | `GateStateFallback` | path known, draft unsupported |
| `AdaptPlatform` | `RunPreflight` | path known, state supported |
| `GatePlatformTooling` | `TerminalAwaitingUser` | question pending |
| `GatePlatformTooling` | `AdaptPlatform` | tooling answered |
| `GateStateFallback` | `TerminalCancelled` | user stops |
| `GateStateFallback` | `RunPreflight` | proceed as `ready` |
| `RunPreflight` | `AnalyzeDiff` | `PREFLIGHT: PASS` |
| `RunPreflight` | `TerminalPrExists` | `PR_EXISTS` |
| `RunPreflight` | `GatePush` | `PUSH_REQUIRED` and push cycles &lt; 3 |
| `RunPreflight` | `GatePushRejected` | `PUSH_REJECTED` |
| `RunPreflight` | `TerminalAuth` | `AUTH` |
| `RunPreflight` | `TerminalBaseMissing` | `BASE_BRANCH_MISSING` |
| `RunPreflight` | `TerminalHeadUnpushed` | `HEAD_BRANCH_UNPUSHED` |
| `RunPreflight` | `TerminalBlocked` | `BLOCKED` or `ERROR` |
| `RunPreflight` | `FinalDecision` | `PUSH_REQUIRED` and push cycles ≥ 3 |
| `GatePush` | `RunPreflight` | plain push approved; redispatch with push `APPROVAL_RECORD` |
| `GatePush` | `TerminalHeadUnpushed` | push declined |
| `GatePushRejected` | `RunPreflight` | user confirms manual resolution |
| `GatePushRejected` | `TerminalHeadUnpushed` | stop |
| `AnalyzeDiff` | `DraftPr` | `DIFF_ANALYSIS: PASS` |
| `AnalyzeDiff` | `GateScope` | `LARGE_PR_CONFIRMATION_REQUIRED` and scope cycles &lt; 3 |
| `AnalyzeDiff` | `TerminalEmptyDiff` | `EMPTY_DIFF` |
| `AnalyzeDiff` | `TerminalBlocked` | `ERROR` |
| `AnalyzeDiff` | `FinalDecision` | scope cycles ≥ 3 |
| `GateScope` | `AnalyzeDiff` | large/mixed approved; redispatch |
| `GateScope` | `TerminalCancelled` | scope declined |
| `DraftPr` | `SuggestMetadata` | `PR_DRAFT: PASS` |
| `DraftPr` | `GateTypeScope` | `NEEDS_CHOICE` and type/scope cycles &lt; 3 |
| `DraftPr` | `TerminalBlocked` | `ERROR` or unresolved choice |
| `DraftPr` | `FinalDecision` | type/scope cycles ≥ 3 |
| `GateTypeScope` | `TerminalAwaitingUser` | question pending |
| `GateTypeScope` | `DraftPr` | choice answered; redispatch |
| `SuggestMetadata` | `ShowPreview` | `REVIEW_METADATA: PASS` |
| `SuggestMetadata` | `GateReviewer` | `NEEDS_REVIEWER` and reviewer cycles &lt; 3 |
| `SuggestMetadata` | `GateLabels` | `INVALID_LABELS` and label cycles &lt; 3 |
| `SuggestMetadata` | `TerminalAuth` | `AUTH` |
| `SuggestMetadata` | `TerminalBlocked` | `ERROR` |
| `SuggestMetadata` | `FinalDecision` | reviewer or label cycles ≥ 3 |
| `GateReviewer` | `TerminalAwaitingUser` | question pending |
| `GateReviewer` | `SuggestMetadata` | reviewers or `none`; redispatch |
| `GateLabels` | `TerminalAwaitingUser` | question pending |
| `GateLabels` | `SuggestMetadata` | labels resolved; redispatch |
| `ShowPreview` | `GatePreview` | preview shown |
| `GatePreview` | `FreezeApproval` | exact preview approved |
| `GatePreview` | `TerminalCancelled` | declined without edits |
| `GatePreview` | `InspectRepo` | edits; earliest phase is repo/platform; preview-edit cycles &lt; 3 |
| `GatePreview` | `AnalyzeDiff` | edits; earliest phase is diff/scope; cycles &lt; 3 |
| `GatePreview` | `DraftPr` | edits; earliest phase is title/body; cycles &lt; 3 |
| `GatePreview` | `SuggestMetadata` | edits; earliest phase is reviewers/labels; cycles &lt; 3 |
| `GatePreview` | `FinalDecision` | preview-edit cycles ≥ 3 |
| `FreezeApproval` | `SubmitPr` | freeze + preview `APPROVAL_RECORD` ready |
| `SubmitPr` | `AnalyzeDiff` | `HEAD_MOVED` (counts as preview-edit cycle) |
| `SubmitPr` | `VerifySubmit` | `PR_SUBMIT: PASS` |
| `SubmitPr` | `TerminalCreateUncertain` | `CREATE_UNCERTAIN` |
| `SubmitPr` | `TerminalCreateError` | `CREATE_ERROR` |
| `SubmitPr` | `TerminalAuth` | `AUTH` |
| `SubmitPr` | `TerminalBlocked` | `BLOCKED` or `ERROR` |
| `VerifySubmit` | `TerminalSuccess` | every echoed field and both body digests match |
| `VerifySubmit` | `TerminalCreateError` | mismatch |
| `FinalDecision` | `InspectRepo` | exact recovery targets repo/branch |
| `FinalDecision` | `RunPreflight` | exact recovery targets preflight |
| `FinalDecision` | `AnalyzeDiff` | exact recovery targets diff |
| `FinalDecision` | `DraftPr` | exact recovery targets draft |
| `FinalDecision` | `SuggestMetadata` | exact recovery targets metadata |
| `FinalDecision` | `TerminalEscalated` | stop or unusable recovery |
| `TerminalSuccess` | `[*]` | emit success block |
| `TerminalAwaitingUser` | `[*]` | suspend; resume on answer |
| `TerminalPrExists` | `[*]` | emit failure envelope |
| `TerminalAuth` | `[*]` | emit failure envelope |
| `TerminalBaseMissing` | `[*]` | emit failure envelope |
| `TerminalHeadUnpushed` | `[*]` | emit failure envelope |
| `TerminalEmptyDiff` | `[*]` | emit failure envelope |
| `TerminalBlocked` | `[*]` | emit failure envelope |
| `TerminalCancelled` | `[*]` | emit failure envelope |
| `TerminalCreateError` | `[*]` | emit failure envelope |
| `TerminalCreateUncertain` | `[*]` | emit failure envelope |
| `TerminalEscalated` | `[*]` | emit failure envelope |

## Cycle ledgers

Independent counters (max 3 non-`PASS` redispatches per gate, then `FinalDecision`): `push`, `scope`, `type/scope`, `reviewer`, `label`, `preview-edit`. Submission uses only the bounded create retry inside `pr-submitter`.

## Terminal decisions

Success: verified PR/MR URL. Failure/suspend envelopes: `AUTH`, `BASE_BRANCH_MISSING`, `HEAD_BRANCH_UNPUSHED`, `EMPTY_DIFF`, `PR_EXISTS`, `BLOCKED`, `AWAITING_USER`, `CANCELLED`, `CREATE_ERROR`, `CREATE_UNCERTAIN`, `ESCALATED`.

## Reachability and dead-state checks

| Property | Result |
| --- | --- |
| Every active state reachable from `ResolveMode` | yes |
| Every terminal reachable | yes |
| Dead states (no outgoing, non-terminal) | none |
| Gate thrash bounded | yes — three-cycle ledgers then `FinalDecision` |
| Submit invariants | `SubmitPr` only after safe path, all specialist `PASS`, freeze, matching preview `APPROVAL_RECORD` |
