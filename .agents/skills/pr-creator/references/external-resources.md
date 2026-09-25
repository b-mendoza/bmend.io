# External Resources

Load this file only when current CLI syntax, platform behavior, or writing guidance changes a concrete decision. Fetched sources are background and syntax references only; this skill's local contracts remain authoritative.

## GitHub

| Resource | Use |
| --- | --- |
| <https://cli.github.com/manual/gh_pr_create> | `gh pr create` flags for base, head, body-file, draft, reviewers, and labels. |
| <https://cli.github.com/manual/gh_pr_list> | Existing-PR idempotency checks by head and base. |
| <https://cli.github.com/manual/gh_pr_view> | Field-by-field verification JSON. |
| <https://cli.github.com/manual/gh_repo_view> | Default branch and parent/fork metadata. |
| <https://cli.github.com/manual/gh_auth_status> | Auth gate. |
| <https://cli.github.com/manual/gh_label_list> | Platform-existing label validation. |
| <https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork> | Fork PR semantics. |
| <https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners> | CODEOWNERS matching and requestability. |
| <https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/requesting-a-pull-request-review> | Requestable reviewers and teams. |

## Git And Scope Accounting

| Resource | Use |
| --- | --- |
| <https://git-scm.com/docs/git-diff> | Three-dot compare semantics. |
| <https://git-scm.com/docs/git-rev-parse> | Pinning local and remote SHAs. |
| <https://git-scm.com/docs/git-ls-remote> | Remote-tip reads for head-moved guard. |
| <https://git-scm.com/docs/git-push> | Plain push and rejection behavior. |
| <https://git-scm.com/docs/git-fetch> | Updating specific remote refs. |
| <https://git-scm.com/docs/gitattributes> | `linguist-generated` attributes for generated-file exclusions. |

## Other Platforms

| Resource | Use |
| --- | --- |
| <https://docs.gitlab.com/user/project/merge_requests/creating_merge_requests/> | GitLab MR semantics and fork/source project behavior. |
| <https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/mr/create.md> | `glab mr create` syntax. |
| <https://docs.gitlab.com/user/project/codeowners/> | GitLab Code Owners. |
| <https://docs.gitlab.com/user/project/labels/> | GitLab label validation. |
| <https://support.atlassian.com/bitbucket-cloud/docs/create-a-pull-request/> | Bitbucket PR creation and state capabilities. |
| <https://developer.atlassian.com/cloud/bitbucket/rest/api-group-pullrequests/> | Bitbucket REST create/query/verify path. |
| <https://support.atlassian.com/bitbucket-cloud/docs/use-default-reviewers-on-a-repository/> | Bitbucket default reviewer analogue. |

## Writing And Safety

| Resource | Use |
| --- | --- |
| <https://www.conventionalcommits.org/en/v1.0.0/> | Title type/scope format. |
| <https://google.github.io/eng-practices/review/developer/cl-descriptions.html> | Clear PR body guidance. |
| <https://google.github.io/eng-practices/review/developer/small-cls.html> | Rationale for small PR gates. |
| <https://owasp.org/www-project-top-10-for-large-language-model-applications/> | Prompt-injection threat model for untrusted repository content. |

## Fetch Policy

- Prefer installed CLI `--help` output over web docs when local CLI version is the deciding factor.
- Fetch at most one URL per uncertain decision.
- Record the source that settled a command flag, field name, or capability.
- If network is unavailable, use local contracts and ask before any platform-specific create path that remains uncertain.
