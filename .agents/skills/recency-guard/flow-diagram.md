# Recency Guard Flow Diagram

Control-flow source of truth for `recency-guard` as a finite-state machine (`stateDiagram-v2`). Companion transition table: [`state-machine.md`](./state-machine.md).

Canonical dispatch-budget numbers live only in [`references/repair-and-integration.md`](./references/repair-and-integration.md).

```mermaid
stateDiagram-v2
  [*] --> ScopeTriage

  ScopeTriage --> TerminalOutOfScope: request_class=action
  ScopeTriage --> DraftLedger: informational or mixed

  DraftLedger --> SelectOutcome: ledger_empty
  DraftLedger --> NoToolsQualify: tools_unavailable
  DraftLedger --> RecencyAudit: tools available

  NoToolsQualify --> SelectOutcome: time-sensitive rows handled

  RecencyAudit --> RecencyAudit: ERROR retry or FAIL rerun in budget
  RecencyAudit --> SelectOutcome: ERROR/FAIL budget exhausted
  RecencyAudit --> ClaimAudit: PASS or FAIL clear or TOOLS_MISSING and claim_review_warranted
  RecencyAudit --> IntegrateEvidence: TOOLS_MISSING and not claim_review_warranted

  ClaimAudit --> ClaimAudit: ERROR retry or FAIL rerun in budget
  ClaimAudit --> SelectOutcome: ERROR/FAIL budget exhausted
  ClaimAudit --> IntegrateEvidence: PASS or FAIL clear or TOOLS_MISSING

  IntegrateEvidence --> CompletenessCheck: evidence folded

  CompletenessCheck --> RevalidateClaim: new_risky_claim and budget remains
  CompletenessCheck --> SelectOutcome: no new risk or reval budget exhausted

  RevalidateClaim --> SelectOutcome: single-claim folded

  SelectOutcome --> TerminalMaterial: material_uncertainty
  SelectOutcome --> TerminalLimited: has_limits
  SelectOutcome --> TerminalReady: else ready

  TerminalOutOfScope --> [*]
  TerminalReady --> [*]
  TerminalLimited --> [*]
  TerminalMaterial --> [*]
```

## Terminal States

| Terminal | Meaning |
| --- | --- |
| `TerminalReady` | Every risky ledger row is verified or cleanly removed; no recorded limits |
| `TerminalLimited` | Direct answer naming qualified, unverifiable, unreviewed, tool, freshness, or routing limits |
| `TerminalMaterial` | Conservative answer naming the unresolved material item |
| `TerminalOutOfScope` | Entire request was a high-impact action; action not performed. Mixed requests continue informationally and surface the routing limit via `TerminalLimited` |
