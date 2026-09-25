# Investigation Guide

Use this reference when collecting evidence or analyzing hypotheses. It defines source classification, evidence quality, causal-chain construction, and intermittent-failure handling.

## Evidence Discipline

Treat every input as a claim to verify. Every load-bearing conclusion needs a named source and a minimal excerpt. Keep facts, assumptions, hypotheses, and unresolved gaps separate.

Strong evidence usually has all of these properties: current for the affected version, from the failing environment or a faithful reproduction, directly connected to the observed symptom, and consistent with other artifacts. Weak evidence may still be useful, but it must be labeled.

## Source Classification

| Source | Primary signals | Minimum useful evidence |
| --- | --- | --- |
| `runtime` | Crash, regression, incorrect behavior, local or production symptom | Error boundary, affected version, relevant code/config path, reproduction or trace result |
| `CI/CD` | Failed workflow, pipeline, deployment job, build/test failure | Platform, job/step name, failing command, log excerpt, workflow/config, relevant commit or dependency delta |
| `user-report` | Human-described issue, often underspecified | Reproduction steps, environment, expected vs actual behavior, affected version, examples or screenshots when available |

Classifications are provisional. If evidence points elsewhere, revise the classification and record why.

## Collection Pattern

1. Identify the symptom boundary: what failed, where, and when.
2. Anchor the timeline: recent commits, dependency changes, config changes, environment changes, or rollout events.
3. Compare expected and actual behavior.
4. Trace from symptom toward mechanism using named sources.
5. Capture opposing evidence and contradictions instead of hiding them.
6. Stop collection when the next useful artifact requires Tier C access and return the appropriate verdict.

## Causal Chain

Build chains in this shape:

```text
Trigger -> Contributing conditions -> Mechanism -> Observed symptom
```

Each link must be evidence-backed or explicitly labeled as an assumption. Do not stop at the first visible symptom, such as "test failed" or "service crashed". Explain why the recommended fix addresses the cause rather than only masking the symptom.

## Hypothesis Handling

Rank hypotheses by explanatory power, evidence quality, and ability to account for opposing evidence. Do not force a single cause. Compound causes are valid when each cause is supported and their interaction explains the failure better than either alone.

## Intermittent Failures

When flakiness, timing, ordering, race conditions, resource pressure, or load sensitivity are plausible:

1. Run a safe reproduction multiple times only when the action is Tier A or Tier B and bounded.
2. Use a small fixed count, such as 3 to 5 runs, and record the count, failures, passes, and correlated conditions.
3. Treat "did not reproduce in N runs" as a bounded observation, not proof that the failure is invalid.
4. Mark hypotheses consistent with intermittent behavior, such as race, ordering, timeout, resource exhaustion, or shared-state leakage.
5. Recommend validation that measures frequency, not just one pass/fail attempt.

## Common RCA Failure Modes

Avoid these mistakes: repeating the user report as fact, citing logs without excerpts, ignoring version mismatch, confusing correlation with mechanism, declaring `ready` at low confidence, flattening jointly sufficient causes into one cause, and hiding evidence gaps behind vague language.
