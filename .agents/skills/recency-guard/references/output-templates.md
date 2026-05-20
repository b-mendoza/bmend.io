# Output Templates

> Read this file when assembling the final structured report inside a
> `recency-guard` subagent. Templates live here so subagent definitions stay
> focused on procedure.

Use the template as written for the matching subagent. Do not add fields
outside the template. Examples are intentionally compact; load external sources
only for methodology, not for report shape.

## RECENCY_CHECK Template

```text
RECENCY_CHECK: PASS | FAIL | TOOLS_MISSING | ERROR
Claims checked: <number>
High: <n> | Med: <n> | Low: <n>

Flagged claims:
1. Claim: "<quoted or paraphrased claim>"
   Issue: Outdated | Needs qualification | Unverified
   Best source: <source> | Tier <n> | <date or "undated">
   Confidence: High | Med | Low
   Action: Replace | Date-stamp | Qualify | Remove
   Suggested revision: "<revised wording>"

Verified summary:
- <count> claims required no changes
- <count> claims may need only light date context

Unresolved risks:
- <only if any remain>
```

If no claims are flagged, write `Flagged claims: None.` Only entries under
`Flagged claims` require edits.

### RECENCY_CHECK Example

<example>
RECENCY_CHECK: FAIL
Claims checked: 5
High: 3 | Med: 1 | Low: 1

Flagged claims:

1. Claim: "Framework X is on version 4.2."
   Issue: Outdated
   Best source: Framework X release notes | Tier 1 | 2026-03-19
   Confidence: High
   Action: Replace
   Suggested revision: "Framework X is on version 4.4 as of March 2026."

Verified summary:

- 4 claims required no changes
- 0 claims may need only light date context

Unresolved risks:

- None
  </example>

## CLAIM_REVIEW Template

Repeat the Claim block once per reviewed claim and omit unused slots.

```text
CLAIM_REVIEW: PASS | FAIL | TOOLS_MISSING | ERROR
Claims reviewed: <1-3>
High: <n> | Med: <n> | Low: <n>

Claim 1: "<one-sentence claim>"
Why selected: <why this matters to the user>
Best source: <source> | Tier <n> | <date or "undated">
Counterexample: None found | <brief exception or alternative view>
Failure modes: None | <comma-separated list>
Confidence: High | Med | Low
Action: No change | Qualify | Reframe | Add counterpoint | Remove
Suggested revision: "<only when action is not No change>"

Summary:
- Critical issues: <count of claims needing changes>
- Unresolved risks: <only if any remain>
```

Use `Action: No change` only when the claim is acceptable as written. If a
claim needs a caveat, softer framing, counterpoint, or removal, return
`FAIL` and give a suggested revision.

### CLAIM_REVIEW Example

<example>
CLAIM_REVIEW: FAIL
Claims reviewed: 1
High: 0 | Med: 1 | Low: 0

Claim 1: "Prisma is the best TypeScript ORM for new SaaS products."
Why selected: This is the user's likely decision point.
Best source: Prisma docs and release notes | Tier 1 | 2026-03-12
Counterexample: Drizzle can fit teams that want lighter abstractions and SQL-first control.
Failure modes: Overstating certainty, Opinion as fact
Confidence: Med
Action: Reframe
Suggested revision: "Prisma is a strong default for many greenfield TypeScript SaaS teams, while Drizzle can be a better fit for teams that prefer thinner abstractions and SQL-first workflows."

Summary:

- Critical issues: 1
- Unresolved risks: None
  </example>

## TOOLS_MISSING / ERROR Status Block

Use this block in either subagent when work cannot complete normally.
Replace `<REPORT_NAME>` with `RECENCY_CHECK` or `CLAIM_REVIEW`.

```text
<REPORT_NAME>: TOOLS_MISSING | ERROR
Reason: <what blocked the audit or review>
Last successful step: <one of the listed phases / none>
Claims affected: <number or "unknown">
```
