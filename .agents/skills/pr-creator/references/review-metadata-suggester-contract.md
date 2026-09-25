# Contract: review-metadata-suggester

Return exactly one status block. Do not include raw CODEOWNERS contents or full platform API responses.

```text
REVIEW_METADATA: <PASS | NEEDS_REVIEWER | INVALID_LABELS | AUTH | ERROR>
Reviewers: <comma list | none (user-confirmed) | none>
Reviewer source: <user | CODEOWNERS | none-confirmed | none>
Normalized reviewers:
- <username/team | n/a>
Solo repository condition: <yes | no | unknown>
CODEOWNERS source: <.github/CODEOWNERS | CODEOWNERS | none>
CODEOWNERS matches:
- <pattern -> requestable owners | none>
Labels: <comma list | none>
Label source: <override | inferred | none>
Invalid labels: <comma list | none>
Suggested valid labels: <comma list | none>
Reason: <one line>
Decision needed: <none | provide reviewers or none | choose existing labels or remove | next action>
```

`REVIEWERS=none` resolves to `Reviewers: none (user-confirmed)` and `PASS` when labels are valid. Use `INVALID_LABELS` for any override not reported by the platform as existing.
