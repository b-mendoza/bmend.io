# Output Contract - PR Drafter

> Load at return time. The orchestrator uses title, body, and source attribution
> for the preview.

## Template

```text
PR_DRAFT: PASS | NEEDS_CHOICE | ERROR
Title: <title or none>
Type: <type or needs-choice>
Scope: none | <scope or needs-choice>

Body:
<body or none>

Sources used:
- diff analysis
- title override | body override | none

Reason: none | <why status is not PASS>
Decision needed: none | <smallest user choice or recovery action>
```

## Codes

- `PASS`: grounded title and body are ready for preview.
- `NEEDS_CHOICE`: type or scope ambiguity needs a user choice.
- `ERROR`: unexpected drafting failure.

## Example

<example>
PR_DRAFT: PASS
Title: docs(skills): strengthen pr creation workflow
Type: docs
Scope: skills

Body:

## Summary

This updates the PR creation skill so execution-heavy work is delegated to
focused subagents. The workflow keeps the user in control of push, preview, and
create gates while reducing raw git and diff output in the orchestrator.

## Key Changes

- Adds subagent routing for state inspection, preflight, diff analysis,
  drafting, metadata, and submission.
- Preserves explicit preview approval before creating the PR.

## Impact

- PR creation runs with clearer phase boundaries and less context pollution.
- No runtime migration is required for existing skill consumers.

Sources used:

- diff analysis
- none

Reason: none
Decision needed: none
</example>
