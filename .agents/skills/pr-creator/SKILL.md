---
name: 'pr-creator'
description: 'Create review-ready pull requests from the current branch with a preview-first, user-approved workflow. Use when the user asks to create, open, draft, or submit a PR, pull request, merge request, or code review request, or says their branch is ready for review.'
---

# PR Creator

You are a pull request creation orchestrator. Think, route, and ask for user
approval; delegate repository inspection, diff analysis, drafting, metadata, and
submission to focused subagents that return concise status blocks.

This skill is standalone. Bundled paths are relative to the file that contains
them and stay inside this skill folder.
External URLs are public just-in-time sources; fetch them only when exact syntax,
platform behavior, or background rationale is needed.

## Inputs

| Input             | Required | Example                                    |
| ----------------- | -------- | ------------------------------------------ |
| `TARGET_BRANCH`   | No       | `main`                                     |
| `PR_STATE`        | No       | `draft` or `ready`                         |
| `REVIEWERS`       | No       | `alice,bob`                                |
| `TITLE_OVERRIDE`  | No       | `docs(skills): refine pr-creator workflow` |
| `BODY_OVERRIDE`   | No       | `## Summary\n...`                          |
| `LABELS_OVERRIDE` | No       | `documentation,enhancement`                |

Ask for `TARGET_BRANCH` when missing. Default `PR_STATE` to `draft`; accepted
values are `draft` and `ready`. Treat title, body, reviewer, and label overrides
as exact user intent after platform validation.

## Progressive Loading Map

| Need                                                                                      | Load                                                              |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Phase routing, user gates, and subagent selection                                         | This file only                                                    |
| Failure envelope, preview block, final output, body template                              | `./references/execution-contracts.md`                             |
| Current CLI syntax, platform docs, PR-writing guidance, progressive-disclosure background | `./references/external-resources.md`, then fetch one relevant URL |
| GitLab, Bitbucket, or unknown platform behavior                                           | `./references/platform-adaptation.md`                             |
| Specialist execution                                                                      | The selected file under `./subagents/`                            |
| Specialist return shape                                                                   | The matching file under `./references/contracts/`                 |

## Subagent Registry

| Subagent                    | Path                                       | Contract                                              | Purpose                                                              |
| --------------------------- | ------------------------------------------ | ----------------------------------------------------- | -------------------------------------------------------------------- |
| `repo-state-inspector`      | `./subagents/repo-state-inspector.md`      | `./references/contracts/repo-state-inspector.md`      | Reports repository, branch, platform, and working-tree routing state |
| `preflight-validator`       | `./subagents/preflight-validator.md`       | `./references/contracts/preflight-validator.md`       | Verifies auth, base ref, head ref, and approved push state           |
| `diff-analyzer`             | `./subagents/diff-analyzer.md`             | `./references/contracts/diff-analyzer.md`             | Summarizes the trusted compare diff and size gates                   |
| `pr-drafter`                | `./subagents/pr-drafter.md`                | `./references/contracts/pr-drafter.md`                | Creates title and body from diff facts or exact overrides            |
| `review-metadata-suggester` | `./subagents/review-metadata-suggester.md` | `./references/contracts/review-metadata-suggester.md` | Resolves reviewers and platform-valid labels                         |
| `pr-submitter`              | `./subagents/pr-submitter.md`              | `./references/contracts/pr-submitter.md`              | Creates and verifies the approved PR or MR                           |

Pass the contract path to the selected subagent. Do not preload subagent files,
contract files, or external resources.

## Workflow

1. Normalize inputs inline and ask the smallest missing-value question.
2. Dispatch `repo-state-inspector`. If local changes exist, state that they are
   outside the PR until committed; continue only on `REPO_STATE: PASS`.
3. Dispatch `preflight-validator`. Ask before pushing; redispatch with
   `PUSH_APPROVED=true` only after explicit user approval.
4. Dispatch `diff-analyzer`. If the large or mixed-purpose gate trips, summarize
   the issue and ask whether to proceed as one PR.
5. Dispatch `pr-drafter`, then `review-metadata-suggester`. Resolve each
   `NEEDS_*`, `INVALID_LABELS`, or `NEEDS_CHOICE` result with one focused user
   question and redispatch the affected subagent.
6. Load `./references/execution-contracts.md`, show the exact preview, and ask
   for approval. Any edit to branch, state, title, body, reviewers, or labels
   invalidates approval and re-runs the earliest affected phase.
7. Dispatch `pr-submitter` only after the latest preview is approved. Return the
   verified URL using the final success block.

For any non-pass status, load `./references/execution-contracts.md`, map the
status to the failure envelope, and recover only the failing gate. Stop after
three non-converging fix cycles and ask the user for the final decision.

## Core Rules

- Use `origin/<target_branch>...origin/<current_branch>` as the trusted diff
  only after preflight confirms both remote refs are comparable.
- Ask before pushing, before proceeding with a large or mixed-purpose PR, and
  before creating the PR.
- Require at least one reviewer from user input, CODEOWNERS, or an explicit user
  answer before submission.
- Use only labels that the hosting platform reports as existing.
- Fetch external URLs for static guidance instead of copying that guidance into
  the prompt; preserve this skill's local contracts when sources disagree.

## Output Contract

Success output uses the final block in `./references/execution-contracts.md`.
Blocked or failed output uses that file's failure envelope with one clear next
step.

## Example

<example>
Input: `TARGET_BRANCH=main`, `PR_STATE=draft`.

1. `repo-state-inspector` returns `REPO_STATE: PASS` for a GitHub branch.
2. `preflight-validator` returns `PREFLIGHT: PASS` after verifying remote refs.
3. `diff-analyzer` returns a documentation-only diff summary.
4. `pr-drafter` and `review-metadata-suggester` return preview-ready fields.
5. The orchestrator loads `./references/execution-contracts.md`, shows the
   preview, receives approval, and dispatches `pr-submitter`.
6. `pr-submitter` returns `PR_SUBMIT: PASS` with a verified PR URL.
   </example>
