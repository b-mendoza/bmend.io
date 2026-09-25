# Workflow Examples

Load this file only when the orchestrator or user needs concrete examples of dispatch, the plan card, warning handoffs, or failure cleanup.

## Plan Approval Card

All user decisions — steps, waivers, non-`safe` commands, conflicts, unanalyzed dimensions — are batched into this single card.

```text
Plan approval required before mutation.

Diagnosis (from chunk analysis):
- D1 [duplication-reuse]: roundMoney in calculate.ts duplicates
  src/shared/money.ts:roundCurrency.
- D2 [complexity-idiom]: calculateInvoice nests discount rules three levels
  deep inside formatting orchestration.

Ordered steps:
- S1: Delete local roundMoney; reuse src/shared/money.ts:roundCurrency;
  traces to D1; reuse rung: reuse-repo.
- S2: Extract private discount helper with guard clauses; traces to D2;
  reuse rung: new-code (smallest form).

Files to change or create:
- Change: src/invoice/calculate.ts
- Create: none
(Adding any file not listed here later requires re-approval.)

Expected outcome:
- Net lines: about -18
- Duplication removed: 1 helper; introduced: none

Size plan:
- src/invoice/calculate.ts: 214/250, within limit

Batched decisions requiring your approval:
- Size waivers: none
- Non-safe commands: none
- Unanalyzed dimensions: none

Validation contract:
- npm test -- invoice
- Safety class: safe

Non-goals:
- Preserve all protected surfaces per `references/protected-surfaces.md`.

Decision: approve, adjust, or decline.
```

## Dispatch Round Trip

```text
1. Orchestrator dispatches behavior-mapper with TARGET_PATH, USER_GOAL,
   TEST_COMMAND, SCOPE_LIMITS, and MAX_LINES.
2. Mapper returns BEHAVIOR_MAP: PASS with baseline, candidates, sizes, risks,
   and proposed chunks: duplication-reuse, complexity-idiom.
3. Orchestrator dispatches two chunk-analysts concurrently, each with CHUNK,
   BEHAVIOR_MAP, and its own REPORT_PATH under .handoffs/refactoring-code/.
   (Serial fallback: dispatch them one after another with identical contracts.)
4. Both return CHUNK_ANALYSIS: PASS with findings counts; the orchestrator
   reads the report files, merges findings, and synthesizes one plan card.
5. Plan approval gate: user approves the card.
6. Orchestrator dispatches refactor-implementer with the approved card.
7. Implementer returns IMPLEMENTATION: PASS_WITH_WARNINGS because zero tests
   ran (command matched no tests).
8. Reviewer verifies both verdicts and the warning; returns
   REFACTOR_REVIEW: PASS with the warning noted.
9. Orchestrator returns PASS_WITH_WARNINGS, not PASS, and deletes the
   .handoffs/refactoring-code/ artifacts.
```

## PASS_WITH_WARNINGS Handoff Skeleton

```text
Status: PASS_WITH_WARNINGS

Warning: validation command exited 0 but matched zero tests, so validation is
recorded as not run.

1. Current behavior summary: <summary>
2. Diagnosis: <chunk findings that drove the plan>
3. Code changes made: <files, summaries, dispositions>
4. Reuse and deletion summary: net lines, duplication removed vs introduced,
   reuse-ladder rungs used
5. Validation note: command, exit code, coverage evidence, baseline
   checkpoint result, pre-existing failures if any
6. Review outcome: behavior verdict, simplification verdict, fix cycles used
   (n of 2), Minor notes passed through
7. File-size compliance: per-file lines, waivers, mechanical-edit exemptions
8. Worktree end-state: changed/created files left uncommitted; no commits
   made; suggested commit boundary versus pre-existing dirty files
9. Disclosures: dispatch method, AUTO_APPROVE if used, retries, unanalyzed
   dimensions if any
```

## Failure Cleanup Block

```text
Worktree state after stop:
- src/invoice/calculate.ts: edited-from-clean. Refactor-only file; safe manual
  revert option: git checkout -- src/invoice/calculate.ts
- src/invoice/config.ts: edited-over-pre-existing. Manual review required before
  reverting because user changes existed at baseline.

The workflow never auto-reverts. It reports scoped guidance so the user can
choose the recovery action.
```

## No-Change Recommendation

```text
Mapper reports NO_CHANGE_CANDIDATE:
- Target has one responsibility and is under MAX_LINES.
- Existing tests cover the requested behavior.
- The requested simplification would introduce a new abstraction without
  current pressure (fails the deletion test).

Terminal: NO_CHANGE, with this recommendation in the handoff.
If the user explicitly asks to proceed anyway, record their objective and
continue to chunk analysis.
```

## Autonomous Run (`AUTO_APPROVE=true`)

```text
Clean card (no waivers, safe command, no carve-outs):
- Plan gate auto-accepts; the run proceeds to implementation and review
  without interruption; the final handoff discloses AUTO_APPROVE.

Card needing a decision (e.g. a size waiver):
- The run ends NEEDS_CLARIFICATION with the full card in the handoff; nothing
  was mutated.

Reviewer requires a fix outside the approved card:
- The fix-scope re-approval gate cannot auto-accept; the run ends BLOCKED
  with worktree state disclosed.
```
