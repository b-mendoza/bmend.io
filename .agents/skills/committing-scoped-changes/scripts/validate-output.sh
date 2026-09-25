#!/bin/sh
# Shape validator for committing-scoped-changes envelopes.
#
# Proves: line-1 status enum, exact field set and order per status, non-empty
# values, byte-sorted duplicate-free Paths tokens, 40-hex digests, Expansions
# tokens present in the group's Paths, consecutive group numbers, and equal
# Preserved digests on COMMIT_EXECUTE: PASS.
# Does not prove: message quality, grouping sense, digest correctness, or that
# any commit exists.
#
# Usage: sh validate-output.sh <plan|execute> < payload
# Exit 0  payload conforms
# Exit 1  one "<mode>: line N: <message>" finding per defect on stdout
# Exit 2  bad or missing mode (usage on stderr)
# Dependencies: sh, awk. No git, no network, no temp files.

LC_ALL=C
export LC_ALL

mode=$1
case "$mode" in
  plan|execute) ;;
  *) echo "usage: sh validate-output.sh <plan|execute> < payload" >&2; exit 2 ;;
esac

awk -v mode="$mode" '
function fail(n, msg) { printf "%s: line %d: %s\n", mode, n, msg; failed = 1 }
function field(n, name,    p) {
  p = name ": "
  if (index(L[n], p) != 1) { fail(n, "expected " name ": with content"); return "" }
  if (substr(L[n], length(p) + 1) ~ /^[[:space:]]*$/) { fail(n, name ": must be non-empty"); return "" }
  return substr(L[n], length(p) + 1)
}
function hex40(s) { return (length(s) == 40 && s ~ /^[0-9a-f]+$/) }
function sortedTokens(n, s, name,    k, i, t, prev) {
  if (s == "") return
  k = split(s, t, " ")
  prev = ""
  for (i = 1; i <= k; i++) {
    if (t[i] == "") { fail(n, name ": tokens must be single-space separated"); return }
    if (prev != "" && !(prev < t[i])) { fail(n, name ": tokens must be strictly ascending byte-wise"); return }
    prev = t[i]
  }
}
function commitLine(n,    v) {
  v = field(n, "Commit")
  if (v == "") return
  if (v !~ /^[0-9a-f]+ [^[:space:]]/) { fail(n, "Commit: must be <sha> <message>"); return }
  if (length(v) - length(substr(v, index(v, " "))) < 7) fail(n, "Commit: sha must be at least 7 hex")
}
function expectCount(want) { if (N != want) fail(N, "expected exactly " want " lines, found " N) }
function checkPlan(    st, i, g, v, paths, ex, k, t, j) {
  if (L[1] !~ /^COMMIT_PLAN: (PASS|NEEDS_DECISION|NO_CHANGES|ERROR)$/) { fail(1, "line 1 must be COMMIT_PLAN: <PASS|NEEDS_DECISION|NO_CHANGES|ERROR>"); return }
  st = substr(L[1], 14)
  if (st == "NEEDS_DECISION") { expectCount(3); if (N >= 2) field(2, "Reason"); if (N >= 3) field(3, "Decision needed"); return }
  if (st != "PASS") { expectCount(2); if (N >= 2) field(2, "Reason"); return }
  if (N < 9 || (N - 3) % 6 != 0) { fail(N, "PASS needs one or more 6-line groups plus Omissions: and Warnings:; found " N " lines"); return }
  g = 0
  for (i = 2; i + 5 <= N - 2; i += 6) {
    g++
    v = field(i, "Group"); if (v != "" && v != g "") fail(i, "Group: must be " g)
    field(i + 1, "Message")
    paths = field(i + 2, "Paths"); sortedTokens(i + 2, paths, "Paths")
    ex = field(i + 3, "Expansions")
    if (ex != "none") {
      sortedTokens(i + 3, ex, "Expansions")
      k = split(ex, t, " ")
      for (j = 1; j <= k; j++) if (index(" " paths " ", " " t[j] " ") == 0) fail(i + 3, "Expansions: token not in Paths: " t[j])
    }
    field(i + 4, "Verification")
    v = field(i + 5, "Digest"); if (v != "" && !hex40(v)) fail(i + 5, "Digest: must be 40 lowercase hex")
  }
  v = field(N - 1, "Omissions"); if (v != "none") sortedTokens(N - 1, v, "Omissions")
  field(N, "Warnings")
}
function checkExecute(    st, v, a, b, eq) {
  if (L[1] !~ /^COMMIT_EXECUTE: (PASS|DIVERGED|VERIFY_FAILED|COMMIT_ERROR|HOOK_MUTATION|ERROR)$/) { fail(1, "line 1 must be COMMIT_EXECUTE: <PASS|DIVERGED|VERIFY_FAILED|COMMIT_ERROR|HOOK_MUTATION|ERROR>"); return }
  st = substr(L[1], 17)
  if (st == "PASS") {
    expectCount(4)
    if (N >= 2) commitLine(2)
    if (N >= 3) { v = field(3, "Paths"); sortedTokens(3, v, "Paths") }
    if (N >= 4) {
      v = field(4, "Preserved"); eq = index(v, "=")
      a = substr(v, 1, eq - 1); b = substr(v, eq + 1)
      if (eq == 0 || !hex40(a) || !hex40(b)) fail(4, "Preserved: must be <40hex>=<40hex>")
      else if (a != b) fail(4, "Preserved: digests must be equal on PASS")
    }
    return
  }
  if (st == "HOOK_MUTATION") { expectCount(3); if (N >= 2) field(2, "Reason"); if (N >= 3) commitLine(3); return }
  expectCount(2); if (N >= 2) field(2, "Reason")
}
{ raw[NR] = $0 }
END {
  first = 1; last = NR
  while (first <= last && raw[first] ~ /^[[:space:]]*$/) first++
  while (last >= first && raw[last] ~ /^[[:space:]]*$/) last--
  if (last < first) { fail(1, "payload is empty"); exit 1 }
  N = 0
  for (i = first; i <= last; i++) { L[++N] = raw[i]; if (raw[i] ~ /^[[:space:]]*$/) fail(N, "blank line inside the envelope") }
  if (mode == "plan") checkPlan(); else checkExecute()
  exit failed
}
'
