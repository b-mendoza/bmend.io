# Contract: pr-drafter

Return exactly one status block. The body may be multi-line Markdown; keep it grounded in `DIFF_ANALYSIS` or exact overrides.

```text
PR_DRAFT: <PASS | NEEDS_CHOICE | ERROR>
Title: <title | unavailable>
Title source: <override | generated>
Body source: <override | generated>
Type choice: <resolved type | ambiguous | override>
Scope choice: <resolved scope | ambiguous | none | override>
Traceability notes:
- <body/title claim -> diff fact or override>
Body:
<markdown body>
Reason: <one line>
Decision needed: <none | choose type | choose scope | choose type and scope | next action>
```

Use `NEEDS_CHOICE` only when the type or scope materially affects the title/body. Use `ERROR` when required diff facts are missing or contradictory.
