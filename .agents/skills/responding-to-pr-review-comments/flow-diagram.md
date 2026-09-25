# Responding to PR Review Comments Flow

Finite-state control flow for the PR review-response orchestrator (`stateDiagram-v2`). Companion transition table: [`state-machine.md`](./state-machine.md).

Normalize inputs, collect and classify review comments, draft and verify replies, write one local report, and optionally post exact approved replies with freshness checks and a per-reply ledger. Report + declared inventory are the only local writes; approved review-comment replies are the only GitHub mutation.

```mermaid
stateDiagram-v2
  [*] --> NormalizeInputs

  NormalizeInputs --> GatePrUrl: inputs initialized

  GatePrUrl --> GateOutputPath: PR_URL unambiguous
  GatePrUrl --> GatePrUrl: ask under cap
  GatePrUrl --> TerminalNeedsUserDecision: questions.pr-url at cap

  GateOutputPath --> GateCollision: safety checklist passes
  GateOutputPath --> GateOutputPath: ask under cap
  GateOutputPath --> TerminalNeedsUserDecision: questions.output-path at cap

  GateCollision --> GateIdentity: clear or overwrite or suffix
  GateCollision --> TerminalNeedsUserDecision: stop

  GateIdentity --> GateScope: resolved or degraded-unknown
  GateScope --> GatePostingMode: scope validated

  GatePostingMode --> Collect: draft-only or post-after-confirmation
  GatePostingMode --> GatePostingMode: ask under cap
  GatePostingMode --> TerminalNeedsUserDecision: questions.posting-mode at cap

  Collect --> TerminalAuth: COLLECT AUTH
  Collect --> TerminalNotFound: COLLECT NOT_FOUND
  Collect --> TerminalNoComments: COLLECT NO_COMMENTS
  Collect --> CollectRepair: ERROR repairable unused
  Collect --> TerminalResponseError: ERROR unrepaired
  Collect --> ApplyTaxonomy: PASS in-scope gt 0
  Collect --> WriteReport: PASS in-scope eq 0

  CollectRepair --> Collect: redispatch once

  ApplyTaxonomy --> Assess: dispositions assigned

  Assess --> Draft: ASSESS PASS
  Assess --> AssessContext: NEEDS_CONTEXT unused
  Assess --> TerminalResponseError: NEEDS_CONTEXT reused or ERROR
  Assess --> GateAssessDecision: NEEDS_USER_DECISION

  AssessContext --> Assess: narrow lookup done

  GateAssessDecision --> Assess: answered under cap
  GateAssessDecision --> TerminalNeedsUserDecision: product or target at cap

  Draft --> Verify: DRAFT PASS
  Draft --> GateWording: NEEDS_USER_DECISION
  Draft --> TerminalResponseError: ERROR

  GateWording --> Draft: answered under cap
  GateWording --> TerminalNeedsUserDecision: wording at cap

  Verify --> GateWritePath: VERIFY PASS
  Verify --> VerifyRepair: named gap under cap
  Verify --> TerminalVerifyFail: verify cap exhausted
  Verify --> TerminalResponseError: ERROR

  VerifyRepair --> Verify: repaired

  GateWritePath --> WriteReport: path still safe
  GateWritePath --> GateOutputPath: path unsafe

  WriteReport --> ReadBack: WRITE PASS
  WriteReport --> VerifyRepair: Fix target verifier under cap
  WriteReport --> TerminalVerifyFail: verifier fix exhausted
  WriteReport --> TerminalWriteError: write or IO failure

  ReadBack --> TerminalPassNotPosted: ok and draft-only
  ReadBack --> BuildPreview: ok and post-after-confirmation
  ReadBack --> TerminalWriteError: read-back fails

  BuildPreview --> SyncReport: not-posted or auth or post-error outcome
  BuildPreview --> GateContractRepair: unsupported target under cap
  BuildPreview --> ShowPreview: preview ready

  GateContractRepair --> Verify: remove unsupported reverify

  ShowPreview --> GatePreviewApproval: preview shown

  GatePreviewApproval --> RecordApproval: exact preview approved
  GatePreviewApproval --> SyncReport: declined cancelled
  GatePreviewApproval --> Draft: wording change under cap
  GatePreviewApproval --> TerminalNeedsUserDecision: preview-decision at cap

  RecordApproval --> Post: APPROVAL_RECORD stored

  Post --> BuildPreview: mismatch preview-repair under cap
  Post --> TerminalNeedsUserDecision: preview-repair at cap
  Post --> SyncReport: ledger complete

  SyncReport --> TerminalPassNotPosted: not-posted
  SyncReport --> TerminalPassPosted: posted
  SyncReport --> TerminalPostError: partial or post-error
  SyncReport --> TerminalCancelled: cancelled
  SyncReport --> TerminalAuth: auth
  SyncReport --> TerminalWriteError: sync failed

  TerminalPassNotPosted --> [*]
  TerminalPassPosted --> [*]
  TerminalAuth --> [*]
  TerminalNotFound --> [*]
  TerminalNoComments --> [*]
  TerminalNeedsUserDecision --> [*]
  TerminalResponseError --> [*]
  TerminalVerifyFail --> [*]
  TerminalWriteError --> [*]
  TerminalPostError --> [*]
  TerminalCancelled --> [*]
```

## Invariants

- Report and inventory working file are the only local writes; approved review-comment replies are the only GitHub mutations.
- Posting requires exact preview approval, verbatim `APPROVAL_RECORD` match, and per-thread freshness checks inside the poster.
- Every loop edge names the counter it increments; caps route to terminals.
- The report is re-synced after every posting-related outcome before the terminal envelope is emitted.
