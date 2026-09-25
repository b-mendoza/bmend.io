#!/usr/bin/env bash
# Fetch paginated review-comment JSON for a PR via gh. Does not post.
set -euo pipefail
if [ "$#" -ne 1 ]; then
  printf '%s\n' "usage: $0 <owner>/<repo>/pull/<number>|PR_URL" >&2
  exit 64
fi
raw="$1"
if [[ "$raw" =~ github\.com/([^/]+)/([^/]+)/pull/([0-9]+) ]]; then
  owner="${BASH_REMATCH[1]}"; repo="${BASH_REMATCH[2]}"; number="${BASH_REMATCH[3]}"
elif [[ "$raw" =~ ^([^/]+)/([^/]+)/pull/([0-9]+)$ ]]; then
  owner="${BASH_REMATCH[1]}"; repo="${BASH_REMATCH[2]}"; number="${BASH_REMATCH[3]}"
else
  printf '%s\n' "unrecognized PR reference: $raw" >&2
  exit 65
fi
if ! command -v gh >/dev/null 2>&1; then
  printf '%s\n' "gh CLI required" >&2
  exit 2
fi
gh api --paginate "repos/${owner}/${repo}/pulls/${number}/comments"
