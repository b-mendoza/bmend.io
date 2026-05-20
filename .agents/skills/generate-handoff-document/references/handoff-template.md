# Handoff Template

> Use this template only at assembly time, after reading the structured
> artifacts. Replace every placeholder before writing the final document.

```markdown
# Handoff Document: <SUBJECT>

> **Purpose:** This document preserves the state of an in-progress session so a
> fresh agent can resume without relying on chat history.
>
> **Generated:** <timestamp>
> **Status:** In Progress | Completed

---

## 1. Original Instructions & Scope

**Fulfills:** Preserve the mandate, scope boundaries, and instruction changes
that define what this work is trying to accomplish.

<original instructions from CONTEXT_FILE>

### Instruction Amendments

<amendments from CONTEXT_FILE, or "No amendments were made during the session.">

---

## 2. Q&A Log

**Fulfills:** Preserve the clarifying exchanges that shaped execution.

<chronological Q&A log from CONTEXT_FILE>

---

## 3. Observations & Insights

**Fulfills:** Preserve the session's analytical findings with evidence and
priority.

<categorized insights from INSIGHTS_FILE>

---

## 4. Unverified Claims & Validation Checklist

**Fulfills:** Prevent the next agent from treating secondary notes or tracking
documents as ground truth.

<directive and checklist from CLAIMS_FILE, or the explicit "no tracking files"
note>

---

## 5. Open Questions & Recommended Next Steps

**Fulfills:** Preserve continuity so the next agent knows what remains open
and what to do next.

### Open Questions

<unresolved questions, or "All questions raised during the session have been resolved.">

### Recommended Next Steps

<ordered, concrete next actions>

### Session Metadata

- **Total Q&A exchanges:** <count>
- **Total insights documented:** <count>
- **Claims validated:** <verified count> / <total count or N/A>
- **Critical findings:** <count>
```
