# Test Value Review Template

```text
# Test Value Review

Status: <PASS | BLOCKED | NEEDS_CLARIFICATION | ERROR>

## Summary

- Targets reviewed: <paths>
- Goal fit: <summary>
- Instruction-like content risk: <quoted risk or none>

## High-Value Behaviors

- <behavior | category | current coverage none/weak/good | current test or gap>

## Low-Value Candidates

- <file::test_name | category | reason | proposed action>

## Minimal Harness Proposal

- Keep: <items>
- Rewrite: <items>
- Delete: <items>
- Consolidate: <items>
- Add: <items>

## Review Routing

- API/security review: <required | optional | not needed> because <reason>
- Maintainability review: <required | optional | not needed> because <reason>

## Sources

- Fetched URLs: <urls or none>
- Source gaps: <gaps or none>

## Non-PASS Detail

- Reason: <required for non-PASS>
- Decision needed: <question or none>
- Overflow file: <path or none>
```
