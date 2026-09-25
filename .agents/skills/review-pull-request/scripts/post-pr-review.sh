#!/usr/bin/env bash
# Post a summary-only PR review via gh. Caller must already hold preview
# approval for this exact body. For batched line comments, use the GitHub REST
# pulls/reviews create endpoint instead (see review-poster subagent).
# Usage: post-pr-review.sh <owner>/<repo> <number> <event> <body-file>
#   event: APPROVE | REQUEST_CHANGES | COMMENT
set -euo pipefail
if [ "$#" -ne 4 ]; then
  printf '%s\n' "usage: $0 <owner>/<repo> <number> <APPROVE|REQUEST_CHANGES|COMMENT> <body-file>" >&2
  exit 64
fi
repo_path="$1"
number="$2"
event="$3"
body_file="$4"
case "$event" in
APPROVE | REQUEST_CHANGES | COMMENT) ;;
*)
  printf '%s\n' "invalid event: $event (expected APPROVE|REQUEST_CHANGES|COMMENT)" >&2
  exit 65
  ;;
esac
if [ ! -f "$body_file" ]; then
  printf '%s\n' "body file not found: $body_file" >&2
  exit 66
fi
if ! command -v gh >/dev/null 2>&1; then
  printf '%s\n' "gh CLI required" >&2
  exit 2
fi
gh api --method POST "repos/${repo_path}/pulls/${number}/reviews" \
  -f event="$event" \
  -f body="$(cat "$body_file")"
