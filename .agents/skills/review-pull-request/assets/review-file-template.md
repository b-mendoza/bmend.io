# Review File Template

> Read this file only from `review-writer` while assembling `OUTPUT_FILE`. Preserve verified findings, comments, metadata, sources, and suggestion blocks exactly.

The review file must stand alone without chat context. It is findings first, concise, and explicit about dimensions reviewed, residual risks, and posting status. The posting-status vocabulary is exactly `draft`, `posted`, `cancelled`, `failed`; `review-writer` update mode rewrites that value after the posting decision.

## With Findings

````markdown
# PR <number> Review

PR: <PR_URL> Dimensions reviewed: <comma-separated dimension names>

## Findings

### 1. [<severity>] <finding title>

- Finding ID: `<id>`
- File/line: `<path>:<line-or-range>`
- Evidence: <specific evidence with path:line>
- Impact: <why this matters>
- Fix: <minimal fix>
- External sources: <URL(s) backing external-fact claims, or none>
- Dedup: <new | follow-up (thread <comment id>, <resolved | unresolved | unknown>)>
- Line metadata: `path=<path>`, `line=<line>`, `side=<RIGHT|LEFT>`, `start_line=<line-or-none>`, `start_side=<side-or-none>`

Draft PR comment:

<self-contained comment body>

Suggestion:

```suggestion
<suggested patch, only when verified safe>
```

Or: `Suggestion: none`

## Review Decision

<comment | request changes | approve> because <short rationale>.

## Verification Notes

- Residual risks: <risks or none>
- Posting status: <draft | posted | cancelled | failed>
````

## No Findings

Use `approve` when residual risks do not block approval; otherwise use `comment` so the review can report residual risks without approving the pull request.

```markdown
# PR <number> Review

PR: <PR_URL> Dimensions reviewed: <comma-separated dimension names>

## Findings

No findings.

## Review Decision

<approve | comment> because <short rationale>.

## Residual Risks

- <risk, testing gap, unavailable context, or none>

## Verification Notes

- Sources checked: <diff, files, CI, issue, docs, URLs>
- Posting status: <draft | posted | cancelled | failed>
```

## Required Post-Write Check

After writing the file, confirm these sections exist:

- `## Findings`
- `## Review Decision`
- `## Verification Notes`
- `## Residual Risks` when there are no findings
