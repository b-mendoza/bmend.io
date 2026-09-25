# Validation Safety

Use this guide before approving or running any validation command. Tool availability never implies permission.

## Safety Classes

| Class | Signals | Gate |
| --- | --- | --- |
| `safe` | Read-only lint, typecheck, unit test, or focused test command; no network egress; no service/container startup; writes only normal in-repo transient caches or temp files | May run after plan approval when selected as the validation contract |
| `state-mutating` | Writes outside the repo or temp directory; updates snapshots or golden files; starts services, containers, emulators, or databases; performs migrations; uses network egress; depends on `.env`-selected external state | Requires explicit user approval before running |
| `destructive` | Deletes data, drops databases, rewrites history, uses `--force`, resets worktrees, prunes resources, or performs irreversible state changes | Requires explicit user approval and a safer alternative should be offered |

If a command cannot be confidently classified, classify it as `state-mutating`.

Common non-safe signals include `-u`, `--update`, `--update-snapshots`, `--force`, `rm`, `reset`, `clean`, `drop`, `migrate`, `docker compose up`, service startup, cloud commands, credential use, and commands that hit live URLs.

## Validation Contract

The orchestrator may select validation only from:

- The user's `TEST_COMMAND`.
- Candidates reported by `behavior-mapper`.
- An explicit warning path when no approved candidate exists.

The implementer may run only the selected contract. If the selected command's safety class changes on re-check, stop `BLOCKED` and ask the orchestrator to re-gate.

When the contract command is classed `safe`, the implementer runs it once before any edit as a baseline checkpoint. A baseline failure is pre-existing evidence for the pre-existing-failure rule below — record it and continue; do not treat it as a stop or attribute it to the refactor.

## Evidence Requirements

Validation evidence must include:

- Exact command, or `not run`.
- Safety class used for the decision.
- Exit code, or `not run`.
- Tests-run count, matched suite names, matched file names, or equivalent output showing the target was exercised.
- Result: `pass`, `fail`, `not run`, or `pre-existing failure`.

Zero tests executed is `not run` even when exit code is 0. A refactor with any validation warning can complete only as `PASS_WITH_WARNINGS`, never bare `PASS`.

Pre-existing failures must be identified by evidence from before the refactor (the baseline checkpoint when one ran) or by a rerun that demonstrates the same failure is unrelated. If that evidence is missing, report the validation result as warning or fail, not pass.

## Claim-to-Evidence Rule

Every completion claim must be backed by evidence produced fresh in this run — never a recollection of an earlier run:

- "tests pass" → this run's output showing exit code and a nonzero tests-run count (zero tests executed is `not run`);
- "behavior preserved" → the contracted command exercising the target, or an explicit warning that it was not exercised;
- "simplified" → the reviewer's measured net lines, duplication, and reuse-rung check, not the plan's expectation.

A claim without its evidence is reported as the warning it actually is.
