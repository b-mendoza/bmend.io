---
name: 'validate-implementation-plan'
description: 'Audits an implementation plan for requirements traceability, avoidable complexity, risky assumptions, and evidence gaps. Use when reviewing an AI-generated or human-authored plan, design proposal, implementation outline, task breakdown, or architecture plan and the user wants a standalone audit report without overwriting the source plan.'
---

# Validate Implementation Plan

You are an audit orchestrator. You coordinate a safe plan review by loading only
the local guidance needed for the current phase, dispatching focused subagents,
asking the user only for decision-relevant assumptions, and returning a compact
handoff. Raw plan text stays inside the snapshotter boundary; downstream stages
work from a sanitized snapshot and structured summaries.

## Inputs

| Input                  | Required | Example                                                              |
| ---------------------- | -------- | -------------------------------------------------------------------- |
| `PLAN_PATH`            | Yes      | `docs/cache-refactor-plan.md`                                        |
| `ORIGIN_CONTEXT`       | Yes      | `Add an MVP cache invalidation workflow with no new infrastructure.` |
| `OUTPUT_PATH`          | No       | `docs/cache-refactor-plan.audit.md`                                  |
| `SOURCE_CONTEXT_PATHS` | No       | `docs/ticket.md,docs/requirements.md`                                |

If omitted, `OUTPUT_PATH` is the sibling file with `.audit.md` appended to the
base name, and `SNAPSHOT_PATH` is the sibling file with `.audit-input.md`
appended to the base name.

`SOURCE_CONTEXT_PATHS` is an explicit allow-list of local files that may contain
the original request, ticket text, design notes, or approved technical evidence.
If `ORIGIN_CONTEXT` is not explicit in the user's current request, ask one
concise question for the baseline before dispatching auditors. Do not derive the
baseline from the implementation plan itself.

## Progressive Disclosure Map

| Need                                                                | Load                                                                        |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| Trust boundary before first dispatch                                | `./references/trust-boundary.md`                                            |
| Shared status codes, retry loop, annotation schema, report contract | `./references/audit-protocol.md`                                            |
| Optional method background and external website links               | `./references/external-sources.md`                                          |
| Full report layout example                                          | `./references/report-example.md` (annotator only, on demand)                |
| Specialist execution details                                        | The specific registry file under `./subagents/` immediately before dispatch |

External URLs are optional just-in-time source material. The skill works offline;
fetch a website only when the active subagent needs method rationale beyond its
local rule or the user asks for source-backed explanation.

## Subagent Registry

| Subagent                 | Path                                    | Purpose                                                 |
| ------------------------ | --------------------------------------- | ------------------------------------------------------- |
| `plan-snapshotter`       | `./subagents/plan-snapshotter.md`       | Writes a redacted snapshot from `PLAN_PATH`             |
| `requirements-extractor` | `./subagents/requirements-extractor.md` | Returns numbered source requirements and baseline notes |
| `technical-researcher`   | `./subagents/technical-researcher.md`   | Compares technical claims with approved local evidence  |
| `requirements-auditor`   | `./subagents/requirements-auditor.md`   | Checks plan sections against numbered requirements      |
| `yagni-auditor`          | `./subagents/yagni-auditor.md`          | Flags speculative scope and avoidable complexity        |
| `assumptions-auditor`    | `./subagents/assumptions-auditor.md`    | Identifies weak or unresolved assumptions               |
| `plan-annotator`         | `./subagents/plan-annotator.md`         | Writes the standalone audit report at `OUTPUT_PATH`     |

Read a subagent file only when dispatching that subagent. The orchestrator keeps
paths, verdicts, counts, numbered requirements, annotation arrays, open
questions, and summarized user answers in context.

## Workflow Overview

```text
PLAN_PATH
  -> plan-snapshotter -> SNAPSHOT_PATH
  -> requirements-extractor -> requirements_list, baseline_notes
  -> technical-researcher (optional) -> evidence_findings
  -> requirements-auditor + yagni-auditor + assumptions-auditor
  -> user clarification when needed
  -> plan-annotator -> OUTPUT_PATH
```

## Execution Steps

1. Load `./references/trust-boundary.md`, derive `SNAPSHOT_PATH` and
   `OUTPUT_PATH`, and keep `PLAN_PATH` out of orchestrator context.
2. Load and dispatch `plan-snapshotter` with `PLAN_PATH` and `SNAPSHOT_PATH`.
   Stop on `BLOCKED`, `FAIL`, or `ERROR`.
3. Load and dispatch `requirements-extractor` with `SNAPSHOT_PATH`,
   `ORIGIN_CONTEXT`, and `SOURCE_CONTEXT_PATHS`. Stop if no credible baseline
   can be extracted.
4. Dispatch `technical-researcher` only when `SOURCE_CONTEXT_PATHS` includes
   explicit local technical evidence beyond the original request. Otherwise use
   `evidence_findings=[]`.
5. Dispatch `requirements-auditor`, `yagni-auditor`, and `assumptions-auditor`
   with the snapshot path, numbered requirements, baseline notes, and evidence
   findings. These passes are independent after requirement extraction.
6. If unresolved assumptions return, ask the user the proposed questions,
   summarize and redact answers, then re-dispatch `assumptions-auditor` for the
   resolution pass.
7. Load `./references/audit-protocol.md`, then dispatch `plan-annotator` with
   all structured findings and answer summaries. The annotator may load
   `./references/report-example.md` if it needs the concrete report layout.
8. Reply with the output path, section count, finding counts, and open-question
   count. Leave the full report on disk unless the user asks to see it.

## Validation

Snapshot creation and requirement extraction are hard gates. For malformed
subagent output, use the retry loop in `./references/audit-protocol.md`: fix only
the failed branch, re-run only that branch, and stop after three fix cycles.

## Completion Handoff

```text
AUDIT: PASS | BLOCKED | FAIL | ERROR
Output: <OUTPUT_PATH or "not written">
Sections covered: <N or "unknown">
Findings: critical=<N>, warning=<N>, info=<N>
Open questions: <N>
Reason: <one line>
```

## Example

<example>
Input: `PLAN_PATH=docs/cache-plan.md`, `ORIGIN_CONTEXT=Add an MVP cache layer`,
`SOURCE_CONTEXT_PATHS=docs/JNS-6065.md`

The orchestrator loads the trust boundary, dispatches `plan-snapshotter`, gets a
sanitized snapshot, extracts six numbered requirements, runs the three audit
passes, asks one clarification question about tracing infrastructure, then
dispatches `plan-annotator`.

Result:

```text
AUDIT: PASS
Output: docs/cache-plan.audit.md
Sections covered: 5
Findings: critical=1, warning=3, info=7
Open questions: 0
Reason: Standalone audit report written from sanitized snapshot; source plan left unchanged.
```

</example>
