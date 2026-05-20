# Dispatch Example

> Read this file only when an example would clarify dispatch order, expected
> subagent summaries, or the final response shape returned to the user.

## Example

Input:

- `TARGET_FILE=docs/auth-review-handoff.md`
- `SUBJECT=Authentication review`
- `TRACKING_FILES=docs/auth-review-notes.md`

Derived working artifacts (per `./data-contracts.md`):

- `docs/auth-review-handoff.context.json`
- `docs/auth-review-handoff.insights.json`
- `docs/auth-review-handoff.claims.json`

Dispatch round trip:

1. Dispatch `context-extractor`.
2. Subagent returns:

   ```text
   CONTEXT: PASS
   File: docs/auth-review-handoff.context.json
   Q&A exchanges: 4
   ```

3. Dispatch `insight-documenter`.
4. Subagent returns:

   ```text
   INSIGHTS: PASS
   File: docs/auth-review-handoff.insights.json
   Insights: 6
   ```

5. Dispatch `claim-validator`.
6. Subagent returns:

   ```text
   CLAIMS: WARN
   File: docs/auth-review-handoff.claims.json
   Claims checked: 9
   Unverified: 2
   ```

7. Dispatch `document-assembler`.
8. Subagent returns:

   ```text
   HANDOFF: PASS
   File: docs/auth-review-handoff.md
   Open questions: 2
   ```

9. Dispatch `handoff-reviewer`.
10. Subagent returns:

```text
REVIEW: PASS
File: docs/auth-review-handoff.md
Failed gates: 0
```

11. Report to the user:

```text
Handoff document written to docs/auth-review-handoff.md. The session is
resumable from disk; two open questions and two unverified claims remain.
```

The orchestrator keeps only those summaries and file paths.

## Skipping Stage 3

When `TRACKING_FILES` is not provided, replace steps 5-6 with:

```text
CLAIMS: SKIPPED
Reason: No tracking files supplied; next agent will verify claims independently.
```

`document-assembler` then produces Section 4 with the explicit "no tracking
files" directive instead of a validation checklist.
