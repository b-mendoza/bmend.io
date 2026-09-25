# File Size Policy

Default `MAX_LINES` is 250 physical lines, including blanks and comments. Count on-disk files after the refactor.

## Applicability

The size rule applies in full to:

- The target file.
- Files created by the refactor.
- Files produced by a split.
- Existing files materially edited by the refactor.

Pre-existing files over `MAX_LINES` that receive only mechanical compilation-consequence edits get a recorded `pre-existing-oversized, mechanical-edit` exemption. The exemption is not silent: the plan card reports it, the implementer records it, and the reviewer verifies the edit is genuinely mechanical.

## User-Approved Waivers

These waiver categories require user approval before implementation. The orchestrator batches every needed waiver into the plan-approval card — waivers are decided with the plan, not through separate asks:

- Generated code that must remain in one file.
- Static data that is clearer and safer as one artifact.
- A single declaration that cannot be split without damaging readability or the public surface.
- A framework-required single file where splitting would violate project conventions or runtime discovery.

Any other oversized material edit requires splitting, a smaller plan, or a `BLOCKED`/`NEEDS_CLARIFICATION` stop.

## Split Decision Tree

Prefer project architecture first. If the project gives no clear seam, split in this order:

1. Pure decision logic away from side-effect orchestration.
2. Side-effect adapters away from domain logic.
3. Types, schemas, or value objects that are already named concepts.
4. Orchestration seams where one function currently coordinates separable steps.

Avoid speculative layers. A split is justified only when it makes current code clearer, keeps names domain-shaped, and preserves the public surface through existing entry points or approved mechanical updates.

## Reporting

Every plan card, implementation report, and review report that touches size must name:

- File path.
- Line count after change, or current line count for planned splits.
- `MAX_LINES` used.
- Compliance result: within limit, approved waiver, or mechanical-edit exemption.
- Reason and risk for every waiver or exemption.
