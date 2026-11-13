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
P-001 | 2026-11-13 | ChatGPT | APPROVED
Idea: replace the glowing purple look with Controlled Violet (muted violet inactive icons, bright violet only for active/selected/focused, no persistent glow, 8px panels, quieter dashboard), plus keyboard-focus expansion of the desktop sidebar and reduced-motion transitions.
Why: reduce visual brightness while keeping the violet identity.
Fit: design system, theme.css, dashboard, sidebar.
Cost: none; no new dependencies.
Risk: low. It overrides the owner's original request for glowing line art (see D-015).
Effort: small.
Conflicts: supersedes the visual treatment in D-011; AI_INSTRUCTIONS.md section 6 and DESIGN_SYSTEM.md were updated to match.
Recommendation: approve. Claude verified the build passes; visual check on screen still pending.
Outcome: approved 2026-11-13; recorded as D-015. Process note: the proposal was first written straight into DECISIONS.md without passing through PROPOSALS.md; logged here for the record.
