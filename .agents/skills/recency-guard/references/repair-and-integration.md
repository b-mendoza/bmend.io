# Repair And Integration Policy

> Read this file when a subagent has returned, when applying edits, or when
> finalizing wording. The orchestrator uses this file; subagents do not.

## Repair Cap

Use targeted repair cycles instead of rerunning the whole pipeline. Keep only
the latest concise verdict and unresolved risks in orchestrator context.

| Subagent Status | Orchestrator Action                                                                                        |
| --------------- | ---------------------------------------------------------------------------------------------------------- |
| `PASS`          | Continue to the next phase                                                                                 |
| `FAIL`          | Fix the flagged claims only, then rerun that subagent on the updated draft                                 |
| `TOOLS_MISSING` | Keep only supportable claims and qualify freshness limits where they affect the answer                     |
| `ERROR`         | Retry once with the same inputs; if it repeats, keep conservative wording and surface material uncertainty |

Run the initial review once, then use at most **2 targeted reruns per
subagent** for the same draft. If material uncertainty remains after the
cap, state it plainly in the final answer.

## Confidence To Wording

| Confidence | Treatment In Final Answer                                                                                |
| ---------- | -------------------------------------------------------------------------------------------------------- |
| `High`     | State the claim directly, no caveat needed                                                               |
| `Med`      | Add light context such as `as of <date>` or `based on current documentation` when context affects action |
| `Low`      | Remove, replace, or explicitly mark uncertain                                                            |

When `recency-checker` and `claim-verifier` review the same claim, **apply
the stricter result.** A claim that is current but overstated is not
acceptable.

## Source Conflicts

Mention a source conflict to the user only when it materially changes the
recommendation. Otherwise, pick the highest-tier supporting source and
apply the corresponding confidence label.

## Finalization Checklist

1. Bottom line first; remove filler.
2. Qualifiers proportional to remaining uncertainty.
3. Concrete wording preserved where the user must act.
4. Verification details kept internal unless the user asks.
5. If the user asks for verification reasoning, summarize the final
   claim-level findings rather than the raw audit trail.
