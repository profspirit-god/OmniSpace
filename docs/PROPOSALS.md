# docs/PROPOSALS.md (IDEAS ONLY, NOT TRUTH)
Nothing here is approved or built. Never implement from this file.

## INDEX
- SECTION: Intake process - how a new idea is handled
- SECTION: Entry template - the fields every proposal gets
- SECTION: Statuses - what each status means
- SECTION: Inbox - new, unreviewed
- SECTION: Reviewed - decided, with outcome

## SECTION: Intake process
1. Owner pastes an idea or an outside proposal (for example from ChatGPT) and says where it came from.
2. The AI records it in Inbox using the template, without building anything.
3. The AI reviews it against AI_INSTRUCTIONS.md section 3 (hard rules), DECISIONS.md and ROADMAP.md, and fills in Fit, Cost, Risk, Effort and Conflicts. It must flag any conflict openly (paid tool, emoji, stack change, secret handling) and never silently adapt the idea to hide it.
4. The AI gives the owner a recommendation: Approve, Approve with changes, Defer or Reject, with reasons.
5. The owner decides. Approved: move to ROADMAP.md and add a DECISIONS.md entry. Deferred or rejected: move to Reviewed with the reason.
6. Bad or unverifiable claims in a proposal (invented library names, unchecked pricing or limits) are marked as unverified until checked.

## SECTION: Entry template
ID: P-### | Date | Source (ChatGPT, owner, other) | Status
Idea: one or two sentences.
Why: the problem it solves.
Fit: which phase or module.
Cost: money, new dependencies, free-tier limits (verify, do not assume).
Risk: security, data, complexity.
Effort: small, medium or large.
Conflicts: rules or decisions it breaks, or "none".
Recommendation: and reasons.
Outcome: filled after the owner decides.

## SECTION: Statuses
NEW (unreviewed), REVIEWED (analysis done, waiting for owner), APPROVED (moved to ROADMAP), DEFERRED (good, not now), REJECTED (not doing it).

## SECTION: Inbox
(empty)

## SECTION: Reviewed
(empty)
