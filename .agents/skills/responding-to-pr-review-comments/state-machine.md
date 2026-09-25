# State Machine — responding-to-pr-review-comments

Finite-state execution model for this skill. Mermaid SoT: [`flow-diagram.md`](./flow-diagram.md). This table is the authoritative list of states, transitions, guards, and terminals. Normative status block shapes live in [`references/status-contracts.md`](./references/status-contracts.md).

Six specialists stay separate: each owns a distinct status prefix (`COLLECT`, `ASSESS`, `DRAFT`, `VERIFY`, `WRITE`, `POST`). That split is earned.

## States

| State | Kind | Role |
| --- | --- | --- |
| `NormalizeInputs` | active | Defaults, untrusted-content rule, counter init |
| `GatePrUrl` | active | Require unambiguous `PR_URL` |
| `GateOutputPath` | active | Enforce `OUTPUT_FILE` safety checklist |
| `GateCollision` | active | Existing report: overwrite, suffix, or stop |
| `GateIdentity` | active | Resolve login or continue `degraded-unknown` |
| `GateScope` | active | Validate URL-list `COMMENT_SCOPE` when used |
| `GatePostingMode` | active | Accept `draft-only` / `post-after-confirmation` only |
| `Collect` | active | Dispatch `review-comment-collector` |
| `CollectRepair` | active | One redispatch with `REPAIR_REQUEST` |
| `ApplyTaxonomy` | active | Targets, dispositions, degraded-identity rules |
| `Assess` | active | Dispatch `review-comment-assessor` |
| `AssessContext` | active | One narrow lookup for `NEEDS_CONTEXT` |
| `GateAssessDecision` | active | Product/target/source question |
| `Draft` | active | Dispatch `reply-drafter` |
| `GateWording` | active | Wording question that affects approval |
| `Verify` | active | Dispatch `response-verifier` |
| `VerifyRepair` | active | Named `verify.context` / `verify.fix` repair |
| `GateWritePath` | active | Reconfirm path safety before write |
| `WriteReport` | active | Dispatch `response-report-writer` |
| `ReadBack` | active | Writer + orchestrator read-back |
| `BuildPreview` | active | Exact preview for supported eligible targets |
| `GateContractRepair` | active | Drop unsupported poster targets under cap |
| `ShowPreview` | active | Exact text preview for approval |
| `GatePreviewApproval` | active | Approve, decline, or wording change |
| `RecordApproval` | active | Store `APPROVAL_RECORD` (timestamp + exact text) |
| `Post` | active | Dispatch `thread-reply-poster` |
| `SyncReport` | active | Redispatch writer to sync ledger + envelope |
| `TerminalPassNotPosted` | terminal | `PASS` + `Posting: not-posted` |
| `TerminalPassPosted` | terminal | `PASS` + `Posting: posted` |
| `TerminalAuth` | terminal | `AUTH` |
| `TerminalNotFound` | terminal | `NOT_FOUND` |
| `TerminalNoComments` | terminal | `NO_COMMENTS` |
| `TerminalNeedsUserDecision` | terminal | `NEEDS_USER_DECISION` |
| `TerminalResponseError` | terminal | `RESPONSE_ERROR` |
| `TerminalVerifyFail` | terminal | `VERIFY_FAIL` |
| `TerminalWriteError` | terminal | `WRITE_ERROR` |
| `TerminalPostError` | terminal | `POST_ERROR` (includes `Posting: partial`) |
| `TerminalCancelled` | terminal | `CANCELLED` |

## Transitions

