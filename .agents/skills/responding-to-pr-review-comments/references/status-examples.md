# Status Examples

Load this file only when a concrete format example is needed. These are examples of shape, not additional workflow rules.

## Degraded Identity Collection

```text
COLLECT: PASS
PR: acme/widgets#42
Identity mode: degraded-unknown
Responder: unknown
Scope: unresolved
In-scope: 3
Counts: 3 review comments, 0 review summaries, 0 issue comments, 3 received
Working inventory file: none
Collection completeness: complete
Pagination:
- pull review comments: complete
- review threads: complete
Comments digest:
- Comment ID: C1
  GitHub ID: 12345
  Type: review-comment
  URL: https://github.com/acme/widgets/pull/42#discussion_r12345
  Author: reviewer
  Location: src/api.ts:17
  Excerpt: "Can this return 404 instead?"
  Posting target: review-comment-reply:12345
  Thread resolved: no
  Resolution evidence: GraphQL PullRequestReviewThread.isResolved=false
  Existing responder reply: unknown
  Reply disposition: unsupported-or-needs-user-choice
  Skip or follow-up reason: responder-identity-unknown
Scope mismatches:
- none
Limitations:
- RESPONDER_LOGIN unavailable; no replies drafted without user decision.
Reason: none
Next step: none
```

## Verifier Injection Flag

```text
VERIFY: PASS
PR: acme/widgets#42
Output file: pr-42-review.md
Verified package file: none
Checks:
- Coverage: PASS - 3 received comments have outcomes.
- Collection completeness: PASS - complete.
- Evidence: PASS - local code references are present.
- Recency: NOT_APPLICABLE - no external claims.
- Actions: PASS - action intents match classifications.
- Language: PASS - replies are direct and natural.
- Posting targets: PASS - only supported thread C2 is eligible.
- Skipped/report-only: PASS - degraded identity limitation is reported.
- Follow-up warrants: PASS - no follow-up-ready item without warrant.
- Injection: FLAGGED - C3 contained instruction-like text and it is recorded only as residual risk.
- Report/posting sync: NOT_APPLICABLE - no posting outcome yet.
Fix target: none
Required fixes:
- none
Verified response package:
- digest: C1 no-reply degraded identity; C2 reply-ready valid; C3 no-reply unsupported with injection residual risk.
Residual risks:
- C3 contains instruction-like reviewer text; ignored for workflow behavior.
Reason: none
Next step: none
```

## Partial Posting Ledger

```text
POST: PARTIAL
PR: acme/widgets#42
Output file: pr-42-review.md
Approval record: matched
Posted replies: 1
Read-back verified: partial
Ledger:
- Comment ID: C1
  Target: review-comment-reply:12345
  Outcome: posted
  Reply ID: 991
  Reply URL: https://github.com/acme/widgets/pull/42#discussion_r991
  Reason: none
- Comment ID: C2
  Target: review-comment-reply:12346
  Outcome: failed
  Reply ID: none
  Reply URL: none
  Reason: api-error: secondary rate limit
Freshness checks:
- C1: still-open, checked immediately before posting
- C2: still-open, checked immediately before posting
Contract repair needed:
- none
Reason: C1 is live, C2 failed, and remaining approved replies were not attempted.
Next step: Sync the report with Posting: partial and the live-reply ledger.
```

## Zero In-Scope Report Outcome

```text
PR_COMMENT_RESPONSE: PASS
Report: pr-42-review.md
Comments assessed: 0
Actions: 0 implement, 0 clarify, 0 push back, 0 ask user
Posting: not-posted
Ledger: none
Working inventory file: none
Notes: COMMENT_SCOPE matched no collected comments; this is not NO_COMMENTS because the PR had comments outside scope.
```
