#!/usr/bin/env bash
# Post one reply body to a pull-request review comment. Caller must already
# hold an APPROVAL_RECORD matching this exact body.
set -euo pipefail
if [ "$#" -ne 3 ]; then
  printf '%s\n' "usage: $0 <owner>/<repo> <comment-id> <body-file>" >&2
  exit 64
fi
repo_path="$1"
comment_id="$2"
body_file="$3"
if [ ! -f "$body_file" ]; then
  printf '%s\n' "body file not found: $body_file" >&2
  exit 66
fi
if ! command -v gh >/dev/null 2>&1; then
  printf '%s\n' "gh CLI required" >&2
  exit 2
fi
# shellcheck disable=SC2016
gh api --method POST "repos/${repo_path}/pulls/comments/${comment_id}/replies" \
  -f body="$(cat "$body_file")"
