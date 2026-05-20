# Handoff Quality Checklist

> Read this file from `handoff-reviewer` after `document-assembler` returns.
> Keep raw artifact contents inside the reviewer context; return only verdicts,
> counts, and rerun targets to the orchestrator.

## Contents

- Review Inputs
- Final Document Gates
- Targeted Rerun Routing
- Review Summary Shape

## Review Inputs

`handoff-reviewer` receives these paths from the orchestrator:

- `TARGET_FILE` is required.
- `CONTEXT_FILE`, `INSIGHTS_FILE`, and `CLAIMS_FILE` are optional supporting
  paths for trace checks.

If `TARGET_FILE` is missing or unreadable, return `REVIEW: ERROR`.

## Final Document Gates

A valid handoff satisfies every gate:

| Gate                   | Pass condition                                                                                                                                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Required sections      | `TARGET_FILE` contains exactly these five major sections: `Original Instructions & Scope`, `Q&A Log`, `Observations & Insights`, `Unverified Claims & Validation Checklist`, `Open Questions & Recommended Next Steps` |
| Section purpose        | Every major section starts with a `**Fulfills:**` line                                                                                                                                                                 |
| Evidence               | Each insight includes rationale and concrete evidence                                                                                                                                                                  |
| Claims caution         | Section 4 includes either the validation directive from `CLAIMS_FILE` or the explicit no-tracking-files note                                                                                                           |
| Open questions         | Open questions are listed or explicitly marked resolved                                                                                                                                                                |
| Continuation readiness | A fresh agent can continue from `TARGET_FILE` without prior chat history                                                                                                                                               |
| Placeholders           | No template placeholders remain                                                                                                                                                                                        |

## Targeted Rerun Routing

Rerun the smallest stage set that can fix the failed gate:

| Failed gate                                        | Rerun                                                                       |
| -------------------------------------------------- | --------------------------------------------------------------------------- |
| Missing or unclear scope, amendments, or Q&A       | `context-extractor`, then `document-assembler`                              |
| Weak, duplicate, or unevidenced insights           | `insight-documenter`, optional `claim-validator`, then `document-assembler` |
| Missing claim statuses or incorrect counts         | `claim-validator`, then `document-assembler`                                |
| Missing sections, placeholders, or unreadable flow | `document-assembler` only                                                   |
| Multiple upstream artifact problems                | Rerun each failed upstream stage, then `document-assembler`                 |

Use at most three fix cycles. If the same gate fails after three cycles, stop
and report the blocker with the latest stage summaries.

## Review Summary Shape

Return a concise review summary to the orchestrator:

```text
REVIEW: PASS|FAIL|ERROR
File: <TARGET_FILE>
Failed gates: <count>
Rerun: <comma-separated subagents or none>
Open questions: <count or unknown>
Reason: <short reason>
```

If web sources were fetched, include one `External sources:` line. If web access
was unavailable, mention it only when it affected review.
