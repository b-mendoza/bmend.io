# Output Templates

Read this file when assembling a structured subagent report. Use the matching template as written and do not add fields outside it. Examples are compact by design; they illustrate shape, not source authority.

## RECENCY_CHECK Template

```text
RECENCY_CHECK: PASS | FAIL | TOOLS_MISSING | ERROR
Claims checked: <number>
High: <n> | Med: <n> | Low: <n>

Flagged claims:
1. Claim: "<quoted or paraphrased claim>"
   Issue: Outdated | Needs qualification | Unverified | Needs date context
   Best source: <source> | Tier <n> | <date or "undated">
   Confidence: High | Med | Low
   Action: Replace | Date-stamp | Qualify | Remove
   Suggested revision: "<revised wording grounded in the best source>"

Verified summary:
- <count> claims required no changes

Unresolved risks:
- <only if any remain, otherwise None>
```

If no claims are flagged, write `Flagged claims: None.` A `PASS` report means no claim needs any wording change, including light date context. If a claim needs a date stamp, status is `FAIL` and the claim appears under `Flagged claims`.

## RECENCY_CHECK Example

```text
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

Unresolved risks:
- None
```

## CLAIM_REVIEW Template

Repeat the Claim block once per reviewed claim and omit unused slots.

```text
CLAIM_REVIEW: PASS | FAIL | TOOLS_MISSING | ERROR
Claims reviewed: <number>
High: <n> | Med: <n> | Low: <n>

Claim 1: "<one-sentence claim>"
Why selected: <why this matters to the user>
Best source: <source> | Tier <n> | <date or "undated">
Counterexample: None found | <brief exception or alternative view>
Failure modes: None | <comma-separated list>
Confidence: High | Med | Low
Action: none | Qualify | Reframe | Add counterpoint | Remove
Suggested revision: "<only when action is not none>"

Unreviewed candidates:
- None | "<candidate claim>" - <why not deep-reviewed>

Summary:
- Critical issues: <count of reviewed claims needing changes>
- Unresolved risks: <only if any remain, otherwise None>
```

Use `Action: none` only when the claim is acceptable as written. If a claim needs a caveat, softer framing, counterpoint, or removal, return `FAIL` and give a suggested revision. Always include `Unreviewed candidates`; write `None` only when every candidate was deep-reviewed.

## CLAIM_REVIEW Example

```text
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

Unreviewed candidates:
- "Prisma has the best migration workflow" - lower impact than the overall ORM recommendation.

Summary:
- Critical issues: 1
- Unresolved risks: None
```

## TOOLS_MISSING / ERROR Status Block

Use this block in either subagent when work cannot complete normally. Replace `<REPORT_NAME>` with `RECENCY_CHECK` or `CLAIM_REVIEW`.

```text
<REPORT_NAME>: TOOLS_MISSING | ERROR
Reason: <what blocked the audit or review>
Last successful step: <one listed instruction step or none>
Claims affected: <number or "unknown">
```
