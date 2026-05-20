# Output Contract - Diff Analyzer

> Load at return time. Keep raw patches inside the subagent; return this concise
> summary only.

## Template

```text
DIFF_ANALYSIS: PASS | LARGE_PR_CONFIRMATION_REQUIRED | EMPTY_DIFF | ERROR
Range: origin/<target_branch>...origin/<current_branch>
Shortstat: <insertions/deletions summary or none>
Changed files:
- <path or grouped area>

Diff summary:
- <grounded behavior or structural change>

Conventional type candidates:
- <type>: <rationale>

Scope candidates:
- none | <scope>: <rationale>

Tests:
- none | <test files or test-relevant changes>

Risk notes:
- none | <risk or migration note>

Reason: none | <why status is not PASS>
Decision needed: none | <smallest confirmation or recovery action>
```

## Codes

- `PASS`: meaningful diff and size gate satisfied.
- `LARGE_PR_CONFIRMATION_REQUIRED`: size or mixed-purpose gate needs approval.
- `EMPTY_DIFF`: no commits or no meaningful diff against the target.
- `ERROR`: unexpected analysis failure.

## Example

<example>
DIFF_ANALYSIS: LARGE_PR_CONFIRMATION_REQUIRED
Range: origin/main...origin/feat/billing-export
Shortstat: 38 files changed, 1460 insertions(+), 210 deletions(-)
Changed files:
- api/billing export endpoints
- frontend billing settings
- docs export workflow

Diff summary:

- Export API, UI, and documentation changed in one branch.

Conventional type candidates:

- feat: adds a new export capability

Scope candidates:

- billing: most changed files are billing-related

Tests:

- billing export API tests changed

Risk notes:

- Large mixed surface may be hard to review as one PR.

Reason: Size gate exceeded and the branch spans API, UI, and docs.
Decision needed: Ask whether to proceed with one large PR or split it.
</example>
