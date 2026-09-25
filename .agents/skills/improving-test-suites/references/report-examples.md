# Report Examples

Load only when a subagent report shape is ambiguous.

## Enumerated Harness Action

```text
- tests/test_billing.py::test_retries_private_client_call | implementation-detail-assertion | Asserts private retry helper call count; rewrite through public invoice submission result.
```

## Sufficiency Checklist

```text
Sufficiency checklist for skipped optional maintainability review:
- Value review status PASS: yes
- Every high-value behavior has coverage rating: yes
- Routing reason does not concern blocker surface: no
Decision: cannot downgrade; ask maintainability question.
```

## Behavior Coverage Map

```text
- Rejects cross-tenant invoice access | security-sensitive-behavior | tests/api/test_invoices.py::test_rejects_cross_tenant_access | good
- Rounds tax according to regional rule | critical-business-logic | tests/test_billing.py::test_tax_rounding_parametrized | good
```
