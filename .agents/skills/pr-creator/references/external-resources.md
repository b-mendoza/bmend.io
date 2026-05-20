# External Source Map

> Load this file only when exact command syntax, platform behavior,
> PR-writing guidance, or progressive-disclosure background is needed. Fetch one
> relevant URL, not the whole map.

This standalone source map keeps static reference material out of prompts. The
local skill contracts remain authoritative for workflow behavior; external pages
provide current syntax, platform details, and optional rationale.

## Fetch Rules

- Prefer official product documentation for commands, flags, API behavior, and
  hosting-platform rules.
- Prefer installed CLI help when the local version may differ from public docs.
- Use articles and engineering guides for writing quality and review heuristics,
  not for exact command syntax.
- If network access is unavailable, proceed with bundled contracts, avoid
  version-specific claims, and ask the user when exact platform behavior is a
  safety gate.

## Workflow Source Map

| Need                                      | Fetch                                                                        |
| ----------------------------------------- | ---------------------------------------------------------------------------- |
| Progressive-disclosure example for skills | https://skills.sh/flpbalada/fb-skills/progressive-disclosure                 |
| UX background for progressive disclosure  | https://www.nngroup.com/articles/progressive-disclosure/                     |
| Agent Skills overview                     | https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview       |
| Agent Skills best practices               | https://docs.claude.com/en/docs/agents-and-tools/agent-skills/best-practices |
| Claude Code subagents                     | https://docs.claude.com/en/docs/claude-code/sub-agents                       |
| Cursor skills                             | https://cursor.com/docs/skills                                               |
| OpenCode agents                           | https://opencode.ai/docs/agents/                                             |

## Git State and Compare Sources

| Need                                  | Fetch                                                                                                                       |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `git diff` ranges and `...` semantics | https://git-scm.com/docs/git-diff                                                                                           |
| Commit range inspection               | https://git-scm.com/docs/git-log                                                                                            |
| Working-tree status                   | https://git-scm.com/docs/git-status                                                                                         |
| Fetching remote refs                  | https://git-scm.com/docs/git-fetch                                                                                          |
| Pushing branches                      | https://git-scm.com/docs/git-push                                                                                           |
| Listing remote branches               | https://git-scm.com/docs/git-ls-remote                                                                                      |
| GitHub compare behavior               | https://docs.github.com/en/pull-requests/committing-changes-to-your-project/viewing-and-comparing-commits/comparing-commits |

## GitHub Sources

| Need                         | Fetch                                                                                                                                                               |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub CLI manual            | https://cli.github.com/manual/                                                                                                                                      |
| Auth status                  | https://cli.github.com/manual/gh_auth_status                                                                                                                        |
| Repository inspection        | https://cli.github.com/manual/gh_repo_view                                                                                                                          |
| Create PR                    | https://cli.github.com/manual/gh_pr_create                                                                                                                          |
| Verify PR                    | https://cli.github.com/manual/gh_pr_view                                                                                                                            |
| Mark PR ready                | https://cli.github.com/manual/gh_pr_ready                                                                                                                           |
| List labels                  | https://cli.github.com/manual/gh_label_list                                                                                                                         |
| GitHub pull request creation | https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request                 |
| Draft pull requests          | https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests#draft-pull-requests |
| Requesting reviews           | https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/requesting-a-pull-request-review                       |
| CODEOWNERS syntax            | https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners                               |
| Labels                       | https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels                                                                         |

## Writing and Review Sources

| Need                                | Fetch                                                                        |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| Conventional Commit title syntax    | https://www.conventionalcommits.org/en/v1.0.0/                               |
| High-quality CL descriptions        | https://google.github.io/eng-practices/review/developer/cl-descriptions.html |
| Small-change guidance               | https://google.github.io/eng-practices/review/developer/small-cls.html       |
| Reviewer expectations               | https://google.github.io/eng-practices/review/reviewer/                      |
| Commit-message writing              | https://github.blog/developer-skills/github/writing-better-commit-messages/  |
| Detailed commit message conventions | https://cbea.ms/git-commit/                                                  |

## Non-GitHub Sources

| Need                                | Fetch                                                                                     |
| ----------------------------------- | ----------------------------------------------------------------------------------------- |
| GitLab merge request workflow       | https://docs.gitlab.com/user/project/merge_requests/creating_merge_requests/              |
| GitLab CLI project                  | https://gitlab.com/gitlab-org/cli                                                         |
| `glab mr create` docs               | https://gitlab.com/gitlab-org/cli/-/blob/main/docs/source/mr/create.md                    |
| GitLab labels                       | https://docs.gitlab.com/user/project/labels/                                              |
| GitLab Code Owners                  | https://docs.gitlab.com/user/project/codeowners/                                          |
| Bitbucket Cloud create pull request | https://support.atlassian.com/bitbucket-cloud/docs/create-a-pull-request/                 |
| Bitbucket pull request REST API     | https://developer.atlassian.com/cloud/bitbucket/rest/api-group-pullrequests/              |
| Bitbucket branch refs REST API      | https://developer.atlassian.com/cloud/bitbucket/rest/api-group-refs/                      |
| Bitbucket default reviewers         | https://support.atlassian.com/bitbucket-cloud/docs/use-default-reviewers-on-a-repository/ |
