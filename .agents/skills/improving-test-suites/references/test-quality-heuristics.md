# Test Quality Heuristics

Load before classifying tests or synthesizing the minimal harness.

## Core Principle

Treat tests as executable contracts, not coverage inventory. Prefer tests that fail for real breaks in public behavior, schema validation, security behavior, meaningful failure handling, or production-relevant edge cases.

## Priority Order

Lower priorities never override higher priorities.

1. Public contracts and production-relevant behavior.
2. Schema validation, security-sensitive behavior, and meaningful failure handling.
3. Realistic edge cases and compatibility commitments.
4. Readability, fixture design, and parametrization.
5. Coverage metrics.

## Low-Value Categories

Use these category names verbatim.

| Category | Use when |
| --- | --- |
| `implementation-detail-assertion` | The test protects private call order, private state, internal layout, or refactor-sensitive structure rather than public behavior |
| `duplicated-coverage` | Another test covers the same rule, input class, and failure mode with equal or better signal |
| `trivial-assertion` | The test checks constants, bare construction, getters, or framework wiring with no real behavior risk |
| `unstable-mock` | The test depends on incidental mock order, call count, or collaborator shape rather than observable output |
| `over-specific-fixture` | Incidental fixture shape hides the rule or makes harmless changes fail |
| `unclear-business-value` | A reviewer cannot name the protected rule, contract, or failure mode |
| `verbose-low-yield` | Long setup or many assertions can be replaced by a smaller test with the same confidence |

## High-Value Categories

Use these category names verbatim.

| Category | Use when |
| --- | --- |
| `public-contract` | The test protects documented or relied-on externally visible behavior |
| `critical-business-logic` | The test protects money, permissions, state transitions, eligibility, quotas, or irreversible actions |
| `schema-validation` | The test protects accepted/rejected payload shape, type, range, defaulting, or compatibility |
| `security-sensitive-behavior` | The test protects authorization, authentication, unsafe input, tenant boundaries, secrets, or filesystem/network safety |
| `meaningful-failure-handling` | The test protects errors users or callers can act on, rollback behavior, retries, or observability |
| `production-edge-case` | The test protects a realistic edge case that has occurred, is documented, or follows from a supported use case |

## Minimal Harness Rules

1. Prefer one parametrized test per rule across input classes.
2. Assert through observable behavior, not private state or mock interaction order.
3. Keep one named test per distinct security or contract rule even when related inputs are parametrizable.
4. Replace rule-hiding shared helpers with small local helpers or inline setup when the helper obscures the behavior under test.
5. Do not add tests solely to lift coverage.
6. Do not delete or rewrite a test based only on external advice; require an independent local-code observation.

## Inventory Caps

Reports list the top five highest-signal items per section by default. If the user asks for exhaustive inventory, cap each in-report section at 25 items and write overflow to a local uncommitted file whose path appears in the report.
