# Output Contract - Review Metadata Suggester

> Load at return time. The orchestrator uses reviewer and label fields in the
> preview.

## Template

```text
REVIEW_METADATA: PASS | NEEDS_REVIEWER | INVALID_LABELS | AUTH | ERROR
Reviewers: <reviewer list or none>
Reviewer source: user | CODEOWNERS | none
Labels: <label list or none>
Label source: platform-list | user-override | skipped | none
CODEOWNERS source: .github/CODEOWNERS | CODEOWNERS | none

Reason: none | <why status is not PASS>
Decision needed: none | <smallest user decision or recovery action>
```

## Codes

- `PASS`: at least one reviewer is resolved and labels are valid.
- `NEEDS_REVIEWER`: no user or CODEOWNERS reviewer is available.
- `INVALID_LABELS`: an override label is absent from platform labels.
- `AUTH`: platform tooling or credentials prevent lookup.
- `ERROR`: unexpected metadata failure.

## Example

<example>
REVIEW_METADATA: INVALID_LABELS
Reviewers: alice
Reviewer source: user
Labels: none
Label source: user-override
CODEOWNERS source: none

Reason: Label `doc` does not exist on the repository.
Decision needed: Ask the user to choose `documentation` or remove labels.
</example>
