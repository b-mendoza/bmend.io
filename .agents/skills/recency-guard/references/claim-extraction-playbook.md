# Claim Extraction Playbook

> Read this file when selecting which claims a subagent should review. Use
> the categories below first; load `external-sources.md` only when a single
> high-stakes classification is genuinely ambiguous.

Both subagents extract claims, but for different purposes. Use the column
that matches your subagent.

## What To Extract

| For `recency-checker`              | For `claim-verifier`                               |
| ---------------------------------- | -------------------------------------------------- |
| Versions, releases, deprecations   | Core recommendations and "best" judgments          |
| Compatibility statements           | Comparisons across products or approaches          |
| Pricing, limits, included credits  | Quantitative claims with units or percentages      |
| Policy and availability            | Causal claims ("X improves Y")                     |
| Rankings, popularity, market share | Generalizations from one workload, region, or team |
| Benchmark numbers tied to a date   | Opinions framed as fact                            |

`recency-checker` aims for completeness across actionable claims.
`claim-verifier` aims for the **top 3 decision-shaping claims** the user is
most likely to act on.

## Failure Modes To Test (claim-verifier)

| Failure Mode                   | What It Looks Like                                           |
| ------------------------------ | ------------------------------------------------------------ |
| Overstating certainty          | Hedged source repackaged as a definite recommendation        |
| Causal leap                    | Correlation or anecdote framed as cause                      |
| Narrow-to-broad generalization | One benchmark, region, or team size used as a universal rule |
| Single-source anchoring        | Vendor or partisan source treated as neutral                 |
| Survivorship bias              | Visible winners cited without missing losers                 |
| Opinion as fact                | Personal preference written as objective conclusion          |

When a claim implies cause from observational data or names a logical
fallacy, consult `./external-sources.md` only if the misuse is not already
obvious.

## Edit Action Vocabulary

Both subagents return a recommended edit per flagged claim. Use one verb
per claim.

| Verb               | Use When                                                |
| ------------------ | ------------------------------------------------------- |
| `No change`        | The claim holds as written (claim-verifier only)        |
| `Replace`          | Current evidence contradicts the claim                  |
| `Date-stamp`       | The claim is true now but will rot quickly              |
| `Qualify`          | The claim is true within bounds the draft does not name |
| `Reframe`          | Wording overstates what the source supports             |
| `Add counterpoint` | A meaningful exception is missing                       |
| `Remove`           | Evidence is too weak or absent to support the claim     |

Prefer the smallest edit that makes the claim safe.
