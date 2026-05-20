# Platform Adaptation

> Load this file when the remote is GitLab, Bitbucket, unknown, or when GitHub
> tooling cannot authenticate against a GitHub-compatible repository. Fetch exact
> command or API syntax from `./external-resources.md` only for the
> active platform.

Non-GitHub flows keep the same safety gates: validate auth, confirm remote refs,
compare the approved branch range, preview exact fields, wait for user approval,
create, verify, and return the URL.

## Strategy Map

| Platform               | Local behavior                                                                                               | External source trigger                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| GitLab                 | Use merge-request semantics and the team's installed `glab` or approved API wrapper                          | Fetch GitLab MR, `glab mr create`, labels, or Code Owners docs when flags or fields are uncertain |
| Bitbucket              | Use the repository's standard CLI or REST wrapper; return `BLOCKED` when no safe create path is discoverable | Fetch Bitbucket create-PR, pull-request API, refs API, or default-reviewer docs                   |
| Unknown or self-hosted | Ask which hosting platform and tooling to use before creating anything                                       | Fetch only the docs for the user-named platform or tool                                           |

## Field Mapping

Reuse the approved preview values exactly:

- Target branch maps to base or target branch.
- Current branch maps to source or head branch.
- Title and body map to PR or MR title and description.
- Draft or ready state maps to the platform's equivalent when supported.
- Reviewers and labels are included only after platform validation.

## Failure Mapping

Use the failure envelope in `./execution-contracts.md`:

| Situation                                               | Envelope code          |
| ------------------------------------------------------- | ---------------------- |
| Missing tooling, token, or permission                   | `AUTH`                 |
| Missing target branch                                   | `BASE_BRANCH_MISSING`  |
| Source branch cannot be compared remotely               | `HEAD_BRANCH_UNPUSHED` |
| Empty compare range                                     | `EMPTY_DIFF`           |
| Platform or create workflow cannot be determined safely | `BLOCKED`              |
| User declines a confirmation gate                       | `CANCELLED`            |
| Creation or verification fails after approval           | `CREATE_ERROR`         |
