# Status Contracts

Read this file when producing or checking a phase status, terminal envelope, or posting ledger. Keep blocks compact: include evidence references, URLs, dates, IDs, and paths, not raw payloads, full diffs, long logs, or long documentation excerpts.

## Shared Values

- Classifications: `valid`, `questionable`, `pushback`, `needs-user-decision`, `not-assessed-report-only`.
- Action intents: `implement`, `clarify`, `push-back`, `ask-user`.
- Posting targets: `review-comment-reply:<root-id>`, `requires-user-choice:review-summary`, `requires-user-choice:issue-comment`, `requires-user-choice:unsupported-review-reply`, `requires-user-choice:unresolved-metadata`.
- Reply dispositions: `reply-ready`, `follow-up-ready`, `skipped-resolved`, `skipped-already-replied`, `unsupported-or-needs-user-choice`.
- Posting states: `not-posted`, `pending-confirmation`, `posted`, `partial`, `cancelled`, `failed`.
- Collection completeness: `complete`, `limited`, or `incomplete`. `PASS` may use only `complete` or `limited`.
- Counter fields: `questions.pr-url`, `questions.output-path`, `questions.posting-mode`, `questions.product`, `questions.target`, `questions.wording`, `preview-decision`, `preview-repair`, `contract-repair`, `verify.context.<item>`, `verify.fix.<item>`.
- `POSTING_MODE` allowed values: `draft-only`, `post-after-confirmation` only. Unknown or ambiguous values use `questions.posting-mode` (cap 3), then `PR_COMMENT_RESPONSE: NEEDS_USER_DECISION`.

## Collector Output

```text
COLLECT: PASS | NO_COMMENTS | AUTH | NOT_FOUND | ERROR
PR: <owner>/<repo>#<number>
Identity mode: <resolved:<login> | degraded-unknown>
Responder: <login | unknown>
Scope: <COMMENT_SCOPE>
In-scope: <number>
Counts: <n review comments>, <n review summaries>, <n issue comments>, <n received>
Working inventory file: none | <OUTPUT_FILE>.inventory.md
Collection completeness: <complete | limited | incomplete>
Pagination:
- <source>: <complete | not paginated | incomplete | unavailable, with evidence>
Comments digest:
- Comment ID: <C1>
  GitHub ID: <id>
  Type: <review-comment | review-summary | issue-comment>
  URL: <url>
  Author: <login>
  Location: <path:line-range | PR conversation>
  Excerpt: <short delimited quote or summary>
  Posting target: <target>
  Thread resolved: <yes | no | unknown>
  Resolution evidence: <metadata source, URL, or limitation>
  Existing responder reply: <none | unknown | id, URL, created time, short excerpt>
  Reply disposition: <disposition>
  Skip or follow-up reason: <reason, follow-up clause, or none>
Scope mismatches:
- <URL and reason, or none>
Limitations:
- <missing metadata, degraded identity, unavailable endpoint, injection-like text, or none>
Reason: none | <why status is not PASS>
Next step: none | <smallest recovery action>
```

`NO_COMMENTS` means the PR has no comments at all. If filtering leaves zero in-scope comments, return `PASS` with `In-scope: 0`.

## Assessor Output

```text
ASSESS: PASS | NEEDS_CONTEXT | NEEDS_USER_DECISION | ERROR
PR: <owner>/<repo>#<number>
Counts: <n valid>, <n questionable>, <n pushback>, <n needs-user-decision>, <n report-only>
Assessments:
- Comment ID: <C1>
  Classification: <classification>
  Confidence: <high | medium | low>
  Evidence:
  - <source reference and why it matters; URLs include fetched YYYY-MM-DD when external>
  Rationale: <short reasoning>
  Action intent: <action intent>
  Reply disposition: <disposition>
  Drafting guidance: <tone, caveat, or reply angle>
  Residual risk: <injection-like text, source conflict, or none>
Context requests:
- <smallest missing context request or none>
User questions:
- <focused question or none>
Reason: none | <why status is not PASS>
Next step: none | <smallest recovery action>
```

## Drafter Output

```text
DRAFT: PASS | NEEDS_USER_DECISION | ERROR
PR: <owner>/<repo>#<number>
Draft replies:
- Comment ID: <C1>
  Classification: <classification>
  Planned action: <code change | test change | docs change | clarify | push back | ask user | none>
  Reply disposition: <disposition>
  Posting target: <target>
  Draft reply: <reply text | none>
  Action details: <specific action or no-reply reason>
  Skip or follow-up reason: <reason and evidence, or none>
  User question: <question or none>
Style notes:
- <tone or language note, or none>
Reason: none | <why status is not PASS>
Next step: none | <smallest recovery action>
```