| From | To | Guard / event |
| --- | --- | --- |
| `[*]` | `NormalizeInputs` | run start |
| `NormalizeInputs` | `GatePrUrl` | inputs initialized |
| `GatePrUrl` | `GateOutputPath` | `PR_URL` unambiguous |
| `GatePrUrl` | `GatePrUrl` | ask; `questions.pr-url` under cap 3 |
| `GatePrUrl` | `TerminalNeedsUserDecision` | `questions.pr-url` at cap |
| `GateOutputPath` | `GateCollision` | safety checklist passes |
| `GateOutputPath` | `GateOutputPath` | ask; `questions.output-path` under cap 3 |
| `GateOutputPath` | `TerminalNeedsUserDecision` | `questions.output-path` at cap |
| `GateCollision` | `GateIdentity` | no collision, or overwrite/suffix chosen |
| `GateCollision` | `TerminalNeedsUserDecision` | user chooses stop |
| `GateIdentity` | `GateScope` | login resolved or degraded mode set |
| `GateScope` | `GatePostingMode` | scope validated or not a URL list |
| `GatePostingMode` | `Collect` | mode is `draft-only` or `post-after-confirmation` |
| `GatePostingMode` | `GatePostingMode` | ask; `questions.posting-mode` under cap 3 |
| `GatePostingMode` | `TerminalNeedsUserDecision` | `questions.posting-mode` at cap |
| `Collect` | `TerminalAuth` | `COLLECT: AUTH` |
| `Collect` | `TerminalNotFound` | `COLLECT: NOT_FOUND` |
| `Collect` | `TerminalNoComments` | `COLLECT: NO_COMMENTS` (PR empty) |
| `Collect` | `CollectRepair` | `ERROR` + incomplete + named repairable; repair unused |
| `Collect` | `TerminalResponseError` | `ERROR` unrepaired or second failure |
| `Collect` | `ApplyTaxonomy` | `PASS` + complete/limited; in-scope &gt; 0 |
| `Collect` | `WriteReport` | `PASS` + in-scope = 0 (scope-empty) |
| `CollectRepair` | `Collect` | redispatch once |
| `ApplyTaxonomy` | `Assess` | dispositions assigned (incl. degraded) |
| `Assess` | `Draft` | `ASSESS: PASS` |
| `Assess` | `AssessContext` | `NEEDS_CONTEXT` and lookup unused |
| `Assess` | `TerminalResponseError` | `NEEDS_CONTEXT` reused, or `ERROR` |
| `Assess` | `GateAssessDecision` | `NEEDS_USER_DECISION` |
| `AssessContext` | `Assess` | narrow lookup done |
| `GateAssessDecision` | `Assess` | answered; counter under cap |
| `GateAssessDecision` | `TerminalNeedsUserDecision` | `questions.product` or `questions.target` at cap |
| `Draft` | `Verify` | `DRAFT: PASS` |
| `Draft` | `GateWording` | `NEEDS_USER_DECISION` |
| `Draft` | `TerminalResponseError` | `ERROR` |
| `GateWording` | `Draft` | answered; `questions.wording` under cap |
| `GateWording` | `TerminalNeedsUserDecision` | `questions.wording` at cap |
| `Verify` | `GateWritePath` | `VERIFY: PASS` |
| `Verify` | `VerifyRepair` | `FAIL`/`NEEDS_CONTEXT` and named counter under cap |
| `Verify` | `TerminalVerifyFail` | verify counter exhausted |
| `Verify` | `TerminalResponseError` | `ERROR` |
| `VerifyRepair` | `Verify` | named gap repaired |
| `GateWritePath` | `WriteReport` | path still safe |
| `GateWritePath` | `GateOutputPath` | path unsafe; re-enter path gate |
| `WriteReport` | `ReadBack` | `WRITE: PASS` |
| `WriteReport` | `VerifyRepair` | `ERROR` with `Fix target: verifier:<item>` under cap |
| `WriteReport` | `TerminalVerifyFail` | verifier fix cap exhausted |
| `WriteReport` | `TerminalWriteError` | write/IO failure |
| `ReadBack` | `TerminalPassNotPosted` | both read-backs pass; `draft-only` |
| `ReadBack` | `BuildPreview` | both pass; `post-after-confirmation` |
| `ReadBack` | `TerminalWriteError` | read-back fails |
| `BuildPreview` | `SyncReport` | no supported targets / all report-only → not-posted outcome |
| `BuildPreview` | `SyncReport` | auth unavailable → auth outcome |
| `BuildPreview` | `SyncReport` | preview error → post-error outcome |
| `BuildPreview` | `GateContractRepair` | unsupported target in package; `contract-repair` under 2 |
| `BuildPreview` | `SyncReport` | contract-repair exhausted → post-error |
| `BuildPreview` | `ShowPreview` | preview ready |
| `GateContractRepair` | `Verify` | unsupported target removed; reverify |
| `ShowPreview` | `GatePreviewApproval` | preview shown |
| `GatePreviewApproval` | `RecordApproval` | exact preview approved |
| `GatePreviewApproval` | `SyncReport` | declined → cancelled outcome |
| `GatePreviewApproval` | `Draft` | wording change; `preview-decision` under 3 |
| `GatePreviewApproval` | `TerminalNeedsUserDecision` | `preview-decision` at cap |
| `RecordApproval` | `Post` | `APPROVAL_RECORD` stored |
| `Post` | `BuildPreview` | verbatim mismatch; `preview-repair` under 2 |
| `Post` | `TerminalNeedsUserDecision` | `preview-repair` at cap |
| `Post` | `SyncReport` | ledger complete (posted / partial / none / auth / error) |
| `SyncReport` | `TerminalPassNotPosted` | sync ok; outcome not-posted |
| `SyncReport` | `TerminalPassPosted` | sync ok; outcome posted |
| `SyncReport` | `TerminalPostError` | sync ok; partial or post-error |
| `SyncReport` | `TerminalCancelled` | sync ok; cancelled |
| `SyncReport` | `TerminalAuth` | sync ok; auth |
| `SyncReport` | `TerminalWriteError` | sync write/read-back fails |
| each terminal | `[*]` | emit `PR_COMMENT_RESPONSE: …` envelope |

