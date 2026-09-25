# Review Workflow

> Read this file once, after input normalization, before dispatching any subagent. This is the single authoritative description of phase order, routing, repair, and terminal behavior. Keep only status summaries in the orchestrator context; raw diffs, command output, API payloads, and fetched web pages stay inside the subagent that produced them.

## Phase Sequence

| Phase | Owner | Continue on |
| --- | --- | --- |
| Intake | Inline (orchestrator) | Inputs normalized; one PR chosen |
| Context | `pr-context-collector` | `CONTEXT: PASS` |
| Chunk review | One `chunk-reviewer` per dimension | Every chunk returns `CHUNK: PASS` or `CHUNK: NO_FINDINGS` |
| Adjudication | `finding-adjudicator` | `ADJUDICATE: PASS` or `ADJUDICATE: NO_FINDINGS` |
| Comments | `comment-drafter` | `COMMENTS: PASS`, or skipped on the no-findings path |
| Verify | `review-verifier` | `VERIFY: PASS` |
| Write | `review-writer` | `WRITE: PASS` |
| Post | `review-poster` | `POST: PASS`, or skipped in `draft-only` |
| Artifact update | `review-writer` (update mode) | `WRITE: PASS` after posting or cancellation |

## State Envelope

Carry this compact state between phases:

```text
Inputs: PR_URL, OUTPUT_FILE, POSTING_MODE, LANGUAGE_STYLE, REVIEW_FOCUS
Dimensions: <1-6 dimension names from CONTEXT: PASS>
Existing-comment digest: <summary reference, held by adjudicator inputs>
Latest status: <CONTEXT | CHUNK | ADJUDICATE | COMMENTS | VERIFY | WRITE | POST block>
Review decision candidate: none | comment | approve   (no-findings path only)
Review decision (post-verify): comment | request changes | approve
Posting status: draft | posted | cancelled | failed
Repair cycles: <0-2>
Narrow-context retries used: <0-1>
Status-parse retries used per dispatch: <0-1>
```

`request changes` is never a review-decision candidate. It appears only after findings exist, via `comment-drafter` recommendation and verifier output.

## Fail-Closed Status Handling

Every subagent must return its documented status block. When a reply is missing its status line or the status cannot be parsed, re-dispatch that subagent once with the same inputs and a note that the status block was malformed. If the second reply is also unparseable, treat it as that phase's `ERROR` status and route accordingly. Never guess a status.

## Execution Rules

### Intake

1. Require exactly one parseable GitHub PR URL, valid `POSTING_MODE` and `REVIEW_FOCUS` values, and a safe workspace-relative Markdown `OUTPUT_FILE` (relative, `.md`, no `..`, not under `.git/`, resolves inside the workspace). If multiple PR URLs are present, run `HUMAN_GATE_CHOOSE_ONE_PR`; if a valid single PR is not chosen, stop with `PR_REVIEW: NEEDS_CONTEXT`.

### Context

2. Dispatch `pr-context-collector` with `PR_URL`, `OUTPUT_FILE`, and `REVIEW_FOCUS`. It returns metadata, CI signals, risk areas, an existing-comment digest (via `../scripts/collect-pr-review-comments.sh` when `gh` is available), and 1–6 proposed review dimensions sized to the PR. There is no size gate: any PR proceeds, however large.
3. Route context statuses exactly: `CONTEXT: AUTH` → `PR_REVIEW: AUTH`; `CONTEXT: NOT_FOUND` → `PR_REVIEW: NOT_FOUND`; `CONTEXT: ERROR` → `PR_REVIEW: REVIEW_ERROR`.
4. `CONTEXT: NEEDS_CONTEXT` is a narrow request the orchestrator may be able to satisfy (for example, a missing base ref or an ambiguous workspace path). Satisfy it inline and re-dispatch the collector at most once per run; if the need persists or cannot be satisfied, stop with `PR_REVIEW: NEEDS_CONTEXT`.

### Chunk review

5. Dispatch one `chunk-reviewer` per dimension, each with the context summary, its assigned dimension, the changed-file subset relevant to that dimension, `REVIEW_FOCUS`, and `LANGUAGE_STYLE`. Dispatch concurrently when the runtime supports it; otherwise serially in dimension order. Chunk reviewers never dispatch other subagents.
6. Route `CHUNK: ERROR` for any dimension to `PR_REVIEW: REVIEW_ERROR`. On `CHUNK: NEEDS_CONTEXT`, dispatch `pr-context-collector` once with the narrow request (this consumes the single narrow-context retry), then re-dispatch only that chunk reviewer. A second `CHUNK: NEEDS_CONTEXT` from any reviewer stops with `PR_REVIEW: NEEDS_CONTEXT`.
7. Proceed when every chunk returns `CHUNK: PASS` or `CHUNK: NO_FINDINGS`.

### Adjudication

