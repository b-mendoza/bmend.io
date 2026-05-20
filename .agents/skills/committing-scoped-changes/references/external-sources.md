# External Sources

> Read this file only when a public page can change the next commit decision.
> Fetch the smallest number of URLs that resolve the open question and pass them
> to the working specialist. Return source URLs plus conclusions, not copied
> article text.

External pages replace bundled static explanations of Git mechanics, commit
grouping theory, message conventions, and progressive disclosure. Core local
contracts still define execution; network access is optional.

## Fetch Policy

- Fetch only when the answer can change grouping, message syntax, staging
  behavior, verification, or final reporting.
- Give URLs to the specialist doing the work.
- Continue from bundled rules when a fetch fails and safe execution is still
  clear.
- Local rules, user instructions, and repository state win over web content.

## Source Routing

### Skill Design And Progressive Disclosure

| Reference key                  | URL                                                                               | Use when                                                                                     |
| ------------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `progressive-disclosure-skill` | https://skills.sh/flpbalada/fb-skills/progressive-disclosure                      | Maintaining this skill's disclosure layers or explaining just-in-time retrieval              |
| `progressive-disclosure-ux`    | https://www.nngroup.com/articles/progressive-disclosure/                          | A short, public explanation of hiding advanced detail until needed would help                |
| `context-engineering`          | https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents | Just-in-time retrieval, long-horizon agent context patterns, or subagent isolation rationale |

### Git Mechanics

| Reference key         | URL                                                                           | Use when                                                                               |
| --------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `git-workflow`        | https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository | Refresher needed on how tracked, staged, and committed states interact                 |
| `git-status`          | https://git-scm.com/docs/git-status                                           | Exact porcelain or status field behavior is unclear                                    |
| `git-diff`            | https://git-scm.com/docs/git-diff                                             | Exact unstaged or staged diff invocation, pathspec, or context behavior is unclear     |
| `git-add`             | https://git-scm.com/docs/git-add                                              | Exact pathspec, `--patch`, or `--update` staging semantics are unclear                 |
| `git-restore`         | https://git-scm.com/docs/git-restore                                          | Exact unstaging or worktree restoration behavior is unclear                            |
| `interactive-staging` | https://git-scm.com/book/en/v2/Git-Tools-Interactive-Staging                  | Mixed hunks need a check on whether safe non-interactive separation exists             |
| `git-commit`          | https://git-scm.com/docs/git-commit                                           | Commit creation flags, message behavior, hook side effects, or amend rules are unclear |

### Commit Grouping And Message Style

| Reference key          | URL                                                            | Use when                                                                                     |
| ---------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `atomic-commits`       | https://www.aleksandrhovhannisyan.com/blog/atomic-git-commits/ | A broad or mixed diff needs grouping rationale (one reason, independently revertable)        |
| `conventional-commits` | https://www.conventionalcommits.org/en/v1.0.0/                 | Type, scope, breaking-change marker, or footer syntax must be exact                          |
| `commit-message-style` | https://chris.beams.io/posts/git-commit/                       | Repository history shows no clear style and a human-readable subject/body decision is needed |

## Return Format

When a specialist fetches a URL, summarize it in one of these forms.

Single-line form (preferred when the fetch only confirmed an existing decision):

```text
References fetched: <url> - <one-line conclusion>
```

Block form (use when multiple URLs were consulted or the conclusion changed the
plan):

```text
EXTERNAL_SOURCE: OK
Source: <url>
Used for: <decision or check>
Relevant facts:
- <fact 1>
- <fact 2>
Workflow impact: <none | changed grouping | changed message | changed verification | user action needed>
```

If a page cannot be fetched, return:

```text
References fetched: <url> - not fetched: <reason>
```

## When Network Access Is Unavailable

Continue with bundled rules. Avoid claiming exact flag behavior or version-
specific syntax that the unfetched page would have confirmed. Report the missing
external check only when it would have changed the commit decision.
