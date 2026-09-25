# Claim Extraction Playbook

Read this file when building ledger rows or choosing which claims a subagent should review. Use the categories below first. For optional methodology background on a high-stakes classification that remains genuinely ambiguous, ask the orchestrator to load `./references/external-sources.md` from the skill progressive-disclosure map (do not chain-load sibling references from here).

## Claim Categories

| For `recency-checker` | For `claim-verifier` |
| --- | --- |
| Versions, releases, deprecations | Core recommendations and "best" judgments |
| Compatibility statements | Comparisons across products or approaches |
| Pricing, limits, included credits | Quantitative claims with units or percentages |
| Policy and availability | Causal claims such as "X improves Y" |
| Rankings, popularity, market share | Generalizations from one workload, region, or team |
| Benchmark numbers tied to a date | Opinions framed as objective fact |

Create a ledger row for every claim involving versions, releases, pricing, limits, policies, rankings, benchmarks, popularity, availability, compatibility, or actionable recommendations.

## Verifier Candidate Enumeration

`claim-verifier` must enumerate all candidate decision-shaping claims it sees. It deep-reviews only the highest-impact subset and lists every remaining candidate under `Unreviewed candidates`. The orchestrator records those rows as `unreviewed` unless it removes or qualifies them.

## Failure Modes To Test

| Failure Mode | What It Looks Like |
| --- | --- |
| Overstating certainty | Hedged source repackaged as a definite recommendation |
| Causal leap | Correlation or anecdote framed as cause |
| Narrow-to-broad generalization | One benchmark, region, team size, or use case treated as universal |
| Single-source anchoring | Vendor or partisan source treated as neutral |
| Survivorship bias | Visible winners cited without missing losers |
| Opinion as fact | Preference written as objective conclusion |

## Edit Action Vocabulary

Use one verb per claim. Report templates and the ledger use the same tokens. Ledger field `edit` stores these values; use `none` only when the claim needs no wording change (equivalent to a claim-verifier `none` action).

| Verb | Who may emit | Use When |
| --- | --- | --- |
| `none` | `claim-verifier` (and ledger after PASS) | The claim holds as written |
| `Replace` | `recency-checker` | Current evidence contradicts the claim |
| `Date-stamp` | `recency-checker` | The claim is true now but will rot quickly |
| `Qualify` | both | The claim is true only within bounds the draft does not name |
| `Reframe` | `claim-verifier` | Wording overstates what the source supports |
| `Add counterpoint` | `claim-verifier` | A meaningful exception is missing |
| `Remove` | both | Evidence is too weak or absent to support the claim |

Prefer the smallest edit that makes the claim safe. A claim that needs any date, scope, or uncertainty wording is not clean enough for an unqualified final answer.