8. Dispatch `finding-adjudicator` with all chunk findings and the existing-comment digest. For each candidate it must confirm, adjust severity, or drop with a written reason — no vote-count consensus — and merge duplicates found by more than one dimension. Each surviving finding is marked `new` or `follow-up` (with the existing thread's comment ID and resolution state). Adjudication is one round; do not dispatch a second adjudicator to review the first.
9. Route `ADJUDICATE: ERROR` to `PR_REVIEW: REVIEW_ERROR`. On `ADJUDICATE: NO_FINDINGS` (nothing survived, and no follow-ups are owed), skip `comment-drafter`, set the review-decision candidate — `approve` only when residual risks are non-blocking, otherwise `comment` — and go to Verify.

### Comments

10. Dispatch `comment-drafter` with the adjudicated findings, context summary, and `LANGUAGE_STYLE`. It owns the single canonical review package: review decision, review summary, and one self-contained comment per finding with line metadata, dedup disposition, and source URLs for external-fact claims. Every downstream phase consumes this package.
11. Route `COMMENTS: ERROR` to `PR_REVIEW: REVIEW_ERROR`. On `COMMENTS: NEEDS_METADATA`, collect only the requested line metadata inline and retry drafting once; a repeated `NEEDS_METADATA` or `ERROR` stops with `PR_REVIEW: REVIEW_ERROR`.

### Verify

12. Dispatch `review-verifier` with the review package (or, on the no-findings path, the candidate decision and residual risks). On `VERIFY: FAIL`, the verifier names exactly one `Fix target`; increment the repair-cycle counter on each `VERIFY: FAIL` and stop with `PR_REVIEW: VERIFY_FAIL` when a third failure would begin. Route repairs:
    - `orchestrator-decision`: reset the candidate from the verifier's issues, then re-run `review-verifier`.
    - `pr-context-collector`: repair the context packet, then re-run `finding-adjudicator` (with prior chunk findings), `comment-drafter` when findings exist, and `review-verifier`. Do not re-run chunk reviewers during repair.
    - `finding-adjudicator`: repair the named adjudication defect, then re-run `comment-drafter` when findings exist and `review-verifier`.
    - `comment-drafter`: repair the named comments, then re-run `review-verifier`.
13. Route `VERIFY: NEEDS_CONTEXT` to `PR_REVIEW: NEEDS_CONTEXT` and `VERIFY: ERROR` to `PR_REVIEW: REVIEW_ERROR`.

### Write

14. Dispatch `review-writer` only after `VERIFY: PASS`, with posting status `draft`. Route `WRITE: ERROR` to `PR_REVIEW: WRITE_ERROR`.
15. In `draft-only` mode, finish with `PR_REVIEW: VERIFIED_DRAFT_SAVED`.

### Post

16. In `post-after-confirmation` mode, build the preflight packet from the canonical review package: exact comment bodies, review decision, summary, line metadata, and dedup dispositions. Show the user the exact preview — including which comments post as new and which as thread follow-ups — and run `HUMAN_GATE_FINAL_PREVIEW_APPROVAL`.
17. If the user declines, re-dispatch `review-writer` in update mode to set the artifact's posting status to `cancelled`, then finish with `PR_REVIEW: VERIFIED_DRAFT_SAVED_POSTING_CANCELLED`.
18. On approval, dispatch `review-poster`. It posts all `new` comments as one atomic review event (REST `pulls/reviews`; or `../scripts/post-pr-review.sh` only for a summary-only review with zero line comments), posts each `follow-up` as a reply in its existing thread, and reads everything back. Resolution state cannot be changed through REST, so a follow-up to a resolved thread must say the issue appears unresolved and ask the author to reopen the thread.
19. Route `POST: PASS` to artifact update; route `POST: PREVIEW_REQUIRED`, `POST: AUTH`, `POST: METADATA_INVALID`, and `POST: ERROR` to `PR_REVIEW: POST_ERROR` with the poster's `Reason` and `Next step`, and update the artifact's posting status to `failed`.

### Artifact update

20. After `POST: PASS`, re-dispatch `review-writer` in update mode to set the artifact's posting status to `posted`, then finish with `PR_REVIEW: VERIFIED_REVIEW_POSTED`. If the update itself fails, still report the posted success but include the stale-artifact warning in `Notes`.

## Terminal Outcomes

Success:

```text
PR_REVIEW: VERIFIED_DRAFT_SAVED
PR_REVIEW: VERIFIED_DRAFT_SAVED_POSTING_CANCELLED
PR_REVIEW: VERIFIED_REVIEW_POSTED
```

Failure envelope:

```text
PR_REVIEW: AUTH | NOT_FOUND | NEEDS_CONTEXT | REVIEW_ERROR | VERIFY_FAIL | WRITE_ERROR | POST_ERROR
Reason: <one line>
Next step: <one clear action>
```

## Final Output Contract

Final success replies include:

```text
Review file: <OUTPUT_FILE>
Findings: <count or 0>
New comments: <count>
Follow-up replies: <count>
Review decision: <comment | request changes | approve>
Posting: <skipped | posted | cancelled>
Notes: <one-line residual risk or none>
```

## Dispatch Example

<example>
Re-run on a previously reviewed PR, `POSTING_MODE=post-after-confirmation`:

1. `pr-context-collector` → `CONTEXT: PASS`; dimensions `security`, `tests`; existing-comment digest lists 3 prior threads (1 resolved).
2. Two `chunk-reviewer` dispatches → 5 candidate findings.
3. `finding-adjudicator` → `ADJUDICATE: PASS`: 3 confirmed — 1 `new`, 2 `follow-up` (one to the resolved thread); 2 dropped with reasons.
4. `comment-drafter` → `COMMENTS: PASS`; the resolved-thread follow-up states the issue appears unresolved and asks the author to reopen.
5. `review-verifier` → `VERIFY: PASS`.
6. `review-writer` → `WRITE: PASS` (posting status `draft`).
7. Preview shows 1 new comment and 2 thread replies; user approves.
8. `review-poster` → `POST: PASS` (1 atomic review, 2 replies, read back).
9. `review-writer` update mode → posting status `posted`; `PR_REVIEW: VERIFIED_REVIEW_POSTED`.
</example>