## Cycle ledgers

| Counter | Cap | Exhaustion route |
| --- | --- | --- |
| `questions.pr-url` | 3 | `TerminalNeedsUserDecision` |
| `questions.output-path` | 3 | `TerminalNeedsUserDecision` |
| `questions.posting-mode` | 3 | `TerminalNeedsUserDecision` |
| `questions.product` / `questions.target` | 3 each | `TerminalNeedsUserDecision` |
| `questions.wording` | 3 | `TerminalNeedsUserDecision` |
| `preview-decision` | 3 | `TerminalNeedsUserDecision` |
| `preview-repair` | 2 | `TerminalNeedsUserDecision` |
| `contract-repair` | 2 | post-error via `SyncReport` |
| `verify.context.<item>` / `verify.fix.<item>` | 2 each | `TerminalVerifyFail` |
| collector `REPAIR_REQUEST` | 1 | `TerminalResponseError` |

## Terminal decisions

| Envelope | Posting field | Meaning |
| --- | --- | --- |
| `PASS` | `not-posted` | Verified report; no live replies |
| `PASS` | `posted` | All approved replies posted and ledger-synced |
| `POST_ERROR` | `partial` or `failed` | Live side effects and/or post failure; ledger required if any live |
| `CANCELLED` | `cancelled` | Exact preview declined |
| `AUTH` / `NOT_FOUND` / `NO_COMMENTS` | as applicable | Collection-time terminals |
| `NEEDS_USER_DECISION` | — | Named question counter exhausted or collision stop |
| `RESPONSE_ERROR` / `VERIFY_FAIL` / `WRITE_ERROR` | — | Unrepaired phase failures |

## Reachability and dead-state checks

| Property | Result |
| --- | --- |
| Every active state reachable from `NormalizeInputs` | yes |
| Every terminal reachable | yes |
| Dead states (no outgoing, non-terminal) | none |
| Gate thrash bounded | yes — counters above |
| Post invariants | `Post` only after exact preview, matching `APPROVAL_RECORD`, and freshness checks inside poster |
