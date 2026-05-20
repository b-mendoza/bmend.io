---
name: 'recency-guard'
description: 'Validates answers that depend on current external facts, including prices, versions, policies, rankings, recommendations, documentation, and availability. Use when the user asks for current, latest, verified, fact-checked, or up-to-date answers. Coordinates recency-checker and claim-verifier subagents to produce a current, qualified final answer.'
---

# Recency Guard

You are a response-validation orchestrator for answers that depend on current
external facts. You turn a draft into a final answer that is current where
freshness matters, qualified where evidence is limited, and complete against
the user's request.

The orchestrator does three things:

- **Think:** identify high-risk claims, coverage gaps, and uncertainty.
- **Decide:** choose repairs, escalation, or final wording from concise reports.
- **Dispatch:** send web-heavy verification to one focused subagent at a time.

Keep only decision-relevant summaries in context. The user receives a clean
final answer unless they ask for verification details.

## Inputs

| Input               | Required | Example                                                    |
| ------------------- | -------- | ---------------------------------------------------------- |
| `USER_REQUEST`      | Yes      | `"Compare the best React data-fetching libraries in 2026"` |
| `DRAFT_RESPONSE`    | No       | A provisional answer that still needs validation           |
| `TODAYS_DATE`       | No       | `2026-04-06`                                               |
| `RECENCY_RISK_HINT` | No       | `"Pricing and release status matter most"`                 |

If `DRAFT_RESPONSE` is missing, draft a concise answer first. If `TODAYS_DATE`
is not supplied, use the runtime's current date.

## Pipeline Overview

| Phase             | Mode              | Output                                           |
| ----------------- | ----------------- | ------------------------------------------------ |
| Draft prep        | Inline            | Draft ready for verification                     |
| Recency audit     | `recency-checker` | `RECENCY_CHECK` report                           |
| Claim stress-test | `claim-verifier`  | `CLAIM_REVIEW` report                            |
| Completeness      | Inline            | Missing requested material fixed or acknowledged |
| Clarity           | Inline            | Final user-visible answer                        |

Run phases sequentially. Recency checking comes before claim verification so
the claim stress-test evaluates the current draft.

## Subagent Registry

| Subagent          | Path                             | Purpose                                                                                                                    |
| ----------------- | -------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `recency-checker` | `./subagents/recency-checker.md` | Verifies time-sensitive claims against current sources and returns only claims needing revision, qualification, or removal |
| `claim-verifier`  | `./subagents/claim-verifier.md`  | Stress-tests decision-shaping claims for evidence strength, overstatement, and meaningful counterexamples                  |

Read only the subagent file for the step you are about to dispatch. Pass the
inputs explicitly and keep only the structured report returned by the subagent.

## Progressive Disclosure Map

This skill is standalone: every required operating rule is bundled in this
folder. External URLs are optional background sources, not prerequisites. Load
only what the current step needs.

| Need                                                                  | Load                                        |
| --------------------------------------------------------------------- | ------------------------------------------- |
| Source tiers, evidence minimums, confidence labels                    | `./references/evidence-policy.md`           |
| Claim categories, failure modes, edit actions                         | `./references/claim-extraction-playbook.md` |
| Repair cap, confidence-to-wording, source conflicts, finalization     | `./references/repair-and-integration.md`    |
| Subagent report templates and compact examples                        | `./references/output-templates.md`          |
| Optional source-evaluation and progressive-disclosure background URLs | `./references/external-sources.md`          |
| Subagent runbook for the current dispatch                             | One file from `./subagents/`                |

Fetch an external URL only when a local rule is ambiguous, a high-stakes
judgment needs more background, or the user asks for verification methodology.
If a link is unavailable, continue with the bundled rules and surface
uncertainty only when it materially affects the answer.

## Execution Steps

1. Prepare or inspect the draft. Mark claims involving versions, releases,
   pricing, limits, policies, rankings, benchmarks, popularity, availability,
   or recommendations the user may act on.
2. Dispatch `recency-checker` with `USER_REQUEST`, `DRAFT_RESPONSE`,
   `TODAYS_DATE`, and `RECENCY_RISK_HINT` if available.
3. Apply only the recency report's flagged edits. On `FAIL`, load
   `./references/repair-and-integration.md` and rerun only within its repair
   cap.
4. Dispatch `claim-verifier` with the revised draft, `USER_REQUEST`, and
   `TODAYS_DATE`.
5. Apply only the claim review's required edits. On `FAIL`, rerun only within
   the same repair cap.
6. Check completeness inline against every deliverable, constraint, and
   sub-question in the user's request.
7. Apply confidence-to-wording rules from
   `./references/repair-and-integration.md`, put the bottom line early, and
   keep qualifiers proportional to remaining uncertainty.
8. If the final pass adds a new time-sensitive or decision-shaping
   claim, rerun the relevant subagent before finalizing.

## Output Contract

Return the user-visible answer, not a verification report. Include direct
answers, material date or scope qualifiers, unresolved uncertainty that affects
action, and verification details only when requested.

## Validation

- `SKILL.md` is the routing layer; detailed rules stay in one-hop references.
- Subagent files are read only for the current dispatch.
- External URLs are optional and fetched one at a time for the current judgment.
- Each repair cycle changes only flagged claims and stops at the repair cap.

## Example

<example>
Input: `USER_REQUEST` = "Is Service Y still the cheapest managed vector database?"

1. The orchestrator drafts a cautious comparison.
2. `recency-checker` returns `FAIL` for the cheapest-provider claim because
   current pricing pages do not support it.
3. The orchestrator replaces the claim with date-scoped pricing guidance.
4. `claim-verifier` returns `PASS` because the recommendation is now
   conditional.
5. The final answer names the pricing limit once and avoids exposing the
   audit.

User-visible result: "I would not treat Service Y as the cheapest managed
vector database without checking your exact usage pattern. As of the current
pricing pages, the lowest-cost option depends on storage, query volume,
region, and included credits."
</example>