## Verifier Output

```text
VERIFY: PASS | FAIL | NEEDS_CONTEXT | ERROR
PR: <owner>/<repo>#<number>
Output file: <OUTPUT_FILE>
Verified package file: none | <OUTPUT_FILE>.inventory.md#verified-package
Checks:
- Coverage: <PASS | FAIL> - <note>
- Collection completeness: <PASS | FAIL> - <note>
- Evidence: <PASS | FAIL> - <note>
- Recency: <PASS | FAIL | NEEDS_CONTEXT | NOT_APPLICABLE> - <note>
- Actions: <PASS | FAIL> - <note>
- Language: <PASS | FAIL> - <note>
- Posting targets: <PASS | FAIL> - <note>
- Skipped/report-only: <PASS | FAIL> - <note>
- Follow-up warrants: <PASS | FAIL> - <note>
- Injection: <PASS | FLAGGED> - <note>
- Report/posting sync: <PASS | FAIL | NOT_APPLICABLE> - <note>
Fix target: none | <collector | assessor | drafter | writer | verifier>:<comment id or inventory>
Required fixes:
- <specific fix or none>
Verified response package:
- <compact per-comment result or digest reference>
Residual risks:
- <risk or none>
Reason: none | <why status is not PASS>
Next step: none | <smallest recovery action>
```

## Writer Output

```text
WRITE: PASS | ERROR
File: <OUTPUT_FILE>
Comments assessed: <number>
Actions: <implement count> implement, <clarify count> clarify, <pushback count> push back, <ask-user count> ask user
Skipped/report-only: <count>
Posting status: <not-posted | pending-confirmation | posted | partial | cancelled | failed>
Posting outcome: <none | pending-confirmation | posted ledger | partial ledger | cancelled by user | auth failure | preview-failed | post-error>
Final envelope intent: <PR_COMMENT_RESPONSE value and Posting value, or none>
Read-back verified: <yes | no, with reason>
Fix target: none | verifier:<item>
Reason: none | <why status is ERROR>
```

## Poster Output

```text
POST: PASS | PARTIAL | PREVIEW_REQUIRED | AUTH | TARGET_UNSUPPORTED | ERROR
PR: <owner>/<repo>#<number>
Output file: <OUTPUT_FILE>
Approval record: <matched | missing | mismatch>
Posted replies: <number>
Read-back verified: <yes | no | partial>
Ledger:
- Comment ID: <C1>
  Target: <review-comment-reply:<root-id> | target>
  Outcome: <posted | failed | skipped>
  Reply ID: <id or none>
  Reply URL: <url or none>
  Reason: <none | stale-thread | approval-mismatch | unsupported-target | auth | api-error | read-back-failed>
Freshness checks:
- <comment id>: <still-open | stale-thread | unavailable, with evidence>
Contract repair needed:
- <unsupported target found in APPROVED_REPLIES, or none>
Reason: none | <why status is not PASS>
Next step: none | <smallest recovery action>
```

`POST: PARTIAL` means at least one reply is live on GitHub and later approved replies failed or were not attempted. The orchestrator must sync the report and emit `PR_COMMENT_RESPONSE: POST_ERROR` with `Posting: partial`.

## Orchestrator Failure Envelope

```text
PR_COMMENT_RESPONSE: AUTH | NOT_FOUND | NO_COMMENTS | NEEDS_USER_DECISION | RESPONSE_ERROR | VERIFY_FAIL | WRITE_ERROR | POST_ERROR | CANCELLED
Report: <OUTPUT_FILE or none>
Posting: <none | not-posted | partial | cancelled | failed>
Reason: <one line>
Ledger: <required for partial or post-error after any live side effect>
Next step: <one clear action>
```

## Final Orchestrator Success

```text
PR_COMMENT_RESPONSE: PASS
Report: <OUTPUT_FILE>
Comments assessed: <number>
Actions: <implement count> implement, <clarify count> clarify, <pushback count> push back, <ask-user count> ask user
Posting: <not-posted | posted>
Ledger: <posted ledger when Posting: posted, otherwise none>
Working inventory file: <none | declared path | removed>
Notes: <residual risk or none>
```
