# Safety Tiers

Use this reference before running, recommending, or requesting any validation action. The default is conservative: if a candidate action is hard to classify, treat it as Tier C.

## Tier A: Always Allowed

Tier A actions are read-only and do not change local, shared, remote, or production state.

Examples:

- Reading files, logs, configuration, dependency manifests, and documentation.
- Searching the repository.
- Running `git log`, `git diff`, `git show`, or equivalent read-only history inspection.
- Listing CI runs, jobs, and logs through read-only UI, CLI, or API queries.
- Reading metadata, versions, environment variables already present in local context, or command help.

## Tier B: Allowed Only In Disposable Scope

Tier B actions may write temporary local artifacts, but only when effects are trivially deletable and never touch shared, remote, or production state.

Qualifying rule: the action must run in a local disposable scope, must not update dependencies or configuration of record, must not use production data or credentials, and must not affect other users or systems.

Examples:

- Running a test suite that writes only project-local caches such as `.pytest_cache`.
- Running a build that creates local temp artifacts ignored by the project.
- Installing dependencies into a throwaway environment outside the repository or in a disposable container.
- Running the app locally against local fixtures.
- `docker run` against a local throwaway container with local test data.

## Tier C: Never Executed By This Skill

Tier C actions mutate or risk shared, remote, production, credential, or record-of-truth state. This skill never executes them, with or without approval. Approval only creates a handoff packet for external human-supervised execution.

Examples:

- Deployments, rollbacks, migrations, queue replays, cache flushes, production reads that require privileged access, or any production-touching operation.
- Mutating shared databases, staging environments, CI settings, secrets, credentials, or access controls.
- Updating committed dependency files or lockfiles in the repository.
- Running `npm install` or equivalent when it would update a committed lockfile.
- Destructive commands or cleanup that could delete user, shared, or production data.
- `docker run` or any command pointed at a shared staging database.

## Approval Packets

When a Tier C action is the next useful validation step, return a packet with:

- Action.
- Target.
- Reason.
- Risk.
- Reversibility.
- Safer alternative.
- Expected evidence gain.

Approval for one packet does not authorize any other action. If the user executes the action externally and returns output, that output becomes new `RESOURCES` for evidence collection.
