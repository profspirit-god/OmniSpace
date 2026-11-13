# docs/DESIGN_SYSTEM.md (LOOK AND FEEL)
Rank: below AI_INSTRUCTIONS.md. Tokens live only in src/styles/theme.css; never hard-code colors elsewhere.

## INDEX
- SECTION: Principles - the style in one paragraph
- SECTION: Color tokens - exact values and roles
- SECTION: Layering - how surfaces and focus are shown
- SECTION: Typography - font and scale
- SECTION: Icons - SVG line art rules
- SECTION: Layout and spacing - sizes and radii
- SECTION: Navigation visuals - selected, hover, collapsed
- SECTION: Motion - allowed and forbidden
- SECTION: Copy and errors - how text is written
- SECTION: Accessibility - minimum bar
- SECTION: Data display - simple and visual views

## SECTION: Principles
Controlled violet on a near-black foundation. The app should feel like a quiet, engineered system interface: conceptual minimalism, precise geometry, thin SVG line art, restrained dividers, and clear information hierarchy. Violet is an accent, not a surface color. Most of the interface stays neutral and dark; brighter violet is reserved for active, selected, and focused states. Ordinary icons, panels, and navigation do not glow. No emoji; all graphics are SVG.

## SECTION: Color tokens
| Token | Value | Role |
|---|---|---|
| --bg | #050508 | page background and selected navigation surface |
| --p1 | #0b0b12 | panels, sidebar, tab bar |
| --p2 | #11111a | raised surfaces, hover backgrounds, inner panels |
| --border | #211e2d | quiet structural borders and separators |
| --line | #8977bb | primary violet: selected, active, focused line art |
| --line-muted | #706296 | inactive line-art icons and low-emphasis violet details |
| --line-dim | #352e49 | decorative guides, orbit rings, quiet violet borders |
| --text | #e8e6f0 | primary text |
| --mute | #8b8899 | secondary text and supporting labels |
| --red | #ef4444 | error, destructive |
| --yellow | #eab308 | warning |
| --orange | #f97316 | attention, pending |
| --green | #22c55e | success, done |
| --scrim | rgba(0, 0, 0, .6) | mobile navigation overlay |
System colors carry meaning only; never use them as decoration. Purple also carries state and hierarchy only; do not use it to fill large surfaces. Add or change tokens in theme.css and this table in the same edit.

## SECTION: Layering
Darkest to lightest: --bg, --p1, --p2. Use a surface change to show hierarchy before adding an accent color. Structural borders use --border; decorative violet lines use --line-dim. The selected navigation item stays rooted on --bg with a 2px --line edge. Focus uses a visible --line outline. Do not use glow or shadow as a substitute for contrast or hierarchy.

## SECTION: Typography
Work Sans, weights 300, 400, 500, 600, with system-ui fallback. Title/brand 300 with wide letter spacing; headings 500; body 400. Sentence case everywhere. Keep lines under 80 characters. Primary text uses --text; secondary information uses --mute. Do not use violet for long passages of text.

## SECTION: Icons
- SVG only, viewBox 0 0 24 24, stroke currentColor, width 1.4, round caps, no fill unless a specific icon needs a tiny functional detail.
- Default/inactive line art uses --line-muted. Active, selected, or focused line art uses --line. Decorative diagrams may use --line-dim.
- No drop-shadow, outer glow, bloom, or neon treatment on ordinary icons.
- Sizes: 20px top-level nav, 16px sub-items.
- Each module gets its own icon, keyed by the module's icon string, in components/Icon.tsx.
- Style: simple geometric line art; the shape should suggest the idea without adding unnecessary detail. No emoji or raster images.

## SECTION: Layout and spacing
Sidebar rail 56px, expanded 248px; mobile tab bar 60px plus safe-area inset. Panels use --p1, a 1px --border outline, 8px radius, and 24px padding. Controls use an 8px radius. Keep geometry crisp and consistent; avoid excessive pill shapes and nested card-on-card treatments. Mobile breakpoint: 768px.

## SECTION: Navigation visuals
Inactive labels use --mute and inactive icons use --line-muted. Hover uses a --p2 background without glow. Selected items use --bg, --text for the label, --line for the icon, and an inset 2px --line edge. Focus is independently visible with the global focus outline. Collapsed rail shows icons only; labels appear on hover or keyboard focus. Sub-items are indented 14px per level.

## SECTION: Motion
Allowed: restrained ambient motion on the dashboard only (quiet starfield/orbit linework), and short state transitions (about 0.2s) that clarify what changed.
Forbidden: persistent glow, pulsing, or bloom on ordinary controls; entrance animations on every card; bouncing; flashing; or motion faster than the existing dashboard ambient movement.
Always respect prefers-reduced-motion. Reduced-motion users must not receive decorative animation.

## SECTION: Copy and errors
Plain verbs, sentence case, no filler. Buttons name the action ("Save changes", not "Submit"); the same action keeps the same name everywhere. Errors say what happened and what to do next, never apologize, never vague. Empty screens say how to start. Notices use a colored left edge (green success, yellow warning, red error, violet info); errors stay until dismissed, others fade after 6 seconds, and warnings and errors always include a next step.

## SECTION: Accessibility
Visible keyboard focus (2px --line outline with offset), reduced motion respected, text contrast on --bg and --p1 stays readable, tap targets at least 40px, labels on icon-only controls (aria-label). Do not communicate state through purple alone; pair it with position, shape, text, or another non-color cue. PLANNED: audit on a real phone.

## SECTION: Data display
Rule: every data view has a Simple view and a Visual view, switched by one control in the same place on every screen, remembered per module.
