# docs/DESIGN_SYSTEM.md (LOOK AND FEEL)
Rank: below AI_INSTRUCTIONS.md. Tokens live only in src/styles/theme.css; never hard-code colors elsewhere.

## INDEX
- SECTION: Principles - the style in one paragraph
- SECTION: Color tokens - exact values and roles
- SECTION: Layering - how focus is shown
- SECTION: Typography - font and scale
- SECTION: Icons - SVG line art rules
- SECTION: Layout and spacing - sizes and radii
- SECTION: Navigation visuals - selected, hover, collapsed
- SECTION: Motion - allowed and forbidden
- SECTION: Copy and errors - how text is written
- SECTION: Accessibility - minimum bar
- SECTION: Data display - simple and visual views

## SECTION: Principles
Conceptual minimalism. Near true black, quiet panels, thin purple line art with a soft glow. One memorable element per screen (the dashboard title); everything else stays calm. No emoji; all graphics are SVG.

## SECTION: Color tokens
| Token | Value | Role |
|---|---|---|
| --bg | #050507 | page background, selected nav item |
| --p1 | #0c0c11 | panels, sidebar, tab bar |
| --p2 | #13131a | raised: hover, buttons, inner panels |
| --line | #a78bfa | purple line art, focus, selected edge |
| --line-dim | #3b3358 | dim purple: orbit rings, button borders |
| --text | #e8e6f0 | primary text |
| --mute | #8b88a0 | secondary text, inactive nav |
| --red | #ef4444 | error, destructive |
| --yellow | #eab308 | warning |
| --orange | #f97316 | attention, pending |
| --green | #22c55e | success, done |
System colors carry meaning only; never decoration. Add new colors to theme.css and to this table in the same edit.

## SECTION: Layering
Darkest = background. Lighter surface = more important or interactive. Order: --bg, --p1, --p2. The selected nav item is the exception: it drops to --bg with a purple left edge so it reads as "inside".

## SECTION: Typography
Work Sans, weights 300, 400, 500, 600, with system-ui fallback. Title/brand 300 with wide letter spacing; headings 500; body 400. Sentence case everywhere. Keep lines under 80 characters.

## SECTION: Icons
- SVG only, viewBox 0 0 24 24, stroke currentColor, width 1.4, round caps, no fill.
- Purple (--line) with a soft glow via drop-shadow.
- Sizes: 20px top-level nav, 16px sub-items.
- Currently one shared placeholder icon; each module gets its own icon, keyed by the module's icon string, in components/Icon.tsx.
- Style: simple geometric line art, conceptual (shape suggests the idea). No filled shapes, no emoji, no raster images.

## SECTION: Layout and spacing
Sidebar rail 56px, expanded 248px; mobile tab bar 60px plus safe-area inset. Panels: radius 14px, padding 24px, 1px border #17171f. Controls: radius 8px. Mobile breakpoint: 768px.

## SECTION: Navigation visuals
Inactive: --mute. Hover: --p2 background. Selected: --bg background, --text color, inset 2px --line edge. Collapsed rail shows icons only; labels fade in on hover. Sub-items are indented 14px per level.

## SECTION: Motion
Allowed: slow ambient motion on the dashboard (starfield, orbits, title rise), short state transitions (about 0.2s) that show what changed.
Forbidden: entrance animations on every card, bouncing, flashing, anything that moves faster than the starfield outside the dashboard.
Always respect prefers-reduced-motion (already handled for orbits, title and stars).

## SECTION: Copy and errors
Plain verbs, sentence case, no filler. Buttons name the action ("Save changes", not "Submit"); the same action keeps the same name everywhere. Errors say what happened and what to do next, never apologize, never vague. Empty screens say how to start.

## SECTION: Accessibility
Visible keyboard focus (purple outline), reduced motion respected, text contrast on --bg and --p1 stays readable, tap targets at least 40px, labels on icon-only controls (aria-label). PLANNED: audit on a real phone.

## SECTION: Data display
Rule: every data view has a Simple view and a Visual view, switched by one control in the same place on every screen, remembered per module.
